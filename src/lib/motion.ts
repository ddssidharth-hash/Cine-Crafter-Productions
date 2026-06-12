import type { Transition, Variants } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════
// Shared motion language — slow, cinematic easing. No bounce, no spring.
// Import these instead of redefining easing/duration per component so the
// whole site moves with one consistent rhythm.
// ═══════════════════════════════════════════════════════════════════════

/** Primary ease-out curve (matches the Tailwind `ease-cine` token). */
export const easeCine: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeCineInOut: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const durations = {
  fast: 0.4,
  base: 0.7,
  slow: 1,
} as const;

/** Standard scroll-reveal: gentle fade + rise. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.base, ease: easeCine },
  },
};

/** Simple fade with no movement (used for overlays / images). */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.slow, ease: easeCine } },
};

/** Parent that staggers its children's reveals. */
export const stagger = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Page-transition transition object. */
export const pageTransition: Transition = {
  duration: durations.base,
  ease: easeCine,
};

/** Shared viewport config for whileInView reveals. */
export const inView = { once: true, amount: 0.25 } as const;
