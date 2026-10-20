"use client";

import { useMemo, useRef, useState } from "react";
import type { Simulation } from "@/content/schema";
import { Markdown } from "@/components/Markdown";
import { applyEffects, kpiScore, simScore } from "@/lib/sim";
import { uid } from "@/lib/api";
import { recordEvidence, saveRun } from "@/lib/store/actions";
import { btn, Pill, ProgressBar } from "@/components/ui";
import { useT } from "@/lib/useLang";
import { fwd } from "@/lib/i18n";

export function SimulationPlayer({ sim }: { sim: Simulation }) {
  const { lang, t } = useT();
  const decisions = useMemo(() => sim.stages.flatMap((st) => st.decisions.map((d) => ({ stage: st, d }))), [sim]);
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [state, setState] = useState<Record<string, number>>(sim.initial);
  const [choice, setChoice] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [log, setLog] = useState<{ id: string; option: number; score: number }[]>([]);
  const runId = useMemo(() => uid("sim"), []);
  const saved = useRef(false);
  const done = i >= decisions.length;
  const result = simScore(sim, state, log.map((l) => l.score));

  const restart = () => {
    setI(0);
    setState(sim.initial);
    setChoice(null);
    setRevealed(false);
    setLog([]);
    saved.current = false;
  };

  const confirm = () => {
    if (choice === null) return;
    const { d } = decisions[i];
    const opt = d.options[choice];
    setState(applyEffects(state, opt.effects));
    setLog([...log, { id: d.id, option: choice, score: opt.score }]);
    setRevealed(true);
  };

  const next = async () => {
    const ni = i + 1;
    setI(ni);
    setChoice(null);
    setRevealed(false);
    if (ni >= decisions.length && !saved.current) {
      saved.current = true;
      const r = simScore(sim, state, log.map((l) => l.score));
      try {
        await saveRun({ id: runId, kind: "sim", ref: sim.id, score: r.total, total: decisions.length, detail: { state, log, kpi: r.kpi, decisions: r.decisions } });
        for (const { d } of decisions) {
          const l = log.find((x) => x.id === d.id);
          if (l) await recordEvidence(d.concepts, l.score / 10, "sim");
        }
      } catch {}
    }
  };

  const Kpis = (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
      {sim.kpis.map((k) => {
        const v = state[k.key] ?? 0;
        const s = kpiScore(k, v);
        return (
          <div key={k.key} className="rounded-lg border border-border bg-surface p-2.5">
            <div className="text-xs text-muted">{k.label}</div>
            <div className="text-lg font-semibold tabular-nums">
              {Number.isInteger(v) ? v : v.toFixed(1)} <span className="text-xs font-normal text-muted">{k.unit}</span>
            </div>
            <ProgressBar value={s} tone={s >= 0.9 ? "ok" : s >= 0.7 ? "sun" : "danger"} className="mt-1" />
            <div className="mt-0.5 text-[10px] text-muted">
              {t("target")} {k.better === "lower" ? "≤" : "≥"} {k.target}
            </div>
          </div>
        );
      })}
    </div>
  );

  if (!started)
    return (
      <div className="rounded-xl border border-border bg-surface p-5">
        <Markdown>{sim.intro}</Markdown>
        <div className="mt-3 text-sm text-muted">
          {t("{s} stages · {d} decisions · scored 50% on final KPIs and 50% on decision quality.", { s: sim.stages.length, d: decisions.length })}
        </div>
        <button className={`${btn.primary} mt-4`} onClick={() => setStarted(true)}>
          {t("Start the simulation")}
        </button>
      </div>
    );

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
      <div className="min-w-0">
        {!done ? (
          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted">
              <Pill tone="accent">{decisions[i].stage.title}</Pill>
              <span>{t("Decision {n}/{total}", { n: i + 1, total: decisions.length })}</span>
            </div>
            {(i === 0 || decisions[i - 1].stage.id !== decisions[i].stage.id) && (
              <div className="mb-3 rounded-lg bg-surface-2 p-3">
                <Markdown className="prose-lesson prose-compact">{decisions[i].stage.brief}</Markdown>
              </div>
            )}
            <Markdown>{decisions[i].d.prompt}</Markdown>
            <div className="mt-3 space-y-2">
              {decisions[i].d.options.map((o, k) => {
                const isPicked = choice === k;
                const tone = revealed ? (isPicked ? (o.score >= 8 ? "border-ok bg-ok-soft" : o.score >= 5 ? "border-warn bg-warn-soft" : "border-danger bg-danger-soft") : "border-border opacity-70") : isPicked ? "border-accent bg-accent-soft" : "border-border hover:bg-surface-2";
                return (
                  <button key={k} disabled={revealed} onClick={() => setChoice(k)} className={`block w-full rounded-lg border px-3 py-2.5 text-start text-sm ${tone}`}>
                    {o.text}
                  </button>
                );
              })}
            </div>
            {revealed && choice !== null && (
              <div className="mt-3 rounded-lg bg-surface-2 p-3 text-sm">
                <div className="font-semibold">{t("Decision quality {n}/10", { n: decisions[i].d.options[choice].score })}</div>
                <Markdown className="prose-compact">{decisions[i].d.options[choice].feedback}</Markdown>
                <div className="mt-1 flex flex-wrap gap-2 text-xs">
                  {Object.entries(decisions[i].d.options[choice].effects).map(([k, v]) => (
                    <Pill key={k} tone="muted">
                      {sim.kpis.find((x) => x.key === k)?.label ?? k} {v > 0 ? "+" : ""}
                      {v}
                    </Pill>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4">
              {!revealed ? (
                <button className={btn.primary} disabled={choice === null} onClick={confirm}>
                  {t("Commit decision")}
                </button>
              ) : (
                <button className={btn.primary} onClick={next}>
                  {i + 1 < decisions.length ? `${t("Next")} ${fwd(lang)}` : t("See results")}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="text-sm text-muted">{t("Capstone result")}</div>
            <div className={`text-5xl font-semibold tabular-nums ${result.total >= 0.8 ? "text-ok" : result.total >= 0.6 ? "text-warn" : "text-danger"}`}>{Math.round(result.total * 100)}%</div>
            <div className="mt-1 text-sm text-muted">
              {t("KPIs {k}% · decision quality {d}%", { k: Math.round(result.kpi * 100), d: Math.round(result.decisions * 100) })}
            </div>
            <div className="mt-4">
              <Markdown>{sim.debrief}</Markdown>
            </div>
            <h3 className="mt-5 font-semibold">{t("Your decisions")}</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {log.map((l) => {
                const d = decisions.find((x) => x.d.id === l.id)!.d;
                const best = d.options.reduce((a, b) => (b.score > a.score ? b : a));
                return (
                  <li key={l.id} className="rounded-lg border border-border p-2">
                    <div className="font-medium">
                      {l.score}/10 — {d.options[l.option].text}
                    </div>
                    {d.options[l.option] !== best && <div className="text-muted">{t("Best: {x}", { x: best.text })}</div>}
                  </li>
                );
              })}
            </ul>
            <button className={`${btn.ghost} mt-4`} onClick={restart}>
              {t("Run it again")}
            </button>
          </div>
        )}
      </div>
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="mb-2 text-sm font-semibold">{t("Project KPIs")}</div>
        {Kpis}
      </aside>
    </div>
  );
}
