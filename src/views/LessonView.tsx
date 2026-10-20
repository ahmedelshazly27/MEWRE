import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, isTranslated, lessonNeighbours } from "@/lib/content";
import { back, fwd, lp, t, type Lang } from "@/lib/i18n";
import { ConceptBadge, LessonMeta } from "@/components/progress";
import { BlockRenderer } from "@/components/lesson/BlockRenderer";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { CompleteButton, LessonTimer, NotesPanel } from "@/components/lesson/LessonClient";
import { TutorDrawer } from "@/components/lesson/TutorDrawer";
import { Markdown } from "@/components/Markdown";
import { Card, LAYER_META, Pill } from "@/components/ui";
import { UntranslatedNote } from "./UntranslatedNote";

export function lessonTitle(lessonId: string, lang: Lang) {
  return getLesson(lessonId, lang)?.lesson.title ?? t(lang, "Lesson");
}

export function LessonView({ moduleId, lessonId, lang }: { moduleId: string; lessonId: string; lang: Lang }) {
  const ref = getLesson(lessonId, lang);
  if (!ref || ref.module.id !== moduleId) notFound();
  const { module, lesson } = ref;
  const { prev, next } = lessonNeighbours(lesson.id, lang);
  const L = (p: string) => lp(lang, p);

  return (
    <article className="mx-auto max-w-3xl">
      <LessonTimer lessonId={lesson.id} />
      <nav className="no-print mb-4 text-sm text-muted">
        <Link href={L("/learn")} className="hover:text-text">
          {t(lang, "Curriculum")}
        </Link>{" "}
        /{" "}
        <Link href={L(`/learn/${module.id}`)} className="hover:text-text">
          M{module.number} {module.title}
        </Link>
      </nav>
      {lang === "ar" && !isTranslated(module.id) && <UntranslatedNote />}
      <header className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted">
          <Pill tone="accent">{t(lang, "Lesson {n} of {total}", { n: ref.index + 1, total: module.lessons.length })}</Pill>
          <span>{t(lang, "{n} min", { n: lesson.minutes })}</span>
          <LessonMeta lessonId={lesson.id} />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{lesson.title}</h1>
        <p className="mt-2 text-lg text-muted">{lesson.summary}</p>
      </header>

      <Card className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">{t(lang, "By the end you can")}</div>
        <ul className="mt-2 space-y-1">
          {lesson.objectives.map((o, i) => (
            <li key={i} className="flex gap-2 text-[0.95rem]">
              <span className="text-accent">{fwd(lang)}</span>
              <span>{o.replace(/^you can\s+/i, "").replace(/^./, (c) => c.toUpperCase())}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {lesson.concepts.map((c) => (
            <span key={c.id} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2 py-1 text-xs" title={c.description}>
              {c.name}
              <ConceptBadge conceptId={c.id} />
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {lesson.sections.map((s, i) => (
            <a key={i} href={`#s${i}`} className="rounded-md bg-surface-2 px-2 py-1 hover:text-accent">
              <span className="font-semibold">{t(lang, LAYER_META[s.layer].label)}:</span> {s.title}
            </a>
          ))}
          <a href="#quiz" className="rounded-md bg-surface-2 px-2 py-1 hover:text-accent">
            <span className="font-semibold">{t(lang, "Quiz")}</span>
          </a>
        </div>
      </Card>

      {lesson.sections.map((s, si) => (
        <section key={si} id={`s${si}`} className="mb-10 scroll-mt-20">
          <div className="mb-2 flex items-center gap-2">
            <Pill tone={LAYER_META[s.layer].tone}>{t(lang, LAYER_META[s.layer].label)}</Pill>
            <span className="text-xs text-muted">{t(lang, LAYER_META[s.layer].hint)}</span>
          </div>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">{s.title}</h2>
          {s.blocks.map((b, bi) => (
            <BlockRenderer key={bi} block={b} lesson={lesson} blockKey={`s${si}b${bi}`} lang={lang} />
          ))}
        </section>
      ))}

      <section id="quiz" className="mb-10 scroll-mt-20">
        <div className="mb-2 flex items-center gap-2">
          <Pill tone="ok">{t(lang, "Retrieval practice")}</Pill>
          <span className="text-xs text-muted">{t(lang, "Answer from memory — that is what makes it stick")}</span>
        </div>
        <h2 className="mb-3 text-2xl font-semibold tracking-tight">{t(lang, "Lesson quiz")}</h2>
        <QuizRunner questions={lesson.quiz} source="quiz" kind="quiz" refId={lesson.id} title={t(lang, "{title} — quiz", { title: lesson.title })} completeLessonId={lesson.id} />
        <div className="mt-3">
          <CompleteButton lessonId={lesson.id} />
        </div>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        <Card>
          <div className="mb-2 font-semibold">{t(lang, "Flashcards from this lesson")}</div>
          <p className="mb-2 text-sm text-muted">{t(lang, "Unlocked into your daily review when you complete the lesson (finish the quiz).")}</p>
          <ul className="space-y-1.5 text-sm">
            {lesson.flashcards.slice(0, 6).map((f) => (
              <li key={f.id} className="rounded-md bg-surface-2 px-2 py-1">
                <Markdown className="prose-compact [&_p]:my-0">{f.front}</Markdown>
              </li>
            ))}
            {lesson.flashcards.length > 6 && <li className="text-xs text-muted">{t(lang, "+{n} more", { n: lesson.flashcards.length - 6 })}</li>}
          </ul>
        </Card>
        <Card>
          <div className="mb-2 font-semibold">{t(lang, "My notes")}</div>
          <NotesPanel lessonId={lesson.id} />
        </Card>
      </section>

      <nav className="no-print flex items-center justify-between gap-3 border-t border-border pt-5 text-sm">
        {prev ? (
          <Link href={L(`/learn/${module.id}/${prev.lesson.id}`)} className="text-muted hover:text-text">
            {back(lang)} {prev.lesson.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={L(`/learn/${module.id}/${next.lesson.id}`)} className="text-end font-medium text-accent">
            {next.lesson.title} {fwd(lang)}
          </Link>
        ) : (
          <Link href={L(`/learn/${module.id}/exam`)} className="font-medium text-accent">
            {t(lang, "Module exam")} {fwd(lang)}
          </Link>
        )}
      </nav>
      <TutorDrawer lessonId={lesson.id} lessonTitle={lesson.title} />
    </article>
  );
}
