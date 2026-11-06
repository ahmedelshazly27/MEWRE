import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc10-l05",
  title: "Verification habits, workflow and a prompt library reused across ventures",
  summary:
    "Make AI use a system rather than a habit: one context file per venture, a versioned library of templates with a verification step built into each, a cost rule for how much checking an output deserves, a fixed routine for checking numbers, and a catalogue of the hallucination traps founders actually fall into.",
  minutes: 70,
  objectives: [
    "Decide how much verification an output deserves with the expected-loss rule",
    "Check numbers in AI output with a fixed routine: recompute, units, order of magnitude, ratios, cross-foot, prior period",
    "Recognise founder-specific hallucination traps (citations, legal and regulatory specifics, quotes, negations, sycophancy, context bleed)",
    "Build a prompt library with venture context files and templates that carry their own verification step",
  ],
  concepts: [
    {
      id: "fc10.verification-economics",
      name: "Verification economics",
      description:
        "Check an output when the cost of checking is below the expected loss it avoids, q times p times L; anything external, numeric, legal or irreversible clears the bar.",
      competency: "fc-ai",
      related: ["m14.verification-habits", "m14.verification-sampling"],
    },
    {
      id: "fc10.number-checking",
      name: "Number-checking routine",
      description:
        "A fixed sequence for every number in AI output: trace to source, recompute independently, check units and order of magnitude, sanity-check ratios, cross-foot totals, compare with the prior period.",
      competency: "fc-ai",
      related: ["m14.code-not-arithmetic", "fc10.verification-economics"],
    },
    {
      id: "fc10.hallucination-traps",
      name: "Founder hallucination traps",
      description:
        "Recurring places where models produce confident wrong output for founders: citations, clause and article numbers, dates and deadlines, quotes, dropped negations, agreement with your framing, and facts from the wrong venture.",
      competency: "fc-ai",
      related: ["m14.hallucination", "fc10.source-grounded-research"],
    },
    {
      id: "fc10.venture-context-file",
      name: "Venture context file",
      description:
        "A short, maintained document per venture (what it does, ICP, status words, approved facts, confidentiality rules, voice) loaded at the start of every task to prevent invention and context bleed.",
      competency: "fc-ai",
      related: ["fc10.structured-brief", "fc10.prompt-library"],
    },
    {
      id: "fc10.prompt-library",
      name: "Cross-venture prompt library",
      description:
        "A versioned set of templates with variables, inputs, output format, owner and a mandatory verification step, reused across ventures and improved after each failure.",
      competency: "fc-ai",
      related: ["m14.prompt-library", "fc10.venture-context-file"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "How much to check, how to check numbers, and where models lie confidently",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Across Afterwave, Mizan and Suhail you will produce several AI-assisted documents a day: investor updates, tender responses, sponsor decks, call summaries, specs. You cannot check everything to the same depth, and you cannot afford one confident error in the wrong place: a wrong figure in a KISR or MEWRE submission, a misquoted regulation date in a YC application, a customer quote that the customer never said. A system decides once how much checking each kind of output gets, so you do not decide under time pressure.`,
        },
        {
          kind: "xref",
          to: "m14-l06",
          note: "Track 0 covers verification habits, confidentiality, governance and a PM prompt library. This lesson builds the founder version: one library across several companies, with explicit verification economics.",
        },
        {
          kind: "md",
          md: md`### The verification rule

A check is worth doing when it costs less than the loss it is expected to prevent:`,
        },
        { kind: "equation", formula: "fc10-verify-rule" },
        {
          kind: "md",
          md: md`$p$ is high for the trap categories below, $L$ is high for anything external, numeric, legal or irreversible, and $q$ is high when you check against the primary source rather than by rereading. You rarely know these numbers precisely; the rule's value is that it forces the comparison. Five illustrative cases (your time at about EUR 80/h):

| Output | $p$ | $L$ (EUR) | $q$ | $qpL$ (EUR) | Check cost (EUR) | Decision |
|---|---|---|---|---|---|---|
| Internal brainstorm list | 0.20 | 50 | 0.9 | 9 | 13 | Skip |
| Social post with one statistic | 0.10 | 500 | 0.9 | 45 | 7 | Check the statistic |
| Investor update metrics | 0.05 | 5,000 | 0.9 | 225 | 20 | Check every number |
| Figure in a tender submission | 0.05 | 20,000 | 0.9 | 900 | 13 | Check, plus second person |
| Contract clause summary for a pilot | 0.10 | 30,000 | 0.8 | 2,400 | 120 | Counsel reads the clause |`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Expected loss avoided versus cost of checking (illustrative)",
          xKey: "item",
          xLabel: "Output",
          yLabel: "EUR",
          series: [
            { key: "avoided", label: "Expected loss avoided (q x p x L)" },
            { key: "cost", label: "Cost of the check" },
          ],
          data: [
            { item: "Brainstorm", avoided: 9, cost: 13 },
            { item: "Social post", avoided: 45, cost: 7 },
            { item: "Investor update", avoided: 225, cost: 20 },
            { item: "Tender figure", avoided: 900, cost: 13 },
            { item: "Contract summary", avoided: 2400, cost: 120 },
          ],
          caption: "Only the internal brainstorm fails the test. Everything a reader outside the company sees passes it by a wide margin, which is why the default for external output is: check.",
        },
        {
          kind: "md",
          md: md`### The number-checking routine

Models are fluent with numbers and unreliable at arithmetic in prose; worse, they **round towards the story**. Every number in an external document goes through six steps:

1. **Trace:** which input or source does it come from? No source, no number.
2. **Recompute independently:** spreadsheet or code, not the same chat.
3. **Units and time base:** EUR vs USD vs KWD, monthly vs annual, MW vs MWh, percent vs percentage points.
4. **Order of magnitude:** does it make physical or commercial sense? (A 3-person team cannot have EUR 450k monthly burn; a 1 MWp plant does not make 100 GWh a year.)
5. **Ratios and growth:** recompute every percentage from its two endpoints.
6. **Cross-foot and prior period:** parts sum to the total; the number is consistent with last month's document.

### Founder hallucination traps

| Trap | Typical output | Defence |
|---|---|---|
| Fabricated citation | A paper, case or report that does not exist, with a plausible title (the 2023 Mata v. Avianca sanctions case is the classic) | Open every reference; no link, no citation |
| Article and clause numbers | "Article 14(3) requires..." with the wrong article | Quote the text from the official source |
| Dates and deadlines | Programme deadlines, regulation application dates shifted by a year | Primary source plus its date; recheck before use |
| Invented quotes | "As one test lead told us..." with no such call | Quotes only from your own notes, with the date |
| Dropped negation | A summary that turns "not before Q3" into "in Q3" | Ask for verbatim quotes for every commitment |
| Sycophancy | The model agrees with the framing in your question | Ask for the strongest case against; ask neutrally |
| Context bleed | A Mizan fact in an Afterwave deck, or Suhail's audience numbers in a Mizan memo | One project and context file per venture; never mix in one thread |
| Confident translation | Arabic legal or technical terms rendered plausibly but wrongly | Native reviewer for anything formal; check terms against the official Arabic text |

### Templates that carry their checks

The biggest gain from a prompt library is not speed; it is that **the verification step travels with the template**. The time gain is still real when a task recurs across ventures:`,
        },
        { kind: "equation", formula: "fc10-template-gain" },
        {
          kind: "widget",
          widget: "concept-map",
          props: { module: "fc10" },
          caption: "How this module's ideas connect: grounding, ledgers and checks underpin every template.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Checking a tender figure and pricing a template",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A Mizan tender response: is the second check worth it?",
          given: md`Illustrative. A Mizan response to a public tender includes a table of expected soiling losses and cleaning frequencies drafted with Claude from your own analysis. One figure is wrong with probability about 5 % (you transcribed values between tools). A wrong figure in a public tender can lead to a non-compliant or uncompetitive bid; price the loss at EUR 20,000 (illustrative: bid preparation cost plus the opportunity). A check against the source analysis takes 10 minutes at EUR 80/h and catches about 90 % of errors.`,
          steps: [
            { md: md`**Cost of check:** $c_v = (10/60) \times 80 = $ EUR 13.3.` },
            { md: md`**Expected loss avoided:** $q p L = 0.9 \times 0.05 \times 20{,}000 =$ EUR 900.` },
            { md: md`**Ratio:** $900/13.3 \approx 68$. The check is worth about 68 times its cost.` },
            { md: md`**Second check by another person:** if the first misses 10 % of errors, a second independent check with $q = 0.9$ on the residual avoids $0.9 \times (0.05 \times 0.1) \times 20{,}000 = $ EUR 90 for another EUR 13. Still worth it.` },
            { md: md`**Third check:** residual $p = 0.0005$, avoided loss EUR 9 against EUR 13. Stop. Two checks against the source is the right depth for a tender figure.` },
          ],
          result: md`Check tender figures twice, by two people, against the source analysis. A third pass is not worth it; better to spend that time on the parts of the bid that score.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "The investor-update template and the growth number",
          given: md`Illustrative. You write a monthly investor or board update for three ventures: 36 updates a year. Ad hoc prompting takes 1.5 h per update including rework; a template with a venture context file takes 0.75 h. Writing and testing the template takes 3 h. In this month's Afterwave draft, Claude wrote: "Pilot revenue grew 35 % month on month, from EUR 4.0k to EUR 5.6k."`,
          steps: [
            { md: md`Template gain over a year: $G = 36 \times (1.5 - 0.75) - 3$.` },
            {
              md: md`$G = 27 - 3 =$ **24 hours** a year.`,
              hidden: true,
              check: { prompt: "Net time gain (h/yr)", answer: 24, unit: "h", tolerance: { abs: 0.1 } },
            },
            { md: md`Now the growth figure. Recompute from the endpoints: $5.6/4.0 - 1$.` },
            {
              md: md`$= 0.40$, so **40 %**, not 35 %.`,
              hidden: true,
              check: { prompt: "Actual month-on-month growth (%)", answer: 40, unit: "%", tolerance: { abs: 0.1 } },
            },
            { md: md`The model's 35 % is a plausible-looking number that is not the ratio of its own endpoints. Here the error understates, but the same mechanism overstates just as easily. Add to the template's verification step: "recompute every percentage from its endpoints in the metrics sheet". Also check whether the "EUR 4.0k" itself matches the sheet, because the endpoint could be the wrong one.` },
          ],
          result: md`The template saves about 24 hours a year and, more importantly, now carries a growth-recompute check that catches this class of error every month.`,
        },
        {
          kind: "question",
          question: {
            id: "fc10-l05-p1",
            type: "numeric",
            prompt: md`An AI-drafted Suhail sponsor deck says the newsletter has 6,200 subscribers, "up 55 % since January" when there were 4,400. What is the correct growth in %? (1 decimal)`,
            answer: 40.9,
            tolerance: { abs: 0.1 },
            unit: "%",
            explanation: md`$6{,}200/4{,}400 - 1 = 0.409$, so 40.9 %. Recompute every percentage from its endpoints and check both endpoints against the source (the newsletter platform's export).`,
            concepts: ["fc10.number-checking"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Building the library and the daily routine",
      blocks: [
        {
          kind: "md",
          md: md`### Library layout (a shared folder or repository)

    ai-library/
      README.md            how to use, who owns what, version notes
      context/
        afterwave.md       venture context file
        mizan.md
        suhail.md
      templates/
        R-01 research brief (fc10 lesson 1)
        R-02 claim-ledger synthesis
        R-03 competitor teardown
        R-04 citation check
        O-01 ICP list build    O-02 enrichment    O-03 first-touch email
        O-04 CRM update from notes
        D-01 deck brief        D-02 red-team      D-03 model build
        D-04 model audit       D-05 spec review
        T-01 tool brief        T-02 CLAUDE.md     T-03 security self-review
        V-01 investor update   V-02 call summary  V-03 meeting prep
      failures.md          every AI error that escaped, and the template change it caused

### Template: venture context file

    # [Venture] context (version, date, owner)
    What we do (two sentences, exact wording we use publicly):
    Who buys (ICP), who uses:
    Status words (use exactly): [e.g. "prototype", "pilot in discussion",
    "no signed customers yet"]
    Approved facts (with source and date): [team bios, dates, figures]
    Never state: [customers under NDA, unannounced partners, any person in
    stealth, revenue or traction we do not have]
    Confidentiality: [which data may go into which tools]
    Voice: [direct, technical, no superlatives], languages: [EN, AR]
    Other ventures: do not use facts from them in this context.

### Library index format

| id | name | purpose | inputs | output | verification step | owner | version |
|---|---|---|---|---|---|---|---|
| V-01 | Investor update | Monthly update per venture | context file, metrics sheet, highlights notes | 1 page: metrics, wins, lows, asks | Recompute every metric and percentage from the sheet; status words match context file | founder | 1.3 |
| V-02 | Call summary | Discovery or sales call to CRM | transcript or notes | Pains (quoted), current tools, next step, risks | Every pain and commitment is a verbatim quote with timestamp | founder | 1.1 |
| V-03 | Meeting prep | Brief before an investor or customer meeting | ledger rows on the person and company, our context | 1 page: who, what they care about, three questions, what not to say | Every fact about the person has a source; nothing from memory | founder | 1.0 |

### Template V-01: investor update

    Load: context/[venture].md. Inputs: metrics sheet (pasted), my notes.
    Write a monthly update: (1) three-line summary; (2) metrics table copied
    from the sheet, no recalculation in prose; (3) wins; (4) lows and what we
    are doing; (5) asks (specific intros, hires, advice).
    Rules: status words exactly as in the context file; no metric not in the
    sheet; every percentage shown with its two endpoints; no adjectives on
    numbers ("strong", "massive").
    After the draft, output a VERIFY list: every number in the draft, its
    sheet cell, and the recomputed value.

### Template V-02: call summary

    From this transcript, extract: pains (verbatim quote + timestamp), current
    tools and workarounds, who else is involved in buying, security or
    deployment requirements, explicit next step and date, anything the
    customer said they would NOT do. Do not summarise beyond quotes. Mark
    anything ambiguous as UNCLEAR rather than interpreting it.

### Template V-03: neutral question (against sycophancy)

    I am deciding [X]. Give the strongest case for each option, then the
    evidence that would change your view. Do not tell me which I prefer.

### The daily routine

- **Start every task by loading the context file** of exactly one venture.
- **Pick a template** from the library rather than typing a fresh prompt for a recurring task.
- **Run its verification step** before the output leaves your desk; the rule above tells you how deep.
- **When an error escapes**, write it in failures.md and change the template the same day. The library improves only through its failures.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Library as a graveyard.** Fifty templates nobody opens. Keep it to the tasks you do at least monthly; delete the rest.
- **Context files that drift.** Status words change ("pilot in discussion" becomes "pilot signed") and the file does not; the model then states an old status. Date and version every context file and update it with every material change.
- **Mixing ventures in one thread.** The fastest route to context bleed and to leaking one venture's confidential facts into another's document. Never name or describe anyone whose involvement is confidential, in any context file.
- **Verification by rereading.** Rereading a fluent draft finds style issues, not wrong numbers. Check against the source.`,
        },
        {
          kind: "checklist",
          title: "Before any AI-assisted output leaves the company",
          items: [
            "Exactly one venture's context file was loaded; no facts from another venture",
            "Every number traced, recomputed outside the chat, units and time base checked, percentages recomputed from endpoints",
            "Every citation opened; every legal or regulatory reference quoted from the official text with its date",
            "Every quote comes from your own notes or a transcript, with date",
            "Commitments and negations checked against verbatim source text",
            "Depth of checking matches the verification rule; external documents always checked",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc10-l05-p2",
            type: "short",
            prompt: md`**Produce it.** Write (a) a venture context file for one of your ventures using the template (approved facts only from what you can source today), and (b) three library entries in the index format for tasks you do at least monthly, each with a concrete verification step. One of the three must be a cross-venture template you will use for at least two ventures.`,
            rubric: [
              "Context file has exact status words, approved facts with sources and dates, a 'never state' list and confidentiality rules",
              "No invented traction, customers or partners; no confidential person named or described",
              "Three library entries each have inputs, output format, owner, version and a verification step that checks against a source (not rereading)",
              "At least one entry is explicitly cross-venture with variables for the venture",
              "Verification depth is consistent with the expected-loss rule (external numeric outputs get recompute checks)",
            ],
            modelAnswer: md`**(a) context/afterwave.md (v1.0, Nov 2026, owner: CEO).** What we do: "Afterwave builds test infrastructure for physical AI: Lockstep captures rig signals and on-screen actions on one clock; Ripple shows which tests to rerun after a firmware, model or rig change, and why." Who buys: heads of test and validation at robotics, humanoid, drive, battery and powertrain companies; users are test engineers. Status words: "in development"; "applied to YC W27"; pilot and customer status written exactly as it stands on the day, and updated the same day it changes. Approved facts: team (CEO and GTM; Ismail Elmasry, ex-Tesla drive unit validation, now test systems at Signify; Yusuf Keklik, ex-Tesla drive inverter test and reliability); EU Machinery Regulation applies from 20 January 2027 (Regulation (EU) 2023/1230, checked on EUR-Lex). Never state: any company we speak to under NDA, any pilot as signed before signature, YC status beyond "applied". Confidentiality: customer data and call notes only in approved tools; no customer names in public tools. Voice: direct, technical, no superlatives. Do not use facts from Mizan or Suhail.
**(b) Library entries.**
| id | name | purpose | inputs | output | verification | owner | version |
|---|---|---|---|---|---|---|---|
| V-01 | Investor update (cross-venture: venture = Afterwave, Mizan, Suhail) | Monthly update | context file for the venture, metrics sheet, notes | 1 page, metrics table, wins, lows, asks | VERIFY list maps every number to a sheet cell; percentages recomputed from endpoints; status words match context file | CEO | 1.0 |
| V-02 | Discovery call summary | Call to CRM | transcript | Quoted pains, tools, buyers, next step | Every pain and next step is a verbatim quote with timestamp; spot-check 3 against recording | CEO | 1.0 |
| R-03 | Competitor teardown | Before a customer or investor meeting | ledger rows | Fixed schema with ids | Every external row's source opened and quote found; funding from primary only | CEO | 1.0 |`,
            explanation: md`The grader checks that the context file prevents invention and bleed, and that every template's verification step is a real check against a source.`,
            concepts: ["fc10.venture-context-file", "fc10.prompt-library", "fc10.verification-economics"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a volunteer lead at Suhail why 'I read it through carefully' is not verification for the sponsor deck's numbers.",
          keyPoints: [
            "Fluent text hides wrong numbers; rereading checks style, not facts",
            "Verification means checking against the source: the platform export, the budget sheet",
            "Recompute percentages from endpoints; check units and time base",
            "External documents always clear the expected-loss bar",
            "Record escaped errors and change the template",
          ],
        },
        { kind: "sources", refs: ["fc10-r1", "fc10-r16", "fc10-r19"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc10-l05-q1",
      type: "numeric",
      prompt: md`A check costs EUR 20 and catches 80 % of errors. The item is wrong with probability 2 % and an error would cost EUR 5,000. What expected loss (EUR) does the check avoid?`,
      answer: 80,
      tolerance: { abs: 0.5 },
      unit: "EUR",
      explanation: md`$q p L = 0.8 \times 0.02 \times 5{,}000 = 80$. It exceeds the EUR 20 cost, so check.`,
      concepts: ["fc10.verification-economics"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc10-l05-q2",
      type: "order",
      prompt: "Order the number-checking routine.",
      items: [
        "Trace the number to its source",
        "Recompute it independently outside the chat",
        "Check units and time base",
        "Check order of magnitude",
        "Recompute ratios and growth from endpoints",
        "Cross-foot totals and compare with the prior period",
      ],
      explanation: md`No source, no number; then the cheap mechanical checks; then consistency with the rest of the document and with history.`,
      concepts: ["fc10.number-checking"],
      difficulty: 1,
    },
    {
      id: "fc10-l05-q3",
      type: "multi",
      prompt: "Which are founder hallucination traps listed in this lesson? (Select all that apply.)",
      options: [
        "Article and clause numbers",
        "A summary that drops a 'not'",
        "Agreement with the framing of your question",
        "Facts from another venture appearing in a document",
        "Spelling mistakes in headings",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`Spelling is a style problem that rereading catches. The other four produce confident, wrong content that only a source check catches.`,
      concepts: ["fc10.hallucination-traps"],
      difficulty: 1,
    },
    {
      id: "fc10-l05-q4",
      type: "decision",
      prompt: md`Drafting a Mizan memo, Claude adds "as required by Article 12 of the tender law" to strengthen an argument. You did not supply the law. What do you do?`,
      options: [
        { text: "Keep it; the model has read many laws.", score: 0, feedback: "Article numbers are a top trap. A wrong article in a submission to a public body signals carelessness." },
        { text: "Remove it unless you can quote the article from the official text with its date; if it matters, ask counsel.", score: 1, feedback: "Right: legal references come from the official source, quoted." },
        { text: "Change it to 'as required by law' without a number.", score: 0.3, feedback: "Vaguer but still an unsupported legal claim." },
      ],
      explanation: md`Track 0 covers Kuwait procurement law; in your ventures the rule is the same: quote the text or leave it out.`,
      concepts: ["fc10.hallucination-traps"],
      difficulty: 2,
    },
    {
      id: "fc10-l05-q5",
      type: "mcq",
      prompt: "What is the main purpose of a venture context file?",
      options: [
        "To make prompts longer",
        "To fix approved facts, status words and confidentiality rules for one venture, preventing invention and context bleed",
        "To store the venture's passwords",
        "To replace the CRM",
      ],
      answer: 1,
      explanation: md`It is the facts sheet that every task starts from. Secrets never go in it.`,
      concepts: ["fc10.venture-context-file"],
      difficulty: 1,
    },
    {
      id: "fc10-l05-q6",
      type: "numeric",
      prompt: md`A call-summary template took 2 h to build. You run 10 discovery calls a month across ventures; each summary drops from 40 to 15 minutes. Net hours gained over 6 months?`,
      answer: 23,
      tolerance: { abs: 0.1 },
      unit: "h",
      explanation: md`$k = 60$ uses; saving $25/60 = 0.4167$ h each, so $60 \times 0.4167 - 2 = 25 - 2 = 23$ h.`,
      concepts: ["fc10.prompt-library"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc10-l05-f1", front: "Verification rule", back: md`Verify if $c_v < q\,p\,L$.`, concepts: ["fc10.verification-economics"] },
    { id: "fc10-l05-f2", front: "Six-step number check", back: "Trace, recompute outside chat, units and time base, order of magnitude, ratios from endpoints, cross-foot and prior period.", concepts: ["fc10.number-checking"] },
    { id: "fc10-l05-f3", front: "Defence against sycophancy", back: "Ask neutrally: strongest case for each option and what evidence would change the view.", concepts: ["fc10.hallucination-traps"] },
    { id: "fc10-l05-f4", front: "Defence against context bleed", back: "One venture per thread and project; load exactly one context file.", concepts: ["fc10.venture-context-file"] },
    { id: "fc10-l05-f5", front: "What every library template must contain", back: "Purpose, inputs, output format, owner, version and a verification step against a source.", concepts: ["fc10.prompt-library"] },
    { id: "fc10-l05-f6", front: "How the library improves", back: "Log every escaped error in failures.md and change the template the same day.", concepts: ["fc10.prompt-library"] },
  ],
};

export default lesson;
