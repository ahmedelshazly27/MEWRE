import { md } from "../../schema";

const cheatSheet = md`# MZ01 Soiling physics: cheat sheet

## Conventions

- **Status of numbers:** plant and cost numbers are **illustrative**; measured values name their source.
- **Dust properties:** quartz density 2,650 kg/m³; air at 40 °C: $\mu = 1.91\times10^{-5}$ Pa·s, $\rho_a = 1.13$ kg/m³.
- **Pilot status:** Shagaya Phase I soiling study is targeted and in preparation with KISR as methodology partner.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Aerosol beam transmittance | $T_a = e^{-m\tau_a}$ | L1 |
| Ångström exponent | $\alpha = -\ln(\tau_1/\tau_2)/\ln(\lambda_1/\lambda_2)$ | L1 |
| Stokes settling | $v_s = \rho_p g d^2 C_c/(18\mu)$ | L2 |
| Particle Reynolds | $Re_p = \rho_a v d/\mu$ (Stokes if below about 0.1 to 1) | L2 |
| Stokes number | $Stk = \tau_p U/L$, $\tau_p = v_s/g$ | L2 |
| Deposition flux | $F = \sum v_{d,i}C_i$, $v_d \approx v_s\cos\beta + v_t$ | L2 |
| Van der Waals | $F = A d/(12 z_0^2)$ | L3 |
| Capillary | $F \approx 2\pi\gamma d\cos\theta$ | L3 |
| Dew point | $T_d = b\gamma_m/(a-\gamma_m)$, $\gamma_m = \ln(RH/100) + aT/(b+T)$ | L3 |
| Sky view factor | $F_{sky} = (1+\cos\beta)/2$ | L3, L5 |
| Soiling ratio | $SR = P_{soiled}/P_{clean}$, $L_s = 1-SR$ | L4 |
| Coverage per mass | $A_c = 3\omega/(2\rho_p d)$ | L4 |
| Empirical loss vs mass | $\Delta T = 34.37\,\mathrm{erf}(0.17\omega^{0.8473})$ | L4 (site-specific) |
| Bifacial effective SR | $(SR_f + \varphi R SR_r)/(1+\varphi R)$ | L4 |
| Minimum soiling cost | $TC^* = \sqrt{730\,C E p r}$, $N^* = \sqrt{730C/(Epr)}$ | L5 |

## Dust in Kuwait (L1)

- **Sources:** southern Iraq floodplain, Syrian-Iraqi desert, northern Saudi Arabia, Iran, local disturbed surfaces.
- **Storm days:** about 20 per year (Kokkalis 2018); about 255 "dusty days" counting all dust (Safar 1980).
- **AERONET Kuwait University:** since 2008; dust events AOD500 0.75 to 2.91.
- **Shamal:** summer persistent (late May to July), winter episodic behind fronts.
- **AOD is not soiling:** air column vs deposit; normalise PV by a clean irradiance sensor.

| Size | $v_s$ at 40 °C | Role |
|---|---|---|
| 1 µm | 0.009 cm/s | AOD, haze, sticks hardest |
| 10 µm | 0.77 cm/s | PM10 edge |
| 20 µm | 3.1 cm/s | Major deposit mass |
| 50 µm | about 17 cm/s (Stokes 19) | Deposit, abrasion |

## Deposition (L2)

- **$d^2$ law:** 3 times larger settles 9 times faster.
- **Impaction:** $Stk$ above about 1 on frames and edges, not on open faces.
- **Tilt:** settling flux $\propto\cos\beta$; Figgis 2019: deposition peak about 45° windward, accumulation peak about 22° leeward.
- **Resuspension:** removal $\propto d^2$, adhesion $\propto d$: large particles leave first.
- **Doha:** 75% build-up days, 25% recovery days; storms raise annual mean rate 23%.

## Adhesion and dew (L3)

- **10 µm particle:** ideal van der Waals about 38,000 times weight; capillary about 9 times van der Waals.
- **Dew:** glass below dew point on clear, calm, humid nights; hygroscopic dust starts a few K above.
- **Cementation:** wet, dissolve, migrate to contacts, precipitate, age.
- **Qatar QEERI:** 0.49 %/day average, higher in winter from dew.
- **Doha 4-year:** 0.43 ± 1.0 and 0.46 ± 1.05 %/day.
- **Rule:** dry robots before dew onset or after drying; wet clean after runs of dew.

## Optical loss (L4)

- **Per gram:** 1 g/m² shadows 28% (2 µm), 5.7% (10 µm), 1.1% (50 µm).
- **Edge bands:** loss = worst cell until bypass caps it at one third per substring.
- **Landscape vs portrait:** heavy bottom band 33% vs 50% or more loss.
- **Spectrum:** dust removes blue more; match sensor to module technology.
- **Bifacial:** rear weight about 6 to 8%; robots never clean the rear.

## Mitigation (L5)

| Lever | Acts on | Limit |
|---|---|---|
| Hydrophobic coating | sticking, removal | needs water, abrasion, UV |
| Hydrophilic coating | removal with rain | little rain in Kuwait |
| Antistatic coating | arrival, sticking (dry) | minor when humid |
| Steep night stow | arrival, dew, drainage | tracker range, wind stow, robots |
| Road stabilisation | arrival | local sources only |

- **Evidence:** Figgis 2019; Khan 2024 coating plus vertical stow up to 85% (stow not isolated); Cal Poly 52° about 20% in week 1.
- **Value:** 30% lower rate saves about 16% of soiling cost; halving saves 29%.
`;

export default cheatSheet;
