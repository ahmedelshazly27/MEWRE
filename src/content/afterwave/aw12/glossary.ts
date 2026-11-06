import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "aw12-test-systems-engineer", en: "Test systems engineer", ar: "مهندس أنظمة الاختبار", definition: md`Engineer who owns rig software, DAQ configuration, sequencers and test data storage; Afterwave's natural champion.`, lesson: "aw12-l01", category: "technical" },
  { id: "aw12-validation-manager", en: "Validation manager", ar: "مدير التحقق", definition: md`Plans what is tested for each release and signs the test report; the usual sceptic of test selection.`, lesson: "aw12-l01", category: "pm" },
  { id: "aw12-lab-manager", en: "Lab manager", ar: "مدير المختبر", definition: md`Runs rig scheduling, maintenance, calibration and lab capex; measured on utilisation and queue length.`, lesson: "aw12-l01", category: "pm" },
  { id: "aw12-budget-line", en: "Budget line", ar: "بند الميزانية", definition: md`A named, approved allocation of money with an owner and calendar: lab capex, engineering tools opex, programme budget or innovation budget.`, lesson: "aw12-l01", category: "financial" },
  { id: "aw12-veto-holder", en: "Veto holder", ar: "صاحب حق الاعتراض", definition: md`A person who cannot approve a purchase alone but can stop it (IT or OT security, procurement, legal, quality).`, lesson: "aw12-l01", category: "pm" },
  { id: "aw12-preferred-supplier-list", en: "Preferred supplier list", ar: "قائمة الموردين المعتمدين", definition: md`The buyer's list of approved suppliers; a new vendor must complete onboarding to be added.`, lesson: "aw12-l01", category: "contractual" },
  // l02
  { id: "aw12-business-case", en: "Business case", ar: "دراسة الجدوى الاقتصادية (مبررات الاستثمار)", definition: md`A document in the buyer's numbers that compares benefits and full costs of a purchase over several years, with ROI, payback and assumptions.`, lesson: "aw12-l02", category: "financial" },
  { id: "aw12-selection-ratio", en: "Selection ratio", ar: "نسبة الاختبارات المختارة", definition: md`Rig-hours of the selected test set divided by rig-hours of the full regression.`, lesson: "aw12-l02", category: "technical" },
  { id: "aw12-retest-loop", en: "Data-caused retest", ar: "إعادة الاختبار بسبب البيانات", definition: md`A test repeated because data was missing, misaligned or the operator's actions cannot be reconstructed, not because the device failed.`, lesson: "aw12-l02", category: "technical" },
  { id: "aw12-escaped-defect", en: "Escaped defect", ar: "عيب متسرّب (لم يُكتشف قبل الإصدار)", definition: md`A defect found after a release gate: at integration, at a customer site or in the field.`, lesson: "aw12-l02", category: "technical" },
  { id: "aw12-risk-adjustment", en: "Risk adjustment", ar: "التعديل وفق المخاطر", definition: md`Multiplying each benefit line by a confidence factor reflecting its evidence.`, lesson: "aw12-l02", category: "financial" },
  { id: "aw12-payback", en: "Payback period", ar: "فترة الاسترداد", definition: md`Time for net benefits to recover the one-time cost.`, lesson: "aw12-l02", category: "financial" },
  // l03
  { id: "aw12-backtest", en: "Backtest", ar: "الاختبار الرجعي على البيانات التاريخية", definition: md`Replaying historical changes to check whether selected test sets would have included the tests that actually failed.`, lesson: "aw12-l03", category: "technical" },
  { id: "aw12-shadow-mode", en: "Shadow mode", ar: "وضع التشغيل الموازي (الظل)", definition: md`The tool recommends a selection on live changes while the full suite still runs, so results can be compared without risk.`, lesson: "aw12-l03", category: "technical" },
  { id: "aw12-gated-mode", en: "Gated mode", ar: "وضع التشغيل المعتمد", definition: md`Only the selected set runs, after human approval, with a periodic full regression as a safety net.`, lesson: "aw12-l03", category: "technical" },
  { id: "aw12-rule-of-three", en: "Rule of three", ar: "قاعدة الثلاثة", definition: md`With zero events in $n$ independent trials, the 95 % upper bound on the event rate is about $3/n$.`, lesson: "aw12-l03", category: "technical" },
  // l04
  { id: "aw12-tisax", en: "TISAX", ar: "تقييم أمن المعلومات في صناعة السيارات (TISAX)", definition: md`Automotive information security assessment and label exchange run by the ENX Association on the VDA ISA catalogue.`, lesson: "aw12-l04", category: "institutional" },
  { id: "aw12-air-gapped", en: "Air-gapped network", ar: "شبكة معزولة عن الإنترنت", definition: md`A network with no path to the internet; software arrives as offline bundles through a controlled transfer process.`, lesson: "aw12-l04", category: "technical" },
  { id: "aw12-sbom", en: "Software bill of materials (SBOM)", ar: "قائمة مكوّنات البرمجيات", definition: md`A machine-readable list (SPDX or CycloneDX) of the components in a software release, used to check vulnerabilities.`, lesson: "aw12-l04", category: "technical" },
  { id: "aw12-cab", en: "Change advisory board (CAB)", ar: "مجلس اعتماد التغييرات", definition: md`The group that reviews and approves changes to controlled IT, OT or lab configurations, usually on a fixed cycle.`, lesson: "aw12-l04", category: "pm" },
  { id: "aw12-dual-use", en: "Dual-use item", ar: "مادة ذات استخدام مزدوج", definition: md`Goods, software or technology with civil and military uses, controlled under lists such as EU Regulation 2021/821 Annex I.`, lesson: "aw12-l04", category: "contractual" },
  // l05
  { id: "aw12-beachhead", en: "Beachhead segment", ar: "شريحة رأس الجسر (السوق الأولى)", definition: md`The first segment you concentrate on to win references and revenue fastest.`, lesson: "aw12-l05", category: "pm" },
  { id: "aw12-regulation-pull", en: "Regulation pull", ar: "الطلب الناتج عن التشريعات", definition: md`A dated regulatory or standards requirement that makes buyers need a product.`, lesson: "aw12-l05", category: "institutional" },
  // l06
  { id: "aw12-design-partner", en: "Design partner", ar: "شريك التصميم", definition: md`An early paying customer who gets early access and roadmap influence in return for feedback, data access and a reference.`, lesson: "aw12-l06", category: "contractual" },
  { id: "aw12-reference-call", en: "Reference call", ar: "مكالمة مرجعية مع عميل", definition: md`A private conversation in which an existing customer's engineer speaks to a prospect about their experience.`, lesson: "aw12-l06", category: "pm" },
];

export default glossary;
