"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Module } from "@/content/schema";
import { useLearner } from "@/lib/store/react";
import { useContent } from "@/lib/useContent";
import { pickDiagnostic } from "@/lib/practice";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { Card, PageHeader } from "@/components/ui";
import { useT } from "@/lib/useLang";

export default function DiagnosticPage() {
  const { t, href, lang } = useT();
  const store = useLearner();
  const content = useContent();
  const [started, setStarted] = useState(false);
  // Diagnostic is per track; Arabic pages only have Track 0
  const [track, setTrack] = useState<string>("mewre");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("track");
    if (q) setTrack(q);
  }, []);
  const items = useMemo(() => {
    if (!content) return [];
    // Rebuild the minimal module shape pickDiagnostic needs from the content index.
    const mods = content.modules.filter((m) => m.track === track).map(
      (m) =>
        ({
          id: m.id,
          draft: m.draft,
          lessons: m.lessonIds.map((lid) => ({
            id: lid,
            quiz: Object.values(content.questions)
              .filter((q) => q.lessonId === lid && q.origin === "quiz")
              .map((q) => q.question),
          })),
        }) as unknown as Module,
    );
    return pickDiagnostic(mods, 4);
  }, [content, track]);
  if (!store || !content) return <div className="text-muted">{t("Loading…")}</div>;
  const past = store.derived().runs.filter((r) => r.kind === "diagnostic" && (r.ref === track || (track === "mewre" && r.ref === "all"))).slice(0, 5);
  const liveTracks = content.tracks.filter((tr) => content.modules.some((m) => m.track === tr.id && m.lessonIds.length));
  const modCount = new Set(items.map((i) => i.moduleId)).size;

  if (!started) {
    return (
      <div className="mx-auto max-w-3xl">
        <PageHeader
          title={t("Diagnostic test")}
          subtitle={t("A baseline across every module. Results seed your per-concept mastery (at reduced weight) so the dashboard can recommend where to focus. Don't guess wildly — skipping knowledge you lack gives a truer baseline.")}
        />
        {lang === "en" && liveTracks.length > 1 && (
          <div className="mb-4 flex flex-wrap gap-2" role="radiogroup">
            {liveTracks.map((tr) => (
              <button key={tr.id} role="radio" aria-checked={track === tr.id} onClick={() => setTrack(tr.id)} className={`rounded-lg border px-3 py-1.5 text-sm ${track === tr.id ? "border-accent bg-accent-soft text-accent" : "border-border hover:bg-surface-2"}`}>
                {tr.short}
              </button>
            ))}
          </div>
        )}
        <Card>
          <div className="text-sm text-muted">
            {t("{n} questions across {m} modules · about {min} minutes · feedback at the end.", { n: items.length, m: modCount, min: Math.round(items.length * 1.5) })}
          </div>
          <button onClick={() => setStarted(true)} className="mt-4 inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white dark:text-black">
            {t("Start diagnostic")}
          </button>
          {past.length > 0 && (
            <div className="mt-5 text-sm">
              <div className="font-medium">{t("Previous attempts")}</div>
              <ul className="mt-1 text-muted">
                {past.map((r) => (
                  <li key={r.id}>
                    {new Date(r.finishedAt).toLocaleDateString()} — {Math.round(r.score * 100)}%
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={t("Diagnostic test")} subtitle={t("Answer what you can. Feedback at the end.")} />
      <QuizRunner questions={items.map((i) => i.question)} source="diagnostic" kind="diagnostic" refId={track} title={t("Diagnostic baseline")} examMode />
      <p className="mt-6 text-sm text-muted">
        {t("When done, see your")}{" "}
        <Link href={href("/")} className="text-accent">
          {t("dashboard")}
        </Link>{" "}
        {t("for per-competency baseline and recommendations.")}
      </p>
    </div>
  );
}
