"use client";

import Image from "next/image";
import type { Logo } from "@/types";

// ═══════════════════════════════════════════════════════════════════════
// LOGO WALL — refined grid of client/agency logos.
// Grayscale + reduced opacity at rest; full color/opacity on hover. Name
// shown as a tooltip-ish caption on hover. When a logo has no `src` asset we
// fall back to a clean wordmark so the layout is complete before real logos
// arrive.
//
// TODO: Supply monochrome SVG/PNG logo assets in data/clients.ts (`src`).
// ═══════════════════════════════════════════════════════════════════════

interface LogoWallProps {
  logos: Logo[];
  /** Marquee-style single row (homepage strip) vs. full grid. */
  variant?: "grid" | "strip";
}

export function LogoWall({ logos, variant = "grid" }: LogoWallProps) {
  const base =
    variant === "strip"
      ? "flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16"
      : "grid grid-cols-2 gap-px overflow-hidden border border-base-line bg-base-line sm:grid-cols-3 lg:grid-cols-4";

  return (
    <ul className={base}>
      {logos.map((logo) => {
        const inner = (
          <div
            className={
              variant === "strip"
                ? "group flex items-center"
                : "group flex h-32 items-center justify-center bg-base px-6"
            }
          >
            {logo.src ? (
              <Image
                src={logo.src}
                alt={logo.name}
                width={140}
                height={48}
                loading="lazy"
                className="h-8 w-auto opacity-50 grayscale transition-all duration-500 ease-cine group-hover:opacity-100 group-hover:grayscale-0"
              />
            ) : (
              // Wordmark fallback
              <span className="font-serif text-lg text-ink-faint transition-colors duration-500 ease-cine group-hover:text-ink">
                {logo.name}
              </span>
            )}
          </div>
        );

        return (
          <li key={logo.name} title={logo.name}>
            {logo.url ? (
              <a href={logo.url} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ul>
  );
}
