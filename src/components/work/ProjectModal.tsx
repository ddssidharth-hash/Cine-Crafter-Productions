"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeCine } from "@/lib/motion";
import type { MediaStill } from "@/types";

// ═══════════════════════════════════════════════════════════════════════
// PROJECT MODAL — the detail view. Used by both Work and Experimental pages.
// Renders an embedded player (or cover poster), full description, the
// studio's role, the client/agency credit, and a gallery of stills.
//
// `videoUrl` may be a YouTube/Vimeo embed URL or a self-hosted mp4/webm.
// ═══════════════════════════════════════════════════════════════════════

export interface ProjectModalData {
  title: string;
  meta: string;
  year: number;
  description: string;
  role?: string;
  client?: string;
  cover: string;
  videoUrl?: string;
  stills?: MediaStill[];
  /** Optional deep-link to a full project page if you add one later. */
  href?: string;
}

interface ProjectModalProps {
  data: ProjectModalData | null;
  onClose: () => void;
}

function isFileVideo(url: string) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}

export function ProjectModal({ data, onClose }: ProjectModalProps) {
  const reduce = useReducedMotion();

  // Lock scroll + Escape to close while open.
  useEffect(() => {
    if (!data) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [data, onClose]);

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          className="fixed inset-0 z-[90] overflow-y-auto bg-base/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: easeCine }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${data.title} — project detail`}
        >
          <motion.div
            className="relative mx-auto my-12 w-full max-w-5xl px-6"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: easeCine }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project"
              className="sticky top-0 z-10 mb-4 ml-auto flex h-10 w-10 items-center justify-center text-ink-muted transition-colors duration-300 hover:text-accent"
            >
              <span className="text-2xl leading-none">&times;</span>
            </button>

            {/* Media */}
            <div className="relative aspect-video w-full overflow-hidden bg-base-elevated">
              {data.videoUrl ? (
                isFileVideo(data.videoUrl) ? (
                  <video
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    poster={data.cover}
                  >
                    <source src={data.videoUrl} />
                  </video>
                ) : (
                  <iframe
                    className="h-full w-full"
                    src={data.videoUrl}
                    title={data.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )
              ) : (
                <Image
                  src={data.cover}
                  alt={data.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
              )}
            </div>

            {/* Meta + copy */}
            <div className="mt-10 grid gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <p className="eyebrow mb-4">
                  {data.meta} · {data.year}
                </p>
                <h2 className="font-serif text-display-sm text-ink">
                  {data.title}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-ink-muted">
                  {data.description}
                </p>
                {data.href && (
                  <Link href={data.href} className="link-underline mt-8 inline-flex">
                    View full project <span className="ml-2">&rarr;</span>
                  </Link>
                )}
              </div>

              <dl className="space-y-6 md:col-span-5">
                {data.role && (
                  <div>
                    <dt className="eyebrow mb-2">Role</dt>
                    <dd className="text-ink">{data.role}</dd>
                  </div>
                )}
                {data.client && (
                  <div>
                    <dt className="eyebrow mb-2">Client</dt>
                    <dd className="text-ink">{data.client}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Stills gallery */}
            {data.stills && data.stills.length > 0 && (
              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {data.stills.map((still, i) => (
                  <div
                    key={i}
                    className="relative aspect-video overflow-hidden bg-base-elevated"
                  >
                    <Image
                      src={still.src}
                      alt={still.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
