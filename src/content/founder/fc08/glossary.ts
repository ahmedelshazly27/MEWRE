import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "fc08-cap-table", en: "Capitalization table (cap table)", ar: "جدول رسملة الشركة (جدول الملكية)", definition: md`Ledger of every share, option, warrant and convertible instrument by holder and class, with ownership percentages.`, lesson: "fc08-l01", category: "financial" },
  { id: "fc08-fully-diluted", en: "Fully diluted shares", ar: "الأسهم على أساس التخفيف الكامل", definition: md`Issued shares plus granted options, the unallocated option pool and warrants (and convertibles once their share count is fixed). The base for venture percentages.`, lesson: "fc08-l01", category: "financial" },
  { id: "fc08-dilution", en: "Dilution", ar: "تخفيف الملكية", definition: md`Reduction in a holder's percentage when new shares are issued: $p_{\text{after}} = p_{\text{before}}(1-d)$.`, lesson: "fc08-l01", category: "financial" },
  { id: "fc08-option-pool", en: "Option pool", ar: "مجمع خيارات الأسهم للموظفين", definition: md`Shares reserved for future option grants to employees and advisors; counted in the fully diluted total even before grants.`, lesson: "fc08-l01", category: "financial" },
  // l02
  { id: "fc08-safe", en: "SAFE (Simple Agreement for Future Equity)", ar: "اتفاقية بسيطة لحقوق ملكية مستقبلية (SAFE)", definition: md`Y Combinator's contract for future shares: no interest or maturity, converts at the next priced round at the cap or discount price.`, lesson: "fc08-l02", category: "contractual" },
  { id: "fc08-valuation-cap", en: "Valuation cap", ar: "سقف التقييم", definition: md`Maximum valuation at which a SAFE or note converts; post-money in the YC post-money SAFE, so ownership = amount / cap.`, lesson: "fc08-l02", category: "financial" },
  { id: "fc08-mfn", en: "Most-favoured-nation (MFN) clause", ar: "شرط الدولة الأولى بالرعاية", definition: md`Lets a holder adopt better terms given to later investors in the same kind of instrument before conversion.`, lesson: "fc08-l02", category: "contractual" },
  { id: "fc08-convertible-loan", en: "Convertible note / convertible loan agreement", ar: "قرض قابل للتحويل إلى أسهم", definition: md`Debt with interest and a maturity date that converts into shares at a qualifying round, usually with a cap and discount.`, lesson: "fc08-l02", category: "contractual" },
  // l03
  { id: "fc08-pre-money", en: "Pre-money valuation", ar: "التقييم قبل الاستثمار", definition: md`Agreed value of the company before the new money; divided by the pre-money fully diluted shares it gives the price per share.`, lesson: "fc08-l03", category: "financial" },
  { id: "fc08-post-money", en: "Post-money valuation", ar: "التقييم بعد الاستثمار", definition: md`Pre-money plus new money; the investor's stake is investment over post-money.`, lesson: "fc08-l03", category: "financial" },
  { id: "fc08-pool-shuffle", en: "Option pool shuffle", ar: "إدراج مجمع الخيارات في التقييم قبل الاستثمار", definition: md`Creating the post-round option pool inside the pre-money so only existing holders are diluted; equivalent to a lower effective pre-money.`, lesson: "fc08-l03", category: "financial" },
  { id: "fc08-term-sheet", en: "Term sheet", ar: "ورقة الشروط", definition: md`Short, mostly non-binding summary of a round's economic and control terms; exclusivity and confidentiality are usually binding.`, lesson: "fc08-l03", category: "contractual" },
  // l04
  { id: "fc08-vesting", en: "Vesting", ar: "الاستحقاق التدريجي للأسهم", definition: md`Earning equity over time (typically 48 months, monthly) so unvested equity returns if the holder leaves.`, lesson: "fc08-l04", category: "contractual" },
  { id: "fc08-cliff", en: "Cliff", ar: "فترة الاستحقاق الأولى (الجرف)", definition: md`Initial period (typically 12 months) before which nothing vests; at the cliff the accrued portion vests at once.`, lesson: "fc08-l04", category: "contractual" },
  { id: "fc08-leaver", en: "Good leaver / bad leaver", ar: "المغادر الحسن / المغادر السيئ", definition: md`Shareholders' agreement terms setting the price at which a departing founder's shares must be offered back, depending on the reason for leaving.`, lesson: "fc08-l04", category: "contractual" },
  { id: "fc08-acceleration", en: "Acceleration (single / double trigger)", ar: "تسريع الاستحقاق (بمحفز واحد / بمحفزين)", definition: md`Faster vesting on a change of control (single trigger) or on a change of control plus termination without cause (double trigger).`, lesson: "fc08-l04", category: "contractual" },
  { id: "fc08-83b", en: "83(b) election", ar: "اختيار المادة 83(ب) الضريبي الأمريكي", definition: md`US election, within 30 days of receiving restricted stock, to be taxed on its value at grant rather than at vesting.`, lesson: "fc08-l04", category: "financial" },
  // l05
  { id: "fc08-liquidation-preference", en: "Liquidation preference", ar: "أفضلية التصفية", definition: md`Right of preferred holders to be paid a multiple of their investment before common in a sale or liquidation.`, lesson: "fc08-l05", category: "contractual" },
  { id: "fc08-participating", en: "Participating preferred", ar: "الأسهم الممتازة المشاركة", definition: md`Preferred that takes its preference and then shares in the remaining proceeds as if converted (double dip), sometimes capped.`, lesson: "fc08-l05", category: "contractual" },
  { id: "fc08-anti-dilution", en: "Anti-dilution (weighted average / full ratchet)", ar: "الحماية من التخفيف (المتوسط المرجح / التعديل الكامل)", definition: md`Lowering the preferred conversion price after a down round: broad-based weighted average (standard) or full ratchet (reset to the new price).`, lesson: "fc08-l05", category: "contractual" },
  { id: "fc08-pro-rata", en: "Pro rata right", ar: "حق المشاركة النسبية في الجولات اللاحقة", definition: md`Right to invest enough in later rounds to keep one's percentage: ownership times round size.`, lesson: "fc08-l05", category: "contractual" },
  // l06
  { id: "fc08-bv", en: "BV (besloten vennootschap)", ar: "شركة ذات مسؤولية محدودة هولندية", definition: md`Dutch private limited company: separate legal person, notarial incorporation, minimum capital EUR 0.01 since 2012.`, lesson: "fc08-l06", category: "institutional" },
  { id: "fc08-vof", en: "VOF (vennootschap onder firma) / eenmanszaak", ar: "شركة التضامن / المؤسسة الفردية", definition: md`Dutch general partnership and sole proprietorship: no separate legal personality and unlimited personal liability.`, lesson: "fc08-l06", category: "institutional" },
  { id: "fc08-stak", en: "STAK (stichting administratiekantoor)", ar: "مؤسسة إدارة الأسهم (STAK)", definition: md`Foundation that holds shares and issues depositary receipts: holders get the economics, the STAK board votes.`, lesson: "fc08-l06", category: "institutional" },
  { id: "fc08-flip", en: "Delaware flip", ar: "إعادة الهيكلة تحت شركة أم في ديلاوير", definition: md`Creating a Delaware parent and exchanging the existing company's shares for its shares, making the existing company a subsidiary.`, lesson: "fc08-l06", category: "institutional" },
  { id: "fc08-kdipa", en: "KDIPA investment licence", ar: "ترخيص هيئة تشجيع الاستثمار المباشر (KDIPA)", definition: md`Licence from Kuwait's Direct Investment Promotion Authority under Law 116 of 2013 allowing up to 100 % foreign ownership outside the negative list.`, lesson: "fc08-l06", category: "institutional" },
  // l07
  { id: "fc08-ip-assignment", en: "IP assignment", ar: "التنازل عن حقوق الملكية الفكرية", definition: md`Written transfer to the company of IP created by founders, employees and contractors; in the Netherlands a copyright transfer requires a deed.`, lesson: "fc08-l07", category: "contractual" },
  { id: "fc08-nda", en: "Non-disclosure agreement (NDA)", ar: "اتفاقية عدم الإفصاح", definition: md`Contract restricting use and disclosure of confidential information to a stated purpose, with standard exclusions and a term.`, lesson: "fc08-l07", category: "contractual" },
  { id: "fc08-liability-cap", en: "Limitation of liability (liability cap)", ar: "تحديد سقف المسؤولية", definition: md`Contractual maximum on a party's aggregate liability, usually a multiple of 12 months' fees, with listed carve-outs.`, lesson: "fc08-l07", category: "contractual" },
  { id: "fc08-sla", en: "Service level agreement (SLA)", ar: "اتفاقية مستوى الخدمة", definition: md`Committed performance (availability, response and resolution times) with service credits as the remedy.`, lesson: "fc08-l07", category: "contractual" },
];

export default glossary;
