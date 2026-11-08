"use client";

import { useState } from "react";
import { lineDrop } from "@/lib/calc/electro";
import { Card, Split, Controls, Slider, Stat, Stats, Hint, numProp, fmt, type WidgetProps } from "./ui";

/**
 * Two buses joined by a line: how much the receiving voltage sags because of real power (through R) and reactive
 * power (through X), and how a local capacitor bank brings it back. Per unit, V_sending = 1.0.
 */
export default function LineDrop({ props }: WidgetProps) {
  const [p, setP] = useState(() => numProp(props, "p", 0.6, 0, 1));
  const [q, setQ] = useState(() => numProp(props, "q", 0.4, -0.4, 0.8));
  const [xr, setXr] = useState(() => numProp(props, "xr", 10, 1, 20));
  const [cap, setCap] = useState(0);
  const x = 0.1;
  const r = x / xr;
  const d = lineDrop(1, r, x, p, q - cap);
  const vr = d.vr;
  const ok = vr >= 0.95 && vr <= 1.05;

  const W = 380;
  const H = 200;
  const gauge = (v: number) => 30 + ((v - 0.85) / 0.25) * 320;

  return (
    <Card title="Why reactive power moves voltage" subtitle="A line from a strong bus to a load. On high-voltage lines X is much larger than R, so reactive flow sets most of the drop">
      <Split>
        <Controls>
          <Slider label="Real power to the load P" value={p} min={0} max={1} step={0.05} unit="pu" onChange={setP} format={(v) => v.toFixed(2)} />
          <Slider label="Reactive power drawn Q" value={q} min={-0.4} max={0.8} step={0.05} unit="pu" onChange={setQ} format={(v) => v.toFixed(2)} />
          <Slider label="Line X/R ratio" value={xr} min={1} max={20} step={1} onChange={setXr} format={(v) => v.toFixed(0)} />
          <Slider label="Capacitor bank at the load" value={cap} min={0} max={0.8} step={0.05} unit="pu" onChange={setCap} format={(v) => v.toFixed(2)} />
          <Stats cols={2}>
            <Stat label="Drop from P (R·P)" value={fmt(d.fromP * 100, 2)} unit="%" />
            <Stat label="Drop from Q (X·Q)" value={fmt(d.fromQ * 100, 2)} unit="%" tone="accent" />
            <Stat label="Receiving voltage" value={vr.toFixed(3)} unit="pu" tone={ok ? "ok" : "warn"} />
            <Stat label="Q still sent over the line" value={(q - cap).toFixed(2)} unit="pu" />
          </Stats>
        </Controls>
        <div className="min-w-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" style={{ maxHeight: 260 }} role="img" aria-label="Two-bus voltage drop">
            <rect x={30} y={30} width={14} height={60} fill="var(--text)" />
            <text x={8} y={22} fontSize={11} textAnchor="start" fill="var(--text)" fontWeight={600}>
              grid 1.00 pu
            </text>
            <path d="M44,60 L130,60 m0,-8 l20,16 l20,-16 l20,16 l20,-16 l20,16 m0,-8 L330,60" fill="none" stroke="var(--text)" strokeWidth={2} />
            <text x={190} y={45} fontSize={10.5} textAnchor="middle" fill="var(--muted)">
              line: R = {r.toFixed(3)}, X = {x.toFixed(2)} pu
            </text>
            <rect x={330} y={30} width={14} height={60} fill="var(--text)" />
            <text x={372} y={22} fontSize={11} textAnchor="end" fill={ok ? "var(--ok)" : "var(--warn)"} fontWeight={600}>
              {vr.toFixed(3)} pu
            </text>
            <text x={372} y={108} fontSize={10.5} textAnchor="end" fill="var(--muted)">
              motors and AC
            </text>
            {cap > 0 && (
              <g>
                <line x1={316} y1={90} x2={316} y2={112} stroke="var(--accent)" strokeWidth={2} />
                <line x1={308} y1={112} x2={324} y2={112} stroke="var(--accent)" strokeWidth={3} />
                <line x1={308} y1={118} x2={324} y2={118} stroke="var(--accent)" strokeWidth={3} />
                <text x={372} y={132} fontSize={10.5} textAnchor="end" fill="var(--accent)">
                  capacitors supply Q locally
                </text>
              </g>
            )}
            {/* voltage gauge */}
            <rect x={gauge(0.95)} y={160} width={gauge(1.05) - gauge(0.95)} height={14} fill="var(--ok)" opacity={0.15} />
            <line x1={30} y1={174} x2={350} y2={174} stroke="var(--border)" />
            {[0.85, 0.9, 0.95, 1, 1.05, 1.1].map((t) => (
              <text key={t} x={gauge(t)} y={190} fontSize={9.5} textAnchor="middle" fill="var(--muted)">
                {t.toFixed(2)}
              </text>
            ))}
            <circle cx={gauge(Math.max(0.85, Math.min(1.1, vr)))} cy={167} r={6} fill={ok ? "var(--ok)" : "var(--warn)"} />
            <text x={gauge(1)} y={154} fontSize={9.5} textAnchor="middle" fill="var(--muted)">
              acceptable band ±5 % (typical)
            </text>
          </svg>
          <Hint>
            Push Q up and watch the receiving voltage fall much faster than when you push P up: with X ten times R, every unit of reactive power drops
            voltage ten times as much as a unit of real power. Now add capacitors at the load: they supply the Q locally, less Q crosses the line, and the
            voltage recovers while the load is unchanged. PV inverters and STATCOMs do the same job. ΔV ≈ (R·P + X·Q)/V is an approximation for small drops.
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
