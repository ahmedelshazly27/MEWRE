import { md } from "../../schema";

const cheatSheet = md`# MZ02 Soiling measurement and performance ratio: cheat sheet

## Conventions

- **Status of numbers:** all plant numbers are **illustrative**, not Shagaya data, unless cited to Al-Rasheedi et al. (2020).
- **Pilot status:** the Shagaya Phase I soiling pilot is **targeted / in preparation**, with KISR as methodology partner.
- **Baseline:** temperature-corrected (weather-corrected) PR consistent with IEC 61724.

## IEC 61724-1

- **Editions:** 2017 (Ed. 1, Classes A, B, C) and 2021 (Ed. 2, soiling ratio in clause 9.4).
- **Class A:** utility plants and guarantees; commonly summarised as 3 s sampling, 1 min recording; daily sensor cleaning in Kuwaiti dust.
- **Soiling rule (2017):** mandatory for Class A above 2 % expected soiling loss; **unverified** for 2021.
- **Two methods (2021):** which number is reference-device vs optical is **unverified**.
- **Practice:** clean the clean reference regularly; use about ±2 h of solar noon.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Soiling ratio | $SR = X_{soiled}/X_{clean}$, $L_s = 1 - SR$ | L1 |
| Isc correction | $I_{sc}/[1 + \alpha(T - 25)]$, $\alpha \approx +0.05$ %/°C | L1 |
| Pmax correction | $P/[1 + \gamma(T - 25)]$, $\gamma \approx -0.35$ %/°C | L1 |
| Daily SR | $\sum G_i SR_i / \sum G_i$ (noon window) | L1 |
| Offset correction | $SR = R_{raw}/R_0$ | L3 |
| Basic PR | $\sum E / (P_{STC}\sum G\tau/G_{STC})$ | L2 |
| NREL corrected PR | $\sum E / \sum P_{STC}(G\tau/G_{STC})[1 + \delta(T_i - T_{avg})]$ | L2 |
| Reference temperature | $T_{avg} = \sum G_i T_i / \sum G_i$ (full year, frozen) | L2 |
| Sandia | $T_m = G e^{a + bv} + T_a$; $T_c = T_m + (G/1000)\Delta T$ | L2 |
| Faiman | $T_m = T_a + G/(U_0 + U_1 v)$ | L2 |
| Plant-average uncertainty | $\sqrt{(\sigma_{sp}^2 + u_{st}^2)/n}$ | L3 |
| Slope SE | $\sigma/\sqrt{n(n^2 - 1)/12}$ | L4 |
| Cost penalty | $(T/T^* + T^*/T)/2$ | L4 |
| Trigger delay | $\Delta t = b_{SR}/r$ | L4 |
| Background rate | $(L_{total} - \sum\Delta_k)/N$ | L5 |

## Key numbers

| Item | Value |
|---|---|
| Sandia open rack | $a = -3.56$, $b = -0.075$, $\Delta T = 3$ °C |
| Faiman defaults | $U_0 = 25$, $U_1 = 6.84$ |
| Model spread at 950 W/m², 45 °C, 3 m/s | NOCT 74.7, Faiman 65.9, Sandia cell 69.4 °C |
| Absolute PR uncertainty (illustrative) | about 2.5 % (1σ) |
| PR change uncertainty, same sensors | about 0.6 % (1σ) |
| Slope SE, σ = 1 %, 10 / 30 days | 0.11 / 0.021 %/day |
| Interval error ±20 % / ×2 | about 2.5 % / 25 % extra cost |
| RdTools default filters | POA 200 to 1,200 W/m²; T_cell -50 to 110 °C |
| Qatar soiling rate (multi-year) | about 0.43 to 0.46 %/day |
| Kuwait working assumption | 0.3 to 0.6 %/day (extrapolated, not measured) |

## PR rules

- **Basic PR** swings 10+ points from January to July in Kuwait: heat, not health.
- **STC-corrected PR** is flat but several points above any annual PR: never compare with a guarantee.
- **NREL corrected PR** equals basic PR over the reference year; removes seasonal bias within it.
- **Dirty pyranometer** makes PR look better and hides soiling.

## Stations

- **Reference-device station:** ground truth; daily cleaning of the clean device; monthly $R_0$.
- **Optical sensor:** no water, dense networks, calibrate to local dust against a reference station.
- **Representativeness dominates:** same tilt, tracking and stow, technology and height as the array; cover edges and interior.
- **One station per technology section** at Shagaya (thin-film and poly-Si).

## Measurement plan for the pilot

- **Hypotheses** testable (method agreement, value of condition-based cleaning).
- **History first:** data audit, back-analysis, 2018 to 2019 cleaning-arm failure as natural experiment.
- **Twelve months** of new measurement to cover dew, dust-storm and summer regimes.
- **Freeze** filters, parameters and code before results.
- **Governance:** confirm who consents to data sharing and installations (KISR, MEWRE).
`;

export default cheatSheet;
