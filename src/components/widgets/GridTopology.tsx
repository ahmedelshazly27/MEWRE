"use client";

import { useState } from "react";
import { LEVELS, levelCurrent, lossVs400, type VoltageLevel } from "@/lib/calc/grid";
import { Card, Slider, Stat, Stats, Hint, numProp, fmt, type WidgetProps } from "./ui";

const L = Object.fromEntries(LEVELS.map((l) => [l.id, l])) as Record<string, VoltageLevel>;

/** Stroke colour and width by level: thicker = higher voltage. */
const STYLE: Record<string, { c: string; w: number }> = {
  gen: { c: "var(--chart-5)", w: 3 },
  ehv: { c: "var(--chart-1)", w: 6 },
  hv: { c: "var(--chart-2)", w: 4.5 },
  mv33: { c: "var(--chart-3)", w: 3.5 },
  mv11: { c: "var(--chart-4)", w: 3 },
  lv: { c: "var(--muted)", w: 2 },
  home: { c: "var(--muted)", w: 2 },
  pvdc: { c: "var(--sun, #d4a017)", w: 2.5 },
  pvac: { c: "var(--sun, #d4a017)", w: 2.5 },
};

const fmtAmps = (a: number) => (a >= 10_000 ? `${fmt(a / 1000, 3)} kA` : `${fmt(a, 3)} A`);

/**
 * Grid topology by voltage level: power station → 400 kV → 132 kV → 33/11 kV → 415/240 V, with a PV plant joining
 * the 400 kV network. Click any line or box to see the level, its role, Kuwait confidence and the current needed.
 */
