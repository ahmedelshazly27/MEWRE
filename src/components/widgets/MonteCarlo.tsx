"use client";

import { useMemo, useState } from "react";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { simulateSchedule, simulateSum, histogram, type Estimate, type McSummary } from "@/lib/calc/montecarlo";
import { PV_NETWORK } from "./data";
import {
  Card, Segmented, Slider, Stat, Stats, Hint, ChartBox, fmt, pct,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, C, axisLabel, type WidgetProps,
} from "./ui";

type Mode = "schedule" | "cost";
type Row = { id: string; name: string } & Estimate;

const COST_ITEMS: Row[] = [
  { id: "c1", name: "PV modules", min: 150, likely: 165, max: 205 },
  { id: "c2", name: "Trackers & structures", min: 55, likely: 62, max: 80 },
  { id: "c3", name: "Inverters & MV skids", min: 40, likely: 44, max: 55 },
  { id: "c4", name: "Civil, piling & cabling", min: 55, likely: 62, max: 85 },
  { id: "c5", name: "Substation & grid link", min: 35, likely: 40, max: 58 },
  { id: "c6", name: "Development & owner's costs", min: 14, likely: 17, max: 26 },
];

export default function MonteCarlo(_: WidgetProps) {
  const [mode, setMode] = useState<Mode>("schedule");
  const [iters, setIters] = useState(3000);
  const [seed, setSeed] = useState(42);
  const [sched, setSched] = useState<Row[]>(() => PV_NETWORK.map((a) => ({ id: a.id, name: a.name, min: a.min, likely: a.duration, max: a.max })));
  const [cost, setCost] = useState<Row[]>(COST_ITEMS);
  const rows = mode === "schedule" ? sched : cost;
  const setRows = mode === "schedule" ? setSched : setCost;
  const unit = mode === "schedule" ? "weeks" : "USD m";

  const sim = useMemo((): McSummary & { criticality?: Record<string, number> } => {
    if (mode === "schedule") {
      const acts = PV_NETWORK.map((a) => {
        const r = sched.find((x) => x.id === a.id)!;
        return { ...a, duration: r.likely, estimate: { min: Math.min(r.min, r.likely), likely: r.likely, max: Math.max(r.max, r.likely) } };
      });
      return simulateSchedule(acts, iters, seed);
    }
    return simulateSum(cost.map((r) => ({ min: Math.min(r.min, r.likely), likely: r.likely, max: Math.max(r.max, r.likely) })), iters, seed);
  }, [mode, sched, cost, iters, seed]);

  const hist = useMemo(() => histogram(sim.samples, 30).map((b) => ({ x: b.mid, count: b.count / sim.samples.length, cum: b.cum })), [sim]);
  const pMeetDet = sim.sorted.filter((x) => x <= sim.deterministic + 1e-9).length / sim.sorted.length;

  const edit = (id: string, key: keyof Estimate, v: number) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [key]: v } : r)));

  return (
    <Card title="Monte Carlo schedule & cost risk" subtitle="Triangular (min / most likely / max) estimates, seeded random sampling">
      <div className="mb-3 flex flex-wrap items-center gap-4">
        <Segmented value={mode} onChange={setMode} options={[{ value: "schedule", label: "Schedule (CPM network)" }, { value: "cost", label: "Cost (sum of items)" }]} />
      </div>
      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="min-w-0">
          <div className="max-h-[340px] overflow-y-auto rounded-lg border border-border">
            <table className="w-full table-fixed text-sm">
              <thead className="sticky top-0 bg-surface-2 text-xs text-muted">
                <tr>
                  <th className="px-2 py-1 text-left font-normal">{mode === "schedule" ? "Activity" : "Cost item"}</th>
                  <th className="w-14 px-1 py-1 font-normal">min</th>
                  <th className="w-14 px-1 py-1 font-normal">likely</th>
                  <th className="w-14 px-1 py-1 font-normal">max</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="truncate px-2 py-1" title={r.name}>
                      {mode === "schedule" && sim.criticality ? (
                        <span className="mr-1 font-mono text-[0.7rem] text-muted" title="criticality index">{Math.round((sim.criticality?.[r.id] ?? 0) * 100)}%</span>
                      ) : null}
                      {r.name}
                    </td>
                    {(["min", "likely", "max"] as const).map((k) => (
                      <td key={k} className="px-1 py-1">
                        <input
                          type="number"
                          value={r[k]}
                          min={0}
                          aria-label={`${r.name} ${k}`}
                          onChange={(e) => {
                            const v = Number(e.target.value);
                            if (Number.isFinite(v) && v >= 0) edit(r.id, k, v);
                          }}
                          className="w-full rounded border border-border bg-surface-2 px-1 py-0.5 text-right font-mono text-[0.8rem]"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {mode === "schedule" && <p className="mt-1 text-xs text-muted">% = criticality index (share of runs in which the activity was on the critical path).</p>}
          <div className="mt-3 space-y-3">
            <Slider label="Iterations" value={iters} min={500} max={10000} step={500} onChange={setIters} />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted">Seed {seed}</span>
              <button type="button" onClick={() => setSeed((s) => (s * 16807) % 2147483647)} className="rounded-md border border-border bg-surface-2 px-2 py-1 text-xs text-muted hover:text-text">
                Re-run with new seed
              </button>
            </div>
          </div>
        </div>
        <div className="min-w-0">
          <Stats cols={4}>
            <Stat label="Deterministic (likely)" value={fmt(sim.deterministic, 4)} unit={unit} />
            <Stat label="P50" value={fmt(sim.p50, 4)} unit={unit} tone="accent" />
            <Stat label="P80" value={fmt(sim.p80, 4)} unit={unit} tone="warn" />
            <Stat label="P90" value={fmt(sim.p90, 4)} unit={unit} tone="danger" />
            <Stat label="P10" value={fmt(sim.p10, 4)} unit={unit} />
            <Stat label="Mean" value={fmt(sim.mean, 4)} unit={unit} />
            <Stat label="P(≤ deterministic)" value={pct(pMeetDet, 0)} tone={pMeetDet < 0.3 ? "danger" : "default"} />
            <Stat label="P80 contingency" value={fmt(sim.p80 - sim.deterministic, 3)} unit={unit} />
          </Stats>
          <ChartBox height={270}>
            <ResponsiveContainer>
              <ComposedChart data={hist} margin={{ top: 14, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="x" type="number" domain={["dataMin", "dataMax"]} tickFormatter={(v: number) => fmt(v, 3)} tick={axisTick} axisLine={axisLine} label={axisLabel(mode === "schedule" ? "Project duration (weeks)" : "Total cost (USD m)")} />
                <YAxis yAxisId="h" tickFormatter={(v: number) => `${Math.round(v * 100)}%`} tick={axisTick} axisLine={axisLine} width={36} />
                <YAxis yAxisId="c" orientation="right" domain={[0, 1]} tickFormatter={(v: number) => `${Math.round(v * 100)}%`} tick={axisTick} axisLine={axisLine} width={38} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `${fmt(Number(v), 4)} ${unit}`} formatter={(v: unknown, n: unknown) => [pct(Number(v)), n === "count" ? "Frequency" : "Cumulative"]} />
                <Bar yAxisId="h" dataKey="count" fill={C.c1} fillOpacity={0.6} isAnimationActive={false} />
                <Line yAxisId="c" dataKey="cum" stroke={C.c2} strokeWidth={2} dot={false} isAnimationActive={false} />
                <ReferenceLine yAxisId="h" x={sim.deterministic} stroke={C.muted} strokeDasharray="4 3" label={{ value: "det.", fill: "var(--muted)", fontSize: 10, position: "top" }} />
                <ReferenceLine yAxisId="h" x={sim.p50} stroke={C.accent} label={{ value: "P50", fill: "var(--accent)", fontSize: 10, position: "top" }} />
                <ReferenceLine yAxisId="h" x={sim.p80} stroke={C.warn} label={{ value: "P80", fill: "var(--warn)", fontSize: 10, position: "top" }} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: the single-point &ldquo;most likely&rdquo; plan usually has well under 50 % chance of being met, because estimates
            are skewed to the right and parallel paths merge (merge bias). Budget and promise dates at P80, not at the deterministic value.
          </Hint>
        </div>
      </div>
    </Card>
  );
}
