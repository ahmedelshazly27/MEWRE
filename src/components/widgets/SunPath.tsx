"use client";

import { useMemo, useState } from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { clearSkyDay, integrateKwh, dayLength, declination } from "@/lib/calc/solar";
import {
  Card, Split, Controls, Slider, Stat, Stats, Hint, ChartBox, numProp, fmt, pct,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CUM = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
function dateLabel(doy: number) {
  let m = 0;
  while (m < 11 && doy > CUM[m + 1]) m++;
  return `${doy - CUM[m]} ${MONTHS[m]}`;
}
const hh = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;

export default function SunPath({ props }: WidgetProps) {
  const [lat, setLat] = useState(() => numProp(props, "latitude", 29.3, -60, 60));
  const [doy, setDoy] = useState(() => Math.round(numProp(props, "dayOfYear", 172, 1, 365)));
  const [tilt, setTilt] = useState(25);
  const [backtrack, setBacktrack] = useState(true);
  const [gcr, setGcr] = useState(0.35);

  const day = useMemo(
    () => clearSkyDay(doy, { lat, tilt, step: 0.25, backtrack, gcr, clarity: 0.9 }),
    [doy, lat, tilt, backtrack, gcr],
  );
  const data = day
    .filter((p) => p.hour >= 4 && p.hour <= 20)
    .map((p) => ({
      hour: p.hour,
      elevation: p.elevation > 0 ? p.elevation : null,
      azimuth: p.elevation > 0 ? p.azimuth : null,
      tracker: Number.isNaN(p.trackerAngle) ? null : p.trackerAngle,
      ghi: p.ghi,
      fixed: p.poaFixed,
      trk: p.poaTracker,
    }));
  const ghi = integrateKwh(day.map((p) => p.ghi), 0.25);
  const fixed = integrateKwh(day.map((p) => p.poaFixed), 0.25);
  const trk = integrateKwh(day.map((p) => p.poaTracker), 0.25);
  const noonEl = 90 - Math.abs(lat - declination(doy));

  return (
    <Card title="Sun path, tracker angle and plane-of-array irradiance" subtitle="Clear-sky model; local time UTC+3, longitude 47.7°E">
      <Split>
        <Controls>
          <Slider label="Latitude" value={lat} min={-60} max={60} step={0.1} unit="°" onChange={setLat} />
          <Slider label="Day of year" value={doy} min={1} max={365} step={1} onChange={setDoy} format={(v) => `${v} (${dateLabel(v)})`} />
          <Slider label="Fixed-tilt angle (south)" value={tilt} min={0} max={50} step={1} unit="°" onChange={setTilt} />
          <label className="flex items-center gap-2 text-sm text-muted">
            <input type="checkbox" checked={backtrack} onChange={(e) => setBacktrack(e.target.checked)} className="accent-[var(--accent)]" />
            Tracker backtracking (avoid row shading)
          </label>
          <Slider label="Ground coverage ratio" value={gcr} min={0.2} max={0.6} step={0.01} onChange={setGcr} format={(v) => v.toFixed(2)} />
          <Stats cols={2}>
            <Stat label="Day length" value={fmt(dayLength(lat, doy), 3)} unit="h" />
            <Stat label="Noon elevation" value={fmt(Math.min(90, noonEl), 3)} unit="°" />
            <Stat label="Clear-sky GHI" value={fmt(ghi, 3)} unit="kWh/m²" />
            <Stat label="POA fixed tilt" value={fmt(fixed, 3)} unit="kWh/m²" />
            <Stat label="POA tracker" value={fmt(trk, 3)} unit="kWh/m²" tone="accent" />
            <Stat label="Tracker gain" value={pct(trk / fixed - 1)} tone={trk > fixed ? "ok" : "warn"} />
          </Stats>
        </Controls>
        <div className="min-w-0 space-y-3">
          <ChartBox height={210}>
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="hour" type="number" domain={[4, 20]} ticks={[4, 6, 8, 10, 12, 14, 16, 18, 20]} tickFormatter={hh} tick={axisTick} axisLine={axisLine} label={axisLabel("Local time")} />
                <YAxis domain={[-90, 90]} ticks={[-60, -30, 0, 30, 60, 90]} tick={axisTick} axisLine={axisLine} width={36} label={axisLabel("°", "insideLeft", -90)} />
                <ReferenceLine y={0} stroke={C.border} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => hh(Number(v))} formatter={(v: unknown, n: unknown) => [`${fmt(Number(v), 3)}°`, String(n)]} />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <Line dataKey="elevation" name="Sun elevation" stroke={C.c2} dot={false} strokeWidth={2} isAnimationActive={false} />
                <Line dataKey="tracker" name="Tracker rotation (− east / + west)" stroke={C.c1} dot={false} strokeWidth={2} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <ChartBox height={210}>
            <ResponsiveContainer>
              <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="hour" type="number" domain={[4, 20]} ticks={[4, 6, 8, 10, 12, 14, 16, 18, 20]} tickFormatter={hh} tick={axisTick} axisLine={axisLine} label={axisLabel("Local time")} />
                <YAxis tick={axisTick} axisLine={axisLine} width={40} label={axisLabel("W/m²", "insideLeft", -90)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => hh(Number(v))} formatter={(v: unknown, n: unknown) => [`${fmt(Number(v), 3)} W/m²`, String(n)]} />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <Area dataKey="trk" name="POA tracker" stroke={C.c1} fill={C.c1} fillOpacity={0.15} strokeWidth={2} isAnimationActive={false} />
                <Area dataKey="fixed" name={`POA fixed ${tilt}°`} stroke={C.c3} fill={C.c3} fillOpacity={0.1} strokeWidth={2} isAnimationActive={false} />
                <Area dataKey="ghi" name="GHI" stroke={C.c2} fill="none" strokeDasharray="4 3" strokeWidth={1.5} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: the tracker&apos;s gain comes from mornings and afternoons (the broad shoulders), and is largest in summer when the
            sun rises north of east. In winter a well-tilted fixed array can match a horizontal tracker. Backtracking flattens the tracker at
            low sun to stop rows shading each other.
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
