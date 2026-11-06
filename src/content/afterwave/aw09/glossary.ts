import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "aw09-dynamometer", en: "Dynamometer (dyno)", ar: "مقياس القدرة (الدينامومتر)", definition: md`Machine that loads a rotating device under test in a controlled way and measures torque and speed.`, lesson: "aw09-l01", category: "technical" },
  { id: "aw09-dut", en: "Device under test (DUT)", ar: "الجهاز قيد الاختبار", definition: md`The motor, actuator, drive unit, battery or other item a rig tests.`, lesson: "aw09-l01", category: "technical" },
  { id: "aw09-four-quadrant", en: "Four-quadrant operation", ar: "التشغيل في الأرباع الأربعة", definition: md`Operation with torque and speed each positive or negative: motoring in quadrants 1 and 3, braking or regenerating in 2 and 4.`, lesson: "aw09-l01", category: "technical" },
  { id: "aw09-absorber", en: "Absorber (brake dyno)", ar: "ممتص القدرة (مكبح)", definition: md`Dyno that can only absorb power (eddy-current, hysteresis, water brake); cannot drive the DUT.`, lesson: "aw09-l01", category: "technical" },
  { id: "aw09-reflected-inertia", en: "Reflected inertia", ar: "العطالة المنعكسة", definition: md`Inertia as seen through a gear ratio: $N^2$ times the inertia on the fast side.`, lesson: "aw09-l01", category: "technical" },
  { id: "aw09-torque-transducer", en: "Torque transducer", ar: "محول قياس العزم", definition: md`Strain-gauge sensor in the shaft line that measures transmitted torque; flange or shaft type.`, lesson: "aw09-l01", category: "technical" },
  { id: "aw09-regeneration", en: "Regeneration", ar: "استرجاع الطاقة", definition: md`Returning absorbed mechanical power as electrical power to a DC bus or the grid.`, lesson: "aw09-l01", category: "technical" },
  // l02
  { id: "aw09-strain-gauge", en: "Strain gauge", ar: "مقياس الانفعال", definition: md`Resistive foil whose resistance changes with strain: $\Delta R/R = GF\,\varepsilon$.`, lesson: "aw09-l02", category: "technical" },
  { id: "aw09-wheatstone-bridge", en: "Wheatstone bridge", ar: "قنطرة ويتستون", definition: md`Four-arm resistive circuit whose output is proportional to the imbalance caused by strain, ratiometric to excitation.`, lesson: "aw09-l02", category: "technical" },
  { id: "aw09-accuracy-class", en: "Accuracy class", ar: "فئة الدقة", definition: md`Vendor or standard figure bounding a sensor's main errors, as a percentage of full scale or reading; check the definition.`, lesson: "aw09-l02", category: "technical" },
  { id: "aw09-measurement-uncertainty", en: "Measurement uncertainty", ar: "عدم اليقين في القياس", definition: md`Parameter characterising the dispersion of values reasonably attributable to the measurand; reported as an expanded uncertainty with coverage factor.`, lesson: "aw09-l02", category: "technical" },
  { id: "aw09-coverage-factor", en: "Coverage factor (k)", ar: "معامل التغطية", definition: md`Multiplier from combined standard to expanded uncertainty; $k = 2$ gives about 95 % coverage.`, lesson: "aw09-l02", category: "technical" },
  // l03
  { id: "aw09-climatic-chamber", en: "Climatic chamber", ar: "غرفة المناخ (حجرة الاختبار البيئي)", definition: md`Enclosure that controls air temperature and often humidity around a DUT.`, lesson: "aw09-l03", category: "technical" },
  { id: "aw09-soak-time", en: "Soak (dwell) time", ar: "زمن التثبيت الحراري", definition: md`Time a part is held until it stabilises at the setpoint: $\tau \ln(\Delta T_0/\delta)$.`, lesson: "aw09-l03", category: "technical" },
  { id: "aw09-dew-point", en: "Dew point", ar: "نقطة الندى", definition: md`Temperature below which water vapour in the air condenses on a surface.`, lesson: "aw09-l03", category: "technical" },
  { id: "aw09-psd", en: "Power spectral density (PSD)", ar: "الكثافة الطيفية للقدرة", definition: md`Distribution of mean-square vibration over frequency, in g²/Hz; its area is $g_{\text{rms}}^2$.`, lesson: "aw09-l03", category: "technical" },
  // l04
  { id: "aw09-traceability", en: "Metrological traceability", ar: "التتبع المترولوجي", definition: md`Relation of a result to a reference through a documented unbroken chain of calibrations, each contributing to uncertainty.`, lesson: "aw09-l04", category: "technical" },
  { id: "aw09-calibration", en: "Calibration", ar: "المعايرة", definition: md`Establishing the relation between an instrument's indications and reference values, with uncertainty; distinct from adjustment.`, lesson: "aw09-l04", category: "technical" },
  { id: "aw09-accreditation", en: "Accreditation (ISO/IEC 17025)", ar: "الاعتماد (أيزو/آي إي سي 17025)", definition: md`Formal recognition by a national body that a lab is competent for a defined scope of tests or calibrations.`, lesson: "aw09-l04", category: "institutional" },
  { id: "aw09-guard-band", en: "Guard band", ar: "نطاق الحماية (هامش القبول)", definition: md`Reduction of an acceptance limit by a multiple of measurement uncertainty to limit the risk of false acceptance.`, lesson: "aw09-l04", category: "technical" },
  { id: "aw09-as-found", en: "As-found / as-left data", ar: "بيانات الحالة قبل الضبط وبعده", definition: md`Calibration results before and after any adjustment; as-found shows whether past results were valid.`, lesson: "aw09-l04", category: "technical" },
  // l05
  { id: "aw09-interlock", en: "Interlocking guard", ar: "واقٍ معشق (حاجز بقفل أمان)", definition: md`Movable guard whose opening stops the hazardous function; with guard locking it stays shut until the hazard has ceased.`, lesson: "aw09-l05", category: "technical" },
  { id: "aw09-sto", en: "Safe torque off (STO)", ar: "إيقاف العزم الآمن", definition: md`Drive safety function that prevents the motor from producing torque (IEC 61800-5-2).`, lesson: "aw09-l05", category: "technical" },
  { id: "aw09-performance-level", en: "Performance level (PL)", ar: "مستوى الأداء", definition: md`ISO 13849-1 measure (a to e) of a safety function's ability to perform under foreseeable conditions.`, lesson: "aw09-l05", category: "technical" },
  { id: "aw09-safety-plc", en: "Safety PLC", ar: "وحدة تحكم منطقية مبرمجة للسلامة", definition: md`Redundant, self-monitoring controller certified for safety functions, separate from standard automation.`, lesson: "aw09-l05", category: "technical" },
  // l06
  { id: "aw09-utilisation", en: "Utilisation", ar: "معدل الاستغلال", definition: md`Share of available rig hours that are sold (billable).`, lesson: "aw09-l06", category: "financial" },
  { id: "aw09-taas", en: "Test-as-a-service", ar: "الاختبار كخدمة", definition: md`Business model selling test hours or campaigns on rigs the provider owns and operates.`, lesson: "aw09-l06", category: "financial" },
  { id: "aw09-breakeven-utilisation", en: "Breakeven utilisation", ar: "معدل الاستغلال عند نقطة التعادل", definition: md`Utilisation at which contribution covers fixed costs and depreciation.`, lesson: "aw09-l06", category: "financial" },
  // l07
  { id: "aw09-go-no-go", en: "Go/no-go decision", ar: "قرار المضي أو التوقف", definition: md`A gated decision with explicit kill criteria and scoring, revisited when defined triggers fire.`, lesson: "aw09-l07", category: "pm" },
];

export default glossary;
