"use client";

import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceDot, ReferenceLine } from "recharts";
import { betzCp, betzCt, BETZ_LIMIT } from "@/lib/calc/wind";
import {
  Card, Split, Controls, Slider, Stat, Stats, Hint, ChartBox, fmt, pct,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

export default function Betz(_: WidgetProps) {
  const [a, setA] = useState(0.25);
  const data = useMemo(() => Array.from({ length: 51 }, (_, n) => {
    const x = n / 100;
    return { a: x, cp: betzCp(x), ct: betzCt(x) };
  }), []);
  const cp = betzCp(a);

  return (
    <Card title="Betz limit — actuator disc theory" subtitle="Power coefficient Cp = 4a(1 − a)² vs axial induction factor a">
      <Split>
        <Controls>
          <Slider label="Axial induction factor a" value={a} min={0} max={0.5} step={0.005} onChange={setA} format={(v) => v.toFixed(3)} />
          <button type="button" onClick={() => setA(1 / 3)} className="self-start rounded-md border border-border bg-surface-2 px-2 py-1 text-xs text-muted hover:text-text">
            Jump to a = 1/3
          </button>
          <Stats cols={2}>
            <Stat label="Cp" value={fmt(cp, 4)} tone="accent" />
            <Stat label="% of Betz limit" value={pct(cp / BETZ_LIMIT)} />
            <Stat label="Ct (thrust)" value={fmt(betzCt(a), 3)} />
            <Stat label="Disc speed / free stream" value={fmt(1 - a, 3)} />
            <Stat label="Far-wake speed" value={fmt(1 - 2 * a, 3)} note="× free-stream" />
            <Stat label="Betz limit 16/27" value={fmt(BETZ_LIMIT, 4)} />
          </Stats>
        </Controls>
        <div className="min-w-0">
          <ChartBox height={280}>
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="a" type="number" domain={[0, 0.5]} ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5]} tick={axisTick} axisLine={axisLine} label={axisLabel("Axial induction factor a")} />
                <YAxis domain={[0, 1]} tick={axisTick} axisLine={axisLine} width={36} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `a = ${fmt(Number(v), 3)}`} formatter={(v: unknown, n: unknown) => [fmt(Number(v), 3), String(n)]} />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <ReferenceLine y={BETZ_LIMIT} stroke={C.muted} strokeDasharray="4 3" label={{ value: "16/27 ≈ 0.593", fill: "var(--muted)", fontSize: 11, position: "insideTopLeft" }} />
                <ReferenceLine x={1 / 3} stroke={C.muted} strokeDasharray="2 4" />
                <Line dataKey="cp" name="Cp (power)" stroke={C.c1} strokeWidth={2.5} dot={false} isAnimationActive={false} />
                <Line dataKey="ct" name="Ct (thrust)" stroke={C.c4} strokeWidth={1.8} strokeDasharray="5 3" dot={false} isAnimationActive={false} />
                <ReferenceDot x={a} y={cp} r={5} fill={C.c2} stroke="var(--surface)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: slowing the wind too little (small a) lets energy pass through; slowing it too much blocks the flow. The optimum
            is a = 1/3, giving Cp = 16/27 ≈ 59 %. Real rotors reach about 0.45–0.50 because of tip, drag and wake-rotation losses.
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
