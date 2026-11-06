import { md } from "../../schema";

const cheatSheet = md`# MZ08 BESS at the depth a seller needs: cheat sheet

## Conventions

- **Status of numbers:** prices, plant sizes and savings are **illustrative**, not Mizan data or market quotes.
- **Full engineering:** Track 0 m05 (chemistry, parameters, sizing chain, degradation, safety). This sheet is the seller's version.
- **Currency:** USD; 1 KWD = 3.25 USD.

## The six numbers and their boundaries

| Number | Typical utility LFP | Ask |
|---|---|---|
| **Power** | 50 to 500 MW | At the POI, 50 °C, 0.95 PF? |
| **Energy** | 2 to 4 times MW | At the POI, every year? |
| **Duration, C-rate** | 4 h, 0.25C | On which boundary? |
| **RTE** | 92 to 95 % DC; 84 to 88 % at POI in summer | Auxiliaries included? |
| **Fade** | 1.5 to 2.5 %/yr at 1 cycle/day | Cell temperature, cycles? |
| **Augmentation** | First tranche around year 5 | Who pays, space planned? |

- **Reflex question:** "Measured where?"
- **Cells per POI MWh:** about **1.24** (0.94 × 0.95 × 0.90).
- **PCS per POI MW:** about 1.03 MW and 1.09 MVA at 50 °C and 0.95 PF.

## Worked reference: 100 MW for 3 h

| Item | Value |
|---|---|
| POI energy | 300 MWh |
| DC nameplate (SoH floor 0.90) | 373 MWh, 75 containers of 5 MWh |
| If overbuilt to SoH 0.70 | 480 MWh |
| PCS | about 103 MW, 109 MVA at 50 °C |
| Daily charge at 85 % RTE | 353 MWh |
| First augmentation | about 36 MWh, end of year 5 |

## Kuwait BESS programme (as of Nov 2026)

- **11 Nov 2025:** MEWRE announces 1 to 1.5 GW / 4 to 6 GWh (about 4 h).
- **Jun 2026:** sites at Al-Mutlaa City and Jaber Al-Ahmad City approved; about 1,500 MW phased; first phase about 500 MW; aiming at summer peaks from 2027.
- **Unverified:** award in H2 2026 (single source); procurement route (CAPT EPC or KAPP PPP); tender rules; local content.
- **Phase 1 pools (illustrative):** turnkey about USD 360 m; DC blocks about USD 174 m; LTSA about USD 5.4 m/yr; first augmentation about USD 14 m.
- **Mizan's lane:** local service, EMS and SCADA integration and analytics partner; not EPC prime, not stocking distributor.

## Suppliers and warranties

| Tier | Who | Warranty strength |
|---|---|---|
| **A** | Cell makers with own DC blocks | Strong |
| **B** | Integrators buying cells | Good if back-to-back |
| **C** | Assemblers | Weak |

- **Four promises:** product warranty; capacity warranty (years or EFC cap); LTSA capacity, availability and RTE guarantees; security.
- **Voiding conditions:** cell temperature limit, C-rate, high-SoC rests, EFC cap, missing data, unauthorised maintenance.
- **Real warranty life:** min(years, EFC cap / EFC per year); 7,300 EFC at 1.2/day is 16.7 years.
- **Fire evidence:** UL 9540, UL 9540A at cell, module, unit (and large-scale) level for the exact product, NFPA 855, gas detection and explosion control, emergency response plan.
- **First question:** which cell, which factory, and a change-of-cell clause?

## Desert

- **PCS:** 4.4 MVA derating 1.5 %/°C above 40 °C gives 3.74 MVA at 50 °C: 30 units, not 25, for 109 MVA.
- **Auxiliaries:** 12 kW per container all day is 7.2 % of 300 MWh delivered.
- **Dust:** filters and condenser coils foul; plan cleaning in O&M.

## Analytics add-on

- **Transfers:** pipelines, expected-vs-actual with temperature correction, change detection, M&V, dust fouling.
- **Does not:** SoH from cell data, thermal-runaway prediction, EMS control, market optimisation (no market in Kuwait).
- **Value levers:** augmentation deferral, auxiliary energy, warranty evidence, availability accounting.
- **Scale:** about USD 0.12 m/yr value on a 300 MWh plant: an add-on, not a business.
- **Gate:** owner data rights written into the supply contract.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Duration, C-rate | $h = E/P$, $C = 1/h$ | l01 |
| Quick DC nameplate | $E_{DC} = E_{POI}/(\eta_d\, w_{SoC}\, SoH_{min})$ | l01 |
| Charging energy | $E_{ch} = E_{POI}/RTE_{POI}$ | l01 |
| Linear fade | $SoH_n = 1 - n(f_{cal} + f_{cyc} N/1000)$ | l01 |
| Augmentation | $\Delta E_{aug} = E_{DC}(1 - SoH_n)$ | l01 |
| Pool value | $V = E \times c \times 1000$ | l02 |
| LTSA pool | $V_{LTSA} = k\, V_{capex}$ | l02 |
| PCS derating | $S(T) = S_{rated}[1 - d(T - T_0)]$ | l03 |
| Auxiliary share | $a = \bar{P}_{aux} \times 24 / E_{POI}$ | l03 |
| Warranty life | $n_w = \min(Y, EFC_{cap}/N)$ | l03 |
| Deferral value | $\Delta V = C_{aug}(1 - (1-g)/(1+r))$ | l04 |
`;

export default cheatSheet;
