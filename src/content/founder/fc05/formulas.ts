import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 message testing
  {
    id: "fc05-conversion-rate",
    name: "Conversion rate",
    tex: String.raw`p = \frac{c}{n}`,
    vars: [
      { sym: "p", meaning: "Conversion rate", unit: "fraction or %" },
      { sym: "c", meaning: "Number of conversions (demo requests, sign-ups, replies)", unit: "count" },
      { sym: "n", meaning: "Number of exposed visitors or recipients", unit: "count" },
    ],
    explanation: md`Define the conversion precisely before the test (a demo request from a company email, not any form fill). Deep-tech B2B pages typically convert in the low single-digit percent, so small absolute differences matter and are hard to detect.`,
    lesson: "fc05-l01",
  },
  {
    id: "fc05-relative-lift",
    name: "Relative lift",
    tex: String.raw`\text{lift} = \frac{p_B - p_A}{p_A}`,
    vars: [
      { sym: "p_A", meaning: "Conversion rate of the control (A)", unit: "fraction" },
      { sym: "p_B", meaning: "Conversion rate of the variant (B)", unit: "fraction" },
    ],
    explanation: md`Relative lift sounds large on small bases: 1.5% to 2.8% is an 86% lift. Always report it with the absolute rates and a significance check.`,
    lesson: "fc05-l01",
  },
  {
    id: "fc05-two-proportion-z",
    name: "Two-proportion z-test",
    tex: String.raw`z = \frac{p_B - p_A}{\sqrt{\hat p (1-\hat p)\left(\frac{1}{n_A} + \frac{1}{n_B}\right)}}, \quad \hat p = \frac{c_A + c_B}{n_A + n_B}`,
    vars: [
      { sym: "z", meaning: "Test statistic", unit: "dimensionless" },
      { sym: "\\hat p", meaning: "Pooled conversion rate under the null hypothesis of no difference", unit: "fraction" },
      { sym: "n_A, n_B", meaning: "Visitors in each arm", unit: "count" },
      { sym: "c_A, c_B", meaning: "Conversions in each arm", unit: "count" },
    ],
    explanation: md`If $|z| \ge 1.96$ the difference is significant at the 5% level (two-sided). Valid when each arm has at least about 5 to 10 conversions and non-conversions. Decide the sample size before starting and do not stop the test the moment it crosses 1.96 ("peeking" inflates false positives).`,
    lesson: "fc05-l01",
  },
  // ---------------------------------------------------------------- l02 content economics and attribution
  {
    id: "fc05-funnel",
    name: "Funnel yield",
    tex: String.raw`N_{\text{won}} = N_0 \prod_{i=1}^{k} r_i`,
    vars: [
      { sym: "N_0", meaning: "Number at the top of the funnel (readers, visitors, contacts)", unit: "count" },
      { sym: "r_i", meaning: "Conversion rate from stage i-1 to stage i", unit: "fraction" },
      { sym: "k", meaning: "Number of stage transitions", unit: "count" },
      { sym: "N_{\\text{won}}", meaning: "Expected number reaching the last stage (won deals)", unit: "count" },
    ],
    explanation: md`Multiplicative: improving any stage by 10% improves the output by 10%. For long enterprise cycles, work backwards from the deals you need to the top-of-funnel volume, and notice which stage is weakest before buying more top-of-funnel.`,
    lesson: "fc05-l02",
  },
  {
    id: "fc05-attribution-linear",
    name: "Linear multi-touch attribution",
    tex: String.raw`a_j = \frac{V}{n}`,
    vars: [
      { sym: "a_j", meaning: "Credit given to touch j", unit: "EUR" },
      { sym: "V", meaning: "Value of the opportunity (pipeline) or the won deal", unit: "EUR" },
      { sym: "n", meaning: "Number of recorded touches before opportunity creation", unit: "count" },
    ],
    explanation: md`Every recorded touch gets an equal share. Simple and fair-looking, but it only sees touches you could track; dark social (forwarded PDFs, conversations, podcasts) is invisible to it.`,
    lesson: "fc05-l02",
  },
  {
    id: "fc05-attribution-u-shaped",
    name: "Position-based (U-shaped) attribution",
    tex: String.raw`a_{\text{first}} = 0.4V,\quad a_{\text{lead}} = 0.4V,\quad a_{\text{middle},j} = \frac{0.2V}{n-2}\ \ (n \ge 3)`,
    vars: [
      { sym: "a_{\\text{first}}", meaning: "Credit to the first recorded touch", unit: "EUR" },
      { sym: "a_{\\text{lead}}", meaning: "Credit to the lead-creation touch (the one that turned an anonymous person into a known contact or opportunity)", unit: "EUR" },
      { sym: "a_{\\text{middle},j}", meaning: "Credit to each middle touch", unit: "EUR" },
      { sym: "V", meaning: "Opportunity or deal value", unit: "EUR" },
      { sym: "n", meaning: "Number of recorded touches", unit: "count" },
    ],
    explanation: md`A convention, not a law: 40/20/40 rewards discovery and conversion. With two touches split 50/50. All rule-based models are opinions about credit; compare several and add self-reported attribution ("how did you first hear about us?") before cutting a channel.`,
    lesson: "fc05-l02",
  },
  {
    id: "fc05-content-roi",
    name: "Content return on investment",
    tex: String.raw`\text{ROI} = \frac{P_{\text{attr}}\, w\, g - C}{C}`,
    vars: [
      { sym: "P_{\\text{attr}}", meaning: "Pipeline attributed to the asset (sum of credits across opportunities)", unit: "EUR" },
      { sym: "w", meaning: "Win rate on that pipeline", unit: "fraction" },
      { sym: "g", meaning: "Gross margin", unit: "fraction" },
      { sym: "C", meaning: "Full cost of the asset: people time at a loaded rate plus design and promotion", unit: "EUR" },
    ],
    explanation: md`Counts gross profit, not revenue, and only the attributed share. Treat it as a ranking tool between assets, not as an accounting truth: the attribution model and win rate dominate the answer.`,
    lesson: "fc05-l02",
  },
  // ---------------------------------------------------------------- l03 developer funnel
  {
    id: "fc05-activation-rate",
    name: "Activation rate",
    tex: String.raw`a = \frac{N_{\text{success}}}{N_{\text{start}}}`,
    vars: [
      { sym: "a", meaning: "Activation rate", unit: "fraction" },
      { sym: "N_{\\text{success}}", meaning: "Users who reached first value (for example loaded and plotted a synchronised capture)", unit: "count per period" },
      { sym: "N_{\\text{start}}", meaning: "Users who started the quickstart or installed the package", unit: "count per period" },
    ],
    explanation: md`The single most useful developer-marketing metric. It falls steeply with time to first value: every extra step, credential or hardware dependency loses people. Instrument it (opt-in telemetry or a final "it worked" step in the docs) rather than guessing.`,
    lesson: "fc05-l03",
  },
  // ---------------------------------------------------------------- l04 events
  {
    id: "fc05-event-cost",
    name: "Full event cost",
    tex: String.raw`C_{\text{event}} = A\,c_{A} + C_{\text{build}} + C_{\text{travel}} + N_s\, d\, c_{\text{day}} + C_{\text{promo}}`,
    vars: [
      { sym: "A", meaning: "Booth floor area", unit: "m²" },
      { sym: "c_A", meaning: "Space rental rate", unit: "EUR/m²" },
      { sym: "C_{\\text{build}}", meaning: "Stand build, furniture, power, shipping of demo hardware", unit: "EUR" },
      { sym: "C_{\\text{travel}}", meaning: "Flights, hotels, local transport", unit: "EUR" },
      { sym: "N_s", meaning: "Number of staff attending", unit: "people" },
      { sym: "d", meaning: "Days including set-up and travel", unit: "days" },
      { sym: "c_{\\text{day}}", meaning: "Loaded cost or opportunity cost of a person-day", unit: "EUR/day" },
      { sym: "C_{\\text{promo}}", meaning: "Pre-event promotion, printed material, meetings, dinners", unit: "EUR" },
    ],
    explanation: md`Founders usually forget the staff-time term. For a three-person team, four days at a trade fair is a meaningful share of a month of selling time; price it.`,
    lesson: "fc05-l04",
  },
  {
    id: "fc05-cpql",
    name: "Cost per qualified lead",
    tex: String.raw`\text{CPQL} = \frac{C_{\text{event}}}{N_q}`,
    vars: [
      { sym: "C_{\\text{event}}", meaning: "Full cost of the activity", unit: "EUR" },
      { sym: "N_q", meaning: "Leads that meet your written qualification criteria (role, company fit, problem, timing)", unit: "count" },
    ],
    explanation: md`Use qualified leads, never badge scans. Agree the qualification criteria before the event and score leads within 48 hours. Comparable across channels only if the criteria are identical.`,
    lesson: "fc05-l04",
  },
  {
    id: "fc05-event-pipeline",
    name: "Expected pipeline and bookings from qualified leads",
    tex: String.raw`P = N_q\, r_{\text{opp}}\, \text{ACV}, \qquad B = P\, w`,
    vars: [
      { sym: "P", meaning: "Expected pipeline created", unit: "EUR" },
      { sym: "N_q", meaning: "Qualified leads", unit: "count" },
      { sym: "r_{\\text{opp}}", meaning: "Share of qualified leads that become opportunities", unit: "fraction" },
      { sym: "\\text{ACV}", meaning: "Average contract value of a first deal (for example a paid pilot)", unit: "EUR" },
      { sym: "B", meaning: "Expected bookings", unit: "EUR" },
      { sym: "w", meaning: "Win rate on opportunities", unit: "fraction" },
    ],
    explanation: md`Event ROI then follows the content ROI form with $P_{\text{attr}} w g$ as the return. Bookings from an event arrive over six to eighteen months in enterprise hardware, so judge an event on qualified leads and opportunities first, bookings later.`,
    lesson: "fc05-l04",
  },
  // ---------------------------------------------------------------- l05 LinkedIn
  {
    id: "fc05-engagement-rate",
    name: "Engagement rate per impression",
    tex: String.raw`\text{ER} = \frac{R + K + S}{I}`,
    vars: [
      { sym: "R", meaning: "Reactions", unit: "count" },
      { sym: "K", meaning: "Comments", unit: "count" },
      { sym: "S", meaning: "Reposts (shares)", unit: "count" },
      { sym: "I", meaning: "Impressions", unit: "count" },
    ],
    explanation: md`A diagnostic for content quality, not a business outcome. Platforms and tools define it differently (some add clicks or divide by followers); state your definition and keep it fixed. Weight comments from your target audience above everything else.`,
    lesson: "fc05-l05",
  },
  {
    id: "fc05-cost-per-conversation",
    name: "Cost per qualified conversation (founder channel)",
    tex: String.raw`C_{\text{conv}} = \frac{h\, c_h + C_{\text{tools}}}{N_{\text{conv}}}`,
    vars: [
      { sym: "h", meaning: "Founder hours spent writing, replying and messaging in the period", unit: "h" },
      { sym: "c_h", meaning: "Opportunity cost of a founder hour", unit: "EUR/h" },
      { sym: "C_{\\text{tools}}", meaning: "Paid tools, design help, ads", unit: "EUR" },
      { sym: "N_{\\text{conv}}", meaning: "Conversations with people who match the ideal customer profile, started from the channel", unit: "count" },
    ],
    explanation: md`The business metric for a founder channel. Compare it with cost per qualified lead from events and outbound; the channel is working if this is competitive and trending down as the audience compounds.`,
    lesson: "fc05-l05",
  },
];

export default formulas;
