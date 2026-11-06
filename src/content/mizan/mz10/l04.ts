import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz10-l04",
  title: "Writing and publishing: paper structure, peer review, preprints, conferences and open data",
  summary:
    "How a validation study becomes a publication: the structure reviewers in PV performance expect, how peer review works and how to answer reviewers, when to post a preprint, how journals and conferences (IEEE PVSC, EU PVSEC) fit together, and how to release data and code under FAIR principles, including the planned Kuwait dust and soiling atlas, Kuwait electricity dataset and Kuwait energy systems toolkit.",
  minutes: 70,
  objectives: [
    "Outline a validation paper section by section and know what PV reviewers check in each",
    "Describe the peer-review process and write a point-by-point response to reviewers",
    "Decide when to post a preprint and what to check first",
    "Choose between journals and conferences for each result and plan around deadlines",
    "Plan an open data and code release that is FAIR, correctly licensed and respects data owners' rights",
  ],
  concepts: [
    {
      id: "mz10.paper-structure",
      name: "Structure of a validation paper",
      description: "Introduction, data and site, methods, validation design, results with uncertainty, discussion and limitations, conclusions, plus data and code availability and competing-interest statements.",
      competency: "mz-validation",
      related: ["mz10.peer-review", "mz10.validation-hypothesis"],
    },
    {
      id: "mz10.peer-review",
      name: "Peer review and the response to reviewers",
      description: "Editor screening, review by independent experts, decisions (reject, major or minor revision, accept) and a point-by-point response that changes the manuscript or explains why not.",
      competency: "mz-validation",
      related: ["mz10.paper-structure"],
    },
    {
      id: "mz10.preprint",
      name: "Preprints",
      description: "A public version of the manuscript before peer review (for example on arXiv); establishes priority and speed, but is not peer reviewed, counts as public disclosure, and must fit the target journal's policy.",
      competency: "mz-validation",
      related: ["mz10.ip-confidentiality"],
    },
    {
      id: "mz10.venue-choice",
      name: "Journals versus conferences",
      description: "Conferences (IEEE PVSC, EU PVSEC) give fast exposure to the PV community and feedback; journals give the durable, citable, peer-reviewed record that buyers and reviewers trust.",
      competency: "mz-validation",
      related: ["mz10.paper-structure"],
    },
    {
      id: "mz10.open-data",
      name: "Open data and code under FAIR principles",
      description: "Releasing data and code that are findable (persistent identifiers), accessible, interoperable (open formats, documented units) and reusable (clear licence, provenance), only with the data owners' permission.",
      competency: "mz-validation",
      related: ["fc05.open-source-distribution", "mz10.data-sharing-agreement"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "From study to paper",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`A study nobody can read is worth nothing commercially. A peer-reviewed, co-authored paper with KISR researchers is the evidence a utility engineer, a tender committee or an investor's technical advisor will accept, and the planned open atlas, dataset and toolkit turn Mizan into the reference point for soiling in Kuwait. You will not write the statistics, but you will own the publication plan, the timeline, the claims and the release decisions, and you will often draft the introduction and discussion.`,
        },
        {
          kind: "md",
          md: md`### What goes in each section

| Section | Content | What PV reviewers check |
|---|---|---|
| **Title and abstract** | Question, site, method, main numbers with uncertainty, scope | Numbers present; no claim beyond the data |
| **Introduction** | Problem (soiling cost, no standard method for cleaning decisions), prior work (SRR, change-point methods, soiling stations, the 2020 Shagaya paper), gap, contribution | Fair, current literature; a clear gap |
| **Site and data** | Plant, technologies, monitoring class, sensors, resolution, period, cleaning records, data quality | Enough detail to reproduce; data gaps declared |
| **Methods** | The method, the baseline methods, preprocessing and filters | Every choice justified; parameters stated |
| **Validation design** | Hypotheses, ground truth, unit, sample size, hold-out, blinding, pre-registration | Independence of truth; autocorrelation handled |
| **Results** | Bias, RMSE, coverage, DiD estimates, all with intervals; figures of time series and errors | Uncertainty everywhere; baselines compared |
| **Discussion and limitations** | What it means for cleaning decisions; one plant, one climate; threats to validity | Honest limits; no overreach |
| **Conclusions** | Short, scoped | Matches results |
| **Statements** | Data and code availability, CRediT roles, competing interests, funding, acknowledgements | Present and specific |

A good rule: a reader should be able to reproduce every number in the results from the data and code statement.

### How peer review works`,
        },
        {
          kind: "flow",
          title: "Journal peer review",
          steps: [
            { label: "Submission", detail: "Manuscript, cover letter, statements, suggested reviewers" },
            { label: "Editor screening", detail: "Scope, quality, novelty; desk rejection is common" },
            { label: "Review", detail: "Usually two or three independent experts; single or double blind" },
            { label: "Decision", detail: "Reject, major revision, minor revision or accept" },
            { label: "Revision and response letter", detail: "Point-by-point answers, tracked changes" },
            { label: "Further rounds", detail: "Until accept or reject" },
            { label: "Acceptance and production", detail: "Proofs, online publication, DOI" },
          ],
          caption: "Durations vary from weeks to many months by journal. Check the journal's published statistics where available.",
        },
        {
          kind: "md",
          md: md`**The response letter.** Quote each reviewer comment, answer it, and say exactly what changed and where (section, line). Agree where the reviewer is right, which is often. Where you disagree, give evidence, not tone. Run any extra analysis requested if it is reasonable; reviewers in this field commonly ask for a baseline comparison, a sensitivity analysis on filters, or more detail on the reference devices.

### Preprints

A preprint (for example on arXiv) makes the work public before review: it establishes priority, lets buyers and partners read it early, and gathers comments. Three checks first:

1. **Journal policy**: most major publishers accept preprints, but policies differ by journal and change. Check the target journal's policy page before posting.
2. **Partner agreement**: the publication review period applies to preprints too.
3. **Patents**: a preprint is public disclosure (lesson 3).

Label a preprint as not peer reviewed when you cite it commercially.

### Journals and conferences

**Conferences** such as the **IEEE Photovoltaic Specialists Conference (PVSC)** and the **European Photovoltaic Solar Energy Conference and Exhibition (EU PVSEC)** are the main annual meetings of the PV community. They are where soiling, performance and reliability researchers, module and tracker makers, and O&M firms meet. A talk or poster gives fast exposure and feedback; proceedings papers are shorter and less weighted than journal articles. Abstract deadlines are typically months before the event: check the official site each year.

**Journals** where PV performance and soiling work appears include *Renewable and Sustainable Energy Reviews* (where the 2020 Shagaya paper was published), *Solar Energy*, *Progress in Photovoltaics* and the *IEEE Journal of Photovoltaics*. Choose by scope (method versus review versus application), audience, review speed and open-access options.

A common pattern: present first results at a conference, then publish the full study in a journal (check that the journal accepts extended versions of conference papers).

### Open data and code

The **FAIR principles** are the standard: data should be **Findable** (persistent identifier such as a DOI, rich metadata), **Accessible** (retrievable by a standard protocol, even if access is controlled), **Interoperable** (open formats, documented units and time zones) and **Reusable** (clear licence and provenance). Practical tools: Zenodo for DOIs on datasets and code releases; CC BY 4.0 for data and maps; an OSI-approved licence such as MIT or Apache 2.0 for code.`,
        },
        {
          kind: "md",
          md: md`### The planned open research tools

| Planned tool | What it would contain | Main release questions |
|---|---|---|
| **Kuwait dust and soiling atlas** | Maps and time series of soiling indicators across Kuwait (from soiling measurements, reanalysis aerosol data, and validated plant estimates) | Which sources may be redistributed; uncertainty shown on the map; how site data are aggregated so individual plants are not exposed |
| **Kuwait electricity dataset** | Cleaned, documented public data on Kuwait's power system (demand, capacity, generation mix) | Only data whose sources permit reuse; provenance per series; update cadence |
| **Kuwait energy systems toolkit** | Open code for analyses such as PR correction, soiling extraction baselines and the validation metrics | Licence; what stays out (Mizan's proprietary method and integrations); maintenance commitment |

These are plans, not released products. Each depends on data rights: data from KISR or the plant owner can only be released with their explicit permission, under the agreement. The open tools build the community and the brand; Mizan's commercial product (the cleaning-decision service and plant integrations) remains separate.`,
        },
        { kind: "xref", to: "fc05-l03", note: "Open source as a distribution and trust channel for engineers, from the marketing side." },
      ],
    },
    {
      layer: "applied",
      title: "Worked: writing the result with its uncertainty",
      blocks: [
        {
          kind: "worked",
          title: "Turning bias numbers into a results sentence (illustrative)",
          mode: "faded",
          given: md`Illustrative. 18 cleaning intervals. Mean bias of the method's soiling rate versus the reference station $\mathrm{MBE} = +0.027$ %/day, sample SD of the errors $s = 0.060$ %/day. Use the t distribution with 17 degrees of freedom: $t_{0.975,17} = 2.110$.`,
          steps: [
            {
              md: md`**Standard error.** $\mathrm{SE} = s/\sqrt{n} = 0.060/\sqrt{18}$.`,
              hidden: true,
              check: { prompt: "Standard error of the mean bias (%/day)", answer: 0.01414, tolerance: { abs: 0.0002 }, unit: "%/day" },
            },
            {
              md: md`**95% half-width.** $2.110 \times 0.01414$.`,
              hidden: true,
              check: { prompt: "Half-width (%/day)", answer: 0.02984, tolerance: { abs: 0.0003 }, unit: "%/day" },
            },
            { md: md`**Interval.** $0.027 \pm 0.030$, so from $-0.003$ to $+0.057$ %/day.` },
            { md: md`**Sentence.** "Across 18 cleaning intervals, the mean bias of the estimated soiling rate relative to the reference station was +0.027 %/day (95% CI −0.003 to +0.057 %/day)." Then the interpretation: the bias is not distinguishable from zero, but a bias of up to about 0.06 %/day cannot be excluded, which on a 0.3 %/day rate is up to 20% relative.` },
          ],
          result: md`Report the interval, not just "no significant bias". The upper bound is what a reviewer and a buyer should weigh: it sets how much a cleaning schedule could be shifted by bias.`,
        },
        {
          kind: "question",
          question: {
            id: "mz10-l04-p1",
            type: "numeric",
            prompt: md`Illustrative: 25 intervals, error SD 0.05 %/day. Using $t_{0.975,24} = 2.064$, what is the 95% half-width of the mean bias in %/day? (4 decimals)`,
            answer: 0.0206,
            tolerance: { abs: 0.0003 },
            unit: "%/day",
            explanation: md`$\mathrm{SE} = 0.05/5 = 0.01$; half-width $= 2.064 \times 0.01 = 0.0206$ %/day.`,
            concepts: ["mz10.paper-structure"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the publication plan",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

The corresponding author (often the partner lead, as agreed) handles submission and correspondence. Analysts write methods and results; you, with the partner, often draft the introduction, discussion and statements, and run the timeline. Agree who decides on journal choice, preprint and open release, and record it.

### Tools

A shared reference manager, a shared manuscript (journal template from the start), version-controlled analysis code with a tagged release for the submitted version, and a data package with a README, a data dictionary (units, time zone, sign conventions) and a licence.`,
        },
        {
          kind: "checklist",
          title: "Before submission",
          items: [
            "Every number in the abstract appears in the results with its uncertainty",
            "Baseline method results reported alongside Mizan's method",
            "Pre-registration and any deviations described",
            "Limitations section names one plant, period, climate and the main threats to validity",
            "Data and code availability statement agreed with KISR and, where needed, the plant owner",
            "CRediT roles, competing interests and funding statements complete",
            "Journal preprint policy and partner review period checked before any preprint",
            "Conference abstract deadlines checked on the official sites",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`**Abstract inflation**: the abstract says more than the results. **Missing baseline**: reviewers cannot tell what the method adds. **Unreleasable data**: promising "data available on request" when the agreement does not allow it. **Salami slicing**: splitting one study into many thin papers, which reviewers notice. **Marketing tone**: words like "revolutionary" or "unprecedented" in a paper damage credibility with exactly the readers you need.`,
        },
        {
          kind: "callout",
          tone: "ai",
          title: "Using AI in the writing",
          md: md`AI tools help with structure, language and checking consistency between abstract and results. Most publishers now have policies on AI use: AI tools cannot be authors, and use must often be disclosed. Check the journal's policy, never let a tool invent references, and verify every citation against the source.`,
        },
        {
          kind: "question",
          question: {
            id: "mz10-l04-p2",
            type: "short",
            prompt: md`Draft the **structured abstract** (about 200 words) for Paper A (the blind test of soiling methods on historical Shagaya Phase I data, including the cleaning-outage period) plus a two-sentence **data availability statement**. Use clearly marked placeholders such as [X] for results you do not have, and keep every claim scoped.`,
            rubric: [
              "Structured: background and gap, data and site, methods including baseline and blind design, results with uncertainty placeholders, scoped conclusion",
              "States the gap (no standard method for turning operational data into cleaning decisions) and builds on the 2020 Shagaya performance paper",
              "Uses temperature-corrected PR and names the validation metrics (bias, RMSE, coverage, DiD)",
              "Uses placeholders rather than inventing numbers, and reports results as intervals",
              "Conclusion limited to this plant and period; no cost-savings or general-accuracy claim",
              "Data availability statement is conditional on KISR and plant-owner permission and names a repository approach",
            ],
            modelAnswer: md`**Background.** Soiling is a major loss for PV in Kuwait, but there is no standard method for turning operational data into cleaning decisions. **Data.** We use [N] months of inverter, meteorological and cleaning-log data from the 11.15 MW dual-technology PV plant at Shagaya Phase I, previously characterised by Al-Rasheedi et al. (2020), including a [duration] period in 2018 to 2019 in which cleaning was interrupted in part of the plant. **Methods.** A soiling-extraction method and an open baseline (stochastic rate and recovery) were run blind to the outage dates on daily temperature-corrected performance ratio. The soiling loss during the outage was estimated independently by difference-in-differences against a cleaned section, with parallel trends checked on the pre-period. The analysis plan was pre-registered. **Results.** The method's estimate of outage soiling loss was [X] PR points (95% CI [a, b]) versus [Y] (95% CI [c, d]) from difference-in-differences; soiling-rate bias was [MBE] %/day (95% CI [e, f]), RMSE [R] %/day, and interval coverage [C]%. The baseline gave [..]. **Conclusions.** At this plant and over this period, [the method recovered / did not recover] the uncleaned soiling loss within its stated uncertainty. Validation at other plants and a prospective decision trial are needed.

**Data availability.** Data were provided by KISR [and the plant owner] under a research agreement; derived daily series will be deposited on Zenodo under CC BY 4.0 [if permitted]. Analysis code for the baseline and metrics is available under an open licence at [repository].`,
            explanation: md`Placeholders keep you from inventing results; intervals and scope keep the abstract from saying more than the data. The data statement must match what the agreement with KISR and the plant owner actually permits.`,
            concepts: ["mz10.paper-structure", "mz10.open-data"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["mz10-r1", "mz10-r9", "mz10-r10", "mz10-r11", "mz10-r12", "mz10-r13", "mz10-r14", "mz10-r15"] },
      ],
    },
  ],
  quiz: [
    {
      id: "mz10-l04-q1",
      type: "order",
      prompt: md`Order the journal process.`,
      items: [
        "Submission with statements and cover letter",
        "Editor screening",
        "Independent peer review",
        "Decision (for example major revision)",
        "Revision with point-by-point response",
        "Acceptance and online publication",
      ],
      explanation: md`Desk rejection can happen at screening; several revision rounds are common.`,
      concepts: ["mz10.peer-review"],
      difficulty: 1,
    },
    {
      id: "mz10-l04-q2",
      type: "multi",
      prompt: md`Before posting a preprint of the Shagaya paper, what must you check? (select all)`,
      options: [
        "The target journal's preprint policy",
        "The publication review period in the agreement with KISR",
        "Whether anyone intends to patent part of the method",
        "Whether the preprint server is peer reviewed",
      ],
      answer: [0, 1, 2],
      explanation: md`Preprint servers are not peer reviewed by design. Journal policy, partner rights and patent plans all matter.`,
      concepts: ["mz10.preprint"],
      difficulty: 2,
    },
    {
      id: "mz10-l04-q3",
      type: "mcq",
      prompt: md`What does the R in FAIR require?`,
      options: [
        "Data must be released for free",
        "Data must be reusable: clear licence, provenance and documentation",
        "Data must be reviewed",
        "Data must be real-time",
      ],
      answer: 1,
      explanation: md`Reusable means a licence, provenance and enough metadata for others to use the data correctly. FAIR data can still have controlled access.`,
      concepts: ["mz10.open-data"],
      difficulty: 1,
    },
    {
      id: "mz10-l04-q4",
      type: "mcq",
      prompt: md`Which is usually the stronger evidence for a utility's technical evaluator?`,
      options: [
        "A conference poster at EU PVSEC",
        "A peer-reviewed journal article co-authored with the research partner",
        "A company white paper",
        "A LinkedIn post with a chart",
      ],
      answer: 1,
      explanation: md`Conferences give exposure and feedback; the journal article is the durable, reviewed record. Both are useful in sequence.`,
      concepts: ["mz10.venue-choice"],
      difficulty: 1,
    },
    {
      id: "mz10-l04-q5",
      type: "decision",
      prompt: md`A reviewer asks for a comparison against an open baseline method, which will take three weeks. Your team is impatient. What do you do?`,
      options: [
        { text: "Run the comparison, report it honestly in the revision, and explain it in the response letter.", score: 1, feedback: "Baseline comparisons are a reasonable request and strengthen the paper and the commercial claim." },
        { text: "Respond that the comparison is out of scope.", score: 0.2, feedback: "Likely to lead to rejection or another round; it also weakens what you can claim." },
        { text: "Withdraw and submit to a faster journal without the comparison.", score: 0.1, feedback: "The next reviewers will probably ask the same thing." },
      ],
      explanation: md`Most reviewer requests improve the paper; answer with analysis, not argument.`,
      concepts: ["mz10.peer-review"],
      difficulty: 1,
    },
    {
      id: "mz10-l04-q6",
      type: "mcq",
      prompt: md`KISR's data cannot be redistributed under the agreement. What should the data availability statement say?`,
      options: [
        "Data available on request from the authors",
        "The data were provided by KISR under a research agreement and are not publicly available; requests should be directed to KISR; derived results and code are available at [repository]",
        "Data are confidential",
        "Nothing",
      ],
      answer: 1,
      explanation: md`Be specific and honest about access, name who controls it, and release what you can (code, derived non-identifying results) if permitted.`,
      concepts: ["mz10.open-data"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz10-l04-f1", front: "Sections of a validation paper", back: "Introduction, site and data, methods, validation design, results with uncertainty, discussion and limitations, conclusions, statements.", concepts: ["mz10.paper-structure"] },
    { id: "mz10-l04-f2", front: "Response letter rule", back: "Quote each comment, answer it, say exactly what changed and where; evidence, not tone.", concepts: ["mz10.peer-review"] },
    { id: "mz10-l04-f3", front: "Three checks before a preprint", back: "Journal policy, partner review period, patent plans.", concepts: ["mz10.preprint"] },
    { id: "mz10-l04-f4", front: "IEEE PVSC and EU PVSEC", back: "Main annual PV conferences (US and Europe): fast exposure and feedback; journal article remains the durable record.", concepts: ["mz10.venue-choice"] },
    { id: "mz10-l04-f5", front: "FAIR", back: "Findable (DOI, metadata), Accessible, Interoperable (open formats, units), Reusable (licence, provenance).", concepts: ["mz10.open-data"] },
    { id: "mz10-l04-f6", front: "Planned Mizan open tools", back: "Kuwait dust and soiling atlas, Kuwait electricity dataset, Kuwait energy systems toolkit. Plans; release depends on data rights.", concepts: ["mz10.open-data"] },
  ],
};

export default lesson;
