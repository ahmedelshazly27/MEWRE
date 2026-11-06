import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw04-l01",
  title: "Requirements engineering basics: levels, verifiability and EARS",
  summary:
    "What a requirement is in a hardware program, how stakeholder, system, software and hardware requirements decompose, what makes one verifiable on a bench (a measurable criterion, a condition, a method and an uncertainty budget), and how the EARS patterns force structure onto natural-language requirements.",
  minutes: 70,
  objectives: [
    "Place a requirement at the right level (stakeholder, system, software, hardware) and explain derivation and allocation",
    "Test a requirement against the quality characteristics of ISO/IEC/IEEE 29148, and rewrite a bad one",
    "Write requirements in the five EARS patterns, including unwanted-behaviour requirements for faults",
    "Decide whether a bench can verify a requirement by computing the expanded uncertainty and a guarded acceptance limit",
    "Name the four verification methods (inspection, analysis, demonstration, test) and choose one per requirement",
  ],
  concepts: [
    { id: "aw04.requirement-levels", name: "Requirement levels and decomposition", description: "Stakeholder needs become system requirements, which are allocated to subsystems and derived into software and hardware requirements; each level is verified at the matching integration level.", competency: "aw-impact" },
    { id: "aw04.verifiable-requirement", name: "Verifiable requirement", description: "A singular, unambiguous statement with a measurable criterion, stated conditions, a verification method and a tolerance that the available measurement can actually resolve.", competency: "aw-impact", related: ["fc02.acceptance-criteria"] },
    { id: "aw04.ears", name: "EARS patterns", description: "Easy Approach to Requirements Syntax: ubiquitous, event-driven (When), state-driven (While), unwanted behaviour (If...then) and optional feature (Where) templates for natural-language requirements.", competency: "aw-impact", related: ["aw04.verifiable-requirement"] },
    { id: "aw04.verification-methods", name: "Verification methods (IADT)", description: "Inspection, analysis, demonstration and test: the four ways a requirement can be shown to be met; the method is chosen when the requirement is written.", competency: "aw-impact", related: ["aw04.verifiable-requirement"] },
    { id: "aw04.guard-band", name: "Guard band and decision rule", description: "Acceptance limit moved inside the tolerance by the measurement uncertainty, so a pass means the true value is very likely within the requirement.", competency: "aw-impact", related: ["aw04.verifiable-requirement"] },
    { id: "aw04.verification-vs-validation", name: "Verification vs validation", description: "Verification: did we build it right (meets the specified requirement)? Validation: did we build the right thing (meets the stakeholder need in its real use)?", competency: "aw-impact", related: ["aw04.requirement-levels"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From a stakeholder need to a bench-verifiable requirement",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Ripple answers "which tests do I rerun after this change, and why". The "why" is a chain: change, affected function, affected requirement, test that verifies it. If the requirements are vague ("the actuator shall be robust"), there is nothing to trace and nothing for Ripple to reason over. Every Afterwave buyer lives inside a requirements system, and the test engineers you sell to are judged on whether each requirement has passing evidence. You need to read their requirements the way they do, spot the ones no bench can verify, and speak EARS and verification methods fluently in a discovery call.`,
        },
        {
          kind: "md",
          md: md`### What a requirement is

A **requirement** is a statement that a system must satisfy, written so that someone other than the author can decide, by an agreed method, whether it is met. Requirements are not designs: "the inverter shall limit phase current to 120 A peak" is a requirement; "use a 3-shunt current measurement" is a design decision (sometimes imposed as a **constraint**).

### The levels

| Level | Who writes it | Example (illustrative humanoid knee actuator) | Verified at |
|---|---|---|---|
| **Stakeholder** (user, customer, regulator) | Product, customers, safety | "The robot shall walk on stairs while carrying 10 kg." | Validation in the real use context |
| **System** | Systems engineering | "The knee joint shall deliver 150 Nm peak for 2 s at 0 to 60 rpm." | System test on a full robot or a joint rig |
| **Subsystem / component** (allocated) | Subsystem lead | "The actuator shall deliver 150 Nm at the output flange with the 1:50 gearbox." | Actuator test on a dyno |
| **Software** (derived) | Firmware team | "The current controller shall reach 90 % of a step command within 0.5 ms." | Software-in-the-loop, HIL, then bench |
| **Hardware** (derived) | Electronics team | "The gate driver shall turn off the inverter within 2 µs of an overcurrent signal." | Board-level test |

Two operations connect the levels:
- **Allocation:** a system requirement is assigned to the subsystem that will meet it (the 150 Nm goes to the knee actuator).
- **Derivation:** new, lower-level requirements are created because of a design choice (choosing field-oriented control creates the current-loop bandwidth requirement). **Derived requirements** must still trace up, to the requirement or design decision that caused them, or nobody knows why they exist when someone wants to change them.

### What makes a requirement good

ISO/IEC/IEEE 29148 lists characteristics for an individual requirement: **necessary, appropriate, unambiguous, complete, singular, feasible, verifiable, correct, conforming**, and for the set: complete, consistent, feasible, comprehensible, able to be validated. For a test engineer three of them dominate:

1. **Singular:** one requirement, one "shall". "The actuator shall deliver 150 Nm and shall not exceed 80 °C winding temperature" is two requirements with two tests and two possible verdicts.
2. **Unambiguous:** one reading. Words that fail: robust, fast, user-friendly, minimal, sufficient, as appropriate, and/or, etc.
3. **Verifiable:** a finite, cost-effective method exists to show it is met. "Shall never fail" is not verifiable; "shall have a failure rate below $10^{-6}$ per hour, demonstrated by analysis per IEC 61508" is (Lesson 4 shows why test alone cannot do it).

### The four verification methods (IADT)

| Method | What it is | Example |
|---|---|---|
| **Inspection** | Look, measure dimensions, read documents | Connector type, label present, firmware version string |
| **Analysis** | Calculation, simulation, model | Thermal model of winding temperature, FMEDA failure rate |
| **Demonstration** | Operate and observe, qualitative pass/fail | E-stop button stops motion; UI shows a fault code |
| **Test** | Operate under controlled conditions and measure against a quantitative criterion | Torque vs speed sweep on a dyno with DAQ |

Choose the method **when the requirement is written**. That choice decides which rig, sensors and hours the program needs.`,
        },
        {
          kind: "md",
          md: md`### EARS: structure for natural language

**EARS** (Easy Approach to Requirements Syntax, Mavin et al., Rolls-Royce, 2009) constrains a requirement to a fixed clause order: optional preconditions, an optional trigger, the system name, "shall", the response. Five patterns:

| Pattern | Template | Bench example (illustrative) |
|---|---|---|
| **Ubiquitous** | The [system] shall [response]. | The actuator shall have a mass of no more than 2.4 kg. |
| **Event-driven** | When [trigger], the [system] shall [response]. | When the safe torque off input is de-asserted, the drive shall remove gate signals within 10 ms. |
| **State-driven** | While [state], the [system] shall [response]. | While in position-hold mode, the joint shall hold position within 0.05° under a 50 Nm external load. |
| **Unwanted behaviour** | If [unwanted condition], then the [system] shall [response]. | If the encoder signal is lost for more than 1 ms, then the drive shall enter safe torque off within 5 ms and report fault code E21. |
| **Optional feature** | Where [feature is included], the [system] shall [response]. | Where the brake option is fitted, the joint shall hold 120 Nm with power removed. |
| **Complex** | Combinations: While..., when..., the [system] shall... | While at rated speed, when a 100 % torque step is commanded, the drive shall reach 90 % of command within 2 ms. |

Why it works: the **trigger** and **state** clauses become the test's preconditions and stimulus; the **response** becomes the measured quantity and criterion. An EARS requirement is half a test procedure already. The **unwanted-behaviour** pattern is the one most teams under-use: fault reactions are where safety requirements live, and they are the tests most often skipped after a firmware change.

### Verifiable means the bench can resolve it

A requirement "torque ripple shall be at most 2.0 % of rated torque" is only verifiable if the measurement chain can tell 1.9 % from 2.1 %. Combine the uncertainty contributions (transducer, DAQ, repeatability) by root sum of squares:`,
        },
        { kind: "equation", formula: "aw04-rss-uncertainty" },
        {
          kind: "md",
          md: md`Then choose a **decision rule**. With **simple acceptance** a reading just under the limit passes although the true value may well be above it. With **guarded acceptance** the acceptance limit moves inside the tolerance by a guard band, usually $w = U$:`,
        },
        { kind: "equation", formula: "aw04-guard-band" },
        {
          kind: "md",
          md: md`A useful sanity number is the **test uncertainty ratio** $TUR = (T_U - T_L)/(2U)$ for a two-sided tolerance, or tolerance over $U$ for a one-sided limit. Below about 4, the bench cannot discriminate well, and the requirement, the rig or the decision rule must change. The decision rule belongs in the requirement or the test specification, not in the head of whoever reads the plot.`,
        },
        {
          kind: "flow",
          title: "Requirement decomposition and verification levels",
          steps: [
            { label: "Stakeholder need", detail: "Carry 10 kg up stairs; regulator: safe stop on fault" },
            { label: "System requirement", detail: "Knee joint 150 Nm peak for 2 s; STO on encoder loss" },
            { label: "Allocated subsystem requirement", detail: "Actuator 150 Nm at flange; drive fault reaction" },
            { label: "Derived SW and HW requirements", detail: "Current-loop rise time 0.5 ms; gate-off within 2 µs" },
            { label: "Verification method and criterion", detail: "Test on dyno, acceptance limit with guard band" },
          ],
          caption: "Each arrow is a trace link. Verification climbs back up the same chain: board test, firmware test, actuator test, system test, validation.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Rewriting and budgeting a torque-ripple requirement",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "From a vague sentence to an EARS requirement with a decision rule",
          given: md`Original text in an illustrative actuator spec: "The actuator should run smoothly with low torque ripple at all speeds." Rated torque 50 Nm. The team's intent (from the design review): peak-to-peak torque ripple at most 2.0 % of rated torque at rated speed 3,000 rpm motor side and rated torque. The bench has a torque transducer, a DAQ and a known repeatability. Expanded uncertainty of the ripple measurement $U = 0.24$ percentage points ($k = 2$).`,
          steps: [
            { md: md`**Diagnose.** "Should" is not binding; "smoothly" and "low" are ambiguous; "at all speeds" is unverifiable as stated (infinite conditions); no metric (RMS or peak-to-peak?), no method.` },
            { md: md`**Rewrite (EARS, state-driven):** "While operating at 3,000 rpm motor speed and 50 Nm output torque, the actuator shall produce a peak-to-peak torque ripple of no more than 2.0 % of rated torque, measured over 10 electrical revolutions. Verification: test." Speeds other than rated become separate requirements or a stated sweep with its own limits.` },
            { md: md`**Check resolution:** one-sided tolerance 2.0 % against $U = 0.24$ %: ratio $2.0/0.24 = 8.3$. The bench can verify it.` },
            { md: md`**Decision rule (guarded acceptance, $w = U$):** $A_U = 2.0 - 0.24 = 1.76$ %. Pass if measured ripple $\le 1.76$ %; fail if $> 2.24$ % (above $T_U + U$, certainly non-conforming); in between the result is **conditional** and goes to engineering review or more measurement.` },
            { md: md`**Apply:** a measured 1.85 % passes under simple acceptance but is conditional under guarded acceptance. Which rule applies is a contract and safety decision, so write it into the test specification.` },
          ],
          result: md`A verifiable requirement has a condition (state), a metric with units, a limit, a method and a decision rule. The rewrite also produced a test procedure skeleton: set 3,000 rpm and 50 Nm, record torque over 10 electrical revolutions, compute peak-to-peak, compare with 1.76 %.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Build the uncertainty budget yourself",
          given: md`Standard uncertainty contributions to the ripple measurement, all expressed in percentage points of rated torque: transducer 0.08, DAQ (ADC resolution, anti-alias filter, sampling) 0.06, repeatability over 5 runs 0.05. Uncorrelated. Coverage factor $k = 2$. Tolerance $T_U = 2.0$ %.`,
          steps: [
            { md: md`$u_c = \sqrt{0.08^2 + 0.06^2 + 0.05^2} = \sqrt{0.0064 + 0.0036 + 0.0025} = \sqrt{0.0125}$` },
            { md: md`$u_c = 0.112$ %, so $U = 2 u_c = 0.224$ %.`, hidden: true, check: { prompt: "Expanded uncertainty U (percentage points)", answer: 0.224, unit: "%", tolerance: { abs: 0.003 } } },
            { md: md`$A_U = T_U - U = 2.0 - 0.224 = 1.776$ %.`, hidden: true, check: { prompt: "Guarded acceptance limit (percent of rated torque)", answer: 1.776, unit: "%", tolerance: { abs: 0.005 } } },
          ],
          result: md`The transducer dominates (0.0064 of 0.0125 in variance, about half). If the program needs a wider pass window, a better transducer buys more than averaging more runs.`,
        },
        {
          kind: "question",
          question: {
            id: "aw04-l01-p1",
            type: "numeric",
            prompt: md`A requirement says winding temperature shall not exceed 120 °C. The thermocouple chain has standard uncertainties of 1.0 °C (sensor), 0.6 °C (cold-junction compensation) and 0.8 °C (placement repeatability). With $k = 2$ and $w = U$, what is the guarded acceptance limit? (°C)`,
            answer: 117.2,
            tolerance: { abs: 0.1 },
            unit: "°C",
            explanation: md`$u_c = \sqrt{1.0^2 + 0.6^2 + 0.8^2} = \sqrt{2.0} = 1.414$ °C; $U = 2.83$ °C; $A_U = 120 - 2.83 = 117.17 \approx 117.2$ °C. A reading of 118 °C is conditional, not a pass.`,
            concepts: ["aw04.guard-band"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Requirements in real test organisations",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **Systems engineering** owns stakeholder and system requirements, the architecture and allocation. In smaller robotics companies this is often one or two people, or nobody, and requirements live in a slide deck.
- **Firmware and electronics leads** write derived software and hardware requirements; in automotive supply chains these arrive from the OEM as a customer specification (often hundreds of pages, exchanged as ReqIF, Lesson 3).
- **Test and validation** (the Afterwave buyer) writes test specifications against the requirements and pushes back on unverifiable ones. A good validation lead reviews requirements before the design freezes.
- **Safety** owns safety requirements with integrity attributes (ASIL, SIL, PL) and insists on full traceability (Lesson 4).

### What typically goes wrong

- Requirements written after the tests ("reverse-engineered" from what the rig measures), so the tests always pass and the gaps are invisible.
- Requirements as test procedures ("the operator shall apply 50 Nm and read the display"), mixing what with how.
- No conditions: a torque limit without temperature, voltage or speed is unverifiable or untestable on a real rig.
- Fault reactions missing: lots of "shall deliver", few "if...then shall".
- Tolerances finer than the bench can measure, discovered at the first test review.

For how to write product specs for engineers in general (PRDs, acceptance criteria, non-goals), see the Founder Core lesson below; this lesson adds the hardware and verification detail.`,
        },
        { kind: "xref", to: "fc02-l04", note: "Writing PRDs and specs for engineers: acceptance criteria and non-goals for Afterwave's own product requirements." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "The 'shall be tested' trap",
          md: md`"The drive shall be tested for EMC" is a requirement on the project, not on the product. It cannot fail. The product requirement is "the drive shall meet the emission limits of [standard, class]", verified by test. Audit any spec you are given for sentences that cannot fail: they inflate coverage numbers without protecting anything.`,
        },
        {
          kind: "checklist",
          title: "Five-minute requirement review (use it on a prospect's sample spec)",
          items: [
            "One 'shall' per statement; 'should', 'may' and 'will' are flagged",
            "Conditions stated (state, operating point, environment) in EARS while/when/if clauses",
            "Quantity, unit, limit and metric definition (RMS or peak, averaging window)",
            "Verification method chosen (I, A, D or T) and the rig that can run it named",
            "Tolerance at least about 4 times the expanded measurement uncertainty, or a decision rule written",
            "Unique ID, parent link (why it exists) and owner",
            "Fault reactions covered with if...then requirements",
          ],
        },
        {
          kind: "ask",
          title: "Discovery questions about requirements (to a head of validation)",
          items: [
            "Where do your requirements live today, and who is allowed to change them?",
            "What share of your test cases link to a requirement ID, and how do you know?",
            "When a requirement changes, how does the test team find out?",
            "Who decides pass, fail or conditional when a measurement lands near the limit?",
            "Which requirements are verified by analysis rather than test, and what happens to that analysis when the firmware changes?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw04-l01-p2",
            type: "short",
            prompt: md`**Produce a requirement set for an Afterwave pilot demo rig.** Imagine a single-joint actuator test rig used to show Lockstep and Ripple to a prospect (illustrative, not a real customer). Write six requirements for the actuator under test, at least one in each EARS pattern except optional feature (so: ubiquitous, event-driven, state-driven, unwanted behaviour, complex) plus one of your choice. For each give: ID, EARS text, verification method (I, A, D or T), the measured quantity and how you would set the acceptance limit given measurement uncertainty. Then name one parent (system or stakeholder) requirement each traces to.`,
            rubric: [
              "All required EARS patterns appear and are syntactically correct (trigger and state clauses before 'the system shall')",
              "Each requirement is singular, uses 'shall', and has a quantity, unit and limit with stated conditions",
              "Verification method is appropriate (test for quantitative performance, inspection or analysis where test is impractical)",
              "At least one unwanted-behaviour requirement covers a fault reaction with a timing limit",
              "Acceptance limits account for measurement uncertainty (guard band or explicit decision rule) for at least the quantitative requirements",
              "Each requirement names a plausible parent, showing upward traceability; no invented customer facts",
            ],
            modelAnswer: md`Parents: **SYS-01** joint delivers task torque; **SYS-02** joint reaches a safe state on any detected fault; **SYS-03** joint follows motion commands with stated accuracy.

| ID | EARS text | Method | Quantity and acceptance | Parent |
|---|---|---|---|---|
| ACT-01 (ubiquitous) | The actuator shall have a backdrive torque of no more than 1.5 Nm at the output flange. | T | Static torque to start rotation; $U = 0.1$ Nm, pass at 1.4 Nm or below | SYS-03 |
| ACT-02 (event) | When the safe torque off input is de-asserted, the actuator drive shall remove gate signals within 10 ms. | T | Time from STO edge to gate-off on one DAQ clock; $U = 0.2$ ms, pass at 9.8 ms or below | SYS-02 |
| ACT-03 (state) | While in position-hold mode with a 50 Nm external load, the actuator shall hold output position within 0.05°. | T | Encoder deviation over 60 s; $U = 0.005°$, pass at 0.045° | SYS-03 |
| ACT-04 (unwanted) | If the motor encoder signal is lost for more than 1 ms, then the actuator drive shall enter safe torque off within 5 ms and report fault E21. | T | Fault injection by disconnecting encoder; time to STO $U = 0.2$ ms, pass at 4.8 ms; fault code by inspection of log | SYS-02 |
| ACT-05 (complex) | While at 3,000 rpm motor speed, when a 100 % torque step is commanded, the actuator shall reach 90 % of commanded torque within 2 ms. | T | Rise time from command timestamp to 90 % torque, command and torque on one clock; $U = 0.1$ ms, pass at 1.9 ms | SYS-01 |
| ACT-06 (ubiquitous) | The actuator shall have a peak-to-peak torque ripple of no more than 2.0 % of rated torque at rated speed and torque. | T | Ripple over 10 electrical revolutions; $U = 0.24$ %, pass at 1.76 % | SYS-03 |

Timing requirements (ACT-02, 04, 05) need the command or fault event and the physical response on one clock, which is exactly what Lockstep records.`,
            explanation: md`Graded against the rubric. The test of quality: could a test engineer who has never met you write the procedure from your text alone, and would two engineers reach the same verdict on the same data?`,
            concepts: ["aw04.ears", "aw04.verifiable-requirement", "aw04.guard-band", "aw04.verification-methods"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a robotics founder why 'the robot shall be safe and responsive' is not a requirement, and what you would replace it with.",
          keyPoints: [
            "A requirement must be decidable by an agreed method by someone other than the author",
            "'Safe' and 'responsive' are ambiguous and not singular; there is no quantity, condition or limit",
            "Replace with EARS statements: event-driven or unwanted-behaviour requirements for fault reactions with timing limits, state-driven ones for performance",
            "Each needs a verification method and an acceptance limit the bench can resolve given measurement uncertainty",
            "Each must trace up to a stakeholder need or hazard so it can be changed safely later",
          ],
        },
        { kind: "sources", refs: ["aw04-r1", "aw04-r2", "aw04-r3", "aw04-r5"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw04-l01-q1",
      type: "mcq",
      prompt: "Which requirement is written in the EARS unwanted-behaviour pattern?",
      options: [
        "While in torque mode, the drive shall limit current to 120 A.",
        "When the start button is pressed, the drive shall enable within 50 ms.",
        "If the DC-link voltage exceeds 60 V, then the drive shall open the input contactor within 20 ms.",
        "Where the brake option is fitted, the joint shall hold 120 Nm unpowered.",
      ],
      answer: 2,
      explanation: md`Unwanted behaviour uses **If [unwanted condition], then the [system] shall [response]**. The others are state-driven (While), event-driven (When) and optional feature (Where).`,
      concepts: ["aw04.ears"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw04-l01-q2",
      type: "multi",
      prompt: "Which problems does this requirement have? 'The actuator should be robust and shall deliver high torque and low noise.' (Select all that apply.)",
      options: [
        "Not singular: several requirements in one statement",
        "Ambiguous words with no measurable criterion",
        "'Should' is not binding",
        "No stated conditions (speed, temperature, voltage)",
        "It is in the wrong EARS pattern for a performance requirement",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`It bundles three requirements, uses robust, high and low without numbers, mixes should and shall, and states no conditions. A ubiquitous pattern is fine for performance if conditions are stated, so the last option is not the problem.`,
      concepts: ["aw04.verifiable-requirement"],
      difficulty: 1,
    },
    {
      id: "aw04-l01-q3",
      type: "numeric",
      prompt: md`Tolerance: rise time at most 2.0 ms. Expanded uncertainty of the timing measurement $U = 0.15$ ms. With a guard band $w = U$, what is the acceptance limit? (ms)`,
      answer: 1.85,
      tolerance: { abs: 0.005 },
      unit: "ms",
      explanation: md`$A_U = T_U - U = 2.0 - 0.15 = 1.85$ ms. A reading of 1.9 ms passes under simple acceptance but is conditional under guarded acceptance.`,
      concepts: ["aw04.guard-band"],
      difficulty: 1,
    },
    {
      id: "aw04-l01-q4",
      type: "mcq",
      prompt: "The firmware team adds 'the current controller shall reach 90 % of a step within 0.5 ms' because the architecture uses field-oriented control. What kind of requirement is this?",
      options: ["A stakeholder requirement", "A derived software requirement", "A validation criterion", "A constraint imposed by a regulator"],
      answer: 1,
      explanation: md`It exists because of a design choice, so it is **derived**. It must still trace up to the system requirement or design decision that created it (for example the torque rise-time requirement), or nobody knows whether it can be relaxed later.`,
      concepts: ["aw04.requirement-levels"],
      difficulty: 1,
    },
    {
      id: "aw04-l01-q5",
      type: "mcq",
      prompt: "Which verification method best fits 'the actuator failure rate for the dangerous failure mode shall be below 1e-7 per hour'?",
      options: ["Inspection", "Analysis (for example FMEDA with component failure data)", "Demonstration", "Test of one unit for 1,000 hours"],
      answer: 1,
      explanation: md`Demonstrating $10^{-7}$/h by test needs about $3 \times 10^{7}$ failure-free hours at 95 % confidence (Lesson 4). Analysis with field-proven failure data is the realistic method; tests verify the diagnostic coverage assumptions.`,
      concepts: ["aw04.verification-methods"],
      difficulty: 2,
    },
    {
      id: "aw04-l01-q6",
      type: "decision",
      prompt: md`A prospect's spec says torque ripple shall be at most 0.5 % of rated torque. Their bench's expanded uncertainty for ripple is 0.3 %. The validation lead asks what you think. What do you say?`,
      options: [
        { text: "That is fine; just measure more carefully.", score: 0, feedback: "Care does not change the uncertainty budget. A ratio of 1.7 means the bench cannot discriminate pass from fail." },
        { text: "The bench cannot verify this requirement as written: the tolerance is under twice the uncertainty. Either improve the measurement chain (the dominant contribution first), change the method (analysis plus a coarser test), or renegotiate the limit, and write the decision rule down.", score: 1, feedback: "Right. This is the conversation that earns credibility with a validation lead: it shows you understand verifiability, not just software." },
        { text: "Use simple acceptance so most units pass.", score: 0.2, feedback: "That hides the problem and pushes consumer risk to the customer or end user. It might be acceptable for a non-safety parameter if both parties agree, but it must be explicit." },
      ],
      explanation: md`Tolerance over $U$ is $0.5/0.3 = 1.7$, well below the rule-of-thumb 4. Verifiability is a property of the requirement and the bench together.`,
      concepts: ["aw04.verifiable-requirement", "aw04.guard-band"],
      difficulty: 2,
    },
    {
      id: "aw04-l01-q7",
      type: "mcq",
      prompt: "Which statement best separates verification from validation?",
      options: [
        "Verification is done by the customer; validation by the supplier",
        "Verification shows the item meets its specified requirements; validation shows the product meets the stakeholder need in its intended use",
        "Verification is test; validation is analysis",
        "They are synonyms in ISO 26262",
      ],
      answer: 1,
      explanation: md`"Built it right" vs "built the right thing". A robot can pass every specified joint test (verified) and still fail at climbing stairs with a load (not validated) if a requirement was missing.`,
      concepts: ["aw04.verification-vs-validation"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw04-l01-f1", front: "The five EARS patterns", back: "Ubiquitous (the X shall), event-driven (When), state-driven (While), unwanted behaviour (If...then), optional feature (Where); plus complex combinations.", concepts: ["aw04.ears"] },
    { id: "aw04-l01-f2", front: "IADT", back: "The four verification methods: Inspection, Analysis, Demonstration, Test. Chosen when the requirement is written.", concepts: ["aw04.verification-methods"] },
    { id: "aw04-l01-f3", front: "Allocation vs derivation", back: "Allocation assigns an existing requirement to a subsystem; derivation creates a new lower-level requirement because of a design choice. Both must trace up.", concepts: ["aw04.requirement-levels"] },
    { id: "aw04-l01-f4", front: "Guarded acceptance limit", back: md`$A_U = T_U - U$ with $U = k u_c$, $u_c = \sqrt{\sum u_i^2}$. Between $A_U$ and $T_U + U$ the result is conditional.`, concepts: ["aw04.guard-band"] },
    { id: "aw04-l01-f5", front: "Three characteristics test engineers care most about", back: "Singular (one shall), unambiguous (one reading), verifiable (a finite method can decide it).", concepts: ["aw04.verifiable-requirement"] },
    { id: "aw04-l01-f6", front: "Test uncertainty ratio rule of thumb", back: "Tolerance should be about 4 or more times the expanded uncertainty; below that, change the bench, the method or the limit.", concepts: ["aw04.verifiable-requirement", "aw04.guard-band"] },
    { id: "aw04-l01-f7", front: "Verification vs validation", back: "Verification: meets the specified requirement. Validation: meets the stakeholder need in real use.", concepts: ["aw04.verification-vs-validation"] },
  ],
};

export default lesson;
