import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw02-l01",
  title: "Sensors and signal chains",
  summary:
    "From a physical quantity to a number in a file: transducers, excitation and conditioning, Wheatstone bridges for strain gauges and load cells, thermocouples and RTDs, shunt, Hall and Rogowski current sensing, and the noise, grounding and shielding rules that decide whether the number can be trusted.",
  minutes: 75,
  objectives: [
    "Draw the signal chain of a bench channel from transducer to stored sample and name what each stage can get wrong",
    "Compute bridge and load cell output in mV from excitation, gauge factor or mV/V rating, and pick an amplifier gain",
    "Choose between thermocouple and RTD, and quantify the lead-resistance error of a 2-wire RTD",
    "Compare shunt, Hall-effect and Rogowski current sensing for a drive or inverter test",
    "Explain ground loops, common-mode voltage and shielding, and estimate noise from a noise density and bandwidth",
  ],
  concepts: [
    { id: "aw02.signal-chain", name: "Measurement signal chain", description: "Transducer, excitation, conditioning (amplification, isolation, filtering), ADC, timestamping and storage: every stage adds gain, offset, noise, delay or distortion to the measured value.", competency: "aw-data", related: ["aw02.adc-resolution", "aw02.calibration-metadata"] },
    { id: "aw02.bridge-circuit", name: "Wheatstone bridge, strain gauges and load cells", description: "Four-arm resistive bridge that turns a tiny resistance change into a differential voltage proportional to excitation; quarter, half and full bridges; load cells rated in mV/V.", competency: "aw-data", related: ["aw02.signal-chain"] },
    { id: "aw02.temperature-sensors", name: "Thermocouples and RTDs", description: "Thermocouples produce a Seebeck voltage proportional to the temperature difference to a reference junction and need cold-junction compensation; RTDs change resistance with temperature and need excitation current and lead-wire compensation.", competency: "aw-data", related: ["aw02.signal-chain"] },
    { id: "aw02.current-sensing", name: "Current sensing", description: "Shunt resistors (V = IR, DC to high bandwidth, not isolated), Hall-effect and fluxgate transducers (isolated, DC capable), Rogowski coils (isolated, AC only, wide range).", competency: "aw-data", related: ["aw02.signal-chain", "aw02.noise-grounding"] },
    { id: "aw02.noise-grounding", name: "Noise, grounding and shielding", description: "Thermal and amplifier noise grow with the square root of bandwidth; ground loops and common-mode voltage corrupt single-ended measurements; differential inputs, isolation, twisted pairs and single-point shield grounding control them.", competency: "aw-data", related: ["aw02.signal-chain"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From physics to volts: the chain behind every channel",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Lockstep records rig signals through data acquisition. Every buyer you meet (a drive test lead, a battery lab manager, a humanoid actuator team) will judge Afterwave first on whether you understand what their channels are: a load cell on a 2 mV/V bridge, a type K thermocouple on a stator winding, a Hall sensor on a phase cable. You will not wire the rig, but you must hear "we have 48 channels, half are bridge inputs" and know what it implies for rates, noise, metadata and what can go wrong. Ismail and Yusuf live in this world; this lesson lets you keep up with them and challenge a spec.`,
        },
        {
          kind: "md",
          md: md`### The signal chain

A channel in a bench file is the end of a chain. Each stage transforms the signal and each can inject error:

| Stage | What it does | Typical error it adds |
|---|---|---|
| **Transducer** | Converts a physical quantity (force, temperature, current, acceleration) into an electrical one (resistance change, voltage, charge, current) | Nonlinearity, hysteresis, temperature sensitivity, drift |
| **Excitation** | Supplies the voltage or current some sensors need (bridges, RTDs, IEPE accelerometers) | Excitation error scales the reading directly unless measured (remote sense) |
| **Conditioning** | Amplifies, isolates, filters, linearises, compensates (cold junction) | Gain and offset error, amplifier noise, common-mode leakage |
| **Anti-alias filter and ADC** | Band-limits, then samples and quantises (Lesson 2) | Aliasing, quantisation, ADC noise, phase delay |
| **Timestamp** | Assigns a time to each sample (Lesson 3) | Clock offset, drift, jitter |
| **Storage** | Writes raw values plus scaling and metadata (Lessons 4 and 6) | Lost precision, wrong units, missing calibration |

A useful habit: for any channel, ask for the **range**, **bandwidth** and **accuracy** it needs, then walk the chain stage by stage asking where each could fail.

### Bridges: how a 0.1 % resistance change becomes a measurable voltage

A strain gauge is a foil resistor bonded to a part. Strain $\varepsilon$ (dimensionless, usually quoted in microstrain, $\mu\varepsilon = 10^{-6}$) changes its resistance by $\Delta R/R = \mathrm{GF}\cdot\varepsilon$, with gauge factor GF about 2 for metal foil. At 500 $\mu\varepsilon$ that is only 0.1 %: far too small to measure as an absolute resistance, so the gauge is placed in a **Wheatstone bridge** of four arms excited by $V_{ex}$. With the bridge balanced, the output is zero; a change in one arm (quarter bridge) gives, for small strains:`,
        },
        { kind: "equation", formula: "aw02-bridge-quarter" },
        {
          kind: "md",
          md: md`A **half bridge** (two active gauges, for example one in tension and one in compression on a bending beam) doubles the output; a **full bridge** (four active gauges) gives $V_o \approx V_{ex}\,\mathrm{GF}\,\varepsilon$ and also cancels temperature effects that act equally on all arms. Example: 5 V excitation, GF 2, 500 $\mu\varepsilon$, quarter bridge: $V_o = 5\times 2\times 500\times10^{-6}/4 = 1.25$ mV.

A **load cell** is a machined element with a full bridge inside, calibrated by the maker. It is rated in **mV/V**: output at rated load per volt of excitation. A 2 mV/V cell at 10 V excitation gives 20 mV at full scale, so the output scales linearly:`,
        },
        { kind: "equation", formula: "aw02-loadcell-output" },
        {
          kind: "md",
          md: md`Because the output is proportional to $V_{ex}$, good bridge inputs either regulate excitation tightly or **measure it** (remote sense lines at the bridge, so voltage drop in long leads is seen) and compute the ratio. Torque transducers on dynos are usually bridge-based too, often with telemetry or slip rings on rotating shafts.

### Temperature: thermocouples vs RTDs

A **thermocouple** is two dissimilar metals joined at the measuring point. It generates a voltage proportional to the temperature difference between the hot junction and the point where the wires meet the instrument (the reference or cold junction): the Seebeck effect. Type K produces about 41 $\mu$V/°C near room temperature.`,
        },
        { kind: "equation", formula: "aw02-thermocouple" },
        {
          kind: "md",
          md: md`The instrument must know the cold-junction temperature (**cold-junction compensation**, CJC, usually a sensor on the terminal block) and apply the standard non-linear reference tables (IEC 60584-1) rather than a single constant. Thermocouples are cheap, rugged, fast and go to over 1,000 °C, but signals are tens of microvolts per degree and standard tolerance for type K is about ±1.5 °C (class 1) to ±2.5 °C (class 2) at moderate temperatures, growing in proportion to temperature above a few hundred °C.

An **RTD** (resistance temperature detector) is a platinum resistor. A Pt100 has $R_0 = 100\ \Omega$ at 0 °C and, to first order:`,
        },
        { kind: "equation", formula: "aw02-rtd" },
        {
          kind: "md",
          md: md`With $\alpha = 0.00385\ /°\text{C}$ (IEC 60751), a Pt100 reads 138.5 $\Omega$ at 100 °C, so 1 °C is only 0.385 $\Omega$. Any resistance in the lead wires adds directly to the reading in a **2-wire** connection. **3-wire** connections compensate equal lead resistances; **4-wire** connections pass excitation on one pair and sense voltage on the other, removing lead resistance almost completely. RTDs are more accurate and stable than thermocouples (class A: about ±0.15 °C at 0 °C) but slower, more fragile and usually limited to a few hundred °C. Excitation current self-heats the element, so it is kept around 1 mA or less.

### Current: shunt, Hall, Rogowski

For drives, inverters and batteries, current is often the most important channel.`,
        },
        { kind: "equation", formula: "aw02-shunt" },
        {
          kind: "md",
          md: md`| Method | Principle | Strengths | Weaknesses |
|---|---|---|---|
| **Shunt resistor** | Voltage across a known low resistance | DC to high bandwidth, very accurate, cheap | Not isolated (sits in the power path), dissipates $I^2R$, small signal, thermal drift |
| **Hall-effect (open or closed loop)** | Magnetic field of the conductor measured by a Hall element, closed loop nulls the field with a compensation winding | Galvanic isolation, measures DC, closed loop is accurate and fast | Offset drift with temperature, bandwidth limits, saturation |
| **Fluxgate / zero-flux** | Saturating core detects residual flux and nulls it | Highest DC accuracy (ppm level), used for power analysers and battery coulomb counting | Cost, size |
| **Rogowski coil** | Air-cored coil measures $dI/dt$, integrated electronically | Isolated, wide range, flexible, no saturation | AC only (no DC), integrator drift, lower accuracy at low frequency |

Example: 100 A through a 100 $\mu\Omega$ shunt gives 10 mV and dissipates 1 W; at 1,000 A a 100 $\mu\Omega$ shunt would dissipate 100 W, which is why high-current shunts are larger and lower in resistance, and why inverter test benches often use zero-flux transducers.

### Noise, grounding and shielding

Every resistor and amplifier adds random noise. Amplifier datasheets give a **noise density** $e_n$ in nV/$\sqrt{\text{Hz}}$; for white noise the rms noise grows with the square root of the measurement bandwidth $B$:`,
        },
        { kind: "equation", formula: "aw02-noise-rms" },
        {
          kind: "md",
          md: md`So a channel that does not need bandwidth should not have it: filtering a load cell to 100 Hz instead of 10 kHz cuts white noise by $\sqrt{100} = 10$. Signal quality is quoted as a signal-to-noise ratio in decibels:`,
        },
        { kind: "equation", formula: "aw02-snr-db" },
        {
          kind: "md",
          md: md`Beyond random noise, the dominant bench problems are **interference** and **ground loops**:

- **Ground loops:** a sensor grounded at the rig and the DAQ grounded at a different point see a few hundred mV of potential difference, often at 50 Hz and its harmonics, which a single-ended input adds to the signal.
- **Common-mode voltage:** a shunt in the high side of a 400 V or 800 V DC bus sits at bus potential; the DAQ must measure millivolts between two terminals that both swing at hundreds of volts. This needs a differential input with high **common-mode rejection ratio** (CMRR, in dB), and above a few tens of volts, **galvanic isolation** for safety.
- **Inverter switching (PWM) noise:** fast $dv/dt$ edges couple capacitively into nearby cables. Twisted pairs, shields grounded at one end (usually the DAQ end), separation from power cables and ferrites are the standard fixes.

The chain below is the mental model for the rest of the module.`,
        },
        {
          kind: "flow",
          title: "Signal chain of one bench channel",
          steps: [
            { label: "Physical quantity", detail: "Force, torque, temperature, current, vibration" },
            { label: "Transducer", detail: "Bridge, thermocouple, RTD, shunt, Hall, accelerometer" },
            { label: "Excitation and conditioning", detail: "Excitation, gain, isolation, CJC, filtering" },
            { label: "Anti-alias filter and ADC", detail: "Band-limit, sample, quantise (Lesson 2)" },
            { label: "Timestamp", detail: "Sample clock and time base (Lesson 3)" },
            { label: "Storage with metadata", detail: "Raw values, scaling, units, calibration (Lessons 4 and 6)" },
          ],
          caption: "Every stage adds gain, offset, noise or delay. A trustworthy channel records what each stage was set to.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing a load cell channel and checking an RTD",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Load cell channel on an actuator test rig",
          given: md`Illustrative actuator test rig (not customer data). A 500 N load cell rated 2.0 mV/V, excited at 10 V, feeds an amplifier into an ADC with a ±10 V input range. The amplifier input noise density is 10 nV/$\sqrt{\text{Hz}}$ and the channel is filtered to 1 kHz bandwidth. Expected forces are 0 to 500 N.`,
          steps: [
            { md: md`**Full-scale output:** $V_o = 2.0\ \text{mV/V}\times 10\ \text{V} = 20$ mV at 500 N, so 0.04 mV per newton. At 100 N the cell gives $20\times 100/500 = 4$ mV.` },
            { md: md`**Gain to use the ADC range:** $10\ \text{V}/20\ \text{mV} = 500$. In practice you choose a little less (say 400) to leave headroom for overload and offsets, because a clipped peak cannot be recovered.` },
            { md: md`**Noise at the input:** $v_n = 10\ \text{nV}/\sqrt{\text{Hz}}\times\sqrt{1000\ \text{Hz}} = 316$ nV rms. In force: $316\times10^{-9}/20\times10^{-3}\times 500 = 0.0079$ N rms. Amplifier noise is negligible here; in practice cell temperature drift and creep (often specified around 0.02 to 0.05 % of full scale) and mechanical alignment dominate.` },
            { md: md`**Signal-to-noise at full scale:** $20\log_{10}(20\ \text{mV}/316\ \text{nV}) = 20\log_{10}(63{,}246) \approx 96$ dB.` },
            { md: md`**What to record with the channel:** sensor model and serial, rated output from the calibration certificate (for example 2.0013 mV/V, not the nominal 2.0), excitation voltage (measured), amplifier gain, filter setting, zero offset at the start of the test, and units. Without these, the 4 mV becomes an unexplained number.` },
          ],
          result: md`20 mV full scale, gain about 400 to 500, noise about 0.008 N rms in a 1 kHz bandwidth: the bridge is not the weak link; calibration, drift and metadata are.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Why the 2-wire RTD on the winding reads hot",
          given: md`Illustrative motor test. A Pt100 on a stator winding is wired 2-wire through 15 m of cable; each lead has about 0.5 $\Omega$. The winding is truly at 100 °C. Use $\alpha = 0.00385\ /°\text{C}$.`,
          steps: [
            { md: md`True RTD resistance: $R = 100\,(1 + 0.00385\times 100) = 138.5\ \Omega$.` },
            { md: md`In a 2-wire circuit the instrument sees the RTD plus both leads: $138.5 + 2\times 0.5 = 139.5\ \Omega$.` },
            {
              md: md`Temperature error $= 1.0\ \Omega / (100\times 0.00385\ \Omega/°\text{C}) = 2.6$ °C too high.`,
              hidden: true,
              check: { prompt: "Temperature error from lead resistance (°C)", answer: 2.6, unit: "°C", tolerance: { abs: 0.05 } },
            },
            {
              md: md`With 3-wire compensation and leads matched to within 0.05 $\Omega$, the residual error is about $0.05/0.385 = 0.13$ °C.`,
              hidden: true,
              check: { prompt: "Residual error with 3-wire and 0.05 Ω lead mismatch (°C)", answer: 0.13, unit: "°C", tolerance: { abs: 0.01 } },
            },
          ],
          result: md`A 2-wire RTD can read 2 to 3 °C high on a long cable. That is larger than the class tolerance of the sensor, and it is invisible in the data unless the wiring method is recorded as metadata.`,
        },
        {
          kind: "question",
          question: {
            id: "aw02-l01-p1",
            type: "numeric",
            prompt: md`Illustrative battery cycler check. A 50 $\mu\Omega$ shunt carries 400 A DC. What voltage (mV) does the DAQ see across it?`,
            answer: 20,
            unit: "mV",
            tolerance: { abs: 0.1 },
            explanation: md`$V = IR = 400\times 50\times10^{-6} = 0.020$ V = 20 mV. The shunt dissipates $I^2R = 400^2\times 50\times10^{-6} = 8$ W, so its temperature (and resistance, through its temperature coefficient) changes during a long test: one reason battery labs log shunt temperature or use zero-flux transducers.`,
            concepts: ["aw02.current-sensing"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How rigs are instrumented in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who does it and with what

Rig instrumentation is done by test engineers and technicians, often with an instrumentation specialist. Typical hardware families you will hear: NI (CompactDAQ, PXI, with LabVIEW, TestStand and DIAdem), HBK (formerly HBM, QuantumX, with catman), Dewesoft (SIRIUS, with DewesoftX), Vector and ETAS (automotive bus loggers and calibration tools), dSPACE and Speedgoat (hardware-in-the-loop), Keysight and Yokogawa (power analysers, oscilloscopes). Each writes its own files and metadata conventions (Lesson 4).

The key document is the **channel list** (sometimes "instrumentation list" or "test point list"): one row per channel with name, sensor, serial, location, range, units, sample rate, filter, calibration due date and the DAQ module and terminal it is wired to. On many benches it lives in a spreadsheet that drifts away from what is actually wired.`,
        },
        { kind: "sources", refs: ["aw02-r13", "aw02-r14"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong on a bench",
          md: md`- **Clipping:** gain set for expected values; the interesting event (a short circuit, a stall) saturates the input and the peak is lost.
- **Wrong sensor constant:** nominal 2 mV/V entered instead of the certificate value; a thermocouple type set to J when K is wired (tens of degrees error at high temperature).
- **Ground loops:** a 50 Hz ripple that "comes and goes" depending on which equipment is switched on.
- **2-wire RTDs and unmeasured excitation:** systematic offsets that look like real physics.
- **Channel swaps:** two thermocouples cross-wired between phases; the data look plausible but are wrong.
- **Spreadsheet drift:** the channel list no longer matches the wiring after a rig change, and nobody records when it changed.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Product angle",
          md: md`Several of these failures are invisible in the signal itself and only show up when you know the context: which sensor, which serial, which calibration, which wiring change happened on which day. That context is part of what makes bench data reusable later, and it is exactly the kind of information a capture layer can record alongside the signals instead of leaving it in a spreadsheet. Treat this as a product hypothesis to test with buyers, not a claim about what Lockstep does today.`,
        },
        {
          kind: "ask",
          title: "Questions to ask a test team in discovery",
          items: [
            "How many channels per rig, and how many are bridge, temperature, current, voltage, vibration and bus (CAN, EtherCAT) channels?",
            "Where does the channel list live, who updates it, and how do you know it matches the wiring on a given day?",
            "How do you record sensor serials and calibration constants with each run?",
            "Which channels have caused a wrong conclusion in the last year, and how was it found?",
            "Are your current measurements isolated, and at what bus voltage do your rigs run?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw02-l01-p2",
            type: "short",
            explanation: md`A good channel list is the first artifact of a capture pilot: it shows the buyer you understand their rig and it exposes the metadata (sensor, range, rate, calibration) that the data will need. Getting the sensor physics right matters less than asking the right checking questions of people who have run these rigs.`,
            prompt: md`Produce the first draft of a **channel list** for an illustrative electric drive unit endurance rig that a prospect might describe in a discovery call (motor plus inverter on a dyno, coolant loop, CAN bus). Give 8 to 10 rows with: channel name, quantity, sensor type, range, units, sample rate class (slow, medium, fast) and one note on what could go wrong. Then write three sentences on what you would ask Ismail or Yusuf to check before you show it to the prospect.`,
            rubric: [
              "Covers the main physical groups: torque and speed, phase currents and DC bus current, DC bus and phase voltages, winding and coolant temperatures, coolant flow or pressure, vibration, and at least one bus signal",
              "Sensor choices are technically sound (for example torque flange bridge, zero-flux or Hall for phase currents, thermocouples or RTDs on windings, accelerometer for vibration)",
              "Ranges and units are plausible and stated in SI; rate classes match bandwidth (temperatures slow, currents and voltages fast)",
              "Each row has a concrete failure mode (clipping, ground loop, common-mode, lead resistance, wrong constant, swap)",
              "Questions for the cofounders are specific and checkable, not generic",
              "Labels the rig and all numbers as illustrative; no invented customer",
            ],
            modelAnswer: md`Illustrative EDU endurance rig (not a real customer).

| Channel | Quantity | Sensor | Range | Units | Rate | What can go wrong |
|---|---|---|---|---|---|---|
| dyno.shaft.torque | Shaft torque | Torque flange, full bridge with telemetry | ±500 | N·m | Medium | Zero drift with temperature; zero not recorded at start |
| dyno.shaft.speed | Speed | Encoder | 0 to 20,000 | rpm | Medium | Pulse count lost at high speed |
| inv.phase_u.current | Phase U current | Zero-flux transducer | ±600 | A | Fast | PWM ripple aliased if under-sampled |
| inv.phase_v.current | Phase V current | Zero-flux transducer | ±600 | A | Fast | Swapped with W in wiring |
| inv.dc_bus.voltage | DC bus voltage | Isolated differential probe | 0 to 1,000 | V | Fast | Common-mode and isolation rating |
| inv.dc_bus.current | DC bus current | Shunt in an isolated module | ±400 | A | Fast | Shunt self-heating in long runs |
| motor.stator_u.temp | Winding temperature | Pt100, 3-wire | 0 to 200 | °C | Slow | Lead mismatch, PWM noise pickup |
| cool.inlet.temp | Coolant inlet | Type K thermocouple | 0 to 120 | °C | Slow | Wrong type configured, CJC error |
| cool.loop.flow | Coolant flow | Turbine flowmeter | 0 to 20 | L/min | Slow | Scaling (pulses per litre) wrong |
| motor.housing.accel | Vibration | IEPE accelerometer | ±50 | g | Fast | Cable whip, mounting resonance |
| can.inv.torque_cmd | Commanded torque | CAN signal from the inverter | ±500 | N·m | Medium | DBC version mismatch |

Questions for Ismail and Yusuf: (1) Are zero-flux transducers what EDU teams actually use for phase currents at these ratings, or are Hall sensors in the inverter more common for endurance rigs? (2) Which of these channels, in your Tesla experience, most often produced a wrong conclusion and why? (3) Is a 1,000 V isolated input realistic for 800 V platforms, and what CMRR should we expect to be asked about?`,
            concepts: ["aw02.signal-chain", "aw02.current-sensing", "aw02.temperature-sensors", "aw02.noise-grounding"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a software engineer joining Afterwave why a load cell reading of 4 mV is meaningless on its own, and what has to be stored with it.",
          keyPoints: [
            "A load cell is a bridge whose output scales with excitation and its mV/V rating",
            "Converting volts to newtons needs the calibrated sensitivity, excitation, gain and zero offset",
            "Noise, drift and clipping depend on gain and bandwidth settings",
            "Sensor serial and calibration identify which constants apply",
            "Without this metadata the value cannot be reused or compared across runs",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw02-l01-q1",
      type: "numeric",
      prompt: md`A full bridge strain gauge (GF 2.0) at 5 V excitation sees 400 $\mu\varepsilon$. What is the output in mV? (Full bridge: $V_o \approx V_{ex}\,\mathrm{GF}\,\varepsilon$.)`,
      answer: 4,
      unit: "mV",
      tolerance: { abs: 0.05 },
      explanation: md`$5\times 2.0\times 400\times10^{-6} = 0.004$ V = 4 mV. A quarter bridge would give a quarter of this, 1 mV.`,
      concepts: ["aw02.bridge-circuit"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw02-l01-q2",
      type: "mcq",
      prompt: "Why do precision bridge inputs measure the excitation voltage at the bridge (remote sense)?",
      options: [
        "To reduce the ADC sample rate",
        "Because bridge output is proportional to excitation, and lead voltage drop changes the excitation actually reaching the bridge",
        "To provide cold-junction compensation",
        "To isolate the bridge from ground",
      ],
      answer: 1,
      explanation: md`$V_o \propto V_{ex}$. If 10 V leaves the DAQ but 9.9 V reaches the bridge, every reading is 1 % low. Sensing at the bridge lets the instrument compute the true ratio.`,
      concepts: ["aw02.bridge-circuit", "aw02.signal-chain"],
      difficulty: 2,
    },
    {
      id: "aw02-l01-q3",
      type: "multi",
      prompt: "Which statements about thermocouples and RTDs are correct? (Select all that apply.)",
      options: [
        "A thermocouple measures the temperature difference between its hot junction and the reference junction",
        "A 4-wire RTD connection removes lead resistance from the measurement",
        "RTDs are generally more accurate and stable than thermocouples",
        "Thermocouples need excitation current",
        "Type K thermocouples produce about 41 mV per °C",
      ],
      answer: [0, 1, 2],
      explanation: md`Thermocouples are self-generating (no excitation) and produce about 41 **micro**volts per °C, which is why noise and CJC matter so much. RTDs need excitation and lead compensation but are more accurate.`,
      concepts: ["aw02.temperature-sensors"],
      difficulty: 1,
    },
    {
      id: "aw02-l01-q4",
      type: "mcq",
      prompt: "An inverter test needs DC bus current including DC, with galvanic isolation and good accuracy. Which sensor fits best?",
      options: ["Rogowski coil", "Closed-loop Hall or zero-flux transducer", "Uninsulated shunt directly into a single-ended DAQ input", "Current transformer (CT)"],
      answer: 1,
      explanation: md`Rogowski coils and CTs do not measure DC. A shunt into a non-isolated single-ended input at bus potential is unsafe and suffers common-mode error. Closed-loop Hall or zero-flux transducers give isolation and DC capability.`,
      concepts: ["aw02.current-sensing"],
      difficulty: 2,
    },
    {
      id: "aw02-l01-q5",
      type: "numeric",
      prompt: md`An amplifier has 20 nV/$\sqrt{\text{Hz}}$ input noise density. What is the rms noise (in $\mu$V) over a 10 kHz bandwidth?`,
      answer: 2,
      unit: "µV",
      tolerance: { abs: 0.02 },
      explanation: md`$v_n = e_n\sqrt{B} = 20\ \text{nV}\times\sqrt{10{,}000} = 20\times 100 = 2{,}000$ nV = 2 $\mu$V rms. Cutting bandwidth to 100 Hz would give 0.2 $\mu$V.`,
      concepts: ["aw02.noise-grounding"],
      difficulty: 2,
    },
    {
      id: "aw02-l01-q6",
      type: "decision",
      prompt: md`During a pilot, a prospect's data show a 50 Hz ripple on all thermocouple channels, but only when the dyno drive is running. Their engineer suggests a digital 50 Hz notch filter in post-processing. What do you recommend?`,
      options: [
        { text: "Accept the notch filter; it removes the symptom.", score: 0.3, feedback: "It hides the symptom but the interference may also shift the DC level and has harmonics; the root cause stays." },
        { text: "Treat it as a ground loop or coupling problem: check grounding points, shield termination, differential or isolated inputs and cable routing, and record the fix as a rig change.", score: 1, feedback: "Correct: fix it at the source, and record the change so data before and after can be told apart." },
        { text: "Increase the sample rate so the ripple is better resolved.", score: 0, feedback: "Higher sample rate records the interference more faithfully; it does not remove it." },
      ],
      explanation: md`Interference that correlates with a power drive switching on is a coupling or ground loop issue. Fix grounding and shielding first, and log the rig change because it changes the meaning of earlier data.`,
      concepts: ["aw02.noise-grounding"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw02-l01-f1", front: "Quarter bridge output", back: md`$V_o \approx V_{ex}\,\mathrm{GF}\,\varepsilon/4$; full bridge $V_{ex}\,\mathrm{GF}\,\varepsilon$`, concepts: ["aw02.bridge-circuit"] },
    { id: "aw02-l01-f2", front: "Load cell rated 2 mV/V at 10 V excitation: full-scale output?", back: "20 mV", concepts: ["aw02.bridge-circuit"] },
    { id: "aw02-l01-f3", front: "Pt100 resistance at 100 °C", back: md`138.5 $\Omega$ ($\alpha = 0.00385$/°C, 0.385 $\Omega$ per °C)`, concepts: ["aw02.temperature-sensors"] },
    { id: "aw02-l01-f4", front: "Why 4-wire RTD?", back: "Excitation on one pair, sensing on the other: lead resistance drops out of the reading.", concepts: ["aw02.temperature-sensors"] },
    { id: "aw02-l01-f5", front: "Which current sensors cannot measure DC?", back: "Rogowski coils and current transformers.", concepts: ["aw02.current-sensing"] },
    { id: "aw02-l01-f6", front: "Noise vs bandwidth", back: md`White noise rms $= e_n\sqrt{B}$: 100x less bandwidth, 10x less noise.`, concepts: ["aw02.noise-grounding"] },
    { id: "aw02-l01-f7", front: "Cold-junction compensation", back: "Measuring the temperature where thermocouple wires meet the instrument, so the hot-junction temperature can be computed from the difference voltage.", concepts: ["aw02.temperature-sensors"] },
  ],
};

export default lesson;
