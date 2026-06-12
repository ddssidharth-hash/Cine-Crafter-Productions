"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeCine } from "@/lib/motion";

// ═══════════════════════════════════════════════════════════════════════
// SHOWREEL SLIDER — a full-screen, cinematic, slide-based showcase of ALL
// of the studio's output. One continuous sequence of videos and key stills.
//
// • Keyboard: ← / → (or ↑ / ↓) to move, Home/End to jump.
// • Touch: horizontal swipe.
// • Video previews autoplay on-mute when their slide is active and pause
//   otherwise. Reduced-motion users get the still cover instead of autoplay.
// • Each slide links through to the relevant portfolio entry.
// ═══════════════════════════════════════════════════════════════════════

export interface ShowreelSlide {
  title: string;
  category: string;
  client?: string;
  cover: string;
  videoUrl?: string; // self-hosted mp4/webm for muted autoplay preview
  href: string; // "view full project" target
}

export function ShowreelSlider({ slides }: { slides: ShowreelSlide[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const count = slides.length;

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(((next % count) + count) % count);
    },
    [index, count],
  );

  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(count - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go, count]);

  // Autoplay the active slide's video (muted); reset on slide change.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;
    v.currentTime = 0;
    void v.play().catch(() => {});
  }, [index, reduce]);

  const active = slides[index];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * -60 }),
  };

  return (
    <section
      className="relative h-[100svh] w-full select-none overflow-hidden bg-base"
      aria-roledescription="carousel"
      aria-label="Showreel"
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchStartX.current = null;
      }}
    >
      {/* Slide media */}
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={index}
          className="absolute inset-0"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: easeCine }}
        >
          {active.videoUrl && !reduce ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              autoPlay
              poster={active.cover}
            >
              <source src={active.videoUrl} />
            </video>
          ) : (
            <Image
              src={active.cover}
              alt={active.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-base via-base/30 to-base/40" />
        </motion.div>
      </AnimatePresence>

      {/* Slide caption */}
      <div className="pointer-events-none absolute inset-0 flex items-end">
        <div className="frame pb-24 sm:pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: easeCine }}
            >
              <p className="eyebrow mb-4">
                {active.category}
                {active.client ? ` · ${active.client}` : ""}
              </p>
              <h2 className="max-w-4xl font-serif text-display-sm text-ink">
                {active.title}
              </h2>
              <Link
                href={active.href}
                className="link-underline pointer-events-auto mt-6 inline-flex"
              >
                View full project <span className="ml-2">&rarr;</span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-ink-muted transition-colors duration-300 hover:text-accent sm:flex"
      >
        <span className="text-3xl">&larr;</span>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-ink-muted transition-colors duration-300 hover:text-accent sm:flex"
      >
        <span className="text-3xl">&rarr;</span>
      </button>

      {/* Index + progress dots */}
      <div className="absolute inset-x-0 top-24 flex items-center justify-between px-6 sm:px-10 lg:px-16">
        <span className="eyebrow">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ease-cine ${
                i === index ? "w-8 bg-accent" : "w-2 bg-ink-faint hover:bg-ink-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
