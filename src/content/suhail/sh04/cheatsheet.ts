import { md } from "../../schema";

const cheatSheet = md`# SH04 Partnerships across the Gulf, Egypt and the Levant: cheat sheet

## Conventions

- **Status:** Suhail has not launched. No partners, sponsors or events exist; every venture number here is **illustrative**.
- **Facts about organisations:** only dated, sourced facts (research brief, Nov 2026); everything else is unverified until confirmed.
- **Tax:** every VAT and withholding point is to be confirmed by an adviser in that country before quoting.

## Partner map

- **Seven types:** government entities, sovereign AI programmes and labs, VCs and accelerators, corporates, universities, other communities, media.
- **Real partnership test:** both sides of the trade fit in one sentence each, with a number on the partner's side.
- **Budget lines:** one corporate holds several (developer relations, marketing, HR, CSR or public sector), each with its own owner.
- **Four plays:** anchor (many resources, high alignment), brand buyer (many, low), ally (few, high), decline (few, low).

| Dated anchor (research brief) | Fact |
|---|---|
| Jais 2 (Inception, Cerebras, MBZUAI) | 70B open weights, 9 Dec 2025 |
| Falcon-H1 Arabic (TII) | 3B/7B/34B, 5 to 6 Jan 2026 |
| HUMAIN Chat (PIF) | ALLaM 34B, Aug 2025 |
| BALSAM (SDAIA, KSGAAL) | 78 tasks, blind test sets, Jul 2025 |
| Qai (QIA) | USD 20bn JV with Brookfield, 9 Dec 2025 |
| Microsoft and Kuwait | Azure region, AI data centre, innovation hub, 6 Mar 2025 |
| MENA VC (MAGNiTT) | H1 2026 USD 1.35bn, down 22 %; AI about 50 % |

## Structures and documents

- **Sponsor:** cash for benefits; Suhail controls programme.
- **Co-host:** shared brand and costs; write the split of decisions and money.
- **Venue, programme, data, credits, media partners:** match the structure to who gives what.
- **MLH guidance:** three tiers, top tier at most 25 % of budget.
- **MOU:** intent, usually non-binding except named clauses; binding force depends on wording, not title. Never money.
- **Contract must cover:** entities, benefits, price, VAT, withholding, payment dates, brand, IP, data, exclusivity, cancellation, force majeure, reputational termination, liability, governing law.
- **Suhail defaults:** participants own projects; data only by per-partner opt-in; exclusivity narrow and priced, never on models or datasets; no partner approves content; cash before spend.

## Country basics

| Market | Fiscal year | Working week | VAT or GST |
|---|---|---|---|
| Saudi Arabia | Calendar | Sun to Thu | 15 % |
| UAE | Calendar | Mon to Fri (federal) | 5 % |
| Qatar | Calendar (check) | Sun to Thu | None (check) |
| Kuwait | 1 Apr to 31 Mar (gov.) | Sun to Thu | None (check) |
| Egypt | 1 Jul to 30 Jun (gov.) | Sun to Thu | 14 % |
| Jordan | Calendar | Sun to Thu | 16 % GST |
| Lebanon | Calendar | Mon to Fri (check) | 11 % |

- **2027 windows:** January budgets; Ramadan about 8 Feb to 9 Mar (approximate); Eid al-Adha about 16 May; Gulf summer slow; 2028 asks in Sep to Nov.
- **Saudi events:** GEA permit for public or ticketed events, SCEGA for conferences, MISA licence for foreign organisers (secondary; free hackathon unverified).
- **Norms:** warm intros, in-person meetings, WhatsApp plus email record, bilingual letters to government; introductions yes, payments for influence never.

## Pipeline

- **Stages:** P1 conversation, P2 need and owner, P3 proposal with decision owner, P4 verbal yes and contract review, P5 signed and invoiced, paid, activated and reported.
- **Qualification:** budget, mandate, fit, timing, champion.
- **Illustrative probabilities:** 0.10, 0.25, 0.46, 0.76, 0.95 (assumed conversions 0.40, 0.55, 0.60, 0.80, 0.95).
- **Event test:** count only deals paid before the cash deadline; report commit, expected, target separately; scope-cut rule with a date.

## Governance

- **Conflicts:** register, recusal, separation; covers Afterwave and Mizan and investor-judges.
- **Independence:** work with national programmes on shared goals; no partner approves speakers, judges or editorial.
- **Screen:** UN, OFAC, EU, UK lists for partners, owners and payees; record each check.
- **Bribery red flags:** success fees for access to officials, third-party payment routes, valuable benefits to decision makers.
- **Data:** per-partner consent (Saudi PDPL, UAE PDPL, Egypt Law 151/2020, GDPR where it applies).
- **Concentration (illustrative policy):** top partner at most 30 %, government-linked group at most 40 %.

## Investors and employers

- **Builder-first:** partners pay for access; builders consent to every intro and are never charged for investor access.
- **Double opt-in:** builder opts in, partner requests, builder accepts, intro, outcome logged.
- **Avoid until legal check:** success fees on fundraising, per-placement fees, exclusive investor first look.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Fit score | $S = \sum_i w_i s_i$ | L1 |
| Net value | $V_{net} = C + uF - D - E$ | L2 |
| Exclusivity cost | $E = \sum_k p_k (R_k - D_k)$, $C_{excl} \ge C_0 + E$ | L2 |
| Withholding gross-up, VAT | $G = N/(1-t_w)$, $I = G(1+t_v)$ | L3 |
| Stage probability | $p_s = \prod_{i \ge s} c_i$ | L4 |
| Weighted pipeline | $P_w = \sum_j V_j p_{s(j)}$ | L4 |
| Coverage | $P/(T-B)$, required $\approx 1/W$ | L4 |
| Health score | $H = 20 \sum_k w_k h_k$ | L4 |
| Concentration | $\text{HHI} = \sum_j \sigma_j^2$ | L5 |
| Placement break-even | $F_p = f S_y$, $n^* = A/F_p$ | L6 |
`;

export default cheatSheet;
