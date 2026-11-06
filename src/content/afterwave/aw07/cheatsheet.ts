import { md } from "../../schema";

const cheatSheet = md`## Actuators and drives

- **Power chain:** bus (voltage, top speed), drive (current, peak torque), motor (heat, continuous torque), gearbox (ratio, stiffness, backlash, life), link.
- **Kt = Ke in SI:** more torque per amp means more volts per rad/s and a lower top speed.
- **Voltage limit:** torque collapses when $R i + K_e\omega$ reaches the bus voltage.
- **Reflected inertia:** $N^2 J_m$; 100:1 makes a 1.5e-4 kg m² rotor look like 1.5 kg m².
- **Harmonic drive:** 30:1 to 160:1, near-zero backlash, compliant, efficiency varies with load and temperature, flexspline fatigue.
- **Torque density:** state peak or continuous, duration, ambient and cooling.
- **Temperature:** NdFeB Kt about -0.1 %/K; copper R about +0.39 %/K.

## Control loops

| Loop | Typical bandwidth |
|---|---|
| Current | 1 to 3 kHz |
| Velocity | 100 to 300 Hz |
| Position | 10 to 50 Hz |

- **Cascade rule:** each outer loop about 5 to 10 times slower than the inner.
- **Phase margin:** 45 to 60° or more well damped; about 30° rings; damping ratio about PM/100.
- **Delay costs phase:** 1 ms at 100 Hz crossover is 36°. Logging, filters and loop-rate changes eat margin with no gain change.
- **Resonance ceiling:** keep position crossover well below the drivetrain resonance.

## Perception

- **Encoder:** 19 bits = 2.5 arcsec; resolution is not accuracy.
- **IMU drift:** gyro bias linear in time; accelerometer bias quadratic (1 mg gives 0.5 m in 10 s).
- **Stereo:** error grows with distance squared (700 px, 6 cm, 0.25 px: 2.4 cm at 2 m).
- **Lidar:** 1 ns = 15 cm; fails on glass, mirrors, black surfaces.
- **Kalman gain:** share of total uncertainty owned by the prediction; Q and R are tuning parameters to version.
- **Timestamps:** error = speed times time error; stamp at exposure on one clock.

## Learned policies

- **Behaviour cloning:** compounding error; DAgger, action chunking and recovery data mitigate.
- **RL:** dominant for locomotion, trained in parallel simulation.
- **VLA:** pretrained VLM plus action tokens or a diffusion/flow head (RT-2, OpenVLA, pi0, Helix, GR00T N1, Gemini Robotics).
- **Weight changes are global:** smoke-test every skill.
- **Statistics:** ±5 points at 80 % needs 246 trials; 80 to 85 % needs about 900 per arm; zero failures in n bounds the rate at 3/n.

## Sim vs real

- **Gap sources:** actuators, friction, contact, latency, sensors, appearance, mass properties.
- **Randomisation ranges:** from measured unit spread (for example mean ±3 sd), not guesses.
- **Evidence:** simulation is valid only within the bench-validated range; releases are gated on real trials.

## Market and bottlenecks (late 2026, dated)

| Fact | Date | Status |
|---|---|---|
| Figure 03 at BMW Spartanburg | Jul 2026 | reported |
| Production Atlas at CES | Jan 2026 | reported |
| ISO 10218-1/-2 published | Feb 2025 | established |
| ISO 25785-1 (humanoids) in draft | 2026 | reported; timeline unverified |
| IEEE: no balance and recovery test methods | Sep 2025 | reported |
| Machinery Regulation applies | 20 Jan 2027 | established |
| AI Omnibus in force, machinery via delegated acts | 27 Jul 2026 / target 2 Aug 2028 | secondary sources |
| Humanoid funding totals | 2026 | unverified |

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Motor torque | $\tau_m = K_t i$ | L1 |
| Voltage | $V = Ri + K_e\omega_m$ | L1 |
| Copper loss | $P = i^2R = (\tau/K_m)^2$ | L1 |
| Gear output | $\tau_{out} = N\eta\tau_m$ | L1 |
| Reflected inertia | $J_{out} = J_L + N^2J_m$ | L1 |
| Resonance | $f_r = \frac{1}{2\pi}\sqrt{k_\theta(1/N^2J_m + 1/J_L)}$ | L1 |
| Current PI | $K_p = L\omega_c$, $K_i = R\omega_c$ | L2 |
| Delay lag | $\Delta\varphi = \omega_cT_d$ | L2 |
| Delay margin | $T_{dm} = PM/\omega_c$ | L2 |
| Following error | $e = \dot q/K_{pp}$ | L2 |
| Stereo error | $\delta Z = Z^2\delta d/(fB)$ | L3 |
| Kalman gain | $K = P^-H^\top(HP^-H^\top + R)^{-1}$ | L3 |
| Episode success | $(1-p)^T$ | L4 |
| CI | $\hat p \pm 1.96\sqrt{\hat p(1-\hat p)/n}$ | L4 |
| Rule of three | $p_{max} \approx 3/n$ | L4 |
| Integration limit | $\Delta t < 2/\omega_n$ | L5 |
| Evidence hours | $H = Snt/60 \cdot f_{sel}$ | L6 |
`;

export default cheatSheet;
