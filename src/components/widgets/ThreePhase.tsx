"use client";

import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { SQRT3 } from "@/lib/calc/power";
import {
  Card, Split, Controls, Slider, Stat, Stats, Hint, ChartBox, numProp, fmt, pct,
  axisTick, axisLine, gridProps, tooltipStyle, tooltipLabelStyle, legendStyle, C, axisLabel, type WidgetProps,
} from "./ui";

const D2R = Math.PI / 180;

export default function ThreePhase({ props }: WidgetProps) {
  const [vph, setVph] = useState(230);
  const [unb, setUnb] = useState(() => numProp(props, "unbalance", 0, 0, 50));
  const [angErr, setAngErr] = useState(0);

  // Phase A amplitude reduced by unbalance %, phase C angle shifted by angErr
  const amps = [1 - unb / 100, 1, 1];
  const angles = [0, -120, 120 + angErr];
  const data = useMemo(() => {
    const out = [];
    for (let k = 0; k <= 160; k++) {
      const t = (k / 160) * 0.04; // two cycles at 50 Hz
      const w = 2 * Math.PI * 50 * t;
      const va = vph * Math.SQRT2 * amps[0] * Math.sin(w + angles[0] * D2R);
      const vb = vph * Math.SQRT2 * amps[1] * Math.sin(w + angles[1] * D2R);
      const vc = vph * Math.SQRT2 * amps[2] * Math.sin(w + angles[2] * D2R);
      out.push({ ms: t * 1000, va, vb, vc, sum: va + vb + vc });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vph, unb, angErr]);

  const re = amps.reduce((s, a, i) => s + a * Math.cos(angles[i] * D2R), 0);
  const im = amps.reduce((s, a, i) => s + a * Math.sin(angles[i] * D2R), 0);
  const sumMag = Math.hypot(re, im);
  const vab = vph * Math.hypot(amps[0] * Math.cos(0) - amps[1] * Math.cos(-120 * D2R), amps[0] * Math.sin(0) - amps[1] * Math.sin(-120 * D2R));

  // phasor svg
  const R = 80;
  const cx = 110;
  const cy = 110;
  const colors = [C.c1, C.c2, C.c3];
  const tip = (a: number, ang: number) => [cx + R * a * Math.cos(ang * D2R), cy - R * a * Math.sin(ang * D2R)];

  return (
    <Card title="Three-phase voltages" subtitle="Balanced phases cancel; line voltage = √3 × phase voltage">
      <Split>
        <Controls>
          <Slider label="Phase voltage (rms)" value={vph} min={100} max={400} step={1} unit="V" onChange={setVph} />
          <Slider label="Phase A amplitude drop" value={unb} min={0} max={50} step={1} unit="%" onChange={setUnb} />
          <Slider label="Phase C angle error" value={angErr} min={-30} max={30} step={1} unit="°" onChange={setAngErr} />
          <svg viewBox="0 0 220 220" className="mx-auto h-auto w-full max-w-[240px]" role="img" aria-label="Phasor diagram">
            <defs>
              {colors.map((c, i) => (
                <marker key={i} id={`tp-arr-${i}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill={c} />
                </marker>
              ))}
              <marker id="tp-arr-s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--danger)" />
              </marker>
            </defs>
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--chart-grid)" />
            {amps.map((a, i) => {
              const [x, y] = tip(a, angles[i]);
              return (
                <g key={i}>
                  <line x1={cx} y1={cy} x2={x} y2={y} stroke={colors[i]} strokeWidth={2.5} markerEnd={`url(#tp-arr-${i})`} />
                  <text x={cx + (R * a + 14) * Math.cos(angles[i] * D2R)} y={cy - (R * a + 14) * Math.sin(angles[i] * D2R)} fontSize={12} fill={colors[i]} textAnchor="middle" dominantBaseline="middle">
                    {["Va", "Vb", "Vc"][i]}
                  </text>
                </g>
              );
            })}
            {sumMag > 0.005 && (
              <line x1={cx} y1={cy} x2={cx + R * re} y2={cy - R * im} stroke="var(--danger)" strokeWidth={2.5} markerEnd="url(#tp-arr-s)" />
            )}
            <circle cx={cx} cy={cy} r={2.5} fill="var(--text)" />
          </svg>
        </Controls>
        <div className="min-w-0">
          <ChartBox height={260}>
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 14 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="ms" type="number" domain={[0, 40]} ticks={[0, 10, 20, 30, 40]} tick={axisTick} axisLine={axisLine} label={axisLabel("Time (ms)")} />
                <YAxis domain={[-600, 600]} tick={axisTick} axisLine={axisLine} width={40} label={axisLabel("V", "insideLeft", -90)} />
                <ReferenceLine y={0} stroke={C.border} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} labelFormatter={(v: unknown) => `${fmt(Number(v), 3)} ms`} formatter={(v: unknown, n: unknown) => [`${fmt(Number(v), 3)} V`, String(n)]} />
                <Legend wrapperStyle={legendStyle} verticalAlign="top" height={24} />
                <Line dataKey="va" name="Va" stroke={C.c1} dot={false} isAnimationActive={false} strokeWidth={1.8} />
                <Line dataKey="vb" name="Vb" stroke={C.c2} dot={false} isAnimationActive={false} strokeWidth={1.8} />
                <Line dataKey="vc" name="Vc" stroke={C.c3} dot={false} isAnimationActive={false} strokeWidth={1.8} />
                <Line dataKey="sum" name="Va+Vb+Vc" stroke={C.danger} dot={false} isAnimationActive={false} strokeWidth={2.2} strokeDasharray="5 3" />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
          <Hint>
            What to notice: with equal amplitudes 120° apart the instantaneous sum is zero, so a balanced star load needs no neutral current.
            Any amplitude or angle error leaves a residual (red) that flows in the neutral/earth and causes negative-sequence heating in machines.
          </Hint>
          <div className="mt-3">
            <Stats cols={4}>
              <Stat label="Phase V (rms)" value={fmt(vph, 3)} unit="V" />
              <Stat label="Line V = √3·Vph" value={fmt(vph * SQRT3, 3)} unit="V" tone="accent" />
              <Stat label="Actual Vab" value={fmt(vab, 3)} unit="V" />
              <Stat label="Residual sum" value={pct(sumMag / 1, 1)} note="of one phase" tone={sumMag > 0.02 ? "warn" : "ok"} />
            </Stats>
          </div>
        </div>
      </Split>
    </Card>
  );
}
