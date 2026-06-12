import type { Metadata } from "next";
import { ShowreelSlider, type ShowreelSlide } from "@/components/showreel/ShowreelSlider";
import { projects } from "@/data/projects";
import { experimentalProjects } from "@/data/experimental";

// ═══════════════════════════════════════════════════════════════════════
// SHOWREEL PAGE — a dedicated, immersive, full-screen slide showcase of ALL
// output (portfolio + experimental) in one continuous cinematic sequence.
//
// Slides are assembled here from the data layer so adding a project anywhere
// automatically extends the reel.
// ═══════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Showreel",
  description:
    "An immersive, full-screen showcase of CineCrafter Productions' complete body of work.",
};

// Build the combined slide list: featured-first portfolio, then experiments.
const slides: ShowreelSlide[] = [
  ...projects.map((p) => ({
    title: p.title,
    category: p.category,
    client: p.client,
    cover: p.cover,
    videoUrl: p.previewUrl || p.videoUrl || undefined, // prefer a muted loop
    href: "/work",
  })),
  ...experimentalProjects.map((p) => ({
    title: p.title,
    category: p.tag,
    cover: p.cover,
    videoUrl: p.previewUrl || p.videoUrl || undefined,
    href: "/experimental",
  })),
];

export default function ShowreelPage() {
  return <ShowreelSlider slides={slides} />;
}
