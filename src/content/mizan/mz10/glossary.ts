import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "mz10-validation-study", en: "Validation study", ar: "دراسة التحقق", definition: md`A study designed to test, against an independent ground truth, whether a method meets stated accuracy thresholds; it must be able to fail.`, lesson: "mz10-l01", category: "technical" },
  { id: "mz10-ground-truth", en: "Ground truth", ar: "القيمة المرجعية الحقيقية", definition: md`The independent reference a method is compared against, such as clean and soiled reference devices or a controlled cleaning comparison, with known uncertainty.`, lesson: "mz10-l01", category: "technical" },
  { id: "mz10-mbe", en: "Mean bias error (MBE)", ar: "متوسط خطأ الانحياز", definition: md`Average signed error of an estimate against the truth; the systematic part of the error.`, lesson: "mz10-l01", category: "technical" },
  { id: "mz10-rmse", en: "Root mean square error (RMSE)", ar: "جذر متوسط مربع الخطأ", definition: md`Square root of the mean squared error; typical error size. RMSE squared equals bias squared plus error variance.`, lesson: "mz10-l01", category: "technical" },
  { id: "mz10-coverage", en: "Interval coverage", ar: "نسبة تغطية فترات الثقة", definition: md`Share of units whose true value lies inside the method's stated confidence interval; tests whether its uncertainty is honest.`, lesson: "mz10-l01", category: "technical" },
  { id: "mz10-statistical-power", en: "Statistical power", ar: "القوة الإحصائية", definition: md`Probability that a study detects an effect of a given size if it exists; commonly set at 80% or 90% when sizing a study.`, lesson: "mz10-l01", category: "technical" },
  { id: "mz10-effective-sample-size", en: "Effective sample size", ar: "حجم العينة الفعّال", definition: md`Number of independent observations a correlated series is worth; for lag-1 autocorrelation rho, n(1 - rho)/(1 + rho).`, lesson: "mz10-l01", category: "technical" },
  { id: "mz10-pre-registration", en: "Pre-registration", ar: "التسجيل المسبق لخطة التحليل", definition: md`Fixing and dating hypotheses, metrics, filters and hold-out data before analysis, so results cannot be tuned afterwards.`, lesson: "mz10-l01", category: "pm" },
  // l02
  { id: "mz10-natural-experiment", en: "Natural experiment", ar: "التجربة الطبيعية", definition: md`An event not controlled by the researcher that creates treated and control conditions, such as an unplanned cleaning outage.`, lesson: "mz10-l02", category: "technical" },
  { id: "mz10-did", en: "Difference-in-differences", ar: "طريقة الفرق في الفروق", definition: md`Change in the treated group minus change in the control group over the same periods; removes common shocks and fixed differences.`, lesson: "mz10-l02", category: "technical" },
  { id: "mz10-parallel-trends", en: "Parallel trends", ar: "افتراض الاتجاهات المتوازية", definition: md`The assumption that treated and control groups would have changed alike without treatment; checked on the pre-period.`, lesson: "mz10-l02", category: "technical" },
  { id: "mz10-confounder", en: "Confounder", ar: "العامل المُربِك", definition: md`A factor that affects the outcome and coincides with the treatment, such as a dust storm, curtailment or sensor soiling.`, lesson: "mz10-l02", category: "technical" },
  { id: "mz10-blinding", en: "Blinding", ar: "التعمية", definition: md`Running a method without access to the answer (for example outage dates) and logging outputs before unblinding.`, lesson: "mz10-l02", category: "technical" },
  // l03
  { id: "mz10-methodology-partner", en: "Methodology partner", ar: "شريك منهجي", definition: md`A research institution that co-designs, reviews and co-authors a study; not a customer and not an endorser.`, lesson: "mz10-l03", category: "institutional" },
  { id: "mz10-mou", en: "Memorandum of understanding (MoU)", ar: "مذكرة تفاهم", definition: md`A statement of intent to collaborate, usually non-binding except for named clauses such as confidentiality.`, lesson: "mz10-l03", category: "contractual" },
  { id: "mz10-data-sharing-agreement", en: "Data-sharing agreement", ar: "اتفاقية مشاركة البيانات", definition: md`Binding terms on which data are shared, for what purpose, under what security, for how long, and what may be published.`, lesson: "mz10-l03", category: "contractual" },
  { id: "mz10-background-ip", en: "Background and foreground IP", ar: "الملكية الفكرية السابقة والناشئة", definition: md`Background IP is what each party brings and keeps; foreground IP is created in the project and its ownership is negotiated.`, lesson: "mz10-l03", category: "contractual" },
  { id: "mz10-authorship-criteria", en: "Authorship criteria (ICMJE)", ar: "معايير التأليف العلمي", definition: md`Substantial contribution, drafting or critical revision, final approval and accountability; all four are required.`, lesson: "mz10-l03", category: "pm" },
  { id: "mz10-competing-interest", en: "Competing interest", ar: "تضارب المصالح", definition: md`A financial or other interest that could influence, or appear to influence, the work; must be declared in publications.`, lesson: "mz10-l03", category: "pm" },
  // l04
  { id: "mz10-peer-review", en: "Peer review", ar: "التحكيم العلمي", definition: md`Evaluation of a manuscript by independent experts before publication, leading to rejection, revision or acceptance.`, lesson: "mz10-l04", category: "pm" },
  { id: "mz10-preprint", en: "Preprint", ar: "المسودة المنشورة مسبقاً", definition: md`A public version of a manuscript before peer review; counts as public disclosure.`, lesson: "mz10-l04", category: "pm" },
  { id: "mz10-fair", en: "FAIR principles", ar: "مبادئ البيانات القابلة للإيجاد والوصول والتشغيل البيني وإعادة الاستخدام", definition: md`Findable, accessible, interoperable and reusable: the standard for research data stewardship.`, lesson: "mz10-l04", category: "technical" },
  { id: "mz10-data-availability", en: "Data availability statement", ar: "بيان إتاحة البيانات", definition: md`The section of a paper stating where and under what conditions the data and code can be obtained.`, lesson: "mz10-l04", category: "pm" },
  // l05
  { id: "mz10-evidence-ladder", en: "Evidence ladder", ar: "سلّم الأدلة", definition: md`Ordered levels of evidence from hypothesis to decision trial; each supports a specific strength of claim.`, lesson: "mz10-l05", category: "pm" },
  { id: "mz10-overclaim", en: "Overclaim", ar: "المبالغة في الادعاء", definition: md`A statement stronger than the evidence, such as an implied endorsement, certification or untested savings figure.`, lesson: "mz10-l05", category: "pm" },
  { id: "mz10-case-study", en: "Case study", ar: "دراسة حالة", definition: md`A short buyer-facing account of a problem, method, result with uncertainty, limits and citation.`, lesson: "mz10-l05", category: "pm" },
];

export default glossary;
