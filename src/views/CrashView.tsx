import Link from "next/link";
import { notFound } from "next/navigation";
import { KEY_CONCEPTS } from "@/content/key";
import { CHECK_QUESTIONS, CRASH_TERMS, EXAM_MIN, EXAM_QUESTIONS, PLAYBOOK, SPRINT_BLOCKS } from "@/content/crash";
import { getLesson, getModule, getScenario, getTrack, index } from "@/lib/content";
import { back, fwd, lp, t, type Lang } from "@/lib/i18n";
import { Markdown } from "@/components/Markdown";
import { CheckClient, CrashExamClient, SprintPlan, type BlockDto } from "@/components/crash/CrashClient";
import { Card, PageHeader } from "@/components/ui";
import { KeyBoard, type KeyDto } from "@/components/crash/KeyBoard";

function blocks(lang: Lang): BlockDto[] {
  return SPRINT_BLOCKS.map((b) => {
    const m = getModule(b.module, lang)!;
    const s = b.scenario ? getScenario(b.scenario[0], lang) : undefined;
    return {
      module: b.module,
      number: m.number,
      title: m.title,
      sheetMin: b.sheetMin,
      concepts: (KEY_CONCEPTS[b.module]?.[lang] ?? []).map((k) => ({ id: k.id, tier: k.tier })),
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
        <p className="mb-1 font-medium">{t(lang, "Every morning")}</p>
        <ul className="mb-3 list-disc space-y-1 ps-5">
          <li>{t(lang, "Daily review first (15 min): it brings back yesterday's concepts and lessons just before you forget them.")}</li>
          <li>{t(lang, "Then self-test yesterday's concepts with “Hide the ones I can explain” on.")}</li>
        </ul>
        <p className="mb-1 font-medium">{t(lang, "Every module — the steps are listed in this order below")}</p>
        <ol className="mb-3 list-decimal space-y-1 ps-5">
          <li>{t(lang, "📄 Cheat sheet: skim it for the big picture. Don't memorize yet.")}</li>
          <li>{t(lang, "🧠 Must-know concepts: read each card and say “Say it like this” out loud once.")}</li>
          <li>{t(lang, "📘 Lessons: read properly, do the worked examples and finish the lesson quiz. Core lessons first.")}</li>
          <li>{t(lang, "🎯 Scenario: make the decisions, read the feedback.")}</li>
          <li>{t(lang, "🗣️ Self-test the concepts: say each one out loud before you reveal. Be honest.")}</li>
          <li>{t(lang, "✅ Retrieval check: 8 questions, no notes. Misses go to your error log.")}</li>
          <li>{t(lang, "✍️ Writing task: keep it — it is material for the trial week.")}</li>
        </ol>
        <p className="mb-1 font-medium">{t(lang, "Running behind?")}</p>
        <ul className="list-disc space-y-1 ps-5">
          <li>{t(lang, "Never skip the cheat sheet, the concepts and the check — they are what covers all 16 modules. Then Core lessons. Drop extra lessons, scenarios and writing first.")}</li>
          <li>{t(lang, "Under 6/8 on a check? Re-read the cheat-sheet sections behind your misses before moving on.")}</li>
          <li>{t(lang, "Last day: do the self-test once more in Arabic (عربي toggle) so you can explain every concept in both languages.")}</li>
        </ul>
      </Card>

      <Link href={lp(lang, "/crash/concepts")} className="mb-6 flex items-center gap-3 rounded-xl border border-danger/40 bg-danger-soft/30 px-4 py-3 hover:bg-danger-soft/50">
        <span className="text-2xl" aria-hidden>
          🧠
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">{t(lang, "Must-know concepts")}</span>
          <span className="block text-sm text-muted">{t(lang, "What to memorize and be able to explain on the spot — with a self-test that feeds your daily review.")}</span>
        </span>
        <span className="text-accent">{fwd(lang)}</span>
      </Link>

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

/** Must-know concepts for the given language, in sprint (job-relevance) order. */
/** Must-know concepts in a track's study order (Track 0: sprint order). */
export function keyDtos(lang: Lang, trackId: string = "mewre"): KeyDto[] {
  const order = trackId === "mewre" ? SPRINT_BLOCKS.map((b) => b.module) : getTrack(trackId)!.studyOrder;
  return order.flatMap((id) => {
    const m = getModule(id, lang)!;
    return (KEY_CONCEPTS[id]?.[lang] ?? []).map((k) => ({
      ...k,
      module: m.id,
      moduleNumber: m.number,
      moduleTitle: m.title,
      lessonTitle: getLesson(k.lesson, lang)?.lesson.title ?? "",
    }));
  });
}

export function KeyConceptsView({ lang }: { lang: Lang }) {
  const concepts = keyDtos(lang);
  return (
    <div className="mx-auto max-w-3xl">
      <Back lang={lang} />
      <PageHeader
        title={t(lang, "Must-know concepts")}
        subtitle={t(lang, "{n} concepts you should be able to explain on the spot if a colleague asks — each with the one sentence to memorize, how to say it, a picture to remember it by, why it matters and the classic mix-up.", { n: concepts.length })}
      />
      <KeyBoard concepts={concepts} />
    </div>
  );
}

/** Must-know concepts of a non-MEWRE track: /tracks/[id]/concepts. */
export function TrackConceptsView({ trackId }: { trackId: string }) {
  const track = getTrack(trackId)!;
  const concepts = keyDtos("en", trackId);
  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 text-sm text-muted">
        <Link href={`/tracks/${track.id}`} className="hover:text-text">
          {track.short}
        </Link>
      </nav>
      <PageHeader
        title={`Must-know concepts · ${track.short}`}
        subtitle={`${concepts.length} concepts to explain on the spot: the sentence to memorize, how to say it, a picture to remember it by, why it matters and the classic mix-up.`}
      />
      {concepts.length ? <KeyBoard concepts={concepts} /> : <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted">Concepts arrive with the track&apos;s modules.</div>}
    </div>
  );
}
