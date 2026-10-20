import Link from "next/link";
import { notFound } from "next/navigation";
import { getScenario, index } from "@/lib/content";
import { back, lp, t, type Lang } from "@/lib/i18n";
import { BestScore } from "@/components/progress";
import { EmptyState, PageHeader } from "@/components/ui";
import { ScenarioPlayer } from "@/components/lesson/ScenarioPlayer";

export const scenarioTitle = (id: string, lang: Lang) => getScenario(id, lang)?.scenario.title ?? t(lang, "Scenarios");

export function ScenarioView({ id, lang }: { id: string; lang: Lang }) {
  const s = getScenario(id, lang);
  if (!s || s.module.draft) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-4 text-sm text-muted">
        <Link href={lp(lang, "/scenarios")} className="hover:text-text">
          {back(lang)} {t(lang, "All scenarios")}
        </Link>
      </nav>
      <div className="text-sm text-muted">
        M{s.module.number} · <Link href={lp(lang, `/learn/${s.module.id}/${s.lesson.id}`)}>{s.lesson.title}</Link>
      </div>
      <ScenarioPlayer scenario={s.scenario} />
    </div>
  );
}

type Item = ReturnType<typeof index>["scenarios"] extends Map<string, infer V> ? V : never;

function Grid({ items, lang }: { items: Item[]; lang: Lang }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(({ scenario, module, lesson }) => (
        <Link key={scenario.id} href={lp(lang, `/scenarios/${scenario.id}`)} className="rounded-xl border border-border bg-surface p-4 hover:border-accent/60">
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

export function ScenariosView({ lang }: { lang: Lang }) {
  const all = [...index(lang).scenarios.values()].filter((s) => !s.module.draft);
  const day = all.filter((s) => s.scenario.dayInLife);
  const rest = all.filter((s) => !s.scenario.dayInLife);
  return (
    <div>
      <PageHeader
        title={t(lang, "Day in the life")}
        subtitle={t(lang, "Field scenarios a MEWRE renewable PM actually faces — contractor notices, committee questions, site incidents, commercial calls. Each decision is scored with expert feedback.")}
      />
      {all.length === 0 ? (
        <EmptyState title={t(lang, "Scenarios are being written")} />
      ) : (
        <>
          <Grid items={day} lang={lang} />
          {rest.length > 0 && (
            <details className="mt-8">
              <summary className="cursor-pointer text-lg font-semibold">{t(lang, "More scenarios from the lessons ({n})", { n: rest.length })}</summary>
              <div className="mt-3">
                <Grid items={rest} lang={lang} />
              </div>
            </details>
          )}
        </>
      )}
    </div>
  );
}
