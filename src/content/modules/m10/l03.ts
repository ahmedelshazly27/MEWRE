import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m10-l03",
  title: "CAPEX and OPEX: Benchmarks for Utility PV, Trackers and BESS",
  summary:
    "Break a utility PV IPP's capex into hardware, balance of system, grid, EPC indirects, development, financing and contingency; benchmark it against IRENA, NREL, Lazard and BNEF with dates; build the opex line by line, including the economics of cleaning in the desert.",
  minutes: 65,
  objectives: [
    "Break down utility PV and BESS capex into standard cost categories and convert between USD/Wp, USD/kWac and USD/kWh bases",
    "Use IRENA, NREL, Lazard and BNEF benchmarks correctly — knowing their dates, scopes and regional bias",
    "Identify owner's, development, grid-connection, financing and contingency costs that sit outside the EPC price",
    "Build an annual opex budget for a desert PV plant and optimise the cleaning interval",
    "Set contingency by estimate class and risk register rather than by habit",
  ],
  concepts: [
    { id: "m10.capex-breakdown", name: "Capex breakdown", description: "Decomposition of project cost into modules, trackers, inverters, BoS, civil, grid, EPC indirects, development, financing and contingency.", competency: "finance", related: ["m10.lcoe", "m05.bess-sizing"] },
    { id: "m10.opex-breakdown", name: "Opex breakdown", description: "Annual operating cost lines: O&M contract, cleaning, insurance, land and security, SPV administration, spares and reserves.", competency: "finance", related: ["m10.lcoe"] },
    { id: "m10.cost-benchmarks", name: "Cost benchmarks and their limits", description: "Published cost references (IRENA, NREL, Lazard, BNEF) — their scope, date, region and currency basis.", competency: "finance", related: ["m10.capex-breakdown"] },
    { id: "m10.cleaning-economics", name: "Cleaning economics in desert PV", description: "Trade-off between soiling energy loss and cleaning cost; optimal cleaning interval and the case for robotic dry cleaning.", competency: "finance", related: ["m10.opex-breakdown", "m12.cleaning-economics", "m02.soiling"] },
    { id: "m10.estimate-contingency", name: "Estimate classes and contingency", description: "Accuracy ranges by estimate maturity and risk-based (EMV/P80) contingency instead of fixed percentages.", competency: "finance", related: ["m10.capex-breakdown", "m08.contingency"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Cost structure: what is in a 'USD per watt' number",
      blocks: [
        {
          kind: "md",
          md: md`Lesson 2 showed that capex is ~80 % of a PV plant's lifetime present-value cost. A 10 % capex error is an 8 % tariff error. So the PM must know what sits inside the headline number and on which basis it is quoted.

### Bases and conversions

- **USD/Wp (DC):** how modules and most EPC quotes are priced.
- **USD/kWac:** how IRENA and many utilities report (grid-side capacity).
- **USD/kWh (BESS):** energy-related cost; BESS also has a power-related cost (USD/kW) for PCS and grid equipment.`,
        },
        { kind: "equation", formula: "m10-specific-capex" },
        {
          kind: "md",
          md: md`With a DC/AC ratio of 1.30, USD 0.392/Wp = USD 509/kWac. Comparing a DC number with an AC benchmark is the single most common error in cost reviews — it alone creates a 20–35 % "discrepancy".

### Cost categories for a utility PV IPP

| Layer | Items | Who carries it |
|---|---|---|
| **Hardware** | Modules, trackers or fixed structures, inverters, MV transformers/skids | EPC (prices often indexed to module/steel markets until order) |
| **Balance of system (BoS)** | DC cabling, combiner boxes, AC/MV collection (33 kV), earthing, SCADA, weather stations, security systems | EPC |
| **Civil and installation** | Survey, grading, piling (sand, sabkha, caliche), roads, drainage, fencing, sand-encroachment protection, labour | EPC |
| **Grid connection** | Plant HV substation (in Kuwait Zone 1 RFP scope: 400 kV substation), protection, metering; transmission line to the grid | IPP for the plant substation; MEWRE for the line (Shagaya–Al-Wafra 400 kV, KD 48.6 m, separate public tender) |
| **EPC indirects** | Design, project management, site facilities, construction all-risk insurance, bonds, EPC margin and risk premium | EPC |
| **Development** | Bid costs, advisors (technical, legal, financial, insurance, model audit), permits, EIA, land, owner's engineer, success fees | Sponsor (recovered in capex) |
| **Financing** | Upfront/commitment fees, interest during construction (IDC), hedging costs, initial DSRA funding | SPV |
| **Contingency** | Owner's contingency for scope gaps, risks not passed to EPC | SPV/Employer |

On a **MEWRE-owned** asset (a substation, a pilot plant) the same logic applies, but "development" becomes the ministry's **owner's costs**: consultants and supervision, land preparation, utility diversions, permits, staff, and the Audit Bureau/CAPT process time.

### Trackers vs fixed tilt

Single-axis trackers add roughly USD 0.04–0.07/Wp and some O&M, but at Kuwait's latitude (~29° N) they raise specific yield by ~15–25 %, more with bifacial modules. Lesson 2's numbers: fixed tilt 1.885 cents vs tracker 1.764 cents — the yield gain outweighs the capex. Desert specifics: trackers need wind-stow strategies for shamal events, sand-sealed slew drives and robust controllers at 50 °C+.

### BESS cost structure

For a 4-hour lithium-iron-phosphate system: DC block (cells, modules, racks, BMS, containerised HVAC and fire suppression) is typically more than half the cost; then the power conversion system (PCS), MV/HV transformers and switchgear, EMS/SCADA, civil works and EPC indirects. Two features matter financially:
- **Augmentation:** usable capacity fades; to keep a contracted MWh you add modules in later years (a capex or reserve line in opex).
- **Desert HVAC:** cooling load at 50 °C ambient raises auxiliary consumption and therefore round-trip efficiency losses — a real opex.

### Estimate classes and contingency

Estimate accuracy depends on project definition. AACE International's classification (Recommended Practice 18R-97) is widely used:

| Class | Typical stage | Definition | Typical accuracy range |
|---|---|---|---|
| 5 | Concept screening | 0–2 % | −20/−50 % to +30/+100 % |
| 4 | Feasibility | 1–15 % | −15/−30 % to +20/+50 % |
| 3 | Budget authorisation | 10–40 % | −10/−20 % to +10/+30 % |
| 2 | Control / bid check | 30–75 % | −5/−15 % to +5/+20 % |
| 1 | Definitive / tender | 65–100 % | −3/−10 % to +3/+15 % |`,
        },
        { kind: "equation", formula: "m10-contingency-emv" },
        {
          kind: "callout",
          tone: "why",
          title: "Why contingency is not 'fat'",
          md: md`Contingency is the budget for **known risks with unknown outcome** inside the approved scope (quantities, ground conditions, interface changes). It is estimated from the risk register (EMV as a floor, P80 from a Monte Carlo cost-risk analysis as the usual public-sector budget). It is **not** for scope changes (those need new approval) and not for unknown-unknowns (management reserve). Defining it this way is what lets a PM defend it to the Audit Bureau — and draw it down transparently (Lesson 6).`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Building and benchmarking the 1,100 MW base case",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Capex breakdown of the USD 560 m base case",
          given: md`1,100 MWac / 1,430 MWp single-axis bifacial PV IPP with a 400 kV plant substation in scope. Illustrative unit costs typical of recent Gulf procurement (not Zone 1 data).`,
          steps: [
            {
              md: md`| Item | USD m | USD/Wp | USD/kWac | Share |
|---|---|---|---|---|
| PV modules (bifacial, delivered to site) | 157.3 | 0.110 | 143 | 28.1 % |
| Single-axis trackers | 93.0 | 0.065 | 85 | 16.6 % |
| Inverters + MV skids | 50.1 | 0.035 | 46 | 8.9 % |
| DC/AC electrical BoS incl. 33 kV collection | 57.2 | 0.040 | 52 | 10.2 % |
| Civil: piling, roads, drainage, fencing, sand protection | 42.9 | 0.030 | 39 | 7.7 % |
| Mechanical/electrical installation labour | 28.6 | 0.020 | 26 | 5.1 % |
| 400 kV substation (IPP scope) | 35.0 | 0.024 | 32 | 6.3 % |
| EPC indirects: design, site management, CAR insurance, margin | 45.9 | 0.032 | 42 | 8.2 % |
| **EPC subtotal** | **510.0** | **0.357** | **464** | **91.1 %** |
| Development and owner's costs | 15.0 | 0.010 | 14 | 2.7 % |
| Financing fees and IDC | 25.0 | 0.017 | 23 | 4.5 % |
| Owner's contingency | 10.0 | 0.007 | 9 | 1.8 % |
| **Total capex at COD** | **560.0** | **0.392** | **509** | **100 %** |`,
            },
            { md: md`**Conversion check:** USD 0.392/Wp × 1.30 DC/AC = USD 509/kWac ✓. Modules are only 28 % — trackers + BoS + civil + labour together are 40 %, which is where desert-specific design (piling in sand, sand protection, cable routing at high ambient) moves the number.` },
            { md: md`**Benchmark:** IRENA's 2023 global weighted-average utility PV installed cost was about USD 758/kW. Our USD 509/kWac is about 67 % of that — consistent with the Gulf's position at the bottom of IRENA's country ranges, with scale and low-cost supply chains. US bottom-up benchmarks (NREL) are around or above USD 1/Wdc: do not import US cost structures (labour, interconnection, permitting) into a Kuwait estimate.` },
            { md: md`**What is not in it:** the MEWRE-side 400 kV line (KD 48.6 m ≈ USD 158 m), MEWRE's own substation works at the grid end, KAPP's transaction-advisor costs, and land preparation if the state provides it. A fair comparison with another country's tariff must ask who pays for the grid.` },
          ],
          result: md`USD 560 m = USD 0.392/Wp = USD 509/kWac, of which EPC USD 510 m. The state-funded transmission line adds more than a quarter of the IPP's capex again (≈ 28 %) — it belongs in any whole-of-government cost comparison.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Budget estimate for a 500 MW / 2,000 MWh BESS (owner's view)",
          given: md`MEWRE plans a BESS phase of 500 MW × 4 h. Assume a turnkey energy-related price of USD 150/kWh (at the low end of global averages, reflecting Gulf/China supply — confirm by market sounding), owner's costs 5 % and a Class 4 contingency of 7 % on top of turnkey + owner's costs.`,
          steps: [
            { md: md`Energy capacity $= 500\text{ MW}\times 4\text{ h} = 2{,}000$ MWh $= 2{,}000{,}000$ kWh.` },
            { md: md`Turnkey cost $= 2{,}000{,}000\times 150$ = **USD 300 m**.`, hidden: true, check: { prompt: "Turnkey BESS cost (USD m)", answer: 300, unit: "USD m", tolerance: { abs: 0.5 } } },
            { md: md`Plus owner's costs 5 %: $300\times 1.05 = 315$ USD m.` },
            { md: md`Plus 7 % contingency: $315\times 1.07$ = **USD 337.1 m** (≈ KWD 103.7 m at 3.25).`, hidden: true, check: { prompt: "Budget estimate incl. contingency (USD m)", answer: 337.05, unit: "USD m", tolerance: { abs: 0.5 } } },
            { md: md`State the accuracy: a Class 4 estimate is −15/−30 % to +20/+50 %, so the honest statement is "USD 337 m, range roughly USD 240–500 m, to be refined after market sounding and grid studies".` },
          ],
          result: md`≈ USD 337 m (KWD 104 m) for 500 MW / 2,000 MWh, with a stated accuracy band. Add augmentation (or an augmentation reserve) to the lifecycle cost — it is not in the turnkey number.`,
        },
        {
          kind: "md",
          md: md`### Opex for the base case (year 1, USD 7.5 m)

| Line | USD m/yr | USD/kWac/yr | Share | Notes |
|---|---|---|---|---|
| O&M contract (preventive/corrective, staff, SCADA, vegetation n/a) | 3.0 | 2.73 | 40 % | Fixed fee + availability guarantee |
| Module cleaning (robotic dry cleaning O&M, water top-up) | 1.4 | 1.27 | 19 % | See optimisation below |
| Insurance (operational all-risks + business interruption) | 1.5 | 1.36 | 20 % | ≈ 0.27 % of capex; sandstorm and hail exposure |
| Land rights, security | 0.4 | 0.36 | 5 % | Depends on state land terms |
| SPV administration, audit, lenders' and LTA monitoring | 0.6 | 0.55 | 8 % | Includes public-company governance if listed |
| Spares and inverter-replacement reserve | 0.6 | 0.55 | 8 % | Inverter replacement ~year 12–15 |
| **Total** | **7.5** | **6.82** | 100 % | Escalates 2 %/yr in the model |

Benchmarks for utility PV opex sit broadly in the USD 5–15/kWac/yr range depending on region, labour cost and scope; Gulf mega-projects are at the low end. Watch for what is excluded: inverter replacement, transformer failures, cleaning water, insurance deductibles, and land rent.

### Cleaning economics — why desert plants clean so often

Let $s$ = soiling rate (fraction of output lost per day without cleaning), $N$ = days between cleanings, $C$ = cost per full-plant cleaning cycle, $E$ = annual energy, $p$ = energy value. With linear soiling the average loss over a cycle is $sN/2$, so the annual cost is $J(N) = \frac{365\,C}{N} + \frac{sN}{2}Ep$. Setting $dJ/dN = 0$:

$$N^{*} = \sqrt{\frac{730\,C}{s\,E\,p}}.$$

Kuwait field studies report heavy soiling (8.7–15.1 % losses with monthly cleaning depending on season; Shagaya's PV testbed needed monthly water cleaning). Take $s$ = 0.3 %/day, $E$ = 3,003 GWh, $p$ = 1.8 US cents/kWh and manual wet cleaning of ~2.38 million 600 W modules at USD 0.06 each per cycle → $C$ ≈ USD 143,000:
- Optimal interval:

$$N^{*} = \sqrt{\frac{730\times 143{,}000}{0.003\times 3{,}003\times 10^6\times 0.018}} = 25.4\ \text{days}$$

- Annual cost at $N^{*}$ ≈ USD 4.1 m (half cleaning, half lost revenue; average soiling loss 3.8 %). Monthly cleaning ≈ USD 4.2 m; weekly ≈ USD 8.0 m.

Compare **robotic dry cleaning every night**: average soiling loss ~0.15 % (≈ USD 0.08 m/yr), robot O&M ≈ USD 1.4 m/yr, robot capex (illustrative USD 20 m) annualised at CRF 0.0742 ≈ USD 1.5 m/yr → ≈ USD 3.0 m/yr — and almost no water, which matters in Kuwait. This is why large Gulf tracker plants specify robots and why the P50 soiling loss in a bid should be challenged against the cleaning strategy actually contracted.`,
        },
        { kind: "equation", formula: "m10-cleaning-interval" },
        { kind: "widget", widget: "soiling", caption: "Change soiling rate, cleaning cost and tariff to see how the optimal interval and annual loss move." },
        {
          kind: "question",
          question: {
            id: "m10-l03-p1",
            type: "numeric",
            prompt: md`During a shamal-heavy spring the soiling rate rises to 0.4 %/day and a manual cleaning cycle costs USD 120,000. With E = 3,003 GWh/yr and p = 1.8 US cents/kWh, what is the optimal cleaning interval? (days, 1 decimal)`,
            answer: 20.1,
            tolerance: { abs: 0.3 },
            unit: "days",
            explanation: md`$N^{*} = \sqrt{730\times 120{,}000/(0.004\times 3{,}003\times 10^{6}\times 0.018)} = \sqrt{87.6\times 10^{6}/216{,}216} = \sqrt{405.1} = 20.1$ days. Higher soiling shortens the interval with the square root: doubling $s$ cuts $N^{*}$ by about 29 %.`,
            concepts: ["m10.cleaning-economics"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Benchmarks in practice — dates, scope and the owner's side",
      blocks: [
        {
          kind: "md",
          md: md`### Using published benchmarks responsibly

| Source | What it gives | Date used here | Main caution |
|---|---|---|---|
| IRENA Renewable Power Generation Costs | Global and country installed cost (USD/kW), LCOE, O&M, WACC assumptions | 2023 data, published 2024 | Real terms; weighted averages hide spread; check the newest edition |
| NREL cost benchmarks / ATB | Bottom-up line items for US PV and BESS; transparent assumptions | 2023–2024 | US labour, interconnection and permitting costs much higher than Gulf |
| Lazard LCOE+ | Unsubsidised LCOE and LCOS ranges | June 2024 | US financing assumptions; ranges, not point values |
| BNEF storage cost survey | Turnkey BESS prices by region | December 2024 (≈ USD 165/kWh global average, 4 h) | Prices fell fast in 2023–2025; regional spread is large |
| Recent Gulf tariffs and EPC awards | Market-tested evidence | 2019–2026 | Tariffs embed financing and risk allocation, not just cost |

**Rule:** a benchmark is evidence for a range, not a number to put in a budget. Always record the date and currency basis, escalate to today, and adjust for scope (grid, land, taxes, duties — Zone 2's RFP reportedly allows a customs exemption of up to 10 % on imported equipment for 10 years, which changes landed cost).

### The owner's costs MEWRE must budget for an IPP programme

Even when the IPP finances the plant, MEWRE carries real costs: the transmission line and grid-end substation works, MEWRE Transmission staff and protection studies, an owner's/independent engineer to monitor construction and witness performance tests, metering and SCADA integration at the National Control Centre, land handover obligations, and the long-term payments under the PPA (a budget item for 30 years). These belong in the programme business case even though they never appear in the bidder's capex.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Typical cost-review failures",
          md: md`- Comparing USD/Wp with USD/kWac (DC/AC ratio error).
- Using a 2021 benchmark in 2026 without escalation or market correction (module prices roughly halved 2022–2024; steel and freight moved the other way at times).
- Ignoring grid connection or treating it as 'someone else's' cost in a whole-of-government comparison.
- Assuming manual cleaning cost in opex while the energy yield assumes nightly robotic cleaning (or vice versa).
- A flat 10 % contingency on a Class 2 EPC price and the same 10 % on a Class 5 concept — contingency should follow maturity and risk.
- Forgetting inverter replacement and BESS augmentation in lifecycle cost.`,
        },
        {
          kind: "checklist",
          title: "PM checklist: capex/opex review",
          items: [
            "Every number has a basis (DC/AC, USD/KWD, real/nominal), a date and a source",
            "Scope boundaries listed: plant substation, line, land, water supply, roads, security, telecoms",
            "Owner's/development costs, IDC and financing fees shown separately from EPC",
            "Contingency tied to estimate class and risk register (EMV floor, P80 for budget)",
            "Opex includes cleaning strategy consistent with the yield's soiling assumption",
            "Lifecycle items included: inverter replacement, BESS augmentation, major spares, decommissioning",
            "Desert adders checked: high-temperature derating, sand protection, HVAC for e-houses and BESS, sabkha/corrosion",
          ],
        },
        {
          kind: "ask",
          title: "Ask the EPC contractor / bidder",
          items: [
            "Which items in your price are indexed (modules, steel, copper, freight) and until when?",
            "What soiling loss is in your P50, and what cleaning method, frequency and water volume does it assume?",
            "What is the piling design basis — pull-out tests done on site, and how much sabkha/caliche contingency is included?",
            "What inverter replacement and BESS augmentation costs are in your lifecycle model and in which years?",
            "Which costs do you assume MEWRE provides (land, water, access roads, construction power, grid outage windows)?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a budget officer at the Ministry of Finance why a solar plant quoted at 'USD 0.36 per watt' can legitimately cost the state far more than 1,430 MWp × 0.36.",
          keyPoints: [
            "USD/Wp EPC excludes development, financing/IDC and owner's contingency",
            "DC vs AC basis changes the per-kW number by the DC/AC ratio",
            "Grid connection (e.g. the 400 kV line) may be funded separately by MEWRE",
            "Owner's costs: supervision, studies, land, staff, metering",
            "Lifecycle costs (opex, cleaning, inverter replacement) and the 30-year PPA payments matter more than the headline capex",
          ],
        },
        { kind: "sources", refs: ["m10-irena-costs-2023", "m10-nrel-cost-benchmarks", "m10-nrel-atb", "m10-lazard-lcoe", "m10-bnef-storage", "m10-aace-18r97", "m10-jeas-soiling", "m10-rser-shagaya-pv", "m10-megaproject-400kv", "m10-agbi-zone1-rfp"] },
      ],
    },
  ],
  quiz: [
    {
      id: "m10-l03-q1",
      type: "numeric",
      prompt: md`An EPC quote is USD 0.34/Wp for a plant with a DC/AC ratio of 1.25. What is it in USD/kWac?`,
      answer: 425,
      tolerance: { abs: 1 },
      unit: "USD/kWac",
      explanation: md`$0.34\text{ USD/W}\times 1000\times 1.25 = 425$ USD/kWac. Always convert before comparing with an AC benchmark.`,
      concepts: ["m10.capex-breakdown"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m10-l03-q2",
      type: "multi",
      prompt: "Which items would normally sit OUTSIDE an EPC contractor's lump-sum price for a solar IPP? (Select all that apply.)",
      options: [
        "Interest during construction",
        "Lenders' technical advisor and model-audit fees",
        "Trackers and piling",
        "A transmission line procured separately by the ministry",
        "Construction all-risk insurance arranged by the EPC",
      ],
      answer: [0, 1, 3],
      explanation: md`IDC and advisors are SPV/development costs; a separately tendered line (like Shagaya–Al-Wafra) is the ministry's. Trackers, piling and EPC-arranged CAR insurance are inside the EPC price.`,
      concepts: ["m10.capex-breakdown"],
      difficulty: 1,
    },
    {
      id: "m10-l03-q3",
      type: "mcq",
      prompt: "A feasibility-stage (AACE Class 4) estimate for a BESS is USD 340 m. Which statement is most appropriate in the business case?",
      options: [
        "\"The project will cost USD 340 m.\"",
        "\"USD 340 m ± 5 %.\"",
        "\"USD 340 m, expected range roughly −15/−30 % to +20/+50 %, to be refined after market sounding.\"",
        "\"Between USD 0 and 680 m.\"",
      ],
      answer: 2,
      explanation: md`Class 4 estimates carry wide asymmetric ranges; presenting a point value invites a later 'overrun' story. Give the range and the plan to narrow it.`,
      concepts: ["m10.estimate-contingency"],
      difficulty: 1,
    },
    {
      id: "m10-l03-q4",
      type: "numeric",
      prompt: md`Optimal cleaning interval: C = USD 143,000 per cycle, s = 0.3 %/day, E = 3,003 GWh/yr, p = 1.8 US cents/kWh. Compute $N^{*}$ in days (1 decimal).`,
      answer: 25.4,
      tolerance: { abs: 0.3 },
      unit: "days",
      explanation: md`$N^{*} = \sqrt{730\times 143{,}000/(0.003\times 3.003\times 10^{9}\times 0.018)} = \sqrt{104.4\times 10^{6}/162{,}162} = 25.4$ days; annual cost ≈ USD 4.1 m. Nightly robotic cleaning costs ≈ USD 3.0 m/yr in the illustrative comparison and saves water.`,
      concepts: ["m10.cleaning-economics"],
      difficulty: 2,
    },
    {
      id: "m10-l03-q5",
      type: "decision",
      prompt: md`A consultant's feasibility report for a MEWRE-owned 300 MW PV plant uses NREL's US benchmark (≈ USD 1.1/Wdc) for capex. You are the PM. What do you do?`,
      options: [
        { text: "Accept it — NREL is authoritative and a high estimate is conservative.", score: 0.2, feedback: "Over-estimates are not 'safe': they distort option rankings, tie up budget and can kill viable projects." },
        { text: "Ask for a regional benchmark set (recent Gulf EPC awards, IRENA country data), a bottom-up breakdown adjusted for Kuwait scope, escalation to today, and a stated estimate class and range.", score: 1, feedback: "Correct: benchmarks must match region, date and scope; present a range." },
        { text: "Replace it with the lowest Gulf tariff converted to capex.", score: 0.1, feedback: "Tariffs embed financing and risk allocation; back-solving capex from a record tariff is unreliable." },
      ],
      explanation: md`US benchmarks carry US labour, interconnection and permitting costs. Use regional, dated, scope-adjusted evidence and show the estimate class.`,
      concepts: ["m10.cost-benchmarks"],
      difficulty: 2,
    },
    {
      id: "m10-l03-q6",
      type: "short",
      prompt: "Why should a PM check that the opex cleaning budget and the energy yield's soiling assumption are consistent?",
      rubric: [
        "Soiling loss in the P50 depends on cleaning frequency and method",
        "A low soiling loss with a low-cost/infrequent cleaning budget double-counts benefits",
        "Inconsistency biases LCOE/tariff downward and creates performance risk",
        "The PPA/O&M contract should specify the cleaning regime that the yield assumes",
      ],
      modelAnswer: "The P50 soiling loss is only valid for a specific cleaning regime. If the yield assumes nightly robotic cleaning (≈0.15–2 % loss) but opex budgets monthly manual cleaning, the model takes the energy of one strategy and the cost of the cheaper one — understating LCOE and setting up an underperformance dispute. The O&M contract and PPA performance regime should lock in the regime the yield assumes.",
      explanation: md`In the illustrative case, monthly manual cleaning costs ≈ USD 4.2 m/yr all-in with 4.5 % average soiling loss, while nightly robots cost ≈ USD 3.0 m/yr with ~0.15 % loss. Mixing them corrupts both the LCOE and the performance baseline.`,
      concepts: ["m10.opex-breakdown", "m10.cleaning-economics"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m10-l03-f1", front: "USD/Wp → USD/kWac", back: "Multiply by 1,000 × DC/AC ratio (0.392 × 1.30 → 509 USD/kWac).", concepts: ["m10.capex-breakdown"] },
    { id: "m10-l03-f2", front: "Share of modules in base-case PV capex", back: "≈ 28 %; trackers + BoS + civil + labour ≈ 40 %.", concepts: ["m10.capex-breakdown"] },
    { id: "m10-l03-f3", front: "IRENA 2023 global weighted-average utility PV installed cost", back: "≈ USD 758/kW (published 2024); Gulf projects are at the bottom of the range.", concepts: ["m10.cost-benchmarks"] },
    { id: "m10-l03-f4", front: "BNEF 2024 turnkey BESS price (4 h, global average)", back: "≈ USD 165/kWh (December 2024 survey) — check the latest edition.", concepts: ["m10.cost-benchmarks"] },
    { id: "m10-l03-f5", front: "Optimal cleaning interval formula", back: md`$N^{*} = \sqrt{730C/(sEp)}$`, concepts: ["m10.cleaning-economics"] },
    { id: "m10-l03-f6", front: "AACE Class 3 estimate accuracy", back: "About −10/−20 % to +10/+30 % (budget authorisation stage).", concepts: ["m10.estimate-contingency"] },
    { id: "m10-l03-f7", front: "Contingency vs management reserve", back: "Contingency: known risks within approved scope (EMV/P80). Management reserve: unknown-unknowns; scope change needs new approval.", concepts: ["m10.estimate-contingency"] },
    { id: "m10-l03-f8", front: "Base-case PV opex", back: "USD 7.5 m/yr ≈ USD 6.8/kWac/yr: O&M 40 %, insurance 20 %, cleaning 19 %.", concepts: ["m10.opex-breakdown"] },
  ],
};

export default lesson;
