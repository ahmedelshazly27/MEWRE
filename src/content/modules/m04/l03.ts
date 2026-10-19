import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m04-l03",
  title: "Wakes, Layout and Desert Conditions",
  summary:
    "How turbines steal wind from each other (Jensen wake model), spacing and layout rules, IEC turbine classes, and what 50 °C heat, sand, dust and lightning do to turbines in Kuwait — and how to specify against it.",
  minutes: 75,
  objectives: [
    "You can compute a single-wake velocity deficit and power loss with the Jensen model",
    "You can apply spacing rules and explain wake losses in a layout",
    "You can select an IEC turbine class from site wind and turbulence data",
    "You can quantify high-temperature derating and specify hot-climate packages",
    "You can identify desert failure modes — leading-edge erosion, sand ingress, filter clogging, lightning — and the mitigation for each",
  ],
  concepts: [
    {
      id: "m04.wake-model",
      name: "Wake effects and the Jensen model",
      description: "Velocity deficit behind a turbine that expands and recovers downstream; Jensen/Park top-hat model with wake decay constant.",
      competency: "wind-storage",
      related: ["m04.layout-spacing"],
    },
    {
      id: "m04.layout-spacing",
      name: "Layout and spacing",
      description: "Rotor-diameter spacing rules aligned to the prevailing wind rose, trading wake losses against land, cable and road costs.",
      competency: "wind-storage",
    },
    {
      id: "m04.iec-classes",
      name: "IEC turbine classes",
      description: "IEC 61400-1 classes I/II/III by reference extreme wind and annual mean, and turbulence categories A+/A/B/C.",
      competency: "wind-storage",
    },
    {
      id: "m04.high-temp-derating",
      name: "High-temperature derating",
      description: "Reduction of turbine output above an ambient temperature limit to protect generator, converter, gearbox and transformer.",
      competency: "wind-storage",
      related: ["m04.desert-failure-modes"],
    },
    {
      id: "m04.desert-failure-modes",
      name: "Desert failure modes",
      description: "Leading-edge erosion, sand and dust ingress into bearings, seals and filters, overheating, lightning strikes.",
      competency: "wind-storage",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Wakes, classes and the desert environment",
      blocks: [
        {
          kind: "md",
          md: md`## Wakes

A turbine extracts momentum, leaving a slower, more turbulent **wake** downstream. The wake expands as it mixes with surrounding air and gradually recovers. Turbines inside wakes see less wind (less energy) and more turbulence (more fatigue loads). The simplest engineering model, still used in WAsP's PARK module and as a first estimate everywhere, is **Jensen (Park)**:`,
        },
        { kind: "equation", formula: "jensen-wake" },
        {
          kind: "md",
          md: md`Read it physically:

- The numerator $1-\sqrt{1-C_T}$ is the initial deficit — it equals $2a$ from momentum theory (the far-wake slowdown).
- The wake radius grows linearly, $r = r_0 + k_w x$, so the deficit is diluted by the area ratio $(r_0/r)^2$.
- $k_w$ ≈ 0.075 onshore, 0.04–0.05 offshore or in low-turbulence conditions. Desert nights with stable stratification and low turbulence behave more like offshore — wakes persist longer — so many consultants use a lower $k_w$ or more advanced models (Eddy-Viscosity, TurbOPark, CFD/LES).
- Above rated speed, $C_T$ drops sharply (blades pitch), so wakes matter far less in strong winds.

When several wakes overlap, deficits are commonly combined by **root-sum-square**. Large farms also suffer a **deep-array / blockage** effect: the farm as a whole slows the incoming flow — modern EYAs add 1–3 % for blockage.

## Layout and spacing

Spacing is expressed in rotor diameters (D):

| Direction | Typical spacing | Rationale |
|---|---|---|
| Along prevailing wind (downwind) | 5–9 D | Wake recovery |
| Across prevailing wind (crosswind) | 3–5 D | Wakes rarely point this way |
| Single row perpendicular to a dominant direction | 2.5–4 D | Possible with a very unidirectional rose |

Kuwait's wind rose is dominated by **north-westerly** winds (the shamal), which favours rows aligned roughly SW–NE (perpendicular to the NW wind) with tighter crosswind spacing and wide downwind spacing. Layout optimisation trades wake loss against land, collector cable length, road length, crane pad positions, and exclusions (pipelines, oil-field infrastructure, military zones, the PV and CSP blocks at Shagaya, the 400 kV corridor). Typical array wake losses: 5–12 % of gross AEP.

## IEC 61400-1 turbine classes

Turbines are certified to a **class** that defines the wind conditions their design loads cover:

| Class | $V_{ref}$ (50-yr extreme 10-min mean at hub) | Annual mean $V_{ave}$ ($= 0.2 V_{ref}$) |
|---|---|---|
| I | 50 m/s | 10 m/s |
| II | 42.5 m/s | 8.5 m/s |
| III | 37.5 m/s | 7.5 m/s |
| S | Specified by designer | — |

Turbulence categories by reference turbulence intensity $I_{ref}$ at 15 m/s: **A+ 0.18, A 0.16, B 0.14, C 0.12**. A site with 7.9 m/s mean (Shagaya at 80 m) and moderate extremes fits a **Class II or III** machine with a large rotor; turbulence is usually low-to-moderate in open desert (but higher in daytime convection and dust storms). Site suitability is confirmed by a **site-specific load assessment** comparing site conditions (mean, Weibull, extreme wind, turbulence, shear, inflow angle, air density, temperature) against the design envelope.

Note: lower air density reduces loads, but higher temperature affects materials, lubricants and cooling — IEC 61400-1 includes a normal temperature range (typically −10 to +40 °C) and requires the designer to address other ranges.

## Heat: derating and cooling

Turbine electrical and mechanical components generate heat that must be rejected to ambient air. At 45–50 °C ambient (and higher inside the nacelle and tower base), the **generator windings, power converter, gearbox oil and the step-up transformer** approach their temperature limits. Standard turbines are typically rated for full output to about **35–40 °C**, after which the controller **derates** — reducing power to limit heat generation — and may shut down at ~45–50 °C. **Hot-climate packages** (larger heat exchangers, liquid cooling, higher-temperature-rated converters and transformers, nacelle air conditioning) extend full-power operation to 45 °C+.

Why it matters in Kuwait: summer afternoons (45–50 °C, with records up to 53.9 °C) coincide with strong shamal winds, high-value grid hours and peak demand. A turbine that derates at 40 °C loses output exactly when it is most needed.`,
        },
        { kind: "sources", refs: ["m04-wmo-mitribah", "m04-iec-61400-1"] },
        {
          kind: "md",
          md: md`## Sand, dust and lightning

**Leading-edge erosion (LEE).** Airborne sand impacting the blade's leading edge at 60–90 m/s pits and strips the coating and laminate. A rough leading edge triggers early boundary-layer transition and raises drag: moderate erosion costs ~1–2 % AEP, severe erosion 3–5 % or more, and eventually exposes the structural laminate. Damage scales very steeply with tip speed. Mitigation: **leading-edge protection (LEP)** — polyurethane shells/tapes or flexible coatings — and periodic rope-access or drone inspection and repair. In desert sites, plan LEP refurbishment every few years.

**Sand and dust ingress.** Fine dust penetrates seals and bearing housings (main bearing, pitch and yaw bearings), contaminates gearbox oil (abrasive wear, accelerated micropitting), clogs **nacelle and converter air filters** (raising internal temperatures → derating) and abrades slip rings and brake pads. Mitigation: positive-pressure nacelle with filtered intake, upgraded seals, oil filtration with offline filters and particle counters, more frequent filter changes after dust storms, condition monitoring (vibration, oil debris).

**Blade soiling.** Dust and insect deposits on blades (less severe than erosion) cause 1–3 % losses in some desert sites; cleaned by rain elsewhere — Kuwait has little rain.

**Lightning.** Kuwait has fewer thunderstorms than tropical sites but spring and autumn convective storms do occur, and tall turbines on flat desert are the highest objects for kilometres. Blades carry receptors and down-conductors per **IEC 61400-24**; failures cause blade splitting, burnt bearings (current passing through bearings) and control system damage. Earthing in dry sand (high soil resistivity) is difficult — enhanced earthing grids and ground-enhancing compounds are often needed.

**UV and heat on composites and cables.** High UV and temperature accelerate coating and elastomer ageing; tower-base electronics and transformers need ventilation and shading.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the desert changes the O&M model",
          md: md`In northern Europe the turbine's enemies are ice, salt and turbulence; in Kuwait they are heat, dust and sand. That shifts budget from de-icing and corrosion protection to cooling, filtration, LEP and inspection frequency. A PM copying a European O&M scope without adjusting for dust will under-budget filters, oil changes and blade repairs.`,
        },
        { kind: "diagram", diagram: "wind-turbine", caption: "Main components: blades, hub, nacelle with gearbox and generator, tower, yaw system, anemometer on the nacelle roof." },
      ],
    },
    {
      layer: "applied",
      title: "Wakes and heat in numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Wake loss behind a turbine at 5D",
          given: md`Upstream turbine: D = 110 m ($r_0$ = 55 m), $C_T$ = 0.8. Free-stream speed 8 m/s. Downstream turbine directly in line at 5D = 550 m. Wake decay $k_w$ = 0.075.`,
          steps: [
            { md: md`**Initial deficit:** $1 - \sqrt{1 - 0.8} = 1 - 0.447 = 0.553$.` },
            { md: md`**Wake expansion:** $1 + k_w x / r_0 = 1 + 0.075 \times 550/55 = 1.75$; squared = 3.0625.` },
            { md: md`**Deficit at 5D:** $0.553/3.0625 = 0.1805$ → 18 % slower.` },
            { md: md`**Downstream speed:** $8 \times (1 - 0.1805) = 6.56$ m/s.` },
            { md: md`**Power ratio** (below rated, ∝ $v^3$): $0.8195^3 = 0.55$ → the waked turbine produces **45 % less** in this direction.` },
          ],
          result: md`At 5D directly downwind the second turbine loses ~45 % of its power when the wind blows along the row. Averaged over the wind rose (most directions are not aligned) the farm-level wake loss is far smaller — typically 5–12 % — but this shows why downwind spacing in the prevailing direction must be generous.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Cost of high-temperature derating",
          given: md`A 20 × 4.5 MW farm (net CF 40 %). Illustrative OEM curve: full power to 40 °C; above 45 °C output is limited to 4.0 MW. Analysis of the hourly time series shows each turbine spends 400 h/yr above 45 °C with wind at or above rated speed.`,
          steps: [
            { md: md`Farm AEP: $20 \times 4.5 \times 8{,}760 \times 0.40 = 315{,}360$ MWh.` },
            {
              md: md`Loss per turbine: $(4.5 - 4.0) \times 400 = 200$ MWh/yr; farm: $20 \times 200 = 4{,}000$ MWh/yr.`,
              hidden: true,
              check: { prompt: "Farm derating loss", answer: 4000, unit: "MWh/yr", tolerance: { rel: 0.01 } },
            },
            {
              md: md`As a share of AEP: $4{,}000/315{,}360 = 1.27$ %.`,
              hidden: true,
              check: { prompt: "Derating loss as % of AEP", answer: 1.27, unit: "%", tolerance: { abs: 0.03 } },
            },
            { md: md`This ignores derating between 40 and 45 °C and the higher value of energy at summer peak, so the true value loss is larger.` },
          ],
          result: md`~1.3 % of annual energy — but concentrated in peak-demand hours. Compare this with the price of the hot-climate package over 25 years before accepting a standard machine.`,
        },
        {
          kind: "question",
          question: {
            id: "m04-l03-p1",
            type: "numeric",
            prompt: md`A turbine with D = 120 m and $C_T$ = 0.75 sits upstream of another at 7D. Free-stream speed 9 m/s, $k_w$ = 0.075. Using Jensen, what wind speed does the downstream turbine see (m/s)?`,
            answer: 7.93,
            tolerance: { rel: 0.01 },
            unit: "m/s",
            explanation: md`Initial deficit $1 - \sqrt{0.25} = 0.5$. $x = 840$ m, $r_0 = 60$ m: $1 + 0.075 \times 840/60 = 2.05$; squared 4.2025. Deficit $0.5/4.2025 = 0.119$. Speed $9 \times 0.881 = 7.93$ m/s; power ratio $0.881^3 = 0.68$.`,
            concepts: ["m04.wake-model"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Specifying turbines for Kuwait",
      blocks: [
        {
          kind: "md",
          md: md`## Who decides

- **Developer / EPC / OEM** propose turbine model and layout; the **OEM** confirms site suitability via a load assessment and issues the warranty.
- **Owner's Engineer** reviews the layout, wake model, class and site-suitability report, and the hot-climate package.
- **Certification body** (DNV, TÜV SÜD, UL, Bureau Veritas) issues type certificates (IEC 61400-22 successor schemes / IECRE) and project certificates.
- **MEWRE grid department** — grid code compliance (fault ride-through, reactive power) of the selected turbine/converter.
- **Civil aviation and defence** — obstacle lighting and radar clearance for tall structures.

## Documents

Turbine type certificate and class; site-specific load assessment; hot-climate package datasheet with temperature derating curve; LEP specification; lightning protection and earthing design; layout with wake loss report; noise and shadow-flicker (less critical in remote desert); aviation clearance.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Desert-specific mistakes",
          md: md`- Standard-climate turbine selected because it was cheaper; derating every summer afternoon.
- Air filters sized for European dust loads; nacelle overheating after the first shamal.
- No LEP in the scope; blade repairs needed in year 2–3 with expensive rope-access campaigns in summer heat.
- Earthing designed with standard soil resistivity; actual dry-sand resistivity 10× higher.
- Wake model with onshore default $k_w$ despite stable, low-turbulence nights.`,
        },
        {
          kind: "checklist",
          title: "PM checklist — turbine selection and layout",
          items: [
            "IEC class and turbulence category match the site (with site-specific load assessment)",
            "Full power guaranteed to ≥45 °C ambient, derating curve to 50 °C+ and shutdown temperature stated",
            "Nacelle and converter filtration, positive pressure, and filter change interval for dust",
            "Leading-edge protection specified, with inspection and repair plan",
            "Lightning protection per IEC 61400-24 and earthing designed for measured soil resistivity",
            "Wake model and $k_w$ justified for desert stability; blockage loss included",
            "Layout aligned with prevailing NW wind; exclusions (pipelines, grid corridor, PV/CSP blocks) respected",
            "Grid-code compliance of turbine converter confirmed with MEWRE",
          ],
        },
        {
          kind: "ask",
          title: "Ask the OEM",
          items: [
            "At what ambient temperature does derating start, how steep is it, and at what temperature do you shut down?",
            "What does your hot-climate package include, and what is its reference fleet in the Gulf or similar deserts?",
            "What is the filter change interval in a dusty site, and who bears the cost after dust storms?",
            "What LEP system is applied and what erosion warranty do you give?",
            "Which wake model and decay constant did you use, and how did you validate it for stable desert conditions?",
          ],
        },
        { kind: "scenario", scenario: "m04-s2" },
        {
          kind: "feynman",
          prompt: "Explain to a senior engineer from the conventional power side why the downstream turbine in a row can lose almost half its output in some wind directions, yet the whole farm loses only around 10 %.",
          keyPoints: [
            "A turbine leaves a slower wake behind it that expands and recovers downstream",
            "Power scales with v³, so an 18 % speed deficit cuts power by about 45 %",
            "The loss is large only when wind blows along the row; other directions see little wake",
            "Averaged over the wind rose and with good spacing, farm wake losses are typically 5–12 %",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m04-l03-q1",
      type: "mcq",
      prompt: "In the Jensen model, the initial velocity deficit just behind the rotor depends on:",
      options: ["The thrust coefficient C_T", "The air density only", "The tip speed ratio only", "The hub height"],
      answer: 0,
      explanation: md`Initial deficit $= 1 - \sqrt{1 - C_T}$ ($= 2a$). Higher thrust → deeper wake. Above rated, pitching reduces $C_T$ and wakes weaken.`,
      concepts: ["m04.wake-model"],
      difficulty: 2,
    },
    {
      id: "m04-l03-q2",
      type: "mcq",
      prompt: "An IEC Class II turbine is designed for a reference extreme wind speed (Vref) and annual mean wind speed of:",
      options: ["50 m/s and 10 m/s", "42.5 m/s and 8.5 m/s", "37.5 m/s and 7.5 m/s", "30 m/s and 6 m/s"],
      answer: 1,
      explanation: md`Class I 50/10, II 42.5/8.5, III 37.5/7.5 m/s; $V_{ave} = 0.2\,V_{ref}$.`,
      concepts: ["m04.iec-classes"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m04-l03-q3",
      type: "multi",
      prompt: "Which are effective mitigations against sand and dust in Kuwait? (select all)",
      options: ["Leading-edge protection on blades", "Filtered positive-pressure nacelle", "Oil filtration and particle monitoring", "Anti-icing heating", "Reducing tip speed limits"],
      answer: [0, 1, 2, 4],
      explanation: md`LEP, filtration, oil management and lower tip speed (erosion scales steeply with impact speed) all help. Anti-icing is irrelevant in Kuwait.`,
      concepts: ["m04.desert-failure-modes"],
      difficulty: 2,
    },
    {
      id: "m04-l03-q4",
      type: "numeric",
      prompt: md`A waked turbine sees 12 % lower wind speed than free stream (below rated). What fraction of its unwaked power does it produce?`,
      answer: 0.681,
      tolerance: { abs: 0.005 },
      explanation: md`$(1 - 0.12)^3 = 0.88^3 = 0.681$ → a 32 % power loss from a 12 % speed deficit.`,
      concepts: ["m04.wake-model"],
      difficulty: 1,
    },
    {
      id: "m04-l03-q5",
      type: "label",
      prompt: "Label the wind turbine components.",
      diagram: "wind-turbine",
      markers: [
        { id: "blade", answer: "Blade" },
        { id: "hub", answer: "Hub (with pitch system)" },
        { id: "gearbox", answer: "Gearbox" },
        { id: "generator", answer: "Generator" },
        { id: "yaw-system", answer: "Yaw system" },
        { id: "anemometer", answer: "Nacelle anemometer" },
      ],
      options: ["Blade", "Hub (with pitch system)", "Gearbox", "Generator", "Yaw system", "Nacelle anemometer", "Heliostat", "Inverter string combiner"],
      explanation: md`Blades attach to the hub (which houses pitch drives); the low-speed shaft drives the gearbox and generator in the nacelle; the yaw system turns the nacelle into the wind using the nacelle anemometer/vane signal.`,
      concepts: ["m04.desert-failure-modes"],
      difficulty: 1,
    },
    {
      id: "m04-l03-q6",
      type: "decision",
      prompt: "Two bids offer the same turbine platform: Bid A standard climate (derates from 35 °C), Bid B hot-climate package (full power to 45 °C) at 3 % higher turbine price. Bid A's tariff is 1 % lower. As the technical evaluator, what do you do?",
      options: [
        { text: "Prefer A — lower tariff", score: 0.2, feedback: "Check whether A's yield includes realistic derating; if not, the tariff is based on energy it can't deliver in summer peaks." },
        { text: "Require both to show hourly yield with their derating curves against site temperature; evaluate peak-hour delivery and lifecycle risk", score: 1, feedback: "Correct — normalise the comparison and value peak-hour output." },
        { text: "Prefer B regardless", score: 0.5, feedback: "Likely right technically, but the evaluation must be evidence-based and defensible." },
      ],
      explanation: md`In Kuwait, high-temperature derating removes energy in the most valuable hours. Bids must be evaluated on comparable, site-specific assumptions.`,
      concepts: ["m04.high-temp-derating"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m04-l03-f1", front: "Jensen wake deficit", back: md`$\Delta v/v_0 = (1-\sqrt{1-C_T})/(1+k_w x/r_0)^2$`, concepts: ["m04.wake-model"] },
    { id: "m04-l03-f2", front: "Wake decay constant onshore vs offshore", back: "≈0.075 vs ≈0.04–0.05 (low-turbulence desert nights behave more like offshore).", concepts: ["m04.wake-model"] },
    { id: "m04-l03-f3", front: "Typical spacing", back: "5–9 D downwind, 3–5 D crosswind.", concepts: ["m04.layout-spacing"] },
    { id: "m04-l03-f4", front: "IEC classes Vref / Vave", back: "I: 50/10 · II: 42.5/8.5 · III: 37.5/7.5 m/s.", concepts: ["m04.iec-classes"] },
    { id: "m04-l03-f5", front: "IEC turbulence categories (Iref)", back: "A+ 0.18, A 0.16, B 0.14, C 0.12.", concepts: ["m04.iec-classes"] },
    { id: "m04-l03-f6", front: "Typical standard-turbine full-power temperature limit", back: "≈35–40 °C; hot-climate packages extend to ≈45 °C+.", concepts: ["m04.high-temp-derating"] },
    { id: "m04-l03-f7", front: "Leading-edge erosion AEP impact", back: "≈1–2 % moderate, 3–5 %+ severe.", concepts: ["m04.desert-failure-modes"] },
    { id: "m04-l03-f8", front: "Lightning protection standard for turbines", back: "IEC 61400-24.", concepts: ["m04.desert-failure-modes"] },
    { id: "m04-l03-f9", front: "Kuwait prevailing wind direction", back: "North-westerly (shamal).", concepts: ["m04.layout-spacing"] },
  ],
  scenarios: [
    {
      id: "m04-s2",
      title: "Summer derating at the wind farm",
      dayInLife: true,
      context: md`It is early July. You are MEWRE's PM for an operating wind farm under a 5-year OEM full-service agreement. Ambient has been 48–50 °C all week with strong shamal winds. The control room reports that half the turbines have been running at reduced power every afternoon, and two tripped on converter over-temperature. MEWRE's national control centre is short of capacity at the evening peak.`,
      start: "a",
      nodes: {
        a: {
          md: md`The OEM site manager says derating is "normal behaviour per the turbine specification".`,
          choices: [
            { text: "Accept the explanation", next: "b", score: 2, feedback: "Maybe true, but you haven't checked the specification, the filters or the availability treatment." },
            { text: "Ask for the SCADA temperature and power data, the contractual derating curve, and the filter inspection records for the affected turbines", next: "c", score: 9, feedback: "Facts first: is the derating within spec, or caused by clogged filters/failing cooling (a maintenance issue)?" },
            { text: "Instruct the OEM to override derating to support the grid", next: "b", score: 0, feedback: "Unsafe and voids warranties; never override protection limits." },
          ],
        },
        b: {
          md: md`A week later a converter fails, taking a turbine out for three weeks waiting for parts from Europe.`,
          choices: [
            { text: "Start a root-cause analysis and review the spares holding in the service agreement", score: 6, feedback: "Recovery mode. Earlier data review might have revealed the cooling issue." },
            { text: "Claim availability LDs immediately", score: 4, feedback: "Possibly valid, but without root cause the OEM may argue an excluded event (extreme temperature)." },
          ],
        },
        c: {
          md: md`The data show the two tripped turbines derated from 38 °C instead of 42 °C as in the spec; their converter filters were 80 % blocked after a dust storm two weeks earlier.`,
          choices: [
            { text: "Notify the OEM formally that derating below spec is a performance/maintenance failure, require filter replacement fleet-wide within 48 h, and agree a post-dust-storm filter inspection trigger", score: 10, feedback: "Excellent: fixes the cause, uses the contract and builds a preventive rule." },
            { text: "Ask the OEM to clean the two filters", score: 5, feedback: "Fixes symptoms on two turbines; others will follow." },
          ],
        },
      },
      concepts: ["m04.high-temp-derating", "m04.desert-failure-modes"],
    },
  ],
};

export default lesson;
