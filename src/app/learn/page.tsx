import Link from "next/link";
import { modules, STUDY_ORDER } from "@/lib/content";
import { COMPETENCIES } from "@/content/schema";
import { BestScore, ModuleProgress } from "@/components/progress";
import { PageHeader, Pill } from "@/components/ui";

export const metadata = { title: "Curriculum" };

export default function LearnPage() {
  const ordered = [...modules].sort((a, b) => a.number - b.number);
  return (
    <div>
      <PageHeader
        title="Curriculum"
        subtitle="Sixteen modules, each with theory, applied worked examples using Kuwait numbers, and field practice. Recommended order follows job relevance (shown as Step N)."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {ordered.map((m) => {
          const total = m.lessons.length;
          const step = STUDY_ORDER.indexOf(m.id) + 1;
          const live = !m.draft && total > 0;
          const inner = (
            <div className={`h-full rounded-xl border border-border bg-surface p-4 transition-colors ${live ? "hover:border-accent/60" : "opacity-60"}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-medium text-muted">
                    Module {m.number} · Step {step}
                  </div>
                  <div className="mt-0.5 font-semibold">{m.title}</div>
                  <div className="text-sm text-muted" dir="rtl">
                    {m.titleAr}
                  </div>
                </div>
                {live ? <Pill>{total} lessons</Pill> : <Pill>In preparation</Pill>}
              </div>
              {live && (
                <>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{m.summary}</p>
                  <ModuleProgress lessonIds={m.lessons.map((l) => l.id)} conceptIds={m.lessons.flatMap((l) => l.concepts.map((c) => c.id))} />
                  <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                    {m.competencies.map((c) => (
                      <Pill key={c}>{COMPETENCIES[c]}</Pill>
                    ))}
                    <Pill>~{m.estimatedHours} h</Pill>
                    <BestScore kind="exam" refId={m.id} label="Exam best" />
                  </div>
                </>
              )}
            </div>
          );
          return live ? (
            <Link key={m.id} href={`/learn/${m.id}`}>
              {inner}
            </Link>
          ) : (
            <div key={m.id}>{inner}</div>
          );
        })}
      </div>
    </div>
  );
}
