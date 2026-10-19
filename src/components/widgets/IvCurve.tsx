"use client";

import { useMemo, useState } from "react";
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Legend } from "recharts";
import { ivCurve, mpp, cellTempNoct } from "@/lib/calc/pv";
import {
  Card, Split, Controls, Slider, Stat, Stats, Hint, ChartBox, numProp, fmt, pct,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

export default function IvCurve({ props }: WidgetProps) {
  const [g, setG] = useState(() => numProp(props, "irradiance", 1000, 0, 1200));
  const [t, setT] = useState(() => numProp(props, "temperature", 25, -10, 90));

  const data = useMemo(() => {
    const cur = ivCurve(g, t, 80);
    const stc = ivCurve(1000, 25, 80);
    // merge on a common voltage grid (0..50 V)
    const n = 80;
    const vmax = Math.max(cur[cur.length - 1].v, stc[stc.length - 1].v);
    const interp = (arr: { v: number; i: number }[], v: number) => {
      if (v > arr[arr.length - 1].v) return null;
      for (let k = 1; k < arr.length; k++) {
        if (arr[k].v >= v) {
          const a = arr[k - 1];
          const b = arr[k];
          const f = b.v === a.v ? 0 : (v - a.v) / (b.v - a.v);
          return a.i + f * (b.i - a.i);
        }
      }
      return 0;
    };
    return Array.from({ length: n + 1 }, (_, k) => {
      const v = (vmax * k) / n;
      const i = interp(cur, v);
      const is = interp(stc, v);
      return { v, i, p: i == null ? null : i * v, iStc: is, pStc: is == null ? null : is * v };
    });
  }, [g, t]);

  const m = useMemo(() => mpp(g, t), [g, t]);
  const stc = useMemo(() => mpp(1000, 25), []);

  return (
    <Card title="PV module I-V and P-V curves" subtitle="Single-diode model of a generic ~565 W module (144 half-cut cells)">
      <Split>
        <Controls>
          <Slider label="Irradiance G" value={g} min={0} max={1200} step={10} unit="W/m²" onChange={setG} />
          <Slider label="Cell temperature" value={t} min={-10} max={90} step={1} unit="°C" onChange={setT} />
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { l: "STC", g: 1000, t: 25 },
              { l: "Kuwait winter noon", g: 900, t: Math.round(cellTempNoct(20, 900)) },
              { l: "Kuwait summer noon", g: 1000, t: Math.round(cellTempNoct(47, 1000)) },
              { l: "Dust haze", g: 450, t: 55 },
            ].map((p) => (
              <button
                key={p.l}
                type="button"
                onClick={() => {
                  setG(p.g);
                  setT(p.t);
                }}
                className="rounded-md border border-border bg-surface-2 px-2 py-1 text-muted hover:text-text"
              >
                {p.l}
              </button>
            ))}
          </div>
          <Stats cols={2}>
            <Stat label="Pmp" value={fmt(m.pmp, 3)} unit="W" tone="accent" />
            <Stat label="vs STC" value={pct(m.pmp / stc.pmp - 1)} tone={m.pmp < stc.pmp ? "danger" : "ok"} />
            <Stat label="Voc" value={fmt(m.voc, 3)} unit="V" />
            <Stat label="Isc" value={fmt(m.isc, 3)} unit="A" />
            <Stat label="Vmp" value={fmt(m.vmp, 3)} unit="V" />
            <Stat label="Imp" value={fmt(m.imp, 3)} unit="A" />
            <Stat label="Fill factor" value={fmt(m.ff, 3)} />
            <Stat label="Efficiency" value={pct(m.pmp / (Math.max(g, 1) * 2.58), 1)} note="2.58 m² module" />
          </Stats>
        </Controls>
        <div className="min-w-0">
          <ChartBox height={300}>
            <ResponsiveContainer>
              <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="v" type="number" domain={[0, "dataMax"]} tickFormatter={(v: number) => fmt(v, 2)} tick={axisTick} axisLine={axisLine} label={axisLabel("Voltage (V)")} />
                <YAxis yAxisId="i" domain={[0, 16]} tick={axisTick} axisLine={axisLine} width={36} label={axisLabel("A", "insideLeft", -90)} />
                <YAxis yAxisId="p" orientation="right" domain={[0, 700]} tick={axisTick} axisLine={axisLine} width={40} label={axisLabel("W", "insideRight", 90)} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={tooltipLabelStyle}
                  labelFormatter={(v: unknown) => `${fmt(Number(v), 3)} V`}
                  formatter={(v: unknown, name: unknown) => [fmt(Number(v), 3), String(name)]}
                />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <Line yAxisId="i" dataKey="iStc" name="I @ STC (A)" stroke={C.muted} strokeDasharray="4 4" dot={false} strokeWidth={1} isAnimationActive={false} />
                <Line yAxisId="i" dataKey="i" name="Current (A)" stroke={C.c1} dot={false} strokeWidth={2} isAnimationActive={false} />
                <Line yAxisId="p" dataKey="p" name="Power (W)" stroke={C.c2} dot={false} strokeWidth={2} isAnimationActive={false} />
                {m.pmp > 0 && <ReferenceDot yAxisId="p" x={m.vmp} y={m.pmp} r={5} fill={C.c2} stroke="var(--surface)" />}
                {m.pmp > 0 && <ReferenceDot yAxisId="i" x={m.vmp} y={m.imp} r={4} fill={C.c1} stroke="var(--surface)" />}
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: irradiance mostly scales current; heat mostly cuts voltage. At a 75 °C summer cell temperature the module loses
            roughly 15 % of its STC power — which is why string voltage design uses the coldest morning (max Voc) and yield uses the hottest
            afternoon.
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
