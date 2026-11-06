import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz06-l02",
  title: "Energy management systems for PV + BESS: dispatch, SoC, forecasting and revenue stacking",
  summary:
    "The EMS is the layer above the PPC that decides what the plant should do over the next hours: when to charge and discharge, how much state of charge and power to hold back for reserves, and how forecasts of PV and value drive the schedule. SoC bookkeeping and its failure modes, the margin test for energy shifting, rolling-horizon optimisation, PV forecasting in dust, revenue stacking and its conflicts, and what value means in Kuwait, where there is no wholesale market.",
  minutes: 85,
  objectives: [
    "You can separate EMS and PPC responsibilities by time scale and state who decides what.",
    "You can update state of charge with charge and discharge efficiencies and explain why BMS SoC drifts in LFP.",
    "You can compute the margin per MWh of energy shifting and the price at which shifting stops paying.",
    "You can write the structure of a rolling-horizon dispatch optimisation and name its constraints.",
    "You can explain revenue stacking, which services conflict, and how value is defined in a single-buyer system like Kuwait.",
  ],
  concepts: [
    {
      id: "mz06.ems-vs-ppc",
      name: "EMS versus PPC: the time-scale split",
      description:
        "The EMS plans minutes to days ahead (schedules, SoC targets, reserve commitments) and sends set-points to the PPC; the PPC executes in sub-seconds to seconds at the POI. Conflicts are resolved by the priority stack.",
      competency: "mz-control",
      related: ["mz06.ppc-loop", "mz06.priority-stack"],
    },
    {
      id: "mz06.soc-management",
      name: "State-of-charge management",
      description:
        "SoC bookkeeping with efficiencies, SoC operating window and reserves, recalibration against BMS drift (flat LFP voltage curve), thermal derating at high ambient and warranty throughput limits.",
      competency: "mz-control",
      related: ["m05.soc-dod", "m05.rte", "m05.warranty"],
    },
    {
      id: "mz06.dispatch-optimisation",
      name: "Rolling-horizon dispatch optimisation",
      description:
        "A linear or mixed-integer programme maximising value over 24 to 48 h subject to SoC dynamics, power, POI and reserve constraints, re-solved every interval as forecasts update (model predictive control).",
      competency: "mz-control",
      related: ["mz06.soc-management", "mz06.pv-forecasting"],
    },
    {
      id: "mz06.pv-forecasting",
      name: "PV forecasting for dispatch",
      description:
        "Forecasts by horizon (intraday nowcast from sky imagers and plant data, day-ahead from numerical weather prediction plus aerosol data). Dust events and soiling bias forecasts; errors drive reserve margins.",
      competency: "mz-control",
      related: ["mz06.dispatch-optimisation", "m02.soiling"],
    },
    {
      id: "mz06.revenue-stacking",
      name: "Revenue stacking",
      description:
        "Combining energy shifting, curtailment capture, capacity, frequency reserves, ramp smoothing and voltage support on one asset; power and energy commitments are mutually exclusive in the same interval.",
      competency: "mz-control",
      related: ["mz06.dispatch-optimisation", "m05.energy-shifting", "m05.frequency-response"],
    },
    {
      id: "mz06.single-buyer-value",
      name: "Value in a single-buyer system",
      description:
        "Without a wholesale market (Kuwait), BESS value is defined by the contract (capacity or tolling payments, availability) or by the offtaker's avoided cost: peak fuel, unserved load and curtailment avoided.",
      competency: "mz-control",
      related: ["mz06.revenue-stacking", "m00.displaced-fuel-value"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Deciding what the plant should do next",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`MEWRE has announced a BESS programme of the order of 1.5 GW and approved sites in 2026, and every large PV plant in Kuwait will eventually sit next to storage. The EMS is where the money in that storage is decided, and it is also the obvious home for forecasts that include dust and soiling, which is Mizan's core competence. To sell analytics into this layer, or to carry an EMS product into Kuwait through the distribution thread, you need to read a dispatch schedule, challenge its SoC assumptions and say what "revenue" even means when MEWRE is the only buyer.`,
        },
        {
          kind: "xref",
          to: "m05-l03",
          note: "Track 0 covers BESS use cases and sizing (evening peak, PV firming, frequency response). This lesson is about the software that operates the asset hour by hour.",
        },
        {
          kind: "xref",
          to: "m05-l02",
          note: "Power, energy, C-rate, DoD, round-trip efficiency, SoH and ageing are defined in Track 0.",
        },
        {
          kind: "md",
          md: md`### Time scales: who decides what

| Time scale | Layer | Decisions |
|---|---|---|
| ms | Inverter / PCS firmware, BMS | Current control, FRT, cell protection, contactor trips |
| 100 ms to s | PPC | P and Q at the POI, droop, ramp, voltage |
| 1 to 15 min | EMS real-time layer | Set-points to the PPC, SoC band, reserve allocation, curtailment capture |
| hours to 2 days | EMS scheduling layer | Charge and discharge plan, nominations to the offtaker, maintenance windows |
| weeks to years | Asset management | Augmentation, warranty throughput budget, contract renewals |

The EMS **does not** close fast loops. It writes a plan, gives the PPC a target, and re-plans as reality diverges. When the PPC must deviate (frequency event, TSO curtailment) the EMS sees the SoC consequence and re-plans.

### SoC bookkeeping`,
        },
        { kind: "equation", formula: "mz06-soc" },
        {
          kind: "md",
          md: md`Three practical complications:

- **Estimation drift.** The BMS estimates SoC by integrating current and correcting with voltage. LFP cells have a very flat voltage between about 20 and 90 % SoC, so the voltage correction is weak and the estimate drifts by several percent over days. EMSs schedule periodic **full charges to recalibrate** and keep margins at both ends; an EMS that assumes the BMS number is exact will either run out early in the evening peak or leave energy unused.
- **Heat.** At 50 °C ambient the HVAC works hard, auxiliary load rises, and the PCS or racks may derate power. The EMS must use a temperature-dependent power limit, not the nameplate.
- **Warranty throughput.** BESS warranties cap cycles or MWh throughput per year. The EMS needs a degradation cost per MWh so that marginal cycles are only used when they pay.

### The margin test for energy shifting`,
        },
        { kind: "equation", formula: "mz06-shift-margin" },
        {
          kind: "md",
          md: md`Energy that would otherwise be **curtailed** (above the POI limit, or curtailed by the control centre) has $p_c \approx 0$. That is why hybrids oversize PV relative to the POI: the BESS harvests the clipped midday energy almost for free.

### The optimisation

Modern EMSs solve a small optimisation every interval:`,
        },
        { kind: "equation", formula: "mz06-dispatch-objective" },
        {
          kind: "md",
          md: md`subject to, for every interval $t$:

$$SoC_{min} + \frac{E_{res}}{E_n} \le SoC_t \le SoC_{max}, \qquad 0 \le P_{c,t}, P_{d,t} \le P_{max}(T_{amb}) - C_{res}$$

$$P_{PV,t} - P_{c,t} + P_{d,t} \le P_{POI}, \qquad P_{c,t} \le P_{PV,t}\ \text{(if grid charging is not allowed)}$$

The reserve terms $C_{res}$ (power) and $E_{res}$ (energy) are where **revenue stacking** shows up: power held for frequency response cannot be sold as energy in the same interval. Only the first interval of the solution is executed; the problem is re-solved with fresh forecasts and the measured SoC. That is **model predictive control**.

### Forecasting

| Horizon | Inputs | Use |
|---|---|---|
| 0 to 30 min (nowcast) | Plant power, irradiance sensors, sky imagers, satellite | Ramp management, real-time reserve sizing |
| 1 to 6 h (intraday) | Satellite cloud and aerosol motion, plant data | Re-scheduling, evening SoC target |
| 1 to 2 days (day-ahead) | Numerical weather prediction, aerosol forecasts (dust), soiling state | Nominations, charge plan |

In Kuwait, clouds matter less than **dust**: a dust event cuts direct irradiance sharply, and accumulated soiling biases every forecast downward until the next cleaning. An EMS that uses a clean-panel forecast over-promises midday energy. A forecast that knows the plant's soiling state and the dust outlook is exactly the kind of input a soiling-analytics company can supply.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative summer dispatch: 360 MWac PV, 100 MW / 400 MWh BESS, 300 MW POI",
          xKey: "hour",
          xLabel: "Hour",
          yLabel: "MW (SoC in MWh)",
          series: [
            { key: "pv", label: "PV available (MW)" },
            { key: "bess", label: "BESS (+ discharge, - charge, MW)" },
            { key: "poi", label: "POI export (MW)" },
            { key: "soc", label: "Stored energy (MWh)" },
          ],
          data: [
            { hour: "00", pv: 0, bess: 0, poi: 0, soc: 1 },
            { hour: "02", pv: 0, bess: 0, poi: 0, soc: 1 },
            { hour: "04", pv: 0, bess: 0, poi: 0, soc: 1 },
            { hour: "06", pv: 10, bess: 0, poi: 10, soc: 1 },
            { hour: "07", pv: 60, bess: 0, poi: 60, soc: 1 },
            { hour: "08", pv: 140, bess: 0, poi: 140, soc: 1 },
            { hour: "09", pv: 220, bess: 0, poi: 220, soc: 1 },
            { hour: "10", pv: 290, bess: -60, poi: 230, soc: 57 },
            { hour: "11", pv: 340, bess: -100, poi: 240, soc: 151 },
            { hour: "12", pv: 360, bess: -100, poi: 260, soc: 245 },
            { hour: "13", pv: 360, bess: -100, poi: 260, soc: 339 },
            { hour: "14", pv: 340, bess: -60, poi: 280, soc: 396 },
            { hour: "15", pv: 290, bess: 0, poi: 290, soc: 396 },
            { hour: "16", pv: 220, bess: 0, poi: 220, soc: 396 },
            { hour: "17", pv: 130, bess: 0, poi: 130, soc: 396 },
            { hour: "18", pv: 40, bess: 70, poi: 110, soc: 321 },
            { hour: "19", pv: 0, bess: 100, poi: 100, soc: 215 },
            { hour: "20", pv: 0, bess: 100, poi: 100, soc: 109 },
            { hour: "21", pv: 0, bess: 100, poi: 100, soc: 2 },
            { hour: "22", pv: 0, bess: 0, poi: 0, soc: 2 },
          ],
          caption: "Hourly values, charge and discharge efficiency 0.94 each. The EMS charges 420 MWh between 10:00 and 15:00 (200 MWh of it above the 300 MW POI limit, otherwise curtailed) and delivers 370 MWh into the evening peak.",
        },
        {
          kind: "md",
          md: md`### Revenue stacking and its conflicts

| Service | Uses | Conflicts with |
|---|---|---|
| Energy shifting / peak support | Energy (MWh) and power in peak hours | Reserves in the same hours; warranty cycles |
| Curtailment capture (clipped PV) | Charging power at midday | Needs empty storage at midday |
| Capacity / availability payment | Guaranteed MW for N hours on call | Must keep SoC high before the window |
| Frequency reserve (FSM, fast response) | Power headroom both ways, small energy | Energy shifting at full power |
| Ramp smoothing | Power, very little energy | Same headroom as reserves |
| Voltage / reactive support | PCS MVA, no energy | Active power at full MVA |

**In Kuwait** there is no wholesale market or ancillary-services market. MEWRE is the single buyer and system operator, so "revenue" is whatever the contract pays (likely capacity or availability-based for an IPP-style BESS, if the programme follows Gulf practice) and "value" to the system is avoided peaking fuel, avoided load shedding in summer peaks and avoided PV curtailment. An EMS optimiser built for a merchant market (price arbitrage against a spot curve) needs a different objective here.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait BESS procurement model",
          md: md`The MEWRE programme (announced November 2025; sites at Al-Mutlaa and Jaber Al-Ahmad approved June 2026; first phase about 500 MW) is public, but the procurement and payment model (EPC owned by MEWRE, IPP with a capacity payment, or tolling) was not found in our research. Do not describe the revenue structure of Kuwaiti BESS projects as fact until the RFP is seen.`,
        },
        { kind: "sources", refs: ["mz06-r10", "mz06-r11"] },
        {
          kind: "widget",
          widget: "bess-sizing",
          props: { mw: 100, hours: 4 },
          caption: "A 100 MW / 400 MWh system: change cycles per year and fade, and see usable energy fall. The EMS's degradation cost per MWh is the price of each extra cycle on this curve.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Shifting value, reserves and SoC in numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Daily value of the dispatch in the chart",
          given: md`Illustrative values (not Kuwait tariffs): evening energy worth $p_d = 100$ USD/MWh (avoided peaking cost), midday energy exported at the POI worth 25 USD/MWh, curtailed energy worth 0. Degradation cost 10 USD/MWh delivered. From the chart: 420 MWh charged, of which 200 MWh above the POI limit; 370 MWh delivered.`,
          steps: [
            { md: md`Evening value delivered: $370 \times 100 = 37{,}000$ USD.` },
            { md: md`Opportunity cost of charging: 220 MWh would have been exported at 25 USD/MWh, so $220 \times 25 = 5{,}500$ USD; the other 200 MWh would have been curtailed, cost 0.` },
            { md: md`Degradation: $370 \times 10 = 3{,}700$ USD.` },
            { md: md`Net value: $37{,}000 - 5{,}500 - 3{,}700 = 27{,}800$ USD for the day.` },
          ],
          result: md`About USD 28k per day in this illustration. Almost half the charging energy was free because the plant is oversized relative to the POI. If the EMS had charged only from the grid-exportable midday energy, the margin per MWh would be lower, and if the forecast had over-estimated PV (dirty panels, dust), the battery would have entered the evening peak partly empty.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "When does shifting stop paying?",
          given: md`Illustrative: $p_d = 100$ USD/MWh, $p_c = 25$ USD/MWh, round-trip efficiency 0.88, degradation cost 10 USD/MWh delivered, 370 MWh delivered per day, 300 shifting days per year.`,
          steps: [
            {
              md: md`Margin: $m = 100 - 25/0.88 - 10 = 100 - 28.41 - 10 = 61.59$ USD/MWh.`,
              hidden: true,
              check: { prompt: "Margin per MWh delivered", answer: 61.59, unit: "USD/MWh", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Annual: $61.59 \times 370 \times 300 = 6.84$ m USD.`,
              hidden: true,
              check: { prompt: "Annual shifting margin", answer: 6.84, unit: "m USD", tolerance: { rel: 0.01 } },
            },
            { md: md`Break-even charging value: set $m = 0$, so $p_c = (p_d - c_{deg})\,\eta_{rt} = 90 \times 0.88 = 79.2$ USD/MWh.` },
          ],
          result: md`Shifting pays until midday energy is worth about 79 USD/MWh in this illustration. The degradation cost matters: at 30 USD/MWh the break-even falls to about 62. That is why an EMS carries a degradation cost and does not cycle just because the spread is positive.`,
        },
        {
          kind: "question",
          question: {
            id: "mz06-l02-p1",
            type: "numeric",
            prompt: md`A 200 MWh BESS sits at 20 % SoC. The EMS charges at 50 MW for 2 hours with a charge efficiency of 0.95. What is the SoC afterwards, in percent?`,
            answer: 67.5,
            unit: "%",
            tolerance: { abs: 0.3 },
            explanation: md`Energy stored: $50 \times 2 \times 0.95 = 95$ MWh, which is $95/200 = 47.5$ points. $20 + 47.5 = 67.5\,\%$.`,
            concepts: ["mz06.soc-management"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "EMS in practice: vendors, failure modes and Mizan's opening",
      blocks: [
        {
          kind: "md",
          md: md`### Who supplies the EMS and what they guard

The EMS normally comes with the BESS from the integrator, because the integrator carries the **performance and warranty guarantees** (capacity, round-trip efficiency, availability) and does not want a third party cycling the battery outside its limits. Independent EMS and trading-optimisation software exists, mostly for merchant markets. In a single-buyer system the EMS is simpler on the trading side and harder on the operational side (heat, dust, forecast quality, SoC accuracy at the start of the summer peak).

**Where a soiling and dust analytics company fits:** not as the EMS, but as a **forecast and availability input** to it: expected PV given the current soiling state, dust-event warnings with expected irradiance loss, and planned cleaning or stow windows. These improve the day-ahead charge plan and the evening SoC target, and they are measurable (forecast error before and after).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **SoC surprise in the evening peak**: BMS drift on LFP, no recalibration for weeks, battery empties 40 minutes early.
- **Clean-panel forecast**: day-ahead plan assumes clean modules; real output is 5 to 10 % lower after weeks without cleaning; midday charging falls short.
- **Reserve double-counting**: same MW sold as frequency headroom and scheduled for discharge.
- **Heat derate ignored**: 100 MW scheduled at 15:00 in August, PCS delivers 85 MW.
- **Warranty breach**: throughput cap exceeded by aggressive cycling; the integrator voids the capacity guarantee.
- **Black-box optimiser**: owner cannot explain to the offtaker why the battery was empty at 21:00.`,
        },
        {
          kind: "checklist",
          title: "Reviewing an EMS operating strategy",
          items: [
            "SoC window and reserves stated in MWh and in time, with the recalibration routine.",
            "Temperature-dependent power limits and auxiliary consumption included.",
            "Degradation cost per MWh and annual throughput budget versus warranty.",
            "Forecast source, horizon, update rate, and whether soiling state and dust outlook are included.",
            "Explicit priority between schedule, reserves and PPC commands.",
            "Logged reasons for every deviation from the day-ahead plan.",
          ],
        },
        {
          kind: "ask",
          title: "Questions for an EMS or BESS integrator",
          items: [
            "How do you correct BMS SoC drift on LFP, and how often does the system do a full calibration charge?",
            "Which PV forecast do you use, and does it include the plant's soiling state and aerosol forecasts?",
            "Can the EMS accept an external forecast or availability profile, and through which interface?",
            "How do you price degradation in dispatch, and how do you track throughput against the warranty?",
            "What objective function do you use when there is no market price, as in Kuwait?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz06-l02-p2",
            type: "short",
            prompt: md`Write the half-page **value hypothesis** Mizan would put to a BESS integrator or EMS vendor entering Kuwait: what soiling- and dust-aware forecast input Mizan provides to their EMS, how it changes dispatch, how the improvement will be measured in a pilot, and what you will not claim. Use labelled illustrative numbers.`,
            rubric: [
              "Defines the input precisely (soiling-adjusted PV forecast, dust-event warnings with expected irradiance loss, planned cleaning or stow windows) with horizon and update rate.",
              "Links it to a dispatch decision (day-ahead charge plan, evening SoC target, reserve margin) and the failure it prevents (empty battery at peak, over-nomination).",
              "Proposes a measurable metric (forecast error such as MAE or bias of day-ahead PV, shortfall MWh at peak) with a before/after or A/B design.",
              "Uses only labelled illustrative numbers and makes no claims of existing customers, pilots or results.",
              "Respects the integrator's warranty position: Mizan supplies inputs, the integrator's EMS keeps control.",
              "Notes the Kuwait context: single buyer, contract-defined value, procurement model still unknown.",
            ],
            modelAnswer: md`**Hypothesis.** Kuwait's PV output is biased downward by soiling between cleanings and cut sharply by dust events; an EMS planning on a clean-panel forecast over-nominates midday energy and under-fills storage before the evening peak. Mizan supplies a day-ahead and intraday PV forecast adjusted for the plant's measured soiling state, plus dust-event warnings (expected irradiance loss and timing) and planned cleaning windows, updated every 15 min, delivered through the EMS's external forecast interface. **Dispatch effect.** The EMS raises the charge plan or the evening SoC target when soiling or dust will cut midday PV, and widens the reserve margin on dust days. **Measurement.** Over a 3-month pilot, compare day-ahead PV forecast bias and mean absolute error with and without the soiling adjustment on the same plant (illustrative target: halve the bias from about 6 % to 3 %), and count evening-peak shortfall MWh against the plan. **What we do not claim.** We do not take control of the battery or change warranty limits; the integrator's EMS keeps every decision. All numbers here are illustrative; Mizan has no deployed results yet. **Kuwait context.** MEWRE is the single buyer, so value is set by the contract (availability or capacity terms) or avoided peaking cost; we will size the benefit once the programme's procurement model is public.`,
            explanation: md`A credible value hypothesis names the input, the decision it changes, the metric and the test design, and is honest about what is unproven. It also respects that the integrator, not Mizan, carries the battery guarantees.`,
            concepts: ["mz06.pv-forecasting", "mz06.dispatch-optimisation", "mz06.single-buyer-value"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor why a soiling analytics company has something to sell to battery operators, even though it does not make or control batteries.",
          keyPoints: [
            "The EMS plans charge and discharge from a PV forecast.",
            "Soiling and dust bias the forecast and cut midday PV in Kuwait.",
            "A biased forecast leaves the battery short at the evening peak or over-promises energy.",
            "A soiling-aware forecast is an input to the EMS, measurable by forecast error and peak shortfall.",
            "The integrator keeps control and warranty responsibility.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz06-l02-q1",
      type: "mcq",
      prompt: "Which decision belongs to the EMS rather than the PPC?",
      options: [
        "Injecting reactive power when POI voltage dips",
        "Holding the POI ramp within 10 %/min",
        "Setting tomorrow's evening SoC target given the PV and dust forecast",
        "Responding to a 49.6 Hz frequency excursion",
      ],
      answer: 2,
      explanation: md`The EMS plans minutes to days ahead. Voltage, ramp and frequency response are sub-second to second PPC functions.`,
      concepts: ["mz06.ems-vs-ppc"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz06-l02-q2",
      type: "numeric",
      prompt: md`Evening energy is worth 90 USD/MWh, charging energy 30 USD/MWh, round-trip efficiency 0.85, degradation cost 15 USD/MWh. What is the shifting margin per MWh delivered?`,
      answer: 39.71,
      unit: "USD/MWh",
      tolerance: { rel: 0.01 },
      explanation: md`$m = 90 - 30/0.85 - 15 = 90 - 35.29 - 15 = 39.71$ USD/MWh.`,
      concepts: ["mz06.revenue-stacking", "mz06.soc-management"],
      difficulty: 2,
    },
    {
      id: "mz06-l02-q3",
      type: "mcq",
      prompt: "Why does BMS state-of-charge estimation drift more on LFP than on NMC?",
      options: [
        "LFP cells self-discharge much faster.",
        "LFP's open-circuit voltage is very flat across most of the SoC range, so voltage-based correction is weak.",
        "LFP batteries have no current sensors.",
        "LFP cannot be fully charged.",
      ],
      answer: 1,
      explanation: md`Coulomb counting accumulates error; voltage is the usual correction, and LFP's flat curve gives little signal. Periodic full charges recalibrate.`,
      concepts: ["mz06.soc-management"],
      difficulty: 2,
    },
    {
      id: "mz06-l02-q4",
      type: "multi",
      prompt: "Which pairs of services compete for the same resource in the same interval?",
      options: [
        "Frequency reserve headroom and full-power energy discharge",
        "Midday curtailment capture and arriving at midday with a full battery",
        "Reactive support at night and active energy shifting at noon",
        "Capacity availability window and emptying the battery just before it",
      ],
      answer: [0, 1, 3],
      explanation: md`Reserves need spare power, curtailment capture needs empty storage, capacity windows need stored energy. Night-time Q uses PCS MVA when no active power is flowing, so it does not conflict with noon shifting.`,
      concepts: ["mz06.revenue-stacking"],
      difficulty: 2,
    },
    {
      id: "mz06-l02-q5",
      type: "order",
      prompt: "Order the steps of one model-predictive EMS cycle.",
      items: [
        "Read measured SoC, PV output and updated forecasts",
        "Solve the dispatch optimisation over the full horizon",
        "Send only the first interval's set-points to the PPC",
        "Wait for the next interval and repeat with new data",
      ],
      explanation: md`Rolling horizon: plan far, act near, re-plan. This absorbs forecast error and PPC deviations.`,
      concepts: ["mz06.dispatch-optimisation"],
      difficulty: 1,
    },
    {
      id: "mz06-l02-q6",
      type: "decision",
      prompt: md`Illustrative. A Kuwaiti stakeholder asks Mizan for "the annual arbitrage revenue" of a planned PV+BESS plant. What do you do?`,
      options: [
        { text: "Run an arbitrage model against a European spot price curve and present the result.", score: 0, feedback: "Kuwait has no wholesale market; foreign price curves produce a number with no meaning here." },
        { text: "Explain that value depends on the contract and on MEWRE's avoided costs, then show a range from labelled illustrative evening and midday values and the curtailment captured.", score: 1, feedback: "Honest and useful: it frames value correctly for a single-buyer system and gives the drivers." },
        { text: "Decline to answer until the RFP is published.", score: 0.3, feedback: "You can still help with drivers and ranges; refusing loses the conversation." },
      ],
      explanation: md`Without a market, value is contract-defined or avoided-cost-defined. Show drivers and ranges, labelled.`,
      concepts: ["mz06.single-buyer-value"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz06-l02-f1", front: "EMS vs PPC time scales", back: "EMS: minutes to days (plans, SoC targets, reserves). PPC: 100 ms to seconds at the POI.", concepts: ["mz06.ems-vs-ppc"] },
    { id: "mz06-l02-f2", front: "SoC update", back: md`$SoC_{t+1} = SoC_t + (\eta_c P_c - P_d/\eta_d)\Delta t / E_n$`, concepts: ["mz06.soc-management"] },
    { id: "mz06-l02-f3", front: "Shifting margin per MWh delivered", back: md`$m = p_d - p_c/\eta_{rt} - c_{deg}$; shift only if positive.`, concepts: ["mz06.revenue-stacking"] },
    { id: "mz06-l02-f4", front: "Model predictive control in an EMS", back: "Optimise over 24 to 48 h, execute the first interval, re-solve with new forecasts and measured SoC.", concepts: ["mz06.dispatch-optimisation"] },
    { id: "mz06-l02-f5", front: "Why hybrids oversize PV relative to the POI", back: "Energy above the POI limit is otherwise curtailed; the BESS charges from it at near-zero opportunity cost.", concepts: ["mz06.revenue-stacking"] },
    { id: "mz06-l02-f6", front: "Main forecast bias specific to Kuwait", back: "Soiling between cleanings and dust events, not clouds; clean-panel forecasts over-promise midday PV.", concepts: ["mz06.pv-forecasting"] },
    { id: "mz06-l02-f7", front: "What is BESS revenue in Kuwait?", back: "Contract-defined (structure not yet public) or valued at MEWRE's avoided peaking fuel, load shedding and curtailment; no wholesale market.", concepts: ["mz06.single-buyer-value"] },
  ],
};

export default lesson;
