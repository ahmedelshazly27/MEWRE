"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Question } from "@/content/schema";
import { CHECK_QUESTIONS, SPRINT_DAYS, type SprintDays, type Tier } from "@/content/crash";
import { useLearner } from "@/lib/store/react";
import { getStore } from "@/lib/store/store";
import { bestScores, localDay } from "@/lib/store/derive";
import { pickStratified, shuffle } from "@/lib/practice";
import { planSprint, type SprintItem } from "@/lib/sprint";
import { useT } from "@/lib/useLang";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { Card, Pill, ProgressBar, Stat, fmtDuration } from "@/components/ui";
import { RunHistory } from "@/components/progress";

/** Synced doc holding the learner's sprint choices and ticks. */
type CrashDoc = { days?: SprintDays; trialDate?: string; read?: string[]; outputs?: string[]; playbook?: boolean };
const DOC = "crash";

export interface BlockDto {
  module: string;
  number: number;
  title: string;
  sheetMin: number;
  lessons: { id: string; tier: Tier; minutes: number; title: string }[];
  scenario?: { id: string; tier: Tier; title: string };
  output?: { tier: Tier; text: string };
}

function daysBetween(a: string, b: string) {
  return Math.round((new Date(b + "T00:00:00").getTime() - new Date(a + "T00:00:00").getTime()) / 86_400_000);
}

function Tick({ on, onClick, label }: { on: boolean; onClick?: () => void; label: string }) {
  const cls = `grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${on ? "bg-ok text-white dark:text-black" : "border-2 border-border"}`;
  if (!onClick) return <span className={cls}>{on ? "✓" : ""}</span>;
  return (
    <button onClick={onClick} className={`${cls} hover:border-accent`} aria-pressed={on} aria-label={label} title={label}>
      {on ? "✓" : ""}
    </button>
  );
}

function Row({ done, onTick, tickLabel, href, children, minutes, badge }: { done: boolean; onTick?: () => void; tickLabel: string; href?: string; children: React.ReactNode; minutes: number; badge?: string }) {
  const { t } = useT();
  const body = (
    <>
      <span className="min-w-0 flex-1">{children}</span>
      {badge && <Pill>{badge}</Pill>}
      <span className="shrink-0 text-xs text-muted">{t("{n} min", { n: minutes })}</span>
    </>
  );
  return (
    <li className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-surface-2">
      <Tick on={done} onClick={onTick} label={tickLabel} />
      {href ? (
        <Link href={href} className="flex min-w-0 flex-1 items-center gap-2.5">
          {body}
        </Link>
      ) : (
        <span className="flex min-w-0 flex-1 items-center gap-2.5">{body}</span>
      )}
    </li>
  );
}

