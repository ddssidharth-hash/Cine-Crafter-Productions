import type { Config } from "tailwindcss";

/**
 * The entire palette is driven by CSS variables declared in src/app/globals.css.
 * To re-skin the whole site, change the variable values in ONE place (globals.css
 * :root block) — every Tailwind color token below reads from those variables.
 *
 * TODO: Insert the final, client-approved color palette in globals.css :root.
 */
const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Near-black canvas + off-white ink + a single muted accent.
        ink: {
          DEFAULT: "rgb(var(--color-ink) / <alpha-value>)", // off-white text
          muted: "rgb(var(--color-ink-muted) / <alpha-value>)", // secondary text
          faint: "rgb(var(--color-ink-faint) / <alpha-value>)", // tertiary / captions
        },
        base: {
          DEFAULT: "rgb(var(--color-base) / <alpha-value>)", // near-black background
          elevated: "rgb(var(--color-base-elevated) / <alpha-value>)", // cards / panels
          line: "rgb(var(--color-line) / <alpha-value>)", // hairline borders
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)", // muted gold / steel
          soft: "rgb(var(--color-accent-soft) / <alpha-value>)",
        },
      },
      fontFamily: {
        // Editorial serif for display headings, clean grotesque for body.
        // Wired up via next/font in src/app/layout.tsx (CSS variables).
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Confident cinematic display scale.
        "display-sm": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display": ["clamp(3.25rem, 9vw, 7rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(4rem, 13vw, 11rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
      },
      letterSpacing: {
        widest: "0.28em",
      },
      maxWidth: {
        frame: "100rem", // outer site frame
        prose: "42rem",
      },
      transitionTimingFunction: {
        // Slow, cinematic easing — no bounce.
        cine: "cubic-bezier(0.16, 1, 0.3, 1)",
        "cine-in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
