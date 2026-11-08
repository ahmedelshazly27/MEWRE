"use client";

import Link from "next/link";
import { useState } from "react";
import type { TrialDay } from "@/content/trial/schema";
import { useLearner } from "@/lib/store/react";
import { getStore } from "@/lib/store/store";
import { bestScores, localDay } from "@/lib/store/derive";
import { Card, ProgressBar } from "@/components/ui";

export interface TrialDayDto extends Omit<TrialDay, "playbook"> {
  explainers: { id: string; title: string; minutes: number }[];
  /** Optional explainers for the day ("if you have time"). */
  extra: { id: string; title: string; minutes: number }[];
  /** Tier-1 must-know concepts of the day's modules. */
  concepts: { id: string; module: string }[];
  playbook: { id: string; title: string }[];
  moduleTitles: { id: string; title: string }[];
}

/** Synced doc for manual ticks (review done per day, playbook sections read). Self-test ticks live in the crash doc. */
type TrialDoc = { review?: number[]; playbook?: string[] };

function Tick({ on, onClick, label }: { on: boolean; onClick?: () => void; label: string }) {
  const cls = `grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${on ? "bg-ok text-white dark:text-black" : "border-2 border-border"}`;
  if (!onClick) return <span className={cls} title={label}>{on ? "✓" : ""}</span>;
  return (
    <button onClick={onClick} className={`${cls} hover:border-accent`} aria-pressed={on} aria-label={label} title={label}>
      {on ? "✓" : ""}
    </button>
  );
}

function Row({ done, onTick, label, href, minutes, children }: { done: boolean; onTick?: () => void; label: string; href: string; minutes: number; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 py-1.5">
      <Tick on={done} onClick={onTick} label={label} />
      <Link href={href} className={`min-w-0 flex-1 truncate text-sm hover:text-accent ${done ? "text-muted line-through decoration-1" : ""}`}>
        {children}
      </Link>
      <span className="shrink-0 text-xs tabular-nums text-muted">{minutes} min</span>
    </li>
  );
}

const daysBetween = (a: string, b: string) => Math.round((new Date(b + "T00:00:00").getTime() - new Date(a + "T00:00:00").getTime()) / 86_400_000);

