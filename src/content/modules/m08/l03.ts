import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m08-l03",
  title: "CPM Scheduling, Primavera P6 and Schedule Quality (DCMA 14-Point)",
  summary:
    "Derive the forward and backward pass, compute total and free float, handle lags and constraints, load resources, speak P6 fluently (WBS, activity codes, calendars, baselines, data date, XER) and review an EPC programme like a forensic planner.",
  minutes: 90,
  objectives: [
    "You can perform a forward and backward pass by hand on a 12-activity PV EPC network and identify the critical path, total float and free float.",
    "You can explain SS/FF/SF relationships, lags, leads and constraints, and why hard constraints and lags corrupt a schedule.",
    "You can navigate the P6 concepts a contractor's planner will use: EPS/WBS, activity codes, calendars, baselines, data date, update methods, XER.",
    "You can run a DCMA 14-point assessment and a critical-path sanity review on a contractor's baseline programme.",
    "You can determine the project impact of a delay from float, and decide what to ask the contractor.",
  ],
  concepts: [
    { id: "m08.cpm", name: "Critical path method", description: "Network scheduling using forward/backward passes to find early/late dates, float and the longest (critical) path.", competency: "controls", related: ["m08.wbs"] },
    { id: "m08.float", name: "Total and free float", description: "Total float: delay possible without delaying completion. Free float: delay possible without delaying any successor's early start.", competency: "controls", related: ["m08.cpm"] },
    { id: "m08.lags-constraints", name: "Relationships, lags and constraints", description: "FS/SS/FF/SF logic with lags/leads; date constraints that override logic and can create negative or false float.", competency: "controls", related: ["m08.cpm"] },
    { id: "m08.p6", name: "Primavera P6 concepts", description: "EPS, WBS, activities, activity codes, calendars, baselines, data date, scheduling options, XER exchange files.", competency: "controls", related: ["m08.cpm"] },
    { id: "m08.dcma14", name: "DCMA 14-point assessment", description: "Standard set of schedule-quality metrics: logic, leads, lags, relationship types, constraints, float, durations, invalid dates, resources, missed tasks, CP test, CPLI, BEI.", competency: "controls", related: ["m08.cpm", "m08.p6"] },
    { id: "m08.resource-loading", name: "Resource loading & levelling", description: "Assigning labour/equipment to activities to test feasibility; levelling uses float to smooth peaks, sometimes extending the schedule.", competency: "controls", related: ["m08.cpm"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The network, the passes, and what float really means",
      blocks: [
        {
          kind: "md",
          md: md`A CPM schedule is a **directed acyclic graph**: nodes are activities with durations, edges are logical dependencies. As a controls engineer you already know this structure — it is a precedence graph, and the critical path is its **longest path**. Everything else (Gantt bars, colours, S-curves) is presentation.

### Relationship types

| Type | Meaning | PV example |
|---|---|---|
| **FS** finish-to-start | B starts after A finishes | Modules installed after trackers installed (per row/block) |
| **SS** start-to-start | B starts after A starts (+ lag) | Tracker installation starts 4 weeks after piling starts |
| **FF** finish-to-finish | B finishes after A finishes (+ lag) | Tracker installation finishes 2 weeks after piling finishes |
| **SF** start-to-finish | B finishes after A starts | Rare; avoid (shift handovers) |

A **lag** is a waiting time on a relationship (e.g., concrete curing 7 days). A **lead** is a negative lag; DCMA demands zero leads because they hide unexplained overlap. Lags should represent physical waiting only — a lag of "20 days" used instead of an activity like "Employer review of drawings" hides work nobody can track.

### Forward pass

Using the time-zero convention (an activity of 10 weeks starting at 0 finishes at 10):`,
        },
        { kind: "equation", formula: "cpm-forward-pass" },
        {
          kind: "md",
          md: md`For SS and FF links the rules generalise: $ES_j \ge ES_i + L_{SS}$, and $EF_j \ge EF_i + L_{FF}$ (so $ES_j \ge EF_i + L_{FF} - D_j$). The early start is the maximum of all such bounds.

### Backward pass`,
        },
        { kind: "equation", formula: "cpm-backward-pass" },
        { kind: "equation", formula: "cpm-total-float" },
        { kind: "equation", formula: "cpm-free-float" },
        {
          kind: "callout",
          tone: "why",
          title: "Why max forward, min backward",
          md: md`Forward: an activity can only start when **every** predecessor allows it, so the binding constraint is the latest of them (max). Backward: an activity must finish in time for **every** successor, so the binding constraint is the earliest successor late start (min). Total float is then the slack between the two bounds on the activity's position. Float belongs to the **path**, not the activity: consume it upstream and every downstream activity on that path loses it.`,
        },
        {
          kind: "md",
          md: md`### Lag example (SS + FF)

Piling P = 12 weeks from week 0. Tracker installation T = 14 weeks, with **SS +4** and **FF +2** from P. SS bound: $ES_T \ge 0 + 4 = 4$. FF bound: $EF_T \ge 12 + 2 = 14$, i.e., $ES_T \ge 0$. So $ES_T = 4$, $EF_T = 18$ — six weeks shorter than strict FS (P finish 12 + 14 = 26). Overlapping logic is how real PV programmes compress; it is also how optimistic planners hide risk, because the overlap assumes piling stays ahead of tracker crews all the way.

### Constraints

Constraints impose dates on activities. **Soft** constraints (Start On or After, Finish On or Before) respect logic and are legitimate for external dates (e.g., "grid backfeed available — MEWRE milestone"). **Hard/mandatory** constraints (Mandatory Start, Mandatory Finish) override logic: the schedule will show an activity starting before its predecessors finish, and float is falsified. DCMA allows hard constraints on no more than 5 % of incomplete activities; best practice is **zero**, with external dates modelled as milestones with soft constraints.

### Resource loading

Logic says what **can** happen; resources say whether it **will**. Illustrative example: a 1.3 GWp single-axis-tracker plant needs on the order of **290,000 piles** (about 0.22 piles per kWp — check the tracker supplier's layout). Piling planned over 30 weeks × 6 days = 180 working days requires $290{,}000 / 180 \approx 1{,}611$ piles/day; at 120 piles per rig-day that is about **14 rigs** with crews, surveyors and pile supply logistics. If summer working-hour restrictions cut productive time on those days, either rigs increase or duration extends. **Resource levelling** delays non-critical activities within their float to smooth peaks; when float runs out, the end date moves.

### Schedule quality metrics`,
        },
        { kind: "equation", formula: "sched-cpli" },
        { kind: "equation", formula: "sched-bei" },
        {
          kind: "md",
          md: md`The **DCMA 14-point assessment** (applied to incomplete activities, durations in working days):

| # | Check | Threshold |
|---|---|---|
| 1 | **Logic** — activities missing a predecessor or successor | ≤ 5 % |
| 2 | **Leads** (negative lags) | 0 |
| 3 | **Lags** | ≤ 5 % of relationships |
| 4 | **Relationship types** — FS share | ≥ 90 % FS |
| 5 | **Hard constraints** | ≤ 5 % |
| 6 | **High float** — TF > 44 working days | ≤ 5 % |
| 7 | **Negative float** | 0 |
| 8 | **High duration** — > 44 working days | ≤ 5 % |
| 9 | **Invalid dates** — forecasts before data date / actuals after it | 0 |
| 10 | **Resources** — activities without cost/resource loading | 0 (if resource-loaded) |
| 11 | **Missed tasks** — baseline finish passed but not done | ≤ 5 % |
| 12 | **Critical path test** — add delay to a CP activity, end date must move by the same amount | Pass |
| 13 | **CPLI** | ≥ 0.95 |
| 14 | **BEI** | ≥ 0.95 |

The checks are **diagnostic, not pass/fail law**: a 44-day threshold is unrealistic for module manufacturing (8–16 weeks) unless it is split into submittal, manufacture, FAT, shipping, customs, delivery — which is exactly what you want anyway.`,
        },
        { kind: "sources", refs: ["m08-gao-schedule", "m08-dcma-14", "m08-aace-rp", "m08-p6"] },
      ],
    },
    {
      layer: "applied",
      title: "Hand-calculating a PV EPC network",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Forward/backward pass on a 12-activity PV EPC network (weeks)",
          given: md`Simplified Level-2 network for a PV EPC with MEWRE's grid connection (all FS, lag 0):

| ID | Activity | D (wk) | Predecessors |
|---|---|---|---|
| A | Detailed design & IFC drawings | 10 | — |
| B | Site enabling & grading | 6 | — |
| C | Tracker procurement & delivery | 20 | A |
| D | Module procurement & delivery | 26 | — |
| E | Piling | 12 | A, B |
| F | Tracker installation | 14 | C, E |
| G | Module installation | 12 | D, F |
| H | Inverter/MV station procurement | 24 | A |
| I | Inverter/MV station installation | 6 | H, E |
| J | DC/AC cabling & terminations | 10 | F, I |
| K | MEWRE 400 kV line & bay (by Employer) | 40 | — |
| L | Commissioning & grid tests | 6 | G, J, K |`,
          steps: [
            { md: md`**Forward pass.** A: 0–10. B: 0–6. D: 0–26. K: 0–40. C: ES = EF(A) = 10 → 30. E: ES = max(10, 6) = 10 → 22. H: 10 → 34. F: ES = max(EF C = 30, EF E = 22) = 30 → 44. I: ES = max(34, 22) = 34 → 40. G: ES = max(26, 44) = 44 → 56. J: ES = max(44, 40) = 44 → 54. L: ES = max(56, 54, 40) = 56 → **62**. Project duration = 62 weeks.` },
            { md: md`**Backward pass** (LF of L = 62). L: 56–62. G: LF = 56 → LS 44. J: LF 56 → LS 46. K: LF 56 → LS 16. F: LF = min(LS G 44, LS J 46) = 44 → LS 30. I: LF = LS J = 46 → LS 40. D: LF = 44 → LS 18. H: LF = LS I = 40 → LS 16. C: LF = 30 → LS 10. E: LF = min(LS F 30, LS I 40) = 30 → LS 18. B: LF = LS E = 18 → LS 12. A: LF = min(LS C 10, LS E 18, LS H 16) = 10 → LS 0.` },
            {
              md: md`**Results** (TF = LS − ES; FF = min ES of successors − EF):

| ID | D | ES | EF | LS | LF | TF | FF |
|---|---|---|---|---|---|---|---|
| A | 10 | 0 | 10 | 0 | 10 | **0** | 0 |
| B | 6 | 0 | 6 | 12 | 18 | 12 | 4 |
| C | 20 | 10 | 30 | 10 | 30 | **0** | 0 |
| D | 26 | 0 | 26 | 18 | 44 | 18 | 18 |
| E | 12 | 10 | 22 | 18 | 30 | 8 | 8 |
| F | 14 | 30 | 44 | 30 | 44 | **0** | 0 |
| G | 12 | 44 | 56 | 44 | 56 | **0** | 0 |
| H | 24 | 10 | 34 | 16 | 40 | 6 | **0** |
| I | 6 | 34 | 40 | 40 | 46 | 6 | 4 |
| J | 10 | 44 | 54 | 46 | 56 | 2 | 2 |
| K | 40 | 0 | 40 | 16 | 56 | 16 | 16 |
| L | 6 | 56 | 62 | 56 | 62 | **0** | 0 |`,
            },
            { md: md`**Critical path**: A → C → F → G → L = 10 + 20 + 14 + 12 + 6 = 62 weeks. Tracker procurement (C) is critical: the design-to-tracker-delivery chain drives the plant.` },
            { md: md`**Reading float**: H (inverter procurement) has TF = 6 but **FF = 0** — any slip immediately delays installation I and eats I's and J's float. B has TF 12 but FF 4: a 5-week slip in grading does not move completion but does delay piling start. K (MEWRE's grid works) has 16 weeks of float — today. That float is shared with every Employer-side approval and outage.` },
          ],
          result: md`Duration 62 weeks; critical path A–C–F–G–L; near-critical J (TF 2). The Employer-side grid path K has 16 weeks of float, which MEWRE should protect, not consume.`,
        },
        {
          kind: "widget",
          widget: "cpm-gantt",
          caption: "Edit durations and watch the critical path move. Try making tracker delivery 23 weeks, or the grid connection 60 weeks.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Module delivery slips 21 weeks",
          given: md`Same network. A module supplier reports that a forced-labour/traceability customs hold and a factory reallocation will push module delivery D from 26 to **47 weeks**.`,
          steps: [
            { md: md`D has TF = 18 weeks, so the first 18 weeks of slip are absorbed; the excess is $21 - 18 = 3$ weeks.` },
            {
              md: md`New EF(D) = 47; G: ES = max(47, 44) = 47, EF = 59; L: ES = max(59, 54, 40) = 59, EF = 65.`,
              hidden: true,
              check: { prompt: "New project duration", answer: 65, unit: "weeks", tolerance: { abs: 0 } },
            },
            {
              md: md`New critical path: D → G → L (47 + 12 + 6 = 65). The old critical path A–C–F now has TF = 3.`,
              hidden: true,
              check: { prompt: "New total float of tracker installation F", answer: 3, unit: "weeks", tolerance: { abs: 0 } },
            },
          ],
          result: md`Completion moves 3 weeks to week 65 and the critical path switches to modules. Mitigation focus changes: partial module deliveries to allow block-by-block installation (convert D→G to an SS-type relationship by block) are worth more than accelerating trackers.`,
        },
        {
          kind: "question",
          question: {
            id: "m08-l03-p1",
            type: "numeric",
            prompt: md`Same baseline network (62 weeks). The MEWRE 400 kV line and bay (K) slip from 40 to **60 weeks** because of a right-of-way issue. By how many weeks is project completion delayed?`,
            answer: 4,
            unit: "weeks",
            tolerance: { abs: 0 },
            explanation: md`K had TF = 16. Slip 20 − 16 = **4 weeks**: L starts at max(56, 54, 60) = 60 and finishes at 66. Crucially this is an **Employer-caused** delay: the contractor is entitled to an extension of time (and probably cost) and, under a PPA, the IPP may be entitled to deemed-energy or other relief. Protecting K's float is a ministry-side priority.`,
            concepts: ["m08.cpm", "m08.float"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "P6 in practice and reviewing an EPC programme",
      blocks: [
        {
          kind: "md",
          md: md`### P6 vocabulary you must own

| P6 concept | What it is | Why you care |
|---|---|---|
| **EPS / WBS** | Enterprise project structure; project WBS nodes | Must match the contract WBS crosswalk |
| **Activity types** | Task dependent, resource dependent, level of effort (LOE), start/finish milestones, WBS summary | LOE and summaries should never drive the critical path |
| **Activity codes** | Tags (area, block, discipline, phase, responsibility, subcontractor) | Let you filter "all MEWRE-responsibility activities" or "Block 07" |
| **Calendars** | Working days/hours per activity | Weekend, public holidays, summer reduced hours, Ramadan hours, night shifts |
| **Baseline** | Frozen copy of the approved schedule (BL1) | PV for EVM; variance; delay analysis. Re-baselining only via change control |
| **Data date** | The "as of" date of an update | Everything left of it is actual, right of it is forecast |
| **Update** | Actual start/finish, remaining duration, % complete | Watch remaining durations that never decrease |
| **Retained logic vs progress override** | How out-of-sequence progress is handled | Progress override can hide logic breaks; ask which is set |
| **Longest path** | P6 view of the driving path to completion | More reliable than "TF ≤ 0" when multiple calendars exist |
| **XER** | P6 native export file | Require native XER with each submission, not just PDF |

### Reviewing a contractor's baseline programme (Sub-Clause 8.3-type submission)

Under FIDIC 2017, the contractor submits an initial programme within 28 days of the Commencement Date (Sub-Clause 8.3) and the Engineer/Employer has a review period to give notice of non-compliance. Use it. A schedule accepted without comment becomes the yardstick for every future extension-of-time claim.

1. **Run the DCMA 14 checks** on the XER (P6 schedule check, or tools such as Acumen Fuse / Schedule Analyzer).
2. **Trace the critical path from the end milestone backwards.** Does it make physical sense (procurement → installation → commissioning), or does it run through a hard constraint or an LOE?
3. **Check procurement chains are complete** for long-lead items: submittal → Employer review (contract review period, e.g., 14–21 days) → resubmission allowance → manufacturing → FAT → shipping → customs clearance → site delivery. Transformers and 400 kV GIS commonly sit at 12–18+ months lead time in tight markets.
4. **Check Employer activities** are modelled with realistic durations: approvals, design reviews, MEWRE grid works, outages, land handover, energisation permits. These are where contractors will claim EOT.
5. **Check calendars**: summer working restrictions, sandstorm allowance, Ramadan, weekends, holidays.
6. **Check float distribution**: a programme with almost everything critical or near-critical is fragile; one with huge float everywhere is missing logic.
7. **Check resource loading** against realistic productivity at 45–50 °C.
8. **Check the commissioning and testing tail**: grid-code compliance tests, performance tests and reliability runs often need MEWRE dispatch windows; they are routinely underestimated.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait calendar inputs to verify before baselining",
          md: md`Not covered in the project research file and must be confirmed from official sources (Public Authority for Manpower decisions, Civil Service Commission announcements): (1) the annual **summer midday outdoor work ban** — commonly reported as roughly 11:00–16:00 from June through August, (2) Ramadan reduced working hours, (3) public holiday dates for the year, (4) the Friday–Saturday weekend for the project calendar. Build them as explicit P6 calendars, not as productivity fudge factors.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Programme tricks to recognise",
          md: md`- **Float sequestration**: preferential logic or inflated durations that consume float so the contractor "owns" it. Check the contract's float-ownership position.
- **Lags as hidden activities**: a 60-day lag between "PO" and "delivery" hides manufacturing.
- **Hard constraint on completion**: the schedule shows zero float because the end date is mandatory, not because the logic achieves it — negative float is being suppressed.
- **Remaining durations frozen** update after update while % complete rises.
- **Out-of-sequence progress** under progress override: module installation "60 % complete" while tracker installation is "40 %".
- **Missing Employer activities**, then an EOT claim for "Employer delays" the programme never showed.`,
        },
        {
          kind: "checklist",
          title: "Schedule review checklist (baseline and monthly)",
          items: [
            "Native XER received with the PDF; data date and baseline identified.",
            "DCMA 14 metrics run and trended month-on-month (especially BEI, CPLI, missed tasks, negative float).",
            "Critical and near-critical (TF < 10 working days) paths traced and physically sensible.",
            "Long-lead procurement chains complete with review periods per contract.",
            "All Employer/MEWRE activities present with owners and realistic durations.",
            "Calendars reflect summer restrictions, Ramadan, weekends and holidays.",
            "No hard constraints; external dates as soft-constrained milestones.",
            "Changes since last update listed (logic, durations, calendars) — a 'schedule change log'.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor's planner",
          items: [
            "Which scheduling option do you use for out-of-sequence progress, and why?",
            "List every logic change since the last update and the reason.",
            "What is the longest path today, and how has it moved over the last three updates?",
            "What productivity did you assume for piling and module installation in July, and on what basis?",
            "Which activities have remaining durations unchanged for two or more updates?",
            "Where in the programme is the Control Centre's SCADA points list, and what happens if it is 6 weeks late?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a finance director why an activity with 6 weeks of total float can still delay other work the moment it slips.",
          keyPoints: [
            "Total float vs free float distinction",
            "Free float zero means successors move immediately",
            "Float is shared along the path",
            "Consuming float upstream removes it downstream",
            "End date may hold while other contractors are disrupted",
          ],
        },
        { kind: "scenario", scenario: "m08-s3" },
      ],
    },
  ],
  quiz: [
    {
      id: "m08-l03-q1",
      type: "numeric",
      prompt: md`Activity X has ES = 14, EF = 22, LS = 19, LF = 27 (weeks). Its only successor has ES = 24. What is X's free float?`,
      answer: 2,
      unit: "weeks",
      tolerance: { abs: 0 },
      explanation: md`TF = LS − ES = 5 weeks. FF = ES(successor) − EF(X) = 24 − 22 = **2 weeks**. X can slip 2 weeks without disturbing its successor, and 5 weeks without delaying completion.`,
      concepts: ["m08.float"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m08-l03-q2",
      type: "numeric",
      prompt: md`Piling: ES 0, duration 16 weeks. Tracker installation: duration 15 weeks, linked SS +5 and FF +3 from piling. What is the early finish of tracker installation?`,
      answer: 20,
      unit: "weeks",
      tolerance: { abs: 0 },
      explanation: md`SS: $ES \ge 0 + 5 = 5$ → EF ≥ 20. FF: $EF \ge 16 + 3 = 19$. Binding: max(20, 19) = **20**. Strict FS would give 31.`,
      concepts: ["m08.lags-constraints", "m08.cpm"],
      difficulty: 2,
    },
    {
      id: "m08-l03-q3",
      type: "multi",
      prompt: "Which findings in a contractor's baseline XER should you raise as non-compliant or high-risk?",
      options: [
        "Mandatory Finish constraint on the completion milestone",
        "12 % of activities have no successor",
        "93 % of relationships are finish-to-start",
        "A 90-day lag between 'transformer PO' and 'transformer on site'",
        "Soft 'Start On or After' constraint on 'MEWRE backfeed available'",
      ],
      answer: [0, 1, 3],
      explanation: md`Hard constraints override logic and mask negative float; 12 % open ends exceeds the 5 % threshold; a 90-day lag hides manufacturing, FAT, shipping and customs. 93 % FS meets the ≥ 90 % guide, and soft constraints on external dates are acceptable practice.`,
      concepts: ["m08.dcma14", "m08.lags-constraints"],
      difficulty: 2,
    },
    {
      id: "m08-l03-q4",
      type: "numeric",
      prompt: md`At data date, 180 activities had baseline finishes on or before the data date; 144 of them are complete. What is the BEI?`,
      answer: 0.8,
      tolerance: { abs: 0.005 },
      explanation: md`BEI = 144 / 180 = **0.80**, well below the 0.95 threshold: the contractor is completing only 80 % of planned work by count. Expect the reported completion date to slip soon even if it has not yet.`,
      concepts: ["m08.dcma14"],
      difficulty: 1,
    },
    {
      id: "m08-l03-q5",
      type: "numeric",
      prompt: md`Remaining critical path length to contract completion is 200 working days; the completion milestone shows total float of −16 working days. What is the CPLI?`,
      answer: 0.92,
      tolerance: { abs: 0.005 },
      explanation: md`CPLI = (200 + (−16)) / 200 = **0.92** < 0.95. The contractor must deliver remaining critical work about 8 % faster than planned. Ask for a credible recovery schedule with resources.`,
      concepts: ["m08.dcma14"],
      difficulty: 2,
    },
    {
      id: "m08-l03-q6",
      type: "order",
      prompt: "Order the procurement chain for a 400 kV power transformer as it should appear in the programme.",
      items: ["Design submittal", "Employer/Engineer review and approval", "Manufacturing", "Factory acceptance test (FAT)", "Sea freight", "Customs clearance in Kuwait", "Delivery and installation on site"],
      explanation: md`Every step consumes time and can slip independently; collapsing them into a lag hides risk. FAT witness and customs clearance are frequent hidden delays.`,
      concepts: ["m08.p6", "m08.dcma14"],
      difficulty: 1,
    },
    {
      id: "m08-l03-q7",
      type: "mcq",
      prompt: "What is the 'data date' in a P6 schedule update?",
      options: ["The contractual completion date", "The date up to which progress is recorded; forecasts start from it", "The date of the baseline", "The date the XER was exported"],
      answer: 1,
      explanation: md`Left of the data date: actuals. Right of it: forecast. Invalid dates (forecast before, actual after the data date) are a DCMA failure.`,
      concepts: ["m08.p6"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "m08-l03-f1", front: "Forward pass rule", back: md`$ES_j = \max(EF_i + \text{lag})$; $EF = ES + D$.` },
    { id: "m08-l03-f2", front: "Backward pass rule", back: md`$LF_i = \min(LS_j - \text{lag})$; $LS = LF - D$.` },
    { id: "m08-l03-f3", front: "Total float", back: "LS − ES (= LF − EF): delay possible without delaying project completion." },
    { id: "m08-l03-f4", front: "Free float", back: "Min ES of successors − EF: delay possible without delaying any successor." },
    { id: "m08-l03-f5", front: "DCMA thresholds: logic, leads, lags, FS share", back: "Missing logic ≤ 5 %; leads 0; lags ≤ 5 %; FS ≥ 90 %." },
    { id: "m08-l03-f6", front: "DCMA high-float and high-duration limit", back: "44 working days (≤ 5 % of incomplete activities)." },
    { id: "m08-l03-f7", front: "CPLI and BEI thresholds", back: "Both ≥ 0.95." },
    { id: "m08-l03-f8", front: "Why avoid hard (mandatory) constraints?", back: "They override logic, falsify float and hide negative float." },
    { id: "m08-l03-f9", front: "What file must accompany every programme submission?", back: "The native P6 XER (not just a PDF)." },
    { id: "m08-l03-f10", front: "FIDIC 2017: initial programme deadline", back: "Within 28 days after the Commencement Date (Sub-Clause 8.3)." },
  ],
  scenarios: [
    {
      id: "m08-s3",
      title: "Tracker deliveries three weeks late",
      dayInLife: true,
      context: md`You are MEWRE's PM on a directly procured 300 MW PV EPC (lump sum). Monday's weekly meeting: the EPC reports that the **tracker supplier's deliveries will be 3 weeks late** (tracker procurement is on the critical path, like activity C in the lesson network). The EPC says "we will recover it" and moves on to the next agenda item.`,
      start: "a",
      concepts: ["m08.cpm", "m08.float", "m08.p6"],
      nodes: {
        a: {
          md: md`What do you do in the meeting?`,
          choices: [
            { text: "Stop and ask: is tracker delivery on the critical path in the current update, what is the forecast impact on completion, what is the recovery plan with resources, and when will the updated XER show it?", next: "b", score: 10, feedback: "You turn 'we will recover' into specific, checkable commitments." },
            { text: "Accept the reassurance and minute 'contractor to recover'.", next: "c", score: 2, feedback: "Minuting a vague promise makes it harder to challenge later." },
            { text: "Announce that delay damages will be applied.", next: "c", score: 3, feedback: "Premature and adversarial: no completion delay has been established yet, and the cause matters." },
          ],
        },
        b: {
          md: md`The updated XER shows completion slipping 3 weeks. The EPC proposes recovery: **partial deliveries** so tracker installation can start on Blocks 1–8 while later batches arrive (changing FS to SS logic by block), plus a second installation crew.`,
          choices: [
            { text: "Ask for the revised logic by block, the delivery batch schedule confirmed by the supplier, crew histograms, and a check that summer working restrictions are in the calendar; review before accepting.", next: "d", score: 10, feedback: "Recovery logic is legitimate only if supply and resources support it." },
            { text: "Accept the recovery schedule immediately to keep the relationship positive.", next: "d", score: 5, feedback: "Positive, but you have accepted untested assumptions that become the new yardstick." },
          ],
        },
        c: {
          md: md`Four weeks later the monthly report shows completion 5 weeks late, and the EPC submits a notice claiming that late approval of the tracker foundation design caused the delay.`,
          choices: [
            { text: "Check your document control records of submission and review dates against the contract review period, and request contemporaneous records; respond within the contractual period.", next: "d", score: 6, feedback: "Recovering: records decide delay disputes. You will need them because the issue was not pinned down earlier." },
            { text: "Reject the notice because they said they would recover.", score: 1, feedback: "A meeting minute does not override a contractual notice. Assess it on records." },
          ],
        },
        d: {
          md: md`The schedule now shows a credible 1-week residual delay. What do you report upward?`,
          choices: [
            { text: "Report in the monthly report: cause, current forecast (1 week late, within tolerance), recovery measures with owners, residual risk and the indicators you will watch (deliveries per week, rows installed per week).", score: 10, feedback: "Honest, quantified, with leading indicators. Leadership is informed, not alarmed." },
            { text: "Report green: the contractor is recovering.", score: 2, feedback: "A forecast 1-week slip on the critical path is not green; RAG honesty is covered in lesson 8." },
          ],
        },
      },
    },
  ],
};

export default lesson;
