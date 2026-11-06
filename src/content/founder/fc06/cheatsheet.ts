import { md } from "../../schema";

const cheatSheet = md`# FC06 Finance & economics for founders: cheat sheet

## Conventions

- **Status of numbers:** all venture numbers in this module are **illustrative**, not Afterwave, Mizan or Suhail data.
- **Periods:** match the period of every rate to its quantity (monthly ARPA with monthly churn).
- **Monthly from annual churn:** $c_m = 1-(1-c_a)^{1/12}$; 10 %/yr is 0.87 %/month.
- **Markup vs margin:** 40 % markup on cost = 28.6 % gross margin.

## Accounting

| Quantity | Formula | Where |
|---|---|---|
| Accounting identity | $A = L + E$ | Every balance sheet, every month |
| Cash roll-forward | $C_{\text{end}} = C_{\text{start}} + CFO + CFI + CFF$ | Ties cash flow to balance sheet |
| Operating cash flow | $CFO = NI + D\&A - \Delta AR - \Delta Inv + \Delta AP + \Delta DR$ | Profit to cash |
| Ratable revenue | $R = V\cdot t/T$; $DR = \text{billed} - \text{recognised}$ | Subscriptions (IFRS 15, ASC 606) |
| Straight-line depreciation | $D = (\text{Cost} - \text{Residual})/n$ | Capitalised assets |

- **Upfront billing:** cash and deferred revenue now, revenue over the term.
- **Capitalising:** changes profit timing, never cash or runway.
- **IAS 38:** research always expensed; development capitalised only if all six criteria are met.
- **Illustrative Afterwave year:** net loss EUR 714k, CFO EUR -624k, cash burn EUR 684k, balance sheet EUR 896k.

## Unit economics

| Quantity | Formula | Where |
|---|---|---|
| CAC | $S\&M/N_{\text{new}}$, fully loaded, lagged by the cycle | Include founder selling time, unpaid pilots |
| Lifetime | $1/c$ | Geometric survival |
| LTV | $ARPA\cdot GM/c$ | Gross profit, not revenue |
| Discounted LTV | $ARPA\cdot GM/(c+d)$ | Discount rate adds to churn |
| CAC payback | $CAC/(ARPA\cdot GM)$ | Independent of churn |
| Contribution margin | $(R - COGS - V_{\text{other}})/R$ | Pricing floors, deal decisions |

- **Benchmarks (commonly quoted):** LTV/CAC above 3; payback under 12 months SMB, under 18 to 24 months enterprise.
- **Illustrative Afterwave enterprise:** ACV EUR 96k, GM 75 %, churn 10 %/yr, CAC EUR 150k: LTV/CAC 4.8 raw, 2.0 capped at 5 years, 1.6 discounted at 20 %; payback 25 months.

## SaaS and hardware metrics

| Quantity | Formula | Where |
|---|---|---|
| ARR bridge | $ARR_1 = ARR_0 + N + X - K - C$ | Board pack |
| NRR | $(ARR_0 + X - K - C)/ARR_0$ | Can exceed 100 % |
| GRR | $(ARR_0 - K - C)/ARR_0$ | Capped at 100 % |
| Burn multiple | Net burn / net new ARR | From about EUR 1 m ARR |
| Rule of 40 | Growth % + profit margin % at least 40 | Scaled software only |
| Gross margin | $(R - COGS)/R$ | Split by software, services, hardware |
| Cash conversion cycle | $DIO + DSO - DPO$ | Hardware and slow-paying buyers |

| Burn multiple | Reading (Sacks) |
|---|---|
| < 1 | Amazing |
| 1 to 1.5 | Great |
| 1.5 to 2 | Good |
| 2 to 3 | Suspect |
| > 3 | Bad |

- **ARR excludes:** pilots, services, outright hardware, unsigned renewals.
- **Logo vs revenue churn:** report both; one large loss shows only in revenue churn.

## Runway and default alive

| Quantity | Formula | Where |
|---|---|---|
| Runway | $C_0/(E - R)$ | Forward net burn |
| Cash with growth | $C_n = C_0 - nE + R_0(1+g)((1+g)^n - 1)/g$ | Constant expenses |
| Breakeven month | $n^* = \ln(E/R_0)/\ln(1+g)$ | Default-alive test: $C_{n^*} \ge 0$ |

| Runway left | Action |
|---|---|
| > 18 months | Build, collect evidence |
| 12 to 18 | Start investor conversations |
| 9 to 12 | Active process, cut plan ready |
| 6 to 9 | Bridge or execute cuts |

- **Illustrative:** EUR 2.0 m, EUR 120k/month costs, EUR 15k/month revenue: 19 months simple; default alive at 8 %/month growth, dead at 6 %.

## Modelling

| Quantity | Formula | Where |
|---|---|---|
| Bottom-up bookings | $N_{SQL}\cdot p_{\text{pilot}}\cdot p_{\text{convert}}\cdot ACV$ | Revenue build, run in reverse for targets |
| Loaded cost | $S(1+k)\,m/12$ | Hiring plan |
| Magic number | $4(R_q - R_{q-1})/S\&M_{q-1}$ | Above about 0.75: spend more |

- **Structure:** inputs, revenue build, headcount, other costs, three statements, metrics and checks.
- **Binding constraint in early enterprise models:** delivery capacity, not demand.

## Pricing

| Quantity | Formula | Where |
|---|---|---|
| Elasticity | $\varepsilon = (dQ/Q)/(dP/P)$ | $dR/dP = Q(1+\varepsilon)$ |
| Lerner condition | $(P^* - c)/P^* = -1/\varepsilon$ | Any demand curve |
| Constant elasticity | $P^* = c\,\varepsilon/(1+\varepsilon)$ | Hardware, consumables |
| Linear demand | $P^* = (a/b + c)/2$ | When marginal cost is near zero |
| EVC | $V_{\text{ref}} + \Delta V_{\text{diff}}$; capture 10 to 30 % | Enterprise B2B |
| A/B sample per arm | $(z_{1-\alpha/2}+z_{1-\beta})^2[p_1(1-p_1)+p_2(1-p_2)]/(p_1-p_2)^2$ | 4 % vs 3 %: about 5,300 |

- **Discount only for something:** term, upfront payment, reference or case study.
- **Pricing unit:** the one that scales with customer value (rigs, MWp, sites).

## Budgeting and scenarios

| Quantity | Formula | Where |
|---|---|---|
| Variance | $\Delta = A - B$; $\Delta\% = (A-B)/B$ | Split into volume, price, timing |
| Expected value | $\sum p_i X_i$ | Compare decisions; do not set spending on it |

- **Plan on the bear case;** set triggers (threshold, date, action, owner).
- **Illustrative tornado:** hiring pace and new MRR per month dominate cash at month 18.

## Micro and macro

| Quantity | Formula | Where |
|---|---|---|
| Average cost | $AC = F/Q + c$ | Scale economies |
| Learning curve | $C_n = C_1 n^{\log_2 b}$ | Hardware platforms, modules, cells |
| Network links | $n(n-1)/2$ | Upper bound on direct network value |
| Gordon value | $V = CF_1/(r-g)$ | Rate sensitivity $-1/(r-g)$ |

- **Tipping conditions:** strong network or scale effects, high switching costs, costly multi-homing, homogeneous needs.
- **Fed funds:** 0 to 0.25 % (March 2020 to March 2022), 5.25 to 5.50 % by July 2023.
- **Gulf pegs:** riyal and dirham to the USD; Kuwaiti dinar to a USD-dominated basket since 2007.
- **MENA VC (MAGNiTT):** USD 3.8 bn in 2025; USD 1.35 bn in H1 2026 (-22 % year on year).
- **Cross-link:** NPV, IRR and WACC in Track 0, Module 10, Lesson 1.
`;

export default cheatSheet;
