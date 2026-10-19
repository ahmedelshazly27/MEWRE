"use client";

/**
 * IEC-style single-line-diagram symbols (drawn vertically, centred at 0,0; rotate for horizontal use).
 * Stroke colours use CSS variables so diagrams follow light/dark theme.
 */
import type { ReactNode, KeyboardEvent } from "react";

const S = "var(--text)";

type P = { x: number; y: number; rot?: number; scale?: number };
const tf = ({ x, y, rot = 0, scale = 1 }: P) => `translate(${x} ${y}) rotate(${rot}) scale(${scale})`;

/** Circuit breaker: square with leads (height 28). */
export function Breaker(p: P & { closed?: boolean }) {
  return (
    <g transform={tf(p)} stroke={S} strokeWidth={1.6} fill="none">
      <line x1={0} y1={-14} x2={0} y2={-8} />
      <rect x={-7} y={-7} width={14} height={14} fill={p.closed === false ? "none" : "var(--surface)"} />
      <line x1={0} y1={8} x2={0} y2={14} />
    </g>
  );
}

/** Disconnector (isolator): blade shown open (height 28). */
export function Disconnector(p: P) {
  return (
    <g transform={tf(p)} stroke={S} strokeWidth={1.6} fill="none">
      <line x1={0} y1={-14} x2={0} y2={-7} />
      <line x1={-5} y1={-7} x2={5} y2={-7} />
      <line x1={0} y1={7} x2={-8} y2={-5} />
      <line x1={0} y1={7} x2={0} y2={14} />
    </g>
  );
}

/** Two-winding transformer: two overlapping circles (height 56). */
export function Transformer(p: P & { r?: number }) {
  const r = p.r ?? 12;
  return (
    <g transform={tf(p)} stroke={S} strokeWidth={1.6} fill="none">
      <line x1={0} y1={-28} x2={0} y2={-8 - r + 1} />
      <circle cx={0} cy={-8} r={r} />
      <circle cx={0} cy={8} r={r} />
      <line x1={0} y1={8 + r - 1} x2={0} y2={28} />
    </g>
  );
}

/** Current transformer: ring on the conductor (height 20). */
export function CT(p: P) {
  return (
    <g transform={tf(p)} stroke={S} strokeWidth={1.6} fill="none">
      <line x1={0} y1={-10} x2={0} y2={10} />
      <circle cx={0} cy={0} r={6} />
    </g>
  );
}

/** Earth symbol (top at 0,0). */
export function Earth(p: P) {
  return (
    <g transform={tf(p)} stroke={S} strokeWidth={1.6}>
      <line x1={-8} y1={0} x2={8} y2={0} />
      <line x1={-5} y1={4} x2={5} y2={4} />
      <line x1={-2} y1={8} x2={2} y2={8} />
    </g>
  );
}

/** Voltage transformer to earth, hanging down from (0,0). */
export function VT(p: P) {
  return (
    <g transform={tf(p)} stroke={S} strokeWidth={1.6} fill="none">
      <line x1={0} y1={0} x2={0} y2={6} />
      <circle cx={0} cy={12} r={6} />
      <circle cx={0} cy={20} r={6} />
      <line x1={0} y1={26} x2={0} y2={30} />
      <Earth x={0} y={30} />
    </g>
  );
}

/** Surge arrester to earth, hanging down from (0,0). */
export function SurgeArrester(p: P) {
  return (
    <g transform={tf(p)} stroke={S} strokeWidth={1.6} fill="none">
      <line x1={0} y1={0} x2={0} y2={6} />
      <rect x={-5} y={6} width={10} height={18} />
      <path d="M0 9 L0 19 M-3 16 L0 20 L3 16" />
      <line x1={0} y1={24} x2={0} y2={30} />
      <Earth x={0} y={30} />
    </g>
  );
}

