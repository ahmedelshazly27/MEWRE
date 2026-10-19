"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";
import { capacityFactor } from "@/lib/calc/power";
import {
  Card, Split, Controls, NumField, Stat, Stats, Hint, Note, ChartBox, numProp, fmt, pct,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, C, type WidgetProps,
} from "./ui";

const RANGES = [
  { tech: "PV fixed tilt", lo: 18, hi: 22 },
  { tech: "PV 1-axis tracker", lo: 22, hi: 28 },
  { tech: "Onshore wind", lo: 25, hi: 45 },
  { tech: "CSP + storage", lo: 35, hi: 60 },
  { tech: "CCGT (mid-merit/base)", lo: 40, hi: 85 },
  { tech: "BESS 4 h (discharge)", lo: 12, hi: 17 },
].map((r) => ({ ...r, span: r.hi - r.lo }));

export default function CapacityFactor({ props }: WidgetProps) {
  const [mw, setMw] = useState(() => numProp(props, "mw", 1000, 0.001));
  const [mwh, setMwh] = useState(() => numProp(props, "mwh", 2_190_000, 0));
  const [hours, setHours] = useState(8760);
  const cf = capacityFactor(mwh, mw, hours);

  return (
    <Card title="Capacity factor" subtitle="CF = energy delivered ÷ (rated power × hours in period)">
      <Split>
        <Controls>
          <NumField label="Rated capacity" value={mw} onChange={(v) => setMw(Math.max(0.001, v))} unit="MW" />
          <NumField label="Energy in period" value={mwh} onChange={setMwh} unit="MWh" />
          <NumField label="Hours in period" value={hours} onChange={(v) => setHours(Math.max(1, v))} unit="h" />
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { l: "Year", h: 8760 },
              { l: "Leap year", h: 8784 },
              { l: "30-day month", h: 720 },
            ].map((x) => (
              <button key={x.l} type="button" onClick={() => setHours(x.h)} className="rounded-md border border-border bg-surface-2 px-2 py-1 text-muted hover:text-text">
                {x.l}
              </button>
            ))}
          </div>
          <Stats cols={2}>
            <Stat label="Capacity factor" value={pct(cf)} tone="accent" />
            <Stat label="Full-load hours" value={fmt(cf * hours, 4)} unit="h" />
            <Stat label="Average output" value={fmt(mwh / hours, 3)} unit="MW" />
            <Stat label="Specific yield" value={fmt((mwh * 1000) / (mw * 1000), 4)} unit="kWh/kW" />
          </Stats>
        </Controls>
        <div className="min-w-0">
          <ChartBox height={280}>
            <ResponsiveContainer>
              <BarChart data={RANGES} layout="vertical" margin={{ top: 5, right: 16, left: 4, bottom: 5 }}>
                <CartesianGrid {...gridProps} horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} tick={axisTick} axisLine={axisLine} />
                <YAxis type="category" dataKey="tech" width={120} tick={axisTick} axisLine={axisLine} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={tooltipLabelStyle}
                  cursor={{ fill: "var(--surface-2)" }}
                  formatter={(_v: unknown, _n: unknown, item: { payload?: { lo: number; hi: number } }) => [
                    item.payload ? `${item.payload.lo}–${item.payload.hi} %` : "",
                    "Typical range",
                  ]}
                />
                <Bar dataKey="lo" stackId="a" fill="transparent" tooltipType="none" isAnimationActive={false} />
                <Bar dataKey="span" stackId="a" radius={4} isAnimationActive={false}>
                  {RANGES.map((r, i) => (
                    <Cell key={r.tech} fill={[C.c2, C.c2, C.c3, C.c4, C.c5, C.c1][i]} fillOpacity={0.75} />
                  ))}
                </Bar>
                {Number.isFinite(cf) && <ReferenceLine x={Math.min(100, cf * 100)} stroke="var(--danger)" strokeWidth={2} label={{ value: "yours", fill: "var(--danger)", fontSize: 11, position: "top" }} />}
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: a PV plant&apos;s CF is limited by the sun, not by reliability — 25 % is excellent for PV but poor for gas. Compare
            capacity factors only within a technology; for firm supply look at when the energy arrives, not just how much.
          </Hint>
        </div>
      </Split>
      <Note>Ranges are indicative global/regional values (AC basis for PV). Kuwait desert PV with trackers typically sits at the upper end of the PV range.</Note>
    </Card>
  );
}
