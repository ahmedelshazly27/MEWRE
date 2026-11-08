"use client";

import { useState } from "react";
import { acEnergySplit, acWaveforms } from "@/lib/calc/power";
import { Card, Split, Controls, Slider, Segmented, Stat, Stats, Hint, numProp, fmt, type WidgetProps } from "./ui";

const LOADS = [
  { value: "heater", label: "Heater", phi: 0 },
  { value: "motor", label: "AC compressor", phi: 36.87 },
  { value: "inductor", label: "Pure coil", phi: 90 },
  { value: "capacitor", label: "Capacitor bank", phi: -90 },
] as const;

/**
 * Voltage, current and instantaneous power over two cycles. Shows why a lagging current makes power slosh back
 * to the source part of every cycle, and that the average (real power) is cos φ while the current stays the same.
 */
export default function AcPower({ props }: WidgetProps) {
  const [phi, setPhi] = useState(() => numProp(props, "phi", 36.87, -90, 90));
  const preset = LOADS.find((l) => Math.abs(l.phi - phi) < 0.01)?.value ?? "custom";
  const pts = acWaveforms(phi, 240, 2);
  const e = acEnergySplit(phi);
  const lag = phi > 0.5 ? "lagging (inductive: motors, transformers)" : phi < -0.5 ? "leading (capacitive: cables, capacitor banks)" : "in phase (resistive)";

  const W = 420;
  const H = 260;
  const padL = 26;
  const padR = 8;
  const mid = H / 2;
  const yk = (H / 2 - 14) / 2.2;
  const x = (t: number) => padL + (t / 2) * (W - padL - padR);
  const y = (v: number) => mid - v * yk;
  const line = (key: "v" | "i" | "p") => pts.map((pt, k) => `${k ? "L" : "M"}${x(pt.t).toFixed(1)},${y(pt[key]).toFixed(1)}`).join(" ");
  // shaded areas of p(t): above zero = energy to the load, below = energy returned
  const area = (sign: 1 | -1) =>
    `M${x(0)},${mid} ` + pts.map((pt) => `L${x(pt.t).toFixed(1)},${y(sign > 0 ? Math.max(0, pt.p) : Math.min(0, pt.p)).toFixed(1)}`).join(" ") + ` L${x(2)},${mid} Z`;

  return (
    <Card title="Why reactive power exists: voltage, current and power over time" subtitle="Same voltage and same current size; only the timing of the current changes">
      <Split>
        <Controls>
          <Segmented
            label="Load"
            value={preset}
            onChange={(v) => {
              const l = LOADS.find((x) => x.value === v);
              if (l) setPhi(l.phi);
            }}
            options={LOADS.map((l) => ({ value: l.value, label: l.label }))}
          />
          <Slider label="Current lags voltage by" value={phi} min={-90} max={90} step={1} unit="°" onChange={setPhi} format={(v) => v.toFixed(0)} />
          <Stats cols={2}>
            <Stat label="Real power P (avg)" value={fmt(e.p, 2)} unit="pu" tone="ok" />
            <Stat label="Reactive power Q" value={fmt(e.q, 2)} unit="pu" />
            <Stat label="Apparent power S" value="1.00" unit="pu" />
            <Stat label="Power factor" value={e.pf.toFixed(2)} />
            <Stat label="Energy back to grid" value={fmt((e.returned / e.forward) * 100, 2)} unit="% of forward" tone="accent" />
            <Stat label="Current for same P" value={e.pf > 0.01 ? fmt(1 / e.pf, 3) : "∞"} unit="× unity-PF" />
          </Stats>
        </Controls>
        <div className="min-w-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" style={{ maxHeight: 320 }} role="img" aria-label="Voltage, current and power waveforms">
            <line x1={padL} y1={mid} x2={W - padR} y2={mid} stroke="var(--border)" />
            <path d={area(1)} fill="var(--ok)" opacity={0.18} />
            <path d={area(-1)} fill="var(--danger)" opacity={0.25} />
            <line x1={padL} y1={y(e.p)} x2={W - padR} y2={y(e.p)} stroke="var(--ok)" strokeDasharray="4 4" />
            <path d={line("v")} fill="none" stroke="var(--chart-1)" strokeWidth={2} />
            <path d={line("i")} fill="none" stroke="var(--chart-2)" strokeWidth={2} />
            <path d={line("p")} fill="none" stroke="var(--chart-3)" strokeWidth={1.5} opacity={0.9} />
            <text x={padL + 4} y={14} fontSize={11} fill="var(--chart-1)">voltage v</text>
            <text x={padL + 70} y={14} fontSize={11} fill="var(--chart-2)">current i</text>
            <text x={padL + 136} y={14} fontSize={11} fill="var(--chart-3)">power p = v × i</text>
            <text x={W - padR - 4} y={y(e.p) - 4} fontSize={10} fill="var(--ok)" textAnchor="end">average = P</text>
            <text x={padL + 4} y={H - 6} fontSize={10} fill="var(--muted)">2 cycles = 40 ms at 50 Hz</text>
          </svg>
          <Hint>
            The current is {lag}. Green area is energy delivered to the load, red is energy handed back to the grid in the same cycle. With a heater
            there is no red: every joule does work. With a coil (90°) green and red cancel: the current is full size but the average power is zero,
            so the cables carry current, get hot and lose voltage while delivering nothing. Utility loads sit in between: at power factor 0.8 the
            grid must push 25 % more current for the same useful power. That extra current, not the returned energy, is what reactive power
            costs: transformer and cable capacity, losses and voltage drop.
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
