"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { Pill } from "@/components/ui";

export interface TermDto {
  id: string;
  en: string;
  ar: string;
  definition: string;
  definitionAr?: string;
  category: string;
  lesson: string;
  lessonTitle: string;
  moduleId: string;
  moduleNumber: number;
}

const CATS = ["all", "technical", "contractual", "financial", "pm", "institutional"];

export function GlossarySearch({ terms }: { terms: TermDto[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return terms.filter((t) => (cat === "all" || t.category === cat) && (!s || t.en.toLowerCase().includes(s) || t.ar.includes(q.trim()) || t.definition.toLowerCase().includes(s)));
  }, [terms, q, cat]);
  return (
    <div>
      <div className="sticky top-14 z-10 -mx-1 mb-4 bg-bg/95 px-1 py-2 backdrop-blur lg:top-0">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search English or Arabic… / ابحث"
          dir="auto"
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-accent"
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-2.5 py-0.5 text-xs ${cat === c ? "bg-accent text-white dark:text-black" : "bg-surface-2 text-muted"}`}>
              {c}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted">{filtered.length} terms</span>
        </div>
      </div>
      <div className="divide-y divide-border rounded-xl border border-border bg-surface">
        {filtered.map((t) => (
          <div key={t.id} id={t.id} className="grid gap-2 p-4 sm:grid-cols-[1fr_1fr]">
            <div>
              <div className="font-semibold">{t.en}</div>
              <Markdown className="prose-compact text-sm text-muted">{t.definition}</Markdown>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                <Pill>{t.category}</Pill>
                <Link href={`/learn/${t.moduleId}/${t.lesson}`} className="text-accent">
                  M{t.moduleNumber} · {t.lessonTitle}
                </Link>
              </div>
            </div>
            <div dir="rtl" lang="ar" className="sm:text-right">
              <div className="text-lg font-semibold">{t.ar}</div>
              {t.definitionAr && <div className="text-sm text-muted">{t.definitionAr}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
