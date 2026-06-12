"use client";

import { useRef, useState } from "react";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════════════
// PROJECT CARD — presentational thumbnail used by the featured strip, the
// Work grid and the Experimental page.
//
// • Optional muted `previewUrl` video plays on hover (lazy: only loaded on
//   first hover, paused/reset on leave) for a premium micro-interaction.
// • A "View Project" label fades in on hover.
// • Whole card is a button so it works for keyboard users; parent supplies
//   the click handler (open modal) or wrap in a Link for navigation.
// ═══════════════════════════════════════════════════════════════════════

interface ProjectCardProps {
  title: string;
  /** Small meta line — category or tag. */
  meta: string;
  excerpt?: string;
  cover: string;
  /** Optional muted loop preview (mp4/webm). */
  previewUrl?: string;
  /** Aspect ratio class, e.g. "aspect-[3/4]" or "aspect-video". */
  aspect?: string;
  onSelect?: () => void;
  /** Larger index number shown faintly (experimental layout). */
  index?: number;
}

export function ProjectCard({
  title,
  meta,
  excerpt,
  cover,
  previewUrl,
  aspect = "aspect-[4/5]",
  onSelect,
  index,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setHovered(true);
    if (previewUrl && videoRef.current) {
      void videoRef.current.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      className="group block w-full text-left outline-none"
    >
      <div
        className={`relative ${aspect} w-full overflow-hidden bg-base-elevated`}
      >
        <Image
          src={cover}
          alt={title}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-[transform,opacity,filter] duration-700 ease-cine group-hover:scale-[1.04] ${
            previewReady && hovered ? "opacity-0" : "opacity-100"
          } [filter:saturate(0.92)] group-hover:[filter:saturate(1)]`}
        />

        {/* Lazy hover preview video */}
        {previewUrl && (hovered || previewReady) && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              previewReady && hovered ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            preload="none"
            onLoadedData={() => setPreviewReady(true)}
          >
            <source src={previewUrl} />
          </video>
        )}

        {/* Hover scrim + label */}
        <div className="pointer-events-none absolute inset-0 bg-base/0 transition-colors duration-500 ease-cine group-hover:bg-base/20" />
        <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 opacity-0 transition-all duration-500 ease-cine group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="eyebrow text-ink">View Project</span>
          <span aria-hidden className="text-accent">
            &rarr;
          </span>
        </div>

        {/* Faint index for experimental layout */}
        {typeof index === "number" && (
          <span className="pointer-events-none absolute right-4 top-3 font-serif text-2xl text-ink/30">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-xl text-ink transition-colors duration-300 group-hover:text-accent">
            {title}
          </h3>
        </div>
        <p className="eyebrow mt-2">{meta}</p>
        {excerpt && (
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{excerpt}</p>
        )}
      </div>
    </button>
  );
}
