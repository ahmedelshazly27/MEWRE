import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m02-l07",
  title: "Field QA: design review, factory audits, construction & commissioning",
  summary:
    "The quality chain that decides whether a PV plant performs for 30 years: design review, module procurement QA (factory audits, pre-shipment inspection, EL/flash sampling), receiving inspection, construction QA (piling, torque, connectors), commissioning tests (I-V tracing, insulation resistance, IR thermography) and handover.",
  minutes: 85,
  objectives: [
    "Run a structured design review of a PV plant and know which documents to demand at each stage",
    "Specify module procurement QA: factory audit, in-line witness, pre-shipment inspection, EL and flash-test sampling",
    "Define receiving inspection and construction QA hold points, including piling, torque and connector crimping",
    "Interpret commissioning tests per IEC 62446-1 (Voc, Isc, insulation resistance, I-V curves) and IR thermography",
    "Plan handover documentation and the punch-list process before taking over the plant",
  ],
  concepts: [
    {
      id: "m02.design-review",
      name: "PV design review",
      description: "Staged review of design deliverables (basic, detailed, IFC) by the Owner's Engineer and Employer against requirements and standards.",
      competency: "risk",
      related: ["m02.string-sizing", "m02.yield-review", "m07.design-review"],
    },
    {
      id: "m02.module-procurement-qa",
      name: "Module procurement QA",
      description: "Factory audit, production witness, pre-shipment inspection, EL/flash sampling, independent lab testing and traceability.",
      competency: "risk",
      related: ["m02.module-qualification", "m02.module-warranty", "m15.supply-chain-integrity"],
    },
    {
      id: "m02.construction-qa",
      name: "Construction QA",
      description: "Receiving inspection, piling tolerances and pull tests, tracker installation, torque, cable and connector workmanship, ITPs and hold points.",
      competency: "risk",
      related: ["m02.bos-earthing", "m02.commissioning-tests", "m08.itp", "m08.hold-witness", "m07.pile-pullout"],
    },
    {
      id: "m02.commissioning-tests",
      name: "Commissioning tests",
      description: "IEC 62446-1 category 1 and 2 tests, I-V curve tracing, insulation resistance, IR thermography, capacity and performance tests, handover.",
      competency: "risk",
      related: ["m02.iv-parameters", "m02.mismatch-bypass", "m02.performance-ratio", "m07.commissioning-sequence", "m07.capacity-test", "m12.el-iv-testing"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "Why PV quality is decided before energisation",
      blocks: [
        {
          kind: "md",
          md: md`A PV plant has millions of small parts — on a 1 GW plant roughly 1.7 million modules, several million connectors, hundreds of thousands of piles and bolts. Defects are individually small and collectively decisive: one mis-crimped connector can start a fire; a 0.5 % systematic module under-power is 5 MWp gone; a pile line 50 mm out of tolerance can stall a tracker row. Industry inspection data consistently find that a large share of module factory audits and construction inspections reveal defects, and the majority of those are cheaper to fix by orders of magnitude *before* installation.

The **quality chain** follows the asset:

| Stage | Main risk | Main control | Who |
|---|---|---|---|
| Design | Wrong assumptions baked into everything | Staged design review vs Employer's Requirements and standards | EPC designer; OE reviews; LTA reviews for lenders |
| Manufacturing | BOM substitution, process drift, micro-cracks | Factory audit, in-line witness, pre-shipment inspection, lab testing | OEM; third-party inspector for IPP/OE |
| Transport & storage | Cracks from handling, vibration, stacking | Packaging spec, shock/tilt indicators, receiving inspection, mobile EL | Logistics; EPC QA |
| Construction | Workmanship: piles, torque, connectors, cables | ITPs with hold/witness points, calibrated tools, sample audits | EPC QA/QC; OE site supervision |
| Commissioning | Latent defects, wiring errors | IEC 62446-1 tests, I-V, IR, functional & grid tests | EPC commissioning; OE witness; grid operator |
| Handover | Missing data, open defects | Punch list, documentation, performance tests | EPC → IPP/O&M; MEWRE for interface |

In a MEWRE IPP, the **IPP** owns construction quality (through its EPC), the **LTA** protects the lenders, and **MEWRE** — through its OE — protects its interests where the PPA gives it rights: compliance with minimum technical requirements, grid-code tests, interconnection works, safety and, if the plant is to be transferred at end of term, long-term condition. On an EPC contract where MEWRE is the Employer under FIDIC, the **Engineer** carries these duties directly.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the PM needs QA literacy even in an IPP",
          md: md`MEWRE buys energy for 30 years and, depending on the PPA, may inherit the plant. Defects that halve module life or cause fires surface after the EPC's defects-notification period, when the IPP's incentives have changed. The time to insist on QA evidence is when it costs the least: at tender (requirements), at design review, and at hold points during construction.`,
        },
      ],
    },
    {
      layer: "theory",
      title: "Module procurement QA in detail",
      blocks: [
        {
          kind: "md",
          md: md`### 1. Factory audit (before contract or before production)

A third-party auditor (independent QA firm) visits the module factory and checks: quality management system (ISO 9001; IEC 62941 is the module-specific QMS guideline), incoming material inspection, BOM control and certificate match, process controls (stringer soldering, lamination temperature/time, gel-content testing of encapsulant, peel tests), EL inspection before and after lamination, flash tester calibration (reference "golden" modules traceable to an accredited lab), and handling/packaging.

### 2. Production witness (in-line monitoring)

Inspectors stationed in the factory during *your* production run: verify that the locked BOM is used (lot numbers of cells, glass, encapsulant, junction boxes), sample EL and visual inspection at stations, review flash data daily, quarantine non-conforming material.

### 3. Pre-shipment inspection (PSI)

Before the containers leave: random sampling of finished, packed modules — visual inspection (glass, frame, junction box, labels), EL imaging (micro-cracks, broken fingers, dark cells), flash test re-measurement compared to factory flash data, packaging and container loading check. Sampling usually follows **ISO 2859-1** (AQL tables, general inspection level II) or a fixed sample per lot defined in the contract.

### 4. Independent lab testing

Send a statistically meaningful sample (e.g. a few dozen modules per production lot or per MW block) to an accredited lab for: STC power with low uncertainty (to verify the factory's flash calibration — a systematic +1 % bias is common), EL at high resolution, and selected stress tests (TC, DH, PID, UVID, LeTID) on lot samples. Compare with the PAN file and with factory flash data.

### 5. Traceability

Every module's serial number links to: production date, cell lot, BOM, flash data (Pmp, Isc, Voc, FF), EL image, pallet and container. Deliver as a database. This is what turns a later warranty claim from an argument into a query.`,
        },
      ],
    },
    {
      layer: "theory",
      title: "Construction QA and commissioning tests",
      blocks: [
        {
          kind: "md",
          md: md`### Receiving inspection at site

On arrival: container seal and shock/tilt indicators, pallet damage photos, quantity and serial reconciliation, sample unpacking and visual check, **mobile EL lab** sample (a containerised EL station at site reveals cracks from transport). Storage: flat, on firm ground, within the stacking limit, shaded where specified, and protected from wind (pallets topple in shamal gusts).

### Construction QA hot spots

- **Piling**: pile position (e.g. ±25 mm), height (e.g. ±20 mm), plumbness (≈ ±1–2°), rotation — trackers are intolerant of cumulative error. **Pull-out and lateral load tests** on sample piles validate the geotechnical design (desert soils with cemented layers or loose sand behave very differently). Corrosion protection: galvanising thickness per soil corrosivity.
- **Tracker installation**: torque tube alignment, bearing installation, motor/controller wiring, damper installation, row-end clearances; OEM sign-off on a sample before mass installation.
- **Torque**: module clamps and structural bolts to specified torque with **calibrated** tools; torque marking (paint stripe) to show checked bolts; sample re-check.
- **Module handling**: no stepping or leaning on modules; two-person lift; install within clamping zones defined by the module manual (or the warranty is void and glass breakage rises).
- **Connectors and crimping**: connector halves **must be the same type from the same manufacturer** (IEC 62548-1; IEC 62852 certifies connectors as pairs). "Compatible" connectors from different makers have different contact geometries and materials; contact resistance rises over time, then heating, then arcing and fire. Crimps made with the **manufacturer's specified crimp tool and die**, sample pull tests, visual checks for strands outside the barrel; mated connectors not lying in sand or water; unmated connectors capped.
- **Cables**: trench depth and sand bedding, warning tape, no sharp bends, UV-protected routing on trackers, strain relief at moving joints, cable ties UV-rated (cheap ties embrittle in one Kuwaiti summer).
- **MV**: cable terminations and joints by certified jointers; very low frequency (VLF) withstand and partial-discharge tests on MV cables.
- **Earthing**: continuity of bonding to every structure, earth-resistance measurements.

### Commissioning tests (IEC 62446-1)

**Category 1** (all systems): earth continuity, polarity, combiner box tests, **string Voc** (compare with expected at measured temperature — a deviation of one module's voltage reveals a missing or reversed module or a bypassed substring), **string current** (short-circuit or operational), functional tests (switches, inverter), **insulation resistance** (array to earth; test voltage per IEC 62446-1 table, ≥ 1,000 V for these system voltages; minimum ≈ 1 MΩ per table, but compare strings with each other — low outliers show damaged cables or wet connectors).

**Category 2** (large systems): **I-V curve tracing** per string, translated to STC; **IR thermography** per IEC TS 62446-3 (≥ 600 W/m² stable irradiance; drone surveys for large plants) to find hot cells, hot substrings (bypass diodes conducting), hot connectors and hot junction boxes.

Then: inverter and SCADA commissioning, protection settings, **grid-code compliance tests** with the transmission operator (reactive capability, voltage control, frequency response, fault ride-through evidence), and **performance tests**: capacity test (IEC TS 61724-2, short, clear-sky) and energy/PR test (IEC TS 61724-3, longer) against contract guarantees.`,
        },
        { kind: "equation", formula: "pv-stc-translation" },
        { kind: "equation", formula: "pv-voc-temp" },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "Reading commissioning data",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Translating a string I-V measurement to STC",
          given: md`String of 27 × 580 W modules (nameplate 15,660 W). I-V tracer measured $P_{max} = 12{,}100$ W at POA 850 W/m² (matched reference cell) and cell temperature 55 °C (back-of-module sensor + offset). $\gamma = -0.29$ %/°C. Field measurement uncertainty ≈ ±4 %.`,
          steps: [
            { md: md`**Irradiance factor**: $850/1000 = 0.85$.` },
            { md: md`**Temperature factor**: $1 + (-0.0029)(55 - 25) = 1 - 0.087 = 0.913$.` },
            { md: md`**STC power**: $P_{STC} = 12{,}100/(0.85 \times 0.913) = 12{,}100/0.776 = 15{,}592$ W.` },
            { md: md`**Deviation from nameplate**: $15{,}592/15{,}660 - 1 = -0.44$ %.` },
            { md: md`**Judgement**: well within the ±4 % field uncertainty — this string passes. The value of the data is statistical: plot all strings' deviations; a block with a mean of −3 % or a tail of −8 % strings is the finding, not this single number.` },
          ],
          result: md`$P_{STC}$ ≈ 15.59 kW (−0.4 %): pass. Record the curve shape too — FF, steps and slopes reveal defects that a single power number hides.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A suspicious string",
          given: md`Same string type. Measured $P_{max} = 11{,}200$ W at 820 W/m² and $T_c = 58$ °C. The curve shows a small step at high voltage.`,
          steps: [
            {
              md: md`**Correction denominator**: $0.82 \times [1 - 0.0029 \times 33] = 0.82 \times 0.9043 = 0.7415$.`,
              hidden: true,
              check: { prompt: "Combined correction factor", answer: 0.7415, tolerance: { abs: 0.002 } },
            },
            {
              md: md`**STC power**: $11{,}200/0.7415 = 15{,}104$ W → deviation $-3.55$ %.`,
              hidden: true,
              check: { prompt: "Deviation from nameplate (%)", answer: -3.55, unit: "%", tolerance: { abs: 0.15 } },
            },
            { md: md`**Interpretation**: −3.5 % is inside the ±4 % band *as a number*, but the **step** says one substring is current-limited (shading, soiling patch, cracked cells or a failing bypass diode). Flag for IR thermography and EL of that string.` },
          ],
          result: md`≈ −3.6 % with a stepped curve: not a pass on shape. Numbers and curve shape together decide.`,
        },
        {
          kind: "question",
          question: {
            id: "m02-l07-p1",
            type: "numeric",
            prompt: md`Independent problem. A 27-module string ($V_{oc,STC} = 51.6$ V, $\beta_{V_{oc}} = -0.25$ %/°C) measures **1,292 V** open-circuit at a cell temperature of 40 °C. Expected string Voc is $27 \times V_{oc}(40^\circ\text{C})$. Approximately how many modules' worth of voltage are missing? (Answer as a number of modules, one decimal.)`,
            answer: 1.0,
            tolerance: { abs: 0.15 },
            unit: "modules",
            explanation: md`$V_{oc}(40) = 51.6 \times (1 - 0.0025 \times 15) = 49.67$ V. Expected string Voc $= 27 \times 49.67 = 1{,}341$ V. Missing $= 1{,}341 - 1{,}292 = 49$ V ≈ **1.0 module**. Likely causes: a 26-module string (installation error), a module reversed/shorted, or three bypassed substrings. A shortfall of ≈ 16.6 V (one-third module) would instead point to one conducting/shorted bypass diode.`,
            concepts: ["m02.commissioning-tests"],
            difficulty: 2,
          },
        },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "Running QA as the Employer's PM",
      blocks: [
        {
          kind: "md",
          md: md`### Design review — documents and stages

| Stage | Key deliverables to review |
|---|---|
| Concept / basic design | Layout and block design, PVsyst EYA, SLDs, equipment datasheets, geotechnical and topographic surveys, grid connection concept, design basis report (climate inputs, standards, design life) |
| Detailed design | String sizing and cable calcs, structural/pile design with pull-test programme, tracker design and wind-tunnel report, earthing and lightning studies, protection coordination, SCADA architecture, drainage/hydrology (flash floods in wadis!), fire safety, MV/HV substation design |
| Issued for construction (IFC) | Drawings consistent with approved calcs; ITPs (inspection and test plans) with hold/witness points; method statements |
| As-built | Red-line updates, final string maps, cable schedules, serial-number-to-location map |

Use a **comment-response sheet (CRS)** with status codes (A = approved, B = approved with comments, C = revise and resubmit, D = rejected), track turnaround times contractually (typically 14–21 days), and keep everything in the document control system (e.g. Aconex). The FIDIC principle applies even in IPPs: review does not relieve the contractor of responsibility for its design.

### ITPs, hold and witness points

An **ITP** lists each activity, the acceptance criterion, the reference standard, the record, and the parties' involvement: **H** (hold — work cannot proceed without the inspector's release), **W** (witness — inspector notified and may attend), **R** (review of records). MEWRE/OE hold points typically: first-article inspections (first tracker row, first string, first MV termination), pile pull tests, energisation of each MV circuit, grid-code tests, performance tests.

### Handover

Mechanical completion → commissioning → performance tests → taking over / provisional acceptance (with **punch list**: Category A items block taking-over; B items have a deadline) → defects notification period → final acceptance. Documentation: as-builts, O&M manuals, spare parts list and initial stock, training records, warranties assigned to owner, test records (all strings), IR survey baseline, EL baseline sample, SCADA point list, flash-data database. **The baseline data are the most valuable deliverable** — every later warranty claim compares against them.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Mixed connectors**: the module comes with brand X connectors, the string cable harness with brand Y "compatible" — thousands of mismatched pairs; failures and fires appear in years 2–5 and replacement means re-terminating every string.
- **Wrong crimp tool**: crews use a generic crimper to keep up with schedule; pull-out strength and contact resistance are uncontrolled.
- **Micro-cracks from installation**: modules carried flat by one person or stepped on during cable work; invisible until EL.
- **Pile tolerance accumulation**: survey done only at the start; by mid-site the rows are out and tracker bearings bind.
- **Commissioning paper exercise**: Voc/Isc readings copied across strings ("1,341 V" on every row), insulation tests done in the morning dew and failing at noon, or done at night in dry conditions only.
- **IR survey at low irradiance** (< 600 W/m²) that misses defects.
- **Handover without flash/EL databases** — warranty claims become impossible.`,
        },
        {
          kind: "checklist",
          title: "PM QA checklist from tender to handover",
          items: [
            "Employer's Requirements specify QA rights: factory access, PSI, lab sampling, traceability, ITP hold points",
            "Design review CRS log with turnaround KPIs; design basis report approved first",
            "Factory audit report and production witness reports for every module production lot",
            "Pre-shipment inspection with EL/flash sampling per agreed AQL; independent lab STC verification",
            "Receiving inspection with mobile EL sample; storage inspection",
            "Pile survey and pull-test results; tracker first-row OEM sign-off",
            "Single connector family confirmed (module, harness, extension cables); crimp tools and dies controlled",
            "IEC 62446-1 Cat 1 and Cat 2 records for every string; IR survey at ≥ 600 W/m²",
            "Grid-code compliance tests witnessed; capacity and PR tests per agreed IEC TS 61724-2/-3 method",
            "Punch list categorised; baseline data (flash, EL, IR, I-V) delivered before taking over",
          ],
        },
        {
          kind: "ask",
          title: "Ask the EPC / QA manager",
          items: [
            "Show me the connector bill of materials for module leads, harnesses and extension cables — same manufacturer and type everywhere?",
            "Which crimp tools are in use, how many, and how are they calibrated and controlled?",
            "What is the pile tolerance, how often is the as-built survey done, and how many pull tests per soil zone?",
            "What sample size and acceptance criteria do you use for EL at pre-shipment and at site?",
            "How will you measure and present string-level I-V and insulation results so outliers are visible?",
          ],
        },
        { kind: "scenario", scenario: "m02-s7" },
        {
          kind: "feynman",
          prompt: "Explain to a new site engineer why a PV plant with millions of small connectors can be ruined by a single shortcut in connector selection or crimping, and what controls prevent it.",
          keyPoints: [
            "Each string has dozens of connections; a plant has millions",
            "Mixed or badly crimped connectors have higher contact resistance that grows over time",
            "Resistance causes heating, arcing and fires, often after years",
            "IEC 62548 requires same type and manufacturer for mated connectors",
            "Controls: connector BOM check, specified crimp tools, pull tests, IR thermography",
          ],
        },
        { kind: "sources", refs: ["iec-62446-1", "iec-ts-62446-3", "iec-ts-60904-13", "iec-60891", "iec-62548", "iec-61724-2-3", "pvel-scorecard"] },
      ],
    },
  ],
  quiz: [
    {
      id: "m02-l07-q1",
      type: "mcq",
      prompt: md`Why must mated PV connectors be of the same type from the same manufacturer?`,
      options: [
        "For aesthetic consistency",
        "Different makers' contact geometries and materials can give rising contact resistance, heating and arcing over time; certification (IEC 62852) applies to matched pairs",
        "Because mixed connectors cannot physically be mated",
        "Only to keep the warranty paperwork simple",
      ],
      answer: 1,
      explanation: md`Mixed "compatible" connectors often mate mechanically but are not certified together; contact resistance drifts up with thermal cycling and dust, leading to heating, arcing and fires — one of the most common PV fire causes.`,
      concepts: ["m02.construction-qa"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m02-l07-q2",
      type: "order",
      prompt: md`Put the module QA steps in chronological order.`,
      items: [
        "Factory audit",
        "Production witness of the locked BOM",
        "Pre-shipment inspection with EL/flash sampling",
        "Receiving inspection at site with mobile EL",
        "IR thermography after energisation",
      ],
      explanation: md`Audit the factory, watch your production, inspect before shipping, inspect on arrival, then verify in operation.`,
      concepts: ["m02.module-procurement-qa", "m02.commissioning-tests"],
      difficulty: 1,
    },
    {
      id: "m02-l07-q3",
      type: "numeric",
      prompt: md`A string I-V trace gives $P_{max} = 13{,}000$ W at 900 W/m² and cell temperature 50 °C ($\gamma = -0.29$ %/°C). What is the STC-translated power in W?`,
      answer: 15573,
      tolerance: { rel: 0.01 },
      unit: "W",
      explanation: md`Denominator $= 0.9 \times [1 - 0.0029 \times 25] = 0.9 \times 0.9275 = 0.8348$. $P_{STC} = 13{,}000/0.8348 = 15{,}573$ W ≈ 15.57 kW (−0.6 % vs a 15,660 W nameplate).`,
      concepts: ["m02.commissioning-tests"],
      difficulty: 2,
    },
    {
      id: "m02-l07-q4",
      type: "multi",
      prompt: md`Which are IEC 62446-1 Category 1 tests? Select all.`,
      options: ["Earth continuity", "String open-circuit voltage", "Insulation resistance", "I-V curve tracing", "IR thermography"],
      answer: [0, 1, 2],
      explanation: md`Category 1 covers continuity, polarity, Voc, current, functional and insulation tests. I-V tracing and IR thermography are Category 2 (additional tests for larger systems).`,
      concepts: ["m02.commissioning-tests"],
      difficulty: 2,
    },
    {
      id: "m02-l07-q5",
      type: "decision",
      prompt: md`You are the MEWRE OE-side PM. A site audit finds that about 20 % of strings in one block use extension cables with a different connector brand from the module leads. The EPC proposes to "monitor with IR during O&M". What do you require?`,
      options: [
        { text: "Accept IR monitoring — failures will be caught.", score: 0.1, feedback: "IR may catch failures after damage; mixed connectors are a known fire risk and a non-conformance." },
        { text: "Raise an NCR: replace mismatched connectors (or the extension cables) before taking over, audit all blocks for the same issue, and update the procurement control for connectors.", score: 1, feedback: "Correct: fix the non-conformance at the cheapest point, and check for systemic spread." },
        { text: "Accept with an extended warranty on connectors.", score: 0.3, feedback: "A warranty pays after a fire; it does not prevent it." },
      ],
      explanation: md`Mixed connectors breach IEC 62548-1 design requirements and connector certifications. Correcting before energisation or taking over is far cheaper and safer than later.`,
      concepts: ["m02.construction-qa"],
      difficulty: 2,
    },
    {
      id: "m02-l07-q6",
      type: "mcq",
      prompt: md`What minimum irradiance does IEC TS 62446-3 call for during IR thermography of PV modules?`,
      options: ["200 W/m²", "400 W/m²", "600 W/m²", "1000 W/m²"],
      answer: 2,
      explanation: md`At least 600 W/m² of stable irradiance so defects create a measurable temperature difference. Surveys at low sun or under passing clouds miss defects.`,
      concepts: ["m02.commissioning-tests"],
      difficulty: 1,
    },
    {
      id: "m02-l07-q7",
      type: "short",
      prompt: md`List the baseline data you would insist on receiving at handover of a PV plant and explain why each matters.`,
      rubric: [
        "Flash-test data per serial number (warranty claims, mismatch analysis)",
        "EL images (crack baseline)",
        "String I-V and insulation results (degradation and fault tracking)",
        "IR survey (hot-spot baseline)",
        "As-built string maps and serial-to-location map",
        "Warranties assigned, O&M manuals, spares",
      ],
      modelAnswer: md`Flash data and serial-to-location maps let you prove under-performance against the warranty for specific modules. EL images document cracks at handover, so later cracks can be attributed. String I-V curves and insulation resistance give a baseline for degradation and fault tracking. An IR survey baseline separates pre-existing hot spots from new ones. As-builts, warranties (assigned to the owner), O&M manuals and spare lists make the plant operable and claims enforceable.`,
      explanation: md`Baseline data convert future disputes into comparisons. Without them, every warranty claim begins with "prove it was not like this at handover".`,
      concepts: ["m02.commissioning-tests", "m02.module-procurement-qa"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m02-l07-f1", front: "IEC 62446-1", back: "Commissioning tests and documentation for grid-connected PV (Category 1 and 2 tests).", concepts: ["m02.commissioning-tests"] },
    { id: "m02-l07-f2", front: "Category 2 commissioning tests", back: "String I-V curve tracing and IR thermography.", concepts: ["m02.commissioning-tests"] },
    { id: "m02-l07-f3", front: "Minimum irradiance for IR thermography (IEC TS 62446-3)", back: "≥ 600 W/m², stable.", concepts: ["m02.commissioning-tests"] },
    { id: "m02-l07-f4", front: "Hold point vs witness point", back: "Hold: work cannot proceed without inspector release. Witness: inspector notified and may attend.", concepts: ["m02.construction-qa"] },
    { id: "m02-l07-f5", front: "Pre-shipment inspection (PSI)", back: "Random sampling of packed modules before shipping: visual, EL, flash re-test, packaging; AQL per ISO 2859-1.", concepts: ["m02.module-procurement-qa"] },
    { id: "m02-l07-f6", front: "Mobile EL lab", back: "Containerised electroluminescence station at site to detect transport/installation micro-cracks.", concepts: ["m02.module-procurement-qa", "m02.construction-qa"] },
    { id: "m02-l07-f7", front: "String Voc short by ≈ one-third module voltage", back: "Suggests one shorted/conducting bypass diode (one substring bypassed).", concepts: ["m02.commissioning-tests"] },
    { id: "m02-l07-f8", front: "Connector rule", back: "Mated connectors: same type, same manufacturer (IEC 62548-1; pairs certified per IEC 62852); crimp with specified tool.", concepts: ["m02.construction-qa"] },
    { id: "m02-l07-f9", front: "Capacity test vs energy test", back: "IEC TS 61724-2 short clear-sky capacity test; IEC TS 61724-3 longer energy/PR test.", concepts: ["m02.commissioning-tests"] },
  ],
  scenarios: [
    {
      id: "m02-s7",
      title: "Two weeks to taking over",
      dayInLife: true,
      context: md`A 500 MW PV IPP is two weeks from its scheduled taking-over and COD under the PPA. MEWRE's grid team is ready to accept energy. You are the MEWRE PM; the OE's site inspector sends you three findings at 07:30.`,
      start: "a",
      concepts: ["m02.construction-qa", "m02.commissioning-tests", "m02.design-review"],
      nodes: {
        a: {
          md: md`Findings: (1) Drone IR survey shows 0.4 % of modules with hot substrings, clustered in two blocks. (2) Insulation-resistance records for 300 strings show identical values to one decimal — likely copied. (3) The flash-data database has not been delivered. The IPP wants to proceed to COD on schedule. What is your priority?`,
          choices: [
            { text: "Treat the copied insulation records as the most serious (integrity of test records and safety): require re-testing of those strings witnessed by the OE before energisation acceptance; put IR clusters and the flash database on the punch list with deadlines.", next: "b", score: 10, feedback: "Right ranking: falsified safety tests are a hold issue; the IR cluster and data are important but manageable as punch items." },
            { text: "Block COD until all three are fully closed.", next: "b", score: 5, feedback: "Defensible but may not be proportionate; check what the PPA allows as conditions for COD." },
            { text: "Allow COD; deal with everything in O&M.", next: "c", score: 1, feedback: "You lose leverage at exactly the point where you have the most." },
          ],
        },
        b: {
          md: md`Re-tests reveal 11 strings with low insulation resistance, traced to damaged cables at tracker bearing points. The two IR-cluster blocks have cracked cells consistent with modules stepped on during cable installation. What do you require?`,
          choices: [
            { text: "Repair the 11 strings before COD; for the cracked-cell blocks, EL survey of both blocks, replacement of modules exceeding the agreed crack criteria, and a root-cause note on installation practice; record in the punch list and lessons learned.", next: "d", score: 10, feedback: "Safety first, then quality with defined criteria and root cause." },
            { text: "Replace only modules showing hot spots today.", next: "d", score: 5, feedback: "Cracks propagate; modules without hot spots today may develop them. EL defines the scope." },
          ],
        },
        c: {
          md: md`Eight months later, a ground fault at a tracker bearing point causes a small fire. The investigation finds that insulation tests were never actually done on that block. What is the institutional lesson?`,
          choices: [
            { text: "Test records must be witnessed or sample-verified by the OE before acceptance; acceptance gives leverage that disappears afterwards.", score: 7, feedback: "Correct lesson, learnt expensively." },
          ],
        },
        d: {
          md: md`COD slips 6 days. The IPP asks whether MEWRE will treat the delay as Employer-caused (it is not). How do you document the decision?`,
          choices: [
            { text: "Formal letter citing the test results, NCRs and the PPA conditions precedent for COD, with the OE's report attached; brief the Director in a one-page memo.", score: 10, feedback: "Contemporaneous, evidence-based records protect MEWRE in any later claim." },
            { text: "A phone call to the IPP's project director.", score: 2, feedback: "Decisions with commercial consequences must be in writing." },
          ],
        },
      },
    },
  ],
};

export default lesson;
