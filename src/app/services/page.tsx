import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";
import { getProjectBySlug } from "@/data/projects";

// ═══════════════════════════════════════════════════════════════════════
// SERVICES PAGE ("What We Do") — clean editorial sections, one per service,
// with large numbering, a representative visual, description, capabilities
// and an optional linked example project. Content from data/services.ts.
// ═══════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Services",
  description:
    "Film production, line production, filmmaking, web series, ad films, documentaries and digital marketing video — the full CineCrafter offering.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Full-craft production, from first idea to final master."
        intro="Seven disciplines, delivered by one accountable team. Whatever the format, the standard is the same."
      />

      <div className="frame pb-32">
        {services.map((service, i) => {
          const example = service.exampleProjectSlug
            ? getProjectBySlug(service.exampleProjectSlug)
            : undefined;
          const reversed = i % 2 === 1;

          return (
            // `scroll-mt` offsets the fixed header for #anchor links.
            <section
              key={service.id}
              id={service.id}
              className="scroll-mt-28 border-t border-base-line py-20 first:border-t-0 sm:py-28"
            >
              <div className="grid items-center gap-12 md:grid-cols-12">
                {/* Visual */}
                <Reveal
                  className={`md:col-span-6 ${reversed ? "md:order-2" : ""}`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-base-elevated">
                    {service.image && (
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover [filter:saturate(0.9)]"
                      />
                    )}
                  </div>
                </Reveal>

                {/* Copy */}
                <Reveal
                  delay={0.05}
                  className={`md:col-span-6 ${reversed ? "md:order-1" : ""}`}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-serif text-lg text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-serif text-display-sm text-ink">
                      {service.title}
                    </h2>
                  </div>

                  <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-muted">
                    {service.description}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                    {service.capabilities.map((c) => (
                      <li key={c} className="text-sm text-ink-faint">
                        {c}
                      </li>
                    ))}
                  </ul>

                  {example && (
                    <Link
                      href="/work"
                      className="link-underline mt-8 inline-flex text-sm"
                    >
                      See it in practice: {example.title}
                      <span className="ml-2">&rarr;</span>
                    </Link>
                  )}
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
