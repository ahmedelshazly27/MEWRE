"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { get, post } from "@/lib/api";
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
}

const RATINGS = [
  { r: 1, label: "Again", cls: "border-danger/50 hover:bg-danger-soft", key: "1" },
  { r: 2, label: "Hard", cls: "border-warn/50 hover:bg-warn-soft", key: "2" },
  { r: 3, label: "Good", cls: "border-ok/50 hover:bg-ok-soft", key: "3" },
  { r: 4, label: "Easy", cls: "border-info/50 hover:bg-info-soft", key: "4" },
];

export function ReviewSession() {
  const router = useRouter();
  const [queue, setQueue] = useState<CardDto[] | null>(null);
  const [meta, setMeta] = useState({ due: 0, fresh: 0, unlocked: 0 });
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [busy, setBusy] = useState(false);
  const [doneCount, setDoneCount] = useState(0);

  const load = useCallback(async () => {
    const r = await get<{ due: CardDto[]; fresh: CardDto[]; unlockedTotal: number }>("/api/review");
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
        const res = await post<{ due: string }>("/api/review", { cardId: card.id, rating });
        // Learning-step cards due again within 15 minutes come back in this session.
        const again = new Date(res.due).getTime() - Date.now() < 15 * 60_000;
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
            onClick={() => {
              router.refresh();
              load();
            }}
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
