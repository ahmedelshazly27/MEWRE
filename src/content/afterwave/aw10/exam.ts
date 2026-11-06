import { md, type Question } from "../../schema";

const exam: Question[] = [
  {
    id: "aw10-x1",
    type: "numeric",
    prompt: md`Illustrative humanoid actuator rig: a guard interlock contactor has $B_{10D} = 1.3 \times 10^6$. The door opens every 90 s, 20 h per day, 240 days per year. What is the contactor's $T_{10D}$ in years (the replacement interval if shorter than 20 years)?`,
    answer: 6.77,
    tolerance: { rel: 0.01 },
    unit: "years",
    explanation: md`$n_{op} = 240 \times 20 \times 3600/90 = 192{,}000$ per year. $T_{10D} = 1.3 \times 10^6/192{,}000 = 6.77$ years. MTTFd $= 10 \times T_{10D} = 67.7$ years (high). Replace the contactor at about 6.5 years and write that into the information for use.`,
    concepts: ["aw10.mttfd-dc-ccf"],
    difficulty: 2,
  },
  {
    id: "aw10-x2",
    type: "mcq",
    prompt: "A design has two channels, single-fault tolerant, DCavg 92%, MTTFd 25 years per channel, CCF 70 points. Using the ISO 13849-1 simplified table, what PL does it reach?",
    options: ["PL b", "PL c", "PL d", "PL e"],
    answer: 2,
    explanation: md`Category 3 (two channels, single-fault tolerant, CCF at least 65), DC medium (90 to below 99%), MTTFd medium (10 to below 30 years): PL d.`,
    concepts: ["aw10.categories", "aw10.mttfd-dc-ccf"],
    difficulty: 2,
  },
  {
    id: "aw10-x3",
    type: "numeric",
    prompt: md`A battery lab's emergency isolation function is low demand. Unmitigated hazardous event frequency 0.05 per year, tolerable $10^{-5}$ per year, no other layers credited. One channel has $\lambda_{DU} = 2 \times 10^{-7}$ per hour. What is the longest proof-test interval (in hours) at which a 1oo1 design meets the required PFDavg?`,
    answer: 2000,
    tolerance: { rel: 0.01 },
    unit: "h",
    explanation: md`RRF $= 0.05/10^{-5} = 5{,}000$, so PFD at most $2 \times 10^{-4}$ (SIL 3). $\lambda_{DU} T_1/2 \le 2 \times 10^{-4}$ gives $T_1 \le 2{,}000$ h (about 12 weeks). SIL 3 with HFT 0 would also need SFF at least 99% for a type B element, so in practice a 1oo2 architecture is the sensible answer.`,
    concepts: ["aw10.rrf", "aw10.sil-bands", "aw10.architectural-constraints"],
    difficulty: 3,
  },
  {
    id: "aw10-x4",
    type: "decision",
    prompt: md`A drive customer pushes a firmware update that changes the STO filter time. Their test lead wants to rerun only the motor-performance suite because "the safety firmware is certified by the vendor". You are reviewing Ripple's recommendation. What should it say?`,
    options: [
      { text: "Rerun only the performance suite; vendor certification covers STO.", score: 0, feedback: "Certification covers the component as delivered. The change touches STO timing, which affects reaction time, stopping distance and guard positions in this application." },
      { text: "Rerun the STO reaction-time and stop-distance tests, the fault injection cases on the STO channels, and recheck the ISO 13855 distances that depend on stop time, plus the performance suite; log the dependency path for each.", score: 1, feedback: "Correct change impact on safety evidence: direct tests, dependent calculations and a logged rationale." },
      { text: "Rerun everything to be safe.", score: 0.4, feedback: "Safe but wasteful, and it teaches the team that change impact adds no value." },
    ],
    explanation: md`A firmware change to a safety-relevant parameter makes all evidence depending on it stale: the function tests, timing, diagnostics and any calculation using the stopping time.`,
    concepts: ["aw10.living-safety-case", "aw10.separation-distance", "aw10.evidence-credibility"],
    difficulty: 2,
  },
  {
    id: "aw10-x5",
    type: "numeric",
    prompt: md`Collaborative cell: robot moving mass 30 kg, payload 3 kg. Transient contact with the chest is possible: limit 280 N, $k = 25{,}000$ N/m, $m_H = 40$ kg. What is the maximum relative speed in m/s?`,
    answer: 0.5,
    tolerance: { abs: 0.01 },
    unit: "m/s",
    explanation: md`$m_R = 15 + 3 = 18$ kg. $\mu = (1/40 + 1/18)^{-1} = (0.025 + 0.0556)^{-1} = 12.41$ kg. $v = 280/\sqrt{12.41 \times 25{,}000} = 280/557.1 = 0.50$ m/s. Then measure the actual force with a gauge.`,
    concepts: ["aw10.pfl-limits"],
    difficulty: 2,
  },
  {
    id: "aw10-x6",
    type: "multi",
    prompt: "Which statements about standards status in November 2026 are correct?",
    options: [
      "ISO 10218-1 and -2 second editions were published in February 2025",
      "ISO 25785-1 for dynamically stable robots is published and certifiable",
      "ISO/PAS 8800 was published in December 2024",
      "ISO/IEC TR 5469 is an informative technical report",
      "There is a harmonised standard covering ML-based safety functions under the Machinery Regulation",
    ],
    answer: [0, 2, 3],
    explanation: md`ISO 25785-1 is still a draft. No harmonised standard yet covers AI or self-evolving safety functions, so Annex I Part A ML safety components go to notified bodies.`,
    concepts: ["aw10.iso-10218", "aw10.humanoid-standards", "aw10.ai-safety-standards"],
    difficulty: 2,
  },
  {
    id: "aw10-x7",
    type: "numeric",
    prompt: md`An inverter team's FMEDA: safety-related failure rate 400 FIT, single-point plus residual 5 FIT, latent multiple-point 30 FIT. What is the LFM in % (one decimal)?`,
    answer: 92.4,
    tolerance: { abs: 0.1 },
    unit: "%",
    explanation: md`LFM $= 1 - 30/(400 - 5) = 1 - 0.0759 = 92.4\%$. SPFM $= 1 - 5/400 = 98.75\%$: the design meets ASIL C on SPFM and ASIL D on LFM, so it is limited to ASIL C by SPFM.`,
    concepts: ["aw10.hw-metrics"],
    difficulty: 2,
  },
  {
    id: "aw10-x8",
    type: "mcq",
    prompt: "Why is a vision-based person detector's dangerous miss under low sun not addressed by adding a second identical camera and model?",
    options: [
      "Cameras are too expensive",
      "The miss is a systematic performance limitation: both channels share the same insufficiency, so it is a common cause",
      "Redundancy is not allowed in ISO 13849-1",
      "Low sun is a random hardware failure",
    ],
    answer: 1,
    explanation: md`Identical channels share the triggering condition and the model's limitation, so beta is close to 1 for that failure. Diversity (a different sensing principle) or restricting the operating domain helps; duplication does not.`,
    concepts: ["aw10.random-systematic", "aw10.beta-factor", "aw10.sotif"],
    difficulty: 2,
  },
  {
    id: "aw10-x9",
    type: "order",
    prompt: "Order the steps that turn a raw bench run into a solution an assessor can cite in a safety case.",
    items: [
      "Capture signals and actions on one clock with calibration status",
      "Bind configuration identity (firmware, model, parameters, rig revision)",
      "Store with integrity protection and provenance",
      "Link the run to the safety requirement and safety-case goal it supports",
      "Check currency after each change and rerun if stale",
    ],
    explanation: md`Capture, bind configuration, protect, link to claims, keep current. Missing any step breaks relevance, trustworthiness or currency.`,
    concepts: ["aw10.admissible-evidence", "aw10.evidence-credibility"],
    difficulty: 1,
  },
  {
    id: "aw10-x10",
    type: "short",
    prompt: md`A humanoid company (illustrative) plans a factory pilot in the EU in 2027 with an ML-based person-detection function that slows the robot. Write a half-page memo to its CEO covering: which standards apply now and which are drafts, whether the ML function might fall under Machinery Regulation Annex I Part A, what integrity target and evidence you would plan, and how the safety case should be structured.`,
    rubric: [
      "Correctly states status: ISO 10218-2:2025 and ISO 13849-1:2023 published; ISO 25785-1 draft; no harmonised standard for ML safety functions",
      "Identifies that an ML-based safety function with self-evolving behaviour may fall in Annex I Part A (notified body) from 20 January 2027, and flags the legal check",
      "Sets an integrity target with a method (risk graph, PL d typical) and recognises AI limits in IEC 61508-3, proposing a conventional safety monitor or diverse channel",
      "Plans evidence: triggering-condition coverage tests, stop-time and contact measurements, fault injection, regression after every model update, configuration capture",
      "Proposes a GSN structure with product and process legs, explicit context (ODD), and a currency goal",
      "No compliance claims; labels the plan illustrative",
    ],
    modelAnswer: md`**Memo: safety route for the 2027 EU pilot (illustrative).**

**Standards today.** Published: ISO 12100 (risk assessment), ISO 10218-2:2025 (robot applications, collaborative content), ISO 13849-1:2023 and IEC 62061:2021 (integrity), IEC 60204-1 (stop categories), ISO 13855 (distances). Draft: ISO 25785-1 for dynamically stable robots, usable only as a checklist. Informative: ISO/IEC TR 5469 on AI and functional safety. No harmonised standard covers ML-based safety functions.

**Regulation.** From 20 January 2027 the Machinery Regulation applies. If the person-detection function is a safety component using ML with self-evolving behaviour, it falls under Annex I Part A and needs notified-body assessment. Get a legal opinion on whether a frozen (non-learning in the field) model counts; design so that the safety claim does not rest on the ML alone.

**Architecture and target.** Risk graph S2, F2, P1 gives PL d. Because IEC 61508-3 does not recommend AI techniques at SIL 2 and above, make a certified safety laser scanner with speed and separation monitoring the PL d channel, and use the ML detector to slow the robot earlier as an additional, non-credited measure. This keeps the credited function conventional.

**Evidence.** Stop-time and stopping-distance tests across speed and payload; separation distance calculation; scanner fault injection; ML triggering-condition matrix (poses, clothing, lighting) to show it adds benefit without new hazards; regression after every model or firmware update, with configuration hashes captured for every run.

**Safety case.** G1: pilot cell acceptably safe in context (ODD, release, parameter set, hazard log). Strategy over hazards; for collision, product leg (scanner function PL d, ML channel non-interfering) and process leg (ISO 13849-1 software requirements, model change control). Separate currency goal: evidence matches the deployed release. No compliance claim against ISO 25785-1.`,
            explanation: md`The memo must combine standards status, the regulatory route for ML safety components, an architecture that does not rest the credited safety claim on ML alone, and an evidence and safety-case plan.`,
    concepts: ["aw10.humanoid-standards", "aw10.ai-safety-standards", "aw10.safety-case", "aw10.plr-risk-graph"],
    difficulty: 3,
  },
];

export default exam;
