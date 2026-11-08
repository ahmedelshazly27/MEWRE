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
export const REVIEW_MIN = 20;
/** Must-know self-test per day. */
export const SELFTEST_MIN = 20;

export const TRIAL_DAYS: TrialDay[] = [
  { day: 1, title: "Electricity from zero", goal: "Say in your own words what voltage, current, resistance, DC and AC, power and energy are, and how coils and capacitors make current lag or lead.", modules: ["m01"], playbook: ["intro"] },
  { day: 2, title: "Grid electricity", goal: "Explain reactive power, three-phase, transformers and voltage levels, frequency and inertia, fault levels and Kuwait's load curve, and ask the right grid question.", modules: ["m01"], playbook: ["numbers"] },
  { day: 3, title: "Kuwait's power system and solar PV", goal: "Describe Kuwait's system and who decides what, and how a utility PV plant turns sunlight into MWh and where it loses them.", modules: ["m00", "m02"], playbook: ["who"] },
  { day: 4, title: "CSP, wind, batteries and the grid connection", goal: "Compare CSP, PV with batteries and wind for Kuwait, size a battery in MW and MWh, and follow a grid-connection discussion.", modules: ["m03", "m04", "m05", "m06"], playbook: [] },
  { day: 5, title: "How a project is delivered and controlled", goal: "Walk a project from feasibility to handover and read a schedule, an earned-value report and a risk register.", modules: ["m07", "m08"], playbook: ["questions"] },
  { day: 6, title: "Contracts, money and procurement", goal: "Explain FIDIC basics, bonds and delay damages, IPP and PPA structures, LCOE and NPV, and how Kuwait tenders a project.", modules: ["m09", "m10", "m11"], playbook: [] },
  { day: 7, title: "Operations, the ministry, and rehearsal", goal: "Read a plant performance report, work like a ministry PM, use AI safely, then rehearse: final exam, playbook out loud, 60-second introduction.", modules: ["m12", "m13", "m14"], playbook: ["avoid", "week", "intro"] },
];

export const EXPLAINERS: Explainer[] = [...D1, ...D2, ...D3, ...D4, ...D5, ...D6, ...D7];

export const explainersForDay = (day: number) => EXPLAINERS.filter((e) => e.day === day);
export const getExplainer = (id: string) => EXPLAINERS.find((e) => e.id === id);
