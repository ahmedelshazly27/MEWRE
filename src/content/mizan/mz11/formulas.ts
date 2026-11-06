import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l02
  {
    id: "mz11-contract-fy-value",
    name: "Financial-year value of a multi-year service contract",
    tex: String.raw`V_{\text{FY}} = F_{\text{yr}} + \sum_{k} F_{k}, \qquad V_{\text{total}} = F_{\text{yr}} \cdot n`,
    vars: [
      { sym: String.raw`V_{\text{FY}}`, meaning: "Value attributed to one financial year for the same service, including other direct orders for the same item", unit: "KWD" },
      { sym: String.raw`F_{\text{yr}}`, meaning: "Annual fee of this contract", unit: "KWD/yr" },
      { sym: "F_k", meaning: "Other direct orders by the same entity for the same service in that financial year", unit: "KWD" },
      { sym: String.raw`V_{\text{total}}`, meaning: "Total contract value over the term", unit: "KWD" },
      { sym: "n", meaning: "Contract term", unit: "yr" },
    ],
    explanation: md`Compare $V_{\text{FY}}$ with the direct-contracting limit (KWD 75,000 before Law 94/2026 takes effect, KWD 1,000,000 per financial year after, as reported) and compare the contract value with the reported KWD 100,000 Audit Bureau prior-review threshold. Which value (annual or total) each threshold tests must be confirmed with the buyer's legal affairs.`,
    lesson: "mz11-l02",
  },
  // ---------------------------------------------------------------- l03
  {
    id: "mz11-miss-loss",
    name: "Energy lost while a cleaning miss goes undetected",
    tex: String.raw`\Delta E_{\text{miss}} = e_d \, P \, s \, \frac{D^{2}}{2}`,
    vars: [
      { sym: String.raw`\Delta E_{\text{miss}}`, meaning: "Energy lost on the affected rows before the miss is found and fixed", unit: "MWh" },
      { sym: "e_d", meaning: "Daily clean energy per MWp", unit: "MWh/(MWp·day)" },
      { sym: "P", meaning: "Capacity on the rows that were not cleaned", unit: "MWp" },
      { sym: "s", meaning: "Soiling rate on those rows", unit: "1/day" },
      { sym: "D", meaning: "Days until detection and recovery", unit: "day" },
    ],
    explanation: md`Loss grows with the square of detection time, so halving $D$ removes three quarters of the loss. Value of faster detection per event is $e_d P s (D_0^2 - D_1^2)/2$ times the value of energy.`,
    lesson: "mz11-l03",
  },
  // ---------------------------------------------------------------- l04
  {
    id: "mz11-trust-equation",
    name: "Trust equation (heuristic)",
    tex: String.raw`T = \frac{C + R + I}{S}`,
    vars: [
      { sym: "T", meaning: "Trustworthiness as perceived by the buyer", unit: "score" },
      { sym: "C", meaning: "Credibility: what you know and have shown (published work, insight)", unit: "score" },
      { sym: "R", meaning: "Reliability: promises kept, on time", unit: "score" },
      { sym: "I", meaning: "Intimacy: how safe the buyer feels telling you what really worries him", unit: "score" },
      { sym: "S", meaning: "Self-orientation: how much you visibly focus on your own interest", unit: "score" },
    ],
    explanation: md`From Maister, Green and Galford, The Trusted Advisor (2000). A thinking tool, not a measurement: score yourself 1 to 10 on each term after a meeting. Lowering $S$ usually helps more than raising the numerator.`,
    lesson: "mz11-l04",
  },
  // ---------------------------------------------------------------- l05
  {
    id: "mz11-backtest-mae",
    name: "Back-test error of a soiling estimate",
    tex: String.raw`\mathrm{MAE} = \frac{1}{N}\sum_{i=1}^{N} \left| \hat L_i - L_i \right|`,
    vars: [
      { sym: String.raw`\mathrm{MAE}`, meaning: "Mean absolute error of the estimated soiling loss", unit: "percentage points" },
      { sym: String.raw`\hat L_i`, meaning: "Estimated soiling loss in period i from operational data", unit: "%" },
      { sym: "L_i", meaning: "Reference soiling loss in period i (reference cells, cleaning step changes or corrected PR)", unit: "%" },
      { sym: "N", meaning: "Number of periods (e.g. weeks) in the test window", unit: "–" },
    ],
    explanation: md`A pilot success criterion needs a threshold on an error like this, fixed before the analysis, plus the reference method and data window. Use periods long enough that the reference is itself reliable.`,
    lesson: "mz11-l05",
  },
  // ---------------------------------------------------------------- l06
  {
    id: "mz11-site-fee",
    name: "Per-MWp fee with a site minimum",
    tex: String.raw`F_{\text{site}} = \max\left(F_{\min},\; p_{\text{MW}} \cdot P\right)`,
    vars: [
      { sym: String.raw`F_{\text{site}}`, meaning: "Annual fee for one site", unit: "USD/yr" },
      { sym: String.raw`F_{\min}`, meaning: "Minimum annual fee per site (covers onboarding and cost to serve)", unit: "USD/yr" },
      { sym: String.raw`p_{\text{MW}}`, meaning: "Price per MWp per year", unit: "USD/(MWp·yr)" },
      { sym: "P", meaning: "Site capacity", unit: "MWp" },
    ],
    explanation: md`The minimum binds below $P_0 = F_{\min}/p_{\text{MW}}$. Small research plants pay the minimum; large IPPs pay per MWp, often with volume tiers.`,
    lesson: "mz11-l06",
  },
  {
    id: "mz11-value-capture",
    name: "Value capture ratio",
    tex: String.raw`\theta = \frac{F}{V}`,
    vars: [
      { sym: String.raw`\theta`, meaning: "Share of the buyer's annual value that the fee takes", unit: "–" },
      { sym: "F", meaning: "Annual fee", unit: "USD/yr" },
      { sym: "V", meaning: "Annual value to this buyer, in its own unit (cost avoided, revenue at tariff)", unit: "USD/yr" },
    ],
    explanation: md`Keep $\theta$ low enough that the buyer's return is obvious and robust to a bad year; many B2B sellers aim well below one half (Founder Core suggests 10 to 30 %). Compute $V$ for the buyer in the room, not the national value.`,
    lesson: "mz11-l06",
  },
  {
    id: "mz11-savings-share",
    name: "Savings-share fee with floor and cap",
    tex: String.raw`F_{\text{ss}} = \min\Big(F_{\text{cap}},\; \max\big(F_{\text{floor}},\; \sigma \cdot S_{\text{ver}}\big)\Big)`,
    vars: [
      { sym: String.raw`F_{\text{ss}}`, meaning: "Fee for the period", unit: "USD/yr" },
      { sym: String.raw`\sigma`, meaning: "Agreed share of verified savings", unit: "–" },
      { sym: String.raw`S_{\text{ver}}`, meaning: "Savings verified against the agreed baseline and method", unit: "USD/yr" },
      { sym: String.raw`F_{\text{floor}}`, meaning: "Minimum fee (covers cost to serve)", unit: "USD/yr" },
      { sym: String.raw`F_{\text{cap}}`, meaning: "Maximum fee (protects the buyer's budget)", unit: "USD/yr" },
    ],
    explanation: md`Verified savings come from a baseline fixed before the start (see mz04 verified savings). Floor and cap turn an uncertain share into a fee both sides can budget.`,
    lesson: "mz11-l06",
  },
  {
    id: "mz11-service-margin",
    name: "Gross margin of a software or service contract",
    tex: String.raw`GM = \frac{R - C_{\text{del}}}{R}`,
    vars: [
      { sym: "GM", meaning: "Gross margin", unit: "–" },
      { sym: "R", meaning: "Annual contract revenue", unit: "USD/yr" },
      { sym: String.raw`C_{\text{del}}`, meaning: "Annual delivery cost: hosting, data pipelines, analyst and engineer time, site visits, M&V", unit: "USD/yr" },
    ],
    explanation: md`Pure software typically carries a high margin; analyst-heavy services much lower. Investors value the two differently, so report them separately.`,
    lesson: "mz11-l06",
  },
];

export default formulas;
