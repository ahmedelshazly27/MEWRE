import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz06-l01",
  title: "Power plant controllers: set-points, ramps, frequency and voltage loops",
  summary:
    "The PPC as a product: a closed loop at the point of interconnection that turns TSO set-points into inverter and PCS commands. The control law, the priority stack of limits, ramp-rate control and the BESS it needs, droop frequency response and the headroom it consumes, Q-V slope control and the P-Q circle, and the performance numbers a buyer writes into a specification. Built so you can sit with a PPC vendor or an EPC controls lead and know where Mizan's stow and cleaning functions touch the loop.",
  minutes: 85,
  objectives: [
    "You can explain why a PPC closes its loops at the POI and write its PI control law with anti-windup.",
    "You can rank the PPC priority stack (protection, grid-code response, TSO limit, ramp, POI limit, optimisation) and say where a stow or cleaning command enters.",
    "You can compute a droop response with deadband, the headroom it needs, and the BESS power and energy to hold a ramp limit.",
    "You can compute reactive injection under Q-V slope control and the Q left on the P-Q circle.",
    "You can write the performance clauses (response time, settling, accuracy) of a PPC specification.",
  ],
  concepts: [
    {
      id: "mz06.ppc-loop",
      name: "PPC closed loop at the POI",
      description:
        "The plant controller measures P, Q, V and f at the point of interconnection and corrects inverter and PCS commands with a PI law every 100 to 200 ms, compensating collector losses, transformer Q and unavailable units.",
      competency: "mz-control",
      related: ["m06.ppc", "m06.active-power-control"],
    },
    {
      id: "mz06.priority-stack",
      name: "PPC priority stack of limits and commands",
      description:
        "Fixed ordering of what the PPC obeys: local inverter protection and fault ride-through, grid-code frequency and voltage response, TSO set-points and curtailment, ramp limits, POI export limit, then EMS optimisation and auxiliary commands such as tracker stow.",
      competency: "mz-control",
      related: ["mz06.ppc-loop", "m06.grid-code"],
    },
    {
      id: "mz06.ramp-control",
      name: "Ramp-rate control in a hybrid plant",
      description:
        "Limiting dP/dt at the POI. PV can limit up-ramps by curtailing; down-ramps from cloud or dust fronts need BESS power. Energy needed grows with the square of the drop.",
      competency: "mz-control",
      related: ["m06.active-power-control", "m05.pv-firming"],
    },
    {
      id: "mz06.hybrid-frequency-response",
      name: "Frequency response and headroom in PV+BESS",
      description:
        "Droop response with deadband computed at the POI; upward response requires headroom in BESS power, PV curtailment and POI capacity at the same time, which competes with energy shifting.",
      competency: "mz-control",
      related: ["m06.droop", "m05.frequency-response"],
    },
    {
      id: "mz06.voltage-q-control",
      name: "Voltage and reactive control modes",
      description:
        "Q set-point, PF set-point and voltage control with slope; reactive capability limited by the inverter MVA circle and derating at high ambient; P or Q priority setting.",
      competency: "mz-control",
      related: ["m06.qv-control", "m06.reactive-capability"],
    },
    {
      id: "mz06.ppc-performance",
      name: "PPC performance specification",
      description:
        "Measurable requirements: rise time, settling time, overshoot, steady-state accuracy, update rate, communication latency, behaviour on loss of communication, all verified in FAT simulation and witnessed site tests.",
      competency: "mz-control",
      related: ["mz06.ppc-loop", "m06.compliance"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The loop that makes hundreds of inverters behave as one plant",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan's control functions (dust and wind stow, cleaning-position commands, tracker set-points under heat) all change how much power the plant can make, minute by minute. Every one of them lands on top of a power plant controller that answers to MEWRE's control centre. If you cannot explain how the PPC will see a stow command, how it reports reduced availability and how the BESS covers the ramp, a PPC vendor or an EPC controls lead will treat Mizan as a risk to grid compliance rather than a feature. This lesson gives you the loop, the numbers and the vocabulary to have that conversation as a peer.`,
        },
        {
          kind: "xref",
          to: "m06-l03",
          note: "Track 0 derives droop, inertia, AGC, Q-V control, SCR and grid-forming from the system side, and lists PPC functions. Here we go inside the PPC as a product and add the hybrid-plant and seller angle.",
        },
        {
          kind: "xref",
          to: "m06-l02",
          note: "What grid codes require from PV and BESS plants (operating ranges, FRT, reactive capability, active power control), and the status of a Kuwaiti code (not found; requirements sit in RFP and connection schedules).",
        },
        {
          kind: "md",
          md: md`### Why close the loop at the POI

A TSO contracts with the plant at the **point of interconnection** (POI). Between the inverters and the POI sit MV cables, MV/HV transformers and auxiliaries. If the control centre asks for 200 MW and you simply divide 200 MW by the number of inverters, the POI sees less: collector and transformer losses (1 to 3 %), units that are tripped or derated, and transformers that consume reactive power in proportion to $I^2 X$. The PPC therefore **measures at the POI** (revenue-grade CTs and VTs or a dedicated power quality meter) and corrects the aggregate command until the error is zero:`,
        },
        { kind: "equation", formula: "mz06-pi-control" },
        {
          kind: "md",
          md: md`Three implementation details separate a good PPC from a bad one:

- **Anti-windup.** When the plant is at its limit (all inverters at maximum because irradiance is low), the error stays positive and a naive integral keeps growing. When irradiance returns, the plant overshoots the set-point. The PPC must freeze or clamp the integrator when its output saturates.
- **Dispatch to units.** The aggregate command is split across inverters and PCS in proportion to their *available* power, not their rating, and re-split when a unit trips. For a hybrid plant the split between PV and BESS follows a rule set by the EMS (lesson 2).
- **Timing.** Loop update 100 to 200 ms; Modbus TCP or IEC 61850 polling of a few hundred devices adds latency; inverters ramp internally. The fast physics (fault ride-through, fast fault current, anti-islanding) stays **inside the inverter**, because no plant network is fast enough.

### The priority stack

A PPC receives commands from several sources that can conflict. The ordering is a design decision that must be written down in the functional specification:

| Priority | Function | Who owns it |
|---|---|---|
| 1 | Protection, FRT, anti-islanding | Inverter and PCS firmware, protection relays |
| 2 | Grid-code frequency response (LFSM-O, LFSM-U, FSM) and voltage control | PPC, mandatory |
| 3 | TSO set-points and curtailment | Control centre via SCADA gateway |
| 4 | Ramp-rate limits | PPC (with BESS) |
| 5 | POI export limit, transformer and cable thermal limits | PPC |
| 6 | Economic schedule (charge, discharge, shift) | EMS |
| 7 | Auxiliary operational commands: tracker stow, cleaning position, inverter maintenance | Tracker controller, O&M, Mizan-type functions |

Item 7 is where Mizan sits. A stow command does not go through the PPC, but it **changes available power**, so the PPC must be told before it happens (to recompute available power reported to the control centre, pre-position the BESS and respect ramp limits) and must never be surprised by it.`,
        },
        {
          kind: "flow",
          title: "From control centre to inverter: the active-power path",
          steps: [
            { label: "Control centre EMS", detail: "AGC or operator sends P set-point, curtailment or mode over IEC 60870-5-104" },
            { label: "SCADA gateway / RTU", detail: "Protocol conversion, select-before-operate, logging" },
            { label: "PPC", detail: "Applies priority stack, droop, ramp and POI limits; PI loop on POI measurement" },
            { label: "Unit dispatch", detail: "Splits command across PV inverters and BESS PCS by availability and EMS rule" },
            { label: "Inverters and PCS", detail: "Track their own set-points in tens of ms; FRT and protection locally" },
            { label: "POI meter", detail: "Feeds measurement back to the PPC and to the control centre" },
          ],
          caption: "The loop closes at the POI meter. Tracker and cleaning commands bypass this path but change the available power it works with.",
        },
        {
          kind: "md",
          md: md`### Ramp-rate control

Grid operators limit how fast a plant may change output (illustrative: 10 % of rating per minute):`,
        },
        { kind: "equation", formula: "mz06-ramp-limit" },
        {
          kind: "md",
          md: md`PV can obey the **up-ramp** limit by holding back inverters. It cannot obey a **down-ramp** limit when a cloud edge or the leading edge of a dust front cuts irradiance. A hybrid PPC covers the gap with the BESS. Treating the drop as a step (the worst case), the BESS fills a triangle:`,
        },
        { kind: "equation", formula: "mz06-ramp-energy" },
        {
          kind: "md",
          md: md`### Frequency response and headroom

The droop line (Track 0, formula below) asks for more power as frequency falls. A PV plant at maximum power has nothing to give; a BESS does, unless it is already discharging at full power for an evening peak.`,
        },
        { kind: "equation", formula: "m06-droop" },
        { kind: "equation", formula: "mz06-headroom" },
        {
          kind: "widget",
          widget: "droop",
          props: { droop: 4 },
          caption: "Set droop 4 %, deadband 0.2 Hz. Move the frequency to 49.6 Hz and then 49.0 Hz and read the response as a share of rating; then shrink the headroom and watch the response clip.",
        },
        {
          kind: "md",
          md: md`### Voltage and reactive power

Three modes are common: **Q set-point**, **PF set-point**, and **voltage control with slope**, which TSOs prefer for large plants:`,
        },
        { kind: "equation", formula: "mz06-qv-slope" },
        {
          kind: "md",
          md: md`Reactive power is not free: the inverter current limit is a circle in the P-Q plane.`,
        },
        { kind: "equation", formula: "mz06-q-capability" },
        {
          kind: "md",
          md: md`At 50 °C inverters derate their MVA, so at full P the circle shrinks precisely when Kuwait's summer load needs voltage support. The PPC's **P priority / Q priority** setting decides which is cut first; the grid code (or the connection agreement) decides which is allowed. A BESS PCS adds reactive capability day and night, including when PV is at zero, which is a selling point of hybrids.

### What a PPC specification must say

| Parameter | Typical requirement (illustrative, check the connection agreement) |
|---|---|
| Active power set-point accuracy | within 1 to 2 % of rating at the POI |
| Active power response | start within about 2 s, reach the new set-point within about 1 min (or at the ramp limit) |
| Voltage control | 90 % of the Q step in 1 to 5 s, settling within about 10 s, overshoot below about 10 % |
| Frequency response (BESS) | full droop response within about 1 to 2 s; PV over-frequency curtailment within a few seconds |
| Loop update | 100 to 200 ms |
| Loss of communication with control centre | hold last set-point or go to a defined safe default, alarm within seconds |
| Loss of POI measurement | switch to redundant meter or freeze outputs; never run open-loop at full output silently |`,
        },
        { kind: "sources", refs: ["mz06-r1", "mz06-r2", "mz06-r15"] },
      ],
    },
    {
      layer: "applied",
      title: "Droop, ramp and voltage numbers for a hybrid plant",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Droop response of a 300 MW PV + 100 MW BESS hybrid",
          given: md`Illustrative plant: 300 MW PV, 100 MW / 400 MWh BESS, shared POI rated 300 MW. Reference power $P_n = 300$ MW. Droop $R = 4\,\%$, deadband $db = 0.2$ Hz, $f_n = 50$ Hz. Case A: frequency falls to 49.6 Hz. Case B: it falls to 49.0 Hz. At the time the BESS is discharging 60 MW for the evening peak and PV is at zero.`,
          steps: [
            { md: md`Gain of the droop line: $P_n/(R f_n) = 300/(0.04 \times 50) = 150$ MW/Hz beyond the deadband.` },
            { md: md`Case A: $\Delta f_{eff} = 0.4 - 0.2 = 0.2$ Hz, so $\Delta P = 150 \times 0.2 = 30$ MW. The BESS goes from 60 to 90 MW: deliverable.` },
            { md: md`Case B: $\Delta f_{eff} = 1.0 - 0.2 = 0.8$ Hz, so $\Delta P = 150 \times 0.8 = 120$ MW. That is the headroom formula with $|\Delta f_{max}| = 1.0$ Hz: $P_{hr} = 120$ MW.` },
            { md: md`Available upward room: the BESS can only go from 60 to 100 MW, so 40 MW. PV has nothing (night). The plant delivers 40 MW and falls 80 MW short of the droop line.` },
            { md: md`To guarantee even a capped requirement of, say, 10 % of rating (30 MW) at all times, the EMS must never schedule discharge above $100 - 30 = 70$ MW in the evening. That 30 MW is power the plant cannot sell for energy shifting.` },
          ],
          result: md`Droop response is cheap to compute and expensive to guarantee. The **headroom is a commercial quantity**: it is BESS power withheld from energy shifting (lesson 2) or PV energy curtailed. Whoever writes the connection agreement decides whether the plant must follow the full droop line or a capped response.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "BESS needed to hold a ramp limit through a dust front",
          given: md`Illustrative: 300 MW PV plant, ramp limit 10 %/min of rating. A cloud edge or dust front cuts PV output by 120 MW; treat it as a step (worst case).`,
          steps: [
            { md: md`Allowed ramp: $\dot P_{max} = 0.10 \times 300 = 30$ MW/min. Peak BESS discharge: $P_{B,max} = \Delta P = 120$ MW.` },
            {
              md: md`Ramp-down time: $t_r = 120/30 = 4$ min.`,
              hidden: true,
              check: { prompt: "Time for the POI output to ramp down", answer: 4, unit: "min", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Energy: $E_B = \dfrac{120^2}{2 \times 30} \cdot \dfrac{1}{60} = \dfrac{240}{60} = 4$ MWh.`,
              hidden: true,
              check: { prompt: "BESS energy discharged", answer: 4, unit: "MWh", tolerance: { rel: 0.02 } },
            },
          ],
          result: md`A 100 MW BESS cannot cover a 120 MW step at full rate (it covers 100 MW and the POI ramps 20 MW faster than allowed for a moment), but the energy is trivial: 4 MWh out of 400. Ramp smoothing is a **power** service. Dust fronts usually dim irradiance over tens of minutes, which is gentler; a stow commanded by a Mizan function is a step you choose, so it can be pre-announced and ramped.`,
        },
        {
          kind: "question",
          question: {
            id: "mz06-l01-p1",
            type: "numeric",
            prompt: md`The same plant must supply reactive power at PF 0.95 at full output, so $Q_{max} = 300 \tan(\arccos 0.95) \approx 99$ Mvar. It runs voltage control with slope $s = 4\,\%$ and $V_{ref} = 1.00$ pu. The POI voltage sags to 0.985 pu. What reactive power (Mvar) does the PPC command at the POI?`,
            answer: 37.1,
            unit: "Mvar",
            tolerance: { rel: 0.02 },
            explanation: md`$Q = -\frac{0.985 - 1.00}{0.04} \times 99 = 0.375 \times 99 = 37.1$ Mvar injected. The slope means a 4 % voltage error uses the full 99 Mvar; a 1.5 % error uses 37.5 % of it.`,
            concepts: ["mz06.voltage-q-control"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Who builds PPCs, how they fail and what Mizan must ask",
      blocks: [
        {
          kind: "md",
          md: md`### Who supplies the PPC

Three kinds of supplier compete for the PPC on a utility-scale hybrid plant:

| Supplier type | Strength | Weakness for the owner |
|---|---|---|
| **Inverter OEM PPC** (bundled with the inverters) | Native interface to its own inverters, single warranty | Weak with third-party PCS, trackers or a second inverter brand; lock-in |
| **BESS integrator controller / EMS** | Owns the battery, SoC and warranty limits | Often treats PV as an afterthought; optimisation logic is a black box |
| **Independent PPC and SCADA vendor** | Vendor-neutral, configurable, good at grid-code testing | Another interface to own; depends on OEM Modbus maps and IEC 61850 models |

Mizan's control functions are none of these. They are an **upstream input** to the PPC and tracker controller: a stow schedule, a cleaning position window, a forecast of available power. That is easier to sell (it does not replace a grid-compliance-certified product) and harder to ignore if it is specified as a PPC input from the start.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Vendor names",
          md: md`Public product material shows PPCs or plant managers from inverter OEMs (for example SMA, Sungrow, Huawei, Power Electronics), from BESS integrators and platform vendors (for example Fluence, Wärtsilä, Tesla) and from independent automation vendors. Portfolios change and some products are regional. Confirm current products, Gulf references and grid-code test records directly with each vendor before naming them in a proposal.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How PPCs go wrong on real hybrids",
          md: md`- **Oscillation on a weak grid**: voltage-control gains tuned on a strong-grid model hunt at a low-SCR POI; inverter internal Q loops and the PPC loop fight.
- **Night-time Q**: collector cables and transformers draw or inject Mvar at night; nobody specified whether the PPC must compensate with PV inverters (Q at night) or the BESS.
- **Wrong measurement point**: PPC reads a meter on the wrong side of the HV transformer; all set-points are off by losses and transformer Q.
- **Integrator windup** after a long curtailment or a stow, causing overshoot above the POI limit.
- **EMS and PPC conflict**: EMS schedules 100 MW discharge while the PPC must keep 30 MW of frequency headroom; nobody wrote down which wins.
- **Surprise availability drops**: tracker stow or a mass inverter derate in 50 °C heat with no advance signal; the control centre sees an unannounced ramp.`,
        },
        {
          kind: "checklist",
          title: "Before you propose a control function that touches a PPC",
          items: [
            "Get the PPC functional specification and its priority table; find where auxiliary commands sit.",
            "Confirm the measurement point, the meter class and the redundancy of the POI measurement.",
            "Ask how available power is computed and reported to the control centre, and whether it accounts for stowed rows.",
            "Find the ramp-rate and frequency-response clauses in the connection agreement or RFP schedule.",
            "Confirm whether the PPC accepts an external forecast or schedule input, over which protocol, and at what rate.",
            "Agree what happens on loss of the Mizan input: the plant must default to normal tracking and normal PPC behaviour.",
          ],
        },
        {
          kind: "ask",
          title: "Questions for the PPC vendor or EPC controls lead",
          items: [
            "What is your loop update time and the measured latency from set-point receipt to 90 % response at the POI?",
            "How do you handle integrator windup when the plant is resource-limited or stowed?",
            "How do you split P between PV and BESS, and who sets that rule, you or the EMS?",
            "What is your P-Q priority setting at 50 °C ambient, and can you show the derated capability curve?",
            "Can the PPC take an advance availability signal (planned stow or cleaning window) and use it to pre-position the BESS and update reported available power?",
            "Which grid-code tests have you passed with this firmware version, witnessed by whom?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz06-l01-p2",
            type: "short",
            prompt: md`Write the **interface requirement** that Mizan would ask an EPC to include in the PPC specification of a future Kuwait PV+BESS hybrid so that Mizan's dust-stow and cleaning-position functions can operate safely. Half a page: signals in both directions, timing, priority, behaviour on failure and how it will be tested. Use illustrative values where you must.`,
            rubric: [
              "Defines signals from Mizan to the PPC (planned stow or cleaning window with start time, affected capacity, duration) and from the PPC to Mizan (POI P, available power, curtailment state, BESS headroom).",
              "States timing: advance notice (e.g. 15 min or more for planned events), update rate, and allowed ramp so the POI stays within the ramp limit.",
              "Places the function correctly in the priority stack: below protection, grid-code response, TSO set-points and ramp limits; never overrides them.",
              "Defines fail-safe behaviour: loss of the Mizan input reverts to normal tracking and PPC operation; safety stow on wind is the tracker's own function.",
              "Specifies verification: simulated in FAT, witnessed at SAT, with pass criteria (e.g. POI ramp within limit during a commanded stow).",
              "Names the protocol and owner of the interface (e.g. Modbus TCP or IEC 61850 via the SCADA DMZ; EPC controls integrator owns the interface).",
            ],
            modelAnswer: md`**Interface PPC-MZ (illustrative).** (1) *Mizan to PPC*: planned event message with event type (dust stow, wind pre-stow, cleaning position), start time, end time, affected DC capacity in MWp and blocks, and expected available-power profile in 5-minute steps; sent at least 15 min before start, updated every minute. (2) *PPC to Mizan*: POI P and Q, available power, active curtailment and its source, BESS SoC and upward headroom, ramp limit in force, every 1 s. (3) *Priority*: event commands sit below protection, grid-code frequency and voltage response, TSO set-points, ramp limits and the POI limit. The PPC uses the advance profile to pre-position the BESS and update available power reported to the control centre. The tracker controller executes stow at a rate the PPC accepts (illustrative: no more than 10 % of plant rating per minute of capacity moved), unless a safety wind stow overrides. (4) *Failure*: if no valid message arrives for 60 s, the PPC ignores Mizan inputs and the tracker reverts to its own algorithm; the tracker's wind safety stow is never dependent on Mizan. (5) *Protocol and owner*: Modbus TCP register map or IEC 61850 logical nodes through the SCADA DMZ, read-write limited to the event registers; the EPC controls integrator owns the interface and its ICD. (6) *Tests*: FAT in a simulation of the plant with a commanded 30 % stow, pass if POI ramp stays within limit and reported availability updates before the ramp; repeated at SAT witnessed by the owner.`,
            explanation: md`A good interface requirement is testable and keeps Mizan's function subordinate to grid compliance. Signals both ways, advance notice, priority, fail-safe reversion and a FAT/SAT pass criterion are what an EPC controls lead looks for before accepting a third-party input to the PPC.`,
            concepts: ["mz06.priority-stack", "mz06.ppc-performance", "mz06.ramp-control"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an O&M manager at a Kuwaiti utility why tracker stow for dust, which is not a grid function, still has to be coordinated with the power plant controller.",
          keyPoints: [
            "The PPC controls P and Q at the POI against TSO set-points with a closed loop.",
            "Stowing rows reduces available power, which the PPC reports to the control centre and must ramp within limits.",
            "Without advance notice the plant shows an unannounced ramp and can breach the ramp limit.",
            "With notice the PPC can pre-position the BESS and update availability.",
            "Stow commands sit below grid-code functions in the priority stack and must fail safe.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz06-l01-q1",
      type: "mcq",
      prompt: "Why does a PPC measure at the POI rather than summing inverter outputs?",
      options: [
        "Inverters cannot report their own power output.",
        "The contract and the grid code apply at the POI, and losses, transformer Q and unavailable units sit between the inverters and the POI.",
        "POI measurement is faster than inverter communication.",
        "Because protection relays are located at the POI.",
      ],
      answer: 1,
      explanation: md`The set-point is a POI quantity. Closing the loop there corrects for collector and transformer losses (1 to 3 %), transformer reactive consumption and units that are offline or derated.`,
      concepts: ["mz06.ppc-loop"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz06-l01-q2",
      type: "numeric",
      prompt: md`A 200 MW BESS has droop $R = 5\,\%$ and a deadband of 0.2 Hz. Frequency drops to 49.5 Hz. How many MW of extra output does the droop line ask for?`,
      answer: 24,
      unit: "MW",
      tolerance: { rel: 0.02 },
      explanation: md`$\Delta f_{eff} = 0.5 - 0.2 = 0.3$ Hz. $\Delta P = \frac{200}{0.05}\cdot\frac{0.3}{50} = 4{,}000 \times 0.006 = 24$ MW.`,
      concepts: ["mz06.hybrid-frequency-response"],
      difficulty: 2,
    },
    {
      id: "mz06-l01-q3",
      type: "order",
      prompt: "Order these from highest to lowest priority in a typical hybrid PPC design.",
      items: [
        "Inverter protection and fault ride-through",
        "Grid-code frequency and voltage response",
        "TSO active power set-point or curtailment",
        "Ramp-rate limit",
        "EMS economic schedule",
        "Planned tracker stow or cleaning position",
      ],
      explanation: md`Safety and grid support first, then the operator's commands, then constraints, then economics, then auxiliary operations. Mizan's functions live at the bottom and must be designed to fit under everything else.`,
      concepts: ["mz06.priority-stack"],
      difficulty: 2,
    },
    {
      id: "mz06-l01-q4",
      type: "multi",
      prompt: "Which functions are normally executed inside the inverter or PCS rather than by the PPC?",
      options: ["Fault ride-through", "Anti-islanding protection", "Voltage control with slope at the POI", "Fast fault current injection", "Ramp-rate limiting at the POI"],
      answer: [0, 1, 3],
      explanation: md`Millisecond functions must be local; the plant network and a 100 to 200 ms PPC loop are too slow. POI voltage control and ramp limiting are plant-level PPC functions.`,
      concepts: ["mz06.ppc-loop", "mz06.priority-stack"],
      difficulty: 2,
    },
    {
      id: "mz06-l01-q5",
      type: "numeric",
      prompt: md`An inverter block is rated 330 MVA (after derating at 50 °C) and delivers 300 MW. How much reactive power (Mvar) is left at its terminals?`,
      answer: 137.5,
      unit: "Mvar",
      tolerance: { rel: 0.01 },
      explanation: md`$Q = \sqrt{330^2 - 300^2} = \sqrt{18{,}900} = 137.5$ Mvar. Transformers consume part of this before the POI.`,
      concepts: ["mz06.voltage-q-control"],
      difficulty: 1,
    },
    {
      id: "mz06-l01-q6",
      type: "decision",
      prompt: md`Illustrative. An EPC controls lead says: "Your dust-stow function can drive the trackers directly; the PPC will just see less power and cope." What do you answer?`,
      options: [
        { text: "Agree: the PPC loop will compensate automatically.", score: 0, feedback: "The PPC cannot create power that stowed rows do not make. The control centre sees an unannounced drop and the ramp limit may be breached." },
        { text: "Propose an advance availability signal to the PPC, a stow rate the PPC accepts, BESS pre-positioning, and fail-safe reversion, all tested in FAT and SAT.", score: 1, feedback: "This makes the function grid-compliant by design and positions Mizan as a controls-literate partner." },
        { text: "Insist that Mizan's function must have priority over the PPC so the trackers are protected.", score: 0.2, feedback: "Wind safety stow is the tracker's own function. Dust stow is an economic optimisation and must sit below grid-code functions." },
      ],
      explanation: md`Auxiliary commands that change available power must be visible to the PPC in advance and must never take priority over grid functions.`,
      concepts: ["mz06.priority-stack", "mz06.ramp-control"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz06-l01-f1", front: "Where does a PPC close its loop?", back: "At the POI meter: P, Q, V, f measured where the contract and grid code apply.", concepts: ["mz06.ppc-loop"] },
    { id: "mz06-l01-f2", front: "Typical PPC loop update time", back: "100 to 200 ms; fast functions (FRT, fault current) stay in the inverter.", concepts: ["mz06.ppc-loop"] },
    { id: "mz06-l01-f3", front: "Anti-windup", back: "Freeze or clamp the PI integrator when the output saturates, to avoid overshoot when the limit releases.", concepts: ["mz06.ppc-loop"] },
    { id: "mz06-l01-f4", front: "BESS energy to hold a ramp limit through a step drop", back: md`$E_B = \Delta P^2 / (2\dot P_{max})$ in MW·min; 120 MW at 30 MW/min is 4 MWh.`, concepts: ["mz06.ramp-control"] },
    { id: "mz06-l01-f5", front: "Headroom for full droop response", back: md`$P_{hr} = \frac{P_n}{R}\cdot\frac{|\Delta f_{max}| - db}{f_n}$; must exist in BESS power, PV curtailment and POI capacity at once.`, concepts: ["mz06.hybrid-frequency-response"] },
    { id: "mz06-l01-f6", front: "Q-V slope control", back: md`$Q = -\frac{V - V_{ref}}{s} Q_{max}$; a 4 % slope uses all of Q_max for a 4 % voltage error.`, concepts: ["mz06.voltage-q-control"] },
    { id: "mz06-l01-f7", front: "Where do Mizan's stow and cleaning functions sit in the PPC priority stack?", back: "At the bottom: below protection, grid-code response, TSO commands, ramp and POI limits and the EMS schedule; they must announce availability changes in advance and fail safe.", concepts: ["mz06.priority-stack"] },
  ],
};

export default lesson;
