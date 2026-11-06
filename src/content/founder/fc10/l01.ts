import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc10-l01",
  title: "Research and synthesis with Claude: market maps, teardowns and checked citations",
  summary:
    "Turn Claude into a research assistant that works from sources, not memory: scope the question, build a claim ledger with quotes and dates, synthesise market maps and competitor teardowns from it, and check citations with a sampling rule you can defend.",
  minutes: 75,
  objectives: [
    "Explain why answers from model memory fail on exactly the facts founders need (funding, customers, dates, prices) and what grounding changes",
    "Run a research task as a pipeline: decision, source plan, claim ledger, synthesis, citation check",
    "Build a market map and a competitor teardown where every cell is sourced or marked 'not found'",
    "Size a citation spot check with the detection formula and know when to check every row instead",
  ],
  concepts: [
    {
      id: "fc10.source-grounded-research",
      name: "Source-grounded research",
      description:
        "Research where the model answers only from documents it has retrieved or been given in the conversation, quoting them, instead of from its trained memory.",
      competency: "fc-ai",
      related: ["m14.hallucination", "m14.llm-strengths-limits"],
    },
    {
      id: "fc10.claim-ledger",
      name: "Claim ledger",
      description:
        "A table of atomic claims, each with source URL, publication date, verbatim quote, source type and confidence; the only input allowed into the synthesis.",
      competency: "fc-ai",
      related: ["fc10.source-grounded-research", "fc10.citation-check"],
    },
    {
      id: "fc10.market-map",
      name: "Market map",
      description:
        "A structured view of the companies serving a problem, segmented on axes that matter to the buyer (deployment, data type, workflow stage), used to locate whitespace and positioning.",
      competency: "fc-ai",
      related: ["fc10.competitor-teardown"],
    },
    {
      id: "fc10.competitor-teardown",
      name: "Competitor teardown",
      description:
        "A fixed-format analysis of one competitor: what it does, who buys, deployment, pricing, funding, proof points, gaps, each cell sourced or marked not found.",
      competency: "fc-ai",
      related: ["fc10.market-map", "fc10.claim-ledger"],
    },
    {
      id: "fc10.citation-check",
      name: "Citation check",
      description:
        "Opening each cited source and confirming that it exists, is dated, and actually supports the specific claim; sized by sampling for large internal tables, exhaustive for anything external.",
      competency: "fc-ai",
      related: ["m14.verification-habits", "fc10.claim-ledger"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why memory fails, what grounding fixes, and how big a spot check must be",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You research three markets at once: hardware test tooling for Afterwave, PV soiling and O&M in the Gulf for Mizan, the Arab builder ecosystem for Suhail. Investors, YC partners and procurement committees will test your market slides by asking where a number came from. Claude can compress a week of desk research into an afternoon, but only if the output is a set of claims you can trace to a source in one click. One invented funding round in a competitor slide costs more credibility than the whole afternoon saved.`,
        },
        {
          kind: "xref",
          to: "m14-l01",
          note: "How LLMs generate text, knowledge cutoffs and why hallucinations happen are covered in Track 0. This lesson assumes that and goes straight to research workflow.",
        },
        {
          kind: "md",
          md: md`### Two ways a model can answer a research question

**From memory (parametric knowledge).** The model reproduces patterns from its training data. That works for stable, widely written facts (what DMARC is, how a SAFE converts). It fails on the facts founders need most: **who raised what and when, who the customers are, current prices, product launches in the last year**. These are sparse, recent and similar to thousands of other facts, so the model blends them and produces a fluent, specific, wrong answer. A funding round with the right investor and the wrong year is the typical output.

**From sources (grounded).** The model searches the web or reads documents you supply, then answers from that text. Grounding changes the failure mode, it does not remove it. The remaining errors are:

| Failure | What it looks like | Check |
|---|---|---|
| Citation laundering | A real URL attached to a claim it does not support | Open it, find the quote |
| Secondary drift | A blog's paraphrase of a press release, with the number changed | Go to the primary (company release, filing, regulator) |
| Stale source | A 2023 pricing page quoted as current | Record the source date on every claim |
| Over-generalisation | "Supports on-prem" from one line about a single government customer | Quote the exact sentence |
| Absence as evidence | "Competitor X has no change-impact feature" | Write **not found in sources searched**, never "does not exist" |

### The research pipeline

The fix is structural: separate **collecting claims** from **writing conclusions**, and make every conclusion cite claims.`,
        },
        {
          kind: "flow",
          title: "Research pipeline with Claude",
          steps: [
            { label: "1. Decision and question", detail: "What decision does this research serve? Which 3 to 5 questions, if answered, change it?" },
            { label: "2. Source plan", detail: "Primary sources first: company sites, docs, press releases, filings, regulators, standards. Then trade press. Then trackers." },
            { label: "3. Claim ledger", detail: "Claude extracts atomic claims with URL, date, verbatim quote, source type. No synthesis yet." },
            { label: "4. Synthesis", detail: "Market map, teardown or memo written only from ledger rows, each sentence tagged with row ids." },
            { label: "5. Citation check", detail: "Fresh conversation or human: open sources, confirm quotes. Sample internal tables; check external ones fully." },
            { label: "6. Decision memo", detail: "What you now believe, how confident, what is still unknown, what you will do." },
          ],
          caption: "Steps 3 and 4 are separated on purpose: a model asked to 'research and summarise' in one pass hides weak sourcing inside smooth prose.",
        },
        {
          kind: "md",
          md: md`### Market maps and teardowns are tables, not essays

A **market map** answers "who else touches this problem, and where is the gap?". Choose axes that matter to the buyer, not to you. For Afterwave a useful pair is *data scope* (telemetry and logs only, or rig signals plus on-screen actions on one clock) against *deployment* (cloud SaaS, or customer servers and isolated tenants). A **teardown** goes deep on one company in a fixed format so you can compare like with like. The fixed format is what makes Claude useful: it fills a schema, and an empty cell is visible.

### How big must a citation spot check be?

For a large internal table (a 40-row market map, a 300-row lead list) you will not open every source. Sampling tells you what a clean sample proves. If a share $p$ of rows is wrong and you check $n$ rows at random, the chance of seeing at least one error is:`,
        },
        { kind: "equation", formula: "fc10-detect-prob" },
        {
          kind: "md",
          md: md`Solving for $n$ at a confidence $C$ gives the sample you need:`,
        },
        { kind: "equation", formula: "fc10-sample-size" },
        {
          kind: "chart",
          chart: "line",
          title: "Chance a spot check finds at least one error",
          xKey: "n",
          xLabel: "Rows checked (n)",
          yLabel: "P(at least one error found), %",
          series: [
            { key: "p02", label: "true error rate 2 %" },
            { key: "p05", label: "true error rate 5 %" },
            { key: "p10", label: "true error rate 10 %" },
          ],
          data: [
            { n: 0, p02: 0, p05: 0, p10: 0 },
            { n: 5, p02: 9.6, p05: 22.6, p10: 41.0 },
            { n: 10, p02: 18.3, p05: 40.1, p10: 65.1 },
            { n: 15, p02: 26.1, p05: 53.7, p10: 79.4 },
            { n: 20, p02: 33.2, p05: 64.2, p10: 87.8 },
            { n: 30, p02: 45.5, p05: 78.5, p10: 95.8 },
            { n: 40, p02: 55.4, p05: 87.1, p10: 98.5 },
            { n: 60, p02: 70.2, p05: 95.4, p10: 99.8 },
          ],
          caption: "Computed from P = 1 - (1 - p)^n. Five clean rows prove almost nothing. The practical rule: sample to find out whether a table is bad; once you find one fabricated cell, check every row that leaves the company.",
        },
        {
          kind: "matrix",
          title: "How much checking a claim needs",
          xAxis: ["Internal use only", "Goes to investors, customers, tenders"],
          yAxis: ["Secondary or single source", "Primary source, quoted"],
          cells: [
            { label: "Sample check", detail: "Spot-check by the sampling rule; fix patterns, not just rows." },
            { label: "Check every claim", detail: "Open each source, confirm the quote and date. Mark source type on the slide notes." },
            { label: "Flag as unverified", detail: "Usable for internal thinking with an explicit flag. Look for the primary before it matters." },
            { label: "Find the primary or drop it", detail: "Never put a single-source funding figure or customer name in a deck. Say 'reported' and link, or remove." },
          ],
          caption: "Top row: primary sources, quoted. Bottom row: secondary or single sources. The right column is where founders get caught.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Checking an Afterwave market map before it goes into a deck",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A 40-row test-tooling market map: what does a sample tell you?",
          given: md`Illustrative. You asked Claude (with web search) to map 40 companies around hardware test data: test-data platforms, robotics data and visualisation tools, incumbent test and measurement suites, requirements and test-management tools. Each row has: what it does, deployment, named customers, last funding round, and a claim about change-impact or test selection, each with a URL. You open the sources for 12 randomly chosen rows and find 2 problems: one funding round attributed to the wrong year, and one "named customer" that appears nowhere in the cited page.`,
          steps: [
            { md: md`**Point estimate of the error rate:** $2/12 = 16.7\%$ of rows have at least one bad cell. With 12 rows this is a rough estimate, but it is far from "nearly clean".` },
            { md: md`**What a clean sample would have meant:** if the true rate were 5 %, the chance of seeing *no* error in 12 rows is $0.95^{12} = 0.54$. Even a clean 12-row sample could not have ruled out a 5 % error rate. Twelve rows was enough to detect a bad table, not to certify a good one.` },
            { md: md`**Expected bad rows in the full table:** $40 \times 0.167 \approx 7$ rows. If the map goes into the YC application or an investor deck, 7 wrong rows means a partner who knows the space will find one.` },
            { md: md`**Pattern, not just rows:** both errors are in the two fields that live in model memory rather than on a company's own pages (funding dates and customer names). Ask Claude to re-extract those two columns only, with a verbatim quote for each, and leave the cell blank when no quote exists.` },
            { md: md`**Conflicts are data, not noise.** The course's own research brief shows the right behaviour: for Nominal it records the March 2026 round from the company's press release and notes that two trackers give conflicting totals raised (about USD 155M against USD 183M), marked as conflicting. Your ledger keeps both values, both sources, and uses neither total in a deck.` },
            { md: md`**Decision:** the deck version shows only 12 to 15 companies that matter to the positioning argument, every cell checked against a primary source. The 40-row map stays internal, flagged with its sampling result.` },
          ],
          result: md`A sample of 12 found an estimated 17 % row error rate, concentrated in funding and customer fields. Re-extract those fields with quotes; check every row that leaves the company. The sample was not wasted: it told you the table was not fit to publish.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Sizing the check for a Mizan competitor table",
          given: md`Illustrative. Claude has built a 40-row table of PV soiling sensors, cleaning-robot suppliers and O&M analytics vendors active in the Gulf, for an internal positioning workshop. You want 95 % confidence of catching an error rate of 10 % or more.`,
          steps: [
            { md: md`Sample size: $n = \ln(1-0.95)/\ln(1-0.10) = \ln 0.05/\ln 0.90 = -2.996/-0.1054$.` },
            {
              md: md`$n = 28.4$, round up to **29 rows**.`,
              hidden: true,
              check: { prompt: "Rows to check (round up)", answer: 29, unit: "rows", tolerance: { abs: 0.5 } },
            },
            { md: md`Your colleague proposes checking 20 rows instead. Probability that 20 rows reveal at least one error if the true rate is 10 %: $1 - 0.9^{20}$.` },
            {
              md: md`$P_d = 1 - 0.1216 = 0.878$, so **87.8 %**.`,
              hidden: true,
              check: { prompt: "Detection probability with 20 rows (%)", answer: 87.8, unit: "%", tolerance: { abs: 0.3 } },
            },
            { md: md`29 of 40 rows is nearly the whole table. For a table this small, check all 40: the marginal 11 rows cost about 20 minutes and remove the question entirely.` },
          ],
          result: md`Sampling earns its keep on tables of hundreds of rows (lead lists, scraped tender notices). Under about 50 rows, or when anything is external, check everything.`,
        },
        {
          kind: "question",
          question: {
            id: "fc10-l01-p1",
            type: "numeric",
            prompt: md`A 300-row lead list was enriched by an AI tool. You want 95 % confidence of detecting an error rate of 5 % or more. How many rows must you check?`,
            answer: 59,
            tolerance: { abs: 0.5 },
            unit: "rows",
            explanation: md`$n = \ln 0.05/\ln 0.95 = 2.996/0.0513 = 58.4$, round up to **59**. Note that $n$ does not depend on the list size as long as the list is much larger than the sample. If the sample finds even one wrong title or email, that tells you about the enrichment source, not just one row.`,
            concepts: ["fc10.citation-check"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running research with Claude in practice: templates, traps and the exercise",
      blocks: [
        {
          kind: "md",
          md: md`### Set-up that pays back

- **One Project (or folder) per venture** with a short context file: what the company does, ICP, what is confidential, house rules on sources. Claude reads it every time instead of you retyping it.
- **Web search on** for anything recent; **your own documents uploaded** for anything proprietary (call notes, pilot reports). Tell Claude which is which.
- **A fixed output schema** for each research type. You will reuse the same four templates for years across ventures.

### Template 1: research brief (start every research task with this)

    ROLE: You are a research analyst. You work only from sources you retrieve
    in this conversation or that I attach. You never fill gaps from memory.

    DECISION THIS SERVES: [e.g. which segment Afterwave targets first for paid pilots]
    QUESTIONS (answer each separately):
      Q1 [..]  Q2 [..]  Q3 [..]
    SCOPE: [geography, period, company types]. Ignore sources older than [date]
    unless they are standards or laws.
    SOURCE ORDER: 1) company websites, docs, press releases, filings, regulators,
    standards; 2) established trade press; 3) aggregators and trackers (flag them).

    OUTPUT, STEP 1 ONLY: a claim ledger table with columns
      id | claim (one fact) | source URL | source date | verbatim quote |
      source type (primary / secondary / tracker) | confidence (high/med/low)
    Rules: one fact per row. If two sources disagree, make two rows and mark
    CONFLICT. If you searched and found nothing, write a row "NOT FOUND:
    [what you looked for, where]". Do not write any conclusions yet.

