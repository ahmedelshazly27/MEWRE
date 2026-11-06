import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l02 ICP
  {
    id: "fc03-pain-cost",
    name: "Annual cost of the status quo (full regression)",
    tex: String.raw`C_{sq} = N_r \, H_{full} \, c_h`,
    vars: [
      { sym: "C_{sq}", meaning: "Annual cost of the current way of working", unit: "EUR/yr" },
      { sym: "N_r", meaning: "Regression-triggering changes (firmware, model or rig) per year", unit: "1/yr" },
      { sym: "H_{full}", meaning: "Rig-hours consumed by one full regression", unit: "rig-h" },
      { sym: "c_h", meaning: "Fully loaded cost of one rig-hour (technician, depreciation, energy, facility)", unit: "EUR/rig-h" },
    ],
    explanation: md`A pain-intensity estimate you can compute from a discovery call. Illustrative lab: $48 \times 300 \times 110 = \text{EUR } 1.58$ m/yr. Generalises to "events per year times cost per event" for any status quo.`,
    lesson: "fc03-l02",
  },
  {
    id: "fc03-icp-score",
    name: "Weighted ICP score",
    tex: String.raw`S = \frac{100}{s_{\max}} \sum_{i=1}^{k} w_i \, s_i, \qquad \sum_{i=1}^{k} w_i = 1`,
    vars: [
      { sym: "S", meaning: "Account score on a 0 to 100 scale", unit: "points" },
      { sym: "w_i", meaning: "Weight of criterion i (encodes strategy)", unit: "-" },
      { sym: "s_i", meaning: "Score of the account on criterion i", unit: "0 to s_max" },
      { sym: "s_{\\max}", meaning: "Top of the criterion scale (5 here)", unit: "-" },
    ],
    explanation: md`Ranks accounts for founder time. Illustrative bands: pursue at 70 or more, nurture at 50 to 69, ignore below 50. Recalibrate the weights against won and lost deals.`,
    lesson: "fc03-l02",
  },
  {
    id: "fc03-soiling-loss-value",
    name: "Annual value of PV soiling loss",
    tex: String.raw`V_s = P_{nom} \, Y \, L_s \, p`,
    vars: [
      { sym: "V_s", meaning: "Value of energy lost to soiling per year", unit: "USD/yr" },
      { sym: "P_{nom}", meaning: "Installed DC capacity", unit: "kWp" },
      { sym: "Y", meaning: "Specific yield before soiling", unit: "kWh/kWp/yr" },
      { sym: "L_s", meaning: "Average soiling loss fraction", unit: "-" },
      { sym: "p", meaning: "Value of a kWh (tariff or avoided cost)", unit: "USD/kWh" },
    ],
    explanation: md`Pain-intensity proxy for Mizan accounts. Illustrative: $100{,}000 \times 2{,}000 \times 0.05 \times 0.025 = \text{USD } 250{,}000$/yr, before cleaning cost.`,
    lesson: "fc03-l02",
  },
  // ---------------------------------------------------------------- l03 value
  {
    id: "fc03-value",
    name: "Annual value of change-impact test selection",
    tex: String.raw`V = N_r \, (H_{full} - H_{sel}) \, c_h`,
    vars: [
      { sym: "V", meaning: "Annual rig-time value released", unit: "EUR/yr" },
      { sym: "N_r", meaning: "Regression-triggering changes per year", unit: "1/yr" },
      { sym: "H_{full}", meaning: "Rig-hours of a full regression", unit: "rig-h" },
      { sym: "H_{sel}", meaning: "Rig-hours of the selected subset", unit: "rig-h" },
      { sym: "c_h", meaning: "Fully loaded cost per rig-hour", unit: "EUR/rig-h" },
    ],
    explanation: md`The quantifiable rung of the value ladder. Excludes calendar-time and evidence value, which are often larger but harder to price. Illustrative: $48 \times (300-105) \times 110 = \text{EUR } 1.03$ m/yr. Only claim it with the customer's own inputs.`,
    lesson: "fc03-l03",
  },
  {
    id: "fc03-value-capture",
    name: "Value-based price (value capture share)",
    tex: String.raw`ACV = \alpha \, V`,
    vars: [
      { sym: "ACV", meaning: "Annual contract value", unit: "EUR/yr" },
      { sym: "\\alpha", meaning: "Share of quantified value captured as price (often 0.1 to 0.2 for a new vendor)", unit: "-" },
      { sym: "V", meaning: "Quantified annual value to the customer", unit: "EUR/yr" },
    ],
    explanation: md`A buyer needs a large multiple of value over price to accept the risk of a startup: $\alpha = 0.1$ means a 10x return on paper. Pricing itself is covered in the pricing module; here it links value to the ACV a sales motion needs.`,
    lesson: "fc03-l03",
  },
  // ---------------------------------------------------------------- l04 motions
  {
    id: "fc03-cac",
    name: "Customer acquisition cost",
    tex: String.raw`CAC = \frac{S_{SM}}{N_{new}}`,
    vars: [
      { sym: "CAC", meaning: "Customer acquisition cost", unit: "EUR/customer" },
      { sym: "S_{SM}", meaning: "Fully loaded sales and marketing spend in the period (salaries, commissions, tools, travel, events, programmes)", unit: "EUR" },
      { sym: "N_{new}", meaning: "New customers won in the same period (lagged by the sales cycle where possible)", unit: "customers" },
    ],
    explanation: md`Use fully loaded spend, and for long cycles match spend to the period that generated the wins. Founder time is real cost even when it is not cash: price it at what a hire would cost.`,
    lesson: "fc03-l04",
  },
  {
    id: "fc03-cac-payback",
    name: "CAC payback period",
    tex: String.raw`P = \frac{CAC}{(ACV \cdot GM)/12}`,
    vars: [
      { sym: "P", meaning: "Months of gross profit needed to recover CAC", unit: "months" },
      { sym: "CAC", meaning: "Customer acquisition cost", unit: "EUR" },
      { sym: "ACV", meaning: "Annual contract value", unit: "EUR/yr" },
      { sym: "GM", meaning: "Gross margin on the contract", unit: "-" },
    ],
    explanation: md`Heuristics: under 12 months for SMB SaaS, 18 to 24 months tolerated for enterprise with low churn. Illustrative field-sales case: $120{,}000/(100{,}000 \times 0.8/12) = 18$ months.`,
    lesson: "fc03-l04",
  },
  {
    id: "fc03-min-acv",
    name: "Minimum ACV a motion can support",
    tex: String.raw`ACV_{\min} = \frac{12 \, CAC}{GM \cdot P^{*}}`,
    vars: [
      { sym: "ACV_{\\min}", meaning: "Lowest ACV that meets the payback target", unit: "EUR/yr" },
      { sym: "CAC", meaning: "CAC of the motion", unit: "EUR" },
      { sym: "GM", meaning: "Gross margin", unit: "-" },
      { sym: "P^{*}", meaning: "Target payback period", unit: "months" },
    ],
    explanation: md`The payback formula solved for ACV. Each motion has a CAC floor, so each motion has an ACV floor: field sales at CAC EUR 120k, 80 % margin and 18-month payback needs ACV of at least EUR 100k.`,
    lesson: "fc03-l04",
  },
  {
    id: "fc03-rep-capacity",
    name: "Annual wins per account executive",
    tex: String.raw`W = \frac{12 \, n}{t_c} \, w`,
    vars: [
      { sym: "W", meaning: "New customers won per AE per year", unit: "1/yr" },
      { sym: "n", meaning: "Active opportunities an AE can carry at once", unit: "opportunities" },
      { sym: "t_c", meaning: "Average sales cycle", unit: "months" },
      { sym: "w", meaning: "Win rate of qualified opportunities", unit: "-" },
    ],
    explanation: md`Little's law applied to a pipeline: throughput = work in progress / cycle time. Illustrative: $12 \times 10/9 \times 0.25 = 3.3$ wins a year; long cycles cap the wins per AE and drive up CAC.`,
    lesson: "fc03-l04",
  },
  {
    id: "fc03-ltv-cac",
    name: "Lifetime value and LTV/CAC",
    tex: String.raw`LTV = \frac{ACV \cdot GM}{c}, \qquad \text{ratio} = \frac{LTV}{CAC}`,
    vars: [
      { sym: "LTV", meaning: "Gross-profit lifetime value of a customer (simple, no expansion, undiscounted)", unit: "EUR" },
      { sym: "c", meaning: "Annual logo churn rate", unit: "1/yr" },
      { sym: "ACV", meaning: "Annual contract value", unit: "EUR/yr" },
      { sym: "GM", meaning: "Gross margin", unit: "-" },
    ],
    explanation: md`Common heuristic: LTV/CAC of 3 or more. With few customers and no churn history the inputs are guesses; payback is the more honest early metric.`,
    lesson: "fc03-l04",
  },
  {
    id: "fc03-partner-net-acv",
    name: "Net ACV through a partner",
    tex: String.raw`ACV_{net} = ACV_{list} \, (1 - m_p)`,
    vars: [
      { sym: "ACV_{net}", meaning: "What the vendor receives per year", unit: "EUR/yr" },
      { sym: "ACV_{list}", meaning: "Price paid by the end customer", unit: "EUR/yr" },
      { sym: "m_p", meaning: "Partner margin or discount (often 20 to 40 % for resale)", unit: "-" },
    ],
    explanation: md`Use the net figure in payback and LTV. A partner motion trades margin for lower CAC and access; it only pays if the CAC reduction exceeds the margin given away.`,
    lesson: "fc03-l04",
  },
  // ---------------------------------------------------------------- l05 launch
  {
    id: "fc03-launch-pipeline",
    name: "Pipeline generated by a launch campaign",
    tex: String.raw`\Pi = N \, r_e \, r_m \, r_q \, ACV`,
    vars: [
      { sym: "\\Pi", meaning: "Qualified pipeline value created", unit: "EUR" },
      { sym: "N", meaning: "Contacts reached in ICP accounts", unit: "contacts" },
      { sym: "r_e", meaning: "Engagement (reply or response) rate", unit: "-" },
      { sym: "r_m", meaning: "Meeting rate among responders", unit: "-" },
      { sym: "r_q", meaning: "Share of meetings that become qualified opportunities", unit: "-" },
      { sym: "ACV", meaning: "Expected annual contract value per opportunity", unit: "EUR" },
    ],
    explanation: md`A launch in B2B deep-tech is a pipeline event; this funnel lets you set targets before launch day and diagnose afterwards which rate failed.`,
    lesson: "fc03-l05",
  },
  {
    id: "fc03-expected-bookings",
    name: "Expected bookings from pipeline",
    tex: String.raw`B = \Pi \, w`,
    vars: [
      { sym: "B", meaning: "Expected new ACV booked over the following sales cycle", unit: "EUR" },
      { sym: "\\Pi", meaning: "Qualified pipeline", unit: "EUR" },
      { sym: "w", meaning: "Win rate", unit: "-" },
    ],
    explanation: md`Bookings arrive one sales cycle after the launch, not in the launch month. Illustrative: EUR 1.44 m pipeline at 20 % gives EUR 288k over 6 to 9 months.`,
    lesson: "fc03-l05",
  },
  // ---------------------------------------------------------------- l06 category
  {
    id: "fc03-education-cost",
    name: "Cash cost of a longer, education-heavy sales cycle",
    tex: String.raw`C_{edu} = \Delta t_c \, B_m`,
    vars: [
      { sym: "C_{edu}", meaning: "Extra cash burned before the first customers close", unit: "EUR" },
      { sym: "\\Delta t_c", meaning: "Extra months of sales cycle caused by teaching the problem and creating a budget line", unit: "months" },
      { sym: "B_m", meaning: "Monthly net burn of the company", unit: "EUR/month" },
    ],
    explanation: md`First-order estimate of why category creation is expensive: every month a buyer spends learning that the problem exists is a month of burn. Illustrative: 6 extra months at EUR 120k = EUR 720k.`,
    lesson: "fc03-l06",
  },
];

export default formulas;
