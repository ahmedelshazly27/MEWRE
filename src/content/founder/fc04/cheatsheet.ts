import { md } from "../../schema";

const cheatSheet = md`# FC04 Sales: cheat sheet

## Conventions

- **Status of numbers:** every venture number in this module is **illustrative**, not Afterwave or Mizan data.
- **Currency:** EUR for Afterwave examples; KD for Kuwait public procurement.
- **Stage probabilities:** derived from your own conversions; with fewer than about 30 closed deals, treat them as guesses.

## Process and stages

- **Stage:** defined by a buyer-verifiable exit criterion, never by seller activity.
- **Stage model:** S1 first meeting, S2 discovery complete, S3 technical validation, S4 proposal agreed, S5 signed, S6 pilot running, S7 converted.
- **Buying committee:** economic buyer, champion, technical evaluator, users, procurement, legal and security, blocker.
- **Mutual action plan:** dated steps with owners on both sides, ending in a decision meeting.
- **Founder-led sales:** the founder runs the first deals and writes the playbook before hiring sellers.

## Discovery and demo

- **SPIN:** Situation, Problem, Implication, Need-payoff; implication questions build the business case.
- **Pain, impact, urgency:** what is broken, what it costs (buyer's numbers), the dated reason to act now.
- **Discovery exit:** a written summary of problem, numbers, people and date, confirmed by the buyer.
- **Demo:** their numbers, then the outcome, then three moments, then questions, then the next step.
- **Deep dive:** separate session, engineering partner present, never bluff, close open items in writing.

## Qualification (MEDDPICC)

| Letter | Confirmed when |
|---|---|
| **M** Metrics | Buyer confirmed the outcome numbers in writing |
| **E** Economic buyer | Named, met, knows the business case |
| **D** Decision criteria | Written list from the buyer |
| **D** Decision process | Steps and dates in the mutual action plan |
| **P** Paper process | Onboarding, security, legal, PO steps and lead times known |
| **I** Identify pain | Quantified pain and compelling event confirmed |
| **C** Champion | Power, personal stake, has acted for you |
| **C** Competition | Alternatives named, including do nothing and build in-house |

- **Scale:** 0 unknown, 1 assumed, 2 partly confirmed, 3 confirmed and documented.
- **Gates:** no commit without the economic buyer and a tested champion.

## Pilots, pricing and negotiation

- **Paid pilot:** tests budget ownership, runs onboarding once, makes the buyer commit people.
- **Success criterion:** metric, threshold, method, data, date, who judges.
- **Conversion clause:** annual price and scope, start date, fee credit window, decision meeting.
- **Security pack at S3:** architecture and data flows, policies, questionnaire answers, pen test, DPA, certification roadmap.
- **Value metric (Afterwave):** per rig; grows with value and does not punish adoption.
- **Give-get:** never concede without getting term, volume, upfront payment, reference or a date.

## Procurement and outbound

- **RFI / RFQ / RFP:** information / quotation (or qualification in public and PPP use) / proposal scored on criteria.
- **Unshaped RFP:** low win probability; use the clarification window before committing founder weeks.
- **Vendor onboarding:** registration extract, VAT, bank letter, insurance, compliance declarations, portal; start at S3.
- **Kuwait (reported, verify):** CAPT tenders; Law 94/2026 effective about late December 2026, direct contracting up to KD 1 m per FY per item, agents banned, local content tightened; Audit Bureau review; KAPP for PPPs.
- **Public buyers:** leverage is before the tender; price is fixed at bid time; compliance first.
- **CRM musts:** stage and evidence, next step and date, close date and times moved, amount, MEDDPICC, champion and economic buyer, source, loss reason, forecast category.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Top of funnel | $N_{top} = \lceil T/\prod c_i\rceil$ | Lesson 1 |
| Stage-to-close probability | $p_s = \prod_{i\ge s} c_i$ | Lesson 5 |
| Cost of pain | $C_{pain} = N_r h_r f_u w + N_e c_e + D c_d$ | Lesson 2 |
| Rig-hours saved | $H_{saved} = N_r(n_{full}-n_{sel})\bar t$ | Lesson 3 |
| Deal score | $S = \sum w_i s_i/(3\sum w_i)$ | Lesson 4 |
| Weighted pipeline | $P_w = \sum p_s V$ | Lesson 5 |
| Coverage | $P/(Q-B)$, need about $1/W$ | Lesson 5 |
| Sales velocity | $v = N W \mathrm{ACV}/L$ | Lesson 5 |
| Pilot EV | $EV = F - C_d + p_c\,\mathrm{ACV}\,GM\,n$ | Lesson 6 |
| Free-pilot break-even | $p_c^* = C_d/(\mathrm{ACV}\,GM\,n)$ | Lesson 6 |
| EVC | $V_{ref} + V_{diff}$ | Lesson 7 |
| Discount volume | $\Delta Q/Q = d/(GM-d)$ | Lesson 7 |
| ZOPA | $[RP_s, RP_b]$ if $RP_b \ge RP_s$ | Lesson 7 |
| Outbound meetings | $M = N_c\,d\,r\,q$ | Lesson 8 |

## Key illustrative numbers

| Item | Value |
|---|---|
| Conversions 60/50/60/50 % | 9 % end to end; 45 meetings for 4 pilots |
| Stage probabilities | S2 15 %, S3 30 %, S4 50 % |
| Cost of pain (drive-unit lab) | EUR 627k/yr |
| Rerun outcome | 180 of 1,200 tests, 18 h vs 120 h on 4 rigs |
| Velocity lever | cycle −10 % gives +11.1 % |
| Pilot EV (paid vs free) | EUR 103k vs EUR 15k; free break-even 16.7 % |
| Afterwave EVC and price | EVC about EUR 437k; Team plan EUR 90k (21 %) |
| Discount 25 % at 78 % margin | needs +47 % volume |
| Outbound 95 % x 8 % x 40 % | 3.04 meetings per 100 contacts; 1,480 contacts for 45 |
`;

export default cheatSheet;
