import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m14-l03",
  title: "Drafting EN/AR Documents with AI",
  summary:
    "Using AI to draft reports, memos, minutes and letters in English and official Arabic: the facts-sheet workflow, controlling register and defined terms, bilingual drafting without literal translation, reusable prompt templates — and the review that keeps you in control.",
  minutes: 55,
  objectives: [
    "You can run the facts-sheet → draft → critique → revise workflow so the AI never supplies facts",
    "You can control register and terminology in Arabic official drafts with a style guide and a term list",
    "You can produce bilingual documents in which the Arabic is drafted, not translated word for word",
    "You can use and adapt prompt templates for letters, memos, minutes and monthly reports",
    "You can review an AI draft for invented facts, unintended commitments and tone",
  ],
  concepts: [
    {
      id: "m14.facts-sheet",
      name: "Facts-sheet drafting workflow",
      description:
        "You supply a verified list of facts (numbers, dates, references, positions); the AI supplies structure and language; nothing factual originates from the model.",
      competency: "ai",
      related: ["m14.hallucination", "m13.contract-notice"],
    },
    {
      id: "m14.register-control",
      name: "Register and tone control",
      description:
        "Specifying audience, formality, house style and set phrases (e.g. Gulf official Arabic) with examples so the draft reads as an official document.",
      competency: "ai",
      related: ["m13.arabic-correspondence", "m13.plain-language"],
    },
    {
      id: "m14.term-consistency",
      name: "Defined-term consistency",
      description:
        "Supplying a bilingual term list (e.g. Time for Completion = مدة الإنجاز) so contractual terms match the Contract exactly in both languages.",
      competency: "contracts",
      related: ["m14.register-control"],
    },
    {
      id: "m14.critique-revise",
      name: "Critique-then-revise loop",
      description:
        "Asking the model to critique its draft against explicit criteria, then revise — and doing your own review against facts, authority and tone.",
      competency: "ai",
    },
    {
      id: "m14.bilingual-drafting",
      name: "Bilingual drafting",
      description:
        "Drafting each language from the same facts and structure, in its own idiom, rather than translating sentence by sentence; checking that both versions say the same thing.",
      competency: "leadership",
      related: ["m14.term-consistency", "m13.arabic-correspondence"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What AI is good at in drafting — and where it must be fenced in",
      blocks: [
        {
          kind: "md",
          md: md`Drafting is the task where LLMs feel most magical and where PMs get into the most trouble. Turning notes into a polished letter is a **transformation** task — the model's strength. But a letter also contains **facts** (dates, references, numbers, positions) and **commitments** (what the ministry agrees to, requests or reserves). Facts must come from you; commitments must be deliberate. The workflow is designed around that split.

### The facts-sheet workflow

1. **Facts sheet (you).** A short, verified list: reference numbers and dates of prior letters, contract clauses, numbers with units, the ministry's position, what you want the reader to do, by when. Nothing goes in that you have not checked.
2. **Draft (AI).** Prompt: role, audience, document type, the facts sheet, constraints ("use only these facts; do not add dates, numbers or references; mark any gap as [ ]"), style guide, output format.
3. **Critique (AI, then you).** Ask the model to check its draft against explicit criteria: every fact traceable to the facts sheet? any commitment or acceptance not in the facts sheet? tone appropriate? length within limit? Then do your own review.
4. **Revise and finalise (you).** Your name or your superior's goes on it; you own every word.

The constraint "mark any gap as [ ]" is the drafting equivalent of NOT FOUND: it gives the model a legitimate alternative to inventing a plausible date or reference number.

### Register and tone

Official documents carry institutional voice. In English that means plain, factual, courteous and firm. In Gulf official Arabic it means set opening and closing formulas, impersonal/plural constructions, precise references, formal MSA vocabulary, and no colloquialisms or literal anglicisms. Models write fluent MSA, but without guidance they may:

- produce prose that reads as translated ("نحن نكتب إليكم لكي نخبركم..." instead of "نود إحاطتكم علماً بأن...");
- mix registers (journalistic or overly ornate phrasing);
- use terms inconsistent with the Contract's Arabic defined terms;
- convert or invent Hijri dates incorrectly.

The fix is a **style guide in the prompt** plus **one or two exemplar letters** (anonymised house-style letters from your archive) showing structure and phrasing.

### Defined terms: the silent risk

Contracts define terms (Employer, Engineer, Contractor, Time for Completion, Taking-Over Certificate, Delay Damages). In a bilingual contract each has an exact Arabic equivalent. A letter that renders "Time for Completion" three different ways in Arabic creates ambiguity precisely where the Arabic prevails. Provide a term list and instruct the model to use it exactly.

| English (Contract) | Arabic (use exactly as in the Contract) |
|---|---|
| Employer | صاحب العمل |
| Engineer | المهندس |
| Contractor | المقاول |
| Time for Completion | مدة الإنجاز |
| Delay Damages | تعويضات التأخير |
| Taking-Over Certificate | شهادة الاستلام |
| Variation | أمر تغييري |
| Notice | إشعار |

(These are common renderings; your Contract's Arabic version governs — copy its terms.)

### Bilingual drafting, not translation

Translation sentence by sentence produces Arabic that follows English syntax and English that follows Arabic rhetoric. Better: draft **both versions from the same facts sheet and structure**, each in its own idiom, then ask the model (and a human) to check **equivalence of substance** — same facts, same requests, same reservations, same deadlines. If one version governs, draft it first and with most care.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the AI must not supply facts in a letter",
          md: md`A letter is a record. If an AI-drafted letter cites "your letter Ref. MEW/123 dated 3 March" and no such letter exists, the ministry has put a false statement on file — and the contractor will point it out. If it states a delay of 45 days when the analysis says 38, it may undermine a later delay-damages position. Every number, date and reference in an official document must be traceable to a verified source you provided.`,
        },
        { kind: "equation", formula: "m14-time-saving" },
        {
          kind: "callout",
          tone: "ai",
          title: "AI tip — make the model show its sources inside the draft",
          md: md`For internal review drafts, ask: "After each sentence containing a fact, add the facts-sheet item number in square brackets, e.g. [F3]." You can then check every fact in seconds and delete the tags before sending. Sentences with no tag that contain a fact are invented.`,
        },
        { kind: "sources", refs: ["m14-anthropic-docs", "m14-fidic"] },
      ],
    },
    {
      layer: "applied",
      title: "Improving a drafting prompt, and measuring the gain",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "An Arabic delay letter to an EPC contractor — prompt v0 to v5",
          given: md`You need an Arabic letter (with English courtesy copy) to the EPC contractor for MEWRE's 400 kV substation, requiring a revised programme after a 38-day critical-path delay. Arabic prevails under the Contract.`,
          steps: [
            {
              md: md`**v0:** "Write a letter in Arabic to the contractor about the delay." *Result:* a polite, vague letter; invents "your letter dated 12/3"; says the delay is "approximately two months"; promises "the Ministry's full support"; no clause, no deadline.`,
            },
            {
              md: md`**v1 — role, audience, document type:** "You draft official correspondence for a Kuwaiti ministry. Write a formal contractual Notice in Arabic from the Employer to the EPC Contractor." *Result:* correct register, still invented facts.`,
            },
            {
              md: md`**v2 — facts sheet:** add a numbered list: F1 contract number; F2 progress report No. 14 dated [date]; F3 planned 66.0% vs actual 61.2%; F4 critical-path delay 38 days; F5 no EOT claim notice received; F6 instruction under the rate-of-progress Sub-Clause [number]; F7 submit revised programme within 14 days; F8 reserve rights incl. Delay Damages under Sub-Clause [number]; F9 invitation to meeting on [date]. *Result:* the right content.`,
            },
            {
              md: md`**v3 — constraints:** "Use only facts F1–F9. Do not add dates, numbers, references or commitments. Where information is missing, write [ ]. Do not express thanks, support or acceptance. Identify the letter as إشعار in the subject." *Result:* no invented letter reference; no accidental commitments.`,
            },
            {
              md: md`**v4 — style guide and terms:** add the opening/closing formulas (تحية طيبة وبعد، وتفضلوا بقبول فائق الاحترام), the term list (مدة الإنجاز، تعويضات التأخير، المهندس، المقاول), numbered paragraphs, and an anonymised exemplar letter from the archive. *Result:* reads like the ministry's own correspondence.`,
            },
            {
              md: md`**v5 — critique and equivalence check:** "Then (a) list every fact in the letter with its F-number; (b) list any sentence that could be read as an Employer commitment or acceptance; (c) produce the English courtesy copy and confirm both versions contain the same facts, requests, deadline and reservations." *Result:* a draft plus its own audit trail — you verify against the facts sheet and Contract, then send for signature.`,
            },
          ],
          result: md`The final prompt is a reusable template: change the facts sheet and it produces a compliant notice in house style, with a fact map and an equivalence check. The human work shifts from writing to verifying facts, authority and clause numbers.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Is the AI workflow worth it for the monthly bilingual report?",
          given: md`The monthly progress report to the Assistant Undersecretary is about **6,000 words** in English plus a full Arabic version. **Manual:** drafting English at about **500 words/hour**; producing the Arabic at about **300 words/hour**. **AI workflow:** preparing the facts sheet and data tables **2 h**; reviewing the English AI draft at about **1,500 words/hour**; reviewing the Arabic at about **1,000 words/hour**.`,
          steps: [
            { md: md`Manual time: $6000/500 + 6000/300 = 12 + 20 = 32$ h.` },
            {
              md: md`AI workflow time: $2 + 6000/1500 + 6000/1000 = 2 + 4 + 6 = 12$ h.`,
              hidden: true,
              check: { prompt: "AI workflow time (hours)", answer: 12, unit: "h", tolerance: { abs: 0.1 } },
            },
            {
              md: md`Saving: $S = 1 - 12/32 = 0.625 = 62.5\%$, i.e. 20 hours a month.`,
              hidden: true,
              check: { prompt: "Fractional time saving (%)", answer: 62.5, unit: "%", tolerance: { abs: 0.2 } },
            },
          ],
          result: md`About **20 hours a month** saved — but only if review is real. If you skip the review, the saving is not 62.5%; it is a liability. Re-invest part of the saving in better data and verification.`,
        },
        {
          kind: "question",
          question: {
            id: "m14-l03-p1",
            type: "short",
            prompt: md`**Hands-on.** Write a prompt that turns your rough notes from a progress meeting into minutes in the ministry's format (decisions + action log), in English and Arabic.`,
            rubric: [
              "Role/context: minutes for a MEWRE progress meeting on a named contract",
              "Provides the notes and attendance as the only source; forbids adding facts",
              "Specifies structure: attendance, sections, decisions, action log with ID/owner/due date/status",
              "Handles contractual statements: records Employer's response where noted; flags any unclear item",
              "Bilingual output with term consistency and equivalence check",
              "Gaps marked [ ] rather than invented",
            ],
            modelAnswer:
              "You prepare minutes for MEWRE progress meetings. Source: my notes and attendance list below — use nothing else; mark any missing owner, date or figure as [ ]. Structure: header (contract, meeting no., date, attendees), then sections 1 Safety, 2 Previous actions, 3 Progress vs programme, 4 Engineering/procurement, 5 Quality, 6 Risks, 7 Contractual points raised, 8 Decisions, then an Action Log table (ID A[meeting]-nn, Action, Owner — named person and organisation, Due, Status). Record decisions and actions, not discussion. Where my notes show a Contractor statement on delay or entitlement, record it neutrally and add the Employer's response exactly as in my notes; if my notes have no response, flag it for me. Produce English and Arabic versions using this term list: [list]. Finally, confirm both versions contain the same decisions, actions, owners and dates, and list any note you could not interpret.",
            explanation: md`Minutes are evidence; the prompt must forbid invention, force owners and dates, protect the Employer's position on contractual statements, and keep both languages equivalent.`,
            concepts: ["m14.facts-sheet", "m14.bilingual-drafting"],
            difficulty: 2,
          },
        },
        {
          kind: "md",
          md: md`### Reusable prompt templates

Keep these in your prompt library (lesson m14-l06), with your ministry's style guide and term list attached.`,
        },
        {
          kind: "bilingual",
          title: "Template — letter to a contractor (prompt)",
          en: md`**Role:** You draft official correspondence for MEWRE (a Kuwaiti ministry).
**Document:** [Notice / letter] from [Employer / Engineer] to [Contractor], Contract No. [ ].
**Governing language:** [Arabic / English] — draft this version first.
**Facts (use only these):** F1 … F2 … F3 … (references, dates, numbers, clauses, position, required action, deadline).
**Constraints:** Do not add any fact, date, reference, number or commitment not listed. Write [ ] for gaps. Do not thank, accept, approve or waive anything. If a Notice, put "NOTICE" in the subject.
**Style:** numbered paragraphs; factual, courteous, firm; no adjectives of emotion; house formulas as in the exemplar.
**Terms:** use exactly: [term list].
**Output:** (1) the letter; (2) a fact map (sentence → F-number); (3) any sentence that could be read as a commitment; (4) the other-language version and an equivalence check.`,
          ar: md`**الدور:** أنت تصوغ المراسلات الرسمية لوزارة الكهرباء والماء والطاقة المتجددة.
**المستند:** [إشعار / كتاب] من [صاحب العمل / المهندس] إلى [المقاول]، العقد رقم [ ].
**اللغة المعتمدة:** [العربية / الإنجليزية] — صغ هذه النسخة أولاً.
**الوقائع (استخدم هذه فقط):** و1 … و2 … و3 … (المراجع، التواريخ، الأرقام، البنود، موقف الوزارة، الإجراء المطلوب، المهلة).
**القيود:** لا تُضف أي واقعة أو تاريخ أو مرجع أو رقم أو التزام غير مذكور. اكتب [ ] مكان أي نقص. لا تشكر ولا تقبل ولا توافق ولا تتنازل عن أي شيء. إذا كان المستند إشعاراً فاذكر كلمة "إشعار" في الموضوع.
**الأسلوب:** فقرات مرقمة؛ لغة وقائعية مهذبة وحازمة؛ دون عبارات انفعالية؛ الصيغ المعتمدة كما في النموذج.
**المصطلحات:** استخدم حرفياً: [قائمة المصطلحات].
**المخرجات:** (1) الكتاب؛ (2) جدول ربط كل جملة بالواقعة؛ (3) أي جملة قد تُفهم على أنها التزام؛ (4) النسخة باللغة الأخرى مع تأكيد تطابق المضمون.`,
        },
        {
          kind: "bilingual",
          title: "Template — monthly report executive summary (prompt)",
          en: md`**Role:** You write executive summaries for a ministry Assistant Undersecretary.
**Source:** the attached data tables (progress %, milestones, cost, risks, HSE) and my notes. Use nothing else.
**Task:** a one-page executive summary: BLUF paragraph (overall status, top issue, decision needed), then MW / KWD / dates / risks, then decisions required with deadlines.
**Constraints:** every number must appear in the source tables; show forecasts as ranges where the tables do; no adjectives without data ("significant" → give the figure). Mark gaps [ ].
**Output:** English and Arabic versions; list of numbers used with their table/cell source.`,
          ar: md`**الدور:** أنت تكتب الملخصات التنفيذية للوكيل المساعد في الوزارة.
**المصدر:** جداول البيانات المرفقة (نسب الإنجاز، المعالم الرئيسية، التكلفة، المخاطر، الصحة والسلامة) وملاحظاتي فقط.
**المهمة:** ملخص تنفيذي في صفحة واحدة: فقرة الخلاصة أولاً (الوضع العام، أهم مشكلة، القرار المطلوب)، ثم الميغاواط والتكلفة بالدينار والتواريخ والمخاطر، ثم القرارات المطلوبة ومواعيدها.
**القيود:** يجب أن يرد كل رقم في جداول المصدر؛ اعرض التوقعات كنطاقات حيث تعرضها الجداول كذلك؛ لا أوصاف دون بيانات. اكتب [ ] مكان أي نقص.
**المخرجات:** نسخة عربية ونسخة إنجليزية؛ وقائمة بالأرقام المستخدمة مع مصدر كل منها في الجداول.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Reviewing AI drafts before anything leaves your desk",
      blocks: [
        {
          kind: "md",
          md: md`### The four-pass review

1. **Facts pass.** Every number, date, reference and name against the facts sheet and source documents. Untagged factual sentences are suspect.
2. **Commitment pass.** Search for words that accept, agree, approve, confirm, waive, promise, support, or thank for a submission you have not accepted ("نوافق"، "نؤكد"، "نشكركم على تقديم البرنامج المعتمد"). Delete or make deliberate.
3. **Authority and routing pass.** Correct sender (Employer or Engineer), signatory, addressee, copies; correct clause numbering from *your* Contract.
4. **Language pass.** Register, defined terms, equivalence between versions; read the Arabic aloud — translated Arabic is usually audible.

### Where AI drafting adds most value

- **Blank-page problem:** a structured first draft in minutes.
- **Second-language version:** a strong starting draft for a native-speaker review.
- **Tone adjustment:** "make this firmer but courteous", "shorten to 200 words", "rewrite for a non-technical Undersecretary".
- **Consistency:** applying the same structure across monthly reports and minutes.
- **Variants:** a briefing note, a letter and a memo from the same facts sheet.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Invented references** — plausible letter numbers and dates that do not exist.
- **Accidental acceptance** — "we acknowledge receipt of your revised programme and thank you for your cooperation" read as acceptance of the programme.
- **Hijri date errors** — the model converts Gregorian to Hijri dates incorrectly; take Hijri dates from an authoritative calendar or document control, never from the model.
- **Inconsistent defined terms** across EN and AR.
- **Over-polished Arabic** that sounds foreign to Kuwaiti officials, or Egyptian/Levantine phrasing leaking into official text.
- **Meeting recordings** transcribed with a tool not approved for the meeting's classification, or without attendees' agreement.`,
        },
        {
          kind: "checklist",
          title: "Before signing or sending an AI-assisted document",
          items: [
            "Every fact traced to the facts sheet or a source document",
            "No unintended acceptance, approval, waiver or promise",
            "Correct sender, signatory, addressee, copies and clause numbers from our Contract",
            "Defined terms identical to the Contract in both languages",
            "Arabic reads as native Gulf official correspondence (read aloud)",
            "Both language versions equivalent in facts, requests, deadlines and reservations",
            "Hijri dates (if used) taken from an authoritative source",
            "Draft produced on an approved account for its classification",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask a reviewer (Legal, translator, senior colleague)",
          items: [
            "Does any sentence create a commitment or waiver we did not intend?",
            "Do the Arabic defined terms match the Contract's Arabic version exactly?",
            "Does the Arabic read as our house style, or as a translation?",
            "Is the letter going from the right party under the Contract?",
          ],
        },
        { kind: "scenario", scenario: "m14-s2" },
        {
          kind: "feynman",
          prompt: "Explain to a colleague how to use AI to draft an Arabic contractual letter without putting a false fact or an unintended commitment on file.",
          keyPoints: [
            "Facts sheet of verified items; AI may use only these, gaps marked [ ]",
            "Style guide, exemplar and bilingual term list for register and defined terms",
            "Constraints against thanks/acceptance/waiver; Notice identified as such",
            "Model produces fact map and commitment list; human four-pass review",
            "Approved account; correct sender and clause numbers from the Contract",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m14-l03-q1",
      type: "mcq",
      prompt: "In the facts-sheet workflow, what is the AI's role?",
      options: [
        "Supplying the dates and reference numbers it remembers",
        "Supplying structure and language around facts you verified",
        "Deciding the ministry's position",
        "Signing the letter",
      ],
      answer: 1,
      explanation: md`The model transforms; you supply facts and decide positions. Gaps are marked [ ] rather than filled with plausible inventions.`,
      concepts: ["m14.facts-sheet"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m14-l03-q2",
      type: "multi",
      prompt: "Which phrases in an AI-drafted letter to a contractor should trigger your commitment check? (Select all that apply.)",
      options: [
        "\"We thank you for submitting the approved revised programme\"",
        "\"Please submit a revised programme within 14 days\"",
        "\"The Ministry agrees to consider additional costs\"",
        "\"The Ministry reserves all its rights under the Contract\"",
        "\"We confirm the new completion date\"",
      ],
      answer: [0, 2, 4],
      explanation: md`Thanking for an "approved" programme, agreeing to consider costs and confirming dates can all be read as acceptance or commitment. A request with a deadline and a reservation of rights are what you intend.`,
      concepts: ["m14.critique-revise"],
      difficulty: 2,
    },
    {
      id: "m14-l03-q3",
      type: "mcq",
      prompt: "Why provide a bilingual term list when drafting a letter under a bilingual contract where Arabic prevails?",
      options: [
        "To reduce token count",
        "So contractual terms match the Contract's governing Arabic exactly and avoid ambiguity",
        "Because AI cannot write Arabic otherwise",
        "To satisfy the Audit Bureau's formatting rules",
      ],
      answer: 1,
      explanation: md`Inconsistent renderings of defined terms (e.g. Time for Completion) create ambiguity in the version a tribunal will read.`,
      concepts: ["m14.term-consistency"],
      difficulty: 1,
    },
    {
      id: "m14-l03-q4",
      type: "numeric",
      prompt: "Manual production of a document takes 18 h; the AI workflow (prep + review) takes 7.2 h. What is the fractional time saving (%)?",
      answer: 60,
      unit: "%",
      tolerance: { abs: 0.2 },
      explanation: md`$S = 1 - 7.2/18 = 1 - 0.4 = 0.60 = 60\%$.`,
      concepts: ["m14.facts-sheet"],
      difficulty: 1,
    },
    {
      id: "m14-l03-q5",
      type: "decision",
      prompt: md`You are the PM. An AI draft of an Arabic letter to KAPP looks excellent, but includes the date "١٥ رمضان ١٤٤٨هـ الموافق ..." which you did not supply. What do you do?`,
      options: [
        { text: "Keep it — the model knows the calendar", score: 0.1, feedback: "Hijri conversion by an LLM is a known error source, and the fact did not come from you." },
        { text: "Remove it and take the Hijri and Gregorian dates from document control or an authoritative calendar; tighten the prompt to forbid adding dates", score: 1, feedback: "Correct: facts only from verified sources, and fix the prompt so it does not recur." },
        { text: "Delete the Gregorian date and keep only the Hijri", score: 0, feedback: "Keeps the unverified element and removes the verifiable one." },
      ],
      explanation: md`Any fact not on your facts sheet is presumed invented until verified — dates especially.`,
      concepts: ["m14.facts-sheet", "m14.critique-revise"],
      difficulty: 2,
    },
    {
      id: "m14-l03-q6",
      type: "short",
      prompt: md`**Hands-on.** Write a critique prompt you would run on an AI-drafted English memo to the Undersecretary before you review it yourself.`,
      rubric: [
        "Checks every fact against the supplied facts sheet / sources and lists unsupported ones",
        "Checks BLUF: decision required, deadline, recommendation in first paragraph",
        "Checks options include do-nothing with cost/time/risk",
        "Checks for commitments, tone and length (one page)",
        "Asks for a revised draft after the critique",
      ],
      modelAnswer:
        "Critique the memo above against these criteria and report findings as a numbered list: (1) list every number, date and reference and the facts-sheet item it comes from; flag any that has no source; (2) does the first paragraph state the decision required, the deadline and the recommendation? (3) are there at least two genuine options including do-nothing, each with cost, time and risk? (4) does any sentence commit the ministry or accept something not in the facts sheet? (5) is it under 450 words and in plain, courteous, factual English? Then produce a revised version that fixes every issue without adding any new facts; mark gaps [ ].",
      explanation: md`A criteria-based critique catches structural and factual issues before your own review — but does not replace it.`,
      concepts: ["m14.critique-revise"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m14-l03-f1", front: "Facts-sheet workflow", back: "Facts sheet (you) → draft (AI) → critique (AI + you) → revise and own (you)." },
    { id: "m14-l03-f2", front: "Drafting equivalent of NOT FOUND", back: "Instruct the model to write [ ] for any missing fact." },
    { id: "m14-l03-f3", front: "Four-pass review of an AI draft", back: "Facts · commitments · authority/routing · language/equivalence." },
    { id: "m14-l03-f4", front: "Time for Completion / Delay Damages in Arabic", back: "مدة الإنجاز / تعويضات التأخير — but copy your Contract's exact terms." },
    { id: "m14-l03-f5", front: "Bilingual drafting principle", back: "Draft each language from the same facts and structure; check equivalence of substance; draft the governing version first." },
    { id: "m14-l03-f6", front: "Fact-tag trick", back: "Ask the model to tag each factual sentence with its facts-sheet number [F3]; untagged factual sentences are invented." },
    { id: "m14-l03-f7", front: "Never take from the model", back: "Reference numbers, dates (esp. Hijri), figures, clause numbers — only from verified sources." },
    { id: "m14-l03-f8", front: "Time saving", back: md`$S = 1 - T_{AI}/T_{manual}$ — real only if review is real.` },
  ],
  scenarios: [
    {
      id: "m14-s2",
      title: "The friendly AI letter",
      context: md`A section engineer used an AI tool to draft a reply to the EPC contractor's revised programme. The draft is in excellent Arabic and begins: "نشكركم على تقديم البرنامج الزمني المعدّل، ونؤكد موافقتنا المبدئية على تاريخ الإنجاز الجديد، مع استعداد الوزارة لدراسة أي تكاليف إضافية..." The OE has not yet reviewed the programme. The engineer wants to send it today "to keep the relationship positive".`,
      start: "a",
      concepts: ["m14.critique-revise", "m14.facts-sheet"],
      nodes: {
        a: {
          md: md`What do you do?`,
          choices: [
            { text: "Stop the letter; explain that it accepts a new completion date and invites cost claims; rebuild it from a facts sheet as a neutral acknowledgement stating the programme is under review", next: "b", score: 10, feedback: "The draft would have created an acceptance and an expectation of costs on file. Courtesy belongs in tone, not in commitments." },
            { text: "Send it but delete only the cost sentence", next: "c", score: 3, feedback: "'Approval in principle of the new completion date' remains — potentially an Employer acceptance of delay." },
            { text: "Send it — the relationship matters", next: "c", score: 0, feedback: "A friendly letter that concedes time and invites claims harms the project far more than a neutral acknowledgement." },
          ],
        },
        b: {
          md: md`The engineer asks how to use AI safely next time.`,
          choices: [
            { text: "Share the letter template prompt with facts-sheet, no-commitment constraints, term list and the four-pass review", score: 10, feedback: "Turning the incident into a reusable practice is the AI-native PM's job." },
            { text: "Tell them not to use AI for letters", score: 4, feedback: "Avoids the risk but loses the productivity; better to teach the safe method." },
          ],
        },
        c: {
          md: md`Six weeks later the contractor's EOT claim cites your letter as Employer acceptance of the revised completion date.`,
          choices: [{ text: "Brief Legal", score: 1, feedback: "Damage control. The commitment pass would have taken two minutes." }],
        },
      },
    },
  ],
};

export default lesson;
