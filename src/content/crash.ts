/**
 * 3–5 day sprint for the MEWRE trial week: every module through its cheat sheet and a retrieval check,
 * the most job-critical lessons in full (more of them in longer plans), plus a trial-week playbook. All facts are taken from the module content (mainly the M0 cheat sheet);
 * ids are checked by tests/crash.test.ts.
 */
import { md } from "./schema";

type Text = { en: string; ar: string };

/** 1 = in every plan (3 days), 2 = 4- and 5-day plans, 3 = 5-day plan only. */
export type Tier = 1 | 2 | 3;

export interface SprintBlock {
  module: string;
  /** Minutes to read the module cheat sheet properly. */
  sheetMin: number;
  lessons: [id: string, tier: Tier][];
  scenario?: [id: string, tier: Tier];
  /** A written output — material you bring to the trial week. */
  output?: { tier: Tier; text: Text };
}

export const SPRINT_DAYS = [3, 4, 5] as const;
export type SprintDays = (typeof SPRINT_DAYS)[number];
export const tierFor = (days: SprintDays): Tier => (days === 3 ? 1 : days === 4 ? 2 : 3);

/** Minutes for the 8-question retrieval check after each module, the playbook and the final exam. */
export const CHECK_MIN = 12;
export const CHECK_QUESTIONS = 8;
export const PLAYBOOK_MIN = 45;
export const EXAM_MIN = 42;
export const EXAM_QUESTIONS = 25;

/**
 * Every module, in job-relevance order. Each is covered at least by its cheat sheet and a retrieval check;
 * the lessons that matter most for the trial week are studied in full.
 */
export const SPRINT_BLOCKS: SprintBlock[] = [
  {
    module: "m00",
    sheetMin: 15,
    lessons: [["m00-l01", 1], ["m00-l02", 1], ["m00-l04", 1], ["m00-l05", 3]],
    scenario: ["m00-s2", 2],
    output: {
      tier: 1,
      text: {
        en: "From memory, draw the institution map (MEWRE, KAPP, Higher Committee, CAPT, Audit Bureau, Fatwa & Legislation, KISR), write the 10-step IPP approval chain, and list the pipeline projects with their status and confidence (H/M/L).",
        ar: "ارسم من الذاكرة خريطة الجهات (الوزارة، KAPP، اللجنة العليا، الجهاز المركزي للمناقصات العامة، ديوان المحاسبة، إدارة الفتوى والتشريع، KISR)، واكتب سلسلة اعتماد مشاريع IPP بخطواتها العشر، ثم اكتب قائمة المشاريع مع حالتها ودرجة الثقة (H/M/L).",
      },
    },
  },
  {
    module: "m13",
    sheetMin: 12,
    lessons: [["m13-l01", 1], ["m13-l02", 2]],
    scenario: ["m13-s4", 3],
  },
  {
    module: "m01",
    sheetMin: 12,
    lessons: [["m01-l05", 1]],
    output: {
      tier: 3,
      text: {
        en: "Explain to a non-engineer, in five sentences, why a 1,000 MWp solar plant does not give 1,000 MW at the evening peak.",
        ar: "اشرح لشخص غير مهندس، في خمس جمل، لماذا لا تعطي محطة شمسية بقدرة 1,000 MWp قدرة 1,000 MW وقت ذروة المساء.",
      },
    },
  },
  {
    module: "m02",
    sheetMin: 15,
    lessons: [["m02-l04", 1], ["m02-l06", 3]],
    scenario: ["m02-s6", 3],
    output: {
      tier: 2,
      text: {
        en: "Back-of-envelope: annual energy of an 1,100 MW plant with E = P × CF × 8760. State your CF assumption and where it comes from.",
        ar: "حساب تقريبي: الطاقة السنوية لمحطة 1,100 MW باستخدام E = P × CF × 8760. اذكر افتراضك لمعامل السعة ومصدره.",
      },
    },
  },
  {
    module: "m05",
    sheetMin: 12,
    lessons: [["m05-l02", 1]],
    output: {
      tier: 3,
      text: {
        en: "Size a BESS to cover an evening peak: power (MW), energy (MWh), duration (h), and the usable vs nameplate difference.",
        ar: "حدّد حجم نظام بطاريات لتغطية ذروة المساء: القدرة (MW) والطاقة (MWh) والمدة (ساعات)، والفرق بين السعة القابلة للاستخدام والسعة الاسمية.",
      },
    },
  },
  { module: "m06", sheetMin: 12, lessons: [] },
  { module: "m03", sheetMin: 8, lessons: [] },
  { module: "m04", sheetMin: 8, lessons: [] },
  {
    module: "m07",
    sheetMin: 12,
    lessons: [["m07-l05", 2]],
    scenario: ["m07-s4", 3],
  },
  {
    module: "m08",
    sheetMin: 15,
    lessons: [["m08-l01", 1], ["m08-l08", 3]],
    scenario: ["m08-s8", 2],
    output: {
      tier: 3,
      text: {
        en: "Draft a 10-line risk register for a 500 MW PV + BESS project: risk, cause, impact, probability, owner, response.",
        ar: "أعدّ مسودة سجل مخاطر من 10 أسطر لمشروع 500 MW من PV + BESS: الخطر، السبب، الأثر، الاحتمال، المسؤول، الاستجابة.",
      },
    },
  },
  {
    module: "m09",
    sheetMin: 15,
    lessons: [["m09-l05", 1], ["m09-l01", 3]],
    output: {
      tier: 2,
      text: {
        en: "Compare a state-funded EPC project with an IPP under a PPA: who funds, who takes construction risk, who takes energy risk, who the ministry pays and for what.",
        ar: "قارن بين مشروع EPC بتمويل حكومي ومشروع IPP باتفاقية شراء طاقة: من يموّل، ومن يتحمل خطر الإنشاء، ومن يتحمل خطر الإنتاج، ولمن تدفع الوزارة ومقابل ماذا.",
      },
    },
  },
  {
    module: "m10",
    sheetMin: 15,
    lessons: [["m10-l02", 1], ["m10-l05", 3]],
    scenario: ["m10-s4", 3],
  },
  {
    module: "m11",
    sheetMin: 12,
    lessons: [["m11-l03", 1]],
    scenario: ["m11-s5", 2],
  },
  { module: "m12", sheetMin: 8, lessons: [] },
  { module: "m14", sheetMin: 9, lessons: [] },
  {
    module: "m15",
    sheetMin: 8,
    lessons: [],
    output: {
      tier: 1,
      text: {
        en: "Write a one-page brief, in English and Arabic, on 'Kuwait's renewable pipeline: status and next decisions'. Then write your 60-second introduction (template in the playbook) and say it out loud three times.",
        ar: "اكتب موجزاً في صفحة واحدة بالعربية والإنجليزية بعنوان «قائمة مشاريع الطاقة المتجددة في الكويت: الوضع الحالي والقرارات القادمة». ثم اكتب تعريفك بنفسك في 60 ثانية (النموذج في الدليل) وقُله بصوت مرتفع ثلاث مرات.",
      },
    },
  },
];

