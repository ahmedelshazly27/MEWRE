"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { useT } from "@/lib/useLang";

export interface FormulaDto {
  id: string;
  name: string;
  html: string;
  vars: { html: string; meaning: string; unit: string }[];
  explanation: string;
  lessonId: string;
  lessonTitle: string;
  moduleId: string;
  moduleNumber: number;
  moduleTitle: string;
  search: string;
}

export function FormulaSearch({ formulas }: { formulas: FormulaDto[] }) {
  const { t, href } = useT();
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const s = q.toLowerCase().trim();
    return s ? formulas.filter((f) => f.search.includes(s)) : formulas;
  }, [q, formulas]);
  const groups = new Map<string, FormulaDto[]>();
  for (const f of shown) {
    const k = `M${f.moduleNumber} · ${f.moduleTitle}`;
    groups.set(k, [...(groups.get(k) ?? []), f]);
  }
  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("Search formulas: LCOE, DSCR, power factor, CPI…")}
        dir="auto"
        className="no-print mb-5 w-full rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-accent"
      />
      {[...groups.entries()].map(([g, fs]) => (
        <section key={g} className="mb-8">
          <h2 className="mb-3 text-lg font-semibold">{g}</h2>
          <div className="grid gap-3 lg:grid-cols-2">
            {fs.map((f) => (
              <div key={f.id} id={f.id} className="min-w-0 break-inside-avoid rounded-xl border border-border bg-surface">
                <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2 text-sm">
                  <span className="font-semibold">{f.name}</span>
                  <Link href={href(`/learn/${f.moduleId}/${f.lessonId}`)} className="truncate text-end text-xs text-accent">
                    {f.lessonTitle}
                  </Link>
                </div>
                <div className="overflow-x-auto px-4 py-3" dir="ltr" dangerouslySetInnerHTML={{ __html: f.html }} />
                {f.vars.length > 0 && (
                  <div className="grid gap-1 border-t border-border px-4 py-2 text-sm">
                    {f.vars.map((v, i) => (
                      <div key={i} className="flex gap-2">
                        <span dangerouslySetInnerHTML={{ __html: v.html }} />
                        <span className="text-muted">
                          {v.meaning} {v.unit && <span className="text-xs">[{v.unit}]</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <details className="border-t border-border px-4 py-2 text-sm">
                  <summary className="cursor-pointer text-muted">{t("Explanation")}</summary>
                  <Markdown className="prose-compact">{f.explanation}</Markdown>
                </details>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
