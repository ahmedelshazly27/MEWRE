import Link from "next/link";
import { CRASH_DAYS, CRASH_TERMS, PLAYBOOK } from "@/content/crash";
import { getLesson, getModule, getScenario, index } from "@/lib/content";
import { fwd, lp, t, type Lang } from "@/lib/i18n";
import { Markdown } from "@/components/Markdown";
import { CrashExamClient, CrashHeader, DayBadge, LessonCheck, OutputTick } from "@/components/crash/CrashClient";
import { BestScore } from "@/components/progress";
import { Card, PageHeader, Pill } from "@/components/ui";

export function CrashView({ lang }: { lang: Lang }) {
  const L = (p: string) => lp(lang, p);
  const glossary = new Map(index(lang).glossary.map((g) => [g.id, g]));
  const terms = CRASH_TERMS.map((id) => glossary.get(id)).filter((g) => !!g);
  const totalMin = CRASH_DAYS.reduce((s, d) => s + d.lessons.reduce((a, id) => a + (getLesson(id, lang)?.lesson.minutes ?? 0), 0), 0);

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title={t(lang, "Two-week crash course")}
        subtitle={t(lang, "The shortest path to walking into the MEWRE trial week prepared: {n} high-yield lessons in 14 days (about {h} hours), a written output each day, and a playbook for the week itself.", {
          n: CRASH_DAYS.reduce((s, d) => s + d.lessons.length, 0),
          h: Math.round(totalMin / 60),
        })}
      />
      <CrashHeader days={CRASH_DAYS.map((d) => ({ day: d.day, lessons: d.lessons }))} />

      <Card className="mb-8 border-accent/40 bg-accent-soft/30 text-sm">
        <div className="mb-1 font-semibold">{t(lang, "How to use it")}</div>
        <ul className="list-disc space-y-1 ps-5">
          <li>{t(lang, "Every day: 15 minutes of daily review first, then the lessons, then the scenario, then the written output.")}</li>
          <li>{t(lang, "Short on time? Do the first lesson and the output; skim the rest of the day's cheat sheet.")}</li>
          <li>{t(lang, "Keep every output: together they are the material you bring to the trial week.")}</li>
        </ul>
      </Card>

      <ol className="space-y-4">
        {CRASH_DAYS.map((d) => {
          const minutes = d.lessons.reduce((a, id) => a + (getLesson(id, lang)?.lesson.minutes ?? 0), 0);
          const scen = d.scenario ? getScenario(d.scenario, lang) : undefined;
          return (
            <li key={d.day} id={`day-${d.day}`} className="scroll-mt-20 rounded-xl border border-border bg-surface p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="accent">{t(lang, "Day {n}", { n: d.day })}</Pill>
                {minutes > 0 && <span className="text-xs text-muted">{t(lang, "~{n} min of lessons", { n: minutes })}</span>}
                <span className="ms-auto">
                  <DayBadge lessons={d.lessons} />
                </span>
              </div>
              <h2 className="mt-2 text-lg font-semibold">{d.title[lang]}</h2>
              <p className="mt-1 text-sm text-muted">{d.why[lang]}</p>

              {d.lessons.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {d.lessons.map((id) => {
                    const r = getLesson(id, lang)!;
                    return (
                      <li key={id}>
                        <Link href={L(`/learn/${r.module.id}/${id}`)} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-surface-2">
                          <LessonCheck lessonId={id} />
                          <span className="min-w-0 flex-1">
                            <span className="text-xs text-muted">M{r.module.number} · </span>
                            {r.lesson.title}
                          </span>
                          <span className="shrink-0 text-xs text-muted">{t(lang, "{n} min", { n: r.lesson.minutes })}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {scen && (
                  <Link href={L(`/scenarios/${scen.scenario.id}`)} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 hover:bg-surface-2">
                    🎯 {scen.scenario.title}
                    <BestScore kind="scenario" refId={scen.scenario.id} label="" />
                  </Link>
                )}
                {(d.skim ?? []).map((m) => (
                  <Link key={m} href={L(`/print/${m}`)} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 hover:bg-surface-2">
                    📄 {t(lang, "Cheat sheet")}: M{getModule(m, lang)?.number} {getModule(m, lang)?.title}
                  </Link>
                ))}
                {d.day === 14 && (
                  <Link href={L("/crash/exam")} className="inline-flex items-center gap-1.5 rounded-lg border border-accent bg-accent-soft px-2.5 py-1 font-medium text-accent">
                    📝 {t(lang, "Crash exam")}
                  </Link>
                )}
              </div>

              <div className="mt-3 rounded-lg bg-surface-2 px-3 py-2.5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">{t(lang, "Today's output")}</div>
                <p className="mt-0.5 text-sm">{d.output[lang]}</p>
                <OutputTick day={d.day} />
              </div>
            </li>
          );
        })}
      </ol>

      <section className="mt-10">
        <h2 className="mb-1 text-2xl font-semibold tracking-tight">{t(lang, "Trial-week playbook")}</h2>
        <p className="mb-4 text-muted">{t(lang, "Read it on day 14 and again the night before. Print it if that helps.")}</p>
        <div className="space-y-4">
          {PLAYBOOK.map((s) => (
            <Card key={s.id}>
              <h3 id={s.id} className="mb-1 text-lg font-semibold">
                {s.title[lang]}
              </h3>
              <Markdown className="prose-lesson prose-compact cheat-sheet">{s.md[lang]}</Markdown>
            </Card>
          ))}
          <Card>
            <h3 id="terms" className="mb-1 text-lg font-semibold">
              {t(lang, "Terms to use in Arabic")}
            </h3>
            <p className="mb-2 text-sm text-muted">{t(lang, "Using the right Arabic term in a meeting lands well. These are the ones you will hear most.")}</p>
            <div className="grid gap-x-6 sm:grid-cols-2">
              {terms.map((g) => (
                <div key={g!.id} className="flex items-baseline justify-between gap-3 border-b border-border py-1.5 text-sm">
                  <span dir="ltr" className="font-medium">
                    {g!.en}
                  </span>
                  <span dir="rtl" lang="ar" className="text-end">
                    {g!.ar}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <Link href={L("/crash/exam")} className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-medium text-white hover:opacity-90 dark:text-black">
          {t(lang, "Take the crash exam")} {fwd(lang)}
        </Link>
      </div>
    </div>
  );
}

export function CrashExamView({ lang }: { lang: Lang }) {
  const pool = CRASH_DAYS.flatMap((d) => d.lessons.flatMap((id) => getLesson(id, lang)?.lesson.quiz ?? []));
  const n = 25;
  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 text-sm text-muted">
        <Link href={lp(lang, "/crash")} className="hover:text-text">
          {t(lang, "Two-week crash course")}
        </Link>
      </nav>
      <PageHeader
        title={t(lang, "Crash exam")}
        subtitle={t(lang, "{n} questions drawn at random from every crash-course lesson, feedback at the end. Aim for 80% before the trial week. Time limit: {m} minutes.", { n, m: Math.round((n * 100) / 60) })}
      />
      <CrashExamClient pool={pool} n={n} title={t(lang, "Crash exam")} />
    </div>
  );
}

