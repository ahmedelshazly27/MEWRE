import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "aw03-mil", en: "Model in the loop (MIL)", ar: "النموذج ضمن الحلقة", definition: md`Testing a controller model in closed loop with a plant model on a desktop, without a real-time clock.`, lesson: "aw03-l01", category: "technical" },
  { id: "aw03-sil", en: "Software in the loop (SIL)", ar: "البرمجيات ضمن الحلقة", definition: md`Testing production code compiled for a host computer against a plant model; can run faster than real time and belongs in CI.`, lesson: "aw03-l01", category: "technical" },
  { id: "aw03-pil", en: "Processor in the loop (PIL)", ar: "المعالج ضمن الحلقة", definition: md`Running the code cross-compiled on the target processor while the plant model runs on a host, to expose compiler, fixed-point and execution-time effects.`, lesson: "aw03-l01", category: "technical" },
  { id: "aw03-hil", en: "Hardware in the loop (HIL)", ar: "العتاد ضمن الحلقة", definition: md`Testing a real controller with production firmware against a plant model computed in hard real time, with emulated sensors, loads, buses and faults.`, lesson: "aw03-l01", category: "technical" },
  { id: "aw03-power-hil", en: "Power hardware in the loop (PHIL)", ar: "العتاد ضمن الحلقة مع تبادل قدرة حقيقية", definition: md`HIL in which a power amplifier or emulator exchanges real power with the device under test, driven by the real-time model.`, lesson: "aw03-l01", category: "technical" },
  { id: "aw03-plant-model", en: "Plant model", ar: "نموذج المنظومة المتحكَّم بها", definition: md`Mathematical model of the physical system a controller acts on, solved in simulation to close the loop.`, lesson: "aw03-l01", category: "technical" },
  { id: "aw03-overrun", en: "Overrun", ar: "تجاوز زمن الخطوة", definition: md`A real-time step that took longer than its step size; any overrun invalidates a HIL run.`, lesson: "aw03-l01", category: "technical" },
  { id: "aw03-rtf", en: "Real-time factor", ar: "معامل الزمن الحقيقي", definition: md`Execution time per step divided by step size; below 1 with margin for HIL, and its inverse is the speed-up in SIL.`, lesson: "aw03-l01", category: "technical" },
  { id: "aw03-dut", en: "Device under test (DUT)", ar: "الجهاز قيد الاختبار", definition: md`The unit being tested: an ECU, inverter, actuator, battery pack or complete machine.`, lesson: "aw03-l01", category: "technical" },
  // l02
  { id: "aw03-fiu", en: "Failure insertion unit (FIU)", ar: "وحدة حقن الأعطال", definition: md`Switch matrix between HIL IO and DUT pins that opens lines or shorts them to ground, supply or another pin on command.`, lesson: "aw03-l02", category: "technical" },
  { id: "aw03-fault-injection", en: "Fault injection", ar: "حقن الأعطال", definition: md`Deliberately creating electrical, bus, sensor, power or timing faults to verify detection and safe reaction.`, lesson: "aw03-l02", category: "technical" },
  { id: "aw03-rest-bus", en: "Rest-bus simulation", ar: "محاكاة بقية الشبكة", definition: md`Simulating the messages of all other ECUs on a network so the DUT sees a complete bus.`, lesson: "aw03-l02", category: "technical" },
  { id: "aw03-asam-xil", en: "ASAM XIL", ar: "معيار ASAM XIL لواجهة أتمتة الاختبار", definition: md`Standard API between test automation software and MIL, SIL and HIL test benches.`, lesson: "aw03-l02", category: "technical" },
  { id: "aw03-utilisation", en: "Rig utilisation", ar: "معدل استغلال منصة الاختبار", definition: md`Executed test hours divided by available hours; the main driver of cost per useful hour.`, lesson: "aw03-l02", category: "financial" },
  // l03
  { id: "aw03-sequencer", en: "Test sequencer", ar: "منفّذ تسلسل الاختبارات", definition: md`Software that runs setup, test steps with limits, cleanup and result recording (for example TestStand, OpenTAP, AutomationDesk).`, lesson: "aw03-l03", category: "technical" },
  { id: "aw03-lease", en: "Resource lease", ar: "حجز مؤقت للموارد", definition: md`Exclusive, time-limited reservation of a rig, DUT or instrument, renewed by heartbeat and released on expiry.`, lesson: "aw03-l03", category: "technical" },
  { id: "aw03-flaky-test", en: "Flaky test", ar: "اختبار متذبذب النتائج", definition: md`A test that can pass and fail on the same device, firmware and configuration.`, lesson: "aw03-l03", category: "technical" },
  { id: "aw03-unattended", en: "Unattended operation", ar: "التشغيل دون حضور مشغّل", definition: md`Running rigs without an operator present, requiring safe states, recovery, alerting and an independent safety chain.`, lesson: "aw03-l03", category: "technical" },
  // l04
  { id: "aw03-ci", en: "Continuous integration (CI)", ar: "التكامل المستمر", definition: md`Automatically building and testing every change; for hardware it extends to flashing and testing on rigs.`, lesson: "aw03-l04", category: "technical" },
  { id: "aw03-gating", en: "Gating (quality gate)", ar: "بوابة الجودة", definition: md`A set of tests a change must pass before it moves to the next stage (merge, nightly, release).`, lesson: "aw03-l04", category: "pm" },
  { id: "aw03-uds", en: "Unified Diagnostic Services (UDS)", ar: "خدمات التشخيص الموحدة", definition: md`ISO 14229 diagnostic protocol, also used to reprogram ECUs over CAN or Ethernet.`, lesson: "aw03-l04", category: "technical" },
  { id: "aw03-queueing", en: "Queueing theory (M/M/c, Erlang C)", ar: "نظرية الطوابير", definition: md`Mathematics of waiting for shared servers; mean wait grows as $\rho/(1-\rho)$ and falls with pooling.`, lesson: "aw03-l04", category: "technical" },
  { id: "aw03-littles-law", en: "Little's law", ar: "قانون ليتل", definition: md`$L = \lambda W$: items in a stable system equal throughput times time in the system.`, lesson: "aw03-l04", category: "technical" },
  // l05
  { id: "aw03-run-record", en: "Run record", ar: "سجل تشغيل الاختبار", definition: md`Structured evidence of one test run: identity, baseline, environment, instruments, procedure, time, verdicts, artefacts and trace links.`, lesson: "aw03-l05", category: "technical" },
  { id: "aw03-baseline", en: "Baseline", ar: "خط الأساس (التكوين المرجعي)", definition: md`The exact configuration tested: firmware, hardware revision, parameters, plant model and rig configuration.`, lesson: "aw03-l05", category: "pm" },
  { id: "aw03-traceability", en: "Traceability", ar: "قابلية التتبع", definition: md`Links from requirements to test cases, runs and defects that let you show which evidence supports which requirement.`, lesson: "aw03-l05", category: "pm" },
  { id: "aw03-suspect-link", en: "Suspect link", ar: "رابط مشكوك فيه", definition: md`Flag a requirements tool sets on linked tests when a requirement changes, marking them for review.`, lesson: "aw03-l05", category: "pm" },
  { id: "aw03-mdf4", en: "MDF4 (ASAM Measurement Data Format)", ar: "صيغة بيانات القياس MDF4", definition: md`Binary standard format for measurement signals from benches and vehicles.`, lesson: "aw03-l05", category: "technical" },
  // l06
  { id: "aw03-approval-gate", en: "Approval gate", ar: "بوابة الموافقة البشرية", definition: md`Recorded human decision required before an agent's plan or action executes.`, lesson: "aw03-l06", category: "pm" },
  { id: "aw03-safety-chain", en: "Safety chain", ar: "سلسلة السلامة", definition: md`Independent hardware safety functions (e-stop, interlocks, safety PLC) that no test software may override.`, lesson: "aw03-l06", category: "technical" },
];

export default glossary;
