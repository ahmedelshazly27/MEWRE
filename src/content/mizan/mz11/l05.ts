import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz11-l05",
  title: "Structuring an analytics pilot: scope, data, success metrics, fees and publication rights",
  summary:
    "Analytics pilots fail differently from software pilots: data access is the critical path, ground truth is itself uncertain, and the effect of a better cleaning decision takes a season to show. Structure them as a ladder (data agreement, retrospective back-test, shadow mode, controlled trial, service), with a written success metric at each rung, a deliberate choice between paid and unpaid, and publication and IP terms agreed before any data moves.",
  minutes: 80,
  objectives: [
    "You can design a staged analytics pilot with a decision and a success metric at each stage",
    "You can write success criteria for a soiling method (error against a reference, detection of cleaning events, cost difference between paired blocks) that are measurable with the data available",
    "You can decide when a pilot should be paid, and compute the expected value of paid and free options",
    "You can negotiate publication, data and IP terms with a research partner and a plant owner",
  ],
  concepts: [
    {
      id: "mz11.pilot-ladder",
      name: "Analytics pilot ladder",
      description:
        "Data agreement, retrospective back-test on historical data, prospective shadow mode (predictions logged, no operational change), controlled operational trial (paired blocks), then a procured service. Each rung is cheaper and safer than the next and answers one question.",
      competency: "mz-business",
      related: ["mz05.control-pilot-ladder", "mz05.paired-block-design", "fc04.paid-pilot", "fc02.pilot-purgatory"],
    },
    {
      id: "mz11.pilot-success-metrics",
      name: "Success metrics for a soiling analytics pilot",
      description:
        "Method metrics (error of estimated soiling loss against a reference, recall and precision of cleaning-event detection) and decision metrics (combined cleaning cost plus soiling loss between treated and control blocks), each with threshold, method, data window, date and judge.",
      competency: "mz-business",
      related: ["fc04.success-criteria", "mz02.detection-limit", "mz02.weather-corrected-pr"],
    },
    {
      id: "mz11.data-agreement",
      name: "Pilot data agreement",
      description:
        "Who owns the plant data (the owner), who may release it (owner, operator), what Mizan may do with it (purpose, retention, derived models), where it is stored, and what happens at the end. The critical path of most analytics pilots.",
      competency: "mz-business",
      related: ["mz11.publication-rights", "fc04.security-review"],
    },
    {
      id: "mz11.publication-rights",
      name: "Publication and IP terms with a research partner",
      description:
        "Joint publication with a review period for confidentiality (not a veto on results), an optional short delay for patent filing, anonymisation and owner approval for plant data, background IP kept by each party, and a clear split between the published method and Mizan's proprietary implementation.",
      competency: "mz-business",
      related: ["mz11.research-vs-procurement", "mz11.data-agreement"],
    },
    {
      id: "mz11.pilot-fee",
      name: "Paid vs unpaid analytics pilot",
      description:
        "Research collaborations are usually unpaid by design; commercial pilots with IPPs should be paid and credited against the first year, because payment proves a budget owner and moves the deal through procurement once.",
      competency: "mz-business",
      related: ["fc04.paid-pilot", "fc04.conversion-clause"],
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "Why analytics pilots need a ladder",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan's live thread is a soiling analytics pilot targeting Shagaya Phase I, with KISR researchers as methodology partner, in preparation. Its design will decide whether it ends in a validated method, a paper and a credible reference for Gulf IPPs, or in a year of data requests and an inconclusive slide. The same structure, with a fee, is what you will offer the first Gulf IPP.`,
        },
        {
          kind: "xref",
          to: "fc04-l06",
          note: "Founder Core: paid pilots, six-part success criteria, conversion clauses, security reviews. This lesson adds what is specific to soiling analytics and to a research partner.",
        },
        {
          kind: "xref",
          to: "mz05-l05",
          note: "Mizan track: the safe ladder for piloting a control function (stow) and paired-block design. Analytics pilots use the same logic with lower operational risk.",
        },
        {
          kind: "md",
          md: md`## Four ways analytics pilots differ from software pilots

1. **Data access is the critical path.** Nothing starts until the owner and operator release historical inverter, irradiance, temperature, met and cleaning logs. At a state plant the owner is the ministry; the operator may not be able to release data alone.
2. **Ground truth is uncertain.** Soiling loss is itself estimated: from reference cells, from step changes at cleaning, or from a temperature-corrected PR baseline to IEC 61724-1. A method can only be judged against a reference whose own uncertainty is stated.
3. **Decisions take a season to pay.** A better cleaning schedule saves money over months, and soiling differs by season (dew, shamal). A six-week operational pilot can be noise.
4. **The partner may want to publish.** A research partner values a paper; a commercial buyer values confidentiality. Both are legitimate, and they must be reconciled in writing first.

## The ladder

Each rung answers one question, costs more than the previous one and carries more operational risk:`,
        },
        {
          kind: "flow",
          title: "Analytics pilot ladder",
          steps: [
            { label: "0. Data agreement", detail: "Owner and operator release a defined historical dataset for a defined purpose. Question: can we get the data at all?" },
            { label: "1. Retrospective back-test", detail: "Run the method on history and compare with a reference, including natural experiments such as the 2018 to 2019 cleaning arm failure at Shagaya. Question: does the method see soiling correctly?" },
            { label: "2. Shadow mode", detail: "Run live; log recommendations and predicted losses ahead of time; change nothing. Question: do predictions hold out of sample?" },
            { label: "3. Controlled trial", detail: "Recommended schedule on treated blocks, current schedule on matched control blocks, a full season. Question: does acting on it save money?" },
            { label: "4. Service", detail: "Procured or contracted service with a conversion price agreed earlier. Question: will they pay to keep it?" },
          ],
          caption: "Most research collaborations stop at rung 1 or 2 and publish. Commercial pilots with IPPs usually start at 1 and aim for 3; rung 3 is where money is proven.",
        },
        { kind: "equation", formula: "mz11-backtest-mae" },
        {
          kind: "md",
          md: md`## Success metrics that can actually be judged

| Rung | Metric | Example threshold (illustrative) | Reference | Judge |
|---|---|---|---|---|
| 1 Back-test | MAE of weekly soiling loss | at most 0.5 percentage points | Step changes at recorded cleanings; corrected PR baseline | Research partner's lead |
| 1 Back-test | Detection of recorded cleaning events | at least 90 % recall, at most 1 false event per month | Cleaning logs | Research partner's lead |
| 2 Shadow | Out-of-sample error of predicted loss 14 days ahead | at most 1.0 percentage point | Same as above, on new data | Operator's performance engineer |
| 3 Trial | Combined cleaning cost plus soiling loss, treated vs control | at least 8 % lower, above the detection limit | Corrected PR of both blocks, cost records | Owner's asset manager |

Thresholds must sit above the measurement's own detection limit (see mz02 lesson 4), and they must be fixed before anyone sees the results.

## Paid or unpaid

A research collaboration is usually unpaid on purpose: each side contributes effort for a shared method and publication, and payment would turn it into a procurement. A commercial pilot with an IPP should be paid. The Founder Core expected-value model applies:`,
        },
        { kind: "equation", formula: "fc04-pilot-ev" },
        {
          kind: "md",
          md: md`## Publication, data and IP

| Term | Research partner (e.g. KISR) | Commercial pilot (e.g. Gulf IPP) |
|---|---|---|
| **Data ownership** | Plant owner owns operational data; release approved by owner and operator | Plant owner; read-only export; deleted or returned at end unless licensed |
| **Publication** | Joint; each party may review drafts for confidential information within a fixed period (e.g. 30 days); no veto on results | Normally none without consent; offer an anonymised case study clause |
| **Patent delay** | Optional short delay (e.g. 60 to 90 days) for a filing | Rarely relevant |
| **Background IP** | Each party keeps its own (Mizan's software and pipelines; KISR's datasets and know-how) | Mizan keeps its software |
| **Foreground IP** | Published method open; Mizan's implementation proprietary; joint data products as agreed | Results belong to the buyer; Mizan keeps generic improvements |
| **Use of results** | Either party may cite; Mizan may describe the collaboration factually | Reference only with written consent |

A deliberate strategy for Mizan: **publish the method, keep the product.** A published, peer-reviewed method validated with KISR builds credibility and may shape how the region measures soiling (Mizan's planned open-source dust and soiling atlas points the same way). The defensible part is the implementation: data pipelines, integrations, operational recommendations and support.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "To confirm for Shagaya Phase I",
          md: md`Who may release Shagaya Phase I operating data (MEWRE as owner, KISR as operator, or both), KISR's standard research agreement terms on publication and IP, and whether any data was already released for the RSER 2020 paper on terms that could be reused. None of this is in the research brief.`,
        },
        {
          kind: "feynman",
          prompt: "Explain to a KISR researcher why you want to start with a retrospective back-test on historical data, including the 2018 to 2019 cleaning arm failure, before any change to cleaning operations.",
          keyPoints: [
            "A back-test needs only historical data, so it carries no operational risk and can start as soon as data is released",
            "The cleaning arm failure is a natural experiment: a period without normal cleaning gives a strong soiling signal against which the method can be checked",
            "The reference (corrected PR to IEC 61724-1, step changes at cleanings) and the error threshold are fixed before results are seen",
            "If the method fails the back-test, nobody has changed operations; if it passes, it justifies shadow mode and a trial and supports a joint paper",
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Fees and success metrics in numbers",
      blocks: [
        {
          kind: "worked",
          title: "Paid vs free pilot for a Gulf IPP (illustrative)",
          mode: "worked",
          given: md`Illustrative numbers. Mizan proposes a four-month back-test plus shadow-mode pilot at a Gulf IPP. Delivery cost $C_d = $ USD 25,000 (engineer and analyst time, travel). If converted: ACV USD 40,000, gross margin 75 %, expected 3 years. Honest conversion estimates: 40 % if the IPP pays USD 15,000 (credited against year one), 20 % if free.`,
          steps: [
            { md: md`**Value of a conversion.** $\mathrm{ACV} \cdot GM \cdot n = 40{,}000 \times 0.75 \times 3 = 90{,}000$ USD.` },
            { md: md`**Paid.** $EV = 15{,}000 - 25{,}000 + 0.40 \times 90{,}000 = -10{,}000 + 36{,}000 = 26{,}000$ USD. (The credit reduces year-one revenue by USD 15,000 if converted: $26{,}000 - 0.40 \times 15{,}000 = 20{,}000$ USD.)` },
            { md: md`**Free.** $EV = 0 - 25{,}000 + 0.20 \times 90{,}000 = -7{,}000$ USD.` },
            { md: md`**Break-even conversion for a free pilot.** $p_c^* = C_d/(\mathrm{ACV}\cdot GM\cdot n) = 25{,}000/90{,}000 = 0.28$. Below 28 % the free pilot loses money even before counting founder time.` },
          ],
          result: md`Paid: about USD 20k expected value after the credit. Free: about minus USD 7k. The fee matters less as revenue than as proof that someone with a budget wants the result.`,
        },
        {
          kind: "worked",
          title: "Your turn: judge a back-test",
          mode: "faded",
          given: md`Illustrative back-test over five weeks. Estimated weekly soiling loss (%) vs reference (%): week 1: 3.1 vs 2.6; week 2: 4.0 vs 4.4; week 3: 5.2 vs 5.0; week 4: 1.0 vs 1.5; week 5: 2.4 vs 2.0. The agreed criterion is MAE at most 0.5 percentage points.`,
          steps: [
            { md: md`Absolute errors: 0.5, 0.4, 0.2, 0.5, 0.4. Sum:`, hidden: true, check: { prompt: "Sum of absolute errors (percentage points)", answer: 2.0, tolerance: { abs: 0.01 } } },
            { md: md`MAE $= 2.0/5$:`, hidden: true, check: { prompt: "MAE (percentage points)", answer: 0.4, tolerance: { abs: 0.01 } } },
            { md: md`$0.4 \le 0.5$: the criterion is met. Five weeks is a short window: the agreement should specify the full back-test period (for example a year including the shamal season and the cleaning arm failure) so one good month cannot carry the result.` },
          ],
          result: md`MAE 0.4 percentage points: pass on this window. The window and reference were fixed in advance, so nobody can argue about it afterwards.`,
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Writing the pilot term sheet",
      blocks: [
        {
          kind: "checklist",
          title: "Analytics pilot term sheet: sections",
          items: [
            "Parties and roles (owner, operator, methodology partner, Mizan) and who signs for each",
            "Objective as one question per rung, and which rungs are in scope",
            "Plant, blocks, period and the exact data list (signals, resolution, period, cleaning and maintenance logs)",
            "Data handling: purpose, storage location, access, retention, deletion or return at end",
            "Success criteria: metric, threshold, reference method, data window, date, judge",
            "Resources each party commits (people, hours, site access)",
            "Fee and credit, or explicit statement that the collaboration is unpaid",
            "IP: background, foreground, the published method versus Mizan's implementation",
            "Publication: authorship, review period, patent delay, anonymisation, owner approval",
            "Next step on success (procured service, paid trial) and on failure; end date and exit",
          ],
        },
        {
          kind: "ask",
          title: "Questions to settle before any data moves",
          items: [
            "Who owns this plant's data, and who must approve its release?",
            "Which historical period and signals exist, at what resolution, and with what gaps?",
            "Are cleaning dates, the cleaning method and the 2018 to 2019 cleaning arm failure period recorded, and where?",
            "Which reference will we judge the method against, and what is its own uncertainty?",
            "Who will judge success, and on which date will they decide?",
            "If the method works, what is the route to an operational service (see lesson 2)?",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How analytics pilots stall",
          md: md`**No data agreement**, so the start date slides every month. **Success defined after the results**, so any result can be argued either way. **An operational trial over six weeks** that cannot see past seasonal noise. **Publication terms left vague**, so a commercial buyer vetoes the paper or a research partner publishes something Mizan considers confidential. **No next step written down**, so a successful research pilot turns into free monthly operations. **Calling it signed or running** before it is, in a deck or a conversation.`,
        },
        { kind: "xref", to: "fc02-l06", note: "Founder Core: MVP scoping and pilot purgatory, the general failure mode this term sheet is designed to avoid." },
        { kind: "xref", to: "mz04-l05", note: "Mizan track: why the 2018 to 2019 cleaning arm failure at Shagaya is a natural experiment for validation." },
        {
          kind: "question",
          question: {
            id: "mz11-l05-p1",
            type: "short",
            prompt: md`Draft a one-page term sheet for the targeted Shagaya Phase I soiling analytics pilot with KISR researchers as methodology partner. Cover: parties and roles, rungs in scope, data list, success criteria with thresholds (illustrative), fee position, data handling, IP and publication, and the next step on success. Do not describe the pilot as signed or running.`,
            rubric: [
              "Correct roles: plant owner (MEWRE), operator and methodology partner (KISR), Mizan as analytics; owner approval for data release flagged as to be confirmed",
              "Rungs in scope are realistic for a research collaboration (data agreement, back-test including the 2018 to 2019 cleaning arm failure, possibly shadow mode), with no operational change without a later agreement",
              "Success criteria are measurable: metric, threshold, reference (corrected PR to IEC 61724-1 and cleaning step changes), window, date, judge",
              "States that the collaboration is unpaid and separates any later operational service, which would be procured",
              "Publication and IP terms: joint paper, review period without veto, background IP retained, published method vs proprietary implementation, anonymisation and owner approval",
              "Uses status language correctly (targeted, in preparation) and labels illustrative numbers",
            ],
            modelAnswer: md`**Term sheet (draft for discussion): soiling analytics method validation, Shagaya Phase I PV**

**Status.** In preparation; not agreed.

**Parties.** KISR (operator of Shagaya Phase I and methodology partner); Mizan (analytics). Plant owner MEWRE: approval for data release to be confirmed.

**Objective.** Validate a method that turns operational data into soiling estimates and cleaning decisions, given that no standard method exists.

**Scope.** Rung 0: data agreement. Rung 1: retrospective back-test over the available history of the 11.15 MW PV plant, including the 2018 to 2019 cleaning arm failure period. Rung 2 (optional, by later written agreement): six months of shadow mode. No change to cleaning operations under this agreement.

**Data.** Inverter AC power, plane-of-array irradiance, module and ambient temperature, wind and met data at 15-minute or better resolution; cleaning dates and method; maintenance and outage logs; any reference-cell data.

**Success criteria (illustrative).** Weekly soiling loss MAE at most 0.5 percentage points against the reference (temperature-corrected PR to IEC 61724-1, cross-checked with step changes at recorded cleanings) over the full back-test window; at least 90 % recall of logged cleaning events. Judged by the KISR lead researcher, at a review meeting on a date agreed at signature.

**Fee.** Unpaid collaboration; each party carries its own costs. Any later operational service for the plant would be a separate service contract under the owner's procurement rules.

**Data handling.** Stored in a region agreed with KISR; used only for this purpose; deleted or returned at the end unless further use is agreed.

**IP.** Each party keeps its background IP. The validated method is published; Mizan's software implementation remains Mizan's.

**Publication.** Joint paper with KISR co-authors; each party may review drafts for 30 days for confidential information, with no veto on results; plant data anonymised or released only with owner approval.

**Next step on success.** Joint paper; proposal for shadow mode; discussion of an operational service through the proper route.`,
            explanation: md`A good term sheet answers the data, judgement and publication questions before they become disputes.`,
            concepts: ["mz11.pilot-ladder", "mz11.pilot-success-metrics", "mz11.publication-rights", "mz11.data-agreement", "mz11.pilot-fee"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["mz11-r1", "mz11-r13"] },
      ],
    },
  ],
  quiz: [
    {
      id: "mz11-l05-q1",
      type: "order",
      prompt: md`Order the rungs of an analytics pilot ladder.`,
      items: ["Data agreement", "Retrospective back-test", "Shadow mode", "Controlled operational trial", "Procured service"],
      explanation: md`Each rung is cheaper and safer than the next and answers one question.`,
      concepts: ["mz11.pilot-ladder"],
      difficulty: 1,
    },
    {
      id: "mz11-l05-q2",
      type: "numeric",
      prompt: md`Illustrative. Pilot delivery cost USD 30,000; converted contract ACV USD 50,000 at 70 % gross margin for 3 years. What is the break-even conversion probability for a free pilot (as a fraction)?`,
      answer: 0.2857,
      tolerance: { abs: 0.005 },
      unit: "fraction",
      explanation: md`$p_c^* = 30{,}000/(50{,}000 \times 0.70 \times 3) = 30{,}000/105{,}000 = 0.286$.`,
      concepts: ["mz11.pilot-fee"],
      difficulty: 2,
    },
    {
      id: "mz11-l05-q3",
      type: "mcq",
      prompt: md`What is the right publication term for a research partner in a joint soiling study?`,
      options: [
        "The partner may veto any result it dislikes",
        "Each party may review drafts for confidential information within a fixed period, with no veto on results",
        "No publication until the commercial product launches",
        "Mizan publishes alone to protect its IP",
      ],
      answer: 1,
      explanation: md`Review for confidentiality, not a veto on findings; this keeps the research credible.`,
      concepts: ["mz11.publication-rights"],
      difficulty: 1,
    },
    {
      id: "mz11-l05-q4",
      type: "multi",
      prompt: md`Which make a pilot success criterion judgeable? (Select all.)`,
      options: [
        "A threshold fixed before results are seen",
        "A named reference method with stated uncertainty",
        "A data window that includes the dusty season",
        "A judge and a decision date",
        "Wording such as 'shows promising results'",
      ],
      answer: [0, 1, 2, 3],
      explanation: md`Vague wording lets any result be argued either way.`,
      concepts: ["mz11.pilot-success-metrics"],
      difficulty: 1,
    },
    {
      id: "mz11-l05-q5",
      type: "decision",
      prompt: md`Six months into a successful unpaid research back-test, the operator asks Mizan to "just run it every month for us from now on". What do you answer?`,
      options: [
        { text: "Agree; it builds goodwill.", score: 0.1, feedback: "Free operations become the expectation and bypass procurement; the research collaboration turns into an unprocured service." },
        { text: "Welcome it, explain that running it for operations is a service, and propose the route (direct contracting or tender) and a fee, while finishing the joint paper.", score: 1, feedback: "Right: the term sheet should already say this." },
        { text: "Refuse to continue until they pay for the past six months.", score: 0.2, feedback: "The collaboration was agreed as unpaid; changing that now damages trust." },
      ],
      explanation: md`Research ends with a paper and a proposal, not with free operations.`,
      concepts: ["mz11.pilot-fee", "mz11.pilot-ladder"],
      difficulty: 2,
    },
    {
      id: "mz11-l05-q6",
      type: "mcq",
      prompt: md`Why is a six-week controlled operational trial of a new cleaning schedule usually too short?`,
      options: [
        "Robots need six months to learn",
        "Savings accrue over months and soiling varies by season, so six weeks can be noise below the detection limit",
        "IEC 61724-1 forbids trials shorter than a year",
        "Lenders require a full year",
      ],
      answer: 1,
      explanation: md`The difference must exceed measurement noise across representative conditions.`,
      concepts: ["mz11.pilot-success-metrics"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz11-l05-f1", front: "Analytics pilot ladder", back: "Data agreement, retrospective back-test, shadow mode, controlled trial, procured service.", concepts: ["mz11.pilot-ladder"] },
    { id: "mz11-l05-f2", front: "Back-test metric", back: md`$\mathrm{MAE} = \frac{1}{N}\sum |\hat L_i - L_i|$ against a stated reference (corrected PR, cleaning step changes), threshold fixed in advance.`, concepts: ["mz11.pilot-success-metrics"] },
    { id: "mz11-l05-f3", front: "Publish the method, keep the product", back: "Peer-reviewed method with KISR builds credibility; Mizan's pipelines, integrations and operations stay proprietary.", concepts: ["mz11.publication-rights"] },
    { id: "mz11-l05-f4", front: "Who owns plant data", back: "The plant owner. At Shagaya Phase I that is MEWRE; the operator (KISR) may not release it alone: confirm.", concepts: ["mz11.data-agreement"] },
    { id: "mz11-l05-f5", front: "Illustrative paid vs free pilot", back: "C_d USD 25k, conversion worth USD 90k: paid (USD 15k, 40 %) EV about USD 20k after credit; free (20 %) EV about minus USD 7k; break-even 28 %.", concepts: ["mz11.pilot-fee"] },
    { id: "mz11-l05-f6", front: "Natural experiment for validation", back: "The 2018 to 2019 cleaning arm failure at Shagaya: a period without normal cleaning to test whether the method sees soiling.", concepts: ["mz11.pilot-ladder"] },
  ],
};

export default lesson;
