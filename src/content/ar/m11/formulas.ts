import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01
  {
    id: "m11-aggregation-test",
    name: "اختبار التجميع للتعاقد المباشر (منع التجزئة)",
    tex: String.raw`\sum_{j \in \text{FY},\ \text{same item}} V_j \le L_{\text{direct}}`,
    vars: [
      { sym: "V_j", meaning: "قيمة الأمر المباشر j للأصناف/الأعمال ذاتها في السنة المالية", unit: "KD" },
      { sym: String.raw`L_{\text{direct}}`, meaning: "حد التعاقد المباشر (1,000,000 دينار في السنة المالية وفق القانون رقم 94 لسنة 2026؛ وسابقاً 75,000 دينار)", unit: "KD" },
    ],
    explanation: md`إذا تجاوز المجموع السنوي للاحتياج ذاته الحد، فالمسار عبر الجهاز المركزي للمناقصات العامة. والتجزئة للبقاء دون الحد مخالفة.`,
    lesson: "m11-l01",
  },
  // ---------------------------------------------------------------- l02
  {
    id: "m11-guarantee",
    name: "مبلغ الكفالة الأولية / النهائية",
    tex: String.raw`G = \beta \cdot P`,
    vars: [
      { sym: "G", meaning: "مبلغ الكفالة", unit: "KD" },
      { sym: String.raw`\beta`, meaning: "نسبة الكفالة (الكفالة الأولية تحددها وثائق المناقصة؛ والنهائية المُفاد أنها 10% على الأقل)", unit: "–" },
      { sym: "P", meaning: "سعر العطاء أو قيمة العقد", unit: "KD" },
    ],
    explanation: md`نسبة الكفالة الأولية غير مؤكدة في القانون رقم 49 لسنة 2016؛ والكفالة النهائية يُفاد بأنها لا تقل عن 10% من قيمة العقد.`,
    lesson: "m11-l02",
  },
  {
    id: "m11-financial-score",
    name: "الدرجة المالية (تناسب عكسي)",
    tex: String.raw`S_{F,i} = 100 \times \frac{P_{\min}}{P_i}`,
    vars: [
      { sym: String.raw`S_{F,i}`, meaning: "الدرجة المالية للعطاء i", unit: "points" },
      { sym: String.raw`P_{\min}`, meaning: "أقل سعر مُقيَّم", unit: "KD" },
      { sym: "P_i", meaning: "السعر المُقيَّم للعطاء i", unit: "KD" },
    ],
    explanation: md`معيار شائع في الاختيار على أساس الجودة والتكلفة (QCBS) (ممارسة البنك الدولي). يحصل أقل عطاء على 100.`,
    lesson: "m11-l02",
  },
  {
    id: "m11-qcbs",
    name: "الدرجة المجمّعة في QCBS",
    tex: String.raw`S_i = w_T\,S_{T,i} + w_F\,S_{F,i}, \qquad w_T + w_F = 1`,
    vars: [
      { sym: "S_i", meaning: "الدرجة المجمّعة", unit: "points" },
      { sym: "w_T, w_F", meaning: "الوزنان الفني والمالي", unit: "–" },
      { sym: String.raw`S_{T,i}`, meaning: "الدرجة الفنية", unit: "points" },
    ],
    explanation: md`تُثبَّت الأوزان في وثائق المناقصة قبل الفض. في الاستشارات غالباً من 70/30 إلى 90/10؛ وتغيير الأوزان قد يقلب الفائز.`,
    lesson: "m11-l02",
  },
  {
    id: "m11-levelized-tariff",
    name: "التعرفة المعادلة",
    tex: String.raw`T_{\text{lev}} = \frac{\sum_{t=1}^{N} T_t\,E_t\,(1+r)^{-t}}{\sum_{t=1}^{N} E_t\,(1+r)^{-t}}, \qquad T_t = T_1 (1+g)^{t-1}`,
    vars: [
      { sym: String.raw`T_{\text{lev}}`, meaning: "التعرفة المعادلة", unit: "fils/kWh" },
      { sym: "T_t", meaning: "التعرفة في السنة t", unit: "fils/kWh" },
      { sym: "E_t", meaning: "الطاقة في السنة t", unit: "MWh" },
      { sym: "r", meaning: "معدل الخصم للتقييم (محدد في طلب العروض)", unit: "–" },
      { sym: "g", meaning: "معدل تصعيد التعرفة", unit: "–/yr" },
      { sym: "N", meaning: "مدة اتفاقية شراء الطاقة", unit: "yr" },
    ],
    explanation: md`عند r = 7% و N = 30: تعرفة 3.90 فلس تتصاعد 1.5% سنوياً تعادل نحو 4.54 فلس، أي أعلى من تعرفة ثابتة 4.20.`,
    lesson: "m11-l02",
  },
  // ---------------------------------------------------------------- l03
  {
    id: "m11-share-split",
    name: "متطابقة ملكية شركة مشروع الشراكة",
    tex: String.raw`s_{\text{IPO}} + s_{\text{pub}} + s_{\text{priv}} = 1, \quad s_{\text{IPO}} = 0.50,\ 0.06 \le s_{\text{pub}} \le 0.24,\ s_{\text{priv}} \ge 0.26`,
    vars: [
      { sym: String.raw`s_{\text{IPO}}`, meaning: "الحصة المطروحة للمواطنين الكويتيين بالاكتتاب العام", unit: "–" },
      { sym: String.raw`s_{\text{pub}}`, meaning: "حصة الجهات العامة", unit: "–" },
      { sym: String.raw`s_{\text{priv}}`, meaning: "حصة المستثمر الخاص", unit: "–" },
    ],
    explanation: md`وفق دليل قانوني ثانوي لمشروعات الشراكة التي تتجاوز 60 مليون دينار (يُتحقق منها مقابل القانون رقم 116 لسنة 2014). الممارسة في مشروعات IWPP: الخاص 0.40، والعام 0.10، والاكتتاب 0.50.`,
    lesson: "m11-l03",
  },
  {
    id: "m11-ppa-payment",
    name: "مدفوعات الطاقة في اتفاقية شراء الطاقة مع الطاقة المحتسبة",
    tex: String.raw`R_y = T_y\,\left(E_{\text{del},y} + E_{\text{deemed},y}\right)`,
    vars: [
      { sym: "R_y", meaning: "مدفوعات المشتري في السنة y", unit: "KWD" },
      { sym: "T_y", meaning: "التعرفة في السنة y", unit: "KWD/kWh" },
      { sym: String.raw`E_{\text{del},y}`, meaning: "الطاقة المسلَّمة عند نقطة القياس", unit: "kWh" },
      { sym: String.raw`E_{\text{deemed},y}`, meaning: "الطاقة غير المسلَّمة بسبب أحداث من جانب المشتري، بمصادقة المهندس المستقل", unit: "kWh" },
    ],
    explanation: md`تُقدَّر الطاقة المحتسبة عادةً من الإشعاع المقاس ونموذج المحطة، بعد فترات السماح/الحصص المسموحة. هيكل عام — يُتحقق منه مقابل الاتفاقية الكويتية.`,
    lesson: "m11-l03",
  },
  // ---------------------------------------------------------------- l04
  {
    id: "m11-price-preference",
    name: "اختبار الأفضلية السعرية للمنتج الوطني",
    tex: String.raw`P_{\text{nat}} \le (1 + \pi)\,P_{\min}`,
    vars: [
      { sym: String.raw`P_{\text{nat}}`, meaning: "سعر العطاء الذي يقدم منتجات وطنية", unit: "KD" },
      { sym: String.raw`P_{\min}`, meaning: "أقل عطاء مطابق غير وطني", unit: "KD" },
      { sym: String.raw`\pi`, meaning: "نسبة الأفضلية (المُفادة 10% أو 15% أو 20% — غير مُتحقَّق منها)", unit: "–" },
    ],
    explanation: md`تُستخدم أيضاً لهامش المشروعات الصغيرة والمتوسطة المُفاد به في القانون رقم 94 لسنة 2026 (π = 10% مقابل أقل عطاء مقبول)، والذي لا يجوز جمعه مع أولوية المنتجات في المادة 62.`,
    lesson: "m11-l04",
  },
  {
    id: "m11-local-content",
    name: "نسبة المحتوى المحلي",
    tex: String.raw`LC = \frac{V_{\text{local}}}{V_{\text{base}}} \ge 0.30`,
    vars: [
      { sym: "LC", meaning: "نسبة المحتوى المحلي", unit: "–" },
      { sym: String.raw`V_{\text{local}}`, meaning: "القيمة من موردي الدليل الصناعي أو المقاولين المحليين المسجلين من الباطن", unit: "KD" },
      { sym: String.raw`V_{\text{base}}`, meaning: "المقام المحدد في العقد (مشتريات المنتجات، أو الأعمال المسندة من الباطن، أو قيمة العقد)", unit: "KD" },
    ],
    explanation: md`القانون رقم 94 لسنة 2026 (وفق ما أُفيد): 30% على الأقل من المنتجات من الدليل الصناعي للهيئة العامة للصناعة و30% على الأقل من الأعمال تُسند محلياً من الباطن. حدّد المقام صراحةً في العقد.`,
    lesson: "m11-l04",
  },
  // ---------------------------------------------------------------- l05
  {
    id: "m11-pert",
    name: "تقدير PERT ثلاثي النقاط لخطوات الموافقة",
    tex: String.raw`t_e = \frac{a + 4m + b}{6}, \quad \sigma = \frac{b - a}{6}, \quad P80 \approx \sum t_e + 0.84\sqrt{\sum \sigma^2}`,
    vars: [
      { sym: "a, m, b", meaning: "المدد المتفائلة والأرجح والمتشائمة", unit: "weeks" },
      { sym: "t_e", meaning: "المدة المتوقعة للخطوة", unit: "weeks" },
      { sym: String.raw`\sigma`, meaning: "الانحراف المعياري للخطوة", unit: "weeks" },
    ],
    explanation: md`في الخطوات المتتابعة المستقلة تُجمع المتوسطات والتباينات. ضمّن دورة إعادة في القيمة b. وابدأ بالخطوة الأكثر إسهاماً في التباين.`,
    lesson: "m11-l05",
  },
];

export default formulas;
