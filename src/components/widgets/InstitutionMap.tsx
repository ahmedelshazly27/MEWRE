"use client";

import { useState, type KeyboardEvent } from "react";
import { Card, InfoPanel, Note, type WidgetProps } from "./ui";

interface Inst {
  id: string;
  short: string;
  name: string;
  x: number;
  y: number;
  role: string;
  pm: string;
  context?: boolean;
  external?: boolean;
}

const NODES: Inst[] = [
  {
    id: "com", short: "Council of Ministers", name: "Council of Ministers / Higher Committee for PPP", x: 360, y: 46,
    role: "The Council of Ministers sets government policy (e.g. renewable-energy targets) and approves strategic decisions. Under the PPP law a Higher Committee approves PPP projects at key stages such as project approval and award.",
    pm: "Your project's key milestones may need a decision at this level — prepare concise decision papers through the Minister's office and allow for meeting cycles in the schedule.",
  },
  {
    id: "na", short: "National Assembly", name: "National Assembly", x: 110, y: 46, context: true,
    role: "Kuwait's elected legislature, normally responsible for passing laws and approving the state budget. Context: suspended by Amiri decree in May 2024; legislative functions are currently exercised by decree-law.",
    pm: "Context only: changes to the legislative process can affect the timing of new laws (e.g. amendments to PPP or tender laws) and budget approvals.",
  },
  {
    id: "mof", short: "Ministry of Finance", name: "Ministry of Finance", x: 610, y: 46,
    role: "Prepares the state budget (fiscal year April–March) and allocates funds to ministries; involved in government financial commitments and PPP governance.",
    pm: "Publicly funded (EPC) projects need budget allocation in the right fiscal year; cash-flow forecasts and commitment approvals pass through MoF processes.",
  },
  {
    id: "kapp", short: "KAPP", name: "Kuwait Authority for Partnership Projects", x: 150, y: 170,
    role: "Government authority that prepares and tenders PPP projects under Law No. 116 of 2014: appoints advisers, runs RFQ/RFP, evaluates bids with the public entity, and supports award. For certain projects a share of the project company is offered to Kuwaiti citizens via public subscription (IPO).",
    pm: "For IPP projects KAPP leads the procurement and MEWRE is the offtaker — agree roles (technical specs, grid interface, PPA risk positions) early in a joint project team.",
  },
  {
    id: "mewre", short: "MEWRE", name: "Ministry of Electricity, Water & Renewable Energy", x: 360, y: 170,
    role: "Plans, builds and operates Kuwait's power and water system; procurer/offtaker for renewable IPPs (signs the PPA and buys the energy) and owner of the transmission grid the plant connects to.",
    pm: "Your home organisation: owner's requirements, grid connection scope, internal approvals, contract administration and the interface with every other body on this map.",
  },
  {
    id: "capt", short: "CAPT", name: "Central Agency for Public Tenders", x: 570, y: 170,
    role: "Runs public tenders for government contracts under Law No. 49 of 2016 (conventional procurement such as EPC or consultancy contracts, as opposed to PPPs). Publishes tenders, manages bidder communication and award procedures, with a grievance mechanism.",
    pm: "Publicly funded EPC packages and consultancy services go through CAPT rules and timelines — tender documents, clarifications and evaluation must follow its procedures exactly.",
  },
  {
    id: "sab", short: "State Audit Bureau", name: "State Audit Bureau", x: 120, y: 300,
    role: "Independent audit body: prior review of government contracts above set value thresholds before they can be signed, plus post-audit of spending.",
    pm: "Build prior-review time into the schedule and prepare complete justification files (evaluation reports, budget approvals). Variations and extensions can also need review.",
  },
  {
    id: "fatwa", short: "Fatwa & Legislation", name: "Fatwa & Legislation Department", x: 300, y: 310,
    role: "The government's legal adviser: reviews government contracts and drafts legislation, and advises on legal interpretation.",
    pm: "Contract drafts (EPC, PPA, consultancy) are reviewed before signature; legal comments can change risk allocation — engage early, keep a clean issues list.",
  },
  {
    id: "epa", short: "Kuwait EPA", name: "Environment Public Authority", x: 480, y: 310,
    role: "Environmental regulator: approves environmental impact assessments and issues environmental permits under the Environment Protection Law.",
    pm: "EIA scope and approval are early critical-path items; permit conditions (dust, waste, ecology) flow into the EPC contract and must be monitored.",
  },
  {
    id: "kisr", short: "KISR", name: "Kuwait Institute for Scientific Research", x: 630, y: 300,
    role: "National research institute; developed the Shagaya Renewable Energy Park Phase I (CSP, PV and wind pilot) and holds solar/wind resource and performance data.",
    pm: "Source of site data, technology lessons learned and technical advice; useful for resource assessments and specifications.",
  },
  {
    id: "bidders", short: "Bidders / IPP / EPC", name: "Developers, lenders and contractors", x: 360, y: 400, external: true,
    role: "Private parties: IPP developers and their project company (SPV), lenders, EPC and O&M contractors.",
    pm: "Every interaction is formal and recorded — clarifications through the tender process, contract notices after award.",
  },
];

