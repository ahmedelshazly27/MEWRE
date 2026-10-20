import { md } from "../../schema";

const cheatSheet = md`# M10 Financial Management — cheat sheet

## Conventions

- **Timing:** end-of-year flows; year 0 = COD (capex includes IDC).
- **Exchange rate:** 1 KWD = 3.25 USD (assumed).
- **Tariff units:** 1 US cent/kWh = 3.08 fils/kWh.
- **Quick unit check:** USD m ÷ GWh = USD/kWh.
- **Status of numbers:** all model numbers are **illustrative**, not Kuwait bid data.

## Time value of money

| Quantity | Formula | Where / use |
|---|---|---|
| Present value | $PV = CF_t/(1+r)^t$ | Discount one flow |
| NPV | $NPV = \sum CF_t/(1+r)^t$ | Decide: highest NPV among exclusive options. Excel: =CF0 + NPV(r, CF1:CFN) |
| IRR | $0 = \sum CF_t/(1+IRR)^t$ | Communicate. Traps: multiple IRRs, reinvestment at IRR, scale |
| MIRR | finance rate on outflows, reinvestment rate on inflows | Unique, realistic return |
| Payback | $PB = Y + \lvert C_Y\rvert/CF_{Y+1}$ | Liquidity/risk only |
| Fisher | $(1+r_n) = (1+r_r)(1+i)$ | Nominal flows with nominal rate; real with real |
| WACC | $WACC = \frac{E}{V}k_e + \frac{D}{V}k_d(1-T)$ | Base: 0.2×9 % + 0.8×5.5 % = **6.2 %** (4.12 % real at 2 %) |

- **Discount factors at 6.2 %:** year 10 = 0.548, year 20 = 0.300, year 30 = 0.165.

## LCOE

| Quantity | Formula | Where |
|---|---|---|
| LCOE | $\mathrm{LCOE} = \frac{\sum (I_t+O_t)(1+r)^{-t}}{\sum E_t(1+r)^{-t}}$ | Full discounted definition |
| Capital recovery factor | $\mathrm{CRF} = \frac{r(1+r)^n}{(1+r)^n-1}$ | PV to equal annual amount |
| Quick LCOE | $\mathrm{LCOE}\approx\frac{I_0\,\mathrm{CRF}+O}{E}$ | Screening only |

### Base case

- **Plant:** 1,100 MWac / 1,430 MWp, single-axis trackers.
- **Yield:** 2,100 kWh/kWp, 3,003 GWh/yr, CF 31.2 %; degradation 0.4 %/yr.
- **Capex:** USD 560 m (0.392 USD/Wp, 509 USD/kWac).
- **Opex:** USD 7.5 m/yr, +2 %/yr; life 30 years.

| WACC | 5 % | 6 % | **6.2 %** | 6.45 % (= project IRR) | 7 % | 8 % |
|---|---|---|---|---|---|---|
| LCOE (USc/kWh) | 1.595 | 1.735 | **1.764** | 1.800 | 1.881 | 2.032 |

- **CRF(6.2 %, 30):** 0.0742.
- **Naive CRF LCOE:** 1.634 USc/kWh (understates by 7 %).

| Tornado driver | Swing (USc/kWh) |
|---|---|
| Yield ±10 % | 0.356 |
| Capex ±10 % | 0.288 |
| WACC ±1 pt | 0.288 |
| Opex ±20 % | 0.129 |
| Degradation | 0.080 |

### Gulf records (reported, verify)

| Project | Year | Tariff (USc/kWh) |
|---|---|---|
| MBR 5 | 2019 | ≈ 1.69 |
| Al Dhafra | 2020 | ≈ 1.35 |
| Sudair | 2021 | ≈ 1.24 |
| Al Shuaibah | 2021 | ≈ 1.04 |

- **Drivers of low tariffs:** high yield; capex 0.30–0.45 USD/Wp; cheap long-tenor 75–85 % debt; long PPAs; low tax; offtaker carries grid, curtailment and change-in-law risk.
- **Kuwait Zone 1 tariff:** not published.

## CAPEX / OPEX

- **DC to AC cost:** $c_{AC} = c_{DC}\times DC/AC$.

| Base capex item | Share / amount |
|---|---|
| Modules | 28 % |
| Trackers | 17 % |
| Inverters | 9 % |
| Balance of system | 10 % |
| Civil | 8 % |
| Labour | 5 % |
| 400 kV substation | 6 % |
| EPC indirects | 8 % (EPC total USD 510 m) |
| Development | USD 15 m |
| Financing / IDC | USD 25 m |
| Contingency | USD 10 m |

- **Outside the IPP capex:** MEWRE's 400 kV line, KD 48.6 m (≈ USD 158 m).
- **Opex:** USD 7.5 m/yr ≈ USD 6.8/kWac/yr; O&M 40 %, insurance 20 %, cleaning 19 %.
- **BESS:** BNEF 2024 ≈ USD 165/kWh turnkey (global average, 4 h); plan for augmentation.

**Optimal cleaning interval:**

$$N^{*} = \sqrt{730C/(sEp)}$$

- **Manual cleaning:** C = 143 k, s = 0.3 %/day gives about 25 days, ≈ USD 4.1 m/yr.
- **Nightly robots:** ≈ USD 3.0 m/yr.

| AACE class | Accuracy range |
|---|---|
| 5 | −50 % / +100 % |
| 4 | −30 % / +50 % |
| 3 | −20 % / +30 % |
| 2 | −15 % / +20 % |
| 1 | −10 % / +15 % |

- **Contingency floor:** at least the EMV $\sum p_iI_i$; budget at P80.

## Project finance

| Quantity | Formula | Where |
|---|---|---|
| CFADS | CFADS = Revenue − Opex − Tax − ΔWC − reserves | Base for sizing |
| DSCR | DSCR = CFADS/(I+P) | Each period |
| Sculpted debt capacity | $D_{max} = \sum (CFADS_t/DSCR)/(1+k_d)^t$ | Sizing |
| Debt | Debt = min(D_max, g_max × capex) | Binding constraint |
| LLCR | LLCR = PV(CFADS, loan life)/D | Cover over loan life |
| PLCR | PLCR = PV(CFADS, project life)/D | Includes tail |

**Cash waterfall (in order):**

- Opex and tax
- Senior debt service
- DSRA (6 months)
- Maintenance reserve
- Lock-up test (1.10–1.20x)
- Dividends

- **Default covenant:** about 1.05x.

| Base case @ 1.80 USc | Value |
|---|---|
| Sculpted capacity / debt | 461.4 / **448.0** (gearing cap binds) |
| Equity | 112.0 |
| DSCR min = avg = LLCR | 1.287x |
| PLCR | 1.377x (5-year tail) |
| Project / equity IRR | **6.45 % / 8.97 %** |
| P90 year 1 DSCR (−7 %) | 1.183x |
| +100 bp rates | debt 421.3, equity IRR 6.35 %; tariff to restore 1.906 |

## Tariff evaluation

| Quantity | Formula | Where |
|---|---|---|
| Levelized tariff | $LT = \sum T_tE_t(1+d)^{-t}/\sum E_t(1+d)^{-t}$ | Compare bid paths |
| Indexed path | $T_t = T_1(1+g)^{t-1}$ | Escalating bids |

- **Publish before bids:** discount rate d, energy profile and index paths.
- **Discount-rate effect:** a higher d favours back-loaded (indexed) bids.

| @ 7 % | A flat 1.80 | B 1.62 +1.5 %/yr | C flat 1.44 | D 1.95→1.65 (yr 11) |
|---|---|---|---|---|
| LT (USc) | 1.800 | 1.879 | **1.440** (−20.5 % vs median) | 1.824 |
| PV payments (USD m) | 645.4 | 673.7 | 516.3 | 653.9 |

- **Bid C at base costs:** project IRR 3.82 %, equity IRR 1.70 % (negative leverage).
- **Bid C break-even:** needs capex ≈ USD 424 m for a 9 % equity IRR.
- **Aggressive-bid risks to MEWRE:** no financial close, delay, quality cuts, claims, distress or termination.

## Budget control & cash flow

- **Budget cycle:** budget → commitment → accrual (IPC) → expenditure.
- **Fiscal year:** assumed 1 Apr–31 Mar (verify with MoF).
- **Audit Bureau prior review:** contracts ≥ KD 100 k (verify).
- **Law 94/2026:** direct contracting up to KD 1 m per financial year without CAPT.

| Quantity | Formula | Where |
|---|---|---|
| S-curve | $F(t) = (1-\cos(\pi t/T))/2$ | Cumulative progress |
| Advance recovery | $R_k = \min(aG_k, A-\sum R)$ | Once cumulative > 10 % |
| Retention | $\min(\rho G_k, L\,CV - \sum Ret)$ | ½ at TOC, ½ after DNP |

**Worked case:** KWD 45 m, 24 months from Jun 2026, 10 % advance, 25 % amortisation, 10 %/5 % retention.

| Fiscal year | Cash need (KWD m) |
|---|---|
| FY26/27 | 14.282 |
| FY27/28 | 26.755 |
| FY28/29 | 2.838 |
| FY29/30 | 1.125 |

- **20 % advance:** FY26/27 rises to 18.782; recovery completes in month 19.
- **3-month delay:** FY26/27 falls to 9.537.

| EVM quantity | Formula |
|---|---|
| CPI | $CPI = EV/AC$ |
| SPI | $SPI = EV/PV$ |
| EAC1 | $EAC_1 = BAC/CPI$ |
| EAC2 | $EAC_2 = AC + (BAC - EV)$ |
| EAC3 | $EAC_3 = AC + (BAC - EV)/(CPI \cdot SPI)$ |
| TCPI | $TCPI = (BAC - EV)/(BAC - AC)$ |

- **Month 12:** CPI 0.934, SPI 0.880 → EAC 46.4 / 48.2 / 51.9; TCPI 1.059.
- **Owner EAC:** CV + approved VOs + Σ p·claims/risks + owner's costs = 45.0 + 1.6 + 2.0 + 2.0 = **50.6** vs budget 51.5.

## PM checklist (any number you are given)

- **Basis:** real or nominal, DC or AC, currency, price date.
- **Scope boundaries:** grid, land, owner's costs, IDC.
- **Yield basis:** P50 vs P90.
- **Debt:** which constraint binds.
- **Cover ratio:** minimum (not average) DSCR.
- **Evaluation parameters:** fixed in the RFP.
- **EAC:** a range, not a point.
- **Contingency:** every movement documented.
- **Headline numbers:** reproduce them yourself.

**Downloads:**

- lcoe-model.xlsx
- project-finance-model.xlsx
- tariff-bid-evaluation.xlsx
- cashflow-forecast.xlsx
- evm-tracker.xlsx
`;

export default cheatSheet;
