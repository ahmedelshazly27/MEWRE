"use client";

import { useState } from "react";
import { Card, InfoPanel, Hint, Note, type WidgetProps } from "./ui";

interface Stage {
  name: string;
  months: [number, number];
  docs: string[];
  gate: string;
  pm: string;
}

const STAGES: Stage[] = [
  {
    name: "Feasibility", months: [6, 12],
    docs: ["Pre-feasibility & feasibility study", "Resource assessment (satellite + ground data)", "Grid integration study", "PPP value-for-money / affordability analysis"],
    gate: "Approval to proceed and procurement route (PPP via KAPP or public EPC via CAPT).",
    pm: "Lock the business case assumptions you will be judged against later; document options rejected and why.",
  },
  {
    name: "Site & EIA", months: [6, 12],
    docs: ["Site selection & land allocation", "Topographic and geotechnical surveys", "ESIA / EIA and EPA approval", "On-site met station data"],
    gate: "Land secured and environmental approval obtained (or a clear path to it).",
    pm: "Start measurement early — every month of on-site data reduces yield uncertainty and improves P90.",
  },
  {
    name: "Procurement (RFQ/RFP)", months: [9, 15],
    docs: ["EOI / RFQ and prequalification", "RFP with draft PPA, land lease and grid connection terms", "Clarification responses & addenda", "Bid evaluation report"],
    gate: "Selection of preferred bidder; approvals by the competent committees.",
    pm: "Run a disciplined clarification log; protect evaluation integrity and confidentiality; keep the schedule of approvals realistic.",
  },
  {
    name: "Award & Financial Close", months: [3, 9],
    docs: ["Signed PPA and government support/direct agreements", "Loan and security documents", "EPC and O&M contracts", "Conditions precedent checklist"],
    gate: "Financial close and Notice to Proceed to the EPC contractor.",
    pm: "Track conditions precedent weekly; many CPs sit with government bodies (permits, land, grid agreements).",
  },
  {
    name: "Design", months: [3, 6],
    docs: ["Basic and detailed design", "Final energy yield & grid compliance studies", "Owner's / independent engineer review comments"],
    gate: "Design approval (no-objection) for construction.",
    pm: "Review against Employer's Requirements and grid code — not personal preference; respect review periods in the contract.",
  },
  {
    name: "Procurement & Manufacturing", months: [6, 12],
    docs: ["Purchase orders for modules, trackers, inverters, transformers", "Inspection & test plans, FAT reports", "Shipping and customs plan"],
    gate: "Long-lead equipment manufactured, tested and delivered.",
    pm: "Grid transformers and HV equipment are often the longest lead items — monitor FAT slots and transport early.",
  },
  {
    name: "Construction", months: [12, 20],
    docs: ["Monthly progress reports & updated programme", "HSE plan (heat stress!)", "QA/QC records, ITPs, NCRs"],
    gate: "Mechanical completion of blocks.",
    pm: "Measure earned value on installed MW, not spend; watch summer productivity and HSE.",
  },
  {
    name: "Testing & Commissioning", months: [2, 4],
    docs: ["Commissioning procedures & records", "Grid code compliance tests", "Performance (PR / capacity) test reports"],
    gate: "Taking-over / provisional acceptance.",
    pm: "Witness key tests; agree test methods and weather corrections before testing starts.",
  },
  {
    name: "COD", months: [0.5, 1],
    docs: ["COD notice and certificates", "Independent engineer confirmation", "As-built drawings and handover documents"],
    gate: "Commercial operation — PPA payments begin, delay LDs stop.",
    pm: "Ensure metering, SCADA and settlement are ready; punch-list items must not block COD unnecessarily.",
  },
  {
    name: "O&M / DNP", months: [12, 24],
    docs: ["O&M manuals & spare-parts list", "Monthly performance & availability reports", "Defects register and DNP close-out"],
    gate: "End of defects notification period and final acceptance; then 25+ years of operation.",
    pm: "Hold the contractor to defects obligations before retention/performance security is released.",
  },
];

const colors = ["var(--chart-1)", "var(--chart-3)", "var(--chart-2)", "var(--chart-5)", "var(--chart-4)"];

export default function Lifecycle(_: WidgetProps) {
  const [sel, setSel] = useState<number>(0);
  const s = STAGES[sel];
  const total = STAGES.reduce((a, st) => a + (st.months[0] + st.months[1]) / 2, 0);

  return (
    <Card title="Project lifecycle — 1 GW PV IPP" subtitle="Stages, gate decisions, key documents and indicative durations; click a stage">
      <ol className="flex flex-wrap gap-1.5">
        {STAGES.map((st, i) => (
          <li key={st.name} className="flex items-center gap-1.5">
            <button
              type="button"
              aria-pressed={sel === i}
              onClick={() => setSel(i)}
              className={`rounded-lg border px-2.5 py-1.5 text-left text-xs transition ${sel === i ? "border-accent bg-accent-soft text-accent" : "border-border bg-surface-2 hover:text-accent"}`}
            >
              <span className="block font-mono text-[0.65rem] text-muted">{String(i + 1).padStart(2, "0")}</span>
              {st.name}
            </button>
            {i < STAGES.length - 1 && <span className="text-muted" aria-hidden>→</span>}
          </li>
        ))}
      </ol>

      <div className="mt-3 flex h-4 w-full overflow-hidden rounded-md border border-border" aria-hidden>
        {STAGES.map((st, i) => (
          <button
            key={st.name}
            type="button"
            tabIndex={-1}
            onClick={() => setSel(i)}
            title={`${st.name}: ${st.months[0]}–${st.months[1]} months`}
            style={{ width: `${(((st.months[0] + st.months[1]) / 2) / total) * 100}%`, background: colors[i % colors.length], opacity: sel === i ? 1 : 0.45 }}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-muted">Bar widths ∝ midpoint durations (stages overlap in practice; O&M continues for 25+ years after DNP).</p>

      <div className="mt-3">
        <InfoPanel title={`${sel + 1}. ${s.name}`} empty="">
          <p>
            <span className="font-medium">Typical duration: </span>
            {s.months[0] < 1 ? "milestone" : `${s.months[0]}–${s.months[1]} months`}
          </p>
          <div>
            <span className="font-medium">Key documents:</span>
            <ul className="ml-4 mt-1 list-disc space-y-0.5">
              {s.docs.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <p>
            <span className="font-medium">Gate decision: </span>
            {s.gate}
          </p>
          <p>
            <span className="font-medium">PM focus: </span>
            {s.pm}
          </p>
        </InfoPanel>
      </div>
      <Hint>What to notice: years of development and procurement precede roughly 18–24 months of construction — most schedule risk is decided before NTP.</Hint>
      <Note>Durations are indicative for a large Gulf PV IPP and vary with procurement route, approvals and grid works.</Note>
    </Card>
  );
}
