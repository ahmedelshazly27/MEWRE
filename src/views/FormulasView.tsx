import { getLesson, modulesFor } from "@/lib/content";
import { t, type Lang } from "@/lib/i18n";
import { tex } from "@/components/lesson/FormulaCard";
import { PageHeader } from "@/components/ui";
import { FormulaSearch, type FormulaDto } from "@/app/formulas/FormulaSearch";

export function FormulasView({ lang }: { lang: Lang }) {
  const list: FormulaDto[] = [];
  for (const m of [...modulesFor(lang)].sort((a, b) => a.number - b.number)) {
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
      <FormulaSearch formulas={list} />
    </div>
  );
}
