import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m14-l01",
  title: "How LLMs Work — for a Project Manager",
  summary:
    "Tokens, context windows, probabilistic next-token generation, why hallucinations happen, what LLMs are genuinely good and bad at, and how to choose a model for a PM task — with token and cost arithmetic for real tender documents.",
  minutes: 50,
  objectives: [
    "You can explain tokens, context windows and next-token prediction precisely enough to predict when an LLM will struggle",
    "You can estimate the token count and cost of a document task and decide whether it fits in one context or needs chunking",
    "You can explain why hallucinations occur and which PM outputs are most exposed (numbers, clause references, laws, citations)",
    "You can match PM tasks to LLM strengths and choose a model tier sensibly",
  ],
  concepts: [
    {
      id: "m14.tokens",
      name: "Tokens and tokenisation",
      description:
        "LLMs read and write subword units called tokens; roughly 1.3 tokens per English word as a rule of thumb, more for Arabic depending on the tokenizer.",
      competency: "ai",
      related: ["m14.context-window"],
    },
    {
      id: "m14.context-window",
      name: "Context window",
      description:
        "The maximum number of tokens (instructions + documents + conversation + output) the model can attend to at once; content outside it is invisible to the model.",
      competency: "ai",
    },
    {
      id: "m14.probabilistic-generation",
      name: "Probabilistic next-token generation",
      description:
        "The model computes a probability distribution over the next token and samples from it; temperature reshapes the distribution. Output is plausible by construction, not verified.",
      competency: "ai",
      related: ["m14.hallucination"],
    },
    {
      id: "m14.hallucination",
      name: "Hallucination",
      description:
        "Fluent output that is false or unsupported — invented clause numbers, figures, laws or citations — arising because generation optimises plausibility, not truth.",
      competency: "ai",
    },
    {
      id: "m14.llm-strengths-limits",
      name: "LLM strengths and limits for PM work",
      description:
        "Strong at reading, summarising, extracting, drafting, translating and reasoning over provided text; weak at unsourced facts, recent events, exact arithmetic without tools, and anything requiring accountability.",
      competency: "ai",
    },
    {
      id: "m14.model-choice",
      name: "Model choice",
      description:
        "Selecting a model by task complexity, context size, latency, cost and — first of all — whether the account's data-handling terms allow the data.",
      competency: "ai",
      related: ["m14.llm-strengths-limits"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What is actually happening inside the box",
      blocks: [
        {
          kind: "md",
          md: md`You do not need to build a large language model (LLM) to use one well, but you do need a correct mental model. A wrong mental model ("it's a search engine", "it's a database of facts", "it understands like a colleague") produces exactly the failures that embarrass PMs: invented clause numbers in a memo, a wrong total in a cost table, a confident summary of a law that changed last month.

### Tokens

An LLM does not see words or characters; it sees **tokens** — chunks of text from a fixed vocabulary of subword pieces. "Commissioning" may be one or two tokens; a number like "48,600,000" may be several. Practical rules of thumb:

- English prose: about **0.75 words per token**, i.e. about **1.3 tokens per word**.
- Arabic: depends heavily on the tokenizer; Arabic morphology (prefixes, suffixes, attached pronouns) usually yields **more tokens per word** than English. For planning, assume about 2 tokens per word and measure with your tool's token counter.
- Tables, numbers, code and PDFs converted to text inflate token counts.

Why you care: tokens set **cost**, **speed** and whether the document **fits**.`,
        },
        { kind: "equation", formula: "m14-token-estimate" },
        {
          kind: "md",
          md: md`### The context window

The **context window** is the model's working memory: the total tokens it can attend to at once — your instructions, any documents, the conversation so far, *and* its own output. Anything outside the window does not exist for the model. Current frontier models have windows of the order of hundreds of thousands of tokens, and some much more — check your tool's documentation, because this changes quickly.`,
        },
        { kind: "equation", formula: "m14-context-budget" },
        {
          kind: "md",
          md: md`Two subtleties matter for a PM:

1. **Fitting is not the same as using well.** Research on long contexts ("lost in the middle") found that models tested retrieved information placed in the middle of a long input less reliably than information at the start or end. Newer models are better, but the safe practice remains: put the instructions and the key question at the start (or repeat them at the end), and ask the model to **quote** the passages it relies on.
2. **Conversation accumulates.** In a long chat, earlier documents and turns consume the window. Start a fresh session for a new task, and restate essentials rather than relying on "as I said earlier".

### How text is generated

An LLM is a neural network (a **transformer**) trained to predict the next token given all previous tokens. At each step it produces a score (logit) for every token in its vocabulary; the scores become probabilities; one token is sampled; it is appended; the process repeats.`,
        },
        { kind: "equation", formula: "m14-softmax" },
        {
          kind: "md",
          md: md`**Temperature** $T$ reshapes the distribution. With logits 2, 1, 0 for three candidate tokens:

| Temperature | p(token 1) | p(token 2) | p(token 3) | Behaviour |
|---|---|---|---|---|
| 0.5 | 0.867 | 0.117 | 0.016 | Sharper, more deterministic |
| 1.0 | 0.665 | 0.245 | 0.090 | Default |
| 2.0 | 0.506 | 0.307 | 0.186 | Flatter, more varied |

For extraction and analysis, lower randomness is preferable; for brainstorming options, more variety helps. Many chat interfaces do not expose temperature — but the principle explains why **the same prompt can give different answers**, and why you should re-run important analyses or ask the model to check itself.

After pre-training on large text corpora, models are further trained (instruction tuning, reinforcement learning from feedback) to follow instructions, refuse harmful requests and be helpful. That makes them *conversational* — not *knowledgeable in a verified way*.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why hallucinations happen",
          md: md`The training objective rewards **plausible continuations**. When the model has strong evidence in its context (you pasted the contract), the plausible continuation is usually the true one. When it does not (you asked "what does Article 19 of Kuwait's tenders law say?" without providing the text), it still produces the most plausible-*looking* answer — a fluent paragraph with a confident article number. Hallucination is not a bug that appears occasionally; it is what the system does when evidence is missing. The specific outputs most exposed are exactly the ones a PM cares about: **numbers, dates, clause references, legal citations, names, and quotations**.`,
        },
        {
          kind: "md",
          md: md`### Knowledge cutoff

Each model's training data ends at a **cutoff date**. It will not know, for example, that Kuwait's Public Tenders Law was amended by Law No. 94 of 2026 (gazetted 27 September 2026) unless you provide that text — and it may confidently describe the old regime. Some tools can search the web; then the reliability of the answer depends on the sources found, which you must check.

### Strengths and limits for PM work

| Strong (with your documents in context) | Weak or risky |
|---|---|
| Summarising long documents into structured notes | Facts not in the context (laws, standards, project history) |
| Extracting clauses, obligations, dates into tables | Exact arithmetic over many numbers without a code/tool step |
| Comparing documents (bid vs requirements; Rev A vs Rev B) | Recent events after the cutoff |
| Drafting letters, memos, minutes in EN and AR | Exact clause/page citations unless asked to quote verbatim |
| Translating and adjusting register (formal Arabic) | Judgements that require accountability (award, acceptance, determination) |
| Generating options, risks, questions to ask | Confidential data on consumer accounts |
| Writing code to analyse data (with Claude Code or similar) | Silent errors in long tables — needs sampling verification |

The pattern: **LLMs are excellent at transforming text you give them, and unreliable as a source of facts you don't.**

### Choosing a model

Vendors typically offer tiers: larger, more capable models (best for complex reasoning, long documents, nuanced drafting) and smaller, faster, cheaper models (fine for simple extraction, classification, reformatting). Some models offer an extended reasoning or "thinking" mode that helps on multi-step analysis. Choose in this order:

1. **Data handling** — is this account (enterprise/government-approved vs consumer) allowed to receive this data? If not, stop here (lesson m14-l06).
2. **Task complexity** — contract risk review, delay analysis narratives, bilingual official drafting → most capable tier. Bulk reformatting, tagging a document register → smaller tier.
3. **Context size** — does the whole document set fit with room for output?
4. **Latency and cost** — rarely decisive for a PM; your review time costs far more than tokens.`,
        },
        { kind: "equation", formula: "m14-llm-cost" },
        {
          kind: "callout",
          tone: "ai",
          title: "AI tip — ask for evidence, not just answers",
          md: md`End analytical prompts with: "For every finding, quote the exact sentence from the document and give its clause or page number. If the document does not say, write NOT FOUND — do not infer." This converts unverifiable prose into checkable claims and gives the model explicit permission not to invent.`,
        },
        { kind: "sources", refs: ["m14-vaswani-2017", "m14-ji-hallucination", "m14-lost-in-middle", "m14-anthropic-docs", "m14-tamimi-tenders-2026"] },
      ],
    },
    {
      layer: "applied",
      title: "Sizing a document task: tokens, fit and cost",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Will the Employer's Requirements fit in one pass?",
          given: md`You want an LLM to extract all performance guarantees and testing obligations from the Employer's Requirements (ERs) of a PV + BESS project: **180 pages**, about **450 words/page**, English. Your instructions are about **1,500 tokens**; you expect an output table of about **8,000 tokens**. Assume a context window of **200,000 tokens** and **illustrative** prices of USD 3 per million input tokens and USD 15 per million output tokens (check your provider's current pricing).`,
          steps: [
            { md: md`Words: $180 \times 450 = 81{,}000$.` },
            { md: md`Document tokens: $T_{doc} \approx 1.3 \times 81{,}000 = 105{,}300$.` },
            {
              md: md`Context budget: $T_{doc} + T_{prompt} + T_{out} = 105{,}300 + 1{,}500 + 8{,}000 = 114{,}800 \le 200{,}000$ — fits, with headroom for follow-up questions.`,
            },
            {
              md: md`Cost: input $106{,}800 \times 3/10^6 = 0.32$ USD; output $8{,}000 \times 15/10^6 = 0.12$ USD; total about **USD 0.44**.`,
            },
            {
              md: md`**Interpretation.** Money is irrelevant compared with your time; the binding constraints are (a) whether the model uses the middle of a 105k-token document reliably — so ask for verbatim quotes with clause numbers — and (b) your verification effort on the output.`,
            },
          ],
          result: md`About **115k tokens**, fits a 200k window, cost under half a dollar at the illustrative rates. Design the prompt for verifiability, not for economy.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Four technical bids — one pass or many?",
          given: md`You want to compare four technical bids against the ERs. Each bid is about **600 pages** at **400 words/page**. Assume 1.3 tokens/word and that you keep about **150,000 tokens per pass** for documents (leaving room for instructions, the ERs extract and output).`,
          steps: [
            { md: md`Words: $4 \times 600 \times 400 = 960{,}000$.` },
            {
              md: md`Tokens: $1.3 \times 960{,}000 = 1{,}248{,}000$.`,
              hidden: true,
              check: { prompt: "Total bid tokens", answer: 1248000, unit: "tokens", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Passes needed: $1{,}248{,}000 / 150{,}000 = 8.32 \Rightarrow 9$ passes (round up).`,
              hidden: true,
              check: { prompt: "Number of passes (whole number)", answer: 9, tolerance: { abs: 0.1 } },
            },
            {
              md: md`**Design consequence.** Do not "upload everything and ask who is best". Chunk by **evaluation criterion** (e.g. module/inverter/BESS technical schedules first), use the same extraction template for every bid, and merge the structured outputs. Comparison then happens on tables you can check.`,
            },
          ],
          result: md`About **1.25 million tokens** — roughly nine passes. Structure beats brute force: same template, same criteria, per-bid extraction, then comparison.`,
        },
        {
          kind: "question",
          question: {
            id: "m14-l01-p1",
            type: "numeric",
            prompt: md`You ask an LLM to produce a bilingual letter pack: an Arabic letter of about **2,500 words** and an English version of about **2,000 words**. Using 2.0 tokens/word for Arabic and 1.3 tokens/word for English, how many output tokens should you budget?`,
            answer: 7600,
            unit: "tokens",
            tolerance: { rel: 0.01 },
            explanation: md`$2{,}500 \times 2.0 + 2{,}000 \times 1.3 = 5{,}000 + 2{,}600 = 7{,}600$ tokens. Arabic text often costs more tokens per word than English — relevant if your tool caps output length and the Arabic version gets cut off.`,
            concepts: ["m14.tokens"],
            difficulty: 1,
          },
        },
        {
          kind: "question",
          question: {
            id: "m14-l01-p2",
            type: "short",
            prompt: md`**Hands-on.** Write a prompt (5–10 lines) asking an LLM to list every **performance guarantee** in an attached ERs document. Design it so the output is verifiable and hallucination is discouraged.`,
            rubric: [
              "Assigns a role or context (e.g. reviewing a PV/BESS ERs for MEWRE)",
              "Specifies the task precisely (performance guarantees: what counts)",
              "Requires a structured output (table with defined columns)",
              "Requires verbatim quotes and clause/page references for each item",
              "Explicitly permits 'NOT FOUND' / forbids inference beyond the document",
            ],
            modelAnswer:
              "You are reviewing the attached Employer's Requirements for a utility-scale PV + BESS project for a Kuwaiti ministry. Task: list every performance guarantee or guaranteed value (e.g. PR, capacity, availability, round-trip efficiency, degradation, response times). Output a table with columns: #, Guarantee, Guaranteed value and unit, Test or measurement method, Remedy if missed, Clause/section number, Exact quote. Use only the document; if a column is not stated, write NOT FOUND. Do not infer values from industry practice. After the table, list any sections you could not read or that seemed truncated.",
            explanation: md`Role + task + constraints + output format + evidence requirement is the core pattern of lesson m14-l02. The explicit NOT FOUND permission matters: it gives the model a legitimate alternative to inventing.`,
            concepts: ["m14.hallucination", "m14.llm-strengths-limits"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Using LLMs on real MEWRE work",
      blocks: [
        {
          kind: "md",
          md: md`### Where an AI-native PM saves the most time

| Task | Typical manual time | With LLM | What you still own |
|---|---|---|---|
| First read of a 300-page bid or ER | 1–2 days | 1–2 hours to a structured summary | Reading the critical sections yourself |
| Clause extraction tables (LDs, guarantees, notices, time bars) | 1 day | 1 hour + verification | Spot-checking every row with legal effect |
| Drafting a letter, memo or minutes (EN/AR) | 2–4 hours | 30–60 minutes | Facts, tone, authority, final wording |
| Comparing revisions of a document | Hours | Minutes | Confirming material changes |
| Data analysis (schedule, EVM, SCADA) | Days in Excel | Hours via code the AI writes | Checking the code and results |
| Generating risks, questions, options | Brainstorm session | Minutes | Judgement on what matters |

### The operating rules

1. **Give it the source.** Never ask for facts the model must recall; paste or attach the document.
2. **Ask for structure.** Tables with fixed columns are easier to verify than prose.
3. **Ask for evidence.** Verbatim quotes, clause numbers, page numbers.
4. **Use tools for arithmetic.** Ask the model to write and run code (or use a spreadsheet) for any calculation beyond a few numbers.
5. **Verify proportionately.** Everything with legal, financial or safety effect is checked against the source.
6. **Respect classification.** The account must be approved for the data (lesson m14-l06).
7. **You sign it, you own it.** An AI draft is your draft once it leaves your desk.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Asking for law from memory** — "summarise Kuwait's PPP law" — and pasting the answer into a memo. Provide the text (KAPP publishes PPP Law 116/2014 and its executive regulations) or do not use the output.
- **Trusting totals** — an LLM adds 40 line items in its head and is off by KD 120,000.
- **One giant chat** — weeks of conversation, the original contract scrolled out of the window, answers drift.
- **Treating fluency as accuracy** — beautiful Arabic with a wrong date.
- **Uploading confidential bids to a personal account** — a classification breach regardless of the quality of the output.`,
        },
        {
          kind: "checklist",
          title: "Before you start any AI-assisted task",
          items: [
            "Is this account approved for this data classification?",
            "Have I provided the source documents rather than relying on the model's memory?",
            "Does the task fit in the context window with room for output, or must I chunk it?",
            "Have I specified a structured output and required quotes/clause references?",
            "Which outputs have legal, financial or safety effect and need full verification?",
            "Is any arithmetic involved that should be done by code or a spreadsheet?",
            "Is the model's knowledge cutoff relevant (recent laws, prices, events)?",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask IT / the AI tool owner",
          items: [
            "Which AI tools and accounts are approved for internal and confidential ministry data?",
            "Is our data used for model training, and how long is it retained?",
            "What is the context window and output limit of the approved model?",
            "Is there an approved way to process Arabic documents and scanned PDFs (OCR)?",
            "Who do I contact if I suspect I have shared data I should not have?",
          ],
        },
        {
          kind: "callout",
          tone: "ai",
          title: "AI tip — ask the model about its own limits",
          md: md`Before a long task, ask: "Before answering, tell me which parts of this request depend on information that is not in the attached documents." It surfaces the hallucination-prone parts of your request before you get a confident answer to them.`,
        },
        {
          kind: "feynman",
          prompt: "Explain to your Assistant Undersecretary why an AI tool can summarise a 200-page contract well but should not be trusted to state Kuwaiti law from memory.",
          keyPoints: [
            "LLMs predict plausible next tokens; with the document in context, plausible usually equals correct",
            "Without the source, they generate plausible-looking but unverified content (hallucination)",
            "Knowledge cutoff: recent laws (e.g. 2026 amendments) may be unknown",
            "Specifics like article numbers, figures and citations are most exposed",
            "Practice: provide the source, ask for quotes and clause numbers, verify",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m14-l01-q1",
      type: "mcq",
      prompt: "What best describes how an LLM produces an answer?",
      options: [
        "It looks up the answer in a database of verified facts",
        "It repeatedly predicts a probability distribution over the next token and samples from it",
        "It searches the internet for every answer",
        "It runs a symbolic logic engine over the question",
      ],
      answer: 1,
      explanation: md`Next-token prediction is the core mechanism. Some tools add web search or code execution, but the generation itself is probabilistic and optimised for plausibility.`,
      concepts: ["m14.probabilistic-generation"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m14-l01-q2",
      type: "numeric",
      prompt: "A 120-page specification at 500 words/page: using 1.3 tokens/word, how many tokens (thousands)?",
      answer: 78,
      unit: "thousand tokens",
      tolerance: { rel: 0.01 },
      explanation: md`$120 \times 500 = 60{,}000$ words; $\times 1.3 = 78{,}000$ tokens.`,
      concepts: ["m14.tokens"],
      difficulty: 1,
    },
    {
      id: "m14-l01-q3",
      type: "multi",
      prompt: "Which outputs are most exposed to hallucination when the source is NOT in the context? (Select all that apply.)",
      options: ["Clause and article numbers", "A rewrite of your own paragraph in formal Arabic", "Monetary figures and dates", "Citations of standards and laws", "Reformatting a table you pasted"],
      answer: [0, 2, 3],
      explanation: md`Specific, checkable facts the model must recall are where plausible-looking invention appears. Transforming text you provided is far safer.`,
      concepts: ["m14.hallucination"],
      difficulty: 1,
    },
    {
      id: "m14-l01-q4",
      type: "mcq",
      prompt: "Lowering the sampling temperature generally:",
      options: [
        "Makes outputs more random and creative",
        "Sharpens the probability distribution, making outputs more deterministic",
        "Increases the context window",
        "Eliminates hallucinations",
      ],
      answer: 1,
      explanation: md`$p_i = e^{z_i/T}/\sum_j e^{z_j/T}$: smaller $T$ amplifies differences between logits. It reduces variability but does **not** make the model factually correct.`,
      concepts: ["m14.probabilistic-generation"],
      difficulty: 2,
    },
    {
      id: "m14-l01-q5",
      type: "decision",
      prompt: md`You are the PM. A colleague's memo draft, written with an AI chat, states: "Under Article 19 of the Public Tenders Law, contracts above KD 75,000 require CAPT approval." The memo goes to the Undersecretary next week. What do you advise?`,
      options: [
        { text: "Fine — it sounds right", score: 0, feedback: "Plausible is not verified — and the law was amended by Law No. 94 of 2026 (effective about December 2026), which raises the direct-contracting threshold to KD 1 m per financial year." },
        { text: "Verify against the official text and a current legal source; note the 2026 amendment and its effective date; cite the source in the memo", score: 1, feedback: "Correct: legal statements must come from the source, and recent changes are exactly what a model's training may miss." },
        { text: "Ask the AI again whether it is sure", score: 0.2, feedback: "Self-confirmation from the same model is not verification." },
        { text: "Delete the sentence", score: 0.4, feedback: "Safer than leaving it, but the point may matter to the decision — verify and keep it correctly." },
      ],
      explanation: md`Legal facts from model memory are high-risk: specifics plus knowledge cutoff. Use primary sources.`,
      concepts: ["m14.hallucination", "m14.llm-strengths-limits"],
      difficulty: 2,
    },
    {
      id: "m14-l01-q6",
      type: "order",
      prompt: "Order the considerations when choosing an AI model/tool for a ministry task.",
      items: ["Data handling: is the account approved for this data?", "Task complexity", "Context size needed", "Latency and cost"],
      explanation: md`Data handling is a gate, not a trade-off. Then capability, then fit, and last cost — which is usually trivial compared with your time.`,
      concepts: ["m14.model-choice"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "m14-l01-f1", front: "Tokens per English word (rule of thumb)", back: "≈ 1.3 tokens/word (≈ 0.75 words/token). Arabic usually more — measure." },
    { id: "m14-l01-f2", front: "Context window", back: "Max tokens the model attends to at once: instructions + documents + conversation + output." },
    { id: "m14-l01-f3", front: "Why do LLMs hallucinate?", back: "Generation optimises plausibility; when evidence is missing from context, the most plausible-looking text is produced anyway." },
    { id: "m14-l01-f4", front: "Softmax with temperature", back: md`$p_i = e^{z_i/T} / \sum_j e^{z_j/T}$; lower $T$ = sharper.` },
    { id: "m14-l01-f5", front: "Knowledge cutoff — PM implication", back: "Recent laws, prices and events may be unknown; provide the source text." },
    { id: "m14-l01-f6", front: "'Lost in the middle'", back: "Models tested used mid-context information less reliably; put key instructions first/last and ask for quotes." },
    { id: "m14-l01-f7", front: "LLM sweet spot", back: "Transforming text you provide (summarise, extract, compare, draft, translate) — not recalling facts." },
    { id: "m14-l01-f8", front: "First gate in model choice", back: "Data handling: is this account approved for this classification of data?" },
  ],
};

export default lesson;
