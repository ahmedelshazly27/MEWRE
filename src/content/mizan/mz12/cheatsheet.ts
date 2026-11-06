import { md } from "../../schema";

const cheatSheet = md`# MZ12 Distribution, partners and the business model: cheat sheet

## Conventions

- **Numbers:** all prices, margins and volumes are illustrative, not Mizan terms or market quotes.
- **Legal points:** Kuwaiti agency, procurement, boycott, registry and residency rules come from secondary summaries; confirm with Kuwaiti counsel before relying on them.
- **Venture facts:** SwishOS was discussed as a partner, nothing agreed; the Shagaya Phase I pilot is targeted, not signed.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Gross margin | $GM = (P - C)/P$ | Every line, reported separately |
| Contribution | $u = P - c$ | Per MW per year or per unit |
| Build vs partner break-even | $Q^* = (F_b - F_p)/(u_b - u_p)$ | Build or partner decision |
| Delay cost | $L = uQt_d$ | Speed argument for partnering first |
| Risk-adjusted value | $E[V] = pV - K$ | Build risk vs partner risk |
| Agent commission | $I = kV$ | Agency deals (private buyers only, if lawful) |
| Distributor gross profit | $GP = Q(P_s - P_b - c_l)$ | Resale deals |
| Shortfall payment | $S = r\max(0, M - A)$ | Minimum-purchase clauses |
| Landed cost | $C_L = \text{CIF} + t_d\,\text{CIF} + K$ | Pricing imported hardware |
| LC cost | $C_{LC} = A\,r\,t/12 + f$ | Payment terms |
| Peak cash exposure | running max of paid minus received | Deal feasibility |
| Revenue-share net | $N = (sP - c_l)Q - F_p$ | Analytics partnership |
| Break-even share | $s^* = (F_p/Q + c_l)/P$ | Negotiating the share |
| Open funnel | $N_{opp} = N_u r_1 r_2 r_3$ | Open research programme |
| Cost per opportunity | $c_{opp} = C/N_{opp}$ | Comparing channels |

## Build, partner or resell

- **Four variables:** margin, control, speed, risk.
- **Five control points:** customer contract, plant data history, decision logic, brand on the screen, people on site.
- **Rule:** partner on anything except the control points your strategy needs.

| Line | Mode | Why |
|---|---|---|
| Soiling analytics and cleaning decisions | Build | Core edge: KISR method, Kuwait data, validation |
| Stow and tracker functions | Build logic, partner for access | Vendor non-objection needed (mz05) |
| PPC/EMS | Partner (certified controller plus Mizan functions) | Grid-code critical, mature vendors |
| BESS | Resell or subcontract (EMS, commissioning, O&M) | Capital-heavy, long warranties |
| Cleaning robots | VAR plus fleet O&M and optimisation | Hardware is the entry ticket; service is the business |
| Open research tools | Open | Credibility and inbound |

| Illustrative economics | Value |
|---|---|
| Built analytics | USD 1,500 per MW per year, about 90 % GM |
| Partner analytics break-even | 400 MWp ($F_b$ 400k, $F_p$ 80k, $u_b$ 1,400, $u_p$ 600) |
| Robot resale | USD 550 per robot, 11 % GM; 5-year O&M worth over 4 times the hardware profit |

## Kuwait agency and distribution

- **Agent:** commission; principal signs, owns goods, carries credit risk.
- **Distributor or VAR:** buys and resells; carries title, stock, credit and warranty handling.
- **Commercial agencies law:** commonly cited as Law 13 of 2016; MOCI register; exclusivity not presumed; termination compensation rules. Confirm.
- **Law 1 of 2024:** no local agent required for foreign branches (Commercial Law Art. 24, per Al Tamimi and BDO) or for registered foreign bidders (Tenders Law Art. 31, per Chambers). Sources differ on the article.
- **Law 94 of 2026:** gazetted 27 Sep 2026, effective about late Dec 2026; reported ban on local and commission agents in public contracting; KWD 1 m direct-contracting threshold; tighter local content.
- **Consequence:** for MEWRE, KISR and CAPT tenders Mizan is contracting party or named subcontractor with real scope, never a commission agent.

| Clause | Mizan position |
|---|---|
| Exclusivity | Earned: conditional on minimums, defined territory and segments |
| Minimums | Tied to awarded tenders; remedy is loss of exclusivity, not payment |
| Non-compete | Hardware only; never Mizan's software or services |
| Data | Owner owns; Mizan gets API access under the owner's licence |
| Post-termination | Finish awarded tenders, stock buy-back, 5 to 7 years of support |

## Vendors, logistics and payment

- **Due diligence:** corporate, technical, commercial, compliance; first question is manufacturer or trading house.
- **BESS certificates:** IEC 62619, IEC 62933, UL 1973, UL 9540 and UL 9540A, UN 38.3, NFPA 855 design.
- **Robots:** ISO 12100 risk assessment, IEC 60529 IP rating, module vendor compatibility letter.
- **Controllers:** IEC 62443; vendor remote access off by default through an owner-controlled gateway.
- **Warranty:** back-to-back, desert exclusions read, backed by retention, bond, parent guarantee or local spares.
- **Israeli-origin vendors:** not a practical option in Kuwait (statutory boycott, commonly cited as Law 21 of 1964); confirm.
- **LC:** banks pay against documents; add an independent inspection certificate.

| Illustrative 20 MWh BESS | USD |
|---|---|
| FOB | 2,400,000 |
| CIF | 2,490,000 |
| Duty at 5 % of CIF | 124,500 |
| Landed | 2,654,500 (132.7 per kWh) |
| LC cost (1.68 m, 4 months, 1.5 %) | 9,900 |
| Peak cash exposure | 2,354,500 for 345,500 gross profit |

## Analytics partner (SwishOS)

- **Facts (research brief):** Swish Solar, Waterloo; soiling modelling and cleaning schedules from existing plant data; priced by capacity; USD 1.5 m pre-seed (Nov 2025).
- **Overlap:** competitor in the core; Mizan's ground is KISR validation, Kuwait data, stow control, local access.
- **Best path (illustrative):** hybrid, partner 2 years then own engine: USD 1.47 m cumulative by year 5 vs 1.31 m partner-only and 0.45 m build-only.
- **Negotiate in order:** customer contract and migration, data rights, validation and publication, benchmarking, joint IP, commercials, white-label rights, non-solicit, change of control and continuity, liability and security.
- **Never before terms:** KISR introductions or Kuwaiti data.

## Public claims and open tools

- **Evidence ladder:** discussed, targeted or in preparation, signed, running, results measured, validated or published; words never above the rung.
- **Today:** Shagaya soiling pilot targeted or in preparation; SwishOS discussed; all numbers illustrative.
- **Names and logos:** written consent per use; cite papers, never imply endorsement.
- **Confidential data leak vectors:** screenshots, metadata and notes, code fixtures and commit history, dataset metadata, forwarded decks, unapproved tools.
- **Open:** atlas, electricity dataset, toolkit, baseline method, docs. **Closed:** decision engine, stow logic, calibrations, customer data.
- **Licences:** Apache-2.0 or MIT for code; CC BY 4.0 or ODbL for data; never more open than the most restrictive input.
- **Funnel (illustrative):** 2,000 users, 5 %, 10 %, 20 % gives 2 pilot conversations; USD 10,000 each vs 25,000 outbound.
`;

export default cheatSheet;
