import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw10-l01",
  title: "Functional safety principles: hazard, risk, safety functions and how things fail",
  summary:
    "The vocabulary and the mechanism under every safety standard your customers work to: hazard versus risk, the ISO 12100 risk assessment loop and three-step risk reduction, what a safety function is, the risk reduction it must deliver, and the split between random hardware failures (quantified with failure rates) and systematic failures (controlled by process).",
  minutes: 60,
  objectives: [
    "Distinguish hazard, hazardous situation, hazardous event, harm and risk, and use them correctly with a test engineer",
    "Walk through the ISO 12100 risk assessment and the three-step method of risk reduction for a test rig",
    "Define a safety function by its trigger, its safe state and its reaction time, and compute the risk reduction factor it must deliver",
    "Split a failure rate into safe, dangerous detected and dangerous undetected parts and compute diagnostic coverage and safe failure fraction",
    "Explain why random and systematic failures are treated differently and what that means for software and AI",
  ],
  concepts: [
    { id: "aw10.hazard-risk", name: "Hazard, harm and risk", description: "A hazard is a potential source of harm; risk is the combination of the severity of that harm and the probability that it occurs. Standards reduce risk, they never remove hazards by declaration.", competency: "aw-safety", related: ["m08.pi-matrix"] },
    { id: "aw10.risk-reduction", name: "Three-step risk reduction", description: "ISO 12100 order of measures: inherently safe design first, then safeguarding and complementary protective measures (where functional safety lives), then information for use. Each step is used only for the risk the previous one could not remove.", competency: "aw-safety", related: ["aw10.hazard-risk"] },
    { id: "aw10.safety-function", name: "Safety function", description: "A function of the control system whose failure can immediately increase risk: it detects a condition and brings or keeps the machine in a safe state within a defined time.", competency: "aw-safety", related: ["aw10.risk-reduction"] },
    { id: "aw10.rrf", name: "Risk reduction factor", description: "How much a safety function must reduce the frequency of a hazardous event: the unprotected frequency divided by the tolerable frequency. It sets the integrity target (SIL or PL).", competency: "aw-safety", related: ["aw10.safety-function"] },
    { id: "aw10.random-systematic", name: "Random vs systematic failures", description: "Random hardware failures occur at a statistically predictable rate from physical degradation; systematic failures are built in by specification, design or software errors and appear deterministically under certain conditions. Only the first can be quantified with failure rates.", competency: "aw-safety", related: ["aw10.failure-modes"] },
    { id: "aw10.failure-modes", name: "Safe, dangerous detected and dangerous undetected failures", description: "A component failure rate splits into safe failures, dangerous failures caught by diagnostics and dangerous failures that stay hidden. Diagnostic coverage and safe failure fraction are ratios of these parts.", competency: "aw-safety", related: ["aw10.random-systematic", "m12.failure-modes"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From hazard to safety function",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every test team Afterwave sells to lives inside a safety process. The humanoid team argues about stopping a robot that falls when you cut its power; the drive team proves that safe torque off works after every firmware change; the battery lab keeps a chamber from turning a thermal runaway into a building fire. When Ismail or Yusuf say "that is a systematic failure, more testing will not find it" or "the DC is too low for Cat 3", you need to follow and push back. This lesson is the vocabulary and the mechanism underneath all the standards in the rest of the module, and it is where Afterwave's long-term position (safety evidence infrastructure) starts to make technical sense.`,
        },
        {
          kind: "md",
          md: md`### Hazard is not risk

The words are used loosely in sales calls and precisely in standards. ISO 12100 (safety of machinery, risk assessment) and IEC 61508 define a chain:

| Term | Meaning | Test-rig example |
|---|---|---|
| **Hazard** | Potential source of harm | A dynamometer shaft spinning at 6,000 rpm |
| **Hazardous situation** | A person is exposed to the hazard | Operator inside the cell to change a sample |
| **Hazardous event** | The event that can cause harm | Shaft starts while the operator's hand is near the coupling |
| **Harm** | Physical injury or damage to health | Crushed or amputated fingers |
| **Risk** | Combination of the **severity** of harm and the **probability** of it occurring | Severe, and likely if nothing stops the drive |

Probability of harm itself has parts: how often and how long people are exposed, the probability of the hazardous event, and whether the person can avoid or limit the harm. Every risk graph in the next lesson is just a structured way of scoring those parts.

A hazard never disappears because a document says so. What changes is the risk, and you can only change it in two ways: make the harm less severe (lower speed, lower energy, less mass) or make it less likely (keep people out, stop the machine before contact, detect the fault).

### The ISO 12100 loop and the three-step method

Risk assessment is iterative: determine the machine's limits (use, space, time, foreseeable misuse), identify hazards, estimate risk, evaluate whether it is acceptable, and if not reduce it and go round again. The order of risk reduction is fixed and it matters:

1. **Inherently safe design**: remove or reduce the hazard itself. A lower-voltage bus, a smaller test motor, torque-limited couplings, rounded edges, no pinch points.
2. **Safeguarding and complementary protective measures**: fixed guards, interlocked doors, light curtains, emergency stop. Interlocked guards and protective devices depend on the control system working: this is where **functional safety** lives.
3. **Information for use**: warnings, training, procedures, personal protective equipment. The weakest measure, used only for the residual risk.

Designers are not allowed to skip to step 3 because it is cheap, and an assessor will ask why a hazard was not designed out before it was guarded.`,
        },
        {
          kind: "flow",
          title: "ISO 12100 risk assessment and reduction loop",
          steps: [
            { label: "Limits of the machine", detail: "Intended use, foreseeable misuse, space, lifecycle phases, who is exposed" },
            { label: "Hazard identification", detail: "Mechanical, electrical, thermal, energy stored, software and AI behaviour, every lifecycle phase" },
            { label: "Risk estimation", detail: "Severity of harm; exposure, probability of the event, possibility of avoidance" },
            { label: "Risk evaluation", detail: "Is the risk adequately reduced? If yes, document and stop" },
            { label: "Risk reduction", detail: "Step 1 inherent design, step 2 safeguarding and safety functions, step 3 information for use; then reassess" },
          ],
          caption: "The loop repeats after every risk reduction measure, because measures can introduce new hazards (a guard creates a pinch point, a safety function adds a nuisance trip that tempts operators to bypass it).",
        },
        {
          kind: "md",
          md: md`### What a safety function is

A **safety function** is a function of the control system whose failure can immediately increase risk. A good specification answers four questions:

- **Trigger**: what is detected (door open, light curtain broken, over-temperature, speed above limit, force above limit).
- **Safe state**: what the machine does (remove torque, stop with controlled deceleration, isolate the battery string, vent the chamber).
- **Reaction time**: how fast, end to end, from trigger to safe state. A safety function that is correct but too slow is a failed safety function.
- **Integrity**: how reliably it must work, expressed as a Performance Level (ISO 13849-1) or a Safety Integrity Level (IEC 61508, IEC 62061).

Example: "When the guard door is opened, the dyno drive shall reach safe torque off (STO) within 100 ms, PLr d." Each phrase is testable, and each is something a test team will have to retest after a firmware change to the drive.

### Risk reduction factor

The integrity target comes from how much risk the safety function has to remove:

$$\text{RRF} = \frac{F_{np}}{F_t}$$

where $F_{np}$ is the frequency of the hazardous event with no protection and $F_t$ is the tolerable frequency. For a function demanded rarely (low demand) the required probability of failure on demand is $\text{PFD} \le 1/\text{RRF}$. IEC 61508 bands this: RRF above 10 to 100 is SIL 1, above 100 to 1,000 SIL 2, above 1,000 to 10,000 SIL 3. Most machinery functions are demanded often (every door opening), so machinery standards use a failure rate per hour instead; lesson 2 has the numbers.`,
        },
        { kind: "equation", formula: "aw10-rrf" },
        {
          kind: "md",
          md: md`### Two kinds of failure

**Random hardware failures** come from physics: wear, fatigue, electromigration, corrosion, contact welding. Over a large population they occur at a predictable rate $\lambda$, usually given in failures per hour or in FIT (1 FIT $= 10^{-9}$ per hour). You can quantify them, add them up and design against them with redundancy and diagnostics.

**Systematic failures** are built in: a wrong requirement, a design error, a software bug, a wrong parameter, a sensor that is blind in a condition nobody specified. They are deterministic: the same conditions trigger them every time, in every unit. Redundancy with identical channels does not help (both channels have the same bug), and failure rates are meaningless for them. Standards control systematic failures through **process**: requirements discipline, reviews, coding rules, verification, validation, change control, competence and independent assessment. IEC 61508 expresses this as **systematic capability** (SC 1 to 4).

This split is the most important idea in the module for an AI-heavy product. A neural network that misclassifies a person in a certain light does it deterministically: it is a systematic (or, in SOTIF language, a performance-limitation) problem, not a random one. That is why AI in safety functions is hard to certify and why evidence about **coverage of conditions** matters more than hours of operation.

### Splitting a failure rate

For random failures each component's rate is split by effect:

$$\lambda = \lambda_S + \lambda_{DD} + \lambda_{DU}$$

safe failures (the function trips or stays safe), dangerous detected failures (diagnostics catch them and force a safe state) and dangerous undetected failures (hidden until a demand or a proof test). Two ratios follow:`,
        },
        { kind: "equation", formula: "aw10-dc" },
        { kind: "equation", formula: "aw10-sff" },
        {
          kind: "chart",
          chart: "line",
          title: "The bathtub curve: why random failure rates are quoted for the useful-life period",
          xKey: "year",
          xLabel: "Years in service (illustrative component)",
          yLabel: "Failure rate (FIT, illustrative)",
          series: [{ key: "fit", label: "Failure rate" }],
          data: [
            { year: 0, fit: 900 },
            { year: 0.5, fit: 350 },
            { year: 1, fit: 200 },
            { year: 3, fit: 150 },
            { year: 6, fit: 150 },
            { year: 10, fit: 155 },
            { year: 14, fit: 180 },
            { year: 17, fit: 320 },
            { year: 20, fit: 700 },
          ],
          caption: "Early failures (removed by burn-in and screening), a flat useful-life period where a constant rate is a fair model, then wear-out. Functional safety maths assumes the flat part; wear-out is handled by a mission time (often 20 years) and by replacing wearing parts such as contactors before their T10d.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing a safety function and reading a failure-rate split",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Battery test chamber: how good must the over-temperature trip be?",
          given: md`Illustrative numbers for a customer's battery abuse-test chamber (the kind of lab Afterwave targets). A cell under test enters thermal runaway about **0.1 times per year**. An existing independent layer (gas detection with operator response) fails about **1 time in 10**. The lab's tolerable frequency for a chamber fire spreading to the building is **$2 \times 10^{-5}$ per year**. An automatic over-temperature trip that isolates the cell and starts suppression is proposed. It is demanded rarely, so treat it as low demand.`,
          steps: [
            { md: md`Frequency with existing layers but no trip: $F_{np} = 0.1 \times 0.1 = 0.01$ per year.` },
            { md: md`Required risk reduction: $\text{RRF} = F_{np}/F_t = 0.01 / (2 \times 10^{-5}) = 500$.` },
            { md: md`Required probability of failure on demand: $\text{PFD} \le 1/500 = 2 \times 10^{-3}$.` },
            { md: md`Band: RRF 500 lies in the SIL 2 range (RRF above 100 up to 1,000; PFD from $10^{-3}$ to below $10^{-2}$). The trip must be designed and verified to **SIL 2**.` },
            { md: md`Sensitivity: if the lab drops the operator layer (no credit), $F_{np} = 0.1$ per year, RRF $= 5{,}000$ and the target moves to **SIL 3**, a much more expensive design. Who claims credit for which layer is a negotiated, documented decision, not arithmetic.` },
          ],
          result: md`The trip needs SIL 2 (PFD at most $2 \times 10^{-3}$). The calculation is only as good as the frequencies fed into it, which is exactly where measured test and field data become valuable.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A speed sensor's failure-rate split",
          given: md`A motor speed sensor used in a safely-limited-speed function has $\lambda = 2{,}000$ FIT ($2 \times 10^{-6}$ per hour). FMEDA (failure modes, effects and diagnostic analysis) says 50% of failures are safe. The drive's plausibility diagnostics detect 90% of the dangerous failures.`,
          steps: [
            { md: md`Safe part: $\lambda_S = 0.5 \times 2{,}000 = 1{,}000$ FIT. Dangerous part: $\lambda_D = 1{,}000$ FIT.` },
            { md: md`Dangerous detected: $\lambda_{DD} = 0.9 \times 1{,}000 = 900$ FIT; dangerous undetected $\lambda_{DU} = 100$ FIT.` },
            {
              md: md`Diagnostic coverage $\text{DC} = \lambda_{DD}/\lambda_D = 900/1{,}000 = 90\%$.`,
              hidden: true,
              check: { prompt: "Diagnostic coverage", answer: 90, unit: "%", tolerance: { abs: 0.5 } },
            },
            {
              md: md`Safe failure fraction $\text{SFF} = (\lambda_S + \lambda_{DD})/\lambda = (1{,}000 + 900)/2{,}000 = 95\%$.`,
              hidden: true,
              check: { prompt: "Safe failure fraction", answer: 95, unit: "%", tolerance: { abs: 0.5 } },
            },
          ],
          result: md`$\lambda_{DU} = 100$ FIT $= 10^{-7}$ per hour is the number that drives the safety calculation: dangerous and invisible until something goes wrong. Improving diagnostics moves FIT from DU to DD, which is why diagnostic tests (and testing those diagnostics) are central to safety evidence.`,
        },
        {
          kind: "question",
          question: {
            id: "aw10-l01-p1",
            type: "numeric",
            prompt: md`Illustrative: an unguarded hazardous event on a powertrain test cell would occur 0.4 times per year. The tolerable frequency is $10^{-4}$ per year. What risk reduction factor must the safety function deliver?`,
            answer: 4000,
            tolerance: { rel: 0.01 },
            unit: "",
            explanation: md`$\text{RRF} = 0.4/10^{-4} = 4{,}000$, which in low-demand terms is SIL 3 (RRF above 1,000 to 10,000). In practice a test cell door interlock is high demand and would be sized with a risk graph and PFH instead, but the logic is the same: the gap between what would happen and what is tolerable sets the integrity.`,
            concepts: ["aw10.rrf"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How safety work is really done in a test organisation",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **Machine builder or rig integrator**: owns the risk assessment for the rig as a machine (in the EU, as manufacturer under the Machinery Directive and, from 20 January 2027, the Machinery Regulation 2023/1230). Module aw11 covers the legal side.
- **Functional safety engineer**: writes the safety requirements specification (SRS), designs the safety-related parts of the control system, calculates PL or SIL (usually with tools such as SISTEMA from the German IFA, or vendor tools), and writes the validation plan.
- **Test engineer**: verifies each safety function (trigger, reaction time, safe state), runs fault injection to prove diagnostics, and repeats this after every relevant change. This is the person who will use Afterwave.
- **Independent assessor or notified body**: reviews the argument and evidence. For higher integrity, independence from the design team is required.

### Documents you will see on a customer's shared drive

Risk assessment (often a spreadsheet per hazard), safety requirements specification, safety plan, FMEDA and reliability data, PL or SIL calculation reports, validation plan and report, proof-test procedures, change log with impact analysis, and the technical file.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Guarding as a substitute for design**: a light curtain added to a rig whose energy could have been reduced, then muted by operators who find it annoying.
- **The safety function nobody re-verified**: a drive firmware update changes STO timing; the guard test is not rerun because "nothing in safety changed". This is a change-impact failure and is the single most direct link between functional safety and Ripple.
- **Treating software bugs as random**: quoting a software failure rate, or claiming redundancy with two copies of the same code.
- **Frequencies pulled from the air**: RRF and risk graph inputs chosen to make the answer cheaper, with no data behind them.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Product angle",
          md: md`Afterwave does not certify anything and should never imply it does. What it can do is make the verification part of the safety lifecycle cheaper and more trustworthy: every safety-function test captured with time-synced rig signals and on-screen actions, tied to the exact firmware and rig configuration, and flagged for rerun when something it depends on changes. Say it that way to a safety engineer and you will be taken seriously.`,
        },
        {
          kind: "ask",
          title: "Questions to ask a customer's safety lead in discovery",
          items: [
            "Which safety functions does your rig or product have, and what PL or SIL does each carry?",
            "When firmware, a model or a rig component changes, how do you decide which safety-function tests to rerun, and who signs that off?",
            "How do you show an assessor that a validation test ran on the configuration you claim (firmware hash, calibration state, wiring revision)?",
            "Where do your failure-rate and demand-frequency inputs come from: handbooks, vendor data or your own test and field data?",
            "Which of your failures last year were systematic (specification, software) and which were random hardware?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw10-l01-p2",
            type: "short",
            prompt: md`Produce a one-page **safety function sheet** for one safety function on a test rig Afterwave's customers would run (for example a humanoid actuator end-of-line test station or a drive inverter test bench). Include: hazard and hazardous event, trigger, safe state, reaction time requirement, required integrity (state your assumption and how you would determine it), the main random and systematic failure modes you would worry about, and the tests that verify it, including what must be rerun after a firmware change.`,
            rubric: [
              "Names a concrete hazard and hazardous event, distinguished from the harm and the risk",
              "Specifies trigger, safe state and an end-to-end reaction time with a number and unit",
              "States a PL or SIL target with the method or assumptions behind it (risk graph or RRF), labelled as illustrative",
              "Lists at least one random hardware failure mode and at least one systematic failure mode, correctly classified",
              "Defines verification tests (function test, timing, fault injection for diagnostics) and the change triggers that require rerunning them",
              "Does not claim Afterwave certifies anything; positions captured evidence as support for the customer's own process",
            ],
            modelAnswer: md`**Safety function SF-01: guard door interlock with STO, actuator end-of-line test station (illustrative).**

Hazard: rotating load motor and coupling (up to 3,000 rpm, 80 Nm). Hazardous situation: operator inside the cell to load an actuator. Hazardous event: drive starts or keeps running with the door open. Harm: crushing or entanglement of hand and arm.

Trigger: guard door opened (two independent interlock switches, one NO and one NC). Safe state: both the device under test and load drives in safe torque off, motor brake applied. Reaction time: STO active within 50 ms of door opening; with the 0.4 s rundown, door locking (guard locking) is needed until speed is below 10 rpm.

Integrity: PLr d from the ISO 13849-1 risk graph: S2 (serious, irreversible), F2 (loading every 2 minutes), P1 (start is not instantaneous, operator may withdraw). To be confirmed in the rig's risk assessment.

Random failures: interlock switch contacts welding, contactor welding, drive STO channel failure, brake wear. Systematic failures: wrong safety PLC parameter after an edit, door switch mounted so it can be defeated, STO wiring swapped during a rig rebuild, drive firmware changing STO timing.

Verification: functional test of every door at commissioning and weekly; reaction-time measurement on the DAQ (door signal to STO feedback to motor current zero); fault injection (short one channel, open one channel, simulate contactor weld) to prove diagnostics detect each fault; guard-locking test at speed.

Rerun triggers: drive firmware or parameter change, safety PLC program change, any wiring or rig mechanical change near the door, replacement of a switch or contactor. Captured runs are stored with firmware hash, PLC checksum and rig configuration, so the validation report can point at exact evidence. The customer's safety engineer signs off; the evidence system only makes the evidence complete and traceable.`,
            explanation: md`A good sheet makes the safety function testable: each element (trigger, safe state, timing, integrity) maps to a verification test, and the rerun triggers show where change impact meets functional safety.`,
            concepts: ["aw10.safety-function", "aw10.random-systematic", "aw10.risk-reduction"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor with no engineering background why running a robot for another million hours does not prove its perception-based safety stop is safe.",
          keyPoints: [
            "Random hardware failures occur at a rate and can be estimated from hours; systematic failures are built in and triggered by specific conditions",
            "A perception error under a specific condition happens every time that condition occurs, in every unit",
            "Hours that never include the triggering condition give no evidence about it; coverage of conditions matters, not volume",
            "Systematic failures are controlled by process: requirements, design review, verification of edge cases, change control",
          ],
        },
        { kind: "xref", to: "m08.pi-matrix", note: "The ordinal probability-impact matrix from project risk management looks similar but is a triage tool, not a safety risk estimate with a required integrity." },
        { kind: "sources", refs: ["aw10-r1", "aw10-r4", "aw10-r12"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw10-l01-q1",
      type: "mcq",
      prompt: "Which statement uses the terms correctly?",
      options: [
        "The light curtain removed the hazard of the rotating shaft",
        "The rotating shaft is a hazard; the light curtain reduces the risk by lowering the probability of harm",
        "The risk of the shaft is its maximum speed",
        "Training operators is the first step of risk reduction because it is cheapest",
      ],
      answer: 1,
      explanation: md`A hazard remains a hazard; protective measures change risk by reducing severity or probability. Speed is a factor in severity, not the risk. Information for use is the last step of the ISO 12100 method, not the first.`,
      concepts: ["aw10.hazard-risk", "aw10.risk-reduction"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw10-l01-q2",
      type: "order",
      prompt: "Put the ISO 12100 three-step method of risk reduction in the order it must be applied.",
      items: [
        "Inherently safe design measures",
        "Safeguarding and complementary protective measures",
        "Information for use",
      ],
      explanation: md`Design first, guard second, warn last. Each step deals only with the risk left by the previous one. Functional safety (interlocks, protective devices) sits in step 2.`,
      concepts: ["aw10.risk-reduction"],
      difficulty: 1,
    },
    {
      id: "aw10-l01-q3",
      type: "numeric",
      prompt: md`A component has $\lambda = 500$ FIT, of which 40% are safe failures. Diagnostics detect 95% of the dangerous failures. What is $\lambda_{DU}$ in FIT?`,
      answer: 15,
      tolerance: { abs: 0.1 },
      unit: "FIT",
      explanation: md`$\lambda_D = 0.6 \times 500 = 300$ FIT. $\lambda_{DU} = (1 - 0.95) \times 300 = 15$ FIT $= 1.5 \times 10^{-8}$ per hour.`,
      concepts: ["aw10.failure-modes"],
      difficulty: 2,
    },
    {
      id: "aw10-l01-q4",
      type: "multi",
      prompt: "Which of these are systematic failures?",
      options: [
        "A safety PLC parameter typed wrongly during commissioning",
        "A contactor's contacts weld after 1.2 million cycles",
        "A vision model fails to detect people wearing high-visibility vests in low sun",
        "Two redundant software channels running identical code both mishandle the same integer overflow",
        "A capacitor in a sensor fails open after years of thermal cycling",
      ],
      answer: [0, 2, 3],
      explanation: md`Parameter errors, specification or perception gaps and software bugs are built in and reproducible: systematic. Contact welding and capacitor ageing are physical degradation: random hardware failures. Identical redundant code shares the bug, so redundancy does not help.`,
      concepts: ["aw10.random-systematic"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "aw10-l01-q5",
      type: "mcq",
      prompt: "Which element is missing from: \"If the door opens, the drive stops. PL d.\"",
      options: ["The trigger", "The required integrity", "The reaction time and the defined safe state (which stop, which drives)", "The hazard"],
      answer: 2,
      explanation: md`"Stops" is not a safe state definition (STO? controlled stop then STO? which axes?), and there is no time requirement. A safety function without a reaction time cannot be verified.`,
      concepts: ["aw10.safety-function"],
      difficulty: 1,
    },
    {
      id: "aw10-l01-q6",
      type: "decision",
      prompt: md`A humanoid customer says: "Our drives have an MTBF of 200,000 hours, so the robot is safe." What is the best response?`,
      options: [
        { text: "Agree; 200,000 hours is excellent reliability.", score: 0, feedback: "Reliability is not safety. MTBF counts all failures, including safe ones, and says nothing about systematic failures or what happens when a failure occurs." },
        { text: "Ask which failures are dangerous, how many are detected by diagnostics, what the safe state is (a falling humanoid has no simple one) and how systematic failures in firmware and control are controlled.", score: 1, feedback: "Right: the safety questions are the dangerous undetected rate, diagnostics, the safe state and systematic capability." },
        { text: "Ask for more test hours to raise confidence in the MTBF.", score: 0.3, feedback: "More hours tighten a random failure estimate but do not address dangerous versus safe failures or systematic failures." },
      ],
      explanation: md`Safety concerns dangerous failures and their consequences, not total failures. A very reliable drive can still have a dangerous undetected failure mode, a firmware defect, or no safe state when power is removed.`,
      concepts: ["aw10.failure-modes", "aw10.random-systematic"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw10-l01-f1", front: "Hazard vs risk", back: "Hazard: a potential source of harm. Risk: combination of severity of harm and probability of its occurrence.", concepts: ["aw10.hazard-risk"] },
    { id: "aw10-l01-f2", front: "ISO 12100 three-step method", back: "1 inherently safe design, 2 safeguarding and complementary protective measures, 3 information for use.", concepts: ["aw10.risk-reduction"] },
    { id: "aw10-l01-f3", front: "Four parts of a safety function specification", back: "Trigger, safe state, reaction time, required integrity (PL or SIL).", concepts: ["aw10.safety-function"] },
    { id: "aw10-l01-f4", front: "Risk reduction factor", back: md`$\text{RRF} = F_{np}/F_t$; low demand $\text{PFD} \le 1/\text{RRF}$. RRF 100 to 1,000 means SIL 2.`, concepts: ["aw10.rrf"] },
    { id: "aw10-l01-f5", front: "Random vs systematic failure", back: "Random: physical degradation, predictable rate, quantified. Systematic: built in by specification, design or software, deterministic, controlled by process.", concepts: ["aw10.random-systematic"] },
    { id: "aw10-l01-f6", front: "Diagnostic coverage and SFF", back: md`$\text{DC} = \lambda_{DD}/\lambda_D$; $\text{SFF} = (\lambda_S + \lambda_{DD})/\lambda$.`, concepts: ["aw10.failure-modes"] },
    { id: "aw10-l01-f7", front: "1 FIT", back: md`One failure per $10^9$ device hours ($10^{-9}$ per hour).`, concepts: ["aw10.failure-modes"] },
  ],
};

export default lesson;
