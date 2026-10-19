import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";

const cheatSheet = md`# M13 — Leadership & Communication in a Ministry: cheat sheet

## 1. How authority flows
| Level | Arabic | PM needs |
|---|---|---|
| Minister | الوزير (معالي الوزير) | Reached via the Undersecretary |
| Undersecretary | وكيل الوزارة | Decision memos, senior external letters |
| Assistant Undersecretary | الوكيل المساعد (قطاع) | Your internal client; budget owner |
| Director / Controller / Section | مدير إدارة / مراقب / رئيس قسم | Review, drafting, execution |

- **Formal authority** = signature + delegation (تفويض الصلاحيات). **Practical authority** = drafters, gatekeepers, trusted advisers.
- The annotated memo (تأشيرة: موافق / للعرض / لاتخاذ اللازم) **is** the decision. Verbal = agreement in principle only.
- IPP chain: KAPP → Higher Committee → State Audit Bureau (prior review; ≥ KD 100k reported, verify) → signing. MEWRE = offtaker.
- Law 94/2026: direct contracting without CAPT up to KD 1 m/yr; agents banned (effective ~Dec 2026).
- **Wasta test:** relationships may buy access and attention — never outcomes the rules decide. Decline without humiliation; disclose.
- **Consultants advise and prepare; officials decide and sign.** Write an OE authority matrix.

## 2. Writing
**BLUF** — first paragraph: decision required + deadline + recommendation.
**Decision memo (1 page, ~450 words):** Decision required · Issue · Background (refs) · Options incl. do-nothing (cost/time/risk) · Recommendation (decisive reason) · Risks · Decision line · Attachments (draft letter ready to sign).
Reading time $t = W/v$, $v \approx 200$ words/min → one page ≈ 2 min.

**Arabic letter:** الرقم/التاريخ → السيد/ ... المحترم → الموضوع → تحية طيبة وبعد،،، → بالإشارة إلى كتابكم رقم ... المؤرخ في ... بشأن ... → نفيدكم بما يلي (numbered) → يرجى التكرم بـ ... → وتفضلوا بقبول فائق الاحترام والتقدير،،، → signature → المرفقات / نسخة إلى.

**Notice validity:** "NOTICE / إشعار" in subject · exact Sub-Clause of *your* Contract · right sender (Engineer where required) · contractual address · within time · facts not adjectives · تحتفظ الوزارة بكافة حقوقها بموجب العقد.

## 3. Presenting
- **Pyramid:** governing thought → 3 MECE points → evidence. Open with SCQ.
- **3 slides:** answer · why · asks — action titles; appendix = answer bank.
- **Leader numbers:** MW (share of the 17,540 MW summer-2026 peak) · KWD (share of budget/contingency) · date (slip + range) · risk (owner, when you'll know).
- Exposure of a delay: $X = P \cdot CF \cdot t \cdot \tau$.
- **Bad news:** cause → impact → plan → ask; early beats perfect; never surprise your superior.
- Questions: answer first; never guess numbers; dated follow-up; don't contradict your superior externally; commitments only in signed letters.

## 4. Managing OE, contractors, meetings
- Principal–agent: information asymmetry + misaligned incentives → scope/authority, incentives, reporting, **verification**, records.
- KPI score $S = \sum w_i s_i$; inspect components; mix leading and lagging.
- Meeting cost $C = N \cdot h \cdot r$. Agenda: safety · actions (exceptions) · progress vs programme · engineering/procurement · quality · risks · commercial · decisions · new actions (read back).
- Minutes = evidence. Rebut disputed contractor statements: "The Employer does not accept this statement…". Minutes ≠ Notices. Issue ≤ 3 wd; comments ≤ 5 wd.
- Ladder: discussion → minuted action → letter → Notice/NCR → remedies → senior escalation → termination.

## 5. Negotiation & influence
- $EV = \sum p_k A_k$; $RP_E = EV + C_E$; $RP_C = EV - C_C$; ZOPA $= [RP_C, RP_E]$.
- Public money: settle on **entitlement + substantiated quantum** (Engineer's consultation/determination), not split-the-difference.
- Principled negotiation: people vs problem · interests · options · objective criteria. Trade time vs money vs milestones vs guarantees.
- Gulf context: relationship first, high-context, face (ماء الوجه), senior-to-senior closing, hold a gesture in reserve; write everything down.
- Conflict modes: compete (safety/integrity) · collaborate (recovery plans) · compromise · avoid · accommodate.
- Trust $T = (C + R + I)/S$ — no surprises, protect your superior, be brief and right, credit upward.

## Before sending anything upward
Authority ✓ · sectors concurred ✓ · precedent cited ✓ · Legal/Finance seen ✓ · prior review timed ✓ · one page ✓ · next document attached ✓ · superior briefed ✓
`;

const mod: Module = {
  id: "m13",
  number: 13,
  title: "Leadership & Communication in a Ministry",
  titleAr: "القيادة والتواصل في بيئة وزارية",
  summary:
    "How a Kuwaiti ministry really makes decisions, and how a PM writes, presents, manages consultants and contractors, runs meetings and negotiates inside it — with bilingual EN/AR memo, letter and minutes templates.",
  whyItMatters:
    "At MEWRE the critical path of a renewable project usually runs through approvals, letters, committees and negotiations rather than engineering. A PM who can write a one-page decision memo the Undersecretary signs in two minutes, issue a valid notice in correct official Arabic, present bad news without losing trust, keep the Owner's Engineer honest, and settle a claim defensibly will deliver projects that technically stronger but institutionally naive managers cannot.",
  competencies: ["leadership", "contracts"],
  prerequisites: ["m00"],
  estimatedHours: 9,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
