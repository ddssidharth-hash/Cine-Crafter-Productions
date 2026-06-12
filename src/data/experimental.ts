import type { ExperimentalProject } from "@/types";

// ═══════════════════════════════════════════════════════════════════════
// EXPERIMENTAL / PASSION PROJECTS — the studio's looser, self-initiated work:
// solo documentary journeys, travel films and personal explorations.
//
// Drawn from Sidharth's real expeditions and passion projects.
//
// TODO: Replace placeholder covers with real frames/photographs from each
//       journey, and add `videoUrl` / `previewUrl` where footage exists.
// ═══════════════════════════════════════════════════════════════════════

const ph = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=70`;

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
    cover: ph("photo-1464822759023-fed622ff2c3b"),
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
    cover: ph("photo-1521150932951-303a95503ed3"),
    stills: [],
  },
  {
    slug: "western-ghats",
    title: "Stories of the Western Ghats",
    tag: "Documentary · Solo",
    excerpt:
      "Cycling the Western Ghats solo, in search of endemic tribes and their stories.",
    description:
      "A solo cycling expedition across the Western Ghats in search of stories from the region's endemic tribes — living among them, documenting their livelihoods and writing about their way of life.",
    year: 2022,
    cover: ph("photo-1470071459604-3b5ec3a7fe05"),
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
    cover: ph("photo-1516426122078-c23e76319801"),
    stills: [],
  },
];

export function getExperimentalBySlug(
  slug: string,
): ExperimentalProject | undefined {
  return experimentalProjects.find((p) => p.slug === slug);
}
