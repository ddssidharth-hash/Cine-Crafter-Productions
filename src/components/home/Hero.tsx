"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/site-config";
import { easeCine } from "@/lib/motion";

// ═══════════════════════════════════════════════════════════════════════
// HOME HERO — full-bleed cinematic background with the studio name + tagline
// and a subtle scroll cue.
//
// TODO: Replace the placeholder background. For a video hero, uncomment the
//       <video> block and provide a compressed, muted, looping MP4/WebM with
//       a poster frame. Keep the still <Image> as the poster/fallback.
// TODO: Replace the placeholder still image (HERO_IMAGE) with a real frame.
// ═══════════════════════════════════════════════════════════════════════

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2400&q=75";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex h-[100svh] min-h-[600px] w-full items-center overflow-hidden">
      {/* Background media */}
      <div className="absolute inset-0 -z-10">
        {/* ── VIDEO HERO (preferred). Uncomment and supply assets. ──
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_IMAGE}
        >
          <source src="/media/hero.webm" type="video/webm" />  // TODO: real reel
          <source src="/media/hero.mp4" type="video/mp4" />    // TODO: real reel
        </video>
        */}

        {/* Still fallback / poster */}
        <Image
          src={HERO_IMAGE}
          alt="" // decorative; the heading carries the meaning
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Cinematic darkening so type stays legible over any frame. */}
        <div className="absolute inset-0 bg-gradient-to-b from-base/70 via-base/40 to-base" />
        <div className="absolute inset-0 bg-base/30" />
      </div>

      {/* Hero copy */}
      <div className="frame">
        <motion.p
          className="eyebrow mb-7"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeCine, delay: 0.1 }}
        >
          {siteConfig.name}
        </motion.p>

        <motion.h1
          className="max-w-5xl font-serif text-display text-ink"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeCine, delay: 0.2 }}
        >
          {/* TODO: confirm final tagline */}
          {siteConfig.tagline}
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeCine, delay: 0.35 }}
        >
          {/* TODO: confirm hero sub-copy */}
          A boutique production house for brands, agencies and producers who
          want their stories told with the patience and polish of cinema.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute inset-x-0 bottom-8 flex justify-center"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: easeCine, delay: 0.8 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="eyebrow">Scroll</span>
          <motion.span
            className="block h-10 w-px bg-ink-faint"
            animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
