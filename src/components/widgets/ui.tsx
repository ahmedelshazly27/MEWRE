"use client";

import { useId, type ReactNode, type CSSProperties } from "react";

export type WidgetProps = { props?: Record<string, unknown> };

/** Read a numeric prop with fallback and optional clamping. */
export function numProp(props: Record<string, unknown> | undefined, key: string, fallback: number, min?: number, max?: number): number {
  const v = props?.[key];
  let n = typeof v === "number" && Number.isFinite(v) ? v : typeof v === "string" && v.trim() !== "" && Number.isFinite(Number(v)) ? Number(v) : fallback;
  if (min != null) n = Math.max(min, n);
  if (max != null) n = Math.min(max, n);
  return n;
}

/** Read a string-enum prop with fallback. */
export function enumProp<T extends string>(props: Record<string, unknown> | undefined, key: string, allowed: readonly T[], fallback: T): T {
  const v = props?.[key];
  return typeof v === "string" && (allowed as readonly string[]).includes(v) ? (v as T) : fallback;
}

/** Format to `sig` significant figures with thousands separators (no scientific notation for normal ranges). */
export function fmt(n: number, sig = 3): string {
  if (n == null || Number.isNaN(n)) return "–";
  if (!Number.isFinite(n)) return n > 0 ? "∞" : "−∞";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  const digits = Math.floor(Math.log10(abs)) + 1;
  const decimals = Math.max(0, Math.min(6, sig - digits));
  const rounded = Number(n.toPrecision(sig));
  return rounded.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: decimals }).replace("-", "−");
}

/** Format a fraction as a percentage. */
export function pct(x: number, decimals = 1): string {
  if (x == null || !Number.isFinite(x)) return "–";
  return `${(x * 100).toFixed(decimals).replace("-", "−")} %`;
}

export function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="not-prose my-6 w-full min-w-0 rounded-xl border border-border bg-surface p-4 text-[0.95rem] leading-normal text-text">
      <header className="mb-3">
        <h3 className="text-base font-semibold">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}

/** Two-column (controls | output) on ≥640px; stacked on mobile. */
export function Split({ children, wideRight = true }: { children: ReactNode; wideRight?: boolean }) {
  return (
    <div className={`grid min-w-0 gap-4 ${wideRight ? "sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]" : "sm:grid-cols-2"}`}>{children}</div>
  );
}

export function Controls({ children }: { children: ReactNode }) {
  return <div className="flex min-w-0 flex-col gap-3">{children}</div>;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  const id = useId();
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <label htmlFor={id} className="text-muted">
          {label}
        </label>
        <span className="font-mono text-[0.85rem] tabular-nums">
          {format ? format(value) : fmt(value, 4)}
          {unit ? <span className="text-muted"> {unit}</span> : null}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-[var(--accent)]"
      />
    </div>
  );
}

export function NumField({
  label,
  value,
  onChange,
  unit,
  step = "any",
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  step?: number | "any";
  min?: number;
  max?: number;
}) {
  const id = useId();
  return (
    <div className="flex min-w-0 items-center justify-between gap-2 text-sm">
      <label htmlFor={id} className="text-muted">
        {label}
      </label>
      <span className="flex items-center gap-1">
        <input
          id={id}
          type="number"
          value={Number.isFinite(value) ? value : ""}
          step={step}
          min={min}
          max={max}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (e.target.value !== "" && Number.isFinite(v)) onChange(v);
          }}
          className="w-24 rounded-md border border-border bg-surface-2 px-2 py-1 text-right font-mono text-[0.85rem] tabular-nums"
        />
        {unit && <span className="w-12 text-xs text-muted">{unit}</span>}
      </span>
    </div>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  const id = useId();
  return (
    <div className="flex min-w-0 items-center justify-between gap-2 text-sm">
      <label htmlFor={id} className="text-muted">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="min-w-0 max-w-[60%] rounded-md border border-border bg-surface-2 px-2 py-1 text-sm"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label?: string;
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2 text-sm">
      {label && <span className="text-muted">{label}</span>}
      <div role="group" aria-label={label} className="inline-flex flex-wrap rounded-lg border border-border bg-surface-2 p-0.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={o.value === value}
            onClick={() => onChange(o.value)}
            className={`rounded-md px-2.5 py-1 text-sm transition-colors ${
              o.value === value ? "bg-surface font-medium text-accent shadow-sm" : "text-muted hover:text-text"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export type Tone = "default" | "accent" | "ok" | "warn" | "danger" | "sun";
const toneClass: Record<Tone, string> = {
  default: "text-text",
  accent: "text-accent",
  ok: "text-ok",
  warn: "text-warn",
  danger: "text-danger",
  sun: "text-sun",
};

export function Stat({ label, value, unit, tone = "default", note }: { label: string; value: string; unit?: string; tone?: Tone; note?: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-border bg-surface-2 px-3 py-2">
      <div className="truncate text-xs text-muted" title={label}>
        {label}
      </div>
      <div className={`font-mono text-base font-semibold tabular-nums ${toneClass[tone]}`}>
        {value}
        {unit && <span className="ml-1 text-xs font-normal text-muted">{unit}</span>}
      </div>
      {note && <div className="text-[0.7rem] text-muted">{note}</div>}
    </div>
  );
}

export function Stats({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const c = cols === 4 ? "sm:grid-cols-4" : cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";
  return <div className={`grid grid-cols-2 gap-2 ${c}`}>{children}</div>;
}

export function Hint({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-xs leading-relaxed text-muted">{children}</p>;
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="mt-3 rounded-md bg-surface-2 px-3 py-2 text-xs leading-relaxed text-muted">{children}</p>;
}

export function ChartBox({ children, height = 260 }: { children: ReactNode; height?: number }) {
  return (
    <div className="w-full min-w-0" style={{ height }}>
      {children}
    </div>
  );
}

/** Side panel for click-to-inspect widgets. */
export function InfoPanel({ title, children, empty }: { title?: string; children?: ReactNode; empty: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-border bg-surface-2 p-3 text-sm">
      {title ? (
        <>
          <h4 className="mb-1 font-semibold">{title}</h4>
          <div className="space-y-2 leading-relaxed">{children}</div>
        </>
      ) : (
        <p className="text-muted">{empty}</p>
      )}
    </div>
  );
}

// ---- Recharts shared styling (CSS variables so dark mode works)
export const axisTick = { fill: "var(--muted)", fontSize: 11 } as const;
export const axisLine = { stroke: "var(--border)" } as const;
export const gridProps = { stroke: "var(--chart-grid)", strokeDasharray: "3 3" } as const;
export const tooltipStyle: CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  color: "var(--text)",
  fontSize: 12,
};
export const tooltipLabelStyle: CSSProperties = { color: "var(--muted)" };
export const legendStyle: CSSProperties = { fontSize: 12, color: "var(--muted)" };
export const C = {
  c1: "var(--chart-1)",
  c2: "var(--chart-2)",
  c3: "var(--chart-3)",
  c4: "var(--chart-4)",
  c5: "var(--chart-5)",
  grid: "var(--chart-grid)",
  text: "var(--text)",
  muted: "var(--muted)",
  border: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  ok: "var(--ok)",
  warn: "var(--warn)",
  sun: "var(--sun)",
} as const;

export function axisLabel(value: string, position: "insideBottom" | "insideLeft" | "insideRight" = "insideBottom", angle?: number) {
  return { value, position, angle, fill: "var(--muted)", fontSize: 11, offset: position === "insideBottom" ? -2 : 10, style: { textAnchor: "middle" as const } };
}
