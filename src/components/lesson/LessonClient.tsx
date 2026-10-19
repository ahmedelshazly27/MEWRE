"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { post, get } from "@/lib/api";
import { btn } from "@/components/ui";

/** Sends a time heartbeat every 30 s while the tab is visible. */
export function LessonTimer({ lessonId }: { lessonId: string | null }) {
  const last = useRef(0);
  useEffect(() => {
    last.current = Date.now();
    if (lessonId) post("/api/lesson", { action: "start", lessonId }).catch(() => {});
    const flush = () => {
      const now = Date.now();
      const secs = Math.round((now - last.current) / 1000);
      last.current = now;
      if (secs >= 5 && document.visibilityState === "visible") post("/api/lesson", { action: "time", lessonId, seconds: secs }).catch(() => {});
    };
    const t = setInterval(flush, 30_000);
    const onVis = () => {
      if (document.visibilityState === "hidden") flush();
      else last.current = Date.now();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(t);
      document.removeEventListener("visibilitychange", onVis);
      flush();
    };
  }, [lessonId]);
  return null;
}

export function CompleteButton({ lessonId, completed }: { lessonId: string; completed: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  if (completed) return <span className="text-sm font-medium text-ok">✓ Completed</span>;
  return (
    <button
      className={btn.ghost}
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await post("/api/lesson", { action: "complete", lessonId });
        router.refresh();
      }}
    >
      Mark complete without quiz
    </button>
  );
}

export function NotesPanel({ lessonId }: { lessonId: string }) {
  const [body, setBody] = useState("");
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");
  const loaded = useRef(false);
  useEffect(() => {
    get<{ body: string }>(`/api/notes?lessonId=${lessonId}`).then((r) => {
      setBody(r.body);
      loaded.current = true;
    });
  }, [lessonId]);
  useEffect(() => {
    if (!loaded.current) return;
    setState("saving");
    const t = setTimeout(async () => {
      await post("/api/notes", { lessonId, body });
      setState("saved");
    }, 700);
    return () => clearTimeout(t);
  }, [body, lessonId]);
  return (
    <div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={8}
        dir="auto"
        placeholder="Your notes for this lesson (markdown supported). Saved automatically."
        className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
      />
      <div className="mt-1 text-xs text-muted">{state === "saving" ? "Saving…" : state === "saved" ? "Saved" : ""}</div>
    </div>
  );
}
