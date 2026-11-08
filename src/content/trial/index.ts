import type { Explainer, TrialDay } from "./schema";
import { D1 } from "./d1";
import { D2 } from "./d2";
import { D3 } from "./d3";
import { D4 } from "./d4";
import { D5 } from "./d5";
import { D6 } from "./d6";
import { D7 } from "./d7";

export type { Explainer, TrialDay } from "./schema";

/** First day of the MEWRE trial (local date). The plan counts down to it. */
export const TRIAL_START = "2026-11-15";

/** Daily budget the plan is built for: 2 to 3 hours. */
export const DAY_BUDGET_MIN = 150;
/** Spaced review at the start of every day. */
export const REVIEW_MIN = 15;
/** Must-know self-test per day (tier-1 concepts of the day's modules). */
export const SELFTEST_MIN = 15;

export const TRIAL_DAYS: TrialDay[] = [
  {
    day: 1,
    title: "Electricity from zero to the grid",
    goal: "Say in your own words what voltage, current, DC and AC, coils, capacitors and reactance are, then explain reactive power and three-phase and why the grid cares.",
    core: ["x-voltage-current-resistance", "x-power-energy", "x-dc-vs-ac", "x-magnetism-inductance", "x-capacitance", "x-reactance-impedance", "x-reactive-power", "x-three-phase"],
    optional: ["x-frequency-inertia", "x-fault-level-protection", "x-load-curve-kuwait"],
    modules: ["m01"],
    playbook: ["intro"],
  },
  {
    day: 2,
    title: "Kuwait, solar, CSP and batteries",
    goal: "Describe Kuwait's power system and who decides what, how a PV plant makes and loses MWh, how CSP and batteries fit the evening peak.",
    core: ["x-kuwait-power-system", "x-who-decides", "x-pv-how-it-works", "x-pv-plant-anatomy", "x-pv-losses-yield", "x-csp", "x-bess-basics"],
    optional: ["x-kuwait-pipeline", "x-solar-resource", "x-csp-vs-pv-bess", "x-wind", "x-bess-life-safety"],
    modules: ["m00", "m02", "m05"],
    playbook: ["numbers", "who"],
  },
  {
    day: 3,
    title: "Grid connection and project delivery",
    goal: "Follow a grid-connection discussion and walk a project from feasibility to handover, reading a schedule, an earned-value report and a risk register.",
    core: ["x-transformers-voltage-levels", "x-grid-code-connection", "x-project-lifecycle", "x-testing-commissioning-cod", "x-schedule-critical-path", "x-earned-value", "x-risk-change-reporting"],
    optional: ["x-ppc-scada", "x-design-owners-engineer", "x-scope-wbs"],
    modules: ["m06", "m07", "m08"],
    playbook: ["questions"],
  },
  {
    day: 4,
    title: "Contracts, money, the ministry, and rehearsal",
    goal: "Explain FIDIC basics, bonds and delay damages, IPPs and PPAs, LCOE and NPV, how Kuwait tenders and how the ministry works, then rehearse with the final exam.",
    core: ["x-contract-strategies-fidic", "x-bonds-lds", "x-ipp-ppa", "x-npv-irr-lcoe", "x-kuwait-procurement", "x-how-the-ministry-works"],
    optional: ["x-claims-variations", "x-project-finance-tariff-bids", "x-om-kpis", "x-om-contracts-warranty", "x-meetings-presenting-negotiating", "x-ai-at-work-safely"],
    modules: ["m09", "m10", "m11", "m13"],
    playbook: ["avoid", "week"],
    exam: true,
  },
];

export const EXPLAINERS: Explainer[] = [...D1, ...D2, ...D3, ...D4, ...D5, ...D6, ...D7];

/** Study order across the plan: each day's core list, then its optional list. */
export const PLAN_ORDER: string[] = TRIAL_DAYS.flatMap((d) => [...d.core, ...d.optional]);

/** Plan day and whether the explainer is core, for an explainer id. */
export function planSlot(id: string): { day: number; core: boolean } | undefined {
  for (const d of TRIAL_DAYS) {
    if (d.core.includes(id)) return { day: d.day, core: true };
    if (d.optional.includes(id)) return { day: d.day, core: false };
  }
  return undefined;
}
export const getExplainer = (id: string) => EXPLAINERS.find((e) => e.id === id);
