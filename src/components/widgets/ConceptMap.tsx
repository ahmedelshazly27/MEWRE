"use client";

import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import Link from "next/link";

interface GraphModule {
  id: string;
  title: string;
  lessons: { id: string; title: string; concepts: { id: string; name: string; description: string; related: string[] }[] }[];
}
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
  const [MODULES, setModules] = useState<GraphModule[]>([]);
  useEffect(() => {
    fetch("/data/concepts.json")
      .then((r) => r.json())
      .then(setModules)
      .catch(() => setModules([]));
  }, []);

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
        maxChars: Math.max(6, Math.floor(cw / 6.6)),
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
      // concentric rings from the outside in, ~13 px between neighbours
      const rings: { r: number; cap: number }[] = [];
      let left = n;
      for (let r = g.rc; left > 0; r -= 14) {
        const cap = r < 8 ? left : Math.max(1, Math.floor((2 * Math.PI * r) / 13));
        rings.push({ r: Math.max(r, 0), cap: Math.min(cap, left) });
        left -= Math.min(cap, left);
      }
      let k = 0;
      rings.forEach((ring, ri) => {
        for (let j = 0; j < ring.cap; j++, k++) {
          const a = (2 * Math.PI * j) / ring.cap - Math.PI / 2 + (ri % 2 ? Math.PI / ring.cap : 0);
          placed.push({ ...members[k], x: g.x + ring.r * Math.cos(a), y: g.y + ring.r * Math.sin(a) });
        }
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
  }, [moduleFilter, MODULES]);

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
                {g.label.length > g.maxChars ? g.label.slice(0, g.maxChars - 1) + "…" : g.label}
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
                  <circle cx={n.x} cy={n.y} r={isSel ? 8 : nodes.length > 120 ? 4.5 : 6} fill={groupColor[n.group]} stroke={isSel ? "var(--text)" : "var(--surface)"} strokeWidth={isSel ? 2 : 1.5} />
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
