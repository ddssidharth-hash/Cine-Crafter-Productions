"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectModal, type ProjectModalData } from "@/components/work/ProjectModal";
import { experimentalProjects } from "@/data/experimental";
import type { ExperimentalProject } from "@/types";

// ═══════════════════════════════════════════════════════════════════════
// EXPERIMENTAL GALLERY — looser, off-grid layout for passion projects.
// Reuses ProjectCard + ProjectModal but staggers tile sizes/offsets so the
// page reads as more personal and exploratory than the main portfolio.
// ═══════════════════════════════════════════════════════════════════════

function toModalData(p: ExperimentalProject): ProjectModalData {
  return {
    title: p.title,
    meta: p.tag,
    year: p.year,
    description: p.description,
    cover: p.cover,
    videoUrl: p.videoUrl || undefined,
    stills: p.stills,
  };
}

// Per-tile treatment: alternating column span + vertical offset for rhythm.
const layout = [
  { span: "lg:col-span-7", offset: "lg:mt-0", aspect: "aspect-video" },
  { span: "lg:col-span-5", offset: "lg:mt-24", aspect: "aspect-[3/4]" },
  { span: "lg:col-span-5", offset: "lg:-mt-12", aspect: "aspect-[4/5]" },
  { span: "lg:col-span-7", offset: "lg:mt-16", aspect: "aspect-video" },
];

export function ExperimentalGallery() {
  const [active, setActive] = useState<ProjectModalData | null>(null);

  return (
    <div className="frame pb-32">
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-12">
        {experimentalProjects.map((p, i) => {
          const l = layout[i % layout.length];
          return (
            <div key={p.slug} className={`${l.span} ${l.offset}`}>
              <ProjectCard
                title={p.title}
                meta={`${p.tag} · ${p.year}`}
                excerpt={p.excerpt}
                cover={p.cover}
                previewUrl={p.previewUrl || undefined}
                aspect={l.aspect}
                index={i}
                onSelect={() => setActive(toModalData(p))}
              />
            </div>
          );
        })}
      </div>

      <ProjectModal data={active} onClose={() => setActive(null)} />
    </div>
  );
}
