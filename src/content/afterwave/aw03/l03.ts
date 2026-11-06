import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw03-l03",
  title: "Test automation and orchestration: sequencers, rig scheduling, overnight runs and flaky tests",
  summary:
    "How hardware tests are automated: sequencers and scripting (TestStand, OpenTAP, AutomationDesk, CANoe, pytest), the anatomy of a test step with limits, rig scheduling by capability, resource locking with leases, and what unattended overnight running requires. Then the statistics of flaky tests: why large suites are rarely green, how retries hide real intermittent defects, how many reruns it takes to see a failure, and the rule of three.",
  minutes: 90,
  objectives: [
    "Describe the structure of an automated hardware test: setup, steps with limits, cleanup, result record",
    "Explain how an orchestrator matches tests to rigs by capability and why resource locks need leases and ordering",
    "Compute the capacity of an unattended window and identify what limits it",
    "Compute the probability that a suite is all green, the effect of a retry policy on flakes and on real intermittent defects, and the reruns needed to observe a failure",
    "Write an unattended-run readiness checklist for a rig",
  ],
  concepts: [
    { id: "aw03.test-sequencer", name: "Test sequencer", description: "Software that executes test sequences: setup, ordered steps that stimulate the device and compare measurements against limits, cleanup, and a structured result record; examples TestStand, OpenTAP, AutomationDesk, CANoe test modules, pytest-based frameworks.", competency: "aw-test" },
    { id: "aw03.resource-locking", name: "Resource locking and leases", description: "An orchestrator grants exclusive, time-limited leases on rigs, DUTs, instruments and licences; leases expire without a heartbeat so a crashed job cannot hold a rig forever, and locks are taken in a fixed order to avoid deadlock.", competency: "aw-test", related: ["aw03.test-sequencer"] },
    { id: "aw03.unattended-operation", name: "Unattended operation", description: "Running rigs without an operator present (nights, weekends): requires automatic safe state, watchdogs, remote power cycling, recovery sequences, abort criteria, alerting, and an independent safety chain that the automation cannot override.", competency: "aw-test", related: ["aw03.resource-locking", "aw03.rig-utilisation"] },
    { id: "aw03.flaky-test", name: "Flaky test", description: "A test that can pass and fail on the same device, firmware and configuration; per-test flake probability p makes a suite of N tests all-green with probability (1 - p)^N.", competency: "aw-test" },
    { id: "aw03.retry-policy", name: "Retry policy", description: "Automatic reruns after a failure; with k retries a flake reports red with probability p^(k+1), but so does a real intermittent defect (q^(k+1)), so retries hide intermittent bugs unless pass-on-retry is logged and trended.", competency: "aw-test", related: ["aw03.flaky-test"] },
    { id: "aw03.intermittent-detection", name: "Detecting intermittent failures", description: "Runs needed to see a failure of per-run probability q with confidence C: n = ln(1 - C)/ln(1 - q); after n clean runs the 95 % upper bound on failure probability is about 3/n.", competency: "aw-test", related: ["aw03.flaky-test"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From a script to a scheduled rig farm",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave's product vision runs through this layer: Ripple says what to rerun, and later agents plan retests and run rigs overnight with human approval. All of that lands on the customer's existing sequencer and scheduler. You need to know what those tools do, what makes unattended running hard, and how badly flaky tests poison any automated decision, because "the selection missed a regression" and "the suite was red for no reason" are the two complaints that will decide whether a pilot converts.`,
        },
        {
          kind: "md",
          md: md`### Anatomy of an automated hardware test

A **sequence** in TestStand, OpenTAP (Keysight PathWave Test Automation), dSPACE AutomationDesk, a CANoe test module or an in-house pytest framework has the same skeleton:

1. **Setup:** reserve resources, power the DUT, flash or verify firmware, load the parameter set, bring the plant model and rig to the initial condition, start recording.
2. **Steps:** each sets a stimulus (torque demand, voltage, bus message, fault), waits for a **condition** (not a fixed sleep), measures, and compares against **limits** (low, high, unit). Each step yields pass, fail or error.
3. **Cleanup:** remove faults, return to safe state, stop recording, release resources. Cleanup must run even if a step crashed.
4. **Result record:** sequence and step versions, parameters, measured values with limits and units, verdicts, timestamps, links to raw data (Lesson 5).

Parameterisation turns one sequence into many test cases (same steps over temperatures, loads, firmware variants). That is how suites reach thousands of cases.

### Scheduling rigs

An orchestrator (NI SystemLink, vendor test managers, Jenkins or GitLab with rig-attached runners, or in-house schedulers) decides which job runs where:

- **Capability matching:** a test declares what it needs (48 V supply, CAN FD, a load motor rated 30 N·m, DUT hardware revision C); each rig declares what it has. Only matching rigs are candidates.
- **Priority and preemption:** release-gating and pre-merge jobs before exploratory runs; long endurance tests may be non-preemptible.
- **Resource locking:** a job takes an exclusive **lease** on the rig, the DUT, instruments and sometimes software licences. Leases need a **heartbeat** and an expiry so a crashed job does not hold a rig forever. Jobs that need several resources take them in a **fixed global order** (rig, then DUT, then instrument) to avoid deadlock, where job 1 holds rig A waiting for instrument X while job 2 holds X waiting for A.
- **Batching:** grouping tests that share a firmware build and setup to avoid reflashing and re-conditioning between each.

### Unattended (overnight) capacity`,
        },
        { kind: "equation", formula: "aw03-overnight-capacity" },
        {
          kind: "md",
          md: md`The unattended availability $a$ is where nights are won or lost. A rig that hangs at 01:00 with no automatic recovery loses the rest of the night. Typical requirements for unattended running: watchdogs on the sequencer and the DUT, remote power relays for power cycling, a recovery sequence (reflash from a known-good image, reinitialise the plant model), abort criteria (temperature, current, unexpected motion), alerting to an on-call engineer, and above all an **independent hardware safety chain** (emergency stop, interlocks, safety PLC) that no software, including any future agent, can override. Some energetic rigs (high-voltage batteries, large dynos, robots with free motion) may be prohibited from unattended operation by site safety rules regardless of software.

### Flaky tests: the statistics

A test is **flaky** if it can pass and fail on the same device, firmware and configuration. Hardware adds its own causes to software ones: connector contact, thermal state, timing races between sequencer and DUT, instrument settling, electrical noise, bus timing, leftover state from the previous test. With independent flakes:`,
        },
        { kind: "equation", formula: "aw03-suite-green" },
        {
          kind: "chart",
          chart: "line",
          title: "Probability a suite with no real defect is all green",
          xKey: "n",
          xLabel: "Tests in the suite",
          yLabel: "P(all green), %",
          series: [
            { key: "p01", label: "p = 0.1 % per test" },
            { key: "p05", label: "p = 0.5 % per test" },
            { key: "p1", label: "p = 1 % per test" },
          ],
          data: [
            { n: "50", p01: 95.1, p05: 77.8, p1: 60.5 },
            { n: "100", p01: 90.5, p05: 60.6, p1: 36.6 },
            { n: "200", p01: 81.9, p05: 36.7, p1: 13.4 },
            { n: "500", p01: 60.6, p05: 8.2, p1: 0.7 },
            { n: "1000", p01: 36.8, p05: 0.7, p1: 0.0 },
            { n: "2000", p01: 13.5, p05: 0.0, p1: 0.0 },
          ],
          caption: "Computed from (1 - p)^N. At 1,000 tests even a 0.1 % flake rate leaves only about a third of runs fully green. Google reported (2016, software tests) about 1.5 % of runs with a flaky result; hardware suites are rarely better.",
        },
        {
          kind: "md",
          md: md`The usual response is automatic **retries**. The arithmetic cuts both ways:`,
        },
        { kind: "equation", formula: "aw03-retry-mask" },
        {
          kind: "md",
          md: md`A real intermittent defect (a race in the firmware that fails 20 % of runs) looks exactly like a flake to a retry policy. Two more tools:`,
        },
        { kind: "equation", formula: "aw03-detect-runs" },
        { kind: "equation", formula: "aw03-rule-of-three" },
        {
          kind: "md",
          md: md`Together they say: one rerun that passes tells you very little, and "fixed, it passed ten times" bounds the failure rate only below about 30 %. Intermittent hardware defects need many repetitions, which is expensive rig time, which is why recorded history of previous runs (bench memory) is valuable: it is free repetitions you already paid for.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Planning a night and reading a red suite",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How many tests fit tonight, and what recovery is worth",
          given: md`Illustrative actuator lab: 3 identical HIL rigs; unattended window 22:00 to 06:00 (480 min); mean test 12 min plus 3 min setup and reset. Without automatic recovery, hangs leave rigs idle so that on average they run 85 % of the window. With remote power cycling and an automatic reflash-and-retry recovery sequence, 97 %. A firmware change came in this afternoon; the engineers' impacted list has 140 test cases.`,
          steps: [
            { md: md`**Per rig without recovery:** $\lfloor 480 \times 0.85/15 \rfloor = \lfloor 27.2 \rfloor = 27$ tests; three rigs: **81 tests**.` },
            { md: md`**Per rig with recovery:** $\lfloor 480 \times 0.97/15 \rfloor = \lfloor 31.04 \rfloor = 31$; three rigs: **93 tests**.` },
            { md: md`**Setup matters as much:** batching tests by firmware build and initial condition to cut setup from 3 to 1.5 min gives $\lfloor 480 \times 0.97/13.5 \rfloor = 34$ per rig, **102 tests**.` },
            { md: md`**Still short:** 140 impacted cases do not fit. Either the list is ranked (most likely to catch a regression first), or the night spills into the day shift and displaces attended work.` },
          ],
          result: md`Recovery and batching recover about a quarter more capacity for little cost; after that, the only lever is running the right tests first. Ranked selection with a reason per test is what lets a test lead approve a night plan in five minutes instead of an hour.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A suite that is red every morning",
          given: md`Illustrative nightly regression of 400 tests. Historical data shows an average per-test flake probability of 0.3 %. Separately, a firmware race condition introduced this week makes one test fail on 20 % of runs.`,
          steps: [
            { md: md`$P_{green} = 0.997^{400} = 0.30$. Seven nights in ten are red with no real defect; expected false reds per night $= 400 \times 0.003 = 1.2$.`, hidden: true, check: { prompt: "Probability the suite is all green (no real defect), as a fraction", answer: 0.30, tolerance: { abs: 0.01 } } },
            { md: md`With one retry ($k = 1$) a flake reports red with $p^2 = 9 \times 10^{-6}$, so $P_{green} \approx (1 - 9\times10^{-6})^{400} = 0.996$. Mornings become green.` },
            { md: md`The race-condition test now reports red with $q^2 = 0.2^2 = 0.04$ per night instead of 0.20.`, hidden: true, check: { prompt: "Probability per night the defective test reports red with one retry", answer: 0.04, tolerance: { abs: 0.001 } } },
            { md: md`To see the race at least once with 90 % confidence without retries: $n = \lceil \ln 0.1/\ln 0.8 \rceil = \lceil 10.3 \rceil = 11$ runs.`, hidden: true, check: { prompt: "Runs needed (90 % confidence, q = 0.2)", answer: 11, tolerance: { abs: 0 } } },
          ],
          result: md`The retry policy fixed the mornings and hid the bug: it now surfaces about once in 25 nights. The fix is not "no retries" but **logging every pass-on-retry and trending it per test**: a test whose retry rate jumps from 0.3 % to 20 % after a firmware change is the signal.`,
        },
        {
          kind: "question",
          question: {
            id: "aw03-l03-p1",
            type: "numeric",
            prompt: md`An engineer reruns a previously intermittent test 50 times after a firmware fix and sees no failure. Using the rule of three, what is the approximate 95 % upper bound on its remaining failure probability, in percent?`,
            answer: 6,
            tolerance: { abs: 0.1 },
            unit: "%",
            explanation: md`$p_{95} \approx 3/50 = 0.06 = 6\,\%$. Fifty clean runs do not prove the fix if the original failure rate was 5 %; they do if it was 30 %. Always compare with the pre-fix rate.`,
            concepts: ["aw03.intermittent-detection"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Orchestration in real labs",
      blocks: [
        {
          kind: "md",
          md: md`### Who does it and with what

- **Test automation engineers** write sequences and libraries (TestStand with LabVIEW or Python steps, OpenTAP plugins in C#, AutomationDesk, CANoe CAPL and vTESTstudio, ecu.test, pytest with instrument drivers such as PyVISA).
- **Test systems or lab infrastructure** own the rig inventory, scheduling, calibration and the result database (NI SystemLink, dSPACE test management products, custom databases).
- **Firmware teams** consume the results through CI (next lesson).
- Newer data platforms put sequencing at the edge too: Nominal Connect runs Python test apps and sequences next to instruments, including air-gapped, and syncs later (from the research brief).

### Causes of flakiness on rigs, and their fixes

| Cause | Symptom | Fix |
|---|---|---|
| Fixed sleeps instead of conditions | Fails when the DUT boots slower | Wait for a condition with a timeout |
| Leftover state | Fails only after a specific previous test | Explicit initial-condition check in setup |
| Thermal state | Fails late at night after long runs | Condition or measure temperature as a precondition |
| Limits too tight for measurement noise | Random fails near a limit | Derive limits from measurement uncertainty, not from one good run |
| Contact and harness | Rig-specific failures | Rig health checks, connector cycle counts, rig id in results |
| Clock mismatch between DAQ and sequencer | Timing requirement fails randomly | One clock, or measured offset and drift (module 2 on DAQ and signals) |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Flaky-test anti-patterns",
          md: md`- **Retry until green, silently.** Hides intermittent defects (worked example).
- **Quarantine forever.** A flaky test moved to a quarantine list stops providing coverage; the requirement it covered quietly loses evidence.
- **Blaming the DUT for bench errors** or the reverse. Without a separate **error** verdict, flake statistics mix rig problems and firmware problems.
- **Order-dependent suites.** Tests that pass only in the usual order break the moment a selection engine reorders or subsets them. Ripple-style selection assumes tests are independent; check this in any pilot.`,
        },
        {
          kind: "checklist",
          title: "Unattended-run readiness for one rig",
          items: [
            "Independent hardware safety chain (e-stop, interlocks, safety PLC) verified; automation cannot bypass it; site rules allow unattended operation for this energy level",
            "Every sequence has a cleanup that runs on crash and leaves the rig and DUT in a defined safe state",
            "Watchdogs on sequencer and DUT; remote power cycling; automatic recovery sequence (reflash known-good image, reinitialise model) tested",
            "Abort criteria on temperature, current, voltage and unexpected motion, with limits from the rig's safety assessment",
            "Leases with heartbeat and expiry; locks taken in a fixed order",
            "Alerting to an on-call person with a defined response; a log of every recovery action",
            "Verdicts separate fail (DUT) from error (bench); pass-on-retry is logged per test",
          ],
        },
        {
          kind: "ask",
          title: "Questions about their automation",
          items: [
            "What sequencer and scheduler do you use, and can jobs be submitted through an API?",
            "What fraction of last month's red results were bench errors rather than DUT failures?",
            "Do you retry failed tests automatically? Is pass-on-retry recorded?",
            "Which rigs are allowed to run unattended, and who decided?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw03-l03-p2",
            type: "short",
            prompt: md`**Write a one-page "overnight run policy" proposal that you could co-author with a pilot customer's test lead for two HIL rigs.** Include: which jobs may run unattended and which may not; what happens on a hang or a bench error; the retry policy and how pass-on-retry is tracked; how the night's test list is chosen and approved; and what the morning report must contain. Use illustrative numbers. Keep Afterwave's role to what it does (Lockstep capture, Ripple's ranked rerun list with reasons) and leave execution with their sequencer.`,
            rubric: [
              "Separates what may run unattended from what may not, and makes the independent safety chain non-negotiable",
              "Defines hang and error handling concretely (watchdog, power cycle, reflash, maximum recovery attempts, then park in safe state and alert)",
              "Retry policy is bounded (for example one retry) and every pass-on-retry is logged and trended per test with a threshold that flags a change",
              "Night list is ranked with reasons and approved by a named human before the window; capacity is computed with setup time and availability",
              "Morning report separates fail, error and pass-on-retry, links raw data, and lists what did not run",
              "Does not claim Afterwave executes tests or controls rigs; numbers labelled illustrative",
            ],
            modelAnswer: md`**Overnight run policy: HIL rigs 1 and 2 (draft for pilot, illustrative numbers)**

**Scope.** Unattended: HIL regression and fault-injection sequences on rigs 1 and 2 (low-voltage, no moving machinery). Not unattended: anything on the dyno, any sequence that changes safety parameters, any new sequence that has not run attended at least three times.

**Safety.** The rig e-stop and interlock chain are independent of all software and are never bypassed. Abort on DUT temperature above 90 °C or supply current above 25 A.

**Hangs and errors.** Watchdog 2 minutes without sequencer heartbeat: power-cycle DUT, reflash known-good image, rerun setup. Maximum two recoveries per night per rig; then park in safe state and page the on-call engineer. Every recovery is logged.

**Retries.** One automatic retry on fail. Pass-on-retry is recorded as its own verdict and trended per test; a test whose retry rate exceeds three times its 30-night baseline is flagged in the morning report.

**Choosing the night.** By 17:00, Ripple proposes a ranked list of tests affected by the day's firmware, model or rig changes, each with its reason. The test lead approves or edits it by 18:00. Capacity: 480 min x 0.95 / 14 min = 32 tests per rig, 64 total; anything beyond that rolls to the next night.

**Morning report.** Counts of pass, fail, error and pass-on-retry; each fail with its recording (Lockstep signals and actions on one clock) and the change that triggered it; list of tests that did not run and why.`,
            explanation: md`Graded against the rubric. A strong policy is something the customer's safety officer and test lead would both sign.`,
            concepts: ["aw03.unattended-operation", "aw03.retry-policy", "aw03.resource-locking"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to your cofounders' former manager why automatic retries are dangerous, using one number.",
          keyPoints: [
            "Retries make a test report red only if it fails every attempt",
            "That suppresses flakes but also suppresses real intermittent defects",
            "Example: a bug that fails 20 % of runs reports red only 4 % of the time with one retry",
            "Fix: keep retries but record and trend pass-on-retry per test",
          ],
        },
        { kind: "sources", refs: ["aw03-r3", "aw03-r7", "aw03-r13", "aw03-r14", "aw03-r19"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw03-l03-q1",
      type: "numeric",
      prompt: md`A suite has 300 tests, each with an independent 0.5 % flake probability. What is the probability, in percent, that a run with no real defect is all green?`,
      answer: 22.2,
      tolerance: { abs: 0.3 },
      unit: "%",
      explanation: md`$0.995^{300} = 0.222$. Almost four runs in five show at least one false red.`,
      concepts: ["aw03.flaky-test"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "aw03-l03-q2",
      type: "numeric",
      prompt: md`A real intermittent defect fails 30 % of runs. How many runs are needed to observe it at least once with 95 % confidence?`,
      answer: 9,
      tolerance: { abs: 0 },
      unit: "runs",
      explanation: md`$n = \lceil \ln 0.05/\ln 0.7 \rceil = \lceil 8.4 \rceil = 9$.`,
      concepts: ["aw03.intermittent-detection"],
      difficulty: 2,
    },
    {
      id: "aw03-l03-q3",
      type: "mcq",
      prompt: "Why must rig leases have a heartbeat and an expiry?",
      options: [
        "To bill teams for rig time",
        "So that a crashed or abandoned job cannot hold a rig indefinitely",
        "To make tests run faster",
        "Because the safety standard requires it",
      ],
      answer: 1,
      explanation: md`Without expiry a dead job keeps its lock and the rig sits idle until a human notices, often the next morning.`,
      concepts: ["aw03.resource-locking"],
      difficulty: 1,
    },
    {
      id: "aw03-l03-q4",
      type: "multi",
      prompt: "Which are prerequisites for running a rig unattended? (Select all that apply.)",
      options: [
        "An independent safety chain that software cannot override",
        "Cleanup that runs even when a step crashes",
        "A dashboard with a dark theme",
        "Automatic recovery (power cycle, reflash) with a limit on attempts",
        "Alerting to an on-call person",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Unattended running is about safe states, recovery and escalation. Presentation is irrelevant.`,
      concepts: ["aw03.unattended-operation"],
      difficulty: 1,
    },
    {
      id: "aw03-l03-q5",
      type: "numeric",
      prompt: md`Window 360 min, unattended availability 0.9, mean test 10 min plus 2 min setup, 2 rigs. How many tests fit?`,
      answer: 54,
      tolerance: { abs: 0 },
      unit: "tests",
      explanation: md`$\lfloor 360 \times 0.9/12 \rfloor = \lfloor 27 \rfloor = 27$ per rig, 54 in total.`,
      concepts: ["aw03.unattended-operation"],
      difficulty: 1,
    },
    {
      id: "aw03-l03-q6",
      type: "decision",
      prompt: md`During a pilot, the customer's lead says: "Ripple's subset missed a failure that the full suite caught last night." The failing test has a 2 % historical flake rate and passed on retry. What do you do?`,
      options: [
        { text: "Apologise and promise to add the test to every subset from now on.", score: 0.2, feedback: "Reacting before knowing whether it was a real regression or a flake teaches the wrong lesson." },
        { text: "Pull the recordings for that test on both builds, check whether the failure is consistent with its flake history or with the change, rerun it enough times to tell (several dozen if needed), and report the result either way.", score: 1, feedback: "Right: separate signal from flake with data, and be transparent." },
        { text: "Tell them it was a flake because it passed on retry.", score: 0.1, feedback: "A pass on retry is weak evidence; a real intermittent would also pass on retry most of the time." },
      ],
      explanation: md`Missed-regression claims and flake noise must be resolved with repetitions and recorded history, not opinion.`,
      concepts: ["aw03.flaky-test", "aw03.retry-policy"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "aw03-l03-f1", front: "P(all green) with flakes", back: md`$(1-p)^N$: 500 tests at 0.2 % give 37 %.`, concepts: ["aw03.flaky-test"] },
    { id: "aw03-l03-f2", front: "Why retries are dangerous", back: md`Red only if every attempt fails: $x^{k+1}$ for flakes and for real intermittent defects alike.`, concepts: ["aw03.retry-policy"] },
    { id: "aw03-l03-f3", front: "Runs to see an intermittent", back: md`$n = \lceil \ln(1-C)/\ln(1-q) \rceil$: 29 runs for $q = 0.1$ at 95 %.`, concepts: ["aw03.intermittent-detection"] },
    { id: "aw03-l03-f4", front: "Rule of three", back: md`Zero failures in $n$ runs: 95 % upper bound $\approx 3/n$.`, concepts: ["aw03.intermittent-detection"] },
    { id: "aw03-l03-f5", front: "Deadlock avoidance for rig resources", back: "Take locks in a fixed global order (rig, DUT, instrument) and use leases with expiry.", concepts: ["aw03.resource-locking"] },
    { id: "aw03-l03-f6", front: "Skeleton of a hardware test sequence", back: "Setup (reserve, power, flash, initial condition, start recording), steps with limits, cleanup that always runs, result record.", concepts: ["aw03.test-sequencer"] },
    { id: "aw03-l03-f7", front: "Biggest lever on overnight capacity", back: "Unattended availability (automatic recovery) and setup time, then running the right tests first.", concepts: ["aw03.unattended-operation"] },
  ],
};

export default lesson;
