import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01 hiring
  { id: "fc09-scorecard", en: "Role scorecard", ar: "بطاقة تقييم الدور الوظيفي", definition: md`One-page definition of a role: mission, 3 to 5 measurable outcomes for the first 12 months, and the competencies that predict them.`, lesson: "fc09-l01", category: "pm" },
  { id: "fc09-structured-interview", en: "Structured interview", ar: "المقابلة المنظَّمة", definition: md`Same questions in the same order for every candidate, scored independently on anchored rating scales before any discussion.`, lesson: "fc09-l01", category: "pm" },
  { id: "fc09-work-sample", en: "Work sample test", ar: "اختبار عيّنة العمل", definition: md`A paid, time-boxed slice of the real job, scored against criteria written in advance.`, lesson: "fc09-l01", category: "pm" },
  { id: "fc09-predictive-validity", en: "Predictive validity", ar: "الصدق التنبؤي", definition: md`Correlation $r$ between a selection method's score and later job performance; $r^2$ is the share of variance it explains.`, lesson: "fc09-l01", category: "pm" },
  { id: "fc09-reference-check", en: "Reference check", ar: "التحقق من المرجعيات", definition: md`Structured calls with former managers and peers asking for evidence and ratings against the scorecard; a backchannel is a reference the candidate did not name.`, lesson: "fc09-l01", category: "pm" },
  // l02 equity
  { id: "fc09-stock-option", en: "Stock option", ar: "خيار شراء الأسهم", definition: md`The right to buy a number of shares at a fixed strike price, typically exercised around an exit.`, lesson: "fc09-l02", category: "financial" },
  { id: "fc09-strike-price", en: "Strike price", ar: "سعر التنفيذ", definition: md`The price per share an option holder pays to exercise; normally set at the fair value of common shares on the grant date.`, lesson: "fc09-l02", category: "financial" },
  { id: "fc09-vesting", en: "Vesting and cliff", ar: "الاستحقاق التدريجي وفترة الانتظار", definition: md`Equity earned over time, typically 4 years; with a 1-year cliff nothing vests before month 12, then 25% vests at once and the rest monthly.`, lesson: "fc09-l02", category: "contractual" },
  { id: "fc09-fully-diluted", en: "Fully diluted shares", ar: "الأسهم على أساس التخفيف الكامل", definition: md`All issued shares plus all granted options and the unallocated option pool (and convertibles as agreed); the base for quoting grant percentages.`, lesson: "fc09-l02", category: "financial" },
  { id: "fc09-option-pool", en: "Option pool", ar: "مجمّع خيارات الموظفين", definition: md`Shares reserved for future employee grants, sized from the hiring plan to the next round; often created or enlarged before an investment (the option pool shuffle).`, lesson: "fc09-l02", category: "financial" },
  { id: "fc09-liquidation-preference", en: "Liquidation preference", ar: "أفضلية التصفية", definition: md`Right of preferred shareholders to be paid back (usually 1x their investment) before common shareholders in a sale or liquidation.`, lesson: "fc09-l02", category: "contractual" },
  { id: "fc09-stak", en: "STAK (stichting administratiekantoor)", ar: "مؤسسة إدارة الأسهم (ستاك)", definition: md`Dutch foundation that holds shares and issues depositary receipts, separating economic rights from voting rights; common for employee equity in Dutch companies.`, lesson: "fc09-l02", category: "institutional" },
  { id: "fc09-ip-assignment", en: "IP assignment", ar: "التنازل عن حقوق الملكية الفكرية", definition: md`Contract clause transferring ownership of intellectual property created by a contractor, volunteer or founder to the company.`, lesson: "fc09-l02", category: "contractual" },
  // l03 cadence
  { id: "fc09-okr", en: "Objectives and key results (OKRs)", ar: "الأهداف والنتائج الرئيسية", definition: md`A qualitative objective with 3 to 5 measurable key results (baseline, target, date), set quarterly and scored from 0 to 1.`, lesson: "fc09-l03", category: "pm" },
  { id: "fc09-leading-metric", en: "Input (leading) metric", ar: "مؤشر المدخلات (المؤشر القيادي)", definition: md`A controllable metric that moves before results do, such as qualified discovery calls; the focus of a weekly review.`, lesson: "fc09-l03", category: "pm" },
  { id: "fc09-decision-log", en: "Decision log", ar: "سجل القرارات", definition: md`Written record of decisions with date, owner, rationale and review date; the core habit of a written culture.`, lesson: "fc09-l03", category: "pm" },
  // l04 board
  { id: "fc09-board", en: "Board of directors", ar: "مجلس الإدارة", definition: md`Body that oversees the company, appoints the CEO and approves budgets, grants and financings; its members owe duties to the company.`, lesson: "fc09-l04", category: "institutional" },
  { id: "fc09-supervisory-board", en: "Supervisory board (raad van commissarissen)", ar: "مجلس الرقابة", definition: md`Optional supervisory body in a Dutch BV, separate from the management board (bestuur) that runs the company.`, lesson: "fc09-l04", category: "institutional" },
  { id: "fc09-reserved-matters", en: "Reserved matters (consent rights)", ar: "المسائل المحجوزة (حقوق الموافقة)", definition: md`Decisions listed in the shareholders' agreement or charter that need investor consent, such as new share issues, large commitments or a sale.`, lesson: "fc09-l04", category: "contractual" },
  { id: "fc09-investor-update", en: "Investor update", ar: "التقرير الدوري للمستثمرين", definition: md`Regular written report to investors: headline, metrics versus plan, cash and runway, highlights, lowlights and specific asks.`, lesson: "fc09-l04", category: "financial" },
  { id: "fc09-runway", en: "Runway", ar: "مدة كفاية السيولة", definition: md`Months until cash runs out at the current net burn: $R = \text{cash}/B_{\text{net}}$.`, lesson: "fc09-l04", category: "financial" },
  // l05 time
  { id: "fc09-context-switch", en: "Context switching", ar: "تبديل السياق", definition: md`Moving attention between ventures or tasks; each switch costs recovery time, and the share of time lost grows with the number of concurrent projects.`, lesson: "fc09-l05", category: "pm" },
  { id: "fc09-attention-residue", en: "Attention residue", ar: "بقايا الانتباه", definition: md`Attention that remains on a previous unfinished task after a switch, lowering performance on the next one.`, lesson: "fc09-l05", category: "pm" },
  { id: "fc09-burnout", en: "Burnout", ar: "الاحتراق الوظيفي", definition: md`Occupational syndrome from unmanaged chronic workplace stress: exhaustion, mental distance or cynicism, and reduced professional efficacy (WHO ICD-11).`, lesson: "fc09-l05", category: "pm" },
  // l06 decisions
  { id: "fc09-expected-value", en: "Expected value", ar: "القيمة المتوقعة", definition: md`Probability-weighted average of outcomes, $EV = \sum p_i x_i$.`, lesson: "fc09-l06", category: "financial" },
  { id: "fc09-evpi", en: "Expected value of perfect information (EVPI)", ar: "القيمة المتوقعة للمعلومات الكاملة", definition: md`Gain from choosing after the uncertainty is resolved; the ceiling on what any test or study is worth.`, lesson: "fc09-l06", category: "financial" },
  { id: "fc09-base-rate", en: "Base rate", ar: "المعدل الأساسي", definition: md`How often an outcome occurs in a reference class of similar cases; the starting point of a forecast before case-specific evidence.`, lesson: "fc09-l06", category: "pm" },
  { id: "fc09-premortem", en: "Pre-mortem", ar: "تحليل ما قبل الإخفاق", definition: md`Exercise in which a team imagines a decision has failed and writes down why, before committing to it.`, lesson: "fc09-l06", category: "pm" },
  { id: "fc09-one-way-door", en: "One-way door (Type 1 decision)", ar: "قرار غير قابل للتراجع", definition: md`A decision that is costly or impossible to reverse and deserves slow, deliberate process; a two-way door (Type 2) can be undone cheaply and should be made fast.`, lesson: "fc09-l06", category: "pm" },
  { id: "fc09-brier-score", en: "Brier score", ar: "مقياس براير", definition: md`Mean squared error of probability forecasts, $\frac{1}{N}\sum (f_i - o_i)^2$; 0 is perfect, always 50% scores 0.25.`, lesson: "fc09-l06", category: "pm" },
];

export default glossary;
