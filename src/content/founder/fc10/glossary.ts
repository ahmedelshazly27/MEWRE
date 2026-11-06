import { md, type GlossaryTerm } from "../../schema";

const glossary: GlossaryTerm[] = [
  // l01
  { id: "fc10-grounding", en: "Grounding (source-grounded answer)", ar: "الاستناد إلى المصادر", definition: md`Having the model answer only from documents retrieved or supplied in the conversation, quoting them, instead of from trained memory.`, lesson: "fc10-l01", category: "technical" },
  { id: "fc10-claim-ledger", en: "Claim ledger", ar: "سجل الادعاءات", definition: md`Table of atomic claims with source URL, date, verbatim quote, source type and confidence; the only input allowed into a synthesis.`, lesson: "fc10-l01", category: "pm" },
  { id: "fc10-market-map", en: "Market map", ar: "خريطة السوق", definition: md`Structured view of companies serving a problem, segmented on buyer-relevant axes, used to find whitespace and positioning.`, lesson: "fc10-l01", category: "pm" },
  { id: "fc10-teardown", en: "Competitor teardown", ar: "تحليل المنافس التفصيلي", definition: md`Fixed-format analysis of one competitor (what it does, buyers, deployment, pricing, funding, proof, gaps), each cell sourced or marked not found.`, lesson: "fc10-l01", category: "pm" },
  { id: "fc10-primary-source", en: "Primary source", ar: "المصدر الأولي", definition: md`The originator of a fact: the company's own release or docs, a filing, a regulator, a standard, or the customer. Trackers and blogs are secondary.`, lesson: "fc10-l01", category: "pm" },
  // l02
  { id: "fc10-icp", en: "Ideal customer profile (ICP)", ar: "ملف العميل المثالي", definition: md`Explicit criteria (industry, team, size, geography, observable signals) defining the accounts most likely to buy and succeed.`, lesson: "fc10-l02", category: "pm" },
  { id: "fc10-enrichment", en: "Lead enrichment", ar: "إثراء بيانات العملاء المحتملين", definition: md`Adding role, team, triggers and contact data to a lead, with a source and date for each field.`, lesson: "fc10-l02", category: "technical" },
  { id: "fc10-deliverability", en: "Deliverability (inbox placement)", ar: "قابلية وصول البريد إلى صندوق الوارد", definition: md`Share of sent mail that reaches the inbox rather than spam, governed by authentication, reputation, complaints and engagement.`, lesson: "fc10-l02", category: "technical" },
  { id: "fc10-spf-dkim-dmarc", en: "SPF, DKIM and DMARC", ar: "بروتوكولات مصادقة البريد الإلكتروني (SPF وDKIM وDMARC)", definition: md`DNS-published email authentication: authorised senders (SPF), cryptographic signatures (DKIM), and alignment with the From domain plus a failure policy and reports (DMARC).`, lesson: "fc10-l02", category: "technical" },
  { id: "fc10-spam-complaint-rate", en: "Spam complaint rate", ar: "معدل الإبلاغ عن الرسائل المزعجة", definition: md`User-reported spam divided by mail delivered to the inbox; Gmail asks senders to stay below 0.1 % and never reach 0.3 %.`, lesson: "fc10-l02", category: "technical" },
  { id: "fc10-legitimate-interests", en: "Legitimate interests (GDPR)", ar: "المصلحة المشروعة (اللائحة العامة لحماية البيانات)", definition: md`GDPR Art. 6(1)(f) lawful basis commonly used for B2B outreach, requiring a documented balancing test; the person can object to direct marketing at any time (Art. 21).`, lesson: "fc10-l02", category: "contractual" },
  // l03
  { id: "fc10-facts-sheet", en: "Facts sheet", ar: "ورقة الحقائق المعتمدة", definition: md`The list of numbers and claims a draft may use; anything else is marked [MISSING] instead of invented.`, lesson: "fc10-l03", category: "pm" },
  { id: "fc10-red-team", en: "Red-team critique", ar: "المراجعة النقدية العدائية", definition: md`Having a model or person review a draft from a named hostile role (sceptical investor, security reviewer) and rank the objections.`, lesson: "fc10-l03", category: "pm" },
  { id: "fc10-model-audit", en: "Model audit", ar: "تدقيق النموذج المالي", definition: md`Fixed checks on a financial model: inputs separated, units and time base, signs, hard-codes, unsupported revenue, reconciliations, sensitivities.`, lesson: "fc10-l03", category: "financial" },
  { id: "fc10-sam", en: "Serviceable addressable market (SAM)", ar: "السوق القابلة للخدمة", definition: md`The part of the market your product can serve now, best estimated bottom-up as counted accounts times defensible ACV.`, lesson: "fc10-l03", category: "financial" },
  { id: "fc10-acceptance-criteria", en: "Acceptance criteria", ar: "معايير القبول", definition: md`Testable conditions (often Given/When/Then) that a requirement must meet to be considered done.`, lesson: "fc10-l03", category: "pm" },
  // l04
  { id: "fc10-repository", en: "Repository (git)", ar: "مستودع الشيفرة", definition: md`Version-controlled project folder where every change is a reviewable, reversible commit.`, lesson: "fc10-l04", category: "technical" },
  { id: "fc10-environment-variable", en: "Environment variable / .env file", ar: "متغير البيئة (ملف .env)", definition: md`A value supplied to a program at run time, used to keep secrets out of code; the local .env file is always git-ignored.`, lesson: "fc10-l04", category: "technical" },
  { id: "fc10-secret-rotation", en: "Secret rotation", ar: "تدوير المفاتيح السرية", definition: md`Revoking a credential and issuing a new one; the first step after any leak.`, lesson: "fc10-l04", category: "technical" },
  { id: "fc10-least-privilege", en: "Least privilege", ar: "مبدأ الحد الأدنى من الصلاحيات", definition: md`Granting a tool or agent only the access its task needs, for example a read-only key for a report.`, lesson: "fc10-l04", category: "technical" },
  // l05
  { id: "fc10-venture-context-file", en: "Venture context file", ar: "ملف سياق المشروع", definition: md`Maintained document per venture with exact status words, approved facts, never-state list, confidentiality rules and voice, loaded at the start of each task.`, lesson: "fc10-l05", category: "pm" },
  { id: "fc10-prompt-library", en: "Prompt library", ar: "مكتبة الأوامر النصية", definition: md`Versioned set of reusable templates, each with inputs, output format, owner and a verification step.`, lesson: "fc10-l05", category: "pm" },
  { id: "fc10-sycophancy", en: "Sycophancy", ar: "التملق (موافقة النموذج على رأي المستخدم)", definition: md`A model's tendency to agree with the framing or preference in the question; countered by neutral prompts that ask for the strongest case on each side.`, lesson: "fc10-l05", category: "technical" },
  // l06
  { id: "fc10-ai-agent", en: "AI agent", ar: "الوكيل الذكي", definition: md`A system in which the model chooses its next step and tool in a loop until it judges a goal met.`, lesson: "fc10-l06", category: "technical" },
  { id: "fc10-mcp", en: "Model Context Protocol (MCP)", ar: "بروتوكول سياق النموذج", definition: md`Open protocol for connecting models to tools and data sources such as CRMs, drives and databases.`, lesson: "fc10-l06", category: "technical" },
  { id: "fc10-prompt-injection", en: "Prompt injection", ar: "حقن الأوامر النصية", definition: md`Instructions embedded in content a model processes (email, web page, document) that the model follows as if they came from the user.`, lesson: "fc10-l06", category: "technical" },
  { id: "fc10-lethal-trifecta", en: "Lethal trifecta", ar: "الثالوث الخطِر", definition: md`The combination of private data access, untrusted content and external communication in one agent, which enables data exfiltration via injection.`, lesson: "fc10-l06", category: "technical" },
];

export default glossary;