const EDGES: [string, string, boolean?][] = [
  ["com", "mewre"], ["com", "kapp"], ["com", "mof"], ["na", "mof", true], ["na", "com", true],
  ["mewre", "kapp"], ["mewre", "capt"], ["mewre", "mof"], ["mewre", "sab"], ["mewre", "fatwa"], ["mewre", "epa"], ["mewre", "kisr"],
  ["kapp", "sab"], ["kapp", "fatwa"], ["capt", "sab"], ["kapp", "bidders"], ["capt", "bidders"], ["mewre", "bidders"],
];

const W = 130;
const H = 40;

export default function InstitutionMap(_: WidgetProps) {
  const [sel, setSel] = useState<string | null>("mewre");
  const node = NODES.find((n) => n.id === sel);
  const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
  const onKey = (id: string) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSel(id);
    }
  };

  return (
    <Card title="Kuwait decision chain for power projects" subtitle="Who approves what — click an institution">
      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <svg viewBox="0 0 720 430" className="h-auto w-full" role="group" aria-label="Institution map">
          {EDGES.map(([a, b, dashed]) => {
            const A = byId[a];
            const B = byId[b];
            const active = sel === a || sel === b;
            return (
              <line key={a + b} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={active ? "var(--accent)" : "var(--border)"} strokeWidth={active ? 2 : 1.2} strokeDasharray={dashed ? "4 4" : undefined} />
            );
          })}
          {NODES.map((n) => {
            const active = sel === n.id;
            return (
              <g key={n.id} role="button" tabIndex={0} aria-pressed={active} aria-label={n.name} onClick={() => setSel(n.id)} onKeyDown={onKey(n.id)} className="cursor-pointer outline-none">
                <rect
                  x={n.x - W / 2}
                  y={n.y - H / 2}
                  width={W}
                  height={H}
                  rx={8}
                  fill={active ? "var(--accent-soft)" : n.id === "mewre" ? "var(--surface-2)" : "var(--surface)"}
                  stroke={active ? "var(--accent)" : n.context ? "var(--muted)" : "var(--border)"}
                  strokeWidth={active || n.id === "mewre" ? 2 : 1.2}
                  strokeDasharray={n.context || n.external ? "4 3" : undefined}
                />
                <text x={n.x} y={n.y + (n.context ? -2 : 4)} fontSize={12} textAnchor="middle" fill={n.context ? "var(--muted)" : "var(--text)"} fontWeight={n.id === "mewre" ? 600 : 400}>
                  {n.short}
                </text>
                {n.context && (
                  <text x={n.x} y={n.y + 12} fontSize={9} textAnchor="middle" fill="var(--muted)">
                    suspended (May 2024)
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <InfoPanel title={node?.name} empty="Click an institution to see its role and how a project manager typically interacts with it.">
          {node && (
            <>
              {node.context && <p className="text-xs font-medium uppercase tracking-wide text-warn">Context</p>}
              <p>{node.role}</p>
              <p>
                <span className="font-medium">PM interaction: </span>
                {node.pm}
              </p>
            </>
          )}
        </InfoPanel>
      </div>
      <Note>Simplified and general. Thresholds, committee names and procedures change — confirm current rules with MEWRE legal and procurement departments.</Note>
    </Card>
  );
}
