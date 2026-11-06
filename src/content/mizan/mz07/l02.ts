import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz07-l02",
  title: "Grid code requirements that touch plant controls and analytics",
  summary:
    "Which connection requirements constrain what Mizan's stow, tracker and cleaning functions may do, and which ones leave fingerprints in the data that a soiling model can mistake for dirt: fault ride-through, reactive power, ramp limits, set-point following and curtailment, frequency response. Kuwait's code is not public, so the lesson works from comparators and tells you what to obtain and ask.",
  minutes: 55,
  objectives: [
    "You can list the grid code requirements that interact with stow, tracker and cleaning control, and why.",
    "You can check whether a plant-wide stow respects a ramp limit and design a staggered stow when it does not.",
    "You can compute how much active power a reactive-power obligation removes on a hot day and recognise its signature in data.",
    "You can state precisely what is and is not known about Kuwait's connection requirements and how Mizan should handle that in a proposal.",
  ],
  concepts: [
    {
      id: "mz07.stow-as-ramp",
      name: "Stow is a grid event",
      description: "A plant-wide stow or mass tracker move changes active power at the POI. Above a ramp limit (often about 10 %/min of rated power in comparator codes), it must be staggered or coordinated with the PPC.",
      competency: "mz-grid",
      related: ["m06.active-power-control", "mz05.stow-trigger"],
    },
    {
      id: "mz07.q-costs-p",
      name: "Reactive obligation costs active power in heat",
      description: "With inverter MVA derated at 50 °C, supplying the POI Mvar requirement plus transformer losses caps MW. The resulting flat top resembles clipping or derating, not soiling.",
      competency: "mz-grid",
      related: ["m06.reactive-capability", "mz07.confounders"],
    },
    {
      id: "mz07.ppc-authority",
      name: "PPC holds the export set-point",
      description: "The power plant controller follows the control centre's set-points and enforces ramp, Q and frequency modes. Mizan functions must request through the PPC or tracker network controller, never write to inverters directly.",
      competency: "mz-grid",
      related: ["m06.ppc", "mz05.command-priority"],
    },
    {
      id: "mz07.kuwait-code-gap",
      name: "Kuwait connection requirements not public",
      description: "No published Kuwaiti grid code for inverter-based plants was found; requirements likely sit in RFP technical schedules, PPAs and connection agreements with MEWRE Transmission. Sellers must obtain them per plant.",
      competency: "mz-grid",
      related: ["m06.grid-code", "m06.compliance"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The requirements that reach Mizan's functions",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan wants to move trackers for dust, wind and heat, and to time cleaning. Every one of those actions changes the plant's output at the point of interconnection, which is governed by the connection requirements and watched by MEWRE's control centre. A plant owner will ask one question before anything else: "will your function ever make us non-compliant?" You need to answer it precisely, and you need to know which grid behaviours will fool your own soiling analytics.`,
        },
        {
          kind: "xref",
          to: "m06-l02",
          note: "Track 0 teaches grid codes in full: operating ranges, FRT, reactive capability, power quality, ramps, models and compliance testing, with Kuwait's code status. Here we keep only the parts that touch plant controls and analytics.",
        },
        {
          kind: "xref",
          to: "m06-l03",
          note: "Droop, AGC, the power plant controller (PPC) and frequency response are derived in Track 0. Read the PPC section before selling any control function.",
        },
        {
          kind: "md",
          md: md`### Requirement by requirement

| Requirement (comparator values) | What it does to the plant | Constraint on Mizan controls | Fingerprint in the data |
|---|---|---|---|
| **Fault ride-through** (stay connected through dips to 0 pu for about 150 ms; inject reactive current) | Inverters stay online through faults, P dips then recovers within about 1 s | Tracker and cleaning-robot auxiliaries must not drop out or trigger a mass stow on a voltage dip; stow logic must distinguish a grid event from a weather event | Short P dips plant-wide, simultaneous across all inverters: an event, not soiling |
| **Reactive power** (for example 0.95 lead/lag at Pmax at the POI) | Inverters reserve MVA for Mvar | None directly, but the plant's MW ceiling falls on hot days | Flat midday tops on high-Q days that look like clipping |
| **Ramp limits** (for example 10 %/min of rated power) | PPC limits upward ramps; downward ramps from clouds or dust cannot be controlled by PV alone | Plant-wide stow, return-from-stow and mass tracker moves must respect the limit or be staggered | Smooth ramps after stow in compliant plants; sawtooth steps if staggered by block |
| **Set-point following and curtailment** | Output capped at the control centre's set-point | Mizan must not try to recover energy the PPC is deliberately limiting; off-pointing trackers is one way to curtail | Flat output below available power: looks like a large, sudden soiling loss |
| **Frequency response** (LFSM-O above about 50.2 Hz; headroom if required) | Output reduced on over-frequency; possible reserved headroom | Headroom requirements reduce the value of recovered energy at those times | Output tracking frequency, not irradiance |
| **Data and monitoring** (SCADA points, fault recorders, cybersecurity) | Owner must provide signals to the control centre | Any new controller is a new network device subject to cybersecurity review | (not a confounder, but a gate for deployment) |

### Ramps: when stow becomes a grid problem`,
        },
        { kind: "equation", formula: "mz07-ramp-rate" },
        {
          kind: "md",
          md: md`A wind stow on a clear afternoon is the hard case: irradiance is high, and moving every row to a steep angle can cut plane-of-array irradiance by half within the tracker's slew time. Dust stows are easier: by the time the dust arrives, beam irradiance has already collapsed, so the output change from stowing is smaller. The fix for a large ramp is **staggering**: stow blocks in sequence, highest wind-exposure rows first, so that the plant-level ramp stays under the limit. The PPC may also use BESS, where present, to smooth the step.

Safety beats the ramp limit. A tracker vendor's wind stow protects the structure (mz05-l02) and must not be delayed by grid considerations beyond what the structural margin allows. That priority order (safety stow, grid compliance, energy, soiling) is a design statement Mizan should write down for every customer.

### Reactive power on a hot day`,
        },
        { kind: "equation", formula: "mz07-p-headroom" },
        {
          kind: "md",
          md: md`On a 50 °C afternoon inverters derate, transformers absorb more Mvar at high load, and the control centre may ask for maximum voltage support. The plant reaches its MVA limit and caps MW. In an hourly performance-ratio series that looks like a few percent of lost performance on exactly the hottest days, which a naive model blames on soiling or temperature. The cure is in the data request: inverter Q, PPC mode and set-points, and the inverter's apparent-power limit flag.`,
        },
        { kind: "widget", widget: "droop", props: { droop: 4 }, caption: "Over-frequency response with 4 % droop. When the plant is following frequency, output tracks the grid, not the sun: those intervals are useless for soiling estimation." },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait's connection requirements",
          md: md`No published Kuwaiti grid code for inverter-based plants was found (Track 0 m06-l02). For KAPP IPPs, requirements are likely in the RFP technical schedules, the PPA and the connection agreement with MEWRE's Transmission sector; for Shagaya Phase I, in the original EPC specifications and whatever MEWRE applied at transfer. All values in this lesson are **comparators** (EU RfG 2016/631, IEEE 2800-2022, the Saudi Arabian Grid Code). Mizan should never state a Kuwaiti ramp limit, PF range or FRT curve in a proposal without the plant's own connection documents.`,
        },
        { kind: "sources", refs: ["mz07-r15", "mz07-r16", "mz07-r17", "mz07-r20"] },
      ],
    },
    {
      layer: "applied",
      title: "Stow ramps and reactive headroom with numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Can a 1,100 MW plant stow all at once on a windy clear afternoon?",
          given: md`Illustrative: 1,100 MW rated plant producing 900 MW. Wind forecast exceeds the tracker vendor's stow threshold. Stowing to the wind-stow angle halves plane-of-array irradiance, so output falls by about 450 MW. Comparator ramp limit: $r_{\max} = 10\ \%/\text{min}$ of rated, i.e. 110 MW/min. Two cases: slew time 5 min and 2 min.`,
          steps: [
            { md: md`Five-minute slew: $450 / 5 = 90$ MW/min, $r = 90/1{,}100 = 8.2\ \%/\text{min}$. Under the limit.` },
            { md: md`Two-minute slew: $450 / 2 = 225$ MW/min, $r = 20.5\ \%/\text{min}$. About twice the limit.` },
            { md: md`Staggered design for the fast trackers: split into blocks so each minute removes at most 110 MW. With 450 MW to shed, at least $\lceil 450/110 \rceil = 5$ one-minute steps, so about 5 minutes for the whole plant, roughly what the slower tracker does naturally.` },
            { md: md`Check the structural margin: if the vendor needs all rows stowed within 3 minutes of the trigger, the stagger cannot meet both. Then the trigger must fire earlier (a forecast-based trigger, mz05-l02) or the owner must agree an exemption with the control centre for safety stows.` },
          ],
          result: md`Slow trackers comply naturally; fast trackers need a staggered, earlier-triggered stow. The deliverable for the customer is a written priority order and a stagger plan agreed with the PPC integrator and, through the owner, the control centre.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Active power lost to a reactive obligation at 50 °C",
          given: md`Illustrative: 1,100 MW plant must deliver 0.95 PF at the POI at full output, so $Q_{\text{POI}} = 1{,}100 \tan(\arccos 0.95) = 361.5$ Mvar. Transformer and cable reactive losses at that loading: 100 Mvar. Inverter fleet rating at 50 °C: 1,160 MVA. The DC array could deliver 1,120 MW at that moment.`,
          steps: [
            { md: md`Inverter reactive requirement: $Q_{\text{inv}} = 361.5 + 100 = 461.5$ Mvar.` },
            {
              md: md`$P_{\max} = \sqrt{1{,}160^2 - 461.5^2} = \sqrt{1{,}345{,}600 - 212{,}982} = 1{,}064$ MW.`,
              hidden: true,
              check: { prompt: "Maximum active power at the inverters", answer: 1064, unit: "MW", tolerance: { rel: 0.005 } },
            },
            {
              md: md`Power capped: $1{,}120 - 1{,}064 = 56$ MW, or 5.0 % of what the array could deliver.`,
              hidden: true,
              check: { prompt: "Active power capped by the reactive obligation", answer: 56, unit: "MW", tolerance: { abs: 1 } },
            },
            { md: md`In a PR series this is a 5 % deficit on the hottest, highest-Q hours only. Without the inverter Q and limit flags, a soiling model would partly absorb it.` },
          ],
          result: md`About 56 MW (5 %) capped on that hour, illustrative. Ask for inverter Q, PPC mode and limit flags in every data request, and exclude MVA-limited intervals before fitting soiling.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Handling grid requirements in a Mizan offer",
      blocks: [
        {
          kind: "md",
          md: md`**Where the requirements live.** For an IPP: the connection agreement, the PPA technical schedules, the grid compliance test reports from commissioning and the PPC functional specification. For Shagaya Phase I: the EPC technical specification, the SCADA points list and any MEWRE operating instructions. The people who know them: the owner's grid engineer, the PPC integrator (often the inverter OEM or a specialist), and MEWRE Transmission and control centre staff.

**How Mizan should position control functions.**
- Mizan's stow and cleaning logic is an **advisor or requester** to the tracker network controller and the PPC, not a new authority over inverters.
- The PPC remains the single point that enforces set-points, ramps, Q and frequency modes. That keeps grid compliance where it was tested.
- Every function ships with a written **priority order** (safety stow, grid compliance, energy, soiling) and a **fail-safe**: on loss of Mizan's signal, the plant reverts to vendor defaults.
- Analytics read the PPC and inverter status so grid-driven behaviour is never mistaken for soiling.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`1. Promising "smart stow" without checking the ramp limit: the first windy afternoon produces a non-compliance report from the control centre. 2. Writing directly to inverter set-points from a cloud service: bypasses the PPC and the compliance test, and fails any cybersecurity review. 3. Treating MVA-limited or curtailed hours as soiling. 4. Quoting comparator code values as Kuwaiti requirements.`,
        },
        {
          kind: "ask",
          title: "Questions to ask the plant owner and PPC integrator",
          items: [
            "What ramp-rate limits apply at the POI, up and down, and are safety stows exempt?",
            "What reactive-power and voltage-control mode does the control centre normally request in summer afternoons?",
            "Which signals does the PPC expose (set-point, available power, Q, mode, limit flags), at what resolution, and can Mizan read them?",
            "How does the tracker network controller accept external stow requests, and what is the command priority?",
            "What cybersecurity approvals does MEWRE require for a new device or data link at the plant?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to an IPP asset manager why Mizan's stow function cannot simply move all trackers at once, and why Mizan's analytics need the PPC's set-point and reactive-power data.",
          keyPoints: [
            "Stowing changes active power at the POI; a fast plant-wide stow can exceed the ramp limit.",
            "Staggering by block keeps the ramp within limits, but structural safety comes first and may require earlier triggers.",
            "The PPC enforces grid requirements; Mizan requests, it does not override.",
            "Curtailment and reactive obligations cap output and look like soiling in performance data unless flagged.",
            "Kuwait's limits come from the plant's own connection documents, not a public code.",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz07-l02-p1",
            type: "short",
            explanation: md`Graded against the rubric. The core of a good answer is authority (the PPC enforces, Mizan requests), a stated priority order, a ramp plan and a fail-safe, all tied to the plant's own connection documents.`,
            prompt: md`Write a **grid-compliance interface statement** (150 to 220 words) for Mizan's stow and cleaning optimisation offer to the Zone 1 IPP. It should tell the IPP's grid engineer exactly how Mizan's functions interact with the PPC, the tracker controller and the connection requirements.`,
            rubric: [
              "States that the PPC remains the sole enforcer of set-points, ramps, reactive power and frequency modes; Mizan requests and never writes to inverters directly.",
              "States a priority order: structural safety stow, grid compliance, energy yield, soiling.",
              "Addresses ramp limits for plant-wide stow (staggering, earlier triggers, exemption agreed through the owner).",
              "Defines fail-safe behaviour on loss of Mizan signal (revert to vendor defaults).",
              "Commits to using the plant's own connection documents for limits and flags that Kuwaiti values are not assumed.",
              "Mentions data needed (set-point, available power, Q, limit flags) and cybersecurity review.",
            ],
            modelAnswer: md`Mizan's functions sit above the tracker network controller and beside the PPC; they never write to inverters. The PPC remains the only device that enforces the control centre's set-points and the plant's ramp, reactive-power and frequency obligations, exactly as tested at commissioning. Mizan sends stow and position requests to the tracker network controller and cleaning schedules to the O&M system. Every request follows a fixed priority: structural safety stow first, then grid compliance, then energy yield, then soiling. For plant-wide stows Mizan computes the expected change in POI power and staggers blocks so the ramp stays within the limit in the connection agreement; where the tracker vendor's structural timing cannot be met within that limit, Mizan triggers earlier from forecasts and we ask you to agree any safety-stow exemption with MEWRE's control centre. If Mizan's signal is lost, trackers and cleaning revert to vendor defaults. We will take every limit from your connection agreement and PPC specification, not from comparator codes. We need read access to set-point, available power, inverter Q and limit flags at 1 to 5 minute resolution, and we will go through MEWRE's cybersecurity review for any new link.`,
            concepts: ["mz07.stow-as-ramp", "mz07.ppc-authority", "mz07.kuwait-code-gap"],
            difficulty: 3,
          },
        },
        { kind: "xref", to: "mz05-l04", note: "Tracker control architecture and command priority in depth (network controllers, SCADA, weather inputs, latency)." },
      ],
    },
  ],
  quiz: [
    {
      id: "mz07-l02-q1",
      type: "numeric",
      prompt: md`Illustrative: a 500 MW rated plant at 420 MW stows and output falls by 200 MW over 3 minutes. What is the ramp rate in %/min of rated power?`,
      answer: 13.3,
      tolerance: { abs: 0.2 },
      unit: "%/min",
      explanation: md`$200/3 = 66.7$ MW/min; $66.7/500 = 13.3\ \%/\text{min}$. Above a 10 %/min comparator limit: stagger it.`,
      concepts: ["mz07.stow-as-ramp"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz07-l02-q2",
      type: "mcq",
      prompt: md`Who should enforce the plant's ramp limit and export set-point when Mizan's stow logic is installed?`,
      options: ["Mizan's cloud service, writing directly to inverters", "The power plant controller (PPC), with Mizan sending requests", "The tracker vendor's motor controllers individually", "MEWRE's control centre, by tripping the plant"],
      answer: 1,
      explanation: md`The PPC was tested for compliance at commissioning; keeping it as sole enforcer keeps compliance intact. Mizan is a requester.`,
      concepts: ["mz07.ppc-authority"],
      difficulty: 1,
    },
    {
      id: "mz07-l02-q3",
      type: "multi",
      prompt: md`Which grid behaviours can appear as a soiling loss in an unfiltered PR series?`,
      options: ["Curtailment to a set-point", "Reactive-power obligation capping MW at the MVA limit", "Over-frequency power reduction (LFSM-O)", "A clean reference cell"],
      answer: [0, 1, 2],
      explanation: md`All three reduce output below what irradiance supports. Flag them from PPC and inverter data before fitting soiling.`,
      concepts: ["mz07.q-costs-p", "mz07.confounders"],
      difficulty: 2,
    },
    {
      id: "mz07-l02-q4",
      type: "mcq",
      prompt: md`What is the most accurate statement about Kuwait's grid code for PV plants, as of November 2026?`,
      options: [
        "Kuwait applies the EU RfG verbatim.",
        "No published Kuwaiti code for inverter-based plants was found; requirements are likely in RFP schedules, PPAs and connection agreements with MEWRE Transmission.",
        "Kuwait uses the GCCIA code for all plants.",
        "There are no requirements for PV plants in Kuwait.",
      ],
      answer: 1,
      explanation: md`Unverified status (Track 0 m06-l02). Obtain each plant's connection documents.`,
      concepts: ["mz07.kuwait-code-gap"],
      difficulty: 1,
    },
    {
      id: "mz07-l02-q5",
      type: "numeric",
      prompt: md`Illustrative: inverter fleet rating 600 MVA at 50 °C, required inverter reactive output 230 Mvar. What is the maximum active power, in MW?`,
      answer: 554.2,
      tolerance: { rel: 0.005 },
      unit: "MW",
      explanation: md`$\sqrt{600^2 - 230^2} = \sqrt{360{,}000 - 52{,}900} = \sqrt{307{,}100} = 554.2$ MW.`,
      concepts: ["mz07.q-costs-p"],
      difficulty: 2,
    },
    {
      id: "mz07-l02-q6",
      type: "decision",
      prompt: md`The tracker vendor needs all rows stowed within 3 minutes of a wind trigger; a plant-wide 3-minute stow exceeds the ramp limit. What do you propose?`,
      options: [
        { text: "Delay the stow until the ramp is compliant, whatever the wind.", score: 0, feedback: "Structural safety comes first; a damaged tracker field is far worse than a ramp exceedance." },
        { text: "Trigger earlier from forecasts so a staggered stow finishes in time, and have the owner agree a safety-stow exemption with the control centre for residual cases.", score: 1, feedback: "Respects both safety and compliance, with the owner holding the grid relationship." },
        { text: "Ignore the ramp limit: stows are rare.", score: 0.2, feedback: "Rare but visible: the control centre will report it and the owner will blame Mizan." },
        { text: "Ask MEWRE directly to waive the ramp limit for Mizan.", score: 0.3, feedback: "Mizan is not the connected party; the owner holds the connection agreement." },
      ],
      explanation: md`Priority order plus earlier triggering plus owner-led exemption.`,
      concepts: ["mz07.stow-as-ramp", "mz07.ppc-authority"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz07-l02-f1", front: "Priority order for Mizan control functions", back: "Structural safety stow, then grid compliance, then energy yield, then soiling.", concepts: ["mz07.stow-as-ramp", "mz07.ppc-authority"] },
    { id: "mz07-l02-f2", front: "Ramp rate formula", back: "r = (Delta P / Delta t) / P_rated; comparator limit often about 10 %/min.", concepts: ["mz07.stow-as-ramp"] },
    { id: "mz07-l02-f3", front: "Why a hot, high-Q afternoon fools soiling models", back: "Derated inverter MVA minus required Mvar caps MW: P_max = sqrt(S^2 - Q^2). The flat top looks like lost performance.", concepts: ["mz07.q-costs-p"] },
    { id: "mz07-l02-f4", front: "Who enforces set-points and ramps?", back: "The PPC. Mizan requests via PPC or tracker network controller; never writes to inverters.", concepts: ["mz07.ppc-authority"] },
    { id: "mz07-l02-f5", front: "Kuwait grid code status", back: "No public code for inverter-based plants found; get each plant's connection agreement, PPA schedules and PPC spec.", concepts: ["mz07.kuwait-code-gap"] },
    { id: "mz07-l02-f6", front: "Wind stow vs dust stow: which is the bigger ramp?", back: "Wind stow on a clear day (high irradiance cut quickly). Dust stow happens after beam irradiance has already collapsed.", concepts: ["mz07.stow-as-ramp"] },
  ],
};

export default lesson;
