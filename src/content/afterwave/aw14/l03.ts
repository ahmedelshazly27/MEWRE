import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw14-l03",
  title: "YC and US venture expectations for a hardware-adjacent AI infrastructure company",
  summary:
    "The YC standard deal converted for Afterwave, the W27 timeline as it stands in November 2026, what YC partners and US seed investors probe in a hardware-adjacent AI infrastructure company, and the evidence that counts at seed versus Series A, without claiming traction that does not exist.",
  minutes: 75,
  objectives: [
    "Compute YC's ownership after the 7 % SAFE and the uncapped MFN SAFE convert into Afterwave's seed",
    "State the W27 timeline and its status, and the decisions it forces on the founders (full-time, San Francisco, Delaware)",
    "Anticipate the questions YC partners and US seed investors ask a hardware-adjacent infrastructure company and answer them with mechanisms",
    "Separate seed-stage evidence from Series A evidence for an on-prem enterprise product",
  ],
  concepts: [
    { id: "aw14.yc-deal-conversion", name: "YC deal conversion for Afterwave", description: "USD 125k for 7 % on a post-money SAFE (implied USD 1.79m post-money) plus USD 375k on an uncapped MFN SAFE that takes the terms of the next SAFE or round; YC's total is 7 % plus 375k over the next cap or post-money.", competency: "aw-business", related: ["fc08.post-money-safe", "fc07.accelerator-terms"] },
    { id: "aw14.yc-timeline", name: "YC W27 timeline and its forcing decisions", description: "On-time deadline 2 Nov 2026 (passed), decisions reportedly by about 11 Dec 2026, batch about January to March 2027 in San Francisco; acceptance forces full-time founders, a US presence for the batch and an eligible parent entity.", competency: "aw-business" },
    { id: "aw14.investor-probes", name: "What investors probe in hardware-adjacent AI infra", description: "Software margin vs services and hardware, enterprise sales cycle and on-prem friction, the wedge against funded data platforms, who builds the software, regulation as a driver, and expansion to a venture-scale outcome.", competency: "aw-business", related: ["fc07.why-vcs-say-no"] },
    { id: "aw14.stage-evidence", name: "Stage evidence for enterprise infra", description: "Seed: founder-market fit, design partners, paid pilots with measured outcomes, a repeatable first use case. Series A: recurring revenue from several customers, expansion inside accounts, a sales motion that is not only the founders.", competency: "aw-business", related: ["fc07.stage-expectations"] },
  ],
  scenarios: [
    {
      id: "aw14-s1",
      title: "The YC partner asks: 'Isn't this just test automation?'",
      dayInLife: true,
      context: md`Illustrative. You are in Afterwave's YC interview with Ismail and Yusuf. Four minutes in, a partner interrupts: "Test automation has been around for decades. NI, Vector, dSPACE. Why is this a venture-scale company and not a consulting shop?"`,
      start: "a",
      concepts: ["aw14.investor-probes"],
      nodes: {
        a: {
          md: md`How do you answer?`,
          choices: [
            { text: "\"We're using AI to make test automation much better.\"", score: 2, feedback: "Generic, and it accepts the frame. Partners hear this every day.", next: "b" },
            { text: "\"We don't automate test execution. We decide what to retest. After a firmware, model or rig change, Ripple tells a test team which tests the change invalidates and why, from bench data we capture on one clock with Lockstep. The incumbents sequence and log tests; none we found selects them across rig, firmware and model changes. Physical AI teams change models weekly while rig time stays fixed, so selection is the bottleneck.\"", score: 10, feedback: "Reframes in one sentence, names the mechanism and the gap, and gives the why-now in plain terms.", next: "c" },
            { text: "\"Our team is ex-Tesla, so we know this space.\"", score: 4, feedback: "Founder-market fit matters, but it does not answer the question asked.", next: "b" },
          ],
        },
        b: {
          md: md`The partner: "I still don't see what's new." You have one more chance.`,
          choices: [
            { text: "Give the selection-not-execution reframe with the concrete mechanism and the why-now.", score: 6, feedback: "Recovered, but you used a minute you did not have." , next: "c" },
            { text: "List features: dashboards, AI assistant, integrations.", score: 1, feedback: "Features are not a thesis; the interview moves on unconvinced." },
          ],
        },
        c: {
          md: md`"OK. How many customers do you have?"`,
          choices: [
            { text: "State exactly what exists today (for example conversations, design-partner discussions or pilots, only if real) and what you will have by Demo Day, with the metric each pilot measures.", score: 10, feedback: "Precise and honest. YC partners check, and an inflated answer ends the interview's credibility." },
            { text: "Round up: count interested contacts as customers.", score: 0, feedback: "Misrepresentation. It will be found in diligence, and partners talk to each other." },
            { text: "\"We're pre-revenue, but the market is huge.\"", score: 3, feedback: "Honest but empty. Follow with what you will prove next and by when." },
          ],
        },
      },
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The deal, the calendar and the questions",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave applied to YC W27. Within weeks you may have an interview, a decision, and if accepted a structure to change, a team to move to San Francisco for three months and a Demo Day raise to run. Founder Core explains accelerators and SAFEs in general; this lesson works through what the YC deal and US seed expectations mean for Afterwave specifically, including the hard questions about hardware, on-prem sales and your team.`,
        },
        { kind: "xref", to: "fc07-l03", note: "Founder Core: the capital sources map and accelerator terms compared (YC, a16z speedrun, Antler, Hub71)." },
        { kind: "xref", to: "fc08-l02", note: "Founder Core: post-money SAFE mechanics, including the YC deal converted into a priced seed." },
        {
          kind: "md",
          md: md`### The YC standard deal (as reported for 2026)

- **USD 125k for 7 %** on a post-money SAFE. Implied post-money cap $= 125/0.07 =$ USD 1.79m.
- **USD 375k on an uncapped MFN SAFE**: it has no cap of its own and takes the best terms of a later SAFE or converts at the next priced round's price.
- YC also takes **pro rata rights**.

YC's total stake after Afterwave's next financing:`,
        },
        { kind: "equation", formula: "aw14-yc-stake" },
        {
          kind: "md",
          md: md`The higher the next round's cap or post-money, the smaller the MFN piece. That is why the Demo Day valuation matters to the cap table as well as to the headline.

### The W27 calendar (research brief, November 2026)

| Date | Event | Status |
|---|---|---|
| About October 2026 | W27 applications opened | Reported |
| **2 Nov 2026, 8 pm PT** | On-time deadline | **Passed**; late applications considered without a guaranteed timeline |
| By about **11 Dec 2026** | Decisions for on-time applicants (interviews come before) | Secondary sources only |
| About **January to March 2027** | Batch in San Francisco, ending with Demo Day | Secondary sources only |
| Spring 2027 | Next batch; deadline not officially published | Unverified |

What acceptance forces, in order: **full-time founders** (a cofounder still employed elsewhere must resign or the problem must be addressed openly), **presence in San Francisco** for the batch, and an **eligible parent entity** before the SAFEs are signed: US (Delaware), Cayman or Singapore, after Canada was reportedly dropped in January 2026. Lesson 4 covers the structure.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check these on ycombinator.com before relying on them",
          md: md`The deal terms, decision date, batch dates and eligible jurisdictions come from multiple secondary sources; the primary YC pages were not reachable during course research. A reported reversal of the Canada change is unverified. From Spring 2026, companies can reportedly take the investment in USDC. Interview length and format are as commonly reported (a short interview, about 10 minutes), not confirmed for W27.`,
        },
        { kind: "sources", refs: ["aw14-r1", "aw14-r2", "aw14-r3"] },
        {
          kind: "md",
          md: md`### What partners probe in a hardware-adjacent AI infrastructure company

| Probe | What they are really asking | Afterwave's honest answer has to cover |
|---|---|---|
| "Isn't this test automation?" | Is there a new insight, or an old market? | Selection, not execution: which tests a change invalidates, across rig, firmware and model |
| "Is this a hardware company?" | Margins and capital intensity | Software first (Lockstep, Enclave, Ripple); platforms later and only if they pull software and data |
| "On-prem enterprise sales take 12 months." | Can you get revenue during the batch and the seed? | Paid pilots on a few rigs, a security-review playbook, Enclave on customer servers from day one |
| "Why won't Nominal or Sift build this?" | Is the wedge defensible against funded players? | The change graph and one-clock capture as the data asset; integrate with their stores rather than replace |
| "Who writes the code and the models?" | Can this team ship software? | The real answer about who builds Lockstep, Enclave and Ripple, and the hiring plan |
| "Is regulation the reason to buy?" | Will demand vanish if a deadline slips? | Regulation is a timing accelerant; the core value is rig hours and escaped defects |
| "How is this a billion-dollar company?" | Fund-returner logic | Bottom-up SAM, then expansion: more rigs, more labs, agents, platforms, safety evidence |

The pattern behind all of them: partners want a **specific mechanism**, a **number you can defend**, and **honesty about what is unproven**.`,
        },
        {
          kind: "chart",
          chart: "stacked-bar",
          title: "Illustrative ownership after the first institutional money",
          xKey: "path",
          yLabel: "Fully diluted ownership (%)",
          series: [
            { key: "founders", label: "Founders" },
            { key: "yc", label: "YC (7 % + MFN)" },
            { key: "seed", label: "Seed investors" },
          ],
          data: [
            { path: "YC + USD 3m seed SAFE at USD 15m post", founders: 70.5, yc: 9.5, seed: 20 },
            { path: "No YC, USD 2m seed at USD 10m post", founders: 80, yc: 0, seed: 20 },
          ],
          caption: "Illustrative, no pool shown. The YC path costs 9.5 points but here raises USD 3.5m instead of USD 2m, and the founders' stake is worth USD 10.6m at the post-money instead of USD 8m. Whether YC lifts the next round by that much is the real question.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Running the numbers and the evidence",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "YC's stake after a Demo Day SAFE round (illustrative)",
          given: md`Illustrative. Afterwave takes the YC deal, then raises **USD 3m on post-money SAFEs at a USD 15m cap** after Demo Day. No option pool yet.`,
          steps: [
            { md: md`**7 % SAFE:** fixed at 7 %.` },
            { md: md`**MFN SAFE:** adopts the USD 15m post-money cap: $375/15{,}000 = 2.5\%$.` },
            { md: md`**Seed SAFEs:** $3{,}000/15{,}000 = 20\%$.` },
            { md: md`**Founders:** $100 - 7 - 2.5 - 20 = 70.5\%$. Cash raised $0.5 + 3 =$ USD 3.5m.` },
            { md: md`**Then a priced seed or Series A** dilutes everyone, including YC, by the round's $d$ (plus any pool shuffle).` },
          ],
          result: md`YC ends at **9.5 %** and the founders at **70.5 %** before any pool. Every post-money SAFE comes out of the founders' row: add them up before signing each one.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A higher Demo Day cap",
          given: md`Illustrative. Same deal, but the Demo Day SAFEs raise **USD 4m at a USD 20m post-money cap**.`,
          steps: [
            { md: md`MFN stake $= 375/20{,}000$.` },
            { md: md`= **1.875 %**.`, hidden: true, check: { prompt: "MFN SAFE stake (%)", answer: 1.875, unit: "%", tolerance: { abs: 0.01 } } },
            { md: md`Seed SAFE stake $= 4/20$ = 20 %. Founders $= 100 - 7 - 1.875 - 20$.` },
            { md: md`= **71.125 %**.`, hidden: true, check: { prompt: "Founders' ownership (%)", answer: 71.125, unit: "%", tolerance: { abs: 0.01 } } },
          ],
          result: md`A higher cap raised USD 1m more for the same 20 % and shrank the MFN piece. The cap matters, but runway to the next milestone matters more (Lesson 5).`,
        },
        {
          kind: "md",
          md: md`### Seed evidence vs Series A evidence for an on-prem infrastructure product

| | Seed (what a US seed lead wants to see) | Series A |
|---|---|---|
| Customers | Design partners at named segments (robotics, drives, batteries); one or more paid pilots | Several paying customers on annual contracts |
| Product proof | Ripple lists that a test lead acted on; measured rerun reduction against the lab's own baseline | Repeatable deployment; time to value in weeks, not months |
| Revenue | Pilot fees, first conversions | Recurring revenue with expansion (more rigs, more labs) |
| Sales | Founder-led; a security-review playbook that worked once | A motion that works without the founders in every deal |
| Team | Founder-market fit, a clear software and ML lead | Key hires in place (engineering lead, first sellers) |

Do not fill the left column with hopes. Every cell is either evidence you have or a milestone in the plan.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Round sizes and ARR thresholds are indicative",
          md: md`Investors often quote rules of thumb for US enterprise software (for example a Series A after roughly USD 1 to 2m of ARR with strong growth). These shift with the funding cycle and differ by fund; treat them as indicative and check with recent comparables and your own investor conversations. Founder Core gives indicative US and European round sizes.`,
        },
        { kind: "xref", to: "fc07-l02", note: "Founder Core: indicative round sizes, valuations and dilution by stage and region." },
      ],
    },
    {
      layer: "field",
      title: "Preparing for the interview and the batch",
      blocks: [
        {
          kind: "md",
          md: md`### How it runs in practice

- **Interview:** short and fast. Partners interrupt; the founders who do best answer in one or two sentences with a number or mechanism, then stop. Decide in advance who answers what: you on market, customers and plan; Ismail and Yusuf on the bench, the data and the product.
- **Demo or no demo:** a 60-second Ripple walk-through (a change comes in, the rerun list comes out with reasons) beats slides. Use real bench data only if you have the right to show it; otherwise a synthetic rig.
- **Between interview and decision:** keep working; update YC by email only if something material happens (a signed pilot, a key hire).
- **If accepted:** structure first (Delaware parent), founder vesting reset if asked, then the batch: weekly progress, customer calls from San Francisco, and the Demo Day raise.
- **If not accepted:** the feedback is the asset. Apply to a later batch if the gaps are closable, and keep the European seed path open (Lesson 4).`,
        },
        {
          kind: "ask",
          title: "Questions to rehearse as a team",
          items: [
            "What do you do, in one sentence a non-engineer understands?",
            "Who is the user and who pays, and what did the last test lead you spoke to say?",
            "What is the one metric that shows Ripple works, and what is it today?",
            "Why now, and what happens to your plan if the Machinery Regulation obligations slip?",
            "Who on the team writes the code and trains the models?",
            "Are all three founders full-time, and if not, when?",
            "Why won't Nominal, Sift or NI build this?",
            "How big can this get, bottom-up?",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Inflated traction:** counting interested contacts as customers or LOIs as revenue. Partners check, and it ends trust instantly.
- **Calling it test automation** or an AI copilot for engineers: it puts you in a crowded, old category.
- **Long answers:** three-minute answers to a ten-minute interview.
- **Hedging on commitment:** "we'll go full-time if we raise" reads as not committed.
- **Leading with hardware platforms:** step 4 of the vision is a later option, not the pitch; leading with it raises capital-intensity alarms.`,
        },
        { kind: "scenario", scenario: "aw14-s1" },
        {
          kind: "question",
          question: {
            id: "aw14-l03-p1",
            type: "short",
            prompt: md`Write Afterwave's **YC interview answer sheet**: two-sentence answers to (1) what do you do, (2) why now, (3) why won't Nominal build this, (4) who writes the code, (5) how many customers do you have, (6) how big can this get. Use only facts from the venture context and the research brief; mark anything you do not have yet as a placeholder with the milestone that will fill it.`,
            rubric: [
              "Answer (1) frames Afterwave as change-impact selection for physical test benches, not generic test automation, in plain words",
              "Answer (2) uses dated mechanisms: Machinery Regulation from 20 January 2027 and physical AI change frequency, without overstating legal obligations",
              "Answer (3) gives a wedge (one-clock capture, change graph, on-prem Enclave) and a non-hostile stance to existing data platforms",
              "Answer (4) and (5) are honest, with placeholders instead of invented customers or numbers",
              "Answer (6) is bottom-up (organisations x ACV) with an expansion path, labelled illustrative",
              "Each answer is two sentences or fewer",
            ],
            modelAnswer: md`1. **What:** After any firmware, model or rig change, Afterwave tells hardware test teams which tests to rerun and why. We capture rig signals and on-screen actions on one clock (Lockstep) and run the change-impact engine (Ripple) inside the customer's own environment (Enclave).
2. **Why now:** Physical AI teams change models and firmware weekly, but rig time does not scale. And from 20 January 2027 the EU Machinery Regulation applies, with third-party assessment for ML-based safety components, so test evidence and traceability become a compliance cost.
3. **Nominal:** Data platforms store and visualise test data; none we found decides what a change invalidates across rig, firmware and model. We integrate with their stores and own the change graph.
4. **Code:** [Name the person or team building Lockstep, Enclave and Ripple, and the first engineering hire planned.] Ismail and Yusuf define what the bench needs from Tesla drive unit, inverter and reliability testing.
5. **Customers:** [Exact current state, for example number of discovery calls and design-partner discussions, only if real.] By Demo Day: [target, for example two paid pilots measuring rerun hours against the lab's baseline].
6. **Size:** Bottom-up, illustrative: about 2,500 reachable test organisations in the US and EU at about EUR 200k ACV is EUR 500m a year. It grows with rigs per lab, labs per OEM, agents that run retests overnight, and later instrumented platforms and safety evidence.`,
            explanation: md`A good answer sheet is short, uses mechanisms and dates, and refuses to invent traction.`,
            concepts: ["aw14.investor-probes", "aw14.stage-evidence"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw14-l03-q1",
      type: "numeric",
      prompt: md`What is the implied post-money valuation of YC's USD 125k for 7 % (USD m, 2 decimals)?`,
      answer: 1.79,
      tolerance: { abs: 0.01 },
      unit: "USD m",
      explanation: md`$0.125/0.07 = 1.786$ USD m.`,
      concepts: ["aw14.yc-deal-conversion"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw14-l03-q2",
      type: "numeric",
      prompt: md`After the YC deal, Afterwave raises post-money SAFEs at a USD 25m cap. What is YC's total stake (%)?`,
      answer: 8.5,
      tolerance: { abs: 0.05 },
      unit: "%",
      explanation: md`$7\% + 375/25{,}000 = 7\% + 1.5\% = 8.5\%$.`,
      concepts: ["aw14.yc-deal-conversion"],
      difficulty: 2,
    },
    {
      id: "aw14-l03-q3",
      type: "mcq",
      prompt: "According to the research brief, what was the status of the W27 on-time deadline on 6 November 2026?",
      options: [
        "Still open until mid-December",
        "Passed on 2 November 2026; late applications still considered without a guaranteed timeline",
        "Moved to January 2027",
        "W27 was cancelled",
      ],
      answer: 1,
      explanation: md`The on-time deadline was 2 November 2026 at 8 pm PT. Decisions for on-time applicants were reported for about 11 December 2026.`,
      concepts: ["aw14.yc-timeline"],
      difficulty: 1,
    },
    {
      id: "aw14-l03-q4",
      type: "multi",
      prompt: "Which incorporation jurisdictions did YC reportedly accept after January 2026? (Select all.)",
      options: ["US (Delaware)", "Cayman Islands", "Singapore", "Netherlands (BV)", "Switzerland (AG)"],
      answer: [0, 1, 2],
      explanation: md`Canada was reportedly dropped in January 2026 (reversal unverified). A Dutch BV or Swiss AG can exist as a subsidiary under an eligible parent.`,
      concepts: ["aw14.yc-timeline"],
      difficulty: 1,
    },
    {
      id: "aw14-l03-q5",
      type: "order",
      prompt: "Order what happens if Afterwave is accepted into W27.",
      items: [
        "Decision and offer",
        "Set up an eligible parent (for example Delaware) and confirm full-time founders",
        "Sign the YC SAFEs",
        "Batch in San Francisco with weekly progress",
        "Demo Day and the seed raise",
      ],
      explanation: md`Structure before money: the SAFEs are signed by the eligible parent.`,
      concepts: ["aw14.yc-timeline"],
      difficulty: 2,
    },
    {
      id: "aw14-l03-q6",
      type: "decision",
      prompt: md`In the interview a partner asks: "Are all three of you full-time?" One cofounder is still employed. What do you say?`,
      options: [
        { text: "\"Yes.\"", score: 0, feedback: "If untrue, it is misrepresentation and will surface." },
        { text: "State the facts and the date: who is full-time now, when the third founder resigns (for example on acceptance), and that it is agreed and written down.", score: 1, feedback: "Honest, specific and committed: what partners look for." },
        { text: "\"We'll decide after we raise.\"", score: 0.2, feedback: "Reads as conditional commitment, a classic reason to say no." },
      ],
      explanation: md`Commitment is one of the most common probes; a date and a written agreement answer it.`,
      concepts: ["aw14.investor-probes"],
      difficulty: 2,
    },
    {
      id: "aw14-l03-q7",
      type: "mcq",
      prompt: "Which is seed-stage evidence rather than Series A evidence for Afterwave?",
      options: [
        "Recurring revenue from several customers with expansion",
        "A paid pilot that measured rerun reduction against the lab's own baseline",
        "A sales motion that works without the founders",
        "An engineering lead and first sellers hired",
      ],
      answer: 1,
      explanation: md`A measured paid pilot is the classic seed proof; the others are what a Series A asks for.`,
      concepts: ["aw14.stage-evidence"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw14-l03-f1", front: "YC standard deal (reported 2026)", back: "USD 125k for 7 % (post-money SAFE, implied USD 1.79m) + USD 375k uncapped MFN SAFE; pro rata rights.", concepts: ["aw14.yc-deal-conversion"] },
    { id: "aw14-l03-f2", front: "YC stake after next SAFE at cap C", back: "$7\\% + 375\\text{k}/C$ (before later dilution).", concepts: ["aw14.yc-deal-conversion"] },
    { id: "aw14-l03-f3", front: "W27 key dates", back: "Deadline 2 Nov 2026 (passed); decisions about 11 Dec 2026; batch about Jan to Mar 2027 in SF (secondary sources).", concepts: ["aw14.yc-timeline"] },
    { id: "aw14-l03-f4", front: "Three things acceptance forces", back: "Full-time founders, presence in SF for the batch, eligible parent (Delaware, Cayman or Singapore) before the SAFEs.", concepts: ["aw14.yc-timeline"] },
    { id: "aw14-l03-f5", front: "Afterwave's one-line reframe", back: "Not test automation: selection. Which tests a firmware, model or rig change invalidates, and why.", concepts: ["aw14.investor-probes"] },
    { id: "aw14-l03-f6", front: "Seed vs Series A evidence", back: "Seed: design partners, measured paid pilots, founder-market fit. A: recurring revenue, expansion, a motion beyond the founders.", concepts: ["aw14.stage-evidence"] },
  ],
};

export default lesson;
