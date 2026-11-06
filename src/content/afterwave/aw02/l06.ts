import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw02-l06",
  title: "Data quality and provenance",
  summary:
    "What makes bench data trustworthy years later: calibration metadata and traceability, measurement uncertainty, units and channel naming conventions, versioning of firmware, rigs, procedures and code, lineage from raw file to report, checksums and tamper evidence, and the automated quality checks (completeness, gaps, saturation, flatlines, consistency) that catch bad data before anyone draws conclusions from it.",
  minutes: 75,
  objectives: [
    "List the calibration metadata a channel needs and explain traceability to SI through accredited labs",
    "Combine independent uncertainty components into a combined and expanded uncertainty",
    "Design a channel naming convention and unit policy that survive across rigs and years",
    "Describe lineage from raw file to derived result, and the role of checksums and versioning",
    "Specify automated data quality checks and compute completeness for a run",
  ],
  concepts: [
    { id: "aw02.calibration-metadata", name: "Calibration metadata and traceability", description: "Sensor serial, certificate id, calibration date and due date, as-found and as-left results, sensitivity and offset, uncertainty, and the accredited (ISO/IEC 17025) lab that links the result to SI through national metrology institutes.", competency: "aw-data", related: ["aw02.measurement-uncertainty", "aw02.signal-chain"] },
    { id: "aw02.measurement-uncertainty", name: "Measurement uncertainty", description: "Independent standard uncertainties combine by root sum of squares; expanded uncertainty U = k·u_c with k = 2 for about 95 % coverage (GUM, JCGM 100).", competency: "aw-data", related: ["aw02.calibration-metadata"] },
    { id: "aw02.channel-naming", name: "Channel naming and units", description: "A hierarchical, documented naming convention (rig, subsystem, location, quantity, index) and an explicit unit per channel, preferably SI with machine-readable codes, so data from different rigs and years can be compared.", competency: "aw-data", related: ["aw02.lineage"] },
    { id: "aw02.lineage", name: "Versioning and lineage", description: "Recording which raw files, code versions, parameters and people produced each derived dataset or result (entities, activities, agents in W3C PROV terms), with firmware, rig, procedure and configuration versions attached to every run.", competency: "aw-data", related: ["aw02.checksums", "aw02.channel-naming"] },
    { id: "aw02.checksums", name: "Checksums and tamper evidence", description: "Cryptographic hashes (for example SHA-256) per file prove a file is unchanged; chaining manifest hashes makes deletions or edits detectable; CRCs catch accidental corruption in transit.", competency: "aw-data", related: ["aw02.lineage"] },
    { id: "aw02.data-quality-checks", name: "Automated data quality checks", description: "Completeness, gaps and dropped buffers, timestamp monotonicity, range, saturation at ADC rails, flatlines from stuck sensors, spikes, NaNs, cross-channel consistency and calibration-due status, run automatically on every capture.", competency: "aw-data", related: ["aw02.calibration-metadata", "m12.data-quality"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From a number to evidence",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Bench memory compounds in value only if old data can be trusted and compared with new data. Ripple's recommendations, any model trained in Enclave and, further out, any safety evidence built on bench data are only as good as the calibration, units, versions and lineage behind each number. Provenance is also what a technical buyer and, later, an assessor or insurer will probe. If you can explain it precisely, you turn "data platform" into "evidence layer", which is the positioning Afterwave wants.`,
        },
        {
          kind: "md",
          md: md`### Calibration metadata and traceability

A sensor's output is converted to physical units with constants from its **calibration**. A useful calibration record per channel contains:

| Field | Example (illustrative) | Why |
|---|---|---|
| Sensor model and serial | Load cell LC-500, s/n 18342 | Links the channel to a physical object |
| Certificate id and lab | Cert 2026-0912, ISO/IEC 17025 accredited lab | Traceability and audit |
| Calibration date and due date | 2026-09-12, due 2027-09-12 | Was it in calibration during the test? |
| Sensitivity and offset | 2.0013 mV/V, zero 0.0004 mV/V | The constants actually used in conversion |
| As-found / as-left | Within tolerance / adjusted | If found out of tolerance, earlier data are suspect |
| Uncertainty | 0.05 % FS (k = 1) | Input to the uncertainty budget |

**Traceability** means an unbroken chain of calibrations, each with stated uncertainty, from the sensor back to SI units realised by a national metrology institute (for example PTB in Germany, METAS in Switzerland, VSL in the Netherlands, NIST in the US). Labs accredited to **ISO/IEC 17025** have been audited for competence to produce such results.

The **as-found** result is easy to overlook and important: if a load cell comes back from its annual calibration found out of tolerance, every test since its previous calibration may be affected. Answering "which tests used this sensor in that period?" is a change-impact question, and only possible if each run records which serial was on which channel.

### Measurement uncertainty

The GUM (JCGM 100, *Guide to the Expression of Uncertainty in Measurement*) is the reference method. Each independent source contributes a **standard uncertainty** $u_i$ (one standard deviation, in the units of the result). Datasheet limits given as "±a" with no distribution are usually treated as rectangular, with $u = a/\sqrt{3}$. Independent components combine by root sum of squares, and the result is expanded with a coverage factor:`,
        },
        { kind: "equation", formula: "aw02-combined-uncertainty" },
        {
          kind: "md",
          md: md`Report a result as value ± U with $k$ stated. A measured difference between two runs smaller than the combined uncertainty of the difference is not evidence of change: this matters when Ripple-style analysis compares results before and after a firmware update.

### Units and channel naming

Units seem trivial until they are wrong. NASA's Mars Climate Orbiter was lost in 1999 because one software component produced thruster impulse in pound-force seconds while the navigation software expected newton seconds. Rules that prevent this class of error:

- Every channel carries an explicit **unit** in its metadata, never only in a column header or in someone's head.
- Prefer **SI** units and a machine-readable unit code (for example UCUM codes such as N.m, Cel, A) so software can check and convert.
- Store **raw values plus the conversion** (Lesson 4), so a wrong scale can be corrected later.

A **naming convention** turns thousands of channels into something searchable. A common pattern is hierarchical:

$$\text{rig}.\text{subsystem}.\text{location}.\text{quantity}[\_\text{index}]$$

for example **edu2.inv.phase_u.current**, **edu2.motor.stator_u.temp**, **act1.joint2.output.torque**. The convention must be documented, versioned and enforced at capture, with an alias table mapping legacy names ("Temp3", "TC_new") to standard ones.

### Versioning: what was actually tested

A result means nothing without the configuration it was produced under. Each run should record:

- **Device under test:** hardware revision, serial, firmware build (version and commit hash), calibration parameters, model version for AI components.
- **Rig:** configuration version (sensors, wiring, fixtures), DAQ configuration, channel list version.
- **Procedure:** test specification and its version, sequencer script version, limits.
- **Software:** versions of the recorders, converters and analysis code.

These are also exactly the inputs a change-impact engine needs: if a test's recorded dependencies include firmware module X and rig fixture Y, a change to either makes it a candidate for rerun.

### Lineage

**Lineage** (provenance) answers: where did this number come from? The W3C PROV model expresses it with three kinds of things: **entities** (files, datasets, reports), **activities** (acquisition, conversion, analysis) and **agents** (people, software), linked by relations such as "was generated by", "used" and "was derived from". In practice: every derived dataset records the raw files (by checksum) it used, the code version and parameters that produced it, and when and by whom it was run. Raw data are immutable; derived data can be deleted and rebuilt.`,
        },
        {
          kind: "flow",
          title: "Lineage of a reported number",
          steps: [
            { label: "Raw files", detail: "TDMS, MDF4, logs, video; SHA-256 at ingest" },
            { label: "Run record", detail: "DUT, rig, procedure and software versions; calibration ids" },
            { label: "Conversion", detail: "Code version, conversion rules, clock alignment fit" },
            { label: "Derived dataset", detail: "Columnar tables with units; links to raw checksums" },
            { label: "Analysis", detail: "Notebook or pipeline version, parameters, author" },
            { label: "Reported result", detail: "Value ± U with links back through each step" },
          ],
          caption: "Each arrow is a recorded relation. If any link is missing, the result cannot be reproduced or defended.",
        },
        {
          kind: "md",
          md: md`### Checksums and tamper evidence

A **cryptographic hash** such as SHA-256 maps a file to a 256-bit fingerprint; any change to the file changes the hash, and producing a different file with the same hash is computationally infeasible. Recording the hash at ingest lets anyone later prove the file is the one captured. **CRCs** (cyclic redundancy checks) are cheaper and catch accidental corruption in transit or storage but are not secure against deliberate changes. To make deletions and edits of records detectable, each run manifest can include the hash of the previous manifest (a **hash chain**): altering any past record breaks every later link.

### Automated data quality checks

Run on every capture, before anyone analyses the data:

| Check | What it catches |
|---|---|
| **Completeness** $C = N_{received}/(f_s T)$ | Dropped buffers, recorder crashes |
| **Gaps and monotonic timestamps** | Missing segments, clock steps, duplicated blocks |
| **Range and saturation** | Values at ADC rails (clipped peaks), physically impossible values |
| **Flatline** (near-zero variance over a window) | Stuck or disconnected sensor |
| **Spikes and NaNs** | Interference, conversion errors |
| **Cross-channel consistency** | Three-wire phase currents summing to near zero; DC power vs AC power plus losses; two thermocouples at one point agreeing |
| **Metadata checks** | Calibration overdue, unit missing, channel not in the naming convention, version fields empty |`,
        },
        { kind: "equation", formula: "aw02-completeness" },
      ],
    },
    {
      layer: "applied",
      title: "Uncertainty budgets and completeness in numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Uncertainty of a load cell channel",
          given: md`Illustrative 500 N load cell channel. Standard uncertainties (k = 1), as % of full scale: calibration 0.05 %, nonlinearity and hysteresis 0.03 %, temperature effect over the test range 0.02 %, DAQ gain and offset 0.01 %. Assume independence.`,
          steps: [
            { md: md`$u_c = \sqrt{0.05^2 + 0.03^2 + 0.02^2 + 0.01^2} = \sqrt{0.0039} = 0.0624$ % FS.` },
            { md: md`Expanded, $k = 2$: $U = 0.125$ % FS, which is $0.00125\times 500 = 0.62$ N.` },
            { md: md`**Reading it:** a measured force of 312.4 N is reported as 312.4 ± 0.6 N (k = 2). The calibration term dominates; improving the DAQ would hardly change $U$.` },
            { md: md`**Comparing two runs:** if run A gives 312.4 N and run B (after a firmware change) gives 312.9 N with the same sensor, the difference of 0.5 N is within the uncertainty of the difference (for fully independent runs about $\sqrt{2}\times 0.62 \approx 0.88$ N; less if the calibration error is common to both runs and cancels). Not evidence of a change on its own.` },
          ],
          result: md`$U \approx 0.62$ N (k = 2) at 500 N full scale. Uncertainty budgets tell you which component to improve and when an observed change is real.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Did the recorder drop data?",
          given: md`Illustrative: a channel configured at 10 kS/s records for exactly 1 hour. The file contains 35,964,000 samples, and every stored value looks plausible.`,
          steps: [
            { md: md`Expected samples: $10{,}000\times 3{,}600 = 36{,}000{,}000$.` },
            {
              md: md`Completeness $C = 35{,}964{,}000/36{,}000{,}000 = 0.999$.`,
              hidden: true,
              check: { prompt: "Completeness C (fraction)", answer: 0.999, tolerance: { abs: 0.0001 } },
            },
            {
              md: md`Missing data: $36{,}000/10{,}000 = 3.6$ s.`,
              hidden: true,
              check: { prompt: "Missing duration (s)", answer: 3.6, unit: "s", tolerance: { abs: 0.01 } },
            },
            { md: md`If the timestamps are computed from sample index rather than stored, everything after the gap is shifted by up to 3.6 s, silently. The gap locations (from buffer counters or timestamp jumps) must be found and recorded.` },
          ],
          result: md`99.9 % complete sounds fine, but 3.6 s of missing data can hide the event of interest and shift timing. Completeness checks must also locate gaps.`,
        },
        {
          kind: "question",
          question: {
            id: "aw02-l06-p1",
            type: "numeric",
            prompt: md`A load cell's certificate gives a sensitivity of 2.0015 mV/V, but the DAQ was configured with the nominal 2.000 mV/V. Full scale is 500 N. When the true load is 400 N, what force (N) does the DAQ report? (One decimal.)`,
            answer: 400.3,
            unit: "N",
            tolerance: { abs: 0.05 },
            explanation: md`The cell outputs $2.0015\times V_{ex}\times 400/500$. The DAQ divides by $2.000\times V_{ex}$ and multiplies by 500: reported $= 400\times 2.0015/2.000 = 400.3$ N. A 0.075 % error, small but systematic, and correctable later only if the raw values and the configured constant were stored.`,
            concepts: ["aw02.calibration-metadata"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Provenance in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who owns it in a test organisation

- **Metrology or calibration coordinator:** keeps the calibration register, sends sensors out, handles out-of-tolerance notices.
- **Test engineers:** set up channel lists, enter constants, run tests; often maintain naming by habit rather than rule.
- **Quality and certification:** need traceable evidence for audits (for example ISO 9001 or IATF 16949 in automotive, customer audits, and conformity assessment work).
- **Data or tools team (if any):** builds pipelines, often without access to calibration records.

The weak points are the hand-offs: the calibration register and the DAQ configuration are separate systems; firmware versions live in a flashing tool's log; the channel list spreadsheet is not versioned.`,
        },
        { kind: "sources", refs: ["aw02-r9", "aw02-r10", "aw02-r11", "aw02-r17"] },
        { kind: "xref", to: "m12-l01", note: "Track 0: data quality for PV monitoring systems (completeness, calibration, consistency), the same discipline applied to plant SCADA data." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Provenance failures that cost real money",
          md: md`- **Out-of-tolerance sensor, unknown blast radius:** the calibration lab reports a torque transducer 0.8 % out; nobody can list which runs used it, so a month of tests is repeated.
- **Firmware in the file name only:** "fw321" in a file name that someone forgot to change; the analysis attributes a regression to the wrong build.
- **Silent unit change:** a converter update switches a channel from bar to kPa; plots across the change show a 100x step.
- **Overwritten raw files:** a reprocessing script writes back to the same path; the original is gone and nobody notices until an audit.
- **Pipeline without code versions:** last year's report cannot be reproduced because the analysis notebook changed.`,
        },
        {
          kind: "checklist",
          title: "Minimum provenance for every captured run",
          items: [
            "Run id, rig id, start and end time in UTC, operator (or pseudonym)",
            "DUT hardware revision, serial and firmware or model version with commit hash",
            "Rig configuration version and channel list version",
            "Per channel: standard name, unit, sensor serial, calibration certificate id and due date, constants used",
            "Test procedure and sequencer script versions",
            "Raw file list with SHA-256 checksums; clock alignment parameters and residuals",
            "Automated quality check results stored with the run (completeness, saturation, flatlines, metadata gaps)",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask a prospect about data quality",
          items: [
            "When a sensor comes back out of tolerance, how do you find the affected tests, and how long does it take?",
            "Where is the firmware version for each run recorded, and has it ever been wrong?",
            "Do you have a channel naming convention, and what share of your historical data follows it?",
            "Can you reproduce a result from a report you issued a year ago?",
            "Which automated checks run on new data before engineers look at it?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw02-l06-p2",
            type: "short",
            prompt: md`Write a **run manifest** specification for an illustrative endurance run on a drive test rig: the fields grouped into sections (identity, device under test, rig and channels, procedure, files and integrity, timing, quality checks), with an example value for each field and one sentence on how the manifest would let Ripple or a quality engineer answer the question "which runs are affected if torque transducer s/n 18342 is found out of tolerance?".`,
            explanation: md`A good manifest makes every run self-describing and links each channel to a physical sensor and calibration. That is what turns an out-of-tolerance notice into a query instead of an investigation.`,
            rubric: [
              "Covers all the requested sections with specific fields and plausible example values",
              "Channel entries link standard name, unit, sensor serial and calibration certificate with dates and constants used",
              "Versions are precise (firmware with commit hash, procedure and rig configuration versions), not free text",
              "Integrity: raw file list with SHA-256 checksums and, ideally, a link to the previous manifest's hash",
              "Timing and quality sections include clock alignment parameters and stored check results",
              "Explains the out-of-tolerance query concretely: filter runs whose channels reference s/n 18342 between the last good calibration and the failed one",
            ],
            modelAnswer: md`Illustrative run manifest.

**Identity:** run_id EDU2-20270115-003; rig_id EDU2; start 2027-01-15T07:58:12Z; end 2027-01-15T19:58:40Z; operator op-07; manifest_version 1.2.

**Device under test:** product drive-unit-B; hw_rev C2; serial DU-00417; inverter firmware 3.2.1 (commit 7c2e91a); motor control parameters set MCP-14; model version not applicable.

**Rig and channels:** rig_config v18 (dated 2027-01-10, change: new coolant pump); channel_list v18; per channel, for example: name edu2.dyno.shaft.torque, unit N.m, sensor torque flange s/n 18342, cert 2026-0912 (lab accredited to ISO/IEC 17025), calibrated 2026-09-12, due 2027-09-12, sensitivity 2.0013 mV/V, zero offset at start 0.0004 mV/V, filter 1 kHz, rate 10 kS/s.

**Procedure:** test spec ENDUR-07 rev D; sequencer script endurance.py v2.4.0; limits file limits-ENDUR-07-D.

**Files and integrity:** raw files with SHA-256 (EDU2-20270115-003.tdms, the .tdms_index, can.mf4, screen.mp4, sequencer.csv, dbc file hash); previous_manifest_sha256 of run EDU2-20270115-002.

**Timing:** reference clock DAQ chassis; PC fit offset 0.182 s, drift 38.4 ppm, residual p95 0.9 ms; CAN fit residual p95 0.3 ms.

**Quality checks:** completeness 1.000 on all channels; no saturation; flatline none; calibration overdue none; unit missing none.

**Out-of-tolerance query:** because every run lists the serial on each channel with its calibration certificate, Ripple or a quality engineer can select all runs where any channel references s/n 18342 between its last in-tolerance calibration (2026-09-12) and the date it was found out of tolerance, list the tests and results that depended on that channel, and flag them for review or rerun.`,
            concepts: ["aw02.calibration-metadata", "aw02.lineage", "aw02.checksums", "aw02.data-quality-checks"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an insurer's risk engineer what makes a bench measurement usable as evidence years after it was taken.",
          keyPoints: [
            "The sensor was calibrated with traceability to SI, and the calibration record is linked to the data",
            "The value has a stated uncertainty",
            "Units, channel identity and configuration versions are recorded with the data",
            "The raw file is unchanged, proven by a checksum, and derived results trace back to it",
            "Automated quality checks were run and their results stored",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw02-l06-q1",
      type: "numeric",
      prompt: md`Three independent standard uncertainties for a temperature measurement: 0.4 °C, 0.3 °C and 1.2 °C. What is the expanded uncertainty with k = 2 (°C)?`,
      answer: 2.6,
      unit: "°C",
      tolerance: { abs: 0.02 },
      explanation: md`$u_c = \sqrt{0.16 + 0.09 + 1.44} = \sqrt{1.69} = 1.3$ °C; $U = 2\times 1.3 = 2.6$ °C. The 1.2 °C term (for example a thermocouple tolerance) dominates.`,
      concepts: ["aw02.measurement-uncertainty"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "aw02-l06-q2",
      type: "mcq",
      prompt: "A torque transducer is found out of tolerance at its annual calibration. Why is the as-found result important?",
      options: [
        "It sets next year's calibration price",
        "It means tests since the previous calibration may be affected and must be identified",
        "It proves the transducer was always faulty",
        "It is only relevant to the calibration lab",
      ],
      answer: 1,
      explanation: md`As-found out of tolerance puts every result since the last good calibration in question. Only run records that link channels to serials make the affected set findable.`,
      concepts: ["aw02.calibration-metadata"],
      difficulty: 1,
    },
    {
      id: "aw02-l06-q3",
      type: "mcq",
      prompt: "What does a SHA-256 checksum recorded at ingest let you prove later?",
      options: [
        "That the data are physically correct",
        "That the file is bit-for-bit the one captured",
        "That the sensor was calibrated",
        "That the file was compressed",
      ],
      answer: 1,
      explanation: md`A hash proves integrity (unchanged), not correctness. Correctness needs calibration, uncertainty and quality checks.`,
      concepts: ["aw02.checksums"],
      difficulty: 1,
    },
    {
      id: "aw02-l06-q4",
      type: "numeric",
      prompt: md`A channel at 1 kS/s ran for 8 hours and stored 28,771,200 samples. What is its completeness (as a fraction, 4 decimals)?`,
      answer: 0.999,
      tolerance: { abs: 0.0001 },
      explanation: md`Expected $1{,}000\times 28{,}800 = 28{,}800{,}000$. $C = 28{,}771{,}200/28{,}800{,}000 = 0.9990$: 28.8 s missing somewhere.`,
      concepts: ["aw02.data-quality-checks"],
      difficulty: 1,
    },
    {
      id: "aw02-l06-q5",
      type: "multi",
      prompt: "Which automated checks would catch a disconnected thermocouple or a clipped current peak? (Select all that apply.)",
      options: ["Flatline or out-of-range check", "Saturation check at ADC rails", "Checksum verification", "Completeness check"],
      answer: [0, 1],
      explanation: md`An open thermocouple usually reads a fixed or out-of-range value (many instruments drive it to full scale); a clipped peak sits at the rail. Checksums prove integrity; completeness detects missing samples, not wrong values.`,
      concepts: ["aw02.data-quality-checks"],
      difficulty: 2,
    },
    {
      id: "aw02-l06-q6",
      type: "order",
      prompt: "Order the steps of lineage for a reported number, from source to result.",
      items: [
        "Raw file captured and hashed",
        "Run record with versions and calibration ids",
        "Conversion with code version and alignment fit",
        "Derived dataset linked to raw checksums",
        "Analysis with notebook version and parameters",
        "Reported value with uncertainty",
      ],
      explanation: md`Each step records what it used and produced; a gap anywhere breaks reproducibility.`,
      concepts: ["aw02.lineage"],
      difficulty: 1,
    },
    {
      id: "aw02-l06-q7",
      type: "decision",
      prompt: md`A prospect's historical data use 40 different names for what is physically the same winding temperature channel. They ask you to "just fix the names" before a pilot. What do you propose?`,
      options: [
        { text: "Rename all historical files in place.", score: 0, feedback: "Modifies raw evidence and loses the link to the original names." },
        { text: "Agree a documented naming convention for new captures, build a versioned alias table mapping legacy names to standard ones, apply it in the derived layer, and leave raw files untouched.", score: 1, feedback: "Correct: standardise going forward, map the past, keep originals." },
        { text: "Ignore names; analysts will figure it out.", score: 0.1, feedback: "That is the status quo the pilot should improve." },
      ],
      explanation: md`Naming is fixed at capture going forward and mapped for history; raw data stay immutable.`,
      concepts: ["aw02.channel-naming", "aw02.lineage"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw02-l06-f1", front: "Combined and expanded uncertainty", back: md`$u_c = \sqrt{\sum u_i^2}$, $U = k u_c$, k = 2 for about 95 %`, concepts: ["aw02.measurement-uncertainty"] },
    { id: "aw02-l06-f2", front: "Rectangular limit ±a to standard uncertainty", back: md`$u = a/\sqrt{3}$`, concepts: ["aw02.measurement-uncertainty"] },
    { id: "aw02-l06-f3", front: "Traceability", back: "Unbroken chain of calibrations with stated uncertainties back to SI at a national metrology institute; labs accredited to ISO/IEC 17025.", concepts: ["aw02.calibration-metadata"] },
    { id: "aw02-l06-f4", front: "W3C PROV core types", back: "Entities (data), activities (processes), agents (people, software)", concepts: ["aw02.lineage"] },
    { id: "aw02-l06-f5", front: "Hash vs CRC", back: "SHA-256: integrity against deliberate change. CRC: detects accidental corruption only.", concepts: ["aw02.checksums"] },
    { id: "aw02-l06-f6", front: "Mars Climate Orbiter lesson", back: "Lost in 1999 when pound-force seconds were read as newton seconds: units must travel with the data.", concepts: ["aw02.channel-naming"] },
    { id: "aw02-l06-f7", front: "Completeness", back: md`$C = N_{received}/(f_s T)$; also locate the gaps`, concepts: ["aw02.data-quality-checks"] },
  ],
};

export default lesson;