export default function GridTopology({ props }: WidgetProps) {
  const [sel, setSel] = useState<string>(typeof props?.level === "string" && L[props.level as string] ? (props.level as string) : "ehv");
  const [mw, setMw] = useState(() => numProp(props, "mw", 100, 1, 1500));
  const lvl = L[sel];
  const amps = levelCurrent(lvl, mw);

  const seg = (id: string, d: string) => {
    const s = STYLE[id];
    const on = sel === id;
    return (
      <g key={id + d} onClick={() => setSel(id)} className="cursor-pointer">
        <path d={d} fill="none" stroke="transparent" strokeWidth={16} />
        <path d={d} fill="none" stroke={s.c} strokeWidth={on ? s.w + 2.5 : s.w} strokeLinecap="round" opacity={on ? 1 : 0.85} />
      </g>
    );
  };
  const SHORT: Record<string, string> = { pvdc: "DC", pvac: "AC" };
  const tag = (id: string, x: number, y: number, anchor: "start" | "middle" | "end" = "middle") => (
    <text x={x} y={y} fontSize={11} fontWeight={sel === id ? 700 : 600} fill={STYLE[id].c} textAnchor={anchor} onClick={() => setSel(id)} className="cursor-pointer">
      {SHORT[id] ?? L[id].shown}
    </text>
  );
  const box = (x: number, y: number, w: number, h: number, title: string, sub: string, id?: string) => (
    <g onClick={id ? () => setSel(id) : undefined} className={id ? "cursor-pointer" : undefined}>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="var(--surface)" stroke="var(--border)" />
      <text x={x + w / 2} y={y + h / 2 - 4} fontSize={11} fontWeight={600} fill="var(--text)" textAnchor="middle">
        {title}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 11} fontSize={9.5} fill="var(--muted)" textAnchor="middle">
        {sub}
      </text>
    </g>
  );
  // transformer symbol: two overlapping circles
  const tx = (x: number, y: number) => (
    <g aria-hidden>
      <circle cx={x - 5} cy={y} r={8} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.4} />
      <circle cx={x + 5} cy={y} r={8} fill="none" stroke="var(--text)" strokeWidth={1.4} />
    </g>
  );

  return (
    <Card title="The grid by voltage level: from power station to socket" subtitle="Click any line or box. Thicker line = higher voltage. Power steps up to travel far, then steps down to be used.">
      <p className="mb-1 text-xs text-muted md:hidden">Swipe sideways to see the whole grid.</p>
      <div className="overflow-x-auto">
        <svg viewBox="0 44 760 280" className="h-auto w-full min-w-[640px]" role="img" aria-label="Grid topology by voltage level">
          {/* main chain, y = 90 */}
          {box(8, 60, 92, 60, "Power station", "gas / oil turbines", "gen")}
          {seg("gen", "M100,90 L128,90")}
          {tx(140, 90)}
          {seg("ehv", "M152,90 L262,90")}
          {tag("ehv", 200, 80)}
          <text x={182} y={108} fontSize={9.5} fill="var(--muted)" textAnchor="middle">
            long distance
          </text>
          {box(262, 60, 96, 60, "Grid substation", "400 / 132 kV", "hv")}
          {tx(372, 90)}
          {seg("hv", "M384,90 L466,90")}
          {tag("hv", 425, 80)}
          {box(466, 60, 112, 60, "Primary substation", "132 / 33 / 11 kV", "mv33")}
          {tx(592, 90)}
          {seg("mv11", "M604,90 L650,90")}
          {tag("mv11", 627, 80)}
          {box(650, 60, 102, 60, "Distribution sub", "11 kV / 415 V", "lv")}

          {/* low voltage down to homes */}
          {seg("lv", "M701,120 L701,178")}
          {tag("lv", 708, 152, "start")}
          {box(650, 178, 102, 54, "Buildings and homes", "AC units at 415 V", "lv")}
          {seg("home", "M701,232 L701,262")}
          {box(650, 262, 102, 50, "Sockets", "240 V, 50 Hz", "home")}

          {/* 33 kV to large customers */}
          {seg("mv33", "M522,120 L522,178")}
          {tag("mv33", 529, 152, "start")}
          {box(466, 178, 112, 54, "Large industry", "33 kV supply", "mv33")}

          {/* PV plant joining the 400 kV network, bottom left */}
          {box(8, 248, 96, 64, "PV modules", "up to 1,500 V DC", "pvdc")}
          {seg("pvdc", "M104,280 L144,280")}
          {tag("pvdc", 124, 270)}
          {box(144, 252, 70, 56, "Inverters", "DC → AC", "pvac")}
          {seg("pvac", "M214,280 L236,280")}
          {tag("pvac", 225, 270)}
          {tx(248, 280)}
          {seg("mv33", "M260,280 L302,280")}
          {tag("mv33", 281, 270)}
          <text x={281} y={298} fontSize={9.5} fill="var(--muted)" textAnchor="middle">
            collector
          </text>
          {box(302, 248, 104, 64, "Plant substation", "400 / 33 kV", "ehv")}
          {seg("ehv", "M354,248 L354,200 L238,200 L238,90")}
          <text x={304} y={194} fontSize={9.5} fill="var(--muted)" textAnchor="middle">
            joins the 400 kV network
          </text>
          <text x={8} y={238} fontSize={10.5} fontWeight={600} fill="var(--text)">
            Solar plant (for example Shagaya)
          </text>
        </svg>
      </div>

      <div className="mt-3 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0 rounded-lg border border-border bg-surface-2 p-3 text-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-semibold">
              {lvl.label}: {lvl.shown}
            </span>
            <span className={`rounded-md px-2 py-0.5 text-xs ${lvl.kuwait === "confirmed" ? "bg-ok-soft text-ok" : "bg-warn-soft text-warn"}`}>Kuwait: {lvl.kuwait}</span>
          </div>
          <p className="mt-1">{lvl.role}</p>
          <p className="mt-1 text-muted">{lvl.note}</p>
        </div>
        <div className="min-w-0">
          <Slider label="Power to deliver" value={mw} min={1} max={1500} step={1} unit="MW" onChange={setMw} />
          <Stats cols={2}>
            <Stat label={`Current at ${lvl.shown}`} value={fmtAmps(amps)} tone="accent" />
            <Stat label="Heat loss vs 400 kV, same wire" value={`${fmt(lossVs400(lvl), 3)}×`} />
          </Stats>
        </div>
      </div>
      <Hint>
        Same power, different voltage: current is power divided by voltage, and the heat lost in a wire grows with current squared. That is why power
        leaves the station at 400 kV (100 MW needs about 144 A) and is only brought down to 240 V at the last few metres (the same 100 MW at 240 V would
        need over 400,000 A). Each step down happens in a substation through a transformer, the two-circle symbol. A solar plant does the reverse: low
        DC voltage at the modules, stepped up twice to reach the 400 kV network. Only 400 kV is confirmed for Kuwait in our sources; the other levels are
        commonly cited and worth confirming with MEWRE.
      </Hint>
    </Card>
  );
}
