"use client";

import { useEffect, useRef, useState } from "react";
import { induced } from "@/lib/calc/electro";
import { Card, Segmented, Hint, type WidgetProps } from "./ui";

type Mode = "dc" | "switch" | "ac";
const WINDOW = 6;

/**
 * Current makes a magnetic field; a changing field induces a voltage in a nearby coil. The meter on the second coil
 * moves only while the first coil's current changes. Slow motion: AC shown at 0.5 Hz.
 */
export default function Induction({ props }: WidgetProps) {
  const [mode, setMode] = useState<Mode>((["dc", "switch", "ac"] as Mode[]).includes(props?.mode as Mode) ? (props!.mode as Mode) : "switch");
  const [on, setOn] = useState(true);
  const [snap, setSnap] = useState({ i: 0, v: 0, trace: [] as { t: number; i: number; v: number }[] });
  const s = useRef({ clock: 0, last: 0, i: 0, since: 0, trace: [] as { t: number; i: number; v: number }[] });

  useEffect(() => {
    s.current.since = s.current.clock;
  }, [mode, on]);

  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      const st = s.current;
      const dt = st.last ? Math.min(0.05, (now - st.last) / 1000) : 0;
      st.last = now;
      st.clock += dt;
      const t = st.clock - st.since;
      let target: number;
      if (mode === "dc") target = 1;
      else if (mode === "ac") target = Math.sin(2 * Math.PI * 0.5 * st.clock);
      else target = on ? 1 - Math.exp(-t / 0.25) : Math.exp(-t / 0.25) * (st.i > 0 ? 1 : 0);
      const didt = dt > 0 ? (target - st.i) / dt : 0;
      st.i = target;
      const v = Math.max(-1.2, Math.min(1.2, induced(0.12, didt)));
      st.trace = [...st.trace.filter((p) => st.clock - p.t < WINDOW), { t: st.clock, i: target, v }];
      setSnap({ i: target, v, trace: st.trace });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode, on]);

  const strength = Math.abs(snap.i);
  const dir = snap.i >= 0 ? 1 : -1;
  const tMax = snap.trace.length ? snap.trace[snap.trace.length - 1].t : 0;
  const line = (key: "i" | "v", y0: number) =>
    snap.trace.map((p, k) => `${k ? "L" : "M"}${(20 + ((p.t - (tMax - WINDOW)) / WINDOW) * 300).toFixed(1)},${(y0 - p[key] * 18).toFixed(1)}`).join(" ");
  const needle = snap.v * 60; // degrees

  return (
    <Card title="Magnetism and induction: the idea behind generators, motors and transformers" subtitle="Left coil: current makes a magnetic field. Right coil: a voltage appears only while that field is changing">
      <div className="mb-2 flex flex-wrap items-end gap-3">
        <Segmented
          label="Current in the left coil"
          value={mode}
          onChange={(m) => setMode(m)}
          options={[
            { value: "dc", label: "Steady DC" },
            { value: "switch", label: "Switch on/off" },
            { value: "ac", label: "AC (slow motion)" },
          ]}
        />
        {mode === "switch" && (
          <button type="button" onClick={() => setOn(!on)} className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${on ? "border-accent bg-accent-soft text-accent" : "border-border bg-surface"}`}>
            {on ? "Switch off" : "Switch on"}
          </button>
        )}
      </div>
      <svg viewBox="0 0 340 250" className="h-auto w-full" style={{ maxHeight: 340 }} role="img" aria-label="Two coils and magnetic field">
        {/* field loops around left coil */}
        {[30, 48, 66].map((rad, k) => (
          <ellipse key={rad} cx={90} cy={80} rx={rad + 18} ry={rad} fill="none" stroke="var(--accent)" strokeWidth={1.6} opacity={Math.min(1, strength * (1.1 - k * 0.3))} strokeDasharray={dir > 0 ? "8 5" : "3 5"} />
        ))}
        {/* left coil */}
        {Array.from({ length: 6 }, (_, i) => (
          <ellipse key={i} cx={90} cy={58 + i * 9} rx={16} ry={4} fill="none" stroke="var(--chart-1)" strokeWidth={2.5} />
        ))}
        <text x={90} y={150} fontSize={11} textAnchor="middle" fill="var(--chart-1)" fontWeight={600}>
          current I
        </text>
        <text x={90} y={14} fontSize={10.5} textAnchor="middle" fill="var(--accent)">
          magnetic field {strength < 0.05 ? "(none)" : dir > 0 ? "→" : "←"}
        </text>
        {/* right coil + meter */}
        {Array.from({ length: 6 }, (_, i) => (
          <ellipse key={i} cx={210} cy={58 + i * 9} rx={16} ry={4} fill="none" stroke="var(--chart-2)" strokeWidth={2.5} />
        ))}
        <circle cx={290} cy={80} r={30} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.5} />
        <line x1={290} y1={80} x2={290 + 24 * Math.sin((needle * Math.PI) / 180)} y2={80 - 24 * Math.cos((needle * Math.PI) / 180)} stroke="var(--danger)" strokeWidth={2.5} />
        <text x={290} y={126} fontSize={11} textAnchor="middle" fill="var(--chart-2)" fontWeight={600}>
          induced voltage
        </text>
        <line x1={226} y1={70} x2={262} y2={76} stroke="var(--muted)" />
        <line x1={226} y1={94} x2={262} y2={88} stroke="var(--muted)" />
        {/* traces */}
        <rect x={14} y={162} width={312} height={84} rx={6} fill="var(--surface-2)" />
        <line x1={20} y1={186} x2={320} y2={186} stroke="var(--border)" />
        <line x1={20} y1={226} x2={320} y2={226} stroke="var(--border)" />
        <path d={line("i", 186)} fill="none" stroke="var(--chart-1)" strokeWidth={1.8} />
        <path d={line("v", 226)} fill="none" stroke="var(--danger)" strokeWidth={1.8} />
        <text x={22} y={174} fontSize={9.5} fill="var(--chart-1)">
          current in left coil
        </text>
        <text x={22} y={243} fontSize={9.5} fill="var(--danger)">
          voltage in right coil
        </text>
      </svg>
      <Hint>
        Steady DC: a strong field, but the meter stays at zero, because only a changing field induces voltage. Switch on or off: a kick on the meter while
        the current changes, then nothing. AC: the current never stops changing, so the meter swings all the time, a quarter cycle out of step with the
        current. A generator makes the change by spinning a magnet, a transformer by feeding AC into one coil, and a coil&apos;s own induced voltage is what makes
        it resist changes in current (inductance).
      </Hint>
    </Card>
  );
}
