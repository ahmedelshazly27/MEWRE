"use client";

import { useState } from "react";
import { TutorChat } from "@/components/TutorChat";
import { Icon } from "@/components/Nav";

export function TutorDrawer({ lessonId, lessonTitle }: { lessonId: string; lessonTitle: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="no-print fixed bottom-20 right-4 z-30 flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-medium text-white shadow-lg hover:opacity-90 lg:bottom-6 dark:text-black"
      >
        <Icon name="chat" /> Ask tutor
      </button>
      {open && (
        <div className="fixed inset-0 z-50" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-0 right-0 flex h-[85vh] w-full flex-col rounded-t-2xl border border-border bg-surface p-4 sm:h-full sm:w-[440px] sm:rounded-none" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <div className="font-semibold">AI tutor</div>
              <button onClick={() => setOpen(false)} className="rounded p-1 text-muted hover:bg-surface-2" aria-label="Close">
                ✕
              </button>
            </div>
            <TutorChat lessonId={lessonId} lessonTitle={lessonTitle} compact />
          </div>
        </div>
      )}
    </>
  );
}
