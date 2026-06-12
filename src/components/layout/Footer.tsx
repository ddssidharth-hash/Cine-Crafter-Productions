import Link from "next/link";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/site-config";

// ═══════════════════════════════════════════════════════════════════════
// FOOTER — logo, tagline, a contact CTA, quick links and social icons.
// Understated, structural. The contact CTA points to /contact.
// ═══════════════════════════════════════════════════════════════════════

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-base-line bg-base">
      {/* Contact CTA band */}
      <div className="frame border-b border-base-line py-20 sm:py-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">Have a project in mind?</p>
            <h2 className="max-w-2xl font-serif text-display-sm text-ink">
              Let&rsquo;s craft something worth watching.
            </h2>
          </div>
          <Link
            href="/contact"
            className="link-underline shrink-0 self-start text-lg md:self-end"
          >
            Start a conversation
            <span aria-hidden className="ml-2">
              &rarr;
            </span>
          </Link>
        </div>
      </div>

      {/* Lower footer */}
      <div className="frame py-14">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Logo height={30} withWordmark />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-muted">
              {/* TODO: confirm final tagline / studio one-liner */}
              {siteConfig.tagline}.
            </p>
          </div>

          {/* Quick links */}
          <nav className="md:col-span-4">
            <p className="eyebrow mb-5">Explore</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted transition-colors duration-300 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social + general contact */}
          <div className="md:col-span-3">
            <p className="eyebrow mb-5">Connect</p>
            <ul className="space-y-3">
              {siteConfig.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-muted transition-colors duration-300 hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${siteConfig.contact.general.email}`}
              className="mt-6 inline-block text-sm text-ink-muted transition-colors duration-300 hover:text-accent"
            >
              {siteConfig.contact.general.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-base-line pt-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.contact.general.location}</p>
        </div>
      </div>
    </footer>
  );
}
