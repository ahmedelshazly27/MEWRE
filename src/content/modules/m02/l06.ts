import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m02-l06",
  title: "Energy yield: PVsyst, PR, P50/P90",
  summary:
    "How an energy yield assessment is built in PVsyst, the loss tree from GHI to grid, performance ratio and specific yield, uncertainty stacking to P50/P75/P90/P99, and how a PM reviews a yield report for red flags.",
  minutes: 85,
  objectives: [
    "Walk through the PVsyst workflow and name the inputs that drive the result",
    "Build and interpret a loss tree from GHI to grid-injected energy, and compute PR and specific yield",
    "Test the plausibility of a claimed specific yield for Kuwait from first principles",
    "Combine uncertainty components into P50/P90 (1-year and 10-year) and explain why lenders care",
    "Review a PVsyst report as a PM and identify red flags",
  ],
  concepts: [
    {
      id: "m02.pvsyst-workflow",
      name: "PVsyst workflow",
      description: "Meteo file, orientation/tracking, near shading, system (PAN/OND), detailed losses, simulation and report.",
      competency: "solar",
      related: ["m02.loss-tree", "m02.yield-review"],
    },
    {
      id: "m02.loss-tree",
      name: "Loss tree",
      description: "The cascade of gains and losses from GHI to grid energy: transposition, IAM, soiling, temperature, electrical, inverter, AC, availability.",
      competency: "solar",
      related: ["m02.performance-ratio", "m02.soiling", "m02.cell-temperature", "m02.dc-ac-ratio", "m12.diagnosis-workflow"],
    },
    {
      id: "m02.performance-ratio",
      name: "Performance ratio & specific yield",
      description: "PR = final yield / reference yield; specific yield in kWh/kWp; temperature-corrected PR and bifacial caveats.",
      competency: "operations",
      related: ["m02.loss-tree", "m02.commissioning-tests", "m07.pr-test", "m09.pr-guarantee"],
    },
    {
      id: "m02.p50-p90",
      name: "P50/P90 & uncertainty",
      description: "Exceedance probabilities from combined uncertainty; 1-year vs 10-year P90; why debt is sized on P90/P99.",
      competency: "finance",
      related: ["m02.solar-resource-data", "m02.yield-review", "m10.cover-ratios", "m15.energy-yield-basis"],
    },
    {
      id: "m02.yield-review",
      name: "Reviewing a yield report",
      description: "PM-level review of a PVsyst/energy yield assessment: consistency, assumptions, red flags.",
      competency: "solar",
      related: ["m02.design-review", "m02.pvsyst-workflow", "m11.evaluation-methods"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "The PVsyst workflow",
      blocks: [
        {
          kind: "md",
          md: md`**PVsyst** (Swiss, desktop) is the de-facto bankable simulation tool; SAM (NREL), PVsyst-alternatives such as PlantPredict and SolarFarmer are also used, and lenders often require a second independent model. An hourly (or sub-hourly) simulation runs through these steps:

1. **Meteo**: hourly GHI, DHI (or DNI), ambient temperature, wind, (albedo) — from the site-adapted TMY (lesson 1). PVsyst imports Solargis/Meteonorm/custom files.
2. **Orientation**: fixed tilt/azimuth, or single-axis tracker with axis orientation, rotation limits, GCR, backtracking strategy.
3. **Transposition**: Perez (default) or Hay to get POA irradiance.
4. **Near shading**: 3D scene — tracker rows, terrain, nearby objects. Linear vs "according to module strings" (electrical) shading.
5. **Bifacial model**: 2D unlimited-sheds/trackers view-factor model: albedo, height, rear shading factor, rear mismatch.
6. **System**: module (**.PAN** file), inverter (**.OND** file), strings per inverter, DC/AC ratio.
7. **Detailed losses**: thermal U-values, DC wiring resistance, module quality/LID/mismatch, soiling (monthly profile), IAM, AC losses, transformer losses, unavailability, ageing.
8. **Simulation** → energy at grid, PR, loss diagram, monthly tables.
9. **P50/P90** module: user-entered uncertainty components and interannual variability.

The result is only as good as the inputs; nearly every red flag in a yield report is an input choice.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the PM must understand the model even when the IPP owns the yield risk",
          md: md`In a tariff-based IPP the developer is paid per MWh, so a wrong yield hurts the developer first. But MEWRE uses the P50 profile for system planning (summer peak, BESS sizing, fuel planning), the PPA may contain deemed-energy compensation computed with a yield model, and an over-optimistic bid can win the tender and then lead to a financially stressed project company. Reviewing the yield assumptions is a core offtaker competence.`,
        },
      ],
    },
    {
      layer: "theory",
      title: "The loss tree, PR and specific yield",
      blocks: [
        {
          kind: "md",
          md: md`PVsyst's loss diagram is a waterfall from horizontal irradiation to grid energy. Representative values for a single-axis bifacial TOPCon plant in a Kuwait-like climate (illustrative):

| Step | Typical value | Driver |
|---|---|---|
| GHI (horizontal) | ≈ 2,000–2,100 kWh/m² (unverified for Shagaya) | Resource |
| Transposition gain (tracker) | +22 to +28 % → POA ≈ 2,450–2,650 | Tracking, Perez, diffuse share |
| Near shading / backtracking | −0.5 to −1.5 % | GCR, terrain |
| IAM (incidence angle) | −1.5 to −2.5 % | Glass/ARC, tracking |
| Soiling | −2 to −5 % (site data!) | Cleaning regime |
| Bifacial gain | +5 to +8 % | Albedo, height, bifaciality |
| Irradiance level (low-light) | −0.3 to −1 % | PAN file |
| **Temperature** | **−7 to −10 %** | γ, U-values, ambient |
| Module quality / binning | −0.5 to +0.5 % | Positive tolerance |
| LID / LeTID | −0.5 to −2 % | Technology |
| Mismatch | −0.7 to −1.5 % | Binning, bifacial rear non-uniformity |
| DC ohmic | −1 to −1.5 % | Cable design |
| Inverter efficiency | −1.2 to −2 % | Euro/CEC efficiency |
| Clipping | −0.5 to −3 % | DC/AC ratio |
| AC ohmic + transformers (incl. night losses) | −1 to −2 % | MV/HV design |
| Unavailability | −0.5 to −1.5 % | O&M, grid |

**Performance ratio** strips out the weather:`,
        },
        { kind: "equation", formula: "pv-performance-ratio" },
        { kind: "equation", formula: "pv-specific-yield" },
        {
          kind: "md",
          md: md`Multiplying the mid-range losses above (without bifacial) gives PR ≈ 0.77; using the better end of each range gives ≈ 0.80–0.82. Adding a 6 % bifacial gain lifts this to ≈ 0.82–0.85 on a front-side basis. With POA ≈ 2,550 kWh/m² that is ≈ 2,090–2,170 kWh/kWp.

**Temperature-corrected PR** (IEC 61724-1) multiplies each hour's reference (expected) yield by the correction factor $C_k = 1 + \gamma(T_{c,k} - T_{ref})$ — equivalently, divides the raw PR by an irradiance-weighted $C$ — so a plant is not penalised for a hot month. With $T_{ref} = 25$ °C you get the STC-corrected PR (≈ 5–8 points above raw PR in Kuwait); with $T_{ref}$ = the site's annual-average cell temperature you get an annual-equivalent PR that removes seasonal swings without inflating the annual value. Used in performance tests to separate *weather* from *defects*. A PPA or EPC performance test must state precisely which PR definition applies, the irradiance basis (front POA vs effective incl. rear), the measurement class, and how unavailability and curtailment are treated.`,
        },
        {
          kind: "widget",
          widget: "loss-waterfall",
          caption: "Edit each loss and watch PR and specific yield change. Try temperature −9 % and soiling −5 % (summer-heavy Kuwait case).",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Is 2,300–2,500 kWh/kWp plausible for Kuwait trackers?",
          md: md`This figure is sometimes quoted for Gulf tracker plants. First-principles check with $Y_f \approx GHI \times (POA/GHI) \times PR$:

| GHI | POA/GHI | PR (incl. bifacial) | Specific yield |
|---|---|---|---|
| 2,000 | 1.22 | 0.80 | ≈ 1,950 |
| 2,100 | 1.25 | 0.82 | ≈ 2,150 |
| 2,100 | 1.27 | 0.85 | ≈ 2,270 |
| 2,200 | 1.28 | 0.85 | ≈ 2,390 |

With Kuwait GHI in the indicative 1,900–2,100 range (itself **unverified**), **≈ 2,000–2,300 kWh/kWp** is the plausible band; values toward 2,500 would need GHI ≈ 2,300 or an unusually high PR. Treat 2,300–2,500 as **unverified and optimistic** for Shagaya until checked against site-adapted resource data and the bidders' PVsyst reports.`,
        },
        { kind: "sources", refs: ["mordor-kuwait-solar-ghi", "global-solar-atlas", "iec-61724-1", "pvsyst-help"] },
      ],
    },
    {
      layer: "theory",
      title: "Uncertainty, P50 and P90",
      blocks: [
        {
          kind: "md",
          md: md`**P50** is the median expected annual energy: 50 % chance of being exceeded. **P90** is exceeded with 90 % probability. Assuming the combined uncertainty is normally distributed:`,
        },
        { kind: "equation", formula: "pv-uncertainty-rss" },
        { kind: "equation", formula: "pv-exceedance" },
        {
          kind: "md",
          md: md`Typical uncertainty components (1σ, % of P50) for a desert PV plant:

| Component | Without site data | With ≥ 12 months site-adapted data |
|---|---|---|
| Long-term resource (GHI) | 4–6 % | 2.5–3.5 % |
| Transposition / POA model | 1.5–2.5 % | 1.5–2 % |
| PV model (PAN, thermal, losses) | 2.5–3.5 % | 2.5–3 % |
| Soiling | 2–3 % | 1–2 % |
| Degradation (over loan life) | 1–1.5 % | 1 % |
| Availability | 1 % | 1 % |
| **Interannual variability** (single year) | 2.5–4 % | 2.5–4 % |

**1-year vs 10-year P90.** Interannual variability averages out over many years: over $N$ years the variability term becomes $\sigma_{iav}/\sqrt{N}$. Lenders sizing debt on a DSCR covenant tested each year look at the **1-year P90 / P99** for liquidity (debt service reserve) and the **10-year P90** for debt sizing. The long-term components (resource bias, model) do *not* average out — if the resource is 4 % lower than assumed, it is lower every year.

**Why it matters for the tariff.** Debt is sized so that cash flow at P90 (or P99) covers debt service by the DSCR covenant (e.g. 1.20–1.30×). Higher uncertainty → lower P90 → less debt → more equity → higher tariff. Better resource data is a direct tariff reduction for MEWRE.`,
        },
        {
          kind: "widget",
          widget: "p50-p90",
          props: { p50: 300, sigma: 6 },
          caption: "Move σ from 4 % to 8 % and watch P90 and P99 fall relative to P50.",
        },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "PR, yield and exceedance calculations",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Performance ratio from a year of operating data",
          given: md`120 MWp tracker plant (DC nameplate). Year-1 metered export 245,000 MWh. Measured POA irradiation (front side, Class A pyranometers) 2,550 kWh/m². Irradiance-weighted average cell temperature 45 °C; $\gamma = -0.30$ %/°C.`,
          steps: [
            { md: md`**Reference yield**: $Y_r = H_{POA}/G_{STC} = 2{,}550\ \text{kWh/m}^2 \,/\, 1\ \text{kW/m}^2 = 2{,}550$ h.` },
            { md: md`**Final (specific) yield**: $Y_f = 245{,}000{,}000\ \text{kWh} / 120{,}000\ \text{kWp} = 2{,}042$ kWh/kWp.` },
            { md: md`**PR**: $2{,}042/2{,}550 = 0.801$.` },
            { md: md`**Temperature-corrected PR (approx.)**: divide by $1 + (-0.003)(45 - 25) = 0.94$ → $0.801/0.94 = 0.852$. This is the figure to compare against a temperature-corrected guarantee.` },
            { md: md`**Interpretation**: PR 0.80 on a bifacial tracker in Kuwait is plausible but on the lower side if the yield model assumed ≈ 0.84 including bifacial gain. Next step: split the gap by month and by loss (availability, soiling ratio, clipping, inverter derating) using SCADA.` },
          ],
          result: md`$Y_f$ ≈ 2,042 kWh/kWp; PR ≈ 0.80 (≈ 0.85 temperature-corrected). PR alone does not tell you *why* — the loss tree does.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "P90 from P50 and stacked uncertainties",
          given: md`P50 = 300,000 MWh/yr. Uncertainties (1σ): resource 3.5 %, transposition 2.0 %, PV model 3.0 %, soiling 1.5 %, degradation 1.0 %, availability 1.0 %. Interannual variability 3.0 %. $z_{90} = 1.2816$.`,
          steps: [
            {
              md: md`**Long-term combined σ**: $\sqrt{3.5^2 + 2.0^2 + 3.0^2 + 1.5^2 + 1.0^2 + 1.0^2} = \sqrt{29.5} = 5.43$ %.`,
              hidden: true,
              check: { prompt: "Long-term combined σ (%)", answer: 5.43, unit: "%", tolerance: { abs: 0.05 } },
            },
            { md: md`**1-year σ**: $\sqrt{5.43^2 + 3.0^2} = 6.20$ %.` },
            {
              md: md`**1-year P90**: $300{,}000 \times (1 - 1.2816 \times 0.0620) = 276{,}100$ MWh.`,
              hidden: true,
              check: { prompt: "1-year P90 (MWh)", answer: 276144, unit: "MWh", tolerance: { rel: 0.005 } },
            },
            { md: md`**10-year P90**: σ = $\sqrt{5.43^2 + 3.0^2/10} = 5.51$ % → $300{,}000 \times (1 - 1.2816 \times 0.0551) = 278{,}800$ MWh.` },
            { md: md`**1-year P99**: $300{,}000 \times (1 - 2.3263 \times 0.0620) = 256{,}700$ MWh.` },
          ],
          result: md`1-yr P90 ≈ 276 GWh (−8.0 % vs P50); 10-yr P90 ≈ 279 GWh (−7.1 %); 1-yr P99 ≈ 257 GWh (−14.4 %). The resource and PV model terms dominate: halving resource uncertainty from 3.5 % to 1.75 % would raise 10-yr P90 by ≈ 1.3 %.`,
        },
        {
          kind: "question",
          question: {
            id: "m02-l06-p1",
            type: "numeric",
            prompt: md`Independent problem. A bidder's report gives P50 = 280 GWh/yr and a combined 1-year uncertainty of 6.0 %. What is the 1-year P90 in GWh?`,
            answer: 258.5,
            tolerance: { rel: 0.005 },
            unit: "GWh",
            explanation: md`$P_{90} = 280 \times (1 - 1.2816 \times 0.06) = 280 \times 0.9231 = 258.5$ GWh. If the bidder states P90 = 270 GWh with the same σ, the arithmetic is wrong or a different distribution was assumed — ask.`,
            concepts: ["m02.p50-p90"],
            difficulty: 1,
          },
        },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "Reviewing a PVsyst report as the PM",
      blocks: [
        {
          kind: "md",
          md: md`**Who produces what.** The bidder/IPP produces the energy yield assessment (EYA), often by an independent consultant. The lenders' technical advisor (LTA) produces an independent EYA for the banks. MEWRE's Owner's Engineer reviews bids and later reviews the IPP's design-stage EYA. During operations, the O&M contractor's monthly reports compare actual vs P50 (weather-corrected).

**How to read a PVsyst report in 20 minutes.**

1. **Page 1–2 (project and system)**: site coordinates and altitude correct? Meteo source named and dated? Tracker parameters (GCR, rotation limits, backtracking)? Module and inverter models match the technical proposal? DC/AC ratio?
2. **Loss parameters page**: thermal U-values; DC wiring loss %; soiling (monthly profile or flat?); LID; module quality; mismatch; IAM model; AC losses; transformer losses (incl. night); unavailability; ageing.
3. **Main results**: energy, specific yield, PR. Compare with the plausibility band.
4. **Loss diagram**: scan each line against the typical ranges table. Anything outside range needs a justification.
5. **Monthly table**: summer PR dip present (temperature)? GlobInc/GlobHor ratio per month sensible?
6. **P50/P90 page** (or separate report): components listed? σ plausible? 1-yr vs 10-yr shown?`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Red flags in a yield report",
          md: md`- **Soiling ≤ 1 %** flat all year in Kuwait without a robotic-cleaning commitment in the O&M plan.
- **Thermal U-values above default** without measured evidence (lesson 2).
- **Bifacial gain > 9–10 %** without measured albedo and rear-shading analysis.
- **Unavailability 0 %** or not modelled; grid curtailment ignored.
- **No inverter temperature derating** (OND file at 25 °C ambient only).
- **Module quality gain +1 % or more** without contractual positive tolerance and flash-data evidence.
- **Meteo file mismatch**: generic Meteonorm file, wrong coordinates, or a different year range than stated.
- **P90 with σ < 4 %** without site-adapted resource data.
- **Degradation 0.25 %/yr or less** "from manufacturer data" — warranty is 0.4 %/yr.
- **Clipping missing** from the loss diagram on a 1.35 DC/AC tracker plant.`,
        },
        {
          kind: "checklist",
          title: "PM yield-review checklist",
          items: [
            "Coordinates, altitude, time zone and meteo source verified",
            "Module/inverter in PVsyst match the technical proposal (PAN/OND versions provided)",
            "Each loss within typical range or justified with evidence",
            "Specific yield within the first-principles plausibility band for the site",
            "PR definition in the report matches the PPA/EPC test definition (front vs bifacial, temperature-corrected or not)",
            "P50/P90: components listed, σ justified, 1-yr and 10-yr given, arithmetic checked",
            "Second model or independent cross-check (LTA, PVWatts/SAM sanity check)",
            "Hourly 8760 profile delivered (needed for grid/BESS planning)",
          ],
        },
        {
          kind: "ask",
          title: "Ask the consultant / bidder",
          items: [
            "Provide the PVsyst project file, PAN/OND files and hourly 8760 output, not just the PDF.",
            "What is the basis of your soiling profile and does it match your committed cleaning plan?",
            "How did you model bifacial gain — albedo source, height, rear shading factor, rear mismatch?",
            "Is inverter and transformer temperature derating included? Show the July loss breakdown.",
            "Break down your P90 uncertainty and show the impact of site adaptation.",
          ],
        },
        {
          kind: "callout",
          tone: "ai",
          title: "Using AI on yield reports",
          md: md`An LLM can extract the loss table from a 40-page PVsyst PDF into a spreadsheet, compare three bidders' loss trees side by side, and flag values outside the ranges in this lesson. Do not let it "estimate" missing values; ask it to list what is missing. Verify every extracted number against the PDF before it goes into an evaluation report.`,
        },
        { kind: "scenario", scenario: "m02-s6" },
        {
          kind: "feynman",
          prompt: "Explain to a lender's credit officer, without equations, the difference between P50 and 10-year P90, and why better ground data can lower the tariff MEWRE pays.",
          keyPoints: [
            "P50 is the median expectation; P90 is exceeded 9 years in 10 (or with 90 % confidence over the period)",
            "Uncertainty from resource, model, soiling, availability is combined",
            "Year-to-year weather averages out over 10 years, long-term biases do not",
            "Debt is sized on P90/P99 cash flows",
            "Lower uncertainty raises P90, allows more debt, lowers equity need and the bid tariff",
          ],
        },
        { kind: "sources", refs: ["pvsyst-help", "nrel-sam", "nrel-pvwatts", "iec-61724-1", "iea-pvps"] },
      ],
    },
  ],
  quiz: [
    {
      id: "m02-l06-q1",
      type: "numeric",
      prompt: md`A 200 MWp plant exported 410,000 MWh in a year with front-side POA irradiation of 2,500 kWh/m². What is the PR?`,
      answer: 0.82,
      tolerance: { abs: 0.005 },
      unit: "—",
      explanation: md`$Y_f = 410{,}000{,}000/200{,}000 = 2{,}050$ kWh/kWp; $Y_r = 2{,}500$ h; PR = 2,050/2,500 = 0.82.`,
      concepts: ["m02.performance-ratio"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m02-l06-q2",
      type: "order",
      prompt: md`Order these steps of the PVsyst loss tree from irradiance to grid.`,
      items: [
        "Transposition from GHI to POA",
        "IAM and soiling losses",
        "Temperature loss",
        "Inverter losses and clipping",
        "AC ohmic and transformer losses",
      ],
      explanation: md`Optical losses act on irradiance first, then the array converts (thermal, electrical DC), then the inverter, then the AC network to the meter.`,
      concepts: ["m02.loss-tree", "m02.pvsyst-workflow"],
      difficulty: 1,
    },
    {
      id: "m02-l06-q3",
      type: "mcq",
      prompt: md`Why does the 10-year P90 sit closer to P50 than the 1-year P90?`,
      options: [
        "Degradation is ignored over 10 years",
        "Interannual weather variability averages out over many years (÷√N), while long-term biases do not",
        "Lenders use a different z-value for 10 years",
        "Resource uncertainty disappears after 10 years",
      ],
      answer: 1,
      explanation: md`Only the year-to-year random component scales as $1/\sqrt{N}$. Resource bias and model error persist every year, so the 10-year P90 never converges to P50.`,
      concepts: ["m02.p50-p90"],
      difficulty: 2,
    },
    {
      id: "m02-l06-q4",
      type: "multi",
      prompt: md`Which items in a Kuwait tracker PVsyst report are red flags? Select all.`,
      options: [
        "Flat 0.8 % soiling with monthly manual cleaning in the O&M plan",
        "Temperature loss of 8.5 %",
        "Bifacial gain of 13 % with default albedo 0.2",
        "Unavailability 0 %",
        "Clipping loss of 1.8 % at DC/AC 1.30",
      ],
      answer: [0, 2, 3],
      explanation: md`Monthly cleaning implies ≈ 4–9 % average soiling in Kuwait, not 0.8 %. A 13 % bifacial gain at albedo 0.2 is internally inconsistent. Zero unavailability is never real. 8.5 % temperature loss and 1.8 % clipping at 1.30 are plausible.`,
      concepts: ["m02.yield-review", "m02.loss-tree"],
      difficulty: 2,
    },
    {
      id: "m02-l06-q5",
      type: "numeric",
      prompt: md`Combine independent uncertainties of 4 %, 3 % and 2 % (1σ). What is the combined σ in %?`,
      answer: 5.39,
      tolerance: { abs: 0.03 },
      unit: "%",
      explanation: md`$\sqrt{16 + 9 + 4} = \sqrt{29} = 5.39$ %. Note it is much less than the arithmetic sum (9 %) — but only if the components are genuinely independent.`,
      concepts: ["m02.p50-p90"],
      difficulty: 1,
    },
    {
      id: "m02-l06-q6",
      type: "decision",
      prompt: md`You are the MEWRE PM evaluating three bids. Bid A's P50 specific yield is 2,460 kWh/kWp; Bids B and C are 2,150 and 2,180, using the same module class and tracker type. Tariffs are evaluated on price, but yield affects the energy plan. What do you do?`,
      options: [
        { text: "Ask the OE to normalise all three yields using a common resource file and loss assumptions, and send Bid A a clarification on its resource, bifacial, soiling and thermal assumptions.", score: 1, feedback: "Correct: like-for-like comparison and clarification, documented in the evaluation." },
        { text: "Score Bid A highest on technical — it produces most energy.", score: 0, feedback: "A 13 % higher yield on the same technology is almost certainly an assumption difference, not engineering." },
        { text: "Disqualify Bid A for unrealistic yield.", score: 0.3, feedback: "Clarification first; disqualification needs RFP grounds." },
      ],
      explanation: md`Large yield gaps between similar designs come from inputs. Normalising inputs reveals the real technical differences.`,
      concepts: ["m02.yield-review"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m02-l06-f1", front: "PR definition", back: md`$PR = Y_f/Y_r = E/(P_{STC}\cdot H_{POA}/G_{STC})$`, concepts: ["m02.performance-ratio"] },
    { id: "m02-l06-f2", front: "Typical annual PR, Kuwait tracker", back: "≈ 0.78–0.84 front-side; ≈ 0.85 incl. bifacial gain.", concepts: ["m02.performance-ratio"] },
    { id: "m02-l06-f3", front: "z-values for P75 / P90 / P99", back: "0.674 / 1.282 / 2.326", concepts: ["m02.p50-p90"] },
    { id: "m02-l06-f4", front: "Largest single loss in a Kuwait loss tree", back: "Temperature (≈ 7–10 %).", concepts: ["m02.loss-tree"] },
    { id: "m02-l06-f5", front: "PAN and OND files", back: "PVsyst module (.PAN) and inverter (.OND) parameter files.", concepts: ["m02.pvsyst-workflow"] },
    { id: "m02-l06-f6", front: "Plausible specific yield band, Kuwait trackers (first principles)", back: "≈ 2,000–2,300 kWh/kWp (2,300–2,500 claims are unverified/optimistic).", concepts: ["m02.performance-ratio", "m02.yield-review"] },
    { id: "m02-l06-f7", front: "Interannual variability over N years", back: md`$\sigma_{iav}/\sqrt{N}$`, concepts: ["m02.p50-p90"] },
    { id: "m02-l06-f8", front: "Why bifacial plants show inflated PR", back: "Rear-side energy is counted in E but front-side POA is used in the denominator.", concepts: ["m02.performance-ratio"] },
  ],
  scenarios: [
    {
      id: "m02-s6",
      title: "The PVsyst report on your desk",
      dayInLife: true,
      context: md`It is 08:30. The Director asks for your view, by 13:00, on the preferred bidder's design-stage energy yield assessment for a 1,100 MW PV IPP, because the lenders' technical advisor (LTA) has issued a P50 3.5 % lower than the bidder's. You have the bidder's 45-page PVsyst report and the LTA's 6-page summary.`,
      start: "a",
      concepts: ["m02.yield-review", "m02.p50-p90", "m02.loss-tree"],
      nodes: {
        a: {
          md: md`Where do you start?`,
          choices: [
            { text: "Put the two loss trees side by side line by line to find where the 3.5 % comes from.", next: "b", score: 10, feedback: "Efficient: the gap almost always concentrates in 2–3 lines." },
            { text: "Read the whole bidder report from page 1.", next: "b", score: 5, feedback: "Thorough but slow for a 13:00 deadline." },
            { text: "Average the two P50s and report that.", next: "c", score: 1, feedback: "Averaging hides the cause; the Director needs to know who is right and why." },
          ],
        },
        b: {
          md: md`The gap: resource +1.2 % (bidder used an un-adapted satellite file), soiling +1.5 % (bidder 1.5 % flat vs LTA 3 % seasonal), bifacial +0.8 % (albedo 0.35 vs LTA 0.28 measured). What does your note to the Director say?`,
          choices: [
            { text: "The LTA's figures are better supported on all three items (site-adapted resource, seasonal soiling consistent with Shagaya experience, measured albedo). Recommend MEWRE plan on the LTA P50 for system planning and ask the IPP to align its soiling commitments with its yield assumption.", next: "d", score: 10, feedback: "Clear, evidence-based, actionable — and it links the yield assumption to a contractual obligation." },
            { text: "Both are within uncertainty; no action needed.", next: "d", score: 4, feedback: "3.5 % on 1.1 GW is ≈ 80 GWh/yr — material for planning, and the causes are identifiable." },
          ],
        },
        c: {
          md: md`The Director asks: "Why is the bank's number lower, and which one should we plan on?" You cannot answer. What now?`,
          choices: [
            { text: "Ask for an hour to compare the loss trees properly.", next: "b", score: 5, feedback: "Recovering — the right method, applied late." },
          ],
        },
        d: {
          md: md`The IPP replies that its O&M plan will use robots nightly, so 1.5 % soiling is justified. What is your response?`,
          choices: [
            { text: "Accept the argument only if the robotic cleaning regime, fleet availability and a soiling-ratio threshold are written into the O&M obligations reported to MEWRE.", score: 10, feedback: "Turns a modelling assumption into a monitored commitment." },
            { text: "Reject it — the LTA's number is final.", score: 4, feedback: "Nightly robotic cleaning can genuinely achieve ≈ 1–2 %; the issue is enforceability." },
          ],
        },
      },
    },
  ],
};

export default lesson;
