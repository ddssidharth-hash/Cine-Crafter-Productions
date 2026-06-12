import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGallery } from "@/components/work/WorkGallery";

// ═══════════════════════════════════════════════════════════════════════
// WORK / PORTFOLIO PAGE — filterable grid of past projects with a detail
// modal. All content comes from data/projects.ts.
// ═══════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected film production, ad films, documentaries, web series and line production from CineCrafter Productions.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="A decade of stories, told with craft."
        intro="A selection of the work we are proud to put our name to — across feature films, campaigns, documentaries and series. Filter by discipline, or open any project for the full story."
      />
      <WorkGallery />
    </>
  );
}