export function TrialPlan({ days, trialStart, reviewMin, selftestMin, examMin }: { days: TrialDayDto[]; trialStart: string; reviewMin: number; selftestMin: number; examMin: number }) {
  const store = useLearner();
  const [today] = useState(() => localDay(Date.now()));
  const doc: TrialDoc = store?.doc<TrialDoc>("trial") ?? {};
  const known = new Set(store?.doc<{ known?: string[] }>("crash")?.known ?? []);
  const save = (patch: TrialDoc) => getStore().setDoc("trial", { ...doc, ...patch });
  const d = store?.derived();
  const checks = d ? bestScores(d, "explainer") : new Map<string, number>();
  const examBest = d ? bestScores(d, "crash").get("crash") : undefined;

  const left = daysBetween(today, trialStart);
  // which plan day is "today": the plan's last day is the day before the trial
  const n = days.length;
  const todayIdx = Math.min(Math.max(n - left + 1, 1), n);

  const dayItems = (day: TrialDayDto) => {
    // optional explainers do not count towards the day's progress
    const items: boolean[] = [!!doc.review?.includes(day.day), ...day.explainers.map((e) => checks.has(e.id))];
    if (day.concepts.length) items.push(day.concepts.every((c) => known.has(c.id)));
    for (const p of day.playbook) items.push(!!doc.playbook?.includes(p.id));
    if (day.exam) items.push(examBest !== undefined);
    return items;
  };
  const all = days.flatMap(dayItems);
  const done = all.filter(Boolean).length;

  return (
    <>
      <Card className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm text-muted">Trial starts {new Date(trialStart + "T00:00:00").toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}</div>
            <div className="text-2xl font-semibold">{left > 0 ? `${left} day${left === 1 ? "" : "s"} to go` : left === 0 ? "Today is day one. Good luck." : "Trial under way"}</div>
          </div>
          <div className="min-w-[180px] flex-1 sm:max-w-xs">
            <div className="mb-1 flex justify-between text-xs text-muted">
              <span>Plan progress</span>
              <span className="tabular-nums">
                {done}/{all.length}
              </span>
            </div>
            <ProgressBar value={all.length ? done / all.length : 0} />
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {days.map((day) => {
          const minutes = reviewMin + day.explainers.reduce((s, e) => s + e.minutes, 0) + (day.concepts.length ? selftestMin : 0) + day.playbook.length * 8 + (day.exam ? examMin : 0);
          const items = dayItems(day);
          const isToday = left > 0 && day.day === todayIdx;
          return (
            <Card key={day.day} className={isToday ? "border-accent/60" : ""}>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold">
                  Day {day.day}: {day.title} {isToday && <span className="ms-1 rounded-md bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">today</span>}
                </h2>
                <span className="text-xs tabular-nums text-muted">
                  about {Math.round(minutes / 15) / 4} h · {items.filter(Boolean).length}/{items.length} done
                </span>
              </div>
              <p className="mb-2 text-sm text-muted">{day.goal}</p>
              <ul className="divide-y divide-border/60">
                <Row
                  done={!!doc.review?.includes(day.day)}
                  onTick={() => void save({ review: doc.review?.includes(day.day) ? doc.review.filter((x) => x !== day.day) : [...(doc.review ?? []), day.day] })}
                  label="Mark today's review as done"
                  href="/review"
                  minutes={reviewMin}
                >
                  Start with the review queue (yesterday&apos;s mistakes and cards come back here)
                </Row>
                {day.explainers.map((e) => (
                  <Row key={e.id} done={checks.has(e.id)} label="Completed by answering its three questions" href={`/trial/${e.id}`} minutes={e.minutes}>
                    {e.title}
                    {checks.has(e.id) && <span className="ms-2 text-xs text-muted">{Math.round(checks.get(e.id)! * 100)}%</span>}
                  </Row>
                ))}
                {day.concepts.length > 0 &&
                  day.moduleTitles.map((m) => {
                    const ids = day.concepts.filter((c) => c.module === m.id);
                    if (!ids.length) return null;
                    const n = ids.filter((c) => known.has(c.id)).length;
                    return (
                      <Row key={m.id} done={n === ids.length} label="Completed when you can explain every must-know concept" href={`/crash/concepts?m=${m.id}&mode=test`} minutes={Math.max(5, Math.round((selftestMin * ids.length) / day.concepts.length))}>
                        Self-test the must-know concepts: {m.title} ({n}/{ids.length})
                      </Row>
                    );
                  })}
                {day.playbook.map((p) => (
                  <Row
                    key={p.id}
                    done={!!doc.playbook?.includes(p.id)}
                    onTick={() => void save({ playbook: doc.playbook?.includes(p.id) ? doc.playbook.filter((x) => x !== p.id) : [...(doc.playbook ?? []), p.id] })}
                    label="Mark as read"
                    href="/crash#playbook"
                    minutes={8}
                  >
                    Playbook: {p.title}
                  </Row>
                ))}
                {day.exam && (
                  <Row done={examBest !== undefined} label="Completed by taking the exam" href="/crash/exam" minutes={examMin}>
                    Final exam: 25 timed questions across all modules{examBest !== undefined && <span className="ms-2 text-xs text-muted">{Math.round(examBest * 100)}%</span>}
                  </Row>
                )}
              </ul>
              {day.extra.length > 0 && (
                <details className="mt-2 text-sm">
                  <summary className="cursor-pointer text-muted">
                    If you have time ({day.extra.length} more, about {day.extra.reduce((s, e) => s + e.minutes, 0)} min), or in your first weeks
                  </summary>
                  <ul className="mt-1 divide-y divide-border/60">
                    {day.extra.map((e) => (
                      <Row key={e.id} done={checks.has(e.id)} label="Completed by answering its three questions" href={`/trial/${e.id}`} minutes={e.minutes}>
                        {e.title}
                      </Row>
                    ))}
                  </ul>
                </details>
              )}
            </Card>
          );
        })}
      </div>
    </>
  );
}
