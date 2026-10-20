import { md } from "../../schema";

const cheatSheet = md`# M06 Grid Integration — cheat sheet

## Network and substations

### Voltage levels

- **Why EHV:** losses ∝ $1/V^2$, so 400 kV instead of 132 kV gives ~9× lower $I^2R$ losses.
- **Kuwait 400 kV:** confirmed (Shagaya–Al-Wafra line, Zone 1 substation).
- **Other Kuwait levels:** 300/275, 132, 33 and 11 kV (verify).
- **Frequency:** 50 Hz.
- **GCCIA:** 400 kV interconnector, with HVDC back-to-back to Saudi Arabia's 60 Hz system.

### Bus schemes

| Scheme | Breakers per circuit | Note |
|---|---|---|
| Single bus | 1 | Bus fault = total loss |
| Double bus + coupler | 1 (+ coupler) | |
| Ring | 1 | |
| **Breaker-and-a-half** | **1.5** | **EHV standard** |
| Double-breaker | 2 | |

### Bays and switchgear

- **Bay:** CB + disconnectors + earthing switches + CTs + VT + arresters.
- **Disconnectors:** never break load.
- **GIS:** compact, sealed against dust; needs SF₆ management; OEM lock-in.
- **AIS:** cheap but large; pollution flashover risk (creepage, washing).

## Key formulas

| Quantity | Formula | Note |
|---|---|---|
| 3-ph power | $S = \sqrt3 V I$ | 400 kV × 2.5 kA = 1,732 MVA |
| Fault level | $S_{sc} = \sqrt3 V I_{sc}$ | |
| Fault MVA via impedances | $S_{sc} = S_b/(z_s+z_T)$, $z_s = S_b/S_{sc,src}$ | |
| Q at PF | $Q = P\tan(\arccos PF)$ | 0.95 → 0.329 P |
| Transformer Q loss | $x_T S^2/S_r$ | |
| THD | $\sqrt{\sum V_h^2}/V_1$ | |
| RoCoF | $\Delta P f_0/(2HS)$ | |
| Droop | $\Delta P = -(P_n/R)(\Delta f_{eff}/f_n)$ | |
| Frequency response characteristic β | $\beta = \sum P_n/(R f_n)$; $\Delta f_{ss} = -\Delta P/\beta$ | |
| SCR | $S_{sc}/P$ | WSCR = $S_{sc}/\sum P$ |
| Voltage change | $\Delta v \approx r\Delta p + x\Delta q$ | $x \approx S_b/S_{sc}$ |
| Deemed energy | $\sum (P_{avail}-P_{act})\Delta t$ | Pay $\max(0, E-E_{allow})T$ |
| Relay ohms | $Z_{sec} = Z_{prim}\,CTR/VTR$ | $Z_1 = 0.8 Z_L$, $Z_2 \approx 1.2 Z_L$ |
| Metering error | $\Delta R = E\varepsilon T$ | |

## Worked numbers to remember

| Case | Result | Consequence |
|---|---|---|
| 300 MVA, 14 % transformer from a 15 GVA bus | 32.8 kA at 33 kV | Exceeds 31.5 kA switchgear |
| Two such transformers in parallel | 58 kA | Use a normally-open coupler |
| 1,100 MW at 0.95 PF at the POI | 361.5 Mvar | Inverters need ~584 Mvar / ~1,260 MVA incl. transformer losses |
| Same plant with 8 % inverter derating at 50 °C | ~308 Mvar short | STATCOM or oversizing |
| Harmonic study result | THD 1.63 % > 1.5 % limit (>161 kV) | Filter/resonance study |
| 300 MW trip, H = 4 s, 15 GVA | 0.125 Hz/s | |
| 1,100 MW trip, H = 3 s, 12 GVA | 0.76 Hz/s | |
| 500 MW BESS, 4 % droop, ±0.2 Hz deadband, at 49.6 Hz | 50 MW | 100 MW without deadband |
| One double-circuit 400 kV line (2 × 1,732 MVA) + 1.6 GW | OK under N-1 (97 %) | |
| Same line + a further 1.7 GW | Fails N-1 | |

## Grid code checklist

- **Comparators:** RfG, IEEE 2800, Saudi and Abu Dhabi codes, GCCIA.
- **Kuwait code:** not found — verify with MEWRE Transmission.
- **Ranges:** frequency and voltage ranges, RoCoF withstand.
- **FRT:** LVRT/HVRT with reactive current injection.
- **Reactive power:** Q at the POI at 50 °C across 0.90–1.10 pu.
- **Voltage control:** with slope.
- **Active power:** P set-point; ramp ≤ ~10 %/min.
- **Frequency response:** LFSM-O/U, FSM.
- **Power quality:** harmonics, flicker, unbalance (IEEE 519: 1.5 % THD above 161 kV).
- **Protection:** settings approved.
- **Models:** validated RMS and EMT models.
- **Testing:** compliance tests.
- **Firmware:** change control.

## Frequency and inverter control

| Layer | Time frame |
|---|---|
| Inertial | 0–5 s |
| Primary / droop | 2–30 s |
| Secondary / AGC | 30 s – 15 min |
| Tertiary | ≥ 15 min |
| Last resort | UFLS |

- **PV under-frequency response:** needs headroom (curtailment) or BESS.
- **Grid-following (GFL):** PLL-synchronised current source; needs SCR ≳ 3.
- **Grid-forming (GFM):** voltage source; for weak grids, inertia and black start.
- **Procurement rule:** require GFM-capable BESS PCS.

## Interconnection studies

- **Load flow:** N and N-1; summer peak, **winter midday**, evening BESS cases.
- **Short circuit:** IEC 60909.
- **RMS stability.**
- **EMT:** required if SCR < ~5.
- **Harmonics.**
- **Protection coordination.**
- **Insulation coordination.**
- **Tools:** PSS/E, PowerFactory, PSCAD.
- **Scope:** cumulative with neighbouring plants.

## Curtailment

### Causes

- **Grid constraint.**
- **System security.**
- **Oversupply.**
- **Grid unavailability / late connection:** offtaker risk → deemed energy.
- **Plant-caused:** IPP risk.

### Define in the PPA

- **Estimation method** for available power.
- **Reference inverters.**
- **Data access.**
- **Logging** with cause codes.

## SCADA, protection, metering, cyber

- **Architecture:** field → plant ring → SCADA/PPC/historian → gateway (IEC 60870-5-104) → OPGW → national control centre EMS.
- **IEC 61850:** MMS, GOOSE (fast trips), SV; SCD file under change control.
- **Export-line protection:** 87L main, 21 back-up.
- **Other protection:** 87T, 87B, 50/51, 50BF.
- **IBR fault current:** ~1.1–1.2 pu.
- **Metering:** 0.2S meter, 0.2S CT, 0.2 VT; main + check meters.
- **IEC 62443:** zones/conduits, SL targets, DMZ, jump host + MFA, no rogue modems.

## Energisation hold points (in order)

1. Protection settings approved and tested
2. SCADA point-to-point checks
3. Telecom / teleprotection
4. Metering sealed
5. Switching programme approved
6. Back-feed HV, soak
7. MV energised progressively
8. Inverters / PPC
9. Witnessed compliance tests
10. Trial run
11. COD
`;

export default cheatSheet;
