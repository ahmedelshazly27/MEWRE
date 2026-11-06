import type { Cell } from "@/content/schema";
import { InlineMarkdown } from "@/components/Markdown";

/** Numbered process steps with arrows; wraps on wide screens, stacks on phones. */
export function Flow({ steps }: { steps: { label: string; detail?: string }[] }) {
  return (
    <ol className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-stretch">
      {steps.map((s, i) => (
        <li key={i} className="flex items-stretch gap-2 md:max-w-[15rem] md:flex-1 md:basis-40">
          <div className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-3 py-2">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-[11px] font-bold text-white dark:text-black">{i + 1}</span>
              <span className="min-w-0 text-sm font-semibold">
                <InlineMarkdown>{s.label}</InlineMarkdown>
              </span>
            </div>
            {s.detail && (
              <div className="mt-1 text-xs text-muted">
                <InlineMarkdown>{s.detail}</InlineMarkdown>
              </div>
            )}
          </div>
          {i < steps.length - 1 && <span className="hidden self-center text-accent md:block" aria-hidden>→</span>}
        </li>
      ))}
    </ol>
  );
}

/** 2×2 matrix with labelled axes. */
export function Matrix({ xAxis, yAxis, cells }: { xAxis: [string, string]; yAxis: [string, string]; cells: [Cell, Cell, Cell, Cell] }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
      <div className="flex flex-col justify-between py-2 text-[11px] font-medium uppercase tracking-wide text-muted [writing-mode:vertical-rl] rotate-180">
        <span>{yAxis[0]}</span>
        <span>{yAxis[1]} ↑</span>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-2">
          {cells.map((c, i) => (
            <div key={i} className={`rounded-lg border p-3 ${i === 1 ? "border-accent/50 bg-accent-soft/40" : "border-border bg-surface"}`}>
              <div className="text-sm font-semibold">
                <InlineMarkdown>{c.label}</InlineMarkdown>
              </div>
              {c.detail && (
                <div className="mt-1 text-xs text-muted">
                  <InlineMarkdown>{c.detail}</InlineMarkdown>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[11px] font-medium uppercase tracking-wide text-muted">
          <span>{xAxis[0]}</span>
          <span>{xAxis[1]} →</span>
        </div>
      </div>
    </div>
  );
}
