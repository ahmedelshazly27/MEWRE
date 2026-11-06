import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh09-l05",
  title: "Evaluation: Arabic benchmarks, contamination, LLM judges and error bars",
  summary:
    "A benchmark is a measurement instrument: it has validity, a scoring rule and a margin of error. This lesson covers how benchmarks are designed and scored, the Arabic benchmark landscape (OALL v2, ArabicMMLU, BALSAM, ABBL), how contamination inflates scores and how to detect it (n-gram overlap, canaries, private held-out sets), the biases of LLM-as-judge evaluation, and the statistics that decide whether a 2-point gap between two models means anything.",
  minutes: 85,
  objectives: [
    "Explain construct validity, scoring formats (log-likelihood versus generation) and why translated benchmarks mislead",
    "Describe the main Arabic benchmarks and leaderboards and what each measures",
    "Detect and estimate contamination with n-gram overlap, canary strings and clean-subset comparisons",
    "List the main LLM-as-judge biases and validate a judge with Cohen's kappa",
    "Compute the standard error of an accuracy and of a paired difference, and the items needed to detect a given gap",
  ],
  concepts: [
    { id: "sh09.benchmark-design", name: "Benchmark design and validity", description: "A benchmark measures a construct (Arabic reading comprehension, Gulf cultural knowledge) through items, a prompt format and a scoring rule. Validity fails when items are translated, ambiguous, culturally foreign or answerable from surface cues.", competency: "sh-research", related: ["sh09.arabic-benchmarks"] },
    { id: "sh09.arabic-benchmarks", name: "Arabic benchmark landscape", description: "OALL v2 (native tasks such as ArabicMMLU, ALRAGE, AraTrust, MadinahQA, Belebele), ArabicMMLU (about 14.5K native exam questions), BALSAM (78 tasks, blind test sets), SILMA's ABBL (contamination checks).", competency: "sh-research", related: ["sh09.benchmark-design", "sh09.contamination"] },
    { id: "sh09.contamination", name: "Benchmark contamination", description: "Test items (or their translations or paraphrases) present in training data, inflating scores through memorisation. Detected with n-gram overlap, canary strings, perplexity probes and comparison with private held-out sets.", competency: "sh-research", related: ["sh09.data-pipeline"] },
    { id: "sh09.llm-judge", name: "LLM-as-judge", description: "Using a strong model to grade or compare open-ended answers. Cheap and scalable, but biased toward the first-shown answer, longer answers and its own style, and unreliable in dialects it handles poorly; must be validated against native-speaker labels.", competency: "sh-research", related: ["sh09.benchmark-design"] },
    { id: "sh09.eval-statistics", name: "Standard error of benchmark scores", description: "An accuracy on n independent items has standard error sqrt(p(1-p)/n). A 95 % interval is about plus or minus 1.96 SE. Differences between models must be judged against the SE of the difference, ideally paired.", competency: "sh-research", related: ["sh09.paired-comparison"] },
    { id: "sh09.paired-comparison", name: "Paired comparison of models", description: "When two models answer the same items, the difference is estimated from discordant items only (one right, one wrong), giving a smaller standard error than comparing two independent accuracies (McNemar's test).", competency: "sh-research", related: ["sh09.eval-statistics"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Benchmarks as measurement instruments",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Evaluation is where a small, volunteer-heavy research arm can matter most. Building a good Arabic benchmark needs native speakers from many countries, careful design and honest statistics, not GPUs, and a trusted benchmark shapes what every lab in the region optimises. It is also where you will be asked to judge claims on stage and in sponsor meetings: "we beat model X by 2 points" is either a result or noise, and you should be able to tell which in a minute.`,
        },
        {
          kind: "md",
          md: md`### Design

A benchmark has four parts, and each can break:

1. **Construct**: what ability you claim to measure (MSA reading comprehension, knowledge of Gulf civics, safe refusal in Egyptian dialect). Write it down first.
2. **Items**: questions with gold answers. Native items written by speakers from the target context have **validity** that translated items lack: translated benchmarks test translation artefacts and foreign cultural knowledge (a question about US Thanksgiving is not Arabic understanding). OALL v2 dropped its machine-translated tasks for this reason and kept native ones plus a human-translated MMLU.
3. **Format and prompt**: zero-shot or few-shot, system prompt, chat template, answer extraction. Small changes move scores by several points, so the format is part of the benchmark and must be fixed and published.
4. **Scoring**: for multiple choice either **log-likelihood** (which option the model assigns highest probability; normalised by length or not) or **generation** (the model writes an answer that is parsed). They can rank models differently. For open-ended answers: exact match, F1, or a judge (human or LLM).

### The Arabic landscape (late 2026)

| Benchmark or leaderboard | What it is | Notes |
|---|---|---|
| **OALL v2** (Open Arabic LLM Leaderboard, Hugging Face) | Leaderboard over native tasks: ArabicMMLU, ALRAGE (retrieval-augmented generation), AraTrust, MadinahQA, Belebele (MSA and dialects), EXAMS, AlGhafa, human-translated MMLU-HT | Machine-translated tasks removed in v2. Public test sets, so open to gaming |
| **ArabicMMLU** (Koto et al. 2024) | About 14.5K native multiple-choice questions from school exams across Arab countries | Native and multi-country; still public |
| **BALSAM** (SDAIA, KSGAAL and partners, 2025) | 78 tasks in 14 categories, 52K examples (37K test, 15K dev) | **Blind test sets** to limit contamination; hosted at benchmarks.ksaa.gov.sa |
| **ABBL** (SILMA.AI) | Arabic leaderboard with contamination detection | Self-run by a model vendor |

Vendor claims built on these, such as TII's statement that Falcon-H1 Arabic ranks first on OALL per size with the 7B at about 71.5 to 71.7, are claims until reproduced. The October 2025 survey "Evaluating Arabic LLMs" lists contamination as an open problem across the field. Gaps that remain: dialect-specific generation (not just multiple choice), Gulf and Maghrebi cultural knowledge, speech, and builder-relevant tasks (code explanation in Arabic, technical writing).

### Contamination

If test items are in the training data, the model can recall rather than reason. Sources: benchmarks published on the web and crawled; SFT sets assembled from benchmark training splits that overlap test splits; and **translations**. A NeurIPS 2026 paper found that exposure to a translated MMLU raised accuracy by 2.8 to 11.3 points, so an Arabic model can be contaminated by English test sets and vice versa.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Sources for the newest claims",
          md: md`The NeurIPS 2026 translation-contamination result and the Falcon-H1 Arabic ranking come from search snippets in the research brief (November 2026) and vendor releases; the original papers and leaderboard pages should be read before Suhail quotes the exact figures.`,
        },
        {
          kind: "md",
          md: md`Detection methods:

- **n-gram overlap**: index the training corpus, slide an $n$-token window over each test item and look it up. GPT-3 used 13-grams; a 40-token item has $40 - 13 + 1 = 28$ of them. Flag items above a threshold, then compare accuracy on flagged and clean subsets. Misses paraphrases and translations.
- **Canary strings**: a unique random string (BIG-bench publishes one) embedded in benchmark files; if a model can complete it, it saw the files. Only works if crawlers kept the string and labs check.
- **Perplexity probes**: test items that are much more likely under the model than comparable fresh items suggest memorisation (min-k % probability and similar methods). Indicative, not proof.
- **Private held-out sets**: the strongest defence. Keep test items unpublished, rotate them, and score submissions on a server (BALSAM's blind sets). Publish a small dev set for format only.`,
        },
        { kind: "equation", formula: "sh09-ngram-count" },
        {
          kind: "md",
          md: md`### LLM-as-judge

For open-ended answers, a strong model compares two responses or grades one against a rubric. Known biases (Zheng et al. 2023 and later work):

- **Position bias**: prefers the answer shown first (or second). Fix: judge both orders, count a win only if consistent.
- **Verbosity bias**: prefers longer answers. Fix: length-controlled comparison, rubric that penalises padding.
- **Self-preference**: prefers outputs in its own style or from its own model family.
- **Language competence**: a judge that is weak in Gulf or Maghrebi dialect grades fluency it cannot read. In Arabic this is the most serious problem.

Validate any judge against native-speaker labels on a sample with **Cohen's kappa**:`,
        },
        { kind: "equation", formula: "sh09-cohen-kappa" },
        {
          kind: "md",
          md: md`### Error bars

An accuracy measured on $n$ items is an estimate with sampling error:`,
        },
        { kind: "equation", formula: "sh09-accuracy-se" },
        { kind: "equation", formula: "sh09-paired-se" },
        { kind: "equation", formula: "sh09-sample-size" },
        {
          kind: "chart",
          chart: "line",
          title: "95 % confidence half-width of an accuracy near 70 %",
          xKey: "n",
          xLabel: "Benchmark items (independent)",
          yLabel: "Plus or minus, percentage points",
          series: [{ key: "ci", label: "95 % half-width (pp)" }],
          data: [
            { n: 100, ci: 8.98 },
            { n: 250, ci: 5.68 },
            { n: 500, ci: 4.02 },
            { n: 1000, ci: 2.84 },
            { n: 2500, ci: 1.8 },
            { n: 5000, ci: 1.27 },
            { n: 14500, ci: 0.75 },
          ],
          caption: "1.96 × sqrt(0.7 × 0.3 / n) × 100. Halving the error bar needs four times the items. A 500-item benchmark cannot separate models closer than about 4 points on a single score, and the gap between two models has a larger error still unless the comparison is paired.",
        },
        { kind: "sources", refs: ["sh09-r25", "sh09-r26", "sh09-r27", "sh09-r28", "sh09-r29", "sh09-r30", "sh09-r31", "sh09-r32", "sh09-r33", "sh09-r34", "sh09-r42"] },
      ],
    },
    {
      layer: "applied",
      title: "Is the gap real?",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Error bars on two benchmarks",
          given: md`Model A scores **62 %** on ArabicMMLU (about 14,500 items) and **70 %** on a new 500-item Gulf dialect benchmark. Model B scores 70 % on the same 500 items too, and on another run 72 %. (Illustrative.)`,
          steps: [
            { md: md`**ArabicMMLU**: $\mathrm{SE} = \sqrt{0.62 \times 0.38 / 14{,}500} = 0.0040$; 95 % CI $\pm 0.79$ pp. Differences of 2 points on the full set are well outside noise (if items were independent; questions grouped by subject make the true SE somewhat larger).` },
            { md: md`**500-item set**: $\mathrm{SE} = \sqrt{0.70 \times 0.30/500} = 0.0205$; 95 % CI $\pm 4.0$ pp. The model's true accuracy is anywhere from about 66 to 74 %.` },
            { md: md`**Unpaired gap** between two models near 70 % on 500 items: $\mathrm{SE}_{\Delta} = \sqrt{2} \times 0.0205 = 0.029$, 95 % $\pm 5.7$ pp. A 2-point gap is nowhere near significant.` },
            { md: md`**Items needed** to detect 2 pp with 80 % power, unpaired: $n = (1.96 + 0.84)^2 \times 2 \times 0.7 \times 0.3 / 0.02^2 = 8{,}241$.` },
          ],
          result: md`Large native benchmarks rank models; a 500-item benchmark can only flag large gaps. Report every score with its interval, and design new Suhail benchmarks with enough items for the gaps you care about, or use paired tests.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Paired test on the same 500 items",
          given: md`On the same 500 items, model A is right and B wrong on **35** items; B right and A wrong on **25**; they agree on the other 440. So A is ahead by $10/500 = 2$ pp.`,
          steps: [
            { md: md`$p_{10} = 35/500 = 0.07$, $p_{01} = 25/500 = 0.05$, $\hat\Delta = 0.02$.` },
            {
              md: md`$\mathrm{SE}(\hat\Delta) = \sqrt{(0.07 + 0.05 - 0.02^2)/500} = \sqrt{0.1196/500} = 0.0155$.`,
              hidden: true,
              check: { prompt: "Paired SE of the difference (pp)", answer: 1.55, unit: "pp", tolerance: { abs: 0.02 } },
            },
            {
              md: md`$z = 0.02/0.0155 = 1.29$, below 1.96: not significant at 95 %.`,
              hidden: true,
              check: { prompt: "z statistic", answer: 1.29, tolerance: { abs: 0.02 } },
            },
          ],
          result: md`Pairing shrinks the 95 % half-width of the gap from about 5.7 pp to about 3.0 pp, but 2 pp is still inside the noise. You would need roughly three times as many items with this disagreement rate to call it.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Estimating contamination with a clean subset",
          given: md`A 2,000-item benchmark is checked against a model's disclosed pretraining corpus with 13-gram overlap. 140 items (7 %) are flagged. Accuracy is **82.1 %** on flagged items and **61.0 %** on the 1,860 clean items. (Illustrative.)`,
          steps: [
            { md: md`**Reported overall**: $(1{,}860 \times 0.610 + 140 \times 0.821)/2{,}000 = (1{,}134.6 + 114.9)/2{,}000 = 62.5$ %.` },
            { md: md`**Clean estimate**: 61.0 %, so contamination inflates the headline by about 1.5 pp, roughly the size of many leaderboard gaps.` },
            { md: md`**Caveat**: flagged items may also be easier (popular questions get copied more). The 21-point gap is an upper bound on memorisation, and overlap checks miss translated and paraphrased leaks entirely.` },
          ],
          result: md`Report the clean-subset score alongside the headline; prefer private held-out sets for anything Suhail publishes as a ranking.`,
        },
        {
          kind: "question",
          question: {
            id: "sh09-l05-p1",
            type: "numeric",
            prompt: md`An LLM judge and a Gulf-dialect native speaker label 200 pairwise comparisons. They agree on 150. The judge says "A better" 60 % of the time; the human 50 %. What is Cohen's kappa?`,
            answer: 0.5,
            tolerance: { abs: 0.01 },
            explanation: md`$p_o = 0.75$. $p_e = 0.6 \times 0.5 + 0.4 \times 0.5 = 0.50$. $\kappa = (0.75 - 0.50)/(1 - 0.50) = 0.50$: moderate. Not good enough to replace human judging in a published Gulf benchmark; good enough for quick internal iteration with human spot checks.`,
            concepts: ["sh09.llm-judge"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running evaluations people can trust",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

- **Harnesses**: lm-evaluation-harness (EleutherAI) and lighteval (Hugging Face; used by OALL) fix prompts, few-shot examples and scoring so results are reproducible. Pin the harness version and the task config in every report.
- **Report format**: score, 95 % interval, number of items, prompt format, scoring method, model revision, decoding settings (temperature, max tokens), and seeds for generation tasks.
- **Benchmark building**: write the construct; recruit item writers across countries and dialects; write items to a template with gold answer and rationale; second-annotator review; pilot on a few models to remove broken items; split into public dev, private test; publish a datasheet (Lesson 6).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How evaluation results go wrong",
          md: md`- **Different prompt formats** across the models being compared.
- **Cherry-picked tasks**: reporting the 4 tasks you win out of 12.
- **Test-set tuning**: choosing checkpoints or prompts by test score.
- **Public test sets for rankings**: within months, test items leak into training data.
- **Unvalidated judges** in dialects the judge reads poorly.
- **No error bars**, so 0.5-point "wins" make headlines.`,
        },
        {
          kind: "scenario",
          scenario: "sh09-s1",
        },
        {
          kind: "question",
          question: {
            id: "sh09-l05-p2",
            type: "short",
            prompt: md`Write the **design document (one to two pages) for a Suhail benchmark**: "Khaleeji-Bench", testing whether models understand and answer naturally in Gulf Arabic. Cover the construct, item types and sources, item count with the statistical justification, how items are written and reviewed, scoring (including any LLM judge and how it is validated), contamination defences, release policy and licence.`,
            rubric: [
              "Defines a clear construct and item types (comprehension, generation, cultural knowledge) with native Gulf item writers across several Gulf countries",
              "Justifies item count with the standard-error arithmetic (for example 1,500 to 3,000 items for about 2 to 3 pp intervals, or paired tests)",
              "Specifies scoring for each item type; validates any LLM judge against native-speaker labels with kappa and a threshold, and controls position and length bias",
              "Includes contamination defences: private test set, canary string, rotation, n-gram checks against open corpora",
              "Has a release plan (public dev set, server-scored private test, licence such as CC BY 4.0 for dev) and contributor consent and credit",
              "Reports results with intervals and fixed prompts via a named harness",
            ],
            modelAnswer: md`**Khaleeji-Bench design v0.1**

**Construct**: ability to understand and respond appropriately in Gulf Arabic (Kuwaiti, Saudi Najdi and Hijazi, Emirati, Qatari, Bahraini, Omani) as used in everyday and work settings. Not MSA knowledge.

**Items** (target 2,400 test plus 300 dev):
- 1,200 multiple-choice comprehension items on short native passages (voice-note transcripts, WhatsApp-style messages, radio talk), 4 options, scored by log-likelihood and by generation (both reported).
- 800 cultural and practical knowledge items (procedures, idioms, local usage), multiple choice.
- 400 open generation prompts ("reply to this customer message in Kuwaiti dialect"), scored pairwise against a fixed reference model.

**Statistics**: at 70 % accuracy, 1,200 items give a 95 % interval of about $\pm 2.6$ pp per score; comparisons use paired tests on shared items. Generation win rates on 400 prompts give about $\pm 4.9$ pp: used for large gaps only.

**Writing and review**: 30 item writers, at least four per country, paid or credited as authors; template with gold answer, rationale, dialect tag; every item reviewed by a second speaker from a different Gulf country; disputed items removed; pilot on 5 models to drop items everyone gets right or that are ambiguous.

**Judging**: native-speaker pairwise judgments on all 400 generation items for v1. An LLM judge may be added only if kappa against native labels is at least 0.7 on a 200-item sample, with both orders judged and length-controlled.

**Contamination**: test set never published; scoring server; canary string in all files; 13-gram check of every item against ArabicWeb24, CulturaX and AraMix before release; 25 % of items rotated yearly.

**Release**: dev set and code public (CC BY 4.0 and Apache-2.0); private test scored on request with a fixed lighteval config; results always with intervals and item counts; datasheet with writer demographics by country.`,
            explanation: md`A credible benchmark design starts from the construct, sizes the item count from the error bars it needs, validates every judge, and protects the test set.`,
            concepts: ["sh09.benchmark-design", "sh09.eval-statistics", "sh09.contamination", "sh09.llm-judge"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a journalist why \"model X beats model Y by 1.5 points\" may mean nothing, and what two things you would check before reporting it.",
          keyPoints: [
            "A benchmark score is a sample estimate with an error bar that depends on the number of questions",
            "On a few hundred questions the error bar is several points, larger than the claimed gap",
            "Check the interval (or a paired test) and the number of items",
            "Check contamination: whether the test questions could have been in the training data",
          ],
        },
        { kind: "xref", to: "m14.verification-sampling", note: "Track 0's verification sampling uses the same idea: a sample estimate only means something with its error bar." },
      ],
    },
  ],
  quiz: [
    {
      id: "sh09-l05-q1",
      type: "numeric",
      prompt: md`What is the 95 % confidence half-width (in percentage points) of an accuracy of 80 % measured on 400 independent items?`,
      answer: 3.92,
      tolerance: { abs: 0.05 },
      unit: "pp",
      explanation: md`$\mathrm{SE} = \sqrt{0.8 \times 0.2/400} = 0.02$; $1.96 \times 2 = 3.92$ pp.`,
      concepts: ["sh09.eval-statistics"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh09-l05-q2",
      type: "multi",
      prompt: "Which are effective defences against benchmark contamination?",
      options: [
        "Private, server-scored test sets",
        "Canary strings in benchmark files",
        "n-gram overlap checks against training data",
        "Publishing the full test set with answers on GitHub",
        "Rotating test items over time",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Publishing test answers is how contamination starts. Note that n-gram checks miss translated and paraphrased leaks.`,
      concepts: ["sh09.contamination"],
      difficulty: 1,
    },
    {
      id: "sh09-l05-q3",
      type: "mcq",
      prompt: "Why did OALL v2 drop machine-translated tasks?",
      options: [
        "They were too easy",
        "Translated items measure translation artefacts and foreign cultural knowledge rather than native Arabic ability",
        "They were too large to run",
        "Licences expired",
      ],
      answer: 1,
      explanation: md`Validity: a benchmark should measure the construct it claims. Native items written for Arab contexts do; machine translations of English tests largely do not.`,
      concepts: ["sh09.benchmark-design", "sh09.arabic-benchmarks"],
      difficulty: 1,
    },
    {
      id: "sh09-l05-q4",
      type: "numeric",
      prompt: md`Models A and B answer the same 1,000 items. A right and B wrong: 70. B right and A wrong: 40. What is the z statistic of the paired difference?`,
      answer: 2.87,
      tolerance: { abs: 0.05 },
      explanation: md`$p_{10} = 0.07$, $p_{01} = 0.04$, $\hat\Delta = 0.03$. $\mathrm{SE} = \sqrt{(0.11 - 0.0009)/1000} = 0.01045$. $z = 0.03/0.01045 = 2.87$: significant at 95 %.`,
      concepts: ["sh09.paired-comparison"],
      difficulty: 3,
    },
    {
      id: "sh09-l05-q5",
      type: "mcq",
      prompt: "An LLM judge prefers whichever answer is shown first 65 % of the time on pairs humans rate as ties. What is the standard fix?",
      options: [
        "Always show your own model first",
        "Judge each pair in both orders and count a win only when the verdict is consistent",
        "Use a longer rubric",
        "Lower the judge's temperature to zero",
      ],
      answer: 1,
      explanation: md`Swapping order cancels position bias; inconsistent verdicts count as ties.`,
      concepts: ["sh09.llm-judge"],
      difficulty: 1,
    },
    {
      id: "sh09-l05-q6",
      type: "numeric",
      prompt: md`How many 13-grams does a 25-token test item contain?`,
      answer: 13,
      tolerance: { abs: 0 },
      explanation: md`$25 - 13 + 1 = 13$.`,
      concepts: ["sh09.contamination"],
      difficulty: 1,
    },
    {
      id: "sh09-l05-q7",
      type: "decision",
      prompt: "Suhail's first benchmark is ready. A sponsor wants the full test set published on day one \"for transparency\". What do you propose?",
      options: [
        { text: "Publish a dev set, the code, the datasheet and the scoring config openly; keep the test set private and server-scored, with a canary string and yearly rotation", score: 1, feedback: "Transparency about method without handing the test to every crawler." },
        { text: "Publish everything; contamination is not our problem", score: 0.1, feedback: "Within months the benchmark stops measuring anything." },
        { text: "Keep everything private, including the method", score: 0.2, feedback: "Nobody can trust or reproduce a black-box benchmark." },
        { text: "Publish the test set but ask labs not to train on it", score: 0.3, feedback: "Requests do not stop web crawlers or careless data pipelines." },
      ],
      explanation: md`This is the BALSAM and ABBL pattern: open method, protected test items.`,
      concepts: ["sh09.contamination", "sh09.benchmark-design"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh09-l05-f1", front: "SE of an accuracy", back: md`$\sqrt{p(1-p)/n}$; 95 % CI $\pm 1.96$ SE. 500 items at 70 %: $\pm 4.0$ pp.`, concepts: ["sh09.eval-statistics"] },
    { id: "sh09-l05-f2", front: "Paired SE of a difference", back: md`$\sqrt{(p_{10} + p_{01} - \Delta^2)/n}$: only discordant items carry information.`, concepts: ["sh09.paired-comparison"] },
    { id: "sh09-l05-f3", front: "Items to detect 2 pp at 70 % (unpaired, 95 %, 80 % power)", back: "About 8,200.", concepts: ["sh09.eval-statistics"] },
    { id: "sh09-l05-f4", front: "BALSAM", back: "SDAIA, KSGAAL and partners: 78 tasks, 14 categories, 52K examples (37K test, 15K dev), blind test sets.", concepts: ["sh09.arabic-benchmarks"] },
    { id: "sh09-l05-f5", front: "OALL v2 change", back: "Dropped machine-translated tasks; native ArabicMMLU, ALRAGE, AraTrust, MadinahQA, Belebele and others.", concepts: ["sh09.arabic-benchmarks"] },
    { id: "sh09-l05-f6", front: "Four contamination checks", back: "n-gram overlap, canary strings, perplexity probes, private held-out sets (strongest).", concepts: ["sh09.contamination"] },
    { id: "sh09-l05-f7", front: "LLM-judge biases", back: "Position, verbosity, self-preference, weak dialect competence. Validate with kappa against native speakers.", concepts: ["sh09.llm-judge"] },
    { id: "sh09-l05-f8", front: "Translation contamination", back: "Exposure to translated MMLU raised accuracy 2.8 to 11.3 pp (NeurIPS 2026, via research brief).", concepts: ["sh09.contamination"] },
  ],
  scenarios: [
    {
      id: "sh09-s1",
      title: "The leaderboard claim on stage",
      dayInLife: true,
      context: md`Suhail Season, a panel you moderate. A regional startup founder announces that their new 7B Arabic model "beats Jais 2 by 1.5 points" on their own 600-item Arabic reasoning benchmark, and asks Suhail to feature the result in the newsletter. You have their slide and five minutes after the panel.`,
      start: "a",
      concepts: ["sh09.eval-statistics", "sh09.paired-comparison", "sh09.contamination"],
      nodes: {
        a: {
          md: md`The slide shows 72.0 % versus 70.5 % on 600 items. No intervals, no prompt details. What is your first move?`,
          choices: [
            { text: "Ask for the per-item results of both models so you can run a paired test, plus the prompt format and decoding settings", next: "b", score: 10, feedback: "Right: you need the discordant counts and to know both models were run the same way." },
            { text: "Feature it: they are a promising regional startup", next: "c", score: 1, feedback: "Suhail's credibility is the asset; one unsupported headline costs more than it earns." },
            { text: "Say publicly that 600 items is too few to mean anything", next: "b", score: 5, feedback: "Statistically fair, but on stage it humiliates a founder before you have checked. Ask for the data first." },
          ],
        },
        b: {
          md: md`They send the per-item file. A right and Jais 2 wrong: 54 items; Jais 2 right and A wrong: 45. Unpaired, the 95 % half-width of the gap would be about 5.1 pp. You compute the paired test.`,
          choices: [
            { text: "Paired SE = sqrt((0.09 + 0.075 - 0.015²)/600) = 0.0166, z = 0.90: not significant. Offer to feature the model with the interval stated and an invitation to run it on a held-out set", next: "d", score: 10, feedback: "Correct arithmetic and a constructive response." },
            { text: "z is above 1.96, so feature it as a win", next: "c", score: 0, feedback: "Recompute: 1.5 pp / 1.66 pp = 0.90." },
          ],
        },
        c: {
          md: md`Two weeks after the newsletter, a researcher shows that 40 of the 600 items appear verbatim on a public exam-prep site that is in a common Arabic web crawl, and Jais 2's team notes the prompt formats differed. Suhail is quoted as having endorsed a noise-level result.`,
          choices: [
            { text: "Publish a correction with the paired analysis and a policy for future features", score: 6, feedback: "The right repair, but avoidable with a ten-minute check." },
          ],
        },
        d: {
          md: md`The founder agrees. You also notice their benchmark items were drawn from public exam-prep websites. What do you add?`,
          choices: [
            { text: "Ask them to run a 13-gram overlap check against a common Arabic web corpus and report the clean-subset score; offer Suhail's private held-out set as an independent test", score: 10, feedback: "Contamination check plus an independent test: this is how Suhail builds trust as an evaluator." },
            { text: "Nothing more; the statistics already settled it", score: 4, feedback: "The statistics settled significance, not validity. Public-source items invite contamination." },
          ],
        },
      },
    },
  ],
};

export default lesson;
