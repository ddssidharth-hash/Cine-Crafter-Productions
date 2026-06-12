import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ClientStrip } from "@/components/home/ClientStrip";

// ═══════════════════════════════════════════════════════════════════════
// HOME PAGE — hero, studio statement, featured work, services teaser,
// client strip. The footer (with its contact CTA) is rendered by the layout.
// ═══════════════════════════════════════════════════════════════════════

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedWork />
      <ServicesPreview />
      <ClientStrip />
    </>
  );
}
