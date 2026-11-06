import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "sh05-editorial-promise", en: "Editorial promise", ar: "الوعد التحريري", definition: md`One sentence stating who a publication is for, what it gives them each issue and why only it can.`, lesson: "sh05-l01", category: "pm" },
  { id: "sh05-content-pillar", en: "Content pillar", ar: "محور المحتوى", definition: md`A recurring category of content with its own format, owner and cadence, derived from the editorial promise.`, lesson: "sh05-l01", category: "pm" },
  { id: "sh05-editorial-calendar", en: "Editorial calendar", ar: "التقويم التحريري", definition: md`The planned schedule of issues and episodes with owners and production hours.`, lesson: "sh05-l01", category: "pm" },
  { id: "sh05-editorial-independence", en: "Editorial independence", ar: "الاستقلالية التحريرية", definition: md`Separation of paid content from editorial judgement: labels, no sponsor preview or veto, declared conflicts, corrections.`, lesson: "sh05-l01", category: "pm" },
  { id: "sh05-sponsored-content", en: "Sponsored content", ar: "محتوى مدفوع / برعاية", definition: md`Content paid for by a sponsor, labelled as such at the placement.`, lesson: "sh05-l01", category: "contractual" },
  // l02
  { id: "sh05-churn", en: "Churn rate", ar: "معدل التسرّب", definition: md`Share of the list lost per month through unsubscribes, bounces, complaints and sunset removals.`, lesson: "sh05-l02", category: "financial" },
  { id: "sh05-open-rate", en: "Open rate", ar: "معدل الفتح", definition: md`Share of delivered emails registering a tracking-pixel load; inflated by Apple Mail Privacy Protection since 2021.`, lesson: "sh05-l02", category: "technical" },
  { id: "sh05-ctr", en: "Click-through rate (CTR)", ar: "معدل النقر", definition: md`Unique human clickers divided by delivered emails.`, lesson: "sh05-l02", category: "technical" },
  { id: "sh05-mpp", en: "Mail Privacy Protection (MPP)", ar: "ميزة حماية خصوصية البريد", definition: md`Apple Mail feature (iOS 15, 2021) that preloads remote content through a proxy, hiding the reader's IP and registering opens without reading.`, lesson: "sh05-l02", category: "technical" },
  { id: "sh05-spf", en: "SPF (Sender Policy Framework)", ar: "إطار سياسة المرسل", definition: md`DNS record listing servers authorised to send mail for a domain (RFC 7208).`, lesson: "sh05-l02", category: "technical" },
  { id: "sh05-dkim", en: "DKIM (DomainKeys Identified Mail)", ar: "التوقيع الرقمي للبريد (DKIM)", definition: md`Cryptographic signature on each message, verified with a public key published in the sender's DNS (RFC 6376).`, lesson: "sh05-l02", category: "technical" },
  { id: "sh05-dmarc", en: "DMARC", ar: "سياسة مصادقة البريد والإبلاغ (DMARC)", definition: md`DNS policy telling receivers what to do when SPF or DKIM do not pass in alignment with the From domain, and where to send reports (RFC 7489).`, lesson: "sh05-l02", category: "technical" },
  { id: "sh05-sender-reputation", en: "Sender reputation", ar: "سمعة المرسل", definition: md`A mailbox provider's assessment of a sending domain from complaints, bounces, engagement and authentication; decides inbox or spam.`, lesson: "sh05-l02", category: "technical" },
  { id: "sh05-double-opt-in", en: "Double opt-in", ar: "الاشتراك المؤكَّد", definition: md`Subscription confirmed by clicking a link sent to the address, giving a consent record and a cleaner list.`, lesson: "sh05-l02", category: "contractual" },
  // l03
  { id: "sh05-lufs", en: "LUFS (loudness units relative to full scale)", ar: "وحدات الجهارة نسبةً إلى المقياس الكامل", definition: md`Unit of integrated loudness measured to ITU-R BS.1770; 1 LU equals 1 dB.`, lesson: "sh05-l03", category: "technical" },
  { id: "sh05-true-peak", en: "True peak (dBTP)", ar: "الذروة الحقيقية", definition: md`Estimated peak level of the reconstructed waveform between samples; podcasts keep it at or below -1 dBTP.`, lesson: "sh05-l03", category: "technical" },
  { id: "sh05-double-ender", en: "Double-ender", ar: "التسجيل المحلي المزدوج", definition: md`Remote recording where each participant records locally and uploads the track, instead of recording the call.`, lesson: "sh05-l03", category: "technical" },
  { id: "sh05-iab-download", en: "IAB download", ar: "تنزيل وفق معايير IAB", definition: md`A filtered, deduplicated (IP plus user agent over 24 hours) request delivering at least one minute of audio, per IAB Tech Lab guidelines.`, lesson: "sh05-l03", category: "technical" },
  { id: "sh05-rss-feed", en: "RSS feed", ar: "موجز RSS", definition: md`The XML feed published by a podcast host from which Apple Podcasts, Spotify and other apps fetch episodes and metadata.`, lesson: "sh05-l03", category: "technical" },
  // l04
  { id: "sh05-msa", en: "Modern Standard Arabic (MSA)", ar: "العربية الفصحى المعاصرة", definition: md`The shared written standard of the Arab world, used in news, official documents and most published text.`, lesson: "sh05-l04", category: "institutional" },
  { id: "sh05-dialect", en: "Dialect (colloquial Arabic)", ar: "اللهجة العامية", definition: md`Regional spoken Arabic (Gulf, Iraqi, Levantine, Egyptian, Maghrebi and others), the language of everyday speech.`, lesson: "sh05-l04", category: "institutional" },
  { id: "sh05-code-switching", en: "Code-switching", ar: "التناوب اللغوي", definition: md`Alternating between languages within a conversation or sentence, for example Arabic with English technical terms.`, lesson: "sh05-l04", category: "institutional" },
  { id: "sh05-arabizi", en: "Arabizi", ar: "العربيزي", definition: md`Arabic written in Latin letters with digits for sounds Latin lacks (3 for ع, 7 for ح).`, lesson: "sh05-l04", category: "institutional" },
  { id: "sh05-transcreation", en: "Transcreation", ar: "إعادة الصياغة الإبداعية", definition: md`Re-creating a message for readers in another language, keeping intent rather than sentence structure.`, lesson: "sh05-l04", category: "pm" },
  { id: "sh05-rtl", en: "Right-to-left (RTL) layout", ar: "التخطيط من اليمين إلى اليسار", definition: md`Page and text direction for Arabic, set at document level and implemented with logical CSS properties and bidi isolation.`, lesson: "sh05-l04", category: "technical" },
  { id: "sh05-hreflang", en: "hreflang", ar: "وسم اللغة البديلة (hreflang)", definition: md`Annotation linking language versions of a page so search engines show each to the right searchers.`, lesson: "sh05-l04", category: "technical" },
  // l05
  { id: "sh05-viral-coefficient", en: "Viral coefficient", ar: "معامل الانتشار", definition: md`New members brought per existing member per period: invitations times invitation conversion.`, lesson: "sh05-l05", category: "financial" },
  { id: "sh05-utm", en: "UTM parameters", ar: "معاملات تتبّع الروابط (UTM)", definition: md`Tags added to a link (source, medium, campaign) so analytics can attribute visits and sign-ups to content.`, lesson: "sh05-l05", category: "technical" },
  // l06
  { id: "sh05-cpm", en: "CPM (cost per mille)", ar: "التكلفة لكل ألف ظهور", definition: md`Price per 1,000 impressions: delivered emails or IAB downloads for Suhail media.`, lesson: "sh05-l06", category: "financial" },
  { id: "sh05-fill-rate", en: "Fill rate", ar: "معدل إشغال المساحات الإعلانية", definition: md`Share of sellable sponsor slots actually sold in a period.`, lesson: "sh05-l06", category: "financial" },
];

export default glossary;
