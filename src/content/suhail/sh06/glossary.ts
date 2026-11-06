import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "sh06-sovereign-ai", en: "Sovereign AI", ar: "الذكاء الاصطناعي السيادي", definition: md`A state's effort to control the AI it depends on: in-country compute, models in its language, data kept at home and stakes in the global AI supply chain.`, lesson: "sh06-l01", category: "institutional" },
  { id: "sh06-national-champion", en: "National AI champion", ar: "الشركة الوطنية الرائدة في الذكاء الاصطناعي", definition: md`A state-owned or state-backed company that carries the national AI strategy across data centres, models and apps (HUMAIN, G42, Qai).`, lesson: "sh06-l01", category: "institutional" },
  { id: "sh06-pue", en: "Power usage effectiveness (PUE)", ar: "فعالية استخدام الطاقة", definition: md`Total facility power divided by IT power. 1.0 would mean no overhead; modern liquid-cooled sites aim for roughly 1.1 to 1.4.`, lesson: "sh06-l01", category: "technical" },
  { id: "sh06-accelerator", en: "Accelerator (GPU)", ar: "المسرّع الحوسبي (وحدة معالجة الرسوميات)", definition: md`A chip specialised for the matrix arithmetic of AI training and inference; the binding constraint in most AI build-outs.`, lesson: "sh06-l01", category: "technical" },
  { id: "sh06-hyperscaler", en: "Hyperscaler", ar: "مزوّد الحوسبة السحابية الضخم", definition: md`A global cloud provider operating at very large scale (Microsoft Azure, AWS, Google Cloud, Oracle) that builds in-country regions for data residency.`, lesson: "sh06-l01", category: "institutional" },
  // l02
  { id: "sh06-open-weights", en: "Open-weight model", ar: "نموذج مفتوح الأوزان", definition: md`A model whose trained parameters can be downloaded and run under a licence, without necessarily releasing its training data or code.`, lesson: "sh06-l02", category: "technical" },
  { id: "sh06-fully-open", en: "Fully open model", ar: "نموذج مفتوح بالكامل", definition: md`A model released with weights, training data and code, so it can be audited and reproduced (K2 Think).`, lesson: "sh06-l02", category: "technical" },
  { id: "sh06-model-card", en: "Model card", ar: "بطاقة النموذج", definition: md`The documentation published with a model: intended use, base model, data, training, evaluation, limitations and licence (Mitchell et al., 2019).`, lesson: "sh06-l02", category: "technical" },
  { id: "sh06-derivative-model", en: "Derivative model", ar: "النموذج المشتق", definition: md`A model fine-tuned or continually pretrained from a base model; it usually inherits the base model's licence terms.`, lesson: "sh06-l02", category: "contractual" },
  { id: "sh06-contamination", en: "Benchmark contamination", ar: "تلوّث بيانات التقييم", definition: md`Test items, or translations of them, present in training data, which inflate benchmark scores without real capability.`, lesson: "sh06-l02", category: "technical" },
  { id: "sh06-leaderboard", en: "Leaderboard", ar: "لوحة الصدارة", definition: md`A public ranking of models on a fixed set of benchmarks (OALL v2, ABBL); comparable only within size class, version and date.`, lesson: "sh06-l02", category: "technical" },
  { id: "sh06-diglossia", en: "Diglossia (MSA and dialects)", ar: "الازدواجية اللغوية (الفصحى واللهجات)", definition: md`The coexistence of Modern Standard Arabic, used in writing and formal speech, with spoken dialects; models good at one may be weak at the other.`, lesson: "sh06-l02", category: "technical" },
  { id: "sh06-token-fertility", en: "Tokeniser fertility", ar: "خصوبة المُقسِّم (عدد الرموز لكل كلمة)", definition: md`Average number of tokens per word. High fertility (for example with full diacritisation) wastes context and compute and tends to hurt performance.`, lesson: "sh06-l02", category: "technical" },
  // l03
  { id: "sh06-venture-debt", en: "Venture debt", ar: "الدين الجريء (التمويل بالديون للشركات الناشئة)", definition: md`Loans or credit facilities to startups; some data providers include them in funding totals (Wamda: 29% of H1 2026), others do not.`, lesson: "sh06-l03", category: "financial" },
  { id: "sh06-average-ticket", en: "Average ticket", ar: "متوسط حجم الصفقة", definition: md`Total disclosed funding divided by deal count; a mean that one mega round can distort.`, lesson: "sh06-l03", category: "financial" },
  { id: "sh06-mega-round", en: "Mega round", ar: "جولة تمويل ضخمة", definition: md`An unusually large single round that can dominate a period's total; check totals with and without the largest rounds.`, lesson: "sh06-l03", category: "financial" },
  { id: "sh06-fund-of-funds", en: "Fund of funds", ar: "صندوق الصناديق", definition: md`A vehicle that invests in venture funds rather than startups; in Saudi Arabia, SVC and Jada back many regional VCs.`, lesson: "sh06-l03", category: "financial" },
  { id: "sh06-first-close", en: "First close", ar: "الإغلاق الأول للصندوق", definition: md`The point at which a fund has enough commitments to start investing, before reaching its target size (Khwarizmi Fund II: USD 70 m+ in Feb 2026).`, lesson: "sh06-l03", category: "financial" },
  // l04
  { id: "sh06-brain-drain", en: "Brain drain", ar: "هجرة العقول", definition: md`Emigration of skilled people that permanently removes their skills from the home market.`, lesson: "sh06-l04", category: "institutional" },
  { id: "sh06-brain-circulation", en: "Brain circulation", ar: "تدوير العقول", definition: md`Movement of skilled people that returns value to the home region through remote work, mentoring, investment or return.`, lesson: "sh06-l04", category: "institutional" },
  { id: "sh06-diaspora", en: "Diaspora", ar: "المغتربون (الجاليات في المهجر)", definition: md`People of Arab origin living and working outside the region, a pool of senior skills, networks and capital.`, lesson: "sh06-l04", category: "institutional" },
  { id: "sh06-offshoring", en: "Offshoring (IT services exports)", ar: "التعهيد الخارجي (تصدير الخدمات الرقمية)", definition: md`Delivering software and IT services to foreign clients from the home country; Egypt's exports were about USD 5.2 bn in 2025.`, lesson: "sh06-l04", category: "institutional" },
  { id: "sh06-nationalisation", en: "Nationalisation quota", ar: "نسب التوطين", definition: md`A rule requiring private employers to hire a share of nationals (Saudi Nitaqat, Emiratisation, Kuwaitisation).`, lesson: "sh06-l04", category: "institutional" },
  // l05
  { id: "sh06-neutral-convenor", en: "Neutral convenor", ar: "جهة جامعة محايدة", definition: md`An organisation trusted by competing parties to bring them together because it is independent and transparent about money.`, lesson: "sh06-l05", category: "pm" },
  { id: "sh06-conflict-of-interest", en: "Conflict of interest", ar: "تضارب المصالح", definition: md`A situation where a person's private interest (an investment, a job) could bias a decision made for the organisation, such as judging or curation.`, lesson: "sh06-l05", category: "contractual" },
  // l06
  { id: "sh06-landscape-map", en: "Landscape map", ar: "خريطة المشهد", definition: md`A dated, structured register of the entities and claims that matter, with status, source, confidence and last-verified date for each.`, lesson: "sh06-l06", category: "pm" },
  { id: "sh06-primary-source", en: "Primary source", ar: "المصدر الأوّلي", definition: md`The issuer or original record of a fact (release, model card, paper, the data provider's own report); authoritative on what was said.`, lesson: "sh06-l06", category: "pm" },
];

export default glossary;
