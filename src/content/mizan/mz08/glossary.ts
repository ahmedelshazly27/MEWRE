import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "mz08-poi-energy", en: "Energy at the POI", ar: "الطاقة عند نقطة الربط", definition: md`MWh delivered at the point of interconnection meter per discharge, after all losses and auxiliaries; what buyers contract and pay for.`, lesson: "mz08-l01", category: "technical" },
  { id: "mz08-dc-nameplate", en: "DC nameplate energy", ar: "السعة الاسمية على جانب التيار المستمر", definition: md`Sum of the rated energy of installed battery containers at beginning of life; about 1.24 times the POI energy for a plant with augmentation.`, lesson: "mz08-l01", category: "technical" },
  { id: "mz08-duration", en: "Duration", ar: "مدة التفريغ", definition: md`Hours a BESS can discharge at rated power: $h = E/P$. Evening shifting in Kuwait needs about 4 h.`, lesson: "mz08-l01", category: "technical" },
  { id: "mz08-c-rate", en: "C-rate", ar: "معدل الشحن والتفريغ (معدل C)", definition: md`Power over energy, the inverse of duration: 0.25C is a 4-hour system. State the boundary.`, lesson: "mz08-l01", category: "technical" },
  { id: "mz08-rte-poi", en: "Round-trip efficiency at the POI", ar: "كفاءة الدورة الكاملة عند نقطة الربط", definition: md`Energy delivered over energy drawn, both at the POI meter with auxiliaries included; about 84 to 88 % in a Gulf summer versus 92 to 95 % at DC.`, lesson: "mz08-l01", category: "technical" },
  { id: "mz08-soh-floor", en: "State-of-health floor", ar: "الحد الأدنى لحالة صحة البطارية", definition: md`The SoH below which the fleet must not fall before augmentation; 0.90 is a common sizing basis.`, lesson: "mz08-l01", category: "technical" },
  { id: "mz08-augmentation", en: "Augmentation", ar: "التعزيز (إضافة سعة تخزين)", definition: md`Adding battery capacity during operation to keep the contracted MWh as cells fade; needs space, PCS headroom and contract terms planned from day one.`, lesson: "mz08-l01", category: "technical" },
  { id: "mz08-overbuild", en: "Overbuild", ar: "زيادة السعة المركبة مسبقًا", definition: md`Installing all the fade margin on day one instead of augmenting later; higher upfront capex, simpler operation.`, lesson: "mz08-l01", category: "technical" },
  // l02
  { id: "mz08-dc-block", en: "DC block", ar: "حاوية البطاريات (وحدة التيار المستمر)", definition: md`Factory-built container of racks with BMS, liquid cooling and fire systems, about 5 to 6+ MWh; the largest hardware item in a BESS.`, lesson: "mz08-l02", category: "technical" },
  { id: "mz08-turnkey", en: "Turnkey supply", ar: "التوريد المتكامل (تسليم المفتاح)", definition: md`Supply of a complete working plant (DC blocks, PCS, EMS, balance of plant, EPC) under one contract and one set of guarantees.`, lesson: "mz08-l02", category: "contractual" },
  { id: "mz08-ltsa", en: "Long-term service agreement (LTSA)", ar: "اتفاقية الخدمة طويلة الأجل", definition: md`Multi-year service contract under which the supplier maintains the plant and guarantees capacity and availability, usually by augmenting.`, lesson: "mz08-l02", category: "contractual" },
  { id: "mz08-commercial-agent", en: "Commercial agent", ar: "الوكيل التجاري", definition: md`Local party representing a foreign supplier in Kuwait for a commission or margin, registered under the Commercial Agencies Law; terms to confirm with counsel.`, lesson: "mz08-l02", category: "institutional" },
  { id: "mz08-teaming-agreement", en: "Teaming agreement", ar: "اتفاقية التعاون لتقديم العطاء", definition: md`Pre-bid agreement between a bidder and partners defining roles, exclusivity and work share if the bid wins.`, lesson: "mz08-l02", category: "contractual" },
  // l03
  { id: "mz08-supplier-tier", en: "Supplier tier", ar: "فئة المورد", definition: md`Grouping of BESS suppliers by control of the cell and balance sheet: cell makers with systems, integrators buying cells, assemblers.`, lesson: "mz08-l03", category: "technical" },
  { id: "mz08-capacity-warranty", en: "Capacity-retention warranty", ar: "ضمان الاحتفاظ بالسعة", definition: md`Promise that capacity stays above a share of BOL for a term or a throughput cap (years or EFC, whichever first), subject to operating conditions.`, lesson: "mz08-l03", category: "contractual" },
  { id: "mz08-efc-cap", en: "Throughput cap (EFC cap)", ar: "الحد الأقصى للدورات الكاملة المكافئة", definition: md`Maximum equivalent full cycles covered by a warranty; at more than one cycle a day it ends the warranty before its stated years.`, lesson: "mz08-l03", category: "contractual" },
  { id: "mz08-change-of-cell", en: "Change-of-cell clause", ar: "بند تغيير الخلايا", definition: md`Contract clause fixing the cell maker and model and requiring buyer approval for any substitution.`, lesson: "mz08-l03", category: "contractual" },
  { id: "mz08-ul9540a", en: "UL 9540A", ar: "معيار UL 9540A لاختبار انتشار الانفلات الحراري", definition: md`Test method for thermal-runaway fire propagation at cell, module, unit and installation level; reports must match the exact product offered.`, lesson: "mz08-l03", category: "technical" },
  { id: "mz08-pcs-derating", en: "PCS thermal derating", ar: "خفض قدرة المحول بسبب الحرارة", definition: md`Reduction of inverter apparent power above a knee temperature (often 40 to 45 °C); sets the unit count at 50 °C.`, lesson: "mz08-l03", category: "technical" },
  { id: "mz08-aux-load", en: "Auxiliary load", ar: "الأحمال المساعدة", definition: md`HVAC, chillers, BMS and fire-system power; in a Gulf summer several percent of delivered energy, all day.`, lesson: "mz08-l03", category: "technical" },
  // l04
  { id: "mz08-data-rights", en: "Owner data rights", ar: "حقوق المالك في البيانات", definition: md`Contract terms giving the owner access to rack- or cell-level BMS, PCS and HVAC data and allowing third-party analysis without affecting the warranty.`, lesson: "mz08-l04", category: "contractual" },
  { id: "mz08-deferral", en: "Augmentation deferral", ar: "تأجيل التعزيز", definition: md`Postponing an augmentation tranche because measured fade is slower than the model; worth the time value of money plus expected price decline.`, lesson: "mz08-l04", category: "financial" },
  { id: "mz08-coil-fouling", en: "Condenser coil fouling", ar: "انسداد ملفات المكثف بالغبار", definition: md`Dust build-up on HVAC condenser coils and filters that raises auxiliary energy; the battery-side twin of PV soiling.`, lesson: "mz08-l04", category: "technical" },
];

export default glossary;
