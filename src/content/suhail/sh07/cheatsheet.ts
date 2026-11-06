import { md } from "../../schema";

const cheatSheet = md`# SH07 Structures and how community companies make money: cheat sheet

## Conventions

- **Numbers:** all Suhail figures are illustrative; nothing has launched (no members, sponsors, events or revenue).
- **Legal facts:** regional nonprofit, licensing and permit rules are unverified; confirm with counsel per jurisdiction.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Fiscal host break-even | $R^{*} = C_e/f$ | Host or own entity |
| Top-tier cap | $P_{\text{top}} \le 0.25B$ | Sponsorship tiers |
| Cost per activated developer | $c_a = P_s/(aN)$ | Sponsor reports |
| Success fee | $\varphi W_1$ | Recruiting |
| Revenue share | $s_i = R_i/\sum R_j$ | By stream and by payer |
| Concentration | $H = \sum s_i^2$, $N_{\text{eff}} = 1/H$ | Quarterly review |
| Contribution and surplus | $CM_i = R_i - V_i$, $S = \sum CM_i - F$ | Monthly P&L |
| Sponsor LTV, payback | $Pm/(1-r)$, $\text{CAC}/(Pm)$ | Sponsor economics |
| Monthly churn from renewal | $1 - r^{1/12}$ | Widget input |
| Revenue per active member | $R/M_{\text{active}}$ | Community to money |
| Pay trigger | $S_{12} \ge 12n\sigma$ and $C_{\text{unres}} \ge k(F_m + n\sigma)$ | Paying leads |
| Revenue needed with stipends | $(F + 12n\sigma)/\bar m$ | Paying leads |
| Fund returner | $V_{\text{exit}} = F_{\text{fund}}/p_{\text{exit}}$ | VC fit |
| Unrestricted share | $u = R_{\text{unres}}/R$ | Grants |
| Weighted score | $S_j = \sum w_i x_{ij}$ | Decision memo |

## Structures

| Family | Surplus | Equity | Mission lock | Example |
|---|---|---|---|---|
| Nonprofit or foundation | Cannot be distributed | None | Strong | Python Software Foundation (PyCon US) |
| Plain for-profit | Distributable | Yes | Founders and published rules | Indie Hackers (Stripe, 2017) |
| Hybrid or locked for-profit | Depends | Yes (in the company) | Medium to strong | Mozilla (2005), Patagonia (2022), MLH (PBC) |
| Fiscal sponsorship | Host holds it | None | Host's goodwill | US hosted projects |

- **Non-distribution constraint:** what defines a nonprofit; source of donor trust; reason it has no shares.
- **Commercial income in a nonprofit:** US unrelated business income is taxed and can threaten exemption; recruiting, job posts and advertising are the weakest fit.
- **Reversibility:** for-profit to hybrid is an addition; nonprofit to for-profit is a conversion of locked assets.
- **Assets to the entity on day one:** name, suhail.build, mailing list, Luma calendar, Discord, podcast feed.

## Jurisdictions (confirm with counsel)

| Option | Key facts |
|---|---|
| UAE free zone | 100 % foreign ownership; licence activity list decides events, media, recruiting |
| ADGM, DIFC | Common-law zones; companies and foundations; higher cost |
| UAE tax | Corporate tax 9 % above AED 375,000 (years from 1 June 2023); 0 % qualifying free-zone income if conditions met; VAT 5 % |
| Saudi Arabia | MISA licence and CR for foreign founders; GEA permit for public or ticketed events, SCEGA for conferences (secondary); VAT 15 % |
| Kuwait | 51 % Kuwaiti default; 100 % via KDIPA outside the negative list |
| Delaware | YC funds Delaware, Cayman, Singapore (reported 2026); PBC form since 2013 |
| Netherlands | BV from EUR 0.01; stichting for nonprofit; ANBI for donor tax benefits |

## Revenue streams

| Stream | Buyer | Margin | Independence risk |
|---|---|---|---|
| Sponsorship | DevRel, recruiting, brand | Medium | Medium |
| Events and tickets | Attendees, exhibitors | Low to medium | Low |
| Membership | Individuals, companies | High | Low |
| Job board, recruiting | Employers | High | Medium |
| Programmes | Participants, sponsors, governments | Medium | Depends |
| Media | Advertisers | High once audience exists | High if editorial touched |
| Grants | Foundations, governments | Low unrestricted | Medium |

- **Published tiers:** HackPrinceton S25 USD 1k to 7.5k; AAAI 2025 USD 2.5k to 10k; Builderbase small event Gold about 1k, Platinum up to 5k.
- **In-kind:** value for reporting, never budget as cash.
- **Never for sale:** judging majority, editorial content, member data without opt-in, the research agenda, community-wide exclusivity.

## Case studies

- **{Tech: Europe}:** from {Tech: Berlin} (2023 to 2024); 2 to 3 free AI hackathons a month; sponsors fund prizes (Big Berlin Hack 300+ builders, EUR 50k+ prizes); careers board; revenue inferred, not published.
- **MLH:** public benefit corporation; corporate sponsors; 80k+ developers, 200+ events a year; three tiers, top at most 25 % of budget.
- **On Deck:** VC-funded; ODX (USD 125k for 7 %) wound down with layoffs in 2022; paid fellowship continues.
- **Indie Hackers:** sold to Stripe April 2017 at about USD 8k a month; bought back 2023.
- **Linux Foundation:** 501(c)(6) on memberships, events, training.

## Illustrative Suhail year 1 (USD thousand)

| Stream | Revenue | Contribution | Margin |
|---|---|---|---|
| Hackathons | 90 | 36 | 40 % |
| Conference | 80 | 25 | 31 % |
| Media | 24 | 18 | 75 % |
| Jobs | 18 | 15 | 83 % |
| Grants | 40 | 6 | 15 % |
| **Total** | **252** | **100** | **39.7 %** |

- **Surplus:** 100 minus fixed 30 = 70 with unpaid leads; $H = 0.230$, $N_{\text{eff}} = 4.3$.
- **Anchor sponsor:** 60 = 23.8 % of revenue; losing it cuts the surplus to 43.
- **Five leads at USD 1,500:** bill 90k, reserve 60k, revenue needed about 302k.

## Governance and money

- **Pay trigger:** both tests, all leads at once, written before the first sponsor.
- **Rewards:** stipend, profit share, vested equity (for-profit only), phantom equity.
- **Conflicts:** employer-sponsor, investor, participant, vendor; declare, record, recuse, approve.
- **Controls:** separation of duties, dual approval above a threshold, event budgets approved in advance, monthly reconciliation.
- **Publish:** revenue by stream, sponsor count and largest share, use of surplus, judges and rules, conflict summary.

## Funding

- **VC:** fund returner test; USD 50 m fund at 10 % needs USD 500 m exit; fits only a platform (talent marketplace, data or model company).
- **Grants:** restricted, tranches, capped overhead, eligible entity; route through a nonprofit or university for the research arm.
- **Sponsors:** cap any payer at 25 %; no community-wide category exclusivity.
- **MENA VC H1 2026 (MAGNiTT):** USD 1.35 bn, 214 deals, down 22 % in value and 41 % in deals; AI about half.

## Decision (illustrative)

| Option | Score |
|---|---|
| A Nonprofit only | 2.80 |
| B For-profit only | 3.95 |
| C Staged hybrid | 4.05 |
| D Fiscal sponsorship | 3.20 |

- **Recommendation:** C, staged: one for-profit operating company now; nonprofit research foundation or university partner when a grant requires it; equity only for a separate platform with evidence.
`;

export default cheatSheet;
