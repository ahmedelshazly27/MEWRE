"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { MODULES } from "@/content";
import { Card, InfoPanel, Hint, type WidgetProps } from "./ui";

interface Node {
  id: string;
  name: string;
  description: string;
  related: string[];
  moduleId: string;
  moduleTitle: string;
  lessonId: string;
  lessonTitle: string;
  group: string;
  groupLabel: string;
  x: number;
  y: number;
}

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
const W = 760;
const H = 520;

export default function ConceptMap({ props }: WidgetProps) {
  const moduleFilter = typeof props?.module === "string" ? props.module : undefined;
  const [sel, setSel] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const { nodes, groups, edges } = useMemo(() => {
    const mods = moduleFilter ? MODULES.filter((m) => m.id === moduleFilter) : MODULES;
    const raw: Omit<Node, "x" | "y">[] = [];
    for (const m of mods) {
      for (const l of m.lessons ?? []) {
        for (const c of l.concepts ?? []) {
          raw.push({
            id: c.id,
            name: c.name,
            description: c.description,
            related: c.related ?? [],
            moduleId: m.id,
            moduleTitle: m.title,
            lessonId: l.id,
            lessonTitle: l.title,
            group: moduleFilter ? l.id : m.id,
            groupLabel: moduleFilter ? l.title : `${m.id.toUpperCase()} ${m.title}`,
          });
        }
      }
    }
    // dedupe by id
    const seen = new Set<string>();
    const uniq = raw.filter((n) => (seen.has(n.id) ? false : (seen.add(n.id), true)));
    const groupIds = Array.from(new Set(uniq.map((n) => n.group)));
    const G = groupIds.length;
    // grid of clusters
    const cols = Math.max(1, Math.ceil(Math.sqrt((G * W) / H)));
    const rows = Math.max(1, Math.ceil(G / cols));
    const cw = W / cols;
    const ch = H / rows;
    const groupsOut = groupIds.map((g, gi) => {
      const col = gi % cols;
      const row = Math.floor(gi / cols);
      const members = uniq.filter((n) => n.group === g);
      return {
        id: g,
        label: members[0].groupLabel,
        x: cw * (col + 0.5),
        y: ch * (row + 0.5) + 8,
        labelY: ch * row + 14,
        rc: Math.max(10, Math.min(cw, ch) / 2 - 26),
        color: COLORS[gi % COLORS.length],
        count: members.length,
      };
    });
    const placed: Node[] = [];
    for (const g of groupsOut) {
      const members = uniq.filter((n) => n.group === g.id);
      const n = members.length;
      if (n === 1) {
        placed.push({ ...members[0], x: g.x, y: g.y });
        continue;
      }
      // concentric rings: outer ring holds up to 14, inner the rest
      const outerCount = n <= 14 ? n : Math.ceil(n * 0.62);
      members.forEach((m, k) => {
        const outer = k < outerCount;
        const idx = outer ? k : k - outerCount;
        const cnt = outer ? outerCount : n - outerCount;
        const r = outer ? g.rc : g.rc * 0.5;
        const a = (2 * Math.PI * idx) / cnt - Math.PI / 2 + (outer ? 0 : Math.PI / cnt);
        placed.push({ ...m, x: g.x + r * Math.cos(a), y: g.y + r * Math.sin(a) });
      });
    }
    const byId = new Set(placed.map((p) => p.id));
    const e: [string, string][] = [];
    const key = new Set<string>();
    for (const p of placed) {
      for (const t of p.related) {
        if (!byId.has(t) || t === p.id) continue;
        const k = p.id < t ? `${p.id}|${t}` : `${t}|${p.id}`;
        if (key.has(k)) continue;
        key.add(k);
        e.push([p.id, t]);
      }
    }
    return { nodes: placed, groups: groupsOut, edges: e };
  }, [moduleFilter]);

  const byId = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
  const focus = hover ?? sel;
  const neighbors = useMemo(() => {
    const s = new Set<string>();
    if (focus) for (const [a, b] of edges) {
      if (a === focus) s.add(b);
      if (b === focus) s.add(a);
    }
    return s;
  }, [focus, edges]);
  const groupColor = Object.fromEntries(groups.map((g) => [g.id, g.color]));
  const showAll = nodes.length <= 40;
  const node = sel ? byId[sel] : null;
  const onKey = (id: string) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSel(id);
    }
  };

  const title = moduleFilter ? `Concept map — ${MODULES.find((m) => m.id === moduleFilter)?.title ?? moduleFilter}` : "Curriculum concept map";

  if (!nodes.length) {
    return (
      <Card title={title}>
        <p className="rounded-lg bg-surface-2 px-3 py-6 text-center text-sm text-muted">
          No concepts yet — the map fills in automatically as lessons and their concepts are added.
        </p>
      </Card>
    );
  }

  return (
    <Card title={title} subtitle={`${nodes.length} concepts, ${edges.length} links — click a concept`}>
      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="min-w-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="group" aria-label="Concept map">
            {groups.map((g) => (
              <text key={g.id} x={g.x} y={g.labelY} fontSize={11} textAnchor="middle" fill={g.color} fontWeight={600}>
                {g.label.length > 30 ? g.label.slice(0, 29) + "…" : g.label}
              </text>
            ))}
            {edges.map(([a, b]) => {
              const A = byId[a];
              const B = byId[b];
              const active = focus != null && (a === focus || b === focus);
              return <line key={a + b} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={active ? "var(--accent)" : "var(--border)"} strokeWidth={active ? 1.8 : 1} opacity={focus && !active ? 0.35 : 1} />;
            })}
            {nodes.map((n) => {
              const isSel = sel === n.id;
              const lit = focus == null || n.id === focus || neighbors.has(n.id);
              const showLabel = showAll || n.id === focus || neighbors.has(n.id);
              return (
                <g
                  key={n.id}
                  role="button"
                  tabIndex={0}
                  aria-label={n.name}
                  aria-pressed={isSel}
                  onClick={() => setSel(n.id)}
                  onKeyDown={onKey(n.id)}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-pointer outline-none"
                  opacity={lit ? 1 : 0.35}
                >
                  <circle cx={n.x} cy={n.y} r={isSel ? 8 : 6} fill={groupColor[n.group]} stroke={isSel ? "var(--text)" : "var(--surface)"} strokeWidth={isSel ? 2 : 1.5} />
                  {showLabel && (
                    <text x={n.x} y={n.y + 17} fontSize={10} textAnchor="middle" fill="var(--text)" style={{ paintOrder: "stroke", stroke: "var(--surface)", strokeWidth: 3 }}>
                      {n.name.length > 24 ? n.name.slice(0, 23) + "…" : n.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          <Hint>What to notice: links cross module boundaries — a PM decision (e.g. DC/AC ratio) touches engineering, finance and contracts at once.</Hint>
        </div>
        <InfoPanel title={node?.name} empty="Click a concept to see its description and the lesson that teaches it. Hover to highlight its links.">
          {node && (
            <>
              <p>{node.description}</p>
              <p className="text-muted">
                {node.moduleTitle} · {node.lessonTitle}
              </p>
              {node.related.filter((r) => byId[r]).length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {node.related
                    .filter((r) => byId[r])
                    .map((r) => (
                      <button key={r} type="button" onClick={() => setSel(r)} className="rounded-full border border-border bg-surface px-2 py-0.5 text-xs hover:text-accent">
                        {byId[r].name}
                      </button>
                    ))}
                </div>
              )}
              <Link href={`/learn/${node.moduleId}/${node.lessonId}`} className="inline-block text-sm font-medium text-accent underline underline-offset-2">
                Open lesson →
              </Link>
            </>
          )}
        </InfoPanel>
      </div>
    </Card>
  );
}
