import { getLesson, index } from "@/lib/content";
import { t, type Lang } from "@/lib/i18n";
import { PageHeader } from "@/components/ui";
import { GlossarySearch, type TermDto } from "@/app/glossary/GlossarySearch";

export function GlossaryView({ lang }: { lang: Lang }) {
  const terms: TermDto[] = index(lang).glossary.map((g) => {
    const l = getLesson(g.lesson, lang);
    return {
      id: g.id,
      en: g.en,
      ar: g.ar,
      definition: g.definition,
      definitionAr: g.definitionAr,
      category: g.category,
      lesson: g.lesson,
      lessonTitle: l?.lesson.title ?? "",
      moduleId: g.moduleId,
      moduleNumber: l?.module.number ?? 0,
    };
  });
  return (
    <div>
      <PageHeader
        title={t(lang, "Bilingual glossary")}
        subtitle={t(lang, "Technical, contractual, financial and institutional terms in English and Arabic, linked to the lesson that teaches them. Every term also becomes a flashcard once its lesson is complete.")}
      />
      <GlossarySearch terms={terms} />
    </div>
  );
}
