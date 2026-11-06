import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw03-l05",
  title: "Reporting and traceability of runs: artefacts, metadata, verdicts and dashboards",
  summary:
    "What a test run must leave behind to count as evidence: identity, baseline (firmware, hardware, parameters, model, rig configuration), instruments and calibration, verdicts that separate fail from error, raw data in standard formats, and links to requirements. Data volumes and retention, requirements coverage on a baseline and why it collapses after a change, the test management and data tools in use, and what a dashboard should show a validation lead.",
  minutes: 80,
  objectives: [
    "List the metadata a run record needs so that a result can be interpreted and defended years later",
    "Use a verdict taxonomy that separates DUT failures from bench errors and pass-on-retry",
    "Estimate raw data volumes from channels, sample rates and sample size, and plan retention",
    "Compute requirements coverage on a baseline and explain what happens to it after a change",
    "Specify a minimum run record for a capture pilot",
  ],
  concepts: [
    { id: "aw03.run-record", name: "Run record", description: "The structured evidence a test run leaves: identity, baseline (firmware hash, hardware revision and serial, parameter set, plant model, rig configuration), instruments with calibration status, sequence version, parameters, timestamps with clock source, operator or trigger, verdicts, measurements with limits and units, links to raw data and requirements.", competency: "aw-test", related: ["aw03.hardware-ci-pipeline"] },
    { id: "aw03.verdict-taxonomy", name: "Verdict taxonomy", description: "Pass, fail (the DUT violated a limit), error (the bench could not execute the test), inconclusive, not run or blocked, plus pass-on-retry recorded separately; mixing fail and error destroys flake and regression statistics.", competency: "aw-test", related: ["aw03.flaky-test", "aw03.run-record"] },
    { id: "aw03.baseline-coverage", name: "Coverage on a baseline", description: "Fraction of in-scope requirements with a valid passing run on the current baseline; after any change to firmware, hardware, parameters, model or rig, earlier results are evidence only where they are rerun or justified as unaffected.", competency: "aw-test", related: ["aw03.run-record"] },
    { id: "aw03.test-data-formats", name: "Test data formats", description: "ASAM MDF4 and NI TDMS for measurement data, HDF5 and Parquet for analysis, MCAP and ROS bags for robotics, JUnit XML for CI verdicts, ATML (IEEE 1671) for test descriptions and results; metadata must travel with the data.", competency: "aw-test", related: ["aw03.run-record"] },
    { id: "aw03.test-management", name: "Test management and traceability tools", description: "Requirements and test management (Jama Connect, Polarion, IBM DOORS Next, codeBeamer, Xray, TestRail) hold requirement-test-run-defect links and flag suspect links when a requirement changes; data platforms (Nominal, Sift, Marple, Foxglove) hold signals; few connect signals, changes and test selection.", competency: "aw-test", related: ["aw03.baseline-coverage"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What a run must leave behind",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Bench memory is only as good as its run records. If a run cannot be tied to the exact firmware, rig configuration and calibration it used, it cannot train a model, justify skipping a retest, or support a conformity file under the Machinery Regulation. This lesson is also the spec behind Lockstep: one clock for signals and actions is necessary, and the metadata around each run is what turns recordings into evidence. Customers will judge Afterwave on whether this is right on day one.`,
        },
        {
          kind: "md",
          md: md`### The run record

| Group | Fields | Why it matters |
|---|---|---|
| **Identity** | Run id (unique), parent job or pipeline id, test case id and version | Find and cite the run |
| **Baseline under test** | Firmware build hash, bootloader version, hardware revision and serial, parameter or calibration set hash | What exactly was tested |
| **Environment** | Plant model version, rig id and configuration version (harness, IO mapping, FIU firmware), ambient conditions | Results are valid for this set-up only |
| **Instruments** | Instrument and sensor ids, serials, calibration due dates, ranges | An out-of-calibration channel voids results |
| **Procedure** | Sequence version, parameters, limits with units | Reproduce the test |
| **Time** | Start and end in UTC, clock source and sync status between DAQ, sequencer and app logs | Order events, measure reaction times |
| **Who or what** | Operator, or the CI trigger and commit | Accountability and approval |
| **Outcome** | Verdict per step and overall, measured values, overrun count, recovery actions taken | The result and whether it is trustworthy |
| **Artefacts** | Links to raw data (MDF4, TDMS, Parquet, MCAP), sequencer and ECU logs, screen or video recordings, bus logs | Debug, re-analyse, train |
| **Trace links** | Requirements covered, defects raised, change that triggered the run | Coverage and impact |

### Verdicts

Most CI formats know only pass and fail. A hardware lab needs more:

- **Pass:** all limits met.
- **Fail:** the DUT violated a limit or a requirement. A product finding.
- **Error:** the bench could not execute the test (instrument timeout, rig fault, licence error, recovery triggered). An infrastructure finding.
- **Inconclusive:** executed but the result cannot be judged (missing data, overrun, clock not synced).
- **Not run or blocked:** dependency missing, rig unavailable.
- **Pass-on-retry:** passed after a failure; record it separately (Lesson 3).

Mixing **fail** and **error** is the most common reporting mistake: flake rates look like firmware quality, and regression decisions are made on bench noise.

### Data volume`,
        },
        { kind: "equation", formula: "aw03-data-rate" },
        {
          kind: "md",
          md: md`High-rate channels dominate. Formats: **ASAM MDF4** (automotive and drives), **NI TDMS** (NI ecosystems), **HDF5** and **Parquet** (analysis and ML), **MCAP** and ROS bags (robotics), plus video for on-screen actions. For CI verdicts, **JUnit XML** is the lingua franca but carries little metadata; **ATML** (IEEE 1671) is a richer XML standard for test descriptions and results used mainly in aerospace and defence.

### Coverage on a baseline`,
        },
        { kind: "equation", formula: "aw03-req-coverage" },
        {
          kind: "md",
          md: md`Requirements tools (Jama Connect, Polarion, IBM DOORS Next) flag **suspect links** when a requirement changes, marking linked tests for review. That handles requirement changes. It does not handle the more frequent case: the requirement is unchanged but the firmware, a parameter, the plant model or the rig changed. Then every passing result is, strictly, on an old baseline. Teams either rerun everything (expensive) or argue informally that results still apply (undocumented). A documented rationale per test, rerun or not, is what Ripple is meant to produce.`,
        },
        {
          kind: "flow",
          title: "The evidence chain",
          steps: [
            { label: "Requirement", detail: "Versioned, in the requirements tool" },
            { label: "Test case", detail: "Linked to requirements; sequence and limits versioned" },
            { label: "Run", detail: "On a baseline: firmware, hardware, parameters, model, rig; with verdict and metadata" },
            { label: "Artefacts", detail: "Signals, logs, recordings on one clock; stored with the run id" },
            { label: "Report", detail: "Coverage on the release baseline; open failures; justifications for results not rerun" },
            { label: "Technical file", detail: "Evidence supporting conformity, kept for the required retention period" },
          ],
          caption: "A break anywhere (a run without its firmware hash, a recording without its run id) breaks the chain for every link after it.",
        },
        {
          kind: "chart",
          chart: "stacked-bar",
          title: "Nightly verdicts per build (illustrative dashboard)",
          xKey: "build",
          xLabel: "Nightly build",
          yLabel: "Test cases",
          series: [
            { key: "pass", label: "Pass" },
            { key: "retry", label: "Pass on retry" },
            { key: "fail", label: "Fail (DUT)" },
            { key: "error", label: "Error (bench)" },
          ],
          data: [
            { build: "N-5", pass: 371, retry: 4, fail: 2, error: 23 },
            { build: "N-4", pass: 380, retry: 3, fail: 1, error: 16 },
            { build: "N-3", pass: 377, retry: 5, fail: 3, error: 15 },
            { build: "N-2", pass: 362, retry: 17, fail: 2, error: 19 },
            { build: "N-1", pass: 365, retry: 15, fail: 3, error: 17 },
            { build: "N", pass: 368, retry: 14, fail: 4, error: 14 },
          ],
          caption: "400 cases a night. Errors (bench) outnumber DUT failures; the jump in pass-on-retry at N-2 is the signal worth investigating (a change that introduced an intermittent defect, Lesson 3). A dashboard that showed only pass/fail would hide both.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Volumes, retention and coverage",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How much data does a three-rig lab produce?",
          given: md`Illustrative actuator lab: 3 rigs, each recording 64 high-rate channels at 100 kS/s with 16-bit samples, plus slow channels (temperatures, states) that are negligible by comparison. Unattended nights of 8 hours on about 250 nights a year. Lossless compression typically gives about 2 to 1 on such signals (assumption).`,
          steps: [
            { md: md`**Rate per rig:** $R = 64 \times 100{,}000 \times 2 = 12.8$ MB/s.` },
            { md: md`**Per hour:** $12.8 \times 3{,}600 = 46{,}080$ MB $\approx 46$ GB.` },
            { md: md`**Per night, three rigs:** $46.08 \times 8 \times 3 = 1{,}106$ GB $\approx 1.1$ TB.` },
            { md: md`**Per year:** $1.106 \times 250 \approx 276$ TB raw, about 138 TB compressed, before day-shift runs.` },
            { md: md`**Metadata:** a run record is kilobytes. There is no storage reason to skip it.` },
          ],
          result: md`Hundreds of terabytes a year from a modest lab is why test data often lives on local storage, gets deleted, or is downsampled, and why on-prem deployment (Enclave on customer servers) matters to buyers. Retention policy must distinguish raw high-rate data (perhaps months, or kept for runs linked to failures and releases), derived features, and run records and verdicts (kept for the evidence retention period).`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Coverage after a firmware change",
          given: md`Illustrative release scope: 120 requirements, all with a passing run on baseline B1. Firmware change creates baseline B2. The team reruns tests linked to 45 requirements: 43 pass, 2 fail. For 50 of the remaining 75 requirements, engineers write a documented justification that the change cannot affect them. The other 25 have neither a rerun nor a justification.`,
          steps: [
            { md: md`Coverage by runs on B2 only: $43/120 = 0.358$.`, hidden: true, check: { prompt: "Coverage by B2 runs alone (fraction)", answer: 0.358, tolerance: { abs: 0.002 } } },
            { md: md`Coverage counting documented justifications: $(43 + 50)/120 = 0.775$.`, hidden: true, check: { prompt: "Coverage including justifications (fraction)", answer: 0.775, tolerance: { abs: 0.002 } } },
            { md: md`Open: 2 failures plus 25 requirements ($25/120 = 21\,\%$) with no current evidence.` },
          ],
          result: md`The release decision depends on 25 requirements nobody has argued about. Either rerun their tests or write the justification; both are cheaper to do the day of the change than the week before release. Note that justifications are only as good as their reasoning, which is why they need to be explicit and reviewable rather than tribal knowledge.`,
        },
        {
          kind: "question",
          question: {
            id: "aw03-l05-p1",
            type: "numeric",
            prompt: md`A battery cycler records 32 channels at 10 kS/s as float32 (4 bytes) for a 500-hour endurance test. How much raw data is that, in GB?`,
            answer: 2304,
            tolerance: { rel: 0.01 },
            unit: "GB",
            explanation: md`$R = 32 \times 10{,}000 \times 4 = 1.28$ MB/s; $1.28 \times 3{,}600 \times 500 = 2{,}304{,}000$ MB $= 2{,}304$ GB, about 2.3 TB for one test.`,
            concepts: ["aw03.test-data-formats"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Reporting in real organisations",
      blocks: [
        {
          kind: "md",
          md: md`### Tools you will meet

| Layer | Examples | Holds |
|---|---|---|
| Requirements and ALM | Jama Connect, Polarion (Siemens), IBM DOORS Next, codeBeamer | Requirements, trace links, suspect flags |
| Test management | Xray (Jira), TestRail, vendor test managers, NI SystemLink | Test cases, runs, verdicts, coverage reports |
| Test-data platforms | Nominal, Sift, Marple; Foxglove and Rerun for robotics data | Signals, telemetry, visualisation, rules |
| CI | Jenkins, GitLab, GitHub Actions | Build artefacts, pipeline results |
| Dashboards | Grafana, BI tools, in-house | Trends |

From the research brief (Nov 2026): requirements tools flag suspect links when requirements change, and test managers select tests manually or by tag; no vendor was found doing change-impact test selection for rigs, firmware and models from signal data. Treat that as a finding of searches, not proof of absence.

### What a validation lead's dashboard should show

- Coverage on the **current** release baseline, with the list of requirements lacking current evidence.
- Verdict mix per night, with **error** and **pass-on-retry** separate from fail, trended.
- Rig utilisation and queue wait per pool (Lessons 2 and 4).
- Open failures with links to the recordings and the triggering change.
- Calibration status of instruments in use.

### Documentation standards

ISO/IEC/IEEE 29119-3 provides templates for test plans, specifications, logs and completion reports. Functional safety standards (ISO 26262, IEC 61508 and their machinery counterparts) require traceable verification evidence. Module 10 on functional safety and module 11 on the Machinery Regulation go deeper.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Retention under the Machinery Regulation",
          md: md`Regulation (EU) 2023/1230 applies from 20 January 2027 and requires manufacturers to draw up technical documentation, which includes test results, and to keep it available to authorities for a period after placing the machine on the market. The period is understood to be 10 years, as under the old Directive 2006/42/EC; confirm the article and wording in the official text before quoting it to a customer.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Reporting mistakes that destroy evidence",
          md: md`- **Results without baselines:** "passed on the March build" with no hash.
- **Recordings separated from runs:** a folder of MDF files named by date, with the run ids in a spreadsheet nobody maintains.
- **Clocks not recorded:** a reaction-time requirement "verified" from two logs whose clocks were 40 ms apart.
- **Deleting raw data of failures:** the one recording that would explain a field issue a year later.
- **Dashboards of green:** pass rate without error, retry and coverage views gives false comfort.`,
        },
        {
          kind: "ask",
          title: "Questions to ask about their run records",
          items: [
            "Pick a test that failed six months ago. Can you show me the firmware hash, rig configuration and recording for it in under five minutes?",
            "Do your results separate DUT failures from bench errors?",
            "How long do you keep raw data, and who decides what is deleted?",
            "When firmware changes, how do you document why a test was not rerun?",
            "Where does your requirements-to-test traceability live, and is it linked to the actual runs?",
          ],
        },
        { kind: "xref", to: "fc04-l06", note: "Founder Core, pilots that convert: the run-record spec below is a natural pilot deliverable with measurable success criteria." },
        {
          kind: "question",
          question: {
            id: "aw03-l05-p2",
            type: "short",
            prompt: md`**Write the minimum run-record specification for a Lockstep capture pilot on two HIL rigs at an illustrative drive-unit lab.** Give the fields (grouped), which system each field comes from (CI, sequencer, rig inventory, DAQ, operator), which are mandatory for a run to count as evidence, the verdict values, and the retention rule for raw data vs run records. Add three acceptance checks you would use at the end of the pilot to show the records are complete. Do not claim integrations you have not verified with the customer; mark them as "to confirm".`,
            rubric: [
              "Fields cover identity, baseline (firmware hash, hardware revision and serial, parameter set), environment (plant model and rig configuration versions), instruments and calibration, procedure (sequence version, limits), time with clock source, trigger or operator, outcome and artefact links",
              "Maps each group to a plausible source system and marks integrations as to confirm",
              "Defines verdicts including error separate from fail, inconclusive and pass-on-retry",
              "Distinguishes retention of raw high-rate data from run records and verdicts, with a reason",
              "Acceptance checks are measurable (for example 100 % of runs have firmware hash and rig configuration; any failed run retrievable with its recording in under five minutes; clock offset between streams recorded per run)",
              "No invented customer facts or unverified product capabilities",
            ],
            modelAnswer: md`**Minimum run record: Lockstep pilot, HIL rigs 1 and 2 (draft)**

| Group | Fields | Source | Mandatory |
|---|---|---|---|
| Identity | run_id (UUID), job_id, test_case_id, test_case_version | Sequencer, CI | Yes |
| Baseline | firmware_hash, bootloader_version, hw_revision, dut_serial, param_set_hash | CI, flash log, DUT readout (to confirm) | Yes |
| Environment | plant_model_version, rig_id, rig_config_version, ambient_temp | Rig inventory (to confirm), DAQ | Yes except ambient |
| Instruments | instrument_ids, serials, cal_due_dates | Calibration database (to confirm) | Yes |
| Procedure | sequence_version, parameters, limits with units | Sequencer | Yes |
| Time | start_utc, end_utc, clock_source, measured offset between DAQ, sequencer and screen streams | Lockstep | Yes |
| Trigger | operator or ci_commit | CI or login | Yes |
| Outcome | verdict per step and overall, measured values, overrun_count, recovery_actions | Sequencer, HIL | Yes |
| Artefacts | links to MDF4 signals, sequencer log, bus log, screen recording | Lockstep, HIL | Yes |
| Trace | requirement_ids, defect_ids, triggering_change | Requirements tool (to confirm) | Requirement ids yes |

**Verdicts:** pass, fail, error, inconclusive, not_run, pass_on_retry.

**Retention:** run records and verdicts kept for the product's documentation retention period; raw high-rate data 90 days by default, kept indefinitely for runs that failed, errored or are cited in a release.

**Acceptance checks:** (1) 100 % of pilot runs have firmware hash, rig configuration version and clock offset recorded; (2) any failed run retrievable with its synchronised recording in under five minutes; (3) error and fail verdicts reconcile with the test lead's manual review for a sample of 20 runs.`,
            explanation: md`Graded against the rubric. A good spec is short enough to agree in one meeting and strict enough that a run without it does not count.`,
            concepts: ["aw03.run-record", "aw03.verdict-taxonomy", "aw03.baseline-coverage"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an insurer or a regulator why a 'passed' test from last month may not be evidence for the machine shipping today.",
          keyPoints: [
            "A result is a statement about a specific baseline: firmware, hardware, parameters, model and rig set-up",
            "After any change, the old pass is evidence only if the test is rerun or there is a documented reason it is unaffected",
            "The run record must contain the baseline, calibration status and time base to be checkable",
            "Coverage should be reported on the current baseline, listing what lacks current evidence",
          ],
        },
        { kind: "sources", refs: ["aw03-r9", "aw03-r11", "aw03-r17", "aw03-r18", "aw03-r20"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw03-l05-q1",
      type: "mcq",
      prompt: "A test could not run because the power supply did not respond. Which verdict should it get?",
      options: ["Fail", "Error", "Pass", "Pass-on-retry"],
      answer: 1,
      explanation: md`It is a bench problem, not a DUT finding. Recording it as fail corrupts both quality and flake statistics.`,
      concepts: ["aw03.verdict-taxonomy"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw03-l05-q2",
      type: "numeric",
      prompt: md`16 channels at 1 MS/s, 2 bytes per sample. How many GB per hour of raw data?`,
      answer: 115.2,
      tolerance: { rel: 0.01 },
      unit: "GB/h",
      explanation: md`$16 \times 10^6 \times 2 = 32$ MB/s; $32 \times 3{,}600 = 115{,}200$ MB $= 115.2$ GB per hour.`,
      concepts: ["aw03.test-data-formats"],
      difficulty: 1,
    },
    {
      id: "aw03-l05-q3",
      type: "multi",
      prompt: "Which belong in the baseline section of a run record? (Select all that apply.)",
      options: ["Firmware build hash", "Hardware revision and serial", "Parameter set hash", "Name of the HIL vendor's sales representative", "Operator's lunch break"],
      answer: [0, 1, 2],
      explanation: md`The baseline is what was tested. Rig configuration and plant model belong in the environment section.`,
      concepts: ["aw03.run-record"],
      difficulty: 1,
    },
    {
      id: "aw03-l05-q4",
      type: "numeric",
      prompt: md`200 requirements in scope. After a firmware change, tests for 70 requirements are rerun and pass; 90 more have documented justifications. What is the coverage on the new baseline including justifications, in percent?`,
      answer: 80,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$(70 + 90)/200 = 0.80$. The other 40 requirements (20 %) have no current evidence.`,
      concepts: ["aw03.baseline-coverage"],
      difficulty: 1,
    },
    {
      id: "aw03-l05-q5",
      type: "mcq",
      prompt: "What do requirements tools' 'suspect links' handle, and what do they miss?",
      options: [
        "They handle firmware changes but miss requirement changes",
        "They flag tests when a linked requirement changes, but not when firmware, parameters, models or rigs change under an unchanged requirement",
        "They select tests automatically from signal data",
        "They store raw measurement data",
      ],
      answer: 1,
      explanation: md`Suspect links are traceability-level impact analysis. The frequent case in a test lab is a change below the requirement.`,
      concepts: ["aw03.test-management", "aw03.baseline-coverage"],
      difficulty: 2,
    },
    {
      id: "aw03-l05-q6",
      type: "decision",
      prompt: md`Storage is filling up. The lab manager proposes deleting all raw recordings older than 30 days, keeping only verdicts. What do you advise as an operator who cares about bench memory?`,
      options: [
        { text: "Agree; verdicts are what matters.", score: 0.2, feedback: "Verdicts cannot be re-analysed, debugged or used to train models; you lose the evidence behind failures." },
        { text: "Tiered retention: keep run records and verdicts for the documentation period; keep raw data for failed, errored and release-cited runs indefinitely; downsample or delete routine passing raw data after a set period.", score: 1, feedback: "Balances cost against evidence and learning value." },
        { text: "Keep everything forever regardless of cost.", score: 0.4, feedback: "Hundreds of TB a year makes this a real cost decision; keep what has evidence or learning value." },
      ],
      explanation: md`Retention is a policy with tiers, not a single date.`,
      concepts: ["aw03.run-record", "aw03.test-data-formats"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw03-l05-f1", front: "Fail vs error", back: "Fail: the DUT violated a limit. Error: the bench could not execute the test. Never mix them.", concepts: ["aw03.verdict-taxonomy"] },
    { id: "aw03-l05-f2", front: "Baseline of a run", back: "Firmware hash, hardware revision and serial, parameter set; plus environment: plant model and rig configuration versions.", concepts: ["aw03.run-record"] },
    { id: "aw03-l05-f3", front: "Raw data rate", back: md`$R = n_{ch} f_s b$: 64 ch at 100 kS/s, 16-bit: 12.8 MB/s, 46 GB/h.`, concepts: ["aw03.test-data-formats"] },
    { id: "aw03-l05-f4", front: "Coverage on a baseline", back: "Requirements with a valid passing run on the current baseline (or a documented justification) divided by in-scope requirements.", concepts: ["aw03.baseline-coverage"] },
    { id: "aw03-l05-f5", front: "Common test data formats", back: "MDF4, TDMS, HDF5, Parquet, MCAP and ROS bags; JUnit XML for CI verdicts; ATML (IEEE 1671) for test results.", concepts: ["aw03.test-data-formats"] },
    { id: "aw03-l05-f6", front: "Suspect links", back: "Requirements-tool flag on tests when a linked requirement changes; blind to firmware, parameter, model and rig changes.", concepts: ["aw03.test-management"] },
  ],
};

export default lesson;
