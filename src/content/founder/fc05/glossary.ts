import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "fc05-brand-platform", en: "Brand platform", ar: "منصة العلامة التجارية", definition: md`One-page source of truth for what a company says: category, audience, problem, promise, proof points and voice.`, lesson: "fc05-l01", category: "pm" },
  { id: "fc05-value-proposition", en: "Value proposition", ar: "عرض القيمة", definition: md`The specific change a product makes for a defined buyer, stated in the buyer's terms and backed by proof.`, lesson: "fc05-l01", category: "pm" },
  { id: "fc05-proof-point", en: "Proof point", ar: "دليل إثبات", definition: md`A checkable fact that supports a claim: a mechanism, a measured result with method, or third-party validation.`, lesson: "fc05-l01", category: "pm" },
  { id: "fc05-brand-voice", en: "Brand voice", ar: "صوت العلامة التجارية", definition: md`The stable personality of a company's writing, expressed as do and do-not rules; tone varies by context, voice does not.`, lesson: "fc05-l01", category: "pm" },
  { id: "fc05-visual-identity", en: "Visual identity", ar: "الهوية البصرية", definition: md`The system of mark, typefaces, colours and layout rules used consistently across touchpoints, including Arabic lockups for bilingual brands.`, lesson: "fc05-l01", category: "pm" },
  { id: "fc05-trademark", en: "Trademark", ar: "علامة تجارية مسجّلة", definition: md`A registered sign (name, logo) protected for specific classes of goods and services in specific jurisdictions; must be cleared before a name is adopted.`, lesson: "fc05-l01", category: "contractual" },
  { id: "fc05-ab-test", en: "A/B test", ar: "اختبار المقارنة (A/B)", definition: md`Randomly splitting traffic between two versions and comparing conversion rates with a significance test such as the two-proportion z-test.`, lesson: "fc05-l01", category: "technical" },
  // l02
  { id: "fc05-whitepaper", en: "Technical whitepaper", ar: "ورقة بيضاء تقنية", definition: md`Long-form document that teaches a method for a hard problem, with mechanism, numbers and limits; the product is one application of the method.`, lesson: "fc05-l02", category: "pm" },
  { id: "fc05-case-study", en: "Case study", ar: "دراسة حالة", definition: md`Evidence from a real deployment (situation, problem, approach, measured result, quote), published with the customer's written approval.`, lesson: "fc05-l02", category: "pm" },
  { id: "fc05-benchmark", en: "Benchmark", ar: "اختبار أداء مرجعي", definition: md`A published comparison on a defined workload with a fixed method, disclosed setup and reproducible scripts.`, lesson: "fc05-l02", category: "technical" },
  { id: "fc05-marketing-funnel", en: "Marketing funnel", ar: "قمع التسويق", definition: md`The sequence of stages from first exposure to won deal; output equals the top-of-funnel count times every stage conversion rate.`, lesson: "fc05-l02", category: "pm" },
  { id: "fc05-attribution", en: "Multi-touch attribution", ar: "الإسناد متعدد نقاط التواصل", definition: md`Rules for splitting an opportunity's value across the recorded touches before it: first-touch, last-touch, linear, U-shaped.`, lesson: "fc05-l02", category: "financial" },
  { id: "fc05-pipeline-influence", en: "Pipeline influence", ar: "الأثر على خط المبيعات", definition: md`Total value of opportunities whose recorded journey includes a given asset or channel; shows presence, not causation.`, lesson: "fc05-l02", category: "financial" },
  // l03
  { id: "fc05-devrel", en: "Developer relations (DevRel)", ar: "علاقات المطوّرين", definition: md`The function that earns engineers' trust and adoption through docs, code, examples, talks and community, rather than through campaigns.`, lesson: "fc05-l03", category: "pm" },
  { id: "fc05-ttfv", en: "Time to first value", ar: "الوقت حتى القيمة الأولى", definition: md`Time from install or sign-up to the user's first real result; the main driver of activation rate.`, lesson: "fc05-l03", category: "technical" },
  { id: "fc05-open-core", en: "Open core", ar: "النواة المفتوحة", definition: md`Business model in which a useful core or interface is open source and the differentiating engine or enterprise features are proprietary.`, lesson: "fc05-l03", category: "contractual" },
  { id: "fc05-permissive-licence", en: "Permissive licence", ar: "رخصة مفتوحة المصدر متساهلة", definition: md`Open source licence (MIT, Apache-2.0, BSD) allowing use, modification and embedding in closed products with attribution.`, lesson: "fc05-l03", category: "contractual" },
  { id: "fc05-copyleft", en: "Copyleft", ar: "الحقوق المتروكة (كوبي لفت)", definition: md`Licence condition (GPL, AGPL) requiring derivative works to be released under the same licence.`, lesson: "fc05-l03", category: "contractual" },
  { id: "fc05-community-of-practice", en: "Community of practice", ar: "مجتمع الممارسة", definition: md`A group sharing a domain, relationships of mutual help and a practice; members get value from each other, not only from the host.`, lesson: "fc05-l03", category: "pm" },
  // l04
  { id: "fc05-qualified-lead", en: "Qualified lead", ar: "عميل محتمل مؤهَّل", definition: md`A contact who meets written criteria for role, company fit, problem and timing, agreed before the activity that produced them.`, lesson: "fc05-l04", category: "pm" },
  { id: "fc05-cpql", en: "Cost per qualified lead (CPQL)", ar: "تكلفة العميل المحتمل المؤهَّل", definition: md`Full activity cost including staff time divided by qualified leads; the comparable unit across marketing channels.`, lesson: "fc05-l04", category: "financial" },
  { id: "fc05-press-release", en: "Press release", ar: "بيان صحفي", definition: md`Standard announcement document: headline, dateline, lede, facts, quotes, boilerplate, media contact.`, lesson: "fc05-l04", category: "pm" },
  { id: "fc05-embargo", en: "Embargo", ar: "حظر النشر حتى موعد محدد", definition: md`Agreement that a journalist receives information early and publishes only after a stated time; binding only if agreed beforehand.`, lesson: "fc05-l04", category: "contractual" },
  { id: "fc05-exclusive", en: "Exclusive", ar: "سبق صحفي حصري", definition: md`Arrangement giving one outlet a story before any other.`, lesson: "fc05-l04", category: "contractual" },
  { id: "fc05-boilerplate", en: "Boilerplate", ar: "الفقرة التعريفية الثابتة", definition: md`The fixed "About the company" paragraph at the end of every press release.`, lesson: "fc05-l04", category: "pm" },
  // l05
  { id: "fc05-engagement-rate", en: "Engagement rate", ar: "معدل التفاعل", definition: md`Reactions, comments and reposts divided by impressions; a diagnostic of content resonance, not a business outcome.`, lesson: "fc05-l05", category: "financial" },
  { id: "fc05-msa", en: "Modern Standard Arabic (MSA)", ar: "العربية الفصحى المعاصرة", definition: md`The standard written Arabic of government, press, education and formal speech across the Arab world.`, lesson: "fc05-l05", category: "institutional" },
  { id: "fc05-gulf-arabic", en: "Gulf Arabic (Khaleeji dialect)", ar: "اللهجة الخليجية", definition: md`The spoken Arabic of the Gulf states, including Kuwaiti; used in informal speech, podcasts and community settings.`, lesson: "fc05-l05", category: "institutional" },
  { id: "fc05-register", en: "Register", ar: "المستوى اللغوي", definition: md`The level of formality and variety of language chosen for an audience and channel, from formal MSA to dialect.`, lesson: "fc05-l05", category: "institutional" },
  { id: "fc05-transcreation", en: "Transcreation", ar: "الترجمة الإبداعية", definition: md`Recreating a message's intent, tone and call to action for another language and culture instead of translating word for word.`, lesson: "fc05-l05", category: "pm" },
];

export default glossary;
