import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "fc01-venture-capital", en: "Venture capital (VC)", ar: "رأس المال الجريء", definition: md`Equity funding from funds that back many high-risk companies, expecting a few large outcomes to pay for the many failures.`, lesson: "fc01-l01", category: "financial" },
  { id: "fc01-power-law", en: "Power-law returns", ar: "العوائد وفق قانون القوة", definition: md`A distribution where a few outcomes are vastly larger than the rest; in venture portfolios the best company often returns more than all others combined.`, lesson: "fc01-l01", category: "financial" },
  { id: "fc01-fund-returner", en: "Fund-returner", ar: "شركة تعيد كامل قيمة الصندوق", definition: md`A single investment whose exit, at the investor's diluted ownership, returns the whole fund: $V = F/o_{exit}$.`, lesson: "fc01-l01", category: "financial" },
  { id: "fc01-burn-rate", en: "Burn rate (gross and net)", ar: "معدل الحرق النقدي (الإجمالي والصافي)", definition: md`Gross burn is total monthly spending; net burn is spending minus cash revenue.`, lesson: "fc01-l01", category: "financial" },
  { id: "fc01-runway", en: "Runway", ar: "المدرج النقدي (مدة التشغيل المتبقية)", definition: md`Months until cash runs out at the current net burn: cash divided by net burn. Ignores growth.`, lesson: "fc01-l01", category: "financial" },
  { id: "fc01-default-alive", en: "Default alive / default dead", ar: "قابلة للبقاء افتراضياً / محكوم عليها بالتوقف افتراضياً", definition: md`Whether the company reaches profitability on its current cash if expenses follow plan and revenue keeps its recent growth rate.`, lesson: "fc01-l01", category: "financial" },
  { id: "fc01-growth-rate", en: "Growth rate (weekly, monthly)", ar: "معدل النمو (أسبوعي، شهري)", definition: md`Percentage increase per period in revenue or usage; compounds as $(1+g)^n$.`, lesson: "fc01-l01", category: "financial" },
  // l02
  { id: "fc01-pre-seed", en: "Pre-seed round", ar: "جولة ما قبل البذرة", definition: md`The first outside money, often on SAFEs or from an accelerator, to retire solution risk with an early product and design partners.`, lesson: "fc01-l02", category: "financial" },
  { id: "fc01-seed-round", en: "Seed round", ar: "جولة البذرة (التمويل التأسيسي)", definition: md`Funding to reach product-market fit: paying customers who renew and expand, typically with 18 to 24 months of runway.`, lesson: "fc01-l02", category: "financial" },
  { id: "fc01-series-a", en: "Series A", ar: "جولة التمويل الأولى (السلسلة أ)", definition: md`First large priced round, funding a repeatable go-to-market motion once product-market fit is evident.`, lesson: "fc01-l02", category: "financial" },
  { id: "fc01-pre-post-money", en: "Pre-money and post-money valuation", ar: "التقييم قبل الاستثمار وبعده", definition: md`Pre-money is the agreed value before new money; post-money = pre-money + investment; the investor owns investment divided by post-money.`, lesson: "fc01-l02", category: "financial" },
  { id: "fc01-dilution", en: "Dilution", ar: "تخفيف نسبة الملكية", definition: md`Reduction of existing holders' percentage when new shares are issued; each round multiplies stakes by $(1-d)$.`, lesson: "fc01-l02", category: "financial" },
  { id: "fc01-pmf", en: "Product-market fit (PMF)", ar: "ملاءمة المنتج للسوق", definition: md`Being in a good market with a product that satisfies it; shows as flattening retention, pull, renewals, expansion and shorter sales cycles.`, lesson: "fc01-l02", category: "pm" },
  { id: "fc01-design-partner", en: "Design partner", ar: "شريك التصميم (عميل مبكر مشارك)", definition: md`An early customer who uses and shapes the product before general release, usually at low or no cost, in exchange for influence and early access.`, lesson: "fc01-l02", category: "pm" },
  { id: "fc01-safe", en: "SAFE (simple agreement for future equity)", ar: "اتفاقية بسيطة للحصول على ملكية مستقبلية (SAFE)", definition: md`Y Combinator's instrument: money now in exchange for shares at the next priced round, usually with a valuation cap; the post-money SAFE fixes the holder's ownership.`, lesson: "fc01-l02", category: "contractual" },
  // l03
  { id: "fc01-tam-sam-som", en: "TAM, SAM, SOM", ar: "السوق الكلي، السوق القابل للخدمة، السوق القابل للتحقيق", definition: md`Total addressable, serviceable available and serviceable obtainable market: successively filtered counts of buying units times ACV.`, lesson: "fc01-l03", category: "financial" },
  { id: "fc01-acv", en: "Annual contract value (ACV)", ar: "القيمة السنوية للعقد", definition: md`Average yearly revenue per customer contract (or buying unit), excluding one-off fees.`, lesson: "fc01-l03", category: "financial" },
  { id: "fc01-why-now", en: "Why now", ar: "لماذا الآن", definition: md`The specific recent change in technology, regulation, cost or behaviour that makes an idea possible or urgent today.`, lesson: "fc01-l03", category: "pm" },
  { id: "fc01-unfair-advantage", en: "Unfair advantage", ar: "ميزة تنافسية يصعب تقليدها", definition: md`An edge competitors cannot easily copy or buy: insight, access, team, proprietary data, distribution.`, lesson: "fc01-l03", category: "pm" },
  { id: "fc01-founder-market-fit", en: "Founder-market fit", ar: "ملاءمة المؤسس للسوق", definition: md`How well the founders' experience, access and motivation match the problem and its buyers.`, lesson: "fc01-l03", category: "pm" },
  // l04
  { id: "fc01-base-rate", en: "Base rate", ar: "المعدل الأساسي (المرجعي)", definition: md`How often an outcome occurs in a reference class; the starting estimate before adjusting for specifics.`, lesson: "fc01-l04", category: "pm" },
  { id: "fc01-pre-mortem", en: "Pre-mortem", ar: "تحليل ما قبل الفشل", definition: md`Exercise in which a team assumes a plan has already failed and writes down why, to surface risks early.`, lesson: "fc01-l04", category: "pm" },
  { id: "fc01-planning-fallacy", en: "Planning fallacy", ar: "مغالطة التخطيط", definition: md`The tendency to estimate from the plan's best path and ignore base rates, underestimating time, cost and risk.`, lesson: "fc01-l04", category: "pm" },
  // l05
  { id: "fc01-opportunity-cost", en: "Opportunity cost", ar: "تكلفة الفرصة البديلة", definition: md`The value of the best alternative given up; for founders, what an hour would create in the primary venture.`, lesson: "fc01-l05", category: "financial" },
  { id: "fc01-expected-value", en: "Expected value", ar: "القيمة المتوقعة", definition: md`Probability-weighted average of outcomes minus the investment: $EV = \sum q_j V_j - I$.`, lesson: "fc01-l05", category: "financial" },
  { id: "fc01-staged-bet", en: "Staged bet", ar: "الرهان المرحلي (الاستثمار على مراحل)", definition: md`Committing a small first stage to buy information before the large commitment; worth it when $(1-p)I_2 > I_1$.`, lesson: "fc01-l05", category: "financial" },
  { id: "fc01-context-switching", en: "Context switching", ar: "تبديل السياق (التنقل بين المهام)", definition: md`The time and attention lost reloading context when moving between projects; grows quickly with the number of projects.`, lesson: "fc01-l05", category: "pm" },
  { id: "fc01-kill-criteria", en: "Kill criteria", ar: "معايير الإيقاف", definition: md`Pre-agreed metric, threshold and date at which a venture or project is stopped, paused, handed off or merged.`, lesson: "fc01-l05", category: "pm" },
];

export default glossary;
