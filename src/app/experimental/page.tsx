import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ExperimentalGallery } from "@/components/work/ExperimentalGallery";

// ═══════════════════════════════════════════════════════════════════════
// EXPERIMENTAL WORK PAGE — personal / passion / AI-driven experiments.
// Visually distinct, looser layout. Content from data/experimental.ts.
// ═══════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Experimental",
  description:
    "Concept reels, AI-generated films, music videos and short experiments from the CineCrafter studio.",
};

export default function ExperimentalPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Lab"
        title="Where we experiment, and find what's next."
        intro="Self-initiated work with no brief but our own curiosity — generative film, concept reels, music videos and short experiments. It's where new techniques are pressure-tested before they reach client work."
      />
      <ExperimentalGallery />
    </>
  );
}
