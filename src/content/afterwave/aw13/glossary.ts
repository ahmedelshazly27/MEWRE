import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "aw13-competitive-landscape", en: "Competitive landscape", ar: "المشهد التنافسي", definition: md`The set of competitors, adjacent players, substitutes and complements a buyer considers, organised by the job each does.`, lesson: "aw13-l01", category: "pm" },
  { id: "aw13-direct-competitor", en: "Direct competitor", ar: "منافس مباشر", definition: md`A vendor selling the same job to the same buyer.`, lesson: "aw13-l01", category: "pm" },
  { id: "aw13-adjacent-player", en: "Adjacent player", ar: "لاعب مجاور", definition: md`A vendor selling a different job to the same buyer, able to expand into yours (Nominal and Sift relative to Ripple).`, lesson: "aw13-l01", category: "pm" },
  { id: "aw13-substitute", en: "Substitute", ar: "بديل", definition: md`A different way to get the job done, often without a vendor: full regression, engineer judgment, in-house scripts.`, lesson: "aw13-l01", category: "pm" },
  { id: "aw13-complement", en: "Complement", ar: "منتج مكمّل", definition: md`A product that makes yours more valuable, such as DAQ hardware, test executives and open data formats.`, lesson: "aw13-l01", category: "pm" },
  { id: "aw13-positioning-map", en: "Positioning map", ar: "خريطة التموضع", definition: md`A 2x2 with axes taken from the buyer's decision, showing where vendors cluster and where an unserved job sits.`, lesson: "aw13-l01", category: "pm" },
  { id: "aw13-white-space", en: "White space", ar: "فجوة سوقية غير مخدومة", definition: md`A job no vendor is found serving. A hypothesis until buyers show they will pay for it.`, lesson: "aw13-l01", category: "pm" },
  { id: "aw13-claim-ledger", en: "Claim ledger", ar: "سجل الادعاءات", definition: md`Table of competitor facts with source, date and status (reported, verified, unverified).`, lesson: "aw13-l01", category: "pm" },
  { id: "aw13-suspect-link", en: "Suspect link", ar: "رابط مشتبه به", definition: md`In requirements tools (Jama, Polarion, DOORS Next), a flag on downstream items such as test cases when a linked requirement changes.`, lesson: "aw13-l01", category: "technical" },
  { id: "aw13-change-based-testing", en: "Change-based testing", ar: "الاختبار القائم على التغيير", definition: md`Selecting the minimal set of tests affected by a change; in VectorCAST, computed from source-code changes and coverage.`, lesson: "aw13-l01", category: "technical" },
  // l02
  { id: "aw13-test-data-platform", en: "Test data platform", ar: "منصة بيانات الاختبار", definition: md`Software that ingests, stores, visualises and analyses hardware test data; Nominal, Sift and Marple are examples.`, lesson: "aw13-l02", category: "technical" },
  { id: "aw13-edge-app", en: "Edge app (bench)", ar: "تطبيق طرفي عند منصة الاختبار", definition: md`Software running at the test bench, next to the instruments, that captures data and may run tests locally, syncing later.`, lesson: "aw13-l02", category: "technical" },
  { id: "aw13-frame-of-reference", en: "Frame of reference", ar: "الإطار المرجعي", definition: md`The category the buyer uses to evaluate you; it sets the weights on evaluation criteria.`, lesson: "aw13-l02", category: "pm" },
  { id: "aw13-coexist", en: "Coexist play", ar: "استراتيجية التعايش", definition: md`Positioning a narrower product to sit beside a platform the customer already owns, rather than replacing it.`, lesson: "aw13-l02", category: "pm" },
  // l03
  { id: "aw13-build-vs-buy", en: "Build vs buy", ar: "التطوير الداخلي مقابل الشراء", definition: md`The decision to develop a tool in-house or purchase it, ideally compared on total cost and value over a horizon.`, lesson: "aw13-l03", category: "financial" },
  { id: "aw13-tco", en: "Total cost of ownership (TCO)", ar: "التكلفة الإجمالية للملكية", definition: md`All costs of a tool over a horizon: build or integration, maintenance or subscription, administration and risk.`, lesson: "aw13-l03", category: "financial" },
  { id: "aw13-key-person-risk", en: "Key-person risk", ar: "مخاطر الاعتماد على شخص رئيسي", definition: md`Expected loss from depending on one person, here the author of an internal tool: probability of leaving times cost.`, lesson: "aw13-l03", category: "financial" },
  { id: "aw13-incumbent", en: "Incumbent", ar: "الشركة الراسخة في السوق", definition: md`An established vendor with an installed base, such as NI (Emerson), Vector, dSPACE, Keysight and MathWorks in test and measurement.`, lesson: "aw13-l03", category: "pm" },
  { id: "aw13-champion", en: "Champion", ar: "المناصر الداخلي", definition: md`A person inside the customer who sells your product internally; often the engineer who built the current tooling.`, lesson: "aw13-l03", category: "pm" },
  // l04
  { id: "aw13-moat", en: "Moat", ar: "الميزة التنافسية المستدامة (الخندق)", definition: md`An advantage that keeps winning after rivals copy your features, because it compounds: switching costs, accumulated data, scale, hard assets.`, lesson: "aw13-l04", category: "financial" },
  { id: "aw13-table-stakes", en: "Table stakes", ar: "الحد الأدنى المطلوب للمنافسة", definition: md`A capability every serious vendor has: needed to be shortlisted, unable to win the deal.`, lesson: "aw13-l04", category: "pm" },
  { id: "aw13-switching-cost", en: "Switching cost", ar: "تكلفة التحويل", definition: md`Cost to a customer of moving to an alternative; for test tools it includes re-validating procedures on rigs.`, lesson: "aw13-l04", category: "financial" },
  { id: "aw13-wedge", en: "Wedge product", ar: "المنتج الإسفيني (منتج الدخول)", definition: md`The narrow product that wins the first deal and opens the account; for Afterwave, Ripple.`, lesson: "aw13-l04", category: "pm" },
  { id: "aw13-bundling", en: "Bundling", ar: "التجميع في حزمة", definition: md`Adding a feature to a product the customer already pays for, so that a standalone rival competes against zero marginal price.`, lesson: "aw13-l04", category: "financial" },
  // l05
  { id: "aw13-battlecard", en: "Battlecard", ar: "بطاقة المواجهة التنافسية", definition: md`One-page sales tool per competitor or substitute: positioning, facts, win and loss conditions, landmines, objections, proof, traps.`, lesson: "aw13-l05", category: "pm" },
  { id: "aw13-objection", en: "Objection", ar: "اعتراض العميل", definition: md`A buyer statement resisting the purchase; usually a concern in disguise to be clarified before answering.`, lesson: "aw13-l05", category: "pm" },
  { id: "aw13-landmine", en: "Landmine question", ar: "سؤال كاشف للفجوة", definition: md`A question that lets the buyer discover a gap in the alternative himself.`, lesson: "aw13-l05", category: "pm" },
  { id: "aw13-fud", en: "FUD (fear, uncertainty and doubt)", ar: "إثارة الخوف والشك", definition: md`Unprovable negative claims about a competitor; erodes trust and can breach comparative advertising rules.`, lesson: "aw13-l05", category: "pm" },
  { id: "aw13-no-decision", en: "No-decision rate", ar: "معدل عدم اتخاذ القرار", definition: md`Share of opportunities that end without any purchase; the typical way deals against the status quo fail.`, lesson: "aw13-l05", category: "pm" },
  { id: "aw13-comparative-advertising", en: "Comparative advertising", ar: "الإعلان المقارن", definition: md`Advertising that names or identifies a competitor; in the EU permitted under the conditions of Directive 2006/114/EC.`, lesson: "aw13-l05", category: "contractual" },
];

export default glossary;
