import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "aw05-dependency-graph", en: "Dependency graph", ar: "مخطط الاعتماديات", definition: md`Directed graph whose edge u to v means a change in u can change the behaviour or verdict of v; nodes are artifacts, components, tests and requirements.`, lesson: "aw05-l01", category: "technical" },
  { id: "aw05-transitive-impact", en: "Transitive impact", ar: "الأثر المتعدّي", definition: md`Everything reachable from a changed node by a directed path; safe if the graph is complete, but imprecise.`, lesson: "aw05-l01", category: "technical" },
  { id: "aw05-noisy-or", en: "Noisy-OR impact score", ar: "درجة الأثر بطريقة «أو» الاحتمالية", definition: md`$1 - \prod(1 - w)$ over a test's changed dependencies; exact when they act independently.`, lesson: "aw05-l01", category: "technical" },
  { id: "aw05-edge-provenance", en: "Edge provenance", ar: "مصدر الرابط", definition: md`Where a dependency edge came from: declared, static, dynamic or learned.`, lesson: "aw05-l01", category: "technical" },
  { id: "aw05-hub-node", en: "Hub node", ar: "عقدة محورية", definition: md`A node most tests depend on (supply, DAQ, common library); makes plain reachability select almost everything.`, lesson: "aw05-l01", category: "technical" },
  // l02
  { id: "aw05-regression-test-selection", en: "Regression test selection", ar: "اختيار اختبارات الانحدار", definition: md`Choosing the subset of an existing test suite to rerun for a specific change.`, lesson: "aw05-l02", category: "technical" },
  { id: "aw05-test-prioritisation", en: "Test prioritisation", ar: "ترتيب أولويات الاختبارات", definition: md`Ordering tests so that faults are revealed as early as possible.`, lesson: "aw05-l02", category: "technical" },
  { id: "aw05-modification-revealing", en: "Modification-revealing test", ar: "اختبار كاشف للتعديل", definition: md`A test whose output differs between the old and the changed system.`, lesson: "aw05-l02", category: "technical" },
  { id: "aw05-safe-selection", en: "Safe selection", ar: "الاختيار الآمن", definition: md`Selecting every modification-revealing test, under the assumption that nothing but the change differs between runs.`, lesson: "aw05-l02", category: "technical" },
  { id: "aw05-recall", en: "Recall (of a selection)", ar: "الاستدعاء (نسبة الالتقاط)", definition: md`Share of regression-revealing tests that the selection kept: TP/(TP + FN).`, lesson: "aw05-l02", category: "technical" },
  { id: "aw05-escape", en: "Escape (escaped defect)", ar: "عيب مُفلت", definition: md`A regression not caught because the test that would have revealed it was skipped; found later at higher cost.`, lesson: "aw05-l02", category: "technical" },
  { id: "aw05-shadow-mode", en: "Shadow mode / shadow sampling", ar: "التشغيل الظلّي / العيّنات الظلّية", definition: md`Running skipped tests anyway (all, or a random share) to measure what the selection would have missed.`, lesson: "aw05-l02", category: "pm" },
  { id: "aw05-mandatory-set", en: "Mandatory test set", ar: "مجموعة الاختبارات الإلزامية", definition: md`Tests always run regardless of score: safety functions, smoke tests, unlinked and witnessed tests.`, lesson: "aw05-l02", category: "pm" },
  // l03
  { id: "aw05-mcdc", en: "Modified condition/decision coverage (MC/DC)", ar: "تغطية الشرط والقرار المعدّلة", definition: md`Coverage criterion requiring each condition to be shown to independently change a decision's outcome; at least N + 1 tests.`, lesson: "aw05-l03", category: "technical" },
  { id: "aw05-suspect-link", en: "Suspect link", ar: "رابط تتبّع مشكوك فيه", definition: md`A traceability link flagged for review because an upstream item changed.`, lesson: "aw05-l03", category: "technical" },
  { id: "aw05-operating-envelope", en: "Operating envelope coverage", ar: "تغطية نطاق التشغيل", definition: md`Share of feasible cells of the operating space (speed, torque, temperature) visited by tests, from measured signals.`, lesson: "aw05-l03", category: "technical" },
  { id: "aw05-signal-sensitivity", en: "Signal sensitivity", ar: "حساسية الإشارة", definition: md`How strongly a test's verdict metric responds to a change in a measured signal, normalised by its margin to the limit.`, lesson: "aw05-l03", category: "technical" },
  // l04
  { id: "aw05-co-change", en: "Co-change analysis", ar: "تحليل التغيّر المتزامن", definition: md`Mining history for artifacts and test failures that occur together, scored by confidence and lift.`, lesson: "aw05-l04", category: "technical" },
  { id: "aw05-apfd", en: "APFD", ar: "متوسط النسبة المئوية للأعطال المكتشفة", definition: md`Average percentage of faults detected: area under faults found versus share of the suite run; APFDc weights by test cost.`, lesson: "aw05-l04", category: "technical" },
  { id: "aw05-flaky-test", en: "Flaky test", ar: "اختبار متذبذب", definition: md`A test whose outcome varies without a relevant change; its failures must not be learned as dependencies.`, lesson: "aw05-l04", category: "technical" },
  { id: "aw05-cold-start", en: "Cold start", ar: "البدء البارد", definition: md`Having no history for a new customer, test or rig; handled with priors, backfill, pooling and exploration.`, lesson: "aw05-l04", category: "technical" },
  { id: "aw05-calibrated-probability", en: "Calibrated probability", ar: "احتمال معايَر", definition: md`A predicted probability that matches observed frequency (of pairs predicted at 10 %, about 10 % fail); checked with the Brier score.`, lesson: "aw05-l04", category: "technical" },
  // l05
  { id: "aw05-measurement-uncertainty", en: "Expanded measurement uncertainty", ar: "عدم اليقين الموسّع في القياس", definition: md`Combined standard uncertainty times a coverage factor (k = 2 for about 95 %), per the GUM.`, lesson: "aw05-l05", category: "technical" },
  { id: "aw05-as-found", en: "As-found / as-left", ar: "الحالة عند الاستلام / الحالة بعد الضبط", definition: md`Calibration results before and after adjustment; as-found reveals the bias that affected past results.`, lesson: "aw05-l05", category: "technical" },
  { id: "aw05-tur", en: "Test uncertainty ratio (TUR)", ar: "نسبة عدم يقين الاختبار", definition: md`Tolerance span divided by twice the 95 % expanded uncertainty; a common rule asks for at least 4.`, lesson: "aw05-l05", category: "technical" },
  { id: "aw05-golden-unit", en: "Golden unit baseline", ar: "خط أساس بوحدة مرجعية", definition: md`Running a reference device under test before and after a rig change to measure the shift directly.`, lesson: "aw05-l05", category: "technical" },
  { id: "aw05-sim-to-real", en: "Sim-to-real gap", ar: "الفجوة بين المحاكاة والواقع", definition: md`The difference between results in simulation and on physical hardware; limits when simulation can replace a rig rerun.`, lesson: "aw05-l05", category: "technical" },
  // l06
  { id: "aw05-evidence-trail", en: "Evidence trail", ar: "سجل الأدلة", definition: md`The chain from change to decision for each test: path or rule, provenance, counts, score and decision rule.`, lesson: "aw05-l06", category: "pm" },
  { id: "aw05-automation-bias", en: "Automation bias", ar: "التحيّز للأتمتة", definition: md`Over-reliance on automated recommendations without checking them; the opposite failure is disuse after false alarms.`, lesson: "aw05-l06", category: "pm" },
  { id: "aw05-human-approval", en: "Human approval gate", ar: "بوابة الموافقة البشرية", definition: md`A named engineer approves a rerun plan, and especially its skips, before rigs run; the approval is recorded.`, lesson: "aw05-l06", category: "pm" },
];

export default glossary;
