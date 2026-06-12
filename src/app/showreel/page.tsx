"use client";

import { useState, useEffect } from "react";
import { ShowreelSlider, type ShowreelSlide } from "@/components/showreel/ShowreelSlider";
import { projects as staticProjects } from "@/data/projects";
import { experimentalProjects as staticExperimental } from "@/data/experimental";
import { getProjects, getExperimentalProjects } from "@/lib/db-client";

// ═══════════════════════════════════════════════════════════════════════
// SHOWREEL PAGE — a dedicated, immersive, full-screen slide showcase of ALL
// output (portfolio + experimental) in one continuous cinematic sequence.
//
// Slides are assembled here from the data layer so adding a project anywhere
// automatically extends the reel.
// ═══════════════════════════════════════════════════════════════════════

export default function ShowreelPage() {
  const [slides, setSlides] = useState<ShowreelSlide[]>([]);

  useEffect(() => {
    // Generate initial slides from static fallbacks
    const buildSlides = (pList: typeof staticProjects, eList: typeof staticExperimental) => {
      return [
        ...pList.map((p) => ({
          title: p.title,
          category: p.category,
          client: p.client,
          cover: p.cover,
          videoUrl: p.previewUrl || p.videoUrl || undefined,
          href: "/work",
        })),
        ...eList.map((p) => ({
          title: p.title,
          category: p.tag,
          cover: p.cover,
          videoUrl: p.previewUrl || p.videoUrl || undefined,
          href: "/experimental",
        })),
      ];
    };

    setSlides(buildSlides(staticProjects, staticExperimental));

    // Fetch dynamic content
    Promise.all([getProjects(), getExperimentalProjects()]).then(([pList, eList]) => {
      setSlides(buildSlides(pList, eList));
    });
  }, []);

  if (slides.length === 0) {
    return <div className="min-h-screen bg-base flex items-center justify-center text-ink-muted">Loading showreel...</div>;
  }

  return <ShowreelSlider slides={slides} />;
}
