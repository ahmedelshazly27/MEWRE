import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc03-l04",
  title: "Channels and Motions: Product-led, Sales-led, Partner-led",
  summary:
    "A go-to-market motion is a cost structure: each one has a CAC floor, and the ACV must clear it within an acceptable payback. Derive CAC from rep capacity and cycle length, compute payback and minimum ACV, compare product-led, sales-led and partner-led economics, and choose a motion for B2B deep-tech with on-prem security reviews.",
  minutes: 85,
  objectives: [
    "Define product-led, sales-led, partner-led and founder-led motions and the mechanism by which each acquires customers",
    "Compute CAC, CAC payback, minimum viable ACV and LTV/CAC with units",
    "Explain, with Little's law, why long sales cycles raise CAC",
    "Evaluate a partner deal on net ACV and CAC rather than on reach",
    "Choose and sequence motions for Afterwave (and contrast with Mizan's tender-driven market)",
  ],
  concepts: [
    { id: "fc03.gtm-motion", name: "Go-to-market motion", description: "The repeatable way a company finds, wins and expands customers (product-led, sales-led, partner-led, or a hybrid), each with its own cost structure and ACV range.", competency: "fc-gtm", related: ["fc03.icp"] },
    { id: "fc03.cac", name: "Customer acquisition cost (CAC)", description: "Fully loaded sales and marketing spend divided by new customers won in the matching period; founder time counts.", competency: "fc-gtm", related: ["fc03.gtm-motion"] },
    { id: "fc03.cac-payback", name: "CAC payback", description: "Months of gross profit from a customer needed to recover its acquisition cost: CAC divided by monthly gross profit.", competency: "fc-gtm", related: ["fc03.cac"] },
    { id: "fc03.min-acv", name: "Minimum viable ACV", description: "The lowest annual contract value a motion can support at a target payback; every motion has a CAC floor and therefore an ACV floor.", competency: "fc-gtm", related: ["fc03.cac-payback", "fc03.value-quantification"] },
    { id: "fc03.partner-economics", name: "Partner economics", description: "Resellers, integrators and OEMs trade margin (net ACV) for access and lower CAC; worthwhile only when the CAC saving exceeds the margin and the partner can actually sell.", competency: "fc-gtm", related: ["fc03.gtm-motion", "fc03.cac"] },
    { id: "fc03.founder-led-sales", name: "Founder-led sales", description: "The founders sell the first customers themselves to learn the problem, the buyer and the playbook before hiring salespeople.", competency: "fc-gtm", related: ["fc03.gtm-motion"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The economics behind each motion",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You will be asked by investors "what's your go-to-market?" and the wrong answer is a list of channels. The right answer is a motion whose cost per customer fits the price per customer. Afterwave's deals involve on-prem deployment, InfoSec review and multi-month cycles: that rules some motions out on arithmetic alone. Mizan sells into public tenders in Kuwait, which rules others out on procurement rules. Getting this wrong means hiring the wrong first salesperson, or building a self-serve funnel nobody in a test lab is allowed to use.`,
        },
        {
          kind: "md",
          md: md`### The motions

| Motion | Mechanism | Typical ACV | Typical cycle | Who does the work |
|---|---|---|---|---|
| **Product-led (self-serve)** | Users find, try and buy the product themselves; product usage creates leads | Under EUR 5k | Days to weeks | Product, growth, docs |
| **Product-led sales** | Free or trial usage creates product-qualified leads (PQLs); sales converts teams | EUR 5k to 30k | 1 to 3 months | Product + inside sales |
| **Inside sales** | Remote AEs, demos, short evaluations | EUR 10k to 50k | 1 to 4 months | SDR + AE |
| **Field (enterprise) sales** | AE + sales engineer, multi-stakeholder, pilots, security review | EUR 75k and up | 6 to 12+ months | AE, SE, founders, legal |
| **Partner-led** | Resellers, system integrators, OEM embedding, distributors or local agents sell or bundle you | Varies; net of margin | Partner's cycle | Partner + partner manager |
| **Founder-led** | Founders sell the first 10 to 20 customers themselves | Whatever the product is worth | Long; learning is the point | You |

These are indicative ranges from common SaaS practice, not laws. The point is the relationship between the columns.

### CAC, payback and the ACV floor

CAC is fully loaded spend per new customer:`,
        },
        { kind: "equation", formula: "fc03-cac" },
        {
          kind: "md",
          md: md`For a sales-led motion the dominant cost is people, and how many customers a person can win is bounded by **Little's law** (throughput = work in progress / cycle time):`,
        },
        { kind: "equation", formula: "fc03-rep-capacity" },
        {
          kind: "md",
          md: md`Double the cycle and you halve the wins per AE, so the people cost per win doubles. Long cycles are expensive *by construction*. Payback converts CAC into time:`,
        },
        { kind: "equation", formula: "fc03-cac-payback" },
        {
          kind: "md",
          md: md`Solve it for ACV and you get the key planning number, the **minimum ACV the motion can support**:`,
        },
        { kind: "equation", formula: "fc03-min-acv" },
        {
          kind: "md",
          md: md`This is the whole argument in one line: if your value quantification (Lesson 3) cannot support $ACV_{\min}$ for a motion, that motion is not available to you for that segment. Lifetime value adds the retention dimension:`,
        },
        { kind: "equation", formula: "fc03-ltv-cac" },
        {
          kind: "md",
          md: md`Heuristics from SaaS practice (Skok): LTV/CAC of 3 or more and payback under 12 months for SMB; enterprise businesses with very low churn tolerate 18 to 24 months. With fewer than about 20 customers, LTV rests on guessed churn, so lead with payback.

### Partners: margin for access

A partner (reseller, system integrator, DAQ or test-equipment vendor's ecosystem, local agent) keeps a margin:`,
        },
        { kind: "equation", formula: "fc03-partner-net-acv" },
        {
          kind: "md",
          md: md`The trade is only good if the CAC falls by more than the margin you give away **and** the partner can actually sell it. Partners sell what their customers already ask for; they rarely create demand for a new category. A partner channel usually works *after* you have proven direct demand and can hand the partner a playbook.

### Choosing for B2B deep-tech

Afterwave's characteristics push hard in one direction: high ACV potential (value of rig time and release speed), small number of identifiable buyers (test labs), technical evaluation, on-prem deployment and security review, pilot before purchase. That is a **founder-led then field-sales** motion, with partners for reach later (rig builders and test-system integrators who are already inside the lab) and product-led elements used only for **lead generation** (a free viewer, open data-format tooling, technical content), not as the revenue motion. Self-serve purchase fails at the first InfoSec review.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "ACV vs CAC by motion (illustrative, EUR thousands)",
          xKey: "motion",
          xLabel: "Motion",
          yLabel: "EUR k",
          series: [
            { key: "acv", label: "ACV (net to vendor)" },
            { key: "cac", label: "CAC" },
          ],
          data: [
            { motion: "Self-serve PLG", acv: 2, cac: 0.6 },
            { motion: "Product-led sales", acv: 12, cac: 8 },
            { motion: "Inside sales", acv: 25, cac: 15 },
            { motion: "Partner-led (net)", acv: 60, cac: 30 },
            { motion: "Field sales", acv: 100, cac: 120 },
          ],
          caption: "Illustrative numbers consistent with common SaaS ranges. Field sales is the only motion where CAC exceeds first-year ACV; it works because ACV is high and churn is low. Paybacks at 80 % gross margin: 4.5, 10, 9, 7.5 and 18 months.",
        },
        {
          kind: "matrix",
          title: "Which motion fits?",
          xAxis: ["Low ACV", "High ACV"],
          yAxis: ["Simple, low-risk purchase", "Complex, high-risk purchase (security review, integration, pilot)"],
          cells: [
            { label: "The trap", detail: "Needs a sales process the ACV cannot pay for. Simplify the product or the purchase, raise the price, or sell through a partner already in the account." },
            { label: "Field sales (Afterwave)", detail: "AE + SE, pilots, security pack. Founder-led until the playbook repeats." },
            { label: "Self-serve PLG", detail: "Product sells itself; spend on product and docs, not salespeople." },
            { label: "Inside sales or PLG + assist", detail: "High value, easy to buy: let the product start it and a salesperson close it." },
          ],
          caption: "Top row = complex purchase. Most deep-tech startups that die of GTM are in the top-left: real value, small contracts, enterprise purchasing friction.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Running the numbers for Afterwave",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "From rep capacity to CAC, payback and minimum ACV for a field-sales motion",
          given: md`Illustrative steady-state field motion (after founder-led sales): one AE (fully loaded EUR 220k/yr including variable pay) supported by half a sales engineer (EUR 110k/yr), together EUR 330k/yr. An AE carries 10 active qualified opportunities; cycle 9 months; win rate 25 %. Marketing programmes (events, content, travel) average EUR 21k per won deal. Gross margin 80 % (on-prem installation and support pull it below pure SaaS). Target ACV EUR 100k.`,
          steps: [
            { md: md`**Wins per AE:** $W = (12 \times 10 / 9) \times 0.25 = 13.33 \times 0.25 = 3.33$ customers per year.` },
            { md: md`**People cost per win:** $330{,}000 / 3.33 = \text{EUR } 99{,}000$. **CAC** $= 99{,}000 + 21{,}000 = \text{EUR } 120{,}000$.` },
            { md: md`**Payback:** monthly gross profit $= 100{,}000 \times 0.8 / 12 = \text{EUR } 6{,}667$; $P = 120{,}000 / 6{,}667 =$ **18 months**. Acceptable for enterprise if logo churn is low.` },
            { md: md`**ACV floor:** at an 18-month target, $ACV_{\min} = 12 \times 120{,}000 / (0.8 \times 18) = \text{EUR } 100{,}000$. At a 24-month tolerance it falls to EUR 75,000. Below that, this motion destroys cash.` },
            { md: md`**LTV/CAC:** with 10 % annual churn, $LTV = 100{,}000 \times 0.8 / 0.10 = \text{EUR } 800{,}000$; $LTV/CAC = 6.7$. Healthy, but resting on a churn guess.` },
            { md: md`**Sensitivity to cycle:** if security reviews push the cycle to 12 months, $W = 2.5$, people cost per win EUR 132k, CAC EUR 153k, payback 23 months. Shortening the security review (a ready security pack, Enclave reference architecture) is a CAC lever, not just a sales nicety.` },
          ],
          result: md`The field motion works at ACV of about EUR 100k and fails for the EUR 31k lab from Lesson 3. That is why Afterwave's ICP must select labs with enough rig-time pain, and why smaller labs need a different route (a partner already in the account, or a narrower product).`,
        },
        { kind: "widget", widget: "unit-economics", props: { price: 8333, cac: 120000 }, caption: "Enter the field-sales case (monthly price about EUR 8.3k, CAC EUR 120k) and vary gross margin and churn to see payback and LTV/CAC move." },
        {
          kind: "worked",
          mode: "faded",
          title: "Evaluate a reseller channel through a test-system integrator",
          given: md`Illustrative: an integrator that builds actuator test rigs offers to resell Afterwave at list ACV EUR 80k, keeping a 25 % margin. You would fund a partner manager (EUR 140k/yr loaded) and EUR 40k/yr of joint marketing and training. Expected partner-sourced wins: 6 per year. Gross margin 80 %.`,
          steps: [
            { md: md`Net ACV $= 80{,}000 \times (1 - 0.25) =$ EUR 60,000.` },
            { md: md`Partner CAC $= (140{,}000 + 40{,}000)/6 =$ **EUR 30,000**.`, hidden: true, check: { prompt: "Partner-channel CAC (EUR)", answer: 30000, unit: "EUR", tolerance: { rel: 0.005 } } },
            { md: md`Payback $= 30{,}000 / (60{,}000 \times 0.8 / 12) =$ **7.5 months**.`, hidden: true, check: { prompt: "Payback (months)", answer: 7.5, unit: "months", tolerance: { abs: 0.1 } } },
            { md: md`Compare direct: 18 months at CAC EUR 120k. The partner looks better on paper, but test the assumption that matters: will the integrator really produce 6 wins? At 2 wins, CAC is EUR 90k and payback 22.5 months, worse than direct, with 25 % less revenue per customer.` },
          ],
          result: md`Partner channels are judged on net ACV and on the partner's demonstrated ability to sell, which you cannot know until you have a playbook to give them. Start with one partner, no exclusivity, and a 6-month review against a wins target.`,
        },
        {
          kind: "question",
          question: {
            id: "fc03-l04-p1",
            type: "numeric",
            prompt: md`During founder-led sales, the CEO spends 60 % of his time selling (priced at a loaded EUR 150k/yr), plus EUR 45k/yr of travel and events. In that year Afterwave signs 3 annual contracts. What is the CAC? (EUR, counting founder time)`,
            answer: 45000,
            tolerance: { rel: 0.005 },
            unit: "EUR",
            explanation: md`$S_{SM} = 0.6 \times 150{,}000 + 45{,}000 = 135{,}000$; $CAC = 135{,}000/3 = \text{EUR } 45{,}000$. Founder-led CAC looks cheap because founders are underpaid; when you replace yourself with an AE it roughly triples (worked example). Plan for the replacement CAC, not the founder CAC.`,
            concepts: ["fc03.cac", "fc03.founder-led-sales"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Sequencing motions in practice",
      blocks: [
        {
          kind: "md",
          md: md`### The usual sequence for B2B deep-tech

1. **Founder-led (customers 1 to about 10):** you sell, Ismail or Yusuf act as sales engineer. Goal: learn the buyer, the objections, the security path and the pilot-to-contract conversion. Paul Graham's "do things that don't scale" applies literally: hand-hold each deployment.
2. **Paid pilots with pre-agreed success criteria:** a fixed fee (illustrative: EUR 25k for 12 weeks on two rigs), written success criteria (for Ripple: selection rate and zero missed regressions on a replayed history), and a pre-agreed conversion price. Free pilots attract the wrong accounts.
3. **First AE once the playbook repeats:** a repeatable sequence of stages, a known cycle, and at least a few wins not closed only on founder charisma. Many founders hire two AEs at once so that one failure is attributable to the person, not the playbook (common practice, see Roberge on hiring and ramp).
4. **Partners once direct demand is proven:** integrators who build rigs, test-equipment ecosystems, and later consultancies doing conformity work for machinery.
5. **Product-led elements throughout, as lead generation:** a free bench-data viewer, open converters for MDF or TDMS, technical write-ups. They create inbound from test engineers; they do not replace the enterprise sale.

### Mizan: why the motion is different

In Kuwait, much of the buying is by public bodies through tenders, so the "motion" is tender response plus relationship-building, often with a **local partner or agent** for registration, local content and presence. The CAC is dominated by bid preparation and long cycles tied to budget years. Check the specific registration and agency requirements for each tender with counsel; they are not covered here.`,
        },
        { kind: "xref", to: "m11-l04", note: "Approvals, local content and national preference in Kuwaiti public procurement: the constraints that shape a partner-led motion for Mizan." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Motion mistakes",
          md: md`- **PLG envy:** copying a developer-tool funnel for a product that needs InfoSec approval before install.
- **Hiring a big-company AE first:** he is used to a brand, a marketing team and inbound leads. Without a playbook he fails, and you lose 9 to 12 months.
- **Exclusive partner deals early:** an integrator asks for exclusivity in a region; you lose the ability to sell direct where it works.
- **Counting founder CAC as the real CAC:** the plan breaks when you hire.
- **Free pilots without conversion terms:** the pilot succeeds and nothing is bought because no budget was ever identified.`,
        },
        {
          kind: "checklist",
          title: "Before you hire the first AE",
          items: [
            "At least 5 to 10 paying customers, a few closed with limited founder involvement",
            "Written stage definitions with entry and exit criteria, and a measured cycle length",
            "Security pack and standard pilot agreement that pass review without founder rewriting",
            "Measured win rate on qualified opportunities and an ICP that predicts it",
            "Cash for the AE's ramp (often 6 to 9 months before full productivity) plus one full sales cycle",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask a prospective channel partner",
          items: [
            "Which of your current customers asked for something like this in the last year?",
            "Who in your team would sell it, and what is their quota made of today?",
            "What margin do you take on similar software, and what do you do for it (first-line support, installation)?",
            "What would make you stop selling it after six months?",
          ],
        },
        { kind: "scenario", scenario: "fc03-s2" },
        {
          kind: "question",
          question: {
            id: "fc03-l04-p2",
            type: "short",
            prompt: md`**Write a one-page GTM motion memo for Afterwave's first 24 months.** Include: (1) the motion for months 0 to 12 and 12 to 24 with the reason for each, (2) a unit-economics table (CAC, ACV, gross margin, payback, minimum ACV) with your illustrative assumptions and the formulas, (3) the role of partners and of product-led elements, (4) the conditions for hiring the first AE, and (5) two kill or pivot criteria that would make you change motion. Label all numbers illustrative.`,
            rubric: [
              "Chooses founder-led then field/enterprise sales for the core motion and justifies it with ACV, deployment (on-prem, security review) and buyer concentration",
              "Unit-economics table is internally consistent and uses the formulas correctly (CAC, payback = CAC / (ACV x GM / 12), ACV_min), with labelled illustrative inputs",
              "Partners are positioned as a later reach channel with net ACV and evidence of selling ability, not as the initial motion; product-led elements are lead generation",
              "First-AE hiring conditions are concrete (paying customers, repeatable stages, measured cycle and win rate, security pack, cash for ramp)",
              "Kill or pivot criteria are measurable (e.g. payback above 24 months after 4 quarters, pilot-to-contract conversion below a threshold, cycle above 12 months)",
              "Does not invent customers, revenue or partners",
            ],
            modelAnswer: md`**1. Motion.** Months 0 to 12: founder-led sales to ICP accounts scoring 70+ (e-drive and actuator labs), paid 12-week pilots with conversion terms. Reason: we need to learn the buyer and the security path, and our ACV needs pilots to prove value. Months 12 to 24: field sales with two AEs and one SE, founders on strategic deals. Reason: ACV about EUR 100k, on-prem deployment and multi-stakeholder buying require a field motion; PLG cannot pass InfoSec.

**2. Unit economics (illustrative).**

| Item | Founder-led (yr 1) | Field (yr 2) | Formula |
|---|---|---|---|
| S&M spend | EUR 135k | EUR 800k | |
| New customers | 3 | 7 | |
| CAC | EUR 45k | EUR 114k | $S_{SM}/N_{new}$ |
| ACV | EUR 90k | EUR 100k | |
| Gross margin | 75 % | 80 % | |
| Payback | 8 months | 17 months | $CAC/(ACV \cdot GM/12)$ |
| ACV floor at 18 months | | EUR 95k | $12\,CAC/(GM \cdot 18)$ |

**3. Partners and PLG.** From month 15, one non-exclusive pilot partnership with a test-rig integrator, evaluated on net ACV (list x 0.75) and wins after 6 months. Free bench-data viewer and open format converters as inbound lead generation for test engineers; no self-serve purchase.

**4. First AE when:** 5+ paying customers, two closed with limited founder involvement, written stages with measured cycle (target under 9 months) and win rate, security pack passing review unchanged, 18 months of runway.

**5. Kill or pivot criteria:** (a) pilot-to-contract conversion below 40 % after 6 pilots: revisit ICP and pilot design; (b) field payback above 24 months after four quarters of AE productivity: move down-market via partners or raise ACV with a larger scope.`,
            explanation: md`Graded against the rubric. The memo works if an investor can check every number from the formulas and the stated assumptions.`,
            concepts: ["fc03.gtm-motion", "fc03.cac-payback", "fc03.min-acv", "fc03.partner-economics"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor why Afterwave is not product-led, even though test engineers would love a free tool.",
          keyPoints: [
            "Each motion has a CAC floor; ACV must cover it within an acceptable payback",
            "On-prem deployment and InfoSec review block self-serve purchase in hardware test labs",
            "ACV of around EUR 100k supports a field motion with an 18-month payback",
            "Long cycles cut wins per salesperson (Little's law), so shortening the security review lowers CAC",
            "Free tools still help as lead generation for test engineers, feeding the sales-led motion",
          ],
        },
        { kind: "sources", refs: ["fc03-r7", "fc03-r8", "fc03-r6", "fc03-r14"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc03-l04-q1",
      type: "numeric",
      prompt: md`CAC EUR 60k, ACV EUR 40k, gross margin 75 %. What is the CAC payback in months?`,
      answer: 24,
      tolerance: { abs: 0.1 },
      unit: "months",
      explanation: md`Monthly gross profit $= 40{,}000 \times 0.75/12 = 2{,}500$; $P = 60{,}000/2{,}500 = 24$ months.`,
      concepts: ["fc03.cac-payback"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc03-l04-q2",
      type: "numeric",
      prompt: md`A motion has CAC EUR 90k and gross margin 80 %. What minimum ACV gives a 15-month payback? (EUR)`,
      answer: 90000,
      tolerance: { rel: 0.005 },
      unit: "EUR",
      explanation: md`$ACV_{\min} = 12 \times 90{,}000/(0.8 \times 15) = 1{,}080{,}000/12 = \text{EUR } 90{,}000$.`,
      concepts: ["fc03.min-acv"],
      difficulty: 2,
    },
    {
      id: "fc03-l04-q3",
      type: "numeric",
      prompt: md`An AE carries 8 active opportunities, the cycle is 6 months and the win rate is 30 %. How many customers does she win per year?`,
      answer: 4.8,
      tolerance: { abs: 0.05 },
      unit: "customers/yr",
      explanation: md`$W = (12 \times 8/6) \times 0.30 = 16 \times 0.30 = 4.8$. If the cycle stretches to 12 months, $W$ halves to 2.4 and people cost per win doubles.`,
      concepts: ["fc03.cac", "fc03.gtm-motion"],
      difficulty: 2,
    },
    {
      id: "fc03-l04-q4",
      type: "mcq",
      prompt: "Why is self-serve product-led growth a poor primary motion for Afterwave?",
      options: [
        "Engineers dislike free tools",
        "On-prem deployment, security review and multi-stakeholder buying block self-serve purchase, and the ACV supports a sales-led motion",
        "PLG is illegal in the EU",
        "PLG only works for consumer products",
      ],
      answer: 1,
      explanation: md`The purchase is complex and high-value: that is the field-sales quadrant. PLG elements can still generate leads.`,
      concepts: ["fc03.gtm-motion"],
      difficulty: 1,
    },
    {
      id: "fc03-l04-q5",
      type: "multi",
      prompt: "Which statements about partner-led motions are true? (Select all that apply.)",
      options: [
        "Payback should be computed on net ACV after the partner's margin",
        "Partners typically create demand for brand-new categories",
        "A partner deal is only good if the CAC saving outweighs the margin given away",
        "Early regional exclusivity is usually harmless",
      ],
      answer: [0, 2],
      explanation: md`Partners sell what their customers already ask for, so they rarely create a category; early exclusivity can block your direct sales where they work.`,
      concepts: ["fc03.partner-economics"],
      difficulty: 2,
    },
    {
      id: "fc03-l04-q6",
      type: "decision",
      prompt: md`After 5 founder-led customers, an experienced enterprise AE from a large test-equipment vendor applies. He expects EUR 200k OTE, a marketing team and inbound leads. You have no stage definitions written down and 14 months of runway. What do you do?`,
      options: [
        { text: "Hire him now; his network will close deals.", score: 0.2, feedback: "Without a playbook and with 14 months of runway (less than ramp plus one cycle), this is a likely expensive miss." },
        { text: "Write the playbook first (stages, criteria, security pack, pilot terms), fix runway, then hire, ideally two AEs; keep the conversation warm.", score: 1, feedback: "Right: the AE scales a process; he does not invent one. Ramp plus one full cycle must fit inside runway." },
        { text: "Never hire salespeople; founders should always sell.", score: 0.2, feedback: "Founders cannot scale a field motion alone; the question is when, not whether." },
      ],
      explanation: md`Hire into a repeatable process with enough cash for ramp (often 6 to 9 months) plus one sales cycle.`,
      concepts: ["fc03.founder-led-sales", "fc03.gtm-motion"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc03-l04-f1", front: "CAC payback formula", back: md`$P = CAC / (ACV \cdot GM/12)$ months`, concepts: ["fc03.cac-payback"] },
    { id: "fc03-l04-f2", front: "Minimum ACV for a motion", back: md`$ACV_{\min} = 12\,CAC/(GM \cdot P^{*})$`, concepts: ["fc03.min-acv"] },
    { id: "fc03-l04-f3", front: "Why long cycles raise CAC", back: md`Little's law: wins per AE $= (12n/t_c)\,w$. Double the cycle, halve the wins, double people cost per win.`, concepts: ["fc03.cac"] },
    { id: "fc03-l04-f4", front: "Illustrative Afterwave field-sales numbers", back: "CAC EUR 120k, ACV EUR 100k, GM 80 %, payback 18 months, ACV floor EUR 100k.", concepts: ["fc03.min-acv"] },
    { id: "fc03-l04-f5", front: "SaaS heuristics (Skok)", back: "LTV/CAC of 3 or more; payback under 12 months for SMB; enterprise tolerates 18 to 24.", concepts: ["fc03.cac-payback"] },
    { id: "fc03-l04-f6", front: "Partner deal test", back: "Compute payback on net ACV; check the partner can actually sell; no early exclusivity.", concepts: ["fc03.partner-economics"] },
    { id: "fc03-l04-f7", front: "Sequence for B2B deep-tech", back: "Founder-led, paid pilots, first AEs once the playbook repeats, then partners; PLG elements as lead generation.", concepts: ["fc03.founder-led-sales"] },
  ],
  scenarios: [
    {
      id: "fc03-s2",
      title: "The integrator wants exclusivity",
      context: md`Month 9. Afterwave has three paid pilots, one converted. A mid-size integrator that builds drive and actuator test rigs in Germany says: "We'll bundle Ripple into every new rig we deliver. In return we want exclusive resale rights in the DACH region for three years and a 35 % margin."`,
      start: "a",
      concepts: ["fc03.partner-economics", "fc03.gtm-motion"],
      nodes: {
        a: {
          md: md`What is your first move?`,
          choices: [
            { text: "Accept: bundling into every rig is instant distribution.", score: 2, feedback: "You give away your largest region and a third of revenue before knowing whether they can sell.", next: "c" },
            { text: "Ask for data: how many rigs they delivered last year, to whom, and which customers asked for test-selection tooling; then model net ACV and wins.", score: 9, feedback: "Partner value is measured on their actual reach and selling ability.", next: "b" },
            { text: "Decline outright: partners are distractions.", score: 4, feedback: "Integrators are inside labs before you are; a well-structured deal could be valuable later.", next: "b" },
          ],
        },
        b: {
          md: md`They delivered 14 rigs last year to 9 customers; two asked about regression tooling. At 35 % margin on EUR 80k list, net ACV is EUR 52k. What do you propose?`,
          choices: [
            { text: "Non-exclusive referral and resale agreement, 20 to 25 % margin, 6-month review against a target of 3 partner-sourced wins, exclusivity only on named new-rig bundles, direct sales unaffected.", score: 10, feedback: "Captures the upside, caps the downside and keeps your direct motion intact." },
            { text: "Exclusive for 12 months instead of 36, same 35 %.", score: 5, feedback: "Better, but still blocks direct sales in DACH for a year with no performance condition." },
          ],
        },
        c: {
          md: md`Six months later the integrator has sold one bundle. Two DACH prospects you met at a conference must now go through the integrator, who is slow to quote.`,
          choices: [
            { text: "Renegotiate using the performance data: offer to keep their margin on bundles if they release direct accounts.", score: 5, feedback: "Recovery is possible, but you have lost two quarters in your best region." },
          ],
        },
      },
    },
  ],
};

export default lesson;
