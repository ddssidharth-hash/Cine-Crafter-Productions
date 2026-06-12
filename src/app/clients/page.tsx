import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { LogoWall } from "@/components/LogoWall";
import { clients, agencies } from "@/data/clients";

// ═══════════════════════════════════════════════════════════════════════
// CLIENTS & AGENCIES PAGE — two clearly separated, understated sections.
// Refined logo grids (grayscale → color on hover). Content from
// data/clients.ts.
// ═══════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Clients & Agencies",
  description:
    "The brands, producers and agencies CineCrafter Productions has been trusted to work with.",
};

export default function ClientsPage() {
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
            <LogoWall logos={clients} />
          </Reveal>
        </section>

        <section>
          <Reveal>
            <h2 className="mb-10 font-serif text-2xl text-ink sm:text-3xl">
              Agencies we&rsquo;ve collaborated with
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <LogoWall logos={agencies} />
          </Reveal>
        </section>
      </div>
    </>
  );
}
