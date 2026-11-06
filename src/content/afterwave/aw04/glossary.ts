import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "aw04-requirement", en: "Requirement", ar: "متطلب", definition: md`A statement a system must satisfy, written so someone other than the author can decide by an agreed method whether it is met.`, lesson: "aw04-l01", category: "technical" },
  { id: "aw04-stakeholder-requirement", en: "Stakeholder requirement", ar: "متطلب أصحاب المصلحة", definition: md`A need of a user, customer or regulator, stated in their terms; validated in the real use context.`, lesson: "aw04-l01", category: "technical" },
  { id: "aw04-derived-requirement", en: "Derived requirement", ar: "متطلب مشتق", definition: md`A lower-level requirement created because of a design choice; must still trace up to the requirement or decision that caused it.`, lesson: "aw04-l01", category: "technical" },
  { id: "aw04-ears", en: "EARS (Easy Approach to Requirements Syntax)", ar: "صيغة EARS لكتابة المتطلبات", definition: md`Templates for natural-language requirements: ubiquitous, When (event), While (state), If...then (unwanted behaviour), Where (optional feature).`, lesson: "aw04-l01", category: "technical" },
  { id: "aw04-verification-method", en: "Verification method (IADT)", ar: "طريقة التحقق", definition: md`Inspection, analysis, demonstration or test: how a requirement will be shown to be met, chosen when it is written.`, lesson: "aw04-l01", category: "technical" },
  { id: "aw04-verification-validation", en: "Verification vs validation", ar: "التحقق مقابل المصادقة", definition: md`Verification: meets the specified requirement. Validation: meets the stakeholder need in its intended use.`, lesson: "aw04-l01", category: "technical" },
  { id: "aw04-guard-band", en: "Guard band", ar: "هامش الحماية", definition: md`Distance by which the acceptance limit is moved inside the tolerance, usually equal to the expanded measurement uncertainty.`, lesson: "aw04-l01", category: "technical" },
  { id: "aw04-measurement-uncertainty", en: "Expanded measurement uncertainty", ar: "عدم اليقين الموسّع في القياس", definition: md`$U = k u_c$: an interval around a measured value expected to contain the true value with stated coverage (about 95 % for $k = 2$).`, lesson: "aw04-l01", category: "technical" },
  // l02
  { id: "aw04-traceability", en: "Bidirectional traceability", ar: "التتبع ثنائي الاتجاه", definition: md`Forward links from requirements to design and verification, and backward links from tests and code to the requirements that justify them.`, lesson: "aw04-l02", category: "technical" },
  { id: "aw04-trace-matrix", en: "Traceability matrix", ar: "مصفوفة التتبع", definition: md`Table of links between two artifact sets; empty rows are gaps, tests with no requirement are orphans.`, lesson: "aw04-l02", category: "technical" },
  { id: "aw04-v-model", en: "V-model", ar: "النموذج V لدورة التطوير", definition: md`Lifecycle view pairing each decomposition level (left leg) with an integration and verification level (right leg).`, lesson: "aw04-l02", category: "pm" },
  { id: "aw04-suspect-link", en: "Suspect link", ar: "رابط مشتبه به", definition: md`A trace link flagged for review because an item at one end changed after the link was last confirmed.`, lesson: "aw04-l02", category: "technical" },
  { id: "aw04-baseline", en: "Baseline", ar: "خط الأساس (نسخة مجمّدة)", definition: md`A frozen, identified version of a set of items against which verification results are recorded.`, lesson: "aw04-l02", category: "pm" },
  { id: "aw04-orphan-test", en: "Orphan test", ar: "اختبار يتيم (غير مرتبط بمتطلب)", definition: md`A test case linked to no requirement: either a missing requirement or a test that wastes rig time.`, lesson: "aw04-l02", category: "technical" },
  { id: "aw04-coverage", en: "Requirements coverage (link vs passing)", ar: "تغطية المتطلبات", definition: md`Link coverage: share of requirements with a verification link. Passing coverage: share verified on the current baseline.`, lesson: "aw04-l02", category: "technical" },
  // l03
  { id: "aw04-reqif", en: "ReqIF (Requirements Interchange Format)", ar: "صيغة تبادل المتطلبات ReqIF", definition: md`OMG XML standard for exchanging requirements, types, attributes, hierarchy and relations between tools and companies.`, lesson: "aw04-l03", category: "technical" },
  { id: "aw04-oslc", en: "OSLC", ar: "معيار OSLC لربط أدوات دورة الحياة", definition: md`Open Services for Lifecycle Collaboration: linked-data links between lifecycle tools without copying items.`, lesson: "aw04-l03", category: "technical" },
  { id: "aw04-test-execution", en: "Test execution (test run)", ar: "تنفيذ الاختبار", definition: md`One execution of test cases against a version and environment, producing a status per test.`, lesson: "aw04-l03", category: "technical" },
  { id: "aw04-run-context", en: "Run context", ar: "سياق تشغيل الاختبار", definition: md`The configuration a result was produced on: firmware build, hardware revision, rig, fixture, calibration, DAQ configuration, model version.`, lesson: "aw04-l03", category: "technical" },
  // l04
  { id: "aw04-asil", en: "ASIL (Automotive Safety Integrity Level)", ar: "مستوى سلامة المركبات المتكامل (ASIL)", definition: md`ISO 26262 risk class A to D from severity, exposure and controllability; QM if no safety requirement.`, lesson: "aw04-l04", category: "technical" },
  { id: "aw04-sil", en: "SIL (Safety Integrity Level)", ar: "مستوى تكامل السلامة (SIL)", definition: md`IEC 61508 integrity level 1 to 4 with quantitative targets (PFH or PFDavg) for a safety function.`, lesson: "aw04-l04", category: "technical" },
  { id: "aw04-safety-goal", en: "Safety goal", ar: "هدف السلامة", definition: md`Top-level safety requirement resulting from hazard analysis, carrying an ASIL, refined into functional and technical safety requirements.`, lesson: "aw04-l04", category: "technical" },
  { id: "aw04-tcl", en: "Tool confidence level (TCL)", ar: "مستوى الثقة في الأداة", definition: md`ISO 26262-8 rating of a software tool from tool impact and error detection; TCL2 and TCL3 need qualification.`, lesson: "aw04-l04", category: "technical" },
  { id: "aw04-fsa", en: "Functional safety assessment", ar: "تقييم السلامة الوظيفية", definition: md`Independent judgement of whether the functional safety achieved is adequate, with independence rising with the integrity level.`, lesson: "aw04-l04", category: "institutional" },
  { id: "aw04-technical-file", en: "Technical documentation (technical file)", ar: "الملف الفني (الوثائق الفنية)", definition: md`The manufacturer's file showing conformity with Regulation (EU) 2023/1230: risk assessment, EHSRs and measures, standards, test results, instructions, declaration.`, lesson: "aw04-l04", category: "institutional" },
  { id: "aw04-notified-body", en: "Notified body", ar: "الجهة المُبلَّغ عنها (جهة تقييم المطابقة)", definition: md`Conformity assessment body designated under EU law; required for Annex I Part A machinery, including ML-based safety functions, from 20 January 2027.`, lesson: "aw04-l04", category: "institutional" },
  // l05
  { id: "aw04-evidence-chain", en: "Evidence chain", ar: "سلسلة الأدلة", definition: md`Requirement, test case, test run, run context, raw data, derived metric and verdict.`, lesson: "aw04-l05", category: "technical" },
  { id: "aw04-stale-evidence", en: "Stale evidence", ar: "أدلة متقادمة", definition: md`Passing evidence that predates a change somewhere in the requirement's dependency chain.`, lesson: "aw04-l05", category: "technical" },
  { id: "aw04-implicit-dependency", en: "Implicit dependency", ar: "اعتمادية ضمنية", definition: md`A real dependency of a test on code, model, rig or calibration that no trace link records.`, lesson: "aw04-l05", category: "technical" },
  { id: "aw04-escape", en: "Test escape", ar: "عيب متسرّب", definition: md`A regression that a test selection missed and that was found later, by a full run or in the field.`, lesson: "aw04-l05", category: "technical" },
];

export default glossary;
