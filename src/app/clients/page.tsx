"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { LogoWall } from "@/components/LogoWall";
import { clients as staticClients, agencies as staticAgencies } from "@/data/clients";
import type { Logo } from "@/types";
import { getClientsAndAgencies } from "@/lib/db-client";

// ═══════════════════════════════════════════════════════════════════════
// CLIENTS & AGENCIES PAGE — two clearly separated, understated sections.
// Refined logo grids (grayscale → color on hover). Content from
// data/clients.ts.
// ═══════════════════════════════════════════════════════════════════════

export default function ClientsPage() {
  const [clientsList, setClientsList] = useState<Logo[]>(staticClients);
  const [agenciesList, setAgenciesList] = useState<Logo[]>(staticAgencies);

  useEffect(() => {
    getClientsAndAgencies().then((data) => {
      if (data.clients) setClientsList(data.clients);
      if (data.agencies) setAgenciesList(data.agencies);
    });
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="The company we keep."
        intro="A quiet kind of proof. We're selective about the work we take on, and grateful for the partners who trust us with it."
      />

      <div className="frame space-y-24 pb-32">
        <section>
          <Reveal>
            <h2 className="mb-10 font-serif text-2xl text-ink sm:text-3xl">
              Clients we&rsquo;ve worked with
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <LogoWall logos={clientsList} />
          </Reveal>
        </section>

        <section>
          <Reveal>
            <h2 className="mb-10 font-serif text-2xl text-ink sm:text-3xl">
              Production houses we&rsquo;ve collaborated with
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <LogoWall logos={agenciesList} />
          </Reveal>
        </section>
      </div>
    </>
  );
}
