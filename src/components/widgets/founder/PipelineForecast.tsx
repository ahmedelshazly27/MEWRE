"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { forecastPipeline, salesVelocity, type PipelineStage } from "@/lib/calc/founder";
import { Card, ChartBox, Controls, Note, Slider, Split, Stat, Stats, axisLine, axisTick, fmt, gridProps, numProp, tooltipStyle, C, type WidgetProps } from "../ui";

const STAGES: Omit<PipelineStage, "deals" | "value">[] = [
  { name: "Discovery", probability: 0.1, monthsToClose: 9 },
  { name: "Qualified", probability: 0.2, monthsToClose: 7 },
  { name: "Technical eval", probability: 0.35, monthsToClose: 5 },
  { name: "Pilot", probability: 0.55, monthsToClose: 3 },
  { name: "Procurement", probability: 0.8, monthsToClose: 1 },
];

export default function PipelineForecast({ props }: WidgetProps) {
  const [acv, setAcv] = useState(numProp(props, "acv", 60_000, 1_000, 2_000_000));
  const [target, setTarget] = useState(numProp(props, "target", 600_000, 10_000, 20_000_000));
  const [deals, setDeals] = useState([14, 8, 5, 3, 1]);
  const [cycle, setCycle] = useState(180);

  const stages = useMemo(() => STAGES.map((s, i) => ({ ...s, deals: deals[i], value: acv })), [deals, acv]);
  const f = useMemo(() => forecastPipeline(stages, target), [stages, target]);
  const opps = deals.reduce((a, b) => a + b, 0);
  const winRate = opps ? f.weighted / (opps * acv) : 0;
  const velocity = salesVelocity(opps, winRate, acv, cycle);
  const data = f.byQuarter.map((v, i) => ({ q: `Q+${i}`, bookings: v / 1000 }));

  return (
    <Card title="Pipeline forecaster" subtitle="Deals per stage × stage probability = weighted pipeline; stage timing spreads expected bookings over the next four quarters">
      <Split>
        <Controls>
          <Slider label="Average ACV" value={acv} min={1_000} max={500_000} step={1_000} unit="USD" onChange={setAcv} />
          <Slider label="Annual bookings target" value={target} min={50_000} max={5_000_000} step={50_000} unit="USD" onChange={setTarget} />
          {STAGES.map((s, i) => (
            <Slider key={s.name} label={`${s.name} (p=${Math.round(s.probability * 100)}%)`} value={deals[i]} min={0} max={40} onChange={(v) => setDeals(deals.map((d, j) => (j === i ? v : d)))} />
          ))}
          <Slider label="Sales cycle" value={cycle} min={30} max={540} step={10} unit="days" onChange={setCycle} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={3}>
            <Stat label="Weighted pipeline" value={`$${fmt(f.weighted, 3)}`} tone="accent" />
            <Stat label="Coverage (unweighted)" value={`${fmt(f.coverage, 2)}×`} tone={f.coverage >= 3 ? "ok" : "warn"} note="3 to 4× is typical" />
            <Stat label="Weighted vs target" value={`${fmt(f.weightedCoverage * 100, 3)}%`} tone={f.weightedCoverage >= 1 ? "ok" : "danger"} />
            <Stat label="Implied win rate" value={`${fmt(winRate * 100, 3)}%`} />
            <Stat label="Sales velocity" value={`$${fmt(velocity, 3)}`} unit="/day" />
            <Stat label="Next-quarter forecast" value={`$${fmt(f.byQuarter[0], 3)}`} />
          </Stats>
          <ChartBox height={220}>
            <ResponsiveContainer>
              <BarChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="q" tick={axisTick} axisLine={axisLine} />
                <YAxis tick={axisTick} axisLine={axisLine} tickFormatter={(v) => `${v}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${fmt(Number(v), 3)}k`} />
                <ReferenceLine y={target / 4000} stroke={C.accent} strokeDasharray="4 3" label={{ value: "target / 4", fill: "var(--muted)", fontSize: 11 }} />
                <Bar dataKey="bookings" fill={C.c1} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
          <Note>Stage probabilities are illustrative for an early B2B deep-tech funnel; calibrate them from your own closed-won and closed-lost history. Velocity = opportunities × win rate × ACV / cycle days.</Note>
        </div>
      </Split>
    </Card>
  );
}
