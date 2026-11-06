import { md } from "../../schema";

const cheatSheet = md`## The bench and the organisation

- **Bench blocks:** DUT, fixture, load, sources and conditioning, instrumentation and DAQ, automation, safety, plus data and metadata.
- **Measurement chain:** physics, sensor, conditioning, ADC, timestamp, file plus metadata. The timestamp link breaks most often.
- **V-model:** component, subsystem, system verification, then validation in use. System tests are few but take most rig hours (illustrative plan: 21 % of tests, 71 % of hours).
- **Verification vs validation:** built to spec vs does the job in real use.
- **DV, PV, EOL:** prototypes, production-tooled parts, every production unit.
- **Roles:** test engineer, technician, test systems engineer, validation lead (owns DVP&R and reruns), reliability, quality (8D), lab manager (rig hours, budget), design engineer.
- **Safety:** Afterwave observes safety states, never sits in the stop path.

## Test plans and DOE

- **Test case fields:** id, requirement trace, DUT configuration, setup, preconditions, stimulus, measurements, acceptance, abort, outputs. Store conditions as structured fields.
- **Guard band:** pass only if measured minus U is at or above the lower limit.
- **OFAT** misses interactions; **factorials** estimate every effect from every run.
- **Resolution III:** main effects aliased with two-factor interactions. **IV:** two-factor interactions aliased in pairs. **V:** clear.
- **Hygiene:** randomise, replicate or centre points, block.

| Inverter example (illustrative) | A f_sw | B V_dc | C coolant | AB | AC, BC, ABC |
|---|---|---|---|---|---|
| Effect (W) | 270 | 100 | 60 | 40 | 10, 0, 0 |

## Reliability

| Beta | Pattern | Response |
|---|---|---|
| below 1 | Infant mortality | Process fix, burn-in, HASS |
| 1 | Random | MTBF meaningful |
| above 1 | Wear-out | B-life, maintenance, design margin |

- **Eta:** 63.2 % failed at eta, for any beta.
- **Success run:** R = 0.90 at C = 90 % needs 22 units; R = 0.95 needs 45.
- **Acceleration is valid only if the mechanism is unchanged.** Ea 0.5, 0.7, 1.0 eV from 55 to 105 °C gives AF 10.4, 26.4, 107.
- **HALT** finds margins; **HASS** screens production inside them; neither predicts life.

## Characterisation

- **Envelope:** constant torque to base speed (current limit), about constant power above (voltage limit).
- **Loss uncertainty:** 0.1 % on each power gives about 2.8 % of loss at 95 % efficiency, about 14 % at 99 %.
- **Junction temperature:** sum of R_th in steady state; Foster Z_th for pulses.
- **Battery:** capacity by coulomb counting at stated C-rate and temperature; DCIR with SoC, temperature and pulse time; EIS: ohmic, charge transfer, diffusion.

## Root cause

- **8D:** team, describe (is / is-not), contain, root cause (occurrence and escape), corrective actions, implement, prevent, recognise.
- **Verify by switching the cause on and off.** "Operator error" is never a root cause.
- **Rule out the rig early:** machine, measurement and method are test-system categories.
- **Rare events:** P(0 events) = exp(minus expected count).

## Economics (illustrative ten-rig lab)

| Item | Value |
|---|---|
| Fixed cost per rig | EUR 500k/yr |
| Valid hours per rig | 3,153.6 h (45 % running, 20 % invalid) |
| Cost per valid hour | EUR 158.5 |
| Halve invalid runs | EUR 625k/yr capacity |
| Avoid 35 % of regression reruns | EUR 700k/yr capacity |
| Cut wrangling 40 % | EUR 325k/yr engineer time |
| Capacity gain | 26.5 %, about 2.65 rigs |

- **Freed hours are cash only if rigs or engineers are the constraint.**

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Factorial runs | $N = rL^k$ | L2 |
| Main effect | $E = \bar y_+ - \bar y_-$ | L2 |
| Effect SE | $2\sigma/\sqrt N$ | L2 |
| Weibull | $R = \exp[-(t/\eta)^\beta]$ | L3 |
| B-life | $B_X = \eta[-\ln(1-X)]^{1/\beta}$ | L3 |
| MTBF lower bound | $2T/\chi^2_{C,2r+2}$ | L3 |
| Success run | $n = \ln(1-C)/\ln R$ | L3 |
| Weibull demo | $n = \ln(1-C)/(m^\beta \ln R)$ | L3 |
| Arrhenius | $\exp[(E_a/k)(1/T_u - 1/T_t)]$ | L3 |
| Coffin-Manson | $(\Delta T_t/\Delta T_u)^n$ | L3 |
| Shaft power | $P = T\omega$, $\omega = 2\pi n/60$ | L4 |
| Junction temperature | $T_j = T_c + P\sum R_{th}$ | L4 |
| Foster | $Z_{th} = \sum R_i(1 - e^{-t/\tau_i})$ | L4 |
| DCIR | $\Delta V/\Delta I$ | L4 |
| FT OR, AND | $1 - \prod(1 - p_i)$, $\prod p_i$ | L5 |
| Cost per valid hour | $C_\text{fixed}/(8760\,s_\text{run}(1 - s_\text{inv}))$ | L6 |
| Retest rule | rerun if $p_i C_\text{esc} > c_h h_i$ | L6 |
`;

export default cheatSheet;
