import type { ExperimentalProject } from "@/types";

// ═══════════════════════════════════════════════════════════════════════
// EXPERIMENTAL / PASSION PROJECTS — the studio's looser, self-initiated work:
// solo documentary journeys, travel films and personal explorations.
// ═══════════════════════════════════════════════════════════════════════

const typographicCover = (title: string, bgColor: string, textColor = "#FFFFFF") => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <rect width="1200" height="900" fill="${bgColor}"/>
    <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="${textColor}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="46" letter-spacing="3">${title.toUpperCase()}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const experimentalProjects: ExperimentalProject[] = [
  {
    slug: "in-search-of-homo-sapiens",
    title: "In Search of Homo Sapiens",
    tag: "Documentary · Expedition",
    excerpt:
      "A penniless 7,000 km odyssey from Chennai to Sikkim in search of the Drokpas.",
    description:
      "The most heart-warming journey I have taken — travelling 7,000 kilometres by foot and by hitchhiking, with no money, from Chennai to a remote region of Sikkim in search of the nomadic holistic tribe, 'The Drokpas', now just twelve in number. Documented through video and writing with the help of the Sikkim government, and being given life as a travel series and a book.",
    year: 2024,
    cover: typographicCover("HOMO SAPIENS", "#2D4A3E"),
    stills: [],
  },
  {
    slug: "kilimanjaro",
    title: "Conquering Kilimanjaro",
    tag: "Documentary · Expedition",
    excerpt:
      "Summiting the world's tallest free-standing mountain — and the lives behind the climb.",
    description:
      "A climb to the summit of Mount Kilimanjaro, guided by a member of the Chaga community who helped set up the expedition. Beyond the summit, the film documents the lives of the guides and porters who give everything to make our climbs possible.",
    year: 2023,
    cover: typographicCover("KILIMANJARO", "#C45A34"),
    stills: [],
  },

  {
    slug: "east-africa-maasai",
    title: "Among the Maasai",
    tag: "Travel · Field",
    excerpt: "Living with the locals across the dry savanna of East Africa.",
    description:
      "Exploring the dry savanna of East Africa — staying with local communities and the Maasai, and documenting the people met along the way who opened the journey up to humanity.",
    year: 2023,
    cover: typographicCover("AMONG THE MAASAI", "#B87B28"),
    stills: [],
  },
];

export function getExperimentalBySlug(
  slug: string,
): ExperimentalProject | undefined {
  return experimentalProjects.find((p) => p.slug === slug);
}