/** Earthing switch to earth, from (0,0) downward. */
export function EarthingSwitch(p: P) {
  return (
    <g transform={tf(p)} stroke={S} strokeWidth={1.6} fill="none">
      <line x1={0} y1={0} x2={0} y2={6} />
      <line x1={-4} y1={6} x2={4} y2={6} />
      <line x1={0} y1={20} x2={-7} y2={9} />
      <line x1={0} y1={20} x2={0} y2={24} />
      <Earth x={0} y={24} />
    </g>
  );
}

/** Inverter box (40×40) with DC/AC marks. */
export function Inverter(p: P) {
  return (
    <g transform={tf(p)} stroke={S} strokeWidth={1.6} fill="var(--surface)">
      <rect x={-20} y={-20} width={40} height={40} rx={2} />
      <line x1={-20} y1={20} x2={20} y2={-20} />
      <path d="M-15 -11 h10 M-15 -7 h10" fill="none" />
      <path d="M5 10 q2.5 -4 5 0 t5 0" fill="none" />
    </g>
  );
}

/** PV module rectangle with cell lines. */
export function Module(p: P & { w?: number; h?: number }) {
  const w = p.w ?? 12;
  const h = p.h ?? 18;
  return (
    <g transform={tf(p)} stroke={S} strokeWidth={1.2} fill="var(--info-soft)">
      <rect x={-w / 2} y={-h / 2} width={w} height={h} />
      <line x1={-w / 2} y1={0} x2={w / 2} y2={0} />
      <line x1={0} y1={-h / 2} x2={0} y2={h / 2} />
    </g>
  );
}

/** Fuse (small rectangle on the line), horizontal length 18. */
export function Fuse(p: P) {
  return (
    <g transform={tf(p)} stroke={S} strokeWidth={1.4} fill="var(--surface)">
      <rect x={-4} y={-8} width={8} height={16} />
      <line x1={0} y1={-8} x2={0} y2={8} />
    </g>
  );
}

/** Arrow head pointing down at (0,0). */
export function ArrowDown(p: P) {
  return <path transform={tf(p)} d="M-5 -8 L0 0 L5 -8" fill="none" stroke={S} strokeWidth={1.6} />;
}

export function Wire({ d, dashed }: { d: string; dashed?: boolean }) {
  return <path d={d} fill="none" stroke={S} strokeWidth={1.6} strokeDasharray={dashed ? "4 3" : undefined} />;
}

export function Bus({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={S} strokeWidth={5} strokeLinecap="round" />;
}

export function Label({ x, y, children, anchor = "middle", size = 10, muted = true }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; size?: number; muted?: boolean }) {
  return (
    <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={muted ? "var(--muted)" : "var(--text)"} style={{ pointerEvents: "none" }}>
      {children}
    </text>
  );
}

/** Clickable translucent hit-box with hover/selected highlight. Render it AFTER the symbols so it captures clicks. */
export function Hot({
  id,
  x,
  y,
  w,
  h,
  selected,
  onSelect,
  title,
}: {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  selected: boolean;
  onSelect: (id: string) => void;
  title: string;
}) {
  const onKey = (e: KeyboardEvent<SVGRectElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(id);
    }
  };
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={6}
      role="button"
      tabIndex={0}
      aria-label={title}
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      onKeyDown={onKey}
      className={`cursor-pointer outline-none transition-colors ${
        selected ? "fill-[var(--accent)] stroke-[var(--accent)]" : "fill-transparent stroke-transparent hover:fill-[var(--accent)] focus-visible:stroke-[var(--accent)]"
      }`}
      fillOpacity={0.12}
      strokeWidth={1.5}
      strokeDasharray={selected ? "4 3" : undefined}
    >
      <title>{title}</title>
    </rect>
  );
}

export interface ComponentInfo {
  title: string;
  role: string;
  rating: string;
  checks: string[];
}

export function InfoBody({ info }: { info: ComponentInfo }) {
  return (
    <>
      <p>{info.role}</p>
      <p>
        <span className="font-medium">Typical rating (1 GW Kuwait PV): </span>
        {info.rating}
      </p>
      <div>
        <span className="font-medium">PM checks:</span>
        <ul className="ml-4 mt-1 list-disc space-y-1">
          {info.checks.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
