import Link from "next/link";
import { liveModules, questionPool } from "@/lib/content";
import { completedLessons, listErrors, listRuns, masteryMap } from "@/server/repo";
import { pickMixed, shuffle } from "@/lib/practice";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { Card, EmptyState, PageHeader, Pill } from "@/components/ui";

export const metadata = { title: "Practice & exams" };

type SP = { searchParams: Promise<{ mode?: string; module?: string; n?: string; scope?: string }> };

const MODES = {
  mixed: { title: "Mixed practice", desc: "Interleaved questions across modules, weighted toward weak concepts and past mistakes. Instant feedback.", n: 15 },
  timed: { title: "Timed mixed exam", desc: "25 questions, 2 minutes each, feedback only at the end — simulates pressure.", n: 25 },
  errors: { title: "Error-log drill", desc: "Only questions you got wrong. Each clears after two correct answers in a row.", n: 20 },
};

export default async function PracticePage({ searchParams }: SP) {
  const sp = await searchParams;
  const mode = sp.mode as keyof typeof MODES | undefined;
  const done = completedLessons();
  const mods = liveModules();

  if (!mode || !MODES[mode]) {
    const runs = listRuns(undefined, undefined, 12).filter((r) => ["mixed", "timed", "errors", "exam", "diagnostic"].includes(r.kind));
    return (
      <div>
        <PageHeader title="Practice & exams" subtitle="Retrieval practice beats re-reading. Choose a session." />
        <div className="grid gap-3 md:grid-cols-3">
          {(Object.keys(MODES) as (keyof typeof MODES)[]).map((k) => (
            <Link key={k} href={`/practice?mode=${k}`} className="rounded-xl border border-border bg-surface p-4 hover:border-accent/60">
              <div className="font-semibold">{MODES[k].title}</div>
              <p className="mt-1 text-sm text-muted">{MODES[k].desc}</p>
            </Link>
          ))}
        </div>
        <Card className="mt-6">
          <div className="mb-1 font-semibold">Scope</div>
          <p className="mb-3 text-sm text-muted">By default mixed practice draws from lessons you have completed (or all lessons if none yet). Pick a module to focus:</p>
          <div className="flex flex-wrap gap-2">
            {mods.map((m) => (
              <Link key={m.id} href={`/practice?mode=mixed&module=${m.id}`} className="rounded-lg border border-border px-2.5 py-1 text-sm hover:bg-surface-2">
                M{m.number} {m.title}
              </Link>
            ))}
            <Link href="/practice?mode=mixed&scope=all" className="rounded-lg border border-border px-2.5 py-1 text-sm hover:bg-surface-2">
              Everything
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">
            Module exams live on each module page. A start-of-course baseline is on the{" "}
            <Link href="/diagnostic" className="text-accent">
              diagnostic
            </Link>{" "}
            page.
          </p>
        </Card>
        {runs.length > 0 && (
          <Card className="mt-6">
            <div className="mb-2 font-semibold">Recent sessions</div>
            <ul className="divide-y divide-border text-sm">
              {runs.map((r) => (
                <li key={r.id} className="flex items-center justify-between py-1.5">
                  <span>
                    <Pill>{r.kind}</Pill> <span className="ml-1 text-muted">{r.ref ?? ""}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="tabular-nums">{Math.round((r.score ?? 0) * 100)}%</span>
                    <span className="text-xs text-muted">{new Date(r.finished_at!).toLocaleDateString()}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    );
  }

  const cfg = MODES[mode];
  const seed = Date.now() % 2147483647;
  const mastery = masteryMap();
  const errors = listErrors();
  const errorIds = new Set(errors.map((e) => e.question_id));
  let pool = questionPool((r) => {
    if (sp.module) return r.module.id === sp.module;
    if (sp.scope === "all" || done.size === 0) return true;
    return r.origin === "exam" ? r.module.lessons.some((l) => done.has(l.id)) : !!r.lesson && done.has(r.lesson.id);
  });
  if (mode === "errors") pool = questionPool((r) => errorIds.has(r.question.id));
  if (mode === "timed") pool = pool.filter((r) => r.question.type !== "short");

  const items =
    mode === "errors"
      ? shuffle(pool, seed).slice(0, cfg.n).map((r) => ({ question: r.question, moduleId: r.module.id }))
      : pickMixed({ pool: pool.map((r) => ({ question: r.question, moduleId: r.module.id })), mastery, errorIds, n: cfg.n, seed });
  const questions = items.map((i) => i.question);
  const scopeLabel = sp.module ? mods.find((m) => m.id === sp.module)?.title : sp.scope === "all" || done.size === 0 ? "all lessons" : "completed lessons";

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 text-sm text-muted">
        <Link href="/practice" className="hover:text-text">
          ← Practice
        </Link>
      </nav>
      <PageHeader title={cfg.title} subtitle={`${cfg.desc} Scope: ${scopeLabel}.`} />
      {questions.length === 0 ? (
        <EmptyState title={mode === "errors" ? "Your error log is empty" : "No questions available yet"}>
          {mode === "errors" ? "Nice. Mistakes from quizzes and exams will appear here." : "Content for this scope is still being written."}
        </EmptyState>
      ) : (
        <QuizRunner
          key={seed}
          questions={questions}
          source={mode === "errors" ? "errors" : mode}
          kind={mode}
          refId={sp.module ?? sp.scope ?? "completed"}
          title={cfg.title}
          examMode={mode === "timed"}
          timeLimitSec={mode === "timed" ? questions.length * 120 : undefined}
        />
      )}
    </div>
  );
}
