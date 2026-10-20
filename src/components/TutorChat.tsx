"use client";

import { useEffect, useRef, useState } from "react";
import { Markdown } from "@/components/Markdown";
import { authFetch } from "@/lib/authFetch";
import { btn } from "@/components/ui";
import { useT } from "@/lib/useLang";

type Msg = { role: "user" | "assistant"; content: string };

const PRESETS_AR = [
  "اشرح هذا الدرس بطريقة مختلفة — استخدم تشبيهاً من أتمتة الخدمات اللوجستية.",
  "اختبرني في هذا الدرس، سؤالاً واحداً في كل مرة.",
  "ما أول ما يتحقق منه مدير مشروع متمرّس هنا؟",
  "أعطني مثالاً محلولاً أصعب بأرقام الكويت.",
  "Explain the key idea briefly in English.",
];

const PRESETS = [
  "Explain this lesson differently — use an analogy from logistics automation.",
  "Quiz me on this lesson, one question at a time.",
  "What would an experienced PM check first here?",
  "Give me a harder worked example with Kuwait numbers.",
  "اشرح لي الفكرة الأساسية بالعربية باختصار",
];

export function TutorChat({ lessonId, lessonTitle, compact = false }: { lessonId?: string; lessonTitle?: string; compact?: boolean }) {
  const { lang, t } = useT();
  const presets = lang === "ar" ? PRESETS_AR : PRESETS;
  const storageKey = `tutor:${lessonId ?? "general"}`;
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [offline, setOffline] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/tutor")
      .then((r) => r.json())
      .then((r) => setAvailable(r.available))
      .catch(() => setOffline(true));
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
      const res = await authFetch("/api/tutor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next, lessonId, lang }) });
      if (!res.ok || !res.body) {
        const body = await res.text();
        setMessages([...next, { role: "assistant", content: `_${body || t("Tutor unavailable.")}_` }]);
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
      setMessages([...next, { role: "assistant", content: `_${t("Error: {m}", { m: (e as Error).message })}_` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      {offline && (
        <div className="mb-3 rounded-lg border border-warn/50 bg-warn-soft/60 p-3 text-sm">{t("You are offline. The AI tutor needs a connection — lessons, quizzes and reviews keep working.")}</div>
      )}
      {available === false && (
        <div className="mb-3 rounded-lg border border-warn/50 bg-warn-soft/60 p-3 text-sm">
          {t("The AI tutor is off. Add ANTHROPIC_API_KEY to the server environment and redeploy (or .env.local and restart npm run dev). Everything else works without it.")}
        </div>
      )}
      <div className={`flex-1 space-y-3 overflow-y-auto ${compact ? "max-h-[55vh]" : "min-h-[40vh]"}`}>
        {messages.length === 0 && (
          <div className="text-sm text-muted">
            {lessonTitle ? (
              <>
                {t("Ask anything about")} <strong>{lessonTitle}</strong>. {t("The tutor sees this lesson's content.")}
              </>
            ) : (
              t("Ask about any topic in the curriculum — engineering, contracts, finance, Kuwait context, or how to handle a situation on the job.")
            )}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "ms-6 rounded-xl bg-accent-soft px-3 py-2 text-sm" : "me-2 text-sm"} dir="auto">
            {m.role === "assistant" ? m.content ? <Markdown autoDir className="prose-lesson prose-compact">{m.content}</Markdown> : <span className="text-muted">{t("Thinking…")}</span> : m.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <button key={p} className={btn.small} disabled={busy || available === false || offline} onClick={() => send(p)} dir="auto">
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
          placeholder={t("Ask the tutor…")}
          className="min-w-0 flex-1 rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
        />
        <button className={btn.primary} disabled={busy || !input.trim() || available === false || offline}>
          {t("Send")}
        </button>
      </form>
      {messages.length > 0 && (
        <button className="mt-2 self-start text-xs text-muted hover:text-text" onClick={() => setMessages([])}>
          {t("Clear conversation")}
        </button>
      )}
    </div>
  );
}
