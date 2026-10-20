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

| Level | Arabic | What the PM needs from it |
|---|---|---|
| Minister | الوزير (معالي الوزير) | Reached via the Undersecretary |
| Undersecretary | وكيل الوزارة | Decision memos, senior external letters |
| Assistant Undersecretary | الوكيل المساعد (قطاع) | Your internal client; budget owner |
| Director / Controller / Section | مدير إدارة / مراقب / رئيس قسم | Review, drafting, execution |

- **Formal authority:** signature + delegation (تفويض الصلاحيات).
- **Practical authority:** the drafters, the gatekeepers and the trusted advisers.
- **Annotated memo:** the تأشيرة (موافق / للعرض / لاتخاذ اللازم) **is** the decision.
- **Verbal "go ahead":** agreement in principle only.
- **IPP chain:** KAPP → Higher Committee → State Audit Bureau prior review → signing. MEWRE is the offtaker.
- **Wasta test:** relationships may buy access and attention — never outcomes the rules decide.
- **Declining wasta:** decline without humiliation; disclose the approach.
- **Consultants:** advise and prepare; officials decide and sign. Write an OE authority matrix.

## 2. Key numbers

| Item | Value | Note |
|---|---|---|
| Audit Bureau prior review | contracts ≥ KD 100k | Reported by a minister (verify) |
| Law 94/2026 direct contracting without CAPT | up to KD 1 m per year | Agents banned; effective ~Dec 2026 |
| Summer-2026 peak load | 17,540 MW | Use as the "share of peak" yardstick |
| Reading speed, dense official text | ≈ 200 words/min | One page ≈ 2 min |
| Decision memo | 1 page, ~450 words | Analysis goes to attachments |
| Minutes issued | ≤ 3 working days | After the meeting |
| Comments on minutes | ≤ 5 working days | After issue |

## 3. Writing

- **BLUF:** first paragraph = decision required + deadline + recommendation.

### Decision memo (1 page, ~450 words)

1. Decision required
2. Issue
3. Background (with references)
4. Options, including do-nothing (cost / time / risk)
5. Recommendation (the decisive reason)
6. Risks
7. Decision line
8. Attachments (draft letter ready to sign)

### Arabic official letter, top to bottom

1. الرقم / التاريخ
2. السيد/ ... المحترم
3. الموضوع
4. تحية طيبة وبعد،،،
5. بالإشارة إلى كتابكم رقم ... المؤرخ في ... بشأن ...
6. نفيدكم بما يلي (numbered points)
7. يرجى التكرم بـ ...
8. وتفضلوا بقبول فائق الاحترام والتقدير،،،
9. Signature, then المرفقات / نسخة إلى

### Notice validity

- **Subject:** contains "NOTICE / إشعار".
- **Clause:** the exact Sub-Clause of *your* Contract.
- **Sender:** the right one (the Engineer where the Contract requires).
- **Address:** the contractual address and method.
- **Timing:** within the contractual time limit.
- **Content:** facts, not adjectives.
- **Rights:** تحتفظ الوزارة بكافة حقوقها بموجب العقد.

## 4. Presenting

- **Pyramid:** governing thought → 3 MECE points → evidence.
- **Opener:** SCQ — Situation, Complication, Question, then the answer.
- **Three slides:** answer, why, asks. Use action titles; the appendix is the answer bank.
- **MW:** state it as a share of the 17,540 MW summer-2026 peak.
- **KWD:** state it as a share of budget or contingency.
- **Date:** give the slip and a range.
- **Risk:** name the owner and when you will know more.
- **Bad news:** cause → impact → plan → ask. Early beats perfect; never surprise your superior.
- **Questions:** answer first; never guess numbers; commit to a dated follow-up.
- **Your superior:** never contradict them in front of external parties.
- **Commitments:** made only in signed letters.

## 5. Managing the OE, contractors and meetings

- **Principal–agent problem:** information asymmetry + misaligned incentives.
- **Controls:** scope and authority, incentives, reporting, **verification**, records.
- **KPI scorecard:** inspect the components, not just the total; mix leading and lagging indicators.
- **Minutes are evidence:** rebut disputed contractor statements on the record — "The Employer does not accept this statement…".
- **Minutes ≠ Notices:** a claim or instruction still needs the contractual Notice.
- **Escalation ladder:** discussion → minuted action → letter → Notice/NCR → contractual remedies → senior escalation → termination.

### Progress-meeting agenda

1. Safety
2. Previous actions (exceptions only)
3. Progress vs programme
4. Engineering and procurement
5. Quality
6. Risks
7. Commercial
8. Decisions required
9. New actions (read back owner and date)

## 6. Negotiation and influence

- **Public money:** settle on **entitlement + substantiated quantum** (Engineer's consultation/determination), not split-the-difference.
- **Principled negotiation:** separate people from the problem; focus on interests; invent options; use objective criteria.
- **Trading currencies:** time vs money vs milestones vs guarantees.
- **Gulf context:** relationship first; high-context communication; face (ماء الوجه).
- **Closing:** senior-to-senior; hold a gesture in reserve; write everything down.
- **Compete:** safety and integrity.
- **Collaborate:** recovery plans.
- **Other modes:** compromise, avoid, accommodate — use deliberately.
- **Trust:** no surprises, protect your superior, be brief and right, give credit upward.

## 7. Formulas

| Quantity | Formula | Where |
|---|---|---|
| Reading time | $t = W/v$ | Memo length ($v \approx 200$ words/min) |
| Delay exposure | $X = P \cdot CF \cdot t \cdot \tau$ | Turning a slip into KWD |
| Weighted KPI score | $S = \sum w_i s_i$ | OE / contractor scorecards |
| Meeting cost | $C = N \cdot h \cdot r$ | Sizing recurring meetings |
| Expected award | $EV = \sum p_k A_k$ | Dispute route of a claim |
| Employer reservation price | $RP_E = EV + C_E$ | Maximum to pay |
| Contractor reservation price | $RP_C = EV - C_C$ | Minimum it should accept |
| ZOPA | $[RP_C,\ RP_E]$ | Bargaining range |
| Trust equation | $T = (C + R + I)/S$ | Diagnosing a relationship |

## 8. Before sending anything upward

- **Authority:** the signatory can approve it under the delegation.
- **Concurrence:** all affected sectors have concurred.
- **Precedent:** cited.
- **Legal / Finance:** have seen the draft.
- **Prior review:** its duration is in the timeline.
- **Length:** one page.
- **Next document:** attached, ready to sign.
- **Superior:** briefed, so nobody above is surprised.
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
