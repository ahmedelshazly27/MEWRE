import { md } from "../../schema";

const cheatSheet = md`# MZ06 PPC, EMS and SCADA for hybrid plants: cheat sheet

## Conventions

- **Numbers:** all plant and business numbers are **illustrative**, not Mizan, KISR or MEWRE data.
- **Kuwait grid code:** no published renewable code found; requirements sit in RFP and connection schedules (Track 0 m06-l02).
- **Mizan status:** pre-revenue; Shagaya Phase I soiling pilot **in preparation**, not signed or running.

## Time scales

| Layer | Time scale | Decides |
|---|---|---|
| Inverter / PCS / BMS | ms | Current control, FRT, protection |
| PPC | 100 ms to s | P, Q, V, f at the POI |
| EMS real-time | 1 to 15 min | Set-points to PPC, SoC band, reserves |
| EMS scheduling | hours to 2 days | Charge plan, nominations |

## PPC

- **Loop:** PI on POI measurement, update 100 to 200 ms, anti-windup.
- **Priority stack:** protection and FRT, grid-code response, TSO commands, ramp, POI limit, EMS schedule, auxiliary (stow, cleaning).
- **Mizan functions:** bottom of the stack; announce availability changes in advance; fail safe to normal tracking.
- **Headroom lives in three places:** BESS spare power, curtailed PV, POI capacity.
- **Weak grid:** test V-control at low SCR in FAT with installed firmware.

## EMS

- **SoC drift:** flat LFP voltage curve; recalibrate with full charges.
- **Heat:** temperature-dependent power limits at 50 °C.
- **Kuwait value:** single buyer, no wholesale market; value is contract-defined or MEWRE's avoided cost.
- **Mizan's opening:** soiling- and dust-aware PV forecasts and cleaning or stow windows as EMS inputs.

## SCADA and security

- **Benchmarks per operator:** about 1 alarm per 10 min acceptable, 2 maximum, more than 10 in 10 min is a flood.
- **Dust storms:** tracker comms floods; suppress by state ("storm stow active").
- **IEC 62443 for vendors:** 4-1 secure development, 4-2 component requirements.
- **Data path for a pilot:** read-only export, then DMZ replication with outbound push; no standing VPN.

## Integration

- **Interfaces:** $n(n-1)/2$; one owner each in the matrix.
- **ICD:** link, protocol, map, scaling, sign convention, rates, timeouts, comms-loss behaviour, firmware version.
- **Sequence:** spec, ICDs, build, FAT (SIL/HIL), P2P, SAT, grid tests, trial run.
- **Commercial protection:** others' ICDs and firmware freezes as conditions precedent; liability capped to scope.

## Business

| Pool | Indicative GM | Scales with |
|---|---|---|
| Hardware resale | 10 to 30 % | Units, working capital |
| Integration services | 20 to 40 % | Headcount |
| Support contracts | Moderate to high | Installed base |
| Analytics subscriptions | 70 to 85 % | Installed MW |

- **Services trap:** pays now, no reuse, LDs, tender-timing dependence, product never built.
- **Productised service test:** product-led, fixed scope, no LDs on others' COD, reusable output, time-boxed.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| PI control | $u = K_p e + K_i \int e\,dt$ | l01 |
| Droop | $\Delta P = -\frac{P_n}{R}\frac{\Delta f_{eff}}{f_n}$ | l01 |
| Headroom | $P_{hr} = \frac{P_n}{R}\frac{\lvert\Delta f_{max}\rvert - db}{f_n}$ | l01 |
| Ramp energy | $E_B = \Delta P^2/(2\dot P_{max})/60$ | l01 |
| Q-V slope | $Q = -\frac{V - V_{ref}}{s}Q_{max}$ | l01 |
| Q capability | $Q = \sqrt{S_n^2 - P^2}$ | l01 |
| SoC | $SoC_{t+1} = SoC_t + (\eta_c P_c - P_d/\eta_d)\Delta t/E_n$ | l02 |
| Shift margin | $m = p_d - p_c/\eta_{rt} - c_{deg}$ | l02 |
| Historian | $D = N\cdot(86{,}400/T_s)\cdot b/CR$ | l03 |
| Alarm rate | $\lambda = N_{alarms}/(N_{op} T)$ | l03 |
| Redundancy | $A = 1-(1-A_1)^n$ | l03 |
| Interfaces | $N_i = n(n-1)/2$ | l04 |
| Test effort | $T = N t/(60k)$ | l04 |
| Blended GM | $GM = \sum R_j g_j/\sum R_j$ | l05 |
| ARR | $ARR = \pi_{MW} C$ | l05 |
`;

export default cheatSheet;
