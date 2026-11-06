import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz05-l02",
  title: "Wind loads and stow: aerodynamics, galloping, thresholds and fail-safe logic",
  summary:
    "Why trackers stow, at what angle and on what signal: dynamic pressure and air density at 45 °C, force and moment coefficients, the chord-squared scaling of torque, buffeting and torsional galloping, wind profiles and gust factors, vendor thresholds and anemometer logic with averaging, hysteresis and voting, and the fail-safe behaviour that must hold when communications, sensors or power fail.",
  minutes: 85,
  objectives: [
    "You can compute dynamic pressure, wind force and torsional moment per metre of tracker row, and explain why 2P rows carry about four times the torque of 1P rows.",
    "You can explain torsional galloping as a self-excited instability and why it shapes the stow angle.",
    "You can convert a vendor wind threshold between heights and averaging periods using a wind profile and a gust factor.",
    "You can specify stow trigger logic: averaging window, threshold, hysteresis, minimum stow time, sensor voting and forecast triggers.",
    "You can list the fail-safe states a tracker must reach on loss of communication, sensor failure, low battery and grid loss.",
  ],
  concepts: [
    {
      id: "mz05.wind-loads",
      name: "Wind loads on tracker rows",
      description:
        "Dynamic pressure q = 0.5 rho V^2 times force and moment coefficients that depend on tilt, row position and turbulence. Torsional moment per metre scales with chord squared, so 2P rows carry about four times the torque of 1P rows at the same wind.",
      competency: "mz-control",
      related: ["m02.wind-stow"],
    },
    {
      id: "mz05.torsional-galloping",
      name: "Torsional galloping",
      description:
        "A self-excited aeroelastic instability: above a critical wind speed the aerodynamic moment feeds energy into the row's twisting motion faster than structural damping removes it, and the amplitude grows until something breaks. Most sensitive near flat tilt for many designs.",
      competency: "mz-control",
      related: ["mz05.wind-loads", "mz05.stow-angle"],
    },
    {
      id: "mz05.stow-angle",
      name: "Stow angle",
      description:
        "The position a tracker takes to survive an event. Chosen from wind-tunnel static and dynamic tests: a compromise between static load (lowest near flat) and aeroelastic stability (often better at moderate tilt); hail stow is steep (60 to 77 degrees in vendor material).",
      competency: "mz-control",
      related: ["mz05.torsional-galloping", "m02.wind-stow"],
    },
    {
      id: "mz05.stow-trigger",
      name: "Stow trigger logic",
      description:
        "The rules that start and end a stow: a measured or forecast wind statistic (3-s gust or 10-min mean) above a threshold at a stated height, with sensor voting, hysteresis, a minimum stow duration and a lead time that covers the time to rotate.",
      competency: "mz-control",
      related: ["mz05.stow-angle", "mz05.fail-safe-stow"],
    },
    {
      id: "mz05.fail-safe-stow",
      name: "Fail-safe stow",
      description:
        "The design principle that loss of communication, sensor faults, low battery or grid loss drive each row to its safe position on its own, without any command from the network or SCADA.",
      competency: "mz-control",
      related: ["mz05.stow-trigger"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The aerodynamics a stow algorithm is protecting against",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Any control function Mizan sells will ask a tracker to move away from tracking or to stay stowed longer or shorter. The tracker vendor and the plant's lenders will judge it on one question: does it ever make the structure less safe? You need to understand the loads and the vendor's stow logic well enough to design functions that only ever add safety margin, and to discuss thresholds, gust factors and galloping with a structural engineer without bluffing.`,
        },
        {
          kind: "xref",
          to: "m02-l05",
          note: "Track 0 introduces the shamal, stow thresholds, flat vs steep stow and the classic failure modes (dusty anemometers, communication loss, dead batteries). This lesson adds the mechanics and the trigger logic.",
        },
        {
          kind: "md",
          md: md`### Dynamic pressure, and why heat helps a little

Every wind load starts from the dynamic pressure of the free stream:`,
        },
        { kind: "equation", formula: "mz05-dynamic-pressure" },
        { kind: "equation", formula: "mz05-air-density" },
        {
          kind: "md",
          md: md`At 15 °C and sea level $\rho = 1.225$ kg/m³; at 45 °C it is $1.109$ kg/m³, about 9% lower. So the same 20 m/s wind on a Kuwaiti summer afternoon produces 222 Pa instead of 245 Pa. Design codes use a standard density, so this is margin, not a reason to raise thresholds. Wind speed enters squared: going from 18 to 22 m/s raises load by $(22/18)^2 = 1.49$, almost 50%.

### Forces and moments on a row

Per metre of row with chord $c$ (the module width across the axis, about 2.3 m for 1P and 4.6 m for 2P), wind tunnel tests give dimensionless coefficients that depend on the tilt angle, the row's position in the array and the turbulence:`,
        },
        { kind: "equation", formula: "mz05-wind-force-moment" },
        {
          kind: "md",
          md: md`Three things follow.

1. **Torque scales with chord squared.** Double the chord (1P to 2P) and torque per metre rises fourfold at the same wind and coefficient. 2P designs need stiffer tubes, more drives or locks.
2. **Exterior rows see the most.** The first rows facing the wind and the edge rows carry much higher coefficients than sheltered interior rows. Wind-tunnel reports give zones; designs often use heavier components or different stow behaviour at the edges.
3. **Static is not the whole load.** Turbulence buffets the rows (a dynamic amplification over the static value), and above some speed the row can become aeroelastically unstable.

### Torsional galloping

A tracker row is a long, slender, twistable plate. When it twists by a small angle, the aerodynamic moment changes. If the moment changes in a way that pushes the row further in the direction it is already moving, it acts as **negative aerodynamic damping**. Below a critical wind speed structural damping wins and motion dies out; above it the aerodynamic forcing wins, the twist grows cycle after cycle, and the row can fail in minutes (cracked modules, twisted tubes, broken drives). This is a self-excited instability, not a response to a big gust, so a design can survive a strong steady wind at one angle and fail in a weaker one at another.

The governing group is the **reduced velocity**:`,
        },
        { kind: "equation", formula: "mz05-reduced-velocity" },
        {
          kind: "md",
          md: md`Instability starts above a critical reduced velocity that depends on the cross-section and tilt and is found in the wind tunnel. Long rows with a single central drive have a low torsional natural frequency, so their critical wind speed is low. Illustration only: with $f_t = 1$ Hz, $c = 2.3$ m and a critical reduced velocity of 8, onset would be near 18 m/s. For many designs the most sensitive angles are near flat, which is why many trackers do not stow flat in high wind, and why vendors add dampers, multiple drives or row locks. Rohr, Bourke and Banks (2015) is the commonly cited early paper on torsional instability of single-axis trackers.

### Stow angles in vendor material

| Mode | Typical angle | What it optimises | Source |
|---|---|---|---|
| Wind stow, flat or near flat | 0 to a few degrees | Lowest static drag and lift; needs a design stable at low tilt | General practice |
| Wind stow, moderate tilt | design-specific | Aeroelastic stability; accepts higher static load | Wind-tunnel driven |
| Wind and hail stow (Nextracker) | about 60 to 75° | Forecast-triggered; Hail Pro stows up to 4 times faster and works through grid outages | Research brief 3.3 |
| Hail stow (Array DuraTrack Hail XP) | 77°, without batteries | Hail impact | Research brief 3.3 (May 2025) |
| SmartStow and HailStow (GameChange Genius) | vendor-specific | Wind and hail, HailStow verified by VDE | Research brief 3.3 |
| Wind stow speed (Arctech, Manah I, Oman) | 22 m/s stow speed | Wind | Research brief 3.3 |

The physics of hail stow: for hail falling vertically, the normal component of impact velocity on a plane tilted at angle $\beta$ is $v\cos\beta$, so the normal impact energy scales with $\cos^2\beta$: at 75° it is 7% of the flat value. Wind-driven hail is not vertical, so real benefit is smaller and depends on wind direction.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Vendor thresholds and angles",
          md: md`The table quotes public product material summarised at search-snippet level in the research brief (November 2026), not vendor manuals. The averaging period and height behind "22 m/s" at Manah I are not stated in the source. Stow angles and thresholds are project-specific and come from the vendor's wind-tunnel report for that design; always request it.`,
        },
        {
          kind: "md",
          md: md`### Turning a threshold into a trigger

A threshold means nothing without its **statistic** and **height**. The WMO convention is the 10-minute mean at 10 m; a gust is usually the highest 3-second average. Site anemometers on tracker plants are often mounted lower than 10 m. Two conversions matter:`,
        },
        { kind: "equation", formula: "mz05-wind-profile" },
        { kind: "equation", formula: "mz05-gust-factor" },
        {
          kind: "md",
          md: md`Over open, flat desert a power-law exponent near 0.14 and a 3-s gust factor around 1.4 to 1.5 at 10 m are reasonable first estimates; both vary with roughness, stability and height (gust factors rise near the ground). They must come from the site met data or the wind study for anything contractual.

**The trigger logic** a good stow function needs:
- **Statistic and window**: for example, stow if the 3-s gust exceeds $V_\text{gust}$ or the 1-minute mean exceeds $V_\text{mean}$.
- **Voting**: several anemometers across the plant; stow the affected zone or the whole plant on 1-out-of-N above threshold (safety-biased) with plausibility checks to reject a failed sensor.
- **Hysteresis and minimum stow time**: release only after the wind stays below a lower threshold for a set time (for example 10 to 30 minutes), or rows cycle in and out of stow and wear the drives.
- **Lead time**: rotation takes minutes; the trigger must fire before the gust, using trends and forecasts, not only the current reading.`,
        },
        { kind: "equation", formula: "mz05-stow-lead-time" },
        {
          kind: "flow",
          title: "Stow state machine (simplified)",
          steps: [
            { label: "Tracking", detail: "Normal algorithm; wind statistics computed continuously" },
            { label: "Alert", detail: "Forecast or trend crosses a pre-alert level; check sensors and communications" },
            { label: "Stowing", detail: "Threshold crossed (any valid sensor) or forecast trigger: all affected rows rotate to stow" },
            { label: "Stowed", detail: "Hold position; drives or locks resist the wind; record max wind and row status" },
            { label: "Release wait", detail: "Wind below release threshold for the hold time; no new trigger" },
            { label: "Return", detail: "Rows resume tracking; log event duration and energy lost" },
          ],
          caption: "Fail-safe branches from every state: loss of communication, sensor fault or low battery sends the row to stow on its own.",
        },
        {
          kind: "md",
          md: md`### Fail-safe stow

The tracker must reach its safe position when the things that normally command it fail:

| Failure | Required behaviour |
|---|---|
| Network controller or SCADA communication lost | Row controller detects a heartbeat timeout and self-stows |
| Anemometer fails or reads implausibly (frozen, dust-clogged) | Treat as unknown wind: stow the zone or switch to a backup sensor |
| Row battery or supply low | Stow while there is still energy to do it |
| Grid outage | Battery or capacitor-backed drives (or a design that needs no battery to reach stow) |

The principle carries straight into lesson 4: any external optimisation layer must fail into the vendor's safe behaviour, never into "keep tracking".`,
        },
        { kind: "sources", refs: ["mz05-r6", "mz05-r7", "mz05-r8", "mz05-r12", "mz05-r13", "mz05-r16", "mz05-r5"] },
      ],
    },
    {
      layer: "applied",
      title: "Loads, heights and gusts with numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Torque on a 2P vs a 1P row, and the threshold at sensor height",
          given: md`Illustrative: a 20 m/s wind at 45 °C. Moment coefficient $C_M = 0.12$ at the relevant tilt (illustrative; real values come from the wind-tunnel report). 2P chord 4.6 m, 1P chord 2.3 m. Each half-row from the central drive is 45 m long. Dynamic amplification factor 2.0 (illustrative). Separately: the vendor's threshold is an 18 m/s 3-s gust at 10 m; the plant's anemometers are at 3 m; power-law exponent $\alpha = 0.14$.`,
          steps: [
            { md: md`**Density.** $\rho = 101{,}325 / (287.05 \times 318.15) = 1.109$ kg/m³.` },
            { md: md`**Dynamic pressure.** $q = 0.5 \times 1.109 \times 20^2 = 222$ Pa (245 Pa at 15 °C).` },
            { md: md`**Moment per metre, 2P.** $M' = q C_M c^2 = 222 \times 0.12 \times 4.6^2 = 222 \times 0.12 \times 21.16 = 563$ N·m/m. **1P:** $222 \times 0.12 \times 5.29 = 141$ N·m/m, a quarter.` },
            { md: md`**At the drive.** Static: $563 \times 45 = 25.4$ kN·m for the 2P half-row against $6.3$ kN·m for 1P. With the illustrative dynamic factor of 2: about 51 kN·m and 13 kN·m.` },
            { md: md`**Threshold at sensor height.** $V_3 = 18 \times (3/10)^{0.14} = 18 \times 0.845 = 15.2$ m/s. If the controller compares the 3 m reading with 18 m/s it would stow late; the trigger at 3 m must be about 15.2 m/s (or the conversion done in software).` },
          ],
          result: md`2P rows need about four times the torque capacity of 1P rows for the same wind, which is why stow logic and drive design differ between them. A threshold copied from a datasheet without its height and averaging period can leave the plant stowing 15 to 20% too late in wind speed, which is 30 to 40% too late in load.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Should the plant pre-stow on tonight's forecast?",
          given: md`Forecast for 02:00: 10-minute mean wind 13 m/s at 10 m. Assume a 3-s gust factor of 1.45 at 10 m and the vendor threshold of an 18 m/s 3-s gust at 10 m. Sensors at 3 m, $\alpha = 0.14$.`,
          steps: [
            {
              md: md`**Expected gust at 10 m.** $V_\text{gust} = G \times \bar V = 1.45 \times 13 = 18.85$ m/s.`,
              hidden: true,
              check: { prompt: "Expected 3-s gust at 10 m", answer: 18.85, unit: "m/s", tolerance: { abs: 0.1 } },
            },
            {
              md: md`**Compare with the threshold.** 18.85 m/s is above 18 m/s, so the forecast alone justifies a pre-emptive stow before 02:00 rather than waiting for a sensor trip.`,
            },
            {
              md: md`**What the 3 m sensors should read in that gust.** $18.85 \times 0.845 = 15.9$ m/s.`,
              hidden: true,
              check: { prompt: "Expected gust at 3 m", answer: 15.9, unit: "m/s", tolerance: { abs: 0.2 } },
            },
          ],
          result: md`Pre-stow at night costs almost no energy (the sun is down) and removes the lead-time risk. The same forecast at noon is a real trade-off between energy lost and risk, which lesson 3 quantifies. Note the gust factor near the ground is usually higher than at 10 m, so 15.9 m/s at 3 m is an estimate, not a bound.`,
        },
        {
          kind: "question",
          question: {
            id: "mz05-l02-p1",
            type: "numeric",
            prompt: md`What is the dynamic pressure (Pa) of a 25 m/s wind in air of density 1.15 kg/m³?`,
            answer: 359.4,
            tolerance: { abs: 1 },
            unit: "Pa",
            explanation: md`$q = 0.5 \rho V^2 = 0.5 \times 1.15 \times 625 = 359.4$ Pa. Compare 222 Pa at 20 m/s and 45 °C: 25% more wind speed, 62% more load.`,
            concepts: ["mz05.wind-loads"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Stow engineering on real projects",
      blocks: [
        {
          kind: "md",
          md: md`**Who does what.** The tracker vendor commissions a **wind-tunnel study** from a specialist boundary-layer wind consultancy: static pressure and force coefficients by row zone and tilt, dynamic (aeroelastic) tests or analysis, critical speeds and the recommended stow strategy. A structural engineer turns that into member and foundation design against the applicable code (ASCE 7 is widely used internationally; the governing code and design wind speed for a Kuwaiti site must be confirmed for each project). Design qualification of the tracker itself is covered by IEC 62817. The EPC integrates the met stations; the O&M contractor runs the stow procedure.

**Documents to request.** Wind-tunnel report (static and dynamic); stow strategy description (angles, thresholds, statistic, height, hysteresis, voting); met station layout and sensor specs; fail-safe behaviour description; commissioning test records for stow (time to stow per block, communication-loss test); stow event logs from operation.

**What goes wrong in the desert.** Cup anemometers wear and stick in dust; ultrasonic sensors avoid moving parts but need clean transducers and heater or power checks. Wireless meshes drop rows in heat or after controller replacements. Batteries in row controllers age fast at high temperature. And the most common commercial complaint: the plant stows too often and too long, so the owner pushes to raise thresholds.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Never sell a higher threshold",
          md: md`Raising a stow threshold above the vendor's wind-tunnel envelope moves risk onto the structure, the warranty and the insurer, for a small energy gain. The legitimate levers are on the other side of the event: faster, evidence-based **release** (shorter hold times when forecasts and sensors agree), **zonal** stow (only the blocks that see the wind), and fewer false trips from bad sensors. Those are product opportunities that never reduce margin.`,
        },
        {
          kind: "checklist",
          title: "Stow logic review checklist",
          items: [
            "Threshold stated with statistic (3-s gust or mean), averaging window and height; conversion to sensor height documented",
            "At least two independent wind sensors per zone, with plausibility checks and a defined action on sensor fault",
            "Measured time to stow the slowest block, and a lead time or forecast trigger that covers it",
            "Hysteresis, release threshold and minimum stow time stated, with the energy cost of each",
            "Fail-safe on heartbeat loss, low battery and grid loss demonstrated at commissioning",
            "Stow events logged with start, end, peak wind, rows not reaching position",
          ],
        },
        {
          kind: "ask",
          title: "Ask the vendor or EPC",
          items: [
            "Show me the wind-tunnel report: critical speeds for galloping at each tilt, and why this stow angle?",
            "At what wind statistic and height is the threshold defined, and how does the controller convert the anemometer reading?",
            "How long does the slowest block take to reach stow, measured, not calculated?",
            "What does a row do when it loses its network controller for 60 seconds? For 10 minutes?",
            "Which stow parameters may the owner change without affecting the warranty, and which may not?",
          ],
        },
        { kind: "scenario", scenario: "mz05-s1" },
        {
          kind: "question",
          question: {
            id: "mz05-l02-p2",
            type: "short",
            prompt: md`Write a one-page "Wind stow control requirements" section that Mizan could offer an IPP for its O&M specification on a Gulf tracker plant. Use placeholder values where the vendor must supply them. It must be safe to hand to the tracker vendor without reducing any of their margins.`,
            rubric: [
              "Defines the trigger with statistic, window and height, and requires the vendor's wind-tunnel values (no invented thresholds above the vendor's)",
              "Requires sensor redundancy, plausibility checks and a defined fault action that is safety-biased",
              "Specifies hysteresis or release threshold and a minimum stow time, and asks for their energy cost to be reported",
              "Requires lead time covering the measured time to stow, using trends or forecasts",
              "Specifies fail-safe behaviour on communication loss, low battery and grid loss, with commissioning tests",
              "Requires event logging and states that any third-party function may only add stow events, never remove or delay vendor stows",
            ],
            modelAnswer: md`**1. Trigger.** Stow is triggered when any valid anemometer in a zone measures a 3-s gust above $V_g$ or a 1-min mean above $V_m$, where $V_g$ and $V_m$ are the vendor's wind-tunnel values converted to sensor height (conversion to be documented). Forecast trigger: stow when the forecast 3-s gust at 10 m exceeds the threshold within the next $T_\text{lead}$, where $T_\text{lead}$ is at least the measured time to stow the slowest block plus 5 minutes. **2. Sensors.** At least two anemometers per zone, ultrasonic preferred; plausibility checks (frozen value, disagreement above X m/s, data gap); on sensor fault, the zone uses the nearest valid sensor or stows. **3. Release.** Rows return to tracking when all valid sensors in the zone are below $V_r$ (vendor value, below $V_g$) for $T_\text{hold}$ minutes; minimum stow time $T_\text{min}$. The O&M contractor reports monthly the number of stow events, hours stowed and estimated energy lost. **4. Fail-safe.** Each row controller self-stows on loss of heartbeat for more than $T_\text{hb}$ seconds, on battery below the level needed to complete a stow, and on grid loss. Demonstrated at commissioning on a sample of rows in each block. **5. Logging.** Event start and end, peak wind, rows not reaching stow and their fault codes. **6. Third-party functions.** Any optimisation or analytics layer may request additional stows or advisory changes only through the vendor's documented interface. It may never suppress, delay or shorten a vendor-triggered stow, and on any fault the vendor logic governs.`,
            explanation: md`A safe stow specification states thresholds with statistic and height, is safety-biased on sensors, controls release, covers lead time and fail-safe, and forbids any third-party layer from weakening vendor stows.`,
            concepts: ["mz05.stow-trigger", "mz05.fail-safe-stow"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain torsional galloping to a commercial manager who thinks the stow threshold is just 'the wind speed the structure can take'.",
          keyPoints: [
            "The row is a long plate that can twist",
            "Above a critical speed the wind feeds energy into the twisting faster than the structure can dissipate it (negative damping)",
            "The motion grows by itself even in a steady wind, so it is not about one big gust",
            "Critical speed depends on angle and stiffness, so the stow angle matters as much as the threshold",
            "That is why thresholds and stow angles come from wind-tunnel tests and are not commercial levers",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz05-l02-q1",
      type: "numeric",
      prompt: md`A tracker vendor moves from 1P rows (chord 2.2 m) to 2P rows (chord 4.4 m) with the same moment coefficient. By what factor does the torsional moment per metre at the same wind rise?`,
      answer: 4,
      tolerance: { abs: 0.05 },
      explanation: md`$M' = q C_M c^2$, so doubling chord multiplies the moment per metre by $2^2 = 4$.`,
      concepts: ["mz05.wind-loads"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz05-l02-q2",
      type: "mcq",
      prompt: md`What distinguishes torsional galloping from a strong-gust overload?`,
      options: [
        "Galloping only happens at night",
        "Galloping is a self-excited instability: motion grows by itself above a critical speed even in steady wind",
        "Galloping is caused by hail",
        "Galloping only affects fixed-tilt structures",
      ],
      answer: 1,
      explanation: md`A gust overload is a forced response to a peak load. Galloping is aeroelastic: the aerodynamic moment acts as negative damping, so the twist amplitude grows each cycle above a critical reduced velocity.`,
      concepts: ["mz05.torsional-galloping"],
      difficulty: 1,
    },
    {
      id: "mz05-l02-q3",
      type: "numeric",
      prompt: md`A vendor threshold is a 3-s gust of 20 m/s at 10 m. Anemometers are mounted at 4 m. With a power-law exponent of 0.14, what threshold (m/s) should be applied to the 4 m reading?`,
      answer: 17.6,
      tolerance: { abs: 0.15 },
      unit: "m/s",
      explanation: md`$V_4 = 20 \times (4/10)^{0.14} = 20 \times 0.880 = 17.6$ m/s. Applying 20 m/s at 4 m would stow late.`,
      concepts: ["mz05.stow-trigger"],
      difficulty: 2,
    },
    {
      id: "mz05-l02-q4",
      type: "multi",
      prompt: md`Which belong in a sound stow trigger specification?`,
      options: [
        "The wind statistic, averaging window and height of the threshold",
        "Hysteresis and a minimum stow time",
        "A lead time that covers the measured time to stow",
        "A rule that the most optimistic anemometer governs to avoid unnecessary stows",
        "Defined behaviour when a sensor fails",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Voting must be safety-biased (any valid sensor above threshold stows), never the most optimistic sensor. The rest are the core elements.`,
      concepts: ["mz05.stow-trigger", "mz05.fail-safe-stow"],
      difficulty: 2,
    },
    {
      id: "mz05-l02-q5",
      type: "numeric",
      prompt: md`For hail falling vertically, what fraction of the flat-position normal impact energy reaches a module stowed at 75°? Give a decimal.`,
      answer: 0.067,
      tolerance: { abs: 0.003 },
      explanation: md`Normal velocity scales with $\cos\beta$, energy with $\cos^2\beta$: $\cos^2 75° = 0.259^2 = 0.067$. Wind-driven hail arrives at an angle, so the real benefit is smaller.`,
      concepts: ["mz05.stow-angle"],
      difficulty: 2,
    },
    {
      id: "mz05-l02-q6",
      type: "decision",
      prompt: md`At 14:00 a row controller loses contact with its network controller. Wind is 9 m/s and steady. What should the row do?`,
      options: [
        { text: "Keep tracking on its own clock indefinitely, since the wind is low", score: 0.2, feedback: "It cannot know the wind will stay low; without commands and wind data it is blind." },
        { text: "Keep tracking for a short, defined timeout, then self-stow if contact is not restored", score: 1, feedback: "Correct: a heartbeat timeout followed by self-stow is the standard fail-safe, trading a little energy for safety." },
        { text: "Freeze at its current angle until a technician arrives", score: 0.1, feedback: "Freezing at an arbitrary angle may be the worst aeroelastic position if wind rises." },
      ],
      explanation: md`Fail-safe design means a row with no information goes to the safe state on its own after a short, defined timeout. The energy cost of a false stow is small; the cost of an unstowed row in a gust front is not.`,
      concepts: ["mz05.fail-safe-stow"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz05-l02-f1", front: "Dynamic pressure", back: md`$q = \tfrac12 \rho V^2$; 20 m/s at 45 °C ($\rho = 1.109$) gives 222 Pa.`, concepts: ["mz05.wind-loads"] },
    { id: "mz05-l02-f2", front: "Moment per metre of tracker row", back: md`$M' = q C_M c^2$: torque scales with chord squared, so 2P carries 4 times the torque of 1P.`, concepts: ["mz05.wind-loads"] },
    { id: "mz05-l02-f3", front: "Reduced velocity", back: md`$V_r = V/(f_t c)$; galloping starts above a critical $V_r$ found in the wind tunnel.`, concepts: ["mz05.torsional-galloping"] },
    { id: "mz05-l02-f4", front: "Threshold height correction", back: md`$V(z) = V_\text{ref}(z/z_\text{ref})^\alpha$; 18 m/s at 10 m is about 15.2 m/s at 3 m ($\alpha = 0.14$).`, concepts: ["mz05.stow-trigger"] },
    { id: "mz05-l02-f5", front: "Gust factor", back: md`$G = V_\text{3 s}/\bar V_\text{10 min}$, about 1.4 to 1.5 at 10 m over open terrain; higher near the ground.`, concepts: ["mz05.stow-trigger"] },
    { id: "mz05-l02-f6", front: "Fail-safe stow triggers", back: "Heartbeat loss, sensor fault, low battery, grid loss: each row reaches its safe position without any command.", concepts: ["mz05.fail-safe-stow"] },
    { id: "mz05-l02-f7", front: "Legitimate levers on stow energy loss", back: "Faster evidence-based release, zonal stow, fewer false trips. Never thresholds above the vendor envelope.", concepts: ["mz05.stow-trigger"] },
  ],
  scenarios: [
    {
      id: "mz05-s1",
      title: "The IPP wants fewer stows",
      dayInLife: true,
      context: md`You are meeting the asset manager of a Gulf tracker plant (illustrative) to discuss a possible Mizan analytics engagement. She opens with: "Our trackers stowed 41 times this summer, mostly in shamal afternoons. My O&M contractor estimates we lost 0.8% of summer energy. Can your software raise the stow threshold from 18 to 21 m/s? That is what I want to buy."`,
      start: "a",
      concepts: ["mz05.stow-trigger", "mz05.torsional-galloping", "mz05.fail-safe-stow"],
      nodes: {
        a: {
          md: md`How do you respond in the meeting?`,
          choices: [
            { text: "Agree in principle and offer to model the extra energy from a 21 m/s threshold.", next: "b", score: 1, feedback: "You have just offered to move structural risk onto her plant, and the tracker vendor will hear about it." },
            { text: "Explain that thresholds come from the vendor's wind-tunnel envelope, and offer to analyse where the 0.8% actually goes: event count, duration, release delays, false trips and zones.", next: "c", score: 9, feedback: "Right reframing: same goal (energy), no reduction in margin, and an analysis only you are offering." },
            { text: "Tell her stow losses are unavoidable and move on to soiling.", next: "c", score: 4, feedback: "Safe, but you walked away from a real pain she just told you about." },
          ],
        },
        b: {
          md: md`A week later the tracker vendor's regional manager calls the asset manager: any change above 18 m/s voids the structural warranty. She calls you, irritated.`,
          choices: [
            { text: "Withdraw the threshold proposal, apologise, and propose the event analysis instead.", next: "c", score: 5, feedback: "Recovery is possible, but you spent credibility with both the owner and the vendor." },
            { text: "Argue that the vendor is being conservative and the structure can take it.", score: 0, feedback: "You have no wind-tunnel data and no standing. This ends the relationship." },
          ],
        },
        c: {
          md: md`Your analysis of SCADA logs (illustrative) finds: 41 events, median duration 3.2 h, but in 60% of events the wind fell below the release threshold within 40 minutes and rows stayed stowed for the full fixed hold time of 2 h. Six events were caused by a single anemometer with a stuck bearing. What do you propose?`,
          choices: [
            { text: "A forecast- and multi-sensor-based release rule within the vendor's parameters, sensor health monitoring with automatic exclusion of failed sensors (safety-biased), and zonal stow, piloted on two blocks with vendor approval.", score: 10, feedback: "Every element reduces lost energy without lowering any safety margin, and the pilot is structured for vendor sign-off." },
            { text: "Cut the hold time to 10 minutes plant-wide immediately.", score: 3, feedback: "Hold time is a vendor parameter; changing it without approval and evidence repeats the threshold mistake on a smaller scale." },
            { text: "Recommend replacing all anemometers.", score: 5, feedback: "Sensor health matters, but this fixes only 6 of 41 events and is not a product." },
          ],
        },
      },
    },
  ],
};

export default lesson;