export function SprintPlan({ blocks }: { blocks: BlockDto[] }) {
  const store = useLearner();
  const { t, href } = useT();
  const [today] = useState(() => localDay(Date.now()));
  const doc: CrashDoc = store?.doc<CrashDoc>(DOC) ?? {};
  const days: SprintDays = doc.days ?? 4;
  const save = (patch: CrashDoc) => getStore().setDoc(DOC, { ...doc, ...patch });
  const toggle = (key: "read" | "outputs", id: string) => {
    const list = doc[key] ?? [];
    void save({ [key]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id] });
  };

  const d = store?.derived();
  const lessonDone = (id: string) => d?.lessons.get(id)?.status === "completed";
  const checks = d ? bestScores(d, "check") : new Map<string, number>();
  const scen = d ? bestScores(d, "scenario") : new Map<string, number>();
  const examBest = d ? bestScores(d, "crash").get("crash") : undefined;

  const plan = planSprint(blocks, days);
  const total = plan.reduce((s, x) => s + x.minutes, 0);
  const isDone = (b: BlockDto | null, it: SprintItem): boolean => {
    switch (it.kind) {
      case "sheet":
        return !!doc.read?.includes(b!.module);
      case "lesson":
        return lessonDone(it.id);
      case "scenario":
        return scen.has(it.id);
      case "check":
        return checks.has(b!.module);
      case "output":
        return !!doc.outputs?.includes(b!.module);
      case "playbook":
        return !!doc.playbook;
      case "exam":
        return examBest !== undefined;
    }
  };
  const all = plan.flatMap((day) => day.segments.flatMap((sg) => sg.items.map((it) => isDone(sg.block, it))));
  const items = all.length;
  const done = all.filter(Boolean).length;
  const left = doc.trialDate ? daysBetween(today, doc.trialDate) : null;

  return (
    <>
      <Card className="mb-6">
        <div className="mb-3 text-sm font-medium">{t("How many days do you have?")}</div>
        <div className="flex flex-wrap gap-2" role="radiogroup">
          {SPRINT_DAYS.map((n) => (
            <button
              key={n}
              role="radio"
              aria-checked={days === n}
              onClick={() => save({ days: n })}
              disabled={!store}
              className={`rounded-lg border px-4 py-2 text-sm font-medium ${days === n ? "border-accent bg-accent-soft text-accent" : "border-border hover:bg-surface-2"}`}
            >
              {t("{n} days", { n })}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          {t("Every plan covers all 16 modules (cheat sheet + retrieval check). Longer plans add more full lessons, scenarios and written outputs.")}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Stat label={t("Study time")} value={fmtDuration(total * 60)} hint={t("≈ {h} per day", { h: fmtDuration((total * 60) / days) })} />
          <Stat label={t("Progress")} value={`${done}/${items}`} hint={<ProgressBar value={items ? done / items : 0} className="mt-1.5" />} />
          <Stat
            label={t("Trial week starts in")}
            value={left === null ? "—" : left > 0 ? t("{n} days", { n: left }) : left === 0 ? t("Today") : t("Started")}
            hint={
              <input
                type="date"
                value={doc.trialDate ?? ""}
                disabled={!store}
                onChange={(e) => save({ trialDate: e.target.value || undefined })}
                className="mt-1 w-full rounded-md border border-border bg-bg px-2 py-1 text-xs text-text"
                aria-label={t("Trial week start date")}
              />
            }
          />
        </div>
      </Card>

      <ol className="space-y-4">
        {plan.map((day) => (
          <li key={day.day} id={`day-${day.day}`} className="scroll-mt-20 rounded-xl border border-border bg-surface p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="accent">{t("Day {n}", { n: day.day })}</Pill>
              <span className="text-xs text-muted">{fmtDuration(day.minutes * 60)}</span>
              <span className="text-xs text-muted">· {[...new Set(day.segments.filter((sg) => sg.block).map((sg) => `M${sg.block!.number}`))].join(" · ")}</span>
            </div>
            <div className="mt-2 space-y-4">
              {day.segments.map((sg, si) => {
                const b = sg.block;
                return (
                  <div key={si}>
                    <h3 className="font-semibold">
                      {b ? (
                        <Link href={href(`/learn/${b.module}`)} className="hover:text-accent">
                          M{b.number} · {b.title}
                          {sg.continued && <span className="ms-1 text-sm font-normal text-muted">({t("continued")})</span>}
                        </Link>
                      ) : (
                        t("Finish line")
                      )}
                    </h3>
                    <ul className="mt-1 space-y-0.5 text-sm">
                      {sg.items.map((it, ii) => {
                        const ok = isDone(b, it);
                        switch (it.kind) {
                          case "sheet":
                            return (
                              <Row key={ii} done={ok} onTick={() => toggle("read", b!.module)} tickLabel={t("Mark as read")} href={href(`/print/${b!.module}`)} minutes={it.minutes}>
                                📄 {t("Read the cheat sheet")}
                              </Row>
                            );
                          case "lesson": {
                            const l = b!.lessons.find((x) => x.id === it.id)!;
                            return (
                              <Row key={ii} done={ok} tickLabel={t("Completed by finishing the lesson quiz")} href={href(`/learn/${b!.module}/${l.id}`)} minutes={it.minutes} badge={l.tier === 1 ? t("Core") : undefined}>
                                📘 {l.title}
                              </Row>
                            );
                          }
                          case "scenario":
                            return (
                              <Row key={ii} done={ok} tickLabel={t("Completed by playing the scenario")} href={href(`/scenarios/${it.id}`)} minutes={it.minutes}>
                                🎯 {b!.scenario?.title}
                              </Row>
                            );
                          case "check":
                            return (
                              <Row key={ii} done={ok} tickLabel={t("Completed by taking the check")} href={href(`/crash/check/${b!.module}`)} minutes={it.minutes} badge={ok ? `${Math.round(checks.get(b!.module)! * 100)}%` : undefined}>
                                ✅ {t("Retrieval check ({n} questions)", { n: CHECK_QUESTIONS })}
                              </Row>
                            );
                          case "output":
                            return (
                              <li key={ii} className="rounded-lg bg-surface-2 px-2 py-2">
                                <div className="flex items-start gap-2.5">
                                  <Tick on={ok} onClick={() => toggle("outputs", b!.module)} label={t("Output done")} />
                                  <span className="min-w-0 flex-1">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-muted">✍️ {t("Write")}</span>
                                    <span className="block">{b!.output?.text}</span>
                                  </span>
                                  <span className="shrink-0 text-xs text-muted">{t("{n} min", { n: it.minutes })}</span>
                                </div>
                              </li>
                            );
                          case "playbook":
                            return (
                              <Row key={ii} done={ok} onTick={() => save({ playbook: !doc.playbook })} tickLabel={t("Mark as read")} href="#playbook" minutes={it.minutes}>
                                🧭 {t("Read the trial-week playbook")}
                              </Row>
                            );
                          case "exam":
                            return (
                              <Row key={ii} done={ok} tickLabel={t("Completed by taking the exam")} href={href("/crash/exam")} minutes={it.minutes} badge={ok ? `${Math.round(examBest! * 100)}%` : undefined}>
                                📝 {t("Final exam across all modules")}
                              </Row>
                            );
                        }
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

/** Short learning-mode check on one module: feedback after every question, misses go to the error log. */
export function CheckClient({ pool, moduleId, title }: { pool: Question[]; moduleId: string; title: string }) {
  const [qs, setQs] = useState<Question[] | null>(null);
  const { t } = useT();
  useEffect(() => {
    setQs(shuffle(pool, Date.now() % 2147483647).slice(0, CHECK_QUESTIONS));
  }, [pool]);
  if (!qs) return <div className="text-sm text-muted">{t("Preparing exam…")}</div>;
  return (
    <>
      <RunHistory kind="check" refId={moduleId} />
      <QuizRunner questions={qs} source="mixed" kind="check" refId={moduleId} title={title} />
    </>
  );
}

/** Final mixed exam: at least one question from every module, timed, feedback at the end. */
export function CrashExamClient({ groups, n, title }: { groups: Question[][]; n: number; title: string }) {
  const [qs, setQs] = useState<Question[] | null>(null);
  const { t } = useT();
  useEffect(() => {
    setQs(pickStratified(groups, n, Date.now() % 2147483647));
  }, [groups, n]);
  if (!qs) return <div className="text-sm text-muted">{t("Preparing exam…")}</div>;
  return (
    <>
      <RunHistory kind="crash" refId="crash" />
      <QuizRunner questions={qs} source="exam" kind="crash" refId="crash" title={title} examMode timeLimitSec={qs.length * 100} />
    </>
  );
}
