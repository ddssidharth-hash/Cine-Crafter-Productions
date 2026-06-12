"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectModal, type ProjectModalData } from "@/components/work/ProjectModal";
import { featuredProjects } from "@/data/projects";
import type { Project } from "@/types";

// ═══════════════════════════════════════════════════════════════════════
// HOME — Featured Work. Horizontally scrollable strip of highlighted projects
// (snap-scroll on touch, drag-free), linking through to the full Work page.
// Clicking a card opens the same detail modal used on the Work page.
// ═══════════════════════════════════════════════════════════════════════

function toModalData(p: Project): ProjectModalData {
  return {
    title: p.title,
    meta: p.category,
    year: p.year,
    description: p.description,
    role: p.role,
    client: p.client,
    cover: p.cover,
    videoUrl: p.videoUrl || undefined,
    stills: p.stills,
  };
}

export function FeaturedWork() {
  const [active, setActive] = useState<ProjectModalData | null>(null);

  return (
    <section className="border-b border-base-line py-28 sm:py-36">
      <div className="frame mb-14 flex items-end justify-between gap-6">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Selected Work</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif text-display-sm text-ink">Recent stories.</h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Link href="/work" className="link-underline shrink-0">
            View all <span className="ml-2">&rarr;</span>
          </Link>
        </Reveal>
      </div>

      {/* Horizontal snap strip. Edge padding matches the frame gutters. */}
      <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 sm:px-10 lg:px-16">
        {featuredProjects.map((p) => (
          <div
            key={p.slug}
            className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[30vw] xl:w-[24rem]"
          >
            <ProjectCard
              title={p.title}
              meta={p.category}
              excerpt={p.excerpt}
              cover={p.cover}
              previewUrl={p.previewUrl || undefined}
              aspect="aspect-[3/4]"
              onSelect={() => setActive(toModalData(p))}
            />
          </div>
        ))}
      </div>

      <ProjectModal data={active} onClose={() => setActive(null)} />
    </section>
  );
}
