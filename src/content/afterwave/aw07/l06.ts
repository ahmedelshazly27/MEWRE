import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw07-l06",
  title: "The humanoid and physical AI market in 2026, and its validation bottlenecks",
  summary:
    "Where the humanoid and physical AI market stands in late 2026, from dated and sourced signals (funding, first factory deployments, production claims), with every uncertain number marked. Then the part that matters for Afterwave: why validation is the bottleneck between pilots and scale. No published humanoid safety standard, no standard test methods for balance and recovery, the EU Machinery Regulation applying from 20 January 2027 with notified-body assessment for ML-based safety functions, the AI Act omnibus pushing AI obligations into machinery delegated acts, and the statistical cost of evidence for learned behaviour.",
  minutes: 75,
  objectives: [
    "You can summarise the 2026 humanoid market from dated, sourced facts and say which numbers are unverified.",
    "You can name the main validation bottlenecks (standards gap, test-method gap, Machinery Regulation, AI Act route, reliability, statistical evidence) with dates.",
    "You can estimate the robot-hours a release of a learned humanoid needs, and how test selection changes it.",
    "You can write a dated, sourced 'why now' argument for Afterwave that does not overclaim.",
  ],
  concepts: [
    { id: "aw07.humanoid-market-2026", name: "Humanoid market signals in 2026", description: "Large private rounds (Figure, Apptronik, Galbot), first factory deployments (Figure 03 at BMW Spartanburg, July 2026), production claims (Atlas at CES January 2026, Optimus early production per Tesla's Q3 2026 update), with funding totals from trackers that disagree and are unverified.", competency: "aw-physical-ai", related: ["aw07.validation-bottleneck"] },
    { id: "aw07.validation-bottleneck", name: "Validation bottleneck", description: "The gap between demos and scaled deployment caused by missing standards and test methods, regulatory conformity assessment, immature reliability and the statistical cost of evidence for learned behaviour.", competency: "aw-physical-ai", related: ["aw07.humanoid-market-2026", "aw07.policy-evaluation", "aw07.sim-evidence"] },
    { id: "aw07.humanoid-standards-gap", name: "Humanoid standards gap", description: "ISO 10218-1/-2:2025 covers industrial robots, but the standard for mobile robots with actively controlled stability (legged, humanoid), ISO 25785-1, was still a draft in 2026, and an IEEE study (September 2025) found no standardised test methods for balance and recovery safety functions.", competency: "aw-safety", related: ["aw07.validation-bottleneck"] },
    { id: "aw07.evidence-hours", name: "Evidence hours per release", description: "Robot or rig hours needed to support a release: skills times trials per skill times minutes per trial, reduced by the fraction of tests a change actually requires.", competency: "aw-physical-ai", related: ["aw07.policy-evaluation", "aw07.validation-bottleneck"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The market in late 2026 and why validation is the bottleneck",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave's YC W27 application, its investor narrative and its first outbound list all depend on a "why now" that is true, dated and checkable. Humanoids are the loudest part of physical AI and attract the most capital, which makes the market both a tailwind and a trap: claims are inflated, numbers conflict and investors have seen hype cycles before. The defensible argument is not "humanoids are big" but "learned, mobile machines are moving from pilots to deployment faster than the evidence infrastructure, standards and regulation can absorb, and the bench is where that evidence is produced". This lesson gives you the facts and the limits of the facts.`,
        },
        {
          kind: "md",
          md: md`### Market signals, dated and sourced

All facts below come from the course research brief (prepared 6 November 2026 from web-search summaries of the cited pages, not full primary texts). Treat funding figures as reported, not audited.

| Signal | What was reported | Date | Status |
|---|---|---|---|
| Figure AI funding | Series C over USD 1 bn at about USD 39 bn valuation | Sep 2025 | widely reported; secondary source here |
| Figure deployment | Figure 03 deployed at BMW Spartanburg for logistics sequencing, after a Figure 02 pilot; unit counts not disclosed | Jul 2026 | reported by The Robot Report |
| Apptronik funding | USD 520 m Series A extension; Series A over USD 935 m in total | Feb 2026 | secondary source |
| Galbot (China) funding | RMB 2.5 bn (about USD 362 m); eyeing a Hong Kong IPO | Mar 2026 | Caixin and TechNode |
| Boston Dynamics and Hyundai | Production Atlas unveiled at CES; Georgia Metaplant deployment targeted by 2028; Hyundai planning robot factory capacity of up to 30,000 units a year | Jan 2026 | The Register |
| Tesla Optimus | Early production on a Fremont line per the Q3 2026 update; Musk expects design, reliability and lifespan issues to be worked through by about end-2027; weekly volume figures unverified | Q3 2026 | secondary source |
| Agility Robotics | Reportedly going public via a SPAC (Churchill Capital Corp XI) | 2026 | unverified |
| Humanoid funding totals | Trackers disagree: USD 11.8 bn across 26 companies (as of 1 Oct 2026); about USD 8.6 bn raised in 2026; over USD 6 bn by mid-2026 | 2026 | all unverified aggregations |
| Adjacent infrastructure | Hardware-test data platforms raised at high valuations in 2026 (Nominal reported at a USD 1 bn valuation; Sift USD 42 m) | 2026 | see the competitive landscape module |

Read the table for what it shows: **capital is concentrated in a handful of humanoid OEMs; deployments are pilots and first production lines with undisclosed unit counts; and nearly every company states reliability and safety as the gating issue.**`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Do not repeat these numbers externally without rechecking",
          md: md`The research brief marks the funding aggregations, the Optimus volume figures and the Agility SPAC as **unverified** (single secondary sources or conflicting trackers), and recommends rechecking every funding figure on the primary press release before repeating it. Valuations and round sizes in particular are often quoted from secondary reports. In investor materials, cite the primary source and date, or say "reported".`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Selected reported humanoid rounds (USD m, as reported)",
          xKey: "company",
          xLabel: "Company (round, date)",
          yLabel: "USD m",
          series: [{ key: "usd", label: "Reported round size, USD m" }],
          data: [
            { company: "Figure (Series C, Sep 2025)", usd: 1000 },
            { company: "Apptronik (Series A ext., Feb 2026)", usd: 520 },
            { company: "Galbot (Mar 2026)", usd: 362 },
          ],
          caption: "Figure's round was reported as over USD 1 bn (plotted at 1,000). Galbot converted from RMB 2.5 bn at the reported rate. Secondary sources; recheck before use.",
        },
        {
          kind: "md",
          md: md`### The validation bottlenecks

**1. No humanoid-specific safety standard yet.** Industrial robots have **ISO 10218-1 and -2:2025** (published February 2025, second edition, replacing 2011), which extended functional-safety requirements (a SIL 2 option alongside PL d, Category 3) and folded in collaborative-robot content formerly in ISO/TS 15066. Mobile robots with **actively controlled stability** (legged robots, humanoids, balancing robots) are the subject of **ISO 25785-1**, which in 2026 was still at committee or working draft stage with no confirmed publication date. A mid-2026 deployment report notes that third-party certification against it is therefore not available. South Korea is building a humanoid safety certification centre (reported July 2026).

**2. No standard test methods for the hardest safety functions.** An IEEE humanoid study group's pathway study (September 2025) found a lack of standardised test methods for balance and recovery safety functions. A humanoid that loses power or balance falls; what "safe" means and how to test it is not settled. Every OEM therefore builds its own test methods, rigs and evidence, which is the bench work Afterwave instruments.

**3. EU Machinery Regulation (EU) 2023/1230 applies from 20 January 2027.** Annex I Part A, which requires notified-body (third-party) conformity assessment, includes **safety components with fully or partially self-evolving behaviour using machine-learning approaches to ensure safety functions**, and machinery embedding such systems. Its essential requirements include safety and reliability of control systems, including self-evolving behaviour and **logging**. No harmonised standard yet covers AI or self-evolving safety functions, so those categories go to notified bodies. No general postponement of the application date was found as of November 2026.

**4. AI Act obligations reach machinery by a slower route.** The Digital Omnibus on AI, Regulation (EU) 2026/1744 (in force 27 July 2026, per secondary summaries), moved the Machinery Regulation from Section A to Section B of the AI Act's Annex I. The AI Act's high-risk requirements therefore do not apply directly to AI in machinery; the Commission must adopt **delegated acts amending the Machinery Regulation's Annex III** to carry them over (including data governance, logging and post-market monitoring), with target timing tied to 2 August 2028.

**5. Reliability and lifespan are still being engineered.** Tesla's own Q3 2026 framing (design, reliability and lifespan to be worked through by about end-2027) is a public example. Reliability evidence is accumulated test data: endurance on actuators (lesson 1), regression after every change.

**6. Evidence for learned behaviour is statistically expensive.** From lesson 4: hundreds of trials per skill per release, 300 clean trials to bound a failure rate below 1 %, and every weight change potentially global. From lesson 5: simulation helps but its validity is set on the bench.

The structural reading: **demand for deployable humanoids is running ahead of the evidence infrastructure.** Standards and regulators will require logged, reproducible, traceable test evidence; OEMs cannot yet produce it cheaply. That is the opening.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Regulatory and standards status: secondary sources",
          md: md`The research brief could not fetch EUR-Lex or the Commission pages directly; the Omnibus dates, the Annex I Section A to B move and the delegated-act route come from secondary summaries (Commission news item, Eurogip, a Northern Ireland Assembly explanatory memorandum, law-firm notes). The exact Annex III wording was not read in the primary text. The ISO 25785-1 timeline ("late 2026 to 2027") is unverified. Recheck before using any of these in a contract, a sales document or a regulatory argument; the Machinery Regulation module of this track covers the detail.`,
        },
        { kind: "equation", formula: "aw07-evidence-hours" },
        {
          kind: "matrix",
          title: "Where physical AI products sit on evidence burden",
          xAxis: ["Fixed, caged or scripted", "Mobile, learned, near people"],
          yAxis: ["Mature standards and test methods", "Standards and test methods still forming"],
          cells: [
            { label: "Classic industrial robot cells", detail: "ISO 10218:2025, established integration and validation practice" },
            { label: "Mobile manipulators and AMRs with learned perception", detail: "Some standards exist; ML-based safety functions push towards notified-body assessment" },
            { label: "Rare: fixed but novel", detail: "For example new end effectors or tools on established robots" },
            { label: "Humanoids and legged robots with learned policies", detail: "ISO 25785-1 in draft, no balance and recovery test methods, Machinery Regulation from Jan 2027" },
          ],
          caption: "Afterwave's beachhead is the bottom-right and the actuator and drive suppliers that feed it: the highest evidence burden with the least standard tooling.",
        },
        { kind: "sources", refs: ["aw07-r1", "aw07-r2", "aw07-r3", "aw07-r4", "aw07-r5", "aw07-r6", "aw07-r16", "aw07-r7", "aw07-r8", "aw07-r9", "aw07-r10", "aw07-r11", "aw07-r12", "aw07-r13", "aw07-r14", "aw07-r15"] },
      ],
    },
    {
      layer: "applied",
      title: "Sizing the evidence problem for one illustrative humanoid OEM",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Robot-hours per release, with and without change-impact selection",
          given: md`Illustrative humanoid OEM (not a real company): 20 skills in the release suite, each needing 300 trials per release (enough to bound a failure rate below 1 % at 95 % with zero failures, lesson 4), 2 minutes per trial including reset. Test fleet: 4 robots available 16 hours per night. Releases every two weeks. Assume change-impact analysis shows that a typical release only requires full evaluation of 30 % of skill-trials, with smoke tests on the rest (an illustrative assumption to be validated in a pilot, not a measured Ripple result).`,
          steps: [
            { md: md`**Full evaluation.** $H = 20\times300\times2/60 = 200$ robot-hours per release.` },
            { md: md`**Fleet capacity.** $4\times16 = 64$ robot-hours per night: 200/64 = **3.1 nights** of the whole fleet per release, about 22 % of a two-week cycle (14 nights).` },
            { md: md`**With selection.** $0.30\times200 = 60$ robot-hours, about **0.94 nights**, plus smoke tests (for example 20 trials on the other 14 skills: $14\times20\times2/60 = 9.3$ h). Total about 69 h, 1.1 nights.` },
            { md: md`**What the saving buys.** About 130 robot-hours per release freed for development, or the ability to release weekly with the same fleet, or more trials where the risk is.` },
            { md: md`**What it risks.** If selection misses a regression, a defect reaches the field. The pilot must therefore measure both rig-hours saved and regressions missed on the customer's own history (lesson 2 scenario).` },
          ],
          result: md`The evidence problem is a capacity problem measured in robot-hours. Test selection converts directly into release frequency or fleet cost, which is how to explain Ripple's value to an engineering VP, as long as the 30 % is presented as an assumption to be proven, not a result.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A smaller actuator-supplier case",
          given: md`Illustrative actuator supplier: 12 qualification tests per firmware release, each repeated 150 times on the robot-in-the-loop rig (enough to bound a failure rate below 2 %), 3 minutes per repetition. Change-impact analysis selects 25 % of the repetitions for a typical release (illustrative).`,
          steps: [
            { md: md`Full evaluation $H = 12\times150\times3/60$.` },
            { md: md`$H = 90$ rig-hours.`, hidden: true, check: { prompt: "Full evaluation (rig-hours)", answer: 90, unit: "h", tolerance: { abs: 0.5 } } },
            { md: md`With selection $0.25\times90$.` },
            { md: md`22.5 rig-hours.`, hidden: true, check: { prompt: "Selected evaluation (rig-hours)", answer: 22.5, unit: "h", tolerance: { abs: 0.2 } } },
            { md: md`Bound from 150 clean repetitions: $3/150 = 2\ \%$ at 95 %.` },
          ],
          result: md`90 rig-hours fall to 22.5: from more than a week of a single rig on one shift to under three shifts.`,
        },
        {
          kind: "question",
          question: {
            id: "aw07-l06-p1",
            type: "numeric",
            prompt: md`An OEM runs 15 skills with 250 trials each at 1.5 minutes per trial. How many robot-hours does one full release evaluation take (1 decimal)?`,
            answer: 93.8,
            tolerance: { abs: 0.1 },
            unit: "h",
            explanation: md`$15\times250\times1.5/60 = 93.75$ robot-hours.`,
            concepts: ["aw07.evidence-hours"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Using the market and the bottlenecks honestly in sales and fundraising",
      blocks: [
        {
          kind: "md",
          md: md`### Who feels the bottleneck

- **Validation and test engineering leads** at humanoid OEMs: own rig time, regression suites and release sign-off. They feel rig-hours and missed regressions.
- **Safety and compliance managers**: own the technical file, the risk assessment and, from 2027, the notified-body interaction for ML-based safety functions in the EU. They feel traceability and logging.
- **Robot-learning evaluation leads**: own trial counts and success-rate evidence. They feel the statistics of lesson 4.
- **Actuator, drive and component suppliers**: must qualify parts for several OEMs and requalify after every change. They feel requalification cost (Ismail's and Yusuf's world).
- **End customers running pilots** (automotive plants such as BMW's and Hyundai's): will ask for evidence before scaling.

### How to use the facts

- Lead with mechanism (why evidence is hard for learned, mobile machines), then the dated facts that show timing (Machinery Regulation 20 January 2027; ISO 25785-1 in draft; first factory deployments in 2026).
- Use market size as context, not as the argument; humanoid funding totals are unverified and investors know it.
- Do not imply that Afterwave certifies anything or that a standard requires Afterwave. Evidence infrastructure helps teams produce what notified bodies and customers will ask for.

For the general method of building a "why now" and a positioning statement, use the Founder Core lessons linked below rather than repeating them here.`,
        },
        { kind: "xref", to: "fc01.why-now", note: "Founder Core: what makes a credible why-now and how investors test it." },
        { kind: "xref", to: "fc03-l01", note: "Founder Core: positioning method; apply it to 'evidence infrastructure for physical AI'." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Quoting the biggest funding number.** The trackers disagree by a factor of two; pick one, date it, mark it reported.
- **"Humanoids need certification from 2027."** Imprecise: the Machinery Regulation applies to machinery placed on the EU market from 20 January 2027; notified-body assessment is required for the Annex I Part A categories, including ML-based safety components. Say exactly that.
- **Treating hype risk as irrelevant.** If humanoid funding cools, Afterwave must still sell to drives, motors, batteries, powertrains and autonomous machines. The evidence problem exists in all of them.
- **Overclaiming Ripple's selection rate.** Any percentage of tests saved is illustrative until measured on a customer's history.`,
        },
        { kind: "scenario", scenario: "aw07-s2" },
        {
          kind: "question",
          question: {
            id: "aw07-l06-p2",
            type: "short",
            prompt: md`Write the **"why now" section (about 200 words) for Afterwave's investor memo**, plus a short evidence table (claim, date, source, status). It must be dated, sourced from this lesson, mark unverified items, avoid overclaiming, and connect the market and regulatory facts to Afterwave's capture layer and Ripple.`,
            rubric: [
              "States the mechanism: learned, mobile machines moving to deployment need traceable, statistically sound test evidence that current tooling does not produce cheaply",
              "Uses at least three dated facts correctly (for example Machinery Regulation 20 January 2027, ISO 25785-1 still in draft in 2026, Figure 03 at BMW July 2026, IEEE study September 2025, AI Omnibus in force 27 July 2026)",
              "Marks unverified items (funding totals, Optimus volumes, Agility SPAC, Omnibus details from secondary summaries) and avoids presenting them as facts",
              "Connects the facts to Lockstep (synchronised, logged capture), Ripple (what to retest after a change) and bench memory without claiming certification or invented traction",
              "Notes that the evidence problem extends beyond humanoids (drives, batteries, powertrains, autonomous machines) so the thesis survives a humanoid funding downturn",
            ],
            modelAnswer: md`**Why now.** Physical AI is leaving the lab. In 2026 Figure 03 went into logistics sequencing at BMW Spartanburg (July) and Boston Dynamics showed a production Atlas (January). Behaviour in these machines is increasingly a learned policy, which means every model, firmware or hardware change can alter every skill, and proving a release safe takes hundreds of repeated physical trials. The evidence infrastructure has not kept up: the standard for legged and humanoid robots, ISO 25785-1, was still in draft in 2026, and an IEEE study (September 2025) found no standardised test methods for balance and recovery. From 20 January 2027 the EU Machinery Regulation requires notified-body assessment of ML-based safety components and calls for logging in control systems. Test teams will need synchronised, traceable bench data and a defensible way to choose what to retest. Lockstep captures it; Ripple decides what to rerun after each change; bench memory compounds. The same problem exists in drives, batteries and powertrains, so the thesis does not depend on humanoid hype.

| Claim | Date | Source | Status |
|---|---|---|---|
| Figure 03 deployed at BMW Spartanburg | Jul 2026 | The Robot Report | reported |
| ISO 25785-1 in draft | 2026 | i-SCOOP; Physical AI Journal | reported; timeline unverified |
| No standard balance/recovery test methods | Sep 2025 | IEEE pathway study | reported |
| Machinery Regulation applies | 20 Jan 2027 | EU-OSHA | established |
| Humanoid funding USD 6 to 11.8 bn (2026) | 2026 | trackers | unverified, not used in the text |`,
            explanation: md`Strong answers lead with the mechanism, date every fact, separate reported from unverified, and tie the facts to specific product capabilities without claiming certification or traction.`,
            concepts: ["aw07.validation-bottleneck", "aw07.humanoid-market-2026", "aw07.humanoid-standards-gap"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a generalist investor in three sentences why validation, not hardware or AI models, is the bottleneck between humanoid pilots and scale.",
          keyPoints: [
            "Learned behaviour changes globally with every update and must be proven with many repeated physical trials",
            "Standards and test methods for legged and humanoid safety are still being written, so each company builds its own evidence",
            "Regulation (EU Machinery Regulation from January 2027) and customers will demand traceable, logged evidence, which current tooling makes slow and expensive",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw07-l06-q1",
      type: "mcq",
      prompt: "From when does the EU Machinery Regulation (EU) 2023/1230 generally apply?",
      options: ["20 January 2024", "2 August 2026", "20 January 2027", "2 August 2028"],
      answer: 2,
      explanation: md`20 January 2027 (notified-body provisions applied earlier, from 20 January 2024). 2 August 2028 is the AI Act date for product-embedded high-risk systems after the Omnibus.`,
      concepts: ["aw07.validation-bottleneck"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw07-l06-q2",
      type: "mcq",
      prompt: "What was the status of ISO 25785-1 (mobile robots with actively controlled stability, including humanoids) in 2026?",
      options: [
        "Published in February 2025 together with ISO 10218",
        "Withdrawn",
        "Still a draft (committee or working draft) with no confirmed publication date",
        "Harmonised under the Machinery Regulation",
      ],
      answer: 2,
      explanation: md`ISO 10218-1/-2 were published in February 2025 for industrial robots; ISO 25785-1 for legged and humanoid robots was still in draft in 2026, so no certification against it was available.`,
      concepts: ["aw07.humanoid-standards-gap"],
      difficulty: 1,
    },
    {
      id: "aw07-l06-q3",
      type: "multi",
      prompt: "Which of these does the course research brief mark as unverified? (Select all that apply.)",
      options: [
        "Humanoid funding totals from trackers",
        "Agility Robotics going public via a SPAC",
        "Tesla Optimus weekly volume figures",
        "The Machinery Regulation applying from 20 January 2027",
        "The ISO 25785-1 'late 2026 to 2027' publication timeline",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`The application date of the Machinery Regulation is established (no postponement found). The others rest on single or conflicting secondary sources.`,
      concepts: ["aw07.humanoid-market-2026"],
      difficulty: 1,
    },
    {
      id: "aw07-l06-q4",
      type: "mcq",
      prompt: "After the Digital Omnibus on AI, how do AI Act high-risk requirements reach AI in machinery?",
      options: [
        "They apply directly to machinery from 2 August 2026",
        "Through Commission delegated acts amending the Machinery Regulation's Annex III, with target timing tied to 2 August 2028",
        "They no longer apply in any form",
        "Only through voluntary codes of conduct",
      ],
      answer: 1,
      explanation: md`The Omnibus moved the Machinery Regulation to Section B of the AI Act's Annex I; requirements are carried over by delegated acts amending Machinery Regulation Annex III (per secondary summaries; recheck the primary text).`,
      concepts: ["aw07.validation-bottleneck"],
      difficulty: 2,
    },
    {
      id: "aw07-l06-q5",
      type: "numeric",
      prompt: md`A humanoid OEM needs 18 skills times 300 trials at 2.5 minutes per trial per release. Its fleet provides 80 robot-hours per night. How many nights does a full evaluation take (2 decimals)?`,
      answer: 2.81,
      tolerance: { abs: 0.02 },
      unit: "nights",
      explanation: md`$H = 18\times300\times2.5/60 = 225$ robot-hours; $225/80 = 2.81$ nights.`,
      concepts: ["aw07.evidence-hours"],
      difficulty: 1,
    },
    {
      id: "aw07-l06-q6",
      type: "decision",
      prompt: md`Drafting the YC application, a cofounder wants to write: "Humanoid funding hit USD 11.8 bn in 2026 and the EU will require all humanoids to be certified from 2027." What do you do?`,
      options: [
        { text: "Keep it: big numbers and regulation make a strong why-now.", score: 0, feedback: "The funding figure is an unverified tracker number and the regulatory claim is imprecise; a technical partner or investor will catch both." },
        { text: "Rewrite: cite one dated, sourced deployment fact, state precisely that the Machinery Regulation applies from 20 January 2027 with notified-body assessment for ML-based safety components, and drop or mark the funding figure as reported and unverified.", score: 1, feedback: "Right: precise, dated, sourced, and it argues from mechanism rather than hype." },
        { text: "Remove all market and regulatory content to be safe.", score: 0.3, feedback: "Overcorrection: the timing argument is real and important; it just has to be stated precisely." },
      ],
      explanation: md`Credibility with technical investors comes from precision. Overclaiming on regulation is also a legal and reputational risk with customers' compliance teams.`,
      concepts: ["aw07.validation-bottleneck", "aw07.humanoid-market-2026"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw07-l06-f1", front: "Figure 03 at BMW", back: "Deployed at BMW Spartanburg for logistics sequencing, July 2026, after a Figure 02 pilot; unit counts not disclosed (The Robot Report).", concepts: ["aw07.humanoid-market-2026"] },
    { id: "aw07-l06-f2", front: "Production Atlas", back: "Unveiled at CES, January 2026; Hyundai Georgia Metaplant deployment targeted by 2028; up to 30,000 units a year of planned robot factory capacity (The Register).", concepts: ["aw07.humanoid-market-2026"] },
    { id: "aw07-l06-f3", front: "ISO 10218-1/-2:2025 vs ISO 25785-1", back: "10218: industrial robots, published Feb 2025. 25785-1: legged and humanoid robots with actively controlled stability, still in draft in 2026.", concepts: ["aw07.humanoid-standards-gap"] },
    { id: "aw07-l06-f4", front: "Machinery Regulation and ML safety components", back: "Applies from 20 Jan 2027; Annex I Part A (notified body) includes safety components with self-evolving ML behaviour ensuring safety functions; no harmonised standard covers them yet.", concepts: ["aw07.validation-bottleneck"] },
    { id: "aw07-l06-f5", front: "AI Omnibus route for machinery", back: "Reg. (EU) 2026/1744, in force 27 Jul 2026: machinery moved to AI Act Annex I Section B; requirements arrive via delegated acts amending Machinery Regulation Annex III, target 2 Aug 2028 (secondary sources).", concepts: ["aw07.validation-bottleneck"] },
    { id: "aw07-l06-f6", front: "Evidence hours per release", back: md`$H = S\times n\times t/60$, times the fraction a change requires. 20 skills, 300 trials, 2 min: 200 robot-hours.`, concepts: ["aw07.evidence-hours"] },
  ],
  scenarios: [
    {
      id: "aw07-s2",
      title: "\"Isn't humanoid a bubble?\"",
      dayInLife: true,
      context: md`You are in a partner meeting with a seed investor (illustrative). She has read the funding headlines and says: "Humanoids look like a bubble. If it pops, what happens to Afterwave?"`,
      start: "a",
      concepts: ["aw07.validation-bottleneck", "aw07.humanoid-market-2026"],
      nodes: {
        a: {
          md: md`How do you respond first?`,
          choices: [
            { text: "\"It's not a bubble: funding is over USD 11 bn this year.\"", score: 1, feedback: "You defended hype with an unverified number. She now doubts your other numbers.", next: "c" },
            { text: "\"Maybe parts of it are. Our thesis doesn't depend on humanoid valuations: it depends on learned machines needing test evidence. Humanoids are the sharpest case, not the only one.\"", score: 9, feedback: "You concede what is uncertain and re-anchor on the mechanism and the broader customer base.", next: "b" },
            { text: "\"We're not really a humanoid company.\"", score: 4, feedback: "True but evasive; it leaves her without a reason why the timing is now.", next: "b" },
          ],
        },
        b: {
          md: md`She asks: "Then why now, and why you?"`,
          choices: [
            { text: "Give dated facts (Machinery Regulation from 20 January 2027 with notified-body assessment for ML safety components; ISO 25785-1 still in draft; first factory deployments in 2026), then the team: Tesla drive-unit validation and inverter test and reliability experience.", score: 10, feedback: "Precise timing plus a founder-market fit grounded in the actual work.", next: "d" },
            { text: "Talk about how big the robotics market will be in 2035.", score: 3, feedback: "Long-range market forecasts do not answer why now, and she discounts them.", next: "d" },
          ],
        },
        c: {
          md: md`She asks where the USD 11 bn comes from. You are not sure.`,
          choices: [
            { text: "Admit it is a tracker figure that other trackers put lower, and move to the mechanism and dated regulatory facts.", score: 5, feedback: "Partial recovery. Lesson: lead with what you can source." },
          ],
        },
        d: {
          md: md`She asks what you would show her in six months to prove it.`,
          choices: [
            { text: "A paid pilot on a customer's rigs with buyer-agreed criteria: Ripple's selections back-tested on their release history, rig-hours saved and regressions missed both reported.", score: 10, feedback: "Evidence in the customer's own data, with the downside metric included. That is the proof she needs." },
            { text: "More logos on a slide.", score: 2, feedback: "Logos without measured outcomes do not prove the core claim." },
          ],
        },
      },
    },
  ],
};

export default lesson;
