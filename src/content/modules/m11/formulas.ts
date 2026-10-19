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
];

export default formulas;
