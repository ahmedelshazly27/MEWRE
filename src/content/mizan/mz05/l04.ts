import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz05-l04",
  title: "Control architecture: tracker controllers, network controllers, SCADA, weather and forecasts",
  summary:
    "How a tracker plant is actually controlled, layer by layer: row controllers, network controllers, the vendor's plant supervisor, SCADA and the power plant controller, weather stations and forecast feeds. Then where a third-party optimisation layer can plug in (read-only, advisory, supervisory request, parameter change), what vendors publicly allow, the command priority and fail-safe rules that keep it safe, cybersecurity, and a latency budget that decides whether a dust or gust front can be beaten.",
  minutes: 80,
  objectives: [
    "You can draw the control hierarchy of a tracker plant and say which layer owns tracking, stow, fail-safe and grid setpoints.",
    "You can list the weather and forecast inputs a stow function needs and their typical sources.",
    "You can define four integration levels for a third-party control layer and the risk and approval each requires.",
    "You can state a command priority and the rules (only more conservative, time-to-live, reversion) that make an external layer safe.",
    "You can compute a latency budget for a forecast- or sensor-triggered stow and judge whether it beats the event.",
  ],
  concepts: [
    {
      id: "mz05.tracker-control-hierarchy",
      name: "Tracker control hierarchy",
      description:
        "Row (tracker) control units run the algorithm and fail-safe locally; network or zone controllers aggregate rows, read weather sensors and broadcast stow; a vendor supervisor and plant SCADA monitor and command; the power plant controller handles grid setpoints separately.",
      competency: "mz-control",
      related: ["m06.scada-architecture", "m06.ppc"],
    },
    {
      id: "mz05.weather-inputs",
      name: "Weather and forecast inputs for stow",
      description:
        "On-site anemometers and vanes, irradiance and soiling sensors, dew and visibility or particulate sensors, plus numerical weather and dust forecasts and upwind nowcasting. Stow logic needs both measured and forecast inputs because rotation takes minutes.",
      competency: "mz-control",
      related: ["mz05.stow-trigger"],
    },
    {
      id: "mz05.integration-levels",
      name: "Integration levels for a third-party control layer",
      description:
        "Read-only analytics; advisory (a human acts); supervisory request through the vendor's interface (the vendor logic validates and executes); approved parameter changes. Replacing the vendor's firmware algorithm is not on the table.",
      competency: "mz-control",
      related: ["mz05.tracker-control-hierarchy", "mz05.command-priority"],
    },
    {
      id: "mz05.command-priority",
      name: "Command priority and monotone safety",
      description:
        "Vendor safety logic first, then maintenance lockouts, operator commands, optimiser requests and normal tracking. An external layer may only make the state more conservative, every request expires, and on any fault the vendor default governs.",
      competency: "mz-control",
      related: ["mz05.fail-safe-stow", "mz05.integration-levels"],
    },
    {
      id: "mz05.latency-budget",
      name: "Stow latency budget",
      description:
        "Time from detection to the last row in position: confirmation, decision, SCADA and network communication, rotation and verification. It must be shorter than the time for the event to reach the plant, which on-site sensors alone rarely provide.",
      competency: "mz-control",
      related: ["mz05.stow-trigger", "mz05.weather-inputs"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Who commands a tracker",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Your product will live inside someone else's control system. Whether Mizan sells a report, an advisory screen or a function that actually moves trackers is decided by this architecture, by what the tracker vendor exposes and by what the owner's cybersecurity rules allow. You need to be able to sketch it on a whiteboard in a meeting with a SCADA integrator and say exactly which signal you read, which request you send, and what happens when your server goes down.`,
        },
        {
          kind: "xref",
          to: "m06-l05",
          note: "Track 0 covers plant SCADA architecture, protocols (Modbus, IEC 61850, IEC 60870-5-104, DNP3, OPC UA) and OT cybersecurity. This lesson places the tracker subsystem inside it.",
        },
        {
          kind: "xref",
          to: "m06-l03",
          note: "The power plant controller (PPC) handles grid setpoints. Tracker stow changes plant output but is not a grid control function; keep the two apart.",
        },
        {
          kind: "flow",
          title: "Tracker control hierarchy (typical)",
          steps: [
            { label: "Row controller (TCU)", detail: "One per row or drive: motor driver, inclinometer, clock, battery or self-powered supply; runs tracking, backtracking and local fail-safe" },
            { label: "Network / zone controller (NCU)", detail: "Aggregates many rows over a wireless mesh or RS-485; reads zone weather sensors; broadcasts stow; heartbeat to rows" },
            { label: "Vendor plant supervisor", detail: "Vendor software (for example Nextracker NX Navigator): fleet view, modes, forecast-triggered stow, diagnostics" },
            { label: "Plant SCADA and historian", detail: "Reads tracker status via Modbus TCP or OPC UA; operator HMI; alarms; stores time series" },
            { label: "Owner or remote operations centre", detail: "Fleet monitoring, analytics, reporting; usually read-only into the plant" },
          ],
          caption: "The power plant controller sits beside SCADA and talks to inverters, not trackers. Weather stations feed the NCU and SCADA; forecast feeds enter at the supervisor or SCADA level.",
        },
        {
          kind: "md",
          md: md`### What each layer owns

| Layer | Owns | Typical interfaces | Notes |
|---|---|---|---|
| Row controller | Tracking and backtracking angle, motor control, local fail-safe (heartbeat loss, low battery) | Wireless mesh or RS-485 to NCU | Must act alone when everything above it fails |
| Network controller | Zone stow from wind sensors, broadcast commands, row health | Modbus TCP or OPC UA to SCADA; sensor inputs | The usual integration point for SCADA |
| Vendor supervisor | Modes (stow, hail, diffuse, maintenance, cleaning), forecast triggers, firmware | Vendor protocol and APIs | Where vendors put their own smart features |
| SCADA | Monitoring, operator commands, alarms, historian | OPC UA, Modbus, IEC 60870-5-104 or DNP3 to the grid side | Owner's or EPC's integrator configures it |
| PPC | Active and reactive power setpoints at the point of connection | Inverters, grid operator | Separate from tracker control |

### Weather and forecast inputs

**Measured on site.** Anemometers and vanes (several, across the plant and at the windward edge), ambient temperature and humidity, plane-of-array and horizontal irradiance, soiling stations or paired reference cells, and for a soiling function, dew sensing (glass temperature against dew point) and visibility or particulate (PM10) sensors. IEC 61724-1 sets the monitoring classes and sensor requirements for performance monitoring; a Class A system is the reference for utility plants.

**Forecast and nowcast.** Numerical weather prediction wind forecasts from a national met service or commercial provider; aerosol and dust forecasts (for example the Copernicus Atmosphere Monitoring Service, CAMS, run by ECMWF, which publishes global dust and aerosol forecasts); satellite imagery for dust plumes; and nowcasting from **upwind sensors** placed kilometres away so the plant sees a front before it arrives. Vendors already use external weather data: Array's Hail Alert Response uses third-party weather data, and Nextracker's wind and hail stows are forecast-triggered (research brief 3.3).

### Where a third-party layer can plug in

| Level | What Mizan's layer does | Who acts | Risk to structure | Approval needed |
|---|---|---|---|---|
| 0. Read-only analytics | Reads angles, modes, stow logs, weather; reports losses and anomalies | Nobody, it is a report | None | Data access, cybersecurity review |
| 1. Advisory | Recommends a stow, a release or a mode on screen or by message | Operator decides and commands through SCADA | Low; the vendor logic still validates | O&M procedure change |
| 2. Supervisory request | Sends a request (for example "stow zone 3 to dust position for 4 h") through the vendor's documented interface | Vendor logic validates and executes, or refuses | Low if requests can only be more conservative | Vendor written approval, owner, possibly lenders' adviser |
| 3. Parameter change | Proposes changed vendor parameters (release hold time, night position) for the vendor to set | Vendor | Depends on parameter | Vendor engineering sign-off |
| 4. Replace the algorithm | Runs its own tracking or stow logic in the controllers | Not available | High | Effectively never; warranty and certification |

Level 0 and 1 can be sold without a tracker vendor's cooperation beyond data access. Level 2 is where a dust-storm or night-stow function becomes a product, and it depends on what the vendor exposes.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "What vendors actually allow",
          md: md`Public material shows vendors integrating external weather data and cleaning robots (Array Hail Alert Response, GameChange integration with robotic cleaners), but the research brief found no public documentation of a third-party "dust stow" or "cleaning position" command interface, and lists vendor manuals for Arctech and GameChange as an open check. Assume nothing: ask each vendor for its SCADA register map or OPC UA model and its policy on external stow requests.`,
        },
        {
          kind: "md",
          md: md`### Command priority and monotone safety

When several sources can command a row, the order must be explicit and enforced in the vendor's logic, not in Mizan's software:

1. **Vendor safety logic**: wind stow, hail stow, fail-safe (heartbeat loss, low battery, sensor fault).
2. **Maintenance lockout**: rows locked out for people working in the field.
3. **Operator commands** from SCADA.
4. **Optimiser requests** (Mizan).
5. **Normal tracking.**

Three rules make level 2 safe:
- **Only more conservative.** An optimiser request may add a stow or move rows to an approved protective position; it may never cancel, delay or shorten a vendor stow, and never move rows to an angle outside the vendor's envelope for the current wind.
- **Time-to-live.** Every request carries an expiry. If it is not renewed, rows return to vendor default. A crashed optimiser can therefore never leave rows in an odd position.
- **Heartbeat and reversion.** The interface monitors the optimiser; on loss of heartbeat, all optimiser requests are dropped.

### Cybersecurity

Writing into an OT network is a different conversation from reading out of it. IEC 62443 is the reference: the plant is split into zones joined by controlled conduits. A read-only analytics product can sit outside behind a one-way data path; a supervisory product needs an authenticated, logged, minimal-privilege path into the zone that holds the tracker supervisor, usually through a demilitarised zone. Expect the owner's security review to take longer than the engineering.

### The latency budget

A stow that arrives after the event is worthless. The budget from detection to the last row in position is:`,
        },
        { kind: "equation", formula: "mz05-latency-budget" },
        {
          kind: "md",
          md: md`It must be shorter than the time for the event to reach the plant. A front moving at 12 m/s covers 3 km in about 4 minutes, so a sensor at the plant edge cannot protect a 3 km-deep plant. Forecasts and upwind sensors are not luxuries; they are the only way the budget closes.`,
        },
        { kind: "sources", refs: ["mz05-r12", "mz05-r14", "mz05-r15", "mz05-r18", "mz05-r19", "mz05-r22"] },
      ],
    },
    {
      layer: "applied",
      title: "Can the plant beat the front?",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Latency budget with an upwind sensor",
          given: md`Illustrative. A dust-laden gust front is detected by an upwind station 15 km from the plant's windward edge, moving at 12 m/s toward the plant. Budget items: confirm detection with 4 consecutive 30-s samples (2 min); optimiser decision and SCADA write 0.5 min; NCU broadcasts to 150 rows at 0.4 s each sequentially, with acknowledgements (1 min); slowest rotation 60° at 0.25°/s; verification that all rows report in position 1 min.`,
          steps: [
            { md: md`**Time to arrival.** $t_\text{event} = 15{,}000 / 12 = 1{,}250$ s $= 20.8$ min.` },
            { md: md`**Communication.** $150 \times 0.4 = 60$ s $= 1$ min.` },
            { md: md`**Rotation.** $60 / 0.25 = 240$ s $= 4$ min.` },
            { md: md`**Total budget.** $2 + 0.5 + 1 + 4 + 1 = 8.5$ min.` },
            { md: md`**Margin.** $20.8 - 8.5 = 12.3$ min. The plant is in position with time to spare, and the margin covers a retry of failed rows.` },
          ],
          result: md`With an upwind station 15 km out, the plant beats a 12 m/s front by about 12 minutes. The two largest items are rotation and confirmation; faster drives (Nextracker markets Hail Pro as stowing up to four times faster) and a forecast pre-alert that starts the confirmation early both buy margin.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "The same plant with only on-site anemometers",
          given: md`The plant is 3 km deep in the wind direction. The only anemometers are at the windward edge. Same 12 m/s front and the same 8.5-minute budget.`,
          steps: [
            {
              md: md`**Time for the front to cross to the far edge.** $3{,}000 / 12 = 250$ s $= 4.2$ min.`,
              hidden: true,
              check: { prompt: "Crossing time", answer: 4.2, unit: "min", tolerance: { abs: 0.1 } },
            },
            {
              md: md`**Margin for the furthest rows.** $4.2 - 8.5 = -4.3$ min: they are still moving when the front arrives. Rows at the windward edge have $-8.5$ min.`,
              hidden: true,
              check: { prompt: "Margin for the furthest rows", answer: -4.3, unit: "min", tolerance: { abs: 0.15 } },
            },
            {
              md: md`**Implication.** On-site sensors are a backstop, not a strategy. The plant needs a forecast trigger or upwind sensors, which is exactly the kind of input a third-party layer can supply at level 1 or 2.`,
            },
          ],
          result: md`Edge-only detection loses the race by minutes. This calculation is a strong, honest opening for a conversation with an owner: it does not criticise the vendor, it shows where external data adds safety.`,
        },
        {
          kind: "question",
          question: {
            id: "mz05-l04-p1",
            type: "numeric",
            prompt: md`A front moves at 10 m/s. Your total latency budget is 9 minutes and you want 5 minutes of margin. How far upwind of the plant (km) must detection happen?`,
            answer: 8.4,
            tolerance: { abs: 0.05 },
            unit: "km",
            explanation: md`Required lead time $= 9 + 5 = 14$ min $= 840$ s. Distance $= 10 \times 840 = 8{,}400$ m $= 8.4$ km.`,
            concepts: ["mz05.latency-budget"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Integrating a control function on a live plant",
      blocks: [
        {
          kind: "md",
          md: md`**Who you deal with.**
- **Tracker vendor**: owns the controllers, firmware, register map and warranty; decides what external requests are accepted.
- **SCADA integrator** (often the EPC's subcontractor): configures tags, HMI and historian; implements any new interface.
- **O&M contractor**: operates the plant; your advisory or supervisory function changes its procedures and possibly its guarantees.
- **Owner's OT security** (and IT): reviews every path into the plant network.
- **Lenders' technical adviser** on financed plants: reviews changes that could affect availability or asset integrity.

**Documents that define the integration.** The vendor's SCADA register map or OPC UA information model; an **interface control document (ICD)** that lists every signal, direction, data type, rate, owner and failure behaviour; a cybersecurity design per IEC 62443; a management-of-change record; factory and site acceptance test (FAT and SAT) procedures for the new function.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- The register map exposes a "stow" command but not the reason code, so vendor stows and optimiser stows cannot be separated in logs and nobody can measure the function.
- Requests have no expiry; the optimiser server reboots during an update and rows stay in a dust position into a clear morning.
- Time stamps differ between NCU, SCADA and the optimiser by minutes, which ruins any latency or energy-loss analysis.
- The cybersecurity review starts after the pilot is agreed and delays it by months.
- The optimiser is placed in the PPC path, mixing grid control and tracker control.`,
        },
        {
          kind: "checklist",
          title: "Interface requirements for a supervisory stow request",
          items: [
            "Per-row read: commanded angle, measured angle, mode, mode source (vendor, operator, optimiser), fault codes, battery state",
            "Write: request type from a fixed list, target zone, target position from the vendor-approved set, expiry time, request id",
            "Vendor logic returns accepted or rejected with a reason; rejections logged",
            "Heartbeat from the optimiser; on loss, all requests dropped and vendor default resumes",
            "Common time source (NTP or PTP) for NCU, SCADA and optimiser",
            "Authenticated, logged path through a DMZ per the owner's IEC 62443 zoning",
          ],
        },
        {
          kind: "ask",
          title: "Ask the vendor and the SCADA integrator",
          items: [
            "Can you share the register map or OPC UA model for the tracker supervisor, including every mode and its source?",
            "Does the controller accept external stow or position requests, and do they carry an expiry?",
            "How does the controller rank operator, maintenance and external requests against its own safety logic?",
            "What is the measured time from a SCADA command to the last row in position for the largest block?",
            "Which time source do the network controllers use?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz05-l04-p2",
            type: "short",
            prompt: md`Write the outline of an interface control document (ICD) for a Mizan level 2 "dust protective stow request" function on a Gulf tracker plant. List the signals in each direction, the safety rules and the tests that prove the function is safe before it goes live.`,
            rubric: [
              "Read signals per row or zone: commanded and measured angle, mode and mode source, faults, battery, plus weather inputs and time stamps",
              "Write signals: request type from a fixed list, zone, approved target position, expiry, request id; and the vendor's accept or reject response",
              "Safety rules: vendor logic has priority, requests can only be more conservative, expiry and heartbeat reversion to vendor default",
              "Cybersecurity: authenticated path consistent with IEC 62443 zoning, logging, least privilege",
              "Tests: FAT and SAT including heartbeat loss, expired request, rejected request, conflicting vendor wind stow, time synchronisation",
              "Names owners for each side (vendor, integrator, O&M, Mizan)",
            ],
            modelAnswer: md`**1. Purpose and scope.** Request protective dust stow of tracker zones ahead of forecast dust events; level 2 (supervisory request); trial blocks only. **2. Parties.** Tracker vendor (controller logic, accept or reject), SCADA integrator (tags and DMZ), O&M contractor (operations and approval), Mizan (optimiser). **3. Read signals (vendor to Mizan, 10 s or faster).** Per row: commanded angle, measured angle, mode, mode source (vendor, operator, maintenance, optimiser), fault code, battery state of charge. Per zone: wind speed and direction from each anemometer, irradiance, and the vendor's current stow state. All time-stamped from the common NTP source. **4. Write signals (Mizan to vendor).** Request id, request type (from the fixed list: DUST_STOW, NIGHT_POSITION, CANCEL_OWN_REQUEST), zone id, target position (from the vendor-approved set only), expiry time (maximum 6 h), heartbeat every 30 s. **5. Response (vendor to Mizan).** Accepted, rejected with reason, or superseded by vendor logic. **6. Safety rules.** Vendor wind, hail and fail-safe logic always take precedence. Mizan requests can only move rows to approved protective positions and can never cancel or shorten a vendor stow. Requests expire automatically; on loss of heartbeat for 90 s all Mizan requests are dropped and rows return to vendor default. **7. Cybersecurity.** Mizan connects only to a DMZ broker; authenticated with certificates; least privilege (write only the request registers); every request and response logged; reviewed under the owner's IEC 62443 zoning. **8. Tests.** FAT on the vendor's test bench, then SAT on one block: accepted request reaches position; expired request reverts; heartbeat loss reverts; request for an unapproved angle rejected; vendor wind stow overrides an active Mizan request; time stamps within 1 s across systems. Go-live only after the O&M contractor and owner sign the SAT report.`,
            explanation: md`An ICD makes every signal, owner and failure behaviour explicit; the safety rules (vendor priority, only more conservative, expiry, heartbeat) and the FAT/SAT tests are what let a vendor and owner accept a level 2 function.`,
            concepts: ["mz05.integration-levels", "mz05.command-priority", "mz05.tracker-control-hierarchy"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a plant owner's head of operations why letting Mizan's software send stow requests to the trackers cannot make the plant less safe.",
          keyPoints: [
            "The vendor's own safety logic stays in charge and is ranked above any request",
            "Mizan can only ask for more protective positions, never cancel or delay a vendor stow",
            "Every request expires, so a crashed server cannot leave rows in a strange position",
            "If the software stops sending a heartbeat, all its requests are dropped",
            "The path into the plant is authenticated and logged, and tested before go-live",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz05-l04-q1",
      type: "order",
      prompt: md`Order the command sources from highest to lowest priority in a safe tracker control design.`,
      items: [
        "Vendor safety logic (wind, hail, fail-safe)",
        "Maintenance lockout",
        "Operator command from SCADA",
        "Third-party optimiser request",
        "Normal tracking algorithm",
      ],
      explanation: md`Safety logic is always first. People in the field come next. Operators outrank automated optimisers, and normal tracking is the default when nothing else applies.`,
      concepts: ["mz05.command-priority"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz05-l04-q2",
      type: "mcq",
      prompt: md`Which layer must be able to stow a row with no command from anywhere else?`,
      options: ["Plant SCADA", "The vendor supervisor software", "The row controller", "The power plant controller"],
      answer: 2,
      explanation: md`Fail-safe stow lives in the row controller because every layer above it can fail or lose communication.`,
      concepts: ["mz05.tracker-control-hierarchy", "mz05.fail-safe-stow"],
      difficulty: 1,
    },
    {
      id: "mz05-l04-q3",
      type: "multi",
      prompt: md`Which rules make a level 2 supervisory request safe?`,
      options: [
        "Requests can only move rows to approved, more protective positions",
        "Requests carry an expiry and revert to vendor default",
        "Requests can postpone a vendor wind stow by up to 10 minutes",
        "Loss of the optimiser's heartbeat drops all its requests",
        "The vendor logic can reject a request and reports why",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`An external layer must never delay or cancel a vendor safety stow; the other four are the core rules.`,
      concepts: ["mz05.command-priority", "mz05.integration-levels"],
      difficulty: 2,
    },
    {
      id: "mz05-l04-q4",
      type: "numeric",
      prompt: md`Rows rotate at 0.2°/s. How many minutes does the slowest row take to go from +55° to a stow position of −30°?`,
      answer: 7.08,
      tolerance: { abs: 0.05 },
      unit: "min",
      explanation: md`Travel $= 55 + 30 = 85°$; $85/0.2 = 425$ s $= 7.08$ min. Rotation is usually the largest item in the latency budget.`,
      concepts: ["mz05.latency-budget"],
      difficulty: 1,
    },
    {
      id: "mz05-l04-q5",
      type: "mcq",
      prompt: md`An owner wants Mizan's dust stow function but its tracker vendor will not accept any external commands. What is the best available integration level?`,
      options: [
        "Level 4: install Mizan firmware on the row controllers",
        "Level 1: advisory recommendations that the operator executes through existing SCADA commands",
        "None: walk away",
        "Level 2 through the PPC instead",
      ],
      answer: 1,
      explanation: md`Without a vendor interface, advisory is the safe path: the operator uses existing, vendor-validated commands. It also builds the evidence to ask the vendor for level 2 later. The PPC controls inverters, not trackers.`,
      concepts: ["mz05.integration-levels"],
      difficulty: 2,
    },
    {
      id: "mz05-l04-q6",
      type: "decision",
      prompt: md`During a pilot, your optimiser server will be offline for 3 hours for an update, while it has an active night-position request on two blocks expiring at 06:00. Sunrise is 05:10. What do you do?`,
      options: [
        { text: "Nothing; the request will expire", score: 0.3, feedback: "The request expires after sunrise, so rows would stay in the night position for almost an hour of daylight." },
        { text: "Cancel your own active requests before the update so the vendor default resumes, and inform the control room", score: 1, feedback: "Right. Hand control back cleanly and tell the operator. Better still, make expiries shorter than the worst case you can tolerate." },
        { text: "Ask the operator to watch the rows manually until you are back", score: 0.5, feedback: "Workable, but it shifts your risk onto the operator when you can remove it yourself." },
      ],
      explanation: md`Time-to-live protects against crashes, but you should not rely on it for planned downtime. Expiry times should also be chosen so that the worst case is acceptable, for example not past sunrise for a night request.`,
      concepts: ["mz05.command-priority"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz05-l04-f1", front: "Tracker control layers", back: "Row controller, network or zone controller, vendor supervisor, plant SCADA, owner operations centre. The PPC is separate.", concepts: ["mz05.tracker-control-hierarchy"] },
    { id: "mz05-l04-f2", front: "Four integration levels", back: "0 read-only, 1 advisory, 2 supervisory request via vendor interface, 3 vendor-set parameter changes. Replacing firmware is off the table.", concepts: ["mz05.integration-levels"] },
    { id: "mz05-l04-f3", front: "Monotone safety", back: "An external layer may only make the tracker state more conservative; it can never cancel, delay or shorten a vendor stow.", concepts: ["mz05.command-priority"] },
    { id: "mz05-l04-f4", front: "Time-to-live and heartbeat", back: "Every request expires; loss of the optimiser heartbeat drops all its requests and the vendor default resumes.", concepts: ["mz05.command-priority"] },
    { id: "mz05-l04-f5", front: "Latency budget", back: md`$t_\text{confirm} + t_\text{decide} + t_\text{comm} + \Delta\theta/\omega + t_\text{verify} < t_\text{event}$; edge sensors alone rarely close it.`, concepts: ["mz05.latency-budget"] },
    { id: "mz05-l04-f6", front: "Dust forecast source example", back: "Copernicus Atmosphere Monitoring Service (CAMS, ECMWF) publishes global dust and aerosol forecasts; combine with upwind sensors.", concepts: ["mz05.weather-inputs"] },
    { id: "mz05-l04-f7", front: "Integration document", back: "Interface control document: every signal, direction, type, rate, owner and failure behaviour, plus FAT and SAT tests.", concepts: ["mz05.integration-levels"] },
  ],
};

export default lesson;
