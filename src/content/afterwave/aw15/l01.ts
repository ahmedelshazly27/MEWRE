import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw15-l01",
  title: "From first outbound to signed pilot",
  summary:
    "The sequence of six artifacts that takes Afterwave from a cold list to a signed paid pilot: ICP list logic, outbound sequence, discovery call plan, pilot proposal with success criteria and pricing, security review pack outline, and the pilot agreement term sheet. Each is an applied exercise graded against a rubric; the pipeline maths sizes the effort.",
  minutes: 90,
  objectives: [
    "You can lay out the six artifacts from first outbound to signed pilot, the exit criterion of each gate and the order they must be built in.",
    "You can size the account list needed for a pilot target from gate conversions and check it against the cycle length.",
    "You can write success criteria for a Ripple pilot as a measured pair (recall on replayed history and rig-hours saved) run in shadow mode.",
    "You can price a pilot from the customer's own numbers and compute its expected value for Afterwave.",
    "You can outline a security review pack for an on-premises Enclave deployment and draft a pilot term sheet that protects data rights and the conversion.",
  ],
  concepts: [
    {
      id: "aw15.pilot-path",
      name: "The pilot path",
      description:
        "Six artifacts built in order (ICP logic, outbound sequence, discovery plan, pilot proposal, security pack, term sheet), each with an exit criterion that must be met before the next gate. The path ends at a signed paid pilot with a conversion clause, not at a meeting.",
      competency: "aw-business",
      related: ["fc04.sales-stages", "fc04.mutual-action-plan"],
    },
    {
      id: "aw15.icp-trigger-logic",
      name: "ICP list logic with triggers",
      description:
        "The ICP written as rules a researcher or agent can apply: segment fit (own benches, frequent firmware, model or rig changes), technographics (DAQ and test tools in use), trigger events that create urgency now, and exclusions. Each account gets a score and a tier.",
      competency: "aw-business",
      related: ["fc03.icp", "fc03.buying-triggers", "fc03.icp-scoring"],
    },
    {
      id: "aw15.shadow-mode",
      name: "Shadow-mode pilot",
      description:
        "Ripple runs alongside the customer's normal regression process and recommends but never decides, so its selections can be scored against ground truth (what actually failed) without any risk to the customer's release decisions.",
      competency: "aw-business",
      related: ["fc04.success-criteria"],
    },
    {
      id: "aw15.pilot-success-pair",
      name: "Paired success criteria for Ripple",
      description:
        "Recall on replayed history (share of actually failing tests Ripple would have selected, safety-tagged tests reported separately) together with rig-hours saved, each with a threshold, data source, method, date and judge. Either alone can be gamed.",
      competency: "aw-business",
      related: ["fc04.success-criteria", "fc04.paid-pilot"],
    },
    {
      id: "aw15.security-pack",
      name: "Enclave security review pack",
      description:
        "The documents an enterprise security team needs to approve an on-premises or isolated-tenant deployment: architecture and data flows, no-egress default, identity and access, update and support access, SBOM and vulnerability handling, data and model ownership, personal data in screen capture, and an honest certification roadmap.",
      competency: "aw-business",
      related: ["fc04.security-review", "fc04.on-prem-deployment"],
    },
    {
      id: "aw15.pilot-term-sheet",
      name: "Pilot agreement term sheet",
      description:
        "The one-to-two page summary of the pilot contract: scope, duration, fee and credit, success criteria, customer obligations, conversion price and date, data and model ownership, confidentiality, liability cap and the rule that Ripple is advisory during the pilot.",
      competency: "aw-business",
      related: ["fc04.conversion-clause", "fc04.paper-process"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The path, its gates and the maths of the funnel",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You own go-to-market at Afterwave, and the next six months will be judged on one thing: whether a hardware test team pays to run Lockstep, Enclave and Ripple on a real rig. Investors (YC included) will ask what is signed, not what is in conversation, and Ismail and Yusuf need a pilot whose scope they can deliver. This capstone makes you build every document between a cold list and a signature, once, properly, so the second and third pilots are copies with edits.`,
        },
        {
          kind: "md",
          md: md`### Six artifacts, six gates

Founder Core taught the general sales process, discovery, pilots, pricing and procurement. Here you apply all of it to one product with one buyer. The buyer is a **head of test or validation** at a company that builds actuators, drives, humanoids, batteries or autonomous machines and runs its own benches. The champion is usually a senior test engineer who is tired of rerunning everything after every firmware change. The economic buyer is the head of test or the VP of engineering. The blocker is often IT security, because Enclave runs on their servers.

| # | Artifact | Exit criterion (the gate) | Built by | Illustrative time |
|---|---|---|---|---|
| 1 | **ICP list logic** | 100 to 200 scored accounts with a named head of test and a trigger | You, with a research agent | 1 to 2 weeks |
| 2 | **Outbound sequence** | First meetings booked with the right role | You | 3 weeks per wave |
| 3 | **Discovery call plan** | Pain quantified with their numbers; data walkthrough agreed | You plus Ismail or Yusuf | 1 to 3 calls |
| 4 | **Pilot proposal** | Champion and economic buyer accept scope, success criteria and price in writing | You | 1 to 3 weeks |
| 5 | **Security review pack** | Security team approves on-prem or isolated-tenant deployment | You plus engineering | 2 to 12 weeks |
| 6 | **Pilot term sheet, then contract** | Signed paid pilot with conversion clause | You plus counsel | 2 to 6 weeks |

The times are **illustrative** ranges for enterprise hardware buyers, not Afterwave data; measure your own. Two of the six steps, the security review and the contract, run on the customer's calendar, not yours. Start them as early as the champion allows: send the security pack outline after the first good discovery call, not after the proposal is accepted.

### Shadow mode: the pilot design that makes the result undeniable

Ripple's claim is that after a firmware, model or rig change it tells engineers which tests to rerun and why. A pilot that lets Ripple **decide** what runs on a customer's rig asks the customer to take a safety and schedule risk before trusting you. A **shadow-mode** pilot does not: the customer keeps running its normal regression, Lockstep captures it, and Ripple only recommends. That gives ground truth twice over:

1. **Replayed history.** For past releases where the customer ran the full suite, the failing tests are known. Ripple computes its selection using only information available before each run; you count how many real failures it would have caught.
2. **Live shadow.** For releases during the pilot, Ripple publishes its selection before the run; the full run then scores it.`,
        },
        { kind: "equation", formula: "aw15-historical-recall" },
        {
          kind: "md",
          md: md`Success criteria are therefore written as a **pair**: recall and rig-hours saved. Selecting every test gives perfect recall and no savings; selecting nothing saves everything and catches nothing. Safety-tagged tests (emergency stop timing, overload protection, anything in the customer's safety case) are outside the trade: they always run, and the pilot says so in writing.

### How big must the list be?

Gate conversions multiply. Size the top of the funnel from the number of pilots you need, then check the calendar.`,
        },
        { kind: "equation", formula: "aw15-pilot-funnel" },
        {
          kind: "widget",
          widget: "pipeline-forecast",
          props: { target: 60000, acv: 20000 },
          caption:
            "Set the stages to the pilot path (meeting, qualified discovery, proposal, security approved, signed) and the deal value to an illustrative 20k pilot fee (the widget labels money in USD; read it as EUR here). Watch how coverage collapses when the security review stage converts at 50 % instead of 80 %, and how a 5-month cycle pushes bookings out of the quarter.",
        },
        {
          kind: "flow",
          title: "The pilot path",
          steps: [
            { label: "ICP list", detail: "Rules, triggers, scores, named head of test" },
            { label: "Outbound", detail: "Trigger-anchored, 4 to 5 touches, one ask: 20 minutes on how they choose what to retest" },
            { label: "Discovery", detail: "Last release reconstructed in their numbers; data walkthrough agreed" },
            { label: "Proposal", detail: "Shadow-mode scope, paired success criteria, fee and conversion price" },
            { label: "Security pack", detail: "Enclave architecture, data flows, access, updates, SBOM, ownership" },
            { label: "Term sheet", detail: "Signed paid pilot, conversion clause, data rights" },
          ],
          caption: "Start the security pack in parallel with the proposal: it runs on the buyer's calendar.",
        },
        { kind: "sources", refs: ["aw15-r3", "aw15-r4"] },
      ],
    },
    {
      layer: "applied",
      title: "Sizing the funnel and pricing the pilot",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How many accounts for three signed pilots in six months?",
          given: md`**Illustrative conversions**, not Afterwave data: account entered into the sequence to first meeting 20 % (cold, trigger-anchored outbound to the head of test), first meeting to qualified discovery 50 %, discovery to accepted proposal 50 %, accepted proposal to signed pilot 40 % (security review and legal are where hardware pilots die). Target $P = 3$ signed paid pilots. Typical cycle from first touch to signature: 4 to 5 months.`,
          steps: [
            { md: md`End-to-end conversion: $0.20 \times 0.50 \times 0.50 \times 0.40 = 0.02$, so 2 % of accounts become signed pilots.` },
            { md: md`Accounts needed: $N_0 = \lceil 3 / 0.02 \rceil = 150$ accounts.` },
            { md: md`Calendar check: with a 4 to 5 month cycle, every account must be contacted in the first 4 to 6 weeks to sign inside 6 months. That is 25 to 40 new accounts per week, which is a full-time job for you alone. Warm introductions through Ismail's and Yusuf's validation networks lift the first gate: at 35 % the list falls to $\lceil 3 / 0.035 \rceil = 86$ accounts.` },
            { md: md`Where to push: the gate with the lowest conversion and the longest delay is proposal to signature. Starting the security review after the first discovery call, not after the proposal, attacks both.` },
          ],
          result: md`About **150 cold accounts, or about 90 if most come through warm paths**, all contacted in the first six weeks, for three signed pilots in six months (illustrative). Recompute with your own conversions after the first 20 accounts.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Price the pilot and the annual contract from the customer's numbers",
          given: md`**Illustrative customer**, a hypothetical actuator test team, not a real account. From discovery: 2 rigs; 24 changes a year trigger a full regression; the full suite takes 71 rig-hours; in replay, Ripple's selection averages 11 rig-hours per change at the agreed recall. Loaded cost of a rig-hour (rig depreciation, technician, engineer analysis time) EUR 110. You price the annual contract at about 30 % of the value created (the value-based pricing rule from Founder Core). Pilot: 12 weeks, fee EUR 20k credited against year one if converted on time; delivery cost to Afterwave EUR 30k (people, travel, installation); gross margin on the contract 75 %; expected contract life 3 years; probability of conversion after a well-designed pilot 0.40.`,
          steps: [
            { md: md`Rig-hours saved per year: $H = N_r (h_{\text{full}} - h_{\text{sel}}) = 24 \times (71 - 11) = 1{,}440$ rig-hours.` },
            {
              md: md`Annual value at EUR 110 per rig-hour: $1{,}440 \times 110 = 158{,}400$ EUR, before counting calendar time (with 2 rigs a release clears in about 5.5 h instead of 35.5 h).`,
              hidden: true,
              check: { prompt: "Annual value of rig-hours saved", answer: 158400, unit: "EUR", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Annual price at 30 % of value: $0.30 \times 158{,}400 = 47{,}520$ EUR; quote **EUR 48k per year** for one rig line.`,
              hidden: true,
              check: { prompt: "Annual price at 30 % of value (before rounding)", answer: 47520, unit: "EUR", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Expected value of the pilot (Founder Core pilot EV): $EV = F - C_d + p_c \cdot \mathrm{ACV} \cdot GM \cdot n = 20 - 30 + 0.40 \times 48 \times 0.75 \times 3 = -10 + 43.2 = 33.2$ k EUR.`,
              hidden: true,
              check: { prompt: "Expected value of the pilot", answer: 33.2, unit: "k EUR", tolerance: { rel: 0.02 } },
            },
            {
              md: md`Break-even conversion if the pilot were free: $p_c^* = C_d / (\mathrm{ACV} \cdot GM \cdot n) = 30 / 108 = 0.28$. The fee does not make the pilot profitable; it makes the buyer commit, and it tests whether the budget exists.`,
            },
          ],
          result: md`Illustrative quote: **12-week shadow-mode pilot, EUR 20k, credited against a EUR 48k first-year contract if signed within 30 days of the success review.** The price comes from the buyer's own numbers, which is what lets the champion defend it internally.`,
        },
        { kind: "equation", formula: "fc04-pilot-ev" },
        { kind: "xref", to: "fc04-l06", note: "Paid vs free pilots, success criteria and the conversion clause in general form." },
        { kind: "xref", to: "fc04-l07", note: "Value-based pricing and the 10 to 30 % value-capture rule used above." },
      ],
    },
    {
      layer: "field",
      title: "The six exercises: build every document between a cold list and a signature",
      blocks: [
        {
          kind: "md",
          md: md`### The rules for these exercises

Each exercise produces a real artifact you will reuse. Use only facts you know to be true about Afterwave (the three products, the team's validation backgrounds, the Machinery Regulation date). Never invent customers, pilots, logos or numbers; where a number is needed, label it **illustrative** and show the arithmetic. Name segments and roles, not companies you have not spoken to. The artifacts must agree with each other: the success criteria in the proposal are the ones in the term sheet, and the deployment in the security pack is the one priced in the proposal.`,
        },
        { kind: "xref", to: "fc03-l02", note: "ICP definition, firmographics, technographics, triggers and scoring in general form." },
        {
          kind: "question",
          question: {
            id: "aw15-l01-p1",
            type: "short",
            prompt: md`**Exercise 1: ICP list logic.** Write the rules a research agent could apply to build Afterwave's first list of 150 accounts: (1) segment fit criteria; (2) technographic signals; (3) at least four trigger events that create urgency now, with how each is detected; (4) exclusions with the reason; (5) a scoring rule with weights and the tier cut-offs; (6) the role you will contact and the role you expect as champion.`,
            rubric: [
              "Segment fit is specific to Afterwave: companies with their own benches and frequent firmware, model or rig changes (actuators, drives, humanoids, batteries, powertrains, autonomous machines), with a minimum test team size.",
              "Technographic signals are observable (DAQ and test tools, data formats, HIL in job posts) and tied to Lockstep integration effort.",
              "Triggers are dated and detectable (new programme or rig build-out, test-engineer hiring, ML in control or safety functions, EU market exposure before 20 January 2027, recent funding), each with a source.",
              "Exclusions are reasoned (for example no own benches, classified programmes with very long cycles, pure software).",
              "Scoring has explicit weights and tier cut-offs, and the contact role (head of test or validation) differs from the expected champion (senior test engineer).",
              "Invents no customer names or traction.",
            ],
            modelAnswer: md`**Segment fit (all required):** designs and tests its own hardware in actuators, drives and motors, humanoids, battery packs, powertrains or autonomous machines; runs its own test benches; test and validation team of at least 5 engineers (illustrative threshold); product with firmware, model or rig changes at least monthly.

**Technographics (score, not filter):** NI, Vector, dSPACE or Keysight tooling in job posts; DAQ data in TDMS, MDF or Parquet; HIL or end-of-line rigs mentioned; ML or learned policies in the product.

**Triggers (score, with source):** (a) new programme or new rig line, from press releases and job posts for rig engineers; (b) three or more open test or validation roles, from job boards; (c) ML in a control or safety function, from papers, talks or product pages, which matters because the EU Machinery Regulation applies from 20 January 2027; (d) sells into the EU; (e) funding round in the last 12 months, from funding news; (f) a public recall or field issue tied to a software change.

**Exclusions:** no own benches (outsourced testing); classified defence programmes (security cycle beyond our runway); pure software; fewer than 3 test engineers.

**Score:** segment fit is a gate; then technographics 0 to 3 (weight 1), triggers 0 to 3 each for the two strongest (weight 2), warm path through Ismail's or Yusuf's networks 0 to 3 (weight 2). Tier A at 12 or more, B at 8 to 11, C below 8. Contact A-tier first, by hand.

**Roles:** contact the head of test or validation (economic buyer and owner of rig time); expect the champion to be the senior test engineer who chooses what to rerun after a change today.`,
            explanation: md`Rules, not a list, are what you hand to an agent or a hire. Triggers matter more than size: a company opening a new rig line this quarter beats a bigger one with no reason to change.`,
            concepts: ["aw15.icp-trigger-logic", "aw15.pilot-path"],
            difficulty: 2,
          },
        },
        { kind: "xref", to: "fc04-l08", note: "Outbound sequence mechanics, deliverability and the meetings formula." },
        {
          kind: "question",
          question: {
            id: "aw15-l01-p2",
            type: "short",
            prompt: md`**Exercise 2: outbound sequence.** Write a 4 to 5 touch sequence over about 3 weeks to the head of test at a tier-A account with the trigger "opening a new actuator rig line". Give each touch's channel, day, subject or opener, the full text of the first email (under 120 words) and the single ask. Then state the reply rate you will track and what you change if it is below target after 50 contacts.`,
            rubric: [
              "Opens on the account's trigger and the buyer's job (choosing what to retest after a change), not on Afterwave's features.",
              "Credibility is true and specific (the cofounders' Tesla drive unit and inverter validation backgrounds), with no invented customers or results.",
              "One small, clear ask (about 20 minutes on how they choose what to rerun after a firmware change), not a demo request in touch one.",
              "Sequence varies channel and adds value (a short checked note on the Machinery Regulation or a test-selection checklist), with sensible spacing and a polite close-out.",
              "Names the metric (reply and positive-reply rate) and a concrete diagnostic if it underperforms (targeting, trigger, message, channel).",
            ],
            modelAnswer: md`**Touch 1, email, day 1.** Subject: "Retesting after firmware changes on the new rig line". Text: "Hi [name], I saw [company] is building out a new actuator rig line. When a motor-control firmware change lands, how does your team decide which tests to rerun? We are building Afterwave with two engineers who ran drive unit and inverter validation at Tesla: we capture rig signals and on-screen actions on one clock and tell engineers which tests a change actually affects, and why. I am not selling yet; I would value 20 minutes on how you make that call today. Would next Tuesday or Thursday work? [name], Afterwave."

**Touch 2, LinkedIn, day 4:** connection note referencing the email, no pitch.
**Touch 3, email, day 8:** a 2-page note, "What 20 January 2027 changes for ML-based safety functions in machinery", checked against the Regulation text, with the same 20-minute ask.
**Touch 4, email from Ismail or Yusuf, day 13:** one engineer-to-engineer question ("do you rerun the full thermal soak after a derating-table change?").
**Touch 5, email, day 20:** close-out: "I will stop here; if test selection becomes a problem on the new line, reply and we will pick it up."

**Metrics:** reply rate and positive-reply rate per 50 contacts. Illustrative target: 10 % positive replies. Below target: check targeting first (right role, real trigger), then the opener, then the channel (warm intros), and change one thing per batch.`,
            explanation: md`A first-touch ask for 20 minutes on their process converts better than a demo request, and it doubles as discovery. Every claim must be true: in this market the reader is an engineer who will check.`,
            concepts: ["aw15.pilot-path", "aw15.icp-trigger-logic"],
            difficulty: 2,
          },
        },
        { kind: "xref", to: "fc04-l02", note: "Discovery structure, SPIN and quantifying pain; the cost-of-pain formula used in exercise 3." },
        {
          kind: "question",
          question: {
            id: "aw15-l01-p3",
            type: "short",
            prompt: md`**Exercise 3: discovery call plan.** Write the plan for a 45-minute discovery call with the head of test and a senior test engineer: (1) the call objective and the exit criterion; (2) who from Afterwave attends and why; (3) at least eight questions in order, covering the last release, numbers, data and clocks, safety-tagged tests, security constraints and the decision process; (4) the numbers you must leave with; (5) the next step you will propose.`,
            rubric: [
              "Objective and exit criterion are concrete (pain quantified in their numbers and a data walkthrough of past regressions agreed), not 'build rapport'.",
              "Questions are about past behaviour (reconstruct the last firmware or rig change: what changed, what was rerun, who decided, how long, what escaped), not opinions about Afterwave.",
              "Covers data and clocks (DAQ hardware, formats, how app logs and rig signals are aligned today), safety-tagged tests, and on-prem or security constraints.",
              "Leaves with the inputs needed to price: changes per year, rig-hours per full regression, rigs, loaded cost per rig-hour, cost of an escaped regression.",
              "Maps the decision process (economic buyer, security and procurement steps, budget timing) and proposes a specific next step with a date.",
            ],
            modelAnswer: md`**Objective:** reconstruct how the team chose what to retest after its last two changes, quantify the cost, and agree a data walkthrough. **Exit criterion:** their numbers for the pain and a date for the walkthrough.

**Attendees:** you (lead, notes) and Yusuf or Ismail (credibility on rigs and drive validation, answers technical questions in one sentence, does not demo).

**Questions:** (1) Take the last firmware or model change that hit the rigs: what changed? (2) What did you rerun, and who decided? (3) How long did it take in rig-hours and calendar days? (4) Has anything escaped to a later stage or the field after a change? What did it cost? (5) How many changes a year trigger a regression, and how often do you rerun everything? (6) Which tests always run regardless (safety-tagged, in a safety case)? (7) What DAQ hardware and formats do you use, and how do you line up app or HMI logs with rig signals today? (8) Where would captured data and a model have to live: your servers, an isolated tenant, air-gapped? (9) If this worked, who else signs, what does security review involve, and when is budget set?

**Numbers to leave with:** changes per year; rig-hours per full regression; number of rigs; loaded cost per rig-hour; one escaped-regression cost; data retention history (how many past full regressions are on disk).

**Next step:** a 60-minute walkthrough of the last 10 full regressions' data with the senior test engineer within two weeks, and an introduction to whoever runs vendor security review.`,
            explanation: md`The walkthrough is the bridge to a shadow-mode pilot: it tells you whether replayed history exists and whether Lockstep can read their formats.`,
            concepts: ["aw15.pilot-path", "aw15.shadow-mode"],
            difficulty: 2,
          },
        },
        {
          kind: "question",
          question: {
            id: "aw15-l01-p4",
            type: "short",
            prompt: md`**Exercise 4: pilot proposal.** Write a one-page proposal for a 12-week shadow-mode pilot on one rig line: (1) the problem in the customer's numbers (illustrative); (2) scope and deployment; (3) success criteria as a measured pair, with threshold, data, method, date and judge, plus the safety-tagged rule; (4) customer obligations; (5) fee, credit and the pre-agreed annual price with the arithmetic; (6) the decision meeting.`,
            rubric: [
              "Problem stated in the buyer's own (illustrative, labelled) numbers: changes per year, rig-hours per regression, cost per rig-hour.",
              "Scope is bounded (one rig line, defined suite, replayed history plus live shadow releases) and the deployment (on-prem or isolated tenant) matches the security pack.",
              "Success criteria are a pair (recall on replayed history and rig-hours saved) with thresholds, data source, method, date and who judges; safety-tagged tests always run and Ripple is advisory.",
              "Customer obligations are concrete (rig access, export of past regressions, named champion, weekly check-in, security reviewer).",
              "Fee, credit and annual price are derived from value with arithmetic shown, and the decision meeting has a date and named attendees.",
            ],
            modelAnswer: md`**Problem (illustrative):** 24 changes a year each trigger a 71 rig-hour full regression on 2 rigs: 1,704 rig-hours a year, at EUR 110 per rig-hour about EUR 187k, plus 1.5 calendar days per release.

**Scope:** Lockstep on one rig line (DAQ plus test-app screen capture on one clock), Enclave on a customer server, Ripple in shadow mode. Weeks 1 to 3 install and import the last 10 full regressions; weeks 4 to 10 replay plus live shadow on every change; weeks 11 to 12 report.

**Success criteria:** (a) recall on replayed history and live shadow of at least 95 % of failing non-safety tests, measured by $R_{\text{hist}}$ on the customer's own pass or fail results; (b) mean selected rig-hours at most 30 % of the full suite (illustrative target, set after the walkthrough). Judged by the head of test at the week-12 review. Safety-tagged tests are always run and excluded from the trade-off. Ripple does not change what runs during the pilot.

**Customer provides:** rig access for installation, export of past regression data, a named senior test engineer (2 hours a week), a security reviewer, a weekly 30-minute check-in.

**Commercials:** fee EUR 20k, credited against year one if signed within 30 days of the review. Annual price for this rig line EUR 48k: about 30 % of the illustrative EUR 158k of rig-hours saved ($24 \times 60 \times 110$).

**Decision meeting:** week 12, head of test, senior test engineer, you and Ismail; outcome is sign, extend with a written reason, or stop.`,
            explanation: md`The proposal is the contract in plain language. If the champion cannot forward it to the economic buyer without you in the room, it is not done.`,
            concepts: ["aw15.pilot-success-pair", "aw15.shadow-mode", "aw15.pilot-path"],
            difficulty: 3,
          },
        },
        { kind: "xref", to: "fc04.security-review", note: "Security questionnaires (SIG, CAIQ), evidence and on-prem prerequisites in general form." },
        {
          kind: "question",
          question: {
            id: "aw15-l01-p5",
            type: "short",
            prompt: md`**Exercise 5: security review pack outline.** Write the table of contents of the pack you send the customer's security team for an on-premises Enclave and Lockstep deployment, with one or two lines on what each section contains. Include what Afterwave does not yet have and how you say so.`,
            rubric: [
              "Architecture and data flows: components, where captured data and trained models live, network boundaries, and no data egress by default.",
              "Identity and access, update channel (signed, offline-capable bundles) and support access (customer-initiated, time-limited, logged).",
              "Software supply chain and vulnerability handling: SBOM, dependency scanning, patch timelines, penetration test plan.",
              "Data and model ownership, retention and deletion; personal data in screen capture (operators on recordings) handled with a DPA, masking and works-council awareness.",
              "Honest certification status: no SOC 2 or ISO/IEC 27001 claimed unless held, with a dated roadmap and the controls already in place.",
            ],
            modelAnswer: md`**1. Summary:** what is deployed, where, and the three commitments: data stays on your infrastructure, no outbound connection by default, you can remove us completely.
**2. Architecture:** Lockstep capture agent on the test PC (DAQ reader and screen and event recorder), Enclave services on a customer server or isolated tenant, Ripple engine inside Enclave; diagram with ports and protocols.
**3. Data flows and classification:** what is captured (rig channels, test-app events, screen video), storage location, encryption at rest and in transit, retention and deletion.
**4. Identity and access:** SSO via your identity provider, role-based access, audit log.
**5. Updates:** signed offline update bundles, version pinning, rollback.
**6. Support access:** customer-initiated, time-boxed remote sessions, logged; no standing access.
**7. Supply chain and vulnerabilities:** SBOM per release, dependency scanning, patch timelines by severity, penetration test plan before production use.
**8. Data and models:** captured data, bench memory and models trained on it belong to the customer and stay in Enclave; no use outside the customer's environment without written consent.
**9. Personal data:** screen capture may record operators; masking options, a DPA, guidance for works-council consultation where required.
**10. Status and roadmap:** we are an early-stage company and hold no SOC 2 report or ISO/IEC 27001 certificate today; controls in place are listed; certification roadmap with dates; answers to your questionnaire (SIG, CAIQ or your own) within 10 working days.`,
            explanation: md`On-prem is Afterwave's security advantage, but only if the pack proves it. Overclaiming a certification ends the deal when the reviewer asks for the report.`,
            concepts: ["aw15.security-pack"],
            difficulty: 2,
          },
        },
        { kind: "xref", to: "fc08-l07", note: "IP assignment, NDAs and pilot and customer agreements in general form." },
        {
          kind: "question",
          question: {
            id: "aw15-l01-p6",
            type: "short",
            prompt: md`**Exercise 6: pilot agreement term sheet.** Draft the term sheet (headings and one or two lines each) that counsel will turn into the pilot contract. It must be consistent with your proposal and security pack. Mark the two terms you would not concede and the two you would trade.`,
            rubric: [
              "Covers parties, scope, duration, fee and credit, success criteria (as in the proposal), customer obligations, conversion price and deadline.",
              "Data and IP terms are precise: customer owns captured data, bench memory and models trained on it; Afterwave owns its software and general improvements; no use of customer data outside Enclave without consent.",
              "Risk terms: Ripple is advisory during the pilot, the customer's release process remains authoritative, liability capped (for example at fees paid), confidentiality, termination.",
              "Consistent with the proposal and security pack (same criteria, deployment, price).",
              "Identifies non-negotiables and tradeables with reasons (for example the conversion clause and liability cap kept; duration or fee credit traded).",
            ],
            modelAnswer: md`**Parties and purpose:** Afterwave and [customer]; 12-week shadow-mode evaluation of Lockstep, Enclave and Ripple on one rig line.
**Scope and deployment:** as in the proposal; Enclave on customer infrastructure; no data egress.
**Term:** 12 weeks from installation, plus a 2-week decision window.
**Fee:** EUR 20k, invoiced at signature, credited against year one if the annual agreement is signed within 30 days of the review.
**Success criteria:** recall at least 95 % on non-safety failing tests and selected rig-hours at most 30 % of the full suite, measured as in the proposal; judged by the head of test at the week-12 review.
**Customer obligations:** rig access, export of past regressions, named engineer, security reviewer, weekly check-in.
**Conversion (not conceded):** if the criteria are met, annual licence for the rig line at EUR 48k, start date within 30 days, decision meeting on a fixed date.
**Data and IP:** customer owns captured data, bench memory and models trained on it; Afterwave owns the software and improvements to its general methods; no use of customer data outside the customer's Enclave without written consent; aggregated operational metrics (uptime, version) only.
**Advisory use:** Ripple recommendations do not replace the customer's release or safety decisions during the pilot.
**Liability (not conceded):** capped at fees paid; no consequential damages.
**Confidentiality, termination:** mutual NDA terms; either party may end with 10 days' notice, fee pro rata.
**Tradeable:** pilot length (10 to 16 weeks) and the fee credit window (30 to 60 days).`,
            explanation: md`The two traps in hardware pilots are unpriced conversion ("we will discuss a licence afterwards") and vague data rights. The first kills revenue; the second kills the security review or the bench-memory strategy.`,
            concepts: ["aw15.pilot-term-sheet", "aw15.pilot-success-pair"],
            difficulty: 3,
          },
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How the first hardware pilot goes wrong",
          md: md`**Unbounded scope:** "connect all our rigs" turns a 12-week pilot into an integration project nobody budgeted. **Recall without hours, or hours without recall:** either is trivial to hit and proves nothing. **Ripple deciding what runs:** one missed regression on a customer rig during a pilot ends the relationship. **Security review started last:** it is the longest step and it runs on their calendar. **Free pilot with no conversion price:** a technical success with no budget behind it. **Screen capture without a personal data plan:** operators on recordings can stop a deployment in the EU.`,
        },
        { kind: "scenario", scenario: "aw15-s1" },
        {
          kind: "checklist",
          title: "Before you send the term sheet",
          items: [
            "The success criteria, deployment and price are identical in the proposal, the security pack and the term sheet.",
            "Safety-tagged tests always run, and the document says Ripple is advisory during the pilot.",
            "The conversion price and date are written, not 'to be discussed'.",
            "Data, bench memory and trained models are owned by the customer; Afterwave's software and general methods are not.",
            "Every number is the customer's or labelled illustrative; nothing implies other customers exist.",
            "Ismail or Yusuf has confirmed the scope is deliverable in 12 weeks with the people we have.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw15-l01-q1",
      type: "order",
      prompt: md`Put the artifacts of the pilot path in the order their gates are passed.`,
      items: ["ICP list logic", "Outbound sequence", "Discovery call plan", "Pilot proposal", "Security review pack approved", "Signed pilot term sheet and contract"],
      explanation: md`Each gate's output is the next one's input. In practice the security pack is sent early and runs in parallel with the proposal, but approval is the gate before signature.`,
      concepts: ["aw15.pilot-path"],
      difficulty: 1,
    },
    {
      id: "aw15-l01-q2",
      type: "numeric",
      prompt: md`Illustrative gate conversions: account to meeting 25 %, meeting to qualified discovery 50 %, discovery to accepted proposal 40 %, proposal to signed pilot 50 %. How many accounts do you need for 2 signed pilots?`,
      answer: 80,
      unit: "accounts",
      tolerance: { abs: 0.5 },
      explanation: md`End to end $0.25 \times 0.5 \times 0.4 \times 0.5 = 0.025$; $N_0 = \lceil 2 / 0.025 \rceil = 80$ accounts.`,
      concepts: ["aw15.pilot-path"],
      difficulty: 1,
    },
    {
      id: "aw15-l01-q3",
      type: "mcq",
      prompt: md`Which pair of success criteria makes a Ripple pilot impossible to game?`,
      options: [
        "Customer satisfaction score and number of features used",
        "Recall on replayed history and rig-hours saved, each with a threshold",
        "Rig-hours saved and number of tests skipped",
        "Recall on replayed history and number of releases processed",
      ],
      answer: 1,
      explanation: md`Selecting everything maximises recall; selecting nothing maximises savings. Only the pair, each with a threshold, measures a useful selection. Tests skipped and hours saved measure the same thing.`,
      concepts: ["aw15.pilot-success-pair"],
      difficulty: 1,
    },
    {
      id: "aw15-l01-q4",
      type: "decision",
      prompt: md`The senior test engineer is keen and suggests: "Let Ripple choose what we run during the pilot; that is the real test." What do you do?`,
      options: [
        { text: "Agree: it is the strongest proof of value", score: 0.2, feedback: "One missed regression on their rig during the pilot ends the relationship, and the head of test did not agree to that risk." },
        { text: "Run shadow mode: Ripple publishes its selection before each run, the normal full regression scores it; offer a controlled live phase after the success review with safety-tagged tests always run", score: 1, feedback: "Same evidence, no risk to their release decisions, and a natural expansion step after the criteria are met." },
        { text: "Let Ripple decide only on weekends when nobody is watching", score: 0, feedback: "Unapproved changes to a customer's test process are a trust and safety failure." },
        { text: "Decline any live comparison and only replay history", score: 0.6, feedback: "Replay alone is useful, but live shadow on new changes shows Ripple works on information it has not seen." },
      ],
      explanation: md`Shadow mode gives ground truth on both history and live changes without asking the customer to take risk before trust exists.`,
      concepts: ["aw15.shadow-mode"],
      difficulty: 2,
    },
    {
      id: "aw15-l01-q5",
      type: "multi",
      prompt: md`Which belong in the Enclave security review pack? Select all that apply.`,
      options: [
        "Architecture and data-flow diagram with no-egress default",
        "Support access policy: customer-initiated, time-limited, logged",
        "SBOM and patch timelines by severity",
        "Handling of personal data in screen capture",
        "A statement that Afterwave is SOC 2 compliant, to be completed later",
        "Data and model ownership terms",
      ],
      answer: [0, 1, 2, 3, 5],
      explanation: md`Claiming a certification you do not hold ends the review when the reviewer asks for the report. State the status and the dated roadmap instead.`,
      concepts: ["aw15.security-pack"],
      difficulty: 1,
    },
    {
      id: "aw15-l01-q6",
      type: "numeric",
      prompt: md`Illustrative: pilot fee EUR 15k, delivery cost EUR 35k, ACV EUR 60k, gross margin 75 %, expected contract life 3 years, conversion probability 0.35. What is the pilot's expected value, in k EUR?`,
      answer: 27.25,
      unit: "k EUR",
      tolerance: { rel: 0.01 },
      explanation: md`$EV = 15 - 35 + 0.35 \times 60 \times 0.75 \times 3 = -20 + 47.25 = 27.25$ k EUR.`,
      concepts: ["aw15.pilot-success-pair", "aw15.pilot-term-sheet"],
      difficulty: 2,
    },
    {
      id: "aw15-l01-q7",
      type: "mcq",
      prompt: md`Which data term best protects both the customer and Afterwave's bench-memory strategy in a pilot?`,
      options: [
        "Afterwave owns all captured data so it can train shared models",
        "Ownership is left to be agreed after the pilot",
        "The customer owns captured data, bench memory and models trained on it, all staying in its Enclave; Afterwave owns its software and general methods; any use outside Enclave needs written consent",
        "Data is deleted at the end of the pilot in all cases",
      ],
      answer: 2,
      explanation: md`It passes security review, keeps the value of bench memory with the customer inside Enclave (where Afterwave's product sits on top of it), and leaves a consent route for anything broader. Deleting everything destroys the conversion asset.`,
      concepts: ["aw15.pilot-term-sheet"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw15-l01-f1", front: "The six artifacts of the pilot path", back: "ICP list logic; outbound sequence; discovery call plan; pilot proposal; security review pack; pilot term sheet and contract.", concepts: ["aw15.pilot-path"] },
    { id: "aw15-l01-f2", front: "Accounts needed for P pilots", back: md`$N_0 = \lceil P / \prod c_k \rceil$. Illustrative: 3 pilots at 2 % end to end need 150 accounts, all contacted early enough for the cycle.`, concepts: ["aw15.pilot-path"] },
    { id: "aw15-l01-f3", front: "Shadow mode", back: "Ripple recommends, the customer's normal full regression runs and scores it. Ground truth without risk to release decisions.", concepts: ["aw15.shadow-mode"] },
    { id: "aw15-l01-f4", front: "Ripple pilot success criteria", back: "A pair: recall on replayed history (and live shadow) plus rig-hours saved, each with threshold, data, method, date and judge. Safety-tagged tests always run.", concepts: ["aw15.pilot-success-pair"] },
    { id: "aw15-l01-f5", front: "Three things the security pack must prove", back: "Data stays on the customer's infrastructure (no egress by default); access and updates are controlled and logged; the customer owns its data and models. Plus honest certification status.", concepts: ["aw15.security-pack"] },
    { id: "aw15-l01-f6", front: "Two non-negotiables in the pilot term sheet", back: "A written conversion price and date, and a liability cap. Data ownership must be precise, not deferred.", concepts: ["aw15.pilot-term-sheet"] },
  ],
  scenarios: [
    {
      id: "aw15-s1",
      title: "The head of test wants a free pilot and IT wants four months",
      dayInLife: true,
      context: md`A hypothetical head of test at an actuator company (illustrative, not a real account) liked the discovery call and the data walkthrough. On the follow-up call she says: "We want to do this. Two things: we do not pay for pilots, and our IT says any on-prem vendor needs the full vendor risk review, which takes about four months."`,
      start: "a",
      concepts: ["aw15.pilot-term-sheet", "aw15.security-pack", "aw15.pilot-path"],
      nodes: {
        a: {
          md: md`Start with the fee. What do you say?`,
          choices: [
            {
              text: "Ask what the policy protects against, then offer a give-get: a smaller fee fully credited against year one, or no fee in exchange for a written conversion price, a fixed decision date and her sponsorship to the VP of engineering",
              next: "b",
              score: 10,
              feedback: "You learned the reason, kept the commitment test and traded the fee for something worth more: a priced conversion and access to the economic buyer.",
            },
            {
              text: "Agree to a free pilot to keep momentum",
              next: "b",
              score: 3,
              feedback: "Momentum without commitment. A free pilot with no conversion price often ends in a technical success and no budget.",
            },
            {
              text: "Insist on the EUR 20k fee or walk away",
              next: "b",
              score: 4,
              feedback: "The fee is a commitment test, not a principle. Walking away before understanding the policy loses a qualified account.",
            },
            {
              text: "Offer to discount the annual licence by 50 % to make up for charging for the pilot",
              next: "b",
              score: 1,
              feedback: "You gave away the annual price to win a small fee. Never trade the conversion price for the pilot fee.",
            },
          ],
        },
        b: {
          md: md`She accepts a credited fee with a written conversion price. Now the four-month security review. What do you do?`,
          choices: [
            {
              text: "Ask for a 30-minute call with the security reviewer this week, send the pack outline before it, propose a scoped path (one server, no egress, no personal data captured in phase 1 by masking the screen recorder) and ask whether that falls under a lighter review tier",
              next: "c",
              score: 10,
              feedback: "Reviews are sized by risk. Reducing the risk surface and meeting the reviewer early is the fastest route through.",
            },
            {
              text: "Wait for IT to send their questionnaire",
              next: "c",
              score: 3,
              feedback: "Passive. You lose weeks before work starts and the reviewer forms a view without you.",
            },
            {
              text: "Suggest running Enclave on Afterwave's cloud during the pilot to avoid the review",
              next: "c",
              score: 2,
              feedback: "It moves their data off-site, which is the opposite of your security promise, and usually triggers a stricter review.",
            },
            {
              text: "Tell her the product is secure because it is on-prem, so the review should be quick",
              next: "c",
              score: 2,
              feedback: "On-prem is an argument, not evidence. The reviewer needs the pack.",
            },
          ],
        },
        c: {
          md: md`The reviewer agrees to a lighter tier if the screen recorder is off for phase 1. Your champion asks whether the pilot still proves anything without on-screen capture.`,
          choices: [
            {
              text: "Yes: phase 1 uses DAQ signals and test-app event logs on one clock for replayed recall and rig-hours; screen capture is added in phase 2 after the full review, and the success criteria do not depend on it",
              score: 10,
              feedback: "You kept the success criteria intact and sequenced the risky capture behind the review. The term sheet now says so.",
            },
            {
              text: "No: without screen capture the pilot is pointless, so push for the full review",
              score: 3,
              feedback: "Ripple's selection rests on change and dependency data and pass or fail history; screen capture adds context but is not needed to measure the pair.",
            },
            {
              text: "Turn the recorder on quietly once installed",
              score: 0,
              feedback: "A breach of the agreed scope and of personal data rules. It would end the relationship and possibly the company's reputation in the segment.",
            },
          ],
        },
      },
    },
  ],
};

export default lesson;
