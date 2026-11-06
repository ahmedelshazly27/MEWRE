import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw13-l02",
  title: "Nominal and Sift up close",
  summary:
    "The two best-funded hardware test data companies, read carefully: what each product does, how each positions itself, funding and contracts as reported, where they are heading (bench edge apps, agents), and exactly where they overlap with Lockstep and Enclave and where they leave a gap for capture on one clock and change impact. Includes a worked model of how the frame of reference decides who wins the evaluation.",
  minutes: 75,
  objectives: [
    "Describe Nominal's and Sift's products, positioning, named customers and reported funding, each with a date and a status",
    "State precisely where each overlaps Lockstep, Enclave and Ripple and where it does not, as advertised in November 2026",
    "Use a weighted evaluation model to show how the buyer's frame of reference changes the winner",
    "Predict how each company could move into change impact and decide whether to compete, coexist or integrate",
  ],
  concepts: [
    { id: "aw13.nominal-profile", name: "Nominal profile", description: "Continuous test stack for physical systems: Core data platform (cloud, private or on-prem) plus Connect, an edge app at the bench; defence-first (Anduril, Shield AI), pushing into automotive and robotics; Series B-2 at a reported USD 1 bn valuation (Mar 2026).", competency: "aw-business", related: ["aw13.landscape-layers"] },
    { id: "aw13.sift-profile", name: "Sift profile", description: "Observability layer for hardware telemetry from test, flight and production, with rules, alerts and review, on SaaS, hybrid, on-prem and GovCloud; space-heavy customer list; Sift Agents research preview (Sep 2026).", competency: "aw-business", related: ["aw13.landscape-layers"] },
    { id: "aw13.overlap-gap", name: "Overlap and gap analysis", description: "Per product and per job, what a competitor demonstrably does (overlap), what it does not advertise (gap) and what it could plausibly build next (threat), each tied to a dated source.", competency: "aw-business", related: ["aw13.relationship-types", "aw13.claim-ledger"] },
    { id: "aw13.frame-scoring", name: "Frame-dependent evaluation", description: "A buyer's score is a weighted sum of criteria; the category frame sets the weights, so the same two products swap rank when the frame changes from 'test data platform' to 'change impact for hardware test'.", competency: "aw-business", related: ["fc03.market-category"] },
    { id: "aw13.coexist-play", name: "Coexist play", description: "Positioning a narrower product to sit beside a well-funded platform the customer may already own, reading its outputs or exports, so the buyer does not have to choose between you.", competency: "aw-business", related: ["aw13.overlap-gap"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What Nominal and Sift are, and where they are going",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Nominal and Sift are the names every investor and many prospects will raise first, because they have taught the market that hardware test data deserves modern software. That helps you (budget lines now exist) and threatens you (they have far more money and may decide your job is their next feature). You must be able to describe both accurately, with dates, without sounding defensive, and to explain in one sentence why Ripple is not a smaller version of either.`,
        },
        {
          kind: "md",
          md: md`### Nominal (nominal.io)

**Positioning:** "the continuous test stack for physical systems". The word *stack* matters: they want to own the whole path from bench to analysis.

- **Core:** the data platform. Deploys in a secure cloud, in private environments or on-prem.
- **Connect:** an edge app at the bench. Reads and writes instruments in real time, runs Python test apps, sequences tests, works in air-gapped facilities and syncs to Core later.
- **Customers named publicly:** Anduril (a common test data platform across autonomous vehicle programmes), Shield AI. Defence-first, pushing into automotive and robotics.
- **Acquisition:** Fid Labs, which connects AI agents to robotics development environments and simulators (date unverified).
- **Funding (as reported):** USD 75 m Series B led by Sequoia (Jun 2025); USD 80 m Series B-2 "acceleration round" led by Founders Fund at a USD 1 bn valuation, with Sequoia, Lux, General Catalyst, Lightspeed and Red Glass (5 Mar 2026).
- **Contracts (as reported):** USD 53 m sole-source IDIQ from the Air Force Test Center (14 Apr 2026); AFWERX STRATFI selection (26 Oct 2026, amount unverified).
- **Change impact or test selection:** not found in any source.

### Sift (siftstack.com)

**Positioning:** "the observability layer for hardware". *Observability* is a software-infrastructure word (logs, metrics, alerts) applied to telemetry.

- **Product:** ingests telemetry from test, flight and production; rules and alerts; review workflows. SaaS, hybrid, fully on-prem for classified work, and GovCloud.
- **Agents:** Sift Agents research preview (late Sep 2026): agents investigate telemetry inside the customer's Sift environment and turn findings into reusable rules, with human approval before changes. A Sift MCP server also exists.
- **Customers named:** K2 Space, Astranis, Impulse Space, ULA, Parallel Systems, Plantd. About 70 staff, planning to double.
- **Funding (as reported):** USD 42 m Series B led by StepStone (Mar 2026; Tracxn gives 25 Mar 2026, PitchBook a conflicting Jul 2025 date); GV the largest investor; total USD 67 m.
- **Change impact or test selection:** not found.

### Side by side, against Afterwave's three products

| Job | Nominal | Sift | Afterwave |
|---|---|---|---|
| Capture at the bench | **Yes**: Connect reads instruments, runs tests | Ingests telemetry; bench edge capture not the lead message | **Lockstep**: DAQ signals and on-screen actions on one clock |
| Sequence tests | Yes (Connect) | No | No (complements TestStand and others) |
| Store, plot, search | Yes (Core) | Yes | Bench memory, as input to Ripple |
| Rules, alerts, review | Some | **Yes**, core | Not the focus |
| Private deployment | Cloud, private, on-prem, air-gapped | SaaS, hybrid, on-prem, GovCloud | **Enclave**: customer servers or isolated tenant |
| Agents on the data | Fid Labs acquisition (agents to dev environments) | Sift Agents preview (Sep 2026) | Planned: local models and customer agents inside Enclave |
| Which tests to rerun after a change, and why | Not advertised | Not found | **Ripple**: the core product |
| Lead segments | Defence, aerospace, autonomy | Space, aerospace | Drives and motors, robotics, humanoids, batteries, powertrains |`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Recent rounds in the adjacent landscape, as reported (USD m)",
          xKey: "round",
          xLabel: "Company, round, date",
          yLabel: "USD m",
          series: [{ key: "usd", label: "Round size, as reported (USD m)" }],
          data: [
            { round: "Rerun seed, Mar 2025", usd: 17 },
            { round: "Nominal B, Jun 2025", usd: 75 },
            { round: "Foxglove B, Nov 2025", usd: 40 },
            { round: "Nominal B-2, Mar 2026", usd: 80 },
            { round: "Sift B, Mar 2026", usd: 42 },
          ],
          caption: "Figures from press releases and databases summarised in the research brief (6 Nov 2026); recheck on primary sources before external use. Applied Intuition's USD 600 m Series F (Jun 2025) is left off because it would flatten the scale; it competes for a different budget.",
        },
        {
          kind: "md",
          md: md`### Why the frame decides the evaluation

A technical evaluator scores vendors roughly as a weighted sum:`,
        },
        { kind: "equation", formula: "aw13-frame-score" },
        {
          kind: "md",
          md: md`The weights $\omega_k$ come from what the buyer thinks he is buying. If he thinks "test data platform", ingest, scale and visualisation carry the weight, and a company with a USD 1 bn valuation and years of product wins. If he thinks "which tests do we rerun after this firmware change, and can we defend it", selection quality and rationale carry the weight, and no one in the table above competes. Your job in every Nominal or Sift conversation is to move the weights, not to argue the scores.

### Where they could go next

Both are adding agents on top of their data. An agent that investigates telemetry and proposes rules (Sift) is one step from an agent that proposes which tests to rerun. Treat change impact as **a feature they could decide to build**, and ask what would make it hard for them:

- **Data they do not have:** rig configuration and fixture history, operator actions aligned on the same clock, the dependency model between firmware modules, rigs and tests. A data platform holds signals; it does not by default hold the *why* of a test.
- **Segment focus:** their named customers are defence and space. Drives, actuators and humanoids have different rigs and standards (the EU Machinery Regulation from 20 January 2027 rather than defence acquisition rules).
- **Product priority:** a USD 1 bn platform company optimises for breadth across many programmes; a narrow selection engine with a written rationale per test is a deep, slow feature.

None of these is permanent. That is the subject of lesson 4.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Status of the facts above",
          md: md`All facts come from search-result summaries in the research brief dated 6 November 2026, not from full primary pages. Unverified items: Nominal's total raised (about USD 155 m or USD 183 m), the STRATFI amount (USD 71.2 m seen only in a page title), the Fid Labs acquisition date, Sift's FedRAMP High status via Knox, and the date of Sift's Series B (Tracxn vs PitchBook). "Not advertised" means the research found no source describing the feature; it does not prove the feature does not exist or is not in development.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Moving the weights",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Same two products, two frames (illustrative scores)",
          given: md`Illustrative teaching numbers only: they are not an evaluation of Nominal's product. A buyer scores two vendors 1 to 5 on five criteria: ingest and scale, visualisation and review, private deployment, test selection after a change, written rationale for the selection. Perceived scores: a mature data platform (call it Vendor N) 5, 5, 4, 1, 2; Afterwave 3, 3, 4, 5, 5.`,
          steps: [
            {
              md: md`**Frame A, "test data platform":** weights 0.35, 0.25, 0.15, 0.15, 0.10.

$U_N = 0.35(5) + 0.25(5) + 0.15(4) + 0.15(1) + 0.10(2) = 1.75 + 1.25 + 0.60 + 0.15 + 0.20 = 3.95$

$U_A = 0.35(3) + 0.25(3) + 0.15(4) + 0.15(5) + 0.10(5) = 1.05 + 0.75 + 0.60 + 0.75 + 0.50 = 3.65$

Vendor N wins by 0.30.`,
            },
            {
              md: md`**Frame B, "change impact for hardware test":** weights 0.10, 0.10, 0.20, 0.35, 0.25.

$U_N = 0.10(5) + 0.10(5) + 0.20(4) + 0.35(1) + 0.25(2) = 0.50 + 0.50 + 0.80 + 0.35 + 0.50 = 2.65$

$U_A = 0.10(3) + 0.10(3) + 0.20(4) + 0.35(5) + 0.25(5) = 0.30 + 0.30 + 0.80 + 1.75 + 1.25 = 4.40$

Afterwave wins by 1.75.`,
            },
            {
              md: md`**What moved:** not a single score. Only the weights changed. Private deployment scores equally in both frames: it is **table stakes**, not a differentiator against Nominal or Sift, which both advertise on-prem options.`,
            },
          ],
          result: md`In the data-platform frame Afterwave loses narrowly even with good scores; in the change-impact frame it wins clearly. The discovery call that establishes "after every firmware release we rerun most of the regression and nobody can say why" is what sets Frame B.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A mixed frame (illustrative)",
          given: md`Same illustrative scores. The buyer's team is split: the data engineer cares about ingest, the validation lead about selection. Weights: ingest 0.20, visualisation 0.15, private deployment 0.20, selection 0.25, rationale 0.20.`,
          steps: [
            {
              md: md`$U_N = 0.20(5) + 0.15(5) + 0.20(4) + 0.25(1) + 0.20(2) = 1.00 + 0.75 + 0.80 + 0.25 + 0.40 = 3.20$`,
              hidden: true,
              check: { prompt: "Vendor N's score U_N", answer: 3.2, tolerance: { abs: 0.01 } },
            },
            {
              md: md`$U_A = 0.20(3) + 0.15(3) + 0.20(4) + 0.25(5) + 0.20(5) = 0.60 + 0.45 + 0.80 + 1.25 + 1.00 = 4.10$`,
              hidden: true,
              check: { prompt: "Afterwave's score U_A", answer: 4.1, tolerance: { abs: 0.01 } },
            },
            {
              md: md`Gap: $4.10 - 3.20 = 0.90$ in Afterwave's favour. With a split committee the realistic outcome is **both**: the data platform for the data engineer, Ripple for the validation lead. That is the coexist play.`,
            },
          ],
          result: md`When the committee is split, do not force a choice you might lose. Offer Ripple as the decision layer that can sit beside whatever data platform they choose.`,
        },
        {
          kind: "question",
          question: {
            id: "aw13-l02-p1",
            type: "numeric",
            prompt: md`Using the illustrative scores (Vendor N: 5, 5, 4, 1, 2; Afterwave: 3, 3, 4, 5, 5), the buyer puts weight 0.30 on ingest, 0.20 on visualisation, 0.20 on private deployment and splits the remaining 0.30 equally between selection and rationale. What is Afterwave's score minus Vendor N's score? (Negative if Vendor N wins.)`,
            answer: 0.05,
            tolerance: { abs: 0.01 },
            explanation: md`Selection and rationale get 0.15 each. $U_N = 0.30(5)+0.20(5)+0.20(4)+0.15(1)+0.15(2) = 1.50+1.00+0.80+0.15+0.30 = 3.75$. $U_A = 0.30(3)+0.20(3)+0.20(4)+0.15(5)+0.15(5) = 0.90+0.60+0.80+0.75+0.75 = 3.80$. Difference $+0.05$: a statistical tie. When half the weight sits on data-platform criteria, the deal is decided by things outside the model (price, relationships, who the champion is). Move the weights in discovery before you get here.`,
            concepts: ["aw13.frame-scoring"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Reading and handling Nominal and Sift in practice",
      blocks: [
        {
          kind: "md",
          md: md`### How to keep a live read on them

- **Product:** documentation sites and release notes (Sift publishes docs openly), launch posts (Nominal Connect), webinars. Note the deployment options and integrations they list.
- **Direction:** job posts (a "test selection" or "regression intelligence" role would be an early warning), acquisitions (Fid Labs), agent features.
- **Go-to-market:** named customers and contract notices tell you which segments they prioritise. Today that is defence and space; watch for automotive, drive and robotics logos.
- **What they will say about you:** expect "Ripple is a feature, we can do it on our platform." Your answer is in lesson 5; your proof is a demo on rig data, with a rationale per selected and skipped test.

### Compete, coexist or integrate

| Situation at the prospect | Play |
|---|---|
| No data platform, pain is over-testing after changes | **Lead with Ripple and Lockstep**; data platform not needed to start |
| Already on Nominal or Sift, pain is over-testing | **Coexist**: Ripple as the decision layer; ingest their exports (feasibility and terms to be checked with each vendor) |
| Evaluating Nominal or Sift for a data platform, no selection pain | **Do not compete**: wrong frame; stay in touch until the change-impact pain appears |
| Committee split between data engineer and validation lead | **Coexist**, and make the validation lead your champion |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Mistakes with well-funded adjacent players",
          md: md`- **Saying "they cannot do X".** You do not know their roadmap. Say "we have not seen X advertised as of [date]; ask them to show it on your rig data."
- **Copying their category words.** "Continuous test stack" and "observability layer" are their frames. Using them puts you in their evaluation.
- **Fighting on breadth.** Ingest connectors, dashboards, alerting: they will out-build you.
- **Ignoring the integration path.** If the prospect is already on Nominal or Sift and you require them to move their data, you have created a choice you will usually lose.
- **Treating their funding as proof of your market.** It proves investors believe in hardware test data. It does not prove anyone pays for change impact.`,
        },
        {
          kind: "ask",
          title: "Questions for a prospect who uses or evaluated Nominal or Sift",
          items: [
            "What problem did you buy (or evaluate) it for?",
            "After the last firmware release, did it help decide what to rerun? How was that decision made and documented?",
            "Where does rig configuration, fixture and calibration history live today?",
            "Can you export run data and metadata from it in an open format? Who owns that export?",
            "If the change-impact decision lived in a separate tool, who would object?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw13-l02-p2",
            type: "short",
            prompt: md`**Write a one-page internal competitor brief on Nominal for the Afterwave team** (the learner, Ismail, Yusuf). Include: (1) what Nominal sells and how it positions itself, with dated facts and their status; (2) an overlap and gap table per Afterwave product (Lockstep, Enclave, Ripple); (3) three plausible moves Nominal could make in the next 18 months that would affect Afterwave, with the early signal for each; (4) your recommended play (compete, coexist or integrate) for two prospect situations; (5) two things the team must never claim about Nominal.`,
            rubric: [
              "Product, positioning and facts match the research brief, with dates and 'as reported' or 'unverified' status; no invented customers or features",
              "Overlap and gap are stated per product: strong overlap for Lockstep (Connect) and Enclave (on-prem Core), no advertised overlap for Ripple",
              "Three moves are plausible and each has an observable early signal (job posts, acquisitions, release notes, new segment logos)",
              "Plays are matched to prospect situations and include coexistence where the prospect already uses Nominal",
              "Never-claim list includes unprovable capability claims ('they cannot do X') and avoids disparagement",
            ],
            modelAnswer: md`**1. What it is.** "Continuous test stack for physical systems": Core data platform (secure cloud, private or on-prem) and Connect, a bench edge app that reads and writes instruments, runs Python test apps, sequences tests and works air-gapped. Customers named: Anduril, Shield AI. Funding as reported: USD 75 m Series B led by Sequoia (Jun 2025); USD 80 m Series B-2 led by Founders Fund at USD 1 bn valuation (5 Mar 2026). USD 53 m sole-source IDIQ, Air Force Test Center (14 Apr 2026). STRATFI selection (26 Oct 2026), amount unverified. Fid Labs acquisition (agents to robotics dev environments), date unverified.

**2. Overlap and gap.** Lockstep: high overlap on bench capture (Connect); gap: on-screen operator actions on the same clock not advertised. Enclave: high overlap (on-prem, air-gapped Core). Ripple: no advertised overlap; Nominal holds signals but not, by default, the dependency model between firmware modules, rigs and tests.

**3. Moves and signals.** (a) Agent-driven "what changed" analysis extended to test recommendations: signal, release notes or job posts mentioning test selection or regression. (b) Push into automotive and robotics test labs: signal, named customers in drives or humanoids, hires in Germany or Detroit. (c) Acquire a small test-selection or requirements-traceability company: signal, acquisition news like Fid Labs.

**4. Plays.** Prospect already on Nominal with over-testing pain: coexist, Ripple as the decision layer reading exports (to verify). Prospect evaluating Nominal for a data platform without selection pain: do not compete; follow up after the next release crunch.

**5. Never claim.** "Nominal cannot do change impact" (say "not advertised as of Nov 2026"). Any total-raised figure (sources conflict).`,
            explanation: md`Graded against the rubric. The core skill is separating the products: Nominal is a strong overlap for Lockstep and Enclave and no advertised overlap for Ripple, which is why Ripple leads.`,
            concepts: ["aw13.nominal-profile", "aw13.overlap-gap", "aw13.coexist-play"],
            difficulty: 3,
          },
        },
        { kind: "xref", to: "fc03-l06", note: "Category strategy: why Ripple enters as a subcategory (big fish, small pond) inside the hardware test budget that Nominal and Sift are educating." },
        { kind: "sources", refs: ["aw13-r1", "aw13-r2", "aw13-r3", "aw13-r4", "aw13-r5", "aw13-r6", "aw13-r7", "aw13-r8", "aw13-r9", "aw13-r10", "aw13-r11", "aw13-r12"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw13-l02-q1",
      type: "mcq",
      prompt: "Which pair best describes how Nominal and Sift position themselves?",
      options: [
        "Nominal: 'observability layer for hardware'; Sift: 'continuous test stack'",
        "Nominal: 'continuous test stack for physical systems'; Sift: 'observability layer for hardware'",
        "Both: 'change-impact engine for hardware test'",
        "Nominal: 'simulation for all moving machines'; Sift: 'robot fleet operations'",
      ],
      answer: 1,
      explanation: md`Nominal claims the stack (bench edge app plus data platform). Sift borrows the software observability frame (telemetry, rules, alerts). Simulation is Applied Intuition; fleet ops is Formant.`,
      concepts: ["aw13.nominal-profile", "aw13.sift-profile"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw13-l02-q2",
      type: "multi",
      prompt: "Which Afterwave capabilities overlap substantially with what Nominal advertises (as of Nov 2026)?",
      options: [
        "Capture at the bench, attached to instruments",
        "Private or on-prem deployment",
        "Selecting which tests to rerun after a firmware change, with a rationale",
        "Recording on-screen operator actions on the same clock as DAQ signals",
      ],
      answer: [0, 1],
      explanation: md`Connect sits at the bench and Core deploys on-prem or air-gapped: overlap with Lockstep and Enclave. Test selection with rationale and one-clock capture of operator actions were not found in Nominal's advertised features.`,
      concepts: ["aw13.overlap-gap", "aw13.nominal-profile"],
      difficulty: 2,
    },
    {
      id: "aw13-l02-q3",
      type: "numeric",
      prompt: md`Illustrative: weights 0.25 ingest, 0.25 visualisation, 0.20 private deployment, 0.20 selection, 0.10 rationale. Scores Vendor N 5, 5, 4, 1, 2; Afterwave 3, 3, 4, 5, 5. What is Afterwave's score minus Vendor N's?`,
      answer: 0.1,
      tolerance: { abs: 0.01 },
      explanation: md`$U_N = 0.25(5)+0.25(5)+0.20(4)+0.20(1)+0.10(2) = 1.25+1.25+0.80+0.20+0.20 = 3.70$. $U_A = 0.25(3)+0.25(3)+0.20(4)+0.20(5)+0.10(5) = 0.75+0.75+0.80+1.00+0.50 = 3.80$. Difference $+0.10$: Afterwave edges ahead even with half the weight on platform criteria, because the selection gap (5 vs 1) is large. Big gaps on few criteria beat small gaps on many.`,
      concepts: ["aw13.frame-scoring"],
      difficulty: 2,
    },
    {
      id: "aw13-l02-q4",
      type: "mcq",
      prompt: "Why is private deployment (Enclave) not a differentiator in a head-to-head with Nominal or Sift?",
      options: [
        "Because buyers do not care about on-prem",
        "Because both advertise on-prem or private deployment options, so it scores equally and drops out of the comparison",
        "Because the EU Machinery Regulation requires cloud deployment",
        "Because Enclave runs only in the cloud",
      ],
      answer: 1,
      explanation: md`A criterion where everyone scores the same cannot change the ranking: it is table stakes. It still matters (fail it and you are out), but it does not win the deal against these two.`,
      concepts: ["aw13.frame-scoring", "aw13.overlap-gap"],
      difficulty: 2,
    },
    {
      id: "aw13-l02-q5",
      type: "decision",
      prompt: md`A validation lead at a robotics company says: "We just signed with Sift for telemetry. Our real problem is that every firmware release triggers a three-day regression." What do you propose?`,
      options: [
        { text: "Ripple as the decision layer beside Sift: a pilot that recommends which tests to rerun, with a rationale, using their existing data exports where feasible.", score: 1, feedback: "Coexist: no forced choice, and the pain is exactly Ripple's job." },
        { text: "Ask them to replace Sift with Afterwave so all data is in one place.", score: 0.1, feedback: "You create a choice you will likely lose and reopen a decision they just closed." },
        { text: "Tell them Sift is not built for robotics.", score: 0, feedback: "Disparaging and unprovable; it also insults the decision they just made." },
        { text: "Wait until their Sift contract renews.", score: 0.3, feedback: "The pain is now; waiting gives Sift time to extend into it." },
      ],
      explanation: md`Where the prospect already owns the adjacent platform, position Ripple to sit beside it.`,
      concepts: ["aw13.coexist-play"],
      difficulty: 2,
    },
    {
      id: "aw13-l02-q6",
      type: "mcq",
      prompt: "Which development would be the strongest early signal that a data platform is moving into Ripple's job?",
      options: [
        "A new dashboard theme",
        "Job posts or release notes mentioning test selection, regression intelligence or 'what to retest'",
        "A larger funding round",
        "A new office in a different city",
      ],
      answer: 1,
      explanation: md`Funding and offices show capacity; job posts and release notes show intent on a specific job. Agent features that propose actions (like Sift Agents proposing rules) are the step before.`,
      concepts: ["aw13.overlap-gap"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw13-l02-f1", front: "Nominal's two products", back: "Core (data platform: cloud, private or on-prem) and Connect (bench edge app: reads and writes instruments, runs Python tests, sequences, air-gapped).", concepts: ["aw13.nominal-profile"] },
    { id: "aw13-l02-f2", front: "Sift in one line", back: "Observability layer for hardware: telemetry ingest, rules, alerts, review; SaaS to on-prem and GovCloud; Sift Agents preview Sep 2026.", concepts: ["aw13.sift-profile"] },
    { id: "aw13-l02-f3", front: "Sift funding as reported", back: "USD 42 m Series B led by StepStone (Mar 2026), GV largest investor, total USD 67 m. Date conflicts across databases.", concepts: ["aw13.sift-profile"] },
    { id: "aw13-l02-f4", front: "Where Nominal overlaps Afterwave", back: "Lockstep (Connect at the bench) and Enclave (on-prem Core). Not advertised: Ripple's change impact.", concepts: ["aw13.overlap-gap"] },
    { id: "aw13-l02-f5", front: "Evaluation score formula", back: md`$U_j = \sum_k \omega_k q_{jk}$; the frame sets $\omega_k$.`, concepts: ["aw13.frame-scoring"] },
    { id: "aw13-l02-f6", front: "Coexist play", back: "Sit beside the platform they own as the decision layer, reading its exports; never force a choice you would lose.", concepts: ["aw13.coexist-play"] },
    { id: "aw13-l02-f7", front: "What to say instead of 'they cannot do X'", back: "\"We have not seen X advertised as of [date]. Ask them to show it on your rig data.\"", concepts: ["aw13.overlap-gap"] },
  ],
};

export default lesson;
