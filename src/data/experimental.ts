import type { ExperimentalProject } from "@/types";

// ═══════════════════════════════════════════════════════════════════════
// EXPERIMENTAL / PASSION PROJECTS — same data-driven approach as projects.ts.
// This is the studio's looser, more exploratory work: AI-generated films,
// concept reels, music videos, short experiments.
//
// TODO: Replace all covers/videos and copy with real experimental work.
// ═══════════════════════════════════════════════════════════════════════

const ph = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=70`;

export const experimentalProjects: ExperimentalProject[] = [
  {
    slug: "synthetic-dreams",
    title: "Synthetic Dreams",
    tag: "AI Film",
    excerpt: "A fully AI-generated short exploring machine memory.",
    description:
      "An experiment in generative filmmaking — every frame synthesised, then edited and graded with the same craft we bring to live action. A study in where AI tooling and authorship meet.",
    year: 2025,
    cover: ph("photo-1534796636912-3b95b3ab5986"),
    videoUrl: "", // TODO
    previewUrl: "", // TODO
    stills: [],
  },
  {
    slug: "monochrome-motion",
    title: "Monochrome / Motion",
    tag: "Concept Reel",
    excerpt: "A black-and-white study in light, texture and rhythm.",
    description:
      "A self-directed concept reel built purely to explore contrast and movement — no client, no brief. Shot over a weekend, cut to a custom score.",
    year: 2024,
    cover: ph("photo-1419242902214-272b3f66ee7a"),
    stills: [],
  },
  {
    slug: "neon-hours",
    title: "Neon Hours",
    tag: "Music Video",
    excerpt: "A night-drive music video for an independent artist.",
    description:
      "A passion collaboration with an emerging musician — a single-night shoot turned into a saturated, kinetic music video, finished with an aggressive in-house grade.",
    year: 2024,
    cover: ph("photo-1492571350019-22de08371fd3"),
    stills: [],
  },
  {
    slug: "still-life-24",
    title: "Still Life 24",
    tag: "Short Experiment",
    excerpt: "Twenty-four still frames, one per hour, for a day.",
    description:
      "A durational experiment in observation — a single frame captured each hour across a full day, assembled into a quiet meditation on changing light.",
    year: 2023,
    cover: ph("photo-1501785888041-af3ef285b470"),
    stills: [],
  },
];

export function getExperimentalBySlug(
  slug: string,
): ExperimentalProject | undefined {
  return experimentalProjects.find((p) => p.slug === slug);
}
