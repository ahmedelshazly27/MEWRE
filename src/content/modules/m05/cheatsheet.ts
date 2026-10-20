import { md } from "../../schema";

const cheatSheet = md`# M05 Battery Energy Storage — cheat sheet

## Chemistries (screening values)

| Parameter | LFP | NMC | Na-ion | VRFB |
|---|---|---|---|---|
| Cell V | 3.2 | 3.6–3.7 | ~3.0–3.1 | 1.26 |
| Wh/kg (cell) | 160–190 | 220–280 | 120–160 | 15–25 Wh/L |
| Cycles | 6,000–10,000+ | 2,000–5,000 | 3,000–6,000 (claimed) | 15,000–20,000+ |
| DC RTE | 94–96 % | 94–96 % | 90–93 % | 65–75 % AC |
| Runaway | late, no O₂ | early, O₂ release | stable | non-flammable |
| Kuwait note | HVAC critical | avoid | thin hot-climate data | electrolyte < ~40 °C |

### Cell formats

| Cell | Energy per cell | Per 20-ft container |
|---|---|---|
| 280 Ah | 0.9 kWh | 3.7 MWh |
| **314 Ah** (current standard) | **1.0 kWh** | **~5 MWh** |
| 500+ Ah | — | 6.25+ MWh |

- **Rack string:** 1P416S ≈ 1,331 V, 1,500 V class.

## Key formulas

| Quantity | Formula | Where |
|---|---|---|
| Cell energy | $E = N_s N_p V Q$ | Pack/rack sizing |
| C-rate | $C = P/E$ | 0.25C = 4 h |
| Usable energy | $E_{use} = E_{nom}\,DoD\,SoH$ | Every guarantee |
| AC RTE | $\eta_{RT,DC}\,\eta_{PCS}^2\eta_{MV}^2\eta_{HV}^2$ | Chain efficiency |
| RTE incl. aux | $E_{out}/(E_{in}+E_{aux})$ | Contract RTE |
| Arrhenius | $AF=\exp[\tfrac{E_a}{R}(\tfrac{1}{T_1}-\tfrac{1}{T_2})]$ | ×1.9 per +10 °C |
| PCS power | $P_{PCS} = (P_{POI}/\eta_{HV} + P_{aux})/\eta_{MV}$ | POI-to-DC sizing |
| DC nameplate | $E_{POI}/(\eta_{chain} \cdot DoD \cdot SoH_{min})$ | POI-to-DC sizing |
| Ramp energy | $\tfrac12 \Delta P \cdot \Delta P / r_{max}$ | Ramp control |
| Augmentation | $E_{aug} = (E_{req} - \sum E_i SoH_i)/SoH_{new}$ | Augmentation plan |
| PV of deferral | $(1-d)^n/(1+r)^n$ | ≈0.28 at yr 10, d=5 %, r=8 % |
| Gas concentration | $C = N V_{gas}/V_{free}$ | Compare with 25 % LFL |
| Exhaust rate | $\dot V = K\dot G/(0.25\,LFL)$ | Explosion control |
| HVAC power | $P = \dot Q(1+m)/COP$ | COP ~4 @35 °C → ~2.5 @50 °C |

## Rules of thumb (500 MW / 2,000 MWh at POI)

| Item | Value | Note |
|---|---|---|
| AC-AC RTE ex-aux | ~90 % | |
| AC-AC RTE incl. aux | ~85 % | 50 °C aux |
| DC nameplate | ≈ **1.26 × POI MWh** | 0.90 SoH floor |
| PCS MW | ≈ 1.03 × POI MW | |
| PCS MVA | ≈ 1.09 × POI MW | at 0.95 PF |
| HVAC cooling | ~42 kW per 5 MWh container | 0.25C, 50 °C |
| Battery heat share | ≈ 90 % of HVAC load | |

- **Worked case PCS:** 516 MW, ~543 MVA (144 × 3.78 MVA at 50 °C).
- **Worked case DC:** 2,513 MWh (501 × 5.016 MWh).
- **Augmentation plan:** +205 / +240 / +261 MWh at yrs 5/10/15 vs 3,395 MWh overbuild.
- **Augmentation saving:** PV ~USD 100 m @ USD 150/kWh.
- **Gas hazard:** 4 venting LFP cells can reach 25 % LFL in a 20-ft container → explosion control mandatory.

## Use cases

- **Energy shifting:** 2–6 h.
- **Peak capacity.**
- **FFR:** < 1 s response.
- **FCR:** droop, 15–30 min symmetric.
- **Ramp control:** power-heavy.
- **Black start:** grid-forming.
- **Q support.**

## Codes

- **NFPA 855:** installation, HMA, ERP.
- **UL 9540:** system listing.
- **UL 9540A:** propagation test data.
- **IEC 62933-5-2.**
- **IEC 62619.**
- **NFPA 68/69:** explosion.
- **IEC 62933-2-1:** test methods.

## Guarantee anatomy

- **Value:** MW/MWh at POI, each year.
- **Conditions:** 50 °C, 0.95 PF, SoC limits, aux included.
- **Test:** OE procedure, summer, witnessed.
- **Remedy:** augment at contractor cost; LDs > augmentation cost.
- **Security:** PCG, OEM direct rights.

## PM checklist

- **Requirement:** at POI, 50 °C, 0.95 PF, every year, aux included; sizing template in bid.
- **Cells:** maker/factory named; change = variation; traceability register.
- **Degradation:** table for *our* duty; warranty window achievable with contracted HVAC.
- **Augmentation provisions at COD:** land, bays, EMS capacity, grid approval.
- **Safety evidence:** UL 9540A for exact product and layout; HMA + explosion control reviewed independently.
- **HVAC:** rated 50/55 °C, N+1; sand-trap louvres, filters; no condenser recirculation.
- **Emergency response:** ERP with fire authority; water storage; drills before energisation.
- **Testing:** FAT hold before shipment; integrated safety SAT before energisation; summer capacity test.

## Kuwait context (verify before use)

- **MEWRE BESS programme:** 1–1.5 GW / 4–6 GWh announced Nov 2025 (verify).
- **Sites:** Al-Mutlaa & Jaber Al-Ahmad (1.5 GW) reported June 2026 (verify).
- **First phase:** 500 MW targeted summer 2027 (verify).
- **Route/counterparty:** **unverified**.
- **Peak load:** ~17.5–17.7 GW.
- **Record temperature:** 53.9 °C (Mitribah, 2016).
`;

export default cheatSheet;
