"use client";

import { useT } from "@/lib/useLang";
import { useState } from "react";
import { Markdown } from "@/components/Markdown";
import { authFetch } from "@/lib/authFetch";
import { recordEvidence } from "@/lib/store/actions";
import { btn, Pill } from "@/components/ui";

export function Feynman({ prompt, keyPoints, lessonId, concepts }: { prompt: string; keyPoints: string[]; lessonId: string; concepts: string[] }) {
  const { t, lang } = useT();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [self, setSelf] = useState<boolean[] | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const record = async (s: number) => {
    setScore(s);
    try {
      await recordEvidence(concepts, s, "feynman");
    } catch {}
  };

  const submit = async () => {
    setBusy(true);
    try {
      const r = await authFetch("/api/grade", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode: "feynman", prompt, keyPoints, answer: text, lessonId, lang }) }).then((x) => x.json() as Promise<{ available: boolean; score?: number; feedback?: string }>);
      if (r.available && typeof r.score === "number") {
        setFeedback(r.feedback ?? "");
        await record(r.score);
        return;
      }
    } catch {
    } finally {
      setBusy(false);
    }
    setSelf(keyPoints.map(() => false));
  };

  return (
    <div className="my-5 rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center gap-2">
        <Pill tone="info">{t("Feynman check")}</Pill>
        <span className="text-sm text-muted">{t("Explain it simply, in your own words.")}</span>
      </div>
      <div className="mt-2 font-medium">{prompt}</div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        dir="auto"
        disabled={score !== null}
        className="mt-2 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
        placeholder={t("Imagine explaining this to a ministry official with no engineering background…")}
      />
      {score === null && !self && (
        <button className={`${btn.primary} mt-2`} disabled={text.trim().length < 20 || busy} onClick={submit}>
          {busy ? t("Reviewing…") : t("Get feedback")}
        </button>
      )}
      {self && score === null && (
        <div className="mt-3 rounded-lg bg-surface-2 p-3 text-sm">
          <div className="font-medium">{t("Tick the key points your explanation covered:")}</div>
          {keyPoints.map((k, i) => (
            <label key={i} className="mt-1 flex items-start gap-2">
              <input type="checkbox" className="mt-1" checked={self[i]} onChange={() => setSelf(self.map((v, j) => (j === i ? !v : v)))} />
              <span>{k}</span>
            </label>
          ))}
          <button className={`${btn.primary} mt-2`} onClick={() => record(self.filter(Boolean).length / keyPoints.length)}>
            {t("Record")}
          </button>
        </div>
      )}
      {score !== null && (
        <div className="mt-3 rounded-lg bg-surface-2 p-3 text-sm">
          <div className="font-semibold">{t("Coverage: {n}%", { n: Math.round(score * 100) })}</div>
          {feedback && <Markdown className="prose-compact">{feedback}</Markdown>}
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">{t("Key points")}</summary>
            <ul className="ms-5 list-disc">
              {keyPoints.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </details>
        </div>
      )}
    </div>
  );
}
