import { t, type Lang } from "@/lib/i18n";
import { Widget } from "@/components/widgets";
import { PageHeader } from "@/components/ui";

export function ConceptsView({ lang }: { lang: Lang }) {
  return (
    <div>
      <PageHeader title={t(lang, "Concept map")} subtitle={t(lang, "How the ideas connect across modules. Click a node for its description and lesson.")} />
      {lang === "ar" && <p className="mb-3 text-sm text-muted">{t(lang, "Interactive tools and diagrams are shown in English.")}</p>}
      <div dir="ltr">
        <Widget id="concept-map" />
      </div>
    </div>
  );
}
