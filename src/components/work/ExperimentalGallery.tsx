"use client";

import { useState, useEffect } from "react";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectModal, type ProjectModalData } from "@/components/work/ProjectModal";
import { experimentalProjects as staticExperimental } from "@/data/experimental";
import type { ExperimentalProject } from "@/types";
import { getExperimentalProjects } from "@/lib/db-client";

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
    href: p.externalUrl || undefined,
  };
}

// Per-tile treatment: balanced staggered grid for 3 passion projects.
const layout = [
  { span: "lg:col-span-7", offset: "lg:mt-0", aspect: "aspect-video" },
  { span: "lg:col-span-5", offset: "lg:mt-12", aspect: "aspect-[4/5]" },
  { span: "lg:col-span-12", offset: "lg:mt-8", aspect: "aspect-[21/9]" },
];

export function ExperimentalGallery() {
  const [active, setActive] = useState<ProjectModalData | null>(null);
  const [projectsList, setProjectsList] = useState<ExperimentalProject[]>(staticExperimental);

  useEffect(() => {
    getExperimentalProjects().then((data) => {
      setProjectsList(data.filter((p) => p.slug !== "western-ghats"));
    });
  }, []);

  return (
    <div className="frame pb-32">
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-12">
        {projectsList.map((p, i) => {
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
