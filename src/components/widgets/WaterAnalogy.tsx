"use client";

import { useEffect, useRef, useState } from "react";
import { ohm, rcCurrent, rcVoltage, rlCurrentOff, rlCurrentOn } from "@/lib/calc/circuit";
import { Card, Slider, Segmented, Stat, Stats, Hint, numProp, fmt, type WidgetProps } from "./ui";

type Mode = "resistor" | "coil" | "capacitor";

const TAU = 1.2; // seconds: slowed-down time constant so the transient is visible
const WINDOW = 6; // seconds of history in the trace

/**
 * The water-loop picture of a circuit, animated: pump = voltage, flow = current, narrow pipe = resistance,
 * heavy wheel = coil (inductance), rubber-membrane tank = capacitor. Dots move at the speed the current implies.
 */
export default function WaterAnalogy({ props }: WidgetProps) {
  const initial = (["resistor", "coil", "capacitor"] as Mode[]).includes(props?.mode as Mode) ? (props!.mode as Mode) : "resistor";
  const [mode, setMode] = useState<Mode>(initial);
  const [v, setV] = useState(() => numProp(props, "v", 240, 0, 240));
  const [r, setR] = useState(() => numProp(props, "r", 24, 6, 96));
  const [on, setOn] = useState(true);
  const [state, setState] = useState({ i: initial === "resistor" ? ohm(240, 24) : 0, vc: 0, t: 0, trace: [] as { t: number; i: number }[] });
  const ref = useRef({ since: 0, i0: 0, vc0: 0, offset: 0, last: 0, trace: [] as { t: number; i: number }[], clock: 0 });
  const [offset, setOffset] = useState(0);

  // restart the transient whenever the switch, mode or values change
  useEffect(() => {
    ref.current.since = ref.current.clock;
    ref.current.i0 = state.i;
    ref.current.vc0 = state.vc;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on, mode, v, r]);

  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      const s = ref.current;
      const dt = s.last ? Math.min(0.05, (now - s.last) / 1000) : 0;
      s.last = now;
      s.clock += dt;
      const t = s.clock - s.since;
      const iFull = ohm(v, r);
      let i: number;
      let vc = s.vc0;
      if (mode === "resistor") i = on ? iFull : 0;
      else if (mode === "coil") {
        // L chosen so that τ = L/R = TAU at the current R
        const l = TAU * r;
        i = on ? s.i0 + (rlCurrentOn(v, r, l, t) / (iFull || 1)) * (iFull - s.i0) : rlCurrentOff(s.i0, r, l, t);
      } else {
        // C chosen so that τ = RC = TAU; switching off shorts the tank through the pipe (it pushes back)
        const c = TAU / r;
        if (on) {
          const vLeft = v - s.vc0;
          i = rcCurrent(vLeft, r, c, t);
          vc = s.vc0 + rcVoltage(vLeft, r, c, t);
        } else {
          i = -rcCurrent(s.vc0, r, c, t);
          vc = s.vc0 - rcVoltage(s.vc0, r, c, t);
        }
      }
      s.offset -= i * dt * 2.2;
      s.trace = [...s.trace.filter((p) => s.clock - p.t < WINDOW), { t: s.clock, i }];
      setOffset(s.offset);
      setState({ i, vc, t, trace: s.trace });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode, on, v, r]);

  const iFull = ohm(v, r);
  const width = 6 + (96 - r) * 0.12; // narrow pipe: thinner for higher R
  const heat = state.i * state.i * r;

  // geometry
  const W = 440;
  const H = 280;
  const loop = "M120,40 L390,40 L390,190 L120,190 Z";
  const wheelAngle = (offset * 40) % 360;

  const trace = state.trace;
  const tMax = trace.length ? trace[trace.length - 1].t : 0;
  const iScale = Math.max(iFull, 1);
  const path = trace.map((p, k) => `${k ? "L" : "M"}${(10 + ((p.t - (tMax - WINDOW)) / WINDOW) * 420).toFixed(1)},${(266 - (p.i / iScale) * 30).toFixed(1)}`).join(" ");

  return (
    <Card title="The water loop: what voltage, current, resistance, coils and capacitors do" subtitle="Pump = voltage. Flow = current. Narrow pipe = resistance. Heavy wheel = coil. Rubber membrane = capacitor.">
      <div className="grid gap-4 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-3">
          <Segmented
            label="In the loop"
            value={mode}
            onChange={(m) => setMode(m)}
            options={[
              { value: "resistor", label: "Narrow pipe" },
              { value: "coil", label: "+ Heavy wheel" },
              { value: "capacitor", label: "+ Membrane" },
            ]}
          />
          <Slider label="Pump pressure (voltage)" value={v} min={0} max={240} step={10} unit="V" onChange={setV} />
          <Slider label="Narrowness (resistance)" value={r} min={6} max={96} step={6} unit="Ω" onChange={setR} />
          <button
            type="button"
            onClick={() => setOn(!on)}
            className={`w-full rounded-lg border px-3 py-2 text-sm font-medium ${on ? "border-accent bg-accent-soft text-accent" : "border-border bg-surface"}`}
          >
            {on ? "Switch the pump off" : "Switch the pump on"}
          </button>
          <Stats cols={2}>
            <Stat label="Flow now (current)" value={fmt(state.i, 3)} unit="A" tone="accent" />
            <Stat label="Steady flow V/R" value={mode === "capacitor" ? "0 (blocked)" : fmt(on ? iFull : 0, 3)} unit={mode === "capacitor" ? undefined : "A"} />
            <Stat label="Heat in the pipe I²R" value={fmt(heat, 3)} unit="W" />
            {mode === "capacitor" && <Stat label="Membrane pressure" value={fmt(state.vc, 3)} unit="V" />}
          </Stats>
        </div>
        <div className="min-w-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Water loop analogy of an electric circuit">
            {/* pipe loop */}
            <path d={loop} fill="none" stroke="var(--border)" strokeWidth={16} strokeLinejoin="round" />
            <path d={loop} fill="none" stroke="var(--info, #3b82f6)" strokeOpacity={0.15} strokeWidth={14} strokeLinejoin="round" />
            {/* flowing water: dashes move with the current */}
            <path d={loop} fill="none" stroke="var(--info, #3b82f6)" strokeWidth={5} strokeDasharray="3 13" strokeDashoffset={offset} strokeLinecap="round" strokeLinejoin="round" />
            {/* narrow section on the top pipe */}
            <rect x={210} y={40 - width / 2 - 6} width={90} height={6} fill="var(--surface)" />
            <rect x={210} y={40 + width / 2} width={90} height={6} fill="var(--surface)" />
            <rect x={210} y={40 - width / 2 - 8} width={90} height={3} fill="var(--text)" opacity={0.6} />
            <rect x={210} y={40 + width / 2 + 5} width={90} height={3} fill="var(--text)" opacity={0.6} />
            <text x={255} y={18} fontSize={11} textAnchor="middle" fill="var(--text)" fontWeight={600}>
              narrow pipe = resistance R
            </text>
            {heat > 1 && (
              <text x={255} y={68} fontSize={10} textAnchor="middle" fill="var(--danger)">
                gets warm: I²R
              </text>
            )}
            {/* pump on the left */}
            <circle cx={120} cy={115} r={26} fill="var(--surface)" stroke="var(--text)" strokeWidth={2} />
            <path d="M120,129 L120,101 M112,109 L120,100 L128,109" stroke="var(--accent)" strokeWidth={3} fill="none" opacity={on && v > 0 ? 1 : 0.25} />
            <text x={4} y={112} fontSize={11} fill="var(--text)" fontWeight={600}>
              pump = voltage
            </text>
            <text x={4} y={126} fontSize={10} fill="var(--muted)">
              {on ? `${v} V push` : "off"}
            </text>
            {/* right side: coil wheel or capacitor membrane or plain load */}
            {mode === "coil" && (
              <g transform={`translate(390,115)`}>
                <circle r={24} fill="var(--surface)" stroke="var(--text)" strokeWidth={2} />
                <g transform={`rotate(${wheelAngle})`}>
                  {[0, 60, 120].map((a) => (
                    <line key={a} x1={-22 * Math.cos((a * Math.PI) / 180)} y1={-22 * Math.sin((a * Math.PI) / 180)} x2={22 * Math.cos((a * Math.PI) / 180)} y2={22 * Math.sin((a * Math.PI) / 180)} stroke="var(--text)" strokeWidth={3} />
                  ))}
                </g>
                <text x={-34} y={46} fontSize={11} fill="var(--text)" fontWeight={600} textAnchor="end">
                  heavy wheel = coil (L)
                </text>
              </g>
            )}
            {mode === "capacitor" && (
              <g transform="translate(390,115)">
                <rect x={-20} y={-30} width={40} height={60} rx={6} fill="var(--surface)" stroke="var(--text)" strokeWidth={2} />
                <path d={`M-20,0 Q0,${Math.max(-26, Math.min(26, -(state.vc / Math.max(v, 1)) * 24))} 20,0`} fill="none" stroke="var(--accent)" strokeWidth={3} />
                <text x={-34} y={50} fontSize={11} fill="var(--text)" fontWeight={600} textAnchor="end">
                  rubber membrane = capacitor (C)
                </text>
              </g>
            )}
            {/* trace of current over time */}
            <rect x={4} y={214} width={432} height={62} rx={6} fill="var(--surface-2)" />
            <line x1={10} y1={266} x2={430} y2={266} stroke="var(--border)" />
            <path d={path} fill="none" stroke="var(--accent)" strokeWidth={1.8} />
            <text x={10} y={228} fontSize={10} fill="var(--muted)">
              flow over the last {WINDOW} s
            </text>
          </svg>
          <p className="mt-1 text-xs text-muted">Electric symbols: pump ↔ battery or generator, narrow pipe ↔ resistor (zig-zag), wheel ↔ coil (loops), membrane tank ↔ capacitor (two plates).</p>
        </div>
      </div>
      <Hint>
        {mode === "resistor" &&
          "More pump pressure, more flow; a narrower pipe, less flow: I = V / R. The narrow section heats up (I²R), which is why cables have current ratings and why the grid moves power at high voltage, low current. Switch off and the flow stops at once."}
        {mode === "coil" &&
          "Switch on: the heavy wheel has to be spun up, so the flow builds slowly instead of jumping. Switch off: the spinning wheel keeps pushing water round for a while. A coil resists changes in current, not current itself. In AC the pump reverses 50 times a second, the wheel is always being pushed against its motion, and the current ends up lagging the voltage."}
        {mode === "capacitor" &&
          "Switch on: water rushes in and stretches the membrane, then the flow stops because the stretched membrane pushes back as hard as the pump. No steady flow passes a capacitor: it blocks DC. Switch off and the membrane pushes the water back the other way. In AC the pump keeps reversing, the membrane keeps filling and emptying, and the current leads the voltage."}
        {" "}Where the picture breaks: real wires need a complete loop or nothing flows, and the electric push travels almost instantly even though the charges themselves crawl.
      </Hint>
    </Card>
  );
}
