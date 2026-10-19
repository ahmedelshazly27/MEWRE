import Link from "next/link";
import { allConcepts, getConcept, lessonsInOrder, liveModules } from "@/lib/content";
import { activity, bestScores, getSettings, lessonProgressMap, listErrors, listRuns, localDay, masteryMap, reviewForecast, reviewQueue, secondsThisWeek, streak, totals } from "@/server/repo";
import { competencyScores, readinessBand, readinessScore } from "@/lib/readiness";
import { Button, Card, EmptyState, MasteryBadge, Pill, ProgressBar, Stat, fmtDuration } from "@/components/ui";

export default function Dashboard() {
  const settings = getSettings();
  const progress = lessonProgressMap();
  const mastery = masteryMap();
  const concepts = allConcepts();
  const comps = competencyScores(
    concepts.map((c) => ({ id: c.concept.id, competency: c.concept.competency })),
    mastery,
  );
  const capstone = bestScores("sim");
  const capBest = capstone.size ? Math.max(...capstone.values()) : null;
  const readiness = readinessScore(comps, capBest);
  const band = readinessBand(readiness);
  const st = streak();
  const t = totals();
  const weekSecs = secondsThisWeek();
  const weekTarget = settings.weeklyHours * 3600;
  const q = reviewQueue();
  const errors = listErrors();
  const forecast = reviewForecast(7);
  const diag = listRuns("diagnostic", undefined, 1)[0];

  const ordered = lessonsInOrder();
  const totalLessons = ordered.length;
  const completed = ordered.filter((r) => progress.get(r.lesson.id)?.status === "completed").length;
  const inProgress = ordered.find((r) => progress.get(r.lesson.id)?.status === "started");
  const nextUp = inProgress ?? ordered.find((r) => progress.get(r.lesson.id)?.status !== "completed");

  const weak = [...mastery.entries()]
    .filter(([id, m]) => m.mastery < 0.5 && getConcept(id) && !getConcept(id)!.module.draft)
    .sort((a, b) => a[1].mastery - b[1].mastery)
    .slice(0, 6)
    .map(([id, m]) => ({ ...getConcept(id)!, m }));

  // Plan pacing
  const start = new Date(settings.startDate + "T00:00:00");
  const weeksElapsed = Math.max(0, (Date.now() - start.getTime()) / (7 * 86_400_000));
  const expected = Math.min(1, weeksElapsed / Math.max(1, settings.weeks));
  const actual = totalLessons ? completed / totalLessons : 0;

  // Heatmap: last 12 weeks
  const act = new Map(activity(120).map((a) => [a.day, a]));
  const days: { day: string; secs: number; n: number }[] = [];
  for (let i = 83; i >= 0; i--) {
    const d = localDay(Date.now() - i * 86_400_000);
    const a = act.get(d);
    days.push({ day: d, secs: a?.seconds ?? 0, n: (a?.answers ?? 0) + (a?.reviews ?? 0) });
  }
  const heat = (d: { secs: number; n: number }) => {
    const v = d.secs / 60 + d.n;
    return v === 0 ? "bg-surface-2" : v < 15 ? "bg-accent/25" : v < 40 ? "bg-accent/50" : v < 90 ? "bg-accent/75" : "bg-accent";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{settings.name ? `Welcome back, ${settings.name}` : "Your path to MEWRE PM"}</h1>
          <p className="mt-1 text-muted">Shagaya, Al Dibdibah and the utility-scale pipeline — learn it like you will run it.</p>
        </div>
        {nextUp && <Button href={`/learn/${nextUp.module.id}/${nextUp.lesson.id}`}>{inProgress ? "Resume lesson" : "Start next lesson"} →</Button>}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <Card>
          <div className="flex items-center gap-5">
            <Ring value={readiness / 100} />
            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">Job readiness</div>
              <div className="text-xl font-semibold">{band.label}</div>
              <p className="text-sm text-muted">{band.note}</p>
              <p className="mt-1 text-xs text-muted">85% job-weighted concept mastery · 15% capstone{capBest !== null ? ` (best ${Math.round(capBest * 100)}%)` : ""}</p>
            </div>
          </div>
          <div className="mt-5 space-y-2">
            {comps
              .filter((c) => c.total > 0)
              .sort((a, b) => b.weight - a.weight)
              .map((c) => (
                <div key={c.id} className="grid grid-cols-[minmax(0,1fr)_110px_38px] items-center gap-2 text-sm sm:grid-cols-[minmax(0,1fr)_160px_38px]">
                  <span className="truncate" title={`${c.assessed}/${c.total} concepts assessed · weight ${c.weight}`}>
                    {c.label}
                  </span>
                  <ProgressBar value={c.mastery} tone={c.mastery >= 0.8 ? "ok" : c.mastery >= 0.4 ? "sun" : "accent"} />
                  <span className="text-right tabular-nums text-muted">{Math.round(c.mastery * 100)}</span>
                </div>
              ))}
            {comps.every((c) => c.total === 0) && <div className="text-sm text-muted">Competencies appear as modules are published.</div>}
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3 self-start">
          <Stat label="Streak" value={`${st.current} d`} hint={`Longest ${st.longest} d`} />
          <Stat label="This week" value={fmtDuration(weekSecs)} hint={`Target ${settings.weeklyHours} h`} />
          <Link href="/review" className="contents">
            <Stat label="Reviews due" value={q.due.length + q.fresh.length} hint={`${q.due.length} due · ${q.fresh.length} new`} />
          </Link>
          <Link href="/errors" className="contents">
            <Stat label="Error log" value={errors.length} hint="open mistakes" />
          </Link>
          <Stat label="Lessons" value={`${completed}/${totalLessons}`} hint={`${liveModules().length} modules live`} />
          <Stat label="Total study" value={fmtDuration(t.seconds)} hint={`${t.attempts} answers · ${Math.round(t.avgScore * 100)}% avg`} />
          <div className="col-span-2">
            <Card>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Weekly target</span>
                <span className="tabular-nums text-muted">{Math.round((weekSecs / Math.max(1, weekTarget)) * 100)}%</span>
              </div>
              <ProgressBar value={weekSecs / Math.max(1, weekTarget)} className="mt-2" />
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-medium">Plan pace</span>
                <span className="text-muted">
                  {Math.round(actual * 100)}% done vs {Math.round(expected * 100)}% expected (week {Math.min(settings.weeks, Math.floor(weeksElapsed) + 1)}/{settings.weeks})
                </span>
              </div>
              <div className="relative mt-2">
                <ProgressBar value={actual} tone="ok" />
                <div className="absolute top-[-3px] h-3.5 w-0.5 bg-text/60" style={{ left: `${expected * 100}%` }} />
              </div>
            </Card>
          </div>
        </div>
      </div>

      {!diag && (
        <Card className="border-sun/40 bg-sun-soft/30">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-semibold">Set your baseline</div>
              <p className="text-sm text-muted">A short diagnostic across all modules seeds your mastery map so recommendations target real gaps.</p>
            </div>
            <Button href="/diagnostic">Take the diagnostic</Button>
          </div>
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-semibold">Recommended next</div>
            <Link href="/learn" className="text-sm text-accent">
              Curriculum →
            </Link>
          </div>
          {nextUp ? (
            <Link href={`/learn/${nextUp.module.id}/${nextUp.lesson.id}`} className="block rounded-lg border border-border p-3 hover:bg-surface-2">
              <div className="text-xs text-muted">
                M{nextUp.module.number} · {nextUp.module.title} · lesson {nextUp.index + 1}
              </div>
              <div className="font-medium">{nextUp.lesson.title}</div>
              <div className="text-sm text-muted">{nextUp.lesson.summary}</div>
            </Link>
          ) : (
            <EmptyState title="All available lessons complete">Run mixed exams and the capstone to consolidate.</EmptyState>
          )}
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <QuickLink href="/review" title="Daily review" note={`${q.due.length + q.fresh.length} cards`} />
            <QuickLink href="/practice?mode=mixed" title="Mixed practice" note="interleaved, weak-first" />
            <QuickLink href="/scenarios" title="Day in the life" note="PM decisions" />
          </div>
          {weak.length > 0 && (
            <div className="mt-5">
              <div className="mb-2 text-sm font-semibold">Weak areas to revisit</div>
              <ul className="space-y-1.5">
                {weak.map((w) => (
                  <li key={w.concept.id} className="flex items-center justify-between gap-2 text-sm">
                    <Link href={`/learn/${w.module.id}/${w.lesson.id}`} className="min-w-0 truncate hover:text-accent">
                      {w.concept.name} <span className="text-muted">· M{w.module.number}</span>
                    </Link>
                    <MasteryBadge mastery={w.m.mastery} evidence={w.m.evidence} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
        <Card>
          <div className="mb-3 font-semibold">Activity (12 weeks)</div>
          <div className="grid grid-flow-col grid-rows-7 gap-[3px]" style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}>
            {days.map((d) => (
              <div key={d.day} className={`aspect-square rounded-[3px] ${heat(d)}`} title={`${d.day}: ${Math.round(d.secs / 60)} min, ${d.n} answers/reviews`} />
            ))}
          </div>
          <div className="mt-5 mb-2 text-sm font-semibold">Upcoming reviews</div>
          <div className="flex items-end gap-1.5">
            {forecast.map((n, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] tabular-nums text-muted">{n}</span>
                <div className="w-full rounded-sm bg-sun/70" style={{ height: `${4 + (n / Math.max(1, ...forecast)) * 48}px` }} />
                <span className="text-[10px] text-muted">{i === 0 ? "Today" : `+${i}d`}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5 text-xs">
            <Pill>{q.unlockedTotal} cards unlocked</Pill>
            <Pill>{concepts.length} concepts</Pill>
          </div>
        </Card>
      </div>
    </div>
  );
}

function QuickLink({ href, title, note }: { href: string; title: string; note: string }) {
  return (
    <Link href={href} className="rounded-lg border border-border p-3 text-sm hover:bg-surface-2">
      <div className="font-medium">{title}</div>
      <div className="text-xs text-muted">{note}</div>
    </Link>
  );
}

function Ring({ value }: { value: number }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28 shrink-0 -rotate-90">
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="10" />
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--accent)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${c * value} ${c}`} />
      <text x="50" y="50" textAnchor="middle" dominantBaseline="central" className="rotate-90 fill-[var(--text)] text-[22px] font-semibold" style={{ transformOrigin: "50px 50px" }}>
        {Math.round(value * 100)}
      </text>
    </svg>
  );
}
