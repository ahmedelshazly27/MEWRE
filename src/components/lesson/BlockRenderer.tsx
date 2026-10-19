import type { Block, CalloutTone, Lesson } from "@/content/schema";
import { Markdown } from "@/components/Markdown";
import { index } from "@/lib/content";
import { Widget } from "@/components/widgets";
import { Diagram } from "@/components/diagrams";
import { WorkedExample } from "./WorkedExample";
import { ScenarioPlayer } from "./ScenarioPlayer";
import { Feynman } from "./Feynman";
import { Checklist } from "./Checklist";
import { InlineQuestion } from "./InlineQuestion";
import { FormulaCard } from "./FormulaCard";

const CALLOUT: Record<CalloutTone, { label: string; cls: string; icon: string }> = {
  why: { label: "Why it works", cls: "border-info/40 bg-info-soft/40", icon: "💡" },
  pm: { label: "PM must check", cls: "border-accent/40 bg-accent-soft/40", icon: "🧭" },
  pitfall: { label: "What goes wrong", cls: "border-danger/40 bg-danger-soft/40", icon: "⚠️" },
  kuwait: { label: "Kuwait context", cls: "border-sun/40 bg-sun-soft/40", icon: "🇰🇼" },
  unverified: { label: "Unverified — check before relying on it", cls: "border-warn/60 bg-warn-soft/50 border-dashed", icon: "❔" },
  tip: { label: "Tip", cls: "border-border bg-surface-2", icon: "✳️" },
  ai: { label: "Use AI here", cls: "border-[var(--chart-5)]/40 bg-[var(--chart-5)]/10", icon: "🤖" },
};

export function BlockRenderer({ block, lesson, blockKey }: { block: Block; lesson: Lesson; blockKey: string }) {
  switch (block.kind) {
    case "md":
      return <Markdown>{block.md}</Markdown>;
    case "callout": {
      const c = CALLOUT[block.tone];
      return (
        <div className={`my-5 rounded-xl border px-4 py-3 ${c.cls}`}>
          <div className="text-sm font-semibold">
            <span className="mr-1.5">{c.icon}</span>
            {block.title ?? c.label}
          </div>
          <Markdown className="prose-lesson prose-compact">{block.md}</Markdown>
        </div>
      );
    }
    case "equation": {
      const f = index().formulas.get(block.formula);
      if (!f) return <div className="text-danger">Missing formula {block.formula}</div>;
      return <FormulaCard formula={f} />;
    }
    case "worked":
      return <WorkedExample title={block.title} mode={block.mode} given={block.given} steps={block.steps} result={block.result} />;
    case "question":
      return <InlineQuestion question={block.question} />;
    case "widget":
      return (
        <figure className="my-6">
          <Widget id={block.widget} props={block.props} />
          {block.caption && <figcaption className="mt-2 text-sm text-muted">{block.caption}</figcaption>}
        </figure>
      );
    case "diagram":
      return (
        <figure className="my-6 rounded-xl border border-border bg-surface p-3">
          <Diagram id={block.diagram} mode="labeled" />
          {block.caption && <figcaption className="mt-2 text-sm text-muted">{block.caption}</figcaption>}
        </figure>
      );
    case "checklist":
      return <Checklist id={`${lesson.id}-${blockKey}`} title={block.title} items={block.items} tone="pm" />;
    case "ask":
      return <Checklist id={`${lesson.id}-${blockKey}`} title={block.title ?? "Questions to ask the contractor"} items={block.items} tone="ask" />;
    case "scenario": {
      const s = lesson.scenarios?.find((x) => x.id === block.scenario);
      return s ? <ScenarioPlayer scenario={s} compact /> : null;
    }
    case "feynman":
      return <Feynman prompt={block.prompt} keyPoints={block.keyPoints} lessonId={lesson.id} concepts={lesson.concepts.map((c) => c.id)} />;
    case "download":
      return (
        <a href={block.file} download className="my-4 flex items-center gap-3 rounded-xl border border-border bg-surface p-4 no-underline hover:bg-surface-2">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-ok-soft text-lg">📊</span>
          <span className="min-w-0">
            <span className="block font-medium">{block.title}</span>
            <span className="block text-sm text-muted">{block.description}</span>
          </span>
          <span className="ml-auto text-sm text-accent">Download</span>
        </a>
      );
    case "sources": {
      const refs = block.refs.map((id) => index().references.get(id)).filter(Boolean);
      return (
        <div className="my-4 rounded-lg border border-border px-3 py-2 text-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">Sources</div>
          <ul className="mt-1 space-y-1">
            {refs.map((r) => (
              <li key={r!.id}>
                <a href={r!.url} target="_blank" rel="noreferrer" className="text-accent underline-offset-2 hover:underline">
                  {r!.title}
                </a>{" "}
                <span className="text-muted">
                  — {r!.publisher}, {r!.date}
                </span>
                {r!.unverified && <span className="ml-1 rounded bg-warn-soft px-1 text-xs text-warn">unverified</span>}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    case "bilingual":
      return (
        <div className="my-5 overflow-hidden rounded-xl border border-border">
          {block.title && <div className="border-b border-border bg-surface-2 px-4 py-2 text-sm font-semibold">{block.title}</div>}
          <div className="grid md:grid-cols-2">
            <div className="border-border p-4 md:border-r">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">English</div>
              <Markdown className="prose-lesson prose-compact">{block.en}</Markdown>
            </div>
            <div className="border-t border-border p-4 md:border-t-0" dir="rtl" lang="ar">
              <div className="mb-1 text-xs font-semibold text-muted">العربية</div>
              <Markdown className="prose-lesson prose-compact">{block.ar}</Markdown>
            </div>
          </div>
        </div>
      );
  }
}
