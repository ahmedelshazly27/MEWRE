import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrack, trackModules } from "@/lib/content";
import { Button, PageHeader } from "@/components/ui";
import { TrackReadiness } from "@/components/tracks";
import { TrackContinue } from "@/components/TrackContinue";
import { ModuleGrid } from "./CurriculumView";

export function TrackView({ trackId }: { trackId: string }) {
  const track = getTrack(trackId);
  if (!track) notFound();
  const mods = trackModules(track);
  const hours = mods.reduce((s, m) => s + (m.lessons.length ? m.estimatedHours : 0), 0);
  const lessons = mods.reduce((s, m) => s + m.lessons.length, 0);
  return (
    <div>
      <nav className="mb-4 text-sm text-muted">
        <Link href="/learn" className="hover:text-text">
          All tracks
        </Link>
      </nav>
      <PageHeader title={`Track ${track.number} · ${track.title}`} subtitle={track.tagline}>
        {lessons > 0 && (
          <div className="flex flex-wrap gap-2">
            <TrackContinue trackId={track.id} />
            <Button href={`/diagnostic?track=${track.id}`} variant="ghost">
              Diagnostic
            </Button>
            <Button href={`/practice?track=${track.id}`} variant="ghost">
              Practice
            </Button>
          </div>
        )}
      </PageHeader>
      {lessons > 0 && (
        <p className="-mt-3 mb-5 text-sm text-muted">
          {mods.filter((m) => m.lessons.length).length} modules · {lessons} lessons · about {hours} hours
        </p>
      )}
      {track.id === "mewre" && (
        <div className="mb-6 flex flex-wrap gap-2 text-sm">
          <Link href="/crash" className="rounded-lg border border-accent/50 bg-accent-soft/40 px-3 py-1.5 font-medium text-accent hover:bg-accent-soft">
            ⚡ Trial-week sprint
          </Link>
          <Link href="/crash/concepts" className="rounded-lg border border-border px-3 py-1.5 hover:bg-surface-2">
            🧠 Must-know concepts
          </Link>
          <Link href="/capstone" className="rounded-lg border border-border px-3 py-1.5 hover:bg-surface-2">
            🏁 Capstone simulation
          </Link>
          <Link href="/ar/learn" className="rounded-lg border border-border px-3 py-1.5 hover:bg-surface-2" lang="ar">
            النسخة العربية
          </Link>
        </div>
      )}
      <TrackReadiness trackId={track.id} />
      <ModuleGrid track={track} lang="en" />
    </div>
  );
}
