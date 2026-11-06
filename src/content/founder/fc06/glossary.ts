import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "fc06-income-statement", en: "Income statement (P&L)", ar: "قائمة الدخل (الأرباح والخسائر)", definition: md`Revenue earned minus costs incurred over a period, ending in net income. Measures performance on an accrual basis, not cash.`, lesson: "fc06-l01", category: "financial" },
  { id: "fc06-balance-sheet", en: "Balance sheet", ar: "الميزانية العمومية (قائمة المركز المالي)", definition: md`Snapshot at a date of what the company owns (assets) and owes (liabilities), with equity as the difference: $A = L + E$.`, lesson: "fc06-l01", category: "financial" },
  { id: "fc06-cash-flow-statement", en: "Cash flow statement", ar: "قائمة التدفقات النقدية", definition: md`Explains the change in cash over a period in three parts: operating, investing and financing cash flows.`, lesson: "fc06-l01", category: "financial" },
  { id: "fc06-accrual-accounting", en: "Accrual accounting", ar: "المحاسبة على أساس الاستحقاق", definition: md`Records revenue when earned and costs when incurred, regardless of when cash moves; the gaps sit in receivables, payables, inventory and deferred revenue.`, lesson: "fc06-l01", category: "financial" },
  { id: "fc06-deferred-revenue", en: "Deferred revenue", ar: "الإيرادات المؤجلة", definition: md`A liability for cash received or billed in advance of delivering the service; released to revenue as the obligation is satisfied.`, lesson: "fc06-l01", category: "financial" },
  { id: "fc06-accounts-receivable", en: "Accounts receivable", ar: "الذمم المدينة", definition: md`Amounts customers owe for goods or services already delivered and invoiced.`, lesson: "fc06-l01", category: "financial" },
  { id: "fc06-depreciation", en: "Depreciation and amortisation", ar: "الإهلاك والإطفاء", definition: md`Systematic expensing of a capitalised asset's cost over its useful life: depreciation for tangible assets, amortisation for intangibles. Non-cash.`, lesson: "fc06-l01", category: "financial" },
  { id: "fc06-working-capital", en: "Working capital", ar: "رأس المال العامل", definition: md`Receivables plus inventory minus payables and deferred revenue: cash tied up in, or supplied by, day-to-day operations.`, lesson: "fc06-l01", category: "financial" },
  // l02
  { id: "fc06-cac", en: "Customer acquisition cost (CAC)", ar: "تكلفة اكتساب العميل", definition: md`Fully loaded sales and marketing cost per new paying customer, including founder selling time and unpaid pilots.`, lesson: "fc06-l02", category: "financial" },
  { id: "fc06-ltv", en: "Customer lifetime value (LTV)", ar: "القيمة الدائمة للعميل", definition: md`Gross profit expected from a customer over its life: $ARPA\cdot GM/c$, or $ARPA\cdot GM/(c+d)$ discounted.`, lesson: "fc06-l02", category: "financial" },
  { id: "fc06-churn", en: "Churn", ar: "معدل فقدان العملاء", definition: md`Share of customers (logo churn) or recurring revenue (revenue churn) lost per period.`, lesson: "fc06-l02", category: "financial" },
  { id: "fc06-gross-margin", en: "Gross margin", ar: "هامش الربح الإجمالي", definition: md`(Revenue - cost of goods sold) / revenue.`, lesson: "fc06-l02", category: "financial" },
  { id: "fc06-contribution-margin", en: "Contribution margin", ar: "هامش المساهمة", definition: md`Revenue minus all costs that scale with each unit or customer, as a share of revenue: what each extra customer contributes to fixed costs.`, lesson: "fc06-l02", category: "financial" },
  { id: "fc06-cac-payback", en: "CAC payback period", ar: "فترة استرداد تكلفة اكتساب العميل", definition: md`Months of gross profit needed to recover CAC: $CAC/(ARPA\cdot GM)$.`, lesson: "fc06-l02", category: "financial" },
  // l03
  { id: "fc06-arr", en: "Annual recurring revenue (ARR)", ar: "الإيرادات السنوية المتكررة", definition: md`Annualised value of committed, live recurring contracts; excludes pilots, services and outright hardware sales.`, lesson: "fc06-l03", category: "financial" },
  { id: "fc06-nrr", en: "Net revenue retention (NRR)", ar: "صافي الاحتفاظ بالإيرادات", definition: md`A cohort's recurring revenue today including expansion, contraction and churn, divided by its revenue 12 months ago.`, lesson: "fc06-l03", category: "financial" },
  { id: "fc06-burn-multiple", en: "Burn multiple", ar: "مضاعف الحرق", definition: md`Net cash burn divided by net new ARR over the same period: euros burned per euro of recurring revenue added.`, lesson: "fc06-l03", category: "financial" },
  { id: "fc06-cash-conversion-cycle", en: "Cash conversion cycle", ar: "دورة التحويل النقدي", definition: md`Days inventory outstanding plus days sales outstanding minus days payables outstanding.`, lesson: "fc06-l03", category: "financial" },
  // l04
  { id: "fc06-burn-rate", en: "Burn rate (gross and net)", ar: "معدل حرق النقد (الإجمالي والصافي)", definition: md`Gross burn is total monthly cash out; net burn is cash out minus cash in.`, lesson: "fc06-l04", category: "financial" },
  { id: "fc06-runway", en: "Runway", ar: "المدرج النقدي (مدة كفاية النقد)", definition: md`Months until cash reaches zero at the forward-looking net burn.`, lesson: "fc06-l04", category: "financial" },
  { id: "fc06-default-alive", en: "Default alive", ar: "البقاء الافتراضي (القدرة على البقاء دون تمويل جديد)", definition: md`On current expenses and growth, the company reaches profitability before running out of cash, without new funding.`, lesson: "fc06-l04", category: "financial" },
  // l05
  { id: "fc06-driver-based-model", en: "Driver-based financial model", ar: "النموذج المالي القائم على المحركات", definition: md`A model whose outputs are calculated from operational drivers (funnel volumes, conversion, ACV, hires, unit costs) rather than typed-in totals.`, lesson: "fc06-l05", category: "financial" },
  { id: "fc06-acv", en: "Annual contract value (ACV)", ar: "القيمة السنوية للعقد", definition: md`Average annualised value of a customer contract, excluding one-off fees.`, lesson: "fc06-l05", category: "financial" },
  // l06
  { id: "fc06-price-elasticity", en: "Price elasticity of demand", ar: "مرونة الطلب السعرية", definition: md`Percentage change in quantity demanded per percentage change in price.`, lesson: "fc06-l06", category: "financial" },
  { id: "fc06-value-based-pricing", en: "Value-based pricing", ar: "التسعير القائم على القيمة", definition: md`Setting price from the customer's economic value and next-best alternative rather than from your cost.`, lesson: "fc06-l06", category: "financial" },
  { id: "fc06-price-discrimination", en: "Price discrimination", ar: "التمييز السعري", definition: md`Charging different prices to different customers or for different versions, held apart by fences; first, second and third degree.`, lesson: "fc06-l06", category: "financial" },
  // l07
  { id: "fc06-sensitivity-tornado", en: "Tornado chart (sensitivity analysis)", ar: "مخطط الإعصار (تحليل الحساسية)", definition: md`Bar chart of the output swing when each driver moves between its low and high value, ranked by size.`, lesson: "fc06-l07", category: "financial" },
  { id: "fc06-budget-variance", en: "Budget variance", ar: "انحراف الموازنة", definition: md`Actual minus budget for a line, labelled favourable or unfavourable and split into volume, price and timing causes.`, lesson: "fc06-l07", category: "financial" },
  // l08
  { id: "fc06-network-effects", en: "Network effects", ar: "تأثيرات الشبكة", definition: md`Value to each user rises with the number of users (direct) or with participants on the other side (indirect).`, lesson: "fc06-l08", category: "financial" },
  { id: "fc06-switching-costs", en: "Switching costs", ar: "تكاليف التحول", definition: md`The total cost to a customer of moving to an alternative supplier: migration, integration, retraining, re-validation and contract exit.`, lesson: "fc06-l08", category: "financial" },
];

export default glossary;
