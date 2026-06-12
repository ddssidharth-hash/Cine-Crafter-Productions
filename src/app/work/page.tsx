import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGallery } from "@/components/work/WorkGallery";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/site-config";

// Full body of work lives on Behance; the grid below highlights selected pieces.
const BEHANCE_URL = siteConfig.social.find((s) => s.label === "Behance")?.href;

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
        title="Twelve years of stories, told with craft."
        intro="A selection of the work we are proud to put our name to — across film, campaigns, documentaries and series. Filter by discipline, or open any project for the full story."
      />
      {BEHANCE_URL && (
        <div className="frame -mt-8 mb-16">
          <Reveal>
            <a
              href={BEHANCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm"
            >
              View the full portfolio on Behance <span className="ml-1">&#8599;</span>
            </a>
          </Reveal>
        </div>
      )}
      <WorkGallery />
    </>
  );
}
