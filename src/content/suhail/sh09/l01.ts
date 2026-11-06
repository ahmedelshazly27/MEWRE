import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh09-l01",
  title: "The training pipeline: from crawl to chat model, with the losses written out",
  summary:
    "Every open-weight model, from Jais 2 to a weekend LoRA, is built by the same pipeline: collect text, filter and deduplicate it, pretrain with next-token cross-entropy, fine-tune on instructions (SFT), then tune on preferences (RLHF or DPO). This lesson writes out each stage's objective, shows what each stage can and cannot teach a model, and gives you the arithmetic to read a model card or a research proposal stage by stage.",
  minutes: 80,
  objectives: [
    "Draw the full pipeline (data, pretraining, continued pretraining, SFT, preference tuning) and name what each stage changes in the model",
    "Write and explain the pretraining cross-entropy, SFT, reward-model, RLHF and DPO objectives",
    "Convert loss to perplexity and bits, and explain why loss is not comparable across tokenizers",
    "Compute MinHash LSH candidate probabilities and read a dedup funnel",
    "Place a proposed Suhail project on the pipeline and say which stage it touches and what it needs",
  ],
  concepts: [
    { id: "sh09.pretraining-objective", name: "Pretraining objective (next-token cross-entropy)", description: "Pretraining minimises the mean negative log-probability of each real next token. Everything the base model knows comes from this one objective applied to trillions of tokens.", competency: "sh-research", related: ["m14.probabilistic-generation", "sh09.data-pipeline"] },
    { id: "sh09.data-pipeline", name: "Pretraining data pipeline", description: "Crawl or collect, extract text, identify language, apply quality filters, deduplicate (exact and near), remove personal data and benchmark text, then mix sources. Most of the quality of an open model is decided here.", competency: "sh-research", related: ["sh09.near-dedup"] },
    { id: "sh09.near-dedup", name: "Near-duplicate removal (MinHash LSH)", description: "Documents are turned into sets of shingles, MinHash signatures estimate Jaccard similarity, and locality-sensitive hashing (bands of rows) finds candidate pairs above a similarity threshold without comparing every pair.", competency: "sh-research", related: ["sh09.data-pipeline"] },
    { id: "sh09.sft", name: "Supervised fine-tuning (SFT)", description: "Fine-tuning a base model on prompt-response pairs with the loss computed only on response tokens. Teaches format, task behaviour and chat templates; adds little new knowledge.", competency: "sh-research", related: ["sh09.pretraining-objective"] },
    { id: "sh09.preference-tuning", name: "Preference tuning (RLHF and DPO)", description: "Aligning a model to human (or AI) preferences between pairs of responses: RLHF trains a reward model and optimises against it with a KL penalty; DPO optimises the same objective directly from pairs without a reward model.", competency: "sh-research", related: ["sh09.sft"] },
    { id: "sh09.continued-pretraining", name: "Continued pretraining (language adaptation)", description: "Resuming next-token training of an existing base model on new-language or new-domain text, often with an extended vocabulary and some original-language data mixed in to avoid forgetting. The usual route to a strong Arabic model without pretraining from scratch.", competency: "sh-research", related: ["sh09.pretraining-objective"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Five stages, five objectives",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail plans a research arm doing open-weight models, datasets and benchmarks. You will not train the models, but you will choose which projects get volunteers, credits and the Suhail name. A proposal that says "we will build an Arabic LLM" can mean a USD 4 LoRA run or a USD 1.5 million pretraining run. Knowing which pipeline stage a project touches, and what that stage can and cannot change, is the first filter you apply to every proposal and every claim a model vendor makes on stage at Suhail Season.`,
        },
        {
          kind: "flow",
          title: "The open-weight LLM pipeline",
          steps: [
            { label: "1. Data", detail: "Crawl, extract, language ID, quality filter, dedup, PII and benchmark removal, mixing" },
            { label: "2. Pretraining", detail: "Next-token cross-entropy on trillions of tokens; produces the base model" },
            { label: "2b. Continued pretraining", detail: "Optional: more next-token training on Arabic text, often with vocabulary extension" },
            { label: "3. SFT", detail: "Instruction and chat data; loss on response tokens only" },
            { label: "4. Preference tuning", detail: "RLHF (reward model plus PPO) or DPO on chosen and rejected pairs" },
            { label: "5. Evaluation and release", detail: "Benchmarks, safety tests, model card, licence" },
          ],
          caption: "Knowledge comes overwhelmingly from stages 1 and 2. Stages 3 and 4 shape behaviour. Most Arabic open models in the region reuse a global base model for stage 2 and do stages 2b to 5 themselves.",
        },
        {
          kind: "md",
          md: md`### Stage 1: data

A base model is a compressed statistical summary of its training text, so the pipeline that builds that text decides most of what the model can do. The standard steps:

1. **Collect**: Common Crawl snapshots (the public web), plus curated sources (books, news, Wikipedia, government publications, code, academic text). For Arabic, existing cleaned corpora such as ArabicWeb24, 101 Billion Arabic Words, the Arabic part of CulturaX and the AraMix recombination (Lesson 6).
2. **Extract** text from HTML (boilerplate removal: menus, footers, cookie banners).
3. **Language identification**: a fast classifier assigns a language and a confidence to each document. Arabic-script text includes Persian, Urdu and Pashto, and Arabic itself includes dialects and Arabizi (Arabic in Latin letters with digits), so a generic language ID makes systematic mistakes here.
4. **Quality filtering**: heuristics (document length, mean word length, share of symbols, repeated lines, presence of common function words) and model-based classifiers that score "educational" or "well-formed" text.
5. **Deduplication**: exact (hash of normalised text or of lines) and near-duplicate (MinHash, below). Web Arabic is heavily duplicated: news syndicated across dozens of sites, religious texts copied thousands of times, forum signatures.
6. **Safety and privacy**: remove personal data (emails, phone numbers, national ID patterns), toxic content above a threshold, and **benchmark test sets** (decontamination, Lesson 5).
7. **Mix**: decide the share of each source and language in the final token stream (Lesson 6).

### Near-duplicate removal with MinHash

Two news articles that differ only in the site header are near-duplicates. Comparing every pair of a billion documents is impossible ($10^{18}$ pairs), so pipelines estimate **Jaccard similarity** $s = |A \cap B| / |A \cup B|$ of the documents' shingle sets (for example all 5-word sequences) with MinHash: apply a random hash to every shingle and keep the minimum. The probability that two documents share the same minimum equals $s$. With 100 such hashes grouped into $b$ bands of $r$ rows, documents are compared only if a whole band matches:`,
        },
        { kind: "equation", formula: "sh09-minhash-lsh" },
        {
          kind: "md",
          md: md`With $b = 20$ bands of $r = 5$ rows: pairs at $s = 0.8$ are caught with probability 0.9996, pairs at $s = 0.5$ with probability 0.47, pairs at $s = 0.3$ with probability 0.05. The threshold sits near $(1/20)^{1/5} = 0.55$. Choosing $b$ and $r$ is choosing where that S-curve sits.

### Stage 2: pretraining

The base model is trained on one objective: predict the next token.`,
        },
        { kind: "equation", formula: "sh09-ce-loss" },
        { kind: "equation", formula: "sh09-perplexity" },
        {
          kind: "md",
          md: md`Nothing else is in the objective: no truth, no helpfulness, no Arabic grammar rule. A model that has read a lot of well-written Gulf news learns Gulf news; one that has read machine-translated Arabic learns translationese. This is why the data stage dominates.

**Continued pretraining** (stage 2b) runs the same objective on an existing base model with new data, for example 100 B Arabic tokens on a 7B English-centric base. Fanar-1-9B is a public example: built on Gemma-2 and continually pretrained on about 1 T tokens, of which about 410 B Arabic. AceGPT did the same on Llama 2. Two practical issues: the tokenizer may need new Arabic tokens (Lesson 2), and the model forgets some of what it knew unless original-language data is mixed back in (commonly a substantial minority share of the new run, tuned by ablation).

### Stage 3: supervised fine-tuning

A base model continues text; it does not answer questions. SFT trains it on prompt-response pairs, formatted with a chat template, and masks the prompt out of the loss:`,
        },
        { kind: "equation", formula: "sh09-sft-loss" },
        {
          kind: "md",
          md: md`SFT data is small (thousands to hundreds of thousands of examples) and its quality matters far more than its size. Translated English instruction sets are cheap and common; they teach the model to answer in stiff, translated Arabic about American contexts. Native, culturally grounded instructions written by Arabic speakers are scarce and valuable, which is exactly the kind of data a community can produce.

### Stage 4: preference tuning

People find it easier to say which of two answers is better than to write the perfect answer. Preference tuning uses pairs: a prompt $x$, a chosen response $y_w$ and a rejected one $y_l$.

**RLHF** (the InstructGPT recipe) first trains a reward model with the Bradley-Terry loss, then optimises the policy against it with a KL leash to the SFT model:`,
        },
        { kind: "equation", formula: "sh09-bradley-terry" },
        { kind: "equation", formula: "sh09-rlhf-objective" },
        {
          kind: "md",
          md: md`**DPO** removes the reward model and the reinforcement-learning loop. The optimal policy of the RLHF objective satisfies $r(x,y) = \beta \log \frac{\pi^*(y\mid x)}{\pi_{\text{ref}}(y\mid x)} + \text{const}$, so substitute that implicit reward into the Bradley-Terry loss:`,
        },
        { kind: "equation", formula: "sh09-dpo-loss" },
        {
          kind: "md",
          md: md`What DPO does to the model: raise the log-probability of chosen responses relative to the reference, lower that of rejected ones, and stop pushing once the margin is large (the gradient on each pair is weighted by $\sigma(-\text{margin})$, which goes to zero as the margin grows). Two models in memory (policy and frozen reference), ordinary supervised-style training, no sampling during training. RLAIF is the same recipe with an AI model producing the preference labels instead of humans (AceGPT used it).

| Stage | Objective | Data scale | Changes | Cannot fix |
|---|---|---|---|---|
| Pretraining | Next-token cross-entropy | Trillions of tokens | Knowledge, language, style | Nothing upstream: it *is* upstream |
| Continued pretraining | Same | 10 B to 1 T tokens | Language and domain competence | A weak base architecture |
| SFT | Cross-entropy on responses | Thousands to a million examples | Format, task behaviour, refusals | Missing knowledge |
| RLHF / DPO | Preference likelihood with KL leash | Thousands to a million pairs | Tone, helpfulness, safety trade-offs | Missing knowledge, poor Arabic |`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "How much Arabic web text survives deduplication (billions of tokens)",
          xKey: "corpus",
          yLabel: "Billion tokens",
          series: [
            { key: "raw", label: "Raw" },
            { key: "dedup", label: "After dedup" },
          ],
          data: [
            { corpus: "CulturaX (Arabic part)", raw: 87.4, dedup: 38.4 },
            { corpus: "101 Billion Arabic Words", raw: 49.9, dedup: 7.7 },
          ],
          caption: "Third-party measurements by the AraMix authors (arXiv 2512.18834, Dec 2025), using their tokenizer and sentence-level dedup. 56 % and 85 % of tokens removed. Clean, unique Arabic web text is tens of billions of tokens, not trillions.",
        },
        { kind: "sources", refs: ["sh09-r1", "sh09-r2", "sh09-r3", "sh09-r37", "sh09-r43", "sh09-r45"] },
        { kind: "xref", to: "m14-l01", note: "Track 0 explains tokens, next-token generation and hallucination for a user of LLMs. This lesson is the builder's view of the same mechanism." },
      ],
    },
    {
      layer: "applied",
      title: "Reading losses and preference updates",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "From loss to perplexity, and one DPO step",
          given: md`A volunteer reports that a continued-pretraining run on Arabic news ended at a validation loss of **2.0 nats/token**. Separately, a DPO run uses $\beta = 0.1$. For one preference pair, after some training, the policy's log-probability of the chosen response is 2.0 nats higher than the reference's, and the rejected response's is 1.0 nats lower than the reference's. (Illustrative numbers.)`,
          steps: [
            { md: md`**Perplexity**: $\text{PPL} = e^{2.0} = 7.39$. In bits: $2.0/\ln 2 = 2.89$ bits/token.` },
            { md: md`**Is 2.0 good?** You cannot say without the tokenizer and the validation text. A tokenizer with fertility 3 makes each token easier to predict than one with fertility 1.6, so its loss per token is lower for the same model quality. Ask for bits per word or bits per byte on a fixed Arabic text, or better, a downstream benchmark.` },
            { md: md`**DPO margin**: implicit reward difference $= \beta(\log\tfrac{\pi_\theta(y_w)}{\pi_{\text{ref}}(y_w)} - \log\tfrac{\pi_\theta(y_l)}{\pi_{\text{ref}}(y_l)}) = 0.1 \times (2.0 - (-1.0)) = 0.30$.` },
            { md: md`**Loss**: $-\log \sigma(0.30) = \log(1 + e^{-0.30}) = 0.554$. At initialisation the margin is 0 and the loss is $\ln 2 = 0.693$.` },
            { md: md`**Gradient weight** on this pair: $\sigma(-0.30) = 0.426$, down from 0.5 at the start. Pairs the model already ranks correctly by a wide margin contribute almost nothing; hard pairs dominate.` },
          ],
          result: md`PPL 7.39 (2.89 bits/token), not comparable across tokenizers. DPO loss 0.554 on this pair, gradient weight 0.43. A DPO loss that stalls at 0.69 means the model is not separating chosen from rejected: check that the pairs are not near-identical or mislabelled.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Setting a near-duplicate threshold",
          given: md`Your dataset volunteers dedup a Gulf-dialect forum crawl with 100 MinHash values arranged as $b = 20$ bands of $r = 5$ rows. A reviewer asks how likely it is that two posts with Jaccard similarity 0.7 are caught as candidates, and where the threshold sits.`,
          steps: [
            { md: md`One band matches with probability $s^r = 0.7^5 = 0.168$.` },
            {
              md: md`The pair escapes all bands with probability $(1 - 0.168)^{20} = 0.0252$, so it is caught with probability $1 - 0.0252 = 0.975$.`,
              hidden: true,
              check: { prompt: "Probability that a pair at s = 0.7 becomes a candidate (0..1)", answer: 0.975, tolerance: { abs: 0.005 } },
            },
            {
              md: md`Threshold $\approx (1/b)^{1/r} = (1/20)^{0.2} = 0.549$.`,
              hidden: true,
              check: { prompt: "Approximate similarity threshold (0..1)", answer: 0.549, tolerance: { abs: 0.01 } },
            },
          ],
          result: md`About 97.5 % of 0.7-similar pairs are caught; the S-curve's midpoint is near 0.55. Candidates are then verified by computing the actual Jaccard similarity, so false candidates cost compute, not data.`,
        },
        {
          kind: "question",
          question: {
            id: "sh09-l01-p1",
            type: "numeric",
            prompt: md`A DPO pair has $\beta = 0.2$. The policy's log-ratio to the reference is $+0.5$ nats on the chosen response and $+0.5$ nats on the rejected response. What is the DPO loss on this pair (nats)?`,
            answer: 0.693,
            tolerance: { abs: 0.005 },
            unit: "nats",
            explanation: md`Margin $= 0.2 \times (0.5 - 0.5) = 0$, so the loss is $-\log\sigma(0) = \ln 2 = 0.693$. Raising both responses equally changes nothing: DPO only cares about the **difference**. This is also why DPO can lower the probability of both responses while still reducing loss, a known failure mode to watch in training logs.`,
            concepts: ["sh09.preference-tuning"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How labs actually run the pipeline, and what to ask",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **Data engineers** run the crawl-to-mix pipeline on CPU clusters with tools such as datatrove or NeMo Curator, plus custom Arabic normalisation (alef and yaa variants, tatweel, diacritics policy). This is the largest share of person-hours in most serious projects.
- **Training engineers** run pretraining and continued pretraining with frameworks such as Megatron-LM, NeMo, torchtitan or GPT-NeoX, and handle checkpoints, restarts and throughput.
- **Post-training** (SFT, DPO) is often done with Hugging Face TRL or Axolotl on a few GPUs.
- **Evaluation** uses harnesses such as lm-evaluation-harness or lighteval (OALL uses lighteval).

### What goes wrong`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Five classic pipeline failures",
          md: md`1. **Translated instruction data** presented as Arabic SFT data: fluent-looking, culturally wrong, and it teaches translationese.
2. **No decontamination**: benchmark questions scraped from the web end up in pretraining or SFT data; scores rise and mean nothing (Lesson 5).
3. **Catastrophic forgetting** in continued pretraining: Arabic improves, English reasoning and code collapse, because no original-language data was replayed.
4. **Over-aggressive quality filters** tuned on MSA news that throw away most dialect text, because dialect looks "low quality" to a classifier trained on formal prose.
5. **Preference data with weak signal**: chosen and rejected responses that differ only in length; the model learns to be long (verbosity hacking).`,
        },
        {
          kind: "ask",
          title: "Questions to ask any model proposal or model card",
          items: [
            "Which base model, and which stages did you run yourselves (2b, 3, 4)?",
            "How many tokens per stage, and what share Arabic, English, code?",
            "What were the dedup method and threshold, and what share of tokens did it remove?",
            "How was the SFT data produced: native writing, translation, or model-generated? Who checked it?",
            "Did you decontaminate against every benchmark you report? How (n-gram length, match rule)?",
            "What did you replay to prevent forgetting, and what happened to English scores?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh09-l01-p2",
            type: "short",
            prompt: md`A volunteer machine-learning engineer proposes "Suhail-Chat: an Arabic assistant for builders". Write a one-page **pipeline map** for the proposal: for each stage (data, pretraining or continued pretraining, SFT, preference tuning, evaluation) state whether Suhail would do it or reuse an existing open model, what data it needs and where that data would come from, the objective used, and the main risk. End with your recommendation of the smallest version worth doing first.`,
            rubric: [
              "Recommends reusing an existing open base or instruct model (for example Jais 2, Falcon-H1 Arabic, ALLaM-7B or Fanar) rather than pretraining from scratch, with a reason (compute, data)",
              "States the objective for each stage it keeps (cross-entropy on responses for SFT, DPO preference loss) correctly",
              "Identifies native, culturally grounded SFT and preference data as the scarce input and proposes how the community would produce it, with consent and licence",
              "Includes decontamination and an evaluation plan with named Arabic benchmarks plus a builder-specific test set",
              "Names concrete risks per stage (translationese, forgetting, verbosity hacking, contamination)",
              "Ends with a small first version (for example a LoRA SFT plus DPO on a 7B to 9B model and a 300 to 1,000 item evaluation set) and a decision criterion",
            ],
            modelAnswer: md`**Suhail-Chat pipeline map (draft for research review)**

| Stage | Do or reuse | Data and source | Objective | Main risk |
|---|---|---|---|---|
| Data and pretraining | Reuse. Start from an open Arabic-capable base or instruct model with a licence that permits fine-tuning and redistribution (shortlist: Jais 2, Falcon-H1 Arabic 7B, ALLaM-7B-Instruct-preview, Fanar-1-9B; check each licence) | None of ours | Next-token cross-entropy (theirs) | Licence terms on derivatives; unknown training data, so unknown contamination |
| Continued pretraining | Skip in v1 | Would need 10 B+ tokens of Arabic tech text we do not have | Same | Forgetting; cost |
| SFT | Do, with LoRA | 3,000 to 5,000 native prompt-response pairs on builder topics (startup questions, code explanations in Arabic, Gulf and Egyptian phrasing), written at hackathons and reviewed by two native speakers; CC BY 4.0 with contributor consent | Cross-entropy on response tokens only | Translationese if anyone pastes translated data; inconsistent style |
| Preference tuning | Do, DPO | 2,000 to 3,000 pairs: two model answers per prompt, a native speaker picks the better and gives a reason | DPO loss, beta 0.1 | Length bias: check that chosen is not just longer |
| Evaluation | Do | OALL v2 tasks for regression, plus a held-out 500-item Suhail builder test set never published, judged by native speakers with a validated LLM judge | Accuracy with 95 % CI; paired win rate | Contamination of our own set; judge bias in dialect |

**Recommendation**: v1 is a LoRA SFT plus DPO on one 7B to 9B open model, about 2 GPU-hours of training, with the real cost in about 400 volunteer hours of data writing and review. Go to v2 only if the paired win rate against the base instruct model on our held-out set is significantly above 50 % and OALL scores do not drop by more than their confidence interval.`,
            explanation: md`A strong map reuses an open base model, keeps only the cheap stages (LoRA SFT, DPO, evaluation), puts the real effort into native data with consent, and sets a measurable go or no-go criterion before any larger spend.`,
            concepts: ["sh09.sft", "sh09.preference-tuning", "sh09.continued-pretraining", "sh09.data-pipeline"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a Suhail sponsor, without equations, why fine-tuning an existing model on 5,000 good Arabic conversations can make it much nicer to use but cannot make it know things about Kuwait that it never read.",
          keyPoints: [
            "Pretraining on huge text is where knowledge comes from: the model compresses what it read",
            "SFT and preference tuning are small and shape behaviour: format, tone, which of its existing answers it prefers",
            "Teaching new facts needs much more text (continued pretraining) or retrieval at answer time",
            "So a community fine-tune improves style, dialect handling and helpfulness, not coverage of missing facts",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh09-l01-q1",
      type: "order",
      prompt: "Put the stages of building an Arabic chat model from an English-centric base in order.",
      items: ["Collect and filter Arabic text", "Continued pretraining (next-token loss)", "Supervised fine-tuning on instructions", "Preference tuning (DPO or RLHF)", "Evaluation and model card"],
      explanation: md`Data first; continued pretraining adds Arabic competence; SFT teaches the chat behaviour; preference tuning refines it; evaluation and documentation close the loop (and feed back into data).`,
      concepts: ["sh09.data-pipeline", "sh09.continued-pretraining"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh09-l01-q2",
      type: "numeric",
      prompt: md`A model's validation loss is 1.8 nats/token. What is its perplexity?`,
      answer: 6.05,
      tolerance: { abs: 0.03 },
      explanation: md`$e^{1.8} = 6.05$. Comparable only to models evaluated with the same tokenizer on the same text.`,
      concepts: ["sh09.pretraining-objective"],
      difficulty: 1,
    },
    {
      id: "sh09-l01-q3",
      type: "mcq",
      prompt: "In SFT, why are the prompt tokens masked out of the loss?",
      options: [
        "To save memory",
        "Because the model should learn to produce responses, not to predict user prompts",
        "Because prompts are always in English",
        "Because the tokenizer cannot encode prompts",
      ],
      answer: 1,
      explanation: md`The gradient should come only from the behaviour you want the model to imitate (the response). Training on prompts would teach it to generate user-style text.`,
      concepts: ["sh09.sft"],
      difficulty: 1,
    },
    {
      id: "sh09-l01-q4",
      type: "multi",
      prompt: "Which statements about DPO versus RLHF with PPO are correct?",
      options: [
        "DPO needs no separate reward model",
        "DPO samples new responses from the policy during training",
        "Both keep the tuned model close to a reference model",
        "DPO needs the policy and a frozen reference model in memory",
        "DPO can teach the model facts that were absent from pretraining",
      ],
      answer: [0, 2, 3],
      explanation: md`DPO trains directly on fixed preference pairs; the $\beta$ log-ratio to the reference plays the role of the KL leash. It does not sample during training (offline), and like any preference method it shapes behaviour rather than adding knowledge.`,
      concepts: ["sh09.preference-tuning"],
      difficulty: 2,
    },
    {
      id: "sh09-l01-q5",
      type: "numeric",
      prompt: md`MinHash LSH with $b = 20$ bands, $r = 5$ rows. Probability that a pair with Jaccard similarity 0.5 becomes a candidate?`,
      answer: 0.47,
      tolerance: { abs: 0.01 },
      explanation: md`$0.5^5 = 0.03125$; $1 - (1 - 0.03125)^{20} = 1 - 0.530 = 0.470$.`,
      concepts: ["sh09.near-dedup"],
      difficulty: 2,
    },
    {
      id: "sh09-l01-q6",
      type: "decision",
      prompt: "After continued pretraining of a 7B model on 80 B Arabic tokens, Arabic benchmarks rose but English reasoning and coding scores fell sharply. What do you ask the team to change first?",
      options: [
        { text: "Mix original-language (English and code) data back into the continued-pretraining run and re-run a short ablation", score: 1, feedback: "Right: this is catastrophic forgetting, and replay is the standard fix. Measure it with a short ablation before a full re-run." },
        { text: "Add more Arabic SFT data", score: 0.2, feedback: "SFT will not restore lost knowledge and skills from pretraining." },
        { text: "Accept it: Suhail only cares about Arabic", score: 0.1, feedback: "Builders use code and English constantly; a model that lost both is less useful, not more Arabic." },
        { text: "Switch from DPO to RLHF", score: 0, feedback: "Preference tuning is unrelated to the problem, which arose in stage 2b." },
      ],
      explanation: md`Forgetting comes from shifting the training distribution entirely; replaying some original data keeps old capabilities. The share is set by ablation.`,
      concepts: ["sh09.continued-pretraining"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh09-l01-f1", front: "Pretraining objective", back: md`$\mathcal{L} = -\frac{1}{T}\sum \log p_\theta(x_t \mid x_{<t})$: mean negative log-probability of the true next token.`, concepts: ["sh09.pretraining-objective"] },
    { id: "sh09-l01-f2", front: "Perplexity from loss", back: md`$\text{PPL} = e^{\mathcal{L}}$; loss 2.0 nats gives 7.39. Not comparable across tokenizers.`, concepts: ["sh09.pretraining-objective"] },
    { id: "sh09-l01-f3", front: "What does SFT teach, and what can it not teach?", back: "Format, task behaviour, chat template, refusals. It cannot add knowledge missing from pretraining.", concepts: ["sh09.sft"] },
    { id: "sh09-l01-f4", front: "DPO loss", back: md`$-\log\sigma\big(\beta[\log\tfrac{\pi_\theta(y_w)}{\pi_{\text{ref}}(y_w)} - \log\tfrac{\pi_\theta(y_l)}{\pi_{\text{ref}}(y_l)}]\big)$; equals $\ln 2$ at initialisation.`, concepts: ["sh09.preference-tuning"] },
    { id: "sh09-l01-f5", front: "Why the KL term in RLHF?", back: "It keeps the policy close to the SFT model so it cannot exploit flaws in the reward model (reward hacking).", concepts: ["sh09.preference-tuning"] },
    { id: "sh09-l01-f6", front: "MinHash LSH candidate probability", back: md`$P = 1 - (1 - s^r)^b$; threshold near $(1/b)^{1/r}$.`, concepts: ["sh09.near-dedup"] },
    { id: "sh09-l01-f7", front: "Continued pretraining: the forgetting fix", back: "Replay original-language data (English, code) in the new run; set the share by ablation.", concepts: ["sh09.continued-pretraining"] },
  ],
};

export default lesson;
