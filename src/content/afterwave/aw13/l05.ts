import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw13-l05",
  title: "Battlecards and objection handling",
  summary:
    "Turn the landscape into sales tools: a one-page battlecard per competitor and per substitute, a six-step method for objections, and tested answers to the three you will hear most ('Nominal does this', 'we built our own', 'our DAQ vendor has a cloud'), plus the agent and incumbent variants. Track win and no-decision rates per alternative so you know which card to improve, and stay inside the rules for comparative claims.",
  minutes: 70,
  objectives: [
    "Build a one-page battlecard with positioning, win and lose conditions, landmine questions, objection answers, proof and traps",
    "Handle an objection in six steps without disparaging the competitor or accepting the wrong frame",
    "Answer 'Nominal does this', 'we built our own' and 'our DAQ vendor has a cloud' with specific, sourced responses",
    "Compute win rate and no-decision rate per alternative and decide which battlecard to work on",
  ],
  concepts: [
    { id: "aw13.battlecard", name: "Battlecard", description: "One page per competitor or substitute for the person on the call: one-line positioning against it, when we win and lose, landmine questions, objection answers, proof, traps to avoid and dated facts from the claim ledger.", competency: "aw-business", related: ["aw13.claim-ledger", "aw13.overlap-gap"] },
    { id: "aw13.objection-method", name: "Six-step objection handling", description: "Listen, acknowledge, clarify the real concern with a question, reframe to the buyer's decision, prove with something checkable, advance to a dated next step.", competency: "aw-business", related: ["aw13.battlecard"] },
    { id: "aw13.landmine-question", name: "Landmine question", description: "A discovery question that makes the buyer notice a gap in the alternative on his own (for example: after the last firmware release, how did the tool decide what to rerun?), instead of you asserting it.", competency: "aw-business", related: ["aw13.battlecard"] },
    { id: "aw13.win-rate-tracking", name: "Win and no-decision rates per alternative", description: "Win rate on decided deals and the share ending in no decision, tracked separately for each competitor and substitute, to show which alternative actually beats you.", competency: "aw-business", related: ["aw13.battlecard"] },
    { id: "aw13.fair-comparison", name: "Fair comparative claims", description: "Comparisons that are accurate, dated, verifiable and not denigrating; EU rules on comparative advertising (Directive 2006/114/EC) set similar conditions for published comparisons.", competency: "aw-business", related: ["aw13.claim-ledger"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What a battlecard is and how objections work",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You will run Afterwave's first sales calls yourself, often with Ismail or Yusuf on technical questions. The moment a test director says "Nominal does this", you have about ten seconds. A battlecard is what you prepared so that the answer is calm, accurate and moves the conversation to Ripple's frame. Later, it is the asset your first sales hire inherits, and the record of what the market told you.`,
        },
        { kind: "xref", to: "fc04-l01", note: "Founder-led sales and the living playbook: battlecards are one section of it." },
        {
          kind: "md",
          md: md`### Anatomy of a battlecard (one page, per alternative)

| Section | Content | Source |
|---|---|---|
| **One line** | How we are different from this alternative, in the buyer's words | Positioning (fc03 lesson 1) |
| **Facts** | What they sell, positioning, segments, deployment, dated, with status | Claim ledger (lesson 1) |
| **When we win** | Situations where our frame dominates | Won-deal reviews |
| **When we lose** | Situations where we should walk away or coexist | Lost-deal reviews |
| **Landmines** | Questions that let the buyer discover the gap himself | Discovery practice |
| **Objections** | Their most likely claims about us, and our answers | Calls, recordings |
| **Proof** | What we can show: demo on rig data, rationale per test, architecture | Product |
| **Traps** | What never to say | This lesson |

Write one card for each named competitor that appears in deals (Nominal, Sift, NI SystemLink and Nigel, Vector) **and one for each substitute**: "rerun everything", "the senior engineer decides", "we built our own". The substitute cards get used most.

### Objections are concerns in disguise

An objection names a competitor, but behind it sits a concern. Find the concern before answering:

| What they say | Usual concern behind it |
|---|---|
| "Nominal does this." | "Why add a vendor? Are you a smaller version of something we know?" |
| "We built our own." | "My team is good; do not make us look bad. Also: why pay?" |
| "Our DAQ vendor has a cloud." | "We already have a relationship and a contract; adding you is effort and risk." |
| "Sift has agents now." | "Will AI on our existing platform make this unnecessary?" |
| "Jama does impact analysis." | "Is this something our requirements tool already covers?" |
| "We will wait for NI's Nigel." | "Can we get this for free from a vendor we trust?" |`,
        },
        {
          kind: "flow",
          title: "Six-step objection handling",
          steps: [
            { label: "1. Listen", detail: "Let them finish. Do not interrupt with a rebuttal" },
            { label: "2. Acknowledge", detail: "State what is true in their point: 'Nominal is a strong platform for test data'" },
            { label: "3. Clarify", detail: "Ask for the concern: 'What did you look at it for?'" },
            { label: "4. Reframe", detail: "Move to the decision: 'after a firmware change, which tests do you rerun and why?'" },
            { label: "5. Prove", detail: "Something checkable: a demo on rig data, a rationale per test, a source with a date" },
            { label: "6. Advance", detail: "A dated next step: technical session, data sample, pilot criterion" },
          ],
          caption: "Steps 3 and 4 do the work. Most founders skip straight from 1 to 5 and argue features, which keeps the buyer in the competitor's frame.",
        },
        { kind: "equation", formula: "aw13-win-rate" },
        {
          kind: "md",
          md: md`### Rules for what you say about competitors

Spoken claims in a call and written claims in a comparison sheet should meet the same standard. In the EU, comparative advertising is permitted only under conditions set by **Directive 2006/114/EC**: broadly, it must not be misleading, must compare products meeting the same needs, must objectively compare material, relevant, verifiable and representative features, and must not discredit or denigrate the competitor. Treat that as the house rule for every battlecard line that could end up in an email or on a slide. In practice: date every fact, phrase gaps as "not advertised as of", and never describe a competitor's product as broken, insecure or failing.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Legal check",
          md: md`The directive summary above is general knowledge, not legal advice, and the research brief did not cover it. Before publishing any comparison page or sheet that names competitors, have counsel check it against the directive and national law in the markets where it is used (Netherlands, Switzerland, Germany, United States).`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Three battlecards and three answers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Battlecard: Nominal (internal, facts as of 6 Nov 2026)",
          given: md`Built from lessons 1, 2 and 4. Facts from the claim ledger; plays are hypotheses until deals confirm them.`,
          steps: [
            { md: md`**One line:** "Nominal stores and runs your test data; Ripple tells you which tests to rerun after a change, and why."` },
            { md: md`**Facts (as reported):** continuous test stack for physical systems; Core (cloud, private, on-prem) and Connect (bench edge app, air-gapped). Customers named: Anduril, Shield AI. USD 80 m Series B-2 at USD 1 bn valuation (5 Mar 2026). Change impact or test selection not advertised.` },
            { md: md`**When we win:** the pain is over-testing or slow release gates after firmware, model or rig changes; selection decisions must be documented; drives, actuators, humanoids. **When we lose:** the buyer's job is a data platform; a defence programme that standardised on Nominal. **Play:** coexist where they own it; do not compete where the job is a data platform.` },
            { md: md`**Landmines:** "After the last firmware release, how did your data platform help decide what to rerun?" "Where do rig configuration and fixture changes live?" "If a skipped test is questioned in a safety review, what record do you show?"` },
            { md: md`**Proof:** demo on rig data with a rationale for each selected and skipped test; architecture showing Ripple reading existing data exports (feasibility to confirm per customer).` },
            { md: md`**Traps:** never say "they cannot do change impact" (say "not advertised as of Nov 2026"); never quote a total raised (sources conflict); never position as "cheaper Nominal".` },
          ],
          result: md`One page, dated, no disparagement, and built around the frame where Ripple wins. The same structure applies to Sift (replace Core/Connect with telemetry, rules, alerts and Sift Agents, and segments with space).`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Answers to the three objections you will hear most",
          given: md`Each answer follows the six steps. Words are a starting script, to be adapted after real calls.`,
          steps: [
            {
              md: md`**"Nominal does this."**
Acknowledge: "Nominal is a strong platform for capturing and analysing test data; a lot of teams are looking at it." Clarify: "What were you looking at it for?" Reframe: "The question we work on is narrower: after a firmware, model or rig change, which tests do you rerun, and can you show why the others were skipped? How is that decided today?" Prove: "I can show you that on rig data in 30 minutes: every selected and skipped test with its reason." Advance: "If you share one recent release and its regression list, we will run it with Ismail next week."`,
            },
            {
              md: md`**"We built our own."**
Acknowledge: "Most good labs have. Who built it?" Clarify: "What does it do well, and what do you wish it did?" Reframe: "We usually keep that tooling. The gap we see is the decision after a change: which tests the change can actually affect across rigs, with a record of why." Prove: show selection with rationale reading their existing file format; offer the TCO and value calculation with their inputs (lesson 3). Advance: "Could the engineer who built it join a technical session?"`,
            },
            {
              md: md`**"Our DAQ vendor has a cloud."** (For example NI SystemLink, which centralises test and asset management, with broader availability since July 2025.)
Acknowledge: "Keeping your NI hardware and software makes sense; we read their data." Clarify: "What do you use it for today: asset management, results, dashboards?" Reframe: "Does it tell you, after a firmware change, which tests to rerun across rigs that may come from different vendors, with a reason for each?" Prove: show Ripple taking NI files as input and returning a TestStand run list. Advance: "Which rigs are not on NI? That is usually where the cross-tool question bites."`,
            },
            {
              md: md`**Variants.** "Sift has agents now": "Sift Agents (preview since Sep 2026) investigate telemetry and propose rules with human approval; ask whether they propose which tests to rerun, and on what rig and dependency data." "We will wait for Nigel": "Nigel works inside NI's tools; ask whether it will model dependencies across firmware, rigs and non-NI tools. Meanwhile the next release is in four weeks." "Jama does impact analysis": "Suspect links fire when a requirement changes, which Ripple uses as an input; they do not fire when firmware or a rig changes."`,
            },
          ],
          result: md`Each answer concedes what is true, asks before asserting, moves to the change-impact decision and ends with a dated next step. None of them claims what a competitor cannot do.`,
        },
        {
          kind: "question",
          question: {
            id: "aw13-l05-p1",
            type: "numeric",
            prompt: md`Illustrative first-year pipeline. Opportunities where "we built our own" was the main alternative: 3 won, 2 lost, 7 ended in no decision. What is the no-decision rate $d$ for that alternative? (as a fraction)`,
            answer: 0.583,
            tolerance: { abs: 0.005 },
            explanation: md`$d = N/(W+L+N) = 7/(3+2+7) = 7/12 \approx 0.583$. The win rate on decided deals is $3/5 = 0.6$, which looks healthy, but most deals against the internal tool never decide. That is the battlecard to work on: the status quo, not Nominal.`,
            concepts: ["aw13.win-rate-tracking"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Using and maintaining battlecards",
      blocks: [
        {
          kind: "md",
          md: md`### Who owns them and how they stay true

- **Owner:** you, until a sales or product marketing hire exists. Ismail and Yusuf sign off every technical line.
- **Inputs:** call recordings and notes (with consent), won and lost deal reviews, the claim ledger, competitor release notes.
- **Cadence:** update the relevant card within a week of any deal where that alternative appeared; review all cards quarterly with the ledger.
- **Format:** one page each, in the CRM or a shared doc, linked from the opportunity record. Facts carry a date; anything older than six months gets rechecked before use.
- **Measurement:** record the main alternative on every opportunity, and compute win rate and no-decision rate per alternative each quarter. Report counts as well as rates while numbers are small.`,
        },
        { kind: "xref", to: "fc04-l04", note: "MEDDPICC's Competition element: where the battlecard plugs into qualification." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Battlecard failures",
          md: md`- **FUD:** "their security is weak", "they are only for defence". Unprovable, and buyers repeat it to the competitor.
- **Feature checklists:** a 40-row comparison where they tick more boxes. You have accepted their frame.
- **Stale facts:** a funding round or feature from a year ago, said with confidence.
- **No substitute cards:** you are ready for Nominal and lose to a spreadsheet.
- **Cards nobody uses:** if Ismail cannot find the answer during a call, the card does not exist.`,
        },
        {
          kind: "checklist",
          title: "Before a call where a competitor will come up",
          items: [
            "Relevant card read, and every fact on it checked against the ledger date",
            "Two landmine questions chosen for this buyer",
            "Demo or proof ready on rig data that resembles theirs",
            "One concession prepared (what the competitor genuinely does well)",
            "A dated next step to propose",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask after a lost or stalled deal",
          items: [
            "What did you decide to do instead, and why?",
            "At which point did Afterwave stop being the best option?",
            "What would have had to be true for you to go ahead?",
            "Who in the team argued for the alternative, and what was their main point?",
          ],
        },
        { kind: "scenario", scenario: "aw13-s1" },
        {
          kind: "question",
          question: {
            id: "aw13-l05-p2",
            type: "short",
            prompt: md`**Write the battlecard for the substitute "our DAQ vendor has a cloud"** (use NI SystemLink and Nigel as the example vendor). Include: (1) the one-line difference in the buyer's words; (2) dated facts with status; (3) when Afterwave wins and when it should coexist or walk away; (4) three landmine questions; (5) the six-step answer to the objection; (6) proof you can show; (7) three traps to avoid.`,
            rubric: [
              "One line separates the DAQ vendor's job (data, assets, results inside its ecosystem) from Ripple's (which tests to rerun after a change, across tools, with a rationale)",
              "Facts are from the research brief and dated (SystemLink broader availability Jul 2025; Nigel announced 13 May 2026 with GA later in 2026), with no invented features",
              "Win, coexist and walk-away conditions are specific (e.g. mixed-vendor rigs and frequent firmware releases vs single-vendor lab with rare changes)",
              "Landmine questions let the buyer discover the gap, and the objection answer follows acknowledge, clarify, reframe, prove, advance",
              "Traps include disparaging the vendor, claiming it cannot do something, and proposing to replace the vendor's tools",
            ],
            modelAnswer: md`**1. One line.** "Your NI tools keep your data and run your tests; Ripple tells you which tests to rerun after a change, across all your rigs, and why."

**2. Facts.** NI (Emerson): FlexLogger, TestStand, LabVIEW, SystemLink for centralised test and asset management, broader availability announced Jul 2025. Nigel AI assistant across LabVIEW+, FlexLogger, TestStand and SystemLink, announced 13 May 2026, GA later in 2026 (check whether shipped). No change-impact test selection found in the research (Nov 2026).

**3. Conditions.** Win: frequent firmware or model releases, several rig types including non-NI equipment, documented selection needed for safety reviews. Coexist: always; Ripple reads NI data and writes TestStand run lists. Walk away (for now): single-vendor lab with rare changes and no rig-time pressure.

**4. Landmines.** "After the last firmware release, how did SystemLink help decide which tests to rerun?" "Which rigs or tools are outside NI?" "If an auditor asks why a test was skipped, where is that recorded?"

**5. Answer.** Listen. Acknowledge: "Keeping NI makes sense; we read their files." Clarify: "What do you use SystemLink for today?" Reframe: "Does it tell you, after a firmware change, which tests the change can affect across rigs, with a reason?" Prove: Ripple taking TDMS files and returning a TestStand list with rationale. Advance: "Send one release's regression list; we will show the selection next week."

**6. Proof.** Demo on rig data; architecture diagram with NI as input and output; rationale export.

**7. Traps.** Do not call Nigel vapourware; do not say "NI cannot do this" (say "not advertised as of Nov 2026"); do not propose replacing SystemLink or TestStand.`,
            explanation: md`Graded against the rubric. The strongest cards make the incumbent part of the solution and keep the buyer's attention on the decision after a change.`,
            concepts: ["aw13.battlecard", "aw13.objection-method", "aw13.landmine-question", "aw13.fair-comparison"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a new sales hire why Afterwave's most-used battlecard is probably 'we built our own', not 'Nominal'.",
          keyPoints: [
            "Most labs select tests by judgment or in-house scripts; that is the real alternative",
            "Deals against the status quo tend to end in no decision rather than a loss",
            "Win rate alone hides this; track the no-decision rate per alternative",
            "The answer to the internal tool is wrap, then extend, with the author as champion and value the script cannot reach",
          ],
        },
        { kind: "sources", refs: ["aw13-r1", "aw13-r9", "aw13-r15", "aw13-r16", "aw13-r20", "aw13-r26", "aw13-r28"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw13-l05-q1",
      type: "order",
      prompt: "Order the six steps of objection handling.",
      items: ["Listen", "Acknowledge", "Clarify", "Reframe", "Prove", "Advance"],
      explanation: md`Listen fully, concede what is true, find the concern, move to the buyer's decision, show something checkable, and end with a dated next step.`,
      concepts: ["aw13.objection-method"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw13-l05-q2",
      type: "mcq",
      prompt: "Which is a landmine question for a prospect evaluating a test data platform?",
      options: [
        "\"Did you know their platform is weak on robotics?\"",
        "\"After the last firmware release, how did the platform help you decide which tests to rerun, and where is that recorded?\"",
        "\"How much did they quote you?\"",
        "\"Would you like to see our dashboards?\"",
      ],
      answer: 1,
      explanation: md`A landmine lets the buyer discover the gap himself, in the frame where Ripple wins. Assertions about a competitor's weakness are FUD.`,
      concepts: ["aw13.landmine-question"],
      difficulty: 1,
    },
    {
      id: "aw13-l05-q3",
      type: "numeric",
      prompt: md`Illustrative: against Nominal you won 2, lost 3 and had 1 no decision. What is your win rate on decided deals? (as a fraction)`,
      answer: 0.4,
      tolerance: { abs: 0.005 },
      explanation: md`$w = W/(W+L) = 2/5 = 0.4$. No-decision rate $1/6 \approx 0.17$. Compare with the internal-tool alternative, where the no-decision rate was 0.58 in the lesson example: different alternatives fail you in different ways.`,
      concepts: ["aw13.win-rate-tracking"],
      difficulty: 1,
    },
    {
      id: "aw13-l05-q4",
      type: "multi",
      prompt: "Which battlecard lines meet the fair-comparison standard?",
      options: [
        "\"Change impact or test selection not advertised by Nominal as of 6 Nov 2026.\"",
        "\"Sift is insecure for robotics data.\"",
        "\"Sift Agents (research preview, Sep 2026) propose rules with human approval.\"",
        "\"NI's Nigel will never ship.\"",
      ],
      answer: [0, 2],
      explanation: md`Dated, verifiable, non-denigrating statements pass. Unprovable claims about security or future delivery are both unfair and risky.`,
      concepts: ["aw13.fair-comparison"],
      difficulty: 2,
    },
    {
      id: "aw13-l05-q5",
      type: "decision",
      prompt: md`Mid-demo, the prospect's data engineer says: "Sift has agents now. Why wouldn't we just ask the Sift agent which tests to rerun?" What do you say?`,
      options: [
        { text: "\"Good question. Sift Agents, in preview since September, investigate telemetry and propose rules with approval. Worth asking them whether they recommend which tests to rerun, and from what rig and dependency data. Here is what Ripple uses for that decision, and the record it leaves.\"", score: 1, feedback: "Accurate, dated, turns the question into a landmine and shows proof." },
        { text: "\"Their agents are just a chatbot.\"", score: 0, feedback: "Disparaging and inaccurate; you lose the engineer." },
        { text: "\"Our AI is better.\"", score: 0.1, feedback: "Unprovable and stays in their frame." },
        { text: "\"Let me get back to you on that.\"", score: 0.3, feedback: "Acceptable if you truly do not know, but this one you should have prepared." },
      ],
      explanation: md`Prepared variants of the main objections let you answer accurately and redirect to the decision Ripple owns.`,
      concepts: ["aw13.objection-method", "aw13.landmine-question"],
      difficulty: 2,
    },
    {
      id: "aw13-l05-q6",
      type: "mcq",
      prompt: "Which battlecards should exist before the first ten Afterwave sales calls?",
      options: [
        "Only Nominal and Sift, because they are best funded",
        "Nominal, Sift, the DAQ vendor cloud, and the substitutes: rerun everything, engineer judgment, we built our own",
        "Every company on the landscape slide",
        "None until a sales hire joins",
      ],
      answer: 1,
      explanation: md`Cards for the alternatives that actually appear in calls, including the substitutes, which appear most often.`,
      concepts: ["aw13.battlecard"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw13-l05-f1", front: "Battlecard sections", back: "One line, facts (dated), when we win, when we lose, landmines, objections, proof, traps.", concepts: ["aw13.battlecard"] },
    { id: "aw13-l05-f2", front: "Six steps for an objection", back: "Listen, acknowledge, clarify, reframe, prove, advance.", concepts: ["aw13.objection-method"] },
    { id: "aw13-l05-f3", front: "Answer to 'Nominal does this' in one line", back: "Nominal stores and runs your test data; Ripple tells you which tests to rerun after a change, and why. How is that decided today?", concepts: ["aw13.objection-method"] },
    { id: "aw13-l05-f4", front: "Answer to 'our DAQ vendor has a cloud'", back: "Keep it, we read its data; does it tell you which tests to rerun after a firmware change, across rigs and vendors, with a reason?", concepts: ["aw13.objection-method"] },
    { id: "aw13-l05-f5", front: "Win rate and no-decision rate", back: md`$w = W/(W+L)$; $d = N/(W+L+N)$, per alternative.`, concepts: ["aw13.win-rate-tracking"] },
    { id: "aw13-l05-f6", front: "Fair comparison test (EU 2006/114/EC spirit)", back: "Accurate, same need, material and verifiable features, not denigrating. Date every fact.", concepts: ["aw13.fair-comparison"] },
  ],
  scenarios: [
    {
      id: "aw13-s1",
      title: "\"Nominal does this\"",
      dayInLife: true,
      context: md`Illustrative. First call with the director of validation at a humanoid robotics company, 30 minutes. He agreed to talk after a cold email about regression time after firmware releases. Two minutes into your opening he says: "We had a demo from Nominal last month. Isn't this what they do?"`,
      start: "a",
      concepts: ["aw13.objection-method", "aw13.landmine-question", "aw13.coexist-play"],
      nodes: {
        a: {
          md: md`He is waiting. You have the Nominal battlecard in your head.`,
          choices: [
            { text: "\"Nominal is a strong data platform. What did you look at it for?\"", next: "b", score: 10, feedback: "Acknowledge and clarify: you learn his frame before choosing yours." },
            { text: "\"No, Nominal is a defence company, it is not built for robotics.\"", next: "c", score: 1, feedback: "Unprovable, disparaging, and Nominal says it is pushing into robotics. He will check." },
            { text: "Launch into a feature comparison.", next: "c", score: 3, feedback: "You accept the data-platform frame, where they have years of product and far more money." },
          ],
        },
        b: {
          md: md`"We need one place for all the actuator test data. Right now it is scattered over lab PCs." Then he adds: "Also, every firmware drop we rerun most of the joint regression, about four days of rig time."`,
          choices: [
            { text: "\"Then you may well need a data platform, and Nominal is a serious option. The four days are what we work on: after a firmware change, which tests can it actually affect, and why skip the rest. How is that decided today?\"", next: "d", score: 10, feedback: "Coexist on the data platform, reframe to the decision Ripple owns, and ask a landmine question." },
            { text: "\"We do a data platform too, and also test selection.\"", next: "c", score: 4, feedback: "You turned it into a contest on breadth, where you are weaker." },
          ],
        },
        c: {
          md: md`He sounds less engaged: "OK. Send me something and I will compare."`,
          choices: [
            { text: "\"Before I do: when the last firmware drop came, who decided what to rerun, and how long did it take?\"", next: "d", score: 6, feedback: "A late landmine question can recover the call by reopening the pain." },
            { text: "Send the deck and a comparison table.", score: 1, feedback: "A comparison table in the data-platform frame is a loss on paper." },
          ],
        },
        d: {
          md: md`"Honestly, the lead engineer picks based on what the firmware team tells him. If he is away, we rerun everything." He pauses. "Could your thing work with Nominal if we bought it?"`,
          choices: [
            { text: "\"That is the design intent: Ripple reads run data and rig history and returns a test list with a reason per test. Whether it reads Nominal exports directly we would confirm with you. Could you share one recent firmware release and its regression list so Ismail can show you the selection next week?\"", score: 10, feedback: "Honest about what is confirmed, proof offered, dated next step with the technical cofounder." },
            { text: "\"Yes, we integrate with Nominal.\"", score: 2, feedback: "You do not know that integration exists. An unverified claim on call one becomes a broken promise in the pilot." },
            { text: "\"You will not need Nominal if you buy us.\"", score: 2, feedback: "Forces a choice you are likely to lose, and contradicts what he told you he needs." },
          ],
        },
      },
    },
  ],
};

export default lesson;
