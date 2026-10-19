import { md } from "../../schema";

const cheatSheet = md`# M10 Financial Management — cheat sheet

**Conventions:** end-of-year flows, year 0 = COD (capex incl. IDC). 1 KWD = 3.25 USD (assumed). 1 US cent/kWh = 3.08 fils/kWh. USD m ÷ GWh = USD/kWh. All model numbers are **illustrative**, not Kuwait bid data.

## Time value of money

| Formula | Use |
|---|---|
| $PV = CF_t/(1+r)^t$ | Discount one flow |
| $NPV = \sum CF_t/(1+r)^t$ | Decide (highest NPV among exclusive options). Excel: =CF0 + NPV(r, CF1:CFN) |
| $0 = \sum CF_t/(1+IRR)^t$ | Communicate. Traps: multiple IRRs, reinvestment at IRR, scale |
| MIRR (finance & reinvest rates) | Unique, realistic return |
| $PB = Y + \lvert C_Y\rvert/CF_{Y+1}$ | Liquidity/risk only |
| $(1+r_n) = (1+r_r)(1+i)$ | Nominal flows ↔ nominal rate; real ↔ real |
| $WACC = \frac{E}{V}k_e + \frac{D}{V}k_d(1-T)$ | Base: 0.2×9 % + 0.8×5.5 % = **6.2 %** (4.12 % real at 2 %) |

DF at 6.2 %: yr 10 = 0.548, yr 20 = 0.300, yr 30 = 0.165.

## LCOE

$$\mathrm{LCOE} = \frac{\sum (I_t+O_t)(1+r)^{-t}}{\sum E_t(1+r)^{-t}} \qquad \mathrm{CRF} = \frac{r(1+r)^n}{(1+r)^n-1} \qquad \mathrm{LCOE}\approx\frac{I_0\,\mathrm{CRF}+O}{E}$$

**Base case** 1,100 MWac / 1,430 MWp trackers, 2,100 kWh/kWp (3,003 GWh, CF 31.2 %), 0.4 %/yr, USD 560 m (0.392/Wp, 509/kWac), opex 7.5 m +2 %/yr, 30 yrs:

| WACC | 5 % | 6 % | **6.2 %** | 6.45 % (= project IRR) | 7 % | 8 % |
|---|---|---|---|---|---|---|
| LCOE (USc/kWh) | 1.595 | 1.735 | **1.764** | 1.800 | 1.881 | 2.032 |

CRF(6.2 %, 30) = 0.0742 · naive CRF LCOE 1.634 (understates 7 %) · Tornado swings (USc): yield ±10 % 0.356 > capex ±10 % 0.288 ≈ WACC ±1 pt 0.288 > opex ±20 % 0.129 > degradation 0.080.

**Gulf records (reported, verify):** MBR 5 ≈ 1.69 (2019) · Al Dhafra ≈ 1.35 (2020) · Sudair ≈ 1.24 (2021) · Al Shuaibah ≈ 1.04 (2021). Drivers: yield, capex 0.30–0.45 USD/Wp, cheap long-tenor 75–85 % debt, long PPAs, low tax, offtaker carries grid/curtailment/change-in-law. **Kuwait Zone 1 tariff: not published.**

## CAPEX / OPEX

$c_{AC} = c_{DC}\times DC/AC$. Base capex: modules 28 %, trackers 17 %, inverters 9 %, BoS 10 %, civil 8 %, labour 5 %, 400 kV substation 6 %, EPC indirects 8 % (EPC 510 m) + development 15, financing/IDC 25, contingency 10. Outside: MEWRE's 400 kV line (KD 48.6 m ≈ USD 158 m).
Opex 7.5 m ≈ USD 6.8/kWac/yr (O&M 40 %, insurance 20 %, cleaning 19 %). BESS: BNEF 2024 ≈ USD 165/kWh turnkey (global, 4 h); plan augmentation.
Cleaning: $N^{*} = \sqrt{730C/(sEp)}$ → 25 days for manual (C = 143 k, s = 0.3 %/day) ≈ USD 4.1 m/yr vs ≈ 3.0 m/yr nightly robots.
AACE classes: 5 (−50/+100) · 4 (−30/+50) · 3 (−20/+30) · 2 (−15/+20) · 1 (−10/+15). Contingency ≥ EMV $\sum p_iI_i$; budget at P80.

## Project finance

CFADS = Revenue − Opex − Tax − ΔWC − reserves · DSCR = CFADS/(I+P) · $D_{max} = \sum (CFADS_t/DSCR)/(1+k_d)^t$ · Debt = min(D_max, g_max × capex) · LLCR = PV(CFADS, loan life)/D · PLCR = PV(CFADS, project life)/D.
Waterfall: opex/tax → senior DS → DSRA (6 months) → maintenance reserve → lock-up test (1.10–1.20x) → dividends. Default ~1.05x.

| Base case @ 1.80 USc | Value |
|---|---|
| Sculpted capacity / debt | 461.4 / **448.0** (gearing cap binds) |
| Equity | 112.0 |
| DSCR min = avg = LLCR | 1.287x · PLCR 1.377x (5-yr tail) |
| Project / equity IRR | **6.45 % / 8.97 %** |
| P90 year 1 DSCR (−7 %) | 1.183x |
| +100 bp rates | debt 421.3, equity IRR 6.35 %; tariff to restore 1.906 |

## Tariff evaluation

$LT = \sum T_tE_t(1+d)^{-t}/\sum E_t(1+d)^{-t}$ · $T_t = T_1(1+g)^{t-1}$ · Publish d, energy profile, index paths **before** bids. Higher d favours back-loaded (indexed) bids.

| @ 7 % | A flat 1.80 | B 1.62 +1.5 %/yr | C flat 1.44 | D 1.95→1.65 (yr 11) |
|---|---|---|---|---|
| LT (USc) | 1.800 | 1.879 | **1.440** (−20.5 % vs median) | 1.824 |
| PV payments (USD m) | 645.4 | 673.7 | 516.3 | 653.9 |

Bid C at base costs: project IRR 3.82 %, equity IRR 1.70 % (negative leverage); needs capex ≈ USD 424 m for 9 %. Aggressive-bid risk to MEWRE: no financial close, delay, quality cuts, claims, distress/termination.

## Budget control & cash flow

Budget → commitment → accrual (IPC) → expenditure. FY assumed **1 Apr–31 Mar (verify with MoF)**. Audit Bureau prior review ≥ KD 100 k (verify); Law 94/2026: direct contracting up to KD 1 m per financial year without CAPT.
$F(t) = (1-\cos(\pi t/T))/2$ · advance recovery $R_k = \min(aG_k, A-\sum R)$ once cum > 10 % · retention $\min(\rho G_k, L\,CV - \sum Ret)$, ½ at TOC, ½ after DNP.
KWD 45 m, 24 months from Jun 2026, 10 % advance, 25 % amortisation, 10 %/5 % retention: **FY26/27 14.282 · FY27/28 26.755 · FY28/29 2.838 · FY29/30 1.125**. 20 % advance → FY26/27 18.782, recovery month 19. 3-month delay → FY26/27 9.537.
EVM: CPI = EV/AC, SPI = EV/PV; EAC1 = BAC/CPI, EAC2 = AC + (BAC − EV), EAC3 = AC + (BAC − EV)/(CPI·SPI); TCPI = (BAC − EV)/(BAC − AC). Month 12: CPI 0.934, SPI 0.880 → EAC 46.4 / 48.2 / 51.9; TCPI 1.059.
Owner EAC = CV + approved VOs + Σ p·claims/risks + owner's costs = 45.0 + 1.6 + 2.0 + 2.0 = **50.6** vs budget 51.5.

## PM checklist (any number you are given)

Basis (real/nominal, DC/AC, currency, date) · scope boundaries (grid, land, owner's costs, IDC) · P50 vs P90 · binding debt constraint · minimum (not average) DSCR · evaluation parameters fixed in RFP · range, not point, for EAC · every contingency movement documented · reproduce the headline yourself.

**Downloads:** lcoe-model.xlsx · project-finance-model.xlsx · tariff-bid-evaluation.xlsx · cashflow-forecast.xlsx · evm-tracker.xlsx
`;

export default cheatSheet;
