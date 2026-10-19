"use client";

import { useEffect, useRef, useState } from "react";
import { Markdown } from "@/components/Markdown";
import { btn } from "@/components/ui";

type Msg = { role: "user" | "assistant"; content: string };

const PRESETS = [
  "Explain this lesson differently — use an analogy from logistics automation.",
  "Quiz me on this lesson, one question at a time.",
  "What would an experienced PM check first here?",
  "Give me a harder worked example with Kuwait numbers.",
  "اشرح لي الفكرة الأساسية بالعربية باختصار",
];

export function TutorChat({ lessonId, lessonTitle, compact = false }: { lessonId?: string; lessonTitle?: string; compact?: boolean }) {
  const storageKey = `tutor:${lessonId ?? "general"}`;
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/tutor").then((r) => r.json()).then((r) => setAvailable(r.available)).catch(() => setAvailable(false));
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (raw) setMessages(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {}
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, storageKey]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: text.trim() }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/tutor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next, lessonId }) });
      if (!res.ok || !res.body) {
        const t = await res.text();
        setMessages([...next, { role: "assistant", content: `_${t || "Tutor unavailable."}_` }]);
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
    } catch (e) {
      setMessages([...next, { role: "assistant", content: `_Error: ${(e as Error).message}_` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      {available === false && (
        <div className="mb-3 rounded-lg border border-warn/50 bg-warn-soft/60 p-3 text-sm">
          The AI tutor is off. Add <strong>ANTHROPIC_API_KEY</strong> to <strong>.env.local</strong> and restart <strong>npm run dev</strong>. Everything else works without it.
        </div>
      )}
      <div className={`flex-1 space-y-3 overflow-y-auto ${compact ? "max-h-[55vh]" : "min-h-[40vh]"}`}>
        {messages.length === 0 && (
          <div className="text-sm text-muted">
            {lessonTitle ? (
              <>
                Ask anything about <strong>{lessonTitle}</strong>. The tutor sees this lesson&apos;s content.
              </>
            ) : (
              "Ask about any topic in the curriculum — engineering, contracts, finance, Kuwait context, or how to handle a situation on the job."
            )}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "ml-6 rounded-xl bg-accent-soft px-3 py-2 text-sm" : "mr-2 text-sm"} dir="auto">
            {m.role === "assistant" ? m.content ? <Markdown className="prose-lesson prose-compact">{m.content}</Markdown> : <span className="text-muted">Thinking…</span> : m.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button key={p} className={btn.small} disabled={busy || available === false} onClick={() => send(p)} dir="auto">
            {p.length > 42 ? p.slice(0, 40) + "…" : p}
          </button>
        ))}
      </div>
      <form
        className="mt-2 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={2}
          dir="auto"
          placeholder="Ask the tutor…"
          className="min-w-0 flex-1 rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
        />
        <button className={btn.primary} disabled={busy || !input.trim() || available === false}>
          Send
        </button>
      </form>
      {messages.length > 0 && (
        <button className="mt-2 self-start text-xs text-muted hover:text-text" onClick={() => setMessages([])}>
          Clear conversation
        </button>
      )}
    </div>
  );
}
