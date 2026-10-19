import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m12-l04",
  title: "O&M Strategy: Maintenance, Spares, Cleaning & Site Management",
  summary:
    "Designing O&M for a desert PV+BESS plant: preventive, corrective and predictive maintenance, CMMS, spares strategy with Poisson sizing, the economics of cleaning (dry robotic vs water) in Kuwaiti soiling, sand and dune management, security and staffing.",
  minutes: 75,
  objectives: [
    "You can design a maintenance mix (preventive, corrective, predictive) and the CMMS processes that support it",
    "You can size critical spares using failure rates, lead times and a Poisson service level",
    "You can derive and apply the optimal cleaning interval and compare manual/water with robotic dry cleaning",
    "You can plan sand management, security and staffing for a GW-scale desert plant",
  ],
  concepts: [
    {
      id: "m12.maintenance-strategy",
      name: "Maintenance strategy",
      description:
        "Mix of preventive (time/usage-based), corrective (run-to-failure) and predictive/condition-based maintenance chosen by asset criticality and failure behaviour.",
      competency: "operations",
      related: ["m12.cmms", "m12.spares-strategy", "m09.om-scope"],
    },
    {
      id: "m12.cmms",
      name: "CMMS",
      description:
        "Computerised maintenance management system holding the asset register, maintenance plans, work orders, spares inventory and history — the O&M system of record.",
      competency: "operations",
    },
    {
      id: "m12.spares-strategy",
      name: "Spares strategy",
      description:
        "Deciding which spares to hold, where and how many, based on criticality, failure rates, lead times and target service levels.",
      competency: "operations",
    },
    {
      id: "m12.cleaning-economics",
      name: "Cleaning economics",
      description:
        "Trade-off between cleaning cost and soiling energy loss; optimal interval balances the two, and technology choice (water, tractor, robotic dry) changes both.",
      competency: "operations",
      related: ["m12.maintenance-strategy", "m02.cleaning-strategy", "m10.cleaning-economics"],
    },
    {
      id: "m12.site-management",
      name: "Desert site management",
      description:
        "Sand encroachment and dune management, storm procedures, security against theft and intrusion, and staffing of a remote GW-scale site.",
      competency: "operations",
      related: ["m02.wind-stow"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Choosing how to maintain, what to stock and when to clean",
      blocks: [
        {
          kind: "md",
          md: md`### Maintenance types

| Type | Trigger | Examples (PV/BESS) | Use when |
|---|---|---|---|
| **Preventive (PM)** | Calendar or usage | Inverter filter/fan service, torque checks, transformer oil sampling, tracker lubrication, BESS HVAC service before summer, vegetation (N/A in Kuwait) → **sand removal** | Failure is age-related or consequences are high |
| **Corrective (CM)** | Failure | Replacing blown string fuses, failed IGBT modules, broken modules | Failure is random, consequence low, detection fast |
| **Predictive / condition-based (PdM/CBM)** | Measured condition | Filter differential pressure, inverter temperature trends, transformer DGA, IR scans, string-current analytics, BESS cell imbalance trends | Condition is measurable and degradation is gradual |

A good strategy uses **criticality**: a main 400 MVA transformer (single point of failure, months to replace) gets CBM (online DGA, IR, oil tests) plus a spare or a contingency plan; a single string fuse gets run-to-failure with fast detection. **Reliability-centred maintenance (RCM)** formalises this: for each function, list failure modes, effects and the most cost-effective task.

Desert specifics: maintenance calendars copied from European OEM manuals underestimate dust. Use **condition triggers** (filter ΔP, temperature margins) and plan **pre-summer campaigns** (March–May): HVAC service, filter changes, thermography, tracker checks — before the 50 °C months when failures cost most.

### CMMS — the system of record

The CMMS (e.g. SAP PM, IBM Maximo, or PV-specific platforms) holds: asset register (from handover), maintenance plans, work orders (with failure codes, time, parts), spares inventory and reorder points, warranty data, and history. KPIs from it: **MTBF**, **MTTR**, PM compliance (% on time), backlog, first-time fix rate. An O&M contract should require CMMS data access for the owner — without it, availability and warranty claims cannot be audited.

### Spares sizing

For a fleet of $N$ identical items with annual failure rate $\lambda_a$ and replenishment lead time $L$, failures during the lead time are approximately Poisson with mean $\mu = N\lambda_a L$. Choose stock $S$ so that the probability of not running out meets a service level:`,
        },
        { kind: "equation", formula: "m12-poisson-spares" },
        {
          kind: "md",
          md: md`Example: 3,125 string inverters, 2 %/yr failures, 8-week lead time → $\mu = 3{,}125 \times 0.02 \times 8/52 = 9.6$. For 95 % service, $S = 15$ (cumulative Poisson ≈ 0.963); holding only the mean (10) gives ≈ 63 % — a stock-out more than one time in three. Categories: **strategic spares** (main transformer, GSU, large switchgear parts — share across sites or contract with OEM), **critical spares** (inverter power modules, MV transformers, tracker controllers, BESS modules — on site), **consumables** (fuses, connectors, filters).

### The economics of cleaning

Assume soiling loss grows linearly at rate $s$ (fraction per day) after each cleaning, plant daily energy $E_d$, energy value $p$ and cost per full cleaning cycle $C$. Over an interval $T$ the average loss fraction is $sT/2$, so the cost per day is cleaning $C/T$ plus lost energy $pE_d sT/2$. Minimising gives:`,
        },
        { kind: "equation", formula: "m12-cleaning-interval" },
        {
          kind: "md",
          md: md`At the optimum the cleaning cost per day **equals** the soiling loss value per day. Key insight for a MEWRE PM: **the value of energy $p$ differs by stakeholder**. An IPP values energy at its tariff (very low in the Gulf); MEWRE values it at avoided fuel and peak reliability (much higher). The IPP's optimal interval is therefore longer than the ministry's — a misalignment the PPA or O&M performance regime must address (e.g. a PR/availability guarantee, or contractual cleaning frequency).

**Technology options**

| Method | Typical frequency | Water | Notes |
|---|---|---|---|
| Manual / tractor-mounted wet cleaning | Weekly–monthly | Yes (demineralised to avoid residue; ≈ 0.5–2 L/m², i.e. a few litres per module) | Labour-heavy; water logistics in the desert |
| Waterless robotic (one robot per row, nightly) | Daily or every few days | No | Capex ~USD 1,000–3,000 per row-robot; brush must be OEM-approved; cannot remove cemented dust |
| Semi-automatic (robot moved between rows) | Every few days | No | Lower capex, more labour |
| Hybrid | Robotic daily + periodic wet wash | Some | Handles dew-cemented dust in winter |

Kuwaiti evidence: the Shagaya PV testbed reported substantial soiling with monthly water cleaning; Kuwaiti experiments report ~17 % loss after 6 days in one dust event and 8.7–15.1 % losses with monthly cleaning depending on season.`,
        },
        { kind: "sources", refs: ["m12-rser-shagaya-pv", "m12-jeas-soiling-kuwait"] },
        {
          kind: "callout",
          tone: "why",
          title: "Why dew turns dust into cement",
          md: md`On winter nights module glass cools below the dew point; dew dissolves soluble salts in the dust, which recrystallise in the morning and bind particles to the glass (**cementation**). Dry brushes then smear rather than remove. That is why many Gulf plants combine daily dry robots with occasional wet washes, and why tracker **night-stow angle** (tilting modules to reduce dew collection) is an O&M lever.`,
        },
        {
          kind: "widget",
          widget: "soiling",
          caption: "Change soiling rate, cleaning cost and tariff: the optimal interval moves with the square root of cost over (value × soiling rate).",
        },
      ],
    },
    {
      layer: "applied",
      title: "Cleaning a 1 GW plant: when, and at what value",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Optimal manual cleaning interval at the IPP's tariff",
          given: md`1,000 MWac / 1,300 MWp; annual energy 2,795 GWh → $E_d = 7{,}658$ MWh/day. Soiling rate $s$ = 0.4 %/day (dusty season). Wet cleaning of 2.17 million modules costs $C$ = USD 130,000 per full cycle. Energy value to the IPP $p$ = USD 14/MWh (illustrative tariff; the Zone 1 tariff is unpublished).`,
          steps: [
            { md: md`$pE_d s = 14 \times 7{,}658 \times 0.004 = 428.8$ USD/day per day of interval.` },
            { md: md`$T^* = \sqrt{2C/(pE_ds)} = \sqrt{2 \times 130{,}000/428.8} = \sqrt{606.3} = 24.6$ days.` },
            { md: md`Roughly monthly — consistent with the monthly water cleaning reported at Shagaya.` },
          ],
          result: md`$T^* ≈ 25$ days at the IPP's energy value.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "What the 25-day interval costs",
          given: md`Same plant and $T^* = 24.6$ days.`,
          steps: [
            {
              md: md`Average soiling loss $= sT^*/2 = 0.004 \times 24.6/2$ = ?`,
              hidden: true,
              check: { prompt: "Average soiling loss fraction", answer: 0.0492, tolerance: { abs: 0.0005 } },
            },
            { md: md`Lost energy $≈ 0.0492 \times 2{,}795 = 137.5$ GWh/yr → $137{,}500 \times 14 =$ USD 1.93 m/yr.` },
            {
              md: md`Cleaning cost $= 130{,}000 \times 365/24.6$ = ? USD m/yr`,
              hidden: true,
              check: { prompt: "Annual cleaning cost", answer: 1.93, unit: "USD m", tolerance: { rel: 0.01 } },
            },
            { md: md`Total ≈ USD 3.85 m/yr, split equally between cleaning and loss — the signature of the optimum.` },
          ],
          result: md`≈ 4.9 % average soiling loss (≈ 137 GWh/yr) and ≈ USD 3.9 m/yr total. A daily robotic system holding loss near ~1.5 % would recover ~95 GWh/yr — worth only ~USD 1.3 m/yr at USD 14/MWh, so robots struggle to pay back at tariff value; at the ministry's avoided-fuel value (and with water scarcity priced in) the answer can flip.`,
        },
        {
          kind: "question",
          question: {
            id: "m12-l04-p1",
            type: "numeric",
            prompt: md`Repeat the optimisation using MEWRE's economic value of energy, an illustrative avoided-fuel cost of USD 55/MWh (other inputs unchanged: C = USD 130,000, $E_d$ = 7,658 MWh/day, s = 0.004/day). What is the optimal interval in days?`,
            answer: 12.4,
            unit: "days",
            tolerance: { abs: 0.15 },
            explanation: md`$T^* = \sqrt{2 \times 130{,}000/(55 \times 7{,}658 \times 0.004)} = \sqrt{260{,}000/1{,}684.8} = \sqrt{154.3} = 12.4$ days. The ministry would want cleaning twice as often as the IPP's private optimum — so the PPA/O&M regime (PR guarantee, availability-plus-soiling terms or a contractual cleaning standard) must align incentives.`,
            concepts: ["m12.cleaning-economics"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running O&M on a desert GW site",
      blocks: [
        {
          kind: "md",
          md: md`### Staffing (indicative, 1 GW PV + BESS)

| Function | Typical headcount |
|---|---|
| Plant manager, deputy, HSE, admin | 5–8 |
| Control room operators (24/7 shifts) | 10–15 |
| Electrical/HV technicians (authorised persons) | 15–25 |
| Inverter/tracker/BESS technicians | 15–30 |
| Performance engineer / data analyst | 2–4 |
| Stores, CMMS, planning | 3–5 |
| Cleaning crews (manual wet cleaning) | 100–200+ (far fewer with robots) |
| Security guards (shifts) | 20–40 |

Total permanent technical staff ~50–80, plus cleaning and security. Competence matters more than numbers: HV switching requires **authorised persons** under a safety rules regime; BESS requires specialists for thermal events.

### Sand and dune management

Wind-blown sand accumulates against fences, around inverter skids and on roads; mobile dunes can migrate onto arrays. Measures: perimeter **sand fences** and windbreaks on the prevailing (north-westerly shamal) side, regular sand removal from fences, drainage channels and roads, raised equipment plinths, sealed cable entries, and post-storm inspection rounds (tracker stow recovery, wind sensor check, sand in junction boxes). Avoid unnecessary grading at construction — the natural desert crust is the best dust suppressor.

### Storm procedures

Shamal and dust storms: tracker **wind stow** triggered by redundant anemometers; afterwards a controlled return and a check for rows stuck in stow (a classic hidden loss). BESS HVAC filters and condenser coils checked after every dust event. Robotic cleaners parked/secured.

### Security

A 1 GW site has a perimeter of roughly 20–30 km. Threats: copper/cable theft, module theft, vandalism, intrusion into HV areas (safety!). Measures: fencing, CCTV with video analytics and thermal cameras, intrusion detection on fences, lighting at critical areas, patrols, access control and visitor induction, cyber security of SCADA (network segregation, remote access control).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "O&M contract and practice failures",
          md: md`- O&M scope copied from a European template: PM intervals blind to dust; no sand management; no pre-summer campaign.
- Spares stocked at the mean demand: stock-outs one time in three.
- No CMMS access for the owner: availability and warranty claims unauditable.
- Cleaning frequency left entirely to the operator with only an availability guarantee (soiling doesn't reduce availability!) — the operator under-cleans.
- Robots with non-approved brushes void module warranties.
- Trackers left in stow after storms because no one checks.`,
        },
        {
          kind: "checklist",
          title: "PM checklist: O&M strategy review",
          items: [
            "Criticality analysis done; maintenance type chosen per asset (PM/CM/CBM)",
            "PM intervals adapted to dust (condition triggers such as filter ΔP)",
            "Pre-summer campaign planned (HVAC, filters, thermography, tracker checks)",
            "Spares list with quantities justified by failure rate, lead time and service level",
            "Cleaning regime: method OEM-approved, frequency justified economically, water source and quality defined",
            "Performance regime covers soiling (PR guarantee or cleaning standard), not just availability",
            "Sand fences, removal schedule and storm procedures in place",
            "Security plan: perimeter, CCTV analytics, HV access control, SCADA cyber security",
            "Owner access to CMMS and SCADA data written into the contract",
          ],
        },
        {
          kind: "ask",
          title: "Ask the O&M contractor",
          items: [
            "How did you size critical spares — what failure rates, lead times and service level?",
            "What triggers inverter filter changes on this site, and what is the actual interval?",
            "What is your cleaning frequency in shamal season vs winter, and how do you handle dew-cemented dust?",
            "How fast are trackers returned from stow after a storm, and how do you detect rows that stay stuck?",
            "What are MTTR and PM compliance this quarter, from the CMMS?",
          ],
        },
        { kind: "scenario", scenario: "m12-s4" },
        {
          kind: "feynman",
          prompt: "Explain to a ministry finance officer why the IPP may clean its panels less often than the ministry would like, and how a contract fixes that.",
          keyPoints: [
            "Optimal interval depends on cleaning cost vs value of lost energy",
            "IPP values energy at its low tariff; MEWRE at avoided fuel/peak reliability",
            "Lower value → longer optimal interval",
            "Availability guarantees don't capture soiling; PR guarantees or cleaning standards do",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m12-l04-q1",
      type: "mcq",
      prompt: "Which maintenance type suits the main 400 MVA transformer best?",
      options: ["Run-to-failure", "Condition-based (online DGA, IR, oil tests) plus contingency spare planning", "Replace every 5 years", "No maintenance"],
      answer: 1,
      explanation: md`It is a single point of failure with months of lead time: monitor condition continuously and plan contingencies.`,
      concepts: ["m12.maintenance-strategy"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m12-l04-q2",
      type: "numeric",
      prompt: md`Optimal cleaning interval: C = USD 60,000 per cycle (500 MWac plant), $E_d$ = 3,800 MWh/day, s = 0.3 %/day, p = USD 14/MWh. What is $T^*$ in days?`,
      answer: 27.4,
      unit: "days",
      tolerance: { abs: 0.3 },
      explanation: md`$pE_ds = 14 \times 3{,}800 \times 0.003 = 159.6$. $T^* = \sqrt{120{,}000/159.6} = \sqrt{751.9} = 27.4$ days.`,
      concepts: ["m12.cleaning-economics"],
      difficulty: 2,
    },
    {
      id: "m12-l04-q3",
      type: "mcq",
      prompt: "Expected inverter failures during the 8-week lead time are 9.6 (Poisson). If you stock 10 spares, roughly how often will you avoid a stock-out?",
      options: ["~99 %", "~95 %", "~63 %", "~50 %"],
      answer: 2,
      explanation: md`Cumulative Poisson at 10 with mean 9.6 ≈ 0.63. You need about 15 for 95 %. Stocking the mean is a classic error.`,
      concepts: ["m12.spares-strategy"],
      difficulty: 2,
    },
    {
      id: "m12-l04-q4",
      type: "multi",
      prompt: "Which are good desert-specific O&M practices? Select all.",
      options: [
        "Pre-summer HVAC and filter campaign",
        "Calendar-only filter changes per European manual",
        "Post-storm checks for trackers stuck in stow",
        "Sand fences on the prevailing-wind side",
        "Grading the whole site flat to make cleaning easier",
      ],
      answer: [0, 2, 3],
      explanation: md`Calendar-only filters ignore dust load; grading destroys the desert crust and increases dust.`,
      concepts: ["m12.site-management", "m12.maintenance-strategy"],
      difficulty: 1,
    },
    {
      id: "m12-l04-q5",
      type: "decision",
      prompt: md`You are drafting the O&M performance regime for a MEWRE-owned 500 MW plant. The bidder proposes only an energy-based availability guarantee of 99 %. What do you add?`,
      options: [
        { text: "Nothing — 99 % is high", score: 0.2, feedback: "Soiling, string faults and stuck trackers don't reduce availability; an availability-only regime lets them grow unpunished." },
        { text: "A temperature-corrected PR guarantee (or performance index vs weather-adjusted model) plus a minimum cleaning standard tied to soiling-station measurements", score: 1, feedback: "Covers the losses availability misses, and aligns cleaning with the ministry's value of energy." },
        { text: "A clause requiring daily cleaning regardless of cost", score: 0.4, feedback: "Over-specifying method rather than outcome; may be uneconomic in winter." },
      ],
      explanation: md`Availability measures whether equipment is running, not how well. A performance index captures soiling and degradation-type losses.`,
      concepts: ["m12.cleaning-economics", "m12.maintenance-strategy"],
      difficulty: 2,
    },
    {
      id: "m12-l04-q6",
      type: "mcq",
      prompt: "Why do dry robotic brushes struggle with winter soiling in Kuwait?",
      options: [
        "Robots don't work in cold weather",
        "Dew dissolves salts that recrystallise and cement dust to the glass",
        "Winter has no dust",
        "Brushes freeze",
      ],
      answer: 1,
      explanation: md`Dew-induced cementation creates a crust that dry brushes smear; periodic wet cleaning or night-stow strategies help.`,
      concepts: ["m12.cleaning-economics"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "m12-l04-f1", front: "Optimal cleaning interval", back: md`$T^* = \sqrt{2C/(p\,E_d\,s)}$`, concepts: ["m12.cleaning-economics"] },
    { id: "m12-l04-f2", front: "Property of the cleaning optimum", back: "Daily cleaning cost equals daily soiling loss value.", concepts: ["m12.cleaning-economics"] },
    { id: "m12-l04-f3", front: "Spares: Poisson mean during lead time", back: md`$\mu = N\,\lambda_a\,L$`, concepts: ["m12.spares-strategy"] },
    { id: "m12-l04-f4", front: "PM vs CM vs CBM", back: "Preventive (calendar/usage), corrective (after failure), condition-based (measured condition triggers).", concepts: ["m12.maintenance-strategy"] },
    { id: "m12-l04-f5", front: "CMMS KPIs", back: "MTBF, MTTR, PM compliance, backlog, first-time fix rate.", concepts: ["m12.cmms"] },
    { id: "m12-l04-f6", front: "Why availability alone is a weak O&M metric", back: "Soiling, string faults and stuck trackers reduce energy without reducing availability.", concepts: ["m12.maintenance-strategy"] },
    { id: "m12-l04-f7", front: "Kuwait soiling evidence", back: "~17 % after 6 days (one experiment); 8.7–15.1 % with monthly cleaning by season.", concepts: ["m12.cleaning-economics"] },
    { id: "m12-l04-f8", front: "Typical permanent technical staff, 1 GW PV+BESS", back: "~50–80, plus cleaning crews and security.", concepts: ["m12.site-management"] },
  ],
  scenarios: [
    {
      id: "m12-s4",
      title: "After the shamal",
      dayInLife: true,
      context: md`You are the MEWRE asset manager for a ministry-owned 500 MW PV + 200 MWh BESS plant. A two-day shamal ends on Wednesday night. Thursday 07:00, the control room reports: PR down 11 %, 63 tracker rows still in stow, two BESS containers with high cell temperatures, one weather station's anemometer reading 18 m/s in calm air.`,
      start: "a",
      concepts: ["m12.site-management", "m12.cleaning-economics", "m12.maintenance-strategy"],
      nodes: {
        a: {
          md: md`You have one cleaning crew cycle available this week and a limited technician team. What is your first priority?`,
          choices: [
            { text: "Start full-plant wet cleaning immediately", next: "b", score: 4, feedback: "Cleaning matters, but safety and quick wins come first." },
            { text: "Safety and quick wins: BESS containers (check HVAC/condenser coils and filters, verify fire system), fix the stuck anemometer and return trackers from stow; then plan cleaning by block yield", next: "c", score: 10, feedback: "BESS thermal risk first; the faulty anemometer is probably what keeps 63 rows in stow — a fast energy recovery." },
            { text: "Wait for the monthly report to quantify losses", next: "b", score: 1, feedback: "Every day of delay costs MWh and raises BESS risk." },
          ],
        },
        b: {
          md: md`By noon a BESS container derates on over-temperature, and the 63 rows remain in stow, costing ~4 % of plant output during peak hours.`,
          choices: [{ text: "Redirect technicians to BESS and trackers", next: "c", score: 4, feedback: "Recovered, but late." }],
        },
        c: {
          md: md`By 10:00: condenser coils on both BESS containers were sand-blocked — cleaned, temperatures falling; anemometer replaced and trackers back in tracking. PR loss now ~7 %, mostly soiling.`,
          choices: [
            { text: "Clean the blocks with the worst soiling ratio and highest yield first; schedule the remaining blocks over the week", next: "d", score: 10, feedback: "Prioritising by recoverable MWh gets the most value from limited crews." },
            { text: "Clean blocks in numerical order", next: "d", score: 5, feedback: "Simple, but leaves value on the table." },
          ],
        },
        d: {
          md: md`Friday's report shows recovery to −1.5 % vs expected. Your manager asks what should change.`,
          choices: [
            { text: "Add redundant anemometers with disagreement alarms, a post-storm checklist (trackers, BESS coils, wind sensors), and condition-based BESS coil cleaning", score: 10, feedback: "Turns an incident into durable controls." },
          ],
        },
      },
    },
  ],
};

export default lesson;
