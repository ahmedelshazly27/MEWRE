import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw13-l01",
  title: "Mapping the landscape: who touches the test bench",
  summary:
    "A working map of every tool class an Afterwave buyer already owns or is evaluating: test data platforms, robotics observability, simulation and autonomy toolchains, test and measurement incumbents, requirements and test management, and data loggers and capture tools. For each: what it does, dated facts from the November 2026 research, and whether it competes with, substitutes for or complements Lockstep, Enclave and Ripple.",
  minutes: 75,
  objectives: [
    "Sort any tool a prospect names into one of six layers of the hardware test stack and say what job it does",
    "Classify each tool as direct competitor, adjacent player, substitute or complement for each Afterwave product",
    "Draw a positioning map whose axes come from the buyer's decision, and locate the white space honestly",
    "Keep a dated claim ledger so that competitor facts (funding, features, contracts) are marked reported, verified or unverified",
  ],
  concepts: [
    { id: "aw13.landscape-layers", name: "Six layers of the hardware test tool stack", description: "Test data platforms; robotics observability; simulation and autonomy toolchains; test and measurement incumbents (DAQ, sequencing, HIL, model-based test); requirements and test management; data loggers and workflow capture. Each answers a different job.", competency: "aw-business", related: ["fc03.competitive-alternatives"] },
    { id: "aw13.relationship-types", name: "Competitor, adjacent, substitute, complement", description: "Direct competitor: sells the same job to the same buyer. Adjacent: same buyer, different job, could expand into yours. Substitute: a different way to get the job done (scripts, full regression, judgment). Complement: makes your product more valuable (DAQ hardware, data formats).", competency: "aw-business", related: ["aw13.landscape-layers"] },
    { id: "aw13.change-impact-gap", name: "The change-impact white space", description: "As of the November 2026 research, no vendor was found offering change-impact or regression test selection for physical rigs, firmware and model changes as a core feature; the closest analogues are code-level change-based testing and requirements-level suspect links.", competency: "aw-business", related: ["aw13.landscape-layers"] },
    { id: "aw13.positioning-map", name: "Positioning map", description: "A 2x2 whose axes are the two dimensions the buyer uses to decide, not the two where you look best; used to show where vendors cluster and where an unserved job sits.", competency: "aw-business", related: ["fc03.market-category", "aw13.change-impact-gap"] },
    { id: "aw13.claim-ledger", name: "Competitor claim ledger", description: "A table of competitor facts, each with source, date and status (reported, verified, unverified), refreshed on a fixed cadence so that stale or single-source claims never reach a customer or investor.", competency: "aw-business", related: ["fc10.competitor-teardown"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Six layers, one bench",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every Afterwave discovery call will contain the sentence "we already have X". X may be a USD 1 bn startup, a 30-year-old NI installation, a Jama licence or a Python script one engineer wrote in 2021. You need to know, in the moment, which layer X sits in, whether it does the job Ripple does, and whether to compete, coexist or integrate. Investors ask the same question with a slide: "draw me the landscape". If your map puts Afterwave in a crowded box, you have lost the frame before the next slide.`,
        },
        {
          kind: "md",
          md: md`### Start from the job, not the logo list

A landscape is useless if it is a logo wall. Organise it by the **job each tool does at the bench**, because that is how a test lead thinks and buys:

1. **Capture:** get signals (and context) off the rig, time-aligned.
2. **Store and look:** hold the data, plot it, search it, alert on it.
3. **Execute:** sequence the test, drive instruments, run HIL or simulation.
4. **Trace and manage:** link requirements to tests, track runs and results.
5. **Decide:** after a change, which tests to rerun and why. This is Ripple's job.

Then classify each tool **per Afterwave product**, because the relationship differs: NI DAQ hardware is a complement to Lockstep (Lockstep records from it) but a capture system like NI FlexLogger overlaps it. Four relationship types:

| Type | Definition | Example for Ripple |
|---|---|---|
| **Direct competitor** | Same job, same buyer | None found as of Nov 2026 |
| **Adjacent player** | Same buyer, different job, could expand into yours | Nominal, Sift (data platforms with agents) |
| **Substitute** | Different way to get the job done | Full regression; senior engineer judgment; internal scripts |
| **Complement** | Makes you more valuable | DAQ hardware, test executives, open formats (MDF, TDMS, MCAP) |

Founder Core already teaches why the status quo is the real competitor (fc03 lesson 1); this lesson maps the named tools so you can place them fast.`,
        },
        { kind: "xref", to: "fc03-l01", note: "Dunford's competitive alternatives and the full Ripple positioning: read it first, this lesson does not repeat it." },
        {
          kind: "md",
          md: md`### The map, layer by layer (facts as found in the 6 November 2026 research brief)

**1. Test data platforms (closest adjacent players)**

| Vendor | What it does | Dated facts (funding as reported) | Change impact for rigs? |
|---|---|---|---|
| **Nominal** | "Continuous test stack for physical systems": Core data platform (secure cloud, private or on-prem) and Connect, an edge app at the bench that reads and writes instruments, runs Python test apps, sequences tests and works air-gapped | USD 75 m Series B led by Sequoia (Jun 2025); USD 80 m Series B-2 led by Founders Fund at USD 1 bn valuation (5 Mar 2026); USD 53 m sole-source IDIQ, Air Force Test Center (14 Apr 2026). Customers named: Anduril, Shield AI | Not advertised |
| **Sift** | "Observability layer for hardware": ingest telemetry from test, flight and production; rules, alerts, review. SaaS, hybrid, on-prem for classified work, GovCloud. Sift Agents research preview (late Sep 2026) | USD 42 m Series B led by StepStone (Mar 2026), GV largest investor, total USD 67 m. Customers named: K2 Space, Astranis, Impulse Space, ULA, Parallel Systems, Plantd | Not found |
| **Marple** (Antwerp) | Organise, find and visualise test and measurement data; customer Vertical Aerospace | Small undisclosed round led by Network Venture Partners (Sep 2024); no 2026 news found | Not found |

**2. Robotics observability and fleet**

| Vendor | What it does | Dated facts | Relationship |
|---|---|---|---|
| **Foxglove** | Visualisation and data management for physical AI (ROS bags, MCAP); maintains MCAP | USD 40 m Series B led by Bessemer (12 Nov 2025), total USD 58 m. Users named: NVIDIA, Amazon, Anduril, Wayve, Dexterity | Adjacent for robot-topic data; complement via MCAP |
| **Rerun** (Stockholm) | Open-source SDK and viewer for multimodal logging, building a "database for physical AI" | USD 17 m seed led by Point Nine (20 Mar 2025), total about USD 20.2 m | Adjacent; developer-led, not bench DAQ |
| **Formant** | Cloud robot-fleet operations; F3 release (1 Jul 2025) added agentic fleet features | Investors include BMW i Ventures, Intel Capital; no 2026 round found | Ops in the field, not test benches |

**3. Simulation and autonomy toolchains**

**Applied Intuition**: simulation, validation, autonomy software and vehicle OS for "all moving machines". USD 600 m Series F at USD 15 bn valuation (Jun 2025). Its scenario regression lives in simulation, not on DAQ-instrumented rigs. Adjacent at the buyer's VP level; rarely in the same budget line as a drive test bench.

**4. Test and measurement incumbents**

| Vendor | Bench tools | Recent moves | Closest thing to change impact |
|---|---|---|---|
| **NI (Emerson)** | FlexLogger (DAQ logging), TestStand (sequencing), SystemLink (test and asset management, broader availability Jul 2025) | "Nigel" AI assistant across LabVIEW+, FlexLogger, TestStand, SystemLink, announced 13 May 2026, GA later in 2026 | None found |
| **Vector** | CANoe, vTESTstudio (ECU test); VectorCAST | CANoe 20 SP2 with MCP server and AI package (24 Aug 2026, single source) | **VectorCAST change-based testing**: minimal test subset from source-code changes. Code level only |
| **dSPACE** | SCALEXIO HIL, SIL | "MCP-enabled AI engineering workflows" headline (5 Aug 2026), body not seen | None found |
| **Keysight** | PathWave Test Automation (OpenTAP-based sequencer, v9.34 dated 1 Jul 2026) | Linux support | None found |
| **MathWorks** | Simulink Test: baseline, equivalence, back-to-back regression, CI | | Model-level regression, not physical rigs |

**5. Requirements and test management**

**Jama Connect, Siemens Polarion, IBM DOORS Next** (and PTC Codebeamer in the same class): "suspect links" flag downstream test cases when a linked requirement changes. That is impact analysis at the **traceability** level: it fires when a requirement text changes, not when firmware, a model or a rig changes, and it does not read signals. **Xray** (Jira; Xray Cloud v6.16.0, 19 Jan 2026) and **TestRail** manage cases, runs and coverage; selection is manual or tag-based.

**6. Data loggers and workflow capture**

Standalone loggers (CAN and vehicle-bus loggers, portable DAQ systems with their own software) and generic workflow capture (screen recording, step-recorder documentation tools) each capture half of what Lockstep captures: the signal or the screen, on separate clocks. They are substitutes for Lockstep when an engineer aligns the two by hand afterwards, and complements when Lockstep reads their files.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Gaps in the evidence",
          md: md`The research brief read search-result summaries, not full primary pages, and flags these as **unverified**: Nominal's total raised (about USD 155 m or USD 183 m depending on source); the USD 71.2 m STRATFI amount (26 Oct 2026, seen only in a page title); the date of Nominal's Fid Labs acquisition; Sift's FedRAMP High status and the PitchBook date of its Series B; the CANoe AI package (single source); dSPACE's MCP announcement (headline only); Applied Intuition offers at USD 30 bn or more (Oct 2026); Polarion's suspect-link documentation. **Codebeamer, standalone data loggers and workflow capture tools were not researched**: describe them by category only, and check features on the vendor's own documentation before naming one to a prospect.`,
        },
        {
          kind: "matrix",
          title: "Positioning map: where the data comes from vs what the tool does with it",
          xAxis: ["Code, simulation and robot logs", "Physical bench: DAQ, rigs, operator actions"],
          yAxis: ["Records and shows what happened", "Decides what to test next"],
          cells: [
            { label: "Software-side selection", detail: "VectorCAST change-based testing (code), Simulink Test regression (models), simulation scenario regression (Applied Intuition), suspect links (requirements)" },
            { label: "White space: Ripple's target", detail: "Which rig tests to rerun after a firmware, model or rig change, and why. No vendor found advertising it as core (Nov 2026)" },
            { label: "Robotics observability", detail: "Foxglove, Rerun, Formant: robot topics, multimodal logs, fleet ops" },
            { label: "Bench data platforms and incumbents", detail: "Nominal, Sift, Marple, NI FlexLogger and SystemLink, data loggers. Lockstep capture sits here too" },
          ],
          caption: "Axes chosen from the buyer's decision after a change: where does the evidence come from, and does the tool tell me what to do? The crowded bottom-right is why Lockstep alone is a weak position and Ripple is the wedge. A white space is a hypothesis to test: either nobody has done it yet, or buyers do not pay for it.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Mapping one prospect's stack",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Classify the tools a humanoid actuator validation team already uses (illustrative)",
          given: md`Illustrative prospect, not a real account: a humanoid robot company's actuator validation team, 12 engineers, 9 rigs (dynos and joint test stands). From discovery: NI DAQ hardware with FlexLogger; TestStand for sequences; Python scripts that one senior engineer wrote to compare runs; Jama for requirements; Xray in Jira for test runs; Foxglove for whole-robot logs; operator screen recordings saved to a shared drive. They took a demo from Nominal last quarter. After each actuator firmware release they rerun about 60 % of the regression "to be safe".`,
          steps: [
            {
              md: md`**Step 1: put each tool in its layer.**

| Tool | Layer | Job |
|---|---|---|
| NI DAQ + FlexLogger | 4 Incumbent / 6 capture | Get signals off the rig |
| TestStand | 4 Incumbent | Execute sequences |
| Python comparison scripts | Substitute | Compare runs, partial "decide" |
| Jama | 5 Requirements | Trace requirements to tests |
| Xray | 5 Test management | Track runs and results |
| Foxglove | 2 Robotics observability | Look at whole-robot logs |
| Screen recordings | 6 Workflow capture | Remember what the operator did |
| Nominal (evaluating) | 1 Test data platform | Store, look, possibly capture at the bench |`,
            },
            {
              md: md`**Step 2: relationship per Afterwave product.**

| Tool | Lockstep | Enclave | Ripple |
|---|---|---|---|
| NI DAQ hardware | Complement (data source) | Neutral | Complement |
| FlexLogger | Overlap on signal logging; substitute when paired with screen recordings | Neutral | Complement (its files feed bench memory) |
| TestStand | Complement (Lockstep records around it) | Neutral | Complement (Ripple's selection becomes a TestStand run list) |
| Python scripts | Substitute | Substitute (local analysis) | **Substitute: the real opponent** |
| Jama | Neutral | Neutral | Complement (requirement links feed the dependency model); overlaps only via suspect links |
| Xray | Neutral | Neutral | Complement (selected tests become an Xray test plan) |
| Foxglove | Adjacent (robot logs, not bench DAQ) | Neutral | Neutral |
| Screen recordings | Substitute | Neutral | Neutral |
| Nominal | **Overlap: Connect also sits at the bench** | **Overlap: Core deploys on-prem** | No advertised overlap |`,
            },
            {
              md: md`**Step 3: name the opponent for each product.** For Ripple: the 60 % "to be safe" rerun plus the scripts, not Nominal. For Lockstep: FlexLogger plus screen recordings aligned by hand, and Nominal Connect if they buy it. For Enclave: their own servers, and Nominal Core on-prem.`,
            },
            {
              md: md`**Step 4: decide the play.** Lead with Ripple (no named competitor, a measurable rig-hour cost). Position Lockstep as the capture layer Ripple needs, compatible with FlexLogger and TestStand rather than replacing them. On Nominal: do not attack; ask what job they evaluated it for. If they need a data platform, Ripple's dependency model should be able to sit beside it (a design choice to validate with the team, not a claim about an existing integration).`,
            },
          ],
          result: md`Of eight tools, five are complements, two are substitutes and one (Nominal) overlaps on Lockstep and Enclave but not on Ripple. The landscape tells you the sales order: Ripple first, because that is where the prospect's spend has no vendor and the cost is visible in rig-hours.`,
        },
        {
          kind: "question",
          question: {
            id: "aw13-l01-p1",
            type: "mcq",
            prompt: md`A prospect says: "Jama already does impact analysis for us." Which statement is accurate and most useful?`,
            options: [
              "Jama does the same as Ripple, so we should position Lockstep instead.",
              "Jama's suspect links flag tests when a linked requirement changes; they do not react to firmware, model or rig changes or read signals. Ripple can use those links as one input.",
              "Jama is a legacy tool that test teams are abandoning.",
              "Suspect links are a type of regression test selection based on code coverage.",
            ],
            answer: 1,
            explanation: md`Suspect links work at the **traceability** level: a requirement changes, downstream items are flagged. They do not know a motor-controller firmware diff or a new torque sensor. That makes Jama a **complement** (its links are input to a dependency model), not a competitor. Code-coverage selection is VectorCAST's approach, a different layer.`,
            concepts: ["aw13.relationship-types", "aw13.change-impact-gap"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Keeping the map true",
      blocks: [
        {
          kind: "md",
          md: md`### Who maintains it and how

- **Owner:** you. The landscape is a GTM asset (sales, website, investor deck) and a product input (what not to build). Ismail and Yusuf review the technical columns: they will spot "does it really sequence tests?" errors faster than anyone.
- **Format:** one claim ledger (spreadsheet or doc) with columns **vendor, claim, source URL, source date, status (reported / verified on primary / unverified), last checked**. The landscape slide and battlecards read from it; nobody quotes a competitor fact that is not in it.
- **Sources, in order of trust:** vendor documentation and release notes; vendor press releases (for funding, "as reported"); public contract notices; customer case studies; conference talks; job posts (a reliable early signal of what they are building: "test selection engineer" would be a red flag); secondary news; analyst databases (they conflict: Sift's Series B date differs between Tracxn and PitchBook).
- **Cadence:** monthly scan of the six closest players (Nominal, Sift, Foxglove, NI, Vector, Applied Intuition); quarterly full refresh; immediately after any deal where a competitor appeared.`,
        },
        { kind: "xref", to: "fc10-l01", note: "How to run competitor teardowns with Claude and check every citation before it enters the ledger." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How landscape maps go wrong",
          md: md`- **Logo wall:** 40 logos, no jobs. Investors learn nothing; buyers see you as one more box.
- **Axes that flatter you:** "AI-native vs legacy" is not a dimension a test lead decides on.
- **Stale facts:** quoting Nominal's 2025 round in 2026, or a feature from an old press release (the VectorCAST material is undated).
- **Unverified as fact:** saying "Nominal has raised USD 183 m" when sources disagree. Say "reported", give the date, or leave it out.
- **Forgetting substitutes:** the full regression and the senior engineer's judgment never appear on a logo slide, yet they are what Ripple displaces in most labs (the OMICRON industrial study found hardware-dependent system tests mostly selected by tester judgment).
- **Mistaking white space for a market:** nobody advertising rig-level change impact may mean buyers will not pay for it. Your discovery calls, not the map, decide that.`,
        },
        {
          kind: "checklist",
          title: "Landscape slide: done when",
          items: [
            "Every vendor sits in a layer defined by the job it does at the bench",
            "Substitutes (full regression, judgment, scripts) appear explicitly",
            "Every fact has a date and a status; funding says 'as reported'",
            "The axes are dimensions the buyer actually uses to decide",
            "The white space claim is phrased as 'no vendor found advertising X as of Nov 2026', not 'nobody does X'",
            "Ismail or Yusuf has checked every technical claim",
          ],
        },
        {
          kind: "ask",
          title: "Discovery questions that reveal the stack",
          items: [
            "Walk me through the tools a test run passes through, from the rig to the release decision.",
            "Where does the data from one run end up, and who looks at it a month later?",
            "Which of these tools did your team build, and who maintains it?",
            "Have you evaluated any test data platform in the last year? For which problem?",
            "After the last firmware release, which tool or person decided what to rerun?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw13-l01-p2",
            type: "short",
            prompt: md`**Produce a one-page landscape map for one target segment** (choose: e-drive and motor test labs, or humanoid actuator validation). Give: (1) the six layers with two or three named tools each and what job each does; (2) for each named tool, its relationship to Ripple and to Lockstep (competitor, adjacent, substitute, complement); (3) at least two dated facts from the research brief with their status; (4) a 2x2 positioning map with axes taken from the buyer's decision and the four quadrant contents; (5) one paragraph on the white space and the evidence that would prove or disprove that buyers will pay for it. Do not invent customers or features.`,
            rubric: [
              "Layers are organised by job at the bench (capture, store and look, execute, trace and manage, decide), with correct placement of named tools",
              "Relationships are given per product (Ripple and Lockstep differ) and include substitutes such as full regression, engineer judgment and scripts",
              "Dated facts come from the research brief, with 'as reported' or 'unverified' where appropriate; no invented numbers",
              "Positioning map axes are buyer decision dimensions, and quadrant contents are consistent with the vendor descriptions",
              "White space is stated as an evidence claim with a date, and the answer names what discovery evidence would confirm willingness to pay",
            ],
            modelAnswer: md`**Segment: e-drive and motor test labs.**

**(1) Layers.** Test data platforms: Nominal (store, look, bench edge app), Sift (telemetry observability), Marple (visualise test data). Robotics observability: Foxglove (MCAP logs), Rerun (multimodal logging); low presence in drive labs. Simulation: Applied Intuition (vehicle-level simulation), MathWorks Simulink Test (model regression). Incumbents: NI FlexLogger, TestStand, SystemLink; Vector CANoe (bus test) and VectorCAST (code-level change-based testing); dSPACE SCALEXIO (HIL). Requirements and test management: Jama, Polarion (suspect links), Xray, TestRail. Loggers and capture: vehicle-bus loggers, portable DAQ software, screen recordings.

**(2) Relationships.** Ripple: no direct competitor; substitutes are full regression, senior-engineer judgment and in-house scripts; VectorCAST and suspect links are partial analogues at other layers; NI, Vector, Jama, Xray are complements (inputs and outputs). Lockstep: overlaps FlexLogger plus screen recordings (substitute pair) and Nominal Connect (adjacent, bench edge app); DAQ hardware is a complement.

**(3) Dated facts.** Nominal: USD 80 m Series B-2 at USD 1 bn valuation, 5 Mar 2026 (as reported). NI: Nigel assistant announced 13 May 2026, GA later in 2026. Sift total raised USD 67 m (reported; Series B date conflicts between sources).

**(4) Map.** x: software and simulation evidence vs physical bench evidence. y: records what happened vs decides what to test next. Top-left: VectorCAST, Simulink Test, suspect links. Top-right: empty, Ripple's target. Bottom-left: Foxglove, Rerun. Bottom-right: Nominal, Sift, Marple, FlexLogger, SystemLink, Lockstep.

**(5) White space.** As of November 2026 no vendor was found advertising rig-level change impact as a core feature. That proves only absence of supply. Willingness to pay is proven if discovery shows (a) a measured rig-hour cost of over-testing per release, (b) an owner who would budget for it, and (c) at least one lab willing to run a pilot that compares Ripple's selection against a full regression.`,
            explanation: md`Graded against the rubric. Strong answers separate Ripple's opponents (substitutes) from Lockstep's (FlexLogger plus recordings, Nominal Connect) and treat the white space as a hypothesis with a test.`,
            concepts: ["aw13.landscape-layers", "aw13.relationship-types", "aw13.positioning-map", "aw13.change-impact-gap", "aw13.claim-ledger"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor in two minutes why Afterwave's landscape slide has an empty quadrant, and why an empty quadrant is not by itself good news.",
          keyPoints: [
            "The axes are the buyer's decision: where the evidence comes from, and whether the tool decides what to retest",
            "Data platforms and incumbents crowd the 'records what happened' row; software-side selection exists for code, models and requirements",
            "No vendor was found advertising rig-level change impact as core as of November 2026",
            "Absence of supply is not proof of demand: buyers may accept full regression or judgment",
            "Discovery evidence (rig-hour cost of over-testing, a budget owner, a pilot willing to compare against full regression) is what turns the gap into a market",
          ],
        },
        { kind: "sources", refs: ["aw13-r1", "aw13-r3", "aw13-r4", "aw13-r7", "aw13-r11", "aw13-r12", "aw13-r14", "aw13-r16", "aw13-r17", "aw13-r20", "aw13-r21", "aw13-r23"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw13-l01-q1",
      type: "mcq",
      prompt: "Which existing product is the closest analogue to Ripple's change-impact selection, and at which level does it work?",
      options: [
        "Nominal Connect, at the bench instrument level",
        "VectorCAST change-based testing, at the source-code level",
        "Foxglove, at the robot log level",
        "TestRail, at the test case level",
      ],
      answer: 1,
      explanation: md`VectorCAST computes the minimal test subset affected by source-code changes, using code coverage. It is the nearest analogue, but it stops at code: it knows nothing of rigs, fixtures, sensors or physical signals. Nominal has no advertised test selection; Foxglove and TestRail do other jobs.`,
      concepts: ["aw13.change-impact-gap"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw13-l01-q2",
      type: "multi",
      prompt: "For Ripple, which of these are substitutes (different ways to get the same job done) rather than complements?",
      options: [
        "Rerunning the full regression after every change",
        "A senior engineer choosing a subset by judgment",
        "NI DAQ hardware",
        "An internal Python script that compares runs and flags tests",
        "Xray test plans in Jira",
      ],
      answer: [0, 1, 3],
      explanation: md`Substitutes do Ripple's job another way: full regression, judgment and in-house scripts. DAQ hardware produces the data Ripple reads, and Xray receives the selected test plan, so both are complements.`,
      concepts: ["aw13.relationship-types"],
      difficulty: 2,
    },
    {
      id: "aw13-l01-q3",
      type: "mcq",
      prompt: "Nominal Connect is described as an edge app at the bench that reads and writes instruments, runs Python test apps, sequences tests and works air-gapped. For which Afterwave product is it the closest overlap?",
      options: ["Ripple", "Lockstep", "Afterwave's own hardware test platforms", "None"],
      answer: 1,
      explanation: md`Connect sits where Lockstep sits: at the bench, attached to instruments. That makes Lockstep's position against Nominal weaker than Ripple's, and is why Lockstep is best sold as the capture layer Ripple needs rather than on its own.`,
      concepts: ["aw13.relationship-types", "aw13.landscape-layers"],
      difficulty: 2,
    },
    {
      id: "aw13-l01-q4",
      type: "order",
      prompt: "Order these jobs as a test run flows from rig to release decision.",
      items: ["Capture signals and context", "Store, plot and search the data", "Trace results to requirements and record the run", "Decide what to rerun after the next change"],
      explanation: md`Capture, store and look, trace and manage, decide. Execution (sequencing) runs alongside capture. Ripple owns the last step, which is why it reads from every layer before it.`,
      concepts: ["aw13.landscape-layers"],
      difficulty: 1,
    },
    {
      id: "aw13-l01-q5",
      type: "decision",
      prompt: md`You are preparing the seed deck. Sources disagree on Nominal's total raised (about USD 155 m vs USD 183 m). What do you put on the landscape slide?`,
      options: [
        { text: "The two rounds with dates and lead investors, marked 'as reported', and no total.", score: 1, feedback: "Specific, dated, sourced and honest about uncertainty. The point of the slide is the landscape, not the exact total." },
        { text: "USD 183 m, because the bigger number makes the market look validated.", score: 0.1, feedback: "Picking the convenient number from a conflicting pair is how credibility leaks in diligence." },
        { text: "An average of USD 169 m.", score: 0.2, feedback: "Averaging two conflicting sources creates a number nobody reported." },
        { text: "Leave Nominal off the slide to avoid the issue.", score: 0, feedback: "Investors know Nominal. Omitting the most visible adjacent player signals you either do not know it or fear it." },
      ],
      explanation: md`Use the claim ledger: report what is dated and attributable, mark status, and drop conflicting aggregates.`,
      concepts: ["aw13.claim-ledger"],
      difficulty: 2,
    },
    {
      id: "aw13-l01-q6",
      type: "mcq",
      prompt: "Why is the empty top-right quadrant on the positioning map a hypothesis rather than a conclusion?",
      options: [
        "Because the research used search summaries, so the competitors probably do offer it",
        "Because absence of vendors shows no supply, not that buyers will pay; discovery must show cost, an owner and pilot willingness",
        "Because positioning maps should always have the startup in the top-right",
        "Because the EU Machinery Regulation forbids test selection",
      ],
      answer: 1,
      explanation: md`A white space is either an unserved need or a need nobody pays for. Only buyer evidence separates the two.`,
      concepts: ["aw13.positioning-map", "aw13.change-impact-gap"],
      difficulty: 2,
      diagnostic: true,
    },
  ],
  flashcards: [
    { id: "aw13-l01-f1", front: "Five jobs at the bench (organise the landscape by these)", back: "Capture; store and look; execute; trace and manage; decide what to rerun.", concepts: ["aw13.landscape-layers"] },
    { id: "aw13-l01-f2", front: "Four relationship types", back: "Direct competitor (same job, same buyer), adjacent (same buyer, different job), substitute (different way to do the job), complement (makes you more valuable).", concepts: ["aw13.relationship-types"] },
    { id: "aw13-l01-f3", front: "Ripple's real opponents", back: "Full regression, senior-engineer judgment and in-house scripts. No direct vendor competitor found as of Nov 2026.", concepts: ["aw13.relationship-types", "aw13.change-impact-gap"] },
    { id: "aw13-l01-f4", front: "Closest analogues to change impact, by level", back: "Code: VectorCAST change-based testing. Models: Simulink Test regression. Requirements: suspect links (Jama, Polarion, DOORS).", concepts: ["aw13.change-impact-gap"] },
    { id: "aw13-l01-f5", front: "Positioning map axes for Afterwave", back: "Where the evidence comes from (software/sim/robot logs vs physical bench) and what the tool does (records vs decides what to test next).", concepts: ["aw13.positioning-map"] },
    { id: "aw13-l01-f6", front: "Claim ledger columns", back: "Vendor, claim, source URL, source date, status (reported / verified / unverified), last checked.", concepts: ["aw13.claim-ledger"] },
    { id: "aw13-l01-f7", front: "Nominal funding as reported", back: "USD 75 m Series B (Sequoia, Jun 2025); USD 80 m Series B-2 at USD 1 bn valuation (Founders Fund, 5 Mar 2026). Total conflicting.", concepts: ["aw13.claim-ledger"] },
  ],
};

export default lesson;
