import Link from "next/link";
import { liveModules } from "@/lib/content";
import { listRuns } from "@/server/repo";
import { pickDiagnostic } from "@/lib/practice";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { Card, PageHeader } from "@/components/ui";

export const metadata = { title: "Diagnostic" };

export default async function DiagnosticPage({ searchParams }: { searchParams: Promise<{ start?: string }> }) {
  const sp = await searchParams;
  const mods = liveModules();
  const items = pickDiagnostic(mods, 4);
  const past = listRuns("diagnostic", undefined, 5);
  if (!sp.start) {
    return (
      <div className="mx-auto max-w-3xl">
        <PageHeader
          title="Diagnostic test"
          subtitle="A baseline across every available module. Results seed your per-concept mastery (at reduced weight) so the dashboard can recommend where to focus. Don't guess wildly — skipping knowledge you lack gives a truer baseline."
        />
        <Card>
          <div className="text-sm text-muted">
            {items.length} questions across {mods.length} modules · about {Math.round(items.length * 1.5)} minutes · feedback at the end.
          </div>
          <Link href="/diagnostic?start=1" className="mt-4 inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white dark:text-black">
            Start diagnostic
          </Link>
          {past.length > 0 && (
            <div className="mt-5 text-sm">
              <div className="font-medium">Previous attempts</div>
              <ul className="mt-1 text-muted">
                {past.map((r) => (
                  <li key={r.id}>
                    {new Date(r.finished_at!).toLocaleDateString()} — {Math.round((r.score ?? 0) * 100)}%
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Diagnostic test" subtitle="Answer what you can. Feedback at the end." />
      <QuizRunner questions={items.map((i) => i.question)} source="diagnostic" kind="diagnostic" refId="all" title="Diagnostic baseline" examMode />
      <p className="mt-6 text-sm text-muted">
        When done, see your <Link href="/" className="text-accent">dashboard</Link> for per-competency baseline and recommendations.
      </p>
    </div>
  );
}
