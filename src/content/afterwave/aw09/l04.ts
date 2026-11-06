import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw09-l04",
  title: "Instrumentation and calibration",
  summary:
    "Why a number from a test bench can be trusted by someone else: metrological traceability to SI through national institutes and accredited labs, the difference between calibration, verification and adjustment, ISO/IEC 17025 and the ILAC arrangement, decision rules and guard bands, calibration intervals from as-found history, gauge R&R, and what to do when an instrument is found out of tolerance.",
  minutes: 70,
  objectives: [
    "Explain metrological traceability and draw the chain from SI to a rig sensor",
    "Distinguish calibration, verification and adjustment, and as-found from as-left data",
    "Describe what ISO/IEC 17025 accreditation covers and why the ILAC MRA matters across borders",
    "Apply a test uncertainty ratio and a guard-banded decision rule to a calibration result",
    "Set or adjust a calibration interval from as-found history and run an out-of-tolerance impact assessment",
  ],
  concepts: [
    { id: "aw09.traceability", name: "Metrological traceability", description: "A result related to a reference (ultimately SI) through a documented unbroken chain of calibrations, each contributing to the measurement uncertainty (VIM 2.41).", competency: "aw-platforms", related: ["aw09.gum-budget"] },
    { id: "aw09.calibration-vs-adjustment", name: "Calibration, verification and adjustment", description: "Calibration establishes the relation between indication and reference with its uncertainty; verification checks it against a tolerance; adjustment changes the instrument. As-found data are recorded before adjustment.", competency: "aw-platforms" },
    { id: "aw09.iso17025", name: "ISO/IEC 17025 and accreditation", description: "International standard for the competence, impartiality and consistent operation of testing and calibration laboratories; accreditation is granted for a defined scope by a national body, recognised across borders through the ILAC MRA.", competency: "aw-platforms", related: ["aw09.traceability"] },
    { id: "aw09.decision-rules", name: "Decision rules, TUR and guard bands", description: "How measurement uncertainty is taken into account when stating pass or fail: test uncertainty ratio targets and acceptance limits tightened by a guard band.", competency: "aw-platforms", related: ["aw09.gum-budget"] },
    { id: "aw09.calibration-interval", name: "Calibration intervals", description: "Recalibration periods set from a reliability target and as-found history (calendar, in-use, staircase or reliability methods), not by habit.", competency: "aw-platforms" },
    { id: "aw09.oot-impact", name: "Out-of-tolerance impact assessment", description: "When an instrument is found out of tolerance, identify every result produced since its last good calibration and decide which conclusions are affected.", competency: "aw-platforms", related: ["aw09.calibration-interval"] },
    { id: "aw09.msa", name: "Measurement system analysis (gauge R&R)", description: "Quantifies repeatability and reproducibility of the whole measurement process relative to the tolerance or process variation.", competency: "aw-platforms" },
  ],
  sections: [
    {
      layer: "theory",
      title: "Traceability, accreditation and decision rules",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave's long-term pitch is safety evidence infrastructure: data that a notified body, a customer's safety team or eventually an insurer can rely on. Evidence is only evidence if its measurements are traceable and their uncertainty is known. Calibration status is also a natural Ripple input: a transducer found out of tolerance is a rig change, and the question "which results does this affect?" is the same question Ripple answers for firmware. If Afterwave ever sells test hours, ISO/IEC 17025 is the standard customers will ask about.`,
        },
        {
          kind: "md",
          md: md`### Traceability

The VIM defines **metrological traceability** as the property of a measurement result whereby it can be related to a reference through a **documented unbroken chain of calibrations, each contributing to the measurement uncertainty**. Three parts matter: unbroken (every link has a certificate), documented (you can show it), and uncertainty at every step (it only grows down the chain).`,
        },
        {
          kind: "flow",
          title: "The traceability chain for a rig torque reading",
          steps: [
            { label: "SI units", detail: "Kilogram, metre, second: torque in N·m" },
            { label: "National metrology institute", detail: "Primary torque standard machine (for example METAS in Switzerland, VSL in the Netherlands, PTB in Germany, NIST in the US)" },
            { label: "Accredited calibration lab", detail: "Reference torque transducers or lever-and-mass machines, ISO/IEC 17025 accredited for torque" },
            { label: "Rig torque transducer", detail: "Calibrated with the lab's reference, certificate with uncertainty and as-found data" },
            { label: "Measurement chain", detail: "Amplifier and DAQ channel, verified with shunt calibration and the rig budget" },
            { label: "Test result", detail: "Efficiency or torque reported with expanded uncertainty and the certificate references" },
          ],
          caption: "Uncertainty grows at every link. A missing certificate anywhere breaks the chain for everything below it.",
        },
        {
          kind: "md",
          md: md`### Calibration is not adjustment

| Term (VIM) | What happens | What you get |
|---|---|---|
| **Calibration** | Compare indications with a reference across the range | Corrections or errors at each point, with uncertainty |
| **Verification** | Check that calibration errors are within a stated tolerance | Pass, fail, or "cannot decide" under a decision rule |
| **Adjustment** | Change the instrument (gain, zero, linearisation) | A new state, which must then be calibrated again |

Always ask for **as-found** data (before any adjustment) and **as-left** data (after). As-found tells you whether your past results were good; as-left tells you whether future ones will be. A certificate that shows only as-left values hides exactly the information you need for an impact assessment.

Torque transducers are typically calibrated in steps up and down, in both directions of torque, often in several mounting orientations, after preloading cycles (practice described in DIN 51309 and EURAMET cg-14). Force-proving instruments follow ISO 376.

### ISO/IEC 17025

ISO/IEC 17025:2017 specifies requirements for the **competence, impartiality and consistent operation** of testing and calibration laboratories. Its main parts: impartiality and confidentiality; resources (people, facilities and environment, **equipment**, **metrological traceability** in clause 6.5); processes (method selection and validation, sampling, handling of test items, technical records, **measurement uncertainty**, ensuring validity of results, **reporting**, **decision rules** agreed with the customer and stated when a conformity statement is made); and a management system.

**Accreditation** is assessment against 17025 by a national accreditation body (SAS in Switzerland, RvA in the Netherlands, DAkkS in Germany, A2LA and ANAB in the US) for a **defined scope**: specific quantities, ranges and methods, with a stated best measurement capability. A lab is not "accredited" in general; it is accredited for what is on its scope. Through the **ILAC Mutual Recognition Arrangement**, results from accredited labs in signatory economies are accepted by the others, which is why a Swiss certificate works for a German customer.

### Decision rules`,
        },
        { kind: "equation", formula: "aw09-tur" },
        { kind: "equation", formula: "aw09-guard-band" },
        {
          kind: "matrix",
          title: "Measured error vs tolerance, with uncertainty U",
          xAxis: ["Uncertainty interval clear of the limit", "Uncertainty interval crosses the limit"],
          yAxis: ["Measured value outside tolerance", "Measured value inside tolerance"],
          cells: [
            { label: "Pass", detail: "Inside the acceptance limit (tolerance minus guard band): conformity can be stated with the agreed confidence" },
            { label: "Conditional pass", detail: "Inside tolerance but within U of the limit: a simple-acceptance rule says pass, a guard-banded rule does not" },
            { label: "Fail", detail: "Outside tolerance by more than U: non-conformity can be stated" },
            { label: "Conditional fail", detail: "Outside tolerance but within U of the limit: probably out of tolerance, not certain at 95 %" },
          ],
          caption: "ILAC-G8 describes these zones. The decision rule must be agreed before the calibration, not chosen after seeing the result.",
        },
        {
          kind: "md",
          md: md`### Intervals and measurement systems

A calibration interval is a risk decision: how likely is the instrument to drift out of tolerance before the next calibration, and what does that cost? ILAC-G24 / OIML D10 describe several methods: calendar time with staircase adjustment, in-use time, control charts, and reliability-based intervals from as-found history.`,
        },
        { kind: "equation", formula: "aw09-cal-interval" },
        {
          kind: "md",
          md: md`Calibration covers the instrument; a **measurement system analysis** covers the whole process (fixture, operator, mounting, software). Gauge R&R separates repeatability (same setup) from reproducibility (between operators or remountings):`,
        },
        { kind: "equation", formula: "aw09-grr" },
        { kind: "sources", refs: ["aw09-r2", "aw09-r4", "aw09-r5", "aw09-r6", "aw09-r7", "aw09-r8", "aw09-r11"] },
      ],
    },
    {
      layer: "applied",
      title: "A calibration result, an impact assessment and an interval",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Torque transducer comes back from calibration (illustrative)",
          given: md`Illustrative. The rig's 250 N·m transducer has an internal tolerance of plus or minus 0.1 % of full scale, so $T_L = 0.25$ N·m. The accredited lab's expanded uncertainty is $U = 0.05$ N·m ($k = 2$). The agreed decision rule is guard-banded with $w = 1$. **As-found** error at 200 N·m: **+0.22 N·m**. Since its last calibration 12 months ago the rig ran 140 tests; 9 of them were pass/fail checks of DUT output torque at or near 200 N·m, with the pass margin recorded.`,
          steps: [
            { md: md`**TUR** $= 0.25/0.05 = 5$: above the traditional 4:1, the lab is fit for this tolerance.` },
            { md: md`**Acceptance limit** $A_L = 0.25 - 0.05 = 0.20$ N·m. The as-found error 0.22 lies between 0.20 and 0.25: inside tolerance, but **conditional**: conformity cannot be claimed at 95 % confidence.` },
            { md: md`**What it means for past results.** The transducer read about 0.22 N·m (0.11 % of reading) high at 200 N·m. A DUT that "passed" a minimum torque requirement by less than 0.11 % may in fact have been below it. Search the records: which of the 9 checks had a pass margin under about $0.22 + 0.05 = 0.27$ N·m? Those results need review; the rest stand.` },
            { md: md`**Decide.** Adjust the transducer (record as-left data), shorten its next interval, and document the impact assessment. ISO/IEC 17025 calls this control of nonconforming work; in a regulated product context it is also part of the evidence that the test results supporting a declaration remain valid.` },
          ],
          result: md`Pass with condition, adjust, shorten the interval, and re-examine the small-margin results only. With a database linking each result to the instrument serial and calibration record, this is a query; without it, it is a week of spreadsheet archaeology.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Set an interval from as-found history (illustrative)",
          given: md`Illustrative. A lab's fleet of similar torque transducers shows **3 out-of-tolerance as-found results in 50 instrument-years**. Target end-of-period reliability $R = 0.95$. Assume the exponential model.`,
          steps: [
            { md: md`Out-of-tolerance rate: $\lambda = 3/50 = 0.06$ per year.` },
            { md: md`Interval: $I = -\ln 0.95/0.06$ years.`, hidden: true, check: { prompt: "Calibration interval", answer: 0.855, unit: "years", tolerance: { rel: 0.01 } } },
            { md: md`In months: $0.855 \times 12$.`, hidden: true, check: { prompt: "Interval in months", answer: 10.3, unit: "months", tolerance: { abs: 0.1 } } },
          ],
          result: md`About 10 months, so the default 12 is slightly long for this fleet. Lowering the target to 90 % would give $-\ln 0.9/0.06 = 1.76$ years. The reliability target is a business decision about how much rework risk you accept.`,
        },
        {
          kind: "question",
          question: {
            id: "aw09-l04-p1",
            type: "numeric",
            prompt: md`A gauge study on an actuator torque measurement gives repeatability $\sigma = 0.04$ N·m and reproducibility (between remountings) $\sigma = 0.03$ N·m. The specification is 50.0 plus or minus 1.0 N·m. What is %GRR of tolerance using 6 sigma? (%)`,
            answer: 15,
            tolerance: { abs: 0.2 },
            unit: "%",
            explanation: md`$\sigma_{GRR} = \sqrt{0.04^2 + 0.03^2} = 0.05$ N·m; $\%GRR = 100 \times 6 \times 0.05/2.0 = 15\,\%$: in the AIAG "may be acceptable" band. Reducing remounting variation (better alignment fixtures) is the obvious lever.`,
            concepts: ["aw09.msa"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running calibration in a test lab",
      blocks: [
        {
          kind: "md",
          md: md`### How it works in practice

A lab keeps an **equipment register**: every instrument with serial, range, owner, calibration supplier, last and next due dates, certificate, as-found result and status labels on the instrument itself. Calibration is bought from accredited labs (check the **scope** covers the quantity and range), or done in-house against reference standards that are themselves externally calibrated. Out-of-calendar checks between calibrations (shunt calibration, a reference load, a check torque with a lever arm and mass) catch drift early. Chambers are periodically surveyed for uniformity and stability (IEC 60068-3-5 and -3-6 address confirming chamber performance; check current editions). Accredited test labs also take part in **proficiency testing** or inter-laboratory comparisons. A typical actuator rig has 10 to 20 items needing calibration: torque and force sensors, power analyser, current sensors, voltage channels, thermocouples and their DAQ, accelerometers, chamber sensors.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Certificates with as-left only.** **Calibration lab not accredited for that range** (the logo is on the certificate, but the point is outside the scope). **Calibrating the sensor but not the chain:** a recalibrated transducer read through an amplifier with the old sensitivity value. **Rig down for weeks** while the only transducer is away; no spare. **Intervals by habit** (12 months for everything). **No link from results to instruments**, so an out-of-tolerance finding cannot be traced to the tests it affects.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Product implication for Afterwave",
          md: md`Bench memory should treat calibration records as first-class data: each channel references an instrument, each instrument a certificate with as-found data and uncertainty. Then an out-of-tolerance finding becomes a **reverse-traceability query** and a Ripple input (instrument change triggers impact analysis), and every report can print its traceability chain. This is a sharp, demonstrable difference in a sales conversation with a quality or safety lead.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Accreditation effort for a new test lab",
          md: md`Getting a new laboratory accredited to ISO/IEC 17025 for a test method typically takes many months (documentation, validation, internal audits, proficiency testing, assessment), and is often quoted as around a year or more. Durations and fees vary by accreditation body and scope; confirm with SAS or RvA before putting a date in a plan.`,
        },
        {
          kind: "checklist",
          title: "Calibration management checks",
          items: [
            "Equipment register covering every instrument that contributes to a reported result",
            "Accredited supplier whose scope covers the quantity, range and uncertainty needed",
            "Decision rule agreed in advance; TUR of 4:1 or better, or an explicit guard band",
            "As-found and as-left data on every certificate",
            "Sensitivity and calibration values updated in the DAQ after every calibration (or TEDS)",
            "Intervals reviewed against as-found history at least yearly",
            "Spare calibrated sensors for instruments whose absence stops the rig",
            "A written out-of-tolerance procedure linking instruments to the results they produced",
          ],
        },
        {
          kind: "ask",
          title: "Questions for a customer's lab or quality manager",
          items: [
            "When an instrument comes back out of tolerance, how do you find the affected tests today, and how long does it take?",
            "Are your test results used in a declaration of conformity or a safety case? Who checks their traceability?",
            "Which of your methods are on an accredited scope, and which are internal?",
            "How are calibration values transferred into your DAQ configuration?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain metrological traceability to an insurance underwriter who wants to know why Afterwave's test evidence should be trusted.",
          keyPoints: [
            "Every reading is linked through certificates to national standards and ultimately SI",
            "Each link is done by a competent, accredited laboratory and documented",
            "Each link states its uncertainty, so the final result has a known plus-or-minus",
            "If any instrument is later found off, the affected results can be identified and reviewed",
            "Accreditation is recognised internationally through ILAC",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw09-l04-p2",
            type: "short",
            prompt: md`Write the requirements section (6 to 8 bullets) of a short product spec that tells Ismail and Yusuf how bench memory must handle instruments and calibration, so that an out-of-tolerance finding can be traced to affected results in minutes. Be specific about data fields and behaviour.`,
            rubric: [
              "Requires each channel to reference an instrument serial and each instrument a calibration record (certificate id, date, lab, uncertainty, k, due date)",
              "Requires as-found and as-left data and the decision rule to be stored",
              "Requires results to be linked to the instrument state at the time of measurement (versioned, not overwritten)",
              "Specifies the reverse-traceability query: given an instrument and an error, list affected results with their margins",
              "Specifies behaviour when calibration is overdue or out of tolerance (flags, Ripple trigger, report warnings)",
              "Mentions DAQ sensitivity sync (or TEDS) and audit trail",
            ],
            modelAnswer: md`**Bench memory: instruments and calibration (requirements)**
1. Every recorded channel references an **instrument record** (serial, type, range, owner) and the **measurement-chain configuration** (amplifier, DAQ channel, sensitivity used).
2. Every instrument has a versioned list of **calibration records**: certificate id, lab and accreditation number, date, due date, points, as-found errors, as-left errors, expanded uncertainty with k, decision rule.
3. Each stored result is linked to the **instrument and calibration state in force at the time of measurement**; records are append-only, never overwritten.
4. **Reverse-traceability query:** given an instrument and an as-found error, return every result since the last in-tolerance calibration, with its pass margin, flagging those whose margin is below error plus uncertainty. Target: under one minute.
5. **Status rules:** a channel with overdue calibration is flagged at capture time and in every report; an out-of-tolerance finding automatically opens a Ripple impact analysis treating the instrument as a changed rig artifact.
6. On import of a new certificate, the sensitivity used by the DAQ is checked against the certificate (or read from TEDS) and any mismatch blocks the next run.
7. Reports print the traceability chain (instrument, certificate, lab) and the expanded uncertainty for each reported quantity.
8. Full audit trail of who changed which record and when.`,
            explanation: md`The requirement that makes impact assessment fast is linking each result to the instrument state at that time, append-only. Everything else (queries, flags, Ripple triggers, reports) builds on that link.`,
            concepts: ["aw09.oot-impact", "aw09.traceability", "aw09.calibration-vs-adjustment"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw09-l04-q1",
      type: "mcq",
      prompt: md`Which statement best defines metrological traceability?`,
      options: [
        "The instrument was bought from a reputable manufacturer",
        "The result is related to a reference through a documented unbroken chain of calibrations, each contributing to the uncertainty",
        "The instrument was adjusted to read zero error",
        "The lab holds ISO 9001 certification",
      ],
      answer: 1,
      explanation: md`This is the VIM definition. Manufacturer reputation, adjustment and ISO 9001 do not establish traceability.`,
      concepts: ["aw09.traceability"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw09-l04-q2",
      type: "numeric",
      prompt: md`A force channel has a tolerance of plus or minus 2.0 N. The calibration's expanded uncertainty is 0.6 N (k = 2). What is the TUR? (1 decimal)`,
      answer: 3.3,
      tolerance: { abs: 0.05 },
      unit: "-",
      explanation: md`$TUR = 2.0/0.6 = 3.3$: below 4:1, so the decision rule must account for the uncertainty explicitly, for example with a guard band.`,
      concepts: ["aw09.decision-rules"],
      difficulty: 1,
    },
    {
      id: "aw09-l04-q3",
      type: "mcq",
      prompt: md`Why are as-found calibration data essential?`,
      options: [
        "They show the instrument's state after adjustment",
        "They show whether results produced since the last calibration were within tolerance",
        "They are required to calculate the TUR",
        "They replace the need for an uncertainty statement",
      ],
      answer: 1,
      explanation: md`As-found is the state before adjustment, so it tells you how good the instrument was during the period you used it. As-left only tells you about the future.`,
      concepts: ["aw09.calibration-vs-adjustment", "aw09.oot-impact"],
      difficulty: 1,
    },
    {
      id: "aw09-l04-q4",
      type: "numeric",
      prompt: md`History shows 2 out-of-tolerance findings in 40 instrument-years. For a 90 % end-of-period reliability target with the exponential model, what is the interval? (years, 2 decimals)`,
      answer: 2.11,
      tolerance: { abs: 0.02 },
      unit: "years",
      explanation: md`$\lambda = 0.05$/yr; $I = -\ln 0.9/0.05 = 0.1054/0.05 = 2.11$ years. At a 95 % target it would be 1.03 years.`,
      concepts: ["aw09.calibration-interval"],
      difficulty: 2,
    },
    {
      id: "aw09-l04-q5",
      type: "order",
      prompt: md`Order the traceability chain from top to bottom.`,
      items: ["SI definition of the unit", "National metrology institute primary standard", "Accredited calibration laboratory reference", "Rig torque transducer", "Reported test result"],
      explanation: md`Each step is calibrated against the one above and adds uncertainty.`,
      concepts: ["aw09.traceability"],
      difficulty: 1,
    },
    {
      id: "aw09-l04-q6",
      type: "decision",
      prompt: md`A customer wants Afterwave's future test service to issue reports they can cite in a Machinery Regulation technical file. Afterwave's lab is not accredited. What do you say?`,
      options: [
        { text: "Promise accredited reports from day one", score: 0, feedback: "That would be a false claim. Accreditation is for a defined scope and takes time to obtain." },
        { text: "Offer traceable calibrated measurements with stated uncertainty now, be explicit that the lab is not yet accredited, and lay out the accreditation path and scope you would pursue if demand justifies it", score: 1, feedback: "Honest and useful: many technical files cite manufacturer or third-party test results that are traceable without the test lab being accredited; the customer decides what their notified body or assessor needs." },
        { text: "Tell them accreditation does not matter for machinery", score: 0.2, feedback: "Requirements depend on the conformity route and the assessor. Dismissing it costs credibility with quality and safety teams." },
      ],
      explanation: md`Be precise about what is and is not in place. Traceability and stated uncertainty are available without accreditation; accreditation is a scoped, audited claim about the lab's competence.`,
      concepts: ["aw09.iso17025", "aw09.traceability"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw09-l04-f1", front: "Traceability (VIM 2.41)", back: "Result related to a reference through a documented unbroken chain of calibrations, each contributing to the measurement uncertainty.", concepts: ["aw09.traceability"] },
    { id: "aw09-l04-f2", front: "Calibration vs adjustment", back: "Calibration measures the errors against a reference (with uncertainty); adjustment changes the instrument. Record as-found before adjusting.", concepts: ["aw09.calibration-vs-adjustment"] },
    { id: "aw09-l04-f3", front: "ISO/IEC 17025 accreditation scope", back: "A lab is accredited for specific quantities, ranges, methods and capabilities, not in general. Check the scope covers your point.", concepts: ["aw09.iso17025"] },
    { id: "aw09-l04-f4", front: "ILAC MRA", back: "Mutual recognition of accredited results among signatory accreditation bodies: a Swiss certificate is accepted in Germany or the US.", concepts: ["aw09.iso17025"] },
    { id: "aw09-l04-f5", front: "TUR target", back: md`$TUR = T_{\text{half}}/U_{95}$; traditional target 4:1. Below it, use a guard band.`, concepts: ["aw09.decision-rules"] },
    { id: "aw09-l04-f6", front: "Reliability-based interval", back: md`$I = -\ln R_{\text{target}}/\lambda$, with $\lambda$ from as-found history.`, concepts: ["aw09.calibration-interval"] },
    { id: "aw09-l04-f7", front: "Gauge R&R thresholds (AIAG)", back: "Under 10 % acceptable; 10 to 30 % may be acceptable; over 30 % unacceptable.", concepts: ["aw09.msa"] },
  ],
};

export default lesson;
