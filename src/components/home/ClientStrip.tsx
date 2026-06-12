"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { LogoWall } from "@/components/LogoWall";
import { homepageLogos as staticLogos } from "@/data/clients";
import type { Logo } from "@/types";
import { getClientsAndAgencies } from "@/lib/db-client";

// ═══════════════════════════════════════════════════════════════════════
// HOME — minimal client/agency logo strip. Grayscale, color on hover.
// Links to the full Clients & Agencies page.
// ═══════════════════════════════════════════════════════════════════════

export function ClientStrip() {
  const [logos, setLogos] = useState<Logo[]>(staticLogos);

  useEffect(() => {
    getClientsAndAgencies().then((data) => {
      if (data.homepageLogos && data.homepageLogos.length > 0) {
        setLogos(data.homepageLogos);
      }
    });
  }, []);

  return (
    <section className="frame py-24 sm:py-28">
      <Reveal>
        <p className="eyebrow mb-12 text-center">
          Trusted by brands, agencies &amp; producers
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <LogoWall logos={logos} variant="strip" />
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-12 text-center">
          <Link href="/clients" className="link-underline text-sm">
            Clients &amp; agencies <span className="ml-2">&rarr;</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
