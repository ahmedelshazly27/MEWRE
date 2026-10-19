import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m01-l06",
  title: "Power System Structure, Frequency and Inertia",
  summary:
    "From power station to socket; why frequency is the heartbeat of the grid; the swing equation, inertia and ROCOF; governor droop and the frequency-response timeline; and why inverter-based resources change system strength — with Kuwait's 400 kV backbone and the GCC interconnector.",
  minutes: 65,
  objectives: [
    "You can describe the structure of a power system (generation, transmission, distribution) and the role of each voltage level, including Kuwait's 400 kV backbone.",
    "You can explain frequency as the real-time indicator of power balance, using the swing equation.",
    "You can compute system kinetic energy, initial ROCOF after a loss of infeed, and a unit's droop response.",
    "You can explain why inverter-based resources reduce inertia and fault level, compute a short-circuit ratio, and list mitigations a PM should ask about.",
  ],
  concepts: [
    {
      id: "m01.system-structure",
      name: "Power system structure",
      description: "Generation, transmission (400 and 132 kV class, plus any intermediate EHV level), sub-transmission and distribution (33/11 kV, 415 V) linked by substations, operated by a control centre; interconnectors to neighbours.",
      competency: "grid",
      related: ["m01.frequency-balance", "m06.transmission-voltage", "m00.mewre-role"],
    },
    {
      id: "m01.frequency-balance",
      name: "Frequency as power balance",
      description: "All synchronous machines rotate together; any generation–load mismatch changes their speed and hence system frequency (swing equation).",
      competency: "grid",
      related: ["m01.inertia-rocof", "m01.frequency-response", "m06.frequency-control", "m00.reserve-margin"],
    },
    {
      id: "m01.inertia-rocof",
      name: "Inertia and ROCOF",
      description: "Stored rotating kinetic energy (H·S) limits the initial rate of change of frequency after a disturbance: ROCOF = −ΔP·f₀/(2ΣHS).",
      competency: "grid",
      related: ["m01.system-strength", "m06.inertia"],
    },
    {
      id: "m01.frequency-response",
      name: "Frequency response and droop",
      description: "Inertial response, primary (governor droop), secondary (AGC) and tertiary control restore balance over seconds to minutes; under-frequency load shedding is the last defence.",
      competency: "grid",
      related: ["m06.droop", "m05.frequency-response"],
    },
    {
      id: "m01.system-strength",
      name: "System strength and inverter-based resources",
      description: "Low fault level (short-circuit ratio) and low inertia as IBR displace synchronous machines; mitigated by grid-forming inverters, synchronous condensers, STATCOMs and fast frequency response.",
      competency: "grid",
      related: ["m01.fault-level", "m01.reactive-capability", "m06.system-strength", "m06.grid-forming"],
    },
  ],
  sections: [
    // ================================================================ THEORY
    {
      layer: "theory",
      title: "The grid as one giant machine",
      blocks: [
        {
          kind: "md",
          md: md`### Structure: generation → transmission → distribution

| Layer | Typical voltages | Role | Who in Kuwait |
|---|---|---|---|
| Generation | 11–24 kV at generator terminals, stepped up | Convert fuel/sun/wind to electricity | MEWRE power stations; IWPPs (Az-Zour North); renewable IPPs (Shagaya) |
| Transmission | 400 kV and 132 kV (plus an intermediate EHV level — confirm with MEWRE) | Bulk transfer over long distances, meshed for security | MEWRE Transmission; National Control Centre |
| Sub-transmission / primary distribution | 33 kV, 11 kV | Feed primary substations and large consumers | MEWRE Distribution |
| Low-voltage distribution | 415/240 V | Homes, shops | MEWRE Distribution |
| Interconnection | 400 kV (GCCIA) | Reserve sharing, emergency support, trading | GCCIA |

Why high voltage for transmission? For a given power, current is $I = S/(\sqrt3 V)$ and loss is $I^2R$. Tripling voltage from 132 kV to 400 kV cuts current to a third and losses to about a ninth for the same conductor. The cost is bigger towers, clearances and substations — justified for bulk flows such as the ~1 GW-scale outputs planned at Shagaya, in the desert of Jahra Governorate west of Kuwait City, far from the main load centres on the coast.

Transmission is **meshed** and designed to the **N-1 criterion**: the system must stay within limits after losing any single element (a line, transformer or generator). Distribution is usually **radial** or open-ring.

### Frequency: the heartbeat

Every synchronous generator on the grid rotates in lock-step with system frequency:`,
        },
        { kind: "equation", formula: "m01-sync-speed" },
        {
          kind: "md",
          md: md`At 50 Hz a 2-pole steam or gas turbo-generator turns at 3,000 rpm. These rotors, together with their turbines, store kinetic energy — the grid's **inertia**. If load exceeds generation even for a moment, the shortfall is drawn from that kinetic energy and the machines slow down: **frequency falls**. If generation exceeds load, they speed up. Frequency is therefore a system-wide, real-time measure of power balance — the reason it is controlled within a narrow band (typically ±0.1–0.2 Hz in normal operation).

The physics is Newton's second law for rotation, written in power terms — the **swing equation**:`,
        },
        { kind: "equation", formula: "m01-swing-equation" },
        { kind: "equation", formula: "m01-inertia-constant" },
        {
          kind: "md",
          md: md`### ROCOF: how fast frequency falls

Immediately after a sudden loss of $\Delta P$ (a large unit trips), before any controller has acted, the swing equation summed over all machines gives the initial **rate of change of frequency**:`,
        },
        { kind: "equation", formula: "m01-rocof" },
        {
          kind: "callout",
          tone: "why",
          title: "Why inertia matters more as PV grows",
          md: md`PV and BESS inverters have no rotating mass coupled to the grid: unless specifically designed as grid-forming with synthetic inertia, they contribute **zero** H. When 3 GW of PV runs at midday and displaces 3 GW of synchronous units, the system's kinetic energy falls, so the same trip produces a faster frequency fall. Faster ROCOF leaves less time for governors to act, can trigger ROCOF-based protection, and pushes frequency lower before arrest (the **nadir**). That is why modern grid codes and standards such as IEEE 2800 specify ROCOF withstand for IBR (typically several Hz/s — check the exact value in the applicable code) and value **fast frequency response** from BESS.`,
        },
        {
          kind: "md",
          md: md`### The frequency-response timeline

| Time after event | Mechanism | What provides it |
|---|---|---|
| 0–2 s | **Inertial response** — kinetic energy released automatically | Synchronous machines; grid-forming inverters (synthetic) |
| 0.2–2 s | **Fast frequency response (FFR)** | BESS (sub-second), some PV with headroom |
| 2–30 s | **Primary control** — governor droop arrests the fall | Thermal units, BESS, curtailed PV |
| 30 s–15 min | **Secondary control (AGC)** — restores 50 Hz and interchange schedules | Control centre dispatch signals |
| 15 min+ | **Tertiary / re-dispatch** — replace used reserves | Unit commitment, imports |
| If frequency keeps falling | **Under-frequency load shedding (UFLS)** — blocks of load disconnected in stages | Relays at substations |

Primary control uses **droop**: each unit raises output in proportion to the frequency deviation, so all units share the response.`,
        },
        { kind: "equation", formula: "m01-droop" },
        { kind: "widget", widget: "droop", props: { droop: 4 }, caption: "4% droop: a 0.2 Hz fall asks for +10% of rated power. Note that a PV plant at full output has no upward headroom unless it is deliberately curtailed." },
        {
          kind: "md",
          md: md`### System strength: when the grid gets 'weak'

Lesson 4 showed that inverters contribute only ~1.0–1.5 pu fault current, versus 4–7 pu from synchronous machines. Grid-following inverters also rely on a phase-locked loop (PLL) that tracks the grid voltage angle; on a **weak grid** (low fault level), the inverter's own current changes the voltage it is trying to track, and control loops can interact and oscillate. The standard screening metric is the short-circuit ratio:`,
        },
        { kind: "equation", formula: "m01-scr" },
        {
          kind: "md",
          md: md`Remote desert sites at the end of long lines (typical for large PV) tend to have modest fault levels, and as more IBR connect at the same substation the **effective** SCR (shared fault level ÷ total IBR MW) falls further. Mitigations:

- **Grid-forming (GFM) inverters** — behave as voltage sources, provide synthetic inertia and stabilise weak grids (increasingly required for BESS).
- **Synchronous condensers** — spinning machines without a prime mover: add real inertia and fault level (often converted from retired generators).
- **STATCOMs / SVCs** — dynamic reactive support (voltage), but no inertia and limited fault current.
- **Electromagnetic-transient (EMT) studies** (PSCAD) with vendor-specific inverter models, not just RMS studies, when SCR is below ~3.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Kuwait's grid: what is sourced",
          md: md`- MEWRE procures transmission directly: the **Shagaya–Al-Wafra 400 kV** overhead line was awarded in March 2026 (KD 48.6 m), and the Shagaya Zone 1 IPP scope includes a **400 kV substation**.
- Kuwait imports power through the **GCC Interconnection Authority (GCCIA)**: 500 MW (Oman 350 MW, Qatar 200 MW) for summer 2024; Audit Bureau conditional approval of about KWD 161–169 m for 2025 purchases.
- Peak ≈ 17.6 GW against ~17 GW reliable capacity: the system often operates with thin reserves in summer — large trips (e.g. a 300 MW steam turbine at Az-Zour South in June 2024) have led to rolling cuts.`,
        },
        { kind: "sources", refs: ["m01-megaproject-400kv", "m01-agbi-zone1-rfp", "m01-pvmag-shagaya-2021", "m01-mees-gccia-2024", "m01-powerline-gccia-2025", "m01-mees-crisis-2024", "m01-kt-peak-2026"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Not confirmed by the research brief — verify with MEWRE Transmission / GCCIA",
          md: md`- Which intermediate EHV level (if any) Kuwait's transmission network uses between 400 kV and 132 kV (sources vary — confirm the voltage, e.g. 275 kV or 300 kV, from the MEWRE grid code), and that it distributes at **33 kV, 11 kV and 415/240 V** — widely described, but not in the brief.
- Nominal frequency **50 Hz** and the statutory/normal operating band (e.g. 49.8–50.2 Hz) and UFLS settings — confirm in the MEWRE grid code.
- GCCIA technical details: that Kuwait connects at **400 kV** (reported at the Az-Zour substation), the transfer capacity of the Kuwait link, and that the 60 Hz Saudi system joins the 50 Hz GCC grid through an HVDC back-to-back converter (reported at Al-Fadhili).
- Whether the Al-Wafra 400 kV substation and its Saudi link, expected by December 2024, have been commissioned (flagged unverified in the brief).
- Kuwait's system inertia, largest credible infeed loss and fault levels at Shagaya — these come only from MEWRE grid studies.`,
        },
        { kind: "sources", refs: ["m01-gccia", "m01-mew-site", "m01-nrel-inertia", "m01-ieee-2800", "m01-aemo-system-strength", "m01-entsoe"] },
      ],
    },
    // ================================================================ APPLIED
    {
      layer: "applied",
      title: "Inertia, ROCOF and short-circuit ratio",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "ROCOF when a 1.1 GW PV plant trips — before and after PV displaces synchronous units",
          given: md`Illustrative summer midday: 14,000 MVA of synchronous generation online with average H = 5 s. Contingency: a 1,100 MW PV plant trips (e.g. fails to ride through a 400 kV fault) — at this size it is a candidate for the largest single infeed. Then consider the same system with 3 GW more PV online displacing 3,000 MVA of synchronous units. Nominal frequency 50 Hz.`,
          steps: [
            { md: md`**Kinetic energy, base case.** $\sum HS = 14{,}000 \times 5 = 70{,}000$ MWs.` },
            { md: md`**Initial ROCOF.** $\dfrac{df}{dt} = -\dfrac{1{,}100\times50}{2\times70{,}000} = -0.393$ Hz/s.` },
            { md: md`**Time to 49.0 Hz if nothing responded:** $1.0/0.393 \approx 2.5$ s. Governors typically need several seconds to deliver — the inertia buys that time.` },
            { md: md`**High-PV case.** Online synchronous capacity falls to 11,000 MVA: $\sum HS = 55{,}000$ MWs; ROCOF $= -1{,}100\times50/110{,}000 = -0.50$ Hz/s; time to 49.0 Hz ≈ 2.0 s.` },
          ],
          result: md`ROCOF rises from **0.39 to 0.50 Hz/s** (+27%) and the time before UFLS thresholds are reached shrinks. Two lessons for a PM: (1) a large PV plant's **fault ride-through** performance is a system-security issue, not a detail; (2) fast frequency response from BESS and ROCOF withstand requirements become essential as PV grows.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Short-circuit ratio at a remote PV substation",
          given: md`A 400 kV substation at a remote desert site has an illustrative three-phase fault level of 4,000 MVA (excluding the PV plant's own contribution). A 1,100 MW PV plant connects there; later a second 1,100 MW plant is proposed at the same substation.`,
          steps: [
            { md: md`SCR for the first plant: $\text{SCR} = S_\text{sc}/P_\text{IBR}$.` },
            {
              md: md`$\text{SCR} = 4{,}000/1{,}100 = 3.6$ → moderately strong.`,
              hidden: true,
              check: { prompt: "SCR with one plant", answer: 3.64, tolerance: { rel: 0.02 } },
            },
            {
              md: md`With both plants sharing the same fault level: $\text{SCR}_\text{eff} = 4{,}000/2{,}200 = 1.8$ → very weak.`,
              hidden: true,
              check: { prompt: "Effective SCR with two plants", answer: 1.82, tolerance: { rel: 0.02 } },
            },
            { md: md`Interpretation: the second plant needs EMT studies and probably mitigation — grid-forming inverters/BESS, synchronous condensers, or network reinforcement (e.g. additional 400 kV circuits) that raises fault level.` },
          ],
          result: md`SCR falls from **≈ 3.6 to ≈ 1.8** as IBR doubles at the same node. Connection capacity at a node is limited by system strength, not just by line thermal ratings.`,
        },
        {
          kind: "question",
          question: {
            id: "m01-l06-p1",
            type: "numeric",
            prompt: md`A 300 MW gas turbine operates with 4% droop and has enough headroom. System frequency falls by 0.2 Hz from 50 Hz (ignore deadband). By how many MW does its governor raise output?`,
            answer: 30,
            tolerance: { rel: 0.01 },
            unit: "MW",
            explanation: md`$\Delta P = \frac{1}{R}\frac{\Delta f}{f_0}P_\text{rated} = \frac{1}{0.04}\times\frac{0.2}{50}\times300 = 25 \times 0.004 \times 300 = 30$ MW (10% of rating). In Kuwait's summer a GT may already be near its (temperature-reduced) maximum, so the real response can be much smaller — headroom matters as much as droop.`,
            concepts: ["m01.frequency-response"],
            difficulty: 2,
          },
        },
      ],
    },
    // ================================================================ FIELD
    {
      layer: "field",
      title: "Grid structure and system strength on real projects",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what at the grid interface

- **MEWRE Transmission / National Control Centre** — owns and operates the 400 kV network; issues connection requirements, declared fault levels and frequency/voltage settings; dispatches the plant; witnesses compliance tests.
- **Employer / Offtaker (MEWRE as PPA counterparty)** — ensures the PPA's grid-code schedule, the interface dates (e.g. the 400 kV line readiness) and the testing regime are coherent. A late MEWRE grid connection can strand an IPP and trigger deemed-energy compensation (module 9).
- **IPP / EPC** — performs the **grid studies**: load flow, short circuit, reactive capability, dynamic (RMS) stability, EMT where weak, harmonics, protection coordination; supplies validated plant models.
- **Owner's Engineer / Lenders' technical adviser** — reviews studies and models.
- **GCCIA** — operates the interconnector and coordinates reserve sharing among member states.

### Studies and models you will hear about

| Study | Question it answers | Typical tool |
|---|---|---|
| Load flow | Do voltages and line loadings stay within limits, N-1? | PSS/E, PowerFactory |
| Short circuit | What fault levels, are breakers adequate? | PowerFactory, ETAP (IEC 60909) |
| Dynamic stability (RMS) | Does the plant ride through faults and help frequency/voltage recover? | PSS/E, PowerFactory |
| EMT | Do inverter controls stay stable on a weak grid; any control interaction? | PSCAD, PowerFactory EMT |
| Frequency response | Does the plant meet droop, FFR and ROCOF requirements? | PowerFactory, plant tests |`,
        },
        { kind: "widget", widget: "substation-sld", caption: "Walk the 400/132/33 kV substation: breakers, disconnectors, CTs/VTs and protection. The interface point (ownership boundary) and metering point must be defined on this drawing." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Generic models and the weak-grid surprise",
          md: md`Grid studies done at bid stage with **generic** inverter models can look fine; the selected OEM's actual control firmware, modelled in EMT, may oscillate at SCR < 2–3 or when several plants share a node. If the PPA does not require **validated, vendor-specific models** and re-studies after inverter selection, the problem appears during energisation — when it is most expensive to fix. Also watch for firmware updates after commissioning that change plant dynamics without re-validation.`,
        },
        {
          kind: "checklist",
          title: "PM checklist — grid interface and system strength",
          items: [
            "Connection voltage, POC/ownership boundary and metering point defined on the SLD and in the PPA.",
            "Declared maximum and minimum fault levels at the POC, now and in future years, received in writing from MEWRE Transmission.",
            "SCR calculated, including other existing and planned IBR at the same node (effective SCR).",
            "Fault ride-through, reactive current injection, ROCOF withstand, droop/FFR requirements stated and tested.",
            "Vendor-specific RMS and EMT models delivered, validated against tests, and kept under change control (firmware).",
            "Interface dates for MEWRE grid works (400 kV line, substation bays) tracked against the IPP's COD with clear consequences for delay.",
            "If the plant is (or could be) the largest infeed, its trip consequences assessed with the control centre.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the IPP / grid-study consultant",
          items: [
            "What fault level and SCR did you assume at the 400 kV POC, and do they include other planned plants at Shagaya?",
            "Are your dynamic studies using the selected inverter OEM's validated models? Have you run EMT studies?",
            "What ROCOF can the plant withstand without tripping, and what frequency range for how long?",
            "Can the plant provide fast frequency response or droop response, and how much headroom will you hold?",
            "Are the inverters grid-following or grid-forming? If grid-following, what is the minimum SCR the OEM guarantees stable operation at?",
            "How will firmware changes after COD be controlled and re-validated?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a senior official why a grid with lots of solar can be 'more fragile' even though solar is reliable at midday, and what can be done about it.",
          keyPoints: [
            "Conventional generators' spinning mass (inertia) automatically slows frequency changes after a sudden loss.",
            "Solar inverters have no spinning mass, so when they displace conventional plants, frequency changes faster after a trip.",
            "Inverters also add little fault current, making the grid 'weaker' and voltage control harder near large solar plants.",
            "Mitigations: batteries with fast frequency response, grid-forming inverters, synchronous condensers, stronger network and strict grid-code compliance.",
            "Large solar plants must ride through faults; if a 1 GW plant trips it is a major system event.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m01-l06-q1",
      type: "order",
      prompt: md`Order the frequency-control mechanisms by when they act after a sudden loss of generation (earliest first).`,
      items: [
        "Inertial response of synchronous machines",
        "Primary control (governor droop)",
        "Secondary control (AGC)",
        "Tertiary control / re-dispatch of reserves",
      ],
      explanation: md`Inertia acts instantly (physics); governors respond within seconds and arrest the fall; AGC restores 50 Hz over tens of seconds to minutes; tertiary re-dispatch replaces used reserves over 15 minutes and more. UFLS is the emergency backstop if frequency keeps falling.`,
      concepts: ["m01.frequency-response"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m01-l06-q2",
      type: "numeric",
      prompt: md`A system has 60,000 MWs of synchronous kinetic energy online. A 600 MW unit trips. What is the initial ROCOF magnitude (Hz/s) on a 50 Hz system?`,
      answer: 0.25,
      tolerance: { rel: 0.02 },
      unit: "Hz/s",
      explanation: md`$|df/dt| = \Delta P f_0/(2\sum HS) = 600\times50/(2\times60{,}000) = 0.25$ Hz/s.`,
      concepts: ["m01.inertia-rocof"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "m01-l06-q3",
      type: "numeric",
      prompt: md`A 300 MVA turbo-generator has H = 6 s. How much kinetic energy does it store at synchronous speed (MWs)?`,
      answer: 1800,
      tolerance: { rel: 0.01 },
      unit: "MWs",
      explanation: md`$E_k = H \times S = 6 \times 300 = 1{,}800$ MWs (1.8 GJ) — enough to supply 300 MW for 6 s if it could be extracted completely (it cannot without stalling).`,
      concepts: ["m01.inertia-rocof"],
      difficulty: 1,
    },
    {
      id: "m01-l06-q4",
      type: "mcq",
      prompt: md`At what speed does a 4-pole synchronous generator run on a 50 Hz grid?`,
      options: ["3,000 rpm", "1,500 rpm", "1,800 rpm", "750 rpm"],
      answer: 1,
      explanation: md`$n_s = 120f/p = 120\times50/4 = 1{,}500$ rpm. 1,800 rpm would be 4-pole at 60 Hz (as in Saudi Arabia).`,
      concepts: ["m01.frequency-balance"],
      difficulty: 1,
    },
    {
      id: "m01-l06-q5",
      type: "multi",
      prompt: md`Which measures increase system strength (fault level) and/or inertia at a weak node with many PV plants? Select all that apply.`,
      options: [
        "Synchronous condensers",
        "Grid-forming inverters on BESS",
        "Additional 400 kV circuits strengthening the network",
        "Increasing the DC/AC ratio of the PV plants",
        "Replacing generic inverter models with vendor-specific models in studies",
      ],
      answer: [0, 1, 2],
      explanation: md`Synchronous condensers add real inertia and fault current; grid-forming inverters provide voltage-source behaviour and synthetic inertia (with limited fault current); network reinforcement lowers source impedance. DC/AC ratio does not affect system strength. Better models improve the accuracy of studies but do not change the grid itself.`,
      concepts: ["m01.system-strength"],
      difficulty: 2,
    },
    {
      id: "m01-l06-q6",
      type: "decision",
      prompt: md`You are the PM. Six months before energisation of a 1.1 GW PV plant, the IPP reports that EMT studies with the actual inverter firmware show oscillations when SCR falls below 2.2 — which can happen at the 400 kV POC during a line outage. What do you do?`,
      options: [
        { text: "Accept and energise — it only happens during a line outage.", score: 0, feedback: "Line outages are exactly the N-1 conditions the grid is designed for. Oscillations could trip the plant or damage equipment and disturb the network." },
        { text: "Convene the IPP, OEM, OE and MEWRE Transmission; require mitigation options (control retuning, grid-forming mode, STATCOM/synchronous condenser, or an operating restriction during outages) with re-studies, and agree interim operating limits and their commercial treatment under the PPA.", score: 1, feedback: "Correct: technical fix plus clear operating rules and commercial treatment, agreed with the grid operator before energisation." },
        { text: "Tell the IPP it is their problem and wait for the compliance test.", score: 0.3, feedback: "It is their obligation, but the grid operator and the Ministry carry the system risk; passive waiting risks a failed energisation and delay." },
        { text: "Ask MEWRE to build a new 400 kV line to raise the fault level.", score: 0.3, feedback: "Possibly a long-term answer, but it takes years and shifts cost to the State; first exhaust plant-side mitigations." },
      ],
      explanation: md`Weak-grid control interaction is a known risk with large IBR at remote nodes. The PM's role is to convene the right parties early, insist on validated studies, and translate technical restrictions into clear operating and commercial rules.`,
      concepts: ["m01.system-strength"],
      difficulty: 3,
    },
    {
      id: "m01-l06-q7",
      type: "short",
      prompt: md`Using the swing equation, explain why system frequency falls when a large generator trips, and what determines how fast it falls.`,
      rubric: [
        "Before the trip, mechanical input equals electrical output (plus losses); frequency steady.",
        "After the trip, remaining machines must supply the lost power; electrical output exceeds mechanical input.",
        "The deficit is drawn from rotating kinetic energy, so rotors decelerate and frequency falls.",
        "Rate of fall (ROCOF) ∝ size of the loss / total inertia (ΣHS); more inertia = slower fall.",
      ],
      modelAnswer: md`The swing equation says $(2H/f_0)\,df/dt = P_m - P_e$. Before the trip, $P_m = P_e$ and frequency is steady. When a generator trips, the load does not change instantly, so the remaining machines' electrical output jumps above their mechanical input. The difference comes from their stored rotating energy, so they slow down — frequency falls. The initial rate is $\Delta P f_0/(2\sum HS)$: a bigger loss or less online inertia means a faster fall, until governors raise mechanical power and arrest it.`,
      explanation: md`This is the single most important dynamic relationship for understanding why IBR integration needs grid-code attention.`,
      concepts: ["m01.frequency-balance", "m01.inertia-rocof"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m01-l06-f1", front: "Synchronous speed", back: md`$n_s = 120f/p$ — 3,000 rpm for 2 poles at 50 Hz`, concepts: ["m01.frequency-balance"] },
    { id: "m01-l06-f2", front: "Inertia constant H", back: md`$H = E_k/S$ (seconds); steam/gas units ≈ 4–9 s; inverters ≈ 0`, concepts: ["m01.inertia-rocof"] },
    { id: "m01-l06-f3", front: "Initial ROCOF", back: md`$\text{ROCOF} = \Delta P f_0/(2\sum HS)$`, concepts: ["m01.inertia-rocof"] },
    { id: "m01-l06-f4", front: "Swing equation (frequency form)", back: md`$(2H/f_0)\,df/dt = P_m - P_e$ (pu)`, concepts: ["m01.frequency-balance"] },
    { id: "m01-l06-f5", front: "Droop response", back: md`$\Delta P = -(1/R)(\Delta f/f_0)P_\text{rated}$; 4% droop → 10% per 0.2 Hz`, concepts: ["m01.frequency-response"] },
    { id: "m01-l06-f6", front: "Short-circuit ratio thresholds", back: "SCR ≥ 3 strong; 2–3 weak; < 2 very weak", concepts: ["m01.system-strength"] },
    { id: "m01-l06-f7", front: "N-1 criterion", back: "The system stays within limits after loss of any single element", concepts: ["m01.system-structure"] },
    { id: "m01-l06-f8", front: "Why transmit at 400 kV rather than 132 kV?", back: "≈ 1/3 the current and ≈ 1/9 the I²R loss for the same power and conductor", concepts: ["m01.system-structure"] },
    { id: "m01-l06-f9", front: "Shagaya's grid connection (sourced)", back: "Shagaya–Al-Wafra 400 kV OHTL, awarded March 2026 (KD 48.6 m); Zone 1 IPP builds a 400 kV substation", concepts: ["m01.system-structure"] },
    { id: "m01-l06-f10", front: "Mitigations for low system strength", back: "Grid-forming inverters, synchronous condensers, STATCOMs, network reinforcement, EMT-validated tuning", concepts: ["m01.system-strength"] },
  ],
};

export default lesson;
