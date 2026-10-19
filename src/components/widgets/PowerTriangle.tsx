"use client";

import { useState } from "react";
import { fromPandPf, pfCorrectionKvar } from "@/lib/calc/power";
import { Card, Split, Controls, Slider, Segmented, Stat, Stats, Hint, numProp, fmt, pct, type WidgetProps } from "./ui";

export default function PowerTriangle({ props }: WidgetProps) {
  const [p, setP] = useState(() => numProp(props, "p", 800, 10, 5000));
  const [pf, setPf] = useState(() => numProp(props, "pf", 0.8, 0.3, 1));
  const [target, setTarget] = useState(0.95);
  const [mode, setMode] = useState<"lag" | "lead">("lag");
  const lag = mode === "lag";
  const before = fromPandPf(p, pf, lag);
  const tgt = Math.max(target, pf);
  const after = fromPandPf(p, tgt, lag);
  const qc = lag ? pfCorrectionKvar(p, pf, tgt) : 0;

  // SVG geometry: scale so S fits
  const W = 360;
  const H = 230;
  const pad = 30;
  const sMax = Math.max(before.s, 1);
  const k = Math.min((W - 2 * pad) / p, (H - 2 * pad) / Math.max(Math.abs(before.q), 1), (W - 2 * pad) / sMax);
  const x0 = pad;
  const yBase = lag ? H - pad : pad;
  const dir = lag ? -1 : 1;
  const px = x0 + p * k;
  const qy = yBase + dir * Math.abs(before.q) * k;
  const qy2 = yBase + dir * Math.abs(after.q) * k;
  const arcR = 34;
  const phi = Math.atan2(Math.abs(before.q), p);

  return (
    <Card title="Power triangle and power-factor correction" subtitle="Constant real power P; capacitor bank supplies reactive power locally">
      <Split>
        <Controls>
          <Slider label="Real power P" value={p} min={10} max={5000} step={10} unit="kW" onChange={setP} />
          <Slider label="Power factor (initial)" value={pf} min={0.3} max={1} step={0.01} onChange={setPf} format={(v) => v.toFixed(2)} />
          <Segmented label="Load is" value={mode} onChange={setMode} options={[{ value: "lag", label: "Lagging (inductive)" }, { value: "lead", label: "Leading" }]} />
          <Slider label="Target PF" value={target} min={0.8} max={1} step={0.01} onChange={setTarget} format={(v) => v.toFixed(2)} />
          <Stats cols={2}>
            <Stat label="Reactive Q" value={fmt(before.q, 3)} unit="kvar" />
            <Stat label="Apparent S" value={fmt(before.s, 3)} unit="kVA" />
            <Stat label="Angle φ" value={fmt(Math.abs(before.phiDeg), 3)} unit="°" />
            <Stat label="Capacitor Qc" value={lag ? fmt(qc, 3) : "n/a"} unit={lag ? "kvar" : undefined} tone="accent" />
            <Stat label="S after" value={fmt(after.s, 3)} unit="kVA" />
            <Stat label="Current reduction" value={pct(1 - after.s / before.s)} tone="ok" />
          </Stats>
        </Controls>
        <div className="min-w-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" style={{ maxHeight: 320 }} role="img" aria-label="Power triangle">
            <defs>
              <marker id="pt-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--text)" />
              </marker>
            </defs>
            {/* corrected triangle */}
            {lag && tgt > pf && (
              <g opacity={0.9}>
                <line x1={x0} y1={yBase} x2={px} y2={qy2} stroke="var(--chart-1)" strokeWidth={2} strokeDasharray="5 4" />
                <line x1={px} y1={qy} x2={px} y2={qy2} stroke="var(--chart-1)" strokeWidth={6} opacity={0.35} />
                <text x={px + 8} y={(qy + qy2) / 2} fontSize={11} fill="var(--chart-1)">Qc = {fmt(qc, 3)} kvar</text>
              </g>
            )}
            <line x1={x0} y1={yBase} x2={px} y2={yBase} stroke="var(--chart-3)" strokeWidth={3} markerEnd="url(#pt-arrow)" />
            <line x1={px} y1={yBase} x2={px} y2={qy} stroke="var(--chart-4)" strokeWidth={3} markerEnd="url(#pt-arrow)" />
            <line x1={x0} y1={yBase} x2={px} y2={qy} stroke="var(--chart-2)" strokeWidth={3} markerEnd="url(#pt-arrow)" />
            <path
              d={`M ${x0 + arcR} ${yBase} A ${arcR} ${arcR} 0 0 ${lag ? 0 : 1} ${x0 + arcR * Math.cos(phi)} ${yBase + dir * arcR * Math.sin(phi)}`}
              fill="none"
              stroke="var(--muted)"
            />
            <text x={x0 + arcR + 6} y={yBase + dir * 12} fontSize={12} fill="var(--muted)" dominantBaseline="middle">φ</text>
            <text x={(x0 + px) / 2} y={yBase - dir * 12} fontSize={12} fill="var(--chart-3)" textAnchor="middle" dominantBaseline="middle">P = {fmt(p, 3)} kW</text>
            <text x={px - 6} y={(yBase + qy) / 2} fontSize={12} fill="var(--chart-4)" textAnchor="end" dominantBaseline="middle">Q</text>
            <text x={(x0 + px) / 2 - 10} y={(yBase + qy) / 2 + dir * 4} fontSize={12} fill="var(--chart-2)" textAnchor="end">S = {fmt(before.s, 3)} kVA</text>
          </svg>
          <Hint>
            What to notice: correcting PF from {pf.toFixed(2)} to {tgt.toFixed(2)} needs Qc = P(tan φ₁ − tan φ₂). The real power is unchanged,
            but apparent power — and therefore current, cable and transformer loading — falls. Going all the way to unity costs
            disproportionately more kvar for the last few points.
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
