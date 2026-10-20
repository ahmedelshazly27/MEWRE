"use client";

import { useT } from "@/lib/useLang";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Question } from "@/content/schema";
import { QuestionCard, type AttemptFeedback } from "./QuestionCard";
import { InlineMarkdown, Markdown } from "@/components/Markdown";
import { uid } from "@/lib/api";
import { completeLesson, saveRun } from "@/lib/store/actions";
import { btn, ProgressBar } from "@/components/ui";
import { fwd } from "@/lib/i18n";

export interface QuizResult {
  questionId: string;
  score: number;
  correct: boolean;
  feedback: AttemptFeedback;
}

export function QuizRunner({
  questions,
  source,
  kind,
  refId,
  title,
  completeLessonId,
  timeLimitSec,
  examMode = false,
  onFinish,
}: {
  questions: Question[];
  /** Attempt source recorded with each answer (quiz, exam, mixed, timed, diagnostic, errors). */
  source: string;
  /** Run kind for history (quiz, exam, mixed, timed, diagnostic, errors). */
  kind: string;
  refId?: string;
  title?: string;
  completeLessonId?: string;
  timeLimitSec?: number;
  /** Hide per-question feedback until the end. */
  examMode?: boolean;
  onFinish?: (results: QuizResult[]) => void;
}) {
  const { t, lang } = useT();
  const runId = useMemo(() => uid(kind), [kind]);
  const startedAt = useRef(0);
  const [i, setI] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);
  const [remaining, setRemaining] = useState(timeLimitSec ?? 0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const finish = async (final: QuizResult[]) => {
    if (done) return;
    setDone(true);
    const score = questions.length ? final.reduce((a, r) => a + r.score, 0) / questions.length : 0;
    try {
      await saveRun({
        id: runId,
        kind,
        ref: refId,
        score,
        total: questions.length,
        startedAt: startedAt.current,
        detail: final.map((r) => ({ q: r.questionId, s: r.score })),
      });
      if (completeLessonId) await completeLesson(completeLessonId);
    } catch {
      // non-fatal: attempts are already stored individually
    }
    onFinish?.(final);
  };

  useEffect(() => {
    if (!timeLimitSec || done) return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          finish(results);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLimitSec, done, results]);

  if (!questions.length) return <div className="text-sm text-muted">{t("No questions available yet.")}</div>;

  if (done) {
    const score = results.reduce((a, r) => a + r.score, 0) / questions.length;
    const pct = Math.round(score * 100);
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="text-sm text-muted">{title ?? t("Result")}</div>
          <div className="mt-1 flex items-baseline gap-3">
            <span className={`text-4xl font-semibold tabular-nums ${pct >= 80 ? "text-ok" : pct >= 60 ? "text-warn" : "text-danger"}`}>{pct}%</span>
            <span className="text-muted">
              {t("{c} of {n} correct", { c: results.filter((r) => r.correct).length, n: questions.length })}
              {results.length < questions.length && t(" · {n} unanswered", { n: questions.length - results.length })}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">
            {pct >= 80
              ? t("Strong. These concepts will now resurface on a spaced schedule.")
              : t("Every miss has been added to your error log and will resurface in mixed practice until you get it right twice.")}
          </p>
          {completeLessonId && <p className="mt-1 text-sm text-muted">{t("Lesson marked complete — its flashcards are now in your daily review.")}</p>}
        </div>
        {examMode && (
          <div className="space-y-3">
            <h3 className="font-semibold">{t("Review your answers")}</h3>
            {results.map((r) => {
              const q = questions.find((x) => x.id === r.questionId)!;
              return (
                <details key={r.questionId} className="rounded-xl border border-border bg-surface p-4">
                  <summary className="flex cursor-pointer items-start gap-2">
                    <span className={r.correct ? "text-ok" : "text-danger"}>{r.correct ? "✓" : "✗"}</span>
                    <span className="min-w-0 flex-1 text-sm">
                      <InlineMarkdown>{q.prompt.split("\n")[0].slice(0, 220)}</InlineMarkdown>
                    </span>
                  </summary>
                  <div className="mt-2 text-sm">
                    {!r.correct && (
                      <div>
                        <span className="font-medium">{t("Answer: ")}</span>
                        <InlineMarkdown>{r.feedback.correctAnswer}</InlineMarkdown>
                      </div>
                    )}
                    <Markdown className="prose-compact">{r.feedback.explanation}</Markdown>
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const q = questions[i];
  const onAnswered = (fb: AttemptFeedback) => {
    const next = [...results, { questionId: q.id, score: fb.score, correct: fb.correct, feedback: fb }];
    setResults(next);
    setAnswered(true);
    if (examMode) {
      // auto-advance in exam mode
      setTimeout(() => {
        if (i + 1 < questions.length) {
          setI(i + 1);
          setAnswered(false);
        } else finish(next);
      }, 350);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <ProgressBar value={(i + (answered ? 1 : 0)) / questions.length} />
        {timeLimitSec ? (
          <span className={`shrink-0 font-mono text-sm tabular-nums ${remaining < 60 ? "text-danger" : "text-muted"}`}>
            {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <QuestionCard key={q.id} question={q} source={source} runId={runId} hideFeedback={examMode} onAnswered={onAnswered} index={i} total={questions.length} />
      {answered && !examMode && (
        <div className="flex justify-end">
          {i + 1 < questions.length ? (
            <button
              className={btn.primary}
              onClick={() => {
                setI(i + 1);
                setAnswered(false);
              }}
            >
              {t("Next question")} {fwd(lang)}
            </button>
          ) : (
            <button className={btn.primary} onClick={() => finish(results)}>
              {t("Finish")}
            </button>
          )}
        </div>
      )}
      {examMode && (
        <div className="flex justify-end">
          <button className={btn.ghost} onClick={() => finish(results)}>
            {t("End now")}
          </button>
        </div>
      )}
    </div>
  );
}
