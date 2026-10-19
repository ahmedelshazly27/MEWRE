import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m15-l02",
  title: "Tender-to-COD simulation: pre-briefing and decision framework",
  summary:
    "How the capstone simulation works, the decision framework experienced offtaker PMs use to trade cost, schedule, quality, trust and safety, and a stage-by-stage pre-briefing on what to watch — from bid evaluation to COD tests.",
  minutes: 75,
  objectives: [
    "You can compute your capstone score from final KPI values and decision quality, and explain why the scoring rewards balanced judgement over optimising one KPI.",
    "You can apply a five-question decision framework (contract, risk owner, lifecycle, file, people) to any project decision in under five minutes.",
    "You can recognise the recurring traps — shortcut bias, over-correction, acting outside the contract, concealment, accepting assertions — and name the professional alternative.",
    "You can interpret EVM indices, a PR test result and a deemed-energy exposure well enough to make a defensible decision in the simulation.",
    "You can play the simulation stage by stage, knowing which contract instruments and stakeholders matter at each stage.",
  ],
  concepts: [
    {
      id: "m15.tradeoff-framework",
      name: "Five-dimension trade-off framework",
      description:
        "Judging each decision on its lifecycle effect on cost, schedule, quality, stakeholder trust and safety — not just on the KPI that is under pressure today — using contract, risk owner, lifecycle, file and people as the five test questions.",
      competency: "controls",
      related: ["m08.tolerances", "m08.change-control"],
    },
    {
      id: "m15.approval-chain",
      name: "Approval chain management",
      description:
        "Planning and accelerating KAPP, Higher Committee, Fatwa and Legislation and State Audit Bureau steps through complete submissions, fast answers and float — never by bypassing them.",
      competency: "context",
      related: ["m00.approval-timelines", "m00.decision-chain"],
    },
    {
      id: "m15.bid-evaluation",
      name: "Defensible bid evaluation",
      description:
        "Evaluating IPP bids strictly against published criteria on a comparable basis (common resource data, usable MWh at the POI), using formal clarifications that do not change bid substance, and documenting everything.",
      competency: "procurement",
      related: ["m10.gulf-tariffs"],
    },
    {
      id: "m15.local-content",
      name: "Achievable local content",
      description:
        "Local-content and Kuwaitisation requirements set at levels the economy can actually supply (civil works, fabrication, cabling, services, O&M staffing), measured, scored and reported — not headline percentages that collapse in execution.",
      competency: "procurement",
    },
    {
      id: "m15.deemed-energy",
      name: "Bounded deemed energy",
      description:
        "A deemed-energy clause limited to offtaker-caused unavailability and curtailment beyond an allowance, calculated from measured irradiance through an agreed, validated model — bankable for lenders and auditable for MEWRE.",
      competency: "contracts",
      related: ["m09.risk-allocation"],
    },
    {
      id: "m15.design-integrity",
      name: "Design integrity for desert conditions",
      description:
        "Targeted design review that protects 30-year performance: site-specific geotechnics (sabkha, gypsum, chlorides), wind stow, derating at 50 °C+, long-lead equipment specification and factory quality.",
      competency: "solar",
      related: ["m07.design-review", "m07.soil-corrosivity", "m02.wind-stow"],
    },
    {
      id: "m15.supply-chain-integrity",
      name: "Supply-chain integrity",
      description:
        "Traceability from polysilicon to module, factory audits against the certified bill of materials, and contractual rights to reject non-conforming or non-traceable lots.",
      competency: "risk",
      related: ["m02.module-qualification", "m05.supply-chain"],
    },
    {
      id: "m15.schedule-recovery",
      name: "Data-driven schedule recovery",
      description:
        "Using EVM, earned schedule and critical path analysis to forecast COD, and requiring a resource-loaded recovery plan through the PPA rather than accepting assurances or issuing threats.",
      competency: "controls",
      related: ["m08.earned-schedule", "m08.evm-forecasting", "m07.long-lead-items"],
    },
    {
      id: "m15.hse-leadership",
      name: "Visible HSE leadership",
      description:
        "Proportionate, immediate response to heat stress, lifting and other fatal-risk hazards: stop the specific activity, investigate, fix the system, share the learning — and never trade safety for schedule.",
      competency: "risk",
    },
    {
      id: "m15.claims-variations",
      name: "Claims and variations determination",
      description:
        "Assessing force majeure, ground-condition and other claims against the PPA's definitions and evidence, and running changes through formal change control with priced time and cost impacts and the required approvals.",
      competency: "contracts",
      related: ["m09.unforeseeable-conditions", "m09.exceptional-events", "m08.time-impact-analysis"],
    },
    {
      id: "m15.commissioning-tests",
      name: "COD test enforcement",
      description:
        "Verifying test inputs (sensors, exclusions, SOC, auxiliaries) before judging results, then enforcing the PPA proportionately: remedy and retest, partial COD, or performance LDs.",
      competency: "operations",
      related: ["m07.pr-test", "m05.capacity-test", "m07.cod-criteria"],
    },
    {
      id: "m15.grid-code-compliance",
      name: "Grid-code compliance path",
      description:
        "Early studies with validated models, plant controller design, staged energisation with limited export under interim notifications, and final compliance demonstrated before COD.",
      competency: "grid",
      related: ["m07.grid-compliance-tests", "m01.reactive-capability"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "How the simulation scores you — and why",
      blocks: [
        {
          kind: "md",
          md: md`### Open the simulation when you are ready

**[Open the capstone simulation](/capstone)**

Read this lesson first. The simulation is 27 decisions across 8 stages; a careful run takes 45–60 minutes. You can replay it — the second run is where most of the learning happens, because you can test whether your reasoning, not just your memory, has changed.

### The scoring model

Six KPIs move as you decide. At the end each is converted into a score between 0 and 1:`,
        },
        { kind: "equation", formula: "m15-kpi-score" },
        {
          kind: "md",
          md: md`and the total blends outcome and judgement equally:`,
        },
        { kind: "equation", formula: "m15-sim-total" },
        {
          kind: "callout",
          tone: "why",
          title: "Why the score is capped at the target",
          md: md`A capped score makes over-optimisation worthless. Driving cost USD 50 m below target earns nothing; the quality and trust you sacrificed to get there cost you real marks. This mirrors how a ministry actually judges a project: "on budget, on time, works, nobody hurt, nobody embarrassed" is a success; "cheapest ever, but the trackers fail every shamal" is not. The 50 % weight on decision quality reflects the audit reality — the file is judged on whether each decision was reasonable with the information available, not only on how things turned out.`,
        },
        {
          kind: "md",
          md: md`### The five-dimension trade-off

Classical project management talks about an iron triangle of cost, time and scope/quality. An offtaker PM in a ministry works with five dimensions, because two more decide whether a project survives:

| Dimension | What it really measures | Typical trap |
|---|---|---|
| **Cost** | Whole-life cost to the state: capex passed through the tariff, plus claims, deemed energy and variations MEWRE pays | Taking the lowest number today and paying more later |
| **Schedule** | The date MEWRE actually gets reliable MW — the summer peak does not move | "Approve now to save time" that creates rework later |
| **Quality / integrity** | Whether the plant performs for 30 years in 50 °C heat, dust and shamals | Accepting assertions ("certified", "will recover") |
| **Trust** | Credibility with leadership, KAPP, control bodies, the IPP and lenders | Concealment, surprises, acting outside process |
| **Safety** | Whether everyone goes home | Heat and lifting shortcuts under schedule pressure |

The fundamental asymmetry: **the cost of fixing a problem rises steeply with time**. A vague grid clause costs a paragraph to fix in the RFP, a month to fix at financial close, and millions in deemed energy during construction. A design weakness costs a comment at review, a rework order during construction, and a 30-year yield loss after COD. That is why so many expert answers in the simulation spend a little now.`,
        },
        {
          kind: "md",
          md: md`### Expected value of a shortcut

A shortcut that saves $S$ now but has probability $p$ of triggering a consequence costing $C$ later is worth taking only if $S > p\,C$. PMs under pressure systematically under-estimate both $p$ and $C$ — the planning fallacy. Example: approving a tracker design with generic stow settings saves two weeks (worth perhaps USD 2 m of earlier revenue). If there is a 20 % chance over the PPA life of a shamal destroying 2 % of the plant (USD 10 m repair plus months of lost output), the expected cost is at least $0.2 \times 10 = 2$ USD m before counting lost energy and reputational damage — the shortcut is break-even at best, and it moves risk to the party (MEWRE) that lives with the plant for 30 years.`,
        },
        { kind: "equation", formula: "m15-evm-indices" },
        { kind: "equation", formula: "m15-forecast-duration" },
        { kind: "equation", formula: "m15-pr-corrected" },
        {
          kind: "callout",
          tone: "pm",
          title: "Which numbers the offtaker PM actually watches",
          md: md`On an IPP, MEWRE does not pay the EPC, so **CPI** is a health signal (a contractor losing money cuts corners and files claims), while **SPI** and the critical path forecast **COD** directly. At COD, the **PR** and **BESS capacity** tests decide whether MEWRE starts paying full tariffs for a plant that meets the PPA. Throughout, the **deemed-energy exposure** is the price tag on MEWRE's own interface performance.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Worked examples with simulation-style numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Computing a capstone score",
          given: md`Final KPIs: cost USD 790 m (target ≤ 760), days 1,320 (≤ 1,260), quality 82 (≥ 85), trust 74 (≥ 80), safety 88 (≥ 90), yield 98 % (≥ 100). Mean decision quality 7.4 / 10.`,
          steps: [
            { md: md`Lower-is-better KPIs: cost $760/790 = 0.962$; days $1{,}260/1{,}320 = 0.955$.` },
            { md: md`Higher-is-better KPIs: quality $82/85 = 0.965$; trust $74/80 = 0.925$; safety $88/90 = 0.978$; yield $98/100 = 0.980$.` },
            { md: md`Mean KPI score: $(0.962 + 0.955 + 0.965 + 0.925 + 0.978 + 0.980)/6 = 0.961$.` },
            { md: md`Total: $S = 0.5 \times 0.961 + 0.5 \times 0.74 = 0.850$.` },
          ],
          result: md`**85 %.** Notice that the KPIs are all "nearly there" and contribute 0.48 of a possible 0.50 — the lost marks come mostly from decision quality (7.4/10). In the simulation, as on a real project, judgement is where the score is won or lost.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Reading the month-10 EVM report",
          given: md`EPC budget at completion (BAC) USD 560 m; planned construction duration 24 months. At month 10: planned value PV = USD 210 m, earned value EV = USD 172.2 m, actual cost AC = USD 183.2 m. Earned schedule ES = 8.2 months.`,
          steps: [
            { md: md`CPI $= EV/AC = 172.2/183.2 = 0.94$. The EPC spends USD 1.06 for each dollar of work earned.` },
            {
              md: md`SPI $= EV/PV = 172.2/210 = 0.82$.`,
              hidden: true,
              check: { prompt: "SPI", answer: 0.82, tolerance: { abs: 0.005 } },
            },
            {
              md: md`SPI(t) $= ES/AT = 8.2/10 = 0.82$; forecast duration $\approx 24/0.82 = 29.3$ months, i.e. about 5.3 months (≈ 160 days) late.`,
              hidden: true,
              check: { prompt: "Forecast construction duration", answer: 29.3, unit: "months", tolerance: { abs: 0.15 } },
            },
            { md: md`EPC cost forecast $EAC = BAC/CPI = 560/0.94 \approx 596$ USD m — about USD 36 m of overrun the EPC (not MEWRE) must absorb, which is a warning sign for claims and corner-cutting.` },
          ],
          result: md`If nothing changes, COD lands ~5 months late — straight into or past the summer peak. The professional response (decision 16 in the simulation) is to require a resource-loaded recovery schedule with critical path analysis through the PPA, track it weekly, and watch for the financial-distress behaviours a CPI of 0.94 predicts.`,
        },
        {
          kind: "question",
          question: {
            id: "m15-l02-p1",
            type: "numeric",
            prompt: md`A 14-day PR test on NAJM-1000 (1,300 MWp DC) records **112,300 MWh** at the test meter. Plane-of-array insolation over the period was **112 kWh/m²**, and the energy-weighted temperature correction factor $[1 + \gamma(T_c - T_{\text{ref}})]$ averages **0.97**. What is the temperature-corrected PR, in percent?`,
            answer: 79.5,
            unit: "%",
            tolerance: { abs: 0.2 },
            explanation: md`Reference yield: $1{,}300\ \text{MWp} \times (112\ \text{kWh/m}^2 \div 1\ \text{kW/m}^2) = 145{,}600$ MWh; corrected for temperature: $145{,}600 \times 0.97 = 141{,}232$ MWh. $\text{PR}_{\text{corr}} = 112{,}300 / 141{,}232 = 0.795$ → **79.5 %**. Against an 81 % guarantee this is 1.5 points short — about 1.85 % of energy, roughly 54 GWh/yr on a 2,900 GWh plant. Before judging, check the irradiance sensors (calibration, cleaning), the exclusions and the soiling data — then root-cause, remedy, retest, and apply LDs only for a residual shortfall.`,
            concepts: ["m15.commissioning-tests"],
            difficulty: 2,
          },
        },
        { kind: "widget", widget: "evm", props: { bac: 560, pv: 210, ev: 172.2, ac: 183.2 }, caption: "Load the month-10 numbers and compare the four EAC methods." },
        { kind: "widget", widget: "tariff-eval", caption: "Stage 2 preparation: see how a 12 % lower tariff ranks once technical scores and escalation are weighted." },
      ],
    },
    {
      layer: "field",
      title: "Stage-by-stage pre-briefing",
      blocks: [
        {
          kind: "md",
          md: md`### The five questions, before every decision

1. **Contract** — what do the PPA, RFP rules or law actually say? If you do not know, the first action is to find out.
2. **Risk owner** — whose risk is it? Do not pay for the IPP's risks; do not hide from MEWRE's.
3. **Lifecycle** — what happens to each of the five dimensions over 30 years, not just this month?
4. **File** — what would the State Audit Bureau conclude if it read the file in three years?
5. **People** — what does safety demand, and who must hear this from you first?

### What to watch in each stage

| Stage | Main instruments | Key stakeholders | What experienced PMs watch |
|---|---|---|---|
| 1 Pre-tender & RFQ | RFP technical schedules, data room, grid interface definition | KAPP and its advisors, MEWRE transmission | Comparable bids; an interface MEWRE can actually deliver; achievable local content |
| 2 RFP & bid evaluation | Published criteria, clarification procedure, evaluation report | KAPP evaluation committee, OE | Abnormally low bids; bid modifications disguised as clarifications; apples-to-apples BESS |
| 3 Award & financial close | Approval pack, PPA final terms, direct agreements | Higher Committee, Audit Bureau, Fatwa, lenders | Approval sequence; deemed-energy scope; precise COD tests |
| 4 Design & interconnection | Design review procedure, grid studies, interface schedule | OE, transmission, project company | MEWRE's line date; desert-specific design; early compliance studies |
| 5 Procurement & manufacturing | Supply-chain requirements, factory audits, long-lead orders, progress reports | OE, LTA, project company | Traceability; BOM vs certificate; transformer lead times; SPI trend |
| 6 Construction | HSE plans, force majeure and claims provisions, change procedure | Project company, EPC (through it), labour and civil-defence authorities | Heat stress; lifting; claims on facts; formal change control |
| 7 Testing & commissioning | COD test procedures, grid-compliance tests, interim notifications | OE, system control, project company | Test inputs before results; partial COD; staged export |
| 8 COD & handover | COD certificate conditions, punch list, handover package, audit file | Leadership, Audit Bureau, O&M | Category A items closed; full audit trail; accurate public messaging |`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Kuwait context for stages 1–3",
          md: md`MEWRE is the offtaker; KAPP runs the procurement under PPP Law 116/2014 and Decree 78/2015, with Higher Committee and State Audit Bureau approvals before signing. The Audit Bureau's prior review applies to contracts above a threshold (reported as KD 100,000 — verify), and contracting without approval is a violation the Bureau counts. Shagaya Zone 1's award slipped at this approval stage in 2026. Law 94/2026 tightens local-content rules from about late December 2026.`,
        },
        { kind: "sources", refs: ["m15-kapp-ppp-law", "m15-kapp-exec-regs", "m15-escwa-audit-law", "m15-zawya-2026-q3", "m15-tamimi-2026-tenders"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Summer midday outdoor-work restriction",
          md: md`Kuwait applies a seasonal ban on outdoor work during the hottest midday hours in summer, enforced by the labour authority. The exact months, hours and penalties are set by ministerial decision and may change; they were not verified in this course's research brief. Check the current decision of the Public Authority for Manpower before planning a summer construction programme.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "The five traps the simulation is built around",
          md: md`1. **Shortcut bias** — approving to save time now (design, heat, studies) and paying later.
2. **Over-correction** — rejecting everything, blanket bans, site-wide shutdowns: safe-looking but disproportionate.
3. **Acting outside the contract** — verbal instructions, private negotiations, signing before approval.
4. **Concealment and passivity** — waiting for bad news to become formal; leaving the Audit Bureau waiting.
5. **Accepting assertions** — "certified", "will recover", "close enough" — without verifying the data.

Most best answers are the **proportionate, documented, contractual** option, often costing a little now.`,
        },
        {
          kind: "callout",
          tone: "ai",
          title: "Using AI while you play",
          md: md`After each stage, ask the AI tutor to play the role of the Audit Bureau reviewer and question your choice: "Why did you accept/reject this? What evidence is in the file?" If you cannot answer in two sentences with a clause or a document, your decision probably was not robust. Do not ask the AI which option is best before you commit — the value is in your own reasoning.`,
        },
        {
          kind: "checklist",
          title: "Pre-flight checklist before you start the simulation",
          items: [
            "I can state the six KPIs, their targets and the scoring formula.",
            "I know the NAJM-1000 boundary: IPP builds the plant and 400/33 kV substation; MEWRE builds the 400 kV line and bay.",
            "I can explain bounded deemed energy and estimate MEWRE's exposure per month of grid delay (≈ KWD 1.2 m at 5 fils/kWh, even spread).",
            "I can read CPI/SPI and forecast COD from SPI(t).",
            "I can compute a temperature-corrected PR and list what to verify before judging a failed test.",
            "I will apply the five questions to every decision and note my reason in one sentence.",
          ],
        },
        {
          kind: "ask",
          title: "Questions the simulation expects you to ask (in your head) at key moments",
          items: [
            "Is this a clarification or a change to the bid's substance?",
            "Is this event genuinely unforeseeable for an experienced contractor in Kuwait, and what does the PPA define as force majeure?",
            "What exactly was tested, with which sensors and exclusions, and does the procedure match the PPA?",
            "Which approvals does this change need, and can it be kept off the critical path?",
            "If this goes wrong, who will be hurt, and what would I say at the inquiry?",
          ],
        },
        { kind: "scenario", scenario: "m15-s2" },
        { kind: "scenario", scenario: "m15-s3" },
        {
          kind: "feynman",
          prompt: "Explain to a colleague why the 'best' answer in this simulation is so often the option that costs a little money or time now.",
          keyPoints: [
            "The cost of fixing a problem rises steeply over the project lifecycle (RFP → close → construction → operation)",
            "Shortcuts move risk to MEWRE, which lives with the plant for 30 years",
            "Expected-value reasoning: saving S now is only worth it if S exceeds probability × consequence",
            "Proportionate, documented, contractual options protect trust with control bodies and leadership",
            "Over-correction is also penalised — the best option is proportionate, not maximal",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m15-l02-q1",
      type: "numeric",
      prompt: md`A run ends with cost USD 800 m (target ≤ 760). What is the cost KPI score?`,
      answer: 0.95,
      tolerance: { abs: 0.005 },
      explanation: md`Lower-is-better and above target, so $k = T/x = 760/800 = 0.95$. Had the cost been USD 700 m, the score would be capped at 1 — beating the target earns nothing extra.`,
      concepts: ["m15.tradeoff-framework"],
      difficulty: 1,
    },
    {
      id: "m15-l02-q2",
      type: "mcq",
      prompt: md`After technical bid opening, a bidder sends a "clarification" that changes its module supplier and lowers its price. What is the correct treatment?`,
      options: [
        "Accept it — any price reduction benefits the state",
        "Treat it as a non-conforming bid modification, evaluate the original bid, record the letter and inform the tender committee",
        "Ask all bidders to match it",
        "Disqualify the bidder for attempting to modify its bid",
      ],
      answer: 1,
      explanation: md`Clarifications may explain a bid but not change its price, scope or key terms. Accepting the change is unfair and challengeable; disqualification is not automatic unless the rules say so. Recording and reporting protects the process.`,
      concepts: ["m15.bid-evaluation"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m15-l02-q3",
      type: "multi",
      prompt: md`Which elements make a deemed-energy clause both bankable and acceptable to MEWRE? Select all that apply.`,
      options: [
        "Limited to MEWRE-caused unavailability or curtailment",
        "An annual curtailment allowance before compensation starts",
        "Calculated from the developer's internal model, unaudited",
        "Calculated from measured irradiance through an agreed, OE-validated model",
        "Covers force majeure events",
      ],
      answer: [0, 1, 3],
      explanation: md`Bankability comes from protection against the offtaker's failures; MEWRE's acceptance comes from the boundary (only MEWRE-caused, beyond an allowance) and transparency (agreed model, measured data). Unauditable models and force-majeure coverage shift risk to MEWRE that it cannot control or verify.`,
      concepts: ["m15.deemed-energy"],
      difficulty: 2,
    },
    {
      id: "m15-l02-q4",
      type: "decision",
      prompt: md`Month 10: SPI 0.82, CPI 0.94 on a 24-month build. The project company says the EPC "will recover after mobilisation". What do you do?`,
      options: [
        { text: "Accept the assurance; schedule is the IPP's risk", score: 0.2, feedback: "An SPI of 0.82 forecasts about 29 months. MEWRE's summer capacity depends on COD; assurances without a plan rarely materialise." },
        { text: "Require a resource-loaded recovery schedule with critical path analysis and an earned-schedule COD forecast through the PPA, and track it weekly", score: 1, feedback: "Data-driven and contractual. You cannot instruct the EPC, but you can require the project company to demonstrate how it will meet the scheduled COD." },
        { text: "Threaten publicly to terminate the PPA", score: 0.1, feedback: "Not credible, alarms lenders, and makes the contractor defensive." },
        { text: "Instruct the EPC directly to add two shifts", score: 0.3, feedback: "MEWRE has no contract with the EPC; a direct instruction could create liability for acceleration costs." },
      ],
      explanation: md`The offtaker's lever is the PPA: reporting obligations, the scheduled COD, delay LDs. Use data to make the conversation concrete.`,
      concepts: ["m15.schedule-recovery"],
      difficulty: 2,
    },
    {
      id: "m15-l02-q5",
      type: "mcq",
      prompt: md`A shamal damages 2 % of the modules; trackers in one block failed to stow because controller communications dropped. The project company claims force majeure for 60 days. What is the best first response?`,
      options: [
        "Grant the 60 days — weather is force majeure",
        "Reject the claim — the IPP carries all site risk",
        "Assess it against the PPA's force-majeure definition and thresholds, require a root-cause analysis of the stow failure, and grant time only for any genuinely exceptional portion",
        "Ask KAPP to decide",
      ],
      answer: 2,
      explanation: md`Sandstorms are foreseeable in Kuwait, and the stow failure points to a design weakness (no backup power or redundant sensors). A determination grounded in the PPA definition and the evidence is fair and defensible; blanket acceptance rewards the defect, blanket rejection invites a dispute.`,
      concepts: ["m15.claims-variations", "m15.design-integrity"],
      difficulty: 2,
    },
    {
      id: "m15-l02-q6",
      type: "order",
      prompt: md`Order the professional response to a failed BESS capacity test (940 of 1,000 MWh).`,
      items: [
        "Check the test against the agreed procedure (SOC calibration, auxiliaries, ambient conditions)",
        "Identify root causes (HVAC derating, auxiliary load, cell imbalance)",
        "Agree remedies with the project company (HVAC fix, augmentation)",
        "Allow partial COD at demonstrated capacity with reduced capacity payments if the PPA permits",
        "Retest, and apply LDs or permanent capacity reduction for any residual shortfall",
      ],
      explanation: md`Verify, diagnose, remedy, keep energy flowing where the contract allows, then enforce. Skipping the first step risks arguing about a measurement error; skipping the last gives away MEWRE's contractual protection.`,
      concepts: ["m15.commissioning-tests"],
      difficulty: 2,
    },
    {
      id: "m15-l02-q7",
      type: "short",
      prompt: md`In three or four sentences, explain why "approve now to protect the schedule" is often the wrong answer for an offtaker PM, and when it can be right.`,
      rubric: [
        "Cost of fixing problems rises over the lifecycle; rework later costs more time than review now",
        "The EPC's liability ends with defects liability; MEWRE lives with the plant for 30 years",
        "Expected value: schedule saved must exceed probability × consequence",
        "It can be right when the issue is minor/non-critical, or when approval can be given with targeted comments that let unaffected work proceed",
      ],
      modelAnswer: md`Approving a deficient design or test to save weeks usually moves the problem into construction or operation, where fixing it costs far more time and money; and the EPC's liability ends with the defects period while MEWRE buys power from the plant for 30 years. A shortcut is only rational if the time saved is worth more than the probability times the consequence, which PMs under pressure underestimate. It can be right for minor issues, or as "approved with comments", where targeted conditions protect integrity and unaffected work continues.`,
      explanation: md`The core idea is lifecycle asymmetry: problems get more expensive to fix at every stage, and the EPC's exposure ends long before MEWRE's does. "Approved with comments" is the professional middle ground — it keeps unaffected work moving while making the specific risks conditions of construction.`,
      concepts: ["m15.tradeoff-framework", "m15.design-integrity"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m15-l02-f1", front: "Capstone KPI score for a lower-is-better KPI above target", back: md`$k = T/x$ (1 if at or below target).`, concepts: ["m15.tradeoff-framework"] },
    { id: "m15-l02-f2", front: "Capstone total score", back: "50 % mean KPI score + 50 % mean decision quality (0–10 scaled to 0–1).", concepts: ["m15.tradeoff-framework"] },
    { id: "m15-l02-f3", front: "The five decision questions", back: "Contract · Risk owner · Lifecycle · File (Audit Bureau view) · People (safety and who must hear it first).", concepts: ["m15.tradeoff-framework"] },
    { id: "m15-l02-f4", front: "Clarification vs bid modification", back: "A clarification explains the bid; a modification changes price, scope or key terms — not permitted after opening.", concepts: ["m15.bid-evaluation"] },
    { id: "m15-l02-f5", front: "SPI 0.82 on a 24-month build — forecast duration?", back: md`$\approx 24/0.82 = 29.3$ months (≈ 5 months late).`, concepts: ["m15.schedule-recovery"] },
    { id: "m15-l02-f6", front: "First step after a failed PR test", back: "Verify inputs against the agreed procedure: irradiance sensor calibration and cleaning, exclusions, soiling data — then root-cause, remedy, retest.", concepts: ["m15.commissioning-tests"] },
    { id: "m15-l02-f7", front: "Interim grid compliance approach when the plant controller is too slow", back: "Limited export under an interim operational notification, firm deadline to retune and retest, full compliance before COD.", concepts: ["m15.grid-code-compliance"] },
    { id: "m15-l02-f8", front: "Proportionate response to a lifting near miss", back: "Stand down lifting operations, investigate, re-verify lift plans and competence, brief the site, then resume — not a fine, not a month-long site shutdown.", concepts: ["m15.hse-leadership"] },
    { id: "m15-l02-f9", front: "Long-lead 400/33 kV transformers — how to avoid them driving COD", back: "Order on frozen key parameters (rating, impedance, vector group, 50 °C cooling) before full design approval; witness FAT; survey the transport route early.", concepts: ["m15.schedule-recovery", "m15.design-integrity"] },
  ],
  scenarios: [
    {
      id: "m15-s2",
      title: "The aggressive low bid",
      dayInLife: true,
      context: md`Financial envelopes are open. Bidder A is 12 % below the field. A senior official stops you in the corridor: "The numbers speak. We recommend A tomorrow."`,
      start: "a",
      concepts: ["m15.bid-evaluation", "m15.approval-chain"],
      nodes: {
        a: {
          md: md`What do you say in the corridor?`,
          choices: [
            { text: "\"Agreed — lowest is lowest.\"", next: "c", score: 2, feedback: "You have just committed to a recommendation before the technical basis of the price has been tested." },
            { text: "\"It may well be A. Before we sign the recommendation, the RFP lets us clarify three assumptions in writing — it protects the award from challenge and from an Audit Bureau question. I can have the clarification letters to KAPP today.\"", next: "b", score: 10, feedback: "Respectful, procedural, fast — and framed in terms of protecting the official's decision." },
            { text: "\"A is obviously unrealistic. I won't support it.\"", next: "c", score: 3, feedback: "You may be right, but an opinion without process looks like bias and invites a challenge from Bidder A." },
          ],
        },
        b: {
          md: md`Bidder A's written answers confirm 0.5 % annual soiling and 0.25 %/yr degradation, and name a module supplier without traceability evidence. The OE's re-run on the reference dataset gives a P50 6 % lower than A's. What goes in the evaluation report?`,
          choices: [
            { text: "Record the clarifications and the OE's analysis factually against each published criterion; score accordingly; note the risks for the Higher Committee", score: 10, feedback: "Facts against criteria. The decision-makers get a defensible basis, whatever they decide." },
            { text: "Recommend disqualification because A is unrealistic", score: 5, feedback: "Only if the RFP criteria support it. Otherwise report the facts and the risk, and let the criteria decide." },
          ],
        },
        c: {
          md: md`Two days later, KAPP's legal advisor asks how the evaluation tested whether A's price is sustainable. What can you show?`,
          choices: [
            { text: "Propose formal clarifications now, before the recommendation goes forward", score: 7, feedback: "Recoverable — the process is back on track, at the cost of a few days and some credibility." },
            { text: "Nothing — the price speaks for itself", score: 1, feedback: "This is the file the Audit Bureau will read." },
          ],
        },
      },
    },
    {
      id: "m15-s3",
      title: "Forty-eight degrees and behind schedule",
      context: md`Mid-July. The EPC is six weeks behind. Ambient is 48 °C by 11:00. The project company asks MEWRE to "show flexibility" on midday working.`,
      start: "a",
      concepts: ["m15.hse-leadership", "m15.schedule-recovery"],
      nodes: {
        a: {
          md: md`What do you reply?`,
          choices: [
            { text: "\"MEWRE cannot be flexible on the midday restriction. We will support a night-shift plan with lighting, fatigue management and WBGT-based heat-stress controls — send it by Thursday, with a revised schedule.\"", next: "b", score: 10, feedback: "Firm on safety, constructive on schedule." },
            { text: "\"We didn't see anything.\"", score: 0, feedback: "Turning a blind eye makes you complicit. If someone dies, your silence is in the record." },
            { text: "\"Stop all work until September.\"", next: "b", score: 3, feedback: "Over-correction: well-managed night and early-morning work is safe and normal in the Gulf." },
          ],
        },
        b: {
          md: md`The night-shift plan arrives. Which element do you insist on most?`,
          choices: [
            { text: "Lighting design and exclusion zones for night lifting, with lifting operations limited to supervised windows", score: 10, feedback: "Night work changes the hazard profile: visibility and fatigue make lifting the critical risk." },
            { text: "Higher productivity targets to recover faster", score: 2, feedback: "Pushing productivity at night on fatigued crews raises incident risk." },
          ],
        },
      },
    },
  ],
};

export default lesson;
