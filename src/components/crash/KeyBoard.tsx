"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Markdown } from "@/components/Markdown";
import { gradeCard } from "@/lib/store/actions";
import { useLearner } from "@/lib/store/react";
import { getStore } from "@/lib/store/store";
import { useT } from "@/lib/useLang";
import { btn, Card, Pill, ProgressBar } from "@/components/ui";

export interface KeyDto {
  id: string;
  module: string;
  moduleNumber: number;
  moduleTitle: string;
  lesson: string;
  lessonTitle: string;
  tier: 1 | 2;
  term: string;
  termAr: string;
  definition: string;
  explain: string;
  picture: string;
  why: string;
  example?: string;
  confusion?: string;
}

type CrashDoc = { known?: string[] } & Record<string, unknown>;
const DOC = "crash";

export function useKnown() {
  const store = useLearner();
  const doc: CrashDoc = store?.doc<CrashDoc>(DOC) ?? {};
  const known = new Set(doc.known ?? []);
  const set = async (id: string, on: boolean) => {
    const cur = getStore().doc<CrashDoc>(DOC) ?? {};
    const list = new Set(cur.known ?? []);
    if (on) list.add(id);
    else list.delete(id);
    await getStore().setDoc(DOC, { ...cur, known: [...list] });
  };
  return { ready: !!store, known, set };
}

function Field({ label, icon, children, tone = "" }: { label: string; icon: string; children: string; tone?: string }) {
  return (
    <div className={`rounded-lg px-3 py-2 ${tone}`}>
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">
        <span className="me-1">{icon}</span>
        {label}
      </div>
      <Markdown className="prose-lesson prose-compact">{children}</Markdown>
    </div>
  );
}

export function KeyCard({ k, mode, known, onKnown }: { k: KeyDto; mode: "study" | "test"; known: boolean; onKnown: (on: boolean) => void }) {
  const { t, lang, href } = useT();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [mode]);
  const showAll = mode === "study" || open;
  return (
    <article id={k.id} className={`scroll-mt-20 rounded-xl border bg-surface p-4 ${known ? "border-ok/50" : "border-border"}`}>
      <div className="flex flex-wrap items-start gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold leading-snug">{lang === "ar" ? k.termAr : k.term}</h3>
          <div className="text-sm text-muted" dir={lang === "ar" ? "ltr" : "rtl"} lang={lang === "ar" ? "en" : "ar"}>
            {lang === "ar" ? k.term : k.termAr}
          </div>
        </div>
        {k.tier === 1 ? <Pill tone="danger">{t("Must know")}</Pill> : <Pill>{t("Good to know")}</Pill>}
        {known && <Pill tone="ok">✓ {t("I can explain it")}</Pill>}
      </div>

      {showAll ? (
        <div className="mt-3 space-y-2">
          <div className="rounded-lg border-s-4 border-accent bg-accent-soft/40 px-3 py-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-accent">{t("Memorize")}</div>
            <Markdown className="prose-lesson prose-compact">{k.definition}</Markdown>
          </div>
          <Field label={t("Say it like this")} icon="🗣️">
            {k.explain}
          </Field>
          <Field label={t("Picture it")} icon="🖼️">
            {k.picture}
          </Field>
          <Field label={t("Why it matters")} icon="🧭">
            {k.why}
          </Field>
          {k.example && (
            <Field label={t("Example")} icon="🔢" tone="bg-surface-2">
              {k.example}
            </Field>
          )}
          {k.confusion && (
            <Field label={t("Don't confuse")} icon="⚠️" tone="bg-warn-soft/40">
              {k.confusion}
            </Field>
          )}
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted">{t("Say the definition and explain it out loud, with an example, before you reveal.")}</p>
      )}

      <div className="no-print mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
        {mode === "test" && !open ? (
          <button className={btn.primary} onClick={() => setOpen(true)}>
            {t("Reveal")}
          </button>
        ) : mode === "test" ? (
          <>
            <button
              className={btn.ghost}
              onClick={() => {
                onKnown(false);
                void gradeCard(`kc-${k.id}`, 1);
                setOpen(false);
              }}
            >
              {t("Not yet")}
            </button>
            <button
              className={btn.primary}
              onClick={() => {
                onKnown(true);
                void gradeCard(`kc-${k.id}`, 3);
                setOpen(false);
              }}
            >
              {t("I could explain it")}
            </button>
          </>
        ) : (
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={known} onChange={(e) => onKnown(e.target.checked)} />
            {t("I can explain it")}
          </label>
        )}
        <Link href={href(`/learn/${k.module}/${k.lesson}`)} className="ms-auto text-xs text-muted hover:text-accent">
          {t("Taught in")}: {k.lessonTitle}
        </Link>
      </div>
    </article>
  );
}

