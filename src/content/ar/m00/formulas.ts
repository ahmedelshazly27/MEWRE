import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01
  {
    id: "m00-load-factor",
    name: "معامل الحمل للمنظومة",
    tex: String.raw`LF = \frac{E_{\text{annual}}}{P_{\text{peak}} \times 8760}`,
    vars: [
      { sym: "LF", meaning: "معامل الحمل (Load Factor)", unit: "–" },
      { sym: String.raw`E_{\text{annual}}`, meaning: "الطاقة السنوية المُغذّاة", unit: "MWh" },
      { sym: String.raw`P_{\text{peak}}`, meaning: "الحمل الأقصى السنوي", unit: "MW" },
    ],
    explanation: md`يقيس مدى "حدّة" ذروة الطلب. تقع منظومات الخليج التي يغلب عليها التبريد عند نحو 0.5–0.6، والمنظومات الصناعية عند 0.7–0.8. انخفاض معامل الحمل يعني قدرة مبنية لتعمل بضع مئات من الساعات سنوياً فقط — وهي أغلى الميجاواطات صيانةً، وهي التي يمكن أن تحل محلها الطاقة الشمسية مع التخزين.`,
    lesson: "m00-l01",
  },
  {
    id: "m00-available-capacity",
    name: "القدرة المتاحة وقت الذروة",
    tex: String.raw`C_{\text{avail}} = \sum_i C_{\text{inst},i}\,(1 - f_{\text{out},i})\,(1 - f_{\text{derate},i}(T))`,
    vars: [
      { sym: String.raw`C_{\text{avail}}`, meaning: "القدرة المتاحة في ساعة الذروة", unit: "MW" },
      { sym: String.raw`C_{\text{inst},i}`, meaning: "القدرة المركبة (الاسمية) للوحدة i", unit: "MW" },
      { sym: String.raw`f_{\text{out},i}`, meaning: "النسبة الخارجة بسبب الأعطال القسرية أو الصيانة المخططة", unit: "–" },
      { sym: String.raw`f_{\text{derate},i}(T)`, meaning: "فقد القدرة عند درجة الحرارة المحيطة T", unit: "–" },
    ],
    explanation: md`الكويت: نحو 21 GW قدرة مركبة مقابل نحو 17 GW متاحة (Rystad)، أي فقد مجمّع بنحو 19%. تفقد التوربينات الغازية تقريباً 0.5–0.7% لكل درجة مئوية فوق 15 °C (قيمة عامة؛ استخدم منحنيات الصانع).`,
    lesson: "m00-l01",
  },
  {
    id: "m00-reserve-margin",
    name: "الهامش الاحتياطي",
    tex: String.raw`RM = \frac{C_{\text{avail}} - P_{\text{peak}}}{P_{\text{peak}}}`,
    vars: [
      { sym: "RM", meaning: "الهامش الاحتياطي (Reserve Margin)", unit: "– (often %)" },
      { sym: String.raw`C_{\text{avail}}`, meaning: "القدرة المتاحة (شاملةً الواردات المؤكدة)", unit: "MW" },
      { sym: String.raw`P_{\text{peak}}`, meaning: "الحمل الأقصى", unit: "MW" },
    ],
    explanation: md`أهداف التخطيط عادةً +10–20% على القدرة المتاحة. الكويت في يونيو 2025: (16.275 − 16.98)/16.98 ≈ −4.2%.`,
    lesson: "m00-l01",
  },
  {
    id: "m00-heat-rate-efficiency",
    name: "معدل الاستهلاك الحراري والكفاءة",
    tex: String.raw`\eta = \frac{3600}{HR}`,
    vars: [
      { sym: String.raw`\eta`, meaning: "الكفاءة الكهربائية الصافية", unit: "–" },
      { sym: "HR", meaning: "معدل الاستهلاك الحراري (طاقة الوقود لكل kWh مولَّدة)", unit: "kJ/kWh" },
    ],
    explanation: md`1 kWh = 3,600 kJ. الوحدات البخارية القديمة نحو 10,500 kJ/kWh (34%)؛ الدورة المركبة الحديثة (CCGT) نحو 6,300–7,500 kJ/kWh (48–57%).`,
    lesson: "m00-l01",
  },
  {
    id: "m00-fuel-burn",
    name: "استهلاك الوقود من التوليد",
    tex: String.raw`Q_{\text{fuel}} = E \cdot HR, \qquad N_{\text{bbl}} = \frac{E \cdot HR}{e_{\text{bbl}}}`,
    vars: [
      { sym: String.raw`Q_{\text{fuel}}`, meaning: "طاقة الوقود المستهلكة", unit: "GJ" },
      { sym: "E", meaning: "الكهرباء المولَّدة", unit: "kWh" },
      { sym: "HR", meaning: "معدل الاستهلاك الحراري", unit: "GJ/kWh" },
      { sym: String.raw`N_{\text{bbl}}`, meaning: "براميل النفط المكافئ", unit: "bbl" },
      { sym: String.raw`e_{\text{bbl}}`, meaning: "الطاقة في البرميل الواحد (نحو 6.1 GJ أو 5.8 MMBtu)", unit: "GJ/bbl" },
    ],
    explanation: md`استخدمها لتحويل الميجاواط ساعة إلى براميل أو MMBtu، ثم إلى قيمة مالية. 1 MMBtu = 1.055 GJ.`,
    lesson: "m00-l01",
  },
  // ---------------------------------------------------------------- l02
  {
    id: "m00-approval-path",
    name: "المدة المتوقعة لسلسلة موافقات مع إعادة العمل",
    tex: String.raw`E[T] = \sum_{i=1}^{n} \frac{t_i}{1 - p_i}`,
    vars: [
      { sym: "E[T]", meaning: "المدة الإجمالية المتوقعة للسلسلة المتتابعة", unit: "weeks" },
      { sym: "t_i", meaning: "زمن المراجعة الاسمي للخطوة i", unit: "weeks" },
      { sym: "p_i", meaning: "احتمال أن تعيد الخطوة i الملف لاستكماله", unit: "–" },
    ],
    explanation: md`عدد دورات المراجعة لكل خطوة يتبع توزيعاً هندسياً (متوسطه 1/(1−p)). النموذج متحفظ لأن إعادة التقديم غالباً أسرع. الدرس: خفّض p (ملفات مكتملة) قبل محاولة خفض t.`,
    lesson: "m00-l02",
  },
  // ---------------------------------------------------------------- l03
  {
    id: "m00-unit-subsidy",
    name: "دعم الكهرباء للوحدة",
    tex: String.raw`s = c_{\text{supply}} - t`,
    vars: [
      { sym: "s", meaning: "الدعم لكل kWh", unit: "fils/kWh" },
      { sym: String.raw`c_{\text{supply}}`, meaning: "تكلفة الإمداد لكل kWh مُسلَّمة", unit: "fils/kWh" },
      { sym: "t", meaning: "التعرفة التي يدفعها المستهلك", unit: "fils/kWh" },
    ],
    explanation: md`الكويت: t = 2 fils للمواطنين؛ تقديرات تكلفة الإمداد 14–38 fils، إذن s ≈ 12–36 fils/kWh.`,
    lesson: "m00-l03",
  },
  {
    id: "m00-fiscal-subsidy",
    name: "الدعم المالي عبر فئات المستهلكين",
    tex: String.raw`S = \sum_k E_k\,(c_{\text{supply}} - t_k)`,
    vars: [
      { sym: "S", meaning: "الدعم السنوي الذي تتحمله الدولة", unit: "KWD/yr" },
      { sym: "E_k", meaning: "الاستهلاك السنوي للفئة k", unit: "kWh/yr" },
      { sym: "t_k", meaning: "تعرفة الفئة k", unit: "KWD/kWh" },
    ],
    explanation: md`يُجمع على فئات المواطنين والشقق والتجاري والصناعي/الزراعي. استخدم نطاقاً لتكلفة الإمداد؛ لا يوجد رقم رسمي حالي في المصادر.`,
    lesson: "m00-l03",
  },
  {
    id: "m00-fuel-value-kwh",
    name: "قيمة الوقود المُزاح لكل kWh",
    tex: String.raw`v = HR \times p_{\text{fuel}}`,
    vars: [
      { sym: "v", meaning: "تكلفة الوقود المُتجنَّبة لكل kWh", unit: "USD/kWh" },
      { sym: "HR", meaning: "معدل الاستهلاك الحراري للوحدة المُزاحة (الحدّية)", unit: "GJ/kWh" },
      { sym: String.raw`p_{\text{fuel}}`, meaning: "سعر الوقود بتكلفة الفرصة البديلة", unit: "USD/GJ" },
    ],
    explanation: md`نفط خام بسعر 70 USD/bbl في وحدة بخارية بمعدل 10.5 MJ/kWh ≈ 0.12 USD/kWh (≈37 fils)؛ غاز طبيعي مسال (LNG) بسعر 12 USD/MMBtu في CCGT بمعدل 7.5 MJ/kWh ≈ 0.085 USD/kWh (≈26 fils).`,
    lesson: "m00-l03",
  },
  {
    id: "m00-annual-energy",
    name: "الطاقة السنوية من معامل السعة",
    tex: String.raw`E = P \cdot CF \cdot 8760`,
    vars: [
      { sym: "E", meaning: "الطاقة السنوية", unit: "MWh/yr" },
      { sym: "P", meaning: "القدرة المقننة (حدّد AC أو DC!)", unit: "MW" },
      { sym: "CF", meaning: "معامل السعة على نفس أساس P", unit: "–" },
    ],
    explanation: md`حدّد دائماً ما إذا كانت P بوحدة MWac أو MWp واستخدم معامل سعة على الأساس نفسه؛ في المشاريع الفعلية استخدم إنتاجية P50 من تقييم إنتاج الطاقة بدلاً من ذلك.`,
    lesson: "m00-l03",
  },
  // ---------------------------------------------------------------- l04
  {
    id: "m00-re-share",
    name: "حصة الطاقة المتجددة",
    tex: String.raw`\sigma_{RE} = \frac{E_{RE}}{E_{\text{tot}}}`,
    vars: [
      { sym: String.raw`\sigma_{RE}`, meaning: "حصة الطاقة المتجددة من الكهرباء", unit: "–" },
      { sym: String.raw`E_{RE}`, meaning: "التوليد السنوي من الطاقة المتجددة", unit: "MWh/yr" },
      { sym: String.raw`E_{\text{tot}}`, meaning: "إجمالي التوليد السنوي", unit: "MWh/yr" },
    ],
    explanation: md`أهداف الكويت 15% و30% هي حصص من الطاقة لا من القدرة. تحقّق دائماً أيهما المقصود.`,
    lesson: "m00-l04",
  },
  {
    id: "m00-capacity-for-share",
    name: "القدرة اللازمة لتحقيق هدف حصة من الطاقة",
    tex: String.raw`P_{RE} = \frac{\sigma\,E_{\text{tot}}}{CF \times 8760}`,
    vars: [
      { sym: String.raw`P_{RE}`, meaning: "قدرة الطاقة المتجددة المطلوبة", unit: "MW" },
      { sym: String.raw`\sigma`, meaning: "الحصة المستهدفة", unit: "–" },
      { sym: String.raw`E_{\text{tot}}`, meaning: "إجمالي التوليد السنوي", unit: "MWh/yr" },
      { sym: "CF", meaning: "معامل السعة للطاقة المتجددة", unit: "–" },
    ],
    explanation: md`15% من 84 TWh (رقم توضيحي) عند معامل سعة 0.25 ≈ 5.75 GW من الطاقة الكهروضوئية؛ و30% ≈ 11.5 GW. أضف نمو الطلب حتى سنة الهدف.`,
    lesson: "m00-l04",
  },
  // ---------------------------------------------------------------- l05
  {
    id: "m00-delay-cost",
    name: "تكلفة الوقود الناتجة عن تأخر تشغيل محطة متجددة",
    tex: String.raw`C_d = \Delta t \cdot P \cdot CF \cdot 24 \cdot (v - T)`,
    vars: [
      { sym: "C_d", meaning: "التكلفة الإضافية على الدولة بسبب التأخير", unit: "KWD" },
      { sym: String.raw`\Delta t`, meaning: "مدة التأخير", unit: "days" },
      { sym: "P", meaning: "قدرة المحطة", unit: "kW" },
      { sym: "CF", meaning: "معامل السعة", unit: "–" },
      { sym: "v", meaning: "قيمة الوقود المُزاح", unit: "KWD/kWh" },
      { sym: "T", meaning: "تعرفة اتفاقية شراء الطاقة (لا تُدفع أثناء تأخر المحطة)", unit: "KWD/kWh" },
    ],
    explanation: md`1.1 GW، معامل سعة 0.25، v = 37 fils، T = 8 fils → ≈ 191,000 KWD يومياً. أضف أي مدفوعات للطاقة الاعتبارية إذا كان التأخير من جانب المشتري.`,
    lesson: "m00-l05",
  },
  {
    id: "m00-pv-annuity",
    name: "القيمة الحالية لدفعة سنوية ثابتة",
    tex: String.raw`PV = A \cdot \frac{1 - (1+r)^{-N}}{r}`,
    vars: [
      { sym: "PV", meaning: "القيمة الحالية (Present Value)", unit: "KWD" },
      { sym: "A", meaning: "الدفعة السنوية الثابتة (مثل مدفوعات اتفاقية شراء الطاقة أو التشغيل والصيانة)", unit: "KWD/yr" },
      { sym: "r", meaning: "معدل الخصم", unit: "–" },
      { sym: "N", meaning: "عدد السنوات", unit: "yr" },
    ],
    explanation: md`معامل الدفعات السنوية لمدة 30 سنة: 15.372 عند 5%، و11.258 عند 8%. يُستخدم لمقارنة تدفق مدفوعات اتفاقية شراء الطاقة مع التكلفة الرأسمالية المقدمة + التشغيل والصيانة (مقارن مبسّط للقطاع العام).`,
    lesson: "m00-l05",
  },
];

export default formulas;
