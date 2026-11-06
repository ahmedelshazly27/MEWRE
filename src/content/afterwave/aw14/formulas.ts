import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // l01
  {
    id: "aw14-acv-build",
    name: "ACV from platform fee and per-rig modules",
    tex: String.raw`ACV = F + n\sum_{j} p_j`,
    vars: [
      { sym: "ACV", meaning: "Annual contract value", unit: "EUR/yr" },
      { sym: "F", meaning: "Platform fee per site or Enclave instance", unit: "EUR/yr" },
      { sym: "n", meaning: "Connected rigs", unit: "rigs" },
      { sym: "p_j", meaning: "Price of module j (Lockstep, Ripple) per rig", unit: "EUR per rig per yr" },
    ],
    explanation: md`The platform fee covers fixed cost to serve per site; per-rig prices carry the value scaling. Effective price per rig is $ACV/n$, higher for small labs by design.`,
    lesson: "aw14-l01",
  },
  {
    id: "aw14-capture-ratio",
    name: "Capture ratio and customer payback",
    tex: String.raw`k = \frac{ACV}{V}, \qquad t_{pb} = \frac{12\,ACV}{V}, \qquad V = n\,H\,s\,c_h`,
    vars: [
      { sym: "k", meaning: "Share of quantified annual value the customer pays", unit: "fraction" },
      { sym: "V", meaning: "Quantified annual value to the customer", unit: "EUR/yr" },
      { sym: "t_{pb}", meaning: "Customer payback", unit: "months" },
      { sym: "n", meaning: "Rigs", unit: "rigs" },
      { sym: "H", meaning: "Bench hours per rig per year", unit: "h/yr" },
      { sym: "s", meaning: "Share of bench time freed by avoided reruns", unit: "fraction" },
      { sym: "c_h", meaning: "Fully loaded cost of a bench hour", unit: "EUR/h" },
    ],
    explanation: md`For a new category, $k$ of 10 to 25 % is defensible. The value inputs (rigs, hours, rerun share, cost per hour) are exactly what a pilot must measure with the customer. Escaped defects avoided add value but are harder to prove, so leave them out of the base case.`,
    lesson: "aw14-l01",
  },
  {
    id: "aw14-gross-margin",
    name: "Gross margin with cost to serve",
    tex: String.raw`GM = \frac{P - C_{serve}}{P}, \qquad C_{serve} = C_{support} + C_{infra} + C_{deploy}`,
    vars: [
      { sym: "GM", meaning: "Gross margin", unit: "fraction" },
      { sym: "P", meaning: "Annual price", unit: "EUR/yr" },
      { sym: "C_{serve}", meaning: "Annual cost to serve the customer", unit: "EUR/yr" },
      { sym: "C_{support}", meaning: "Support and upgrade effort", unit: "EUR/yr" },
      { sym: "C_{infra}", meaning: "Hosting infrastructure (zero on-prem; the customer pays)", unit: "EUR/yr" },
      { sym: "C_{deploy}", meaning: "Deployment cost in the year it occurs, if not charged separately", unit: "EUR/yr" },
    ],
    explanation: md`On-prem moves infrastructure to the customer but adds deployment and multi-version support. To keep a target margin $m$ on hosted, the price must satisfy $P \ge C_{serve}/(1-m)$, which is why hosted is priced with a visible infrastructure line.`,
    lesson: "aw14-l01",
  },
  // l02
  {
    id: "aw14-hardware-price",
    name: "Hardware price from landed cost and target margin",
    tex: String.raw`P = \frac{C_{landed}}{1 - m}`,
    vars: [
      { sym: "P", meaning: "Unit price", unit: "EUR" },
      { sym: "C_{landed}", meaning: "BOM + assembly and calibration + freight and duty + warranty provision", unit: "EUR" },
      { sym: "m", meaning: "Target gross margin", unit: "fraction" },
    ],
    explanation: md`Margin, not markup: cost times $(1+m)$ gives a margin of only $m/(1+m)$ (cost x 1.4 is 28.6 %).`,
    lesson: "aw14-l02",
  },
  {
    id: "aw14-test-hour-cost",
    name: "Cost per billable test hour",
    tex: String.raw`c_{bill} = \frac{C_{cap}/L + C_{fix}}{H_{av}\,U} + c_v`,
    vars: [
      { sym: "c_{bill}", meaning: "Full cost per billable hour", unit: "EUR/h" },
      { sym: "C_{cap}", meaning: "Platform capex", unit: "EUR" },
      { sym: "L", meaning: "Depreciation life", unit: "yr" },
      { sym: "C_{fix}", meaning: "Fixed operating cost (space, technician share, calibration, insurance)", unit: "EUR/yr" },
      { sym: "H_{av}", meaning: "Available hours after maintenance and calibration", unit: "h/yr" },
      { sym: "U", meaning: "Utilisation: billable share of available hours", unit: "fraction" },
      { sym: "c_v", meaning: "Variable cost per hour (energy, wear, consumables)", unit: "EUR/h" },
    ],
    explanation: md`Utilisation dominates: halving it nearly doubles the capital and fixed part of the hourly cost.`,
    lesson: "aw14-l02",
  },
  {
    id: "aw14-taas-ebit",
    name: "Test-as-a-service operating result and payback",
    tex: String.raw`EBIT = H_{av}\,U\,(p - c_v) - \frac{C_{cap}}{L} - C_{fix}, \qquad t_{payback} = \frac{C_{cap}}{EBIT + C_{cap}/L}`,
    vars: [
      { sym: "EBIT", meaning: "Annual operating result of one rig", unit: "EUR/yr" },
      { sym: "p", meaning: "Price per billable hour", unit: "EUR/h" },
      { sym: "t_{payback}", meaning: "Simple payback, pre-tax, ignoring working capital", unit: "yr" },
    ],
    explanation: md`Contribution per hour $p - c_v$ times billable hours, minus depreciation and fixed costs. Payback adds depreciation back because it is not a cash cost.`,
    lesson: "aw14-l02",
  },
  {
    id: "aw14-breakeven-utilisation",
    name: "Breakeven utilisation",
    tex: String.raw`U^{*} = \frac{C_{cap}/L + C_{fix}}{H_{av}\,(p - c_v)}`,
    vars: [
      { sym: "U^{*}", meaning: "Utilisation at which EBIT = 0", unit: "fraction" },
    ],
    explanation: md`Compare it with realistic utilisation cases (30, 45, 60 %). A price cut raises $U^*$ in proportion to the fall in contribution per hour.`,
    lesson: "aw14-l02",
  },
  // l03
  {
    id: "aw14-yc-stake",
    name: "YC stake after the next SAFE round",
    tex: String.raw`s_{YC} = 0.07 + \frac{375{,}000}{V_{cap,post}}`,
    vars: [
      { sym: "s_{YC}", meaning: "YC's ownership before later priced-round dilution", unit: "fraction" },
      { sym: "V_{cap,post}", meaning: "Post-money valuation cap of the next SAFE round (adopted by the uncapped MFN SAFE)", unit: "USD" },
    ],
    explanation: md`The 7 % SAFE (USD 125k at an implied USD 1.79m post-money) is fixed; the USD 375k uncapped MFN SAFE takes the later SAFE's terms. At a USD 15m cap: $7\% + 2.5\% = 9.5\%$. If the next financing is a priced round, the MFN converts at the round price instead.`,
    lesson: "aw14-l03",
  },
  // l04
  {
    id: "aw14-net-team-cost",
    name: "Net annual team cost after WBSO",
    tex: String.raw`C_{net} = \sum_i n_i c_i - W, \qquad W = r_1\min(S,\,S_1) + r_2\max(S - S_1,\,0)`,
    vars: [
      { sym: "C_{net}", meaning: "Net annual team cost", unit: "EUR/yr" },
      { sym: "n_i", meaning: "Headcount in role i", unit: "people" },
      { sym: "c_i", meaning: "Fully loaded annual cost per head in role i", unit: "EUR/yr" },
      { sym: "W", meaning: "WBSO benefit (zero outside a Dutch payroll)", unit: "EUR/yr" },
      { sym: "S", meaning: "S&O wage base", unit: "EUR/yr" },
      { sym: "S_1", meaning: "First-bracket ceiling, EUR 391,020 in 2026", unit: "EUR" },
      { sym: "r_1", meaning: "First-bracket rate: 36 % (50 % for starters) in 2026", unit: "fraction" },
      { sym: "r_2", meaning: "Second-bracket rate: 16 % in 2026", unit: "fraction" },
    ],
    explanation: md`Compare locations on net cost and runway, not gross salary. The course models $S$ as the R&D staff's loaded cost; RVO's actual base rules differ, so confirm with an adviser.`,
    lesson: "aw14-l04",
  },
  // l05
  {
    id: "aw14-round-size",
    name: "Round size from milestones",
    tex: String.raw`R = \sum_{t=1}^{T_m} B_t + B_{T_m}\,T_b, \qquad d = \frac{R}{V_{post}}`,
    vars: [
      { sym: "R", meaning: "Amount to raise", unit: "EUR" },
      { sym: "B_t", meaning: "Burn in month t of the plan", unit: "EUR/month" },
      { sym: "T_m", meaning: "Months to the next round's milestones", unit: "months" },
      { sym: "T_b", meaning: "Buffer months (about 6)", unit: "months" },
      { sym: "d", meaning: "Dilution from the round", unit: "fraction" },
      { sym: "V_{post}", meaning: "Post-money valuation", unit: "EUR" },
    ],
    explanation: md`The milestones come from the risks the next investor needs retired. Money already raised (for example the YC deal) reduces the need rather than adding to it.`,
    lesson: "aw14-l05",
  },
];

export default formulas;
