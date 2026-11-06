import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "fc02-product-discovery", en: "Product discovery", ar: "اكتشاف المنتج", definition: md`The work of deciding what is worth building before building it, by reducing value, viability, feasibility and usability risk with cheap tests.`, lesson: "fc02-l01", category: "pm" },
  { id: "fc02-problem-statement", en: "Problem statement", ar: "بيان المشكلة", definition: md`A falsifiable, solution-free description of who has a problem, in what situation, what they do today, what it costs them, and the evidence for it.`, lesson: "fc02-l01", category: "pm" },
  { id: "fc02-assumption-map", en: "Assumption map", ar: "خريطة الافتراضات", definition: md`A 2x2 plot of everything that must be true for a product to succeed, by importance and strength of evidence; the important, unevidenced quadrant is tested first.`, lesson: "fc02-l01", category: "pm" },
  { id: "fc02-evidence-ladder", en: "Evidence ladder", ar: "سلّم الأدلة", definition: md`Ranking of customer signals by what they cost the customer: opinions, stated past behaviour, observed behaviour, time, reputation, money.`, lesson: "fc02-l01", category: "pm" },
  { id: "fc02-opportunity-solution-tree", en: "Opportunity solution tree", ar: "شجرة الفرص والحلول", definition: md`Teresa Torres' structure linking a business outcome to customer opportunities, candidate solutions and assumption tests.`, lesson: "fc02-l01", category: "pm" },
  // l02
  { id: "fc02-mom-test", en: "The Mom Test", ar: "اختبار الأم (منهجية مقابلات العملاء)", definition: md`Rob Fitzpatrick's interview rules: talk about their life, ask about specific past events, talk less. Questions that even a polite person cannot answer with a lie.`, lesson: "fc02-l02", category: "pm" },
  { id: "fc02-advancement", en: "Commitment and advancement", ar: "الالتزام والتقدّم في مسار الشراء", definition: md`The customer gives up time, reputation or money to move to the next step of buying. The test of whether a meeting succeeded.`, lesson: "fc02-l02", category: "pm" },
  { id: "fc02-zombie-lead", en: "Zombie lead", ar: "عميل محتمل خامل", definition: md`A friendly contact who never commits anything ("keep me posted"); counts as no evidence and no pipeline.`, lesson: "fc02-l02", category: "pm" },
  // l03
  { id: "fc02-jtbd", en: "Job to be done", ar: "المهمة المطلوب إنجازها", definition: md`The progress a person is trying to make in a particular circumstance; customers hire products to do the job and fire them when something does it better.`, lesson: "fc02-l03", category: "pm" },
  { id: "fc02-job-story", en: "Job story", ar: "قصة المهمة", definition: md`Requirement format: When [situation], I want to [motivation], so I can [expected outcome].`, lesson: "fc02-l03", category: "pm" },
  { id: "fc02-forces-of-progress", en: "Forces of progress", ar: "قوى التقدّم (الدفع والجذب والقلق والعادة)", definition: md`Push and pull drive a switch to a new solution; anxiety and habit block it. A switch happens when the first pair outweighs the second.`, lesson: "fc02-l03", category: "pm" },
  // l04
  { id: "fc02-prd", en: "Product requirements document (PRD)", ar: "وثيقة متطلبات المنتج", definition: md`Short document stating problem, users, goals and metrics, non-goals, requirements, acceptance criteria and constraints, without prescribing implementation.`, lesson: "fc02-l04", category: "pm" },
  { id: "fc02-acceptance-criteria", en: "Acceptance criteria", ar: "معايير القبول", definition: md`Testable conditions, written before building, that a feature must meet to be accepted; often Given / When / Then with numbers and units.`, lesson: "fc02-l04", category: "pm" },
  { id: "fc02-non-goals", en: "Non-goals", ar: "الأهداف المستبعدة (خارج النطاق)", definition: md`Explicit statements of what a piece of work will not do; they bound scope and let engineers make trade-offs.`, lesson: "fc02-l04", category: "pm" },
  { id: "fc02-appetite", en: "Appetite", ar: "الميزانية الزمنية المحددة", definition: md`Shape Up's fixed time budget for a piece of work ("worth 6 weeks"), with scope allowed to vary to fit.`, lesson: "fc02-l04", category: "pm" },
  // l05
  { id: "fc02-rice", en: "RICE score", ar: "مؤشر RICE لتحديد الأولويات", definition: md`Reach times Impact times Confidence divided by Effort; Intercom's prioritisation score.`, lesson: "fc02-l05", category: "pm" },
  { id: "fc02-cost-of-delay", en: "Cost of delay", ar: "تكلفة التأخير", definition: md`Value lost per unit of time that an item is not delivered (EUR per week).`, lesson: "fc02-l05", category: "financial" },
  { id: "fc02-wsjf", en: "Weighted shortest job first (WSJF, CD3)", ar: "أقصر مهمة مرجَّحة أولاً", definition: md`Rank items by cost of delay divided by duration; minimises total cost of delay for independent items on one resource.`, lesson: "fc02-l05", category: "pm" },
  { id: "fc02-roadmap", en: "Now-next-later roadmap", ar: "خارطة طريق المنتج (الآن، التالي، لاحقاً)", definition: md`Roadmap organised by horizons of decreasing certainty instead of dates, with items phrased as outcomes.`, lesson: "fc02-l05", category: "pm" },
  // l06
  { id: "fc02-mvp", en: "Minimum viable product (MVP)", ar: "الحد الأدنى من المنتج القابل للتطبيق", definition: md`The least-effort version that allows a full build-measure-learn loop to test the riskiest assumption.`, lesson: "fc02-l06", category: "pm" },
  { id: "fc02-concierge-mvp", en: "Concierge MVP", ar: "نموذج أولي بخدمة يدوية (كونسيرج)", definition: md`Delivering the product's value manually, with the customer aware it is manual, to test desirability before automating.`, lesson: "fc02-l06", category: "pm" },
  { id: "fc02-wizard-of-oz", en: "Wizard-of-Oz MVP", ar: "نموذج ساحر أوز (واجهة آلية يديرها البشر)", definition: md`The customer uses what looks like an automated product while people do the work behind it.`, lesson: "fc02-l06", category: "pm" },
  { id: "fc02-pilot", en: "Pilot (B2B)", ar: "مشروع تجريبي", definition: md`Time-boxed deployment at a customer with written success criteria, commercial terms and a conversion decision at the end.`, lesson: "fc02-l06", category: "contractual" },
  { id: "fc02-pilot-purgatory", en: "Pilot purgatory", ar: "دوامة المشاريع التجريبية غير المنتهية", definition: md`A pilot that never converts because success, the economic buyer or the next step were never defined.`, lesson: "fc02-l06", category: "pm" },
  // l07
  { id: "fc02-activation", en: "Activation", ar: "التفعيل", definition: md`The first moment a new user or account gets the core value, measured as the share of a cohort reaching it within a stated window.`, lesson: "fc02-l07", category: "pm" },
  { id: "fc02-cohort-retention", en: "Cohort retention", ar: "معدل الاحتفاظ حسب الفوج", definition: md`Share of a group that started in the same period still doing the core action in each later period.`, lesson: "fc02-l07", category: "pm" },
  { id: "fc02-north-star", en: "North Star metric", ar: "مؤشر نجم الشمال", definition: md`One metric capturing the value customers get from the product, leading revenue, broken into input metrics.`, lesson: "fc02-l07", category: "pm" },
  { id: "fc02-nrr", en: "Net revenue retention (NRR)", ar: "صافي الاحتفاظ بالإيرادات", definition: md`Recurring revenue from a fixed set of customers after expansion, contraction and churn, divided by their starting revenue.`, lesson: "fc02-l07", category: "financial" },
  // l08
  { id: "fc02-technical-debt", en: "Technical debt", ar: "الدَّين التقني", definition: md`A shortcut that saves effort now (principal) but makes later changes slower (interest) until repaid by rework.`, lesson: "fc02-l08", category: "pm" },
  { id: "fc02-decision-rights", en: "Decision rights (DACI)", ar: "صلاحيات اتخاذ القرار", definition: md`Explicit agreement on who drives, approves, contributes to and is informed about each class of decision.`, lesson: "fc02-l08", category: "pm" },
];

export default glossary;
