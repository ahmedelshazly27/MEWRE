import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m09-l06",
  title: "O&M contracts and BESS LTSAs",
  summary:
    "What an O&M contract for a utility PV plant covers, how availability (time- and energy-based) and PR guarantees are defined and measured, bonus/malus and caps, spares, BESS long-term service agreements with capacity and efficiency guarantees and augmentation, and how to hand a plant over from the EPC contractor to the operator without gaps.",
  minutes: 70,
  objectives: [
    "You can specify the scope of a PV O&M contract for Kuwait desert conditions, including cleaning, spares and HV interfaces.",
    "You can compute time-based and energy-based availability and the resulting malus or bonus.",
    "You can explain why O&M contractors resist PR guarantees and how a fair PR guarantee is constructed.",
    "You can read a BESS LTSA capacity guarantee and test it against a measured result.",
    "You can plan the EPC-to-O&M handover and the Defects Notification Period interface.",
  ],
  concepts: [
    {
      id: "m09.om-scope",
      name: "O&M scope and contract models",
      description:
        "Preventive, corrective and predictive maintenance, cleaning, monitoring, HV maintenance, spares and reporting; full-scope fixed-fee versus limited-scope contracts and OEM service agreements.",
      competency: "operations",
    },
    {
      id: "m09.availability-guarantee",
      name: "Availability guarantee",
      description:
        "Guaranteed share of time (time-based) or of potential energy (energy-based) that the plant is available, excluding defined events; enforced by malus and rewarded by bonus.",
      competency: "operations",
      related: ["m09.om-scope"],
    },
    {
      id: "m09.pr-guarantee",
      name: "Performance-ratio guarantee in O&M",
      description:
        "A guarantee on weather-corrected PR with degradation and exclusion allowances; it ties O&M quality (cleaning, repairs) to output but depends on design, so it must be carefully baselined.",
      competency: "operations",
      related: ["m09.availability-guarantee"],
    },
    {
      id: "m09.bess-ltsa",
      name: "BESS long-term service agreement",
      description:
        "OEM/integrator agreement guaranteeing usable energy over life (with augmentation or LDs), round-trip efficiency and availability within an agreed operating envelope.",
      competency: "operations",
    },
    {
      id: "m09.epc-om-handover",
      name: "EPC-to-O&M handover",
      description:
        "Transfer at Taking-Over of documentation, spares, warranties, SCADA access, training and punch lists, with an interface agreement for defects during the DNP.",
      competency: "operations",
      related: ["m09.om-scope"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What O&M contracts guarantee, and how it is measured",
      blocks: [
        {
          kind: "md",
          md: md`Construction lasts two years; operation lasts thirty. Over the PPA term, O&M decisions (cleaning frequency, spare inverter stacks on site, response times) move energy yield by several percent, which for a 500 MW plant is millions of dollars a year. The O&M contract converts those decisions into enforceable obligations.

### Scope of a utility PV O&M contract

| Area | Typical content | Kuwait-specific notes |
|---|---|---|
| **Monitoring and control** | 24/7 SCADA monitoring, alarm handling, dispatch/curtailment execution, grid code compliance, reporting to the SPV and offtaker | Coordination with MEWRE's control centre on curtailment and outages |
| **Preventive maintenance** | Scheduled inspections (modules, trackers, inverters, transformers, cabling), thermography, IV-curve tracing, torque checks | Tracker motors, bearings and seals suffer from fine dust; inverter filters clog |
| **Corrective maintenance** | Fault response and repair within guaranteed response/repair times | Summer access windows (heat-stress rules for workers in midday hours) |
| **Module cleaning** | Frequency and method (water, waterless robotic, brush), soiling monitoring | Heavy soiling; water is scarce, so robotic dry cleaning is common in the region |
| **HV substation** | Often subcontracted to a specialist; protection testing, switchgear maintenance | Interface with MEWRE transmission for the 400 kV bay |
| **Spares** | Holding, replenishment, strategic spares (MV transformer, inverter power stacks, tracker controllers) | Long lead times; customs |
| **Warranty management** | Managing module, inverter and tracker warranty claims | OEM response in the region |
| **Asset management** (sometimes separate) | Commercial: invoicing, PPA compliance, insurance, budgets | Often done by the SPV's own team |

Contract models: **full-scope fixed fee** (contractor carries most risk, including corrective parts up to a threshold), **limited scope** (owner buys parts), **O&M by an EPC affiliate** for the first years (common in IPPs, which eases the DNP interface), and **OEM service agreements/LTSAs** for inverters, trackers and BESS.`,
        },
        {
          kind: "callout",
          tone: "kuwait",
          title: "Kuwait evidence (sourced)",
          md: md`A KISR-linked study of the roughly 11 MW Shagaya PV testbed found soiling "substantial", requiring monthly water cleaning. Shagaya Phase I contracts included 6-year design-build-operate periods, and the 10 MW wind farm's first-year output (42.59 GWh) was reported as 21% above its contractual figure of 31.16 GWh: a reminder that O&M guarantees are measured against a contractual baseline, not the best possible outcome.`,
        },
        { kind: "sources", refs: ["m09-rser-2020-shagaya-pv", "m09-reuters-shagaya-csp", "m09-e3s-2021-shagaya-wind"] },
        {
          kind: "md",
          md: md`### Availability: time-based versus energy-based`,
        },
        { kind: "equation", formula: "m09-availability-time" },
        { kind: "equation", formula: "m09-availability-energy" },
        {
          kind: "md",
          md: md`**Time-based** availability counts hours (weighted by unit capacity) during the production window (e.g. irradiance above 50 W/m²). It is easy to compute from SCADA but treats an outage at dawn like one at noon. **Energy-based** availability counts energy lost, so the contractor is pushed to fix noon outages first; it needs an agreed model of what each unavailable unit would have produced (from measured irradiance and neighbouring inverters).

**Exclusions** are where the disputes live: grid outages, curtailment, force majeure, owner-requested outages, scheduled maintenance windows (sometimes allowed at night only), defects that are the EPC contractor's warranty responsibility during the DNP, and lack of spares the owner was supposed to buy. Each must be defined, measured and evidenced.

Typical PV O&M availability guarantees: **98.5–99.5%**, measured monthly or annually.

### Bonus and malus`,
        },
        { kind: "equation", formula: "m09-om-malus" },
        {
          kind: "md",
          md: md`The **malus** pays the owner for revenue lost below the guarantee. It is normally capped (e.g. 50–100% of the annual O&M fee) because the contractor's margin is small relative to plant revenue: an uncapped malus would make O&M unbankable for the contractor. A **bonus** above a higher threshold (often shared 50/50 with the owner) rewards excellent performance. Persistent underperformance (e.g. availability below a floor for several consecutive periods) is a termination trigger.

### PR guarantees in O&M`,
        },
        { kind: "equation", formula: "m09-pr-definition" },
        {
          kind: "md",
          md: md`A PR guarantee makes the O&M contractor responsible for **output**, which captures cleaning and repair quality that availability misses (a dirty plant can be 100% "available"). Contractors resist it because PR also depends on **design** and **equipment** they did not choose. A fair PR guarantee:

- uses a **temperature-corrected PR** (IEC 61724-1) so hot years do not penalise the contractor;
- starts from a **baseline** measured at the EPC performance test, then declines by a contractual **degradation allowance** (e.g. 0.4–0.5%/yr for modules);
- excludes grid, curtailment, force majeure and EPC-warranty events;
- states the soiling assumption (the contractor controls cleaning frequency, so soiling losses above the assumption are its risk).

In IPPs the strongest performance protection is usually on availability, response times and cleaning KPIs, with the PR guarantee as a secondary check.

### BESS long-term service agreements

A BESS degrades with use: usable energy fades with **cycles**, **depth of discharge**, **average state of charge**, **C-rate** and **cell temperature**. An LTSA with the integrator or OEM (typically 10–20 years) guarantees:

| Guarantee | How measured | Remedy |
|---|---|---|
| **Usable energy (capacity)** at the POI, year by year | Annual capacity test: full charge then discharge at rated power, metered at POI | **Augmentation** (supplier adds modules/racks at its cost) or LDs per MWh shortfall |
| **Round-trip efficiency** (AC-AC at POI, including auxiliaries or not, as defined) | Test cycle | LDs per % shortfall |
| **Availability** | Time-based, per MW of power and per MWh of energy | Malus |
| **Response time / ramp** | Grid-service tests | Retest, LDs |`,
        },
        { kind: "equation", formula: "m09-bess-energy-guarantee" },
        {
          kind: "md",
          md: md`The guarantee is **conditional** on the owner staying within the operating envelope (e.g. ≤ 1 cycle/day average, SOC limits, ambient conditions, HVAC operated as specified). In Kuwait's 50 °C summers, the HVAC system's ability to hold cell temperature (around 25 °C) is central: if it fails, both fade and safety risk increase, and the supplier will argue the envelope was breached. Read who maintains the HVAC and fire-suppression systems and how temperature data are shared.

### Handover from EPC to O&M

At Taking-Over the plant moves from the EPC contractor's care to the owner's and the O&M contractor's. Handover must transfer: as-built drawings, O&M manuals, test records, settings files (protection relays, inverters, PPC), SCADA and cybersecurity credentials, spare parts and their lists, special tools, assigned OEM warranties, training records, and the punch list. During the **DNP** two contractors act on the same assets: the EPC remedies defects; the O&M contractor operates and maintains. An **interface agreement** (or clear provisions in both contracts) settles who diagnoses, who repairs, how downtime is classified for availability, and who holds which spares.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the DNP interface causes most early O&M disputes",
          md: md`If an inverter model has a serial defect, the EPC contractor wants to fix it slowly under warranty and the O&M contractor wants the downtime excluded from its availability. The owner loses energy either way. Without a contractual rule (e.g. "EPC-defect downtime is excluded from O&M availability but the EPC pays delay-to-repair LDs beyond X days"), the loss falls on the owner by default.`,
        },
        { kind: "sources", refs: ["m09-spe-om-guidelines", "m09-nrel-om-best-practices", "m09-iec-61724-1-2021"] },
      ],
    },
    {
      layer: "applied",
      title: "Availability, malus and BESS capacity in numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Energy-based availability and malus for one month",
          given: md`A 500 MWac PV plant exported **110,000 MWh** in a month. Modelled energy lost during unavailability attributable to the O&M contractor: **1,650 MWh**. Grid outages and curtailment were excluded (removed from both numerator and denominator). Guaranteed energy-based availability **99.0%**; malus at the tariff of **USD 15/MWh** (illustrative), capped at the monthly O&M fee of **USD 250,000**.`,
          steps: [
            {
              md: md`**Availability:** $A_E = \frac{110{,}000}{110{,}000 + 1{,}650} = \frac{110{,}000}{111{,}650} = 98.52\%$.`,
            },
            {
              md: md`**Shortfall energy:** $(A_g - A_E)(E_{\text{act}} + E_{\text{lost}}) = 0.99 \times 111{,}650 - 110{,}000 = 110{,}533.5 - 110{,}000 = 533.5$ MWh.`,
            },
            {
              md: md`**Malus:** $533.5 \times 15 = 8{,}002.5$ USD, well below the USD 250,000 cap.`,
            },
            {
              md: md`**Interpretation:** the guarantee allowed $0.01 \times 111{,}650 = 1{,}116.5$ MWh of losses; the contractor lost 1,650 MWh, so it pays for the excess 533.5 MWh.`,
            },
          ],
          result: md`Malus about USD 8,000. Small against revenue, which is why owners also use KPIs (response time, cleaning completion) and termination triggers for persistent underperformance, not just the malus.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Time-based inverter availability",
          given: md`The plant has **200 inverters** of equal rating. In a 31-day month the production window is 12 h/day, i.e. **372 h**. O&M-attributable inverter downtime totals **1,100 inverter-hours**. A 6-hour MEWRE grid outage took all inverters off line (**1,200 inverter-hours**, excluded). Guarantee **98.5%**.`,
          steps: [
            {
              md: md`Total inverter-hours $= 200 \times 372 = 74{,}400$. Excluded $= 1{,}200$, so the denominator is $74{,}400 - 1{,}200 = 73{,}200$.`,
            },
            {
              md: md`Numerator $= 73{,}200 - 1{,}100 = 72{,}100$; $A_t = 72{,}100 / 73{,}200 = 98.50\%$.`,
              hidden: true,
              check: { prompt: "Time-based availability", answer: 98.5, unit: "%", tolerance: { abs: 0.02 } },
            },
            {
              md: md`$A_t \approx 98.497\%$, a hair below 98.5%. Whether a malus applies depends on the rounding rule in the contract (e.g. "rounded to one decimal place" gives 98.5%, compliant).`,
            },
          ],
          result: md`About 98.50%. Contracts must state rounding, the irradiance threshold for the production window and how partial inverter derates count; otherwise a borderline month becomes a dispute.`,
        },
        { kind: "widget", widget: "bess-sizing", props: { mw: 250, hours: 4 }, caption: "Change cycles per year and fade rate to see how usable energy declines and when augmentation is needed to hold the guaranteed MWh." },
        {
          kind: "question",
          question: {
            id: "m09-l06-p1",
            type: "numeric",
            prompt: md`A BESS LTSA guarantees beginning-of-life usable energy of **1,000 MWh** at the POI with a fade allowance of **2% per year** (compounded). At the **year-5** capacity test the system delivers **880 MWh**. What is the shortfall against the guarantee, in MWh?`,
            answer: 23.92,
            unit: "MWh",
            tolerance: { abs: 0.1 },
            explanation: md`$E_g(5) = 1{,}000 \times 0.98^5 = 903.92$ MWh. Shortfall $= 903.92 - 880 = 23.92$ MWh. The supplier must augment by at least this (plus margin for the next year's fade) or pay LDs. Before accepting, check the owner stayed within the operating envelope (cycles, SOC, temperature), or the supplier will dispute it.`,
            concepts: ["m09.bess-ltsa"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running O&M contracts on a desert plant",
      blocks: [
        {
          kind: "md",
          md: md`**Who does what.** The SPV (or, for a MEWRE-owned plant, MEWRE's operations department) is the owner; the O&M contractor operates; OEMs provide LTSAs and warranties; the lenders' technical advisor reviews monthly O&M reports during the debt tenor. For an IPP, MEWRE sees O&M performance through the PPA: availability declarations, outage planning, grid code compliance and energy delivered.

**Tools.** SCADA and a monitoring platform computing availability and PR per IEC 61724-1, a computerised maintenance management system (CMMS) for work orders and spares, drone thermography, soiling stations, and a monthly report template agreed in the contract.

**Kuwait specifics.** Cleaning strategy is a commercial decision (soiling loss versus cleaning cost and water availability); heat-stress rules limit midday outdoor work in summer, affecting repair times; sandstorms trigger tracker stow and post-storm inspections; spare-part lead times and customs clearance need strategic stock on site.`,
        },
        { kind: "widget", widget: "soiling", caption: "Find the cleaning interval that balances soiling loss against cleaning cost: the basis for the cleaning KPI in the O&M contract." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- Availability exclusions vague ("events beyond the contractor's control"), so every outage is argued.
- Production-window threshold not defined; night-time "availability" inflates the figure.
- Malus cap so low that paying it is cheaper than fixing problems.
- Cleaning left to the contractor's discretion with no soiling KPI; PR drifts down while availability looks perfect.
- Spares handed over without a list or ownership; the O&M contractor uses EPC capital spares and nobody replenishes them.
- BESS HVAC maintained by a different contractor from the LTSA supplier; a capacity shortfall becomes a blame game.
- Handover without settings files and SCADA credentials; the O&M contractor cannot change a protection setting without the EPC.`,
        },
        {
          kind: "checklist",
          title: "PM checklist: O&M and LTSA contracts",
          items: [
            "Scope covers monitoring, preventive/corrective maintenance, cleaning, HV, spares, warranty management and reporting.",
            "Availability definition: formula, production window, exclusions, data source, rounding, measurement period.",
            "Malus and bonus rates, caps, and termination triggers for persistent underperformance.",
            "PR guarantee (if any): temperature correction, baseline, degradation allowance, soiling assumption, exclusions.",
            "Cleaning KPI and soiling monitoring; water source and method.",
            "Spares list, ownership, minimum stock levels and replenishment obligations.",
            "BESS LTSA: capacity curve, operating envelope, test procedure, augmentation obligations, RTE definition, HVAC responsibility, data access.",
            "Handover package and DNP interface agreement signed before Taking-Over.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the O&M contractor or BESS supplier",
          items: [
            "Which outages would you claim as excluded in a typical summer month, and how will you evidence them?",
            "What cleaning frequency and method do you plan for June–August, and what soiling loss does that imply?",
            "What strategic spares will you hold on site, and what are the lead times for the rest?",
            "What operating envelope does your BESS capacity guarantee assume (cycles, SOC window, cell temperature)?",
            "If a serial defect appears during the DNP, how will you work with the EPC contractor and how is the downtime counted?",
          ],
        },
        { kind: "scenario", scenario: "m09-s5" },
        {
          kind: "feynman",
          prompt:
            "Explain to an engineer new to operations why a PV plant can show 99.8% availability and still be losing money, and what the O&M contract should do about it.",
          keyPoints: [
            "Availability measures whether equipment is on line, not how much it produces.",
            "Soiling, degraded strings or wrong tracker angles reduce output without making units 'unavailable'.",
            "Energy-based availability, PR guarantees with soiling assumptions and cleaning KPIs capture output losses.",
            "Exclusions and data definitions must be tight so the metric reflects reality.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m09-l06-q1",
      type: "mcq",
      prompt: md`What is the main advantage of energy-based over time-based availability for the plant owner?`,
      options: [
        "It is easier to compute from SCADA",
        "It weights outages by the energy they cost, so the contractor prioritises repairs at high-irradiance times",
        "It never needs an exclusions list",
        "It always produces a higher availability figure",
      ],
      answer: 1,
      explanation: md`Energy-based availability aligns the contractor's incentive with revenue: an outage at noon in July costs far more than one at 07:00 in January. It needs an agreed model to estimate lost energy.`,
      concepts: ["m09.availability-guarantee"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m09-l06-q2",
      type: "numeric",
      prompt: md`In a month a plant exported **95,000 MWh**; contractor-attributable losses were **700 MWh**. The guarantee is **99.0%** energy-based availability with malus at **USD 15/MWh**. What malus is payable, in USD?`,
      answer: 0,
      unit: "USD",
      tolerance: { abs: 1 },
      explanation: md`$A_E = 95{,}000 / 95{,}700 = 99.27\%$, above 99.0%. Allowed losses $= 0.01 \times 95{,}700 = 957$ MWh > 700 MWh, so no malus. Depending on the contract, a bonus threshold (e.g. 99.5%) is also not reached.`,
      concepts: ["m09.availability-guarantee"],
      difficulty: 2,
    },
    {
      id: "m09-l06-q3",
      type: "multi",
      prompt: md`Which events are normally **excluded** from an O&M contractor's availability calculation? Select all that apply.`,
      options: [
        "MEWRE grid outages",
        "Curtailment instructions from the system operator",
        "Inverter faults caused by the O&M contractor's late filter replacement",
        "Owner-requested outages",
        "Force majeure events as defined",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Exclusions cover events outside the contractor's control (grid, curtailment, owner requests, force majeure). Faults caused by poor maintenance are exactly what the guarantee is meant to penalise.`,
      concepts: ["m09.availability-guarantee"],
      difficulty: 1,
    },
    {
      id: "m09-l06-q4",
      type: "mcq",
      prompt: md`Why are BESS capacity guarantees in an LTSA conditional on an "operating envelope"?`,
      options: [
        "Because suppliers never honour guarantees",
        "Because fade depends on cycles, depth of discharge, SOC, C-rate and cell temperature, which the owner's operation controls",
        "Because the envelope sets the tariff",
        "Because grid codes require it",
      ],
      answer: 1,
      explanation: md`The supplier can only guarantee degradation for a defined usage pattern. If the owner cycles harder, holds high SOC or lets cells run hot (e.g. HVAC failure in summer), fade accelerates. Owners must log the data to prove they stayed inside the envelope.`,
      concepts: ["m09.bess-ltsa"],
      difficulty: 2,
    },
    {
      id: "m09-l06-q5",
      type: "decision",
      prompt: md`You are the PM for a MEWRE-owned PV plant entering O&M. Taking-Over is in three weeks. The EPC contractor has not delivered protection settings files, SCADA admin credentials or the spares list. What do you do?`,
      options: [
        {
          text: "Make these deliverables conditions for Taking-Over (or list them as outstanding work with a short deadline and retention leverage), and get the O&M contractor to confirm the handover package before the TOC is issued.",
          score: 1,
          feedback: "Correct. After Taking-Over your leverage drops; the O&M contractor cannot operate safely or compete fairly for availability without these items.",
        },
        {
          text: "Issue the Taking-Over Certificate on time and chase the documents later.",
          score: 0.3,
          feedback: "Common and costly: once care passes to the Employer, the EPC contractor has less incentive and the O&M contractor will claim exclusions.",
        },
        {
          text: "Delay Taking-Over indefinitely until every punch item is closed.",
          score: 0.4,
          feedback: "Withholding a TOC for minor items can breach FIDIC Clause 10 (minor outstanding work should not prevent taking over). Focus on items that prevent safe operation.",
        },
      ],
      explanation: md`Handover deliverables that affect safe operation and contract measurement should be tied to Taking-Over or secured by retention; minor punch items can follow under the DNP.`,
      concepts: ["m09.epc-om-handover"],
      difficulty: 2,
    },
    {
      id: "m09-l06-q6",
      type: "short",
      prompt: md`Draft the key elements of a fair PR guarantee for a PV O&M contract in Kuwait.`,
      rubric: [
        "Temperature-corrected PR per IEC 61724-1.",
        "Baseline from the EPC performance test, with an annual degradation allowance.",
        "Exclusions for grid, curtailment, force majeure and EPC warranty defects.",
        "Explicit soiling assumption tied to the cleaning regime the contractor controls.",
        "Measurement period, data source, and malus/bonus with caps.",
      ],
      modelAnswer: md`Use a temperature-corrected PR (IEC 61724-1) measured annually from the plant's own pyranometers and revenue meter; baseline it at the EPC performance test result and reduce it each year by a contractual degradation allowance (e.g. 0.5%/yr); exclude grid outages, curtailment, force majeure and EPC-warranty defects during the DNP; state the soiling loss assumed for the agreed cleaning regime so excess soiling is the contractor's risk; set malus/bonus rates per 0.1 percentage point with caps, and define data filtering and uncertainty.`,
      explanation: md`A PR guarantee that ignores temperature, degradation or design limitations is either unfair to the contractor (and priced) or unenforceable in practice.`,
      concepts: ["m09.pr-guarantee"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "m09-l06-f1", front: "Time-based vs energy-based availability", back: "Time: capacity-weighted hours available in the production window. Energy: exported / (exported + contractor-attributable lost energy).", concepts: ["m09.availability-guarantee"] },
    { id: "m09-l06-f2", front: "Typical PV O&M availability guarantee", back: "98.5–99.5%, measured monthly or annually.", concepts: ["m09.availability-guarantee"] },
    { id: "m09-l06-f3", front: "Why cap the O&M malus?", back: "The O&M fee is small relative to plant revenue; an uncapped malus would make the contract unbankable for the contractor. Typical cap 50–100% of annual fee.", concepts: ["m09.availability-guarantee"] },
    { id: "m09-l06-f4", front: "Why contractors resist PR guarantees", back: "PR depends on design and equipment the O&M contractor did not choose; fair guarantees use temperature correction, a test baseline and degradation allowance.", concepts: ["m09.pr-guarantee"] },
    { id: "m09-l06-f5", front: "BESS augmentation", back: "Adding modules/racks over life to restore guaranteed usable energy as cells fade.", concepts: ["m09.bess-ltsa"] },
    { id: "m09-l06-f6", front: "Factors driving BESS capacity fade", back: "Cycles, depth of discharge, average SOC, C-rate and cell temperature.", concepts: ["m09.bess-ltsa"] },
    { id: "m09-l06-f7", front: "Key handover items at Taking-Over", back: "As-builts, O&M manuals, test records, settings files, SCADA credentials, spares and lists, special tools, assigned warranties, training, punch list.", concepts: ["m09.epc-om-handover"] },
    { id: "m09-l06-f8", front: "Shagaya PV testbed cleaning finding", back: "Soiling substantial; monthly water cleaning required (KISR-linked study, 2020).", concepts: ["m09.om-scope"] },
  ],
  scenarios: [
    {
      id: "m09-s5",
      title: "Serial inverter failures during the DNP",
      context: md`A MEWRE-owned 300 MW PV plant is in month 5 of a 24-month Defects Notification Period. The O&M contractor (separate from the EPC contractor) reports that 14 central inverters of one model have tripped repeatedly with IGBT failures in the June heat. Each failure takes 6–10 days to repair because the EPC contractor's OEM ships parts from abroad. July availability came out at 97.2% against a 99.0% guarantee.`,
      start: "a",
      concepts: ["m09.epc-om-handover", "m09.availability-guarantee", "m09.taking-over-defects"],
      nodes: {
        a: {
          md: md`The O&M contractor says all IGBT downtime should be excluded from its availability because it is an EPC defect. The EPC contractor says the failures are caused by the O&M contractor not replacing inverter air filters. What do you do first?`,
          choices: [
            {
              text: "Commission a joint root-cause investigation (EPC, OEM, O&M, Owner's Engineer) with data: inverter logs, temperatures, filter maintenance records; meanwhile give the EPC contractor a defects notice under Clause 11 to preserve MEWRE's rights.",
              next: "b",
              score: 10,
              feedback: "Correct: preserve contractual rights (11.1 notice), and get evidence before allocating blame. Both explanations are plausible in Kuwaiti dust and heat.",
            },
            {
              text: "Accept the O&M contractor's view and exclude all downtime.",
              next: "b",
              score: 3,
              feedback: "Premature: if the root cause is poor filter maintenance, MEWRE has just waived the O&M malus and has no claim against the EPC either.",
            },
            {
              text: "Apply the full malus to the O&M contractor and let them sort it out with the EPC.",
              next: "b",
              score: 3,
              feedback: "The O&M contractor has no contract with the EPC contractor. MEWRE sits between them and must resolve it.",
            },
          ],
        },
        b: {
          md: md`The investigation finds a design weakness: the inverter cooling is undersized for 50 °C ambient (a serial defect), worsened by filters cleaned every 8 weeks instead of the OEM's 4 weeks in summer. How do you allocate?`,
          choices: [
            {
              text: "EPC remedies the serial defect (upgraded cooling across all units of that model) and the DNP is extended for affected inverters (11.3); downtime is split: excluded for the O&M contractor where caused by the defect, but filter non-compliance is its responsibility going forward with a revised maintenance schedule.",
              next: "c",
              score: 10,
              feedback: "Balanced and evidence-based. Serial defects usually justify a fleet-wide fix, not unit-by-unit repairs.",
            },
            {
              text: "EPC pays for everything because it is a design defect.",
              next: "c",
              score: 6,
              feedback: "Mostly right on the defect, but ignores the O&M contractor's contribution and lets poor practice continue.",
            },
          ],
        },
        c: {
          md: md`To avoid repeating this on the next plant, what do you change in the contracts?`,
          choices: [
            {
              text: "Add a DNP interface agreement (diagnosis, repair times, spares held on site by the EPC, downtime classification, LDs for slow defect repair) and specify inverter thermal performance at 50 °C ambient with derating curves in the Employer's Requirements.",
              score: 10,
              feedback: "This closes both the contractual gap and the technical root cause.",
            },
            {
              text: "Use the same contracts; this was bad luck.",
              score: 1,
              feedback: "Serial defects and DNP interface disputes are predictable; the contracts should anticipate them.",
            },
          ],
        },
      },
    },
  ],
};

export default lesson;
