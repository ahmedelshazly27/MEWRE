import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz12-l05",
  title: "Operating constraints: public claims discipline and open-source research tools",
  summary:
    "Two disciplines that shape everything Mizan publishes. First, public claims discipline: every public statement about pilots, partners and results is checked against an evidence ladder, partner and institution names are used only with written consent, and decks, repositories and dataset metadata are reviewed so no confidential plant or customer data escapes. Second, the planned open-source research tools (a Kuwait dust and soiling atlas, a Kuwait electricity dataset, a Kuwait energy systems toolkit) as a marketing and credibility engine: what to open and what to keep closed, licences, data permissions, the funnel from user to pilot, and its cost.",
  minutes: 70,
  objectives: [
    "You can place any claim about a pilot, partner or result on the evidence ladder and choose the words that rung allows.",
    "You can state when a partner's or institution's name, logo or results may be used publicly.",
    "You can list the places where confidential plant or customer data leaks from decks, repositories, datasets and posts, and the control for each.",
    "You can draw the open-versus-closed line for Mizan's research tools, choose licences and compute a funnel and cost per opportunity.",
    "You can write a release plan for the Kuwait dust and soiling atlas with a pre-release claims and data checklist.",
  ],
  concepts: [
    {
      id: "mz12.public-claims-discipline",
      name: "Public claims discipline",
      description:
        "Every public statement about pilots, partners, customers and results is checked against the evidence before release, uses the words the evidence allows, names partners only with written consent, and is logged with the name of whoever checked it.",
      competency: "mz-business",
      related: ["mz12.evidence-ladder", "mz12.leak-vectors"],
    },
    {
      id: "mz12.evidence-ladder",
      name: "Evidence ladder for claims",
      description:
        "Rungs from discussed, to targeted or in preparation, to signed, to running, to results measured, to results validated or published. Each rung permits specific words; a claim may never use a higher rung's words. Mizan's Shagaya soiling pilot is targeted or in preparation; SwishOS was discussed.",
      competency: "mz-business",
      related: ["mz12.public-claims-discipline"],
    },
    {
      id: "mz12.leak-vectors",
      name: "Confidential data leak vectors",
      description:
        "The places confidential plant or customer data escapes besides the obvious slide: screenshots, file metadata and speaker notes, SCADA tag names and site identifiers in code fixtures and commit messages, coordinates and site names in dataset metadata, prices in forwarded decks, and uploads to shared workspaces.",
      competency: "mz-business",
      related: ["mz12.public-claims-discipline", "fc08.data-rights"],
    },
    {
      id: "mz12.open-research-engine",
      name: "Open research as a credibility engine",
      description:
        "Publishing useful, citable Kuwait-specific tools (dust and soiling atlas, electricity dataset, energy systems toolkit) so researchers, engineers, IPPs and officials meet Mizan through its work. It builds credibility with KISR and buyers, inbound demand, recruiting pull and a de facto method where KISR confirmed none exists.",
      competency: "mz-business",
      related: ["fc05.open-source-distribution", "mz12.open-closed-line"],
    },
    {
      id: "mz12.open-closed-line",
      name: "Open versus closed line",
      description:
        "Open what builds trust and adoption without giving away the product: data, the baseline method (IEC 61724 temperature-corrected PR), toolkits and documentation. Keep closed the decision engine (cleaning and stow optimisation), plant-specific calibrations, customer data and anything a partner or owner has not licensed for release.",
      competency: "mz-business",
      related: ["mz12.open-research-engine", "mz12.control-points"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Two constraints on everything Mizan publishes",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan's public face is being built now: a website, a deck, LinkedIn posts, a possible methodology paper with KISR, and open-source repositories. In Kuwait's small energy community, one overstated claim ("our pilot at Shagaya", "our partner SwishOS") reaches KISR, MEWRE and the partner within days, and costs more credibility than any marketing can buy back. The open research tools are the opposite: the cheapest credibility Mizan can earn. Both live in the same files (a repository's commit log and a dataset's metadata are public documents), so you need both disciplines at once.`,
        },
        {
          kind: "md",
          md: md`### Part 1: public claims discipline

**The evidence ladder.** Every claim about a pilot, partner, customer or result sits on one rung, and the rung decides the words.

| Rung | Evidence | Words allowed | Words not allowed |
|---|---|---|---|
| Discussed | Conversations, no written commitment | "in discussion with", or nothing at all | "partner", "working with", logos |
| Targeted or in preparation | Proposal or protocol being prepared, counterpart engaged | "a pilot targeting ...", "in preparation" | "pilot at ...", "running", "deployed" |
| Signed | Executed agreement | "signed", "agreed", with consent to name | "results", "proven" |
| Running | Data flowing, work under way | "running at ...", if consent covers naming | any result |
| Results measured | Analysis complete, internal | "early results show ..." only with the counterpart's approval and the uncertainty stated | "validated", "independent" |
| Validated or published | Peer-reviewed or jointly approved results | Cite the publication | Stretching the result beyond its scope |

**Where Mizan stands today.** The soiling analytics pilot targets Shagaya Phase I with KISR researchers as methodology partner; it is **targeted or in preparation**, not signed or running. SwishOS was **discussed** as a soiling analytics partner. Nothing else exists to claim. Use labelled illustrative numbers in any public example.

**Names, logos and results of others.**
- A partner's, customer's or institution's name or logo appears only with **written consent** for that specific use (website, deck, paper, press). Consent to work together is not consent to be named.
- Citing a published paper is always allowed (for example Al-Rasheedi et al., RSER 133, 2020); implying the authors endorse Mizan is not.
- KISR, MEWRE and KAPP names carry institutional weight: check their communication rules and get approval for any joint announcement.
- Third-party facts (a competitor's funding, a vendor's features) are stated with their source and date, or not at all.

**Technical claims.** Numbers in public materials either come from a cited source, from Mizan's own measured work with the uncertainty stated, or are marked illustrative. "Up to" claims, cherry-picked best days and unreferenced percentages are the fastest way to lose an engineering audience.`,
        },
        {
          kind: "md",
          md: md`### Where confidential plant and customer data leaks

| Where | How it leaks | Control |
|---|---|---|
| Pitch deck | Screenshots with plant names, SCADA tags or prices; speaker notes; comments; file metadata (author, internal paths); version history of shared links | One public deck template; anonymised or synthetic screenshots; strip metadata on export to PDF |
| Website and posts | Case-study wording that identifies a site; dashboard images; photos showing site signage | Consent per use; review every image at full resolution |
| Code repositories | Test fixtures with real plant data, tag lists or IP addresses; commit messages naming customers; configuration files; CI logs | Synthetic fixtures; secrets and site configs never committed; review full history before making a repository public |
| Datasets and DOIs | Site coordinates, plant names or capacities in metadata; derived series that reveal a single plant | Aggregate or anonymise; permission check per input; metadata reviewed |
| Papers and talks | Plant identifiers, unapproved figures, acknowledgements implying a relationship | Joint approval with KISR and the owner before submission |
| Forwarded material | Investor updates or proposals with customer names and prices | Public-safe versions of anything that may be forwarded |
| Shared workspaces and AI tools | Uploading plant data or contracts to tools not approved for them | Data classification rule: no customer data in unapproved tools |

Plant data belongs to its owner (fc08-l07). A leak is not only embarrassing: it can breach a pilot agreement, a data licence or a government data rule.`,
        },
        {
          kind: "md",
          md: md`### Part 2: open research tools as a credibility engine

Mizan plans three open tools: a **Kuwait dust and soiling atlas**, a **Kuwait electricity dataset** and a **Kuwait energy systems toolkit**. KISR confirmed there is no standard method for turning operational data into cleaning decisions, and no public Kuwait soiling rate was found in the research for this course. That gap is the opportunity: whoever publishes the usable Kuwait data and a transparent baseline method becomes the reference.

**What open tools do for Mizan.**
- **Credibility** with KISR, MEWRE, KAPP and IPP engineers, who can inspect the work before meeting you.
- **Inbound**: engineers, students, consultants and analysts find Mizan by using its data; some work for buyers.
- **Citation**: a dataset with a DOI is cited in papers and reports, which compounds over years.
- **Recruiting**: the best engineers want to work where the interesting data is.
- **Standard-setting**: a published baseline method (temperature-corrected PR to IEC 61724, soiling ratio definitions) becomes the shared language buyers use in tenders.`,
        },
        {
          kind: "flow",
          title: "From open tool to pilot",
          steps: [
            { label: "Publish", detail: "Atlas, dataset or toolkit with documentation, licence, DOI and a citation file" },
            { label: "Use", detail: "Researchers, engineers and analysts download, run and cite it" },
            { label: "Engage", detail: "Issues, questions, newsletter sign-ups, conference conversations" },
            { label: "Qualify", detail: "A user works for, or advises, an owner, EPC, O&M contractor or ministry" },
            { label: "Pilot", detail: "A conversation about the closed product on their plant" },
          ],
          caption: "Each step has a conversion rate. Track them; an open programme without a funnel is a hobby.",
        },
        { kind: "equation", formula: "mz12-open-funnel" },
        { kind: "equation", formula: "mz12-cost-per-opportunity" },
        {
          kind: "md",
          md: md`### The open-versus-closed line

| Open (builds trust and adoption) | Closed (the product) |
|---|---|
| Kuwait dust and soiling atlas: maps and time series from public sources (AERONET, reanalysis), with method notes | Cleaning decision engine and its tuning |
| Baseline pipeline: IEC 61724 temperature-corrected PR, soiling ratio calculations, data-quality filters | Stow and tracker control logic |
| Kuwait electricity dataset from public sources, documented | Plant-specific calibrations and models |
| Energy systems toolkit: notebooks for PV, BESS and grid studies | Customer data and anything not licensed for release |
| Documentation, tutorials, a methods paper with KISR (if agreed) | Commercial benchmarks against named vendors |

### Licences and permissions

- **Code:** a permissive licence such as Apache-2.0 (includes a patent grant) or MIT; both are OSI-approved.
- **Data:** CC BY 4.0 (attribution) for maximum reuse, or ODbL if you want derived databases to stay open.
- **Upstream terms:** each source has its own licence and attribution rules (AERONET data policy, reanalysis licences, government publications). The open release can only be as open as its most restrictive input.
- **Plant and research data:** nothing from a plant owner, KISR or a pilot is published without written permission; Shagaya data belongs to its owner and the research partners, not to Mizan.
- **Sensitive data:** electricity data (outages, network details) may be sensitive for the state; ask the relevant authority before publishing anything not already public.`,
        },
        { kind: "sources", refs: ["mz12-r19", "mz12-r20", "mz12-r21", "mz12-r26", "mz12-r22"] },
      ],
    },
    {
      layer: "applied",
      title: "Funnel and cost of the open programme",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What the dust and soiling atlas could produce in a year",
          given: md`Illustrative assumptions, not forecasts. Year 1 after release: $N_u$ = 2,000 unique users (downloads plus active web users). Engagement rate (issue, question, sign-up, conversation) $r_1$ = 5 %. Share of engaged users connected to a buyer (owner, EPC, O&M contractor, ministry) $r_2$ = 10 %. Share of those leading to a pilot conversation $r_3$ = 20 %.`,
          steps: [
            { md: md`**Engaged users.** $2{,}000 \times 0.05 = 100$.` },
            { md: md`**Buyer-connected.** $100 \times 0.10 = 10$.` },
            { md: md`**Pilot conversations.** $N_{opp} = 2{,}000 \times 0.05 \times 0.10 \times 0.20 = 2$.` },
            { md: md`**Interpretation.** Two pilot conversations a year from one atlas is small in count but large in quality: they arrive having used Mizan's data, and in Kuwait's small market two conversations can be a meaningful share of the addressable owners.` },
          ],
          result: md`Treat the open programme as a channel with a measurable funnel. Instrument each step (downloads, issues, sign-ups, conversations, origin of each pilot conversation) from the first release.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Is the atlas a cheap channel?",
          given: md`Illustrative. Maintaining the atlas costs 0.2 of an engineer at USD 60,000 per year fully loaded, plus USD 3,000 hosting and USD 5,000 for a conference poster and travel. It yields 2 pilot conversations per year. Outbound sales for comparison cost about USD 25,000 per pilot conversation (founder time, travel, events).`,
          steps: [
            {
              md: md`**Programme cost.** $0.2 \times 60{,}000 + 3{,}000 + 5{,}000 = 12{,}000 + 8{,}000 =$ USD 20,000 per year.`,
              hidden: true,
              check: { prompt: "Annual programme cost (USD)", answer: 20000, tolerance: { abs: 10 } },
            },
            {
              md: md`**Cost per opportunity.** $20{,}000/2 =$ USD 10,000 per pilot conversation.`,
              hidden: true,
              check: { prompt: "Cost per pilot conversation (USD)", answer: 10000, tolerance: { abs: 10 } },
            },
            {
              md: md`**Comparison.** $10{,}000/25{,}000 = 0.4$: 40 % of the outbound cost, before counting citations, recruiting and KISR credibility.`,
              hidden: true,
              check: { prompt: "Ratio to outbound cost", answer: 0.4, tolerance: { abs: 0.01 } },
            },
            { md: md`**Sensitivity.** If engagement halves, cost per opportunity doubles to USD 20,000, still below outbound. The programme fails only if it is not maintained: stale data destroys the credibility it was built for.` },
          ],
          result: md`An open atlas is a cheap and compounding channel if it is maintained. Budget the maintenance explicitly, and stop or archive a tool rather than leave it broken.`,
        },
        {
          kind: "question",
          question: {
            id: "mz12-l05-p1",
            type: "numeric",
            prompt: md`A toolkit has 5,000 users a year, 3 % engage, 15 % of those are buyer-connected and 25 % of those lead to a pilot conversation. How many pilot conversations per year?`,
            answer: 5.625,
            tolerance: { abs: 0.05 },
            unit: "conversations",
            explanation: md`$5{,}000 \times 0.03 \times 0.15 \times 0.25 = 5.625$, about 5 to 6 per year.`,
            concepts: ["mz12.open-research-engine"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running both disciplines",
      blocks: [
        {
          kind: "xref",
          to: "fc05-l03",
          note: "Founder Core covers open source as distribution, docs as marketing and communities of practice in general. This lesson adds the Kuwait research angle and the data-permission problem.",
        },
        {
          kind: "xref",
          to: "fc08-l07",
          note: "Data rights in pilot and customer contracts (Founder Core) decide what Mizan may ever publish from a plant.",
        },
        {
          kind: "md",
          md: md`**Who owns what.** You own the claims rule and the final check of every public file; whoever publishes a file (website, deck, repository, dataset) runs the pre-release checklist and records that they did. Each open tool needs a named maintainer, a release cadence and a response target for issues.

**A pre-release routine.**
1. Mark every claim about a pilot, partner, customer or result with its rung on the evidence ladder; fix any wording above its rung.
2. Check written consent for every third-party name, logo or figure.
3. Export decks to PDF with metadata stripped; check speaker notes, comments and screenshots for plant names, tags and prices.
4. Before making a repository public: search the full history for real plant data, site identifiers, IP addresses, credentials and customer names; fix in a private copy before the first public push.
5. Check dataset metadata for coordinates, site names and single-plant series; confirm every input is licensed for release.
6. Record the check in a release log.

**Working with KISR on open outputs.** Agree before any release which data and results can be published, who is credited, and how KISR's institutional review applies. A joint methods paper and a dataset can be released together, which multiplies both.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- "Our Shagaya pilot" on a slide while the pilot is still in preparation; KISR sees it before you do.
- A partner's logo on the website after one call.
- A repository made public with real SCADA exports in its test folder or its history.
- A deck forwarded by a friendly investor, with speaker notes and prices intact.
- An open dataset that includes plant data nobody licensed for release, damaging the KISR relationship it was meant to strengthen.
- A toolkit released with fanfare and never updated, so the first thing a buyer's engineer finds is a broken notebook.
- Opening the decision engine "for credibility" and leaving nothing to sell.`,
        },
        {
          kind: "checklist",
          title: "Pre-release checklist (any public file)",
          items: [
            "Every pilot, partner, customer or result claim placed on the evidence ladder and worded at or below its rung",
            "Written consent on file for each third-party name, logo or figure",
            "Metadata stripped: document author, internal paths, version history, comments, speaker notes",
            "Screenshots and images free of plant names, SCADA tags, coordinates and prices",
            "Repositories: full history searched for real plant data, site identifiers, credentials and customer names before the first public push",
            "Datasets: every input licensed for release; metadata free of site identifiers unless approved",
            "Closed line respected: no decision-engine code or plant calibrations",
            "Release logged with the name of the person who ran the check",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz12-l05-p2",
            type: "short",
            prompt: md`Write a release plan (one page) for version 0.1 of the Kuwait dust and soiling atlas. Include its contents and sources, licences and permissions, the open-versus-closed line, how it connects to Mizan's sales funnel, how it will be maintained, the wording you will use about the Shagaya pilot and about KISR, and a pre-release claims and data checklist.`,
            explanation: md`The plan must respect upstream licences and data permissions, keep the decision engine closed, measure the funnel, budget maintenance, word every claim at its rung on the evidence ladder, and check files for confidential plant or customer data.`,
            rubric: [
              "Defines contents from public sources with upstream licences respected, and excludes plant or partner data without written permission",
              "Chooses appropriate licences for code and data with reasons",
              "Draws a clear open-versus-closed line that keeps the decision engine and calibrations closed",
              "Connects the release to a measurable funnel (users, engagement, buyer-connected, pilot conversations) with illustrative targets",
              "Describes the Shagaya pilot as targeted or in preparation, uses KISR's name only as consented or by citation, and includes maintenance ownership and a KISR coordination step",
              "Includes a checklist covering claims, consents, metadata, screenshots, repository history and dataset metadata for confidential data",
            ],
            modelAnswer: md`**Atlas v0.1: scope.** Monthly and seasonal maps and site time series for Kuwait of aerosol optical depth and dust indicators from AERONET (Kuwait University site) and global reanalysis products, a dust-event catalogue derived from them, and a documented method note linking these proxies to expected soiling. No plant data. **Sources and permissions.** Each source's data policy and attribution requirements listed in a sources file; derived products only where the upstream licence allows redistribution; anything uncertain excluded from v0.1. Any later layer using plant or KISR data requires written permission from the owner and KISR. **Licences.** Code (processing notebooks) under Apache-2.0 for its patent grant; derived data under CC BY 4.0 for maximum reuse, with upstream attribution retained. **Open versus closed.** Open: data, processing code, the baseline method for temperature-corrected PR and soiling ratio, documentation. Closed: Mizan's cleaning decision engine, stow logic, plant calibrations and customer data. **Claims wording.** "Mizan is preparing a soiling analytics pilot targeting Shagaya Phase I" only if KISR agrees to the mention; otherwise no mention. KISR's work is cited (Al-Rasheedi et al., RSER 133, 2020), with no implied endorsement. No partner names. **Release.** Repository plus a Zenodo record with DOI and citation file; a short launch post by Omar Abu Harb and me; a poster at a regional solar or dust conference; a note to the KISR researchers offering it for their work. **Funnel (illustrative targets for year 1).** 2,000 users; 5 % engaged; 10 % of those buyer-connected; 2 pilot conversations, tracked by asking every new conversation where they found us. **Maintenance.** Named maintainer; quarterly data refresh; issue response within 5 working days; budget 0.2 FTE and USD 8,000 per year (illustrative); archive rather than abandon if the budget is cut. **KISR coordination.** Share the method note before release; agree how any joint paper and future plant-data layer will be credited and released. **Checklist.** (1) Every claim placed on the evidence ladder. (2) Consent on file for every third-party name. (3) Metadata stripped from PDFs and slides. (4) Images free of plant identifiers. (5) Repository history searched for real plant data and credentials in a private copy before the first public push. (6) Dataset metadata reviewed and inputs licensed. (7) Check logged with the name of the person who ran it.`,
            concepts: ["mz12.open-research-engine", "mz12.open-closed-line", "mz12.leak-vectors", "mz12.public-claims-discipline", "mz12.evidence-ladder"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a new hire who will manage Mizan's website and repositories why every public claim is checked against the evidence ladder, and what the pre-release check means for their daily work.",
          keyPoints: [
            "Each claim about a pilot, partner or result sits on one rung, and the rung decides the words; the Shagaya pilot is targeted or in preparation",
            "Third-party names, logos and figures need written consent for each use",
            "Overstated claims cost credibility with KISR, MEWRE and partners in a small market",
            "Confidential plant and customer data leaks through screenshots, metadata, code fixtures, commit history and dataset metadata",
            "Every public release goes through a written checklist and is logged",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz12-l05-q1",
      type: "mcq",
      prompt: md`Which public wording about the Shagaya soiling work is correct today?`,
      options: [
        "Our pilot at Shagaya Phase I",
        "A soiling analytics pilot targeting Shagaya Phase I is in preparation (with consent to mention it)",
        "Validated at Shagaya with KISR",
        "Deployed at Kuwait's flagship solar park",
      ],
      answer: 1,
      explanation: md`The pilot is targeted or in preparation, not signed or running. Higher-rung words would overstate it, and even the mention needs the counterpart's agreement.`,
      concepts: ["mz12.evidence-ladder"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz12-l05-q2",
      type: "multi",
      prompt: md`Which are leak vectors for confidential plant data that a review of slide text alone would miss?`,
      options: [
        "Real SCADA exports in a repository's test fixtures or history",
        "Speaker notes and file metadata in a forwarded deck",
        "Site coordinates in a dataset's DOI metadata",
        "The company's registered trade name",
        "A dashboard screenshot showing plant tag names",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`The trade name identifies Mizan, not a customer. The others are classic places where plant and customer data escape.`,
      concepts: ["mz12.leak-vectors"],
      difficulty: 2,
    },
    {
      id: "mz12-l05-q3",
      type: "mcq",
      prompt: md`Which item belongs on the closed side of Mizan's open-versus-closed line?`,
      options: [
        "The Kuwait dust and soiling atlas",
        "The baseline IEC 61724 temperature-corrected PR pipeline",
        "The cleaning decision engine and plant-specific calibrations",
        "Documentation and tutorials",
      ],
      answer: 2,
      explanation: md`The decision engine and calibrations are the product. Data, baseline method and documentation build trust and adoption.`,
      concepts: ["mz12.open-closed-line"],
      difficulty: 1,
    },
    {
      id: "mz12-l05-q4",
      type: "numeric",
      prompt: md`An open programme costs USD 30,000 per year and produces 3 pilot conversations. What is the cost per opportunity (USD)?`,
      answer: 10000,
      tolerance: { abs: 1 },
      unit: "USD",
      explanation: md`$c_{opp} = C/N_{opp} = 30{,}000/3 = $ USD 10,000.`,
      concepts: ["mz12.open-research-engine"],
      difficulty: 1,
    },
    {
      id: "mz12-l05-q5",
      type: "mcq",
      prompt: md`Which licence pairing fits open code with a patent grant and maximally reusable data with attribution?`,
      options: ["GPL-3.0 for code, CC BY-NC for data", "Apache-2.0 for code, CC BY 4.0 for data", "No licence (public by default)", "CC BY 4.0 for code, MIT for data"],
      answer: 1,
      explanation: md`Apache-2.0 includes an explicit patent grant; CC BY 4.0 allows any reuse with attribution. Publishing without a licence leaves reuse legally unclear; CC licences are not designed for code.`,
      concepts: ["mz12.open-closed-line"],
      difficulty: 2,
    },
    {
      id: "mz12-l05-q6",
      type: "decision",
      prompt: md`The night before an open-source release, the maintainer notices that the private repository's history contains a real SCADA export from a plant used as a test fixture. What do you do?`,
      options: [
        { text: "Release anyway; nobody reads old commits.", score: 0, feedback: "Repository history is public, searchable and archived by third parties within hours." },
        { text: "Postpone; publish from a fresh repository (or a corrected private copy) whose history contains only synthetic fixtures, then run the full checklist.", score: 1, feedback: "Right: history is very hard to clean once public, so fix it before the first public push." },
        { text: "Release and rewrite the public history next week.", score: 0.2, feedback: "Forks and archives keep the original; rewriting later does not undo the leak." },
      ],
      explanation: md`Plant data belongs to its owner, and repositories have a permanent memory. The control point is before the first public push.`,
      concepts: ["mz12.leak-vectors", "mz12.public-claims-discipline"],
      difficulty: 2,
    },
    {
      id: "mz12-l05-q7",
      type: "multi",
      prompt: md`Which conditions must hold before plant data from a pilot is included in an open dataset?`,
      options: [
        "Written permission from the plant owner",
        "Agreement with the research partner on release and credit",
        "The data is more than one year old",
        "Any sensitive operational details removed or approved for release",
      ],
      answer: [0, 1, 3],
      explanation: md`Age does not grant rights. Ownership, partner agreement and sensitivity decide.`,
      concepts: ["mz12.open-closed-line"],
      difficulty: 2,
    },
    {
      id: "mz12-l05-q8",
      type: "mcq",
      prompt: md`After one positive call, may Mizan show an analytics vendor's logo on its website as a partner?`,
      options: [
        "Yes, if the call went well",
        "No: a name or logo needs written consent for that specific use, and a discussion is not a partnership",
        "Yes, if the vendor's logo is publicly available",
        "Only in Arabic materials",
      ],
      answer: 1,
      explanation: md`"Discussed" is the lowest rung; it allows no partner wording or logos. Consent to talk is not consent to be named.`,
      concepts: ["mz12.public-claims-discipline", "mz12.evidence-ladder"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz12-l05-f1", front: "Evidence ladder", back: "Discussed, targeted or in preparation, signed, running, results measured, validated or published. Words never above the rung.", concepts: ["mz12.evidence-ladder"] },
    { id: "mz12-l05-f2", front: "Mizan's current claims", back: "Shagaya soiling pilot: targeted or in preparation. SwishOS: discussed. Everything else: illustrative.", concepts: ["mz12.evidence-ladder"] },
    { id: "mz12-l05-f3", front: "Using others' names", back: "Written consent per use for names, logos and figures; citing a published paper is fine, implying endorsement is not.", concepts: ["mz12.public-claims-discipline"] },
    { id: "mz12-l05-f4", front: "Leak vectors for plant data", back: "Screenshots, metadata and notes, code fixtures and commit history, dataset metadata, forwarded decks, unapproved tools.", concepts: ["mz12.leak-vectors"] },
    { id: "mz12-l05-f5", front: "Mizan's three open tools (planned)", back: "Kuwait dust and soiling atlas, Kuwait electricity dataset, Kuwait energy systems toolkit.", concepts: ["mz12.open-research-engine"] },
    { id: "mz12-l05-f6", front: "Open vs closed", back: "Open: data, baseline method, toolkits, docs. Closed: decision engine, stow logic, calibrations, customer data.", concepts: ["mz12.open-closed-line"] },
    { id: "mz12-l05-f7", front: "Open funnel", back: md`$N_{opp} = N_u r_1 r_2 r_3$; cost per opportunity $= C/N_{opp}$.`, concepts: ["mz12.open-research-engine"] },
  ],
};

export default lesson;
