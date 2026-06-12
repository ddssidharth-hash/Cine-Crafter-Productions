import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { aboutStats, process, founder, recognitions } from "@/data/about";

// ═══════════════════════════════════════════════════════════════════════
// ABOUT / INFORMATION PAGE — studio story, mission, the founder's background,
// process and recognitions. Understated and credibility-driven.
// Structured content lives in data/about.ts; narrative prose is here.
// TODO: Replace all placeholder copy with real studio/founder content.
// ═══════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, philosophy and people behind CineCrafter Productions.",
};

// Placeholder portrait. TODO: replace with a real founder/studio image.
const PORTRAIT =
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=75";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A studio built on craft, patience and trust."
        intro="CineCrafter Productions is a boutique film studio. We keep our roster small and our standards high, so that every project gets the senior attention it deserves."
      />

      {/* Mission / story */}
      <section className="frame border-t border-base-line py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow">Our Belief</p>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-9">
            <p className="font-serif text-2xl leading-snug text-ink sm:text-3xl">
              We believe the difference between content and cinema is craft —
              the time taken, the decisions resisted, the frame held a beat
              longer. We exist to bring that discipline to brands and producers
              who feel the same.
            </p>
            <p className="mt-8 max-w-prose text-lg leading-relaxed text-ink-muted">
              Founded on a decade of work across feature film, advertising and
              documentary, the studio operates as a tight senior team rather
              than a sprawling agency. The result is fewer projects, deeper
              involvement, and a finished film that matches the one that was
              promised.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="frame border-t border-base-line py-20">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {aboutStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.05}>
              <dt className="font-serif text-display-sm text-ink">{stat.value}</dt>
              <dd className="mt-2 text-sm text-ink-muted">{stat.label}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Founder */}
      <section className="frame border-t border-base-line py-24">
        <div className="grid items-start gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-base-elevated">
              <Image
                src={PORTRAIT}
                alt={founder.name}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover [filter:saturate(0.9)]"
              />
            </div>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-7">
            <p className="eyebrow mb-5">The Founder</p>
            <h2 className="font-serif text-display-sm text-ink">{founder.name}</h2>
            <p className="mt-2 text-sm text-accent">{founder.role}</p>
            <div className="mt-6 space-y-5">
              {founder.bio.map((para, i) => (
                <p key={i} className="max-w-prose text-lg leading-relaxed text-ink-muted">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="frame border-t border-base-line py-24">
        <Reveal>
          <p className="eyebrow mb-12">How We Work</p>
        </Reveal>
        <div className="grid gap-px overflow-hidden border border-base-line bg-base-line sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05}>
              <div className="h-full bg-base p-8">
                <span className="font-serif text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-2xl text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {step.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Recognitions */}
      <section className="frame border-t border-base-line py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow">Recognition</p>
          </Reveal>
          <ul className="md:col-span-9">
            {recognitions.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 0.04} y={12}>
                <span className="block border-b border-base-line py-5 text-lg text-ink-muted">
                  {item}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="frame border-t border-base-line py-24 text-center">
        <Reveal>
          <Link href="/contact" className="link-underline text-xl">
            Work with us <span className="ml-2">&rarr;</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
