import { md } from "../../schema";

const cheatSheet = md`# AW02 Data acquisition and signals: cheat sheet

## Conventions

- **Status of numbers:** every rig and venture number in this module is **illustrative**, not Afterwave or customer data.
- **Lockstep:** capture app that records rig signals via data acquisition and on-screen actions on one clock. Claim nothing beyond that without your cofounders' measurements.
- **Units:** SI; GB and MB are decimal ($10^9$, $10^6$ bytes).

## Sensors and signal chain

- **Chain:** transducer, excitation, conditioning, anti-alias filter and ADC, timestamp, storage with metadata.
- **Bridge:** quarter $V_{ex}\mathrm{GF}\varepsilon/4$; full $V_{ex}\mathrm{GF}\varepsilon$; GF about 2.
- **Load cell:** 2 mV/V at 10 V excitation gives 20 mV full scale; measure excitation at the cell.
- **Thermocouple:** type K about 41 µV/°C; needs cold-junction compensation; class tolerance about ±1.5 to 2.5 °C.
- **Pt100:** 100 Ω at 0 °C, 0.385 Ω/°C; 2-wire with 1 Ω of leads reads 2.6 °C high; use 3 or 4-wire.
- **Current:** shunt (DC, not isolated, $I^2R$), Hall or zero-flux (isolated, DC), Rogowski (isolated, AC only).
- **Noise:** $v_n = e_n\sqrt{B}$; ground loops, common-mode voltage and PWM coupling are the usual culprits.

## Sampling and resolution

| Item | Value |
|---|---|
| Nyquist | $f_s > 2 f_{max}$ at the ADC input |
| Alias | $f_a = \lvert f - k f_s\rvert$ |
| LSB, 16-bit, ±10 V | 305 µV |
| LSB, 24-bit, ±10 V | 1.19 µV |
| Ideal SNR | $6.02N + 1.76$ dB |
| ENOB | $(\mathrm{SINAD} - 1.76)/6.02$ |
| Averaging gain | $10\log_{10}\mathrm{OSR}$ (64x gives 18 dB) |

- **Aliasing is permanent:** filter in hardware (or delta-sigma) before sampling; decimate = filter, then downsample.
- **Delta-sigma:** great alias rejection, group delay, rings on steps; SAR for transients and low latency.
- **Illustrative drive rig:** about 4.1 MB/s, 15 GB/h, 1.2 TB per two-shift rig-week.

## Clocks and synchronisation

| Oscillator | Error | After 8 h |
|---|---|---|
| Crystal | ±10 to 100 ppm | 0.29 to 2.9 s |
| TCXO | ±0.5 to 2 ppm | 14 to 58 ms |
| OCXO | ±0.01 to 0.1 ppm | 0.3 to 2.9 ms |

- **1 ppm:** 3.6 ms per hour, 86.4 ms per day.
- **Errors:** offset, drift, jitter (random), latency (bias per source).
- **Methods, best first:** shared sample clock and trigger; fieldbus distributed clocks; PTP with hardware timestamps (sub-µs); GPS/PPS (tens of ns to UTC); NTP (about 1 ms LAN); nothing.
- **PTP:** offset $((t_2-t_1)-(t_4-t_3))/2$, delay $((t_2-t_1)+(t_4-t_3))/2$; asymmetry gives error of half the asymmetry.
- **Align after the fact:** sync events on both streams, fit offset and slope, $t_{ref} = (t_{dev}-\theta_0)/(1+\delta)$.
- **Time bases:** monotonic for intervals; UTC with explicit offset for absolute times; TAI is 37 s and GPS 18 s ahead of UTC.

## Formats

| Format | Use | Note |
|---|---|---|
| CSV | Exchange only | About 3x size, precision loss, no units, 1,048,576-row Excel limit |
| MDF4 (ASAM) | Automotive acquisition | Channel groups, master channel, conversion rules |
| TDMS (NI) | NI acquisition | File, group, channel with properties; segments |
| HDF5 | Science, ML | Chunked datasets, schemas vary |
| MCAP | Robotics messages | Indexed, maintained by Foxglove |
| Parquet | Analytics, ML | Columnar, encodings, statistics; convert into it |

- **Keep raw files immutable** with checksums; store raw integers plus conversion (int16 vs float64 is 4x).
- **Compression:** noisy 24-bit about 1.2 to 2x; slow channels 3 to 10x; states 10 to 100x. Measure, never assume.

## Context and one clock

- **Events vs signals:** events are irregular timestamped records; join with as-of joins and intervals.
- **Screen capture:** about 0.5 to 3 Mbit/s; 1.5 Mbit/s is 675 MB/h; timing resolution one frame interval.
- **One clock:** clock error must be well below cause-to-effect delays (1 to 100 ms), or ordering flips.
- **Privacy:** screen capture is personal data (GDPR); capture named apps only, agree scope with the DPO and works council.

## Quality and provenance

- **Calibration record:** serial, certificate, dates, as-found/as-left, constants, uncertainty, ISO/IEC 17025 lab.
- **Uncertainty:** $u_c = \sqrt{\sum u_i^2}$, $U = 2u_c$; rectangular limit $a/\sqrt{3}$.
- **Naming:** rig.subsystem.location.quantity, documented, versioned, with an alias table for legacy names.
- **Versions per run:** DUT firmware with hash, rig configuration, channel list, procedure, software.
- **Lineage:** entities, activities, agents (W3C PROV); raw immutable, derived rebuildable.
- **Checks:** completeness $N/(f_sT)$, gaps, monotonic time, saturation, flatline, spikes, cross-channel consistency, calibration due.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Quarter bridge | $V_o \approx V_{ex}\mathrm{GF}\varepsilon/4$ | L01 |
| Load cell | $V_o = S V_{ex} F/F_{rated}$ | L01 |
| RTD | $R = R_0(1+\alpha T)$ | L01 |
| Shunt | $V = IR$, $P = I^2R$ | L01 |
| Noise | $v_n = e_n\sqrt{B}$ | L01 |
| SNR | $20\log_{10}(V_s/V_n)$ | L01 |
| LSB | $\mathrm{FSR}/2^N$ | L02 |
| ENOB | $(\mathrm{SINAD}-1.76)/6.02$ | L02 |
| Data rate | $\sum n f_s b$ | L02 |
| Clock error | $\theta_0 + \delta t$ | L03 |
| PTP offset | $((t_2-t_1)-(t_4-t_3))/2$ | L03 |
| Compression | $S_{raw}/S_{comp}$ | L04 |
| Video size | $r_b T/8$ | L05 |
| Uncertainty | $U = k\sqrt{\sum u_i^2}$ | L06 |
| Completeness | $N_{received}/(f_s T)$ | L06 |
`;

export default cheatSheet;
