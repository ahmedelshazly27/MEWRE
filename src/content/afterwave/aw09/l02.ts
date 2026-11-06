import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw09-l02",
  title: "Load cells, torque and force measurement",
  summary:
    "How strain-gauge sensors turn force and torque into microvolts: gauge factor, Wheatstone bridges, excitation and amplifiers; what accuracy classes and datasheet errors really mean; and how to build a GUM uncertainty budget for a torque measurement and propagate it into an efficiency figure.",
  minutes: 80,
  objectives: [
    "Compute strain-gauge resistance change and bridge output from strain, gauge factor, sensitivity and excitation",
    "Explain full, half and quarter bridges, ratiometric excitation, sense lines and shunt calibration",
    "Read a load cell or torque transducer datasheet: accuracy class, linearity, hysteresis, TK0, TKC, creep, crosstalk",
    "Build a GUM uncertainty budget with Type A and Type B terms, combine it and report an expanded uncertainty",
    "Propagate relative uncertainties into a derived quantity such as actuator efficiency",
  ],
  concepts: [
    { id: "aw09.strain-gauge", name: "Strain gauge and gauge factor", description: "A resistive foil whose resistance changes in proportion to strain; about 2 for metal foil gauges.", competency: "aw-platforms", related: ["aw09.torque-transducer"] },
    { id: "aw09.wheatstone-bridge", name: "Wheatstone bridge and excitation", description: "Four arms arranged so that strain unbalances the bridge; output is ratiometric to the excitation voltage, read by a DC or carrier-frequency amplifier.", competency: "aw-platforms", related: ["aw09.strain-gauge"] },
    { id: "aw09.accuracy-class", name: "Accuracy classes and datasheet errors", description: "Linearity, hysteresis, repeatability, temperature effect on zero and span, creep and crosstalk, bounded by a class figure as a percentage of full scale or reading.", competency: "aw-platforms" },
    { id: "aw09.gum-budget", name: "GUM uncertainty budget", description: "List every input, give each a standard uncertainty (Type A from statistics, Type B from other information), combine in quadrature with sensitivity coefficients, and expand with a coverage factor.", competency: "aw-platforms", related: ["aw09.accuracy-class"] },
    { id: "aw09.derived-uncertainty", name: "Uncertainty of derived quantities", description: "For products and quotients such as power and efficiency, relative uncertainties add in quadrature.", competency: "aw-platforms", related: ["aw09.gum-budget"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From strain to microvolts, and from datasheet to uncertainty",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every claim Afterwave will make about a regression (efficiency dropped 0.4 points after firmware 2.3) is only as good as the measurement under it. If the torque uncertainty is 0.5 %, a 0.4-point efficiency change is noise, and Ripple would be flagging retests on noise. Customers' test leads know this; you win credibility by asking for the uncertainty budget before you ask for the data. Later, an Afterwave platform that ships with its uncertainty stated per channel is a product feature, not a footnote.`,
        },
        {
          kind: "md",
          md: md`### The strain gauge

A metal foil grid bonded to a flexure (the spring element of the sensor). When the flexure strains, the grid lengthens and narrows and its resistance rises:`,
        },
        { kind: "equation", formula: "aw09-gauge-factor" },
        {
          kind: "md",
          md: md`Flexures are designed for about 1,000 to 1,500 µm/m at rated load, so the resistance change is around 0.2 %. Gauges are 120, 350 or 1,000 Ω. A 350 Ω gauge at 1,000 µm/m changes by 0.7 Ω: too small to read with a multimeter, easy with a bridge.

### The Wheatstone bridge

Four resistive arms, excited across one diagonal, read across the other. Gauges are placed so that adjacent arms see opposite strain (tension and compression) and the signals add, while equal changes (temperature, some parasitic loads) cancel.`,
        },
        { kind: "equation", formula: "aw09-bridge-output" },
        {
          kind: "md",
          md: md`| Bridge | Active gauges | Output for strain $\varepsilon$ | Typical use |
|---|---|---|---|
| Quarter | 1 | $\approx GF\,\varepsilon/4$ | Experimental strain on a structure; needs a dummy gauge for temperature |
| Half | 2 | $\approx GF\,\varepsilon/2$ | Bending beams |
| Full | 4 | $\approx GF\,\varepsilon$ | All commercial load cells and torque transducers |

Sensors are specified by **sensitivity** in mV/V at rated load, typically 1 to 3 mV/V. A 2 mV/V load cell excited at 10 V gives 20 mV at full load. To resolve 1/10,000 of full scale you need 2 µV of clean signal.

**Excitation and amplifiers.** Use **six-wire** connections: two excitation, two signal, two **sense** lines that measure the voltage actually at the bridge, so cable resistance and supply drift cancel because the output is **ratiometric**. **Carrier-frequency** amplifiers (AC excitation at a few kHz) reject thermocouple voltages and mains interference; **DC** amplifiers offer more bandwidth. **Shunt calibration** switches a precision resistor across one arm to simulate a known output, checking the whole chain without loading the sensor. Rotating torque transducers transmit the signal contactlessly and digitise on the rotor.

### What the datasheet errors mean

| Error | What it is | How it behaves |
|---|---|---|
| **Linearity deviation** | Departure of the output from a straight line | Often quoted with hysteresis, percent of full scale |
| **Hysteresis** | Different output for rising and falling load | Matters for cyclic and back-and-forth tests |
| **Repeatability** | Spread for the same load, same mounting | Random; Type A in your own data |
| **TK0** | Temperature effect on zero, percent of full scale per 10 K | Biggest error at low load in a warming test cell |
| **TKC** | Temperature effect on span (sensitivity), percent of reading per 10 K | Scales with the reading |
| **Creep** | Output drift under constant load over minutes | Long holds, durability tests |
| **Crosstalk / parasitic loads** | Output from bending moment, axial or lateral force | Misalignment, side loads on actuators |

Vendors summarise these with an **accuracy class**: for many torque transducer makers, class 0.05 means each main component is within 0.05 %, not that the total is. Load cells for weighing follow OIML R 60 classes (C3 means suitable for 3,000 verification intervals); force-proving instruments follow ISO 376 classes (00, 0.5, 1, 2). Read the definition on the datasheet before comparing two numbers.

### The GUM method

The **Guide to the Expression of Uncertainty in Measurement** (JCGM 100) is the global method: write the measurement model, give each input a standard uncertainty, combine, expand.`,
        },
        { kind: "equation", formula: "aw09-type-a" },
        { kind: "equation", formula: "aw09-type-b-rect" },
        { kind: "equation", formula: "aw09-combined-uncertainty" },
        { kind: "equation", formula: "aw09-expanded-uncertainty" },
        { kind: "equation", formula: "aw09-relative-product-uncertainty" },
        {
          kind: "flow",
          title: "Building an uncertainty budget",
          steps: [
            { label: "Model", detail: "Write y = f(x1, x2, ...): what you compute from what you measure" },
            { label: "List inputs", detail: "Sensor errors, calibration, DAQ, temperature, mounting, repeatability, resolution" },
            { label: "Standard uncertainties", detail: "Type A from repeats; Type B from datasheets (divide by root 3) and certificates (divide by k)" },
            { label: "Sensitivity", detail: "c_i = partial derivative; 1 for additive terms" },
            { label: "Combine", detail: "Root sum of squares; check which terms dominate" },
            { label: "Expand and report", detail: "U = k u_c, state k and the coverage" },
          ],
          caption: "Steps from JCGM 100. The budget table is the document a customer's metrologist or an accreditation assessor will ask for.",
        },
        { kind: "sources", refs: ["aw09-r1", "aw09-r3", "aw09-r12", "aw09-r10", "aw09-r9"] },
      ],
    },
    {
      layer: "applied",
      title: "A torque uncertainty budget and an efficiency figure",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "GUM budget: 100 N·m on a 250 N·m class 0.05 flange transducer (illustrative)",
          given: md`Illustrative rig from lesson 1. Measured torque about **100 N·m** on a **250 N·m** flange transducer, accuracy class 0.05. Test cell temperature may differ from the calibration temperature by up to **10 K**. Inputs: linearity including hysteresis 0.05 % FS; TK0 0.05 % FS per 10 K; TKC 0.05 % of reading per 10 K; calibration certificate $U = 0.02$ % of reading at $k = 2$; amplifier accuracy 0.02 % FS; parasitic bending estimated at plus or minus 0.1 N·m from the alignment tolerance; ten repeated readings with $s = 0.08$ N·m.`,
          steps: [
            { md: md`**Linearity and hysteresis:** $a = 0.0005 \times 250 = 0.125$ N·m, rectangular: $u = 0.125/\sqrt{3} = 0.0722$ N·m.` },
            { md: md`**TK0 (zero drift over 10 K):** $a = 0.125$ N·m, $u = 0.0722$ N·m. **TKC (span drift):** $a = 0.0005 \times 100 = 0.05$ N·m, $u = 0.0289$ N·m.` },
            { md: md`**Calibration:** $U = 0.0002 \times 100 = 0.02$ N·m at $k = 2$, so $u = 0.010$ N·m. **Amplifier:** $a = 0.0002 \times 250 = 0.05$, $u = 0.0289$ N·m. **Parasitic bending:** $a = 0.1$, $u = 0.0577$ N·m. **Repeatability (Type A):** $u = 0.08/\sqrt{10} = 0.0253$ N·m.` },
            { md: md`**Combine** (all sensitivity coefficients 1): $u_c = \sqrt{0.0722^2 + 0.0722^2 + 0.0289^2 + 0.010^2 + 0.0289^2 + 0.0577^2 + 0.0253^2} = \sqrt{0.01616} = 0.127$ N·m.` },
            { md: md`**Expand:** $U = 2 \times 0.127 = 0.25$ N·m at $k = 2$, about **0.25 % of reading**. The two full-scale terms (linearity, TK0) and the alignment term are 85 % of the variance; better calibration would barely help. Holding cell temperature within 3 K of calibration and tightening alignment would.` },
          ],
          result: md`Report: **100.00 N·m plus or minus 0.25 N·m (k = 2, approximately 95 % coverage)**. At 20 N·m the full-scale terms stay the same size, so the relative uncertainty grows to about 1.2 %: the reason for a small-range second transducer.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Where the variance comes from (100 N·m budget)",
          xKey: "input",
          xLabel: "Input quantity",
          yLabel: "Share of combined variance (%)",
          series: [{ key: "share", label: "Share of u_c squared" }],
          data: [
            { input: "Linearity", share: 32.2 },
            { input: "TK0", share: 32.2 },
            { input: "Parasitic", share: 20.6 },
            { input: "TKC", share: 5.2 },
            { input: "Amplifier", share: 5.2 },
            { input: "Repeat", share: 4.0 },
            { input: "Calibration", share: 0.6 },
          ],
          caption: "Squares of the standard uncertainties divided by their sum. Quadrature means the top three terms decide the answer.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Propagate into actuator efficiency (illustrative)",
          given: md`Efficiency $\eta = T\omega/P_{el}$ measured at 80.0 %. Relative standard uncertainties: torque 0.127 % (from the budget above), speed 0.010 %, electrical power from a power analyser 0.100 %.`,
          steps: [
            { md: md`Relative combined uncertainty: $\sqrt{0.127^2 + 0.010^2 + 0.100^2}$ %.`, hidden: true, check: { prompt: "Relative standard uncertainty of efficiency", answer: 0.162, unit: "%", tolerance: { abs: 0.002 } } },
            { md: md`Absolute standard uncertainty: $0.80 \times 0.00162 = 0.0013$, so 0.13 percentage points.` },
            { md: md`Expanded at $k = 2$: $2 \times 0.13$ percentage points.`, hidden: true, check: { prompt: "Expanded uncertainty of efficiency", answer: 0.26, unit: "percentage points", tolerance: { abs: 0.01 } } },
          ],
          result: md`$\eta = 80.0\,\% \pm 0.26$ points ($k = 2$). A firmware change that moves efficiency by 0.2 points on a single run cannot be called a regression from this rig without repeats or a paired comparison.`,
        },
        {
          kind: "question",
          question: {
            id: "aw09-l02-p1",
            type: "numeric",
            prompt: md`A load cell has sensitivity 2.0 mV/V and rated load 5 kN, excited at 5 V. What output voltage does it give at 1.5 kN? (mV)`,
            answer: 3,
            tolerance: { abs: 0.01 },
            unit: "mV",
            explanation: md`$V_{\text{out}} = S\,V_{\text{ex}}\,F/F_{\text{nom}} = 2.0 \times 5 \times 1.5/5 = 3.0$ mV. Full scale would be 10 mV.`,
            concepts: ["aw09.wheatstone-bridge"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Measurement quality on a real bench",
      blocks: [
        {
          kind: "md",
          md: md`### How labs actually do it

Mature labs keep an **uncertainty budget per measurement chain** (sensor, cable, amplifier, DAQ channel) as a controlled document, update it when any element changes, and quote it in reports. In practice many robotics and startup labs have none: they quote the sensor's headline class and stop. Calibration certificates come from accredited labs (lesson 4). Power analysers for electrical input are specified separately and often dominate efficiency uncertainty at low power factor. Strain-gauge amplifiers and DAQ (HBK, Kistler, Dewesoft, NI and others) store sensor sensitivity and shunt values; IEEE 1451.4 **TEDS** lets a sensor identify itself and its calibration to the DAQ, which removes manual entry errors.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Headline class taken as total uncertainty.** **Zero not re-taken** after warm-up, so TK0 sits in every reading. **Four-wire instead of six-wire** connection on long cables. **Mains-frequency pickup** on unshielded cables near inverters (the inverter is the DUT, so this is common). **Side loads** on a linear actuator rig reaching the load cell through a stiff fixture. **Efficiency differences reported** without uncertainty, then acted on.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Product implication for Afterwave",
          md: md`Bench memory should store, with each channel, the sensor serial, the calibration certificate reference and the chain's uncertainty. Then Ripple can refuse to call a regression smaller than the measurement can resolve, and a report can say why. That is a concrete difference from generic data platforms that store numbers without their quality.`,
        },
        {
          kind: "checklist",
          title: "Before you trust a torque or force number",
          items: [
            "Sensor range versus the actual operating torques or forces (relative error at low load)",
            "Datasheet definition of the accuracy class: per component or total?",
            "Calibration certificate: date, lab accreditation, uncertainty and k, as-found data",
            "Temperature of the sensor during test versus calibration temperature",
            "Six-wire connection, shielding, amplifier type and filter settings",
            "Zero procedure and shunt calibration before each test campaign",
            "A written uncertainty budget with the dominant terms identified",
          ],
        },
        {
          kind: "ask",
          title: "Questions for a customer's test lead",
          items: [
            "What is the expanded uncertainty of your efficiency numbers at the operating points you report?",
            "Which term dominates your torque budget?",
            "Do you store sensor serials and calibration data alongside the measurements, or separately?",
            "What is the smallest change between two firmware versions you would believe from one run?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to Ismail's counterpart at a customer, in four or five sentences, why adding uncertainties in quadrature means that a better calibration certificate would not improve their torque measurement much.",
          keyPoints: [
            "Independent standard uncertainties combine as the square root of the sum of squares",
            "Squaring makes the largest terms dominate the total",
            "In a typical budget the full-scale sensor terms and alignment dominate, the calibration term is small",
            "Improvement comes from attacking the dominant term (temperature control, alignment, smaller range)",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw09-l02-p2",
            type: "short",
            prompt: md`Draft the uncertainty section of a one-page Afterwave platform datasheet for the actuator rig of lesson 1. Give the torque channel's expanded uncertainty at two operating points, the dominant terms, the conditions under which the figure holds, and one sentence on how bench memory uses the figure. Label all numbers illustrative.`,
            rubric: [
              "States expanded uncertainty with k = 2 and coverage, at a high and a low torque point, consistent with the lesson budget (about 0.25 N·m, roughly 0.25 % at 100 N·m and about 1 % at 20 N·m)",
              "Names the dominant terms (linearity/hysteresis, TK0, parasitic loads) and notes calibration is minor",
              "States conditions: temperature band versus calibration, alignment tolerance, warm-up and zeroing, calibration validity",
              "Mentions the small-range option or dual-range transducer for low-torque work",
              "Explains that each stored channel carries its uncertainty so regressions below it are not flagged",
              "Labels the numbers illustrative and avoids invented certifications or customers",
            ],
            modelAnswer: md`**Torque measurement uncertainty (illustrative, to be confirmed at commissioning)**

- Channel: 250 N·m flange transducer, accuracy class 0.05, six-wire carrier-frequency amplifier.
- Expanded uncertainty ($k = 2$, about 95 %): **plus or minus 0.25 N·m**. That is **0.25 % at 100 N·m** and **about 1.2 % at 20 N·m**. Optional 50 N·m transducer for friction and light-load efficiency.
- Dominant terms: linearity and hysteresis (32 % of variance), zero temperature drift (32 %), parasitic bending from alignment (21 %). Calibration contributes under 1 %.
- Valid when: sensor within 10 K of calibration temperature after a 30-minute warm-up and re-zero; alignment within the stated tolerance after DUT changeover; calibration certificate within its interval.
- In bench memory: every stored torque sample carries this uncertainty and the certificate reference, so Ripple does not call a regression smaller than the measurement can resolve, and every report states the figure.`,
            explanation: md`A datasheet uncertainty statement must give the number, the coverage, the conditions and the dominant terms. Linking it to how the software uses it turns metrology into a product feature.`,
            concepts: ["aw09.gum-budget", "aw09.accuracy-class"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw09-l02-q1",
      type: "numeric",
      prompt: md`A 350 Ω foil gauge with gauge factor 2.1 sees 800 µm/m. What is its resistance change? (Ω, 3 decimals)`,
      answer: 0.588,
      tolerance: { abs: 0.002 },
      unit: "Ω",
      explanation: md`$\Delta R = GF\,\varepsilon\,R = 2.1 \times 800 \times 10^{-6} \times 350 = 0.588$ Ω.`,
      concepts: ["aw09.strain-gauge"],
      difficulty: 1,
    },
    {
      id: "aw09-l02-q2",
      type: "numeric",
      prompt: md`A datasheet gives linearity plus or minus 0.06 N·m with no distribution stated. What standard uncertainty do you enter in the budget? (N·m, 4 decimals)`,
      answer: 0.0346,
      tolerance: { abs: 0.0002 },
      unit: "N·m",
      explanation: md`Treat as rectangular: $u = a/\sqrt{3} = 0.06/1.732 = 0.0346$ N·m.`,
      concepts: ["aw09.gum-budget"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw09-l02-q3",
      type: "numeric",
      prompt: md`A budget has three standard uncertainties: 0.30, 0.40 and 0.12 N·m. What is the expanded uncertainty at k = 2? (N·m, 2 decimals)`,
      answer: 1.03,
      tolerance: { abs: 0.01 },
      unit: "N·m",
      explanation: md`$u_c = \sqrt{0.09 + 0.16 + 0.0144} = \sqrt{0.2644} = 0.514$; $U = 1.03$ N·m. The 0.12 term changes the total by only 1.5 %.`,
      concepts: ["aw09.gum-budget"],
      difficulty: 2,
    },
    {
      id: "aw09-l02-q4",
      type: "mcq",
      prompt: md`Why do torque transducer cables use six wires instead of four?`,
      options: [
        "To carry a second redundant signal",
        "So sense lines measure the excitation at the bridge, cancelling cable resistance and supply drift",
        "To power the rotor electronics",
        "To provide a shield ground",
      ],
      answer: 1,
      explanation: md`The bridge output is ratiometric to the excitation actually at the bridge. Sense lines measure that voltage, so voltage drop along long cables and their temperature changes do not appear as a sensitivity error.`,
      concepts: ["aw09.wheatstone-bridge"],
      difficulty: 1,
    },
    {
      id: "aw09-l02-q5",
      type: "multi",
      prompt: md`Which errors grow in relative terms (percent of reading) as the measured torque falls well below full scale? (Select all.)`,
      options: ["Linearity specified as percent of full scale", "TK0 (zero drift)", "TKC (span drift)", "Amplifier error specified as percent of full scale"],
      answer: [0, 1, 3],
      explanation: md`Terms specified as percent of full scale are fixed in N·m, so their share of a small reading grows. TKC is percent of reading and stays constant in relative terms.`,
      concepts: ["aw09.accuracy-class"],
      difficulty: 2,
    },
    {
      id: "aw09-l02-q6",
      type: "decision",
      prompt: md`A customer reports that firmware 2.3 lowered actuator efficiency from 81.2 % to 80.9 % on one run each. Their efficiency uncertainty is plus or minus 0.3 points (k = 2). What do you recommend before anyone retests the whole suite?`,
      options: [
        { text: "Flag it as a regression and rerun all dependent tests", score: 0.1, feedback: "The difference equals the uncertainty of one measurement; the difference of two independent runs is even less certain. You would spend rig hours chasing noise." },
        { text: "Run repeated, interleaved measurements of both versions on the same mounting and compare the means with their uncertainties", score: 1, feedback: "Paired, interleaved repeats cancel many systematic terms (mounting, sensor drift) and shrink the random part. Then decide." },
        { text: "Ignore it: 0.3 points is too small to matter", score: 0.3, feedback: "It might be real and matter for thermal margins. Decide with data, not by dismissal." },
      ],
      explanation: md`The uncertainty of a difference of two independent results is about $\sqrt{2}$ times each one's. Interleaved paired comparisons on one setup are the standard way to resolve small changes.`,
      concepts: ["aw09.derived-uncertainty", "aw09.gum-budget"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw09-l02-f1", front: "Gauge factor equation", back: md`$\Delta R/R = GF\,\varepsilon$; foil gauges $GF \approx 2$.`, concepts: ["aw09.strain-gauge"] },
    { id: "aw09-l02-f2", front: "Typical load cell sensitivity", back: "1 to 3 mV/V at rated load; 2 mV/V at 10 V excitation gives 20 mV full scale.", concepts: ["aw09.wheatstone-bridge"] },
    { id: "aw09-l02-f3", front: "TK0 vs TKC", back: "TK0: temperature effect on zero, percent of full scale per 10 K. TKC: temperature effect on span, percent of reading per 10 K.", concepts: ["aw09.accuracy-class"] },
    { id: "aw09-l02-f4", front: "Type A vs Type B", back: "Type A: from statistics of your own repeated readings. Type B: from other information (datasheet, certificate, resolution).", concepts: ["aw09.gum-budget"] },
    { id: "aw09-l02-f5", front: "Rectangular limit to standard uncertainty", back: md`$u = a/\sqrt{3}$ for a plus-or-minus $a$ limit.`, concepts: ["aw09.gum-budget"] },
    { id: "aw09-l02-f6", front: "Expanded uncertainty", back: md`$U = k u_c$, $k = 2$ for about 95 %. Always state $k$.`, concepts: ["aw09.gum-budget"] },
    { id: "aw09-l02-f7", front: "Uncertainty of efficiency", back: "Relative uncertainties of torque, speed and electrical power add in quadrature.", concepts: ["aw09.derived-uncertainty"] },
  ],
};

export default lesson;
