import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc02-l05",
  title: "Prioritisation and roadmaps",
  summary:
    "How to decide what to build next when engineering time is the binding constraint: RICE for comparing many small items, cost of delay and CD3 (weighted shortest job first) for time-critical ones, with the math of why CD3 ordering minimises total delay cost; now-next-later roadmaps; and how to say no without losing the customer.",
  minutes: 80,
  objectives: [
    "You can compute RICE scores and explain when RICE misleads.",
    "You can estimate cost of delay in EUR per week, compute CD3, and show that CD3 ordering minimises total cost of delay for a set of independent items.",
    "You can convert SAFe-style WSJF relative scores into a ranking.",
    "You can build a now-next-later roadmap tied to outcomes and write a clear, respectful no to a customer request.",
  ],
  concepts: [
    {
      id: "fc02.rice",
      name: "RICE scoring",
      description:
        "Intercom's prioritisation score: Reach times Impact times Confidence, divided by Effort. Good for comparing many items with measurable reach; weak for small B2B customer bases and time-critical items.",
      competency: "fc-product",
    },
    {
      id: "fc02.cost-of-delay",
      name: "Cost of delay",
      description:
        "The value lost per unit of time that an item is not delivered (EUR per week). Makes urgency explicit and comparable; central to Don Reinertsen's product development flow.",
      competency: "fc-product",
      related: ["fc02.wsjf"],
    },
    {
      id: "fc02.wsjf",
      name: "CD3 / weighted shortest job first",
      description:
        "Ranking items by cost of delay divided by duration. For independent items sharing one constrained resource, doing them in descending CD3 order minimises the total cost of delay. SAFe's WSJF is a relative-points version.",
      competency: "fc-product",
      related: ["fc02.cost-of-delay"],
    },
    {
      id: "fc02.now-next-later",
      name: "Now-next-later roadmap",
      description:
        "A roadmap with three time horizons instead of dates: now (committed, in progress), next (shaped, likely), later (directions, uncertain). Each item is tied to an outcome, not a feature promise.",
      competency: "fc-product",
    },
    {
      id: "fc02.saying-no",
      name: "Saying no",
      description:
        "Declining or deferring requests explicitly, with the criteria used, what would change the answer, and an alternative. Protects focus and keeps trust; a silent maybe costs both.",
      competency: "fc-product",
      related: ["fc02.now-next-later"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Scoring, sequencing and the math of delay",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`At Afterwave, two technical cofounders and a list of requests from pilot labs, investors and your own ideas; at Mizan, one analytics lead and a pilot window set by a research partner and a plant. Every week, you decide (with them) what does not get built. Doing that by gut feel or by whoever asked loudest is how startups end up with half-finished features and missed pilot dates. A simple, shared method makes the decision quick, explainable to customers, and defensible to your cofounders.`,
        },
        {
          kind: "md",
          md: md`### RICE

Intercom's **RICE** (Sean McBride, 2016) scores each candidate:`,
        },
        { kind: "equation", formula: "fc02-rice" },
        {
          kind: "md",
          md: md`- **Reach**: how many users or accounts it affects per period (accounts per quarter).
- **Impact**: per-user effect on the goal on a fixed scale: 3 massive, 2 high, 1 medium, 0.5 low, 0.25 minimal.
- **Confidence**: 100% high, 80% medium, 50% low. Below 50% is a guess: go and discover first.
- **Effort**: total person-months across everyone involved.

RICE is good at stopping pet projects with low reach and at forcing a confidence discount. It misleads in two common seed-stage situations: when reach is tiny and lumpy (three pilot accounts, one of which is worth more than the others combined), and when **timing** dominates value (a pilot deadline, a regulatory date, a fundraising milestone). For those, use cost of delay.

### Cost of delay

Don Reinertsen's argument (*The Principles of Product Development Flow*, 2009): if you only quantify one thing, quantify the **cost of delay**, the value lost per week an item is not done.`,
        },
        { kind: "equation", formula: "fc02-cost-of-delay" },
        {
          kind: "md",
          md: md`Sources of cost of delay for a seed-stage B2B company: revenue a signed pilot or contract would bring forward; a pilot that slips into the customer's next budget year; a regulatory or industry date passing (Afterwave's regulatory entry point, the EU Machinery Regulation, applies from 20 January 2027); runway burned before a fundraising milestone; risk reduction you lose by learning later. Urgency profiles help: some items lose value at a steady rate, some lose everything after a fixed date, some have little cost now but a large one later.

You do not need precision. A range ("between 3 and 8 kEUR per week") is enough, because CoD estimates for different items usually differ by factors of 10, which dwarfs the estimation error.

### CD3: dividing by duration

When items share one constrained resource (your engineers) and are done one at a time, rank by **cost of delay divided by duration**:`,
        },
        { kind: "equation", formula: "fc02-cd3" },
        {
          kind: "md",
          md: md`**Why it works.** The total cost of delay of a sequence is each item's CoD times the time until it is finished:`,
        },
        { kind: "equation", formula: "fc02-total-delay-cost" },
        {
          kind: "md",
          md: md`Take two adjacent items $a$ and $b$ in a sequence, starting at time $s$. Doing $a$ first costs $\text{CoD}_a (s + D_a) + \text{CoD}_b (s + D_a + D_b)$; doing $b$ first costs $\text{CoD}_b (s + D_b) + \text{CoD}_a (s + D_a + D_b)$. Subtract: $a$ first is cheaper if and only if

$$\text{CoD}_b D_a < \text{CoD}_a D_b \iff \frac{\text{CoD}_a}{D_a} > \frac{\text{CoD}_b}{D_b}$$

Swapping any adjacent pair that violates CD3 order therefore reduces total cost, so the descending-CD3 sequence is optimal. This is the classic weighted-shortest-job-first rule from scheduling theory (Smith's rule). It assumes independent items and no splitting across people; real backlogs violate both a little, which is fine for a ranking tool.

### WSJF in relative points

The Scaled Agile Framework (SAFe) uses the same idea with relative Fibonacci points when teams cannot estimate EUR:`,
        },
        { kind: "equation", formula: "fc02-wsjf" },
        {
          kind: "md",
          md: md`Score each column relative to the smallest item (which gets 1), sum the three cost-of-delay components and divide by job size. It is less accurate than CD3 in EUR but better than arguing.

### Now-next-later

A dated roadmap ("Q2: feature X") is a promise that a seed-stage company will break. The **now-next-later** format (popularised by Janna Bastow of ProdPad) replaces dates with horizons of decreasing certainty:

| Horizon | Certainty | What it contains | Typical span |
|---|---|---|---|
| **Now** | Committed | Items being built, with acceptance criteria | Current 4 to 6 weeks |
| **Next** | Likely | Shaped items with a problem statement and rough appetite | Following 1 to 3 months |
| **Later** | Directional | Opportunities and bets tied to outcomes | Beyond |

Each item is phrased as an outcome or problem ("pilot labs can pass IT security review in under 4 weeks"), not a feature ("SSO"). That keeps room to find a better solution and makes it safe to share with customers and investors.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Sequencing Afterwave's next quarter",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "CD3 versus intuition for three Afterwave items (illustrative)",
          given: md`Three candidate items compete for the founding engineers. **All numbers are illustrative.**

| Item | What | CoD (kEUR/week) | Duration (weeks) |
|---|---|---|---|
| A | Enclave offline install and security pack (unblocks two pilots waiting on IT review) | 10 | 4 |
| B | Importer for a DAQ file format used at one pilot lab | 6 | 1 |
| C | Ripple explanation view ("why rerun this test") | 3 | 2 |`,
          steps: [
            {
              md: md`**CD3.** $A: 10/4 = 2.5$; $B: 6/1 = 6$; $C: 3/2 = 1.5$. Order: B, A, C.`,
            },
            {
              md: md`**Total cost of delay, CD3 order (B, A, C).** Completion times: B at 1, A at 5, C at 7 weeks. $TC = 6 \times 1 + 10 \times 5 + 3 \times 7 = 6 + 50 + 21 = 77$ kEUR.`,
            },
            {
              md: md`**Intuitive order "biggest value first" (A, B, C).** Completion: A at 4, B at 5, C at 7. $TC = 10 \times 4 + 6 \times 5 + 3 \times 7 = 40 + 30 + 21 = 91$ kEUR.`,
            },
            {
              md: md`**Shortest first (B, C, A).** Completion: B at 1, C at 3, A at 7. $TC = 6 + 9 + 70 = 85$ kEUR. All six orders are in the chart below; CD3 order is the minimum.`,
            },
          ],
          result: md`Doing the one-week importer first saves 14 kEUR of delay cost against the intuitive order (91 versus 77), even though A is the most valuable item. The insight: a short job with a decent cost of delay should jump the queue.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Total cost of delay by sequence (illustrative)",
          xKey: "order",
          xLabel: "Sequence",
          yLabel: "Total cost of delay (kEUR)",
          series: [{ key: "tc", label: "Total cost of delay" }],
          data: [
            { order: "B-A-C (CD3)", tc: 77 },
            { order: "B-C-A", tc: 85 },
            { order: "A-B-C", tc: 91 },
            { order: "C-B-A", tc: 94 },
            { order: "A-C-B", tc: 100 },
            { order: "C-A-B", tc: 108 },
          ],
          caption: "Same three items, same total work (7 weeks). Only the order changes, and with it 31 kEUR of value between best and worst.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "RICE and WSJF for two items (illustrative)",
          given: md`Two items for the next cycle. Item P (pilot-lab DAQ importer): reach 4 accounts per quarter, impact 2, confidence 80%, effort 2 person-months. Item Q (UI polish): reach 10 accounts per quarter, impact 0.5, confidence 50%, effort 0.5 person-months. A third item, the Enclave security pack, is scored in SAFe points: user/business value 8, time criticality 13, risk reduction 5, job size 5.`,
          steps: [
            {
              md: md`RICE for P: $4 \times 2 \times 0.8 / 2$.`,
              hidden: true,
              check: { prompt: "RICE score of P", answer: 3.2, tolerance: { abs: 0.01 } },
            },
            {
              md: md`RICE for Q: $10 \times 0.5 \times 0.5 / 0.5$.`,
              hidden: true,
              check: { prompt: "RICE score of Q", answer: 5, tolerance: { abs: 0.01 } },
            },
            {
              md: md`WSJF for the security pack: $(8 + 13 + 5)/5$.`,
              hidden: true,
              check: { prompt: "WSJF of the security pack", answer: 5.2, tolerance: { abs: 0.01 } },
            },
            { md: md`RICE ranks UI polish above the pilot importer because reach is counted in accounts, not value. With three pilot accounts worth very different amounts, that is the RICE failure mode. Use RICE to sort the long tail of small items, and cost of delay for the few that matter.` },
          ],
          result: md`RICE prefers Q (5 versus 3.2), but if P unblocks a pilot it has a far higher cost of delay. The method must fit the decision: cost of delay for pilot- and deadline-driven work.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Roadmaps and saying no in practice",
      blocks: [
        {
          kind: "md",
          md: md`### A weekly rhythm

1. **Intake**: every request (customer, investor, cofounder, you) goes into one list with its source and the problem behind it, not just the feature.
2. **Triage** (30 min weekly, you and the technical lead): discard, park in "later", or estimate CoD range and duration.
3. **Sequence** "now" by CD3; sanity-check with RICE for the small stuff.
4. **Publish** the now-next-later view internally and, in a cleaned version, to pilot customers.
5. **Decision log**: one line per significant yes or no, with the reason. When someone asks "why didn't we build X?", you have the answer.

### Saying no

A no is a product decision, not a social failure. A good no to a customer has four parts:

1. **Acknowledge the problem** behind the request in their words.
2. **State the decision and the reason** using your criteria ("we are focusing the next six weeks on getting both pilot labs through IT security review").
3. **Say what would change the answer** (more accounts with the same need, a paid commitment, a change in your strategy).
4. **Offer an alternative** (a workaround, an export, a partner, a date to revisit).

The expensive alternative is the silent maybe: the customer plans around a feature you will never build, and trust drops when they find out.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`**The biggest customer writes the roadmap.** One pilot's custom request can consume a quarter. Ask whether the need appears in other accounts and whether they will pay for it; if neither, it is consulting, and should be priced as such.

**False precision.** Arguing whether an impact is 1 or 2 for an hour. The method exists to make a decision in minutes; ranges are fine.

**Roadmap as promise.** Dates in an investor deck become commitments. Use horizons and outcomes.

**Never revisiting "later".** Review the later column monthly; drop what no longer fits the strategy so it stops attracting effort.`,
        },
        {
          kind: "ask",
          title: "Questions to ask before something enters \"now\"",
          items: [
            "What problem does this solve, for which accounts, and what is the evidence rung?",
            "What does a week of delay cost, roughly, and why?",
            "How long will it take the constrained people, as a range?",
            "What does it displace, and has the person who asked for that displaced item been told?",
            "What would we accept as done?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc02-l05-p1",
            type: "short",
            prompt: md`Produce a **next-quarter roadmap for Afterwave**. (1) List five candidate items drawn from Lockstep, Enclave and Ripple, each phrased as an outcome. (2) For each, give an illustrative cost of delay (kEUR per week) with a one-line rationale and a duration in weeks, and compute CD3. (3) Sequence the "now" column by CD3 and compute the total cost of delay of your sequence and of one alternative to show the difference. (4) Present the result as now / next / later. (5) Write a four-part no (at most 120 words) to a pilot lab that asked for a custom integration with their in-house test database.`,
            rubric: [
              "Five items phrased as outcomes or problems, not bare features, covering more than one product.",
              "Each item has a cost-of-delay estimate with a plausible rationale (pilot timing, IT review, regulatory date) and a duration; CD3 computed correctly.",
              "The sequence follows CD3 and total cost of delay is computed correctly for it and for an alternative, showing the CD3 order is lower.",
              "Now / next / later horizons with decreasing certainty, items tied to outcomes, no dates promised beyond now.",
              "The no acknowledges the problem, states the decision and reason, says what would change it, and offers an alternative, within the word limit.",
            ],
            modelAnswer: md`**Candidates (illustrative).**

| # | Outcome | CoD (kEUR/wk) | Rationale | Duration (wk) | CD3 |
|---|---|---|---|---|---|
| 1 | Pilot labs can install Enclave offline and pass IT review in under 4 weeks | 10 | Two pilots blocked at IT review | 4 | 2.5 |
| 2 | Lockstep reads the DAQ file format used at pilot lab 1 | 6 | Lab 1 cannot start without it | 1 | 6.0 |
| 3 | Engineers see why Ripple recommends each test | 3 | Needed for trust before shadow-mode results | 2 | 1.5 |
| 4 | Lockstep supports a second bench per install | 2 | Expansion at lab 1 after pilot | 3 | 0.67 |
| 5 | Machinery Regulation evidence export (test records per change) | 4 | Customers preparing for 20 January 2027 | 4 | 1.0 |

**Now sequence by CD3:** 2, 1, 3. Completion at 1, 5, 7 weeks. $TC = 6 \times 1 + 10 \times 5 + 3 \times 7 = 77$ kEUR. Alternative 1, 2, 3: $10 \times 4 + 6 \times 5 + 3 \times 7 = 91$ kEUR. CD3 saves 14 kEUR.

**Roadmap.**
- **Now:** pilot lab 1 can load its DAQ files; pilot labs pass IT review with an offline Enclave install; engineers see the reason behind each Ripple recommendation.
- **Next:** customers can export test evidence per change for Machinery Regulation files; Lockstep at more than one bench per install.
- **Later:** Afterwave instrumented test platforms; agents running on bench memory inside Enclave.

**No to the custom integration.** "Thank you for explaining how your test database drives your release sign-off. That problem matters. For the next six weeks we are focusing all engineering on getting both pilot labs through IT review and running, so we cannot build a custom integration now. If other labs need the same integration, or if it becomes part of a paid expansion, we will revisit it in our next planning cycle in six weeks. Meanwhile, Lockstep's export can be loaded into your database with a short script, and we are happy to help your team write it."`,
            explanation: md`Strong answers make the cost-of-delay reasoning explicit, show the CD3 math, keep the roadmap outcome-based and write a no that preserves the relationship.`,
            concepts: ["fc02.cost-of-delay", "fc02.wsjf", "fc02.now-next-later", "fc02.saying-no"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["fc02-r10", "fc02-r11", "fc02-r12", "fc02-r13"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc02-l05-q1",
      type: "numeric",
      prompt: md`Compute RICE for: reach 6 accounts per quarter, impact 1, confidence 80%, effort 1.5 person-months.`,
      answer: 3.2,
      tolerance: { abs: 0.01 },
      explanation: md`$6 \times 1 \times 0.8 / 1.5 = 3.2$.`,
      concepts: ["fc02.rice"],
      difficulty: 1,
    },
    {
      id: "fc02-l05-q2",
      type: "numeric",
      prompt: md`Two items: X has CoD 8 kEUR/week and takes 4 weeks; Y has CoD 3 kEUR/week and takes 1 week. What is the total cost of delay (kEUR) of the better order?`,
      answer: 43,
      tolerance: { abs: 0.1 },
      unit: "kEUR",
      explanation: md`CD3: X $= 8/4 = 2$, Y $= 3/1 = 3$, so Y first. Y finishes at week 1 and X at week 5: $TC = 3 \times 1 + 8 \times 5 = 43$ kEUR. X first would cost $8 \times 4 + 3 \times 5 = 47$ kEUR.`,
      concepts: ["fc02.wsjf", "fc02.cost-of-delay"],
      difficulty: 2,
    },
    {
      id: "fc02-l05-q3",
      type: "mcq",
      prompt: md`When is RICE most likely to mislead a seed-stage B2B company?`,
      options: [
        "When there are many small items with similar effort.",
        "When reach is three pilot accounts of very different value and one item has a hard deadline.",
        "When confidence varies between items.",
        "When effort is measured in person-months.",
      ],
      answer: 1,
      explanation: md`RICE counts reach in users or accounts and has no notion of timing. With few, unequal accounts and deadlines, cost of delay is the better tool.`,
      concepts: ["fc02.rice", "fc02.cost-of-delay"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "fc02-l05-q4",
      type: "mcq",
      prompt: md`Why does ordering by CD3 minimise total cost of delay for independent items on one resource?`,
      options: [
        "Because it always does the most valuable item first.",
        "Because swapping any adjacent pair out of CD3 order reduces total cost, so only the CD3 order cannot be improved.",
        "Because it always does the shortest item first.",
        "It does not; it is a heuristic with no justification.",
      ],
      answer: 1,
      explanation: md`The exchange argument: $a$ before $b$ is cheaper iff $\text{CoD}_a/D_a > \text{CoD}_b/D_b$. Any out-of-order adjacent pair can be swapped to reduce cost.`,
      concepts: ["fc02.wsjf"],
      difficulty: 2,
    },
    {
      id: "fc02-l05-q5",
      type: "decision",
      prompt: md`Mizan's largest prospective partner asks for a custom Arabic PDF report format that would take Omar three weeks, during the four weeks before the pilot starts. What do you do?`,
      options: [
        { text: "Build it: the biggest partner must be kept happy.", score: 0.2, feedback: "Lets one request displace pilot readiness without checking its cost of delay or alternatives." },
        { text: "Ask what decision the report supports and who reads it; estimate its cost of delay against pilot readiness; offer a simple bilingual export now and revisit the custom format after pilot start.", score: 1, feedback: "Finds the problem behind the request, prices the delay, and gives an alternative with a revisit point." },
        { text: "Decline without explanation to protect focus.", score: 0.3, feedback: "Right instinct on focus, but a bare no damages trust." },
        { text: "Say yes and hope to fit it in.", score: 0, feedback: "The silent maybe: the most expensive answer." },
      ],
      explanation: md`A good no (or a later yes) is grounded in the problem, the cost of delay, and an alternative.`,
      concepts: ["fc02.saying-no", "fc02.cost-of-delay"],
      difficulty: 2,
    },
    {
      id: "fc02-l05-q6",
      type: "multi",
      prompt: md`Which belong in a now-next-later roadmap? (Select all.)`,
      options: [
        "Outcome-phrased items such as \"pilot labs pass IT review in under 4 weeks\".",
        "Exact ship dates for items in \"later\".",
        "Decreasing certainty from now to later.",
        "Items in \"now\" with acceptance criteria.",
        "Every request ever received.",
      ],
      answer: [0, 2, 3],
      explanation: md`Horizons replace dates; items are outcomes; certainty decreases; now items are committed with criteria. It is not a backlog dump.`,
      concepts: ["fc02.now-next-later"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc02-l05-f1", front: "RICE formula", back: md`$(R \times I \times C)/E$. Impact scale 3, 2, 1, 0.5, 0.25; confidence 100, 80, 50%.`, concepts: ["fc02.rice"] },
    { id: "fc02-l05-f2", front: "Cost of delay", back: "Value lost per week an item is not delivered (EUR/week).", concepts: ["fc02.cost-of-delay"] },
    { id: "fc02-l05-f3", front: "CD3", back: "Cost of delay divided by duration. Descending CD3 order minimises total cost of delay.", concepts: ["fc02.wsjf"] },
    { id: "fc02-l05-f4", front: "SAFe WSJF numerator", back: "User/business value + time criticality + risk reduction or opportunity enablement (relative points).", concepts: ["fc02.wsjf"] },
    { id: "fc02-l05-f5", front: "Now-next-later certainty", back: "Now: committed. Next: likely, shaped. Later: directional.", concepts: ["fc02.now-next-later"] },
    { id: "fc02-l05-f6", front: "Four parts of a good no", back: "Acknowledge the problem, state decision and reason, say what would change it, offer an alternative.", concepts: ["fc02.saying-no"] },
  ],
};

export default lesson;
