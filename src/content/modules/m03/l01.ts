import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m03-l01",
  title: "CSP Physics and Technologies",
  summary:
    "How concentrating mirrors turn direct sunlight into high-temperature heat: concentration ratio, the optical efficiency chain, T⁴ receiver losses, why only DNI counts, and how trough, tower, Fresnel and dish compare.",
  minutes: 75,
  objectives: [
    "You can compute a collector's optical and thermal efficiency from its loss chain and explain which factor a PM can influence in operation",
    "You can explain, with the Stefan–Boltzmann law, why higher temperature requires higher concentration",
    "You can explain why CSP uses only DNI and what that means for a dusty Kuwaiti sky",
    "You can compare parabolic trough, central tower, linear Fresnel and dish on temperature, efficiency, storage fit and maturity",
    "You can define the solar multiple and size a solar field aperture from it",
  ],
  concepts: [
    {
      id: "m03.concentration-ratio",
      name: "Concentration ratio",
      description: "Aperture area divided by receiver area; sets achievable temperature and receiver loss per watt collected.",
      competency: "solar",
      related: ["m03.receiver-thermal-loss", "m03.csp-technologies"],
    },
    {
      id: "m03.optical-efficiency",
      name: "Optical efficiency chain",
      description: "Product of cosine/IAM, reflectivity, intercept, transmittance, absorptance and cleanliness factors.",
      competency: "solar",
      related: ["m03.dni-only", "m02.soiling"],
    },
    {
      id: "m03.receiver-thermal-loss",
      name: "Receiver thermal loss",
      description: "Radiative (∝T⁴) and convective losses from the hot absorber, which fix the minimum useful DNI.",
      competency: "solar",
    },
    {
      id: "m03.dni-only",
      name: "CSP uses DNI only",
      description: "Mirrors can only redirect the direct beam; diffuse light cannot be focused, so aerosols and dust directly cut output.",
      competency: "solar",
      related: ["m02.irradiance-components", "m02.kuwait-solar-resource"],
    },
    {
      id: "m03.csp-technologies",
      name: "CSP technology families",
      description: "Parabolic trough, central receiver tower, linear Fresnel and parabolic dish — line vs point focus, tracking, temperature and maturity.",
      competency: "solar",
      related: ["m00.shagaya-phase1"],
    },
    {
      id: "m03.solar-multiple",
      name: "Solar multiple",
      description: "Ratio of solar field thermal output at design point to power block thermal demand; the lever that pairs field size with storage.",
      competency: "solar",
      related: ["m03.csp-technologies"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "From sunlight to 400 °C heat",
      blocks: [
        {
          kind: "md",
          md: md`## The idea in one paragraph

A PV module converts photons directly to electrons. A **concentrating solar power (CSP)** plant does something older and more mechanical: it uses mirrors to focus sunlight onto a small **receiver**, heats a **heat-transfer fluid (HTF)** to 390–565 °C, optionally stores that heat in molten salt, and then raises steam for a conventional **Rankine-cycle steam turbine**. CSP is therefore a thermal power plant whose "boiler" is a field of mirrors. Every engineering trade-off in CSP follows from that: you are fighting heat losses, fluid freezing, thermal stress and cycle efficiency, just like in a fossil plant — plus optics and dust.

Why would anyone do this when PV is simpler? Because **heat is cheap to store** (a tank of salt) while electricity is expensive to store (batteries — though much less so than in 2015). That single fact is the whole commercial case for CSP and is what lesson 4 tests against PV+BESS.

## Concentration

A mirror field with aperture area $A_{ap}$ focuses onto a receiver of area $A_{rec}$. The **geometric concentration ratio** is:`,
        },
        { kind: "equation", formula: "csp-concentration-ratio" },
        {
          kind: "md",
          md: md`For a standard parabolic trough (Eurotrough/LS-3 class, aperture width 5.77 m, absorber tube outer diameter 70 mm), per metre of length:

$$C_g = \frac{5.77}{\pi \times 0.070} \approx 26$$

Typical ranges:

| Technology | Focus | Tracking | $C_g$ | HTF / outlet temperature |
|---|---|---|---|---|
| Parabolic trough | Line | 1-axis (N–S axis, E–W tracking) | 25–30 (to ~80 for large-aperture) | Thermal oil 393 °C; molten salt 550 °C (few plants) |
| Linear Fresnel | Line | 1-axis, flat mirror rows | 25–60 | Direct steam 270–500 °C; salt (pilot) |
| Central tower | Point | 2-axis heliostats | 500–1,000+ | Molten salt 565 °C; direct steam 540 °C |
| Parabolic dish | Point | 2-axis | 1,000–3,000 | Stirling engine at the focus, ~700 °C+ gas |

There is a thermodynamic ceiling: the sun subtends a half-angle of about 4.65 mrad, so the maximum possible concentration is about 46,000× for point focus and about 215× for line focus. Real systems sit far below because of mirror slope errors, tracking errors and the finite size of the sun's image.

## The optical efficiency chain

Of the direct beam arriving on the aperture, only part becomes heat in the absorber. The losses multiply:`,
        },
        { kind: "equation", formula: "csp-optical-efficiency" },
        {
          kind: "md",
          md: md`Walk through it as a ray would:

1. **Cosine loss** $\cos\theta$. A single-axis trough cannot point straight at the sun except at one instant; the beam arrives at an incidence angle $\theta$ and the aperture "sees" only $\cos\theta$ of it. For a N–S axis trough, winter noon $\theta$ in Kuwait (29.3 °N) can exceed 50°, which is why trough output in December is less than half of June.
2. **IAM** $K(\theta)$. Reflectance, transmittance and absorptance all degrade at oblique angles, and rays at the end of each row miss the receiver ("end losses"). Row-to-row shading at low sun also lives here.
3. **Mirror reflectivity** $\rho_m$. Silvered low-iron glass: ~0.93–0.95 solar-weighted when clean.
4. **Intercept factor** $\gamma$. Fraction of reflected rays that actually hit the absorber — affected by mirror slope error, receiver alignment, structural deflection under wind, and tracking error. 0.92–0.97.
5. **Envelope transmittance** $\tau$. Trough receivers sit inside an evacuated borosilicate glass tube with anti-reflective coating: ~0.96.
6. **Absorptance** $\alpha$ of the selective coating: ~0.95–0.96.
7. **Cleanliness** $\xi$. Dust on mirrors and envelopes. Mirrors are worse than PV for soiling: a dusty mirror both blocks and *scatters* light, and scattered light misses the receiver entirely. In a Kuwaiti dust event, mirror cleanliness can drop by several percentage points in a day.

Peak optical efficiency (normal incidence, clean) of a modern trough is ~0.75–0.80. Towers have a different chain: **field cosine efficiency** (heliostats on the far side of the tower are tilted away from the sun), **blocking and shading** between heliostats, **atmospheric attenuation** over a slant range of up to 1–1.5 km (strongly worse in dusty, humid air), and **spillage** (light missing the receiver aperture). Annual tower field efficiency is typically 55–65 %.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the chain is multiplicative — and why that matters to a PM",
          md: md`Each factor acts on what is left after the previous one, so improvements multiply too. The design factors (reflectivity, intercept, coating) are fixed by the EPC's procurement. The **operational** factors — cleanliness, alignment, broken mirrors, receiver vacuum loss — decay over time and are where an O&M contractor either earns or loses its fee. A 3 % drop in mirror cleanliness is a ~3 % drop in thermal energy *and* a larger drop in electricity, because the fixed thermal losses don't shrink.`,
        },
        {
          kind: "md",
          md: md`## Receiver losses and the T⁴ law

A hot absorber loses heat to its surroundings, mostly by radiation at CSP temperatures:`,
        },
        { kind: "equation", formula: "csp-receiver-radiation-loss" },
        {
          kind: "md",
          md: md`Temperatures must be in **kelvin**. Two consequences drive all CSP design:

- **Radiation scales as $T^4$.** Raising absorber temperature from 390 °C (663 K) to 550 °C (823 K) multiplies $T^4$ by $(823/663)^4 \approx 2.37$. To keep losses tolerable you must shrink the hot area per watt — i.e. increase concentration. That is why 565 °C salt runs in towers ($C \sim 1,000$), and why troughs with oil stop at 393 °C (where the synthetic oil also starts to decompose).
- **Losses are roughly fixed for a given temperature; gains scale with DNI.** So collector efficiency falls as DNI drops:`,
        },
        { kind: "equation", formula: "csp-collector-efficiency" },
        {
          kind: "md",
          md: md`Trough receivers fight radiation with **selective coatings** (high $\alpha$ in the visible, low $\varepsilon$ in the infrared — $\varepsilon \approx 0.08$–0.12 at 400 °C) and fight convection with a **vacuum** in the glass annulus. When the vacuum is lost (hydrogen permeation from degraded oil, broken glass-to-metal seals) heat loss can rise 3–4×: a "hot tube" visible on infrared drone surveys. Hydrogen getters and vacuum monitoring are standard O&M items.

## Why CSP uses only DNI

Global horizontal irradiance (GHI) = direct beam on the horizontal + diffuse sky radiation. A mirror can only redirect rays that arrive from a known direction (the sun's disc); diffuse light comes from the whole sky and cannot be focused onto a receiver. So CSP harvests only **direct normal irradiance (DNI)** — the beam measured on a surface tracking the sun.

That makes CSP far more sensitive to **aerosols** than PV:

| Sky condition | GHI effect | DNI effect |
|---|---|---|
| Clear, clean | reference | reference (~900–1,000 W/m² at noon) |
| Hazy / moderate dust (AOD ~0.5) | −5 to −10 % (diffuse partly compensates) | −25 to −40 % |
| Dust storm (AOD > 1.5) | −30 to −50 % | can approach zero |

Kuwait combines high GHI with high, variable aerosol loading. The KISR resource study found that satellite products agree reasonably on GHI after site adaptation but **diverge significantly on DNI** because aerosol data are uncertain. For CSP this is the single most important resource risk: a 10 % error in annual DNI is roughly a 12–15 % error in electricity, because of the fixed thermal losses.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "DNI in Kuwait is uncertain — use ground data",
          md: md`KISR runs resource stations at five inland sites measuring GHI, DNI and DHI, and found that satellite DNI estimates diverge significantly from ground measurements because of aerosol uncertainty. Any CSP yield estimate for Shagaya must be built on site-adapted, ground-measured DNI (ideally ≥1 year of high-quality pyrheliometer data correlated with long-term satellite data).`,
        },
        { kind: "sources", refs: ["m03-kisr-solar-resource"] },
        {
          kind: "md",
          md: md`## The four technology families

**Parabolic trough** — the workhorse (~75 % of installed CSP worldwide). Curved mirrors focus onto an evacuated receiver tube at the focal line; loops of 4–6 collector assemblies (each ~150 m) in series heat synthetic oil (biphenyl/diphenyl oxide eutectic) from ~293 °C to ~393 °C. Rows run N–S and track E–W. Strengths: decades of bankable operating history (SEGS in California since the 1980s, Andasol, Noor I–II, Shagaya). Weaknesses: oil temperature cap limits cycle efficiency (~37–38 % gross), oil-to-salt heat exchangers needed for storage, large piping network with thousands of ball joints/rotation joints that leak and need maintenance, oil fire risk.

**Central receiver (tower)** — thousands of flat, 2-axis heliostats (each ~10–150 m²) focus on a receiver at the top of a 150–260 m tower. Molten salt is pumped up, heated from ~290 °C to ~565 °C and stored directly — no heat exchanger, same fluid in receiver and tanks. Strengths: higher temperature → ~41–44 % cycle efficiency and ~3× less salt per MWh of storage. Weaknesses: fewer reference plants, single-point receiver risk (thermal fatigue of tubes, salt freezing in the receiver during cloud transients), large field atmospheric attenuation in dust, aviation lighting/glare issues. Crescent Dunes (USA) suffered a hot-tank leak and long outages; Noor III (Morocco) had a reported prolonged outage linked to a tank problem — tower storage is not risk-free.

**Linear Fresnel** — long rows of near-flat mirrors close to the ground focus onto a fixed elevated receiver. Cheaper structure, lower wind load, better land use, simple direct steam generation — but lower optical efficiency (worse cosine and blocking), so lower annual yield per m² of mirror. Niche: industrial process heat, small plants.

**Parabolic dish (Stirling)** — highest efficiency on paper (~30 % solar-to-electric peak) but no practical storage, many moving parts per kW, and commercial failure in the 2010s. Of historical interest only for a utility PM.

## The solar multiple

The power block (turbine, generator) has a rated thermal input. The solar field can be sized to deliver exactly that at the design point (usually solar noon on the equinox or summer solstice, design DNI ~850–950 W/m²) — or more:`,
        },
        { kind: "equation", formula: "csp-solar-multiple" },
        {
          kind: "md",
          md: md`- **SM ≈ 1.0–1.4** without storage. At SM = 1 the turbine is only at full load for an hour or two around noon on good days; the rest of the time it runs at part load. Slightly oversizing (1.2–1.4) improves capacity factor at the cost of dumping (defocusing) some heat at midday in summer.
- **SM ≈ 2–3** with 6–15 h of storage. The extra field fills the tanks during the day; the turbine runs at full load into the evening and night.
- Field size, storage size and turbine size are therefore **co-optimised**. Too much field with too little storage = defocusing (wasted capex). Too much storage with too little field = tanks never fill (wasted capex). Tools like NREL's SAM sweep SM and storage hours to minimise LCOE or maximise revenue under a time-of-delivery tariff.

The solar field is typically 35–50 % of a trough plant's capex, storage 10–20 %, power block 15–20 %. That is why the SM decision is the most important design decision in a CSP plant and why the Owner's Engineer should review it carefully.`,
        },
        { kind: "diagram", diagram: "parabolic-trough", caption: "Parabolic trough plant with indirect two-tank molten-salt storage: mirrors focus on receiver tubes, oil HTF loop, oil-to-salt heat exchanger, hot/cold tanks, steam generator, turbine and condenser." },
        { kind: "widget", widget: "kuwait-climate", props: { metric: "dni" }, caption: "Indicative monthly DNI for Shagaya. Note how DNI and GHI diverge in the dusty spring/early-summer months." },
      ],
    },
    {
      layer: "applied",
      title: "Collector efficiency and field sizing with Kuwaiti numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Thermal output of one metre of trough at design point",
          given: md`A trough with aperture width $W = 5.77$ m and absorber outer diameter $D = 70$ mm. Design point: DNI = 850 W/m², incidence angle $\theta = 20°$. Factors: IAM 0.97, clean reflectivity 0.935, intercept 0.95, cleanliness 0.95, envelope transmittance 0.96, absorptance 0.955. Absorber at 390 °C with emissivity 0.10; effective surroundings (glass envelope) at 100 °C. Ignore convection (vacuum intact).`,
          steps: [
            { md: md`**Cosine:** $\cos 20° = 0.9397$.` },
            { md: md`**Optical efficiency:** $\eta_{opt} = 0.9397 \times 0.97 \times 0.935 \times 0.95 \times 0.95 \times 0.96 \times 0.955 = 0.705$.` },
            { md: md`**Absorbed power per metre:** $\text{DNI}\cdot W \cdot \eta_{opt} = 850 \times 5.77 \times 0.705 = 3{,}459$ W/m.` },
            { md: md`**Radiative loss per metre:** $A_{rec} = \pi D \times 1\,\text{m} = 0.2199$ m². $T_{rec} = 663.15$ K, $T_{env} = 373.15$ K. $\dot Q_{rad} = 0.10 \times 5.67\times10^{-8} \times 0.2199 \times (663.15^4 - 373.15^4) = 217$ W/m.` },
            { md: md`**Net heat to HTF:** $3{,}459 - 217 = 3{,}242$ W/m, i.e. $3{,}242/5.77 = 562$ W per m² of aperture.` },
            { md: md`**Collector efficiency:** $\eta_{col} = 3{,}242 / (850 \times 5.77) = 0.661$.` },
          ],
          result: md`About **562 W/m² of aperture** reaches the oil at design point — a collector efficiency of **66 %**. Note the optical chain (29.5 % lost) dominates at high DNI; at DNI = 300 W/m² the same 217 W/m of loss would be ~18 % of absorbed power instead of ~6 %.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Why a 550 °C receiver needs more concentration",
          given: md`Same tube geometry and emissivity as above, but absorber at 550 °C (as if you ran molten salt in a trough). Surroundings still 100 °C.`,
          steps: [
            { md: md`Convert: $T_{rec} = 823.15$ K, $T_{env} = 373.15$ K.` },
            {
              md: md`$\dot Q_{rad} = 0.10 \times 5.67\times10^{-8} \times 0.2199 \times (823.15^4 - 373.15^4) \approx 548$ W/m.`,
              hidden: true,
              check: { prompt: "Radiative loss at 550 °C per metre of tube", answer: 548, unit: "W/m", tolerance: { rel: 0.02 } },
            },
            {
              md: md`Ratio to the 390 °C case: $548/217 \approx 2.53$.`,
              hidden: true,
              check: { prompt: "Loss ratio, 550 °C vs 390 °C", answer: 2.53, tolerance: { rel: 0.02 } },
            },
            { md: md`Absorbed power is unchanged (3,459 W/m), so net heat falls to ~2,911 W/m and collector efficiency to ~59 % — before accounting for the higher emissivity real coatings show at 550 °C.` },
          ],
          result: md`Raising temperature 160 K multiplies radiative loss ~2.5×. To keep losses small at 550–565 °C you need much higher concentration (a tower's small cavity or external receiver) — exactly why molten-salt towers, not troughs, dominate high-temperature CSP.`,
        },
        {
          kind: "question",
          question: {
            id: "m03-l01-p1",
            type: "numeric",
            prompt: md`A 50 MW_e (gross) trough plant has a power block efficiency of 37.5 %. At design point the field delivers 560 W per m² of aperture to the HTF. The designer chooses a solar multiple of 2.5 to charge 10 h of storage. What aperture area is needed, in m²?`,
            answer: 595238,
            tolerance: { rel: 0.02 },
            unit: "m²",
            explanation: md`Power block thermal input: $\dot Q_{PB} = 50/0.375 = 133.3$ MW_th. Field at design: $SM \times \dot Q_{PB} = 2.5 \times 133.3 = 333.3$ MW_th. Aperture: $333.3\times10^6 / 560 \approx 595{,}000$ m² — roughly 60 ha of glass, and with row spacing (~3× aperture width) close to 2 km² of land for the field alone.`,
            concepts: ["m03.solar-multiple"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Reading a CSP design as an owner",
      blocks: [
        {
          kind: "md",
          md: md`## Who does what

- **Employer / MEWRE (or KISR for the pilot)** — sets functional requirements: net capacity, storage hours, dispatch window, cooling type, water budget, performance guarantees.
- **Owner's Engineer (OE)** — independently checks the DNI dataset, the SAM/Greenius/Thermoflex yield model, solar multiple and storage optimisation, receiver and HTF selection, and the performance test procedure.
- **EPC contractor** — usually a consortium of a CSP technology provider (collector or heliostat + receiver), a power block EPC and a civil contractor. Key OEMs: receiver tubes (Schott, Rioglass), turbines (Siemens Energy SST-700/800 class), salt (SQM, Haifa), HTF oil (Dow, Eastman).
- **Lenders' technical advisor** — for an IPP, reviews the same items with a bias to downside (P90) cases.

## Design documents to ask for

- DNI resource report: ground station, period, data quality (pyrheliometer calibration, cleaning log), long-term correction method, P50/P90.
- Annual yield model with hourly loss waterfall: optical, thermal, piping, storage, parasitics, availability.
- Solar field layout: loop count, row spacing, orientation, wind-stow strategy, access roads for cleaning trucks.
- Receiver and mirror datasheets with degradation and breakage assumptions.
- SM/storage optimisation study with the objective function stated (min LCOE? max peak-hour energy?).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Common failure modes in CSP design reviews",
          md: md`- **Satellite DNI accepted as design basis** in a high-aerosol site — overestimates yield by 10–20 %.
- **Clean-mirror reflectivity** used in the yield model instead of an operating cleanliness average (realistic: 0.93–0.97 depending on cleaning frequency and dust events).
- **Design point chosen in summer** makes SM look bigger than it is in winter, when cosine losses dominate.
- **Parasitic loads understated**: HTF pumps, salt pumps, heat tracing, dry-cooler fans, mirror-washing trucks — commonly 10–15 % of gross output for trough plants.
- **No thermal-loss allowance for degraded vacuum** in receiver tubes over life.`,
        },
        {
          kind: "checklist",
          title: "PM checklist — CSP technology review",
          items: [
            "DNI basis is ground-measured (≥12 months) and long-term corrected; satellite-only DNI rejected for Kuwait",
            "Optical chain itemised with operating (not clean) cleanliness factor and justification",
            "Receiver heat-loss curve versus temperature provided, with degraded-vacuum sensitivity",
            "Solar multiple and storage hours justified by an optimisation run with stated objective",
            "Design point season and DNI stated; winter performance shown separately",
            "Parasitic load list per hour type (day, storage discharge, night standby) included",
            "Technology reference plants of similar size and HTF with ≥3 years' operating data identified",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "What annual average cleanliness factor did you assume, and what cleaning frequency and water volume does it require?",
            "What is the receiver tube heat loss at 390 °C new and after 10 years, and how do you detect vacuum loss in operation?",
            "Show the yield sensitivity to −10 % annual DNI. Why is it non-linear?",
            "Why did you choose this solar multiple, and how many hours per year does the field defocus at that SM?",
            "Which reference plant uses exactly this collector, receiver and HTF combination, and what is its measured availability?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a non-engineer finance colleague why a CSP plant's output falls by much more than a PV plant's output on a hazy, dusty day in Kuwait.",
          keyPoints: [
            "CSP mirrors can only focus the direct beam (DNI); PV also uses diffuse light",
            "Dust and haze scatter the direct beam into diffuse light, so DNI drops much more than GHI",
            "Receiver thermal losses are roughly fixed, so as DNI falls the net useful heat falls even faster",
            "Below a threshold DNI the plant collects nothing net and may need to defocus or stop",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m03-l01-q1",
      type: "mcq",
      prompt: "Why can't a CSP plant use diffuse irradiance?",
      options: [
        "Diffuse light has the wrong wavelength for the absorber coating",
        "Diffuse light arrives from the whole sky and cannot be focused by mirrors onto a small receiver",
        "Diffuse light is fully absorbed by the glass envelope",
        "Trackers are programmed to ignore it",
      ],
      answer: 1,
      explanation: md`Imaging optics redirect rays from a known direction (the sun's disc). Diffuse radiation comes from all directions, so the mirror cannot place it on the receiver. That is why CSP depends on DNI, while PV uses GHI/POA including diffuse.`,
      concepts: ["m03.dni-only"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m03-l01-q2",
      type: "numeric",
      prompt: md`By what factor does radiative loss scale ($T^4$ only, ignore the environment term) when an absorber goes from 400 °C to 565 °C?`,
      answer: 2.40,
      tolerance: { rel: 0.02 },
      explanation: md`Convert to kelvin first: 673.15 K and 838.15 K. $838.15/673.15 = 1.2451$; $1.2451^2 = 1.5503$; $1.5503^2 \approx 2.40$. If you used Celsius you would get $(565/400)^4 \approx 3.98$ — badly wrong. The Stefan–Boltzmann law only works in absolute temperature.`,
      concepts: ["m03.receiver-thermal-loss"],
      difficulty: 2,
    },
    {
      id: "m03-l01-q3",
      type: "multi",
      prompt: "Which factors in the optical efficiency chain degrade during operation and are therefore O&M levers? (select all)",
      options: ["Mirror cleanliness", "Intercept factor (alignment, deflection)", "Design incidence angle", "Envelope transmittance (dust, breakage)", "Latitude of the site"],
      answer: [0, 1, 3],
      explanation: md`Cleanliness, intercept (mirror/receiver misalignment, broken facets, tracking errors) and envelope condition all decay and can be restored by O&M. Incidence angle and latitude are fixed by geometry.`,
      concepts: ["m03.optical-efficiency"],
      difficulty: 2,
    },
    {
      id: "m03-l01-q4",
      type: "mcq",
      prompt: "A trough plant with 10 h of storage would typically have a solar multiple of about:",
      options: ["0.8", "1.0", "1.3", "2.5–3"],
      answer: 3,
      explanation: md`To run the turbine at full load during the day *and* fill 10 h of storage, the field must deliver 2–3× the block's design thermal input around noon. No-storage plants use ~1.2–1.4.`,
      concepts: ["m03.solar-multiple"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m03-l01-q5",
      type: "order",
      prompt: "Order the technologies by typical maximum HTF/working temperature, lowest first.",
      items: ["Linear Fresnel (saturated direct steam)", "Parabolic trough with thermal oil", "Molten-salt central tower", "Parabolic dish Stirling"],
      explanation: md`Saturated-steam Fresnel ~270–300 °C; trough oil ~393 °C; salt tower ~565 °C; dish Stirling ~700 °C+ gas. Temperature follows concentration ratio.`,
      concepts: ["m03.csp-technologies", "m03.concentration-ratio"],
      difficulty: 2,
    },
    {
      id: "m03-l01-q6",
      type: "decision",
      prompt: "You are the MEWRE PM. The EPC's CSP yield model uses a satellite DNI dataset only, giving 2,450 kWh/m²/yr for Shagaya. What do you do?",
      options: [
        { text: "Accept it — satellite data are industry standard", score: 0, feedback: "In Kuwait KISR found satellite DNI diverges significantly from ground data because of aerosol uncertainty. Accepting this transfers yield risk to the Employer." },
        { text: "Require site-adaptation of the satellite series with ≥12 months of KISR/on-site pyrheliometer data and a P90 case", score: 1, feedback: "Correct: ground-truthed, long-term corrected DNI with uncertainty is the bankable standard, and Kuwait's aerosols make it essential." },
        { text: "Apply a flat 10 % haircut and move on", score: 0.4, feedback: "Better than nothing, but arbitrary. You need measured data to know whether 10 % is too much or too little." },
      ],
      explanation: md`DNI is the fuel of a CSP plant. Its uncertainty in a dusty site is large and propagates non-linearly to energy. Insist on ground measurement and site adaptation.`,
      concepts: ["m03.dni-only"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m03-l01-f1", front: "Geometric concentration ratio", back: md`$C_g = A_{ap}/A_{rec}$. Trough ~26, tower ~500–1,000+.`, concepts: ["m03.concentration-ratio"] },
    { id: "m03-l01-f2", front: "Which irradiance component does CSP use?", back: "DNI only — direct normal irradiance. Diffuse cannot be focused.", concepts: ["m03.dni-only"] },
    { id: "m03-l01-f3", front: "Radiative receiver loss scales with…", back: md`$T^4$ (absolute). 390→550 °C ≈ 2.4× more loss.`, concepts: ["m03.receiver-thermal-loss"] },
    { id: "m03-l01-f4", front: "Typical peak optical efficiency of a modern trough", back: "≈0.75–0.80 (clean, normal incidence).", concepts: ["m03.optical-efficiency"] },
    { id: "m03-l01-f5", front: "Max HTF temperature of trough thermal oil", back: "≈393 °C (oil decomposes above ~400 °C).", concepts: ["m03.csp-technologies"] },
    { id: "m03-l01-f6", front: "Solar multiple (definition)", back: "Field thermal output at design point ÷ power-block thermal input at rated load.", concepts: ["m03.solar-multiple"] },
    { id: "m03-l01-f7", front: "Typical SM for 10 h storage", back: "≈2.5–3.", concepts: ["m03.solar-multiple"] },
    { id: "m03-l01-f8", front: "Tower molten-salt temperatures", back: "Cold ≈290 °C, hot ≈565 °C.", concepts: ["m03.csp-technologies"] },
    { id: "m03-l01-f9", front: "Why does a dusty mirror lose more than a dusty PV module?", back: "Dust scatters reflected light, which then misses the receiver — the loss is both absorption and scattering.", concepts: ["m03.optical-efficiency"] },
  ],
};

export default lesson;
