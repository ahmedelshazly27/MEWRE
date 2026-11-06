import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "mz11-loss-holder", en: "Loss holder", ar: "الطرف المتحمّل للخسارة", definition: md`The party whose cash flow falls because of soiling, as assigned by the PPA, O&M agreement or EPC test.`, lesson: "mz11-l01", category: "contractual" },
  { id: "mz11-offtaker", en: "Offtaker", ar: "المشتري للطاقة (الجهة المتعاقدة على الشراء)", definition: md`The state utility that buys the plant's energy under the PPA (MEWRE in Kuwait, EWEC in Abu Dhabi, SPPC in Saudi Arabia, KAHRAMAA in Qatar).`, lesson: "mz11-l01", category: "institutional" },
  { id: "mz11-project-company", en: "Project company (IPP)", ar: "شركة المشروع (منتج الطاقة المستقل)", definition: md`The special-purpose company that owns a PV plant, signs the PPA and hires the EPC and O&M contractors.`, lesson: "mz11-l01", category: "contractual" },
  { id: "mz11-om-agreement", en: "O&M agreement", ar: "اتفاقية التشغيل والصيانة", definition: md`The contract under which an O&M contractor runs the plant for a fee, typically with availability and sometimes PR guarantees and a cleaning scope.`, lesson: "mz11-l01", category: "contractual" },
  { id: "mz11-asset-manager", en: "Asset manager", ar: "مدير الأصول", definition: md`The owner's role responsible for a plant's or portfolio's revenue, costs and contracts; usually the economic buyer for analytics.`, lesson: "mz11-l01", category: "pm" },
  // l02
  { id: "mz11-capt", en: "Central Agency for Public Tenders (CAPT)", ar: "الجهاز المركزي للمناقصات العامة", definition: md`Kuwait's central procurement agency for public tenders above the direct-contracting limit.`, lesson: "mz11-l02", category: "institutional" },
  { id: "mz11-direct-contracting", en: "Direct contracting", ar: "التعاقد المباشر", definition: md`Purchase by the entity without a CAPT tender, below the limit (KWD 75,000; a reported KWD 1 m per financial year for the same items once Law 94/2026 is in force).`, lesson: "mz11-l02", category: "contractual" },
  { id: "mz11-audit-bureau", en: "State Audit Bureau prior review", ar: "الرقابة المسبقة لديوان المحاسبة", definition: md`Review of public contracts before signature above a reported KWD 100,000 threshold.`, lesson: "mz11-l02", category: "institutional" },
  { id: "mz11-research-agreement", en: "Research collaboration agreement", ar: "اتفاقية تعاون بحثي", definition: md`An agreement for joint research with shared effort, publication and IP terms, without a service fee.`, lesson: "mz11-l02", category: "contractual" },
  { id: "mz11-prior-involvement", en: "Prior involvement", ar: "المشاركة المسبقة (في إعداد المواصفات)", definition: md`A bidder's earlier role in preparing a tender (e.g. drafting the specification), which can disqualify it or invite challenge.`, lesson: "mz11-l02", category: "contractual" },
  // l03
  { id: "mz11-cleaning-archetype", en: "Cleaning archetype", ar: "نمط التنظيف", definition: md`How a plant cleans: daily robots, periodic robotic or semi-automated cycles, or manual or water cleaning.`, lesson: "mz11-l03", category: "technical" },
  { id: "mz11-waterless-robot", en: "Waterless cleaning robot", ar: "روبوت تنظيف دون ماء", definition: md`A row-mounted machine that brushes or blows dust off modules without water, often nightly.`, lesson: "mz11-l03", category: "technical" },
  { id: "mz11-availability-guarantee", en: "Availability guarantee", ar: "ضمان الجاهزية (التوافرية)", definition: md`An O&M commitment that the plant is available a set share of the time, with damages if missed.`, lesson: "mz11-l03", category: "contractual" },
  { id: "mz11-business-case", en: "Business case", ar: "دراسة الجدوى التجارية (حالة العمل)", definition: md`A one-page argument in the buyer's units: KPI, baseline, mechanism, value, cost, risks and pilot.`, lesson: "mz11-l03", category: "financial" },
  // l04
  { id: "mz11-wasta", en: "Wasta", ar: "واسطة", definition: md`Intercession through a well-placed person. Legitimate for access and attention, never for outcomes the rules decide.`, lesson: "mz11-l04", category: "institutional" },
  { id: "mz11-commission-agent", en: "Commission agent", ar: "وكيل بالعمولة", definition: md`An intermediary paid a share of a contract for securing it; reportedly banned in Kuwaiti public procurement under Law 94/2026.`, lesson: "mz11-l04", category: "contractual" },
  { id: "mz11-trust-equation", en: "Trust equation", ar: "معادلة الثقة", definition: md`$T = (C + R + I)/S$: credibility, reliability and intimacy divided by self-orientation.`, lesson: "mz11-l04", category: "pm" },
  { id: "mz11-gifts-register", en: "Gifts and hospitality register", ar: "سجل الهدايا والضيافة", definition: md`A written record of gifts and hospitality given and received, with value limits.`, lesson: "mz11-l04", category: "pm" },
  // l05
  { id: "mz11-back-test", en: "Retrospective back-test", ar: "اختبار رجعي على البيانات التاريخية", definition: md`Running a method on historical data and comparing its output with a reference, with no change to operations.`, lesson: "mz11-l05", category: "technical" },
  { id: "mz11-shadow-mode", en: "Shadow mode", ar: "التشغيل الظلّي", definition: md`Running live and logging recommendations without acting on them, to test out-of-sample accuracy.`, lesson: "mz11-l05", category: "technical" },
  { id: "mz11-term-sheet", en: "Pilot term sheet", ar: "ورقة الشروط الأساسية للتجربة", definition: md`A short document fixing a pilot's parties, scope, data, success criteria, fees, IP, publication and next step.`, lesson: "mz11-l05", category: "contractual" },
  { id: "mz11-background-ip", en: "Background IP", ar: "الملكية الفكرية السابقة", definition: md`Intellectual property each party brings to a collaboration, which it keeps.`, lesson: "mz11-l05", category: "contractual" },
  // l06
  { id: "mz11-per-mwp-pricing", en: "Per-MWp pricing", ar: "التسعير لكل ميغاواط ذروة", definition: md`An annual fee proportional to plant DC capacity, usually with a site minimum and volume tiers.`, lesson: "mz11-l06", category: "financial" },
  { id: "mz11-savings-share", en: "Savings share (gain-share)", ar: "تقاسم الوفورات", definition: md`A fee equal to an agreed share of savings verified against a fixed baseline, with a floor and a cap.`, lesson: "mz11-l06", category: "financial" },
  { id: "mz11-mv", en: "Measurement and verification (M&V)", ar: "القياس والتحقق", definition: md`The agreed method and work needed to compute savings against a baseline, as in IPMVP.`, lesson: "mz11-l06", category: "financial" },
  { id: "mz11-value-capture", en: "Value capture ratio", ar: "نسبة الاستحواذ على القيمة", definition: md`Fee divided by the buyer's annual value from the product.`, lesson: "mz11-l06", category: "financial" },
];

export default glossary;
