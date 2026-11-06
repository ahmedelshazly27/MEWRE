import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw15-l03",
  title: "Go/no-go memo on the first hardware test platform",
  summary:
    "Decide whether and when Afterwave should build its first own test platform (an instrumented, generalised actuator rig that feeds bench memory from day one). Platform unit economics with breakeven utilisation and payback, a decision tree with expected value and the value of information, the risk register, the staged plan, and scenario trees for a customer asking for a dedicated rig, a competitor offering free capture, and an investor asking why a software company would build hardware.",
  minutes: 90,
  objectives: [
    "You can compute breakeven utilisation, EBIT and payback for a test platform and say which inputs dominate.",
    "You can build a small decision tree for the platform, roll it back to expected values including the option to abandon, and compute the value of perfect information.",
    "You can design a staged commitment with gates and kill criteria that buys information cheaper than it is worth.",
    "You can price a dedicated rig as a take-or-pay contract that recovers capex over the contract term.",
    "You can write a go/no-go memo that a cofounder, an investor and an anchor customer would each accept as honest.",
  ],
  concepts: [
    {
      id: "aw15.platform-breakeven",
      name: "Platform breakeven utilisation",
      description:
        "The share of available rig hours that must be sold for EBIT to reach zero: (fixed cost plus depreciation) divided by (contribution per hour times available hours). Utilisation, not price, usually decides whether a test platform works.",
      competency: "aw-platforms",
      related: ["fc06.hardware-economics", "fc06.contribution-margin"],
    },
    {
      id: "aw15.decision-tree",
      name: "Decision tree with rollback",
      description:
        "Options, chance nodes for demand scenarios with probabilities, payoffs that include later choices (continue or abandon with salvage), rolled back from the right: best branch at decision nodes, probability-weighted average at chance nodes.",
      competency: "aw-business",
      related: ["fc09.expected-value", "m08.emv"],
    },
    {
      id: "aw15.evpi-staging",
      name: "Value of information and staged commitment",
      description:
        "EVPI caps what any test of demand is worth. If a cheap, fast staged step (pre-sold hours with deposits, a leased or partner rig) reveals most of the uncertainty for less than its value, stage the decision with explicit gates and kill criteria.",
      competency: "aw-business",
      related: ["fc09.value-of-information", "fc09.reversibility"],
    },
    {
      id: "aw15.dedicated-rig",
      name: "Dedicated rig as a take-or-pay contract",
      description:
        "A rig reserved for one customer is a capital lease with services: recover capex less credible reuse value over the contract term, plus fixed and variable costs and margin, as a take-or-pay fee so the customer who wants exclusivity carries the utilisation risk.",
      competency: "aw-platforms",
      related: ["aw15.platform-breakeven"],
    },
    {
      id: "aw15.capture-commoditisation",
      name: "Responding to free capture",
      description:
        "When a competitor gives capture away, the value moves to what capture enables: time-aligned evidence, Ripple's selection and bench memory in the customer's Enclave. Do not price-war the layer that is becoming free; interoperate with it and price the layer that is not.",
      competency: "aw-business",
      related: ["fc06.switching-costs", "fc03.competitive-alternatives"],
    },
    {
      id: "aw15.go-no-go-memo",
      name: "Go/no-go memo",
      description:
        "A decision document with the recommendation first: the decision and its deadline, options, economics with sensitivities, uncertainty and the value of information, risks with mitigations, the staged plan with gates and kill criteria, and what would change the recommendation.",
      competency: "aw-business",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The economics of a test platform and deciding under uncertainty",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Step four of Afterwave's vision is its own hardware test platforms, for example a generalised actuator test platform that ships instrumented and feeds bench memory from day one. It is the most capital-intensive decision the company will face before Series A, and the one most likely to be decided by enthusiasm: Ismail and Yusuf have built rigs, customers will ask for them, and investors will either love the moat or fear the capex. Your job is to decide with numbers, stage the commitment, and write a memo that survives all three audiences.`,
        },
        {
          kind: "md",
          md: md`### What the platform is, and why it is tempting

An Afterwave platform would be an actuator test rig (a load machine or dynamometer, torque and speed transducers, power analysis, thermal control, safety interlocks) sold as **test-as-a-service** by the hour or reserved for a customer. Its strategic case is that it is instrumented with Lockstep from day one, so every hour sold adds to bench memory and becomes the physical half of the evidence layer. Its risk is that it turns a three-person software company into a test lab with capex, technicians, calibration, accreditation and machine safety obligations.

The first question is always utilisation. A rig earns only on hours sold; changeovers, customer fixtures, calibration windows and empty weeks between programmes all eat into available hours.`,
        },
        { kind: "equation", formula: "aw15-breakeven-utilisation" },
        { kind: "equation", formula: "aw15-platform-payback" },
        {
          kind: "widget",
          widget: "platform-economics",
          caption:
            "Set the worked example's illustrative inputs: capex USD 600k, life 5 years, availability 80 %, price USD 180 per hour, variable USD 60 per hour, fixed USD 150k per year, data value USD 20 per hour. Breakeven should read about 32 %. Then halve the price, or drop availability to 60 %, and see which input moves breakeven most.",
        },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative platform: EBIT vs utilisation",
          xKey: "util",
          xLabel: "utilisation (% of available hours sold)",
          yLabel: "EBIT (k USD per year)",
          series: [
            { key: "ebit", label: "EBIT" },
            { key: "withData", label: "EBIT incl. data value (USD 20/h)" },
          ],
          data: [
            { util: 10, ebit: -185.9, withData: -171.9 },
            { util: 20, ebit: -101.8, withData: -73.8 },
            { util: 30, ebit: -17.7, withData: 24.3 },
            { util: 40, ebit: 66.4, withData: 122.4 },
            { util: 50, ebit: 150.5, withData: 220.6 },
            { util: 60, ebit: 234.6, withData: 318.7 },
            { util: 70, ebit: 318.7, withData: 416.8 },
          ],
          caption: "Capex USD 600k over 5 years, 7,008 available hours, USD 120 contribution per hour, USD 150k fixed (all illustrative). Each 10 points of utilisation is worth about USD 84k of EBIT; the data-value line is only real if someone pays for or uses that data.",
        },
        {
          kind: "md",
          md: md`### Deciding under uncertainty

You do not know whether demand will fill the rig. Write the uncertainty as a small number of scenarios with probabilities, put the later choices into the payoffs (if demand is low, you stop after a year and sell the rig), and roll back:`,
        },
        { kind: "equation", formula: "aw15-expected-value" },
        {
          kind: "md",
          md: md`Then ask how much it would be worth to know the scenario before committing. If you could buy perfect foresight, you would build only in the good scenario and avoid the bad ones:`,
        },
        { kind: "equation", formula: "aw15-evpi" },
        {
          kind: "md",
          md: md`EVPI is a ceiling. A real demand test (pre-sold hours with deposits, a leased rig, time on a partner's rig, a letter of intent with a take-or-pay clause) reveals only part of the uncertainty, so it is worth less than EVPI. The rule of thumb: if the test costs well below EVPI and is fast compared with the market window, stage the decision.

Two things never go into the expected value and must be weighed in the memo explicitly: the **focus cost** (three founders running a lab are not selling Ripple), and the **strategic value** of bench memory from your own rigs (real only if a model or a customer uses that data).`,
        },
        {
          kind: "matrix",
          title: "Which platform move fits the evidence",
          xAxis: ["Demand not contracted", "Demand contracted (take-or-pay or deposits)"],
          yAxis: ["Data adds little to Ripple or Enclave", "Data materially improves Ripple or Enclave"],
          cells: [
            { label: "Partner or lease first", detail: "Instrument a partner's or a customer's rig with Lockstep; get bench memory without capex" },
            { label: "Build, anchor-contracted", detail: "Own platform with an anchor take-or-pay contract and gates for the second rig" },
            { label: "No-go", detail: "Stay software; revisit when either axis moves" },
            { label: "Lab business, not ours", detail: "Sell hours through partner labs or refer; a test lab with no data edge is a different company" },
          ],
          caption: "Build only top right. Everything else has a cheaper way to learn or a better owner.",
        },
        { kind: "sources", refs: ["aw15-r10", "aw15-r9"] },
      ],
    },
    {
      layer: "applied",
      title: "The platform numbers and the decision tree",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Breakeven, EBIT and payback for an illustrative actuator platform",
          given: md`**Illustrative inputs** (not quotes or Afterwave data): capex $K$ = USD 600k; depreciation life $L$ = 5 years; availability 80 %, so $H_a = 8{,}760 \times 0.80 = 7{,}008$ h; price $p$ = USD 180 per hour; variable cost $v$ = USD 60 per hour; fixed cost $F$ = USD 150k per year (calibration, maintenance, floor space, insurance, base technician).`,
          steps: [
            { md: md`Contribution per hour: $p - v = 180 - 60 = 120$ USD. Depreciation: $K / L = 600 / 5 = 120$ k USD per year.` },
            { md: md`Breakeven utilisation: $u^* = (150 + 120) / (0.120 \times 7{,}008) = 270 / 840.96 = 0.321$, so **32 %** of available hours, about 2,250 hours a year.` },
            { md: md`At 25 % utilisation: $1{,}752$ h, contribution $210.2$ k, EBIT $= 210.2 - 150 - 120 = -59.8$ k USD. Operating cash $210.2 - 150 = 60.2$ k, payback $600 / 60.2 = 10.0$ years, twice the life: the rig never pays for itself.` },
            { md: md`At 50 % utilisation: $3{,}504$ h, contribution $420.5$ k, EBIT $= 150.5$ k USD; operating cash $270.5$ k, payback $600 / 270.5 = 2.2$ years.` },
            { md: md`Sensitivity: a 10 % lower price ($p = 162$) cuts contribution to USD 102 per hour and lifts breakeven to $270 / (0.102 \times 7{,}008) = 37.8\%$; 60 % availability ($H_a = 5{,}256$) lifts it to $270 / (0.120 \times 5{,}256) = 42.8\%$. Availability and price both matter, but the swing between 25 % and 50 % utilisation dwarfs either.` },
          ],
          result: md`The platform is a good business at 50 % utilisation and a bad one at 25 %, with breakeven near a third of available hours. The decision is therefore a bet on **contracted** utilisation, which is exactly what you do not yet know.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Go now, stage it, or no-go: the decision tree",
          given: md`Same platform. **Illustrative scenarios** for year-one demand, held for five years: High (50 % utilisation) $p = 0.35$; Medium (30 %) $p = 0.40$; Low (12 %) $p = 0.25$. Payoff = five years of operating cash minus capex, undiscounted (a simplification you would replace with NPV in the real memo). If demand is low, you may stop after year 1 and sell the rig for 50 % of capex. Staged option: a 3-month demand test (instrument a partner's rig with Lockstep and pre-sell hours with deposits) costing USD 60k, assumed to reveal the scenario.`,
          steps: [
            { md: md`**High:** cash per year $= 0.50 \times 7{,}008 \times 0.120 - 150 = 270.5$ k; payoff $5 \times 270.5 - 600 = +752.4$ k USD.` },
            { md: md`**Medium:** cash per year $= 0.30 \times 7{,}008 \times 0.120 - 150 = 102.3$ k; continue: $5 \times 102.3 - 600 = -88.6$ k; abandon after year 1: $102.3 + 300 - 600 = -197.7$ k. Best: continue, $-88.6$ k.` },
            { md: md`**Low:** cash per year $= 0.12 \times 7{,}008 \times 0.120 - 150 = -49.1$ k; continue: $5 \times (-49.1) - 600 = -845.4$ k; abandon after year 1: $-49.1 + 300 - 600 = -349.1$ k. Best: abandon, $-349.1$ k. The abandonment option is worth about USD 496k in this branch.` },
            { md: md`**EV(go now)** $= 0.35 \times 752.4 + 0.40 \times (-88.6) + 0.25 \times (-349.1) = 263.3 - 35.4 - 87.3 = 140.6$ k USD.` },
            { md: md`**EV(staged)**: build only if the test shows High: $-60 + 0.35 \times 752.4 = -60 + 263.3 = 203.3$ k USD. **EV(no-go)** $= 0$.` },
            { md: md`**EVPI** $= 0.35 \times 752.4 + 0.65 \times 0 - 140.6 = 263.3 - 140.6 = 122.7$ k USD. The test costs USD 60k, under half the EVPI.` },
            { md: md`**Robustness:** if the 3-month delay costs a quarter of year-one cash in the High scenario ($0.25 \times 270.5 = 67.6$ k, weighted $0.35 \times 67.6 = 23.7$ k), EV(staged) is still $203.3 - 23.7 = 179.6$ k, above go-now. Go-now only wins if the test is much less informative or much slower.` },
          ],
          result: md`**Stage it.** With these illustrative numbers, a USD 60k demand test (worth up to USD 122.7k) beats building now by about USD 40k to 60k of expected value, and it removes the USD 349k downside. The memo's recommendation is "no-go now, go on evidence": run the test, build only on contracted demand.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Price a dedicated rig for one customer",
          given: md`A hypothetical customer (illustrative) asks for a rig reserved for its actuators for a 3-year contract. Same platform: $K$ = USD 600k, $F$ = USD 150k per year, $v$ = USD 60 per hour. The base rig is reusable after the contract; credible resale or reuse value $S$ = USD 150k (customer-specific fixtures are written off). The customer expects to use 2,500 hours a year. You want a 20 % margin on the break-even fee.`,
          steps: [
            {
              md: md`Break-even annual fee: $A_{\min} = (K - S)/T_c + F + v\,h_c = (600 - 150)/3 + 150 + 0.060 \times 2{,}500 = 150 + 150 + 150 = 450$ k USD.`,
              hidden: true,
              check: { prompt: "Break-even annual fee", answer: 450, unit: "k USD", tolerance: { rel: 0.01 } },
            },
            {
              md: md`With a 20 % margin: $1.2 \times 450 = 540$ k USD per year, take-or-pay.`,
              hidden: true,
              check: { prompt: "Annual fee with 20 % margin", answer: 540, unit: "k USD", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Effective price per used hour: $540{,}000 / 2{,}500 = 216$ USD, versus USD 180 on the shared platform. The premium is the price of exclusivity: the customer carries the utilisation risk.`,
              hidden: true,
              check: { prompt: "Effective price per used hour", answer: 216, unit: "USD/h", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`Quote about **USD 540k per year, take-or-pay, 3 years, with Lockstep and Enclave included and data rights as in the pilot term sheet**. If the customer only wants to pay per hour used, it is not a dedicated rig; it is shared capacity with a priority clause.`,
        },
        { kind: "equation", formula: "aw15-reserved-fee" },
        { kind: "xref", to: "fc09-l06", note: "Expected value, reversibility and value of information in general form." },
        { kind: "xref", to: "fc06-l03", note: "Hardware metrics, margins and inventory: why capex-heavy lines are valued differently." },
      ],
    },
    {
      layer: "field",
      title: "The memo, the risks and the hard conversations",
      blocks: [
        {
          kind: "md",
          md: md`### The memo, in the order it is read

| Section | Content | Bar |
|---|---|---|
| **1. Recommendation** | One paragraph: go, no-go or staged, and by when the next decision is due | A reader who stops here knows what you will do |
| **2. The decision** | What exactly would be built (rig spec), what it costs, who operates it | Spec and cost from quotes, not guesses |
| **3. Options** | Go now, staged, partner or lease, no-go | Includes doing nothing and a cheaper way to learn |
| **4. Economics** | Breakeven utilisation, EBIT and payback at low, base and high utilisation; sensitivities | Every input sourced or labelled illustrative |
| **5. Uncertainty** | Scenarios, probabilities and their basis, tree, EV, EVPI | Probabilities justified, later choices in the payoffs |
| **6. Risks** | Register with probability, impact, owner, mitigation | Includes focus, safety and accreditation, not only money |
| **7. Plan and gates** | Staged steps, what each must show, kill criteria, dates | A gate is evidence (signed hours), not activity |
| **8. What would change my mind** | The two or three facts that would flip the recommendation | Honest and testable |

### The risks that are not in the spreadsheet

| Risk | Why it matters | Mitigation |
|---|---|---|
| **Focus** | Three founders building and running a lab are not selling Ripple; the software milestone slips | Partner or lease first; a platform lead is a hire, not a cofounder side project |
| **Machine safety of the rig itself** | A load machine with high torque and speed is machinery: guarding, interlocks, emergency stop, risk assessment; a rig you build and put into service may itself need CE conformity | Design to the relevant standards from the start; budget the risk assessment |
| **Damage to the customer's device or people** | Test-to-failure and endurance runs destroy things | Liability terms, insurance, test procedures signed by the customer |
| **Accreditation and calibration** | Customers relying on results may expect ISO/IEC 17025 accreditation and traceable calibration of transducers | Start with internal or development testing; budget accreditation only if customers require it |
| **Obsolescence** | The next actuator generation may exceed the rig's torque or speed envelope | Design headroom; recover capex over contracts, not engineering life |
| **Data value double counting** | Data value is counted in EBIT and again in the valuation story | Count it only where a model or a customer demonstrably uses it |`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Regulatory points to confirm before the memo goes out",
          md: md`Whether a test rig Afterwave builds for its own premises counts as machinery "put into service" under Regulation (EU) 2023/1230 (and so needs conformity assessment and CE marking) depends on the definitions and on where it is used; confirm with a machinery-safety specialist. Whether customers in your segment require ISO/IEC 17025 accreditation for development testing varies by customer; ask in discovery rather than assume. Equipment prices and lead times for load machines and transducers move with suppliers: the USD 600k in this lesson is illustrative, not a quote.`,
        },
        {
          kind: "widget",
          widget: "risk-matrix",
          caption: "Put the six risks above on the matrix for your own platform proposal. Anything scoring high on both axes needs a mitigation in the plan and a kill criterion at a gate.",
        },
        { kind: "xref", to: "m08-l05", note: "Risk registers, probability-impact matrices and expected monetary value from Track 0." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How platform decisions go wrong",
          md: md`**Building to escape selling:** a rig is concrete and satisfying; a stalled pipeline is not. If the software pilots are not converting, a rig will not fix that. **Depreciating over engineering life when demand is contract-length:** the rig lasts 10 years, the anchor contract 2. **Ignoring changeover time:** a new customer's fixtures can take days; that is unsold capacity. **Counting data value twice.** **One anchor customer and no gate:** if they leave, utilisation drops to zero.`,
        },
        { kind: "scenario", scenario: "aw15-s3" },
        { kind: "scenario", scenario: "aw15-s4" },
        { kind: "scenario", scenario: "aw15-s5" },
        {
          kind: "question",
          question: {
            id: "aw15-l03-p1",
            type: "short",
            prompt: md`**The capstone memo.** Write the go/no-go memo on Afterwave's first hardware test platform (a generalised actuator test platform), in the eight sections of the template, at most two pages. Use illustrative numbers, labelled, with the arithmetic for breakeven utilisation, payback, EV of each option and EVPI. Include a staged plan with at least two gates and kill criteria, and say what would change your recommendation. Address the two scenario questions: a customer asking for a dedicated rig, and a competitor offering free capture.`,
            rubric: [
              "Recommendation first, with a dated next decision; options include staged, partner or lease, and no-go, not only build or not.",
              "Economics correct: breakeven utilisation, EBIT and payback at more than one utilisation level, with sensitivities; inputs labelled illustrative.",
              "Decision tree with probabilities, payoffs that include the abandon option, correct rollback, and EVPI compared with the cost of the staged test.",
              "Risk register beyond money (focus, machine safety of the rig, damage and liability, accreditation, obsolescence, data double counting) with mitigations.",
              "Staged plan with evidence-based gates (contracted hours, deposits, take-or-pay) and kill criteria; dedicated-rig answer is take-or-pay over the contract term; free-capture answer prices the layer above capture.",
              "No invented customers, quotes or traction; consistent with the pilot terms (data ownership) from lesson 1.",
            ],
            modelAnswer: md`**1. Recommendation.** No-go on building now; go on evidence. Run a 3-month demand test from January (Lockstep on a partner's actuator rig, hours pre-sold with deposits). Decide on the build at the end of month 3.

**2. Decision.** Generalised actuator platform: load machine, torque and speed transducers, power analyser, thermal chamber, interlocks, Lockstep and Enclave built in. Illustrative capex USD 600k, operated by one hired test technician.

**3. Options.** Go now; staged (test then build); partner or lease only; no-go.

**4. Economics (illustrative).** 7,008 available hours, USD 120 contribution per hour, USD 150k fixed, USD 120k depreciation: breakeven $u^* = 270 / 841 = 32\%$. EBIT $-59.8$k at 25 %, $+150.5$k at 50 %; payback 10.0 years at 25 %, 2.2 years at 50 %. A 10 % price cut lifts breakeven to 38 %; 60 % availability to 43 %.

**5. Uncertainty.** High 50 % ($p$ 0.35), Medium 30 % (0.40), Low 12 % (0.25), five-year undiscounted payoffs $+752$k, $-89$k, $-349$k (abandon after year 1 at 50 % salvage). EV(go now) $= 140.6$k; EV(staged, USD 60k test) $= 203.3$k; EVPI $= 122.7$k, so the test is worth buying; with a delay cost of USD 23.7k expected it still wins.

**6. Risks.** Focus (hire a platform lead before build); rig machine safety and possible CE obligations (specialist review, budgeted); customer device damage (liability cap, insurance, signed procedures); accreditation (only if a contracted customer requires ISO/IEC 17025); obsolescence (headroom, capex recovered over contracts); data double counting (count only used data).

**7. Plan and gates.** Gate 1 (month 3): at least 1,500 hours a year pre-sold with deposits across at least 2 customers, or one take-or-pay contract; else kill. Gate 2 (month 9 after build): utilisation above 30 % on a trailing quarter, else stop selling new hours and sell or redeploy the rig.

**Dedicated rig request:** yes, as take-or-pay: $(600 - 150)/3 + 150 + 150 = 450$k break-even, USD 540k a year with margin, 3 years, data terms as in the pilot.

**Free capture by a competitor:** do not price-war capture. Import their data into Enclave, price Ripple and bench memory, and keep Lockstep's one-clock alignment as the evidence-grade option.

**8. What would change my mind.** A take-or-pay anchor covering breakeven by itself (go now); evidence that bench-memory data from our own rig materially lifts Ripple recall for customers (raises strategic value); software pilots not converting by month 6 (no platform until they do).`,
            explanation: md`This is the capstone's hardest artifact because it asks you to say "not yet" to something exciting, with numbers, and to say exactly what would make it "yes".`,
            concepts: ["aw15.go-no-go-memo", "aw15.platform-breakeven", "aw15.decision-tree", "aw15.evpi-staging", "aw15.dedicated-rig", "aw15.capture-commoditisation"],
            difficulty: 3,
          },
        },
        {
          kind: "checklist",
          title: "Before the memo goes to your cofounders and investors",
          items: [
            "The recommendation is in the first paragraph, with a date for the next decision.",
            "Every input is from a quote, a customer conversation or labelled illustrative.",
            "Breakeven utilisation is shown, and the base case is not above what is contracted or evidenced.",
            "Payoffs include the option to abandon; EVPI is compared with the cost of the staged test.",
            "The risks include focus, machine safety, liability, accreditation and obsolescence, not only money.",
            "Gates are evidence (signed hours, deposits, take-or-pay), each with a kill criterion.",
            "Data ownership on the platform matches the pilot term sheet: customer data stays the customer's.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw15-l03-q1",
      type: "numeric",
      prompt: md`Illustrative rig: capex USD 400k over 4 years, fixed cost USD 100k per year, price USD 150 per hour, variable cost USD 50 per hour, availability 85 %. What is the breakeven utilisation, in %?`,
      answer: 26.9,
      unit: "%",
      tolerance: { abs: 0.2 },
      explanation: md`$H_a = 8{,}760 \times 0.85 = 7{,}446$ h; depreciation 100k; $u^* = (100 + 100)/(0.100 \times 7{,}446) = 200 / 744.6 = 0.269$, so about 26.9 %.`,
      concepts: ["aw15.platform-breakeven"],
      difficulty: 2,
    },
    {
      id: "aw15-l03-q2",
      type: "numeric",
      prompt: md`Same rig as the previous question at 40 % utilisation. What is the simple payback, in years?`,
      answer: 2.02,
      unit: "years",
      tolerance: { abs: 0.03 },
      explanation: md`Hours sold $= 0.40 \times 7{,}446 = 2{,}978$; contribution $= 2{,}978 \times 100 = 297.8$k; operating cash $= 297.8 - 100 = 197.8$k; payback $= 400 / 197.8 = 2.02$ years, well inside the 4-year life.`,
      concepts: ["aw15.platform-breakeven"],
      difficulty: 2,
    },
    {
      id: "aw15-l03-q3",
      type: "numeric",
      prompt: md`Two options. Build: payoff +500k with probability 0.4, -300k with probability 0.6. Don't build: 0. What is the expected value of perfect information, in k USD?`,
      answer: 180,
      unit: "k USD",
      tolerance: { abs: 1 },
      explanation: md`EV(build) $= 0.4 \times 500 - 0.6 \times 300 = 200 - 180 = 20$k, so the best decision without information is to build, worth 20k. With perfect information you build only in the good case: $0.4 \times 500 + 0.6 \times 0 = 200$k. EVPI $= 200 - 20 = 180$k. If you answered 200, you forgot to subtract the best expected value without information.`,
      concepts: ["aw15.evpi-staging"],
      difficulty: 2,
    },
    {
      id: "aw15-l03-q4",
      type: "decision",
      prompt: md`Your EV analysis says build now (EV +140k) is positive, and a 3-month demand test costing 60k has EV +200k. Ismail wants to build now because "we will learn more by running it". What do you decide?`,
      options: [
        { text: "Run the staged test with a dated gate and kill criterion, and agree with Ismail now what result would trigger the build", score: 1, feedback: "Higher EV, the downside removed, and the disagreement turned into a pre-agreed decision rule." },
        { text: "Build now: positive EV is enough", score: 0.3, feedback: "Positive is not best. You would give up about 60k of expected value and carry the full downside." },
        { text: "No-go permanently: hardware is a distraction", score: 0.3, feedback: "The analysis says the option is valuable on evidence. Killing it permanently throws that away." },
        { text: "Build a smaller rig now as a compromise", score: 0.5, feedback: "Possibly sensible if a smaller rig is itself a cheap demand test, but as a compromise it is neither the staged test nor a committed build." },
      ],
      explanation: md`Choose the best option, not the first positive one, and pre-commit to the gate so the next decision is not re-argued.`,
      concepts: ["aw15.evpi-staging", "aw15.decision-tree"],
      difficulty: 2,
    },
    {
      id: "aw15-l03-q5",
      type: "mcq",
      prompt: md`A customer wants a rig reserved for them but proposes to pay only for hours used. What is the right response?`,
      options: [
        "Accept: any hours help utilisation",
        "Offer take-or-pay that recovers capex less reuse value over the contract term, or shared capacity with a priority clause at the standard hourly price",
        "Refuse all dedicated arrangements",
        "Accept but depreciate the rig over 10 years to make the hourly price look lower",
      ],
      answer: 1,
      explanation: md`Exclusivity transfers utilisation risk to you unless the fee is take-or-pay. If they only want to pay per hour, offer priority on shared capacity instead.`,
      concepts: ["aw15.dedicated-rig"],
      difficulty: 1,
    },
    {
      id: "aw15-l03-q6",
      type: "decision",
      prompt: md`A well-funded test-data platform (hypothetical) announces that its bench capture app is now free. Two of your pilot prospects ask why they should pay for Lockstep. What do you do?`,
      options: [
        { text: "Cut Lockstep's price to zero immediately and match them", score: 0.3, feedback: "You give away revenue without addressing why they buy; and you start a price war in the layer that is commoditising." },
        { text: "Price the value above capture: Ripple and bench memory in Enclave; import data from their capture tool; keep Lockstep included with the platform and emphasise one-clock alignment where evidence grade matters", score: 1, feedback: "You moved the conversation to where your value is, made the free tool an input, and kept capture as part of the bundle rather than a stand-alone price." },
        { text: "Tell prospects the free app is low quality", score: 0.1, feedback: "Unverified disparagement; they may already use it." },
        { text: "Ignore it; it will not affect you", score: 0.2, feedback: "It changes what buyers compare you with; ignoring it leaves the objection unanswered." },
      ],
      explanation: md`When a layer becomes free, compete on the layer it enables and interoperate with the free one.`,
      concepts: ["aw15.capture-commoditisation"],
      difficulty: 2,
    },
    {
      id: "aw15-l03-q7",
      type: "multi",
      prompt: md`Which belong in the platform go/no-go memo's risk section? Select all that apply.`,
      options: [
        "Founder focus taken away from software pilots",
        "Machine safety and possible CE obligations for the rig itself",
        "Damage to customer devices and liability",
        "Accreditation and calibration expectations",
        "A claim that bench-memory data will be worth more than the rig",
        "Obsolescence against the next actuator generation",
      ],
      answer: [0, 1, 2, 3, 5],
      explanation: md`The data claim is an assumption to test, not a risk entry; and asserting it unbacked is the double-counting trap.`,
      concepts: ["aw15.go-no-go-memo"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw15-l03-f1", front: "Breakeven utilisation", back: md`$u^* = (F + K/L) / ((p - v) H_a)$. Illustrative platform: $270 / 841 = 32\%$.`, concepts: ["aw15.platform-breakeven"] },
    { id: "aw15-l03-f2", front: "Simple payback of a rig", back: md`$K / ((p - v) u H_a - F)$: 2.2 years at 50 %, 10 years at 25 % for the illustrative platform.`, concepts: ["aw15.platform-breakeven"] },
    { id: "aw15-l03-f3", front: "Roll back a decision tree", back: "From the right: best branch at decision nodes, probability-weighted average at chance nodes; payoffs include the option to abandon.", concepts: ["aw15.decision-tree"] },
    { id: "aw15-l03-f4", front: "EVPI", back: "Expected value with perfect information minus the best expected value without it. A ceiling on what any demand test is worth.", concepts: ["aw15.evpi-staging"] },
    { id: "aw15-l03-f5", front: "Dedicated rig pricing", back: md`Take-or-pay $A = (K - S)/T_c + F + v h_c$ plus margin; recover capex over the contract term, not engineering life.`, concepts: ["aw15.dedicated-rig"] },
    { id: "aw15-l03-f6", front: "Response to free capture", back: "Do not price-war the commoditising layer; interoperate with it and price Ripple, bench memory and evidence-grade alignment.", concepts: ["aw15.capture-commoditisation"] },
    { id: "aw15-l03-f7", front: "The memo's first paragraph", back: "Recommendation (go, no-go, staged) and the date of the next decision. Then decision, options, economics, uncertainty, risks, gates, what would change my mind.", concepts: ["aw15.go-no-go-memo"] },
  ],
  scenarios: [
    {
      id: "aw15-s3",
      title: "The customer asks for a dedicated rig",
      dayInLife: true,
      context: md`Week 10 of a shadow-mode pilot at a hypothetical drives company (illustrative, not a real account). The results look on track. The head of test says: "We would sign the Ripple licence, but what we really need is a rig. Build us a dedicated actuator rig with your capture built in and we will use it for our next programme."`,
      start: "a",
      concepts: ["aw15.dedicated-rig", "aw15.go-no-go-memo", "aw15.evpi-staging"],
      nodes: {
        a: {
          md: md`What do you say first?`,
          choices: [
            {
              text: "Separate the decisions: close the Ripple licence on the pilot's success criteria as agreed, then open a scoped rig conversation (torque and speed envelope, hours per year, contract length, take-or-pay)",
              next: "b",
              score: 10,
              feedback: "The licence is the milestone you can sign now. Bundling it with a capex project would delay both and blur the conversion clause.",
            },
            {
              text: "Say yes to the rig to secure the licence",
              next: "b",
              score: 2,
              feedback: "You traded an agreed conversion for an unpriced capex commitment.",
            },
            {
              text: "Say Afterwave does not build hardware",
              next: "b",
              score: 4,
              feedback: "True today, but platforms are step four of the vision and this is a demand signal worth testing on the right terms.",
            },
          ],
        },
        b: {
          md: md`The licence is signed. In the rig conversation they say: 2,500 hours a year, 3-year programme, but "we want to pay per hour, like a test lab".`,
          choices: [
            {
              text: "Offer two structures: take-or-pay at about USD 540k a year (capex less reuse value over 3 years, fixed and variable cost, 20 % margin, illustrative) for exclusivity; or priority on a shared platform at the hourly rate, built only once enough other hours are pre-sold",
              next: "c",
              score: 10,
              feedback: "You priced exclusivity honestly and gave them a cheaper path that keeps utilisation risk where it belongs.",
            },
            {
              text: "Accept pay-per-hour at USD 180 to win the programme",
              next: "c",
              score: 2,
              feedback: "At 2,500 hours a year the rig is near breakeven only if nothing slips; any programme delay is your loss, on capex you do not have.",
            },
            {
              text: "Ask them to fund the rig capex up front and own it",
              next: "c",
              score: 6,
              feedback: "A legitimate structure (customer-owned rig, Afterwave instruments and operates), but then it is their rig: agree who owns the data and whether you may use the rig for others.",
            },
          ],
        },
        c: {
          md: md`They accept take-or-pay in principle. Your cofounders are excited; you have no rig engineer on staff and the software pipeline needs you.`,
          choices: [
            {
              text: "Write the go/no-go memo now: anchor contract as gate 1, hire a platform lead before ordering equipment, specialist review of the rig's machine safety, a kill criterion if the contract is not signed by a date, and your time capped",
              score: 10,
              feedback: "A contracted anchor removes most of the demand uncertainty; the remaining risks are focus and safety, which the memo now handles explicitly.",
            },
            {
              text: "Start ordering long-lead equipment before the contract is signed to save time",
              score: 2,
              feedback: "You would spend capex on an unsigned contract. Long-lead items can be quoted and reserved, not bought.",
            },
            {
              text: "Have Ismail and Yusuf build the rig in parallel with Ripple",
              score: 3,
              feedback: "It will slow Ripple and the rig. The memo's focus risk exists for exactly this case.",
            },
          ],
        },
      },
    },
    {
      id: "aw15-s4",
      title: "A competitor offers free capture",
      context: md`Hypothetical: a well-funded test-data platform announces its bench capture app is free for all users. Two days later a prospect in your pilot pipeline emails: "Why pay for Lockstep when we can get capture for free?" The same week a seed investor asks you the same question.`,
      start: "a",
      concepts: ["aw15.capture-commoditisation", "aw15.go-no-go-memo"],
      nodes: {
        a: {
          md: md`How do you answer the prospect?`,
          choices: [
            {
              text: "Agree that capture is becoming a commodity; explain that the pilot's value is the retest decision (Ripple) and bench memory staying in their Enclave; offer to ingest data from the free tool, and keep Lockstep for rigs where one-clock alignment of app events and DAQ is needed as evidence",
              next: "b",
              score: 10,
              feedback: "You conceded what is true, moved to where the value is, and turned a competitor into a data source.",
            },
            {
              text: "Make Lockstep free too and keep the pilot price",
              next: "b",
              score: 5,
              feedback: "Reasonable if capture was never your price anchor, but do it as a packaging decision (capture included), not as a panic match.",
            },
            {
              text: "Claim their capture is inaccurate",
              next: "b",
              score: 1,
              feedback: "Unverified. If you have a measured difference (for example clock alignment of app events), show it; otherwise do not say it.",
            },
          ],
        },
        b: {
          md: md`The investor asks: "If capture goes to zero, what is left for you?"`,
          choices: [
            {
              text: "Answer: the decision layer and the data position. Evidence: Ripple decides what to retest after a change and why, which the test-data platforms do not advertise as of my dated check; bench memory compounds per customer inside Enclave. Implication: free capture lowers our customers' cost of feeding Ripple, and we price per rig line for the decision, not per gigabyte",
              score: 10,
              feedback: "Answer, evidence, implication, with a dated claim and a pricing consequence.",
            },
            {
              text: "Say capture was never important",
              score: 3,
              feedback: "Lockstep's one clock is part of your evidence story; dismissing it contradicts your own demo.",
            },
            {
              text: "Say the competitor will not stay focused on benches",
              score: 2,
              feedback: "A prediction about a competitor is not a moat.",
            },
          ],
        },
      },
    },
    {
      id: "aw15-s5",
      title: "The investor asks why a software company would build hardware",
      context: md`Seed partner meeting. The partner has read your memo appendix: "Your vision slide has Afterwave test platforms. That is capex, technicians and a lab business. Why would I fund a software company that wants to build rigs?"`,
      start: "a",
      concepts: ["aw15.go-no-go-memo", "aw15.evpi-staging", "aw15.platform-breakeven"],
      nodes: {
        a: {
          md: md`What is your answer?`,
          choices: [
            {
              text: "This round funds no rig. Platforms are step four, built only on contracted demand: the memo says no-go now, a USD 60k demand test, and a build only with a take-or-pay anchor that covers breakeven (about a third of available hours, illustrative). The software milestone in the round thesis does not depend on it",
              next: "b",
              score: 10,
              feedback: "You separated the round from the option, showed the gate and the number, and kept the milestone clean.",
            },
            {
              text: "Say platforms are the real moat and will be the biggest revenue line",
              next: "b",
              score: 3,
              feedback: "An unbacked claim that makes the company look like a capex business before the software has proven anything.",
            },
            {
              text: "Say you will drop the platform idea if investors prefer",
              next: "b",
              score: 4,
              feedback: "Dropping a strategy to please one investor signals the strategy was not thought through.",
            },
          ],
        },
        b: {
          md: md`"And if a customer offers to pay for a dedicated rig next year?"`,
          choices: [
            {
              text: "Then it is a take-or-pay contract that recovers capex over its term, financed by the contract (or customer-funded equipment), operated by a hired platform lead, and it feeds bench memory; we would bring it to the board as a memo with gates",
              score: 10,
              feedback: "Customer-financed, gated and governed: the partner hears that hardware cannot quietly eat the round.",
            },
            {
              text: "We would use the round to build it quickly",
              score: 2,
              feedback: "Exactly the fear the partner raised.",
            },
            {
              text: "We would say no to protect focus",
              score: 5,
              feedback: "Defensible, but a contracted, financed rig that feeds bench memory may be worth doing; say how you would decide.",
            },
          ],
        },
      },
    },
  ],
};

export default lesson;
