"use client";

import { useT } from "@/lib/useLang";
import { useMemo, useState } from "react";
import type { Question } from "@/content/schema";
import { InlineMarkdown, Markdown } from "@/components/Markdown";
import { Diagram, markerNumber } from "@/components/diagrams";
import { authFetch } from "@/lib/authFetch";
import { recordAttempt } from "@/lib/store/actions";
import type { Response } from "@/lib/scoring";
import { btn, Pill } from "@/components/ui";

export interface AttemptFeedback {
  score: number;
  correct: boolean;
  correctAnswer: string;
  explanation: string;
  aiFeedback?: string;
}

const TYPE_LABEL: Record<Question["type"], string> = {
  mcq: "Multiple choice",
  multi: "Select all that apply",
  numeric: "Calculation",
  order: "Put in order",
  decision: "PM decision",
  label: "Label the diagram",
  short: "Written answer",
};

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Deterministic shuffle (SSR-safe) that never returns the original order for n > 1. */
export function seededShuffle<T>(items: T[], seed: string): T[] {
  const a = [...items];
  let x = hash(seed) || 1;
  for (let i = a.length - 1; i > 0; i--) {
    x = (Math.imul(x, 1103515245) + 12345) >>> 0;
    const j = x % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (a.length > 1 && a.every((v, i) => v === items[i])) a.push(a.shift()!);
  return a;
}

export function QuestionCard({
  question: q,
  source,
  runId,
  hideFeedback = false,
  onAnswered,
  index,
  total,
}: {
  question: Question;
  source: string;
  runId?: string;
  /** Exam mode: record the answer but don't reveal correctness. */
  hideFeedback?: boolean;
  onAnswered?: (fb: AttemptFeedback, response: Response) => void;
  index?: number;
  total?: number;
}) {
  const { t, lang } = useT();
  const [mcq, setMcq] = useState<number | null>(null);
  const [multi, setMulti] = useState<number[]>([]);
  const [num, setNum] = useState("");
  const shuffled = useMemo(() => (q.type === "order" ? seededShuffle(q.items, q.id) : []), [q]);
  const [order, setOrder] = useState<string[]>(shuffled);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [text, setText] = useState("");
  const [selfCheck, setSelfCheck] = useState<boolean[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [fb, setFb] = useState<AttemptFeedback | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const labelOptions = useMemo(() => (q.type === "label" ? seededShuffle(q.options, q.id + "o") : []), [q]);

  const canSubmit = (() => {
    switch (q.type) {
      case "mcq":
      case "decision":
        return mcq !== null;
      case "multi":
        return multi.length > 0;
      case "numeric":
        return num.trim() !== "";
      case "order":
        return true;
      case "label":
        return q.markers.every((m) => labels[m.id]);
      case "short":
        return text.trim().length > 10;
    }
  })();

  async function send(response: Response, aiFeedback?: string) {
    setBusy(true);
    setErr(null);
    try {
      const res = await recordAttempt(q, response, source, runId);
      const full = { ...res, aiFeedback };
      setFb(full);
      setSubmitted(true);
      onAnswered?.(full, response);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    if (!canSubmit || busy) return;
    switch (q.type) {
      case "mcq":
        return send({ type: "mcq", choice: mcq! });
      case "decision":
        return send({ type: "decision", choice: mcq! });
      case "multi":
        return send({ type: "multi", choices: multi });
      case "numeric":
        return send({ type: "numeric", value: num });
      case "order":
        return send({ type: "order", items: order });
      case "label":
        return send({ type: "label", labels });
      case "short": {
        setBusy(true);
        try {
          const r = await authFetch("/api/grade", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ questionId: q.id, answer: text, lang }) }).then((x) => x.json() as Promise<{ available: boolean; score?: number; feedback?: string }>);
          if (r.available && typeof r.score === "number") return send({ type: "short", text, score: r.score }, r.feedback);
        } catch {
          // fall through to self-grading
        } finally {
          setBusy(false);
        }
        setSelfCheck(q.rubric.map(() => false));
        return;
      }
    }
  }

  const locked = submitted;
  const decisionFeedback = q.type === "decision" && mcq !== null && submitted && !hideFeedback ? q.options[mcq] : null;

  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted">
        {index !== undefined && total !== undefined && (
          <span className="font-medium tabular-nums">
            {index + 1}/{total}
          </span>
        )}
        <Pill>{t(TYPE_LABEL[q.type])}</Pill>
        <span>{"●".repeat(q.difficulty)}{"○".repeat(3 - q.difficulty)}</span>
      </div>
      <Markdown className="prose-lesson">{q.prompt}</Markdown>

      <div className="mt-3">
        {(q.type === "mcq" || q.type === "decision") && (
          <div className="space-y-2">
            {(q.type === "mcq" ? q.options : q.options.map((o) => o.text)).map((opt, i) => {
              const isAnswer = q.type === "mcq" ? i === q.answer : q.options[i].score === 1;
              const show = submitted && !hideFeedback;
              const tone = show && isAnswer ? "border-ok bg-ok-soft" : show && mcq === i ? "border-danger bg-danger-soft" : mcq === i ? "border-accent bg-accent-soft" : "border-border hover:bg-surface-2";
              return (
                <button key={i} disabled={locked} onClick={() => setMcq(i)} className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-start transition-colors ${tone}`}>
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-current text-[11px] font-semibold">{String.fromCharCode(65 + i)}</span>
                  <span className="min-w-0 flex-1">
                    <InlineMarkdown>{opt}</InlineMarkdown>
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {q.type === "multi" && (
          <div className="space-y-2">
            {q.options.map((opt, i) => {
              const on = multi.includes(i);
              const show = submitted && !hideFeedback;
              const isAnswer = q.answer.includes(i);
              const tone = show && isAnswer ? "border-ok bg-ok-soft" : show && on ? "border-danger bg-danger-soft" : on ? "border-accent bg-accent-soft" : "border-border hover:bg-surface-2";
              return (
                <button key={i} disabled={locked} onClick={() => setMulti((m) => (on ? m.filter((x) => x !== i) : [...m, i]))} className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-start ${tone}`}>
                  <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border border-current text-xs`}>{on ? "✓" : ""}</span>
                  <span className="min-w-0 flex-1">
                    <InlineMarkdown>{opt}</InlineMarkdown>
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {q.type === "numeric" && (
          <div className="flex flex-wrap items-center gap-2">
            <input
              inputMode="decimal"
              value={num}
              disabled={locked}
              onChange={(e) => setNum(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder={t("Your answer")}
              className="w-44 rounded-lg border border-border bg-bg px-3 py-2 tabular-nums outline-none focus:border-accent"
            />
            {q.unit && <span className="text-muted">{q.unit}</span>}
            <span className="text-xs text-muted">
              {t("tolerance ±{x}", { x: q.tolerance?.abs !== undefined && q.tolerance.rel === undefined ? `${q.tolerance.abs}` : `${((q.tolerance?.rel ?? 0.02) * 100).toFixed(1).replace(/\.0$/, "")}%` })}
            </span>
          </div>
        )}

        {q.type === "order" && (
          <ol className="space-y-1.5">
            {order.map((it, i) => (
              <li key={it} className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${submitted && !hideFeedback ? (q.items[i] === it ? "border-ok bg-ok-soft" : "border-danger bg-danger-soft") : "border-border"}`}>
                <span className="w-5 text-sm font-semibold tabular-nums text-muted">{i + 1}</span>
                <span className="min-w-0 flex-1 text-sm">
                  <InlineMarkdown>{it}</InlineMarkdown>
                </span>
                {!locked && (
                  <span className="flex gap-1">
                    <button className={btn.small} disabled={i === 0} onClick={() => setOrder((o) => swap(o, i, i - 1))} aria-label={t("Move up")}>
                      ↑
                    </button>
                    <button className={btn.small} disabled={i === order.length - 1} onClick={() => setOrder((o) => swap(o, i, i + 1))} aria-label={t("Move down")}>
                      ↓
                    </button>
                  </span>
                )}
              </li>
            ))}
          </ol>
        )}

        {q.type === "label" && (
          <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
            <div className="rounded-lg border border-border bg-bg p-2">
              <div dir="ltr" lang="en">
                <Diagram id={q.diagram} mode="numbered" />
              </div>
            </div>
            <div className="space-y-2">
              {q.markers.map((m) => {
                const show = submitted && !hideFeedback;
                const ok = labels[m.id] === m.answer;
                return (
                  <label key={m.id} className="flex items-center gap-2">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white dark:text-black">{markerNumber(q.diagram, m.id)}</span>
                    <select
                      disabled={locked}
                      value={labels[m.id] ?? ""}
                      onChange={(e) => setLabels((l) => ({ ...l, [m.id]: e.target.value }))}
                      className={`min-w-0 flex-1 rounded-lg border bg-bg px-2 py-1.5 text-sm ${show ? (ok ? "border-ok" : "border-danger") : "border-border"}`}
                    >
                      <option value="">{t("Choose…")}</option>
                      {labelOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {show && !ok && <span className="text-xs text-ok">{m.answer}</span>}
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {q.type === "short" && (
          <div>
            <textarea
              value={text}
              disabled={locked || !!selfCheck}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              dir="auto"
              placeholder={t("Write your answer (English or Arabic)…")}
              className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
            />
            {selfCheck && !submitted && (
              <div className="mt-3 rounded-lg border border-border bg-surface-2 p-3">
                <div className="text-sm font-medium">{t("AI grader unavailable — grade yourself against the rubric and model answer.")}</div>
                <div className="mt-2 text-sm">
                  <div className="font-medium">{t("Model answer")}</div>
                  <Markdown className="prose-compact">{q.modelAnswer}</Markdown>
                </div>
                <div className="mt-2 space-y-1">
                  {q.rubric.map((r, i) => (
                    <label key={i} className="flex items-start gap-2 text-sm">
                      <input type="checkbox" checked={selfCheck[i]} onChange={() => setSelfCheck((s) => s!.map((v, j) => (j === i ? !v : v)))} className="mt-1" />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
                <button className={`${btn.primary} mt-3`} disabled={busy} onClick={() => send({ type: "short", text, score: selfCheck.filter(Boolean).length / q.rubric.length })}>
                  {t("Record self-grade")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {!submitted && !selfCheck && (
        <div className="mt-4 flex items-center gap-3">
          <button className={btn.primary} disabled={!canSubmit || busy} onClick={submit}>
            {busy ? t("Checking…") : q.type === "short" ? t("Submit for grading") : t("Check answer")}
          </button>
          {err && <span className="text-sm text-danger">{err}</span>}
        </div>
      )}

      {fb && hideFeedback && <div className="mt-3 text-sm text-muted">{t("Answer recorded.")}</div>}

      {fb && !hideFeedback && (
        <div className={`mt-4 rounded-lg border p-3 sm:p-4 ${fb.correct ? "border-ok/40 bg-ok-soft/50" : "border-danger/40 bg-danger-soft/50"}`}>
          <div className={`text-sm font-semibold ${fb.correct ? "text-ok" : "text-danger"}`}>
            {fb.correct ? t("Correct") : fb.score > 0 ? t("Partly right ({n}%)", { n: Math.round(fb.score * 100) }) : t("Not quite")}
            {q.type === "short" && ` — ${Math.round(fb.score * 100)}%`}
          </div>
          {decisionFeedback && (
            <div className="mt-1 text-sm">
              <InlineMarkdown>{decisionFeedback.feedback}</InlineMarkdown>
            </div>
          )}
          {!fb.correct && q.type !== "short" && q.type !== "label" && (
            <div className="mt-1 text-sm">
              <span className="font-medium">{t("Answer: ")}</span>
              <InlineMarkdown>{fb.correctAnswer}</InlineMarkdown>
            </div>
          )}
          {fb.aiFeedback && (
            <div className="mt-2 text-sm">
              <div className="font-medium">{t("Tutor feedback")}</div>
              <Markdown className="prose-compact">{fb.aiFeedback}</Markdown>
            </div>
          )}
          {q.type === "short" && (
            <details className="mt-2 text-sm">
              <summary className="cursor-pointer font-medium">{t("Model answer & rubric")}</summary>
              <Markdown className="prose-compact">{q.modelAnswer}</Markdown>
              <ul className="ms-5 list-disc">
                {q.rubric.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </details>
          )}
          <div className="mt-2 border-t border-border/60 pt-2">
            <Markdown className="prose-compact">{fb.explanation}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}

function swap<T>(a: T[], i: number, j: number): T[] {
  const b = [...a];
  [b[i], b[j]] = [b[j], b[i]];
  return b;
}
