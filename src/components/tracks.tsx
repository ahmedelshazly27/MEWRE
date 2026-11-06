"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { ContentIndex, TrackSummary } from "@/lib/content-index";
import { useContent } from "@/lib/useContent";
import { useLearner } from "@/lib/store/react";
import { bestScores, masteryMap } from "@/lib/store/derive";
import { competencyScores, readinessBand, readinessScore, type CompetencyScore } from "@/lib/readiness";
import { useT } from "@/lib/useLang";
import { Card, ProgressBar } from "@/components/ui";
import { Icon } from "@/components/Nav";

export interface TrackStats {
  track: TrackSummary;
  readiness: number;
  comps: CompetencyScore[];
  lessonsDone: number;
  lessonsTotal: number;
  /** First not-completed lesson in the track's recommended order. */
  next?: ContentIndex["lessons"][number];
  started: boolean;
}


export function useTrackStats(): TrackStats[] | null {
  const store = useLearner();
  const content = useContent();
  const version = store?.version;
  return useMemo(() => {
    if (!store || !content) return null;
    const d = store.derived();
    const mastery = masteryMap(d);
    return content.tracks.map((track) => {
      const mods = new Set(track.moduleIds);
      const concepts = Object.entries(content.concepts)
        .filter(([, c]) => mods.has(c.moduleId))
        .map(([id, c]) => ({ id, competency: c.competency }));
      const comps = competencyScores(concepts, mastery, track.competencies);
      // capstone share of readiness: Track 0 simulation runs, or the best exam of the track's capstone module
      const caps = track.capstone ? bestScores(d, track.capstone.kind) : new Map<string, number>();
      const capVals = track.capstone?.ref ? [caps.get(track.capstone.ref)].filter((v): v is number => v !== undefined) : [...caps.values()];
      const capBest = capVals.length ? Math.max(...capVals) : null;
      const lessons = content.lessons.filter((l) => l.track === track.id);
      const status = (id: string) => d.lessons.get(id)?.status;
      return {
        track,
        readiness: readinessScore(comps, capBest),
        comps,
        lessonsDone: lessons.filter((l) => status(l.id) === "completed").length,
        lessonsTotal: lessons.length,
        next: lessons.find((l) => status(l.id) === "started") ?? lessons.find((l) => status(l.id) !== "completed"),
        started: lessons.some((l) => status(l.id)),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, content]);
}

function Ring({ value, size = "h-20 w-20" }: { value: number; size?: string }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" className={`${size} shrink-0 -rotate-90`} aria-hidden>
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="10" />
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--accent)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${c * value} ${c}`} />
      <text x="50" y="50" textAnchor="middle" dominantBaseline="central" className="rotate-90 fill-[var(--text)] text-[24px] font-semibold" style={{ transformOrigin: "50px 50px" }}>
        {Math.round(value * 100)}
      </text>
    </svg>
  );
}

/** Readiness ring and competency bars for one track (track pages). */
export function TrackReadiness({ trackId }: { trackId: string }) {
  const stats = useTrackStats();
  const { t } = useT();
  const s = stats?.find((x) => x.track.id === trackId);
  if (!s) return <Card className="mb-6 h-32 animate-pulse">{null}</Card>;
  if (!s.lessonsTotal) return null;
  const band = readinessBand(s.readiness);
  return (
    <Card className="mb-6">
      <div className="grid gap-5 md:grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex items-center gap-4">
          <Ring value={s.readiness / 100} />
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">{t(s.track.readinessLabel)}</div>
            <div className="text-lg font-semibold">{t(band.label)}</div>
            <div className="text-sm text-muted">
              {t("{c} of {n} lessons completed", { c: s.lessonsDone, n: s.lessonsTotal })}
            </div>
          </div>
        </div>
        <div className="min-w-0 space-y-1.5">
          {s.comps
            .filter((c) => c.total > 0)
            .sort((a, b) => b.weight - a.weight)
            .map((c) => (
              <div key={c.id} className="grid grid-cols-[minmax(0,1fr)_100px_32px] items-center gap-2 text-sm sm:grid-cols-[minmax(0,1fr)_160px_32px]">
                <span className="truncate">{t(c.label)}</span>
                <ProgressBar value={c.mastery} tone={c.mastery >= 0.8 ? "ok" : c.mastery >= 0.4 ? "sun" : "accent"} />
                <span className="text-end tabular-nums text-muted">{Math.round(c.mastery * 100)}</span>
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
}

/** Compact card per track: readiness, progress and next lesson (hub and dashboard). */
export function TrackCards({ compact = false }: { compact?: boolean }) {
  const stats = useTrackStats();
  const { t, href } = useT();
  if (!stats) return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <Card key={i} className="h-36 animate-pulse">{null}</Card>)}</div>;
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${compact ? "xl:grid-cols-3" : "lg:grid-cols-3"}`}>
      {stats.map((s) => (
        <Link key={s.track.id} href={href(`/tracks/${s.track.id}`)} className="block min-w-0 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/60">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
              <Icon name={s.track.icon} className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-muted">{t("Track {n}", { n: s.track.number })}</div>
              <div className="font-semibold leading-snug">{s.track.title}</div>
            </div>
            {s.lessonsTotal > 0 && <Ring value={s.readiness / 100} size="h-12 w-12" />}
          </div>
          {s.lessonsTotal > 0 ? (
            <div className="mt-3 space-y-1.5 text-xs text-muted">
              <div className="flex items-center gap-2">
                <ProgressBar value={s.lessonsDone / s.lessonsTotal} />
                <span className="shrink-0 tabular-nums">
                  {s.lessonsDone}/{s.lessonsTotal}
                </span>
              </div>
              {s.next && <div className="truncate">{t("Next")}: {s.next.title}</div>}
            </div>
          ) : (
            <p className="mt-3 text-xs text-muted">{s.track.phase ? t("Being built (phase {n})", { n: s.track.phase }) : t("Coming soon")}</p>
          )}
        </Link>
      ))}
    </div>
  );
}
