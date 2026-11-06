import { md, type Lesson } from "../../schema";

const aliasRows = Array.from({ length: 26 }, (_, i) => {
  const f = i * 100;
  return { f, true: f, apparent: Math.abs(f - Math.round(f / 1000) * 1000) };
});

const lesson: Lesson = {
  id: "aw02-l02",
  title: "Sampling, aliasing and resolution",
  summary:
    "How a continuous signal becomes samples: the Nyquist criterion, why aliasing is permanent and how anti-alias filters prevent it, ADC bits versus real resolution (LSB, ideal SNR, SINAD, ENOB, dynamic range), oversampling, and the data-rate and storage arithmetic that every bench capture plan starts from.",
  minutes: 75,
  objectives: [
    "State the Nyquist criterion correctly and compute the alias frequency of an under-sampled component",
    "Explain why an analog anti-alias filter must sit before the ADC and what delta-sigma converters change",
    "Compute LSB size, ideal SNR and ENOB, and explain why a 24-bit channel does not deliver 24 bits",
    "Compute data rate and storage volume for a mixed-rate rig and an overnight test campaign",
    "Write a defensible sample-rate specification for each channel class on a drive or inverter rig",
  ],
  concepts: [
    { id: "aw02.nyquist", name: "Nyquist criterion", description: "A band-limited signal is fully determined by samples taken at more than twice its highest frequency component; in practice 2.5x with steep filters, 10x or more for waveform fidelity.", competency: "aw-data", related: ["aw02.aliasing", "aw02.data-rate"] },
    { id: "aw02.aliasing", name: "Aliasing and anti-alias filtering", description: "Components above fs/2 fold back to false low frequencies indistinguishable from real ones; an analog low-pass (or delta-sigma digital filter) before decimation is the only cure.", competency: "aw-data", related: ["aw02.nyquist"] },
    { id: "aw02.adc-resolution", name: "ADC resolution and dynamic range", description: "LSB = FSR/2^N; ideal SNR 6.02N + 1.76 dB; dynamic range is the ratio between the largest and smallest measurable signal in one range setting.", competency: "aw-data", related: ["aw02.enob", "aw02.signal-chain"] },
    { id: "aw02.enob", name: "Effective number of bits (ENOB)", description: "Resolution the channel actually achieves, computed from measured SINAD: (SINAD − 1.76)/6.02.", competency: "aw-data", related: ["aw02.adc-resolution"] },
    { id: "aw02.data-rate", name: "Data rate and storage volume", description: "Sum over channel groups of channels × sample rate × bytes per sample; drives network, disk, retention and cost decisions.", competency: "aw-data", related: ["aw02.nyquist", "aw02.columnar-storage"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What sampling keeps and what it destroys",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Sample rate and resolution decide what a bench recording can ever answer, and they decide how much data Afterwave has to move, store and index. When a prospect says "we log at 1 kHz" or "our modules are 24-bit", you need to know whether that is enough for the question they want Ripple to help answer, and what it means for the size of a pilot. A wrong number here turns into a wrong storage quote, a slow product or, worse, a silent aliasing artefact that someone later trains a model on.`,
        },
        {
          kind: "md",
          md: md`### The Nyquist criterion

Sampling at rate $f_s$ (samples per second, S/s) captures a signal without ambiguity only if the signal contains nothing at or above half the sample rate, the **Nyquist frequency** $f_s/2$:`,
        },
        { kind: "equation", formula: "aw02-nyquist" },
        {
          kind: "md",
          md: md`Two common misreadings:

1. **"$f_{max}$ is the frequency I care about."** No: it is the highest frequency **present at the ADC input**, including switching ripple, vibration harmonics, radio interference and noise. A temperature channel you only care about at 1 Hz still carries 50 Hz pickup and inverter PWM noise.
2. **"2x is enough to see the waveform."** The theorem guarantees reconstruction with an ideal sinc interpolator. To see peaks and edges directly in the samples, engineers use 10x to 20x the highest frequency of interest. Sampling a 1 kHz sine at 2.5 kS/s captures its frequency but can miss its peak by a large fraction.

### Aliasing: the error you cannot undo

A component at frequency $f$ above $f_s/2$ does not disappear. It **folds** into the band 0 to $f_s/2$ and appears at:`,
        },
        { kind: "equation", formula: "aw02-alias" },
        {
          kind: "md",
          md: md`At $f_s = 1$ kS/s, a 900 Hz vibration appears at 100 Hz, so does 1,100 Hz and 1,900 Hz. Once sampled, these are mathematically identical to a real 100 Hz signal. **No digital filter applied afterwards can separate them.** That is why the filter must act on the analog signal, before the sampler.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Apparent frequency vs true frequency at fs = 1 kS/s",
          xKey: "f",
          xLabel: "True input frequency (Hz)",
          yLabel: "Frequency in the samples (Hz)",
          series: [
            { key: "true", label: "True frequency" },
            { key: "apparent", label: "Apparent (aliased) frequency" },
          ],
          data: aliasRows,
          caption: "Below 500 Hz (fs/2) the two lines agree. Above it the samples fold back in a sawtooth: 900, 1,100 and 1,900 Hz all look like 100 Hz.",
        },
        {
          kind: "md",
          md: md`### Anti-alias filters and delta-sigma ADCs

An **anti-alias filter** is a low-pass filter before the ADC that attenuates everything above $f_s/2$ to below the noise floor. Real filters roll off gradually, so a gap is left between the highest frequency of interest (the **passband**) and $f_s/2$: that is why practical rates are about 2.5x the passband rather than 2x.

Most modern dynamic signal and "24-bit" DAQ modules use **delta-sigma** ADCs. They sample internally at a very high rate (MHz) with a simple analog filter, then apply a sharp digital low-pass filter and **decimate** to the output rate. The result is excellent alias rejection that tracks the selected rate automatically, at the cost of a **group delay** (the filter delays the signal by tens of samples). Two consequences matter for bench data:

- The filter delay is a timing offset between channels sampled by different module types (Lesson 3).
- Delta-sigma filters ring at sharp steps and are not ideal for capturing single-shot transients; **SAR** (successive approximation) ADCs with simpler filters are used where step response and low latency matter, such as control loops and transient capture.

Multiplexed (scanning) DAQ modules share one ADC across channels and sample them one after another, so channels are skewed in time by the scan interval, and switching residue from one channel can bleed into the next. Simultaneous-sampling modules give every channel its own ADC.

### Resolution: bits, LSB, SNR and ENOB

An $N$-bit ADC splits its full-scale range (FSR) into $2^N$ codes:`,
        },
        { kind: "equation", formula: "aw02-lsb" },
        {
          kind: "md",
          md: md`For a ±10 V range (FSR = 20 V): 16 bits gives 305 $\mu$V per code, 24 bits gives 1.19 $\mu$V. Quantisation alone limits the SNR of a full-scale sine to:`,
        },
        { kind: "equation", formula: "aw02-ideal-snr" },
        {
          kind: "md",
          md: md`That is 98.1 dB at 16 bits and 146.2 dB at 24 bits. No real 24-bit channel achieves 146 dB: thermal noise in the front end, reference noise and distortion dominate long before. Datasheets therefore quote **SINAD** (signal to noise and distortion) or SNR measured with a real input, and you convert it back to bits:`,
        },
        { kind: "equation", formula: "aw02-enob" },
        {
          kind: "md",
          md: md`A "24-bit" module with 110 dB SINAD has ENOB $= (110 - 1.76)/6.02 \approx 18.0$ bits. A 16-bit module with 92 dB SINAD has about 15.0. ENOB, not the marketing bit count, tells you the smallest change you can trust.

**Dynamic range** is the ratio between the largest signal the range accepts and the smallest detectable one (the noise floor), in dB. It matters when one channel must see both a small steady value and a large transient without changing range: for example, a battery current that idles at 0.5 A and pulses at 500 A needs 60 dB just to represent both, plus margin for resolution at the low end.

### Oversampling and averaging

If noise is white and uncorrelated, averaging OSR samples into one improves SNR by:`,
        },
        { kind: "equation", formula: "aw02-oversampling" },
        {
          kind: "md",
          md: md`Averaging 64 samples gains 18 dB, about 3 bits. That is why sampling fast and decimating is common, and why a 1 kS/s channel computed from a 64 kS/s stream can be cleaner than one sampled directly at 1 kS/s. It does nothing for interference that is correlated with the signal.

### Data rate: the number that drives every infrastructure decision`,
        },
        { kind: "equation", formula: "aw02-data-rate" },
        {
          kind: "md",
          md: md`Bytes per sample depends on how values are stored, not on the ADC: a 24-bit ADC value is usually stored as a 32-bit integer or 32-bit float (4 bytes); 16-bit values as 2 bytes; a value converted to 64-bit float doubles it again. Fixed-rate waveforms need no stored timestamp per sample (start time plus rate is enough), while irregular data (events, bus messages) need one per record, typically 8 bytes.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "A sample-rate plan and storage budget for a drive rig",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Choosing rates for an electric drive endurance rig",
          given: md`Illustrative drive unit rig (not customer data). The inverter switches at 10 kHz PWM. The test question is about efficiency, thermal behaviour and bearing wear over long runs, plus capturing fault transients. Channel groups: 6 phase voltages and currents, 8 vibration accelerometers (bearings, up to about 20 kHz of interest), 24 slow channels (temperatures, torque, speed, flow, pressure).`,
          steps: [
            { md: md`**Phase voltages and currents:** to resolve PWM ripple and the switching harmonics (10 kHz and its multiples, with useful content up to roughly 50 to 100 kHz), choose 200 kS/s per channel on simultaneous-sampling modules. A power analyser would be used in parallel for the official efficiency number. Store as 16-bit integers (2 bytes) with a scale factor.` },
            { md: md`**Vibration:** 20 kHz of interest, delta-sigma module with built-in anti-alias filtering, so $f_s = 51.2$ kS/s (2.56x, a common rate on dynamic signal modules). 24-bit values stored in 4 bytes.` },
            { md: md`**Slow channels:** thermal time constants are seconds to minutes, but the inputs pick up 50 Hz and PWM noise; sample at 1 kS/s with the module's filter on, and decimate later for analysis. 4 bytes each.` },
            { md: md`**Data rate:** $6\times 200{,}000\times 2 + 8\times 51{,}200\times 4 + 24\times 1{,}000\times 4 = 2{,}400{,}000 + 1{,}638{,}400 + 96{,}000 = 4{,}134{,}400$ B/s $\approx 4.13$ MB/s.` },
            { md: md`**Volume:** per hour $4.1344\times 3{,}600 = 14.9$ GB; per 8-hour shift 119 GB; a 12-hour overnight endurance run 179 GB. A rig running two shifts, five days a week, writes about $14.9\times 16\times 5 \approx 1.2$ TB per week before compression.` },
            { md: md`**Sanity check on choices:** the phase channels are 58 % of the bytes. If the test question did not need ripple (only RMS currents and losses), 20 kS/s would be enough and the total would drop to about 2.0 MB/s. Rate choices should follow the test question, and the question should be written down with the data.` },
          ],
          result: md`About 4.1 MB/s, 15 GB per hour, roughly 1.2 TB per rig-week uncompressed. These numbers set disk size at the rig, upload bandwidth to any central store, retention policy and the cost basis of any pilot.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Budget a battery module cycling lab",
          given: md`Illustrative battery lab: 4 cyclers, each logging 2 channels (voltage, current) at 10 kS/s and 16 cell temperatures at 10 S/s, all as 4-byte floats. Cycling runs 24 hours a day.`,
          steps: [
            { md: md`Per cycler: $2\times 10{,}000\times 4 + 16\times 10\times 4 = 80{,}000 + 640 = 80{,}640$ B/s.` },
            {
              md: md`Lab total: $4\times 80{,}640 = 322{,}560$ B/s. Per day: $322{,}560\times 86{,}400 = 27.9$ GB/day.`,
              hidden: true,
              check: { prompt: "Lab data per day (GB, decimal)", answer: 27.87, unit: "GB/day", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Per year (365 days): $27.87\times 365 \approx 10.2$ TB/year uncompressed.`,
              hidden: true,
              check: { prompt: "Lab data per year (TB)", answer: 10.17, unit: "TB", tolerance: { rel: 0.02 } },
            },
          ],
          result: md`About 28 GB per day and 10 TB per year: modest for storage, but large enough that "export everything to CSV and open it in Excel" fails immediately (Lesson 4).`,
        },
        {
          kind: "question",
          question: {
            id: "aw02-l02-p1",
            type: "numeric",
            prompt: md`A current channel on an inverter rig is sampled at 20 kS/s with no anti-alias filter. The inverter switches at 16 kHz. At what frequency (Hz) does the switching component appear in the recorded data?`,
            answer: 4000,
            unit: "Hz",
            tolerance: { abs: 1 },
            explanation: md`$k = \mathrm{round}(16{,}000/20{,}000) = 1$; $f_a = |16{,}000 - 20{,}000| = 4{,}000$ Hz. The data will show a 4 kHz oscillation that does not exist in the motor. Someone looking for a 4 kHz mechanical resonance could waste days on it.`,
            concepts: ["aw02.aliasing"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How sample rates are really chosen, and what goes wrong",
      blocks: [
        {
          kind: "md",
          md: md`### In practice

Rates are usually chosen by the test engineer when the rig is set up and then rarely revisited. Typical defaults you will hear: thermal channels 1 to 100 S/s; mechanical torque and speed 1 to 10 kS/s; vibration 25.6 or 51.2 kS/s (multiples used by dynamic signal modules); power electronics waveforms 100 kS/s to several MS/s, often on oscilloscopes or power analysers rather than the main DAQ; bus data (CAN, CAN FD, EtherCAT) arriving as messages at whatever rate the controllers send them.

Many teams log two streams from the same rig: a **continuous low-rate** stream for the whole test and **triggered high-rate** captures around events (a fault, a threshold crossing, a manual trigger with pre-trigger buffer). This keeps volume down but means the high-rate data exist only where somebody predicted something interesting would happen.`,
        },
        { kind: "sources", refs: ["aw02-r12"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Sampling mistakes that end up in bench data",
          md: md`- **Logging at a low rate with filters off:** the classic aliasing trap; a slow channel shows spurious oscillations from PWM or mechanical vibration.
- **Decimating by dropping samples:** taking every 10th sample from a 10 kS/s stream without low-pass filtering first is itself sampling at 1 kS/s with no anti-alias filter.
- **Mixing module types without recording filter delay:** a delta-sigma channel and a SAR channel can be offset by a millisecond or more for the same physical event.
- **Range set for the steady state:** fault currents clip at the ADC rails; the stored value is the rail, not the peak.
- **Bit count in the sales sheet, ENOB in reality:** a "24-bit" claim says nothing about noise; ask for SINAD or noise in the selected range and rate.`,
        },
        {
          kind: "checklist",
          title: "What a good capture plan states for each channel group",
          items: [
            "The test question the channel serves and the highest frequency of interest",
            "Sample rate, anti-alias filter type and cutoff, and ADC architecture (delta-sigma, SAR, multiplexed)",
            "Range and expected maximum, including fault or transient peaks",
            "Stored data type (int16, int32, float32) and scaling to physical units",
            "Continuous or triggered, with trigger condition and pre-trigger length",
            "Data rate and volume per hour, per test and per week",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask a prospect about their sampling",
          items: [
            "Which question is each channel group logged for, and who chose the rates?",
            "Are slow channels filtered in hardware before sampling, or only decimated in software?",
            "Do you capture high-rate data continuously or only on triggers, and have you ever missed an event because the trigger did not fire?",
            "How much data does one rig write per week, and where does it go after the test?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw02-l02-p2",
            type: "short",
            explanation: md`Rates follow frequency content and the test question; PWM must be either resolved or filtered in hardware; bus data are messages with their own timestamps. The arithmetic matters because it becomes the storage and bandwidth basis of the pilot.`,
            prompt: md`Write a one-page **sample-rate and storage plan** that you could send, after review by Ismail and Yusuf, to an illustrative humanoid actuator test team ahead of a pilot. The rig has: joint torque sensor, motor phase currents (PWM 20 kHz), motor encoder, 6 temperatures, a 6-axis IMU on the output link and EtherCAT controller data at 1 kHz. State rate, filter approach and stored type for each group, total data rate and volume per 8-hour day, and two questions you want them to answer before the pilot starts.`,
            rubric: [
              "Each channel group has a rate justified by its frequency content, not a single rate for everything",
              "Addresses the 20 kHz PWM explicitly: either sample well above it on simultaneous-sampling inputs, or filter in hardware and sample lower, with the trade-off stated",
              "Mentions anti-alias filtering in hardware (or delta-sigma) and warns against decimation without filtering",
              "Arithmetic for total rate and 8-hour volume is correct for the stated choices",
              "Bus or controller data treated as timestamped messages, not as a fixed-rate waveform",
              "Labels numbers as illustrative and ends with two specific, answerable questions",
            ],
            modelAnswer: md`Illustrative plan (to be reviewed by Ismail and Yusuf; not a customer commitment).

| Group | Channels | Rate | Filter | Stored type | Rate (B/s) |
|---|---|---|---|---|---|
| Phase currents | 3 | 200 kS/s | Simultaneous sampling, analog filter about 80 kHz | int16 + scale | 1,200,000 |
| Joint torque (bridge) | 1 | 10 kS/s | Delta-sigma, built-in | float32 | 40,000 |
| Encoder position | 1 | 10 kS/s | Counter input, latched on the sample clock | int32 | 40,000 |
| IMU (6 axes) | 6 | 1 kS/s | Sensor internal low-pass at about 400 Hz | float32 | 24,000 |
| Temperatures | 6 | 10 S/s | Module filter on (50 Hz rejection) | float32 | 240 |
| EtherCAT controller data | about 20 signals | 1 kHz messages | Not applicable | float32 + 8-byte timestamp per message | about 88,000 |

Total about 1.39 MB/s; per 8-hour day about 40 GB. If the team only needs RMS current and torque ripple below 2 kHz, phase currents at 20 kS/s with a hardware filter at 8 kHz cut the total to about 0.31 MB/s (9 GB per day).

Why: PWM at 20 kHz aliases into the band if currents are sampled at 20 to 40 kS/s without a filter; we either resolve it (200 kS/s) or remove it in hardware. Slow channels are filtered in hardware, never decimated by dropping samples. Controller data are messages with their own timestamps and are aligned on one clock with the DAQ (Lesson 3).

Questions for the team: (1) Do you need the PWM ripple itself in the data (for current control tuning) or only the fundamental and torque ripple? (2) Is the EtherCAT data timestamped by the master's distributed clock, and can we read that time base?`,
            concepts: ["aw02.nyquist", "aw02.aliasing", "aw02.data-rate"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor with no engineering background why logging more data is not the same as logging the right data, using aliasing as the example.",
          keyPoints: [
            "Sampling takes snapshots at a fixed rate",
            "Anything faster than half the rate appears as a fake slow signal",
            "The fake signal cannot be removed afterwards, so the decision is made at capture time",
            "Higher rates cost storage and bandwidth; the right rate follows the test question",
            "A capture layer that records rates and filters with the data lets later users know what the data can answer",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw02-l02-q1",
      type: "numeric",
      prompt: md`A channel is sampled at 1 kS/s without an anti-alias filter. A 2,600 Hz vibration is present. At what frequency (Hz) does it appear?`,
      answer: 400,
      unit: "Hz",
      tolerance: { abs: 1 },
      explanation: md`$k = \mathrm{round}(2.6) = 3$; $f_a = |2{,}600 - 3{,}000| = 400$ Hz.`,
      concepts: ["aw02.aliasing"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw02-l02-q2",
      type: "numeric",
      prompt: md`What is the LSB size (in $\mu$V) of a 16-bit ADC on a ±5 V range?`,
      answer: 152.6,
      unit: "µV",
      tolerance: { abs: 0.2 },
      explanation: md`FSR = 10 V. LSB $= 10/65{,}536 = 152.6\ \mu$V.`,
      concepts: ["aw02.adc-resolution"],
      difficulty: 1,
    },
    {
      id: "aw02-l02-q3",
      type: "numeric",
      prompt: md`A DAQ module datasheet gives SINAD = 104 dB at the selected range and rate. What is its ENOB (bits, one decimal)?`,
      answer: 17,
      unit: "bits",
      tolerance: { abs: 0.1 },
      explanation: md`$(104 - 1.76)/6.02 = 16.98 \approx 17.0$ bits, regardless of the "24-bit" label.`,
      concepts: ["aw02.enob"],
      difficulty: 2,
    },
    {
      id: "aw02-l02-q4",
      type: "mcq",
      prompt: "Why can aliasing not be fixed by filtering the data after it has been recorded?",
      options: [
        "Digital filters are too slow",
        "After sampling, an aliased component is mathematically identical to a real signal at the alias frequency",
        "Because ADCs add noise",
        "It can, with a high-order FIR filter",
      ],
      answer: 1,
      explanation: md`The samples of a 900 Hz sine at 1 kS/s are the same numbers as samples of a 100 Hz sine. Information about which one it was is gone.`,
      concepts: ["aw02.aliasing"],
      difficulty: 1,
    },
    {
      id: "aw02-l02-q5",
      type: "numeric",
      prompt: md`16 channels at 25.6 kS/s stored as 4-byte floats run for 10 hours. Volume in GB (decimal)?`,
      answer: 58.98,
      unit: "GB",
      tolerance: { rel: 0.01 },
      explanation: md`$16\times 25{,}600\times 4 = 1{,}638{,}400$ B/s; $\times 36{,}000$ s $= 58.98\times10^9$ B $\approx 59$ GB.`,
      concepts: ["aw02.data-rate"],
      difficulty: 1,
    },
    {
      id: "aw02-l02-q6",
      type: "multi",
      prompt: "Which are true of delta-sigma DAQ modules? (Select all that apply.)",
      options: [
        "They oversample internally and use a digital filter for alias rejection",
        "They introduce a group delay of the order of tens of output samples",
        "They are ideal for single-shot step capture with no ringing",
        "Their alias rejection tracks the selected output rate",
      ],
      answer: [0, 1, 3],
      explanation: md`Sharp digital filters ring on steps and delay the signal; SAR converters are preferred for transient fidelity and low latency.`,
      concepts: ["aw02.aliasing", "aw02.adc-resolution"],
      difficulty: 2,
    },
    {
      id: "aw02-l02-q7",
      type: "decision",
      prompt: md`A prospect wants to cut storage by decimating their 10 kS/s vibration data to 1 kS/s by keeping every tenth sample. What do you say?`,
      options: [
        { text: "Fine, storage drops 10x.", score: 0, feedback: "Dropping samples without low-pass filtering aliases everything between 500 Hz and 5 kHz into the new band." },
        { text: "Low-pass filter below 500 Hz first (proper decimation), and only if nobody needs content above 400 to 500 Hz; keep the raw data for a defined retention period.", score: 1, feedback: "Correct: decimation needs an anti-alias filter, and the decision should follow the analysis needs." },
        { text: "Never reduce data; storage is cheap.", score: 0.3, feedback: "Retention decisions are legitimate; the issue is how the reduction is done." },
      ],
      explanation: md`Decimation = filter, then downsample. Record in the metadata that the stored stream is decimated and with which filter.`,
      concepts: ["aw02.aliasing", "aw02.data-rate"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw02-l02-f1", front: "Nyquist criterion", back: md`$f_s > 2 f_{max}$, where $f_{max}$ is the highest frequency present at the ADC input`, concepts: ["aw02.nyquist"] },
    { id: "aw02-l02-f2", front: "Alias frequency", back: md`$f_a = |f - k f_s|$, $k$ the nearest integer to $f/f_s$`, concepts: ["aw02.aliasing"] },
    { id: "aw02-l02-f3", front: "Ideal SNR of an N-bit ADC", back: md`$6.02N + 1.76$ dB (16 bits: 98 dB; 24 bits: 146 dB)`, concepts: ["aw02.adc-resolution"] },
    { id: "aw02-l02-f4", front: "ENOB formula", back: md`$(\mathrm{SINAD} - 1.76)/6.02$`, concepts: ["aw02.enob"] },
    { id: "aw02-l02-f5", front: "LSB of 24 bits on ±10 V", back: md`1.19 $\mu$V (16 bits: 305 $\mu$V)`, concepts: ["aw02.adc-resolution"] },
    { id: "aw02-l02-f6", front: "Averaging 64 samples gains", back: "About 18 dB, roughly 3 bits (white noise only)", concepts: ["aw02.adc-resolution"] },
    { id: "aw02-l02-f7", front: "Illustrative drive rig data rate", back: "About 4.1 MB/s, 15 GB/hour, about 1.2 TB per two-shift rig-week", concepts: ["aw02.data-rate"] },
  ],
};

export default lesson;
