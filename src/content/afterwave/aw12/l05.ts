import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw12-l05",
  title: "Segments and sequencing: humanoids, automotive tier-1s, drives and batteries",
  summary:
    "How the four main Afterwave segments differ in buyer, test practice, sales cycle, contract size, security bar and regulatory pull, how to compare them with the founder's fixed selling capacity, and how to sequence a beachhead, a bridge and long-cycle bets.",
  minutes: 70,
  objectives: [
    "You can describe the test organisation, change pattern and regulatory drivers of each segment.",
    "You can compute new ARR per seller-year and time to first close per segment from cycle, parallel deals, win rate and ACV.",
    "You can argue a segment sequence (beachhead, bridge, long-cycle bets) using arithmetic, founder credibility and regulatory timing.",
    "You can say which segment facts are assumptions to test in discovery rather than market data.",
  ],
  concepts: [
    { id: "aw12.segment-profile", name: "Segment profile", description: "For each segment: who buys, rig types, change cadence, typical cycle and ACV (as tested assumptions), security bar and the regulation or standard that creates a dated need for evidence.", competency: "aw-business", related: ["fc03.icp", "fc03.buying-triggers"] },
    { id: "aw12.segment-throughput", name: "Segment throughput", description: "New ARR one seller can add per year in a segment: (12 n / t) w ACV, plus the time to first close; the founder's selling hours are the constraint being allocated.", competency: "aw-business", related: ["fc03.cac", "fc04.sales-velocity"] },
    { id: "aw12.regulation-pull", name: "Regulation pull", description: "A dated regulatory or standards requirement that makes a buyer need traceable test evidence (Machinery Regulation from 20 January 2027, UNECE R156 software update management, ISO 26262, IEC 61800-5-2, the EU Battery Regulation).", competency: "aw-business", related: ["aw12.segment-profile"] },
    { id: "aw12.segment-sequence", name: "Beachhead, bridge and long-cycle bets", description: "Sequence segments so the fastest-cycle, highest-pain, best-fit segment funds learning (beachhead), an adjacent segment reuses references and product (bridge), and one or two long-cycle accounts are started early as design partners (bets).", competency: "aw-business", related: ["fc03.beachhead", "aw12.segment-throughput"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Four segments, four buying patterns",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave's target list spans robotics and humanoids, drives and motors, batteries, powertrains and autonomous machines. You are the only seller, and your technical cofounders can support only a few deals at once. A tier-1 deal can take more than a year; a humanoid startup can decide in a quarter. Where you spend the next 18 months of selling decides whether you have references and revenue at the seed and Series A, and which product Ripple becomes.`,
        },
        {
          kind: "xref",
          to: "fc03-l02",
          note: "Founder Core GTM: ICP scoring of four Afterwave account archetypes (humanoid actuator lab, tier-1 e-drive lab, university lab, battery cell lab) with weights. This lesson adds cycle, ACV, regulation and sequencing per segment.",
        },
        {
          kind: "md",
          md: md`### Segment profiles

| | Robotics and humanoid startups | Automotive tier-1s (e-drive, inverter, ADAS ECUs) | Drives and motors makers | Batteries (cell, module, pack) |
|---|---|---|---|---|
| **Test organisation** | Small test team, actuator and whole-robot rigs, test systems often built in-house | Large validation departments, HIL and dyno labs, formal test management | Product test labs, type testing, end-of-line test, functional safety testing | Cycler labs, abuse and environmental testing, long-duration tests |
| **Change pattern** | Very frequent firmware and model changes; hardware revisions every few months | Frequent software drops into structured release gates; strict variant management | Firmware for drive control and safety functions; slower than robotics | Fewer firmware changes (BMS); long tests mean each rerun is expensive |
| **Economic buyer** | Head of test or VP hardware; sometimes the CTO | Head of validation per product line; purchasing has a strong role | Head of R&D test or product engineering | Head of battery validation or test lab |
| **Cycle (assumption)** | 3 to 6 months | 12 to 18 months | 6 to 12 months | 6 to 12 months |
| **ACV per programme (assumption)** | Lower, but expands fast with fleet and programmes | Higher; procurement pushes price hard | Medium | Medium |
| **Security bar** | SOC 2 questions, architecture review | TISAX, supplier security process, OT | ISO/IEC 27001, OT | ISO/IEC 27001, OT, sometimes defence-adjacent |
| **Founder credibility** | High: actuators are electric drives; Tesla drive-unit and inverter validation transfers directly | High on e-drive and inverters, but tier-1 processes demand a track record | High: same physics and test methods as drive units | Medium: adjacent (power electronics, reliability), not core |

The cycle and ACV rows are **assumptions to test in discovery**, not market data: there is no reliable public benchmark for this category.

### Regulation pull

A dated requirement for traceable test evidence turns a nice-to-have into a budget line.

| Segment | Driver | Why it creates demand for change-impact evidence |
|---|---|---|
| Humanoids and robots | **EU Machinery Regulation 2023/1230**, applies from **20 January 2027**; ML-based safety functions go to notified-body assessment (Annex I Part A); **ISO 10218-1/-2:2025**; **ISO 25785-1** for legged and balancing robots still in draft | Machinery placed on the EU market after the date must meet the new requirements; every firmware or model change to a safety-relevant function needs evidence of what was re-verified |
| Automotive | **ISO 26262:2018**; **UNECE R155 and R156** (cyber security and software update management systems for type approval); **ISO/PAS 8800:2024** for AI in road vehicles; Automotive SPICE | R156 requires managing software updates and their effect on type-approved systems: a direct demand for change-impact analysis and retest evidence |
| Drives and motors | **IEC 61800-5-2** (functional safety of drive safety sub-functions such as STO); Machinery Regulation when used as safety components; ecodesign efficiency rules | Safety function firmware changes need re-verification evidence |
| Batteries | **EU Battery Regulation 2023/1542** (battery passport from 18 February 2027 for EV, light-means-of-transport and industrial batteries above 2 kWh); UN 38.3 transport tests; IEC 62619 | Long, expensive tests make every avoidable rerun costly; regulation is more about product data than retest selection |

### Comparing segments with a fixed founder

Your selling capacity is the constraint. For each segment, the new ARR one seller can add per year:`,
        },
        { kind: "equation", formula: "aw12-segment-throughput" },
        {
          kind: "md",
          md: md`This is a steady-state rate. Also check **time to first close**: a deal started today closes after $t_s$ months, and only then does a pilot (another 3 months) turn into ARR. A segment with a 14-month cycle adds nothing in your first year of selling, however large its ACV.`,
        },
        {
          kind: "matrix",
          title: "Segment sequencing",
          xAxis: ["Long cycle", "Short cycle"],
          yAxis: ["Weaker founder fit or pull", "Strong founder fit and pull"],
          cells: [
            { label: "Long-cycle bets", detail: "Automotive tier-1s: start 1 or 2 design-partner relationships early; revenue later; strong references." },
            { label: "Beachhead", detail: "Humanoid and robotics actuator labs: fast cycles, high pain, Machinery Regulation pull, direct founder credibility." },
            { label: "Later or opportunistic", detail: "Battery labs: real pain from long reruns, but weaker founder fit and pull for selection." },
            { label: "Bridge", detail: "Drives and motors makers: same physics as actuators, reuses product and references, moderate cycle." },
          ],
          caption: "A starting hypothesis to test, not a conclusion. The arithmetic below tests one version of it.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Throughput per segment",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "New ARR per seller-year in four segments",
          given: md`**Illustrative planning assumptions**, not market data. Humanoid startups: $n = 6$ parallel deals, $t = 5$ months, $w = 0.30$, ACV EUR 90k. Tier-1s: $n = 4$, $t = 14$, $w = 0.25$, ACV EUR 250k. Drives and motors: $n = 5$, $t = 9$, $w = 0.30$, ACV EUR 120k. Batteries: $n = 4$, $t = 10$, $w = 0.25$, ACV EUR 110k.`,
          steps: [
            { md: md`**Humanoid:** deals completed per year $12 \times 6/5 = 14.4$; wins $14.4 \times 0.30 = 4.32$; $A = 4.32 \times 90{,}000 =$ **EUR 388,800/yr**.` },
            { md: md`**Tier-1:** $12 \times 4/14 = 3.43$; wins $0.857$; $A = 0.857 \times 250{,}000 =$ **EUR 214,286/yr**.` },
            { md: md`**Drives:** $12 \times 5/9 = 6.67$; wins $2.0$; $A =$ **EUR 240,000/yr**.` },
            { md: md`**Batteries:** $12 \times 4/10 = 4.8$; wins $1.2$; $A =$ **EUR 132,000/yr**.` },
            { md: md`**Time to first close:** humanoid about 5 months, drives 9, batteries 10, tier-1 14. Add a 3-month pilot before full ARR. Within a 12-month horizon, a tier-1 deal started today produces no ARR.` },
          ],
          result: md`Under these assumptions the humanoid segment yields about 1.8 times the tier-1 ARR per seller-year and reaches first revenue 9 months sooner. Tier-1s still matter for their ACV, references and regulation-driven demand, which is why they belong as one or two early design-partner bets, not the main allocation.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "New ARR per seller-year and time to first close (illustrative)",
          xKey: "segment",
          xLabel: "Segment",
          yLabel: "EUR k/yr (ARR) and months (cycle)",
          series: [
            { key: "arr", label: "New ARR per seller-year (EUR k)" },
            { key: "cycle", label: "Months to first close" },
          ],
          data: [
            { segment: "Humanoid", arr: 388.8, cycle: 5 },
            { segment: "Tier-1", arr: 214.3, cycle: 14 },
            { segment: "Drives", arr: 240, cycle: 9 },
            { segment: "Batteries", arr: 132, cycle: 10 },
          ],
          caption: "From the worked example; every input is a planning assumption to be replaced by your own pipeline data.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: references from humanoid wins shorten the drives cycle",
          given: md`After three humanoid actuator references, you assume the drives cycle falls from 9 to 7 months and the win rate rises from 0.30 to 0.35. $n = 5$, ACV EUR 120k unchanged.`,
          steps: [
            { md: md`Deals completed per year: $12 \times 5/7$.` },
            { md: md`$= 8.57$; wins $8.57 \times 0.35 =$ **3.0** a year.`, hidden: true, check: { prompt: "Wins per year in drives", answer: 3.0, unit: "wins/yr", tolerance: { abs: 0.05 } } },
            { md: md`New ARR per seller-year: $3.0 \times 120{,}000$.` },
            { md: md`$=$ **EUR 360,000/yr**, up from EUR 240,000.`, hidden: true, check: { prompt: "New ARR per seller-year in drives (EUR)", answer: 360000, unit: "EUR/yr", tolerance: { rel: 0.01 } } },
          ],
          result: md`This is the bridge mechanism: references from the beachhead raise win rate and shorten the cycle in the adjacent segment. Test it by tracking cycle and win rate per segment in the CRM, not by assuming it.`,
        },
        {
          kind: "widget",
          widget: "pipeline-forecast",
          props: { target: 600000, acv: 100000 },
          caption: "Model a mixed pipeline across segments with different stage probabilities and cycle lengths, and check expected bookings per quarter against a target.",
        },
      ],
    },
    {
      layer: "field",
      title: "Testing and running the sequence",
      blocks: [
        {
          kind: "callout",
          tone: "unverified",
          title: "What is assumed here",
          md: md`- Cycle lengths and ACVs per segment are planning assumptions; no reliable public benchmarks for this category were found. Replace them with your own discovery and pipeline data.
- ISO 25785-1 publication timing ("late 2026 to 2027") is unverified; it was at committee or working-draft stage in 2026 sources.
- The exact battery passport scope and dates, and any later amendments to the Battery Regulation, should be checked in the Official Journal before use in sales material.
- The research brief recorded industry requests to postpone parts of the Machinery Regulation; no general postponement of 20 January 2027 was found as of November 2026.`,
        },
        {
          kind: "md",
          md: md`### How to test the segment hypothesis in 90 days

- **Ten discovery calls per segment** (fewer for tier-1s), using the same questions: release cadence, regression size, rerun reasons, budget line, security path, regulation timeline.
- **Record cycle signals:** how long the last tool purchase took, how many veto holders, whether a budget line exists.
- **Score accounts** with the Founder Core ICP model and the throughput formula; re-run both monthly.
- **Decide explicitly** at day 90: where 70 % of selling time goes, which one or two long-cycle accounts are design partners, and which segment is parked.

### Messaging per segment

| Segment | Lead with |
|---|---|
| Humanoid startups | Release velocity without losing evidence; Machinery Regulation readiness for EU deployments |
| Tier-1s | Software update impact evidence (R156 and ISO 26262 regression), HIL capacity |
| Drives and motors | Safety-function firmware re-verification, type-test reruns avoided |
| Batteries | Expensive long-duration reruns avoided by better capture; traceable data |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Sequencing mistakes",
          md: md`- **Chasing the biggest logo first.** One tier-1 conversation can absorb a quarter of founder time and produce no ARR inside a year.
- **Spreading across all four.** Product and references fragment; nothing compounds.
- **Treating assumptions as data.** "Tier-1 ACVs are EUR 250k" is your guess until a buyer confirms a budget.
- **Ignoring regulation timing.** The Machinery Regulation date creates a window for humanoid and machinery buyers in 2026 and 2027; selling evidence infrastructure after a buyer's first conformity assessment is harder.`,
        },
        {
          kind: "xref",
          to: "fc03-l04",
          note: "Founder Core GTM: motions, CAC, minimum ACV and rep capacity. The segment throughput formula here is that rep-capacity formula multiplied by ACV.",
        },
        {
          kind: "question",
          question: {
            id: "aw12-l05-p1",
            type: "short",
            prompt: md`Write a one-page segment sequencing memo for Afterwave's next 18 months of founder-led selling. Use labelled illustrative assumptions. Include: (1) a profile row per segment (buyer, change pattern, cycle, ACV, security bar, regulation pull); (2) throughput per seller-year and time to first close for each; (3) your chosen beachhead, bridge and long-cycle bets with the share of selling time each gets; (4) how founder credibility affects the choice; (5) the 90-day evidence that would make you change the plan.`,
            rubric: [
              "Each segment has a specific profile including a correctly stated regulatory driver with date where relevant (Machinery Regulation 20 January 2027, UNECE R156, IEC 61800-5-2, Battery Regulation).",
              "Throughput is computed correctly with the formula and time to first close is considered, not just steady-state ARR.",
              "Beachhead, bridge and bets are chosen with explicit time shares and a reason beyond arithmetic (references, product reuse, regulation window).",
              "Founder credibility is used accurately (drive unit, inverter, reliability and test systems backgrounds) without overclaiming.",
              "The memo names concrete 90-day kill or change criteria (cycle, win rate, budget evidence per segment).",
              "Assumptions are labelled; no real company is named as a customer or prospect.",
            ],
            modelAnswer: md`**Segment sequencing memo (illustrative assumptions).**

**Profiles:** as in the lesson table; regulation pull: humanoids, Machinery Regulation from 20 Jan 2027 and ISO 10218:2025; tier-1s, UNECE R156 and ISO 26262; drives, IEC 61800-5-2; batteries, Battery Regulation passport from 18 Feb 2027 (weak link to selection).

**Throughput:** humanoid EUR 389k/seller-year, first close about 5 months; drives EUR 240k, 9 months; tier-1 EUR 214k, 14 months; batteries EUR 132k, 10 months.

**Plan:** beachhead humanoid and robotics actuator labs, 60 % of selling time; bridge drives and motors makers, 25 %, starting month 4 once the first humanoid backtest results exist; long-cycle bets, 2 tier-1 e-drive departments as design partners, 15 %; batteries parked except inbound.

**Credibility:** Ismail's drive-unit validation and Yusuf's inverter test and reliability experience map directly onto actuator dynos and drive firmware regression; this is why humanoid actuator labs and drives makers come first. Ismail's current test systems role adds credibility on rig software and data. Not used: any claim about former employers' methods or any implied endorsement.

**90-day evidence:** change plan if (a) humanoid median cycle in discovery exceeds 8 months or fewer than 3 of 10 accounts have a budget line; (b) drives makers show a cycle under 7 months and stronger pain than humanoids (move drives to beachhead); (c) a tier-1 offers a paid design-partner pilot (raise to 25 %); (d) battery labs show data-caused rerun costs above EUR 200k/yr in 3 of 5 calls (un-park).`,
            explanation: md`The memo allocates the scarcest resource, founder selling time, with arithmetic and explicit triggers for changing course.`,
            concepts: ["aw12.segment-profile", "aw12.segment-throughput", "aw12.regulation-pull", "aw12.segment-sequence"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "An investor asks: 'Tier-1 contracts are three times bigger. Why are you not selling to automotive first?' Answer in plain words.",
          keyPoints: [
            "Founder selling time is the constraint; ARR per seller-year depends on cycle and win rate, not only ACV.",
            "A 12 to 18 month cycle means a tier-1 deal started now adds no ARR inside a year.",
            "Humanoid actuator labs have faster cycles, high pain, Machinery Regulation timing and direct founder credibility.",
            "One or two tier-1s are started early as design partners, so the long cycle runs in parallel.",
            "The numbers are assumptions being tested in discovery, with explicit triggers to change course.",
          ],
        },
        { kind: "sources", refs: ["aw12-r1", "aw12-r2", "aw12-r11", "aw12-r12", "aw12-r13", "aw12-r14"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw12-l05-q1",
      type: "numeric",
      prompt: md`A segment allows 5 parallel deals, a 10-month cycle, a 0.3 win rate and an ACV of EUR 100k. What is the new ARR per seller-year (EUR k)?`,
      answer: 180,
      tolerance: { abs: 0.5 },
      unit: "EUR k/yr",
      explanation: md`$12 \times 5/10 = 6$ deals a year; $6 \times 0.3 = 1.8$ wins; $1.8 \times 100 = 180$ EUR k.`,
      concepts: ["aw12.segment-throughput"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw12-l05-q2",
      type: "mcq",
      prompt: "Which regulation most directly creates automotive demand for evidence of what was retested after a software change?",
      options: ["The EU Battery Regulation", "UNECE R156 (software update management system)", "GDPR", "The Cyber Resilience Act reporting obligations"],
      answer: 1,
      explanation: md`R156 requires managing software updates and their effect on type-approved systems.`,
      concepts: ["aw12.regulation-pull"],
      difficulty: 2,
    },
    {
      id: "aw12-l05-q3",
      type: "mcq",
      prompt: "From when does the EU Machinery Regulation 2023/1230 generally apply?",
      options: ["20 January 2024", "20 January 2027", "2 August 2028", "11 December 2027"],
      answer: 1,
      explanation: md`20 January 2027. (2 August 2028 is the AI Act date for Annex I product-embedded high-risk systems after the omnibus; 11 December 2027 is the CRA main date.)`,
      concepts: ["aw12.regulation-pull"],
      difficulty: 1,
    },
    {
      id: "aw12-l05-q4",
      type: "decision",
      prompt: md`Illustrative. In month 2, a large tier-1 invites you to a supplier day and suggests a 9-month evaluation. You have three humanoid deals in late discovery. Selling time is fixed.`,
      options: [
        { text: "Shift most of your time to the tier-1: the logo is worth it.", score: 0.2, feedback: "Risks the three near-term deals for a deal that cannot produce ARR this year." },
        { text: "Keep the humanoid deals as the priority; engage the tier-1 as a design-partner bet with a capped time budget, and ask for a paid, scoped evaluation with a named economic buyer.", score: 1, feedback: "Protects near-term revenue and references while starting the long cycle on your terms." },
        { text: "Decline the tier-1.", score: 0.4, feedback: "Loses a strategic long-cycle option that costs little if time-capped." },
      ],
      explanation: md`Allocate founder time by throughput and time to first close; run long-cycle bets in parallel with a cap.`,
      concepts: ["aw12.segment-sequence", "aw12.segment-throughput"],
      difficulty: 2,
    },
    {
      id: "aw12-l05-q5",
      type: "multi",
      prompt: "Why are drives and motors makers a natural bridge segment for Afterwave? (Select all that apply.)",
      options: [
        "Humanoid actuators are electric drives, so test methods and product carry over",
        "The founders' drive-unit and inverter test backgrounds are directly credible",
        "Drive safety functions under IEC 61800-5-2 need re-verification evidence after firmware changes",
        "Drives makers have no security requirements",
      ],
      answer: [0, 1, 2],
      explanation: md`Physics, founder credibility and safety-function regulation all carry over; drives makers do have security requirements.`,
      concepts: ["aw12.segment-sequence", "aw12.segment-profile"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw12-l05-f1", front: "Segment throughput", back: md`$A_s = (12 n_s / t_s)\,w_s\,\mathrm{ACV}_s$; also check time to first close.`, concepts: ["aw12.segment-throughput"] },
    { id: "aw12-l05-f2", front: "Illustrative throughput result", back: "Humanoid EUR 389k, drives EUR 240k, tier-1 EUR 214k, batteries EUR 132k per seller-year; tier-1 first close after about 14 months.", concepts: ["aw12.segment-throughput"] },
    { id: "aw12-l05-f3", front: "Regulation pull per segment", back: "Humanoids: Machinery Regulation 20 Jan 2027, ISO 10218:2025. Automotive: UNECE R156, ISO 26262. Drives: IEC 61800-5-2. Batteries: Battery Regulation passport 18 Feb 2027.", concepts: ["aw12.regulation-pull"] },
    { id: "aw12-l05-f4", front: "Beachhead, bridge, bets", back: "Humanoid actuator labs; drives and motors makers; one or two tier-1 design partners. A hypothesis to test in 90 days.", concepts: ["aw12.segment-sequence"] },
    { id: "aw12-l05-f5", front: "What cycle and ACV per segment are", back: "Planning assumptions to be replaced by discovery and pipeline data; no reliable public benchmark exists.", concepts: ["aw12.segment-profile"] },
  ],
};

export default lesson;
