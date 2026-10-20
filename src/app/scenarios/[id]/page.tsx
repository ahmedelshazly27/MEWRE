import type { Metadata } from "next";
import { index } from "@/lib/content";
import { ScenarioView, scenarioTitle } from "@/views/ScenarioView";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return [...index().scenarios.values()].filter((s) => !s.module.draft).map((s) => ({ id: s.scenario.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: scenarioTitle((await params).id, "en") };
}

export default async function ScenarioPage({ params }: Params) {
  return <ScenarioView id={(await params).id} lang="en" />;
}
