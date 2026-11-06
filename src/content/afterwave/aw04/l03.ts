import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw04-l03",
  title: "Tools and their data models: DOORS, Polarion, Jama, Codebeamer, ReqIF, Xray and TestRail",
  summary:
    "The requirements and test management tools your buyers already run, reduced to their data models: typed items, attributes, typed links, hierarchy, baselines and workflow. How ReqIF moves requirements between OEMs and suppliers and what it loses, how test management (Xray, TestRail, built-in test modules) records runs, and where the chain stops before it reaches the bench.",
  minutes: 70,
  objectives: [
    "Describe the common data model behind requirements tools (items, types, attributes, links, hierarchy, baselines, workflow) and map each tool's vocabulary onto it",
    "Explain what ReqIF is for, its main XML elements, and what does and does not survive an exchange",
    "Describe how Xray and TestRail model tests, executions and results, and how they link to requirements",
    "Identify where the evidence chain breaks between test management and the bench, and size the linking burden",
    "Ask the integration questions that decide whether Afterwave can be deployed into a prospect's toolchain",
  ],
  concepts: [
    { id: "aw04.req-data-model", name: "Requirements tool data model", description: "Typed items with attributes, organised in hierarchies (modules, documents, trackers), connected by typed links, versioned and frozen in baselines, moved through workflow states.", competency: "aw-impact", related: ["aw04.bidirectional-traceability", "aw04.baseline"] },
    { id: "aw04.reqif", name: "ReqIF", description: "OMG Requirements Interchange Format: an XML schema for exchanging requirements, their types, attributes, hierarchy and relations between tools and companies, typically OEM to supplier and back.", competency: "aw-impact", related: ["aw04.req-data-model"] },
    { id: "aw04.test-mgmt-model", name: "Test management data model", description: "Test cases (the procedure), grouped into sets or suites, executed in executions or runs against a version and environment, producing results with a status; linked to requirements for coverage.", competency: "aw-impact", related: ["aw04.coverage-metrics"] },
    { id: "aw04.oslc", name: "OSLC and tool integration", description: "Open Services for Lifecycle Collaboration: linked-data standard for links between tools (requirements, test, change) without copying data; alternative to REST connectors and synchronisation.", competency: "aw-impact", related: ["aw04.req-data-model"] },
    { id: "aw04.run-context", name: "Test run context", description: "The configuration a result was produced on: firmware build, hardware revision, rig and fixture, sensor calibration, DAQ configuration, model version, operator and time. Usually missing or typed by hand.", competency: "aw-impact", related: ["aw04.baseline", "aw04.test-mgmt-model"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "One data model, five vocabularies",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave does not replace DOORS or Polarion, and a security-conscious test lab will not let you. You integrate: read their requirement IDs and links, write evidence back where their auditors look. That means knowing each tool's data model well enough to say in a first call "we would read your Polarion work items and link types, and attach run evidence to your test runs", and to know what an integration will cost your engineers. It is also how you avoid a classic deep-tech sales trap: being evaluated as a requirements tool and losing to the incumbent on features you never meant to build.`,
        },
        {
          kind: "md",
          md: md`### The common core

Every serious requirements tool implements the same handful of concepts:

| Concept | Meaning | Why test teams care |
|---|---|---|
| **Item** (object, artifact, work item) | One requirement, test case, risk, defect | The unit that gets an ID and links |
| **Type** | Requirement, test case, hazard... with its own attributes and workflow | Decides what a link can connect |
| **Attributes** | ID, text, status, ASIL or SIL, verification method, owner | Verification method and integrity level drive the test plan |
| **Hierarchy** | Documents, modules or trackers with chapters | How humans read and review a specification |
| **Typed links** | derives from, satisfies, verifies, mitigates | The traceability graph of Lesson 2 |
| **Versions and baselines** | Every edit is a revision; a baseline freezes a set | Evidence must point to a baselined requirement version |
| **Workflow** | Draft, reviewed, approved, obsolete | Only approved requirements should count in coverage |
| **Suspect state** | Flag on links after a change | Traceability-level impact analysis |

### The tools in that vocabulary

| Tool | Vendor | Item and structure | Links and change | Test side | Where you meet it |
|---|---|---|---|---|---|
| **DOORS (Classic)** | IBM | Objects in formal modules, attributes, DXL scripting | Link modules and linksets; baselines; suspect links | Separate tools | Aerospace, defence, rail, older automotive programs |
| **DOORS Next** | IBM (ELM) | Artifacts in modules, web-based, Jazz platform | OSLC links; streams, baselines, global configurations | IBM Engineering Test Management via OSLC | Large automotive, aerospace, defence |
| **Polarion ALM** | Siemens | Work items of configurable types; LiveDocs (document view of items) | Every change a repository revision; baselines; suspect links | Test cases and test runs built in | Automotive, medical devices, industrial |
| **Jama Connect** | Jama Software | Items of item types in a project tree | Relationships with relationship rules, trace views, suspect links, review centre | Test cases, test plans and runs built in | Medical, automotive, semiconductors, robotics |
| **Codebeamer** | PTC | Trackers (configurable item types) | Associations and references, baselines and branching | Test cases and test runs built in; templates for ISO 26262, ASPICE, IEC 62304 | Automotive, medical, industrial |

Many robotics and humanoid startups have none of these: requirements live in Confluence or Notion, tests in Jira with Xray or in TestRail, and traceability is a spreadsheet. That is a different sale (Lesson 5).`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Product details move",
          md: md`The table is general knowledge of these products as of their widely documented versions, not a check of current release notes (the research brief confirms suspect links in Jama, Polarion and DOORS Next and test coverage in Xray and TestRail; Polarion documentation was not retrieved). Built-in test modules, connector names and licensing change with releases. Verify the exact module and version in each prospect's instance before writing integration claims into a proposal.`,
        },
        {
          kind: "md",
          md: md`### ReqIF: how requirements cross company borders

**ReqIF** (Requirements Interchange Format) is an OMG standard (current version 1.2) that started in the German automotive HIS initiative, so OEMs and suppliers using different tools could exchange specifications. A ReqIF file is XML; a **.reqifz** is a zip of the XML plus attachments. Its main elements:

| Element | Holds |
|---|---|
| **DATATYPES** | Value types: string, integer, real, date, enumeration, XHTML (rich text) |
| **SPEC-TYPES** | Types of objects and relations with their **ATTRIBUTE-DEFINITIONs** (for example "Requirement" with ID, text, status, ASIL) |
| **SPEC-OBJECTS** | The requirements themselves, each with a stable **IDENTIFIER** and **LAST-CHANGE** timestamp |
| **SPEC-RELATIONS** | Typed links between objects (source, target, type) |
| **SPECIFICATIONS** | The document hierarchy: a tree of SPEC-HIERARCHY nodes pointing to objects |
| **TOOL-EXTENSIONS** | Tool-specific data that other tools may ignore |

**Typical round trip:** the OEM exports a customer specification; the supplier imports it, adds supplier attributes (accepted, accepted with comment, rejected; supplier comment; planned verification), and sends a ReqIF back. Stable identifiers and last-change timestamps let each side see what changed between versions.

**What usually does not survive:** edit history and discussions, the suspect state of links, baselines as such, scripts and views, links to items that were not exported, and anything in tool extensions the other side cannot read. Treat ReqIF as a snapshot of content and links, not as a live connection.

### Live integration: OSLC, REST and sync

- **OSLC** (Open Services for Lifecycle Collaboration) defines linked-data resources for requirements, tests and change requests, so a test in one tool links to a requirement in another by URL without copying it. IBM ELM is built on it; other vendors support parts of it.
- **REST APIs** exist for all the tools above; most integrations (including Jira connectors) are REST-based synchronisation that copies fields on a schedule.
- **Integration platforms** synchronise items between tools (for example Jira issues and requirements tool items). Sync means two copies that can drift.

### Test management data models

| Concept | Xray (Jira) | TestRail | Built-in (Polarion, Jama, Codebeamer) |
|---|---|---|---|
| Procedure | **Test** issue (manual steps, Cucumber, generic) | Test case in sections and suites | Test case item |
| Precondition | **Precondition** issue | Field on the case | Attribute or linked item |
| Grouping | **Test Set**, **Test Plan** | Suite, test plan | Test plan or test run template |
| Execution | **Test Execution** issue holding **Test Runs** | Test run (instances of cases) and plans | Test run with records per case |
| Result | Test Run status (PASS, FAIL, TODO...) with evidence attachments, defects | Result status with comment, elapsed time, attachments | Verdict per case in the run |
| Requirement link | Test covers a Jira requirement issue; coverage per version and test environment | References field to Jira issues; coverage reports | Native verifies links |

All of them record **that** a test passed against a version string someone typed. None natively records the rig signals, the calibration state of the load cell or the DAQ configuration behind the verdict. At best, a CSV or plot is attached. That is the **run context** gap.`,
        },
        {
          kind: "flow",
          title: "Where the evidence chain lives today (typical automotive-style supplier)",
          steps: [
            { label: "Customer spec (ReqIF)", detail: "OEM requirements imported into DOORS Next or Polarion" },
            { label: "System and SW requirements", detail: "Derived and linked in the requirements tool" },
            { label: "Test cases", detail: "In the same tool or in Xray or TestRail, linked by ID" },
            { label: "Test execution and verdict", detail: "Status plus a typed version string" },
            { label: "Bench data", detail: "DAQ files (MDF, TDMS, CSV) on a share or a data platform, linked by file name if at all" },
          ],
          caption: "The first four steps are linked by tools; the last link, from verdict to the signals and configuration that produced it, is usually manual.",
        },
        {
          kind: "matrix",
          title: "Where tools sit: what they hold vs how they hold it",
          xAxis: ["Planned structure (what should be verified)", "Execution evidence (what happened on the bench)"],
          yAxis: ["Signals and data", "Items and links"],
          cells: [
            { label: "Requirements and ALM tools", detail: "DOORS, Polarion, Jama, Codebeamer: requirements, links, suspect flags, test cases." },
            { label: "Test management", detail: "Xray, TestRail, built-in test runs: executions and verdicts against a version string." },
            { label: "Rarely: models of expected behaviour", detail: "Simulation baselines and expected signal envelopes, often in separate model-based tools." },
            { label: "Test data platforms and DAQ software", detail: "Signals and files with metadata; linked to requirements weakly or not at all." },
          ],
          caption: "Top row: items and links. Bottom row: signals and data. Afterwave's capture and bench memory aim at the bottom-right cell and its links upward into the top row.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Mapping a program and sizing the linking burden",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Map one bench result onto three tools",
          given: md`One illustrative result: test TC-311 (encoder loss to safe torque off), run on rig R2 with firmware build 3f9a2c, hardware rev C, load cell S/N 4471 calibrated 2026-08-14, DAQ config v12. Measured STO time 4.1 ms against an acceptance limit of 4.8 ms. Verifies requirement ACT-04.`,
          steps: [
            { md: md`**Polarion:** a test run record for test case TC-311 with verdict Passed; the run carries a custom field for build; ACT-04 links to TC-311 by a verifies link type. Rig, load cell and DAQ config have no item type unless someone created one.` },
            { md: md`**Xray:** a Test Run inside a Test Execution for version 3.0 and test environment "R2"; status PASS; TC-311 covers the Jira requirement ACT-04. The build hash is text in a field or the execution summary.` },
            { md: md`**TestRail:** a result for case C311 in a run with milestone 3.0; status Passed; References field "ACT-04"; the DAQ export attached as a file.` },
            { md: md`**Common gap:** in all three, the result knows the verdict and a version label. The measured 4.1 ms, the waveform, the calibration of the sensor and the DAQ configuration are not queryable data. So when the load cell or the DAQ config changes, nothing can say which past verdicts depended on it.` },
          ],
          result: md`The integration target for Afterwave is clear: keep the verdict where the auditors look (their test tool), and attach a stable link from that verdict to the captured run (signals, on-screen actions and configuration on one clock) in bench memory.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "How many links does honest evidence need?",
          given: md`Illustrative program: 240 system and software requirements, each derived from on average 1.2 parent requirements; 410 test cases, each verifying on average 1.2 requirements; 8 release baselines a year, each running all 410 tests once; each run should link to 5 context items (firmware build, hardware revision, rig, calibration record, DAQ configuration).`,
          steps: [
            { md: md`Derivation links: $240 \times 1.2 = 288$.` },
            { md: md`Verification links: $410 \times 1.2 = 492$. These two sets are what requirements tools hold: under 800 links, manageable by hand.` },
            { md: md`Test runs per year: $410 \times 8 = 3{,}280$.`, hidden: true, check: { prompt: "Test runs per year", answer: 3280, tolerance: { abs: 0.5 } } },
            { md: md`Context links per year: $3{,}280 \times 5 = 16{,}400$.`, hidden: true, check: { prompt: "Run-context links per year", answer: 16400, tolerance: { abs: 0.5 } } },
          ],
          result: md`The planned graph has hundreds of links; the evidence graph has tens of thousands a year. Nobody maintains 16,400 links by hand, which is why run context is typed as free text or skipped, and why it has to be captured automatically at the bench.`,
        },
        {
          kind: "question",
          question: {
            id: "aw04-l03-p1",
            type: "numeric",
            prompt: md`A supplier receives a customer specification of 1,500 requirements by ReqIF. Between version 1 and version 2, 6 % of objects have a newer LAST-CHANGE timestamp. How many requirements must the supplier review for impact?`,
            answer: 90,
            tolerance: { abs: 0.5 },
            explanation: md`$1{,}500 \times 0.06 = 90$. Stable identifiers plus last-change timestamps are what make this diff possible; without them a supplier compares two documents by eye.`,
            concepts: ["aw04.reqif"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Integration in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who owns the tools

- **Tool owner or ALM team** (larger companies): administers the requirements tool, its types and link rules, and approves integrations. Often part of a central engineering IT or a process group.
- **Requirements engineers** maintain the specifications and the ReqIF exchanges with customers.
- **Test leads** own the test management project and decide what a result record must contain.
- **IT security** reviews anything that reads from or writes to these systems, especially from on-prem software (Afterwave Enclave runs on customer servers or an isolated tenant, which helps but does not skip the review).

### What goes wrong in integrations

- Writing into the requirements tool: tool owners resist third-party writes to the requirement graph. Read requirements; write evidence to the test side.
- Copy-based sync drifts: two tools disagree about a status, and the auditor finds the disagreement.
- ID instability: requirements renumbered in a refactor break every external link. Use the tool's stable internal identifier, not the display ID, where possible.
- Free-text version fields: "v3.0", "3.0-rc2", "3.0 final" for the same build.`,
        },
        { kind: "xref", to: "fc04-l06", note: "Pilots that convert, including security reviews and on-prem deployment: the commercial side of getting an integration approved." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Do not get evaluated as a requirements tool",
          md: md`If the first meeting turns into a feature comparison with Polarion or Jama (review workflows, document export, reuse), you have lost the frame. Position Afterwave as the **evidence and change-impact layer under their existing tools**: it reads their links, captures the bench and tells them what to rerun. The incumbent tool stays, and so does the tool owner's goodwill.`,
        },
        {
          kind: "ask",
          title: "Integration discovery questions",
          items: [
            "Which requirements tool and version, cloud or on-prem, and who administers it?",
            "Which link types connect requirements to tests, and are they enforced by rules?",
            "Where do test executions and verdicts live, and what fields does a result record carry today?",
            "How is the firmware build, hardware revision and rig recorded on a result: picked from a list or typed?",
            "Do you exchange specifications by ReqIF with customers or suppliers, and how often?",
            "What is the approval path for a third-party tool to read from these systems via API?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw04-l03-p2",
            type: "short",
            prompt: md`**Produce an integration one-pager** for a prospect whose stack is Polarion for requirements and Xray in Jira for test execution (an illustrative archetype). Describe what Afterwave reads, what it writes and where, which identifiers it relies on, what it does not touch, and the three approvals you expect to need. Stay within Afterwave's described products (Lockstep, Enclave, Ripple, bench memory) and do not claim integrations exist today: present them as the proposed design for a pilot.`,
            rubric: [
              "Reads requirements, link types and test case IDs from the requirements and test tools rather than duplicating or replacing them",
              "Writes evidence (links to captured runs, run context) to the test execution side, not into the requirement graph, and says why",
              "Relies on stable identifiers (internal IDs, build hashes) rather than display IDs or free-text versions",
              "Explains where data lives (Enclave on customer servers or isolated tenant) and what leaves it (ideally nothing)",
              "Names realistic approvals (tool owner, IT security, test lead or quality) and frames the integration as a proposed pilot design, not an existing feature",
            ],
            modelAnswer: md`**Afterwave pilot integration (proposed design), Polarion + Xray**

**Reads:** from Polarion, requirement work items in scope (internal ID, title, status, verification method, integrity attribute) and the verifies links to test cases; from Xray, Test issues, Test Executions and Test Runs for the pilot versions, with their status and environment. Read-only API accounts.

**Captures:** Lockstep records rig signals (DAQ) and on-screen test-software actions on one clock for each run on the pilot rigs, plus run context: firmware build hash, hardware revision, rig and fixture ID, calibration record, DAQ configuration.

**Writes:** to Xray only, a link (and short summary) on each Test Run pointing to the captured run in bench memory. Nothing is written to Polarion: the requirement graph stays owned by the tool owner.

**Ripple:** after a change (firmware diff, rig or calibration change), it reports which tests to rerun and why, using the Polarion links plus bench history, as a list the test lead approves.

**Identifiers:** Polarion internal work item IDs, Jira issue keys, firmware build hashes (not version labels).

**Data location:** all captured data and models stay in Afterwave Enclave on the prospect's servers or an isolated tenant; no bench data leaves.

**Approvals:** (1) Polarion and Jira tool owners for read-only API access and the Xray write scope; (2) IT security review of Enclave deployment; (3) test lead or quality sign-off on what a linked evidence record means for their process.`,
            explanation: md`Graded against the rubric. The key judgement: read from the requirement side, write only evidence to the test side, keep data in Enclave, and do not present a design as a shipped feature.`,
            concepts: ["aw04.req-data-model", "aw04.test-mgmt-model", "aw04.run-context"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a new Afterwave engineer what a ReqIF file is, what it is good for and what it cannot carry.",
          keyPoints: [
            "An OMG XML format for exchanging requirements between tools and companies, born in automotive OEM-supplier exchange",
            "Carries datatypes, spec types with attribute definitions, spec objects with stable identifiers and last-change timestamps, relations and document hierarchies",
            "Good for snapshots and round trips (supplier status and comments) and for diffing versions",
            "Does not reliably carry history, discussions, suspect state, baselines, views or tool-specific extensions",
            "It is a snapshot, not a live integration; live links use OSLC or APIs",
          ],
        },
        { kind: "sources", refs: ["aw04-r6", "aw04-r7", "aw04-r9", "aw04-r10", "aw04-r17", "aw04-r11"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw04-l03-q1",
      type: "mcq",
      prompt: "In ReqIF, which element holds the document hierarchy (chapters and the order of requirements)?",
      options: ["SPEC-OBJECTS", "SPEC-RELATIONS", "SPECIFICATIONS (SPEC-HIERARCHY nodes)", "DATATYPES"],
      answer: 2,
      explanation: md`Objects hold content, relations hold links, and SPECIFICATIONS hold the tree of SPEC-HIERARCHY nodes pointing at objects. Content and structure are separate, so the same object can appear in a hierarchy without duplication.`,
      concepts: ["aw04.reqif"],
      difficulty: 1,
    },
    {
      id: "aw04-l03-q2",
      type: "multi",
      prompt: "Which of these typically do NOT survive a ReqIF export and import between different tools? (Select all that apply.)",
      options: ["Requirement text", "Stable identifiers", "Edit history and discussions", "Suspect state of links", "Typed relations between exported objects"],
      answer: [2, 3],
      explanation: md`Text, identifiers and relations between exported objects are the core of ReqIF. History, discussions and suspect flags are tool-internal state.`,
      concepts: ["aw04.reqif"],
      difficulty: 2,
    },
    {
      id: "aw04-l03-q3",
      type: "mcq",
      prompt: "In Xray, where is the PASS or FAIL of one test against one version recorded?",
      options: ["On the Test issue", "On a Test Run inside a Test Execution", "On the Test Plan", "On the requirement issue"],
      answer: 1,
      explanation: md`The Test is the procedure; a Test Execution holds Test Runs, one per test, each with a status. Coverage of a requirement is computed from the runs for a version and environment.`,
      concepts: ["aw04.test-mgmt-model"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw04-l03-q4",
      type: "mcq",
      prompt: "What is the main difference between OSLC linking and copy-based synchronisation?",
      options: [
        "OSLC is faster",
        "OSLC links resources in place by URL; synchronisation copies fields between tools on a schedule, so two copies can drift",
        "Synchronisation is a standard; OSLC is proprietary",
        "OSLC only works for test tools",
      ],
      answer: 1,
      explanation: md`Linked data keeps one source of truth per item. Sync is easier to set up but creates two records that can disagree, which auditors find.`,
      concepts: ["aw04.oslc"],
      difficulty: 2,
    },
    {
      id: "aw04-l03-q5",
      type: "decision",
      prompt: md`A prospect's tool owner asks whether Afterwave needs write access to their Polarion requirements. What is the best answer for a pilot?`,
      options: [
        { text: "Yes, full write access so Ripple can update requirements and links.", score: 0, feedback: "Tool owners rarely allow third-party writes to the requirement graph, and you do not need them." },
        { text: "No: read-only access to requirements and links; evidence links are written to the test execution records, scoped to the pilot project.", score: 1, feedback: "Right: minimal scope, writes only where evidence belongs, easy approval." },
        { text: "We do not need any access; we will import a spreadsheet.", score: 0.3, feedback: "Workable for a first week, but a spreadsheet snapshot drifts immediately and cannot support change impact over time." },
      ],
      explanation: md`Least-privilege integration shortens security review and keeps the incumbent tool owner an ally.`,
      concepts: ["aw04.req-data-model"],
      difficulty: 2,
    },
    {
      id: "aw04-l03-q6",
      type: "multi",
      prompt: "Which belong to the run context of a bench test result? (Select all that apply.)",
      options: ["Firmware build hash", "Load cell calibration record", "DAQ channel configuration", "The requirement's author", "Rig and fixture ID"],
      answer: [0, 1, 2, 4],
      explanation: md`Run context is the configuration the result was produced on. The requirement's author is metadata of the requirement, not of the run.`,
      concepts: ["aw04.run-context"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw04-l03-f1", front: "Common data model of requirements tools", back: "Typed items, attributes, hierarchy, typed links, versions and baselines, workflow, suspect state.", concepts: ["aw04.req-data-model"] },
    { id: "aw04-l03-f2", front: "ReqIF main elements", back: "DATATYPES, SPEC-TYPES (attribute definitions), SPEC-OBJECTS, SPEC-RELATIONS, SPECIFICATIONS (hierarchy), TOOL-EXTENSIONS.", concepts: ["aw04.reqif"] },
    { id: "aw04-l03-f3", front: "Polarion vs Jama vs Codebeamer vocabulary", back: "Polarion: work items and LiveDocs. Jama: items and relationships. Codebeamer: trackers. DOORS: objects in modules.", concepts: ["aw04.req-data-model"] },
    { id: "aw04-l03-f4", front: "Xray objects", back: "Test, Precondition, Test Set, Test Plan, Test Execution (holding Test Runs with status).", concepts: ["aw04.test-mgmt-model"] },
    { id: "aw04-l03-f5", front: "Run context gap", back: "Test tools record a verdict and a version label; signals, calibration and DAQ config behind the verdict are not queryable.", concepts: ["aw04.run-context"] },
    { id: "aw04-l03-f6", front: "Integration rule for a pilot", back: "Read requirements and links; write evidence to the test side only; use stable IDs and build hashes.", concepts: ["aw04.req-data-model", "aw04.oslc"] },
  ],
};

export default lesson;
