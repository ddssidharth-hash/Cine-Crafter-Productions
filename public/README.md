# /public — static assets

Drop real assets here as they're supplied. Referenced placeholders:

- `logo.svg` (or `logo.png`) — the studio logo. After adding it, set
  `LOGO_SRC` in `src/components/Logo.tsx`. Used in the header, footer and
  intro animation.
- `og.jpg` — Open Graph share image, 1200×630. Referenced in
  `src/app/layout.tsx` metadata.
- `media/hero.mp4` + `media/hero.webm` — the homepage hero reel (compressed,
  muted, looping). Enable the `<video>` block in `src/components/home/Hero.tsx`.
- `media/<project>/preview.mp4` — per-project muted loop previews used on card
  hover and in the showreel. Wire up via `previewUrl` in the data files.

Keep images as WebP/AVIF and videos as compressed MP4/WebM to protect
performance.
