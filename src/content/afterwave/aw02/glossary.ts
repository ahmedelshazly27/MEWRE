import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "aw02-daq", en: "Data acquisition (DAQ)", ar: "اكتساب البيانات", definition: md`Hardware and software that condition, sample, digitise, timestamp and store signals from sensors.`, lesson: "aw02-l01", category: "technical" },
  { id: "aw02-transducer", en: "Transducer", ar: "محوِّل الطاقة (المحوِّل القياسي)", definition: md`Device that converts a physical quantity (force, temperature, current) into an electrical signal.`, lesson: "aw02-l01", category: "technical" },
  { id: "aw02-signal-conditioning", en: "Signal conditioning", ar: "تهيئة الإشارة", definition: md`Excitation, amplification, isolation, filtering and compensation applied between the sensor and the ADC.`, lesson: "aw02-l01", category: "technical" },
  { id: "aw02-wheatstone-bridge", en: "Wheatstone bridge", ar: "قنطرة ويتستون", definition: md`Four-arm resistor network that turns a small resistance change into a differential voltage proportional to excitation; used in strain gauges, load cells and torque sensors.`, lesson: "aw02-l01", category: "technical" },
  { id: "aw02-load-cell", en: "Load cell", ar: "خلية الحمل", definition: md`Force transducer with an internal strain-gauge bridge, rated in mV/V at rated capacity.`, lesson: "aw02-l01", category: "technical" },
  { id: "aw02-thermocouple", en: "Thermocouple", ar: "المزدوجة الحرارية", definition: md`Junction of two dissimilar metals producing a voltage proportional to the temperature difference to a reference junction (Seebeck effect); needs cold-junction compensation.`, lesson: "aw02-l01", category: "technical" },
  { id: "aw02-rtd", en: "Resistance temperature detector (RTD)", ar: "كاشف درجة الحرارة المقاوِم", definition: md`Platinum resistor whose resistance rises with temperature (Pt100: 100 $\Omega$ at 0 °C, about 0.385 $\Omega$/°C); wired 2, 3 or 4-wire.`, lesson: "aw02-l01", category: "technical" },
  { id: "aw02-shunt", en: "Shunt resistor", ar: "مقاومة التحويل (الشنت)", definition: md`Low, precisely known resistance in the current path; current is computed from the voltage across it.`, lesson: "aw02-l01", category: "technical" },
  { id: "aw02-ground-loop", en: "Ground loop", ar: "حلقة التأريض", definition: md`Unwanted current path created when equipment is grounded at points of different potential, adding interference (often at mains frequency) to measurements.`, lesson: "aw02-l01", category: "technical" },
  // l02
  { id: "aw02-nyquist", en: "Nyquist frequency", ar: "تردد نايكوِست", definition: md`Half the sample rate; components above it alias.`, lesson: "aw02-l02", category: "technical" },
  { id: "aw02-aliasing", en: "Aliasing", ar: "التعرّج (الطيّ الترددي)", definition: md`Appearance of frequencies above $f_s/2$ as false lower frequencies after sampling; irreversible.`, lesson: "aw02-l02", category: "technical" },
  { id: "aw02-anti-alias", en: "Anti-aliasing filter", ar: "مرشِّح منع التعرّج", definition: md`Low-pass filter applied before sampling (analog, or digital inside a delta-sigma ADC before decimation) to remove content above the Nyquist frequency.`, lesson: "aw02-l02", category: "technical" },
  { id: "aw02-adc", en: "Analog-to-digital converter (ADC)", ar: "محوِّل تناظري رقمي", definition: md`Circuit that samples a voltage and quantises it into one of $2^N$ codes.`, lesson: "aw02-l02", category: "technical" },
  { id: "aw02-enob", en: "Effective number of bits (ENOB)", ar: "العدد الفعلي للبتّات", definition: md`Resolution actually achieved, from measured SINAD: $(\mathrm{SINAD} - 1.76)/6.02$.`, lesson: "aw02-l02", category: "technical" },
  { id: "aw02-dynamic-range", en: "Dynamic range", ar: "المدى الديناميكي", definition: md`Ratio of the largest to the smallest measurable signal in one range setting, in dB.`, lesson: "aw02-l02", category: "technical" },
  { id: "aw02-delta-sigma", en: "Delta-sigma ADC", ar: "محوِّل دلتا سيغما", definition: md`Oversampling converter with a digital filter and decimation; excellent alias rejection and resolution, with group delay.`, lesson: "aw02-l02", category: "technical" },
  // l03
  { id: "aw02-clock-drift", en: "Clock drift", ar: "انجراف الساعة", definition: md`Rate difference between two clocks, in ppm; 1 ppm accumulates 3.6 ms per hour.`, lesson: "aw02-l03", category: "technical" },
  { id: "aw02-jitter", en: "Timestamp jitter", ar: "الارتعاش الزمني للطوابع الزمنية", definition: md`Random scatter of timestamps around the true event time.`, lesson: "aw02-l03", category: "technical" },
  { id: "aw02-ptp", en: "Precision Time Protocol (PTP, IEEE 1588)", ar: "بروتوكول التوقيت الدقيق", definition: md`Network protocol that synchronises follower clocks to a grandmaster from four timestamps; sub-microsecond with hardware timestamping.`, lesson: "aw02-l03", category: "technical" },
  { id: "aw02-pps", en: "Pulse per second (PPS)", ar: "نبضة كل ثانية", definition: md`Electrical pulse from a GNSS receiver aligned to the start of each UTC second, typically within tens of nanoseconds.`, lesson: "aw02-l03", category: "technical" },
  { id: "aw02-monotonic-clock", en: "Monotonic clock", ar: "الساعة الرتيبة (المتزايدة دائماً)", definition: md`Operating-system clock that only moves forward and is never stepped; the right base for intervals and ordering.`, lesson: "aw02-l03", category: "technical" },
  // l04
  { id: "aw02-mdf4", en: "ASAM MDF4", ar: "صيغة بيانات القياس MDF4", definition: md`ASAM-standardised binary measurement data format with channel groups, master channels, conversion rules and metadata.`, lesson: "aw02-l04", category: "technical" },
  { id: "aw02-tdms", en: "NI TDMS", ar: "صيغة ملفات TDMS", definition: md`National Instruments streaming file format with a file, group, channel hierarchy and properties.`, lesson: "aw02-l04", category: "technical" },
  { id: "aw02-parquet", en: "Apache Parquet", ar: "صيغة باركيه العمودية", definition: md`Open columnar file format with row groups, per-column encoding and compression, and statistics for skipping data.`, lesson: "aw02-l04", category: "technical" },
  // l05
  { id: "aw02-event-log", en: "Event log", ar: "سجل الأحداث", definition: md`Irregular, timestamped records of discrete occurrences: operator actions, test steps, state changes, alarms.`, lesson: "aw02-l05", category: "technical" },
  { id: "aw02-as-of-join", en: "As-of join", ar: "الربط حسب آخر قيمة سابقة", definition: md`Join that attaches to each record the latest record from another table at or before its timestamp.`, lesson: "aw02-l05", category: "technical" },
  // l06
  { id: "aw02-traceability", en: "Metrological traceability", ar: "التتبّع المترولوجي", definition: md`Unbroken chain of calibrations with stated uncertainties linking a measurement to SI units.`, lesson: "aw02-l06", category: "technical" },
  { id: "aw02-uncertainty", en: "Measurement uncertainty", ar: "عدم اليقين في القياس", definition: md`Parameter characterising the dispersion of values reasonably attributed to the measurand; reported as expanded uncertainty $U = k u_c$.`, lesson: "aw02-l06", category: "technical" },
  { id: "aw02-provenance", en: "Data provenance (lineage)", ar: "مصدر البيانات وتسلسل نشأتها", definition: md`Record of which sources, processes, versions and people produced a piece of data.`, lesson: "aw02-l06", category: "technical" },
  { id: "aw02-checksum", en: "Checksum (cryptographic hash)", ar: "المجموع الاختباري (البصمة التشفيرية)", definition: md`Fixed-length fingerprint of a file (for example SHA-256) that changes if any bit changes; proves integrity.`, lesson: "aw02-l06", category: "technical" },
];

export default glossary;
