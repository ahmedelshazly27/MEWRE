import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m10-l02",
  title: "Levelized Cost of Electricity (LCOE) and Why Gulf Solar Tariffs Are So Low",
  summary:
    "Derive LCOE from NPV(costs) = NPV(energy × LCOE), reduce it to the capital-recovery-factor form, add degradation, run sensitivities to WACC, capex and yield — and decompose why Gulf solar tariffs reached roughly 1.0–2.0 US cents/kWh.",
  minutes: 70,
  objectives: [
    "Derive LCOE from first principles and explain why energy is 'discounted'",
    "Derive the capital recovery factor and use the CRF shortcut, knowing when it under-states LCOE",
    "Compute an exact LCOE for a 1,100 MW PV plant with degradation and escalating opex",
    "Rank the drivers of PV LCOE (yield, capex, WACC, opex, degradation) with a tornado analysis",
    "Explain the ingredients of record-low Gulf tariffs and what is (and is not) known about Kuwait's Zone 1 tariff",
  ],
  concepts: [
    { id: "m10.lcoe", name: "Levelized cost of electricity", description: "Constant price per kWh whose present value of revenue equals the present value of lifetime costs at the discount rate.", competency: "finance", related: ["m10.npv", "m10.wacc", "m03.lcoe-comparison", "m02.p50-p90"] },
    { id: "m10.crf", name: "Capital recovery factor", description: "Factor converting a present value into an equal annual payment over n years at rate r.", competency: "finance", related: ["m10.lcoe", "m10.time-value"] },
    { id: "m10.lcoe-sensitivity", name: "LCOE sensitivity and tornado analysis", description: "How LCOE responds to yield, capex, WACC, opex and degradation; one-at-a-time swings ranked in a tornado chart.", competency: "finance", related: ["m10.lcoe"] },
    { id: "m10.gulf-tariffs", name: "Gulf solar tariff drivers", description: "Resource, low capex, cheap long-tenor high-gearing debt, long PPAs, low taxes, competitive auctions and risk allocation that produce 1–2 US cents/kWh tariffs.", competency: "finance", related: ["m10.lcoe", "m10.wacc", "m15.tariff-structure"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Deriving LCOE and the capital recovery factor",
      blocks: [
        {
          kind: "md",
          md: md`### The definition that everything else follows from

LCOE is the **break-even constant price**: the single price per kWh, held flat over the life, at which an investor earning exactly the discount rate $r$ would be indifferent to building the plant. "Indifferent" means NPV = 0:

$$\sum_{t=1}^{N}\frac{\mathrm{LCOE}\cdot E_t}{(1+r)^t} \;-\; \sum_{t=0}^{N}\frac{I_t+O_t}{(1+r)^t} \;=\; 0.$$

Because LCOE is a constant it comes out of the first sum:

$$\mathrm{LCOE}\cdot\sum_{t=1}^{N}\frac{E_t}{(1+r)^t} = \sum_{t=0}^{N}\frac{I_t+O_t}{(1+r)^t}.$$

Divide and you have the standard formula:`,
        },
        { kind: "equation", formula: "m10-lcoe" },
        {
          kind: "callout",
          tone: "why",
          title: "Why do we 'discount energy'?",
          md: md`Engineers often object: "a kWh in year 20 is the same kWh". Physically yes — but the formula is not claiming energy earns interest. It falls out of the algebra above: revenue (price × energy) is money and must be discounted; since the price is constant, the discounting attaches to the energy term. The denominator is best read as **"discounted energy"** — the energy-weighted present-value base over which costs are spread. Undiscounted energy in the denominator would understate LCOE by roughly half for a 30-year asset at 6 %.`,
        },
        {
          kind: "md",
          md: md`### The capital recovery factor

Suppose energy $E$ and opex $O$ were constant every year. The present value of a level annual amount $A$ over $n$ years is a geometric series:

$$PV = A\sum_{t=1}^{n}(1+r)^{-t} = A\,\frac{1-(1+r)^{-n}}{r}.$$

Invert it to find the level annual payment that repays a present value $PV$ with return $r$:`,
        },
        { kind: "equation", formula: "m10-crf" },
        {
          kind: "md",
          md: md`Apply it to the LCOE equation with constant $E$ and $O$: the denominator becomes $E/\mathrm{CRF}$ and the opex term $O/\mathrm{CRF}$; multiply through by CRF:`,
        },
        { kind: "equation", formula: "m10-lcoe-crf" },
        {
          kind: "md",
          md: md`This is the **annualised capital charge plus annual opex, divided by annual energy** — the form behind NREL's simple LCOE calculator. At 6.2 % over 30 years CRF = 0.07421 (the annuity factor is its reciprocal, 13.475): each USD 1 of capex costs 7.4 US cents per year for 30 years.

### Adding degradation and escalation

Real plants lose output and their O&M contracts escalate:`,
        },
        { kind: "equation", formula: "m10-energy-degradation" },
        {
          kind: "md",
          md: md`With degradation $d$ and opex escalation $g$, the sums are still geometric: $\sum E_1(1-d)^{t-1}(1+r)^{-t}$ is an annuity at an effective rate $r' = (1+r)/(1-d) - 1$. In practice you build an annual table (or a spreadsheet) and the CRF form is used with **levelized** values: levelized energy $= \mathrm{CRF}\times\sum E_t(1+r)^{-t}$, levelized opex likewise. Using year-1 energy and year-1 opex in the CRF shortcut **understates** LCOE — by about 7 % in the base case below.

### Sensitivity — the first-order structure

Write LCOE ≈ $(I_0\cdot\mathrm{CRF} + O)/E$ and differentiate:
- LCOE is **inversely proportional to yield**: +10 % yield → −9.1 % LCOE; −10 % yield → +11.1 %.
- LCOE is **linear in capex** with slope CRF/E; for PV capex is ~80 % of PV(costs), so +10 % capex ≈ +8 % LCOE.
- LCOE rises with **WACC** through CRF: $\partial \mathrm{CRF}/\partial r$ is large for long lives — at 30 years, CRF goes from 0.0651 (5 %) to 0.0888 (8 %), +37 %.
- Opex and degradation are second-order for PV (small cost share; late-life effects heavily discounted).

### What LCOE is not

LCOE is a cost metric, not a value metric. It ignores *when* energy is delivered (a noon kWh vs an evening-peak kWh), grid-connection and system costs (balancing, curtailment, BESS), and the developer's margin and risk premia that turn a cost into a **tariff**. For PV in Kuwait the timing is favourable — the summer peak is in the hot afternoon — but the evening peak is not served without storage. That is why MEWRE is pairing PV with a planned 1–1.5 GW BESS programme (Lesson 3, Module 5).`,
        },
      ],
    },
    {
      layer: "applied",
      title: "LCOE of the 1,100 MW base case — exact, shortcut and sensitivities",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Exact LCOE for a 1,100 MWac / 1,430 MWp tracker plant",
          given: md`Illustrative base case (used throughout Module 10 — not the Zone 1 bid): 1,100 MWac, 1,430 MWp single-axis bifacial; year-1 P50 specific yield 2,100 kWh/kWp; degradation 0.4 %/yr; capex USD 560 m at COD incl. development, 400 kV substation and IDC (USD 0.392/Wp, USD 509/kWac); opex USD 7.5 m in year 1 escalating 2 %/yr; 30-year life; WACC 6.2 % nominal.`,
          steps: [
            { md: md`**Year-1 energy:** $1{,}430{,}000\text{ kWp}\times 2{,}100 = 3{,}003$ GWh. AC capacity factor $= 3{,}003/(1{,}100\times 8.76) = 31.2\%$.` },
            {
              md: md`**Annual table (selected years, USD m and GWh):**

| Year | Energy | Opex | Capex | DF @ 6.2 % | PV energy | PV cost |
|---|---|---|---|---|---|---|
| 0 | — | — | 560.00 | 1.0000 | — | 560.00 |
| 1 | 3,003.0 | 7.50 | — | 0.9416 | 2,827.7 | 7.06 |
| 2 | 2,991.0 | 7.65 | — | 0.8866 | 2,652.0 | 6.78 |
| 3 | 2,979.0 | 7.80 | — | 0.8349 | 2,487.1 | 6.51 |
| 5 | 2,955.2 | 8.12 | — | 0.7402 | 2,187.6 | 6.01 |
| 10 | 2,896.6 | 8.96 | — | 0.5480 | 1,587.2 | 4.91 |
| 15 | 2,839.1 | 9.90 | — | 0.4056 | 1,151.6 | 4.01 |
| 20 | 2,782.8 | 10.93 | — | 0.3003 | 835.6 | 3.28 |
| 25 | 2,727.6 | 12.06 | — | 0.2223 | 606.3 | 2.68 |
| 30 | 2,673.5 | 13.32 | — | 0.1645 | 439.9 | 2.19 |
| **Σ (all 30 years)** | 85,054.7 | 304.26 | 560.00 | | **38,861.7** | **685.35** |`,
            },
            { md: md`**LCOE** $= 685.35\text{ USD m}/38{,}861.7\text{ GWh} = 0.017636$ USD/kWh $=$ **1.764 US cents/kWh** = USD 17.64/MWh. At 1 KWD = 3.25 USD: $0.017636/3.25\times 1000 =$ **5.43 fils/kWh**.` },
            { md: md`**Cost structure:** capex is 560/685.35 = **82 %** of lifetime PV cost; opex only 18 %. PV is a financing product with a small running cost attached.` },
            { md: md`**Check against the PPA:** in Lesson 4 the same plant bid at a flat 1.80 cents gives a project IRR of 6.45 %. LCOE at 6.45 % is exactly 1.800 cents — by definition, LCOE at the project IRR equals a flat tariff.` },
          ],
          result: md`LCOE = 1.764 US cents/kWh (17.64 USD/MWh, ≈ 5.4 fils/kWh) at 6.2 % nominal WACC. Download the model and reproduce it; change WACC to 6.45 % to see the 1.800 cents tie-out.`,
        },
        {
          kind: "download",
          file: "/downloads/lcoe-model.xlsx",
          title: "LCOE model (Excel)",
          description: "Inputs → annual Calc (years 0–40) → Results (USD/MWh, US cents/kWh, fils/kWh) → Sensitivity (LCOE vs WACC, tornado). All live formulas.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Reproduce the exact LCOE with the CRF form",
          given: md`From the table: PV(costs) = USD 685.35 m, of which capex 560.00 m; PV(energy) = 38,861.7 GWh. WACC 6.2 %, 30 years.`,
          steps: [
            { md: md`CRF(6.2 %, 30) $= 0.062\times 1.062^{30}/(1.062^{30}-1) = 0.07421$.` },
            { md: md`Annualised capital charge $= 560\times 0.07421$.` },
            { md: md`= **USD 41.56 m/yr**.`, hidden: true, check: { prompt: "Annual capital charge (USD m/yr)", answer: 41.56, unit: "USD m/yr", tolerance: { abs: 0.05 } } },
            { md: md`Levelized opex $= (685.35-560)\times 0.07421 = 9.30$ USD m/yr; levelized energy $= 38{,}861.7\times 0.07421 = 2{,}883.9$ GWh/yr (vs 3,003 in year 1).` },
            { md: md`LCOE $= (41.56 + 9.30)/2{,}883.9\times 100$ = **1.764 US cents/kWh** — identical to the exact method.`, hidden: true, check: { prompt: "LCOE (US cents/kWh)", answer: 1.764, unit: "US cents/kWh", tolerance: { abs: 0.003 } } },
            { md: md`The naive shortcut with year-1 values: $(41.56 + 7.5)/3{,}003\times 100 = 1.634$ cents — **7.4 % too low**, because it ignores degradation and opex escalation.` },
          ],
          result: md`The CRF form is exact when you use levelized energy and opex. Treat any "quick LCOE" built on year-1 numbers as a lower bound.`,
        },
        {
          kind: "md",
          md: md`### Sensitivities (from the downloadable model)

**LCOE vs WACC** (all else base):

| WACC | 4 % | 5 % | 5.5 % | 6 % | 6.2 % | 6.5 % | 7 % | 8 % | 9 % | 10 % |
|---|---|---|---|---|---|---|---|---|---|---|
| LCOE (US cents/kWh) | 1.463 | 1.595 | 1.664 | 1.735 | 1.764 | 1.807 | 1.881 | 2.032 | 2.189 | 2.350 |

Each percentage point of WACC is worth about **0.14–0.16 cents (8–9 %)**. Over 30 years of ~2,800 GWh/yr, 0.15 cents is roughly USD 4.2 m a year of PPA payments.

**Tornado** (one variable at a time):

| Variable | Low → High case | LCOE low | LCOE high | Swing |
|---|---|---|---|---|
| Specific yield | +10 % / −10 % | 1.603 | 1.960 | **0.356** |
| Capex | −10 % / +10 % | 1.619 | 1.908 | 0.288 |
| WACC | 5.2 % / 7.2 % | 1.623 | 1.911 | 0.288 |
| Opex | −20 % / +20 % | 1.699 | 1.828 | 0.129 |
| Degradation | 0.25 % / 0.70 %/yr | 1.737 | 1.817 | 0.080 |

**Reading it:** yield, capex and WACC dominate and are of similar size; opex and degradation are second-order. For MEWRE, *yield* is the variable it influences most directly — through the quality of the resource assessment (KISR ground stations, site-adapted satellite data), soiling and cleaning requirements in the PPA, curtailment rules and grid availability. A fixed-tilt alternative (1,850 kWh/kWp, USD 520 m) gives 1.885 cents: trackers win in Kuwait despite their higher capex.`,
        },
        { kind: "widget", widget: "lcoe", props: { capexPerKw: 509 }, caption: "Move capex, capacity factor, WACC and degradation; note how WACC and yield dominate PV LCOE." },
        {
          kind: "question",
          question: {
            id: "m10-l02-p1",
            type: "numeric",
            prompt: md`A bidder believes it can cut capex by 10 % (to USD 504 m) but its lenders price the debt higher, so the project WACC rises to 7.0 %. Everything else is base case. What is the LCOE? (US cents/kWh, 3 decimals)`,
            answer: 1.725,
            tolerance: { abs: 0.004 },
            unit: "US cents/kWh",
            explanation: md`At 7 %: PV(opex) = USD 114.31 m and PV(energy) = 35,854.0 GWh (30 years, 0.4 %/yr degradation, opex +2 %/yr). LCOE $= (504 + 114.31)/35{,}854.0 = 0.017245$ USD/kWh ≈ **1.725 cents**. Against the base 1.764: the 10 % capex saving alone would give 1.619, but +0.8 points of WACC adds back about 0.11 cents (base capex at 7 % would be 1.881). Financing terms are worth as much as procurement savings.`,
            concepts: ["m10.lcoe", "m10.lcoe-sensitivity"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Gulf tariff records, Kuwait's position and how to use LCOE in a ministry",
      blocks: [
        {
          kind: "md",
          md: md`### Why Gulf solar tariffs fell to about 1.0–2.0 US cents/kWh

Reported winning tariffs for large Gulf PV IPPs (verify each against the procurer's or developer's own release before quoting):

| Project | Country | Size | Reported tariff (US cents/kWh) | Year |
|---|---|---|---|---|
| MBR Solar Park Phase 5 | UAE (Dubai) | 900 MW | ≈ 1.69 | 2019 |
| Al Dhafra | UAE (Abu Dhabi) | 2 GW | ≈ 1.35 | 2020 |
| Sudair | Saudi Arabia | 1.5 GW | ≈ 1.24 | 2021 |
| Al Shuaibah | Saudi Arabia | 600 MW | ≈ 1.04 | 2021 |

IRENA's cost reports put the **global** weighted-average utility PV LCOE at around 4–5 US cents/kWh in 2023 — so Gulf tariffs are roughly a third of the world average. The decomposition, using the LCOE drivers above:

1. **Resource:** 2,100–2,400 kWh/kWp with bifacial trackers in clear desert air (vs ~1,300–1,600 in much of Europe/US). Yield is the denominator.
2. **Capex:** gigawatt scale, Chinese-supplied modules and trackers, flat land, low-cost EPC labour; all-in capex in the region of USD 0.30–0.45/Wp versus ~USD 1/Wp in US benchmarks (NREL).
3. **Cost of capital:** sovereign or state-utility offtakers, USD-denominated or USD-pegged PPAs, 25–35-year PPAs with long-tenor debt (often 20–27 years, mini-perm structures), 75–85 % gearing at low margins, and sponsors (often state-linked or strategic) accepting equity returns in the high single digits.
4. **Taxes and land:** low or no corporate tax; land often provided by the state at nominal cost; the procurer frequently builds or funds the grid connection.
5. **Risk allocation:** the offtaker carries curtailment (deemed energy), grid-delay, change-in-law and often FX convertibility risk — risks that would otherwise be priced into the tariff.
6. **Auction design:** large, repeated, transparent competitions with pre-qualified bidders and standardized PPAs.
7. **Aggressive assumptions:** some record bids assume falling module prices between bid and procurement, refinancing gains, residual value after the PPA or very low O&M — the risk lesson of Lesson 5.

Run the base model with Saudi-like inputs (2,350 kWh/kWp, capex USD 0.30/Wp → USD 429 m, opex USD 6.5 m, WACC 5 %) and LCOE falls to about **1.12 cents** — the record tariffs are explainable by fundamentals plus tight financing, not magic.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait Shagaya Zone 1 tariff — not public",
          md: md`The 1,100 MW Shagaya Phase III Zone 1 IPP (30-year PPA with MEWRE) has a reported preferred bidder (Masdar + Fouad AlGhanim & Sons, per MEED ~August 2026), but **no tariff has been published** and no official KAPP/MEWRE announcement was found in the course research (docs/RESEARCH.md, open question 3). The 1.80 cents used in this module is an **illustrative** number consistent with the cost model, not the bid. Do not quote any Zone 1 tariff until KAPP or MEWRE publishes it.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Kuwait cost-of-supply context",
          md: md`Kuwaiti citizens pay **2 fils/kWh** (≈ 0.7 US cents), unchanged since 1966 (Baker Institute). KPC is reported to pay about **25 fils/kWh** (≈ 8.1 US cents) for grid power, with analysts estimating solar at **7–8 fils/kWh** (≈ 2.3–2.6 cents) (SolarQuarter, January 2026). Published estimates of the cost of supply conflict (14–26 fils in one paper, ~38 fils in an older estimate) and no current official figure was found. Our illustrative 1.76–1.80 cents is ≈ 5.4–5.5 fils/kWh: any PV tariff in this range is far below the marginal cost of liquid-fuel generation that it displaces in summer.`,
        },
        { kind: "sources", refs: ["m10-irena-costs-2023", "m10-irena-gcc-2023", "m10-ewec", "m10-acwa", "m10-dewa", "m10-nrel-cost-benchmarks", "m10-pvmag-zone1-2025", "m10-meed-zone1-selection", "m10-solarquarter-kpc-2026", "m10-baker-tariff"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How LCOE comparisons go wrong",
          md: md`- **Real vs nominal:** IRENA LCOEs are real (constant-USD, real WACC); a PPA tariff is nominal. A flat nominal tariff of 1.80 cents corresponds to a lower real levelized value.
- **DC vs AC capex and capacity factor:** USD/Wp vs USD/kWac differ by the DC/AC ratio (1.3 here).
- **Scope:** does the capex include the 400 kV substation, transmission line, development costs, IDC, DSRA, owner's costs? Zone 1's RFP includes a 400 kV substation in the IPP's scope, while the Shagaya–Al-Wafra line is a separate MEWRE contract (KD 48.6 m).
- **P50 vs P90 energy:** lenders size on P90/P99; LCOE is normally quoted on P50.
- **Comparing PV LCOE with a gas plant's fuel cost alone** ignores that PV does not provide firm evening capacity.`,
        },
        {
          kind: "checklist",
          title: "PM checks on any LCOE number",
          items: [
            "Basis stated: real or nominal, WACC value and how derived, currency and FX rate",
            "Energy basis: P50 net of availability, soiling, curtailment and degradation; DC or AC capacity factor",
            "Capex scope reconciled: EPC, grid connection, development/owner's costs, IDC, contingency",
            "Life used equals PPA term (or justified otherwise); residual value or decommissioning treated explicitly",
            "Sensitivity provided for yield, capex and WACC at least",
            "Shortcut (CRF on year-1 values) not used for decisions",
          ],
        },
        {
          kind: "ask",
          title: "Questions to put to a transaction advisor or bidder",
          items: [
            "What specific yield and soiling loss underpin your P50, and which ground-measured irradiance data validated the satellite series?",
            "What WACC and gearing are embedded in your LCOE, and what debt tenor and margin did lenders indicate?",
            "Which costs sit outside your capex (grid line, land, water for cleaning, security)?",
            "What would LCOE be at P90 energy and with 2 points higher WACC?",
          ],
        },
        { kind: "scenario", scenario: "m10-s2" },
        {
          kind: "feynman",
          prompt: "Explain to a member of the Higher Committee why Saudi Arabia achieved about 1.04 US cents/kWh and why Kuwait should not simply demand the same number.",
          keyPoints: [
            "LCOE = annualised capital charge plus opex divided by energy; capex and financing dominate",
            "Yield (resource and trackers), capex, and WACC are the three biggest levers",
            "Record tariffs combine excellent resource, very low capex, cheap long-tenor high-gearing debt and favourable risk allocation by the offtaker",
            "Kuwait's tariff depends on its own yield, grid scope, PPA risk allocation and market conditions at bid time",
            "A tariff below fundamentals transfers risk back to the offtaker (Lesson 5)",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m10-l02-q1",
      type: "numeric",
      prompt: md`Compute CRF for r = 8 %, n = 25 years (4 decimals).`,
      answer: 0.0937,
      tolerance: { abs: 0.0003 },
      explanation: md`$\mathrm{CRF} = 0.08\times 1.08^{25}/(1.08^{25}-1) = 0.08\times 6.8485/5.8485 = 0.0937$. Each USD 1 of capex must be recovered as 9.37 cents per year for 25 years.`,
      concepts: ["m10.crf"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m10-l02-q2",
      type: "numeric",
      prompt: md`Simple LCOE: capex USD 500 m, CRF 0.075, constant opex USD 8 m/yr, constant energy 2,800 GWh/yr. Answer in US cents/kWh (3 decimals).`,
      answer: 1.625,
      tolerance: { abs: 0.002 },
      unit: "US cents/kWh",
      explanation: md`$(500\times 0.075 + 8)/2{,}800 = 45.5/2{,}800 = 0.01625$ USD/kWh = 1.625 cents. (USD m ÷ GWh = USD/kWh.)`,
      concepts: ["m10.lcoe", "m10.crf"],
      difficulty: 1,
    },
    {
      id: "m10-l02-q3",
      type: "mcq",
      prompt: "Why does the LCOE formula discount the energy in the denominator?",
      options: [
        "Because energy produced later is physically less useful",
        "Because LCOE is a constant price; discounting the revenue (price × energy) leaves discounted energy once the price is factored out",
        "To account for module degradation",
        "It is a convention with no mathematical basis",
      ],
      answer: 1,
      explanation: md`From NPV(revenue) = NPV(costs) with constant price, the discount factors attach to the energy term. Degradation is a separate effect handled in $E_t$.`,
      concepts: ["m10.lcoe"],
      difficulty: 1,
    },
    {
      id: "m10-l02-q4",
      type: "order",
      prompt: "Order these drivers by the size of their LCOE swing in the base-case tornado (largest first).",
      items: ["Specific yield ±10 %", "Capex ±10 % (≈ WACC ±1 point)", "Opex ±20 %", "Degradation 0.25–0.70 %/yr"],
      explanation: md`Swings: yield 0.356, capex 0.288 (WACC ±1 point 0.288, equal to within rounding), opex 0.129, degradation 0.080 cents. Front-loaded, capital-intensive cash flows make yield, capex and financing dominant.`,
      concepts: ["m10.lcoe-sensitivity"],
      difficulty: 2,
    },
    {
      id: "m10-l02-q5",
      type: "multi",
      prompt: "Which factors helped Gulf PV tariffs reach about 1.0–1.7 US cents/kWh? (Select all that apply.)",
      options: [
        "High specific yield with bifacial trackers",
        "Long PPAs and long-tenor, high-gearing debt with creditworthy state offtakers",
        "Offtaker bearing curtailment, grid-delay and change-in-law risks",
        "High corporate tax rates that create large tax shields",
        "Very low capex from scale and global supply chains",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Low or no corporate tax is typical in the Gulf; tax shields are not the driver. The others are the core of the decomposition: resource, capex, cost of capital and risk allocation.`,
      concepts: ["m10.gulf-tariffs"],
      difficulty: 1,
    },
    {
      id: "m10-l02-q6",
      type: "decision",
      prompt: md`A consultant's briefing note to MEWRE leadership states "the Zone 1 tariff is 1.3 US cents/kWh" citing an industry newsletter. You are the PM. What do you do?`,
      options: [
        { text: "Let it go — the number is plausible against regional records.", score: 0, feedback: "Plausibility is not a source. A wrong tariff in a ministerial note can move negotiations and expectations." },
        { text: "Remove the figure unless it is confirmed by KAPP/MEWRE; replace it with the regional range and an explicit 'tariff not published' statement.", score: 1, feedback: "Correct: Kuwait-specific facts must be traceable to a primary source; flag unknowns explicitly." },
        { text: "Replace it with your own model's 1.80 cents.", score: 0.2, feedback: "An illustrative model output is not the bid; presenting it as the tariff is equally misleading." },
      ],
      explanation: md`The research brief records that no Zone 1 tariff has been reported. Ministry documents must distinguish published facts, estimates and unknowns.`,
      concepts: ["m10.gulf-tariffs"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "m10-l02-f1", front: "LCOE definition (words)", back: "The constant price per kWh at which NPV(revenue) = NPV(lifetime costs) at the discount rate.", concepts: ["m10.lcoe"] },
    { id: "m10-l02-f2", front: "CRF formula", back: md`$\mathrm{CRF} = r(1+r)^n/((1+r)^n-1)$`, concepts: ["m10.crf"] },
    { id: "m10-l02-f3", front: "CRF at 6.2 % over 30 years", back: "0.07421 (annuity factor 13.475)", concepts: ["m10.crf"] },
    { id: "m10-l02-f4", front: "Base-case PV LCOE", back: "1.764 US cents/kWh at 6.2 % WACC (≈ 5.4 fils/kWh); 1.800 at the 6.45 % project IRR", concepts: ["m10.lcoe"] },
    { id: "m10-l02-f5", front: "Why the CRF shortcut understates LCOE", back: "Using year-1 energy and opex ignores degradation and escalation; use levelized values instead (base case: 1.634 vs 1.764).", concepts: ["m10.crf"] },
    { id: "m10-l02-f6", front: "Rule of thumb: LCOE vs WACC for PV", back: "≈ +8–9 % LCOE per +1 point WACC (30-year life).", concepts: ["m10.lcoe-sensitivity"] },
    { id: "m10-l02-f7", front: "Largest three PV LCOE drivers", back: "Specific yield, capex, WACC (opex and degradation second-order).", concepts: ["m10.lcoe-sensitivity"] },
    { id: "m10-l02-f8", front: "Kuwait Zone 1 tariff status (as of course research)", back: "Not published — preferred bidder reported (Masdar + Fouad AlGhanim), tariff unknown.", concepts: ["m10.gulf-tariffs"] },
  ],
  scenarios: [
    {
      id: "m10-s2",
      title: "'Saudi got 1.04 cents — why can't we?'",
      dayInLife: true,
      context: md`At a preparatory meeting before the Higher Committee, a senior official holds up a press clipping on Saudi Arabia's Al Shuaibah (≈ 1.04 US cents/kWh) and asks you why Kuwait's solar IPP evaluation team is "comfortable with something near 2 cents". You have the base-case model on your laptop.`,
      start: "a",
      concepts: ["m10.gulf-tariffs", "m10.lcoe-sensitivity", "m10.lcoe"],
      nodes: {
        a: {
          md: md`How do you open your answer?`,
          choices: [
            { text: "\"Kuwait's market is just more expensive.\"", score: 2, feedback: "True in part, but unexplained assertions do not survive a Higher Committee.", next: "b" },
            { text: "\"Three levers set a solar tariff — sunshine per panel, construction cost and the cost of money. Let me show how each differs and what we can control.\"", score: 9, feedback: "Frames the answer around the LCOE structure and moves to what MEWRE can influence.", next: "b" },
            { text: "Promise to bring the number down to 1.04 at the next round.", score: 0, feedback: "A commitment you cannot keep, and one that invites aggressive, risky bids.", next: "c" },
          ],
        },
        b: {
          md: md`The official asks: "Then what can *we* change to get closer?"`,
          choices: [
            { text: "List levers the offtaker controls: bankable PPA terms (termination payments, currency, change-in-law), early and certain grid connection, reliable resource data, standardized documents and repeat auctions, land and permits ready before RFP.", score: 10, feedback: "These reduce risk premia and WACC — the biggest lever MEWRE actually holds.", next: "d" },
            { text: "Lower the maximum allowable tariff in the RFP to 1.1 cents.", score: 3, feedback: "A ceiling below fundamentals produces no bids or aggressive bids that fail later.", next: "c" },
          ],
        },
        c: {
          md: md`Six months later, a bid at 1.10 cents is selected; the bidder's lenders demand a sovereign guarantee and deemed-energy protection that were not in the RFP, and financial close slips.`,
          choices: [
            { text: "Re-open negotiations transparently, quantify the value of the extra protections as a tariff-equivalent, and report to the Higher Committee.", score: 5, feedback: "Damage limitation; the risk of an unsustainably low tariff came back to the offtaker." },
          ],
        },
        d: {
          md: md`You show the model: Kuwait base 1.76 cents at 6.2 % WACC; with Saudi-like yield, capex and 5 % WACC, 1.12 cents. The official asks you to put this in a one-page note.`,
          choices: [
            { text: "Write the note with the decomposition table, state that the Zone 1 tariff is not yet published, mark all model numbers as illustrative, and list the three offtaker actions with owners and dates.", score: 10, feedback: "Clear, sourced, honest about unknowns, and action-oriented." },
            { text: "Write the note with your model's 1.80 as 'expected Zone 1 tariff'.", score: 2, feedback: "Presents an illustration as a fact — exactly what the unverified rule forbids." },
          ],
        },
      },
    },
  ],
};

export default lesson;
