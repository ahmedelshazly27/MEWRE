import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw13-l04",
  title: "Differentiation and moats: what is actually defensible",
  summary:
    "An honest audit of Afterwave's candidate advantages: one-clock capture, change impact, the private Enclave, Afterwave's own physical test platforms, team expertise and regulatory timing. Separate differentiators from table stakes and from moats, estimate how fast a funded competitor could copy each, quantify switching cost for a test lab, and write the moat story you can defend in front of an investor who knows Nominal.",
  minutes: 75,
  objectives: [
    "Distinguish a differentiator, table stakes and a moat, and place each Afterwave capability in one of them",
    "Estimate time to copy for each capability and state what would make it stick",
    "Compute a test lab's switching cost and test whether a rival's discount or a bundle can overcome it",
    "Name the product decisions that turn Ripple from a wedge into a durable position",
  ],
  concepts: [
    { id: "aw13.feature-vs-moat", name: "Differentiator vs moat", description: "A differentiator wins today's evaluation; a moat keeps winning after competitors copy the feature, because it rests on something that compounds (switching cost, accumulated data, scale, hard-to-replicate assets).", competency: "aw-business", related: ["fc06.switching-costs", "fc06.network-effects"] },
    { id: "aw13.table-stakes", name: "Table stakes", description: "A capability every serious vendor offers, so it removes you from the shortlist if missing but cannot win the deal; for Afterwave, private deployment against Nominal and Sift.", competency: "aw-business", related: ["aw13.feature-vs-moat", "aw13.frame-scoring"] },
    { id: "aw13.time-to-copy", name: "Time to copy", description: "A judgement of how long a funded competitor would need to match a capability, given its data, team and priorities; short for features, long for accumulated assets and embedded workflows.", competency: "aw-business", related: ["aw13.feature-vs-moat"] },
    { id: "aw13.workflow-embedding", name: "Workflow embedding in release gates", description: "When Ripple's selection and rationale are referenced in release decisions and safety files, replacing it means re-validating that a new tool gives the same answers, on rigs.", competency: "aw-business", related: ["aw13.afterwave-switching-cost"] },
    { id: "aw13.afterwave-switching-cost", name: "Switching cost for a test lab", description: "Data and integration migration plus re-validation of test procedures on rigs plus retraining; the customer stays while a rival's total price advantage over the horizon is below it.", competency: "aw-business", related: ["fc06.switching-costs"] },
    { id: "aw13.platform-moat", name: "Physical platform advantage", description: "Afterwave's own instrumented test platforms would feed bench memory from day one and need capital and hardware know-how that software competitors lack; a potential later moat, not a seed-stage one.", competency: "aw-business", related: ["aw13.feature-vs-moat"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Three questions for every advantage",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`An investor who has met Nominal will ask: "What stops a USD 1 bn company from adding Ripple as a feature?" If you answer "we are first" or "our AI is better", the meeting is over. If you claim a data network effect, a sharp investor will point out that Enclave keeps each customer's data private. You need a moat story that is true, that the team agrees with, and that tells you which product decisions to make now so it becomes more true each quarter.`,
        },
        { kind: "xref", to: "fc06-l08", note: "The economics of moats (scale, network effects, switching costs, tipping conditions) and a first pass on Afterwave's moat. This lesson goes capability by capability." },
        {
          kind: "md",
          md: md`### Differentiator, table stakes, moat

For each capability ask three questions:

1. **Does the buyer care a lot?** (If not, it is noise.)
2. **Do the alternatives lack it today?** (If not, it is **table stakes**: required, but it cannot win.)
3. **Would it still be ours after a funded competitor tries to copy it for two years?** (If yes, and it compounds, it is a **moat**. If no, it is a **differentiator** with a shelf life.)

### The audit

| Capability | Closest existing (dated) | Time to copy, funded rival (team judgement, illustrative) | What would make it stick | Verdict |
|---|---|---|---|---|
| **One-clock capture** (Lockstep: DAQ signals and on-screen actions on one clock) | Nominal Connect at the bench; DAQ vendors' own synchronisation; screen recorders | Months | Little on its own: capture is a feature | **Differentiator with short shelf life**; matters as the data source for Ripple |
| **Change impact** (Ripple: which tests to rerun after a firmware, model or rig change, and why) | None advertised (Nov 2026). Analogues: VectorCAST at code level, suspect links at requirements level | A basic version: 12 to 24 months if a data platform prioritises it | Per-customer dependency model, calibrated on that lab's history, referenced in release gates and safety files | **Wedge today; becomes a moat only through accumulation and embedding** |
| **Private Enclave** (customer servers or isolated tenant) | Nominal (cloud, private, on-prem, air-gapped); Sift (on-prem, GovCloud) | Already exists | Running customer-trained models and the customer's own agents inside it (vision step 2) | **Table stakes** against Nominal and Sift; a differentiator only against cloud-only tools |
| **Own physical test platforms** (later) | Incumbents build test hardware (NI, dSPACE, Keysight); software startups do not | Years and capital | Ships instrumented, feeds bench memory from day one, hard for software rivals | **Potential later moat**; capital-heavy, demand unproven |
| **Team expertise** (Tesla drive unit and inverter validation) | Competitors hire domain experts too | Hiring cycle | Speeds learning and credibility | **Advantage, not a moat** |
| **Regulatory timing** (EU Machinery Regulation from 20 January 2027) | Everyone can read the regulation | None | Being the vendor whose rationale records are already in customers' technical files | **A why-now, not a moat** |

### Where the moat actually comes from

The honest answer combines three things that compound per customer:

- **Accumulated, aligned bench memory and a calibrated dependency model.** Each release teaches Ripple which tests a given kind of change actually affected on that lab's rigs. The model is the customer's (inside Enclave), but it lives in Afterwave's product and format. A rival starts at zero.
- **Workflow embedding.** Once Ripple's selection and rationale are cited in release decisions and safety reviews, switching tools means proving the new one gives the same answers. That is re-validation on rigs: expensive and slow.
- **Generic know-how that does not require pooling data.** How firmware modules, fixtures and sensors tend to relate across many labs improves the product's starting model, without moving any customer's data. Do **not** call this a data network effect.

Physical platforms could add a fourth, later: hardware that arrives already instrumented puts Afterwave's capture on the rig from day one.`,
        },
        {
          kind: "matrix",
          title: "Defensibility map",
          xAxis: ["Easy to copy", "Hard to copy"],
          yAxis: ["Buyer cares little (today)", "Buyer cares a lot"],
          cells: [
            { label: "Table stakes", detail: "Private deployment, open export formats, security documentation, one-clock capture. Must have; cannot win alone." },
            { label: "Moat", detail: "Per-customer dependency model and history, Ripple rationale embedded in release gates and safety files." },
            { label: "Noise", detail: "Dashboards, UI polish, 'AI-native' claims." },
            { label: "Future bets", detail: "Afterwave's own instrumented test platforms; risk layer for insurers. Hard to copy, demand not yet proven." },
          ],
          caption: "Top row = buyer cares a lot. Spend product time in the top-right, keep the top-left good enough, ignore the bottom-left, and stage the bottom-right as later bets.",
        },
        {
          kind: "widget",
          widget: "change-impact",
          caption: "The mechanism behind the wedge: pick a changed firmware, model or rig artifact and see which tests the dependency graph flags and why. The defensible part is not the algorithm (copyable) but the calibrated graph of each customer's rigs and tests, built release after release.",
        },
        { kind: "equation", formula: "aw13-switching-cost" },
      ],
    },
    {
      layer: "applied",
      title: "Switching cost in numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Can a rival's discount or a bundle pull a customer away? (illustrative)",
          given: md`Illustrative, after two years of use at a hypothetical customer. Afterwave ACV EUR 80k. Migration of data and integrations EUR 20k. 120 test procedures reference Ripple's selection in their release gate; re-validating each on the new tool takes 6 rig-hours at EUR 100 per rig-hour. Retraining and process change EUR 15k. Horizon for the customer's decision: 3 years.`,
          steps: [
            { md: md`**Switching cost:** $S = 20{,}000 + 120 \times 6 \times 100 + 15{,}000 = 20{,}000 + 72{,}000 + 15{,}000 = \text{EUR } 107{,}000$.` },
            { md: md`**Rival offers 25 % off:** saving $0.25 \times 80{,}000 = 20{,}000$ per year; over 3 years EUR 60,000. Since $60{,}000 < 107{,}000$, the customer stays.` },
            { md: md`**Incumbent bundles a similar feature at zero extra cost** into a licence the customer already pays: saving EUR 80,000 per year, EUR 240,000 over 3 years. Since $240{,}000 > 107{,}000$, the customer is at risk, unless the bundled feature is clearly worse at the job.` },
            { md: md`**Without embedding** (Ripple used as an advisory dashboard, not cited in release gates): the re-validation term drops out, $S = \text{EUR } 35{,}000$, and even the 25 % discount (EUR 60,000 over 3 years) wins the customer.` },
          ],
          result: md`The re-validation term is two thirds of the switching cost, and it exists only if Ripple's output is part of the release decision. That is the product decision: design for Ripple to be cited in release gates and safety files, with open export so customers are not afraid of it. The real threat is not a discount from a startup but a bundle from an incumbent.`,
        },
        {
          kind: "question",
          question: {
            id: "aw13-l04-p1",
            type: "numeric",
            prompt: md`Illustrative: migration EUR 15k, 80 procedures to re-validate at 4 rig-hours each and EUR 120 per rig-hour, retraining EUR 10k. What is the switching cost $S$? (EUR)`,
            answer: 63400,
            tolerance: { rel: 0.005 },
            unit: "EUR",
            explanation: md`$S = 15{,}000 + 80 \times 4 \times 120 + 10{,}000 = 15{,}000 + 38{,}400 + 10{,}000 = \text{EUR } 63{,}400$. A rival saving the customer more than about EUR 21k per year over 3 years would overcome it.`,
            concepts: ["aw13.afterwave-switching-cost"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Building the moat on purpose",
      blocks: [
        {
          kind: "md",
          md: md`### Product decisions that deepen the position (for the team to decide, not promises)

- **Rationale as a first-class record.** Every selected and skipped test carries a written reason that can be exported into a release report or technical file. This is what gets cited.
- **The dependency model as a customer asset.** Visible, editable and owned by the customer's test lead (the script author from lesson 3). Ownership makes it theirs to defend.
- **Calibration loop.** After each release, compare what was selected with what actually failed, and record it. That history is the part a rival cannot buy.
- **Open export.** Data and models exportable in open formats. It sounds like it weakens lock-in; in practice it removes the main objection to embedding, and embedding is the real switching cost.
- **Integrations with incumbents, not replacements.** Read NI and Vector files, write back to TestStand and Xray. Each integration is fixed cost that also raises the bar for a new entrant.

### How investors will test the claim

They will ask for (later, once you have customers) releases processed per customer, the share of release decisions that cite Ripple, retention, and how much time a new customer needs before Ripple's selections are trusted. At seed, show the mechanism and the plan to measure these, not invented numbers.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Moat claims that backfire",
          md: md`- **"Data network effect."** Enclave keeps customer data private; cross-customer pooling is not available. Say "per-customer switching cost plus generic know-how".
- **"Nobody else does this."** Say "no vendor advertised rig-level change impact as of November 2026".
- **"First-mover advantage."** Being first only matters if it compounds into accumulated models and embedding.
- **"Our AI."** Models are copyable; calibrated per-customer history and embedded workflows are not.
- **"The regulation is our moat."** The EU Machinery Regulation is a reason to act now, and Ripple supports evidence; it does not make anyone compliant, and every competitor can read it.
- **Leading with the hardware platforms at seed.** It signals capital intensity before the software wedge is proven.`,
        },
        {
          kind: "checklist",
          title: "Moat slide: done when",
          items: [
            "It separates table stakes (Enclave, capture) from the wedge (Ripple) and the moat (accumulated models plus embedding)",
            "It names the metric that will prove each element once customers exist",
            "It contains no data network effect claim",
            "It acknowledges the bundle threat from incumbents and the feature threat from data platforms",
            "Ismail and Yusuf agree with every time-to-copy judgement",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw13-l04-p2",
            type: "short",
            prompt: md`**Write the honest defensibility memo for Afterwave's seed data room** (one page). Include: (1) each capability (one-clock capture, change impact, Enclave, physical platforms, team, regulatory timing) classified as table stakes, differentiator, moat or future bet, with the reason; (2) a time-to-copy judgement for the two most important, labelled as judgement; (3) the switching-cost mechanism for a test lab with an illustrative calculation; (4) three product decisions that strengthen the moat and the metric for each; (5) the two biggest competitive threats and your response.`,
            rubric: [
              "Classification is honest: Enclave as table stakes against Nominal and Sift, capture as a short-lived differentiator, Ripple as the wedge, moat from accumulation and embedding, platforms as a later bet",
              "Time-to-copy is labelled as judgement and reasoned from the competitor's data, team and priorities",
              "Switching cost includes re-validation on rigs and the arithmetic is correct, with the dependency on workflow embedding explained",
              "Product decisions are concrete (rationale records, customer-owned dependency model, calibration loop, open export, incumbent integrations) with measurable metrics",
              "Threats include a data platform adding change impact and an incumbent bundling a similar feature; no data network effect or 'nobody else does this' claims",
            ],
            modelAnswer: md`**1. Classification.** Enclave: table stakes (Nominal and Sift both advertise on-prem). One-clock capture: differentiator with a short shelf life (Nominal Connect already sits at the bench). Ripple: the wedge; no vendor advertised rig-level change impact as of Nov 2026. Moat: per-customer calibrated dependency models plus Ripple's rationale embedded in release gates. Physical platforms: future bet (hard to copy, capital-heavy, demand unproven). Team: advantage in learning speed and credibility, not a moat. Machinery Regulation (20 Jan 2027): why now, not a moat.

**2. Time to copy (team judgement).** Basic change-impact feature by a funded data platform: 12 to 24 months if prioritised, because they hold signals but not rig configuration history or test dependencies. Matching a customer's two-year calibrated model: not possible without that customer's history.

**3. Switching cost (illustrative).** EUR 20k migration + 120 procedures x 6 rig-hours x EUR 100 + EUR 15k retraining = EUR 107k. A 25 % discount on an EUR 80k ACV saves EUR 60k over three years: customer stays. Without embedding in release gates, S falls to EUR 35k and the discount wins.

**4. Decisions and metrics.** Rationale export into release reports (metric: share of releases whose report cites Ripple). Customer-owned dependency model (metric: edits by customer engineers per month). Calibration loop after each release (metric: releases processed per customer, missed regressions vs parallel full runs in pilots).

**5. Threats.** (a) Nominal or Sift adds test recommendations via agents: respond by winning the release-gate workflow early and integrating with their data rather than competing on it. (b) NI or Vector bundles a selection feature into existing licences: respond by being cross-tool (their assistant works inside their tools; Ripple models dependencies across vendors, rigs and firmware).`,
            explanation: md`Graded against the rubric. The investor is testing honesty as much as strategy: conceding table stakes makes the moat claim credible.`,
            concepts: ["aw13.feature-vs-moat", "aw13.table-stakes", "aw13.time-to-copy", "aw13.workflow-embedding", "aw13.afterwave-switching-cost", "aw13.platform-moat"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "An investor asks: 'What stops Nominal from building Ripple?' Answer in under a minute, honestly.",
          keyPoints: [
            "Nothing stops them from building a basic version; they have the money and agents on their data",
            "They hold signals, not the per-lab dependency model of firmware modules, rigs, fixtures and tests, nor its calibration history",
            "Once Ripple's rationale is cited in release gates and safety files, switching means re-validating on rigs",
            "Our segments (drives, actuators, humanoids) differ from their defence and space focus, which buys time but is not a moat",
            "We will measure the moat: releases processed per customer, share of release decisions citing Ripple, retention",
          ],
        },
        { kind: "xref", to: "fc06.switching-costs", note: "General definition of switching costs and lock-in; this lesson adds the rig re-validation term." },
        { kind: "sources", refs: ["aw13-r1", "aw13-r6", "aw13-r8", "aw13-r17", "aw13-r20", "aw13-r29"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw13-l04-q1",
      type: "mcq",
      prompt: "Against Nominal and Sift, Afterwave Enclave is best described as:",
      options: ["A moat", "Table stakes", "Noise", "A data network effect"],
      answer: 1,
      explanation: md`Both advertise on-prem or private deployment. Missing it would exclude you; having it does not win against them.`,
      concepts: ["aw13.table-stakes"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw13-l04-q2",
      type: "multi",
      prompt: "Which elements make up Afterwave's honest moat story?",
      options: [
        "Per-customer calibrated dependency models and history",
        "Ripple rationale embedded in release gates and safety files",
        "A data network effect from pooling customers' bench data",
        "Generic know-how that improves the starting model without moving customer data",
        "Being first to market",
      ],
      answer: [0, 1, 3],
      explanation: md`Data stays private in Enclave, so pooling is not available. Being first is not a moat unless it compounds into accumulation and embedding.`,
      concepts: ["aw13.feature-vs-moat", "aw13.workflow-embedding"],
      difficulty: 2,
    },
    {
      id: "aw13-l04-q3",
      type: "numeric",
      prompt: md`Illustrative: switching cost EUR 90k; a rival offers 30 % off an EUR 100k ACV. Over what horizon (years) does the rival's cumulative saving equal the switching cost?`,
      answer: 3,
      tolerance: { abs: 0.05 },
      unit: "yr",
      explanation: md`Saving $0.30 \times 100{,}000 = 30{,}000$ per year; $90{,}000 / 30{,}000 = 3$ years. A customer deciding on a horizon longer than 3 years would be tempted.`,
      concepts: ["aw13.afterwave-switching-cost"],
      difficulty: 2,
    },
    {
      id: "aw13-l04-q4",
      type: "mcq",
      prompt: "In the worked example, why does the switching cost fall from EUR 107k to EUR 35k without workflow embedding?",
      options: [
        "Because migration gets cheaper",
        "Because the re-validation of procedures on rigs only arises if Ripple's selection is part of the release decision",
        "Because retraining is free",
        "Because the rival pays the migration",
      ],
      answer: 1,
      explanation: md`If Ripple is advisory only, a new tool does not need to prove it gives the same release decisions: the EUR 72k re-validation term disappears.`,
      concepts: ["aw13.workflow-embedding", "aw13.afterwave-switching-cost"],
      difficulty: 2,
    },
    {
      id: "aw13-l04-q5",
      type: "decision",
      prompt: md`Your seed deck draft has a slide titled "Our moat: proprietary AI and first-mover advantage". What do you change it to?`,
      options: [
        { text: "\"Wedge: change impact (none advertised, Nov 2026). Moat: per-customer calibrated models plus Ripple embedded in release gates. Table stakes: on-prem Enclave. Metrics we will track.\"", score: 1, feedback: "Honest, mechanism-based and testable." },
        { text: "\"Our moat: data network effects across all customers.\"", score: 0, feedback: "False for a product that keeps data private per customer; a diligence red flag." },
        { text: "Keep it, but add a bigger funding comparison to Nominal.", score: 0.1, feedback: "Funding comparisons say nothing about defensibility." },
        { text: "\"Our moat: our own hardware test platforms.\"", score: 0.3, feedback: "Possibly later, but leading with capital-heavy hardware at seed confuses the story." },
      ],
      explanation: md`Name the wedge, the compounding mechanism and the table stakes, with metrics.`,
      concepts: ["aw13.feature-vs-moat", "aw13.table-stakes"],
      difficulty: 2,
    },
    {
      id: "aw13-l04-q6",
      type: "mcq",
      prompt: "Why are Afterwave's own instrumented test platforms classed as a 'future bet' rather than the seed-stage moat?",
      options: [
        "Because software competitors can copy them in months",
        "Because they are hard to copy but capital-heavy and their demand is not yet proven",
        "Because buyers never buy test hardware",
        "Because the EU Machinery Regulation forbids it",
      ],
      answer: 1,
      explanation: md`Hardware is hard for software rivals to match, and instrumented platforms would feed bench memory from day one, but capex and unproven demand make it a later stage, after the software wedge.`,
      concepts: ["aw13.platform-moat"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw13-l04-f1", front: "Three questions for every advantage", back: "Does the buyer care a lot? Do alternatives lack it? Would it survive two years of a funded rival copying it?", concepts: ["aw13.feature-vs-moat"] },
    { id: "aw13-l04-f2", front: "Table stakes", back: "Required to be shortlisted, cannot win the deal. For Afterwave vs Nominal and Sift: private deployment.", concepts: ["aw13.table-stakes"] },
    { id: "aw13-l04-f3", front: "Afterwave's wedge vs moat", back: "Wedge: Ripple change impact. Moat: per-customer calibrated models plus Ripple embedded in release gates and safety files.", concepts: ["aw13.feature-vs-moat", "aw13.workflow-embedding"] },
    { id: "aw13-l04-f4", front: "Switching cost formula", back: md`$S = C_{mig} + N_p h_p c_h + C_{train}$; customer stays while $\Delta p \cdot T < S$.`, concepts: ["aw13.afterwave-switching-cost"] },
    { id: "aw13-l04-f5", front: "The bigger switching threat", back: "An incumbent bundling a similar feature at zero extra cost, not a startup's discount.", concepts: ["aw13.afterwave-switching-cost"] },
    { id: "aw13-l04-f6", front: "Never claim (moat)", back: "Data network effect; 'nobody else does this'; regulation as moat; first-mover as moat.", concepts: ["aw13.feature-vs-moat"] },
  ],
};

export default lesson;
