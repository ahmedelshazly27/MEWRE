"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { getStore } from "@/lib/store/store";
import { useLearner } from "@/lib/store/react";
import { reviewForecast, reviewQueue } from "@/lib/store/derive";
import { gradeCard } from "@/lib/store/actions";
import { loadContent, useContent } from "@/lib/useContent";
import { newCard, previewIntervals } from "@/lib/srs";
import { PageHeader } from "@/components/ui";
import { btn, EmptyState, Pill, ProgressBar } from "@/components/ui";
import { LessonTimer } from "@/components/lesson/LessonClient";

interface CardDto {
  id: string;
  kind: "lesson" | "glossary" | "formula";
  front: string;
  back: string;
  ar?: string;
  lessonId: string;
  lessonTitle: string;
  moduleId: string;
  state: number;
  intervals: Record<string, string>;
  concepts?: string[];
}

const RATINGS = [
  { r: 1, label: "Again", cls: "border-danger/50 hover:bg-danger-soft", key: "1" },
  { r: 2, label: "Hard", cls: "border-warn/50 hover:bg-warn-soft", key: "2" },
  { r: 3, label: "Good", cls: "border-ok/50 hover:bg-ok-soft", key: "3" },
  { r: 4, label: "Easy", cls: "border-info/50 hover:bg-info-soft", key: "4" },
];

