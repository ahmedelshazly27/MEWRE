import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "mz06-ppc", en: "Power plant controller (PPC)", ar: "وحدة التحكم في محطة الطاقة", definition: md`Plant-level closed-loop controller that measures at the POI and dispatches P and Q commands to inverters and PCS to meet TSO set-points and grid-code functions.`, lesson: "mz06-l01", category: "technical" },
  { id: "mz06-poi", en: "Point of interconnection (POI)", ar: "نقطة الربط بالشبكة", definition: md`The point where the plant connects to the transmission network and where contractual and grid-code quantities are measured.`, lesson: "mz06-l01", category: "technical" },
  { id: "mz06-setpoint", en: "Set-point", ar: "القيمة المرجعية (نقطة الضبط)", definition: md`Target value (P, Q, V or PF) sent to a controller, for example by the control centre to the PPC.`, lesson: "mz06-l01", category: "technical" },
  { id: "mz06-anti-windup", en: "Anti-windup", ar: "منع تراكم التكامل", definition: md`Logic that stops a PI controller's integral term growing while its output is saturated, preventing overshoot when the limit releases.`, lesson: "mz06-l01", category: "technical" },
  { id: "mz06-ramp-rate", en: "Ramp-rate limit", ar: "حد معدل تغير القدرة", definition: md`Maximum allowed rate of change of active power at the POI, usually in % of rating per minute.`, lesson: "mz06-l01", category: "technical" },
  { id: "mz06-headroom", en: "Frequency-response headroom", ar: "الاحتياطي المتاح لاستجابة التردد", definition: md`Upward power held available (unused BESS power, curtailed PV, spare POI capacity) so the plant can increase output when frequency falls.`, lesson: "mz06-l01", category: "technical" },
  { id: "mz06-qv-slope", en: "Voltage control with slope (Q-V droop)", ar: "التحكم في الجهد بميل (انحدار القدرة غير الفعالة والجهد)", definition: md`Mode in which reactive power is proportional to the voltage error at the POI, $Q = -(V - V_{ref})Q_{max}/s$.`, lesson: "mz06-l01", category: "technical" },
  { id: "mz06-priority-stack", en: "Control priority stack", ar: "تسلسل أولويات التحكم", definition: md`The written ordering of protection, grid-code functions, TSO commands, limits, economic schedules and auxiliary commands that a PPC obeys.`, lesson: "mz06-l01", category: "technical" },
  // l02
  { id: "mz06-ems", en: "Energy management system (EMS)", ar: "نظام إدارة الطاقة", definition: md`Software above the PPC that plans charge, discharge and reserves over minutes to days from forecasts and sends set-points to the PPC.`, lesson: "mz06-l02", category: "technical" },
  { id: "mz06-soc", en: "State of charge (SoC)", ar: "حالة الشحن", definition: md`Stored energy as a fraction of usable capacity, estimated by the BMS and tracked by the EMS.`, lesson: "mz06-l02", category: "technical" },
  { id: "mz06-mpc", en: "Model predictive control (rolling horizon)", ar: "التحكم التنبؤي بالنموذج (الأفق المتجدد)", definition: md`Optimise over a horizon, execute only the first interval, and re-solve with updated forecasts and measurements.`, lesson: "mz06-l02", category: "technical" },
  { id: "mz06-revenue-stacking", en: "Revenue stacking", ar: "تجميع مصادر الإيرادات", definition: md`Earning from several services on one storage asset (shifting, capacity, reserves, ramp support) within its power and energy limits.`, lesson: "mz06-l02", category: "financial" },
  { id: "mz06-nowcast", en: "Nowcast", ar: "التنبؤ الآني (قصير المدى جداً)", definition: md`Forecast for the next minutes to about half an hour from live plant data, sky imagers or satellite.`, lesson: "mz06-l02", category: "technical" },
  // l03
  { id: "mz06-rtu", en: "Remote terminal unit (RTU)", ar: "وحدة طرفية عن بعد", definition: md`Device that collects field data and telemeters it to remote parties such as the control centre, with protocol conversion.`, lesson: "mz06-l03", category: "technical" },
  { id: "mz06-plc", en: "Programmable logic controller (PLC)", ar: "المتحكم المنطقي القابل للبرمجة", definition: md`Industrial controller executing deterministic scan-cycle logic programmed in IEC 61131-3 languages.`, lesson: "mz06-l03", category: "technical" },
  { id: "mz06-historian", en: "Historian", ar: "قاعدة البيانات التاريخية للتشغيل", definition: md`Time-series database storing tag values with timestamps and quality, usually with lossy compression.`, lesson: "mz06-l03", category: "technical" },
  { id: "mz06-hmi", en: "Human-machine interface (HMI)", ar: "واجهة الإنسان والآلة", definition: md`Operator screens for monitoring, trends, alarms and commands.`, lesson: "mz06-l03", category: "technical" },
  { id: "mz06-alarm-flood", en: "Alarm flood", ar: "فيضان الإنذارات", definition: md`More than about 10 alarms in 10 minutes per operator, a condition in which operators can no longer respond to each alarm.`, lesson: "mz06-l03", category: "technical" },
  { id: "mz06-zones-conduits", en: "Zones and conduits", ar: "المناطق والقنوات الأمنية", definition: md`IEC 62443 concept: group assets by security need into zones and control every communication path (conduit) between them.`, lesson: "mz06-l03", category: "technical" },
  { id: "mz06-dmz", en: "Demilitarised zone (OT DMZ)", ar: "المنطقة المعزولة (المنطقة منزوعة السلاح)", definition: md`Buffer network between plant control and external networks; outside parties reach only servers in it.`, lesson: "mz06-l03", category: "technical" },
  { id: "mz06-data-diode", en: "Data diode (one-way gateway)", ar: "صمام البيانات أحادي الاتجاه", definition: md`Hardware that physically allows data to flow in one direction only, out of the plant.`, lesson: "mz06-l03", category: "technical" },
  // l04
  { id: "mz06-icd", en: "Interface control document (ICD)", ar: "وثيقة التحكم في الواجهات", definition: md`Document fixing everything two systems must agree on: link, protocol, data map, scaling, signs, rates, timeouts, failure behaviour, owner.`, lesson: "mz06-l04", category: "technical" },
  { id: "mz06-interface-matrix", en: "Interface responsibility matrix", ar: "مصفوفة مسؤوليات الواجهات", definition: md`Table assigning one owner per interface for design, configuration, testing and defects.`, lesson: "mz06-l04", category: "pm" },
  { id: "mz06-hil", en: "Hardware-in-the-loop (HIL) testing", ar: "الاختبار بوجود العتاد في الحلقة", definition: md`Testing the real controller against a real-time simulation of the plant and grid through its actual interfaces.`, lesson: "mz06-l04", category: "technical" },
  { id: "mz06-p2p", en: "Point-to-point test", ar: "اختبار نقطة إلى نقطة", definition: md`Verification that each signal travels correctly from the field device through SCADA to the HMI and, where listed, to the control centre.`, lesson: "mz06-l04", category: "technical" },
  { id: "mz06-conditions-precedent", en: "Condition precedent", ar: "شرط مسبق (شرط واقف)", definition: md`Contract condition that must be met before an obligation applies, such as receipt of other vendors' ICDs before a delivery date runs.`, lesson: "mz06-l04", category: "contractual" },
  // l05
  { id: "mz06-arr", en: "Annual recurring revenue (ARR)", ar: "الإيرادات السنوية المتكررة", definition: md`Annualised value of subscription contracts; for plant software often price per MW times capacity.`, lesson: "mz06-l05", category: "financial" },
  { id: "mz06-gross-margin", en: "Gross margin", ar: "هامش الربح الإجمالي", definition: md`Revenue minus cost of delivery, divided by revenue; high for software, low to moderate for services and resale.`, lesson: "mz06-l05", category: "financial" },
  { id: "mz06-productised-service", en: "Productised service", ar: "خدمة مُنمذجة كمنتج", definition: md`A repeatable, fixed-scope, fixed-price service built around a product, such as a soiling validation study.`, lesson: "mz06-l05", category: "pm" },
];

export default glossary;
