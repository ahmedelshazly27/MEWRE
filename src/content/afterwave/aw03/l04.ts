import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw03-l04",
  title: "CI/CD for hardware and firmware: pipelines, gating, rig farms and queueing math",
  summary:
    "What continuous integration looks like when the test target is physical: reproducible firmware builds, flashing over debug probes or UDS, smoke tests on rigs, tiered gating (pre-merge, nightly, release), self-hosted runners attached to rigs, and how to size a rig farm with queueing theory (M/M/1, Erlang C, Kingman, Little's law) so that engineers are not waiting an hour for a five-minute smoke test.",
  minutes: 90,
  objectives: [
    "Lay out a hardware CI/CD pipeline from commit to release candidate and say what each stage proves",
    "Design tiered gates (pre-merge, post-merge, nightly, release) by cost per run and defect class",
    "Compute rig utilisation, mean wait (M/M/1 and M/M/c) and the effect of pooling and variability (Kingman)",
    "Use Little's law to read a CI queue dashboard",
    "Explain why rig contention makes test selection valuable and where it does not",
  ],
  concepts: [
    { id: "aw03.hardware-ci-pipeline", name: "Hardware CI/CD pipeline", description: "Automated chain from commit to release candidate: reproducible build, static analysis and unit tests, SIL, flash to target, smoke test on a rig, HIL regression, rig and endurance tests, with every artefact versioned by hash.", competency: "aw-test", related: ["aw03.xil-ladder", "aw03.test-sequencer"] },
    { id: "aw03.tiered-gating", name: "Tiered gating", description: "Different test sets at different points: minutes-long pre-merge gates (build, unit, SIL, one smoke on a rig), hours-long nightly HIL regressions, days-long release gates on rigs; each tier trades cost per run against the defects it catches.", competency: "aw-test", related: ["aw03.hardware-ci-pipeline"] },
    { id: "aw03.rig-contention", name: "Rig contention and queueing", description: "Jobs queue for a finite pool of rigs; mean wait grows as rho/(1 - rho) with utilisation, falls sharply with pooling of interchangeable rigs (Erlang C), and grows with variability of arrivals and job times (Kingman).", competency: "aw-test", related: ["aw03.rig-utilisation", "aw03.resource-locking"] },
    { id: "aw03.littles-law", name: "Little's law", description: "Jobs in the system equal throughput times time in the system (L = lambda W), for any stable queue; turns a queue length on a dashboard into an expected wait.", competency: "aw-test", related: ["aw03.rig-contention"] },
    { id: "aw03.flash-and-recover", name: "Flashing and brick recovery", description: "Programming firmware onto targets in CI via debug probes (JTAG/SWD), bootloaders over UDS (ISO 14229) on CAN or Ethernet, or USB DFU, with verification by hash and a recovery path (power relay, probe, known-good image) for bricked devices.", competency: "aw-test", related: ["aw03.hardware-ci-pipeline"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "A pipeline whose last stage is physical",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Firmware teams at robotics and drive companies increasingly run software-style CI, and the rig farm is where it hurts: a five-minute smoke test that waits fifty minutes for a rig. The queueing math in this lesson is the cleanest argument for change-impact selection you will have, because it shows that cutting job time on a busy pool cuts waiting far more than proportionally. It also shows the limit: on an idle pool, selection saves little. Knowing which situation a prospect is in tells you whether Ripple is a priority for them this quarter.`,
        },
        {
          kind: "md",
          md: md`### The pipeline

| Stage | What runs | Where | Typical duration | What it proves |
|---|---|---|---|---|
| Build | Cross-compile, link, sign; record compiler version, flags, dependency hashes | CI runner, container | Minutes | The commit builds reproducibly; artefact identified by hash |
| Static checks and unit tests | Static analysis (for example MISRA C rules), unit tests on host | Runner | Minutes | Code-level defects |
| SIL | Compiled code against plant models, back-to-back with MIL | Runner, faster than real time | Minutes to an hour | Logic and integration in simulation |
| Flash | Program target via JTAG/SWD probe, UDS bootloader over CAN or Ethernet, or USB DFU; verify hash | Rig-attached runner | 1 to 10 min | The right image is on the device |
| Smoke on rig | Boot, communication, a few key functions, no faults | One rig or HIL | Minutes | The build is alive on real hardware |
| HIL regression | Functional, diagnostic and fault-injection suites | HIL pool | Hours | Behaviour against requirements |
| Rig, endurance, environmental | Dyno, actuator rig, climate chamber, long cycles | Physical rigs | Days to weeks | Physics, durability, margins |
| Release candidate | Sign-off on evidence across all tiers | Humans | Days | Fit for release |

Tools: Jenkins, GitLab CI, GitHub Actions or Buildkite, with **self-hosted runners** attached to rigs and tagged by capability (the same capability matching as Lesson 3); artefact repositories for builds; the HIL vendor's automation called from the CI job. Every artefact (firmware, bootloader, parameter set, plant model, sequence) is identified by a hash, so a run can be tied to exactly what was tested.

### Tiered gating

Not every test can run on every commit. The test **pyramid** for hardware:

- **Pre-merge (per change, minutes):** build, unit, SIL subset, one smoke test on one rig. Must be fast or engineers bypass it.
- **Post-merge or nightly (hours):** HIL regression, selected fault-injection cases.
- **Weekly or per release candidate (days):** full fault-injection matrix, rig and endurance, environmental.

The design question is which tests go in which tier. Putting too much into pre-merge creates queues; putting too little lets regressions in that are expensive to bisect later (one nightly failure over 40 merged changes means bisecting across 40 builds, each needing a rig run).

### Queueing math for rig contention

A pool of rigs is a queue. Start with utilisation:`,
        },
        { kind: "equation", formula: "aw03-utilisation-queue" },
        { kind: "equation", formula: "aw03-mm1-wait" },
        {
          kind: "chart",
          chart: "line",
          title: "Mean wait for a 12-minute job on one rig (M/M/1)",
          xKey: "rho",
          xLabel: "Rig utilisation",
          yLabel: "Mean wait before start (min)",
          series: [{ key: "wq", label: "Mean wait W_q" }],
          data: [
            { rho: "50 %", wq: 12 },
            { rho: "60 %", wq: 18 },
            { rho: "70 %", wq: 28 },
            { rho: "80 %", wq: 48 },
            { rho: "85 %", wq: 68 },
            { rho: "90 %", wq: 108 },
            { rho: "95 %", wq: 228 },
          ],
          caption: "W_q = rho/(1 - rho) x 12 min. Above about 80 % the curve goes vertical: a rig that is 'only' 85 % busy makes a 12-minute job wait more than an hour on average.",
        },
        {
          kind: "md",
          md: md`Two consequences matter for selection. First, cutting the job time $\tau_s$ cuts both terms: utilisation falls **and** each unit of utilisation costs less waiting. Second, pooling interchangeable rigs is very effective:`,
        },
        { kind: "equation", formula: "aw03-erlang-c" },
        {
          kind: "md",
          md: md`At the same 75 % utilisation, 6-minute smoke jobs wait 18 min on average on one rig (7.5 jobs/h) and 7.7 min on a pool of two (15 jobs/h). Pooling only works if any rig in the pool can run any job in the queue, which is why configuration drift between "identical" rigs is so costly. Real jobs are not exponential, and arrivals are bursty:`,
        },
        { kind: "equation", formula: "aw03-kingman" },
        {
          kind: "md",
          md: md`Fixed-length smoke tests ($c_s \approx 0$) with random arrivals ($c_a = 1$) wait half the M/M/1 value. But if everyone merges just before the end of the day ($c_a \approx 2$), the wait doubles again. Finally, the law that always holds:`,
        },
        { kind: "equation", formula: "aw03-littles-law" },
        {
          kind: "flow",
          title: "Hardware CI with tiered gates",
          steps: [
            { label: "Commit", detail: "Firmware, parameters, model or rig configuration change" },
            { label: "Build and unit", detail: "Reproducible build, hash, static checks, host unit tests" },
            { label: "SIL", detail: "Code against plant model, faster than real time" },
            { label: "Flash and smoke", detail: "Rig-attached runner flashes, verifies hash, boots, quick checks: pre-merge gate" },
            { label: "Nightly HIL", detail: "Regression and selected fault cases on the HIL pool" },
            { label: "Release rigs", detail: "Full fault matrix, endurance, environmental; human sign-off" },
          ],
          caption: "Each stage to the right costs more per run and has fewer, more contended resources. Selection matters most at the right-hand end; at the left, running everything is usually cheapest.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing a rig pool for a firmware team",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Pre-merge smoke tests on one rig vs two",
          given: md`Illustrative robotics firmware team: 30 engineers, each merging about 2 changes per working day, concentrated in an 8-hour day: $\lambda = 60/8 = 7.5$ jobs/h. Each pre-merge job flashes and smoke-tests on a rig for 6 minutes ($\mu = 10$ jobs/h).`,
          steps: [
            { md: md`**One rig:** $\rho = 7.5/10 = 0.75$. $W_q = 0.75/(1 - 0.75) \times 6 = 18$ min. Engineers wait three times longer than the test takes.` },
            { md: md`**Two rigs (Erlang C):** $a = 0.75$, $c = 2$, $\rho = 0.375$. Numerator $= (0.75^2/2)/(1 - 0.375) = 0.28125/0.625 = 0.45$. Denominator $= 1 + 0.75 + 0.45 = 2.2$. $P_W = 0.45/2.2 = 0.205$. $W_q = 0.205/(2 \times 10 - 7.5)$ h $= 0.0164$ h $\approx 1.0$ min.` },
            { md: md`**Or halve the job:** if a selection keeps only the smoke checks relevant to what changed and the job drops to 3 minutes on one rig ($\mu = 20$/h): $\rho = 0.375$, $W_q = 0.375/0.625 \times 3 = 1.8$ min.` },
            { md: md`**Variability:** smoke jobs are near-constant length ($c_s \approx 0$). With random arrivals, Kingman gives $W_q \approx 3 \times 0.5 \times 6 = 9$ min on one rig, but the 17:00 rush ($c_a \approx 2$) pushes it to $3 \times 2 \times 6 = 36$ min.` },
          ],
          result: md`A second rig (if it is truly identical) or a shorter job both take the wait from about 18 minutes to 1 to 2 minutes, because the system was running on the steep part of the curve. The same arithmetic at 30 % utilisation would show almost no gain: selection is worth most where rigs are contended.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Can the nightly regression fit in one night?",
          given: md`Illustrative drive-unit programme: a full HIL regression needs 300 rig-hours. The HIL pool has 12 interchangeable rigs and a 12-hour unattended window with 95 % availability. A change-impact selection (hypothetical, for this exercise) proposes 90 rig-hours of tests for tonight's changes.`,
          steps: [
            { md: md`Night capacity $= 12 \times 12 \times 0.95 = 136.8$ rig-hours.`, hidden: true, check: { prompt: "Rig-hours available in the night", answer: 136.8, unit: "rig-h", tolerance: { rel: 0.01 } } },
            { md: md`Full regression needs $300/136.8 = 2.2$ nights; results arrive on day three, after about 3 days of further merges.`, hidden: true, check: { prompt: "Nights needed for the full regression", answer: 2.19, tolerance: { abs: 0.02 } } },
            { md: md`The selected 90 rig-hours fit in one night with 46.8 rig-hours to spare for retries and fault cases.` },
            { md: md`Trade-off: the selected run is only valuable if it catches the regressions the full run would have caught. The full regression still runs, for example over the weekend, as the check on the selection.` },
          ],
          result: md`Selection turns a three-day feedback loop into an overnight one; a periodic full run audits the selection. That pairing (selected nightly, full weekly) is the normal way to introduce test selection safely.`,
        },
        {
          kind: "question",
          question: {
            id: "aw03-l04-p1",
            type: "numeric",
            prompt: md`A CI dashboard shows 24 rig jobs queued or running across the pool, and the pool completes 8 jobs per hour in steady state. Using Little's law, how long will a job submitted now take to finish, on average? (hours)`,
            answer: 3,
            tolerance: { abs: 0.01 },
            unit: "h",
            explanation: md`$W = L/\lambda = 24/8 = 3$ h. Little's law needs no assumption about job lengths or arrival patterns, only a stable system.`,
            concepts: ["aw03.littles-law"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running hardware CI in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who owns it

Usually a firmware infrastructure or DevOps engineer owns the CI system, and the test systems team owns the rigs. The interface between them (how a CI job reserves a rig, flashes, runs the sequencer and gets results back) is where most problems live.

### What is different from software CI

- **Finite, stateful targets.** A rig has state (temperature, firmware, a stuck relay) that a container does not. Every job needs a known initial state and a cleanup.
- **Bricking.** A bad bootloader or interrupted flash can leave a device unresponsive. Rig-attached runners need a power relay and a debug probe path to a known-good image, without a human.
- **Hardware variants.** The same firmware must be tested on several hardware revisions; the pool is partitioned, and each partition is a smaller queue (worse waiting).
- **Not everything is code.** Plant model updates, parameter set changes, sequence edits and rig rewiring are also changes that should trigger tests. Many CI setups only trigger on firmware commits, so rig and model changes go untested. Ripple treats firmware, model and rig changes as inputs for exactly this reason.
- **Evidence, not only gating.** In safety-relevant products the CI record becomes part of the technical documentation; it must be retained and traceable (Lesson 5).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common hardware CI failures",
          md: md`- **The pre-merge gate grows until people bypass it.** Every incident adds a test to pre-merge; after a year it takes 40 minutes plus queue, and engineers merge with "skip CI".
- **Flaky smoke tests block everyone.** One flaky pre-merge test at 2 % blocks one merge in fifty for no reason; a few of them and trust collapses (Lesson 3).
- **Results not tied to hashes.** "Nightly passed" without the exact firmware, parameter, model and rig configuration hashes is not evidence of anything specific.
- **Partitioned pools.** Three hardware revisions and four rigs means queues of one or two rigs each, running near saturation.`,
        },
        {
          kind: "ask",
          title: "Questions about their CI",
          items: [
            "What triggers a rig run today: firmware commits only, or also parameter, model and rig configuration changes?",
            "What is the median wait for a pre-merge rig job at 16:00, and how do engineers react when it is long?",
            "How long from a regression being merged to someone knowing about it?",
            "How many rigs are truly interchangeable for your pre-merge and nightly jobs?",
            "When a nightly run fails, how many builds do you have to bisect across, and how many rig-hours does that take?",
          ],
        },
        { kind: "scenario", scenario: "aw03-s2" },
        {
          kind: "question",
          question: {
            id: "aw03-l04-p2",
            type: "short",
            prompt: md`**Write a one-page "rig contention analysis" that you would send after a discovery call with an illustrative humanoid firmware team** that has 3 shared HIL rigs, about 40 merges a day concentrated in 8 hours, a 10-minute pre-merge rig job, and a nightly regression that does not finish by morning. Compute utilisation and expected wait for the current set-up, show two options (more rigs vs shorter or selected jobs) with numbers, say which you would recommend and why, and state your assumptions. Label numbers illustrative; describe Ripple only as change-impact selection with reasons.`,
            rubric: [
              "Computes arrival rate, service rate and utilisation correctly (40/8 = 5 jobs/h; 6 jobs/h per rig; rho = 5/18 = 0.28 across 3 rigs if pooled) and notices whether the pool is actually saturated",
              "Uses M/M/c or Kingman correctly, or explicitly approximates, and distinguishes pre-merge waiting from the nightly capacity problem",
              "Compares adding rigs vs shortening or selecting jobs with numbers, including the pooling condition (interchangeable rigs)",
              "Recommendation follows from the numbers (for example: pre-merge is fine, the nightly window is the bottleneck, selection plus weekly full run)",
              "States assumptions (arrival pattern, job time variability, rig interchangeability) and labels numbers illustrative",
              "No invented customer facts; Ripple described only as change-impact selection with reasons",
            ],
            modelAnswer: md`**Rig contention analysis (illustrative numbers from our call)**

**Pre-merge.** 40 merges in 8 h: $\lambda = 5$ jobs/h. 10-min jobs: $\mu = 6$ jobs/h per rig. If all three rigs are pooled: $a = 0.83$, $\rho = 0.28$. Erlang C gives $P_W \approx 0.058$ and $W_q \approx 0.058/(18 - 5)$ h, about 0.3 min. Pre-merge waiting is **not** your problem if the rigs are interchangeable. If they are partitioned by hardware revision (say one rig per revision with arrivals split evenly), each rig sees about 1.67 jobs/h, $\rho = 0.28$, $W_q = 0.28/0.72 \times 10 \approx 3.9$ min: still acceptable. The 17:00 rush roughly doubles it (Kingman, $c_a \approx 2$, $c_s \approx 0$: about $0.385 \times 2 \times 10 = 7.7$ min per rig).

**Nightly.** Full regression is 60 rig-hours (your estimate); capacity is $3 \times 10 \text{ h} \times 0.9 = 27$ rig-hours. It needs 2.2 nights, so results lag by two days and each failure is bisected across about 80 merges.

**Option A: more rigs.** Six rigs give 54 rig-hours a night: still short, plus months of lead time and integration.

**Option B: selected nightly plus weekly full.** Run the tests affected by each day's firmware, model and rig changes, ranked with reasons (Ripple's job), sized to fit 27 rig-hours; run the full 60 over the weekend as an audit of the selection.

**Recommendation:** B, validated in a pilot by comparing selected nights against the weekend full runs for four weeks. Revisit A only if selected runs routinely exceed the window.

**Assumptions:** Poisson arrivals within the day, near-constant job length, rigs interchangeable unless noted.`,
            explanation: md`Graded against the rubric. Strong answers notice that the pre-merge queue is fine at these numbers and the nightly window is the real constraint.`,
            concepts: ["aw03.rig-contention", "aw03.tiered-gating", "aw03.littles-law"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a CFO why a rig pool that is 85 % busy needs fixing, when 15 % of its capacity is still free.",
          keyPoints: [
            "Waiting grows with utilisation as rho/(1 - rho), not linearly",
            "At 85 % a 12-minute job waits about 68 minutes on average on one rig",
            "Engineers waiting is the cost, not the idle rig",
            "Pooling, shorter jobs or less variability reduce waiting more than proportionally",
          ],
        },
        { kind: "sources", refs: ["aw03-r1", "aw03-r12", "aw03-r15", "aw03-r16"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw03-l04-q1",
      type: "numeric",
      prompt: md`Jobs arrive at 4 per hour and each takes 12 minutes on one rig. What is the mean wait before a job starts (M/M/1), in minutes?`,
      answer: 48,
      tolerance: { abs: 0.5 },
      unit: "min",
      explanation: md`$\mu = 5$/h, $\rho = 0.8$, $W_q = 0.8/0.2 \times 12 = 48$ min.`,
      concepts: ["aw03.rig-contention"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "aw03-l04-q2",
      type: "numeric",
      prompt: md`Same arrivals (4 per hour, 12-minute jobs) but now two identical rigs share the queue. Using Erlang C, what is the mean wait, in minutes?`,
      answer: 2.29,
      tolerance: { abs: 0.05 },
      unit: "min",
      explanation: md`$a = 0.8$, $\rho = 0.4$. Numerator $= (0.64/2)/0.6 = 0.533$; denominator $= 1 + 0.8 + 0.533 = 2.333$; $P_W = 0.229$. $W_q = 0.229/(10 - 4)$ h $= 0.0381$ h $= 2.29$ min. Doubling capacity cut waiting by a factor of 21.`,
      concepts: ["aw03.rig-contention"],
      difficulty: 3,
    },
    {
      id: "aw03-l04-q3",
      type: "order",
      prompt: "Order these pipeline stages as they normally occur for a firmware change.",
      items: ["Reproducible build and hash", "Unit tests and static checks", "SIL", "Flash and smoke on a rig", "Nightly HIL regression", "Release rig and endurance tests"],
      explanation: md`Cheap, fast, plentiful stages first; scarce physical stages last.`,
      concepts: ["aw03.hardware-ci-pipeline"],
      difficulty: 1,
    },
    {
      id: "aw03-l04-q4",
      type: "mcq",
      prompt: "Why does pooling rigs fail to reduce waiting in many real labs?",
      options: [
        "Queueing theory does not apply to hardware",
        "The rigs are not interchangeable (hardware revisions, configuration drift), so the pool is really several small queues",
        "Pooled rigs run slower",
        "Erlang C only works for call centres",
      ],
      answer: 1,
      explanation: md`Erlang C assumes any server can serve any job. A partitioned pool behaves like separate single-rig queues near saturation.`,
      concepts: ["aw03.rig-contention"],
      difficulty: 2,
    },
    {
      id: "aw03-l04-q5",
      type: "multi",
      prompt: "Which changes should be able to trigger rig tests in a mature hardware CI? (Select all that apply.)",
      options: ["Firmware commit", "Parameter or calibration set change", "Plant model update", "Rig rewiring or IO configuration change", "Change of the CI dashboard colour"],
      answer: [0, 1, 2, 3],
      explanation: md`Any change that can alter test outcomes is a change. Many pipelines only watch firmware.`,
      concepts: ["aw03.hardware-ci-pipeline"],
      difficulty: 1,
    },
    {
      id: "aw03-l04-q6",
      type: "mcq",
      prompt: "According to Kingman's approximation, which change most reduces waiting on a busy single rig without changing mean job time?",
      options: [
        "Making job durations more variable",
        "Spreading merges evenly through the day and making job durations more uniform",
        "Raising utilisation",
        "Adding more tests to each job",
      ],
      answer: 1,
      explanation: md`$W_q \propto (c_a^2 + c_s^2)/2$: less variability in arrivals and job times means less waiting at the same utilisation.`,
      concepts: ["aw03.rig-contention"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw03-l04-f1", front: "M/M/1 mean wait", back: md`$W_q = \rho/(1-\rho)\cdot\tau_s$: 48 min for 12-min jobs at 80 %.`, concepts: ["aw03.rig-contention"] },
    { id: "aw03-l04-f2", front: "Little's law", back: md`$L = \lambda W$. 24 jobs in system at 8 jobs/h means 3 h.`, concepts: ["aw03.littles-law"] },
    { id: "aw03-l04-f3", front: "Kingman approximation", back: md`$W_q \approx \frac{\rho}{1-\rho}\cdot\frac{c_a^2+c_s^2}{2}\cdot\tau_s$: utilisation times variability times job time.`, concepts: ["aw03.rig-contention"] },
    { id: "aw03-l04-f4", front: "Three gating tiers", back: "Pre-merge (minutes: build, unit, SIL, smoke), nightly (hours: HIL regression), release (days: full fault matrix, rigs, endurance).", concepts: ["aw03.tiered-gating"] },
    { id: "aw03-l04-f5", front: "Ways to flash in CI", back: "JTAG/SWD debug probe, UDS bootloader over CAN or Ethernet (ISO 14229), USB DFU; verify by hash; keep a recovery path.", concepts: ["aw03.flash-and-recover"] },
    { id: "aw03-l04-f6", front: "Safe way to introduce test selection", back: "Selected subset nightly, full regression weekly as an audit of the selection.", concepts: ["aw03.tiered-gating"] },
  ],
  scenarios: [
    {
      id: "aw03-s2",
      title: "Every pull request on the full HIL suite",
      context: md`A pilot account. The new VP of engineering at an illustrative humanoid company, worried after a field regression, tells the test lead: "From Monday every pull request runs the full HIL suite before merge." The full suite takes 4 hours on one rig; they have 4 HIL rigs and about 25 pull requests a day. The test lead calls you.`,
      start: "a",
      concepts: ["aw03.rig-contention", "aw03.tiered-gating"],
      nodes: {
        a: {
          md: md`What do you do first?`,
          choices: [
            { text: "Do the arithmetic with the test lead: 25 x 4 = 100 rig-hours a day against at most 96 rig-hours from 4 rigs running 24 hours. Utilisation above 100 %: the queue grows without limit.", score: 10, feedback: "The decisive fact, in numbers the VP can check in thirty seconds.", next: "b" },
            { text: "Tell the VP the policy is wrong.", score: 3, feedback: "Correct conclusion, wrong messenger and no numbers. You are a vendor on a pilot.", next: "b" },
            { text: "Suggest Ripple can select a subset for every PR instead.", score: 5, feedback: "Plausible, but jumping to your product before the shared analysis looks self-serving.", next: "b" },
          ],
        },
        b: {
          md: md`The test lead takes the numbers to the VP. The VP replies: "Fine, but I need to know that what we merge has been tested against what it touches." What do you propose?`,
          choices: [
            { text: "Tiered gates: pre-merge build, SIL and a smoke test plus the HIL tests affected by the change (ranked with reasons, capped in duration); nightly a larger selected set; weekend the full suite as an audit. Report weekly how often the weekend run found something the selection missed.", score: 10, feedback: "Meets the VP's real need (tested against what it touches), fits the capacity, and measures the selection openly." },
            { text: "Buy 4 more rigs.", score: 3, feedback: "8 rigs give 192 rig-hours a day, enough on paper but at very high utilisation, with months of lead time and partitioning risk. And it does not answer the VP's question better." },
          ],
        },
      },
    },
  ],
};

export default lesson;
