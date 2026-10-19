"use client";

import { DIAGRAM_MARKERS, type DiagramId } from "@/content/widgets";
import { DIAGRAMS, type MarkerPos } from "./defs";

/** 1-based number of a marker in DIAGRAM_MARKERS[id] (0 if unknown). */
export function markerNumber(id: DiagramId, markerId: string): number {
  const list = DIAGRAM_MARKERS[id] as readonly string[] | undefined;
  if (!list) return 0;
  return list.indexOf(markerId) + 1;
}

/** Human-readable label for a marker (falls back to the id). */
export function markerLabel(id: DiagramId, markerId: string): string {
  return DIAGRAMS[id]?.labels[markerId] ?? markerId;
}

function leaderEnd(m: MarkerPos): [number, number] {
  const anchor = m.anchor ?? "middle";
  if (anchor === "start") return [m.lx - 4, m.ly - 4];
  if (anchor === "end") return [m.lx + 4, m.ly - 4];
  return [m.lx, m.ly < m.y ? m.ly + 5 : m.ly - 13];
}

export function Diagram({ id, mode }: { id: DiagramId; mode: "labeled" | "numbered" }) {
  const def = DIAGRAMS[id];
  if (!def) {
    return <div className="rounded-xl border border-danger bg-danger-soft px-4 py-3 text-sm text-danger">Unknown diagram: “{String(id)}”</div>;
  }
  const markers = DIAGRAM_MARKERS[id] as readonly string[];
  return (
    <figure className="not-prose my-4 w-full min-w-0">
      <svg
        viewBox={`0 ${def.y0 ?? 0} ${def.w} ${def.h}`}
        className="mx-auto block h-auto w-full"
        style={{ maxHeight: 420 }}
        role="img"
        aria-label={`${def.title}${mode === "numbered" ? " (numbered markers)" : ""}`}
      >
        {def.draw()}
        {markers.map((mid, i) => {
          const m = def.markers[mid];
          if (!m) return null;
          const centred = Math.abs(m.lx - m.x) < 1 && Math.abs(m.ly - m.y) < 1;
          const [ex, ey] = leaderEnd(m);
          if (mode === "numbered") {
            return (
              <g key={mid}>
                {!centred && <line x1={m.x} y1={m.y} x2={m.lx} y2={m.ly} stroke="var(--accent)" strokeWidth={1.2} />}
                {!centred && <circle cx={m.x} cy={m.y} r={3} fill="var(--accent)" />}
                <circle cx={m.lx} cy={m.ly} r={11} fill="var(--accent)" stroke="var(--surface)" strokeWidth={2} />
                <text x={m.lx} y={m.ly} fontSize={12} fontWeight={700} textAnchor="middle" dominantBaseline="central" fill="var(--surface)">
                  {i + 1}
                </text>
              </g>
            );
          }
          return (
            <g key={mid}>
              {!centred && <line x1={m.x} y1={m.y} x2={ex} y2={ey} stroke="var(--muted)" strokeWidth={1} />}
              {!centred && <circle cx={m.x} cy={m.y} r={2.5} fill="var(--accent)" />}
              <text
                x={m.lx}
                y={m.ly}
                fontSize={12}
                fontWeight={centred ? 600 : 500}
                textAnchor={centred ? "middle" : m.anchor ?? "middle"}
                dominantBaseline={centred ? "central" : undefined}
                fill="var(--text)"
                style={{ paintOrder: "stroke", stroke: "var(--surface)", strokeWidth: 4, strokeLinejoin: "round" }}
              >
                {def.labels[mid] ?? mid}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export default Diagram;
