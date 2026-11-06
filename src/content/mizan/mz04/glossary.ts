import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "mz04-soiling-rate", en: "Soiling rate", ar: "معدل الاتساخ", definition: md`Loss fraction added per day by dust accumulation after a cleaning, e.g. 0.4 %/day; the slope of the soiling sawtooth.`, lesson: "mz04-l01", category: "technical" },
  { id: "mz04-cleaning-interval", en: "Cleaning interval", ar: "الفترة بين عمليات التنظيف", definition: md`Days between two cleanings of the same block; with rolling cleaning, the revisit interval of each block.`, lesson: "mz04-l01", category: "technical" },
  { id: "mz04-cleaning-cycle", en: "Cleaning cycle (full pass)", ar: "دورة تنظيف كاملة", definition: md`One cleaning of the whole plant; its all-in cost C (labour, water, haulage, equipment, supervision, breakage) drives the optimum.`, lesson: "mz04-l01", category: "technical" },
  { id: "mz04-square-root-rule", en: "Square-root rule", ar: "قاعدة الجذر التربيعي", definition: md`$T^* = \sqrt{2C/(pE_ds)}$: the cost-minimising cleaning interval under linear soiling.`, lesson: "mz04-l01", category: "financial" },
  { id: "mz04-residual-soiling", en: "Residual soiling", ar: "الاتساخ المتبقي", definition: md`Loss remaining right after a cleaning, from cemented dust or missed rows; does not move T* but needs periodic deep cleaning.`, lesson: "mz04-l01", category: "technical" },
  { id: "mz04-soiling-saturation", en: "Soiling saturation", ar: "تشبع الاتساخ", definition: md`Levelling-off of soiling loss over long dry periods as removal by wind balances deposition.`, lesson: "mz04-l01", category: "technical" },
  // l02
  { id: "mz04-displaced-fuel-value", en: "Displaced-fuel value of energy", ar: "قيمة الوقود المُزاح", definition: md`Heat rate of the marginal thermal unit times the fuel's opportunity price: the national value of a solar MWh in Kuwait.`, lesson: "mz04-l02", category: "financial" },
  { id: "mz04-externality", en: "Cleaning externality", ar: "الأثر الخارجي للتنظيف", definition: md`The IPP pays for cleaning but captures only the tariff, while most of the fuel saving accrues to the state, so it under-cleans.`, lesson: "mz04-l02", category: "financial" },
  { id: "mz04-side-payment", en: "Side payment (soiling bonus)", ar: "دفعة جانبية (حافز الاتساخ)", definition: md`Payment from the offtaker to the IPP, between the IPP's net cost and the state's net gain, that makes extra cleaning worthwhile for both.`, lesson: "mz04-l02", category: "contractual" },
  { id: "mz04-offtaker", en: "Offtaker", ar: "المشتري (الجهة المستلمة للطاقة)", definition: md`The buyer of the plant's energy under the PPA; in Kuwait's IPP model, MEWRE.`, lesson: "mz04-l02", category: "contractual" },
  // l03
  { id: "mz04-manual-wet", en: "Manual wet cleaning", ar: "التنظيف اليدوي بالماء", definition: md`Crews with brushes or lances and demineralised water from bowsers; mostly variable cost per cycle.`, lesson: "mz04-l03", category: "technical" },
  { id: "mz04-semi-automated", en: "Semi-automated cleaning", ar: "التنظيف شبه الآلي", definition: md`Vehicle- or tractor-mounted rotating brushes driven along rows, dry or with little water.`, lesson: "mz04-l03", category: "technical" },
  { id: "mz04-robotic-dry", en: "Robotic dry cleaning", ar: "التنظيف الروبوتي الجاف", definition: md`Autonomous waterless robots mounted on rows, usually cleaning daily; mostly fixed capex with near-zero marginal cost.`, lesson: "mz04-l03", category: "technical" },
  { id: "mz04-demineralised-water", en: "Demineralised water", ar: "مياه منزوعة المعادن", definition: md`Water with dissolved minerals removed so it leaves no spots on the glass; needed for wet cleaning, trucked to desert sites.`, lesson: "mz04-l03", category: "technical" },
  { id: "mz04-crf", en: "Capital recovery factor (CRF)", ar: "معامل استرداد رأس المال", definition: md`$r(1+r)^n/((1+r)^n-1)$: converts a capex into an equal annual cost over n years at rate r.`, lesson: "mz04-l03", category: "financial" },
  { id: "mz04-breakeven-capex", en: "Break-even capex", ar: "التكلفة الرأسمالية عند نقطة التعادل", definition: md`Robot fleet capex at which annualised robot cost equals the manual optimum at a given value of energy.`, lesson: "mz04-l03", category: "financial" },
  // l04
  { id: "mz04-cleaning-trigger", en: "Cleaning trigger", ar: "عتبة بدء التنظيف", definition: md`Soiling loss level $L^* = g/(pE_d)$ at which cleaning becomes economic; linear case $sT^*$.`, lesson: "mz04-l04", category: "technical" },
  { id: "mz04-cementation", en: "Dew-driven cementation", ar: "التصلّب الناتج عن الندى", definition: md`Dew dissolves and recrystallises species in the dust layer, cementing it to the glass so dry brushing fails.`, lesson: "mz04-l04", category: "technical" },
  { id: "mz04-evpi", en: "Expected value of perfect information (EVPI)", ar: "القيمة المتوقعة للمعلومات الكاملة", definition: md`Best expected cost without information minus expected cost if the outcome were always known first: the ceiling on a forecast's value.`, lesson: "mz04-l04", category: "financial" },
  { id: "mz04-night-stow", en: "Night stow (anti-soiling)", ar: "وضعية التخزين الليلية لتقليل الاتساخ", definition: md`Tracker angle held at night to reduce dust deposition and dew, e.g. maximum tilt towards the wind.`, lesson: "mz04-l04", category: "technical" },
  // l05
  { id: "mz04-fleet-availability", en: "Robot fleet availability", ar: "جاهزية أسطول الروبوتات", definition: md`Share of robot-days in service; with repair time D it sets extra soiling loss $(1-A)sD/2$.`, lesson: "mz04-l05", category: "technical" },
  { id: "mz04-common-mode-failure", en: "Common-mode failure", ar: "عطل مشترك النمط", definition: md`One cause that stops every robot at once (software, design, supply); the dominant cleaning risk.`, lesson: "mz04-l05", category: "technical" },
  { id: "mz04-natural-experiment", en: "Natural experiment", ar: "تجربة طبيعية", definition: md`An unplanned event (such as a cleaning outage) that creates a comparison researchers could not ethically or practically arrange.`, lesson: "mz04-l05", category: "pm" },
  { id: "mz04-cleaning-as-a-service", en: "Cleaning as a service", ar: "التنظيف كخدمة", definition: md`Vendor owns and runs the robots and charges per MWp per year, taking capex and performance risk at a premium.`, lesson: "mz04-l05", category: "contractual" },
  // l06
  { id: "mz04-mv", en: "Measurement and verification (M&V)", ar: "القياس والتحقق", definition: md`Agreed method for computing savings against an adjusted baseline, as in the IPMVP framework.`, lesson: "mz04-l06", category: "contractual" },
  { id: "mz04-adjusted-baseline", en: "Adjusted baseline", ar: "خط الأساس المعدّل", definition: md`What the plant would have produced under the old policy in the same weather, from temperature-corrected PR with agreed exclusions.`, lesson: "mz04-l06", category: "technical" },
  { id: "mz04-paired-blocks", en: "Paired control blocks", ar: "كتل المقارنة المزدوجة", definition: md`Matched blocks run under the new and old policy in the same period so weather cancels in the difference.`, lesson: "mz04-l06", category: "technical" },
  { id: "mz04-gain-sharing", en: "Gain-sharing", ar: "تقاسم الوفورات", definition: md`Fee equal to a share of verified net savings, usually with a fixed floor and a cap.`, lesson: "mz04-l06", category: "contractual" },
];

export default glossary;
