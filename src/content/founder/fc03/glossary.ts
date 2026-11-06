import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "fc03-positioning", en: "Positioning", ar: "تموضع المنتج", definition: md`Deliberately defining how a product is the best at something a defined market cares a lot about; the context buyers use to understand it (Dunford).`, lesson: "fc03-l01", category: "pm" },
  { id: "fc03-competitive-alternatives", en: "Competitive alternatives", ar: "البدائل التنافسية", definition: md`What best-fit customers would do if your product did not exist: the status quo, manual work, internal tools or named vendors.`, lesson: "fc03-l01", category: "pm" },
  { id: "fc03-unique-attributes", en: "Unique attributes", ar: "السمات الفريدة", definition: md`Demonstrable capabilities, delivery model or expertise that you have and the alternatives lack.`, lesson: "fc03-l01", category: "pm" },
  { id: "fc03-value-proposition", en: "Value proposition (value themes)", ar: "عرض القيمة", definition: md`The benefits unique attributes deliver to customers, grouped into two or three themes and backed by proof.`, lesson: "fc03-l01", category: "pm" },
  { id: "fc03-market-category", en: "Market category (frame of reference)", ar: "فئة السوق (الإطار المرجعي)", definition: md`The market you say you compete in; it triggers buyer assumptions about competitors, features, price and evaluation criteria.`, lesson: "fc03-l01", category: "pm" },
  { id: "fc03-positioning-statement", en: "Positioning statement", ar: "بيان التموضع", definition: md`One internal sentence: for [target] who [need], [product] is a [category] that [benefit]; unlike [alternative], it [differentiation] (after Moore).`, lesson: "fc03-l01", category: "pm" },
  // l02
  { id: "fc03-icp", en: "Ideal customer profile (ICP)", ar: "ملف العميل المثالي", definition: md`Description of the accounts that get value fastest and are most valuable to you: they buy quickly, expand and refer.`, lesson: "fc03-l02", category: "pm" },
  { id: "fc03-firmographics", en: "Firmographics", ar: "الخصائص المؤسسية", definition: md`Observable company traits used for segmentation: industry, size, geography, funding, programme phase.`, lesson: "fc03-l02", category: "pm" },
  { id: "fc03-technographics", en: "Technographics", ar: "الخصائص التقنية للعميل", definition: md`The tools, data formats and infrastructure policies an account uses, which decide whether you can be deployed.`, lesson: "fc03-l02", category: "technical" },
  { id: "fc03-buying-trigger", en: "Buying trigger", ar: "محفّز الشراء", definition: md`An event that makes a problem urgent now: new programme, cadence jump, regulation date, new leader, funding, failure.`, lesson: "fc03-l02", category: "pm" },
  { id: "fc03-beachhead", en: "Beachhead segment", ar: "السوق الأولية (رأس الجسر)", definition: md`The first narrow segment a company aims to dominate, where customers reference each other and the whole product can be delivered.`, lesson: "fc03-l02", category: "pm" },
  // l03
  { id: "fc03-message-house", en: "Message house", ar: "بيت الرسائل", definition: md`Messaging structure with a core message (roof), three pillars (value themes) and proof points (foundation).`, lesson: "fc03-l03", category: "pm" },
  { id: "fc03-value-ladder", en: "Value ladder", ar: "سلّم القيمة", definition: md`Chain from feature to capability, user benefit, business outcome and strategic outcome.`, lesson: "fc03-l03", category: "pm" },
  { id: "fc03-economic-buyer", en: "Economic buyer", ar: "المشتري الاقتصادي (صاحب قرار الميزانية)", definition: md`The person who controls the budget and can approve the purchase; cares about business outcomes, cost and risk.`, lesson: "fc03-l03", category: "pm" },
  { id: "fc03-technical-buyer", en: "Technical buyer (technical evaluator)", ar: "المقيّم الفني", definition: md`The person who judges whether the product works and integrates; can block a deal but rarely approves budget alone.`, lesson: "fc03-l03", category: "pm" },
  { id: "fc03-champion", en: "Champion", ar: "المناصر الداخلي", definition: md`A person inside the account who wants your product to win and sells it internally when you are not in the room.`, lesson: "fc03-l03", category: "pm" },
  // l04
  { id: "fc03-gtm-motion", en: "Go-to-market motion", ar: "نهج الوصول إلى السوق", definition: md`The repeatable way a company finds, wins and expands customers: product-led, sales-led, partner-led or hybrid.`, lesson: "fc03-l04", category: "pm" },
  { id: "fc03-plg", en: "Product-led growth (PLG)", ar: "النمو بقيادة المنتج", definition: md`A motion in which users discover, try and adopt the product themselves, and product usage generates qualified leads.`, lesson: "fc03-l04", category: "pm" },
  { id: "fc03-sales-led", en: "Sales-led motion", ar: "النمو بقيادة المبيعات", definition: md`A motion in which salespeople (AEs, sales engineers) run discovery, demos, pilots and negotiation to win accounts.`, lesson: "fc03-l04", category: "pm" },
  { id: "fc03-partner-led", en: "Partner-led motion", ar: "البيع عبر الشركاء", definition: md`Resellers, integrators, OEMs or local agents sell or bundle the product in exchange for a margin.`, lesson: "fc03-l04", category: "contractual" },
  { id: "fc03-cac", en: "Customer acquisition cost (CAC)", ar: "تكلفة اكتساب العميل", definition: md`Fully loaded sales and marketing spend divided by new customers won in the matching period.`, lesson: "fc03-l04", category: "financial" },
  { id: "fc03-acv", en: "Annual contract value (ACV)", ar: "القيمة السنوية للعقد", definition: md`The average annualised revenue of a customer contract, excluding one-off fees.`, lesson: "fc03-l04", category: "financial" },
  { id: "fc03-cac-payback", en: "CAC payback period", ar: "فترة استرداد تكلفة اكتساب العميل", definition: md`Months of gross profit needed to recover CAC: $P = CAC/(ACV \cdot GM/12)$.`, lesson: "fc03-l04", category: "financial" },
  { id: "fc03-sales-cycle", en: "Sales cycle", ar: "دورة المبيعات", definition: md`Time from first qualified conversation to signed contract; longer cycles lower wins per salesperson and raise CAC.`, lesson: "fc03-l04", category: "pm" },
  { id: "fc03-paid-pilot", en: "Paid pilot", ar: "مشروع تجريبي مدفوع", definition: md`A fixed-fee, time-boxed trial with written success criteria and pre-agreed conversion terms.`, lesson: "fc03-l04", category: "contractual" },
  // l05
  { id: "fc03-launch-tier", en: "Launch tier", ar: "مستوى الإطلاق", definition: md`Classification of a launch by how much it changes what you sell or to whom (tier 1, 2 or 3).`, lesson: "fc03-l05", category: "pm" },
  { id: "fc03-embargo", en: "Embargo (press)", ar: "حظر النشر المؤقت", definition: md`Agreement that briefed journalists or analysts will not publish before a set date and time.`, lesson: "fc03-l05", category: "pm" },
  { id: "fc03-security-pack", en: "Security pack", ar: "حزمة الوثائق الأمنية", definition: md`Architecture and data-flow diagrams, deployment and update model, and standard questionnaire answers prepared for customer InfoSec review.`, lesson: "fc03-l05", category: "technical" },
  // l06
  { id: "fc03-category-creation", en: "Category creation", ar: "إنشاء فئة سوقية جديدة", definition: md`Defining and teaching a new problem-and-solution frame so buyers create a budget line and evaluate vendors on your criteria.`, lesson: "fc03-l06", category: "pm" },
  { id: "fc03-subcategory", en: "Subcategory", ar: "فئة فرعية", definition: md`Entering an existing category while redefining one dimension (segment, delivery model, job) so buyers keep their budget line but use your criteria.`, lesson: "fc03-l06", category: "pm" },
];

export default glossary;
