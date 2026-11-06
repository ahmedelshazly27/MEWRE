import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh09-l03",
  title: "Scaling laws: Kaplan, Chinchilla, compute-optimal training and over-training",
  summary:
    "Loss falls predictably as a power law in parameters, data and compute. Kaplan (2020) established the power laws; Chinchilla (2022) showed parameters and tokens should grow together, about 20 tokens per parameter at the compute optimum. Production models are deliberately trained far past that point because inference, not training, dominates lifetime cost. This lesson derives C ≈ 6ND, works the compute-optimal arithmetic, and shows why Arabic's limited unique data turns scaling into a data problem.",
  minutes: 80,
  objectives: [
    "Derive and use C ≈ 6ND for training and 2N per token for inference",
    "State the Kaplan and Chinchilla results and why Chinchilla revised the compute allocation",
    "Size a compute-optimal model for a given budget with the 20 tokens per parameter rule and the parametric fit",
    "Explain over-training and compute the break-even inference volume for a smaller model",
    "Explain why limited unique Arabic text makes data, not compute, the binding constraint, and what repetition costs",
  ],
  concepts: [
    { id: "sh09.train-compute", name: "Training compute C ≈ 6ND", description: "Training FLOP are about six times parameters times tokens: two FLOP per parameter per token forward, four backward. Inference is about 2N FLOP per token.", competency: "sh-research", related: ["sh09.pretraining-objective"] },
    { id: "sh09.scaling-law", name: "Neural scaling laws", description: "Empirical power laws relating test loss to parameters, data and compute over many orders of magnitude (Kaplan et al. 2020), used to predict large runs from small ones.", competency: "sh-research", related: ["sh09.train-compute"] },
    { id: "sh09.compute-optimal", name: "Compute-optimal (Chinchilla) training", description: "For a fixed compute budget, loss is minimised when parameters and tokens grow roughly in proportion, about 20 training tokens per parameter (Hoffmann et al. 2022).", competency: "sh-research", related: ["sh09.scaling-law"] },
    { id: "sh09.over-training", name: "Over-training for inference", description: "Training a smaller model on many more tokens than compute-optimal, accepting extra training compute to get a cheaper model to serve. Rational when lifetime inference volume is large.", competency: "sh-research", related: ["sh09.compute-optimal"] },
    { id: "sh09.data-constrained", name: "Data-constrained scaling", description: "When unique data runs out, repeating it is nearly as good as fresh data up to about 4 epochs, then returns fall quickly (Muennighoff et al. 2023). Binding for Arabic.", competency: "sh-research", related: ["sh09.compute-optimal", "sh09.data-pipeline"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From power laws to 20 tokens per parameter",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every sovereign model announcement in the Gulf is a scaling-law decision: how many parameters, how many tokens, how much compute. When HUMAIN, TII, G42 or QCRI announce a model, scaling arithmetic tells you in a minute what it cost, whether it was built to be cheap to serve, and whether there was enough Arabic text to feed it. That lets you place Suhail's research arm honestly: what it can contribute (data, evaluation) and what it cannot (frontier pretraining).`,
        },
        {
          kind: "md",
          md: md`### Where 6ND comes from

A dense transformer with $N$ parameters does, per token, one multiply and one add for each weight in the forward pass: $2N$ FLOP. The backward pass computes gradients with respect to both activations and weights, about twice the forward: $4N$. So training costs about $6N$ FLOP per token and $6ND$ for $D$ tokens. Generating one token at inference costs about $2N$.`,
        },
        { kind: "equation", formula: "sh09-train-flops" },
        {
          kind: "md",
          md: md`### Kaplan et al. (2020)

Across seven orders of magnitude of compute, test loss followed power laws in model size, dataset size and compute, as long as neither of the others was the bottleneck:`,
        },
        { kind: "equation", formula: "sh09-kaplan-power-law" },
        {
          kind: "md",
          md: md`A tenfold larger model lowers the reducible loss by a factor of $10^{-0.076} = 0.84$, about 16 %. The practical message was that big runs can be **predicted from small ones**: fit the curve on cheap models, extrapolate. Kaplan also concluded that with more compute you should grow the model much faster than the data (roughly $N \propto C^{0.73}$), which is why 2020 to 2021 models such as GPT-3 (175 B parameters, 300 B tokens) and Gopher (280 B, 300 B tokens) had about 1 to 2 tokens per parameter.

### Chinchilla (Hoffmann et al. 2022)

DeepMind trained over 400 models from 70 M to 16 B parameters, adjusting the learning-rate schedule to each run's length (Kaplan had not, which biased his result toward large models). Three different methods agreed: **parameters and tokens should scale in equal proportion** with compute, at about **20 tokens per parameter**. The demonstration: Chinchilla, 70 B parameters on 1.4 T tokens, used about the same compute as Gopher (280 B on 300 B tokens) and beat it on almost every benchmark.

The third method fits a parametric loss:`,
        },
        { kind: "equation", formula: "sh09-chinchilla-loss" },
        {
          kind: "md",
          md: md`$E$ is the irreducible entropy of text, $A/N^{\alpha}$ the penalty for a finite model, $B/D^{\beta}$ the penalty for finite data. Minimising it subject to $C = 6ND$ gives:`,
        },
        { kind: "equation", formula: "sh09-compute-optimal" },
        { kind: "equation", formula: "sh09-chinchilla-rule" },
        {
          kind: "callout",
          tone: "unverified",
          title: "Which coefficients?",
          md: md`The coefficients printed in the Chinchilla paper for the parametric fit ($E=1.69$, $A=406.4$, $B=410.7$, $\alpha=0.34$, $\beta=0.28$) imply far more than 20 tokens per parameter, inconsistent with the paper's own other two methods. The Epoch AI replication (Besiroglu et al. 2024) refitted the data and obtained values ($E \approx 1.82$, $A \approx 482$, $B \approx 2085$, $\alpha \approx 0.348$, $\beta \approx 0.366$) that do agree, giving about 20 tokens per parameter and $N_{\text{opt}} \approx 73$ B at Chinchilla's compute. This lesson uses the replication values for arithmetic; check them against the paper before quoting them outside Suhail. Either way, the fit is for English-heavy text with one tokenizer: use it for shapes and ratios, not to predict an Arabic model's loss.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "IsoFLOP curve at C = 10^23 FLOP (replication fit)",
          xKey: "params",
          xLabel: "Model size (billion parameters), tokens = C / 6N",
          yLabel: "Predicted loss (nats/token)",
          series: [{ key: "loss", label: "Predicted loss" }],
          data: [
            { params: 3, loss: 2.106 },
            { params: 5, loss: 2.076 },
            { params: 10, loss: 2.048 },
            { params: 15, loss: 2.038 },
            { params: 20, loss: 2.034 },
            { params: 30, loss: 2.032 },
            { params: 45, loss: 2.035 },
            { params: 60, loss: 2.039 },
            { params: 100, loss: 2.053 },
            { params: 200, loss: 2.085 },
          ],
          caption: "Computed from L(N, C/6N) with the Besiroglu et al. (2024) coefficients. The minimum is near 29 B parameters (566 B tokens). The bottom is flat: 15 B or 45 B costs only about 0.003 to 0.006 nats. That flatness is what makes over-training cheap.",
        },
        {
          kind: "md",
          md: md`### Over-training: optimal for training is not optimal for use

"Compute-optimal" minimises loss per **training** FLOP. A model that will serve billions of requests should minimise **lifetime** compute:`,
        },
        { kind: "equation", formula: "sh09-lifetime-compute" },
        {
          kind: "md",
          md: md`Because the isoFLOP curve is flat, a model half the optimal size loses little, and the loss gap can be closed by training on more tokens. Modern open models are heavily over-trained: Meta's Llama 3 8B on about 15 T tokens is about **1,875 tokens per parameter**; SDAIA's ALLaM-7B on 5.2 T English and Arabic tokens is about **743**. Chinchilla itself was 20.

### The Arabic data wall

Scaling laws assume fresh data. A compute-optimal 30 B model wants about 600 B tokens; an over-trained 7B wants trillions. Lesson 1's chart showed that cleaned, deduplicated Arabic web corpora are tens of billions of tokens each, and they overlap. Jais 2 reports about 600 B Arabic tokens for a 70 B model, which took a sovereign-scale data effort. Three consequences:

1. **Mix languages**: Arabic models are trained bilingually (English, code, Arabic), so English data supplies general reasoning and Arabic data supplies the language. ALLaM's 5.2 T tokens were English and Arabic.
2. **Repeat carefully**: Muennighoff et al. (2023) found up to about 4 epochs of repeated data is nearly as good as unique data; beyond that, returns fall quickly and by around 16 epochs extra compute is close to worthless.
3. **Data is the scarce asset**: new, high-quality, licensed Arabic text (books, dialect conversation, educational material, transcribed speech) moves Arabic models more than more GPUs. This is where a community has leverage.`,
        },
        { kind: "sources", refs: ["sh09-r14", "sh09-r15", "sh09-r16", "sh09-r17", "sh09-r18", "sh09-r41", "sh09-r44"] },
      ],
    },
    {
      layer: "applied",
      title: "Sizing runs and reading announcements",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Compute-optimal size for 10^23 FLOP, and checking Chinchilla",
          given: md`A regional lab announces a budget of $10^{23}$ FLOP for a new Arabic and English base model. What size is compute-optimal? Also check Chinchilla's and Gopher's compute.`,
          steps: [
            { md: md`**Rule of thumb**: $N_{\text{opt}} = \sqrt{C/120} = \sqrt{10^{23}/120} = 2.89 \times 10^{10}$, about **29 B parameters**; $D = 20N = 577$ B tokens. Check: $6 \times 2.89\text{e}10 \times 5.77\text{e}11 = 1.0 \times 10^{23}$.` },
            { md: md`**Parametric fit** (replication coefficients): $N_{\text{opt}} = 29.5$ B, $D_{\text{opt}} = 566$ B, about 19 tokens per parameter. The two methods agree.` },
            { md: md`**Chinchilla**: $6 \times 70\text{e}9 \times 1.4\text{e}12 = 5.88 \times 10^{23}$ FLOP. **Gopher**: $6 \times 280\text{e}9 \times 300\text{e}9 = 5.04 \times 10^{23}$. Similar budgets; Chinchilla had 20 tokens per parameter, Gopher 1.07.` },
            { md: md`**Data check**: 566 B tokens of which, say, 30 % Arabic is 170 B Arabic tokens, several times the size of any single cleaned public Arabic web corpus. The lab needs either repetition (about 4 epochs maximum before returns fall), new sources, or a lower Arabic share.` },
          ],
          result: md`About 29 B parameters on about 570 B tokens. The interesting question for an Arabic lab is not the parameter count but where 170 B or more unique, clean Arabic tokens come from.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Over-training: when is a 14B better than a 29B?",
          given: md`Same lab, same target quality: the loss the compute-optimal 29.45 B model reaches on 566 B tokens ($L = 2.032$ under the replication fit). Alternative: a **14 B** model trained longer. The model is expected to process **10 T tokens** of inference over its life (illustrative: a national chat service).`,
          steps: [
            { md: md`**Tokens the 14B needs for the same loss**: solve $E + A/N^{\alpha} + B/D^{\beta} = 2.032$ for $D$ at $N = 14$ B: $D = 1.563$ T tokens (112 tokens per parameter).` },
            { md: md`**Training compute**: $6 \times 14\text{e}9 \times 1.563\text{e}12 = 1.31 \times 10^{23}$ FLOP, **31 % more** than the 29B's $1.0 \times 10^{23}$.` },
            { md: md`**Inference compute**: 29B: $2 \times 29.45\text{e}9 \times 10^{13} = 5.89 \times 10^{23}$. 14B: $2 \times 14\text{e}9 \times 10^{13} = 2.80 \times 10^{23}$.` },
            { md: md`**Lifetime**: 29B: $1.0 + 5.89 = 6.89 \times 10^{23}$. 14B: $1.31 + 2.80 = 4.11 \times 10^{23}$, **40 % less**.` },
            { md: md`**Break-even inference volume**: $D_{\text{inf}} = (1.313 - 1.0)\times 10^{23} / (2 \times (29.45 - 14) \times 10^{9}) = 1.01 \times 10^{12}$ tokens. Above about 1 T tokens served, the smaller over-trained model wins.` },
          ],
          result: md`The 14B costs 31 % more to train but 40 % less over a 10 T-token life, and is also faster and fits on fewer GPUs. It needs 1.56 T training tokens, nearly three times as many, which for an Arabic model makes the data wall worse.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Reading a smaller budget",
          given: md`A university group has $10^{22}$ FLOP. Use the 20 tokens per parameter rule.`,
          steps: [
            {
              md: md`$N_{\text{opt}} = \sqrt{10^{22}/120} = 9.13$ B parameters.`,
              hidden: true,
              check: { prompt: "Compute-optimal parameters (billions)", answer: 9.13, unit: "B", tolerance: { rel: 0.01 } },
            },
            {
              md: md`$D_{\text{opt}} = 20 \times 9.13 = 183$ B tokens.`,
              hidden: true,
              check: { prompt: "Compute-optimal tokens (billions)", answer: 182.6, unit: "B", tolerance: { rel: 0.01 } },
            },
            { md: md`If they intend to serve the model widely, they should consider a 3 B to 7 B model trained on more tokens instead.` },
          ],
          result: md`About 9 B parameters on about 183 B tokens. Ten times less compute gives a model $\sqrt{10} = 3.2$ times smaller with 3.2 times fewer tokens.`,
        },
        {
          kind: "question",
          question: {
            id: "sh09-l03-p1",
            type: "numeric",
            prompt: md`A model card says: 34 B parameters, trained on 4 T tokens. What was the training compute, in units of $10^{23}$ FLOP?`,
            answer: 8.16,
            tolerance: { rel: 0.01 },
            unit: "× 10^23 FLOP",
            explanation: md`$6 \times 34\text{e}9 \times 4\text{e}12 = 8.16 \times 10^{23}$ FLOP. That is 118 tokens per parameter: over-trained relative to Chinchilla, as is normal for a model meant to be served.`,
            concepts: ["sh09.train-compute", "sh09.over-training"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Scaling laws in practice",
      blocks: [
        {
          kind: "md",
          md: md`### How labs use them

- **Small-scale ablations predict big runs**: a lab trains a ladder of small models (for example 100 M to 2 B) on candidate data mixes or tokenizers, fits a curve, and picks the option that wins at scale. The same discipline applies to a Suhail research project: never spend the big budget on a choice not tested small.
- **Data mix scaling**: the curve shifts with data quality. Better filtering moves the whole curve down, which is often cheaper than more parameters.
- **Downstream metrics are noisier than loss**: benchmark accuracy can jump abruptly or plateau even when loss falls smoothly; plan evaluations with error bars (Lesson 5).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common misreadings",
          md: md`- **"Chinchilla-optimal" as a quality target**: it is optimal for training compute only. Almost every deployed open model is over-trained on purpose.
- **Parameter count as a proxy for quality**: a 7B on 5 T tokens can beat a 30B on 300 B tokens.
- **Ignoring repetition**: a plan that needs 600 B Arabic tokens from a 40 B unique corpus is 15 epochs, past the point of useful returns.
- **Transferring English coefficients to Arabic**: the shape transfers, the numbers do not (different tokenizer, entropy, data quality).`,
        },
        {
          kind: "ask",
          title: "Questions to ask a regional model announcement",
          items: [
            "Parameters and total training tokens? So tokens per parameter and total compute.",
            "How many of those tokens are Arabic, and how many unique (before repetition)?",
            "Was it trained from scratch or continued from a base model? (Compute differs by orders of magnitude.)",
            "What small-scale ablations justified the data mix and tokenizer?",
            "Is it built to be served (over-trained, small) or to top a leaderboard (large)?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh09-l03-p2",
            type: "short",
            prompt: md`Pick one open Arabic model from the research brief (Jais 2 70B, Falcon-H1 Arabic 34B, ALLaM-7B, Fanar-1-9B) and write a **one-paragraph scaling analysis** for the Suhail newsletter. State what is published (parameters, tokens, Arabic share), compute the training compute and tokens per parameter where the data allows, say whether it is compute-optimal or over-trained and what that implies about its purpose, and list what is not disclosed. Label anything you could not verify.`,
            rubric: [
              "Uses only published figures from the brief or model card, with dates, and labels gaps as not disclosed",
              "Computes C = 6ND correctly where N and D are known (for example ALLaM-7B: 6 × 7e9 × 5.2e12 ≈ 2.2e23 FLOP)",
              "Computes tokens per parameter and compares with about 20 (Chinchilla) and with heavily over-trained models",
              "Interprets the result (built to be served cheaply, or limited by data) rather than just reporting numbers",
              "Distinguishes from-scratch from continued pretraining where relevant (Fanar Prime builds on Gemma-2)",
              "Notes vendor claims (leaderboard ranks) as claims, not facts",
            ],
            modelAnswer: md`**ALLaM-7B in numbers.** SDAIA published ALLaM-7B-Instruct-preview on Hugging Face (2025) and states it was pretrained on 5.2 T English and Arabic tokens. With 7 B parameters, training compute was about $6 \times 7\text{e}9 \times 5.2\text{e}12 = 2.2 \times 10^{23}$ FLOP, comparable to a compute-optimal 40 B model, and 743 tokens per parameter, 37 times the Chinchilla ratio of 20. That is a deliberate over-training choice: a small model that is cheap to serve and fine-tune, at the price of more training compute. What is not disclosed in the sources we checked: the Arabic share of the 5.2 T tokens, how many were unique versus repeated, and the hardware and MFU, so the cost cannot be estimated with confidence. HUMAIN's larger ALLaM 34B, which runs HUMAIN Chat, does not appear to have public weights (unverified, single source).`,
            explanation: md`Scaling analysis is three numbers (N, D, C) plus one interpretation, with every gap named.`,
            concepts: ["sh09.train-compute", "sh09.over-training", "sh09.compute-optimal"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a government official why a lab might deliberately train a 7B model on far more data than a scaling law says is optimal.",
          keyPoints: [
            "Scaling laws say how to get the lowest loss for a fixed training budget: about 20 tokens per parameter",
            "But a model is trained once and used millions of times; each use costs in proportion to model size",
            "A smaller model trained longer reaches similar quality and is much cheaper to run",
            "The cost is more training compute and much more data, which for Arabic is the hard part",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh09-l03-q1",
      type: "mcq",
      prompt: "Why 6 in C ≈ 6ND?",
      options: [
        "Six layers per block",
        "2 FLOP per parameter per token in the forward pass plus about 4 in the backward pass",
        "Adam keeps six copies of each weight",
        "It is a fitted constant with no derivation",
      ],
      answer: 1,
      explanation: md`Forward: one multiply-add (2 FLOP) per weight per token. Backward: gradients for activations and weights, about twice the forward.`,
      concepts: ["sh09.train-compute"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh09-l03-q2",
      type: "numeric",
      prompt: md`Using the 20 tokens per parameter rule, what is the compute-optimal model size for $C = 4.8 \times 10^{23}$ FLOP (billions of parameters)?`,
      answer: 63.2,
      tolerance: { rel: 0.01 },
      unit: "B",
      explanation: md`$N = \sqrt{4.8\text{e}23/120} = \sqrt{4\text{e}21} = 6.32 \times 10^{10}$, about 63 B, on about 1.26 T tokens.`,
      concepts: ["sh09.compute-optimal"],
      difficulty: 2,
    },
    {
      id: "sh09-l03-q3",
      type: "mcq",
      prompt: "What did Chinchilla change relative to Kaplan et al.?",
      options: [
        "It showed loss does not follow power laws",
        "It showed parameters and tokens should grow roughly equally with compute, about 20 tokens per parameter",
        "It showed models should be as large as possible",
        "It showed data quality does not matter",
      ],
      answer: 1,
      explanation: md`With learning-rate schedules matched to run length, the optimal allocation became roughly equal scaling; previous large models were under-trained.`,
      concepts: ["sh09.compute-optimal", "sh09.scaling-law"],
      difficulty: 1,
    },
    {
      id: "sh09-l03-q4",
      type: "numeric",
      prompt: md`Model A (30 B) and model B (10 B) reach the same quality. Training compute: A $1.0\times10^{23}$, B $2.0\times10^{23}$ FLOP. Above how many inference tokens (trillions) is B cheaper over its lifetime?`,
      answer: 2.5,
      tolerance: { rel: 0.01 },
      unit: "T tokens",
      explanation: md`$D_{\text{inf}} = (2.0 - 1.0)\times10^{23}/(2 \times 20\times10^{9}) = 2.5\times10^{12}$ tokens.`,
      concepts: ["sh09.over-training"],
      difficulty: 2,
    },
    {
      id: "sh09-l03-q5",
      type: "multi",
      prompt: "Which statements about data-constrained scaling are supported by Muennighoff et al. (2023)?",
      options: [
        "Up to about 4 epochs of repeated data is nearly as good as unique data",
        "Repeating data is always as good as fresh data",
        "Returns from repetition fall quickly beyond a few epochs",
        "Repeating data improves results without limit",
      ],
      answer: [0, 2],
      explanation: md`Repetition is a useful but limited fix; around 16 epochs extra compute is close to worthless.`,
      concepts: ["sh09.data-constrained"],
      difficulty: 2,
    },
    {
      id: "sh09-l03-q6",
      type: "decision",
      prompt: "A volunteer proposes that Suhail train a 30 B Arabic model from scratch at the Chinchilla optimum, mostly on public Arabic web data. What is the strongest objection?",
      options: [
        { text: "About 600 B tokens are needed, while cleaned, deduplicated public Arabic web corpora are tens of billions of tokens each and overlap, so the plan runs into the data wall and far exceeds a volunteer budget", score: 1, feedback: "Right: both data and compute fail, and the data failure cannot be fixed with money alone." },
        { text: "30 B is too small to be useful", score: 0.1, feedback: "Size is not the problem; tokens and compute are." },
        { text: "Chinchilla says 200 tokens per parameter", score: 0, feedback: "It is about 20." },
        { text: "Scaling laws do not apply to Arabic", score: 0.2, feedback: "The shape applies; the coefficients differ. Not the main objection." },
      ],
      explanation: md`$20 \times 30\text{ B} = 600$ B tokens; $6 \times 30\text{e}9 \times 6\text{e}11 = 1.08 \times 10^{23}$ FLOP, about 76,000 H100-hours at 40 % MFU (Lesson 4).`,
      concepts: ["sh09.data-constrained", "sh09.compute-optimal"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh09-l03-f1", front: "Training and inference FLOP", back: md`Training $C \approx 6ND$; inference about $2N$ per token.`, concepts: ["sh09.train-compute"] },
    { id: "sh09-l03-f2", front: "Chinchilla rule", back: md`About 20 tokens per parameter; $N_{\text{opt}} \approx \sqrt{C/120}$.`, concepts: ["sh09.compute-optimal"] },
    { id: "sh09-l03-f3", front: "Chinchilla versus Gopher", back: "70 B on 1.4 T tokens beat 280 B on 300 B tokens at similar compute (about 5 to 6e23 FLOP).", concepts: ["sh09.compute-optimal"] },
    { id: "sh09-l03-f4", front: "Chinchilla parametric loss", back: md`$L = E + A/N^{\alpha} + B/D^{\beta}$`, concepts: ["sh09.scaling-law"] },
    { id: "sh09-l03-f5", front: "Why over-train?", back: "Lifetime compute = training + 2N per served token. Smaller, longer-trained models are cheaper to serve.", concepts: ["sh09.over-training"] },
    { id: "sh09-l03-f6", front: "Repetition limit", back: "About 4 epochs nearly as good as fresh data; returns fall quickly after (Muennighoff 2023).", concepts: ["sh09.data-constrained"] },
    { id: "sh09-l03-f7", front: "ALLaM-7B tokens per parameter", back: "5.2 T / 7 B = about 743 (heavily over-trained).", concepts: ["sh09.over-training"] },
  ],
};

export default lesson;
