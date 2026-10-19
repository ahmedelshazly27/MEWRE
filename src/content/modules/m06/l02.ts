import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m06-l02",
  title: "Grid Codes: What They Require from PV and BESS Plants",
  summary:
    "The technical contract between a plant and the grid: voltage and frequency ranges, fault ride-through, reactive capability at the POI, power quality and harmonics, ramp limits and active-power control, models and compliance testing — with Kuwait's grid-code status, regional and international comparators, and a full reactive-capability check.",
  minutes: 75,
  objectives: [
    "You can list what a modern grid code specifies for inverter-based plants and explain why each requirement exists",
    "You can translate a POI reactive requirement (e.g. 0.95 PF at Pmax) into inverter MVA including transformer losses and 50 °C derating",
    "You can compute voltage THD and compare it with IEEE 519 / allocated limits",
    "You can describe FRT (LVRT/HVRT) profiles and fast fault-current injection",
    "You can plan grid-code compliance (models, type certificates, on-site tests) and state what is known and unknown about Kuwait's code",
  ],
  concepts: [
    {
      id: "m06.grid-code",
      name: "Grid code scope",
      description: "Connection requirements: operating ranges, FRT, reactive capability, power quality, active power control, protection, models, data, compliance testing.",
      competency: "grid",
      related: ["m06.frt", "m06.reactive-capability"],
    },
    {
      id: "m06.operating-ranges",
      name: "Voltage and frequency operating ranges",
      description: "Bands and durations within which the plant must stay connected and deliver output (e.g. 49–51 Hz continuous; 0.90–1.05 pu at EHV), plus RoCoF withstand.",
      competency: "grid",
      related: ["m06.grid-code"],
    },
    {
      id: "m06.frt",
      name: "Fault ride-through (LVRT/HVRT)",
      description: "Requirement to stay connected through voltage dips and swells defined by time–voltage profiles, injecting reactive current during the dip and recovering active power after.",
      competency: "grid",
      related: ["m06.grid-code"],
    },
    {
      id: "m06.reactive-capability",
      name: "Reactive capability at the POI",
      description: "Required Q range (e.g. ±0.33 Pmax, i.e. 0.95 lead/lag at Pmax) across a voltage band; inverters must also cover transformer and cable reactive losses.",
      competency: "grid",
      related: ["m06.grid-code"],
    },
    {
      id: "m06.power-quality",
      name: "Power quality: harmonics, flicker, unbalance",
      description: "Emission limits at the POI (IEEE 519, IEC TR 61000-3-6 allocation), measured before and after connection; filters if exceeded.",
      competency: "grid",
      related: ["m06.grid-code"],
    },
    {
      id: "m06.active-power-control",
      name: "Active power control and ramp limits",
      description: "Set-point following, ramp-rate limits (e.g. 10 %/min), curtailment, LFSM-O/U and frequency-sensitive mode.",
      competency: "grid",
      related: ["m06.grid-code"],
    },
    {
      id: "m06.compliance",
      name: "Grid-code compliance process",
      description: "Studies and validated models, unit certificates, compliance plan, on-site tests witnessed by the TSO, and ongoing performance monitoring.",
      competency: "grid",
      related: ["m06.grid-code"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What a grid code specifies — and why",
      blocks: [
        {
          kind: "md",
          md: md`A grid code is the **technical contract between every connected plant and the system operator**. It exists because the system's security depends on all plants behaving predictably during normal operation and, above all, during disturbances. When a synchronous generator-dominated grid acquires gigawatts of inverter-based resources (IBR), the code is how the operator keeps stability: it requires inverters to do deliberately what spinning machines do by physics.

The usual chapters, with the reasoning behind them:

| Requirement | Typical content | Why it exists |
|---|---|---|
| **Frequency range** | e.g. 49.0–51.0 Hz continuous; 47.5–49.0 and 51.0–51.5 Hz for ≥ 30 min (RfG Continental Europe); RoCoF withstand (e.g. 2 Hz/s over 500 ms) | Plants tripping during a frequency excursion turn a disturbance into a blackout |
| **Voltage range** | e.g. 0.90–1.05 pu continuous at 400 kV, 1.05–1.10 pu for limited time | Same logic for voltage |
| **Fault ride-through** | LVRT: stay connected down to 0 pu retained voltage for ~150–250 ms, recovering along a profile; HVRT: up to 1.2–1.3 pu | A transmission fault depresses voltage over a wide area for ~100 ms; mass PV tripping (as seen in NERC's Blue Cut and Odessa events) can lose GW |
| **Fast fault current** | Reactive current injection during the dip, e.g. $\Delta I_q = k\,\Delta U$ with k = 2, within ~30–60 ms | Supports voltage and lets protection detect faults |
| **Reactive capability** | Q = ±0.33 Pmax at POI (0.95 lead/lag at Pmax) across 0.90–1.10 pu; reduced-power capability | Voltage control needs Mvar near where they are consumed |
| **Voltage/Q control modes** | Voltage control with slope (droop), Q set-point, PF set-point | Coordinated voltage management by the TSO |
| **Active power control** | Set-point following, ramp limits (e.g. ≤ 10 % Pmax/min), curtailment within ~1 min | Balancing and congestion |
| **Frequency response** | LFSM-O (reduce P above ~50.2 Hz, droop 2–12 %), LFSM-U (storage/headroom), FSM | Frequency stability (lesson 3) |
| **Power quality** | Harmonics, interharmonics, flicker, unbalance, DC injection | Protect other customers and equipment |
| **Protection** | Required/forbidden protections, settings coordination (e.g. anti-islanding must not trip on grid events) | Selectivity and ride-through |
| **Models & data** | Validated RMS (PSS/E, PowerFactory) and EMT (PSCAD) models | The TSO must simulate the plant |
| **Compliance & monitoring** | Certificates, on-site tests, fault recorders, PMUs, ongoing monitoring | Trust but verify |`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why reactive power is a POI requirement",
          md: md`Voltage on a transmission network is controlled by reactive power, because X ≫ R (lesson 3). The TSO needs Mvar *at the connection point*. Between the inverters and the POI sit MV and HV transformers and cables that absorb (or, for cables, generate) reactive power. A requirement at the POI therefore translates into a larger requirement at the inverter terminals — and inverter MVA is the most expensive way to provide it if it is not planned.`,
        },
        { kind: "equation", formula: "m06-reactive-at-pf" },
        { kind: "equation", formula: "m06-transformer-q-loss" },
        { kind: "widget", widget: "power-triangle", props: { p: 1100, pf: 0.95 }, caption: "1,100 MW at 0.95 PF: Q ≈ 361.5 Mvar, S ≈ 1,158 MVA at the POI." },
        {
          kind: "md",
          md: md`### Power quality

Inverters switch at kHz frequencies and produce low- and high-order harmonics; large plants also cause resonance with cable capacitance. Voltage distortion is aggregated as THD:`,
        },
        { kind: "equation", formula: "m06-thd" },
        {
          kind: "md",
          md: md`IEEE 519-2022 voltage-distortion limits at the point of common coupling:

| Bus voltage | Individual harmonic | THD |
|---|---|---|
| ≤ 1 kV | 5.0 % | 8.0 % |
| 1–69 kV | 3.0 % | 5.0 % |
| 69–161 kV | 1.5 % | 2.5 % |
| > 161 kV (e.g. 400 kV) | 1.0 % | 1.5 % |

Under IEC TR 61000-3-6, the TSO sets planning levels and allocates each customer a share, so a plant may get a limit well below these. The background distortion already present matters: pre-connection measurements are part of the study.

### Ramps and active-power control`,
        },
        { kind: "equation", formula: "m06-ramp-rate" },
        {
          kind: "md",
          md: md`Upward ramps (morning, after clouds) are easy: the power plant controller (PPC) simply holds inverters back. Downward ramps caused by clouds or a dust front cannot be controlled by PV alone — they need storage (module 5, lesson 3). Codes increasingly require PV+BESS hybrids to meet ramp limits in both directions.

### FRT in more detail

An LVRT profile is a curve of retained voltage vs time: above the line the plant must stay connected. A typical type-D power-park profile: 0 pu for 150 ms, then a ramp to ~0.85 pu by 1.5–3 s. During the dip, grid-following inverters inject reactive current proportional to the voltage drop (k-factor), then restore active power within ~0.5–1 s after clearance. **Momentary cessation** (stopping current output during the dip), once common in US inverters, is now prohibited by IEEE 2800 for transmission-connected IBR because it contributed to large-scale events.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait's grid code — status unknown",
          md: md`No published Kuwaiti grid code for renewable or inverter-based plants was found in our research. Connection requirements for KAPP IPPs are likely embedded in RFP technical schedules, the PPA and connection agreements drafted with MEWRE's Transmission sector, possibly referencing international practice. **Treat this as unverified**: obtain MEWRE's current connection requirements before relying on any value. In this lesson the numbers come from comparators — ENTSO-E RfG (EU 2016/631), IEEE 2800-2022, the Saudi Arabian Grid Code and Abu Dhabi's code, and GCCIA's interconnection code.`,
        },
        { kind: "sources", refs: ["m06-eu-rfg-2016-631", "m06-entsoe-rfg", "m06-ieee-2800", "m06-ieee-519", "m06-iec-61000-3-6", "m06-irena-grid-codes-2022", "m06-saudi-grid-code", "m06-abudhabi-grid-code", "m06-gccia", "m06-nerc-ibr"] },
      ],
    },
    {
      layer: "applied",
      title: "Checking reactive capability and harmonics",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "0.95 PF at the POI for a 1,100 MW plant: what must the inverters do?",
          given: md`Plant: 1,100 MW at the 400 kV POI. Requirement (comparator code): reactive capability of 0.95 PF lagging and leading **at the POI at Pmax**. Four 400/33 kV transformers, 300 MVA each, $x$ = 14 %. MV (inverter step-up) transformers total 1,250 MVA, $x$ = 8 %. 33 kV collector cables generate ~20 Mvar. Active losses to the POI ≈ 1.5 % (inverter-terminal P ≈ 1,116.5 MW). Approximate transformer loading by the POI apparent power.`,
          steps: [
            { md: md`**POI requirement**: $Q = 1{,}100 \tan(\arccos 0.95) = 1{,}100 \times 0.3287 = 361.5$ Mvar each direction; $S_{POI} = 1{,}100/0.95 = 1{,}157.9$ MVA.` },
            { md: md`**HV transformer reactive loss**: each carries $1{,}157.9/4 = 289.5$ MVA; $Q = 0.14 \times 289.5^2/300 = 39.1$ Mvar; four: **156.4 Mvar**.` },
            { md: md`**MV transformer reactive loss**: $0.08 \times 1{,}157.9^2/1{,}250 = 85.8$ Mvar.` },
            { md: md`**Lagging case (exporting Q)**: inverters must produce $361.5 + 156.4 + 85.8 - 20 = 583.8$ Mvar.` },
            { md: md`**Inverter apparent power**: $\sqrt{1{,}116.5^2 + 583.8^2} = 1{,}259.9$ MVA — 14.5 % above the plant's MW rating.` },
            { md: md`**Leading case (absorbing Q)**: $-361.5 + 156.4 + 85.8 - 20 = -139.3$ Mvar — easy, because the transformers already absorb vars.` },
          ],
          result: md`To meet 0.95 lagging at the POI the inverters must deliver ~584 Mvar while at full power, i.e. ~1,260 MVA of inverter capacity — **at 50 °C**. Options: oversize inverters (most common), add a STATCOM/SVC or switched capacitor banks at the 33 kV or 400 kV bus, or negotiate a reduced-power capability curve. This calculation should be in the developer's grid study and checked by MEWRE's OE.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Does the plant meet the harmonic limit at 400 kV?",
          given: md`Pre-commissioning harmonic study at the 400 kV POI (plant + background): $V_5$ = 1.2 %, $V_7$ = 0.9 %, $V_{11}$ = 0.5 %, $V_{13}$ = 0.4 % of fundamental; other orders negligible. Limit: IEEE 519 for > 161 kV.`,
          steps: [
            { md: md`Square and sum: $1.2^2 + 0.9^2 + 0.5^2 + 0.4^2 = 1.44 + 0.81 + 0.25 + 0.16 = 2.66$.` },
            {
              md: md`$THD = \sqrt{2.66} = 1.63$ %.`,
              hidden: true,
              check: { prompt: "Voltage THD at the POI", answer: 1.63, unit: "%", tolerance: { abs: 0.02 } },
            },
            { md: md`Compare: THD limit 1.5 % → **exceeded**; individual limit 1.0 % → $V_5$ = 1.2 % **exceeded**.` },
          ],
          result: md`Non-compliant on THD and the 5th harmonic. Next steps: separate background from plant emission (measurements with plant off/on), check for resonance between cable capacitance and grid inductance, tune inverter control/switching, or add a harmonic filter (often combined with reactive compensation). This must be resolved before compliance testing — a filter has a long lead time.`,
        },
        {
          kind: "question",
          question: {
            id: "m06-l02-p1",
            type: "numeric",
            prompt: md`In the worked example the inverters were procured as 1,250 MVA at 35 °C but derate by 8 % at 50 °C. At an inverter-terminal active power of 1,116.5 MW, how many Mvar can they deliver at 50 °C, and therefore what is the shortfall (Mvar) against the 583.8 Mvar needed? Enter the shortfall.`,
            answer: 308.3,
            unit: "Mvar",
            tolerance: { rel: 0.01 },
            explanation: md`Derated S: $1{,}250 \times 0.92 = 1{,}150$ MVA. Available Q: $\sqrt{1{,}150^2 - 1{,}116.5^2} = 275.5$ Mvar. Shortfall: $583.8 - 275.5 = 308.3$ Mvar — because Q is what's left after P in the MVA circle, a modest derating wipes out most of the reactive margin. Fix: more inverters, a ~300 Mvar STATCOM, or curtail P on the hottest days (costly).`,
            concepts: ["m06.reactive-capability"],
            difficulty: 3,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Compliance in practice",
      blocks: [
        {
          kind: "md",
          md: md`### The compliance journey

1. **Connection application and requirements**: MEWRE Transmission issues connection requirements (voltage, POI, fault levels, code chapters to comply with). For a KAPP IPP these are in the RFP and PPA schedules.
2. **Studies** (lesson 4): load flow, short circuit, stability, EMT, harmonics, protection — by the developer's consultant, reviewed by MEWRE.
3. **Models**: plant-level RMS model (PSS/E generic models such as REGC/REEC/REPC families, or PowerFactory) and EMT model (PSCAD) from the inverter OEM, **validated** against type tests.
4. **Unit certificates**: inverters and PPC certified to a recognised code (e.g. European unit certificates under VDE-AR-N 4120/4130 or equivalents) — evidence of LVRT/HVRT, Q capability, harmonics.
5. **Compliance plan**: test list, procedures, acceptance criteria, witnesses.
6. **On-site tests** (lesson 5): reactive capability, voltage control step response, active power set-point/ramp, frequency response (injected test signals), power quality measurements. FRT is not tested on site (type tests + simulation).
7. **Final compliance certificate / operational notification**, then **ongoing monitoring** (fault recorders, PMUs, periodic re-tests, model updates after any firmware change).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- Reactive capability computed at inverter terminals or at 25 °C, not at the POI at 50 °C.
- Generic models submitted instead of OEM-validated ones; EMT model missing until late → studies redone.
- **Firmware updates** after compliance testing silently change FRT or control behaviour.
- Harmonic background not measured before connection → disputes about who causes distortion.
- Requirements copied from another country's code without adapting to Kuwait's network strength and protection practice.
- PPC tuned in a strong-grid study; oscillates when the plant is connected through a long line to a weaker node.`,
        },
        {
          kind: "checklist",
          title: "PM checks on grid-code compliance",
          items: [
            "Written connection requirements from MEWRE Transmission in the contract (not 'international best practice')",
            "Reactive capability demonstrated at the POI, at 50 °C, across the voltage band, with transformer and cable losses",
            "Validated RMS and EMT models delivered early, with version control linked to firmware",
            "Unit certificates (LVRT/HVRT, Q, harmonics) for the exact inverter model and firmware",
            "Pre-connection harmonic background measurement and allocated emission limits",
            "Compliance test plan agreed with MEWRE before energisation; witnesses identified",
            "Change control: no firmware/setting change after compliance without re-assessment",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "Show me the P-Q capability at the POI at 50 °C and at 0.90, 1.00 and 1.10 pu voltage.",
            "Which inverter firmware version are your certificates and models based on?",
            "What reactive current injection (k-factor) and response time does the inverter provide during a dip?",
            "What is your harmonic emission at the POI with background included, and is a filter in your scope and schedule?",
            "How will the PPC handle ramp limits during a dust front if no BESS is installed?",
          ],
        },
        { kind: "scenario", scenario: "m06-s2" },
        {
          kind: "feynman",
          prompt: "Explain to a newly appointed MEWRE manager why a solar plant must be able to 'ride through' a fault on a line 100 km away instead of disconnecting to protect itself.",
          keyPoints: [
            "Transmission faults depress voltage over a wide area for ~100–150 ms until protection clears them",
            "If many plants disconnect, the grid loses large generation at once",
            "That can cause frequency collapse and blackout — far worse than the fault",
            "Grid codes require staying connected and injecting reactive current to support voltage",
            "Real events (NERC Odessa, GB 9 Aug 2019) show what happens when plants trip",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m06-l02-q1",
      type: "numeric",
      prompt: md`A 500 MW BESS must provide 0.95 PF lead/lag at the POI at full active power. What reactive power (Mvar) is required in each direction at the POI?`,
      answer: 164.3,
      unit: "Mvar",
      tolerance: { rel: 0.01 },
      explanation: md`$Q = 500 \tan(\arccos 0.95) = 500 \times 0.3287 = 164.3$ Mvar. The PCS must additionally cover transformer reactive losses when exporting Q.`,
      concepts: ["m06.reactive-capability"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m06-l02-q2",
      type: "mcq",
      prompt: md`What is the main purpose of a low-voltage ride-through (LVRT) requirement?`,
      options: [
        "To protect inverters from overvoltage",
        "To prevent simultaneous tripping of many plants during a transmission fault, which could cause a frequency collapse",
        "To allow the plant to island and supply local load",
        "To reduce harmonic distortion",
      ],
      answer: 1,
      explanation: md`A single transmission fault depresses voltage over a large area. If inverter plants disconnect en masse, the grid loses GW of generation in milliseconds — the disturbance becomes a blackout. LVRT keeps them connected and supporting voltage.`,
      concepts: ["m06.frt"],
      difficulty: 1,
    },
    {
      id: "m06-l02-q3",
      type: "numeric",
      prompt: md`Harmonic voltages at a 132 kV POI: V5 = 1.4 %, V7 = 1.0 %, V11 = 0.6 %. What is the THD (%)? (IEEE 519 limit at 69–161 kV is 2.5 %.)`,
      answer: 1.82,
      unit: "%",
      tolerance: { abs: 0.02 },
      explanation: md`$\sqrt{1.96 + 1.00 + 0.36} = \sqrt{3.32} = 1.82$ % — within the 2.5 % THD limit, and each individual harmonic is within 1.5 %. But the TSO's allocated limit for this plant may be lower than the IEEE 519 total.`,
      concepts: ["m06.power-quality"],
      difficulty: 2,
    },
    {
      id: "m06-l02-q4",
      type: "multi",
      prompt: md`Which of these are typically specified in a grid code for an inverter-based plant? (Select all.)`,
      options: [
        "Reactive capability range at the POI",
        "Fault ride-through profiles",
        "Validated simulation models",
        "The EPC contractor's payment schedule",
        "Ramp-rate limits",
        "Harmonic emission limits",
      ],
      answer: [0, 1, 2, 4, 5],
      explanation: md`Grid codes are technical: capability, behaviour during disturbances, control, power quality, models and testing. Commercial terms belong in the EPC contract/PPA.`,
      concepts: ["m06.grid-code"],
      difficulty: 1,
    },
    {
      id: "m06-l02-q5",
      type: "mcq",
      prompt: md`Why is meeting 0.95 PF lagging at the POI harder than meeting 0.95 PF leading for a PV plant?`,
      options: [
        "Inverters cannot produce lagging vars",
        "Transformers absorb reactive power, so for lagging export the inverters must supply the POI requirement plus transformer losses; for leading, the losses help",
        "Cables absorb vars",
        "Grid codes require more lagging vars",
      ],
      answer: 1,
      explanation: md`Transformer leakage reactance consumes vars ($x S^2/S_r$). When exporting lagging vars, inverters must supply them in addition; when absorbing, the transformers' consumption is in the same direction as the requirement.`,
      concepts: ["m06.reactive-capability"],
      difficulty: 2,
    },
    {
      id: "m06-l02-q6",
      type: "decision",
      prompt: md`Three months before COD, the inverter OEM releases a firmware update "improving MPPT efficiency". The plant has already passed FRT type tests and its PSS/E/PSCAD models were accepted. The EPC wants to install it fleet-wide next week. What is your position?`,
      options: [
        { text: "Approve — efficiency improvements benefit everyone.", score: 0, feedback: "Firmware changes can alter control loops, FRT behaviour and harmonics; the accepted models and certificates may no longer represent the plant." },
        { text: "Require the OEM to declare which functions changed, confirm certificates and models remain valid (or re-validate), get MEWRE Transmission's acceptance, then deploy under change control.", score: 1, feedback: "Correct — firmware is part of the grid-code compliance basis." },
        { text: "Prohibit any firmware change for the life of the plant.", score: 0.3, feedback: "Too rigid: security patches and fixes are needed. Control them rather than ban them." },
      ],
      explanation: md`Post-compliance firmware changes have caused real grid events. Compliance is tied to a specific hardware/firmware/settings configuration.`,
      concepts: ["m06.compliance"],
      difficulty: 2,
    },
    {
      id: "m06-l02-q7",
      type: "short",
      prompt: md`Kuwait has no published renewable grid code that we could verify. As MEWRE PM preparing a BESS tender, how would you define the grid connection requirements?`,
      rubric: [
        "Obtain MEWRE Transmission's current connection requirements and network data (fault levels, voltage ranges, protection practice)",
        "Use recognised comparators (ENTSO-E RfG, IEEE 2800, Saudi/Abu Dhabi codes, GCCIA) adapted to Kuwait's system",
        "Write explicit, measurable requirements into the technical schedule: ranges, FRT, Q at POI at 50 °C, power quality, ramps, frequency response, models",
        "Define compliance testing and model validation",
        "Coordinate with system studies to set values (e.g. grid-forming where SCR is low)",
      ],
      modelAnswer: md`Start from MEWRE Transmission's own requirements and network data; where gaps exist, adapt a recognised comparator (ENTSO-E RfG type D, IEEE 2800, Saudi/Abu Dhabi codes, GCCIA's code) to Kuwait's frequency, voltage levels, fault levels and protection practice. Write measurable requirements into the technical schedule — operating ranges, LVRT/HVRT profiles and reactive current injection, Q capability at the POI at 50 °C, harmonic limits allocated by the TSO, ramp and frequency response (including grid-forming where studies show low SCR), validated RMS/EMT models — plus a compliance test plan and firmware change control. Get Transmission's sign-off before issuing the RFP.`,
      concepts: ["m06.grid-code", "m06.compliance"],
      difficulty: 3,
      explanation: md`In the absence of a published code, the contract is the code. Vague references to "international best practice" are unenforceable.`,
    },
  ],
  flashcards: [
    { id: "m06-l02-f1", front: "Q at 0.95 PF as a fraction of P", back: md`$\tan(\arccos 0.95) = 0.329$ → Q ≈ ±0.33 P`, concepts: ["m06.reactive-capability"] },
    { id: "m06-l02-f2", front: "IEEE 519 voltage THD limit above 161 kV", back: "1.5 % THD, 1.0 % individual harmonic", concepts: ["m06.power-quality"] },
    { id: "m06-l02-f3", front: "Typical LVRT requirement for large IBR", back: "Stay connected at 0 pu retained voltage for ~150–250 ms, recovering along a profile; inject reactive current", concepts: ["m06.frt"] },
    { id: "m06-l02-f4", front: "RfG continuous frequency range (Continental Europe)", back: "49.0–51.0 Hz unlimited; 47.5–49.0 and 51.0–51.5 Hz for ≥30 min", concepts: ["m06.operating-ranges"] },
    { id: "m06-l02-f5", front: "Why inverters must be oversized for lagging Q at POI", back: "They must also supply transformer reactive losses (xS²/Sr), and Q is what's left after P in the MVA circle", concepts: ["m06.reactive-capability"] },
    { id: "m06-l02-f6", front: "Which ramps can PV alone not control?", back: "Downward ramps from clouds/dust — need storage", concepts: ["m06.active-power-control"] },
    { id: "m06-l02-f7", front: "Status of a Kuwaiti renewable grid code", back: "Not found / unverified — requirements likely in RFP/PPA/connection agreement schedules; confirm with MEWRE Transmission", concepts: ["m06.grid-code"] },
    { id: "m06-l02-f8", front: "Why firmware is under change control after compliance", back: "It can alter FRT, control loops and harmonics; models and certificates are tied to a firmware version", concepts: ["m06.compliance"] },
  ],
  scenarios: [
    {
      id: "m06-s2",
      title: "The vars aren't there in August",
      context: md`You are MEWRE's PM for the grid interface of a 1,100 MW PV IPP. During on-site compliance testing in late June (ambient 47 °C), the reactive capability test at full power reaches only 0.97 PF lagging at the POI instead of 0.95. The IPP's engineer says the test is "within tolerance" and proposes to repeat it in November.`,
      start: "a",
      concepts: ["m06.reactive-capability", "m06.compliance"],
      nodes: {
        a: {
          md: md`What do you do?`,
          choices: [
            { text: "Refuse a winter re-test as the basis for compliance; ask the OE to compare the result with the 50 °C capability study and determine the shortfall in Mvar; request the IPP's corrective proposal.", next: "b", score: 10, feedback: "Right — the requirement applies at the design ambient, when the grid needs vars most." },
            { text: "Accept the November re-test.", next: "c", score: 2, feedback: "Passing in 25 °C weather proves nothing about August." },
            { text: "Declare the plant non-compliant and refuse COD immediately.", next: "b", score: 5, feedback: "Possibly justified, but first quantify the shortfall and check the PPA consequences — refusing COD has big commercial effects." },
          ],
        },
        b: {
          md: md`The OE finds ~150 Mvar shortfall at 50 °C: inverters were sized on their 35 °C rating. The IPP offers either (1) a 150 Mvar STATCOM in 10 months, or (2) to curtail active power on hot days to free up Mvar until then.`,
          choices: [
            { text: "Accept the STATCOM as the permanent fix with a binding date and security; allow interim operation with curtailment-for-vars at the IPP's cost (no deemed energy), formalised in a side letter reviewed by legal.", next: "d", score: 10, feedback: "Balanced: grid security now, permanent fix later, cost on the party responsible." },
            { text: "Accept curtailment as the permanent solution.", next: "d", score: 4, feedback: "Permanently losing MW on the hottest days — the peak — is a poor outcome for MEWRE." },
          ],
        },
        c: {
          md: md`The November test passes. Next July, during a voltage depression in western Kuwait, the control centre cannot get the vars it expected from the plant; voltage dips to 0.92 pu.`,
          choices: [
            { text: "Reopen compliance and require a permanent fix, documenting the incident.", score: 4, feedback: "Correct now, but you lost a year and the plant's behaviour surprised the operator in a real event." },
          ],
        },
        d: {
          md: md`The STATCOM is commissioned. You are asked to prevent recurrence on the next IPP.`,
          choices: [
            { text: "Require in the RFP that reactive capability be demonstrated at the POI at 50 °C ambient, with the capability study submitted at bid stage and inverter derating curves attached.", score: 10, feedback: "Exactly — move the check from commissioning to bid evaluation." },
            { text: "Require a STATCOM on every plant.", score: 4, feedback: "Over-prescriptive; specify the function and let bidders find the cheapest compliant solution." },
          ],
        },
      },
    },
  ],
};

export default lesson;
