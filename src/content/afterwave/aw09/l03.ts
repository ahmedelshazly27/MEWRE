import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw09-l03",
  title: "Thermal chambers, cycling and environmental testing",
  summary:
    "How climatic chambers and shakers stress hardware: thermal time constants, ramp lag and soak time, chamber heat load with powered DUTs, humidity and condensation, Coffin-Manson acceleration for thermal cycling, and the basics of sine and random vibration, with the IEC 60068 family as the common language.",
  minutes: 75,
  objectives: [
    "Compute a part's thermal time constant, its lag behind a chamber ramp and the soak time to a stabilisation band",
    "Estimate chamber heating and cooling load with fixtures and a powered DUT",
    "Compute a dew point and plan a chamber sequence that avoids condensation",
    "Use the Coffin-Manson relation to translate test cycles into field cycles, and state its weakness",
    "Convert between sine acceleration and displacement and compute g rms from a random PSD",
  ],
  concepts: [
    { id: "aw09.thermal-time-constant", name: "Thermal time constant and lumped capacitance", description: "tau = m cp / (h A) sets how fast a part follows chamber air; valid when the Biot number is small.", competency: "aw-platforms" },
    { id: "aw09.ramp-soak", name: "Ramp rate, lag and soak time", description: "A part lags a chamber ramp by up to r tau and needs tau ln(gap/band) to stabilise; soak usually dominates cycle time.", competency: "aw-platforms", related: ["aw09.thermal-time-constant"] },
    { id: "aw09.chamber-heat-load", name: "Chamber heat load", description: "Heat capacity of DUT, fixture and cabling times ramp rate, plus DUT dissipation and wall losses, against the chamber's rated capacity.", competency: "aw-platforms", related: ["aw09.ramp-soak"] },
    { id: "aw09.humidity-condensation", name: "Humidity, dew point and condensation", description: "Surfaces below the air dew point collect water or frost; damp heat tests use this deliberately, other tests must avoid it.", competency: "aw-platforms" },
    { id: "aw09.thermal-cycling-af", name: "Thermal cycling acceleration (Coffin-Manson)", description: "Fatigue life scales with a power of the temperature swing; AF = (dT_test/dT_field)^n with a failure-mode-specific exponent.", competency: "aw-platforms" },
    { id: "aw09.vibration-testing", name: "Sine and random vibration testing", description: "Shakers reproduce sine sweeps, random PSD profiles and shocks; displacement limits at low frequency, force and acceleration at high frequency.", competency: "aw-platforms" },
  ],
  sections: [
    {
      layer: "theory",
      title: "Heat, water and vibration: the physics behind environmental tests",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Batteries, drives, inverters and robot actuators are qualified across temperature, humidity and vibration, and thermal cycling is where much of a hardware team's calendar goes: a single campaign can tie up a chamber for weeks. Yusuf's reliability background sits here. For Afterwave this is a natural place for Ripple (which thermal tests must be rerun after a change, and which can be skipped) and for bench memory (chamber profile, part temperature and DUT signals on one clock). And an Afterwave actuator platform would very likely need an integrated chamber or a chamber-compatible design.`,
        },
        {
          kind: "md",
          md: md`### How a part follows a chamber

A **climatic chamber** controls air temperature (typically -70 to +180 °C) and often humidity (about 10 to 95 % RH within a temperature window). The DUT does not follow the air instantly. For a thermally compact part, the lumped-capacitance model is accurate enough:`,
        },
        { kind: "equation", formula: "aw09-lumped-tau" },
        { kind: "equation", formula: "aw09-biot" },
        {
          kind: "md",
          md: md`During a linear ramp the part falls behind, and when the air reaches setpoint the part still has a gap to close:`,
        },
        { kind: "equation", formula: "aw09-ramp-lag" },
        { kind: "equation", formula: "aw09-soak-time" },
        {
          kind: "chart",
          chart: "line",
          title: "Chamber air vs part temperature: 100 K ramp at 5 K/min, tau = 20 min",
          xKey: "t",
          xLabel: "Time (min)",
          yLabel: "Temperature (°C)",
          series: [
            { key: "air", label: "Chamber air" },
            { key: "part", label: "Part (lumped, tau 20 min)" },
          ],
          data: [
            { t: 0, air: -40, part: -40 },
            { t: 10, air: 10, part: -29.3 },
            { t: 20, air: 60, part: -3.2 },
            { t: 30, air: 60, part: 21.7 },
            { t: 40, air: 60, part: 36.7 },
            { t: 60, air: 60, part: 51.4 },
            { t: 80, air: 60, part: 56.9 },
            { t: 100, air: 60, part: 58.8 },
            { t: 120, air: 60, part: 59.6 },
          ],
          caption: "When the air reaches +60 °C the part is still at -3 °C. It is within 1 K about 83 minutes later. A faster chamber ramp barely changes this: the part's tau does.",
        },
        {
          kind: "md",
          md: md`### Heat load

The chamber must move heat out of (or into) everything inside it, and a powered DUT adds its losses to the cooling load:`,
        },
        { kind: "equation", formula: "aw09-chamber-heat-load" },
        {
          kind: "md",
          md: md`Chamber datasheets quote ramp rates empty or with a standard aluminium load; ask for the rated ramp at your payload. Compressor-based chambers reach about -40 to -70 °C; **liquid nitrogen** boost gives fast cooling at a consumable cost; **thermal shock** chambers move the DUT between a hot and a cold zone in seconds (IEC 60068-2-14 test Na) instead of ramping.

### Humidity and condensation

Relative humidity is the ratio of water vapour present to the saturation amount at that temperature. A surface colder than the **dew point** of the surrounding air collects water:`,
        },
        { kind: "equation", formula: "aw09-dew-point" },
        {
          kind: "md",
          md: md`**Damp heat** tests (IEC 60068-2-78 steady state, -2-30 cyclic) deliberately hold high humidity, and cyclic damp heat produces condensation on purpose to drive corrosion and leakage failures. Everywhere else, condensation is a test artefact: when ramping up from cold, the part is colder than the air and its dew point; open the door on a cold part and lab air frosts it. Fixes: dry-air or nitrogen purge, humidity control off during cold phases, warm-up above room dew point before opening.

### Thermal cycling and acceleration

Thermal cycling fatigues joints between materials with different expansion coefficients (solder, bond wires on power modules, adhesives, press fits, seals). The common acceleration model:`,
        },
        { kind: "equation", formula: "aw09-coffin-manson" },
        {
          kind: "callout",
          tone: "unverified",
          title: "Exponents are failure-mode specific",
          md: md`Values of $n$ around 2 for lead-free solder joints and higher for brittle failures are often quoted in reliability literature, but they depend on alloy, geometry, dwell time and ramp rate (extended Norris-Landzberg models add frequency and peak temperature terms). Treat any $n$ without a source and a matching failure mode as an assumption, and say so in the test plan.`,
        },
        {
          kind: "md",
          md: md`### Vibration basics

**Electrodynamic shakers** (a voice coil driving an armature) cover roughly 5 to 3,000 Hz; **servo-hydraulic** shakers give long stroke at low frequency. Three test families: **sine** (sweeps to find resonances, dwells to fatigue them; IEC 60068-2-6), **random** (a power spectral density profile reproducing broadband road or machine vibration; IEC 60068-2-64), **shock** (half-sine or other pulses; IEC 60068-2-27). Automotive and drive electronics often borrow ISO 16750 profiles.`,
        },
        { kind: "equation", formula: "aw09-sine-displacement" },
        { kind: "equation", formula: "aw09-grms" },
        {
          kind: "md",
          md: md`**Combined environments** (temperature plus vibration in a chamber over a shaker, or temperature plus humidity plus power cycling) find failures that single-stress tests miss, at the price of more complex fixtures and data. **HALT** (highly accelerated life test) pushes stress steps until failure to find design margins; it is a discovery tool, not a qualification test.`,
        },
        { kind: "sources", refs: ["aw09-r14", "aw09-r15", "aw09-r16", "aw09-r17"] },
      ],
    },
    {
      layer: "applied",
      title: "Planning a thermal cycling campaign for an actuator",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Cycle time and acceleration for an actuator thermal cycling test (illustrative)",
          given: md`Illustrative test, not a customer programme. Actuator mass **6 kg**, mixed aluminium, steel and copper, $c_p \approx 600$ J/(kg·K). Chamber forced air $h = 25$ W/(m²·K), wetted area **0.12 m²**. Profile: **-40 to +60 °C** (100 K swing), air ramp **5 K/min**, stabilisation band **1 K** on a part thermocouple, then a **30-minute** powered functional check at each extreme. Plan **100 cycles**. Field swing estimated at **40 K** per day; assume $n = 2$.`,
          steps: [
            { md: md`**Time constant.** $\tau = 6 \times 600/(25 \times 0.12) = 3{,}600/3 = 1{,}200$ s = **20 min**. Biot check: an aluminium housing (k about 150 W/(m·K)) with 10 mm walls gives $Bi \approx 25 \times 0.01/150 = 0.002$, so the housing is near isothermal. Windings and gearbox oil inside will lag more: put a thermocouple on the winding or use the drive's winding temperature signal.` },
            { md: md`**Ramp.** 100 K at 5 K/min takes 20 min, exactly one $\tau$. The part moves $r\tau e^{-1} = 100 \times 0.368 = 36.8$ K, leaving a **63.2 K** gap when the air arrives.` },
            { md: md`**Soak.** $t = \tau \ln(63.2/1) = 20 \times 4.146 = 82.9$ min. Soak is four times the ramp.` },
            { md: md`**One cycle.** $2 \times (20 + 82.9 + 30) = 266$ min = **4.43 h**. **100 cycles** = 443 h = **18.5 days** of chamber time, before failures, interruptions or functional test reruns.` },
            { md: md`**Acceleration.** $AF = (100/40)^2 = 6.25$. 100 test cycles represent about **625 field days** of thermal cycling for this failure mode, under the stated exponent.` },
            { md: md`**Where to save time.** A faster chamber ramp barely helps (the part, not the air, is slow). What helps: higher airflow over the part (raise $h$), a lighter fixture, a stabilisation band of 2 K instead of 1 K (saves $\tau \ln 2 = 14$ min per extreme), controlling the air with a brief overshoot, or running several DUTs in parallel. Each choice must be justified against the test standard and the failure mechanism.` },
          ],
          result: md`About **4.4 h per cycle** and **18.5 days** for 100 cycles, dominated by soak. This is the kind of campaign where knowing which DUTs truly need retesting after a change is worth a lot: each avoided rerun returns weeks of chamber time.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Chamber cooling load with a powered inverter (illustrative)",
          given: md`Illustrative. An 8 kg aluminium inverter ($c_p = 900$ J/(kg·K)) on a 15 kg steel fixture ($c_p = 480$) is cooled at 2 K/min while operating, dissipating 250 W. Ignore wall losses.`,
          steps: [
            { md: md`Heat capacity: $8 \times 900 + 15 \times 480 = 7{,}200 + 7{,}200 = 14{,}400$ J/K.` },
            { md: md`Mass pull-down power: $14{,}400 \times 2/60$ W.`, hidden: true, check: { prompt: "Cooling power for the masses", answer: 480, unit: "W", tolerance: { rel: 0.01 } } },
            { md: md`Total cooling load including DUT dissipation.`, hidden: true, check: { prompt: "Total cooling load", answer: 730, unit: "W", tolerance: { rel: 0.01 } } },
          ],
          result: md`About 730 W of net cooling before wall losses. Half of it is the fixture: fixture design is chamber capacity.`,
        },
        {
          kind: "question",
          question: {
            id: "aw09-l03-p1",
            type: "numeric",
            prompt: md`Lab air is at 25 °C and 60 % RH. What is the dew point? Use the Magnus formula with a = 17.62 and b = 243.12 °C. (°C, 1 decimal)`,
            answer: 16.7,
            tolerance: { abs: 0.2 },
            unit: "°C",
            explanation: md`$\gamma = \ln 0.6 + 17.62 \times 25/(243.12 + 25) = -0.511 + 1.643 = 1.132$; $T_d = 243.12 \times 1.132/(17.62 - 1.132) = 16.7$ °C. Any part below 16.7 °C exposed to this air collects condensation.`,
            concepts: ["aw09.humidity-condensation"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running environmental test campaigns",
      blocks: [
        {
          kind: "md",
          md: md`### Who and what

Environmental test is often a shared service inside a hardware company or an external lab (accredited to ISO/IEC 17025 for the test methods they offer). Chamber makers supply temperature and humidity chambers, walk-in rooms and thermal shock units; shaker makers supply electrodynamic and hydraulic systems with their own controllers. A typical **test specification** names the standard method, the profile (temperatures, ramps, dwells, cycles, humidity), the DUT state (powered or not, the functional checks), the monitoring channels, the pass criteria and the failure handling. The chamber controller logs air temperature and humidity; the DUT's own data come from a separate DAQ or the DUT's CAN bus: two logs that must share one clock, or the part-temperature-versus-failure analysis is guesswork.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Controlling on chamber air** and counting dwell from when the air arrives. **No thermocouple on the critical internal component.** **Condensation** during warm-up from cold, logged as a DUT failure. **Fixture resonances** in vibration tests that put more energy into the DUT than the profile intended. **Chamber logs and DUT logs on different clocks**, so a fault at minute 3,412 cannot be placed on the profile. **Interrupted cycles** (power cut, alarm) with no rule on whether the cycle counts.`,
        },
        {
          kind: "checklist",
          title: "Environmental test plan checks",
          items: [
            "Standard and method named (for example IEC 60068-2-14 Nb, -2-30 Db, -2-64 Fh), with any deviations written down",
            "Part thermocouple location and the stabilisation criterion defined on the part",
            "Chamber rated ramp at the actual payload, including fixture and powered DUT dissipation",
            "Dew point management on ramps and before door opening",
            "Fixture survey on the shaker (resonance search) before the DUT test",
            "One clock for chamber, shaker controller and DUT data",
            "Rules for interrupted cycles, failures and restart",
          ],
        },
        {
          kind: "ask",
          title: "Questions for a customer's environmental test lead",
          items: [
            "How many chamber-days did your last qualification campaign take, and how many were reruns?",
            "When firmware changes, which environmental tests do you repeat, and how do you decide?",
            "How do you line up chamber profile data with DUT signals today?",
            "Which acceleration exponent do you use for thermal cycling, and where does it come from?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a product manager why buying a chamber with a faster ramp rate did not shorten your thermal cycling test, and what would.",
          keyPoints: [
            "The part follows the air with its own time constant, m cp over h A",
            "When the air reaches setpoint the part still has a large gap; the soak dominates",
            "Soak time depends on tau and the stabilisation band, not on the air ramp",
            "Shorten by raising airflow over the part, lightening fixtures, a justified wider band, or parallel DUTs",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw09-l03-p2",
            type: "short",
            prompt: md`Write a short Ripple use-case paragraph (for a sales one-pager aimed at a drive or battery test lead) built on thermal cycling: what the pain is in hours, what Ripple would decide after a firmware change, what data it needs from the chamber and DUT, and one honest limitation. Use illustrative numbers from this lesson.`,
            rubric: [
              "Quantifies the pain in chamber time with numbers consistent with the lesson (hours per cycle, days per campaign) and labels them illustrative",
              "Describes the Ripple decision: which thermal tests are affected by the change and which can be skipped, with a reason",
              "Names the data needed: chamber profile, part temperature, DUT signals on one clock, test and firmware version history",
              "States an honest limitation (for example hardware or material changes always need full requalification, or the model needs history)",
              "Written in the buyer's language, short, no invented customers or results",
            ],
            modelAnswer: md`**Thermal cycling is where your calendar goes.** A 100-cycle, -40 to +60 °C campaign on a 6 kg drive spends about 4.4 hours per cycle, mostly waiting for the part to soak: 18 days of chamber time (illustrative). When firmware changes, most teams rerun the whole campaign because nobody can show which results still hold. **Ripple** links each thermal test to what it actually exercises (the power-stage control loop, the derating table, the thermal model) and to what changed in the new firmware. If the change touched the CAN diagnostics but not the derating or switching behaviour, Ripple proposes keeping the previous thermal results and rerunning a short functional check at the extremes, and says why. It needs the chamber profile, part temperature and DUT signals on one clock (Lockstep) and the test and version history (bench memory). **Limitation:** a hardware, material or supplier change still means full requalification; Ripple narrows firmware-driven reruns, it does not replace physics.`,
            explanation: md`A credible use case quantifies the pain, states the decision, names the data and admits the boundary. The boundary (hardware changes need physics) is what makes the rest believable to a reliability engineer.`,
            concepts: ["aw09.ramp-soak", "aw09.thermal-cycling-af"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw09-l03-q1",
      type: "numeric",
      prompt: md`A 4 kg aluminium housing ($c_p = 900$ J/(kg·K)) with 0.10 m² area sits in chamber air with $h = 20$ W/(m²·K). What is its thermal time constant? (min)`,
      answer: 30,
      tolerance: { rel: 0.01 },
      unit: "min",
      explanation: md`$\tau = 4 \times 900/(20 \times 0.10) = 3{,}600/2 = 1{,}800$ s = 30 min.`,
      concepts: ["aw09.thermal-time-constant"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw09-l03-q2",
      type: "numeric",
      prompt: md`A part with $\tau = 25$ min is 50 K from setpoint when the chamber air arrives. How long until it is within 2 K? (min, 1 decimal)`,
      answer: 80.5,
      tolerance: { abs: 0.3 },
      unit: "min",
      explanation: md`$t = \tau \ln(50/2) = 25 \times \ln 25 = 25 \times 3.219 = 80.5$ min.`,
      concepts: ["aw09.ramp-soak"],
      difficulty: 2,
    },
    {
      id: "aw09-l03-q3",
      type: "numeric",
      prompt: md`Using Coffin-Manson with $n = 2.5$, how many field cycles of 30 K does one test cycle of 120 K represent?`,
      answer: 32,
      tolerance: { rel: 0.01 },
      unit: "field cycles",
      explanation: md`$AF = (120/30)^{2.5} = 4^{2.5} = 32$. The result is very sensitive to $n$: at $n = 2$ it would be 16.`,
      concepts: ["aw09.thermal-cycling-af"],
      difficulty: 2,
    },
    {
      id: "aw09-l03-q4",
      type: "numeric",
      prompt: md`A flat random vibration PSD of 0.02 g²/Hz runs from 10 to 1,010 Hz. What is the overall g rms? (1 decimal)`,
      answer: 4.5,
      tolerance: { abs: 0.05 },
      unit: "g",
      explanation: md`$g_{\text{rms}} = \sqrt{0.02 \times 1{,}000} = \sqrt{20} = 4.47$ g.`,
      concepts: ["aw09.vibration-testing"],
      difficulty: 1,
    },
    {
      id: "aw09-l03-q5",
      type: "mcq",
      prompt: md`During a ramp up from -30 °C in humid air, water appears on the DUT. What is the most likely cause?`,
      options: [
        "The chamber humidity sensor is faulty",
        "The part surface is below the dew point of the warmer chamber air",
        "The DUT is leaking coolant",
        "The ramp rate is too slow",
      ],
      answer: 1,
      explanation: md`The part lags the air; while it is colder than the air's dew point it condenses (or frosts) water. Control humidity off or purge with dry air during cold-to-warm transitions unless condensation is the intended test.`,
      concepts: ["aw09.humidity-condensation", "aw09.ramp-soak"],
      difficulty: 1,
    },
    {
      id: "aw09-l03-q6",
      type: "multi",
      prompt: md`Which actions shorten the soak time of a thermal cycle? (Select all.)`,
      options: [
        "Increasing airflow over the DUT",
        "Using a lighter fixture",
        "Doubling the chamber air ramp rate",
        "Widening a justified stabilisation band from 1 K to 2 K",
        "Adding a heavy steel shelf under the DUT",
      ],
      answer: [0, 1, 3],
      explanation: md`Soak is $\tau \ln(\Delta T_0/\delta)$. Airflow raises $h$, a lighter fixture lowers $m c_p$, a wider band lowers the log term. A faster air ramp changes the starting gap only a little; a heavy shelf adds thermal mass.`,
      concepts: ["aw09.ramp-soak", "aw09.chamber-heat-load"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw09-l03-f1", front: "Thermal time constant", back: md`$\tau = m c_p/(hA)$; 63 % of the gap closed after $\tau$, 95 % after $3\tau$.`, concepts: ["aw09.thermal-time-constant"] },
    { id: "aw09-l03-f2", front: "Soak time to a band", back: md`$t = \tau \ln(\Delta T_0/\delta)$. Usually the longest part of a thermal cycle.`, concepts: ["aw09.ramp-soak"] },
    { id: "aw09-l03-f3", front: "Lag behind a ramp", back: md`Asymptotically $r\tau$: 5 K/min with $\tau = 20$ min means a 100 K lag.`, concepts: ["aw09.ramp-soak"] },
    { id: "aw09-l03-f4", front: "When does a DUT condense?", back: "When its surface is below the dew point of the surrounding air, typically on warm-up from cold or when the door opens on a cold part.", concepts: ["aw09.humidity-condensation"] },
    { id: "aw09-l03-f5", front: "Coffin-Manson", back: md`$AF = (\Delta T_{\text{test}}/\Delta T_{\text{field}})^n$; the exponent is failure-mode specific.`, concepts: ["aw09.thermal-cycling-af"] },
    { id: "aw09-l03-f6", front: "Random vibration g rms", back: md`$\sqrt{\int \text{PSD}\,df}$; flat PSD: $\sqrt{\text{PSD}\cdot\Delta f}$.`, concepts: ["aw09.vibration-testing"] },
    { id: "aw09-l03-f7", front: "IEC 60068-2 tests to know", back: "-2-1 cold, -2-2 dry heat, -2-14 change of temperature, -2-30 cyclic damp heat, -2-78 steady damp heat, -2-6 sine, -2-64 random, -2-27 shock.", concepts: ["aw09.vibration-testing", "aw09.humidity-condensation"] },
  ],
};

export default lesson;
