"use client";

import { useMemo, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { clipProfile, clippingLoss } from "@/lib/calc/yield";
import { dcProfileNormalized, KUWAIT_CLIMATE, DAYS_IN_MONTH } from "@/lib/calc/kuwait";
import {
  Card, Split, Controls, Slider, Stat, Stats, Hint, Note, ChartBox, numProp, fmt, pct,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

const STEP = 0.25;
const hours = Array.from({ length: 24 / STEP + 1 }, (_, k) => k * STEP);

/** Approximate monthly representative day: peak scales with clearness/season. */
function monthDay(m: number) {
  const g = KUWAIT_CLIMATE[m].ghi;
  const peak = 0.95 * (0.72 + 0.28 * (g / 8));
  const len = 10.3 + 3.5 * ((g - 3.1) / (8 - 3.1)); // day length proxy
  const mid = 11.9;
  return hours.map((h) => ({ hour: h, value: dcProfileNormalized(h, peak, mid - len / 2, mid + len / 2) }));
}

export default function DcAcRatio({ props }: WidgetProps) {
  const [ratio, setRatio] = useState(() => numProp(props, "ratio", 1.3, 1, 1.8));
  const [invCost, setInvCost] = useState(60);
  const [price, setPrice] = useState(17);
  const dcMw = 100;

  const day = useMemo(() => clipProfile(hours.map((h) => ({ hour: h, value: dcProfileNormalized(h, 0.95) })), ratio), [ratio]);
  const annual = useMemo(() => {
    let tot = 0;
    let clip = 0;
    for (let m = 0; m < 12; m++) {
      const pts = clipProfile(monthDay(m), ratio);
      const d = DAYS_IN_MONTH[m];
      tot += pts.reduce((s, p) => s + (p.acKw + p.clippedKw) * STEP, 0) * d;
      clip += pts.reduce((s, p) => s + p.clippedKw * STEP, 0) * d;
    }
    return { tot, clip, frac: tot ? clip / tot : 0 };
  }, [ratio]);

  const acMw = dcMw / ratio;
  const acSaved = dcMw - acMw; // vs ratio 1.0
  const clippedMwh = annual.clip * dcMw; // per-unit kWh/kWp × MWp = MWh
  const data = day.map((p) => ({ hour: p.hour, ac: p.acKw * dcMw, clipped: p.clippedKw * dcMw }));

  return (
    <Card title="DC/AC ratio and inverter clipping" subtitle="100 MWp DC array; inverter AC rating = DC ÷ ratio">
      <Split>
        <Controls>
          <Slider label="DC/AC ratio" value={ratio} min={1} max={1.8} step={0.01} onChange={setRatio} format={(v) => v.toFixed(2)} />
          <Slider label="Inverter + MV cost" value={invCost} min={20} max={150} step={5} unit="USD/kWac" onChange={setInvCost} />
          <Slider label="Energy value" value={price} min={5} max={80} step={0.5} unit="USD/MWh" onChange={setPrice} />
          <Stats cols={2}>
            <Stat label="AC capacity" value={fmt(acMw, 3)} unit="MWac" />
            <Stat label="Clipping (clear day)" value={pct(clippingLoss(day))} tone="warn" />
            <Stat label="Clipping (annual est.)" value={pct(annual.frac)} tone="warn" />
            <Stat label="Clipped energy" value={fmt(clippedMwh, 3)} unit="MWh/yr" />
            <Stat label="Lost revenue" value={fmt((clippedMwh * price) / 1000, 3)} unit="kUSD/yr" tone="danger" />
            <Stat label="Inverter capex saved" value={fmt((acSaved * 1000 * invCost) / 1e6, 3)} unit="USD m" tone="ok" note="vs ratio 1.00" />
          </Stats>
        </Controls>
        <div className="min-w-0">
          <ChartBox height={290}>
            <ResponsiveContainer>
              <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="hour" type="number" domain={[4, 20]} ticks={[4, 6, 8, 10, 12, 14, 16, 18, 20]} tickFormatter={(h: number) => `${h}:00`} tick={axisTick} axisLine={axisLine} label={axisLabel("Hour (clear-sky design day)")} />
                <YAxis domain={[0, 100]} tick={axisTick} axisLine={axisLine} width={36} label={axisLabel("MW", "insideLeft", -90)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `${fmt(Number(v), 3)} h`} formatter={(v: unknown, n: unknown) => [`${fmt(Number(v), 3)} MW`, String(n)]} />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <Area dataKey="ac" stackId="1" name="AC output" stroke={C.c1} fill={C.c1} fillOpacity={0.25} isAnimationActive={false} />
                <Area dataKey="clipped" stackId="1" name="Clipped" stroke={C.danger} fill={C.danger} fillOpacity={0.35} isAnimationActive={false} />
                <ReferenceLine y={acMw} stroke={C.muted} strokeDasharray="4 3" label={{ value: "inverter limit", fill: "var(--muted)", fontSize: 11, position: "insideTopRight" }} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: clipping only shaves the top of clear, cool middays, so a ratio of 1.2–1.35 loses little energy while cutting
            inverter, transformer and grid-connection capacity. Beyond ~1.4 the clipped energy grows quickly.
          </Hint>
        </div>
      </Split>
      <Note>Annual estimate uses 12 representative monthly days scaled from indicative Kuwait GHI; a full 8760-h simulation (PVsyst) is needed for design.</Note>
    </Card>
  );
}
