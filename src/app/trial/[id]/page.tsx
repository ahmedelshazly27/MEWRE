import type { Metadata } from "next";
import { EXPLAINERS, getExplainer } from "@/content/trial";
import { ExplainerView } from "@/views/TrialView";

type Params = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return EXPLAINERS.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: getExplainer((await params).id)?.title ?? "Explainer" };
}

export default async function Page({ params }: Params) {
  return <ExplainerView id={(await params).id} />;
}
