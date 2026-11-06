import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz05-l03",
  title: "Dust, hail and heat: dust-storm stow, night stow for soiling, and the yield vs risk trade-off",
  summary:
    "Stow as a soiling and protection lever, not only a wind survival mode: what dust storms do to modules and trackers, the evidence for steep night stow from Figgis (2019) and Khan (2024), the dew mechanism behind it, hail stow, what extreme heat does to drives, batteries and tubes, and an expected-value rule for when stowing pays, with the uncertainty stated honestly.",
  minutes: 85,
  objectives: [
    "You can explain why tilt angle changes dust deposition, accumulation and dew, and summarise what Figgis 2019 and Khan 2024 do and do not show.",
    "You can write the expected-value rule for a discretionary stow and compute it for a dust event and for a night-stow policy.",
    "You can explain why dust events and nights are the cheapest times to move a tracker away from its tracking angle.",
    "You can list the heat effects on tracker hardware and control (drives, batteries, electronics, thermal expansion).",
    "You can design a night-stow trial that respects the vendor's limits and robot cleaning schedules.",
  ],
  concepts: [
    {
      id: "mz05.dust-storm-stow",
      name: "Dust-storm stow",
      description:
        "Moving rows to a protective angle ahead of or during a dust event to reduce deposition and abrasion. Cheap in energy because dust already collapses beam irradiance; bounded by the vendor's wind envelope, which governs whenever wind is high.",
      competency: "mz-control",
      related: ["mz05.stow-angle", "m02.soiling"],
    },
    {
      id: "mz05.night-stow",
      name: "Soiling-aware night stow",
      description:
        "Parking rows at a steep angle at night instead of flat. Evidence: Figgis et al. 2019 (tilt toward the wind at maximum angle) and Khan et al. 2024 (vertical night stow plus coating, up to 85% lower soiling, stow effect not isolated). Works through lower deposition, gravity shedding and less dew.",
      competency: "mz-control",
      related: ["mz05.dust-storm-stow", "m02.cleaning-strategy"],
    },
    {
      id: "mz05.stow-expected-value",
      name: "Expected value of a discretionary stow",
      description:
        "Stow when the expected damage avoided plus soiling avoided exceeds the value of energy lost while stowed; above the vendor's threshold, stow regardless. Night and dust events make the energy-lost term small.",
      competency: "mz-control",
      related: ["mz05.dust-storm-stow", "mz05.night-stow"],
    },
    {
      id: "mz05.hail-stow",
      name: "Hail stow",
      description:
        "Forecast-triggered steep stow (60 to 77 degrees in vendor material) that cuts the normal component of hail impact energy roughly with cos squared of the tilt for vertical hail.",
      competency: "mz-control",
      related: ["mz05.stow-angle"],
    },
    {
      id: "mz05.heat-effects",
      name: "Heat effects on trackers",
      description:
        "Extreme heat ages row-controller batteries and electronics, derates motors, expands torque tubes (about 12 micrometres per metre per kelvin for steel) and lowers air density. It shapes hardware specs and fail-safe reliability more than stow decisions.",
      competency: "mz-control",
      related: ["mz05.fail-safe-stow", "m02.thermal-derating"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Stow as a soiling lever: mechanism and evidence",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`This lesson is the technical core of Mizan's control idea. The research brief found no major tracker vendor publicly marketing a dust-storm stow or a soiling-optimised night stow. If the physics holds at Gulf sites, a control function that uses tracker angle to reduce soiling links directly to the soiling analytics and cleaning optimisation you are already building. If you overclaim the evidence, a KISR researcher or a vendor engineer will take the pitch apart. You need both the mechanism and the honest state of the evidence.`,
        },
        {
          kind: "xref",
          to: "m02-l05",
          note: "Track 0 covers soiling physics (deposition, cementation by dew, removal), Kuwait dust and cleaning strategy. Here we focus on how tilt angle changes each of those terms.",
        },
        {
          kind: "md",
          md: md`### How tilt angle changes soiling

Soiling on the glass is the balance of three processes, each angle-dependent:

1. **Deposition**: particles that reach the glass. Gravity settling is proportional to the horizontal projection of the surface, so it falls roughly with $\cos\beta$. Impaction from wind-borne particles depends on how squarely the glass faces the wind.
2. **Retention and removal**: whether particles stay. On steep glass, gravity and wind shed loose particles; on flat glass they stay.
3. **Cementation**: dew dissolves soluble material at night and recrystallises it as the glass dries, fixing dust that wind and dry brushes can no longer remove (Ilse et al.). Dew forms when the glass cools below the dew point by radiating to the cold night sky.

The night sky "seen" by the front glass is set by the sky view factor:`,
        },
        { kind: "equation", formula: "mz05-sky-view-factor" },
        {
          kind: "md",
          md: md`Flat glass sees the whole sky ($F = 1$); at 60° it sees 75% sky and 25% relatively warm ground; vertical glass sees half. Less radiative cooling means the glass stays warmer and condenses less. That is a physical reason to expect steep night stow to reduce dew-driven cementation, separate from deposition.

### What the studies show

| Study | Setting | Finding | Caveat |
|---|---|---|---|
| Figgis et al., Solar Energy 2019 (Qatar) | Tilt angle vs soiling in a perpendicular wind | Deposition peaks at about 45° tilt **toward** the wind; accumulation peaks at about 22° tilt **away** from the wind. Conclusion: stow single-axis trackers at maximum tilt toward the wind at night | Snippet-level summary in the research brief; read the full paper before quoting numbers |
| Khan et al., Prog. Photovolt. 2024 (Saudi Arabia) | Anti-soiling coating plus vertical night stow | Soiling losses cut by up to 85% | The stow effect alone was **not isolated** from the coating |
| Cal Poly student study 2020 | 52° night stow | About 20% less soiling loss in the first week | Small dataset, student project |

Read the table as: a credible physical mechanism, consistent directional evidence from desert sites, **no isolated, multi-season effect size for a Kuwaiti utility plant**. That gap is precisely what a pilot with KISR could close, and it is why every number below is labelled as an assumption.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "State of the evidence",
          md: md`The research brief (November 2026) records these studies at search-snippet level, and its conclusion that no vendor markets dust-storm or soiling night stow rests on public material, not vendor manuals. Before any of it goes into a proposal, read the full papers and confirm vendor features in the manuals.`,
        },
        {
          kind: "md",
          md: md`### Dust storms

A dust storm brings three hazards at once: high particle concentration (heavy deposition), wind (structural load, lesson 2) and saltating sand near the ground (abrasion of the anti-reflective coating and glass). In Kuwait, storms can cut PV output by about 30% almost instantly (Al-Rasheedi et al. 2020 for Shagaya).

The useful asymmetry: **during a dust storm, DNI has already collapsed**, so the energy lost by moving away from the tracking angle is much smaller than on a clear day (lesson 1 showed flat and tracking positions within 2% under heavy dust). A protective dust stow is therefore cheap exactly when it is needed. The constraint: whenever wind is near the vendor threshold, the wind-safe stow angle governs and the soiling preference only applies within the vendor's allowed envelope. The best angle for soiling may also differ from the best for abrasion (glass facing away from saltating sand), and neither is established for Gulf conditions.

### The expected-value rule

For any discretionary stow (one not forced by the vendor's threshold), compare benefits and cost:`,
        },
        { kind: "equation", formula: "mz05-stow-net-benefit" },
        { kind: "equation", formula: "mz05-stow-energy-lost" },
        { kind: "equation", formula: "mz05-soiling-avoided-value" },
        {
          kind: "md",
          md: md`The decision is: stow if wind is at or above the vendor threshold, otherwise stow if $\Delta C > 0$. The widget implements this with an illustrative damage-probability curve. Play with it: at night, set "Output while tracking" near zero and watch any soiling benefit win; at noon on a clear day, a large plant pays thousands of dollars per hour of stow.`,
        },
        {
          kind: "widget",
          widget: "stow-decision",
          caption: "Illustrative model: damage probability is a logistic curve centred at 1.25 times the vendor threshold. Real decisions add gust factors, forecast uncertainty and the vendor's envelope.",
        },
        {
          kind: "md",
          md: md`### Hail

Vendors have invested heavily in hail stow because hail losses in the US have been severe: Nextracker's Hail Pro, Array's DuraTrack Hail XP at 77°, GameChange's HailStow (research brief 3.3). For vertical hail, normal impact energy falls with $\cos^2\beta$ (lesson 2). Hail is a minor hazard in Kuwait compared with dust, but the hail products matter to Mizan for another reason: they prove vendors already accept **forecast-triggered** stow driven by external weather data (Array's Hail Alert Response uses third-party weather data). That is the architectural precedent for a dust-storm stow.

### Heat

Extreme heat changes the hardware more than the stow decision:

| Effect | Mechanism | What to check |
|---|---|---|
| Row-controller batteries | Chemical ageing accelerates with temperature (a common rule of thumb is roughly doubling per 10 K for many Li-ion chemistries); a weak battery breaks fail-safe stow | Battery chemistry, temperature rating, enclosure shading, replacement interval, low-battery self-stow |
| Electronics and motors | Derating and higher failure rates above rated ambient | Rated ambient (summer peaks near 50 °C plus solar heating of enclosures) |
| Torque tube expansion | $\Delta L = \alpha L \Delta T$; steel $\alpha \approx 12 \times 10^{-6}$/K | Bearings and joints accommodate it; 100 m and 60 K gives 72 mm |
| Air density | 9% lower at 45 °C than at 15 °C | Margin only, not a reason to raise thresholds |

There is no strong case for a "heat stow" for energy: pointing away from the sun lowers module temperature but loses far more irradiance than the temperature coefficient recovers. Heat matters to Mizan as a reliability input: a control product that relies on rows moving more often must not wear out drives or drain batteries that the fail-safe depends on.`,
        },
        { kind: "equation", formula: "mz05-thermal-expansion" },
        {
          kind: "matrix",
          title: "When does a discretionary stow pay?",
          xAxis: ["Low event risk", "High event risk"],
          yAxis: ["Low energy at stake (night, dust)", "High energy at stake (clear day)"],
          cells: [
            { label: "Clear day, low risk", detail: "Track. Only stow on the vendor's rules." },
            { label: "Clear day, forecast risk", detail: "Expected-value decision; forecasts and lead time decide." },
            { label: "Night or dust, low risk", detail: "Soiling-aware position is nearly free: test night stow here." },
            { label: "Night or dust, high risk", detail: "Stow early; the vendor's wind angle governs." },
          ],
          caption: "Cells in order: top-left, top-right, bottom-left, bottom-right. The bottom row is where Mizan's control functions are cheapest to justify.",
        },
        { kind: "sources", refs: ["mz05-r9", "mz05-r10", "mz05-r11", "mz05-r17", "mz05-r21", "mz05-r12", "mz05-r13", "mz05-r14"] },
      ],
    },
    {
      layer: "applied",
      title: "Pricing a dust stow and a night-stow policy",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A midday dust storm below the wind threshold",
          given: md`Illustrative 100 MWac tracker block. A dust storm is forecast for 11:00 to 14:00 with gusts of 16 m/s, below the vendor's 18 m/s threshold. While tracking in the dust, output would be 60% of MWac; at the protective stow angle it loses a further 35% of that. Energy value USD 15/MWh (the order of recent Gulf PV tariffs; illustrative). Assumption to be tested: the steep stow avoids 1.5 percentage points of soiling loss that would otherwise persist 7 days until the next scheduled cleaning. Normal daily yield 750 MWh. Damage cost if a row fails USD 1.5 M, probability 0.1% at these gusts (illustrative).`,
          steps: [
            { md: md`**Energy lost.** $E_\text{lost} = 100 \times 3 \times 0.60 \times 0.35 = 63$ MWh; value $63 \times 15 = $ USD 945.` },
            { md: md`**Soiling avoided.** $0.015 \times 750 \times 7 = 78.75$ MWh; value USD 1,181.` },
            { md: md`**Expected damage avoided.** $0.001 \times 1{,}500{,}000 = $ USD 1,500.` },
            { md: md`**Net.** $\Delta C = 1{,}500 + 1{,}181 - 945 = $ USD 1,736 > 0: stow.` },
            { md: md`**Sensitivity.** Without the damage term the soiling case alone is USD 236 net: marginal, and entirely dependent on the 1.5-point assumption. The same 3-hour stow on a clear day at 80% output would lose $100 \times 3 \times 0.8 \times 0.35 \times 15 = $ USD 1,260, and an 8-hour stow USD 3,360.` },
          ],
          result: md`Dust-storm stow is easy to justify when the storm already suppresses output, and hard to justify on soiling alone during clear hours. The number that decides it, soiling avoided per event, is exactly what is not yet measured for Kuwait. A pilot must measure it before the product claims it.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Annual value of a steep night-stow policy (illustrative)",
          given: md`Same 100 MWac block, 750 MWh/day, 365 days. Soiling rate 0.4%/day (inside the research brief's working range of 0.3 to 0.6%/day for Kuwait, not a measured value), cleaned every 30 days, linear build-up. **Assumption, not a result:** steep night stow reduces the daily soiling rate by 30%. Energy value USD 15/MWh. Night stow returns rows to tracking before sunrise, so energy lost is about zero.`,
          steps: [
            {
              md: md`**Average soiling loss today.** For a linear sawtooth, average loss $= rT/2 = 0.4 \times 30/2 = 6.0\%$.`,
              hidden: true,
              check: { prompt: "Average soiling loss without night stow", answer: 6, unit: "%", tolerance: { abs: 0.05 } },
            },
            {
              md: md`**With night stow.** $r = 0.28\%$/day, average $= 0.28 \times 30/2 = 4.2\%$.`,
              hidden: true,
              check: { prompt: "Average soiling loss with night stow", answer: 4.2, unit: "%", tolerance: { abs: 0.05 } },
            },
            {
              md: md`**Energy gained.** Annual energy $750 \times 365 = 273{,}750$ MWh; gain $= 0.018 \times 273{,}750 = 4{,}927.5$ MWh.`,
              hidden: true,
              check: { prompt: "Annual energy gained", answer: 4927.5, unit: "MWh", tolerance: { rel: 0.01 } },
            },
            {
              md: md`**Value.** $4{,}927.5 \times 15 = $ USD 73,900 per year per 100 MWac.`,
              hidden: true,
              check: { prompt: "Annual value", answer: 73912, unit: "USD", tolerance: { rel: 0.01 } },
            },
            {
              md: md`**Costs to set against it.** Two extra slews per night (365 extra cycles a year), possible conflict with night-time robot cleaning, and any change to the cleaning interval (a lower soiling rate may justify cleaning less often, which the cleaning optimiser in the cleaning economics module would compute).`,
            },
          ],
          result: md`On these assumptions a steep night stow is worth about USD 74k a year per 100 MWac, roughly USD 0.8 M a year for a 1.1 GW tracker plant, for software and a few extra drive cycles. Halve the assumed effect and the value halves. The commercial case is real only once a paired trial measures the effect (lesson 5).`,
        },
        {
          kind: "question",
          question: {
            id: "mz05-l03-p1",
            type: "numeric",
            prompt: md`A 200 MWac block is stowed for 2 hours in a dust event. While tracking it would produce 50% of MWac; at stow it loses 30% of that. Energy is worth USD 20/MWh. What is the value of energy lost (USD)?`,
            answer: 1200,
            tolerance: { abs: 5 },
            unit: "USD",
            explanation: md`$E_\text{lost} = 200 \times 2 \times 0.5 \times 0.3 = 60$ MWh; $60 \times 20 = $ USD 1,200.`,
            concepts: ["mz05.stow-expected-value"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running dust and night stow on an operating plant",
      blocks: [
        {
          kind: "md",
          md: md`**Who decides.** The tracker vendor defines what angles and modes are allowed. The O&M contractor operates the plant under the O&M agreement and its availability and performance guarantees (Track 0, m09-l06). The owner (an IPP, or a research operator like KISR at Shagaya Phase I) approves changes. Any change of operating mode on a financed plant may also need the lenders' technical adviser to agree.

**Interactions to plan for.**
- **Cleaning robots** mounted on trackers need rows at a specific angle (often flat) and aligned at cleaning time; many Gulf plants clean at night. A night-stow policy must hand over to the robot schedule. GameChange publicly markets integration with robotic cleaners, so the interface exists on at least one platform.
- **Dew and cleaning timing**: if the glass is wet at dawn, dry robots may smear rather than clean; dew sensing (glass temperature against dew point) helps schedule both stow and cleaning.
- **Wind direction**: a north-south axis can only tilt east or west. "Toward the wind" for a north-westerly shamal means facing west; returning to the east-facing dawn position then needs a long slew before sunrise.

**Measurement.** You cannot see the effect of a stow policy in plant output alone, because weather and cleaning dominate. You need soiling stations or reference cell pairs (clean and soiled) on test and control rows, a clear protocol and enough weeks (lesson 5 sizes this).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- The night-stow position conflicts with the robot schedule; robots cannot dock and a whole block misses its clean.
- A steep night position is left in place into a windy morning that calls for a different stow angle; the vendor logic must always override.
- The trial uses plant output to judge the effect and attributes a weather change or a cleaning to the stow policy.
- Extra daily cycles drain row batteries already weakened by summer heat, so the fail-safe stops working where it is most needed.`,
        },
        {
          kind: "checklist",
          title: "Before a night-stow or dust-stow trial",
          items: [
            "Written vendor confirmation of the permitted angle range at night and in dust events, and of the cycle budget",
            "Robot cleaning schedule and docking angle mapped against the stow window",
            "Test and control rows matched for position, orientation to the prevailing wind and cleaning schedule",
            "Soiling measurement on both (soiling station or reference cells), with a calibration and cleaning protocol",
            "Battery state-of-health check on test rows before and after",
            "Stop rule: any vendor alarm, missed stow or robot conflict pauses the trial",
          ],
        },
        {
          kind: "ask",
          title: "Ask the vendor, O&M contractor and KISR",
          items: [
            "Which night positions are permitted, and is any angle restricted at low wind for aeroelastic reasons?",
            "How many extra rotation cycles per year does the drive and battery design allow?",
            "When do the robots clean, at what angle, and how long does a block take?",
            "Which soiling measurements exist on site today, and can we add paired reference cells on test rows?",
            "What is the prevailing night wind direction by season at this site?",
          ],
        },
        { kind: "scenario", scenario: "mz05-s2" },
        {
          kind: "question",
          question: {
            id: "mz05-l03-p2",
            type: "short",
            prompt: md`Draft a one-page "Dust and night stow operating policy (trial)" that Mizan could propose to an O&M contractor at a Gulf tracker plant with night-time robot cleaning. Use placeholders where vendor values are needed.`,
            rubric: [
              "States that the vendor's wind and fail-safe stow always override, and that the trial operates only within vendor-permitted angles and cycle budget",
              "Defines the night-stow position and timing (when to enter, when to return before sunrise) and its handover to the robot cleaning schedule",
              "Defines a dust-event trigger (forecast, visibility or PM sensor, irradiance drop) and the action, bounded by wind conditions",
              "Defines measurement on test and control rows and what is logged",
              "Defines stop rules and reporting",
              "Labels expected benefits as hypotheses to be measured, without overclaiming",
            ],
            modelAnswer: md`**Scope.** Blocks T1 and T2 (test), C1 and C2 (control, matched), 12 weeks. **Precedence.** Vendor wind stow, hail stow and fail-safe logic override this policy at all times. The trial uses only angles within the vendor-confirmed night range [vendor value] and stays within the cycle budget of [vendor value] extra cycles per year. **Night stow.** From 30 minutes after sunset, test rows rotate to [maximum permitted angle] facing the prevailing night wind (west for a north-westerly). At [robot start time minus 15 minutes] rows go to the robot docking angle; after the robot completes the block they return to the night position. Rows begin the return to the dawn tracking angle 20 minutes before sunrise. **Dust events.** When the dust forecast or the on-site visibility or PM10 sensor crosses [threshold] and wind is below the vendor's pre-alert level, test rows go to the dust position; above the pre-alert level the vendor's wind logic applies. **Measurement.** Paired clean and soiled reference cells on each test and control block; daily soiling ratio; cleaning log; dew sensor (glass temperature against dew point). Logged: commanded and measured angle, mode, battery state of charge per test row. **Stop rules.** Any missed robot clean, vendor alarm, row failing to reach position or battery below [value] pauses the trial for review. **Reporting.** Weekly table of soiling ratio difference (test minus control) with confidence interval; final report jointly reviewed with the owner. **Expected benefit.** Published studies suggest reduced soiling (Figgis 2019, Khan 2024); this trial measures whether and how much at this site. No benefit is assumed in advance.`,
            explanation: md`A trial policy must sit inside the vendor's envelope, hand over cleanly to robots, define measurement and stop rules, and treat benefits as hypotheses until measured.`,
            concepts: ["mz05.night-stow", "mz05.dust-storm-stow"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an O&M site manager why parking trackers steeply at night might reduce soiling, and what the evidence does not yet show.",
          keyPoints: [
            "Less horizontal projection means less dust settles, and loose dust slides off steep glass",
            "Steep glass sees less cold night sky, stays warmer and gets less dew, so less dust is cemented",
            "Figgis 2019 found tilt toward the wind at a steep angle best at night; Khan 2024 saw up to 85% less soiling with a coating plus vertical stow",
            "The stow effect alone has not been measured at a Kuwaiti utility plant",
            "A paired trial with test and control rows is the way to find out",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz05-l03-q1",
      type: "mcq",
      prompt: md`Why is a protective stow during a heavy dust storm cheap in energy terms?`,
      options: [
        "Trackers use less power when stowed",
        "Dust has already collapsed DNI, so the energy gained by pointing at the sun is small",
        "Inverters shut down during dust storms",
        "The tariff is lower during storms",
      ],
      answer: 1,
      explanation: md`The opportunity cost of stow is the beam irradiance you give up. In heavy dust DNI is small and diffuse dominates, so flat or steep positions lose little relative to tracking.`,
      concepts: ["mz05.dust-storm-stow", "mz05.stow-expected-value"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz05-l03-q2",
      type: "multi",
      prompt: md`What did Figgis et al. (2019) and Khan et al. (2024), as summarised in the research brief, report?`,
      options: [
        "Deposition peaks at about 45° tilt toward the wind",
        "Accumulation peaks at about 22° tilt away from the wind",
        "Vertical night stow alone cut soiling by 85% at a Kuwaiti plant",
        "A coating plus vertical night stow cut soiling losses by up to 85% in Saudi Arabia",
        "Figgis recommended stowing at maximum tilt toward the wind at night",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Khan 2024 was in Saudi Arabia and combined a coating with vertical night stow; the stow effect was not isolated, and it was not a Kuwaiti plant.`,
      concepts: ["mz05.night-stow"],
      difficulty: 2,
    },
    {
      id: "mz05-l03-q3",
      type: "numeric",
      prompt: md`What is the sky view factor of module glass tilted at 45°? Give a decimal to two places.`,
      answer: 0.85,
      tolerance: { abs: 0.01 },
      explanation: md`$F = (1 + \cos 45°)/2 = (1 + 0.707)/2 = 0.854$. Flat glass sees the whole sky (1.0), vertical glass half (0.5).`,
      concepts: ["mz05.night-stow"],
      difficulty: 1,
    },
    {
      id: "mz05-l03-q4",
      type: "numeric",
      prompt: md`A 100 m steel torque tube (expansion coefficient $12 \times 10^{-6}$/K) heats from 15 °C at installation to 70 °C in the summer sun. How much longer is it, in mm?`,
      answer: 66,
      tolerance: { abs: 1 },
      unit: "mm",
      explanation: md`$\Delta L = 12 \times 10^{-6} \times 100 \times 55 = 0.066$ m $= 66$ mm. Bearings and joints must accommodate it without binding, or drive torque rises.`,
      concepts: ["mz05.heat-effects"],
      difficulty: 1,
    },
    {
      id: "mz05-l03-q5",
      type: "decision",
      prompt: md`An IPP asks whether to adopt a steep night stow plant-wide now, citing Khan 2024's 85% figure. What do you advise?`,
      options: [
        { text: "Adopt it plant-wide immediately; the evidence is clear", score: 0.1, feedback: "Khan's figure combines a coating with stow and comes from a different site; the effect at this plant is unknown, and robot and vendor constraints are unchecked." },
        { text: "Run a paired trial on matched blocks within vendor-approved angles, measure soiling on both, then decide", score: 1, feedback: "Right: low risk, measurable, and it produces the site-specific number the business case needs." },
        { text: "Reject it; stow is only for wind", score: 0.2, feedback: "The mechanism is credible and the cost is low at night; rejecting it without testing leaves value on the table." },
      ],
      explanation: md`Evidence is directional and promising but not isolated or site-specific. A controlled trial costs little at night and answers the question.`,
      concepts: ["mz05.night-stow"],
      difficulty: 2,
    },
    {
      id: "mz05-l03-q6",
      type: "numeric",
      prompt: md`Soiling builds linearly at 0.5%/day and modules are cleaned every 20 days. What is the average soiling loss (%)?`,
      answer: 5,
      tolerance: { abs: 0.05 },
      unit: "%",
      explanation: md`Average of a linear sawtooth $= rT/2 = 0.5 \times 20/2 = 5\%$.`,
      concepts: ["mz05.stow-expected-value"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz05-l03-f1", front: "Discretionary stow rule", back: md`Stow if $V \ge V_\text{vendor}$; else stow if $p D + S - L > 0$ (damage avoided plus soiling avoided minus energy lost).`, concepts: ["mz05.stow-expected-value"] },
    { id: "mz05-l03-f2", front: "Figgis et al. 2019, night stow", back: "Deposition peaks near 45° toward the wind, accumulation near 22° away; stow at maximum tilt toward the wind at night.", concepts: ["mz05.night-stow"] },
    { id: "mz05-l03-f3", front: "Khan et al. 2024", back: "Saudi Arabia: coating plus vertical night stow cut soiling losses by up to 85%; stow effect not isolated.", concepts: ["mz05.night-stow"] },
    { id: "mz05-l03-f4", front: "Sky view factor", back: md`$F = (1+\cos\beta)/2$: 1 flat, 0.75 at 60°, 0.5 vertical. Less sky, less radiative cooling, less dew.`, concepts: ["mz05.night-stow"] },
    { id: "mz05-l03-f5", front: "Why hail stow matters to Mizan in Kuwait", back: "Hail is minor in Kuwait, but forecast-triggered hail stow using third-party weather data is the precedent for a dust-storm stow.", concepts: ["mz05.hail-stow"] },
    { id: "mz05-l03-f6", front: "Heat and fail-safe", back: "Heat ages row-controller batteries; a weak battery breaks self-stow. Extra stow cycles must fit the battery and drive budget.", concepts: ["mz05.heat-effects"] },
    { id: "mz05-l03-f7", front: "Illustrative value of night stow", back: "0.4%/day soiling, 30-day cleaning, 30% rate reduction: 1.8 points of yield, about USD 74k/yr per 100 MWac at USD 15/MWh. An assumption until measured.", concepts: ["mz05.night-stow"] },
  ],
  scenarios: [
    {
      id: "mz05-s2",
      title: "Dust front at 01:30",
      context: md`Illustrative. You are on call for a Mizan night-stow trial at a Gulf tracker plant. At 01:30 the forecast shows a dust front arriving around 04:00 with gusts near 15 m/s; the vendor threshold is 18 m/s. Test rows are in the trial's steep night position. Robots are scheduled to clean test block T1 from 02:00 to 04:30 at the flat docking angle.`,
      start: "a",
      concepts: ["mz05.dust-storm-stow", "mz05.night-stow", "mz05.stow-trigger"],
      nodes: {
        a: {
          md: md`What do you recommend to the O&M control room?`,
          choices: [
            { text: "Let the robots clean T1 as scheduled; the front arrives after they finish.", next: "b", score: 2, feedback: "The robots would finish at 04:30, after the front arrives, and a clean just before a dust front is largely wasted." },
            { text: "Postpone the T1 clean until after the dust event, keep test rows in the steep position, and confirm vendor wind logic and sensors are healthy.", next: "c", score: 9, feedback: "Cleaning just before a dust storm wastes a cycle; the steep position is the trial's dust position anyway, and the wind logic stays in charge." },
            { text: "Stow everything flat now to be safe.", next: "c", score: 3, feedback: "Flat is not automatically safe (aeroelastic risk depends on design), and it abandons the trial position without reason." },
          ],
        },
        b: {
          md: md`At 03:50 the front arrives early with gusts of 19 m/s. The vendor logic commands wind stow, but six robots are mid-row on T1.`,
          choices: [
            { text: "Follow the vendor's robot-on-row procedure and log the event for the trial review.", score: 5, feedback: "Correct now, but the conflict was avoidable at 01:30." },
            { text: "Hold the rows flat until the robots finish.", score: 0, feedback: "Never override a vendor wind stow for a cleaning schedule." },
          ],
        },
        c: {
          md: md`The front passes by 07:00 with peak gusts of 16 m/s. The control blocks were flat overnight. What do you record?`,
          choices: [
            { text: "Soiling ratio on test and control blocks before and after the event, the angles held, the robot reschedule and any alarms, flagged as a dust-event observation in the trial log.", score: 10, feedback: "A single event is not a result, but a well-logged one is exactly the evidence the trial needs." },
            { text: "Announce that night stow reduced dust soiling by the observed difference.", score: 2, feedback: "One event, no confidence interval: an overclaim that would damage the KISR relationship." },
          ],
        },
      },
    },
  ],
};

export default lesson;
