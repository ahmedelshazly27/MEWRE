import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 discovery
  {
    id: "fc02-risk-exposure",
    name: "Assumption risk exposure",
    tex: String.raw`RE = P_{\text{false}} \times C_{\text{wrong}}`,
    vars: [
      { sym: "RE", meaning: "Expected loss from building on the assumption", unit: "EUR" },
      { sym: "P_{\\text{false}}", meaning: "Probability the assumption is false, given current evidence", unit: "0 to 1" },
      { sym: "C_{\\text{wrong}}", meaning: "Cost incurred if you build on it and it is false (engineering time, runway, lost pilot)", unit: "EUR" },
    ],
    explanation: md`The expected-value logic of a risk register applied to product assumptions. Rank assumptions by $RE$, then prefer tests with a high $RE / C_{\text{test}}$ ratio. $P_{\text{false}}$ is a judgement: write it down anyway, because a number can be argued with and updated, a feeling cannot.`,
    lesson: "fc02-l01",
  },
  // ---------------------------------------------------------------- l02 interviews
  {
    id: "fc02-advancement-rate",
    name: "Interview advancement rate",
    tex: String.raw`a = \frac{N_{\text{adv}}}{N_{\text{int}}}`,
    vars: [
      { sym: "a", meaning: "Share of discovery conversations that end with a concrete commitment", unit: "%" },
      { sym: "N_{\\text{adv}}", meaning: "Conversations ending in a commitment of time, reputation or money (next meeting with data, introduction, pilot, LOI)", unit: "count" },
      { sym: "N_{\\text{int}}", meaning: "Discovery conversations held with people in the target segment", unit: "count" },
    ],
    explanation: md`A blunt but useful health metric for discovery. Compliments and "keep me posted" do not count as advancement. For early B2B discovery, an advancement rate that stays near zero after 15 to 20 conversations says the problem, the segment or the ask is wrong.`,
    lesson: "fc02-l02",
  },
  // ---------------------------------------------------------------- l03 JTBD
  {
    id: "fc02-forces-of-progress",
    name: "Forces of progress (switching condition)",
    tex: String.raw`\text{switch} \iff F_{\text{push}} + F_{\text{pull}} > F_{\text{anxiety}} + F_{\text{habit}}`,
    vars: [
      { sym: "F_{\\text{push}}", meaning: "Pain of the current situation pushing the customer to change", unit: "relative score" },
      { sym: "F_{\\text{pull}}", meaning: "Attraction of the new solution", unit: "relative score" },
      { sym: "F_{\\text{anxiety}}", meaning: "Fear about the new solution (will it work, will I look bad, switching cost)", unit: "relative score" },
      { sym: "F_{\\text{habit}}", meaning: "Comfort and inertia of the current way", unit: "relative score" },
    ],
    explanation: md`A qualitative model from the Jobs to be Done school (Moesta and Spiek), not a physical law. Scoring each force 1 to 5 from interview evidence makes the argument explicit. The practical lesson: reducing anxiety and habit (pilots, migration help, references) is often cheaper than adding pull (features).`,
    lesson: "fc02-l03",
  },
  // ---------------------------------------------------------------- l04 specs
  {
    id: "fc02-sample-interval",
    name: "Sample interval from sampling rate",
    tex: String.raw`\Delta t = \frac{1}{f_s}`,
    vars: [
      { sym: "\\Delta t", meaning: "Time between consecutive samples or frames", unit: "s" },
      { sym: "f_s", meaning: "Sampling rate or frame rate", unit: "Hz" },
    ],
    explanation: md`Used to set testable acceptance criteria for time alignment. A DAQ at 10 kHz has $\Delta t = 0.1$ ms; a screen recording at 60 frames per second has $\Delta t \approx 16.7$ ms. An alignment requirement tighter than the coarsest stream's interval cannot be verified from that stream alone.`,
    lesson: "fc02-l04",
  },
  {
    id: "fc02-data-volume",
    name: "Raw acquisition data volume",
    tex: String.raw`V = n_{\text{ch}} \times f_s \times b \times T`,
    vars: [
      { sym: "V", meaning: "Raw data volume", unit: "byte" },
      { sym: "n_{\\text{ch}}", meaning: "Number of channels", unit: "count" },
      { sym: "f_s", meaning: "Sampling rate per channel", unit: "Hz" },
      { sym: "b", meaning: "Bytes per sample (2 for 16-bit, 3 for 24-bit)", unit: "byte" },
      { sym: "T", meaning: "Duration of the recording", unit: "s" },
    ],
    explanation: md`Sets the scale a capture or ingest requirement must handle. 16 channels at 10 kHz, 16-bit, for one hour: $16 \times 10{,}000 \times 2 \times 3{,}600 \approx 1.15$ GB. Excludes video, compression and file overhead.`,
    lesson: "fc02-l04",
  },
  // ---------------------------------------------------------------- l05 prioritisation
  {
    id: "fc02-rice",
    name: "RICE score",
    tex: String.raw`\text{RICE} = \frac{R \times I \times C}{E}`,
    vars: [
      { sym: "R", meaning: "Reach: users or accounts affected per period", unit: "accounts/quarter" },
      { sym: "I", meaning: "Impact per user on the goal (Intercom scale 3, 2, 1, 0.5, 0.25)", unit: "dimensionless" },
      { sym: "C", meaning: "Confidence in the estimates (100%, 80%, 50%)", unit: "0 to 1" },
      { sym: "E", meaning: "Effort: total team time", unit: "person-months" },
    ],
    explanation: md`From Intercom (Sean McBride, 2016). Output is "impact-weighted reach per person-month". Useful to compare many small items; weak when reach is tiny (early B2B with a handful of accounts) or when the value is time-critical, where cost of delay is the better tool.`,
    lesson: "fc02-l05",
  },
  {
    id: "fc02-cost-of-delay",
    name: "Cost of delay",
    tex: String.raw`\text{CoD} = \frac{\Delta V}{\Delta t}`,
    vars: [
      { sym: "\\text{CoD}", meaning: "Value lost per unit of time the item is not delivered", unit: "EUR/week" },
      { sym: "\\Delta V", meaning: "Value lost (revenue, cost saved, risk avoided, option value) over the delay", unit: "EUR" },
      { sym: "\\Delta t", meaning: "Length of the delay", unit: "week" },
    ],
    explanation: md`Popularised by Don Reinertsen (*The Principles of Product Development Flow*). It converts urgency into money per week, so that time-critical items (a pilot deadline, a regulatory date, a fundraising milestone) can be compared with ordinary ones.`,
    lesson: "fc02-l05",
  },
  {
    id: "fc02-cd3",
    name: "CD3: cost of delay divided by duration",
    tex: String.raw`\text{CD3}_i = \frac{\text{CoD}_i}{D_i}`,
    vars: [
      { sym: "\\text{CD3}_i", meaning: "Priority score of item i", unit: "EUR/week²" },
      { sym: "\\text{CoD}_i", meaning: "Cost of delay of item i", unit: "EUR/week" },
      { sym: "D_i", meaning: "Duration of item i using the constrained resource", unit: "week" },
    ],
    explanation: md`Doing items in descending CD3 order minimises total cost of delay when items are independent and done one at a time on the same constrained resource (the weighted shortest job first rule from scheduling theory).`,
    lesson: "fc02-l05",
  },
  {
    id: "fc02-total-delay-cost",
    name: "Total cost of delay of a sequence",
    tex: String.raw`TC = \sum_{i} \text{CoD}_i \times T_i`,
    vars: [
      { sym: "TC", meaning: "Total value lost while items wait and are worked on", unit: "EUR" },
      { sym: "\\text{CoD}_i", meaning: "Cost of delay of item i", unit: "EUR/week" },
      { sym: "T_i", meaning: "Completion time of item i measured from today", unit: "week" },
    ],
    explanation: md`Use it to compare two or more sequences of the same items. $T_i$ is the cumulative duration of every item before i plus item i itself.`,
    lesson: "fc02-l05",
  },
  {
    id: "fc02-wsjf",
    name: "WSJF (SAFe form)",
    tex: String.raw`\text{WSJF} = \frac{\text{UBV} + \text{TC} + \text{RR|OE}}{\text{Job size}}`,
    vars: [
      { sym: "\\text{UBV}", meaning: "User or business value (relative, Fibonacci 1, 2, 3, 5, 8, 13, 20)", unit: "points" },
      { sym: "\\text{TC}", meaning: "Time criticality (relative)", unit: "points" },
      { sym: "\\text{RR|OE}", meaning: "Risk reduction or opportunity enablement (relative)", unit: "points" },
      { sym: "\\text{Job size}", meaning: "Relative size, a proxy for duration", unit: "points" },
    ],
    explanation: md`The Scaled Agile Framework's relative-points version of CD3, for when nobody can estimate cost of delay in EUR. The numerator is a cost-of-delay proxy; each column is scored relative to the smallest item, which is given 1.`,
    lesson: "fc02-l05",
  },
  // ---------------------------------------------------------------- l06 pilots
  {
    id: "fc02-soiling-value",
    name: "Annual value of reduced soiling loss",
    tex: String.raw`V = E_{\text{yr}} \times \Delta L \times p`,
    vars: [
      { sym: "V", meaning: "Annual value of recovered energy", unit: "USD/yr" },
      { sym: "E_{\\text{yr}}", meaning: "Annual energy the plant would produce if clean", unit: "kWh/yr" },
      { sym: "\\Delta L", meaning: "Reduction in average soiling loss", unit: "fraction" },
      { sym: "p", meaning: "Value of a kWh to the owner (tariff, or avoided fuel cost for a state utility)", unit: "USD/kWh" },
    ],
    explanation: md`Use it to size whether a pilot result matters commercially. Subtract any change in cleaning cost (more or fewer cleanings) to get the net value. Scale matters: the same percentage gain is worth about 100 times more on a 1,100 MW plant than on an 11 MW one.`,
    lesson: "fc02-l06",
  },
  // ---------------------------------------------------------------- l07 analytics
  {
    id: "fc02-activation-rate",
    name: "Activation rate",
    tex: String.raw`A = \frac{N_{\text{activated}}}{N_{\text{signed up}}}`,
    vars: [
      { sym: "A", meaning: "Share of new users or accounts reaching the activation event within a set window", unit: "%" },
      { sym: "N_{\\text{activated}}", meaning: "New users or accounts that performed the activation event within the window", unit: "count" },
      { sym: "N_{\\text{signed up}}", meaning: "New users or accounts in the cohort", unit: "count" },
    ],
    explanation: md`The activation event is the first moment the user gets the core value (for Lockstep: a first synchronised capture reviewed by an engineer). Always state the window, e.g. "within 14 days of install".`,
    lesson: "fc02-l07",
  },
  {
    id: "fc02-retention-rate",
    name: "Cohort retention rate",
    tex: String.raw`R_c(t) = \frac{\text{Active}_c(t)}{N_c}`,
    vars: [
      { sym: "R_c(t)", meaning: "Retention of cohort c at period t after start", unit: "%" },
      { sym: "\\text{Active}_c(t)", meaning: "Members of cohort c doing the core action in period t", unit: "count" },
      { sym: "N_c", meaning: "Size of cohort c at period 0", unit: "count" },
    ],
    explanation: md`Plot $R_c(t)$ for each cohort on the same axes. The shape matters more than any single point: a curve that flattens above zero indicates a retained core; a curve heading to zero means no product-market fit for that cohort.`,
    lesson: "fc02-l07",
  },
  {
    id: "fc02-nrr",
    name: "Net revenue retention",
    tex: String.raw`\text{NRR} = \frac{\text{MRR}_0 + \text{Exp} - \text{Contr} - \text{Churn}}{\text{MRR}_0}`,
    vars: [
      { sym: "\\text{MRR}_0", meaning: "Recurring revenue from a set of customers at the start of the period", unit: "EUR/month" },
      { sym: "\\text{Exp}", meaning: "Expansion from those customers (more benches, sites, modules)", unit: "EUR/month" },
      { sym: "\\text{Contr}", meaning: "Contraction (downgrades)", unit: "EUR/month" },
      { sym: "\\text{Churn}", meaning: "Revenue lost from customers who left", unit: "EUR/month" },
    ],
    explanation: md`Revenue retention for B2B, usually measured over 12 months. Above 100% means existing customers grow faster than they shrink or leave. For land-and-expand products (Afterwave per bench, Mizan per MW or per site) this is the metric investors ask about once there is a customer base.`,
    lesson: "fc02-l07",
  },
  // ---------------------------------------------------------------- l08 technical cofounder
  {
    id: "fc02-debt-breakeven",
    name: "Technical debt break-even time",
    tex: String.raw`t_{\text{be}} = \frac{S}{i}`,
    vars: [
      { sym: "t_{\\text{be}}", meaning: "Time after which the shortcut has cost more than it saved", unit: "month" },
      { sym: "S", meaning: "Effort saved now by taking the shortcut (the principal)", unit: "engineer-days" },
      { sym: "i", meaning: "Extra effort per month caused by the shortcut (the interest): extra time per change times changes per month", unit: "engineer-days/month" },
    ],
    explanation: md`Ward Cunningham's debt metaphor made quantitative. If the code will be thrown away before $t_{\text{be}}$ (a pilot, a spike), the debt is cheap. If it sits at the centre of the product and change frequency rises, interest grows and the shortcut becomes expensive. Repayment later usually costs more than $S$.`,
    lesson: "fc02-l08",
  },
  {
    id: "fc02-pert",
    name: "Three-point (PERT) estimate",
    tex: String.raw`E = \frac{O + 4M + P}{6}, \qquad \sigma = \frac{P - O}{6}`,
    vars: [
      { sym: "E", meaning: "Expected duration", unit: "week" },
      { sym: "O", meaning: "Optimistic duration", unit: "week" },
      { sym: "M", meaning: "Most likely duration", unit: "week" },
      { sym: "P", meaning: "Pessimistic duration", unit: "week" },
      { sym: "\\sigma", meaning: "Approximate standard deviation", unit: "week" },
    ],
    explanation: md`Beta-distribution approximation from the 1950s PERT method. Software estimates are right-skewed ($P - M \gg M - O$), so $E > M$. Commit externally to roughly $E + \sigma$ (about the 84th percentile if roughly normal), not to $M$.`,
    lesson: "fc02-l08",
  },
];

export default formulas;
