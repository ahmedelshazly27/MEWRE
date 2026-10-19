import Link from "next/link";
import { getLesson } from "@/lib/content";
import { allNotes } from "@/server/repo";
import { Markdown } from "@/components/Markdown";
import { EmptyState, PageHeader } from "@/components/ui";

export const metadata = { title: "My notes" };

export default function NotesPage() {
  const notes = allNotes().filter((n) => getLesson(n.lesson_id));
  return (
    <div>
      <PageHeader title="My notes" subtitle="Everything you wrote in lesson notes, most recent first." />
      {notes.length === 0 ? (
        <EmptyState title="No notes yet">Each lesson has a notes panel at the bottom; notes save automatically.</EmptyState>
      ) : (
        <div className="space-y-3">
          {notes.map((n) => {
            const ref = getLesson(n.lesson_id)!;
            return (
              <div key={n.lesson_id} className="rounded-xl border border-border bg-surface p-4">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <Link href={`/learn/${ref.module.id}/${ref.lesson.id}`} className="font-medium text-accent">
                    M{ref.module.number} · {ref.lesson.title}
                  </Link>
                  <span className="text-xs text-muted">{new Date(n.updated_at).toLocaleString()}</span>
                </div>
                <Markdown className="prose-compact">{n.body}</Markdown>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
