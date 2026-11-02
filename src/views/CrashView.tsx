import Link from "next/link";
import { notFound } from "next/navigation";
import { CHECK_QUESTIONS, CRASH_TERMS, EXAM_MIN, EXAM_QUESTIONS, PLAYBOOK, SPRINT_BLOCKS } from "@/content/crash";
import { getLesson, getModule, getScenario, index } from "@/lib/content";
import { back, fwd, lp, t, type Lang } from "@/lib/i18n";
import { Markdown } from "@/components/Markdown";
import { CheckClient, CrashExamClient, SprintPlan, type BlockDto } from "@/components/crash/CrashClient";
import { Card, PageHeader } from "@/components/ui";

function blocks(lang: Lang): BlockDto[] {
  return SPRINT_BLOCKS.map((b) => {
    const m = getModule(b.module, lang)!;
    const s = b.scenario ? getScenario(b.scenario[0], lang) : undefined;
    return {
      module: b.module,
      number: m.number,
      title: m.title,
      sheetMin: b.sheetMin,
      lessons: b.lessons.map(([id, tier]) => {
        const l = getLesson(id, lang)!.lesson;
        return { id, tier, minutes: l.minutes, title: l.title };
      }),
      scenario: b.scenario && s ? { id: b.scenario[0], tier: b.scenario[1], title: s.scenario.title } : undefined,
      output: b.output ? { tier: b.output.tier, text: b.output.text[lang] } : undefined,
    };
  });
}

export function CrashView({ lang }: { lang: Lang }) {
  const glossary = new Map(index(lang).glossary.map((g) => [g.id, g]));
  const terms = CRASH_TERMS.map((id) => glossary.get(id)).filter((g) => !!g);

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title={t(lang, "Trial-week sprint")}
        subtitle={t(lang, "Cover all 16 modules in 3, 4 or 5 days: every cheat sheet with a retrieval check, the most job-critical lessons in full, written outputs to bring with you, and a playbook for the week itself.")}
      />

      <Card className="mb-6 border-accent/40 bg-accent-soft/30 text-sm">
        <div className="mb-1 font-semibold">{t(lang, "How to use it")}</div>
        <ul className="list-disc space-y-1 ps-5">
          <li>{t(lang, "Work through each module in order: cheat sheet, lessons, scenario, then the retrieval check. Misses go to your error log.")}</li>
          <li>{t(lang, "Start each morning with 15 minutes of daily review — it brings back yesterday's material.")}</li>
          <li>{t(lang, "Lessons marked Core come first. If a day runs long, finish the Core lessons and the checks and move on.")}</li>
          <li>{t(lang, "Keep every written output: together they are what you bring to the trial week.")}</li>
        </ul>
      </Card>

      <SprintPlan blocks={blocks(lang)} />

      <section className="mt-10" id="playbook">
        <h2 className="mb-1 text-2xl font-semibold tracking-tight">{t(lang, "Trial-week playbook")}</h2>
        <p className="mb-4 text-muted">{t(lang, "Read it on the last day and again the night before. Print it if that helps.")}</p>
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
        <Link href={lp(lang, "/crash/exam")} className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-medium text-white hover:opacity-90 dark:text-black">
          {t(lang, "Final exam across all modules")} {fwd(lang)}
        </Link>
      </div>
    </div>
  );
}

function Back({ lang }: { lang: Lang }) {
  return (
    <nav className="mb-4 text-sm text-muted">
      <Link href={lp(lang, "/crash")} className="hover:text-text">
        {back(lang)} {t(lang, "Trial-week sprint")}
      </Link>
    </nav>
  );
}

export function CrashExamView({ lang }: { lang: Lang }) {
  // module exam banks are integrative; fall back to lesson quizzes for modules with a small bank
  const groups = SPRINT_BLOCKS.map((b) => {
    const m = getModule(b.module, lang)!;
    return m.exam.length >= 4 ? m.exam : [...m.exam, ...m.lessons.flatMap((l) => l.quiz)];
  });
  return (
    <div className="mx-auto max-w-3xl">
      <Back lang={lang} />
      <PageHeader
        title={t(lang, "Final exam across all modules")}
        subtitle={t(lang, "{n} questions with at least one from every module, feedback at the end. Aim for 80% before the trial week. Time limit: {m} minutes.", { n: EXAM_QUESTIONS, m: EXAM_MIN })}
      />
      <CrashExamClient groups={groups} n={EXAM_QUESTIONS} title={t(lang, "Final exam across all modules")} />
    </div>
  );
}

export function CheckView({ moduleId, lang }: { moduleId: string; lang: Lang }) {
  const m = getModule(moduleId, lang);
  if (!m || !SPRINT_BLOCKS.some((b) => b.module === moduleId)) notFound();
  const pool = [...m.lessons.flatMap((l) => l.quiz), ...m.exam];
  const title = t(lang, "Retrieval check · M{n} {title}", { n: m.number, title: m.title });
  return (
    <div className="mx-auto max-w-3xl">
      <Back lang={lang} />
      <PageHeader title={title} subtitle={t(lang, "{n} random questions from the whole module, with feedback after each one. Read the cheat sheet first.", { n: CHECK_QUESTIONS })}>
        <Link href={lp(lang, `/print/${m.id}`)} className="text-sm text-accent">
          {t(lang, "Cheat sheet")} {fwd(lang)}
        </Link>
      </PageHeader>
      <CheckClient pool={pool} moduleId={m.id} title={title} />
    </div>
  );
}