export function KeyBoard({ concepts }: { concepts: KeyDto[] }) {
  const { t } = useT();
  const { ready, known, set } = useKnown();
  const [mod, setMod] = useState<string>("all");
  const [mustOnly, setMustOnly] = useState(false);
  const [hideKnown, setHideKnown] = useState(false);
  const [mode, setMode] = useState<"study" | "test">("study");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const m = q.get("m");
    if (m && concepts.some((k) => k.module === m)) setMod(m);
    if (q.get("mode") === "test") setMode("test");
  }, [concepts]);

  const modules = useMemo(() => {
    const seen = new Map<string, { id: string; number: number; title: string }>();
    for (const k of concepts) if (!seen.has(k.module)) seen.set(k.module, { id: k.module, number: k.moduleNumber, title: k.moduleTitle });
    return [...seen.values()];
  }, [concepts]);

  const shown = concepts.filter((k) => (mod === "all" || k.module === mod) && (!mustOnly || k.tier === 1) && (!hideKnown || !known.has(k.id)));
  const scope = concepts.filter((k) => mod === "all" || k.module === mod);
  const must = scope.filter((k) => k.tier === 1);
  const knownMust = must.filter((k) => known.has(k.id)).length;
  const knownAll = scope.filter((k) => known.has(k.id)).length;

  return (
    <>
      <Card className="no-print mb-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">{t("Must know — can explain")}</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">
              {ready ? knownMust : "–"}/{must.length}
            </div>
            <ProgressBar value={must.length ? knownMust / must.length : 0} tone="ok" className="mt-1.5" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">{t("All concepts — can explain")}</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">
              {ready ? knownAll : "–"}/{scope.length}
            </div>
            <ProgressBar value={scope.length ? knownAll / scope.length : 0} className="mt-1.5" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <select value={mod} onChange={(e) => setMod(e.target.value)} className="min-w-0 rounded-lg border border-border bg-bg px-2 py-1.5" aria-label={t("Module")}>
            <option value="all">{t("All modules")}</option>
            {modules.map((m) => (
              <option key={m.id} value={m.id}>
                M{m.number} · {m.title}
              </option>
            ))}
          </select>
          <div className="inline-flex overflow-hidden rounded-lg border border-border" role="radiogroup">
            {(["study", "test"] as const).map((m) => (
              <button key={m} role="radio" aria-checked={mode === m} onClick={() => setMode(m)} className={`px-3 py-1.5 ${mode === m ? "bg-accent text-white dark:text-black" : "hover:bg-surface-2"}`}>
                {m === "study" ? t("Study") : t("Self-test")}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={mustOnly} onChange={(e) => setMustOnly(e.target.checked)} />
            {t("Must know only")}
          </label>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={hideKnown} onChange={(e) => setHideKnown(e.target.checked)} />
            {t("Hide the ones I can explain")}
          </label>
        </div>
        <p className="mt-2 text-xs text-muted">{t("Self-test: say it out loud, reveal, then be honest. Your answers schedule each concept in your daily review, so the shaky ones come back.")}</p>
      </Card>

      {modules
        .filter((m) => shown.some((k) => k.module === m.id))
        .map((m) => (
          <section key={m.id} className="mb-8">
            <h2 className="mb-3 text-xl font-semibold tracking-tight">
              M{m.number} · {m.title}
            </h2>
            <div className="grid gap-4">
              {shown
                .filter((k) => k.module === m.id)
                .map((k) => (
                  <KeyCard key={k.id} k={k} mode={mode} known={known.has(k.id)} onKnown={(on) => void set(k.id, on)} />
                ))}
            </div>
          </section>
        ))}
      {shown.length === 0 && <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted">{t("Nothing left here — you can explain all of them.")}</div>}
    </>
  );
}
