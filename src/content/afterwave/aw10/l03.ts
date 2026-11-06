import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw10-l03",
  title: "Robot safety: ISO 10218:2025, collaborative applications and the humanoid gap",
  summary:
    "What industrial robot makers and integrators must show: ISO 10218-1 and -2 (2025 editions), stop categories and safe drive functions, the four collaborative modes, power and force limiting with the ISO/TS 15066 body model and speed limit equation, speed and separation monitoring, safety distances from ISO 13855, and why legged and humanoid robots break the old assumptions while ISO 25785-1 is still a draft.",
  minutes: 75,
  objectives: [
    "Explain what ISO 10218-1 (robot) and ISO 10218-2 (robot application and integration) each cover, and what changed in 2025",
    "Name the four collaborative modes and the safety function each relies on",
    "Compute a permissible contact speed for power and force limiting from body-region limits, stiffness and effective masses",
    "Compute a protective separation distance and an ISO 13855 safety distance for a light curtain",
    "Explain why a dynamically stable humanoid has no simple safe state and state the November 2026 status of humanoid standards",
  ],
  concepts: [
    { id: "aw10.iso-10218", name: "ISO 10218-1/-2:2025", description: "The industrial robot safety standard in two parts: part 1 for the robot (manufacturer), part 2 for the robot application and cell (integrator). The 2025 second edition extends the functional safety requirements (SIL 2 alongside PL d, category 3) and absorbs the collaborative-application content of ISO/TS 15066.", competency: "aw-safety", related: ["aw10.plr-risk-graph", "aw10.sil-bands"] },
    { id: "aw10.collaborative-modes", name: "Collaborative modes", description: "Ways a robot shares space with people: safety-rated monitored stop, hand guiding, speed and separation monitoring, and power and force limiting. Collaboration is a property of the application, not of the robot.", competency: "aw-safety", related: ["aw10.iso-10218"] },
    { id: "aw10.pfl-limits", name: "Power and force limiting (PFL)", description: "Collaborative mode where contact may occur but force and pressure stay below body-region biomechanical limits; the permissible speed follows from the limit force, the body region's stiffness and the reduced mass of robot and body part.", competency: "aw-safety", related: ["aw10.collaborative-modes"] },
    { id: "aw10.separation-distance", name: "Protective separation and safety distance", description: "Minimum distance between person and hazard so the machine is stopped before contact: speed and separation monitoring for robots, and ISO 13855 S = K T + C for guards and protective devices.", competency: "aw-safety", related: ["aw10.collaborative-modes", "aw10.safety-function"] },
    { id: "aw10.stop-categories", name: "Stop categories and safe drive functions", description: "IEC 60204-1 stop categories 0 (immediate power removal), 1 (controlled stop then power removal) and 2 (controlled stop, power kept), implemented with IEC 61800-5-2 drive functions such as STO, SS1, SS2 and SLS.", competency: "aw-safety", related: ["aw10.safety-function"] },
    { id: "aw10.humanoid-standards", name: "Humanoid safety standards gap", description: "Dynamically stable robots fall when power is removed, so the classic safe state fails. ISO 25785-1 (industrial mobile robots with actively controlled stability) is a committee draft in late 2026; no third-party certification against it exists yet.", competency: "aw-safety", related: ["aw10.stop-categories", "aw10.iso-10218"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The robot standards stack",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Robotics and humanoid test teams are Afterwave's lead customers, and their test plans are shaped by these documents: protective stop timing, speed limits, contact force measurements on a force gauge, fall tests. The humanoid companies are in an unusual place: deploying in factories (pilots are public) while the standard written for them is still a draft. That gap is a sales opening for evidence infrastructure and a reputational trap for anyone who overclaims. You need to know exactly what exists, what does not, and the numbers behind collaborative safety.`,
        },
        {
          kind: "md",
          md: md`### ISO 10218: two parts, two owners

- **ISO 10218-1:2025, robots**: the manufacturer's obligations for the robot itself (the arm and its controller): protective stop, emergency stop, speed and force monitoring functions, singularity and axis limiting, the performance of each safety function.
- **ISO 10218-2:2025, robot applications and robot cells**: the integrator's obligations for the whole application: layout, guarding, risk assessment of the task, the end effector and the workpiece, collaborative operation.

The second editions were **published in February 2025** and replace the 2011 versions. Changes relevant to you (from ISO and the A3 FAQ, March 2025):

- Functional safety requirements are spelled out per safety function. The default integrity remains **PL d with category 3** structure, and **SIL 2** (with hardware fault tolerance 1) is accepted as an alternative route.
- The collaborative content of **ISO/TS 15066:2016** (power and force limiting limits, speed and separation monitoring) is folded into the standard.
- The language shifts from "collaborative robot" to **collaborative application**: a robot arm sold as a cobot is not safe for collaboration by itself; a knife on its flange makes the application dangerous at any force.

### Stopping, precisely

Machinery stop categories come from IEC 60204-1:

| Stop category | What happens | Typical drive function (IEC 61800-5-2) |
|---|---|---|
| 0 | Immediate removal of power to actuators; uncontrolled coast or brake | **STO** safe torque off |
| 1 | Controlled deceleration, then power removed | **SS1** safe stop 1 |
| 2 | Controlled deceleration, power kept, standstill monitored | **SS2** safe stop 2 with **SOS** safe operating stop |

Plus monitoring functions such as **SLS** (safely limited speed) and **SBC** (safe brake control). A robot's protective stop is usually category 1 or 2 so it can resume without re-homing. Every one of these is a function with a reaction time and a stopping distance, and every stopping distance changes with payload, speed, brake wear and firmware. That is why stop-time tests are run again and again.

### The four collaborative modes

| Mode | Idea | Safety function behind it |
|---|---|---|
| Safety-rated monitored stop | Robot stops when a person enters the shared space and stays stopped | Presence detection plus SOS |
| Hand guiding | Person moves the robot by hand with an enabling device | Enabling device, SLS |
| Speed and separation monitoring (SSM) | Robot slows and stops as a person approaches | Distance sensing, SLS, protective stop |
| Power and force limiting (PFL) | Contact allowed but kept below biomechanical limits | Force or torque monitoring, speed limits, design (padding, no edges) |`,
        },
        {
          kind: "md",
          md: md`### Power and force limiting: the physics

ISO/TS 15066 (now carried in ISO 10218-2) gives a **body model** with about 29 regions, each with a maximum permissible force and pressure for **quasi-static contact** (the person is clamped) and higher values for **transient contact** (the person can recoil; the transient values are typically twice the quasi-static ones). Examples of the quasi-static force limits often quoted from the TS: skull and forehead 130 N, chest 140 N, hands and fingers 140 N. Pressure limits (N/cm²) usually bind first on sharp or small contact areas.

For transient contact the robot's kinetic energy is absorbed by the body region modelled as a spring of stiffness $k$. Equating the energy $\tfrac12 \mu v^2$ with the spring energy $F^2/(2k)$ gives the maximum relative speed:`,
        },
        { kind: "equation", formula: "aw10-reduced-mass" },
        { kind: "equation", formula: "aw10-pfl-speed" },
        {
          kind: "md",
          md: md`with the robot's effective mass approximated in the TS as $m_R = M/2 + m_L$ (half the total moving mass plus the payload). Typical model values: hand, $k = 75$ N/mm and effective mass 0.6 kg; chest, $k = 25$ N/mm and 40 kg.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check the limit values against the standard",
          md: md`The force limits, stiffness and body masses quoted here are the commonly cited ISO/TS 15066:2016 Annex A values. They are used for teaching. Before using any value for a customer's application, read it from the licensed copy of ISO 10218-2:2025, whose annex now carries this content and may have changed values or method.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Permissible transient contact speed vs robot effective mass",
          xKey: "mass",
          xLabel: "Robot effective mass m_R (kg)",
          yLabel: "Max relative speed (m/s)",
          series: [
            { key: "hand", label: "Hand (280 N, 75 N/mm, 0.6 kg)" },
            { key: "chest", label: "Chest (280 N, 25 N/mm, 40 kg)" },
          ],
          data: [
            { mass: 5, hand: 1.4, chest: 0.84 },
            { mass: 10, hand: 1.36, chest: 0.63 },
            { mass: 20, hand: 1.34, chest: 0.48 },
            { mass: 40, hand: 1.33, chest: 0.4 },
          ],
          caption: "Computed with the transient force at twice the 140 N quasi-static limit. For the light hand, the reduced mass is set by the hand itself and the robot's mass barely matters; for the heavy chest, a heavier robot must move much slower. A humanoid's moving mass is far larger than an arm's, so PFL alone rarely works for whole-body contact.",
        },
        {
          kind: "md",
          md: md`### Separation: SSM and ISO 13855

For speed and separation monitoring the robot must be able to stop before the person arrives. The protective separation distance adds the person's travel during the robot's reaction and stopping time, the robot's travel during its reaction, its stopping distance, and allowances for intrusion and measurement uncertainty:`,
        },
        { kind: "equation", formula: "aw10-ssm-distance" },
        {
          kind: "md",
          md: md`For fixed protective devices such as light curtains, ISO 13855 gives the minimum mounting distance:`,
        },
        { kind: "equation", formula: "aw10-iso13855" },
        {
          kind: "md",
          md: md`### Humanoids: where the assumptions break

ISO 10218 was written for robots bolted to the floor, and its safe state is "stopped". A **dynamically stable** robot (legged, humanoid, self-balancing) keeps itself upright with active control. Remove power (stop category 0) and it falls; a 60 kg robot whose centre of mass drops 1 m releases $E = mgh \approx 590$ J, about a hundred times the kinetic energy of a 12 kg arm moving at 1 m/s (6 J). So the safety functions are different: controlled crouch or sit, safe fall direction, fall detection, limits on stored energy, and stability itself becomes safety-relevant.

Status in November 2026 (from the research brief, sources dated):

| Document | Scope | Status |
|---|---|---|
| ISO 25785-1 (ISO/TC 299) | Industrial mobile robots with actively controlled stability (legged, humanoid, balancing) | **Not published**: committee draft / working draft stage per 2026 sources; no confirmed publication date; "late 2026 to 2027" is unverified |
| IEEE humanoid study group report (Sep 2025) | Pathway to future humanoid standards | Published; notes a lack of standardised test methods for balance and recovery safety functions |
| ANSI/CAN/UL 3300 | Service, communication, information, education and entertainment robots | Binational consensus standard (2024); current edition unverified |
| ISO 10218-1/-2:2025 | Industrial robots and applications | Published Feb 2025; does not cover dynamically stable mobile robots |

Other documents customers cite: ISO 3691-4 (driverless industrial trucks), ANSI/A3 R15.08 (industrial mobile robots), ISO 13482 (personal care robots). Mid-2026 reporting says no third-party certification against a humanoid-specific standard is available, and South Korea announced it is building a humanoid safety certification centre (July 2026).`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Humanoid standard dates move",
          md: md`The ISO 25785-1 stage and target date come from secondary sources (i-SCOOP, a Physical AI Journal deployment report, mid-2026). Check the ISO/TC 299 work programme before stating a stage or date to a customer or investor.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Contact speeds and safety distances",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Permissible speed for transient hand contact",
          given: md`Illustrative collaborative assembly cell. Robot moving mass $M = 20$ kg, payload $m_L = 2$ kg. Body region: hand, quasi-static limit 140 N, transient limit taken as twice that (280 N), $k = 75$ N/mm $= 75{,}000$ N/m, $m_H = 0.6$ kg.`,
          steps: [
            { md: md`Robot effective mass: $m_R = M/2 + m_L = 10 + 2 = 12$ kg.` },
            { md: md`Reduced mass: $\mu = (1/0.6 + 1/12)^{-1} = (1.667 + 0.083)^{-1} = 0.571$ kg.` },
            { md: md`Maximum relative speed: $v = F/\sqrt{\mu k} = 280/\sqrt{0.571 \times 75{,}000} = 280/207 = 1.35$ m/s.` },
            { md: md`Same robot against the chest ($k = 25{,}000$ N/m, $m_H = 40$ kg, 280 N): $\mu = (1/40 + 1/12)^{-1} = 9.23$ kg, $v = 280/\sqrt{9.23 \times 25{,}000} = 0.58$ m/s.` },
            { md: md`The application must limit speed to the most restrictive body region that can be reached in the task (here 0.58 m/s if the chest is reachable), and check pressure limits for the actual contact geometry. Then the force must be **measured**: a biofidelic force and pressure gauge on each contact point, repeated whenever the program, tool or speed changes.` },
          ],
          result: md`About 1.35 m/s for the hand and 0.58 m/s for the chest. The calculation sets a design target; the evidence an assessor accepts is the measured contact force at each hazard point, with configuration recorded.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Light curtain on a humanoid fall-test cell",
          given: md`Illustrative. Light curtain resolution $d = 30$ mm, response time 15 ms, test-rig drive stop time 235 ms, so $T = 0.25$ s. ISO 13855: $C = 8(d - 14)$ mm for $d \le 40$ mm; first try $K = 2{,}000$ mm/s; if $S > 500$ mm recalculate with $K = 1{,}600$ mm/s, with a minimum of 500 mm.`,
          steps: [
            { md: md`Intrusion allowance: $C = 8 \times (30 - 14) = 128$ mm.` },
            {
              md: md`First try: $S = 2{,}000 \times 0.25 + 128 = 628$ mm, which is above 500 mm.`,
              hidden: true,
              check: { prompt: "S with K = 2000 mm/s", answer: 628, unit: "mm", tolerance: { abs: 1 } },
            },
            {
              md: md`Recalculate: $S = 1{,}600 \times 0.25 + 128 = 528$ mm, which is at least 500 mm, so $S = 528$ mm.`,
              hidden: true,
              check: { prompt: "Final safety distance", answer: 528, unit: "mm", tolerance: { abs: 1 } },
            },
            { md: md`If a firmware change raises the stop time to 335 ms, $T = 0.35$ s and $S = 1{,}600 \times 0.35 + 128 = 688$ mm: the curtain is now 160 mm too close. A stop-time regression silently invalidates the guard layout.` },
          ],
          result: md`Mount the curtain at least 528 mm from the hazard. The stop time is a measured input; every change that can affect it (drive firmware, brake, payload) should trigger a stop-time retest.`,
        },
        {
          kind: "question",
          question: {
            id: "aw10-l03-p1",
            type: "numeric",
            prompt: md`Speed and separation monitoring, illustrative values: human speed 1.6 m/s, robot system reaction time 0.1 s, robot stopping time 0.3 s, robot speed 1.0 m/s, robot stopping distance 0.15 m, intrusion distance 0.1 m, position uncertainty allowance 0.1 m (total for both). What is the protective separation distance in metres?`,
            answer: 1.09,
            tolerance: { abs: 0.01 },
            unit: "m",
            explanation: md`$S_h = 1.6 \times (0.1 + 0.3) = 0.64$ m; $S_r = 1.0 \times 0.1 = 0.10$ m; $S_s = 0.15$ m; $C + Z = 0.2$ m. Total $S_p = 1.09$ m. The person's travel during reaction and stopping dominates, which is why shorter stopping times buy more floor space than anything else.`,
            concepts: ["aw10.separation-distance"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Robot safety testing in practice",
      blocks: [
        {
          kind: "md",
          md: md`### What robot and humanoid test teams actually measure

- **Stopping time and distance** per axis at several speeds, payloads and extensions (ISO 10218-1 requires the manufacturer to provide them). Measured with encoders or external tracking on one clock with the stop signal.
- **Contact force and pressure** for PFL applications, with a force and pressure measurement device at each reachable contact point.
- **Safety-function response** to faults: injected sensor faults, communication loss, encoder disagreement.
- **For humanoids**: fall tests (push recovery, slip, power loss), controlled-shutdown behaviour, battery and actuator thermal limits, and repeated regression after every locomotion-policy change.

Every one of these is a time-synchronised measurement of a control signal and a physical response, captured many times and re-captured after changes: Lockstep's core shape. Bench memory of stop times across firmware versions is also how a team spots drift (brake wear, a slower controller loop) before it breaks a safety distance.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **"It is a cobot, so it is safe"**: the robot's PFL capability does not make a cell with a sharp gripper or a heavy part collaborative. ISO 10218-2 judges the application.
- **Speeds from calculation, never measured**: the TS 15066 equation is a design aid; the evidence is the measured force.
- **Stop times measured once**: at commissioning, with a new brake and light payload, never again.
- **Humanoid claims ahead of standards**: "compliant with ISO 25785" cannot be true for a standard that is not published.`,
        },
        { kind: "scenario", scenario: "aw10-s1" },
        {
          kind: "ask",
          title: "Questions for a humanoid customer's safety lead",
          items: [
            "What is your robot's safe state when a fault is detected while walking, and how long does it take to reach it?",
            "Which safety functions are implemented to which PL or SIL today, and on which standard do you base the claim while ISO 25785-1 is a draft?",
            "How do you test fall behaviour and push recovery, and how often do you rerun those tests after a locomotion policy update?",
            "Which deployment customer or integrator is asking for what evidence (ISO 10218-2 risk assessment, CE file, internal audit)?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw10-l03-p2",
            type: "short",
            prompt: md`Write the **test evidence plan** (one page) that a humanoid company could use today, before ISO 25785-1 is published, to support a factory pilot's risk assessment: which safety functions to define, which tests to run and repeat, which existing standards to borrow from and what to record, and how you would phrase the claim honestly. Frame it as Afterwave would propose it to a design partner (illustrative, no real customer).`,
            rubric: [
              "Defines specific safety functions suited to a dynamically stable robot (controlled stop or crouch, speed limiting near people, fall detection or safe fall, protective stop on zone entry)",
              "Borrows correctly from existing standards (ISO 10218-2 risk assessment and collaborative content, IEC 60204-1 stop categories, ISO 13849-1 or IEC 62061 for integrity, ISO 13855 for distances) and says why each applies",
              "Specifies measured tests (stop times, contact forces, push recovery, power-loss behaviour) with conditions and repetition after changes",
              "Records configuration and context with every run (software and policy version, payload, floor, battery state) for traceability",
              "States the claim honestly: risk assessment informed by named standards, ISO 25785-1 tracked as a draft, no compliance claim",
              "Positions Afterwave as the capture and traceability layer, with the customer owning the safety decisions",
            ],
            modelAnswer: md`**Interim safety evidence plan for a humanoid factory pilot (illustrative).**

**Safety functions** (each with trigger, safe state, reaction time, target PL): SF1 protective stop on entry to the robot's working zone, reaching a statically stable crouch within 1.0 s; SF2 safely limited speed (0.5 m/s walking, 0.25 m/s arm) when a person is within 2 m; SF3 fall detection with controlled sit or directed fall away from the person; SF4 emergency stop as category 1 (controlled crouch then torque off), not category 0; SF5 battery and actuator over-temperature limiting. Targets set with the ISO 13849-1 risk graph, typically PL d.

**Borrowed standards and why**: ISO 12100 for the risk assessment method; ISO 10218-2:2025 for the application-level risk assessment, collaborative modes and body-region contact limits; IEC 60204-1 for stop categories; ISO 13849-1:2023 for PL determination; ISO 13855 for zone sizing. ISO 25785-1 (committee draft) is tracked, and its draft requirements are used as a checklist, not as a compliance basis.

**Tests**: stop time and distance for SF1 and SF4 at three speeds and two payloads, 30 repetitions each; contact force at hand and chest height with a force gauge for SF2 speeds; push-recovery tests with calibrated impulses; power-loss and single-actuator-failure tests on a gantry with fall arrest; thermal limit tests. Rerun the affected tests after every locomotion or manipulation policy update, actuator firmware change, or hardware revision.

**Records per run**: robot serial, software and policy version hashes, safety parameter checksum, payload, floor surface, battery state of charge and temperature, sensor calibration, synchronised signal capture and video.

**Claim wording**: "Risk assessment carried out to ISO 12100, with safety functions designed and verified using ISO 10218-2:2025, ISO 13849-1:2023 and IEC 60204-1. ISO 25785-1 is not yet published; its draft is used as a reference." No certification is claimed.

**Afterwave's role**: Lockstep captures each run on one clock with configuration; Ripple proposes which tests to rerun after each change; the customer's safety engineer approves the plan and the conclusions.`,
            explanation: md`With no published humanoid standard, an honest plan borrows from published standards, defines robot-specific safety functions, measures them repeatedly and says plainly what is draft.`,
            concepts: ["aw10.humanoid-standards", "aw10.stop-categories", "aw10.iso-10218"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a non-engineer why switching off a humanoid robot is not a safe way to stop it, and what engineers do instead.",
          keyPoints: [
            "A humanoid balances using active control; without power it falls",
            "A falling robot releases a lot of energy (hundreds of joules), far more than a slow robot arm",
            "Engineers use controlled stops: crouch, sit, slow down, or fall in a chosen direction, then remove power",
            "These controlled stops are themselves safety functions that must work reliably and be tested",
          ],
        },
        { kind: "sources", refs: ["aw10-r6", "aw10-r7", "aw10-r8", "aw10-r9", "aw10-r10", "aw10-r21", "aw10-r27", "aw10-r29"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw10-l03-q1",
      type: "mcq",
      prompt: "Who is primarily responsible for meeting ISO 10218-2?",
      options: ["The robot arm manufacturer", "The integrator of the robot application or cell", "The notified body", "The robot operator"],
      answer: 1,
      explanation: md`Part 1 covers the robot (manufacturer). Part 2 covers robot applications and cells, including collaborative operation and the task risk assessment (integrator).`,
      concepts: ["aw10.iso-10218"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw10-l03-q2",
      type: "multi",
      prompt: "Which are collaborative modes recognised in robot safety standards?",
      options: ["Safety-rated monitored stop", "Hand guiding", "Speed and separation monitoring", "Power and force limiting", "Category 0 emergency stop"],
      answer: [0, 1, 2, 3],
      explanation: md`The four collaborative modes. An emergency stop is a complementary protective measure required on all robots, not a collaborative mode.`,
      concepts: ["aw10.collaborative-modes"],
      difficulty: 1,
    },
    {
      id: "aw10-l03-q3",
      type: "numeric",
      prompt: md`Transient contact with the hand, limit 280 N, $k = 75{,}000$ N/m, $m_H = 0.6$ kg, robot effective mass 6 kg. What is the maximum relative speed in m/s?`,
      answer: 1.38,
      tolerance: { abs: 0.02 },
      unit: "m/s",
      explanation: md`$\mu = (1/0.6 + 1/6)^{-1} = (1.667 + 0.167)^{-1} = 0.545$ kg. $v = 280/\sqrt{0.545 \times 75{,}000} = 280/202.2 = 1.38$ to 1.39 m/s.`,
      concepts: ["aw10.pfl-limits"],
      difficulty: 2,
    },
    {
      id: "aw10-l03-q4",
      type: "mcq",
      prompt: "Which stop category removes power to the actuators immediately?",
      options: ["Category 0", "Category 1", "Category 2", "SOS"],
      answer: 0,
      explanation: md`Category 0 is immediate removal of power (STO). Category 1 decelerates under control and then removes power; category 2 keeps power with monitored standstill.`,
      concepts: ["aw10.stop-categories"],
      difficulty: 1,
    },
    {
      id: "aw10-l03-q5",
      type: "numeric",
      prompt: md`ISO 13855: light curtain with $d = 14$ mm, total stop time $T = 0.2$ s. $C = 8(d-14)$. With $K = 2{,}000$ mm/s, what is $S$ in mm (check whether recalculation is needed)?`,
      answer: 400,
      tolerance: { abs: 1 },
      unit: "mm",
      explanation: md`$C = 0$; $S = 2{,}000 \times 0.2 = 400$ mm. Since $S \le 500$ mm no recalculation is needed (the 2,000 mm/s result stands, with a 100 mm minimum).`,
      concepts: ["aw10.separation-distance"],
      difficulty: 2,
    },
    {
      id: "aw10-l03-q6",
      type: "decision",
      prompt: md`A humanoid startup asks Afterwave to state in a joint blog post that their robot "meets ISO 25785-1". What do you do?`,
      options: [
        { text: "Agree; they have read the draft and say they meet it.", score: 0, feedback: "A draft can change and cannot confer compliance. Your brand is evidence; repeating an untrue claim destroys it." },
        { text: "Propose wording: tested to defined safety functions using ISO 10218-2:2025 and ISO 13849-1:2023, with ISO 25785-1 (draft) as reference, and offer to publish the test method.", score: 1, feedback: "Accurate, still useful to them, and shows Afterwave's value: credible evidence." },
        { text: "Refuse the blog post entirely.", score: 0.4, feedback: "Safe, but you lose a good co-marketing moment you could have made accurate." },
      ],
      explanation: md`ISO 25785-1 is unpublished in November 2026. An evidence company's credibility depends on never overstating compliance.`,
      concepts: ["aw10.humanoid-standards"],
      difficulty: 2,
    },
    {
      id: "aw10-l03-q7",
      type: "numeric",
      prompt: md`A 70 kg humanoid's centre of mass drops 0.9 m in a fall. Approximately how much energy is released, in joules? ($g = 9.81$ m/s²)`,
      answer: 618,
      tolerance: { rel: 0.02 },
      unit: "J",
      explanation: md`$E = mgh = 70 \times 9.81 \times 0.9 = 618$ J. Compare a 12 kg arm at 1 m/s: $\tfrac12 \times 12 \times 1^2 = 6$ J.`,
      concepts: ["aw10.humanoid-standards"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw10-l03-f1", front: "ISO 10218-1 vs -2", back: "Part 1: the robot (manufacturer). Part 2: the robot application and cell (integrator). Both second editions, Feb 2025.", concepts: ["aw10.iso-10218"] },
    { id: "aw10-l03-f2", front: "Default safety-function integrity in ISO 10218:2025", back: "PL d with category 3, or SIL 2 with HFT 1.", concepts: ["aw10.iso-10218"] },
    { id: "aw10-l03-f3", front: "PFL permissible speed", back: md`$v = F/\sqrt{\mu k}$, $\mu = (1/m_H + 1/m_R)^{-1}$, $m_R = M/2 + m_L$.`, concepts: ["aw10.pfl-limits"] },
    { id: "aw10-l03-f4", front: "ISO 13855 safety distance", back: md`$S = KT + C$; $K = 2{,}000$ mm/s, if $S > 500$ mm use 1,600 mm/s (min 500 mm); $C = 8(d - 14)$ for $d \le 40$ mm.`, concepts: ["aw10.separation-distance"] },
    { id: "aw10-l03-f5", front: "Stop categories 0, 1, 2", back: "0: immediate power removal (STO). 1: controlled stop then power removal (SS1). 2: controlled stop, power kept (SS2/SOS).", concepts: ["aw10.stop-categories"] },
    { id: "aw10-l03-f6", front: "ISO 25785-1 status (Nov 2026)", back: "Not published; committee or working draft at ISO/TC 299; covers mobile robots with actively controlled stability (legged, humanoid).", concepts: ["aw10.humanoid-standards"] },
    { id: "aw10-l03-f7", front: "Collaboration is a property of...", back: "The application (robot, tool, part, task, layout), not the robot alone.", concepts: ["aw10.collaborative-modes"] },
  ],
  scenarios: [
    {
      id: "aw10-s1",
      title: "The humanoid design partner wants a compliance line",
      dayInLife: true,
      context: md`Illustrative. A humanoid company is a prospective Afterwave design partner. Their pilot customer, a car plant, wants evidence before letting the robot work near people. The startup's VP Engineering calls you: "Can Afterwave help us show we are compliant with the humanoid standard?"`,
      start: "a",
      concepts: ["aw10.humanoid-standards", "aw10.iso-10218"],
      nodes: {
        a: {
          md: md`What do you answer first?`,
          choices: [
            { text: "Yes, we can produce the compliance evidence for ISO 25785-1.", next: "b", score: 1, feedback: "There is no published ISO 25785-1 to comply with, and Afterwave does not certify. You have just made a claim an assessor will tear apart." },
            { text: "Ask what the plant actually requires (risk assessment to ISO 12100 and ISO 10218-2, CE file, internal EHS sign-off), which safety functions they have, and how they test them today.", next: "c", score: 9, feedback: "You start from the real requirement and the real evidence gap." },
          ],
        },
        b: {
          md: md`Two weeks later the plant's safety engineer asks which edition of ISO 25785-1 you used and who assessed it.`,
          choices: [
            { text: "Correct the record: explain the draft status and reframe as an evidence plan based on published standards.", score: 5, feedback: "Recovery, at a credibility cost you did not need to pay." },
          ],
        },
        c: {
          md: md`The plant wants an ISO 10218-2-style risk assessment of the task, measured stop times and contact forces, and proof that tests are rerun after each software update. The startup reruns tests by hand when someone remembers. What do you propose?`,
          choices: [
            { text: "A paid pilot: Lockstep on their stop-time and force test rigs, configuration captured with every run, Ripple proposing reruns after each policy update, and a validation evidence pack their safety engineer signs.", score: 10, feedback: "Specific, measurable and honest about who decides. This is the wedge." },
            { text: "Offer to write their risk assessment for them.", score: 3, feedback: "Consulting work outside your product and your competence; liability without leverage." },
          ],
        },
      },
    },
  ],
};

export default lesson;
