import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc01-l03",
  title: "Founder-market fit and idea evaluation: bottom-up markets, why now, unfair advantages",
  summary:
    "Size a market from the customer up (TAM, SAM, SOM with real arithmetic and value-based ACV), test the 'why now', separate real unfair advantages from claims, and score Afterwave, Mizan and Suhail with one rubric.",
  minutes: 80,
  objectives: [
    "Build a bottom-up TAM, SAM and SOM from customer counts and annual contract value, and explain why top-down sizing misleads",
    "Bound annual contract value by the value the product creates for the customer",
    "State a 'why now' as a specific change in technology, regulation, cost or behaviour",
    "Distinguish an unfair advantage (hard to copy or buy) from a feature, and assess founder-market fit",
    "Score several ventures with one weighted rubric and defend the result",
  ],
  concepts: [
    { id: "fc01.market-sizing", name: "Bottom-up market sizing (TAM, SAM, SOM)", description: "Market size built from the number of buying units times annual contract value; TAM is everyone who could buy, SAM those you can reach with this product and model, SOM what you can realistically win in a few years.", competency: "fc-fundamentals", related: ["fc01.fund-returner", "fc01.value-capture"] },
    { id: "fc01.value-capture", name: "Value-based contract value", description: "A customer pays at most a fraction of the measurable value the product creates; that value pool bounds ACV and therefore market size.", competency: "fc-fundamentals", related: ["fc01.market-sizing"] },
    { id: "fc01.why-now", name: "Why now", description: "The specific recent change (technology, regulation, cost curve, behaviour, platform shift) that makes the idea possible or urgent today and not five years ago.", competency: "fc-fundamentals", related: ["fc01.unfair-advantage"] },
    { id: "fc01.unfair-advantage", name: "Unfair advantage", description: "Something that helps you win and cannot easily be copied or bought: insider insight, access, team, proprietary data, distribution, regulatory position.", competency: "fc-fundamentals", related: ["fc01.founder-market-fit"] },
    { id: "fc01.founder-market-fit", name: "Founder-market fit", description: "The degree to which the founders' experience, access and motivation give them insight into the problem, credibility with buyers and the staying power to persist.", competency: "fc-fundamentals", related: ["fc01.unfair-advantage", "fc01.idea-rubric"] },
    { id: "fc01.idea-rubric", name: "Idea evaluation rubric", description: "A weighted scoring of ventures on the same criteria (pain, market, why now, advantage, founder fit, time to revenue, capital need, venture-scale ceiling) to compare them honestly.", competency: "fc-fundamentals", related: ["fc01.market-sizing", "fc01.venture-scale"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Markets from the bottom up, why now and unfair advantage",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You are choosing where to spend scarce founder hours across three ventures, and investors will ask each of them "how big can this get, why now, and why you?". A bottom-up market size tells you whether Afterwave can clear a fund-returner bar; a value-pool calculation tells you whether Mizan's analytics alone can be a venture business or needs the control and hardware layer; a single rubric stops you from favouring the venture you happen to be working on this week.`,
        },
        {
          kind: "md",
          md: md`### Top-down vs bottom-up

**Top-down**: "The test and measurement market is worth tens of billions; if we get 1% we are huge." It tells an investor nothing: who buys, at what price, and why from you? Every slide with "1% of a big market" signals that the founder has not done the work.

**Bottom-up**: count the buying units and multiply by what each pays per year.`,
        },
        { kind: "equation", formula: "fc01-bottom-up-market" },
        {
          kind: "md",
          md: md`Apply it three times with tighter filters:

- **TAM (total addressable market):** every buying unit that has the problem, at a realistic ACV, anywhere.
- **SAM (serviceable available market):** the buying units you can actually serve with this product, sales model, language, security posture and geography.
- **SOM (serviceable obtainable market):** what you can realistically win within about five years, given competition and your sales capacity.`,
        },
        { kind: "equation", formula: "fc01-som" },
        {
          kind: "md",
          md: md`### Bound ACV by the value created

The weakest input in most bottom-up models is ACV. Bound it from the customer's side: what measurable value does the product create per year (hours saved, failures avoided, energy recovered, fines avoided), and what fraction of that will the customer pay? A common range for B2B software is 10 to 30% of the value created; above that the buyer's ROI case gets thin.`,
        },
        { kind: "equation", formula: "fc01-value-capture" },
        {
          kind: "md",
          md: md`This is where markets surprise founders. For Gulf solar the energy is cheap (record tariffs around 1 to 2 US cents/kWh, see Track 0 module 10), so a percentage point of recovered energy is worth little; the larger value pool may be cleaning cost and avoided damage. The applied section works the numbers.

### Why now

Ideas that are obviously good have usually been tried. The question an investor asks is **what changed recently** that makes this possible or urgent now. Valid answers name a mechanism:

- **Technology:** a capability crossed a threshold (foundation models, cheap sensors, edge compute).
- **Regulation:** a new obligation creates a buyer with a deadline.
- **Cost curve:** something got an order of magnitude cheaper (PV modules, GPU inference, sequencing).
- **Behaviour or market structure:** a new class of company exists that has the problem at scale.

For Afterwave the candidates are specific: the EU Machinery Regulation (EU) 2023/1230 applies from **20 January 2027** and, per the course research, places safety components with self-evolving (machine-learning) behaviour in the category that needs third-party conformity assessment; and physical-AI and humanoid companies are moving from prototypes to production, which multiplies the number of hardware test teams with ML-driven change. A why-now must be checked: the research notes industry requests to postpone parts of the regulation and records their outcome as unverified.

### Unfair advantage and founder-market fit

An **unfair advantage** helps you win and cannot easily be copied or bought. Test each claim with: could a well-funded competitor get this in 12 months with money? If yes, it is not unfair.

| Type | Example | Usually unfair? |
|---|---|---|
| Insider insight | Years running drive-unit validation; you know where test time is wasted | Yes, if it leads to a non-obvious product decision |
| Access | Trusted relationships with buyers who are hard to reach (government, research bodies) | Yes, for the first customers |
| Team | Founders whose past work is the credential buyers check | Yes, early |
| Proprietary data | Accumulated bench memory nobody else holds | Yes, once it compounds |
| Feature or speed | "We are faster", "our UI is better" | No: copyable |
| Funding | "We raised more" | No: rivals can raise too |

**Founder-market fit** is the founder version: insight into the problem, credibility with buyers, access to the first customers, and the motivation to persist for ten years. Paul Graham's advice on ideas points the same way: the best ideas often come from founders who are living in the future of an industry and notice what is missing, and a good early idea is wanted urgently by a small number of people rather than mildly by many.`,
        },
        {
          kind: "matrix",
          title: "Where an idea sits: market ceiling vs founder advantage",
          xAxis: ["Weak founder advantage", "Strong founder advantage"],
          yAxis: ["Small ceiling", "Large ceiling"],
          cells: [
            { label: "Crowded race", detail: "Large market but you have no edge: you compete on funding and speed. Most of these lose to better-placed teams." },
            { label: "Venture bet", detail: "Large ceiling and a real edge. This is where to put concentrated founder time and venture capital." },
            { label: "Avoid", detail: "Small market, no edge. Interesting projects, not companies." },
            { label: "Good business, not VC", detail: "Real edge in a bounded market. Can be very profitable; finance with revenue, grants or strategic partners." },
          ],
          caption: "Top-left, top-right, bottom-left, bottom-right. Place each venture with evidence, and note what would move it (a bigger SAM, a new advantage).",
        },
        {
          kind: "md",
          md: md`### One rubric for all ideas

Score each criterion 1 to 5 with a one-line justification, weight, and sum. The point is not precision; it is forcing the same questions on every venture.

| Criterion | Weight | What a 5 looks like |
|---|---|---|
| Pain (urgency, frequency, cost) | 20% | Buyer has budget and a deadline; problem costs them money every week |
| Market ceiling (bottom-up SAM) | 20% | SAM supports a company worth more than EUR 1 bn |
| Why now | 10% | A specific dated change creates demand |
| Unfair advantage | 15% | Edge competitors cannot buy within a year |
| Founder-market fit | 15% | Founders are the obvious people to build this |
| Time to first revenue | 10% | Paid pilots within 6 months |
| Capital efficiency | 10% | Can reach the next stage's evidence on a modest round |

Weighted score $= \sum w_i s_i$, out of 5.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Illustrative Afterwave market funnel (EUR m per year)",
          xKey: "level",
          xLabel: "Market level",
          yLabel: "EUR m per year",
          series: [{ key: "value", label: "Annual market (EUR m)" }],
          data: [
            { level: "TAM", value: 2000 },
            { level: "SAM", value: 300 },
            { level: "SOM (5 yr)", value: 9 },
          ],
          caption: "From the worked example below: illustrative counts and ACVs, not market research. The drop from SAM to SOM is the honest part of the model.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing Afterwave and Mizan from the customer up",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Afterwave: bottom-up TAM, SAM, SOM and the venture-scale gap",
          given: md`All counts and prices are **illustrative assumptions** to show the method; replace each with a sourced number (customer lists, conference attendee lists, hiring data, discovery calls). Buying unit: one hardware test and validation team. ACV: Lockstep plus Enclave plus Ripple per team.`,
          steps: [
            { md: md`**TAM:** hardware test and validation teams for electromechanical products worldwide, assumed 20,000, at EUR 100k ACV: $20{,}000\times0.1 = $ **EUR 2.0 bn/yr**.` },
            { md: md`**SAM:** teams in the physical-AI segments Afterwave targets (robotics, humanoids, drives and motors, batteries, powertrains, autonomous machines) in the EU and US, at companies able to buy on-prem enterprise software: assumed 2,500 teams at EUR 120k: $2{,}500\times0.12 = $ **EUR 300 m/yr**.` },
            { md: md`**SOM (5 years):** win 3% of the SAM with a small enterprise sales team: $0.03\times2{,}500 = 75$ teams, $75\times0.12 = $ **EUR 9 m ARR**.` },
            { md: md`**Fund-returner check (Lesson 1):** a EUR 817 m exit at an illustrative 8x revenue multiple needs about EUR 100 m revenue. EUR 9 m SOM is an order of magnitude short.` },
            { md: md`**What would close the gap:** land and expand (many teams per customer), higher ACV as bench memory and Ripple's change-impact analysis become embedded, and new revenue lines (Afterwave's own instrumented test platforms, test-as-a-service). For example 250 customers at EUR 400k each $= $ EUR 100 m. That is the venture hypothesis to test, and the evidence to collect is whether early customers expand.` },
          ],
          result: md`The bottom-up model shows a credible SAM (EUR 300 m) but a 5-year SOM far below a fund-returner. The honest pitch is not "1% of EUR 2 bn" but "a EUR 300 m core market with expansion paths to EUR 100 m+ revenue; here is the expansion evidence so far". Each assumption becomes a discovery-call question.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Mizan: what is a soiling-analytics licence worth per MW?",
          given: md`Illustrative: 1 MWac of Gulf PV at 30% AC capacity factor; energy sold at USD 16/MWh (consistent with Gulf tariffs around 1.6 US cents/kWh); analytics and cleaning optimisation recover 1.5 percentage points of soiling loss and cut cleaning cost by 25%; current cleaning cost USD 6,700 per MW per year (the manual-truck figure from a vendor-related Middle East test in the course research, unverified); Mizan captures 30% of the value created.`,
          steps: [
            { md: md`Energy per MW: $1\times0.30\times8{,}760 = 2{,}628$ MWh/yr. Revenue: $2{,}628\times16 = $ USD 42,048 per MW per year.` },
            { md: md`Recovered energy value: $0.015\times42{,}048$.` },
            { md: md`= USD 631 per MW per year.`, hidden: true, check: { prompt: "Value of 1.5 points of recovered soiling loss (USD per MW per year)", answer: 631, unit: "USD/MW/yr", tolerance: { abs: 3 } } },
            { md: md`Cleaning saving: $0.25\times6{,}700 = $ USD 1,675. Total value created $= 631 + 1{,}675 = $ USD 2,306 per MW per year.` },
            { md: md`Price Mizan can charge $= 0.30\times2{,}306$.` },
            { md: md`$\approx$ USD 692 per MW per year.`, hidden: true, check: { prompt: "Value-based price (USD per MW per year)", answer: 692, unit: "USD/MW/yr", tolerance: { abs: 4 } } },
            { md: md`**Market at that price:** Kuwait's solar is forecast at about 2.9 GW by 2030 (pv magazine, Sep 2025, in the course research): $2{,}900\times692 = $ USD 2.0 m/yr. Across an illustrative 40 GW of Gulf PV: USD 27.7 m/yr.` },
          ],
          result: md`At Gulf tariffs, recovered energy is worth little; most of the value is in cleaning cost. A pure analytics licence gives a Gulf SAM in the tens of millions of USD per year: a good business, not obviously venture-scale. The venture case for Mizan would need a larger value pool (plant control such as stow and tracker logic under dust and wind, avoided damage, hardware distribution) or markets beyond the Gulf. This is exactly the kind of finding the rubric should capture.`,
        },
        {
          kind: "question",
          question: {
            id: "fc01-l03-p1",
            type: "numeric",
            prompt: md`Suhail plans corporate sponsorships for Suhail Season. Illustrative: 400 companies in the region hire technical talent at a scale that makes sponsorship worthwhile; you can realistically reach 25% of them with your network and language; the average sponsorship is USD 15k per year. What is the annual SAM in USD k?`,
            answer: 1500,
            tolerance: { abs: 1 },
            unit: "USD k",
            explanation: md`SAM $= 400\times0.25\times15 = 1{,}500$ USD k per year (USD 1.5 m). A sponsorship-led ecosystem of this size can sustain a team and fund the mission, but it is not a fund-returner; that is why Lesson 1 suggested non-venture financing for Suhail.`,
            concepts: ["fc01.market-sizing"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Evaluating your three ventures with one rubric",
      blocks: [
        {
          kind: "md",
          md: md`### A first pass, using only established facts

This is a template for your own scoring, not a verdict. Scores are judgments from the facts in the venture briefs; change them as evidence arrives and write the evidence next to each score.

| Criterion (weight) | Afterwave | Mizan | Suhail |
|---|---|---|---|
| Pain (20%) | 4: test teams in physical AI face more software and model changes than they can retest; to confirm in discovery | 4: soiling is a major loss and opex driver in Kuwait (Track 0 research) | 3: builders want access to investors and employers; urgency varies |
| Market ceiling (20%) | 4: SAM sizable, expansion paths to venture scale unproven | 2 for analytics alone; 3 with control and distribution | 1 to 2 as events and media |
| Why now (10%) | 4: Machinery Regulation from 20 Jan 2027; physical AI moving to production | 3: Kuwait renewables pipeline (Shagaya Phase III) | 3: regional AI investment wave |
| Unfair advantage (15%) | 4: cofounders from Tesla drive-unit and inverter validation | 4: Kuwait presence, Arabic, KISR methodology partnership | 3: network and bilingual media |
| Founder-market fit (15%) | 4 | 4: energy MSc plus Kuwait base | 3 |
| Time to first revenue (10%) | 3: enterprise security reviews slow pilots | 2: public-sector buyers and tendering | 4: sponsorship can come quickly |
| Capital efficiency (10%) | 3 | 3 | 4 |
| **Weighted (out of 5)** | **3.80** | **3.20** (analytics only); 3.40 with control and distribution | **2.90** (ceiling scored 1.5) |

Afterwave: $0.2\times4 + 0.2\times4 + 0.1\times4 + 0.15\times4 + 0.15\times4 + 0.1\times3 + 0.1\times3 = 3.80$. Mizan (analytics only): $0.8 + 0.4 + 0.3 + 0.6 + 0.6 + 0.2 + 0.3 = 3.20$; raising the ceiling score to 3 adds 0.2. Suhail: $0.6 + 0.3 + 0.3 + 0.45 + 0.45 + 0.4 + 0.4 = 2.90$. The exercise below asks you to redo this with your own evidence.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "How to use the result",
          md: md`A rubric does not decide for you; it shows where the disagreement is. Here it says: Afterwave is the venture bet; Mizan's score depends heavily on whether the value pool extends beyond analytics; Suhail scores well on speed and cost but not on ceiling, which supports running it as a non-venture ecosystem. Lesson 5 turns this into an allocation of your time.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Where market sizing goes wrong",
          md: md`- **Counting units that cannot buy:** a team with no budget authority, or a company whose security policy forbids your deployment model, is not in your SAM.
- **ACV from hope:** an ACV not tested in at least five pricing conversations is a guess. Bound it with value created.
- **Double counting:** the same company counted as a robotics and a battery customer.
- **Confusing market with revenue:** SAM is what all vendors could earn; SOM is your share.
- **Why now that is not new:** "AI is growing" is not a why-now; "a regulation applies from a date and creates a conformity assessment obligation" is.
- **Advantages that are features:** if a competitor can buy it, it is not unfair.`,
        },
        {
          kind: "ask",
          title: "Discovery questions that feed the model",
          items: [
            "How many test or validation teams do you have, and who owns the budget for their tools?",
            "What does a retest cycle after a firmware or model change cost you today, in hours and in delay?",
            "What would you stop paying for if this worked?",
            "What security and deployment requirements must a vendor meet (on-prem, isolated tenant)?",
            "Who else did you look at, and why did you not buy it?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc01-l03-p2",
            type: "short",
            prompt: md`Produce a one-page bottom-up market sizing for one of your ventures (Afterwave or Mizan). Define the buying unit, give TAM, SAM and SOM with every count and ACV sourced or labelled as an assumption, bound the ACV by the value created, and end with the fund-returner check and the two assumptions you will test first in discovery.`,
            rubric: [
              "Defines a concrete buying unit (team, site, MW, plant) rather than a vague market",
              "Computes TAM, SAM and SOM as count times ACV with explicit filters between levels and correct arithmetic",
              "Bounds ACV by a value-created calculation with a stated capture share",
              "Labels each input as sourced (with source) or assumed; no invented customers or traction",
              "Compares the result with a fund-returner or venture-scale bar and states the gap honestly",
              "Names the two riskiest assumptions and how discovery will test them",
            ],
            modelAnswer: md`**Afterwave, bottom-up market (assumptions labelled)**

**Buying unit:** one hardware test and validation team (5 to 30 engineers) responsible for a product line.

**Value created per team (assumption, to test):** a team of 15 spends about 30% of its time retesting after firmware, model or rig changes. At EUR 100k loaded cost per engineer that is EUR 450k/yr; if Ripple cuts unnecessary retests by a third, value is EUR 150k/yr, plus faster releases. At 30% capture of the direct saving, about EUR 45k for Ripple alone; with Lockstep (capture) and Enclave (private environment for data, models and agents) priced on their own value, EUR 120k per team (assumption to test).

| Level | Filter | Count (assumed) | ACV | Market |
|---|---|---|---|---|
| TAM | All electromechanical test teams worldwide | 20,000 | EUR 100k | EUR 2.0 bn |
| SAM | Physical-AI segments, EU and US, able to buy on-prem | 2,500 | EUR 120k | EUR 300 m |
| SOM (5 yr) | 3% of SAM | 75 | EUR 120k | EUR 9 m ARR |

**Fund-returner check:** an EUR 800 m exit at 8x revenue needs about EUR 100 m revenue; the core SOM is about a tenth of that. The venture case rests on expansion: more teams per customer and new lines (test platforms, test-as-a-service), e.g. 250 customers at EUR 400k.

**Test first:** (1) the share of test time spent on retests after changes (ask 10 test leads for their last three change events); (2) whether one customer would expand from one team to several within a year (ask design partners who else would use it).`,
            explanation: md`Graders look for a concrete unit, a clean funnel, a value-based ACV and honesty about the gap to venture scale. Labelled assumptions are fine; unlabelled ones are not.`,
            concepts: ["fc01.market-sizing", "fc01.value-capture", "fc01.fund-returner"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["fc01-r3", "fc01-r18", "fc01-r19"] },
        {
          kind: "feynman",
          prompt: "Explain Afterwave's 'why now' to a Zurich investor in under a minute, and say what would make it wrong.",
          keyPoints: [
            "A why-now names a specific, recent, checkable change, not a trend",
            "EU Machinery Regulation applies from 20 January 2027 and treats ML-based safety components as needing third-party conformity assessment (per research)",
            "Physical-AI companies moving to production multiply test teams facing frequent firmware and model changes",
            "Evidence needed: buyers citing the deadline or the change rate as a reason to buy now",
            "What would make it wrong: postponement or narrow scope of the AI provisions, or buyers solving it in-house",
          ],
        },
        { kind: "xref", to: "m10-l02", note: "Why Gulf PV tariffs are around 1 to 2 US cents/kWh: the reason recovered energy is a small value pool for Mizan." },
      ],
    },
  ],
  quiz: [
    {
      id: "fc01-l03-q1",
      type: "numeric",
      prompt: md`Bottom-up: 1,200 target companies, an average of 2.5 buying teams each, ACV EUR 40k. What is the market in EUR m per year?`,
      answer: 120,
      tolerance: { abs: 0.5 },
      unit: "EUR m",
      explanation: md`$1{,}200\times2.5\times0.04 = 120$ EUR m/yr. Counting teams per company (not just companies) is often what makes an enterprise market large enough.`,
      concepts: ["fc01.market-sizing"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc01-l03-q2",
      type: "numeric",
      prompt: md`A product saves a customer EUR 250k a year. If customers will pay about 20% of measurable value, what ACV (EUR k) can you defend?`,
      answer: 50,
      tolerance: { abs: 0.5 },
      unit: "EUR k",
      explanation: md`$0.20\times250 = 50$ EUR k. Pricing above the value-based bound makes the buyer's ROI case hard to approve.`,
      concepts: ["fc01.value-capture"],
      difficulty: 1,
    },
    {
      id: "fc01-l03-q3",
      type: "mcq",
      prompt: "Which is a valid 'why now'?",
      options: [
        "\"AI is the biggest trend of the decade.\"",
        "\"A regulation applying from a fixed date creates a new conformity-assessment obligation for our buyers.\"",
        "\"Our team is passionate about this space.\"",
        "\"The market is worth USD 30 bn.\"",
      ],
      answer: 1,
      explanation: md`A why-now names a specific, recent, checkable change that creates demand or makes the product possible. Trends, passion and market size are not changes.`,
      concepts: ["fc01.why-now"],
      difficulty: 1,
    },
    {
      id: "fc01-l03-q4",
      type: "multi",
      prompt: "Which are unfair advantages in the sense of this lesson? (Select all that apply.)",
      options: [
        "Cofounders who ran validation for the kind of product the customers build",
        "A faster user interface",
        "A methodology partnership with the research body that operates the target plant",
        "Having raised more money than competitors",
        "Proprietary accumulated test data that improves the product with use",
      ],
      answer: [0, 2, 4],
      explanation: md`Insight, access and compounding proprietary data are hard to copy or buy. A UI and funding can be matched by a well-funded rival.`,
      concepts: ["fc01.unfair-advantage", "fc01.founder-market-fit"],
      difficulty: 1,
    },
    {
      id: "fc01-l03-q5",
      type: "numeric",
      prompt: md`Rubric weights: pain 0.2, ceiling 0.2, why now 0.1, advantage 0.15, founder fit 0.15, time to revenue 0.1, capital efficiency 0.1. A venture scores 5, 3, 4, 3, 4, 2, 3. What is its weighted score (out of 5)?`,
      answer: 3.55,
      tolerance: { abs: 0.01 },
      explanation: md`$0.2\times5 + 0.2\times3 + 0.1\times4 + 0.15\times3 + 0.15\times4 + 0.1\times2 + 0.1\times3 = 1.0 + 0.6 + 0.4 + 0.45 + 0.6 + 0.2 + 0.3 = 3.55$.`,
      concepts: ["fc01.idea-rubric"],
      difficulty: 1,
    },
    {
      id: "fc01-l03-q6",
      type: "decision",
      prompt: md`Your pitch deck draft for Afterwave says: "Test and measurement is a USD 30 bn market; capturing 1% makes us a USD 300 m company." You are about to send it. What do you do?`,
      options: [
        { text: "Send it: the number is from a reputable report.", score: 0, feedback: "Top-down 1% claims signal that the founder has not counted customers. Investors discount them." },
        { text: "Replace it with a bottom-up funnel: buying unit, counts, value-based ACV, SAM and SOM, and the expansion path to venture scale, keeping the top-down figure only as context.", score: 1, feedback: "Shows who buys, at what price, and why the ceiling is large enough: the actual question." },
        { text: "Raise the share to 5% to make it look bigger.", score: 0, feedback: "Makes the same error worse." },
      ],
      explanation: md`Bottom-up sizing is evidence; top-down sizing is a claim.`,
      concepts: ["fc01.market-sizing"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc01-l03-f1", front: "Bottom-up market formula", back: md`$M = N\times\text{ACV}$: number of buying units times annual contract value.`, concepts: ["fc01.market-sizing"] },
    { id: "fc01-l03-f2", front: "TAM vs SAM vs SOM", back: "TAM: everyone with the problem. SAM: those you can serve with this product and model. SOM: what you can win in about five years.", concepts: ["fc01.market-sizing"] },
    { id: "fc01-l03-f3", front: "Value-based ACV bound", back: md`$\text{ACV} \le k\,V_c$ with $k$ typically 10 to 30% of the value created per year.`, concepts: ["fc01.value-capture"] },
    { id: "fc01-l03-f4", front: "Four sources of a why-now", back: "Technology threshold, regulation with a date, cost-curve drop, new behaviour or market structure.", concepts: ["fc01.why-now"] },
    { id: "fc01-l03-f5", front: "Test for an unfair advantage", back: "Could a well-funded competitor get it within about 12 months with money? If yes, it is not unfair.", concepts: ["fc01.unfair-advantage"] },
    { id: "fc01-l03-f6", front: "Mizan analytics value per MW (illustrative)", back: "About USD 2,300 per MW per year created, USD 690 capturable: cleaning cost, not recovered energy, is the main pool at Gulf tariffs.", concepts: ["fc01.value-capture"] },
    { id: "fc01-l03-f7", front: "Founder-market fit components", back: "Insight into the problem, credibility with buyers, access to first customers, staying power.", concepts: ["fc01.founder-market-fit"] },
  ],
};

export default lesson;