/** Glossary term ids for the "terms to use in Arabic" table. */
export const CRASH_TERMS = [
  "m00-reserve-margin",
  "m01-peak-demand",
  "m00-capacity-factor",
  "m01-power-factor",
  "m02-inverter",
  "m02-performance-ratio",
  "m02-p50-p90",
  "soiling",
  "m05-rte",
  "m05-soh",
  "m06-substation",
  "m06-grid-code",
  "m06-curtailment",
  "m07-feasibility-study",
  "m07-stage-gate",
  "m07-owners-engineer",
  "m09-employer",
  "m09-epc",
  "m09-employers-requirements",
  "m09-variation",
  "m09-liquidated-damages",
  "m09-taking-over-certificate",
  "m09-dnp",
  "m09-advance-payment",
  "m09-retention",
  "m11-rfp",
  "m11-bid-bond",
  "m11-performance-bond",
  "m09-offtaker",
  "m10-financial-close",
  "m08-steering-committee",
  "m08-critical-path",
  "m08-baseline",
  "m08-risk-register",
  "m08-ncr",
  "m08-permit-to-work",
];

export interface PlaybookSection {
  id: string;
  title: Text;
  md: Text;
}

export const PLAYBOOK: PlaybookSection[] = [
  {
    id: "numbers",
    title: { en: "Numbers to know cold", ar: "أرقام يجب أن تحفظها" },
    md: {
      en: md`Say the number **with its source and confidence**: that habit alone signals seniority. H = official, M = trade press, L = weak source (from Module 0).

| Item | Value | Conf. |
|---|---|---|
| Peak demand 2024 / 2025 / 2026 | 17,640 / 17,610 / 17,540 MW | M-H |
| Installed / reliably available | ~21 / ~17 GW | M |
| Generation mix | ~62% gas, ~36% oil, ~2% RE | M-L |
| Official RE target | 15% by 2030 | H |
| Stated MEWRE ambition | 30% / 40% / 50% by 2030 / 2040 / 2050 | M |
| Net zero | 2060 national; 2050 oil and gas sector | H |
| Shagaya Phase I | 70 MW (50 CSP + 10 PV + 10 wind) | H |
| Zone 1 PV | 1,100 MW; Masdar + Fouad AlGhanim reported selected ~Aug 2026 | M |
| Zone 2 PV | 500 MW; bids 26 Jul 2026 | M |
| BESS plan | 1–1.5 GW / 4–6 GWh; first 500 MW summer 2027 | M-L |
| Citizen tariff | 2 fils/kWh (since 1966) | H |
| Fuel displaced by solar | ≈ 26–37 fils/kWh (LNG–crude) | M |
| Fiscal year | 1 April – 31 March | H |
| Cost of delay, 1.1 GW plant | ≈ KWD 191k per day | M |

Re-check every M/L item against the latest MEWRE, KAPP or press source before you quote it on the day.`,
      ar: md`اذكر الرقم **مع مصدره ودرجة الثقة فيه**: هذه العادة وحدها تدل على الخبرة. H = رسمي، M = صحافة متخصصة، L = مصدر ضعيف (من الوحدة 0).

| البند | القيمة | الثقة |
|---|---|---|
| ذروة الطلب 2024 / 2025 / 2026 | 17,640 / 17,610 / 17,540 MW | M-H |
| القدرة المركّبة / المتاحة بموثوقية | ~21 / ~17 GW | M |
| مزيج التوليد | ~62% غاز، ~36% نفط، ~2% طاقة متجددة | M-L |
| الهدف الرسمي للطاقة المتجددة | 15% بحلول 2030 | H |
| الطموح المعلن للوزارة | 30% / 40% / 50% بحلول 2030 / 2040 / 2050 | M |
| الحياد الكربوني | 2060 وطنياً؛ 2050 لقطاع النفط والغاز | H |
| الشقايا المرحلة الأولى | 70 MW (50 CSP + 10 PV + 10 رياح) | H |
| المنطقة 1 (PV) | 1,100 MW؛ أُفيد باختيار مصدر وفؤاد الغانم ~أغسطس 2026 | M |
| المنطقة 2 (PV) | 500 MW؛ العطاءات 26 يوليو 2026 | M |
| خطة البطاريات | 1–1.5 GW / 4–6 GWh؛ أول 500 MW صيف 2027 | M-L |
| تعرفة المواطنين | 2 فلس/kWh (منذ 1966) | H |
| قيمة الوقود الذي توفّره الطاقة الشمسية | ≈ 26–37 فلس/kWh (LNG–النفط الخام) | M |
| السنة المالية | 1 أبريل – 31 مارس | H |
| تكلفة التأخير لمحطة 1.1 GW | ≈ 191 ألف KWD يومياً | M |

تحقّق من كل بند بدرجة M أو L من أحدث مصدر للوزارة أو KAPP أو الصحافة قبل أن تذكره يوم التجربة.`,
    },
  },
  {
    id: "who",
    title: { en: "Who's who in one minute", ar: "من يفعل ماذا في دقيقة" },
    md: {
      en: md`- **MEWRE** (وزارة الكهرباء والماء والطاقة المتجددة): policy, grid owner, offtaker (30-year PPAs), grid tenders.
- **KAPP** (هيئة مشروعات الشراكة بين القطاعين العام والخاص): procures PPP/IPP projects; holds 60% of IWPP project companies.
- **Higher Committee** (اللجنة العليا، chaired by the Minister of Finance): approves the project, its stages and the investor.
- **CAPT** (الجهاز المركزي للمناقصات العامة): public tenders above KD 75k (state-funded EPC route).
- **Audit Bureau** (ديوان المحاسبة): prior review of large contracts (threshold: verify).
- **Fatwa & Legislation** (إدارة الفتوى والتشريع): legal review of contract terms.
- **KISR** (معهد الكويت للأبحاث العلمية): Shagaya Phase I and resource measurement.

**IPP chain:** request (MEWRE) → feasibility (KAPP) → Higher Committee → RFQ → RFP → preferred bidder → Higher Committee → Audit Bureau → PPA → financial close.`,
      ar: md`- **الوزارة (MEWRE):** السياسات، مالكة الشبكة، المشتري (اتفاقيات شراء طاقة لمدة 30 سنة)، مناقصات الشبكة.
- **هيئة مشروعات الشراكة (KAPP):** تطرح مشاريع الشراكة/IPP؛ تملك 60% من شركات مشاريع IWPP.
- **اللجنة العليا** (برئاسة وزير المالية): تعتمد المشروع ومراحله والمستثمر.
- **الجهاز المركزي للمناقصات العامة (CAPT):** المناقصات العامة فوق 75 ألف دينار (مسار EPC الممول حكومياً).
- **ديوان المحاسبة:** الرقابة المسبقة على العقود الكبيرة (الحد: يُتحقق منه).
- **إدارة الفتوى والتشريع:** المراجعة القانونية لبنود العقود.
- **معهد الكويت للأبحاث العلمية (KISR):** الشقايا المرحلة الأولى وقياس الموارد.

**سلسلة IPP:** الطلب (الوزارة) ← الجدوى (KAPP) ← اللجنة العليا ← RFQ ← RFP ← المزايد المفضّل ← اللجنة العليا ← ديوان المحاسبة ← PPA ← الإغلاق المالي.`,
    },
  },
  {
    id: "questions",
    title: { en: "Questions that show you've prepared", ar: "أسئلة تُظهر أنك مستعد" },
    md: {
      en: md`Ask two or three a day, at the right moment, and write down the answers. Good questions beat confident statements.

1. Which projects is this team working on this quarter, and which decision is next for each?
2. For Zone 1, what is the next milestone — PPA signature, financial close or construction start?
3. Where does the ministry sit in the approval chain for this project, and what is the file waiting on right now?
4. Which grid-code version applies to the new PV and BESS plants, and who runs the compliance tests?
5. How is BESS being procured — as part of the PV IPPs or as a separate tender?
6. Who is the Owner's Engineer on the current projects, and what do you rely on them for?
7. How do you report status to leadership — monthly report, dashboard, steering committee?
8. What has caused the longest delays on recent projects, and what helped unblock them?
9. Which risks keep the team awake: grid connection, land, approvals, supply chain, heat?
10. How are 400 kV transmission works coordinated with the solar projects' COD dates?
11. Is there a standard template for briefs and letters I should follow?
12. What would a useful contribution from me look like by the end of this week?`,
      ar: md`اطرح سؤالين أو ثلاثة يومياً في الوقت المناسب، ودوّن الإجابات. الأسئلة الجيدة أقوى من التصريحات الواثقة.

1. ما المشاريع التي يعمل عليها الفريق هذا الربع، وما القرار التالي لكل منها؟
2. ما المحطة التالية في مشروع المنطقة 1: توقيع اتفاقية شراء الطاقة أم الإغلاق المالي أم بدء الإنشاء؟
3. أين تقع الوزارة في سلسلة اعتماد هذا المشروع، وعلى ماذا ينتظر الملف الآن؟
4. أي إصدار من كود الشبكة ينطبق على محطات PV والبطاريات الجديدة، ومن يجري اختبارات المطابقة؟
5. كيف تُطرح مشاريع البطاريات: ضمن مشاريع IPP الشمسية أم في مناقصة مستقلة؟
6. من هو مهندس المالك في المشاريع الحالية، وفيمَ تعتمدون عليه؟
7. كيف ترفعون تقارير الحالة للقيادة: تقرير شهري، لوحة متابعة، لجنة توجيهية؟
8. ما أكثر ما أخّر المشاريع الأخيرة، وما الذي ساعد على حلّه؟
9. ما المخاطر الأكثر إقلاقاً للفريق: الربط بالشبكة، الأراضي، الاعتمادات، سلاسل التوريد، الحرارة؟
10. كيف يُنسَّق تنفيذ خطوط 400 kV مع مواعيد التشغيل التجاري للمشاريع الشمسية؟
11. هل يوجد نموذج معتمد للمذكرات والمراسلات يجب أن أتبعه؟
12. كيف تبدو مساهمة مفيدة مني بنهاية هذا الأسبوع؟`,
    },
  },
  {
    id: "week",
    title: { en: "Your trial week, day by day", ar: "أسبوع التجربة يوماً بيوم" },
    md: {
      en: md`- **Day 1 — listen and map.** Learn names, roles and current projects. Keep notes in minutes format (decision, action, owner, date).
- **Day 2 — offer something small.** Send a short written summary of a meeting within 24 hours. Ask which documents you may read.
- **Day 3 — show judgement.** When something comes up (a delay, a contractor letter), ask what the contract or the approval chain says before giving an opinion.
- **Day 4 — produce.** Hand over one useful page: a pipeline tracker, a risk list or a bilingual brief on a topic they choose.
- **Day 5 — close well.** Thank people by name, summarise what you learned and what you would do in your first 90 days, in writing.`,
      ar: md`- **اليوم 1 — استمع وارسم الخريطة.** تعرّف على الأسماء والأدوار والمشاريع الحالية. دوّن ملاحظاتك بصيغة المحاضر (القرار، الإجراء، المسؤول، الموعد).
- **اليوم 2 — قدّم شيئاً صغيراً.** أرسل ملخصاً مكتوباً قصيراً لاجتماع خلال 24 ساعة. اسأل عن الوثائق المسموح لك بقراءتها.
- **اليوم 3 — أظهر حسن التقدير.** عند ظهور مسألة (تأخير، رسالة من مقاول)، اسأل ماذا يقول العقد أو سلسلة الاعتماد قبل أن تبدي رأيك.
- **اليوم 4 — أنتِج.** سلّم صفحة واحدة مفيدة: متتبّع لقائمة المشاريع، أو قائمة مخاطر، أو موجز ثنائي اللغة في موضوع يختارونه.
- **اليوم 5 — اختم جيداً.** اشكر الأشخاص بأسمائهم، ولخّص كتابةً ما تعلمته وما ستفعله في أول 90 يوماً.`,
    },
  },
  {
    id: "avoid",
    title: { en: "What hurts credibility", ar: "ما يضرّ بمصداقيتك" },
    md: {
      en: md`- Quoting MWp as if it were MW at the peak hour.
- Calling a G2G or framework deal "contracted" before anything is signed.
- Stating a number without its source or date.
- Criticising past decisions before you understand the approval history behind them.
- Pasting ministry documents or bidder data into public AI tools.
- Promising dates on behalf of other bodies (KAPP, CAPT, Audit Bureau).`,
      ar: md`- ذكر MWp كأنها القدرة المتاحة وقت الذروة.
- وصف اتفاق حكومي أو اتفاق إطاري بأنه «متعاقد عليه» قبل توقيع أي شيء.
- ذكر رقم دون مصدره أو تاريخه.
- انتقاد قرارات سابقة قبل فهم تاريخ الاعتماد الذي يقف خلفها.
- لصق وثائق الوزارة أو بيانات المزايدين في أدوات ذكاء اصطناعي عامة.
- الالتزام بمواعيد نيابةً عن جهات أخرى (KAPP، الجهاز المركزي للمناقصات العامة، ديوان المحاسبة).`,
    },
  },
  {
    id: "intro",
    title: { en: "Your 60-second introduction", ar: "تعريفك بنفسك في 60 ثانية" },
    md: {
      en: md`Fill in the brackets and practise it until it sounds natural.

> I'm [name], a systems and energy engineer. For the past [n] years I've worked on [your background — e.g. automation and control of large systems, including battery and hybrid controls]. I've spent the last weeks preparing specifically for MEWRE's renewable programme — the Shagaya and Zone 1–2 PV projects, the BESS plans, and how projects move through KAPP, CAPT and the Audit Bureau. What I bring is [one strength — e.g. systems thinking and turning complex technical issues into clear decisions]. This week I'd like to understand how the team works and leave you with something useful in writing.`,
      ar: md`املأ ما بين الأقواس وتدرّب عليه حتى يبدو طبيعياً.

> أنا [الاسم]، مهندس أنظمة وطاقة. عملت خلال [عدد] سنوات في [خلفيتك — مثلاً أتمتة الأنظمة الكبيرة والتحكم بها، بما في ذلك أنظمة التحكم في البطاريات والأنظمة الهجينة]. أمضيت الأسابيع الماضية أستعد تحديداً لبرنامج الطاقة المتجددة في الوزارة — مشاريع الشقايا والمنطقتين 1 و2 للطاقة الشمسية، وخطط البطاريات، وكيف تمر المشاريع عبر KAPP والجهاز المركزي للمناقصات العامة وديوان المحاسبة. ما أقدّمه هو [نقطة قوة واحدة — مثلاً التفكير المنظومي وتحويل المسائل الفنية المعقدة إلى قرارات واضحة]. أودّ هذا الأسبوع أن أفهم طريقة عمل الفريق وأن أترك لكم شيئاً مفيداً مكتوباً.`,
    },
  },
];
