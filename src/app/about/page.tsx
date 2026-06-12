"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import {
  aboutStats as staticAboutStats,
  process as staticProcess,
  founder as staticFounder,
  experience as staticExperience,
  tools as staticTools,
  languages as staticLanguages,
} from "@/data/about";
import { getAboutContent } from "@/lib/db-client";

// TODO: replace with a real founder/studio portrait (add to /public).
const PORTRAIT =
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=75";

export default function AboutPage() {
  const [stats, setStats] = useState(staticAboutStats);
  const [processList, setProcessList] = useState(staticProcess);
  const [founderInfo, setFounderInfo] = useState(staticFounder);
  const [experienceList, setExperienceList] = useState(staticExperience);
  const [toolsList, setToolsList] = useState(staticTools);
  const [languagesList, setLanguagesList] = useState(staticLanguages);

  useEffect(() => {
    getAboutContent().then((data) => {
      setStats(data.aboutStats);
      setProcessList(data.process);
      setFounderInfo(data.founder);
      setExperienceList(data.experience);
      setToolsList(data.tools);
      setLanguagesList(data.languages);
    });
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A studio built on craft, patience and trust."
        intro="CineCrafter Productions is a boutique film studio led by filmmaker and Creative Director Sidharth Menon. We keep our roster small and our standards high, so every project gets the senior attention it deserves."
      />

      {/* Belief / story */}
      <section className="frame border-t border-base-line py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow">Our Belief</p>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-9">
            <p className="font-serif text-2xl leading-snug text-ink sm:text-3xl">
              We are storytellers at heart. The difference between content and
              cinema is craft — the research done, the time taken, the frame
              held a beat longer — and we bring that discipline to every story we
              are trusted to tell.
            </p>
            <p className="mt-8 max-w-prose text-lg leading-relaxed text-ink-muted">
              Built on more than a decade of work across web series, reality
              television, advertising and film — and grounded in a deep love of
              documentary — the studio operates as a tight senior team rather
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
          {stats.map((stat, i) => (
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
                alt={founderInfo.name}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover [filter:saturate(0.9)]"
              />
            </div>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-7">
            <p className="eyebrow mb-5">The Founder</p>
            <h2 className="font-serif text-display-sm text-ink">{founderInfo.name}</h2>
            <p className="mt-2 text-sm text-accent">{founderInfo.role}</p>
            <div className="mt-6 space-y-5">
              {founderInfo.bio.map((para, i) => (
                <p key={i} className="max-w-prose text-lg leading-relaxed text-ink-muted">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="frame border-t border-base-line py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow">Selected Experience</p>
          </Reveal>
          <ul className="md:col-span-9">
            {experienceList.map((item, i) => (
              <Reveal as="li" key={item.period + item.org} delay={i * 0.04} y={12}>
                <div className="grid gap-2 border-b border-base-line py-6 sm:grid-cols-12 sm:gap-6">
                  <span className="text-sm text-ink-faint sm:col-span-3">
                    {item.period}
                  </span>
                  <div className="sm:col-span-9">
                    <p className="font-serif text-xl text-ink">{item.org}</p>
                    <p className="mt-1 text-sm text-accent">{item.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="frame border-t border-base-line py-24">
        <Reveal>
          <p className="eyebrow mb-12">How We Work</p>
        </Reveal>
        <div className="grid gap-px overflow-hidden border border-base-line bg-base-line sm:grid-cols-2 lg:grid-cols-4">
          {processList.map((step, i) => (
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

      {/* Craft — tools & languages */}
      <section className="frame border-t border-base-line py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-6">Toolkit</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {toolsList.map((t) => (
                <li key={t} className="text-ink-muted">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="eyebrow mb-6">Languages</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {languagesList.map((l) => (
                <li key={l} className="text-ink-muted">
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
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
