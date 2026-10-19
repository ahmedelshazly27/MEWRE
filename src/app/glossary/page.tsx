import { getLesson, index } from "@/lib/content";
import { PageHeader } from "@/components/ui";
import { GlossarySearch, type TermDto } from "./GlossarySearch";

export const metadata = { title: "Glossary EN/AR" };

export default function GlossaryPage() {
  const terms: TermDto[] = index().glossary.map((g) => {
    const l = getLesson(g.lesson);
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
      <PageHeader title="Bilingual glossary" subtitle="Technical, contractual, financial and institutional terms in English and Arabic, linked to the lesson that teaches them. Every term also becomes a flashcard once its lesson is complete." />
      <GlossarySearch terms={terms} />
    </div>
  );
}
