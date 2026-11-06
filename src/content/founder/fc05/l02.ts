import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc05-l02",
  title: "Content and technical marketing",
  summary:
    "Technical content as the sales engineer that works while you sleep: which asset serves which stage of a long hardware buying cycle, how to write whitepapers and benchmarks engineers respect, how to get case studies approved, and how to reason about content economics with funnel maths and multi-touch attribution instead of download counts.",
  minutes: 75,
  objectives: [
    "You can map whitepapers, application notes, benchmarks, case studies and posts to the stage of the buying process they serve",
    "You can specify a benchmark that survives scrutiny from a sceptical engineer (method, disclosure, fairness, reproducibility)",
    "You can compute first-touch, last-touch, linear and U-shaped attribution for an opportunity and explain why they disagree",
    "You can estimate the cost, cost per qualified lead and ROI of a content asset and compare top-of-funnel with late-stage content",
    "You can plan a case study with the customer approvals it needs, including an anonymised version",
  ],
  concepts: [
    { id: "fc05.content-by-stage", name: "Content by buying stage", description: "Assets matched to the buyer's question at each stage: problem-aware (why is this hard), solution-aware (how could it be solved), vendor evaluation (does yours work), justification (can I defend it internally).", competency: "fc-marketing", related: ["fc05.case-study"] },
    { id: "fc05.technical-whitepaper", name: "Technical whitepaper", description: "A long-form document that teaches the reader how to think about a hard problem, with the mechanism, numbers and trade-offs; the product appears as one way to apply the method, not as the subject.", competency: "fc-marketing" },
    { id: "fc05.benchmark-integrity", name: "Benchmark integrity", description: "A published comparison is credible only with a stated workload, disclosed setup and versions, fair tuning of every system, reproducible scripts, and results that include where you lose.", competency: "fc-marketing", related: ["fc05.proof-ladder"] },
    { id: "fc05.case-study", name: "Case study", description: "Evidence from a real deployment: situation, problem, what was done, measured result, quote. Needs written customer approval; an anonymised version is the usual fallback in hardware test.", competency: "fc-marketing", related: ["fc05.proof-ladder"] },
    { id: "fc05.attribution", name: "Multi-touch attribution", description: "Rules for splitting the credit for an opportunity across the recorded touches before it (first-touch, last-touch, linear, U-shaped), complemented by self-reported attribution.", competency: "fc-marketing" },
    { id: "fc05.content-economics", name: "Content economics", description: "Comparing an asset's full production and distribution cost with the qualified leads, pipeline and gross profit it influences, over its useful life.", competency: "fc-marketing", related: ["fc05.attribution"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why technical content sells, and how to count what it does",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You will not have a sales engineer for a long time, and your engineering partners have limited hours. A good whitepaper on change-impact testing, an application note on synchronising DAQ signals with screen actions, or an honest soiling-loss method note for Mizan does the explaining that a sales engineer would do, for every reader, for years. It is also what a test lead forwards to the five colleagues who must agree before anyone talks to you. Your job is to choose the few assets that move deals, get them made without draining the builders, and know whether they worked.`,
        },
        {
          kind: "md",
          md: md`### Content follows the buyer's question

Enterprise hardware purchases are made by a committee (test lead, test engineers, IT security, procurement, sometimes quality or compliance) over months. Each stage has a different question, and an asset that answers the wrong question at the wrong stage is wasted:

| Stage | Buyer's question | Assets that answer it | Afterwave example |
|---|---|---|---|
| Problem-aware | Why is this so hard, and is it just us? | Posts, talks, short explainers, regulatory primers | "Why rerun-everything stops scaling after the third firmware branch" |
| Solution-aware | How could this be solved in principle? | Whitepaper, method note, webinar | Whitepaper on dependency mapping for physical tests |
| Vendor evaluation | Does your product actually work for us? | Benchmarks, application notes, docs, demo on their data | Lockstep sync accuracy app note with method |
| Justification | Can I defend this choice internally? | Case study, security pack, ROI model, references | On-prem architecture and security questionnaire answers |

Two consequences. First, **late-stage content gets fewer readers but sits on the critical path of real deals**; judging it by downloads undervalues it. Second, **educational content beats product content at the top**: an EU Machinery Regulation primer for test and compliance teams (the Regulation applies from 20 January 2027) is read by people who are not yet looking for a vendor, which is most of your market at any moment.

### Writing a whitepaper engineers respect

A technical whitepaper teaches a method. Structure: the problem with numbers, why the obvious approaches fail, the mechanism of a better approach, a worked example, limits and failure modes, and only then how the product implements it. If the paper is useful with the product name deleted, it is a whitepaper; if not, it is a brochure.

### Benchmarks: the most powerful and most dangerous asset

A benchmark is a rung 3 claim on the proof ladder, so it is attacked like one. The process that keeps it defensible:`,
        },
        {
          kind: "flow",
          title: "A defensible benchmark",
          steps: [
            { label: "Define the question", detail: "One workload that matches a real buyer task, for example: replay 200 historical changes, measure which regressions the selected test subset catches." },
            { label: "Fix the method in advance", detail: "Metrics, datasets, hardware, versions and pass criteria written down before running anything." },
            { label: "Tune everyone fairly", detail: "Competing approaches (including 'rerun all' and expert manual selection) set up as their best users would, ideally reviewed by someone who knows them." },
            { label: "Run and record", detail: "Scripts, raw results, variance across repeated runs, every exclusion with its reason." },
            { label: "Publish with disclosure", detail: "Method, setup, scripts or enough detail to reproduce, and the cases where your approach is worse." },
          ],
          caption: "MLPerf and SPEC are the reference models: fixed run rules, full disclosure, review. Note that some commercial software licences forbid publishing benchmarks of the product without consent (so-called DeWitt clauses): check before naming a competitor.",
        },
        {
          kind: "md",
          md: md`### Counting what content does: funnel and attribution

Any content programme feeds a funnel:`,
        },
        { kind: "equation", formula: "fc05-funnel" },
        {
          kind: "md",
          md: md`The problem is that a deal touches many assets and the CRM only sees some of them. **Attribution** is the rule that splits an opportunity's value $V$ across its recorded touches:

- **First-touch:** all credit to the first recorded touch. Rewards discovery channels.
- **Last-touch:** all credit to the touch just before the lead or opportunity was created. Rewards conversion assets.
- **Linear:** equal credit to every touch.
- **U-shaped (position-based):** 40% to the first touch, 40% to the lead-creation touch, 20% shared by the middle.`,
        },
        { kind: "equation", formula: "fc05-attribution-linear" },
        { kind: "equation", formula: "fc05-attribution-u-shaped" },
        {
          kind: "chart",
          chart: "bar",
          title: "Same pipeline, four attribution models (illustrative share of credit, %)",
          xKey: "channel",
          xLabel: "Channel or asset",
          yLabel: "Share of attributed pipeline (%)",
          series: [
            { key: "first", label: "First-touch" },
            { key: "last", label: "Last-touch" },
            { key: "linear", label: "Linear" },
            { key: "ushape", label: "U-shaped" },
          ],
          data: [
            { channel: "Founder posts", first: 50, last: 5, linear: 25, ushape: 32 },
            { channel: "Whitepaper", first: 20, last: 5, linear: 20, ushape: 17 },
            { channel: "Talks and events", first: 25, last: 10, linear: 20, ushape: 20 },
            { channel: "Case study", first: 0, last: 30, linear: 20, ushape: 16 },
            { channel: "Referral or direct", first: 5, last: 50, linear: 15, ushape: 15 },
          ],
          caption: "Illustrative. Under first-touch the founder's posts look like the whole engine; under last-touch they look worthless and the case study looks critical. Each model is an opinion. Compare them, and add the self-reported answer to 'how did you first hear about us?' on every demo form.",
        },
        {
          kind: "md",
          md: md`### Content economics

Price the asset fully (people time at a loaded hourly rate, design, promotion), then compare it with the gross profit it plausibly influences:`,
        },
        { kind: "equation", formula: "fc05-content-roi" },
        {
          kind: "md",
          md: md`Three facts about the economics:

1. **The big cost is expert time**, not design. An engineer partner's ten hours is the scarce input; plan the asset around an interview and a review, not around them writing it.
2. **Good technical content is an asset with a life of years**, so its cost should be spread over every deal it touches, not charged to the first quarter.
3. **Reuse multiplies the return**: one whitepaper yields a talk, five posts, a webinar, an email sequence for outbound and a section of the sales deck.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Attribution and ROI for two Afterwave assets",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Who gets credit for a EUR 60k pilot opportunity?",
          given: md`Illustrative. A head of test at a humanoid company becomes an opportunity worth EUR 60,000 (paid pilot). Recorded touches in order: (1) reads a founder post, (2) downloads the change-impact whitepaper, (3) attends the founders' conference talk, (4) reads the case study and requests a demo (lead creation).`,
          steps: [
            { md: md`**First-touch:** post EUR 60,000; others 0.` },
            { md: md`**Last-touch:** case study EUR 60,000; others 0.` },
            { md: md`**Linear:** $60{,}000/4 = $ EUR 15,000 to each touch.` },
            { md: md`**U-shaped:** first touch $0.4 \times 60{,}000 = $ EUR 24,000 (post); lead-creation touch EUR 24,000 (case study); middle touches share $0.2 \times 60{,}000 = 12{,}000$, so EUR 6,000 each (whitepaper, talk).` },
            { md: md`**Reading it:** the whitepaper's credit ranges from 0 to 15,000 depending only on the rule. That is why you should never kill an asset on one model's numbers.` },
          ],
          result: md`Credit for the same EUR 60k ranges from 0 to the full value per touch. Use attribution to rank assets roughly, and use buyer conversations to learn what actually convinced them.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Whitepaper economics",
          given: md`Illustrative. Change-impact whitepaper: 60 hours of founder and engineer time at a loaded EUR 100/h, EUR 1,500 design, EUR 2,500 promotion. In its first 12 months: 300 downloads, 30 qualified (right role at a target company), 6 opportunities whose journeys include it, average pilot value EUR 60,000. Average linear credit to the whitepaper in those journeys: 25%. Win rate 25%, gross margin 80%.`,
          steps: [
            { md: md`**Full cost:** $C = 60 \times 100 + 1{,}500 + 2{,}500 = $ **EUR 10,000**.` },
            { md: md`**Cost per qualified lead:** $10{,}000/30 = $ **EUR 333**.` },
            { md: md`**Influenced pipeline:** $6 \times 60{,}000 = $ EUR 360,000 (36 times the cost, but "influenced" means "was present", not "caused").` },
            { md: md`**Attributed pipeline:** $0.25 \times 360{,}000 = $ EUR 90,000.` },
            { md: md`**Attributed gross profit:** $90{,}000 \times 0.25 \times 0.80 = $ EUR 18,000.` },
            { md: md`**ROI:** $(18{,}000 - 10{,}000)/10{,}000 = 0.8$, so **80%** in year one, before reuse in talks and outbound, and before year two.` },
          ],
          result: md`A modest positive first-year return that improves with every reuse. The weak link is not production cost; it is the 30 to 6 conversion from qualified reader to opportunity, which is a follow-up problem, not a content problem.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Case study economics: few readers, high leverage",
          given: md`Illustrative. A case study from a first pilot costs 25 hours at EUR 100/h plus EUR 500 design. It is sent in 8 late-stage opportunities worth EUR 60,000 each. Sales notes suggest it lifts win rate on those deals from 25% to 30%.`,
          steps: [
            { md: md`Cost $= 25 \times 100 + 500$.` },
            { md: md`= **EUR 3,000**.`, hidden: true, check: { prompt: "Full cost of the case study (EUR)", answer: 3000, unit: "EUR", tolerance: { abs: 1 } } },
            { md: md`Pipeline it touches: $8 \times 60{,}000 = 480{,}000$ EUR.` },
            { md: md`Incremental expected bookings $= 480{,}000 \times (0.30 - 0.25)$.` },
            { md: md`= **EUR 24,000**, eight times the cost, from an asset with perhaps 40 readers.`, hidden: true, check: { prompt: "Incremental expected bookings (EUR)", answer: 24000, unit: "EUR", tolerance: { abs: 10 } } },
          ],
          result: md`Late-stage content is judged on win-rate effect, not readership. If you can only make one asset this quarter and you have a willing pilot customer, make the case study.`,
        },
        {
          kind: "question",
          question: {
            id: "fc05-l02-p1",
            type: "numeric",
            prompt: md`An opportunity worth EUR 80,000 has five recorded touches. Under U-shaped attribution, how much credit does each of the three middle touches receive? (EUR)`,
            answer: 5333,
            tolerance: { abs: 2 },
            unit: "EUR",
            explanation: md`Middle touches share 20%: $0.2 \times 80{,}000 = 16{,}000$, split three ways $= 5{,}333$ EUR each. First and lead-creation touches get EUR 32,000 each.`,
            concepts: ["fc05.attribution"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Producing technical content without draining the builders",
      blocks: [
        {
          kind: "md",
          md: md`### The production system

1. **You pick the question** from real sales calls: the objection or confusion you heard three times this month.
2. **Interview the expert for 60 minutes** (Ismail or Yusuf for test methodology, Omar for plant data), recorded and transcribed.
3. **You or a technical writer draft** from the transcript; AI tools are useful for structure and first drafts, never for numbers or claims you have not checked.
4. **Expert review for accuracy only** (one pass, 30 to 60 minutes), with a written list of claims to confirm.
5. **Publish and reuse**: post series, talk, webinar, outbound sequence, sales deck section.
6. **Track** downloads by role, qualified leads, opportunities touched, and ask every new opportunity what they read.

### Case studies in hardware test

Test data and failure modes are among a hardware company's most sensitive information, so case studies need planning from the first pilot contract:

- Put a **publicity clause** in the pilot agreement: right to use the customer's name and logo and to publish a case study, subject to written approval of the final text.
- Agree **what can be measured and published** at the start (for example: test hours saved per change, share of regressions caught), so the pilot produces the evidence.
- Offer an **anonymised version** ("a European humanoid manufacturer") when the named one is refused; it is still rung 3 evidence if the method is stated.
- In Kuwait and the Gulf, approval for naming a government body or state-owned operator goes through its own communications or legal function and can take weeks; for Mizan's work with KISR, nothing is published without KISR's written approval.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Gating everything.** A form in front of every PDF kills forwarding inside the buying committee. Gate only assets whose readers you genuinely want to follow up, and leave educational content open.
- **Counting downloads.** 300 downloads from students and competitors are worth less than five from heads of test at target accounts. Count by role and company fit.
- **Benchmarks that only show wins.** Experienced engineers assume a benchmark with no losing case was tuned until it won.
- **Unapproved customer details.** A recognisable rig photo or a failure-mode description can identify a customer even without a name.
- **Ghost-written expertise.** An agency-written whitepaper on a field it does not understand is spotted in the first paragraph by your real audience.`,
        },
        { kind: "sources", refs: ["fc05-r8", "fc05-r9", "fc05-r10", "fc05-r6", "fc05-r7"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Brand vs activation split: treat published ratios with care",
          md: md`Binet and Field's analysis of the IPA databank is often summarised as "60% brand building, 40% activation", but that work is mainly on consumer brands. Later B2B work with the LinkedIn B2B Institute suggested a different balance, and the "95:5" argument (only a small share of B2B buyers in market at any time) depends heavily on purchase-cycle length. Use these as reasons to keep investing in educational content, not as precise budget rules for a seed-stage company.`,
        },
        {
          kind: "checklist",
          title: "Before publishing a technical asset",
          items: [
            "Answers one real buyer question heard in sales calls, at one named stage",
            "Useful with the product name removed",
            "Every number has a method, base and source; expert has reviewed all claims",
            "Benchmarks: method fixed in advance, setup disclosed, competitors tuned fairly, losing cases shown, licence terms checked",
            "Customer details approved in writing, including photos and failure descriptions",
            "Reuse plan written (posts, talk, outbound, deck) and tracking set up (role, company fit, opportunities touched)",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask before commissioning a content agency or freelancer",
          items: [
            "Show me technical pieces you wrote for engineers, and who reviewed them",
            "How will you get the substance from our experts in under two hours of their time?",
            "Which of our claims would you challenge, and what evidence would you want?",
            "How will you measure whether the asset helped deals, not just traffic?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc05-l02-p2",
            type: "short",
            prompt: md`Produce a two-quarter technical content plan for **Afterwave** with: (1) one cornerstone whitepaper (title, buyer question, outline of five sections), (2) one benchmark specification (question, workload, metrics, competitors or baselines, disclosure), (3) a case study plan including the contract clause and an anonymised fallback, (4) a reuse map, and (5) the metrics you will report with at least one formula. Do not invent results or customers.`,
            rubric: [
              "Whitepaper teaches a method (for example change impact or rig and screen synchronisation) and names the stage and buyer question; useful without the product",
              "Benchmark spec fixes workload, metrics and method in advance, includes fair baselines (rerun-all, expert selection), disclosure and a plan to show losing cases",
              "Case study plan includes a publicity clause with approval rights, agreed measurable outcomes and an anonymised fallback",
              "Reuse map turns each asset into at least three derived pieces (posts, talk, outbound, deck)",
              "Metrics are qualified leads by role and opportunities touched, with CPQL or ROI formula and at least two attribution views, not downloads alone",
              "No invented results, customers or numbers presented as fact",
            ],
            modelAnswer: md`**1. Whitepaper:** "What to rerun after a change: dependency-based test selection for physical systems". Stage: solution-aware. Buyer question: how can we stop rerunning everything without missing regressions? Outline: (a) the cost of rerun-all as firmware, model and rig variants multiply, with an illustrative calculation; (b) why manual selection and code-coverage methods miss rig and model dependencies; (c) building a dependency map from test definitions, firmware modules, models and rig configuration; (d) worked example on an illustrative motor test suite; (e) limits: unknown couplings, flaky tests, when to fall back to full reruns.

**2. Benchmark spec:** Question: on replayed historical changes, what share of regressions does each selection method catch, and at what test cost? Workload: a design partner's change history (with permission) or a public or synthetic suite clearly labelled as such. Metrics: regressions caught over regressions found by full rerun; test hours run; false negatives listed individually. Baselines: rerun-all, expert manual selection done by an experienced test engineer, Ripple. Disclosure: dataset description, versions, scripts or enough detail to reproduce, variance over repeated runs, every miss explained.

**3. Case study plan:** pilot agreement includes the right to publish a case study and use the name and logo subject to written approval of the text; at kickoff we agree measurable outcomes (test hours per change, share of regressions caught, time to decision). Fallback: anonymised "a European robotics manufacturer" version with the same method section.

**4. Reuse:** whitepaper becomes a conference talk, a five-post series, a webinar with Q&A, a three-email outbound sequence and the problem section of the sales deck; the benchmark becomes an application note and a demo script; the case study becomes a one-page PDF for late-stage deals.

**5. Metrics:** qualified leads by role and target-company fit; opportunities touched; CPQL $= C/N_q$; ROI $= (P_{\text{attr}} w g - C)/C$ under linear and U-shaped attribution, plus self-reported "how did you hear about us" on every demo request. Downloads are reported but not used to decide.`,
            explanation: md`The plan should be small, tied to real buyer questions, honest about what does not exist yet, and measured on pipeline influence rather than traffic.`,
            concepts: ["fc05.technical-whitepaper", "fc05.benchmark-integrity", "fc05.case-study", "fc05.content-economics", "fc05.attribution"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc05-l02-q1",
      type: "mcq",
      prompt: "A test lead's IT security team must approve Afterwave before a pilot. Which asset answers their question?",
      options: [
        "A thought-leadership post on physical AI",
        "The change-impact whitepaper",
        "An on-prem architecture and security pack with answers to a standard questionnaire",
        "A trade show brochure",
      ],
      answer: 2,
      explanation: md`IT security is at the justification stage: can this run on our servers safely? Architecture, data flows and questionnaire answers are the content that unblocks it.`,
      concepts: ["fc05.content-by-stage"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc05-l02-q2",
      type: "numeric",
      prompt: md`A webinar costs EUR 4,500 all-in and produces 15 qualified leads. What is the cost per qualified lead? (EUR)`,
      answer: 300,
      tolerance: { abs: 1 },
      unit: "EUR",
      explanation: md`$4{,}500/15 = 300$ EUR. Comparable with the whitepaper's EUR 333 only if the same qualification criteria were used.`,
      concepts: ["fc05.content-economics"],
      difficulty: 1,
    },
    {
      id: "fc05-l02-q3",
      type: "multi",
      prompt: "Which make a published benchmark defensible? (Select all that apply.)",
      options: [
        "Method and metrics fixed before running",
        "Competing approaches tuned as their best users would",
        "Only showing workloads where you win",
        "Disclosed setup, versions and scripts",
        "Checking competitor licence terms before naming them",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Showing only wins signals that the benchmark was tuned until it won. Licence terms matter because some software licences restrict publishing benchmarks.`,
      concepts: ["fc05.benchmark-integrity"],
      difficulty: 1,
    },
    {
      id: "fc05-l02-q4",
      type: "numeric",
      prompt: md`An EUR 50,000 opportunity has 4 recorded touches. Under linear attribution, what credit does each touch get? (EUR)`,
      answer: 12500,
      tolerance: { abs: 1 },
      unit: "EUR",
      explanation: md`$50{,}000/4 = 12{,}500$ EUR per touch.`,
      concepts: ["fc05.attribution"],
      difficulty: 1,
    },
    {
      id: "fc05-l02-q5",
      type: "numeric",
      prompt: md`An asset costs EUR 8,000. Attributed pipeline is EUR 100,000, win rate 20%, gross margin 75%. What is its ROI? (as a decimal, 3 decimals)`,
      answer: 0.875,
      tolerance: { abs: 0.002 },
      explanation: md`Gross profit $= 100{,}000 \times 0.20 \times 0.75 = 15{,}000$. ROI $= (15{,}000 - 8{,}000)/8{,}000 = 0.875$, so 87.5%.`,
      concepts: ["fc05.content-economics"],
      difficulty: 2,
    },
    {
      id: "fc05-l02-q6",
      type: "decision",
      prompt: md`Under last-touch attribution, the founder's LinkedIn posts get almost no credit, and an advisor suggests stopping them to free six hours a week. What do you do?`,
      options: [
        { text: "Stop the posts; the data is clear.", score: 0, feedback: "Last-touch structurally ignores discovery channels. You would be cutting the top of the funnel based on a model that cannot see it." },
        { text: "Compare first-touch, linear and U-shaped views, and read the self-reported 'how did you hear about us' answers before deciding.", score: 1, feedback: "Right: attribution models are opinions; triangulate with what buyers say." },
        { text: "Double the posting to compensate.", score: 0.2, feedback: "No evidence for that either. Decide on triangulated data." },
      ],
      explanation: md`Different models give the same channel anywhere from 5% to 50% of credit (see the chart). Self-reported attribution often reveals dark-social channels that no model sees.`,
      concepts: ["fc05.attribution"],
      difficulty: 2,
    },
    {
      id: "fc05-l02-q7",
      type: "mcq",
      prompt: "What is the best test of whether a document is a technical whitepaper rather than a brochure?",
      options: [
        "It is longer than ten pages",
        "It has a gated download form",
        "It is still useful to the reader with the product name deleted",
        "It includes customer logos",
      ],
      answer: 2,
      explanation: md`A whitepaper teaches a method; the product is one implementation of it.`,
      concepts: ["fc05.technical-whitepaper"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc05-l02-f1", front: "Four buying stages and their questions", back: "Problem-aware (why is this hard), solution-aware (how could it be solved), vendor evaluation (does yours work), justification (can I defend it).", concepts: ["fc05.content-by-stage"] },
    { id: "fc05-l02-f2", front: "U-shaped attribution split", back: "40% first touch, 40% lead-creation touch, 20% shared by the middle touches.", concepts: ["fc05.attribution"] },
    { id: "fc05-l02-f3", front: "Content ROI formula", back: md`$\text{ROI} = (P_{\text{attr}}\,w\,g - C)/C$`, concepts: ["fc05.content-economics"] },
    { id: "fc05-l02-f4", front: "Biggest cost of technical content", back: "Expert time. Plan around a 60-minute interview and one review pass.", concepts: ["fc05.content-economics"] },
    { id: "fc05-l02-f5", front: "Five steps of a defensible benchmark", back: "Define the question, fix method in advance, tune everyone fairly, run and record, publish with disclosure including losses.", concepts: ["fc05.benchmark-integrity"] },
    { id: "fc05-l02-f6", front: "How to judge a case study", back: "By its effect on win rate in late-stage deals, not by readership.", concepts: ["fc05.case-study"] },
    { id: "fc05-l02-f7", front: "Contract clause that makes case studies possible", back: "Publicity clause in the pilot agreement: right to publish name, logo and a case study subject to written approval of the text.", concepts: ["fc05.case-study"] },
  ],
};

export default lesson;
