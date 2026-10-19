"use client";

import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { droopResponse } from "@/lib/calc/power";
import {
  Card, Split, Controls, Slider, Stat, Stats, Hint, ChartBox, numProp, fmt,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

const P_RATED = 1000;

export default function Droop({ props }: WidgetProps) {
  const [droop, setDroop] = useState(() => numProp(props, "droop", 4, 1, 12));
  const [db, setDb] = useState(200); // mHz
  const [headroom, setHeadroom] = useState(10);
  const [fmin, setFmin] = useState(49.5);
  const avail = 900; // MW available from the sun right now
  const setpoint = avail * (1 - headroom / 100);

  const resp = (f: number) => droopResponse({ freqHz: f, droopPct: droop, deadbandHz: db / 1000, pRated: P_RATED, pSetpoint: setpoint, pAvailable: avail });

  const char = useMemo(
    () => Array.from({ length: 81 }, (_, k) => {
      const f = 49 + k * 0.025;
      return { f, p: resp(f) };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [droop, db, headroom],
  );
  const event = useMemo(
    () => Array.from({ length: 121 }, (_, k) => {
      const t = k * 0.5;
      // frequency event: dip starting at 5 s, nadir at 12 s, recovery to 49.9 by 40 s, back to 50 by 60 s
      let f = 50;
      if (t >= 5 && t < 12) f = 50 - ((50 - fmin) * (t - 5)) / 7;
      else if (t >= 12 && t < 40) f = fmin + ((49.9 - fmin) * (t - 12)) / 28;
      else if (t >= 40) f = 49.9 + (0.1 * Math.min(1, (t - 40) / 20));
      return { t, f, p: resp(f) };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [droop, db, headroom, fmin],
  );
  const pNadir = resp(fmin);
  const unlimited = setpoint + (((50 - fmin - db / 1000) / 50) / (droop / 100)) * P_RATED;

  return (
    <Card title="Frequency droop response" subtitle="1,000 MW PV plant, 900 MW available irradiance-limited; 50 Hz system">
      <Split>
        <Controls>
          <Slider label="Droop" value={droop} min={1} max={12} step={0.5} unit="%" onChange={setDroop} />
          <Slider label="Deadband" value={db} min={0} max={500} step={10} unit="mHz" onChange={setDb} />
          <Slider label="Headroom (curtailment reserve)" value={headroom} min={0} max={30} step={1} unit="%" onChange={setHeadroom} />
          <Slider label="Event frequency nadir" value={fmin} min={49} max={49.95} step={0.01} unit="Hz" onChange={setFmin} format={(v) => v.toFixed(2)} />
          <Stats cols={2}>
            <Stat label="Pre-event output" value={fmt(setpoint, 3)} unit="MW" />
            <Stat label="Output at nadir" value={fmt(pNadir, 3)} unit="MW" tone="accent" />
            <Stat label="Response ΔP" value={fmt(pNadir - setpoint, 3)} unit="MW" tone="ok" />
            <Stat label="Wanted by droop" value={fmt(unlimited - setpoint, 3)} unit="MW" tone={unlimited > avail + 1e-6 ? "warn" : "default"} note={unlimited > avail ? "limited by headroom" : undefined} />
          </Stats>
        </Controls>
        <div className="min-w-0 space-y-3">
          <ChartBox height={210}>
            <ResponsiveContainer>
              <LineChart data={char} margin={{ top: 5, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="f" type="number" domain={[49, 51]} ticks={[49, 49.5, 50, 50.5, 51]} tick={axisTick} axisLine={axisLine} label={axisLabel("Frequency (Hz)")} />
                <YAxis domain={[0, 1000]} tick={axisTick} axisLine={axisLine} width={40} label={axisLabel("MW", "insideLeft", -90)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `${fmt(Number(v), 4)} Hz`} formatter={(v: unknown) => [`${fmt(Number(v), 3)} MW`, "Output"]} />
                <ReferenceLine y={avail} stroke={C.muted} strokeDasharray="4 3" label={{ value: "available", fill: "var(--muted)", fontSize: 10, position: "insideTopLeft" }} />
                <ReferenceLine x={50} stroke={C.border} />
                <Line dataKey="p" name="P–f characteristic" stroke={C.c1} strokeWidth={2.5} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <ChartBox height={210}>
            <ResponsiveContainer>
              <LineChart data={event} margin={{ top: 5, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="t" type="number" domain={[0, 60]} tick={axisTick} axisLine={axisLine} label={axisLabel("Time (s)")} />
                <YAxis yAxisId="p" domain={[0, 1000]} tick={axisTick} axisLine={axisLine} width={40} label={axisLabel("MW", "insideLeft", -90)} />
                <YAxis yAxisId="f" orientation="right" domain={[49, 50.2]} tick={axisTick} axisLine={axisLine} width={40} tickFormatter={(v: number) => v.toFixed(1)} label={axisLabel("Hz", "insideRight", 90)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `t = ${v} s`} formatter={(v: unknown, n: unknown) => [fmt(Number(v), 4), String(n)]} />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <Line yAxisId="f" dataKey="f" name="Frequency (Hz)" stroke={C.c4} strokeWidth={1.8} dot={false} isAnimationActive={false} />
                <Line yAxisId="p" dataKey="p" name="Plant output (MW)" stroke={C.c1} strokeWidth={2.5} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: droop % is the frequency change (as a share of 50 Hz) that would swing the plant through 100 % of rated power — 4 %
            droop means 2 Hz for full range. A PV plant can only respond upward if it is already curtailed (headroom); over-frequency response
            is always available by reducing output.
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
