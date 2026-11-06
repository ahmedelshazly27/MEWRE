import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 structures
  {
    id: "sh07-fiscal-breakeven",
    name: "Fiscal sponsorship versus own entity: break-even revenue",
    tex: String.raw`R^{*} = \frac{C_e}{f}`,
    vars: [
      { sym: "R^{*}", meaning: "Annual revenue that flows through the sponsor at which both options cost the same", unit: "USD/yr" },
      { sym: "C_e", meaning: "Annual fixed cost of running your own entity (licence, accounting, audit, bank, filings), excluding set-up", unit: "USD/yr" },
      { sym: "f", meaning: "Fiscal sponsor's fee as a fraction of funds handled", unit: "fraction" },
    ],
    explanation: md`Below $R^{*}$ the sponsor's percentage fee is cheaper than your own overhead; above it, your own entity is cheaper. Add the one-off set-up cost spread over the expected life of the arrangement if you want a sharper comparison, and remember that the fee also buys compliance work you would otherwise do yourself.`,
    lesson: "sh07-l01",
  },
  // ---------------------------------------------------------------- l02 revenue models
  {
    id: "sh07-tier-cap",
    name: "Top-tier sponsor cap (MLH guidance)",
    tex: String.raw`P_{\text{top}} \le 0.25\,B`,
    vars: [
      { sym: "P_{\\text{top}}", meaning: "Price of the highest sponsorship tier", unit: "USD" },
      { sym: "B", meaning: "Total event budget", unit: "USD" },
    ],
    explanation: md`MLH's organiser guide recommends three tiers with the top tier at no more than a quarter of the budget, so the loss of any one sponsor does not cancel the event. The same rule, applied to annual revenue per payer, is the concentration guardrail in lesson 3.`,
    lesson: "sh07-l02",
  },
  {
    id: "sh07-cost-per-activation",
    name: "Sponsor cost per activated developer",
    tex: String.raw`c_a = \frac{P_s}{a\,N}`,
    vars: [
      { sym: "c_a", meaning: "Sponsor's cost per developer who actually used its product", unit: "USD/developer" },
      { sym: "P_s", meaning: "Sponsorship price paid (cash plus the cash value of anything else the sponsor spends)", unit: "USD" },
      { sym: "a", meaning: "Activation rate: share of participants who used the sponsor's API or tool", unit: "fraction" },
      { sym: "N", meaning: "Participants", unit: "people" },
    ],
    explanation: md`This is the number a developer-relations manager compares with other channels (ads, conference booths, content). If you cannot estimate it, you are selling logo placement, which is the first budget line cut.`,
    lesson: "sh07-l02",
  },
  {
    id: "sh07-placement-fee",
    name: "Recruiting success fee",
    tex: String.raw`\text{Fee} = \varphi\,W_1`,
    vars: [
      { sym: "\\varphi", meaning: "Fee rate on first-year salary (agency norms are often 15 to 25 %)", unit: "fraction" },
      { sym: "W_1", meaning: "Hired candidate's first-year base salary", unit: "USD/yr" },
    ],
    explanation: md`Contingent recruiting pays only on a hire, usually with a replacement guarantee period. It is lumpy and slow but each event can be worth more than a sponsorship. Check whether the activity needs a recruitment licence in the jurisdiction.`,
    lesson: "sh07-l02",
  },
  // ---------------------------------------------------------------- l03 unit economics
  {
    id: "sh07-revenue-share",
    name: "Revenue share of a stream or payer",
    tex: String.raw`s_i = \frac{R_i}{\sum_j R_j}`,
    vars: [
      { sym: "s_i", meaning: "Share of total revenue from stream or payer i", unit: "fraction" },
      { sym: "R_i", meaning: "Revenue from stream or payer i", unit: "USD/yr" },
    ],
    explanation: md`Compute it twice: by **stream** (sponsorship, tickets, jobs, grants) and by **payer** (each sponsor or funder). Payer concentration is usually the sharper risk, because one sponsor often buys across several streams.`,
    lesson: "sh07-l03",
  },
  {
    id: "sh07-hhi",
    name: "Concentration index (Herfindahl-Hirschman) and effective number of sources",
    tex: String.raw`H = \sum_i s_i^{2}, \qquad N_{\text{eff}} = \frac{1}{H}`,
    vars: [
      { sym: "H", meaning: "Concentration index (0 to 1; 1 means a single source)", unit: "dimensionless" },
      { sym: "s_i", meaning: "Revenue share of source i", unit: "fraction" },
      { sym: "N_{\\text{eff}}", meaning: "Number of equal-sized sources that would give the same concentration", unit: "sources" },
    ],
    explanation: md`Six streams that look diversified may behave like four equal ones. Competition authorities use the same index on market shares (multiplied by 10,000). For a small community company, $N_{\text{eff}}$ below about 3 means one bad quarter in one stream can stop operations.`,
    lesson: "sh07-l03",
  },
  {
    id: "sh07-contribution",
    name: "Contribution by stream and operating surplus",
    tex: String.raw`CM_i = R_i - V_i,\quad m_i = \frac{CM_i}{R_i},\quad S = \sum_i CM_i - F`,
    vars: [
      { sym: "CM_i", meaning: "Contribution of stream i", unit: "USD/yr" },
      { sym: "R_i", meaning: "Revenue of stream i", unit: "USD/yr" },
      { sym: "V_i", meaning: "Direct costs of delivering stream i (venue, food, prizes, production, sponsor fulfilment, grant delivery)", unit: "USD/yr" },
      { sym: "m_i", meaning: "Contribution margin of stream i", unit: "fraction" },
      { sym: "F", meaning: "Fixed costs not tied to a stream (tools, accounting, legal, insurance, paid staff)", unit: "USD/yr" },
      { sym: "S", meaning: "Operating surplus (deficit if negative)", unit: "USD/yr" },
    ],
    explanation: md`A stream with high revenue and low margin (a big conference, a restricted grant) can contribute less than a small, high-margin stream (a job board). Decide where lead time goes by contribution per hour, not revenue.`,
    lesson: "sh07-l03",
  },
  {
    id: "sh07-sponsor-ltv",
    name: "Sponsor lifetime value and payback",
    tex: String.raw`\text{LTV} = \frac{P\,m}{1-r}, \qquad t_{\text{payback}} = \frac{\text{CAC}}{P\,m}`,
    vars: [
      { sym: "P", meaning: "Annual value of a sponsor's package", unit: "USD/yr" },
      { sym: "m", meaning: "Margin after fulfilment cost (what you spend to deliver what the sponsor bought)", unit: "fraction" },
      { sym: "r", meaning: "Annual renewal rate", unit: "fraction" },
      { sym: "\\text{CAC}", meaning: "Cost to win the sponsor (sales hours valued at a rate, travel, materials)", unit: "USD" },
      { sym: "t_{\\text{payback}}", meaning: "Time to recover the acquisition cost", unit: "yr" },
    ],
    explanation: md`$1/(1-r)$ is the expected number of years a sponsor stays (geometric series). Raising renewal from 50 % to 75 % doubles expected life from 2 to 4 years, which is why sponsor reporting is a revenue activity.`,
    lesson: "sh07-l03",
  },
  {
    id: "sh07-arpm",
    name: "Revenue per active member",
    tex: String.raw`\text{ARPM} = \frac{R}{M_{\text{active}}}`,
    vars: [
      { sym: "R", meaning: "Total annual revenue", unit: "USD/yr" },
      { sym: "M_{\\text{active}}", meaning: "Members active in the year (attended, built, applied, contributed)", unit: "members" },
    ],
    explanation: md`The bridge between the community metric and the money. Sponsors pay for access to active builders, so ARPM rises with the quality of members, not the size of the mailing list.`,
    lesson: "sh07-l03",
  },
  // ---------------------------------------------------------------- l04 governance
  {
    id: "sh07-pay-trigger",
    name: "Lead stipend trigger",
    tex: String.raw`S_{12} \ge 12\,n\,\sigma \quad\text{and}\quad C_{\text{unres}} \ge k\,(F_m + n\,\sigma)`,
    vars: [
      { sym: "S_{12}", meaning: "Trailing 12-month operating surplus before any lead pay", unit: "USD" },
      { sym: "n", meaning: "Number of leads to be paid", unit: "people" },
      { sym: "\\sigma", meaning: "Monthly stipend per lead", unit: "USD/month" },
      { sym: "C_{\\text{unres}}", meaning: "Unrestricted cash in the bank", unit: "USD" },
      { sym: "k", meaning: "Reserve policy in months", unit: "months" },
      { sym: "F_m", meaning: "Monthly fixed costs excluding stipends", unit: "USD/month" },
    ],
    explanation: md`A written, numeric rule removes the monthly argument about when volunteers start being paid. Both conditions must hold: the surplus proves pay is affordable from operations, and the reserve proves the organisation survives a bad quarter after pay starts.`,
    lesson: "sh07-l04",
  },
  {
    id: "sh07-required-revenue",
    name: "Revenue needed to fund fixed costs and stipends",
    tex: String.raw`R_{\text{req}} = \frac{F + 12\,n\,\sigma}{\bar{m}}`,
    vars: [
      { sym: "R_{\\text{req}}", meaning: "Annual revenue needed to break even with leads paid", unit: "USD/yr" },
      { sym: "F", meaning: "Annual fixed costs excluding stipends", unit: "USD/yr" },
      { sym: "\\bar{m}", meaning: "Blended contribution margin of the revenue mix", unit: "fraction" },
    ],
    explanation: md`The blended margin depends on the mix, so the answer changes when a grant (low margin) replaces a job board (high margin). Recompute it whenever the mix moves.`,
    lesson: "sh07-l04",
  },
  // ---------------------------------------------------------------- l05 investment
  {
    id: "sh07-fund-returner",
    name: "Exit value for one company to return a fund",
    tex: String.raw`V_{\text{exit}} = \frac{F_{\text{fund}}}{p_{\text{exit}}}`,
    vars: [
      { sym: "V_{\\text{exit}}", meaning: "Exit value at which the investor's stake equals the whole fund", unit: "USD" },
      { sym: "F_{\\text{fund}}", meaning: "Fund size", unit: "USD" },
      { sym: "p_{\\text{exit}}", meaning: "Investor's ownership at exit, after dilution", unit: "fraction" },
    ],
    explanation: md`Venture funds need each investment to be capable of returning the fund, because returns follow a power law. If no credible path reaches $V_{\text{exit}}$, the investor should say no, and you should not want their money.`,
    lesson: "sh07-l05",
  },
  {
    id: "sh07-unrestricted-share",
    name: "Unrestricted share of income",
    tex: String.raw`u = \frac{R_{\text{unres}}}{R}`,
    vars: [
      { sym: "u", meaning: "Share of income the organisation may spend on anything within its purpose", unit: "fraction" },
      { sym: "R_{\\text{unres}}", meaning: "Unrestricted income: earned revenue, general donations, the indirect-cost part of grants", unit: "USD/yr" },
      { sym: "R", meaning: "Total income", unit: "USD/yr" },
    ],
    explanation: md`Restricted grants pay for a project, not for the organisation. A community company with low $u$ can be busy and well funded and still unable to pay its accountant.`,
    lesson: "sh07-l05",
  },
  // ---------------------------------------------------------------- l06 decision
  {
    id: "sh07-weighted-score",
    name: "Weighted criteria score",
    tex: String.raw`S_j = \sum_i w_i\,x_{ij}, \qquad \sum_i w_i = 1`,
    vars: [
      { sym: "S_j", meaning: "Score of option j", unit: "points (1 to 5)" },
      { sym: "w_i", meaning: "Weight of criterion i", unit: "fraction" },
      { sym: "x_{ij}", meaning: "Score of option j on criterion i", unit: "points (1 to 5)" },
    ],
    explanation: md`Fix the weights before scoring the options, or you will tune the weights to your favourite. When two options are within about 0.2 points, the matrix has not decided: test the sensitivity to the one or two weights you are least sure of.`,
    lesson: "sh07-l06",
  },
];

export default formulas;
