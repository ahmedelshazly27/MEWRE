import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "sh03-event-pnl", en: "Event P&L", ar: "قائمة أرباح وخسائر الفعالية", definition: md`Revenue (tickets plus sponsorship) minus total cost (fixed, variable, fulfilment, contingency) for one event.`, lesson: "sh03-l01", category: "financial" },
  { id: "sh03-fixed-cost", en: "Fixed cost (event)", ar: "التكلفة الثابتة", definition: md`A cost that does not change with attendance: venue hire, production, prizes, marketing.`, lesson: "sh03-l01", category: "financial" },
  { id: "sh03-variable-cost", en: "Variable cost per attendee", ar: "التكلفة المتغيرة لكل حاضر", definition: md`A cost that scales with headcount: catering, swag, badges.`, lesson: "sh03-l01", category: "financial" },
  { id: "sh03-break-even-attendance", en: "Break-even attendance", ar: "عدد الحضور عند نقطة التعادل", definition: md`Attendance at which revenue equals cost; a floor for paid events and a ceiling for free, sponsor-funded ones.`, lesson: "sh03-l01", category: "financial" },
  { id: "sh03-contribution-margin", en: "Contribution margin", ar: "هامش المساهمة", definition: md`Price minus variable cost, as an amount or a share of price; for a sponsor tier, price minus fulfilment cost.`, lesson: "sh03-l01", category: "financial" },
  { id: "sh03-fulfilment", en: "Sponsor fulfilment", ar: "تنفيذ مزايا الرعاية", definition: md`Delivering the benefits promised to a sponsor, and the cost of doing so (booths, seats, production, branding).`, lesson: "sh03-l01", category: "pm" },
  // l02
  { id: "sh03-contingency", en: "Contingency", ar: "مخصص الطوارئ", definition: md`A percentage held on top of the base budget for unplanned costs on planned scope.`, lesson: "sh03-l02", category: "financial" },
  { id: "sh03-deposit", en: "Deposit", ar: "العربون (الدفعة المقدمة)", definition: md`A part payment made when a supplier contract is signed, usually non-refundable or refundable only on a schedule.`, lesson: "sh03-l02", category: "contractual" },
  { id: "sh03-peak-funding", en: "Peak funding need", ar: "ذروة الاحتياج التمويلي", definition: md`The most negative cumulative cash position of an event; the float that must be funded before sponsor and ticket cash arrives.`, lesson: "sh03-l02", category: "financial" },
  { id: "sh03-cancellation-exposure", en: "Cancellation exposure", ar: "التعرض لخسائر الإلغاء", definition: md`Non-refundable supplier commitments at a date minus the cash you could keep if you cancelled.`, lesson: "sh03-l02", category: "financial" },
  { id: "sh03-in-kind", en: "In-kind contribution", ar: "المساهمة العينية", definition: md`Support given as goods or services (venue, food, credits) instead of cash; valued at the cost it avoids.`, lesson: "sh03-l02", category: "financial" },
  { id: "sh03-payment-terms", en: "Payment terms (net 30, 60, 90)", ar: "شروط السداد (خلال 30 أو 60 أو 90 يوماً)", definition: md`The number of days after an invoice (or purchase order) within which the buyer pays.`, lesson: "sh03-l02", category: "contractual" },
  // l03
  { id: "sh03-sponsorship-tier", en: "Sponsorship tier", ar: "فئة الرعاية", definition: md`A packaged level of sponsorship with a price, a capped number of slots and a defined set of benefits.`, lesson: "sh03-l03", category: "pm" },
  { id: "sh03-prospectus", en: "Sponsorship prospectus", ar: "كتيّب عروض الرعاية", definition: md`The document describing the audience, the tiers, the benefits, the prices and the terms of an event's sponsorship.`, lesson: "sh03-l03", category: "pm" },
  { id: "sh03-cpql", en: "Cost per qualified lead", ar: "التكلفة لكل عميل محتمل مؤهَّل", definition: md`Price paid divided by consented leads meeting the sponsor's written qualification criteria.`, lesson: "sh03-l03", category: "financial" },
  { id: "sh03-value-ratio", en: "Value-to-price ratio", ar: "نسبة القيمة إلى السعر", definition: md`Sponsor's expected outcome value (outcomes times its alternative cost per outcome) divided by the package price.`, lesson: "sh03-l03", category: "financial" },
  { id: "sh03-exclusivity", en: "Category exclusivity", ar: "الحصرية ضمن الفئة", definition: md`A promise that no competitor of the sponsor in a defined category will sponsor the same event.`, lesson: "sh03-l03", category: "contractual" },
  { id: "sh03-consent", en: "Consent (opt-in)", ar: "الموافقة المسبقة الصريحة", definition: md`An attendee's explicit, purpose-specific agreement to have personal data shared, for example a CV with hiring sponsors.`, lesson: "sh03-l03", category: "institutional" },
  // l04
  { id: "sh03-vendor-registration", en: "Vendor registration", ar: "تسجيل المورّد", definition: md`A buyer's process for approving a new supplier (commercial registration, tax certificates, bank letter) before a purchase order can be issued.`, lesson: "sh03-l04", category: "institutional" },
  { id: "sh03-purchase-order", en: "Purchase order (PO)", ar: "أمر الشراء", definition: md`The buyer's formal authorisation of a purchase; most large Gulf companies will not pay an invoice without one.`, lesson: "sh03-l04", category: "contractual" },
  { id: "sh03-budget-cycle", en: "Budget cycle", ar: "دورة إعداد الميزانية", definition: md`The yearly process of drafting and approving next year's budgets, which decides which events a sponsor can fund.`, lesson: "sh03-l04", category: "institutional" },
  { id: "sh03-weighted-pipeline", en: "Weighted pipeline", ar: "خط الصفقات المرجّح", definition: md`The sum of deal values times their stage probabilities.`, lesson: "sh03-l04", category: "financial" },
  // l05
  { id: "sh03-sponsor-report", en: "Sponsor report", ar: "تقرير الراعي", definition: md`The post-event report of delivered benefits and outcomes against the sponsor's metric, with denominators and methods.`, lesson: "sh03-l05", category: "pm" },
  { id: "sh03-make-good", en: "Make-good", ar: "التعويض عن الإخلال بالالتزام", definition: md`Compensation, usually credit or extra benefits at a later event, for a missed contracted promise.`, lesson: "sh03-l05", category: "contractual" },
  { id: "sh03-renewal-rate", en: "Renewal rate", ar: "معدل تجديد الرعاية", definition: md`Share of sponsors from one cycle who sponsor again in the next.`, lesson: "sh03-l05", category: "financial" },
  { id: "sh03-annual-partnership", en: "Annual partnership (multi-event package)", ar: "الشراكة السنوية (باقة الفعاليات المتعددة)", definition: md`One contract covering several events over a year, usually at a discount to the sum of list prices.`, lesson: "sh03-l05", category: "contractual" },
  // l06
  { id: "sh03-no-show", en: "No-show rate", ar: "نسبة عدم الحضور", definition: md`Share of registered or approved people who do not attend.`, lesson: "sh03-l06", category: "pm" },
  { id: "sh03-overbooking", en: "Overbooking", ar: "قبول تسجيلات تفوق السعة", definition: md`Accepting more registrations than seats because some registrants will not attend.`, lesson: "sh03-l06", category: "pm" },
  { id: "sh03-early-bird", en: "Early-bird ticket", ar: "تذكرة الحجز المبكر", definition: md`A discounted ticket available for a limited time or quantity, used to bring sales forward and measure demand.`, lesson: "sh03-l06", category: "financial" },
  { id: "sh03-travel-grant", en: "Travel grant", ar: "منحة السفر", definition: md`Funding, often sponsor-provided, that covers a selected builder's travel and stay to attend an event.`, lesson: "sh03-l06", category: "financial" },
];

export default glossary;
