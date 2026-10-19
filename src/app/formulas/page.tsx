import { getLesson, modules } from "@/lib/content";
import { tex } from "@/components/lesson/FormulaCard";
import { PageHeader } from "@/components/ui";
import { FormulaSearch, type FormulaDto } from "./FormulaSearch";

export const metadata = { title: "Formula sheet" };

export default function FormulasPage() {
  const list: FormulaDto[] = [];
  for (const m of [...modules].sort((a, b) => a.number - b.number)) {
    for (const f of m.formulas) {
      const l = getLesson(f.lesson);
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
      <PageHeader title="Formula sheet" subtitle={`${list.length} equations, each with symbols, units and a link to the lesson that derives it. Print with your browser for a paper copy.`} />
      <FormulaSearch formulas={list} />
    </div>
  );
}
