"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLearner } from "@/lib/store/react";
import { useContent } from "@/lib/useContent";
import { useT } from "@/lib/useLang";
import { ventureOf } from "@/lib/aiWorkflow";
import { VENTURES, type VentureId } from "@/content/venture-context";
import type { WorkRow } from "@/lib/store/derive";
import type { ContentIndex } from "@/lib/content-index";
import { Markdown } from "@/components/Markdown";
import { EmptyState, PageHeader, Pill, btn } from "@/components/ui";

const ORDER: VentureId[] = ["afterwave", "mizan", "suhail", "general", "mewre"];

interface Item {
  row?: WorkRow;
  questionId: string;
  prompt: string;
  title: string;
  venture: VentureId;
  moduleId: string;
  moduleTitle: string;
  lessonId?: string;
  lessonTitle?: string;
}

const firstSentence = (s: string) => s.replace(/[*_`$]/g, "").split(/(?<=[.:?])\s/)[0].slice(0, 160);

/** Every written ("produce it") exercise with the learner's latest submission, grouped by venture. */
export function buildItems(content: ContentIndex, work: Map<string, WorkRow>): Item[] {
  const mods = new Map(content.modules.map((m) => [m.id, m]));
  const lessons = new Map(content.lessons.map((l) => [l.id, l]));
  const items: Item[] = [];
  for (const [id, r] of Object.entries(content.questions)) {
    if (r.question.type !== "short") continue;
    const m = mods.get(r.moduleId);
    if (!m || m.draft) continue;
    const l = r.lessonId ? lessons.get(r.lessonId) : undefined;
    items.push({
      row: work.get(id),
      questionId: id,
      prompt: r.question.prompt,
      title: firstSentence(r.question.prompt),
      venture: ventureOf(r.moduleId, r.question.prompt),
      moduleId: r.moduleId,
      moduleTitle: m.title,
      lessonId: r.lessonId,
      lessonTitle: l?.title,
    });
  }
  return items;
}

/** Markdown export of the submitted work, one section per exercise. */
export function toMarkdown(items: Item[], heading: string): string {
  const out = [`# ${heading}`, "", `Exported ${new Date().toISOString().slice(0, 10)}.`, ""];
  for (const v of ORDER) {
    const done = items.filter((i) => i.venture === v && i.row);
    if (!done.length) continue;
    out.push(`## ${VENTURES[v].name === "your venture" ? "General" : VENTURES[v].name}`, "");
    for (const i of done) {
      const r = i.row!;
      out.push(`### ${i.title}`, "", `_${i.moduleTitle}${i.lessonTitle ? ` · ${i.lessonTitle}` : ""} · score ${Math.round(r.score * 100)} %${r.judgement !== undefined ? ` · judgement ${Math.round(r.judgement * 100)} %` : ""} · ${new Date(r.at).toISOString().slice(0, 10)} · version ${r.versions}_`, "");
      out.push("**Exercise**", "", i.prompt, "", "**My answer**", "", r.text, "");
      if (r.feedback) out.push("**Feedback**", "", r.feedback, "");
    }
  }
  return out.join("\n");
}

export function WorkView() {
  const { t, href } = useT();
  const store = useLearner();
  const content = useContent();
  const [venture, setVenture] = useState<VentureId | "all">("all");
  const [showTodo, setShowTodo] = useState(false);
  const [q, setQ] = useState("");
  const version = store?.version;
  const items = useMemo(
    () => (store && content ? buildItems(content, store.derived().work) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version, content],
  );
  if (!store || !content) return <div className="text-muted">{t("Loading…")}</div>;

  const s = q.toLowerCase().trim();
  const shown = items.filter((i) => (venture === "all" || i.venture === venture) && (showTodo ? !i.row : !!i.row) && (!s || `${i.prompt} ${i.row?.text ?? ""}`.toLowerCase().includes(s)));
  const counts = (v: VentureId) => ({ done: items.filter((i) => i.venture === v && i.row).length, total: items.filter((i) => i.venture === v).length });

  function download() {
    const md = toMarkdown(shown.filter((i) => i.row), venture === "all" ? "My work" : `My work · ${VENTURES[venture].name}`);
    const url = URL.createObjectURL(new Blob([md], { type: "text/markdown" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-work-${venture}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeader
        title={t("My work")}
        subtitle={t("Every written exercise is a real document for one of your ventures. Your latest version of each is kept here, with its score and feedback, ready to reuse.")}
      >
        <div className="flex flex-wrap gap-2">
          <button className={btn.ghost} onClick={download} disabled={showTodo || !shown.some((i) => i.row)}>
            {t("Download Markdown")}
          </button>
          <button className={btn.ghost} onClick={() => window.print()}>
            {t("Print")}
          </button>
        </div>
      </PageHeader>

      <div className="no-print mb-4 flex flex-wrap gap-2 text-sm">
        <button onClick={() => setVenture("all")} className={`rounded-lg border px-3 py-1.5 ${venture === "all" ? "border-accent bg-accent-soft text-accent" : "border-border bg-surface"}`}>
          {t("All")}
        </button>
        {ORDER.map((v) => {
          const c = counts(v);
          if (!c.total) return null;
          return (
            <button key={v} onClick={() => setVenture(v)} className={`rounded-lg border px-3 py-1.5 ${venture === v ? "border-accent bg-accent-soft text-accent" : "border-border bg-surface"}`}>
              {v === "general" ? t("General") : VENTURES[v].name} <span className="tabular-nums text-muted">{c.done}/{c.total}</span>
            </button>
          );
        })}
      </div>
      <div className="no-print mb-5 flex flex-wrap items-center gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("Search your work…")} dir="auto" className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={showTodo} onChange={(e) => setShowTodo(e.target.checked)} />
          {t("Show exercises not done yet")}
        </label>
      </div>

      {shown.length === 0 ? (
        <EmptyState title={showTodo ? t("Nothing left here") : t("No work yet")}>
          {showTodo ? t("Every exercise in this filter has a submission.") : t("Written exercises you submit in lessons and exams appear here. Use \"Do it with AI\" on any exercise to produce the real document.")}
        </EmptyState>
      ) : (
        <div className="space-y-3">
          {shown
            .sort((a, b) => (b.row?.at ?? 0) - (a.row?.at ?? 0))
            .map((i) => {
              const link = i.lessonId ? `/learn/${i.moduleId}/${i.lessonId}` : `/learn/${i.moduleId}/exam`;
              return (
                <details key={i.questionId} className="min-w-0 break-inside-avoid rounded-xl border border-border bg-surface p-4">
                  <summary className="cursor-pointer list-none">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                      <Pill tone="accent">{i.venture === "general" ? t("General") : VENTURES[i.venture].name}</Pill>
                      {i.row && <Pill tone={i.row.score >= 0.8 ? "ok" : i.row.score >= 0.5 ? "sun" : "danger"}>{Math.round(i.row.score * 100)} %</Pill>}
                      {i.row?.judgement !== undefined && <Pill tone="info">{t("Judgement {n} %", { n: Math.round(i.row.judgement * 100) })}</Pill>}
                      <span className="min-w-0 truncate">
                        {i.moduleTitle}
                        {i.lessonTitle ? ` · ${i.lessonTitle}` : ` · ${t("Module exam")}`}
                      </span>
                      {i.row && <span>· {new Date(i.row.at).toLocaleDateString()}</span>}
                      {i.row && i.row.versions > 1 && <span>· {t("{n} versions", { n: i.row.versions })}</span>}
                    </div>
                    <div className="mt-1.5 text-sm font-medium">{i.title}</div>
                  </summary>
                  <div className="mt-3 space-y-3 border-t border-border pt-3 text-sm [overflow-wrap:anywhere]">
                    <details>
                      <summary className="cursor-pointer text-muted">{t("Exercise")}</summary>
                      <Markdown className="prose-compact">{i.prompt}</Markdown>
                    </details>
                    {i.row ? (
                      <>
                        <div>
                          <div className="font-medium">{t("My answer")}</div>
                          <Markdown className="prose-compact">{i.row.text}</Markdown>
                        </div>
                        {i.row.aiDraft && (
                          <details>
                            <summary className="cursor-pointer text-muted">{t("AI first draft")}</summary>
                            <Markdown className="prose-compact">{i.row.aiDraft}</Markdown>
                          </details>
                        )}
                        {i.row.feedback && (
                          <div className="rounded-lg bg-surface-2 p-3">
                            <div className="font-medium">{t("Feedback")}</div>
                            <Markdown className="prose-compact">{i.row.feedback}</Markdown>
                          </div>
                        )}
                      </>
                    ) : null}
                    <div className="no-print flex flex-wrap gap-3">
                      <Link href={href(link)} className="text-accent">
                        {i.row ? t("Revise in the lesson") : t("Do this exercise")}
                      </Link>
                      <Link href={href(`/tutor?exercise=${encodeURIComponent(i.questionId)}`)} className="text-accent">
                        {t("Work on it with the tutor")}
                      </Link>
                    </div>
                  </div>
                </details>
              );
            })}
        </div>
      )}
    </div>
  );
}