### Template 2: synthesis from the ledger

    Using ONLY the claim ledger above, write [a market map / a one-page memo].
    Tag every sentence with the ledger ids it relies on, e.g. [C4, C9].
    A sentence with no ledger id is not allowed; if you need one, say what
    claim is missing instead. End with: (a) what we now believe, (b) confidence,
    (c) open questions, (d) the cheapest way to answer each open question
    (a customer call, a docs page, a sales demo request).

### Template 3: competitor teardown

    Teardown of [COMPANY] for [VENTURE]. Fill this schema; every cell cites
    ledger ids or says NOT FOUND.
      What it does (their words, quoted) | Primary buyer and user
      Deployment (SaaS / hybrid / on-prem / air-gapped) | Data types handled
      Pricing model and any public prices | Last funding (round, lead, date)
      Named customers (only if named by the company or the customer)
      Recent launches (last 12 months) | Where it overlaps us | Where it does not
      What a buyer would say is its weakness (only from reviews, talks, docs)
    Finish with three questions I should ask a mutual customer.

### Template 4: citation check (run in a fresh conversation)

    You are checking another analyst's work. For each row below, open the URL,
    find the quote, and return: id | URL works (Y/N) | quote found (Y/N) |
    quote supports the claim exactly / partly / not | source date | note.
    Be adversarial: a partial match is a fail. Do not repair rows; report them.

