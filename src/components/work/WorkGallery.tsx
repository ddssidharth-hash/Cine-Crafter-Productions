"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectModal, type ProjectModalData } from "@/components/work/ProjectModal";
import { projects as staticProjects, projectCategories } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";
import { easeCine } from "@/lib/motion";
import { getProjects } from "@/lib/db-client";

// ═══════════════════════════════════════════════════════════════════════
// WORK GALLERY — filterable grid for the Past Work / Portfolio page.
// Reads from data/projects.ts; clicking a card opens the shared detail modal.
// ═══════════════════════════════════════════════════════════════════════

type Filter = ProjectCategory | "All";

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
    href: p.externalUrl || undefined,
  };
}

export function WorkGallery() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<ProjectModalData | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>(staticProjects);

  useEffect(() => {
    getProjects().then((data) => {
      setProjectsList(data);
    });
  }, []);

  const filters: Filter[] = ["All", ...projectCategories];

  const visible = useMemo(
    () => (filter === "All" ? projectsList : projectsList.filter((p) => p.category === filter)),
    [filter, projectsList],
  );

  return (
    <div className="frame pb-32">
      {/* Filter bar */}
      <div className="mb-12 flex flex-wrap gap-x-6 gap-y-3 border-b border-base-line pb-6">
        {filters.map((f) => {
          const isActive = f === filter;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`relative text-sm tracking-wide transition-colors duration-300 ${
                isActive ? "text-ink" : "text-ink-faint hover:text-ink-muted"
              }`}
            >
              {f}
              {isActive && (
                <motion.span
                  layoutId="work-filter"
                  className="absolute -bottom-[25px] left-0 h-px w-full bg-accent"
                  transition={{ duration: 0.4, ease: easeCine }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: easeCine }}
            >
              <ProjectCard
                title={p.title}
                meta={p.category}
                excerpt={p.excerpt}
                cover={p.cover}
                previewUrl={p.previewUrl || undefined}
                onSelect={() => setActive(toModalData(p))}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal data={active} onClose={() => setActive(null)} />
    </div>
  );
}