export function ReviewSession() {
  const [queue, setQueue] = useState<CardDto[] | null>(null);
  const [meta, setMeta] = useState({ due: 0, fresh: 0, unlocked: 0 });
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [busy, setBusy] = useState(false);
  const [doneCount, setDoneCount] = useState(0);

  const load = useCallback(async () => {
    const store = getStore();
    await store.load();
    const content = await loadContent();
    const raw = reviewQueue(store.derived(), content.cardOrder, store.settings().newCardsPerDay);
    const dto = (id: string): CardDto => {
      const c = content.cards[id];
      const state = store.derived().cards.get(id) ?? newCard(id);
      const lesson = content.lessons.find((l) => l.id === c.lessonId);
      return { id, kind: c.kind, front: c.front, back: c.back, ar: c.ar, lessonId: c.lessonId, lessonTitle: lesson?.title ?? "", moduleId: c.moduleId, state: state.state, intervals: previewIntervals(state, new Date(), store.settings().retention), concepts: c.concepts };
    };
    const r = { due: raw.due.filter((id) => content.cards[id]).map(dto), fresh: raw.fresh.filter((id) => content.cards[id]).map(dto), unlockedTotal: raw.unlockedTotal };
    // interleave new cards among due reviews (1 new per 3 reviews)
    const q: CardDto[] = [];
    const due = [...r.due];
    const fresh = [...r.fresh];
    while (due.length || fresh.length) {
      q.push(...due.splice(0, 3));
      if (fresh.length) q.push(fresh.shift()!);
    }
    setQueue(q);
    setPos(0);
    setFlipped(false);
    setMeta({ due: r.due.length, fresh: r.fresh.length, unlocked: r.unlockedTotal });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const rate = useCallback(
    async (rating: number) => {
      if (!queue || busy) return;
      const card = queue[pos];
      setBusy(true);
      try {
        await gradeCard(card.id, rating as 1 | 2 | 3 | 4, card.concepts);
        const next = getStore().derived().cards.get(card.id);
        // Learning-step cards due again within 15 minutes come back in this session.
        const again = !!next && new Date(next.due).getTime() - Date.now() < 15 * 60_000;
        const nextQ = [...queue];
        if (again) nextQ.push({ ...card, state: 1 });
        setQueue(nextQ);
        setDoneCount((d) => d + 1);
        setPos((p) => p + 1);
        setFlipped(false);
      } finally {
        setBusy(false);
      }
    },
    [queue, pos, busy],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "TEXTAREA" || (e.target as HTMLElement)?.tagName === "INPUT") return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped(true);
      } else if (flipped && ["1", "2", "3", "4"].includes(e.key)) rate(Number(e.key));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipped, rate]);

  if (!queue) return <div className="text-muted">Loading review queue…</div>;

  if (pos >= queue.length) {
    return (
      <div className="space-y-4">
        <EmptyState title={doneCount ? `Session done — ${doneCount} reviews` : "Nothing due right now"}>
          {meta.unlocked === 0
            ? "Complete a lesson (finish its quiz) to unlock its flashcards, glossary terms and formulas into the review queue."
            : "Come back tomorrow — FSRS schedules each card just before you would forget it."}
        </EmptyState>
        <div className="flex justify-center gap-2">
          <button
            className={btn.ghost}
            onClick={() => load()}
          >
            Check again
          </button>
          <Link href="/practice" className={btn.primary}>
            Mixed practice instead
          </Link>
        </div>
      </div>
    );
  }

  const card = queue[pos];
  return (
    <div className="mx-auto max-w-2xl">
      <LessonTimer lessonId={null} />
      <div className="mb-3 flex items-center gap-3 text-sm text-muted">
        <ProgressBar value={pos / queue.length} />
        <span className="shrink-0 tabular-nums">
          {pos + 1}/{queue.length}
        </span>
      </div>
      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
          <Pill tone={card.kind === "glossary" ? "sun" : card.kind === "formula" ? "info" : "accent"}>{card.kind === "lesson" ? "Concept" : card.kind === "glossary" ? "Glossary" : "Formula"}</Pill>
          {card.state === 0 && <Pill tone="ok">New</Pill>}
          <Link href={`/learn/${card.moduleId}/${card.lessonId}`} className="text-muted hover:text-text">
            {card.lessonTitle}
          </Link>
        </div>
        <Markdown className="prose-lesson text-lg">{card.front}</Markdown>
        {flipped ? (
          <div className="mt-5 border-t border-border pt-5">
            {card.ar && (
              <div className="mb-2 text-2xl font-semibold" dir="rtl" lang="ar">
                {card.ar}
              </div>
            )}
            <Markdown className="prose-lesson">{card.back}</Markdown>
          </div>
        ) : (
          <button className={`${btn.primary} mt-6 w-full`} onClick={() => setFlipped(true)}>
            Show answer <span className="opacity-60">(space)</span>
          </button>
        )}
      </div>
      {flipped && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {RATINGS.map((x) => (
            <button key={x.r} disabled={busy} onClick={() => rate(x.r)} className={`rounded-xl border bg-surface px-2 py-3 text-center transition-colors ${x.cls}`}>
              <div className="text-sm font-semibold">{x.label}</div>
              <div className="text-xs text-muted">{card.intervals[String(x.r)]}</div>
            </button>
          ))}
        </div>
      )}
      <p className="mt-4 text-center text-xs text-muted">
        Recall before flipping. Rate honestly: <strong>Again</strong> if you couldn&apos;t recall it, <strong>Good</strong> if you did with effort. Keys 1–4.
      </p>
    </div>
  );
}

/** Page header with live counts and the 7-day forecast. */
export function ReviewHeader() {
  const store = useLearner();
  const content = useContent();
  const q = store && content ? reviewQueue(store.derived(), content.cardOrder, store.settings().newCardsPerDay) : null;
  const forecast = store ? reviewForecast(store.derived(), 7) : new Array(7).fill(0);
  const max = Math.max(1, ...forecast);
  return (
    <PageHeader
      title="Daily review"
      subtitle={q ? `Spaced repetition (FSRS). ${q.due.length} due · ${q.fresh.length} new today · ${q.known} cards learning · ${q.unlockedTotal} unlocked.` : "Spaced repetition (FSRS)."}
    >
      <div className="flex items-end gap-1" title="Reviews due over the next 7 days">
        {forecast.map((n, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-5 rounded-sm bg-accent/70" style={{ height: `${4 + (n / max) * 36}px` }} />
            <span className="text-[10px] text-muted">{i === 0 ? "T" : `+${i}`}</span>
          </div>
        ))}
      </div>
    </PageHeader>
  );
}
