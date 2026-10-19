import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m08-l07",
  title: "QA/QC and HSE: ITPs, Hold Points, NCRs, Permit to Work and Heat Stress at 50 °C",
  summary:
    "How quality is built in (QMS, quality plans, ITPs with hold/witness points, FAT/SAT, NCRs, audits under ISO 9001) and how people are kept alive on a desert PV/BESS site (HSE plans, ISO 45001, permit to work, energisation control, heat-stress management, LTIFR/TRIR and leading indicators).",
  minutes: 80,
  objectives: [
    "You can read and challenge an inspection and test plan (ITP), and explain hold, witness, review and surveillance points.",
    "You can run the NCR cycle and use audits to test whether a contractor's QMS works in practice.",
    "You can evaluate an HSE plan and permit-to-work system for a PV/BESS site, including energisation and BESS-specific hazards.",
    "You can manage heat stress with WBGT-based controls and compute LTIFR and TRIR correctly.",
  ],
  concepts: [
    { id: "m08.itp", name: "Inspection and test plan (ITP)", description: "Activity-by-activity plan of inspections/tests with acceptance criteria, records and each party's involvement (hold, witness, review, surveillance).", competency: "risk" },
    { id: "m08.hold-witness", name: "Hold and witness points", description: "Hold: work may not proceed without the inspecting party's release. Witness: party is notified and may attend; work can proceed if they do not.", competency: "risk", related: ["m08.itp"] },
    { id: "m08.ncr", name: "Non-conformance reports", description: "Formal record of work/material not meeting requirements, with disposition (rework, repair, use-as-is with concession, reject), root cause and closure.", competency: "risk", related: ["m08.itp"] },
    { id: "m08.qms-iso9001", name: "QMS & ISO 9001", description: "Process-based quality management system with PDCA and risk-based thinking; project quality plan applies it to the contract.", competency: "risk" },
    { id: "m08.ptw", name: "Permit to work & energisation control", description: "Formal written system authorising specific hazardous work (electrical isolation, hot work, height, confined space, lifting, excavation) with isolations, checks and handback.", competency: "risk" },
    { id: "m08.heat-stress", name: "Heat stress management", description: "WBGT monitoring, acclimatisation, hydration, shaded rest, work/rest regimes, rescheduling and emergency response for 45–50 °C conditions.", competency: "risk", related: ["m08.kuwait-risks"] },
    { id: "m08.hse-kpis", name: "HSE KPIs (LTIFR, TRIR, leading indicators)", description: "Normalised lagging injury rates and leading indicators of safety system health.", competency: "risk", related: ["m08.heat-stress"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Quality is planned; safety is designed",
      blocks: [
        {
          kind: "md",
          md: md`### Quality assurance vs quality control

- **QA** — the planned system that gives confidence requirements will be met: procedures, qualified people, document control, audits. Proactive.
- **QC** — the inspections and tests that verify the product meets requirements. Detective.

ISO 9001:2015 structures a QMS around the **process approach**, **PDCA** and **risk-based thinking**. On a project, the contractor's corporate QMS is applied through a **Project Quality Plan (PQP)** and discipline **ITPs**. FIDIC 2017 Sub-Clause 4.9 requires the contractor to operate a quality management system and a compliance verification system; Clause 7 covers inspection, testing, defects and rejection.

### The ITP

Each line of an ITP states: activity · reference spec/standard · acceptance criteria · frequency · verifying record · involvement codes for contractor, OE/Engineer and Employer (and third parties).

| Code | Meaning | Effect |
|---|---|---|
| **H — Hold** | Work must not proceed beyond this point until the inspecting party releases it | Schedule-critical; requires notice (e.g., 24–48 h) |
| **W — Witness** | Party is notified and may attend; work may proceed if they do not after due notice | Optional attendance |
| **R — Review** | Documentary review of records | No attendance |
| **S — Surveillance** | Random/periodic monitoring | Sampling |

Typical PV/BESS hold points: pile pull-out/load tests before production piling; foundation concrete pour; module FAT/pre-shipment inspection (flash test data, EL imaging sample); tracker torque verification per block; MV cable HV test before energisation; transformer FAT; protection relay settings and secondary injection; BESS container FAT and fire-suppression test; **energisation readiness** (everything before backfeed). Witness points: string IV-curve tests (IEC 62446-1), thermography, insulation resistance sampling.

### Non-conformance

An **NCR** records that work or material does not meet requirements. Disposition options: **rework** (to meet spec), **repair** (acceptable but not to original spec — needs approval), **use-as-is** (concession — Employer approval, possibly price reduction), **reject/replace**. Each NCR needs root cause and corrective action; trends by category (e.g., torque, cable bending radius, pile depth) tell you whether the system is working. NCRs are the contractor's cost to fix — and the most reliable evidence of whether progress is real.

### Audits

First-party (contractor internal), second-party (Employer/OE auditing the contractor), third-party (certification bodies). A good Employer audit samples **records against reality**: pick ten installed strings, trace them to the ITP sign-off, the test record, the calibrated instrument certificate, the inspector's qualification.

### HSE management

ISO 45001:2018 frames occupational health and safety as a management system: leadership and worker participation, hazard identification, the **hierarchy of controls** (eliminate → substitute → engineering → administrative → PPE), operational control, emergency preparedness, incident investigation, performance evaluation. FIDIC 2017 Sub-Clause 4.8 places health and safety obligations on the contractor, including a health and safety manual.

**Permit to work** (UK HSE guidance HSG250): a formal written system controlling specified hazardous work — electrical isolation and lock-out/tag-out, hot work, work at height, confined spaces, excavation near buried services, heavy lifts, and work on energised or potentially energised equipment. On a PV site, the specific danger is that **DC strings are live whenever the sun shines**: isolation does not make PV modules dead. On BESS: stranded energy in racks, thermal runaway, off-gas explosion risk, arc flash on DC busbars.

### Heat stress

The **Wet Bulb Globe Temperature** combines humidity, radiant load and air temperature:`,
        },
        { kind: "equation", formula: "hse-wbgt" },
        {
          kind: "md",
          md: md`ISO 7243 and the ACGIH TLV give WBGT reference values that **decrease as metabolic rate increases** and are lower for unacclimatised workers — of the order of **28 °C WBGT for moderate continuous work by acclimatised workers**, lower for heavy work (check the current edition and the project's heat-stress procedure for exact limits and work/rest tables). Kuwaiti summer afternoons routinely exceed any continuous-work limit.

Controls, in hierarchy order: **reschedule** (night or early-morning shifts for heavy work), **engineering** (shade at work fronts, cooled rest shelters, mechanised handling — e.g., module-installation robots or carts), **administrative** (acclimatisation over 7–14 days, work/rest cycles from WBGT, buddy system, hydration with electrolytes, medical screening, supervisors trained to recognise heat exhaustion vs **heat stroke — a medical emergency**: cool immediately, call emergency services), **PPE** (cooling vests, breathable FR clothing where electrical risk allows).

### HSE KPIs`,
        },
        { kind: "equation", formula: "hse-ltifr" },
        { kind: "equation", formula: "hse-trir" },
        {
          kind: "callout",
          tone: "why",
          title: "Why lagging indicators are not enough",
          md: md`A 3 m-hour project with LTIFR 0 can still be one permit failure away from a fatality. Injury rates are small-number statistics with huge noise and they reward under-reporting. Leading indicators — permits audited, heat-stress checks performed, near-misses reported, toolbox talks, corrective actions closed on time — measure whether the system is working before someone is hurt.`,
        },
        { kind: "sources", refs: ["m08-iso-9001", "m08-iso-45001", "m08-iso-7243", "m08-hse-hsg250", "m08-niosh-heat", "m08-osha-recordkeeping", "m08-fidic-2017"] },
      ],
    },
    {
      layer: "applied",
      title: "Computing HSE metrics and heat-stress controls",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "LTIFR and TRIR for a 300 MW PV construction year",
          given: md`Average workforce **1,200** over the year, **10 h/day**, **6 days/week**, **50 weeks**. Injuries recorded: **2 LTIs**, **3 medical treatment cases**, **2 restricted work cases** (total recordables 7), plus 25 first-aid cases and 140 near-miss reports.`,
          steps: [
            { md: md`Hours: $H = 1{,}200 \times 10 \times 6 \times 50 = 3{,}600{,}000$ h.` },
            { md: md`$LTIFR = 2 \times 10^6 / 3.6 \times 10^6 = 0.556$ per million hours.` },
            { md: md`$TRIR = 7 \times 200{,}000 / 3.6 \times 10^6 = 0.389$ per 200,000 h (equivalently $7 \times 10^6 / 3.6 \times 10^6 = 1.94$ per million hours).` },
            { md: md`First-aid cases and near misses are not recordables but are valuable leading signals: 140 near misses per 3.6 m h suggests a reasonable reporting culture; 25 first-aid cases with **no** near misses would suggest the opposite.` },
          ],
          result: md`LTIFR 0.56 (10⁶ h basis); TRIR 0.39 (200,000 h basis). Always state the normalisation base — a "TRIR of 1.9" and "0.39" are the same performance.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "WBGT at a PV block in July",
          given: md`Site measurements on a July day: at **13:30** natural wet-bulb 29 °C, globe 60 °C, air 48 °C. At **06:00** natural wet-bulb 24 °C, globe 38 °C, air 34 °C. Assume the project's procedure limits continuous **moderate** work by acclimatised workers to WBGT ≤ 28 °C and stops all non-emergency outdoor work above 32 °C.`,
          steps: [
            {
              md: md`13:30: $WBGT = 0.7(29) + 0.2(60) + 0.1(48) = 20.3 + 12.0 + 4.8 = 37.1$ °C → above the stop-work limit.`,
              hidden: true,
              check: { prompt: "WBGT at 13:30", answer: 37.1, unit: "°C", tolerance: { abs: 0.1 } },
            },
            {
              md: md`06:00: $WBGT = 0.7(24) + 0.2(38) + 0.1(34) = 16.8 + 7.6 + 3.4 = 27.8$ °C → moderate work acceptable with hydration and rest.`,
              hidden: true,
              check: { prompt: "WBGT at 06:00", answer: 27.8, unit: "°C", tolerance: { abs: 0.1 } },
            },
            { md: md`Note the globe term: 12 °C of the 37.1 at midday comes from solar radiation, which is why **shade** is such an effective control. Air temperature contributes only 4.8 °C.` },
          ],
          result: md`Midday WBGT 37.1 °C: no heavy outdoor work. Dawn WBGT 27.8 °C: work permitted. Planning consequence: summer installation shifts of roughly 04:30–10:30 and evening/night work under lighting for suitable tasks — which must be in the P6 calendars and the productivity assumptions.`,
        },
        {
          kind: "question",
          question: {
            id: "m08-l07-p1",
            type: "numeric",
            prompt: md`Continuing the worked example (3.6 m hours, 2 LTIs), the next quarter adds 1.1 m hours and 1 LTI. What is the cumulative LTIFR (per million hours)?`,
            answer: 0.638,
            tolerance: { abs: 0.003 },
            explanation: md`$3 \times 10^6 / 4.7 \times 10^6 = 0.638$. One LTI moved the cumulative rate by about 15 % — illustrating why monthly LTIFR swings say little and why leading indicators matter.`,
            concepts: ["m08.hse-kpis"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Quality and safety on a Kuwaiti desert site",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

| Party | Quality role | HSE role |
|---|---|---|
| **EPC contractor** | QMS, PQP, ITPs, inspections, NCRs, test records | HSE plan, PTW system, heat-stress programme, training, incident reporting |
| **Subcontractors** | Execute to ITP; first-line QC | Comply; supervisors run toolbox talks |
| **Owner's Engineer (for MEWRE/IPP)** | Reviews ITPs, attends hold/witness points, audits | Monitors HSE compliance, audits permits |
| **MEWRE PM** | Approves quality plan (direct EPC); verifies tests at PPA milestones (IPP); releases energisation holds | Sets HSE expectations, reviews KPIs, investigates serious incidents, never trades safety for schedule |
| **MEWRE Transmission / operations** | Witnesses grid interface tests, protection settings | Switching authority and safety rules at the interface |
| **Lenders' technical advisor (IPP)** | Reviews quality and test results for drawdowns | Reports HSE to lenders (IFC Performance Standards / Equator Principles often apply) |

### Energisation: where quality and safety meet

Before the first backfeed from the grid, the plant changes from a construction site to a live electrical installation. Use a formal **energisation readiness review**: all hold points on the energised section released; protection settings approved and tested; earthing tested; **switching authority** and safety rules agreed with MEWRE Transmission (who may operate what, under whose permit); the **limits of authority** marked on site and drawings; emergency response for electrical incidents; and a **sanction-for-test / permit** regime for commissioning work on energised equipment.

### BESS-specific

FAT of containers (cell/module data, BMS functions, HVAC), fire-detection and suppression tests, explosion venting/deflagration design review, separation distances, emergency-response plan with civil defence, and training on stranded energy. Lithium-ion containers are dangerous goods in transport and storage — a quality, safety and customs issue at once.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Heat is a verified, extreme design and safety condition",
          md: md`Kuwait holds Asia's highest WMO-verified temperature: **53.9 °C at Mitribah on 21 July 2016**. Summer ambient of 45–50 °C is routine. Heat-stress management is therefore not a seasonal campaign but a core HSE system, and it must be planned into the schedule (calendars, shifts) and the estimate (productivity, welfare facilities).`,
        },
        { kind: "sources", refs: ["m08-wmo-mitribah"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait regulatory HSE points to verify",
          md: md`The annual **summer midday outdoor work ban** (commonly reported as about 11:00–16:00, June–August, enforced by the Public Authority for Manpower), the applicable national occupational-safety regulations, civil-defence (fire) approval requirements for BESS, and MEWRE's own electrical safety rules and switching procedures are **not covered** by the project research file. Obtain the current official texts before writing the HSE requirements or approving the contractor's HSE plan. Note also that a ban on certain hours does not, by itself, make other hours safe — WBGT controls still apply.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Typical QA/QC and HSE failures",
          md: md`- ITPs copied from another project; hold points on activities that do not exist, missing on the ones that do.
- Hold points "released" by phone; no record — the work is unverifiable later.
- NCRs closed by the contractor without Employer verification.
- Module installation crews paid per module with no QC sign-off before payment — torque and clamp errors at scale.
- DC strings treated as dead after an inverter isolation.
- Heat programme on paper; water stations empty at 11:00; acclimatisation skipped for new crews arriving in July.
- Celebrating "1 million hours LTI-free" while near-miss reporting has collapsed.`,
        },
        {
          kind: "checklist",
          title: "PM QA/QC & HSE checklist",
          items: [
            "Project Quality Plan and discipline ITPs reviewed; hold points cover irreversible and energisation-critical steps.",
            "Notice periods for hold/witness points agreed and resourced on the Employer side.",
            "NCR register with ageing, categories, root causes; Employer verifies closure.",
            "Progress claims cross-checked against ITP sign-offs (no progress without QC acceptance).",
            "HSE plan approved; PTW system audited weekly; energisation readiness review defined with MEWRE Transmission.",
            "Heat-stress procedure with on-site WBGT measurement, acclimatisation, shaded/cooled rest, work/rest table, emergency response.",
            "HSE KPIs reported with base stated (10⁶ h or 200,000 h) and leading indicators.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "Show me the WBGT readings for last Tuesday, by hour and work front, and the work/rest decisions taken.",
            "How do new workers arriving in summer acclimatise, and who verifies it?",
            "Which ITP hold points are on the critical path, and how much notice do you give us?",
            "What are your top three NCR categories this quarter and the corrective actions?",
            "How are DC strings isolated and proven safe for work on combiner boxes during daylight?",
            "What is your BESS emergency response plan, and has civil defence reviewed it?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain the difference between a hold point and a witness point to a new site inspector, and why it matters for the schedule.",
          keyPoints: [
            "Hold: work cannot proceed without release",
            "Witness: notified, may attend, work can proceed after notice if absent",
            "Hold points are schedule-critical, need notice and Employer resources",
            "Records of release are contractual evidence",
            "Put holds on irreversible or safety-critical steps",
          ],
        },
        { kind: "scenario", scenario: "m08-s7" },
      ],
    },
  ],
  quiz: [
    {
      id: "m08-l07-q1",
      type: "mcq",
      prompt: "An ITP line is marked 'H' for the Employer. What does that mean?",
      options: [
        "The Employer may attend if convenient",
        "Work must not proceed past this point until the Employer (or its representative) releases it",
        "The Employer reviews the records later",
        "The activity is high risk",
      ],
      answer: 1,
      explanation: md`A hold point stops work until formal release. It requires agreed notice and someone available to release — unattended hold points become Employer-caused delay.`,
      concepts: ["m08.hold-witness", "m08.itp"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m08-l07-q2",
      type: "numeric",
      prompt: md`A project worked 2.4 million hours with 6 recordable cases. What is the TRIR on the 200,000-hour basis?`,
      answer: 0.5,
      tolerance: { abs: 0.005 },
      explanation: md`$6 \times 200{,}000 / 2.4 \times 10^6 = 0.50$. On a 10⁶-hour basis it would be 2.5 — always state the base.`,
      concepts: ["m08.hse-kpis"],
      difficulty: 1,
    },
    {
      id: "m08-l07-q3",
      type: "numeric",
      prompt: md`Measured: natural wet-bulb 27 °C, globe 55 °C, air 45 °C. What is the outdoor WBGT?`,
      answer: 34.4,
      unit: "°C",
      tolerance: { abs: 0.1 },
      explanation: md`$0.7(27) + 0.2(55) + 0.1(45) = 18.9 + 11.0 + 4.5 = 34.4$ °C — far above continuous-work reference values. Shade (reducing the globe term) and rescheduling are the first controls.`,
      concepts: ["m08.heat-stress"],
      difficulty: 1,
    },
    {
      id: "m08-l07-q4",
      type: "multi",
      prompt: "Which are valid NCR dispositions?",
      options: ["Rework", "Repair (with approval)", "Use-as-is under concession", "Reject and replace", "Close without action because progress is behind"],
      answer: [0, 1, 2, 3],
      explanation: md`Use-as-is and repair require Employer approval (and possibly price reduction). Schedule pressure is never a disposition.`,
      concepts: ["m08.ncr"],
      difficulty: 1,
    },
    {
      id: "m08-l07-q5",
      type: "order",
      prompt: "Order the hierarchy of controls from most to least effective.",
      items: ["Elimination", "Substitution", "Engineering controls", "Administrative controls", "PPE"],
      explanation: md`For heat: eliminate exposure (night work / mechanisation) → substitute (lighter methods) → engineering (shade, cooled shelters) → administrative (work/rest, acclimatisation) → PPE (cooling vests).`,
      concepts: ["m08.heat-stress", "m08.ptw"],
      difficulty: 1,
    },
    {
      id: "m08-l07-q6",
      type: "mcq",
      prompt: "Why does isolating a string inverter not make the PV DC circuits upstream safe to work on during daylight?",
      options: [
        "Because inverters store energy for hours",
        "Because illuminated modules generate voltage whenever light falls on them",
        "Because the grid back-feeds the DC side",
        "It does make them safe",
      ],
      answer: 1,
      explanation: md`PV modules are current sources driven by light; open-circuit string voltages of 1,000–1,500 V DC are present whenever the sun shines. Work on DC circuits needs specific isolation (string disconnection, covering, or night work) under a permit.`,
      concepts: ["m08.ptw"],
      difficulty: 1,
    },
    {
      id: "m08-l07-q7",
      type: "decision",
      prompt: md`The contractor proposes that MEWRE's witness of string IV-curve tests be done by **review of records only** for 80 % of blocks to save time, with witness on 20 % chosen by MEWRE/OE. You are the PM.`,
      options: [
        { text: "Accept, provided the 20 % sample is selected by MEWRE/OE at short notice, raw test files are submitted for all strings, and the sampling rate rises if discrepancies are found.", score: 1, feedback: "Risk-based sampling with unpredictable selection and full data is sound practice and saves Employer resources." },
        { text: "Refuse; witness 100 %.", score: 0.4, feedback: "Defensible but resource-heavy and may create Employer-caused delay if inspectors are not available." },
        { text: "Accept records only for all blocks.", score: 0.2, feedback: "Without any witness the records' integrity cannot be checked." },
      ],
      explanation: md`Inspection effort should follow risk. Witness enough to validate the contractor's QC system, and escalate sampling if it fails.`,
      concepts: ["m08.itp", "m08.qms-iso9001"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m08-l07-f1", front: "QA vs QC", back: "QA: planned system giving confidence (proactive). QC: inspection/testing of product (detective)." },
    { id: "m08-l07-f2", front: "Hold vs witness point", back: "Hold: cannot proceed without release. Witness: notified, may attend; can proceed after due notice." },
    { id: "m08-l07-f3", front: "NCR dispositions", back: "Rework, repair (approved), use-as-is (concession), reject/replace." },
    { id: "m08-l07-f4", front: "Outdoor WBGT formula", back: md`$0.7T_{nwb} + 0.2T_g + 0.1T_a$.` },
    { id: "m08-l07-f5", front: "LTIFR base vs TRIR base (typical)", back: "LTIFR per 1,000,000 h; TRIR per 200,000 h (OSHA). Always state the base." },
    { id: "m08-l07-f6", front: "ISO standards for quality and OH&S management", back: "ISO 9001:2015 (quality); ISO 45001:2018 (occupational health & safety)." },
    { id: "m08-l07-f7", front: "Heat stroke first response", back: "Medical emergency: cool immediately (shade, water, ice), call emergency services, do not leave alone." },
    { id: "m08-l07-f8", front: "Main PTW categories on a PV/BESS site", back: "Electrical isolation/LOTO, work on energised equipment, hot work, work at height, confined space, excavation, heavy lifts." },
  ],
  scenarios: [
    {
      id: "m08-s7",
      title: "A collapse at 13:40 in July",
      dayInLife: true,
      context: md`Mid-July, directly procured 300 MW PV EPC. At 13:40 a module installer collapses on Block 14; colleagues report confusion and hot, dry skin. The contractor's site manager calls you: the worker has been taken to the clinic; he wants to keep Block 14 working "because we are two weeks behind on the module installation milestone".`,
      start: "a",
      concepts: ["m08.heat-stress", "m08.hse-kpis", "m08.ptw"],
      nodes: {
        a: {
          md: md`What do you tell the site manager immediately?`,
          choices: [
            { text: "Treat it as suspected heat stroke: confirm emergency medical transfer, stop outdoor work at that front, measure WBGT across work fronts now and apply the stop-work criteria site-wide; preserve information for the investigation.", next: "b", score: 10, feedback: "Life first, then protect the others exposed to the same conditions, then the facts." },
            { text: "Agree to continue but add extra water breaks.", next: "c", score: 1, feedback: "Hot, dry skin and confusion indicate heat stroke; others at that front are in the same conditions. Schedule never outranks this." },
            { text: "Ask for a written report by end of week.", next: "c", score: 2, feedback: "Too slow: the hazard is active right now for everyone on site." },
          ],
        },
        b: {
          md: md`WBGT at the Block 14 work front reads 36 °C. The worker is stable in hospital. Records show he arrived on site 4 days ago.`,
          choices: [
            { text: "Require an incident investigation (root cause: acclimatisation not applied to a new arrival, work during peak WBGT), immediate actions (acclimatisation check for all workers who arrived in the last 14 days, shift realignment to early morning/evening), and report to MEWRE leadership the same day.", next: "d", score: 10, feedback: "You address the systemic cause, not just the individual, and keep leadership informed." },
            { text: "Ask the contractor to replace the worker and continue.", next: "c", score: 1, feedback: "The system failed, not the worker." },
          ],
        },
        c: {
          md: md`Two days later a second worker on another block is hospitalised with heat exhaustion. A labour inspection is announced.`,
          choices: [
            { text: "Suspend outdoor work during peak hours site-wide until the heat-stress programme is audited and corrected; cooperate fully with the inspection.", next: "d", score: 5, feedback: "Necessary, but a second casualty was avoidable." },
            { text: "Ask the contractor to keep the incident off the KPI report until the investigation finishes.", score: 0, feedback: "Concealment is an ethical and legal failure and destroys trust in all reported data." },
          ],
        },
        d: {
          md: md`The contractor now claims the new shift pattern will add 2 weeks and asks for an extension of time. How do you respond?`,
          choices: [
            { text: "Heat conditions in July were foreseeable and the contractor is responsible for safe working methods; an EOT is unlikely unless the contract or a change in law (e.g., new official restrictions) provides it. Ask for a recovery plan within safe working hours and record the HSE lessons.", score: 10, feedback: "Correct allocation: foreseeable climate is contractor risk under most EPC forms; a genuinely new legal restriction might be different — check the contract." },
            { text: "Grant 2 weeks to be fair.", score: 3, feedback: "Generous but sets a precedent that compensates the contractor for not planning for summer." },
          ],
        },
      },
    },
  ],
};

export default lesson;
