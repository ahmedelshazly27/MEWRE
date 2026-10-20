"use client";

import { useT } from "@/lib/useLang";
import { useEffect, useRef, useState } from "react";
import { addTime, completeLesson, saveNote, startLesson } from "@/lib/store/actions";
import { useLearner } from "@/lib/store/react";
import { getStore } from "@/lib/store/store";
import { btn } from "@/components/ui";

/** Accumulates visible time and records it every 2 minutes and when the tab is hidden. */
export function LessonTimer({ lessonId }: { lessonId: string | null }) {
  const last = useRef(0);
  const acc = useRef(0);
  useEffect(() => {
    last.current = Date.now();
    if (lessonId) void getStore().load().then(async () => { await startLesson(lessonId); });
    const tick = () => {
      const now = Date.now();
      if (document.visibilityState === "visible") acc.current += (now - last.current) / 1000;
      last.current = now;
    };
    const flush = () => {
      tick();
      if (acc.current >= 5) void addTime(lessonId, Math.min(acc.current, 600));
      acc.current = 0;
    };
    const t1 = setInterval(tick, 15_000);
    const t2 = setInterval(flush, 120_000);
    const onVis = () => {
      if (document.visibilityState === "hidden") flush();
      else last.current = Date.now();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", flush);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [lessonId]);
  return null;
}

export function CompleteButton({ lessonId }: { lessonId: string }) {
  const store = useLearner();
  const { t } = useT();
  const [busy, setBusy] = useState(false);
  if (!store) return null;
  if (store.derived().lessons.get(lessonId)?.status === "completed") return <span className="text-sm font-medium text-ok">{t("✓ Completed")}</span>;
  return (
    <button
      className={btn.ghost}
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await completeLesson(lessonId);
        setBusy(false);
      }}
    >
      {t("Mark complete without quiz")}
    </button>
  );
}

export function NotesPanel({ lessonId }: { lessonId: string }) {
  const store = useLearner();
  const { t } = useT();
  const [body, setBody] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");
  useEffect(() => {
    if (store && body === null) setBody(store.doc<{ body: string }>(`note:${lessonId}`)?.body ?? "");
  }, [store, body, lessonId]);
  useEffect(() => {
    if (body === null) return;
    const saved = getStore().doc<{ body: string }>(`note:${lessonId}`)?.body ?? "";
    if (saved === body) return;
    setState("saving");
    const t = setTimeout(async () => {
      await saveNote(lessonId, body);
      setState("saved");
    }, 700);
    return () => clearTimeout(t);
  }, [body, lessonId]);
  return (
    <div>
      <textarea
        value={body ?? ""}
        onChange={(e) => setBody(e.target.value)}
        rows={8}
        dir="auto"
        placeholder={t("Your notes for this lesson (markdown supported). Saved on this device and synced.")}
        className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
      />
      <div className="mt-1 text-xs text-muted">{state === "saving" ? t("Saving…") : state === "saved" ? t("Saved") : ""}</div>
    </div>
  );
}
