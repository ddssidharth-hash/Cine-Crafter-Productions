import type { Project, ProjectCategory } from "@/types";

// ═══════════════════════════════════════════════════════════════════════
// PORTFOLIO PROJECTS — data-driven. Add a new project by appending an object
// to this array; the grid, filters, detail view and homepage "Featured Work"
// all read from here.
//
// Content is drawn from Sidharth Menon's real credits. The `externalUrl`
// fields link to live Behance galleries.
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

/**
 * Creates a Behance-style bold typographic cover graphic (SVG Data URI)
 * matching Sidharth's portfolio branding.
 */
const typographicCover = (title: string, bgColor: string, textColor = "#FFFFFF") => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <rect width="1200" height="900" fill="${bgColor}"/>
    <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="${textColor}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="52" letter-spacing="4">${title.toUpperCase()}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const projects: Project[] = [
  {
    slug: "isha-foundation",
    title: "Isha Foundation",
    category: "Digital Marketing Videos",
    excerpt: "250+ films carrying Sadhguru's global causes to millions.",
    description:
      "As Creative Director heading the video department, leading the films behind Isha's major campaigns — Save Soil, Rally for Rivers, Cauvery Calling, COP28, G20, Insight, Isha Leadership Academy and more — work that has helped grow the foundation's reach to over 11 million followers worldwide.",
    role: "Creative Director · Director / Writer",
    client: "Isha Foundation",
    year: 2024,
    cover: typographicCover("ISHA FOUNDATION", "#E27536"),
    externalUrl: "https://www.behance.net/gallery/189059961/Isha-Foundation",
    featured: true,
    stills: [],
  },
  {
    slug: "music-videos",
    title: "Music Videos",
    category: "Filmmaking",
    excerpt: "Performance and narrative music films.",
    description:
      "A selection of music videos — performance-led and narrative — directed and finished with a distinct visual signature.",
    role: "Director · Editor",
    client: "Independent artists",
    year: 2022,
    cover: typographicCover("MUSIC VIDEOS", "#E23E3E"),
    externalUrl: "https://www.behance.net/gallery/189061121/Music-Video",
    featured: true,
    stills: [],
  },
  {
    slug: "survivor-tamil",
    title: "Survivor (Zee Tamil)",
    category: "Web Series",
    excerpt: "Senior producing & direction on a flagship reality series.",
    description:
      "Senior Program Producer and Director on the Tamil edition of the global reality format Survivor — large-scale, location-based production demanding precise scheduling, logistics and on-the-fly direction across a demanding shoot.",
    role: "Senior Program Producer / Director",
    client: "Banijay Asia · Zee Tamil",
    year: 2021,
    cover: typographicCover("WEB-SERIES", "#BE9F17"),
    featured: true,
    stills: [],
  },
  {
    slug: "advertisements",
    title: "Advertisements",
    category: "Ad Films",
    excerpt: "Commercial spots across products and categories.",
    description:
      "A reel of advertising work spanning products and categories — crafted to make brands feel cinematic rather than promotional.",
    role: "Director · Editor",
    client: "Various brands",
    year: 2023,
    cover: typographicCover("AD FILMS", "#458B47"),
    externalUrl: "https://www.behance.net/gallery/195559753/Advertisements",
    featured: true,
    stills: [],
  },
  {
    slug: "corporate-ads",
    title: "Corporate Films",
    category: "Ad Films",
    excerpt: "Brand and corporate films for 100+ brands.",
    description:
      "A body of corporate and brand films created for clients including ASUS (ROG), Conscious Planet, Dr Joy Med Store, Mountire and many more — concept through to final grade.",
    role: "Director · Writer · Editor",
    client: "Various brands",
    year: 2023,
    cover: typographicCover("CORPORATE ADS", "#3E61E2"),
    externalUrl: "https://www.behance.net/gallery/189061373/Corporate-Ads",
    featured: true,
    stills: [],
  },
  {
    slug: "smaranayil",
    title: "Smaranayil",
    category: "Filmmaking",
    excerpt: "Original concept and screenplay for a feature.",
    description:
      "Concept, story and screenplay as Creative Director and writer — a film developed in collaboration with Joy Movie Productions, showcasing the studio's authorial voice from the page through to direction.",
    role: "Creative Director / Scriptwriter",
    client: "Joy Movie Productions",
    year: 2022,
    cover: typographicCover("SMARANAYIL", "#222226"),
    featured: true,
    stills: [],
  },
  {
    slug: "puncch-beat",
    title: "Puncch Beat",
    category: "Web Series",
    excerpt: "1st AD on a hit youth drama for ALT Balaji.",
    description:
      "First Assistant Director on the popular youth drama for ALT Balaji — coordinating cast, crew and a complex shooting schedule to keep an ambitious episodic production on track.",
    role: "1st Assistant Director",
    client: "ALT Balaji",
    year: 2019,
    cover: typographicCover("PUNCCH BEAT", "#BE9F17"),
    stills: [],
  },
  {
    slug: "cartel",
    title: "Cartel",
    category: "Web Series",
    excerpt: "1st AD on a crime drama for ALT Balaji / MX Player.",
    description:
      "First Assistant Director on the crime drama series for ALT Balaji and MX Player — managing on-set logistics and continuity across a large ensemble production.",
    role: "1st Assistant Director",
    client: "ALT Balaji · MX Player",
    year: 2021,
    cover: typographicCover("CARTEL", "#2B3045"),
    stills: [],
  },
  {
    slug: "gumrah-s3",
    title: "Gumrah — Season 3",
    category: "Web Series",
    excerpt: "Creative Head on the Channel V crime anthology.",
    description:
      "Creative Head on Season 3 of the Channel V crime anthology (Balaji Telefilms) — shaping stories, scripts and the look of the series across the season.",
    role: "Creative Head",
    client: "Balaji Telefilms · Channel V",
    year: 2016,
    cover: typographicCover("GUMRAH S3", "#BE9F17"),
    stills: [],
  },
  {
    slug: "anjaan",
    title: "Anjaan",
    category: "Documentaries",
    excerpt: "Creative Head on a mystery non-fiction series.",
    description:
      "Creative Head on the series Anjaan for Discovery Jeet (Lotus Talkies) — bringing a documentary sensibility and strong narrative structure to real, unexplained stories.",
    role: "Creative Head",
    client: "Lotus Talkies · Discovery Jeet",
    year: 2018,
    cover: typographicCover("ANJAAN", "#C56828"),
    stills: [],
  },
];

/** Lookup helper used by detail views and "linked example" references. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Homepage strip source. */
export const featuredProjects = projects.filter((p) => p.featured);
