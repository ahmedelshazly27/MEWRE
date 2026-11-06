import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw09-l06",
  title: "Test-as-a-service economics",
  summary:
    "The economics of owning and running test platforms: capex and depreciation, availability and utilisation, price per test hour, breakeven utilisation and payback, the customer's own-versus-buy calculation, spares and inventory as availability decisions, and the support model, with the platform-economics widget.",
  minutes: 75,
  objectives: [
    "Compute available hours, sold hours, EBIT, breakeven utilisation and payback for a rig",
    "Explain why utilisation and contribution per hour, not headline price, drive a test lab's profit",
    "Compute a customer's own-versus-buy crossover and use it to target the right customers",
    "Decide on critical spares from MTBF, MTTR, lost contribution and carrying cost",
    "Compare business models for test platforms: selling rigs, selling test hours, leasing instrumented rigs",
  ],
  concepts: [
    { id: "aw09.utilisation", name: "Availability and utilisation", description: "Available hours are what the rig can run; sold hours are what customers pay for. Changeovers, fixtures, waiting and staffing sit in between.", competency: "aw-platforms" },
    { id: "aw09.breakeven-utilisation", name: "Breakeven utilisation and payback", description: "The utilisation at which contribution covers fixed cost and depreciation, and the years of operating cash needed to recover capex.", competency: "aw-platforms", related: ["aw09.utilisation"] },
    { id: "aw09.test-hour-pricing", name: "Pricing per test hour", description: "Floor from full cost per sold hour at realistic utilisation; ceiling from the customer's own cost and the value of faster results; fixtures and setup billed separately.", competency: "aw-business", related: ["aw09.breakeven-utilisation"] },
    { id: "aw09.own-vs-buy", name: "Customer own-versus-buy", description: "A customer's cost per hour of owning a rig falls with their usage; below the crossover usage, buying hours is cheaper.", competency: "aw-business", related: ["aw09.test-hour-pricing"] },
    { id: "aw09.spares-strategy", name: "Spares and inventory strategy", description: "Critical spares turn long lead-time failures into short swaps; justified when expected lost contribution exceeds the carrying cost.", competency: "aw-platforms" },
    { id: "aw09.platform-business-models", name: "Platform business models", description: "Sell rigs (capex sale plus service), sell test hours (test-as-a-service), or lease instrumented rigs with software, calibration and support bundled.", competency: "aw-business", related: ["aw09.own-vs-buy"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The economics of a rig",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`A hardware platform changes Afterwave's financial shape: capex before revenue, inventory, field support and lower gross margins than software. Investors will ask whether the platform is a business or a demo, and the answer is a breakeven utilisation and a payback, not a vision. You also need the customer's side of the arithmetic to know which teams should buy hours from you and which should buy a rig (or just Lockstep for their own rigs). Numbers in this lesson are in USD to match the widget, and all are illustrative.`,
        },
        {
          kind: "md",
          md: md`### From calendar hours to sold hours`,
        },
        { kind: "equation", formula: "aw09-available-hours" },
        {
          kind: "flow",
          title: "Where the hours go (one rig, one year)",
          steps: [
            { label: "Calendar", detail: "8,760 h" },
            { label: "Available", detail: "Minus faults, maintenance, calibration: 85 % gives 7,446 h" },
            { label: "Staffed or safely unattended", detail: "One shift is about 2,000 h; unattended runs need the safety layer of lesson 5" },
            { label: "Setup and changeover", detail: "Mounting, alignment, fixture builds, commissioning a new DUT" },
            { label: "Sold", detail: "Billable test hours: 35 % of available is 2,606 h" },
          ],
          caption: "Most test labs' profit is decided between 'available' and 'sold'. Changeover time, fixture design and the ability to run unattended are the operational levers.",
        },
        {
          kind: "md",
          md: md`### Profit, breakeven and payback`,
        },
        { kind: "equation", formula: "aw09-platform-ebit" },
        { kind: "equation", formula: "aw09-breakeven-utilisation" },
        { kind: "equation", formula: "aw09-platform-payback" },
        {
          kind: "widget",
          widget: "platform-economics",
          caption: "Start from the widget defaults (USD 450k rig, 5-year life, 85 % availability, 45 % utilisation, USD 150/h, USD 40/h variable, USD 80k fixed): breakeven is about 21 %. Then enter the worked example below (USD 600k, 6 years, 35 %, USD 220/h, USD 70/h, USD 180k) and move utilisation and price to see which matters more.",
        },
        {
          kind: "chart",
          chart: "line",
          title: "Rig EBIT vs utilisation at two prices (worked example cost base)",
          xKey: "u",
          xLabel: "Utilisation (% of available hours sold)",
          yLabel: "EBIT (USD k per year)",
          series: [
            { key: "p220", label: "USD 220/h (contribution 150)" },
            { key: "p180", label: "USD 180/h (contribution 110)" },
          ],
          data: [
            { u: 10, p220: -168.3, p180: -198.1 },
            { u: 20, p220: -56.6, p180: -116.2 },
            { u: 30, p220: 55.1, p180: -34.3 },
            { u: 40, p220: 166.8, p180: 47.6 },
            { u: 50, p220: 278.4, p180: 129.5 },
            { u: 60, p220: 390.1, p180: 211.4 },
            { u: 70, p220: 501.8, p180: 293.3 },
          ],
          caption: "Fixed cost plus depreciation of USD 280k/yr. A USD 40 price cut removes 27 % of contribution per hour and moves breakeven from 25 % to 34 % utilisation.",
        },
        {
          kind: "md",
          md: md`### The customer's side`,
        },
        { kind: "equation", formula: "aw09-own-cost-per-hour" },
        {
          kind: "md",
          md: md`Teams that need a rig class occasionally (a few hundred hours a year, for a qualification campaign or a design iteration) pay far more per hour to own one than to buy hours. Teams that run the same rig class all year should own rigs, and are better customers for Lockstep, Enclave and Ripple than for test hours. Test-as-a-service is a segment, not the market.

### Spares are an availability decision`,
        },
        { kind: "equation", formula: "aw09-availability" },
        {
          kind: "md",
          md: md`| Business model | Revenue | Capex and inventory | Margin profile | Fit for Afterwave |
|---|---|---|---|---|
| **Sell rigs** | Lumpy hardware sales plus service contracts | Inventory and work in progress, warranty | Hardware margins, service recurring | Competes with established rig makers; capital-heavy |
| **Sell test hours** (test-as-a-service) | Per hour or per campaign, plus fixture NRE | Afterwave owns the rigs | Driven by utilisation | Proves the platform and fills bench memory, but a services business |
| **Lease instrumented rigs** | Monthly fee: rig, calibration, spares, software | Afterwave owns, customer operates | Recurring, asset-backed | Closest to infrastructure; financing and support heavy |
| **Software on customer rigs** | Subscription (Lockstep, Enclave, Ripple) | None | Software margins | The core business; platforms must strengthen it |`,
        },
        { kind: "xref", to: "fc06-l03", note: "Blended hardware and software gross margin, inventory and the cash conversion cycle: how a platform line changes Afterwave's financial profile." },
        { kind: "xref", to: "fc06-l02", note: "Unit economics (CAC, payback, contribution margin) for the software side that the platform must feed." },
        { kind: "xref", to: "m10-l01", note: "NPV and IRR for the real investment decision; straight-line depreciation here is only a screening proxy." },
      ],
    },
    {
      layer: "applied",
      title: "A business case for one actuator platform",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Actuator platform run as test-as-a-service (illustrative)",
          given: md`Illustrative, not a plan. One instrumented actuator platform (rig, torque motor and drives, transducers, DAQ with Lockstep, safety system, enclosure, integration and commissioning): capex **USD 600k**, depreciated over **6 years**. Availability **85 %**. Utilisation **35 %**. Price **USD 220** per test hour; variable cost **USD 70/h** (technician share, energy, wear parts, consumables). Fixed cost **USD 180k/yr** (lab space, calibration, maintenance, 0.5 FTE rig engineer, insurance, software). Fixture design for each new DUT billed separately as NRE.`,
          steps: [
            { md: md`**Hours.** $H_a = 8{,}760 \times 0.85 = 7{,}446$ h; $H_s = 7{,}446 \times 0.35 = 2{,}606$ h. Revenue $= 2{,}606 \times 220 = $ USD 573k.` },
            { md: md`**EBIT.** Contribution $2{,}606 \times 150 = 390.9$k; depreciation $600/6 = 100$k; $EBIT = 390.9 - 180 - 100 = $ **USD 110.9k**, a 19 % EBIT margin on revenue.` },
            { md: md`**Breakeven utilisation.** $U^* = (180 + 100)/(150 \times 7{,}446/1{,}000) = 280/1{,}116.9 = $ **25.1 %**, or 1,867 sold hours a year. The plan has a 10-point utilisation cushion.` },
            { md: md`**Payback.** $600/(390.9 - 180) = 2.84$ years, under half the 6-year life: passes the screen.` },
            { md: md`**Full cost per sold hour** at 35 %: $70 + 280{,}000/2{,}606 = $ USD 177/h. That is the floor; below it every hour loses money at this utilisation.` },
            { md: md`**Customer view.** A team needing 400 h/yr would pay $280{,}000/400 + 70 = $ USD 770/h to own the same rig. Buying at USD 220 wins until $H^* = 280{,}000/150 = 1{,}867$ h/yr. Target customers below that line; above it, sell them Lockstep for their own rig.` },
          ],
          result: md`At 35 % utilisation the platform earns about USD 111k EBIT a year with a 2.8-year payback and a 25 % breakeven utilisation. It is a sound small services business, not a venture-scale one on its own: its strategic value has to come from what it does for the software and bench memory (lesson 7).`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Should we hold a spare torque transducer? (illustrative)",
          given: md`Illustrative. The platform's 250 N·m transducer has an MTBF of **20,000 operating hours** and a replacement lead time of **10 weeks** (1,680 h). A calibrated spare costs **USD 8k** with a carrying cost of **25 %/yr** (capital, recalibration, storage). Swap time with a spare: **16 h**. Utilisation 35 %, contribution USD 150/h.`,
          steps: [
            { md: md`**Availability from this item.** Without spare $20{,}000/21{,}680 = 92.3\,\%$; with spare $20{,}000/20{,}016 = 99.9\,\%$.` },
            { md: md`**Expected failures.** The rig runs about 2,606 h/yr under load: $2{,}606/20{,}000 = 0.13$ failures per year.` },
            { md: md`**Cost of a failure without spare.** 1,680 h down, of which 35 % would have been sold: 588 h at USD 150 = **USD 88.2k** of lost contribution, plus customer goodwill.` },
            { md: md`**Expected annual loss** $0.13 \times 88.2 = $ USD 11.5k, against a carrying cost of $0.25 \times 8 = $ USD 2k. Hold the spare. It also lets the rig stay up while the primary transducer is away for calibration.` },
          ],
          result: md`Hold critical spares for any item whose expected lost contribution exceeds its carrying cost: here roughly 6 to 1 in favour. Typical candidates: transducers, encoders, drive power modules, safety components, DAQ modules and anything with a lead time longer than a few weeks.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Price pressure (illustrative)",
          given: md`Same platform. A large prospect offers 800 h/yr at **USD 180/h** instead of 220. Variable cost stays USD 70/h; fixed plus depreciation USD 280k/yr; 7,446 available hours.`,
          steps: [
            { md: md`New contribution per hour: $180 - 70 = 110$ USD.` },
            { md: md`Breakeven utilisation if all hours were at this price: $280{,}000/(110 \times 7{,}446)$.`, hidden: true, check: { prompt: "Breakeven utilisation at USD 180/h", answer: 34.2, unit: "%", tolerance: { abs: 0.2 } } },
            { md: md`Contribution from the 800 h deal: $800 \times 110$ USD.`, hidden: true, check: { prompt: "Contribution from the deal", answer: 88000, unit: "USD", tolerance: { rel: 0.01 } } },
          ],
          result: md`At USD 180 for everything, breakeven jumps to 34 %. As one anchor deal filling otherwise idle hours it adds USD 88k of contribution, which is attractive only if those hours would really be empty and the discount does not become the list price. Contribution per hour and the counterfactual decide, not the headline.`,
        },
        { kind: "xref", to: "fc04-l07", note: "Pricing, packaging and negotiation: how to structure an anchor-customer discount without resetting the list price." },
      ],
    },
    {
      layer: "field",
      title: "Running a test service",
      blocks: [
        {
          kind: "md",
          md: md`### What test labs actually sell and manage

Independent test labs and in-house shared services quote **per hour** (rig time), **per campaign** (a fixed price for a defined test plan), or a mix, plus **fixture and setup NRE**, **engineering hours** for analysis and reporting, and sometimes **expedite** premiums. They manage a **booking calendar** across rigs, keep **standard fixtures and adapters** to cut changeover, schedule **calibration windows** in low-demand periods, and track utilisation weekly. Contracts specify the test method, the DUT condition, the data delivered, confidentiality, liability limits for DUT damage, and what happens when the DUT fails (a failure is a result, not a lab fault). Support for leased or sold rigs means **field service**, **remote diagnostics**, **calibration logistics** and a **spares pool**, often under an SLA with response and restore times.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Utilisation assumed at 70 % in the plan** when one shift and changeovers cap it near 25 to 35 %. **Fixtures given away** to win the first customers, so every new DUT is unpaid engineering. **No spares**, so one transducer failure takes the rig down for a quarter. **Anchor-customer discount** becomes the list price. **Data rights unclear:** the customer assumes their data never feeds anything else; Afterwave assumes it builds bench memory. Settle this in the contract (aggregate, anonymised, opt-in, or never).`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Data value: real but not bankable yet",
          md: md`The widget has a "data value per hour" slider. Bench data from a well-instrumented platform does have value (training local models, benchmarking actuator classes, priors for Ripple), but it depends on customer consent and on products that use it. Keep it at zero in any base case you show investors, and show it as an upside scenario with the consent model stated.`,
        },
        {
          kind: "checklist",
          title: "Platform business case checks",
          items: [
            "Utilisation derived from staffing, shifts, changeover times and unattended capability, not assumed",
            "Breakeven utilisation and payback stated, with sensitivity to price and utilisation",
            "Fixture and setup NRE priced separately",
            "Critical spares list with lead times and the expected-loss justification",
            "Calibration windows and their effect on availability",
            "Support model and cost per rig per year (service, remote diagnostics, calibration logistics)",
            "Data rights and consent model in the customer contract",
            "Effect on company-level gross margin, working capital and runway",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask prospective test-hour customers",
          items: [
            "How many hours a year do you need on this rig class, and how peaky is the demand?",
            "What does an hour on your own rig cost you, fully loaded?",
            "What is the cost of a week's delay in your qualification schedule?",
            "Which DUT interfaces and fixtures would we need to support?",
            "May anonymised measurements contribute to benchmarks, and under what conditions?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor why a test platform's price per hour matters less than its utilisation, using the breakeven formula.",
          keyPoints: [
            "Fixed cost and depreciation must be covered regardless of hours sold",
            "Each sold hour contributes price minus variable cost",
            "Breakeven utilisation is fixed costs over contribution times available hours",
            "Utilisation multiplies every hour's contribution; small price changes shift breakeven but filling idle hours shifts profit more",
            "Operational levers (changeover, unattended runs, spares) raise utilisation",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw09-l06-p1",
            type: "short",
            prompt: md`Build the one-page unit economics slide for an investor update on a hypothetical first Afterwave actuator platform run as test-as-a-service. Give capex, available and sold hours, price, contribution, EBIT, breakeven utilisation, payback and the customer crossover, with a one-line sensitivity and a one-line statement of what the platform is for strategically. Label everything illustrative.`,
            rubric: [
              "Numbers are internally consistent (EBIT = sold hours x contribution - fixed - depreciation; breakeven and payback computed correctly)",
              "States utilisation assumption with its operational basis (shifts, changeover, unattended runs)",
              "Includes breakeven utilisation, payback and the customer own-versus-buy crossover",
              "Includes a sensitivity to price or utilisation",
              "States the strategic purpose (feeding bench memory, proving Lockstep and Ripple, evidence layer) and keeps data value out of the base case",
              "Labels all numbers illustrative and claims no customers or revenue",
            ],
            modelAnswer: md`**Actuator platform 1: unit economics (illustrative)**

| Item | Value |
|---|---|
| Capex (rig, drives, transducers, DAQ, safety, integration) | USD 600k, 6-year life |
| Available hours (85 %) | 7,446 h/yr |
| Sold hours (35 %: one staffed shift plus approved unattended runs, 16 h changeovers) | 2,606 h/yr |
| Price / variable cost / contribution | USD 220 / 70 / 150 per hour |
| Fixed cost | USD 180k/yr |
| EBIT | USD 111k/yr (19 % of revenue) |
| Breakeven utilisation | 25 % (1,867 h) |
| Simple payback | 2.8 years |
| Customer crossover (own vs buy) | about 1,870 h/yr |

**Sensitivity:** at USD 180/h breakeven rises to 34 %; at 25 % utilisation EBIT is zero.
**Why build it:** every hour runs on Lockstep and lands in bench memory with calibration and uncertainty attached, giving Ripple and local models clean, consented data and making the platform the physical half of the evidence layer. Data value is excluded from the base case.`,
            explanation: md`An investor-grade slide shows the cost base, the utilisation logic, breakeven and payback, a sensitivity and the strategic reason, with every number reproducible from the others.`,
            concepts: ["aw09.breakeven-utilisation", "aw09.utilisation", "aw09.own-vs-buy"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw09-l06-q1",
      type: "numeric",
      prompt: md`A rig has capex USD 900k over 5 years, fixed cost USD 120k/yr, price USD 260/h, variable cost USD 60/h and 90 % availability. What is breakeven utilisation? (%, 1 decimal)`,
      answer: 19,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`Depreciation $900/5 = 180$k; contribution $260 - 60 = 200$ USD/h; $H_a = 8{,}760 \times 0.9 = 7{,}884$ h. $U^* = (120 + 180)/(200 \times 7{,}884/1{,}000) = 300/1{,}576.8 = 19.0\,\%$.`,
      concepts: ["aw09.breakeven-utilisation"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "aw09-l06-q2",
      type: "numeric",
      prompt: md`A customer would need 600 h/yr on a rig that costs USD 250k/yr to own (depreciation plus fixed) with USD 50/h variable cost. What is their full cost per hour of owning it? (USD/h)`,
      answer: 466.7,
      tolerance: { abs: 1 },
      unit: "USD/h",
      explanation: md`$c_{\text{own}} = 250{,}000/600 + 50 = 416.7 + 50 = 466.7$ USD/h.`,
      concepts: ["aw09.own-vs-buy"],
      difficulty: 1,
    },
    {
      id: "aw09-l06-q3",
      type: "numeric",
      prompt: md`An encoder has MTBF 30,000 h; without a spare, restoring takes 6 weeks (1,008 h). What availability does this item allow? (%, 2 decimals)`,
      answer: 96.75,
      tolerance: { abs: 0.02 },
      unit: "%",
      explanation: md`$A = 30{,}000/31{,}008 = 96.75\,\%$. With a 12 h swap from a spare it would be 99.96 %.`,
      concepts: ["aw09.spares-strategy"],
      difficulty: 1,
    },
    {
      id: "aw09-l06-q4",
      type: "mcq",
      prompt: md`Which lever usually moves a test lab's profit most?`,
      options: [
        "A 5 % list price increase",
        "Raising utilisation by cutting changeover time and enabling safe unattended runs",
        "Extending the depreciation life on paper",
        "Buying a cheaper DAQ",
      ],
      answer: 1,
      explanation: md`Utilisation multiplies the contribution of every hour against a fixed cost base. Depreciation life changes accounting, not cash.`,
      concepts: ["aw09.utilisation"],
      difficulty: 1,
    },
    {
      id: "aw09-l06-q5",
      type: "multi",
      prompt: md`Which should be priced separately from rig hours in a test-as-a-service contract? (Select all.)`,
      options: ["Fixture design and manufacture for a new DUT", "Engineering analysis and reporting beyond the standard dataset", "Electricity used during the test", "Expedited scheduling"],
      answer: [0, 1, 3],
      explanation: md`Fixtures, extra engineering and expedites are customer-specific and lumpy; energy is a normal variable cost already in the hourly rate.`,
      concepts: ["aw09.test-hour-pricing"],
      difficulty: 1,
    },
    {
      id: "aw09-l06-q6",
      type: "decision",
      prompt: md`An investor asks: "Why would a software company own rigs at all?" Which answer is strongest?`,
      options: [
        { text: "Hardware has higher revenue per customer", score: 0.2, feedback: "Revenue is not the point, and hardware margins are lower." },
        { text: "A small number of instrumented platforms make Lockstep and Ripple demonstrable, generate clean, consented bench data from day one and become the physical half of the evidence layer; we will only build when committed hours cover most of breakeven", score: 1, feedback: "Strategic purpose plus an explicit economic gate." },
        { text: "Customers keep asking for rigs", score: 0.4, feedback: "Demand matters, but without economics and strategic fit it is a services trap." },
      ],
      explanation: md`The platform must strengthen the software business and meet an economic gate; lesson 7 builds the go/no-go framework.`,
      concepts: ["aw09.platform-business-models"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw09-l06-f1", front: "Breakeven utilisation", back: md`$U^* = (F + C/L)/((p - v) H_a)$.`, concepts: ["aw09.breakeven-utilisation"] },
    { id: "aw09-l06-f2", front: "Available vs sold hours", back: md`$H_a = 8{,}760\,A$; $H_s = H_a U$. One staffed shift is about 2,000 h/yr.`, concepts: ["aw09.utilisation"] },
    { id: "aw09-l06-f3", front: "Customer own-vs-buy crossover", back: md`$H^* = (C/L + F)/(p - v)$: below it, buying test hours is cheaper.`, concepts: ["aw09.own-vs-buy"] },
    { id: "aw09-l06-f4", front: "Availability and spares", back: md`$A = MTBF/(MTBF + MTTR)$; a spare cuts MTTR from weeks to hours.`, concepts: ["aw09.spares-strategy"] },
    { id: "aw09-l06-f5", front: "Spare decision rule", back: "Hold the spare if expected lost contribution per year exceeds its carrying cost.", concepts: ["aw09.spares-strategy"] },
    { id: "aw09-l06-f6", front: "Four platform business models", back: "Sell rigs; sell test hours; lease instrumented rigs; software on customer rigs (the core).", concepts: ["aw09.platform-business-models"] },
  ],
};

export default lesson;
