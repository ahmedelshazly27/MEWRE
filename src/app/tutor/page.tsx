import { TutorChat } from "@/components/TutorChat";
import { Card, PageHeader } from "@/components/ui";

export const metadata = { title: "AI tutor" };

export default function TutorPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="AI tutor"
        subtitle="Ask anything across the curriculum: explain a concept differently, quiz you, review a memo you drafted, or rehearse a tough conversation with a contractor. Inside a lesson, the tutor also sees that lesson's content."
      />
      <Card>
        <TutorChat />
      </Card>
      <p className="mt-3 text-xs text-muted">
        Confidentiality habit: never paste real ministry documents, bidder data or personal information into external AI tools unless your organisation has approved the tool for that classification (see Module 14).
      </p>
    </div>
  );
}
