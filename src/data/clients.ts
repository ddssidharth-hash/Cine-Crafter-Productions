import type { Logo } from "@/types";

// ═══════════════════════════════════════════════════════════════════════
// CLIENTS & AGENCIES — drives the homepage logo strip and the Clients page.
// Two lists: brands/networks the studio has worked with, and the production
// houses / studios it has collaborated with.
//
// Drawn from Sidharth's real credits and brand work.
//
// TODO: Add real logo assets (monochrome SVG/PNG) at `src` for each entry.
//       When `src` is omitted the UI falls back to a refined wordmark.
// ═══════════════════════════════════════════════════════════════════════

// Brands, foundations & broadcast networks.
export const clients: Logo[] = [
  { name: "Isha Foundation" },
  { name: "Sun Network" },
  { name: "MTV" },
  { name: "Channel V" },
  { name: "Zee Tamil" },
  { name: "Discovery Jeet" },
  { name: "MX Player" },
  { name: "ASUS ROG" },
  { name: "Conscious Planet" },
  { name: "Dr Joy Med Store" },
  { name: "Mountire" },
];

// Production houses & studios collaborated with.
export const agencies: Logo[] = [
  { name: "Balaji Telefilms" },
  { name: "ALT Balaji" },
  { name: "Banijay Asia" },
  { name: "Joy Movie Productions" },
  { name: "Lotus Talkies" },
  { name: "Cryptic Intel" },
  { name: "Honeycomb Creative" },
];

/** Combined set for the minimal homepage strip. */
export const homepageLogos: Logo[] = [
  { name: "Isha Foundation" },
  { name: "Balaji Telefilms" },
  { name: "ALT Balaji" },
  { name: "Banijay Asia" },
  { name: "MTV" },
  { name: "Sun Network" },
];
