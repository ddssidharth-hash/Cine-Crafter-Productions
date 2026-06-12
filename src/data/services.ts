import type { Service } from "@/types";

// ═══════════════════════════════════════════════════════════════════════
// SERVICES — drives the Services page and the homepage "What We Do" preview.
// The `id` doubles as the section anchor (e.g. /services#ad-films).
// `exampleProjectSlug` optionally links to a representative portfolio piece.
//
// TODO: Refine descriptions/capabilities with the studio's real positioning.
// ═══════════════════════════════════════════════════════════════════════

const ph = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=70`;

export const services: Service[] = [
  {
    id: "film-production",
    title: "Film Production",
    summary: "Full-service production from development to delivery.",
    description:
      "We take features and branded films from first concept to final master — development, financing strategy, crewing, principal photography and a finishing pipeline built in-house. One accountable team, end to end.",
    capabilities: [
      "Development & packaging",
      "Crewing & scheduling",
      "Principal photography",
      "Post & finishing",
    ],
    image: ph("photo-1485846234645-a62644f84728"),
    exampleProjectSlug: "smaranayil",
  },
  {
    id: "line-production",
    title: "Line Production",
    summary: "Local execution for international productions.",
    description:
      "For producers shooting on our turf, we handle the ground game — budgets, permits, crew, equipment and logistics — delivering to international standards while protecting your schedule and your numbers.",
    capabilities: ["Budgeting & scheduling", "Permits & compliance", "Local crew & kit", "Logistics"],
    image: ph("photo-1502920917128-1aa500764cbd"),
    exampleProjectSlug: "survivor-tamil",
  },
  {
    id: "filmmaking",
    title: "Filmmaking",
    summary: "Authored short films and original storytelling.",
    description:
      "Our craft practice — writing, directing and cutting original work. It is where our voice is sharpest, and where clients see exactly how we think about story, performance and image.",
    capabilities: ["Writing & development", "Direction", "Cinematography", "Edit & color"],
    image: ph("photo-1470071459604-3b5ec3a7fe05"),
    exampleProjectSlug: "music-videos",
  },
  {
    id: "web-series",
    title: "Web Series Production",
    summary: "Episodic content built for digital-first audiences.",
    description:
      "We develop and produce episodic series that hold a feature-grade look on a streaming schedule — from writers' room support through to a consistent post pipeline across every episode.",
    capabilities: ["Episodic development", "Multi-episode scheduling", "Post supervision", "Consistent grade"],
    image: ph("photo-1536440136628-849c177e76a1"),
    exampleProjectSlug: "puncch-beat",
  },
  {
    id: "ad-films",
    title: "Ad Films",
    summary: "Brand films and campaign suites with a cinematic edge.",
    description:
      "Hero films and the full social ecosystem around them — concept, direction, edit and grade — built to make brands feel like cinema rather than advertising.",
    capabilities: ["Concept & treatment", "Direction", "Edit & motion", "Color & finishing"],
    image: ph("photo-1483728642387-6c3bdd6c93e5"),
    exampleProjectSlug: "advertisements",
  },
  {
    id: "documentaries",
    title: "Documentaries",
    summary: "Long- and short-form non-fiction, told with restraint.",
    description:
      "Observational, character-led documentary work — built on access, patience and trust. We tell true stories without sensationalising them.",
    capabilities: ["Research & access", "Field production", "Verité cinematography", "Story-led edit"],
    image: ph("photo-1492691527719-9d1e07e534b4"),
    exampleProjectSlug: "anjaan",
  },
  {
    id: "digital-marketing-videos",
    title: "Digital Marketing Videos",
    summary: "Performance-minded video that still feels premium.",
    description:
      "Modular video suites engineered for paid and organic channels — explainers, testimonials and cut-downs that flex across surfaces without ever looking cheap.",
    capabilities: ["Channel strategy", "Modular production", "Versioning & cut-downs", "Motion graphics"],
    image: ph("photo-1460925895917-afdab827c52f"),
    exampleProjectSlug: "isha-foundation",
  },
];
