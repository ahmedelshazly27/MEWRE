import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 build, partner or resell
  {
    id: "mz12-gross-margin",
    name: "Gross margin",
    tex: String.raw`GM = \frac{P - C}{P}`,
    vars: [
      { sym: "GM", meaning: "Gross margin", unit: "- (or %)" },
      { sym: "P", meaning: "Price per unit (per MW per year, per robot, per system)", unit: "USD/unit" },
      { sym: "C", meaning: "Cost of goods or service per unit (landed cost, partner fee, local delivery cost)", unit: "USD/unit" },
    ],
    explanation: md`Report it per line, never blended. Illustrative Mizan values: built analytics about 90 %, white-labelled analytics about 40 %, resold robots about 11 %. Margin is not markup: a 40 % markup on cost is a 28.6 % margin.`,
    lesson: "mz12-l01",
  },
  {
    id: "mz12-build-breakeven",
    name: "Build versus partner break-even volume",
    tex: String.raw`Q^* = \frac{F_b - F_p}{u_b - u_p}, \qquad u = P - c`,
    vars: [
      { sym: "Q^*", meaning: "Volume at which building and partnering give equal annual profit", unit: "MW (or units)" },
      { sym: "F_b", meaning: "Annual fixed cost of the build path (team, cloud, maintenance)", unit: "USD/yr" },
      { sym: "F_p", meaning: "Annual fixed cost of the partner path (account management, integration upkeep)", unit: "USD/yr" },
      { sym: "u_b", meaning: "Contribution per unit when Mizan builds", unit: "USD/(unit·yr)" },
      { sym: "u_p", meaning: "Contribution per unit when Mizan partners (after the partner's share and local cost)", unit: "USD/(unit·yr)" },
      { sym: "c", meaning: "Variable cost per unit under the mode", unit: "USD/(unit·yr)" },
    ],
    explanation: md`From $\Pi = uQ - F$ for each mode. Below $Q^*$ partner, above it build. Illustrative: $F_b$ = 400k, $F_p$ = 80k, $u_b$ = 1,400, $u_p$ = 600 USD per MWp per year gives $Q^* = 400$ MWp. Correct for delay and probability of success separately.`,
    lesson: "mz12-l01",
  },
  {
    id: "mz12-delay-cost",
    name: "Cost of arriving late",
    tex: String.raw`L = u\,Q\,t_d`,
    vars: [
      { sym: "L", meaning: "Contribution forgone during the delay", unit: "USD" },
      { sym: "u", meaning: "Contribution per unit per year on the faster path", unit: "USD/(unit·yr)" },
      { sym: "Q", meaning: "Volume that could have been served", unit: "MW (or units)" },
      { sym: "t_d", meaning: "Delay", unit: "yr" },
    ],
    explanation: md`A lower bound: it ignores the lost first reference and evidence, which in a market of few tenders can matter more. Example: $600 \times 300 \times 10/12 =$ USD 150,000.`,
    lesson: "mz12-l01",
  },
  {
    id: "mz12-risk-adjusted-value",
    name: "Risk-adjusted value of a path",
    tex: String.raw`E[V] = p\,V - K`,
    vars: [
      { sym: "E[V]", meaning: "Expected value of the path", unit: "USD" },
      { sym: "p", meaning: "Probability the path delivers (build works on time; partner stays and performs)", unit: "-" },
      { sym: "V", meaning: "Value if it delivers (for example discounted contribution)", unit: "USD" },
      { sym: "K", meaning: "Cost committed regardless of outcome", unit: "USD" },
    ],
    explanation: md`Use it to compare a build with technical risk against a partnership with counterparty risk. Example: a build worth USD 2.0 m with $p = 0.6$ and USD 0.8 m committed has $E[V] =$ USD 0.4 m.`,
    lesson: "mz12-l01",
  },
  // ---------------------------------------------------------------- l02 agency and distribution
  {
    id: "mz12-agent-commission",
    name: "Agent commission",
    tex: String.raw`I = k\,V`,
    vars: [
      { sym: "I", meaning: "Commission income", unit: "USD" },
      { sym: "k", meaning: "Commission rate", unit: "-" },
      { sym: "V", meaning: "Value of the principal's contract with the customer", unit: "USD" },
    ],
    explanation: md`Light on capital and risk, but the principal signs with the customer. In Kuwaiti public contracting, commission agents are reported to be banned under Law 94 of 2026 (confirm with counsel). Example: $0.03 \times 16$ m = USD 480,000.`,
    lesson: "mz12-l02",
  },
  {
    id: "mz12-distributor-gross-profit",
    name: "Distributor gross profit",
    tex: String.raw`GP = Q\,(P_s - P_b - c_l)`,
    vars: [
      { sym: "GP", meaning: "Gross profit on the resale", unit: "USD" },
      { sym: "Q", meaning: "Units sold", unit: "units" },
      { sym: "P_s", meaning: "Selling price per unit", unit: "USD/unit" },
      { sym: "P_b", meaning: "Purchase (landed) price per unit", unit: "USD/unit" },
      { sym: "c_l", meaning: "Local cost per unit (installation, commissioning, warranty reserve)", unit: "USD/unit" },
    ],
    explanation: md`Use landed cost for $P_b$ (lesson 3). The distributor also carries stock, credit and warranty-handling risk, which this formula does not price.`,
    lesson: "mz12-l02",
  },
  {
    id: "mz12-minimum-shortfall",
    name: "Minimum-purchase shortfall payment",
    tex: String.raw`S = r\,\max(0,\ M - A)`,
    vars: [
      { sym: "S", meaning: "Shortfall payment owed", unit: "USD" },
      { sym: "r", meaning: "Charge per unit of shortfall", unit: "USD/unit" },
      { sym: "M", meaning: "Contractual minimum for the period", unit: "units" },
      { sym: "A", meaning: "Actual purchases in the period", unit: "units" },
    ],
    explanation: md`A take-or-pay clause. Example: $800 \times (300 - 180) =$ USD 96,000, almost the whole year's robot gross profit. Negotiate loss of exclusivity as the remedy instead.`,
    lesson: "mz12-l02",
  },
  // ---------------------------------------------------------------- l03 vendors, logistics, payment
  {
    id: "mz12-landed-cost",
    name: "Landed cost",
    tex: String.raw`C_L = \underbrace{\text{FOB} + F + I}_{\text{CIF}} + t_d\,\text{CIF} + K`,
    vars: [
      { sym: "C_L", meaning: "Landed cost delivered to site", unit: "USD" },
      { sym: "\\text{FOB}", meaning: "Free-on-board price at the port of shipment", unit: "USD" },
      { sym: "F", meaning: "Sea freight", unit: "USD" },
      { sym: "I", meaning: "Cargo insurance", unit: "USD" },
      { sym: "t_d", meaning: "Customs duty rate on CIF value (GCC common external tariff commonly 5 %, HS code dependent)", unit: "-" },
      { sym: "K", meaning: "Clearance, port charges and inland transport", unit: "USD" },
    ],
    explanation: md`Price and margin from landed cost, not FOB. Illustrative 20 MWh BESS: FOB USD 2.40 m, freight and insurance 90k, duty 124.5k, local 40k: landed USD 2.6545 m, 10.6 % above FOB. Confirm the HS code and any exemption with a customs broker.`,
    lesson: "mz12-l03",
  },
  {
    id: "mz12-lc-cost",
    name: "Letter of credit cost (simplified)",
    tex: String.raw`C_{LC} = A\,r\,\frac{t}{12} + f`,
    vars: [
      { sym: "C_{LC}", meaning: "Bank cost of the letter of credit", unit: "USD" },
      { sym: "A", meaning: "LC amount", unit: "USD" },
      { sym: "r", meaning: "All-in annual rate (issuance plus any confirmation)", unit: "1/yr" },
      { sym: "t", meaning: "Months the LC is open", unit: "months" },
      { sym: "f", meaning: "Fixed fees (advising, amendment, document handling)", unit: "USD" },
    ],
    explanation: md`Real tariffs split issuance, confirmation and acceptance commissions and set minimums; this approximation is enough to compare options. Example: $1.68\text{ m} \times 0.015 \times 4/12 + 1{,}500 =$ USD 9,900. The cash cover the bank requires usually matters more than the fee.`,
    lesson: "mz12-l03",
  },
  {
    id: "mz12-peak-cash-exposure",
    name: "Peak cash exposure",
    tex: String.raw`E_{\max} = \max_t \Big( \sum_{i:\,t_i \le t} \text{paid}_i - \sum_{j:\,t_j \le t} \text{received}_j \Big)`,
    vars: [
      { sym: "E_{\\max}", meaning: "Largest net cash outflow during the deal", unit: "USD" },
      { sym: "\\text{paid}_i", meaning: "Payment to suppliers, logistics and authorities at time t_i", unit: "USD" },
      { sym: "\\text{received}_j", meaning: "Customer receipt at time t_j", unit: "USD" },
    ],
    explanation: md`Lay out all payments on a timeline and take the running maximum. Illustrative BESS deal: USD 2.35 m peak for USD 345,500 gross profit. If $E_{\max}$ exceeds available cash plus committed credit, restructure the terms or the role.`,
    lesson: "mz12-l03",
  },
  // ---------------------------------------------------------------- l04 analytics partnership
  {
    id: "mz12-rev-share-net",
    name: "Mizan's net under a revenue share",
    tex: String.raw`N = (s\,P - c_l)\,Q - F_p`,
    vars: [
      { sym: "N", meaning: "Mizan's annual net from the partnered line", unit: "USD/yr" },
      { sym: "s", meaning: "Mizan's share of the customer price", unit: "-" },
      { sym: "P", meaning: "Customer price per MW per year", unit: "USD/(MW·yr)" },
      { sym: "c_l", meaning: "Mizan's local cost per MW per year (onboarding, support, integration)", unit: "USD/(MW·yr)" },
      { sym: "Q", meaning: "Contracted capacity", unit: "MW" },
      { sym: "F_p", meaning: "Mizan's annual fixed cost for the line", unit: "USD/yr" },
    ],
    explanation: md`Example: $(0.45 \times 1{,}500 - 200) \times 300 - 80{,}000 =$ USD 62,500 per year; at 30 % the same line loses USD 5,000.`,
    lesson: "mz12-l04",
  },
  {
    id: "mz12-breakeven-share",
    name: "Break-even revenue share",
    tex: String.raw`s^* = \frac{F_p/Q + c_l}{P}`,
    vars: [
      { sym: "s^*", meaning: "Share at which the partnered line breaks even", unit: "-" },
      { sym: "F_p", meaning: "Mizan's annual fixed cost for the line", unit: "USD/yr" },
      { sym: "Q", meaning: "Contracted capacity", unit: "MW" },
      { sym: "c_l", meaning: "Local cost per MW per year", unit: "USD/(MW·yr)" },
      { sym: "P", meaning: "Customer price per MW per year", unit: "USD/(MW·yr)" },
    ],
    explanation: md`Set $N = 0$ in the revenue-share formula. It falls as volume grows, so small early volumes need a higher share or a minimum fee. Example: $(80{,}000/300 + 200)/1{,}500 = 0.311$.`,
    lesson: "mz12-l04",
  },
  // ---------------------------------------------------------------- l05 open research programme
  {
    id: "mz12-open-funnel",
    name: "Open research funnel",
    tex: String.raw`N_{opp} = N_u\, r_1\, r_2\, r_3`,
    vars: [
      { sym: "N_{opp}", meaning: "Pilot conversations per year attributable to the tool", unit: "1/yr" },
      { sym: "N_u", meaning: "Unique users per year (downloads plus active users)", unit: "1/yr" },
      { sym: "r_1", meaning: "Share of users who engage (issue, question, sign-up, conversation)", unit: "-" },
      { sym: "r_2", meaning: "Share of engaged users connected to a buyer", unit: "-" },
      { sym: "r_3", meaning: "Share of buyer-connected users leading to a pilot conversation", unit: "-" },
    ],
    explanation: md`Illustrative: $2{,}000 \times 0.05 \times 0.10 \times 0.20 = 2$. Instrument each step from the first release, or the programme cannot be judged.`,
    lesson: "mz12-l05",
  },
  {
    id: "mz12-cost-per-opportunity",
    name: "Cost per opportunity of a channel",
    tex: String.raw`c_{opp} = \frac{C}{N_{opp}}`,
    vars: [
      { sym: "c_{opp}", meaning: "Cost per pilot conversation", unit: "USD" },
      { sym: "C", meaning: "Annual cost of the channel (people, hosting, events)", unit: "USD/yr" },
      { sym: "N_{opp}", meaning: "Pilot conversations per year from the channel", unit: "1/yr" },
    ],
    explanation: md`Compare channels on the same basis. Illustrative atlas: USD 20,000 per year for 2 conversations, USD 10,000 each, against about USD 25,000 for outbound.`,
    lesson: "mz12-l05",
  },
];

export default formulas;
