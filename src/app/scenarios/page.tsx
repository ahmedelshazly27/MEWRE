import Link from "next/link";
import { index } from "@/lib/content";
import { BestScore } from "@/components/progress";
import { EmptyState, PageHeader } from "@/components/ui";

export const metadata = { title: "Day in the life" };

type Item = ReturnType<typeof index>["scenarios"] extends Map<string, infer V> ? V : never;

function Grid({ items }: { items: Item[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(({ scenario, module, lesson }) => (
        <Link key={scenario.id} href={`/scenarios/${scenario.id}`} className="rounded-xl border border-border bg-surface p-4 hover:border-accent/60">
          <div className="flex items-start justify-between gap-2">
            <div className="font-medium">{scenario.title}</div>
            <BestScore kind="scenario" refId={scenario.id} label="" />
          </div>
          <div className="mt-1 text-xs text-muted">
            M{module.number} {module.title} · {lesson.title}
          </div>
          <p className="mt-2 line-clamp-3 text-sm text-muted">{scenario.context.replace(/[*#$_]/g, "").slice(0, 240)}</p>
        </Link>
      ))}
    </div>
  );
}

export default function ScenariosPage() {
  const all = [...index().scenarios.values()].filter((s) => !s.module.draft);
  const day = all.filter((s) => s.scenario.dayInLife);
  const rest = all.filter((s) => !s.scenario.dayInLife);
  return (
    <div>
      <PageHeader
        title="Day in the life"
        subtitle="Field scenarios a MEWRE renewable PM actually faces — contractor notices, committee questions, site incidents, commercial calls. Each decision is scored with expert feedback."
      />
      {all.length === 0 ? (
        <EmptyState title="Scenarios are being written" />
      ) : (
        <>
          <Grid items={day} />
          {rest.length > 0 && (
            <details className="mt-8">
              <summary className="cursor-pointer text-lg font-semibold">More scenarios from the lessons ({rest.length})</summary>
              <div className="mt-3">
                <Grid items={rest} />
              </div>
            </details>
          )}
        </>
      )}
    </div>
  );
}
