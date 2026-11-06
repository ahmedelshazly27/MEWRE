import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 venture math
  {
    id: "fc01-fund-returner",
    name: "Fund-returner exit value",
    tex: String.raw`V_{exit} = \frac{F}{o_{exit}}`,
    vars: [
      { sym: "V_{exit}", meaning: "Company exit value (equity value at sale or listing) that returns the whole fund", unit: "currency" },
      { sym: "F", meaning: "Fund size (committed capital)", unit: "currency" },
      { sym: "o_{exit}", meaning: "Investor's fully diluted ownership at exit", unit: "fraction" },
    ],
    explanation: md`The bar each new investment must plausibly clear in a power-law portfolio. EUR 50 m fund at 6.12% ownership at exit needs a EUR 817 m exit. Ignores liquidation preferences, which can raise the investor's share in a modest exit but do not change the logic for large ones.`,
    lesson: "fc01-l01",
  },
  {
    id: "fc01-ownership-dilution",
    name: "Ownership after successive dilution",
    tex: String.raw`o_{exit} = o_0 \prod_{i=1}^{k} (1 - d_i)`,
    vars: [
      { sym: "o_0", meaning: "Ownership bought at entry", unit: "fraction" },
      { sym: "d_i", meaning: "Dilution in later round i (new shares issued divided by post-money shares)", unit: "fraction" },
      { sym: "k", meaning: "Number of later rounds in which the investor does not take its pro-rata", unit: "-" },
    ],
    explanation: md`Each round multiplies existing holders' stakes by $(1-d_i)$. Typical dilution per priced round is in the range of 15 to 25%. 10% at seed diluted 20%, 15%, 10% becomes $0.10\times0.8\times0.85\times0.9 = 6.12\%$. The same formula gives a founder's own path from 100% downward.`,
    lesson: "fc01-l01",
  },
  {
    id: "fc01-compound-growth",
    name: "Compound growth",
    tex: String.raw`R_n = R_0\,(1+g)^n`,
    vars: [
      { sym: "R_n", meaning: "Revenue (or users) after n periods", unit: "currency/period" },
      { sym: "R_0", meaning: "Revenue in the starting period", unit: "currency/period" },
      { sym: "g", meaning: "Growth rate per period (week or month)", unit: "1/period" },
      { sym: "n", meaning: "Number of periods", unit: "periods" },
    ],
    explanation: md`Weekly to annual: $(1+g_w)^{52}$; monthly to annual: $(1+g_m)^{12}$. 5%/week = 12.6x/year; 10%/month = 3.14x/year. Growth rates decay as companies scale, so never extrapolate a young company's rate for more than a few quarters.`,
    lesson: "fc01-l01",
  },
  {
    id: "fc01-doubling-time",
    name: "Doubling time",
    tex: String.raw`t_d = \frac{\ln 2}{\ln(1+g)} \approx \frac{0.693}{g}`,
    vars: [
      { sym: "t_d", meaning: "Periods needed to double", unit: "periods" },
      { sym: "g", meaning: "Growth rate per period", unit: "1/period" },
    ],
    explanation: md`The approximation (rule of 70) holds for small $g$. 10%/month doubles in 7.3 months; 5%/week in 14.2 weeks.`,
    lesson: "fc01-l01",
  },
  {
    id: "fc01-net-burn-runway",
    name: "Net burn and runway",
    tex: String.raw`B = E - R, \qquad T_{run} = \frac{C}{B}`,
    vars: [
      { sym: "B", meaning: "Net burn per month", unit: "currency/month" },
      { sym: "E", meaning: "Total monthly expenses (gross burn)", unit: "currency/month" },
      { sym: "R", meaning: "Monthly revenue (cash collected)", unit: "currency/month" },
      { sym: "C", meaning: "Cash in the bank", unit: "currency" },
      { sym: "T_{run}", meaning: "Runway at today's net burn", unit: "months" },
    ],
    explanation: md`Naive runway assumes today's burn forever and ignores growth. Use cash actually collected, not invoiced. Stress case: runway on gross burn ($C/E$) if revenue is fragile.`,
    lesson: "fc01-l01",
  },
  {
    id: "fc01-breakeven-month",
    name: "Months until revenue covers expenses",
    tex: String.raw`n^{*} = \frac{\ln(E/R_0)}{\ln(1+g)}`,
    vars: [
      { sym: "n^{*}", meaning: "Months until revenue first equals expenses (continuous)", unit: "months" },
      { sym: "E", meaning: "Monthly expenses, held flat", unit: "currency/month" },
      { sym: "R_0", meaning: "Current monthly revenue", unit: "currency/month" },
      { sym: "g", meaning: "Monthly revenue growth rate", unit: "1/month" },
    ],
    explanation: md`Solve $R_0(1+g)^{n} = E$. EUR 8k revenue, EUR 45k expenses, 10%/month: $n^{*} = 18.1$, so break-even in month 19. If expenses grow at rate $e$, replace $1+g$ with $(1+g)/(1+e)$.`,
    lesson: "fc01-l01",
  },
  {
    id: "fc01-cash-to-breakeven",
    name: "Cash consumed before break-even (default-alive test)",
    tex: String.raw`B_{cum} = nE - R_0\,\frac{(1+g)^{n}-1}{g}, \quad n = \lceil n^{*} \rceil, \quad \text{default alive if } B_{cum} \le C`,
    vars: [
      { sym: "B_{cum}", meaning: "Cumulative net burn until revenue covers expenses", unit: "currency" },
      { sym: "n", meaning: "Number of months with revenue below expenses (months 0 to n-1)", unit: "months" },
      { sym: "E", meaning: "Monthly expenses, held flat", unit: "currency/month" },
      { sym: "R_0", meaning: "Revenue in month 0", unit: "currency/month" },
      { sym: "g", meaning: "Monthly revenue growth", unit: "1/month" },
      { sym: "C", meaning: "Cash in the bank", unit: "currency" },
    ],
    explanation: md`Sum of monthly net burn $\sum_{t=0}^{n-1}(E - R_0(1+g)^t)$, a geometric series. Worked example: $19\times45 - 8\times(1.1^{19}-1)/0.1 = 445.7$ k against 600 k of cash: default alive. Very sensitive to $g$; always report the threshold growth rate.`,
    lesson: "fc01-l01",
  },
  // ---------------------------------------------------------------- l02 stages and round sizing
  {
    id: "fc01-raise-size",
    name: "Round size from a milestone plan",
    tex: String.raw`I = \sum_{t=1}^{M+b} \left(E_t - R_t\right) - C_0`,
    vars: [
      { sym: "I", meaning: "Amount to raise", unit: "currency" },
      { sym: "M", meaning: "Months needed to reach the next stage's evidence", unit: "months" },
      { sym: "b", meaning: "Buffer to run the next raise (typically about 6)", unit: "months" },
      { sym: "E_t", meaning: "Planned gross burn in month t (including the hiring plan)", unit: "currency/month" },
      { sym: "R_t", meaning: "Planned cash revenue in month t", unit: "currency/month" },
      { sym: "C_0", meaning: "Cash on hand at closing", unit: "currency" },
    ],
    explanation: md`With a flat average burn this reduces to $I \approx \bar{B}(M+b) - C_0$. Always run a stress case with revenue late or halved: revenue is the least certain line. Seed rounds typically target 18 to 24 months of runway.`,
    lesson: "fc01-l02",
  },
  {
    id: "fc01-post-money-dilution",
    name: "Post-money valuation and dilution of a priced round",
    tex: String.raw`V_{post} = V_{pre} + I, \qquad d = \frac{I}{V_{post}}`,
    vars: [
      { sym: "V_{pre}", meaning: "Pre-money valuation agreed with the investor", unit: "currency" },
      { sym: "I", meaning: "New money invested", unit: "currency" },
      { sym: "V_{post}", meaning: "Post-money valuation", unit: "currency" },
      { sym: "d", meaning: "Fraction of the company sold (dilution of existing holders)", unit: "fraction" },
    ],
    explanation: md`EUR 3 m at EUR 12 m pre: post 15 m, investor owns 20%, every existing holder keeps 80% of its stake (85% becomes 68%). An option pool created before the round dilutes only existing holders (covered in the equity module).`,
    lesson: "fc01-l02",
  },
  // ---------------------------------------------------------------- l03 market sizing
  {
    id: "fc01-bottom-up-market",
    name: "Bottom-up market size",
    tex: String.raw`M = N \times \mathrm{ACV}`,
    vars: [
      { sym: "M", meaning: "Annual market (TAM, SAM or SOM depending on the filter applied to N)", unit: "currency/yr" },
      { sym: "N", meaning: "Number of buying units (teams, sites, MW, plants) passing the filter", unit: "units" },
      { sym: "\\mathrm{ACV}", meaning: "Annual contract value per buying unit", unit: "currency/(unit yr)" },
    ],
    explanation: md`Apply with successively tighter filters: TAM (everyone with the problem), SAM (those you can serve with this product, model and geography), SOM (what you can win in about five years). Illustrative Afterwave: 2,500 teams at EUR 120k gives a EUR 300 m SAM.`,
    lesson: "fc01-l03",
  },
  {
    id: "fc01-som",
    name: "Obtainable market",
    tex: String.raw`\mathrm{SOM} = s \times \mathrm{SAM}`,
    vars: [
      { sym: "\\mathrm{SOM}", meaning: "Serviceable obtainable market (revenue you can realistically win)", unit: "currency/yr" },
      { sym: "s", meaning: "Achievable share within about five years, limited by competition and sales capacity", unit: "fraction" },
      { sym: "\\mathrm{SAM}", meaning: "Serviceable available market", unit: "currency/yr" },
    ],
    explanation: md`Check $s$ against sales capacity: 75 enterprise customers in five years needs a sales team that can close about 15 a year. A share that implies more deals than your team can run is not obtainable.`,
    lesson: "fc01-l03",
  },
  {
    id: "fc01-value-capture",
    name: "Value-based bound on contract value",
    tex: String.raw`\mathrm{ACV} \le k \, V_c`,
    vars: [
      { sym: "\\mathrm{ACV}", meaning: "Annual contract value you can defend", unit: "currency/yr" },
      { sym: "k", meaning: "Share of value the customer will pay (often 0.1 to 0.3 for B2B software)", unit: "fraction" },
      { sym: "V_c", meaning: "Measurable value created per customer per year (savings, recovered revenue, avoided cost)", unit: "currency/yr" },
    ],
    explanation: md`Mizan illustration: USD 631 recovered energy plus USD 1,675 cleaning saving per MW per year; at $k = 0.3$, about USD 692 per MW per year. If the value pool is small, the market is small however many units exist.`,
    lesson: "fc01-l03",
  },
  // ---------------------------------------------------------------- l04 failure and risk
  {
    id: "fc01-joint-success",
    name: "Joint probability of a must-go-right chain",
    tex: String.raw`P = \prod_{i=1}^{n} p_i, \qquad \frac{P'}{P} = \frac{p_i + \Delta p}{p_i}`,
    vars: [
      { sym: "P", meaning: "Probability that every step succeeds (independent steps)", unit: "probability" },
      { sym: "p_i", meaning: "Probability that step i succeeds", unit: "probability" },
      { sym: "\\Delta p", meaning: "Absolute improvement to one step", unit: "probability" },
    ],
    explanation: md`Five steps at 0.9 give 0.59; at 0.8 give 0.33. The relative gain from improving step $i$ is largest for the weakest step. If steps are positively correlated (one root cause affects several), the true joint probability is higher than the product but failures cluster.`,
    lesson: "fc01-l04",
  },
  {
    id: "fc01-expected-loss",
    name: "Expected loss of a risk",
    tex: String.raw`EL = p \times L`,
    vars: [
      { sym: "EL", meaning: "Expected loss", unit: "currency" },
      { sym: "p", meaning: "Probability the risk occurs", unit: "probability" },
      { sym: "L", meaning: "Loss if it occurs (cash, founder time valued at cost, delay)", unit: "currency" },
    ],
    explanation: md`A mitigation is worth doing when its cost is below the reduction in expected loss. 30% chance of losing EUR 120k is EUR 36k expected; a EUR 10k action that halves $p$ saves EUR 18k. Same logic as EMV in project risk registers (Track 0 module 8).`,
    lesson: "fc01-l04",
  },
  // ---------------------------------------------------------------- l05 portfolio of ventures
  {
    id: "fc01-focus-growth",
    name: "Growth under split focus (model)",
    tex: String.raw`g(f) \approx f\,g_{max}, \qquad \frac{R_n}{R_0} = \left(1 + f\,g_{max}\right)^{n}`,
    vars: [
      { sym: "f", meaning: "Share of founder attention the venture gets (after context-switching losses)", unit: "fraction" },
      { sym: "g_{max}", meaning: "Monthly growth rate at full focus", unit: "1/month" },
      { sym: "n", meaning: "Months", unit: "months" },
    ],
    explanation: md`A simplifying model for early ventures where the founder is the bottleneck. Because the outcome is convex in $g$, halving $f$ cuts the outcome by much more than half: at 15%/month for 24 months, 28.6x at full focus vs 5.7x at half. Does not hold when the venture is waiting on external latency or someone else leads it.`,
    lesson: "fc01-l05",
  },
  {
    id: "fc01-expected-value",
    name: "Expected value of a bet",
    tex: String.raw`EV = \sum_{j} q_j V_j - I`,
    vars: [
      { sym: "q_j", meaning: "Probability of outcome j (sums to 1)", unit: "probability" },
      { sym: "V_j", meaning: "Value to you if outcome j occurs (present value)", unit: "currency" },
      { sym: "I", meaning: "Investment of cash and founder time valued at its opportunity cost", unit: "currency" },
    ],
    explanation: md`Value founder time at its opportunity cost (what it would create in the primary venture), not at zero. With two outcomes (success with probability $p$ and value $V$, failure worth 0): $EV = pV - I$.`,
    lesson: "fc01-l05",
  },
  {
    id: "fc01-staged-bet",
    name: "Staged bet and the value of information",
    tex: String.raw`EV_{all\text{-}in} = pV - I_2, \qquad EV_{staged} = p\,(V - I_2) - I_1, \qquad \Delta EV = (1-p)\,I_2 - I_1`,
    vars: [
      { sym: "p", meaning: "Probability the first stage reveals success", unit: "probability" },
      { sym: "V", meaning: "Value if successful (present value)", unit: "currency" },
      { sym: "I_1", meaning: "Extra cost of the first (information) stage", unit: "currency" },
      { sym: "I_2", meaning: "Cost of the main commitment (spent up front all-in, or only after success when staged)", unit: "currency" },
      { sym: "\\Delta EV", meaning: "Value of the information bought by staging", unit: "currency" },
    ],
    explanation: md`Staging saves $I_2$ in the failure cases at the price of $I_1$ in all cases. Mizan illustration: $0.3\times(2.0-0.30) - 0.05 = 0.46$ vs $0.3\times2.0 - 0.30 = 0.30$ EUR m all-in; value of information EUR 0.16 m. If the first stage's work also reduces $I_2$, the gain is larger. Assumes the first stage is conclusive and delay costs nothing; relax both in practice.`,
    lesson: "fc01-l05",
  },
];

export default formulas;
