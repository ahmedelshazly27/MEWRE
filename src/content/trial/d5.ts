import { md } from "../schema";
import type { Explainer } from "./schema";

/** Day 5 · How a project is delivered and controlled: lifecycle, design, testing, scope, schedule, EVM, risk (Modules 7 and 8). */
export const D5: Explainer[] = [
  {
    id: "x-project-lifecycle",
    day: 5,
    title: "A project's life from idea to handover",
    minutes: 15,
    module: "m07",
    hook: "In your first weeks you will be dropped into projects that are already somewhere in their life: a feasibility study under review, a tender in evaluation, a plant in commissioning. If you know the stages and which gate comes next, you know what decision is on the table and what to ask for.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of building a family house.

- First you decide you **need** one and roughly what you can afford.
- You look at plots and check each one: is it really for sale, can you get a permit, is it on a flood path? (**feasibility**, **site and permits**)
- You pick a builder and sign a contract (**procurement and award**).
- The architect draws, the builder orders windows and steel, then builds (**design, procurement, construction**).
- You test everything before you move in: water, power, air conditioning (**testing and commissioning**).
- You get the keys (**handover**, or **COD** for a power plant), and the builder must fix anything that breaks in the first year (**defects period**).

Before each big payment, the family sits down and decides: go on, wait, or stop. Those meetings are **gates**. Changing your mind costs little while it is still on paper, and a lot once the concrete is poured.

Where the analogy breaks: at MEWRE the "family" is a chain of committees, and the land, the grid connection and the permits often belong to other government bodies, not to you.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

A **stage** is a period of work that produces defined deliverables. A **gate** is a decision point where an accountable person or committee reviews those deliverables and decides one of four things:

- **Go**: release budget and authority for the next stage.
- **Go with conditions**: proceed, but named gaps must close by a date (for example, a geotechnical report still pending).
- **Recycle / hold**: redo or extend the current stage.
- **Stop**: kill the project and record the lessons.`,
      },
      {
        kind: "flow",
        title: "What happens at every gate",
        steps: [
          { label: "Stage work", detail: "Studies, surveys, tender documents" },
          { label: "Deliverables package", detail: "Submitted before the gate" },
          { label: "Gate review", detail: "Against criteria written in advance" },
          { label: "Decision", detail: "Go / go with conditions / recycle / stop" },
          { label: "Next stage funded", detail: "Only on go, or go with conditions" },
        ],
        caption: "The same loop repeats at G0 to G7. Notice that the criteria exist before the review, and that recycle and stop are real outcomes, not failures of the process.",
      },
      {
        kind: "md",
        md: md`Each gate answers a different question. A typical sequence for a PV or battery project:

| Gate | Question | Stage before it typically takes |
|---|---|---|
| G0 Need | Is there a real need we are mandated to meet? | 1 to 3 months |
| G1 Pre-feasibility | Worth studying? Which options survive? | 2 to 4 months |
| G2 Feasibility | Which option, which site, which procurement route, what cost? | 6 to 12 months |
| G3 Investment | Do we commit to tender? | 3 to 6 months |
| G4 Award / financial close | Do we sign? | 6 to 18 months |
| G5 Notice to proceed | Can construction start safely? | 1 to 3 months |
| G6 COD / taking over | Does the plant meet the contract? | 1 to 3 months |
| G7 Close-out | Is everything finished and learned? | end of the defects period |

Along the way:

- **Feasibility** is the real engineering: resource, site, grid connection, technology options, cost, procurement route, business case, risks. A feasibility study that cannot say where the plant connects, at what voltage, and when that substation will be ready, is not finished.
- **Site, permits and EIA**: land allocation, no-objection letters (oil and gas, defence, aviation, utilities), surveys, flood and unexploded-ordnance checks, and the **environmental impact assessment (EIA)** with the Environment Public Authority.
- **Design, procurement, construction** overlap. Long-lead items such as HV transformers are ordered early.
- **Testing and commissioning** end at **COD** (commercial operation date) or **taking over**: the owner takes the plant, delay damages stop, and the **defects notification period (DNP)** starts.
- At the end of the DNP the **Performance Certificate** is issued; only then are the works accepted.`,
      },
      {
        kind: "widget",
        widget: "lifecycle",
        caption: "Click each stage. Notice that the stages before construction add up to as long as building the plant, and that design, manufacturing and construction overlap.",
      },
      {
        kind: "md",
        md: md`The cost estimate gets sharper at each gate. A screening number at G1 can be off by half or double; a budget number at G3 should be within about −20 % to +30 %.`,
      },
      {
        kind: "chart",
        chart: "line",
        title: "How wide the cost range is at each gate (AACE estimate classes, approximate)",
        xKey: "gate",
        yLabel: "% from the final cost",
        series: [
          { key: "high", label: "Upper bound (%)" },
          { key: "low", label: "Lower bound (%)" },
        ],
        data: [
          { gate: "G1 Class 5", high: 100, low: -50 },
          { gate: "G2 Class 4", high: 50, low: -30 },
          { gate: "G3 Class 3", high: 30, low: -20 },
        ],
        caption: "The funnel narrows gate by gate, and the upper bound is always further out than the lower one: early estimates miss on the high side more than the low side.",
      },
      {
        kind: "md",
        md: md`### Why it matters at MEWRE

On a KAPP IPP, MEWRE is the offtaker and the grid owner. Its own deliverables (the 400 kV line and bay, metering, SCADA, approvals) sit on the critical path of somebody else's revenue. The critical path of a GW plant almost always runs through **unique, single items**: HV transformers, the substation, the grid connection and approvals, not the repetitive arrays.

Gates fail when they become ceremonies: "we already spent two years on studies" (sunk cost), an announced target date nobody dares to move, or criteria never written down so every gate passes. Write the criteria **before** the gate.`,
      },
      {
        kind: "callout",
        tone: "kuwait",
        title: "The IPP route in Kuwait (as Track 0 gives it)",
        md: md`Typical PPP sequence for an IPP, supported by the project research file: entity request, KAPP feasibility, Higher Committee, RFQ, RFP, preferred bidder, Higher Committee, Audit Bureau, PPA signing, financial close. The exact EIA steps and review durations with the Environment Public Authority are flagged **unverified** in Track 0: confirm them with the EPA before you plan on them.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Development spend**: about 1 to 3 % of capex across all stages before construction.
- **Estimate classes (AACE, approximate)**: Class 5 screening −50 % / +100 %; Class 4 feasibility −30 % / +50 %; Class 3 budget −20 % / +30 %.
- **Construction** 12 to 20 months, then **testing and commissioning** 2 to 4 months.
- **HV power transformer lead time**: 18 to 24+ months, often the longest item.
- **DNP**: commonly 12 to 24 months (FIDIC default 365 days); Performance Certificate within 28 days after it ends.`,
      },
    ],
    say: [
      "Which gate are we at, and what are the written criteria for passing it?",
      "Is this cost a Class 5 screening number or a Class 3 budget number? What is the range?",
      "Where exactly does this plant connect, at what voltage, and when will that substation be ready?",
      "Have the HV transformers been ordered or factory slots reserved?",
      "When does the defects period end for each section, and who is running the inspections before then?",
    ],
    trap: "Treating a gate as a formality and COD as the finish line. A gate only works with written criteria and someone allowed to say recycle or stop; money already spent is irrelevant to whether the next stage should be funded. And after COD the defects period is the owner's most valuable year: the contractor still has retention and performance security at risk, so that is when you inspect and notify defects.",
    check: [
      {
        id: "x-project-lifecycle-c1",
        type: "mcq",
        prompt: md`At the pre-feasibility gate a consultant presents a cost of USD 600 m (an AACE Class 5 estimate). How should you treat it?`,
        options: [
          "As a screening figure that could be roughly half to double the final cost, not a budget",
          "As the budget to request from the Ministry of Finance",
          "As accurate to within ±5 %, since it comes from a consultant",
          "As the contract price bidders will offer",
        ],
        answer: 0,
        explanation: md`Class 5 estimates are roughly −50 % / +100 %. Presenting one as a budget creates a future overrun. The range narrows at each gate (Class 3 at investment decision is about −20 % / +30 %).`,
        concepts: ["m07.stage-gate", "m07.feasibility-study"],
        difficulty: 1,
      },
      {
        id: "x-project-lifecycle-c2",
        type: "decision",
        prompt: md`You chair a feasibility gate. The study, business case and grid statement are complete. Only the final geotechnical report is pending, due in 6 weeks, and the desk study shows no fatal flaw. What decision do you recommend?`,
        options: [
          { text: "Go with conditions: proceed, with the geotechnical report and any design consequences to close by a named date.", score: 1, feedback: "Right: a minor, dated gap is exactly what 'go with conditions' is for." },
          { text: "Recycle the whole feasibility stage.", score: 0.3, feedback: "Too heavy for one pending report with no fatal flaw; it wastes months." },
          { text: "Go with no conditions; the report is a formality.", score: 0.2, feedback: "Unrecorded gaps tend to stay open. Make the condition explicit and dated." },
          { text: "Stop the project.", score: 0, feedback: "Nothing in the evidence suggests the project is not needed, affordable or deliverable." },
        ],
        explanation: md`Gate decisions are go, go with conditions, recycle or stop. Track 0 gives "geotech pending" as the classic trigger for go with conditions.`,
        concepts: ["m07.gate-review"],
        difficulty: 2,
      },
      {
        id: "x-project-lifecycle-c3",
        type: "mcq",
        prompt: md`What happens at taking over (COD)?`,
        options: [
          "The owner takes care of the plant, delay damages stop accruing and the defects notification period starts",
          "All retention is released and the contractor's obligations end",
          "The Performance Certificate is issued, which accepts the works",
          "The design basis is frozen",
        ],
        answer: 0,
        explanation: md`Taking over transfers care and risk, stops delay damages and starts the DNP. Typically only the first half of retention is released. The Performance Certificate comes after the DNP.`,
        concepts: ["m07.taking-over", "m07.dnp"],
        difficulty: 1,
      },
    ],
    deeper: ["m07-l01", "m07-l02", "m07-l06"],
  },
  {
    id: "x-design-owners-engineer",
    day: 5,
    title: "Design stages and the owner's engineer",
    minutes: 12,
    module: "m07",
    hook: "Hundreds of design documents will land on MEWRE for review, each with a contractual deadline, and an owner's engineer will advise you on them. You need to know which stage freezes what, what a review code means, and which decisions stay with you.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

You are renovating a kitchen.

- **Concept**: open kitchen with an island, electric cooking, about 20 m². This fixes the size and the type.
- **Basic design**: the kitchen designer's plan with dimensions, appliance specifications and where water and power come in. Once you sign it, it is the **design basis**: changing it later costs money.
- **Detailed design**: the fitter's shop drawings, down to each cabinet hinge.

A friend who is an architect checks the fitter's drawings against what you asked for and tells you what is wrong. That friend is the **owner's engineer**: he advises, you decide and you pay.

Where the analogy breaks: under a design-build contract the contractor stays responsible for its design even after your friend has checked it.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**Three design stages:**

| Stage | Answers | Freezes | Usually done by |
|---|---|---|---|
| **Concept** | What plant? | Capacity (MWac/MWp, MW/MWh), technology, connection voltage | Feasibility consultant, or the bidder's proposal |
| **Basic design / FEED** | What exactly, to which requirements? | The **design basis**: site conditions, standards, equipment ratings, block size, protection philosophy | Employer's consultant (EPC tender) or the developer's engineer (IPP) |
| **Detailed design** | How is it built? | Construction drawings, cable schedules, settings | The EPC contractor |

Two ideas matter most:

1. **The design basis is the technical spine of the contract.** Design temperature, soiling, wind, standards, grid code version: once frozen, a change is a **variation** (paid extra).
2. **Late changes cost in proportion to what is built on them.** A new inverter model after the cable schedule and SCADA lists are done ripples through dozens of documents.

**Design review.** Each submittal (drawing, calculation, study) is logged in the document system (e.g. Aconex) and returned with a code:

- **A**: approved / no objection. Proceed.
- **B**: approved with comments. Proceed, incorporate the comments, resubmit.
- **C**: rejected. Do not proceed on this item; revise and resubmit.
- **D**: for information only.

Comments go in a **comment-response sheet**. The reviewer checks **compliance with the Employer's Requirements, standards and good practice**, not "how I would have designed it". Under FIDIC 2017 Yellow the review period is stated in the contract (21 days by default); miss it and the document may be **deemed** to have no objection.`,
      },
      {
        kind: "flow",
        title: "From concept to issued-for-construction",
        steps: [
          { label: "Concept", detail: "Capacity, technology, connection voltage" },
          { label: "Basic design / FEED", detail: "Design basis frozen" },
          { label: "Employer's Requirements in the tender", detail: "What bidders price and what 'complete' means" },
          { label: "Detailed design by the EPC", detail: "1,500 to 3,000 deliverables for 1 GW" },
          { label: "Submittal in the EDMS", detail: "Number, revision, due date" },
          { label: "OE review within the contract period", detail: "Comments against the requirements" },
          { label: "Code A / B / C", detail: "Issued by the Employer side" },
          { label: "Issued for construction", detail: "Only after A or B" },
        ],
        caption: "The OE sits in one box of this chain. The design basis and the Employer's Requirements, decided much earlier, set what every later review checks against.",
      },
      {
        kind: "md",
        md: md`### The owner's engineer and what you still own

The **owner's engineer (OE)** is a consultancy that works for MEWRE (it is not neutral). It is your technical eyes:

- reviews design submittals and grid studies, and drafts the comments;
- witnesses factory tests, site tests and the PR/capacity tests, and recalculates the raw data;
- reports on progress and quality, and recommends accept, comment or reject;
- on an IPP, checks the design for compliance with the **PPA technical requirements and the grid interface**, without approving the developer's design.

Do not confuse it with **the Engineer** (a role named in a FIDIC Red or Yellow contract, which issues certificates and must act neutrally when it makes determinations) or with the **lenders' technical advisor** (works for the banks on a project-financed IPP).

| | Owner's engineer (OE) | The Engineer (FIDIC Red / Yellow) | Lenders' technical advisor |
|---|---|---|---|
| Works for | MEWRE | Named in the contract by the Employer | The banks |
| Neutral? | No, on MEWRE's side | Must act neutrally when making determinations | No, on the lenders' side |
| Typical job | Reviews, witnesses tests, recommends | Issues certificates, makes determinations | Checks the project is bankable and on track |
| Where you meet it | EPC and IPP projects | Red and Yellow Book contracts | Project-financed IPPs |

*Three advisers with similar titles: ask first who pays them and whether they must be neutral.*

What the **MEWRE PM still owns**: the decision and the signature; the contract deadlines (review periods); priorities (design basis, SLDs, grid studies and protection first); MEWRE's own interfaces (grid, control centre, approvals); the budget and the escalation. The OE advises, you decide.

| Task | EPC contractor | Owner's engineer | MEWRE PM |
|---|---|---|---|
| Prepare the design, keep design responsibility | **Does and owns** | | |
| Review submittals, draft comments | | **Does** | Checks the wording |
| Issue the review code (A / B / C) | | Recommends | **Decides and signs** |
| Meet the contract review period | | Delivers on time | **Accountable** |
| Witness tests, recalculate raw data | Runs the test | **Does** | Accepts or rejects |
| Set review priorities (design basis, SLDs, grid, protection) | | Advises | **Decides** |
| MEWRE interfaces, budget, escalation | | | **Owns** |

*Read the MEWRE PM column: every row where a decision or a deadline sits ends with you, not the OE.*`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Review period**: 21 days by default under FIDIC 2017 Yellow, unless the contract states otherwise.
- **Design deliverables** for a 1 GW PV + battery project: roughly 1,500 to 3,000.
- **Review codes**: A, B, C (and D for information).
- **Design temperature**: Kuwait's record is 53.9 °C (Mitribah, 2016, WMO-recognised, as cited in Track 0), so check equipment ratings at 50 °C and above with the maker's derating data.`,
      },
    ],
    say: [
      "Has the design basis been approved, including the ambient design temperature and the grid code version?",
      "Which submittals are overdue for our review, and are any close to a deemed no-objection?",
      "Is this comment a non-compliance with the Employer's Requirements or a preference? If it changes the requirement, it is a variation.",
      "Show me the inverter reactive capability and the transformer rating at 50 °C.",
      "What is the OE's recommendation, and what is the risk if we accept as is?",
    ],
    trap: "Thinking a Code A makes MEWRE responsible for the design, or that the OE is the decision-maker. Under design-build contracts the contractor keeps design responsibility after review, and the OE advises while the MEWRE PM decides and answers for the deadlines. A solution written into a comment (\"change the cable to 400 mm²\") can become a variation: state the non-compliance and let the contractor choose the fix.",
    check: [
      {
        id: "x-design-owners-engineer-c1",
        type: "mcq",
        prompt: md`Which design stage freezes the **design basis** (site conditions, standards, equipment ratings)?`,
        options: ["Basic design / FEED", "Concept", "Detailed design", "As-built"],
        answer: 0,
        explanation: md`Concept fixes the plant's size and technology; basic design / FEED freezes the design basis that the EPC then details. Changes after the freeze become variations.`,
        concepts: ["m07.design-stages"],
        difficulty: 1,
      },
      {
        id: "x-design-owners-engineer-c2",
        type: "mcq",
        prompt: md`A cable schedule comes back from review with **Code B**. What does the contractor do?`,
        options: [
          "Proceed, incorporating the comments, and resubmit the next revision",
          "Stop work on that item until a new revision is approved",
          "Proceed, ignoring the comments",
          "Treat it as for information only",
        ],
        answer: 0,
        explanation: md`Code B is approved with comments: work may proceed, but the comments must be incorporated and the next revision resubmitted. Code C means do not proceed.`,
        concepts: ["m07.design-review"],
        difficulty: 1,
      },
      {
        id: "x-design-owners-engineer-c3",
        type: "decision",
        prompt: md`The OE's draft comment on the EPC's cable schedule reads: "Change feeder 3 to 400 mm² copper." What do you do before it goes out?`,
        options: [
          { text: "Ask the OE to rewrite it as a non-compliance: which requirement is not met (e.g. derated rating below the load at site conditions), and ask the contractor to revise.", score: 1, feedback: "Right: comment on the non-compliance and let the contractor choose the fix; design responsibility stays with the contractor." },
          { text: "Send it as written; the OE knows best.", score: 0.3, feedback: "The finding may be right, but a dictated solution can be treated as an instruction and become a variation." },
          { text: "Delete the comment to avoid a variation claim.", score: 0, feedback: "Then a possibly undersized cable proceeds to construction." },
        ],
        explanation: md`Reviewers check compliance, they do not redesign. The OE advises; the Employer side issues the review, so the PM checks how comments are worded.`,
        concepts: ["m07.design-review", "m07.owners-engineer"],
        difficulty: 2,
      },
    ],
    deeper: ["m07-l03"],
  },
  {
    id: "x-testing-commissioning-cod",
    day: 5,
    title: "Testing, commissioning and COD",
    minutes: 15,
    module: "m07",
    hook: "COD is when MEWRE starts paying for energy (on an IPP) or takes over the plant (on an EPC), and the tests before it decide millions in payments and damages. You will witness these tests and be asked whether the plant is ready to sign off.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

You buy a new car.

- The factory checks it before it leaves (**factory acceptance test, FAT**).
- The dealer inspects it on arrival for transport damage (**site acceptance test, SAT**).
- With the engine off, you check oil, tyres, lights and wiring (**cold commissioning**).
- You start the engine and check every system works (**hot commissioning**).
- You drive a fixed route and compare fuel use with the brochure, corrected for weather and load (**performance test**).
- You drive it for a week without a breakdown (**reliability run**).
- You sign the handover papers and take the keys (**COD / taking over**). A short list of small faults is fixed later (**punch list**), and the warranty year starts (**defects period**).

Where the analogy breaks: a power plant's "road test" result depends heavily on the weather and on the measurement rules, so the rules must be agreed **before** the test, not after.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**The testing chain**, in order:

- **FAT** at the factory: transformers, inverters, battery containers and switchgear meet spec before shipment.
- **Receipt inspection / SAT** on site: no transport damage, equipment works as installed.
- **Mechanical completion**: built per drawings, ready to test.
- **Cold (pre-)commissioning**, de-energised: insulation resistance, polarity, string open-circuit voltage and short-circuit current, earthing, cable tests, relay injection, SCADA point checks.
- **Energisation** under a switching programme and **permit to work**. From now on the site is a live electrical installation.
- **Hot commissioning**, energised: inverters, trackers, plant controller, SCADA and battery run correctly.
- **Grid compliance tests** at the connection point, witnessed by MEWRE's transmission and control centre: power setpoints, ramps, frequency response, reactive power and voltage control.
- **Performance tests**: **PR test** (performance ratio over days), **capacity test** (short regression test), battery capacity and efficiency.
- **Reliability run**: continuous operation without contractor-caused trips.
- **COD / taking over**.`,
      },
      {
        kind: "flow",
        title: "From factory to taking over",
        steps: [
          { label: "FAT", detail: "At the factory" },
          { label: "SAT / receipt", detail: "Transport damage, as installed" },
          { label: "Mechanical completion", detail: "Built per drawings" },
          { label: "Cold commissioning", detail: "De-energised checks" },
          { label: "Energisation", detail: "Switching programme, permit to work" },
          { label: "Hot commissioning", detail: "Systems running" },
          { label: "Grid compliance tests", detail: "Witnessed by MEWRE" },
          { label: "PR, capacity, battery tests", detail: "Against the guarantees" },
          { label: "Reliability run", detail: "No contractor-caused trips" },
          { label: "COD / taking over", detail: "Category A punch items closed" },
        ],
        caption: "Each step must pass before the next one starts. MEWRE is directly involved at energisation and the grid tests, and the owner's engineer witnesses the rest.",
      },
      {
        kind: "md",
        md: md`**The performance ratio** compares what the plant produced with what its size and the sunlight say it should:

$$PR = \dfrac{E / P_0}{H / G_{STC}}$$

$E$ is energy delivered, $P_0$ the plant's rated DC power, $H$ the sunlight received on the modules and $G_{STC} = 1$ kW/m². Example: a 100 MWp plant receives 70 kWh/m² over a 10-day test and delivers 5,600 MWh. Final yield $5{,}600/100 = 56$ kWh/kWp; reference yield 70 h; $PR = 56/70 = 0.80$.`,
      },
      {
        kind: "chart",
        chart: "stacked-bar",
        title: "The PR example as one bar (100 MWp plant, 10-day test)",
        xKey: "test",
        yLabel: "kWh per kWp",
        series: [
          { key: "delivered", label: "Delivered: final yield (56)" },
          { key: "lost", label: "Lost: heat, dust, cables, inverters (14)" },
        ],
        data: [{ test: "Reference yield 70 h", delivered: 56, lost: 14 }],
        caption: "The full bar is what the sunlight says a perfect plant would give; PR is the delivered share, 56 / 70 = 0.80.",
      },
      {
        kind: "md",
        md: md`Modules lose about 0.3 to 0.4 % of power per °C of cell temperature, so the PR is **temperature-corrected** to a **reference temperature**. That choice moves the number: corrected to 25 °C, a good plant shows about 0.85 to 0.88; corrected to the annual average cell temperature (around 42 to 47 °C in Kuwait), the same plant shows about 0.80 to 0.83.`,
      },
      {
        kind: "chart",
        chart: "bar",
        title: "Same good plant, two reference temperatures",
        xKey: "basis",
        yLabel: "PR",
        series: [
          { key: "low", label: "Low end of typical range" },
          { key: "high", label: "High end of typical range" },
        ],
        data: [
          { basis: "Corrected to 25 °C", low: 0.85, high: 0.88 },
          { basis: "Corrected to annual average cell temp. (42 to 47 °C)", low: 0.8, high: 0.83 },
        ],
        caption: "Nothing about the plant changed between the two pairs of bars, only the reference temperature. A guarantee and a test on different bases differ by about 0.05.",
      },
      {
        kind: "md",
        md: md`**COD typically requires**: all tests passed (or damages paid where the contract allows), MEWRE's grid approval, all **Category A** punch items closed (safety, reliability, performance, legal compliance), provisional O&M manuals and as-builts, spares, training, permits and insurance. **Category B** items (minor, cosmetic, documentation) close during the defects period, often against a retained amount. With the **Taking-Over Certificate** (FIDIC 2017 Clause 10.1), care and risk pass to the owner, delay damages stop and the defects period starts.

| | Category A punch item | Category B punch item |
|---|---|---|
| What it is | Safety, reliability, performance, legal compliance | Minor, cosmetic, documentation |
| Example | A faulty protection relay | A missing label, an as-built drawing to update |
| Must close | **Before COD** | During the defects period |
| Leverage | COD is withheld | A retained amount is held until it closes |

| At the Taking-Over Certificate | Before | After |
|---|---|---|
| Care and risk of the plant | Contractor | Owner (MEWRE or the project company) |
| Delay damages | Accruing | Stop |
| Defects notification period | Not started | Starts |

*The first table decides whether you may sign; the second shows what your signature switches over.*`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **PR test duration**: typically 7 to 15 consecutive days (10 is common); minimum valid data often 95 % of intervals.
- **PR values**: about 0.85 to 0.88 corrected to 25 °C; about 0.80 to 0.83 corrected to the annual average cell temperature. Always ask which.
- **Temperature effect**: module power falls about 0.3 to 0.4 % per °C.
- **Capacity test pass mark**: measured at least about 97 % of the guaranteed value at reporting conditions.
- **Reliability run**: e.g. 7 to 30 continuous days for the plant, 72 hours for subsystems.`,
      },
    ],
    say: [
      "Is the test procedure, with data filters, reference temperature, soiling and curtailment rules, approved before the test starts?",
      "Which reference temperature is the PR guarantee based on, and does the test use the same one?",
      "When were the reference sensors calibrated, and are they cleaned daily during the test?",
      "Has the control centre witnessed and accepted the grid compliance tests?",
      "Which open punch items are Category A, and has each been closed and verified?",
    ],
    trap: "Quoting a PR without its reference temperature. The same plant can show 0.88 corrected to 25 °C and 0.82 corrected to the annual average cell temperature; a guarantee from one basis tested on the other is a gift to one side. Also, commissioned is not taken over: COD needs every test, MEWRE's grid approval and all Category A items closed.",
    check: [
      {
        id: "x-testing-commissioning-cod-c1",
        type: "numeric",
        prompt: md`A 50 MWp plant receives 65 kWh/m² on the modules during a 10-day test and delivers 2,665 MWh. What is its PR, in percent?`,
        answer: 82,
        tolerance: { abs: 0.5 },
        unit: "%",
        explanation: md`Final yield $= 2{,}665/50 = 53.3$ kWh/kWp. Reference yield $= 65/1 = 65$ h. $PR = 53.3/65 = 0.82$, i.e. 82 %.`,
        concepts: ["m07.pr-test"],
        difficulty: 1,
      },
      {
        id: "x-testing-commissioning-cod-c2",
        type: "mcq",
        prompt: md`Insulation resistance tests, string open-circuit voltage checks and relay secondary injection belong to which stage?`,
        options: ["Cold (pre-)commissioning, de-energised", "Factory acceptance test", "Hot commissioning", "Reliability run"],
        answer: 0,
        explanation: md`These checks are done before energisation, on de-energised equipment. Hot commissioning follows energisation and checks systems running.`,
        concepts: ["m07.commissioning-sequence"],
        difficulty: 1,
      },
      {
        id: "x-testing-commissioning-cod-c3",
        type: "decision",
        prompt: md`The EPC asks you to sign COD. PR and capacity tests passed and the reliability run is done, but a faulty protection relay at one MV block is still open and MEWRE's grid test acceptance letter has not been issued. What do you do?`,
        options: [
          { text: "Do not recommend COD yet: write back listing the two open conditions (a Category A item and the grid approval), with what is needed to close each.", score: 1, feedback: "Right: a protection fault is a safety item (Category A) and MEWRE's grid approval is a COD condition." },
          { text: "Sign COD and move the relay to the Category B list.", score: 0, feedback: "A protection fault affects safety; it cannot be relabelled as minor to pass COD." },
          { text: "Sign COD now and ask the control centre to send its letter later.", score: 0.2, feedback: "Grid approval is a condition of COD, not paperwork to follow." },
        ],
        explanation: md`COD needs all tests passed, the grid operator's approval and all Category A punch items closed. Category B items can close during the defects period.`,
        concepts: ["m07.cod-criteria", "m07.taking-over"],
        difficulty: 2,
      },
    ],
    deeper: ["m07-l05", "m07-l06"],
  },
  {
    id: "x-scope-wbs",
    day: 5,
    title: "Scope and the WBS: deciding what is in the project",
    minutes: 12,
    module: "m08",
    hook: "Most variations and disputes start with scope nobody wrote down or two parties who each thought the other was doing it. The WBS is the map the schedule, budget and progress reports all hang from, and at MEWRE you are accountable for the ministry's own part of it.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

You are organising a large family wedding.

- **Scope statement**: 300 guests, one evening, hall, dinner, music. The honeymoon is **not** in it.
- **Work breakdown structure (WBS)**: split the event into deliverables: venue, catering, invitations, music, photography, transport. Each gets an owner and a budget.
- **100 % rule**: every deliverable is on the list once, nothing missing, nothing counted twice.
- **Scope creep**: an aunt asks for a second dessert, a cousin for a live band, each "only a little". Together they blow the budget.
- **Interface**: the caterer needs power in the hall kitchen by 4 pm. Is that the hall's job or the caterer's? If nobody wrote it down, nobody does it.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**Scope** is what will exist at the end and what it will do. **Product scope** is the plant and its performance (e.g. 1,000 MWac PV, a battery of so many MW and MWh, grid-code compliance). **Project scope** is the work to deliver it (design, procure, build, test, train, document). Under design-build contracts the scope is written in the **Employer's Requirements**: purpose, performance and constraints, not the design.

The **scope boundary** (or **battery limits**) says exactly where one party's scope ends: at the 400 kV gantry, at the metering point.

A **WBS** breaks the total scope into deliverables:

1. **Deliverables, not activities.** Elements are nouns ("PV Block 07", "400 kV substation"); verbs ("install", "test") live in the schedule beneath them.
2. **100 % rule.** Each level sums exactly to its parent. Missing scope becomes a variation; extra scope is waste.
3. **No overlaps.** Work in two elements is double-counted in cost and progress.
4. **Down to work packages**, the level where cost and time are planned, measured and owned: typically 1 to 4 % of total value, or one physical block.
5. **Coded** (e.g. 1.5.2) so schedule activities, cost accounts, documents and earned value all roll up the same way.

A typical Level 2 for a PV + battery EPC: engineering; PV field (split into blocks of about 25 MWac); battery; MV collection; 400 kV substation; plant control and SCADA; infrastructure; testing and commissioning; project management and documentation. Splitting the field by **physical block** keeps progress honest: a block is energised or it is not.

| Code | Level | WBS element (a deliverable, a noun) |
|---|---|---|
| 1 | 1 | 1,000 MWac PV + battery EPC |
| 1.1 | 2 | Engineering |
| 1.2 | 2 | PV field |
| 1.2.01 | 3 | PV Block 01 (about 25 MWac): a work package |
| 1.2.02 | 3 | PV Block 02 |
| ... | 3 | ... up to PV Block 40 |
| 1.3 | 2 | Battery |
| 1.4 | 2 | MV collection |
| 1.5 | 2 | 400 kV substation |
| 1.6 | 2 | Plant control and SCADA |
| 1.7 | 2 | Infrastructure |
| 1.8 | 2 | Testing and commissioning |
| 1.9 | 2 | Project management and documentation |

*Read it as a tree: each code's children sum to it (40 blocks of about 25 MWac make the 1,000 MWac field), and no verb appears anywhere.*`,
      },
      {
        kind: "chart",
        chart: "bar",
        title: "Budget by WBS element, illustrative 500 MWac PV EPC (BAC USD 280 m)",
        xKey: "element",
        yLabel: "USD m",
        series: [{ key: "bac", label: "Budget (USD m)" }],
        data: [
          { element: "Design", bac: 8.4 },
          { element: "Modules", bac: 98 },
          { element: "Trackers", bac: 42 },
          { element: "Inverters / MV", bac: 28 },
          { element: "Civil & piling", bac: 22.4 },
          { element: "Mechanical", bac: 28 },
          { element: "Electrical", bac: 25.2 },
          { element: "400 kV substation", bac: 19.6 },
          { element: "Commissioning", bac: 8.4 },
        ],
        caption: "Module and tracker supply are half the money (USD 140 m of 280 m), yet small elements like the substation and commissioning often decide the end date.",
      },
      {
        kind: "md",
        md: md`Each work package gets a **WBS dictionary** entry: scope, deliverables, boundary, **exclusions**, acceptance criteria, responsible party, interfaces, budget.`,
      },
      {
        kind: "flow",
        title: "How scope becomes something you can control",
        steps: [
          { label: "Scope statement / Employer's Requirements", detail: "What is in, what is out, battery limits" },
          { label: "WBS Level 2 to 3", detail: "Deliverables, coded" },
          { label: "Work packages", detail: "About 1 to 4 % of value each" },
          { label: "WBS dictionary", detail: "Boundary, exclusions, owner, interfaces" },
          { label: "Schedule, budget, earned value, risks", detail: "All roll up on the same codes" },
        ],
        caption: "Every control tool hangs from the WBS. If the contractor's WBS and yours do not reconcile at Level 2 to 3, you cannot check their progress claims.",
      },
      {
        kind: "md",
        md: md`On a KAPP IPP there are **three WBSs**: MEWRE's (400 kV line and bay, telecom and SCADA, metering, land and permits, test witnessing, PPA oversight), the project company's, and the EPC's. They must reconcile at the interfaces.

**Scope creep** is growth through informal requests; **gold-plating** is extras the team adds unasked. Both bypass change control.`,
      },
      {
        kind: "chart",
        chart: "line",
        title: "Scope creep adds up: informal requests against the change allowance (KWD m, Track 0 example)",
        xKey: "request",
        xLabel: "Informal requests (small ones first)",
        yLabel: "KWD m",
        series: [
          { key: "total", label: "Cumulative cost of requests" },
          { key: "allowance", label: "Change allowance (0.80)" },
        ],
        data: [
          { request: "1", total: 0.048, allowance: 0.8 },
          { request: "2", total: 0.096, allowance: 0.8 },
          { request: "3", total: 0.144, allowance: 0.8 },
          { request: "4", total: 0.192, allowance: 0.8 },
          { request: "5", total: 0.24, allowance: 0.8 },
          { request: "6", total: 0.288, allowance: 0.8 },
          { request: "7", total: 0.336, allowance: 0.8 },
          { request: "8", total: 0.384, allowance: 0.8 },
          { request: "9", total: 0.432, allowance: 0.8 },
          { request: "10 (feeder bay)", total: 0.782, allowance: 0.8 },
          { request: "11 (weather station)", total: 1.002, allowance: 0.8 },
        ],
        caption: "Nine requests of KWD 48 k each barely move the line; two larger ones push the total to about KWD 1.0 m, 125 % of the allowance, and none was assessed for time.",
      },
      {
        kind: "md",
        md: md`**Interfaces** are points where one party's work depends on another's: physical (a cable termination), functional (protection signals, SCADA points), contractual (who gives what by when), organisational (approvals, outages). They are tracked in an **interface register** (parties, need date, give date, owner, status) and agreed in a signed **interface control document (ICD)**.

| Type | Example on a KAPP IPP | Gives | Needs it to |
|---|---|---|---|
| Physical | 400 kV line and bay ready at the gantry | MEWRE | EPC: terminate and energise |
| Functional | SCADA points list, protection signals | MEWRE control centre | EPC: configure the plant controller and relays |
| Contractual | Notice of grid compliance tests | EPC | MEWRE: book witnesses and dispatch windows |
| Organisational | Outage window for the tie-in | MEWRE | EPC: connect to the live network |

*Illustrative rows. In the real register each row also carries a need date, a give date, one owner and a status; MEWRE is the giver in most of them.*`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Work package size**: typically 1 to 4 % of total value, or one physical block.
- **PV block**: about 25 MWac each in a GW-scale WBS.
- **100 % rule**: children sum exactly to the parent, in scope as well as in money.
- **Scope creep adds up**: nine small requests at about KWD 48 k each plus two at KWD 0.35 m and 0.22 m make about KWD 1.0 m, 125 % of a KWD 0.80 m change allowance (Track 0 example).`,
      },
    ],
    say: [
      "Where exactly is the battery limit: the 400 kV gantry or the metering point? Which drawing shows it?",
      "Does your WBS reconcile with ours at Level 2 and 3, so we can compare progress?",
      "Is this request in the Employer's Requirements? If not, it goes through change control with a cost and time assessment.",
      "Who owns this interface, what are the need and give dates, and is the ICD signed?",
      "What does the WBS dictionary entry exclude?",
    ],
    trap: "Thinking the WBS is a task list, or that it is right because the numbers add up. A WBS lists deliverables; activities live in the schedule. The 100 % rule is a scope test first: walk the physical path from the plant's gantry to the grid and look for work nobody owns, such as protection coordination or outage planning, which arithmetic will never reveal.",
    check: [
      {
        id: "x-scope-wbs-c1",
        type: "numeric",
        prompt: md`Six months into a contract, ministry departments have informally asked for nine small extras at about KWD 48 k each, plus a spare feeder bay (KWD 0.35 m) and an extra weather station (KWD 0.22 m). What is the total, in KWD m?`,
        answer: 1.002,
        tolerance: { abs: 0.005 },
        unit: "KWD m",
        explanation: md`$9 \times 0.048 = 0.432$; $0.432 + 0.35 + 0.22 = 1.002$ m. Against a KWD 0.80 m change allowance that is 125 %, and none was assessed for time. Route each through change control.`,
        concepts: ["m08.scope-creep"],
        difficulty: 1,
      },
      {
        id: "x-scope-wbs-c2",
        type: "mcq",
        prompt: md`Which of these is a correctly written WBS element?`,
        options: ["PV Block 07", "Install modules", "Week 12 work", "Contractor's tasks"],
        answer: 0,
        explanation: md`WBS elements are deliverables (nouns). "Install modules" is an activity that belongs in the schedule under the block it delivers.`,
        concepts: ["m08.wbs"],
        difficulty: 1,
      },
      {
        id: "x-scope-wbs-c3",
        type: "mcq",
        prompt: md`Your Level-2 WBS for the ministry's grid connection sums exactly to the KWD 62.0 m budget. What does the 100 % rule still require you to check?`,
        options: [
          "That no deliverable is missing or counted twice, e.g. that interface work such as protection coordination has an owner",
          "Nothing: if the numbers sum, the rule is met",
          "That every element is the same size",
          "That the WBS is ordered by date",
        ],
        answer: 0,
        explanation: md`The 100 % rule is about scope first, cost second. Interface work between parties is where orphan deliverables hide.`,
        concepts: ["m08.hundred-percent-rule", "m08.interface-management"],
        difficulty: 2,
      },
    ],
    deeper: ["m08-l02", "m08-l06"],
  },
  {
    id: "x-schedule-critical-path",
    day: 5,
    title: "The schedule and the critical path",
    minutes: 15,
    module: "m08",
    hook: "Every month a contractor will hand you a programme and tell you the project is on track. If you can find the critical path, read float and spot the usual tricks, you will know whether to believe it, and you will see early when MEWRE's own work is about to delay somebody else.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

You are cooking dinner for guests arriving at 8 pm.

- Marinate the meat (2 hours), then grill it (25 minutes).
- Cook rice (40 minutes).
- Make a salad (10 minutes).

The meat chain is the longest: 2 h 25 min. It sets the earliest time dinner can be ready. That is the **critical path**. If the marinade starts 15 minutes late, dinner is 15 minutes late. The salad has lots of spare time (**float**): it can start late without anyone noticing. But if you also start the rice late, at some point the rice becomes the longest chain and it is now critical.`,
      },
      {
        kind: "chart",
        chart: "stacked-bar",
        title: "Dinner at 8 pm: each chain's work and its spare time (minutes)",
        xKey: "chain",
        yLabel: "minutes",
        series: [
          { key: "work", label: "Work" },
          { key: "float", label: "Float (spare time)" },
        ],
        data: [
          { chain: "Meat: marinate + grill", work: 145, float: 0 },
          { chain: "Rice", work: 40, float: 105 },
          { chain: "Salad", work: 10, float: 135 },
        ],
        caption: "Every bar is 145 minutes tall because every chain must be ready by the same moment. The meat has no spare time: it is the critical path.",
      },
      {
        kind: "md",
        md: md`### What is actually happening

A schedule is a network:

- **Activities**: a piece of work with a duration ("Piling Block 07, 12 weeks").
- **Dependencies** (logic): mostly **finish-to-start** (B starts when A finishes); also start-to-start and finish-to-finish, sometimes with a **lag** (a waiting time, e.g. concrete curing).
- **Forward pass**: earliest start and finish of every activity. **Backward pass** from the end date: latest start and finish.
- **Total float** = latest start − earliest start: how far an activity can slip without moving completion.
- **Critical path**: the longest chain through the network; its activities have zero (or the least) float. **Near-critical**: little float, e.g. under 10 working days.

Float belongs to the **path**, not the activity: use it upstream and everything downstream on that path loses it. If an activity slips by more than its float, completion moves by the difference.`,
      },
      {
        kind: "chart",
        chart: "line",
        title: "An activity with 10 weeks of total float: how its slip moves completion",
        xKey: "slip",
        xLabel: "Slip of the activity (weeks)",
        yLabel: "Completion delay (weeks)",
        series: [{ key: "delay", label: "Completion delay (weeks)" }],
        data: [
          { slip: "0", delay: 0 },
          { slip: "2", delay: 0 },
          { slip: "4", delay: 0 },
          { slip: "6", delay: 0 },
          { slip: "8", delay: 0 },
          { slip: "10", delay: 0 },
          { slip: "12", delay: 2 },
          { slip: "14", delay: 4 },
          { slip: "16", delay: 6 },
          { slip: "18", delay: 8 },
          { slip: "20", delay: 10 },
        ],
        caption: "Flat while the float absorbs the slip, then one week of delay for every extra week of slip: the hockey stick behind 'completion delay = slip − float'.",
      },
      {
        kind: "widget",
        widget: "cpm-gantt",
        caption: "The default network ends at week 76 along B-C-E-G-H-L (survey, design, tracker procurement, tracker and module installation, testing). Add 15 weeks to the HV substation (J, 14 weeks of float): completion moves only 1 week, but the critical path now runs through the substation and grid connection.",
      },
      {
        kind: "md",
        md: md`**Baseline** and **updates**: the approved schedule is frozen as the **baseline**. Each month the contractor submits an **update** with actual dates and remaining durations as of the **data date** (left of it is actual, right of it is forecast). Changing the baseline happens only through change control.

**P6 words you will hear** (Primavera P6 is the standard tool): WBS, activity codes (filter by block, discipline, "MEWRE responsibility"), calendars (weekends, holidays, Ramadan, summer hours), baseline, data date, **longest path**, and the **XER** file (P6's native export: always ask for it, not just a PDF).`,
      },
      {
        kind: "md",
        md: md`### What to look for in a contractor's schedule

Under FIDIC 2017 (Sub-Clause 8.3) the contractor submits its initial programme within 28 days of the Commencement Date notice, and the Engineer has 21 days to say where it does not comply. Use that window: an accepted programme becomes the yardstick for every future extension-of-time claim.`,
      },
      {
        kind: "flow",
        title: "FIDIC 2017 Sub-Clause 8.3: getting the programme accepted",
        steps: [
          { label: "Commencement Date notice", detail: "Day 0" },
          { label: "Contractor submits initial programme", detail: "Within 28 days" },
          { label: "Engineer reviews", detail: "Within 21 days, states where it does not comply" },
          { label: "Contractor revises if needed", detail: "Resubmits" },
          { label: "Accepted programme", detail: "The yardstick for every extension-of-time claim" },
        ],
        caption: "The 21-day review is MEWRE's one cheap chance to fix missing MEWRE activities and bad logic; after acceptance, the same flaws become the contractor's evidence.",
      },
      {
        kind: "md",
        md: md`1. **Trace the critical path backwards from completion.** Does it make physical sense (procurement, installation, commissioning)?
2. **Long-lead chains complete**: submittal, Employer review, manufacture, FAT, shipping, customs, delivery. Transformers and HV switchgear take 12 to 18+ months.
3. **MEWRE's activities present** with realistic durations: approvals, design reviews, grid works, outages, energisation permits. This is where extension-of-time claims come from.
4. **Calendars** with summer restrictions, Ramadan, weekends and holidays.
5. **Quality checks** (the DCMA 14-point test): no missing logic, no leads (negative lags), few lags, no hard constraints, no negative float hidden, no huge float or very long activities.
6. **Float distribution**: almost everything critical means fragile; huge float everywhere means missing logic.
7. **The testing tail**: grid tests and performance tests need MEWRE dispatch windows and are routinely underestimated.
8. **Updates**: remaining durations that never decrease while percent complete rises.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Total float** $= LS - ES$. Completion delay = slip − total float (if positive).
- **DCMA thresholds**: missing logic ≤ 5 %; leads 0; hard constraints ≤ 5 %; finish-to-start ≥ 90 % of links; high float or high duration (over 44 working days) ≤ 5 %; negative float 0.
- **CPLI and BEI** (critical path length index, baseline execution index) ≥ 0.95.
- **FIDIC 2017 Sub-Clause 8.3**: programme within 28 days of the Commencement Date notice; Engineer responds within 21 days.
- **Kuwait calendar**: the summer midday outdoor work ban is commonly reported as about 11:00 to 16:00, June to August (**unverified** in Track 0: confirm before baselining).`,
      },
    ],
    say: [
      "What is the longest path today, and how has it moved over the last three updates?",
      "Please send the native XER with every update, not only the PDF.",
      "Where are MEWRE's activities (approvals, grid works, outages, energisation permits), and with what durations?",
      "Which activities have kept the same remaining duration for two or more updates?",
      "Are there hard constraints or leads in the logic? How much float does the grid connection have?",
    ],
    trap: "Believing that an activity with float can slip freely, or that zero float always means the logic works. Float belongs to the path: consume it upstream and every downstream activity loses it. And a hard constraint on the completion date can show zero float while hiding negative float, so trace the logic, not the colours.",
    check: [
      {
        id: "x-schedule-critical-path-c1",
        type: "numeric",
        prompt: md`An activity has 8 weeks of total float and slips by 12 weeks. Everything else goes to plan. By how many weeks does completion move?`,
        answer: 4,
        tolerance: { abs: 0 },
        unit: "weeks",
        explanation: md`Completion delay = slip − total float $= 12 - 8 = 4$ weeks. The first 8 weeks are absorbed by float; after that the activity is on the critical path.`,
        concepts: ["m08.float"],
        difficulty: 1,
      },
      {
        id: "x-schedule-critical-path-c2",
        type: "mcq",
        prompt: md`What is the critical path?`,
        options: [
          "The longest chain of dependent activities through the network; its activities have zero (or the least) total float",
          "The list of the most expensive activities",
          "The activities the contractor marks as important",
          "The shortest route from start to finish",
        ],
        answer: 0,
        explanation: md`The critical path is the longest path through the logic network. It sets the earliest possible completion; any delay on it delays completion.`,
        concepts: ["m08.cpm"],
        difficulty: 1,
      },
      {
        id: "x-schedule-critical-path-c3",
        type: "mcq",
        prompt: md`In P6, what is the "as of" date of a schedule update, before which everything is actual and after which everything is forecast?`,
        options: ["The data date", "The baseline date", "The longest path", "The finish constraint"],
        answer: 0,
        explanation: md`The data date separates actuals from forecast. The baseline is the frozen approved schedule you compare against.`,
        concepts: ["m08.p6"],
        difficulty: 1,
      },
    ],
    deeper: ["m08-l03"],
  },
  {
    id: "x-earned-value",
    day: 5,
    title: "Earned value: are we on time and on budget?",
    minutes: 12,
    module: "m08",
    hook: "Contractor reports say 'progressing well'; leadership asks 'are we on time and on budget?'. Earned value turns the monthly numbers into two honest answers and a forecast, and lets you see through a green status that the data do not support.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

You hire a painter for 10 rooms: KWD 100 per room, KWD 1,000 in total, 10 days.

At the end of day 5:

- The plan says 5 rooms should be done: **KWD 500 of work planned**.
- 4 rooms are actually finished: **KWD 400 of work earned**.
- You have paid KWD 480 for materials and labour: **KWD 480 actually spent**.

Looking only at spending (480 against a plan of 500) you would think you are under budget. You are not: you paid 480 for 400 worth of work (over cost), and you are one room behind (late).`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

Earned value uses three cumulative numbers at the status date, all against the **budget at completion (BAC)**:

- **Planned value (PV)**: budget of the work the baseline says should be done by now.
- **Earned value (EV)**: budget of the work **actually done**. Not money spent: budget earned.
- **Actual cost (AC)**: what that work actually cost. For MEWRE's own budget, AC is typically what has been certified plus accrued.`,
      },
      {
        kind: "diagram",
        diagram: "evm-scurve",
        caption: "Three cumulative curves at the status date: the gap from EV down to PV is the schedule variance, the gap from EV up to AC is the cost variance. Here EV is below both: late and over cost, like the painter.",
      },
      {
        kind: "md",
        md: md`Then:

| Measure | Formula | Bad when |
|---|---|---|
| Cost variance CV | EV − AC | negative |
| Schedule variance SV | EV − PV | negative |
| Cost performance index CPI | EV / AC | below 1 |
| Schedule performance index SPI | EV / PV | below 1 |
| Estimate at completion EAC | BAC / CPI (if cost performance continues) or AC + (BAC − EV) (if the rest goes to budget) | above BAC |
| To-complete index TCPI | (BAC − EV) / (BAC − AC) | far above CPI |

**One example.** BAC KWD 100 m. At month 8: PV = 40, EV = 36, AC = 45 (KWD m).

- CV = 36 − 45 = −9; SV = 36 − 40 = −4.
- CPI = 36/45 = **0.80**: each dinar buys 80 fils of work. SPI = 36/40 = **0.90**: 10 % behind.
- EAC = 100/0.80 = **125** if performance continues; 45 + (100 − 36) = **109** if the rest goes exactly to budget. Report the range, say which you believe.
- TCPI = 64/55 = **1.16**: finishing on budget needs 1.16 efficiency from now on, against 0.80 so far. Not credible.`,
      },
      {
        kind: "widget",
        widget: "evm",
        props: { bac: 100, pv: 40, ev: 36, ac: 45 },
        caption: "The example above: CPI 0.80, SPI 0.90. Notice how far apart the EAC methods are, and that TCPI 1.16 makes 'we will finish on budget' an extraordinary claim.",
      },
      {
        kind: "md",
        md: md`EV is only as good as the **rules of credit** (how progress is measured), agreed before work starts: count units (piles, modules installed **and** inspected) and use fixed milestone weights for supply. Watch for **progress inflation**: credit at purchase order, installed-but-untested work, subjective percentages.`,
      },
      {
        kind: "flow",
        title: "Rules of credit for module supply (Track 0 example): weight, then cumulative earned",
        steps: [
          { label: "Approval", detail: "5 %, cumulative 5 %" },
          { label: "Purchase order", detail: "5 %, cumulative 10 %" },
          { label: "FAT passed", detail: "15 %, cumulative 25 %" },
          { label: "Shipped", detail: "15 %, cumulative 40 %" },
          { label: "Delivered and inspected on site", detail: "60 %, cumulative 100 %" },
        ],
        caption: "Most of the credit waits until the modules are on site and inspected, so paperwork alone can never earn more than 10 %.",
      },
      {
        kind: "md",
        md: md`Two cautions: cost-based SPI drifts back to 1.0 as a late project finishes (EV = PV = BAC at the end), so in the last third use the time-based **SPI(t)** from earned schedule. And cumulative CPI rarely improves much once a project is about 20 % complete.`,
      },
      {
        kind: "chart",
        chart: "line",
        title: "A 10-month plan that takes 13 months: two ways to measure schedule (illustrative)",
        xKey: "month",
        xLabel: "Month",
        yLabel: "Index (1.0 = on plan)",
        series: [
          { key: "spi", label: "SPI = EV / PV (cost-based)" },
          { key: "spit", label: "SPI(t) from earned schedule" },
        ],
        data: [
          { month: "1", spi: 0.68, spit: 0.77 },
          { month: "2", spi: 0.58, spit: 0.77 },
          { month: "3", spi: 0.5, spit: 0.77 },
          { month: "4", spi: 0.46, spit: 0.77 },
          { month: "5", spi: 0.47, spit: 0.77 },
          { month: "6", spi: 0.55, spit: 0.77 },
          { month: "7", spi: 0.67, spit: 0.77 },
          { month: "8", spi: 0.8, spit: 0.77 },
          { month: "9", spi: 0.89, spit: 0.77 },
          { month: "10", spi: 0.94, spit: 0.77 },
          { month: "11", spi: 0.98, spit: 0.77 },
          { month: "12", spi: 0.99, spit: 0.77 },
          { month: "13", spi: 1, spit: 0.77 },
        ],
        caption: "Cost-based SPI climbs back to 1.00 at month 13 although the project is 3 months late; SPI(t) stays at 0.77 (10 planned months / 13 actual) the whole way.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **CPI and SPI**: 1.0 is on plan; below 1 is bad. Example RAG thresholds (set per project): CPI ≥ 0.97 green, 0.92 to 0.97 amber, below 0.92 red.
- **CPI stability**: cumulative CPI stabilises at about 20 % complete; the final CPI is rarely more than about 0.1 better.
- **TCPI credibility**: a TCPI more than about 0.05 to 0.10 above the current CPI is not credible.
- **Module supply rules of credit** (Track 0 example): approval 5 %, PO 5 %, FAT passed 15 %, shipped 15 %, delivered and inspected on site 60 %.`,
      },
    ],
    say: [
      "What rules of credit are you using for this package, and when were they agreed?",
      "Your report says green, but CPI is 0.93 and SPI(t) is 0.88. What is the recovery plan?",
      "What EAC range do you forecast, and which method do you believe?",
      "What TCPI does finishing on budget require, and what will change to achieve it?",
      "Is 'installed' counted only once it is inspected and tested?",
    ],
    trap: "Comparing spend with plan (AC against PV). Spending less than planned may only mean less work was done. Compare EV with AC for cost and EV with PV for schedule. And EV is budget earned for work done, not money paid: crediting progress at purchase order or for untested work inflates it.",
    check: [
      {
        id: "x-earned-value-c1",
        type: "numeric",
        prompt: md`A KWD 200 m contract has EV = 60 and AC = 75 (KWD m). If current cost performance continues, what is the estimate at completion, in KWD m?`,
        answer: 250,
        tolerance: { abs: 1 },
        unit: "KWD m",
        explanation: md`$CPI = 60/75 = 0.80$. $EAC = BAC/CPI = 200/0.80 = 250$ m, i.e. KWD 50 m over budget if nothing changes.`,
        concepts: ["m08.evm-forecasting", "m08.evm-basics"],
        difficulty: 1,
      },
      {
        id: "x-earned-value-c2",
        type: "mcq",
        prompt: md`At month 6: PV = 50, EV = 40, AC = 38. Which statement is right?`,
        options: [
          "Behind schedule (SPI 0.80) but under cost for the work done (CPI about 1.05)",
          "On schedule and under budget, because AC is below PV",
          "Over budget and behind schedule",
          "Ahead of schedule (SPI 1.25)",
        ],
        answer: 0,
        explanation: md`$SPI = 40/50 = 0.80$; $CPI = 40/38 \approx 1.05$. Comparing AC (38) with PV (50) suggests "under budget", but that is mostly because less work was done.`,
        concepts: ["m08.evm-basics"],
        difficulty: 1,
      },
      {
        id: "x-earned-value-c3",
        type: "mcq",
        prompt: md`Module supply is measured with these rules of credit: approval 5 %, PO 5 %, FAT passed 15 %, shipped 15 %, on site and inspected 60 %. Approval and POs are done, nothing has been tested yet. The contractor claims 20 %. What has actually been earned?`,
        options: ["10 %", "20 %", "35 %", "0 %"],
        answer: 0,
        explanation: md`Only approval (5 %) and PO (5 %) are achieved: 10 %. Claiming more before FAT is progress inflation.`,
        concepts: ["m08.progress-measurement", "m08.progress-inflation"],
        difficulty: 1,
      },
    ],
    deeper: ["m08-l04", "m08-l08"],
  },
  {
    id: "x-risk-change-reporting",
    day: 5,
    title: "Risks, changes and the monthly report",
    minutes: 15,
    module: "m08",
    hook: "Your seniors will judge you less on whether problems happen than on whether they heard about them early, with options. The risk register, change control and the monthly report are the three tools that make that possible.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

You are driving to the airport for an international flight.

- **Risks**: traffic on the motorway, a flat tyre, a long security queue. You list them and judge each: how likely, how bad (**risk register**, **probability × impact**).
- **Responses**: leave earlier (**mitigate**), buy travel insurance (**transfer** the cost, not the event), take the coastal road to skip roadworks (**avoid**).
- The map app says 40 minutes typically, but you allow 60 because you want to be fairly sure (**P50 against P80**).
- Someone asks you to stop at a relative's house on the way. Before saying yes, you check how much time it costs (**change control**).
- You message the family early: "we are 20 minutes late, should we skip lunch?" (**honest reporting**, with a decision attached).`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**Risk register.** Write each risk as **cause, event, effect**: "Because the 400 kV route crosses an oil-sector corridor, right-of-way approval may take longer than planned, delaying energisation and exposing MEWRE to PPA compensation." Each risk has one **owner**, a **response** (avoid, transfer, mitigate, accept, escalate) with actions and dates, and a **score**.

**Probability × impact.** Score each from 1 to 5 and multiply (1 to 25). Typical bands: 15 to 25 red (response plan, steering committee sees it), 8 to 12 amber (owner manages), 1 to 6 green (monitor). An HSE impact of 5 is red regardless of probability. The score is a **ranking**, not a quantity: never add scores up. For money, use **expected monetary value (EMV)** = probability × cost impact (40 % × USD 6 m = USD 2.4 m).`,
      },
      {
        kind: "widget",
        widget: "risk-matrix",
        caption: "Move 'Grid connection works late' around: a MEWRE-side risk that is likely and severe lands in the red corner, and the widget suggests the response.",
      },
      {
        kind: "md",
        md: md`**Monte Carlo, in one paragraph.** Give each key duration or cost a range (minimum, most likely, maximum), add risk events with their probability, and let the computer run the schedule thousands of times. You get a distribution: **P50** is the date or cost you hit half the time, **P80** the one you hit 80 % of the time. Owners usually set contingency at **P80 minus the base estimate**; contractors price nearer P50. Parallel paths make the single-line date optimistic: two independent paths each at P50 by week 40 have only a 25 % chance of both being done by then.`,
      },
      {
        kind: "widget",
        widget: "monte-carlo",
        caption: "In schedule mode, compare the dashed 'det.' line (the single-line programme date) with P50 and P80, and read 'P(≤ deterministic)': the programme date is usually hit less than half the time. 'P80 contingency' is the time an owner holds.",
      },
      {
        kind: "md",
        md: md`**Change control.** Every change goes through: identify, log, assess (cost, time, risk, quality, HSE), decide (by the delegated authority), instruct formally (never orally), implement and re-baseline, close. Under FIDIC 2017, Clause 13 covers variations (by instruction or by request for proposal) and Clause 20 claims (notice within 28 days, fully detailed claim within 84 days). An **RFI** clarifies; it never changes scope.`,
      },
      {
        kind: "flow",
        title: "Change control",
        steps: [
          { label: "Identify", detail: "Change request or contractor notice" },
          { label: "Log", detail: "Change register number" },
          { label: "Assess", detail: "Cost, time (TIA), risk, quality, HSE" },
          { label: "Decide", detail: "At the delegated authority" },
          { label: "Instruct", detail: "Formal variation, never oral" },
          { label: "Re-baseline and close", detail: "Scope, schedule, budget updated" },
        ],
        caption: "A change that skips 'assess' has no time impact on record, which is exactly what a later delay claim will exploit.",
      },
      {
        kind: "md",
        md: md`**Interfaces.** Keep an **interface register** with give and need dates and owners; MEWRE's own "gives" (line ready, points list, outage window) are milestones in the schedule.

**The monthly report to seniors**: 2 to 4 pages, **decisions first**.

1. Overall status and **decisions needed**.
2. Key dates: baseline against forecast (energisation, grid connection, COD).
3. Schedule: critical path and float, SPI(t), S-curves of physical progress.
4. Cost: budget, EAC range, contingency drawdown.
5. HSE and quality.
6. Top 5 risks and issues; MEWRE-side interface status.
7. Approvals and stakeholders.

Each status is **RAG with criteria defined in advance**, a trend arrow and a path to green. Amber is a request for attention; red is a request for a decision. (The contractor's own monthly report under FIDIC 2017 Sub-Clause 4.20 is due within 7 days after each period and is a different, much longer document.)`,
      },
      {
        kind: "md",
        md: md`| Area | RAG | Trend | Criterion (agreed in advance) | Path to green / decision |
|---|---|---|---|---|
| Schedule (energisation) | Amber | Worse | 1 to 4 weeks late = amber | 3 weeks late; recovery plan from EPC due this month |
| Cost | Green | Stable | CPI ≥ 0.97 = green | CPI 0.98, EAC within budget |
| HSE | Green | Stable | No lost-time incident this month | Heat-stress controls audited |
| Grid connection (MEWRE side) | Red | Worse | Key date at risk = red | **Decision needed**: approve extra crews for the 400 kV line, or accept a later COD |
| Approvals | Amber | Better | Any approval past its planned date = amber | Audit Bureau query answered, awaiting reply |

*An illustrative page-1 status table: every colour has a written criterion, a trend and a next step, and the one red row ends in a decision for seniors.*`,
      },
      {
        kind: "md",
        md: md`**QA/QC**: the inspection and test plan (ITP) sets **hold points** (work stops until you release it) and witness points; non-conformance reports (NCRs) record work that misses the spec.
**HSE**: permit to work and heat-stress control in 45 to 50 °C, and remember PV strings are live whenever the sun shines.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Risk score** P × I on 1 to 5 scales: 15 to 25 red, 8 to 12 amber, 1 to 6 green.
- **Contingency**: P80 − base estimate (owner view); management reserve sits outside the baseline.
- **FIDIC 2017 Clause 20**: claim notice within 28 days of becoming aware; fully detailed claim within 84 days.
- **Example RAG for schedule**: 1 to 4 weeks late amber, more than 4 weeks (or a key date at risk) red.
- **Leadership report**: 2 to 4 pages, decisions on page 1.`,
      },
    ],
    say: [
      "What is the cause, event and effect of this risk, who owns it, and what is the response with a date?",
      "Is our contingency set at P80, and how much did we draw down this month?",
      "Has this change been logged and assessed for time, or is it an informal request?",
      "Decision needed this month: here are the options and my recommendation.",
      "Which MEWRE-side interface deliverables are late, and by how much against float?",
    ],
    trap: "Treating the risk score as a quantity, or keeping the status green to avoid bad news. P × I scores rank risks; they do not add up into a budget (use EMV or Monte Carlo). And 'watermelon' reporting (green outside, red inside) always ends with a sudden jump to red when the recovery options are gone; report amber early, with a plan.",
    check: [
      {
        id: "x-risk-change-reporting-c1",
        type: "numeric",
        prompt: md`There is a 40 % chance that MEWRE's 400 kV line is late, which would cost about USD 6.0 m in compensation. What is the expected monetary value of this risk, in USD m?`,
        answer: 2.4,
        tolerance: { abs: 0.05 },
        unit: "USD m",
        explanation: md`$EMV = 0.40 \times 6.0 = 2.4$ m. Because this risk is within MEWRE's control, spending well under 2.4 m on mitigation (early right-of-way work, more supervision) is good value.`,
        concepts: ["m08.emv", "m08.risk-register"],
        difficulty: 1,
      },
      {
        id: "x-risk-change-reporting-c2",
        type: "mcq",
        prompt: md`A Monte Carlo analysis gives COD at P50 = March and P80 = June. What should you commit to leadership?`,
        options: [
          "Plan and fund to P80 (June): a P50 date is missed half the time, and overruns are larger than underruns",
          "March, because it is the most likely date",
          "The deterministic date from the contractor's programme",
          "Any date between them, since both are estimates",
        ],
        answer: 0,
        explanation: md`Owners usually budget contingency and commit dates at P80. Going back for more time or money through Finance and the Audit Bureau costs months and credibility.`,
        concepts: ["m08.monte-carlo", "m08.contingency"],
        difficulty: 1,
      },
      {
        id: "x-risk-change-reporting-c3",
        type: "decision",
        prompt: md`During a site visit a MEWRE department head asks the EPC to add extra CCTV cameras. The EPC agrees and says it will "sort the paperwork later". What do you do?`,
        options: [
          { text: "Stop it informally proceeding: log it as a change request, have it assessed for cost and time, decide at the right authority, and instruct formally only if approved.", score: 1, feedback: "Right: this is how scope creep is controlled and how MEWRE avoids an unpriced claim later." },
          { text: "Let it go ahead; it is a small item and the request came from a senior.", score: 0, feedback: "Informal requests are how change allowances are blown and how disputed claims start." },
          { text: "Refuse the request outright.", score: 0.4, feedback: "It may be justified; the point is to assess it and decide formally, not to reject without a look." },
        ],
        explanation: md`Change control: identify, log, assess, decide, instruct formally, re-baseline. Never let a variation run on an oral request.`,
        concepts: ["m08.change-control", "m08.scope-creep"],
        difficulty: 2,
      },
    ],
    deeper: ["m08-l05", "m08-l06", "m08-l08"],
  },
];
