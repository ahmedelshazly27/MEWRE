"use client";

import { useState } from "react";
import { seriesImpedance } from "@/lib/calc/electro";
import { Card, Split, Controls, Slider, Stat, Stats, Hint, numProp, fmt, type WidgetProps } from "./ui";

/** Series R, L, C: R along the bottom, net reactance up (coil) or down (capacitor), Z as the hypotenuse. */
export default function ImpedanceTriangle({ props }: WidgetProps) {
  const [r, setR] = useState(() => numProp(props, "r", 30, 1, 100));
  const [xlAt50, setXl] = useState(() => numProp(props, "xl", 40, 0, 100));
  const [xcAt50, setXc] = useState(() => numProp(props, "xc", 0, 0, 100));
  const [f, setF] = useState(() => numProp(props, "f", 50, 10, 150));
  // sliders give reactance at 50 Hz; convert to L and C so frequency changes them the physical way
  const l = xlAt50 / (2 * Math.PI * 50);
  const c = xcAt50 > 0 ? 1 / (2 * Math.PI * 50 * xcAt50) : null;
  const z = seriesImpedance(r, l, c, f, 240);

  const W = 340;
  const H = 240;
  const max = Math.max(r, Math.abs(z.x), 1);
  const k = Math.min(240 / max, 95 / Math.max(Math.abs(z.x), 1), 240 / r);
  const x0 = 40;
  const y0 = 120;
  const rx = x0 + r * k;
  const ty = y0 - z.x * k;
  const wrongLen = (r + Math.abs(z.x)) * k;

  return (
    <Card title="The impedance triangle: why Z is not R + X" subtitle="Resistance and reactance act at right angles (a quarter cycle apart), so they add like the sides of a right triangle">
      <Split>
        <Controls>
          <Slider label="Resistance R" value={r} min={1} max={100} step={1} unit="Ω" onChange={setR} />
          <Slider label="Coil reactance at 50 Hz" value={xlAt50} min={0} max={100} step={1} unit="Ω" onChange={setXl} />
          <Slider label="Capacitor reactance at 50 Hz" value={xcAt50} min={0} max={100} step={1} unit="Ω" onChange={setXc} />
          <Slider label="Frequency" value={f} min={10} max={150} step={5} unit="Hz" onChange={setF} />
          <Stats cols={2}>
            <Stat label="X_L − X_C (net X)" value={fmt(z.x, 3)} unit="Ω" />
            <Stat label="Impedance |Z|" value={fmt(z.z, 3)} unit="Ω" tone="accent" />
            <Stat label="Current at 240 V" value={fmt(z.i, 3)} unit="A" />
            <Stat label="Angle φ" value={`${fmt(Math.abs(z.phiDeg), 3)}° ${z.phiDeg > 0.5 ? "lag" : z.phiDeg < -0.5 ? "lead" : ""}`} />
          </Stats>
        </Controls>
        <div className="min-w-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" style={{ maxHeight: 300 }} role="img" aria-label="Impedance triangle">
            <line x1={x0} y1={y0} x2={x0 + 260} y2={y0} stroke="var(--border)" strokeDasharray="3 4" />
            {/* wrong: R + X as a straight bar */}
            <line x1={x0} y1={y0 + 95} x2={x0 + wrongLen} y2={y0 + 95} stroke="var(--danger)" strokeWidth={3} strokeDasharray="6 4" opacity={0.7} />
            <text x={x0} y={y0 + 112} fontSize={10.5} fill="var(--danger)">
              wrong: R + |X| = {fmt(r + Math.abs(z.x), 3)} Ω
            </text>
            <line x1={x0} y1={y0} x2={rx} y2={y0} stroke="var(--chart-3)" strokeWidth={4} />
            <line x1={rx} y1={y0} x2={rx} y2={ty} stroke={z.x >= 0 ? "var(--chart-4)" : "var(--chart-1)"} strokeWidth={4} />
            <line x1={x0} y1={y0} x2={rx} y2={ty} stroke="var(--chart-2)" strokeWidth={4} />
            <text x={(x0 + rx) / 2} y={y0 + (z.x >= 0 ? 16 : -8)} fontSize={11.5} textAnchor="middle" fill="var(--chart-3)" fontWeight={600}>
              R = {fmt(r, 3)} Ω
            </text>
            <text x={rx + 6} y={(y0 + ty) / 2} fontSize={11.5} fill={z.x >= 0 ? "var(--chart-4)" : "var(--chart-1)"} fontWeight={600}>
              X = {fmt(z.x, 3)} Ω {z.x >= 0 ? "(coil wins)" : "(capacitor wins)"}
            </text>
            <text x={(x0 + rx) / 2 - 8} y={(y0 + ty) / 2 + (z.x >= 0 ? -6 : 14)} fontSize={11.5} textAnchor="end" fill="var(--chart-2)" fontWeight={600}>
              Z = {fmt(z.z, 3)} Ω
            </text>
          </svg>
          <Hint>
            Coil reactance points up, capacitor reactance points down, so they cancel each other. Raise the frequency: the coil&apos;s X grows and the
            capacitor&apos;s shrinks. If they cancel exactly (resonance) only R limits the current. The angle of the triangle is the angle between voltage and
            current, and cos φ = R/Z is the power factor.
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
