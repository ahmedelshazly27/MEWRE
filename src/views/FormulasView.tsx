import Link from "next/link";
import { getLesson, allModulesFor, trackOfModule, TRACKS } from "@/lib/content";
import { t, type Lang } from "@/lib/i18n";
import { tex } from "@/components/lesson/FormulaCard";
import { PageHeader } from "@/components/ui";
import { FormulaSearch, type FormulaDto } from "@/app/formulas/FormulaSearch";

/**
 * Formula sheet for one track. One page per track keeps each prerendered page well under the hosting size limit
 * (all tracks together render to ~26 MB of KaTeX). `/formulas` is Track 0 (EN and AR); `/formulas/[track]` the others.
 */
export function FormulasView({ lang, track = "mewre" }: { lang: Lang; track?: string }) {
  const list: FormulaDto[] = [];
  for (const m of allModulesFor(lang).filter((x) => trackOfModule(x.id) === track)) {
    for (const f of m.formulas) {
      const l = getLesson(f.lesson, lang);
      list.push({
        id: f.id,
        name: f.name,
        html: tex(f.tex, true),
        vars: f.vars.map((v) => ({ html: tex(v.sym), meaning: v.meaning, unit: v.unit })),
        explanation: f.explanation,
        lessonId: f.lesson,
        lessonTitle: l?.lesson.title ?? "",
        moduleId: m.id,
        moduleNumber: m.number,
        moduleTitle: m.title,
        search: `${f.name} ${f.id} ${f.explanation} ${f.vars.map((v) => v.meaning).join(" ")}`.toLowerCase(),
      });
    }
  }
  return (
    <div>
      <PageHeader
        title={t(lang, "Formula sheet")}
        subtitle={t(lang, "{n} equations, each with symbols, units and a link to the lesson that derives it. Print with your browser for a paper copy.", { n: list.length })}
      />
      {lang === "en" && (
        <nav className="no-print mb-5 flex flex-wrap gap-2 text-sm" aria-label="Tracks">
          {TRACKS.map((tr) => (
            <Link
              key={tr.id}
              href={tr.id === "mewre" ? "/formulas" : `/formulas/${tr.id}`}
              aria-current={tr.id === track ? "page" : undefined}
              className={`rounded-lg border px-3 py-1.5 ${tr.id === track ? "border-accent bg-accent-soft text-accent" : "border-border bg-surface hover:border-accent/60"}`}
            >
              {tr.title}
            </Link>
          ))}
        </nav>
      )}
      <FormulaSearch formulas={list} />
    </div>
  );
}
