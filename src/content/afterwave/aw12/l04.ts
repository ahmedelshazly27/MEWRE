import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw12-l04",
  title: "Security reviews and on-prem procurement",
  summary:
    "What security, IT, OT and procurement teams in hardware organisations ask of a vendor whose software sits on bench PCs and customer servers: questionnaire frameworks (SIG, CAIQ, VDA ISA), what SOC 2, ISO/IEC 27001 and TISAX mean and which segment expects which, air-gapped installation and updates, change control on validated benches, supplier onboarding, the Cyber Resilience Act, and the export control basics a test software company must know.",
  minutes: 75,
  objectives: [
    "You can say which assurance (SOC 2, ISO/IEC 27001, TISAX, IEC 62443 practices) each segment expects and what a seed-stage company offers instead.",
    "You can design an Afterwave security pack and an air-gapped installation and update procedure.",
    "You can explain why installing capture software on a validated bench PC is a configuration change and how to get it approved.",
    "You can compute the elapsed time of parallel approval tracks and shorten it.",
    "You can state the export control and sanctions checks a test software company must run, and when to get an adviser.",
  ],
  concepts: [
    { id: "aw12.assurance-by-segment", name: "Assurance expectations by segment", description: "US robotics and startups usually ask for SOC 2; European industrials for ISO/IEC 27001; German automotive for TISAX labels; OT-heavy labs for IEC 62443-style zoning; defence for national schemes. A seed company offers architecture, policies, a pen test and a dated roadmap.", competency: "aw-business", related: ["fc04.security-review"] },
    { id: "aw12.security-pack", name: "Afterwave security pack", description: "The reusable set sent early in every deal: one-page architecture and data flows (Enclave on customer servers, no outbound by default), questionnaire answer library, policies, pen test summary, SBOM, update and support-access procedures, DPA template and certification roadmap.", competency: "aw-business", related: ["aw12.assurance-by-segment", "fc04.on-prem-deployment"] },
    { id: "aw12.air-gapped-install", name: "Air-gapped installation", description: "Installing and updating software on networks with no internet path: signed offline bundles with checksums and SBOM, transfer through the customer's media-scanning process, offline licence files, local logs, and support through customer-controlled sessions.", competency: "aw-business", related: ["aw12.security-pack"] },
    { id: "aw12.validated-bench-change", name: "Validated bench configuration change", description: "Installing Lockstep on a bench PC changes a controlled test configuration; the lab's change control (and sometimes rig re-verification) applies, and OT security must approve new software and network conduits.", competency: "aw-business", related: ["aw12.air-gapped-install"] },
    { id: "aw12.approval-critical-path", name: "Approval critical path", description: "Security, contract and hardware approvals run in parallel tracks; the longest chain sets the install date, and fixed-cycle steps such as a monthly change board add a full cycle if a cutoff is missed.", competency: "aw-business", related: ["fc04.paper-process"] },
    { id: "aw12.export-control", name: "Export control and sanctions basics", description: "Classify the product against dual-use lists (EU 2021/821, Swiss and US equivalents, notably encryption), screen customers and end uses against sanctions lists, and treat customer technical data from defence programmes as possibly controlled.", competency: "aw-business", related: ["aw12.assurance-by-segment"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What security, IT, OT and procurement need from Afterwave",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave touches the two things hardware companies guard most: firmware and test data (their IP), and the lab network (their production of evidence). Lockstep runs on bench PCs, Enclave on their servers. That makes security and IT the most likely place an Afterwave deal stalls, and also the place where your architecture is your strongest argument. You will not have SOC 2 Type II or ISO 27001 at seed; you need to win the review anyway.`,
        },
        {
          kind: "xref",
          to: "fc04-l06",
          note: "Founder Core: generic security review items (questionnaires, SOC 2 Type I and II, ISO/IEC 27001, pen test, DPA) and on-prem deployment basics. This lesson covers what is specific to test labs, segments and on-prem test software.",
        },
        {
          kind: "md",
          md: md`### Questionnaires you will meet

| Framework | Who uses it | Notes |
|---|---|---|
| **Shared Assessments SIG** (Lite or Core) | Large enterprises, many US companies | Hundreds of questions; Lite is shorter |
| **CSA CAIQ** | Cloud-oriented buyers | Maps to the Cloud Controls Matrix; less relevant if Enclave is on-prem |
| **VDA ISA** | German automotive and its suppliers | The catalogue behind TISAX assessments |
| **Buyer's own list** | Most industrials | Often a spreadsheet derived from ISO/IEC 27001 controls |

Keep one answer library, mapped to ISO/IEC 27001 Annex A controls, and answer each new questionnaire from it. Never answer "yes" to a control you do not operate.

### Which assurance each segment expects

| Segment | Usual ask | What usually works at seed |
|---|---|---|
| US robotics and humanoid startups | SOC 2 (Type II eventually) | Architecture review, policies, pen test, SOC 2 Type I date |
| European industrials (drives, motors, machinery) | ISO/IEC 27001 certificate or alignment | Statement of applicability draft, policies, roadmap |
| German automotive OEMs and tier-1s | TISAX label at a given assessment level if you handle their confidential data | Argue scope: with Enclave on their servers you may not hold their data at all |
| OT-heavy labs | IEC 62443-style zoning and supplier practices | Show how Lockstep fits their zones and conduits; no new inbound paths |
| Defence | National schemes (for example US CMMC for DoD suppliers) and export control | Usually a later segment; on-prem and no data egress is a precondition |

**SOC 2** is an attestation report under the AICPA Trust Services Criteria (Type I: control design at a date; Type II: operation over a period). **ISO/IEC 27001:2022** is a certifiable information security management system with 93 Annex A controls. **TISAX** is the automotive assessment and label exchange run by the ENX Association on the VDA ISA catalogue, with assessment levels AL1 to AL3.

### The architectural argument

The strongest answer in an Afterwave review is the deployment model: Enclave on the customer's servers or an isolated tenant, Lockstep writing to it over the lab network, **no outbound connection by default**, updates as signed offline bundles, support only through a session the customer opens. If no customer data is ever held by Afterwave, many vendor-risk controls (data centre, cloud tenancy, data breach notification for hosted data) do not apply, and the review becomes a **software supply-chain review**: how you build, sign and patch what you ship.

That is where the next requirements come from:

- **SBOM:** a software bill of materials (SPDX or CycloneDX) for each release, so their team can check components against vulnerabilities.
- **Signed artifacts** with published checksums; a documented vulnerability handling and disclosure process.
- **Cyber Resilience Act (EU) 2024/2847:** software placed on the EU market as a product with digital elements will need security-by-design, vulnerability handling and support periods; reporting obligations apply from 11 September 2026 and the main obligations from 11 December 2027. Buyers will start asking about it.
- **NIS 2 (Directive (EU) 2022/2555):** manufacturers of machinery and vehicles are in scope as important entities, and must manage supply-chain security. Their questionnaires to you are partly that obligation flowing down.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check before relying on these",
          md: md`- Whether Afterwave's specific products fall under the Cyber Resilience Act, and in which category, must be confirmed with counsel; SaaS-only services are treated differently from software products.
- TISAX scope rules, current VDA ISA version and assessment details should be checked on the ENX site.
- CMMC phase-in dates for US defence contracts are not in the research brief and must be checked before any defence conversation.`,
        },
        {
          kind: "md",
          md: md`### The bench PC is a controlled configuration

Installing Lockstep on a bench PC is not like installing an app on a laptop. In many labs the bench PC, its sequencer version, DAQ drivers and scripts are a **controlled test configuration**: test results are valid because that configuration is known. A new process that hooks into the screen and the DAQ stream is a change to it. Expect:

- **Change control:** a change request, impact assessment and approval by the lab or a change advisory board (CAB), often on a fixed cycle.
- **Verification:** a short check that the rig still produces the same results with Lockstep running (CPU load, timing, no interference with the DAQ driver).
- **OT security:** software allow-listing on bench PCs, endpoint agents, and approval of any new network conduit from the bench PC to the Enclave server.

Offer this up front: a resource-usage note, a passive capture mode, a verification procedure the lab can run, and a rollback procedure.

### Air-gapped installation and updates

Many labs, especially in defence, automotive pre-production and safety testing, have no internet path from the lab network.

1. **Prerequisites document:** server specification, OS, container runtime, storage per rig-month, ports.
2. **Offline bundle:** container images and packages, signed, with checksums and SBOM.
3. **Transfer:** through the customer's media-scanning or data-diode process; never your USB stick.
4. **Licence:** an offline licence file with expiry; no call-home.
5. **Updates:** the same signed-bundle process on a predictable cadence, with release notes stating security fixes.
6. **Support:** logs exported by the customer; remote sessions opened and controlled by them.

### Supplier onboarding and approvals run in parallel

Supplier registration, security review, OT and CAB approvals, legal review and server procurement are separate tracks. The elapsed time is the longest chain, not the sum:`,
        },
        { kind: "equation", formula: "aw12-critical-path" },
        {
          kind: "flow",
          title: "Parallel approval tracks for an on-prem pilot",
          steps: [
            { label: "Day 0: kick-off", detail: "Security pack sent; onboarding forms; server request" },
            { label: "Security track", detail: "Questionnaire, review, architecture call, CAB" },
            { label: "Commercial track", detail: "Supplier registration, pilot agreement, PO" },
            { label: "Hardware track", detail: "Customer IT orders or allocates the Enclave server" },
            { label: "Install", detail: "When security and hardware tracks are both done" },
          ],
          caption: "Start all three tracks on the same day; the install waits only for the longest.",
        },
      ],
    },
    {
      layer: "applied",
      title: "How long until you can install?",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Approval timeline for an illustrative tier-1 on-prem pilot",
          given: md`**Illustrative durations** (calendar days, including waiting). Security: answer questionnaire 5, buyer review 20, architecture call scheduled 10, monthly CAB 30. Commercial: supplier registration 15, pilot agreement legal review 25, purchase order 10. Hardware: customer IT allocates a server 35. Installation 5, after both the CAB approval and the server.`,
          steps: [
            { md: md`**Sequential (one after the other):** $5 + 20 + 10 + 30 + 15 + 25 + 10 + 35 + 5 =$ **155 days**.` },
            { md: md`**Parallel tracks:** security $5 + 20 + 10 + 30 = 65$; commercial $15 + 25 + 10 = 50$; hardware $35$.` },
            { md: md`**Install** waits for security and hardware: $\max(65, 35) + 5 =$ **70 days**. The commercial track (50) finishes before, so the PO is not on the critical path.` },
            { md: md`**Saving:** $155 - 70 = 85$ days, almost three months, from starting all tracks on day 0 instead of after the verbal yes.` },
          ],
          result: md`About 10 weeks from kick-off to installation if everything starts together, against about 22 weeks in sequence. The security track is critical; within it, the CAB cycle is the largest single step.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a missed CAB cutoff and a faster answer library",
          given: md`Same tracks. The architecture call slips and you miss the CAB submission cutoff by two days, so you wait for the next monthly cycle (an extra 30 days on that step). Separately, your answer library lets you answer the questionnaire in 2 days instead of 5.`,
          steps: [
            { md: md`Missed cutoff only: security track $5 + 20 + 10 + 60 = 95$.` },
            { md: md`Install $= \max(95, 35) + 5 =$ **100 days**.`, hidden: true, check: { prompt: "Days to install after missing the CAB cutoff", answer: 100, unit: "days", tolerance: { abs: 0.5 } } },
            { md: md`Faster library only (CAB on time): security track $2 + 20 + 10 + 30$.` },
            { md: md`$= 62$, install $= \max(62, 35) + 5 =$ **67 days**.`, hidden: true, check: { prompt: "Days to install with the faster answer library", answer: 67, unit: "days", tolerance: { abs: 0.5 } } },
          ],
          result: md`Missing one fixed-cycle cutoff costs 30 days; a better answer library saves 3. Find out the CAB dates in the first meeting and plan backwards from them.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running the review",
      blocks: [
        {
          kind: "checklist",
          title: "The Afterwave security pack",
          items: [
            "One-page architecture and data-flow diagram: Lockstep, lab network, Enclave server, no outbound by default",
            "Questionnaire answer library mapped to ISO/IEC 27001 Annex A controls",
            "Information security policies (access control, secure development, vulnerability handling, incident response)",
            "Most recent third-party penetration test summary with fixes closed",
            "SBOM and signing procedure for each release",
            "Air-gapped install, update and rollback procedure; offline licence model",
            "Bench PC resource-usage note and verification procedure for change control",
            "Support access policy (customer-controlled sessions only)",
            "Data processing agreement template (for user accounts and logs)",
            "Certification roadmap with dates (SOC 2 Type I, ISO/IEC 27001) and what triggers each",
          ],
        },
        {
          kind: "md",
          md: md`### Export control and sanctions: the basics

Test software is usually not a controlled item, but three things can make it one, or make a sale illegal:

- **Encryption.** Dual-use lists (EU Regulation 2021/821 Annex I, Category 5 Part 2; the Swiss and US equivalents) control certain cryptographic functionality. Software using standard encryption often qualifies for exemptions or decontrol notes, but you must **classify** your product and record why.
- **Customer and destination.** Screen every customer and end user against EU, Swiss (SECO) and, where US content or persons are involved, US (OFAC, BIS Entity List) lists. EU sanctions on Russia restrict exports of many machinery and software items; do not rely on memory, check.
- **Customer technical data.** Data from defence programmes may itself be controlled (for example under the US ITAR or EAR). With Enclave on their servers it never leaves their control, which is one more reason the on-prem model matters, but support staff who view it remotely may count as an export or deemed export.

Before your first sale outside the EU and Switzerland, or to any defence or dual-use customer, get a written classification from an export control adviser.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How security and procurement stall Afterwave deals",
          md: md`- **Claiming certifications you do not have.** It is discovered, and it ends the deal and your reputation in a small industry.
- **Only talking to office IT.** OT security owns the bench PCs and the lab network.
- **No answer for change control.** "Just install it" on a validated bench PC is a red flag to a lab manager.
- **Starting tracks after the verbal yes.** Adds months (see the worked example).
- **Missing the CAB calendar.** One missed cutoff costs a full cycle.
- **Shipping updates that need internet.** An air-gapped customer cannot take your update; plan bundles from day one.`,
        },
        {
          kind: "ask",
          title: "Questions for the security and IT kick-off",
          items: [
            "Which questionnaire do you use, and can we receive it now rather than after the pilot is agreed?",
            "Who owns the bench PCs and the lab network: office IT, OT security or the test systems group?",
            "Is there a change advisory board for lab configuration changes, and when are its next two submission cutoffs?",
            "Do you need TISAX or a certificate if no data leaves your servers, or does an architecture review suffice for an on-prem pilot?",
            "How are offline software bundles transferred into the lab network today?",
            "Who allocates or orders the server for Enclave, and how long does that take?",
          ],
        },
        { kind: "scenario", scenario: "aw12-s2" },
        {
          kind: "question",
          question: {
            id: "aw12-l04-p1",
            type: "short",
            prompt: md`Write the security and deployment plan you would send to an **illustrative** prospect's security lead and lab manager for a 2-rig on-prem pilot (choose the segment: US humanoid startup, German automotive tier-1, or European drives maker). Include: the assurance you can offer now and the roadmap; the architecture and data flows; the bench PC change-control approach; the air-gapped install and update procedure; an approval timeline with parallel tracks and the critical path; and the export control and sanctions checks you have done or will do.`,
            rubric: [
              "Assurance offered matches the chosen segment (SOC 2, ISO/IEC 27001, TISAX scope argument) and is honest about what exists, with a dated roadmap.",
              "Architecture states where data lives, no outbound by default, customer-controlled support, and signed offline updates with SBOM.",
              "Bench PC change control is addressed with a resource note, verification procedure and rollback.",
              "Air-gapped install covers bundle, transfer via the customer's process, offline licence and update cadence.",
              "Timeline has parallel tracks with durations and identifies the critical path and fixed-cycle steps.",
              "Export control: product classification (encryption), customer screening, and handling of possibly controlled customer data; adviser for edge cases.",
            ],
            modelAnswer: md`**Security and deployment plan (illustrative): German automotive tier-1, e-drive validation, 2 inverter HIL benches.**

**Assurance now:** architecture review, information security policies, pen test summary (dated), questionnaire answers from our ISO/IEC 27001-mapped library, SBOM per release. Roadmap: SOC 2 Type I in Q3 (illustrative), ISO/IEC 27001 certification started next year. **TISAX:** for this pilot Afterwave does not receive or store your data (Enclave runs on your server, no outbound connection), so we propose an architecture review in place of a TISAX label; if a later cloud tenant is used, TISAX scope will be revisited.

**Architecture:** Lockstep on the 2 bench PCs writes over one new conduit (single port, bench PC to Enclave server in the lab zone). Enclave on a customer server. No outbound connection; no telemetry. Support through sessions opened and controlled by your IT; logs exported by you.

**Bench PC change:** resource note (CPU, memory, disk I/O under load), passive capture mode, verification procedure (run the reference test with and without Lockstep, compare results), rollback (uninstall script, restore image). Submitted to your CAB with the change request.

**Air-gapped:** signed offline bundle with checksums and SBOM, transferred via your media-scanning kiosk; offline licence file valid 12 months; updates monthly by the same process, security fixes flagged in release notes.

**Timeline:** day 0 all tracks start. Security: questionnaire 2 days, your review 20, architecture call 10, CAB 30 (next cutoff 14 March, illustrative), total 62. Commercial: supplier registration 15, pilot agreement 25, PO 10, total 50. Server: 35. Install day 67. Critical path: security track, especially the CAB cutoff.

**Export control:** product self-classified for encryption with an adviser's note (standard TLS and disk encryption); customer screened against EU and Swiss sanctions lists; no defence programme data in scope; any future defence work requires a separate review.`,
            explanation: md`The plan turns a long review into a scheduled, parallel process, and leads with the on-prem architecture.`,
            concepts: ["aw12.assurance-by-segment", "aw12.security-pack", "aw12.air-gapped-install", "aw12.validated-bench-change", "aw12.approval-critical-path", "aw12.export-control"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["aw12-r3", "aw12-r4", "aw12-r5", "aw12-r6", "aw12-r7", "aw12-r8", "aw12-r9", "aw12-r10", "aw12-r18", "aw12-r19"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw12-l04-q1",
      type: "mcq",
      prompt: "Which assurance is a German automotive tier-1 most likely to ask for from a supplier handling its confidential information?",
      options: ["A SOC 1 report", "A TISAX label at the required assessment level", "A PCI DSS certificate", "None"],
      answer: 1,
      explanation: md`TISAX, based on the VDA ISA catalogue, is the automotive standard exchange. With Enclave on their servers you may argue it is out of scope for a pilot.`,
      concepts: ["aw12.assurance-by-segment"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw12-l04-q2",
      type: "numeric",
      prompt: md`Tracks: security $4 + 15 + 7 + 30$ days; commercial $20 + 20 + 10$; hardware $45$. Install (5 days) needs security and hardware. How many days from kick-off to the end of installation?`,
      answer: 61,
      tolerance: { abs: 0.5 },
      unit: "days",
      explanation: md`Security 56, commercial 50, hardware 45. Install $= \max(56, 45) + 5 = 61$ days.`,
      concepts: ["aw12.approval-critical-path"],
      difficulty: 2,
    },
    {
      id: "aw12-l04-q3",
      type: "multi",
      prompt: "Which belong in an air-gapped installation and update procedure? (Select all that apply.)",
      options: [
        "Signed bundles with checksums and an SBOM",
        "Transfer through the customer's media-scanning process",
        "An offline licence file",
        "A licence check that calls home daily",
        "Customer-controlled support sessions",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`A call-home licence check cannot work on an air-gapped network and would fail the review.`,
      concepts: ["aw12.air-gapped-install"],
      difficulty: 1,
    },
    {
      id: "aw12-l04-q4",
      type: "mcq",
      prompt: "Why is installing Lockstep on a bench PC treated as a change by many labs?",
      options: [
        "Because all software is banned on bench PCs",
        "Because the bench PC, sequencer, drivers and scripts form a controlled test configuration on which result validity depends, so a new process hooking into it needs change control and verification",
        "Because Lockstep needs internet access",
        "Because it is a hardware change",
      ],
      answer: 1,
      explanation: md`Offer a resource note, verification procedure and rollback with the change request.`,
      concepts: ["aw12.validated-bench-change"],
      difficulty: 2,
    },
    {
      id: "aw12-l04-q5",
      type: "decision",
      prompt: md`Illustrative. A prospect's security questionnaire asks: "Do you hold an ISO/IEC 27001 certificate?" You do not; you have policies mapped to Annex A and plan to start certification next year.`,
      options: [
        { text: "Answer 'Yes, aligned'.", score: 0, feedback: "Misleading: 'aligned' read as 'certified' will be found out." },
        { text: "Answer 'No', then state which controls you operate, attach the policies and the dated roadmap, and explain that with Enclave on their servers no customer data is held by Afterwave.", score: 1, feedback: "Honest and complete; moves the review to the real risk." },
        { text: "Skip the question.", score: 0.1, feedback: "Unanswered questions stop reviews." },
      ],
      explanation: md`Never claim a control or certification you do not have. Compensating evidence and architecture carry seed-stage reviews.`,
      concepts: ["aw12.security-pack", "aw12.assurance-by-segment"],
      difficulty: 1,
    },
    {
      id: "aw12-l04-q6",
      type: "multi",
      prompt: "Which export control and sanctions checks should a test software company run before a sale? (Select all that apply.)",
      options: [
        "Classify the product, including its encryption functionality",
        "Screen the customer and end user against sanctions lists",
        "Consider whether customer technical data (for example from defence programmes) is controlled",
        "Nothing: software is never controlled",
      ],
      answer: [0, 1, 2],
      explanation: md`Software can be controlled (notably encryption), customers can be sanctioned, and customer data can be controlled technical data.`,
      concepts: ["aw12.export-control"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw12-l04-f1", front: "Assurance by segment", back: "US startups: SOC 2. European industrials: ISO/IEC 27001. German automotive: TISAX. OT labs: IEC 62443 zoning. Defence: national schemes plus export control.", concepts: ["aw12.assurance-by-segment"] },
    { id: "aw12-l04-f2", front: "Afterwave's strongest security answer", back: "Enclave on the customer's servers, no outbound by default, signed offline updates, customer-controlled support: a supply-chain review, not a data-hosting review.", concepts: ["aw12.security-pack"] },
    { id: "aw12-l04-f3", front: "Bench PC change package", back: "Resource-usage note, passive capture mode, verification procedure, rollback, CAB submission.", concepts: ["aw12.validated-bench-change"] },
    { id: "aw12-l04-f4", front: "Approval critical path", back: md`$T = \max_j \sum d_i$: start security, commercial and hardware tracks on day 0; a missed monthly CAB cutoff adds 30 days.`, concepts: ["aw12.approval-critical-path"] },
    { id: "aw12-l04-f5", front: "Cyber Resilience Act dates", back: "Regulation (EU) 2024/2847: reporting from 11 September 2026, main obligations from 11 December 2027.", concepts: ["aw12.security-pack"] },
    { id: "aw12-l04-f6", front: "Three export control checks", back: "Classify the product (encryption); screen customer and end use against sanctions lists; treat defence customer data as possibly controlled.", concepts: ["aw12.export-control"] },
  ],
  scenarios: [
    {
      id: "aw12-s2",
      title: "OT security says no software on bench PCs",
      dayInLife: true,
      context: md`Illustrative. A drives manufacturer has agreed a 2-rig pilot. The OT security lead emails: "Bench PCs are on our allow-list policy. No new software, and no new connections from the lab zone. Lockstep cannot be installed."`,
      start: "a",
      concepts: ["aw12.validated-bench-change", "aw12.security-pack", "aw12.air-gapped-install"],
      nodes: {
        a: {
          md: md`What is your first move?`,
          choices: [
            { text: "Ask the champion to escalate to the VP engineering to override OT security.", score: 2, feedback: "Escalation without addressing the risk makes OT security a permanent blocker.", next: "b" },
            { text: "Ask for a 30-minute call with the OT security lead and the test systems engineer to understand the allow-list process and present the bench PC change package.", score: 9, feedback: "Treats the policy as a process to go through, not an obstacle to go around.", next: "b" },
            { text: "Offer to run Lockstep on a separate laptop plugged into the rig.", score: 3, feedback: "An unmanaged device in the lab zone is worse from their point of view.", next: "b" },
          ],
        },
        b: {
          md: md`On the call, the OT lead explains: allow-list additions go through the monthly change board with a vendor security statement; new conduits from the lab zone need a firewall change, also through the board. What do you propose?`,
          choices: [
            { text: "Submit one change request covering the Lockstep binary (signed, with SBOM, resource note, verification and rollback) and one conduit (bench PC to Enclave server inside the lab zone, single port), and ask for the next cutoff date; meanwhile start the backtest on exported historical data so the pilot clock is not wasted.", score: 10, feedback: "Fits their process, minimises the change, and moves the pilot's evidence work forward while you wait.", next: "c" },
            { text: "Ask them to make an exception just for the pilot.", score: 4, feedback: "Exceptions are what OT security exists to avoid.", next: "c" },
          ],
        },
        c: {
          md: md`The change is approved with a condition: the Enclave server must sit inside the lab zone, not in the data centre. What do you do?`,
          choices: [
            { text: "Agree, update the architecture document and the prerequisites (server location, power, rack space), and record the decision as the reference design for this customer's later rigs.", score: 10, feedback: "Turns a condition into a reusable design that speeds up the scale-up." },
            { text: "Argue that the data centre is more secure.", score: 3, feedback: "Their zone model is their decision; your architecture should adapt." },
          ],
        },
      },
    },
  ],
};

export default lesson;
