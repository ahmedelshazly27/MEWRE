import { md } from "../../schema";

const cheatSheet = md`# M06 Grid Integration — cheat sheet

## Network & substations

- Losses ∝ $1/V^2$: 400 vs 132 kV → ~9× lower $I^2R$. Kuwait: **400 kV confirmed** (Shagaya–Al-Wafra line, Zone 1 substation); 300/275, 132, 33, 11 kV levels **to verify**. 50 Hz; GCCIA 400 kV with HVDC back-to-back to Saudi 60 Hz.
- Bus schemes: single bus (1 CB/circuit, bus fault = total loss) · double bus + coupler · ring · **breaker-and-a-half (1.5 CB/circuit, EHV standard)** · double-breaker.
- Bay = CB + disconnectors + earthing switches + CTs + VT + arresters. Disconnectors never break load.
- GIS: compact, sealed vs dust, SF₆ management, OEM lock-in. AIS: cheap, large, pollution flashover risk (creepage, washing).

## Key formulas

| | |
|---|---|
| 3-ph power | $S = \sqrt3 V I$ (400 kV × 2.5 kA = 1,732 MVA) |
| Fault level | $S_{sc} = \sqrt3 V I_{sc}$; $S_{sc} = S_b/(z_s+z_T)$, $z_s = S_b/S_{sc,src}$ |
| Q at PF | $Q = P\tan(\arccos PF)$; 0.95 → 0.329 P |
| Transformer Q loss | $x_T S^2/S_r$ |
| THD | $\sqrt{\sum V_h^2}/V_1$ |
| RoCoF | $\Delta P f_0/(2HS)$ |
| Droop | $\Delta P = -(P_n/R)(\Delta f_{eff}/f_n)$ |
| β | $\sum P_n/(R f_n)$; $\Delta f_{ss} = -\Delta P/\beta$ |
| SCR | $S_{sc}/P$; WSCR = $S_{sc}/\sum P$ |
| ΔV | $\Delta v \approx r\Delta p + x\Delta q$, $x \approx S_b/S_{sc}$ |
| Deemed energy | $\sum (P_{avail}-P_{act})\Delta t$; pay $\max(0, E-E_{allow})T$ |
| Relay ohms | $Z_{sec} = Z_{prim}\,CTR/VTR$; Z1 = 0.8 Z_L, Z2 ≈ 1.2 Z_L |
| Metering | $\Delta R = E\varepsilon T$ |

## Worked numbers to remember

- 300 MVA, 14 % tx from 15 GVA bus → 32.8 kA at 33 kV (> 31.5 kA!). Two in parallel → 58 kA → normally-open coupler.
- 1,100 MW at 0.95 PF POI → 361.5 Mvar; inverters need ~584 Mvar / ~1,260 MVA with transformer losses; 8 % derating at 50 °C → ~308 Mvar short → STATCOM/oversizing.
- THD 1.63 % > 1.5 % limit (>161 kV) → filter/resonance study.
- 300 MW trip, H = 4 s, 15 GVA → 0.125 Hz/s. 1,100 MW trip, H = 3 s, 12 GVA → 0.76 Hz/s.
- 500 MW BESS, 4 % droop, ±0.2 Hz deadband at 49.6 Hz → 50 MW (100 MW without deadband).
- One double-circuit 400 kV line (2 × 1,732 MVA): 1.6 GW OK under N-1 (97 %); +1.7 GW fails.

## Grid code checklist (comparators: RfG, IEEE 2800, Saudi/Abu Dhabi, GCCIA)

Frequency/voltage ranges & RoCoF withstand · LVRT/HVRT + reactive current injection · Q at POI at 50 °C across 0.90–1.10 pu · voltage control with slope · P set-point, ramp ≤ ~10 %/min · LFSM-O/U, FSM · harmonics/flicker/unbalance (IEEE 519: 1.5 % THD > 161 kV) · protection settings · validated RMS + EMT models · compliance tests · firmware change control. **Kuwait code: not found — verify with MEWRE Transmission.**

## Control

Inertial (0–5 s) → primary/droop (2–30 s) → secondary/AGC (30 s–15 min) → tertiary (≥15 min) → UFLS. PV needs headroom or BESS for under-frequency. GFL = PLL current source (needs SCR ≳ 3); GFM = voltage source (weak grids, inertia, black start) — require GFM-capable BESS PCS.

## Studies

Load flow (N, N-1; summer peak, **winter midday**, evening BESS) · short circuit (IEC 60909) · RMS stability · **EMT if SCR < ~5** · harmonics · protection coordination · insulation coordination. Tools: PSS/E, PowerFactory, PSCAD. Cumulative with neighbouring plants.

## Curtailment

Grid constraint · security · oversupply · grid unavailability/late connection (offtaker risk → deemed energy) · plant-caused (IPP risk). Define estimation method, reference inverters, data access, logging with cause codes.

## SCADA, protection, metering, cyber

Field → plant ring → SCADA/PPC/historian → gateway (IEC 60870-5-104) → OPGW → national control centre EMS. IEC 61850: MMS, GOOSE (fast trips), SV, SCD file under change control. Protection: 87L main on export line, 21 back-up, 87T, 87B, 50/51, 50BF; IBR fault current ~1.1–1.2 pu. Metering: 0.2S meter, 0.2S CT, 0.2 VT, main + check. IEC 62443: zones/conduits, SL targets, DMZ, jump host + MFA, no rogue modems.

## Energisation hold points

Protection settings approved & tested → SCADA point-to-point → telecom/teleprotection → metering sealed → switching programme approved → back-feed HV, soak → MV progressive → inverters/PPC → witnessed compliance tests → trial run → COD.
`;

export default cheatSheet;
