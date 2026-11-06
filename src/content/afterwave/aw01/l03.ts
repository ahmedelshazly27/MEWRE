import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw01-l03",
  title: "Reliability testing: life tests, Weibull, MTBF and accelerated testing",
  summary:
    "The mathematics reliability engineers use every week: reliability, hazard and the bathtub curve; the Weibull distribution and B10 life; MTBF and its confidence bounds; zero-failure demonstration tests; Arrhenius and Coffin-Manson acceleration factors; and what HALT and HASS do and do not tell you.",
  minutes: 90,
  objectives: [
    "Compute reliability, hazard rate and B10 life from Weibull parameters, and read beta as infant mortality, random or wear-out",
    "Compute an MTBF point estimate and its chi-squared lower confidence bound, and explain why MTBF misleads for wear-out",
    "Size a zero-failure demonstration test with Weibull and an Arrhenius acceleration factor",
    "Compute a Coffin-Manson acceleration factor for thermal cycling",
    "Explain what HALT finds, what HASS screens, and why neither predicts life",
  ],
  concepts: [
    { id: "aw01.weibull-reliability", name: "Weibull reliability", description: "Two-parameter life distribution R(t) = exp(-(t/eta)^beta); beta sets the failure pattern, eta the characteristic life where 63.2 % have failed.", competency: "aw-test", related: ["m04.weibull"] },
    { id: "aw01.mtbf", name: "MTBF and failure rate", description: "Mean time between failures, total operating time divided by failures; meaningful as a constant-hazard summary, misleading for wear-out.", competency: "aw-test", related: ["aw01.weibull-reliability"] },
    { id: "aw01.demonstration-testing", name: "Reliability demonstration testing", description: "Sizing sample count and test duration so that zero (or few) failures demonstrate a reliability target at a stated confidence.", competency: "aw-test", related: ["aw01.weibull-reliability"] },
    { id: "aw01.arrhenius", name: "Arrhenius acceleration", description: "Temperature acceleration of thermally activated failure mechanisms: AF = exp((Ea/k)(1/T_use - 1/T_test)).", competency: "aw-test" },
    { id: "aw01.coffin-manson", name: "Coffin-Manson acceleration", description: "Thermal-cycling fatigue acceleration: AF = (delta T_test / delta T_use)^n for solder joints, wire bonds and other fatigue mechanisms.", competency: "aw-test", related: ["aw01.arrhenius"] },
    { id: "aw01.halt-hass", name: "HALT and HASS", description: "Highly accelerated life test (step-stress to find design margins and weak points) and highly accelerated stress screen (production screen inside those margins).", competency: "aw-test" },
  ],
  sections: [
    {
      layer: "theory",
      title: "The mathematics of life",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Life tests are the longest, most expensive tests in any hardware lab: months of chamber and rig time per sample set. They are also where context matters most: a failure at hour 1,900 is only useful if you know exactly what that unit saw. Yusuf's background is inverter reliability; reliability engineers will be among Afterwave's sharpest evaluators. And when a firmware change lands mid-life-test, the question "does this invalidate 1,400 chamber hours?" is a Ripple question worth tens of thousands of euros.`,
        },
        {
          kind: "md",
          md: md`### Reliability, hazard and the bathtub

For a population of units, the **reliability** $R(t)$ is the probability a unit survives beyond time $t$; the failure probability is $F(t) = 1 - R(t)$, the density $f(t) = dF/dt$. The **hazard rate** $h(t) = f(t)/R(t)$ is the instantaneous failure rate among survivors. Plotted over life it traces the **bathtub curve**: falling hazard early (infant mortality from manufacturing defects), flat in the middle (random failures), rising at the end (wear-out: fatigue, wear, electromigration, capacity fade).

### The Weibull distribution

Reliability engineers use one distribution for all three regions:`,
        },
        { kind: "equation", formula: "aw01-weibull-reliability" },
        {
          kind: "md",
          md: md`Differentiate and divide by $R$ to get the hazard:`,
        },
        { kind: "equation", formula: "aw01-weibull-hazard" },
        {
          kind: "md",
          md: md`- $\beta < 1$: hazard falls with time, **infant mortality**. Fix the process or screen (burn-in, HASS).
- $\beta = 1$: constant hazard, **random failures**: the exponential distribution, where MTBF is meaningful.
- $\beta > 1$: hazard rises, **wear-out**. Typical: bearings and gears about 1.5 to 3, solder fatigue about 2 to 4 (illustrative ranges; fit your own data).
- $\eta$ (characteristic life) is the time where $R = e^{-1} = 36.8\%$, so 63.2 % have failed, whatever $\beta$ is.

Designers specify life as a **B-life**: $B_{10}$ is the time by which 10 % have failed. Solve $R(t) = 1 - X$:`,
        },
        { kind: "equation", formula: "aw01-bx-life" },
        {
          kind: "md",
          md: md`With $\eta = 60{,}000$ h and $\beta = 2.5$: $B_{10} = 60{,}000 \times 0.10536^{0.4} = 24{,}391$ h and $R(20{,}000\text{ h}) = 0.938$.

**Fitting Weibull to test data** (IEC 61649 describes the methods): rank failure times, assign median ranks $F_i \approx (i - 0.3)/(n + 0.4)$ (Benard's approximation), and plot $\ln(-\ln(1-F))$ against $\ln t$. A straight line confirms Weibull; its slope is $\beta$. Units still running at the end of a test, or removed for other reasons, are **suspensions** (right-censored data) and must be included, otherwise life is underestimated. Maximum likelihood estimation handles suspensions properly and is the default in modern tools.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Weibull reliability R(t) for four shape parameters, characteristic life 60,000 h",
          xKey: "t",
          xLabel: "Operating hours",
          yLabel: "R(t)",
          series: [
            { key: "b07", label: "beta 0.7 (infant mortality)" },
            { key: "b1", label: "beta 1 (random)" },
            { key: "b25", label: "beta 2.5 (wear-out)" },
            { key: "b4", label: "beta 4 (sharp wear-out)" },
          ],
          data: [
            { t: 0, b07: 1, b1: 1, b25: 1, b4: 1 },
            { t: 10000, b07: 0.752, b1: 0.846, b25: 0.989, b4: 0.999 },
            { t: 20000, b07: 0.629, b1: 0.717, b25: 0.938, b4: 0.988 },
            { t: 30000, b07: 0.54, b1: 0.607, b25: 0.838, b4: 0.939 },
            { t: 40000, b07: 0.471, b1: 0.513, b25: 0.696, b4: 0.821 },
            { t: 50000, b07: 0.415, b1: 0.435, b25: 0.53, b4: 0.617 },
            { t: 60000, b07: 0.368, b1: 0.368, b25: 0.368, b4: 0.368 },
            { t: 80000, b07: 0.294, b1: 0.264, b25: 0.128, b4: 0.042 },
            { t: 100000, b07: 0.239, b1: 0.189, b25: 0.028, b4: 0 },
          ],
          caption: "All curves cross at eta = 60,000 h (R = 36.8 %). Low beta loses units early; high beta keeps almost all units alive and then loses them together. Same eta, very different warranty exposure.",
        },
        {
          kind: "widget",
          widget: "weibull",
          props: { k: 2.5, c: 6 },
          caption: "Track 0 widget built for wind speeds, but the curve is the same Weibull density. Read shape k as beta and scale c as eta (in units of 10,000 h, so c = 6 means 60,000 h); ignore the turbine power curve and AEP. Move k from 1 to 4 and watch failures concentrate around eta.",
        },
        {
          kind: "md",
          md: md`### MTBF: useful and dangerous

For repairable systems or constant hazard ($\beta = 1$), the point estimate is total operating time over failures:`,
        },
        { kind: "equation", formula: "aw01-mtbf" },
        {
          kind: "md",
          md: md`Few failures give a wide uncertainty. For a time-terminated test, the one-sided lower confidence bound uses the chi-squared distribution with $2r + 2$ degrees of freedom:`,
        },
        { kind: "equation", formula: "aw01-mtbf-lower" },
        {
          kind: "md",
          md: md`Two traps. First, with $R(t) = e^{-t/\mathrm{MTBF}}$ only 36.8 % of units survive to the MTBF: MTBF is not "the life". Second, for wear-out items an MTBF computed from early test hours is meaningless, because the hazard is still low and will rise. A supplier quoting "MTBF 200,000 h" for a gearbox is quoting a random-failure model for a wear-out part.

### Demonstrating reliability with zero failures

To show reliability $R$ at confidence $C$ by testing $n$ units for one target life with zero failures (the **success-run** test):`,
        },
        { kind: "equation", formula: "aw01-success-run" },
        {
          kind: "md",
          md: md`$R = 0.90$ at $C = 90\%$ needs $\ln 0.1/\ln 0.9 = 21.9$, so **22 units**; $R = 0.95$ needs **45**. Hardware is expensive, so teams test fewer units for longer. If the Weibull $\beta$ is known (from history or physics), testing each unit to $m$ times the target life with zero failures gives (the Weibull extension, sometimes called the Lipson equality):`,
        },
        { kind: "equation", formula: "aw01-weibull-demo" },
        {
          kind: "md",
          md: md`With $\beta = 2$, testing to twice the life cuts the sample by $2^2 = 4$. The result is only as good as the assumed $\beta$.

### Accelerated testing

Nobody waits 20,000 h. Accelerated life testing raises a stress to make the **same failure mechanism** happen faster, and an acceleration factor (AF) converts test hours to field hours. For thermally activated mechanisms (diffusion, corrosion, electrolytic capacitor dry-out, many semiconductor mechanisms), the **Arrhenius** model:`,
        },
        { kind: "equation", formula: "aw01-arrhenius" },
        {
          kind: "md",
          md: md`Temperatures in kelvin; Boltzmann's constant $k = 8.617 \times 10^{-5}$ eV/K. The activation energy $E_a$ is mechanism-specific (JEDEC JEP122 tabulates typical values; 0.5 to 1.0 eV is a common range for semiconductor mechanisms) and dominates the answer: from 55 °C use to 105 °C test, $E_a = 0.5$ eV gives AF 10.4, 0.7 eV gives 26.4, 1.0 eV gives 107.

For fatigue under temperature swings (solder joints, wire bonds, die attach in power modules), the **Coffin-Manson** model in its simple engineering form:`,
        },
        { kind: "equation", formula: "aw01-coffin-manson" },
        {
          kind: "md",
          md: md`The exponent $n$ depends on material and mechanism (often quoted around 2 for lead-free solder and higher for some wire-bond and ductile-metal mechanisms; the Norris-Landzberg extension adds cycle frequency and maximum temperature terms). Humidity has its own model (Peck), and voltage and vibration have inverse power laws.

**The condition that makes all of this valid**: the accelerated stress must activate the same mechanism as the field, and must not activate new ones. Run a 125 °C test on a part with a 120 °C glass-transition material and you will find a failure that never happens in the field.

### HALT and HASS

- **HALT** (highly accelerated life test) steps up stresses (cold, hot, rapid thermal transitions, broadband vibration on a repetitive-shock table, then combined) until the product stops working (operating limit) and then breaks (destruct limit). Each failure is analysed and, where cheap, designed out. The output is **margin** and a list of weak points, not a life number.
- **HASS** (highly accelerated stress screen) applies stresses inside the HALT margins to every production unit (or a sample) to precipitate latent manufacturing defects, the $\beta < 1$ population. A **proof of screen** shows that the screen does not consume a meaningful fraction of a good unit's life.`,
        },
        {
          kind: "matrix",
          title: "Which reliability test answers which question",
          xAxis: ["Find weaknesses", "Quantify life"],
          yAxis: ["Production", "Design"],
          cells: [
            { label: "HALT", detail: "Step stress on prototypes to find operating and destruct limits and weak points" },
            { label: "Accelerated life test and demonstration", detail: "Arrhenius or Coffin-Manson AF, Weibull fit, B10 and R at confidence" },
            { label: "HASS and burn-in", detail: "Screen latent defects (beta below 1) inside HALT margins" },
            { label: "Ongoing reliability test and field data", detail: "Sample production lots on life tests; Weibull on warranty returns" },
          ],
          caption: "Top row: design phase. Bottom row: production. Left: qualitative discovery. Right: quantitative life.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Planning a demonstration test for an inverter control board",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Zero-failure Weibull demonstration with Arrhenius acceleration",
          given: md`Illustrative requirement for a drive inverter control board: $R = 0.95$ at 20,000 operating hours with 90 % confidence. Field board temperature 55 °C. Dominant mechanism assumed thermally activated, $E_a = 0.7$ eV; $\beta = 2$ assumed from previous generations. Available: 12 boards and a chamber at 105 °C (below every material limit on the board).`,
          steps: [
            { md: md`**Success run without acceleration:** $n = \ln 0.1/\ln 0.95 = 44.9$, so 45 boards for 20,000 h each. Impossible.` },
            { md: md`**Weibull extension with 12 boards:** solve $n = \ln(1-C)/(m^\beta \ln R)$ for $m$: $m^2 = \ln 0.1/(12 \ln 0.95) = 2.3026/(12 \times 0.05129) = 3.741$, so $m = 1.934$. Each board must survive $1.934 \times 20{,}000 = 38{,}683$ field-equivalent hours.` },
            { md: md`**Acceleration factor:** $T_\text{use} = 328.15$ K, $T_\text{test} = 378.15$ K. $1/T_\text{use} - 1/T_\text{test} = 0.0030474 - 0.0026444 = 0.00040293$ K$^{-1}$. $E_a/k = 0.7/8.617 \times 10^{-5} = 8{,}123$ K. $\mathrm{AF} = e^{8{,}123 \times 0.00040293} = e^{3.273} = 26.4$.` },
            { md: md`**Chamber time:** $38{,}683/26.4 = 1{,}466$ h per board, about **61 days** with all 12 boards in the chamber together and powered.` },
            { md: md`**Sensitivity:** if the true $E_a$ is 0.5 eV, AF is 10.4 and the same evidence needs 3,734 h (156 days). If $\beta$ is really 1.5, $m = 3.741^{1/1.5} = 2.41$ and the test needs 48,200 field-equivalent hours. State both assumptions in the plan.` },
          ],
          result: md`12 boards, zero failures, 1,466 h at 105 °C demonstrates R = 0.95 at 20,000 h with 90 % confidence, under the assumptions Ea = 0.7 eV and beta = 2. Two months of chamber time: a firmware or hardware change in the middle of it is a costly event.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Thermal cycling for a power module solder layer",
          given: md`Illustrative: a drive unit sees about 2 large thermal cycles per day with $\Delta T_\text{use} = 40$ K at the solder layer, over 15 years. The lab cycles modules between $-40$ °C and $+60$ °C ($\Delta T_\text{test} = 100$ K), one cycle per hour. Assume Coffin-Manson exponent $n = 2.5$.`,
          steps: [
            { md: md`Field cycles to cover: $2 \times 365 \times 15 = 10{,}950$ cycles.` },
            { md: md`$\mathrm{AF} = (100/40)^{2.5} = 2.5^{2.5}$.` },
            { md: md`$\mathrm{AF} =$ **9.88**.`, hidden: true, check: { prompt: "Coffin-Manson acceleration factor", answer: 9.88, tolerance: { rel: 0.01 } } },
            { md: md`Test cycles $= 10{,}950/9.88 =$ **1,108 cycles**, about 1,108 h or 46 days at one cycle per hour.`, hidden: true, check: { prompt: "Test cycles needed for one field life", answer: 1108, unit: "cycles", tolerance: { rel: 0.01 } } },
          ],
          result: md`One field life in about 1,100 cycles. With n = 2 the AF would be 6.25 and the test 1,752 cycles: the exponent, like Ea, must be justified from literature or the lab's own data.`,
        },
        {
          kind: "question",
          question: {
            id: "aw01-l03-p1",
            type: "numeric",
            prompt: md`24 actuators run 5,000 h each on an endurance rig; 3 fail and are counted as random failures. Using $\chi^2_{0.90,\,8} = 13.36$, what is the 90 % lower confidence bound on MTBF (h, nearest 100)?`,
            answer: 18000,
            tolerance: { abs: 100 },
            unit: "h",
            explanation: md`$T = 24 \times 5{,}000 = 120{,}000$ h; point MTBF $= 120{,}000/3 = 40{,}000$ h. Lower bound $= 2T/\chi^2_{0.90,\,2r+2} = 240{,}000/13.36 = 17{,}960$ h. With 3 failures the true MTBF could plausibly be less than half the point estimate. And if these are wear-out failures, MTBF is the wrong model entirely: fit a Weibull.`,
            concepts: ["aw01.mtbf"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Reliability engineering in a real lab",
      blocks: [
        {
          kind: "md",
          md: md`### Who, what and with which tools

- **Reliability engineers** own life-test design, sample sizing, acceleration models, Weibull analysis of test and field data, and reliability predictions.
- **Standards and guidelines** they work to: IEC 61649 (Weibull analysis), IEC 60068-2 series (environmental tests), JEDEC JESD22-A104 (temperature cycling) and JESD47 (stress-test qualification for integrated circuits), AEC-Q100 and Q101 (automotive electronic components), the ECPE AQG 324 guideline for automotive power modules, MIL-STD-810 (environmental engineering). Robotics and humanoids have few domain-specific life-test standards yet, so teams borrow from automotive.
- **Tools:** Weibull++ (HBK ReliaSoft), Minitab and JMP reliability modules, Python libraries; chambers from Weiss Technik, ESPEC and others; HALT chambers with repetitive-shock tables.
- **Data:** a life test produces months of time series per unit plus a handful of failure events. The failure is cheap to record; the context (what that unit experienced, which firmware it ran when, which other units were in the chamber, what changed mid-test) is what is usually lost.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong in reliability testing",
          md: md`- **Mixed failure modes in one Weibull**: fitting solder fatigue and connector fretting together gives a meaningless beta. Separate by mode after failure analysis.
- **Ignoring suspensions**: dropping still-running units underestimates life.
- **Acceleration beyond the mechanism**: a new failure mechanism appears at the stress level and is "fixed" at great cost.
- **MTBF for wear-out parts**: suppliers quote it, buyers believe it.
- **Mid-test changes**: firmware updated on half the units in week 6, not recorded per unit. The test now has two populations and nobody knows which is which.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Typical parameter values are illustrative",
          md: md`Activation energies, Coffin-Manson exponents and beta ranges in this lesson are typical textbook values used for illustration. Real programmes justify them from the specific mechanism (JEDEC JEP122 and supplier data for semiconductors, the lab's own prior Weibull fits for mechanical parts). Never present an AF to a customer without its assumptions.`,
        },
        { kind: "sources", refs: ["aw01-r4", "aw01-r5", "aw01-r6", "aw01-r7", "aw01-r8", "aw01-r9", "aw01-r10", "aw01-r11"] },
        {
          kind: "checklist",
          title: "Review checklist for a life-test plan",
          items: [
            "Target stated as R at time t with confidence C (or B-life), and the field duty cycle it comes from",
            "Failure mechanism named, acceleration model chosen for it, parameters justified",
            "Stress below material limits that would introduce new mechanisms",
            "Sample size and duration computed, with beta and Ea sensitivities",
            "Failure definition (parametric drift limits, not just 'dead'), inspection intervals",
            "Per-unit configuration log including any mid-test change",
            "Analysis method: Weibull with suspensions, separated by failure mode",
          ],
        },
        {
          kind: "ask",
          title: "Questions for a reliability lead",
          items: [
            "Which life tests are running now, how many chamber or rig hours do they represent, and what happens to them if firmware changes?",
            "How do you justify acceleration factors, and have you ever validated one against field returns?",
            "How do you separate failure modes before fitting Weibull?",
            "Can you reconstruct exactly what each unit experienced from start of test to failure?",
          ],
        },
        {
          kind: "xref",
          to: "m04.weibull",
          note: "Track 0 uses the same Weibull distribution for wind speed; the mathematics (shape and scale) is identical.",
        },
        {
          kind: "question",
          question: {
            id: "aw01-l03-p2",
            type: "short",
            prompt: md`Write a one-page **life-test plan summary** for an illustrative humanoid hip actuator. Assumed target: $B_{10} \ge 10{,}000$ operating hours at 90 % confidence; field winding temperature 70 °C, typical duty includes about 50 load cycles per minute of walking. You have 10 actuators and 3 months of rig time. Choose the stresses, acceleration model(s) and parameters (labelled as assumptions), compute sample duration with a zero-failure Weibull demonstration, define failure, and state what must be logged per unit so the test survives a mid-test firmware change.`,
            rubric: [
              "Converts B10 at 90 % confidence into R = 0.90 at 10,000 h, C = 0.90 and applies the zero-failure Weibull formula with a stated beta",
              "Chooses acceleration consistent with the mechanisms (mechanical cycling for gear and bearing wear, temperature for insulation or electronics) and states the assumptions",
              "Computes per-unit test duration and checks it fits 3 months of rig time",
              "Defines failure parametrically (for example backlash growth, torque constant drop, efficiency loss, winding resistance change), not only 'stops working'",
              "Lists per-unit logging: serial, firmware versions with timestamps, fixture, stresses seen, inspections, so populations can be split if firmware changes",
              "Flags sensitivity to beta and the acceleration parameters",
            ],
            modelAnswer: md`**Target:** B10 at least 10,000 h at 90 % confidence means R = 0.90 at 10,000 h, C = 0.90. **Assumed beta = 2** (wear-out of gear and bearings; from prior actuator generations, to be checked).

**Sample duration (zero failures, n = 10):** $m^2 = \ln 0.1/(10 \ln 0.9) = 2.3026/1.0536 = 2.185$, $m = 1.478$. Each unit must reach $1.478 \times 10{,}000 = 14{,}780$ field-equivalent hours.

**Acceleration:** the dominant mechanism for the hip is mechanical wear and fatigue, driven by load cycles, not temperature. Run the duty cycle at 1.5 times field cycle rate (75 cycles per minute, verified to stay within the strain wave gear's speed rating) and with a load profile at 1.2 times the field torque. Assume an inverse power law with exponent 3 for gear and bearing fatigue: AF from load $= 1.2^3 = 1.73$; AF from rate $= 1.5$ (pure time compression, valid only if temperature is held at field level); total about 2.6. Rig hours per unit $= 14{,}780/2.6 \approx 5{,}700$ h, too long for 3 months (2,160 h). **Decision:** add rigs or units, accept a lower demonstrated reliability, or justify higher acceleration with an HALT-style margin study first. With 3 months only, demonstrate R at a reduced confidence and continue the test as ongoing evidence.

**Failure definition:** output backlash growth over 50 % of initial, torque constant drop over 5 %, efficiency drop over 3 points at the reference point, winding resistance change over 10 %, or any functional stop. Inspections every 250 h.

**Per-unit log:** serial, build, fixture, start time, firmware versions with the timestamp of every change, cycles and torque history, temperatures, inspection results. If firmware changes on some units, split them into populations and analyse separately or argue (with data) that the change does not affect the mechanism. All parameters are assumptions to confirm with the reliability team.`,
            explanation: md`A strong plan turns a B-life target into R and C, matches the acceleration model to the mechanism, does the arithmetic and notices when it does not fit, and designs the logging so later changes do not destroy the evidence.`,
            concepts: ["aw01.demonstration-testing", "aw01.weibull-reliability", "aw01.coffin-manson"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a robotics CTO why '200,000 h MTBF' on a gearbox datasheet tells him almost nothing about how many of his actuators will fail in the first two years.",
          keyPoints: [
            "MTBF assumes a constant hazard (beta = 1), which is the random-failure region only",
            "Gearboxes wear out: beta above 1, hazard rising with time",
            "Even under the exponential model only 36.8 % survive to the MTBF",
            "What he needs is a Weibull fit or B10 life for his duty cycle, with confidence bounds",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw01-l03-q1",
      type: "numeric",
      prompt: md`Weibull with $\eta = 40{,}000$ h and $\beta = 2$. What is $R(10{,}000\text{ h})$? (3 decimals)`,
      answer: 0.939,
      tolerance: { abs: 0.002 },
      explanation: md`$R = \exp(-(10{,}000/40{,}000)^2) = \exp(-0.0625) = 0.939$.`,
      concepts: ["aw01.weibull-reliability"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw01-l03-q2",
      type: "numeric",
      prompt: md`Same distribution ($\eta = 40{,}000$ h, $\beta = 2$). What is the $B_{10}$ life in hours (nearest 100)?`,
      answer: 13000,
      tolerance: { abs: 100 },
      unit: "h",
      explanation: md`$B_{10} = 40{,}000 \times (-\ln 0.9)^{1/2} = 40{,}000 \times 0.3246 = 12{,}984$ h.`,
      concepts: ["aw01.weibull-reliability"],
      difficulty: 2,
    },
    {
      id: "aw01-l03-q3",
      type: "mcq",
      prompt: "A Weibull fit of early field returns gives beta = 0.6. What does that suggest?",
      options: ["Wear-out: redesign the part", "Infant mortality: look at manufacturing and screening", "Random failures: MTBF is the right metric", "The data must be wrong"],
      answer: 1,
      explanation: md`Beta below 1 means a falling hazard: a weak subpopulation failing early. Typical causes are process defects; responses are process fixes and screens (burn-in, HASS).`,
      concepts: ["aw01.weibull-reliability", "aw01.halt-hass"],
      difficulty: 1,
    },
    {
      id: "aw01-l03-q4",
      type: "numeric",
      prompt: md`Arrhenius: $E_a = 0.7$ eV, use 55 °C, test 125 °C. Acceleration factor (nearest whole number)? Use $k = 8.617 \times 10^{-5}$ eV/K.`,
      answer: 78,
      tolerance: { abs: 1 },
      explanation: md`$1/328.15 - 1/398.15 = 0.00053574$; $\times 8{,}123 = 4.352$; $e^{4.352} = 77.6$. Going from 105 to 125 °C triples the AF, which is why labs push temperature as far as materials allow.`,
      concepts: ["aw01.arrhenius"],
      difficulty: 2,
    },
    {
      id: "aw01-l03-q5",
      type: "numeric",
      prompt: md`How many units must survive one target life with zero failures to demonstrate $R = 0.90$ at 80 % confidence?`,
      answer: 16,
      tolerance: { abs: 0 },
      unit: "units",
      explanation: md`$n = \ln 0.2/\ln 0.9 = 1.6094/0.10536 = 15.3$, round up to 16.`,
      concepts: ["aw01.demonstration-testing"],
      difficulty: 2,
    },
    {
      id: "aw01-l03-q6",
      type: "multi",
      prompt: "Which statements about HALT are true? (Select all that apply.)",
      options: [
        "It steps stresses up until the product stops working and then until it breaks",
        "It produces a B10 life estimate",
        "Its outputs are operating limits, destruct limits and weak points",
        "It sets the window inside which HASS may screen production units",
      ],
      answer: [0, 2, 3],
      explanation: md`HALT is qualitative discovery of margin and weaknesses. Life estimates come from accelerated life tests with a valid acceleration model.`,
      concepts: ["aw01.halt-hass"],
      difficulty: 1,
    },
    {
      id: "aw01-l03-q7",
      type: "decision",
      prompt: md`Week 6 of an 8-week accelerated life test on 12 inverter boards. Firmware 4.3 must go to 6 of the boards for an unrelated programme milestone. You advise the reliability lead. What is best?`,
      options: [
        { text: "Update all 12 and carry on; firmware rarely affects hardware life.", score: 0.1, feedback: "Firmware changes switching patterns, thermal load and derating: it can affect the mechanism. And you lose the ability to tell." },
        { text: "Update 6, log the exact time and units, analyse the two populations separately, and judge with data whether the change touches the stressed mechanism (for example by comparing temperatures and currents before and after).", score: 1, feedback: "Preserves the evidence and makes the change an explicit, analysable event: the Ripple logic applied to a life test." },
        { text: "Restart the test from zero with 4.3 on all boards.", score: 0.4, feedback: "Safe but costs 6 weeks of chamber time, possibly for a change that does not affect the mechanism." },
      ],
      explanation: md`The right answer depends on whether the change affects the stressed mechanism, which can only be judged if the change is logged per unit with its exact time and the signals before and after are comparable.`,
      concepts: ["aw01.demonstration-testing"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw01-l03-f1", front: "Weibull reliability", back: md`$R(t) = \exp[-(t/\eta)^\beta]$`, concepts: ["aw01.weibull-reliability"] },
    { id: "aw01-l03-f2", front: "Beta below 1, equal to 1, above 1", back: "Infant mortality, random failures, wear-out.", concepts: ["aw01.weibull-reliability"] },
    { id: "aw01-l03-f3", front: "Eta (characteristic life)", back: "Time at which 63.2 % have failed, for any beta.", concepts: ["aw01.weibull-reliability"] },
    { id: "aw01-l03-f4", front: "Success-run sample size", back: md`$n = \ln(1-C)/\ln R$; R = 0.90 at C = 90 % needs 22 units`, concepts: ["aw01.demonstration-testing"] },
    { id: "aw01-l03-f5", front: "Arrhenius AF", back: md`$\mathrm{AF} = \exp[(E_a/k)(1/T_u - 1/T_t)]$, temperatures in K, $k = 8.617\times10^{-5}$ eV/K`, concepts: ["aw01.arrhenius"] },
    { id: "aw01-l03-f6", front: "Coffin-Manson AF", back: md`$\mathrm{AF} = (\Delta T_t/\Delta T_u)^n$`, concepts: ["aw01.coffin-manson"] },
    { id: "aw01-l03-f7", front: "HALT vs HASS", back: "HALT finds design margins and weak points; HASS screens production units inside those margins.", concepts: ["aw01.halt-hass"] },
    { id: "aw01-l03-f8", front: "Fraction surviving to MTBF (exponential)", back: "36.8 %", concepts: ["aw01.mtbf"] },
  ],
};

export default lesson;
