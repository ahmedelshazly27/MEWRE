import { md } from "../../schema";

const cheatSheet = md`# AW14 Pricing, YC and company setup: cheat sheet

## Conventions

- **Numbers:** all prices, costs and plans are illustrative, not real Afterwave terms or traction.
- **Facts:** YC terms and dates, EIC, Innosuisse and Swiss capital rules come from secondary sources; confirm before relying on them.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| ACV build | $ACV = F + n\sum_j p_j$ | Quotes, price sheet |
| Customer value | $V = n\,H\,s\,c_h$ | Pilot business case |
| Capture ratio, payback | $k = ACV/V$, $t_{pb} = 12\,ACV/V$ | Price check |
| Gross margin | $GM = (P - C_{serve})/P$ | On-prem vs hosted |
| Hosted price floor | $P \ge C_{serve}/(1-m)$ | Hosted uplift |
| Hardware price | $P = C_{landed}/(1-m)$ | Test platforms |
| Cost per billable hour | $(C_{cap}/L + C_{fix})/(H_{av}U) + c_v$ | TaaS |
| TaaS EBIT | $H_{av}U(p-c_v) - C_{cap}/L - C_{fix}$ | TaaS |
| Breakeven utilisation | $U^* = (C_{cap}/L + C_{fix})/(H_{av}(p-c_v))$ | TaaS |
| YC stake | $0.07 + 375\text{k}/V_{cap,post}$ | Cap table |
| Net team cost | $\sum n_i c_i - W$ | Location choice |
| WBSO 2026 | $r_1\min(S, 391{,}020) + 0.16\max(S - 391{,}020, 0)$, $r_1$ = 36 % or 50 % (starter) | Dutch payroll |
| Round size | $R = \sum B_t + B_{T_m}T_b$, $d = R/V_{post}$ | Seed plan |

## Pricing infrastructure software

- **Value metric:** per connected rig; platform fee per site for fixed cost to serve.
- **Avoid:** per GB (taxes capture), per seat (few engineers, many rigs, agents).
- **Capture ratio:** 10 to 25 % of quantified value for a new category.
- **On-prem:** term licence with mandatory support; one-off deployment fee.
- **Hosted:** price an infrastructure uplift; do not accept a silent margin drop.
- **Pilot:** paid, fixed weeks and rigs, written metrics vs the lab's baseline, credited to year 1.
- **Discounts:** only for term, upfront payment or references; indexation clause from day one.

| Illustrative 24-rig lab | Value |
|---|---|
| ACV (EUR 40k + 24 x EUR 10k) | EUR 280k |
| Value (24 x 1,800 h x 25 % x EUR 120) | EUR 1.296m |
| Capture, payback | 21.6 %, 2.6 months |
| On-prem GM / hosted GM at same price | 87.5 % / 76.8 % |

## Test platforms and TaaS

- **Sell:** hardware margin from landed cost, software attached per platform; customer carries utilisation.
- **Lease:** recurring fee; needs financing; Afterwave carries the asset.
- **TaaS:** Afterwave carries utilisation; price per hour block or per campaign; fixtures as NRE.
- **Margin vs markup:** cost x 1.4 is a 28.6 % margin.
- **Data rights:** raw data customer's; de-identified derived data licensed and priced; customer models stay with customer.

| Illustrative TaaS rig | Value |
|---|---|
| Capex, life | EUR 400k, 5 yr |
| Fixed, variable | EUR 120k/yr, EUR 25/h |
| 6,000 h available, 60 % utilisation, EUR 140/h | EBIT EUR 214k |
| Breakeven utilisation | 29.0 % (39.2 % at EUR 110/h) |
| Payback | 1.36 yr |

## YC and US expectations

- **Deal (reported 2026):** USD 125k for 7 % (implied USD 1.79m post) + USD 375k uncapped MFN; pro rata.
- **W27:** deadline 2 Nov 2026 (passed); decisions about 11 Dec 2026; batch about Jan to Mar 2027, San Francisco.
- **Eligible parents:** US (Delaware), Cayman, Singapore (Canada reportedly dropped Jan 2026).
- **Acceptance forces:** full-time founders, SF presence, eligible parent before SAFEs.
- **Partner probes:** test automation?, hardware?, on-prem cycles, why not Nominal or Sift, who codes, regulation dependence, scale.
- **Seed evidence:** design partners, measured paid pilots. **Series A:** recurring revenue, expansion, motion beyond founders.

## Company setup

- **Three layers:** holding (investors), operating (team, R&D), contracting (customers).
- **If YC:** Delaware parent + Dutch BV subsidiary (cost-plus R&D); Swiss subsidiary only for planned Zurich hires.
- **If no YC:** Dutch BV with holding BVs and STAK; flip on a US lead.
- **Swiss capital:** GmbH CHF 20,000 fully paid; AG CHF 100,000, at least 20 % per share and CHF 50,000 paid in.
- **Dutch BV:** EUR 0.01 minimum, notarial deed, KVK.
- **Grants follow the employer:** WBSO (Dutch payroll), Innovatiekrediet (NL company), EIC (EU or associated SME; US parent effect unverified), Innosuisse (unverified).

## Fundraising story

- **Insight:** selection, not execution; needs one clock and a change graph.
- **Why now:** physical AI change frequency; Machinery Regulation from 20 Jan 2027 (notified body for ML safety components); AI Act requirements via delegated acts (timing tied to 2 Aug 2028); category capital (Nominal USD 1bn, Sift USD 42m, Foxglove USD 40m).
- **Never claim** the regulation mandates the product; value exists without it.
- **Vision order:** Lockstep + Ripple, Enclave models and agents, overnight agent retests, platforms.
- **Illustrative seed:** EUR 2.46m burn to month 18 + EUR 1.08m buffer = EUR 3.5m; 23.3 % at EUR 15m post.
`;

export default cheatSheet;
