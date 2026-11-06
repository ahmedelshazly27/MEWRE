import { md } from "../../schema";

const cheatSheet = md`# FC01 Startup fundamentals: cheat sheet

## Conventions

- **Status of numbers:** all venture numbers are **illustrative** unless a source is named.
- **Growth:** convert to the same period before comparing (weekly to annual: power 52; monthly: power 12).
- **Money:** EUR for Afterwave examples, KWD or USD for Mizan, USD for Suhail.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Fund-returner exit | $V_{exit} = F/o_{exit}$ | L1: can this company return the fund? |
| Ownership after dilution | $o_{exit} = o_0\prod(1-d_i)$ | L1, L2: investor or founder stake |
| Compound growth | $R_n = R_0(1+g)^n$ | L1, L5 |
| Doubling time | $t_d = \ln2/\ln(1+g)$ | L1 |
| Net burn, runway | $B = E - R$, $T_{run} = C/B$ | L1 |
| Break-even month | $n^{*} = \ln(E/R_0)/\ln(1+g)$ | L1 |
| Cash to break-even | $B_{cum} = nE - R_0((1+g)^n-1)/g$ | L1: alive if $B_{cum} \le C$ |
| Round size | $I = \sum_{t=1}^{M+b}(E_t - R_t) - C_0$ | L2 |
| Post-money, dilution | $V_{post} = V_{pre} + I$, $d = I/V_{post}$ | L2 |
| Bottom-up market | $M = N\times\mathrm{ACV}$; $\mathrm{SOM} = s\times\mathrm{SAM}$ | L3 |
| Value-based ACV | $\mathrm{ACV} \le k\,V_c$, $k \approx 0.1$ to $0.3$ | L3 |
| Joint probability | $P = \prod p_i$ | L4: must-go-right chain |
| Expected loss | $EL = p\times L$ | L4 |
| Split-focus growth (model) | $(1 + f g_{max})^n$ | L5 |
| Staged bet | $EV_{staged} = p(V - I_2) - I_1$; gain $(1-p)I_2 - I_1$ | L5 |

## Venture math (L1)

- **Power law:** most investments return under 1x; one or two return most of the fund.
- **Illustrative portfolio:** 30 companies return 3.43x; without the best one, 1.43x.
- **Fund-returner example:** EUR 50 m fund, 10% diluted to 6.12%: needs a EUR 817 m exit.
- **Fund life:** about 10 years (often extended): outcomes must arrive in time.
- **Venture-scale:** large ceiling, fast-growth mechanism, fits fund timeline. Otherwise finance differently.

| Growth | Per year | Doubling |
|---|---|---|
| 1%/week | 1.68x | 70 weeks |
| 5%/week | 12.6x | 14.2 weeks |
| 10%/month | 3.14x | 7.3 months |
| 15%/month | 5.35x | 5.0 months |

- **T2D3:** triple, triple, double, double, double = 72x in five years.
- **Default alive example:** EUR 600k cash, EUR 45k costs, EUR 8k revenue at 10%/month: break-even month 19 with EUR 154k left. Threshold about 7.3%/month.

## Stages (L2)

| Stage | Risk retired | Evidence to move on |
|---|---|---|
| Idea | Problem | 20 to 50 discovery calls; buyers agree on the problem |
| Pre-seed | Solution | Product used by 2 to 5 design partners; first payments or LOIs |
| Seed | Product-market fit | Paying customers who renew and expand; pull |
| Series A | Go-to-market | Repeatable sales without the CEO; unit economics; 2 to 3x/yr |
| Series B+ | Scale | Efficient growth across segments and geographies |

- **PMF signals:** retention curve flattens; 40% "very disappointed" (Sean Ellis); pilots convert at list price; expansion; shorter cycles.
- **Round size:** net burn to next milestone plus about 6 months; 18 to 24 months runway after a seed.
- **Indicative US raises (verify):** pre-seed USD 0.5 to 2 m; seed USD 2 to 5 m; Series A USD 8 to 20 m; 15 to 25% dilution per priced round.
- **YC standard deal (secondary sources):** USD 500k = USD 125k post-money SAFE for 7% plus USD 375k uncapped MFN SAFE.

## Ideas and markets (L3)

- **Bottom-up, not top-down:** count buying units, multiply by value-based ACV.
- **Illustrative Afterwave:** TAM EUR 2.0 bn, SAM EUR 300 m, 5-year SOM EUR 9 m; venture case needs expansion to about EUR 100 m revenue.
- **Illustrative Mizan:** about USD 2,300/MW/yr value created, USD 690 capturable; cleaning cost, not recovered energy, is the larger pool at Gulf tariffs.
- **Why now:** technology threshold, dated regulation, cost-curve drop, new behaviour. Afterwave: EU Machinery Regulation applies 20 Jan 2027.
- **Unfair advantage test:** could a funded rival get it within 12 months with money?
- **Founder-market fit:** insight, credibility, access, staying power.

| Rubric criterion | Weight |
|---|---|
| Pain | 20% |
| Market ceiling | 20% |
| Why now | 10% |
| Unfair advantage | 15% |
| Founder-market fit | 15% |
| Time to first revenue | 10% |
| Capital efficiency | 10% |

## Failure (L4)

- **Proximate vs root:** cash runs out; the root is market need, business model, team, competition, timing or regulation.
- **Post-mortems (CB Insights 2021, verify):** cash 38%, no market need 35%, outcompeted 20%, business model 19%.
- **Base rates (verify):** about three quarters of venture-backed startups do not return capital (Ghosh, 2012).
- **Chains:** five steps at 0.9 give 0.59; at 0.8 give 0.33. Improve the weakest link first.
- **Pre-mortem:** "It is [date]; it failed; why?" Silent writing, round-robin, cluster, indicators with owners.

## Several ventures (L5)

- **Compounding penalty:** 15%/month for 24 months: full focus 28.6x, half focus 5.7x.
- **Weinberg switching rule (heuristic):** time per project 100, 40, 20, 10, 5% for 1 to 5 projects.
- **Rational exceptions:** external waiting time, someone else leads, shared assets, cheap staged options.
- **Staged bet:** worth it when $(1-p)I_2 > I_1$. Mizan illustration: EV 0.46 vs 0.30 EUR m.
- **Portfolio actions:** double down, hand off, pause or merge, kill. Criteria: metric, threshold, date, written in advance.
- **Investor answer:** name the primary venture, the bounded roles of the others, separate IP, honest hours.
`;

export default cheatSheet;
