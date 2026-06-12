"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/site-config";
import { services as staticServices } from "@/data/services";
import { easeCine } from "@/lib/motion";
import { getServices } from "@/lib/db-client";
import type { Service } from "@/types";

// ═══════════════════════════════════════════════════════════════════════
// CONTACT FORM — "Work With Us" inquiry form with a confirmation state.
// On success it reveals the gated direct contact details returned by the API
// (these are server-only and never present in the page until this point).
// ═══════════════════════════════════════════════════════════════════════

type Status = "idle" | "submitting" | "success" | "error";

interface RevealedContact {
  phone: string;
  whatsapp: string;
  email: string;
}

const inputBase =
  "w-full border-b border-base-line bg-transparent py-3 text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none transition-colors duration-300";
const labelBase = "eyebrow mb-2 block";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [revealed, setRevealed] = useState<RevealedContact | null>(null);
  const [servicesList, setServicesList] = useState<Service[]>(staticServices);

  useEffect(() => {
    getServices().then((data) => {
      setServicesList(data);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      projectType: String(fd.get("projectType") || ""),
      message: String(fd.get("message") || ""),
      budget: String(fd.get("budget") || ""),
      referral: String(fd.get("referral") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setRevealed(data.directContact ?? null);
      setStatus("success");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  // ── Confirmation state ──────────────────────────────────────────────
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeCine }}
        className="border border-base-line bg-base-elevated/40 p-10"
      >
        <p className="eyebrow mb-5 text-accent">Inquiry received</p>
        <h2 className="font-serif text-3xl text-ink">
          Thank you — our team will be in touch.
        </h2>
        <p className="mt-5 max-w-prose text-ink-muted">
          We read every inquiry personally and typically respond within two
          working days. In the meantime, here are our direct lines should you
          wish to reach us sooner.
        </p>

        {/* Gated direct contact details — only present after success. */}
        {revealed && (
          <dl className="mt-8 grid gap-6 border-t border-base-line pt-8 sm:grid-cols-3">
            <div>
              <dt className="eyebrow mb-2">Direct email</dt>
              <dd>
                <a
                  href={`mailto:${revealed.email}`}
                  className="link-underline text-sm"
                >
                  {revealed.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">Phone</dt>
              <dd>
                <a href={`tel:${revealed.phone}`} className="link-underline text-sm">
                  {revealed.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">WhatsApp</dt>
              <dd>
                <a
                  href={`https://wa.me/${revealed.whatsapp.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm"
                >
                  {revealed.whatsapp}
                </a>
              </dd>
            </div>
          </dl>
        )}
      </motion.div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="space-y-10" noValidate>
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>
            Name <span className="text-accent">*</span>
          </label>
          <input id="name" name="name" required className={inputBase} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="company" className={labelBase}>
            Company / Agency
          </label>
          <input id="company" name="company" className={inputBase} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputBase}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="projectType" className={labelBase}>
            Project type <span className="text-accent">*</span>
          </label>
          <select id="projectType" name="projectType" required defaultValue="" className={`${inputBase} appearance-none`}>
            <option value="" disabled>
              Select a service
            </option>
            {servicesList.map((s) => (
              <option key={s.id} value={s.title} className="bg-base text-ink">
                {s.title}
              </option>
            ))}
            <option value="Other" className="bg-base text-ink">
              Something else
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelBase}>
            Budget range <span className="text-ink-faint">(optional)</span>
          </label>
          <select id="budget" name="budget" defaultValue="" className={`${inputBase} appearance-none`}>
            <option value="" className="bg-base text-ink">
              Prefer not to say
            </option>
            {siteConfig.budgetRanges.map((b) => (
              <option key={b} value={b} className="bg-base text-ink">
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="referral" className={labelBase}>
            How did you hear about us?
          </label>
          <select id="referral" name="referral" defaultValue="" className={`${inputBase} appearance-none`}>
            <option value="" className="bg-base text-ink">
              Select one
            </option>
            {siteConfig.referralSources.map((r) => (
              <option key={r} value={r} className="bg-base text-ink">
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelBase}>
          Project brief <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about the project — scope, timeline, ambition."
          className={`${inputBase} resize-none`}
        />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-accent"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex items-center gap-3 border border-ink/30 px-8 py-4 text-sm tracking-wide text-ink transition-all duration-500 ease-cine hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send inquiry"}
        <span aria-hidden className="transition-transform duration-500 ease-cine group-hover:translate-x-1">
          &rarr;
        </span>
      </button>
    </form>
  );
}
