import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getModule } from "@/lib/content";
import { bestScores, lessonProgressMap, masteryMap } from "@/server/repo";
import { Markdown } from "@/components/Markdown";
import { Widget } from "@/components/widgets";
import { Button, Card, MasteryBadge, PageHeader, Pill, fmtDuration } from "@/components/ui";

type Params = { params: Promise<{ moduleId: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { moduleId } = await params;
  return { title: getModule(moduleId)?.title ?? "Module" };
}

export default async function ModulePage({ params }: Params) {
  const { moduleId } = await params;
  const m = getModule(moduleId);
  if (!m || m.draft) notFound();
  const progress = lessonProgressMap();
  const mastery = masteryMap();
  const quizBest = bestScores("quiz");
  const examBest = bestScores("exam").get(m.id);
  const firstOpen = m.lessons.find((l) => progress.get(l.id)?.status !== "completed") ?? m.lessons[0];

  return (
    <div>
      <nav className="mb-4 text-sm text-muted">
        <Link href="/learn" className="hover:text-text">
          Curriculum
        </Link>
      </nav>
      <PageHeader title={`M${m.number} · ${m.title}`} subtitle={m.summary}>
        <div className="flex gap-2">
          <Button href={`/learn/${m.id}/${firstOpen.id}`}>Continue</Button>
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
          {m.lessons.map((l, i) => {
            const p = progress.get(l.id);
            const qb = quizBest.get(l.id);
            return (
              <Link key={l.id} href={`/learn/${m.id}/${l.id}`} className="block rounded-xl border border-border bg-surface p-4 hover:border-accent/60">
                <div className="flex items-start gap-3">
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold ${p?.status === "completed" ? "bg-ok-soft text-ok" : p ? "bg-sun-soft text-sun" : "bg-surface-2 text-muted"}`}>
                    {p?.status === "completed" ? "✓" : i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{l.title}</div>
                    <div className="mt-0.5 text-sm text-muted">{l.summary}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                      <Pill>{l.minutes} min</Pill>
                      <Pill>{l.quiz.length} quiz Qs</Pill>
                      <Pill>{l.flashcards.length} cards</Pill>
                      {p && p.seconds > 0 && <Pill>{fmtDuration(p.seconds)} spent</Pill>}
                      {qb !== undefined && <Pill tone={qb >= 0.8 ? "ok" : "warn"}>Quiz {Math.round(qb * 100)}%</Pill>}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          <Link href={`/learn/${m.id}/exam`} className="block rounded-xl border border-dashed border-accent/60 bg-surface p-4 hover:bg-accent-soft/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Module exam</div>
                <div className="text-sm text-muted">Integrative questions across all lessons, feedback at the end.</div>
              </div>
              {examBest !== undefined ? <Pill tone={examBest >= 0.8 ? "ok" : "warn"}>Best {Math.round(examBest * 100)}%</Pill> : <Pill tone="accent">Not taken</Pill>}
            </div>
          </Link>
        </div>
        <aside className="min-w-0 space-y-4">
          <Card>
            <div className="mb-2 font-semibold">Concept mastery</div>
            <ul className="space-y-1.5 text-sm">
              {m.lessons.flatMap((l) => l.concepts).map((c) => {
                const x = mastery.get(c.id);
                return (
                  <li key={c.id} className="flex items-center justify-between gap-2">
                    <span className="min-w-0 truncate" title={c.description}>
                      {c.name}
                    </span>
                    <MasteryBadge mastery={x?.mastery ?? 0} evidence={x?.evidence ?? 0} />
                  </li>
                );
              })}
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
