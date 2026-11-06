import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "aw10-hazard", en: "Hazard", ar: "مصدر الخطر", definition: md`A potential source of harm, such as a rotating shaft, stored electrical energy or a falling robot.`, lesson: "aw10-l01", category: "technical" },
  { id: "aw10-risk", en: "Risk (safety)", ar: "المخاطرة (في السلامة)", definition: md`Combination of the severity of harm and the probability of its occurrence.`, lesson: "aw10-l01", category: "technical" },
  { id: "aw10-functional-safety", en: "Functional safety", ar: "السلامة الوظيفية", definition: md`The part of overall safety that depends on a control system or equipment operating correctly in response to its inputs, including safe handling of faults.`, lesson: "aw10-l01", category: "technical" },
  { id: "aw10-safety-function", en: "Safety function", ar: "وظيفة السلامة", definition: md`A control function whose failure can immediately increase risk: it detects a condition and reaches or keeps a safe state within a defined reaction time.`, lesson: "aw10-l01", category: "technical" },
  { id: "aw10-systematic-failure", en: "Systematic failure", ar: "عطل منهجي", definition: md`A failure built in by specification, design, software or procedure, which occurs deterministically under certain conditions; controlled by process, not quantified by a failure rate.`, lesson: "aw10-l01", category: "technical" },
  { id: "aw10-diagnostic-coverage", en: "Diagnostic coverage (DC)", ar: "التغطية التشخيصية", definition: md`Fraction of dangerous failures detected by diagnostics: $\text{DC} = \lambda_{DD}/\lambda_D$.`, lesson: "aw10-l01", category: "technical" },
  { id: "aw10-fit", en: "FIT (failures in time)", ar: "معدل الأعطال لكل مليار ساعة", definition: md`Failure-rate unit: one failure per $10^9$ device hours.`, lesson: "aw10-l01", category: "technical" },
  // l02
  { id: "aw10-performance-level", en: "Performance Level (PL)", ar: "مستوى الأداء", definition: md`ISO 13849-1 measure of a safety function's ability to perform under foreseeable conditions, PL a to PL e, defined by PFH bands.`, lesson: "aw10-l02", category: "technical" },
  { id: "aw10-sil", en: "Safety Integrity Level (SIL)", ar: "مستوى سلامة التكامل", definition: md`IEC 61508 and IEC 62061 integrity level from SIL 1 to SIL 4, defined by PFH (high demand) or PFDavg (low demand) bands plus systematic and architectural requirements.`, lesson: "aw10-l02", category: "technical" },
  { id: "aw10-mttfd", en: "MTTFd", ar: "متوسط الزمن حتى العطل الخطِر", definition: md`Mean time to dangerous failure, in years, per channel; from $B_{10D}$ for wearing parts.`, lesson: "aw10-l02", category: "technical" },
  { id: "aw10-ccf", en: "Common cause failure (CCF)", ar: "عطل السبب المشترك", definition: md`Failure of several channels from a single cause (shared supply, environment, design); scored in ISO 13849-1, modelled with the beta factor in IEC 61508.`, lesson: "aw10-l02", category: "technical" },
  { id: "aw10-pfh", en: "PFH", ar: "احتمال العطل الخطِر في الساعة", definition: md`Average frequency of dangerous failure per hour of a safety function in high-demand or continuous mode.`, lesson: "aw10-l02", category: "technical" },
  { id: "aw10-pfd", en: "PFDavg", ar: "متوسط احتمال العطل عند الطلب", definition: md`Average probability that a low-demand safety function fails to perform when demanded.`, lesson: "aw10-l02", category: "technical" },
  { id: "aw10-hft", en: "Hardware fault tolerance (HFT)", ar: "تحمّل الأعطال في العتاد", definition: md`Number of hardware faults a subsystem can tolerate without losing the safety function (1oo2 has HFT 1).`, lesson: "aw10-l02", category: "technical" },
  // l03
  { id: "aw10-collaborative-application", en: "Collaborative application", ar: "تطبيق تعاوني", definition: md`A robot application in which people and the robot share a space during operation, using monitored stop, hand guiding, speed and separation monitoring or power and force limiting.`, lesson: "aw10-l03", category: "technical" },
  { id: "aw10-pfl", en: "Power and force limiting (PFL)", ar: "تحديد القدرة والقوة", definition: md`Collaborative mode where contact may occur but forces and pressures stay below body-region limits.`, lesson: "aw10-l03", category: "technical" },
  { id: "aw10-sto", en: "Safe torque off (STO)", ar: "الإيقاف الآمن لعزم الدوران", definition: md`Drive safety function that removes the energy that produces torque in the motor; corresponds to a stop category 0.`, lesson: "aw10-l03", category: "technical" },
  { id: "aw10-ssm", en: "Speed and separation monitoring (SSM)", ar: "مراقبة السرعة والمسافة الفاصلة", definition: md`Collaborative mode in which the robot slows and stops to keep at least the protective separation distance from a person.`, lesson: "aw10-l03", category: "technical" },
  { id: "aw10-dynamically-stable", en: "Dynamically stable robot", ar: "روبوت مستقر ديناميكياً", definition: md`A robot that stays upright through active control (legged, humanoid, self-balancing) and therefore falls if power is removed; scope of draft ISO 25785-1.`, lesson: "aw10-l03", category: "technical" },
  // l04
  { id: "aw10-asil", en: "ASIL", ar: "مستوى سلامة السيارات المتكامل", definition: md`Automotive Safety Integrity Level from ISO 26262, QM and A to D, assigned from severity, exposure and controllability.`, lesson: "aw10-l04", category: "technical" },
  { id: "aw10-sotif", en: "SOTIF", ar: "سلامة الوظيفة المقصودة", definition: md`Safety of the intended functionality (ISO 21448): absence of unreasonable risk from functional insufficiencies when nothing has failed.`, lesson: "aw10-l04", category: "technical" },
  { id: "aw10-triggering-condition", en: "Triggering condition", ar: "حالة محفِّزة", definition: md`A specific condition (lighting, weather, object, human action) that exposes a functional insufficiency and can lead to hazardous behaviour.`, lesson: "aw10-l04", category: "technical" },
  { id: "aw10-tcl", en: "Tool confidence level (TCL)", ar: "مستوى الثقة في الأداة", definition: md`ISO 26262-8 class (TCL1 to TCL3) from tool impact and tool error detection; TCL2 and TCL3 tools need qualification.`, lesson: "aw10-l04", category: "technical" },
  { id: "aw10-v-model", en: "V-model", ar: "نموذج V", definition: md`Development model where specification and design descend on the left and matching verification and validation activities ascend on the right.`, lesson: "aw10-l04", category: "pm" },
  // l05
  { id: "aw10-safety-case", en: "Safety case", ar: "ملف حجة السلامة", definition: md`A structured argument, supported by evidence, that a system is acceptably safe for a given application in a given environment.`, lesson: "aw10-l05", category: "technical" },
  { id: "aw10-gsn", en: "Goal Structuring Notation (GSN)", ar: "ترميز هيكلة الأهداف", definition: md`Graphical notation for safety and assurance arguments: goals, strategies, solutions, context, assumptions and justifications.`, lesson: "aw10-l05", category: "technical" },
  { id: "aw10-assurance-deficit", en: "Assurance deficit", ar: "عجز في الضمان", definition: md`Gap between the confidence an argument needs and what its evidence provides.`, lesson: "aw10-l05", category: "technical" },
  // l06
  { id: "aw10-fault-injection", en: "Fault injection", ar: "حقن الأعطال", definition: md`Deliberately introducing faults into hardware or software to verify that diagnostics detect them and the system reaches a safe state.`, lesson: "aw10-l06", category: "technical" },
  { id: "aw10-calibration-traceability", en: "Calibration traceability", ar: "إمكانية تتبّع المعايرة", definition: md`An unbroken chain of calibrations linking an instrument's readings to national standards, typically via ISO/IEC 17025 accredited laboratories.`, lesson: "aw10-l06", category: "technical" },
  { id: "aw10-underwriting", en: "Underwriting", ar: "الاكتتاب التأميني", definition: md`An insurer's assessment and pricing of a risk before accepting it; depends on loss history and risk information.`, lesson: "aw10-l06", category: "financial" },
];

export default glossary;
