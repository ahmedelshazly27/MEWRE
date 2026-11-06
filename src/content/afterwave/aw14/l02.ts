import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw14-l02",
  title: "Pricing test platforms and test-as-a-service: hardware margin, test-hour pricing and data rights",
  summary:
    "The economics of Afterwave's later instrumented test platforms: pricing a hardware sale from landed cost and target margin with attached software, pricing test-as-a-service per test hour from capex, utilisation and fixed costs, breakeven utilisation, and the data rights that decide whether every test hour feeds bench memory.",
  minutes: 75,
  objectives: [
    "Price an instrumented test platform from landed cost and a target hardware margin, and compute the blended margin with attached software",
    "Compute cost per billable test hour, EBIT, breakeven utilisation and payback for a test-as-a-service rig",
    "Choose between selling, leasing and operating a platform as a service for a given customer",
    "Draft data-rights terms that keep customer raw data the customer's while letting bench memory learn",
  ],
  concepts: [
    { id: "aw14.hardware-price", name: "Hardware price from landed cost and margin", description: "Price = landed cost / (1 - target gross margin), where landed cost includes BOM, assembly, test, freight, duty and warranty provision.", competency: "aw-business", related: ["fc06.hardware-economics"] },
    { id: "aw14.test-hour-economics", name: "Test-hour economics", description: "Cost per billable hour = (annualised capex + fixed cost) / (available hours x utilisation) + variable cost per hour; utilisation is the main lever.", competency: "aw-business", related: ["aw14.hardware-price"] },
    { id: "aw14.breakeven-utilisation", name: "Breakeven utilisation", description: "The utilisation at which test-hour contribution covers annualised capex and fixed costs: U* = (C_cap/L + C_fix) / (H_av (p - c_v)).", competency: "aw-business", related: ["aw14.test-hour-economics"] },
    { id: "aw14.data-rights-pricing", name: "Data rights as a priced term", description: "Who owns raw test data, who may use derived or aggregated data and models; rights to learn from de-identified data are a term you can price, not a default you can assume.", competency: "aw-business", related: ["fc08.data-rights"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Three ways to sell a test platform",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Step 4 of the product vision is Afterwave's own hardware test platforms, for example a generalised actuator test platform that ships instrumented and feeds bench memory from day one. That turns a software company into a partly hardware company: different margins, working capital, and a choice between selling rigs, leasing them and running them as a service. You will have to defend the economics to investors before the first platform exists, and the go/no-go memo in the capstone depends on them.`,
        },
        {
          kind: "md",
          md: md`Module 9 (Test platform engineering) covers what is inside a platform: dynamometers, load cells, environmental chambers, calibration chains and interlocks. Here the question is commercial: **how is it paid for?**

| Model | Customer pays | Afterwave's revenue | Margin profile | Who carries utilisation risk |
|---|---|---|---|---|
| **Sell the platform** | Capex up front, plus software subscription | One-off hardware + recurring software | Hardware 30 to 45 % (illustrative target), software 80 %+ | Customer |
| **Lease / platform-as-a-subscription** | Monthly fee over 3 to 5 years | Recurring, financed by Afterwave or a lessor | Blended; needs balance sheet or a leasing partner | Customer (fixed fee), Afterwave carries asset and residual value |
| **Test-as-a-service (TaaS)** | Per test hour or per test campaign | Recurring if contracted, otherwise project revenue | Depends on utilisation | **Afterwave** |

### Pricing a hardware sale

Price from **landed cost**, never BOM alone:`,
        },
        { kind: "equation", formula: "aw14-hardware-price" },
        {
          kind: "md",
          md: md`Landed cost includes the bill of materials, assembly, calibration and acceptance test, freight, import duty, installation and a **warranty provision** from unit one. Then attach the software: every platform ships with Lockstep and Ripple licences, so a hardware sale creates recurring revenue on the same rig. Investors will value the two streams separately (Founder Core covers blended margin and the cash conversion cycle).`,
        },
        { kind: "xref", to: "fc06.hardware-economics", note: "Founder Core: landed cost, blended margin, inventory and the cash conversion cycle of a hardware line." },
        {
          kind: "md",
          md: md`### Pricing test-as-a-service

When Afterwave operates the rig and sells test hours, cost per billable hour is:`,
        },
        { kind: "equation", formula: "aw14-test-hour-cost" },
        {
          kind: "md",
          md: md`and the annual operating result and the breakeven utilisation follow directly:`,
        },
        { kind: "equation", formula: "aw14-taas-ebit" },
        { kind: "equation", formula: "aw14-breakeven-utilisation" },
        {
          kind: "md",
          md: md`Utilisation $U$ is the dominant lever: fixed and capital costs are spread over billable hours, so the same rig can lose money at 25 % and earn a strong margin at 60 %. Utilisation depends on things a software founder underestimates: changeover time between customers' devices under test, calibration downtime, fixture design, and the customer's own schedule slipping.

### Data value, and why it is not revenue

Every hour on an Afterwave platform produces synchronised, labelled bench data. That is the strategic reason to build platforms: they feed bench memory and make Ripple and local models better. But the data only has value to Afterwave **if the contract grants rights to use it**, and even then it is an option on future product quality, not revenue to put in the model.`,
        },
        {
          kind: "widget",
          widget: "platform-economics",
          caption: "Actuator test platform economics: vary capex, life, availability, utilisation, price per test hour, variable and fixed costs, and see EBIT vs utilisation, breakeven utilisation and payback.",
        },
        {
          kind: "matrix",
          title: "Which model for which customer",
          xAxis: ["Customer has low or irregular test volume", "Customer has high, steady test volume"],
          yAxis: ["Customer has lab, staff and capex budget", "Customer has no lab or capex budget"],
          cells: [
            { label: "TaaS campaigns or short lease", detail: "Do not sell a rig that sits idle; sell the campaign" },
            { label: "Sell the platform + software", detail: "Customer carries utilisation; you earn hardware margin and recurring software" },
            { label: "Test-as-a-service", detail: "Afterwave runs the rig; price per hour or campaign; you carry utilisation" },
            { label: "Lease (platform-as-a-subscription)", detail: "Recurring fee; needs financing or a leasing partner" },
          ],
          caption: "Top-left and bottom-left both point to service; the difference is whether the customer could ever run it themselves.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Pricing an actuator test platform both ways",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Selling three actuator platforms with software attached (illustrative)",
          given: md`Illustrative, no real quotes. Landed cost per platform: BOM EUR 140k, assembly and calibration EUR 20k, freight and duty EUR 8k, warranty provision EUR 12k. Target hardware gross margin **35 %**. Software per platform: Lockstep + Ripple **EUR 10k/yr**; one platform fee of **EUR 40k/yr** per customer site. Software gross margin **85 %**. A humanoid company buys **3 platforms**.`,
          steps: [
            { md: md`**Landed cost:** $140 + 20 + 8 + 12 =$ EUR 180k per platform.` },
            { md: md`**Price:** $P = 180/(1 - 0.35) = 276.9$, quote **EUR 277k** per platform. Hardware revenue $3\times277 =$ EUR 831k; gross profit $831 - 540 =$ EUR 291k (35.0 %).` },
            { md: md`**Software:** $40 + 3\times10 =$ EUR 70k/yr, gross profit $0.85\times70 = 59.5$ EUR k.` },
            { md: md`**Year 1 blended margin:** $(291 + 59.5)/(831 + 70) = 350.5/901 = 38.9\%$. From year 2 only the EUR 70k software line recurs, at 85 %.` },
            { md: md`**Cash:** if the BOM is paid 90 days before delivery and the customer pays 60 days after, Afterwave finances EUR 540k of cost for about 150 days. Ask for a **30 to 50 % deposit** on order.` },
          ],
          result: md`Year 1 looks like a hardware company (39 % blended margin, EUR 540k of working capital); the recurring EUR 70k is what an investor will value as ARR. That is why the platform should be justified by the software and data it pulls in, not by its hardware margin.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Running one platform as a service (illustrative)",
          given: md`Illustrative. Capex **EUR 400k**, life **5 years** (straight line). Available hours **6,000 per year** (after maintenance and calibration). Fixed costs **EUR 120k/yr** (lab space, share of a technician, calibration, insurance). Variable cost **EUR 25 per hour** (energy, wear parts, consumables). Price **EUR 140 per billable hour**. Expected utilisation **60 %**.`,
          steps: [
            { md: md`**Annualised capex:** $400/5 =$ EUR 80k/yr. Billable hours $6{,}000\times0.6 = 3{,}600$.` },
            { md: md`**Cost per billable hour:** $(80 + 120)\text{k}/3{,}600 + 25 = 55.6 + 25 =$ **EUR 80.6**.` },
            { md: md`**EBIT:** $3{,}600\times(140 - 25) - 200\text{k} = 414 - 200 =$ **EUR 214k/yr**.` },
            { md: md`**Breakeven utilisation:** $U^* = 200{,}000/(6{,}000\times115) = 0.290$, so **29.0 %**.` },
            { md: md`**Simple payback** (pre-tax, ignoring working capital): annual cash $= 214 + 80 =$ EUR 294k; $400/294 = 1.36$ years.` },
          ],
          result: md`At 60 % utilisation the rig pays back in under 1.5 years with a large margin of safety (breakeven at 29 %). The risk is utilisation, not price: model 30 % and 45 % cases before committing capex.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A competitor undercuts the hourly price",
          given: md`Same rig (illustrative). A test house offers EUR 110 per hour. You match.`,
          steps: [
            { md: md`New contribution per hour $= 110 - 25 = 85$ EUR.` },
            { md: md`Breakeven utilisation $= 200{,}000/(6{,}000\times85)$ = **39.2 %**.`, hidden: true, check: { prompt: "Breakeven utilisation at EUR 110/h (%)", answer: 39.2, unit: "%", tolerance: { abs: 0.2 } } },
            { md: md`EBIT at 60 % utilisation $= 3{,}600\times85 - 200{,}000$ = **EUR 106k**.`, hidden: true, check: { prompt: "EBIT at 60 % utilisation (EUR k)", answer: 106, unit: "EUR k", tolerance: { abs: 0.5 } } },
          ],
          result: md`A 21 % price cut halves EBIT and raises breakeven utilisation by 10 points. Instead of matching, differentiate: price per **test campaign** with an Afterwave evidence report (synchronised data, Ripple analysis, traceable to requirements), which the test house cannot offer.`,
        },
        {
          kind: "question",
          question: {
            id: "aw14-l02-p1",
            type: "numeric",
            prompt: md`Illustrative: landed cost EUR 150k, target hardware gross margin 40 %. What price should you quote (EUR k)?`,
            answer: 250,
            tolerance: { abs: 0.5 },
            unit: "EUR k",
            explanation: md`$P = 150/(1 - 0.40) = 250$ EUR k. A common error is $150\times1.4 = 210$, which is a 40 % markup and only a 28.6 % margin.`,
            concepts: ["aw14.hardware-price"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Service terms and data rights in practice",
      blocks: [
        {
          kind: "md",
          md: md`### How TaaS is contracted

- **Unit of sale:** test hours (with a minimum block), or a **test campaign** with a fixed price for a defined test plan, device under test, fixtures and report. Campaign pricing moves changeover and fixture risk into your estimate, so price it in.
- **Fixtures and adapters** for each customer's actuator or drive are usually charged separately (non-recurring engineering).
- **Scheduling:** reservation fees or take-or-pay blocks protect utilisation; cancellation inside 2 weeks is charged.
- **Liability:** destructive or endurance tests can damage the customer's prototype; cap liability and define who insures the device under test.
- **Evidence:** the deliverable is not just data but a traceable test record (calibration certificates, configuration, synchronised logs). That is what a Machinery Regulation technical file or a notified body will look at.

### Data rights: the term that decides the strategy

| Data layer | Typical customer position | Afterwave position to negotiate |
|---|---|---|
| Raw signals and video of their device | Ours, confidential | Agree: customer owns it; stored in their Enclave or deleted after delivery |
| Test results and reports | Ours | Agree |
| Derived, de-identified statistics (for example rig behaviour, sensor drift, failure signatures not linked to the device) | Often unclear | Licence to use for improving Afterwave products, with no re-identification and no sharing of customer-specific data |
| Models trained on their data | Ours, or at least not usable for competitors | Customer-specific models stay with the customer; general model improvements from de-identified data stay with Afterwave |

Price it explicitly: for example a lower hourly rate or a free Ripple year in exchange for the de-identified-data licence. A data right won through vague wording will be challenged in the customer's security review or in diligence.`,
        },
        { kind: "xref", to: "fc08.data-rights", note: "Founder Core: data ownership and licence clauses in customer agreements." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Pricing from BOM:** forgetting assembly, calibration, freight, duty and warranty turns a 35 % plan into a 15 % reality.
- **Markup confused with margin:** cost times 1.4 is a 28.6 % margin, not 40 %.
- **Utilisation from a spreadsheet:** 80 % utilisation assumed, 35 % achieved because of fixture changeovers and customers' slipped prototypes.
- **Hardware revenue counted as ARR** in the deck.
- **Data rights assumed:** a platform installed at a customer feeds nothing to bench memory if the contract says all data is the customer's.`,
        },
        {
          kind: "checklist",
          title: "Before you quote a test platform or a TaaS campaign",
          items: [
            "Landed cost per platform with warranty provision, from a real supplier quote",
            "Target margin stated as margin, not markup",
            "Software attach priced per platform and per site",
            "Deposit and payment terms that cover the BOM lead time",
            "TaaS: available hours after calibration and maintenance, realistic utilisation cases (30, 45, 60 %)",
            "Fixture NRE and cancellation terms",
            "Data rights for raw, derived and model layers written down and priced",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw14-l02-p2",
            type: "short",
            prompt: md`Write a **one-page offer** for an actuator test campaign that Afterwave would run on its own platform for a robotics customer: unit of sale and price (hours or campaign), what is included (fixtures, report, evidence), scheduling and cancellation, liability for the device under test, and data rights for raw, derived and model layers. State the utilisation and cost assumptions behind your price (illustrative) and the breakeven utilisation.`,
            rubric: [
              "Defines the unit of sale (campaign or hour block) and a price with a stated basis in cost per billable hour",
              "Separates fixture NRE from the campaign price and lists the deliverables, including a traceable test record",
              "Includes scheduling, minimum block or take-or-pay and cancellation terms that protect utilisation",
              "Caps liability and assigns insurance for the device under test",
              "Data rights split by raw, derived de-identified and model layers, with what Afterwave may use and a price trade for it",
              "States illustrative utilisation and cost assumptions and computes breakeven utilisation correctly",
            ],
            modelAnswer: md`**Offer: actuator endurance and characterisation campaign (illustrative)**

**Unit:** fixed-price campaign of 300 test hours on one Afterwave actuator platform within 6 weeks: **EUR 48,000** (EUR 160/h equivalent), plus fixture NRE EUR 6,000 (adapter plate and coupling for the customer's joint actuator).

**Included:** test plan review, calibration certificates for load cell and torque sensor, synchronised Lockstep capture (rig signals and operator actions on one clock), a Ripple analysis of which tests to rerun after the customer's next firmware change, and a traceable test report suitable for a technical file.

**Scheduling:** slot reserved on signature with 30 % deposit; cancellation within 14 days of the slot is charged at 50 %.

**Liability:** Afterwave's liability capped at the campaign fee; the device under test remains at the customer's risk and is insured by the customer; destructive tests listed in the plan.

**Data:** raw signals, video and reports are the customer's, delivered and then deleted after 90 days unless they buy Enclave. Afterwave may use derived, de-identified rig statistics (sensor drift, rig behaviour, failure signatures not linked to the device) to improve its products. Customer-specific models stay with the customer. Without this licence, the price is EUR 175/h.

**Assumptions (illustrative):** capex EUR 400k over 5 years, fixed EUR 120k/yr, variable EUR 25/h, 6,000 available hours. Breakeven at EUR 160/h: $U^* = 200{,}000/(6{,}000\times135) = 24.7\%$. Planned utilisation 50 %.`,
            explanation: md`A strong offer prices the campaign from the cost per hour and utilisation, protects the schedule, and makes the data licence an explicit, priced term.`,
            concepts: ["aw14.test-hour-economics", "aw14.breakeven-utilisation", "aw14.data-rights-pricing"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw14-l02-q1",
      type: "numeric",
      prompt: md`Landed cost EUR 200k, target gross margin 30 %. Quote price (EUR k, 1 decimal)?`,
      answer: 285.7,
      tolerance: { abs: 0.2 },
      unit: "EUR k",
      explanation: md`$200/0.7 = 285.7$ EUR k.`,
      concepts: ["aw14.hardware-price"],
      difficulty: 1,
    },
    {
      id: "aw14-l02-q2",
      type: "numeric",
      prompt: md`A TaaS rig: annualised capex EUR 60k, fixed costs EUR 90k/yr, 5,000 available hours, price EUR 120/h, variable EUR 20/h. What is the breakeven utilisation (%)?`,
      answer: 30,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$U^* = 150{,}000/(5{,}000\times100) = 0.30$.`,
      concepts: ["aw14.breakeven-utilisation"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "aw14-l02-q3",
      type: "numeric",
      prompt: md`Same rig at 50 % utilisation. What is the cost per billable hour (EUR)?`,
      answer: 80,
      tolerance: { abs: 0.5 },
      unit: "EUR/h",
      explanation: md`Billable hours 2,500. $(60 + 90)\text{k}/2{,}500 + 20 = 60 + 20 = 80$ EUR.`,
      concepts: ["aw14.test-hour-economics"],
      difficulty: 2,
    },
    {
      id: "aw14-l02-q4",
      type: "mcq",
      prompt: "In which business model does Afterwave carry the utilisation risk?",
      options: ["Selling the platform", "A fixed monthly lease", "Test-as-a-service", "Software subscription on customer rigs"],
      answer: 2,
      explanation: md`In TaaS, idle hours are Afterwave's cost. In a sale or fixed lease, the customer pays whether the rig runs or not.`,
      concepts: ["aw14.test-hour-economics"],
      difficulty: 1,
    },
    {
      id: "aw14-l02-q5",
      type: "multi",
      prompt: "Which belong in landed cost for a hardware platform? (Select all.)",
      options: ["Bill of materials", "Assembly and calibration", "Freight and import duty", "Warranty provision", "Sales commission"],
      answer: [0, 1, 2, 3],
      explanation: md`Commission is a sales and marketing cost (CAC), not cost of goods. Warranty is provisioned from unit one.`,
      concepts: ["aw14.hardware-price"],
      difficulty: 1,
    },
    {
      id: "aw14-l02-q6",
      type: "decision",
      prompt: md`A customer will buy test campaigns only if all data, including derived statistics, belongs to them and is deleted after delivery. What do you do?`,
      options: [
        { text: "Refuse the deal: bench memory is the strategy.", score: 0.3, feedback: "Too rigid for an early customer; revenue and a reference still matter." },
        { text: "Accept at a higher rate that reflects no data licence, document it, and offer the lower rate with a de-identified-data licence as an option.", score: 1, feedback: "Makes the data right an explicit, priced choice; keeps the deal and the principle." },
        { text: "Accept and include broad data-use wording in the general terms anyway.", score: 0, feedback: "Bad faith; it will surface in their security review or in diligence and cost the account." },
      ],
      explanation: md`Data rights are a term to price, not a default to sneak in.`,
      concepts: ["aw14.data-rights-pricing"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw14-l02-f1", front: "Hardware price from target margin", back: "$P = C_{landed}/(1-m)$. Cost x 1.4 is a 28.6 % margin, not 40 %.", concepts: ["aw14.hardware-price"] },
    { id: "aw14-l02-f2", front: "Cost per billable test hour", back: "(annualised capex + fixed) / (available hours x utilisation) + variable per hour.", concepts: ["aw14.test-hour-economics"] },
    { id: "aw14-l02-f3", front: "Breakeven utilisation", back: "$U^* = (C_{cap}/L + C_{fix})/(H_{av}(p - c_v))$.", concepts: ["aw14.breakeven-utilisation"] },
    { id: "aw14-l02-f4", front: "Sell vs lease vs TaaS: who carries utilisation risk?", back: "Sell and fixed lease: customer. TaaS: Afterwave.", concepts: ["aw14.test-hour-economics"] },
    { id: "aw14-l02-f5", front: "Three data layers to negotiate", back: "Raw data (customer's), derived de-identified statistics (licence to Afterwave, priced), models (customer-specific stay with customer).", concepts: ["aw14.data-rights-pricing"] },
    { id: "aw14-l02-f6", front: "Why platforms at all?", back: "They feed bench memory from day one and pull in recurring software; hardware margin alone does not justify them.", concepts: ["aw14.hardware-price", "aw14.data-rights-pricing"] },
  ],
};

export default lesson;
