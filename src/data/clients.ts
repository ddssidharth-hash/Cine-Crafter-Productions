import type { Logo } from "@/types";

// ═══════════════════════════════════════════════════════════════════════
// CLIENTS & AGENCIES — drives the homepage logo strip and the Clients page.
// Two distinct lists so the Clients page can render them as separate sections.
//
// TODO: Replace placeholder names with real clients/agencies, and add real
//       logo assets (monochrome SVG/PNG) at `src`. When `src` is omitted the
//       UI falls back to a refined wordmark of the `name`.
// ═══════════════════════════════════════════════════════════════════════

export const clients: Logo[] = [
  { name: "Atlas Pictures" },
  { name: "Northwind Apparel" },
  { name: "Meridian" },
  { name: "Streamline Originals" },
  { name: "Evergreen Home" },
  { name: "Public Broadcast Trust" },
  { name: "Halcyon Studios" },
  { name: "Lumen Group" },
];

export const agencies: Logo[] = [
  { name: "Meridian Agency" },
  { name: "Field & Co." },
  { name: "The Forge" },
  { name: "Brightline" },
  { name: "North & Park" },
  { name: "Studio Vera" },
];

/** Combined, de-duplicated set for the minimal homepage strip. */
export const homepageLogos: Logo[] = [...clients.slice(0, 6)];
