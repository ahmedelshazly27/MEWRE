import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "sh04-value-exchange", en: "Value exchange", ar: "تبادل القيمة", definition: md`The explicit trade in a partnership: what the partner gets (audience, talent, adoption, data, brand) against what it gives (cash, in-kind, credits, people, distribution).`, lesson: "sh04-l01", category: "pm" },
  { id: "sh04-anchor-partner", en: "Anchor partner", ar: "الشريك الرئيسي (الشريك المحوري)", definition: md`A partner with many resources and high alignment with the builder mission, worth a multi-event programme.`, lesson: "sh04-l01", category: "pm" },
  { id: "sh04-brand-buyer", en: "Brand buyer", ar: "مشتري الظهور (الراعي الباحث عن العلامة)", definition: md`A partner with resources but little interest in builders, buying visibility; sold a priced package with no influence on content.`, lesson: "sh04-l01", category: "pm" },
  { id: "sh04-fit-score", en: "Partner fit score", ar: "مؤشر ملاءمة الشريك", definition: md`Weighted sum of 0 to 5 scores on criteria such as alignment, resources, speed, credibility and independence risk, used to rank targets.`, lesson: "sh04-l01", category: "pm" },
  { id: "sh04-budget-line", en: "Budget line", ar: "بند الميزانية", definition: md`The specific budget (developer relations, marketing, HR, CSR, research, government programme) a partnership would be paid from, with its owner.`, lesson: "sh04-l01", category: "financial" },
  { id: "sh04-sovereign-ai", en: "Sovereign AI programme", ar: "برنامج الذكاء الاصطناعي السيادي", definition: md`A state-backed effort to build national AI models, compute and capability, such as HUMAIN in Saudi Arabia or the Jais and Falcon model families in the UAE.`, lesson: "sh04-l01", category: "institutional" },
  // l02
  { id: "sh04-sponsor", en: "Sponsor", ar: "الراعي", definition: md`A partner that pays cash (or prizes) for defined benefits such as visibility, a talk, a judging seat or hiring access, without control of the programme.`, lesson: "sh04-l02", category: "contractual" },
  { id: "sh04-co-host", en: "Co-host", ar: "المضيف المشارك", definition: md`A partner sharing ownership, costs and brand of an event under a written split of decisions and money.`, lesson: "sh04-l02", category: "contractual" },
  { id: "sh04-programme-partner", en: "Programme partner", ar: "شريك البرنامج", definition: md`A partner that designs a challenge or track, brings experts and prizes, and gets builders working on its problem or platform.`, lesson: "sh04-l02", category: "contractual" },
  { id: "sh04-mou", en: "Memorandum of understanding (MOU)", ar: "مذكرة تفاهم", definition: md`A document recording intent to cooperate, usually non-binding except named clauses; binding force depends on wording and intent, not the title.`, lesson: "sh04-l02", category: "contractual" },
  { id: "sh04-loi", en: "Letter of intent (LOI)", ar: "خطاب نوايا", definition: md`A short document stating that parties intend to conclude an agreement on outlined terms; usually non-binding on the main terms.`, lesson: "sh04-l02", category: "contractual" },
  { id: "sh04-category-exclusivity", en: "Category exclusivity", ar: "الحصرية في الفئة", definition: md`A promise that no competitor in the partner's category (for example cloud) will be a partner for a defined scope and period.`, lesson: "sh04-l02", category: "contractual" },
  { id: "sh04-in-kind", en: "In-kind contribution", ar: "مساهمة عينية", definition: md`Support given as goods or services (venue, catering, travel, credits) rather than cash; valued at the cost it actually saves.`, lesson: "sh04-l02", category: "financial" },
  { id: "sh04-force-majeure", en: "Force majeure", ar: "القوة القاهرة", definition: md`A clause excusing performance when events beyond the parties' control prevent it, with rules on postponement, refunds and termination.`, lesson: "sh04-l02", category: "contractual" },
  // l03
  { id: "sh04-vat", en: "Value added tax (VAT)", ar: "ضريبة القيمة المضافة", definition: md`A consumption tax added to the price of taxable supplies: 15 % in Saudi Arabia, 5 % in the UAE, 14 % in Egypt, 11 % in Lebanon; Jordan levies a 16 % general sales tax.`, lesson: "sh04-l03", category: "financial" },
  { id: "sh04-reverse-charge", en: "Reverse charge", ar: "آلية الاحتساب العكسي", definition: md`A VAT mechanism where the business customer, not the foreign supplier, accounts for VAT on an imported service.`, lesson: "sh04-l03", category: "financial" },
  { id: "sh04-withholding-tax", en: "Withholding tax", ar: "ضريبة الاستقطاع", definition: md`Tax the payer deducts from a payment (often to a non-resident) and pays to its tax authority; grossed up as $N/(1-t_w)$ if the price is agreed net.`, lesson: "sh04-l03", category: "financial" },
  { id: "sh04-fiscal-year", en: "Fiscal year", ar: "السنة المالية", definition: md`The budget year of an organisation: calendar year for most Gulf governments and corporates, April to March for Kuwait's government, July to June for Egypt's.`, lesson: "sh04-l03", category: "financial" },
  // l04
  { id: "sh04-weighted-forecast", en: "Weighted forecast", ar: "التوقع المرجّح", definition: md`Sum of deal values times stage-to-paid probabilities, counting only deals that can be paid before the cash is needed.`, lesson: "sh04-l04", category: "pm" },
  { id: "sh04-champion", en: "Champion", ar: "المناصر الداخلي", definition: md`A person inside the partner organisation who wants the partnership to happen and pushes it internally.`, lesson: "sh04-l04", category: "pm" },
  { id: "sh04-partner-health", en: "Partner health score", ar: "مؤشر صحة الشراكة", definition: md`A 0 to 100 weighted score of an active partnership on sponsor engagement, delivery, outcomes, responsiveness and renewal signals.`, lesson: "sh04-l04", category: "pm" },
  // l05
  { id: "sh04-conflict-of-interest", en: "Conflict of interest", ar: "تضارب المصالح", definition: md`A situation where a person's other interest could influence, or appear to influence, an organisation's decision; managed by disclosure and recusal.`, lesson: "sh04-l05", category: "institutional" },
  { id: "sh04-recusal", en: "Recusal", ar: "التنحي عن القرار", definition: md`Withdrawal of a conflicted person from a decision, recorded in the minutes, with another person deciding.`, lesson: "sh04-l05", category: "institutional" },
  { id: "sh04-sanctions-screening", en: "Sanctions screening", ar: "التدقيق في قوائم العقوبات", definition: md`Checking counterparties and their owners against UN, US (OFAC), EU and UK sanctions lists before money, prizes or data move.`, lesson: "sh04-l05", category: "institutional" },
  { id: "sh04-hhi", en: "Herfindahl-Hirschman index (HHI)", ar: "مؤشر هيرفندال-هيرشمان للتركّز", definition: md`Sum of squared revenue shares; $1/\text{HHI}$ is the effective number of partners.`, lesson: "sh04-l05", category: "financial" },
  { id: "sh04-editorial-independence", en: "Editorial independence", ar: "الاستقلالية التحريرية", definition: md`The rule that no partner approves speakers, judges or content, and that sponsored content is labelled.`, lesson: "sh04-l05", category: "institutional" },
  // l06
  { id: "sh04-double-opt-in", en: "Double opt-in introduction", ar: "التعارف بموافقة الطرفين", definition: md`An introduction made only after both sides have separately agreed to it.`, lesson: "sh04-l06", category: "pm" },
  { id: "sh04-placement-fee", en: "Placement fee", ar: "رسوم التوظيف (عمولة التعيين)", definition: md`A fee charged to an employer when a candidate is hired, usually a percentage of first-year salary; may require a recruitment licence.`, lesson: "sh04-l06", category: "financial" },
  { id: "sh04-demo-day", en: "Demo day", ar: "يوم العروض", definition: md`A curated event where teams present to invited investors; at Suhail opt-in for teams, with several investors and no exclusive access.`, lesson: "sh04-l06", category: "pm" },
];

export default glossary;
