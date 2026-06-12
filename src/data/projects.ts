import type { Project, ProjectCategory } from "@/types";

// ═══════════════════════════════════════════════════════════════════════
// PORTFOLIO PROJECTS — data-driven. Add a new project by appending an object
// to this array; the grid, filters, detail view and homepage "Featured Work"
// all read from here. No layout code needs to change.
//
// TODO: Replace every cover/video/still URL with real, optimized assets
//       (WebP/AVIF stills, compressed MP4/WebM previews). The Unsplash URLs
//       below are temporary visual placeholders only.
// TODO: Replace all copy, client credits and roles with real details.
// ═══════════════════════════════════════════════════════════════════════

/** Canonical, ordered list of categories — drives the filter bar. */
export const projectCategories: ProjectCategory[] = [
  "Film Production",
  "Line Production",
  "Filmmaking",
  "Web Series",
  "Ad Films",
  "Documentaries",
  "Digital Marketing Videos",
];

// Temporary placeholder cover images (cinematic stills) — swap for real work.
const ph = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=70`;

export const projects: Project[] = [
  {
    slug: "the-quiet-coast",
    title: "The Quiet Coast",
    category: "Film Production",
    excerpt: "A feature-length meditation on memory and the sea.",
    description:
      "A feature collaboration shot across three coastlines over a single winter. We led production end-to-end — from development and crewing to a hand-finished color grade — building a restrained visual language that lets performance and landscape carry the story.",
    role: "Production · Direction · Edit · Color",
    client: "Atlas Pictures", // TODO: real client
    year: 2024,
    cover: ph("photo-1485846234645-a62644f84728"),
    videoUrl: "", // TODO: embed URL (YouTube/Vimeo) or self-hosted mp4
    previewUrl: "", // TODO: muted loop preview for card hover
    featured: true,
    stills: [
      { src: ph("photo-1500530855697-b586d89ba3ee"), alt: "Coastal dawn, wide" },
      { src: ph("photo-1469474968028-56623f02e42e"), alt: "Lighthouse at dusk" },
    ],
  },
  {
    slug: "northwind-campaign",
    title: "Northwind",
    category: "Ad Films",
    excerpt: "A 60-second brand film for a heritage outerwear label.",
    description:
      "A flagship campaign film built around a single uninterrupted journey through weather and terrain. Delivered as a hero 60, plus a suite of social cut-downs and stills — all from one tightly choreographed shoot day.",
    role: "Direction · Edit · Color · Finishing",
    client: "Northwind Apparel · via Meridian Agency", // TODO: real credit
    year: 2024,
    cover: ph("photo-1483728642387-6c3bdd6c93e5"),
    featured: true,
    stills: [{ src: ph("photo-1454496522488-7a8e488e8606"), alt: "Mountain ridge" }],
  },
  {
    slug: "city-of-makers",
    title: "City of Makers",
    category: "Documentaries",
    excerpt: "A six-part documentary portrait of an artisan district.",
    description:
      "An intimate documentary series following the last working craftspeople of a historic quarter. We embedded with subjects over four months, prioritising trust and observation over spectacle.",
    role: "Production · Cinematography · Edit",
    client: "Public Broadcast Trust", // TODO: real client
    year: 2023,
    cover: ph("photo-1492691527719-9d1e07e534b4"),
    featured: true,
    stills: [],
  },
  {
    slug: "halcyon-series",
    title: "Halcyon",
    category: "Web Series",
    excerpt: "An eight-episode dramatic web series for streaming.",
    description:
      "A character-driven web series developed for a digital-first audience. We handled line production and post across all eight episodes, keeping a feature-grade look on a streaming-series schedule.",
    role: "Line Production · Post Supervision · Color",
    client: "Streamline Originals", // TODO: real client
    year: 2023,
    cover: ph("photo-1536440136628-849c177e76a1"),
    featured: true,
    stills: [],
  },
  {
    slug: "meridian-launch",
    title: "Meridian Launch",
    category: "Digital Marketing Videos",
    excerpt: "A product launch suite for a fintech platform.",
    description:
      "A modular suite of launch and lifecycle videos — explainer, testimonial, and performance cut-downs — designed to flex across paid, organic and product surfaces while holding one premium tone.",
    role: "Concept · Direction · Edit · Motion",
    client: "Meridian", // TODO: real client
    year: 2024,
    cover: ph("photo-1460925895917-afdab827c52f"),
    featured: true,
    stills: [],
  },
  {
    slug: "the-long-field",
    title: "The Long Field",
    category: "Filmmaking",
    excerpt: "A short film exploring inheritance and land.",
    description:
      "A self-initiated short developed and directed in-house, later acquired for festival distribution. A showcase of the studio's authorial voice and craft from script through final grade.",
    role: "Writing · Direction · Edit · Color",
    client: "CineCrafter Productions",
    year: 2022,
    cover: ph("photo-1470071459604-3b5ec3a7fe05"),
    featured: true,
    stills: [],
  },
  {
    slug: "harbour-lines",
    title: "Harbour Lines",
    category: "Line Production",
    excerpt: "Local line production for an international shoot.",
    description:
      "Full line-production services for an overseas production company shooting on location — crewing, permits, logistics, and equipment, delivered to international standards on a compressed timeline.",
    role: "Line Production · Local Crew · Logistics",
    client: "Confidential (intl. production co.)", // TODO: real client
    year: 2023,
    cover: ph("photo-1502920917128-1aa500764cbd"),
    stills: [],
  },
  {
    slug: "evergreen-spot",
    title: "Evergreen",
    category: "Ad Films",
    excerpt: "A seasonal spot for a home & lifestyle brand.",
    description:
      "A warm, tactile seasonal campaign built on practical light and real interiors. Delivered as broadcast and social cuts with a bespoke color treatment.",
    role: "Direction · Edit · Color",
    client: "Evergreen Home · via Field & Co.", // TODO: real credit
    year: 2022,
    cover: ph("photo-1513519245088-0e12902e35ca"),
    stills: [],
  },
];

/** Lookup helper used by detail views and "linked example" references. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Homepage strip source. */
export const featuredProjects = projects.filter((p) => p.featured);
