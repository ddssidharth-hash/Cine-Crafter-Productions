import { Reveal } from "@/components/ui/Reveal";

// ═══════════════════════════════════════════════════════════════════════
// HOME — studio statement. 2–3 confident sentences. Easy to edit.
// TODO: Replace with the studio's real positioning statement.
// ═══════════════════════════════════════════════════════════════════════

export function Intro() {
  return (
    <section className="frame border-b border-base-line py-28 sm:py-40">
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <p className="eyebrow">The Studio</p>
        </Reveal>
        <Reveal delay={0.05} className="md:col-span-9">
          <p className="font-serif text-3xl leading-snug text-ink sm:text-4xl">
            We are a boutique production house built around a single principle:
            that craft is the difference between content and cinema. For over a
            decade we have shaped films, campaigns and series for partners who
            measure their work in years, not impressions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
