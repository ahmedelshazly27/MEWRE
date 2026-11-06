import { md } from "../../schema";

const cheatSheet = md`# AW06 Embedded firmware basics: cheat sheet

## Conventions

- **Numbers:** all customer and Afterwave examples are **illustrative**; standards and protocol facts are cited in the module references.
- **Time units:** µs for loops and frames, h for rig regressions.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Execution time | $t = N_{cyc}/f_{clk}$ | L1 |
| Cycle budget | $N = f_{clk}/f_{loop}$ | L1: 200 MHz at 20 kHz = 10,000 |
| CPU load | $U = \sum C_i/T_i$ | L1, L2 |
| RM bound | $U \le n(2^{1/n}-1)$ | L2: 0.828, 0.780, 0.757 ... 0.693 |
| Response time | $R_i = C_i + B_i + \sum_{hp}\lceil R_i/T_j\rceil C_j$ | L2: iterate to a fixed point |
| Delay phase or angle | $\varphi = 360°\,f\,T_d$ | L2 |
| Electrical frequency | $f_e = p\,n/60$ | L2 |
| Clarke | $i_\alpha = i_a$, $i_\beta = (i_a + 2i_b)/\sqrt3$ | L2 |
| Park | $i_d = i_\alpha\cos\theta + i_\beta\sin\theta$, $i_q = -i_\alpha\sin\theta + i_\beta\cos\theta$ | L2 |
| PMSM torque | $T = \tfrac32 p[\psi_f i_q + (L_d - L_q)i_d i_q]$ | L2 |
| CAN worst-case frame | $L = 47 + 8s + \lfloor(34+8s-1)/4\rfloor$ | L3: 8 bytes = 135 bits |
| Bus load | $U_{bus} = \sum L_i r_i/R_{bit}$ | L3 |
| Wire time | $t = 8B/R$ | L3: 80 ns/byte at 100 Mbit/s |
| UART throughput | baud $/(1+d+p+s)$ | L3: 8N1 = baud/10 |
| Variant matrix | $N = \prod n_k$ | L4 |
| Impact score | $I = 1 - \prod(1 - w_i)$ | L4 |
| Coverage | $C = n_{covered}/n_{total}$ | L5 |
| MC/DC minimum | $N + 1$ vs $2^N$ | L5 |
| Regression wall clock | $T = N\bar t/(m\,a)$ | L5 |

## L1 Microcontrollers

- **MCU:** Cortex-M, C2000, AURIX; 50 to 600 MHz; on-chip flash and SRAM; RTOS or bare metal; deterministic. Runs current loops, BMS, safety.
- **SoC:** Cortex-A, GHz, DRAM, Linux; perception, planning, UI. Variable timing.
- **Peripherals do the real-time work:** PWM timers, ADC triggered at PWM centre, DMA, encoder interface, comparator trips, CAN/SPI/UART controllers, watchdog.
- **Interrupt latency:** 12 cycles on Cortex-M4 plus masked time (critical sections) plus higher-priority ISRs.
- **Loop delay:** about 1.5 sample periods (75 µs at 20 kHz).
- **Headroom:** load above about 70 to 80% on a hard real-time MCU is a warning sign. Ask for worst case, not average.
- **Lockstep cores:** two cores compared every cycle in safety MCUs; not the Afterwave app.

## L2 RTOS and control loops

- **Priorities:** current loop in highest ISR; speed and position loops high; comms medium; logging low.
- **RM:** shorter period, higher priority. Bound is sufficient, not necessary; RTA decides.
- **Priority inversion:** fix with priority inheritance or ceiling; Mars Pathfinder 1997.
- **Rate change is a control change:** discrete gains contain $T_s$; delay changes with rate.
- **FOC chain:** measure, Clarke, Park, PI on d and q, inverse Park, SVPWM.
- **Torque follows $i_q$** (surface magnets); field weakening uses negative $i_d$.

| Loop | Rate | Output |
|---|---|---|
| Current | 8 to 40 kHz | phase voltages |
| Speed | 1 to 10 kHz | $i_q$ reference |
| Position | 0.5 to 5 kHz | speed reference |

## L3 Buses

| Bus | Rate | Payload | Note |
|---|---|---|---|
| Classic CAN | up to 1 Mbit/s | 8 B | lowest ID wins arbitration; 111 to 135 bits per 8-byte frame |
| CAN FD | 0.5 to 1 / 2 to 8 Mbit/s | 64 B | fast data phase |
| EtherCAT | 100 Mbit/s | shared frame | on-the-fly processing, distributed clocks below 1 µs |
| SPI | 1 to 50 MHz | any | fast on-board sensors |
| I2C | 0.1 to 1 MHz | any | 9 bits per byte |
| UART | to a few Mbaud | any | 10 bits per byte at 8N1 |

- **Bench logging:** hardware timestamps, MDF4 files, DBC/A2L matched to build, XCP adds bus load, check dropped and error frames, align clocks with the DAQ.
- **CAN termination:** 120 Ω each end, about 60 Ω measured.

## L4 Lifecycle

- **Build identity:** commit, toolchain and flags, variant, calibration dataset, bootloader, hardware revision (+ DBC/A2L, rig software).
- **Calibration:** separate flash area, edited via XCP/A2L; version it and record live changes.
- **Flashing:** debug probe on the bench; bootloader and UDS (ISO 14229) over CAN; secure boot, A/B banks, rollback protection; OTA under UN R155/R156 for vehicles.
- **Ripple mechanisms:** shared timing, shared signals, calibration coupling, memory layout and toolchain, interfaces, variants.

## L5 Testing

| Level | Sees | Misses |
|---|---|---|
| Unit | logic | timing, hardware |
| SIL / PIL | integration, target compiler (PIL) | real I/O |
| HIL | I/O, timing, faults | real physics |
| Rig | physics | rare field cases |

- **Static analysis:** warnings as errors, deep analysers, sound tools (Polyspace, Astrée).
- **MISRA C:2023:** mandatory, required (deviation with approval), advisory.
- **Coverage by standard:** ISO 26262-6 MC/DC highly recommended at ASIL D; DO-178C MC/DC at Level A. Measure on target; coverage is necessary, not sufficient.

## Ten CEO questions

1. **Test levels** and where defects are found.
2. **Coverage** on the target build and what is uncovered.
3. **Static findings and MISRA deviations** trend.
4. **Regression time** in bench-hours and wall clock (HIL and rig).
5. **Flaky tests** and plan.
6. **Traceability** requirement to test.
7. **Release criteria** and sign-off.
8. **Last release:** which rig tests rerun, why, what skipped.
9. **HIL model validation** against the rig.
10. **Build identity** recorded with every rig result, read from the device.
`;

export default cheatSheet;
