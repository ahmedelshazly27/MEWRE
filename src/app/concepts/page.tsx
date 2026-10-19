import { Widget } from "@/components/widgets";
import { PageHeader } from "@/components/ui";

export const metadata = { title: "Concept map" };

export default function ConceptsPage() {
  return (
    <div>
      <PageHeader title="Concept map" subtitle="How the ideas connect across modules. Click a node for its description and lesson." />
      <Widget id="concept-map" />
    </div>
  );
}
