import { md, type Question } from "../../schema";

const exam: Question[] = [
  {
    id: "sh09-x1",
    type: "numeric",
    prompt: md`A team will continue pretraining a 9 B model on a corpus of 40 B Arabic words, one pass. With their extended vocabulary the fertility is 1.6. At 35 % MFU on H100s (989 TFLOP/s dense BF16), how many GPU-hours is the clean run?`,
    answer: 2773,
    tolerance: { rel: 0.02 },
    unit: "GPU-h",
    explanation: md`Tokens: $40\text{ B} \times 1.6 = 64$ B. $C = 6 \times 9\text{e}9 \times 6.4\text{e}10 = 3.456 \times 10^{21}$ FLOP. GPU-hours $= 3.456\text{e}21/(0.35 \times 989\text{e}12 \times 3{,}600) = 2{,}773$. About USD 6,900 at an illustrative USD 2.50 per hour, before overhead. At fertility 3.0 the same corpus would need 120 B tokens and 1.875 times the compute.`,
    concepts: ["sh09.fertility", "sh09.train-compute", "sh09.mfu"],
    difficulty: 3,
  },
  {
    id: "sh09-x2",
    type: "decision",
    prompt: md`A regional lab's press release says its new 7B "outperforms all open Arabic models", citing a 1.2-point lead on a public leaderboard whose test sets are on the web. Suhail's newsletter editor wants to run it as the lead story. What do you advise?`,
    options: [
      { text: "Run it as a claim, with the item counts and intervals, a note that the test sets are public (contamination risk), and an offer to evaluate the model on Suhail's private held-out set", score: 1, feedback: "Reports the news accurately without endorsing a gap that may be noise or contamination." },
      { text: "Run the headline as written", score: 0.1, feedback: "Suhail would be endorsing a claim it has not checked." },
      { text: "Do not cover it", score: 0.3, feedback: "It is news for builders; the job is to report it accurately, not to ignore it." },
      { text: "Run it and add that leaderboards are useless", score: 0.2, feedback: "Overstated; leaderboards are informative when gaps exceed their error bars." },
    ],
    explanation: md`Two checks before amplifying any benchmark claim: is the gap larger than its (paired) error bar, and could the test items have leaked into training data?`,
    concepts: ["sh09.eval-statistics", "sh09.contamination", "sh09.arabic-benchmarks"],
    difficulty: 2,
  },
  {
    id: "sh09-x3",
    type: "multi",
    prompt: "A Gulf startup serves an Arabic chat assistant. Which changes reduce its serving cost per conversation, other things equal?",
    options: [
      "Switching to a model whose tokenizer has lower fertility on Gulf Arabic",
      "Switching to a smaller model over-trained to similar quality",
      "Quantising weights from BF16 to 4-bit, if quality holds on their evaluation",
      "Switching to a model with higher fertility but a larger context window",
      "Fully diacritising user input before sending it",
    ],
    answer: [0, 1, 2],
    explanation: md`Lower fertility cuts tokens, KV cache and attention compute; a smaller model cuts FLOP per token ($2N$) and memory; quantisation cuts memory and often latency. Higher fertility and full diacritisation increase token counts.`,
    concepts: ["sh09.fertility", "sh09.over-training", "sh09.kv-cache"],
    difficulty: 2,
  },
  {
    id: "sh09-x4",
    type: "numeric",
    prompt: md`You want a new Arabic benchmark to detect a 3-point accuracy difference between two models near 60 % accuracy, unpaired, at 95 % confidence and 80 % power. About how many items are needed?`,
    answer: 4181,
    tolerance: { rel: 0.02 },
    unit: "items",
    explanation: md`$n = (1.96 + 0.84)^2 \times 2 \times 0.6 \times 0.4 / 0.03^2 = 7.84 \times 0.48/0.0009 = 4{,}181$. A paired design on the same items reduces this, depending on how often the models disagree.`,
    concepts: ["sh09.eval-statistics"],
    difficulty: 2,
  },
  {
    id: "sh09-x5",
    type: "order",
    prompt: "Order the steps for building and releasing a trustworthy dialect benchmark.",
    items: [
      "Define the construct and item types",
      "Write consent and licence terms for item writers",
      "Pilot 100 items and measure writer speed and reviewer agreement",
      "Write and cross-review the full item set",
      "Run contamination checks and split into public dev and private test",
      "Release the dev set, datasheet and scoring config; score the test set on a server",
    ],
    explanation: md`Construct first; rights before anyone writes; a cheap pilot gate; then the build; contamination controls before release; open method, protected test.`,
    concepts: ["sh09.benchmark-design", "sh09.stage-gates", "sh09.contamination"],
    difficulty: 2,
  },
  {
    id: "sh09-x6",
    type: "decision",
    prompt: md`Lahajat v2 will merge three sources: member contributions (CC BY 4.0 with consent), a university's dialect corpus (CC BY-NC 4.0), and 300,000 scraped public forum posts. The release must be usable for commercial models. What do you decide?`,
    options: [
      { text: "Release only the member contributions under CC BY 4.0; offer the university corpus as a separate non-commercial companion with its own licence; do not redistribute the forum posts", score: 1, feedback: "Keeps the commercial-use release clean and avoids redistributing personal posts." },
      { text: "Merge all three under CC BY 4.0", score: 0, feedback: "You cannot relicense NC data, and the forum posts are not yours to license." },
      { text: "Merge all three under CC BY-NC", score: 0.3, feedback: "Fixes the NC conflict but kills commercial use and still redistributes personal posts." },
      { text: "Merge all three but remove usernames from the forum posts", score: 0.1, feedback: "Does not solve licensing or personal data inside the text." },
    ],
    explanation: md`Collection, training and redistribution rights are separate, and the most restrictive licence in a mix governs it.`,
    concepts: ["sh09.data-rights", "sh09.data-consent"],
    difficulty: 2,
  },
  {
    id: "sh09-x7",
    type: "numeric",
    prompt: md`Two candidate models reach the same quality: a 40 B model trained with $0.9 \times 10^{23}$ FLOP and a 12 B model trained with $1.5 \times 10^{23}$ FLOP. Above what lifetime inference volume (trillions of tokens) is the 12 B model cheaper in total compute?`,
    answer: 1.07,
    tolerance: { rel: 0.02 },
    unit: "T tokens",
    explanation: md`$D_{\text{inf}} = (1.5 - 0.9)\times10^{23}/(2 \times (40 - 12)\times10^{9}) = 6\times10^{22}/5.6\times10^{10} = 1.07\times10^{12}$ tokens. A national-scale assistant passes that quickly; a research demo never does.`,
    concepts: ["sh09.over-training", "sh09.train-compute"],
    difficulty: 3,
  },
  {
    id: "sh09-x8",
    type: "short",
    prompt: md`A volunteer submits this proposal: "Suhail-Darija: continue pretraining Falcon-H1 Arabic 34B on 50 B tokens of Moroccan Darija scraped from social media, full fine-tune on 16 H100s, evaluate on OALL, release weights under Apache-2.0." Write your **review** (half a page): go, reshape or stop, with the arithmetic and the specific changes you require.`,
    rubric: [
      "Data: checks that 50 B tokens of Darija is far beyond plausible unique supply (small dialects are millions to low billions of tokens) and that scraped social posts raise rights and personal-data problems",
      "Compute: 6 × 34e9 × 5e10 ≈ 1.0e22 FLOP, about 7,200 H100-hours at 40 % MFU (about 450 hours on 16 GPUs); memory 16 × 34 B = 544 GB of state, fits on 16 × 80 GB only with sharding",
      "Evaluation: OALL does not measure Darija well; requires a native Darija evaluation set with intervals and contamination checks",
      "Licence: the base model is under the Falcon LLM License, so weights cannot simply be relicensed as Apache-2.0; must check the base licence terms",
      "Reshapes into a stage-gated plan (consented Darija collection and a Darija benchmark first, then a LoRA or smaller model pilot) with kill criteria",
    ],
    modelAnswer: md`**Review: Suhail-Darija. Verdict: reshape.**

**Data (blocking)**: 50 B tokens of Darija does not exist as unique, clean text; small varieties are measured in millions to low billions of tokens. Reaching 50 B means extreme repetition (memorisation) or scraping on a scale we cannot clear for rights or personal data. Scraped social posts cannot be redistributed and may not be lawful to process without a basis.

**Compute**: $6 \times 34\text{e}9 \times 5\text{e}10 = 1.02 \times 10^{22}$ FLOP, about 7,200 H100-hours at 40 % MFU (about USD 18,000 at an illustrative USD 2.50/h, before overhead), about 450 hours of wall clock on 16 GPUs. State memory $16 \times 34 = 544$ GB against 1,280 GB: feasible with FSDP and checkpointing. Compute is not the problem; data is.

**Evaluation**: OALL measures MSA and some dialects, not Darija generation. Without a native Darija test set with intervals and contamination checks we could not tell if the model improved.

**Licence**: Falcon-H1 Arabic is released under the Falcon LLM License; derivatives must follow its terms, so "Apache-2.0 weights" is not available to us. Read the licence before any work.

**Required plan**: Gate 1, a consented Darija sentence collection (target 200,000 sentences, contributor CC BY 4.0) and a 1,500-item native Darija benchmark with a private test set. Gate 2, LoRA SFT on a 7B to 9B base with native Darija instructions, paired evaluation against the base. Gate 3, only if Gate 2 shows a significant gain and we hold at least 1 B unique licensed Darija tokens: a small continued-pretraining pilot. Kill if the benchmark's reviewer agreement stays below kappa 0.6 or collection stalls below 50,000 sentences by month four.`,
    explanation: md`An integrative review checks data, compute, memory, evaluation and licence in that order and reshapes the project into gates rather than rejecting the volunteer.`,
    concepts: ["sh09.proposal-review", "sh09.dialect-mix", "sh09.cost-ladder", "sh09.open-release"],
    difficulty: 3,
  },
  {
    id: "sh09-x9",
    type: "mcq",
    prompt: "A DPO run's loss falls from 0.69 to 0.40, but the model's answers get longer and more repetitive. What is the most likely cause?",
    options: [
      "The learning rate is too low",
      "The chosen responses in the preference data are systematically longer than the rejected ones, so the model learned length rather than quality",
      "DPO cannot reduce loss below 0.69",
      "The tokenizer changed",
    ],
    answer: 1,
    explanation: md`Preference tuning optimises whatever distinguishes chosen from rejected. If length is the easiest signal, the model learns verbosity. Audit pairs for length balance and use length-controlled judging.`,
    concepts: ["sh09.preference-tuning", "sh09.llm-judge"],
    difficulty: 2,
  },
  {
    id: "sh09-x10",
    type: "numeric",
    prompt: md`What is the minimum number of 80 GB GPUs needed just to hold the mixed-precision Adam training state (weights, gradients, optimiser) of a 34 B model, before activations?`,
    answer: 7,
    tolerance: { abs: 0 },
    unit: "GPUs",
    explanation: md`$16 \times 34\text{e}9 = 544$ GB; $544/80 = 6.8$, so 7 GPUs, and in practice 8 or more once activations and buffers are added. LoRA or QLoRA avoids this: about 68 GB (BF16) or about 17 GB (4-bit) of frozen weights.`,
    concepts: ["sh09.training-memory", "sh09.peft"],
    difficulty: 2,
  },
  {
    id: "sh09-x11",
    type: "decision",
    prompt: md`It is 2027 and the research arm has 150 GPU-hours of credits, 20 volunteers and no released work yet. Which first project do you approve?`,
    options: [
      { text: "The Arabic token tax study plus a 100-item pilot of the Gulf dialect benchmark", score: 1, feedback: "Cheap, publishable within weeks, builds the method and the volunteer team, and uses almost no credits." },
      { text: "A continued-pretraining run on whatever Arabic text the volunteers can scrape", score: 0.1, feedback: "Not enough compute, no rights-cleared data, no evaluation to show it worked." },
      { text: "A Suhail leaderboard on public benchmarks", score: 0.4, feedback: "Duplicates OALL and invites contamination; better after a private test set exists." },
      { text: "Wait until a large compute sponsor appears", score: 0.2, feedback: "The binding constraint is people and method, which you can start building now." },
    ],
    explanation: md`Start in the low-compute, high-leverage quadrant with a gate that produces a public result quickly.`,
    concepts: ["sh09.research-portfolio", "sh09.stage-gates"],
    difficulty: 2,
  },
];

export default exam;
