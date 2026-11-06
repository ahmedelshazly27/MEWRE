import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc07-l04",
  title: "The Pitch Narrative and Deck Structure",
  summary:
    "A pitch is an argument that this company can be big, built by these people, starting now. Build it in the standard order (problem, insight, why now, product, traction, market, business model, competition, team, ask), size the market bottom-up, and use Afterwave as the worked deck outline without inventing evidence.",
  minutes: 80,
  objectives: [
    "Structure a pitch as an argument whose every slide answers an investor's question",
    "State a non-obvious insight and a why-now that rest on mechanisms, not adjectives",
    "Size a market bottom-up (accounts times ACV) and test it against the fund-returner bar",
    "Write a 12-slide outline for Afterwave with the evidence each slide needs and placeholders where evidence does not yet exist",
    "Prepare answers to the hardest predictable investor questions",
  ],
  concepts: [
    { id: "fc07.pitch-narrative", name: "Pitch as an argument", description: "The deck is a chain: a painful problem, a non-obvious insight into it, a reason it is solvable now, a product that uses the insight, evidence it works, a market big enough, a model that makes money, a team that can win, and an ask that funds the next proof.", competency: "fc-fundraising", related: ["m13.pyramid-principle"] },
    { id: "fc07.insight", name: "The insight", description: "A true, non-obvious belief about the market or technology that most people do not share and that your product exploits; the core of a venture pitch.", competency: "fc-fundraising", related: ["fc07.pitch-narrative"] },
    { id: "fc07.why-now", name: "Why now", description: "The specific change (regulation, technology cost curve, buyer behaviour) that makes the company possible or necessary now and not five years ago.", competency: "fc-fundraising", related: ["fc07.pitch-narrative"] },
    { id: "fc07.bottom-up-market", name: "Bottom-up market sizing", description: "Market size built from a count of reachable buying accounts times a defensible annual contract value, then a plausible share; preferred by investors over top-down analyst totals.", competency: "fc-fundraising", related: ["fc07.fund-returner"] },
  ],
  scenarios: [
    {
      id: "fc07-s1",
      title: "'Why won't Nominal just build this?'",
      dayInLife: true,
      context: md`You are 20 minutes into a seed pitch for Afterwave with a partner at a European fund. She has just read that Nominal raised USD 80m at a USD 1bn valuation in March 2026 and that Sift raised USD 42m. She leans back: "These companies own hardware test data. Why won't Nominal just build your change-impact engine?"`,
      start: "a",
      concepts: ["fc07.insight", "fc07.pitch-narrative"],
      nodes: {
        a: {
          md: md`How do you open?`,
          choices: [
            { text: "\"They could, but we're faster.\"", score: 2, feedback: "Speed is not a moat and you just conceded the premise.", next: "b" },
            { text: "\"Good question. Their funding tells you test data matters. Our bet is different: the hard part is not storing bench data but knowing which tests a firmware, model or rig change invalidates. That needs the change graph across rig, firmware and model, which we capture with Lockstep from day one. Let me show what that takes.\"", score: 9, feedback: "Reframes competition as validation, states the insight, and moves to mechanism.", next: "b" },
            { text: "\"Nominal is defence-focused, so they won't come into robotics.\"", score: 3, feedback: "Partly true per public information, but they are pushing into automotive and robotics; a positioning claim that will age badly.", next: "c" },
          ],
        },
        b: {
          md: md`"Fine, but data gravity is real. If they already hold the data, why would a test team add you?"`,
          choices: [
            { text: "Explain the wedge: Afterwave Enclave runs on customer servers, so it works where data cannot leave; Lockstep captures rig signals and on-screen actions on one clock, which generic telemetry stores do not; Ripple's output is a rerun list with reasons, measured in rig-hours saved. Offer to integrate with existing data stores rather than replace them.", score: 10, feedback: "Specific, mechanism-based, and lowers switching cost instead of picking a fight.", next: "d" },
            { text: "Say that test teams hate their current tools.", score: 2, feedback: "An unprovable generalisation; she will ask for evidence you may not have.", next: "d" },
          ],
        },
        c: {
          md: md`She replies: "Their latest round was explicitly to expand beyond defence." You need to recover.`,
          choices: [
            { text: "Acknowledge it, then go to the insight and the on-prem wedge as in a good answer.", score: 6, feedback: "Recovery works, but you spent credibility.", next: "d" },
          ],
        },
        d: {
          md: md`She asks: "What evidence would tell you you're wrong?"`,
          choices: [
            { text: "Name it: if design partners keep rerunning full suites even with Ripple's list, or if security teams accept cloud telemetry stores widely, the wedge weakens. Say which metric in your pilots tracks each.", score: 10, feedback: "Falsifiable thinking is rare in pitches and builds trust fast." },
            { text: "\"We're confident we're right.\"", score: 1, feedback: "Confidence without a test reads as not having thought about it." },
          ],
        },
      },
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "A pitch is an argument in a fixed order",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You will pitch Afterwave to YC partners, European seed funds and possibly Zurich investors, and Mizan to Gulf investors and strategic partners. The deck is how a partner retells your company to their colleagues when you are not in the room. If the argument does not survive that retelling (a clear insight, a real why-now, a market big enough for their fund), the meeting does not matter. Your engineering background is an asset here: build the deck like a proof.`,
        },
        {
          kind: "md",
          md: md`### The chain of questions

Each slide answers one question the investor is already asking. Order matters because each claim depends on the one before.

1. **Problem:** who hurts, how much, and how do they cope today? Quantify in the buyer's units (rig-hours, test cycles, release delays).
2. **Insight:** what do you understand that others do not? A good insight is true, non-obvious and actionable. "AI is changing testing" is not an insight; "in physical AI, the bottleneck is not running tests but choosing which ones a change invalidates, and that requires a change graph across rig, firmware and model" is.
3. **Why now:** what changed? Regulation, cost curves, buyer behaviour, a new platform.
4. **Product:** how the product uses the insight. Show it (demo or screenshots), not a feature list.
5. **Traction / evidence:** proof the problem is real and the product works. At pre-seed: discovery and design partners; at seed: pilots and paid usage.
6. **Market:** bottom-up, sized against the fund-returner bar.
7. **Business model:** who pays, how much, how it grows inside an account.
8. **Competition:** an honest map with your wedge and the reason incumbents will not or cannot follow quickly.
9. **Team:** why these people win this market.
10. **Ask:** amount, what it buys (the milestones from Lesson 2), and the next round it sets up.

Investors read a send-ahead deck in about 2 to 4 minutes. The headline of each slide should be the claim ("Test teams rerun [X] times more tests than a change requires", with X and its source taken from your own discovery data), not a label ("Problem").

### Why now, with mechanisms

For Afterwave the why-now has three mechanisms you can defend:

- **Regulation with a date:** the EU Machinery Regulation (EU) 2023/1230 applies from **20 January 2027**. It introduces third-party conformity assessment for safety components with self-evolving (machine-learning) behaviour and requirements on control-system safety, reliability and logging. Test evidence and traceability become a compliance cost, not an engineering preference.
- **Change frequency:** physical AI teams change models and firmware far more often than classical machinery teams changed control code, while rig time stays physical and scarce.
- **Investor and buyer appetite for the category:** adjacent hardware-test data platforms raised large rounds (Nominal USD 80m at a USD 1bn valuation in March 2026; Sift USD 42m Series B in March 2026; Foxglove USD 40m Series B in November 2025). In the course research no vendor was found offering change-impact test selection for physical benches as a core feature; the closest analogues are code-level change-based testing (VectorCAST) and requirements tools' "suspect links".

### Market: bottom-up beats top-down`,
        },
        { kind: "equation", formula: "fc07-bottom-up-market" },
        {
          kind: "md",
          md: md`A top-down number ("the test and measurement market is worth tens of billions") says nothing about whether you can sell. A bottom-up build says who the buyers are, how many exist and what they pay. Then check it against Lesson 1: if the fund-returner exit implies EUR 110m of ARR and your SAM is EUR 500m, you need about 22 % of SAM or an expansion path. Make that path explicit rather than inflating the count.`,
        },
        {
          kind: "flow",
          title: "Afterwave: 12-slide deck as an argument",
          steps: [
            { label: "1. Title + one-line claim", detail: "Test infrastructure for physical AI" },
            { label: "2. Problem", detail: "Every firmware, model or rig change triggers expensive reruns; teams guess what to rerun" },
            { label: "3. Insight", detail: "Selection, not execution, is the bottleneck; it needs one clock and a change graph" },
            { label: "4. Why now", detail: "Machinery Regulation 20 Jan 2027; change frequency of physical AI; category appetite" },
            { label: "5. Product", detail: "Lockstep capture, Enclave private environment, Ripple change impact; bench memory" },
            { label: "6. Evidence", detail: "[Design partners, pilots, rig-hours saved: real data only]" },
            { label: "7. Market", detail: "Bottom-up: test organisations x ACV by segment" },
            { label: "8. Business model", detail: "Per test team and rig; expand to programmes; later test platforms" },
            { label: "9. Competition", detail: "Data platforms, incumbents, traceability tools; the change-impact wedge" },
            { label: "10. Go-to-market", detail: "Test leads at robotics, drives, batteries; on-prem security review playbook" },
            { label: "11. Team", detail: "Ex-Tesla drive unit validation and inverter test; GTM founder" },
            { label: "12. Ask", detail: "Amount, milestones to Series A, runway" },
          ],
          caption: "Each slide's headline is a claim; slide 6 stays a placeholder until there is real evidence.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Building Afterwave's market slide",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Bottom-up SAM for Afterwave (illustrative)",
          given: md`Illustrative counts and prices to show the method, not research results. Reachable hardware test organisations in the US and EU by segment: robotics and humanoids 400, drives and motors 600, batteries 500, powertrains 700, autonomous machines 300. Mature ACV per test organisation: Lockstep plus Enclave EUR 120k, Ripple EUR 80k.`,
          steps: [
            { md: md`$N_{\text{acc}} = 400 + 600 + 500 + 700 + 300 = 2{,}500$ test organisations.` },
            { md: md`$\text{ACV} = 120 + 80 = 200$ EUR k per organisation per year.` },
            { md: md`$\text{SAM} = 2{,}500\times 200\text{k} = 500$ EUR m per year.` },
            { md: md`**Five-year SOM** at a 4 % share: $0.04\times 500 = 20$ EUR m ARR.` },
            { md: md`**Against the fund-returner bar (Lesson 1):** EUR 1.1bn at 10x needs EUR 110m ARR, which is 22 % of this SAM. Plausible only with expansion: several test organisations per large OEM, more rigs per organisation, and the later instrumented test-platform business. Put that expansion on the business-model slide with its own numbers.` },
          ],
          result: md`SAM about **EUR 500m/yr** from 2,500 organisations at EUR 200k. The honest conclusion is that the venture case rests on expansion and the test-platform layer, so the deck must show that path instead of a bigger top-down number.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "One segment, bottom-up",
          given: md`Illustrative: 600 drive and motor test organisations, ACV EUR 200k, target share in five years 5 %.`,
          steps: [
            { md: md`Segment SAM $= 600\times 200\text{k}$.` },
            { md: md`= **EUR 120m per year**.`, hidden: true, check: { prompt: "Segment SAM (EUR m/yr)", answer: 120, unit: "EUR m/yr", tolerance: { abs: 0.5 } } },
            { md: md`Five-year SOM $= 0.05\times 120$ = **EUR 6m ARR**.`, hidden: true, check: { prompt: "Segment SOM (EUR m ARR)", answer: 6, unit: "EUR m", tolerance: { abs: 0.05 } } },
            { md: md`Customers implied: $6\text{m}/200\text{k} = 30$ organisations.` },
          ],
          result: md`Thirty drive and motor test organisations in five years is a number a partner can sanity-check against your sales capacity. That is the point of bottom-up.`,
        },
        {
          kind: "question",
          question: {
            id: "fc07-l04-p1",
            type: "numeric",
            prompt: md`Mizan (illustrative): 120 utility-scale PV plants in the Gulf above 100 MW that could buy soiling analytics, at an ACV of USD 60k per plant. What is the SAM (USD m per year)?`,
            answer: 7.2,
            tolerance: { abs: 0.05 },
            unit: "USD m/yr",
            explanation: md`$120\times 60\text{k} = 7.2$ USD m per year. That is a fine business but far below any VC fund-returner bar; the venture case would need plant control, distribution margin or a much larger geography. Market size decides the capital type (Lesson 3).`,
            concepts: ["fc07.bottom-up-market"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Delivering the pitch and surviving the questions",
      blocks: [
        {
          kind: "md",
          md: md`### Two decks, one story

- **Send-ahead deck** (read without you): 10 to 14 slides, full-sentence headlines, numbers with sources, no animations. Readable on a phone.
- **Presentation deck** (you talk): fewer words, a live product demo (Lockstep capture on a rig, Ripple's rerun list) and backup slides for diligence questions.
- **Memo** (some funds and YC prefer writing): the same argument in two pages.

### How it goes wrong

- Slide 6 filled with logos of companies you only spoke to. Investors call them.
- A market slide that quotes a top-down total and then claims 1 % of it.
- A why-now that is only "AI is booming".
- A competition slide with you in the top-right corner of a 2x2 and everyone else bottom-left.
- An ask without milestones ("EUR 3m for 18 months of runway") instead of "EUR 3m to reach these three Series A milestones".`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Never invent evidence",
          md: md`Every number on an evidence slide must survive a reference call. If a design partner is "in discussion", say so. If rig-hours saved come from one pilot, say "one pilot". Misstated traction is the fastest way to lose a round in diligence and a reputation in a small investor community.`,
        },
        {
          kind: "ask",
          title: "Questions investors will ask about Afterwave (prepare written answers)",
          items: [
            "Who is the economic buyer: the test lead, the head of validation, or IT security? Who signs?",
            "How long is the sales cycle including the on-prem security review, and how will you shorten it?",
            "Why won't Nominal, Sift or an incumbent (NI, Vector, dSPACE) build change-impact selection?",
            "What does bench memory become after three years at a customer, and who owns it?",
            "What does the Machinery Regulation actually require your customers to evidence, and when?",
            "How does the business become software-margin if you later build test platforms?",
          ],
        },
        { kind: "scenario", scenario: "fc07-s1" },
        {
          kind: "question",
          question: {
            id: "fc07-l04-p2",
            type: "short",
            prompt: md`Write Afterwave's **12-slide seed deck outline**: for each slide give the claim-style headline (one sentence), the evidence or visual on the slide, and its source or a bracketed placeholder where you do not yet have real evidence. Include the insight in one sentence and a bottom-up market build with stated assumptions.`,
            rubric: [
              "All 12 slides present in a logical argument order (problem, insight, why now, product, evidence, market, model, competition, GTM, team, ask)",
              "Headlines are claims, not labels, and the insight is true, non-obvious and tied to the product",
              "Why-now uses verifiable mechanisms (Machinery Regulation applying 20 January 2027, change frequency, category signals with dates)",
              "Market slide is bottom-up with stated, labelled assumptions and is checked against the fund-returner bar",
              "Evidence slide uses placeholders rather than invented customers, pilots or revenue",
              "Ask ties the amount to Series A milestones and runway",
            ],
            modelAnswer: md`1. **Title:** "Afterwave: test infrastructure for physical AI." Visual: product shot.
2. **Problem:** "Every firmware, model or rig change forces hardware test teams to guess what to rerun, so they rerun too much or miss regressions." Evidence: [quotes and numbers from discovery interviews with test leads].
3. **Insight:** "In physical AI the bottleneck is not running tests but choosing which ones a change invalidates, and that needs rig signals, on-screen actions, firmware and model versions on one clock."
4. **Why now:** "From 20 January 2027 the EU Machinery Regulation requires third-party assessment for ML-based safety components and stronger control-system evidence; physical AI teams change models weekly; adjacent test-data platforms raised USD 40 to 80m rounds in 2025 to 2026."
5. **Product:** "Lockstep captures, Enclave keeps data and models on the customer's servers, Ripple tells you what to rerun and why." Visual: Ripple rerun list with reasons.
6. **Evidence:** "[N] design partners in [segments]; [pilot result in rig-hours saved]." Placeholder until real.
7. **Market:** "2,500 reachable test organisations in the US and EU x EUR 200k ACV = EUR 500m SAM (illustrative); venture scale comes from expansion per OEM and test platforms."
8. **Business model:** "Annual licence per test organisation plus per rig; expansion across programmes; later instrumented test platforms." [target gross margin].
9. **Competition:** "Data platforms store test data; traceability tools flag requirement changes; nobody selects physical tests from the change graph." Map: Nominal, Sift, Marple, Foxglove, incumbents, Jama and Polarion.
10. **GTM:** "Land with the test lead through a paid pilot, pass the on-prem security review once, expand through Ripple." [Pipeline placeholder].
11. **Team:** "We have run validation at scale: Ismail (Tesla drive unit validation, now test systems at Signify), Yusuf (Tesla drive inverter test and reliability), CEO on GTM."
12. **Ask:** "EUR 3.0m to convert pilots to paid contracts, put Ripple in production at one customer and prove a repeatable motion: 27 months of runway."`,
            explanation: md`The outline is graded as an argument: every headline should be a claim that depends on the previous one, every number sourced or marked as a placeholder, and the market tested against what a fund needs.`,
            concepts: ["fc07.pitch-narrative", "fc07.insight", "fc07.why-now", "fc07.bottom-up-market"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "State Afterwave's insight and why-now in under 60 seconds, as you would to a YC partner who has never seen a hardware test rig.",
          keyPoints: [
            "Physical machines are tested on scarce rigs; every software or model change can break something physical",
            "Teams cannot rerun everything, so they guess; the cost is rig time or missed regressions",
            "Choosing the right tests needs rig signals, actions and versions captured on one clock (Lockstep) and a change-impact engine (Ripple)",
            "Why now: physical AI changes models constantly, and the EU Machinery Regulation applies from 20 January 2027",
            "No claims of traction beyond what actually exists",
          ],
        },
        { kind: "xref", to: "m13.pyramid-principle", note: "Answer first, then supporting arguments: the same structure makes a deck retellable." },
        { kind: "sources", refs: ["fc07-r16", "fc07-r17", "fc07-r3"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc07-l04-q1",
      type: "order",
      prompt: "Put these deck slides in the standard argument order.",
      items: ["Problem", "Insight", "Why now", "Product", "Evidence / traction", "Market", "Team", "Ask"],
      explanation: md`Each claim depends on the previous: a problem, a non-obvious view of it, why it is solvable now, the product built on it, proof, size, who wins it, and what the money buys. Team can move earlier when it is the strongest evidence (pre-seed), but the logic chain stays.`,
      concepts: ["fc07.pitch-narrative"],
      difficulty: 1,
    },
    {
      id: "fc07-l04-q2",
      type: "mcq",
      prompt: "Which is an insight rather than a description of a trend?",
      options: [
        "AI is transforming hardware testing",
        "The robotics market is growing fast",
        "Test selection, not execution, is the bottleneck in physical AI, and it needs a change graph across rig, firmware and model",
        "Customers want better tools",
      ],
      answer: 2,
      explanation: md`An insight is specific, non-obvious and actionable: it tells you what to build and why others have missed it. The others are trends or truisms.`,
      concepts: ["fc07.insight"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc07-l04-q3",
      type: "numeric",
      prompt: md`800 reachable accounts at an ACV of EUR 150k. What is the SAM (EUR m per year)?`,
      answer: 120,
      tolerance: { abs: 0.5 },
      unit: "EUR m/yr",
      explanation: md`$800\times 150\text{k} = 120$ EUR m per year.`,
      concepts: ["fc07.bottom-up-market"],
      difficulty: 1,
    },
    {
      id: "fc07-l04-q4",
      type: "multi",
      prompt: "Which are defensible why-now arguments for Afterwave? (Select all that apply.)",
      options: [
        "The EU Machinery Regulation applies from 20 January 2027, with new requirements for ML-based safety components",
        "AI is very popular with investors",
        "Physical AI teams change models and firmware far more often while rig time stays scarce",
        "Adjacent hardware-test data platforms raised large rounds in 2025 to 2026, showing category demand",
        "Everyone is talking about humanoids",
      ],
      answer: [0, 2, 3],
      explanation: md`Why-now must be a mechanism with a date or a measurable shift. Popularity and talk are not mechanisms.`,
      concepts: ["fc07.why-now"],
      difficulty: 1,
    },
    {
      id: "fc07-l04-q5",
      type: "decision",
      prompt: md`Two days before sending your deck, a design-partner conversation stalls. Slide 6 currently shows that company's logo as a "design partner". What do you do?`,
      options: [
        { text: "Remove the logo or relabel it accurately ('in discussion'), and lead slide 6 with the evidence you can stand behind.", score: 1, feedback: "Investors will call; accuracy protects the round and the relationship." },
        { text: "Keep it; the conversation may restart.", score: 0, feedback: "If an investor calls and hears 'we paused', you lose credibility on every other slide." },
        { text: "Delay the raise until the partnership is signed.", score: 0.3, feedback: "Honest, but you can raise on accurate evidence; don't stall the whole process on one account." },
      ],
      explanation: md`Evidence slides are tested in diligence. Accurate and modest beats impressive and fragile.`,
      concepts: ["fc07.pitch-narrative"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc07-l04-f1", front: "Standard pitch order", back: "Problem, insight, why now, product, evidence, market, business model, competition, (GTM), team, ask.", concepts: ["fc07.pitch-narrative"] },
    { id: "fc07-l04-f2", front: "A good insight is...", back: "True, non-obvious and actionable: it tells you what to build and why others missed it.", concepts: ["fc07.insight"] },
    { id: "fc07-l04-f3", front: "Afterwave why-now mechanisms", back: "Machinery Regulation from 20 Jan 2027; physical AI change frequency vs scarce rig time; adjacent category rounds (Nominal USD 1bn, Mar 2026).", concepts: ["fc07.why-now"] },
    { id: "fc07-l04-f4", front: "Bottom-up market", back: md`$\text{SAM} = N_{\text{acc}}\times\text{ACV}$; $\text{SOM} = s\times\text{SAM}$.`, concepts: ["fc07.bottom-up-market"] },
    { id: "fc07-l04-f5", front: "Slide headline rule", back: "A claim with a number and source, not a label: 'Test teams rerun far more than a change requires', not 'Problem'.", concepts: ["fc07.pitch-narrative"] },
    { id: "fc07-l04-f6", front: "Send-ahead vs presentation deck", back: "Send-ahead is read alone in 2 to 4 minutes (full headlines, sources); presentation is spoken (demo, fewer words, backup slides).", concepts: ["fc07.pitch-narrative"] },
  ],
};

export default lesson;
