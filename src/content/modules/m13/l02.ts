import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m13-l02",
  title: "Briefs, Memos & Official Letters (EN/AR)",
  summary:
    "Bottom line up front, the one-page decision memo, Arabic official correspondence conventions, contractual notices, and complete bilingual templates for the three documents a MEWRE PM writes most.",
  minutes: 70,
  objectives: [
    "You can write a one-page decision memo (issue, background, options, recommendation, risks, decision required) with the bottom line first",
    "You can draft an Arabic official letter with correct structure: reference, date, addressee with title, subject, opening, reference to prior correspondence, request, closing, copies",
    "You can draft a contractual notice that is valid under the contract's notice clause and protects the Employer's rights",
    "You can rewrite a weak memo into a strong one and cut length by more than half without losing decision-relevant content",
  ],
  concepts: [
    {
      id: "m13.bluf",
      name: "Bottom line up front (BLUF)",
      description:
        "Lead with the conclusion or the decision required, then the reasons; the senior reader may stop after the first paragraph.",
      competency: "leadership",
      related: ["m13.decision-memo"],
    },
    {
      id: "m13.decision-memo",
      name: "One-page decision memo",
      description:
        "Issue, background, options (including do-nothing), recommendation, risks, and an explicit 'decision required' line — designed to be annotated and filed as the decision record.",
      competency: "leadership",
      related: ["m13.authority-flow"],
    },
    {
      id: "m13.arabic-correspondence",
      name: "Arabic official correspondence conventions",
      description:
        "Reference number and date (often Hijri and Gregorian), السيد/ ... المحترم, الموضوع, تحية طيبة وبعد، بالإشارة إلى, numbered body, يرجى التكرم, وتفضلوا بقبول فائق الاحترام, signature block and copies.",
      competency: "leadership",
      related: ["m13.protocol"],
    },
    {
      id: "m13.contract-notice",
      name: "Contractual notice",
      description:
        "A written communication identified as a Notice and given in the form, to the address and within the time the contract's notice and claims clauses require; tone is factual and rights-reserving.",
      competency: "contracts",
    },
    {
      id: "m13.plain-language",
      name: "Plain, decision-oriented writing",
      description:
        "Short sentences, concrete numbers, active voice, one idea per paragraph, and no padding — in both English and Arabic.",
      competency: "leadership",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why official writing is built the way it is",
      blocks: [
        {
          kind: "md",
          md: md`Senior officials in a ministry read dozens of memos a day, often between meetings, often on paper, and always with one question: **"What do you want me to do, and is it safe to do it?"** Every rule in this lesson follows from that question.

### Bottom line up front (BLUF)

The classic engineering report builds up: background → analysis → findings → conclusion. That order mirrors how *you* discovered the answer. A decision-maker needs the opposite: **conclusion first, then just enough support to trust it**. The first paragraph of a memo must answer:

1. What decision is required (or what the reader must know)?
2. By when, and why then?
3. What do you recommend?

If the Undersecretary reads only that paragraph and annotates "موافق", the memo has done its job. Everything below is there for the reviewers — Legal, Financial Affairs, the Assistant Undersecretary — and for the file.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why BLUF works cognitively",
          md: md`Readers interpret details through the frame they already hold. Give the conclusion first and every subsequent fact is read as *evidence for or against* it — fast and critical. Give facts first and the reader must hold them in working memory without knowing what they are for, so they skim, misread, or send the memo back "for clarification", which costs you a week.`,
        },
        {
          kind: "md",
          md: md`### The one-page decision memo

| Section | Purpose | Typical length |
|---|---|---|
| **Decision required / BLUF** | The ask, deadline, recommendation | 2–4 lines |
| **Issue** | The problem in one or two sentences, with the number that matters | 2–3 lines |
| **Background** | Only facts needed to judge the options: contract, dates, prior decisions (with reference numbers) | 4–8 lines |
| **Options** | 2–4 genuine options, *always including do-nothing*, each with cost, time, risk | a small table |
| **Recommendation** | Which option and why — the decisive reason, not all reasons | 2–4 lines |
| **Risks** | Top 2–3 risks of the recommendation and how they are handled | 3–5 lines |
| **Decision required** | Check-boxes or a line the signatory can annotate | 2–3 lines |
| Attachments | Supporting analysis, consultant report, draft letter ready to sign | listed |

Three principles make it work:

- **Options are genuine.** A memo with one real option and two straw men is recognised instantly and erodes trust. Do-nothing is always an option and usually has a cost (delay damages exposure, deemed energy, outage risk).
- **Numbers that matter, not all numbers.** MW, KWD, dates, days of delay, percentage of budget or contingency. Put the analysis in an attachment.
- **Make the next step effortless.** Attach the draft letter, the draft committee formation decision, or the draft reply, ready for signature. A decision that requires the senior official to *ask* for a follow-up document is a decision delayed.

### Reading time is a design constraint`,
        },
        { kind: "equation", formula: "m13-reading-time" },
        {
          kind: "md",
          md: md`At a careful reading speed of about 200 words per minute for dense official text, a one-page memo of about 400–450 words takes roughly 2 minutes; a 1,400-word "memo" takes about 7. Senior officials allocate the 2 minutes. The rest is skimmed or deferred.

### Plain language in both languages

- One idea per paragraph; number the paragraphs (official Arabic letters almost always do).
- Concrete subject + active verb: "The contractor has not mobilised the GIS crew" rather than "It has been observed that mobilisation has not yet been fully achieved".
- Numbers with units and dates: "10 weeks late (forecast 14 May vs contract 5 March)".
- No unexplained acronyms; define once (KAPP, OE, EPC, GIS, COD).
- Arabic official prose is more formal and uses set phrases, but the same discipline applies: the set phrases frame the letter; the body must still be specific and short.

### Arabic official correspondence: anatomy of a letter

| Element | Arabic convention | Notes |
|---|---|---|
| Letterhead | Ministry name and logo, sector/department | Use the official template |
| Reference | الرقم: ... | Outgoing number from document control (الصادر) |
| Date | التاريخ: ... هـ الموافق ... م | Hijri and Gregorian are commonly both given; follow house style |
| Addressee | السيد/ [الاسم أو المسمى الوظيفي] المحترم — for a company: السادة/ [الشركة] المحترمين | Use the full title; "عناية:" for the attention line |
| Subject | الموضوع: ... | Specific: contract number, project, topic |
| Opening | تحية طيبة وبعد،،، | Standard opening; it stands on its own line |
| Reference to prior correspondence | بالإشارة إلى كتابكم رقم (...) المؤرخ في (...) بشأن ... | Always cite numbers and dates |
| Body | نفيدكم بما يلي: / نود إحاطتكم علماً بأن ... | Numbered points |
| Request | يرجى التكرم بـ ... / نأمل التكرم بالموافقة على ... | Polite but clear, with deadline |
| Closing | وتفضلوا بقبول فائق الاحترام والتقدير،،، | Also: وتفضلوا بقبول فائق الاحترام،،، |
| Signature | Name, title (e.g. وكيل الوزارة) | Signed by the level with authority |
| Attachments / copies | المرفقات: ... / نسخة إلى: ... | Copies route information to those who must know |

**Register.** Use formal Modern Standard Arabic as used in Gulf ministries; prefer impersonal and plural forms ("نفيدكم", "نود", "تحتفظ الوزارة بحقوقها"). Avoid literal translation from English ("نحن نكتب لكم لكي..." is wrong; "نود إفادتكم بأن..." is right). Avoid emotional or accusatory language; firmness comes from facts and clause references.`,
        },
        {
          kind: "bilingual",
          title: "Phrasebank — standard formulas in official correspondence",
          en: md`- Further to your letter No. [ ] dated [ ] regarding …
- We would like to inform you that …
- Please be advised that …
- Kindly provide … within [ ] days of the date of this letter.
- We should be grateful if you would approve …
- For your information and necessary action.
- The Ministry reserves all its rights under the Contract.
- This letter is without prejudice to …
- Attached herewith …
- Copy to: …
- Yours faithfully / Please accept our highest regards.`,
          ar: md`- بالإشارة إلى كتابكم رقم [ ] المؤرخ في [ ] بشأن ...
- نود إحاطتكم علماً بأن ...
- نفيدكم بأن ...
- يرجى التكرم بتزويدنا بـ ... خلال [ ] يوماً من تاريخه.
- نأمل التكرم بالموافقة على ...
- للتفضل بالعلم واتخاذ اللازم.
- تحتفظ الوزارة بكافة حقوقها بموجب العقد.
- دون الإخلال بـ ...
- مرفق طيه ...
- نسخة إلى: ...
- وتفضلوا بقبول فائق الاحترام والتقدير،،،`,
        },
        {
          kind: "md",
          md: md`### Contractual notices are a different species

A **Notice** under a FIDIC-based contract is not a courtesy letter; it is a legal act. Under the 2017 FIDIC books, a communication that is meant to be a Notice must be **in writing and identified as a Notice**, delivered as the notice clause specifies (address, method), and given within any time limit the contract sets — for example the 28-day period for a party to give notice of a claim under the claims clause (Sub-Clause 20.2 in the 2017 books). A beautifully written letter sent to the wrong address, or not identified as a Notice, may be ineffective.

Practical rules for notices: (1) put **"NOTICE" / "إشعار"** in the subject; (2) cite the **exact Sub-Clause** of *your* Contract (numbering differs between the 1999 and 2017 editions and is often modified in Particular Conditions); (3) state facts, not adjectives; (4) **reserve rights** expressly; (5) check *who* must issue it — where the contract appoints an Engineer, many instructions and notices to the Contractor must come from the Engineer, not from the ministry directly; (6) record transmission (Aconex or courier receipt).`,
        },
        { kind: "sources", refs: ["m13-fidic", "m13-gov-uk-writing", "m13-minto"] },
      ],
    },
    {
      layer: "applied",
      title: "From a weak memo to a strong one — and three templates",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Rewriting a weak memo to the Assistant Undersecretary",
          given: md`**Weak draft (excerpt):** "With reference to the above-mentioned subject, and further to numerous meetings held with the contractor and the consultant since the beginning of the year, it has been observed that there have been several issues affecting the progress of the substation works, including late delivery of equipment, manpower shortages and some design matters that remain under discussion. The consultant has prepared a detailed report (attached, 46 pages). We kindly request your guidance on how to proceed." (1,380 words in total, no options, no deadline.)`,
          steps: [
            {
              md: md`**Find the decision.** Reading the 46-page report, the real issue is: the 400 kV GIS is 10 weeks behind; the consultant recommends instructing an acceleration (second shift + air-freighting two bays) at an estimated KD 1.1 m, which is within the project contingency of KD 2.5 m. The decision needed: approve the acceleration instruction or accept the delay.`,
            },
            {
              md: md`**Write the BLUF.** "Decision required by 12 March: approve an acceleration instruction (KD 1.1 m from contingency) to recover 7 of the 10 weeks' delay to the 400 kV substation, so that grid connection is available before the IPP's scheduled connection date. Recommended."`,
            },
            {
              md: md`**State the issue with the number that matters.** "The GIS installation is 10 weeks behind programme (forecast energisation 14 May vs required 5 March). If not recovered, MEWRE may be exposed to deemed-energy payments under the PPA for the period the IPP cannot connect."`,
            },
            {
              md: md`**Build an options table.** (1) Do nothing — 10 weeks' delay, deemed-energy exposure, reputational impact with KAPP and the IPP. (2) Accelerate — KD 1.1 m, recovers ~7 weeks, residual 3 weeks covered by a temporary connection arrangement under study. (3) Terminate part of the scope and re-tender — no recovery within the year, legal risk. Each row: cost, time effect, main risk.`,
            },
            {
              md: md`**Recommendation and risks.** Recommend option 2 because it is the only option that recovers most of the delay inside the contingency. Risks: (a) the contractor may claim the acceleration was caused by Employer delays — mitigated by instructing under a without-prejudice letter pending determination of responsibility; (b) air-freight slots — the contractor confirms availability in writing before the instruction.`,
            },
            {
              md: md`**Decision line and attachments.** Check-boxes: approve option 2 / approve another option / discuss. Attach: the 2-page consultant summary (not the 46 pages), the draft instruction letter, and the contingency status table.`,
            },
          ],
          result: md`The rewritten memo is about **450 words** on one page: the decision, the deadline, the number that matters, real options, a recommendation with its decisive reason, two risks with mitigations, and a ready-to-sign letter attached. The reader can decide in two minutes.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Quantifying the cut",
          given: md`Original memo: **1,380 words**. Rewritten memo: **450 words**. Assume a careful reading speed of **200 words per minute**.`,
          steps: [
            { md: md`Original reading time: $t = W/v = 1380/200 = 6.9$ minutes.` },
            {
              md: md`Rewritten reading time: $t = 450/200 = 2.25$ minutes.`,
              hidden: true,
              check: { prompt: "Reading time of the rewritten memo (minutes)", answer: 2.25, unit: "min", tolerance: { abs: 0.05 } },
            },
            {
              md: md`Percentage reduction in length: $(1380 - 450)/1380 = 930/1380 = 67.4\%$.`,
              hidden: true,
              check: { prompt: "Reduction in word count (%)", answer: 67.4, unit: "%", tolerance: { abs: 0.3 } },
            },
          ],
          result: md`Two-thirds of the words were removed — and the memo became *more* useful, because everything removed was either process narrative ("numerous meetings were held") or analysis that belongs in an attachment.`,
        },
        {
          kind: "question",
          question: {
            id: "m13-l02-p1",
            type: "short",
            prompt: md`Rewrite this opening as a BLUF paragraph (3–4 lines, English): "Further to the meeting held on 3 February with KAPP and the IPP developer, during which various matters relating to the interconnection were discussed at length, we wish to inform you that the developer has requested to move the point of connection from the 400 kV busbar at Substation A to a new bay, which would require some additional works and possibly cost implications for the Ministry, and we await your guidance." Invent reasonable placeholders where numbers are missing, and mark them [ ].`,
            rubric: [
              "Opens with the decision required (approve / reject the change of connection point) or the recommendation",
              "States a deadline or reason for timing",
              "Quantifies or placeholders the cost and schedule effect for MEWRE",
              "Gives a clear recommendation",
              "Removes process narrative ('meeting held', 'discussed at length')",
            ],
            modelAnswer:
              "Decision required by [date]: whether to accept the IPP developer's request to move its point of connection from the 400 kV busbar at Substation A to a new bay. Recommended: accept, subject to the developer bearing the additional bay cost (est. KD [ ] m) and no change to the PPA grid-connection date, because the new bay avoids a summer outage of the existing busbar. A draft reply to KAPP is attached for signature.",
            explanation: md`A good BLUF names the decision, the deadline, the recommendation and the condition that protects the ministry. The meeting history belongs in the background section, in one line, with the reference to the minutes.`,
            concepts: ["m13.bluf", "m13.decision-memo"],
            difficulty: 2,
          },
        },
        {
          kind: "md",
          md: md`### Template 1 — Decision memo to the Undersecretary

The memo goes **through** (عن طريق) your Assistant Undersecretary — never around them. The structure below works in both languages; the Arabic version is not a translation of the English but the same content written in official Arabic.`,
        },
        {
          kind: "bilingual",
          title: "Decision memo — extension of the Owner's Engineer contract",
          en: md`**INTERNAL MEMORANDUM**

**To:** The Undersecretary
**Through:** The Assistant Undersecretary, [Sector]
**From:** Project Manager, [Department]
**Date:** [ ] | **Ref:** [ ]
**Subject:** Approval to extend the Owner's Engineer contract No. [ ] — [Project] grid connection

**1. Decision required (by [date])**
Approve a 6-month extension of the Owner's Engineer (OE) contract, estimated at KD 450,000, and its submission to the State Audit Bureau for prior review. Recommended.

**2. Issue**
The OE contract expires on [date]; the works it supervises will continue until about [date]. Without an extension, site supervision, inspection and payment certification stop.

**3. Background**
- Contract No. [ ] awarded [date], value KD [ ]; [ ]% spent.
- Works delayed [ ] weeks (Progress Report No. [ ]).
- Approval chain estimated at 46 working days, including Audit Bureau review.

**4. Options**
| Option | Cost | Time | Main risk |
|---|---|---|---|
| A. Extend OE 6 months | KD 450,000 | Continuous supervision | Audit Bureau queries |
| B. New tender for supervision | ~KD [ ] | 6–9 months gap | Unsupervised works |
| C. Supervise with in-house staff | Staff time | Immediate | Insufficient specialist capacity |

**5. Recommendation**
Option A: the only option that avoids a supervision gap; the rates are those of the existing contract.

**6. Risks**
- Audit Bureau query round — mitigated by a complete file (justification, rate comparison, budget certificate).
- Residual gap of about [6] working days — mitigated by [no-cost extension within the existing ceiling, if permitted].

**7. Decision**
☐ Approve Option A  ☐ Approve another option: ____  ☐ Discuss

Attachments: (1) OE performance summary; (2) budget certificate; (3) draft letter to the Audit Bureau.

[Name]
Project Manager`,
          ar: md`**مذكرة داخلية**

**إلى:** السيد/ وكيل الوزارة المحترم
**عن طريق:** السيد/ الوكيل المساعد لقطاع [ ] المحترم
**من:** مدير المشروع – إدارة [ ]
**التاريخ:** [ ]هـ الموافق [ ]م | **الرقم:** [ ]
**الموضوع:** طلب الموافقة على تمديد عقد مهندس المالك رقم [ ] – مشروع ربط [ ] بالشبكة

تحية طيبة وبعد،،،

**أولاً: المطلوب (قبل تاريخ [ ])**
نأمل التكرم بالموافقة على تمديد عقد خدمات مهندس المالك لمدة ستة أشهر بقيمة تقديرية قدرها (450,000) د.ك، وإحالته إلى ديوان المحاسبة للرقابة المسبقة. ونوصي بالموافقة.

**ثانياً: الموضوع**
ينتهي العقد الحالي بتاريخ [ ]، في حين تستمر الأعمال التي يشرف عليها حتى [ ] تقريباً، وفي حال عدم التمديد تتوقف أعمال الإشراف والفحص واعتماد المستخلصات.

**ثالثاً: الخلفية**
- تمت ترسية العقد رقم [ ] بتاريخ [ ] بقيمة [ ] د.ك، وبلغت نسبة الصرف [ ]%.
- تأخرت الأعمال [ ] أسبوعاً وفقاً لتقرير التقدم رقم [ ].
- تُقدَّر مدة دورة الاعتماد بـ (46) يوم عمل شاملةً مراجعة ديوان المحاسبة.

**رابعاً: البدائل**
| البديل | التكلفة | المدة | الخطر الرئيسي |
|---|---|---|---|
| (أ) تمديد العقد ستة أشهر | 450,000 د.ك | إشراف متواصل | استفسارات ديوان المحاسبة |
| (ب) طرح مناقصة جديدة للإشراف | نحو [ ] د.ك | فجوة من 6 إلى 9 أشهر | أعمال دون إشراف |
| (ج) الإشراف بالكوادر الداخلية | وقت الموظفين | فوري | عدم كفاية الخبرات المتخصصة |

**خامساً: التوصية**
البديل (أ)، كونه البديل الوحيد الذي يتفادى انقطاع الإشراف، وبنفس أسعار العقد القائم.

**سادساً: المخاطر**
- استفسارات ديوان المحاسبة: يُحدّ منها بتقديم ملف متكامل (المبررات، مقارنة الأسعار، شهادة توفر الاعتماد المالي).
- فجوة متبقية بنحو [6] أيام عمل: يُحدّ منها بـ [تمديد زمني دون تكلفة ضمن سقف العقد إن أجاز العقد ذلك].

**سابعاً: القرار**
☐ موافق على البديل (أ)  ☐ موافق على بديل آخر: ____  ☐ للمناقشة

المرفقات: (1) ملخص أداء مهندس المالك؛ (2) شهادة توفر الاعتماد المالي؛ (3) مسودة كتاب إلى ديوان المحاسبة.

وتفضلوا بقبول فائق الاحترام والتقدير،،،

[الاسم]
مدير المشروع`,
        },
        {
          kind: "md",
          md: md`### Template 2 — Notice to an EPC contractor on delay

Use this for MEWRE's directly contracted works (e.g. a substation or OHTL EPC). **Adapt the sender**: if the Contract appoints an Engineer who administers it, the instruction under the rate-of-progress clause is issued by the Engineer; the ministry then writes to the Engineer requesting the action. Clause numbers are shown as examples — the rate-of-progress and delay-damages sub-clauses are 8.7 and 8.8 in the FIDIC 2017 Red/Yellow Books (8.6 and 8.7 in 1999) — **always use your Contract's own numbering**.`,
        },
        {
          kind: "bilingual",
          title: "Notice — delay to progress and request for a revised programme",
          en: md`**[MEWRE letterhead]**
Ref: [ ] | Date: [ ]

**To:** [EPC Contractor], Attention: [Name], Project Director
**Copy:** [The Engineer / Owner's Engineer]

**Subject: NOTICE — Contract No. [ ] — [Project] — Rate of progress and revised programme (Sub-Clause [8.7])**

Dear Sir,

1. We refer to your Monthly Progress Report No. 14 dated [ ] and to the accepted Programme, Revision [ ].
2. The Report shows installation of the 400 kV GIS at [ ]% against [ ]% planned, a delay of [ ] days on the critical path, forecasting completion on [ ] against the Time for Completion of [ ].
3. No Notice of a claim for extension of time relating to this delay has been received under Sub-Clause [20.2].
4. Pursuant to Sub-Clause [8.7], you are required to submit, within [14] days of receipt of this Notice, a revised programme and supporting report describing the revised methods you propose to adopt to expedite progress and complete within the Time for Completion.
5. The Employer reserves all its rights under the Contract, including its entitlement to Delay Damages under Sub-Clause [8.8].
6. You are invited to a progress review meeting on [date] at [place] to present your recovery plan.

Yours faithfully,

[Name]
[Title — signatory with authority under the Contract]`,
          ar: md`**[ترويسة الوزارة]**
الرقم: [ ] | التاريخ: [ ]

**السادة/ [اسم المقاول] المحترمين**
عناية: السيد/ [الاسم] – مدير المشروع
نسخة إلى: [المهندس / مهندس المالك]

**الموضوع: إشعار – العقد رقم [ ] – [اسم المشروع] – معدل تقدم الأعمال وتقديم برنامج زمني معدّل (البند الفرعي [8.7])**

تحية طيبة وبعد،،،

1. بالإشارة إلى تقرير التقدم الشهري رقم (14) المقدم منكم بتاريخ [ ]، وإلى البرنامج الزمني المعتمد (المراجعة [ ]).
2. نود إحاطتكم علماً بأن التقرير المذكور يُظهر أن نسبة إنجاز أعمال تركيب المحطة المعزولة بالغاز جهد 400 ك.ف قد بلغت [ ]% مقابل [ ]% مخطط لها، بما يمثل تأخراً قدره [ ] يوماً على المسار الحرج، مع توقع الإنجاز بتاريخ [ ] بدلاً من تاريخ انتهاء مدة الإنجاز في [ ].
3. لم يرد إلينا أي إشعار بمطالبة بتمديد مدة الإنجاز فيما يخص هذا التأخير وفقاً للبند الفرعي [20.2].
4. وعليه، واستناداً إلى البند الفرعي [8.7] من العقد، يُطلب منكم تقديم برنامج زمني معدّل وتقرير داعم يبيّن الطرق المعدّلة التي تعتزمون اتباعها لتسريع التقدم وإنجاز الأعمال ضمن مدة الإنجاز، وذلك خلال (14) يوماً من تاريخ استلامكم هذا الإشعار.
5. تحتفظ الوزارة بكافة حقوقها بموجب العقد، بما في ذلك حقها في تعويضات التأخير وفقاً للبند الفرعي [8.8].
6. ندعوكم لحضور اجتماع لمراجعة التقدم بتاريخ [ ] في [ ] لعرض خطة التعافي.

وتفضلوا بقبول فائق الاحترام،،،

[الاسم]
[المسمى الوظيفي – صاحب الصلاحية بموجب العقد]`,
        },
        {
          kind: "md",
          md: md`### Template 3 — Reply to a KAPP query

KAPP runs PPP procurement and frequently asks the offtaker for technical positions (grid connection, dispatch, technical requirements in the RFP, responses to bidder clarifications). Replies go out at the right level — often the Undersecretary — and become part of the procurement record, so every statement must be one the ministry can stand behind for 30 years. Confirm the correct title of the KAPP addressee from previous correspondence.`,
        },
        {
          kind: "bilingual",
          title: "Reply to a KAPP query on the point of connection",
          en: md`**[MEWRE letterhead]**
Ref: [ ] | Date: [ ]

**To:** [Title], Kuwait Authority for Partnership Projects

**Subject: Reply to your letter No. [ ] — [Project] — Point of connection and connection date**

Dear Sir,

Further to your letter No. [ ] dated [ ] concerning the point of connection for [Project], we would like to inform you of the following:

1. **Point of connection.** The point of connection remains the [400] kV busbar at [Substation], as defined in the RFP technical requirements, Section [ ].
2. **MEWRE-side works.** The connecting bay and associated protection are within MEWRE's scope under Contract No. [ ]; current forecast for readiness is [date], against the required date of [date].
3. **Developer's proposal.** The proposal to connect to a new bay is acceptable in principle provided that (a) the additional cost is borne by the developer, (b) the scheduled connection date in the PPA is unchanged, and (c) the grid study is updated and accepted by MEWRE's Transmission sector.
4. **Next step.** We propose a technical meeting with KAPP and the developer on [date].

Attachments: [Grid study summary]
Copy to: Assistant Undersecretary, [Transmission]; Assistant Undersecretary, [Sector]

Please accept our highest regards.

[Name]
Undersecretary`,
          ar: md`**[ترويسة الوزارة]**
الرقم: [ ] | التاريخ: [ ]

**السيد/ [المسمى الوظيفي] – هيئة مشروعات الشراكة المحترم**

**الموضوع: الرد على كتابكم رقم [ ] – مشروع [ ] – نقطة الربط وموعد الربط**

تحية طيبة وبعد،،،

بالإشارة إلى كتابكم رقم [ ] المؤرخ في [ ] بشأن نقطة الربط الكهربائي لمشروع [ ]، نفيدكم بما يلي:

1. **نقطة الربط:** تظل نقطة الربط هي القضبان العمومية جهد [400] ك.ف في محطة [ ]، وفقاً لما ورد في المتطلبات الفنية لطلب العروض، القسم [ ].
2. **أعمال الوزارة:** تقع خلية الربط وأنظمة الحماية المرتبطة بها ضمن نطاق أعمال الوزارة بموجب العقد رقم [ ]، والموعد المتوقع لجاهزيتها هو [ ] مقابل الموعد المطلوب [ ].
3. **مقترح المطور:** لا مانع مبدئياً من الربط على خلية جديدة، شريطة: (أ) أن يتحمل المطور التكلفة الإضافية، (ب) عدم تغيير موعد الربط المحدد في اتفاقية شراء الطاقة، (ج) تحديث دراسة الشبكة واعتمادها من قطاع النقل بالوزارة.
4. **الخطوة التالية:** نقترح عقد اجتماع فني مع الهيئة والمطور بتاريخ [ ].

المرفقات: [ملخص دراسة الشبكة]
نسخة إلى: السيد/ الوكيل المساعد لقطاع [النقل] المحترم؛ السيد/ الوكيل المساعد لقطاع [ ] المحترم

وتفضلوا بقبول فائق الاحترام والتقدير،،،

[الاسم]
وكيل الوزارة`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "House style must be checked locally",
          md: md`The structures above follow common Gulf ministry practice. MEWRE's own conventions — exact salutation forms, whether Hijri dates are mandatory, the reference-number format, who may sign letters to KAPP or contractors, and the official title of KAPP's head — were **not verified**. Copy them from recent outgoing letters in your sector's archive before first use.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Writing that survives review, translation and audit",
      blocks: [
        {
          kind: "md",
          md: md`### How official documents are really produced

1. **Draft** — usually by the PM or a section engineer, sometimes from a consultant's draft. Never send a consultant's draft upward unedited: it will speak in the consultant's voice and may commit the ministry to positions you have not checked.
2. **Internal review** — Director, then Legal (for anything contractual), Financial Affairs (for anything with money).
3. **Translation** — if the original is English, the Arabic must be checked by someone who knows both the technical and the official register. Machine or AI translation is a starting draft only.
4. **Signature and numbering** — document control issues the outgoing number; the signed scan goes to the project document system (e.g. Aconex) and the physical file.
5. **Tracking** — log the letter, the deadline it sets, and the expected reply in your correspondence register.

### Which language governs?

Contracts with international EPCs and IPPs are often bilingual. The contract states which version **prevails** in case of conflict. If the Arabic prevails and your notice is drafted in English with a loose Arabic translation, the Arabic is what a Kuwaiti court or arbitrator will read. Draft critical notices bilingually, side by side, and have Legal check the governing version.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **"Kindly advise"** memos with no recommendation — returned "للدراسة وإبداء الرأي", costing a week.
- **Literal translation** of English into Arabic, producing prose that reads as foreign and imprecise, or Arabic legal terms that do not match the Contract's defined terms (e.g. rendering "Delay Damages" inconsistently).
- **Notices that are not Notices** — not identified as such, sent by email to a non-designated address, or signed by someone without contractual authority.
- **Emotional language** in letters to contractors ("unacceptable", "extremely disappointed"). It reads as weakness and can be quoted back in arbitration.
- **Committing the ministry accidentally** — "we agree to the revised programme" in a covering letter, when the programme has not been reviewed.
- **Missing reference numbers** — the reader cannot find the earlier letter and the file loses its chain.`,
        },
        {
          kind: "checklist",
          title: "Before you send any memo or letter",
          items: [
            "Does the first paragraph state the decision or action required, the deadline and the recommendation?",
            "Are all prior letters, minutes and contract clauses cited by number and date?",
            "Is every number given with unit and date, and checked against the source?",
            "Are there genuine options, including do-nothing, with cost/time/risk?",
            "Is it going to the right level, through the right chain (عن طريق)?",
            "For notices: identified as NOTICE, correct Sub-Clause, correct sender, correct address, within the time limit, rights reserved?",
            "Has Legal reviewed anything with contractual effect, and Financial Affairs anything with money?",
            "Is the Arabic version written in official register and consistent with the Contract's defined terms?",
            "Is the next document (letter, decision, reply) attached ready for signature?",
          ],
        },
        {
          kind: "ask",
          title: "Ask your Owner's Engineer when they give you a draft letter",
          items: [
            "Which Sub-Clause of our Contract gives the authority for this letter, and who must sign it?",
            "What exact time limit does it start or meet, and when does that limit expire?",
            "What could the contractor argue in response, and does the letter pre-empt it?",
            "Does anything in the letter accept, approve or waive something we have not reviewed?",
            "Is the Arabic consistent with the Contract's Arabic defined terms?",
          ],
        },
        { kind: "scenario", scenario: "m13-s3" },
        {
          kind: "feynman",
          prompt:
            "Explain to a new section engineer why a memo to the Undersecretary must start with the decision required, and what goes into the rest of the page.",
          keyPoints: [
            "Senior readers decide in about two minutes; the first paragraph may be all they read",
            "BLUF frames all following facts as evidence, speeding critical reading",
            "Structure: decision required, issue, background, options incl. do-nothing, recommendation, risks, decision line",
            "Numbers that matter only (MW, KWD, dates, days); analysis goes to attachments",
            "Attach the next document ready to sign",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m13-l02-q1",
      type: "order",
      prompt: "Order the elements of an Arabic official letter from top to bottom.",
      items: [
        "الرقم والتاريخ (reference and date)",
        "السيد/ ... المحترم (addressee)",
        "الموضوع (subject)",
        "تحية طيبة وبعد (opening)",
        "بالإشارة إلى كتابكم رقم ... (reference to prior letter)",
        "وتفضلوا بقبول فائق الاحترام (closing)",
      ],
      explanation: md`Reference and date, addressee with title, subject, the standard opening, the reference to previous correspondence, the numbered body and request, then the closing formula, signature, attachments and copies.`,
      concepts: ["m13.arabic-correspondence"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m13-l02-q2",
      type: "multi",
      prompt: "Which sections belong in a one-page decision memo? (Select all that apply.)",
      options: ["Decision required with deadline", "Full chronology of every meeting", "Options including do-nothing", "Recommendation with decisive reason", "Top risks and mitigations", "The complete consultant report pasted in"],
      answer: [0, 2, 3, 4],
      explanation: md`Chronologies and full reports go to attachments (or are cut). The page carries the decision, options, recommendation and risks — what the signatory needs to annotate the memo.`,
      concepts: ["m13.decision-memo"],
      difficulty: 1,
    },
    {
      id: "m13-l02-q3",
      type: "mcq",
      prompt: "Why must a memo's options always include 'do nothing'?",
      options: [
        "It is a legal requirement of the Public Tenders Law",
        "It shows the cost of inaction (delay damages, deemed energy, outage risk) and makes the recommended option's value visible",
        "Officials usually prefer to do nothing",
        "It makes the memo longer and more thorough",
      ],
      answer: 1,
      explanation: md`Do-nothing is the baseline against which every option's benefit is measured. Its cost — exposure under the PPA, unrecovered delay, reputational impact — is often the strongest argument for the recommendation.`,
      concepts: ["m13.decision-memo"],
      difficulty: 1,
    },
    {
      id: "m13-l02-q4",
      type: "decision",
      prompt: md`You are the PM. The OE hands you a draft delay letter to the EPC. It is titled "Progress concerns", is addressed by email to the contractor's site engineer, says the delay is "totally unacceptable", and does not cite any clause. The contract has an Engineer (the OE) who administers it. What do you do?`,
      options: [
        { text: "Sign and send it today — speed matters", score: 0, feedback: "It is probably not a valid Notice (not identified, wrong address, no clause) and its tone can be quoted back. Speed without validity is worthless." },
        { text: "Have the Engineer issue a Notice under the rate-of-progress Sub-Clause, identified as a Notice, sent to the contractual address, factual and rights-reserving; the ministry copies or instructs the Engineer as the Contract requires", score: 1, feedback: "Correct: right sender, right form, right address, right clause, neutral tone, rights reserved." },
        { text: "Rewrite the tone but keep sending it from the ministry by email", score: 0.4, feedback: "Better tone, but still wrong sender/address and no clause — the notice may be ineffective." },
        { text: "Raise it verbally at the next progress meeting instead", score: 0.2, feedback: "Minutes help, but they do not replace a contractual Notice where the Contract requires one." },
      ],
      explanation: md`Contractual communications are legal acts: validity depends on form, sender, address and timing. Tone should be factual — firmness comes from clause references and reserved rights.`,
      concepts: ["m13.contract-notice"],
      difficulty: 2,
    },
    {
      id: "m13-l02-q5",
      type: "numeric",
      prompt: "A memo is 1,050 words. At 210 words per minute, how many minutes does a careful read take?",
      answer: 5,
      unit: "min",
      tolerance: { abs: 0.05 },
      explanation: md`$t = W/v = 1050/210 = 5$ minutes — more than twice the ~2 minutes a senior official will give it. Cut to one page (~400–450 words) and move the analysis to an attachment.`,
      concepts: ["m13.plain-language", "m13.bluf"],
      difficulty: 1,
    },
    {
      id: "m13-l02-q6",
      type: "short",
      prompt: md`Write, in Arabic, the opening two lines of a reply to KAPP's letter No. 2026/514 dated 10 September 2026 about the SCADA interface for a PV IPP — from the addressee line through the reference to their letter.`,
      rubric: [
        "Addressee line with السيد/ ... المحترم and the authority's name (هيئة مشروعات الشراكة)",
        "Subject line beginning الموضوع: and naming the topic and their letter number",
        "Standard opening تحية طيبة وبعد",
        "Reference formula بالإشارة إلى كتابكم رقم ... المؤرخ في ... بشأن ...",
        "Formal register, no literal translation from English",
      ],
      modelAnswer:
        "السيد/ [المسمى الوظيفي] – هيئة مشروعات الشراكة المحترم\nالموضوع: الرد على كتابكم رقم 2026/514 بشأن ربط نظام سكادا لمشروع [ ]\nتحية طيبة وبعد،،،\nبالإشارة إلى كتابكم رقم 2026/514 المؤرخ في 10 سبتمبر 2026 بشأن ربط نظام التحكم الإشرافي وتجميع البيانات (سكادا) لمشروع [ ]، نفيدكم بما يلي:",
      explanation: md`The fixed formulas signal professionalism and allow the reader to locate the file instantly; precision (number, date, topic) matters more than elegance.`,
      concepts: ["m13.arabic-correspondence"],
      difficulty: 2,
    },
    {
      id: "m13-l02-q7",
      type: "mcq",
      prompt: "A bilingual EPC contract states that the Arabic version prevails. Your delay Notice was drafted in English with a quick Arabic translation that renders 'Time for Completion' loosely. What is the main risk?",
      options: [
        "None — the English is clearer",
        "The governing Arabic text may not match the Contract's defined terms, weakening or confusing the Notice",
        "The Notice is automatically void",
        "The contractor may refuse to read Arabic",
      ],
      answer: 1,
      explanation: md`Where Arabic prevails, the Arabic is what a tribunal reads. Defined terms (مدة الإنجاز، تعويضات التأخير، المهندس) must match the Contract exactly. Draft critical notices side by side and have Legal check the governing version.`,
      concepts: ["m13.contract-notice", "m13.arabic-correspondence"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m13-l02-f1", front: "BLUF — what the first paragraph must answer", back: "What decision/action is required, by when (and why then), and what you recommend." },
    { id: "m13-l02-f2", front: "Decision memo sections", back: "Decision required · Issue · Background · Options (incl. do-nothing) · Recommendation · Risks · Decision line · Attachments." },
    { id: "m13-l02-f3", front: "Standard Arabic opening and closing", back: "تحية طيبة وبعد،،، … وتفضلوا بقبول فائق الاحترام والتقدير،،،" },
    { id: "m13-l02-f4", front: "Arabic formula: 'Further to your letter No. X dated Y regarding…'", back: "بالإشارة إلى كتابكم رقم (X) المؤرخ في (Y) بشأن ..." },
    { id: "m13-l02-f5", front: "عن طريق on a memo", back: "'Through' — routes the memo via your Assistant Undersecretary to the Undersecretary; never bypass the chain." },
    { id: "m13-l02-f6", front: "Validity tests for a contractual Notice", back: "Identified as a Notice, in writing, correct sender, contractual address/method, correct Sub-Clause, within time limit, rights reserved." },
    { id: "m13-l02-f7", front: "Reading-time rule of thumb", back: "≈200 words/min for dense official text: one page (~450 words) ≈ 2 minutes." },
    { id: "m13-l02-f8", front: "Arabic for 'The Ministry reserves all its rights under the Contract'", back: "تحتفظ الوزارة بكافة حقوقها بموجب العقد." },
  ],
  scenarios: [
    {
      id: "m13-s3",
      title: "The 2 p.m. request",
      dayInLife: true,
      context: md`At 14:00 the Assistant Undersecretary's office calls: the Undersecretary is meeting the IPP developer's CEO tomorrow at 09:00 and wants "a note" on the grid-connection delay. You have the OE's 46-page report, last month's progress report, and your own notes.`,
      start: "a",
      concepts: ["m13.bluf", "m13.decision-memo", "m13.plain-language"],
      nodes: {
        a: {
          md: md`What do you produce first?`,
          choices: [
            { text: "A one-page briefing note: BLUF (status, our position, what not to concede), 3 key numbers, likely CEO asks with suggested answers", next: "b", score: 10, feedback: "A meeting brief is BLUF too: what the Undersecretary must know and say, and what to avoid committing to." },
            { text: "Forward the 46-page OE report with a covering line", next: "c", score: 1, feedback: "The Undersecretary will not read it tonight and may walk into the meeting unprepared." },
            { text: "A 5-page chronology of the delay since contract award", next: "c", score: 3, feedback: "Accurate but unusable before a 09:00 meeting." },
          ],
        },
        b: {
          md: md`While drafting, you realise the CEO will likely ask MEWRE to "confirm" a new connection date. The OE's forecast is uncertain (±3 weeks). How do you handle this in the note?`,
          choices: [
            { text: "Advise the Undersecretary not to commit to a date; offer 'a confirmed recovery plan within two weeks' and give the range privately", next: "d", score: 10, feedback: "Protects the ministry from a statement that could later support a deemed-energy or compensation argument." },
            { text: "Give the OE's central forecast as the date to announce", next: "d", score: 3, feedback: "A date said by the Undersecretary to the counterparty's CEO becomes a commitment in practice — and the forecast is uncertain." },
          ],
        },
        c: {
          md: md`At 18:00 the office calls back: "The Undersecretary asks what the bottom line is."`,
          choices: [{ text: "Write the one-page note now", next: "b", score: 5, feedback: "Recovered, at the cost of credibility and four hours." }],
        },
        d: {
          md: md`You send the note at 17:00 through the Assistant Undersecretary. What else?`,
          choices: [
            { text: "Offer to attend or be on call at 08:30 for a 10-minute pre-brief", score: 10, feedback: "Senior officials value a PM who makes them look prepared." },
            { text: "Nothing further", score: 6, feedback: "Acceptable — but a short pre-brief offer costs nothing and builds trust." },
          ],
        },
      },
    },
  ],
};

export default lesson;
