"use client";

import { useState } from "react";
import { Card, InfoPanel, Note, type WidgetProps } from "./ui";

type Party = "Employer" | "Contractor" | "Shared" | "Offtaker" | "SPV" | "EPC";
interface Cell {
  who: Party;
  /** Short display (e.g. "Offtaker → SPV"). */
  short?: string;
  reason: string;
  clause?: string;
}
interface RiskRow {
  risk: string;
  red: Cell;
  yellow: Cell;
  silver: Cell;
  ipp: Cell;
}

const COLS = [
  { key: "red", label: "FIDIC Red 2017", note: "Employer designs; Contractor builds (re-measured)" },
  { key: "yellow", label: "FIDIC Yellow 2017", note: "Contractor designs & builds (lump sum)" },
  { key: "silver", label: "FIDIC Silver 2017", note: "EPC/Turnkey — single-point, higher price certainty" },
  { key: "ipp", label: "IPP / PPA", note: "Offtaker ↔ SPV (project company) ↔ EPC" },
] as const;

const ROWS: RiskRow[] = [
  {
    risk: "Unforeseeable ground conditions",
    red: { who: "Employer", reason: "Physical conditions an experienced contractor could not reasonably have foreseen at the Base Date entitle the Contractor to time and Cost.", clause: "Sub-Clause 4.12" },
    yellow: { who: "Employer", reason: "Same Unforeseeable Physical Conditions mechanism as the Red Book: time and Cost if the condition was not reasonably foreseeable.", clause: "Sub-Clause 4.12" },
    silver: { who: "Contractor", reason: "Silver Book 'Unforeseeable Difficulties': the Contractor is deemed to have obtained all necessary information and accepts total responsibility for foreseeing difficulties; the Contract Price is not adjusted.", clause: "Sub-Clause 4.12" },
    ipp: { who: "SPV", short: "SPV → EPC", reason: "The project company takes site risk under the PPA/land lease and passes it to the EPC contractor back-to-back. Procurers sometimes retain narrowly defined items (e.g. pre-existing contamination) — check the PPA and land agreement." },
  },
  {
    risk: "Design errors",
    red: { who: "Employer", reason: "The Employer (through its Engineer/designer) provides the design; the Contractor is responsible only for any parts it is required to design and for workmanship." },
    yellow: { who: "Contractor", reason: "The Contractor designs the Works and must make them fit for the purposes defined in the Employer's Requirements.", clause: "Sub-Clauses 4.1 & 5.1" },
    silver: { who: "Contractor", reason: "Full design responsibility with fitness-for-purpose obligation; design errors are corrected at the Contractor's cost.", clause: "Sub-Clauses 4.1 & 5.1" },
    ipp: { who: "SPV", short: "SPV → EPC", reason: "SPV is responsible to the offtaker for plant performance and availability; it passes design risk to the EPC (with performance guarantees and LDs)." },
  },
  {
    risk: "Errors in Employer's Requirements / specification",
    red: { who: "Employer", reason: "Errors in the Employer's drawings and Specification are Employer risk; corrections are instructed as Variations." },
    yellow: { who: "Shared", reason: "The Contractor must scrutinise the Employer's Requirements; it recovers time and Cost only for errors an experienced contractor exercising due care would not have discovered when scrutinising them at tender.", clause: "Sub-Clause 1.9" },
    silver: { who: "Contractor", reason: "The Contractor is deemed to have scrutinised the Employer's Requirements and is responsible for them, except for limited listed items (e.g. portions stated as unchangeable, data the Contractor cannot verify, definitions of intended purpose and testing criteria)." },
    ipp: { who: "SPV", short: "SPV / EPC", reason: "Output-based PPA specification: the SPV designs to meet grid-code and minimum technical requirements; the offtaker carries risk only for information it warrants (check RFP 'reliance' language)." },
  },
  {
    risk: "FX and inflation",
    red: { who: "Contractor", short: "Contractor (unless indexed)", reason: "Price is fixed unless a schedule of cost indexation is included in the Contract Data — then price adjusts by formula. Currency proportions of payment are set in the contract.", clause: "Sub-Clause 13.7" },
    yellow: { who: "Contractor", short: "Contractor (unless indexed)", reason: "As Red Book: adjustment for changes in cost applies only if an indexation schedule is included.", clause: "Sub-Clause 13.7" },
    silver: { who: "Contractor", reason: "Silver Book contracts are normally priced as fixed lump sums without indexation; the Contractor prices the risk." },
    ipp: { who: "Shared", short: "Offtaker ↔ SPV", reason: "Tariff may be split into USD-linked capacity/energy components or include indexation; the KWD's basket peg limits but does not remove FX risk. EPC price is usually fixed." },
  },
  {
    risk: "Change in law",
    red: { who: "Employer", reason: "Changes in Laws of the Country after the Base Date that affect the Contractor give time and Cost (and can reduce the price).", clause: "Sub-Clause 13.6" },
    yellow: { who: "Employer", reason: "Same Adjustments for Changes in Laws mechanism.", clause: "Sub-Clause 13.6" },
    silver: { who: "Employer", reason: "Same Adjustments for Changes in Laws mechanism applies in the Silver Book.", clause: "Sub-Clause 13.6" },
    ipp: { who: "Offtaker", short: "Offtaker (mostly)", reason: "PPAs typically compensate the SPV for discriminatory or specific changes in law; general changes may be shared or subject to thresholds. The SPV mirrors relief in the EPC contract." },
  },
  {
    risk: "Grid connection delay",
    red: { who: "Employer", reason: "If grid connection is an Employer obligation, its delay is an Employer-caused delay: Extension of Time (and Cost) for the Contractor; tests delayed by the Employer are treated as interference.", clause: "Sub-Clause 8.5" },
    yellow: { who: "Employer", reason: "Same as Red when the utility interface is Employer's scope; the interface boundary must be explicit in the Employer's Requirements.", clause: "Sub-Clause 8.5" },
    silver: { who: "Employer", short: "Employer (if its scope)", reason: "Even under EPC/Turnkey, delays caused by the Employer's own scope (e.g. utility works) give time; if the Contractor owns the connection works, it is Contractor risk." },
    ipp: { who: "Offtaker", reason: "Where the utility/offtaker builds the transmission connection, Gulf PPAs commonly provide deemed completion or deemed-energy payments if the grid is not ready by the scheduled date." },
  },
  {
    risk: "Force majeure / exceptional events",
    red: { who: "Shared", reason: "Exceptional Events: the affected party is excused; the Contractor gets time, and Cost only for certain events (e.g. war, riot or munitions in the Country). Prolonged events allow termination.", clause: "Clause 18" },
    yellow: { who: "Shared", reason: "Same Exceptional Events regime.", clause: "Clause 18" },
    silver: { who: "Shared", reason: "Same Exceptional Events regime.", clause: "Clause 18" },
    ipp: { who: "Shared", reason: "Natural force majeure: time relief, SPV bears cost (insured). Political force majeure (government action in Kuwait): offtaker typically compensates and may have to buy out the project if prolonged." },
  },
  {
    risk: "Performance shortfall (output / PR)",
    red: { who: "Shared", reason: "The Contractor is responsible for workmanship and materials to the Specification; performance of the Employer's design is the Employer's risk." },
    yellow: { who: "Contractor", reason: "Fitness for purpose plus Tests on Completion (and Tests after Completion if specified); performance damages for shortfall.", clause: "Sub-Clause 4.1, Clauses 9 & 12" },
    silver: { who: "Contractor", reason: "Same as Yellow with stronger single-point responsibility; capped performance liquidated damages are typical.", clause: "Sub-Clause 4.1, Clauses 9 & 12" },
    ipp: { who: "SPV", short: "SPV → EPC/O&M", reason: "Lower output means lower revenue (and possible PPA minimum-output penalties). SPV passes risk to the EPC (PR/capacity guarantees, LDs) and the O&M contractor (availability guarantees)." },
  },
  {
    risk: "Permits and approvals",
    red: { who: "Shared", reason: "The Employer obtains planning/zoning/building permissions for the Permanent Works and those it lists; the Contractor obtains all other permits it needs. The Employer assists on request.", clause: "Sub-Clauses 1.13 & 2.2" },
    yellow: { who: "Shared", reason: "Same split between Employer-obtained and Contractor-obtained permits.", clause: "Sub-Clauses 1.13 & 2.2" },
    silver: { who: "Shared", reason: "Same split; in practice the Employer's Requirements often push more permitting onto the Contractor.", clause: "Sub-Clauses 1.13 & 2.2" },
    ipp: { who: "Shared", reason: "Procurer usually provides the site and certain key approvals; the SPV obtains construction and operating permits (EIA approval, building permits). Delay caused by authorities may give relief depending on the PPA." },
  },
  {
    risk: "Interface risk (multiple packages)",
    red: { who: "Employer", reason: "With separate design and construction (and often multiple contractors), the Employer coordinates interfaces; the Contractor must cooperate with others on site.", clause: "Sub-Clause 4.6" },
    yellow: { who: "Shared", reason: "The Contractor owns interfaces within its design-build scope; the Employer keeps interfaces between its separate contracts." },
    silver: { who: "Contractor", reason: "Single-point turnkey responsibility removes most internal interfaces from the Employer — the main reason lenders prefer EPC wraps." },
    ipp: { who: "SPV", reason: "SPV manages EPC/O&M interfaces (often with a full EPC wrap); interfaces with the utility's grid works stay with the offtaker." },
  },
];

