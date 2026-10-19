import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m14-l04",
  title: "Analysing Schedule, Cost & Performance Data with AI",
  summary:
    "Let the AI write the code, not do the arithmetic: schedule health checks on P6/XER and CSV exports, EVM computation and forecasting, anomaly detection in SCADA data, auditing financial models, and AI-assisted scenario and risk analysis — with sanity checks at every step.",
  minutes: 60,
  objectives: [
    "You can explain why numeric analysis must go through code or spreadsheets, and set up an AI-assisted analysis that is reproducible",
    "You can compute and interpret EVM indicators and forecasts, and verify an AI's EVM output",
    "You can use AI to run schedule health checks on exported P6 data and to find anomalies in SCADA data",
    "You can audit a financial model with AI support: formula consistency, hard-codes, units, and sanity checks",
    "You can distinguish real performance problems from data problems (sensor faults, gaps, units, time stamps)",
  ],
  concepts: [
    {
      id: "m14.code-not-arithmetic",
      name: "Code, not mental arithmetic",
      description:
        "LLMs are unreliable at multi-step arithmetic; have them write and run code (or spreadsheet formulas) so results are exact and reproducible.",
      competency: "ai",
      related: ["m14.hallucination"],
    },
    {
      id: "m14.evm-analysis",
      name: "EVM analysis with AI",
      description:
        "Computing CV, SV, CPI, SPI, EAC and VAC from exported cost/progress data via code, then interpreting the trends and checking against known totals.",
      competency: "controls",
      related: ["m08.evm-basics", "m08.evm-forecasting"],
    },
    {
      id: "m14.schedule-health",
      name: "Schedule health checks",
      description:
        "Automated tests on a P6 export (missing logic, constraints, negative float, long durations, out-of-sequence progress) to judge whether a contractor's programme is credible.",
      competency: "controls",
      related: ["m14.code-not-arithmetic", "m08.dcma14"],
    },
    {
      id: "m14.scada-anomaly",
      name: "SCADA anomaly detection",
      description:
        "Comparing inverter or block performance (e.g. PR) against peers and expected values to find underperformance — after excluding data-quality artefacts.",
      competency: "operations",
      related: ["m12.loss-signatures", "m12.diagnosis-workflow"],
    },
    {
      id: "m14.model-audit",
      name: "Financial model auditing",
      description:
        "Checking a spreadsheet model for inconsistent formulas, hard-coded inputs, unit and timing errors, broken links and implausible outputs.",
      competency: "finance",
      related: ["m10.model-audit"],
    },
    {
      id: "m14.data-sanity",
      name: "Data sanity checks",
      description:
        "Reconciling totals, units, time zones, gaps and ranges before trusting any analysis result.",
      competency: "ai",
      related: ["m14.scada-anomaly", "m14.evm-analysis", "m12.data-quality"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why AI analysis must run through code",
      blocks: [
        {
          kind: "md",
          md: md`A PM at MEWRE drowns in data: monthly P6 updates from the EPC contractor, cost reports and IPCs, the OE's progress measurement, SCADA streams from operating plants, the IPP's financial model in a bid. AI makes this data accessible — **if** it is used the right way.

### The rule: the model writes code; the code does the arithmetic

LLMs process numbers as tokens. They can reason about formulas well, but adding 300 cost lines or computing a percentile "in their head" is unreliable — they may produce a plausible total that is wrong. The fix is architectural:

1. Give the model the **data file** (CSV, XLSX, XER) or a sample of it plus its schema.
2. Ask it to **write code** (typically Python with pandas) or spreadsheet formulas that compute the result.
3. **Run the code** — in an AI tool with code execution, in Claude Code on your machine, or yourself.
4. **Check** results against known control totals and sanity ranges.
5. Ask the model to **interpret** the computed results — interpretation is where it adds most value.

The code is a reproducible artefact: next month, run it on the new export; a reviewer can read it; an auditor can re-run it.

### Earned Value Management (EVM) — the core quantities

With budget at completion (BAC), planned value (PV), earned value (EV) and actual cost (AC) at the status date:`,
        },
        { kind: "equation", formula: "m14-evm-variances" },
        { kind: "equation", formula: "m14-evm-indices" },
        { kind: "equation", formula: "m14-eac-cpi" },
        { kind: "equation", formula: "m14-eac-composite" },
        {
          kind: "md",
          md: md`CPI < 1 means each KD spent earns less than a KD of planned work; SPI < 1 means less work done than planned. EAC by CPI assumes current cost efficiency continues; the composite EAC assumes both cost and schedule pressure persist (typical when recovery requires acceleration). The **trend** over several months matters more than one value: CPI tends to stabilise once a project is about 20% complete, so an early poor CPI is a strong warning.

Note that SPI computed from costs converges to 1.0 at completion even for a late project; for late-stage schedule analysis use the programme's critical path, not SPI alone.

### Schedule data: what is in a P6 export

Primavera P6 exports schedules as **XER** files — a tab-delimited text format organised into tables (activities, relationships, WBS, calendars, resources), with header lines marking each table and its fields — or as XLSX/CSV reports. An LLM can read the structure and write code to parse it. Typical **schedule health checks** (in the spirit of the widely used DCMA 14-point assessment):

| Check | Why it matters | Typical threshold |
|---|---|---|
| Missing predecessors/successors | Open ends break the critical path | ≈ 5% of activities max |
| Hard constraints | Override logic; can hide real delay | ≈ 5% max |
| Leads (negative lags) and long lags | Obscure real sequencing | Leads: none |
| High total float | Missing logic | > 44 working days flagged |
| Negative float | Forecast misses a constraint date | Any — investigate |
| Long durations | Too coarse to control | > 44 working days flagged |
| Out-of-sequence progress | Logic does not reflect reality | Investigate each |
| Critical path continuity | Can you trace a continuous path to completion? | Must pass |

Thresholds are conventions, not laws; the aim is to judge whether the contractor's programme is a credible model of the work — essential before accepting it or using it for delay analysis.

### Performance data: PR and anomalies

For PV plants, the **performance ratio** normalises energy by irradiance and capacity, so blocks and periods can be compared:`,
        },
        { kind: "equation", formula: "m14-performance-ratio" },
        {
          kind: "md",
          md: md`Typical monthly PR for a well-run utility PV plant in a hot desert climate is in the high 70s to low 80s percent, lower in peak summer (temperature losses) and when soiling builds up. A block with PR 8–10 points below its peers on the same day is a strong anomaly signal — but so is a broken irradiance sensor. Always check **data quality first**: gaps, frozen values, sensor drift, units (kW vs MW, Wh vs kWh), time stamps (local time UTC+3 vs UTC), and availability flags.

### Financial models

An IPP bid or business-case model in Excel can contain thousands of formulas. AI helps by: listing all **hard-coded numbers inside formulas**; finding **inconsistent formulas** along rows (a different formula in year 12); tracing **inputs to outputs**; checking **units and timing** (annual vs monthly, nominal vs real, KD vs USD at the stated rate); and running **sanity checks**: does total revenue ≈ energy × tariff? does debt repay by tenor end? is minimum DSCR plausible? does the IRR change in the right direction when capex rises? The AI can write code to extract formulas from the file and test these properties — but only you can judge whether an assumption is reasonable.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why interpretation is where AI earns its keep",
          md: md`Computing CPI = 0.91 is trivial. Explaining that CPI has fallen for four months, that the drop is concentrated in civil works, that it coincides with the summer working-hour restrictions, and that the EAC range is KD 52.7–56.0 m — then drafting the paragraph for the monthly report — is where hours disappear. Once the numbers are computed by code and checked, an LLM is excellent at this synthesis.`,
        },
        {
          kind: "callout",
          tone: "ai",
          title: "AI tip — ask for the code and a control total",
          md: md`End every analysis prompt with: "Write the code, run it, show the code, and print a control total (e.g. sum of AC by month = total AC in the cost report) so I can confirm the data loaded correctly." If the control total does not match your source, nothing downstream is trustworthy.`,
        },
        { kind: "sources", refs: ["m14-pmi-evm", "m14-oracle-p6", "m14-iec-61724"] },
      ],
    },
    {
      layer: "applied",
      title: "EVM, PR anomalies and forecasts — computed and checked",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Month 14 EVM for the substation EPC — verifying the AI's numbers",
          given: md`From the cost report and the OE's progress measurement at month 14: **BAC = KD 48.0 m, PV = KD 30.0 m, EV = KD 26.4 m, AC = KD 29.0 m.** You asked an AI tool to compute the indicators with code and draft the commentary. Check its results.`,
          steps: [
            { md: md`Cost variance: $CV = EV - AC = 26.4 - 29.0 = -\text{KD } 2.6$ m (over cost).` },
            { md: md`Schedule variance: $SV = EV - PV = 26.4 - 30.0 = -\text{KD } 3.6$ m (behind).` },
            { md: md`$CPI = EV/AC = 26.4/29.0 = 0.910$; $SPI = EV/PV = 26.4/30.0 = 0.880$.` },
            { md: md`$EAC_{CPI} = BAC/CPI = 48.0/0.910 = \text{KD } 52.7$ m; $VAC = BAC - EAC = -\text{KD } 4.7$ m.` },
            {
              md: md`**Checks.** (a) Control totals: AC in the code output equals the cost report total (KD 29.0 m) ✓. (b) EV equals the sum of earned values by WBS ✓. (c) Direction: CPI < 1 and CV < 0 are consistent ✓. (d) Plausibility: EAC exceeds BAC by about 10% — consistent with a CPI of 0.91 ✓.`,
            },
            {
              md: md`**Interpretation (AI-drafted, you edit).** "The project is 55% complete by value (EV/BAC) against 62.5% planned. Cost efficiency is 0.91: at the current rate the outturn is about KD 52.7 m, KD 4.7 m above budget, which exceeds the remaining contingency. The overrun is concentrated in civil works (to be confirmed by WBS breakdown)."`,
            },
          ],
          result: md`$CV = -2.6$, $SV = -3.6$ (KD m); CPI 0.910, SPI 0.880; $EAC_{CPI} \approx$ **KD 52.7 m**, VAC ≈ −KD 4.7 m. The AI's job was the code and the narrative; your job was the control totals and the judgement that the overrun exceeds contingency.`,
        },
        {
          kind: "widget",
          widget: "evm",
          props: { bac: 48, pv: 30, ev: 26.4, ac: 29 },
          caption: "Reproduce the month-14 figures, then explore how EAC changes under the different forecasting methods.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Is block B really underperforming?",
          given: md`Two 10.4 MWp blocks of a PV plant in the same month: POA irradiation (plant pyranometer) $H_{POA} = 215$ kWh/m²; block A exported **1,840 MWh**, block B **1,610 MWh**. The AI flags block B. $G_{STC} = 1$ kW/m².`,
          steps: [
            { md: md`$PR_A = E/(H_{POA}/G_{STC} \cdot P_{STC}) = 1840/(215 \times 10.4) = 1840/2236 = 0.823$.` },
            {
              md: md`$PR_B = 1610/2236 = 0.720$.`,
              hidden: true,
              check: { prompt: "PR of block B (as a decimal)", answer: 0.72, tolerance: { abs: 0.003 } },
            },
            {
              md: md`Gap $= 82.3 - 72.0 = 10.3$ percentage points.`,
              hidden: true,
              check: { prompt: "PR gap between blocks (percentage points)", answer: 10.3, unit: "pp", tolerance: { abs: 0.2 } },
            },
            {
              md: md`**Before concluding:** check B's data — inverter availability (was an inverter offline for part of the month?), communication gaps counted as zero, a meter or CT ratio error, and whether B has its own irradiance sensor showing lower values (shading or soiling of the sensor). Only then investigate physical causes: soiling, string faults, tracker faults, inverter derating.`,
            },
          ],
          result: md`A 10-point PR gap between identical blocks is a real signal worth investigating — about 230 MWh in the month — but the first hypothesis to test is always the data, then availability, then physical causes.`,
        },
        {
          kind: "question",
          question: {
            id: "m14-l04-p1",
            type: "numeric",
            prompt: md`Using the month-14 data (BAC 48.0, EV 26.4, AC 29.0, PV 30.0, KD m), compute the composite forecast $EAC = AC + (BAC - EV)/(CPI \times SPI)$ in KD million.`,
            answer: 55.96,
            unit: "KD m",
            tolerance: { abs: 0.05 },
            explanation: md`$CPI \times SPI = 0.9103 \times 0.880 = 0.8011$. Remaining work $= 48.0 - 26.4 = 21.6$. $EAC = 29.0 + 21.6/0.8011 = 29.0 + 26.96 = \text{KD } 55.96$ m. Reporting a range — KD 52.7 m (CPI) to KD 56.0 m (composite) — is more honest than a single figure.`,
            concepts: ["m14.evm-analysis"],
            difficulty: 2,
          },
        },
        {
          kind: "md",
          md: md`### A prompt that analyses a P6 export properly

> You are a planning engineer reviewing an EPC contractor's programme for the Employer. Attached is the P6 XER export (data date [ ]). Write Python code that: (1) parses the activity and relationship tables; (2) prints control totals (number of activities, number of relationships, project finish date) so I can check them against P6; (3) runs these checks and lists offending activity IDs: missing predecessors or successors, hard constraints, negative lags, lags over 10 days, total float over 44 working days, negative float, remaining durations over 44 working days, actual dates after the data date; (4) traces the longest path to project completion and lists it. Run the code and show it. Then summarise which findings most undermine the programme's credibility, and draft five questions to the contractor's planner.

The control totals are the hook for your verification: if the activity count differs from P6, the parsing is wrong.`,
        },
        {
          kind: "widget",
          widget: "monte-carlo",
          caption: "Scenario analysis: after the AI helps you structure three-point estimates for the remaining critical activities, use Monte Carlo to express the forecast as P50/P80 rather than a single date.",
        },
      ],
    },
    {
      layer: "field",
      title: "Doing data analysis on a live MEWRE project",
      blocks: [
        {
          kind: "md",
          md: md`### The monthly analysis routine

1. **Collect exports** in agreed formats (contract requirement): P6 XER and PDF of the programme, cost/IPC data, progress measurement by WBS, SCADA monthly extracts for operating assets.
2. **Classify and clean.** Remove or mask fields you are not permitted to share with your AI tool (lesson m14-l06). SCADA data with network addresses, protection settings or security configuration should not leave approved systems.
3. **Run your saved analysis code** (written with AI help in previous months) on the new data. Reuse beats re-prompting: same code, same checks, comparable results.
4. **Check control totals and sanity ranges** before reading any result.
5. **Interpret with AI.** Feed the computed tables (not raw data) and ask for trends, drivers and a draft narrative.
6. **Decide and act.** Questions to the contractor, instructions, items for the risk register, report to your Assistant Undersecretary.

### Checking an IPP or contractor financial model

Ask the AI to write code that reads the workbook formulas and reports: hard-coded constants inside formulas; rows where the formula pattern changes; references to blank cells; circularity; and named inputs with their values. Then run sanity checks you specify: revenue ≈ energy × tariff each year; opex escalation as stated; debt fully repaid by tenor; DSCR computed as CFADS ÷ debt service; currency conversions at the stated rate (state yours: e.g. 1 KWD ≈ 3.25 USD). Report findings as questions to the modeller, not accusations — models are often right for reasons not visible in one sheet.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **AI arithmetic** — totals computed "in the chat" without code; off by a few percent, unnoticed.
- **Gaps treated as zero** — communication outages in SCADA read as zero output, creating false underperformance.
- **Time-zone and timestamp errors** — UTC vs Kuwait local time (UTC+3) shifts irradiance and power by three hours and wrecks PR by hour.
- **Units** — kW vs MW, Wh vs kWh, KD vs USD.
- **Trusting the contractor's SPI** while the critical path slips — SPI is cost-weighted and blind to logic.
- **Accepting a programme** that fails basic health checks, then being unable to use it for delay analysis.
- **Sensitive operational data** (network topology, protection settings, security configuration) uploaded to an external tool.`,
        },
        {
          kind: "checklist",
          title: "Analysis checklist",
          items: [
            "Data allowed in this tool? Sensitive fields removed or masked?",
            "Analysis done by code or spreadsheet, not AI mental arithmetic",
            "Control totals match the source (row counts, cost totals, energy totals, finish date)",
            "Units, time zone and sign conventions confirmed",
            "Gaps and frozen values handled explicitly (not as zeros)",
            "Results within plausible ranges (PR, CPI, EAC, DSCR)",
            "Code saved for reuse next month; changes documented",
            "Interpretation reviewed by you before it enters a report",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask the contractor (generated from the analysis)",
          items: [
            "Why do these activities have no successors, and how do they drive completion?",
            "What justifies the hard constraints on these milestones?",
            "Why did CPI in civil works fall from 0.97 to 0.86 over four months?",
            "Which resources will recover the negative float on the GIS installation path?",
            "Why does block B show 10 points lower PR — what do your inverter and string data show?",
          ],
        },
        { kind: "scenario", scenario: "m14-s3" },
        {
          kind: "feynman",
          prompt: "Explain to a colleague why you never let an AI chat compute your EVM numbers directly, and what you do instead.",
          keyPoints: [
            "LLMs are unreliable at multi-step arithmetic; plausible wrong totals",
            "Have the AI write and run code; keep the code for reuse",
            "Check control totals against the source and sanity ranges",
            "Use AI for interpretation and narrative once numbers are verified",
            "Report forecasts as ranges (EAC by CPI vs composite)",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m14-l04-q1",
      type: "mcq",
      prompt: "What is the most reliable way to compute EVM indicators from a 400-line cost export with an AI tool?",
      options: [
        "Paste the data and ask for the totals in the chat",
        "Ask the AI to write and run code, show it, and print control totals you can check",
        "Ask two different AI chats and average their answers",
        "Ask the AI to estimate the indicators from a summary",
      ],
      answer: 1,
      explanation: md`Code gives exact, reproducible results; control totals verify the data loaded correctly.`,
      concepts: ["m14.code-not-arithmetic"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m14-l04-q2",
      type: "numeric",
      prompt: "BAC = KD 20 m, EV = KD 8 m, AC = KD 10 m. What is EAC using CPI (KD million)?",
      answer: 25,
      unit: "KD m",
      tolerance: { abs: 0.05 },
      explanation: md`$CPI = 8/10 = 0.8$; $EAC = 20/0.8 = \text{KD } 25$ m.`,
      concepts: ["m14.evm-analysis"],
      difficulty: 1,
    },
    {
      id: "m14-l04-q3",
      type: "numeric",
      prompt: "A 5.0 MWp PV block exported 760 MWh in a month with POA irradiation of 190 kWh/m². What is its PR (as a decimal)?",
      answer: 0.8,
      tolerance: { abs: 0.003 },
      explanation: md`$PR = 760/(190 \times 5.0) = 760/950 = 0.80$.`,
      concepts: ["m14.scada-anomaly"],
      difficulty: 1,
    },
    {
      id: "m14-l04-q4",
      type: "multi",
      prompt: "Before concluding that an inverter block underperforms, which data-quality issues should you rule out? (Select all that apply.)",
      options: ["Communication gaps recorded as zero output", "UTC vs local time stamps", "Faulty or soiled irradiance sensor", "The contractor's preferred explanation", "kW vs MW unit mismatch"],
      answer: [0, 1, 2, 4],
      explanation: md`Data artefacts mimic underperformance. The contractor's explanation is a hypothesis to test, not a data-quality check.`,
      concepts: ["m14.data-sanity", "m14.scada-anomaly"],
      difficulty: 1,
    },
    {
      id: "m14-l04-q5",
      type: "decision",
      prompt: md`You are the PM. The AI's health check of the contractor's revised programme shows 18% of activities with no successors, 40 hard constraints and a critical path that cannot be traced to completion. The contractor asks you to accept the programme this week. What do you do?`,
      options: [
        { text: "Accept it — a programme is better than none", score: 0.1, feedback: "An accepted but logically broken programme undermines later delay analysis and may be argued as Employer acceptance of its dates." },
        { text: "Verify a sample of the AI's findings in P6, then have the Engineer return the programme as non-compliant with specific findings and require resubmission within the contractual period", score: 1, feedback: "Correct: verify, then respond formally with evidence. The health-check output becomes the basis of specific comments." },
        { text: "Reject it citing 'AI analysis'", score: 0.4, feedback: "Right direction, but the response must rest on verified findings and the Contract's programme requirements, not on 'the AI said so'." },
      ],
      explanation: md`AI accelerates the check; the formal response must cite verified, specific deficiencies against the Contract's programme requirements.`,
      concepts: ["m14.schedule-health"],
      difficulty: 2,
    },
    {
      id: "m14-l04-q6",
      type: "short",
      prompt: md`**Hands-on.** Write a prompt asking an AI tool to audit an IPP's financial model workbook for structural errors and implausible outputs.`,
      rubric: [
        "Asks the AI to write and run code that reads formulas (not just values)",
        "Specific structural checks: hard-codes in formulas, inconsistent row formulas, blank references, circularity",
        "Specific sanity checks: revenue vs energy × tariff, debt repayment by tenor, DSCR definition, currency/units",
        "Requires control totals or a list of inputs for verification",
        "Frames output as findings/questions with cell references",
      ],
      modelAnswer:
        "You are a financial-model reviewer for the offtaker. Attached: the bidder's model (XLSX). Write and run Python code that reads formulas and values and reports: (1) all hard-coded numbers inside formulas, with cell references; (2) rows where the formula pattern changes across years; (3) references to blank cells; (4) circular references; (5) a table of named or labelled inputs with values and units. Then run sanity checks: annual revenue vs energy × tariff (tolerance 0.5%); opex escalation vs stated rate; debt balance zero at tenor end; DSCR = CFADS / debt service each period and its minimum; all currency conversions at 1 KWD = 3.25 USD unless stated. Print control totals (total revenue, total capex) for me to check. Output findings as a table: #, Sheet!Cell, Finding, Why it matters, Question for the modeller.",
      explanation: md`Reading formulas (not just values) is what exposes structural errors; sanity checks test economic coherence; cell references make every finding checkable.`,
      concepts: ["m14.model-audit", "m14.code-not-arithmetic"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "m14-l04-f1", front: "Rule for numeric analysis with AI", back: "The model writes code; the code does the arithmetic; you check control totals." },
    { id: "m14-l04-f2", front: "CPI and SPI", back: md`$CPI = EV/AC$, $SPI = EV/PV$; below 1 = over cost / behind.` },
    { id: "m14-l04-f3", front: "EAC by CPI vs composite", back: md`$BAC/CPI$ vs $AC + (BAC-EV)/(CPI \cdot SPI)$ — report as a range.` },
    { id: "m14-l04-f4", front: "Performance ratio", back: md`$PR = E/(H_{POA}/G_{STC} \cdot P_{STC})$` },
    { id: "m14-l04-f5", front: "First suspect when a PV block shows low PR", back: "Data: gaps-as-zero, sensor faults, units, time stamps, availability — then physical causes." },
    { id: "m14-l04-f6", front: "Four schedule health checks", back: "Missing logic, hard constraints, high/negative float, long durations (plus leads/lags, critical-path trace)." },
    { id: "m14-l04-f7", front: "SPI limitation", back: "Cost-weighted; tends to 1.0 at completion even for late projects; use the critical path for schedule truth." },
    { id: "m14-l04-f8", front: "Financial model audit — structural checks", back: "Hard-codes in formulas, inconsistent row formulas, blank references, circularity, units/currency." },
  ],
  scenarios: [
    {
      id: "m14-s3",
      title: "The PR drop at dawn",
      dayInLife: true,
      context: md`You manage MEWRE's oversight of an operating PV plant. You run your saved AI-written analysis on last month's SCADA export. It reports that plant PR fell from 0.81 to 0.74 and that the drop is "concentrated between 03:00 and 06:00 and between 14:00 and 17:00".`,
      start: "a",
      concepts: ["m14.data-sanity", "m14.scada-anomaly"],
      nodes: {
        a: {
          md: md`What is your first hypothesis?`,
          choices: [
            { text: "A time-stamp problem: the export may have switched between UTC and local time (UTC+3), shifting power relative to irradiance", next: "b", score: 10, feedback: "Power 'at 03:00' is physically impossible for PV; a 3-hour shift between data streams is the classic cause." },
            { text: "Heavy soiling after a dust storm", next: "c", score: 3, feedback: "Soiling reduces output during daylight, not at 03:00 — the pattern points to data." },
            { text: "Inverter failures — send an urgent letter to the O&M contractor", next: "c", score: 1, feedback: "A formal escalation based on an unverified data artefact damages your credibility." },
          ],
        },
        b: {
          md: md`You check: the irradiance channel is in local time; the power channel switched to UTC mid-month after a SCADA update. After realigning, PR is 0.79 — a smaller but real drop from 0.81.`,
          choices: [
            { text: "Fix the analysis code to normalise time zones and assert alignment; then investigate the residual 2-point drop (soiling, availability)", next: "d", score: 10, feedback: "Fix the pipeline permanently, then analyse the real signal." },
            { text: "Report PR 0.79 and stop", next: "d", score: 5, feedback: "The residual drop may still matter (about 2.5% of energy) — worth a question to O&M." },
          ],
        },
        c: {
          md: md`The O&M contractor replies that the inverters were fine and attaches data showing the time-stamp issue.`,
          choices: [{ text: "Withdraw the letter and fix your analysis", next: "b", score: 2, feedback: "Recovered, at the cost of credibility. Data first, then escalation." }],
        },
        d: {
          md: md`How do you report this to your Assistant Undersecretary?`,
          choices: [
            { text: "One paragraph: PR 0.79 vs 0.81, cause under investigation (likely soiling after storms), estimated energy impact in MWh and KD, data issue found and fixed, next update date", score: 10, feedback: "Leader numbers, honest about the data issue, with a dated next step." },
            { text: "Forward the AI's full analysis output", score: 3, feedback: "Unfiltered output includes the artefact and no judgement — your job is the synthesis." },
          ],
        },
      },
    },
  ],
};

export default lesson;
