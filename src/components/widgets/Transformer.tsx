"use client";

import { useEffect, useState } from "react";
import { transformer } from "@/lib/calc/electro";
import { Card, Split, Controls, Slider, Segmented, Stat, Stats, Hint, numProp, fmt, type WidgetProps } from "./ui";

const PRESETS = [
  { value: "400-132", label: "400/132 kV", v1: 400, n1: 400, n2: 132, s: 500 },
  { value: "400-33", label: "400/33 kV", v1: 400, n1: 400, n2: 33, s: 300 },
  { value: "11-0.415", label: "11 kV/415 V", v1: 11, n1: 11000, n2: 415, s: 1 },
] as const;

/** A core with two windings: changing flux links them, voltage scales with turns, current the other way. */
export default function Transformer({ props }: WidgetProps) {
  const start = PRESETS.find((p) => p.value === props?.preset) ?? PRESETS[1];
  const [preset, setPreset] = useState<string>(start.value);
  const [s, setS] = useState(() => numProp(props, "mva", start.s, 1, 800));
  const [ac, setAc] = useState(true);
  const [phase, setPhase] = useState(0);
  const p = PRESETS.find((x) => x.value === preset)!;
  const t = transformer(p.v1 * 1e3, p.n1, p.n2, s * 1e6);

  useEffect(() => {
    if (!ac) return;
    let raf = 0;
    const tick = () => {
      setPhase((x) => x + 0.6);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ac]);

  const turns1 = 9;
  const turns2 = Math.max(2, Math.round((turns1 * p.n2) / p.n1 * 3));
  const coil = (x: number, n: number, color: string) =>
    Array.from({ length: n }, (_, i) => <ellipse key={i} cx={x} cy={62 + (i * 116) / Math.max(n - 1, 1)} rx={22} ry={5} fill="none" stroke={color} strokeWidth={2.5} />);
  const amps = (a: number) => (a >= 1000 ? `${fmt(a / 1000, 3)} kA` : `${fmt(a, 3)} A`);

  return (
    <Card title="Inside a transformer: two coils on one iron core" subtitle="AC in the first coil makes a changing magnetic flux; the flux passes through the second coil and induces a voltage there">
      <Split>
        <Controls>
          <Segmented label="Transformer" value={preset} onChange={(v) => { setPreset(v); setS(PRESETS.find((x) => x.value === v)!.s); }} options={PRESETS.map((x) => ({ value: x.value, label: x.label }))} />
          <Slider label="Power through it" value={s} min={1} max={800} step={1} unit="MVA" onChange={setS} />
          <Segmented label="Supply" value={ac ? "ac" : "dc"} onChange={(v) => setAc(v === "ac")} options={[{ value: "ac", label: "AC (50 Hz)" }, { value: "dc", label: "Steady DC" }]} />
          <Stats cols={2}>
            <Stat label="Primary voltage" value={fmt(p.v1, 3)} unit="kV" />
            <Stat label="Secondary voltage" value={ac ? fmt(t.v2 / 1e3, 3) : "0"} unit="kV" tone="accent" />
            <Stat label="Primary current" value={amps(t.i1)} />
            <Stat label="Secondary current" value={ac ? amps(t.i2) : "0"} tone="accent" />
          </Stats>
        </Controls>
        <div className="min-w-0">
          <svg viewBox="0 0 340 240" className="h-auto w-full" style={{ maxHeight: 300 }} role="img" aria-label="Transformer core and windings">
            {/* core */}
            <path d="M90,40 H250 V200 H90 Z M120,70 H220 V170 H120 Z" fill="var(--surface-2)" stroke="var(--text)" fillRule="evenodd" strokeWidth={1.5} />
            {/* flux path */}
            <rect x={105} y={55} width={130} height={130} rx={6} fill="none" stroke="var(--accent)" strokeWidth={3} strokeDasharray="10 10" strokeDashoffset={ac ? -phase : 0} opacity={ac ? 0.9 : 0.25} />
            <text x={170} y={114} fontSize={10.5} textAnchor="middle" fill="var(--accent)">
              {ac ? "changing" : "steady flux:"}
            </text>
            <text x={170} y={128} fontSize={10.5} textAnchor="middle" fill="var(--accent)">
              {ac ? "flux Φ" : "nothing induced"}
            </text>
            {coil(105, turns1, "var(--chart-1)")}
            {coil(235, turns2, "var(--chart-2)")}
            <text x={105} y={30} fontSize={11} textAnchor="middle" fill="var(--chart-1)" fontWeight={600}>
              primary
            </text>
            <text x={76} y={122} fontSize={10.5} textAnchor="end" fill="var(--chart-1)">
              {p.n1.toLocaleString()} turns
            </text>
            <text x={235} y={30} fontSize={11} textAnchor="middle" fill="var(--chart-2)" fontWeight={600}>
              secondary
            </text>
            <text x={264} y={122} fontSize={10.5} textAnchor="start" fill="var(--chart-2)">
              {p.n2.toLocaleString()} turns
            </text>
            <text x={170} y={226} fontSize={10.5} textAnchor="middle" fill="var(--muted)">
              voltage ratio = turns ratio = {fmt(p.n1 / p.n2, 3)} : 1
            </text>
          </svg>
          <Hint>
            Voltage goes down by the turns ratio and current goes up by the same ratio, so power in equals power out (minus well under 1 % loss in a big
            unit). For example, on a 300 MVA, 400/33 kV unit the 33 kV side carries over 5,000 A while the 400 kV side carries about 430 A. Switch to steady DC:
            the flux stops changing and the secondary goes dead, which is why the grid is AC. Turns shown are illustrative; real windings use the same ratio
            with far more turns.
          </Hint>
        </div>
      </Split>
    </Card>
  );
}
