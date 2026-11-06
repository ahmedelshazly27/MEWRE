import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh06-l02",
  title: "Open Arabic models and benchmarks: who builds what, licences and reading a model card",
  summary:
    "The open Arabic model landscape as of November 2026 (ALLaM, Jais 2, K2 Think, Falcon Arabic and Falcon-H1 Arabic, Fanar, AceGPT, SILMA), the degrees of openness and how licences flow from base models to fine-tunes, the main Arabic benchmarks (OALL v2, ArabicMMLU, BALSAM, ABBL) and why contamination and dialects make Arabic evaluation hard, and a method for reading a model card critically, including a compute sanity check.",
  minutes: 85,
  objectives: [
    "Place the main Arabic models by builder, size, base model, openness and date",
    "Distinguish closed, open-weight and fully open models, and explain how a base model's licence constrains its fine-tunes",
    "Describe OALL v2, ArabicMMLU, BALSAM and ABBL and what each does about machine translation and contamination",
    "Use a public versus blind score gap to judge a leaderboard claim",
    "Estimate training compute and GPU-hours from a model card with C = 6ND",
    "Write a critical model-card review for Suhail's newsletter",
  ],
  concepts: [
    { id: "sh06.openness-spectrum", name: "Openness spectrum", description: "Closed (API or app only), open weights (downloadable parameters under some licence), fully open (weights plus training data, code and recipes). Openness is about what you may download, inspect, modify and ship, not about price.", competency: "sh-landscape", related: ["sh06.licence-inheritance", "sh06.model-card"] },
    { id: "sh06.licence-inheritance", name: "Licence inheritance", description: "A fine-tuned or continually pretrained model is a derivative of its base; the base model's licence terms (Llama community licence, Gemma terms, Falcon LLM License) usually flow down to it, whatever the derivative's card says.", competency: "sh-landscape", related: ["sh06.openness-spectrum"] },
    { id: "sh06.arabic-benchmarks", name: "Arabic LLM benchmarks", description: "OALL v2 (Hugging Face leaderboard of native Arabic tasks), ArabicMMLU (about 14.5K native school-exam questions), BALSAM (78 tasks with blind test sets), ABBL (SILMA leaderboard with contamination checks). Each answers a narrower question than its headline rank suggests.", competency: "sh-landscape", related: ["sh06.contamination", "sh06.model-card"] },
    { id: "sh06.contamination", name: "Benchmark contamination", description: "Test items (or translations of them) leaking into training data, inflating scores without real capability. Blind test sets, contamination detection and public versus blind gaps are the defences.", competency: "sh-landscape", related: ["sh06.arabic-benchmarks", "fc05.benchmark-integrity"] },
    { id: "sh06.model-card", name: "Critical model-card reading", description: "Checking a model card for base model, licence, data (size, Arabic share, dialects), training compute, evaluation method and who ran it, and labelling each claim as verified, vendor-reported or missing.", competency: "sh-landscape", related: ["sh06.openness-spectrum", "sh06.training-compute"] },
    { id: "sh06.training-compute", name: "Training compute arithmetic", description: "C is about 6 times parameters times tokens; dividing by achieved GPU throughput gives GPU-hours and an order-of-magnitude cost, a sanity check on any model claim.", competency: "sh-landscape", related: ["sh06.model-card", "sh06.facility-power"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The Arabic model map, openness and evaluation",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail's hackathons will ask builders to pick a model; its newsletter will report releases and leaderboards; its planned research arm will publish models, datasets and benchmarks of its own. All three depend on you knowing which Arabic models exist, what you may legally do with them, and how much a leaderboard rank really says. This is also where Suhail can earn technical credibility quickly: careful, independent reading of claims that most coverage repeats.`,
        },
        {
          kind: "md",
          md: md`### Who builds what (course research, November 2026)

| Model | Builder | Size | Base and data | Openness and licence | Date |
|---|---|---|---|---|---|
| **ALLaM-7B-Instruct-preview** | SDAIA | 7B | Pretrained on 5.2T English and Arabic tokens | Weights on Hugging Face; licence not recorded here | 2025 |
| **ALLaM 34B** | HUMAIN | 34B | Built from scratch per HUMAIN | Powers HUMAIN Chat; weights appear not public (unverified) | Aug 2025 |
| **Jais 2** | Inception (G42), MBZUAI IFM, Cerebras | 70B | About 600B Arabic tokens; trained and served on Cerebras | Open weights on Hugging Face; tech report arXiv 2608.13580 (Aug 2026) | 9 Dec 2025 |
| **K2 Think** | MBZUAI and G42 | 32B; 70B second edition | Reasoning system; 2nd edition built on K2-V2 | Fully open: data, weights, code | Sep 2025; Jan 2026 |
| **Falcon Arabic** | TII | 7B | Built on Falcon 3-7B, native Arabic data | Not downloadable at launch | May 2025 |
| **Falcon-H1 Arabic** | TII | 3B, 7B, 34B | Hybrid Mamba-Transformer, up to 256K context | Falcon LLM License | 5 Jan 2026 |
| **Fanar Star / Fanar Prime** | QCRI (HBKU) | 7B / 9B | Star from scratch; Prime on Gemma-2. Fanar-1-9B: about 1T tokens, about 410B Arabic | Fanar-1-9B on Hugging Face; instruct licence reportedly Apache-2.0 (unverified) | late 2024 |
| **AceGPT** | CUHK-Shenzhen, SRIBD, KAUST | various | On Llama 2: pretraining, SFT and RLAIF | Llama 2 derivative | NAACL 2024 |
| **SILMA-9B-Instruct** | SILMA.AI | 9B | On Gemma | Gemma derivative; "top open Arabic LLM until Feb 2025" is self-reported | 2024 to 2025 |

Three patterns stand out. **First**, the big national labs (TII, Inception and MBZUAI, QCRI, SDAIA and HUMAIN) dominate; independent Arabic model builders are few. **Second**, most smaller models are adaptations of a non-Arabic base (Llama, Gemma, Falcon), which matters for licences and tokenisers. **Third**, the flagship models of the two biggest players differ in openness: Jais 2 is open-weight, HUMAIN's ALLaM 34B reportedly is not.`,
        },
        {
          kind: "matrix",
          title: "Degrees of openness",
          xAxis: ["Weights closed", "Weights open"],
          yAxis: ["Data and code closed", "Data and code open"],
          cells: [
            { label: "Open data, closed model", detail: "Datasets and benchmarks published without a model: ArabicWeb24 (LightOn), BALSAM's dev sets. Useful raw material for builders." },
            { label: "Fully open", detail: "K2 Think: weights, training data and code. You can reproduce, audit and build on it." },
            { label: "Closed", detail: "ALLaM 34B (reportedly), Falcon Arabic at launch: use through an app or API only." },
            { label: "Open weights", detail: "Jais 2, Falcon-H1 Arabic, ALLaM-7B preview, Fanar-1-9B, SILMA: download and fine-tune under the licence, but you cannot inspect or reproduce the data." },
          ],
          caption: "Top-left, top-right, bottom-left, bottom-right. Most Arabic models sit bottom-right. 'Open' in a press release usually means bottom-right with a custom licence.",
        },
        {
          kind: "md",
          md: md`### Licences and how they flow

Open-weight licences fall into roughly four groups:

- **Permissive** (Apache-2.0, MIT): use, modify, ship commercially, keep notices.
- **Custom open-weight licences** (Llama community licence, Gemma terms, Falcon LLM License): broadly usable but with an acceptable-use policy and conditions set by the publisher (attribution, restrictions on certain uses, sometimes thresholds for very large users).
- **Research-only or non-commercial**: fine for a benchmark paper, not for a startup's product.
- **No licence stated**: legally you have no right to use it. Treat it as closed.

The rule that catches builders is **inheritance**: a model fine-tuned or continually pretrained from a base is a derivative of that base. AceGPT carries Llama 2's terms; SILMA and Fanar Prime are built on Gemma, so Gemma's terms apply to them in addition to whatever their own card says. A card that says "Apache-2.0" on a Gemma-based model deserves a second look.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Licences not checked on the model cards",
          md: md`The course research recorded Falcon-H1 Arabic as released under the Falcon LLM License (TII), but did not open the Hugging Face cards for Jais 2, ALLaM-7B, Fanar or K2 Think. Fanar's instruct licence is reported as Apache-2.0 and is unverified. Before a hackathon recommends a model for commercial use, open the current model card and licence file and record the date you checked.`,
        },
        {
          kind: "md",
          md: md`### Why Arabic evaluation is hard

- **Diglossia and dialects.** Modern Standard Arabic (MSA) is written; people speak Gulf, Levantine, Egyptian, Maghrebi and other dialects. A model can do well on MSA exam questions and badly in a customer-service chat in Kuwaiti dialect.
- **Translationese.** Machine-translated English benchmarks test whether a model understands translated English, with its errors and cultural assumptions. OALL v2 dropped machine-translated tasks for this reason and kept native sets (ArabicMMLU, ALRAGE, AraTrust, MadinahQA, Belebele, EXAMS, AlGhafa) plus a human-translated MMLU (MMLU-HT).
- **Tokenisation.** Arabic morphology (roots, patterns, clitics) fragments under English-centric BPE tokenisers. Full diacritisation sharply increases token fertility and hurts performance; light diacritisation as found in natural text is handled fine (Inoue, Alhafni, Habash, Baldwin, Findings of EACL 2026).
- **Contamination.** Public test sets end up in training data. Translation does not protect a test: a NeurIPS 2026 paper found that exposure to translated items raised MMLU accuracy by 2.8 to 11.3 percentage points.

### The main benchmarks

| Benchmark | Who | What | Defence against gaming |
|---|---|---|---|
| **OALL v2** (Open Arabic LLM Leaderboard) | Hugging Face hosted | Leaderboard over native Arabic tasks | Dropped machine-translated tasks; test sets are public |
| **ArabicMMLU** (Koto et al., 2024) | Academic | About 14.5K native multiple-choice school-exam questions from Arab countries | None beyond being native; public |
| **BALSAM** | SDAIA, KSGAAL and partners | 78 tasks, 14 categories, 52K examples (37K test, 15K dev), at benchmarks.ksaa.gov.sa | Blind test sets |
| **ABBL** | SILMA.AI | Broad leaderboard | Contamination detection |

A survey of Arabic LLM evaluation (arXiv 2510.13430, Oct 2025) still lists contamination as an open problem. The practical defence for a reader is a comparison:`,
        },
        { kind: "equation", formula: "sh06-score-gap" },
        {
          kind: "chart",
          chart: "bar",
          title: "Arabic tokens: national-lab pretraining vs the largest public cleaned web sets (billions)",
          xKey: "item",
          xLabel: "Model or dataset",
          yLabel: "Arabic tokens (billions)",
          series: [{ key: "tokens", label: "Arabic tokens (bn)" }],
          data: [
            { item: "Jais 2 pretraining", tokens: 600 },
            { item: "Fanar-1-9B pretraining", tokens: 410 },
            { item: "CulturaX Arabic, deduplicated", tokens: 38.4 },
            { item: "ArabicWeb24, cleaned", tokens: 28 },
          ],
          caption: "Sources: MBZUAI and Khaleej Times (Jais 2, not released as a dataset); QCRI Fanar-1-9B card; AraMix (arXiv 2512.18834, Dec 2025) measurement of CulturaX; LightOn ArabicWeb24 card. Token counts use different tokenisers and are approximate. The gap between what national labs train on and what is openly available is one of the clearest openings for an open research arm.",
        },
        {
          kind: "md",
          md: md`### A compute sanity check from the model card

When a card gives parameters and tokens, you can estimate what the training run cost. This tells you whether a claim is plausible for the builder and how hard it would be for anyone else (including Suhail's research arm) to reproduce.`,
        },
        { kind: "equation", formula: "sh06-train-compute" },
        { kind: "equation", formula: "sh06-gpu-hours" },
      ],
    },
    {
      layer: "applied",
      title: "Reading two model cards with numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What did ALLaM-7B's pretraining cost, roughly?",
          given: md`ALLaM-7B: 7B parameters, 5.2T tokens (Asharq Al-Awsat, 2025). Illustrative assumptions: H100-class GPU, $F_{peak} = 9.89\times10^{14}$ FLOP/s dense BF16, MFU $u = 0.40$, price USD 2 per GPU-hour.`,
          steps: [
            { md: md`**Compute:** $C = 6\times7\times10^{9}\times5.2\times10^{12} = 2.18\times10^{23}$ FLOP.` },
            { md: md`**Effective throughput per GPU:** $9.89\times10^{14}\times0.40 = 3.96\times10^{14}$ FLOP/s, or $1.42\times10^{18}$ FLOP per GPU-hour.` },
            { md: md`**GPU-hours:** $2.18\times10^{23}/1.42\times10^{18} \approx 153{,}000$ GPU-h. On 1,000 GPUs that is $153{,}000/1{,}000/24 \approx 6.4$ days.` },
            { md: md`**Cost of the final run:** $153{,}000\times2 \approx$ USD 0.3 m. Real programmes spend a multiple of this on data work, ablations, failed runs and evaluation.` },
          ],
          result: md`A 7B Arabic-English model at this token count is a sub-million-dollar compute problem for the final run. The hard parts are the 5.2T tokens of data and the team, not the GPUs. That framing helps Suhail's research arm pick what to build: data and evaluation, not another 7B pretrain.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Fanar-1-9B: Arabic share and compute",
          given: md`Fanar-1-9B: 9B parameters, continually pretrained on about 1T tokens of which about 410B Arabic (QCRI model card). Same assumptions as above.`,
          steps: [
            { md: md`Arabic share of training tokens: $410/1{,}000$.` },
            { md: md`$= 41\%$.`, hidden: true, check: { prompt: "Arabic share (percent)", answer: 41, unit: "%", tolerance: { abs: 0.5 } } },
            { md: md`Compute for the continual pretraining: $C = 6\times9\times10^{9}\times10^{12}$.` },
            { md: md`$= 5.4\times10^{22}$ FLOP.`, hidden: true, check: { prompt: "Compute (units of 10^22 FLOP)", answer: 5.4, unit: "1e22 FLOP", tolerance: { abs: 0.05 } } },
            { md: md`GPU-hours at $1.42\times10^{18}$ FLOP per GPU-hour: $5.4\times10^{22}/1.42\times10^{18}$.` },
            { md: md`$\approx 38{,}000$ GPU-h, about USD 76k at USD 2 per GPU-hour. This excludes the compute that trained Gemma-2, the base.`, hidden: true, check: { prompt: "GPU-hours (thousands)", answer: 38, unit: "thousand GPU-h", tolerance: { abs: 1 } } },
          ],
          result: md`Continual pretraining an existing base is far cheaper than training from scratch, which is why most smaller Arabic models are adaptations. The trade-off is inheritance: Gemma's tokeniser and licence come with it.`,
        },
        {
          kind: "question",
          question: {
            id: "sh06-l02-p1",
            type: "numeric",
            prompt: md`A vendor reports 74.0 on a public Arabic leaderboard. On a blind benchmark of the same task types the model scores 63.5. What is the score gap $\Delta$ in percentage points?`,
            answer: 10.5,
            tolerance: { abs: 0.1 },
            unit: "pp",
            explanation: md`$\Delta = 74.0 - 63.5 = 10.5$ points. That is inside the 2.8 to 11.3 point range the NeurIPS 2026 paper attributes to translated contamination on MMLU: treat the public rank as inflated until explained.`,
            concepts: ["sh06.contamination"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Reviewing a model card for builders",
      blocks: [
        {
          kind: "checklist",
          title: "Model-card review: ten checks",
          items: [
            "**Builder and date:** who released it, when, and is this the official repository?",
            "**Base model:** trained from scratch, continually pretrained or fine-tuned? From which base?",
            "**Licence:** which file, which terms, and the base model's terms if it is a derivative",
            "**Data:** total tokens, Arabic share, MSA versus dialects, sources, any data card",
            "**Tokeniser:** Arabic-aware or inherited from an English-centric base? (Arabic Tokenizers Leaderboard)",
            "**Compute:** parameters times tokens; does $6ND$ look plausible for the builder?",
            "**Evaluation:** which benchmarks, which versions, run by whom (vendor, leaderboard, independent)?",
            "**Contamination:** blind or private sets reported? Public versus blind gap?",
            "**Dialects and safety:** any dialect or cultural evaluation (AraTrust is in OALL v2)?",
            "**Availability:** downloadable now, gated, or app-only?",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common errors in Arabic AI coverage",
          md: md`- Reporting "number one on OALL" without the size class, the date or the fact that the vendor ran it (Falcon-H1 Arabic's per-size rank and 7B score of about 71.5 to 71.7 are TII's claims).
- Calling a model "open source" when only weights are released under a custom licence.
- Comparing a 70B model with a 7B model on one leaderboard number.
- Treating MSA exam performance as dialect performance.
- Forgetting that a fine-tune inherits its base model's licence.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Where Suhail can add value without building a model",
          md: md`Independent, dated reviews of model cards; hackathon tracks that evaluate models on dialect tasks builders actually face; contributing new native or dialect test items to existing benchmarks (OALL, BALSAM) rather than launching a rival leaderboard. Module sh09 covers what it takes to build the research arm properly.`,
        },
        {
          kind: "question",
          question: {
            id: "sh06-l02-p2",
            type: "short",
            prompt: md`Write a 300 to 400 word "Suhail model review" of one Arabic model (Jais 2 or Falcon-H1 Arabic 7B) for the newsletter. Use the ten-check list. For each claim say whether it is verified (with source and date), vendor-reported, or missing. Include a compute estimate where the card allows it, the licence position for a startup that wants to ship a product, and a one-line recommendation for hackathon participants.`,
            rubric: [
              "States builder, date, size, base or architecture and availability correctly from the course research",
              "Labels each claim as verified, vendor-reported or missing, with sources and dates",
              "Addresses licence for commercial use, including inheritance or the need to check the card",
              "Addresses evaluation critically: which benchmark, who ran it, contamination and dialect coverage",
              "Includes a correct compute estimate or explains why the card does not allow one",
              "Ends with a practical, hedged recommendation for builders",
            ],
            modelAnswer: md`**Suhail model review: Falcon-H1 Arabic 7B (checked [date])**

**What it is.** TII released Falcon-H1 Arabic on 5 Jan 2026 in 3B, 7B and 34B sizes (Business Wire, TII). Architecture: hybrid Mamba-Transformer, context up to 256K tokens. *Verified (issuer release).*

**Base and data.** Part of TII's Falcon-H1 family by name; the exact base checkpoint is to be confirmed on the card. Token count and Arabic share: *missing from our sources*; check the card. Dialect coverage: *missing*.

**Compute.** Without a token count we cannot apply $C \approx 6ND$. For scale: if it saw 5T tokens, $6\times7\times10^{9}\times5\times10^{12} = 2.1\times10^{23}$ FLOP, about 150,000 H100-hours at 40% utilisation. *Illustrative only.*

**Licence.** Falcon LLM License (TII). It is a custom licence with an acceptable-use policy, not Apache-2.0. A startup can likely build on it but must read the terms, keep attribution and check use restrictions. *Verified that it is the Falcon LLM License; terms to be read on the card before shipping.*

**Evaluation.** TII says the 7B ranks first on the Open Arabic LLM Leaderboard (OALL v2) in its size class, scoring about 71.5 to 71.7. *Vendor-reported.* OALL v2 uses native Arabic tasks, which is good, but its test sets are public, so contamination cannot be excluded. No blind-set result (BALSAM) or ABBL contamination check is reported in our sources. *Missing.*

**Recommendation for hackathon teams.** A strong candidate for long-context Arabic applications at small size. Before relying on it, test it on 50 examples of your own dialect data and read the licence.`,
            explanation: md`Graders look for honest labelling of each claim, licence awareness and a critical reading of the leaderboard number.`,
            concepts: ["sh06.model-card", "sh06.licence-inheritance", "sh06.contamination"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a hackathon participant why 'number one on the Arabic leaderboard' does not mean 'best model for my Kuwaiti customer-service bot'.",
          keyPoints: [
            "Leaderboards rank by size class and on specific tasks, mostly MSA exam-style questions",
            "Public test sets can leak into training data; translated contamination inflated MMLU by 2.8 to 11.3 points",
            "Blind sets (BALSAM) and contamination checks (ABBL) are better evidence; compare public and blind scores",
            "Dialect performance and the product's own tasks need their own test",
            "Licence and availability decide whether you can ship it at all",
          ],
        },
        { kind: "xref", to: "m14-l01", note: "How LLMs work (tokens, training, inference) at a manager's level, if you need the basics behind this lesson." },
        { kind: "xref", to: "fc05.benchmark-integrity", note: "Benchmark integrity in technical marketing: the same discipline applies when Suhail publishes its own results." },
        { kind: "sources", refs: ["sh06-r2", "sh06-r13", "sh06-r14", "sh06-r15", "sh06-r16", "sh06-r17", "sh06-r19", "sh06-r22", "sh06-r23", "sh06-r24", "sh06-r7", "sh06-r25", "sh06-r26", "sh06-r27", "sh06-r28", "sh06-r29", "sh06-r30", "sh06-r31"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh06-l02-q1",
      type: "mcq",
      prompt: "Which Arabic model is described in the course research as fully open (data, weights and code)?",
      options: ["Jais 2", "K2 Think", "Falcon-H1 Arabic", "ALLaM 34B"],
      answer: 1,
      explanation: md`K2 Think (MBZUAI and G42, Sep 2025) released data, weights and code. Jais 2 and Falcon-H1 Arabic are open-weight; ALLaM 34B reportedly is not public.`,
      concepts: ["sh06.openness-spectrum"],
      difficulty: 1,
    },
    {
      id: "sh06-l02-q2",
      type: "numeric",
      prompt: md`Using $C \approx 6ND$, what is the training compute of a 70B model on 2T tokens, in units of $10^{23}$ FLOP?`,
      answer: 8.4,
      tolerance: { abs: 0.05 },
      unit: "1e23 FLOP",
      explanation: md`$6\times7\times10^{10}\times2\times10^{12} = 8.4\times10^{23}$ FLOP.`,
      concepts: ["sh06.training-compute"],
      difficulty: 1,
    },
    {
      id: "sh06-l02-q3",
      type: "multi",
      prompt: "What did OALL v2 change or include? (Select all that apply.)",
      options: [
        "Dropped machine-translated tasks",
        "Uses native ArabicMMLU",
        "Uses fully blind test sets for every task",
        "Includes a human-translated MMLU (MMLU-HT)",
        "Includes AraTrust",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`OALL v2 dropped machine-translated tasks and uses native sets (ArabicMMLU, ALRAGE, AraTrust, MadinahQA, Belebele, EXAMS, AlGhafa) plus MMLU-HT. Blind test sets are BALSAM's approach, not OALL's.`,
      concepts: ["sh06.arabic-benchmarks"],
      difficulty: 2,
    },
    {
      id: "sh06-l02-q4",
      type: "mcq",
      prompt: "A startup fine-tunes SILMA-9B (built on Gemma) and plans to sell the result. Which licence terms must it check?",
      options: [
        "Only SILMA's card",
        "Only its own licence, since fine-tuning creates a new model",
        "SILMA's terms and Gemma's terms, because the base licence flows to derivatives",
        "None: open-weight models are public domain",
      ],
      answer: 2,
      explanation: md`A fine-tune is a derivative; Gemma's terms apply alongside SILMA's. Open weights are licensed, not public domain.`,
      concepts: ["sh06.licence-inheritance"],
      difficulty: 1,
    },
    {
      id: "sh06-l02-q5",
      type: "numeric",
      prompt: md`Compute is $2.18\times10^{23}$ FLOP. A GPU achieves $3.96\times10^{14}$ FLOP/s. How many GPU-hours (thousands)?`,
      answer: 153,
      tolerance: { abs: 2 },
      unit: "thousand GPU-h",
      explanation: md`Per GPU-hour: $3.96\times10^{14}\times3600 = 1.426\times10^{18}$ FLOP. $2.18\times10^{23}/1.426\times10^{18} = 152{,}900$, about 153 thousand.`,
      concepts: ["sh06.training-compute"],
      difficulty: 2,
    },
    {
      id: "sh06-l02-q6",
      type: "mcq",
      prompt: "According to Inoue, Alhafni, Habash and Baldwin (EACL 2026 Findings), what does full diacritisation do?",
      options: [
        "Improves LLM accuracy by removing ambiguity",
        "Sharply increases subword fragmentation (fertility) and hurts performance",
        "Has no measurable effect on tokenisation",
        "Only matters for speech models",
      ],
      answer: 1,
      explanation: md`Full diacritisation raises token fertility and hurts performance; light diacritisation, as in natural text, is handled fine.`,
      concepts: ["sh06.model-card"],
      difficulty: 2,
    },
    {
      id: "sh06-l02-q7",
      type: "decision",
      prompt: md`A hackathon sponsor wants Suhail's guide to say its model is "the best Arabic LLM". Its evidence is a vendor-run rank on one public leaderboard. What do you write?`,
      options: [
        { text: "Print the claim: sponsors get to describe their product.", score: 0, feedback: "Suhail's guide would then carry an unverified superlative under its own name." },
        { text: "Write the specific claim with its source: 'ranks first in the 7B class on OALL v2 (vendor-reported, [date])', and list the other available models neutrally.", score: 1, feedback: "Precise, attributed and fair to participants choosing a model." },
        { text: "Leave the sponsor's model out of the guide.", score: 0.2, feedback: "Unfair to the sponsor and to participants; accuracy is the fix, not omission." },
      ],
      explanation: md`Attribute, scope (size class, benchmark, date) and stay neutral across models.`,
      concepts: ["sh06.arabic-benchmarks", "sh06.model-card"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh06-l02-f1", front: "Jais 2 in one line", back: "Inception (G42), MBZUAI, Cerebras; 9 Dec 2025; 70B; open weights; about 600B Arabic tokens.", concepts: ["sh06.openness-spectrum"] },
    { id: "sh06-l02-f2", front: "Falcon-H1 Arabic", back: "TII, 5 Jan 2026; 3B, 7B, 34B; hybrid Mamba-Transformer; up to 256K context; Falcon LLM License; OALL ranks vendor-reported.", concepts: ["sh06.model-card"] },
    { id: "sh06-l02-f3", front: "Three degrees of openness", back: "Closed (app or API), open weights (download under a licence), fully open (weights plus data and code, e.g. K2 Think).", concepts: ["sh06.openness-spectrum"] },
    { id: "sh06-l02-f4", front: "Licence inheritance", back: "Fine-tunes and continual pretrains carry the base model's terms: AceGPT (Llama 2), SILMA and Fanar Prime (Gemma).", concepts: ["sh06.licence-inheritance"] },
    { id: "sh06-l02-f5", front: "BALSAM", back: "SDAIA, KSGAAL and partners; 78 tasks, 14 categories, 52K examples (37K test, 15K dev); blind test sets against contamination.", concepts: ["sh06.arabic-benchmarks"] },
    { id: "sh06-l02-f6", front: "Contamination through translation", back: "NeurIPS 2026: translated exposure raised MMLU accuracy by 2.8 to 11.3 points. Compare public and blind scores.", concepts: ["sh06.contamination"] },
    { id: "sh06-l02-f7", front: "Training compute rule", back: md`$C \approx 6ND$; ALLaM-7B on 5.2T tokens is about $2.2\times10^{23}$ FLOP, about 153,000 H100-hours at 40% MFU.`, concepts: ["sh06.training-compute"] },
  ],
};

export default lesson;
