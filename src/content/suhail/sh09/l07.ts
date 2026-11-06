import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh09-l07",
  title: "A research agenda for Suhail: what a volunteer research arm can do, and how to review proposals",
  summary:
    "The Gulf states are building sovereign models with sovereign compute. A volunteer-heavy research arm cannot compete there and should not try. It can lead where the binding constraints are people, languages and trust: benchmarks, datasets, evaluations, tokenizer studies and fine-tunes of open models. This lesson places project types on a compute versus community-leverage map, budgets a first-year portfolio, and gives you a proposal review procedure with stage gates and kill criteria.",
  minutes: 75,
  objectives: [
    "Separate projects a volunteer research arm can lead from those that need sovereign-scale compute and teams",
    "Budget a research portfolio in GPU-hours, illustrative cost and volunteer hours",
    "Review a research proposal against a fixed checklist: question, baseline, evaluation statistics, contamination, data rights, compute and memory arithmetic, team, release",
    "Set stage gates and kill criteria for research projects",
    "Write Suhail's first-year research agenda",
  ],
  concepts: [
    { id: "sh09.research-portfolio", name: "Volunteer research portfolio", description: "The set of projects a community research arm runs, chosen where its advantage (native speakers across many countries, events, neutrality) matters and compute needs are small: benchmarks, datasets, evaluations, tokenizer studies, fine-tunes.", competency: "sh-research", related: ["sh09.cost-ladder", "sh09.dialect-mix"] },
    { id: "sh09.sovereign-scale", name: "Sovereign-scale work", description: "Pretraining large models from scratch, with 10^23 FLOP or more, hundreds of billions of curated Arabic tokens and full-time teams, as done by HUMAIN and SDAIA, TII, G42 with MBZUAI and Inception, and QCRI. Partner with it; do not replicate it.", competency: "sh-research", related: ["sh09.compute-optimal"] },
    { id: "sh09.proposal-review", name: "Research proposal review", description: "A fixed procedure for judging a proposal: clear question and baseline, evaluation with error bars and contamination controls, data rights, compute and memory arithmetic, realistic people-hours, release plan and licence compatibility, and kill criteria.", competency: "sh-research", related: ["sh09.eval-statistics", "sh09.data-rights"] },
    { id: "sh09.stage-gates", name: "Stage gates and kill criteria for research", description: "Breaking a project into small, cheap steps with a pre-agreed measurable result needed to unlock the next step, and stopping when it is not met.", competency: "sh-research", related: ["fc01.kill-criteria", "sh09.proposal-review"] },
    { id: "sh09.open-release", name: "Open release and licence compatibility", description: "Choosing licences for code (for example Apache-2.0), data (CC BY 4.0, CC0) and weights, and checking that a fine-tune's licence is compatible with the base model's licence (for example custom model licences with use restrictions).", competency: "sh-research", related: ["sh09.data-rights"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Where a community research arm has leverage",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You will lead the research arm without being its researcher. Your job is to choose the portfolio, protect the volunteers' time, secure compute and data partners, and say no to projects that would burn credibility or money. The previous six lessons gave you the arithmetic; this one turns it into an agenda and a review procedure you can run every month.`,
        },
        {
          kind: "md",
          md: md`### The regional landscape you are positioning against (late 2026, from the research brief)

- **Saudi Arabia**: HUMAIN (PIF) runs HUMAIN Chat on ALLaM 34B (weights apparently not public, unverified); SDAIA published ALLaM-7B-Instruct-preview (5.2 T English and Arabic tokens) and, with KSGAAL and partners, the BALSAM benchmark. HUMAIN's data-centre build-out targets gigawatt scale.
- **UAE**: Jais 2 (70 B, open weights, about 600 B Arabic tokens, December 2025) from Inception (G42), Cerebras and MBZUAI; K2 Think (MBZUAI and G42); TII's Falcon-H1 Arabic (3 B, 7 B, 34 B, January 2026). Stargate UAE is under construction.
- **Qatar**: QCRI's Fanar (Fanar-1-9B on Hugging Face); Qai's USD 20 bn infrastructure joint venture with Brookfield.
- **Kuwait**: no notable national open-weight LLM found; a Microsoft partnership announced an AI-powered Azure region and data centre.
- **Independent**: SILMA (models and the ABBL leaderboard), AceGPT (academic).

Pretraining frontier Arabic models is a solved organisational problem in the region: it is done by state-backed labs with sovereign compute. What is **not** solved, and what the 2025 survey of Arabic LLM evaluation lists as gaps: trustworthy, uncontaminated evaluation; dialect coverage; cultural grounding; and data that can be openly released.

### What each project type needs`,
        },
        {
          kind: "md",
          md: md`| Project type | Compute (Lesson 4) | People | Community leverage | Fit for Suhail |
|---|---|---|---|---|
| Tokenizer and cost studies | None | 1 to 3 people, weeks | Medium (dialect samples) | Excellent first project |
| Benchmarks (native, dialect, cultural, builder tasks) | Tens of GPU-hours for evaluation | 20 to 50 item writers and reviewers | Very high: native speakers across countries | Core |
| Evaluation harness and independent leaderboard | Hundreds of GPU-hours a year | 2 to 4 engineers | High: neutrality | Core |
| Consented datasets (dialect text, speech transcripts, instructions, preferences) | None to little | Many contributors, a few curators | Very high | Core |
| LoRA SFT and DPO of open models | 1 to 100 GPU-hours | 1 to 3 engineers plus data | Medium | Good, as demonstrations of the data |
| Continued pretraining of 7B to 9B on new Arabic data | Thousands of GPU-hours | 2 to 4 experienced engineers | Low to medium | Only with a sponsor and ready data |
| Pretraining from scratch (7 B and up) | Tens of thousands to millions of GPU-hours | Full-time team | Low | No: partner instead |`,
        },
        {
          kind: "matrix",
          title: "Compute need versus community leverage",
          xAxis: ["Low community leverage", "High community leverage"],
          yAxis: ["Low compute", "High compute"],
          cells: [
            { label: "Partner or skip", detail: "Pretraining from scratch, large continued pretraining. Offer Suhail's data and evaluations to the sovereign labs instead." },
            { label: "Sponsor-dependent", detail: "Continued pretraining on community-collected dialect data, speech models. Only with committed compute and finished data." },
            { label: "Opportunistic", detail: "Generic LoRA fine-tunes, demos. Fine at hackathons; do not brand as research." },
            { label: "Suhail's home ground", detail: "Native and dialect benchmarks, consented datasets, independent evaluation, tokenizer studies." },
          ],
          caption: "Top row is high compute. Start in the bottom-right cell; earn the top-right.",
        },
        {
          kind: "md",
          md: md`### Release and licence compatibility

- **Code**: Apache-2.0 or MIT. **Data**: CC BY 4.0 (attribution) or CC0, only where every source permits (Lesson 6). **Benchmarks**: open dev set, private test set.
- **Weights of a fine-tune** inherit the base model's licence terms. Some regional models use custom licences (Falcon-H1 Arabic is released under the Falcon LLM License; check the terms of each base model on its model card for use restrictions, attribution and redistribution). A LoRA adapter is still a derivative to check.
- **Authorship**: agree before work starts. A contributor taxonomy such as CRediT (conceptualisation, data curation, software, validation, writing) lets volunteers get visible credit, which is part of what Suhail offers in place of pay.

### Reviewing a proposal

Every proposal gets the same review, in this order, because the early items are cheap to check and kill most bad proposals:

1. **Question**: one sentence, falsifiable, with a reason Arab builders care.
2. **Prior work**: does BALSAM, OALL, ArabicMMLU, an existing corpus or model already answer it?
3. **Baseline**: what is compared with what, under the same prompt and harness?
4. **Evaluation**: metric, item count with the standard error, paired tests, contamination checks (Lesson 5).
5. **Data**: sources, rights, consent, personal data, per-variety counts (Lesson 6).
6. **Compute**: $N$, $D$, $C = 6ND$, GPU type, MFU from a measured test, memory (16 bytes per parameter for full training), overhead factor (Lesson 4).
7. **People**: named roles and hours, compared with what volunteers actually deliver.
8. **Stage gates**: the cheapest first step and the result that unlocks the next.
9. **Release**: licences, base-model licence compatibility, authorship, datasheet and model card.`,
        },
        {
          kind: "flow",
          title: "Stage-gated research project",
          steps: [
            { label: "Gate 0: one-page proposal", detail: "Question, prior work, baseline; review in 30 minutes" },
            { label: "Gate 1: pilot", detail: "100 items, 1 % of the data, or a 1 B-token test run; measures speed, agreement, MFU" },
            { label: "Gate 2: full build", detail: "Only if the pilot meets the pre-agreed numbers" },
            { label: "Gate 3: evaluation and review", detail: "Intervals, contamination report, internal red team" },
            { label: "Gate 4: release", detail: "Licences, datasheet or model card, announcement" },
          ],
          caption: "Each gate is a decision with a written criterion. Most of the risk is retired at Gate 1 for 5 to 10 % of the cost.",
        },
        { kind: "xref", to: "fc01.kill-criteria", note: "Founder Core's kill criteria apply to research projects too: write the stopping rule before the work starts." },
        { kind: "xref", to: "fc01.staged-bets", note: "Stage gates are staged bets: small, cheap steps that buy information before larger commitments." },
        { kind: "sources", refs: ["sh09-r27", "sh09-r28", "sh09-r41", "sh09-r42", "sh09-r43", "sh09-r44"] },
      ],
    },
    {
      layer: "applied",
      title: "Budgeting a first-year portfolio",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Suhail Research, 2027 portfolio (illustrative)",
          given: md`Five candidate projects. Compute at an illustrative USD 2.50 per H100-hour; volunteer hours estimated from Lessons 5 and 6 (item writing 6 items per hour, review 30 per hour, sentence contribution 60 per hour). The pool is 20 active volunteers giving 4 hours a week each (a target, not a fact).`,
          steps: [
            { md: md`**Token tax note**: 0 GPU-hours; about 150 volunteer hours.` },
            { md: md`**Khaleeji-Bench** (2,700 items): writing $2{,}700/6 = 450$ h, review $2{,}700/30 = 90$ h, total 540 h. Evaluation of 10 open models: about 12 GPU-hours of inference, budget 50 with overhead (USD 125).` },
            { md: md`**Lahajat v1** (20,000 sentences): contributions $20{,}000/60 = 333$ h, validation of 10 % at 60 per hour $= 33$ h, about 370 h. No compute.` },
            { md: md`**Suhail-Chat** LoRA SFT plus DPO: 100 GPU-hours with ablations (USD 250); about 400 h of instruction and preference writing and review.` },
            { md: md`**Continued-pretraining experiment** (optional, sponsor-dependent): 6,000 GPU-hours with overhead (USD 15,000), about 600 h of data work by experienced volunteers.` },
            { md: md`**Totals**: without the optional project, 150 GPU-hours (USD 375) and 1,460 volunteer hours; with it, 6,150 GPU-hours (USD 15,375) and 2,060 hours.` },
            { md: md`**Capacity**: 20 volunteers at 4 h a week is 80 h a week, so 1,460 h is about 18 weeks of the whole pool and 2,060 h about 26 weeks, before coordination overhead and drop-off. Volunteer hours, not GPUs, are the binding constraint.` },
          ],
          result: md`The core portfolio costs under USD 400 in compute and about 1,460 volunteer hours. The optional continued-pretraining run multiplies the compute cost by 40 for one experiment. Run it only if a sponsor commits the compute and Lahajat-style data is already finished.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Reviewing the numbers in a proposal",
          given: md`A proposal: "Fine-tune a 34B model fully (not LoRA) on 2 B tokens of Arabic instructions, on 8 H100s, at 45 % MFU, in one week."`,
          steps: [
            {
              md: md`Compute: $6 \times 34\text{e}9 \times 2\text{e}9 = 4.08 \times 10^{20}$ FLOP; GPU-hours $= 4.08\text{e}20 / (0.45 \times 989\text{e}12 \times 3{,}600) = 255$ GPU-hours, about 32 hours on 8 GPUs. Time is fine.`,
              hidden: true,
              check: { prompt: "GPU-hours", answer: 255, unit: "GPU-h", tolerance: { rel: 0.02 } },
            },
            {
              md: md`Memory: $16 \times 34\text{e}9 = 544$ GB of state against $8 \times 80 = 640$ GB, leaving 96 GB (12 GB per GPU) for activations.`,
              hidden: true,
              check: { prompt: "Training state memory (GB)", answer: 544, unit: "GB", tolerance: { rel: 0.01 } },
            },
            { md: md`**Verdict**: feasible only with full sharding and aggressive checkpointing; 45 % MFU is optimistic for that setup. And 2 B tokens of Arabic **instructions** is about 1,000 times more SFT data than any community can write natively, so most of it would be translated or synthetic. Ask for LoRA on a smaller model with 5,000 native examples first.` },
          ],
          result: md`The compute fits; the memory barely fits; the data does not exist. The data question kills or reshapes the proposal before any GPU is booked.`,
        },
        {
          kind: "question",
          question: {
            id: "sh09-l07-p1",
            type: "numeric",
            prompt: md`A research arm has 15 active volunteers at 3 hours a week. A benchmark project needs 1,200 volunteer hours. How many weeks of the whole pool does it take (ignoring overhead)?`,
            answer: 26.7,
            tolerance: { abs: 0.1 },
            unit: "weeks",
            explanation: md`$15 \times 3 = 45$ hours a week; $1{,}200/45 = 26.7$ weeks, half a year for one project. Plan for drop-off: real throughput is often well below the pledged hours.`,
            concepts: ["sh09.research-portfolio"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the research arm",
      blocks: [
        {
          kind: "md",
          md: md`### Operating model

- **Roles**: a research lead (technical, reviews methods), project leads per project, a data steward (rights, consent, personal data), and an evaluation maintainer. You chair the monthly portfolio review and own partner relationships (compute providers, universities, sovereign labs, publishers).
- **Rhythm**: proposals reviewed monthly against the checklist; each active project reports its gate status; results go to an internal red team before release.
- **Partners**: offer sovereign labs what they lack: neutral evaluation, dialect data with consent, and a builder community that uses their models. Ask in return for compute, model access and co-authorship, never for control of Suhail's results.
- **Venues**: the ArabicNLP workshop and conference series at ACL venues, Hugging Face releases, and the Suhail newsletter and The Majlis podcast for builders.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How community research arms fail",
          md: md`- **Announcing a model** before a benchmark, so there is nothing to show the model is good.
- **Leaderboards on public test sets** that are gamed within months.
- **Sponsor capture**: the compute donor's model always wins Suhail's evaluation.
- **Volunteer burn-out** from projects with no gates and no end date.
- **Data with no rights**: a year of work that cannot be released.
- **Credit disputes** because authorship was not agreed up front.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Independence rules to adopt from day one",
          md: md`Publish the evaluation method before running sponsors' models; evaluate every model with the same harness and settings; disclose all funding and compute donations on every result; let no sponsor see results before others; and keep the private test set under Suhail's control.`,
        },
        { kind: "scenario", scenario: "sh09-s2" },
        {
          kind: "question",
          question: {
            id: "sh09-l07-p2",
            type: "short",
            prompt: md`Write **Suhail Research: 2027 agenda** (one page). Include the mission in one sentence, three to five projects with the question each answers, compute and volunteer-hour estimates with the arithmetic, the first stage gate and kill criterion for each, the partners you would approach and what you offer them, release and licence policy, and independence rules. Mark all numbers as illustrative targets.`,
            rubric: [
              "Mission focused on evaluation, data and open tooling for Arabic AI, explicitly not pretraining frontier models",
              "Three to five projects in the low-compute, high-community-leverage space, each with a falsifiable question",
              "Compute and volunteer-hour arithmetic consistent with the module (6ND or 4ND, GPU-hours, items per hour) and labelled illustrative",
              "A first stage gate with a measurable criterion and a kill criterion for each project",
              "Partners named by type or from the research brief (sovereign labs, universities, compute providers) with a clear give and get, and independence rules",
              "Release policy: open code and dev data with licences, private test sets, datasheets and model cards, authorship agreed up front",
            ],
            modelAnswer: md`**Suhail Research: 2027 agenda (illustrative targets)**

**Mission**: make Arabic AI measurable and open, through native benchmarks, consented dialect data and independent evaluation, so Arab builders can choose and improve models on evidence.

| Project | Question | Compute | Volunteer h | Gate 1 (by) | Kill if |
|---|---|---|---|---|---|
| Token tax note | How much more do Arab builders pay per sentence, by variety and tokenizer? | 0 | 150 | Protocol and 1,000-sentence pilot (Feb) | Results duplicate an existing study |
| Khaleeji-Bench | Do models understand and answer naturally in Gulf Arabic? | About 50 GPU-h of evaluation (USD 125) | 540 | 100 pilot items, second-review agreement kappa of at least 0.7 (Apr) | Kappa below 0.6 after one revision |
| Lahajat v1 | Consented dialect sentences across 12 varieties | 0 | 370 | 2,000 sentences, at least 6 varieties with 100 or more (Mar) | Fewer than 6 varieties by June |
| Suhail-Chat LoRA | Does 5,000 native examples plus DPO beat the base instruct model for builders? | About 100 GPU-h (USD 250) | 400 | 500 examples, paired win rate on 200 held-out prompts (Jun) | Win rate interval includes 50 % after 2,000 examples |

**Not in 2027**: pretraining or continued pretraining, unless a partner commits at least 6,000 H100-hours and Lahajat is released.

**Partners**: sovereign labs (TII, MBZUAI and Inception, QCRI, SDAIA and HUMAIN) get neutral evaluation of their models on Khaleeji-Bench and early access to Lahajat; we ask for compute, model access and co-authorship. Universities in Kuwait, Egypt and the Levant get annotation projects for students and co-authorship. Compute providers get acknowledgment and builder reach, with no claim on results.

**Release**: code Apache-2.0; data CC BY 4.0 with datasheets; benchmark dev set public, test set private and server-scored with a canary; fine-tunes only where the base licence allows, with model cards; CRediT authorship agreed at Gate 0.

**Independence**: method published before evaluation; same harness for all; funding disclosed on every result; no sponsor preview.

**Capacity check**: 1,460 hours across 20 volunteers at 4 h a week is about 18 weeks of the whole pool; projects run in parallel with staggered gates.`,
            explanation: md`A credible agenda stays in the low-compute, high-leverage quadrant, prices every project in GPU-hours and volunteer hours, gates each one, and protects independence.`,
            concepts: ["sh09.research-portfolio", "sh09.stage-gates", "sh09.open-release", "sh09.proposal-review"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a Suhail board member why the research arm will not build its own large Arabic model in 2027, and why that makes it more valuable, not less.",
          keyPoints: [
            "Pretraining a competitive model costs hundreds of thousands to millions of dollars of compute and needs data and full-time teams; state-backed labs already do it",
            "What the region lacks is trustworthy evaluation, dialect data with consent and independent comparison",
            "Those need native speakers across many countries and neutrality, which is what a community has",
            "Good benchmarks and data shape what every lab builds, so Suhail gains influence and partners instead of competing with them",
          ],
        },
        { kind: "widget", widget: "concept-map", props: { module: "sh09" }, caption: "How the module's concepts connect: pipeline, tokens, scaling, cost, evaluation, data and the agenda." },
      ],
    },
  ],
  quiz: [
    {
      id: "sh09-l07-q1",
      type: "multi",
      prompt: "Which projects fit a volunteer-heavy research arm with little compute?",
      options: [
        "A native Gulf-dialect benchmark with a private test set",
        "Pretraining a 30 B Arabic model from scratch",
        "A consented, dialect-labelled sentence dataset",
        "A tokenizer fertility study across varieties",
        "LoRA fine-tunes of open models on community-written instructions",
      ],
      answer: [0, 2, 3, 4],
      explanation: md`Pretraining a 30 B model at the Chinchilla optimum is about $10^{23}$ FLOP and 600 B tokens: sovereign scale.`,
      concepts: ["sh09.research-portfolio", "sh09.sovereign-scale"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh09-l07-q2",
      type: "order",
      prompt: "Order the proposal review steps from cheapest to check to most expensive.",
      items: ["Is the question clear and not already answered by prior work?", "Is there a baseline and an evaluation with error bars?", "Are the data rights and consent in place?", "Do the compute and memory numbers work?", "Does the release plan respect all licences?"],
      explanation: md`The early checks are minutes of reading and kill most weak proposals; the later checks need arithmetic and legal reading.`,
      concepts: ["sh09.proposal-review"],
      difficulty: 2,
    },
    {
      id: "sh09-l07-q3",
      type: "mcq",
      prompt: "A volunteer fine-tunes a base model released under a custom licence with use restrictions and wants to release the LoRA adapter under Apache-2.0. What must be checked first?",
      options: [
        "Nothing: adapters are separate files",
        "Whether the base licence covers derivatives such as adapters and what terms it imposes on redistribution and use",
        "Whether Apache-2.0 allows commercial use",
        "Whether the adapter is smaller than 100 MB",
      ],
      answer: 1,
      explanation: md`An adapter only works with the base weights and is generally treated as a derivative; the base licence's terms travel with it.`,
      concepts: ["sh09.open-release"],
      difficulty: 2,
    },
    {
      id: "sh09-l07-q4",
      type: "numeric",
      prompt: md`A proposal: full fine-tune of a 13 B model on 500 M tokens. Training compute in units of $10^{19}$ FLOP?`,
      answer: 3.9,
      tolerance: { rel: 0.01 },
      unit: "× 10^19 FLOP",
      explanation: md`$6 \times 13\text{e}9 \times 5\text{e}8 = 3.9 \times 10^{19}$ FLOP, about 27 H100-hours at 40 % MFU; memory $16 \times 13 = 208$ GB of state.`,
      concepts: ["sh09.proposal-review"],
      difficulty: 2,
    },
    {
      id: "sh09-l07-q5",
      type: "decision",
      prompt: "A compute sponsor offers 10,000 GPU-hours on condition that its own model is evaluated first and the results are shared with it a week before publication. What do you do?",
      options: [
        { text: "Accept the compute but decline both conditions; offer acknowledgment and the same pre-published method that every model gets", score: 1, feedback: "Independence is the asset that makes the evaluation worth anything, including to the sponsor." },
        { text: "Accept both conditions; the compute is valuable", score: 0.1, feedback: "The first result Suhail publishes would be seen as bought." },
        { text: "Refuse the compute entirely", score: 0.5, feedback: "Unnecessary if the conditions can be negotiated away." },
        { text: "Accept but only show them their own scores early", score: 0.3, feedback: "Still a preview others do not get; discloses nothing about method but breaks equal treatment." },
      ],
      explanation: md`Adopt independence rules before the first sponsor conversation, so the answer is policy, not negotiation.`,
      concepts: ["sh09.research-portfolio"],
      difficulty: 2,
    },
    {
      id: "sh09-l07-q6",
      type: "mcq",
      prompt: "What makes a good Gate 1 for a new benchmark project?",
      options: [
        "Publishing the full benchmark",
        "100 pilot items with a measured writing speed and second-reviewer agreement above a pre-set kappa",
        "A launch event",
        "Evaluating 20 models",
      ],
      answer: 1,
      explanation: md`A pilot that measures the two quantities that sink benchmark projects (throughput and agreement) for a few percent of the cost.`,
      concepts: ["sh09.stage-gates"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh09-l07-f1", front: "Suhail Research's home ground", back: "Low compute, high community leverage: native and dialect benchmarks, consented datasets, independent evaluation, tokenizer studies.", concepts: ["sh09.research-portfolio"] },
    { id: "sh09-l07-f2", front: "Sovereign-scale work in the region", back: "HUMAIN and SDAIA (ALLaM), TII (Falcon-H1 Arabic), G42, MBZUAI and Inception (Jais 2, K2 Think), QCRI (Fanar). Partner, do not replicate.", concepts: ["sh09.sovereign-scale"] },
    { id: "sh09-l07-f3", front: "Nine review questions", back: "Question, prior work, baseline, evaluation statistics, data rights, compute and memory, people, stage gates, release.", concepts: ["sh09.proposal-review"] },
    { id: "sh09-l07-f4", front: "Stage gate", back: "A cheap step with a pre-agreed measurable result that must be met before the next, more expensive step.", concepts: ["sh09.stage-gates"] },
    { id: "sh09-l07-f5", front: "Fine-tune licences", back: "Weights and adapters inherit the base model's licence terms; check them before choosing a release licence.", concepts: ["sh09.open-release"] },
    { id: "sh09-l07-f6", front: "Binding constraint of a volunteer research arm", back: "Volunteer hours, not GPUs: 1,460 hours is about 18 weeks of 20 people at 4 hours a week.", concepts: ["sh09.research-portfolio"] },
  ],
  scenarios: [
    {
      id: "sh09-s2",
      title: "\"Let's build Suhail-7B\"",
      dayInLife: true,
      context: md`January 2027, the first research-arm meeting. An enthusiastic volunteer engineer proposes training "Suhail-7B", an Arabic model from scratch, and says a sponsor has hinted at "a lot of credits". The Partnerships lead loves the headline.`,
      start: "a",
      concepts: ["sh09.proposal-review", "sh09.cost-ladder", "sh09.research-portfolio"],
      nodes: {
        a: {
          md: md`The volunteer says: "7 B parameters, 2 T tokens, we can do it in a month." What do you do in the meeting?`,
          choices: [
            { text: "Do the arithmetic live: 6 × 7e9 × 2e12 = 8.4e22 FLOP, about 59,000 H100-hours at 40 % MFU, about USD 150,000 for a clean run at an illustrative USD 2.50/h; then ask where 2 T tokens with Arabic rights come from", next: "b", score: 10, feedback: "Numbers turn enthusiasm into a decision without dismissing the person." },
            { text: "Approve it: the headline will attract sponsors", next: "c", score: 1, feedback: "A pretraining project with no data or compute is a headline you cannot deliver." },
            { text: "Reject it outright as unrealistic", next: "b", score: 5, feedback: "Probably the right outcome, but a volunteer you dismiss leaves. Show the arithmetic and offer a path." },
          ],
        },
        b: {
          md: md`The room accepts that from-scratch pretraining is out. The volunteer is disappointed. The sponsor's "credits" turn out to be an illustrative USD 25,000 valid for six months.`,
          choices: [
            { text: "Offer the volunteer the lead of the Suhail-Chat LoRA project plus the evaluation harness, with the credit plan from Lesson 4 and a Gate 1 in three months", next: "d", score: 10, feedback: "Keeps the talent, uses the credits where they buy real results." },
            { text: "Use the USD 25,000 for a 1B model from scratch so there is still a 'Suhail model'", next: "d", score: 3, feedback: "A 1B from scratch on limited Arabic data will be worse than every open model you could fine-tune; it buys a name, not a result." },
          ],
        },
        c: {
          md: md`Three months later: no data pipeline, the credits expire unused, and the announced model becomes a recurring question in every partner meeting.`,
          choices: [
            { text: "Publicly reframe as an evaluation and data agenda, and explain why", score: 5, feedback: "Recoverable, at a cost in credibility that the arithmetic would have avoided." },
          ],
        },
        d: {
          md: md`The Partnerships lead asks what to tell sponsors instead of "Suhail-7B".`,
          choices: [
            { text: "\"Suhail builds the benchmarks and data that tell the region which Arabic models work for builders, and makes every model better through open, consented dialect data.\"", score: 10, feedback: "A position you can deliver and that makes the sovereign labs partners rather than competitors." },
            { text: "\"Suhail will have its own model next year.\"", score: 2, feedback: "Repeats the promise you just decided not to make." },
          ],
        },
      },
    },
  ],
};

export default lesson;
