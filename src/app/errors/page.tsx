import Link from "next/link";
import { getQuestion } from "@/lib/content";
import { listErrors } from "@/server/repo";
import { correctAnswerText } from "@/lib/scoring";
import { InlineMarkdown, Markdown } from "@/components/Markdown";
import { Button, EmptyState, PageHeader, Pill } from "@/components/ui";

export const metadata = { title: "Error log" };

function describeResponse(raw: string | null): string {
  if (!raw) return "";
  try {
    const r = JSON.parse(raw);
    if (r.type === "numeric") return String(r.value);
    if (r.type === "short") return r.text?.slice(0, 200) ?? "";
    return "";
  } catch {
    return "";
  }
}

export default async function ErrorsPage({ searchParams }: { searchParams: Promise<{ all?: string }> }) {
  const sp = await searchParams;
  const rows = listErrors(!!sp.all).filter((r) => getQuestion(r.question_id));
  const byModule = new Map<string, number>();
  for (const r of rows) {
    const m = getQuestion(r.question_id)!.module;
    const k = `M${m.number} ${m.title}`;
    byModule.set(k, (byModule.get(k) ?? 0) + 1);
  }
  return (
    <div>
      <PageHeader title="Error log" subtitle="Every mistake is logged and resurfaces in mixed practice and drills until you answer it correctly twice in a row.">
        <div className="flex gap-2">
          <Button href="/practice?mode=errors">Drill these</Button>
          <Button href={sp.all ? "/errors" : "/errors?all=1"} variant="ghost">
            {sp.all ? "Hide cleared" : "Show cleared"}
          </Button>
        </div>
      </PageHeader>
      {byModule.size > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {[...byModule.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => (
            <Pill key={k} tone="danger">
              {k}: {n}
            </Pill>
          ))}
        </div>
      )}
      {rows.length === 0 ? (
        <EmptyState title="No open errors">Mistakes from quizzes, exams and practice will appear here.</EmptyState>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => {
            const ref = getQuestion(r.question_id)!;
            const q = ref.question;
            const yours = describeResponse(r.last_response);
            return (
              <details key={r.question_id} className="rounded-xl border border-border bg-surface p-4">
                <summary className="cursor-pointer list-none">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    <Pill tone={r.cleared ? "ok" : "danger"}>{r.cleared ? "Cleared" : `Wrong ×${r.wrong_count}`}</Pill>
                    {!r.cleared && r.streak > 0 && <Pill tone="sun">1 more correct to clear</Pill>}
                    <span>
                      M{ref.module.number} · {ref.lesson?.title ?? "Module exam"}
                    </span>
                    <span>· last wrong {new Date(r.last_wrong_at).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-1.5 text-sm">
                    <InlineMarkdown>{q.prompt.split("\n").find((l) => l.trim()) ?? ""}</InlineMarkdown>
                  </div>
                </summary>
                <div className="mt-3 border-t border-border pt-3 text-sm">
                  <Markdown className="prose-compact">{q.prompt}</Markdown>
                  {yours && (
                    <div className="mt-2">
                      <span className="font-medium text-danger">Your last answer: </span>
                      {yours}
                    </div>
                  )}
                  <div className="mt-1">
                    <span className="font-medium text-ok">Correct: </span>
                    <InlineMarkdown>{correctAnswerText(q)}</InlineMarkdown>
                  </div>
                  <div className="mt-2 rounded-lg bg-surface-2 p-3">
                    <Markdown className="prose-compact">{q.explanation}</Markdown>
                  </div>
                  {ref.lesson && (
                    <Link href={`/learn/${ref.module.id}/${ref.lesson.id}`} className="mt-2 inline-block text-accent">
                      Revisit lesson →
                    </Link>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
}
