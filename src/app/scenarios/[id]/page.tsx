import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getScenario, index } from "@/lib/content";
import { ScenarioPlayer } from "@/components/lesson/ScenarioPlayer";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return [...index().scenarios.values()].filter((s) => !s.module.draft).map((s) => ({ id: s.scenario.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  return { title: getScenario(id)?.scenario.title ?? "Scenario" };
}

export default async function ScenarioPage({ params }: Params) {
  const { id } = await params;
  const s = getScenario(id);
  if (!s || s.module.draft) notFound();
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
