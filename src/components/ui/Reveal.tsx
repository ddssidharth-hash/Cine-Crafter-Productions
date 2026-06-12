"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeCine, durations, inView } from "@/lib/motion";

// ═══════════════════════════════════════════════════════════════════════
// REVEAL — drop-in scroll-triggered fade/slide-in.
// Honors prefers-reduced-motion automatically (renders static when reduced).
// Polymorphic via `as` (e.g. as="li") so it can sit inside semantic lists.
//
// Usage:  <Reveal>…</Reveal>  ·  <Reveal as="li" delay={0.1}>…</Reveal>
// ═══════════════════════════════════════════════════════════════════════

type RevealTag = "div" | "li" | "section" | "article" | "span";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Travel distance for the slide. */
  y?: number;
  /** Element to render. */
  as?: RevealTag;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const StaticTag = as as keyof JSX.IntrinsicElements;

  if (reduce) {
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: durations.base, ease: easeCine, delay }}
    >
      {children}
    </MotionTag>
  );
}
