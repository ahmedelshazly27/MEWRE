import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz06-l04",
  title: "Hybrid plant integration projects: vendors, interface specs, controls FAT/SAT and failure points",
  summary:
    "How the controls of a PV+BESS plant actually get built: the parties and their scopes, why interfaces grow with the square of the vendor count, the documents that hold it together (interface matrix, ICD, signal lists, Modbus maps, IEC 61850 SCL), controls FAT with plant simulation and hardware-in-the-loop, SAT, point-to-point and grid-compliance tests, and the failure points that recur on almost every project. Written from the seat of a company that either integrates or supplies one of the boxes.",
  minutes: 80,
  objectives: [
    "You can list the parties in a hybrid plant's control system and the interface each pair creates.",
    "You can specify what an interface control document and an interface responsibility matrix must contain.",
    "You can plan a controls FAT with a simulated plant or hardware-in-the-loop and estimate its test matrix.",
    "You can estimate point-to-point test effort and show how templated blocks cut it.",
    "You can name the recurring failure points of hybrid integration and the question that exposes each one.",
  ],
  concepts: [
    {
      id: "mz06.integration-scope",
      name: "Parties and scope in hybrid controls",
      description:
        "Control centre (TSO), PV inverter OEM, BESS integrator (PCS, BMS, EMS), PPC and SCADA vendor or integrator, tracker vendor, substation protection and automation, met and soiling stations, cleaning robots, and the EPC that owns the whole.",
      competency: "mz-control",
      related: ["mz06.interface-spec"],
    },
    {
      id: "mz06.interface-spec",
      name: "Interface control documents and signal lists",
      description:
        "ICD per interface: protocol, physical link, register or data-object map, scaling, units, sign conventions, update rates, timeouts, failure behaviour, owner; plus the TSO signal list and the IEC 61850 SCD file under version control.",
      competency: "mz-control",
      related: ["mz06.integration-scope", "m06.protocols"],
    },
    {
      id: "mz06.interface-matrix",
      name: "Interface responsibility matrix",
      description:
        "One owner per interface, with RACI for design, configuration, testing and defects. Potential interfaces grow as n(n-1)/2 with the number of parties.",
      competency: "mz-control",
      related: ["mz06.interface-spec"],
    },
    {
      id: "mz06.controls-fat",
      name: "Controls FAT with plant simulation and HIL",
      description:
        "Factory acceptance of the PPC, EMS and SCADA against a simulated plant and grid (software-in-the-loop or hardware-in-the-loop with real-time simulators), covering modes, set-points, grid strengths and failure cases before site.",
      competency: "mz-control",
      related: ["m05.fat-sat", "mz06.ppc-performance"],
    },
    {
      id: "mz06.controls-sat",
      name: "SAT, point-to-point and grid-compliance tests",
      description:
        "Site acceptance: point-to-point checks from device to HMI and to the control centre, functional tests of each mode, then witnessed grid-compliance tests and a trial run before handover.",
      competency: "mz-control",
      related: ["m06.energisation", "m07.grid-compliance-tests"],
    },
    {
      id: "mz06.failure-points",
      name: "Recurring failure points in hybrid integration",
      description:
        "Sign conventions and scaling, register maps that change with firmware, time sync, EMS-PPC priority conflicts, weak-grid tuning, communication loss behaviour, unowned interfaces and late SCD changes.",
      competency: "mz-control",
      related: ["mz06.interface-spec", "mz06.controls-fat"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Many vendors, one plant",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan began as a controls and integration services idea, and the distribution thread (bringing PPC/EMS, BESS and cleaning-robot suppliers into Kuwait) still puts you inside integration projects. Whether you integrate or supply one box, the money is lost at the interfaces: delays at SAT, liquidated damages at COD, unpaid variations for scope nobody owned. Knowing where integration breaks lets you price, scope and sell around it, and it explains much of why the company moved towards products.`,
        },
        {
          kind: "xref",
          to: "m05-l05",
          note: "Track 0 covers BESS FAT and SAT from the owner's side, with safety and desert operation.",
        },
        {
          kind: "xref",
          to: "m07-l05",
          note: "Testing, commissioning, performance tests and COD for the whole plant, from the PM's side.",
        },
        {
          kind: "md",
          md: md`### The parties

| Party | Supplies | Typical interface out |
|---|---|---|
| Control centre (MEWRE) | Set-points, schedules | IEC 60870-5-104 to the plant gateway |
| PV inverter OEM | Inverters, data loggers, sometimes a PPC | Modbus TCP or IEC 61850 to PPC and SCADA |
| BESS integrator | PCS, BMS, containers, HVAC, fire system, EMS | Modbus TCP, IEC 61850, hard-wired trips |
| PPC / SCADA vendor or integrator | PPC, SCADA, historian, HMI, gateway | To everyone |
| Tracker vendor | Row controllers, network controllers, stow logic | Modbus TCP or vendor protocol to SCADA |
| Substation protection and automation | Relays, bay controllers, station computer | IEC 61850 MMS and GOOSE |
| Met and soiling stations | Irradiance, temperature, wind, soiling | Modbus, logger to SCADA |
| Cleaning robots | Robot fleet controller | Vendor cloud or Modbus |
| EPC | Owns the whole and the interfaces | Contract with the owner |

The number of potential pairwise interfaces grows with the square of the party count:`,
        },
        { kind: "equation", formula: "mz06-interface-count" },
        {
          kind: "md",
          md: md`Nine parties give 36 potential interfaces. Not all exchange data, but every pair can hide an assumption (who scales the value, who handles loss of communication, whose clock is master). The **interface responsibility matrix** names one owner per interface for design, configuration, testing and defect resolution.

### What an interface control document contains

For each interface, the **ICD** fixes:

- Physical link and network (fibre, switch ports, VLAN, IP plan) and the security zone and conduit.
- Protocol and version, and for Modbus the **register map**: address, data type, scaling, units, **sign convention** (is charging positive or negative?), read or write.
- For IEC 61850: logical nodes and data objects, reports and GOOSE, captured in the **SCD file** under version control.
- Update rate, timeouts, heartbeat, and **behaviour on communication loss** on both sides.
- Time source and timestamp location.
- Who changes it and how (change control, firmware versions it was tested against).

The **TSO signal list** is the special ICD between plant and control centre, agreed with MEWRE and tested point by point.

### The test sequence for controls`,
        },
        {
          kind: "flow",
          title: "Controls integration and test sequence",
          steps: [
            { label: "Functional specification", detail: "Modes, priorities, performance, grid-code clauses" },
            { label: "Interface matrix and ICDs", detail: "One owner per interface; register maps, SCD, signal list" },
            { label: "Software build and configuration", detail: "PPC, EMS, SCADA database, HMI, historian" },
            { label: "Controls FAT", detail: "Against a simulated plant and grid (SIL or HIL), real controllers and firmware" },
            { label: "Installation and point-to-point", detail: "Device to SCADA to HMI, and plant to control centre" },
            { label: "SAT functional tests", detail: "Each mode, set-point, ramp, comms-loss case on the real plant" },
            { label: "Grid-compliance tests", detail: "Witnessed by the TSO: P, Q, V, f response, ramp, SCADA commands" },
            { label: "Trial run and handover", detail: "Reliability run, punch list, as-built ICDs and settings" },
          ],
          caption: "Each box is a hold point. Defects found in FAT cost hours; the same defects found in grid-compliance tests cost weeks and the TSO's patience.",
        },
        {
          kind: "md",
          md: md`### Controls FAT with simulation

A controls FAT tests the real PPC and EMS hardware and software against a **simulated plant**: models of inverters, PCS, BMS, transformers, collector network and a grid equivalent with adjustable short-circuit ratio. **Software-in-the-loop (SIL)** runs everything in simulation; **hardware-in-the-loop (HIL)** connects the real controller to a real-time simulator through its actual communication interfaces. The test matrix is the product of modes, set-point levels and grid conditions, plus failure cases (loss of POI meter, loss of a block, loss of control-centre link, BESS at SoC limits).

### Point-to-point testing effort`,
        },
        { kind: "equation", formula: "mz06-test-effort" },
        {
          kind: "md",
          md: md`The control-centre signal list (hundreds of points) is always tested one by one with MEWRE's control room on the line. Internal plant points (tens of thousands) are tested **by type**: if the power blocks are built from one template, fully test a few blocks and sample the rest. Templating is the single biggest lever on commissioning time, and it is also what turns integration work into a repeatable product.`,
        },
        { kind: "sources", refs: ["mz06-r3", "mz06-r4", "mz06-r1"] },
      ],
    },
    {
      layer: "applied",
      title: "Interfaces, FAT matrix and commissioning effort",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Point-to-point effort with and without templating",
          given: md`Illustrative hybrid plant: 160 power blocks, 60 SCADA points each (9,600 points); 1.5 min per point; 2 crews; 10-hour site days. Control-centre signal list 450 points at 4 min each, with one crew and MEWRE's control room available 6 h per day.`,
          steps: [
            { md: md`Full internal test: $T = 9{,}600 \times 1.5 / (60 \times 2) = 120$ h, which is 12 site days.` },
            { md: md`Templated: fully test 3 blocks (180 points) and sample 10 % of the other 9,420 points: $180 + 942 = 1{,}122$ points.` },
            { md: md`$T = 1{,}122 \times 1.5 / 120 = 14.0$ h, under 2 site days.` },
            { md: md`Control-centre list: $450 \times 4 / 60 = 30$ h, so 5 days at 6 h/day, set by MEWRE's availability, not the crew.` },
          ],
          result: md`Templating cuts internal point-to-point by about 88 %, but only if the blocks really are identical (same firmware, same register map, same tag naming). The control-centre tests are on the critical path regardless; book the control-room windows early.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Sizing a hardware-in-the-loop FAT",
          given: md`Illustrative PPC/EMS FAT: 7 control modes (P set-point, ramp, LFSM-O, FSM with BESS, Q set-point, PF, V-slope), 4 set-point levels each, 3 grid strengths (SCR 3, 5 and 10). 15 minutes per case including set-up and record. 7 hours of testing per day.`,
          steps: [
            {
              md: md`Cases: $7 \times 4 \times 3 = 84$.`,
              hidden: true,
              check: { prompt: "Number of test cases", answer: 84, unit: "cases", tolerance: { abs: 0 } },
            },
            {
              md: md`Time: $84 \times 15 / 60 = 21$ h.`,
              hidden: true,
              check: { prompt: "Test hours", answer: 21, unit: "h", tolerance: { rel: 0.01 } },
            },
            { md: md`Days: $21/7 = 3$ days, before failure cases (loss of meter, comms, block, SoC limits), which typically add another 1 to 2 days.` },
          ],
          result: md`About a week of FAT for the control functions. Cheap compared with discovering a weak-grid oscillation during witnessed grid tests. Insist the FAT uses the **firmware versions that will be installed**, and that the SCR 3 case is in the matrix.`,
        },
        {
          kind: "question",
          question: {
            id: "mz06-l04-p1",
            type: "numeric",
            prompt: md`A plant's controls involve 6 parties: control centre, inverter OEM, BESS integrator, PPC/SCADA vendor, tracker vendor and substation automation. How many potential pairwise interfaces exist?`,
            answer: 15,
            unit: "interfaces",
            tolerance: { abs: 0 },
            explanation: md`$6 \times 5 / 2 = 15$. Adding a cleaning-robot vendor and a soiling analytics provider takes it to $8 \times 7/2 = 28$, which is why each new supplier must arrive with an ICD and an owner.`,
            concepts: ["mz06.interface-matrix"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Where integration breaks and how to protect yourself",
      blocks: [
        {
          kind: "md",
          md: md`### Recurring failure points

| Failure point | Symptom | Question that exposes it |
|---|---|---|
| **Sign and scaling** | BESS charges when told to discharge; Mvar off by 10 | "Show me the sign convention and scaling for every P and Q register." |
| **Register maps change with firmware** | Values wrong after an inverter update | "Which firmware version is this map valid for, and who tells us when it changes?" |
| **Time sync** | Sequence-of-events out of order; irradiance and power misaligned | "What is the master clock and the accuracy at each device?" |
| **EMS vs PPC priority** | Frequency headroom eaten by a discharge schedule | "Where is the written priority table?" |
| **Weak-grid tuning** | Voltage oscillation at the POI in SAT | "Was SCR 3 tested in FAT with installed firmware?" |
| **Comms-loss behaviour** | Plant runs at last set-point for hours after link loss | "What does each device do after 10 s, 60 s, 10 min without comms?" |
| **Unowned interfaces** | Tracker to SCADA alarms never configured | "Who owns this interface in the matrix?" |
| **Late SCD changes** | GOOSE trip lost after a relay replacement | "Is the SCD file under version control, and who approves changes?" |
| **Heat and dust** | Switch and controller failures in hot, dusty kiosks | "What are the temperature ratings and enclosure IP class of network equipment?" |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "The classic commercial trap",
          md: md`The controls package is a small share of plant capex but sits on the critical path to COD. An integrator who signs up to "full integration" for a fixed price inherits every other vendor's late register map and firmware change, and the EPC's liquidated damages flow down to the party that is last to finish, which is usually controls. Price interface risk explicitly, limit liability to your own scope and make other vendors' deliverables (ICDs, maps, firmware freezes) **conditions precedent** in your contract.`,
        },
        {
          kind: "checklist",
          title: "If Mizan supplies a box into someone else's integration",
          items: [
            "Deliver your ICD before contract signature, with register map, sign conventions, rates and failure behaviour.",
            "Name your interface owner and the EPC's owner on the other side in the matrix.",
            "Freeze the firmware version you will deliver and state how changes are announced.",
            "Offer a simulation or HIL model of your function for the integrator's FAT.",
            "Define SAT pass criteria for your function in measurable terms.",
            "Limit liability to your scope and list the other parties' deliverables you depend on.",
          ],
        },
        {
          kind: "ask",
          title: "Questions at the kick-off of a hybrid controls package",
          items: [
            "Who is the single owner of the interface matrix, and when is it frozen?",
            "Which ICDs exist today, and which vendors have not delivered one?",
            "What firmware versions are frozen for FAT, and what is the change process after FAT?",
            "Will the FAT use HIL with the installed firmware, and is a low-SCR case included?",
            "When are MEWRE control-room windows booked for signal-list tests and grid-compliance tests?",
          ],
        },
        { kind: "scenario", scenario: "mz06-s1" },
        {
          kind: "question",
          question: {
            id: "mz06-l04-p2",
            type: "short",
            prompt: md`Mizan is preparing, as distributor, to offer a third-party PPC/EMS product to an EPC for a future Kuwait PV+BESS plant. Write (a) the **interface responsibility matrix** for the PPC/EMS package (at least six interfaces, with owner and what "done" means) and (b) **five FAT acceptance criteria** with measurable pass conditions. Illustrative values are fine.`,
            rubric: [
              "Matrix covers at least six real interfaces (control centre gateway, inverter OEM, BESS PCS/BMS, tracker controller, substation automation or POI meter, historian or SCADA) with one named owner each.",
              "Defines done per interface (ICD approved, register map tested in FAT, point-to-point passed at SAT).",
              "FAT criteria are measurable (e.g. P step to 90 % within X s, accuracy within Y % of rating, no oscillation at SCR 3, defined behaviour within Z s of comms loss).",
              "Includes failure cases (loss of POI meter, loss of control-centre link, BESS at SoC limit).",
              "Protects Mizan commercially: dependencies on other vendors' deliverables are explicit; liability limited to the distributed product's scope.",
            ],
            modelAnswer: md`**(a) Interface matrix (illustrative).** 1. Control centre to gateway (IEC 60870-5-104): owner SCADA integrator; done = signal list approved by MEWRE and all points tested with the control room. 2. PPC to PV inverters (Modbus TCP): owner PPC vendor via Mizan; inverter OEM delivers map; done = map validated in HIL with frozen firmware, SAT P2P passed. 3. PPC/EMS to BESS PCS and BMS: owner PPC vendor; BESS integrator delivers ICD incl. sign convention and SoC limits; done = charge and discharge commands verified in FAT and SAT. 4. PPC to POI meters (main and redundant): owner EPC electrical; done = meter values match test set within 0.5 %, switchover tested. 5. PPC to tracker controller (availability and stow state): owner tracker vendor; done = stow state and available capacity reach the PPC within 2 s. 6. PPC/EMS to SCADA and historian: owner SCADA integrator; done = all PPC tags trended, alarms rationalised. **(b) FAT criteria.** 1. P set-point step 50 to 100 %: 90 % of the step within 10 s at the ramp limit, steady-state error within 1 % of rating. 2. V-slope control at SCR 3: Q step to 90 % in under 5 s, overshoot under 10 %, no sustained oscillation. 3. FSM with BESS: droop response within 2 s matching R = 4 % within 5 %. 4. Loss of POI meter: switchover to redundant meter within 1 s or outputs frozen with alarm. 5. Loss of control-centre link: hold last set-point and alarm within 5 s; go to configured default after 30 min. **Commercial note:** Mizan's obligations are conditional on receipt of inverter, BESS and tracker ICDs and frozen firmware by the FAT date; liability is limited to the distributed PPC/EMS product.`,
            explanation: md`An integration package succeeds when every interface has one owner and a testable definition of done, and when acceptance criteria are numbers rather than adjectives. For a distributor, the contract must make other vendors' deliverables explicit dependencies.`,
            concepts: ["mz06.interface-matrix", "mz06.controls-fat", "mz06.interface-spec"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a new Mizan hire why the controls package, which is a small part of plant cost, so often causes the plant to miss its commercial operation date.",
          keyPoints: [
            "Controls connect every vendor, so interfaces grow with the square of the number of parties.",
            "Controls are tested last, after everyone else's hardware and firmware is in place.",
            "Late maps, firmware changes and unowned interfaces surface at SAT and grid tests.",
            "Grid-compliance tests depend on TSO availability and must pass before COD.",
            "FAT with simulation and an interface matrix with one owner each prevent most of this.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz06-l04-q1",
      type: "order",
      prompt: "Put the controls test sequence in order.",
      items: ["Controls FAT with simulated plant", "Point-to-point checks on site", "SAT functional tests of each mode", "Witnessed grid-compliance tests", "Trial run and handover"],
      explanation: md`Factory first, then wiring and data paths, then functions on the real plant, then TSO-witnessed compliance, then the reliability run.`,
      concepts: ["mz06.controls-fat", "mz06.controls-sat"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz06-l04-q2",
      type: "mcq",
      prompt: "What distinguishes hardware-in-the-loop (HIL) from software-in-the-loop (SIL) testing?",
      options: [
        "HIL is done on site after energisation.",
        "HIL connects the real controller hardware, through its real communication interfaces, to a real-time plant and grid simulator.",
        "HIL tests only the HMI screens.",
        "HIL does not need a grid model.",
      ],
      answer: 1,
      explanation: md`SIL runs controller code inside the simulation; HIL tests the actual box, firmware and timing.`,
      concepts: ["mz06.controls-fat"],
      difficulty: 1,
    },
    {
      id: "mz06-l04-q3",
      type: "multi",
      prompt: "Which items belong in a Modbus interface control document?",
      options: ["Register addresses and data types", "Scaling and units", "Sign convention for charge and discharge", "Behaviour on communication loss", "The plant's levelised cost of energy"],
      answer: [0, 1, 2, 3],
      explanation: md`An ICD fixes everything both sides must agree on for the data to mean the same thing and fail safely. LCOE is irrelevant.`,
      concepts: ["mz06.interface-spec"],
      difficulty: 1,
    },
    {
      id: "mz06-l04-q4",
      type: "numeric",
      prompt: md`A control-centre signal list has 600 points at 3 minutes each. MEWRE's control room is available 5 hours per day for testing. How many days does the signal-list test take?`,
      answer: 6,
      unit: "days",
      tolerance: { abs: 0.1 },
      explanation: md`$600 \times 3/60 = 30$ h; $30/5 = 6$ days. The bottleneck is the control room's availability.`,
      concepts: ["mz06.controls-sat"],
      difficulty: 1,
    },
    {
      id: "mz06-l04-q5",
      type: "decision",
      prompt: md`Illustrative. Mizan, as distributor of a PPC product, is asked by the EPC to sign a fixed-price "full plant controls integration" scope with liquidated damages tied to COD. The inverter and BESS vendors have not delivered ICDs. What do you do?`,
      options: [
        { text: "Sign: it is a large contract and you can manage the other vendors.", score: 0, feedback: "You inherit every other party's delays and the LDs that flow down to the last party to finish." },
        { text: "Offer the PPC/EMS scope with your ICD, make other vendors' ICDs and firmware freezes conditions precedent, and limit liability to your scope; quote integration as a separate, time-and-materials or capped service.", score: 1, feedback: "Captures the business while pricing and bounding interface risk." },
        { text: "Decline any involvement.", score: 0.3, feedback: "Safe but walks away from a distribution sale you could have scoped properly." },
      ],
      explanation: md`Interface risk is real and must be priced or excluded. Conditions precedent and liability caps are the tools.`,
      concepts: ["mz06.interface-matrix", "mz06.failure-points"],
      difficulty: 2,
    },
    {
      id: "mz06-l04-q6",
      type: "mcq",
      prompt: "During SAT the BESS charges when the PPC commands discharge. Which failure point is the most likely cause?",
      options: ["Weak-grid tuning", "Sign convention mismatch in the register map", "Alarm flood", "Historian compression"],
      answer: 1,
      explanation: md`Positive-for-discharge versus positive-for-charge disagreements are among the most common integration defects, and the ICD exists to prevent them.`,
      concepts: ["mz06.failure-points"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz06-l04-f1", front: "Potential interfaces among n parties", back: md`$N_i = n(n-1)/2$; 9 parties give 36.`, concepts: ["mz06.interface-matrix"] },
    { id: "mz06-l04-f2", front: "What an ICD must fix", back: "Link and zone, protocol, register or data-object map, scaling, units, sign convention, rates, timeouts, comms-loss behaviour, time source, owner, firmware version.", concepts: ["mz06.interface-spec"] },
    { id: "mz06-l04-f3", front: "Why HIL in controls FAT", back: "Tests the real controller, firmware and timing against a simulated plant and grid (including low SCR and failure cases) before site.", concepts: ["mz06.controls-fat"] },
    { id: "mz06-l04-f4", front: "Biggest lever on point-to-point effort", back: "Templated, identical power blocks: fully test a few, sample the rest (about 88 % less effort in the worked example).", concepts: ["mz06.controls-sat"] },
    { id: "mz06-l04-f5", front: "SCD file", back: "IEC 61850 substation configuration description: the engineering file of all IEDs and GOOSE messages; must be under version control.", concepts: ["mz06.interface-spec"] },
    { id: "mz06-l04-f6", front: "How to protect a controls contract from others' delays", back: "Make other vendors' ICDs and firmware freezes conditions precedent; cap liability to your scope; price integration separately.", concepts: ["mz06.failure-points", "mz06.interface-matrix"] },
  ],
  scenarios: [
    {
      id: "mz06-s1",
      title: "Oscillation at the POI during SAT",
      dayInLife: true,
      context: md`Illustrative. Mizan is the local distributor and support partner for the PPC on a PV+BESS plant in the Gulf. During SAT, switching the PPC to voltage control with slope makes POI voltage and Q oscillate at about 1 Hz. The inverter OEM says the PPC is badly tuned; the PPC vendor says the inverters' internal Q loop is too fast. The EPC's controls lead calls you: grid-compliance tests are booked with the TSO in nine days.`,
      start: "a",
      concepts: ["mz06.failure-points", "mz06.controls-fat", "mz06.voltage-q-control"],
      nodes: {
        a: {
          md: md`What is your first move?`,
          choices: [
            { text: "Ask for the FAT records: was V-slope control tested at a low SCR with the installed inverter firmware?", next: "b", score: 9, feedback: "Facts first. If the low-SCR case was never tested, you know where the gap is." },
            { text: "Tell the PPC vendor to halve its gains immediately so the oscillation stops.", next: "c", score: 4, feedback: "May stop the oscillation but may also make the plant fail the response-time test. Changing settings without analysis repeats the mistake." },
            { text: "Side with your vendor publicly and blame the inverter OEM.", next: "c", score: 1, feedback: "Loyalty without evidence damages your credibility with the EPC, who is your real customer." },
          ],
        },
        b: {
          md: md`The FAT report shows V-slope tests only at SCR 10, and with an older inverter firmware. The site's SCR at the POI is about 3. What now?`,
          choices: [
            { text: "Propose a joint session: PPC vendor and inverter OEM reproduce the case in the HIL model at SCR 3 with the installed firmware, tune together, then verify on site at reduced power before the TSO tests.", next: "d", score: 10, feedback: "Moves the problem to where it can be solved quickly and safely, and makes both vendors own the fix." },
            { text: "Ask the TSO to postpone the grid-compliance tests by two months.", next: "d", score: 4, feedback: "May become necessary, but asking before trying the quick fix burns goodwill and the EPC's schedule." },
          ],
        },
        c: {
          md: md`The gains are halved. The oscillation disappears, but the Q response now takes 14 s to reach 90 %, against a requirement of under 5 s. What do you do?`,
          choices: [
            { text: "Go back to the evidence: reproduce the case in HIL at SCR 3 with installed firmware and tune both loops jointly.", next: "d", score: 8, feedback: "Recovers the right path, a few days later than necessary." },
            { text: "Hope the TSO does not notice the slow response.", score: 0, feedback: "Witnessed tests measure exactly this. Failing them delays COD further." },
          ],
        },
        d: {
          md: md`The joint HIL session finds the inverter Q loop and the PPC loop have overlapping bandwidths. The OEM slows its internal loop slightly, the PPC is retuned, and the site test at reduced power passes with 3.5 s response and no oscillation. What do you take away for Mizan?`,
          choices: [
            { text: "Make low-SCR HIL with frozen firmware a standard FAT requirement in every PPC offer Mizan makes, and include a tuning service in the quote.", score: 10, feedback: "Turns a painful lesson into a product standard and a priced service." },
            { text: "Nothing: it was the vendors' problem.", score: 2, feedback: "Your name was on the support contract. The next customer will ask how you prevent this." },
          ],
        },
      },
    },
  ],
};

export default lesson;
