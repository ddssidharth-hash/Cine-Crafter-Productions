// ═══════════════════════════════════════════════════════════════════════
// SITE CONFIG — global, editable settings.
// Brand copy, navigation, contact details, social links, feature flags.
// Edit values here; no need to touch component code.
// ═══════════════════════════════════════════════════════════════════════

export const siteConfig = {
  name: "CineCrafter Productions",
  shortName: "CineCrafter",
  // TODO: Replace with the final approved tagline.
  tagline: "Crafting Cinematic Stories for the World",
  // Used for <meta> description / SEO.
  description:
    "CineCrafter Productions is a boutique film studio crafting cinematic stories for brands, agencies, and producers worldwide — film production, ad films, documentaries, and AI-driven video.",
  // TODO: Set the canonical production URL before deploying (used for metadata).
  url: "https://cinecrafter.example",

  // ─── Primary navigation (header + mobile overlay) ─────────────────────
  nav: [
    { label: "Work", href: "/work" },
    { label: "Experimental", href: "/experimental" },
    { label: "Services", href: "/services" },
    { label: "Showreel", href: "/showreel" },
    { label: "Clients", href: "/clients" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  // ─── Contact details (PUBLIC) ─────────────────────────────────────────
  // `gateDirectContact` controls the privacy gate. When true, the direct /
  // personal channels are NOT shipped to the browser at all — they live
  // server-side in src/lib/server/contact-secrets.ts and are only returned by
  // the contact API after a successful submission. Flip to false (and move the
  // values into `general`) if you'd rather display them openly.
  // TODO: Replace placeholder contact details with the real ones.
  contact: {
    gateDirectContact: true,

    // Publicly shown, always — safe to ship to the client.
    general: {
      email: "dds.sidharth@gmail.com",
      location: "Kochi, India · Available worldwide",
      hours: "Mon–Fri, 10:00–18:00 IST",
    },
  },

  // ─── Social links ────────────────────────────────────────────────────
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sidharth-menon-047b81141",
    },
    { label: "Behance", href: "https://www.behance.net/sidharthmenon7" },
    // TODO: add Instagram / YouTube / IMDb profiles here when available.
  ],

  // ─── Budget ranges offered in the inquiry form dropdown ───────────────
  budgetRanges: [
    "Under $10k",
    "$10k – $25k",
    "$25k – $50k",
    "$50k – $100k",
    "$100k+",
    "Prefer not to say",
  ],

  // ─── "How did you hear about us" options ──────────────────────────────
  referralSources: [
    "Referral / word of mouth",
    "Instagram",
    "LinkedIn",
    "An existing client or agency",
    "Search",
    "Saw our work elsewhere",
    "Other",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
