# CineCrafter Productions

A premium, cinematic portfolio website for a boutique film studio. Built with
Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
```

## Project structure

```
src/
  app/                     App Router pages + the contact API route
    page.tsx               Home
    work/                  Portfolio (filterable, with detail modal)
    experimental/          Experimental / passion work
    services/              Services ("What We Do")
    showreel/              Full-screen showreel slider
    clients/               Clients & Agencies
    about/                 About / Information
    contact/               Contact + inquiry form
    api/contact/route.ts   Inquiry handler (email TODO)
  components/              UI + section components (layout, home, work, …)
  data/                    ← EDIT CONTENT HERE (projects, services, clients…)
  lib/                     Motion presets + server-only secrets
  site-config.ts           ← Global config: brand, nav, contact, social
  types.ts                 Shared types
tailwind.config.ts          Theme tokens (read from CSS variables)
src/app/globals.css         ← EDIT THE COLOR PALETTE HERE (:root)
```

## Editing content (no developer needed)

| What | Where |
| --- | --- |
| Brand name, tagline, nav, social, contact, dropdown options | `src/site-config.ts` |
| Color palette | `src/app/globals.css` → `:root` |
| Fonts | `src/app/layout.tsx` |
| Portfolio projects | `src/data/projects.ts` |
| Experimental projects | `src/data/experimental.ts` |
| Services | `src/data/services.ts` |
| Clients & agencies | `src/data/clients.ts` |
| About page (bio, stats, process, awards) | `src/data/about.ts` |
| Logo asset | add to `/public`, set `LOGO_SRC` in `src/components/Logo.tsx` |

## What still needs real input

Search the codebase for `TODO:` — every placeholder is flagged. The key items:

1. **Logo asset** — add to `/public`, set `LOGO_SRC` in `Logo.tsx`.
2. **Color palette** — final values in `globals.css :root`.
3. **Fonts** — swap to licensed faces (Söhne/Canela) via `next/font/local` if desired.
4. **Media** — replace all placeholder Unsplash covers and add real
   video/preview files (see `/public/README.md`).
5. **Copy & credits** — replace placeholder copy and client credits in `/data`.
6. **Contact details** — real general + direct contact in `site-config.ts` and
   `src/lib/server/contact-secrets.ts`.
7. **Contact form** — submissions are now persisted to **Firestore** (the
   `inquiries` collection) by the API route, so the form works without email.
   To also get email notifications, wire up Resend in
   `src/app/api/contact/route.ts` and set env vars (see `.env.local.example`).

## Firebase

The site is wired to the `cine-crafter-productions` Firebase project:

- **Init** — `src/lib/firebase.ts` (web config is public-by-design; safe to
  commit; override per-env with `NEXT_PUBLIC_FIREBASE_*`).
- **Analytics** — `src/components/Analytics.tsx`, mounted in the layout
  (browser-only, support-gated).
- **Firestore** — the contact API writes inquiries to `inquiries`. Rules in
  `firestore.rules` allow create-only (validated); reads are admin-only.

**One-time Firebase setup:**

```bash
npm i -g firebase-tools          # if not installed
firebase login
firebase deploy --only firestore:rules   # enable Firestore first in the console
```

## Privacy gate on direct contact

Direct/personal contact details are **never shipped to the browser**. They live
server-side in `src/lib/server/contact-secrets.ts` and are only returned by the
contact API after a successful inquiry, then shown in the confirmation screen.
Toggle with `siteConfig.contact.gateDirectContact`.

## Accessibility & motion

- All animations respect `prefers-reduced-motion`.
- Keyboard navigation throughout (skip link, focus states, Escape to close
  overlays/modals, arrow-key showreel navigation).

## Deploy

**Firebase App Hosting (recommended — pairs with GitHub):** In the Firebase
console → App Hosting → connect the GitHub repo
(`ddssidharth-hash/Cine-Crafter-Productions`), branch `main`. App Hosting
auto-detects Next.js, builds the full app (SSR + the `/api/contact` route), and
uses `apphosting.yaml` for runtime config. Pushes to `main` auto-deploy.

**Vercel (alternative):** Import the repo into Vercel; add the env vars from
`.env.local.example`. The Firebase integration still works (Analytics +
Firestore).

> Note: classic static **Firebase Hosting** is *not* used here because the app
> has a server API route (`/api/contact`). Use App Hosting for SSR.
