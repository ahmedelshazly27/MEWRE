import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw11-l05",
  title: "The Machinery Regulation as Afterwave's go-to-market wedge",
  summary:
    "Turn the regulation into a sales motion without overclaiming: which evidence manufacturers must produce and which part of it Afterwave's capture, bench memory, Ripple and Enclave can support; which segments feel the date most; how to quantify the value (evidence cost per update and, much larger, cost of a delayed market date); and exactly what to say and never say to compliance, engineering and legal buyers.",
  minutes: 75,
  objectives: [
    "Map Machinery Regulation evidence requirements to Afterwave's products, separating what it supports from what stays with the manufacturer",
    "Rank target segments by regulatory urgency and explain why",
    "Quantify evidence cost per update and cost of delay for a prospect",
    "Use claim discipline: say what is true and useful, never imply compliance",
    "Run a discovery conversation with a compliance lead that qualifies the opportunity",
  ],
  concepts: [
    { id: "aw11.evidence-demand", name: "Regulatory evidence demand", description: "The test reports, version-linked regression results, update rationales and log verification that a manufacturer must produce and keep for 10 years, which grow with every software and model release.", competency: "aw-safety", related: ["aw11.technical-file", "aw11.regulatory-wedge"] },
    { id: "aw11.regulatory-wedge", name: "Regulatory wedge", description: "Using a dated, external and non-negotiable requirement as the entry point to a buyer, selling the evidence infrastructure it demands rather than compliance itself.", competency: "aw-business", related: ["aw11.evidence-demand", "aw11.claim-discipline"] },
    { id: "aw11.buyer-urgency", name: "Regulatory buyer urgency", description: "How strongly a segment feels the regulation, driven by EU market exposure after 20 January 2027, ML in safety functions (Part A), update cadence and the absence of harmonised standards.", competency: "aw-business", related: ["aw11.regulatory-wedge"] },
    { id: "aw11.claim-discipline", name: "Claim discipline", description: "Saying only what is true and checkable about regulation: Afterwave produces and organises evidence that supports the manufacturer's conformity work; conformity remains the manufacturer's responsibility.", competency: "aw-business", related: ["aw11.regulatory-wedge"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What the regulation makes manufacturers produce",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`A regulatory date is the best buying trigger a startup can have: it is external, public, dated and the same for every competitor of your customer. It is also the easiest place to lose credibility, because the person across the table is often a compliance engineer who knows the text better than you. The wedge works only if you sell what is true: Afterwave makes the evidence cheaper, faster and more trustworthy to produce. It does not make anyone compliant.`,
        },
        {
          kind: "md",
          md: md`### The evidence demand, mapped to Afterwave

| What the manufacturer must have | Where it comes from in the Regulation | What Afterwave is building toward | What stays with the manufacturer |
|---|---|---|---|
| Test results and technical reports for each applicable EHSR | Annex IV technical documentation | **Lockstep** captures rig signals and on-screen actions on one clock; **bench memory** stores each run with firmware, model and rig versions | Choosing tests, judging results, signing reports |
| Evidence kept 10 years, reproducible on request | Manufacturer obligations | Bench memory with retention inside **Enclave** (customer servers or isolated tenant), so IP never leaves | Retention policy, legal hold |
| Proof that each update stayed inside the foreseen envelope | Substantial-modification definition; EHSR 1.1.2 | **Ripple**: which tests a change can affect, with a written rationale for every selected and skipped test | Defining the envelope; deciding the classification |
| Regression statistics for ML safety functions per release | EHSRs 1.1.2 and 1.2.1; notified-body expectations | Versioned trial results linked to operating-domain cells; later, agents that plan retests for human approval | Setting targets, the representativeness argument |
| Verified decision and version logs on the machine | EHSR 1.2.1 | Bench tests that check log completeness and timing against captured signals | Designing the machine's logging |
| Protection-against-corruption tests | EHSR 1.1.9 | Capturing and versioning those tests as evidence | Security design and penetration testing |
| AI-Act-derived post-market monitoring (later, via delegated acts) | AI Act Art. 72 through Machinery Regulation Annex III | Bench memory plus field data as one evidence base (vision, not product today) | Monitoring plan, incident reporting |

Two things follow. First, the regulation converts every firmware or model release into an **evidence event**, so the demand scales with release cadence, which in physical AI is rising. Second, the evidence is valuable and sensitive (it describes the safety design in detail), which is why on-prem or isolated deployment is not a feature but a precondition.

### Where urgency is highest

| Segment | EU exposure after 20 Jan 2027 | ML in safety function (Part A) | Update cadence | Harmonised standard | Urgency |
|---|---|---|---|---|---|
| Humanoid makers | Planned first EU units 2027 and later | Often (person detection, balance) | High | None (ISO 25785-1 in draft) | **Very high** |
| AMR and mobile manipulator makers | High | Sometimes | High | Partial (Directive-era standards re-cited) | **High** |
| Cobot and robot cell makers, integrators | High; integrators become manufacturers | Sometimes (vision-based speed and separation) | Medium | ISO 10218:2025 (EN status unverified) | **High** |
| Test rig and test platform makers | Their rigs are machinery | Rarely | Low | Yes | Medium |
| E-drive, motor and inverter makers | Components; pressure arrives via machine-builder customers | Rarely | Medium | n/a | Low to medium |
| Battery makers | Mostly other regimes | No | Low | n/a | Low for this regulation |

This ranking is a hypothesis to test in discovery, not data.

### Quantifying value

The direct value is the cost of producing the evidence at every safety-relevant update:`,
        },
        { kind: "equation", formula: "aw11-evidence-cost" },
        {
          kind: "md",
          md: md`The larger value, when it applies, is time to market:`,
        },
        { kind: "equation", formula: "aw11-cost-of-delay" },
        {
          kind: "md",
          md: md`Lead with the first (you can compute it with the buyer's numbers and defend it), mention the second as the reason the date matters (it belongs to the buyer's own plan), and never claim Afterwave guarantees a date.

### Timeline of the wedge

The urgency is not a single moment; it changes character over three years.`,
        },
        {
          kind: "flow",
          title: "How the regulatory pull evolves",
          steps: [
            { label: "Late 2026", detail: "Gap analyses, classification, notified-body search. Pull: 'help us build the file'." },
            { label: "20 January 2027", detail: "Every new unit must comply. Pull: first Part A assessments; evidence on the critical path." },
            { label: "2027", detail: "Every release is an evidence event. Pull: per-update regression and rationale (Ripple)." },
            { label: "11 December 2027", detail: "CRA main obligations. Pull: security evidence joins the same evidence base." },
            { label: "2 August 2028", detail: "AI Act requirements through Machinery Regulation delegated acts. Pull: data governance and post-market evidence." },
          ],
          caption: "A wedge that starts with one date must become a habit tied to release cadence, or it ends when the first file is done.",
        },
        { kind: "widget", widget: "change-impact", caption: "Pick a changed model or firmware artifact and see which tests the change touches and how many rig-hours a selected rerun saves. In the regulatory frame, the output to show a compliance lead is the rationale per test: that is the evidence that an update was verified within its envelope." },
        { kind: "sources", refs: ["aw11-r1", "aw11-r4", "aw11-r10", "aw11-r24"] },
      ],
    },
    {
      layer: "applied",
      title: "A value case for a compliance-driven buyer",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Evidence cost and cost of delay for an illustrative AMR maker",
          given: md`Illustrative inputs from a hypothetical discovery call, not a real customer: 12 safety-relevant releases a year (firmware and classifier). Today each triggers a full re-verification of 220 rig-hours at EUR 120 per rig-hour, plus 30 engineer-hours at EUR 95 to analyse the change and update the file. Hypothesis to be measured in a pilot: with Ripple and bench memory, 80 rig-hours per release and 10 engineer-hours. The company plans 30 EU units a month at a contribution of EUR 25,000 per unit, and fears a 2-month slip of its first Regulation-conforming shipments.`,
          steps: [
            { md: md`**Status quo per release:** $220 \times 120 + 30 \times 95 = 26{,}400 + 2{,}850 = \text{EUR } 29{,}250$.` },
            { md: md`**Status quo per year:** $C_{ev} = 12 \times 29{,}250 = \text{EUR } 351{,}000$.` },
            { md: md`**With selection and drafted rationale:** $80 \times 120 + 10 \times 95 = 9{,}600 + 950 = \text{EUR } 10{,}550$ per release, $12 \times 10{,}550 = \text{EUR } 126{,}600$ per year.` },
            { md: md`**Direct saving:** $351{,}000 - 126{,}600 = \text{EUR } 224{,}400$ per year, plus calendar time: each release gate loses 140 rig-hours of work.` },
            { md: md`**Cost of a 2-month delay:** $C_d = 2 \times 30 \times 25{,}000 = \text{EUR } 1{,}500{,}000$ of contribution deferred (or lost, if customers buy elsewhere).` },
            { md: md`**How to present it:** lead with EUR 224k a year, computed with their inputs and a selection rate to be measured in the pilot. Mention that the larger number is the market date, and that evidence produced as tests run is one of the levers on it. Do not claim the EUR 1.5 m.` },
          ],
          result: md`About EUR 224k a year of direct evidence cost avoided supports an ACV in the EUR 22k to 45k range at 10 to 20 % value capture; the EUR 1.5 m delay exposure explains why the compliance lead and the VP will make time now. Both rest on illustrative inputs to be replaced by the buyer's.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a cobot cell integrator",
          given: md`Illustrative: 8 safety-relevant releases a year; full re-verification 150 rig-hours at EUR 100; documentation 24 h at EUR 90. Hypothesis with Ripple: 60 rig-hours and 8 h.`,
          steps: [
            { md: md`Status quo per release: $150 \times 100 + 24 \times 90 =$ **EUR 17,160**.`, hidden: true, check: { prompt: "Status quo cost per release (EUR)", answer: 17160, unit: "EUR", tolerance: { rel: 0.005 } } },
            { md: md`Status quo per year: $8 \times 17{,}160 =$ **EUR 137,280**.`, hidden: true, check: { prompt: "Status quo per year (EUR)", answer: 137280, unit: "EUR/yr", tolerance: { rel: 0.005 } } },
            { md: md`With selection: $8 \times (60 \times 100 + 8 \times 90) = 8 \times 6{,}720 =$ **EUR 53,760**.`, hidden: true, check: { prompt: "Cost with selection per year (EUR)", answer: 53760, unit: "EUR/yr", tolerance: { rel: 0.005 } } },
            { md: md`Saving: $137{,}280 - 53{,}760 =$ **EUR 83,520** per year.`, hidden: true, check: { prompt: "Annual saving (EUR)", answer: 83520, unit: "EUR/yr", tolerance: { rel: 0.005 } } },
          ],
          result: md`A smaller account: the direct value supports an ACV of roughly EUR 8k to 17k, which may not pay for a field-sales motion. Qualify on value before you qualify on urgency.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Talking about it without overclaiming",
      blocks: [
        {
          kind: "md",
          md: md`### Say and never say

| Never say | Say instead |
|---|---|
| "Afterwave makes you Machinery Regulation compliant." | "Conformity is yours and is assessed on the machine. We make the test evidence for your technical file faster to produce and easier to trust." |
| "Ripple proves an update is not a substantial modification." | "Ripple shows which tests a change can affect and why; your team uses that, with the results, to decide whether the update stayed inside the envelope you defined." |
| "We are certified for the Machinery Regulation." | Nothing: software tools are not certified under it. If asked, say so plainly. |
| "Notified bodies accept our reports." | "Here is what the report contains; we would like to walk your notified body through it together." (Only once that has happened can you say it happened, with permission.) |
| "The AI Act requires you to buy this." | "From 20 January 2027 the Machinery Regulation asks for X; here is the evidence that answers it." |
| "The date will slip, but you should still prepare." | "No postponement has been decided as of today. Here is the date and what changes on it." |

### Where the claim goes in writing

Website, deck, one-pagers and contracts should all carry the same sentence: Afterwave supports manufacturers' safety and conformity work with captured, versioned test evidence; it does not perform conformity assessment and does not replace the manufacturer's responsibility. Put a matching limitation in the customer agreement. A regulatory claim in marketing can become a liability claim in a dispute.

### Who to reach first

The compliance lead feels the date; the test lead feels the work; the VP owns the market date. In this wedge the compliance lead is often the best first door (he has a deadline and an empty evidence column), the test lead is the champion who must love the product, and the VP signs. Bring the evidence map to the first, the change-impact demo to the second and the cost-of-delay framing to the third.`,
        },
        {
          kind: "ask",
          title: "Discovery questions for a compliance lead",
          items: [
            "How many of your 2027 EU units fall after 20 January, and which products?",
            "Where does your Annex I classification stand, and has a notified body seen it?",
            "Walk me through the last time a firmware or model update went out: who decided it needed no new assessment, and what did they look at?",
            "How long does it take today from tests complete to an updated technical file?",
            "Where does your test evidence live, and could you reproduce a 2027 report in 2035?",
            "What would have to be true for you to put evidence tooling in next year's budget?",
          ],
        },
        { kind: "scenario", scenario: "aw11-s2" },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How the wedge fails",
          md: md`- **Becoming a consultancy.** Compliance leads will ask you to write their file. That is a services business with no bench memory; refer them to specialists and stay on evidence.
- **One-date dependence.** If the pitch is only "20 January 2027", it expires. Tie it to release cadence.
- **Selling to compliance only.** Without a test-team champion, the tool is never used and the renewal dies.
- **Legal phrasing drift.** Every new salesperson softens the disclaimer. Write it once, keep it in the message house.`,
        },
        { kind: "xref", to: "fc03-l03", note: "The message house and the 'never say compliant' rule for Ripple come from the messaging lesson; this lesson supplies the regulatory substance behind it." },
        { kind: "xref", to: "fc04-l06", note: "Design a pilot around one Part A safety function and one release cycle, with success criteria a compliance lead signs." },
        { kind: "xref", to: "fc08-l07", note: "Limitation-of-liability and no-compliance-warranty clauses for pilot and customer agreements." },
        {
          kind: "question",
          question: {
            id: "aw11-l05-p1",
            type: "short",
            prompt: md`**Produce the regulatory-wedge kit for one target segment of your choice** (humanoid makers, AMR makers or cobot integrators): (1) a 90 to 130 word cold email to a head of product compliance; (2) a five-row evidence map (requirement, evidence, Afterwave component, what stays with the customer) for the one-pager; (3) a value calculation with labelled illustrative inputs using $C_{ev}$ and, separately, $C_d$; (4) the disclaimer sentence for the website and the contract. No fabricated customers, results or endorsements.`,
            rubric: [
              "Email is specific to the segment, references 20 January 2027 accurately and what changes for that segment (Part A for ML safety functions, updates as evidence events), and ends with a low-friction ask",
              "Evidence map is accurate to the Regulation, assigns to Afterwave only what its products do (capture, versioned bench memory, change-impact rationale, private deployment) and keeps classification and conformity with the manufacturer",
              "Value calculation is arithmetically correct, uses the formulas, labels inputs as illustrative, and presents the delay cost as the buyer's exposure rather than an Afterwave promise",
              "Disclaimer clearly says Afterwave supports but does not perform conformity assessment or guarantee compliance",
              "No overclaims (no 'compliant', 'certified', 'accepted by notified bodies') and no invented facts",
            ],
            modelAnswer: md`**Segment:** humanoid makers.

**(1) Email.** "Subject: humanoid updates after 20 January 2027. Hi [name], from 20 January 2027 every humanoid placed on the EU market falls under the Machinery Regulation, and an ML-based safety function points to Annex I Part A and a notified body. The harder part comes after the first file: every firmware or model release then has to show it stayed inside the update envelope in your risk assessment. We are ex-Tesla validation engineers building Afterwave: bench capture on one clock, versioned bench memory on your own servers, and a change-impact engine that shows which tests each release must rerun and why. Would 30 minutes on how your last release was verified be useful?"

**(2) Evidence map.**

| Requirement | Evidence | Afterwave | Stays with you |
|---|---|---|---|
| Annex IV test reports | Versioned test results per EHSR | Lockstep capture, bench memory | Test selection approval, sign-off |
| Updates not substantial | Per-release regression and rationale | Ripple rationale per test | Envelope definition, classification |
| 1.2.1 logs | Bench check of log completeness and timing | Synchronised capture to compare logs with signals | Machine logging design |
| 10-year retention | Reproducible records | Bench memory inside Enclave | Retention policy |
| ML safety statistics | Trials per operating-domain cell with confidence bound | Versioned trial records | Targets and representativeness argument |

**(3) Value (illustrative).** 10 releases a year, 260 rig-h at EUR 130 plus 36 h at EUR 100 today: $C_{ev} = 10 \times (33{,}800 + 3{,}600) = \text{EUR } 374{,}000$. With 100 rig-h and 12 h: $10 \times (13{,}000 + 1{,}200) = \text{EUR } 142{,}000$. Saving EUR 232,000 a year, selection rate to be measured in a pilot. Separately, the buyer's exposure: 20 units a month at EUR 40,000 contribution, 3-month slip: $C_d = 3 \times 20 \times 40{,}000 = \text{EUR } 2.4$ m. Afterwave does not promise to prevent it.

**(4) Disclaimer.** "Afterwave provides software to capture, organise and analyse test evidence that supports manufacturers' safety and conformity work. Afterwave does not perform conformity assessment, act as a notified body or guarantee compliance with any regulation; conformity remains the responsibility of the manufacturer."`,
            explanation: md`Graded against the rubric. Test the kit by sending it to a compliance engineer you trust and asking him to find one sentence he would object to.`,
            concepts: ["aw11.regulatory-wedge", "aw11.claim-discipline", "aw11.evidence-demand"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a YC partner in four sentences why the EU Machinery Regulation is a wedge for Afterwave rather than the business itself.",
          keyPoints: [
            "It creates a dated, external trigger (20 January 2027) that opens doors with compliance and engineering leaders",
            "It turns every firmware and model release into an evidence event, so demand grows with physical AI release cadence",
            "Afterwave sells the evidence infrastructure (capture, bench memory, change impact, private deployment), not compliance",
            "The durable business is test intelligence and safety evidence across regulations and, later, insurers; the regulation is the entry point",
          ],
        },
      ],
    },
  ],
  scenarios: [
    {
      id: "aw11-s2",
      title: "The head of product compliance takes the call",
      context: md`Illustrative. You have a first call with the head of product compliance at a European AMR maker (not a real company). She knows the Machinery Regulation well, has a notified body lined up for an ML-based stop function, and is sceptical of startups.`,
      start: "a",
      concepts: ["aw11.claim-discipline", "aw11.regulatory-wedge", "aw11.evidence-demand"],
      nodes: {
        a: {
          md: md`She opens: "Everyone is selling me AI Act compliance this year. What exactly do you do?"`,
          choices: [
            { text: "\"We make you compliant with the AI Act and the Machinery Regulation.\"", score: 0, feedback: "The sentence she was waiting for, so she can end the call. False and unprovable." },
            { text: "\"Nothing for the AI Act directly. We capture and version your bench test evidence and show, after each firmware or model change, which tests must be rerun and why. Your team uses that in the technical file and to decide whether an update stayed inside its envelope.\"", score: 10, feedback: "Precise, modest and relevant to her actual problem.", next: "b" },
            { text: "\"We're a physical AI test infrastructure platform.\"", score: 4, feedback: "Category language without mechanism. She learns nothing.", next: "b" },
          ],
        },
        b: {
          md: md`She says: "Our problem is not the first file. It's that the ML team wants to release every six weeks and I have to sign off each time."`,
          choices: [
            { text: "Ask how she decides today, what evidence she looks at, how long it takes, and what happened the last time she said no.", score: 10, feedback: "Discovery before pitch: you learn the evidence gap and the cost in her words.", next: "c" },
            { text: "Start the Ripple demo immediately.", score: 4, feedback: "Premature; you do not yet know which evidence she lacks.", next: "c" },
          ],
        },
        c: {
          md: md`It takes her team about two weeks per release to assemble the regression evidence; twice this year a release slipped a month. She asks: "Will my notified body accept your reports?"`,
          choices: [
            { text: "\"Yes, they will.\"", score: 0, feedback: "You cannot know, and she will check." },
            { text: "\"I can't promise that; they judge evidence, not tools. What I can show you is exactly what each report contains and how it is versioned. I'd propose we walk your notified body through one release record together during a pilot.\"", score: 10, feedback: "Honest, and turns her objection into a pilot success criterion.", next: "d" },
          ],
        },
        d: {
          md: md`She agrees to a pilot scoped on one release cycle of the stop function. How do you define success?`,
          choices: [
            { text: "Written criteria: evidence package for one release produced in under 3 days instead of about 10 working days; every selected and skipped test has a rationale her team accepts; her notified body has reviewed the package format; conversion terms agreed in advance.", score: 10, feedback: "Measurable, owned by her, and tied to her real bottleneck." },
            { text: "\"She likes the product.\"", score: 1, feedback: "Not a criterion. Pilots without written criteria do not convert." },
          ],
        },
      },
    },
  ],
  quiz: [
    {
      id: "aw11-l05-q1",
      type: "mcq",
      prompt: "Which sentence about Afterwave and the Machinery Regulation is accurate?",
      options: [
        "Afterwave makes manufacturers compliant with the Machinery Regulation",
        "Afterwave is a notified body for AI-enabled machines",
        "Afterwave supports manufacturers' conformity work with captured, versioned test evidence; conformity remains the manufacturer's responsibility",
        "Afterwave's reports are accepted by all notified bodies",
      ],
      answer: 2,
      explanation: md`Only the third is true and checkable.`,
      concepts: ["aw11.claim-discipline"],
      difficulty: 1,
    },
    {
      id: "aw11-l05-q2",
      type: "numeric",
      prompt: md`A maker has 10 safety-relevant releases a year. Each costs 200 rig-hours at EUR 110 plus 20 engineer-hours at EUR 100. What is $C_{ev}$ per year? (EUR)`,
      answer: 240000,
      tolerance: { rel: 0.005 },
      unit: "EUR/yr",
      explanation: md`$C_{ev} = 10 \times (200 \times 110 + 20 \times 100) = 10 \times (22{,}000 + 2{,}000) = \text{EUR } 240{,}000$.`,
      concepts: ["aw11.evidence-demand"],
      difficulty: 1,
    },
    {
      id: "aw11-l05-q3",
      type: "numeric",
      prompt: md`A humanoid maker plans 15 EU units a month at EUR 60,000 contribution each. What is the cost of a 3-month delay $C_d$? (EUR)`,
      answer: 2700000,
      tolerance: { rel: 0.005 },
      unit: "EUR",
      explanation: md`$C_d = 3 \times 15 \times 60{,}000 = \text{EUR } 2{,}700{,}000$. The buyer's exposure, not an Afterwave promise.`,
      concepts: ["aw11.buyer-urgency"],
      difficulty: 1,
    },
    {
      id: "aw11-l05-q4",
      type: "multi",
      prompt: "Which factors raise a segment's regulatory urgency for this regulation? (Select all that apply.)",
      options: [
        "EU shipments after 20 January 2027",
        "ML in a safety function (Annex I Part A)",
        "High firmware and model release cadence",
        "No harmonised standard covering its main hazards",
        "Being listed on a stock exchange",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`Exposure, Part A, update cadence and missing standards all increase the evidence burden. Listing status is irrelevant.`,
      concepts: ["aw11.buyer-urgency"],
      difficulty: 1,
    },
    {
      id: "aw11-l05-q5",
      type: "decision",
      prompt: md`A compliance lead asks you to write her technical file for a fee, "since you understand the regulation". What do you do?`,
      options: [
        { text: "Accept: revenue is revenue.", score: 0.2, feedback: "Turns Afterwave into a consultancy, takes on regulatory liability and builds no product." },
        { text: "Decline the file-writing, refer her to a specialist consultancy, and propose a pilot where Afterwave produces the evidence package for one safety function that her team or consultant uses in the file.", score: 1, feedback: "Keeps you on evidence infrastructure and still solves part of her problem." },
        { text: "Decline and end the conversation.", score: 0.3, feedback: "Loses a qualified, urgent buyer." },
      ],
      explanation: md`Stay on evidence, which compounds into bench memory; leave conformity work with the manufacturer and its advisers.`,
      concepts: ["aw11.regulatory-wedge", "aw11.claim-discipline"],
      difficulty: 2,
    },
    {
      id: "aw11-l05-q6",
      type: "mcq",
      prompt: "Why must the regulatory pitch be tied to release cadence and not only to 20 January 2027?",
      options: [
        "Because the date will be postponed",
        "Because each safety-relevant release becomes an evidence event, so the need recurs; a one-date pitch expires after the first file",
        "Because release cadence is regulated by the AI Act",
        "It does not matter",
      ],
      answer: 1,
      explanation: md`Recurring evidence demand is what makes a subscription product and bench memory compound.`,
      concepts: ["aw11.evidence-demand", "aw11.regulatory-wedge"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw11-l05-f1", front: "The one-sentence claim", back: "Afterwave supports manufacturers' safety and conformity work with captured, versioned test evidence; it does not perform conformity assessment or guarantee compliance.", concepts: ["aw11.claim-discipline"] },
    { id: "aw11-l05-f2", front: "Evidence cost formula", back: md`$C_{ev} = N_u (H c_h + n_d c_e)$: releases times (rig cost plus documentation cost).`, concepts: ["aw11.evidence-demand"] },
    { id: "aw11-l05-f3", front: "Cost of delay formula", back: md`$C_d = \Delta t \, q \, m$. The buyer's exposure; never an Afterwave promise.`, concepts: ["aw11.buyer-urgency"] },
    { id: "aw11-l05-f4", front: "Highest-urgency segment", back: "Humanoid makers: EU units from 2027, ML in safety functions, high update cadence, no published humanoid standard.", concepts: ["aw11.buyer-urgency"] },
    { id: "aw11-l05-f5", front: "Who to reach in the wedge", back: "Compliance lead (feels the date), test lead (champion, does the work), VP (owns the market date, signs).", concepts: ["aw11.regulatory-wedge"] },
    { id: "aw11-l05-f6", front: "Why Enclave matters here", back: "Technical-file evidence describes the safety design in detail; keeping it on customer infrastructure is a precondition for this buyer.", concepts: ["aw11.evidence-demand"] },
  ],
};

export default lesson;
