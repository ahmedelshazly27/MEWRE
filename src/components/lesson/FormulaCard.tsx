import katex from "katex";
import type { Formula } from "@/content/schema";
import { Markdown } from "@/components/Markdown";
import { t, type Lang } from "@/lib/i18n";

export function tex(src: string, display = false): string {
  return katex.renderToString(src, { displayMode: display, throwOnError: false, strict: "ignore" });
}

export function FormulaCard({ formula: f, compact = false, lang = "en" }: { formula: Formula; compact?: boolean; lang?: Lang }) {
  return (
    <div id={`f-${f.id}`} className="my-5 rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-sm font-semibold">{f.name}</span>
        <span className="text-xs text-muted">{t(lang, "Formula")}</span>
      </div>
      <div dir="ltr" className="overflow-x-auto px-4 py-3 text-lg" dangerouslySetInnerHTML={{ __html: tex(f.tex, true) }} />
      {f.vars.length > 0 && (
        <div className="grid gap-x-6 gap-y-1 border-t border-border px-4 py-2.5 text-sm sm:grid-cols-2">
          {f.vars.map((v) => (
            <div key={v.sym} className="flex items-baseline gap-2">
              <span className="shrink-0" dangerouslySetInnerHTML={{ __html: tex(v.sym) }} />
              <span className="text-muted">
                {v.meaning}
                {v.unit && <span className="ms-1 text-xs" dir="ltr">[{v.unit}]</span>}
              </span>
            </div>
          ))}
        </div>
      )}
      {!compact && f.explanation && (
        <div className="border-t border-border px-4 py-2">
          <Markdown className="prose-lesson prose-compact text-[0.95rem]">{f.explanation}</Markdown>
        </div>
      )}
    </div>
  );
}
