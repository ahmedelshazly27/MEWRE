import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw14-l05",
  title: "The fundraising story for Afterwave: narrative, why now, risks and a milestone plan",
  summary:
    "Afterwave's investor narrative built as an argument: the problem, the selection insight, why now (EU Machinery Regulation from 20 January 2027, the AI Act omnibus timeline, physical AI change frequency, category capital), the product sequence, the risks investors will probe and the evidence that retires each, and an illustrative seed milestone plan that sizes the round.",
  minutes: 80,
  objectives: [
    "Tell Afterwave's story as a chain of claims, each with a mechanism or a dated fact",
    "State the why-now precisely, including what the Machinery Regulation and the AI Act omnibus do and do not require, and what is unverified",
    "List the top risks investors will probe and the evidence and milestone that retire each",
    "Size a seed round from a milestone plan, burn and buffer, and compute the dilution it implies",
  ],
  concepts: [
    { id: "aw14.narrative-chain", name: "Afterwave narrative chain", description: "Problem (reruns after every change), insight (selection, not execution, needs one clock and a change graph), why now, product sequence, evidence, market, model, team, ask; each link a claim with a mechanism.", competency: "aw-business", related: ["fc07.pitch-narrative", "fc07.insight"] },
    { id: "aw14.regulatory-why-now", name: "Regulatory why-now, stated precisely", description: "Machinery Regulation (EU) 2023/1230 applies from 20 January 2027 with notified-body assessment for ML-based safety components; AI Act requirements reach machinery later through Machinery Regulation delegated acts after the 2026 omnibus.", competency: "aw-business", related: ["fc07.why-now"] },
    { id: "aw14.risk-retirement", name: "Risk retirement plan", description: "Each major investor risk (market, wedge, deployment friction, team, regulation dependence, capital intensity) mapped to the evidence that retires it and the milestone and date by which it will exist.", competency: "aw-business", related: ["aw14.investor-probes"] },
    { id: "aw14.milestone-round-size", name: "Round sized from milestones", description: "Raise = cumulative burn to the next round's milestones plus a buffer (about 6 months); dilution = raise / post-money.", competency: "aw-business", related: ["fc07.round-sizing"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The story as an argument",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`As CEO you will tell Afterwave's story hundreds of times: to YC partners, seed funds, angels, design partners and recruits. It has to survive an engineer who knows test benches and an investor who has just read about Nominal's USD 1bn valuation. Founder Core taught deck structure and why-now in general; here you build Afterwave's specific narrative, stated precisely enough that nothing in it is wrong, and a plan that turns its risks into dated milestones.`,
        },
        { kind: "xref", to: "fc07-l04", note: "Founder Core: the pitch as a chain of questions, the 12-slide Afterwave deck skeleton and bottom-up market sizing. This lesson fills it with the venture-specific argument." },
        {
          kind: "flow",
          title: "Afterwave's narrative chain",
          steps: [
            { label: "Problem", detail: "Every firmware, model or rig change forces reruns; test teams guess what to rerun or rerun everything, and rig time is scarce" },
            { label: "Insight", detail: "The bottleneck is selection, not execution; selecting needs rig signals and operator actions on one clock and a graph of what depends on what" },
            { label: "Why now", detail: "Physical AI changes models weekly; Machinery Regulation from 20 Jan 2027; capital is flowing into hardware test data" },
            { label: "Product, in order", detail: "Lockstep + Ripple, then Enclave models and agents, then agent-run overnight retests with approval, later instrumented platforms" },
            { label: "Evidence", detail: "Only what exists: design partners, pilots, measured rerun reduction (placeholder until real)" },
            { label: "Market and model", detail: "Bottom-up test organisations x ACV; per-rig pricing; expansion inside accounts" },
            { label: "Team and ask", detail: "Ex-Tesla drive unit validation and inverter test and reliability, GTM CEO; round size from milestones" },
          ],
          caption: "Each box is a claim an investor can test. If a box has no evidence yet, say so and put it in the milestone plan.",
        },
        {
          kind: "md",
          md: md`### Why now, stated so that it is true

**1. Physical AI change frequency.** Robotics, humanoid and autonomous-machine teams retrain models and update firmware far more often than classical machinery teams changed control code, while each rig still runs one test at a time. Selection matters more each release.

**2. Regulation with a date.**

- The **EU Machinery Regulation (EU) 2023/1230 applies from 20 January 2027**. No general postponement was found as of November 2026.
- **Annex I Part A** requires third-party (notified-body) conformity assessment for safety components with fully or partially **self-evolving behaviour using machine learning**, and for machinery embedding them. Self-certification (internal control) is not allowed for these categories.
- Essential requirements on **control-system safety and reliability**, including self-evolving behaviour and **logging**, and on protection against corruption.
- No harmonised standard yet covers AI or self-evolving safety functions, so these categories go to notified bodies.
- The **AI Act Digital Omnibus (Regulation (EU) 2026/1744, in force 27 July 2026)** moved the Machinery Regulation to **Section B** of the AI Act's Annex I. AI Act high-risk requirements do not apply directly to AI in machinery; they arrive later through **delegated acts amending the Machinery Regulation**, with timing tied to **2 August 2028**.

What this does for Afterwave: test evidence, traceability and logs become part of a conformity file that a third party reviews, at least for ML-based safety functions. That turns "which tests did you rerun after that model change, and why?" from an engineering preference into a question an assessor can ask.

**3. Category capital.** Investors are funding hardware test data: Nominal (USD 80m at a USD 1bn valuation, March 2026), Sift (USD 42m Series B, March 2026), Foxglove (USD 40m Series B, November 2025), Rerun (USD 17m seed, March 2025). In the course research no vendor offered change-impact test selection for physical benches as a core feature; the closest analogues are code-level change-based testing and requirements tools' suspect links.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Do not overstate the regulation",
          md: md`- The Annex III wording was read from secondary summaries, not the Official Journal text.
- Industry asked to postpone the cyber provisions (and earlier the AI-related ones, reportedly dropped from the request in February 2026); **the outcome is unverified**.
- A reported narrowing of "safety component" in the AI Act (excluding quality control and performance optimisation) is from a single source.
- Humanoid funding totals differ widely between trackers; do not quote one as fact.
- Never claim the regulation **requires** Afterwave's product. Say it raises the cost of weak test evidence and that the value (rig hours, escaped defects) exists without it.`,
        },
        { kind: "sources", refs: ["aw14-r4", "aw14-r5", "aw14-r11", "aw14-r12", "aw14-r13"] },
        {
          kind: "md",
          md: md`### The risks investors will probe, and what retires each

| Risk | The question you will hear | Evidence that retires it | By when (plan) |
|---|---|---|---|
| **Market** | Do test teams pay for selection, or only for storage? | Paid pilots converting at a per-rig price; measured rerun reduction | Seed milestone |
| **Wedge** | Why won't Nominal, Sift or NI add this? | Ripple accuracy on real change histories; integrations with their stores; customers who already use them and still buy | Seed milestone |
| **Deployment friction** | On-prem and security reviews take months | Time from signature to first Ripple list; a reusable security package | Seed milestone |
| **Team** | Who builds the software and models? Are all founders full-time? | Named engineering lead; founders full-time on a date | Before or at the raise |
| **Regulation dependence** | What if obligations slip? | Buyers citing rig hours and defects, not only compliance | Ongoing |
| **Capital intensity** | Are you becoming a hardware company? | Platforms gated by a go/no-go memo with economics; software margin shown separately | Series A or later |
| **Scale** | How is this venture scale? | Expansion inside accounts (rigs, labs), bottom-up SAM | Series A |`,
        },
        {
          kind: "widget",
          widget: "risk-matrix",
          caption: "Place the seven risks above on a probability-impact grid for Afterwave today. The top-right ones must be retired by the seed milestones; the rest go in the Series A story.",
        },
        { kind: "equation", formula: "aw14-round-size" },
      ],
    },
    {
      layer: "applied",
      title: "An illustrative milestone plan and round size",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Sizing Afterwave's seed from milestones (illustrative)",
          given: md`Illustrative plan, not a forecast. Milestones for a Series A in about 18 months: **several paying customers on annual per-rig contracts**, measured rerun reduction at each, expansion in at least one account, an engineering lead and first seller hired. Burn ramps with hiring: **EUR 90k/month** in months 1 to 6, **EUR 140k** in months 7 to 12, **EUR 180k** in months 13 to 18. Buffer: **6 months** at the last burn rate. Seed post-money (illustrative): **EUR 15m**.`,
          steps: [
            { md: md`**Burn to milestone:** $6\times90 + 6\times140 + 6\times180 = 540 + 840 + 1{,}080 =$ EUR 2.46m.` },
            { md: md`**Buffer:** $6\times180 =$ EUR 1.08m.` },
            { md: md`**Raise:** $2.46 + 1.08 =$ **EUR 3.54m**, round to EUR 3.5m.` },
            { md: md`**Dilution:** $d = 3.5/15 = 23.3\%$. If YC money is already in (USD 500k), subtract it from the need rather than adding it on top.` },
            { md: md`**Check against the risks:** months 1 to 6 retire deployment friction (first on-prem deployment, security package); months 7 to 12 retire market and wedge (paid pilots converting, Ripple measured); months 13 to 18 build the Series A case (expansion, repeatable sale).` },
          ],
          result: md`The ask becomes "EUR 3.5m for 24 months of runway, to reach these milestones by month 18", which an investor can test. The same plan tells you what happens if the raise is smaller: cut the month 13 to 18 hiring and move the Series A milestones out.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative cash after the seed",
          xKey: "month",
          xLabel: "Month after close",
          yLabel: "Cash (EUR m)",
          series: [{ key: "cash", label: "Cash remaining" }],
          data: [
            { month: 0, cash: 3.54 },
            { month: 6, cash: 3.0 },
            { month: 12, cash: 2.16 },
            { month: 18, cash: 1.08 },
            { month: 24, cash: 0 },
          ],
          caption: "Start the Series A process around month 12 to 15, with at least 9 to 12 months of cash left, not at month 20.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A smaller round",
          given: md`Illustrative. Only **EUR 2.5m** is available. You keep months 1 to 12 as planned and want a 6-month buffer at EUR 140k/month.`,
          steps: [
            { md: md`Months 1 to 12 cost $540 + 840 =$ EUR 1.38m; buffer $6\times140 = 0.84$ m; total EUR 2.22m.` },
            { md: md`Cash left for months 13 onwards at EUR 140k/month: $2.5 - 2.22 = 0.28$ m, which is about **2 months**.`, hidden: true, check: { prompt: "Months of extra runway at EUR 140k/month", answer: 2, unit: "months", tolerance: { abs: 0.1 } } },
            { md: md`Dilution at the same EUR 15m post-money: $2.5/15$ = **16.7 %**.`, hidden: true, check: { prompt: "Dilution (%)", answer: 16.7, unit: "%", tolerance: { abs: 0.1 } } },
          ],
          result: md`With EUR 2.5m the plan reaches the market and wedge milestones but not the Series A case at month 18. The honest pitch then is a smaller seed to a defined inflection, with a second seed or a bridge in the plan.`,
        },
        {
          kind: "question",
          question: {
            id: "aw14-l05-p1",
            type: "mcq",
            prompt: "Which why-now sentence is accurate for an investor deck in November 2026?",
            options: [
              "\"From 2027 the AI Act requires every robot maker to buy change-impact testing.\"",
              "\"From 20 January 2027 the EU Machinery Regulation applies, with notified-body assessment for ML-based safety components; AI Act requirements reach machinery later through delegated acts. Test evidence becomes part of what a third party reviews.\"",
              "\"The Machinery Regulation was postponed to 2028.\"",
              "\"Harmonised standards for AI safety functions are already published.\"",
            ],
            answer: 1,
            explanation: md`It states what the regulation does with dates and does not claim that it mandates Afterwave's product. No general postponement was found, and no harmonised standard yet covers AI safety functions.`,
            concepts: ["aw14.regulatory-why-now"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Telling it in the room",
      blocks: [
        {
          kind: "md",
          md: md`### How the story is used in practice

- **Two-minute version** for YC and first calls: problem, insight, why now, what exists, ask. Practise until each founder can give it.
- **Deck** (12 slides, Founder Core skeleton) sent ahead; **data room** with pilot reports and the security package only after real interest.
- **Technical deep dive** for investors with hardware partners: Ismail and Yusuf walk through a real or synthetic change: a firmware update to an inverter, the Ripple list, the tests it skipped and why.
- **Reference calls:** design partners who will speak to investors are worth more than any slide. Ask them only once you have delivered something.
- **Investor updates** monthly from the first cheque, with the milestone plan as the scoreboard.`,
        },
        { kind: "sources", refs: ["aw14-r16"] },
        { kind: "xref", to: "fc07-l06", note: "Founder Core: running the round (warm intros, pipeline, momentum, closing)." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Regulation as the whole story:** if the buyer's only reason is compliance, a slipped delegated act or a narrower definition kills the deal.
- **Vision in the wrong order:** leading with agents running rigs overnight or with hardware platforms before Lockstep and Ripple have users.
- **Competitor bashing:** Nominal and Sift validate the category; position Afterwave as the selection layer that integrates with them.
- **A round size with no plan behind it:** "we're raising EUR 3m because that's what seeds are".
- **Invented traction:** placeholder slides are fine; inflated ones are fatal.`,
        },
        {
          kind: "question",
          question: {
            id: "aw14-l05-p2",
            type: "short",
            prompt: md`Write Afterwave's **seed narrative and milestone plan**: (1) a two-minute spoken narrative (about 250 words) following the chain problem, insight, why now, product sequence, evidence, market, team, ask; (2) a table of the five risks you think investors will push hardest on, with the evidence and the dated milestone that retires each; (3) the round size computed from an illustrative burn plan with a buffer, and the implied dilution at a stated illustrative post-money.`,
            rubric: [
              "Narrative follows the chain and frames Afterwave as change-impact selection for physical test benches, with the product sequence in the right order",
              "Why-now is accurate: Machinery Regulation from 20 January 2027 with notified-body assessment for ML safety components, AI Act requirements later via delegated acts, no claim that regulation mandates the product",
              "Evidence section uses placeholders or real facts only, no invented customers or numbers",
              "Five risks each mapped to specific evidence and a dated milestone",
              "Round size computed from burn by period plus a buffer, with dilution at a labelled post-money, arithmetic correct",
              "Uses the team's real backgrounds and addresses who builds the software",
            ],
            modelAnswer: md`**(1) Narrative.** Every time a robotics, drives or battery team changes firmware, a model or a rig, they face the same question: what do we have to retest? Today they guess, or rerun everything, and rig time is the scarcest thing in the lab. We think the bottleneck is selection, not execution, and you can only select well if you capture rig signals and what the operator did on one clock and keep a graph of what depends on what. That is Afterwave: Lockstep captures, Ripple tells the team which tests a change invalidates and why, and it all runs in Enclave, on the customer's own servers. Next, teams train local models on their bench memory and hand that context to their own agents; later, agents plan and run retests overnight with human approval. Why now: physical AI changes weekly; from 20 January 2027 the EU Machinery Regulation requires third-party assessment for ML-based safety components, so test evidence gets reviewed; and investors are funding hardware test data. Today we have [real state of design-partner conversations and pilots]. We are Ismail Elmasry and Yusuf Keklik, who ran drive unit validation and inverter test and reliability at Tesla, and me on go-to-market; [engineering lead]. We are raising EUR 3.5m for 24 months to reach paying per-rig customers and a Series A.

**(2) Risks.**

| Risk | Evidence | Milestone (illustrative) |
|---|---|---|
| Teams will not pay for selection | Two paid pilots converting to annual per-rig contracts | Month 12 |
| Incumbents add it | Ripple precision and recall on real change histories, integration with an existing data store | Month 9 |
| On-prem friction | First Ripple list within 6 weeks of signature; reusable security package | Month 6 |
| Software team | Engineering lead hired; founders full-time | Close |
| Regulation dependence | Pilot buyers' business cases based on rig hours and defects | Month 12 |

**(3) Round size.** Burn $6\times90 + 6\times140 + 6\times180 = 2.46$ EUR m plus a buffer of $6\times180 = 1.08$, so EUR 3.54m, rounded to 3.5m. At an illustrative EUR 15m post-money, $d = 23.3\%$.`,
            explanation: md`A strong answer is true sentence by sentence, keeps the vision in order, and turns every risk into a dated milestone that sizes the round.`,
            concepts: ["aw14.narrative-chain", "aw14.regulatory-why-now", "aw14.risk-retirement", "aw14.milestone-round-size"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a non-technical angel investor, in under two minutes, why Afterwave matters now and not five years ago.",
          keyPoints: [
            "Physical AI teams change models and firmware far more often, while rig time stays physical and scarce",
            "The hard part is choosing which tests to rerun after a change, not running tests",
            "The EU Machinery Regulation applies from 20 January 2027, with third-party assessment for ML-based safety components",
            "AI Act requirements reach machinery later, through Machinery Regulation delegated acts",
            "Investors are already funding hardware test data platforms, but none was found doing change-impact selection for benches",
            "The value (rig hours, escaped defects) exists even without the regulation",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw14-l05-q1",
      type: "mcq",
      prompt: "What is Afterwave's core insight in the narrative?",
      options: [
        "Test data should be stored in the cloud",
        "The bottleneck is selecting what to retest after a change, which needs one-clock capture and a dependency graph",
        "Test benches should be replaced by simulation",
        "AI should write test scripts",
      ],
      answer: 1,
      explanation: md`Selection, not execution: that is the claim the rest of the story rests on.`,
      concepts: ["aw14.narrative-chain"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw14-l05-q2",
      type: "multi",
      prompt: "Which statements about the regulatory why-now are accurate as of November 2026? (Select all.)",
      options: [
        "The Machinery Regulation applies from 20 January 2027",
        "ML-based safety components with self-evolving behaviour need notified-body assessment under Annex I Part A",
        "The AI Act's high-risk requirements apply directly to AI in machinery from August 2026",
        "After the 2026 omnibus, AI Act requirements reach machinery through delegated acts amending the Machinery Regulation",
        "Harmonised standards for AI safety functions under the Machinery Regulation are published",
      ],
      answer: [0, 1, 3],
      explanation: md`The omnibus moved machinery to Section B of the AI Act's Annex I, so requirements come via Machinery Regulation delegated acts (timing tied to 2 August 2028). No harmonised standard yet covers AI safety functions.`,
      concepts: ["aw14.regulatory-why-now"],
      difficulty: 2,
    },
    {
      id: "aw14-l05-q3",
      type: "numeric",
      prompt: md`Illustrative: burn to milestone EUR 2.0m, buffer 6 months at EUR 150k. Round size (EUR m)?`,
      answer: 2.9,
      tolerance: { abs: 0.01 },
      unit: "EUR m",
      explanation: md`$2.0 + 6\times0.15 = 2.9$ EUR m.`,
      concepts: ["aw14.milestone-round-size"],
      difficulty: 1,
    },
    {
      id: "aw14-l05-q4",
      type: "numeric",
      prompt: md`That EUR 2.9m round is raised at a EUR 12m post-money. Dilution (%)?`,
      answer: 24.2,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$2.9/12 = 24.2\%$.`,
      concepts: ["aw14.milestone-round-size"],
      difficulty: 1,
    },
    {
      id: "aw14-l05-q5",
      type: "order",
      prompt: "Order Afterwave's product vision as it should be told.",
      items: [
        "Capture layer (Lockstep) and Ripple change impact",
        "Teams train local models and hand context to their own agents inside Enclave",
        "Agents plan retests and run rigs overnight with human approval, and write reports",
        "Afterwave's own instrumented test platforms",
      ],
      explanation: md`This is the order in the venture context. Leading with later steps raises capital-intensity and credibility questions before the wedge is proven.`,
      concepts: ["aw14.narrative-chain"],
      difficulty: 1,
    },
    {
      id: "aw14-l05-q6",
      type: "decision",
      prompt: md`An investor says: "If the Machinery Regulation's AI provisions get delayed, your business disappears." How do you respond?`,
      options: [
        { text: "\"They won't be delayed.\"", score: 0.1, feedback: "Unknowable, and parts of the timeline already moved through the omnibus." },
        { text: "Agree that regulation is a timing accelerant, then show that the core value is rig hours and escaped defects, measured in pilots, and that buyers' business cases rest on those.", score: 1, feedback: "Decouples the company from one legal date and points to evidence." },
        { text: "Pivot the pitch to insurance and safety evidence.", score: 0.3, feedback: "That is the long-term vision, not an answer to a near-term demand question." },
      ],
      explanation: md`Never let one regulation be the only reason to buy.`,
      concepts: ["aw14.risk-retirement", "aw14.regulatory-why-now"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw14-l05-f1", front: "Afterwave in one line", back: "After any firmware, model or rig change, tells test teams which tests to rerun and why, from one-clock bench data, on their own servers.", concepts: ["aw14.narrative-chain"] },
    { id: "aw14-l05-f2", front: "Machinery Regulation dates", back: "Applies 20 Jan 2027; Annex I Part A ML safety components need notified-body assessment; AI Act requirements via delegated acts, timing tied to 2 Aug 2028.", concepts: ["aw14.regulatory-why-now"] },
    { id: "aw14-l05-f3", front: "AI Act omnibus and machinery", back: "Reg. (EU) 2026/1744, in force 27 Jul 2026: Machinery Regulation moved to Section B of the AI Act Annex I.", concepts: ["aw14.regulatory-why-now"] },
    { id: "aw14-l05-f4", front: "Round size from milestones", back: "$R = \\sum B_t + B_{last} T_b$: burn to milestones plus about 6 months buffer; dilution R / post-money.", concepts: ["aw14.milestone-round-size"] },
    { id: "aw14-l05-f5", front: "Top seed risks for Afterwave", back: "Market (pay for selection?), wedge (incumbents), on-prem friction, software team and commitment, regulation dependence.", concepts: ["aw14.risk-retirement"] },
    { id: "aw14-l05-f6", front: "Category capital to cite", back: "Nominal USD 80m at USD 1bn (Mar 2026), Sift USD 42m B (Mar 2026), Foxglove USD 40m B (Nov 2025), Rerun USD 17m seed (Mar 2025).", concepts: ["aw14.regulatory-why-now", "aw14.narrative-chain"] },
  ],
};

export default lesson;
