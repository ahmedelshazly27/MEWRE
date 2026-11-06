import { md } from "../../schema";

const cheatSheet = md`# AW03 HIL, SIL, test orchestration and CI for hardware: cheat sheet

## Conventions

- **Numbers:** all lab, rig and Afterwave numbers are **illustrative**, not customer data or traction.
- **Product scope:** Lockstep = capture of rig signals and on-screen actions on one clock; Ripple = which tests to rerun after a firmware, model or rig change, and why. Agents running rigs with approval = later product stage.
- **Execution stays with the customer:** their HIL, sequencer, orchestrator and safety chain.

## The X-in-the-loop ladder

| Rung | Real | Simulated | Clock | Finds |
|---|---|---|---|---|
| MIL | Nothing | Controller and plant | None | Algorithm errors |
| SIL | Production code on host | Plant | None (faster than real time) | Code, scaling, logic |
| PIL | Code on target processor | Plant | Step-locked | Compiler, fixed point, timing on core |
| HIL | Real ECU and firmware | Plant in real time, sensors, buses, faults | Wall clock | Timing, IO, diagnostics, fault reactions |
| Power HIL / rig | Power stage or everything | Load or nothing | Physical | Unmodelled physics, durability |

- **Cost per hour:** roughly an order of magnitude per rung upward.
- **Plant model risk:** a model that no longer matches hardware gives false confidence.

## Real-time numbers

| Quantity | Typical value |
|---|---|
| Body, battery, thermal model step | about 1 ms (CPU) |
| Average-value motor and inverter step | 10 to 50 microseconds (CPU) |
| Switching inverter, PWM capture, encoder emulation | 50 ns to 1 microsecond (FPGA) |
| PWM period at 16 kHz | 62.5 microseconds |
| RTF target (worst case) | below about 0.6 to 0.7 |
| 25 microseconds delay at 1 kHz | 9 degrees phase lost |

- **Overrun:** any step longer than $T_s$ invalidates the run.
- **Accuracy:** 10 to 20 steps per fastest time constant or period; forward Euler stable only if $T_s < 2\tau$.

## HIL in practice

- **Signal path:** host, real-time target (CPU + FPGA), IO and conditioning, FIU, harness to DUT, buses with rest-bus simulation, loads, programmable supplies.
- **Styles:** dSPACE (SCALEXIO, integrated IO and FIU), NI (PXI, VeriStand, TestStand), Speedgoat (Simulink Real-Time targets), Vector (CANoe + VT System per-pin IO); Typhoon HIL, OPAL-RT for power electronics.
- **ASAM XIL:** API from automation to MIL/SIL/HIL benches. **ASAM MDF4:** measurement data format.
- **Fault classes:** electrical, bus, sensor, power supply, timing.
- **Matrix size:** single-pin $n_{pins} n_f n_{op}$; pin-to-pin $\binom{n}{2} n_{op}$: 40 pins give 780 pairs.
- **HIL prices:** not public; ask the customer (unverified ranges only).

## Orchestration

- **Sequence:** setup, steps with limits (low, high, unit), cleanup that always runs, result record.
- **Scheduling:** capability matching, priority, leases with heartbeat and expiry, locks in a fixed global order.
- **Unattended needs:** independent safety chain, safe-state cleanup, watchdogs, remote power cycle, recovery with attempt limit, abort criteria, alerting.

## Flaky-test statistics

| Quantity | Formula | Example |
|---|---|---|
| Suite all green | $(1-p)^N$ | 500 tests at 0.2 %: 37 % |
| Red after k retries | $x^{k+1}$ | defect q = 0.2, k = 1: 4 % |
| Runs to see failure | $\lceil \ln(1-C)/\ln(1-q) \rceil$ | q = 0.1, C = 0.95: 29 |
| Rule of three | $p_{95} \approx 3/n$ | 50 clean runs: 6 % |

- **Retries:** keep them bounded and log every pass-on-retry per test.

## CI and queueing

- **Tiers:** pre-merge (minutes: build, unit, SIL, smoke), nightly (hours: HIL regression), release (days: full fault matrix, rigs, endurance).
- **Triggers:** firmware, parameters, plant model and rig configuration are all changes.
- **Safe selection rollout:** selected nightly, full weekly as audit.

| Quantity | Formula | Where |
|---|---|---|
| Utilisation | $\rho = \lambda/(c\mu)$ | Any pool |
| M/M/1 wait | $W_q = \rho\,\tau_s/(1-\rho)$ | One rig |
| Erlang C | $W_q = P_W/(c\mu - \lambda)$ | Pool of c identical rigs |
| Kingman | $W_q \approx \frac{\rho}{1-\rho}\frac{c_a^2+c_s^2}{2}\tau_s$ | Variable arrivals and jobs |
| Little | $L = \lambda W$ | Any stable queue |
| Overnight capacity | $\lfloor W a/(t_{test}+t_{setup}) \rfloor n_{rigs}$ | Unattended window |
| Cost per hour | $(C_{cap}/L + C_{fix})/(u H_{avail})$ | Rig economics |

| Example (illustrative) | Result |
|---|---|
| 12-min job, one rig at 80 % | 48 min wait |
| 4 jobs/h, 12 min, two rigs | 2.3 min wait |
| EUR 230k fixed at 25 % / 70 % of 8,760 h | EUR 105 / 37.5 per hour |

## Run records and traceability

- **Run record:** identity, baseline (firmware hash, hardware revision and serial, parameter set), environment (plant model, rig configuration), instruments and calibration, procedure, time and clock source, trigger, verdicts, artefacts, trace links.
- **Verdicts:** pass, fail (DUT), error (bench), inconclusive, not run, pass-on-retry.
- **Data rate:** $R = n_{ch} f_s b$: 64 ch at 100 kS/s, 16-bit = 12.8 MB/s = 46 GB/h.
- **Coverage on a baseline:** only reruns or documented justifications count after a change.
- **Suspect links:** requirement changes only; blind to firmware, model and rig changes.
- **Retention:** tiered; Machinery Regulation technical file retention (understood 10 years, verify).

## Agents (vision, stage 3)

- **Loop:** changes, Ripple ranking, bench memory, capacity, draft plan, recorded approval, hand-off to customer orchestrator, monitor, report.
- **Compound reliability:** $r^n$: 12 steps at 98 % = 78 %; checkpoints shorten $n$.
- **Approval by hazard and reversibility:** free (reversible, low hazard), plan approval (energised, pre-approved), per action (state-changing), human only (irreversible, high hazard).
- **Never:** safety chain, limits, new sequences unattended, attended-only rigs, skipping required tests without a recorded decision.
- **2026 landscape (unverified):** Sift Agents, NI Nigel, Vector CANoe AI package and MCP, dSPACE MCP headline, Nominal and Fid Labs; none found doing change-impact selection for rigs.
`;

export default cheatSheet;
