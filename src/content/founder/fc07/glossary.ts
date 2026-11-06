import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "fc07-limited-partner", en: "Limited partner (LP)", ar: "الشريك المحدود (المستثمر في الصندوق)", definition: md`Investor that commits capital to a venture fund (pension fund, endowment, fund of funds, family office, sovereign vehicle) and has no say in individual deals.`, lesson: "fc07-l01", category: "financial" },
  { id: "fc07-general-partner", en: "General partner (GP)", ar: "الشريك العام (مدير الصندوق)", definition: md`The fund manager and its partners: they choose investments, sit on boards and earn the management fee and carried interest.`, lesson: "fc07-l01", category: "financial" },
  { id: "fc07-management-fee", en: "Management fee", ar: "رسوم الإدارة", definition: md`Annual fee (about 2 % of commitments) paid by LPs to run the fund; over a 10-year life it consumes roughly 20 % of commitments.`, lesson: "fc07-l01", category: "financial" },
  { id: "fc07-carried-interest", en: "Carried interest (carry)", ar: "حصة الأداء (الفائدة المحمولة)", definition: md`The GP's share of fund profits (typically 20 %), paid after LPs have their contributed capital back (and any hurdle).`, lesson: "fc07-l01", category: "financial" },
  { id: "fc07-tvpi-dpi", en: "TVPI and DPI", ar: "مضاعف القيمة الإجمالية ومضاعف التوزيعات إلى رأس المال المدفوع", definition: md`TVPI: (distributions plus remaining value) / paid-in capital. DPI: distributions only / paid-in capital. DPI is cash actually returned.`, lesson: "fc07-l01", category: "financial" },
  { id: "fc07-power-law", en: "Power law (venture returns)", ar: "قانون القوة في عوائد رأس المال الجريء", definition: md`Highly skewed outcome distribution in which one or two investments produce most of a fund's proceeds.`, lesson: "fc07-l01", category: "financial" },
  { id: "fc07-fund-returner", en: "Fund-returner", ar: "صفقة تعيد كامل قيمة الصندوق", definition: md`An investment whose proceeds alone equal or exceed the fund size; requires an exit of at least fund size divided by exit ownership.`, lesson: "fc07-l01", category: "financial" },
  // l02
  { id: "fc07-pre-money", en: "Pre-money valuation", ar: "التقييم قبل الاستثمار", definition: md`Agreed value of the company immediately before new money, on a fully diluted basis; price per share is pre-money divided by fully diluted pre-money shares.`, lesson: "fc07-l02", category: "financial" },
  { id: "fc07-post-money", en: "Post-money valuation", ar: "التقييم بعد الاستثمار", definition: md`Pre-money plus new money; new investors own new money divided by post-money.`, lesson: "fc07-l02", category: "financial" },
  { id: "fc07-dilution", en: "Dilution", ar: "تخفيف نسبة الملكية", definition: md`Reduction in an existing holder's percentage when new shares are issued (new investors, option pool, conversions); successive dilutions multiply.`, lesson: "fc07-l02", category: "financial" },
  { id: "fc07-safe", en: "SAFE (Simple Agreement for Future Equity)", ar: "اتفاقية بسيطة لحقوق ملكية مستقبلية (SAFE)", definition: md`Y Combinator instrument giving the right to shares at the next priced round, usually with a valuation cap; the post-money version fixes the holder's percentage at investment divided by cap.`, lesson: "fc07-l02", category: "contractual" },
  { id: "fc07-valuation-cap", en: "Valuation cap", ar: "سقف التقييم", definition: md`Maximum valuation at which a SAFE or convertible converts; protects early investors if the next round prices high.`, lesson: "fc07-l02", category: "contractual" },
  { id: "fc07-mfn", en: "Most-favoured-nation (MFN) clause", ar: "شرط الدولة الأكثر رعاية", definition: md`Right of an (often uncapped) SAFE holder to take the better terms of any later SAFE issued before the priced round.`, lesson: "fc07-l02", category: "contractual" },
  { id: "fc07-runway", en: "Runway", ar: "المدة المتبقية قبل نفاد السيولة", definition: md`Months until cash runs out at the current net burn: cash divided by net burn.`, lesson: "fc07-l02", category: "financial" },
  { id: "fc07-burn-rate", en: "Net burn rate", ar: "معدل الحرق النقدي الصافي", definition: md`Cash out minus cash in per month; report the trailing three-month average.`, lesson: "fc07-l02", category: "financial" },
  // l03
  { id: "fc07-non-dilutive", en: "Non-dilutive funding", ar: "تمويل لا يخفف الملكية", definition: md`Money that does not require selling equity: grants, tax credits (WBSO), innovation loans (Innovatiekrediet), customer prepayments.`, lesson: "fc07-l03", category: "financial" },
  { id: "fc07-wbso", en: "WBSO (Dutch R&D tax credit)", ar: "حافز ضريبي هولندي للبحث والتطوير (WBSO)", definition: md`Reduction of payroll tax and contributions for qualifying R&D work by staff on a Dutch payroll; 2026: 36 % (50 % starters) up to EUR 391,020, 16 % above.`, lesson: "fc07-l03", category: "institutional" },
  { id: "fc07-innovatiekrediet", en: "Innovatiekrediet (Innovation Credit)", ar: "قرض الابتكار الهولندي", definition: md`RVO loan for technically risky development projects: up to 45 % of project costs for small firms, minimum project EUR 150k.`, lesson: "fc07-l03", category: "institutional" },
  { id: "fc07-accelerator", en: "Accelerator", ar: "مسرّعة أعمال", definition: md`Fixed-term programme that invests a fixed cheque for a fixed percentage (YC: USD 125k for 7 % plus a USD 375k MFN SAFE) and adds network and a demo day.`, lesson: "fc07-l03", category: "institutional" },
  { id: "fc07-fund-of-funds", en: "Fund of funds", ar: "صندوق الصناديق", definition: md`Vehicle that invests in venture funds rather than startups; in the Gulf, state-backed examples (Saudi Venture Capital, Jada) anchor many regional VCs.`, lesson: "fc07-l03", category: "institutional" },
  // l04
  { id: "fc07-bottom-up-sizing", en: "Bottom-up market sizing", ar: "تقدير حجم السوق من الأسفل إلى الأعلى", definition: md`Market size computed as reachable buying accounts times annual contract value, rather than from a top-down industry total.`, lesson: "fc07-l04", category: "pm" },
  { id: "fc07-why-now", en: "Why now", ar: "لماذا الآن", definition: md`The specific change (regulation, technology, buyer behaviour) that makes the company possible or necessary now.`, lesson: "fc07-l04", category: "pm" },
  // l05
  { id: "fc07-data-room", en: "Data room", ar: "غرفة البيانات", definition: md`Access-controlled set of company documents (corporate, cap table, financials, customer, IP, legal) shared with investors for due diligence.`, lesson: "fc07-l05", category: "pm" },
  { id: "fc07-due-diligence", en: "Due diligence", ar: "العناية الواجبة (الفحص النافي للجهالة)", definition: md`Investor's verification of the company's claims, legal standing and risks before closing an investment.`, lesson: "fc07-l05", category: "contractual" },
  { id: "fc07-burn-multiple", en: "Burn multiple", ar: "مضاعف الحرق النقدي", definition: md`Net burn divided by net new ARR over the same period; measures capital efficiency of growth.`, lesson: "fc07-l05", category: "financial" },
  // l06
  { id: "fc07-lead-investor", en: "Lead investor", ar: "المستثمر الرئيسي (قائد الجولة)", definition: md`Investor who sets price and terms for a round and usually writes the largest cheque; followers commit once a lead exists.`, lesson: "fc07-l06", category: "financial" },
  // l07
  { id: "fc07-term-sheet", en: "Term sheet", ar: "ورقة الشروط", definition: md`Summary of a proposed financing's economic and control terms; mostly non-binding except confidentiality, no-shop and sometimes costs.`, lesson: "fc07-l07", category: "contractual" },
  { id: "fc07-liquidation-preference", en: "Liquidation preference", ar: "أفضلية التصفية", definition: md`Right of preferred shareholders to receive a multiple of their investment before common in a sale or liquidation; non-participating or participating.`, lesson: "fc07-l07", category: "contractual" },
  { id: "fc07-anti-dilution", en: "Anti-dilution protection", ar: "الحماية من تخفيف الملكية", definition: md`Adjustment of the preferred conversion price in a down round; broad-based weighted average is standard, full ratchet is punitive.`, lesson: "fc07-l07", category: "contractual" },
  { id: "fc07-protective-provisions", en: "Protective provisions", ar: "أحكام الحماية (حقوق النقض للمستثمرين)", definition: md`Actions requiring approval of the preferred shareholders (new senior shares, sale, changes to their rights); should not include operating decisions.`, lesson: "fc07-l07", category: "contractual" },
];

export default glossary;
