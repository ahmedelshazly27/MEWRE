import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getModule, liveModules } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import { Widget } from "@/components/widgets";
import { BestScore, ConceptBadge, LessonIcon, LessonPills } from "@/components/progress";
import { ContinueLink } from "@/components/ContinueLink";
import { Button, Card, PageHeader, Pill } from "@/components/ui";

type Params = { params: Promise<{ moduleId: string }> };

export function generateStaticParams() {
  return liveModules().map((m) => ({ moduleId: m.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { moduleId } = await params;
  return { title: getModule(moduleId)?.title ?? "Module" };
}

export default async function ModulePage({ params }: Params) {
  const { moduleId } = await params;
  const m = getModule(moduleId);
  if (!m || m.draft) notFound();
  const lessonIds = m.lessons.map((l) => l.id);

  return (
    <div>
      <nav className="mb-4 text-sm text-muted">
        <Link href="/learn" className="hover:text-text">
          Curriculum
        </Link>
      </nav>
      <PageHeader title={`M${m.number} · ${m.title}`} subtitle={m.summary}>
        <div className="flex gap-2">
          <ContinueLink moduleId={m.id} lessonIds={lessonIds} className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 dark:text-black">
            Continue
          </ContinueLink>
          <Button href={`/print/${m.id}`} variant="ghost">
            Cheat sheet
          </Button>
        </div>
      </PageHeader>
      {m.whyItMatters && (
        <Card className="mb-6 border-accent/40 bg-accent-soft/30">
          <div className="text-xs font-semibold uppercase tracking-wide text-accent">Why this matters for a MEWRE PM</div>
          <Markdown className="prose-lesson prose-compact">{m.whyItMatters}</Markdown>
        </Card>
      )}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-3">
          {m.lessons.map((l, i) => (
            <Link key={l.id} href={`/learn/${m.id}/${l.id}`} className="block rounded-xl border border-border bg-surface p-4 hover:border-accent/60">
              <div className="flex items-start gap-3">
                <LessonIcon lessonId={l.id} index={i} />
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{l.title}</div>
                  <div className="mt-0.5 text-sm text-muted">{l.summary}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                    <Pill>{l.minutes} min</Pill>
                    <Pill>{l.quiz.length} quiz Qs</Pill>
                    <Pill>{l.flashcards.length} cards</Pill>
                    <LessonPills lessonId={l.id} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <Link href={`/learn/${m.id}/exam`} className="block rounded-xl border border-dashed border-accent/60 bg-surface p-4 hover:bg-accent-soft/30">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-medium">Module exam</div>
                <div className="text-sm text-muted">Integrative questions across all lessons, feedback at the end.</div>
              </div>
              <BestScore kind="exam" refId={m.id} label="Best" empty="Not taken" />
            </div>
          </Link>
        </div>
        <aside className="min-w-0 space-y-4">
          <Card>
            <div className="mb-2 font-semibold">Concept mastery</div>
            <ul className="space-y-1.5 text-sm">
              {m.lessons
                .flatMap((l) => l.concepts)
                .map((c) => (
                  <li key={c.id} className="flex items-center justify-between gap-2">
                    <span className="min-w-0 truncate" title={c.description}>
                      {c.name}
                    </span>
                    <ConceptBadge conceptId={c.id} />
                  </li>
                ))}
            </ul>
          </Card>
          <Card>
            <div className="mb-2 font-semibold">Module at a glance</div>
            <ul className="space-y-1 text-sm text-muted">
              <li>~{m.estimatedHours} hours</li>
              <li>{m.glossary.length} glossary terms</li>
              <li>{m.formulas.length} formulas</li>
              <li>{m.references.length} references</li>
            </ul>
          </Card>
        </aside>
      </div>
      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">How the concepts connect</h2>
        <Widget id="concept-map" props={{ module: m.id }} />
      </div>
    </div>
  );
}
