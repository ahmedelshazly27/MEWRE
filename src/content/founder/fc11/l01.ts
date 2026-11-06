import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc11-l01",
  title: "The brief: one venture, one round, five artifacts",
  summary:
    "What a complete seed round package contains (financial model, deck narrative, cap table and round design, investor list and outreach plan, data room index), the bar each part must clear, how to size the round from a milestone, and how to choose which of your ventures to build it for.",
  minutes: 60,
  objectives: [
    "You can list the five artifacts of a seed package and say what question each answers for an investor.",
    "You can state the bar each artifact must clear and the failure that sinks it most often.",
    "You can size a seed round from a milestone, a burn plan, a buffer and current cash, and check runway and dilution.",
    "You can write a one-sentence round thesis that ties amount, milestone, time and instrument together.",
    "You can choose the venture for the capstone with explicit criteria, including whether venture capital is the right money at all.",
  ],
  concepts: [
    {
      id: "fc11.seed-package",
      name: "Seed round package",
      description:
        "The five artifacts a founder needs before the first investor meeting: driver-based financial model, deck narrative, cap table and round design, investor list with outreach plan, and data room index. Together they tell one consistent story.",
      competency: "fc-fundraising",
    },
    {
      id: "fc11.package-bar",
      name: "The bar for each artifact",
      description:
        "The pass criteria an experienced investor applies: numbers that reconcile across artifacts, claims backed by evidence, assumptions visible and sourced, and a plan that turns the money into a specific milestone.",
      competency: "fc-fundraising",
    },
    {
      id: "fc11.round-thesis",
      name: "Round thesis",
      description:
        "One sentence: EUR X buys milestone Y in Z months on instrument W. Every other artifact must be consistent with it.",
      competency: "fc-fundraising",
    },
    {
      id: "fc11.raise-sizing",
      name: "Milestone-based raise sizing",
      description:
        "Size the round as average planned net burn times months to the milestone, plus a buffer, minus cash in hand; then check runway (18 to 24 months) and dilution (roughly 15 to 25 %).",
      competency: "fc-fundraising",
      related: ["m10.model-structure"],
    },
    {
      id: "fc11.venture-selection",
      name: "Venture-to-capital fit",
      description:
        "Not every venture should raise venture capital. The package must match the venture's funding model: VC for a venture-scale, fast-growing company; grants, sponsorship or revenue for a community or a services-led business.",
      competency: "fc-fundraising",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What the package is and the bar it must clear",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You run three ventures and you own fundraising in each. Afterwave has applied to YC W27 and you are weighing Zurich; whichever way that goes, the next conversation with a serious investor will ask for a model, a deck, a cap table and a data room within days. A founder who walks in with all five artifacts already reconciled raises faster, on better terms, and loses less time to follow-up questions. This capstone makes you build that package once, properly, for one venture, so the next raise is an update and not a scramble.`,
        },
        {
          kind: "md",
          md: md`### The five artifacts

A seed round package is not a deck. The deck is the trailer; the package is the film. An investor who likes the trailer will ask for everything else, and how fast and how cleanly you produce it is itself evidence about how you run a company.

| Artifact | The investor's question it answers | The bar it must clear | The failure that sinks it |
|---|---|---|---|
| **1. Financial model** | How much do you need, what does it buy, and when do you run out? | Driver-based (customers, price, hires), monthly for 24 months, assumptions on one sheet with sources, raise size derived from it | Revenue drawn as a hockey stick with no drivers; burn that ignores the hiring plan |
| **2. Deck narrative** | Why is this big, why now, why you, and why should I believe it? | 10 to 14 slides; each slide makes one claim with one piece of evidence; the ask is a specific amount for a specific milestone | Feature tour; top-down market; traction slide that mixes pilots, LOIs and revenue |
| **3. Cap table and round design** | What do I get, what do founders keep, what will the next round look like? | Fully diluted table before and after; instrument chosen with a reason; pool sized from a hiring plan; Series A dilution shown | Founders already below about 50 % after seed; SAFEs stacked without modelling conversion |
| **4. Investor list and outreach plan** | (Not shown to investors.) Will this process close in 8 to 10 weeks? | 50 to 100 qualified names, tiered, with thesis fit and a warm path for each; sequenced so meetings cluster; funnel maths that yields at least 2 term sheets | Twenty names, all tier one, contacted one by one over four months |
| **5. Data room index** | Can I verify everything you said in a week? | Every claim in the deck has a document behind it; corporate, cap table, IP and contracts clean; nothing in it contradicts the deck | IP not assigned to the company; a contract that says "pilot" where the deck says "customer" |

### The one-story test

The five artifacts must tell **one** story. The amount in the deck's ask equals the raise in the model. The burn in the model matches the hires in the plan that also sizes the option pool. The milestone in the deck is the row in the model where the next round becomes easy. The traction on slide 6 is a contract in folder 5 of the data room. Investors look for the place where two artifacts disagree, because that is where the founder has not thought it through. The thread that holds them together is the **round thesis**:

> EUR **X** buys milestone **Y** in **Z** months, raised on instrument **W**.

### Sizing the round from the milestone

The round is sized by what it buys. Start from the milestone the next investor will need, build the monthly burn that reaches it, add a buffer because hiring, sales cycles and the next raise all take longer than planned, and subtract the cash you have.`,
        },
        { kind: "equation", formula: "fc11-raise-size" },
        { kind: "equation", formula: "fc11-runway" },
        {
          kind: "md",
          md: md`Then two sanity checks. **Runway**: the round should give 18 to 24 months, because you start raising the next round about 6 months before the money runs out. **Dilution**: at a credible post-money valuation, a seed round normally sells about 15 to 25 % of the company ($s = I / V_{\text{post}}$). If your raise implies 35 %, either the milestone is too far away, the plan is too expensive, or the valuation you need is not credible yet. Fix the plan; do not cut the buffer to make the number fit.

The bands above are common practice in European and US seed rounds, not rules; they move with the market.`,
        },
        {
          kind: "flow",
          title: "Build order: each artifact depends on the one before",
          steps: [
            { label: "Milestone", detail: "The evidence a Series A investor needs (what, how many, by when)" },
            { label: "Financial model", detail: "Hires and spend to reach it; monthly burn; raise size; runway" },
            { label: "Round design", detail: "Instrument, amount, valuation range, pool from the hiring plan, cap table before and after" },
            { label: "Deck narrative", detail: "The story that makes the milestone credible and the amount obvious" },
            { label: "Investor list", detail: "Who invests at this stage, in this sector, at this cheque size; warm paths; sequence" },
            { label: "Data room", detail: "A document behind every claim; nothing that contradicts the deck" },
          ],
          caption: "Founders usually start with the deck. Start with the milestone: the deck is easier to write once the numbers have forced the story.",
        },
        { kind: "sources", refs: ["fc11-r3", "fc11-r6"] },
      ],
    },
    {
      layer: "applied",
      title: "Choosing the venture and sizing its round",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Which venture gets the capstone package?",
          given: md`You may build the package for **Afterwave**, **Mizan** or **Suhail**. Score each against five criteria, weighted by how much each matters for a seed raise in the next 6 months. The scores below are **illustrative judgements** to show the method, not facts about the ventures; redo them with your own view.

| Criterion | Weight |
|---|---|
| Venture-scale market and business model (can it return a fund?) | 0.30 |
| Evidence obtainable in the next 3 to 6 months | 0.25 |
| Team-market fit | 0.20 |
| Strength of the why-now | 0.15 |
| Reachable pool of seed investors | 0.10 |`,
          steps: [
            {
              md: md`**Afterwave.** Physical AI test infrastructure sold B2B to hardware test teams; investors have recently funded adjacent test-data platforms at high valuations (Nominal, Sift), so the category is legible. Two cofounders come from Tesla drive unit and inverter validation. The EU Machinery Regulation applies from 20 January 2027. Evidence is the gap: paid pilots take a security review and a sales cycle. Illustrative scores: 5, 3, 5, 4, 4.

$S_{\text{AW}} = 0.30(5) + 0.25(3) + 0.20(5) + 0.15(4) + 0.10(4) = 4.25$`,
            },
            {
              md: md`**Mizan.** PV soiling analytics, cleaning optimisation and plant control in Kuwait and the Gulf, plus a distribution thread. The Shagaya Phase I pilot with KISR as methodology partner, if it happens, is strong evidence. But buyers are utilities, EPCs and government bodies under public tendering, sales cycles are long, and the distribution thread is a lower-multiple business that seed VCs discount. The likely investors are regional and strategic. Illustrative scores: 3, 4, 4, 3, 3.

$S_{\text{MZ}} = 0.90 + 1.00 + 0.80 + 0.45 + 0.30 = 3.45$`,
            },
            {
              md: md`**Suhail.** A builder ecosystem: events, newsletter, conference, podcast, a planned research arm, volunteer-led until revenue, with the plan starting January 2027. Its natural money is sponsorship, grants and event revenue, not a seed VC round, unless it is designed as a business with venture-scale economics (for example a talent or investor marketplace). Illustrative scores: 2, 3, 4, 3, 2.

$S_{\text{SH}} = 0.60 + 0.75 + 0.80 + 0.45 + 0.20 = 2.80$`,
            },
            {
              md: md`**Read the result, do not obey it.** The weights encode a view: that a seed VC package should go to the venture where VC is the right money. If you weight "evidence in 3 to 6 months" at 0.40, Mizan closes the gap. What matters is that the choice is explicit and defensible, because an investor will ask why this venture and not the other two.`,
            },
          ],
          result: md`With these illustrative weights, **Afterwave** (4.25) is the natural choice for a VC seed package; Mizan (3.45) is a credible alternative with regional or strategic investors; Suhail (2.80) is better served by a sponsorship and grant plan than a seed round. Choosing Suhail is allowed, but then the package must justify why it is a venture-backed business.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Size an illustrative Afterwave seed round",
          given: md`**Illustrative numbers only**, not Afterwave's actual plan. Today: a 3-person team burning EUR 45k/month, EUR 150k in the bank at close. Plan after the round: hire two engineers, a field applications engineer and later a first account executive, plus on-prem security and compliance costs, for an average net burn of **EUR 120k/month**. Milestone (a target, not a fact): paid pilots converted into annual contracts with enough ARR and reference customers for a Series A, estimated at **20 months**. Buffer $b = 0.25$.`,
          steps: [
            {
              md: md`Spend to reach the milestone: $\bar{B} \cdot M = 120 \times 20 = 2{,}400$ k EUR.`,
            },
            {
              md: md`With the buffer: $2{,}400 \times 1.25 = 3{,}000$ k EUR. Minus cash in hand: $R = 3{,}000 - 150 = 2{,}850$ k EUR.`,
              hidden: true,
              check: { prompt: "Raise size R before rounding", answer: 2850, unit: "k EUR", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Round up to a clean ask of **EUR 3.0 m**. Runway at the planned burn: $T_{\text{run}} = (150 + 3{,}000) / 120 = 26.25$ months.`,
              hidden: true,
              check: { prompt: "Runway after raising EUR 3.0 m", answer: 26.25, unit: "months", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Dilution at an illustrative EUR 12 m pre-money: $V_{\text{post}} = 15$ m, $s = 3 / 15 = 20\%$. Inside the 15 to 25 % band.`,
              hidden: true,
              check: { prompt: "New investors' ownership", answer: 20, unit: "%", tolerance: { abs: 0.2 } },
            },
          ],
          result: md`Round thesis (illustrative): **"EUR 3.0 m buys the conversion of paid pilots into annual contracts and a Series A-ready reference base in about 20 months, on a priced seed or post-money SAFE."** 26 months of runway leaves about 6 months to raise the A. If YC's standard deal were added, it would extend runway and must be modelled as a post-money SAFE that converts in the seed (lesson 2).`,
        },
        {
          kind: "question",
          question: {
            id: "fc11-l01-p1",
            type: "numeric",
            prompt: md`Illustrative Mizan plan: average planned net burn EUR 80k/month, 15 months to the milestone, buffer 0.30, EUR 100k in the bank. What should the raise be before rounding, in k EUR?`,
            answer: 1460,
            unit: "k EUR",
            tolerance: { rel: 0.01 },
            explanation: md`$R = 80 \times 15 \times 1.30 - 100 = 1{,}560 - 100 = 1{,}460$ k EUR. Round to EUR 1.5 m. Runway check: $(100 + 1{,}500)/80 = 20$ months, inside the 18 to 24 month band.`,
            concepts: ["fc11.raise-sizing"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How investors use the package, and your capstone brief",
      blocks: [
        {
          kind: "md",
          md: md`### Who reads what, and when

| Stage | Who | What they read | How long |
|---|---|---|---|
| First look | Associate or partner, from an intro email | The forwardable email (5 lines) and the deck, often without you | 2 to 5 minutes |
| First meeting | Partner | You, the deck, a live demo; they test the why-now and the team | 30 to 45 minutes |
| Partner meeting or IC | Partnership | An internal memo the partner writes, built from your deck and model | 1 hour |
| Diligence | Partner, analyst, sometimes a technical expert | Model, cap table, data room; 3 to 6 customer calls; references on you | 1 to 3 weeks |
| Closing | Lawyers | Term sheet, articles, shareholders' agreement or SAFE, disclosure letter | 2 to 6 weeks |

Two things follow. First, your deck must work **without you in the room**, because the partner who forwards it to the partnership will not present it as well as you do. Second, the data room is where rounds stall: a missing IP assignment or an unsigned cofounder agreement can add a month.

### The capstone rules

You build the package for **one** venture in lessons 2 and 3. Each artifact is a graded exercise against a rubric. Then you defend it in investor Q&A scenarios. The **module exam is your capstone score**: integrative questions that test whether the package holds together.

- Use only facts about the venture you know to be true. Where you need numbers, label them **illustrative** and show the arithmetic.
- Never present pilots, LOIs or conversations as revenue.
- Do not name or describe any undisclosed cofounder.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "External facts to re-check before you use them",
          md: md`The YC standard deal (USD 125k on a post-money SAFE for 7 % plus USD 375k on an uncapped MFN SAFE) is recorded from secondary sources dated 2026; confirm it on YC's deal page. The EU Machinery Regulation's general application date of 20 January 2027 is in the Official Journal; the status of harmonised standards and of the AI-related delegated acts is still moving (see docs/research). Investor round sizes quoted as comparables come from press releases and must be re-checked on the day you cite them.`,
        },
        { kind: "sources", refs: ["fc11-r2", "fc11-r7"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Three ways a seed package fails before the meeting",
          md: md`**Invented precision.** A 5-year P&L to the euro, with no driver sheet, signals that the model was built backwards from a valuation. **Inconsistency.** The deck asks for EUR 2 m, the model needs EUR 2.8 m, the cap table shows EUR 2.5 m. **Wrong money.** A seed VC deck for a venture whose economics cannot return a fund (a community, an agency, a distribution business) wastes everyone's time; fund it with revenue, grants or sponsors, or redesign it.`,
        },
        {
          kind: "checklist",
          title: "Before you start building",
          items: [
            "I have chosen one venture and can say in one sentence why this one and not the other two.",
            "I can state the milestone as verifiable evidence (what, how many, by when), not as an activity.",
            "I know which numbers are facts and which are illustrative, and I have labelled them.",
            "I have a draft round thesis: amount, milestone, months, instrument.",
            "I know which investor type fits this venture (seed VC, regional fund, strategic, angels, grants).",
            "I have checked that nothing I plan to say about traction overstates what is signed.",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc11-l01-p2",
            type: "short",
            prompt: md`**Your capstone brief.** Choose Afterwave, Mizan or Suhail. Write (1) the reason for choosing it over the other two, with the criteria you used; (2) the round thesis in one sentence; (3) the milestone as verifiable evidence; (4) a first-pass raise size with the arithmetic (illustrative numbers labelled); (5) the two biggest evidence gaps an investor will find and how you will close or address each in the next 8 weeks.`,
            rubric: [
              "Names one venture and justifies the choice against explicit criteria, including whether VC is the right money for it.",
              "Round thesis states amount, milestone, time and instrument in one sentence.",
              "Milestone is verifiable evidence a next-round investor would accept (numbers and date), not an activity such as 'build the platform'.",
              "Raise size is derived from burn x months x (1 + buffer) minus cash, numbers labelled illustrative, with runway and dilution checked.",
              "Identifies two real evidence gaps and a concrete, time-bound action for each; invents no traction, customers or revenue.",
            ],
            modelAnswer: md`**Venture: Afterwave.** Against five weighted criteria (venture scale 0.30, evidence in 3 to 6 months 0.25, team-market fit 0.20, why-now 0.15, investor pool 0.10) it scores highest: a B2B infrastructure category investors have recently funded, a team with Tesla validation backgrounds, and a regulatory clock (EU Machinery Regulation from 20 January 2027). Mizan is a credible second for regional investors; Suhail's natural funding is sponsorship and grants.

**Round thesis (illustrative):** EUR 3.0 m buys the conversion of paid pilots into annual contracts and a reference base for a Series A in about 20 months, raised as a priced seed (or a post-money SAFE if a lead prefers speed).

**Milestone (target):** at least 3 hardware test teams on paid annual contracts for Lockstep and Enclave, Ripple used in at least one customer's release process, and the security review template accepted by two enterprise buyers, by month 20.

**Raise size (illustrative):** average net burn EUR 120k/month x 20 months x 1.25 = EUR 3.0 m, minus EUR 150k cash = EUR 2.85 m, rounded to EUR 3.0 m. Runway 26 months. At EUR 12 m pre, 20 % dilution.

**Evidence gaps:** (a) no paid deployment yet: in 8 weeks, convert design-partner conversations into one paid pilot with a written success criterion and a price; (b) the commitment question across three ventures: before outreach, write down the time allocation, the governance of Mizan and Suhail, and confirm founder vesting and IP assignment at Afterwave.`,
            explanation: md`A strong brief makes the later artifacts easy: the thesis sets the model's horizon, the milestone sets the hiring plan, the raise sets the cap table and the evidence gaps tell you what the deck must handle honestly.`,
            concepts: ["fc11.round-thesis", "fc11.raise-sizing", "fc11.venture-selection", "fc11.package-bar"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc11-l01-q1",
      type: "multi",
      prompt: md`Which of these belong in a complete seed round package? Select all that apply.`,
      options: [
        "A driver-based financial model with monthly burn and runway",
        "A cap table before and after the round, fully diluted",
        "A ranked investor list with an outreach plan",
        "A data room index with a document behind each claim",
        "A 5-year P&L to the nearest euro with no assumptions sheet",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`The fifth is the classic anti-pattern: precision without drivers signals a model built backwards from a valuation. The five artifacts are model, deck, cap table and round design, investor list and outreach plan, data room index.`,
      concepts: ["fc11.seed-package"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc11-l01-q2",
      type: "numeric",
      prompt: md`Average planned net burn EUR 100k/month, 18 months to the milestone, buffer 0.25, EUR 250k in the bank. Raise size in k EUR?`,
      answer: 2000,
      unit: "k EUR",
      tolerance: { rel: 0.01 },
      explanation: md`$R = 100 \times 18 \times 1.25 - 250 = 2{,}250 - 250 = 2{,}000$ k EUR. Runway after raising: $(250 + 2{,}000)/100 = 22.5$ months.`,
      concepts: ["fc11.raise-sizing"],
      difficulty: 1,
    },
    {
      id: "fc11-l01-q3",
      type: "mcq",
      prompt: md`Your model says you need EUR 4 m to reach the milestone, which at the best valuation you can credibly defend would sell 35 % of the company. What is the best response?`,
      options: [
        "Raise EUR 4 m anyway; dilution matters less than runway",
        "Cut the buffer to zero so the raise fits at 20 %",
        "Move the milestone closer or cut plan cost so the round buys a nearer, still convincing milestone",
        "Ask for a higher valuation to make the percentage work",
      ],
      answer: 2,
      explanation: md`35 % at seed leaves too little for later rounds and the team. Cutting the buffer just moves the problem into month 16. An unsupported valuation fails in diligence. Redesign the plan: a nearer milestone that still de-risks the company for the next round.`,
      concepts: ["fc11.raise-sizing", "fc11.round-thesis"],
      difficulty: 2,
    },
    {
      id: "fc11-l01-q4",
      type: "order",
      prompt: md`Put the build order of the package in sequence.`,
      items: ["Milestone", "Financial model", "Round design and cap table", "Deck narrative", "Investor list and outreach plan", "Data room index"],
      explanation: md`Each artifact depends on the one before: the milestone sets the burn plan, the plan sets the raise and pool, the numbers force the story, the story and stage define the investor list, and the data room backs the claims you have decided to make.`,
      concepts: ["fc11.seed-package"],
      difficulty: 1,
    },
    {
      id: "fc11-l01-q5",
      type: "decision",
      prompt: md`You want to use the capstone to build a seed VC package for Suhail. What is the strongest way to do it?`,
      options: [
        { text: "Build the same package as for a SaaS company and project 3x annual growth in event revenue", score: 0.1, feedback: "Event and sponsorship revenue rarely has venture-scale economics; projecting SaaS growth on it will not survive a first meeting." },
        { text: "First show which part of Suhail could be a venture-scale business (for example a talent or investor marketplace) and build the package for that, with the community as the acquisition channel; fund the rest with sponsorship and grants", score: 1, feedback: "This matches money to model: VC for the part that can return a fund, sponsorship and grants for the community." },
        { text: "Skip the cap table, since Suhail is volunteer-led", score: 0.2, feedback: "If you raise equity you need a cap table; the volunteer structure is itself a governance question investors will ask about." },
        { text: "Pick Suhail because it scores lowest, to make the capstone harder", score: 0.3, feedback: "Difficulty is not a criterion. Choose explicitly and justify it." },
      ],
      explanation: md`Venture-to-capital fit comes first: a seed VC package is the right artifact only for a business that can plausibly return a fund.`,
      concepts: ["fc11.venture-selection"],
      difficulty: 2,
    },
    {
      id: "fc11-l01-q6",
      type: "mcq",
      prompt: md`Which round thesis meets the bar?`,
      options: [
        "We are raising to accelerate growth and expand the team.",
        "EUR 2.5 m on a priced seed buys EUR 1.2 m ARR from 25 customers and a repeatable outbound motion in 18 months.",
        "We are raising EUR 2.5 m at a EUR 15 m pre-money valuation.",
        "We need 24 months of runway.",
      ],
      answer: 1,
      explanation: md`A thesis ties amount, milestone (verifiable evidence), time and instrument together. The others state an activity, a price or a duration, but not what the money buys.`,
      concepts: ["fc11.round-thesis"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc11-l01-f1", front: "The five artifacts of a seed package", back: "Financial model; deck narrative; cap table and round design; investor list and outreach plan; data room index.", concepts: ["fc11.seed-package"] },
    { id: "fc11-l01-f2", front: "Raise size formula", back: md`$R = \bar{B} \cdot M \cdot (1+b) - C_0$: average planned net burn x months to milestone x (1 + buffer) minus cash in hand.`, concepts: ["fc11.raise-sizing"] },
    { id: "fc11-l01-f3", front: "Typical seed runway and dilution bands", back: "18 to 24 months of runway; about 15 to 25 % sold to new investors (market practice, not a rule).", concepts: ["fc11.raise-sizing"] },
    { id: "fc11-l01-f4", front: "Round thesis template", back: "EUR X buys milestone Y in Z months, raised on instrument W.", concepts: ["fc11.round-thesis"] },
    { id: "fc11-l01-f5", front: "The one-story test", back: "The ask, the model's raise, the cap table, the hiring plan, the milestone and the data room documents must all agree. Investors look for where two artifacts disagree.", concepts: ["fc11.package-bar"] },
    { id: "fc11-l01-f6", front: "Venture-to-capital fit", back: "Raise VC only for a business that can return a fund. Communities, agencies and distribution businesses are usually better funded by revenue, sponsors or grants.", concepts: ["fc11.venture-selection"] },
  ],
};

export default lesson;
