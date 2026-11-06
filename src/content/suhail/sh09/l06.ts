import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh09-l06",
  title: "Datasets: sourcing Arabic data, rights and consent, dialect coverage, filtering and datasheets",
  summary:
    "Unique, clean, licensed Arabic text is the scarcest input in Arabic AI, and the one a community can actually produce. This lesson covers where Arabic training and evaluation data comes from, the rights and consent questions that decide whether you can use and release it, how to balance dialects in a mix without memorising small sources, how quality filters work and where they fail on Arabic, and how to document a dataset so others can trust it.",
  minutes: 80,
  objectives: [
    "Map the main sources of Arabic data and their known sizes and limitations",
    "Assess a source's licence, terms and personal-data status, and design a consent process for contributed data",
    "Compute a temperature-sampled dialect mix and the epochs it implies, and choose a defensible setting",
    "Explain heuristic and model-based quality filters and how they can erase dialect text",
    "Write a datasheet for a Suhail dataset",
  ],
  concepts: [
    { id: "sh09.arabic-data-sources", name: "Arabic data sources", description: "Web crawls and their cleaned derivatives (ArabicWeb24, 101 Billion Arabic Words, CulturaX Arabic, AraMix), Wikipedia, news, books, government text, social media, transcribed speech and community-contributed text. Each has different size, quality, dialect coverage and rights.", competency: "sh-research", related: ["sh09.data-pipeline"] },
    { id: "sh09.data-rights", name: "Data rights and licensing", description: "Whether you may collect, train on and redistribute data depends on copyright and licence terms (CC BY, BY-SA, NC), site terms, text-and-data-mining rules (EU opt-out) and personal-data law. Training use and redistribution are separate questions.", competency: "sh-research", related: ["sh09.data-consent"] },
    { id: "sh09.data-consent", name: "Informed consent for contributed data", description: "When people contribute text, speech or labels, a consent record states the purpose, licence, whether it may be used for commercial models, withdrawal, compensation and what personal data is kept.", competency: "sh-research", related: ["sh09.data-rights"] },
    { id: "sh09.dialect-mix", name: "Dialect coverage and mixing", description: "Arabic varieties differ by orders of magnitude in available data. Temperature sampling up-weights small varieties but repeats them; past a few epochs repetition turns into memorisation, so collection, not sampling, closes the gap.", competency: "sh-research", related: ["sh09.data-constrained"] },
    { id: "sh09.quality-filtering", name: "Quality filtering", description: "Heuristic rules (length, symbol ratio, repetition, function-word presence) and model-based classifiers that keep well-formed or educational text. Tuned on formal text, they systematically remove dialect and informal registers.", competency: "sh-research", related: ["sh09.data-pipeline", "sh09.dialect-mix"] },
    { id: "sh09.datasheets", name: "Datasheets and data statements", description: "Structured documentation of a dataset: motivation, composition, collection process, preprocessing, uses, distribution and maintenance (Gebru et al.), plus speaker and variety details for language data (Bender and Friedman).", competency: "sh-research", related: ["sh09.data-consent"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Where Arabic data comes from and what you may do with it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Lesson 3 showed that Arabic models hit a data wall before a compute wall. Suhail's hackathons, events and members across the Gulf, Egypt and the Levant are a channel for exactly the data that is missing: consented, dialect-rich, culturally grounded text and labels. That is also where the legal and ethical risk sits. A dataset built without clear rights cannot be released, and a dataset released with someone's personal messages in it can end the community's trust. You will sign off on both.`,
        },
        {
          kind: "md",
          md: md`### Sources

| Source | Size (as published or measured) | Strengths | Limits |
|---|---|---|---|
| **ArabicWeb24** (LightOn) | About 28 B tokens after cleaning and dedup (card header says 39 B+) | Modern, filtered web | Mostly MSA; web licences vary |
| **101 Billion Arabic Words** (2024) | 101 B words from Common Crawl; AraMix re-measured 49.9 B tokens raw, 7.7 B after sentence dedup | Large raw pool | Very heavy duplication |
| **CulturaX** (Arabic part) | AraMix measured 87.4 B tokens raw, 38.4 B after dedup | Multilingual pipeline | Overlaps the others |
| **AraMix** (Dec 2025) | Recombined, refiltered, deduplicated mix of the above | Dedup across sources | Inherits their rights questions |
| **Jais 2 pretraining** | About 600 B Arabic tokens | Scale | Not released |
| **Wikipedia** (Arabic, Egyptian Arabic) | Modest | Clear licence (CC BY-SA) | Egyptian Arabic Wikipedia contains large numbers of template-generated stub articles; filter them |
| **News, books, government publications** | Varies | High quality, formal | Copyright held by publishers; needs agreements |
| **Social media and forums** | Large | Dialect-rich | Personal data, platform terms, toxicity |
| **Transcribed speech** (podcasts, broadcasts) | Small | Spoken dialect | Rights in recordings and voices; transcription cost |
| **Community contributions** | Whatever you collect | Dialect, culture, consent built in | Slow, needs incentives and review |

Two facts follow. First, the public web pool is **tens of billions of unique tokens**, mostly MSA, and the big corpora overlap. Second, dialects, speech and culturally specific content are under-represented in all of them.

### Rights: three separate questions

1. **May we collect it?** Site terms of service, robots.txt and rate limits; for the EU, the text-and-data-mining exception (DSM Directive Art. 4) applies unless the rightsholder has reserved rights in a machine-readable way.
2. **May we train on it?** Depends on jurisdiction and is contested in courts for copyrighted works. The EU AI Act requires providers of general-purpose AI models to keep a copyright policy that respects those reservations and to publish a summary of training content (obligations applying from 2 August 2025).
3. **May we redistribute it?** Separate from training. CC BY requires attribution; CC BY-SA requires the same licence on adaptations (whether a dataset compilation or a model is an adaptation is debated); **NC** licences forbid commercial use, so NC data cannot go into a dataset you release for commercial models. When in doubt, release **code and document identifiers** rather than text.

### Personal data

Social posts, forum messages and voice recordings are personal data when a person can be identified. Saudi Arabia's Personal Data Protection Law (in force since September 2023), the UAE's Federal Decree-Law 45 of 2021 and the EU GDPR all require a lawful basis and impose duties on cross-border transfer; requirements differ and change, so take legal advice before collecting in a new country. Pipelines remove obvious identifiers (emails, phone numbers, national ID patterns, account handles), but removal of names in free text is imperfect.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check before relying on",
          md: md`Data protection rules in Kuwait and other Gulf states, and the current implementing regulations of the Saudi PDPL, were not verified for this module. Treat this lesson as the questions to ask, not legal advice, and confirm with counsel in each country where Suhail collects data.`,
        },
        {
          kind: "md",
          md: md`### Consent for contributed data

When Suhail members contribute dialect sentences, voice notes or labels, the consent record should state: purpose (open datasets for research and model building, including commercial models, or not); licence (CC BY 4.0 or CC0); whether contributors are credited by name; what metadata is kept (country, dialect, age band, gender, all optional); how to withdraw and what withdrawal can and cannot undo (models already trained cannot forget); compensation or credit; and an age minimum. Never collect other people's private messages; contributors write or record their own.

### Dialect coverage and mixing

Available text per variety differs by orders of magnitude. Multilingual training uses **temperature (exponent) sampling** to up-weight small sources:`,
        },
        { kind: "equation", formula: "sh09-temperature-sampling" },
        { kind: "equation", formula: "sh09-epochs" },
        {
          kind: "chart",
          chart: "bar",
          title: "Share of the mix by variety under exponent sampling (illustrative corpus sizes)",
          xKey: "variety",
          yLabel: "Share of training mix (%)",
          series: [
            { key: "a10", label: "α = 1.0 (proportional)" },
            { key: "a05", label: "α = 0.5" },
            { key: "a03", label: "α = 0.3" },
          ],
          data: [
            { variety: "MSA (900 M)", a10: 90.0, a05: 62.6, a03: 44.7 },
            { variety: "Egyptian (60 M)", a10: 6.0, a05: 16.2, a03: 19.8 },
            { variety: "Gulf (25 M)", a10: 2.5, a05: 10.4, a03: 15.2 },
            { variety: "Levantine (12 M)", a10: 1.2, a05: 7.2, a03: 12.2 },
            { variety: "Maghrebi (3 M)", a10: 0.3, a05: 3.6, a03: 8.1 },
          ],
          caption: "Corpus sizes in million tokens are illustrative. Lower α flattens the mix, but the small varieties are then repeated many times (see the worked example).",
        },
        {
          kind: "md",
          md: md`### Quality filtering

**Heuristic filters** (popularised by Gopher's MassiveText rules): keep documents within a word-count range (for example 50 to 100,000 words), mean word length in a plausible range, low symbol-to-word ratio, few lines that are bullets or end in ellipses, a high share of words containing letters, and presence of common function words (for Arabic: في، من، على، أن، إلى). **Repetition filters** remove documents with many duplicated lines or n-grams. **Model-based filters** train a classifier (often on labels from a strong LLM) to score educational or well-formed text and keep the top share.

Where this fails on Arabic: dialect text uses different function words (Egyptian مش and ده, Gulf شنو and وايد), short lines and informal spelling, so MSA-tuned heuristics and classifiers score it as low quality and drop it. A filter that improves MSA benchmarks can silently delete most dialect data. Measure the **retention rate per variety** at each filter step.

### Documentation

**Datasheets for datasets** (Gebru et al.) answer seven groups of questions: motivation, composition, collection process, preprocessing and cleaning, uses, distribution, maintenance. **Data statements** (Bender and Friedman) add what language data especially needs: language variety, speaker demographics, annotator demographics, speech situation, text characteristics, curation rationale. Model cards (Mitchell et al.) do the same for models. On Hugging Face these become the dataset or model card.`,
        },
        {
          kind: "matrix",
          title: "Which data to pursue",
          xAxis: ["Rights unclear", "Rights clear"],
          yAxis: ["Low value for Arabic models", "High value for Arabic models"],
          cells: [
            { label: "Tempting traps", detail: "Scraped dialect social media, copyrighted books, private group chats. High value, but cannot be released and may harm people. Do not collect." },
            { label: "Suhail's core", detail: "Consented dialect contributions, licensed partner archives (publishers, broadcasters, universities), native benchmark items. Invest here." },
            { label: "Ignore", detail: "Low-value pages with unclear terms." },
            { label: "Fill-in", detail: "Openly licensed but already widely used (Wikipedia, existing corpora). Useful for mixing and baselines, not a contribution." },
          ],
          caption: "Top row is high value; right column is clear rights.",
        },
        { kind: "sources", refs: ["sh09-r35", "sh09-r36", "sh09-r37", "sh09-r41", "sh09-r5", "sh09-r17", "sh09-r38", "sh09-r39", "sh09-r40", "sh09-r46", "sh09-r47", "sh09-r48"] },
      ],
    },
    {
      layer: "applied",
      title: "Mixing dialects and budgeting annotation",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Choosing an exponent for a dialect-aware fine-tuning mix",
          given: md`A continued-pretraining experiment will use **1,000 M tokens** of Arabic. Available (deduplicated, licensed) tokens, illustrative: MSA 900 M, Egyptian 60 M, Gulf 25 M, Levantine 12 M, Maghrebi 3 M. Keep repetition at or below about 4 epochs (Muennighoff et al.).`,
          steps: [
            { md: md`**α = 1** (proportional): Gulf gets 2.5 % (25 M tokens, 1 epoch), Maghrebi 0.3 %. Dialects barely register.` },
            { md: md`**α = 0.5**: weights $\sqrt{n_i}$: 30.0, 7.75, 5.00, 3.46, 1.73; sum 47.94. Shares 62.6 %, 16.2 %, 10.4 %, 7.2 %, 3.6 %. Tokens: Gulf 104 M (4.2 epochs), Levantine 72 M (6.0 epochs), Maghrebi 36 M (12.0 epochs).` },
            { md: md`**α = 0.3**: Maghrebi gets 8.1 % = 81 M tokens from a 3 M corpus, **27 epochs**: the model will memorise those 3 M tokens, not learn Maghrebi.` },
            { md: md`**Practical rule**: use α = 0.5 but cap each variety at 4 epochs (Levantine 48 M, Maghrebi 12 M), and give the freed tokens back to MSA and Egyptian.` },
          ],
          result: md`Sampling can rebalance what you have, not create what you lack. With a 4-epoch cap, Maghrebi is at most 12 M tokens (1.2 %) of this run whatever α you pick. The only fix is more Maghrebi data, which is a collection project for the community.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Annotation budget for a dialect identification set",
          given: md`Suhail wants 5,000 sentences labelled with dialect (country level) by **2 annotators each**. Pilot speed: **60 items per hour**. The pilot showed **15 %** disagreement; a third annotator adjudicates those at the same speed. Illustrative pay **USD 10 per hour** (or count it as volunteer hours).`,
          steps: [
            {
              md: md`Labelling: $5{,}000 \times 2 / 60 = 166.7$ hours.`,
              hidden: true,
              check: { prompt: "Labelling hours", answer: 166.7, unit: "h", tolerance: { abs: 0.5 } },
            },
            { md: md`Adjudication: $0.15 \times 5{,}000 / 60 = 12.5$ hours.` },
            {
              md: md`Total $179.2$ hours, about USD 1,790 at USD 10 per hour.`,
              hidden: true,
              check: { prompt: "Total cost (USD)", answer: 1792, unit: "USD", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`About 180 hours: one weekend datathon of 30 volunteers working 6 hours each. Add review by a coordinator, and measure inter-annotator kappa on the overlap (Lesson 5) before publishing.`,
        },
        {
          kind: "question",
          question: {
            id: "sh09-l06-p1",
            type: "numeric",
            prompt: md`With α = 0.5 and a 1,000 M-token budget, a variety with 25 M available tokens gets a 10.43 % share. How many epochs is that?`,
            answer: 4.17,
            tolerance: { abs: 0.03 },
            unit: "epochs",
            explanation: md`$e = 0.1043 \times 1{,}000 / 25 = 4.17$ epochs: just above the about-4 limit.`,
            concepts: ["sh09.dialect-mix"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running a data project",
      blocks: [
        {
          kind: "md",
          md: md`### How data projects are run

- **Collection channels**: hackathon side-tracks ("write 50 sentences in your dialect"), datathons, partner archives (publishers, broadcasters, universities, ministries) under written agreements, and paid annotation for specialised work. A contribution app with consent built into the first screen.
- **Pipeline**: the same stages as Lesson 1, with per-variety retention measured at every step, and a decontamination pass against the benchmarks you will report.
- **Quality control**: gold items mixed into annotation queues, inter-annotator agreement, spot checks by native reviewers from a different country than the writer.
- **Release**: Hugging Face dataset with a datasheet, licence, version number, changelog and a contact for takedown requests.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Data project failures",
          md: md`- **Scrape now, check rights later**: the dataset can never be released.
- **NC data mixed into an open release**, contaminating the whole licence.
- **Consent that says "research only"** when partners want to train commercial models.
- **No per-variety retention tracking**: filters silently delete the dialects you set out to collect.
- **One dialect over-represented** because most volunteers come from one city.
- **Personal data in "anonymised" text**: names, places and phone numbers inside free text.`,
        },
        {
          kind: "checklist",
          title: "Dataset release sign-off",
          items: [
            "Every source has a recorded licence or agreement, and redistribution is permitted",
            "Contributors gave informed consent covering the release licence and commercial use (if allowed)",
            "Personal data removed and a sample of 200 records manually checked",
            "Per-variety counts and retention through each filter reported",
            "Decontaminated against named benchmarks; overlap counts reported",
            "Datasheet complete (motivation, composition, collection, preprocessing, uses, distribution, maintenance, varieties and contributor demographics)",
            "Takedown contact and versioning in place",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh09-l06-p2",
            type: "short",
            prompt: md`Draft the **datasheet** (condensed, one to two pages) for "Suhail Lahajat v1": 20,000 sentences contributed by members across the Arab world with dialect labels, to be released openly. Cover motivation, composition (with how you will report variety balance), collection and consent, preprocessing, recommended and discouraged uses, distribution and licence, and maintenance. Mark planned numbers as targets.`,
            rubric: [
              "Follows the datasheet structure (motivation, composition, collection, preprocessing, uses, distribution, maintenance)",
              "Reports composition per variety and contributor demographics as optional, aggregated metadata; marks numbers as targets",
              "Describes informed consent that matches the licence (for example CC BY 4.0, commercial use allowed) and a withdrawal process with its limits",
              "Describes PII handling and manual checks, and decontamination if the data may be used near benchmarks",
              "States discouraged uses (for example identifying individuals, dialect-based profiling) and known limitations (self-reported dialect, urban skew)",
              "Names maintenance: versioning, takedown contact, update cadence",
            ],
            modelAnswer: md`**Datasheet: Suhail Lahajat v1 (draft; numbers are targets)**

**Motivation**: Arabic dialects are under-represented in open training and evaluation data. Lahajat provides consented, labelled dialect sentences for dialect identification, evaluation and fine-tuning. Created by Suhail's research arm with volunteer contributors; funded by [sponsor, if any, named].

**Composition**: target 20,000 sentences, each with a self-reported country and city-level dialect label, a register tag (casual, work, formal), and an optional topic. Target at least 1,000 sentences for each of 12 country varieties; actual counts per variety published in a table with each release. Optional contributor metadata (age band, gender), reported only in aggregate. No audio in v1.

**Collection and consent**: contributors write their own sentences (no copying of messages from others) through a web form at Suhail events and online. The first screen explains the purpose, the CC BY 4.0 licence including commercial model training, optional name credit, and withdrawal: a contributor can ask for removal from future versions; models already trained on earlier versions cannot be changed. Contributors must be 18 or older. No payment; contributors with more than 200 accepted sentences are credited by name if they opt in.

**Preprocessing**: Unicode normalisation (NFC), no diacritic stripping (raw text kept), automatic removal of emails, phone numbers and handles, manual review of 5 % of sentences for remaining personal data, removal of exact and near duplicates (MinHash, Jaccard 0.8), second-speaker validation of the dialect label on a 10 % sample with kappa reported.

**Uses**: recommended for dialect identification, tokenizer studies, evaluation and fine-tuning. Discouraged: identifying or profiling individuals, inferring nationality of people from their writing for decisions about them. Limitations: labels are self-reported; contributors skew urban and young; small varieties have few sentences.

**Distribution**: Hugging Face, CC BY 4.0, versioned (v1.0), with this datasheet and a citation.

**Maintenance**: Suhail research lead; takedown and correction requests to a named address, handled within 30 days; new version at most twice a year with a changelog.`,
            explanation: md`A datasheet is only credible when consent, licence and the stated uses match, and composition is reported per variety rather than as one total.`,
            concepts: ["sh09.datasheets", "sh09.data-consent", "sh09.data-rights", "sh09.dialect-mix"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a hackathon participant why Suhail asks them to sign a consent form before contributing ten sentences in their dialect, and what happens to those sentences.",
          keyPoints: [
            "The sentences will be published openly so anyone can build better Arabic models",
            "The licence says what others may do with them, including commercial models if that is the choice",
            "They can withdraw from future versions, but models already trained cannot forget",
            "Personal details are optional and only reported in aggregate; no one else's messages are allowed",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh09-l06-q1",
      type: "multi",
      prompt: "Which questions must be answered separately before releasing a dataset built from web text?",
      options: [
        "May we collect it (terms, robots.txt, TDM opt-outs)?",
        "May we train on it?",
        "May we redistribute the text?",
        "Is the text in Arabic script?",
        "Does it contain personal data?",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Collection, training and redistribution are different rights questions; personal data adds a fourth. Script is a technical property.`,
      concepts: ["sh09.data-rights"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh09-l06-q2",
      type: "numeric",
      prompt: md`Two varieties have 400 M and 4 M tokens. With exponent sampling at α = 0.5, what share (%) does the small one get?`,
      answer: 9.09,
      tolerance: { abs: 0.05 },
      unit: "%",
      explanation: md`$\sqrt{400} = 20$, $\sqrt{4} = 2$; $2/22 = 9.09$ %. Proportional sampling would give 0.99 %.`,
      concepts: ["sh09.dialect-mix"],
      difficulty: 2,
    },
    {
      id: "sh09-l06-q3",
      type: "mcq",
      prompt: "A filter tuned on MSA news removes 70 % of Gulf social text but only 20 % of MSA. What does this most likely indicate?",
      options: [
        "Gulf text is objectively low quality",
        "The filter's features (function words, line structure, formal spelling) encode MSA style and penalise dialect",
        "The tokenizer is broken",
        "The dedup threshold is too low",
      ],
      answer: 1,
      explanation: md`Measure retention per variety and adapt the filter (dialect function words, a classifier trained with dialect positives).`,
      concepts: ["sh09.quality-filtering"],
      difficulty: 2,
    },
    {
      id: "sh09-l06-q4",
      type: "mcq",
      prompt: "A partner offers a high-quality corpus under CC BY-NC. Suhail wants to release a combined dataset that companies can use to train commercial models. What is the right handling?",
      options: [
        "Mix it in; attribution is enough",
        "Keep it out of the commercial-use release; use it only in a separate non-commercial release or for internal evaluation if the licence allows",
        "Remove the NC label",
        "Translate it to avoid the licence",
      ],
      answer: 1,
      explanation: md`NC forbids commercial use; mixing it in would make the whole release non-compliant for commercial users. Translation is an adaptation and keeps the licence.`,
      concepts: ["sh09.data-rights"],
      difficulty: 2,
    },
    {
      id: "sh09-l06-q5",
      type: "order",
      prompt: "Order the steps of a contributed-dialect data project.",
      items: ["Write consent and licence terms", "Collect contributions through a consent-first form", "Remove personal data and duplicates, validate labels", "Write the datasheet", "Release with versioning and a takedown contact"],
      explanation: md`Rights first, then collection, then cleaning and validation, then documentation, then release and maintenance.`,
      concepts: ["sh09.data-consent", "sh09.datasheets"],
      difficulty: 1,
    },
    {
      id: "sh09-l06-q6",
      type: "decision",
      prompt: "A volunteer has scraped 2 M public posts from a social platform in Gulf dialect and wants to publish them as \"Suhail Gulf Corpus\". What do you decide?",
      options: [
        { text: "Do not publish the text. Check platform terms and personal-data law; consider releasing only aggregate statistics or using the data internally if lawful, and launch a consented collection instead", score: 1, feedback: "Right: redistribution of personal posts is the highest-risk use, and consented data is the durable asset." },
        { text: "Publish after removing usernames", score: 0.2, feedback: "Posts still contain names, places and identifiable details; terms may forbid redistribution." },
        { text: "Publish under CC BY 4.0", score: 0, feedback: "You cannot license what you do not own." },
        { text: "Publish but only to researchers who ask", score: 0.4, feedback: "Better, but still redistribution of personal data without a lawful basis or consent." },
      ],
      explanation: md`Collection, training and redistribution are different questions; personal posts fail the redistribution question in most jurisdictions.`,
      concepts: ["sh09.data-rights", "sh09.data-consent"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh09-l06-f1", front: "Public Arabic web pool after dedup", back: "Tens of billions of unique tokens, mostly MSA, with heavy overlap between corpora (ArabicWeb24, CulturaX Arabic, 101B Words, AraMix).", concepts: ["sh09.arabic-data-sources"] },
    { id: "sh09-l06-f2", front: "Three rights questions", back: "May we collect it? May we train on it? May we redistribute it? Plus: does it contain personal data?", concepts: ["sh09.data-rights"] },
    { id: "sh09-l06-f3", front: "Exponent sampling", back: md`$q_i = n_i^{\alpha}/\sum n_j^{\alpha}$; then check epochs $e_i = q_i D/n_i$ (keep at or below about 4).`, concepts: ["sh09.dialect-mix"] },
    { id: "sh09-l06-f4", front: "Why filters erase dialects", back: "Heuristics and classifiers tuned on MSA treat dialect function words, informal spelling and short lines as low quality. Track retention per variety.", concepts: ["sh09.quality-filtering"] },
    { id: "sh09-l06-f5", front: "Datasheet sections", back: "Motivation, composition, collection process, preprocessing, uses, distribution, maintenance.", concepts: ["sh09.datasheets"] },
    { id: "sh09-l06-f6", front: "Consent must cover", back: "Purpose, licence (commercial or not), credit, metadata kept, withdrawal and its limits, compensation, age minimum.", concepts: ["sh09.data-consent"] },
  ],
};

export default lesson;
