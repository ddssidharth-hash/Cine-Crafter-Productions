import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/site-config";

// ═══════════════════════════════════════════════════════════════════════
// CONTACT PAGE — general (public) studio details + the "Work With Us"
// inquiry form. Direct/personal channels are intentionally NOT shown here;
// they are revealed in the form's confirmation state after a successful
// submission (gated; controlled by siteConfig.contact.gateDirectContact).
// ═══════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with CineCrafter Productions.",
};

export default function ContactPage() {
  const { general, gateDirectContact } = siteConfig.contact;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Work with us."
        intro="Tell us about your project and we'll be in touch. We take on a limited number of engagements at a time, so the more you can share, the better."
      />

      <div className="frame grid gap-16 pb-32 lg:grid-cols-12">
        {/* General contact info (public) */}
        <aside className="lg:col-span-4">
          <Reveal>
            <div className="space-y-8">
              <div>
                <p className="eyebrow mb-2">General enquiries</p>
                {/* TODO: real general inbox */}
                <a
                  href={`mailto:${general.email}`}
                  className="link-underline text-sm"
                >
                  {general.email}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-2">Where we are</p>
                {/* TODO: real location(s) */}
                <p className="text-sm text-ink-muted">{general.location}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Hours</p>
                <p className="text-sm text-ink-muted">{general.hours}</p>
              </div>

              {gateDirectContact && (
                <p className="border-t border-base-line pt-8 text-xs leading-relaxed text-ink-faint">
                  {/* Privacy note for the gated direct details. */}
                  Direct lines are shared once we&rsquo;ve received your inquiry.
                </p>
              )}
            </div>
          </Reveal>
        </aside>

        {/* Inquiry form */}
        <div className="lg:col-span-8">
          <Reveal delay={0.05}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </>
  );
}
