import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m07-l05",
  title: "Testing, Commissioning, Performance Tests & COD",
  summary:
    "From factory to commercial operation: FAT, SAT, pre-commissioning, cold and hot commissioning, energisation, grid compliance tests, the temperature-corrected performance ratio test (IEC 61724 basis), capacity test, reliability run, COD criteria and punch lists A/B.",
  minutes: 85,
  objectives: [
    "You can sequence testing from FAT through COD and say what each stage proves",
    "You can compute a temperature-corrected PR from interval data and explain how the reference temperature changes the result",
    "You can explain capacity testing (ASTM E2848 / IEC TS 61724-2), reliability runs and grid compliance tests",
    "You can define COD criteria and manage Category A/B punch lists",
    "You can compute performance liquidated damages for a PR shortfall",
  ],
  concepts: [
    {
      id: "m07.commissioning-sequence",
      name: "Commissioning sequence",
      description:
        "FAT → delivery/SAT → mechanical completion → pre-commissioning (cold) → energisation → hot commissioning → grid/performance tests → reliability run → COD.",
      competency: "delivery",
      related: ["m07.pr-test", "m07.cod-criteria"],
    },
    {
      id: "m07.pr-test",
      name: "Performance ratio test",
      description:
        "Contractual test comparing measured AC energy with the energy expected from measured plane-of-array irradiance and nameplate DC power, usually temperature-corrected, over a defined period.",
      competency: "solar",
      related: ["m07.capacity-test"],
    },
    {
      id: "m07.capacity-test",
      name: "Capacity test",
      description:
        "Short test that regresses measured power against irradiance, temperature and wind to estimate plant output at reporting conditions and compare it with the model.",
      competency: "solar",
    },
    {
      id: "m07.grid-compliance-tests",
      name: "Grid compliance tests",
      description:
        "On-site demonstration of active power control, ramp rates, frequency response, reactive power/voltage control and power quality at the point of interconnection.",
      competency: "grid",
    },
    {
      id: "m07.cod-criteria",
      name: "COD criteria and punch lists",
      description:
        "Contractual conditions for commercial operation/taking over: tests passed, certificates, grid operator approval, Category A punch items closed; Category B items completed in the defects period.",
      competency: "contracts",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What each test proves",
      blocks: [
        {
          kind: "md",
          md: md`### The testing chain

| Stage | Where | What it proves | Typical witnesses |
|---|---|---|---|
| **FAT** (factory acceptance test) | Factory | Equipment meets spec before shipment: transformer routine and type tests (ratio, losses, impulse, temperature rise), inverter functional and grid-code tests, BESS container tests, switchgear | OE/Employer, EPC QA |
| **Receipt inspection / SAT** (site acceptance test) | Site | No transport damage; equipment works as installed (e.g. transformer oil tests, SFRA comparison with factory) | EPC, OE |
| **Mechanical completion** | Site | Installed per drawings; ready for testing | EPC, OE walkdown |
| **Pre-commissioning (cold)** | De-energised | Insulation resistance, continuity, polarity, Voc/Isc of strings (IEC 62446-1), torque, earthing resistance, MV cable VLF/tan-δ, relay secondary injection, SCADA point-to-point | EPC, OE witness |
| **Energisation** | HV → MV → LV | Safe first energisation under a switching programme and permit-to-work regime | Transmission operator (MEWRE), EPC |
| **Hot commissioning** | Energised | Inverters, trackers, PPC, SCADA, BESS operate correctly; IV curves, thermography | EPC, OE |
| **Grid compliance tests** | POI | Plant behaves as the grid code requires | MEWRE transmission/control centre |
| **Performance tests** | Plant | PR, capacity, BESS capacity/RTE meet guarantees | OE, LTA, Employer |
| **Reliability run** | Plant | Sustained operation without contractor-caused trips | OE |
| **COD / Taking over** | Contract | All conditions met; risk and care transfer to owner | Employer/Engineer |

Under FIDIC 2017 these map onto **Clause 9 (Tests on Completion)** — pre-commissioning, commissioning and trial operation — then **Clause 10 (Employer's Taking Over)**, and sometimes **Clause 12 (Tests after Completion)**, e.g. a final PR test after a year of operation. In an IPP, the PPA defines **COD tests** that the offtaker (MEWRE) witnesses, while the EPC contract inside the SPV has its own tests (often stricter).

### Energisation

First energisation of a 400 kV substation is the most dangerous single event on the project. It needs: a switching programme approved by the transmission operator, protection settings applied and tested, earthing verified, a **permit-to-work** and **limitation of access** regime (who may enter energised areas), notices that the area is live, and a rehearsed emergency plan. From that moment the site is an operating electrical installation, and the safety rules change.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the PR test is temperature-corrected",
          md: md`Module power falls ~0.3–0.4 %/°C as cell temperature rises. An uncorrected PR measured in a Kuwaiti July (cell 65–70 °C) will look 10 % worse than the same plant measured in January. Without correction, the test result depends on the **season** you test in, not on whether the contractor built a good plant. Temperature correction normalises the expected energy to a reference temperature so the guarantee tests construction quality.`,
        },
        {
          kind: "md",
          md: md`### Performance ratio (IEC 61724-1 basis)

The basic PR is the ratio of the final yield to the reference yield:`,
        },
        { kind: "equation", formula: "m07-pr-basic" },
        {
          kind: "md",
          md: md`The **temperature-corrected PR** (in the style of IEC 61724-1 and NREL's weather-corrected PR) applies a correction to each interval's expected energy:`,
        },
        { kind: "equation", formula: "m07-pr-temp-corrected" },
        {
          kind: "md",
          md: md`**The choice of $T_{ref}$ is a commercial decision.** If $T_{ref} = 25$ °C, the corrected PR is high (expected energy is reduced by the hot-cell penalty) and the guarantee value should be set correspondingly high (e.g. 0.85–0.88). If $T_{ref}$ = the **irradiance-weighted annual average cell temperature** from the PVsyst model (NREL approach; e.g. ~42–47 °C in Kuwait), the corrected PR is comparable with the annual PVsyst PR (~0.80–0.83). Both work — mixing them (a guarantee from PVsyst annual PR, test corrected to 25 °C) is a gift to one side.

### Test conditions that decide disputes

- **Duration**: typically 7–15 consecutive days for the provisional test at COD (10 is common), plus sometimes a 12-month final test at the end of the defects period.
- **Data filters**: irradiance threshold for valid intervals, exclusion of grid outages/curtailment by MEWRE (not contractor's fault), minimum data availability (e.g. ≥ 95 % of intervals valid).
- **Sensors**: calibrated reference cells/pyranometers in POA (bifacial plants need rear-side irradiance or an agreed bifacial correction), back-of-module temperature sensors, revenue meter at the agreed point.
- **Soiling state**: clean before the test, or measure soiling and correct — must be agreed in advance.
- **Measurement uncertainty**: whether the guaranteed value is reduced by uncertainty (tolerance) or not.

### Capacity test

A capacity test (ASTM E2848; IEC TS 61724-2) is a short test (days, not weeks) that fits a regression to measured power:`,
        },
        { kind: "equation", formula: "m07-capacity-regression" },
        {
          kind: "md",
          md: md`and evaluates it at **reporting conditions** (RC: e.g. 800 W/m² POA, 35 °C ambient, 2 m/s wind chosen from the site's actual conditions). The result is compared with the model (PVsyst run at the same RC). Pass if measured ≥ guarantee × (1 − tolerance), e.g. ≥ 97 %.

### Grid compliance tests and the reliability run

Typical PPC/grid tests: active power setpoint steps and ramp rate limits; curtailment response; frequency response (droop, deadband, LFSM-O/U) by injecting frequency signals into the PPC; reactive power and voltage control modes (Q, PF, V setpoint) step tests across the capability; power quality measurements (harmonics, flicker). Fault ride-through is normally proven by type tests and validated simulation models, not by applying real faults. The **reliability run** (e.g. a continuous 7- to 30-day period, or 72 hours for subsystems) proves the plant runs without contractor-caused trips and with alarms resolved. For BESS: energy capacity test at rated power, round-trip efficiency, response time, SoC calibration.

### COD criteria and punch lists

COD (or Taking Over) typically requires: all tests passed (or LDs paid where the contract allows buy-down); grid operator approval/energisation certificate; **Category A** punch items closed; provisional O&M manuals and as-builts; spare parts delivered; training done; permits and insurances in place. **Category A** = items affecting safety, reliability, performance or legal compliance — must close before COD. **Category B** = minor items (cosmetic, documentation corrections) — close within an agreed period during the defects notification period, often with a retained amount.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Running the numbers on a PR test",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Temperature-corrected PR to 25 °C",
          given: md`Test block $P_0 = 100$ MWp (STC). $\gamma = -0.30\,\%/°\text{C}$. Four representative hourly intervals (in a real test there are thousands of 1–15 min records):

| Interval | $G_{POA}$ (W/m²) | $T_{cell}$ (°C) | $E_{AC}$ (MWh) |
|---|---|---|---|
| 1 | 600 | 45 | 50.0 |
| 2 | 900 | 60 | 70.5 |
| 3 | 1,000 | 65 | 77.0 |
| 4 | 700 | 55 | 56.0 |`,
          steps: [
            { md: md`Measured energy: $\sum E = 253.5$ MWh. Uncorrected expected: $100 \times (0.6+0.9+1.0+0.7) = 320$ MWh → raw PR $= 253.5/320 = 0.792$.` },
            { md: md`Corrected expected per interval: $P_0 \frac{G}{1000}[1+\gamma(T-25)]$: interval 1: $60 \times (1-0.003 \times 20) = 56.40$; 2: $90 \times (1-0.105) = 80.55$; 3: $100 \times 0.88 = 88.00$; 4: $70 \times 0.91 = 63.70$. Sum = 288.65 MWh.` },
            { md: md`$PR_{corr,25} = 253.5/288.65 = 0.878$.` },
            { md: md`Interpretation: of the 0.208 gap from 1.0 in the raw PR, about 0.09 is temperature; the remaining ~12 % is inverter, cable, mismatch, transformer and soiling losses — what the contractor controls.` },
          ],
          result: md`Raw PR 0.792; temperature-corrected (25 °C) PR 0.878. If the guarantee is 0.86 at 25 °C reference, the test passes.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Same data, different reference temperature",
          given: md`The PPA instead defines $T_{ref}$ = 45 °C (irradiance-weighted annual average cell temperature from PVsyst) and a guaranteed PR of 0.81.`,
          steps: [
            { md: md`Interval 1: $60 \times [1 - 0.003(45-45)] = 60.00$. Interval 2: $90 \times [1-0.003 \times 15] = 85.95$.` },
            { md: md`Interval 3: $100 \times [1 - 0.003 \times 20] = 94.00$. Interval 4: $70 \times [1 - 0.003 \times 10] = 67.90$.` },
            {
              md: md`Sum of expected energy = ? MWh`,
              hidden: true,
              check: { prompt: "Corrected expected energy", answer: 307.85, unit: "MWh", tolerance: { rel: 0.005 } },
            },
            {
              md: md`$PR_{corr,45} = 253.5 / 307.85$ = ?`,
              hidden: true,
              check: { prompt: "PR corrected to 45 °C", answer: 0.8235, tolerance: { abs: 0.002 } },
            },
          ],
          result: md`$PR_{corr,45} ≈ 0.823$ ≥ 0.81 → pass. Same plant, same data: 0.878 vs 0.823 depending only on $T_{ref}$. Always read the guarantee value together with its reference temperature.`,
        },
        {
          kind: "question",
          question: {
            id: "m07-l05-p1",
            type: "numeric",
            prompt: md`The EPC contract guarantees PR = 0.800 (corrected to the PVsyst reference). The final test gives 0.786. Performance LDs are USD 1.5 m per 1 % of **relative** shortfall. What LD is due (USD m)?`,
            answer: 2.625,
            unit: "USD m",
            tolerance: { rel: 0.01 },
            explanation: md`Relative shortfall $= (0.800 - 0.786)/0.800 = 1.75\,\%$. LD $= 1.75 \times 1.5 = 2.625$ m. Check whether the contract defines shortfall in relative or absolute (percentage-point) terms — 1.4 points vs 1.75 % changes the LD by 25 %. Performance LDs are typically capped (e.g. 10–15 % of contract price combined with delay LDs).`,
            concepts: ["m07.pr-test", "m07.cod-criteria"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Commissioning on a real project",
      blocks: [
        {
          kind: "md",
          md: md`### Roles

- **EPC commissioning manager**: writes procedures, runs tests, issues reports.
- **OE**: reviews procedures in advance, witnesses, checks raw data, prepares the test evaluation for the Employer.
- **MEWRE transmission / National Control Centre**: approves energisation and witnesses grid tests; its approval is a COD condition.
- **LTA/IE (IPP)**: confirms test results to lenders (often a condition for converting construction loans).
- **OEMs**: inverter, BESS and tracker specialists on site for commissioning.

### Documents

Commissioning plan; test procedures (each approved before the test, with acceptance criteria); energisation and switching programmes; test sheets and reports; PR/capacity test evaluation reports with raw data files; punch list (category, owner, due date); COD/Taking-Over certificate.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Where PR tests go wrong",
          md: md`- **Procedure agreed after the test**: disputes on filters, curtailment exclusion and soiling become unwinnable.
- **Uncalibrated or dirty sensors**: a pyranometer reading 3 % high makes the plant look 3 % worse; one reading low hides underperformance.
- **Bifacial gain unaccounted**: POA front sensors only, while the guarantee assumes bifacial gain — or the reverse.
- **Curtailment by the grid operator during the test**: must be excluded or the test extended.
- **Test run in a dust storm week** without agreed soiling correction.
- **Meter location mismatch**: guarantee at inverter output, measurement at the 400 kV revenue meter (includes transformer and line losses).`,
        },
        {
          kind: "checklist",
          title: "PM checklist before signing COD",
          items: [
            "All test procedures approved before testing, including filters, Tref, soiling and uncertainty treatment",
            "Sensor calibration certificates current; sensors cleaned daily during the test",
            "Raw data received and independently recalculated by the OE",
            "PR, capacity and BESS tests passed (or LDs calculated per contract)",
            "Grid compliance tests witnessed and approved by MEWRE transmission",
            "Reliability run completed without contractor-caused trips",
            "All Category A punch items closed and verified; Category B list agreed with dates",
            "Provisional O&M manuals, as-builts, spare parts and training delivered",
            "Insurances transferred / operational policies in force; permits in place",
          ],
        },
        {
          kind: "ask",
          title: "Ask the EPC before the performance test",
          items: [
            "Which reference temperature and temperature coefficient are used, and where are they defined in the contract?",
            "How are curtailment, grid outages and data gaps handled — excluded or extended?",
            "How is bifacial (rear-side) irradiance measured or modelled in the expected energy?",
            "When were the reference sensors calibrated, and by whom?",
            "Where exactly is the energy measured, and what losses lie between that point and the guarantee point?",
            "What is the measurement uncertainty and how does the contract treat it?",
          ],
        },
        { kind: "scenario", scenario: "m07-s4" },
        {
          kind: "feynman",
          prompt: "Explain to the Undersecretary why a PR test result of 0.88 and one of 0.82 may describe the same plant.",
          keyPoints: [
            "Temperature-corrected PR depends on the reference temperature",
            "25 °C reference gives a higher number than the annual-average cell temperature reference",
            "The guarantee value must be read with its reference",
            "The test should measure construction quality, not weather",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m07-l05-q1",
      type: "order",
      prompt: "Order the testing stages.",
      items: ["Factory acceptance test", "Site receipt inspection / SAT", "Mechanical completion", "Cold pre-commissioning", "Energisation", "Hot commissioning", "Performance tests and reliability run", "COD"],
      explanation: md`Each stage relies on the previous: you don't energise equipment that hasn't passed insulation tests, and you don't run performance tests on equipment not commissioned.`,
      concepts: ["m07.commissioning-sequence"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m07-l05-q2",
      type: "numeric",
      prompt: md`A capacity test regression gives 92.6 MW at reporting conditions; the PVsyst model at the same RC gives 95.0 MW. What is the measured/expected ratio in %?`,
      answer: 97.47,
      unit: "%",
      tolerance: { abs: 0.05 },
      explanation: md`$92.6/95.0 = 0.9747$ → 97.5 %. If the pass criterion is ≥ 97 %, it passes, just. The OE should check the regression fit and data filtering before accepting a marginal pass.`,
      concepts: ["m07.capacity-test"],
      difficulty: 1,
    },
    {
      id: "m07-l05-q3",
      type: "mcq",
      prompt: "Why is the PR test usually temperature-corrected?",
      options: [
        "To make the plant look better",
        "So the result reflects construction quality rather than the season of testing",
        "Because IEC forbids uncorrected PR",
        "To account for inverter clipping",
      ],
      answer: 1,
      explanation: md`Module power falls with cell temperature; uncorrected PR in summer would penalise the contractor for weather, and in winter would favour it.`,
      concepts: ["m07.pr-test"],
      difficulty: 1,
    },
    {
      id: "m07-l05-q4",
      type: "multi",
      prompt: "Which items are Category A punch items (must close before COD)? Select all.",
      options: [
        "Missing earthing connection on an inverter station",
        "Scratched paint on a fence post",
        "SCADA not reporting 5 % of strings",
        "Typo in the O&M manual index",
        "Fire detection in BESS container not commissioned",
      ],
      answer: [0, 2, 4],
      explanation: md`Safety (earthing, fire detection) and performance/monitoring defects (missing SCADA data) are Category A. Cosmetic and minor documentation items are Category B.`,
      concepts: ["m07.cod-criteria"],
      difficulty: 1,
    },
    {
      id: "m07-l05-q5",
      type: "decision",
      prompt: md`Day 6 of a 10-day PR test: MEWRE's control centre curtails the plant to 60 % for 2 days due to a transmission constraint. The EPC asks to count those days with "deemed" energy. The procedure is silent. What do you do?`,
      options: [
        { text: "Count the days as measured — curtailment is not your problem", score: 0.2, feedback: "Unfair and legally weak: the Employer side caused the curtailment." },
        { text: "Accept deemed energy calculated by the EPC", score: 0.3, feedback: "Deemed energy calculations are themselves disputable; accepting the EPC's method without scrutiny is risky." },
        { text: "Exclude the curtailed intervals and extend the test by 2 valid days; record the agreement in a signed note and fix the procedure for future tests", score: 1, feedback: "Clean, fair and data-based. Extending avoids modelling disputes." },
      ],
      explanation: md`Excluding non-contractor events and extending the test keeps the test a measurement, not a model. The gap in the procedure is a lesson: test procedures must cover curtailment, outages and data gaps before testing starts.`,
      concepts: ["m07.pr-test"],
      difficulty: 2,
    },
    {
      id: "m07-l05-q6",
      type: "mcq",
      prompt: "How is fault ride-through usually demonstrated for a large PV plant?",
      options: [
        "By applying real three-phase faults on the 400 kV grid",
        "By type tests of the inverters plus validated plant simulation models",
        "It is not required",
        "By the PR test",
      ],
      answer: 1,
      explanation: md`Real faults on the transmission grid are impractical; FRT capability is proven through certified type tests and models validated against commissioning tests.`,
      concepts: ["m07.grid-compliance-tests"],
      difficulty: 2,
    },
    {
      id: "m07-l05-q7",
      type: "short",
      prompt: "List five things the PR test procedure must define before the test starts.",
      rubric: [
        "Duration and valid-day definition",
        "Reference temperature and temperature coefficient",
        "Irradiance sensors, calibration and POA/bifacial treatment",
        "Data filters, curtailment/outage exclusions and data availability",
        "Measurement point and loss adjustments",
        "Soiling treatment and measurement uncertainty",
      ],
      modelAnswer:
        "Test duration and valid-day criteria; Tref and gamma; irradiance sensor type, location, calibration and bifacial treatment; filters (irradiance threshold), exclusion of curtailment/outages and minimum data availability; meter location and loss adjustments; soiling state/cleaning and whether measurement uncertainty is applied.",
      explanation: md`Every one of these, if undefined, becomes a negotiation after the result is known — when both sides know which interpretation favours them.`,
      concepts: ["m07.pr-test"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m07-l05-f1", front: "Basic performance ratio", back: md`$PR = \dfrac{E_{AC}/P_0}{H_{POA}/G_{STC}}$`, concepts: ["m07.pr-test"] },
    { id: "m07-l05-f2", front: "Temperature-corrected PR — what changes?", back: md`Expected energy per interval is multiplied by $[1+\gamma(T_{cell}-T_{ref})]$.`, concepts: ["m07.pr-test"] },
    { id: "m07-l05-f3", front: "Typical provisional PR test duration", back: "7–15 consecutive valid days (10 is common).", concepts: ["m07.pr-test"] },
    { id: "m07-l05-f4", front: "Capacity test regression (ASTM E2848)", back: md`$P = E(a_1 + a_2E + a_3T_a + a_4 v)$ evaluated at reporting conditions.`, concepts: ["m07.capacity-test"] },
    { id: "m07-l05-f5", front: "Category A vs B punch items", back: "A: safety/performance/compliance — close before COD. B: minor — close during DNP.", concepts: ["m07.cod-criteria"] },
    { id: "m07-l05-f6", front: "FIDIC 2017 clause for Tests on Completion", back: "Clause 9 (then Clause 10 Taking Over; Clause 12 Tests after Completion).", concepts: ["m07.commissioning-sequence"] },
    { id: "m07-l05-f7", front: "Effect of Tref on corrected PR", back: "Tref = 25 °C gives a higher PR than Tref = annual average cell temperature (~45 °C in Kuwait).", concepts: ["m07.pr-test"] },
    { id: "m07-l05-f8", front: "Who must approve energisation and grid tests on a MEWRE-connected plant?", back: "MEWRE transmission / National Control Centre.", concepts: ["m07.grid-compliance-tests"] },
  ],
  scenarios: [
    {
      id: "m07-s4",
      title: "The PR test that missed by 0.4 %",
      dayInLife: true,
      context: md`You are MEWRE's PM for a 500 MW PV IPP. The 10-day COD PR test result arrives: corrected PR 0.807 against a PPA guarantee of 0.810. The developer says the reference sensors were dusty for three days during a shamal and asks to re-run the test. The OE confirms dust on sensors on days 4–6.`,
      start: "a",
      concepts: ["m07.pr-test", "m07.cod-criteria"],
      nodes: {
        a: {
          md: md`The PPA says COD requires PR ≥ 0.810; it allows re-tests at the developer's cost. A delayed COD delays the developer's revenue; MEWRE needs the summer capacity.`,
          choices: [
            { text: "Accept COD anyway — 0.807 is close enough and MEWRE needs the power", next: "b", score: 2, feedback: "Waiving a contractual test without basis undermines every future test and creates audit exposure." },
            { text: "Ask the OE to check whether dusty sensors under-read irradiance (which would make PR look higher, not lower) and to recompute excluding days 4–6", next: "c", score: 9, feedback: "Dirty irradiance sensors read low → expected energy low → PR biased upward. Check the physics before accepting the developer's story." },
            { text: "Reject and require a full re-test", next: "d", score: 6, feedback: "Contractually sound, but you haven't examined the data first." },
          ],
        },
        b: {
          md: md`Six months later the Audit Bureau asks why COD was certified with a failed test.`,
          choices: [{ text: "Explain the operational urgency", score: 2, feedback: "Urgency does not justify a waiver without a formal contractual mechanism (e.g. agreed LD buy-down)." }],
        },
        c: {
          md: md`The OE recomputes: excluding days 4–6, PR = 0.803 — **lower**. The dusty sensors had under-read irradiance, so the original 0.807 was flattering. The likely real cause: module soiling, since cleaning stopped during the shamal.`,
          choices: [
            { text: "Inform the developer: test failed; re-test allowed after cleaning, with sensors cleaned daily and the procedure tightened", next: "d", score: 10, feedback: "Data-driven, fair, and contractually correct." },
            { text: "Keep the recomputed result confidential and accept the original", score: 1, feedback: "Ethically and contractually unacceptable." },
          ],
        },
        d: {
          md: md`The re-test after full cleaning gives PR 0.818. COD is certified. Developer asks whether the soiling issue matters going forward.`,
          choices: [
            { text: "Yes — record that the plant only meets PR when clean; require the O&M cleaning plan and soiling monitoring as part of operational reporting", score: 10, feedback: "You turn a test episode into an operational control. Soiling is the dominant controllable loss in Kuwait." },
          ],
        },
      },
    },
  ],
};

export default lesson;
