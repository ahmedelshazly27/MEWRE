"use client";

import { useMemo, useState } from "react";
import { cpm, CycleError } from "@/lib/calc/cpm";
import { PV_NETWORK } from "./data";
import { Card, Stat, Stats, Hint, fmt, type WidgetProps } from "./ui";

export default function CpmGantt(_: WidgetProps) {
  const [dur, setDur] = useState<Record<string, number>>(() => Object.fromEntries(PV_NETWORK.map((a) => [a.id, a.duration])));
  const [sel, setSel] = useState<string | null>(null);

  const result = useMemo(() => {
    try {
      return { ok: true as const, r: cpm(PV_NETWORK.map((a) => ({ ...a, duration: dur[a.id] }))) };
    } catch (e) {
      return { ok: false as const, msg: e instanceof CycleError ? e.message : String(e) };
    }
  }, [dur]);

  const base = useMemo(() => cpm(PV_NETWORK).duration, []);
  if (!result.ok) return <Card title="Critical path (CPM)"><p className="text-danger">{result.msg}</p></Card>;
  const r = result.r;

  const labelW = 150;
  const rowH = 24;
  const W = 720;
  const chartW = W - labelW - 10;
  const span = Math.max(r.duration, 1);
  const sx = (t: number) => labelW + (t / span) * chartW;
  const H = PV_NETWORK.length * rowH + 30;
  const tickStep = span > 80 ? 20 : 10;
  const ticks: number[] = [];
  for (let t = 0; t <= span; t += tickStep) ticks.push(t);
  const selA = sel ? r.byId[sel] : null;

  return (
    <Card title="Critical path method — 1 GW PV project network" subtitle="Durations in weeks; edit them to see the critical path move">
      <div className="min-w-0">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Gantt chart">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={sx(t)} y1={4} x2={sx(t)} y2={H - 18} stroke="var(--chart-grid)" />
              <text x={sx(t)} y={H - 5} fontSize={10} textAnchor="middle" fill="var(--muted)">{t}</text>
            </g>
          ))}
          {r.activities.map((a, i) => {
            const y = 6 + i * rowH;
            const crit = a.critical;
            return (
              <g key={a.id} onClick={() => setSel(a.id)} className="cursor-pointer">
                <rect x={0} y={y - 2} width={W} height={rowH} fill={sel === a.id ? "var(--accent-soft)" : "transparent"} opacity={0.6} />
                <text x={4} y={y + 13} fontSize={11} fill="var(--text)">
                  {a.id} · {(a as typeof a & { name: string }).name}
                </text>
                {a.totalFloat > 0 && (
                  <rect x={sx(a.ef)} y={y + 6} width={sx(a.ef + a.totalFloat) - sx(a.ef)} height={8} fill="none" stroke="var(--muted)" strokeDasharray="3 2" rx={2} />
                )}
                <rect x={sx(a.es)} y={y + 2} width={Math.max(2, sx(a.ef) - sx(a.es))} height={16} rx={3} fill={crit ? "var(--danger)" : "var(--chart-1)"} fillOpacity={crit ? 0.85 : 0.7} />
                <text x={sx(a.es) + 4} y={y + 14} fontSize={10} fill="var(--surface)" style={{ pointerEvents: "none" }}>
                  {sx(a.ef) - sx(a.es) > 22 ? a.duration : ""}
                </text>
              </g>
            );
          })}
          <text x={labelW} y={H - 5} fontSize={10} fill="var(--muted)" textAnchor="end">week</text>
        </svg>
        <div className="mt-1 flex flex-wrap gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1"><span className="inline-block h-2.5 w-4 rounded-sm bg-danger" /> critical</span>
          <span className="inline-flex items-center gap-1"><span className="inline-block h-2.5 w-4 rounded-sm" style={{ background: "var(--chart-1)" }} /> non-critical</span>
          <span className="inline-flex items-center gap-1"><span className="inline-block h-2.5 w-4 rounded-sm border border-dashed border-muted" /> total float</span>
        </div>
        <Hint>
          What to notice: only the red chain drives completion. Shortening a non-critical activity changes nothing; delaying it beyond its float
          makes it critical. In real PV projects the grid connection and HV substation often become critical because the utility controls them.
        </Hint>
      </div>

      <div className="mt-4 grid min-w-0 gap-4 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-1.5 text-sm min-[420px]:grid-cols-2">
          {PV_NETWORK.map((a) => (
            <label key={a.id} className="flex min-w-0 items-center justify-between gap-2">
              <span className={`truncate ${r.byId[a.id].critical ? "text-danger" : "text-muted"}`} title={a.name}>
                {a.id} {a.name}
              </span>
              <input
                type="number"
                min={0}
                max={200}
                value={dur[a.id]}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (Number.isFinite(v) && v >= 0) setDur((d) => ({ ...d, [a.id]: v }));
                }}
                onFocus={() => setSel(a.id)}
                className="w-16 shrink-0 rounded-md border border-border bg-surface-2 px-2 py-0.5 text-right font-mono text-[0.85rem]"
              />
            </label>
          ))}
          <button type="button" onClick={() => setDur(Object.fromEntries(PV_NETWORK.map((a) => [a.id, a.duration])))} className="mt-1 justify-self-start rounded-md border border-border bg-surface-2 px-2 py-1 text-xs text-muted hover:text-text">
            Reset durations
          </button>
        </div>
        <div className="min-w-0 space-y-2">
          <Stats cols={2}>
            <Stat label="Project duration" value={fmt(r.duration, 3)} unit="weeks" tone="accent" />
            <Stat label="vs baseline" value={`${r.duration - base >= 0 ? "+" : "−"}${fmt(Math.abs(r.duration - base), 3)}`} unit="weeks" tone={r.duration > base ? "danger" : "ok"} />
          </Stats>
          <div className="rounded-lg border border-border bg-surface-2 p-3 text-sm">
            <div className="text-xs text-muted">Critical path</div>
            <div className="font-mono">{r.criticalPath.join(" → ")}</div>
          </div>
          {selA && (
            <div className="rounded-lg border border-border bg-surface-2 p-3 text-sm">
              <div className="font-medium">{selA.id} · {PV_NETWORK.find((a) => a.id === selA.id)?.name}</div>
              <div className="mt-1 grid grid-cols-3 gap-1 font-mono text-xs">
                <span>ES {selA.es}</span><span>EF {selA.ef}</span><span>TF {selA.totalFloat}</span>
                <span>LS {selA.ls}</span><span>LF {selA.lf}</span><span>FF {selA.freeFloat}</span>
              </div>
              <div className="mt-1 text-xs text-muted">
                Predecessors: {(PV_NETWORK.find((a) => a.id === selA.id)?.preds ?? []).map(String).join(", ") || "none"}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
