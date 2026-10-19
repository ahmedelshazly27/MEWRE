"use client";

import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { lossWaterfall, type LossStep } from "@/lib/calc/yield";
import { Card, Stat, Stats, Hint, Note, ChartBox, NumField, fmt, pct, axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, C, type WidgetProps } from "./ui";

const DEFAULT_STEPS: LossStep[] = [
  { label: "Transposition to POA (tracker)", pct: -27 },
  { label: "Near shading / backtracking", pct: 1.0 },
  { label: "IAM (angle of incidence)", pct: 2.0 },
  { label: "Soiling", pct: 3.0 },
  { label: "Bifacial rear-side gain", pct: -6.0 },
  { label: "Irradiance level", pct: 0.6 },
  { label: "Temperature", pct: 8.0 },
  { label: "Module quality / LID", pct: 1.5 },
  { label: "Mismatch", pct: 1.0 },
  { label: "DC wiring", pct: 1.0 },
  { label: "Inverter efficiency", pct: 1.5 },
  { label: "Inverter clipping", pct: 0.5 },
  { label: "AC wiring & transformers", pct: 1.5 },
  { label: "Availability", pct: 1.0 },
];

export default function LossWaterfall(_: WidgetProps) {
  const [ghi, setGhi] = useState(2150);
  const [mwp, setMwp] = useState(1250);
  const [steps, setSteps] = useState<LossStep[]>(DEFAULT_STEPS);

  const w = useMemo(() => lossWaterfall(ghi, steps), [ghi, steps]);
  const poa = ghi * (1 - steps[0].pct / 100);
  // PR relative to POA (front-side) irradiation
  const pr = w.final / poa;
  const data = [
    { name: "GHI", base: 0, value: ghi, kind: "total" },
    ...w.steps.map((s) => ({ name: s.label, base: Math.min(s.before, s.after), value: Math.abs(s.delta), kind: s.delta < 0 ? "loss" : "gain" })),
    { name: "Final yield", base: 0, value: w.final, kind: "total" },
  ];

  return (
    <Card title="Energy loss waterfall" subtitle="PVsyst-style chain from horizontal irradiation to grid-injected energy (multiplicative losses), in kWh/kWp">
      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="min-w-0 space-y-2">
          <NumField label="Annual GHI" value={ghi} onChange={(v) => setGhi(Math.max(1, v))} unit="kWh/m²" />
          <NumField label="DC capacity" value={mwp} onChange={(v) => setMwp(Math.max(0.001, v))} unit="MWp" />
          <div className="max-h-[360px] space-y-1 overflow-y-auto rounded-lg border border-border p-2">
            {steps.map((s, i) => (
              <NumField
                key={s.label}
                label={s.label}
                value={s.pct}
                step={0.1}
                unit={s.pct < 0 ? "% gain" : "% loss"}
                onChange={(v) => setSteps((st) => st.map((x, k) => (k === i ? { ...x, pct: v } : x)))}
              />
            ))}
          </div>
          <p className="text-xs text-muted">Negative values are gains.</p>
        </div>
        <div className="min-w-0">
          <Stats cols={4}>
            <Stat label="POA irradiation" value={fmt(poa, 4)} unit="kWh/m²" />
            <Stat label="Specific yield" value={fmt(w.final, 4)} unit="kWh/kWp" tone="accent" />
            <Stat label="Performance ratio" value={pct(pr)} tone="accent" note="vs front POA" />
            <Stat label="Annual energy" value={fmt((w.final * mwp) / 1000, 4)} unit="GWh" />
          </Stats>
          <ChartBox height={330}>
            <ResponsiveContainer>
              <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 4 }}>
                <CartesianGrid {...gridProps} vertical={false} />
                <XAxis dataKey="name" tick={{ ...axisTick, fontSize: 9 }} axisLine={axisLine} interval={0} angle={-50} textAnchor="end" height={110} />
                <YAxis tick={axisTick} axisLine={axisLine} width={44} tickFormatter={(v: number) => fmt(v, 3)} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={tooltipLabelStyle}
                  cursor={{ fill: "var(--surface-2)" }}
                  formatter={(v: unknown, n: unknown, item: { payload?: { kind: string } }) =>
                    n === "base" ? [null, null] : [`${fmt(Number(v), 3)} kWh/kWp`, item.payload?.kind === "total" ? "Value" : item.payload?.kind === "loss" ? "Loss" : "Gain"]
                  }
                />
                <Bar dataKey="base" stackId="w" fill="transparent" isAnimationActive={false} />
                <Bar dataKey="value" stackId="w" isAnimationActive={false} radius={[2, 2, 0, 0]}>
                  {data.map((d) => (
                    <Cell key={d.name} fill={d.kind === "total" ? C.c3 : d.kind === "loss" ? C.danger : C.ok} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: losses multiply rather than add, so the total loss is less than the sum of the percentages. In Kuwait the
            temperature and soiling bars are the big controllable ones — module choice, row spacing for airflow and cleaning strategy all show
            up here.
          </Hint>
        </div>
      </div>
      <Note>Default values are illustrative for a single-axis-tracked bifacial plant in Kuwait. A bankable estimate comes from an independent energy-yield assessment with site data.</Note>
    </Card>
  );
}
