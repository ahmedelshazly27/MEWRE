import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  { id: "mz02-iec-61724-1", en: "IEC 61724-1", ar: "المعيار IEC 61724-1 (مراقبة أداء الأنظمة الكهروضوئية)", definition: md`International standard for PV system performance monitoring: sensors, classes, sampling, PR and the soiling ratio. Editions 2017 and 2021.`, lesson: "mz02-l01", category: "technical" },
  { id: "mz02-monitoring-class", en: "Monitoring class", ar: "فئة المراقبة", definition: md`Accuracy level of a monitoring system under IEC 61724-1 (Class A high accuracy for utility plants and guarantees).`, lesson: "mz02-l01", category: "technical" },
  { id: "mz02-soiling-ratio", en: "Soiling ratio (SR)", ar: "نسبة الاتساخ", definition: md`Temperature-corrected output of a naturally soiled reference device divided by that of an identical clean one.`, lesson: "mz02-l01", category: "technical" },
  { id: "mz02-soiling-loss", en: "Soiling loss", ar: "فقد الاتساخ", definition: md`Fraction of clean output lost to dust: $1 - SR$.`, lesson: "mz02-l01", category: "technical" },
  { id: "mz02-soiling-rate", en: "Soiling rate", ar: "معدل الاتساخ", definition: md`Daily decline of the soiling ratio between cleanings, in %/day.`, lesson: "mz02-l01", category: "technical" },
  { id: "mz02-reference-cell", en: "Reference cell", ar: "خلية مرجعية", definition: md`Calibrated PV cell used to measure irradiance or, in pairs, the soiling ratio.`, lesson: "mz02-l01", category: "technical" },
  { id: "mz02-short-circuit-current", en: "Short-circuit current (Isc)", ar: "تيار الدائرة القصيرة", definition: md`Current of a PV device at zero voltage; proportional to irradiance reaching the cells.`, lesson: "mz02-l01", category: "technical" },
  { id: "mz02-solar-noon-window", en: "Solar-noon window", ar: "نافذة الظهيرة الشمسية", definition: md`Data window around solar noon (about ±2 h) used for soiling ratios to limit angle-of-incidence effects.`, lesson: "mz02-l01", category: "technical" },
  { id: "mz02-performance-ratio", en: "Performance ratio (PR)", ar: "نسبة الأداء", definition: md`Final yield divided by reference yield: energy per kWp over POA irradiation in peak-sun hours.`, lesson: "mz02-l02", category: "technical" },
  { id: "mz02-weather-corrected-pr", en: "Weather-corrected PR", ar: "نسبة الأداء المصححة حسب الطقس", definition: md`NREL PR whose expected energy is scaled for the deviation of cell temperature from the irradiance-weighted annual average.`, lesson: "mz02-l02", category: "technical" },
  { id: "mz02-temperature-coefficient", en: "Power temperature coefficient", ar: "معامل الحرارة للقدرة", definition: md`Relative change in module power per kelvin of cell temperature, about -0.30 to -0.45 %/°C.`, lesson: "mz02-l02", category: "technical" },
  { id: "mz02-cell-temperature", en: "Cell temperature", ar: "درجة حرارة الخلية", definition: md`Temperature of the PV cells, a few kelvin above the back-of-module temperature in full sun.`, lesson: "mz02-l02", category: "technical" },
  { id: "mz02-bom-sensor", en: "Back-of-module temperature sensor", ar: "حساس حرارة خلف اللوح", definition: md`Sensor bonded to the module rear surface; converted to cell temperature with a delta T term.`, lesson: "mz02-l02", category: "technical" },
  { id: "mz02-poa-irradiance", en: "Plane-of-array (POA) irradiance", ar: "الإشعاع على مستوى المصفوفة", definition: md`Solar irradiance measured in the plane of the modules, in W/m².`, lesson: "mz02-l02", category: "technical" },
  { id: "mz02-pyranometer", en: "Pyranometer", ar: "مقياس الإشعاع الشمسي الكلي (بيرانومتر)", definition: md`Thermopile instrument measuring broadband hemispherical irradiance, classified by ISO 9060.`, lesson: "mz02-l04", category: "technical" },
  { id: "mz02-optical-soiling-sensor", en: "Optical soiling sensor", ar: "حساس اتساخ بصري", definition: md`Sensor that estimates transmission loss from light scattered by dust on its own window (DustIQ type).`, lesson: "mz02-l03", category: "technical" },
  { id: "mz02-soiling-station", en: "Soiling station", ar: "محطة قياس الاتساخ", definition: md`Pair of clean and soiled reference devices with temperature sensors and a logger.`, lesson: "mz02-l03", category: "technical" },
  { id: "mz02-calibration-offset", en: "Calibration offset (R0)", ar: "إزاحة المعايرة", definition: md`Ratio between two reference devices when both are clean; later ratios are divided by it.`, lesson: "mz02-l03", category: "technical" },
  { id: "mz02-measurement-uncertainty", en: "Measurement uncertainty", ar: "عدم اليقين في القياس", definition: md`Parameter characterising the dispersion of values reasonably attributed to a measured quantity (GUM).`, lesson: "mz02-l03", category: "technical" },
  { id: "mz02-coverage-factor", en: "Coverage factor (k)", ar: "معامل التغطية", definition: md`Multiplier from standard to expanded uncertainty; k = 2 gives about 95 %.`, lesson: "mz02-l03", category: "technical" },
  { id: "mz02-data-filter", en: "Data filter", ar: "مرشح البيانات", definition: md`Rule excluding intervals (low irradiance, clipping, outages, faulty sensors) before computing PR or SR.`, lesson: "mz02-l04", category: "technical" },
  { id: "mz02-clipping", en: "Clipping", ar: "قص القدرة", definition: md`Output limited by the inverter rating rather than by irradiance.`, lesson: "mz02-l04", category: "technical" },
  { id: "mz02-cementation", en: "Cementation", ar: "تصلّب الغبار (التكلّس)", definition: md`Dew-driven bonding of dust to glass that resists dry cleaning.`, lesson: "mz02-l04", category: "technical" },
  { id: "mz02-natural-experiment", en: "Natural experiment", ar: "تجربة طبيعية", definition: md`An unplanned event (such as a cleaning failure) that creates a useful comparison for a study.`, lesson: "mz02-l05", category: "pm" },
  { id: "mz02-measurement-plan", en: "Measurement plan", ar: "خطة القياس", definition: md`Document fixing objectives, metrics, instruments, duration, data handling and analysis before data collection.`, lesson: "mz02-l05", category: "pm" },
  { id: "mz02-data-sharing-agreement", en: "Data-sharing agreement", ar: "اتفاقية مشاركة البيانات", definition: md`Agreement setting ownership, permitted use, confidentiality, retention and publication rights for shared data.`, lesson: "mz02-l05", category: "contractual" },
];

export default glossary;
