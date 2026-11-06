import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 verifiable requirements
  {
    id: "aw04-rss-uncertainty",
    name: "Combined standard uncertainty (root sum of squares)",
    tex: String.raw`u_c = \sqrt{\sum_{i=1}^{n} u_i^2}, \qquad U = k\,u_c`,
    vars: [
      { sym: "u_c", meaning: "Combined standard uncertainty of the measured quantity", unit: "same unit as the quantity" },
      { sym: "u_i", meaning: "Standard uncertainty of contribution i (transducer, DAQ, repeatability...), already converted to the quantity's unit", unit: "same unit" },
      { sym: "U", meaning: "Expanded uncertainty", unit: "same unit" },
      { sym: "k", meaning: "Coverage factor (k = 2 gives about 95 % coverage for a normal distribution)", unit: "-" },
    ],
    explanation: md`GUM method for uncorrelated inputs. Use it to decide whether a bench can verify a requirement at all: if $U$ is a large share of the tolerance, the test cannot discriminate pass from fail. Rule of thumb: aim for a test uncertainty ratio (tolerance over $U$) of 4 or more.`,
    lesson: "aw04-l01",
  },
  {
    id: "aw04-guard-band",
    name: "Guarded acceptance limit",
    tex: String.raw`A_U = T_U - w, \qquad w = U \;\text{(typical choice)}`,
    vars: [
      { sym: "A_U", meaning: "Upper acceptance limit applied to the measured value", unit: "same unit as the requirement" },
      { sym: "T_U", meaning: "Upper tolerance limit stated in the requirement", unit: "same unit" },
      { sym: "w", meaning: "Guard band width", unit: "same unit" },
      { sym: "U", meaning: "Expanded measurement uncertainty (k = 2)", unit: "same unit" },
    ],
    explanation: md`Decision rule from JCGM 106: with $w = U$ a measured value at the acceptance limit has roughly 2.5 % or less probability of truly exceeding $T_U$ (consumer risk). With $w = 0$ (simple acceptance) a value just under $T_U$ has close to 50 % probability of being non-conforming. The rule must be written in the requirement or the test procedure, or pass and fail are a matter of opinion.`,
    lesson: "aw04-l01",
  },
  // ---------------------------------------------------------------- l02 coverage and suspect links
  {
    id: "aw04-link-coverage",
    name: "Requirements link coverage",
    tex: String.raw`C_{link} = \frac{|R_{v}|}{|R|}`,
    vars: [
      { sym: "C_{link}", meaning: "Share of requirements with at least one verification link", unit: "-" },
      { sym: "|R_{v}|", meaning: "Number of requirements linked to at least one test case (or analysis, inspection, demonstration)", unit: "count" },
      { sym: "|R|", meaning: "Number of requirements in scope (one level, one baseline)", unit: "count" },
    ],
    explanation: md`The number most tools show first. It says a test is planned, not that anything passed. Always report it per level (system, software, hardware) and per baseline.`,
    lesson: "aw04-l02",
  },
  {
    id: "aw04-pass-coverage",
    name: "Verified (passing) coverage on the current baseline",
    tex: String.raw`C_{pass} = \frac{|\{ r \in R : \forall t \in T(r),\ \text{verdict}(t, B) = \text{pass} \}|}{|R|}`,
    vars: [
      { sym: "C_{pass}", meaning: "Share of requirements whose linked verifications all passed on baseline B", unit: "-" },
      { sym: "T(r)", meaning: "Set of verification items linked to requirement r", unit: "set" },
      { sym: "B", meaning: "Current configuration baseline (firmware, hardware revision, model, rig)", unit: "-" },
    ],
    explanation: md`The number that matters at a release gate and in an audit. A requirement with no links counts as not verified. A pass recorded on an older baseline does not count unless an impact analysis shows the change cannot affect it.`,
    lesson: "aw04-l02",
  },
  {
    id: "aw04-orphan-rate",
    name: "Orphan test rate",
    tex: String.raw`O = \frac{|T_{orphan}|}{|T|}`,
    vars: [
      { sym: "O", meaning: "Share of test cases that trace to no requirement", unit: "-" },
      { sym: "|T_{orphan}|", meaning: "Test cases with no upstream requirement link", unit: "count" },
      { sym: "|T|", meaning: "All test cases in scope", unit: "count" },
    ],
    explanation: md`Backward traceability check. Orphans are either missing requirements (the test checks something real that nobody specified) or dead tests that burn rig hours. Both are findings in a regulated audit.`,
    lesson: "aw04-l02",
  },
  {
    id: "aw04-suspect-fanout",
    name: "Suspect set size for a uniform trace tree",
    tex: String.raw`|I| = \sum_{k=1}^{d} f^{k} = \frac{f\,(f^{d}-1)}{f-1}`,
    vars: [
      { sym: "|I|", meaning: "Number of downstream items reachable from one changed item", unit: "count" },
      { sym: "f", meaning: "Average fan-out (children per item per level)", unit: "-" },
      { sym: "d", meaning: "Number of levels below the changed item", unit: "-" },
    ],
    explanation: md`An idealised model of why transitive suspect propagation explodes: fan-out 3 over 3 levels gives 39 items for a single edit. Real graphs are irregular, but the geometric growth is why teams either propagate only one level or clear suspect flags in bulk without review.`,
    lesson: "aw04-l02",
  },
  {
    id: "aw04-retest-cost",
    name: "Cost of a retest set",
    tex: String.raw`C_{rt} = c_h \sum_{t \in S} h_t`,
    vars: [
      { sym: "C_{rt}", meaning: "Cost of rerunning the selected tests", unit: "EUR" },
      { sym: "S", meaning: "Set of tests selected for rerun", unit: "set" },
      { sym: "h_t", meaning: "Rig-hours for test t (setup, run, teardown)", unit: "rig-h" },
      { sym: "c_h", meaning: "Fully loaded cost of one rig-hour", unit: "EUR/rig-h" },
    ],
    explanation: md`Compare against the full regression ($S = T$) to size the value of a precise impact analysis. Rig-hours on scarce rigs are often the binding constraint, more than money.`,
    lesson: "aw04-l02",
  },
  // ---------------------------------------------------------------- l04 regulated domains
  {
    id: "aw04-asil-sum",
    name: "ASIL determination shortcut (ISO 26262-3 table)",
    tex: String.raw`\Sigma = S + E + C:\quad 10 \to \text{D},\; 9 \to \text{C},\; 8 \to \text{B},\; 7 \to \text{A},\; \le 6 \to \text{QM}`,
    vars: [
      { sym: "S", meaning: "Severity class S1 to S3", unit: "-" },
      { sym: "E", meaning: "Probability of exposure class E1 to E4", unit: "-" },
      { sym: "C", meaning: "Controllability class C1 to C3", unit: "-" },
    ],
    explanation: md`A mnemonic that reproduces the ISO 26262-3 risk graph for S1 to S3, E1 to E4, C1 to C3. Any class 0 (S0, E0 or C0) means no ASIL is assigned. Use the table in the standard for the formal assessment.`,
    lesson: "aw04-l04",
  },
  {
    id: "aw04-zero-failure-test",
    name: "Test time to demonstrate a failure rate with zero failures",
    tex: String.raw`T \ge \frac{-\ln(1 - C)}{\lambda}`,
    vars: [
      { sym: "T", meaning: "Accumulated failure-free test time", unit: "h" },
      { sym: "C", meaning: "Required confidence level", unit: "-" },
      { sym: "\\lambda", meaning: "Failure rate to demonstrate (constant rate, exponential model)", unit: "1/h" },
    ],
    explanation: md`From $P(0 \text{ failures}) = e^{-\lambda T} \le 1 - C$. For $\lambda = 10^{-7}$/h (SIL 3 boundary) at 95 % confidence, $T \approx 3.0 \times 10^{7}$ h. Testing alone cannot demonstrate high integrity levels: that is why the standards demand a traced process (analysis, reviews, systematic capability) and not just test hours.`,
    lesson: "aw04-l04",
  },
  // ---------------------------------------------------------------- l05 evidence
  {
    id: "aw04-stale-evidence",
    name: "Stale evidence share (verification debt)",
    tex: String.raw`D = \frac{|\{ r \in R : t_{ev}(r) < t_{chg}(r) \}|}{|R|}`,
    vars: [
      { sym: "D", meaning: "Share of requirements whose latest passing evidence predates the latest change in their trace chain", unit: "-" },
      { sym: "t_{ev}(r)", meaning: "Timestamp of the most recent passing evidence for r", unit: "date" },
      { sym: "t_{chg}(r)", meaning: "Timestamp of the most recent change to r or to any item it depends on (firmware, hardware, model, rig, calibration)", unit: "date" },
    ],
    explanation: md`Only computable if rig, calibration and model changes are traceable items with timestamps, which is exactly what most teams lack. Each stale requirement needs either a rerun or a written impact argument.`,
    lesson: "aw04-l05",
  },
  {
    id: "aw04-impact-score",
    name: "Combined impact score of several changes on one test",
    tex: String.raw`s_t = 1 - \prod_{i \in \Delta} \left(1 - w_{i,t}\right)`,
    vars: [
      { sym: "s_t", meaning: "Probability-like score that test t's outcome is affected by the change set", unit: "0 to 1" },
      { sym: "\\Delta", meaning: "Set of changed artifacts (firmware modules, model weights, rig parts, calibration)", unit: "set" },
      { sym: "w_{i,t}", meaning: "Estimated probability that change i affects test t, assumed independent", unit: "0 to 1" },
    ],
    explanation: md`Noisy-OR combination used by the change-impact widget. Rerun tests with $s_t$ above a threshold. The weights can start from trace links and engineer judgement and be refined from bench history (which past changes actually moved which measurements).`,
    lesson: "aw04-l05",
  },
];

export default formulas;
