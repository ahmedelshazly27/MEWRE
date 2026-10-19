"use client";

import { useMemo, useState } from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { soilingCost, optimalInterval, soilingSeries } from "@/lib/calc/soiling";
import {
  Card, Split, Controls, Slider, Stat, Stats, Hint, ChartBox, fmt, pct,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

export default function Soiling(_: WidgetProps) {
  const [rate, setRate] = useState(0.3);
  const [cap, setCap] = useState(15);
  const [mw, setMw] = useState(1000);
  const [yieldKwh, setYieldKwh] = useState(2300);
  const [tariff, setTariff] = useState(15);
  const [costKwp, setCostKwp] = useState(0.3);

  const inp = useMemo(
    () => ({ ratePct: rate, capPct: cap, annualEnergyMwh: mw * yieldKwh, tariff, costPerCleaning: costKwp * mw * 1000 }),
    [rate, cap, mw, yieldKwh, tariff, costKwp],
  );
  const best = useMemo(() => optimalInterval(inp, 1, 180), [inp]);
  const curve = useMemo(
    () =>
      Array.from({ length: 90 }, (_, k) => {
        const c = soilingCost(inp, k + 2);
        return { d: k + 2, cleaning: c.cleaningCost / 1e6, lost: c.lostRevenue / 1e6, total: c.totalCost / 1e6 };
      }),
    [inp],
  );
  const saw = useMemo(() => soilingSeries(120, rate, best.intervalDays, cap).map((v, d) => ({ d, loss: v })), [rate, best.intervalDays, cap]);

  return (
    <Card title="Soiling & cleaning optimiser" subtitle="Linear dust build-up, reset at each full-plant cleaning">
      <Split>
        <Controls>
          <Slider label="Soiling rate" value={rate} min={0.05} max={1.5} step={0.05} unit="%/day" onChange={setRate} />
          <Slider label="Soiling loss cap" value={cap} min={3} max={40} step={1} unit="%" onChange={setCap} />
          <Slider label="Plant size" value={mw} min={50} max={3000} step={50} unit="MWp" onChange={setMw} />
          <Slider label="Specific yield (clean)" value={yieldKwh} min={1600} max={2800} step={10} unit="kWh/kWp" onChange={setYieldKwh} />
          <Slider label="Energy value" value={tariff} min={5} max={80} step={0.5} unit="USD/MWh" onChange={setTariff} />
          <Slider label="Cost per cleaning cycle" value={costKwp} min={0.05} max={1.5} step={0.05} unit="USD/kWp" onChange={setCostKwp} />
          <Stats cols={2}>
            <Stat label="Optimal interval" value={fmt(best.intervalDays, 3)} unit="days" tone="accent" />
            <Stat label="Cleanings / year" value={fmt(best.cleaningsPerYear, 3)} />
            <Stat label="Average soiling loss" value={pct(best.avgLossPct / 100)} />
            <Stat label="Lost energy" value={fmt(best.lostEnergyMwh / 1000, 3)} unit="GWh/yr" />
            <Stat label="Lost revenue" value={fmt(best.lostRevenue / 1e6, 3)} unit="USD m/yr" />
            <Stat label="Total annual cost" value={fmt(best.totalCost / 1e6, 3)} unit="USD m/yr" tone="warn" />
          </Stats>
        </Controls>
        <div className="min-w-0 space-y-3">
          <ChartBox height={230}>
            <ResponsiveContainer>
              <LineChart data={curve} margin={{ top: 5, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="d" type="number" domain={[2, 91]} tick={axisTick} axisLine={axisLine} label={axisLabel("Cleaning interval (days)")} />
                <YAxis tick={axisTick} axisLine={axisLine} width={40} tickFormatter={(v: number) => fmt(v, 2)} label={axisLabel("USD m/yr", "insideLeft", -90)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `Every ${v} days`} formatter={(v: unknown, n: unknown) => [`${fmt(Number(v), 3)} USD m`, String(n)]} />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <ReferenceLine x={best.intervalDays} stroke={C.muted} strokeDasharray="4 3" />
                <Line dataKey="cleaning" name="Cleaning cost" stroke={C.c3} dot={false} strokeWidth={2} isAnimationActive={false} />
                <Line dataKey="lost" name="Lost revenue" stroke={C.c2} dot={false} strokeWidth={2} isAnimationActive={false} />
                <Line dataKey="total" name="Total" stroke={C.c1} dot={false} strokeWidth={2.5} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <ChartBox height={150}>
            <ResponsiveContainer>
              <AreaChart data={saw} margin={{ top: 5, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="d" tick={axisTick} axisLine={axisLine} label={axisLabel("Day")} />
                <YAxis tick={axisTick} axisLine={axisLine} width={40} label={axisLabel("loss %", "insideLeft", -90)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `Day ${v}`} formatter={(v: unknown) => [`${fmt(Number(v), 3)} %`, "Soiling loss"]} />
                <Area dataKey="loss" stroke={C.c2} fill={C.c2} fillOpacity={0.2} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: the optimum sits where the marginal cost of one more cleaning equals the revenue it recovers (roughly
            T* ≈ √(2·365·C / (r·E·price))). Kuwait dust events can multiply the soiling rate for days — real O&M schedules add event-driven
            cleans on top of the base cycle.
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
