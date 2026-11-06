import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "fc04-exit-criterion", en: "Stage exit criterion", ar: "معيار الخروج من المرحلة", definition: md`The buyer action or agreement, with evidence, that must exist before a deal moves to the next pipeline stage.`, lesson: "fc04-l01", category: "pm" },
  { id: "fc04-buying-committee", en: "Buying committee", ar: "لجنة الشراء (مجموعة اتخاذ قرار الشراء)", definition: md`Everyone who influences or approves an enterprise purchase: economic buyer, champion, technical evaluators, users, procurement, legal, security and blockers.`, lesson: "fc04-l01", category: "pm" },
  { id: "fc04-economic-buyer", en: "Economic buyer", ar: "المشتري الاقتصادي (صاحب صلاحية الإنفاق)", definition: md`The person with authority to approve the spend and say yes when others say no.`, lesson: "fc04-l01", category: "pm" },
  { id: "fc04-champion", en: "Champion", ar: "المناصر الداخلي", definition: md`A person inside the buyer with power or influence, a personal stake in your success, who acts to sell for you internally.`, lesson: "fc04-l04", category: "pm" },
  { id: "fc04-mutual-action-plan", en: "Mutual action plan", ar: "خطة العمل المشتركة", definition: md`A shared, dated list of buyer and seller steps from today to a purchase decision.`, lesson: "fc04-l01", category: "pm" },
  { id: "fc04-icp", en: "Ideal customer profile (ICP)", ar: "ملف العميل المثالي", definition: md`The description of the accounts that get the most value and buy fastest: industry, size, signals, problem; the filter for outbound and qualification.`, lesson: "fc04-l01", category: "pm" },
  // l02
  { id: "fc04-discovery-call", en: "Discovery call", ar: "مكالمة الاستكشاف", definition: md`A structured conversation to understand the buyer's situation, problems, their consequences, the decision process and timing, before any demo or proposal.`, lesson: "fc04-l02", category: "pm" },
  { id: "fc04-spin", en: "SPIN questioning", ar: "أسئلة SPIN (الوضع، المشكلة، التداعيات، العائد من الحل)", definition: md`Rackham's Situation, Problem, Implication and Need-payoff questions for large sales.`, lesson: "fc04-l02", category: "pm" },
  { id: "fc04-compelling-event", en: "Compelling event", ar: "الحدث الدافع (الموعد الملزم)", definition: md`A dated event that forces the buyer to solve the problem by a certain time: start of production, audit, regulation, contract renewal.`, lesson: "fc04-l02", category: "pm" },
  // l03
  { id: "fc04-technical-deep-dive", en: "Technical deep dive", ar: "الجلسة الفنية المتعمقة", definition: md`A dedicated session in which technical evaluators examine architecture, data formats, limits and deployment, with open questions recorded and closed in writing.`, lesson: "fc04-l03", category: "technical" },
  // l04
  { id: "fc04-meddpicc", en: "MEDDPICC", ar: "إطار MEDDPICC لتأهيل الصفقات", definition: md`Qualification framework: Metrics, Economic buyer, Decision criteria, Decision process, Paper process, Identify pain, Champion, Competition.`, lesson: "fc04-l04", category: "pm" },
  { id: "fc04-paper-process", en: "Paper process", ar: "الإجراءات الورقية للتعاقد", definition: md`Steps between a verbal yes and a signed contract: vendor onboarding, security review, legal review, approvals, purchase order.`, lesson: "fc04-l04", category: "contractual" },
  // l05
  { id: "fc04-pipeline", en: "Sales pipeline", ar: "خط الصفقات (مسار المبيعات)", definition: md`The set of open opportunities, each at a stage, with value and expected close date.`, lesson: "fc04-l05", category: "pm" },
  { id: "fc04-weighted-pipeline", en: "Weighted pipeline", ar: "القيمة المرجّحة لخط الصفقات", definition: md`Sum of deal values times their stage-to-close probabilities: $P_w = \sum p_s V$.`, lesson: "fc04-l05", category: "financial" },
  { id: "fc04-coverage", en: "Pipeline coverage", ar: "نسبة تغطية خط الصفقات", definition: md`In-period pipeline divided by the remaining target; required coverage is about one over the win rate.`, lesson: "fc04-l05", category: "financial" },
  { id: "fc04-sales-velocity", en: "Sales velocity", ar: "سرعة المبيعات", definition: md`$v = N\cdot W\cdot\mathrm{ACV}/L$: expected bookings per unit time from the flow of opportunities.`, lesson: "fc04-l05", category: "financial" },
  { id: "fc04-acv", en: "Annual contract value (ACV)", ar: "القيمة السنوية للعقد", definition: md`The average yearly value of a contract, excluding one-off fees; total contract value is ACV times the term.`, lesson: "fc04-l05", category: "financial" },
  // l06
  { id: "fc04-pilot", en: "Paid pilot / proof of concept (POC)", ar: "التجربة المدفوعة / إثبات المفهوم", definition: md`A time-boxed, scoped engagement whose purpose is a purchase decision, ideally paid and credited against the first year.`, lesson: "fc04-l06", category: "contractual" },
  { id: "fc04-success-criteria", en: "Success criteria", ar: "معايير النجاح", definition: md`Measurable conditions (metric, threshold, method, data, date, judge) that, if met, mean the buyer proceeds to purchase.`, lesson: "fc04-l06", category: "contractual" },
  { id: "fc04-conversion-clause", en: "Conversion clause", ar: "بند التحويل إلى عقد سنوي", definition: md`Pilot terms fixing the annual price, scope, start date and fee credit that apply when the success criteria are met.`, lesson: "fc04-l06", category: "contractual" },
  { id: "fc04-security-questionnaire", en: "Security questionnaire", ar: "استبيان تقييم أمن المعلومات", definition: md`The buyer's list of questions on the vendor's security controls (SIG, CAIQ or custom), usually backed by evidence such as SOC 2 or ISO/IEC 27001.`, lesson: "fc04-l06", category: "technical" },
  { id: "fc04-on-prem", en: "On-premises deployment", ar: "التشغيل في مقر العميل (داخل بنيته التحتية)", definition: md`Running the software on the customer's own servers or an isolated tenant so data never leaves their control.`, lesson: "fc04-l06", category: "technical" },
  // l07
  { id: "fc04-value-based-pricing", en: "Value-based pricing", ar: "التسعير القائم على القيمة", definition: md`Setting price as a share of the economic value to the customer rather than from cost or competitor prices.`, lesson: "fc04-l07", category: "financial" },
  { id: "fc04-evc", en: "Economic value to the customer (EVC)", ar: "القيمة الاقتصادية للعميل", definition: md`Reference value of the next best alternative plus the differentiation value of your product.`, lesson: "fc04-l07", category: "financial" },
  { id: "fc04-batna", en: "BATNA", ar: "أفضل بديل للاتفاق التفاوضي", definition: md`Best alternative to a negotiated agreement: what a party does if no deal is reached; it sets the reservation price.`, lesson: "fc04-l07", category: "contractual" },
  { id: "fc04-zopa", en: "Zone of possible agreement (ZOPA)", ar: "منطقة الاتفاق الممكن", definition: md`The range between the seller's reservation price and the buyer's reservation price.`, lesson: "fc04-l07", category: "contractual" },
  { id: "fc04-anchoring", en: "Anchoring", ar: "الإرساء السعري (تأثير الرقم الأول)", definition: md`The tendency of the first credible number in a negotiation to pull the outcome toward it.`, lesson: "fc04-l07", category: "financial" },
  // l08
  { id: "fc04-rfp", en: "Request for proposal (RFP)", ar: "طلب تقديم العروض", definition: md`Formal request for a solution, approach and price, evaluated against stated criteria; RFI asks for information and RFQ for a price (or, in public and PPP use, qualification).`, lesson: "fc04-l08", category: "institutional" },
  { id: "fc04-vendor-onboarding", en: "Vendor onboarding", ar: "تسجيل المورّد واعتماده", definition: md`The buyer's registration of a new supplier: legal, tax, bank, insurance and compliance documents, often with a security review.`, lesson: "fc04-l08", category: "institutional" },
  { id: "fc04-crm", en: "Customer relationship management (CRM) system", ar: "نظام إدارة علاقات العملاء", definition: md`The system of record for accounts, contacts, deals, stages and activities; the basis of pipeline and forecast.`, lesson: "fc04-l08", category: "pm" },
];

export default glossary;
