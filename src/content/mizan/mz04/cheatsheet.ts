import { md } from "../../schema";

const cheatSheet = md`# MZ04 Cleaning optimisation economics: cheat sheet

## Conventions

- **Status of numbers:** every plant and cost number is **illustrative**, not Mizan, Shagaya or client data.
- **Base plant:** 500 MWp, 2,000 kWh/kWp, $E = 10^6$ MWh/yr, $E_d = 2{,}739.7$ MWh/day, $s = 0.4$ %/day, manual $C$ = USD 75,000 per cycle.
- **Units:** $s$ as a fraction per day (0.4 %/day = 0.004); $C$ per full-plant cycle; 1 KWD = 3.25 USD.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Energy lost per cycle | $E_d\,s\,T^2/2$ | l01 |
| Average loss | $\bar L = r_0 + sT/2$ | l01 |
| Annual cost | $J = 365C/T + pEsT/2$ | l01 |
| Optimal interval | $T^* = \sqrt{2C/(pE_ds)}$ | l01 |
| Minimum cost | $J^* = \sqrt{2\cdot365\,CpEs}$ | l01 |
| Penalty of $kT^*$ | $(k + 1/k)/2$ | l01 |
| Value of soiled MWh | IPP $t$; offtaker $v - t$; nation $v$ | l02 |
| Robot annual cost | $K\,\mathrm{CRF} + O + pE\bar L_r$ | l03 |
| Break-even capex | $(J^*_{\text{manual}} - O - pE\bar L_r)/\mathrm{CRF}$ | l03 |
| Trigger | clean when $pE_dL \ge g$; linear $L^* = sT^*$ | l04 |
| Postpone threshold | $q^* = g\tau/C = 2\tau/T^*$ | l04 |
| Downtime loss | $(1 - A)\,sD/2$ | l05 |
| Payback, NPV | $K/\Delta S$; $-K + \Delta S\,(1 - (1+r)^{-n})/r$ | l05 |
| Net savings | $\Delta\bar L\,E\,p - \Delta C$ | l06 |
| Days to detect | $n = ((z_{1-\alpha/2} + z_{1-\beta})\sigma/\delta)^2$ | l06 |
| Gain share | $F = \alpha\max(S, 0)$ | l06 |

## Rules of thumb

- **Square root:** halve cost, clean 41 % more often; value × 4, clean twice as often.
- **At the optimum** cleaning spend = soiling loss value.
- **Flat optimum:** ±25 % costs 2.5 %; factor 2 costs 25 %; factor 3 costs 67 %.
- **Plant size** does not change $T^*$ when costs scale with MWp.
- **Constant residual** does not move $T^*$; it needs a deep (wet) clean.

## Base plant results

| Value of energy (USD/MWh) | $T^*$ (days) | Average loss | $J^*$ (USD m/yr) |
|---|---|---|---|
| 15 (IPP tariff) | 30.2 | 6.0 % | 1.81 |
| 70 (offtaker, 85 − 15) | 14.0 | 2.8 % | 3.92 |
| 85 (LNG CCGT) | 12.7 | 2.5 % | 4.31 |
| 120 (crude steam) | 10.7 | 2.1 % | 5.13 |

- **Misalignment cost:** IPP cleaning at 30.2 days wastes USD 1.73 m/yr of national value; side-payment range USD 0.73 to 2.45 m/yr.
- **Robots (USD 25k/MWp, CRF 0.149, O&M USD 0.5 m, 1.2 % loss):** USD 2.54 m at 15, USD 3.38 m at 85. Break-even USD 15.2k/MWp (IPP) vs 37.5k/MWp (state).
- **Low-capex fleet (USD 12k/MWp):** saving USD 1.13 m/yr, payback 5.3 years, NPV +1.6 m (10 years), about −0.1 m (7 years).
- **Forecast (IPP):** EVPI about USD 10k per decision; realistic forecast about USD 3k.

## Kuwait and Gulf facts (snippet-level, check before quoting)

- **Shagaya PV:** 11.15 MW, monthly water cleaning, storm output drops about 30 % (RSER 2020).
- **Dust storms:** about 20 days/yr in Kuwait (AERONET 2008 to 2017).
- **Doha soiling:** about 0.43 to 0.46 %/day; working range for Kuwait 0.3 to 0.6 %/day (not measured).
- **Practice:** Noor Abu Dhabi 1,430 dry robots (1.18 GW); Al Ajban about 3,000 SUNPURE robots daily; Al Kharsaah semi-automated every 4 days.
- **Cost data:** PV-Tech test about USD 4.0k (robots) vs 6.7k (manual) per MW per year; vendor estimates up to USD 40k manual are unverified.
- **Shagaya cleaning-arm failure 2018 to 2019:** natural experiment; system, rows and dates to confirm with KISR.

## Selling

- **Pick the buyer's value of energy:** IPP USD, MEWRE KWD of fuel net of tariff, KISR method and papers.
- **Baseline first:** temperature-corrected PR, exclusions, agreed before change.
- **Paired control blocks** for a dust season; never before-after.
- **Net, not gross**, savings; fixed fee floor plus capped share.
- **Never claim** a signed pilot, a Shagaya soiling rate or a failure cost.
`;

export default cheatSheet;
