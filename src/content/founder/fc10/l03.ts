import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc10-l03",
  title: "Decks, financial models and product specs with Claude",
  summary:
    "Get first drafts of decks, models and specs in hours instead of days, without letting the model supply your facts: brief it with a facts sheet, iterate outline before prose, red-team with hostile reviewer roles, audit every model with a fixed checklist, and use Claude as a spec reviewer that finds untestable requirements.",
  minutes: 85,
  objectives: [
    "Write a structured brief (audience, decision, facts sheet, format, constraints) that controls what Claude may and may not invent",
    "Run the draft, critique, revise loop with explicit reviewer roles and a rubric",
    "Audit an AI-built financial model for time base, signs, hard-codes, unsupported revenue and tie-outs",
    "Bound a bottom-up market size with error propagation and decide what to research next",
    "Use Claude to review a product spec for ambiguity, testability and missing edge cases",
  ],
  concepts: [
    {
      id: "fc10.structured-brief",
      name: "Structured brief with a facts sheet",
      description:
        "A prompt that states audience, decision, format and constraints and supplies every number and claim the output may use, forbidding the model from adding facts.",
      competency: "fc-ai",
      related: ["m14.prompt-anatomy", "m14.facts-sheet"],
    },
    {
      id: "fc10.draft-critique-loop",
      name: "Draft, critique, revise loop",
      description:
        "Iterating outline before prose, then having the model critique the draft from named hostile roles against a rubric, then revising; a human checks facts last.",
      competency: "fc-ai",
      related: ["m14.critique-revise", "fc10.structured-brief"],
    },
    {
      id: "fc10.model-audit",
      name: "Financial model audit",
      description:
        "A fixed set of checks on any model, AI-built or not: inputs separated, units and time base consistent, signs, hard-codes, unsupported revenue, totals tie, sensitivities run.",
      competency: "fc-ai",
      related: ["m14.model-audit", "m14.code-not-arithmetic"],
    },
    {
      id: "fc10.bottom-up-sizing",
      name: "Bottom-up sizing and error propagation",
      description:
        "Market size as counted accounts times defensible ACV, with relative errors of multiplied inputs adding (worst case) or adding in quadrature (independent).",
      competency: "fc-ai",
      related: ["fc10.model-audit"],
    },
    {
      id: "fc10.spec-review",
      name: "AI spec review",
      description:
        "Using Claude to review a product spec for ambiguous words, untestable requirements, conflicts, missing edge cases and unstated assumptions, producing acceptance criteria.",
      competency: "fc-ai",
      related: ["fc10.draft-critique-loop"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why briefs, loops and audits beat clever prompts",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You will write a seed deck and data room for Afterwave, a pilot business case for Mizan, a sponsorship deck and budget for Suhail, and product specs your engineering partners build from. Claude turns a blank page into a strong draft in minutes. The danger is not bad writing; it is good writing around a wrong number, an optimistic assumption the model filled in, or a spec so vague that engineers build the wrong thing. This lesson is about controlling inputs and checking outputs, so the speed is safe.`,
        },
        {
          kind: "xref",
          to: "m14-l03",
          note: "Track 0 covers prompt anatomy, the facts sheet and why a model must not supply facts in a document. Here the same discipline is applied to founder documents.",
        },
        {
          kind: "md",
          md: md`### The mechanism: a model completes the most plausible document

Ask for "a seed deck for Afterwave" and Claude produces the most plausible seed deck: a traction slide with plausible traction, a market slide with a plausible TAM, a team slide with plausible credentials. Plausible is the problem. Every gap in your brief is filled with the statistically typical content, which for a startup deck means optimistic numbers. The control is the **structured brief**:

| Part | What it does | Example (Afterwave deck) |
|---|---|---|
| Audience and decision | Sets what "good" means | Seed investors deciding whether to take a first meeting |
| Facts sheet | The only numbers and claims allowed | Team bios, product status, pilots (exact status words), market inputs with sources |
| Forbidden | Closes the gaps | "Do not add any customer, metric, quote or market number not in the facts sheet; write [MISSING: ...] instead" |
| Format | Shape of output | 12 slides, headline sentence per slide, max 25 words of body, speaker notes |
| Constraints | House rules | EU Machinery Regulation date as stated in facts sheet; no superlatives |

The **[MISSING: ...]** marker is the key trick: it turns silent invention into a visible to-do list.

### The loop: outline, draft, critique, revise

One-shot drafting gives you the average. Iteration with **named hostile reviewers** gives you a document that survives the meeting:`,
        },
        {
          kind: "flow",
          title: "Draft, critique, revise",
          steps: [
            { label: "Brief + facts sheet", detail: "Audience, decision, allowed facts, format, forbidden list." },
            { label: "Outline only", detail: "Headline per slide or section. You fix the argument before any prose exists." },
            { label: "Draft", detail: "Prose or slides from the approved outline; [MISSING] where facts are absent." },
            { label: "Red-team critique", detail: "Claude as a sceptical seed investor, a customer's security reviewer, a procurement officer: top 10 objections, ranked." },
            { label: "Revise", detail: "Address objections with facts you have, or cut the claim." },
            { label: "Human facts check", detail: "Every number traced to the facts sheet; every [MISSING] resolved or removed." },
          ],
          caption: "Critique is most useful from a role with a stake: 'a partner who has seen 200 robotics decks this year and passed on most'.",
        },
        {
          kind: "md",
          md: md`### Financial models: Claude builds fast, you audit always

Claude can draft a monthly operating model as spreadsheet formulas or as Python that writes a spreadsheet. It is good at structure and formula syntax. It reliably makes the same classes of mistake a junior analyst makes, plus one more: **it fills unknown assumptions with optimistic defaults** (revenue starting in month 2, 0 % churn, no employer on-costs). The audit is a fixed checklist (following the spirit of the FAST modelling standard: inputs separate, one formula per row, no numbers inside formulas):

| Check | What goes wrong | How to test |
|---|---|---|
| Inputs separated | Numbers typed inside formulas | Search formulas for digits other than 0, 1, 12 |
| Time base | Annual salary used as monthly, or 12 vs 13 periods | Sum a monthly row and compare with the annual input |
| Signs | Costs entered positive and added | Set revenue to zero: cash must fall |
| Unsupported revenue | Pipeline counted as income | Every revenue line maps to a signed contract or is in a separate scenario |
| Tie-outs | Cash flow does not reconcile to balance | Opening cash + inflows - outflows = closing cash, every month |
| Sensitivity | Single-point answer | Runway at -30 % revenue and +20 % costs |

### Market sizing: count, then multiply, then bound

The defensible market slide is bottom-up:`,
        },
        { kind: "equation", formula: "fc10-tam-bottom-up" },
        {
          kind: "md",
          md: md`Both inputs are estimates, and for a product of estimates the relative errors combine:`,
        },
        { kind: "equation", formula: "fc10-error-propagation" },
        {
          kind: "md",
          md: md`Derivation in one line: $\ln y = \sum \ln x_i$, so $dy/y = \sum dx_i/x_i$. Worst case, the relative errors add; if they are independent, their variances add, so the relative standard uncertainties add in quadrature. The practical use: whichever input has the largest relative error is the one to research next. For Afterwave that is usually the account count, which a customer-discovery sprint can tighten more than any desk research.

### Specs: Claude is a better reviewer than author

Engineers build what the spec says, not what you meant. Claude, given a spec and told to act as the engineer who must build and test it, is excellent at finding **weasel words** ("fast", "intuitive", "supports"), **untestable requirements**, **conflicts** between sections, **missing edge cases** (what happens when the rig clock drifts, when a test was never run before) and **unstated assumptions**. It is weaker at deciding what the product should do: that is your customer knowledge.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Auditing a Claude-built runway model and bounding a market slide",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "The runway that was 6 months too long",
          given: md`Illustrative: a 3-person seed-stage team burning EUR 45k/month with EUR 600k in the bank. You asked Claude for a 24-month cash model from your cost list and a note that "we expect a paid pilot soon". The model shows **19.5 months** of runway. Your facts: no signed pilot yet; one pilot under negotiation at EUR 5k/month that, if signed, would start invoicing in month 4.`,
          steps: [
            { md: md`**Trace the revenue line.** The model has EUR 15k/month of "pilot revenue" from month 2. No input cell supports it: the model turned "expect a pilot soon" into a number. This is the typical hallucination in a model: not a formula error but an invented assumption.` },
            { md: md`**Recompute the model's own answer** to confirm what it did: month 1 burns 45, leaving 555; from month 2 net burn is $45 - 15 = 30$ per month, so $555/30 = 18.5$ more months, total $1 + 18.5 = 19.5$ months. The arithmetic was right; the input was fiction.` },
            { md: md`**Correct base case (contracted revenue only):** $600/45 = 13.3$ months.` },
            { md: md`**Upside scenario (pilot signed, invoicing from month 4):** months 1 to 3 burn $3 \times 45 = 135$, leaving 465; then net burn 40, so $465/40 = 11.6$ more months; total **14.6 months**.` },
            { md: md`**Structural fix:** put revenue in an assumptions tab with a status column (signed, verbal, pipeline), let the base case read only "signed", and make scenarios explicit. Ask Claude to add a check row: "revenue lines without a signed status = 0".` },
          ],
          result: md`Runway is 13.3 months on contracted revenue (14.6 if the pilot signs on time), not 19.5. Six months of imaginary runway is the difference between raising calmly and raising in a panic. The audit found an assumption error, not an arithmetic error: check inputs first.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Bounding the Afterwave SAM slide",
          given: md`Illustrative. Claude's draft market slide: "SAM: 2,000 hardware test teams in robotics, drives, batteries and autonomous machines in Europe and North America, at EUR 150k ACV." You judge the account count uncertain by about 40 % (it came from a desk estimate, not a list) and the ACV by about 30 % (no pricing conversations yet).`,
          steps: [
            { md: md`Point estimate: $\text{SAM} = 2{,}000 \times 150{,}000$ EUR/yr.` },
            {
              md: md`$\text{SAM} =$ **EUR 300 m per year**.`,
              hidden: true,
              check: { prompt: "SAM point estimate (EUR m/yr)", answer: 300, unit: "EUR m/yr", tolerance: { abs: 1 } },
            },
            { md: md`Worst-case relative error: $0.40 + 0.30 = 0.70$, so EUR 90 m to 510 m.` },
            { md: md`Independent errors: $\sqrt{0.40^2 + 0.30^2}$.` },
            {
              md: md`$= \sqrt{0.25} = 0.50$, so about **50 %**, a range of roughly EUR 150 m to 450 m.`,
              hidden: true,
              check: { prompt: "Relative uncertainty, independent errors (%)", answer: 50, unit: "%", tolerance: { abs: 0.5 } },
            },
            { md: md`The account count dominates (40 % vs 30 %). The next research task is a counted list of named test teams, which Lesson 1's pipeline produces, not a better ACV guess.` },
          ],
          result: md`Show the slide as "about EUR 300 m (2,000 teams x EUR 150k), range EUR 150 to 450 m" with the account list in the appendix. An investor can rebuild it, which matters more than the headline.`,
        },
        {
          kind: "question",
          question: {
            id: "fc10-l03-p1",
            type: "numeric",
            prompt: md`Illustrative Suhail budget model: EUR 90k in the bank, net burn EUR 7.5k/month from January 2027, and a sponsorship of EUR 30k that is signed and pays in month 3. How many months of runway (from the start of month 1)?`,
            answer: 16,
            tolerance: { abs: 0.05 },
            unit: "months",
            explanation: md`Total cash available is $90 + 30 = 120$ k, and the sponsorship arrives before cash runs out (after month 3, cash is $90 - 22.5 + 30 = 97.5$). Runway $= 120/7.5 = 16$ months. If the sponsorship were only verbal, the base case would be $90/7.5 = 12$ months.`,
            concepts: ["fc10.model-audit"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Templates for decks, models and specs, and the exercise",
      blocks: [
        {
          kind: "md",
          md: md`### Template 1: deck or memo brief

    AUDIENCE: [seed investors / pilot customer's head of test / ministry
    committee]. DECISION THEY MAKE AFTER READING: [take a meeting / approve
    a pilot / ...]
    FACTS SHEET (the only facts you may use):
      [team bios, product status in exact words (prototype / in pilot with X
      under NDA / ...), signed contracts, market inputs with sources, dates]
    FORBIDDEN: any customer, metric, quote, logo, award or market number not in
    the facts sheet. Where the argument needs one, write [MISSING: what fact,
    why it matters]. No superlatives ("leading", "first", "only") unless the
    facts sheet proves them.
    FORMAT: [N] slides; per slide: headline sentence (the claim), up to 25 words
    of support, speaker notes citing the facts sheet line used.
    STEP 1: outline only (headlines). Wait for my approval before drafting.

### Template 2: red-team critique

    You are [a seed partner who has seen 200 robotics and industrial software
    decks this year and passed on most / the customer's information security
    reviewer / a tender committee member]. Read the draft below.
    List the 10 objections you would raise, ranked by how likely each is to
    kill the deal. For each: the slide, the objection in your words, what
    evidence would answer it, and whether that evidence appears in the facts
    sheet. Do not soften. Do not rewrite the deck.

### Template 3: model build spec

    Build a monthly cash model for [venture], months 1 to [24], as [spreadsheet
    formulas / Python writing an .xlsx].
    Structure: Inputs tab (every assumption, with unit, source and status:
    signed / verbal / pipeline / estimate), Calc tab (one formula per row, no
    typed numbers in formulas), Output tab (cash, burn, runway, scenarios).
    Base case uses only revenue with status = signed. Scenarios: upside
    (verbal deals close on stated dates), downside (costs +20 %, revenue -30 %).
    Add check rows: cash reconciliation each month; count of revenue lines
    without signed status in the base case (must be 0).
    Never invent an assumption: if an input is missing, add it to the Inputs
    tab as MISSING and leave the cell empty.

### Template 4: model audit (paste formulas or upload the file)

    Audit this model as a sceptical financial controller. Report as a table:
    issue | location | severity (breaks the answer / misleading / cosmetic) |
    evidence | fix. Check: typed numbers inside formulas; monthly vs annual
    units; sign conventions; revenue without a contract; employer on-costs,
    taxes and payment terms; reconciliation of opening + flows = closing; any
    assumption that looks like a default rather than a sourced input.
    Recompute runway independently and show the calculation.

### Template 5: spec review

    You are the engineer who must build and test this spec, and you will be
    blamed if it is wrong. Review it and return:
    1. Ambiguous words (fast, robust, supports, intuitive...) with a measurable
       replacement for each.
    2. Requirements that cannot be tested as written, with a testable version
       (Given / When / Then).
    3. Conflicts between sections.
    4. Missing edge cases and failure modes (list at least 8).
    5. Unstated assumptions about users, data, environment, security.
    6. Questions you need answered before estimating.
    Do not add features. Do not change the product intent.

### A spec skeleton Claude can review well

    Problem (whose, observed how) | Users and context | Goal and non-goals |
    Requirements (numbered, each with acceptance criteria) | Data in and out |
    Constraints (deployment, security, performance with numbers) |
    Edge cases | Open questions | Out of scope`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Polished draft, unexamined argument.** Skipping the outline step means you edit sentences instead of the logic. Approve headlines first.
- **The model's numbers survive into version 7.** An early draft invented "40 % faster regression cycles"; nobody remembered where it came from. [MISSING] markers and a facts sheet prevent this.
- **Arithmetic in chat.** Asking Claude to "calculate runway" in prose invites arithmetic slips. Have it write formulas or code and check a control total (Track 0 covers this).
- **Spec review that redesigns the product.** Tell the reviewer not to add features; you want defects found, not scope added.
- **Confidential inputs in the wrong tool.** Cap tables, customer pricing and pilot terms belong only in tools approved for that data.`,
        },
        {
          kind: "xref",
          to: "m14.code-not-arithmetic",
          note: "Why numeric analysis must run through code with control totals, not chat arithmetic.",
        },
        {
          kind: "checklist",
          title: "Before a deck, model or spec leaves your desk",
          items: [
            "Every number traces to the facts sheet or a sourced input; no [MISSING] left",
            "Red-team critique run from at least one hostile role; top objections answered or the claim cut",
            "Model audited with the fixed checklist; runway recomputed independently",
            "Base case uses signed revenue only; scenarios labelled",
            "Market size is bottom-up with a stated range",
            "Spec requirements each have a testable acceptance criterion; engineers have answered the open questions",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc10-l03-p2",
            type: "short",
            prompt: md`**Produce it.** Write a one-page spec for one Ripple capability using the skeleton above (for example: "after a firmware change, list the tests to rerun and the reason for each"). Include at least four numbered requirements with Given/When/Then acceptance criteria, then list the five most important findings you would expect a Template 5 review to raise and how you would resolve each.`,
            rubric: [
              "Problem statement names the user (test engineer or test lead), the trigger (firmware, model or rig change) and how the pain shows today",
              "At least four numbered requirements, each with a testable Given/When/Then criterion and no weasel words",
              "Constraints include deployment (customer servers or isolated tenant) and data handling, with numbers where relevant",
              "Edge cases cover missing history, clock or data-quality problems and changes with no prior test coverage",
              "Five review findings are specific defects (ambiguity, conflict, untestable item, missing edge case, unstated assumption) with concrete resolutions",
              "Does not invent customers, metrics or results",
            ],
            modelAnswer: md`**Spec: Ripple change-impact list (v0.1).**
*Problem:* when firmware, a model or a rig changes, test engineers rerun either everything (days of bench time) or what they remember (missed regressions). *Users:* test engineer (runs), test lead (approves the plan). *Goal:* a ranked list of tests to rerun with a reason per test. *Non-goals:* scheduling the bench; automatic pass/fail judgement.
*Requirements.*
R1 Given a change record (component, version from, version to) and test history in bench memory, when the engineer requests impact, then Ripple returns each affected test with a reason that names the linked signal, requirement or past failure.
R2 Given a test never run against the changed component, when impact is computed, then it is listed as "no history: rerun recommended", never omitted.
R3 Given 10,000 historical test runs, when impact is requested, then the list returns in under 60 s on the reference server spec.
R4 Given the lead approves a list, when it is exported, then the export contains change id, test ids, reasons and approver, and is reproducible from the same inputs.
*Constraints:* runs inside Afterwave Enclave on customer servers or an isolated tenant; no data leaves the environment.
*Edge cases:* rig clock drift between signal and screen streams; partial runs; renamed tests; simultaneous firmware and rig changes.
*Expected review findings and resolutions.* (1) "Affected" undefined: define as linked by signal, requirement or past co-failure, with the link type shown. (2) R3 reference server unspecified: add CPU, RAM and storage of the reference spec. (3) Conflict: R1 implies ranking but no ranking rule is given: add rank by link strength then last failure date. (4) Missing edge case: change records with unknown "version from": treat as full rerun of that component's tests. (5) Unstated assumption that test ids are stable across rig software versions: add a mapping table requirement and an open question for the engineers.`,
            explanation: md`A good answer shows that the founder owns intent and the model finds defects. The grader checks testability and specificity, not length.`,
            concepts: ["fc10.spec-review", "fc10.structured-brief"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to your co-founder why the runway model Claude built in ten minutes cannot go into the data room until you have audited it, even though every formula calculates correctly.",
          keyPoints: [
            "Models fail on assumptions more often than on arithmetic",
            "A model fills gaps with plausible, usually optimistic defaults (early revenue, no on-costs)",
            "Base case must use signed revenue only; scenarios separate",
            "Fixed audit checklist: hard-codes, time base, signs, reconciliation, sensitivity",
            "Investors will rebuild key numbers; one invented input destroys trust in the whole room",
          ],
        },
        { kind: "sources", refs: ["fc10-r1", "fc10-r18"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc10-l03-q1",
      type: "mcq",
      prompt: "What is the purpose of the [MISSING: ...] marker in a brief?",
      options: [
        "To make the draft shorter",
        "To turn silent invention of facts into a visible to-do list",
        "To tell the model to search the web",
        "To mark sections for the designer",
      ],
      answer: 1,
      explanation: md`Without it the model fills gaps with plausible content. With it, every gap becomes a question you must answer or a claim you must cut.`,
      concepts: ["fc10.structured-brief"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc10-l03-q2",
      type: "numeric",
      prompt: md`A SAM is the product of an account count uncertain by 25 % and an ACV uncertain by 20 % (independent). What is the relative uncertainty of the SAM, in %? (1 decimal)`,
      answer: 32.0,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$\sqrt{0.25^2 + 0.20^2} = \sqrt{0.1025} = 0.320$, so 32.0 %. Worst case would be 45 %.`,
      concepts: ["fc10.bottom-up-sizing"],
      difficulty: 2,
    },
    {
      id: "fc10-l03-q3",
      type: "multi",
      prompt: "Which are standard checks in a financial model audit? (Select all that apply.)",
      options: [
        "Typed numbers inside formulas",
        "Monthly versus annual units",
        "Revenue lines without a signed contract in the base case",
        "Opening cash plus flows equals closing cash",
        "Font and colour consistency",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`Formatting helps readability but does not change the answer. The other four catch the errors that move runway by months.`,
      concepts: ["fc10.model-audit"],
      difficulty: 1,
    },
    {
      id: "fc10-l03-q4",
      type: "order",
      prompt: "Order the draft loop for an investor deck.",
      items: [
        "Brief with facts sheet and forbidden list",
        "Outline (headlines only) and approve",
        "Draft from the approved outline",
        "Red-team critique from a hostile role",
        "Revise or cut claims",
        "Human facts check of every number",
      ],
      explanation: md`Argument before prose, critique before polish, facts check last because revisions can introduce new numbers.`,
      concepts: ["fc10.draft-critique-loop"],
      difficulty: 1,
    },
    {
      id: "fc10-l03-q5",
      type: "decision",
      prompt: md`Claude's spec review of a Ripple feature returns 14 findings, 6 of which are new feature suggestions. Your engineers start on Monday. What do you do?`,
      options: [
        { text: "Add all 14 to the spec to be thorough.", score: 0.1, feedback: "Scope creep from a reviewer that was supposed to find defects. Engineers will build features no customer asked for." },
        { text: "Resolve the 8 defect findings (ambiguities, conflicts, edge cases, assumptions), park the 6 feature ideas in a backlog for customer validation, and tighten the review prompt to forbid feature suggestions.", score: 1, feedback: "Right: the founder owns intent, the model finds defects." },
        { text: "Ignore the review; engineers will ask questions anyway.", score: 0.2, feedback: "Questions found during build cost more than questions found on paper." },
      ],
      explanation: md`Spec review is defect-finding. Feature ideas need customer evidence before they enter a spec.`,
      concepts: ["fc10.spec-review"],
      difficulty: 2,
    },
    {
      id: "fc10-l03-q6",
      type: "mcq",
      prompt: "A Claude-built model's runway arithmetic is correct but the answer is still wrong. What is the most likely cause?",
      options: [
        "A spreadsheet rounding error",
        "An invented or default assumption, such as revenue starting early or missing on-costs",
        "Too many decimal places",
        "The model used the wrong currency symbol",
      ],
      answer: 1,
      explanation: md`Models fail on inputs. Trace every input to a source and status before checking formulas.`,
      concepts: ["fc10.model-audit"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc10-l03-f1", front: "Five parts of a structured brief", back: "Audience and decision, facts sheet, forbidden list, format, constraints.", concepts: ["fc10.structured-brief"] },
    { id: "fc10-l03-f2", front: "Error propagation for a product of independent estimates", back: md`$\sigma_y/y \approx \sqrt{\sum (\sigma_{x_i}/x_i)^2}$; worst case the relative errors add.`, concepts: ["fc10.bottom-up-sizing"] },
    { id: "fc10-l03-f3", front: "Bottom-up SAM", back: md`$\text{SAM} = N_a \times \text{ACV}$, both sourced, shown with a range.`, concepts: ["fc10.bottom-up-sizing"] },
    { id: "fc10-l03-f4", front: "Most common error in an AI-built model", back: "An invented optimistic assumption (early revenue, zero churn, no on-costs), not a formula error.", concepts: ["fc10.model-audit"] },
    { id: "fc10-l03-f5", front: "What a spec reviewer prompt must forbid", back: "Adding features or changing intent. You want defects: ambiguity, conflicts, untestable items, edge cases, assumptions.", concepts: ["fc10.spec-review"] },
    { id: "fc10-l03-f6", front: "Best red-team role for a deck", back: "A named, sceptical reader with a stake, e.g. a seed partner who passed on most robotics decks this year.", concepts: ["fc10.draft-critique-loop"] },
  ],
};

export default lesson;
