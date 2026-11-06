import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc03-l02",
  title: "ICP Definition and Segmentation",
  summary:
    "An ideal customer profile is a falsifiable statement about which accounts buy fastest, pay most and churn least. Build one from firmographics, technographics, buying triggers and pain intensity; turn it into a weighted scoring model; and use it to choose a beachhead and say no to the rest.",
  minutes: 75,
  objectives: [
    "Distinguish ICP, buyer persona, segment and TAM, and state why the ICP is about accounts",
    "Describe an ICP with firmographic, technographic, trigger and pain-intensity criteria plus explicit disqualifiers",
    "Estimate pain intensity as the annual cost of the status quo",
    "Build and apply a weighted ICP scoring model, and show how the weights encode strategy",
    "Choose a beachhead segment using Moore's criteria and the team's own access",
  ],
  concepts: [
    { id: "fc03.icp", name: "Ideal customer profile (ICP)", description: "Description of the accounts (companies or units) that get the most value fastest and are most valuable to you: they buy quickly, expand and refer. A targeting tool, not a persona.", competency: "fc-gtm", related: ["fc03.best-fit-customer"] },
    { id: "fc03.firmographics-technographics", name: "Firmographics and technographics", description: "Firmographics: observable company traits (industry, size, geography, funding, programme phase). Technographics: the tools, data formats and infrastructure policies they use.", competency: "fc-gtm", related: ["fc03.icp"] },
    { id: "fc03.buying-triggers", name: "Buying triggers", description: "Events that make the problem urgent now: a new programme, a release cadence jump, a regulatory date, a new leader, a funding round, a failure or audit finding.", competency: "fc-gtm", related: ["fc03.icp"] },
    { id: "fc03.pain-intensity", name: "Pain intensity", description: "How much the problem costs, how often, and whether the account knows it; estimated as the annual cost of the status quo.", competency: "fc-gtm", related: ["fc03.icp", "fc03.value-themes"] },
    { id: "fc03.icp-scoring", name: "ICP scoring model", description: "Weighted sum of criterion scores used to rank accounts; the weights encode the go-to-market strategy and must be recalibrated against won and lost deals.", competency: "fc-gtm", related: ["fc03.icp", "fc03.pain-intensity"] },
    { id: "fc03.beachhead", name: "Beachhead segment", description: "The first narrow segment you aim to dominate, chosen so that customers reference each other and the whole product can be delivered (Moore).", competency: "fc-gtm", related: ["fc03.icp", "fc03.market-category"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From 'everyone with a test bench' to a ranked account list",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave could sell to robotics, humanoids, drives and motors, batteries, powertrains and autonomous machines. That list is a market, not a target. With three founders and a seed budget you can run perhaps 30 to 50 serious account pursuits in the next year. The ICP decides which 50, and it decides it before the first outbound email. The same applies to Mizan: utilities, EPCs, O&M contractors, KISR and ministries all touch PV soiling, but they buy in completely different ways and on different calendars.`,
        },
        {
          kind: "md",
          md: md`### Terms that get mixed up

| Term | Unit of analysis | Question it answers |
|---|---|---|
| **TAM / market** | All potential buyers | How big could this be? (investor question) |
| **Segment** | A group of accounts with shared needs and buying behaviour | Where do needs cluster? |
| **ICP** | The account (company, plant, lab) | Which accounts should we spend scarce effort on now? |
| **Buyer persona** | A person inside the account | Who do we talk to, and what do they care about? (Lesson 3) |

The ICP describes **accounts**. In B2B the account buys; people inside it influence. For Afterwave the "account" is often not the whole company but a **test or validation lab** (one budget, one rig fleet, one head of validation).

### The four layers of an ICP

1. **Firmographics** (observable from outside): industry and product type (e-drive, actuator, battery pack), company size and funding, geography (EU, US), programme phase (prototype, B-sample, SOP), size of the test organisation (number of rigs, test engineers).
2. **Technographics**: DAQ hardware and software in use, test executive (TestStand, in-house), data formats (MDF, TDMS, Parquet), firmware release tooling and CI, data-residency policy (on-prem only? isolated cloud tenant allowed?). Technographics decide whether you can actually be deployed.
3. **Buying triggers**: events that move a problem from "known" to "must fix this quarter". Examples: a new platform programme, monthly instead of quarterly firmware releases, ML entering a safety function, the EU Machinery Regulation applying from 20 January 2027, a new head of validation, a recall or audit finding, a funding round that funds a test lab build-out.
4. **Pain intensity**: frequency times severity times awareness. An account with a costly, frequent problem it does not yet recognise is a long education sale; one that recognises it and has a trigger is a short one.

Add **disqualifiers** (a negative ICP): conditions that rule an account out regardless of score, such as "cloud-only data policy that forbids on-prem software" or "fewer than three rigs".

### Pain intensity as a number

The cleanest estimate of pain is the annual cost of the status quo:`,
        },
        { kind: "equation", formula: "fc03-pain-cost" },
        {
          kind: "md",
          md: md`For a change-impact product, the status quo is the full regression after each change. A lab with 48 regression-triggering releases a year, 300 rig-hours per full regression and EUR 110 per rig-hour (fully loaded: technician, depreciation, energy, facility; illustrative) spends $48 \times 300 \times 110 = \text{EUR } 1.58$ m a year just on regression. That number sizes how much the account could rationally pay, and whether the economic buyer will notice.

### The scoring model

A scoring model turns the ICP into a ranked list. Score each criterion $s_i$ on 0 to 5 and weight it:`,
        },
        { kind: "equation", formula: "fc03-icp-score" },
        {
          kind: "md",
          md: md`**The weights are the strategy.** Putting 0.30 on pain says "we sell to people who are bleeding"; putting 0.20 on access says "we sell where our founders are credible". Change a weight and the ranking changes (you will see it in the faded example). Calibrate after every 10 closed deals (won or lost): which criteria actually predicted winning?

Illustrative Afterwave model:

| Criterion | Weight $w_i$ | 5 = | 0 = |
|---|---|---|---|
| Pain intensity (change frequency x rig cost) | 0.30 | weekly releases, days of regression on scarce rigs | rare changes, cheap rigs |
| Trigger present now | 0.20 | new programme, ML safety function, MR exposure in 2027 | no event in sight |
| Technographic fit | 0.15 | supported DAQ and formats, on-prem accepted | unsupported stack, cloud-only |
| Ability to buy | 0.15 | named budget owner, funded | no budget, grant-dependent |
| Access and credibility | 0.10 | warm path, drives domain (team's Tesla background) | cold, unfamiliar domain |
| Reference value | 0.10 | others in the segment will follow them | isolated logo |

### Choosing a beachhead

Moore's beachhead logic (*Crossing the Chasm*): pick a segment small enough to dominate, where customers talk to each other (so references compound), where you can deliver the **whole product** (product plus integration, support, documents), and where pain is severe enough that pragmatists will buy from a startup. A segment that wins on all of that beats a larger segment where you are one of many.`,
        },
        {
          kind: "matrix",
          title: "Pain intensity vs ability to buy",
          xAxis: ["Low ability to buy", "High ability to buy"],
          yAxis: ["Low pain", "High pain"],
          cells: [
            { label: "Nurture / design partner", detail: "Hurting but no budget or authority (early startups, university labs). Good for learning, not for revenue." },
            { label: "ICP core: pursue now", detail: "Costly, frequent pain, a named budget owner, deployable stack. Your 30 to 50 accounts." },
            { label: "Ignore", detail: "Neither hurting nor able to buy." },
            { label: "Slow yes", detail: "Can pay but does not feel it; they buy late and ask for roadmap. Do not let them steer the product." },
          ],
          caption: "Plot accounts after scoring. Only the top-right quadrant gets founder time in the first year.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Scoring four Afterwave account archetypes",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Rank four illustrative archetypes with the weighted model",
          given: md`Weights as in the table above: pain 0.30, trigger 0.20, technographic fit 0.15, ability to buy 0.15, access 0.10, reference value 0.10. Scores 0 to 5, $s_{\max} = 5$. The four accounts are **illustrative archetypes**, not real prospects: (A) actuator test lab at a Series B humanoid company; (B) e-drive validation lab at a tier-1 automotive supplier; (C) university robotics lab; (D) cell test lab at a battery manufacturer.`,
          steps: [
            {
              md: md`**Scores:**

| Criterion ($w$) | A humanoid | B e-drive | C university | D battery |
|---|---|---|---|---|
| Pain (0.30) | 5 | 4 | 2 | 3 |
| Trigger (0.20) | 4 | 3 | 1 | 2 |
| Technographic fit (0.15) | 3 | 4 | 3 | 4 |
| Ability to buy (0.15) | 4 | 5 | 1 | 4 |
| Access (0.10) | 3 | 5 | 4 | 2 |
| Reference value (0.10) | 5 | 4 | 2 | 3 |`,
            },
            { md: md`**A:** $\sum w_i s_i = 0.3(5)+0.2(4)+0.15(3)+0.15(4)+0.1(3)+0.1(5) = 1.5+0.8+0.45+0.6+0.3+0.5 = 4.15$, so $S_A = (100/5)\times 4.15 =$ **83**.` },
            { md: md`**B:** $1.2+0.6+0.6+0.75+0.5+0.4 = 4.05$, so $S_B =$ **81**. **C:** $0.6+0.2+0.45+0.15+0.4+0.2 = 2.00$, so $S_C =$ **40**.` },
            { md: md`**Pain check for A** (cost of status quo, illustrative lab: 48 releases a year, 300 rig-hours per full regression, EUR 110/rig-hour): $C_{sq} = 48 \times 300 \times 110 = \text{EUR } 1{,}584{,}000$ a year. Regression also occupies $48 \times 300 = 14{,}400$ of roughly $12 \times 5{,}000 = 60{,}000$ available rig-hours, **24 %** of the lab's capacity. That is a pain an economic buyer can see.` },
            { md: md`**Decision rule:** pursue now at $S \ge 70$; nurture or design-partner at 50 to 69; ignore below 50 unless strategic. A and B are pursued; C may be a research collaborator but not a revenue target.` },
          ],
          result: md`Ranking: A (83) > B (81) > D (to compute) > C (40). The model says humanoid actuator labs and e-drive labs are near-equal; the tie is broken by strategy, not arithmetic.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Finish the ranking, then change the strategy",
          given: md`Use the scores for D in the table above. Then suppose you decide that, with a seed team, founder access matters more than trigger timing: new weights pain 0.25, trigger 0.15, technographic 0.15, ability 0.15, access 0.20, reference 0.10.`,
          steps: [
            { md: md`**D, original weights:** $0.3(3)+0.2(2)+0.15(4)+0.15(4)+0.1(2)+0.1(3)$.` },
            { md: md`$= 0.9+0.4+0.6+0.6+0.2+0.3 = 3.00$, so $S_D =$ **60** (nurture band).`, hidden: true, check: { prompt: "ICP score of D (0-100)", answer: 60, tolerance: { abs: 0.5 } } },
            { md: md`**A, new weights:** $0.25(5)+0.15(4)+0.15(3)+0.15(4)+0.2(3)+0.1(5) = 1.25+0.6+0.45+0.6+0.6+0.5 = 4.00$, so $S_A = 80$.` },
            { md: md`**B, new weights:** $0.25(4)+0.15(3)+0.15(4)+0.15(5)+0.2(5)+0.1(4) = 1.0+0.45+0.6+0.75+1.0+0.4 = 4.20$, so $S_B =$ **84**: B now ranks first.`, hidden: true, check: { prompt: "ICP score of B with the new weights (0-100)", answer: 84, tolerance: { abs: 0.5 } } },
          ],
          result: md`A 4-point swing from one weight change flips the beachhead from humanoids to e-drives. Neither ranking is "right": write down which strategic belief each weight encodes, then let won and lost deals recalibrate them. For a team whose credibility is drive-unit validation, an e-drive beachhead followed by humanoid actuators (which share motors, inverters and test methods) is a defensible sequence.`,
        },
        {
          kind: "question",
          question: {
            id: "fc03-l02-p1",
            type: "numeric",
            prompt: md`An illustrative motor test lab runs 30 regression-triggering firmware releases a year, each full regression takes 180 rig-hours, and a rig-hour costs EUR 95 fully loaded. What is the annual cost of the status quo? (EUR)`,
            answer: 513000,
            tolerance: { rel: 0.005 },
            unit: "EUR/yr",
            explanation: md`$C_{sq} = N_r H_{full} c_h = 30 \times 180 \times 95 = \text{EUR } 513{,}000$ per year. Compare it with the price you hope to charge: a product priced at 10 to 20 % of the value it removes needs that removed value to be well above the ACV your sales motion requires (Lesson 4).`,
            concepts: ["fc03.pain-intensity"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Building and maintaining the account list",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

- **Who:** the CEO owns the ICP; whoever does outbound (you, later an SDR) applies it. Engineers help score technographic fit.
- **Sources for firmographics and triggers:** company sites and press releases (funding, new programmes), job posts (a job ad for "HIL test engineer, TestStand, dynamometer" is a technographic and trigger signal at once), conference speaker and exhibitor lists, regulatory exposure (machinery with ML safety functions placed on the EU market after 20 January 2027), LinkedIn searches for validation leads.
- **Tooling:** a CRM (HubSpot, Attio, Pipedrive or a spreadsheet at first) with one field per criterion, the score computed, and the trigger recorded with a date. A spreadsheet is fine for the first 100 accounts; the discipline matters more than the tool.
- **Cadence:** re-score monthly (triggers expire); recalibrate weights after every 10 closed deals; review disqualifiers after every lost deal.

### Mizan: the same method, a different buying system

For Mizan's soiling analytics in Kuwait, ability to buy is dominated by **procurement route**: a public owner or operator usually buys through a tender or a research collaboration, on a fiscal-year calendar, so a "trigger" is often a budget cycle or a tender being issued rather than a product event. A pilot with a research body (the Shagaya Phase I pilot thread with KISR researchers as methodology partner) scores high on reference value and low on immediate revenue. Weight it accordingly rather than pretending it is a sales opportunity.`,
        },
        { kind: "xref", to: "m11-l02", note: "How Kuwaiti public tenders are evaluated: this sets 'ability to buy' and cycle length for Mizan's public-sector accounts." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "ICP mistakes that waste a year",
          md: md`- **ICP = TAM.** "Hardware companies in robotics, energy and automotive" ranks nothing.
- **Logo lust.** Scoring a famous brand 5 on reference value when the lab you can reach has no budget and a 14-month security review.
- **Scoring by gut.** If the score is entered after the meeting to justify it, the model learns nothing.
- **No disqualifiers.** The deals you lose slowest are the ones you should never have started.
- **Stale triggers.** A funding round 18 months ago is not a trigger.`,
        },
        {
          kind: "ask",
          title: "Qualification questions that score the ICP live",
          items: [
            "How many firmware or model releases needed bench regression last quarter, and how many rig-hours did each take?",
            "Which rigs are the bottleneck, and what does an hour on them cost you?",
            "What is changing in the next two quarters: new programme, new release cadence, ML in a safety function, EU market entry?",
            "Who owns the budget for test tooling, and has it been spent on anything similar?",
            "What is your policy for running third-party software on-prem, and who reviews it?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc03-l02-p2",
            type: "short",
            prompt: md`**Produce an ICP and scoring model for Mizan's PV soiling analytics** in Kuwait and the Gulf. Include: (1) the unit of analysis (what an "account" is), (2) firmographic and technographic criteria, (3) at least four buying triggers, (4) a pain-intensity formula with illustrative numbers, (5) a scoring table with weights summing to 1 and what 5 and 0 mean for each criterion, (6) at least three disqualifiers, and (7) a short note on how a research-partner pilot should be scored. Use only illustrative numbers and do not invent customers or results.`,
            rubric: [
              "Unit of analysis is the plant or the operating/O&M organisation responsible for it, not 'the government' or 'the Gulf'",
              "Criteria include observable firmographics (plant size, technology, soiling exposure, ownership and contract type) and technographics (SCADA or string-level data access, data export, cleaning method)",
              "Triggers are concrete and dated in kind (O&M contract tender or renewal, performance shortfall vs guarantee, new plant COD, cleaning cost or water constraint, budget cycle)",
              "Pain formula is dimensionally correct (e.g. soiling loss energy x tariff, or cleaning cost x frequency) with labelled illustrative numbers",
              "Weights sum to 1 and encode a stated strategy; disqualifiers are explicit",
              "Research-partner pilots are scored for reference and methodology value, not treated as near-term revenue, with no fabricated traction",
            ],
            modelAnswer: md`**1. Account:** one utility-scale PV plant (or portfolio) and the organisation that pays for its O&M performance: owner, operator or O&M contractor.

**2. Criteria.** Firmographics: plant size (MWp), single-axis tracker or fixed tilt, desert site with high dust exposure, ownership (IPP with PPA, state-owned, research), O&M contract with performance or availability guarantees. Technographics: access to inverter and string data via SCADA or historian, exportable data (Modbus or OPC UA tags, CSV), soiling stations or reference cells present, cleaning method (robotic, manual, water source).

**3. Triggers:** O&M contract tender or renewal; plant reporting performance ratio below guarantee; new plant reaching COD; cleaning budget cut or water constraint; research programme or budget cycle opening.

**4. Pain:** annual soiling loss value $= P_{\text{nom}} \times Y \times L_s \times p$. Illustrative: 100 MWp, 2,000 kWh/kWp, 5 % average soiling loss, USD 0.025/kWh gives $100{,}000 \times 2{,}000 \times 0.05 \times 0.025 = \text{USD } 250{,}000$ a year, plus cleaning cost. Improvement is the share of that loss avoided per cleaning dollar.

**5. Scoring (0 to 5):** pain (0.30: 5 = large plant, high dust, cleaning cost above USD 100k/yr); data access (0.20: 5 = string data and export available now; 0 = no access); trigger (0.20: 5 = tender or shortfall this year); ability to buy (0.15: 5 = named budget holder and direct purchase route; 0 = no budget line); reference value (0.15: 5 = others in Kuwait will follow). Sum 1.00. Strategy: we sell where data access and pain coincide.

**6. Disqualifiers:** no data access within six months; plant below 10 MWp; contract that prevents third-party analytics.

**7. Research-partner pilot:** score it high on reference value and methodology credibility (a validated method co-developed with researchers is a proof point for every later tender) and low on ability to buy; track it as a design partnership with its own success criteria, not as pipeline.`,
            explanation: md`Graded against the rubric. The key test: could someone else take your table and produce the same ranked list of plants? If not, the criteria are not observable enough.`,
            concepts: ["fc03.icp", "fc03.icp-scoring", "fc03.buying-triggers", "fc03.pain-intensity"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a new SDR why a famous robotics company can score lower on the ICP than a mid-size e-drive supplier.",
          keyPoints: [
            "The ICP ranks accounts by how fast they buy, how much value they get and how much they help us win others, not by fame",
            "Pain intensity (change frequency times rig cost) and an active trigger matter most",
            "Technographic fit and on-prem policy decide whether we can be deployed at all",
            "Founder access and credibility shorten the cycle; the team's drives background is an asset",
            "Weights encode strategy and are recalibrated against won and lost deals",
          ],
        },
        { kind: "sources", refs: ["fc03-r3", "fc03-r15", "fc03-r9"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc03-l02-q1",
      type: "mcq",
      prompt: "What is the unit of analysis of an ideal customer profile in B2B?",
      options: ["A person (the buyer persona)", "The account: a company or a unit with its own budget", "A country", "A product feature"],
      answer: 1,
      explanation: md`ICPs describe accounts; personas describe the people inside them. For Afterwave the account is often one test lab, not the whole corporation.`,
      concepts: ["fc03.icp"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc03-l02-q2",
      type: "multi",
      prompt: "Which of these are technographic criteria for Afterwave? (Select all that apply.)",
      options: [
        "DAQ hardware and software in use",
        "Number of employees",
        "Data-residency policy (on-prem only, isolated tenant allowed)",
        "Test data formats (MDF, TDMS, Parquet)",
        "Series B funding last quarter",
      ],
      answer: [0, 2, 3],
      explanation: md`Technographics describe tools and infrastructure policy. Employee count and funding are firmographics (funding can also be a trigger).`,
      concepts: ["fc03.firmographics-technographics"],
      difficulty: 1,
    },
    {
      id: "fc03-l02-q3",
      type: "numeric",
      prompt: md`Weights: pain 0.4, trigger 0.3, fit 0.2, access 0.1. An account scores pain 4, trigger 2, fit 5, access 3 (each 0 to 5). What is its ICP score on a 0 to 100 scale?`,
      answer: 70,
      tolerance: { abs: 0.5 },
      explanation: md`$\sum w_i s_i = 1.6+0.6+1.0+0.3 = 3.5$; $S = (100/5)\times 3.5 = 70$.`,
      concepts: ["fc03.icp-scoring"],
      difficulty: 1,
    },
    {
      id: "fc03-l02-q4",
      type: "mcq",
      prompt: "Which is the best example of a buying trigger for Ripple?",
      options: [
        "The company has a nice website",
        "The validation lab moves from quarterly to monthly firmware releases on the same rig fleet",
        "The company was founded ten years ago",
        "The CEO posts on LinkedIn",
      ],
      answer: 1,
      explanation: md`A cadence jump multiplies regression load without adding rigs: the pain becomes urgent now. That is what a trigger does.`,
      concepts: ["fc03.buying-triggers"],
      difficulty: 1,
    },
    {
      id: "fc03-l02-q5",
      type: "decision",
      prompt: md`A globally known robot maker's research lab wants a free pilot. It scores 52 on your ICP (high reference value, no budget owner, cloud-only data policy under review). Your pipeline has three accounts above 75 that need founder time. What do you do?`,
      options: [
        { text: "Run the pilot: the logo will open doors.", score: 0.2, feedback: "Logos without a deployment path and budget rarely convert, and the pilot will consume the founder time the 75+ accounts need." },
        { text: "Decline politely for now, offer a lightweight design-partner call every six weeks, and revisit if a budget owner and an on-prem path appear.", score: 1, feedback: "Right: keep the relationship at low cost, protect founder time for core ICP accounts, define what would change the score." },
        { text: "Run the pilot and put the three high-score accounts on hold.", score: 0, feedback: "Trades likely revenue for unlikely revenue." },
      ],
      explanation: md`The scoring model exists precisely to make this trade explicit. Record the disqualifier (cloud-only policy) and the trigger that would re-open it.`,
      concepts: ["fc03.icp-scoring", "fc03.icp"],
      difficulty: 2,
    },
    {
      id: "fc03-l02-q6",
      type: "mcq",
      prompt: "According to Moore, a good beachhead segment is one where:",
      options: [
        "The market is the largest available",
        "Customers reference each other, the pain is severe, and you can deliver the whole product",
        "There are no competitors at all",
        "Prices are the highest",
      ],
      answer: 1,
      explanation: md`Pragmatist buyers buy from a startup when peers vouch for it and the whole product (integration, support, documentation) is there. Size comes later, through adjacent segments.`,
      concepts: ["fc03.beachhead"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc03-l02-f1", front: "ICP vs persona", back: "ICP = which accounts to target; persona = which people inside them to talk to.", concepts: ["fc03.icp"] },
    { id: "fc03-l02-f2", front: "Four layers of an ICP", back: "Firmographics, technographics, buying triggers, pain intensity (plus disqualifiers).", concepts: ["fc03.icp"] },
    { id: "fc03-l02-f3", front: "Pain intensity as a number", back: md`Annual cost of the status quo, e.g. $C_{sq} = N_r H_{full} c_h$ for full regression.`, concepts: ["fc03.pain-intensity"] },
    { id: "fc03-l02-f4", front: "ICP score formula", back: md`$S = (100/s_{\max})\sum w_i s_i$, with $\sum w_i = 1$.`, concepts: ["fc03.icp-scoring"] },
    { id: "fc03-l02-f5", front: "What the ICP weights encode", back: "The strategy: what you believe predicts a fast, valuable win. Recalibrate after every 10 closed deals.", concepts: ["fc03.icp-scoring"] },
    { id: "fc03-l02-f6", front: "Beachhead (Moore)", back: "A narrow segment you can dominate: severe pain, peers who reference each other, whole product deliverable.", concepts: ["fc03.beachhead"] },
    { id: "fc03-l02-f7", front: "Disqualifier example for Afterwave", back: "Cloud-only data policy that forbids on-prem software, or fewer than three rigs.", concepts: ["fc03.icp"] },
  ],
};

export default lesson;
