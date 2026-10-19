import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m06-l03",
  title: "Frequency and Voltage Control: Inertia, Droop, AGC, PPC, Grid-Forming and System Strength",
  summary:
    "How a power system holds 50 Hz and its voltages: inertia and RoCoF, primary/secondary/tertiary control, droop derived, AGC, what a power plant controller does, Q/V control modes, grid-following vs grid-forming inverters, and system strength measured by SCR — with calculations for a Kuwait-scale system.",
  minutes: 85,
  objectives: [
    "You can derive RoCoF from the swing equation and explain why falling inertia matters as PV displaces thermal units",
    "You can describe the frequency-control timeline (inertial, primary, secondary/AGC, tertiary) and derive droop response with a deadband",
    "You can list power plant controller (PPC) functions and Q/V control modes and specify their performance",
    "You can explain grid-following vs grid-forming inverters and when grid-forming is needed",
    "You can compute SCR/WSCR and voltage sensitivity and interpret them for a PV/BESS connection",
  ],
  concepts: [
    {
      id: "m06.inertia",
      name: "Inertia and RoCoF",
      description: "Kinetic energy in synchronous machines resists frequency change; RoCoF = ΔP·f₀/(2HS). Less inertia → faster frequency fall.",
      competency: "grid",
      related: ["m06.frequency-control", "m01.inertia-rocof"],
    },
    {
      id: "m06.frequency-control",
      name: "Primary, secondary and tertiary frequency control",
      description: "Inertial response, then droop-based primary control (seconds), AGC/secondary (tens of seconds–minutes), tertiary reserves (≥15 min), and under-frequency load shedding as last resort.",
      competency: "grid",
      related: ["m06.droop", "m06.inertia", "m01.frequency-response", "m05.frequency-response"],
    },
    {
      id: "m06.droop",
      name: "Droop control",
      description: "Proportional P–f characteristic: R = (Δf/fn)/(ΔP/Pn); shares load changes among units; deadband and headroom set actual response.",
      competency: "grid",
      related: ["m06.frequency-control", "m05.frequency-response"],
    },
    {
      id: "m06.ppc",
      name: "Power plant controller (PPC)",
      description: "Plant-level closed-loop controller at the POI coordinating inverters/BESS: P set-point, ramps, frequency response, Q/V/PF control, curtailment, TSO interface.",
      competency: "grid",
      related: ["m06.droop", "m06.qv-control"],
    },
    {
      id: "m06.qv-control",
      name: "Reactive power / voltage control modes",
      description: "Voltage control with slope, Q set-point, PF set-point, Q(V) characteristic; X/R and grid strength determine the effect.",
      competency: "grid",
      related: ["m06.ppc", "m06.system-strength"],
    },
    {
      id: "m06.grid-forming",
      name: "Grid-following vs grid-forming inverters",
      description: "GFL: PLL-synchronised current source needing a stiff grid; GFM: voltage source behind impedance providing inherent inertia-like response, weak-grid operation and black start.",
      competency: "grid",
      related: ["m06.system-strength", "m06.inertia", "m05.black-start"],
    },
    {
      id: "m06.system-strength",
      name: "System strength and SCR",
      description: "Fault level at the POI relative to plant rating (SCR, WSCR, ESCR); low SCR causes voltage sensitivity and control instability.",
      competency: "grid",
      related: ["m06.grid-forming", "m06.qv-control", "m01.system-strength"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Holding 50 Hz and holding voltage",
      blocks: [
        {
          kind: "md",
          md: md`### Frequency is the power balance

In an AC system, all synchronous generators rotate in lock-step at a speed proportional to frequency. If generation exceeds load, the surplus energy accelerates the rotors and frequency rises; if a generator trips, the deficit is drawn from the rotors' kinetic energy and frequency falls. Each machine's stored energy is expressed by its inertia constant $H$ — the seconds it could supply rated power from its kinetic energy alone:`,
        },
        { kind: "equation", formula: "m06-kinetic-energy" },
        {
          kind: "md",
          md: md`For the whole system, the swing equation in per unit is $\tfrac{2H}{f_0}\tfrac{df}{dt} = \tfrac{P_m - P_e}{S_{sys}}$. Immediately after losing $\Delta P$, before any control acts, frequency falls at:`,
        },
        { kind: "equation", formula: "m06-rocof" },
        {
          kind: "md",
          md: md`Kuwait's summer system runs ~17.5 GW of load almost entirely on thermal units (gas and steam turbines) with inertia constants of roughly 3–9 s, so inertia is high today. As gigawatts of PV displace thermal units at midday — and the largest single contingency grows (a 1,100 MW solar plant tripping on a fault is a bigger loss than the 300 MW Az-Zour South steam unit that tripped on 19 June 2024) — RoCoF rises and the time available for governors shrinks.`,
        },
        { kind: "sources", refs: ["m06-mees-power-crisis-2024", "m06-kuwaittimes-peak-2026"] },
        {
          kind: "md",
          md: md`### The frequency-control timeline

| Stage | Time after event | Provided by | Mechanism |
|---|---|---|---|
| **Inertial response** | 0–~5 s | Synchronous machines (physics); grid-forming inverters; FFR from BESS (< 0.5–1 s) | Kinetic energy / fast injection limits RoCoF and nadir |
| **Primary control (FCR)** | ~2–30 s | Governors, BESS, curtailed PV | **Droop**: proportional to Δf; arrests decline and stabilises frequency at a new offset |
| **Secondary control (AGC / aFRR)** | ~30 s–15 min | Units on AGC dispatched by the control centre | Integral control: restores 50 Hz and scheduled tie-line flows |
| **Tertiary control (mFRR / reserves)** | ≥ 15 min | Dispatch, start-up of reserve units | Restores primary and secondary reserves |
| **Under-frequency load shedding (UFLS)** | when f < ~49.0–48.8 Hz | Relays on feeders | Last resort to save the system |

Key quantities after a loss: **RoCoF** (initial slope), **nadir** (lowest frequency — must stay above UFLS settings), **settling frequency** (after primary control) and **recovery time** (secondary).

### Droop — derived

A governor with droop $R$ changes its output in proportion to frequency deviation: a frequency change of $R \times f_n$ moves it through its full rating. With a deadband $db$ (no response for small deviations):`,
        },
        { kind: "equation", formula: "m06-droop" },
        {
          kind: "md",
          md: md`Summing over all responding units, the system's **frequency response characteristic** is $\beta = \sum P_{n,i}/(R_i f_n)$ (MW/Hz), and the steady-state deviation after a loss $\Delta P$ is $\Delta f_{ss} \approx -\Delta P/\beta$ (plus load damping, which helps). Because droop is proportional, units share load changes in proportion to their ratings — no communication required. Secondary control (AGC) then shifts each unit's set-point to bring frequency back to exactly 50 Hz. In an interconnected system (Kuwait–GCCIA) AGC uses the **area control error**, $ACE = \Delta P_{tie} - 10\,B\,\Delta f$, so each area corrects its own imbalance.`,
        },
        { kind: "widget", widget: "droop", props: { droop: 4 }, caption: "Change droop, deadband and headroom; see how much a plant contributes during a frequency event." },
        {
          kind: "callout",
          tone: "why",
          title: "Why PV needs headroom to help under-frequency",
          md: md`A PV plant at maximum power point cannot increase output when frequency falls — it has no stored energy and no "throttle" margin. It can only reduce output for over-frequency (LFSM-O). To provide under-frequency response, PV must be **curtailed** (holding, say, 5–10 % headroom, which costs energy every hour) or paired with **BESS**, which can respond in both directions within ~100–200 ms. That is one of the strongest system arguments for co-locating BESS with Shagaya's PV.`,
        },
        {
          kind: "md",
          md: md`### The power plant controller (PPC)

Hundreds of inverters cannot each be told what to do by the control centre. The PPC is the plant-level closed-loop controller: it measures at the POI (P, Q, V, f), receives set-points from the TSO via SCADA, and dispatches inverter/BESS set-points every ~100–200 ms.

| PPC function | Typical requirement |
|---|---|
| Active power set-point / curtailment | Follow TSO set-point within ~1 min; accuracy ±1–2 % Pmax |
| Ramp-rate limiting | e.g. ≤ 10 % Pmax/min up; down with BESS |
| Frequency response | LFSM-O (droop 2–12 %, threshold ~50.2 Hz); LFSM-U and FSM with BESS |
| Voltage control | Voltage set-point with slope (e.g. 2–7 %), response to 90 % in ~1–5 s |
| Q and PF control | Q set-point or PF set-point modes |
| Hybrid coordination | Share P/Q between PV and BESS; SoC management; POI limit |
| Interfaces | TSO SCADA (IEC 60870-5-104 / IEC 61850), inverter fieldbus (Modbus TCP / IEC 61850) |

Inverters themselves handle fast functions (FRT, fast fault current) locally — the PPC is too slow for those.

### Voltage control

On transmission networks X ≫ R, so voltage responds mainly to reactive power:`,
        },
        { kind: "equation", formula: "m06-voltage-sensitivity" },
        {
          kind: "md",
          md: md`**Voltage control with slope** (Q = −(V − V_ref)/slope × Q_max) is the preferred mode for large plants: it supports voltage automatically and shares reactive duty with neighbouring plants. **Q** or **PF** set-point modes are simpler but do not react to voltage. On a weak grid (large $x$), each Mvar moves voltage a lot — fast voltage controllers can then become unstable.

### System strength and SCR`,
        },
        { kind: "equation", formula: "m06-scr" },
        {
          kind: "md",
          md: md`Grid-following inverters synchronise using a **phase-locked loop (PLL)** that tracks the grid voltage angle, and inject current accordingly. They assume a stiff voltage. When SCR is low (< ~3), the inverter's own current significantly moves the voltage it is trying to follow; control loops interact, and oscillations or loss of synchronism can occur. Mitigations: tuning, synchronous condensers (add fault level and inertia), STATCOMs, or **grid-forming** inverters.

### Grid-following vs grid-forming

| | **Grid-following (GFL)** | **Grid-forming (GFM)** |
|---|---|---|
| Behaves as | Controlled current source synchronised by PLL | Controlled voltage source behind an impedance |
| Needs a strong grid? | Yes (SCR ≳ 3 typical) | No — can operate at very low SCR and in islands |
| Inertia-like response | Only if programmed (synthetic, after measurement delay) | Inherent: responds instantly to phase/frequency changes |
| Fault current | ~1.0–1.2 pu, controlled | ~1.0–1.5 pu (needs current limiting; may need oversizing) |
| Black start | No | Yes |
| Energy source needed | PV or BESS | Needs headroom/storage to deliver inertia — practical mainly on BESS |
| Maturity | Standard | Commercially deployed on large BESS (e.g. Australia, GB); requirements emerging |

For Kuwait, a reasonable stance: require **GFM-capable PCS** on the national BESS (cost premium is modest for new BESS), keep PV on GFL, and decide on enabling GFM based on system-strength studies.`,
        },
        { kind: "sources", refs: ["m06-nrel-gfm-roadmap", "m06-aemo-system-strength", "m06-ieee-2800", "m06-ofgem-9aug2019"] },
      ],
    },
    {
      layer: "applied",
      title: "Frequency events, droop and grid strength in numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A 300 MW unit trips: RoCoF, time to 49.6 Hz, and a BESS's droop response",
          given: md`Online synchronous capacity 15,000 MVA with system inertia H = 4 s (on that base). A 300 MW unit trips. A 500 MW BESS provides primary response with droop R = 4 %, deadband ±0.2 Hz (response measured from the deadband edge). Nominal 50 Hz.`,
          steps: [
            { md: md`**RoCoF**: $\tfrac{300 \times 50}{2 \times 4 \times 15{,}000} = 0.125$ Hz/s.` },
            { md: md`**Time to 49.6 Hz if nothing responded**: $0.4/0.125 = 3.2$ s. Steam-turbine governors take ~5–10 s to deliver full primary response — so fast resources (BESS, FFR) or inertia carry the first seconds.` },
            { md: md`**BESS droop at 49.6 Hz**: effective deviation $0.4 - 0.2 = 0.2$ Hz. $\Delta P = 500 \times 0.2/(50 \times 0.04) = 500 \times 0.2/2 = 50$ MW.` },
            { md: md`**Without deadband**: $500 \times 0.4/2 = 100$ MW. Deadband choice halves the response at this deviation; codes for FFR use much narrower deadbands (e.g. ±0.015–0.05 Hz) or triggered step responses.` },
          ],
          result: md`RoCoF 0.125 Hz/s; ~3 s before a 0.4 Hz excursion without response; the BESS adds 50 MW at 49.6 Hz with a 0.2 Hz deadband (100 MW without). Specifying droop alone is meaningless — **droop, deadband, reference (nominal vs deadband edge), response time and headroom** must all be specified.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "How strong is the grid at the POI?",
          given: md`Option A: connect a 1,100 MW PV plant at a 400 kV bus with fault level 8,000 MVA (without the plant). Option B: connect a 500 MW plant at a 132 kV bus with fault level 2,500 MVA, where a 300 MW PV plant is already connected electrically nearby. Use a 100 MVA base for voltage sensitivity.`,
          steps: [
            { md: md`**Option A SCR**: $8{,}000/1{,}100 = 7.3$ → strong.` },
            {
              md: md`**Option B SCR (alone)**: $2{,}500/500 = 5.0$; **WSCR** with the neighbour: $2{,}500/(500 + 300) = 3.1$ → moderate–weak; EMT study needed.`,
              hidden: true,
              check: { prompt: "WSCR for option B", answer: 3.125, tolerance: { rel: 0.01 } },
            },
            { md: md`**Voltage sensitivity**: $x \approx S_{base}/S_{sc}$. Option A: $100/8{,}000 = 0.0125$ pu → 100 Mvar (1 pu) moves voltage ~1.25 %.` },
            {
              md: md`Option B: $x = 100/2{,}500 = 0.04$ pu → 100 Mvar moves voltage ~**4 %**.`,
              hidden: true,
              check: { prompt: "Voltage change for 100 Mvar at option B", answer: 4, unit: "%", tolerance: { rel: 0.02 } },
            },
          ],
          result: md`The same plant behaves very differently: at option B each Mvar moves voltage 3.2× as much, and the two plants' controllers interact (WSCR ≈ 3.1). Expect tighter controller tuning, EMT studies and possibly grid-forming BESS or a synchronous condenser. SCR is the first number to ask for at any proposed connection point.`,
        },
        {
          kind: "question",
          question: {
            id: "m06-l03-p1",
            type: "numeric",
            prompt: md`Future midday scenario: online synchronous capacity falls to 12,000 MVA with H = 3 s as PV displaces thermal units. A 1,100 MW PV plant trips due to an FRT failure. What is the initial RoCoF (Hz/s)?`,
            answer: 0.764,
            unit: "Hz/s",
            tolerance: { rel: 0.02 },
            explanation: md`$\tfrac{1{,}100 \times 50}{2 \times 3 \times 12{,}000} = 0.764$ Hz/s — six times the 300 MW case. Legacy RoCoF/vector-shift loss-of-mains protections trip embedded generation at settings as low as 0.125 Hz/s (GB embedded generation tripped this way on 9 August 2019; GB has since moved to 1 Hz/s), and governors cannot act fast enough: FRT compliance and fast BESS response become system-critical.`,
            concepts: ["m06.inertia"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Specifying and testing control behaviour",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **MEWRE National Control Centre** (system operator) sets frequency and voltage control requirements, dispatches set-points, runs AGC, and coordinates with GCCIA.
- **Developer's grid consultant** models the plant and PPC in PSS/E/PowerFactory (RMS) and PSCAD (EMT); tunes controller parameters.
- **PPC supplier** (inverter OEM or specialist) implements the logic; the EPC integrates BESS and PV control.
- **Owner's Engineer** reviews control philosophy, studies and test procedures; witnesses step tests.

### What to specify (not just "comply with grid code")

For each control function: **mode(s), set-point range, slope/droop, deadband, response time (to 90 %), settling time, accuracy, measurement location (POI), priority order** (e.g. frequency response over ramp limits; voltage over PF), and **communication latency** from control centre to plant.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- Droop specified without deadband/reference → disputes at testing.
- PPC tuned on a strong-grid model; oscillates at the real, weaker connection or when a line is out.
- Hybrid PV+BESS PPC lets BESS SoC drift to empty during prolonged frequency response, so the evening shift fails.
- Frequency measurement too noisy (or too filtered) → spurious or slow response.
- Control centre sends set-points by phone/email because the SCADA interface is late — no audit trail, slow response.
- Grid-forming enabled without studies → interactions with nearby synchronous machines' controls.`,
        },
        {
          kind: "checklist",
          title: "PM checks on control capability",
          items: [
            "Control philosophy document approved: modes, priorities, set-point sources, fall-back on communication loss",
            "Droop, deadband, reference and response time specified for every frequency mode; headroom policy for PV",
            "Voltage control slope and response time specified at POI; coordination with neighbouring plants",
            "SCR/WSCR at POI known for N and N-1; EMT study if SCR < ~3–5",
            "GFM capability required on BESS PCS (enabled per studies)",
            "BESS SoC management rules when providing frequency response alongside energy shifting",
            "Step tests (P, Q, V, f injection) in the compliance plan, with acceptance criteria",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "What is the PPC closed-loop response time for a voltage set-point step, measured at the POI?",
            "How does your PPC prioritise frequency response, ramp limits and the BESS evening schedule when they conflict?",
            "At what minimum SCR has your inverter/PPC been validated in EMT, and with what controller settings?",
            "Is your BESS PCS grid-forming capable, and what fault current and overload can it supply for how long?",
            "What happens if the SCADA link to the control centre is lost?",
          ],
        },
        { kind: "scenario", scenario: "m06-s3" },
        {
          kind: "feynman",
          prompt: "Explain to a colleague from the finance department why replacing gas turbines with solar panels makes the grid's frequency 'more nervous', and what MEWRE can do about it.",
          keyPoints: [
            "Spinning turbines store kinetic energy (inertia) that slows frequency change after a trip",
            "Solar inverters have no rotating mass, so less inertia means faster frequency fall (higher RoCoF)",
            "Governors need seconds to respond; with low inertia frequency can reach load-shedding levels first",
            "Fixes: fast frequency response from batteries, grid-forming inverters, synchronous condensers, keeping enough thermal units online",
            "Grid codes require PV to ride through faults so the largest loss does not grow",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m06-l03-q1",
      type: "numeric",
      prompt: md`A 1,100 MW PV plant has LFSM-O droop of 5 % with activation threshold 50.2 Hz (droop measured from 50.2 Hz). Frequency rises to 50.3 Hz. By how many MW must the plant reduce output?`,
      answer: 44,
      unit: "MW",
      tolerance: { rel: 0.01 },
      explanation: md`$\Delta P = 1{,}100 \times (50.3 - 50.2)/(50 \times 0.05) = 1{,}100 \times 0.1/2.5 = 44$ MW. Over-frequency response is easy for PV (it just curtails); under-frequency response needs headroom or BESS.`,
      concepts: ["m06.droop"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "m06-l03-q2",
      type: "order",
      prompt: md`Order the frequency-control actions after a large generator trip, from first to last.`,
      items: [
        "Inertial response of synchronous machines (and FFR from BESS)",
        "Primary control: governor and BESS droop response",
        "Secondary control: AGC restores 50 Hz and tie-line schedules",
        "Tertiary control: reserves dispatched to restore primary/secondary margins",
      ],
      explanation: md`Inertia acts instantly; primary droop within seconds arrests and stabilises frequency at an offset; AGC removes the offset over minutes; tertiary reserves restore the margins for the next event.`,
      concepts: ["m06.frequency-control"],
      difficulty: 1,
    },
    {
      id: "m06-l03-q3",
      type: "mcq",
      prompt: md`Why does a grid-following inverter struggle at very low SCR?`,
      options: [
        "It cannot produce reactive power",
        "Its PLL tracks a voltage that its own current significantly moves, causing control interactions and instability",
        "It has too much inertia",
        "It produces DC current",
      ],
      answer: 1,
      explanation: md`In a weak grid the inverter's current changes the POI voltage magnitude and angle; the PLL and current controllers chase a moving target. Grid-forming inverters set voltage rather than follow it.`,
      concepts: ["m06.grid-forming", "m06.system-strength"],
      difficulty: 2,
    },
    {
      id: "m06-l03-q4",
      type: "numeric",
      prompt: md`Aggregate governor response in a system: 12,000 MW of units with 4 % droop on 50 Hz, no deadband, load damping ignored. What is the steady-state frequency deviation (Hz) after a 300 MW loss?`,
      answer: -0.05,
      unit: "Hz",
      tolerance: { abs: 0.002 },
      explanation: md`$\beta = 12{,}000/(0.04 \times 50) = 6{,}000$ MW/Hz; $\Delta f = -300/6{,}000 = -0.05$ Hz. AGC then returns frequency to 50 Hz.`,
      concepts: ["m06.droop", "m06.frequency-control"],
      difficulty: 2,
    },
    {
      id: "m06-l03-q5",
      type: "multi",
      prompt: md`Which are functions of a solar/BESS power plant controller (PPC)? (Select all.)`,
      options: [
        "Active power set-point following and curtailment",
        "Ramp-rate limiting",
        "Voltage control at the POI with slope",
        "Sub-cycle fault current injection during a fault",
        "Coordinating PV and BESS within the POI limit",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`The PPC operates at ~100–200 ms cycle times on plant-level quantities. Fast fault response (within tens of ms) is handled by each inverter's local control.`,
      concepts: ["m06.ppc"],
      difficulty: 1,
    },
    {
      id: "m06-l03-q6",
      type: "decision",
      prompt: md`System studies for MEWRE's 1.5 GW BESS programme show midday SCR at one site falling to ~2.5 in 2030 scenarios. The draft specification requires only grid-following PCS. What do you recommend?`,
      options: [
        { text: "Keep grid-following; SCR is a 2030 problem.", score: 0.2, feedback: "BESS life is 20 years; retrofitting control capability later is difficult and the problem is visible now." },
        { text: "Require grid-forming-capable PCS (enable per final studies), specify GFM performance (inertia constant, fault current, damping), and require EMT models; evaluate any cost premium.", score: 1, feedback: "Correct — buy the capability now at modest cost, decide on enabling with studies." },
        { text: "Specify synchronous condensers instead of BESS.", score: 0.4, feedback: "Condensers add strength and inertia but do not shift energy; they may complement, not replace, the BESS." },
      ],
      explanation: md`Grid-forming capability is cheapest to acquire at procurement. Specify performance rather than a brand of control.`,
      concepts: ["m06.grid-forming", "m06.system-strength"],
      difficulty: 3,
    },
    {
      id: "m06-l03-q7",
      type: "mcq",
      prompt: md`Why do transmission operators prefer voltage control with slope over a fixed PF mode for large plants?`,
      options: [
        "PF mode cannot be implemented in inverters",
        "Voltage control responds automatically to voltage deviations and shares reactive duty among plants, whereas fixed PF ignores voltage",
        "Voltage control needs no communication with the plant",
        "Slope mode produces only active power",
      ],
      answer: 1,
      explanation: md`With a slope, each plant's Q changes in proportion to voltage error, providing stable sharing (like droop for frequency). Fixed PF makes Q follow P — e.g. absorbing more vars exactly when PV output and voltage are high or low, regardless of grid need.`,
      concepts: ["m06.qv-control"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m06-l03-f1", front: "RoCoF formula", back: md`$df/dt = -\Delta P f_0/(2 H S_{sys})$`, concepts: ["m06.inertia"] },
    { id: "m06-l03-f2", front: "Meaning of 4 % droop", back: "A 4 % frequency change (2 Hz at 50 Hz) moves the unit through 100 % of its rating", concepts: ["m06.droop"] },
    { id: "m06-l03-f3", front: "System frequency response characteristic β", back: md`$\beta = \sum P_{n,i}/(R_i f_n)$ MW/Hz; $\Delta f_{ss} = -\Delta P/\beta$`, concepts: ["m06.droop"] },
    { id: "m06-l03-f4", front: "What AGC does", back: "Secondary (integral) control: restores 50 Hz and scheduled tie-line flows via ACE", concepts: ["m06.frequency-control"] },
    { id: "m06-l03-f5", front: "SCR thresholds", back: "> ~5 strong; 3–5 moderate; < 3 weak (EMT studies, GFM/condensers)", concepts: ["m06.system-strength"] },
    { id: "m06-l03-f6", front: "Grid-following vs grid-forming in one line", back: "GFL: PLL-synchronised current source; GFM: voltage source behind impedance", concepts: ["m06.grid-forming"] },
    { id: "m06-l03-f7", front: "Why PV can't help under-frequency without headroom", back: "At MPP it has no extra power; must be curtailed or paired with BESS", concepts: ["m06.droop"] },
    { id: "m06-l03-f8", front: "Voltage sensitivity in per unit", back: md`$\Delta v \approx r\Delta p + x\Delta q$, with $x \approx S_{base}/S_{sc}$`, concepts: ["m06.qv-control", "m06.system-strength"] },
    { id: "m06-l03-f9", front: "Five parameters needed to specify frequency response", back: "Droop, deadband, reference point, response time, headroom/energy", concepts: ["m06.ppc"] },
  ],
  scenarios: [
    {
      id: "m06-s3",
      title: "The oscillation at 13:00",
      context: md`You are MEWRE's PM for a recently connected 500 MW PV + 250 MW BESS hybrid at a 132 kV station. On days when a parallel 132 kV line is out for maintenance, the control centre observes ~3 Hz power and voltage oscillations of ±15 MW from the plant around midday.`,
      start: "a",
      concepts: ["m06.system-strength", "m06.ppc", "m06.grid-forming"],
      nodes: {
        a: {
          md: md`The control centre asks for immediate action. The IPP's O&M says "the plant is grid-code compliant; it must be the grid".`,
          choices: [
            { text: "Agree an immediate operational mitigation with the control centre (e.g. limit plant output or switch voltage control to a slower mode during line outages), and require the IPP to start a root-cause investigation with EMT studies of the N-1 configuration.", next: "b", score: 10, feedback: "Secure the system first, then investigate with the right tool (EMT)." },
            { text: "Order the plant disconnected until the cause is found.", next: "b", score: 5, feedback: "Safe but costly (deemed energy may apply) when a limited mitigation would do." },
            { text: "Accept the IPP's view and do nothing.", next: "c", score: 0, feedback: "Sustained oscillations can damage equipment and trigger protection." },
          ],
        },
        b: {
          md: md`EMT studies show the SCR at the POI falls from 4.5 to 2.4 with the parallel line out, and the PPC voltage loop (tuned for SCR 4.5) becomes poorly damped. Options: (1) adaptive PPC tuning for N-1; (2) enable grid-forming mode on the BESS PCS (it is GFM-capable); (3) add a synchronous condenser (18 months).`,
          choices: [
            { text: "Pursue (1) and (2) with studies and witnessed tests, keep the operational limit until proven, and reserve (3) as a fall-back; agree who pays based on the connection agreement and compliance obligations.", next: "d", score: 10, feedback: "Cheapest effective fixes first, evidence-based, with contractual clarity." },
            { text: "Go straight to the synchronous condenser.", next: "d", score: 5, feedback: "Robust but slow and expensive; control fixes may solve it in weeks." },
          ],
        },
        c: {
          md: md`Two weeks later a distance relay on the remaining line operates spuriously during an oscillation, briefly islanding a load area.`,
          choices: [
            { text: "Report the incident, restrict the plant during N-1, and begin the investigation that should have started earlier.", score: 3, feedback: "Necessary — but an avoidable outage occurred." },
          ],
        },
        d: {
          md: md`The fixes damp the oscillations. The planning team asks what to require in future connection studies.`,
          choices: [
            { text: "Require EMT studies for N and credible N-1 configurations whenever SCR < ~5, controller tuning validated across the SCR range, and GFM capability on BESS.", score: 10, feedback: "Exactly the lesson." },
            { text: "Require all plants to connect at 400 kV only.", score: 3, feedback: "Not always possible or economic; studies are the general solution." },
          ],
        },
      },
    },
  ],
};

export default lesson;
