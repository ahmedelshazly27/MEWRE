import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 research
  {
    id: "fc10-detect-prob",
    name: "Probability that a spot check finds at least one bad row",
    tex: String.raw`P_d = 1 - (1-p)^n`,
    vars: [
      { sym: "P_d", meaning: "Probability that the sample contains at least one error", unit: "0..1" },
      { sym: "p", meaning: "True share of rows or claims that are wrong", unit: "0..1" },
      { sym: "n", meaning: "Number of rows or claims you check against the source", unit: "count" },
    ],
    explanation: md`Each checked row is clean with probability $1-p$; all $n$ are clean with probability $(1-p)^n$, so at least one error shows up with probability $1-(1-p)^n$. Assumes rows are independent and drawn at random (large table, sampling without bias). At $p = 0.10$ and $n = 20$: $P_d = 0.88$. A clean sample of 5 rows tells you almost nothing about a 5 % error rate ($P_d = 0.23$).`,
    lesson: "fc10-l01",
  },
  {
    id: "fc10-sample-size",
    name: "Sample size to catch an error rate with a given confidence",
    tex: String.raw`n = \left\lceil \frac{\ln(1-C)}{\ln(1-p)} \right\rceil`,
    vars: [
      { sym: "n", meaning: "Rows to check", unit: "count" },
      { sym: "C", meaning: "Confidence you want of seeing at least one error if the error rate is p", unit: "0..1" },
      { sym: "p", meaning: "Smallest error rate you care about detecting", unit: "0..1" },
    ],
    explanation: md`Set $P_d = C$ in the detection formula and solve for $n$. To be 95 % sure of catching an error rate of 10 %: $n = \ln 0.05/\ln 0.9 = 28.4$, so 29 rows. For 5 %: 59 rows. For 2 %: 149 rows. If the table has fewer rows than that, check every row. If one error turns up, stop sampling and check everything that feeds an external document.`,
    lesson: "fc10-l01",
  },
  // ---------------------------------------------------------------- l02 outreach
  {
    id: "fc10-outbound-funnel",
    name: "Outbound funnel: meetings from sends",
    tex: String.raw`M = N \cdot \delta \cdot r \cdot q`,
    vars: [
      { sym: "M", meaning: "Meetings booked", unit: "count" },
      { sym: "N", meaning: "Emails sent to verified addresses (first touch)", unit: "count" },
      { sym: "\\delta", meaning: "Inbox placement rate (share that lands in the inbox, not spam)", unit: "0..1" },
      { sym: "r", meaning: "Reply rate on inboxed messages (over the whole sequence)", unit: "0..1" },
      { sym: "q", meaning: "Share of replies that become a booked meeting", unit: "0..1" },
    ],
    explanation: md`Every factor is multiplicative, so a fall in inbox placement hurts as much as a fall in reply rate. Founders usually optimise copy ($r$) and ignore $\delta$, which is set by domain reputation, authentication and complaint rate. Illustrative B2B values for a well-targeted founder sequence: $\delta$ 0.8 to 0.95, $r$ 3 to 10 %, $q$ 30 to 50 %.`,
    lesson: "fc10-l02",
  },
  {
    id: "fc10-complaint-rate",
    name: "Spam complaint rate",
    tex: String.raw`s = \frac{N_c}{N_i}`,
    vars: [
      { sym: "s", meaning: "Spam complaint rate", unit: "0..1" },
      { sym: "N_c", meaning: "Recipients who clicked 'report spam'", unit: "count" },
      { sym: "N_i", meaning: "Messages delivered to the inbox", unit: "count" },
    ],
    explanation: md`Gmail's sender guidelines ask senders to keep the user-reported spam rate (as shown in Postmaster Tools) below 0.1 % and never reach 0.3 %. On a small founder campaign the arithmetic is brutal: 600 inboxed messages at 0.3 % is under 2 complaints. One badly targeted batch can move a young domain from inbox to spam for weeks.`,
    lesson: "fc10-l02",
  },
  {
    id: "fc10-cost-per-meeting",
    name: "Cost per booked meeting",
    tex: String.raw`C_M = \frac{C_d + C_t + h\,w}{M}`,
    vars: [
      { sym: "C_M", meaning: "Cost per booked meeting", unit: "EUR" },
      { sym: "C_d", meaning: "Data and enrichment spend for the campaign", unit: "EUR" },
      { sym: "C_t", meaning: "Tool spend for the campaign (sending, CRM, AI)", unit: "EUR" },
      { sym: "h", meaning: "Founder hours spent (research, review, replies)", unit: "h" },
      { sym: "w", meaning: "Value of a founder hour", unit: "EUR/h" },
      { sym: "M", meaning: "Meetings booked", unit: "count" },
    ],
    explanation: md`Founder time usually dominates. Counting it makes the trade-off visible: AI cuts $h$ per contact, but if it also cuts $r$ (generic copy) or $\delta$ (complaints), cost per meeting rises. Compare against the value of a meeting: pipeline-weighted ACV times stage probability.`,
    lesson: "fc10-l02",
  },
  // ---------------------------------------------------------------- l03 decks, models, specs
  {
    id: "fc10-tam-bottom-up",
    name: "Bottom-up market size",
    tex: String.raw`\text{SAM} = N_a \cdot \text{ACV}`,
    vars: [
      { sym: "\\text{SAM}", meaning: "Serviceable addressable market per year", unit: "EUR/yr" },
      { sym: "N_a", meaning: "Number of accounts that fit the ICP and could buy now", unit: "count" },
      { sym: "\\text{ACV}", meaning: "Annual contract value per account at your pricing", unit: "EUR/yr" },
    ],
    explanation: md`The only market size an investor trusts is one they can rebuild: a counted list of accounts times a price you can defend. When Claude drafts a market slide, demand both factors with sources. A top-down "1 % of a USD 50 bn market" is not a bottom-up number.`,
    lesson: "fc10-l03",
  },
  {
    id: "fc10-error-propagation",
    name: "Relative error of a product of estimates",
    tex: String.raw`\frac{\Delta y}{y} \le \sum_i \frac{\Delta x_i}{x_i}, \qquad \frac{\sigma_y}{y} \approx \sqrt{\sum_i \left(\frac{\sigma_{x_i}}{x_i}\right)^2}`,
    vars: [
      { sym: "y", meaning: "Output that is a product of inputs (e.g. SAM, revenue, meetings)", unit: "any" },
      { sym: "x_i", meaning: "Input estimates", unit: "any" },
      { sym: "\\Delta x_i / x_i", meaning: "Worst-case relative error of each input", unit: "0..1" },
      { sym: "\\sigma_{x_i}/x_i", meaning: "Relative standard uncertainty of each independent input", unit: "0..1" },
    ],
    explanation: md`For $y = \prod x_i$, $\ln y = \sum \ln x_i$, so small relative errors add (worst case) or add in quadrature (independent errors). Account count uncertain by 40 % and ACV by 30 %: worst case 70 %, independent about 50 %. Use it to decide which input to research next: the largest relative error dominates.`,
    lesson: "fc10-l03",
  },
  // ---------------------------------------------------------------- l04 internal tools
  {
    id: "fc10-tool-breakeven",
    name: "Break-even time of an internal tool",
    tex: String.raw`T_{be} = \frac{C_b}{f\,(t_0 - t_1) - C_m}`,
    vars: [
      { sym: "T_{be}", meaning: "Months until the tool has paid back its build time", unit: "months" },
      { sym: "C_b", meaning: "Build effort including review and testing", unit: "h" },
      { sym: "f", meaning: "How often the task runs", unit: "runs/month" },
      { sym: "t_0", meaning: "Time per run by hand", unit: "h/run" },
      { sym: "t_1", meaning: "Time per run with the tool (including checking its output)", unit: "h/run" },
      { sym: "C_m", meaning: "Maintenance effort", unit: "h/month" },
    ],
    explanation: md`If the denominator is zero or negative the tool never pays back: the task is too rare, or checking the output takes as long as doing it by hand. Count $t_1$ honestly; a tool whose output you must re-verify line by line has not saved much.`,
    lesson: "fc10-l04",
  },
  // ---------------------------------------------------------------- l05 verification
  {
    id: "fc10-verify-rule",
    name: "When verification pays",
    tex: String.raw`\text{verify if } c_v < q \cdot p \cdot L`,
    vars: [
      { sym: "c_v", meaning: "Cost of the check (time times hourly value)", unit: "EUR" },
      { sym: "q", meaning: "Probability the check catches the error if there is one", unit: "0..1" },
      { sym: "p", meaning: "Probability the item is wrong", unit: "0..1" },
      { sym: "L", meaning: "Loss if the error ships (money, deal, reputation priced as money)", unit: "EUR" },
    ],
    explanation: md`The right-hand side is the expected loss the check avoids. External, irreversible, numeric and legal items have large $L$ and get checked every time. Internal brainstorm lists have tiny $L$ and do not. When $L$ is reputational and hard to price, treat anything an investor, customer, regulator or tender committee will read as high $L$.`,
    lesson: "fc10-l05",
  },
  {
    id: "fc10-template-gain",
    name: "Net time gain of a reusable prompt template",
    tex: String.raw`G = k\,(t_0 - t_1) - t_b`,
    vars: [
      { sym: "G", meaning: "Net time saved over the period", unit: "h" },
      { sym: "k", meaning: "Number of uses in the period", unit: "count" },
      { sym: "t_0", meaning: "Time per task with an ad hoc prompt (including rework)", unit: "h" },
      { sym: "t_1", meaning: "Time per task with the template", unit: "h" },
      { sym: "t_b", meaning: "Time to write, test and maintain the template", unit: "h" },
    ],
    explanation: md`Templates pay when a task recurs across ventures (investor updates for three companies, discovery-call summaries, tender checklists). The larger gain is often quality, not time: the template carries the verification step every time.`,
    lesson: "fc10-l05",
  },
  // ---------------------------------------------------------------- l06 agents
  {
    id: "fc10-compound-reliability",
    name: "End-to-end reliability of a multi-step agent run",
    tex: String.raw`P = \prod_{i=1}^{n} p_i \;=\; p^n \text{ if all steps are equal}`,
    vars: [
      { sym: "P", meaning: "Probability the whole run is correct", unit: "0..1" },
      { sym: "p_i", meaning: "Probability step i is done correctly (given earlier steps were)", unit: "0..1" },
      { sym: "n", meaning: "Number of dependent steps without a check", unit: "count" },
    ],
    explanation: md`Errors compound: 20 steps at 95 % each give $0.95^{20} = 0.36$. Two levers: fewer unchecked dependent steps (split the run, add checkpoints that validate an intermediate result), and higher per-step reliability (narrow tools, deterministic code for arithmetic and data moves). A checkpoint that catches errors resets the product.`,
    lesson: "fc10-l06",
  },
  {
    id: "fc10-context-growth",
    name: "Input tokens of an agent loop that re-reads its history",
    tex: String.raw`T_{tot} = \sum_{k=1}^{n} (T_0 + k\,\Delta) = n\,T_0 + \Delta\,\frac{n(n+1)}{2}`,
    vars: [
      { sym: "T_{tot}", meaning: "Total input tokens processed over the run", unit: "tokens" },
      { sym: "T_0", meaning: "Fixed context per turn (instructions, tool definitions, files)", unit: "tokens" },
      { sym: "\\Delta", meaning: "Tokens added to the history each turn (tool results, reasoning)", unit: "tokens/turn" },
      { sym: "n", meaning: "Number of turns", unit: "count" },
    ],
    explanation: md`Each turn the model reads everything so far, so cost grows with the square of the number of turns. Twenty turns with $T_0 = 8{,}000$ and $\Delta = 3{,}000$ is 790,000 input tokens. Prompt caching and summarising history reduce the bill; the fix that matters most is a shorter, better-scoped task.`,
    lesson: "fc10-l06",
  },
];

export default formulas;
