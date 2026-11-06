import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw01-l04",
  title: "Electrical and thermal characterisation of drives, motors and batteries",
  summary:
    "How labs characterise the products Afterwave's customers build: torque-speed envelopes and efficiency maps on a dynamometer, loss splitting and why loss uncertainty explodes at high efficiency, thermal resistance networks and junction temperature, and battery capacity, DC internal resistance and impedance tests.",
  minutes: 80,
  objectives: [
    "Compute mechanical power, efficiency and losses at a dyno operating point and split losses between inverter and motor",
    "Explain the torque-speed envelope (constant torque, constant power, voltage limits) and how an efficiency map is measured",
    "Propagate measurement uncertainty into efficiency and losses, and explain why direct loss measurement exists",
    "Compute steady-state and transient junction temperature from a thermal resistance or Foster network",
    "Compute battery capacity, state of health, DC internal resistance and Joule heat from test data",
  ],
  concepts: [
    { id: "aw01.torque-speed", name: "Torque-speed envelope", description: "The region a drive can operate in: constant torque up to base speed (current-limited), constant power above it (voltage-limited, field weakening), peak vs continuous (thermal).", competency: "aw-test" },
    { id: "aw01.efficiency-map", name: "Efficiency map", description: "Efficiency measured over a grid of speed and torque points (motoring and generating, at set voltage and temperature), drawn as contours.", competency: "aw-test", related: ["aw01.torque-speed"] },
    { id: "aw01.measurement-uncertainty", name: "Measurement uncertainty propagation", description: "Combining sensor uncertainties into the uncertainty of a derived quantity; small errors in two large powers become a large error in their difference (the loss).", competency: "aw-test", related: ["aw01.efficiency-map"] },
    { id: "aw01.thermal-resistance", name: "Thermal resistance and impedance", description: "Steady-state temperature rise per watt (K/W) along a heat path, and its time-dependent form Z_th(t) modelled as a Foster RC network.", competency: "aw-test" },
    { id: "aw01.battery-capacity-test", name: "Battery capacity test", description: "Constant-current discharge from full charge to the cut-off voltage at set temperature; capacity in Ah by integrating current; state of health against rated capacity.", competency: "aw-test", related: ["m05.capacity-test"] },
    { id: "aw01.dcir-impedance", name: "DC internal resistance and impedance", description: "Resistance from the voltage step under a current pulse at a defined time, and the frequency-dependent impedance from electrochemical impedance spectroscopy.", competency: "aw-test", related: ["m05.soh", "aw01.battery-capacity-test"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Power, losses, heat and charge",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`These are the bread-and-butter tests of drive, motor, actuator and battery labs: the customers Afterwave targets. They produce the densest data (an efficiency map is hundreds of thermally stabilised points, each with high-rate electrical signals) and the most rework when something changes: a new current-controller calibration can change the whole map. If you understand what is measured and how it goes wrong, you can explain precisely why a firmware change forces a re-map, and which part of it.`,
        },
        {
          kind: "md",
          md: md`### Power and efficiency on a dynamometer

A dyno holds speed (or torque) while the DUT produces torque (or speed). Shaft power comes from a torque flange and an encoder:`,
        },
        { kind: "equation", formula: "aw01-mech-power" },
        {
          kind: "md",
          md: md`Electrical input comes from a **power analyser** that samples voltage and current simultaneously on every phase (and on the DC link) and computes true power as the mean of $v(t)\,i(t)$. Efficiency is output over input:`,
        },
        { kind: "equation", formula: "aw01-efficiency" },
        {
          kind: "md",
          md: md`In motoring, output is mechanical; in generating (regenerative braking, a robot joint lowering a load) the direction flips and so does the formula. With DC power, AC power between inverter and motor, and shaft power, the analyser splits losses into **inverter loss** $P_\text{dc} - P_\text{ac}$ and **motor loss** $P_\text{ac} - P_\text{mech}$.

### The torque-speed envelope

Below **base speed** the drive can deliver its maximum torque, limited by the maximum current the inverter and motor can carry. As speed rises, back-EMF rises with it until it meets the voltage the DC link can supply; above base speed the controller weakens the field to keep going, and the drive runs at roughly **constant power**, so torque falls as $1/\omega$. At the top, the voltage limit and mechanical limits end the envelope. Base speed scales with DC voltage, which is why tests are repeated at minimum, nominal and maximum DC voltage.

Two envelopes exist: **peak** (seconds, limited by how fast windings and power semiconductors heat up) and **continuous** (thermal steady state). The gap between them is a thermal question, answered by the thermal tests below.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative peak envelope: 300 N·m to 4,000 rpm base speed, 125.7 kW constant power above",
          xKey: "rpm",
          xLabel: "Speed (rpm)",
          yLabel: "Torque (N·m) and power (kW)",
          series: [
            { key: "torque", label: "Peak torque (N·m)" },
            { key: "power", label: "Peak power (kW)" },
          ],
          data: [
            { rpm: 0, torque: 300, power: 0 },
            { rpm: 1000, torque: 300, power: 31.4 },
            { rpm: 2000, torque: 300, power: 62.8 },
            { rpm: 3000, torque: 300, power: 94.2 },
            { rpm: 4000, torque: 300, power: 125.7 },
            { rpm: 6000, torque: 200, power: 125.7 },
            { rpm: 8000, torque: 150, power: 125.7 },
            { rpm: 10000, torque: 120, power: 125.7 },
            { rpm: 12000, torque: 100, power: 125.7 },
          ],
          caption: "Constant torque up to base speed (current limit), constant power above it (voltage limit with field weakening). Real curves droop near the top as losses rise.",
        },
        {
          kind: "md",
          md: md`### The efficiency map

The map is measured on a grid: for example 15 speeds by 12 torques, motoring and generating, at 3 DC voltages, about 1,080 points. Each point needs the DUT at thermal steady state (or a controlled temperature) and an averaging window, typically tens of seconds; the full map takes days of dyno time. The result is drawn as contours of efficiency over the envelope. An illustrative system (inverter plus motor) map:

| Torque \ speed | 1,000 rpm | 3,000 rpm | 6,000 rpm | 9,000 rpm | 12,000 rpm |
|---|---|---|---|---|---|
| 250 N·m | 82 % | 90 % | outside | outside | outside |
| 150 N·m | 85 % | 92 % | 94 % | 94 % | outside |
| 100 N·m | 86 % | 92 % | 94.5 % | 94 % | 92 % |
| 50 N·m | 84 % | 91 % | 93 % | 92 % | 90 % |
| 20 N·m | 76 % | 86 % | 89 % | 88 % | 85 % |

Low speed and high torque are dominated by copper loss ($I^2R$), high speed by iron and switching loss, very low torque by fixed losses. A change that alters current control, switching frequency or modulation strategy moves the whole map.

### Why loss uncertainty explodes

Efficiency is a ratio of two large, similar numbers. Relative uncertainties of independent inputs combine in quadrature:`,
        },
        { kind: "equation", formula: "aw01-efficiency-uncertainty" },
        {
          kind: "md",
          md: md`That is fine for efficiency. But loss is a **difference**: with 0.1 % uncertainty on each of two powers and 95 % efficiency, loss uncertainty is about $0.1\% \times \sqrt{1 + 0.95^2}/0.05 \approx 2.8\%$ of the loss. For a 99 % efficient inverter the same instruments give about 14 %. That is why high-efficiency inverters are often characterised **calorimetrically** (measure the heat into the coolant: flow times heat capacity times temperature rise) and why motor standards (IEC 60034-2-1) define several efficiency-determination methods with different uncertainty.

### Thermal resistance networks

Heat flows from a power semiconductor junction through die attach, substrate, baseplate and thermal interface into the coolant. Each layer has a thermal resistance (K/W); in steady state they add in series:`,
        },
        { kind: "equation", formula: "aw01-thermal-resistance" },
        {
          kind: "md",
          md: md`Junction temperature cannot be measured directly in a packaged module. Labs calibrate a **temperature-sensitive electrical parameter** (for example the on-state voltage at a small sense current) against temperature, then use it during the test (JEDEC JESD51-1 describes the electrical test method for thermal characterisation).

For short loads (a 1 s torque peak, a robot jump), the junction does not reach steady state. The transient **thermal impedance** $Z_{th}(t)$ is measured by a heating pulse and cooling curve and fitted with a Foster network:`,
        },
        { kind: "equation", formula: "aw01-foster" },
        {
          kind: "md",
          md: md`Motors have the same structure on longer timescales: winding to stator to housing to coolant, with thermal time constants of minutes. Peak ratings are set by how long the windings take to reach their insulation class limit.

### Battery characterisation

- **Capacity test:** charge fully (constant current, then constant voltage until current tapers), rest, then discharge at constant current (often C/3 or 1C) at a set temperature to the cut-off voltage. Capacity is the integral of current: $Q = \int I\,dt$, in Ah; energy is $\int V I\,dt$, in Wh. State of health (capacity basis) is measured capacity over rated capacity. Performance test methods for EV cells are standardised in IEC 62660-1.
- **DC internal resistance (DCIR):** apply a current step and measure the voltage change at a stated time (for example 10 s, as in hybrid pulse power characterisation, HPPC, procedures):`,
        },
        { kind: "equation", formula: "aw01-dcir" },
        {
          kind: "md",
          md: md`DCIR depends strongly on state of charge, temperature and pulse duration, so a number without those three is meaningless. Heat generated in the cell is roughly $I^2 R$ (plus a reversible entropic term):`,
        },
        { kind: "equation", formula: "aw01-joule-heat" },
        {
          kind: "md",
          md: md`- **Electrochemical impedance spectroscopy (EIS):** apply a small AC current or voltage over frequencies from kHz down to mHz and measure complex impedance. On a Nyquist plot, the high-frequency intercept is ohmic resistance, the semicircle is charge transfer at the electrodes, the low-frequency tail is diffusion. Changes in each part point to different ageing mechanisms.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "A dyno point, a junction temperature and a cell pulse",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Loss split at one operating point",
          given: md`Illustrative drive unit on a dyno at 3,000 rpm and 150 N·m (motoring). Power analyser: DC input 400 V and 135 A; AC power between inverter and motor 52.3 kW. Torque flange 500 N·m range with 0.05 % of full scale uncertainty; speed uncertainty negligible; power analyser 0.1 % of reading on each power.`,
          steps: [
            { md: md`**Angular speed:** $\omega = 2\pi \times 3{,}000/60 = 314.16$ rad/s.` },
            { md: md`**Shaft power:** $P_\text{mech} = 150 \times 314.16 = 47{,}124$ W $= 47.12$ kW.` },
            { md: md`**DC power:** $P_\text{dc} = 400 \times 135 = 54{,}000$ W.` },
            { md: md`**Efficiencies:** inverter $52.3/54.0 = 96.9\%$; motor $47.12/52.3 = 90.1\%$; system $47.12/54.0 = 87.3\%$.` },
            { md: md`**Losses:** inverter $54.0 - 52.3 = 1.70$ kW; motor $52.3 - 47.12 = 5.18$ kW. At this low-speed, high-torque point copper loss in the motor dominates.` },
            { md: md`**Torque uncertainty:** $0.0005 \times 500 = 0.25$ N·m, or $0.25/150 = 0.17\%$. System efficiency relative uncertainty $\approx \sqrt{0.17^2 + 0.1^2} = 0.19\%$, so $87.3 \pm 0.17$ points. Motor loss uncertainty: $\sqrt{(0.0017 \times 47.12)^2 + (0.001 \times 52.3)^2} = \sqrt{0.0802^2 + 0.0523^2} = 0.096$ kW, about 1.9 % of 5.18 kW.` },
          ],
          result: md`System 87.3 % (inverter 96.9 %, motor 90.1 %), with 1.7 kW lost in the inverter and 5.2 kW in the motor. Efficiency is known to about 0.2 points; motor loss to about 2 %. All three powers must be sampled simultaneously and averaged over the same window, which is a synchronisation requirement.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Junction temperature in steady state and under a 1 s pulse",
          given: md`Illustrative IGBT in the same inverter. $R_{th,jc} = 0.12$ K/W, $R_{th,c\text{-}cool} = 0.08$ K/W. Foster fit of $Z_{th}$ (junction to coolant): $R_i = 0.02, 0.04, 0.06, 0.08$ K/W with $\tau_i = 0.002, 0.03, 0.3, 3$ s. Coolant 65 °C. Limit 175 °C.`,
          steps: [
            { md: md`Steady state at 300 W per switch: $T_j = 65 + 300 \times (0.12 + 0.08)$.` },
            { md: md`$T_j =$ **125 °C**.`, hidden: true, check: { prompt: "Steady-state junction temperature (°C)", answer: 125, unit: "°C", tolerance: { abs: 0.5 } } },
            { md: md`$Z_{th}(1\text{ s}) = 0.02(1 - e^{-500}) + 0.04(1 - e^{-33.3}) + 0.06(1 - e^{-3.33}) + 0.08(1 - e^{-0.333}) = 0.02 + 0.04 + 0.0579 + 0.0227 = 0.1405$ K/W.` },
            { md: md`A 1 s pulse of 600 W from 65 °C coolant: $T_j = 65 + 600 \times 0.1405 =$ **149.3 °C**.`, hidden: true, check: { prompt: "Junction temperature after a 1 s, 600 W pulse (°C)", answer: 149.3, unit: "°C", tolerance: { abs: 0.5 } } },
            { md: md`At 600 W steady state the junction would reach $65 + 600 \times 0.20 = 185$ °C, above the limit. The pulse is acceptable only because it is short. This is the physics behind peak versus continuous ratings.` },
          ],
          result: md`125 °C continuous at 300 W; 149 °C after a 1 s, 600 W peak. The derating logic in firmware relies on these numbers: change the derating firmware and the thermal tests are rerun candidates.`,
        },
        {
          kind: "question",
          question: {
            id: "aw01-l04-p1",
            type: "numeric",
            prompt: md`A cell at 50 % SoC and 25 °C rests at 3.65 V. A 100 A discharge pulse drops the voltage to 3.53 V at 10 s. What is the 10 s DCIR, and how much heat does the cell generate at a sustained 150 A (W, using $I^2R$)? Enter the heat.`,
            answer: 27,
            tolerance: { abs: 0.5 },
            unit: "W",
            explanation: md`$R = (3.65 - 3.53)/100 = 1.2$ mΩ. $P = 150^2 \times 0.0012 = 27$ W. Across a 96-cell module that is about 2.6 kW of heat to remove, which is why DCIR growth with age is a cooling-system problem as well as a power problem.`,
            concepts: ["aw01.dcir-impedance"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Characterisation labs in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Equipment and roles

- **Dynos and load machines** (AVL, HORIBA, Siemens and others for automotive scale; smaller servo-based rigs for robot actuators), **torque flanges** (HBK and others), **power analysers** (Yokogawa WT series, HBK eDrive, ZES Zimmer, Hioki), **battery cyclers** (Arbin, Bitrode, Digatron, Maccor and others), **EIS potentiostats** (BioLogic, Gamry), **thermal transient testers** for power modules.
- **Characterisation engineers** design the point grid and stabilisation rules; **test systems engineers** make the dyno controller, power analyser and DAQ agree on time and on what was running; **calibration** owns the uncertainty chain.
- Output is usually a map file plus a report; the raw data behind each point is the thing nobody can find a year later.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Not thermally stabilised**: winding resistance rises about 0.39 % per K in copper; a map taken while the motor warms up drifts across the grid.
- **Unsynchronised averaging**: torque from the dyno controller averaged over one window, power from the analyser over another. At a transient point the efficiency is fiction.
- **Current-sensor bandwidth and harmonics**: inverter output has switching harmonics; a slow current sensor under-reads power.
- **Missing configuration**: maps reported without firmware version, calibration dataset, DC voltage and coolant temperature cannot be compared or reused.
- **Battery tests at the wrong temperature**: the cell heats up during a 1C discharge; capacity and DCIR shift with it unless the cell temperature (not just the chamber) is logged.`,
        },
        { kind: "sources", refs: ["aw01-r12", "aw01-r13", "aw01-r14"] },
        {
          kind: "checklist",
          title: "What every characterisation dataset must carry",
          items: [
            "DUT serial, hardware build, firmware and calibration dataset versions",
            "DC voltage, coolant temperature and flow, ambient, for every point",
            "Stabilisation criterion and the averaging window per point",
            "Instrument list with ranges, calibration dates and uncertainty",
            "All channels on one timebase, with the synchronisation method stated",
            "For batteries: SoC, cell temperature, pulse duration and rest times",
          ],
        },
        {
          kind: "ask",
          title: "Questions for a characterisation lead",
          items: [
            "How long does a full efficiency map take on your dyno, and how often do you redo it after firmware changes?",
            "How do you align torque, speed and power analyser data in time?",
            "How do you measure junction temperature, and how often do you recalibrate the sensitive parameter?",
            "Can you show me a map from last year and the raw data and configuration behind one of its points?",
          ],
        },
        {
          kind: "xref",
          to: "m05-l04",
          note: "Track 0 covers BESS capacity testing, degradation and warranty tests at system level; this lesson covers the cell and module tests underneath.",
        },
        {
          kind: "question",
          question: {
            id: "aw01-l04-p2",
            type: "short",
            prompt: md`Write the **characterisation test specification** for an efficiency map of an illustrative humanoid joint actuator (48 V, peak 120 N·m output, max 300 rpm output, strain wave gear ratio 100:1). Define the grid, operating conditions, stabilisation and averaging, instruments and their required accuracy, signals and sample rates, and the metadata and synchronisation Lockstep must provide. Estimate total rig time and explain which firmware changes would force a full or partial re-map.`,
            rubric: [
              "Defines a sensible grid over the envelope (motoring and back-driven or generating), with conditions (voltage, temperature) and a point count",
              "States stabilisation and averaging rules and estimates rig time from them",
              "Specifies instruments and accuracies appropriate for the ranges (torque sensor range near the max, power measurement method at 48 V DC)",
              "Lists signals with sample rates and requires one timebase plus configuration metadata",
              "Distinguishes changes that force a full re-map (current control, PWM, commutation, gear) from partial (derating thresholds only near the thermal edge) or none (logging)",
              "Labels numbers as illustrative",
            ],
            modelAnswer: md`**Grid:** output speed 10, 30, 60, 100, 150, 200, 250, 300 rpm (8) by output torque 5, 10, 20, 40, 60, 80, 100, 120 N·m (8), motoring and back-driven, at 44 V and 52 V DC (2 voltages). Points inside the envelope only: about 8 × 8 × 2 × 2 = 256, say 220 valid. **Conditions:** ambient 25 °C; housing temperature held at 40 ± 2 °C by pacing.

**Stabilisation and averaging:** at each point, wait until winding temperature changes less than 0.5 K per minute (typically 60 to 120 s), then average 10 s. About 2.5 min per point including transitions: 220 × 2.5 = 550 min, about 9 h, plus cool-downs and repeats: plan 2 rig days per DUT.

**Instruments:** inline output torque sensor 150 N·m range, 0.1 % FS; motor-side and output encoders; DC power by a power analyser with shunt (0.1 % of reading); phase currents for diagnostics; winding (embedded) and housing thermocouples; driver telemetry over EtherCAT.

**Signals and rates:** torque and speed 1 kS/s; DC voltage and current 10 kS/s; phase currents 50 kS/s for snapshots; temperatures 10 S/s; telemetry at bus rate. All on one timebase with sync pulses; averaging windows defined in that timebase.

**Metadata (Lockstep):** DUT serial and build, gear serial, driver firmware and parameter set versions, fixture revision, instrument serials and calibration dates, setpoints for every point, operator actions on screen.

**Re-map triggers:** current-loop tuning, PWM frequency or modulation, commutation or encoder offset calibration, gear change: full re-map. Thermal derating thresholds: re-test only points near the thermal limit (high torque). Logging or communication changes: no re-map, run a smoke test. All values are illustrative.`,
            explanation: md`A good specification makes the map reproducible: every point has defined conditions, stabilisation and window, and every channel shares a timebase and configuration metadata. It also reasons from physics about which changes move which part of the map.`,
            concepts: ["aw01.efficiency-map", "aw01.measurement-uncertainty", "aw01.torque-speed"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a software engineer why measuring the losses of a 99 % efficient inverter with a power analyser is much harder than measuring its efficiency.",
          keyPoints: [
            "Efficiency is a ratio of two large, similar powers; its uncertainty is about the instruments' relative uncertainty",
            "Loss is the small difference of those two powers, so absolute errors stay the same while the quantity shrinks",
            "At 99 % efficiency, 0.1 % errors on each power become roughly 14 % error on the loss",
            "Calorimetric methods measure the heat directly instead",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw01-l04-q1",
      type: "numeric",
      prompt: md`A motor delivers 80 N·m at 6,000 rpm. Shaft power in kW (1 decimal)?`,
      answer: 50.3,
      tolerance: { abs: 0.1 },
      unit: "kW",
      explanation: md`$\omega = 2\pi \times 6{,}000/60 = 628.3$ rad/s; $P = 80 \times 628.3 = 50{,}265$ W $= 50.3$ kW.`,
      concepts: ["aw01.torque-speed"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw01-l04-q2",
      type: "mcq",
      prompt: "Above base speed, a drive's available torque falls roughly as 1/speed because:",
      options: [
        "The current limit drops",
        "Back-EMF reaches the available DC voltage and the controller weakens the field, holding roughly constant power",
        "The torque flange saturates",
        "Copper losses fall",
      ],
      answer: 1,
      explanation: md`Voltage, not current, becomes the binding limit; with field weakening the drive holds about constant power, so $T = P/\omega$ falls. Higher DC voltage moves base speed up.`,
      concepts: ["aw01.torque-speed"],
      difficulty: 1,
    },
    {
      id: "aw01-l04-q3",
      type: "numeric",
      prompt: md`Power module: $R_{th,jc} = 0.10$ K/W, $R_{th,c\text{-}cool} = 0.07$ K/W, coolant 60 °C, loss 400 W. Steady-state junction temperature (°C)?`,
      answer: 128,
      tolerance: { abs: 0.5 },
      unit: "°C",
      explanation: md`$T_j = 60 + 400 \times 0.17 = 128$ °C.`,
      concepts: ["aw01.thermal-resistance"],
      difficulty: 1,
    },
    {
      id: "aw01-l04-q4",
      type: "numeric",
      prompt: md`A cell rated 100 Ah delivers a constant 50 A for 1.88 h before reaching cut-off in a capacity test. State of health on a capacity basis, in %?`,
      answer: 94,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$Q = 50 \times 1.88 = 94$ Ah; SoH $= 94/100 = 94\%$. Report the C-rate (0.5C here) and temperature with it: capacity depends on both.`,
      concepts: ["aw01.battery-capacity-test"],
      difficulty: 1,
    },
    {
      id: "aw01-l04-q5",
      type: "mcq",
      prompt: "Why are high-efficiency inverters often characterised calorimetrically rather than by subtracting output from input power?",
      options: [
        "Power analysers cannot measure DC",
        "The loss is a small difference of two large numbers, so instrument errors become a large fraction of the loss",
        "Calorimetry is faster",
        "Standards forbid electrical methods",
      ],
      answer: 1,
      explanation: md`At 99 % efficiency, 0.1 % errors on each power give roughly 14 % uncertainty on the loss. Measuring the heat directly avoids the subtraction.`,
      concepts: ["aw01.measurement-uncertainty"],
      difficulty: 2,
    },
    {
      id: "aw01-l04-q6",
      type: "multi",
      prompt: "A DCIR value is only meaningful if it is reported with: (Select all that apply.)",
      options: ["State of charge", "Temperature", "Pulse duration at which voltage was read", "Cell colour", "Pulse current magnitude and direction"],
      answer: [0, 1, 2, 4],
      explanation: md`DCIR varies with SoC, temperature, pulse duration (ohmic vs polarisation contributions) and current magnitude and direction. Without those, two labs' numbers cannot be compared.`,
      concepts: ["aw01.dcir-impedance"],
      difficulty: 1,
    },
    {
      id: "aw01-l04-q7",
      type: "decision",
      prompt: md`Firmware changes the PWM frequency from 10 to 12 kHz in a drive whose efficiency map took 4 dyno days. The design engineer wants to skip re-mapping. What do you advise?`,
      options: [
        { text: "Skip: 2 kHz is a small change.", score: 0.1, feedback: "Switching loss is proportional to frequency: a 20 % rise in switching loss changes the map, most at high speed and voltage." },
        { text: "Re-map everything at all voltages.", score: 0.5, feedback: "Safe but may waste days if a targeted subset can bound the change." },
        { text: "Run a designed subset (corners and a coarse grid across the envelope at nominal voltage), compare with the old map; re-map fully only where the difference exceeds uncertainty.", score: 1, feedback: "Uses physics to target, data to confirm, and keeps the full re-map for where it matters. This is test selection with evidence." },
      ],
      explanation: md`The change has a known physical effect on switching loss. A targeted comparison quantifies it with a fraction of the rig time.`,
      concepts: ["aw01.efficiency-map"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw01-l04-f1", front: "Shaft power", back: md`$P = T\omega$, $\omega = 2\pi n/60$`, concepts: ["aw01.torque-speed"] },
    { id: "aw01-l04-f2", front: "Base speed", back: "Speed where back-EMF meets the available voltage; constant torque below, about constant power above.", concepts: ["aw01.torque-speed"] },
    { id: "aw01-l04-f3", front: "Loss split with a power analyser", back: "Inverter loss = P_dc minus P_ac; motor loss = P_ac minus P_mech.", concepts: ["aw01.efficiency-map"] },
    { id: "aw01-l04-f4", front: "Steady-state junction temperature", back: md`$T_j = T_\text{cool} + P\sum R_{th}$`, concepts: ["aw01.thermal-resistance"] },
    { id: "aw01-l04-f5", front: "Foster network", back: md`$Z_{th}(t) = \sum R_i (1 - e^{-t/\tau_i})$`, concepts: ["aw01.thermal-resistance"] },
    { id: "aw01-l04-f6", front: "DCIR", back: md`$R = \Delta V/\Delta I$ at a stated pulse time, SoC and temperature`, concepts: ["aw01.dcir-impedance"] },
    { id: "aw01-l04-f7", front: "EIS Nyquist features", back: "High-frequency intercept: ohmic; semicircle: charge transfer; low-frequency tail: diffusion.", concepts: ["aw01.dcir-impedance"] },
  ],
};

export default lesson;
