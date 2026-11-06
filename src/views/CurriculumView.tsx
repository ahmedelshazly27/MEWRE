import Link from "next/link";
import { getTrack, STUDY_ORDER, trackModules, type Track } from "@/lib/content";
import { lp, t, type Lang } from "@/lib/i18n";
import { BestScore, ModuleProgress } from "@/components/progress";
import { PageHeader, Pill } from "@/components/ui";
import { TrackReadiness } from "@/components/tracks";

/** Module grid of one track. */
export function ModuleGrid({ track, lang }: { track: Track; lang: Lang }) {
  const ordered = trackModules(track, lang);
  if (!ordered.length)
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted">
        {track.phase ? `This track's modules are being written (build phase ${track.phase}).` : "No modules yet."}
      </div>
    );
  const step = (id: string) => (track.id === "mewre" ? STUDY_ORDER.indexOf(id) + 1 : track.studyOrder.indexOf(id) + 1);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[...ordered]
        .sort((a, b) => a.number - b.number)
        .map((m) => {
          const total = m.lessons.length;
          const live = !m.draft && total > 0;
          const inner = (
            <div className={`h-full rounded-xl border border-border bg-surface p-4 transition-colors ${live ? "hover:border-accent/60" : "opacity-60"}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-medium text-muted">{t(lang, "Module {n} · Step {s}", { n: m.number, s: step(m.id) })}</div>
                  <div className="mt-0.5 font-semibold">{m.title}</div>
                  {lang === "en" && track.arabic && (
                    <div className="text-sm text-muted" dir="rtl">
                      {m.titleAr}
                    </div>
                  )}
                </div>
                {live ? <Pill>{t(lang, "{n} lessons", { n: total })}</Pill> : <Pill>{t(lang, "In preparation")}</Pill>}
              </div>
              {live && (
                <>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{m.summary}</p>
                  <ModuleProgress lessonIds={m.lessons.map((l) => l.id)} conceptIds={m.lessons.flatMap((l) => l.concepts.map((c) => c.id))} />
                  <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                    {m.competencies.map((c) => (
                      <Pill key={c}>{t(lang, track.competencies[c]?.label ?? c)}</Pill>
                    ))}
                    <Pill>{t(lang, "~{n} h", { n: m.estimatedHours })}</Pill>
                    <BestScore kind="exam" refId={m.id} label={t(lang, "Exam best")} />
                  </div>
                </>
              )}
            </div>
          );
          return live ? (
            <Link key={m.id} href={lp(lang, `/learn/${m.id}`)}>
              {inner}
            </Link>
          ) : (
            <div key={m.id}>{inner}</div>
          );
        })}
    </div>
  );
}

/** Track 0 curriculum (also the Arabic /ar/learn page). */
export function CurriculumView({ lang }: { lang: Lang }) {
  const track = getTrack("mewre")!;
  return (
    <div>
      <PageHeader
        title={t(lang, "Curriculum")}
        subtitle={t(lang, "Sixteen modules, each with theory, applied worked examples using Kuwait numbers, and field practice. Recommended order follows job relevance (shown as Step N).")}
      />
      <TrackReadiness trackId="mewre" />
      <ModuleGrid track={track} lang={lang} />
    </div>
  );
}
