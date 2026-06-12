import "server-only";

// ═══════════════════════════════════════════════════════════════════════
// SERVER-ONLY contact secrets.
// The `server-only` import guarantees this module can never be bundled into
// client-side JavaScript. These are the GATED direct contact details — they
// are returned by the contact API only after a successful inquiry submission,
// and are also injected into the studio notification email.
//
// TODO: Replace with the real direct/personal contact channels. Prefer
//       setting them via environment variables (below) over hard-coding.
// ═══════════════════════════════════════════════════════════════════════

export const directContact = {
  phone: process.env.DIRECT_PHONE ?? "+00 00000 00000", // TODO: real direct line
  whatsapp: process.env.DIRECT_WHATSAPP ?? "+00 00000 00000", // TODO: real WhatsApp
  email: process.env.DIRECT_EMAIL ?? "founder@cinecrafter.example", // TODO: real direct email
};

export type DirectContact = typeof directContact;
