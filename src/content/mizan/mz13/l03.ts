import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz13-l03",
  title: "The cleaning optimisation business case for a Gulf IPP",
  summary:
    "Turn the validated method into money for a Gulf IPP: the savings stack (interval, season, events, cleaning-system faults), why the savings depend on the customer's current baseline, who captures the value (IPP, O&M contractor, offtaker), pricing options from subscription to gain-sharing with the customer's return and Mizan's margin under each, and the one-page business case. Investor and customer Q&A decision trees test the defence.",
  minutes: 85,
  objectives: [
    "You can model the annual cost of cleaning plus lost energy for a Gulf IPP and the savings from interval, seasonal and event-driven scheduling with the square-root rule.",
    "You can show how the savings depend on the customer's current cleaning policy and why the flat optimum makes the baseline the first question.",
    "You can value cleaning-system fault detection and explain why it grows with the square of the detection delay.",
    "You can compare subscription, gain-share, hybrid and paid-pilot pricing on the customer's net benefit, Mizan's revenue and who carries the risk.",
    "You can write a one-page business case for a Gulf IPP and defend it to an investor and to the customer's asset manager.",
  ],
  concepts: [
    {
      id: "mz13.savings-stack",
      name: "Cleaning savings stack",
      description:
        "The separate sources of value from soiling analytics: moving a fixed interval to the cost optimum, seasonal intervals, event rules (postpone before storms, clean after), and detecting failed cleaning systems; each modelled and verified separately.",
      competency: "mz-business",
      related: ["mz04.square-root-rule", "mz04.seasonal-interval", "mz04.event-driven-cleaning"],
    },
    {
      id: "mz13.baseline-dependence",
      name: "Baseline dependence of savings",
      description:
        "Savings are measured against what the customer does today; because total cost is flat near the optimum, a plant already near its optimal interval gains little from interval changes, so the business case must start from the customer's actual policy.",
      competency: "mz-business",
      related: ["mz04.flat-optimum", "mz04.savings-baseline"],
    },
    {
      id: "mz13.fault-detection-value",
      name: "Value of cleaning-fault detection",
      description:
        "Rows whose cleaning robot or arm has failed soil until the failure is found; the extra plant loss grows with the square of the detection delay, so fast detection matters most where failures otherwise go unnoticed for weeks.",
      competency: "mz-business",
      related: ["mz04.common-mode-failure", "mz04.fleet-availability"],
    },
    {
      id: "mz13.pricing-models",
      name: "Pricing models for soiling analytics",
      description:
        "Per-MWp subscription, gain-share on verified net savings, a hybrid of a base fee plus a share, and a paid pilot credited against year one; they differ in who carries the performance risk, cash timing and M&V cost.",
      competency: "mz-business",
      related: ["mz04.gain-sharing", "mz04.mv-design"],
    },
    {
      id: "mz13.value-capture",
      name: "Who captures cleaning value",
      description:
        "The IPP values recovered energy at its PPA tariff, a fixed-price O&M contractor values lower cleaning cost and avoided performance penalties, the state values displaced fuel; the buyer and the pricing follow from whose money moves.",
      competency: "mz-business",
      related: ["mz04.incentive-gap", "mz04.value-of-soiled-mwh", "mz04.stakeholder-optimum"],
    },
    {
      id: "mz13.business-case-page",
      name: "One-page business case",
      description:
        "Customer and problem, savings model with sourced or labelled assumptions, M&V method, pricing with the customer's net benefit, Mizan's economics, risks and the ask (usually a paid pilot), all consistent and fitting on one page.",
      competency: "mz-business",
      related: ["mz13.savings-stack", "mz13.pricing-models"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "Where the money comes from",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`A validated method at Shagaya is credibility; a business case is revenue. The first commercial buyers of Mizan's soiling analytics are likely to be Gulf IPPs, their O&M contractors and state-owned plants, and each will ask the same three questions: how much will I save, how do I know, and what does it cost me. Gulf PV tariffs are among the lowest in the world, so the money per MWp is small and the case must be exact. You own pricing and the sales conversation; this lesson gives you the model behind both.`,
        },
        {
          kind: "md",
          md: md`### The cost the customer is paying today

With soiling accumulating at rate $r$ (fraction per day) from a clean start and a full cleaning every $T$ days, the plant pays two costs a year: the cleanings, and the energy lost to dust between them.`,
        },
        { kind: "equation", formula: "mz13-annual-cost" },
        { kind: "equation", formula: "mz13-optimal-interval" },
        { kind: "equation", formula: "mz13-flatness" },
        {
          kind: "md",
          md: md`The optimum is where the two costs are equal, and the total cost curve is **flat** near it: cleaning 50 % more or less often than optimal costs only about 8 % more in total. Two consequences drive the whole business case.

1. **The baseline decides the saving.** A plant cleaning monthly when its optimum is 46 days has a saving to capture; a plant already near its optimum has little from interval changes alone.
2. **The bigger money is in what a fixed interval cannot do**: different intervals by season, rules for dust events, and finding rows where the cleaning system has failed.

### The savings stack

| Layer | Mechanism | What the analytics adds | Typical size (illustrative plant below) |
|---|---|---|---|
| 1 Interval | Move the fixed interval to $T^*$ | A measured soiling rate instead of a guess | Large if the baseline is far from $T^*$, near zero if not |
| 2 Season | One $T^*$ per soiling regime (dew winter, dust spring and summer) | Seasonal rates from corrected PR | A few % of total cost |
| 3 Events | Postpone a cleaning before a forecast storm; clean early after a storm step | Change-point detection and dust forecasts | One or two avoided cycles a year |
| 4 Faults | Find rows whose robot or cleaning arm has failed | Row or block level SR anomalies | Grows with the square of the detection delay |
| 5 Capex | Right-size a robot fleet or cleaning contract | Rates per block, cost curves | Project-specific; at procurement |

Layer 4 is the Shagaya story in commercial form: a cleaning-arm failure that lasted months is exactly what a plant-data method should catch in days.`,
        },
        { kind: "equation", formula: "mz13-fault-loss" },
        {
          kind: "widget",
          widget: "soiling",
          caption: "The default settings are the illustrative IPP in the worked example: 1,000 MWp, 2,300 kWh/kWp, USD 15/MWh, 0.3 %/day, USD 0.3/kWp per cleaning cycle. Read the optimum (about 46 days) and the total cost. Then set the soiling rate to 0.15 and 0.45 %/day (calm and dusty seasons) and note the two optimal intervals: that difference is layer 2. Finally raise the energy value to USD 60/MWh, an illustrative value of displaced fuel for a state-owned plant: the optimal interval halves and the money at stake doubles.",
        },
        {
          kind: "chart",
          chart: "stacked-bar",
          title: "Annual cost by cleaning policy, illustrative 1,000 MWp Gulf IPP (USD m/yr)",
          xKey: "policy",
          xLabel: "Cleaning policy",
          yLabel: "USD m per year",
          series: [
            { key: "cleaning", label: "Cleaning cost" },
            { key: "lost", label: "Lost energy revenue" },
          ],
          data: [
            { policy: "Monthly fixed", cleaning: 3.65, lost: 1.55 },
            { policy: "Optimal fixed (46 d)", cleaning: 2.38, lost: 2.38 },
            { policy: "Seasonal (65 d / 38 d)", cleaning: 2.3, lost: 2.3 },
            { policy: "Seasonal + event rules", cleaning: 2.0, lost: 2.35 },
          ],
          caption: "Illustrative model, not customer data: linear soiling at 0.3 %/day on average (0.15 %/day for half the year, 0.45 %/day for the other half), USD 300k per full cleaning cycle, 2.3 TWh/yr, USD 15/MWh. Totals: 5.20, 4.76, 4.60 and 4.35 USD m/yr. The event-rule bar assumes one wasted cycle avoided per year for USD 0.05 m of extra loss.",
        },
        {
          kind: "md",
          md: md`### Who captures the value

The same recovered MWh is worth different amounts to different parties, and the buyer is whoever's money moves.

- **The IPP** sells energy at the PPA tariff. In the Gulf that is a low number (recent record PV tariffs in the region are roughly USD 10 to 15 per MWh; check the specific PPA), so recovered energy is worth little per MWh, but the IPP also carries any performance guarantees to lenders.
- **The O&M contractor** on a fixed-price contract pays for cleaning. Fewer cleanings are its saving, not the IPP's; if the contract has a performance-ratio or availability guarantee with penalties, avoided penalties are also its value. If the IPP pays for cleaning per cycle, the saving is the IPP's.
- **A state-owned plant** (Shagaya Phase I is one) values energy at the cost of the fuel it displaces, which is far above a Gulf PPA tariff; the square-root rule then says clean more often, and the money at stake is larger.`,
        },
        { kind: "xref", to: "mz04-l02", note: "What a soiled MWh is worth in Kuwait: PPA tariff versus displaced fuel, and why the IPP, the offtaker and the state each see a different optimum." },
        {
          kind: "md",
          md: md`### Pricing options

Net savings are the reduction in lost energy value minus any increase in cleaning cost, measured against the agreed baseline:`,
        },
        { kind: "equation", formula: "mz13-net-savings" },
        { kind: "equation", formula: "mz13-fee-options" },
        {
          kind: "md",
          md: md`| Model | How it works | Customer's risk | Mizan's risk | When it fits |
|---|---|---|---|---|
| **Subscription per MWp** | Fixed USD per MWp per year | Pays even if savings are small | Low; predictable ARR | Customer trusts the method; many plants; simple procurement |
| **Gain-share** | Share $\alpha$ of verified net savings | Low | High: weather, baseline disputes, slow cash, M&V cost | First deals, sceptical buyer, large savings |
| **Hybrid** | Base fee covering cost to serve plus a smaller share | Moderate | Moderate | The usual landing point |
| **Paid pilot** | Fixed fee for a defined M&V period on paired blocks, credited against year one | Small, capped | Small, capped | Before any annual contract |

At least one soiling-analytics company (Swish Solar, with its SwishOS product) is reported to price on a sliding scale by plant capacity, which supports per-MWp pricing as a market norm. Treat the reported details as secondary-source information.`,
        },
        {
          kind: "matrix",
          title: "Choosing a pricing model",
          xAxis: ["Customer doubts the savings", "Customer trusts the savings"],
          yAxis: ["Savings small or uncertain", "Savings large and measurable"],
          cells: [
            { label: "Paid pilot first", detail: "Gain-share on small savings will not cover M&V; prove it on paired blocks for a capped fee" },
            { label: "Subscription", detail: "Low fee per MWp; the case rests on faults and events, not on the interval" },
            { label: "Gain-share or hybrid", detail: "Large, verifiable savings make a share attractive to both; agree the baseline in writing" },
            { label: "Hybrid moving to subscription", detail: "Base fee plus share in year one, convert to subscription once the savings are proven" },
          ],
          caption: "Top row: large measurable savings. Bottom row: small or uncertain ones. The pilot is the entry ticket in the bottom-left, where most first conversations start.",
        },
        { kind: "sources", refs: ["mz13-r5", "mz13-r7", "mz13-r11", "mz13-r12"] },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "The business case for an illustrative Gulf IPP",
      blocks: [
        {
          kind: "callout",
          tone: "tip",
          title: "All numbers here are illustrative",
          md: md`The plant below is invented to show the method: a 1,000 MWp plant, 2,300 kWh/kWp, a PPA tariff of USD 15/MWh, manual or semi-automated cleaning at USD 0.3/kWp per full cycle (USD 300k), soiling 0.3 %/day on average. It is not a Mizan customer and the numbers are not data from any plant. Replace every assumption with the customer's own figures before using the structure.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "The savings model, layer by layer",
          given: md`Annual clean energy $E = 1{,}000 \times 2{,}300 = 2.3 \times 10^6$ MWh. Value $p = 15$ USD/MWh. Cleaning cost per cycle $C = 300{,}000$ USD. Average soiling rate $r = 0.003$ /day; seasonally 0.0015 /day for half the year and 0.0045 /day for the other half. Current policy: monthly cleaning ($T = 30$ days).`,
          steps: [
            { md: md`**Today (monthly).** Cleaning $365 \times 300{,}000 / 30 = 3.65$ m USD. Lost energy $2.3 \times 10^6 \times 0.003 \times 30 / 2 = 103{,}500$ MWh, worth $1.55$ m USD. Total **USD 5.20 m/yr**.` },
            { md: md`**Layer 1, optimal fixed interval.** $T^* = \sqrt{2 \times 365 \times 300{,}000 / (0.003 \times 2.3 \times 10^6 \times 15)} = \sqrt{2{,}116} = 46$ days. At the optimum both costs are equal: $J^* = 4.76$ m USD. Saving **USD 0.44 m/yr**. Check with the flatness rule: $\tfrac{1}{2}(30/46 + 46/30) = 1.093$, and $1.093 \times 4.76 = 5.20$.` },
            { md: md`**Layer 2, seasonal intervals.** For each half year, $T_i^* = 46 \sqrt{0.003 / r_i}$: 65 days in the calm half, 38 days in the dusty half. Costs: $0.84 + 0.84 = 1.68$ m and $1.46 + 1.46 = 2.92$ m; total **4.60 m**, a further **USD 0.16 m/yr**.` },
            { md: md`**Layer 3, event rules (assumption).** Postponing one cleaning a year that a dust storm would have undone saves a cycle (USD 0.30 m) at an extra loss of about USD 0.05 m: **USD 0.25 m/yr**. Total 4.35 m.` },
            { md: md`**Total against today:** $5.20 - 4.35 = 0.85$ m USD/yr, about 16 % of the soiling-related cost and **USD 850 per MWp per year**. Against a customer already at the optimal fixed interval: $4.76 - 4.35 = 0.41$ m.` },
            { md: md`**Layer 4, a robot-cleaned variant.** If the plant cleaned nightly with robots (failure rate 0.3 per robot per year), finding failed robots in 3 days instead of 60 reduces the extra loss from $0.3 \times 0.003 \times 60^2 / 730 = 0.44$ % to almost zero: about 10,200 MWh, **USD 0.15 m/yr** at USD 15/MWh. Small at this tariff, larger at a displaced-fuel value or where a performance guarantee carries penalties.` },
          ],
          result: md`For this plant the analytics is worth about USD 0.85 m/yr against monthly cleaning (USD 850/MWp/yr) but only USD 0.41 m/yr against a plant already at its optimal fixed interval. The first discovery question is therefore "how do you clean today, how often and at what cost per cycle?", and the proposal must be priced against that answer.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Pricing it: the customer's net benefit and Mizan's margin",
          given: md`Same plant. Verified net savings $S = 0.854$ m USD/yr against monthly cleaning, or $0.41$ m against the optimal-fixed baseline. Options: (a) subscription USD 250/MWp/yr; (b) gain-share $\alpha = 30$ % of verified net savings; (c) hybrid: USD 100/MWp/yr plus 20 % of verified net savings. Mizan's illustrative cost to serve: USD 50k/yr per plant plus USD 60k one-off onboarding.`,
          steps: [
            { md: md`**Monthly baseline.** (a) $F = 250 \times 1{,}000 = 0.25$ m; customer keeps $0.854 - 0.25 = 0.60$ m. (b) $F = 0.30 \times 0.854 = 0.256$ m. (c) $F = 0.10 + 0.20 \times 0.854 = 0.271$ m. The three are close: with large savings the choice is about risk and cash timing, not the amount.` },
            {
              md: md`**Optimal-fixed baseline, subscription.** Fee as a share of savings: $0.25 / 0.41 = 61$ %. The customer keeps only USD 0.16 m and carries all the risk that savings are smaller.`,
              hidden: true,
              check: { prompt: "Subscription fee as a share of savings on the optimal-fixed baseline (%)", answer: 61, unit: "%", tolerance: { abs: 1 } },
            },
            {
              md: md`**Optimal-fixed baseline, hybrid.** $F = 0.10 + 0.20 \times 0.41 = 0.182$ m USD/yr, 44 % of savings.`,
              hidden: true,
              check: { prompt: "Hybrid fee on the optimal-fixed baseline (USD m/yr)", answer: 0.182, unit: "USD m", tolerance: { abs: 0.002 } },
            },
            {
              md: md`**Mizan's margin on the subscription.** $(0.25 - 0.05) / 0.25 = 80$ % gross margin; onboarding paid back in $60 / (250 - 50) \times 12 = 3.6$ months.`,
              hidden: true,
              check: { prompt: "Onboarding payback on the subscription (months)", answer: 3.6, unit: "months", tolerance: { abs: 0.1 } },
            },
          ],
          result: md`Against a far-from-optimal baseline any model works. Against a near-optimal one, a USD 250/MWp subscription takes most of the value, so the hybrid (or a lower subscription justified by faults and events) is the defensible offer. Price against the customer's baseline, not against the best case.`,
        },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "Selling the case to a Gulf IPP",
      blocks: [
        {
          kind: "md",
          md: md`### How an IPP decides

- **Who is in the room.** The plant's asset manager (owns performance against the budget and lender reports), the O&M contractor's site manager (owns cleaning and its cost), the IPP's CFO or finance team (cares about verified cash), sometimes the lenders' technical adviser (cares about anything that touches the performance guarantees) and, at robot-cleaned plants, the robot vendor.
- **Documents.** The O&M contract (who pays for cleaning, any PR or availability guarantee and penalties), the PPA tariff, the cleaning log and cost per cycle, monitoring data access terms.
- **What they will ask.** How do you separate soiling from heat and outages (lesson 2 answers it); what is verified and how (paired blocks, agreed baseline); who owns the data; what happens to our O&M contract; what does it cost.
- **What goes wrong.** Pricing on the best-case baseline; selling savings to a party whose money does not move (the IPP when the fixed-price O&M contractor pays for cleaning); no written baseline, so savings are disputed after a rainy year; integrating with SCADA takes three times longer than planned.`,
        },
        { kind: "xref", to: "mz04-l06", note: "M&V in depth: the paired-block design, the minimum detectable saving and gain-sharing formulas the pilot proposal relies on." },
        { kind: "xref", to: "fc04-l07", note: "Pricing, packaging and negotiation in general; here applied to per-MWp, gain-share and hybrid structures." },
        {
          kind: "checklist",
          title: "Before you send a proposal",
          items: [
            "I know the customer's current cleaning policy, cost per cycle and who pays for it under the O&M contract.",
            "Savings are computed against that baseline, layer by layer, with every assumption marked as customer data or illustrative.",
            "The M&V method (paired blocks, agreed baseline, measurement period) is written and the minimum detectable saving is below the expected saving.",
            "The price leaves the customer most of the verified value under the realistic baseline, not only under the best case.",
            "Data ownership, access and confidentiality terms are stated.",
            "Claims about Shagaya describe the study as targeted or in preparation (or cite published results once they exist), never as a signed or running pilot.",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Do not sell Shagaya before it exists",
          md: md`Until the study is agreed and published, the most Mizan can say is that a validation study with KISR researchers as methodology partner is in preparation, and only with KISR's agreement to say even that. Describing it as signed, running or KISR-validated would be false and would end the partnership. The business case must stand on the customer's own data and a paid pilot, with Shagaya as future evidence.`,
        },
        { kind: "scenario", scenario: "mz13-s4" },
        { kind: "scenario", scenario: "mz13-s5" },
        {
          kind: "question",
          question: {
            id: "mz13-l03-p1",
            type: "short",
            prompt: md`**Capstone exercise: the one-page business case.** Choose an illustrative Gulf IPP (state its size, tariff, cleaning method and who pays for cleaning; all labelled illustrative). Write the one-page business case Mizan would send: (1) customer and problem; (2) the savings model by layer against the customer's current policy, with formulas and numbers; (3) the M&V method; (4) pricing, with the customer's net benefit and the fee as a share of savings under a realistic and a pessimistic baseline; (5) Mizan's economics (cost to serve, margin); (6) the three main risks and mitigations; (7) the ask, normally a paid pilot with success criteria. Describe the Shagaya study accurately.`,
            rubric: [
              "Plant assumptions stated and labelled illustrative; identifies who pays for cleaning and who captures recovered energy value under the O&M contract.",
              "Savings model is layered (interval, season, events, faults), uses the cost model and square-root rule correctly, and is computed against the customer's current policy with a pessimistic baseline case.",
              "M&V is specific: paired treatment and control blocks, written baseline using corrected PR, measurement period long enough for the expected saving to exceed the detection limit.",
              "Pricing compares at least two models, shows customer net benefit and fee as a share of savings under both baselines, and chooses one with a reason.",
              "Mizan's economics (cost to serve, gross margin, onboarding) and three real risks (baseline dispute, data access or integration, weather variability or incentive gap) with mitigations.",
              "Ask is a paid, capped pilot with written success criteria; Shagaya described as targeted or in preparation, no invented customers, results or endorsements.",
            ],
            modelAnswer: md`**Mizan: soiling analytics and cleaning optimisation for an illustrative 1,000 MWp Gulf IPP (all numbers illustrative)**

**1. Customer and problem.** Single-axis plant, 2,300 kWh/kWp, PPA USD 15/MWh, semi-automated cleaning by the O&M contractor billed to the IPP per cycle at USD 0.3/kWp (USD 300k), monthly schedule. Soiling and cleaning cost about USD 5.2 m/yr; the schedule is fixed, not driven by measured soiling.

**2. Savings model** (cost $J(T) = 365 C / T + p E r T / 2$). Today, monthly: USD 5.20 m. Layer 1, optimal interval $T^* = 46$ days at 0.3 %/day: saves 0.44 m. Layer 2, seasonal intervals 65 and 38 days: 0.16 m. Layer 3, one storm-wasted cycle avoided per year: 0.25 m. Total **USD 0.85 m/yr (USD 850/MWp)**. Pessimistic baseline (customer already near 46 days): USD 0.41 m. Layer 4 (cleaning faults) not counted; upside.

**3. M&V.** Six paired blocks: three on the Mizan schedule, three matched controls on the current one; baseline in writing using weather-corrected PR on IEC 61724-1 data, outages and curtailment excluded; four months covering a season change; the expected block-level difference is several times the minimum detectable saving computed from the pre-period noise.

**4. Pricing.** Subscription USD 250/MWp: fee 0.25 m, 29 % of savings on today's baseline, 61 % on the pessimistic one. Hybrid USD 100/MWp plus 20 % of verified net savings: 0.27 m (32 %) or 0.18 m (44 %). **Offer the hybrid** in year one, with an option to convert to subscription once savings are verified; the customer keeps most of the value in both cases.

**5. Mizan economics.** Onboarding USD 60k (data integration), cost to serve USD 50k/yr; hybrid gross margin $(0.27 - 0.05)/0.27 = 81$ %, or 73 % on the pessimistic baseline.

**6. Risks.** Baseline dispute after an unusual dust year (written baseline, paired controls). Data access and SCADA integration delays (read-only export first, integration in parallel). Incentive gap if the cleaning contract changes to fixed price (agree in advance who receives savings; offer the contractor a role).

**7. Ask.** A four-month paid pilot for USD 40k, credited against year one, with success criteria: verified net saving on treatment blocks of at least 60 % of the modelled value, and detection of every logged cleaning. Methodology: weather-corrected PR baseline and soiling inference; a validation study with KISR researchers at Shagaya Phase I is in preparation and is not cited as evidence until published.`,
            explanation: md`The capstone tests consistency: the same plant, baseline and numbers through savings, M&V, pricing and the ask, with honesty about what is illustrative and what Shagaya can and cannot support today.`,
            concepts: ["mz13.business-case-page", "mz13.savings-stack", "mz13.baseline-dependence", "mz13.pricing-models", "mz13.value-capture"],
            difficulty: 3,
          },
        },
        { kind: "xref", to: "fc06-l06", note: "Pricing economics (value-based pricing, willingness to pay): the share of verified value a customer will accept is the core of the pricing choice here." },
      ],
    },
  ],
  scenarios: [
    {
      id: "mz13-s4",
      title: "The investor asks whether this is venture-scale",
      dayInLife: true,
      context: md`First meeting with a climate-tech seed investor about Mizan. The partner has done the arithmetic: "At USD 15/MWh your savings are under USD 1,000 per MWp per year. Even at 30 % capture that is about USD 250/MWp. If the Gulf has, say, 20 GW of operating PV, that is USD 5 m a year at 100 % market share. Why is this a venture business?"`,
      start: "a",
      concepts: ["mz13.value-capture", "mz13.savings-stack", "fc11.fund-returner"],
      nodes: {
        a: {
          md: md`How do you answer?`,
          choices: [
            {
              text: "Agree with the arithmetic for soiling analytics alone at IPP tariffs, then give the expansion path with the mechanism for each step: state-owned plants value energy at displaced fuel, several times the tariff; plant control (dust-aware stow and tracker control) and cleaning-system fault detection add value per MWp; distribution of cleaning robots and controls adds hardware revenue; and the same method applies in other desert markets; show the wedge as the entry, not the company",
              next: "b",
              score: 10,
              feedback: "Conceding the correct arithmetic and answering with a mechanism-based expansion path is exactly what the fund-returner question needs.",
            },
            {
              text: "Say the 20 GW figure is too low and the market is much bigger",
              next: "b",
              score: 3,
              feedback: "Arguing the premise before answering, without a sourced number. Even a larger figure does not fix USD 250/MWp.",
            },
            {
              text: "Say Mizan will charge more than USD 250/MWp because the analytics is better",
              next: "b",
              score: 2,
              feedback: "Price is capped by the customer's savings, which the partner just computed. Better analytics does not create value the tariff does not contain.",
            },
            {
              text: "Say you are not trying to build a venture-scale business",
              next: "b",
              score: 4,
              feedback: "Honest if true, but then this is the wrong investor. If you are raising venture money, you need the expansion path.",
            },
          ],
        },
        b: {
          md: md`"Swish Solar already does soiling analytics from plant data with no hardware and raised a pre-seed in 2025. Why you?"`,
          choices: [
            {
              text: "Acknowledge Swish (and the analytics features of large monitoring platforms) and name the axis you win on: a method being validated in Kuwait's desert conditions with KISR researchers, presence and relationships in Kuwait's public procurement, and the combination of analytics with control functions and hardware distribution; mention that a partnership with an analytics provider was considered and could still make sense",
              next: "c",
              score: 10,
              feedback: "Respectful, specific about the axis, and honest that partnership is an option. The partner hears that you know the landscape.",
            },
            {
              text: "Say Swish is a small Canadian startup and not a threat",
              next: "c",
              score: 2,
              feedback: "Dismissive and probably wrong: their reported customers include the Middle East. Investors discount founders who dismiss competitors.",
            },
            {
              text: "Say Mizan has better algorithms",
              next: "c",
              score: 3,
              feedback: "An unverifiable claim. The defensible edge is local validation, access and the broader product, not an algorithm claim you cannot show.",
            },
          ],
        },
        c: {
          md: md`"And the Shagaya pilot with KISR: is it signed?"`,
          choices: [
            {
              text: "Say precisely: it is targeted and in preparation, KISR researchers are the intended methodology partner, nothing is signed; state the next step and the date you expect to know, and what the round would let you do whether or not it is signed",
              score: 10,
              feedback: "Exactly the status, with a next step. Diligence would find any exaggeration, and a precise answer builds trust.",
            },
            {
              text: "Say it is basically agreed and will be signed soon",
              score: 2,
              feedback: "'Basically agreed' is how founders lose credibility in diligence. Say what is true.",
            },
            {
              text: "Change the subject to the market",
              score: 1,
              feedback: "Evasion on a factual question is worse than a modest answer.",
            },
          ],
        },
      },
    },
    {
      id: "mz13-s5",
      title: "The IPP asset manager asks what is left to optimise",
      context: md`Meeting with the asset manager of a large Gulf PV IPP (illustrative). "Our O&M contractor's robots clean every module every night. Cleaning is in their fixed-price contract. What exactly would your analytics save us?"`,
      start: "a",
      concepts: ["mz13.value-capture", "mz13.fault-detection-value", "mz13.baseline-dependence"],
      nodes: {
        a: {
          md: md`What do you say?`,
          choices: [
            {
              text: "Agree that frequency optimisation is worth little with nightly robots, then move to what is left: rows where robots have failed or skip (loss grows with the square of the detection delay), verifying the contractor's cleaning performance against the contract from data, and the interplay of cleaning with night stow and dew; ask how failed robots are detected today and how long they stay unnoticed",
              next: "b",
              score: 10,
              feedback: "You accepted the customer's baseline, found the value that remains and asked the discovery question that sizes it.",
            },
            {
              text: "Insist that analytics would let them clean less often and save money",
              next: "b",
              score: 2,
              feedback: "With nightly robots under a fixed-price contract, cleaning less often saves the IPP nothing; the contractor keeps any saving. You have shown you did not understand their contract.",
            },
            {
              text: "Say the robots are probably not cleaning well",
              next: "b",
              score: 3,
              feedback: "Maybe, but asserted without evidence it sounds like an attack on their contractor. Offer to measure it.",
            },
          ],
        },
        b: {
          md: md`"Interesting. But I will not pay for a promise. What will you commit to?"`,
          choices: [
            {
              text: "Propose a capped paid pilot on a few blocks with written success criteria: detection of every logged robot failure within a set number of days, a block-level soiling map, and a verified estimate of the energy lost to undetected failures; fee credited against an annual contract if the criteria are met",
              next: "c",
              score: 10,
              feedback: "Specific, measurable and low-risk for the buyer. Success criteria in writing make the pilot convertible.",
            },
            {
              text: "Offer a free pilot to get started",
              next: "c",
              score: 4,
              feedback: "Free pilots rarely convert: the customer has no stake in the success criteria. A small fee credited later is better for both sides.",
            },
            {
              text: "Offer a guaranteed saving of 2 % of energy",
              next: "c",
              score: 1,
              feedback: "A number you cannot support at a nightly-cleaned plant. If it fails, you lose the customer and the reference.",
            },
          ],
        },
        c: {
          md: md`"And if you find that the robots are missing rows, the savings go to the O&M contractor's penalty account, not to me. Why should I pay?"`,
          choices: [
            {
              text: "Recognise the incentive gap and resolve it by contract: under the O&M agreement the IPP's recovered energy and any performance penalties are the IPP's value, and verified data strengthens its position with the contractor; offer to price the service to the IPP on the energy and contract-enforcement value, or to structure a three-way arrangement with the contractor",
              score: 10,
              feedback: "You traced whose money moves and offered a structure that matches it. That is how incentive gaps are closed.",
            },
            {
              text: "Say the contractor will pay instead",
              score: 4,
              feedback: "Possible, but the contractor may not want a tool that exposes its performance. Map both incentives before switching buyers.",
            },
            {
              text: "Say that is not Mizan's problem",
              score: 1,
              feedback: "It is exactly Mizan's problem: if no party's money moves, there is no sale.",
            },
          ],
        },
      },
    },
  ],
  quiz: [
    {
      id: "mz13-l03-q1",
      type: "numeric",
      prompt: md`A 500 MWp plant yields 2,200 kWh/kWp, energy is worth USD 20/MWh, one full cleaning cycle costs USD 150,000 and soiling is 0.4 %/day. What is the cost-optimal cleaning interval, in days?`,
      answer: 35.3,
      unit: "days",
      tolerance: { abs: 0.3 },
      explanation: md`$E = 500 \times 2{,}200 = 1.1 \times 10^6$ MWh. $T^* = \sqrt{2 \times 365 \times 150{,}000 / (0.004 \times 1.1 \times 10^6 \times 20)} = \sqrt{109{,}500{,}000 / 88{,}000} = \sqrt{1{,}244} = 35.3$ days.`,
      concepts: ["mz13.savings-stack"],
      difficulty: 2,
    },
    {
      id: "mz13-l03-q2",
      type: "numeric",
      prompt: md`A plant's optimal interval is 40 days but it cleans every 20 days. By what percentage is its total cleaning-plus-soiling cost above the optimum?`,
      answer: 25,
      unit: "%",
      tolerance: { abs: 0.5 },
      explanation: md`$J(kT^*)/J^* = \tfrac{1}{2}(k + 1/k)$ with $k = 0.5$: $\tfrac{1}{2}(0.5 + 2) = 1.25$, so 25 % above the optimum. At $k = 1.5$ it would be only 8 %.`,
      concepts: ["mz13.baseline-dependence"],
      difficulty: 2,
    },
    {
      id: "mz13-l03-q3",
      type: "numeric",
      prompt: md`Robots fail at 0.3 failures per robot per year; soiling 0.3 %/day. If failed robots go unnoticed for 40 days, what is the extra plant-level soiling loss, in % of annual energy?`,
      answer: 0.197,
      unit: "%",
      tolerance: { abs: 0.005 },
      explanation: md`$\Delta \bar L = \lambda\, r\, D^2 / 730 = 0.3 \times 0.003 \times 1{,}600 / 730 = 0.00197$, about 0.20 % of energy. Halving the delay to 20 days cuts it to a quarter (0.05 %).`,
      concepts: ["mz13.fault-detection-value"],
      difficulty: 2,
    },
    {
      id: "mz13-l03-q4",
      type: "numeric",
      prompt: md`Verified net savings are USD 600k/yr. A hybrid price is USD 80/MWp/yr on a 1,000 MWp plant plus 25 % of verified net savings. What is the annual fee, in USD k?`,
      answer: 230,
      unit: "USD k",
      tolerance: { abs: 1 },
      explanation: md`Base $80 \times 1{,}000 = 80$k; share $0.25 \times 600 = 150$k; total 230k USD, 38 % of the savings.`,
      concepts: ["mz13.pricing-models"],
      difficulty: 1,
    },
    {
      id: "mz13-l03-q5",
      type: "mcq",
      prompt: md`The IPP's O&M contractor cleans under a fixed-price contract. Mizan's analytics would let the plant clean less often with no energy loss. Whose money moves?`,
      options: [
        "The IPP's, because it owns the plant",
        "The O&M contractor's, because it pays for cleaning under the fixed price",
        "The offtaker's, because it buys the energy",
        "Nobody's, because energy output is unchanged",
      ],
      answer: 1,
      explanation: md`Fewer cleanings at the same output lower the contractor's cost; the IPP pays the same fixed price. Sell that layer to the contractor, or restructure the contract, or sell the IPP the layers that recover energy.`,
      concepts: ["mz13.value-capture"],
      difficulty: 1,
    },
    {
      id: "mz13-l03-q6",
      type: "decision",
      prompt: md`A Gulf IPP wants a proposal. You do not yet know its current cleaning interval or cost per cycle. What do you send?`,
      options: [
        { text: "A proposal priced on the best-case saving against monthly cleaning", score: 0, feedback: "If the plant is already near its optimum, the price will take most of the value and the deal will die in the CFO's review." },
        { text: "A short note asking for the cleaning policy, cost per cycle, O&M contract terms on cleaning and a sample of monitoring data, with a savings range for a far and a near baseline, and a paid pilot as the next step", score: 1, feedback: "Correct: the baseline decides the saving, so get it first and show the range honestly." },
        { text: "A per-MWp subscription price without a savings estimate", score: 0.3, feedback: "Simple, but the buyer has no basis to judge it. Value first, then price." },
      ],
      explanation: md`Discovery before pricing: the customer's current policy and contract decide both the size of the saving and who pays for it.`,
      concepts: ["mz13.baseline-dependence", "mz13.business-case-page"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz13-l03-f1", front: "Annual cleaning plus soiling cost", back: md`$J(T) = 365\,C/T + p\,E\,r\,T/2$; optimum $T^* = \sqrt{2 \cdot 365\, C / (r E p)}$ where the two terms are equal.`, concepts: ["mz13.savings-stack"] },
    { id: "mz13-l03-f2", front: "The savings stack", back: "Interval, season, events, cleaning faults (and capex sizing). Model and verify each separately.", concepts: ["mz13.savings-stack"] },
    { id: "mz13-l03-f3", front: "Why the baseline is the first question", back: md`Total cost is flat near the optimum ($\tfrac{1}{2}(k + 1/k)$): a plant near $T^*$ gains little from interval changes.`, concepts: ["mz13.baseline-dependence"] },
    { id: "mz13-l03-f4", front: "Fault detection value", back: md`$\Delta \bar L = \lambda r D^2 / 730$: grows with the square of the detection delay.`, concepts: ["mz13.fault-detection-value"] },
    { id: "mz13-l03-f5", front: "Four pricing models", back: "Per-MWp subscription, gain-share on verified net savings, hybrid (base plus share), paid pilot credited against year one.", concepts: ["mz13.pricing-models"] },
    { id: "mz13-l03-f6", front: "Who captures cleaning value", back: "IPP: energy at PPA tariff (and guarantees). Fixed-price O&M contractor: cleaning cost and penalties. State-owned plant: displaced fuel.", concepts: ["mz13.value-capture"] },
    { id: "mz13-l03-f7", front: "Illustrative Gulf IPP numbers", back: "1,000 MWp, USD 15/MWh, 0.3 %/day, USD 300k per cycle: T* = 46 days, savings about USD 850/MWp/yr against monthly cleaning, USD 410/MWp against the optimal fixed interval.", concepts: ["mz13.business-case-page"] },
  ],
};

export default lesson;
