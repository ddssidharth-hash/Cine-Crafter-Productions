"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { services as staticServices } from "@/data/services";
import type { Service } from "@/types";
import { getServices } from "@/lib/db-client";

// ═══════════════════════════════════════════════════════════════════════
// HOME — "What We Do" teaser. A restrained list of services with a link to
// the full Services page. Reads from data/services.ts.
// ═══════════════════════════════════════════════════════════════════════

export function ServicesPreview() {
  const [servicesList, setServicesList] = useState<Service[]>(staticServices);

  useEffect(() => {
    getServices().then((data) => {
      setServicesList(data);
    });
  }, []);

  return (
    <section className="frame border-b border-base-line py-28 sm:py-36">
      <div className="mb-16 flex items-end justify-between gap-6">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">What We Do</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-2xl font-serif text-display-sm text-ink">
              Seven disciplines, one standard.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Link href="/services" className="link-underline hidden shrink-0 sm:inline-flex">
            All services <span className="ml-2">&rarr;</span>
          </Link>
        </Reveal>
      </div>

      <ul className="border-t border-base-line">
        {servicesList.map((s, i) => (
          <Reveal as="li" key={s.id} delay={i * 0.04} y={12}>
            <Link
              href={`/services#${s.id}`}
              className="group flex items-center justify-between gap-6 border-b border-base-line py-7 transition-colors duration-500 ease-cine hover:bg-base-elevated/40"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-serif text-sm text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-2xl text-ink transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                  {s.title}
                </span>
              </div>
              <span className="hidden max-w-md text-right text-sm text-ink-muted md:block">
                {s.summary}
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.1}>
        <Link href="/services" className="link-underline mt-10 inline-flex sm:hidden">
          All services <span className="ml-2">&rarr;</span>
        </Link>
      </Reveal>
    </section>
  );
}
