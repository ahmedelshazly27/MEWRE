import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "sh02-hackathon", en: "Hackathon", ar: "هاكاثون", definition: md`A time-boxed event (hours to days) in which teams build working prototypes on a theme, usually judged at the end.`, lesson: "sh02-l01", category: "pm" },
  { id: "sh02-builder", en: "Builder", ar: "مطوِّر (صانع)", definition: md`Anyone who ships product: engineers, ML practitioners, designers and technical founders. Suhail's core audience.`, lesson: "sh02-l01", category: "pm" },
  { id: "sh02-sponsor", en: "Sponsor", ar: "الراعي", definition: md`A company or institution that funds an event in cash or in kind (credits, venue, mentors) in exchange for agreed outcomes.`, lesson: "sh02-l01", category: "contractual" },
  { id: "sh02-devrel", en: "Developer relations (DevRel)", ar: "علاقات المطوّرين", definition: md`The function in a technology company that drives adoption of its product by developers; often the budget owner for hackathon sponsorship.`, lesson: "sh02-l01", category: "pm" },
  { id: "sh02-activated-developer", en: "Activated developer", ar: "مطوّر مُفعَّل", definition: md`A developer still actively using a sponsor's product after a set period (often 30 days); the denominator of cost per activated developer.`, lesson: "sh02-l01", category: "financial" },
  // l02
  { id: "sh02-theme", en: "Theme", ar: "محور الهاكاثون", definition: md`The frame of an event that narrows the solution space so projects are comparable and sponsors can see their fit.`, lesson: "sh02-l02", category: "pm" },
  { id: "sh02-sponsor-track", en: "Sponsor track", ar: "مسار الراعي", definition: md`A separate prize for the best load-bearing use of a sponsor's product, usually judged by the sponsor against criteria written into its agreement.`, lesson: "sh02-l02", category: "contractual" },
  { id: "sh02-rubric", en: "Judging rubric", ar: "معايير التحكيم", definition: md`Weighted criteria with anchored score levels used by all judges.`, lesson: "sh02-l02", category: "pm" },
  { id: "sh02-pre-built", en: "Pre-built project", ar: "مشروع مُعَدّ مسبقاً", definition: md`A project substantially built before the event and presented as new; prevented with fresh-build rules and checks.`, lesson: "sh02-l02", category: "pm" },
  // l03
  { id: "sh02-show-rate", en: "Show rate", ar: "نسبة الحضور الفعلي", definition: md`Share of accepted participants who check in.`, lesson: "sh02-l03", category: "pm" },
  { id: "sh02-no-show", en: "No-show", ar: "عدم الحضور", definition: md`An accepted participant who does not attend; $1 - s$ of acceptances.`, lesson: "sh02-l03", category: "pm" },
  { id: "sh02-overbooking", en: "Overbooking", ar: "القبول الزائد عن السعة", definition: md`Accepting more participants than seats so that expected attendance fills the room within a chosen overflow risk.`, lesson: "sh02-l03", category: "pm" },
  { id: "sh02-waitlist", en: "Waitlist", ar: "قائمة الانتظار", definition: md`Ranked applicants who receive seats released by non-confirmers.`, lesson: "sh02-l03", category: "pm" },
  { id: "sh02-reconfirmation", en: "Reconfirmation", ar: "إعادة تأكيد الحضور", definition: md`A request 72 to 48 hours before the event for accepted participants to confirm; unconfirmed seats go to the waitlist.`, lesson: "sh02-l03", category: "pm" },
  { id: "sh02-occupancy", en: "Certified occupancy", ar: "السعة المعتمدة للمكان", definition: md`The maximum number of people a room may hold under fire-safety rules, including staff and guests.`, lesson: "sh02-l03", category: "technical" },
  // l04
  { id: "sh02-run-of-show", en: "Run-of-show", ar: "الجدول التشغيلي التفصيلي", definition: md`Minute-by-minute schedule with owner, location and cue for every item of the event.`, lesson: "sh02-l04", category: "pm" },
  { id: "sh02-access-point", en: "Wireless access point", ar: "نقطة وصول لاسلكية", definition: md`Device that connects wifi clients to the wired network; high-density events need many, spread through the room.`, lesson: "sh02-l04", category: "technical" },
  { id: "sh02-uplink", en: "Uplink", ar: "خط الاتصال بالإنترنت", definition: md`The venue's connection to the internet, sized in Mbps or Gbps.`, lesson: "sh02-l04", category: "technical" },
  { id: "sh02-circuit", en: "Electrical circuit", ar: "دائرة كهربائية", definition: md`A group of sockets protected by one breaker of a given rating (e.g. 16 A); usable continuous power about $V I \times 0.8$.`, lesson: "sh02-l04", category: "technical" },
  { id: "sh02-diversity-factor", en: "Diversity factor", ar: "معامل التباين في الأحمال", definition: md`Ratio of actual simultaneous load to the sum of individual peak loads; small groups have little diversity.`, lesson: "sh02-l04", category: "technical" },
  { id: "sh02-code-of-conduct", en: "Code of conduct", ar: "مدونة السلوك", definition: md`Published behaviour rules with a reporting channel, named responders and an enforcement process.`, lesson: "sh02-l04", category: "pm" },
  // l05
  { id: "sh02-calibration", en: "Judge calibration", ar: "معايرة لجنة التحكيم", definition: md`Aligning judges before scoring by walking through the rubric and scoring sample projects together.`, lesson: "sh02-l05", category: "pm" },
  { id: "sh02-z-score", en: "Z-score", ar: "الدرجة المعيارية", definition: md`A score expressed in standard deviations from the judge's or panel's mean: $(s-\mu)/\sigma$.`, lesson: "sh02-l05", category: "technical" },
  { id: "sh02-sponsor-report", en: "Sponsor report", ar: "تقرير الراعي", definition: md`Post-event report with agreed outcome metrics, evidence, builder feedback and a renewal proposal.`, lesson: "sh02-l05", category: "contractual" },
  { id: "sh02-retention", en: "Member retention", ar: "معدل الاحتفاظ بالأعضاء", definition: md`Share of active community members still active in the next period.`, lesson: "sh02-l05", category: "pm" },
  // l06
  { id: "sh02-gea", en: "General Entertainment Authority (GEA)", ar: "الهيئة العامة للترفيه", definition: md`Saudi authority that issues permits for public or ticketed entertainment events, one per event via its e-portal (research brief, secondary).`, lesson: "sh02-l06", category: "institutional" },
  { id: "sh02-iftar-suhoor", en: "Iftar and suhoor", ar: "الإفطار والسحور", definition: md`The sunset meal that breaks the fast and the pre-dawn meal before it, during Ramadan; anchors for Ramadan evening events.`, lesson: "sh02-l06", category: "institutional" },
  { id: "sh02-musalla", en: "Prayer room (musalla)", ar: "مصلّى", definition: md`A room set aside for prayer, with ablution facilities nearby; expected at events in the region.`, lesson: "sh02-l06", category: "institutional" },
  { id: "sh02-travel-grant", en: "Travel grant", ar: "منحة السفر", definition: md`Organiser-funded travel, accommodation and visa costs for selected participants from other cities or countries.`, lesson: "sh02-l06", category: "financial" },
];

export default glossary;
