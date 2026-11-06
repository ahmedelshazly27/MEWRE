import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz06-l05",
  title: "Where a controls and analytics company makes money, and why Mizan moved from services to products",
  summary:
    "The money map of the plant control stack: hardware, controller licences, integration and commissioning services, O&M support and analytics subscriptions, with their margins, scaling behaviour and risks. The arithmetic of services versus product (blended margin, revenue per FTE, ARR priced per MW), the services trap, productised services as a bridge, channels through EPCs, tracker vendors and O&M contractors, and the logic of Mizan's move from a BESS and hybrid controls integration firm to a product company around soiling analytics, cleaning optimisation and stow control.",
  minutes: 75,
  objectives: [
    "You can map the revenue pools in the PPC, EMS and SCADA stack and say which ones compound.",
    "You can compute blended gross margin, ARR priced per MW and revenue per FTE, and use them to compare a services plan with a product plan.",
    "You can explain the services trap and the role of productised services as a bridge.",
    "You can state the logic of Mizan's move from integration services to products without inventing history or traction.",
    "You can decide, with reasons, whether to take a custom integration contract.",
  ],
  concepts: [
    {
      id: "mz06.revenue-pools",
      name: "Revenue pools in the control stack",
      description:
        "Hardware (controllers, RTUs, sensors, robots), controller and SCADA licences, integration and commissioning services, O&M support contracts, and analytics or optimisation subscriptions, each with different margins, repeatability and risk.",
      competency: "mz-business",
      related: ["mz06.integration-scope", "fc06.contribution-margin"],
    },
    {
      id: "mz06.services-vs-product",
      name: "Services versus product economics",
      description:
        "Services revenue scales with headcount and carries delivery risk; product revenue scales with installed capacity at near-zero marginal cost. Measured by gross margin, revenue per FTE and recurring share.",
      competency: "mz-business",
      related: ["mz06.revenue-pools", "fc06.burn-multiple"],
    },
    {
      id: "mz06.services-trap",
      name: "The services trap",
      description:
        "Custom integration pays now but consumes the team, carries LDs and interface risk, depends on tender timing and leaves no reusable asset, so the product never gets built.",
      competency: "mz-business",
      related: ["mz06.services-vs-product", "mz06.failure-points"],
    },
    {
      id: "mz06.productised-services",
      name: "Productised services",
      description:
        "Fixed-scope, fixed-price, repeatable services built around the product (data onboarding, validation study, commissioning of the control function) that fund the company and feed the product rather than compete with it.",
      competency: "mz-business",
      related: ["mz06.services-trap", "fc04.paid-pilot"],
    },
    {
      id: "mz06.capacity-pricing",
      name: "Pricing per MW",
      description:
        "Analytics and control software for plants is commonly priced per MW or MWp per year, sometimes tiered or with a performance component; ties revenue to the asset and makes ARR forecastable from pipeline MW.",
      competency: "mz-business",
      related: ["fc06.value-pricing", "fc04.value-based-pricing"],
    },
    {
      id: "mz06.mizan-shift",
      name: "Mizan's shift from integration services to products",
      description:
        "From a BESS and hybrid plant controls and integration services firm to products around soiling analytics, cleaning optimisation and stow or tracker control under dust, wind and heat, with services kept as productised, product-led work.",
      competency: "mz-business",
      related: ["mz06.services-trap", "mz06.productised-services"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Follow the money through the stack",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Investors, partners and your own team will ask why Mizan is not simply a controls integrator, which is the business Kuwait's BESS and PV pipeline seems to invite. You need a precise answer: where the money is in this stack, which parts compound, which parts trap a small company, and what services you will still do. This lesson gives you the arithmetic behind the move from integration services to products and the language to defend it without overstating anything that has not happened yet.`,
        },
        {
          kind: "xref",
          to: "fc06-l02",
          note: "Founder Core: unit economics (CAC, LTV, payback, contribution margin). Here we apply margins and scaling to the control stack.",
        },
        {
          kind: "xref",
          to: "fc06-l03",
          note: "Founder Core: SaaS and hardware metrics (ARR, retention, burn multiple, hardware margins).",
        },
        {
          kind: "md",
          md: md`### Revenue pools

| Pool | What is sold | Gross margin (indicative) | Scales with | Main risk |
|---|---|---|---|---|
| **Hardware** | PPC and RTU hardware, sensors, soiling stations, cleaning robots, BESS | Low to moderate for resale (often 10 to 30 %) | Units shipped, working capital | Inventory, warranty, FX, import logistics |
| **Controller and SCADA licences** | PPC, EMS, SCADA software per plant | High (software) | Plants | Grid-code certification, long sales cycle |
| **Integration and commissioning** | Engineering hours, FAT, SAT, grid tests | Low to moderate (often 20 to 40 %) | Headcount | LDs, interface risk, rework |
| **O&M and support** | Annual support, remote monitoring, patches | Moderate to high | Installed base | Response-time SLAs, staff on call |
| **Analytics and optimisation subscriptions** | Soiling analytics, cleaning optimisation, forecasting, stow optimisation | High (software, 70 to 85 % typical for SaaS) | Installed MW | Proving value, data access, churn |

The margins above are industry rules of thumb, not data from any named company. Two structural facts matter more than the exact percentages: **services revenue grows only with people**, and **software revenue grows with installed MW** at almost no marginal cost.`,
        },
        { kind: "equation", formula: "mz06-blended-gm" },
        { kind: "equation", formula: "mz06-arr-capacity" },
        {
          kind: "matrix",
          title: "Where to play in the control stack",
          xAxis: ["Low repeatability", "High repeatability"],
          yAxis: ["Low differentiation", "High differentiation"],
          cells: [
            { label: "Custom engineering", detail: "Bespoke studies and controls design: high day rates, no compounding, depends on the founders' time" },
            { label: "Product", detail: "Soiling analytics, cleaning optimiser, dust-stow and tracker control module: compounds with data and installed MW" },
            { label: "Commodity integration", detail: "SCADA wiring, point-to-point, generic PPC configuration: price competition, LDs, local integrators and Chinese EPCs" },
            { label: "Productised services and resale", detail: "Fixed-scope onboarding, validation studies, distribution of hardware: funds the company, feeds the product" },
          ],
          caption: "Mizan's target is the top-right box, funded by the bottom-right box. The left column is where a small Kuwait controls company would otherwise end up.",
        },
        {
          kind: "md",
          md: md`### The services trap

A small controls company in a tender-driven market faces a predictable loop:

1. A large integration contract appears through an EPC. It pays now.
2. The whole team works on it for a year. Liquidated damages and interface risk (lesson 4) make it stressful and sometimes unprofitable.
3. Each project is different (other vendors, other grid conditions), so little is reusable.
4. The next contract depends on the next tender award, and Kuwait's awards slip (Track 0 module 11).
5. The product is never built, because there is never a quarter without a project.

### The logic of Mizan's move

The concept moved from a BESS and hybrid plant controls and integration services firm to a product-focused company. The reasoning that supports that move, in terms an investor can check:

- **Where the defensible asset is.** Integration knowledge is valuable but not proprietary. Soiling behaviour in Kuwait is not publicly characterised (no public Kuwait soiling rate was found in our research), KISR confirmed there is no standard method for turning operational data into cleaning decisions, and public tracker material shows no dedicated dust-storm stow mode. Data, validated methods and control logic for dust are assets that compound.
- **Scaling.** A product priced per MW scales with Gulf GW-scale plants; integration scales with engineers.
- **Exposure to tender timing.** A product can be sold to existing plants (O&M contractors, owners) and through partners, not only through new-build awards.
- **Controls know-how still matters.** The same understanding of PPC, EMS and SCADA is what makes stow and tracker control functions credible and integrable (lessons 1 to 4). It becomes a capability inside the product, not the business model.
- **Services remain, productised.** Validation studies (the Shagaya Phase I pilot being prepared with KISR), data onboarding and commissioning of Mizan's own functions are fixed-scope services that build the product.

### Channels

Plant owners rarely buy control functions alone. Realistic channels: **O&M contractors** (who own the cleaning budget and the operational pain), **EPCs** (for new-build specifications), **tracker vendors** (who ship their own control software, so they are channel and competitor at once) and **distribution partnerships** for hardware and software entering Kuwait. Partner economics and margin sharing are covered in Founder Core module 3.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Illustrative gross profit: services-led versus product-led growth",
          xKey: "year",
          xLabel: "Year",
          yLabel: "Gross profit (m USD)",
          series: [
            { key: "services", label: "Services (revenue 0.8 to 2.8 m at 30 %)" },
            { key: "product", label: "Product ARR (0.1 to 3.5 m at 80 %)" },
          ],
          data: [
            { year: "Y1", services: 0.24, product: 0.08 },
            { year: "Y2", services: 0.42, product: 0.32 },
            { year: "Y3", services: 0.6, product: 0.8 },
            { year: "Y4", services: 0.72, product: 1.6 },
            { year: "Y5", services: 0.84, product: 2.8 },
          ],
          caption: "Illustrative numbers only, not a Mizan forecast. Services grow linearly with hires; product gross profit overtakes services once installed MW compounds.",
        },
        { kind: "sources", refs: ["mz06-r12", "mz06-r13", "mz06-r14"] },
      ],
    },
    {
      layer: "applied",
      title: "Comparing a services plan with a product plan",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Same revenue, different company",
          given: md`Illustrative. **Plan A (services):** 5 hybrid integration projects per year at USD 400k, gross margin 30 %, 12 FTE. **Plan B (product):** analytics and control subscription at USD 1,000 per MWp per year on 2,000 MWp, gross margin 80 %, 10 FTE.`,
          steps: [
            { md: md`Plan A revenue: $5 \times 0.4 = 2.0$ m USD; gross profit $0.30 \times 2.0 = 0.60$ m USD.` },
            { md: md`Plan B ARR: $1{,}000 \times 2{,}000 = 2.0$ m USD; gross profit $0.80 \times 2.0 = 1.60$ m USD.` },
            { md: md`Revenue per FTE: A $2.0/12 = 167$k USD; B $2.0/10 = 200$k USD. Gross profit per FTE: A 50k, B 160k USD.` },
            { md: md`Next USD 1 m: Plan A needs about 6 more engineers and 2.5 more projects won in tenders; Plan B needs 1,000 MWp more under subscription and perhaps one more support engineer.` },
            { md: md`Risk: Plan A carries LDs and interface risk on every project; Plan B carries churn and the burden of proving value each renewal.` },
          ],
          result: md`At the same USD 2 m, Plan B has 2.7 times the gross profit and an incremental dollar that costs almost nothing to deliver. That is why investors value recurring software revenue much more highly than project revenue. Plan B is also harder to start: no ARR exists until the product is validated, which is exactly what the Shagaya validation study is for.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Blended margin of a realistic mix",
          given: md`Illustrative year: software subscriptions USD 1.0 m at 80 % gross margin; productised services (onboarding, validation studies, commissioning of Mizan functions) USD 1.5 m at 30 %.`,
          steps: [
            { md: md`Gross profit: $1.0 \times 0.80 + 1.5 \times 0.30 = 0.80 + 0.45 = 1.25$ m USD.` },
            {
              md: md`Blended margin: $1.25 / 2.5 = 50\,\%$.`,
              hidden: true,
              check: { prompt: "Blended gross margin", answer: 50, unit: "%", tolerance: { abs: 0.5 } },
            },
            {
              md: md`Software share of revenue: $1.0/2.5 = 40\,\%$; of gross profit: $0.80/1.25 = 64\,\%$.`,
              hidden: true,
              check: { prompt: "Software share of gross profit", answer: 64, unit: "%", tolerance: { abs: 0.5 } },
            },
          ],
          result: md`A 50 % blended margin is fine if the software share is rising and the services are product-led. Report the two lines separately to investors; a blended number alone hides which business you are.`,
        },
        {
          kind: "question",
          question: {
            id: "mz06-l05-p1",
            type: "numeric",
            prompt: md`Illustrative: a soiling analytics and cleaning optimisation subscription is priced at USD 1,200 per MWp per year. What ARR (m USD) would one 1,100 MWp plant represent?`,
            answer: 1.32,
            unit: "m USD",
            tolerance: { rel: 0.01 },
            explanation: md`$1{,}200 \times 1{,}100 = 1{,}320{,}000$ USD, so 1.32 m USD per year. The price is illustrative; check it against the value per MWp from cleaning optimisation (Mizan module 4) and competitors' capacity-based pricing.`,
            concepts: ["mz06.capacity-pricing"],
            difficulty: 1,
          },
        },
        {
          kind: "widget",
          widget: "unit-economics",
          props: { price: 60000, grossMargin: 0.8, cac: 90000, churn: 0.01 },
          caption: "Illustrative: a subscription of USD 60k per year per plant (about 50 MWp at USD 1,200/MWp) at 80 % margin. Change CAC to reflect long Gulf sales cycles and see the payback stretch.",
        },
      ],
    },
    {
      layer: "field",
      title: "Running the business: what to take, what to refuse",
      blocks: [
        {
          kind: "md",
          md: md`### How control-stack companies actually monetise

- **Inverter and tracker OEMs** give their controllers away inside the hardware price and earn on hardware and service contracts. Selling a competing control function to them is hard; selling a complementary one (dust stow, soiling-aware positioning) through them is possible.
- **BESS integrators** bundle the EMS with performance guarantees and long-term service agreements.
- **Independent PPC and SCADA vendors** sell licences plus commissioning and annual support; a large part of their revenue is services.
- **Asset performance software** (for example Power Factors, 3E SynaptiQ) and newer soiling analytics (for example Swish Solar, priced on a sliding scale by plant capacity) sell subscriptions by capacity.
- **Consolidation** happens: Power Factors bought Inaccess, a plant controls and monitoring company, to combine controls with analytics. Controls plus data is an attractive combination for acquirers.

### Kuwait-specific facts of life

- Public buyers procure through tenders and KAPP processes; a product is often bought **through** an EPC or O&M contract rather than directly (Track 0 module 11).
- A local agent or Kuwaiti entity is usually needed, and local content rules may apply.
- Tender awards slip, which hurts a services model more than a product model sold to existing plants.`,
        },
        {
          kind: "xref",
          to: "m11-l04",
          note: "Approvals, oversight and local content in Kuwait public procurement.",
        },
        {
          kind: "xref",
          to: "fc04-l07",
          note: "Founder Core: pricing, packaging and negotiation, including anchoring and value-based pricing.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Margins and prices",
          md: md`The margin ranges and per-MW prices in this lesson are generic industry rules of thumb and labelled illustrations. They are not taken from Mizan, from any named competitor's accounts or from any Kuwaiti contract. Before using a price in a proposal, benchmark it against value per MWp and against current competitor quotes.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Rules for which services Mizan takes",
          md: md`1. **Product-led only:** the service deploys, validates or improves a Mizan product.
2. **Fixed scope and price**, with a written definition of done.
3. **No LDs tied to someone else's COD**; liability capped to the service fee.
4. **Reusable output:** a template, a dataset, a validated method or a reference site.
5. **Time-boxed:** if it consumes more than an agreed share of engineering time, it needs a founder decision.`,
        },
        { kind: "scenario", scenario: "mz06-s2" },
        {
          kind: "question",
          question: {
            id: "mz06-l05-p2",
            type: "short",
            prompt: md`Write the **"How Mizan makes money"** slide for an investor deck: the revenue lines, the pricing unit of each, the target gross margin of each, which services Mizan will and will not do, and two sentences on why the company moved from integration services to products. Use labelled illustrative numbers and claim no customers, pilots or revenue that do not exist.`,
            rubric: [
              "Lists distinct revenue lines (software subscription for soiling analytics and cleaning optimisation, control modules such as dust stow, productised services, possibly hardware distribution) with a pricing unit for each (per MWp per year, fixed fee per study, margin on resale).",
              "Gives a target gross margin per line consistent with this lesson and labels numbers as illustrative.",
              "States services Mizan will do (product-led, fixed scope) and will not do (custom integration with LDs on others' COD).",
              "Explains the move with mechanisms: compounding data and IP, scaling with MW not headcount, exposure to tender timing, controls know-how kept as a capability.",
              "Makes no invented claims: the Shagaya pilot is described as targeted or in preparation; no customers or revenue claimed.",
            ],
            modelAnswer: md`**How Mizan makes money (illustrative targets).** *1. Soiling analytics and cleaning optimisation subscription*: priced per MWp per year (illustrative USD 800 to 1,500/MWp), target gross margin 80 %. *2. Control modules* (dust and wind-aware stow, soiling-aware tracker positioning) as add-ons to the subscription, priced per MWp, target 80 %. *3. Productised services*: data onboarding, validation studies and commissioning of Mizan functions, fixed fee per site, target 35 to 45 %, and only where they deploy or validate the product. *4. Distribution*: resale of selected hardware and software into Kuwait (for example cleaning robots or PPC/EMS products), margin on resale, target 15 to 25 %, kept small and opportunistic. **We will not** take custom integration contracts with liquidated damages tied to someone else's COD. **Why we moved from integration to products:** integration revenue grows only with engineers and with tender awards that slip, and leaves no asset; dust and soiling behaviour in Kuwait is unmeasured and undecided, so validated data and control logic compound with every MW we cover. Our controls background stays as the capability that makes our functions integrable with PPCs and trackers. **Status:** pre-revenue; a soiling analytics validation study at Shagaya Phase I is in preparation with KISR researchers as methodology partner.`,
            explanation: md`An investor wants separate lines with units and margins, a clear refusal list, and a mechanism-based reason for the model, with honest status. Blending everything into "solutions revenue" hides the business.`,
            concepts: ["mz06.revenue-pools", "mz06.mizan-shift", "mz06.capacity-pricing"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a Kuwaiti engineer considering joining Mizan why the company does not just become a BESS and hybrid controls integrator, given how much storage Kuwait is planning.",
          keyPoints: [
            "Integration revenue scales with headcount and depends on tender awards that slip.",
            "Integration carries LDs and interface risk and leaves little reusable asset.",
            "Product revenue priced per MW scales with installed capacity at low marginal cost.",
            "Dust, soiling and stow in Kuwait are an unsolved, data-driven problem where an asset can compound.",
            "Controls knowledge stays as the capability that makes the products integrable; services remain productised.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz06-l05-q1",
      type: "mcq",
      prompt: "Which revenue pool in the control stack scales with installed MW at the lowest marginal cost?",
      options: ["Integration and commissioning services", "Hardware resale", "Analytics and optimisation subscriptions", "On-site O&M staff"],
      answer: 2,
      explanation: md`Software subscriptions priced per MW add revenue with almost no added delivery cost; the others scale with people or units.`,
      concepts: ["mz06.revenue-pools", "mz06.services-vs-product"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz06-l05-q2",
      type: "numeric",
      prompt: md`A year has USD 0.6 m of software at 82 % margin and USD 2.4 m of services at 28 % margin. What is the blended gross margin in percent?`,
      answer: 38.8,
      unit: "%",
      tolerance: { abs: 0.2 },
      explanation: md`Gross profit $0.6 \times 0.82 + 2.4 \times 0.28 = 0.492 + 0.672 = 1.164$ m USD on 3.0 m: 38.8 %. This company is mostly a services company today.`,
      concepts: ["mz06.services-vs-product"],
      difficulty: 2,
    },
    {
      id: "mz06-l05-q3",
      type: "multi",
      prompt: "Which are signs of the services trap?",
      options: [
        "Every project uses a different vendor mix and little is reused",
        "Revenue grows only when engineers are hired",
        "Product roadmap slips every quarter because the team is on a project",
        "Gross margin rises as installed MW grows",
      ],
      answer: [0, 1, 2],
      explanation: md`Rising margin with installed MW is the product signature, not the trap.`,
      concepts: ["mz06.services-trap"],
      difficulty: 1,
    },
    {
      id: "mz06-l05-q4",
      type: "mcq",
      prompt: "Which statement about Mizan's concept is accurate?",
      options: [
        "Mizan is a BESS integrator with signed Kuwaiti projects.",
        "Mizan moved from a controls and integration services concept to products around soiling analytics, cleaning optimisation and stow and tracker control; a Shagaya Phase I pilot is in preparation.",
        "Mizan runs a soiling pilot at Shagaya that has already produced results.",
        "Mizan sells inverters.",
      ],
      answer: 1,
      explanation: md`That is the stated concept. Nothing is signed or running; describe the pilot as targeted or in preparation.`,
      concepts: ["mz06.mizan-shift"],
      difficulty: 1,
    },
    {
      id: "mz06-l05-q5",
      type: "numeric",
      prompt: md`Illustrative: Mizan wants USD 3 m ARR at USD 1,000 per MWp per year. How many MWp must be under subscription?`,
      answer: 3000,
      unit: "MWp",
      tolerance: { rel: 0.01 },
      explanation: md`$3{,}000{,}000 / 1{,}000 = 3{,}000$ MWp: a few Gulf GW-scale plants, which is why channel partners matter.`,
      concepts: ["mz06.capacity-pricing"],
      difficulty: 1,
    },
    {
      id: "mz06-l05-q6",
      type: "decision",
      prompt: md`Illustrative. An O&M contractor in Kuwait offers Mizan a fixed-fee, three-month study to quantify soiling losses on two plants using their SCADA data, with the right for Mizan to reuse the anonymised method. What do you do?`,
      options: [
        { text: "Decline: Mizan does not do services.", score: 0.2, feedback: "This is exactly the kind of product-led, fixed-scope service that builds the product and a reference." },
        { text: "Accept with a written scope, data-access plan, fixed fee and a conversion path to a subscription if the results hold.", score: 1, feedback: "Fixed scope, reusable output, a channel partner and a path to recurring revenue." },
        { text: "Accept, and offer to also integrate their new SCADA system to win goodwill.", score: 0.3, feedback: "The study is good; the integration add-on pulls you back into the services trap." },
      ],
      explanation: md`Product-led services with reusable output and a conversion path pass every rule; custom integration does not.`,
      concepts: ["mz06.productised-services"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz06-l05-f1", front: "Blended gross margin", back: md`$GM = \sum R_j g_j / \sum R_j$; report software and services lines separately.`, concepts: ["mz06.services-vs-product"] },
    { id: "mz06-l05-f2", front: "ARR priced per MW", back: md`$ARR = \pi_{MW} \cdot C$; USD 1,000/MWp on 2,000 MWp is USD 2 m.`, concepts: ["mz06.capacity-pricing"] },
    { id: "mz06-l05-f3", front: "Services vs product: the scaling difference", back: "Services revenue scales with headcount; software revenue scales with installed MW at near-zero marginal cost.", concepts: ["mz06.services-vs-product"] },
    { id: "mz06-l05-f4", front: "The services trap", back: "Project pays now, consumes the team, carries LDs and interface risk, is not reusable, depends on tender timing; the product never gets built.", concepts: ["mz06.services-trap"] },
    { id: "mz06-l05-f5", front: "Productised service test", back: "Product-led, fixed scope and price, no LDs on others' COD, reusable output, time-boxed.", concepts: ["mz06.productised-services"] },
    { id: "mz06-l05-f6", front: "Mizan's shift in one line", back: "From BESS and hybrid controls integration services to products: soiling analytics, cleaning optimisation, stow and tracker control under dust, wind and heat.", concepts: ["mz06.mizan-shift"] },
  ],
  scenarios: [
    {
      id: "mz06-s2",
      title: "The big integration contract",
      dayInLife: true,
      context: md`Illustrative. An EPC preparing a bid for a Gulf PV+BESS project asks Mizan to take the full plant controls integration (PPC, EMS, SCADA, grid-compliance testing) for about USD 1.5 m, fixed price, with liquidated damages tied to COD. It would roughly double the team's workload for 14 months. The Shagaya validation study is in preparation and needs your engineering partner's time over the same period.`,
      start: "a",
      concepts: ["mz06.services-trap", "mz06.productised-services", "mz06.mizan-shift"],
      nodes: {
        a: {
          md: md`What is your first response to the EPC?`,
          choices: [
            { text: "Thank them, ask for the scope documents and timeline, and say you will reply within a week with what Mizan can and cannot take.", next: "b", score: 9, feedback: "Keeps the relationship and buys time to decide on facts." },
            { text: "Accept on the call: USD 1.5 m is runway.", next: "c", score: 2, feedback: "Decided before you know the interfaces, LDs or the cost to the product." },
            { text: "Refuse on the call: Mizan is a product company.", next: "d", score: 4, feedback: "Clear, but you lose a channel relationship and a possible product-led piece of the work." },
          ],
        },
        b: {
          md: md`The documents show seven vendors, no ICDs yet, and LDs of 0.1 % of contract value per day capped at 10 %. Your estimate: gross margin 25 % if all goes well, negative if SAT slips a month. What do you propose?`,
          choices: [
            { text: "Decline the full integration, recommend an integrator you trust, and offer Mizan's dust-stow and soiling functions as a specified, fixed-price package with its own ICD, plus an optional analytics subscription after COD.", next: "e", score: 10, feedback: "Protects the product roadmap, keeps the EPC as a channel and puts Mizan's product into the specification." },
            { text: "Accept but raise the price by 30 % to cover risk.", next: "c", score: 5, feedback: "Better priced, but the opportunity cost to the Shagaya study and the product is still there." },
          ],
        },
        c: {
          md: md`Eight months in, two vendors' register maps changed with firmware, SAT is three weeks late and the validation study has not started. What now?`,
          choices: [
            { text: "Finish the project with discipline, document every dependency for claims, and set a rule: no more integration contracts with LDs on others' COD.", score: 5, feedback: "Damage control, and a lesson that cost a year of product time." },
            { text: "Take a second integration contract to cover the overrun.", score: 0, feedback: "This is the services trap closing." },
          ],
        },
        d: {
          md: md`The EPC says: "Fine, but do you have anything for our dust problem at all?"`,
          choices: [
            { text: "Yes: describe the dust-stow and soiling analytics functions and offer to write the interface requirement for their specification.", next: "e", score: 8, feedback: "Recovers the product angle." },
            { text: "Not yet, call us next year.", score: 2, feedback: "Wastes a warm channel." },
          ],
        },
        e: {
          md: md`The EPC likes the idea and asks for a price for the Mizan package in their bid. How do you price it?`,
          choices: [
            { text: "A fixed fee for engineering and commissioning of the Mizan functions, plus a per-MWp annual subscription from COD, with liability capped to the package value.", score: 10, feedback: "Productised service now, recurring revenue later, bounded risk." },
            { text: "Hourly rates for whatever the EPC needs.", score: 3, feedback: "Open-ended time and materials pulls you back into services and gives no recurring revenue." },
          ],
        },
      },
    },
  ],
};

export default lesson;
