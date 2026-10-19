"use client";

import { useMemo, useState } from "react";
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { kuwaitLoad, pvDayProfile } from "@/lib/calc/kuwait";
import {
  Card, Split, Controls, Slider, Segmented, Stat, Stats, Hint, Note, ChartBox, numProp, enumProp, fmt, pct,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

type Season = "summer" | "winter";

export default function LoadCurve({ props }: WidgetProps) {
  const [pv, setPv] = useState(() => numProp(props, "pvMW", 3000, 0, 15000));
  const [season, setSeason] = useState<Season>(() => enumProp(props, "season", ["summer", "winter"] as const, "summer"));

  const data = useMemo(() => {
    const out = [];
    for (let k = 0; k <= 96; k++) {
      const h = k / 4;
      const load = kuwaitLoad(h, season);
      const gen = pvDayProfile(h, pv, season);
      out.push({ h, load, pv: gen, net: load - gen });
    }
    return out;
  }, [pv, season]);

  const peak = Math.max(...data.map((d) => d.load));
  const netPeak = Math.max(...data.map((d) => d.net));
  const netMin = Math.min(...data.map((d) => d.net));
  let ramp = 0;
  for (let k = 4; k < data.length; k++) {
    const r = data[k].net - data[k - 4].net; // per hour
    if (data[k].h >= 12 && r > ramp) ramp = r;
  }
  const eLoad = data.slice(0, 96).reduce((s, d) => s + d.load / 4, 0);
  const ePv = data.slice(0, 96).reduce((s, d) => s + d.pv / 4, 0);

  return (
    <Card title="Kuwait daily load with PV — net load" subtitle="Indicative shape — not measured system data">
      <Split>
        <Controls>
          <Segmented label="Season" value={season} onChange={setSeason} options={[{ value: "summer", label: "Summer" }, { value: "winter", label: "Winter" }]} />
          <Slider label="PV capacity (AC)" value={pv} min={0} max={15000} step={250} unit="MW" onChange={setPv} />
          <Stats cols={2}>
            <Stat label="Peak load" value={fmt(peak / 1000, 3)} unit="GW" />
            <Stat label="Peak net load" value={fmt(netPeak / 1000, 3)} unit="GW" tone="accent" />
            <Stat label="Peak reduction" value={fmt((peak - netPeak) / 1000, 2)} unit="GW" tone="ok" />
            <Stat label="Min net load" value={fmt(netMin / 1000, 3)} unit="GW" tone={netMin < 0.7 * Math.min(...data.map((d) => d.load)) ? "warn" : "default"} />
            <Stat label="Max evening ramp" value={fmt(ramp, 3)} unit="MW/h" tone="warn" />
            <Stat label="PV energy share" value={pct(ePv / eLoad)} />
          </Stats>
        </Controls>
        <div className="min-w-0">
          <ChartBox height={300}>
            <ResponsiveContainer>
              <ComposedChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="h" type="number" domain={[0, 24]} ticks={[0, 3, 6, 9, 12, 15, 18, 21, 24]} tickFormatter={(h: number) => `${String(h).padStart(2, "0")}:00`} tick={axisTick} axisLine={axisLine} label={axisLabel("Hour")} />
                <YAxis tickFormatter={(v: number) => fmt(v / 1000, 2)} tick={axisTick} axisLine={axisLine} width={36} domain={[0, 18000]} label={axisLabel("GW", "insideLeft", -90)} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={tooltipLabelStyle}
                  labelFormatter={(v: unknown) => `${Math.floor(Number(v))}:${String(Math.round((Number(v) % 1) * 60)).padStart(2, "0")}`}
                  formatter={(v: unknown, n: unknown) => [`${fmt(Number(v) / 1000, 3)} GW`, String(n)]}
                />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <Area dataKey="pv" name="PV output" stroke={C.c2} fill={C.c2} fillOpacity={0.2} isAnimationActive={false} />
                <Line dataKey="load" name="Demand" stroke={C.muted} strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line dataKey="net" name="Net load (demand − PV)" stroke={C.c1} strokeWidth={2.5} dot={false} isAnimationActive={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: in summer PV output lines up with the air-conditioning peak, so it shaves the peak — but the net-load peak shifts
            into the evening, after sunset, with a steep ramp. In winter large PV volumes push midday net load toward must-run thermal
            minimums (a &ldquo;duck&rdquo;), which is where storage and flexibility earn their value.
          </Hint>
        </div>
      </Split>
      <Note>
        Indicative shape: summer peak ~16–17 GW mid-afternoon with a ~11–12 GW night minimum; winter ~6–9 GW with an evening peak. Use
        MEWRE dispatch data for any real study.
      </Note>
    </Card>
  );
}