The fresh conversation matters: a model asked to check its own answer in the same thread tends to defend it. A clean context reading only the ledger and the sources is a different reader.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **"Research and summarise" in one prompt.** You get a confident essay with five links at the bottom, none tied to a sentence. Always ledger first.
- **Survivorship in the map.** Search finds companies with press coverage and funding announcements. Bootstrapped specialists and incumbents' internal tools, often the real competition for a test team, are invisible. Ask customers what they use today.
- **Marketing copy as capability.** "AI-powered root cause" on a landing page is a claim about marketing, not about the product. Teardown cells about capability should come from docs, demos or users.
- **Recency illusion.** For anything time-sensitive (regulation dates, programme deadlines, funding), record the source date and re-check before external use.
- **Pasting confidential material into the wrong tool.** Customer call notes, pilot data and anything under NDA go only into tools your company has approved for that data.`,
        },
        {
          kind: "xref",
          to: "m14-l06",
          note: "Data classification and what never goes into an external AI tool are covered in Track 0; apply the same rules to customer and pilot data in your ventures.",
        },
        {
          kind: "checklist",
          title: "Before a research output leaves your desk",
          items: [
            "Every sentence traces to a ledger row; every ledger row has a quote and a source date",
            "Funding figures and customer names come from the company's own release or the customer, not a tracker",
            "Conflicts are shown, not averaged",
            "Absence is written as 'not found in sources searched', with what was searched",
            "Citation check done: all rows for external use, sampled rows for internal tables, result recorded",
            "Anything uncertain is labelled as such on the slide or in the speaker notes",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc10-l01-p2",
            type: "short",
            prompt: md`**Produce it.** Pick one real adjacent company for Afterwave (for example Sift, Nominal, Foxglove or Marple) or for Mizan (a soiling-analytics or cleaning-robot supplier you will meet in the Gulf). Write (a) a claim ledger of 6 to 8 rows in the Template 1 format, using real sources you have opened, and (b) a teardown of at most 10 lines from Template 3 that cites the ledger ids and ends with three questions for a mutual customer.`,
            rubric: [
              "Ledger rows are atomic (one fact each) with URL, source date, verbatim quote and source type",
              "At least half the rows are primary sources (company site, docs, press release, regulator); trackers are flagged",
              "At least one row is NOT FOUND or CONFLICT, handled explicitly rather than filled from memory",
              "Teardown cites ledger ids for every capability, funding or customer statement",
              "Overlap and non-overlap with the venture are concrete (data scope, deployment, workflow stage), not adjectives",
              "Ends with three customer questions that would resolve the biggest open uncertainty",
            ],
            modelAnswer: md`**Ledger (Sift, for Afterwave; sources as recorded in the course research brief. In a real answer every quote column holds the exact sentence copied from the page.)**

