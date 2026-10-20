import { t, type Lang } from "@/lib/i18n";
import { TutorChat } from "@/components/TutorChat";
import { Card, PageHeader } from "@/components/ui";

export function TutorView({ lang }: { lang: Lang }) {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title={t(lang, "AI tutor")}
        subtitle={t(lang, "Ask anything across the curriculum: explain a concept differently, quiz you, review a memo you drafted, or rehearse a tough conversation with a contractor. Inside a lesson, the tutor also sees that lesson's content.")}
      />
      <Card>
        <TutorChat />
      </Card>
      <p className="mt-3 text-xs text-muted">
        {t(lang, "Confidentiality habit: never paste real ministry documents, bidder data or personal information into external AI tools unless your organisation has approved the tool for that classification (see Module 14).")}
      </p>
    </div>
  );
}
