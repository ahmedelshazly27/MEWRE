"use client";

import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { degradationSeries } from "@/lib/calc/pv";
import {
  Card, Split, Controls, Slider, Stat, Stats, Hint, ChartBox, numProp, fmt, pct,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

/** Accept % per year (0.5) or fraction (0.005). */
const ratePct = (v: number) => (v < 0.05 ? v * 100 : v);

export default function Degradation({ props }: WidgetProps) {
  const [rate, setRate] = useState(() => ratePct(numProp(props, "rate", 0.5)));
  const [lid, setLid] = useState(1.5);
  const [wFirst, setWFirst] = useState(1.0);
  const [wRate, setWRate] = useState(0.4);
  const years = 30;

  const data = useMemo(() => {
    const exp = degradationSeries(years, lid / 100, rate / 100);
    const war = degradationSeries(years, wFirst / 100, wRate / 100);
    return exp.map((e, y) => ({ year: y, expected: e * 100, warranty: war[y] * 100 }));
  }, [rate, lid, wFirst, wRate]);

  const y25 = data[25].expected / 100;
  const y30 = data[30].expected / 100;
  const avg = data.slice(1).reduce((s, d) => s + d.expected, 0) / years / 100;
  const breach = data.find((d) => d.year > 0 && d.expected < d.warranty - 1e-9);

  return (
    <Card title="Module degradation vs warranty" subtitle="First-year loss (LID/LeTID) then linear annual decline, 30 years">
      <Split>
        <Controls>
          <Slider label="Expected annual degradation" value={rate} min={0.2} max={1.2} step={0.05} unit="%/yr" onChange={setRate} />
          <Slider label="Expected first-year loss" value={lid} min={0} max={4} step={0.1} unit="%" onChange={setLid} />
          <Slider label="Warranty first-year loss" value={wFirst} min={0} max={3} step={0.1} unit="%" onChange={setWFirst} />
          <Slider label="Warranty annual loss" value={wRate} min={0.25} max={0.8} step={0.05} unit="%/yr" onChange={setWRate} />
          <Stats cols={2}>
            <Stat label="Capacity year 25" value={pct(y25)} />
            <Stat label="Capacity year 30" value={pct(y30)} />
            <Stat label="Lifetime average" value={pct(avg)} tone="accent" note="energy factor" />
            <Stat label="Warranty claim from" value={breach ? `year ${breach.year}` : "none"} tone={breach ? "danger" : "ok"} />
          </Stats>
        </Controls>
        <div className="min-w-0">
          <ChartBox height={290}>
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="year" tick={axisTick} axisLine={axisLine} label={axisLabel("Year")} />
                <YAxis domain={[75, 100]} tick={axisTick} axisLine={axisLine} width={36} tickFormatter={(v: number) => `${v}%`} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `Year ${v}`} formatter={(v: unknown, n: unknown) => [`${fmt(Number(v), 3)} %`, String(n)]} />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <Line dataKey="warranty" name="Warranted minimum" stroke={C.muted} strokeDasharray="5 4" strokeWidth={1.8} dot={false} isAnimationActive={false} />
                <Line dataKey="expected" name="Expected power" stroke={C.c1} strokeWidth={2.5} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: a 0.1 %/yr difference in degradation compounds to ~3 % less energy by year 30. Hot climates accelerate
            degradation, so check that the warranty&apos;s linear line actually sits below your expected curve — and that you could prove a
            claim (baseline flash tests, monitoring data).
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
