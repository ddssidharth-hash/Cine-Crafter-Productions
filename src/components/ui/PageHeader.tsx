import { Reveal } from "@/components/ui/Reveal";

// ═══════════════════════════════════════════════════════════════════════
// PAGE HEADER — consistent editorial header for inner pages.
// Eyebrow label, large serif title, optional intro paragraph.
// ═══════════════════════════════════════════════════════════════════════

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
}

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="frame pb-16 pt-36 sm:pt-44">
      <Reveal>
        <p className="eyebrow mb-6">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="max-w-4xl font-serif text-display-sm text-ink">{title}</h1>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-prose text-lg leading-relaxed text-ink-muted">
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  );
}
