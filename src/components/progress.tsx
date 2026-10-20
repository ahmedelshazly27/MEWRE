"use client";

/** Progress overlays for statically rendered pages. Each reads the local learner store. */
import { useMemo } from "react";
import { useLearner } from "@/lib/store/react";
import { bestScores, masteryMap } from "@/lib/store/derive";
import { MasteryBadge, Pill, ProgressBar, fmtDuration } from "@/components/ui";
import { useT } from "@/lib/useLang";

function useMastery() {
  const store = useLearner();
  const version = store?.version;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => (store ? masteryMap(store.derived()) : null), [version]);
}

export function ConceptBadge({ conceptId }: { conceptId: string }) {
  const m = useMastery();
  const { lang } = useT();
  const x = m?.get(conceptId);
  return <MasteryBadge mastery={x?.mastery ?? 0} evidence={x?.evidence ?? 0} lang={lang} />;
}

export function LessonMeta({ lessonId }: { lessonId: string }) {
  const store = useLearner();
  const { t } = useT();
  const p = store?.derived().lessons.get(lessonId);
  if (!p) return null;
  return (
    <>
      {p.seconds > 0 && <span>· {t("{t} spent", { t: fmtDuration(p.seconds) })}</span>}
      {p.status === "completed" && <Pill tone="ok">{t("Completed")}</Pill>}
    </>
  );
}

export function LessonIcon({ lessonId, index }: { lessonId: string; index: number }) {
  const store = useLearner();
  const p = store?.derived().lessons.get(lessonId);
  return (
    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold ${p?.status === "completed" ? "bg-ok-soft text-ok" : p ? "bg-sun-soft text-sun" : "bg-surface-2 text-muted"}`}>
      {p?.status === "completed" ? "✓" : index + 1}
    </span>
  );
}

export function LessonPills({ lessonId }: { lessonId: string }) {
  const store = useLearner();
  const { t } = useT();
  if (!store) return null;
  const d = store.derived();
  const p = d.lessons.get(lessonId);
  const qb = bestScores(d, "quiz").get(lessonId);
  return (
    <>
      {p && p.seconds > 0 && <Pill>{t("{t} spent", { t: fmtDuration(p.seconds) })}</Pill>}
      {qb !== undefined && <Pill tone={qb >= 0.8 ? "ok" : "warn"}>{t("Quiz {n}%", { n: Math.round(qb * 100) })}</Pill>}
    </>
  );
}

export function BestScore({ kind, refId, label, empty }: { kind: string; refId: string; label: string; empty?: string }) {
  const store = useLearner();
  const s = store ? bestScores(store.derived(), kind).get(refId) : undefined;
  if (s === undefined) return empty ? <Pill tone="accent">{empty}</Pill> : null;
  return <Pill tone={s >= 0.8 ? "ok" : "warn"}>{`${label} ${Math.round(s * 100)}%`}</Pill>;
}

export function ModuleProgress({ lessonIds, conceptIds }: { lessonIds: string[]; conceptIds: string[] }) {
  const store = useLearner();
  const m = useMastery();
  const { t } = useT();
  const done = store ? lessonIds.filter((l) => store.derived().lessons.get(l)?.status === "completed").length : 0;
  const avg = m && conceptIds.length ? conceptIds.reduce((s, c) => s + (m.get(c)?.mastery ?? 0), 0) / conceptIds.length : 0;
  return (
    <div className="mt-3 space-y-1.5">
      <div className="flex items-center gap-2 text-xs text-muted">
        <span className="w-16">{t("Lessons")}</span>
        <ProgressBar value={lessonIds.length ? done / lessonIds.length : 0} />
        <span className="w-10 text-end tabular-nums">
          {done}/{lessonIds.length}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted">
        <span className="w-16">{t("Mastery")}</span>
        <ProgressBar value={avg} tone="sun" />
        <span className="w-10 text-end tabular-nums">{Math.round(avg * 100)}%</span>
      </div>
    </div>
  );
}

/** "Continue" target inside a module: first lesson not completed. */
export function useFirstOpenLesson(lessonIds: string[]): string {
  const store = useLearner();
  if (!store) return lessonIds[0];
  return lessonIds.find((l) => store.derived().lessons.get(l)?.status !== "completed") ?? lessonIds[0];
}

export function RunHistory({ kind, refId }: { kind: string; refId?: string }) {
  const store = useLearner();
  const { t } = useT();
  const runs = store ? store.derived().runs.filter((r) => r.kind === kind && (!refId || r.ref === refId)).slice(0, 5) : [];
  if (!runs.length) return null;
  return <div className="mb-4 text-sm text-muted">{t("Previous runs: {list}", { list: runs.map((r) => `${Math.round(r.score * 100)}%`).join(" · ") })}</div>;
}
