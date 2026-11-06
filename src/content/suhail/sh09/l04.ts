import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh09-l04",
  title: "Compute cost arithmetic: FLOPs, GPU-hours, memory and budgets",
  summary:
    "Any training plan can be priced from four numbers: parameters, tokens, GPU peak throughput and utilisation (MFU). Memory decides how many GPUs you need regardless of time: 16 bytes per parameter for mixed-precision Adam, plus activations, plus the KV cache at inference. This lesson builds the cost ladder from a LoRA fine-tune (a few dollars of compute) through continued pretraining (thousands) to pretraining from scratch (hundreds of thousands to millions), with every number derived and every price labelled illustrative.",
  minutes: 85,
  objectives: [
    "Convert a training plan (N, D) into FLOPs, GPU-hours, wall-clock days and cost from peak throughput and MFU",
    "Compute training memory for weights, gradients and Adam states, and explain why sharding is needed",
    "Estimate activation memory and the effect of fused attention and checkpointing",
    "Compute inference memory: weights at different precisions and the KV cache",
    "Build and challenge a budget for fine-tuning, continued pretraining and pretraining from scratch",
  ],
  concepts: [
    { id: "sh09.mfu", name: "Model FLOPs utilisation (MFU)", description: "Share of the GPUs' peak throughput spent on useful model FLOP (6N per token). Converts FLOP into GPU-hours; 35 to 50 % is good for large dense training.", competency: "sh-research", related: ["sh09.train-compute"] },
    { id: "sh09.training-memory", name: "Training memory (16 bytes per parameter)", description: "Mixed-precision Adam stores BF16 weights and gradients plus FP32 master weights and two moments: about 16 bytes per parameter, before activations. Forces sharding (ZeRO, FSDP) above a few billion parameters.", competency: "sh-research", related: ["sh09.mfu"] },
    { id: "sh09.activation-memory", name: "Activation memory", description: "Intermediate values stored for the backward pass; grows with sequence length, batch and hidden size, and with the square of sequence length for unfused attention. Reduced by fused attention and activation checkpointing.", competency: "sh-research", related: ["sh09.training-memory"] },
    { id: "sh09.kv-cache", name: "KV cache", description: "At inference, keys and values of all previous tokens are kept per layer so they are not recomputed; memory grows linearly with context length and concurrent users.", competency: "sh-research", related: ["sh09.fertility"] },
    { id: "sh09.peft", name: "Parameter-efficient fine-tuning (LoRA, QLoRA)", description: "Freezing the base model and training small low-rank adapter matrices (LoRA), optionally over a 4-bit quantised base (QLoRA). Cuts memory to roughly the frozen weights plus small adapters, so a 7B to 9B model can be tuned on one GPU.", competency: "sh-research", related: ["sh09.sft"] },
    { id: "sh09.cost-ladder", name: "The cost ladder", description: "Fine-tuning, continued pretraining and pretraining from scratch differ by roughly two to three orders of magnitude each in compute. Placing a proposal on the ladder is the first budget check.", competency: "sh-research", related: ["sh09.mfu", "sh09.continued-pretraining"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From FLOP to GPU-hours to memory",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail's research arm will run on donated or discounted compute and volunteer time. Sponsors offer "credits"; volunteers propose runs; journalists ask what a sovereign model cost. With this arithmetic you can tell a USD 5 experiment from a USD 400,000 one before anyone books GPUs, ask for the measured MFU instead of trusting a slide, and know whether a credit offer covers a real project or only demos.`,
        },
        {
          kind: "md",
          md: md`### Time and money

Training compute is $6ND$ FLOP (Lesson 3). A GPU does at most its **peak** dense throughput; real training gets a fraction, the **MFU**:`,
        },
        { kind: "equation", formula: "sh09-gpu-hours" },
        { kind: "equation", formula: "sh09-mfu" },
        {
          kind: "md",
          md: md`Reference hardware for this module: **NVIDIA H100 SXM, about 989 TFLOP/s dense BF16**. Datasheets also quote a figure twice as high "with sparsity"; it is not used for training estimates. Newer GPUs (B200, GB200, GB300 in the Stargate UAE build-out) are faster per chip; the method is identical, only $P_{\text{peak}}$ and the price change.

What lowers MFU: small models (communication dominates), long sequences, slow interconnect between nodes, poorly tuned parallelism, data-loading stalls, frequent checkpoints, and failures that force restarts. A team that reports 45 % MFU on a 7B with a modern stack is doing well; 25 % is common for a first run.

### Memory: why you need many GPUs even with time to spare

Training with Adam in mixed precision stores, per parameter:

| Item | Precision | Bytes |
|---|---|---|
| Weights (used in forward and backward) | BF16 | 2 |
| Gradients | BF16 | 2 |
| Master copy of weights | FP32 | 4 |
| Adam first moment (momentum) | FP32 | 4 |
| Adam second moment (variance) | FP32 | 4 |
| **Total** | | **16** |`,
        },
        { kind: "equation", formula: "sh09-train-memory" },
        {
          kind: "md",
          md: md`A 7B model needs 112 GB of state; an H100 has 80 GB. ZeRO (stage 1 to 3) and PyTorch FSDP **shard** these states across GPUs, so each GPU holds $16N/n_{\text{GPU}}$ plus its share of activations. Tensor and pipeline parallelism split the model itself across GPUs for very large models.

**Activations** are the intermediate values kept for the backward pass:`,
        },
        { kind: "equation", formula: "sh09-activation-memory" },
        {
          kind: "md",
          md: md`For a 7B-class model ($h = 4{,}096$, $a = 32$, 32 layers) at $s = 4{,}096$, $b = 1$: per layer $4{,}096 \times 4{,}096 \times (34 + 5 \times 32 \times 4{,}096/4{,}096) = 16.8\text{ M} \times 194 = 3.25$ GB; over 32 layers **104 GB**. With fused attention (no stored score matrices) it is $34\,sbh = 0.57$ GB per layer, **18 GB** total. With full activation checkpointing only each layer's input is kept: $2\,sbh \times 32 = 1.1$ GB, at the price of recomputing the forward pass (MFU counts only the useful FLOP, so recomputation lowers MFU).

### Inference memory

Weights only: **2 bytes per parameter in BF16**, about 1 byte in 8-bit, about 0.5 in 4-bit. A 70B model is 140 GB in BF16 (two 80 GB GPUs) or about 35 GB in 4-bit (one GPU, with some quality loss to measure). On top comes the **KV cache**:`,
        },
        { kind: "equation", formula: "sh09-kv-cache" },
        {
          kind: "md",
          md: md`An 8B-class model with grouped-query attention (32 layers, 8 KV heads of dimension 128, BF16) stores 128 KiB per token: an 8,192-token conversation is 1 GiB, and 32 concurrent users at full context are 32 GiB. Arabic text at fertility 3.0 instead of 1.6 needs 1.9 times as much cache for the same conversation (Lesson 2).

### Fine-tuning is cheap in compute

LoRA freezes the base weights and trains low-rank matrices $\Delta W = BA$ with rank $r$ (8 to 64) on selected layers: a few million to tens of millions of trainable parameters. No optimiser state for the frozen weights, so memory is roughly the BF16 weights (16 GB for 8B) plus adapters and activations; **QLoRA** stores the frozen base in 4-bit (about 4 GB for 8B). Compute per token is about $4N$ instead of $6N$ (no weight gradients for frozen layers). Fine-tuning data is small, so the compute is small: the expensive part is the data.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "The cost ladder: one clean run on H100s at 40 % MFU and an illustrative USD 2.50 per GPU-hour",
          xKey: "run",
          yLabel: "USD thousand",
          series: [{ key: "usd", label: "Compute cost of one clean run (USD thousand)" }],
          data: [
            { run: "LoRA SFT 8B, 50 M tokens", usd: 0.003 },
            { run: "Continued pretraining 7B, 100 B tokens", usd: 7.4 },
            { run: "From scratch 7B, 2 T tokens", usd: 147 },
            { run: "7B, 5.2 T tokens (ALLaM-7B scale)", usd: 383 },
            { run: "From scratch 70B, 2 T tokens", usd: 1475 },
          ],
          caption: "Computed with 6ND (4ND for LoRA) and the GPU-hours formula. Prices are illustrative, not quotes; real programmes cost 2 to 3 times the clean final run (ablations, restarts, evaluations) plus data and people. The LoRA bar is invisible at this scale, which is the point.",
        },
        { kind: "sources", refs: ["sh09-r19", "sh09-r20", "sh09-r21", "sh09-r22", "sh09-r23", "sh09-r24"] },
      ],
    },
    {
      layer: "applied",
      title: "Pricing three proposals",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Fine-tune, continued pretraining, or from scratch",
          given: md`Three proposals reach the research lead. Assume H100 SXM ($P_{\text{peak}} = 989$ TFLOP/s), **MFU 40 %**, an illustrative **USD 2.50 per GPU-hour**, and an overhead factor of 3 for a full programme.
(a) LoRA SFT of an 8B instruct model on 50 M tokens of Arabic instructions.
(b) Continued pretraining of a 7B base on 100 B Arabic tokens.
(c) Pretraining a 7B from scratch on 2 T tokens.`,
          steps: [
            { md: md`**Effective throughput per GPU**: $0.40 \times 989\text{e}12 = 3.96 \times 10^{14}$ FLOP/s, or $1.42 \times 10^{18}$ FLOP per GPU-hour.` },
            { md: md`**(a)** $4ND = 4 \times 8\text{e}9 \times 5\text{e}7 = 1.6 \times 10^{18}$ FLOP, about **1.1 GPU-hours**, under USD 5. Even at 6ND it is 1.7 GPU-hours. Fits on one GPU with LoRA or QLoRA.` },
            { md: md`**(b)** $6 \times 7\text{e}9 \times 1\text{e}11 = 4.2 \times 10^{21}$ FLOP, $4.2\text{e}21 / 1.42\text{e}18 = 2{,}949$ GPU-hours, **USD 7,400** for the clean run; about USD 22,000 with overhead. On 64 GPUs: $2{,}949/64 = 46$ hours, about 2 days.` },
            { md: md`**(c)** $6 \times 7\text{e}9 \times 2\text{e}12 = 8.4 \times 10^{22}$ FLOP, 58,982 GPU-hours, **USD 147,000** clean, about USD 370,000 with overhead (factor 2.5). On 64 GPUs: 38 days of uninterrupted running, which nobody gets on a first attempt.` },
            { md: md`**Memory check for (b) and (c)**: $16 \times 7\text{e}9 = 112$ GB of state; with FSDP over 64 GPUs that is 1.75 GB each, leaving room for activations. For (a) with QLoRA: about 4 GB of weights plus adapters, one GPU.` },
          ],
          result: md`Roughly USD 5, USD 7,000 and USD 150,000 for clean runs: each step up the ladder costs 1,000 times and then 20 times more. For a volunteer research arm, (a) is a weekend; (b) is a sponsored project; (c) is not a Suhail project.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Memory for a bigger model",
          given: md`A partner offers time on a 16-GPU H100 node (80 GB each, 1,280 GB total). The team wants to fully fine-tune (not LoRA) a **70B** model with Adam, and separately serve it.`,
          steps: [
            {
              md: md`Training state: $16 \times 70\text{e}9 = 1.12 \times 10^{12}$ bytes $= 1{,}120$ GB, which is 14 GPUs' worth before a single activation.`,
              hidden: true,
              check: { prompt: "Training state memory (GB)", answer: 1120, unit: "GB", tolerance: { rel: 0.01 } },
            },
            { md: md`Remaining: $1{,}280 - 1{,}120 = 160$ GB for activations across 16 GPUs, 10 GB each: possible only with aggressive checkpointing and short sequences. LoRA or QLoRA is the realistic choice.` },
            {
              md: md`Serving in BF16: $2 \times 70\text{e}9 = 140$ GB of weights, two GPUs plus KV cache; in 4-bit about 35 GB.`,
              hidden: true,
              check: { prompt: "BF16 weight memory for serving (GB)", answer: 140, unit: "GB", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`Full fine-tuning a 70B barely fits one 16-GPU node; LoRA on the same model fits easily. Always do the memory arithmetic before accepting a compute offer: GPU-hours are useless if the job does not fit.`,
        },
        {
          kind: "question",
          question: {
            id: "sh09-l04-p1",
            type: "numeric",
            prompt: md`A team trains a 7B model on 128 H100s and measures 800,000 tokens per second across the cluster. What is their MFU (%)? Use $P_{\text{peak}} = 989$ TFLOP/s.`,
            answer: 26.5,
            tolerance: { abs: 0.3 },
            unit: "%",
            explanation: md`$\text{MFU} = 6 \times 7\text{e}9 \times 8\text{e}5 / (128 \times 989\text{e}12) = 3.36\text{e}16 / 1.266\text{e}17 = 0.265$, so 26.5 %. Respectable for a first run, with room to improve; at 40 % the same job would take two thirds of the time.`,
            concepts: ["sh09.mfu"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Budgets, credits and what they hide",
      blocks: [
        {
          kind: "md",
          md: md`### Where compute comes from for a research arm

- **Cloud credits** from hyperscalers and GPU clouds, typically time-limited and tied to a platform.
- **Academic and national clusters**: university partners, and in the Gulf the sovereign build-outs (HUMAIN in Saudi Arabia, the Stargate UAE cluster, Qai and Brookfield in Qatar, the announced Microsoft AI data centre in Kuwait). Access terms for outside researchers are not public and must be negotiated.
- **Sponsor GPUs** at hackathons: useful for fine-tunes and evaluation, never for pretraining.

### What a real budget includes beyond the final run

1. **Ablations**: small runs to choose data mix, tokenizer, learning rate (often 20 to 50 % of the total).
2. **Failures and restarts**: hardware faults, loss spikes, bad data shards.
3. **Evaluation**: cheap in FLOP, but frequent and needs its own GPUs.
4. **Storage and data processing**: CPU hours for filtering and dedup, terabytes of storage, egress fees when moving data between clouds.
5. **People**: the binding constraint for volunteers. A 2-day GPU run can need 2 months of data work.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How compute claims mislead",
          md: md`- **Sparse peak FLOPs** used for throughput (doubles the apparent speed).
- **HFU quoted as MFU**: counts recomputed activations as useful work.
- **"GPU-hours" without GPU type**: an A100-hour is about a third of an H100-hour in BF16 throughput.
- **Credits that expire** before data preparation is finished.
- **Cost of the final run only**, presented as the cost of the model.`,
        },
        {
          kind: "checklist",
          title: "Compute budget review",
          items: [
            "N, D and C = 6ND written out (4ND for LoRA), with the GPU type and its dense peak",
            "MFU assumption justified by a measured throughput from a short test run",
            "Memory plan: 16N bytes of state, sharding method, activation plan, fits on the offered GPUs",
            "Overhead factor for ablations, failures and evaluation (2 to 3)",
            "Data-processing and storage costs, and egress if data moves between providers",
            "Credit expiry dates against the project timeline",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh09-l04-p2",
            type: "short",
            prompt: md`A GPU cloud offers Suhail an illustrative **USD 25,000 in credits, valid for 6 months**, to "build the first Suhail Arabic model". Write the **compute plan** you would send back: what you would run with it (and what you would not), with the FLOP, GPU-hour and cost arithmetic for each item, the memory check, the overhead, what happens if the credits expire, and what you ask the provider for in return.`,
            rubric: [
              "Rejects pretraining from scratch with arithmetic (for example a 7B on 2 T tokens is about USD 150,000 clean)",
              "Allocates credits to a realistic mix: LoRA fine-tunes, evaluation runs, possibly one small continued-pretraining run, with 6ND or 4ND arithmetic and stated MFU and price",
              "Includes a memory check for each run and names the GPU type",
              "Includes an overhead or contingency and sequences the work so data is ready before credits start ticking",
              "Asks the provider for concrete terms (start date flexibility, expiry, GPU type, support, publication rights, no claim on data or weights)",
              "Labels prices as illustrative or provider-quoted",
            ],
            modelAnswer: md`**Compute plan for the USD 25,000 credit offer (illustrative prices, H100 at USD 2.50 per GPU-hour, 40 % MFU, about 10,000 GPU-hours)**

**What we will not do**: pretrain from scratch. A 7B on 2 T tokens is $8.4\text{e}22$ FLOP, about 59,000 GPU-hours, USD 147,000 for the clean run alone.

**What we will do**
1. **Evaluation harness and baselines** (about 500 GPU-hours, USD 1,250): run 8 open Arabic-capable models (7B to 70B) on OALL v2 tasks and our held-out builder test set, three seeds for generation tasks. 70B in BF16 needs 2 GPUs plus KV cache.
2. **LoRA SFT plus DPO on two 7B to 9B models** (about 100 GPU-hours with many iterations, USD 250): each run is about 1 to 2 GPU-hours ($4ND$ with 50 M tokens), but we budget for 50 runs of hyperparameter and data ablations. QLoRA fits on one GPU.
3. **One continued-pretraining experiment** (about 6,000 GPU-hours, USD 15,000 including overhead): a 7B base on 60 B tokens of licensed Arabic text, $6 \times 7\text{e}9 \times 6\text{e}10 = 2.5\text{e}21$ FLOP, 1,770 GPU-hours clean, run first as a 1B-token pilot to measure MFU. State 112 GB sharded with FSDP across 32 GPUs.
4. **Reserve** (about 3,400 GPU-hours, USD 8,500): failures, re-runs, and evaluation of every checkpoint.

**Sequencing**: no credits are activated until the data for item 3 is filtered, deduplicated, licence-checked and decontaminated (estimated 8 weeks of volunteer work). If the data is not ready by month 3, item 3 is dropped and credits go to more evaluation and fine-tunes.

**What we ask the provider**: activation date chosen by us; written expiry date; H100 or better with a named interconnect; 30 minutes of support a week; the right to publish all results, weights and code under open licences; no claim on our data or weights; acknowledgment wording agreed in advance.`,
            explanation: md`A credible plan places every item on the cost ladder with arithmetic, checks memory, protects against expiry and keeps Suhail's rights.`,
            concepts: ["sh09.cost-ladder", "sh09.mfu", "sh09.training-memory", "sh09.peft"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a sponsor why a model you can fine-tune for the price of a coffee cost its original builders hundreds of thousands of dollars, and why both numbers are honest.",
          keyPoints: [
            "Compute scales with parameters times tokens; pretraining uses trillions of tokens, fine-tuning millions",
            "Fine-tuning reuses everything the base model learned and only adjusts behaviour",
            "LoRA trains a tiny fraction of parameters and needs one GPU",
            "The real cost of a good fine-tune is the data and the people who write and check it",
          ],
        },
        { kind: "xref", to: "fc10.number-checking", note: "Founder Core's number-checking habit applies to every compute estimate: recompute N, D, MFU and price yourself before a figure goes on a slide." },
      ],
    },
  ],
  quiz: [
    {
      id: "sh09-l04-q1",
      type: "numeric",
      prompt: md`How many H100 GPU-hours does a run of $6 \times 10^{21}$ FLOP take at 40 % MFU (peak 989 TFLOP/s)?`,
      answer: 4213,
      tolerance: { rel: 0.01 },
      unit: "GPU-h",
      explanation: md`$6\text{e}21 / (0.40 \times 989\text{e}12 \times 3{,}600) = 6\text{e}21/1.424\text{e}18 = 4{,}213$ GPU-hours.`,
      concepts: ["sh09.mfu"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "sh09-l04-q2",
      type: "numeric",
      prompt: md`Training state memory (weights, gradients, Adam states) for a 13B model in mixed precision, in GB?`,
      answer: 208,
      tolerance: { rel: 0.01 },
      unit: "GB",
      explanation: md`$16 \times 13\text{e}9 = 208$ GB, about 2.6 H100s before activations, so sharding is mandatory.`,
      concepts: ["sh09.training-memory"],
      difficulty: 1,
    },
    {
      id: "sh09-l04-q3",
      type: "mcq",
      prompt: "Which item is NOT part of the 16 bytes per parameter?",
      options: ["BF16 weights", "FP32 master weights", "Adam second moment", "KV cache"],
      answer: 3,
      explanation: md`The KV cache is an inference structure, sized per token of context, not per parameter.`,
      concepts: ["sh09.training-memory", "sh09.kv-cache"],
      difficulty: 1,
    },
    {
      id: "sh09-l04-q4",
      type: "numeric",
      prompt: md`KV cache per token for a model with 40 layers, 8 KV heads, head dimension 128, BF16 (KiB)?`,
      answer: 160,
      tolerance: { rel: 0.01 },
      unit: "KiB",
      explanation: md`$2 \times 40 \times 8 \times 128 \times 2 = 163{,}840$ bytes $= 160$ KiB per token; a 16,384-token context is 2.5 GiB.`,
      concepts: ["sh09.kv-cache"],
      difficulty: 2,
    },
    {
      id: "sh09-l04-q5",
      type: "order",
      prompt: "Order these runs from cheapest to most expensive in compute.",
      items: ["QLoRA SFT of an 8B on 20 M tokens", "Continued pretraining of a 7B on 50 B tokens", "Pretraining a 3B from scratch on 3 T tokens", "Pretraining a 70B from scratch on 2 T tokens"],
      explanation: md`$4ND$: $6.4\text{e}17$; $6ND$: $2.1\text{e}21$; $5.4\text{e}22$; $8.4\text{e}23$ FLOP.`,
      concepts: ["sh09.cost-ladder"],
      difficulty: 2,
    },
    {
      id: "sh09-l04-q6",
      type: "decision",
      prompt: "A volunteer says a 7B pretraining run \"will only take 10 days on 64 H100s\" at an assumed 60 % MFU. They have never run on this cluster. What do you do?",
      options: [
        { text: "Ask for a short test run to measure tokens per second, recompute MFU, and replan with an overhead factor", score: 1, feedback: "Right. 60 % MFU is optimistic for a first run on an unknown cluster; measure before committing." },
        { text: "Approve: 10 days is reasonable", score: 0, feedback: "The plan rests on an untested, optimistic utilisation." },
        { text: "Halve the model size to be safe", score: 0.3, feedback: "May be wise later, but you do not yet know whether the estimate is wrong." },
        { text: "Ask them to use sparse peak FLOPs to make it faster", score: 0, feedback: "Sparse peak is not achievable for dense training; it would make the estimate worse." },
      ],
      explanation: md`Measured throughput beats assumed MFU. At 30 % MFU the same run takes twice as long.`,
      concepts: ["sh09.mfu"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh09-l04-f1", front: "GPU-hours", back: md`$H = 6ND/(\text{MFU} \cdot P_{\text{peak}} \cdot 3600)$`, concepts: ["sh09.mfu"] },
    { id: "sh09-l04-f2", front: "H100 SXM dense BF16 peak", back: "About 989 TFLOP/s (the sparsity figure is double and not used for training).", concepts: ["sh09.mfu"] },
    { id: "sh09-l04-f3", front: "Training state memory", back: "About 16 bytes per parameter: 2 weights, 2 gradients, 4 master, 4 + 4 Adam moments.", concepts: ["sh09.training-memory"] },
    { id: "sh09-l04-f4", front: "Inference weight memory", back: "2 bytes per parameter in BF16, about 0.5 in 4-bit: 70B is 140 GB or about 35 GB.", concepts: ["sh09.kv-cache"] },
    { id: "sh09-l04-f5", front: "KV cache per token", back: md`$2\,n_{\text{layers}}\,n_{\text{kv}}\,d_{\text{head}}\,b$; 8B-class GQA: 128 KiB, so 1 GiB per 8K tokens.`, concepts: ["sh09.kv-cache"] },
    { id: "sh09-l04-f6", front: "Cost ladder (illustrative, H100, 40 % MFU, USD 2.50/h)", back: "LoRA 8B: under USD 5. Continued pretraining 7B on 100 B: about USD 7,400. 7B from scratch on 2 T: about USD 147,000.", concepts: ["sh09.cost-ladder"] },
    { id: "sh09-l04-f7", front: "LoRA in one line", back: md`Freeze $W$, train $\Delta W = BA$ of rank $r$; QLoRA keeps $W$ in 4-bit.`, concepts: ["sh09.peft"] },
  ],
};

export default lesson;
