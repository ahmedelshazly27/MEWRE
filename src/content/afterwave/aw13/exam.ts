import { md, type Question } from "../../schema";

const exam: Question[] = [
  {
    id: "aw13-x1",
    type: "numeric",
    prompt: md`Illustrative: an internal capture and comparison tool cost EUR 90k to build; maintenance is 20 % of build cost per year; key-person risk is EUR 8k per year. A bought tool needs EUR 10k integration and costs EUR 50k per year all-in. After how many years does the internal tool become cheaper in cumulative cost?`,
    answer: 3.33,
    tolerance: { abs: 0.05 },
    unit: "yr",
    explanation: md`Build run cost $0.20 \times 90{,}000 + 8{,}000 = 26{,}000$ per year. $T^{*} = (90{,}000 - 10{,}000)/(50{,}000 - 26{,}000) = 80{,}000/24{,}000 \approx 3.3$ years. Buying is cheaper for a three-year term, but only just: lead with value the tool cannot reach (selection with a rationale), not with cost.`,
    concepts: ["aw13.internal-tool-tco", "aw13.key-person-risk"],
    difficulty: 2,
  },
  {
    id: "aw13-x2",
    type: "numeric",
    prompt: md`Illustrative scores (1 to 5) on ingest, visualisation, private deployment, selection, rationale: Vendor N 5, 5, 4, 1, 2; Afterwave 3, 3, 4, 5, 5. After a discovery call the buyer's weights are 0.15, 0.15, 0.20, 0.30, 0.20. What is Afterwave's score minus Vendor N's?`,
    answer: 1.2,
    tolerance: { abs: 0.01 },
    explanation: md`$U_N = 0.75 + 0.75 + 0.80 + 0.30 + 0.40 = 3.00$. $U_A = 0.45 + 0.45 + 0.80 + 1.50 + 1.00 = 4.20$. Difference $+1.20$. The discovery call moved the weights; no score changed.`,
    concepts: ["aw13.frame-scoring"],
    difficulty: 2,
  },
  {
    id: "aw13-x3",
    type: "numeric",
    prompt: md`Illustrative: migration EUR 25k; 150 procedures cite Ripple in release gates, each needing 5 rig-hours to re-validate at EUR 90 per rig-hour; retraining EUR 12.5k. A rival would save the customer EUR 35k per year. Over how many years does the rival's cumulative saving equal the switching cost?`,
    answer: 3,
    tolerance: { abs: 0.05 },
    unit: "yr",
    explanation: md`$S = 25{,}000 + 150 \times 5 \times 90 + 12{,}500 = 25{,}000 + 67{,}500 + 12{,}500 = \text{EUR } 105{,}000$. $105{,}000 / 35{,}000 = 3$ years. On a longer decision horizon the customer is at risk; deepening embedding (more procedures citing Ripple) raises $S$.`,
    concepts: ["aw13.afterwave-switching-cost", "aw13.workflow-embedding"],
    difficulty: 2,
  },
  {
    id: "aw13-x4",
    type: "decision",
    prompt: md`A partner at a seed fund says: "Nominal raised USD 80 m in March at a USD 1 bn valuation. If change impact matters, they will build it. Why fund you?" What is your best answer?`,
    options: [
      { text: "\"They could build a basic version; it was not advertised as of November. What they do not hold is each lab's dependency model of firmware modules, rigs and tests and its calibration history, and once our rationale is cited in release gates, switching means re-validating on rigs. Our segments, drives, actuators and humanoids, differ from their defence and space base. We will prove it with releases processed per customer and the share of release decisions citing Ripple.\"", score: 1, feedback: "Concedes the threat, names the compounding mechanism, the segment difference and the metric." },
      { text: "\"They are a defence company and cannot do robotics.\"", score: 0.1, feedback: "Unprovable, and Nominal says it is pushing into robotics." },
      { text: "\"We have a data network effect they cannot match.\"", score: 0, feedback: "False: Enclave keeps data private per customer." },
      { text: "\"Our AI is better.\"", score: 0.1, feedback: "Not a mechanism and not testable." },
    ],
    explanation: md`Investors test honesty first. A moat argument built on accumulation and embedding, with metrics, survives the question; claims of incapacity do not.`,
    concepts: ["aw13.feature-vs-moat", "aw13.time-to-copy", "aw13.nominal-profile"],
    difficulty: 3,
  },
  {
    id: "aw13-x5",
    type: "multi",
    prompt: "Which statements match the November 2026 research brief?",
    options: [
      "Nominal's Series B-2 of USD 80 m led by Founders Fund was reported on 5 March 2026 at a USD 1 bn valuation",
      "Sift reported a USD 42 m Series B led by StepStone, with GV its largest investor",
      "Foxglove reported a USD 40 m Series B led by Bessemer in November 2025",
      "Nominal advertises change-impact test selection for physical rigs",
      "NI announced the Nigel assistant on 13 May 2026 with GA later in 2026",
    ],
    answer: [0, 1, 2, 4],
    explanation: md`All are reported facts with dates except the fourth: no source in the research described change impact or test selection for Nominal.`,
    concepts: ["aw13.claim-ledger", "aw13.nominal-profile", "aw13.sift-profile"],
    difficulty: 2,
  },
  {
    id: "aw13-x6",
    type: "mcq",
    prompt: "An illustrative e-drive lab uses NI DAQ and TestStand, Vector CANoe, Jama, Xray and in-house Python scripts, and is evaluating Nominal. Firmware releases arrive every two weeks and trigger a three-day regression. Which product do you lead with, and against which alternative?",
    options: [
      "Lockstep, against Nominal Connect",
      "Enclave, against Nominal Core on-prem",
      "Ripple, against full regression and the scripts",
      "Afterwave's own test platform, against NI hardware",
    ],
    answer: 2,
    explanation: md`Ripple has no advertised vendor competitor, and the pain (three days of rig time every two weeks) is visible. Lockstep and Enclave overlap heavily with Nominal; platforms are a later bet.`,
    concepts: ["aw13.relationship-types", "aw13.change-impact-gap"],
    difficulty: 2,
  },
  {
    id: "aw13-x7",
    type: "decision",
    prompt: md`A prospect's procurement team asks you to fill in a 60-row feature comparison against Sift that they will circulate internally. What do you do?`,
    options: [
      { text: "Fill it in accurately, mark rows outside your scope honestly, and add a short cover page on the decision Ripple owns (which tests to rerun after a change, with rationale) and how it can sit beside Sift.", score: 1, feedback: "You cannot refuse procurement, but you can add the frame. Accuracy protects you because it will be compared with Sift's answers." },
      { text: "Mark every row 'yes' or 'roadmap'.", score: 0, feedback: "Misleading; it will surface in the pilot or the contract." },
      { text: "Refuse because feature lists favour bigger vendors.", score: 0.2, feedback: "True, but refusing removes you from the process." },
      { text: "Add a column saying where Sift is weak.", score: 0.1, feedback: "Disparaging in a document the prospect may share with Sift." },
    ],
    explanation: md`Feature checklists encode the competitor's frame. Answer them honestly and attach the frame where you win.`,
    concepts: ["aw13.fair-comparison", "aw13.frame-scoring", "aw13.coexist-play"],
    difficulty: 2,
  },
  {
    id: "aw13-x8",
    type: "order",
    prompt: "Order the work of building Afterwave's competitive toolkit from scratch.",
    items: [
      "Build the claim ledger with dated, sourced facts",
      "Map the landscape by job and relationship per product",
      "Choose the frame and positioning against the real alternatives",
      "Write battlecards for competitors and substitutes",
      "Track win and no-decision rates per alternative and update the cards",
    ],
    explanation: md`Facts first, then the map, then the frame, then the sales tool, then measurement that feeds back into the cards.`,
    concepts: ["aw13.claim-ledger", "aw13.landscape-layers", "aw13.battlecard", "aw13.win-rate-tracking"],
    difficulty: 1,
  },
  {
    id: "aw13-x9",
    type: "mcq",
    prompt: "After a year (illustrative): against Nominal 4 won, 4 lost, 1 no decision; against 'we built our own' 3 won, 1 lost, 8 no decision. Which battlecard needs the most work?",
    options: [
      "Nominal, because the win rate is only 50 %",
      "'We built our own', because two thirds of those deals end in no decision",
      "Neither; both win rates are acceptable",
      "Nominal, because it is the best-funded competitor",
    ],
    answer: 1,
    explanation: md`Against the internal tool: $w = 3/4 = 0.75$ but $d = 8/12 \approx 0.67$. Against Nominal: $w = 0.5$, $d = 1/9 \approx 0.11$. Most value is lost to the status quo silently, not to Nominal.`,
    concepts: ["aw13.win-rate-tracking"],
    difficulty: 2,
  },
  {
    id: "aw13-x10",
    type: "short",
    prompt: md`**Write the competition section of Afterwave's next accelerator or seed application** (about 250 words). It must: name the adjacent players and substitutes with dated facts and status; state where Afterwave overlaps and where it does not; give the honest moat; and say what you understand about the space that competitors may not.`,
    rubric: [
      "Names Nominal and Sift (and at least one incumbent) with dated facts marked as reported, and names the substitutes (full regression, engineer judgment, internal scripts)",
      "States the overlap honestly (bench capture and on-prem deployment) and the gap (rig-level change impact not advertised as of Nov 2026)",
      "Moat rests on per-customer calibrated models and workflow embedding, with Enclave as table stakes and no data network effect claim",
      "The 'what we understand' point is specific to test labs (e.g. selection is made by judgment; rig configuration and fixture history matter; release gates and safety reviews need a rationale) and draws on the team's validation background",
      "No invented customers, pilots or numbers; tone is factual, not disparaging",
    ],
    modelAnswer: md`**Competition.** Hardware test data has well-funded adjacent players. Nominal (continuous test stack: Core data platform plus Connect bench edge app) reported a USD 80 m Series B-2 at a USD 1 bn valuation on 5 March 2026; Sift (observability for hardware telemetry, Sift Agents preview since September 2026) reported a USD 42 m Series B in March 2026. Incumbents NI, Vector and dSPACE are adding AI assistants and MCP servers to their own tools. Vector's VectorCAST selects tests from code changes; requirements tools flag tests when requirements change.

**Overlap and gap.** Lockstep's bench capture and Enclave's on-prem deployment overlap with Nominal and Sift; we treat them as table stakes. As of November 2026 we found no vendor advertising change impact for physical rigs: after a firmware, model or rig change, which tests to rerun and why. Today labs rerun everything or a senior engineer decides; an industrial study with OMICRON found hardware-dependent system tests mostly selected by tester judgment.

**Moat.** Per-customer dependency models of firmware modules, rigs, fixtures and tests, calibrated release after release, and Ripple's rationale cited in release gates and safety reviews: replacing it means re-validating on rigs. Data stays in each customer's Enclave; we do not claim a data network effect.

**What we understand.** Ismail and Yusuf ran drive-unit and inverter validation at Tesla: the costly decision is not storing data but choosing what to retest, and from 20 January 2027 the EU Machinery Regulation raises the bar for evidence on AI-enabled machinery.`,
    explanation: md`Graded against the rubric. The section should read as written by someone who knows the competitors well and is not afraid of them.`,
    concepts: ["aw13.overlap-gap", "aw13.feature-vs-moat", "aw13.table-stakes", "aw13.change-impact-gap"],
    difficulty: 3,
  },
];

export default exam;
