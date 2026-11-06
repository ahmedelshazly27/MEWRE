import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc02-l04",
  title: "Writing PRDs and specs for engineers",
  summary:
    "How a non-coding founder writes product requirements a technical cofounder respects: own the problem, the users, the success metrics, the non-goals and the acceptance criteria; leave the how to the people building it; make every requirement testable with numbers and units.",
  minutes: 75,
  objectives: [
    "You can write a one to three page PRD with problem, users and jobs, goals and metrics, non-goals, requirements, acceptance criteria, constraints and open questions.",
    "You can turn vague requirements (\"fast\", \"accurate\", \"secure\") into testable ones with numbers, units and conditions.",
    "You can write acceptance criteria in Given / When / Then form that an engineer can turn into tests.",
    "You can separate the PRD (what and why, owned by you) from the design doc (how, owned by the technical cofounder) and run a review that improves both.",
  ],
  concepts: [
    {
      id: "fc02.prd",
      name: "Product requirements document (PRD)",
      description:
        "A short document that states the problem, who has it, what success looks like and how it will be measured, what is out of scope, and the requirements and acceptance criteria, without prescribing implementation.",
      competency: "fc-product",
      related: ["fc02.problem-statement", "fc02.job-story"],
    },
    {
      id: "fc02.acceptance-criteria",
      name: "Acceptance criteria",
      description:
        "Conditions, written before building, that a delivered feature must meet to be accepted: observable, testable, with numbers and units where relevant, often written as Given / When / Then scenarios.",
      competency: "fc-product",
      related: ["fc02.prd"],
    },
    {
      id: "fc02.non-goals",
      name: "Non-goals and appetite",
      description:
        "Explicit statements of what the work will not do, and the time budget (appetite) the team is willing to spend. Together they bound scope so engineers can make trade-offs without asking.",
      competency: "fc-product",
      related: ["fc02.prd", "m08.scope-creep"],
    },
    {
      id: "fc02.prd-vs-design-doc",
      name: "PRD versus design doc",
      description:
        "The PRD answers what and why and is owned by the product lead; the design doc answers how (architecture, data model, interfaces, risks) and is owned by the engineering lead. Each reviews the other.",
      competency: "fc-product",
      related: ["fc02.prd", "fc02.decision-rights"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What a spec is for",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You do not write the code in any of your ventures, so your influence on the product flows through what you write down. Ismail and Yusuf spent years validating drive units at Tesla: they are used to specifications with tolerances, test conditions and pass/fail criteria. A spec that says "fast, intuitive sync" will be politely ignored; a spec that says "aligned within one frame interval at 60 frames per second, verified against a hardware trigger on 10 test runs" will be argued with, improved and built. The format is how you earn the right to set direction without touching the implementation.`,
        },
        {
          kind: "md",
          md: md`### Two documents, two owners

| | PRD (you) | Design doc (technical cofounder) |
|---|---|---|
| Question | What problem, for whom, and what does success look like? | How will we build it? |
| Contents | Problem, users and jobs, goals and metrics, non-goals, requirements, acceptance criteria, constraints, open questions | Architecture, data model, interfaces, technology choices, alternatives considered, risks, test plan, estimate |
| Changes when | Evidence about customers changes | Technical understanding changes |
| You review it by | Asking whether it meets the acceptance criteria and constraints | Their asking whether requirements are clear, feasible and testable |

The worst outcome is a PRD that drifts into the design doc ("use a PostgreSQL table with a timestamp column") because it takes away the engineer's job and usually picks worse. The second worst is a PRD so vague the engineer has to invent the product.

### The sections that matter

| Section | What good looks like | Common failure |
|---|---|---|
| **Problem** | The problem statement from lesson 1, with evidence | A feature description |
| **Users and jobs** | Named roles and two or three job stories (lesson 3) | "All users" |
| **Goals and metrics** | One primary metric with a target and window; guardrail metrics that must not get worse | No metric, or five equally important ones |
| **Non-goals** | 3 to 6 explicit exclusions | Missing, so scope grows silently |
| **Appetite** | Time budget, e.g. "6 weeks for 2 engineers" (from Shape Up) | Open-ended |
| **Requirements** | Numbered, prioritised (must / should / could), each testable | Adjectives: fast, robust, intuitive |
| **Acceptance criteria** | Given / When / Then, with numbers and units | "Works as expected" |
| **Constraints** | Security, deployment (on-prem, air-gapped), data formats, regulation | Discovered during the customer's security review |
| **Open questions** | Who answers each, by when | Hidden assumptions |

Amazon's **working backwards** practice (writing the press release and FAQ before building) and Basecamp's **Shape Up** pitch (problem, appetite, solution sketch, rabbit holes, no-gos) are two well-documented variants of the same idea: write the outcome and the boundaries first.

### Making requirements testable

An engineer can only build to what can be tested. Replace every adjective with a quantity, a condition and a method:

| Vague | Testable |
|---|---|
| Sync should be accurate | Screen events and DAQ samples are aligned within one frame interval (16.7 ms at 60 fps), measured against a hardware trigger visible on screen and on a DAQ channel, on 10 runs |
| It should handle large files | Ingests 1 h of 16 channels at 10 kHz, 16-bit (about 1.15 GB) in under 5 min on the reference bench PC |
| Secure | No outbound network connections in on-prem mode, verified by firewall log over a 24 h capture; data at rest encrypted |
| Easy to set up | A test engineer who has not seen it before completes setup on one bench in under 30 min using only the written guide |

Units come from first principles. The sample interval is the inverse of the rate:`,
        },
        { kind: "equation", formula: "fc02-sample-interval" },
        {
          kind: "md",
          md: md`and raw data volume is channels times rate times bytes per sample times duration:`,
        },
        { kind: "equation", formula: "fc02-data-volume" },
        {
          kind: "md",
          md: md`For 16 channels at 10 kHz and 2 bytes per sample over 3,600 s: $V = 16 \times 10{,}000 \times 2 \times 3{,}600 = 1.152 \times 10^9$ bytes, about 1.15 GB per hour. Numbers like this tell your cofounder you understand the problem's physics, and they set the scale the design must handle.

### Given / When / Then

Acceptance criteria in the Gherkin style (used by Cucumber and many test tools) are easy for engineers to turn into automated tests:

> **Given** a capture with a hardware trigger pulse on DAQ channel 1 and a visible LED flash on screen,
> **When** the engineer opens the aligned timeline,
> **Then** the LED flash frame and the trigger edge are no more than 16.7 ms apart, on each of 10 consecutive runs.`,
        },
        {
          kind: "flow",
          title: "Spec lifecycle",
          steps: [
            { label: "Problem brief", detail: "You: problem, evidence, users, primary metric, appetite. One page." },
            { label: "Feasibility read", detail: "Technical cofounder: rough options, risks, what the appetite buys" },
            { label: "PRD", detail: "You: requirements, non-goals, acceptance criteria, constraints" },
            { label: "Design doc", detail: "Technical cofounder: how, alternatives, estimate, test plan" },
            { label: "Joint review", detail: "Each challenges the other; cut scope to fit appetite" },
            { label: "Build and accept", detail: "Acceptance criteria become tests; you accept against them" },
            { label: "Measure", detail: "Primary metric after release; update the PRD with what was learned" },
          ],
          caption: "The problem brief goes to engineering before the full PRD, so feasibility shapes the requirements instead of rejecting them.",
        },
      ],
    },
    {
      layer: "applied",
      title: "A PRD excerpt for Lockstep",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Lockstep: one-clock capture, PRD excerpt (illustrative)",
          given: md`Lockstep captures rig signals via data acquisition and on-screen actions on one clock. You are writing the PRD for the first pilot version. Illustrative assumptions: pilot benches log 16 channels at 10 kHz, 16-bit, and the operator's screen is recorded at 60 fps.`,
          steps: [
            {
              md: md`**Problem.** Test engineers investigating bench faults spend hours manually aligning DAQ traces with screen recordings and operator notes, because each has its own clock. Evidence: stated past behaviour in discovery calls (rung 1), one engineer showed a manual alignment spreadsheet (rung 2).

**Primary metric.** Median time from "fault noticed" to "aligned timeline available" falls from hours to under 10 min on pilot benches, within the first 4 weeks. **Guardrail:** no measurable change to existing DAQ acquisition (no dropped samples).`,
            },
            {
              md: md`**Non-goals for this version.** No automatic root-cause analysis. No cloud sync. No replacement of the customer's DAQ software: Lockstep reads its files or streams. No support for more than one bench per install. **Appetite:** 6 weeks, 2 engineers.`,
            },
            {
              md: md`**Requirements (excerpt).**

| ID | Priority | Requirement |
|---|---|---|
| R1 | Must | Align screen events to DAQ samples within one frame interval: $\Delta t = 1/60 \approx 16.7$ ms |
| R2 | Must | Ingest 1 h of 16 ch at 10 kHz, 16-bit (about 1.15 GB) in under 5 min on the reference PC |
| R3 | Must | Make no outbound network connections in on-prem mode |
| R4 | Should | Export the aligned timeline as a single file another engineer can open |
| R5 | Could | Mark events manually on the timeline with a note |`,
            },
            {
              md: md`**Acceptance criterion for R1.** Given a hardware trigger wired to DAQ channel 1 and an LED in camera view, when 10 consecutive captures are aligned, then the trigger edge and LED-on frame differ by at most 16.7 ms in all 10. Note that R1 cannot be tighter than the frame interval using the screen stream alone; asking for 1 ms would be an untestable requirement.`,
            },
            {
              md: md`**Constraints and open questions.** Constraint: runs on Windows bench PCs without admin rights (to confirm with pilot IT). Open question for engineering: can alignment use the DAQ's hardware timestamps, or only file timestamps? Owner: Yusuf, by the design review.`,
            },
          ],
          result: md`The excerpt fixes the what (alignment tolerance, volume, network behaviour), the boundaries (non-goals, appetite) and the test, and leaves every implementation choice to the design doc.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Sizing a requirement for a larger bench (illustrative)",
          given: md`A second pilot candidate runs a powertrain bench with 32 channels at 20 kHz, 24-bit samples (3 bytes), and records the operator screen at 30 fps. You need to restate R1 and R2.`,
          steps: [
            {
              md: md`Frame interval at 30 fps: $\Delta t = 1/30$ s.`,
              hidden: true,
              check: { prompt: "Frame interval", answer: 33.3, unit: "ms", tolerance: { abs: 0.1 } },
            },
            {
              md: md`DAQ sample interval at 20 kHz: $\Delta t = 1/20{,}000$ s.`,
              hidden: true,
              check: { prompt: "Sample interval", answer: 0.05, unit: "ms", tolerance: { abs: 0.001 } },
            },
            {
              md: md`Raw data per hour: $V = 32 \times 20{,}000 \times 3 \times 3{,}600$ bytes.`,
              hidden: true,
              check: { prompt: "Raw data volume per hour", answer: 6.912, unit: "GB", tolerance: { abs: 0.01 } },
            },
            { md: md`R1 becomes "within 33.3 ms" unless the screen is recorded faster; R2 must handle about 6.9 GB per hour, six times the first pilot. That is a design-doc question (streaming versus batch ingest), but you surface it in the PRD with the number.` },
          ],
          result: md`Restated: R1 alignment within one frame interval (33.3 ms at 30 fps); R2 ingest 1 h (about 6.9 GB) in under 10 min. If the customer needs tighter alignment, the requirement becomes "record at 120 fps or use a hardware sync signal", which is a scope decision to make with them, not a silent engineering change.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Writing specs a technical cofounder respects",
      blocks: [
        {
          kind: "md",
          md: md`### Habits that earn respect

1. **Bring evidence, not opinions.** Every requirement traces to a customer fact or a constraint. "Two of three pilot labs prohibit outbound connections from bench PCs" settles the cloud debate.
2. **Be precise about the problem and loose about the solution.** Quantify the outcome; do not name the database.
3. **State the appetite.** "This is worth 6 weeks, not 6 months" lets engineers choose the right design. Without it they design for the general case.
4. **Write non-goals.** Engineers love knowing what they do not have to build.
5. **Ask for their design doc and review it with questions, not instructions.** "How will this behave if the DAQ drops samples?" "What would change if a customer needs 10 benches?"
6. **Treat "that is not feasible" as the start of a conversation.** Ask: "What can we do within the appetite that gets most of the outcome?"
7. **Keep it short and current.** One to three pages. Update it when evidence changes; date the changes.

### Change control

Once building starts, requirement changes go through a short, visible process: what changes, why (new evidence), what it costs in time, and what is cut to fit. That is the same discipline as change control on a construction project, scaled down.`,
        },
        { kind: "xref", to: "m08.change-control", note: "Change control on projects (Track 0, m08): the same logic of assessing cost, time and risk before approving a change to the baseline." },
        {
          kind: "callout",
          tone: "ai",
          title: "Using AI on specs",
          md: md`AI assistants are good at turning your notes and interview quotes into a first PRD draft, generating Given / When / Then scenarios from requirements, listing edge cases ("what if the DAQ clock drifts during a 12 h run?") and checking that every requirement is testable. They are bad at knowing your customers: never let an AI invent evidence or metrics. Ask it to flag every untestable adjective in your draft; that alone improves most specs.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`**The solution spec.** "Add a button that exports to CSV" hides the problem. If the real job is "share the aligned timeline with a colleague", a link or a single file might be better.

**The wish list.** Twenty "must" requirements means none are. Force-rank: if you could only ship three, which?

**Missing constraints.** On-prem, air-gapped, Windows without admin rights, customer data never leaving the lab: in enterprise B2B these are often the hardest requirements. Find them in discovery, not in the security review.

**Acceptance by demo.** Accepting because the demo looked good. Accept against the criteria you wrote.`,
        },
        {
          kind: "checklist",
          title: "PRD review checklist",
          items: [
            "The problem statement contains no solution and cites evidence with its rung.",
            "There is exactly one primary metric with a target and a time window, plus at least one guardrail.",
            "At least three explicit non-goals and a stated appetite.",
            "Every must requirement has a number, a unit and a test method.",
            "Acceptance criteria are in Given / When / Then form and could be automated.",
            "Security, deployment and data-handling constraints are stated.",
            "Every open question has an owner and a date.",
            "Nothing in the PRD prescribes architecture or technology unless it is a customer constraint.",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc02-l04-p1",
            type: "short",
            prompt: md`Write a one-page **PRD for Mizan's "explain the drop" view**: when a plant's output falls, show the O&M manager how much of the drop is soiling versus other causes (temperature, irradiance, curtailment, inverter outage). Include problem (with evidence rung), users and two job stories, one primary metric with target and window plus a guardrail, at least three non-goals, an appetite, at least four prioritised and testable requirements, two Given / When / Then acceptance criteria, constraints and two open questions with owners. Label assumptions as illustrative.`,
            rubric: [
              "Problem and job stories are solution-free, specific to plant operations, and cite the evidence level.",
              "One primary metric with a numeric target and time window, plus a sensible guardrail (e.g. estimate accuracy or no extra workload).",
              "At least three non-goals and an explicit appetite that bound scope (e.g. no automated cleaning control, no mobile app).",
              "Requirements are prioritised and testable with numbers and units (data resolution, accuracy versus a reference, latency).",
              "Two acceptance criteria in Given / When / Then form that an engineer could turn into tests.",
              "Constraints (data access, on-prem or in-country hosting, Arabic/English) and open questions with named owners; no architecture prescribed.",
            ],
            modelAnswer: md`**Problem.** When output at a desert PV plant falls, O&M managers cannot quickly tell how much is soiling and how much is temperature, irradiance, curtailment or equipment, so cleaning decisions and explanations to the owner rely on judgement. Evidence: plants commonly clean on fixed calendars (published practice for Shagaya PV, rung 2); conversations with O&M staff not yet held (gap, to be closed in the pilot's first two weeks).

**Users and jobs.** O&M manager (primary), plant engineer, KISR researcher (methodology review).
- When output has dropped after a dust event, I want to see how much of the drop is soiling, so I can decide whether to bring cleaning forward.
- When the owner asks why yield was low last week, I want a breakdown by cause, so I can explain it with data.

**Primary metric.** In the pilot, the O&M manager uses the view to make or explain at least 3 cleaning-related decisions within 8 weeks (logged). **Guardrail:** soiling estimate within 1.5 percentage points of the reference soiling measurement on at least 80% of days (illustrative tolerance, to be set with KISR).

**Non-goals.** No automated cleaning scheduling or robot control. No mobile app. No multi-plant portfolio view. No forecasting beyond the current week. **Appetite:** 5 weeks for Omar plus one engineer.

**Requirements.**
| ID | Priority | Requirement |
|---|---|---|
| R1 | Must | Use plant power, plane-of-array irradiance and module temperature at 15-min resolution or finer |
| R2 | Must | Daily loss breakdown: soiling, temperature, irradiance, curtailment, availability, residual, in % and MWh |
| R3 | Must | Soiling estimate updated by 08:00 local time for the previous day |
| R4 | Should | Mark cleaning events and show the recovery step after each |
| R5 | Should | Labels and units in English and Arabic |
| R6 | Could | Export the weekly breakdown as a one-page PDF for the owner |

**Acceptance criteria.**
1. Given 30 days of data with 2 known cleaning events, when the view is generated, then each cleaning shows a recovery step and the estimated soiling loss on each day is within 1.5 percentage points of the reference on at least 24 of 30 days.
2. Given a day with logged curtailment of 2 MWh, when the breakdown is shown, then curtailment appears as its own category within 0.2 MWh of the logged value and is not counted as soiling.

**Constraints.** Data stays on a server agreed with the plant (in-country if required); read-only access to SCADA exports; works in a standard browser on the plant network.

**Open questions.** Is a reference soiling measurement available on site, or does the pilot install one? Owner: Omar with KISR, by week 1. Which export format and frequency can the plant provide? Owner: you, with the plant contact, before kickoff.`,
            explanation: md`The grader looks for a PRD that fixes outcomes, boundaries and tests while leaving implementation open, and that names the real constraints of working with plant data.`,
            concepts: ["fc02.prd", "fc02.acceptance-criteria", "fc02.non-goals"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["fc02-r8", "fc02-r9"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc02-l04-q1",
      type: "mcq",
      prompt: md`Which belongs in the PRD rather than the design doc?`,
      options: [
        "Use a time-series database for DAQ samples.",
        "Alignment within 16.7 ms of a hardware trigger on 10 consecutive runs.",
        "Microservice boundaries between capture and viewer.",
        "Choice of video codec.",
      ],
      answer: 1,
      explanation: md`The PRD states testable outcomes and constraints. Database, service boundaries and codec are how-decisions for the design doc, unless a customer constraint forces them.`,
      concepts: ["fc02.prd-vs-design-doc"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc02-l04-q2",
      type: "numeric",
      prompt: md`A bench logs 8 channels at 50 kHz with 2-byte samples. How much raw data does a 2-hour run produce, in GB (10^9 bytes)?`,
      answer: 5.76,
      tolerance: { abs: 0.01 },
      unit: "GB",
      explanation: md`$V = 8 \times 50{,}000 \times 2 \times 7{,}200 = 5.76 \times 10^9$ bytes $= 5.76$ GB.`,
      concepts: ["fc02.acceptance-criteria"],
      difficulty: 2,
    },
    {
      id: "fc02-l04-q3",
      type: "mcq",
      prompt: md`Which acceptance criterion is testable?`,
      options: [
        "The dashboard loads quickly.",
        "Users find the soiling view intuitive.",
        "Given 30 days of 15-minute data, when the view opens on the plant network, then it renders in under 3 s at the 95th percentile over 50 loads.",
        "The system is robust to bad data.",
      ],
      answer: 2,
      explanation: md`It has a condition, an action, a quantity with a unit, a percentile and a sample size. The others are adjectives.`,
      concepts: ["fc02.acceptance-criteria"],
      difficulty: 1,
    },
    {
      id: "fc02-l04-q4",
      type: "multi",
      prompt: md`Which are good **non-goals** for a first Lockstep pilot version? (Select all.)`,
      options: [
        "No cloud sync; on-prem only.",
        "No replacement of the customer's DAQ software.",
        "Alignment must be accurate.",
        "No automatic root-cause analysis.",
        "Support every DAQ vendor on the market.",
      ],
      answer: [0, 1, 3],
      explanation: md`Non-goals are explicit exclusions that bound scope. "Accurate alignment" is a (vague) requirement; "support every vendor" is the opposite of a non-goal.`,
      concepts: ["fc02.non-goals"],
      difficulty: 1,
    },
    {
      id: "fc02-l04-q5",
      type: "decision",
      prompt: md`Your technical cofounder reads the PRD and says R1 (alignment within 1 ms using the screen recording) is not feasible. What do you do?`,
      options: [
        { text: "Insist: the customer said they want millisecond accuracy.", score: 0, feedback: "At 60 fps a frame is 16.7 ms; 1 ms cannot be verified from the screen stream. Insisting damages trust." },
        { text: "Ask what alignment is achievable within the appetite, and go back to the customer to learn what precision their fault analysis actually needs.", score: 1, feedback: "Treats infeasibility as information, checks the real need, and keeps the decision grounded in evidence." },
        { text: "Drop R1 from the PRD.", score: 0.2, feedback: "Alignment is the core job; dropping it removes the product's value." },
        { text: "Ask an outside contractor for a second opinion.", score: 0.3, feedback: "Signals distrust and skips the useful question: what is the real requirement?" },
      ],
      explanation: md`The frame interval bounds what can be verified from the screen stream. The productive move is to find the real precision need and the options (faster recording, hardware sync) within the appetite.`,
      concepts: ["fc02.prd-vs-design-doc", "fc02.acceptance-criteria"],
      difficulty: 2,
    },
    {
      id: "fc02-l04-q6",
      type: "order",
      prompt: md`Order the spec lifecycle.`,
      items: ["Problem brief", "Feasibility read", "PRD", "Design doc", "Joint review", "Build and accept", "Measure"],
      explanation: md`Problem brief first, engineering's feasibility read before the full PRD, then design doc, joint review, build against acceptance criteria, and measure the primary metric after release.`,
      concepts: ["fc02.prd", "fc02.prd-vs-design-doc"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc02-l04-f1", front: "PRD answers... / design doc answers...", back: "PRD: what and why (product lead). Design doc: how (engineering lead).", concepts: ["fc02.prd-vs-design-doc"] },
    { id: "fc02-l04-f2", front: "Acceptance criteria format", back: "Given [context], When [action], Then [observable result with numbers and units].", concepts: ["fc02.acceptance-criteria"] },
    { id: "fc02-l04-f3", front: "Why write non-goals and an appetite?", back: "They bound scope so engineers can make trade-offs without asking, and prevent silent scope growth.", concepts: ["fc02.non-goals"] },
    { id: "fc02-l04-f4", front: "Raw DAQ data volume", back: md`$V = n_{\text{ch}} \times f_s \times b \times T$. 16 ch, 10 kHz, 2 B, 1 h: about 1.15 GB.`, concepts: ["fc02.acceptance-criteria"] },
    { id: "fc02-l04-f5", front: "Frame interval at 60 fps", back: md`$1/60 \approx 16.7$ ms: the tightest alignment verifiable from the screen stream alone.`, concepts: ["fc02.acceptance-criteria"] },
    { id: "fc02-l04-f6", front: "Primary metric plus...", back: "At least one guardrail metric that must not get worse.", concepts: ["fc02.prd"] },
  ],
};

export default lesson;
