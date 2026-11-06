import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz01-l04",
  title: "Optical loss mechanisms: transmittance, spectrum, non-uniform soiling, bifacial rear side and mass density",
  summary:
    "How deposited dust turns into lost kilowatt-hours: shadowing and scattering at the glass, spectral selectivity, angle-of-incidence effects, the outsized electrical loss from non-uniform soiling and bypass diodes, rear-side soiling on bifacial modules, and how the soiling ratio relates to mass density with an empirical relation and its caveats.",
  minutes: 80,
  objectives: [
    "Relate deposited mass density to area coverage and transmittance loss, and explain why fine particles block more light per gram",
    "Apply an empirical mass-to-transmission relation (Boyle et al. 2015) and state its limits",
    "Explain spectral and angle-of-incidence effects of soiling and their consequences for sensors and module technologies",
    "Compute the electrical loss of a non-uniform edge band with bypass diodes for portrait and landscape mounting",
    "Compute the effective soiling ratio of a bifacial module from front and rear soiling ratios",
  ],
  concepts: [
    {
      id: "mz01.transmittance-loss",
      name: "Transmittance loss from deposited dust",
      description: "Particles absorb and scatter light at the glass; a sparse layer shadows a fraction 3ω/(2ρd) of the area, partly offset by forward scattering; loss grows sub-linearly and saturates with mass.",
      competency: "mz-soiling",
      related: ["mz01.particle-size", "mz01.sr-mass"],
    },
    {
      id: "mz01.spectral-soiling",
      name: "Spectral and angular effects of soiling",
      description: "Dust removes short wavelengths more (iron-oxide absorption, scattering by fines) and losses grow at high angles of incidence, so the soiling ratio depends on technology, sensor type and time of day.",
      competency: "mz-soiling",
      related: ["mz01.transmittance-loss", "m02.cell-technologies"],
    },
    {
      id: "mz01.nonuniform-soiling",
      name: "Non-uniform soiling and mismatch",
      description: "Dust bands at the lower edge limit the current of the series cells they cover; electrical loss follows the worst cell until bypass diodes switch the substring out, so it can far exceed the area-average transmittance loss.",
      competency: "mz-soiling",
      related: ["m02.mismatch-bypass", "mz01.transmittance-loss"],
    },
    {
      id: "mz01.bifacial-soiling",
      name: "Bifacial rear-side soiling",
      description: "The rear side contributes a weight φR/(1+φR) of output, typically under 10%, so rear soiling matters less than front; but robots clean only the front, so rear deposits can accumulate for years.",
      competency: "mz-soiling",
      related: ["m02.bifacial-gain"],
    },
    {
      id: "mz01.sr-mass",
      name: "Soiling ratio vs mass density",
      description: "Empirical relations map deposited g/m² to transmittance loss (e.g. Boyle 2015, about 6.5% at 1 g/m²), but coefficients depend on particle size, mineralogy, cementation and angle, so they must be recalibrated per site.",
      competency: "mz-soiling",
      related: ["mz01.transmittance-loss", "mz01.deposition-flux"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "From grams per square metre to lost energy",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Buyers ask Mizan one question in many forms: how much energy is the dust costing me, and how sure are you? The answer depends on more than how much dust is on the glass. Particle size changes the loss per gram, edge bands can cost several times their area through bypass diodes, sensors with the wrong spectrum misread the loss, and bifacial rear sides are never cleaned by robots. Knowing these mechanisms is what lets Mizan's analytics explain a gap that a simple soiling sensor cannot.`,
        },
        {
          kind: "md",
          md: md`### Shadowing, scattering and absorption

A dust particle on the glass interacts with light in three ways: it **absorbs** some (iron oxides, carbon), **scatters** some backward out of the module, and **scatters** some forward, which still reaches the cell as diffuse light. The **soiling ratio** is what remains at the cell relative to clean glass, measured with clean and soiled reference devices under IEC 61724-1:`,
        },
        { kind: "equation", formula: "mz01-soiling-ratio" },
        {
          kind: "md",
          md: md`For a sparse layer of spheres, the shadowed area fraction per unit mass follows from geometry: a sphere's projected area divided by its mass is $3/(2\rho_p d)$.`,
        },
        { kind: "equation", formula: "mz01-coverage" },
        {
          kind: "md",
          md: md`At 1 g/m² of quartz-density dust: 2 µm particles cover 28% of the glass, 10 µm 5.7%, 50 µm 1.1%. **Per gram, fine particles block five to twenty-five times more light than giant ones.** Since wind removes large particles first (Lesson 2), an aged deposit becomes finer and its loss per gram rises.

At higher loadings particles overlap; for random deposition the covered fraction is $1 - e^{-A_c}$, so loss **saturates**. Forward scattering means the true loss is below the shadowed fraction, by an amount that depends on particle size and the angle of the light.

### An empirical relation

Field measurements of naturally soiled glass give a sub-linear, saturating curve. A widely cited fit by Boyle, Flinchpaugh and Hannigan (2015), from glass plates exposed outdoors in Colorado:`,
        },
        { kind: "equation", formula: "mz01-boyle" },
        {
          kind: "chart",
          chart: "line",
          title: "Transmittance loss vs deposited mass density",
          xKey: "w",
          xLabel: "Deposited mass density (g/m²)",
          yLabel: "Loss (%)",
          series: [
            { key: "boyle", label: "Empirical (Boyle et al. 2015)" },
            { key: "c10", label: "Geometric shadowing, 10 µm" },
            { key: "c20", label: "Geometric shadowing, 20 µm" },
            { key: "c40", label: "Geometric shadowing, 40 µm" },
          ],
          data: [
            { w: 0, boyle: 0, c10: 0, c20: 0, c40: 0 },
            { w: 0.5, boyle: 3.65, c10: 2.79, c20: 1.41, c40: 0.71 },
            { w: 1, boyle: 6.53, c10: 5.5, c20: 2.79, c40: 1.41 },
            { w: 2, boyle: 11.5, c10: 10.7, c20: 5.5, c40: 2.79 },
            { w: 3, boyle: 15.74, c10: 15.62, c20: 8.14, c40: 4.16 },
            { w: 5, boyle: 22.44, c10: 24.65, c20: 13.2, c40: 6.83 },
            { w: 7.5, boyle: 28.01, c10: 34.59, c20: 19.12, c40: 10.07 },
            { w: 10, boyle: 31.25, c10: 43.22, c20: 24.65, c40: 13.2 },
          ],
          caption: "Geometric curves use 1 − exp(−3ω/(2ρd)) with ρ = 2,650 kg/m³ and no forward scattering. The empirical curve behaves like a deposit of roughly 10 µm effective size at low loading, then saturates. A Kuwaiti deposit with more giant particles would sit lower per gram; an aged, cemented fine deposit higher.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Use the empirical relation as a shape, not a Kuwait number",
          md: md`The coefficients above are quoted from the published literature as established knowledge, not from the course research brief, and they were fitted outside the Gulf. Mass-to-loss coefficients reported in different studies differ by factors of two or more because of particle size, mineralogy, cementation and test geometry. For Kuwait, the coefficient must be fitted from paired measurements (weighed or gravimetric samples and soiling ratio) at the site.`,
        },
        {
          kind: "md",
          md: md`### Spectral effects

Dust does not dim all wavelengths equally:

- **Absorption:** iron oxides (hematite, goethite) absorb strongly in the blue and UV.
- **Scattering:** fine particles scatter short wavelengths more than long ones (the same physics as the Ångström exponent in Lesson 1).
- The transmitted spectrum is therefore **red-shifted**, and the loss is larger in the blue.

Consequences:

| Who | Effect |
|---|---|
| **Module technologies** | Cells that rely more on short wavelengths (wide-bandgap thin films such as CdTe, perovskite top cells) lose relatively more than crystalline silicon, which responds out to about 1,100 nm |
| **Soiling sensors** | An optical sensor using a single wavelength, or a reference cell of a different technology from the plant's modules, can misread the plant's soiling loss; check that the sensor is calibrated for the module technology |
| **Dual-technology plants** | Shagaya PV has thin-film and poly-Si sections (Al-Rasheedi et al., 2020), so the same dust layer can in principle cost them different percentages |

### Angle of incidence

At high angles of incidence the light crosses the dust layer on a longer, more oblique path and more of it is scattered out, so **soiling loss grows in the morning and evening** on fixed-tilt modules. This is why IEC 61724-1 practice, per vendor guidance, suggests using soiling-ratio data within about two hours of solar noon, and why a noon soiling ratio can understate the daily energy loss of a fixed array. Single-axis trackers keep the angle of incidence lower through the day, which reduces this effect.

### Non-uniform soiling and mismatch

Dust is not spread evenly. On tilted modules it collects along the **lower edge**: drying dew drags particles downhill, the frame lip traps them (and impaction on the lip adds more, Lesson 2), and rain or condensate run-off leaves a muddy band. Bird droppings and local patches add point losses.

Cells in a module are wired in series, in substrings protected by **bypass diodes** (typically three per module). The current through a series string is set by its weakest cell. Two regimes follow:

1. **Mild band** (worst cells lose less than about one third of their light): the whole substring, and the whole string at the inverter's maximum power point, runs at the worst cell's current. **The electrical loss equals the worst cell's loss**, regardless of how few cells are affected.
2. **Heavy band** (worst cells lose more than about one third): the substring is bypassed and its voltage lost; the module loses one third of its power per bypassed substring.

So the electrical loss can be many times the area-average transmittance loss. Mounting orientation matters because it decides how many substrings the bottom band touches. Heavily shaded cells in reverse bias also become **hot spots**, a reliability issue on top of the energy loss. The I-V physics is in Track 0.`,
        },
        { kind: "xref", to: "m02-l02", note: "Single-diode model, I-V curves, mismatch and bypass diodes: the electrical basis for the non-uniform soiling losses here." },
        {
          kind: "md",
          md: md`### Bifacial modules and rear-side soiling

A bifacial module also converts light reaching its rear, mostly reflected from the ground. Its output is weighted by the **bifaciality factor** $\varphi$ (rear efficiency relative to front) and the rear to front irradiance ratio $R$:`,
        },
        { kind: "equation", formula: "mz01-bifacial-sr" },
        {
          kind: "md",
          md: md`With $\varphi = 0.7$ and $R = 0.10$, the rear carries $0.07/1.07 = 6.5\%$ of output, so front soiling dominates. Three points still matter:

- **Robots clean only the front.** Rear deposits (from resuspended ground dust, from vertical night stow, from dew on the rear glass) are never removed by dry front robots and can build up over years.
- **Ground soiling** changes the albedo, and therefore $R$: a dusty crust can be brighter or darker than clean sand. That is a rear-irradiance effect, not rear soiling, but it shows in the same output.
- **Rear non-uniformity** from torque tubes and row structures already causes mismatch; rear dust adds to it.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Rear-side soiling magnitudes",
          md: md`The research brief has no measured rear-side soiling ratios for Gulf bifacial plants. Published field studies elsewhere generally report rear soiling much smaller than front soiling, but values vary with mounting height, stow practice and ground cover. Do not quote a rear-side number to a buyer without a site measurement (for example a rear-facing clean and soiled reference pair).`,
        },
        {
          kind: "widget",
          widget: "loss-waterfall",
          caption: "Put soiling in context: edit the soiling loss in the waterfall (try 2%, 5% and 8%) and watch PR and specific yield. In Kuwait it can be the largest controllable loss after temperature.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Converting deposits and bands into losses",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "One dusty day's deposit as a soiling loss: two estimates and a reality check",
          given: md`The illustrative deposit from Lesson 2: 9.2 mg/m² at 5 µm, 24.0 at 10 µm, 47.1 at 20 µm, 44.8 at 40 µm, total 125 mg/m² (0.125 g/m²) in one day. $\rho_p = 2{,}650$ kg/m³. Assume all of it sticks.`,
          steps: [
            { md: md`**Geometric coverage, bin by bin** ($A_c = 3\omega/(2\rho_p d)$, $\omega$ in kg/m²): 5 µm: $3\times9.2\times10^{-6}/(2\times2{,}650\times5\times10^{-6}) = 0.104\%$; 10 µm: 0.136%; 20 µm: 0.133%; 40 µm: 0.063%.` },
            { md: md`**Total shadowed fraction:** $0.104 + 0.136 + 0.133 + 0.063 = 0.44\%$ per day. Note that the 5 µm bin, 7% of the mass, causes 24% of the shadowing.` },
            { md: md`**Empirical relation at 0.125 g/m²:** $34.37\,\mathrm{erf}(0.17\times0.125^{0.8473}) = 34.37\,\mathrm{erf}(0.0292) = 1.13\%$.` },
            { md: md`**Reality check:** QEERI measured an average of 0.49 %/day in Qatar. The two estimates bracket it, and they differ by a factor of 2.6 for the same mass: geometric shadowing ignores the fine fraction that dominates aged deposits but also ignores resuspension; the empirical fit reflects a finer, aged deposit from another climate.` },
          ],
          result: md`Order of magnitude is right (0.4 to 1.1 %/day for a dusty day with full sticking), but the conversion from mass to loss is uncertain by a factor of two to three. This is why a credible soiling product measures the soiling ratio (or extracts it from PV data) and uses deposition physics to explain and forecast, not to replace the measurement.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "An edge band: portrait vs landscape",
          given: md`72-cell module, cells in 6 columns of 12 along the long side, three substrings of two columns each, one bypass diode per substring. A dust band along the lower edge covers the bottom row of cells. Approximation: module power proportional to current at fixed voltage per active substring; diode drop ignored. **Portrait:** long side vertical, so the bottom row has 6 cells, 2 in each substring. **Landscape:** long side horizontal, so the bottom row is one 12-cell column in a single substring.`,
          steps: [
            { md: md`**Light band: bottom cells lose 20%.** Portrait: all substrings limited to 0.8 of current, bypassing would give 0, so $P = 0.80$. Landscape: run at 0.8 (all substrings active) gives 0.80; bypass the affected substring gives 0.667. Best is 0.80. Both lose **20%**.` },
            { md: md`Area-average transmittance loss for the light band in portrait: 6 of 72 cells at 20% $= 6\times0.20/72 = 1.7\%$. The electrical loss is about 12 times larger.` },
            {
              md: md`**Heavy band: bottom cells lose 50%.** Portrait: all three substrings limited; run at 0.5 gives 0.50, bypassing all gives about 0, so $P = 0.50$.`,
              hidden: true,
              check: { prompt: "Portrait module power as a fraction of clean (heavy band)", answer: 0.5, tolerance: { abs: 0.01 } },
            },
            {
              md: md`Landscape: run at 0.5 gives 0.50; bypass the one affected substring gives $2/3 = 0.667$. Best is 0.667: a loss of **33%** instead of 50%.`,
              hidden: true,
              check: { prompt: "Landscape module power as a fraction of clean (heavy band)", answer: 0.667, tolerance: { abs: 0.005 } },
            },
          ],
          result: md`Non-uniform soiling costs the worst cell's loss until bypass diodes cap it at one substring per affected substring. For heavy lower-edge bands, landscape mounting (band inside one substring) loses less than portrait (band across all substrings). Half-cut cell modules, whose top and bottom halves are wired in parallel, also limit the damage of a bottom band. A soiling sensor that reads only transmittance will miss this extra loss; a $P_{max}$-based soiling ratio or PV-derived analytics will see it.`,
        },
        {
          kind: "question",
          question: {
            id: "mz01-l04-p1",
            type: "numeric",
            prompt: md`A bifacial plant on single-axis trackers: front soiling ratio 0.92, rear soiling ratio 0.97, bifaciality 0.70, rear to front irradiance ratio 0.12. What is the effective soiling ratio of total output? (3 decimals)`,
            answer: 0.924,
            tolerance: { abs: 0.002 },
            explanation: md`$SR_{eff} = (0.92 + 0.70\times0.12\times0.97)/(1 + 0.70\times0.12) = (0.92 + 0.0815)/1.084 = 0.924$. The rear carries a weight of 7.7%; the front sets the answer.`,
            concepts: ["mz01.bifacial-soiling"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "What this means for measurement and analytics",
      blocks: [
        {
          kind: "md",
          md: md`### Practical consequences

| Mechanism | What it does to the numbers | What to do |
|---|---|---|
| Size-dependent loss per gram | Same mass, different loss across seasons and sites | Never sell a g/m² to % conversion without site calibration |
| Spectral selectivity | Sensors of a different technology misread the plant's loss | Match the reference device to the plant's module technology, or correct for spectrum |
| Angle of incidence | Noon soiling ratio understates daily loss on fixed tilt | Use near-noon data for the ratio, then model daily loss with an angular correction |
| Non-uniform bands | $I_{sc}$-based ratio understates power loss | Compare $I_{sc}$ and $P_{max}$ ratios; inspect lower edges; consider orientation in new designs |
| Rear side | Robots never clean it | Inspect and occasionally measure the rear; budget for rear cleaning if it matters |
| Bypass and hot spots | Heavy bands cause reverse bias and heating | Thermography after dewy periods; reliability as well as energy |

Soiling measurement methods (IEC 61724-1 reference pairs, optical sensors, extraction from PV data) are the subject of the next module; this lesson supplies the physics that explains why they disagree.`,
        },
        { kind: "xref", to: "m02-l03", note: "Bifacial modules, bifaciality factor and rear irradiance in Track 0." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Quoting soiling as transmittance only:** a 2% optical loss with a lower-edge band can be a 10 to 20% power loss on affected modules.
- **Calibrating a sensor on one technology and applying it to another:** thin-film and crystalline sections of the same plant can soil differently in percentage terms.
- **Using all-day soiling-ratio data:** angle-of-incidence artefacts in the morning and evening corrupt the daily ratio.
- **Assuming the rear is negligible forever:** after years without rear cleaning, it may not be.
- **Selling a mass-to-loss model as a measurement:** the factor of two to three uncertainty will be found by the first researcher who checks.`,
        },
        {
          kind: "ask",
          title: "Ask the plant owner or EPC",
          items: [
            "Are the modules mounted portrait or landscape, full-cell or half-cut, and how many bypass diodes per module?",
            "Is the soiling reference device the same technology as the modules? Is it $I_{sc}$-based or $P_{max}$-based?",
            "Have you seen lower-edge dust bands or hot spots after dewy periods?",
            "For bifacial blocks: has the rear side ever been cleaned or measured?",
            "Is the soiling ratio computed from near-noon data only?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz01-l04-p2",
            type: "short",
            prompt: md`A Kuwaiti plant owner tells Mizan: "Our optical soiling sensor reads 3% loss, so soiling is a minor issue and we don't need analytics." Write the technical reply Mizan would send (half a page): explain which loss mechanisms an optical transmittance reading can miss, give one quantified example, and propose a low-cost check on his data. Do not claim any results Mizan does not have.`,
            rubric: [
              "Explains that non-uniform soiling (lower-edge bands) causes mismatch losses set by the worst cells, not the average, with a quantified example",
              "Mentions spectral mismatch between the sensor and the module technology, and angle-of-incidence effects",
              "Mentions bifacial rear-side soiling if relevant and that robots clean only the front",
              "Proposes a concrete, low-cost check: compare PV-derived performance before and after a cleaning, or Isc vs Pmax ratios, or inspect edges",
              "Keeps a respectful tone and makes no invented claims about Mizan's results or the owner's plant",
            ],
            modelAnswer: md`Thank you for sharing the sensor reading. A 3% optical loss is a good start, but an optical transmittance sensor measures one clean-glass spot, and three mechanisms can make the plant's power loss larger than that.

**1. Non-uniform soiling.** Dust collects along the lower edge of tilted modules. Cells are in series, so the substring runs at the current of its dirtiest cells. If the bottom row of cells on a portrait module loses 20% of its light, the module loses about 20% of its power, even though the area-average optical loss is under 2%. A spot sensor will not see this.

**2. Spectrum and angle.** Dust removes more blue light, so a sensor calibrated at one wavelength or on a different cell technology can misread your modules' loss; and on fixed tilt the loss rises in the morning and evening, while sensors are usually read near noon.

**3. Rear side (bifacial blocks).** Robots clean the front only; rear deposits accumulate.

**A low-cost check:** pick two recent cleaning events and compare temperature-corrected performance ratio for the three days before and after each. If the step in PR is much larger than 3%, the sensor is understating the loss. A second check is to compare short-circuit-current and maximum-power soiling ratios if your reference device logs both. We would be glad to run this check with you on your historical data.`,
            explanation: md`The reply should translate mechanisms into a number the owner recognises and offer a check he can verify on his own data.`,
            concepts: ["mz01.nonuniform-soiling", "mz01.spectral-soiling", "mz01.bifacial-soiling"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["mz01-r14", "mz01-r15", "mz01-r12", "mz01-r1"] },
        {
          kind: "feynman",
          prompt: "Explain to a finance director why 'how many grams of dust are on the panels' does not tell you how much energy you are losing.",
          keyPoints: [
            "Fine particles block much more light per gram than large ones, and wind leaves the fines behind",
            "Loss saturates as particles overlap, and forward scattering returns part of the light",
            "Dust bands at the lower edge cost the worst cell's loss for the whole substring through series wiring",
            "Spectrum and sun angle change the loss through the day and between technologies",
            "So the energy loss must be measured or extracted from plant data and calibrated per site",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz01-l04-q1",
      type: "numeric",
      prompt: md`What fraction of the glass (in %) does 1 g/m² of 5 µm quartz-density particles ($\rho_p = 2{,}650$ kg/m³) shadow, in the sparse-layer approximation? (1 decimal)`,
      answer: 11.3,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$A_c = 3\omega/(2\rho_p d) = 3\times10^{-3}/(2\times2{,}650\times5\times10^{-6}) = 0.113 = 11.3\%$. Twice the 10 µm value: coverage per gram scales with $1/d$.`,
      concepts: ["mz01.transmittance-loss"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "mz01-l04-q2",
      type: "numeric",
      prompt: md`Using the Boyle et al. relation $\Delta T = 34.37\,\mathrm{erf}(0.17\,\omega^{0.8473})$, what is the transmittance loss at 2 g/m² (%)? Take $\mathrm{erf}(0.305) = 0.334$. (1 decimal)`,
      answer: 11.5,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$2^{0.8473} = 1.799$; $0.17\times1.799 = 0.306$; $\mathrm{erf}(0.306) \approx 0.335$; $34.37\times0.335 = 11.5\%$. The curve is sub-linear: doubling mass from 1 to 2 g/m² raises loss from 6.5% to 11.5%.`,
      concepts: ["mz01.sr-mass"],
      difficulty: 2,
    },
    {
      id: "mz01-l04-q3",
      type: "mcq",
      prompt: "A portrait-mounted 3-substring module has a light dust band on its bottom row of cells, each losing 15% of its light. What is the approximate module power loss?",
      options: ["About 1%", "About 5%", "About 15%", "About 33%"],
      answer: 2,
      explanation: md`Every substring contains bottom-row cells, so the module runs at 85% current: about 15% loss. Bypassing would cost more. The area-average optical loss is only about $6\times0.15/72 = 1.25\%$.`,
      concepts: ["mz01.nonuniform-soiling"],
      difficulty: 2,
    },
    {
      id: "mz01-l04-q4",
      type: "multi",
      prompt: "Which effects make dust losses spectrally selective? (Select all that apply.)",
      options: [
        "Absorption by iron oxides in the blue and UV",
        "Stronger scattering of short wavelengths by fine particles",
        "Quartz absorbs strongly in the near infrared",
        "Calcite fluorescence",
      ],
      answer: [0, 1],
      explanation: md`Iron-oxide absorption and size-dependent scattering both remove short wavelengths preferentially. Quartz and calcite are largely transparent in the visible and near infrared.`,
      concepts: ["mz01.spectral-soiling"],
      difficulty: 1,
    },
    {
      id: "mz01-l04-q5",
      type: "mcq",
      prompt: "Why might the rear-side soiling of a robot-cleaned bifacial plant grow over the years even though rear deposition is slow?",
      options: [
        "The rear side is hydrophilic",
        "Dry front-cleaning robots never clean the rear, so deposits are never removed",
        "Bifaciality increases with age",
        "Rear glass is thinner",
      ],
      answer: 1,
      explanation: md`Slow arrival with no removal still accumulates. Its weight in output is small (often under 10%), but not zero, and it can add rear mismatch.`,
      concepts: ["mz01.bifacial-soiling"],
      difficulty: 1,
    },
    {
      id: "mz01-l04-q6",
      type: "decision",
      prompt: md`You are specifying modules for a new Kuwaiti fixed-tilt plant with frequent dew. Lower-edge banding is expected. Which mounting choice best limits band losses?`,
      options: [
        { text: "Portrait, full-cell modules, to maximise rows per table.", score: 0.2, feedback: "A bottom band then touches all three substrings: worst case for heavy bands." },
        { text: "Landscape, or half-cut cell modules, so that a bottom band affects as few series cells and substrings as possible, plus frames that shed water and dust.", score: 1, feedback: "Uses the bypass structure to contain the band and reduces the trap at the frame lip." },
        { text: "It makes no difference; only total soiled area matters.", score: 0, feedback: "Electrical loss follows the series and bypass topology, not the area average." },
      ],
      explanation: md`Orientation, cell layout and frame design decide how a band maps onto series cells and substrings. Structural and cost effects of landscape mounting must be weighed too.`,
      concepts: ["mz01.nonuniform-soiling"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "mz01-l04-f1", front: "Coverage per gram", back: md`$A_c = 3\omega/(2\rho_p d)$: 1 g/m² of 10 µm dust shadows about 5.7%; of 2 µm about 28%.`, concepts: ["mz01.transmittance-loss"] },
    { id: "mz01-l04-f2", front: "Boyle et al. 2015 relation", back: md`$\Delta T = 34.37\,\mathrm{erf}(0.17\omega^{0.8473})$: about 6.5% at 1 g/m², saturating near 34%. Site-specific.`, concepts: ["mz01.sr-mass"] },
    { id: "mz01-l04-f3", front: "Mild vs heavy edge band", back: "Mild: loss equals the worst cell's loss. Heavy (above about one third): affected substrings are bypassed, one third of power each.", concepts: ["mz01.nonuniform-soiling"] },
    { id: "mz01-l04-f4", front: "Isc vs Pmax soiling ratio", back: "Isc-based captures transmittance; Pmax-based also captures mismatch from non-uniform soiling.", concepts: ["mz01.nonuniform-soiling"] },
    { id: "mz01-l04-f5", front: "Bifacial effective SR", back: md`$SR_{eff} = (SR_f + \varphi R\,SR_r)/(1+\varphi R)$; rear weight about 6 to 8% at $\varphi = 0.7$, $R = 0.1$.`, concepts: ["mz01.bifacial-soiling"] },
    { id: "mz01-l04-f6", front: "Why use near-noon soiling-ratio data", back: "Soiling loss grows with angle of incidence; near-noon data limits the angular artefact.", concepts: ["mz01.spectral-soiling"] },
  ],
};

export default lesson;
