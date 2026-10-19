"use client";

import Link from "next/link";
import { useLearner } from "@/lib/store/react";
import { useContent } from "@/lib/useContent";
import { Markdown } from "@/components/Markdown";
import { EmptyState, PageHeader } from "@/components/ui";

export default function NotesPage() {
  const store = useLearner();
  const content = useContent();
  if (!store || !content) return <div className="text-muted">Loading…</div>;
  const notes = store
    .docsWithPrefix("note:")
    .map((d) => ({ lessonId: d.key.slice(5), body: (d.value as { body?: string })?.body ?? "", updatedAt: d.updatedAt }))
    .filter((n) => n.body.trim() && content.lessons.some((l) => l.id === n.lessonId))
    .sort((a, b) => b.updatedAt - a.updatedAt);
  return (
    <div>
      <PageHeader title="My notes" subtitle="Everything you wrote in lesson notes, most recent first. Synced across your devices when signed in." />
      {notes.length === 0 ? (
        <EmptyState title="No notes yet">Each lesson has a notes panel at the bottom; notes save automatically.</EmptyState>
      ) : (
        <div className="space-y-3">
          {notes.map((n) => {
            const l = content.lessons.find((x) => x.id === n.lessonId)!;
            return (
              <div key={n.lessonId} className="rounded-xl border border-border bg-surface p-4">
                <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                  <Link href={`/learn/${l.moduleId}/${l.id}`} className="font-medium text-accent">
                    M{l.moduleNumber} · {l.title}
                  </Link>
                  <span className="text-xs text-muted">{new Date(n.updatedAt).toLocaleString()}</span>
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
