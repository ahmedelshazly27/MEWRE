import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "mz09-tag", en: "Tag (point, signal)", ar: "الوسم (نقطة البيانات)", definition: md`One named time series in SCADA or a historian; each stored record has a timestamp, value and quality flag.`, lesson: "mz09-l01", category: "technical" },
  { id: "mz09-quality-flag", en: "Quality flag", ar: "مؤشر جودة البيانات", definition: md`Status attached to each value (good, bad, uncertain, substituted, communication failure) by the driver or historian.`, lesson: "mz09-l01", category: "technical" },
  { id: "mz09-sampling-interval", en: "Sampling interval", ar: "فترة أخذ العيّنات", definition: md`How often a sensor or device value is read.`, lesson: "mz09-l01", category: "technical" },
  { id: "mz09-recording-interval", en: "Recording interval", ar: "فترة التسجيل", definition: md`How often an aggregate (usually the mean of the samples) is stored; Class A monitoring records at 1 minute or faster.`, lesson: "mz09-l01", category: "technical" },
  { id: "mz09-scan-class", en: "Scan class", ar: "فئة المسح (مجموعة الاستطلاع)", definition: md`The SCADA polling group a tag belongs to, which sets how often the driver reads it.`, lesson: "mz09-l01", category: "technical" },
  { id: "mz09-tag-dictionary", en: "Tag dictionary", ar: "قاموس الوسوم", definition: md`Table mapping each tag to its description, device, location, unit, scaling, data type, interval and change history.`, lesson: "mz09-l01", category: "technical" },
  { id: "mz09-kks", en: "KKS / RDS-PP", ar: "نظام ترميز مكونات محطات الطاقة (KKS / RDS-PP)", definition: md`Formal reference designation systems for power plant equipment; RDS-PP is the IEC 81346-based successor of KKS.`, lesson: "mz09-l01", category: "technical" },
  // l02
  { id: "mz09-modbus", en: "Modbus RTU / TCP", ar: "بروتوكول مودبس (التسلسلي وعبر الشبكة)", definition: md`Master-slave register protocol over RS-485 (RTU) or Ethernet port 502 (TCP); 16-bit registers, no timestamps, no security.`, lesson: "mz09-l02", category: "technical" },
  { id: "mz09-register", en: "Holding / input register", ar: "سجل الاحتفاظ / سجل الإدخال", definition: md`16-bit Modbus data words; holding registers are read-write, input registers read-only. Larger values span two registers.`, lesson: "mz09-l02", category: "technical" },
  { id: "mz09-scale-factor", en: "Scale factor", ar: "معامل القياس (مُعامل التدرّج)", definition: md`A power-of-ten exponent stored in a separate register (for example in SunSpec maps) that must be applied to the raw integer value.`, lesson: "mz09-l02", category: "technical" },
  { id: "mz09-opc-ua", en: "OPC UA", ar: "معمارية OPC الموحّدة", definition: md`IEC 62541 interoperability standard with a browseable information model, subscriptions, source timestamps and certificate-based security.`, lesson: "mz09-l02", category: "technical" },
  { id: "mz09-dnp3", en: "DNP3", ar: "بروتوكول الشبكة الموزّعة DNP3", definition: md`IEEE 1815 utility telemetry protocol with buffered, time-stamped events and optional Secure Authentication.`, lesson: "mz09-l02", category: "technical" },
  { id: "mz09-mqtt", en: "MQTT", ar: "بروتوكول MQTT للنشر والاشتراك", definition: md`Lightweight publish-subscribe protocol through a broker; clients connect outbound; QoS 0, 1, 2; TLS on port 8883.`, lesson: "mz09-l02", category: "technical" },
  { id: "mz09-dmz", en: "Demilitarised zone (DMZ)", ar: "المنطقة منزوعة السلاح (المنطقة الوسيطة في الشبكة)", definition: md`Network zone between the plant control network and outside networks, where replicas and gateways sit so outsiders never reach control devices.`, lesson: "mz09-l02", category: "technical" },
  { id: "mz09-data-diode", en: "Unidirectional gateway (data diode)", ar: "بوابة أحادية الاتجاه (صمام البيانات)", definition: md`Hardware that lets data flow out of a network but physically prevents any flow back in.`, lesson: "mz09-l02", category: "technical" },
  // l03
  { id: "mz09-historian", en: "Process historian", ar: "مؤرّخ بيانات العمليات", definition: md`Time-series database for industrial data that collects, compresses, stores for years and serves queries (for example AVEVA PI System).`, lesson: "mz09-l03", category: "technical" },
  { id: "mz09-swinging-door", en: "Swinging-door compression", ar: "ضغط البيانات بطريقة الباب المتأرجح", definition: md`Historian algorithm that archives a point only when a straight line from the last archived point can no longer stay within the compression deviation.`, lesson: "mz09-l03", category: "technical" },
  { id: "mz09-time-weighted-average", en: "Time-weighted average", ar: "المتوسط المرجّح زمنياً", definition: md`Mean of a signal over an interval in which each value is weighted by the time it applies; the correct average of irregular historian data.`, lesson: "mz09-l03", category: "technical" },
  { id: "mz09-asset-framework", en: "Asset Framework (AF)", ar: "إطار الأصول (تسلسل الأصول في المؤرّخ)", definition: md`PI System asset hierarchy and templates that map tags to equipment attributes.`, lesson: "mz09-l03", category: "technical" },
  { id: "mz09-dsa", en: "Data-sharing agreement", ar: "اتفاقية مشاركة البيانات", definition: md`Contract fixing scope, purpose, security, hosting, ownership of derived results, publication rights, retention and deletion of shared data.`, lesson: "mz09-l03", category: "contractual" },
  // l04
  { id: "mz09-edge-gateway", en: "Edge gateway", ar: "البوابة الطرفية", definition: md`Industrial computer at the site that reads data, buffers it during outages (store-and-forward), encrypts it and sends it outbound.`, lesson: "mz09-l04", category: "technical" },
  { id: "mz09-tsdb", en: "Time-series database", ar: "قاعدة بيانات السلاسل الزمنية", definition: md`Database optimised for timestamped data and fast queries on recent periods, used for dashboards and alerts.`, lesson: "mz09-l04", category: "technical" },
  { id: "mz09-parquet", en: "Parquet data lake", ar: "مستودع بيانات بصيغة باركيه", definition: md`Columnar, compressed open-format files on object storage, used as the low-cost system of record for analysis and reprocessing.`, lesson: "mz09-l04", category: "technical" },
  { id: "mz09-data-residency", en: "Data residency", ar: "توطين البيانات (إقامة البيانات)", definition: md`Requirement that data is stored and processed in a given country or on given premises.`, lesson: "mz09-l04", category: "institutional" },
  // l05
  { id: "mz09-stale-value", en: "Stale (frozen) value", ar: "القيمة المتجمّدة (غير المحدّثة)", definition: md`A value repeated unchanged because the source stopped updating, often still flagged good.`, lesson: "mz09-l05", category: "technical" },
  { id: "mz09-interval-convention", en: "Interval-ending / interval-beginning label", ar: "توسيم الفترة بنهايتها أو ببدايتها", definition: md`Whether an average's timestamp marks the end or the start of the interval it covers; a mismatch shifts solar position by one interval.`, lesson: "mz09-l05", category: "technical" },
  { id: "mz09-solar-noon", en: "Solar noon", ar: "الظهر الشمسي", definition: md`Moment the sun crosses the local meridian; used to verify timestamps on clear days.`, lesson: "mz09-l05", category: "technical" },
  { id: "mz09-sensor-drift", en: "Sensor drift", ar: "انحراف الحسّاس", definition: md`Slow change of a sensor's calibration or transmission over time, detected by ratios to co-located sensors.`, lesson: "mz09-l05", category: "technical" },
  { id: "mz09-thermal-derating", en: "Thermal derating", ar: "خفض القدرة بسبب الحرارة", definition: md`Inverter reduction of maximum output at high internal or ambient temperature; a flat top below nameplate.`, lesson: "mz09-l05", category: "technical" },
  { id: "mz09-completeness", en: "Data completeness", ar: "اكتمال البيانات", definition: md`Share of expected (daylight) intervals that hold a valid value.`, lesson: "mz09-l05", category: "technical" },
];

export default glossary;
