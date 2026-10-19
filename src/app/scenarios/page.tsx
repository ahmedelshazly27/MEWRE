import Link from "next/link";
import { index } from "@/lib/content";
import { bestScores } from "@/server/repo";
import { ScenarioPlayer } from "@/components/lesson/ScenarioPlayer";
import { EmptyState, PageHeader, Pill } from "@/components/ui";

export const metadata = { title: "Day in the life" };

export default async function ScenariosPage({ searchParams }: { searchParams: Promise<{ id?: string; all?: string }> }) {
  const sp = await searchParams;
  const all = [...index().scenarios.values()].filter((s) => !s.module.draft);
  const best = bestScores("scenario");
  if (sp.id) {
    const s = all.find((x) => x.scenario.id === sp.id);
    if (!s) return <EmptyState title="Scenario not found" />;
    return (
      <div className="mx-auto max-w-3xl">
        <nav className="mb-4 text-sm text-muted">
          <Link href="/scenarios" className="hover:text-text">
            ← All scenarios
          </Link>
        </nav>
        <div className="text-sm text-muted">
          M{s.module.number} · <Link href={`/learn/${s.module.id}/${s.lesson.id}`}>{s.lesson.title}</Link>
        </div>
        <ScenarioPlayer scenario={s.scenario} />
      </div>
    );
  }
  const list = sp.all ? all : all.filter((s) => s.scenario.dayInLife);
  const shown = list.length ? list : all;
  return (
    <div>
      <PageHeader
        title="Day in the life"
        subtitle="Field scenarios a MEWRE renewable PM actually faces — contractor notices, committee questions, site incidents, commercial calls. Each decision is scored with expert feedback."
      >
        <Link href={sp.all ? "/scenarios" : "/scenarios?all=1"} className="text-sm text-accent">
          {sp.all ? "Day-in-the-life only" : `Show all ${all.length} scenarios`}
        </Link>
      </PageHeader>
      {shown.length === 0 ? (
        <EmptyState title="Scenarios are being written" />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {shown.map(({ scenario, module, lesson }) => (
            <Link key={scenario.id} href={`/scenarios?id=${scenario.id}`} className="rounded-xl border border-border bg-surface p-4 hover:border-accent/60">
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium">{scenario.title}</div>
                {best.has(scenario.id) && <Pill tone={best.get(scenario.id)! >= 0.8 ? "ok" : "warn"}>{Math.round(best.get(scenario.id)! * 100)}%</Pill>}
              </div>
              <div className="mt-1 text-xs text-muted">
                M{module.number} {module.title} · {lesson.title}
              </div>
              <p className="mt-2 line-clamp-3 text-sm text-muted">{scenario.context.replace(/[*#$_]/g, "").slice(0, 240)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
