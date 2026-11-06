import { md } from "../../schema";

const cheatSheet = md`# MZ11 Selling in Kuwait and the Gulf: cheat sheet

## Conventions

- **Numbers:** every Mizan number here is **illustrative**, not Mizan data. Facts dated to public reporting up to early November 2026.
- **Pilot status:** the Shagaya Phase I soiling analytics pilot with KISR researchers is **targeted, in preparation**; never signed or running.
- **Currency:** USD for Gulf IPPs; KWD for Kuwaiti public buyers (1 KWD is about 3.25 USD).

## Buyer map

- **Rule:** sell to the holder of the loss your product reduces, in the unit they are measured on.
- **IPP project company:** holds energy revenue at the tariff.
- **O&M contractor:** holds cleaning cost, availability and any PR guarantee (per O&M agreement).
- **EPC:** holds soiling only in completion and defects-period tests.
- **Offtaker** (MEWRE, EWEC, SPPC, KAHRAMAA): holds fuel cost; no plant budget.
- **KAPP:** procures PPPs and writes RFPs; not a buyer of analytics.
- **MEWRE as owner** (Shagaya Phase I, operated by KISR): holds all losses at fuel value; buys through public procurement.
- **Kuwait now:** credibility and method. **Gulf now:** first paying customers. **Kuwait Phase III:** buyers from 2027 at the earliest.

| Kuwait fact (as of Nov 2026) | Status |
|---|---|
| Shagaya Phase III Zone 1, 1,100 MW, 30-year PPA with MEWRE | Masdar and Fouad AlGhanim and Sons selected (MEED, 13 Aug 2026); tariff and PPA signing not found |
| Zone 2, 500 MW | Bids submitted; preferred bidder not found |
| Shagaya Phase I PV | 11.15 MW, monthly water cleaning (RSER 2020) |

## Kuwaiti public routes

| Route | Applies when |
|---|---|
| CAPT tender | Above the direct limit for the same item in the FY |
| Direct contracting | Below KWD 75,000 now; reported KWD 1 m per FY after Law 94/2026 takes effect (about 27 Dec 2026) |
| Subcontract under a prime | Existing O&M or monitoring contract scope fits |
| Research collaboration | Joint method and paper; no service fee |

- **Law 94/2026:** gazetted 27 Sep 2026 (issue 1810); agents reportedly banned; local content tightened.
- **Still applies:** Audit Bureau prior review (reported above KWD 100,000), delegations, anti-splitting.
- **Never:** split orders, shorten terms to dodge review, draft the tender you bid on.

## Gulf O&M

| Plant | Practice |
|---|---|
| Noor Abu Dhabi, 1.18 GW | 1,430 dry robots, no water |
| Al Ajban (UAE) | About 3,000 SUNPURE robots, daily |
| Sudair, 1.5 GW | Robotic cleaning, NOMAC |
| Al Kharsaah, 800 MWp | Semi-automated, every 4 days |
| Shagaya PV, 11.15 MW | Monthly water |

- **Thin tariff:** Gulf PV tariffs roughly USD 12 to 25/MWh; lead with opex, guarantees and reporting, not MWh.
- **Daily-robot plants:** sell fleet health, missed rows, storm and dew decisions; not frequency.
- **Data:** ask for read-only exports; never control access in a first engagement.

## Relationships and integrity

- **Access vs outcome:** introductions, meetings, feedback: yes. Evaluation status, competitors' prices, influence on awards, value to deciders: never.
- **Trust equation:** credibility, reliability and intimacy over self-orientation.
- **Intermediaries:** no success fees on public awards; be a real local partner, not a name.
- **Practice:** signed policy, gifts register, adviser rules, declarations, approach log, data confidentiality.

## Pilots

- **Ladder:** data agreement, back-test, shadow mode, controlled trial, service.
- **Criteria:** metric, threshold, reference, window, date, judge; fixed before results.
- **Research partner:** unpaid; joint paper with review period, no veto; publish the method, keep the product.
- **Commercial pilot:** paid and credited; conversion price agreed up front.

## Pricing

- **Units:** per MWp per year with a site minimum; managed service tier; gain-share only for a specific contract change.
- **Illustrative 500 MWp IPP:** licence USD 50k (16 % of value, 76 % GM); service USD 90k (29 %, 47 % GM); 30 % share USD 45k to 92k.
- **Public buyers:** fixed KWD price; any variable fee only with a fixed alternative.
- **VAT:** UAE 5 %, Saudi Arabia 15 %, Kuwait and Qatar none.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Annual cleaning plus soiling cost | $J(T) = 365C/T + pEsT/2$ | mz04, lessons 1 and 3 |
| Value by viewpoint | $p_{\text{IPP}} = t$, $p_{\text{nat}} = v$ | mz04, lesson 1 |
| Missed-row loss | $\Delta E = e_d P s D^2/2$ | Lesson 3 |
| Trust | $T = (C+R+I)/S$ | Lesson 4 |
| Back-test error | $\mathrm{MAE} = \frac{1}{N}\sum \lvert \hat L_i - L_i \rvert$ | Lesson 5 |
| Pilot EV | $EV = F - C_d + p_c\,\mathrm{ACV}\,GM\,n$ | fc04, lesson 5 |
| Site fee | $F = \max(F_{\min}, p_{\text{MW}} P)$ | Lesson 6 |
| Value capture | $\theta = F/V$ | Lesson 6 |
| Savings share | $F = \min(F_{\text{cap}}, \max(F_{\text{floor}}, \sigma S))$ | Lesson 6 |
| Gross margin | $GM = (R - C_{\text{del}})/R$ | Lesson 6 |
`;

export default cheatSheet;
