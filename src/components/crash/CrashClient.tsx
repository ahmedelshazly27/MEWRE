"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Question } from "@/content/schema";
import { useLearner } from "@/lib/store/react";
import { getStore } from "@/lib/store/store";
import { localDay } from "@/lib/store/derive";
import { pickExamFrom } from "@/lib/practice";
import { useT } from "@/lib/useLang";
import { fwd } from "@/lib/i18n";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { btn, Card, ProgressBar, Stat } from "@/components/ui";
import { RunHistory } from "@/components/progress";

/** Synced doc holding the learner's crash-course dates. */
type CrashDoc = { trialDate?: string; startDate?: string };
const DOC = "crash";

function daysBetween(a: string, b: string) {
  return Math.round((new Date(b + "T00:00:00").getTime() - new Date(a + "T00:00:00").getTime()) / 86_400_000);
}

export function CrashHeader({ days }: { days: { day: number; lessons: string[] }[] }) {
  const store = useLearner();
  const { t, lang, href } = useT();
  const [today] = useState(() => localDay(Date.now()));
  if (!store) return <Card className="mb-6 h-28 animate-pulse">{null}</Card>;
  const doc = store.doc<CrashDoc>(DOC) ?? {};
  const lessons = days.flatMap((d) => d.lessons);
  const done = lessons.filter((l) => store.derived().lessons.get(l)?.status === "completed").length;
  const firstOpen = days.find((d) => d.lessons.length === 0 ? false : d.lessons.some((l) => store.derived().lessons.get(l)?.status !== "completed"));
  const start = doc.startDate;
  const byDate = start ? Math.min(days.length, Math.max(1, daysBetween(start, today) + 1)) : null;
  const left = doc.trialDate ? daysBetween(today, doc.trialDate) : null;
  const save = (patch: CrashDoc) => getStore().setDoc(DOC, { ...doc, ...patch });

  return (
    <Card className="mb-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label={t("Crash lessons done")} value={`${done}/${lessons.length}`} hint={<ProgressBar value={lessons.length ? done / lessons.length : 0} className="mt-1.5" />} />
        <Stat
          label={t("Trial week starts in")}
          value={left === null ? "—" : left > 0 ? t("{n} days", { n: left }) : left === 0 ? t("Today") : t("Started")}
          hint={
            <input
              type="date"
              value={doc.trialDate ?? ""}
              onChange={(e) => save({ trialDate: e.target.value || undefined })}
              className="mt-1 w-full rounded-md border border-border bg-bg px-2 py-1 text-xs text-text"
              aria-label={t("Trial week start date")}
            />
          }
        />
        <Stat
          label={t("Plan day")}
          value={byDate ? t("Day {n}", { n: byDate }) : "—"}
          hint={
            start ? (
              <button className="text-accent" onClick={() => save({ startDate: undefined })}>
                {t("Reset start date")}
              </button>
            ) : (
              <button className="text-accent" onClick={() => save({ startDate: today })}>
                {t("Start the plan today")}
              </button>
            )
          }
        />
      </div>
      {left !== null && left > 0 && left < days.length && !start && <p className="mt-3 text-sm text-warn">{t("You have fewer days than the plan: do the first lesson and the output of each day, and skim the rest.")}</p>}
      {firstOpen && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a href={`#day-${byDate ?? firstOpen.day}`} className={btn.primary}>
            {t("Go to day {n}", { n: byDate ?? firstOpen.day })} {fwd(lang)}
          </a>
          <Link href={href("/review")} className={btn.ghost}>
            {t("Daily review")}
          </Link>
        </div>
      )}
    </Card>
  );
}

export function LessonCheck({ lessonId }: { lessonId: string }) {
  const store = useLearner();
  const s = store?.derived().lessons.get(lessonId)?.status;
  return (
    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${s === "completed" ? "bg-ok text-white dark:text-black" : s ? "border-2 border-sun" : "border-2 border-border"}`} aria-hidden>
      {s === "completed" ? "✓" : ""}
    </span>
  );
}

export function DayBadge({ lessons }: { lessons: string[] }) {
  const store = useLearner();
  const { t } = useT();
  if (!store || !lessons.length) return null;
  const n = lessons.filter((l) => store.derived().lessons.get(l)?.status === "completed").length;
  if (n === lessons.length) return <span className="rounded-full bg-ok-soft px-2 py-0.5 text-xs font-medium text-ok">{t("Done")}</span>;
  if (n > 0) return <span className="rounded-full bg-sun-soft px-2 py-0.5 text-xs font-medium text-sun">{`${n}/${lessons.length}`}</span>;
  return null;
}

/** Ticks the day's written output (stored per device-synced doc). */
export function OutputTick({ day }: { day: number }) {
  const store = useLearner();
  const { t } = useT();
  if (!store) return null;
  const doc = store.doc<{ outputs?: number[] } & CrashDoc>(DOC) ?? {};
  const on = !!doc.outputs?.includes(day);
  return (
    <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={on}
        onChange={() => getStore().setDoc(DOC, { ...doc, outputs: on ? (doc.outputs ?? []).filter((d) => d !== day) : [...(doc.outputs ?? []), day] })}
      />
      {t("Output done")}
    </label>
  );
}

/** A fresh mixed exam over every crash-course lesson quiz. */
export function CrashExamClient({ pool, n, title }: { pool: Question[]; n: number; title: string }) {
  const [qs, setQs] = useState<Question[] | null>(null);
  const { t } = useT();
  useEffect(() => {
    setQs(pickExamFrom([], pool, n, Date.now() % 2147483647));
  }, [pool, n]);
  if (!qs) return <div className="text-sm text-muted">{t("Preparing exam…")}</div>;
  return (
    <>
      <RunHistory kind="crash" refId="crash" />
      <QuizRunner questions={qs} source="exam" kind="crash" refId="crash" title={title} examMode timeLimitSec={qs.length * 100} />
    </>
  );
}
