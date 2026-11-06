"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { deviceTime, fitClock, toReference } from "@/lib/calc/afterwave";
import { rng } from "@/lib/practice";
import { Card, ChartBox, Controls, Note, Slider, Split, Stat, Stats, axisLabel, axisLine, axisTick, fmt, gridProps, legendStyle, tooltipStyle, C, type WidgetProps } from "../ui";

export default function BenchSync(_: WidgetProps) {
  const [offset, setOffset] = useState(120); // ms
  const [ppm, setPpm] = useState(40);
  const [jitter, setJitter] = useState(0.5); // ms
  const [pulse, setPulse] = useState(60); // s between sync pulses
  const [minutes, setMinutes] = useState(60);

  const r = useMemo(() => {
    const rand = rng(7);
    const noise = () => (rand() - 0.5) * 2 * (jitter / 1000);
    const T = minutes * 60;
    const refs: number[] = [];
    const devs: number[] = [];
    for (let t = 0; t <= T; t += pulse) {
      refs.push(t);
      devs.push(deviceTime(t, offset / 1000, ppm) + noise());
    }
    const fit = fitClock(refs, devs);
    const rows = [];
    for (let i = 0; i <= 40; i++) {
      const t = (T * i) / 40;
      const raw = deviceTime(t, offset / 1000, ppm) - t;
      const corrected = toReference(deviceTime(t, offset / 1000, ppm), fit.offset, fit.driftPpm) - t;
      rows.push({ min: Math.round(t / 6) / 10, raw: raw * 1000, corrected: corrected * 1000 });
    }
    return { fit, rows, worst: Math.max(...rows.map((x) => Math.abs(x.raw))), residual: Math.max(...rows.map((x) => Math.abs(x.corrected))) };
  }, [offset, ppm, jitter, pulse, minutes]);

  return (
    <Card title="Two streams, one clock" subtitle="A DAQ on its own clock and an app log on the PC clock: misalignment grows with offset and drift; sync pulses let you fit and remove both">
      <Split>
        <Controls>
          <Slider label="Clock offset" value={offset} min={-500} max={500} step={10} unit="ms" onChange={setOffset} />
          <Slider label="Clock drift" value={ppm} min={-100} max={100} step={5} unit="ppm" onChange={setPpm} />
          <Slider label="Timestamp jitter" value={jitter} min={0} max={5} step={0.1} unit="ms" onChange={setJitter} />
          <Slider label="Sync pulse every" value={pulse} min={5} max={600} step={5} unit="s" onChange={setPulse} />
          <Slider label="Test length" value={minutes} min={5} max={480} step={5} unit="min" onChange={setMinutes} />
        </Controls>
        <div className="min-w-0">
          <Stats cols={3}>
            <Stat label="Worst raw misalignment" value={fmt(r.worst, 3)} unit="ms" tone={r.worst > 10 ? "danger" : "warn"} />
            <Stat label="After fit" value={fmt(r.residual, 2)} unit="ms" tone="ok" />
            <Stat label="Fitted drift" value={fmt(r.fit.driftPpm, 3)} unit="ppm" />
          </Stats>
          <ChartBox height={240}>
            <ResponsiveContainer>
              <LineChart data={r.rows} margin={{ top: 8, right: 8, bottom: 14, left: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="min" tick={axisTick} axisLine={axisLine} label={axisLabel("minutes")} />
                <YAxis tick={axisTick} axisLine={axisLine} tickFormatter={(v) => `${v}`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${fmt(Number(v), 3)} ms`} />
                <Legend wrapperStyle={legendStyle} />
                <Line type="monotone" dataKey="raw" name="raw (ms)" stroke={C.danger} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="corrected" name="after clock fit (ms)" stroke={C.ok} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <Note>40 ppm is 2.4 ms per minute, 144 ms per hour: enough to put a torque spike before the command that caused it. Hardware triggers or PTP (IEEE 1588) give a shared time base; otherwise fit offset and drift from periodic sync events, as here.</Note>
        </div>
      </Split>
    </Card>
  );
}
