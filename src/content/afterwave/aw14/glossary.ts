import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "aw14-value-metric", en: "Value metric", ar: "مقياس القيمة (وحدة التسعير)", definition: md`The unit a price scales with (rig, seat, GB, analysed change); it should grow with customer value and not penalise the behaviour the product needs.`, lesson: "aw14-l01", category: "financial" },
  { id: "aw14-acv", en: "Annual contract value (ACV)", ar: "القيمة السنوية للعقد", definition: md`Recurring contract value per year, excluding one-off fees such as deployment or pilots.`, lesson: "aw14-l01", category: "financial" },
  { id: "aw14-platform-fee", en: "Platform fee", ar: "رسوم المنصة", definition: md`Fixed annual fee per site or Enclave instance that covers cost to serve that does not scale with rigs.`, lesson: "aw14-l01", category: "financial" },
  { id: "aw14-capture-ratio", en: "Value capture ratio", ar: "نسبة استحواذ القيمة", definition: md`Price divided by quantified annual customer value; 10 to 25 % is defensible for a new category.`, lesson: "aw14-l01", category: "financial" },
  { id: "aw14-cost-to-serve", en: "Cost to serve", ar: "تكلفة خدمة العميل", definition: md`Support, upgrades, deployment and (when hosted) infrastructure cost of delivering the product to one customer.`, lesson: "aw14-l01", category: "financial" },
  { id: "aw14-term-licence", en: "Term licence (on-prem subscription)", ar: "ترخيص محدد المدة (اشتراك محلي)", definition: md`On-prem software licensed for a fixed term with mandatory support and upgrades, so revenue recurs; the alternative to a perpetual licence.`, lesson: "aw14-l01", category: "contractual" },
  { id: "aw14-paid-pilot", en: "Paid pilot", ar: "تجربة تشغيلية مدفوعة", definition: md`Fixed-fee, time-boxed trial with written success metrics; the fee is credited against year 1 if the customer converts.`, lesson: "aw14-l01", category: "contractual" },
  // l02
  { id: "aw14-landed-cost", en: "Landed cost", ar: "التكلفة الواصلة", definition: md`BOM plus assembly, calibration, freight, import duty, installation and warranty provision: the basis for hardware pricing.`, lesson: "aw14-l02", category: "financial" },
  { id: "aw14-taas", en: "Test-as-a-service (TaaS)", ar: "الاختبار كخدمة", definition: md`Afterwave operates the rig and sells test hours or fixed-price test campaigns, carrying the utilisation risk.`, lesson: "aw14-l02", category: "pm" },
  { id: "aw14-utilisation", en: "Utilisation", ar: "معدل الاستغلال", definition: md`Billable hours divided by available hours; the dominant lever in test-hour economics.`, lesson: "aw14-l02", category: "technical" },
  { id: "aw14-breakeven-utilisation", en: "Breakeven utilisation", ar: "معدل الاستغلال عند نقطة التعادل", definition: md`$U^* = (C_{cap}/L + C_{fix})/(H_{av}(p - c_v))$: the utilisation at which a rig's operating result is zero.`, lesson: "aw14-l02", category: "financial" },
  { id: "aw14-nre", en: "Non-recurring engineering (NRE)", ar: "تكاليف هندسية غير متكررة", definition: md`One-off engineering charged separately, for example fixtures and adapters for a customer's device under test.`, lesson: "aw14-l02", category: "contractual" },
  { id: "aw14-dut", en: "Device under test (DUT)", ar: "الجهاز قيد الاختبار", definition: md`The customer's actuator, drive or system being tested; contracts must say who insures it.`, lesson: "aw14-l02", category: "technical" },
  { id: "aw14-deidentified-data", en: "De-identified derived data", ar: "بيانات مشتقة مجهولة الهوية", definition: md`Statistics and signatures derived from test data that cannot be linked to the customer or device; the layer Afterwave negotiates a licence to learn from.`, lesson: "aw14-l02", category: "contractual" },
  // l03
  { id: "aw14-yc-deal", en: "YC standard deal", ar: "صفقة واي كومبينيتور القياسية", definition: md`USD 125k for 7 % on a post-money SAFE plus USD 375k on an uncapped MFN SAFE (reported for 2026), with pro rata rights.`, lesson: "aw14-l03", category: "financial" },
  { id: "aw14-mfn-safe", en: "Uncapped MFN SAFE", ar: "اتفاقية SAFE بلا سقف مع شرط الدولة الأولى بالرعاية", definition: md`A SAFE with no cap that adopts the best terms of a later SAFE or converts at the next priced round.`, lesson: "aw14-l03", category: "contractual" },
  { id: "aw14-demo-day", en: "Demo Day", ar: "يوم العرض", definition: md`The end-of-batch event where YC companies present to investors; the usual start of the post-batch seed raise.`, lesson: "aw14-l03", category: "institutional" },
  { id: "aw14-design-partner", en: "Design partner", ar: "شريك تصميم", definition: md`An early customer who works with the team on the product in return for influence and favourable terms; evidence only once they use and pay.`, lesson: "aw14-l03", category: "pm" },
  // l04
  { id: "aw14-parent-sub", en: "Parent-subsidiary structure", ar: "هيكل الشركة الأم والشركة التابعة", definition: md`Investors hold shares in a parent (for example Delaware); a local subsidiary employs the team and performs R&D for the parent.`, lesson: "aw14-l04", category: "institutional" },
  { id: "aw14-cost-plus", en: "Cost-plus intercompany agreement", ar: "اتفاقية بين الشركات على أساس التكلفة مع هامش", definition: md`The subsidiary invoices the parent its costs plus an arm's-length markup for R&D or services.`, lesson: "aw14-l04", category: "contractual" },
  { id: "aw14-wbso", en: "WBSO (R&D payroll tax credit)", ar: "الحافز الضريبي الهولندي للبحث والتطوير (WBSO)", definition: md`Dutch reduction of wage tax for staff doing S&O work: 2026 rates 36 % (50 % starters) up to EUR 391,020, 16 % above.`, lesson: "aw14-l04", category: "financial" },
  { id: "aw14-innosuisse", en: "Innosuisse", ar: "الوكالة السويسرية للابتكار (إينوسويس)", definition: md`The Swiss Innovation Agency, funding innovation projects and start-up support; current programmes not verified in this course.`, lesson: "aw14-l04", category: "institutional" },
  { id: "aw14-eic-accelerator", en: "EIC Accelerator", ar: "مسرّع مجلس الابتكار الأوروبي", definition: md`EU programme for SMEs: grant up to EUR 2.5m plus EUR 1 to 10m equity; highly competitive.`, lesson: "aw14-l04", category: "institutional" },
  // l05
  { id: "aw14-why-now", en: "Why now", ar: "لماذا الآن", definition: md`The dated mechanisms that make a company possible or urgent now; for Afterwave physical AI change frequency, the Machinery Regulation and category capital.`, lesson: "aw14-l05", category: "pm" },
  { id: "aw14-notified-body", en: "Notified body", ar: "جهة مُخطَرة (جهة تقييم مطابقة معتمدة)", definition: md`An organisation designated by an EU member state to carry out third-party conformity assessment, required for Machinery Regulation Annex I Part A categories.`, lesson: "aw14-l05", category: "institutional" },
  { id: "aw14-delegated-act", en: "Delegated act", ar: "قانون مفوَّض", definition: md`EU act adopted by the Commission under powers delegated in a regulation; the route by which AI Act requirements will reach machinery.`, lesson: "aw14-l05", category: "institutional" },
  { id: "aw14-milestone-plan", en: "Milestone plan", ar: "خطة المعالم الرئيسية", definition: md`Dated milestones that retire the next investor's key risks; the basis for round size and runway.`, lesson: "aw14-l05", category: "pm" },
];

export default glossary;
