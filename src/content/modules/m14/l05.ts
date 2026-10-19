import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m14-l05",
  title: "Building Your Own Tools with Claude Code",
  summary:
    "How a PM builds small, reliable tools with an agentic coding assistant: the describe → plan → build → test workflow, test vectors with known answers, four worked tool ideas (EVM dashboard, document-register checker, PR calculator, minutes generator) and the safe practices that keep ministry data where it belongs.",
  minutes: 55,
  objectives: [
    "You can explain what an agentic coding tool such as Claude Code does and where human control sits",
    "You can write a tool brief (describe), review a plan, and specify tests with known answers before any code is written",
    "You can design test vectors for PM calculations (PR, EVM, overdue counts) and use them to accept or reject a tool",
    "You can apply safe practices: approved machines, no confidential data in public tools or repositories, no secrets in code, version control",
    "You can decide when a personal tool should become an IT-supported system",
  ],
  concepts: [
    {
      id: "m14.agentic-coding",
      name: "Agentic coding assistant",
      description:
        "A tool (e.g. Claude Code) that reads project files, proposes and makes edits, and runs commands with the user's permission, iterating towards a goal you describe.",
      competency: "ai",
      related: ["m14.code-not-arithmetic"],
    },
    {
      id: "m14.describe-plan-build-test",
      name: "Describe → plan → build → test",
      description:
        "Write the brief (inputs, outputs, rules, edge cases), review the AI's plan, let it build in small steps, and accept only when tests with known answers pass.",
      competency: "ai",
    },
    {
      id: "m14.test-vectors",
      name: "Test vectors",
      description:
        "Small input datasets with independently computed expected outputs that a tool must reproduce within tolerance before it is trusted.",
      competency: "ai",
      related: ["m14.describe-plan-build-test"],
    },
    {
      id: "m14.safe-tooling",
      name: "Safe tooling practices",
      description:
        "Build and run on approved machines, keep confidential data out of public tools and repositories, never hard-code secrets, review commands before approving, and use version control.",
      competency: "ai",
    },
    {
      id: "m14.tool-lifecycle",
      name: "Personal tool lifecycle",
      description:
        "From personal script to shared team tool to IT-supported system — with documentation, ownership and handover at each step.",
      competency: "ai",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What an agentic coding tool is, and how to stay in control",
      blocks: [
        {
          kind: "md",
          md: md`You do not need to become a software engineer to build useful tools. An **agentic coding assistant** such as **Claude Code** works in your terminal or editor: it reads the files in a project folder, proposes a plan, writes and edits code, runs commands (installing a library, executing a script, running tests) — typically asking your permission before actions — and iterates until the goal is met. A project can carry a short instructions file (for Claude Code, a CLAUDE.md file) describing conventions the assistant should follow.

That power is exactly why structure matters. An assistant that can run commands can also delete files or send data somewhere if you approve carelessly. You remain the engineer of record: you specify, you review, you test, you approve.

### Describe → plan → build → test

| Step | You do | The assistant does | Why it works |
|---|---|---|---|
| **Describe** | Write a brief: purpose, inputs (with a sample file), outputs, rules, edge cases, constraints | Asks clarifying questions | Most failures are specification failures; a brief forces you to decide |
| **Plan** | Review the plan: files, libraries, steps, how it will be tested | Proposes a plan before coding | Catches misunderstandings when they are cheap |
| **Build** | Approve small steps; read diffs; keep scope tight | Writes code incrementally | Small steps are reviewable; big bangs are not |
| **Test** | Provide test vectors with known answers; check edge cases | Runs the tests, fixes failures | Acceptance is evidence-based, not "looks right" |

### Test vectors are the heart of trust

A **test vector** is a small input with an independently computed expected output. For a PR calculator: one day of data for one block where you computed PR by hand. For an EVM tool: the month-14 numbers from lesson m14-l04 (CPI 0.910, SPI 0.880, EAC 52.7). For a document-register checker: a 10-row register where you know exactly which three documents are overdue. Write the vectors **before** the code, so the assistant cannot (even unintentionally) make the tests fit the code.

Include **edge cases**: empty files, missing values, a day with zero irradiance, a document with no review date, Arabic text in a title field, a CSV with a different column order.`,
        },
        { kind: "equation", formula: "m14-performance-ratio" },
        {
          kind: "callout",
          tone: "why",
          title: "Why small tools beat big systems for a PM",
          md: md`A 150-line script that turns the monthly SCADA export into a PR table saves hours every month, is easy to read and test, and fails visibly. A grand "project control platform" built in a weekend becomes an unmaintained black box that nobody else can verify — and a liability when you move on. Build small, single-purpose tools; document them; hand them over.`,
        },
        {
          kind: "md",
          md: md`### Safe practices — non-negotiable

1. **Approved environment.** Install and run coding tools only on machines and accounts your ministry's IT has approved. Ask first.
2. **Data stays classified.** The assistant reads files in your project folder and may send their content to the model. Never put confidential tender data, personal data or sensitive grid data in a folder used with a tool not approved for it. Develop with **synthetic or anonymised sample data**; run on real data only in an approved environment.
3. **No public repositories with real data.** Do not push code containing real project data, file paths that reveal sensitive structure, or credentials to public GitHub or similar.
4. **No secrets in code.** API keys and passwords go in environment variables or a secrets store, never in files the assistant writes or you commit.
5. **Read before you approve.** Treat each command the assistant proposes as if a new contractor were about to run it on your machine. Be especially careful with commands that delete, upload or install.
6. **Version control.** Use git locally so every change is visible and reversible.
7. **Label outputs.** Reports from personal tools are working papers: state the tool version and that results were verified.`,
        },
        {
          kind: "callout",
          tone: "ai",
          title: "AI tip — ask for the plan and the tests first",
          md: md`Start a Claude Code session with: "Read the brief in BRIEF.md and the sample data. Do not write code yet. Propose a plan, list your assumptions and questions, and write the test cases from the test vectors in the brief." Approve the plan and tests, then say "build step 1 only". You stay in control of scope.`,
        },
        { kind: "sources", refs: ["m14-anthropic-docs", "m14-owasp-llm", "m14-iso-27001"] },
      ],
    },
    {
      layer: "applied",
      title: "Four tools a MEWRE PM can build",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A PR calculator for monthly SCADA exports",
          given: md`Each month the O&M contractor sends a CSV export: 10-minute rows with timestamp, block ID, AC power (kW), POA irradiance (W/m²) from the block's pyranometer, and an availability flag. You want daily and monthly PR per block, with data-quality flags. Test vector: block A, one month, $E = 1{,}840$ MWh, $H_{POA} = 215$ kWh/m², $P_{STC} = 10.4$ MWp → expected $PR = 0.823$.`,
          steps: [
            {
              md: md`**Describe (BRIEF.md).** Purpose: PR per block per day and month. Inputs: CSV with named columns (sample attached, synthetic). Rules: energy = sum of power × 10/60 h converted to MWh; irradiation = sum of irradiance × 10/60 h converted to kWh/m²; timestamps are Kuwait local time (UTC+3) — assert this; exclude rows flagged unavailable from both numerator and denominator; treat missing values as missing, never zero; flag days with more than 5% missing rows. Output: CSV + short HTML summary with a chart. Test vectors: block A month (PR 0.823), a day with zero irradiance (PR undefined, not divide-by-zero), a day with 20% missing rows (flagged).`,
            },
            {
              md: md`**Plan (review it).** The assistant proposes: Python with pandas; functions load_data, quality_checks, compute_energy, compute_pr, write_outputs; tests for each vector; a command-line entry point. You add: print control totals (row count, total MWh per block) and fail loudly if timestamps are not monotonic.`,
            },
            {
              md: md`**Build (small steps).** Step 1: loader + quality checks + control totals; you run it on the sample and compare totals with a spreadsheet sum. Step 2: energy and irradiation integration. Step 3: PR and flags. Step 4: outputs. You read each diff before approving.`,
            },
            {
              md: md`**Test.** Block A month gives $PR = 1840/(215 \times 10.4) = 0.823$ ✓; zero-irradiance day returns "undefined" with a flag ✓; 20%-missing day flagged ✓. A deliberately shifted-timestamp file triggers the time-zone assertion ✓.`,
            },
            {
              md: md`**Run on real data — in the approved environment.** Then document: README with purpose, inputs, assumptions, version, how to run, known limits; hand-over note for a colleague.`,
            },
          ],
          result: md`A tested tool that reproduces the hand-computed PR of **0.823**, refuses to divide by zero, flags data gaps and time-zone errors, and turns a half-day monthly task into a two-minute run. The test vectors stay with the code: every future change must still pass them.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A document-register checker — acceptance test",
          given: md`The project document register (exported from the document management system) lists **1,240** submitted documents with status codes, submission dates and review due dates. Your brief defines "overdue review" as: status = Under Review and review due date before the data date. You independently counted **96** overdue reviews using a spreadsheet filter. The tool reports 96 overdue and shows them by reviewer.`,
          steps: [
            { md: md`Tool output equals your independent count: 96 = 96 ✓.` },
            {
              md: md`Overdue share: $96/1240 = 7.74\%$.`,
              hidden: true,
              check: { prompt: "Share of documents with overdue review (%)", answer: 7.74, unit: "%", tolerance: { abs: 0.05 } },
            },
            {
              md: md`Edge-case test: you add a test row with a blank due date. The tool must flag it as "missing due date", not count it as on time or overdue. It does ✓. You also add a superseded revision still marked "Current" — the tool flags it ✓.`,
            },
          ],
          result: md`The tool passes the count test (96, **7.74%**) and two edge cases. Now it can run weekly and produce the list for the progress meeting — with the reviewer breakdown showing whether the OE or the ministry is the bottleneck.`,
        },
        {
          kind: "question",
          question: {
            id: "m14-l05-p1",
            type: "short",
            prompt: md`**Hands-on.** Write the **describe** brief (purpose, inputs, outputs, rules, edge cases, test vectors, constraints) for a **meeting-minutes generator** that turns your typed notes into the ministry's bilingual minutes template with an action log.`,
            rubric: [
              "Purpose and scope clearly stated (notes → minutes in template, EN and AR)",
              "Inputs defined (notes format, attendee list, previous action log) and outputs defined (document format, action log fields)",
              "Rules: no invented facts, gaps marked [ ], decisions vs discussion, owner/date required, Employer response to contractual statements",
              "Edge cases (missing owner/date, unclear note, Arabic names, carry-over actions)",
              "Test vectors with expected output and data/safety constraints (approved environment, synthetic samples)",
            ],
            modelAnswer:
              "Purpose: convert my structured notes from MEWRE progress meetings into minutes in the ministry template, English and Arabic, with an action log. Inputs: notes.txt using tags (SAFETY:, PROGRESS:, DECISION:, ACTION: text | owner | due, CONTRACTOR-STATEMENT:, EMPLOYER-RESPONSE:), attendees.csv (name, organisation, role, Arabic name), previous_actions.csv. Outputs: minutes_EN.docx and minutes_AR.docx in the template sections 1–8, and actions.csv (ID, action, owner, organisation, due, status). Rules: use only the inputs; mark missing owner/due as [ ] and list them at the end; carry over open previous actions with status; every CONTRACTOR-STATEMENT must be followed by the EMPLOYER-RESPONSE or flagged; use the term list for Arabic defined terms; IDs as A{meeting}-{nn}. Edge cases: action without owner; note with no tag; Arabic names in attendees; meeting with no decisions. Test vectors: sample_notes_1 (expected 4 actions, 1 decision, 1 flagged statement), sample_notes_2 with missing due dates (expected [ ] and a list of 2 gaps). Constraints: develop with synthetic notes only; run on real notes only on the approved machine; no network calls; no secrets in code.",
            explanation: md`A good brief makes the tool's behaviour testable and protects the record: no invented facts, explicit gaps, contractual statements always paired with the Employer's response.`,
            concepts: ["m14.describe-plan-build-test", "m14.test-vectors", "m14.safe-tooling"],
            difficulty: 2,
          },
        },
        {
          kind: "md",
          md: md`### Two more tools worth building

**EVM dashboard.** Input: monthly CSV of PV, EV, AC by WBS (from the cost report and progress measurement). Output: an HTML page with CPI/SPI trends, EAC range (CPI and composite methods), S-curves, and a table of the WBS elements driving variance. Test vector: month 14 → CPI 0.910, SPI 0.880, EAC 52.7 / 56.0 KD m. Edge cases: a WBS element with AC but no EV (work started, not measured); negative AC adjustments (credit notes).

**Meeting-minutes generator.** As in the brief above: template-driven, no free invention, bilingual, with an action-log CSV that feeds the next meeting. If you add an AI call inside the tool (via an API), the data-classification rules of lesson m14-l06 apply to every run — a template-only version that you then refine with an approved AI tool is often the safer design.

A minimal project layout the assistant can work with:

    pr-calculator/
        BRIEF.md            purpose, inputs, outputs, rules, test vectors
        CLAUDE.md           conventions: Python, pandas, no network calls, tests required
        data/sample/        synthetic sample files only
        src/pr_calc.py
        tests/test_pr.py    test vectors as automated tests
        README.md           how to run, assumptions, version, limits`,
        },
        {
          kind: "widget",
          widget: "evm",
          caption: "Use this calculator as an independent check (a second source) when you test your own EVM dashboard against the month-14 test vector.",
        },
      ],
    },
    {
      layer: "field",
      title: "Running personal tools responsibly in a ministry",
      blocks: [
        {
          kind: "md",
          md: md`### Lifecycle of a personal tool

| Stage | Users | Minimum standard |
|---|---|---|
| Personal script | You | Brief, tests, README, synthetic sample data, approved machine |
| Team tool | Your section | Version control, named owner, change log, user guide, test vectors run on every change |
| Institutional system | Sector or ministry | IT ownership, security review, access control, backups, support — rebuild properly if needed |

Move up a stage deliberately. When colleagues depend on your script for reports to senior officials, it is no longer personal: document it, get a second person able to run and maintain it, and talk to IT.

### Getting started at MEWRE

1. Ask IT which AI and development tools are approved, on which machines, for which data classifications.
2. Start with a tool that uses **non-sensitive data** (e.g. a document-register checker on metadata only).
3. Keep a library of **briefs and test vectors** — they are more valuable than the code, which the assistant can regenerate.
4. Share wins with your chain as **time saved and errors caught**, not as technology.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **No tests** — the tool "looks right" until a month with a data gap produces a wrong PR in a report to the Undersecretary.
- **Real data in the dev folder** of a tool not approved for it.
- **Public repository** with real file names, project data or an API key.
- **Approving commands blindly** — a cleanup command deletes the only copy of last month's export.
- **Scope creep** — a weekend "platform" nobody can maintain.
- **Bus factor of one** — you go on leave and the monthly report cannot be produced.`,
        },
        {
          kind: "checklist",
          title: "Tool acceptance checklist",
          items: [
            "Brief written: purpose, inputs, outputs, rules, edge cases, test vectors",
            "Plan reviewed before code; scope kept small",
            "All test vectors and edge cases pass; control totals printed",
            "Developed on synthetic/anonymised data; real data only in approved environment",
            "No secrets in code; no real data in any public repository",
            "Version control in place; README and assumptions documented",
            "Outputs labelled with tool version and 'verified' status",
            "A second person can run it",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask IT before building",
          items: [
            "Which coding assistants and AI services are approved, and under which accounts?",
            "Which data classifications may be processed on my machine with these tools?",
            "Can I use git locally, and is there an internal repository for team tools?",
            "What is the process for a team tool to become a supported system?",
          ],
        },
        { kind: "scenario", scenario: "m14-s4" },
        {
          kind: "feynman",
          prompt: "Explain to your director how you built a PR calculator with Claude Code and why its results can be trusted in a monthly report.",
          keyPoints: [
            "Describe → plan → build → test workflow with human review at each step",
            "Test vectors computed independently (e.g. PR 0.823) and edge cases (zero irradiance, gaps, time zone)",
            "Control totals checked against the source each run",
            "Developed on synthetic data; run on real data only in an approved environment",
            "Version-controlled, documented, and runnable by a second person",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m14-l05-q1",
      type: "order",
      prompt: "Order the steps for building a tool with an agentic coding assistant.",
      items: ["Describe (write the brief and test vectors)", "Plan (review the assistant's plan)", "Build (small, reviewed steps)", "Test (vectors and edge cases pass)"],
      explanation: md`Specification first, plan review second, incremental build, evidence-based acceptance.`,
      concepts: ["m14.describe-plan-build-test"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m14-l05-q2",
      type: "mcq",
      prompt: "Why write test vectors before the code is built?",
      options: [
        "To save tokens",
        "So expected results are independent of the code and cannot be fitted to it",
        "Because Claude Code requires it",
        "To make the code run faster",
      ],
      answer: 1,
      explanation: md`Independent expected outputs are the only way to know the tool is right rather than self-consistent.`,
      concepts: ["m14.test-vectors"],
      difficulty: 1,
    },
    {
      id: "m14-l05-q3",
      type: "multi",
      prompt: "Which are safe practices when building tools with an AI coding assistant at a ministry? (Select all that apply.)",
      options: [
        "Developing with synthetic or anonymised sample data",
        "Putting the API key in the script so colleagues can run it",
        "Reading proposed commands before approving them",
        "Pushing the project with real tender data to a public repository for backup",
        "Using local version control",
      ],
      answer: [0, 2, 4],
      explanation: md`Secrets never go in code; real data never goes to public repositories. Synthetic data, command review and version control are basics.`,
      concepts: ["m14.safe-tooling"],
      difficulty: 1,
    },
    {
      id: "m14-l05-q4",
      type: "numeric",
      prompt: "Your EVM dashboard test vector: BAC 48.0, EV 26.4, AC 29.0 (KD m). The tool reports EAC (CPI method) = 52.1. By how much (KD m) does it differ from the correct value? (Give the absolute difference.)",
      answer: 0.63,
      unit: "KD m",
      tolerance: { abs: 0.02 },
      explanation: md`Correct $EAC = 48.0/(26.4/29.0) = 52.73$. $|52.73 - 52.1| = 0.63$. The test fails — perhaps the tool used a rounded CPI or the wrong AC. Do not accept the tool until the vector passes within tolerance.`,
      concepts: ["m14.test-vectors"],
      difficulty: 2,
    },
    {
      id: "m14-l05-q5",
      type: "decision",
      prompt: md`You are the PM. Claude Code proposes to run a command that deletes the folder "data/old_exports" to "clean up before regenerating outputs". You are not sure what is in it. What do you do?`,
      options: [
        { text: "Approve — the assistant knows the project", score: 0, feedback: "Irreversible actions need your understanding; that folder may hold the only copy of past exports." },
        { text: "Deny, inspect the folder, and if needed move it to an archive or ask the assistant to write outputs to a new folder instead", score: 1, feedback: "Read before you approve, especially for delete/upload/install commands." },
        { text: "Approve but take a screenshot first", score: 0.2, feedback: "A screenshot does not restore files." },
      ],
      explanation: md`You remain the engineer of record; destructive commands require understanding and a recovery path.`,
      concepts: ["m14.safe-tooling", "m14.agentic-coding"],
      difficulty: 1,
    },
    {
      id: "m14-l05-q6",
      type: "short",
      prompt: "Your PR script is now used by three colleagues for monthly reports to the Assistant Undersecretary. What must change, and why?",
      rubric: [
        "Recognises it is now a team tool, not personal",
        "Version control, change log and named owner",
        "Documentation/user guide and test vectors run on every change",
        "A second person able to run and maintain it (bus factor)",
        "Engage IT for approval/support and data-classification check",
      ],
      modelAnswer:
        "It has become a team tool that feeds senior reporting, so failures now affect the sector. I would put it under version control with a change log and a named owner, write a user guide, make the test vectors automated and run them before every change, train a second person to run and maintain it, confirm with IT that the environment and data classification are approved, and discuss whether it should become a supported system.",
      explanation: md`Dependency changes the standard. Tools that feed official reporting need ownership, documentation, tests and continuity.`,
      concepts: ["m14.tool-lifecycle"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m14-l05-f1", front: "What does an agentic coding assistant do?", back: "Reads project files, plans, edits code and runs commands with your permission, iterating toward a described goal." },
    { id: "m14-l05-f2", front: "Four-step tool workflow", back: "Describe → Plan → Build → Test." },
    { id: "m14-l05-f3", front: "Test vector", back: "Small input with independently computed expected output (e.g. PR 0.823) the tool must reproduce." },
    { id: "m14-l05-f4", front: "Where do secrets go?", back: "Environment variables or a secrets store — never in code or committed files." },
    { id: "m14-l05-f5", front: "Data for developing a tool", back: "Synthetic or anonymised samples; real data only in an approved environment." },
    { id: "m14-l05-f6", front: "CLAUDE.md", back: "Project instructions file Claude Code reads: conventions, constraints (e.g. no network calls, tests required)." },
    { id: "m14-l05-f7", front: "Commands needing extra care", back: "Anything that deletes, uploads, installs or changes permissions." },
    { id: "m14-l05-f8", front: "Personal → team tool triggers", back: "Others depend on it or it feeds official reporting: add owner, version control, docs, tests, second maintainer, IT check." },
  ],
  scenarios: [
    {
      id: "m14-s4",
      title: "The helpful public repository",
      dayInLife: true,
      context: md`A section engineer has built an impressive document-register checker with an AI coding assistant on his personal laptop. To share it, he plans to push it to a public GitHub repository "so the OE can use it too". The repository folder contains a copy of the real register (1,240 documents, including titles of confidential commercial correspondence) and a configuration file with his API key.`,
      start: "a",
      concepts: ["m14.safe-tooling", "m14.tool-lifecycle"],
      nodes: {
        a: {
          md: md`What do you do?`,
          choices: [
            { text: "Stop the push; remove the real data and the API key (and revoke/rotate the key); share code through an approved internal channel; move the work to an approved machine", next: "b", score: 10, feedback: "Protects classified information and credentials, and keeps the useful tool alive." },
            { text: "Let him push but make the repository private later", next: "c", score: 1, feedback: "Once public, data and keys can be copied within minutes; making it private later does not undo exposure." },
            { text: "Ban AI coding tools in the section", next: "d", score: 3, feedback: "Overreaction that loses the benefit; the issue is practice, not the tool." },
          ],
        },
        b: {
          md: md`The engineer asks how the OE can use the tool legitimately.`,
          choices: [
            { text: "Share the code (no data, no secrets) through an approved channel or let the OE run it on its own data under its contract; document inputs and test vectors", next: "e", score: 10, feedback: "Code can travel; data and secrets stay controlled." },
            { text: "Email the OE the tool with the real register so they see how it works", next: "e", score: 2, feedback: "Still a data-handling breach if the OE is not authorised for that information via that channel." },
          ],
        },
        c: {
          md: md`A week later IT security alerts that the API key was found in a public repository and used by unknown parties.`,
          choices: [{ text: "Revoke the key and report the incident", score: 2, feedback: "Necessary damage control — and the register data exposure must also be reported." }],
        },
        d: {
          md: md`Productivity drops; people start using unapproved tools quietly at home.`,
          choices: [{ text: "Replace the ban with clear rules and training", next: "b", score: 5, feedback: "Clear rules and approved tools beat bans that drive the practice underground." }],
        },
        e: {
          md: md`Your director asks what should change for the whole section.`,
          choices: [
            { text: "Propose a one-page rule set (approved tools, data classes, no public repos with real data, no secrets in code, test vectors, owner) and an internal place to share tools", score: 10, feedback: "Turns an incident into governance — the AI-native PM's contribution." },
            { text: "Nothing — it was a one-off", score: 3, feedback: "It will recur without explicit rules." },
          ],
        },
      },
    },
  ],
};

export default lesson;
