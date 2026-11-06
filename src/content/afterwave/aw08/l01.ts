import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw08-l01",
  title: "Time-series fundamentals for test data: resampling, windowing, features and spectra",
  summary:
    "Bench data is time series: current, torque, vibration, temperature and app events on one clock. Before any model touches it, someone decides sample rates, how to resample without aliasing, how to cut it into windows, which features to compute and how to read a spectrum. This lesson builds FFT intuition from a four-sample example up to a gear-mesh spectrum of a drive unit, and turns it into a feature specification.",
  minutes: 80,
  objectives: [
    "Explain aliasing and why it must be prevented before sampling, and resample a channel correctly (filter, then decimate)",
    "Compute a DFT bin by hand, the frequency resolution of a record and the amplitude of a tone from the spectrum",
    "Choose window length, overlap and a window function for a bench signal, and explain spectral leakage",
    "Specify time-domain and frequency-domain features (RMS, crest factor, kurtosis, band energy, orders) and the data volume they save",
    "Read a drive-unit vibration spectrum: shaft orders, gear mesh and sidebands",
  ],
  concepts: [
    {
      id: "aw08.sampling-aliasing",
      name: "Sampling and aliasing",
      description:
        "A sampled channel can only represent content below half its sampling rate; content above it folds back as false low-frequency signal unless an analog anti-alias filter removes it before the converter.",
      competency: "aw-ml",
    },
    {
      id: "aw08.resampling",
      name: "Resampling and alignment",
      description:
        "Changing a channel's rate (decimation with a low-pass filter first, or interpolation) and putting channels with different rates and clocks onto one time base so that features and labels line up.",
      competency: "aw-ml",
      related: ["aw08.sampling-aliasing"],
    },
    {
      id: "aw08.windowing-features",
      name: "Windows and features",
      description:
        "Cutting a long record into fixed-length, often overlapping windows and summarising each with features (RMS, peak, crest factor, kurtosis, band energies, order amplitudes) that models consume instead of raw samples.",
      competency: "aw-ml",
      related: ["m14.scada-anomaly"],
    },
    {
      id: "aw08.fft-resolution",
      name: "DFT, FFT and frequency resolution",
      description:
        "The DFT expresses a record as sinusoids at bins spaced fs/N apart; resolution depends only on record duration; the FFT is a fast algorithm for the same transform.",
      competency: "aw-ml",
    },
    {
      id: "aw08.spectral-leakage",
      name: "Spectral leakage and window functions",
      description:
        "A tone that does not complete a whole number of cycles in the record spreads energy into neighbouring bins; tapering windows (Hann, flat-top) trade resolution for lower leakage and better amplitude accuracy.",
      competency: "aw-ml",
      related: ["aw08.fft-resolution"],
    },
    {
      id: "aw08.order-analysis",
      name: "Order analysis",
      description:
        "Expressing rotating-machine frequencies as multiples of shaft speed (orders), so gear mesh, imbalance and bearing signatures stay at fixed positions when speed changes.",
      competency: "aw-ml",
      related: ["aw08.fft-resolution"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "From samples to features: what the model will actually see",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every claim Afterwave makes about models and agents in Enclave rests on the layer Lockstep captures. If a channel was aliased, resampled without a filter or misaligned with the app log, no model can recover the truth, and a test engineer like Ismail or Yusuf will spot it in the first demo. You do not need to write the signal code, but you must be able to ask which sample rate, which window and which features, and to tell a buyer why a spectrum with a peak in the wrong place is a data problem, not an AI problem.`,
        },
        {
          kind: "md",
          md: md`### 1. Sampling: the decision that cannot be undone

A DAQ channel samples a continuous signal at $f_s$ samples per second. The sampled record can only represent frequencies up to the **Nyquist frequency** $f_N = f_s/2$:`,
        },
        { kind: "equation", formula: "aw08-nyquist" },
        {
          kind: "md",
          md: md`Content above $f_N$ does not disappear: it **aliases**, folding to $|f - k f_s|$. A 9 kHz inverter switching component sampled at 10 kHz shows up as a perfectly believable 1 kHz line. Once sampled, aliased and real 1 kHz content are mathematically identical. The only fix is an **analog anti-alias filter** before the converter; modern sigma-delta DAQ cards (typical for vibration and acoustics) include one and give a flat usable band up to roughly $0.45 f_s$. Simple multiplexed SAR cards often do not, which is how aliased current and torque signals end up in test archives.

Typical bench rates, as orders of magnitude: temperatures 1 to 10 Hz; torque, speed and DC bus voltage 1 to 10 kHz; phase currents for control analysis 20 to 200 kHz; vibration 10 to 50 kHz; app and controller events are irregular timestamps, not a rate at all.

### 2. Resampling and one time base

Models want aligned rows. Bench data arrives as channel groups at different rates, on different clocks (DAQ hardware clock, PC clock for the app log, controller clock on CAN). Two operations:

- **Decimation** (lower the rate by a factor $M$): low-pass filter below the new Nyquist $f_s/(2M)$, then keep every $M$-th sample. Skipping the filter aliases everything between the new and old Nyquist into the result. Large factors are done in stages (100 as 10 then 10).
- **Interpolation and alignment**: map each stream's timestamps onto the reference clock (fit offset and drift from shared sync events, as in the widget below), then interpolate slow channels or attach events to the nearest window. Never interpolate across gaps silently; mark them.

Lockstep's premise, rig signals and on-screen actions on one clock, is exactly this step done at capture time instead of by hand afterwards.`,
        },
        {
          kind: "widget",
          widget: "bench-sync",
          caption: "Two streams on two clocks: offset and drift make app events land on the wrong part of the signal. Fitting offset and drift from sync pulses is the alignment step every feature pipeline depends on.",
        },
        { kind: "xref", to: "aw02-l02", note: "Module aw02 covers sampling, aliasing, ADC resolution and DAQ hardware in depth; this lesson only uses what models need." },
        { kind: "xref", to: "aw02-l03", note: "Clock offset, drift and synchronisation methods are treated fully in aw02." },
        {
          kind: "md",
          md: md`### 3. The DFT, built from four samples

The discrete Fourier transform asks, for each bin $k$: how strongly does the record correlate with a sinusoid that completes exactly $k$ cycles in it?`,
        },
        { kind: "equation", formula: "aw08-dft" },
        {
          kind: "md",
          md: md`**Hand example.** Take $N = 4$ samples of a cosine at a quarter of the sampling rate: $x = [1, 0, -1, 0]$. The complex exponential for bin $k$ is $e^{-j\pi k n/2}$, which for $n = 0..3$ cycles through $1, -j, -1, j$ (for $k=1$).

- $X[0] = 1 + 0 - 1 + 0 = 0$: no DC (mean is zero).
- $X[1] = 1\cdot 1 + 0\cdot(-j) + (-1)\cdot(-1) + 0 \cdot j = 2$.
- $X[2]$ uses $1, -1, 1, -1$: $1 + 0 + (-1)(1) + 0 = 0$.
- $X[3] = 2$ (mirror of bin 1 for a real signal).

Bin 1 is $f_1 = 1 \cdot f_s/4$, the right frequency, and the amplitude is $2|X[1]|/N = 2 \cdot 2/4 = 1$, the right amplitude:`,
        },
        { kind: "equation", formula: "aw08-tone-amplitude" },
        {
          kind: "md",
          md: md`That is all an FFT does, for $N = 4{,}096$ or $65{,}536$ samples, in $O(N\log N)$ operations. Two consequences follow directly:

- **Bins are spaced $f_s/N$ apart**, so resolution is set by how long you recorded:`,
        },
        { kind: "equation", formula: "aw08-freq-resolution" },
        {
          kind: "md",
          md: md`- **Leakage.** If a tone does not complete a whole number of cycles in the record, it falls between bins and its energy smears across neighbours. The record's hard edges act like multiplying by a rectangle. **Window functions** taper the edges. Values from Harris (1978): rectangular, highest sidelobe $-13$ dB and up to 3.9 dB amplitude error between bins (scalloping); **Hann**, $-31.5$ dB sidelobes and 1.4 dB worst-case error, coherent gain 0.5; **flat-top**, amplitude error around 0.01 dB but a very wide peak. Use Hann for general spectra and flat-top when you need the amplitude of a known tone (calibration checks). Overlap windows by 50 % (Hann) so the tapered edges do not lose events.

### 4. Orders: why rotating machines need their own axis

Drive units, gearboxes, actuators and motors produce lines locked to shaft speed $n$:`,
        },
        { kind: "equation", formula: "aw08-shaft-order" },
        {
          kind: "md",
          md: md`Imbalance at order 1, misalignment at orders 1 and 2, gear mesh at the tooth count, electrical lines at multiples of pole pairs times speed. During a speed sweep the lines move in hertz but stay put in orders. **Order tracking** resamples the signal at constant shaft angle (using an encoder or tacho), so a run-up looks like a steady-speed test in the order domain. Gear mesh with **sidebands** at mesh $\pm$ 1x indicates modulation by shaft speed, a classic sign of eccentricity or a damaged tooth.

### 5. Features: what you hand to the model

Raw samples are too many and too noisy for most models. Each window becomes a feature vector:

| Feature | Definition | What it catches | Healthy reference |
|---|---|---|---|
| RMS | $\sqrt{\frac{1}{N}\sum x^2}$ | Overall level: imbalance, load, current draw | Sine: $A/\sqrt{2}$ |
| Peak, peak-to-peak | max, max minus min | Transients, overshoot | Spec limits |
| Crest factor | $\max|x|/x_{rms}$ | Impulses before RMS rises | Sine 1.41, noise 3 to 4 |
| Kurtosis | 4th moment / variance squared | Impulsiveness (bearing spall, cracked tooth) | Gaussian 3, sine 1.5 |
| Band energy | Sum of power in a frequency band | Gear mesh, switching, resonances | Baseline per band |
| Order amplitudes | Amplitude at orders 1, 2, mesh, sidebands | Mechanical faults at varying speed | Baseline per order |
| Slopes and deltas | Change per window, rise time | Thermal runaway, drift, settling | Trend of healthy runs |
| Event context | Which app step, setpoint, mode | Turns a value into a conditional one | From Lockstep's app log |

The last row is where Afterwave's capture differs from a generic logger: "current RMS 41 A" means nothing; "current RMS 41 A during the 80 % torque step after firmware 3.2 was flashed" is a feature a model and an engineer can both use.`,
        },
        { kind: "equation", formula: "aw08-rms" },
        { kind: "equation", formula: "aw08-crest-factor" },
        { kind: "equation", formula: "aw08-kurtosis" },
        {
          kind: "chart",
          chart: "bar",
          title: "Illustrative drive-unit vibration spectrum at 1,800 rpm: healthy vs worn pinion",
          xKey: "line",
          xLabel: "Spectral line (Hz, order)",
          yLabel: "Amplitude (g, peak)",
          series: [
            { key: "healthy", label: "Healthy unit" },
            { key: "worn", label: "Worn pinion" },
          ],
          data: [
            { line: "30 Hz (1x)", healthy: 0.12, worn: 0.14 },
            { line: "60 Hz (2x)", healthy: 0.05, worn: 0.06 },
            { line: "660 Hz (mesh - 1x)", healthy: 0.02, worn: 0.11 },
            { line: "690 Hz (mesh, 23x)", healthy: 0.35, worn: 0.42 },
            { line: "720 Hz (mesh + 1x)", healthy: 0.02, worn: 0.12 },
            { line: "1380 Hz (2x mesh)", healthy: 0.06, worn: 0.15 },
          ],
          caption: "Illustrative values, not measured data. A 23-tooth pinion on a 30 Hz shaft meshes at 690 Hz. The mesh line itself rises modestly; the sidebands at mesh plus and minus 1x grow five- to six-fold. A feature set with only overall RMS would barely move; band or order features around the mesh would.",
        },
        {
          kind: "equation",
          formula: "aw08-data-volume",
        },
      ],
    },
    {
      layer: "applied",
      title: "Spectrum and feature budget for a drive-unit endurance test",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Reading the gear mesh and sizing the data",
          given: md`Illustrative. A drive unit runs an 8 h endurance block on a dyno at a steady 1,800 rpm. Pinion: 23 teeth. One accelerometer on the housing sampled at $f_s = 10{,}240$ Hz; FFT records of $N = 4{,}096$ samples. The full capture is 8 channels at 100 kS/s, 16-bit (phase currents, DC bus, torque, vibration). The team wants features per 1 s window with 50 % overlap, 10 features per channel, stored as 4-byte floats.`,
          steps: [
            { md: md`**Shaft frequency:** $f_1 = 1{,}800/60 = 30$ Hz. **Gear mesh:** $f_m = 23 \times 30 = 690$ Hz. Sidebands at $690 \pm 30 = 660$ and $720$ Hz.` },
            { md: md`**Resolution and record length:** $\Delta f = 10{,}240/4{,}096 = 2.5$ Hz; $T = 4{,}096/10{,}240 = 0.4$ s. Nyquist $= 5{,}120$ Hz, usable to about $0.45 f_s \approx 4{,}600$ Hz, so the second mesh harmonic (1,380 Hz) and the third (2,070 Hz) are in band.` },
            { md: md`**Bins:** shaft at bin $30/2.5 = 12$, mesh at bin $690/2.5 = 276$, sidebands at bins 264 and 288. Each line sits exactly on a bin, so a rectangular window would give exact amplitudes here; in practice speed wanders, so use Hann and accept the wider peaks.` },
            { md: md`**Raw volume:** $V = 8 \times 100{,}000 \times 2 \times 28{,}800 = 4.61 \times 10^{10}$ bytes, about **46 GB** per 8 h block.` },
            { md: md`**Feature volume:** windows $= 28{,}800/0.5 = 57{,}600$ (hop of 0.5 s); values $= 57{,}600 \times 8 \times 10 = 4.61$ million; bytes $= 4.61 \times 10^6 \times 4 = 18.4$ MB. Compression factor about **2,500**.` },
          ],
          result: md`The spectrum tells you where to put band features (mesh and sidebands, not just overall RMS), and the volume numbers tell you the storage plan: keep raw data for the windows a model or engineer flags, keep features for everything. Both choices belong in the test's feature specification, not in someone's notebook.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Resolution and speed variation",
          given: md`Same accelerometer at $f_s = 10{,}240$ Hz. The team now wants to separate two lines 0.5 Hz apart near the shaft frequency, and asks whether the 690 Hz mesh line will stay sharp if shaft speed wanders by 1 % during the record.`,
          steps: [
            { md: md`Required resolution $\Delta f \le 0.5$ Hz, so $N \ge f_s/\Delta f$.` },
            {
              md: md`$N \ge 10{,}240/0.5 =$ **20,480 samples**, a record of $T = 2$ s (or $2^{15} = 32{,}768$ samples if the tool insists on powers of two, giving 0.3125 Hz).`,
              hidden: true,
              check: { prompt: "Minimum record length N (samples)", answer: 20480, unit: "samples", tolerance: { abs: 1 } },
            },
            { md: md`A 1 % speed change moves each line by 1 % of its frequency. At the shaft (30 Hz) that is 0.3 Hz. At the mesh (690 Hz) it is:` },
            {
              md: md`$0.01 \times 690 =$ **6.9 Hz**, almost 14 bins of 0.5 Hz. The mesh line smears into a hump, its amplitude drops, and sidebands 30 Hz away start to merge with it.`,
              hidden: true,
              check: { prompt: "Smear of the mesh line (Hz)", answer: 6.9, unit: "Hz", tolerance: { abs: 0.05 } },
            },
            { md: md`**Fix:** order tracking. Resample against the encoder so each record holds a fixed number of revolutions; the mesh then sits at order 23 regardless of speed.` },
          ],
          result: md`Longer records buy resolution only while the machine is steady. On rotating equipment with any speed variation, high orders smear first, so features for gear and bearing faults should be computed in the order domain.`,
        },
        {
          kind: "question",
          question: {
            id: "aw08-l01-p1",
            type: "numeric",
            prompt: md`A motor on a test rig runs at 3,000 rpm. You want the mechanical 2x line (misalignment). The vibration channel is sampled at 2,048 Hz and analysed in records of 1,024 samples. At which bin index does the 2x line fall?`,
            answer: 50,
            tolerance: { abs: 0 },
            unit: "bin",
            explanation: md`$f_1 = 3{,}000/60 = 50$ Hz, so 2x is 100 Hz. $\Delta f = 2{,}048/1{,}024 = 2$ Hz. Bin $= 100/2 = 50$. It falls exactly on a bin, so leakage is minimal while speed is steady.`,
            concepts: ["aw08.fft-resolution", "aw08.order-analysis"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How bench data is prepared in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who does it and with what

Signal preparation sits with the test or validation engineer, sometimes a dedicated data engineer in larger labs. Typical tools: NI FlexLogger, DIAdem and LabVIEW; MATLAB with the Signal Processing Toolbox; Python with numpy, scipy.signal and pandas or polars; HEAD acoustics or Siemens Simcenter Testlab for NVH and order analysis. Files arrive as TDMS, MDF4, CSV or vendor binaries, increasingly converted to Parquet for analysis. The weak point is rarely the FFT; it is the undocumented choices around it.

### The feature specification

For each test type that will feed models, write down, version and store with the data:

| Field | Example (drive-unit endurance) |
|---|---|
| Channels, units, sensor and calibration id | Accel Z housing, g, sensor serial, cal date |
| Sample rate and anti-alias filter | 10,240 Hz, card filter to 4.6 kHz |
| Time base and sync method | DAQ clock is reference; app log aligned via sync pulse every 10 s |
| Resampling steps | Decimate currents 100 kHz to 10 kHz in two stages of factor 10 for trend features |
| Window | 1 s, Hann, 50 % overlap; order-tracked records of 64 revolutions for gear features |
| Features | RMS, crest factor, kurtosis, band energy 600 to 780 Hz, orders 1, 2, 22, 23, 24, 46 |
| Context columns | Test step, setpoint, firmware hash, rig id, unit serial |
| Retention | Features forever; raw data for flagged windows and a random 5 % sample |

The context columns matter as much as the signal ones. Ripple and any model trained later need to know which firmware, rig and unit each window came from.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Aliasing at capture.** A current channel on a multiplexed card without anti-alias filtering shows "harmonics" that are folded switching noise. Ask which card and which filter.
- **Decimating with slicing.** Taking every 100th sample in pandas instead of filtering first. The trend looks fine; the spectrum is garbage.
- **Wrong amplitude scaling.** Missing the factor 2 for single-sided spectra or the window's coherent gain; amplitudes off by 2x or 4x between tools.
- **Clock confusion.** App log in local time, DAQ in UTC, controller in milliseconds since boot. Features land on the wrong test step; labels shift by seconds.
- **Spectra of non-stationary segments.** An FFT across a speed ramp or a mode change averages two regimes; window by test step.
- **No context columns.** Features without firmware, rig and unit ids cannot be used for change impact or for a fair train/test split (Lesson 3).`,
        },
        {
          kind: "ask",
          title: "Questions to ask a prospect's test team (and your own engineers)",
          items: [
            "Which DAQ hardware and anti-alias filtering does each channel group use, and at what rates?",
            "Which clock is the reference, and how are the app, controller and DAQ timestamps aligned today?",
            "For rotating tests, is there an encoder or tacho channel we can order-track against?",
            "Which features do your engineers already compute by hand, and where are those scripts?",
            "Which context (firmware build, rig configuration, unit serial) is recorded automatically, and which lives in someone's notes?",
          ],
        },
        {
          kind: "xref",
          to: "m14-l04",
          note: "Track 0 covers using an LLM to analyse tabular performance data with code rather than in-chat arithmetic; the same rule applies to every number in this lesson.",
        },
        {
          kind: "question",
          question: {
            id: "aw08-l01-p2",
            type: "short",
            prompt: md`**Produce it.** Write the feature specification (the table format above) for one test type an Afterwave target customer runs, for example a humanoid joint actuator back-drive and torque-ripple test, a battery module charge-discharge cycle, or an inverter switching test. Give channels with rates and why, the time base and sync method, window and overlap, at least six features each tied to a failure mode, context columns, the data volume per test hour (raw versus features, with the formula) and a retention rule. Use illustrative numbers and say so.`,
            rubric: [
              "Sample rates respect Nyquist with margin for the frequencies of interest, and anti-alias filtering is addressed",
              "Time base and alignment method are stated (reference clock, sync events), including the app or controller events",
              "Window length, overlap and window function are chosen with a reason (resolution, stationarity per test step)",
              "At least six features, each linked to a physical failure mode or behaviour of that test type",
              "Context columns include firmware or software version, rig id and unit serial",
              "Data volume computed with V = C fs b T for raw and for features, numbers labelled illustrative and arithmetic correct",
            ],
            modelAnswer: md`**Test:** humanoid knee actuator (motor, harmonic drive, joint encoder) torque-ripple and back-drive test. Illustrative numbers.

| Field | Choice and reason |
|---|---|
| Channels | Phase currents A, B, C at 40 kS/s (PWM 20 kHz ripple is not needed; current control band up to about 2 kHz, so 40 kS/s with card filter gives margin and captures commutation transients); joint torque sensor at 10 kS/s (harmonic drive ripple at 2x wave generator speed lies below 500 Hz at test speeds); motor and joint encoders at 10 kS/s; housing accelerometer at 25.6 kS/s; winding temperature at 10 Hz |
| Anti-alias | Sigma-delta cards with built-in filters for currents, torque and vibration; confirm cut-off about 0.45 fs |
| Time base | DAQ clock is reference; test app and motor controller log a sync edge on a digital line every 5 s; offset and drift fitted per run |
| Windows | Per test step (constant-speed segments only); 0.5 s Hann, 50 % overlap for spectra; order-tracked records of 32 output revolutions |
| Features | (1) torque ripple peak-to-peak and order 2 amplitude: wave generator and flexspline wear; (2) phase current RMS per step: friction and load; (3) current unbalance between phases: winding or connector fault; (4) back-drive torque at zero current: friction and preload; (5) housing kurtosis and crest factor: bearing damage; (6) encoder difference motor vs joint divided by ratio: transmission compliance and lost motion; (7) winding temperature slope per step: cooling or overload |
| Context | Firmware hash, controller parameter set id, rig id, torque sensor calibration id, actuator serial, test step id, operator action from the app log |
| Volume per hour | Raw: (3 × 40,000 + 3 × 10,000 + 25,600) × 2 B × 3,600 s = 175,600 × 7,200 = 1.26 GB/h. Features: 14,400 windows/h (0.25 s hop) × about 40 values × 4 B = 2.3 MB/h |
| Retention | Features for every run permanently; raw for flagged windows, the first and last hour of each endurance block, and a random 5 % |`,
            explanation: md`The grader checks that each choice is justified by physics (rates, windows, failure modes), that context makes the data usable for change impact, and that the volume arithmetic is right.`,
            concepts: ["aw08.sampling-aliasing", "aw08.windowing-features", "aw08.resampling"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "A prospect's head of validation asks: 'Why can't your AI just learn from our raw data? Why do you care about sample rates and windows?' Explain in plain words.",
          keyPoints: [
            "If a signal was aliased or misaligned at capture, the information is gone or wrong; no model can recover it",
            "Resolution and leakage decide whether a fault frequency is visible at all",
            "Features with test-step and firmware context make models smaller, faster to train and explainable to engineers",
            "Raw data is kept for flagged windows; features cover everything at a fraction of the volume",
          ],
        },
        { kind: "sources", refs: ["aw08-r1", "aw08-r2", "aw08-r3", "aw08-r4"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw08-l01-q1",
      type: "mcq",
      prompt: "A current channel is sampled at 10 kHz with no anti-alias filter. The inverter produces a strong component at 9 kHz. What appears in the recorded data?",
      options: [
        "Nothing: 9 kHz is above Nyquist and is discarded",
        "A false 1 kHz component that cannot be told apart from real 1 kHz content",
        "A 9 kHz component with reduced amplitude",
        "A 4.5 kHz component",
      ],
      answer: 1,
      explanation: md`Content above $f_N = 5$ kHz folds to $|9 - 10| = 1$ kHz. After sampling it is identical to real 1 kHz content, which is why filtering must happen before the converter.`,
      concepts: ["aw08.sampling-aliasing"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw08-l01-q2",
      type: "numeric",
      prompt: md`A vibration channel is sampled at 25,600 Hz and analysed in records of 8,192 samples. What is the frequency resolution in Hz?`,
      answer: 3.125,
      tolerance: { abs: 0.001 },
      unit: "Hz",
      explanation: md`$\Delta f = 25{,}600/8{,}192 = 3.125$ Hz, equivalently $1/T$ with $T = 0.32$ s.`,
      concepts: ["aw08.fft-resolution"],
      difficulty: 1,
    },
    {
      id: "aw08-l01-q3",
      type: "numeric",
      prompt: md`A gearbox input shaft turns at 1,500 rpm and drives a 31-tooth gear. What is the gear-mesh frequency in Hz?`,
      answer: 775,
      tolerance: { abs: 0.5 },
      unit: "Hz",
      explanation: md`$f = O \cdot n/60 = 31 \times 25 = 775$ Hz.`,
      concepts: ["aw08.order-analysis"],
      difficulty: 1,
    },
    {
      id: "aw08-l01-q4",
      type: "mcq",
      prompt: "You need to reduce a 100 kS/s current channel to 1 kS/s for trend features. What is the correct procedure?",
      options: [
        "Keep every 100th sample",
        "Average every 100 samples into one, which is always sufficient",
        "Low-pass filter below 500 Hz, then keep every 100th sample, preferably in two stages of 10",
        "Run an FFT and keep the first 1,000 bins",
      ],
      answer: 2,
      explanation: md`Decimation is filter then downsample. Plain slicing aliases everything between 500 Hz and 50 kHz into the result. Block averaging is a weak low-pass filter with poor stopband; acceptable for some slow trends, not as a general rule.`,
      concepts: ["aw08.resampling", "aw08.sampling-aliasing"],
      difficulty: 2,
    },
    {
      id: "aw08-l01-q5",
      type: "multi",
      prompt: "Which statements about windows and leakage are correct? (Select all that apply.)",
      options: [
        "Leakage happens when a tone does not complete a whole number of cycles in the record",
        "A Hann window lowers sidelobes compared with a rectangular window, at the cost of a wider peak",
        "Zero-padding the record improves true frequency resolution",
        "A flat-top window gives accurate amplitudes for tones between bins",
        "Hann windows are usually overlapped by about 50 % in averaged spectra",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Zero-padding interpolates the plotted spectrum but adds no information; resolution is $1/T$ of the real record.`,
      concepts: ["aw08.spectral-leakage"],
      difficulty: 2,
    },
    {
      id: "aw08-l01-q6",
      type: "mcq",
      prompt: "A worn pinion mostly raises the sidebands around gear mesh while overall vibration RMS barely changes. Which feature choice catches it earliest?",
      options: [
        "Overall RMS of the whole band",
        "Band energy or order amplitudes around mesh and its sidebands",
        "Mean of the signal",
        "Winding temperature",
      ],
      answer: 1,
      explanation: md`Faults redistribute energy into specific lines. Features localised to those lines move long before broadband RMS does.`,
      concepts: ["aw08.windowing-features", "aw08.order-analysis"],
      difficulty: 2,
    },
    {
      id: "aw08-l01-q7",
      type: "order",
      prompt: "Order the steps of a sound feature pipeline for a bench signal.",
      items: [
        "Anti-alias filter and sample at an adequate rate",
        "Align streams on one time base",
        "Segment by test step and cut into windows",
        "Apply a window function and compute spectra",
        "Compute features and attach context columns",
      ],
      explanation: md`Capture decisions first (they cannot be undone), then alignment, then segmentation, then transforms, then features with context.`,
      concepts: ["aw08.resampling", "aw08.windowing-features"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw08-l01-f1", front: "Nyquist frequency", back: md`$f_N = f_s/2$. Content above it aliases to $|f - kf_s|$ unless filtered before sampling.`, concepts: ["aw08.sampling-aliasing"] },
    { id: "aw08-l01-f2", front: "Frequency resolution of an FFT", back: md`$\Delta f = f_s/N = 1/T$: set by record duration only.`, concepts: ["aw08.fft-resolution"] },
    { id: "aw08-l01-f3", front: "Tone amplitude from a single-sided spectrum", back: md`$A = 2|X[k]|/N$ (divide also by window coherent gain, 0.5 for Hann).`, concepts: ["aw08.fft-resolution"] },
    { id: "aw08-l01-f4", front: "Correct decimation", back: "Low-pass filter below the new Nyquist, then keep every M-th sample; large factors in stages.", concepts: ["aw08.resampling"] },
    { id: "aw08-l01-f5", front: "Kurtosis reference values", back: "Gaussian noise 3, sine 1.5; impulsive faults well above 3.", concepts: ["aw08.windowing-features"] },
    { id: "aw08-l01-f6", front: "Gear mesh frequency", back: md`Tooth count × shaft frequency: $f = O\,n/60$. Sidebands at mesh $\pm$ 1x signal modulation (eccentricity, damaged tooth).`, concepts: ["aw08.order-analysis"] },
    { id: "aw08-l01-f7", front: "Why order tracking", back: "Lines move in Hz with speed but stay fixed in orders; resampling at constant shaft angle keeps high orders sharp.", concepts: ["aw08.order-analysis"] },
  ],
};

export default lesson;
