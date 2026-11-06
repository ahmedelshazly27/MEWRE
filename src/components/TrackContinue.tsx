"use client";

import Link from "next/link";
import { useTrackStats } from "@/components/tracks";

/** "Start" / "Continue" button to the next lesson of a track. */
export function TrackContinue({ trackId }: { trackId: string }) {
  const s = useTrackStats()?.find((x) => x.track.id === trackId);
  const next = s?.next;
  if (!next) return null;
  return (
    <Link href={`/learn/${next.moduleId}/${next.id}`} className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 dark:text-black">
      {s.started ? "Continue" : "Start"} →
    </Link>
  );
}
