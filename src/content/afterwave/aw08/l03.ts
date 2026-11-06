import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw08-l03",
  title: "Training local models on customer data: volumes, labels, model choice, compute and evaluation",
  summary:
    "Inside Enclave, customers train models on their own bench memory. The binding constraints are rarely compute: they are labels (failures are rare and expert time is scarce), leakage between training and test data, and honest evaluation with few positive examples. This lesson sizes data, labelling effort, compute and memory for small models and foundation models, and sets the evaluation rules a test lead will accept.",
  minutes: 85,
  objectives: [
    "Explain why labels, not compute, usually limit bench ML, and plan labelling from triage feedback and active learning",
    "Choose between classical models on features, small neural networks and foundation models (prompted, retrieval-augmented or fine-tuned) for a given task",
    "Estimate training compute with C ≈ 6ND, wall-clock time and weight memory for an on-prem deployment",
    "Design a split that prevents leakage (by unit, campaign or time) and a baseline to compare against",
    "Report a rate measured on few failures with a confidence interval (Wilson) or the rule of three",
  ],
  concepts: [
    {
      id: "aw08.label-scarcity",
      name: "Label scarcity",
      description:
        "Bench failures are rare and labelling needs expert engineers, so labelled positives number in the tens; the labelling plan (triage feedback, active learning, weak rules) matters more than the algorithm.",
      competency: "aw-ml",
      related: ["aw08.alarm-cost"],
    },
    {
      id: "aw08.model-choice",
      name: "Small models versus foundation models",
      description:
        "Numeric bench signals usually suit features with classical models or small neural networks trained locally; foundation (large language) models suit text, logs, reports and tool use, prompted with retrieval before any fine-tuning.",
      competency: "aw-ml",
      related: ["m14.model-choice"],
    },
    {
      id: "aw08.group-split",
      name: "Leakage-proof splits",
      description:
        "Windows from the same unit, run or campaign are strongly correlated; train and test sets must be split by unit, campaign or time, never by random window, or the reported accuracy is fiction.",
      competency: "aw-ml",
    },
    {
      id: "aw08.compute-estimate",
      name: "Compute and memory estimates",
      description:
        "Training compute about 6 × parameters × tokens for transformers, wall-clock from effective accelerator throughput, and weight memory parameters × bytes per parameter; used to size Enclave hardware.",
      competency: "aw-ml",
    },
    {
      id: "aw08.small-sample-eval",
      name: "Evaluation with few positives",
      description:
        "Rates measured on a dozen failures carry wide uncertainty; report intervals (Wilson, rule of three), compare against the engineers' current method, and keep a held-out set the model never saw.",
      competency: "aw-ml",
      related: ["aw08.precision-recall"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What limits a model trained on one customer's bench memory",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Step 2 of the Afterwave vision is customers training local models inside Enclave. Buyers will ask how much data they need, what hardware to put in the server room, whether they need a large language model, and how they will know it works. If you answer "AI learns from your data" you lose the engineer in the room. If you can say "with 12 labelled failures you can measure recall only to within about 40 points, so we start with anomaly detection and grow labels through triage", you win the engineer and set a pilot you can deliver.`,
        },
        {
          kind: "md",
          md: md`### Data volume is rarely the problem; labelled positives are

A mid-size lab produces terabytes of raw data a year (Lesson 1). After feature extraction the same year is a few gigabytes: millions of windows. What it does not produce is labelled failures. Illustrative but typical in shape: 400 endurance runs over three years, **12 confirmed failures**, 30 runs an engineer once noted as "odd". Every supervised method needs positives; every honest evaluation needs held-out positives.

Ways to get labels, cheapest first:

1. **Triage feedback** from the anomaly queue (Lesson 2): every alarm an engineer closes becomes a labelled example. The product should make labelling a one-click part of triage.
2. **Existing records**: failure reports, teardown findings, warranty returns, ticket systems. Link them to runs by unit serial and date. Lockstep's app log and test-step context make this join possible.
3. **Weak labels**: rules engineers already use (limit violations, aborted tests) as noisy labels.
4. **Active learning**: ask experts to label the examples the model is least sure about, not random ones. Labelling 200 well-chosen windows beats 2,000 random ones.
5. **Synthetic or injected faults**: seeded faults on a test platform (a damaged bearing, a loosened fixture). Valuable, expensive and slightly different from field failures.

Labelling cost is expert time: 2,000 windows at 3 minutes each is 100 hours, EUR 9,000 at an illustrative EUR 90/h, and it competes with test work.

### Choosing the model

| Task | Inputs | First choice | When to go further |
|---|---|---|---|
| Is this run unusual? | Features per step | Robust baselines, isolation forest (Lesson 2) | Autoencoder on waveforms when feature engineering stalls |
| Known failure mode classifier | Features, tens to hundreds of positives | Gradient-boosted trees | 1D CNN on windows when you have thousands of labelled windows |
| Predict a slow quantity (temperature rise, capacity fade) | Features over time | Linear or tree regression with physics features | Sequence models when you have many units with full histories |
| Summarise a campaign, draft a report, answer "what changed?" | Logs, notes, results tables, requirements | Foundation model with retrieval over bench memory and tools | Fine-tune only for format or vocabulary, after retrieval works |
| Plan retests, call rigs and tools | Ripple output, schedules, specs | Foundation model as agent with tools (Lesson 4) | Never fine-tune before you have an evaluation suite |

Two rules. **Numbers go to numeric models**: a language model reading raw sensor values in text is slower, more expensive and less reliable than a gradient-boosted tree on features. **Language models go where language is**: test reports, failure notes, requirement text, log messages, and orchestrating tools. General LLM mechanics (tokens, context, hallucination, model choice) are in Track 0 and Founder Core; see the links below.

### Foundation models: prompt, retrieve, then fine-tune

For language tasks, the order of escalation is: **prompt** a capable model with good instructions; add **retrieval** (search bench memory and pass the relevant records into the context); give it **tools** (query the database, run analysis code); and only then consider **fine-tuning** (LoRA adapters trained on a few thousand curated examples) to fix format, terminology or latency with a smaller model. Fine-tuning does not reliably teach facts; retrieval does. Inside Enclave the model must run locally (open-weight models on the customer's hardware) or call an endpoint the customer already approved; Lesson 5 covers why.

### Compute and memory`,
        },
        { kind: "equation", formula: "aw08-train-flops" },
        { kind: "equation", formula: "aw08-gpu-time" },
        { kind: "equation", formula: "aw08-weight-memory" },
        {
          kind: "md",
          md: md`Orders of magnitude worth carrying (illustrative; check current hardware):

| Workload | Compute | Hardware it fits |
|---|---|---|
| Gradient-boosted trees, 400 runs × 200 features | Seconds | Any CPU server |
| Isolation forest on 5 million windows × 40 features | Minutes | CPU server |
| 1D CNN autoencoder, a few million parameters, 10 million windows | Minutes to hours | One GPU, or many CPU cores slowly |
| LoRA fine-tune of an 8B model on 60 million tokens | $6 \times 8\times10^9 \times 6\times10^7 = 2.9\times10^{18}$ FLOP, about 8 h at 100 TFLOP/s effective | One data-centre GPU |
| Serving an 8B model in bf16 | 16 GB weights plus cache | One 24 to 48 GB GPU |
| Serving a 70B model in bf16 | 140 GB weights plus cache | Two 80 GB GPUs, or one with 4-bit quantisation (about 35 GB) |

The lesson: for bench signals, compute is cheap. The GPU question is mostly about **serving** a language model for agents and reports, which sets the Enclave hardware bill.`,
        },
        {
          kind: "flow",
          title: "Training a model inside Enclave",
          steps: [
            { label: "Define the decision", detail: "What will an engineer do differently with the output? Sets the metric and the cost of errors." },
            { label: "Assemble data with context", detail: "Features plus unit, rig, firmware, campaign ids; link failure records." },
            { label: "Split by group", detail: "Hold out whole units or the latest campaign; freeze the test set." },
            { label: "Baseline", detail: "The engineers' current rule or a robust z-score. The model must beat it." },
            { label: "Train and tune", detail: "On training folds only; group k-fold for tuning." },
            { label: "Evaluate with intervals", detail: "Recall, precision at production base rate, Wilson intervals, per-rig breakdown." },
            { label: "Deploy and monitor", detail: "Version model and data; watch drift after firmware or rig changes; retrain on a schedule." },
          ],
        },
        {
          kind: "md",
          md: md`### Leakage: the main reason bench ML results do not reproduce

Windows from the same run are nearly identical; runs of the same unit share its quirks; a campaign shares rig, fixture and firmware. A **random window split** puts near-copies of test windows into training, and the model scores 99 % by recognising the unit, not the fault. Rules:

- Split by **unit serial** (group k-fold) for "will it work on a new unit?".
- Split by **time or campaign** (train on earlier, test on later) for "will it work next quarter after firmware changes?".
- Compute baselines, normalisation statistics and feature selection on the training fold only.
- Remove features that encode the label indirectly (an "aborted" flag when predicting failure, a test-step id that only failed units reached).

### Evaluating with few failures

With 12 failures, recall moves in steps of 8 points, and its uncertainty is wide:`,
        },
        { kind: "equation", formula: "aw08-wilson" },
        { kind: "equation", formula: "aw08-rule-of-three" },
        {
          kind: "chart",
          chart: "bar",
          title: "Same observed recall (83 %), different evidence: 95 % Wilson intervals",
          xKey: "n",
          xLabel: "Failures in the held-out set",
          yLabel: "Recall, %",
          series: [
            { key: "low", label: "Lower bound" },
            { key: "obs", label: "Observed" },
            { key: "high", label: "Upper bound" },
          ],
          data: [
            { n: "12 (10 caught)", low: 55.2, obs: 83.3, high: 95.3 },
            { n: "120 (100 caught)", low: 75.7, obs: 83.3, high: 88.9 },
          ],
          caption: "Computed with the Wilson formula, z = 1.96. With a dozen failures you can say 'between about half and nearly all'. Plan pilots so the claim you need is supported by the number of failures you will have.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing a first model and its hardware for a drive-unit lab",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What can be trained on 400 runs and 12 failures?",
          given: md`Illustrative. A drive-unit lab has 400 endurance runs over three years on 120 unit serials, 4 rigs, 9 firmware releases. 12 runs ended in confirmed failures (bearing, winding insulation, gear). Features: 200 per test step (Lesson 1). The validation lead wants "a model that predicts failures".`,
          steps: [
            { md: md`**Positives per class:** 12 failures over three modes is about 4 per mode. A supervised classifier per mode is not credible. A single "failure vs healthy" classifier with 12 positives is fragile and its evaluation would have an interval roughly 40 points wide.` },
            { md: md`**Plan:** (1) per-step robust baselines plus an isolation forest on features (unsupervised, trained on runs labelled healthy); (2) evaluate on the 12 failures plus 100 healthy runs from held-out units; (3) every alarm in production is triaged and labelled; (4) revisit supervised models per mode once each has 30 or more positives.` },
            { md: md`**Split:** hold out 30 whole unit serials (25 %), including 4 of the failures, for the final test; tune with group 5-fold on the remaining 90 units. Second check: train on the first two years, test on year three (new firmware releases).` },
            { md: md`**Evaluation statement for the 4 held-out failures:** if all 4 are caught, recall is 100 % observed, but the Wilson 95 % lower bound is only about 51 %. Say so. If 0 false alarms occur on 100 held-out healthy runs, the false alarm rate is below about $3/100 = 3\%$ (rule of three), not zero.` },
            { md: md`**Compute:** isolation forest on about 1 million step-windows × 200 features trains in minutes on a CPU server. No GPU is needed for this model.` },
          ],
          result: md`The honest first model is unsupervised detection with a labelling loop, not failure prediction. Say this in the pilot proposal; it is more credible and it is the route by which failure prediction becomes possible later.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Hardware for a local language model in Enclave",
          given: md`Illustrative. The same customer wants an assistant that drafts weekly test reports and answers questions over bench memory, running entirely on their servers. Options: an 8B open-weight model or a 70B open-weight model, both in bf16 (2 bytes per parameter). Later they may LoRA fine-tune the 8B model on 20 million tokens of past reports for 3 epochs. Effective throughput 100 TFLOP/s per GPU (illustrative).`,
          steps: [
            {
              md: md`8B weights: $8 \times 10^9 \times 2 =$ **16 GB**.`,
              hidden: true,
              check: { prompt: "8B model weight memory (GB)", answer: 16, unit: "GB", tolerance: { abs: 0.1 } },
            },
            {
              md: md`70B weights: $70 \times 10^9 \times 2 =$ **140 GB**, so at least two 80 GB accelerators before any key-value cache.`,
              hidden: true,
              check: { prompt: "70B model weight memory (GB)", answer: 140, unit: "GB", tolerance: { abs: 0.5 } },
            },
            { md: md`Fine-tune compute upper estimate: $C = 6ND$ with $N = 8\times10^9$, $D = 3 \times 2\times10^7 = 6\times10^7$ tokens.` },
            {
              md: md`$C = 6 \times 8\times10^9 \times 6\times10^7 = 2.88\times10^{18}$ FLOP; $t = 2.88\times10^{18}/10^{14} = 28{,}800$ s = **8 h** on one GPU.`,
              hidden: true,
              check: { prompt: "Fine-tune time on one GPU (hours)", answer: 8, unit: "h", tolerance: { abs: 0.1 } },
            },
            { md: md`Start with the 8B or a mid-size model with retrieval over bench memory, measured on a set of 50 real questions with known answers, before buying for 70B.` },
          ],
          result: md`Serving, not training, sets the GPU budget: one GPU for a small model, two or more for a large one. A one-day fine-tune is cheap; the expensive part is curating 20 million tokens of good examples and an evaluation set.`,
        },
        {
          kind: "question",
          question: {
            id: "aw08-l03-p1",
            type: "numeric",
            prompt: md`A model ran on 250 held-out healthy runs with zero false alarms. Using the rule of three, what is the approximate 95 % upper bound on its false alarm rate, in %?`,
            answer: 1.2,
            tolerance: { abs: 0.05 },
            unit: "%",
            explanation: md`$3/250 = 0.012 = 1.2\%$. "Zero false alarms" means "probably below 1.2 % per run", which at 2,000 runs a month could still be up to 24 false alarms.`,
            concepts: ["aw08.small-sample-eval"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running ML projects with test teams",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **Customer test engineers**: define the decision, label, review alarms, own the golden runs. Budget their hours in the pilot plan; it is the scarcest resource.
- **Customer IT and security**: provision Enclave hardware, approve models and endpoints (Lesson 5).
- **Afterwave engineers**: feature pipelines, training and evaluation tooling, model registry, monitoring. The product should make the evaluation (group split, baseline, intervals) the default, not an expert's choice.
- **You**: set expectations in the proposal, write success criteria the data can support, and stop the "predict all failures" promise before it is made.

### What a model card for a bench model contains

Model name and version; training data (units, rigs, firmware range, date range, number of positives per class); split method; baseline and its score; metrics with intervals at the production base rate; known blind spots (rigs or variants not covered); retraining trigger (new firmware family, rig recalibration, drift alarm); owner.

### Regulatory edge

If a customer's own product uses ML in a **safety function**, the EU Machinery Regulation places it in Annex I Part A (third-party conformity assessment) from 20 January 2027, and the evidence of how that model was trained and validated becomes conformity evidence. Afterwave's models in Enclave are test tools, not safety functions, but the same discipline (versioned data, frozen test sets, model cards) makes Enclave the place where that evidence lives. Module aw11 covers the regulation.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Random window splits.** 99 % in the notebook, 60 % on the next unit. Always ask how the split was made.
- **Promising failure prediction with a dozen failures.** The evaluation cannot support the claim, and the pilot fails on criteria you wrote.
- **LLM on raw numbers.** Slow, costly and wrong where a tree model on features is fast and right.
- **Fine-tuning to add knowledge.** It teaches style and format; retrieval supplies facts.
- **No baseline.** A model that beats nothing has not been shown to add value; the engineers' current rule is the comparator.
- **Silent drift.** A firmware release or rig recalibration changes the data; the model's performance drops and nobody notices. Monitor input distributions and alarm rates per rig.`,
        },
        {
          kind: "ask",
          title: "Questions to ask before training anything",
          items: [
            "What decision will change if this model works, and what does a wrong output cost?",
            "How many confirmed examples of each failure mode exist, and where are the records that confirm them?",
            "How was the train/test split made: by unit, campaign, time, or by window?",
            "What does the current method (limit checks, engineer review) score on the same held-out set?",
            "What will trigger retraining, and who approves a new model version?",
          ],
        },
        {
          kind: "xref",
          to: "m14-l01",
          note: "How LLMs work (tokens, context windows, probabilistic generation, hallucination, model choice) is covered in Track 0; this lesson only adds where LLMs fit on bench data.",
        },
        {
          kind: "xref",
          to: "fc10-l05",
          note: "Founder Core's verification habits apply to every model output you put in a customer report.",
        },
        {
          kind: "question",
          question: {
            id: "aw08-l03-p2",
            type: "short",
            prompt: md`**Produce it.** A humanoid robotics prospect asks Afterwave to "train a model on our actuator test data to predict failures". Write the one-page technical plan you would send back (illustrative numbers): the decision the model supports; data inventory and labelled positives you will ask for; what you will build first and why; split and baseline; evaluation metrics with how you will express uncertainty; compute and hardware needed inside Enclave; and what would have to be true to move to failure prediction.`,
            rubric: [
              "Reframes the request around a decision and the cost of errors",
              "Asks for counts of labelled positives per failure mode and links to failure records",
              "First model matches the label situation (unsupervised detection with labelling loop when positives are few) with a reason",
              "Split by unit or time with a frozen held-out set, and a named baseline comparator",
              "Uses intervals (Wilson or rule of three) and production base rate in the evaluation plan",
              "Compute and hardware estimate is plausible and separates training from serving",
            ],
            modelAnswer: md`**Plan: actuator test analytics (illustrative).**

**Decision.** Which actuators on the endurance line should be pulled for inspection before the end of the campaign, and which test results after a firmware change need an engineer's review. Miss cost: a field-return-class failure discovered late (assume EUR 15k). False alarm: 30 min inspection (EUR 45).

**Data we will ask for.** All endurance and torque-ripple runs of the last 24 months with unit serial, rig, firmware and step context; failure and teardown reports with serials and dates; current limit checks. We need the number of confirmed failures per mode; we expect tens in total.

**First build.** Per-step robust baselines and an isolation forest on about 150 features (torque ripple orders, current unbalance, back-drive torque, temperature slope, kurtosis). Unsupervised because positives per mode are too few for classifiers. Every alarm is triaged in Enclave with one-click labels, which grows the labelled set.

**Split and baseline.** Hold out 25 % of unit serials and the most recent two months; never used for tuning. Baseline: your current limit checks plus a robust z-score per step.

**Evaluation.** Recall on held-out failures and precision restated at the production base rate (your estimate: about 1 %), at an agreed alarm budget of 3 per day. Every rate reported with a 95 % Wilson interval; zero-event results with the rule of three. Breakdown per rig.

**Compute.** Feature extraction and isolation forest run on a CPU server (16 to 32 cores, 128 GB RAM, storage for features plus flagged raw data). No GPU for this phase. If you later want a local language model for reports, add one 48 GB GPU for an 8B to 14B class model.

**Path to failure prediction.** At least 30 confirmed examples of a failure mode, linked to runs; a supervised model per mode that beats the unsupervised detector on held-out units with non-overlapping intervals; and a monitored retraining trigger for firmware families.`,
            explanation: md`The grader checks that the plan follows the label situation, prevents leakage, states uncertainty honestly and sizes hardware sensibly.`,
            concepts: ["aw08.label-scarcity", "aw08.model-choice", "aw08.group-split", "aw08.small-sample-eval", "aw08.compute-estimate"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Ismail why a model that scores 99 % on a random split of windows may be useless on the next drive unit, and what split you want instead.",
          keyPoints: [
            "Windows from the same run and unit are near-copies, so a random split puts test data in training",
            "The model learns to recognise the unit or rig, not the fault",
            "Split by unit serial, or by time or campaign, and freeze the held-out set",
            "Normalisation and feature selection must be fitted on the training fold only",
            "Compare against the current engineering rule on the same held-out set",
          ],
        },
        { kind: "sources", refs: ["aw08-r9", "aw08-r10", "aw08-r11", "aw08-r12", "aw08-r22"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw08-l03-q1",
      type: "mcq",
      prompt: "In a typical bench ML project, which resource usually limits what can be trained?",
      options: [
        "GPU compute",
        "Raw data volume",
        "Labelled examples of failures, and expert time to create them",
        "Storage",
      ],
      answer: 2,
      explanation: md`Labs produce terabytes but few confirmed failures. Compute for bench-signal models is cheap; labels are not.`,
      concepts: ["aw08.label-scarcity"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw08-l03-q2",
      type: "numeric",
      prompt: md`Estimate training compute (in FLOP, as a number like 1.2e18) for fine-tuning a 3B-parameter transformer on 50 million tokens for 2 epochs, using $C \approx 6ND$.`,
      answer: 1.8e18,
      tolerance: { rel: 0.02 },
      unit: "FLOP",
      explanation: md`$D = 2 \times 5\times10^7 = 10^8$; $C = 6 \times 3\times10^9 \times 10^8 = 1.8\times10^{18}$ FLOP. At 100 TFLOP/s effective: 18,000 s = 5 h.`,
      concepts: ["aw08.compute-estimate"],
      difficulty: 2,
    },
    {
      id: "aw08-l03-q3",
      type: "numeric",
      prompt: md`How much memory (GB) do the weights of a 32B-parameter model need at 4-bit quantisation (0.5 bytes per parameter)?`,
      answer: 16,
      tolerance: { abs: 0.2 },
      unit: "GB",
      explanation: md`$32\times10^9 \times 0.5 = 16$ GB, plus key-value cache and activations on top.`,
      concepts: ["aw08.compute-estimate"],
      difficulty: 1,
    },
    {
      id: "aw08-l03-q4",
      type: "mcq",
      prompt: "A data scientist reports 98 % recall from a random 80/20 split of one-second windows across all units. What do you ask first?",
      options: [
        "Which GPU was used",
        "Whether windows from the same unit or run appear in both training and test sets",
        "Whether a larger model would reach 99 %",
        "How many epochs were trained",
      ],
      answer: 1,
      explanation: md`Correlated windows on both sides of the split is leakage; the score measures recognition of the unit, not detection of the fault.`,
      concepts: ["aw08.group-split"],
      difficulty: 2,
    },
    {
      id: "aw08-l03-q5",
      type: "multi",
      prompt: "Which tasks suit a foundation language model inside Enclave better than a classical model on features? (Select all that apply.)",
      options: [
        "Drafting a weekly test campaign report from results tables and engineer notes",
        "Classifying 1-second vibration windows as healthy or bearing fault",
        "Answering 'what changed between firmware 3.1 and 3.2 runs on rig 2?' using retrieval and query tools",
        "Linking free-text failure reports to test runs",
        "Computing RMS and kurtosis per window",
      ],
      answer: [0, 2, 3],
      explanation: md`Language models fit language and tool orchestration. Numeric classification and feature computation belong to numeric models and code.`,
      concepts: ["aw08.model-choice"],
      difficulty: 2,
    },
    {
      id: "aw08-l03-q6",
      type: "decision",
      prompt: md`A pilot ends with the model catching 5 of 6 held-out failures. The buyer's success criterion was "recall at least 80 %". Your engineer wants to announce "83 % recall, criterion met". What do you do?`,
      options: [
        { text: "Announce 83 %, criterion met.", score: 0.2, feedback: "Technically true, but with 6 failures the 95 % interval is about 44 % to 97 %. A sceptical engineer will say so, and you lose credibility." },
        { text: "Report 5 of 6 (83 %) with its interval, the comparison against their current method on the same set, and propose extending evaluation as triage labels accumulate.", score: 1, feedback: "Honest, defensible and sets up the expansion." },
        { text: "Say the result is inconclusive and ask for another pilot.", score: 0.4, feedback: "Undersells a positive result; report it with uncertainty and a path to more evidence." },
      ],
      explanation: md`With few failures, report counts, intervals and the baseline comparison. The criterion itself should have been written with the expected number of failures in mind.`,
      concepts: ["aw08.small-sample-eval"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw08-l03-f1", front: "Training compute of a transformer", back: md`$C \approx 6ND$ FLOP (parameters × tokens × 6).`, concepts: ["aw08.compute-estimate"] },
    { id: "aw08-l03-f2", front: "Weight memory", back: md`Parameters × bytes: 8B bf16 = 16 GB; 70B bf16 = 140 GB; 4-bit about a quarter of bf16.`, concepts: ["aw08.compute-estimate"] },
    { id: "aw08-l03-f3", front: "Rule of three", back: md`Zero events in $n$ trials: 95 % upper bound about $3/n$.`, concepts: ["aw08.small-sample-eval"] },
    { id: "aw08-l03-f4", front: "Recall 10 of 12: 95 % Wilson interval", back: "About 55 % to 95 %.", concepts: ["aw08.small-sample-eval"] },
    { id: "aw08-l03-f5", front: "Leakage-proof split for bench data", back: "By unit serial (group k-fold) or by time or campaign; never by random window.", concepts: ["aw08.group-split"] },
    { id: "aw08-l03-f6", front: "Order of escalation for language tasks", back: "Prompt, then retrieval, then tools, then fine-tuning (for format and vocabulary, not facts).", concepts: ["aw08.model-choice"] },
    { id: "aw08-l03-f7", front: "Cheapest source of labels", back: "Triage feedback on alarms, made one-click in the product.", concepts: ["aw08.label-scarcity"] },
  ],
};

export default lesson;
