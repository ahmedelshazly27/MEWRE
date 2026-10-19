import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  {
    id: "m13-reading-time",
    name: "Reading time of a document",
    tex: md`t = \dfrac{W}{v}`,
    vars: [
      { sym: "t", meaning: "Reading time", unit: "min" },
      { sym: "W", meaning: "Word count", unit: "words" },
      { sym: "v", meaning: "Reading speed (≈200 for dense official text, 250–300 for easy prose)", unit: "words/min" },
    ],
    explanation: md`A design constraint for memos: senior officials give a memo about 2 minutes, so a decision memo should be about 400–450 words (one page). Longer analysis goes into attachments.`,
    lesson: "m13-l02",
  },
  {
    id: "m13-energy-exposure",
    name: "Energy and money exposure of a delay",
    tex: md`X = P \cdot CF \cdot t \cdot \tau`,
    vars: [
      { sym: "X", meaning: "Exposure (e.g. deemed-energy payment or value of lost energy)", unit: "KD" },
      { sym: "P", meaning: "Plant AC capacity affected", unit: "MW" },
      { sym: "CF", meaning: "Capacity factor over the delay period (annual average for a first estimate)", unit: "–" },
      { sym: "t", meaning: "Delay duration", unit: "h" },
      { sym: "\\tau", meaning: "Value per MWh (PPA tariff for deemed energy, or cost of supply for system cost)", unit: "KD/MWh" },
    ],
    explanation: md`Translates a schedule slip into money for a senior audience. Use the PPA tariff and the PPA's deemed-energy rules for contractual exposure; use the avoided cost of thermal generation for the system view. State assumptions; summer capacity factors exceed the annual average.`,
    lesson: "m13-l03",
  },
  {
    id: "m13-weighted-score",
    name: "Weighted KPI score",
    tex: md`S = \sum_{i=1}^{n} w_i \, s_i, \qquad \sum_{i=1}^{n} w_i = 1`,
    vars: [
      { sym: "S", meaning: "Overall weighted score", unit: "same scale as s (e.g. 1–5)" },
      { sym: "w_i", meaning: "Weight of KPI i", unit: "–" },
      { sym: "s_i", meaning: "Score of KPI i", unit: "points" },
    ],
    explanation: md`Used for consultant/contractor scorecards and, in the same form, for technical evaluation of bids. Agree weights and scoring rules before measuring; always inspect the components, because a strong score on one KPI can mask a weak leading indicator.`,
    lesson: "m13-l04",
  },
  {
    id: "m13-meeting-cost",
    name: "Cost of a meeting",
    tex: md`C = N \cdot h \cdot r`,
    vars: [
      { sym: "C", meaning: "Cost per meeting", unit: "KD" },
      { sym: "N", meaning: "Number of attendees", unit: "persons" },
      { sym: "h", meaning: "Duration", unit: "h" },
      { sym: "r", meaning: "Average fully loaded cost per person-hour", unit: "KD/h" },
    ],
    explanation: md`Makes the cost of recurring meetings visible. Multiply by frequency for annual cost. Use it to justify smaller, shorter decision meetings with technical topics moved to focused sub-meetings.`,
    lesson: "m13-l04",
  },
  {
    id: "m13-expected-award",
    name: "Expected award of a disputed claim",
    tex: md`EV = \sum_{k} p_k \, A_k, \qquad \sum_k p_k = 1`,
    vars: [
      { sym: "EV", meaning: "Expected award if the claim goes to the dispute process", unit: "KD" },
      { sym: "p_k", meaning: "Probability of outcome k (from Legal / OE assessment)", unit: "–" },
      { sym: "A_k", meaning: "Award in outcome k", unit: "KD" },
    ],
    explanation: md`The probability-weighted value of the dispute route — the basis of each party's BATNA. Probabilities are judgement, so test sensitivity (e.g. ±10 percentage points). It tells you whether settlement is rational; the settlement figure itself must still be justified by entitlement.`,
    lesson: "m13-l05",
  },
  {
    id: "m13-zopa",
    name: "Reservation prices and ZOPA for a claim",
    tex: md`RP_E = EV + C_E, \quad RP_C = EV - C_C, \quad \text{ZOPA} = [\,RP_C,\ RP_E\,]`,
    vars: [
      { sym: "RP_E", meaning: "Employer's reservation price (maximum it should pay)", unit: "KD" },
      { sym: "RP_C", meaning: "Contractor's reservation price (minimum it should accept)", unit: "KD" },
      { sym: "C_E", meaning: "Employer's cost of the dispute route", unit: "KD" },
      { sym: "C_C", meaning: "Contractor's cost of the dispute route", unit: "KD" },
    ],
    explanation: md`If both parties share the same EV estimate, the ZOPA width is $C_E + C_C$. If the contractor's estimate of EV is much higher than yours, the ZOPA may vanish; then share evidence to align perceptions before negotiating numbers.`,
    lesson: "m13-l05",
  },
  {
    id: "m13-trust-equation",
    name: "Trust equation (Maister)",
    tex: md`T = \dfrac{C + R + I}{S}`,
    vars: [
      { sym: "T", meaning: "Trustworthiness as perceived", unit: "qualitative" },
      { sym: "C", meaning: "Credibility (being right, expertise)", unit: "qualitative" },
      { sym: "R", meaning: "Reliability (doing what you say)", unit: "qualitative" },
      { sym: "I", meaning: "Intimacy (safe to confide in, discretion)", unit: "qualitative" },
      { sym: "S", meaning: "Self-orientation (perceived focus on own interest)", unit: "qualitative" },
    ],
    explanation: md`A diagnostic, not a calculation: identify which component is weak in a relationship with a superior or counterpart. Self-orientation divides everything, so reducing it has the largest effect.`,
    lesson: "m13-l05",
  },
];

export default formulas;
