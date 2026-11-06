import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh09-l02",
  title: "Tokenisation: BPE, unigram, Arabic morphology and the fertility tax",
  summary:
    "A model never sees letters or words, only token ids from a fixed vocabulary. How that vocabulary cuts Arabic decides how much every Arabic sentence costs to train on and to serve, how much fits in the context window, and how well the model can learn word structure. This lesson covers BPE and unigram tokenizers, why Arabic root-and-pattern morphology, clitics, diacritics and dialects are hard for them, and the fertility arithmetic that turns a tokenizer choice into money and context length.",
  minutes: 75,
  objectives: [
    "Run BPE merges by hand on a toy corpus and explain how unigram tokenizers differ",
    "Explain why Arabic clitics, root-and-pattern morphology, diacritics and dialect spelling raise token counts",
    "Compute fertility and its effect on cost, effective context length and training-token requirements",
    "Compute the parameters added by vocabulary extension and say what training it requires",
    "Design a fertility study across Arabic varieties for the research arm",
  ],
  concepts: [
    { id: "sh09.bpe", name: "Byte-pair encoding (BPE)", description: "Tokenizer trained by starting from characters or bytes and repeatedly merging the most frequent adjacent pair into a new token until the vocabulary reaches a target size; the merge list is then applied in order to new text.", competency: "sh-research", related: ["m14.tokens", "sh09.unigram-tokenizer"] },
    { id: "sh09.unigram-tokenizer", name: "Unigram language-model tokenizer", description: "Tokenizer that starts from a large candidate vocabulary and prunes it to maximise the likelihood of the training text under a unigram model of tokens; segments new text with the most probable split. Used through SentencePiece.", competency: "sh-research", related: ["sh09.bpe"] },
    { id: "sh09.fertility", name: "Fertility (tokens per word)", description: "Average number of tokens a tokenizer produces per whitespace word of a given language variety. It multiplies cost, latency, context use and the training tokens needed to cover a corpus.", competency: "sh-research", related: ["m14.context-window", "sh09.bpe"] },
    { id: "sh09.arabic-morphology-tokens", name: "Arabic morphology versus subword tokenizers", description: "Arabic attaches conjunctions, prepositions, articles and pronouns to words (clitics) and builds words by interleaving a root with a pattern. Frequency-based merges capture clitics partly and interleaved roots not at all.", competency: "sh-research", related: ["sh09.fertility"] },
    { id: "sh09.diacritics-dialects", name: "Diacritics, normalisation and dialect spelling", description: "Short-vowel marks are separate Unicode characters that are usually omitted; fully diacritised text fragments badly. Dialects have no standard spelling and appear in Arabic script and in Arabizi, which spreads the same word over many token sequences.", competency: "sh-research", related: ["sh09.fertility"] },
    { id: "sh09.vocab-extension", name: "Vocabulary extension", description: "Adding new language-specific tokens to an existing model's vocabulary, with new embedding rows that must be learned through continued pretraining. Lowers fertility; costs parameters and training.", competency: "sh-research", related: ["sh09.continued-pretraining", "sh09.fertility"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "How tokenizers cut text, and why Arabic pays more",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Tokenisation is the most concrete, cheapest-to-study research question Suhail's research arm can own. A fertility study across Gulf, Egyptian, Levantine and Maghrebi text needs no GPUs, only careful data and arithmetic, and the answer tells every Arab builder how much more they pay per sentence than an English user of the same API. It is also where vendor claims are easiest to check: "our model is efficient for Arabic" is a number you can measure in an afternoon.`,
        },
        {
          kind: "md",
          md: md`### BPE in one paragraph

**Byte-pair encoding** learns a vocabulary from data. Start with every character (or every byte) as a token. Count every adjacent pair in the training corpus, merge the most frequent pair into a new token, record the merge, repeat until the vocabulary has the target size (32 K to 256 K for modern LLMs). To tokenise new text, apply the merges in the same order. **Byte-level BPE** starts from the 256 byte values, so any string can be encoded: nothing is ever out of vocabulary, but unseen text falls back to bytes.

A toy Arabic corpus: كتب (5 times), كتاب (3 times), مكتب (2 times). Starting from letters:

| Step | Pair counts (top) | Merge | Result |
|---|---|---|---|
| 1 | ك+ت: 10, ت+ب: 7, ت+ا: 3, ا+ب: 3, م+ك: 2 | ك+ت | كت appears in all three words |
| 2 | كت+ب: 7, كت+ا: 3, ا+ب: 3, م+كت: 2 | كت+ب | كتب is now one token; مكتب is م + كتب |
| 3 | كت+ا: 3, ا+ب: 3 (tie), م+كتب: 2 | first of the tied pairs, by the implementation's tie-break | كتاب stays split into two or three pieces |

BPE discovered the frequent string كتب, but كتاب (book) shares the root k-t-b only through **interleaving**: the letters ك ت ب with ا inserted. A tokenizer that merges only adjacent strings cannot represent "same root, different pattern"; the model has to learn that relationship from context.

### Unigram

The **unigram LM** tokenizer (Kudo 2018, usually via SentencePiece) works the other way: start with a large set of candidate substrings, fit a probability to each, and repeatedly drop the tokens whose removal hurts the corpus likelihood least. A word is segmented into the most probable sequence of tokens. Unigram tends to produce more linguistically plausible pieces and allows sampling alternative segmentations during training (subword regularisation). Both BPE and unigram are frequency-driven: **what is frequent in the tokenizer's training data gets short codes**. A tokenizer trained on 95 % English gives Arabic long codes.

### Why Arabic fragments

- **Clitics**: وسيكتبونها (wa-sa-yaktubūna-hā, "and they will write it") is one whitespace word carrying five English words: conjunction و, future marker س, verb with person marker, object pronoun ها. Fertility per word is therefore naturally higher than English even for a perfect tokenizer. Compare languages on **parallel text** (tokens for the same content) rather than per word: that ratio is the **tokenisation premium**.
- **Root and pattern**: verbs and nouns are built by placing a three- or four-letter root into a pattern (كتب، كاتب، مكتوب، كتابة، مكتبة). Adjacent-merge tokenizers see unrelated strings.
- **UTF-8 bytes**: each Arabic letter is 2 bytes in UTF-8 (English letters are 1). With byte-level BPE and few Arabic merges, a five-letter word can cost up to 10 tokens.
- **Diacritics** (harakat, U+064B to U+0652) are separate combining characters. Natural text uses few; Quranic, poetic, educational and children's text uses many. Full diacritisation sharply increases fragmentation and hurts model performance, while the light diacritisation of normal text is handled well (Inoue, Alhafni, Habash, Baldwin, Findings of EACL 2026).
- **Orthographic variation and normalisation**: alef forms (أ إ آ ا), taa marbuta versus haa (ة/ه), alef maqsura versus yaa (ى/ي), tatweel (ـ), Persian versus Arabic yaa and kaf, Eastern Arabic digits (٠ to ٩). Normalising merges variants (fewer distinct strings, lower fertility) but destroys information (hamza distinguishes words), so it is a design decision to document.
- **Dialects**: no standard spelling (Gulf شلونك, Egyptian إزيك, the same word spelled three ways on social media), plus **Arabizi** in Latin letters with digits for missing sounds (3 for ع, 7 for ح), plus code-switching with English and French. Each variant spreads the same word across different token sequences, so each is rarer and gets longer codes.

### The fertility arithmetic`,
        },
        { kind: "equation", formula: "sh09-fertility" },
        { kind: "equation", formula: "sh09-token-cost" },
        { kind: "equation", formula: "sh09-effective-context" },
        {
          kind: "md",
          md: md`Fertility multiplies four things at once:

1. **Serving cost and latency**: per-token pricing and per-token generation time.
2. **Context**: a fixed token window holds $1/F$ as many words. Attention compute scales with the square of sequence length, so the attention part of a long Arabic document costs about $F^2$ relative to a low-fertility encoding.
3. **Training efficiency**: a fixed budget of training tokens covers $1/F$ as many Arabic words, so the model sees less Arabic content per FLOP.
4. **Learning difficulty**: the model must assemble words from more, less meaningful pieces.

### Fixing it: vocabulary extension

Labs adapting an English-centric base model to Arabic often train a new Arabic tokenizer, add its new tokens to the vocabulary, initialise the new embedding rows (for example as the mean of the old pieces they replace), and continue pretraining so the new rows are learned.`,
        },
        { kind: "equation", formula: "sh09-embedding-params" },
        {
          kind: "chart",
          chart: "bar",
          title: "Illustrative fertility by text type and tokenizer (tokens per word)",
          xKey: "text",
          yLabel: "Tokens per word",
          series: [
            { key: "generic", label: "English-centric tokenizer" },
            { key: "adapted", label: "Arabic-adapted tokenizer" },
          ],
          data: [
            { text: "English prose", generic: 1.3, adapted: 1.4 },
            { text: "MSA news", generic: 3.0, adapted: 1.6 },
            { text: "Gulf dialect social media", generic: 3.4, adapted: 2.0 },
            { text: "Fully diacritised MSA", generic: 6.0, adapted: 3.5 },
          ],
          caption: "Illustrative values chosen to show the pattern, not measurements. The direction is well established (more Arabic merges lower Arabic fertility; dialects and full diacritics raise it); the magnitudes differ by tokenizer and must be measured. The community Arabic Tokenizers Leaderboard on Hugging Face publishes measured comparisons.",
        },
        { kind: "xref", to: "m14.tokens", note: "Track 0 introduces tokens and the planning rule of about 2 tokens per Arabic word for a user. Here you measure it instead of assuming it." },
        { kind: "sources", refs: ["sh09-r6", "sh09-r7", "sh09-r8", "sh09-r9", "sh09-r10", "sh09-r11", "sh09-r12", "sh09-r13"] },
      ],
    },
    {
      layer: "applied",
      title: "Turning fertility into money, context and compute",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Two tokenizers, one Arabic workload",
          given: md`An Arab startup in a Suhail hackathon summarises **50 million Arabic words a month** (MSA and Gulf mixed) through an API priced at an illustrative **USD 2 per million input tokens**. Model X has fertility **3.0** on their text; model Y, with an Arabic-adapted tokenizer, **1.6**. Both have an **8,192-token** context window.`,
          steps: [
            { md: md`**Tokens per month**: X: $50\text{ M} \times 3.0 = 150$ M tokens. Y: $50\text{ M} \times 1.6 = 80$ M tokens.` },
            { md: md`**Input cost**: X: $150 \times 2 = $ USD 300 a month. Y: $80 \times 2 = $ USD 160. Same text, 1.875 times the bill on X.` },
            { md: md`**Words per context window**: X: $8{,}192 / 3.0 = 2{,}731$ words. Y: $8{,}192/1.6 = 5{,}120$ words. A 4,000-word report fits whole in Y and must be chunked for X.` },
            { md: md`**Attention compute** on a full window of the same text: the sequence is $3.0/1.6 = 1.875$ times longer on X, so the attention part costs about $1.875^2 = 3.5$ times more, and the rest (feed-forward layers) about 1.875 times more.` },
          ],
          result: md`At equal per-token prices, fertility 3.0 versus 1.6 costs 1.875 times more, fits 47 % fewer words per window and up to 3.5 times the attention compute. Per-token price comparisons between models are meaningless without fertility on **your** text.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Should we extend the vocabulary before continued pretraining?",
          given: md`A research proposal: continue pretraining a 7B English-centric model ($d_{\text{model}} = 4{,}096$, untied input and output embeddings) on a corpus of **30 B Arabic words**. Current fertility on that corpus is **3.0**; with **32,000** added Arabic tokens it would be **1.6** (both measured on a sample; illustrative).`,
          steps: [
            {
              md: md`Added parameters: $\Delta P = 2 \times 32{,}000 \times 4{,}096 = 262$ M, about 3.7 % of 7 B.`,
              hidden: true,
              check: { prompt: "Parameters added (millions)", answer: 262.1, unit: "M", tolerance: { rel: 0.01 } },
            },
            { md: md`Tokens to cover the corpus once: without extension $30 \times 3.0 = 90$ B tokens; with extension $30 \times 1.6 = 48$ B tokens.` },
            {
              md: md`Training compute is proportional to tokens (Lesson 3: $C \approx 6ND$), so one pass over the corpus needs $1 - 48/90 = 47$ % less compute with the extended vocabulary.`,
              hidden: true,
              check: { prompt: "Compute saving for one pass (%)", answer: 46.7, unit: "%", tolerance: { abs: 0.5 } },
            },
          ],
          result: md`Extension adds 262 M untrained parameters but cuts the compute to cover the corpus by about 47 %, and the saving continues at inference for every user. The new embeddings need enough Arabic tokens to train (tens of billions is comfortable). Ask for an ablation: a short run with and without extension, compared on the same Arabic validation text in **bits per word**, not loss per token.`,
        },
        {
          kind: "question",
          question: {
            id: "sh09-l02-p1",
            type: "numeric",
            prompt: md`A model has a 32,768-token context. On Egyptian Arabic text its fertility is 2.6. How many Egyptian Arabic words fit in the window (round to the nearest word)?`,
            answer: 12603,
            tolerance: { abs: 2 },
            unit: "words",
            explanation: md`$32{,}768 / 2.6 = 12{,}603$ words. Remember to subtract the instructions and the output from the window before deciding what fits.`,
            concepts: ["sh09.fertility"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Measuring tokenizers properly",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

A tokenizer study is a measurement, so it needs the same discipline as any measurement: a fixed sample per variety, a documented normalisation, and comparable metrics.

- **Samples**: at least a few thousand sentences each of MSA news, MSA formal (government, legal), Gulf, Egyptian, Levantine, Maghrebi, Iraqi social text, Arabizi, fully diacritised text, and code-switched text. Record source and licence of every sample (Lesson 6).
- **Metrics**: fertility per variety; tokenisation premium on parallel text against English; share of words split into more than one token (continued-word proportion); bytes per token; and for model comparisons, bits per word or per byte on the same text.
- **Tools**: the Hugging Face tokenizers library loads any open model's tokenizer; the community Arabic Tokenizers Leaderboard shows comparisons; API providers expose token-counting endpoints.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Ways tokenizer comparisons mislead",
          md: md`- **One blended number** hides that dialect or diacritised fertility is double MSA fertility.
- **Per-word comparison across languages** penalises Arabic for clitics that English writes as separate words; use parallel text for cross-language claims.
- **Loss per token across tokenizers**: lower loss can just mean shorter, easier tokens. Compare bits per word.
- **Normalised samples** (diacritics stripped, alef unified) measured against raw production text.
- **Vendor-selected text**: always measure on your own sample.`,
        },
        {
          kind: "checklist",
          title: "Before you accept a fertility claim",
          items: [
            "Which text, which variety, how many sentences, what source?",
            "Raw or normalised text, and which normalisation rules?",
            "Fertility per variety, not blended",
            "Tokenisation premium against English on parallel text, if a cross-language claim is made",
            "Tokenizer version pinned (model name and revision)",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh09-l02-p2",
            type: "short",
            prompt: md`Write the **protocol for Suhail's first research note: "The Arabic token tax"**. It should compare the tokenizers of at least four open models used in the region and two commercial APIs across Arabic varieties. Specify the samples (varieties, size, sources and licences), the normalisation policy, the metrics with formulas, how you will turn the results into a cost statement builders understand, and what you will publish (data, code, licence).`,
            rubric: [
              "Covers several varieties separately (MSA, at least three dialect groups, Arabizi, diacritised text) with sample sizes in the thousands of sentences each",
              "States a normalisation policy explicitly and measures raw text as builders send it",
              "Defines fertility and tokenisation premium on parallel text, and avoids comparing loss per token",
              "Converts results into cost and context statements (for example cost per 1,000 Arabic words relative to English at equal per-token price, words per 8K window)",
              "Names tokenizer versions and sources and licences for every sample; plans to publish code and sample data under open licences only where rights allow",
              "Assigns roles and a realistic volunteer timeline",
            ],
            modelAnswer: md`**Protocol: The Arabic token tax (Suhail Research Note 1)**

**Question**: how many more tokens, and therefore how much more money and context, does Arabic cost than English across the tokenizers Arab builders use?

**Tokenizers**: open models Jais 2, Falcon-H1 Arabic, ALLaM-7B-Instruct-preview, Fanar-1-9B, plus one global open model (for example a Llama or Qwen family model); two commercial APIs via their token-count endpoints. Pin each by name, revision and date.

**Samples** (raw, as builders send it): 3,000 sentences each of MSA news, MSA government text, Gulf, Egyptian, Levantine, Maghrebi social text, Arabizi, and fully diacritised educational text; plus a 1,000-sentence English and Arabic parallel set. Sources: openly licensed corpora where possible (record licence per sample); dialect sentences contributed by Suhail members with written consent and CC BY 4.0. No scraped personal posts.

**Normalisation**: none for the headline numbers (production text). A secondary table with a documented normalisation (alef, yaa, taa marbuta, tatweel, diacritics stripped) to show its effect.

**Metrics**: fertility $F = N_{\text{tokens}}/N_{\text{words}}$ per variety; tokenisation premium = tokens of the Arabic side divided by tokens of the English side on the parallel set; share of words split into 2 or more tokens; bytes per token. Bootstrap 95 % intervals over sentences.

**Builder translation**: for each tokenizer, the cost of 1,000 Arabic words relative to 1,000 English words at equal per-token price, and words per 8K window per variety.

**Publish**: code (Apache-2.0), contributed sentences (CC BY 4.0), aggregated results, and a datasheet. Third-party samples: publish only identifiers and scripts where licences do not permit redistribution.

**Team and time**: one lead engineer, two data volunteers, four dialect reviewers; six weeks part-time; reviewed by the research lead before release.`,
            explanation: md`A good protocol treats fertility as a measurement: per-variety samples, explicit normalisation, cross-language claims on parallel text, a cost translation builders understand, and licence-clean publication.`,
            concepts: ["sh09.fertility", "sh09.diacritics-dialects", "sh09.arabic-morphology-tokens"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a Suhail newsletter reader why the same Arabic paragraph can cost twice as much as its English translation in an AI API, and what model builders do about it.",
          keyPoints: [
            "Models read tokens from a fixed vocabulary built from frequent strings in the tokenizer's training data",
            "If that data was mostly English, Arabic gets split into many small pieces (high fertility), sometimes down to bytes",
            "Price, speed and context limits are all per token, so more tokens per word means more cost and less fits",
            "Fixes: tokenizers trained with lots of Arabic, or extending an existing vocabulary and continuing training",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh09-l02-q1",
      type: "mcq",
      prompt: "What does one BPE training step do?",
      options: [
        "Splits the longest token into two",
        "Merges the most frequent adjacent pair of tokens into a new token",
        "Removes the token whose removal least reduces corpus likelihood",
        "Assigns each word its dictionary root",
      ],
      answer: 1,
      explanation: md`BPE merges bottom-up by pair frequency. Removing tokens by likelihood loss is the unigram method. Neither knows about roots.`,
      concepts: ["sh09.bpe", "sh09.unigram-tokenizer"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh09-l02-q2",
      type: "numeric",
      prompt: md`A tokenizer produces 4,200 tokens on a 1,500-word Gulf Arabic sample. What is its fertility?`,
      answer: 2.8,
      tolerance: { abs: 0.01 },
      unit: "tokens/word",
      explanation: md`$4{,}200/1{,}500 = 2.8$ tokens per word.`,
      concepts: ["sh09.fertility"],
      difficulty: 1,
    },
    {
      id: "sh09-l02-q3",
      type: "multi",
      prompt: "Which features of Arabic text raise token counts with a frequency-based tokenizer?",
      options: [
        "Attached clitics (conjunctions, prepositions, pronouns)",
        "Full diacritisation with short-vowel marks",
        "Non-standard dialect spelling and Arabizi",
        "Right-to-left display direction",
        "Two-byte UTF-8 encoding of each letter when few Arabic merges exist",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Display direction is a rendering property; tokens are stored in logical order and direction does not affect tokenisation. The others all increase fragmentation.`,
      concepts: ["sh09.arabic-morphology-tokens", "sh09.diacritics-dialects"],
      difficulty: 2,
    },
    {
      id: "sh09-l02-q4",
      type: "numeric",
      prompt: md`You add 48,000 tokens to a model with $d_{\text{model}} = 5{,}120$ and tied embeddings. How many parameters are added (millions)?`,
      answer: 245.76,
      tolerance: { rel: 0.01 },
      unit: "M",
      explanation: md`Tied: $k = 1$. $48{,}000 \times 5{,}120 = 245.76$ M. Untied would double it.`,
      concepts: ["sh09.vocab-extension"],
      difficulty: 2,
    },
    {
      id: "sh09-l02-q5",
      type: "decision",
      prompt: "A vendor at Suhail Season says: \"Our model has the lowest loss on Arabic of any open model.\" Their tokenizer has much higher Arabic fertility than competitors. What is the right response?",
      options: [
        { text: "Ask for bits per word (or a downstream benchmark) on a shared Arabic text, because loss per token is not comparable across tokenizers", score: 1, feedback: "Right. More, smaller tokens are individually easier to predict; per-token loss can fall while the model is no better." },
        { text: "Accept it: lower loss is always better", score: 0, feedback: "Only within one tokenizer and one evaluation text." },
        { text: "Ask for perplexity instead", score: 0.2, feedback: "Perplexity is just exp(loss) and has the same problem." },
        { text: "Ask how many parameters the model has", score: 0.1, feedback: "Useful context, but it does not address the comparability problem." },
      ],
      explanation: md`Normalise by a tokenizer-independent unit: total bits over the same text divided by words or bytes.`,
      concepts: ["sh09.fertility", "sh09.pretraining-objective"],
      difficulty: 2,
    },
    {
      id: "sh09-l02-q6",
      type: "mcq",
      prompt: "Why can a merge-based tokenizer not capture that كتاب and مكتوب share a root?",
      options: [
        "Because the root letters are interleaved with pattern letters rather than forming one contiguous substring",
        "Because Arabic has no roots",
        "Because tokenizers ignore the letter ك",
        "Because both words are always split into bytes",
      ],
      answer: 0,
      explanation: md`Root-and-pattern morphology is non-concatenative: ك ت ب are separated by other letters, and merges only join adjacent strings.`,
      concepts: ["sh09.arabic-morphology-tokens"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh09-l02-f1", front: "BPE versus unigram", back: "BPE merges frequent pairs bottom-up; unigram prunes a large candidate set top-down by likelihood. Both favour what was frequent in their training text.", concepts: ["sh09.bpe", "sh09.unigram-tokenizer"] },
    { id: "sh09-l02-f2", front: "Fertility", back: md`$F = N_{\text{tokens}}/N_{\text{words}}$, measured per language variety.`, concepts: ["sh09.fertility"] },
    { id: "sh09-l02-f3", front: "Effective context in words", back: md`$W = L_{\text{ctx}}/F$: 8,192 tokens at $F = 3.0$ is about 2,700 words.`, concepts: ["sh09.fertility"] },
    { id: "sh09-l02-f4", front: "Tokenisation premium", back: "Tokens for a text in language X divided by tokens for the same content in English (parallel text). Fair cross-language comparison.", concepts: ["sh09.fertility"] },
    { id: "sh09-l02-f5", front: "Vocabulary extension parameters", back: md`$\Delta P = k\,\Delta V\,d_{\text{model}}$; 32 K tokens at $d = 4096$, untied: 262 M.`, concepts: ["sh09.vocab-extension"] },
    { id: "sh09-l02-f6", front: "Full diacritics and tokenizers", back: "Full diacritisation sharply raises fragmentation and hurts performance; light natural diacritics are handled fine (Findings of EACL 2026).", concepts: ["sh09.diacritics-dialects"] },
    { id: "sh09-l02-f7", front: "Arabizi", back: "Arabic (often dialect) written in Latin letters with digits for missing sounds (3 for ع, 7 for ح).", concepts: ["sh09.diacritics-dialects"] },
  ],
};

export default lesson;
