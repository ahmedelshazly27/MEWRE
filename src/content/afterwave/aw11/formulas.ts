import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  {
    id: "aw11-mr-share",
    name: "Share of deliveries that must meet the Regulation",
    tex: String.raw`\varphi = \frac{N_{\geq T}}{N_{tot}}`,
    vars: [
      { sym: "\\varphi", meaning: "Fraction of units that must conform to Regulation 2023/1230", unit: "-" },
      { sym: "N_{\\geq T}", meaning: "Units placed on the market on or after 20 January 2027", unit: "units" },
      { sym: "N_{tot}", meaning: "Units in the order book or production plan", unit: "units" },
    ],
    explanation: md`Placing on the market is assessed **per individual unit**, so a model type already sold under the Directive does not protect units first made available after the application date. Use it to show a manufacturer how much of next year's shipments is exposed.`,
    lesson: "aw11-l01",
  },
  {
    id: "aw11-log-volume",
    name: "Annual volume of a decision or tracing log",
    tex: String.raw`V = f \, s \, t_{op}`,
    vars: [
      { sym: "V", meaning: "Data volume generated per machine per year", unit: "B/yr" },
      { sym: "f", meaning: "Logged safety-relevant decisions per second", unit: "1/s" },
      { sym: "s", meaning: "Size of one record (inputs summary, output, confidence, timestamp, versions)", unit: "B" },
      { sym: "t_{op}", meaning: "Operating time per year", unit: "s/yr" },
    ],
    explanation: md`Sizing the storage behind the EHSR 1.2.1 logging duties. With retention $t_r$ in years, the rolling store per machine is $V t_r$; multiply by the fleet for the total. Example: 20 Hz, 1.5 kB, 3,000 h gives about 324 GB per machine per year.`,
    lesson: "aw11-l02",
  },
  {
    id: "aw11-zero-failure-bound",
    name: "Upper confidence bound on failure probability after failure-free trials",
    tex: String.raw`p_U = 1 - \alpha^{1/n} \approx \frac{-\ln \alpha}{n}, \qquad n = \frac{\ln \alpha}{\ln(1 - p_U)}`,
    vars: [
      { sym: "p_U", meaning: "Upper bound on the per-demand failure probability (e.g. a missed person detection)", unit: "-" },
      { sym: "\\alpha", meaning: "1 minus the confidence level (0.05 for 95 %)", unit: "-" },
      { sym: "n", meaning: "Independent, representative trials with zero failures", unit: "trials" },
    ],
    explanation: md`At 95 % confidence $-\ln 0.05 \approx 3$, the "rule of three": $p_U \approx 3/n$. Showing $p_U \leq 10^{-4}$ needs about 30,000 failure-free, independent trials drawn from the operating domain. It only holds if the trials are representative and independent, which is the hard part of ML safety evidence; it is a statistical argument for test planning, not a substitute for the PL or SIL analysis.`,
    lesson: "aw11-l02",
  },
  {
    id: "aw11-schedule-slack",
    name: "Schedule slack to a regulatory date (backward scheduling)",
    tex: String.raw`S = (T_{target} - T_{now}) - \sum_{i} d_i - b`,
    vars: [
      { sym: "S", meaning: "Slack; negative means the target date cannot be met", unit: "days" },
      { sym: "T_{target}", meaning: "Date by which conformity must be complete (e.g. first shipment after 20 January 2027)", unit: "date" },
      { sym: "T_{now}", meaning: "Today", unit: "date" },
      { sym: "d_i", meaning: "Duration of sequential activity i (design freeze, tests, file, notified body)", unit: "days" },
      { sym: "b", meaning: "Schedule buffer", unit: "days" },
    ],
    explanation: md`Only activities on the critical path are summed; overlapping work shortens the sum. A negative slack forces a decision: move the market date, change the design (for example a non-ML safety function), or parallelise. The earliest feasible date is $T_{now} + \sum d_i + b$.`,
    lesson: "aw11-l03",
  },
  {
    id: "aw11-evidence-coverage",
    name: "Evidence coverage of applicable EHSRs",
    tex: String.raw`\kappa = \frac{n_{e}}{n_{a}}`,
    vars: [
      { sym: "\\kappa", meaning: "Evidence coverage ratio", unit: "-" },
      { sym: "n_e", meaning: "Applicable EHSRs with at least one linked, current piece of evidence (test report, analysis, standard clause)", unit: "count" },
      { sym: "n_a", meaning: "EHSRs marked applicable in the risk assessment", unit: "count" },
    ],
    explanation: md`A readiness metric for the technical file, not a legal threshold: conformity needs every applicable EHSR addressed, so the target is 1. Track it per release, because a change can make existing evidence stale.`,
    lesson: "aw11-l03",
  },
  {
    id: "aw11-evidence-cost",
    name: "Annual cost of re-verification evidence after changes",
    tex: String.raw`C_{ev} = N_u \left( H \, c_h + n_d \, c_e \right)`,
    vars: [
      { sym: "C_{ev}", meaning: "Annual cost of producing re-verification evidence", unit: "EUR/yr" },
      { sym: "N_u", meaning: "Safety-relevant updates (firmware, model, configuration) per year", unit: "1/yr" },
      { sym: "H", meaning: "Rig-hours re-run per update", unit: "rig-h" },
      { sym: "c_h", meaning: "Fully loaded cost per rig-hour", unit: "EUR/rig-h" },
      { sym: "n_d", meaning: "Engineer hours to analyse the change and update the documentation", unit: "h" },
      { sym: "c_e", meaning: "Loaded engineer cost per hour", unit: "EUR/h" },
    ],
    explanation: md`Compare the status quo (full re-run, manual write-up) with selected re-runs and drafted rationale. The difference is a direct value line for Ripple and bench memory; the selection rate must be measured in a pilot before it is quoted.`,
    lesson: "aw11-l05",
  },
  {
    id: "aw11-cost-of-delay",
    name: "Cost of a delayed market date",
    tex: String.raw`C_d = \Delta t \, q \, m`,
    vars: [
      { sym: "C_d", meaning: "Contribution lost or deferred by the delay", unit: "EUR" },
      { sym: "\\Delta t", meaning: "Delay of conforming shipments", unit: "months" },
      { sym: "q", meaning: "Units that would have shipped per month", unit: "units/month" },
      { sym: "m", meaning: "Contribution margin per unit", unit: "EUR/unit" },
    ],
    explanation: md`Usually much larger than the evidence cost itself, which is why buyer urgency comes from market dates, not test budgets. Deferred is not always lost: say which one applies to the buyer.`,
    lesson: "aw11-l05",
  },
];

export default formulas;
