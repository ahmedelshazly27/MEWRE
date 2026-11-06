import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "sh07-nonprofit", en: "Nonprofit organisation", ar: "منظمة غير ربحية", definition: md`An entity that may earn a surplus but may not distribute it to founders, members or directors (the non-distribution constraint); has no shares to sell.`, lesson: "sh07-l01", category: "institutional" },
  { id: "sh07-foundation", en: "Foundation (stichting, ADGM or DIFC foundation)", ar: "مؤسسة غير ربحية (مؤسسة ذات شخصية اعتبارية بلا مساهمين)", definition: md`A legal person without members or shareholders, governed by a board for a stated purpose; used for nonprofits, for holding control of companies, and for research bodies.`, lesson: "sh07-l01", category: "institutional" },
  { id: "sh07-for-profit", en: "For-profit company", ar: "شركة ربحية", definition: md`A company that may distribute profit and issue shares and options (free-zone LLC, Delaware C-corp, Dutch BV).`, lesson: "sh07-l01", category: "institutional" },
  { id: "sh07-hybrid", en: "Hybrid structure", ar: "هيكل هجين (ربحي وغير ربحي)", definition: md`Linked nonprofit and for-profit entities, or a for-profit with a legal mission lock: nonprofit owning a trading company, company with a sister foundation, steward ownership, public benefit corporation.`, lesson: "sh07-l01", category: "institutional" },
  { id: "sh07-trading-subsidiary", en: "Trading subsidiary", ar: "شركة تابعة تجارية", definition: md`A taxable company owned by a nonprofit that runs commercial activities and passes its profit to the parent's mission.`, lesson: "sh07-l01", category: "institutional" },
  { id: "sh07-fiscal-sponsorship", en: "Fiscal sponsorship", ar: "الرعاية المالية (استضافة مشروع لدى جهة قائمة)", definition: md`An unincorporated project operating under an existing organisation's entity, which holds the money and contracts for a fee. Break-even with your own entity at $R^{*} = C_e/f$.`, lesson: "sh07-l01", category: "contractual" },
  { id: "sh07-free-zone", en: "Free zone", ar: "منطقة حرة", definition: md`A UAE jurisdiction with its own licensing authority allowing 100 % foreign ownership; activities are limited to the licence list and onshore trading may need extra steps.`, lesson: "sh07-l01", category: "institutional" },
  { id: "sh07-pbc", en: "Public benefit corporation", ar: "شركة ذات منفعة عامة", definition: md`A for-profit company whose charter names a public benefit that directors must balance against shareholder returns; Delaware since 2013; MLH is one.`, lesson: "sh07-l01", category: "institutional" },
  { id: "sh07-mission-lock", en: "Mission lock (asset lock)", ar: "قفل الرسالة (تقييد الأصول لغرضها)", definition: md`Any legal mechanism that stops a future board or owner abandoning the purpose or stripping the assets: nonprofit status, golden share, purpose trust, charter clause.`, lesson: "sh07-l01", category: "contractual" },
  { id: "sh07-steward-ownership", en: "Steward ownership", ar: "ملكية الوصاية (الملكية المؤتمنة على الرسالة)", definition: md`Voting control held by a trust or foundation bound to the purpose, separate from economic rights; Patagonia (2022) is a well-known example.`, lesson: "sh07-l01", category: "institutional" },
  { id: "sh07-ubi", en: "Unrelated business income", ar: "دخل من نشاط تجاري غير مرتبط بالغرض", definition: md`Under US rules, income of an exempt organisation from a trade regularly carried on and not substantially related to its purpose; taxable and, in excess, a threat to exemption.`, lesson: "sh07-l01", category: "financial" },
  // l02
  { id: "sh07-sponsorship-tier", en: "Sponsorship tier", ar: "فئة الرعاية", definition: md`A packaged level of sponsor benefits at a set price; MLH recommends three, with the top at no more than 25 % of the event budget.`, lesson: "sh07-l02", category: "contractual" },
  { id: "sh07-in-kind", en: "In-kind sponsorship", ar: "رعاية عينية", definition: md`Non-cash contributions (API credits, GPU hours, venue, food), valued for reporting but never counted as cash for the budget.`, lesson: "sh07-l02", category: "financial" },
  { id: "sh07-success-fee", en: "Success fee (placement fee)", ar: "رسوم النجاح (عمولة التوظيف)", definition: md`A recruiting fee paid only when a candidate is hired, usually a share of first-year salary with a replacement guarantee.`, lesson: "sh07-l02", category: "contractual" },
  { id: "sh07-cpm", en: "CPM (cost per thousand)", ar: "التكلفة لكل ألف ظهور", definition: md`Media price per thousand opens, listens or impressions; small for a young audience.`, lesson: "sh07-l02", category: "financial" },
  { id: "sh07-restricted-funds", en: "Restricted funds", ar: "أموال مقيدة الغرض", definition: md`Money that may be spent only on a named project or purpose, usually grants; contrasted with unrestricted funds.`, lesson: "sh07-l02", category: "financial" },
  // l03
  { id: "sh07-revenue-mix", en: "Revenue mix", ar: "مزيج الإيرادات", definition: md`The split of revenue across streams and payers; determines blended margin and concentration.`, lesson: "sh07-l03", category: "financial" },
  { id: "sh07-concentration-risk", en: "Concentration risk", ar: "مخاطر التركّز", definition: md`Dependence on one stream or payer; measured by the largest share and by $H = \sum s_i^2$.`, lesson: "sh07-l03", category: "financial" },
  { id: "sh07-hhi", en: "Herfindahl-Hirschman index", ar: "مؤشر هيرفندال-هيرشمان للتركّز", definition: md`Sum of squared shares; $N_{\text{eff}} = 1/H$ is the equivalent number of equal sources.`, lesson: "sh07-l03", category: "financial" },
  { id: "sh07-contribution", en: "Contribution margin by stream", ar: "هامش المساهمة لكل مصدر إيراد", definition: md`Stream revenue minus its direct delivery costs, as a share of revenue; the basis for allocating lead time.`, lesson: "sh07-l03", category: "financial" },
  { id: "sh07-sponsor-ltv", en: "Sponsor lifetime value", ar: "القيمة الدائمة للراعي", definition: md`$P\,m/(1-r)$: annual package times fulfilment margin times expected years retained.`, lesson: "sh07-l03", category: "financial" },
  // l04
  { id: "sh07-stipend", en: "Stipend", ar: "مكافأة شهرية رمزية", definition: md`A fixed monthly payment below market pay, paid to leads once the pay trigger is met.`, lesson: "sh07-l04", category: "financial" },
  { id: "sh07-phantom-equity", en: "Phantom equity", ar: "حقوق ملكية صورية", definition: md`A contractual right to cash equal to the value of shares on a sale or dividend, without being a shareholder.`, lesson: "sh07-l04", category: "contractual" },
  { id: "sh07-conflict-of-interest", en: "Conflict of interest", ar: "تضارب المصالح", definition: md`A personal or employer interest that could influence a decision taken for the organisation; handled by declare, record, recuse, approve.`, lesson: "sh07-l04", category: "pm" },
  { id: "sh07-recusal", en: "Recusal", ar: "التنحي عن اتخاذ القرار", definition: md`A conflicted person stepping out of negotiating, voting, judging or introducing on the matter.`, lesson: "sh07-l04", category: "pm" },
  { id: "sh07-separation-of-duties", en: "Separation of duties", ar: "الفصل بين المهام", definition: md`The rule that the person approving a payment does not initiate or receive it.`, lesson: "sh07-l04", category: "financial" },
  // l05
  { id: "sh07-fund-returner", en: "Fund returner", ar: "استثمار يعيد قيمة الصندوق كاملة", definition: md`An investment whose exit alone returns the whole fund: $V_{\text{exit}} = F_{\text{fund}}/p_{\text{exit}}$.`, lesson: "sh07-l05", category: "financial" },
  { id: "sh07-sponsor-capture", en: "Sponsor capture", ar: "هيمنة الراعي", definition: md`Drift of programme, judging or editorial towards a dominant sponsor through concentration or exclusivity.`, lesson: "sh07-l05", category: "pm" },
  { id: "sh07-category-exclusivity", en: "Category exclusivity", ar: "الحصرية القطاعية", definition: md`A sponsor term excluding competitors in the same category; acceptable per event at a premium, risky across a whole community.`, lesson: "sh07-l05", category: "contractual" },
  // l06
  { id: "sh07-decision-memo", en: "Decision memo", ar: "مذكرة قرار", definition: md`One page stating decision, options, criteria and weights, scores and sensitivity, staged recommendation, risks and questions for counsel.`, lesson: "sh07-l06", category: "pm" },
];

export default glossary;