| id | claim | source | date | quote (abridged) | type |
|---|---|---|---|---|---|
| C1 | Sift positions itself as an observability layer for hardware | docs.siftstack.com, What is Sift | n/a | "observability layer for hardware" | primary |
| C2 | Deployment options include SaaS, hybrid and fully on-prem | Sift docs | n/a | (deployment section) | primary |
| C3 | Raised a USD 42M Series B led by StepStone | Sift blog post on the round | 2026-03 | (round announcement; copy the exact sentence) | primary |
| C4 | Round date given as 25 Mar 2026; another tracker dates it to Jul 2025 | Tracxn / PitchBook | 2026 | n/a | tracker, CONFLICT |
| C5 | Sift Agents in research preview: agents investigate telemetry, turn findings into rules, human approval before changes | IT Brief | 2026-09 | (copy the exact sentence on approval) | secondary |
| C6 | Change-impact or test-selection feature | searched docs, blog, press | 2026-11 | NOT FOUND | n/a |
| C7 | Named customers include K2 Space and Astranis | Sift blog | 2026-03 | (customer list) | primary |

**Teardown.** What it does: telemetry ingestion, rules, alerts and review for hardware programmes [C1]. Buyer: aerospace and space hardware teams [C7]. Deployment: SaaS to fully on-prem [C2], which neutralises an on-prem argument for us. Funding: USD 42M Series B [C3]; date conflict between trackers [C4], so cite the company post only. Recent: agentic investigation with human approval [C5]. Overlap: data review and anomaly detection on test telemetry. Non-overlap: no change-impact test selection found [C6]; no evidence of capturing on-screen operator actions with rig signals on one clock (not found, not "absent"). Questions for a mutual customer: (1) When firmware changes, how do you decide which rig tests to rerun today, and does Sift play any part? (2) Does Sift see what the operator did on the test software, or only the signals? (3) Who approved Sift on-prem, and what did the security review require?`,
            explanation: md`The grader checks traceability, explicit handling of unknowns and the usefulness of the comparison. A teardown full of adjectives and memory-sourced funding numbers fails even if it reads well.`,
            concepts: ["fc10.competitor-teardown", "fc10.claim-ledger", "fc10.citation-check"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a YC partner, in under a minute, why your competitor slide can be trusted even though an AI helped build it.",
          keyPoints: [
            "Claims were collected separately from conclusions, each with a source, date and quote",
            "Funding and customer facts come from primary sources; conflicts are shown",
            "Every external row was opened and checked; internal tables were sampled and the result recorded",
            "Unknowns are labelled 'not found', not presented as absence",
            "Customer conversations, not desk research, decide the positioning",
          ],
        },
        { kind: "sources", refs: ["fc10-r1", "fc10-r19"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc10-l01-q1",
      type: "mcq",
      prompt: "Which kind of fact is a model most likely to get wrong when answering from memory?",
      options: [
        "The definition of DMARC",
        "A specific startup's latest funding round, lead investor and date",
        "How a capital recovery factor is derived",
        "The difference between B2B and B2C sales",
      ],
      answer: 1,
      explanation: md`Sparse, recent, look-alike facts are blended in training data and reproduced fluently but wrongly. Stable, widely written concepts are much safer. Funding rounds are the classic founder-research hallucination.`,
      concepts: ["fc10.source-grounded-research"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc10-l01-q2",
      type: "order",
      prompt: "Put the research pipeline in order.",
      items: [
        "State the decision and the 3 to 5 questions",
        "Plan sources, primary first",
        "Extract a claim ledger with quotes and dates",
        "Synthesise only from ledger rows",
        "Check citations in a fresh context",
        "Write the decision memo with confidence and open questions",
      ],
      explanation: md`Separating extraction (ledger) from synthesis is the core move: it makes weak sourcing visible before it is hidden in prose.`,
      concepts: ["fc10.claim-ledger", "fc10.source-grounded-research"],
      difficulty: 1,
    },
    {
      id: "fc10-l01-q3",
      type: "numeric",
      prompt: md`If 10 % of rows in a large table are wrong and you check 10 random rows, what is the probability (in %) of finding at least one error?`,
      answer: 65.1,
      tolerance: { abs: 0.3 },
      unit: "%",
      explanation: md`$1 - 0.9^{10} = 1 - 0.349 = 0.651$, so 65.1 %. A clean 10-row sample still leaves a one-in-three chance that a 10 % error rate is hiding.`,
      concepts: ["fc10.citation-check"],
      difficulty: 2,
    },
    {
      id: "fc10-l01-q4",
      type: "multi",
      prompt: "Which are failure modes that remain even when Claude answers from retrieved sources? (Select all that apply.)",
      options: [
        "A real URL attached to a claim it does not support",
        "A secondary source's paraphrase with a changed number",
        "An old pricing page presented as current",
        "Writing 'does not exist' when nothing was found",
        "The model refusing to search at all",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`Grounding moves the risk from invention to misreading, drift, staleness and absence-as-evidence. Each needs its own check: open the source, go to the primary, record dates, write 'not found'.`,
      concepts: ["fc10.source-grounded-research", "fc10.citation-check"],
      difficulty: 2,
    },
    {
      id: "fc10-l01-q5",
      type: "decision",
      prompt: md`Two hours before you submit the YC application, Claude suggests adding "Competitor X is used by BMW" to strengthen the market slide. The cited link is a tracker profile; BMW does not appear on X's own site. What do you do?`,
      options: [
        { text: "Include it: the tracker is a known source.", score: 0, feedback: "A tracker is a secondary aggregation. A wrong customer name in an application is exactly what a partner can check in one search." },
        { text: "Drop the claim unless you can find the company's or BMW's own statement; the slide does not need it.", score: 1, feedback: "Right. Named customers must come from the company or the customer. The positioning argument does not depend on this fact." },
        { text: "Include it as 'reportedly used by BMW'.", score: 0.4, feedback: "Better than stating it flat, but it still puts an unverified name in front of investors for no gain." },
      ],
      explanation: md`High-stakes, external, single secondary source: the matrix says find the primary or drop it.`,
      concepts: ["fc10.citation-check", "fc10.competitor-teardown"],
      difficulty: 1,
    },
    {
      id: "fc10-l01-q6",
      type: "mcq",
      prompt: "Why run the citation check in a fresh conversation rather than asking the same thread 'are you sure?'",
      options: [
        "Fresh conversations use a more accurate model",
        "A model in the same thread tends to defend or rationalise its earlier answer; a clean context reads only the ledger and sources",
        "It is cheaper in tokens",
        "The original thread has lost access to the web",
      ],
      answer: 1,
      explanation: md`The checking reader should not share the author's context. Same idea as a second engineer reviewing a test report.`,
      concepts: ["fc10.citation-check"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc10-l01-f1", front: "Claim ledger columns", back: "id, one-fact claim, source URL, source date, verbatim quote, source type (primary/secondary/tracker), confidence.", concepts: ["fc10.claim-ledger"] },
    { id: "fc10-l01-f2", front: "Detection probability of a spot check", back: md`$P_d = 1-(1-p)^n$`, concepts: ["fc10.citation-check"] },
    { id: "fc10-l01-f3", front: "Rows to check for 95 % confidence of catching a 10 % error rate", back: "29 (5 % rate: 59; 2 % rate: 149).", concepts: ["fc10.citation-check"] },
    { id: "fc10-l01-f4", front: "How to write a fact you could not find", back: "'Not found in sources searched' plus what and where you searched. Never 'does not exist'.", concepts: ["fc10.source-grounded-research"] },
    { id: "fc10-l01-f5", front: "Where funding and customer facts must come from", back: "The company's own release or the customer. Trackers are secondary; conflicts are shown, not averaged.", concepts: ["fc10.competitor-teardown"] },
    { id: "fc10-l01-f6", front: "Rule after finding one fabricated cell", back: "Stop sampling. Check every row that leaves the company and re-extract the failing field type with quotes.", concepts: ["fc10.citation-check"] },
  ],
};

export default lesson;
