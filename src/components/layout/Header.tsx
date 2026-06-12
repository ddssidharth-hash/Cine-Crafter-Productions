"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/site-config";
import { easeCine } from "@/lib/motion";

// ═══════════════════════════════════════════════════════════════════════
// HEADER — fixed, minimal. Logo left, nav right. Becomes a translucent
// blurred bar once scrolled. On mobile the nav collapses into a full-screen
// overlay with a smooth staggered reveal.
// ═══════════════════════════════════════════════════════════════════════

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the overlay on route change.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape closes the overlay.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-cine ${
        scrolled || menuOpen
          ? "bg-base/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="frame flex h-20 items-center justify-between">
        {/* Logo with a subtle hover scale/brightness lift. */}
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="group relative z-10 transition-transform duration-500 ease-cine hover:scale-[1.03]"
        >
          <span className="block transition-[filter] duration-500 ease-cine group-hover:[filter:drop-shadow(0_0_10px_rgb(var(--color-accent)/0.35))]">
            <Logo height={30} withWordmark />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {siteConfig.nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm tracking-wide transition-colors duration-500 ease-cine hover:text-accent ${
                  active ? "text-ink" : "text-ink-muted"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-accent"
                    transition={{ duration: 0.5, ease: easeCine }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative z-10 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-ink transition-all duration-500 ease-cine ${
                menuOpen ? "top-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-px w-6 bg-ink transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-ink transition-all duration-500 ease-cine ${
                menuOpen ? "top-1/2 -rotate-45" : "top-full"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-0 flex flex-col bg-base md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeCine }}
          >
            <nav className="frame flex flex-1 flex-col justify-center gap-2">
              {siteConfig.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: easeCine, delay: 0.08 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block py-2 font-serif text-4xl tracking-tight text-ink transition-colors duration-300 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="frame pb-12">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {siteConfig.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eyebrow hover:text-accent"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
