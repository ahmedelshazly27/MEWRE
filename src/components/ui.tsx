import Link from "next/link";
import type { ReactNode } from "react";
import { LEVEL_LABEL, masteryLevel } from "@/lib/mastery";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border bg-surface p-4 sm:p-5 ${className}`}>{children}</div>;
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: ReactNode; children?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 max-w-2xl text-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-muted">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-muted">{hint}</div>}
    </div>
  );
}

export function ProgressBar({ value, className = "", tone = "accent" }: { value: number; className?: string; tone?: "accent" | "sun" | "ok" | "danger" }) {
  const color = { accent: "bg-accent", sun: "bg-sun", ok: "bg-ok", danger: "bg-danger" }[tone];
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-surface-2 ${className}`}>
      <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${Math.round(Math.min(1, Math.max(0, value)) * 100)}%` }} />
    </div>
  );
}

const LEVEL_STYLE = {
  "not-started": "bg-surface-2 text-muted",
  novice: "bg-danger-soft text-danger",
  developing: "bg-warn-soft text-warn",
  proficient: "bg-info-soft text-info",
  mastered: "bg-ok-soft text-ok",
} as const;

export function MasteryBadge({ mastery, evidence }: { mastery: number; evidence: number }) {
  const level = masteryLevel(mastery, evidence > 0);
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_STYLE[level]}`}>
      {LEVEL_LABEL[level]}
      {evidence > 0 && <span className="tabular-nums opacity-75">{Math.round(mastery * 100)}%</span>}
    </span>
  );
}

export function Button({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: "primary" | "ghost"; className?: string }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors";
  const v = variant === "primary" ? "bg-accent text-white hover:opacity-90 dark:text-black" : "border border-border bg-surface hover:bg-surface-2";
  return (
    <Link href={href} className={`${base} ${v} ${className}`}>
      {children}
    </Link>
  );
}

export const btn = {
  primary: "inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 dark:text-black",
  ghost: "inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-2 disabled:opacity-40",
  small: "inline-flex items-center justify-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium hover:bg-surface-2 disabled:opacity-40",
};

export function Pill({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "accent" | "sun" | "info" | "ok" | "warn" | "danger" }) {
  const t = {
    muted: "bg-surface-2 text-muted",
    accent: "bg-accent-soft text-accent",
    sun: "bg-sun-soft text-sun",
    info: "bg-info-soft text-info",
    ok: "bg-ok-soft text-ok",
    warn: "bg-warn-soft text-warn",
    danger: "bg-danger-soft text-danger",
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${t}`}>{children}</span>;
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border p-8 text-center">
      <div className="font-medium">{title}</div>
      {children && <div className="mt-1 text-sm text-muted">{children}</div>}
    </div>
  );
}

export function fmtDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

export const LAYER_META = {
  theory: { label: "Theory", tone: "info" as const, hint: "The science and the why" },
  applied: { label: "Applied", tone: "sun" as const, hint: "Worked examples with Kuwait numbers" },
  field: { label: "Field practice", tone: "accent" as const, hint: "How it is really done on projects" },
};
