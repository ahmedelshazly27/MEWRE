import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz08-l04",
  title: "BESS analytics as an add-on to a PV soiling product",
  summary:
    "What Mizan's soiling analytics stack can reuse for batteries (pipelines, expected-versus-actual models, change detection, M&V) and what it cannot (electrochemical state estimation, safety-critical prediction, real-time EMS control), what BESS analytics is worth to an owner in Kuwait, and why the data-rights clause in a supply contract matters more than the algorithm.",
  minutes: 50,
  objectives: [
    "You can list which soiling-analytics capabilities transfer to BESS and which do not, and why",
    "You can quantify the main value levers of BESS analytics for an owner (augmentation timing, auxiliaries, warranty evidence, availability)",
    "You can explain why a single-buyer market like Kuwait reduces the value of dispatch optimisation",
    "You can scope a minimal BESS analytics add-on and decide when it is worth building",
  ],
  concepts: [
    {
      id: "mz08.transferable-stack",
      name: "What transfers from soiling analytics",
      description:
        "Plant data pipelines, expected-versus-actual residual models with weather and temperature correction, change-point detection, M&V protocols, uncertainty reporting, and the same owner and O&M relationships.",
      competency: "mz-data",
      related: ["mz03.expected-energy-model", "mz03.residual-analysis", "mz03.change-points", "mz02.weather-corrected-pr"],
    },
    {
      id: "mz08.non-transferable",
      name: "What does not transfer",
      description:
        "Electrochemical state estimation from cell data, safety-critical early warning of thermal runaway, real-time EMS dispatch and grid-code control (certified and OEM-owned), and market dispatch optimisation where there is no market.",
      competency: "mz-data",
      related: ["m05.soh", "m05.thermal-runaway", "m06.ppc"],
    },
    {
      id: "mz08.analytics-value",
      name: "Value levers of BESS analytics",
      description:
        "Deferring augmentation when measured fade is slower than the model, cutting auxiliary energy, evidence for warranty and LTSA claims, and availability accounting against guarantees.",
      competency: "mz-data",
      related: ["mz08.fade-augmentation", "mz08.warranty-structure", "m05.capacity-test"],
    },
    {
      id: "mz08.data-rights",
      name: "Data rights as the gate",
      description:
        "BESS analytics needs cell- and rack-level BMS data; supply contracts and warranties often restrict access or third-party analysis. A distributor can write owner data rights into the supply contract; an analytics vendor arriving later often cannot.",
      competency: "mz-business",
      related: ["mz08.integrator-dd", "mz08.warranty-structure"],
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "Same habits, different physics",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan's product is soiling analytics and plant control. If Mizan also supplies or services batteries, the obvious question from investors and cofounders is: "Can the software do batteries too?" Answering it well is a product-management decision: what to build, what to partner for, and what to leave alone so the soiling pilot is not diluted. The honest answer is "some of it transfers, the hard part does not, and the contract matters more than the code".`,
        },
        {
          kind: "md",
          md: md`## What transfers, what does not

| Capability | Soiling product | BESS use | Transfers? |
|---|---|---|---|
| **Data pipeline** (tags, historian, Modbus and OPC UA, quality filters) | Core | Same plant SCADA, more tags | **Yes**, directly |
| **Expected vs actual model** with weather and temperature correction | Corrected PR, soiling residual | Expected RTE and auxiliary load vs ambient; expected capacity vs test | **Yes**, same method |
| **Change-point detection** | Rain and cleaning events | Step changes in capacity, RTE or auxiliaries after faults, firmware or HVAC work | **Yes** |
| **M&V and test protocols** | Paired blocks, cleaning validation | Capacity and RTE tests, augmentation acceptance | **Yes** |
| **Dust on equipment** | Modules | Filters and condenser coils fouling, raising auxiliary load | **Yes**, and uniquely Mizan's |
| **State of health estimation** from partial cycles and cell data | None | Core of battery analytics | **No**: electrochemistry, cell models, OEM data |
| **Thermal runaway early warning** | None | Safety-critical | **No**: liability and certification |
| **Real-time EMS dispatch and grid-code control** | Tracker and stow commands are related | Owned and certified by the integrator; touching it can void warranties | **No**, interface only |
| **Market dispatch optimisation** | None | Arbitrage and ancillary bidding | **Little value in Kuwait**: single buyer, no wholesale market |`,
        },
        {
          kind: "matrix",
          title: "Where a BESS add-on should start",
          xAxis: ["Low transfer from soiling stack", "High transfer from soiling stack"],
          yAxis: ["Low value to a Kuwaiti owner", "High value to a Kuwaiti owner"],
          cells: [
            { label: "SoH estimation, safety early warning", detail: "Valuable but needs cell-level expertise: partner, do not build" },
            { label: "Capacity and RTE tracking, auxiliaries vs ambient, filter and coil fouling, warranty evidence", detail: "Build first: same methods, clear owner value" },
            { label: "Market dispatch optimisation", detail: "Little value without a market: skip" },
            { label: "Generic dashboards", detail: "Integrator monitoring already does this: do not compete" },
          ],
          caption: "Build where your existing methods meet a real owner problem; partner where the physics is new.",
        },
        {
          kind: "md",
          md: md`## Why Kuwait changes the value list

In markets with wholesale prices and ancillary auctions, BESS analytics vendors sell revenue optimisation. Kuwait has a **single buyer** (MEWRE) and no wholesale market (Track 0 m00-l03), so a ministry-owned battery earns its value by **being available at the evening peak** and by **lasting**. The value levers become operational:

1. **Augmentation timing.** The contract model assumes conservative fade. If measured state of health is better, the next tranche can wait.
2. **Auxiliary energy.** Chillers at 50 °C, fouled coils and poor set-points waste energy every day.
3. **Warranty and LTSA evidence.** Proving the plant was operated within warranty conditions, or that the supplier missed a capacity or availability guarantee.
4. **Availability accounting.** Separating owner-caused from supplier-caused downtime for liquidated damages.`,
        },
        { kind: "equation", formula: "mz08-deferral-value" },
        {
          kind: "callout",
          tone: "unverified",
          title: "Competitors",
          md: md`Integrators bundle monitoring with their LTSA, and several independent battery-analytics companies (many based in Europe) sell state-of-health and safety analytics to owners and insurers. Their current products, prices and Gulf presence were not checked for this lesson; research them before positioning any BESS add-on.`,
        },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "What is the add-on worth?",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Value of analytics on the 100 MW / 300 MWh plant",
          given: md`Lesson 1 plant (illustrative): 373.3 MWh DC, first augmentation of 35.7 MWh planned at year 5, augmentation hardware USD 60/kWh, expected price decline 5 %/yr, discount rate 8 %. Auxiliary energy 21.6 MWh/day in summer (lesson 3); assume analytics-led filter, coil and set-point fixes save 10 % of it over 365 days (illustrative). Value of energy USD 85/MWh (displaced LNG in a CCGT, the national value from mz04).`,
          steps: [
            { md: md`**Augmentation cost now:** $35.7 \times 60 \times 1000 =$ USD 2.142 m.` },
            { md: md`**Value of deferring one year** (measured fade allows it): $\Delta V = 2.142 \times (1 - 0.95/1.08) = 2.142 \times 0.1204 =$ USD 0.258 m.` },
            { md: md`**Annualised** over a 5-year augmentation cycle: $0.258/5 \approx$ USD 0.052 m/yr.` },
            { md: md`**Auxiliary saving:** $0.10 \times 21.6 \times 365 = 788$ MWh/yr; $788 \times 85 =$ USD 0.067 m/yr.` },
            { md: md`**Total quantified value:** about USD 0.12 m/yr, before warranty and availability evidence (lumpy, hard to forecast).` },
            { md: md`**Price at 25 % of value:** about USD 30,000 a year for this plant. At programme scale (about 7,465 MWh DC, 20 times larger) the same logic gives about USD 0.6 m a year across all sites.` },
          ],
          result: md`BESS analytics is worth real money to a Kuwaiti owner, but at a single 300 MWh plant it is an **add-on of tens of thousands of USD a year**, not a standalone business. It pays when it rides on a pipeline Mizan already runs, on plants where Mizan is already the service or integration partner, and at programme scale.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Sensitivity: no price decline",
          given: md`Same plant, but augmentation hardware prices are flat ($g = 0$), and the auxiliary saving is only 5 %.`,
          steps: [
            {
              md: md`Deferral value: $2.142 \times (1 - 1/1.08) = 2.142 \times 0.0741 =$ USD 0.159 m.`,
              hidden: true,
              check: { prompt: "Value of a one-year deferral with g = 0", answer: 0.159, unit: "USD m", tolerance: { rel: 0.02 } },
            },
            {
              md: md`Auxiliary saving: $0.05 \times 21.6 \times 365 \times 85 =$ USD 0.0335 m/yr.`,
              hidden: true,
              check: { prompt: "Annual auxiliary saving", answer: 0.0335, unit: "USD m/yr", tolerance: { rel: 0.02 } },
            },
            { md: md`Annual total: $0.159/5 + 0.0335 \approx$ USD 0.065 m/yr.` },
          ],
          result: md`The value roughly halves. The add-on case is sensitive to assumptions you cannot yet measure, which is one more reason to build it only on top of an existing service role.`,
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Scoping it without losing focus",
      blocks: [
        {
          kind: "md",
          md: md`**The data-rights gate.** Battery analytics needs rack- and cell-level BMS data (voltages, temperatures, currents, alarms) at useful resolution. Integrators often keep it inside their own cloud, deliver only plant-level summaries, or say third-party analysis voids the warranty. An owner who did not secure data rights in the supply contract cannot buy independent analytics later. **This is where distribution and analytics reinforce each other:** as a distributor or service partner, Mizan can write owner data rights into the deal from day one.

**Clause points to put in every supply contract Mizan touches:**

1. Owner owns all operating data; supplier delivers rack-level (ideally cell-level) BMS data, PCS and HVAC data in an open format at stated resolution.
2. Analysis by a third party nominated by the owner does not affect the warranty.
3. The supplier's capacity tests and degradation model are shared with the owner.
4. Data access survives the end of the LTSA and the supplier leaving the market.

**A minimal v0 add-on** (built by Mizan's engineering partners on the soiling pipeline): capacity and RTE trend from routine cycles and annual tests, auxiliary load versus ambient with a fouling indicator, availability log split by cause, and a warranty-conditions report (cell temperature, C-rate, SoC rest, cycles against the cap). No state-of-health modelling and no safety prediction in v0.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "When to build it",
          md: md`Build the v0 only when three things are true: Mizan is the service or integration partner on at least one operating battery, the owner has data rights, and the soiling pilot is not short of engineering time. Until then, the right output is the data-rights clause and a one-page spec, not code.`,
        },
        { kind: "xref", to: "m12-l01", note: "Track 0: monitoring systems and KPIs for operating plants; availability definitions and reporting." },
        { kind: "xref", to: "fc02-l05", note: "Founder Core: prioritisation and roadmaps, to weigh the BESS add-on against the soiling roadmap." },
        {
          kind: "question",
          question: {
            id: "mz08-l04-p1",
            type: "short",
            prompt: md`Write the one-page product decision memo for Mizan's engineering partners: should Mizan build a BESS analytics add-on in the next six months? State the decision, the scope (if any), what is out of scope, the preconditions and the metric that would trigger building more.`,
            rubric: [
              "Makes a clear decision tied to preconditions (a service or integration role on an operating BESS, owner data rights, no harm to the soiling pilot)",
              "Scopes from transferable capabilities (pipeline, capacity and RTE trends, auxiliaries vs ambient with fouling, availability, warranty-conditions report)",
              "Excludes non-transferable work explicitly (SoH estimation, safety prediction, EMS control, market optimisation) and says partner or skip",
              "Quantifies the value with labelled illustrative numbers and recognises it is an add-on at single-plant scale",
              "Defines a measurable trigger for further investment (for example number of MWh under service with data rights, or a paying owner)",
            ],
            modelAnswer: md`**Decision: do not build a BESS analytics product in the next six months; write the spec and the data-rights clause now, and build a v0 only when the trigger is met.** **Why:** at one 300 MWh plant the quantified value is about USD 0.12 m a year (augmentation deferral plus auxiliary savings, illustrative), so a price near USD 30k a year; it only pays on top of our existing pipeline, on plants where we are the service or integration partner, and at programme scale. The soiling pilot at Shagaya is our priority and takes all current engineering time. **v0 scope when triggered:** reuse the soiling pipeline; capacity and RTE trend from routine cycles and annual tests; auxiliary load versus ambient with a coil and filter fouling indicator (our dust expertise); availability log split by cause; warranty-conditions report against the contract (cell temperature, C-rate, SoC rest, cycles versus cap). **Out of scope:** state-of-health modelling from cell data, thermal-runaway prediction, any write access to the EMS, dispatch or market optimisation; we partner with a battery-analytics specialist if an owner needs SoH. **Preconditions:** owner data rights in the supply contract (rack-level BMS, PCS, HVAC data, third-party analysis allowed), Mizan named as service or integration partner. **Trigger:** at least 500 MWh of operating BESS under a Mizan service or integration role with data rights, or one owner willing to pay for the v0 report. **Now:** add the data-rights clause to every supply term sheet and keep a one-page spec ready.`,
            explanation: md`A good memo uses the transfer matrix, the value arithmetic and the data-rights gate, and protects the core product.`,
            concepts: ["mz08.transferable-stack", "mz08.non-transferable", "mz08.analytics-value", "mz08.data-rights"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["mz08-r9"] },
      ],
    },
  ],
  quiz: [
    {
      id: "mz08-l04-q1",
      type: "multi",
      prompt: md`Which capabilities transfer directly from a soiling analytics stack to BESS? (Select all.)`,
      options: [
        "Plant data pipeline and tag handling",
        "Expected-versus-actual models with temperature correction",
        "Electrochemical state-of-health estimation from cell data",
        "Change-point detection",
        "Thermal-runaway early warning",
      ],
      answer: [0, 1, 3],
      explanation: md`Pipelines, residual models and change detection are method-level skills. SoH estimation and safety prediction need cell physics, OEM data and safety certification.`,
      concepts: ["mz08.transferable-stack", "mz08.non-transferable"],
      difficulty: 1,
    },
    {
      id: "mz08-l04-q2",
      type: "mcq",
      prompt: md`Why is market dispatch optimisation worth little for a battery in Kuwait today?`,
      options: [
        "Batteries cannot dispatch in Kuwait",
        "There is a single buyer and no wholesale or ancillary market, so value comes from availability at the peak and longevity",
        "Kuwait bans software in power plants",
        "Kuwaiti batteries only do frequency response",
      ],
      answer: 1,
      explanation: md`Without prices to arbitrage, the operational levers (availability, augmentation timing, auxiliaries, warranty evidence) dominate.`,
      concepts: ["mz08.analytics-value"],
      difficulty: 1,
    },
    {
      id: "mz08-l04-q3",
      type: "numeric",
      prompt: md`An augmentation would cost USD 3.0 m now. Prices fall 4 %/yr and the discount rate is 9 %. What is the present-value saving (USD m) of deferring it one year?`,
      answer: 0.358,
      tolerance: { rel: 0.02 },
      unit: "USD m",
      explanation: md`$3.0 \times (1 - 0.96/1.09) = 3.0 \times 0.1193 = 0.358$ m.`,
      concepts: ["mz08.analytics-value"],
      difficulty: 2,
    },
    {
      id: "mz08-l04-q4",
      type: "mcq",
      prompt: md`What is the main gate for independent BESS analytics on an operating plant?`,
      options: [
        "Cloud hosting cost",
        "The owner's contractual right to rack- or cell-level BMS data and to third-party analysis without voiding the warranty",
        "Grid code approval",
        "The number of data scientists",
      ],
      answer: 1,
      explanation: md`Without data rights there is nothing to analyse, and integrators rarely grant them after the contract is signed.`,
      concepts: ["mz08.data-rights"],
      difficulty: 1,
    },
    {
      id: "mz08-l04-q5",
      type: "numeric",
      prompt: md`A plant uses 30 MWh/day of auxiliary energy. Analytics-led fixes save 8 % year-round, valued at USD 85/MWh. What is the annual saving in USD k?`,
      answer: 74.46,
      tolerance: { rel: 0.01 },
      unit: "USD k/yr",
      explanation: md`$0.08 \times 30 \times 365 = 876$ MWh; $876 \times 85 = 74{,}460$ USD.`,
      concepts: ["mz08.analytics-value"],
      difficulty: 1,
    },
    {
      id: "mz08-l04-q6",
      type: "decision",
      prompt: md`An investor asks: "Will you sell BESS analytics too?" Which answer is strongest?`,
      options: [
        { text: "Yes, our AI handles any asset", score: 0, feedback: "Overclaims and invites a hard technical follow-up you cannot win." },
        { text: "Some methods transfer (pipelines, expected-vs-actual, auxiliaries and dust fouling); we will add a thin layer where we are the service partner and have data rights, and partner for state-of-health. Soiling stays the core.", score: 1, feedback: "Honest, specific and shows product discipline." },
        { text: "No, batteries are unrelated", score: 0.3, feedback: "Undersells real synergies in data, relationships and dust." },
        { text: "We will build a full battery-analytics product this year", score: 0.1, feedback: "Dilutes focus before the soiling pilot is proven." },
      ],
      explanation: md`Show where the stack transfers, where it does not, and how the business decides.`,
      concepts: ["mz08.transferable-stack", "mz08.non-transferable"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz08-l04-f1", front: "Transfers from soiling analytics to BESS", back: "Pipelines, expected-vs-actual with temperature correction, change detection, M&V, dust fouling of equipment, owner relationships", concepts: ["mz08.transferable-stack"] },
    { id: "mz08-l04-f2", front: "Does not transfer", back: "Electrochemical SoH estimation, thermal-runaway prediction, real-time EMS control, market optimisation", concepts: ["mz08.non-transferable"] },
    { id: "mz08-l04-f3", front: "Four value levers in Kuwait", back: "Augmentation timing, auxiliary energy, warranty and LTSA evidence, availability accounting", concepts: ["mz08.analytics-value"] },
    { id: "mz08-l04-f4", front: "Deferral value formula", back: md`$\Delta V = C_{aug}\,(1 - (1-g)/(1+r))$`, concepts: ["mz08.analytics-value"] },
    { id: "mz08-l04-f5", front: "The gate for BESS analytics", back: "Owner data rights written into the supply contract, including third-party analysis without voiding the warranty", concepts: ["mz08.data-rights"] },
    { id: "mz08-l04-f6", front: "Scale of the add-on (illustrative 300 MWh plant)", back: "About USD 0.12 m/yr of value; about USD 30k/yr price: an add-on, not a business on its own", concepts: ["mz08.analytics-value"] },
  ],
};

export default lesson;
