import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01 motivation
  { id: "sh08-volunteer-lead", en: "Volunteer lead", ar: "قائد متطوع", definition: md`An unpaid person who owns a workstream and its outcomes under a written charter, with decision rights and a budget line.`, lesson: "sh08-l01", category: "pm" },
  { id: "sh08-vfi", en: "Volunteer Functions Inventory (VFI)", ar: "مقياس وظائف التطوع", definition: md`Clary and colleagues' six motives for volunteering: values, understanding, social, career, protective and enhancement.`, lesson: "sh08-l01", category: "pm" },
  { id: "sh08-self-determination-theory", en: "Self-determination theory", ar: "نظرية التحديد الذاتي", definition: md`Theory that intrinsic motivation is sustained when autonomy, competence and relatedness are satisfied (Ryan and Deci).`, lesson: "sh08-l01", category: "pm" },
  { id: "sh08-crowding-out", en: "Motivation crowding out", ar: "إزاحة الدافع الذاتي", definition: md`The effect by which a small or controlling external reward replaces an intrinsic or social reason to act, lowering effort below the unpaid level.`, lesson: "sh08-l01", category: "pm" },
  { id: "sh08-commitment-ladder", en: "Commitment ladder", ar: "سُلَّم الالتزام", definition: md`Explicit tiers of involvement (core lead, contributor, occasional helper, alumni) with stated hours and terms, so people can step down without leaving.`, lesson: "sh08-l01", category: "pm" },
  { id: "sh08-retention-rate", en: "Retention rate", ar: "معدل الاحتفاظ", definition: md`Share of volunteers still active after a period; monthly retention $r$ compounds to $r^{12}$ a year, with expected tenure $1/(1-r)$ months.`, lesson: "sh08-l01", category: "pm" },
  // l02 roles
  { id: "sh08-lead-charter", en: "Lead charter", ar: "ميثاق الدور القيادي", definition: md`One-page mandate for a lead: mission, owned outcomes, decision rights and limits, budget line, interfaces, hours, term and backup.`, lesson: "sh08-l02", category: "pm" },
  { id: "sh08-raci", en: "RACI matrix", ar: "مصفوفة توزيع المسؤوليات (RACI)", definition: md`Assignment per activity of who is Responsible, Accountable (exactly one), Consulted and Informed.`, lesson: "sh08-l02", category: "pm" },
  { id: "sh08-daci", en: "DACI framework", ar: "إطار أدوار القرار (DACI)", definition: md`Decision roles: Driver, a single Approver, Contributors and Informed.`, lesson: "sh08-l02", category: "pm" },
  { id: "sh08-dri", en: "Directly responsible individual (DRI)", ar: "الشخص المسؤول مباشرةً", definition: md`The single named owner of an outcome or decision.`, lesson: "sh08-l02", category: "pm" },
  { id: "sh08-lazy-consensus", en: "Lazy consensus", ar: "الإجماع الضمني", definition: md`A written proposal is approved unless someone objects with a reason before a stated deadline; silence is consent.`, lesson: "sh08-l02", category: "pm" },
  { id: "sh08-async-first", en: "Async-first", ar: "العمل غير المتزامن أولاً", definition: md`Default to written updates, proposals and logs; reserve live meetings for what needs real-time interaction.`, lesson: "sh08-l02", category: "pm" },
  { id: "sh08-overlap-window", en: "Overlap window", ar: "نافذة التداخل الزمني", definition: md`Hours in which every member is available at once, computed in UTC across time zones.`, lesson: "sh08-l02", category: "pm" },
  // l03 capacity
  { id: "sh08-availability-factor", en: "Availability factor", ar: "معامل التوافر", definition: md`Share of pledged volunteer hours actually delivered; typically assumed 0.6 to 0.8 until measured.`, lesson: "sh08-l03", category: "pm" },
  { id: "sh08-load-factor", en: "Load factor (utilisation)", ar: "معامل الحِمل (نسبة الاستغلال)", definition: md`Demand hours divided by effective capacity hours; above 1 the backlog grows without limit.`, lesson: "sh08-l03", category: "pm" },
  { id: "sh08-bus-factor", en: "Bus factor (truck factor)", ar: "عامل الحافلة (عدد الأشخاص الحرجين)", definition: md`Smallest number of people whose sudden absence would stall a workstream.`, lesson: "sh08-l03", category: "pm" },
  { id: "sh08-cut-list", en: "Cut list (stop-doing list)", ar: "قائمة ما سنتوقف عنه", definition: md`Written list of work deferred or dropped to bring demand under the target load.`, lesson: "sh08-l03", category: "pm" },
  // l04 lifecycle
  { id: "sh08-trial-project", en: "Trial project", ar: "مشروع تجريبي", definition: md`A small, real, time-boxed task with criteria written in advance, used to select volunteers.`, lesson: "sh08-l04", category: "pm" },
  { id: "sh08-onboarding", en: "Onboarding", ar: "التهيئة والإدماج", definition: md`The planned first 30 days of a new volunteer: charter, access, buddy and a first visible win by day 14.`, lesson: "sh08-l04", category: "pm" },
  { id: "sh08-offboarding", en: "Offboarding", ar: "إنهاء المشاركة وتسليم المهام", definition: md`Ending or reducing a role: handover, same-day access removal, credential rotation, public thanks and alumni status.`, lesson: "sh08-l04", category: "pm" },
  { id: "sh08-code-of-conduct", en: "Code of conduct", ar: "مدونة قواعد السلوك", definition: md`Written standard of behaviour for events and community spaces, with a reporting and enforcement process.`, lesson: "sh08-l04", category: "institutional" },
  // l05 paid transition
  { id: "sh08-coverage-ratio", en: "Coverage ratio", ar: "نسبة التغطية", definition: md`Annualised trailing gross margin divided by a role's fully loaded annual cost: $\kappa = 12\bar{G}/C_{\text{role}}$.`, lesson: "sh08-l05", category: "financial" },
  { id: "sh08-honorarium", en: "Honorarium", ar: "مكافأة تقديرية", definition: md`A one-off payment recognising a completed contribution, not a wage; small recurring stipends risk crowding out motivation.`, lesson: "sh08-l05", category: "financial" },
  { id: "sh08-dynamic-equity", en: "Dynamic equity split", ar: "التقسيم الديناميكي للحصص", definition: md`Equity shares set by each person's weighted contributions divided by the total (for example Slicing Pie), recalculated until fixed.`, lesson: "sh08-l05", category: "financial" },
  { id: "sh08-shadow-value", en: "Shadow value of volunteer time", ar: "القيمة الظلية لوقت المتطوعين", definition: md`Volunteer hours priced at a replacement rate to make their contribution visible in decisions.`, lesson: "sh08-l05", category: "financial" },
  // l06 tools
  { id: "sh08-handbook", en: "Team handbook", ar: "دليل عمل الفريق", definition: md`Single written source of truth for roles, policies, procedures and decisions.`, lesson: "sh08-l06", category: "pm" },
  { id: "sh08-wip-limit", en: "Work-in-progress (WIP) limit", ar: "حد العمل الجاري", definition: md`Cap on items in progress; by Little's law it shortens lead time when throughput is fixed.`, lesson: "sh08-l06", category: "pm" },
  { id: "sh08-littles-law", en: "Little's law", ar: "قانون ليتل", definition: md`$W = L/X$: average lead time equals average work in progress divided by throughput.`, lesson: "sh08-l06", category: "pm" },
  { id: "sh08-least-privilege", en: "Least privilege", ar: "مبدأ الحد الأدنى من الصلاحيات", definition: md`Each person gets the lowest access role that lets them do their job.`, lesson: "sh08-l06", category: "technical" },
  { id: "sh08-access-register", en: "Access register", ar: "سجل الصلاحيات", definition: md`List of every system, its owners and who holds which role, reviewed quarterly and at every offboarding.`, lesson: "sh08-l06", category: "technical" },
];

export default glossary;
