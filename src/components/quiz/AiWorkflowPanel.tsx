"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Question } from "@/content/schema";
import { aiWorkflow } from "@/lib/aiWorkflow";
import { useT } from "@/lib/useLang";
import { btn } from "@/components/ui";

type Short = Extract<Question, { type: "short" }>;

/** Module id from a question id (`fc03-l02-q4`, `mz07-x1`, `m08-x-q3`). */
export const moduleOfQuestion = (id: string) => id.split("-")[0];

/** "Do it with AI": tool, steps, a starter prompt with the venture's facts and the rubric, and the checks to do by hand. */
export function AiWorkflowPanel({ question: q }: { question: Short }) {
  const { t, href } = useT();
  const w = useMemo(() => aiWorkflow(q, moduleOfQuestion(q.id)), [q]);
  const [copied, setCopied] = useState(false);
  const [done, setDone] = useState<boolean[]>(() => w.checks.map(() => false));

  async function copy() {
    try {
      await navigator.clipboard.writeText(w.starterPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <details className="mb-3 rounded-lg border border-accent/30 bg-accent-soft/30 text-sm" dir="ltr">
      <summary className="cursor-pointer px-3 py-2 font-medium text-accent">{t("Do it with AI")}</summary>
      <div className="space-y-3 border-t border-accent/20 px-3 py-3">
        <div>
          <div className="font-medium">{w.toolName}</div>
          <p className="text-muted">{w.why}</p>
        </div>
        <ol className="ms-5 list-decimal space-y-1">
          {w.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <div>
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="font-medium">{t("Starter prompt")}</span>
            <div className="flex gap-2">
              <button type="button" className={btn.small} onClick={copy}>
                {copied ? t("Copied") : t("Copy")}
              </button>
              <Link href={href(`/tutor?exercise=${encodeURIComponent(q.id)}`)} className={btn.small}>
                {t("Work on it with the tutor")}
              </Link>
            </div>
          </div>
          <pre className="max-h-56 overflow-auto whitespace-pre-wrap rounded-md border border-border bg-bg p-2 text-xs">{w.starterPrompt}</pre>
        </div>
        <div>
          <div className="font-medium">{t("Before you submit, check by hand")}</div>
          <ul className="mt-1 space-y-1">
            {w.checks.map((c, i) => (
              <li key={i}>
                <label className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" checked={done[i]} onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))} />
                  <span>{c}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-muted">{t("Paste the AI's first draft below as well, and the grader also scores your judgement: what you caught, fixed and made your own.")}</p>
      </div>
    </details>
  );
}
