import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLesson, lessonNeighbours, liveModules } from "@/lib/content";
import { ConceptBadge, LessonMeta } from "@/components/progress";
import { BlockRenderer } from "@/components/lesson/BlockRenderer";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { CompleteButton, LessonTimer, NotesPanel } from "@/components/lesson/LessonClient";
import { TutorDrawer } from "@/components/lesson/TutorDrawer";
import { Markdown } from "@/components/Markdown";
import { Card, LAYER_META, Pill } from "@/components/ui";

type Params = { params: Promise<{ moduleId: string; lessonId: string }> };

export function generateStaticParams() {
  return liveModules().flatMap((m) => m.lessons.map((l) => ({ moduleId: m.id, lessonId: l.id })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lessonId } = await params;
  return { title: getLesson(lessonId)?.lesson.title ?? "Lesson" };
}

export default async function LessonPage({ params }: Params) {
  const { moduleId, lessonId } = await params;
  const ref = getLesson(lessonId);
  if (!ref || ref.module.id !== moduleId) notFound();
  const { module, lesson } = ref;
  const { prev, next } = lessonNeighbours(lesson.id);

  return (
    <article className="mx-auto max-w-3xl">
      <LessonTimer lessonId={lesson.id} />
      <nav className="no-print mb-4 text-sm text-muted">
        <Link href="/learn" className="hover:text-text">
          Curriculum
        </Link>{" "}
        /{" "}
        <Link href={`/learn/${module.id}`} className="hover:text-text">
          M{module.number} {module.title}
        </Link>
      </nav>
      <header className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted">
          <Pill tone="accent">
            Lesson {ref.index + 1} of {module.lessons.length}
          </Pill>
          <span>{lesson.minutes} min</span>
          <LessonMeta lessonId={lesson.id} />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{lesson.title}</h1>
        <p className="mt-2 text-lg text-muted">{lesson.summary}</p>
      </header>

      <Card className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">By the end you can</div>
        <ul className="mt-2 space-y-1">
          {lesson.objectives.map((o, i) => (
            <li key={i} className="flex gap-2 text-[0.95rem]">
              <span className="text-accent">→</span>
              <span>{o.replace(/^you can\s+/i, (m) => "").replace(/^./, (c) => c.toUpperCase())}</span>
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
              <span className="font-semibold">{LAYER_META[s.layer].label}:</span> {s.title}
            </a>
          ))}
          <a href="#quiz" className="rounded-md bg-surface-2 px-2 py-1 hover:text-accent">
            <span className="font-semibold">Quiz</span>
          </a>
        </div>
      </Card>

      {lesson.sections.map((s, si) => (
        <section key={si} id={`s${si}`} className="mb-10 scroll-mt-20">
          <div className="mb-2 flex items-center gap-2">
            <Pill tone={LAYER_META[s.layer].tone}>{LAYER_META[s.layer].label}</Pill>
            <span className="text-xs text-muted">{LAYER_META[s.layer].hint}</span>
          </div>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">{s.title}</h2>
          {s.blocks.map((b, bi) => (
            <BlockRenderer key={bi} block={b} lesson={lesson} blockKey={`s${si}b${bi}`} />
          ))}
        </section>
      ))}

      <section id="quiz" className="mb-10 scroll-mt-20">
        <div className="mb-2 flex items-center gap-2">
          <Pill tone="ok">Retrieval practice</Pill>
          <span className="text-xs text-muted">Answer from memory — that is what makes it stick</span>
        </div>
        <h2 className="mb-3 text-2xl font-semibold tracking-tight">Lesson quiz</h2>
        <QuizRunner questions={lesson.quiz} source="quiz" kind="quiz" refId={lesson.id} title={`${lesson.title} — quiz`} completeLessonId={lesson.id} />
        <div className="mt-3">
          <CompleteButton lessonId={lesson.id} />
        </div>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        <Card>
          <div className="mb-2 font-semibold">Flashcards from this lesson</div>
          <p className="mb-2 text-sm text-muted">
            Unlocked into your daily review when you complete the lesson (finish the quiz).
          </p>
          <ul className="space-y-1.5 text-sm">
            {lesson.flashcards.slice(0, 6).map((f) => (
              <li key={f.id} className="rounded-md bg-surface-2 px-2 py-1">
                <Markdown className="prose-compact [&_p]:my-0">{f.front}</Markdown>
              </li>
            ))}
            {lesson.flashcards.length > 6 && <li className="text-xs text-muted">+{lesson.flashcards.length - 6} more</li>}
          </ul>
        </Card>
        <Card>
          <div className="mb-2 font-semibold">My notes</div>
          <NotesPanel lessonId={lesson.id} />
        </Card>
      </section>

      <nav className="no-print flex items-center justify-between gap-3 border-t border-border pt-5 text-sm">
        {prev ? (
          <Link href={`/learn/${module.id}/${prev.lesson.id}`} className="text-muted hover:text-text">
            ← {prev.lesson.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/${module.id}/${next.lesson.id}`} className="text-right font-medium text-accent">
            {next.lesson.title} →
          </Link>
        ) : (
          <Link href={`/learn/${module.id}/exam`} className="font-medium text-accent">
            Module exam →
          </Link>
        )}
      </nav>
      <TutorDrawer lessonId={lesson.id} lessonTitle={lesson.title} />
    </article>
  );
}
