"use client";

import { useEffect, useState } from "react";
import { InlineMarkdown } from "@/components/Markdown";

/** Tickable checklist; ticks persist in localStorage per checklist. */
export function Checklist({ id, title, items, tone }: { id: string; title: string; items: string[]; tone: "pm" | "ask" }) {
  const [ticks, setTicks] = useState<boolean[]>(items.map(() => false));
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`chk:${id}`);
      if (raw) setTicks(JSON.parse(raw));
    } catch {}
  }, [id]);
  const toggle = (i: number) => {
    const next = ticks.map((v, j) => (j === i ? !v : v));
    setTicks(next);
    try {
      localStorage.setItem(`chk:${id}`, JSON.stringify(next));
    } catch {}
  };
  return (
    <div className={`my-5 rounded-xl border p-4 ${tone === "pm" ? "border-accent/40 bg-accent-soft/30" : "border-sun/40 bg-sun-soft/30"}`}>
      <div className="mb-2 text-sm font-semibold">{tone === "ask" ? "❓ " : "✅ "}{title}</div>
      <ul className="space-y-1.5">
        {items.map((it, i) =>
          tone === "pm" ? (
            <li key={i}>
              <label className="flex cursor-pointer items-start gap-2 text-[0.95rem]">
                <input type="checkbox" className="mt-1.5" checked={!!ticks[i]} onChange={() => toggle(i)} />
                <span className={`min-w-0 flex-1 ${ticks[i] ? "text-muted line-through" : ""}`}>
                  <InlineMarkdown>{it}</InlineMarkdown>
                </span>
              </label>
            </li>
          ) : (
            <li key={i} className="flex items-start gap-2 text-[0.95rem]">
              <span className="mt-0.5 text-sun">›</span>
              <span className="min-w-0 flex-1">
                <InlineMarkdown>{it}</InlineMarkdown>
              </span>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
