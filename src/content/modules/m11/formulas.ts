import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01
  {
    id: "m11-aggregation-test",
    name: "Direct-contracting aggregation (anti-splitting) test",
    tex: String.raw`\sum_{j \in \text{FY},\ \text{same item}} V_j \le L_{\text{direct}}`,
    vars: [
      { sym: "V_j", meaning: "Value of direct order j for the same items/works in the financial year", unit: "KD" },
      { sym: String.raw`L_{\text{direct}}`, meaning: "Direct-contracting limit (KD 1,000,000 per FY under Law 94/2026; previously KD 75,000)", unit: "KD" },
    ],
    explanation: md`If the annual aggregate for the same need exceeds the limit, go through CAPT. Splitting to stay below is a violation.`,
    lesson: "m11-l01",
  },
  // ---------------------------------------------------------------- l02
  {
    id: "m11-guarantee",
    name: "Bid / performance guarantee amount",
    tex: String.raw`G = \beta \cdot P`,
    vars: [
      { sym: "G", meaning: "Guarantee amount", unit: "KD" },
      { sym: String.raw`\beta`, meaning: "Guarantee rate (bid bond set in tender documents; final guarantee reported ≥ 10%)", unit: "–" },
      { sym: "P", meaning: "Bid price or contract value", unit: "KD" },
    ],
    explanation: md`Bid guarantee rate not confirmed for Law 49/2016; final guarantee reported as not less than 10% of contract value.`,
    lesson: "m11-l02",
  },
  {
    id: "m11-financial-score",
    name: "Financial score (inverse-proportional)",
    tex: String.raw`S_{F,i} = 100 \times \frac{P_{\min}}{P_i}`,
    vars: [
      { sym: String.raw`S_{F,i}`, meaning: "Financial score of bid i", unit: "points" },
      { sym: String.raw`P_{\min}`, meaning: "Lowest evaluated price", unit: "KD" },
      { sym: "P_i", meaning: "Evaluated price of bid i", unit: "KD" },
    ],
    explanation: md`Standard in QCBS (World Bank practice). The lowest bid scores 100.`,
    lesson: "m11-l02",
  },
  {
    id: "m11-qcbs",
    name: "QCBS combined score",
    tex: String.raw`S_i = w_T\,S_{T,i} + w_F\,S_{F,i}, \qquad w_T + w_F = 1`,
    vars: [
      { sym: "S_i", meaning: "Combined score", unit: "points" },
      { sym: "w_T, w_F", meaning: "Technical and financial weights", unit: "–" },
      { sym: String.raw`S_{T,i}`, meaning: "Technical score", unit: "points" },
    ],
    explanation: md`Weights fixed in the tender documents before opening. Consultancy often 70/30 to 90/10; changing weights can flip the winner.`,
    lesson: "m11-l02",
  },
  {
    id: "m11-levelized-tariff",
    name: "Levelized tariff",
    tex: String.raw`T_{\text{lev}} = \frac{\sum_{t=1}^{N} T_t\,E_t\,(1+r)^{-t}}{\sum_{t=1}^{N} E_t\,(1+r)^{-t}}, \qquad T_t = T_1 (1+g)^{t-1}`,
    vars: [
      { sym: String.raw`T_{\text{lev}}`, meaning: "Levelized tariff", unit: "fils/kWh" },
      { sym: "T_t", meaning: "Tariff in year t", unit: "fils/kWh" },
      { sym: "E_t", meaning: "Energy in year t", unit: "MWh" },
      { sym: "r", meaning: "Evaluation discount rate (fixed in RFP)", unit: "–" },
      { sym: "g", meaning: "Tariff escalation rate", unit: "–/yr" },
      { sym: "N", meaning: "PPA term", unit: "yr" },
    ],
    explanation: md`At r = 7%, N = 30: 3.90 fils escalating 1.5%/yr levelizes to ≈ 4.54 fils, above a flat 4.20.`,
    lesson: "m11-l02",
  },
  // ---------------------------------------------------------------- l03
  {
    id: "m11-share-split",
    name: "PPP project-company shareholding identity",
    tex: String.raw`s_{\text{IPO}} + s_{\text{pub}} + s_{\text{priv}} = 1, \quad s_{\text{IPO}} = 0.50,\ 0.06 \le s_{\text{pub}} \le 0.24,\ s_{\text{priv}} \ge 0.26`,
    vars: [
      { sym: String.raw`s_{\text{IPO}}`, meaning: "Share offered to Kuwaiti citizens by IPO", unit: "–" },
      { sym: String.raw`s_{\text{pub}}`, meaning: "Share held by public entities", unit: "–" },
      { sym: String.raw`s_{\text{priv}}`, meaning: "Share held by the private investor", unit: "–" },
    ],
    explanation: md`Per a secondary legal guide for PPP projects above KD 60 m (verify against Law 116/2014). IWPP practice: private 0.40, public 0.10, IPO 0.50.`,
    lesson: "m11-l03",
  },
  {
    id: "m11-ppa-payment",
    name: "PPA energy payment with deemed energy",
    tex: String.raw`R_y = T_y\,\left(E_{\text{del},y} + E_{\text{deemed},y}\right)`,
    vars: [
      { sym: "R_y", meaning: "Offtaker payment in year y", unit: "KWD" },
      { sym: "T_y", meaning: "Tariff in year y", unit: "KWD/kWh" },
      { sym: String.raw`E_{\text{del},y}`, meaning: "Energy delivered at the metering point", unit: "kWh" },
      { sym: String.raw`E_{\text{deemed},y}`, meaning: "Energy not delivered due to offtaker-side events, certified by the independent engineer", unit: "kWh" },
    ],
    explanation: md`Deemed energy is usually estimated from measured irradiance and the plant model, after grace periods/allowances. Generic structure — confirm against the Kuwaiti PPA.`,
    lesson: "m11-l03",
  },
  // ---------------------------------------------------------------- l04
  {
    id: "m11-price-preference",
    name: "National product price-preference test",
    tex: String.raw`P_{\text{nat}} \le (1 + \pi)\,P_{\min}`,
    vars: [
      { sym: String.raw`P_{\text{nat}}`, meaning: "Price of the bid offering national products", unit: "KD" },
      { sym: String.raw`P_{\min}`, meaning: "Lowest compliant non-national bid", unit: "KD" },
      { sym: String.raw`\pi`, meaning: "Preference rate (reported 10%, 15% or 20% — unverified)", unit: "–" },
    ],
    explanation: md`Also used for the reported Law 94/2026 SME margin (π = 10% vs the lowest accepted bid), which cannot be combined with the Art. 62 product priority.`,
    lesson: "m11-l04",
  },
  {
    id: "m11-local-content",
    name: "Local-content share",
    tex: String.raw`LC = \frac{V_{\text{local}}}{V_{\text{base}}} \ge 0.30`,
    vars: [
      { sym: "LC", meaning: "Local-content share", unit: "–" },
      { sym: String.raw`V_{\text{local}}`, meaning: "Value from Industrial Guide suppliers or locally registered subcontractors", unit: "KD" },
      { sym: String.raw`V_{\text{base}}`, meaning: "Denominator defined in the contract (product purchases, subcontracted works, or contract value)", unit: "KD" },
    ],
    explanation: md`Law 94/2026 (reported): ≥30% of products from the PAI Industrial Guide and ≥30% of works subcontracted locally. Define the denominator explicitly in the contract.`,
    lesson: "m11-l04",
  },
  // ---------------------------------------------------------------- l05
  {
    id: "m11-pert",
    name: "PERT three-point estimate for approval steps",
    tex: String.raw`t_e = \frac{a + 4m + b}{6}, \quad \sigma = \frac{b - a}{6}, \quad P80 \approx \sum t_e + 0.84\sqrt{\sum \sigma^2}`,
    vars: [
      { sym: "a, m, b", meaning: "Optimistic, most likely, pessimistic durations", unit: "weeks" },
      { sym: "t_e", meaning: "Expected duration of a step", unit: "weeks" },
      { sym: String.raw`\sigma`, meaning: "Standard deviation of a step", unit: "weeks" },
    ],
    explanation: md`Sequential, independent steps: means and variances add. Include a return cycle in b. Attack the largest variance contributor first.`,
    lesson: "m11-l05",
  },
];

export default formulas;
