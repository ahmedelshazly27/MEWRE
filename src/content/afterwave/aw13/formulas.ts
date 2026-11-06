import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l02 frames
  {
    id: "aw13-frame-score",
    name: "Buyer evaluation score under a frame of reference",
    tex: String.raw`U_j = \sum_{k=1}^{n} \omega_k \, q_{jk}, \qquad \sum_{k=1}^{n} \omega_k = 1`,
    vars: [
      { sym: "U_j", meaning: "Overall score the buyer gives vendor j", unit: "points (same scale as q)" },
      { sym: "\\omega_k", meaning: "Weight the buyer puts on criterion k (set by the category frame)", unit: "-" },
      { sym: "q_{jk}", meaning: "Vendor j's perceived quality on criterion k", unit: "points (e.g. 1 to 5)" },
      { sym: "n", meaning: "Number of evaluation criteria", unit: "-" },
    ],
    explanation: md`A simple model of how a technical evaluator ranks vendors. You can raise $q_{jk}$ by building product, or change the $\omega_k$ by changing the frame the buyer uses. The second is cheaper and is what positioning against Nominal and Sift is about. Weights and scores in this module are illustrative teaching numbers, not product evaluations.`,
    lesson: "aw13-l02",
  },
  // ---------------------------------------------------------------- l03 build vs buy
  {
    id: "aw13-tco-build",
    name: "Total cost of an internal tool over T years",
    tex: String.raw`TCO_{build}(T) = C_0 + T\,(\mu\, C_0 + R)`,
    vars: [
      { sym: "TCO_{build}", meaning: "Cumulative cost of building and keeping the internal tool", unit: "EUR" },
      { sym: "C_0", meaning: "Initial build cost (engineer time, fully loaded)", unit: "EUR" },
      { sym: "\\mu", meaning: "Annual maintenance as a fraction of build cost (new rigs, new DAQ firmware, OS updates, bug fixes)", unit: "1/yr" },
      { sym: "R", meaning: "Expected annual key-person loss (see aw13-key-person)", unit: "EUR/yr" },
      { sym: "T", meaning: "Horizon", unit: "yr" },
    ],
    explanation: md`The script looks free because the engineer is already on payroll. Writing it as a cost exposes maintenance and key-person risk. Rig-specific test tooling tends to have high $\mu$ because every new rig, sensor or DAQ driver version touches it. Opportunity cost (what that engineer would otherwise test) is left out here; add it when the buyer accepts it.`,
    lesson: "aw13-l03",
  },
  {
    id: "aw13-tco-buy",
    name: "Total cost of a bought tool over T years",
    tex: String.raw`TCO_{buy}(T) = C_{int} + T\,(P + A)`,
    vars: [
      { sym: "TCO_{buy}", meaning: "Cumulative cost of buying and running the vendor tool", unit: "EUR" },
      { sym: "C_{int}", meaning: "One-off integration, security review and onboarding cost on the customer side", unit: "EUR" },
      { sym: "P", meaning: "Annual subscription or licence price", unit: "EUR/yr" },
      { sym: "A", meaning: "Annual internal administration (owner time, upgrades, vendor management)", unit: "EUR/yr" },
    ],
    explanation: md`Set equal to $TCO_{build}$ to find the break-even horizon $T^{*} = (C_0 - C_{int})/(P + A - \mu C_0 - R)$ when the bought tool has the higher annual cost. If buying has the higher run rate, the internal tool always wins on cost in the long run: you must win on value the script cannot deliver.`,
    lesson: "aw13-l03",
  },
  {
    id: "aw13-key-person",
    name: "Expected annual key-person loss",
    tex: String.raw`R = p_{leave}\, L`,
    vars: [
      { sym: "R", meaning: "Expected annual loss from the tool's author leaving or moving", unit: "EUR/yr" },
      { sym: "p_{leave}", meaning: "Probability per year that the author leaves or is reassigned", unit: "1/yr" },
      { sym: "L", meaning: "Cost if it happens: reverse-engineering or rebuilding, plus delayed releases", unit: "EUR" },
    ],
    explanation: md`Internal test tools usually have one author. If that engineer has a 15 to 25 % chance per year of leaving or changing role (illustrative), even a modest rebuild cost produces a real annual risk number the head of validation recognises.`,
    lesson: "aw13-l03",
  },
  {
    id: "aw13-break-even",
    name: "Build vs buy break-even horizon",
    tex: String.raw`T^{*} = \frac{C_0 - C_{int}}{(P + A) - (\mu C_0 + R)}`,
    vars: [
      { sym: "T^{*}", meaning: "Years after which the internal tool becomes cheaper in cumulative cost", unit: "yr" },
      { sym: "C_0,\\ C_{int}", meaning: "Upfront build cost and upfront integration cost", unit: "EUR" },
      { sym: "P + A", meaning: "Annual run cost of buying", unit: "EUR/yr" },
      { sym: "\\mu C_0 + R", meaning: "Annual run cost of the internal tool", unit: "EUR/yr" },
    ],
    explanation: md`Valid when the bought tool has the higher annual run cost and the lower upfront cost (the usual case). Before $T^{*}$ buying is cheaper; after it building is cheaper. A short $T^{*}$ means cost is not your argument.`,
    lesson: "aw13-l03",
  },
  // ---------------------------------------------------------------- l04 switching cost
  {
    id: "aw13-switching-cost",
    name: "Customer switching cost for a test data and change-impact stack",
    tex: String.raw`S = C_{mig} + N_p\, h_p\, c_h + C_{train}`,
    vars: [
      { sym: "S", meaning: "One-off cost for the customer to move to an alternative", unit: "EUR" },
      { sym: "C_{mig}", meaning: "Data and integration migration (export, re-ingest, re-link traceability)", unit: "EUR" },
      { sym: "N_p", meaning: "Test procedures that must be re-validated on the new tool", unit: "-" },
      { sym: "h_p", meaning: "Rig-hours to re-validate one procedure", unit: "rig-h" },
      { sym: "c_h", meaning: "Fully loaded cost of a rig-hour", unit: "EUR/rig-h" },
      { sym: "C_{train}", meaning: "Retraining and process change", unit: "EUR" },
    ],
    explanation: md`The customer stays while the total price advantage of a rival over the horizon is below $S$: $\Delta p \cdot T < S$. The re-validation term is specific to test infrastructure: when a release-gate decision depends on the tool, switching means proving the new tool gives the same answers, on rigs. Theory of switching costs: see Founder Core fc06.`,
    lesson: "aw13-l04",
  },
  // ---------------------------------------------------------------- l05 win rate
  {
    id: "aw13-win-rate",
    name: "Competitive win rate and no-decision rate",
    tex: String.raw`w_c = \frac{W_c}{W_c + L_c}, \qquad d_c = \frac{N_c}{W_c + L_c + N_c}`,
    vars: [
      { sym: "w_c", meaning: "Win rate against competitor or alternative c (decided deals only)", unit: "-" },
      { sym: "d_c", meaning: "Share of opportunities with c that ended in no decision", unit: "-" },
      { sym: "W_c,\\ L_c", meaning: "Deals won and lost where c was the main alternative", unit: "deals" },
      { sym: "N_c", meaning: "Deals that stalled or ended with no purchase", unit: "deals" },
    ],
    explanation: md`Track both. A high win rate against Nominal with a high no-decision rate against "we built our own" means your real opponent is the status quo, and the battlecard to improve is the internal-tool one. Small numbers early: report counts, not only percentages.`,
    lesson: "aw13-l05",
  },
];

export default formulas;
