import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw08-l06",
  title: "Data flywheels and bench memory as a moat: when data compounds and when it does not",
  summary:
    "Every investor will ask whether bench memory is a moat. The honest answer depends on three numbers: the learning-curve exponent (how fast more data stops helping), the obsolescence rate (how fast old test data stops being relevant) and pooling rights (whether data from one customer may improve the product for another). With Enclave's privacy promise, cross-customer data network effects are weak by design; the real advantages are per-customer switching costs, the system of record, and data Afterwave owns from its own test platforms.",
  minutes: 70,
  objectives: [
    "Use a power-law learning curve to compute how much more data halves the reducible error, and explain diminishing returns",
    "Model the useful data stock with inflow and obsolescence and show why it saturates",
    "Distinguish within-customer flywheels, cross-customer data network effects and switching costs, and say which Enclave allows",
    "Explain why Afterwave's own instrumented test platforms change the data-rights picture",
    "Answer the investor question 'is your data a moat?' with mechanisms and conditions instead of slogans",
  ],
  concepts: [
    {
      id: "aw08.data-flywheel",
      name: "Data flywheel",
      description:
        "A loop where usage generates data that improves the product, which drives more usage. It compounds only if the improvement is material, the data stays relevant, and the company has the right to use the data where the improvement is sold.",
      competency: "aw-ml",
      related: ["aw08.label-scarcity"],
    },
    {
      id: "aw08.learning-curve",
      name: "Learning curves and diminishing returns",
      description:
        "Model error typically falls as a power law in data toward an irreducible floor; halving the reducible error needs 2^(1/alpha) times the data, so returns diminish quickly for small alpha.",
      competency: "aw-ml",
      related: ["aw08.data-flywheel"],
    },
    {
      id: "aw08.data-decay",
      name: "Data obsolescence",
      description:
        "Bench data loses relevance as products, firmware, rigs and sensors change; with a constant inflow and decay rate the useful stock saturates at inflow divided by decay rate.",
      competency: "aw-ml",
      related: ["aw08.learning-curve"],
    },
    {
      id: "aw08.pooling-rights",
      name: "Pooling rights",
      description:
        "Whether a vendor may use one customer's data or models to improve the product for others. On-prem and isolated deployments with customer-owned models usually rule it out, which removes cross-customer data network effects.",
      competency: "aw-ml",
      related: ["aw08.enclave-guarantees"],
    },
    {
      id: "aw08.moat-sources",
      name: "Real sources of advantage for bench memory",
      description:
        "Per-customer switching costs (history, trained models, integrations, workflows), being the system of record for test evidence, and data the company owns outright, such as from its own instrumented test platforms.",
      competency: "aw-ml",
      related: ["aw08.pooling-rights"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Three numbers decide whether data compounds",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`"Bench memory compounds" is a sentence that will appear in Afterwave's YC application and seed deck. Experienced investors have heard "data moat" from hundreds of founders and many have read the critiques. If you can say exactly which flywheel exists, under which conditions, and why Enclave limits one kind and strengthens another, you turn a weak slogan into a strong argument, and you avoid promising customers something (pooled learning) that contradicts what you promise their security team.`,
        },
        {
          kind: "md",
          md: md`### Number 1: the learning-curve exponent

Measured learning curves in machine learning typically follow a power law toward a floor (Kaplan et al., 2020 for language models; similar shapes appear in many supervised tasks):`,
        },
        { kind: "equation", formula: "aw08-learning-curve" },
        { kind: "equation", formula: "aw08-data-to-halve" },
        {
          kind: "md",
          md: md`With $\alpha = 0.3$, halving the reducible error needs about 10 times the data; with $\alpha = 0.1$, about 1,000 times. Doubling data cuts the reducible error by $2^{-\alpha}$: 19 % at $\alpha = 0.3$, 7 % at $\alpha = 0.1$. The floor $\varepsilon_\infty$ (sensor noise, label disagreement between engineers, true ambiguity) is reached sooner than most pitch decks imply. The exponent is measured, not assumed: train on 10 %, 30 %, 100 % of the data and fit.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative learning curves: error vs training runs",
          xKey: "D",
          xLabel: "Training runs (D)",
          yLabel: "Error rate, %",
          series: [
            { key: "a03", label: "alpha = 0.3" },
            { key: "a01", label: "alpha = 0.1" },
          ],
          data: [
            { D: 100, a03: 19.1, a01: 41.9 },
            { D: 300, a03: 14.8, a01: 37.9 },
            { D: 1000, a03: 11.6, a01: 34.1 },
            { D: 3000, a03: 9.4, a01: 30.9 },
            { D: 10000, a03: 7.8, a01: 27.9 },
            { D: 30000, a03: 6.7, a01: 25.4 },
          ],
          caption: "Computed from error = 4 % + 60 % × D^(−alpha). Illustrative parameters. Each tripling of data buys less; with a small exponent, even 300 times the data barely moves the error.",
        },
        {
          kind: "md",
          md: md`### Number 2: obsolescence

Bench data ages. A new product generation, a firmware architecture change, a rig rebuilt with different sensors or fixtures, a new test standard: each makes part of the history less relevant. With inflow $d$ and a decay rate $\lambda$:`,
        },
        { kind: "equation", formula: "aw08-data-stock" },
        {
          kind: "chart",
          chart: "line",
          title: "Useful data stock for 500 new runs a year, by half-life of relevance",
          xKey: "year",
          xLabel: "Years of collection",
          yLabel: "Useful run-equivalents",
          series: [
            { key: "h1", label: "Half-life 1 year" },
            { key: "h2", label: "Half-life 2 years" },
            { key: "h5", label: "Half-life 5 years" },
          ],
          data: [
            { year: 1, h1: 361, h2: 423, h5: 467 },
            { year: 2, h1: 541, h2: 721, h5: 873 },
            { year: 3, h1: 631, h2: 933, h5: 1227 },
            { year: 5, h1: 699, h2: 1188, h5: 1803 },
            { year: 8, h1: 719, h2: 1353, h5: 2417 },
            { year: 12, h1: 721, h2: 1420, h5: 2923 },
          ],
          caption: "Computed from S(T) = (d/λ)(1 − e^(−λT)). The stock saturates at d/λ: 721, 1,443 and 3,607 run-equivalents. Fast-moving product lines (half-life 1 year) never accumulate a deep useful history.",
        },
        {
          kind: "md",
          md: md`Put the two together. Data stock saturates, and error falls slowly with stock. So the **data advantage of an incumbent over an entrant is bounded**: an entrant with the same or larger inflow reaches a similar stock in a few half-lives. Data compounds only where relevance lasts (slow product cycles, physics that does not change, long-life assets) or where inflow is much larger than competitors can get.

### Number 3: pooling rights

A **data network effect** needs data from customer A to improve the product for customer B. That requires the right to pool. Enclave promises the opposite: data stays on customer infrastructure, models trained on it belong to the customer, nothing leaves by default (Lesson 5). That is the right promise for this market, and it means **cross-customer learning on raw bench data is off the table** unless a customer explicitly agrees. Possible narrow exceptions, each needing written consent and careful engineering: sharing aggregate statistics, sharing model updates (federated learning, which still leaks some information and needs privacy analysis), or customers contributing data to a benchmark. Plan as if none of these happen.

### So where is the advantage?

| Source | Mechanism | Strength with Enclave |
|---|---|---|
| Within-customer flywheel | Each customer's own history, labels from triage, trained models and Ripple's dependency graph improve their results over time | Strong and real, but it belongs to the customer |
| Switching costs | Leaving means losing the aligned history, models, integrations with rigs and test executives, and workflows engineers know | Strong; grows with tenure (Helmer's switching costs) |
| System of record for test evidence | Once audits, safety cases and Machinery Regulation evidence reference Enclave records, replacing it is a compliance project | Strong if achieved; links to modules aw10 and aw11 |
| Product learning across customers | Afterwave learns which features, detectors, agent designs and Ripple heuristics work, without seeing data, and ships them to everyone | Moderate; it is know-how, copyable with effort |
| Data Afterwave owns | Afterwave's own instrumented test platforms (vision step 4), and test-as-a-service runs where contracts give Afterwave usage rights | The only place a true cross-customer data asset can form |
| Cross-customer data network effect on customer data | Pooled raw data improves models for all | Weak by design; do not claim it |

Casado and Lauten's critique of data moats (a16z, 2019) is that data advantages usually show diminishing returns and rising costs of acquiring the marginal data point, and that real data network effects are rarer than claimed. The table is that critique applied honestly to Afterwave.`,
        },
        {
          kind: "matrix",
          title: "When does data compound?",
          xAxis: ["Data saturates fast (small alpha, short half-life)", "Data keeps paying (useful alpha, long half-life)"],
          yAxis: ["Company may not pool or own it", "Company owns it or may pool it"],
          cells: [
            { label: "Commodity input", detail: "Data helps the product work but is no advantage; compete on product and workflow." },
            { label: "Real but slow-moving asset", detail: "Own-platform data on long-lived physics (actuator wear, battery ageing): a durable data asset." },
            { label: "Customer's asset, your switching cost", detail: "Enclave customer data: the customer's flywheel; your moat is tenure, integration and system of record." },
            { label: "Customer's compounding asset", detail: "Long-life programmes inside one customer: their models get better for years; retention is high." },
          ],
          caption: "Top row: the company owns or may pool the data. Bottom row: data stays the customer's. Left: data saturates quickly. Right: data stays valuable.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Running the numbers on bench memory",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How big is the incumbent's data advantage?",
          given: md`Illustrative. A drive lab using Enclave adds 500 runs a year; relevance half-life 2 years (firmware and rig changes). A rival vendor's customer adds 1,000 runs a year with the same half-life. Learning curve: error $= 4\% + 60\% \times D^{-0.3}$, with $D$ the useful stock.`,
          steps: [
            { md: md`**Decay rate:** $\lambda = \ln 2/2 = 0.347$ per year. **Steady-state stock:** $S^* = 500/0.347 = 1{,}443$ run-equivalents. After 5 years: $S(5) = 1{,}443 \times (1 - e^{-1.733}) = 1{,}188$ (82 % of steady state).` },
            { md: md`**Error at that stock:** $4 + 60 \times 1{,}443^{-0.3} = 4 + 6.8 = 10.8\%$.` },
            { md: md`**Entrant catch-up:** with 1,000 runs a year, the rival reaches 1,188 run-equivalents when $(1{,}000/0.347)(1 - e^{-0.347T}) = 1{,}188$, so $T = -\ln(1 - 0.412)/0.347 = 1.5$ years. Five years of history is matched in a year and a half.` },
            { md: md`**If pooling were allowed** across 10 such customers: stock about 14,430, error $4 + 60 \times 14{,}430^{-0.3} = 7.4\%$. Ten times the data, about a third less error. Real, but not the step change decks imply, and Enclave rules it out anyway.` },
          ],
          result: md`For one customer, history is a moderate, bounded advantage, eroded by obsolescence and matched by a larger entrant within a couple of half-lives. The durable part is not the data volume but what is built around it: aligned history, labels, models, Ripple's graph and the workflows that depend on them.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A longer-lived data asset",
          given: md`Illustrative. Afterwave's own actuator test platforms (vision step 4) generate 2,000 standardised wear runs a year on a physics question (bearing and gear wear vs load spectrum) whose relevance half-life is 5 years. Afterwave owns this data under its platform terms.`,
          steps: [
            { md: md`$\lambda = \ln 2/5$.` },
            {
              md: md`$= 0.1386$ per year.`,
              hidden: true,
              check: { prompt: "Decay rate λ (1/yr)", answer: 0.1386, tolerance: { abs: 0.001 } },
            },
            { md: md`Steady-state stock $S^* = d/\lambda = 2{,}000/0.1386$.` },
            {
              md: md`$\approx$ **14,430** run-equivalents, ten times the single-lab stock above, and pooled across every customer who buys platform time.`,
              hidden: true,
              check: { prompt: "Steady-state stock (run-equivalents)", answer: 14430, tolerance: { rel: 0.01 } },
            },
            { md: md`Doubling data cuts reducible error by $2^{-0.3} = 0.81$ (19 %). The value is less the volume than the **ownership and standardisation**: same fixtures, sensors and protocols across thousands of runs, which no single customer's archive offers.` },
          ],
          result: md`Owned, standardised, slow-decaying data is where a genuine data asset can form. This is the strongest data argument for building Afterwave's own platforms later, and the honest place to put "compounding" in the deck.`,
        },
        {
          kind: "question",
          question: {
            id: "aw08-l06-p1",
            type: "numeric",
            prompt: md`A model's learning-curve exponent is $\alpha = 0.25$. By what factor must data grow to halve the reducible error?`,
            answer: 16,
            tolerance: { abs: 0.01 },
            unit: "×",
            explanation: md`$2^{1/0.25} = 2^4 = 16$.`,
            concepts: ["aw08.learning-curve"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Telling the data story to investors and customers",
      blocks: [
        {
          kind: "md",
          md: md`### What to say, and what not to

| Avoid | Say instead |
|---|---|
| "Our data moat grows with every customer." | "Each customer's bench memory makes Afterwave more useful to that customer every month, and harder to replace." |
| "We train on all our customers' data." | "Customer data and models stay in their Enclave. We learn which methods work and ship them to everyone." |
| "More data, better AI." | "Our first model reaches useful recall in weeks; after that, value comes from labels, Ripple's graph and the workflows built on it." |
| "Data network effects." | "Switching costs and system of record now; owned data from our own test platforms later." |

### Metrics that show the flywheel is real (within a customer)

- Labelled examples per month from triage, and their share of all alarms.
- Model recall at a fixed alarm budget, quarter over quarter, on a frozen held-out set (Lesson 3).
- Ripple precision: share of recommended reruns that engineers kept, and regressions caught.
- Rig hours saved per change.
- Number of integrations (rigs, test executives, requirement tools) and workflows depending on Enclave records.
- Net revenue retention and expansion to new programmes or sites.

### Contract terms that decide the data rights

The data story is written in the contract: who owns captured data (the customer), who owns models trained on it (the customer), what Afterwave may use (usually aggregate, non-identifying product telemetry, if any, and only when disclosed), and, for Afterwave-operated platforms or test-as-a-service, whether Afterwave may retain anonymised or standardised results. Founder Core covers term negotiation; your job here is to keep the deck, the security note and the contract saying the same thing.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Deck contradicts the security note.** "We pool learnings across customers" on slide 9, "your data never leaves" in the security review. Investors and customers eventually compare.
- **Volume as proof.** Terabytes collected say nothing about whether more data still helps. Show a learning curve or say nothing.
- **Ignoring obsolescence.** Three-year-old runs on a retired rig are not an asset for the new product line.
- **Confusing the customer's flywheel with yours.** The customer's models improve; your advantage is that leaving costs them that improvement.
- **Assuming federated learning solves pooling.** It needs consent, privacy analysis and engineering; plan without it.`,
        },
        {
          kind: "xref",
          to: "fc07-l04",
          note: "Founder Core covers the pitch narrative and handling 'why can't an incumbent copy you?'; use this lesson for the data part of the answer.",
        },
        { kind: "scenario", scenario: "aw08-s3" },
        {
          kind: "question",
          question: {
            id: "aw08-l06-p2",
            type: "short",
            prompt: md`**Produce it.** Write Afterwave's answer (about 250 words, plus a small table if useful) to the investor question: "If customer data stays in each customer's Enclave, where is your moat? Isn't bench memory just the customer's data?" Use the mechanisms from this lesson, include one illustrative number (learning curve or data stock), be explicit about what does not compound, and state the role of Afterwave's own test platforms as a later step, not a current fact.`,
            rubric: [
              "Concedes clearly that cross-customer data network effects on customer data are not claimed, and why (Enclave, ownership)",
              "Names the real advantages: within-customer flywheel creating switching costs, system of record for test evidence, cross-customer product know-how",
              "Uses at least one correct illustrative calculation (2^(1/alpha), S* = d/lambda, or catch-up time) labelled illustrative",
              "Positions own instrumented test platforms as a future source of owned, standardised data, without claiming they exist",
              "Gives metrics that would prove the flywheel (recall over time, labels per month, retention, Ripple precision)",
              "No invented customers, traction or numbers presented as fact",
            ],
            modelAnswer: md`"You're right that bench memory is the customer's data, and we don't claim a data network effect on it. Our promise to security teams is that data and models stay in their Enclave, and the deck says the same.

The moat comes from three places. First, **switching costs that grow with tenure**: each customer's history is aligned on one clock with app actions and firmware versions, labelled through daily triage, and feeds their own models and Ripple's dependency graph. Leaving means rebuilding all of that and losing the models that took months of labels. Second, **system of record**: once test evidence for audits and the Machinery Regulation references Enclave records, replacing us is a compliance project, not a software swap. Third, **product know-how across customers**: we see which detectors, features and agent designs work, without seeing the data, and ship them to everyone.

What doesn't compound: raw volume. Illustratively, with a two-year relevance half-life a lab adding 500 runs a year saturates at about 1,440 useful runs, and a competitor with twice the inflow matches five years of history in about 18 months. We don't sell volume.

Later, our own instrumented test platforms create data we do own: standardised runs on long-lived physics such as actuator wear, pooled across every platform customer. That is where a true data asset can form, and why the platforms are in the plan.

What we will show you: recall at a fixed alarm budget rising quarter over quarter on frozen test sets, labels per month from triage, Ripple recommendations kept by engineers, and net revenue retention."`,
            explanation: md`The grader rewards honesty about pooling, correct mechanisms, a correct illustrative number and measurable proof points.`,
            concepts: ["aw08.moat-sources", "aw08.pooling-rights", "aw08.data-decay", "aw08.data-flywheel"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Yusuf, in plain words, why 'more test data' does not automatically make Afterwave harder to compete with, and what does.",
          keyPoints: [
            "Models improve with data but with diminishing returns toward a floor",
            "Old test data loses relevance as products, firmware and rigs change, so the useful stock levels off",
            "Customer data stays with the customer, so it cannot be pooled into one big advantage",
            "What makes Afterwave hard to replace is the history, labels, models and workflows built inside each customer, plus being the record of test evidence",
            "Data Afterwave owns from its own test platforms later can be a real pooled asset",
          ],
        },
        { kind: "sources", refs: ["aw08-r9", "aw08-r24", "aw08-r25"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw08-l06-q1",
      type: "numeric",
      prompt: md`Inflow is 800 runs a year and the relevance half-life is 3 years. What is the steady-state useful data stock, in run-equivalents? (nearest 10)`,
      answer: 3462,
      tolerance: { abs: 15 },
      unit: "runs",
      explanation: md`$\lambda = \ln 2/3 = 0.231$; $S^* = 800/0.231 = 3{,}462$.`,
      concepts: ["aw08.data-decay"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "aw08-l06-q2",
      type: "mcq",
      prompt: "Why are cross-customer data network effects weak for Afterwave by design?",
      options: [
        "Bench data is too small to matter",
        "Enclave keeps data and trained models on each customer's infrastructure and under their ownership, so there is no right to pool",
        "Machine learning does not work on time series",
        "Customers do not label their data",
      ],
      answer: 1,
      explanation: md`A data network effect needs pooling rights; the privacy promise removes them for customer data.`,
      concepts: ["aw08.pooling-rights"],
      difficulty: 1,
    },
    {
      id: "aw08-l06-q3",
      type: "numeric",
      prompt: md`With learning-curve exponent $\alpha = 0.3$, by what percentage does doubling the data reduce the reducible error? (1 decimal)`,
      answer: 18.8,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$1 - 2^{-0.3} = 1 - 0.812 = 0.188$.`,
      concepts: ["aw08.learning-curve"],
      difficulty: 2,
    },
    {
      id: "aw08-l06-q4",
      type: "multi",
      prompt: "Which are real sources of durable advantage for Afterwave's bench memory under Enclave? (Select all that apply.)",
      options: [
        "Switching costs from aligned history, labels, trained models and integrations at each customer",
        "Being the system of record that audits and safety evidence reference",
        "Pooled raw data from all customers training one shared model",
        "Data from Afterwave's own instrumented test platforms, once built",
        "Total terabytes stored",
      ],
      answer: [0, 1, 3],
      explanation: md`Pooling customer data contradicts Enclave; raw volume says nothing about advantage.`,
      concepts: ["aw08.moat-sources"],
      difficulty: 2,
    },
    {
      id: "aw08-l06-q5",
      type: "decision",
      prompt: md`A draft of the seed deck says "Every new customer makes our AI smarter for all customers." The security note says data never leaves the customer's Enclave. What do you change?`,
      options: [
        { text: "Keep both; investors and security teams never compare.", score: 0, feedback: "They do, and the contradiction costs trust on both sides." },
        { text: "Rewrite the deck line around per-customer improvement, switching costs, cross-customer product know-how and later owned platform data.", score: 1, feedback: "Consistent, true and still a strong story." },
        { text: "Soften the security note to allow pooling.", score: 0.1, feedback: "Undermines the core reason customers can buy at all." },
      ],
      explanation: md`The deck, the security note and the contract must tell the same data story.`,
      concepts: ["aw08.pooling-rights", "aw08.moat-sources"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw08-l06-f1", front: "Learning curve", back: md`$\varepsilon = \varepsilon_\infty + A D^{-\alpha}$; halving reducible error needs $2^{1/\alpha}$ times the data.`, concepts: ["aw08.learning-curve"] },
    { id: "aw08-l06-f2", front: "Steady-state useful data stock", back: md`$S^* = d/\lambda$, with $\lambda = \ln 2/t_{1/2}$.`, concepts: ["aw08.data-decay"] },
    { id: "aw08-l06-f3", front: "Three conditions for data to compound", back: "Material improvement with more data, data that stays relevant, and the right to use it where the improvement is sold.", concepts: ["aw08.data-flywheel"] },
    { id: "aw08-l06-f4", front: "What Enclave rules out", back: "Cross-customer data network effects on customer data (no pooling rights).", concepts: ["aw08.pooling-rights"] },
    { id: "aw08-l06-f5", front: "Afterwave's real data advantages", back: "Per-customer switching costs, system of record for test evidence, cross-customer know-how, later owned platform data.", concepts: ["aw08.moat-sources"] },
  ],
  scenarios: [
    {
      id: "aw08-s3",
      title: "The partner meeting question",
      context: md`A seed investor in a partner meeting (illustrative): "Nominal and Sift are well funded and already in test labs. If your data stays with the customer, what stops them from building Ripple and taking your accounts?"`,
      start: "a",
      concepts: ["aw08.moat-sources", "aw08.pooling-rights"],
      nodes: {
        a: {
          md: md`How do you open your answer?`,
          choices: [
            { text: "\"Our data moat: every customer makes our models better for everyone.\"", score: 1, feedback: "Contradicts Enclave and invites the follow-up you cannot answer.", next: "c" },
            { text: "\"Data isn't our moat on day one, and we don't pool customer data. Our edge is capture of app actions and rig signals on one clock, and Ripple's change-impact answers; inside each customer that history becomes their system of record and grows switching costs.\"", score: 9, feedback: "Concedes the weak point, names a specific mechanism, positions the compounding honestly.", next: "b" },
          ],
        },
        b: {
          md: md`The investor pushes: "So what compounds at all?"`,
          choices: [
            { text: "Explain the within-customer flywheel (triage labels, models, Ripple graph), the evidence role under the Machinery Regulation, and owned data from future test platforms, with metrics you will report.", score: 10, feedback: "Specific, measurable and consistent with the security story." },
            { text: "Say that AI improves with scale generally.", score: 2, feedback: "A slogan; the investor has heard it many times." },
          ],
        },
        c: {
          md: md`The investor: "But your website says customer data never leaves their servers. Which is it?"`,
          choices: [
            { text: "Correct yourself: no pooling; restate the real mechanisms.", score: 4, feedback: "Recovers the facts, but credibility took a hit that the honest opening would have avoided." },
          ],
        },
      },
    },
  ],
};

export default lesson;
