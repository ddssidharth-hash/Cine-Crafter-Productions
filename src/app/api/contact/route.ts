import { NextResponse } from "next/server";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { firebaseApp } from "@/lib/firebase";
import { directContact } from "@/lib/server/contact-secrets";
import { siteConfig } from "@/site-config";

// Run on the Node.js runtime (the Firebase Web SDK needs it).
export const runtime = "nodejs";

// ═══════════════════════════════════════════════════════════════════════
// CONTACT API ROUTE — receives inquiry submissions.
//
// Behaviour:
//  1. Validates the payload.
//  2. Sends a notification email to the studio (Resend) IF an API key is
//     configured. Without a key it logs to the server console and still
//     succeeds, so the form is fully demoable before integration.
//  3. On success, returns the GATED direct contact details so the client's
//     confirmation screen can reveal them (they are never shipped otherwise).
//
// ─────────────────────────────────────────────────────────────────────────
// TODO (REQUIRES AN API KEY): Connect a real email service.
//   • Sign up at https://resend.com and verify a sending domain.
//   • Add RESEND_API_KEY, CONTACT_NOTIFICATION_TO and CONTACT_NOTIFICATION_FROM
//     to .env.local (see .env.local.example).
//   • Install the SDK:  npm i resend   (then uncomment the Resend block below).
//   • Alternatively swap in Formspree, SendGrid, Postmark, etc.
// ═══════════════════════════════════════════════════════════════════════

export interface ContactPayload {
  name: string;
  company?: string;
  email: string;
  projectType: string;
  message: string;
  budget?: string;
  referral?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // ── Server-side validation ──────────────────────────────────────────
  const errors: string[] = [];
  if (!data.name?.trim()) errors.push("Name is required.");
  if (!data.email?.trim() || !isValidEmail(data.email)) errors.push("A valid email is required.");
  if (!data.projectType?.trim()) errors.push("Project type is required.");
  if (!data.message?.trim()) errors.push("A project brief is required.");
  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
  }

  const summary = [
    `New inquiry — ${siteConfig.name}`,
    "",
    `Name:        ${data.name}`,
    `Company:     ${data.company || "—"}`,
    `Email:       ${data.email}`,
    `Project:     ${data.projectType}`,
    `Budget:      ${data.budget || "—"}`,
    `Heard via:   ${data.referral || "—"}`,
    "",
    "Brief:",
    data.message,
  ].join("\n");

  // ── Persist to Firestore ────────────────────────────────────────────
  // Writes the inquiry to the `inquiries` collection. Graceful: if Firestore
  // isn't enabled / rules block the write, we log and still succeed so the
  // visitor's inquiry is never lost to a backend hiccup.
  //
  // TODO: Enable Firestore in the Firebase console and deploy firestore.rules
  //       (the rules allow create-only on `inquiries`; reads are admin-only).
  try {
    const db = getFirestore(firebaseApp);
    await addDoc(collection(db, "inquiries"), {
      name: data.name,
      company: data.company || null,
      email: data.email,
      projectType: data.projectType,
      budget: data.budget || null,
      referral: data.referral || null,
      message: data.message,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("[contact] Firestore write failed (continuing):", err);
  }

  // ── Send notification (Resend) ──────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      // ── Uncomment after `npm i resend` ──────────────────────────────
      // import is done lazily so the build doesn't require the package
      // until you actually wire it up.
      //
      // const { Resend } = await import("resend");
      // const resend = new Resend(apiKey);
      // await resend.emails.send({
      //   from: process.env.CONTACT_NOTIFICATION_FROM!,
      //   to: process.env.CONTACT_NOTIFICATION_TO!,
      //   replyTo: data.email,
      //   subject: `New inquiry — ${data.name}${data.company ? ` (${data.company})` : ""}`,
      //   text: summary,
      // });

      // Until the block above is enabled, fall through to the log path.
      console.warn(
        "[contact] RESEND_API_KEY is set but the Resend send block is still commented out. " +
          "Uncomment it in src/app/api/contact/route.ts after `npm i resend`.",
      );
    } catch (err) {
      console.error("[contact] Failed to send notification email:", err);
      return NextResponse.json(
        { error: "We couldn't send your message right now. Please email us directly." },
        { status: 502 },
      );
    }
  } else {
    // No key configured — log so submissions are visible in development.
    console.info("[contact] (no email service configured) New submission:\n" + summary);
  }

  // ── Success: reveal the gated direct contact details ────────────────
  // These are server-only values; returning them here is the privacy gate.
  return NextResponse.json({
    ok: true,
    directContact: siteConfig.contact.gateDirectContact ? directContact : null,
  });
}
