import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 timing
  {
    id: "aw06-cycle-time",
    name: "Execution time from cycles",
    tex: String.raw`t = \frac{N_{cyc}}{f_{clk}}`,
    vars: [
      { sym: "t", meaning: "Execution time of a routine", unit: "s" },
      { sym: "N_{cyc}", meaning: "CPU cycles the routine takes (measured worst case for timing budgets)", unit: "cycles" },
      { sym: "f_{clk}", meaning: "CPU clock frequency", unit: "Hz" },
    ],
    explanation: md`4,000 cycles at 200 MHz take 20 µs. Use worst-case cycle counts for budgets; averages hide rare long paths. Wait states and cache misses make $N_{cyc}$ itself depend on where the code sits in memory.`,
    lesson: "aw06-l01",
  },
  {
    id: "aw06-cycle-budget",
    name: "Cycle budget per control period",
    tex: String.raw`N_{budget} = \frac{f_{clk}}{f_{loop}} = f_{clk}\,T_s`,
    vars: [
      { sym: "N_{budget}", meaning: "Cycles available in one loop period", unit: "cycles" },
      { sym: "f_{loop}", meaning: "Loop (sample) rate", unit: "Hz" },
      { sym: "T_s", meaning: "Sample period", unit: "s" },
    ],
    explanation: md`200 MHz at 20 kHz gives 10,000 cycles per 50 µs period. Everything that must happen every period (ISR entry, control math, fault checks, a share of background work) must fit.`,
    lesson: "aw06-l01",
  },
  {
    id: "aw06-cpu-utilisation",
    name: "CPU utilisation (load)",
    tex: String.raw`U = \sum_{i} \frac{C_i}{T_i}`,
    vars: [
      { sym: "U", meaning: "Total CPU utilisation", unit: "fraction" },
      { sym: "C_i", meaning: "Worst-case execution time of task or ISR i", unit: "s" },
      { sym: "T_i", meaning: "Period of task or ISR i", unit: "s" },
    ],
    explanation: md`Sum of execution time over period. 30 µs every 62.5 µs plus 50 µs every 625 µs plus 100 µs every 1 ms is $0.48 + 0.08 + 0.10 = 0.66$. Many hard real-time teams treat 70 to 80% as a warning level.`,
    lesson: "aw06-l01",
  },
  // ---------------------------------------------------------------- l02 scheduling and FOC
  {
    id: "aw06-rm-bound",
    name: "Liu and Layland rate-monotonic bound",
    tex: String.raw`U \le n\left(2^{1/n} - 1\right)`,
    vars: [
      { sym: "U", meaning: "Total utilisation of the periodic task set", unit: "fraction" },
      { sym: "n", meaning: "Number of periodic tasks", unit: "-" },
    ],
    explanation: md`Sufficient test for independent periodic tasks with deadline equal to period under rate-monotonic priorities: 1.000, 0.828, 0.780, 0.757 for $n = 1..4$, tending to $\ln2 = 0.693$. Failing it does not prove the set unschedulable; use response-time analysis.`,
    lesson: "aw06-l02",
  },
  {
    id: "aw06-response-time",
    name: "Response-time analysis (fixed priority)",
    tex: String.raw`R_i = C_i + B_i + \sum_{j \in hp(i)} \left\lceil \frac{R_i}{T_j} \right\rceil C_j`,
    vars: [
      { sym: "R_i", meaning: "Worst-case response time of task i", unit: "s" },
      { sym: "C_i", meaning: "Worst-case execution time of task i", unit: "s" },
      { sym: "B_i", meaning: "Worst-case blocking by lower-priority tasks holding shared resources", unit: "s" },
      { sym: "hp(i)", meaning: "Set of tasks with higher priority than i", unit: "-" },
      { sym: "T_j", meaning: "Period of higher-priority task j", unit: "s" },
    ],
    explanation: md`Solve by iteration starting from $R_i = C_i$ (or the sum of all C) until the value repeats; schedulable if $R_i \le D_i$. The worked example converges at 3,680 µs for a 10 ms task. The blocking term is where priority inversion shows up.`,
    lesson: "aw06-l02",
  },
  {
    id: "aw06-delay-phase",
    name: "Phase lag (or angle error) from a time delay",
    tex: String.raw`\varphi = 360^\circ \, f \, T_d`,
    vars: [
      { sym: "\\varphi", meaning: "Phase lag at frequency f, or electrical angle moved during the delay", unit: "°" },
      { sym: "f", meaning: "Frequency of interest (loop crossover frequency, or electrical frequency)", unit: "Hz" },
      { sym: "T_d", meaning: "Effective delay (about 1.5 sample periods in a typical drive)", unit: "s" },
    ],
    explanation: md`75 µs at a 1.5 kHz current-loop crossover costs 40.5° of phase margin; the same delay at 200 Hz electrical frequency is a 5.4° angle error, and at 800 Hz 21.6°. Delay, not CPU speed alone, limits loop bandwidth.`,
    lesson: "aw06-l02",
  },
  {
    id: "aw06-electrical-freq",
    name: "Electrical frequency of a synchronous motor",
    tex: String.raw`f_e = \frac{p\,n}{60}, \qquad \theta_e = p\,\theta_m`,
    vars: [
      { sym: "f_e", meaning: "Electrical frequency of phase currents", unit: "Hz" },
      { sym: "p", meaning: "Number of pole pairs", unit: "-" },
      { sym: "n", meaning: "Shaft speed", unit: "rpm" },
      { sym: "\\theta_e, \\theta_m", meaning: "Electrical and mechanical rotor angle", unit: "rad or °" },
    ],
    explanation: md`4 pole pairs at 3,000 rpm give 200 Hz; 10 pole pairs at 1,500 rpm give 250 Hz. High pole counts in compact actuators mean high electrical frequency at modest speed.`,
    lesson: "aw06-l02",
  },
  {
    id: "aw06-clarke",
    name: "Clarke transform (amplitude invariant, balanced currents)",
    tex: String.raw`i_\alpha = i_a, \qquad i_\beta = \frac{i_a + 2\,i_b}{\sqrt{3}}`,
    vars: [
      { sym: "i_a, i_b", meaning: "Measured phase currents (i_c = -i_a - i_b)", unit: "A" },
      { sym: "i_\\alpha, i_\\beta", meaning: "Orthogonal components in the stationary frame", unit: "A" },
    ],
    explanation: md`Turns three phase currents into two orthogonal ones, using $i_a + i_b + i_c = 0$ so two sensors suffice. With $i_a = 0$, $i_b = 8.66$ A: $i_\beta = 10$ A.`,
    lesson: "aw06-l02",
  },
  {
    id: "aw06-park",
    name: "Park transform",
    tex: String.raw`\begin{aligned} i_d &= i_\alpha \cos\theta_e + i_\beta \sin\theta_e \\ i_q &= -i_\alpha \sin\theta_e + i_\beta \cos\theta_e \end{aligned}`,
    vars: [
      { sym: "i_d", meaning: "Direct-axis current (aligned with magnet flux)", unit: "A" },
      { sym: "i_q", meaning: "Quadrature-axis current (produces torque)", unit: "A" },
      { sym: "\\theta_e", meaning: "Electrical rotor angle", unit: "rad" },
    ],
    explanation: md`Rotates into the rotor frame where steady-state currents are DC, so PI controllers can regulate them. An angle error $\Delta\theta$ leaks $\sin\Delta\theta$ of the current onto the wrong axis.`,
    lesson: "aw06-l02",
  },
  {
    id: "aw06-pmsm-torque",
    name: "PMSM electromagnetic torque",
    tex: String.raw`T = \frac{3}{2}\,p\left[\psi_f\, i_q + (L_d - L_q)\, i_d\, i_q\right]`,
    vars: [
      { sym: "T", meaning: "Electromagnetic torque", unit: "N·m" },
      { sym: "p", meaning: "Pole pairs", unit: "-" },
      { sym: "\\psi_f", meaning: "Permanent-magnet flux linkage", unit: "Wb" },
      { sym: "L_d, L_q", meaning: "d- and q-axis inductances", unit: "H" },
      { sym: "i_d, i_q", meaning: "d- and q-axis currents (amplitude-invariant scaling)", unit: "A" },
    ],
    explanation: md`For surface-mount magnets $L_d = L_q$ and $T = 1.5\,p\,\psi_f\,i_q$: 4 pole pairs, 0.05 Wb, 20 A gives 6 N·m. Interior magnets add reluctance torque; field weakening drives $i_d$ negative at high speed.`,
    lesson: "aw06-l02",
  },
  // ---------------------------------------------------------------- l03 buses
  {
    id: "aw06-can-frame-bits",
    name: "Worst-case length of a standard CAN frame",
    tex: String.raw`L = 47 + 8s + \left\lfloor \frac{34 + 8s - 1}{4} \right\rfloor`,
    vars: [
      { sym: "L", meaning: "Worst-case frame length including 3-bit interframe space", unit: "bits" },
      { sym: "s", meaning: "Data bytes (0 to 8)", unit: "bytes" },
    ],
    explanation: md`From Davis et al. (2007) for 11-bit identifiers, including worst-case stuff bits. 8 bytes: 135 bits (111 without stuffing). 4 bytes: 95 bits. At 500 kbit/s an 8-byte frame takes 222 to 270 µs.`,
    lesson: "aw06-l03",
  },
  {
    id: "aw06-bus-load",
    name: "Bus load",
    tex: String.raw`U_{bus} = \frac{\sum_i L_i\, r_i}{R_{bit}}`,
    vars: [
      { sym: "U_{bus}", meaning: "Bus load", unit: "fraction" },
      { sym: "L_i", meaning: "Frame length of message i", unit: "bits" },
      { sym: "r_i", meaning: "Transmission rate of message i", unit: "frames/s" },
      { sym: "R_{bit}", meaning: "Bus bit rate", unit: "bit/s" },
    ],
    explanation: md`2,410 frames/s of 8 bytes on 500 kbit/s: 53.5% nominal, 65.1% worst case. Above 100% low-priority frames are never sent; well before that their latency grows. Many teams design well below 70%.`,
    lesson: "aw06-l03",
  },
  {
    id: "aw06-serialisation-time",
    name: "Serialisation (wire) time",
    tex: String.raw`t_{wire} = \frac{8\,B}{R}`,
    vars: [
      { sym: "t_{wire}", meaning: "Time to put the bytes on the wire", unit: "s" },
      { sym: "B", meaning: "Bytes including protocol overhead", unit: "bytes" },
      { sym: "R", meaning: "Line rate", unit: "bit/s" },
    ],
    explanation: md`At 100 Mbit/s (EtherCAT) each byte takes 80 ns; an 820-byte frame takes 65.6 µs. Add per-device forwarding delays (sub-microsecond to about a microsecond each) and cable delay (about 5 ns/m) for the cycle.`,
    lesson: "aw06-l03",
  },
  {
    id: "aw06-uart-throughput",
    name: "UART byte throughput",
    tex: String.raw`\dot{B} = \frac{\text{baud}}{1 + d + p + s}`,
    vars: [
      { sym: "\\dot{B}", meaning: "Bytes per second", unit: "bytes/s" },
      { sym: "d", meaning: "Data bits per character (usually 8)", unit: "bits" },
      { sym: "p", meaning: "Parity bits (0 or 1)", unit: "bits" },
      { sym: "s", meaning: "Stop bits (1 or 2)", unit: "bits" },
    ],
    explanation: md`8N1 sends 10 bits per byte: 115,200 baud carries 11,520 bytes/s. A 32-byte message at 1 kHz needs at least 320 kbaud.`,
    lesson: "aw06-l03",
  },
  // ---------------------------------------------------------------- l04 lifecycle
  {
    id: "aw06-variant-matrix",
    name: "Build variant matrix",
    tex: String.raw`N_{builds} = \prod_{k} n_k`,
    vars: [
      { sym: "N_{builds}", meaning: "Number of distinct builds", unit: "-" },
      { sym: "n_k", meaning: "Number of options in variant dimension k (hardware revision, motor type, market, build type)", unit: "-" },
    ],
    explanation: md`3 revisions x 2 motors x 2 markets = 12 builds; at 40 rig-hours each a full regression is 480 rig-hours. Prune with evidence: release builds only on the rig, and only the builds a change reaches.`,
    lesson: "aw06-l04",
  },
  {
    id: "aw06-impact-score",
    name: "Change-impact score of a test",
    tex: String.raw`I = 1 - \prod_{i} \left(1 - w_i\right)`,
    vars: [
      { sym: "I", meaning: "Probability that the change alters the test's outcome", unit: "0 to 1" },
      { sym: "w_i", meaning: "Weight (probability) of dependency path i from a changed artifact to the test", unit: "0 to 1" },
    ],
    explanation: md`Paths combine like independent chances: 0.7 and 0.3 give 0.79; 0.5 and 0.4 give 0.70. Select tests above a threshold. Correlated paths make the independence assumption overstate the score.`,
    lesson: "aw06-l04",
  },
  // ---------------------------------------------------------------- l05 testing
  {
    id: "aw06-coverage",
    name: "Structural coverage",
    tex: String.raw`C = \frac{n_{covered}}{n_{total}}`,
    vars: [
      { sym: "C", meaning: "Coverage (statement, branch or MC/DC)", unit: "fraction" },
      { sym: "n_{covered}", meaning: "Items exercised by the tests", unit: "-" },
      { sym: "n_{total}", meaning: "Items in the code", unit: "-" },
    ],
    explanation: md`1,840 of 2,300 branches is 80%. Measure on the target build; ask what is in the uncovered part (usually error and fault handling).`,
    lesson: "aw06-l05",
  },
  {
    id: "aw06-mcdc-min",
    name: "Minimum tests for MC/DC vs exhaustive",
    tex: String.raw`n_{MC/DC,\min} = N + 1 \quad\text{vs}\quad n_{all} = 2^N`,
    vars: [
      { sym: "N", meaning: "Independent conditions in a decision", unit: "-" },
      { sym: "n_{MC/DC,\\min}", meaning: "Minimum test cases achieving MC/DC (best case)", unit: "tests" },
      { sym: "n_{all}", meaning: "Test cases for all combinations", unit: "tests" },
    ],
    explanation: md`4 conditions: 5 tests vs 16; 8 conditions: 9 vs 256. Coupled conditions can raise the minimum; the upper bound for unique-cause MC/DC is $2N$.`,
    lesson: "aw06-l05",
  },
  {
    id: "aw06-regression-time",
    name: "Regression wall-clock time on a bench pool",
    tex: String.raw`T_{wall} = \frac{N_{tests}\, \bar{t}}{m\, a}`,
    vars: [
      { sym: "T_{wall}", meaning: "Wall-clock time for the regression", unit: "h" },
      { sym: "N_{tests}", meaning: "Tests to run", unit: "-" },
      { sym: "\\bar{t}", meaning: "Mean duration per test including setup", unit: "h" },
      { sym: "m", meaning: "Benches (HIL or rigs) in parallel", unit: "-" },
      { sym: "a", meaning: "Bench availability", unit: "fraction" },
    ],
    explanation: md`1,200 tests x 3 min on 4 HIL benches at 85%: 17.6 h. 90 rig tests x 1.5 h on 3 rigs at 80%: 56.25 h. Assumes tests can be spread evenly; long tests and fixture changes make it worse.`,
    lesson: "aw06-l05",
  },
];

export default formulas;