const tone: Record<Party, string> = {
  Employer: "bg-info-soft text-info",
  Offtaker: "bg-info-soft text-info",
  Contractor: "bg-sun-soft text-sun",
  EPC: "bg-sun-soft text-sun",
  SPV: "bg-accent-soft text-accent",
  Shared: "bg-surface-2 text-text",
};

export default function RiskAllocation(_: WidgetProps) {
  const [sel, setSel] = useState<{ r: number; c: (typeof COLS)[number]["key"] } | null>(null);
  const row = sel ? ROWS[sel.r] : null;
  const cell = row && sel ? row[sel.c] : null;
  const col = sel ? COLS.find((c) => c.key === sel.c) : null;

  return (
    <Card title="Contract risk allocation matrix" subtitle="Who bears each risk under FIDIC 2017 books and a typical IPP/PPA structure — click a cell">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[640px] table-fixed text-sm">
          <thead className="bg-surface-2 text-xs">
            <tr>
              <th className="w-[28%] px-2 py-2 text-left font-medium">Risk</th>
              {COLS.map((c) => (
                <th key={c.key} className="px-2 py-2 text-left font-medium" title={c.note}>
                  {c.label}
                  <div className="font-normal text-muted">{c.note}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={r.risk} className="border-t border-border">
                <td className="px-2 py-1.5">{r.risk}</td>
                {COLS.map((c) => {
                  const v = r[c.key];
                  const active = sel?.r === i && sel.c === c.key;
                  return (
                    <td key={c.key} className="px-1 py-1">
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSel({ r: i, c: c.key })}
                        className={`w-full rounded-md px-2 py-1 text-left text-xs transition ${tone[v.who]} ${active ? "ring-2 ring-[var(--accent)]" : "hover:opacity-80"}`}
                      >
                        <span className="font-medium">{v.short ?? v.who}</span>
                        {v.clause && <span className="block text-[0.68rem] opacity-80">{v.clause}</span>}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-1 text-xs text-muted sm:hidden">Scroll the table sideways to see all columns.</p>
      <div className="mt-3">
        <InfoPanel title={row && col ? `${row.risk} — ${col.label}` : undefined} empty="Click a cell to see who bears the risk, why, and the governing clause.">
          {cell && (
            <>
              <p>
                <span className="font-medium">Bears the risk: </span>
                {cell.short ?? cell.who}
              </p>
              <p>{cell.reason}</p>
              {cell.clause && <p className="text-muted">Reference: {cell.clause} (FIDIC 2017 2nd edition, General Conditions).</p>}
            </>
          )}
        </InfoPanel>
      </div>
      <Note>
        Allocation under the General Conditions only — Particular Conditions frequently amend them, and Gulf procurers often shift risk to the
        contractor. Always read the actual contract. IPP column describes common market practice, not a specific Kuwait PPA.
      </Note>
    </Card>
  );
}
