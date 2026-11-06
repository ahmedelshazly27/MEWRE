import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz05-l01",
  title: "Single-axis tracker kinematics: true tracking, backtracking, diffuse and bifacial",
  summary:
    "The geometry every tracker controller runs: the sun vector, the true-tracking rotation angle for a horizontal north-south axis, the incidence angle that remains, the backtracking condition and correction from ground coverage ratio, and why controllers flatten under diffuse skies and in dust. Worked at Kuwait's latitude so you can check a vendor's algorithm and argue where a smarter control layer can and cannot add energy.",
  minutes: 80,
  objectives: [
    "You can compute the true-tracking rotation angle and the residual incidence angle of a horizontal single-axis tracker from sun zenith and azimuth.",
    "You can derive the backtracking condition cos R < GCR and compute the backtracked angle for a given layout.",
    "You can explain when a flat (diffuse) position beats pointing at the sun, and why dust storms make this relevant in Kuwait.",
    "You can explain what bifacial and terrain-aware algorithms change and how big the gains are relative to the basics.",
    "You can review a vendor's tracking algorithm description and ask the questions that expose its assumptions.",
  ],
  concepts: [
    {
      id: "mz05.true-tracking",
      name: "True-tracking rotation angle",
      description:
        "The rotation that puts the sun's projection onto the plane perpendicular to the tracker axis exactly on the module normal. For a horizontal north-south axis: tan R = tan(zenith) x sin(azimuth - axis azimuth).",
      competency: "mz-control",
      related: ["m02.tracker-vs-fixed", "m02.sun-geometry"],
    },
    {
      id: "mz05.tracking-incidence",
      name: "Residual incidence angle on a single-axis tracker",
      description:
        "A single-axis tracker cannot remove the sun's component along its axis; the remaining incidence angle satisfies cos(theta) = sqrt(1 - (sin zenith x cos(azimuth - axis azimuth))^2). Largest in winter mornings at 29 N.",
      competency: "mz-control",
      related: ["mz05.true-tracking"],
    },
    {
      id: "mz05.backtracking",
      name: "Backtracking",
      description:
        "At low sun, rows rotate back toward horizontal so the shadow of each row just reaches the next. Needed when cos(R_true) < GCR; the backtracked angle is R_true minus acos(cos(R_true)/GCR) in magnitude.",
      competency: "mz-control",
      related: ["mz05.true-tracking", "m02.tracker-vs-fixed"],
    },
    {
      id: "mz05.diffuse-tracking",
      name: "Diffuse (flat) tracking mode",
      description:
        "Under overcast or dusty skies with low beam irradiance, a near-horizontal position sees more of the sky dome than a steep sun-pointing one, so the controller flattens. Dust events in Kuwait collapse DNI and make this decision real.",
      competency: "mz-control",
      related: ["mz05.true-tracking", "m02.soiling"],
    },
    {
      id: "mz05.bifacial-tracking",
      name: "Bifacial and terrain-aware tracking",
      description:
        "Algorithm refinements beyond astronomical tracking: angles that account for rear-side irradiance from ground albedo, and row-by-row backtracking from the as-built terrain survey. Gains are small relative to tracking itself but material at GW scale.",
      competency: "mz-control",
      related: ["mz05.backtracking", "m02.bifacial-gain"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Where the tracker should point, and why it cannot point there",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan's control thesis is that tracker angle is a lever for more than energy: stow for dust, wind and heat, and position for soiling. Every one of those levers is paid for by moving away from the angle the tracking algorithm wants, so you must know that angle, how much energy each degree of deviation costs, and where the vendor's own algorithm already leaves energy on the table. A tracker engineer will test you on backtracking and GCR in the first meeting; this lesson makes sure you pass.`,
        },
        {
          kind: "xref",
          to: "m02-l04",
          note: "Track 0 covers why trackers are the default in the Gulf, 1P vs 2P, GCR and pitch, and the yield gain over fixed tilt. This lesson goes one level down into the equations the controller runs.",
        },
        {
          kind: "xref",
          to: "m02-l01",
          note: "Sun position (declination, hour angle, elevation, azimuth) is derived in Track 0. Here we take zenith and azimuth as inputs.",
        },
        {
          kind: "md",
          md: md`### Set-up and sign convention

Use a local frame with axes East, North, Up. With solar zenith $\theta_z$ and azimuth $\gamma_s$ (degrees clockwise from north), the unit vector pointing at the sun is:`,
        },
        { kind: "equation", formula: "mz05-sun-vector" },
        {
          kind: "md",
          md: md`A **horizontal single-axis tracker (HSAT)** has its torque tube along north-south (axis azimuth $\gamma_a = 180°$, pointing south) and rotates by an angle $R$ about it. Convention used here and in pvlib: $R = 0$ is flat, $R < 0$ faces east (morning), $R > 0$ faces west (afternoon). Mechanical limits are typically about $\pm 52°$ to $\pm 60°$; check the datasheet.

### True tracking

The module normal can only move in the east-up plane. The best it can do is point at the sun's **projection** onto that plane, which means $\tan R = s_E / s_U$. In terms of sun angles:`,
        },
        { kind: "equation", formula: "mz05-true-tracking" },
        {
          kind: "md",
          md: md`For a tilted axis (on a slope, or a tilted single-axis design) the general form from Marion and Dobos (NREL, 2013) adds the axis tilt $\beta_a$:`,
        },
        { kind: "equation", formula: "mz05-tracking-tilted-axis" },
        {
          kind: "md",
          md: md`With $\beta_a = 0$ it reduces to the horizontal form. Note the quadrant: the arctangent must be taken with the sign of the numerator and denominator (an **atan2**), or afternoon angles come out wrong near the horizon.

### What tracking cannot remove

The sun's component along the axis, $s_N$, is invisible to the rotation. The incidence angle that remains under true tracking is:`,
        },
        { kind: "equation", formula: "mz05-tracker-aoi" },
        {
          kind: "md",
          md: md`At 29.3°N on 21 June at 07:00 solar time the sun is almost due east (azimuth 75°), so $s_N$ is small and the residual incidence is about 13°: the tracker faces the sun almost squarely. On 21 December at 08:00 the sun is in the south-east (azimuth 126°) and the residual incidence is about 35°: a horizontal axis wastes much of the winter beam. That is why the summer gain of an HSAT over fixed tilt is large and the winter gain small (the widget below shows it).`,
        },
        {
          kind: "widget",
          widget: "sun-path",
          props: { latitude: 29.3, dayOfYear: 172 },
          caption: "Kuwait, 21 June. Toggle backtracking and move the GCR slider: watch the tracker angle fold back toward flat at dawn and dusk, and the POA shoulders shrink. Then set day 355 (21 December) and compare the tracker gain.",
        },
        {
          kind: "md",
          md: md`### Backtracking: the shading condition

Look along the axis. Rows of chord $L$ sit at pitch $p$, so $\text{GCR} = L/p$. Under true tracking the module plane is perpendicular to the projected sun ray, which makes an angle $R$ with the vertical. The shadow of one row, measured perpendicular to the rays, has width $L$. The perpendicular distance between rays through two adjacent row centres is $p \cos R$. No row shades the next while $L \le p\cos R$, so:`,
        },
        { kind: "equation", formula: "mz05-backtrack-condition" },
        {
          kind: "md",
          md: md`With GCR 0.35, backtracking starts when $|R_\text{true}|$ exceeds $\arccos 0.35 = 69.5°$; with GCR 0.45 it starts at $63.3°$. Denser plants backtrack for longer each day.

**The correction.** Tilt the rows to $R_b$, flatter than $R_\text{true}$. The projected shadow width becomes $L\cos(R_\text{true} - R_b)$. Setting it equal to $p\cos R_\text{true}$ (shadow just touching the next row) gives:`,
        },
        { kind: "equation", formula: "mz05-backtrack-angle" },
        {
          kind: "md",
          md: md`Check the limits: at the threshold $\cos R_\text{true} = \text{GCR}$, the arccos is 0 and $R_b = R_\text{true}$; at sunrise $R_\text{true} \to 90°$, the arccos tends to 90° and $R_b \to 0$ (flat). Because the sun's axial component is untouched, the beam on the backtracked plane is the true-tracking beam times $\cos(R_\text{true} - R_b)$.

**Why not just accept some shade?** Crystalline modules are built from series-connected cell strings with bypass diodes. A shadow across the bottom cells of every module in a row drops a whole substring, so the electrical loss is many times the shaded area fraction. Backtracking trades a cosine loss on beam for zero beam shading; that trade is almost always right for monofacial crystalline modules. Some vendors and researchers explore partial-shade tolerant strategies for specific module layouts; treat those as site-specific.

**Terrain.** The formula assumes level rows at equal height. On a cross-axis slope, the classic algorithm shades. **Slope-aware backtracking** (Anderson and Mikofski, NREL 2020) modifies the condition with the cross-axis slope angle, and some vendors go further with row-by-row angles from the as-built survey.

### Diffuse mode: when flat beats pointing

With the isotropic sky model, the plane-of-array irradiance of a tracker at rotation $R$ is:`,
        },
        { kind: "equation", formula: "mz05-poa-isotropic-tracker" },
        {
          kind: "md",
          md: md`Pointing at the sun maximises the beam term; going flat maximises the sky term $(1+\cos R)/2$. Under a clear sky the beam dominates and tracking wins easily. Under thick dust, DNI collapses while DHI rises, and the balance can flip.

| Illustrative hour, sun zenith 60°, tracker at $R = -60°$, albedo 0.3 | DNI (W/m²) | DHI (W/m²) | POA tracking | POA flat (= GHI) |
|---|---|---|---|---|
| Clear morning | 800 | 100 | $800 + 75 + 37.5 = 912.5$ | $400 + 100 = 500$ |
| Heavy dust | 100 | 350 | $100 + 262.5 + 30 = 392.5$ | $50 + 350 = 400$ |

(Incidence on the tracker is taken as near zero, a fair assumption on a summer morning. The ground term uses GHI.)

Two lessons. First, under dust the difference is small, so a diffuse mode is not a big energy lever by itself. Second, dust scattering is strongly **forward** (circumsolar), which the isotropic model ignores, so the real crossover needs the measured POA from a reference cell on a tracking row and one on a flat row, not a model. Array Technologies markets a Diffuse mode that flattens under overcast skies (research brief, section 3.3). The more interesting point for Mizan: a dust event is exactly when the energy cost of moving off the tracking angle is lowest, which is when stowing for dust (lesson 3) is cheapest.

### Bifacial tracking

Bifacial modules collect ground-reflected light on the rear. Desert sand albedo is roughly 0.25 to 0.4 depending on colour and moisture, so rear gains on trackers are meaningful (Track 0, m02-l03). Rear irradiance depends on height, row spacing, the shadow of the torque tube and the module angle. Bifacial-aware algorithms adjust angles slightly, mainly near backtracking and under diffuse skies. The gain over a good astronomical algorithm is a fraction of a percent and site-specific: treat vendor claims as hypotheses to check with measured rear-side POA.`,
        },
        { kind: "sources", refs: ["mz05-r1", "mz05-r2", "mz05-r3", "mz05-r4", "mz05-r14"] },
      ],
    },
    {
      layer: "applied",
      title: "Computing tracking and backtracking angles at Kuwait's latitude",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "21 June, 07:00 solar time, 29.3°N: two layouts",
          given: md`Sun position (from the Track 0 formulas, declination 23.45°, hour angle $-75°$): elevation 23.69°, so $\theta_z = 66.31°$; azimuth $\gamma_s = 75.40°$. HSAT with $\gamma_a = 180°$, mechanical limit $\pm 60°$. Two illustrative layouts: GCR 0.35 and GCR 0.45.`,
          steps: [
            {
              md: md`**True-tracking angle.** $\tan R = \tan 66.31° \times \sin(75.40° - 180°) = 2.279 \times (-0.968) = -2.205$, so $R_\text{true} = -65.6°$ (facing east).`,
            },
            {
              md: md`**Residual incidence.** $s_N = \sin 66.31° \times \cos(75.40°) = 0.916 \times 0.252 = 0.231$. $\cos\theta = \sqrt{1 - 0.231^2} = 0.973$, so $\theta = 13.3°$. The tracker faces the sun almost directly.`,
            },
            {
              md: md`**GCR 0.35.** $\cos 65.6° = 0.413 > 0.35$: no backtracking needed. But the true angle exceeds the 60° limit, so the tracker sits at $-60°$. Is there shade at $-60°$? Shadow width $L\cos(65.6° - 60°) = 0.995L$ against row spacing $p\cos 65.6° = L \times 0.413/0.35 = 1.18L$: no shade. The cost is a 5.6° pointing error in the transverse plane, $1 - \cos 5.6° = 0.5\%$ of beam.`,
            },
            {
              md: md`**GCR 0.45.** $\cos 65.6° = 0.413 < 0.45$: backtrack. $\arccos(0.413/0.45) = \arccos(0.918) = 23.4°$. $R_b = -(65.6° - 23.4°) = -42.2°$.`,
            },
            {
              md: md`**Energy cost of backtracking.** Beam on the plane falls by $\cos 23.4° = 0.918$, an 8.2% beam loss for this hour relative to an unshaded true-tracking row. Diffuse is barely affected. The denser layout bought land and cable savings with morning and evening energy.`,
            },
          ],
          result: md`At 07:00 in June the GCR 0.35 plant is limit-bound at $-60°$ with no shade; the GCR 0.45 plant backtracks to $-42.2°$ and loses about 8% of beam that hour. Backtracking time and loss rise with GCR, which is why the GCR choice is an energy decision, not only a land decision.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "21 December, 08:00 solar time, GCR 0.35",
          given: md`Sun (declination $-23.45°$, hour angle $-60°$): elevation 11.85°, $\theta_z = 78.15°$, $\gamma_s = 125.73°$. True-tracking angle from the formula: $\tan R = \tan 78.15° \times \sin(125.73° - 180°) = 4.768 \times (-0.812) = -3.870$, so $R_\text{true} = -75.5°$. GCR 0.35, limit $\pm 60°$.`,
          steps: [
            {
              md: md`**Is backtracking needed?** $\cos 75.5° = 0.250$, below 0.35.`,
              hidden: true,
              check: { prompt: "cos of the true-tracking angle (3 decimals)", answer: 0.25, tolerance: { abs: 0.005 } },
            },
            {
              md: md`**Correction.** $\arccos(0.250/0.35) = \arccos(0.715) = 44.4°$.`,
              hidden: true,
              check: { prompt: "Backtracking correction angle", answer: 44.4, unit: "°", tolerance: { abs: 0.5 } },
            },
            {
              md: md`**Backtracked angle.** $R_b = -(75.5° - 44.4°) = -31.1°$, inside the mechanical limit.`,
              hidden: true,
              check: { prompt: "Backtracked rotation angle (negative = east)", answer: -31.1, unit: "°", tolerance: { abs: 0.5 } },
            },
            {
              md: md`**Beam ratio.** Beam on the backtracked plane is $\cos 44.4° = 0.715$ of the true-tracking beam. Residual incidence under true tracking was already 34.9° ($\cos = 0.821$), so the backtracked incidence cosine is $0.821 \times 0.715 = 0.587$.`,
            },
          ],
          result: md`A winter morning in Kuwait costs a dense plant about 29% of the beam for that hour. These hours carry little energy (low sun, long air mass), which is why annual backtracking losses stay in the low single-digit percent range for typical GCRs. Use the widget to see how the morning shoulder changes with GCR.`,
        },
        {
          kind: "question",
          question: {
            id: "mz05-l01-p1",
            type: "numeric",
            prompt: md`A 1P tracker plant has a GCR of 0.40. Above what absolute true-tracking angle (in degrees) does backtracking start?`,
            answer: 66.4,
            tolerance: { abs: 0.3 },
            unit: "°",
            explanation: md`Backtracking is needed when $\cos R_\text{true} < \text{GCR}$, so the threshold is $\arccos 0.40 = 66.4°$. If the mechanical limit is 60°, the tracker first sits at the limit and starts backtracking when the backtracked angle $|R_\text{true}| - \arccos(\cos R_\text{true}/0.40)$ falls below 60°.`,
            concepts: ["mz05.backtracking"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Reviewing a tracking algorithm on a real plant",
      blocks: [
        {
          kind: "md",
          md: md`**Who owns what.** The tracking algorithm runs in the tracker vendor's firmware, on each row's tracker control unit (TCU), from a clock, the site coordinates and an astronomical model. The EPC's energy model (PVsyst, or pvlib for analysts) assumes an algorithm and a GCR; the vendor's algorithm must match it or the P50 is wrong. The O&M contractor watches tracking availability and angle errors in SCADA.

**What to look at in practice.**
- **Angle accuracy**: each TCU measures its own angle with an inclinometer. Calibration drift, a slipped drive or a loose torque-tube clamp shows up as a row whose angle disagrees with its neighbours or whose output is low at the shoulders.
- **Algorithm parameters**: GCR, row height and slope used in backtracking must be the as-built values, not the design values.
- **Time and location**: a TCU with a clock error of 10 minutes points 2.5° off (the sun moves 15° per hour). After a controller replacement, check the clock source.
- **Stuck rows**: the most common real loss. A row parked flat all day loses most of the tracker gain for that row (on a clear summer day, tens of percent of its energy; compare the tracker with a fixed array at 0° tilt in the widget), so a few percent of stuck rows is a material plant loss.

**Tools.** pvlib's singleaxis function implements the equations in this lesson (true tracking plus backtracking, with optional cross-axis slope), which makes it the natural reference to compare against the commanded and measured angles in SCADA. That comparison is a simple, credible first analytic for a Mizan control product.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- The energy model assumes ideal backtracking on flat ground; the site has a 2 to 3% cross-slope and rows shade each other every morning.
- Sign conventions differ between vendor, SCADA and the analyst's code (east positive vs west positive). A plot of commanded angle against pvlib's angle that looks perfectly mirrored is a sign error, not a broken plant.
- Diffuse or bifacial modes are switched on without measurement, and nobody can tell whether they gain or lose energy.
- Rows parked in a cleaning or maintenance position are never returned to tracking.`,
        },
        {
          kind: "checklist",
          title: "Checks before you claim an algorithm gain",
          items: [
            "Measured row angles, commanded angles and pvlib reference angles on one time axis for a clear day",
            "As-built GCR, row height and cross-slope used by the vendor's backtracking",
            "Tracking availability by row (time in commanded position within the vendor's tolerance)",
            "Reference cells on a tracking row and a flat row to judge diffuse-mode decisions",
            "A baseline period with the vendor's default algorithm before any change",
          ],
        },
        {
          kind: "ask",
          title: "Ask the tracker vendor or EPC",
          items: [
            "Which backtracking model does the firmware use: flat-ground, slope-aware, or row-by-row from survey?",
            "What tracking accuracy (degrees) is guaranteed, and how is it measured at commissioning?",
            "Is there a diffuse or bifacial mode, what triggers it, and what evidence shows it gains energy at a desert site?",
            "What clock and position source does each TCU use, and how is it resynchronised?",
            "Can the plant read commanded and measured angle per row through SCADA, at what resolution?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz05-l01-p2",
            type: "short",
            prompt: md`Write the "Tracking algorithm" section (about 200 to 300 words) of a technical questionnaire Mizan would send to a tracker vendor and EPC before proposing any control function on a Gulf tracker plant. It must ask for the information you need to reproduce the vendor's commanded angles independently, and state how you will verify them.`,
            rubric: [
              "Asks for the algorithm type: true tracking plus backtracking, and whether slope-aware or row-by-row terrain backtracking is used",
              "Asks for the parameters needed to reproduce angles: GCR, axis azimuth and tilt, mechanical limits, row height, cross-slope, time and location source",
              "Asks for data access: commanded and measured angle per row, mode flags (diffuse, stow, maintenance) and their resolution in SCADA",
              "Asks about special modes (diffuse, bifacial, hail, wind) and their triggers",
              "States a verification method: compare commanded and measured angles against an independent reference (pvlib singleaxis) on clear days, with a stated tolerance",
              "Uses correct sign convention or asks the vendor to state it",
            ],
            modelAnswer: md`**Tracking algorithm.** (1) Please describe the tracking algorithm: astronomical true tracking with backtracking, and whether backtracking is flat-ground, slope-aware (cross-axis slope) or row-by-row from the as-built survey. (2) Provide, per block, the parameters used: GCR, axis azimuth and axis tilt, mechanical rotation limits, torque-tube height, cross-axis slope per row, and the sign convention for rotation (we use 0 = flat, negative = east). (3) State the time and position source of each tracker controller and how clocks are synchronised. (4) List special modes (diffuse, bifacial optimisation, wind stow, hail stow, maintenance or cleaning position, night position), the trigger for each and the angle commanded. (5) State the tracking accuracy you guarantee and the commissioning method. (6) Confirm which signals are readable through SCADA: commanded angle, measured angle, mode and fault flags per row, and the sample interval and history length. **Verification.** On five clear days we will compute reference angles with pvlib's singleaxis function using your parameters and compare them with commanded and measured angles per row. We will report rows outside plus or minus 2° (or your guaranteed accuracy if tighter) during tracking hours, and the share of rows not in their commanded mode. Any proposal from us will start from this baseline.`,
            explanation: md`Reproducing the vendor's angles independently is the foundation of any control or analytics claim: without the parameters, convention and data access you cannot tell an algorithm gain from a configuration error.`,
            concepts: ["mz05.true-tracking", "mz05.backtracking", "mz05.bifacial-tracking"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a plant owner's finance manager why their tracker deliberately turns away from the sun at dawn and dusk, and why that is not a fault.",
          keyPoints: [
            "Rows close together would shade each other at low sun angles",
            "Shade on part of a module drops whole cell strings through bypass diodes, so it costs far more than its area",
            "Backtracking turns rows flatter so shadows just miss the next row",
            "It loses a little beam light (a cosine loss) to avoid a much bigger shading loss",
            "The loss is larger for denser plants (higher ground coverage ratio) and in winter",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz05-l01-q1",
      type: "numeric",
      prompt: md`Sun zenith 50°, azimuth 250° (afternoon). What is the true-tracking angle of a horizontal north-south tracker (axis azimuth 180°), in degrees, with west positive?`,
      answer: 48.2,
      tolerance: { abs: 0.5 },
      unit: "°",
      explanation: md`$\tan R = \tan 50° \times \sin(250° - 180°) = 1.192 \times 0.940 = 1.120$, so $R = 48.2°$. Positive: facing west, as expected in the afternoon.`,
      concepts: ["mz05.true-tracking"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "mz05-l01-q2",
      type: "mcq",
      prompt: md`Why is the residual incidence angle of a horizontal single-axis tracker at 29°N larger on a December morning than on a June morning?`,
      options: [
        "The tracker rotates more slowly in winter",
        "In December the sun is in the south-east, so it has a large component along the north-south axis that rotation cannot remove",
        "Backtracking is switched off in winter",
        "Air mass is higher in winter",
      ],
      answer: 1,
      explanation: md`Residual incidence comes from the axial sun component $s_N = \sin\theta_z \cos\gamma_s$. In June the morning sun is near due east (small $s_N$); in December it is in the south-east, so $|s_N|$ is large. Air mass reduces DNI but does not change geometry.`,
      concepts: ["mz05.tracking-incidence"],
      difficulty: 2,
    },
    {
      id: "mz05-l01-q3",
      type: "numeric",
      prompt: md`GCR 0.40, true-tracking angle $-72°$. What is the backtracked angle in degrees (negative = east)?`,
      answer: -32.6,
      tolerance: { abs: 0.6 },
      unit: "°",
      explanation: md`$\cos 72° = 0.309 < 0.40$, so backtrack. $\arccos(0.309/0.40) = \arccos(0.7725) = 39.4°$. $R_b = -(72° - 39.4°) = -32.6°$.`,
      concepts: ["mz05.backtracking"],
      difficulty: 2,
    },
    {
      id: "mz05-l01-q4",
      type: "multi",
      prompt: md`Which statements about backtracking are correct?`,
      options: [
        "A higher GCR means backtracking starts at a smaller tracking angle",
        "At sunrise a backtracking tracker is close to flat",
        "Backtracking removes all incidence losses",
        "On a cross-axis slope, flat-ground backtracking can still let rows shade each other",
        "Backtracking is mainly needed for thin-film modules",
      ],
      answer: [0, 1, 3],
      explanation: md`Threshold $\arccos(\text{GCR})$ falls as GCR rises. At sunrise $R_b \to 0$. Backtracking deliberately adds a cosine loss. Slopes need slope-aware algorithms. It matters most for crystalline modules, where partial shade triggers bypass diodes.`,
      concepts: ["mz05.backtracking", "mz05.bifacial-tracking"],
      difficulty: 2,
    },
    {
      id: "mz05-l01-q5",
      type: "mcq",
      prompt: md`During a heavy dust event DNI falls to 80 W/m² and DHI rises to 380 W/m². What is the main reason a controller might flatten the rows?`,
      options: [
        "To reduce wind load",
        "A near-flat plane sees more of the bright diffuse sky, which can outweigh the small beam gain from pointing at the sun",
        "To protect the modules from abrasion",
        "Because the astronomical algorithm stops working without DNI",
      ],
      answer: 1,
      explanation: md`The sky view factor $(1+\cos R)/2$ is largest when flat. When beam is small, the diffuse gain from flattening can exceed the beam loss. Abrasion and wind are separate stow reasons (lessons 2 and 3).`,
      concepts: ["mz05.diffuse-tracking"],
      difficulty: 1,
    },
    {
      id: "mz05-l01-q6",
      type: "decision",
      prompt: md`An IPP's analyst tells you the commanded angles in SCADA look "exactly mirrored" against your pvlib reference curve: when pvlib says $-40°$, SCADA says $+40°$. What do you do first?`,
      options: [
        { text: "Report a fleet-wide tracking fault to the owner", score: 0, feedback: "A perfect mirror image across all rows is almost never a physical fault; you would lose credibility." },
        { text: "Check the sign convention in the vendor's tag list and in your code, and re-plot", score: 1, feedback: "Right. Mirrored curves are the signature of opposite rotation sign conventions. Confirm with the vendor's documentation and one known-time sample." },
        { text: "Ignore the angle data and work only from inverter power", score: 0.3, feedback: "Power data helps but throws away the most direct evidence. Fix the convention first." },
      ],
      explanation: md`Vendors, SCADA integrators and pvlib may define positive rotation differently. Always establish the convention from documentation and a morning sample (rows must face east in the morning).`,
      concepts: ["mz05.true-tracking"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz05-l01-f1", front: "True-tracking angle, horizontal N-S axis", back: md`$\tan R = \tan\theta_z \sin(\gamma_s - \gamma_a)$, with $\gamma_a = 180°$; negative = east.`, concepts: ["mz05.true-tracking"] },
    { id: "mz05-l01-f2", front: "Residual incidence on a single-axis tracker", back: md`$\cos\theta = \sqrt{1 - (\sin\theta_z\cos(\gamma_s-\gamma_a))^2}$: the axial sun component cannot be tracked out.`, concepts: ["mz05.tracking-incidence"] },
    { id: "mz05-l01-f3", front: "Backtracking condition", back: md`Backtrack when $\cos R_\text{true} < \text{GCR}$. GCR 0.35 starts at 69.5°, GCR 0.45 at 63.3°.`, concepts: ["mz05.backtracking"] },
    { id: "mz05-l01-f4", front: "Backtracked angle", back: md`$|R_b| = |R_\text{true}| - \arccos(\cos R_\text{true}/\text{GCR})$; beam falls by the cosine of the correction.`, concepts: ["mz05.backtracking"] },
    { id: "mz05-l01-f5", front: "Why flat can beat tracking in dust", back: "Dust collapses DNI and raises DHI; a flat plane sees the most sky. The gain is small, and forward scattering means it must be measured, not modelled.", concepts: ["mz05.diffuse-tracking"] },
    { id: "mz05-l01-f6", front: "Clock error and pointing error", back: "The sun moves 15° per hour, so a 10-minute clock error points a tracker about 2.5° off.", concepts: ["mz05.true-tracking"] },
    { id: "mz05-l01-f7", front: "Slope-aware backtracking", back: "Modifies the shading condition with the cross-axis slope (Anderson and Mikofski, NREL 2020); flat-ground backtracking shades on slopes.", concepts: ["mz05.bifacial-tracking", "mz05.backtracking"] },
  ],
};

export default lesson;
