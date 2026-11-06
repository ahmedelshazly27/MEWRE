import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz01-l05",
  title: "Mitigation physics: coatings, stow angle, tilt and row spacing, and their limits",
  summary:
    "What each mitigation lever does to arrival, sticking and removal: hydrophobic, hydrophilic and antistatic coatings; night-time steep and vertical stow and the evidence behind it; tilt, row spacing and mounting height on fixed plants; the economics of a lower soiling rate; and how to design a trial that a KISR researcher would accept.",
  minutes: 80,
  objectives: [
    "Map each mitigation lever onto the soiling balance: arrival flux, sticking fraction and removal",
    "Explain how hydrophobic, hydrophilic and antistatic coatings work and why their field results in deserts are mixed",
    "Summarise the evidence for night-time steep or vertical stow (Figgis 2019, Khan 2024, Cal Poly 2020) and its limits",
    "Compute the value of a lower soiling rate with re-optimised cleaning, using the square-root law",
    "Design a controlled field trial for a stow or coating intervention with clear metrics and honest uncertainty",
  ],
  concepts: [
    {
      id: "mz01.soiling-balance",
      name: "Soiling balance and mitigation levers",
      description: "Net soiling rate is arrival flux times sticking fraction minus removal; each mitigation acts on one or two terms, which predicts where it will work and where it will not.",
      competency: "mz-soiling",
      related: ["mz01.deposition-flux", "mz01.adhesion-forces", "mz01.resuspension"],
    },
    {
      id: "mz01.anti-soiling-coatings",
      name: "Anti-soiling coatings (hydrophobic, hydrophilic, antistatic)",
      description: "Surface treatments that lower adhesion (low surface energy, high contact angle), promote water sheeting, or bleed static charge; limited in deserts by scarce rain, sand and brush abrasion, UV ageing and possible transmission loss.",
      competency: "mz-soiling",
      related: ["mz01.adhesion-forces", "m02.cleaning-strategy"],
    },
    {
      id: "mz01.night-stow",
      name: "Night-time soiling stow",
      description: "Holding single-axis trackers at a steep or vertical angle at night to cut settling (cos β), dew (sky view factor) and calm-air retention; field evidence is promising but small or confounded, and tracker range, wind-stow and robot constraints apply.",
      competency: "mz-soiling",
      related: ["mz01.tilt-wind", "mz01.dew-formation", "m02.wind-stow", "m02.tracker-vs-fixed"],
    },
    {
      id: "mz01.layout-mitigation",
      name: "Tilt, row spacing and mounting height",
      description: "On fixed plants, steeper tilt reduces deposition and dew but changes yield; windward rows shelter interior rows but take more impaction; higher clearance reduces saltating sand; layout trades soiling against land, yield and structure cost.",
      competency: "mz-soiling",
      related: ["mz01.tilt-wind", "mz01.deposition-flux"],
    },
    {
      id: "mz01.mitigation-value",
      name: "Value of a lower soiling rate",
      description: "With re-optimised cleaning, minimum annual soiling cost scales with the square root of the soiling rate, so a 30% rate reduction saves about 16% of that cost and lengthens the cleaning interval by about 20%.",
      competency: "mz-soiling",
      related: ["mz01.soiling-balance", "m12.cleaning-economics"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Every lever acts on arrival, sticking or removal",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan's product direction includes plant control functions such as stow and tracker control under dust, wind and heat. The research brief found no major tracker vendor publicly marketing a dust-specific or soiling-optimised night stow, which looks like a white space but is unverified against vendor manuals. To sell into it you must know exactly what the physics promises, how strong the evidence is, and where each lever stops working, because a KISR researcher or a tracker OEM will ask.`,
        },
        {
          kind: "md",
          md: md`### The soiling balance

Lessons 2 and 3 give a compact model of the net soiling rate:

$$r_{net} \approx \underbrace{F}_{\text{arrival}} \times \underbrace{s}_{\text{sticking}} - \underbrace{R}_{\text{removal}}$$

with $F$ the deposition flux, $s$ the fraction that sticks and is retained (raised by dew and cementation) and $R$ removal by wind, condensate run-off, rain or cleaning. Every mitigation acts on one or two terms:

| Lever | Arrival $F$ | Sticking $s$ | Removal $R$ | Main limit |
|---|---|---|---|---|
| Hydrophobic coating | small | lower (lower surface energy, lower capillary force) | higher if water rolls off | needs water; abrasion; UV ageing |
| Hydrophilic / photocatalytic coating | none | mixed | higher with rain (sheeting) | Kuwait has very little rain; may favour wet films in dew |
| Antistatic coating | lower for charged fines | lower in dry air | small | electrostatics are a minor term when humid |
| Steep or vertical night stow | lower ($\cos\beta$) | lower (less dew, sky view factor) | higher (drainage, wind exposure) | tracker range, wind and robot constraints; daytime dust not addressed |
| Steeper fixed tilt | lower | lower | higher | yield and structure cost |
| Higher mounting, layout | lower near-ground sand | none | slight | structure cost, wind loads |
| Cleaning (dry, wet) | none | none | resets to clean | cost, water, abrasion |

### Coatings

**Hydrophobic** coatings (fluorinated or silane-based, often nano-structured) lower the surface energy of the glass. In the capillary formula $F_{cap} \approx 2\pi\gamma d\cos\theta$, a high contact angle reduces the meniscus force, and van der Waals forces also fall with lower surface energy. Water forms droplets rather than films (dropwise condensation), and on a steep enough tilt droplets roll off and pick up particles. In a desert the weak points are: little water to do the rolling, **abrasion** by quartz sand (harder than the coating) and by robot brushes, **UV and heat ageing** of organic chemistries, and a possible small **transmission penalty** or loss of the anti-reflective effect.

**Hydrophilic** and **photocatalytic** (for example titanium dioxide) coatings spread water into a sheet that rinses dust when it rains, and break down organic films under UV. They suit climates with regular rain. With dew but little rain, a sheeting film may wet the whole dust layer, which favours cementation rather than removal; results in dewy deserts are mixed.

**Antistatic** coatings (transparent conductive layers) bleed charge from the glass to the frame and ground, reducing electrostatic attraction of charged fines. Saltation charges dust strongly in dry air, so the benefit is greatest on dry, dusty days; on humid nights the glass is already conductive enough.

Most modules already carry a porous silica **anti-reflective coating** (ARC) that adds roughly 2 to 3% transmission. Any anti-soiling layer competes with or sits on it, and brushing abrades both. Abrasion test methods for module front surfaces are standardised in IEC TS 62788-7-3, which a buyer can ask for. Track 0 notes that field results for anti-soiling coatings are mixed, with some showing 20 to 50% lower initial soiling rates and durability of one to three years.

**Electrodynamic screens**, transparent electrodes that move charged dust with travelling electric fields, are another physical approach studied for deserts and space, not yet a utility-scale product.

### Night-time stow

A single-axis tracker spends 10 to 12 hours a night in whatever position its controller chooses, usually flat or the robot parking angle. Night is when the air is calm, humidity peaks and dew forms. Moving to a steep angle at night acts on all three terms:

- **Arrival:** settling flux falls with $\cos\beta$: half at 60°, near zero at 90°.
- **Sticking:** the sky view factor $F_{sky} = (1+\cos\beta)/2$ falls from 1.0 flat to 0.75 at 60° and 0.5 vertical, so the glass cools less and dew is rarer; condensate that does form drains.
- **Removal:** a steep face is more exposed to wind shear, and gravity helps particles roll.

The field evidence, as recorded in the research brief:

| Study | Setting | Result | Caveat |
|---|---|---|---|
| Figgis et al. 2019 (Solar Energy) | Qatar, plates at many tilts in perpendicular wind | Deposition peaks near 45° facing the wind, accumulation near 22° facing away; recommends night stow at maximum tilt toward the wind | Plates, not a tracker plant |
| Khan et al. 2024 (Prog. Photovolt.) | Saudi Arabia | Anti-soiling coating plus **vertical** night stow cut soiling losses by up to 85% | Coating and stow combined; stow effect alone not isolated |
| Cal Poly 2020 (student study) | California | 52° night stow gave about 20% less soiling loss in the first week | Small dataset, one week, different climate |

The physics is sound and the direction is consistent; the **size of the effect at a Kuwaiti tracker plant is unknown**. That gap is an opportunity for a controlled trial, not a number to put in a sales deck.

### Constraints on stow

- **Range:** many single-axis trackers rotate to about ±50 to 60°; some newer hail-stow designs reach 75 to 77° (Array DuraTrack Hail XP, 77°, May 2025). Vertical stow is not available on most installed trackers.
- **Wind:** wind-stow angles are set by wind-tunnel studies to avoid aeroelastic instability; a steep night angle must be compatible with the wind-stow logic and its thresholds at all times.
- **Robots:** row-mounted robots need the rows at a parking or cleaning angle when they run; night stow must be sequenced around the robot schedule (Lesson 3).
- **Morning return:** the tracker must be back at its backtracking angle before useful irradiance; motor energy and actuator wear add a small cost.
- **Daytime dust:** night stow does nothing for dust that arrives and sticks during the day; a daytime dust stow trades energy now for soiling avoided, which the stow-decision widget lets you explore.`,
        },
        {
          kind: "widget",
          widget: "stow-decision",
          caption: "Wind forecast vs vendor threshold, damage cost, energy lost while stowed and soiling avoided by a steep dust stow. Note how the soiling credit compares with the energy cost of stowing in daylight: at night the energy cost is zero.",
        },
        {
          kind: "md",
          md: md`### Fixed plants: tilt, row spacing and height

- **Tilt:** at Kuwait's latitude (about 29°N) the yield-optimal fixed tilt is in the 20s of degrees. Steeper tilt reduces settling and dew and helps run-off, but lowers annual yield and raises wind loads and row spacing. A few degrees above the yield optimum can be justified on soiling grounds only with site data.
- **Row spacing (ground coverage ratio):** wider spacing reduces inter-row shading but gives the wind more fetch between rows; the windward edge rows take the impaction load and shelter the interior, which collects more fines in recirculation. Sensor placement and cleaning priority follow from this.
- **Mounting height:** the lowest 1 to 2 m above a sandy surface carry saltating sand; a higher lower edge reduces abrasion and coarse deposition.
- **Local sources:** paving or stabilising internal roads and laydown areas often reduces soiling on downwind blocks more than any coating.

Tracker architecture and wind stow are covered in Track 0; this lesson adds the soiling angle.`,
        },
        { kind: "xref", to: "m02-l04", note: "Plant architecture and trackers in Track 0: tracker range, backtracking and why single-axis trackers dominate Gulf utility PV." },
        {
          kind: "md",
          md: md`### What a lower soiling rate is worth

With the sawtooth model from Track 0 (average loss $rN/2$ between cleanings) and re-optimised cleaning, the minimum annual cost of soiling is:`,
        },
        { kind: "equation", formula: "mz01-cleaning-cost-optimum" },
        {
          kind: "md",
          md: md`The square root is the key insight for selling mitigation: **halving the soiling rate does not halve the soiling cost**; it cuts it by 29% ($1 - \sqrt{0.5}$) and lengthens the optimal interval by 41%. A mitigation must be cheap relative to the soiling cost it addresses, which favours software levers such as night stow over hardware.`,
        },
        {
          kind: "widget",
          widget: "soiling",
          caption: "Cleaning-interval optimiser from Track 0. Reduce the soiling rate by 30% and check that the optimal interval grows by about 20% and the total annual cost falls by about 16%.",
        },
      ],
    },
    {
      layer: "applied",
      title: "The economics and physics of a mitigation, with numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What a 30% lower soiling rate is worth at a 500 MWp plant",
          given: md`Same illustrative plant as Track 0 module 2: 500 MWp, unsoiled energy $E = 1{,}050{,}000$ MWh/yr, full-plant cleaning $C$ = USD 75,000 per cycle, energy value $p$ = USD 15/MWh, soiling rate $r = 0.3$ %/day $= 0.003$/day. A night-stow programme is assumed (not measured) to cut the rate by 30%, to 0.0021/day.`,
          steps: [
            { md: md`**Baseline:** $N^* = \sqrt{730\times75{,}000/(1{,}050{,}000\times15\times0.003)} = \sqrt{54{,}750{,}000/47{,}250} = 34.0$ days; $TC^* = \sqrt{730\times75{,}000\times1{,}050{,}000\times15\times0.003} =$ USD 1.61 m/yr.` },
            { md: md`**With mitigation:** $N^* = 34.0/\sqrt{0.7} = 40.7$ days; $TC^* = 1.61\times\sqrt{0.7} =$ USD 1.35 m/yr.` },
            { md: md`**Saving with re-optimised cleaning:** $1.608 - 1.346 =$ USD 0.26 m/yr, **16%** of the soiling cost, or about USD 525 per MWp per year.` },
            { md: md`**Saving if the cleaning interval stays at 34 days:** loss cost falls by 30% of USD 0.80 m $=$ USD 0.24 m/yr. Re-optimising adds about USD 0.02 m: most of the value comes from the rate, but the interval should still be moved.` },
            { md: md`**Interpretation:** at a Gulf IPP tariff, a mitigation worth about USD 525 per MWp per year must cost less than that. A software change to night stow on existing trackers can clear that bar easily; a coating with a two-year life costing more than about USD 1,000 per MWp cannot, unless it also cuts cleaning water or abrasion. At a system value of energy several times the tariff (Track 0 module 2), the same mitigation is worth proportionally more to MEWRE than to the IPP.` },
          ],
          result: md`A 30% lower soiling rate is worth about 16% of soiling cost, not 30%, because the plant re-optimises cleaning. Cheap levers (control logic) win; expensive hardware levers need additional benefits or a higher energy value to pay back. All inputs are illustrative.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Shamal-season mitigation and the physics factors behind it",
          given: md`Same plant during the dusty season: $r = 0.6$ %/day (0.006/day), annualised for the comparison. A combined night-stow and road-stabilisation programme is assumed to cut the rate by 25%. Separately, compare a tracker's night position at 0° (flat) with 60°.`,
          steps: [
            { md: md`Baseline: $N^* = \sqrt{54{,}750{,}000/(1{,}050{,}000\times15\times0.006)} = 24.1$ days, $TC^* =$ USD 2.27 m/yr.` },
            {
              md: md`With the 25% lower rate: $N^* = 24.1/\sqrt{0.75} = 27.8$ days.`,
              hidden: true,
              check: { prompt: "New optimal cleaning interval (days)", answer: 27.8, unit: "days", tolerance: { abs: 0.2 } },
            },
            {
              md: md`Cost reduction: $1 - \sqrt{0.75} = 13.4\%$; $TC^* = 2.27\times0.866 =$ USD 1.97 m/yr.`,
              hidden: true,
              check: { prompt: "Reduction in minimum soiling cost (%)", answer: 13.4, unit: "%", tolerance: { abs: 0.3 } },
            },
            { md: md`Physics factors, flat vs 60° at night: settling flux $\cos60° = 0.50$ of flat; sky view factor $0.75$ of flat, so less radiative cooling and fewer dew nights. Neither factor equals the soiling-rate change: daytime deposition, wind removal and dew thresholds intervene, which is why the rate reduction must be measured.` },
          ],
          result: md`The physics sets the direction and an upper bound for each mechanism; only a trial gives the rate change. Even a solid 25% reduction in the dusty season trims the soiling cost by about 13%, so the business case rests on low implementation cost.`,
        },
        {
          kind: "question",
          question: {
            id: "mz01-l05-p1",
            type: "numeric",
            prompt: md`A mitigation halves the soiling rate. With cleaning re-optimised, by what percentage does the minimum annual soiling cost fall? (1 decimal)`,
            answer: 29.3,
            tolerance: { abs: 0.2 },
            unit: "%",
            explanation: md`$TC^* \propto \sqrt{r}$, so the cost falls by $1 - \sqrt{0.5} = 1 - 0.707 = 29.3\%$, and the interval grows by $1/\sqrt{0.5} = 1.41$ times.`,
            concepts: ["mz01.mitigation-value"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Evidence, trials and selling mitigation honestly",
      blocks: [
        {
          kind: "md",
          md: md`### How to test a mitigation so the result survives review

1. **Hypothesis and metric:** for example, "night stow at the maximum safe angle reduces the soiling rate (%/day between cleanings) relative to flat night stow". Use soiling rate from reference pairs or from PV data between cleanings, not a single before-and-after picture.
2. **Design:** paired treatment and control rows or blocks with the same module type, tilt range, cleaning schedule and wind exposure; alternate blocks to spread position effects (windward vs interior).
3. **Duration:** cover at least one dew season and one shamal season; storms and dew dominate the variance (the Doha standard deviations of about ±1 %/day show how noisy single days are).
4. **Confounders:** robot schedule, cleaning events, sensor cleaning, construction dust, tracker faults. Log them.
5. **Analysis:** robust slope per soiling interval (Theil-Sen, as in the stochastic rate and recovery method), difference with confidence interval, energy and cost translation as a separate step.
6. **Reporting:** state the measured difference and its uncertainty, the conditions, and what was not tested. Co-publish the method with the research partner where possible.

### Selling it

- Lead with **physics and a test plan**, not a percentage. "Up to 85%" (Khan 2024) is a combined coating and vertical stow result in Saudi Arabia; quoting it for a stow-only change on a 60° tracker in Kuwait would be wrong.
- Price against the **value of a lower rate** (square-root law) and the buyer's energy value.
- Map the **constraints** with the tracker OEM first: maximum angle, wind-stow interplay, robot parking, warranty, and whether the controller exposes a setpoint interface.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Quoting combined-intervention results for a single lever:** the Khan 2024 figure includes a coating.
- **Short trials:** a week (Cal Poly) or a month without a dew period says little about an annual rate.
- **Ignoring the wind-stow envelope:** a steep night angle that is unsafe in a gust front is not a mitigation.
- **Coatings without abrasion data:** a coating that is gone after a summer of robot brushing has no annual value.
- **Forgetting the robots:** night stow that conflicts with the robot schedule can increase soiling.
- **Calling a white space a fact:** that no vendor markets a dust stow is a reading of public material, unverified against manuals.`,
        },
        {
          kind: "checklist",
          title: "Evaluating an anti-soiling coating offer",
          items: [
            "Field data from a hot desert site with dew, at least 12 months, with a control",
            "Initial transmission change and compatibility with the existing anti-reflective coating",
            "Abrasion resistance (IEC TS 62788-7-3 method or equivalent) and compatibility with the plant's robot brushes",
            "UV and damp-heat durability; expected life and reapplication method",
            "Module manufacturer warranty position on the coating",
            "Cost per MWp against the value of the measured soiling-rate reduction",
          ],
        },
        {
          kind: "ask",
          title: "Ask the tracker OEM before proposing a soiling stow",
          items: [
            "What is the maximum rotation angle in normal operation, and can the controller hold it overnight?",
            "Which stow angles are permitted at which wind speeds, per your wind-tunnel study? Is any steep angle restricted?",
            "Does the controller accept an external setpoint or mode command (through the plant controller or SCADA), and under what warranty terms?",
            "How is robot parking sequenced with stow, and who owns that logic?",
            "What motor energy and actuator duty does a nightly steep stow add?",
          ],
        },
        { kind: "scenario", scenario: "mz01-s2" },
        {
          kind: "question",
          question: {
            id: "mz01-l05-p2",
            type: "short",
            prompt: md`Design a one-page field trial that Mizan could propose to test night-time soiling stow at a Kuwaiti single-axis tracker plant (or on a tracker test rig at Shagaya, if KISR agrees). Include the hypothesis, treatment and control, metrics, duration, confounders, safety constraints and how the result will be reported. Do not claim the trial is agreed or any result.`,
            rubric: [
              "States a testable hypothesis with a clear metric (soiling rate %/day between cleanings or soiling ratio slope)",
              "Defines treatment and control with matched rows or blocks and alternation to spread wind-exposure effects",
              "Covers a dew season and a shamal season and logs confounders (cleaning, robots, sensor cleaning, local dust sources, tracker faults)",
              "Respects tracker constraints: maximum angle, wind-stow priority, robot parking and morning return, agreed with the OEM",
              "Specifies analysis with uncertainty (robust slopes, confidence interval) and separates energy and cost translation",
              "Describes status honestly (proposal, KISR as methodology partner) and plans co-publication or shared reporting",
            ],
            modelAnswer: md`**Trial proposal (draft for discussion): night-time soiling stow**

**Hypothesis:** holding trackers at their maximum safe night angle (for example 55 to 60°, per the OEM), facing into the prevailing night wind where possible, reduces the soiling rate compared with flat night stow, by reducing settling, dew and calm-air retention.

**Design:** 8 matched tracker rows in two adjacent blocks, alternating treatment (steep night stow) and control (flat). Each block has a clean and soiled reference pair mounted on a treatment row and on a control row, plus string-level PV monitoring. Same modules, cleaning schedule and robot type. Front-glass temperature and wetness sensors on one row of each group.

**Metrics:** soiling rate (%/day) from the reference pairs and from string performance between cleanings (robust Theil-Sen slope per interval); dew-night frequency per group; cleaning recovery.

**Duration:** 12 months, covering the cool dew season and the summer shamal. Interim review at 4 months.

**Confounders logged:** cleaning and robot runs, sensor cleaning, dust storms, construction or road traffic upwind, tracker faults or stow overrides.

**Safety and constraints:** wind-stow logic overrides the soiling stow at all times; angles and sequencing agreed in writing with the tracker OEM (warranty); robot runs before the soiling stow begins; trackers return to backtracking before sunrise.

**Analysis and reporting:** difference in mean soiling rate with 95% confidence interval; energy and cost translated separately using the plant's cleaning cost and energy value (square-root law). Results reported with KISR as methodology partner, including null results, with the intent to co-publish the method.

**Status:** a proposal; no agreement, data or results exist yet.`,
            explanation: md`A credible trial isolates one lever, matches controls, covers the seasons that dominate variance, keeps wind safety first and reports uncertainty.`,
            concepts: ["mz01.night-stow", "mz01.soiling-balance", "mz01.mitigation-value"],
            difficulty: 3,
          },
        },
        { kind: "xref", to: "m02-l05", note: "Track 0 cleaning methods, coatings overview, wind stow and the cleaning-interval formula used here." },
        { kind: "sources", refs: ["mz01-r5", "mz01-r6", "mz01-r17", "mz01-r4", "mz01-r13", "mz01-r24"] },
        {
          kind: "feynman",
          prompt: "Explain to a tracker OEM's product manager why a steep night stow should reduce soiling, why the size of the effect is still unknown for Kuwait, and what you are asking him for.",
          keyPoints: [
            "At night the air is calm and humid: settling and dew drive soiling, and wind removal is weak",
            "Steep tilt cuts settling (cos β), reduces sky view and so dew, and lets condensate drain",
            "Evidence: Figgis 2019 tilt study, Khan 2024 combined coating and vertical stow, Cal Poly short study: direction consistent, magnitude unproven for a Kuwaiti tracker",
            "Constraints: maximum angle, wind-stow priority, robot parking, morning return",
            "The ask: controller access or setpoint interface and agreed angles for a controlled trial",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz01-l05-q1",
      type: "multi",
      prompt: "Which terms of the soiling balance does a steep night stow act on? (Select all that apply.)",
      options: [
        "Arrival flux, through cos β",
        "Sticking, through fewer dew nights (lower sky view factor)",
        "Removal, through drainage and wind exposure",
        "Daytime deposition during shamal afternoons",
      ],
      answer: [0, 1, 2],
      explanation: md`Night stow changes the night-time geometry only. Daytime dust that arrives and sticks while tracking is unaffected, which is one reason the overall effect is smaller than the night-time physics factors suggest.`,
      concepts: ["mz01.night-stow", "mz01.soiling-balance"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "mz01-l05-q2",
      type: "mcq",
      prompt: "Khan et al. (2024) report soiling losses cut by up to 85% in Saudi Arabia. What can you correctly claim from this for a stow-only product?",
      options: [
        "Night stow alone cuts soiling by 85%",
        "Combined coating and vertical night stow cut losses by up to 85%; the stow effect alone was not isolated",
        "Coatings alone cut soiling by 85%",
        "Nothing; the study is irrelevant",
      ],
      answer: 1,
      explanation: md`The result is for a combination. It supports the direction of the stow effect but not a stow-only number, and vertical stow is beyond the range of most installed trackers.`,
      concepts: ["mz01.night-stow"],
      difficulty: 1,
    },
    {
      id: "mz01-l05-q3",
      type: "numeric",
      prompt: md`A coating reduces the soiling rate by 20%. With cleaning re-optimised, by what factor does the optimal cleaning interval grow? (3 decimals)`,
      answer: 1.118,
      tolerance: { abs: 0.003 },
      explanation: md`$N^* \propto 1/\sqrt{r}$: $1/\sqrt{0.8} = 1.118$. The minimum soiling cost falls by $1 - \sqrt{0.8} = 10.6\%$.`,
      concepts: ["mz01.mitigation-value"],
      difficulty: 2,
    },
    {
      id: "mz01-l05-q4",
      type: "mcq",
      prompt: "Why do hydrophilic, rain-rinsed coatings tend to underperform at Kuwaiti sites?",
      options: [
        "They block infrared light",
        "They rely on regular rain to sheet water and rinse the dust, and Kuwait has rain on only a handful of days a year; with dew alone a wet film may favour cementation",
        "They attract static charge",
        "They raise the operating temperature of the module",
      ],
      answer: 1,
      explanation: md`The mechanism needs rinsing water. Dew provides wetting without enough run-off, which can be the worst case for cementation.`,
      concepts: ["mz01.anti-soiling-coatings"],
      difficulty: 2,
    },
    {
      id: "mz01-l05-q5",
      type: "order",
      prompt: "Order the steps of a credible mitigation trial.",
      items: [
        "State the hypothesis and the soiling-rate metric",
        "Agree angles and constraints with the tracker OEM",
        "Set up matched, alternating treatment and control rows with reference pairs",
        "Run through a dew season and a shamal season while logging confounders",
        "Compute the rate difference with a confidence interval, then translate to energy and cost",
      ],
      explanation: md`Metric first, safety and permissions next, then design, a long enough run and an uncertainty-aware analysis.`,
      concepts: ["mz01.night-stow", "mz01.soiling-balance"],
      difficulty: 1,
    },
    {
      id: "mz01-l05-q6",
      type: "decision",
      prompt: md`A coating supplier offers a product at an illustrative USD 3,000 per MWp with a claimed three-year life and "40% less soiling", citing a European test site. Your illustrative plant's measured value of a 30% rate reduction is about USD 525 per MWp per year. What do you advise the owner?`,
      options: [
        { text: "Buy it: 40% is more than 30%, so it pays.", score: 0, feedback: "Even a true 40% reduction is worth about USD 725 per MWp per year (1 − √0.6 = 22.5% of the soiling cost, against 16.3% for 30%); over three years about USD 2,200, below the USD 3,000 price, and the claim is from a different climate." },
        { text: "Decline for now; ask for desert field data with dew, abrasion results with the plant's robot brushes and warranty acceptance, and if promising run a priced pilot on a few rows against a control.", score: 1, feedback: "Tests the claim where it matters and keeps the decision tied to measured value." },
        { text: "Buy it for the whole plant but cancel robot cleaning to save money.", score: 0, feedback: "Abandons the main removal mechanism on the strength of an untested claim." },
      ],
      explanation: md`Price against the square-root value of the rate reduction, over the coating's real life at the site, and test before scaling.`,
      concepts: ["mz01.anti-soiling-coatings", "mz01.mitigation-value"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "mz01-l05-f1", front: "Soiling balance", back: md`$r_{net} \approx F\times s - R$: arrival times sticking minus removal. Each mitigation acts on one or two terms.`, concepts: ["mz01.soiling-balance"] },
    { id: "mz01-l05-f2", front: "Square-root law for mitigation value", back: md`$TC^* \propto \sqrt{r}$: a 30% lower rate saves about 16% of soiling cost; the interval grows about 20%.`, concepts: ["mz01.mitigation-value"] },
    { id: "mz01-l05-f3", front: "Three night-stow mechanisms", back: md`Less settling ($\cos\beta$), less dew (sky view factor $(1+\cos\beta)/2$), more drainage and wind removal.`, concepts: ["mz01.night-stow"] },
    { id: "mz01-l05-f4", front: "Khan 2024 result", back: "Coating plus vertical night stow: up to 85% lower soiling losses (Saudi Arabia); stow effect not isolated.", concepts: ["mz01.night-stow"] },
    { id: "mz01-l05-f5", front: "Main limits of anti-soiling coatings in Kuwait", back: "Little rain, sand and brush abrasion, UV and heat ageing, possible transmission or ARC penalty, warranty.", concepts: ["mz01.anti-soiling-coatings"] },
    { id: "mz01-l05-f6", front: "Stow constraints", back: "Tracker maximum angle, wind-stow priority, robot parking, return before sunrise, OEM warranty.", concepts: ["mz01.night-stow"] },
    { id: "mz01-l05-f7", front: "Cheapest fixed-plant soiling lever often overlooked", back: "Stabilising or paving internal roads and laydown areas upwind of arrays.", concepts: ["mz01.layout-mitigation"] },
  ],
  scenarios: [
    {
      id: "mz01-s2",
      title: "The tracker OEM meeting",
      context: md`Mizan has a first meeting with the regional team of a tracker manufacturer active in the Gulf. Mizan's goal is access to the controller for a soiling-stow trial at a Kuwaiti tracker plant. No plant, trial or agreement exists yet; the numbers below are illustrative.`,
      start: "a",
      concepts: ["mz01.night-stow", "mz01.mitigation-value"],
      nodes: {
        a: {
          md: md`The OEM's product manager opens: "Our customers already ask about dust. What exactly do you want to change in our controller, and what will it gain them?"`,
          choices: [
            { text: "Explain the night-time physics (settling, dew, drainage), cite the three studies with their caveats, and say the magnitude in Kuwait is unknown and is what the trial would measure.", next: "b", score: 9, feedback: "Credible: physics first, evidence with limits, a clear ask." },
            { text: "Say soiling stow cuts soiling by up to 85%.", next: "c", score: 1, feedback: "That number is a combined coating and vertical stow result; an OEM engineer will know or check." },
            { text: "Say you want to replace their controller with Mizan software.", next: "c", score: 0, feedback: "Threatens their product and warranty; the conversation ends." },
          ],
        },
        b: {
          md: md`He replies: "Our rows can go to 55°. Wind stow takes priority and the robots park at 0°. We won't open the controller, but our plant controller interface accepts a mode command." What do you propose?`,
          choices: [
            { text: "Propose a soiling-stow mode on their side, triggered by Mizan's command after the robot run, overridden by wind stow, with a matched-row trial and shared results.", next: "d", score: 10, feedback: "Works inside their architecture and safety logic, and turns the trial into a feature they own." },
            { text: "Insist on direct setpoint access for every row.", score: 3, feedback: "Unnecessary for the trial and a warranty problem for them." },
          ],
        },
        c: {
          md: md`The product manager becomes guarded: "Send us something in writing." The meeting ends early. What now?`,
          choices: [
            { text: "Send a short technical note correcting the claim, with the physics, the evidence and its caveats, and the trial proposal.", next: "b", score: 6, feedback: "Recovering with accuracy can rebuild credibility." },
            { text: "Approach a competitor with the same pitch.", score: 1, feedback: "The same claim will fail again." },
          ],
        },
        d: {
          md: md`The OEM asks how the value would be quantified for their customers.`,
          choices: [
            { text: "Measured soiling-rate difference with confidence interval, translated with the square-root law into cleaning and energy cost at each customer's own tariff and cleaning cost.", score: 10, feedback: "Honest, reproducible and customer-specific." },
            { text: "A single headline percentage from the best week of the trial.", score: 1, feedback: "Cherry-picked numbers do not survive the first customer's audit." },
          ],
        },
      },
    },
  ],
};

export default lesson;
