import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz11-l03",
  title: "Selling to IPP O&M teams in the Gulf: plant archetypes and the business case",
  summary:
    "Gulf GW-scale plants clean in three ways: robotic fleets (daily waterless robots at Al Ajban, about 1,430 dry robots at Noor Abu Dhabi, robots at Sudair and SAAD 2), periodic semi-automated cycles (every 4 days at Al Kharsaah) and legacy manual or water cleaning (Shagaya Phase I PV). Low Gulf tariffs make recovered MWh a thin argument, so the business case must be framed in the O&M team's own units: cleaning opex, robot fleet cost and availability, guarantee exposure and reporting to the owner.",
  minutes: 75,
  objectives: [
    "You can classify a Gulf PV plant into a cleaning archetype from public information and say which analytics function has value there",
    "You can compute the cleaning-opex saving from re-optimising a fixed cycle and the value of faster detection of missed cleaning",
    "You can explain why recovered energy at a Gulf IPP tariff is a weak lead argument and what to lead with instead",
    "You can write a one-page business case for an O&M manager in his KPIs",
  ],
  concepts: [
    {
      id: "mz11.cleaning-archetype",
      name: "Gulf cleaning archetypes",
      description:
        "Daily waterless robots (frequency fixed by design; value in fleet health, storm response and wear), periodic robotic or semi-automated cycles (value in interval and sequencing), and manual or water cleaning (value in interval, water and crews). The archetype decides what analytics can change.",
      competency: "mz-business",
      related: ["mz04.cleaning-technologies", "mz04.cost-structure", "mz11.om-kpis"],
    },
    {
      id: "mz11.thin-tariff",
      name: "Thin-tariff problem",
      description:
        "Gulf PV IPP tariffs are among the lowest in the world, so energy recovered at the tariff is worth little per MWh; analytics value must also come from O&M cost, guarantee exposure and the owner's reporting needs.",
      competency: "mz-business",
      related: ["mz04.value-of-soiled-mwh", "mz11.value-by-holder"],
    },
    {
      id: "mz11.om-kpis",
      name: "O&M team KPIs",
      description:
        "What an O&M contractor is paid and penalised on: availability, any PR guarantee, cleaning standard or frequency, opex within a fixed fee, HSE, water use and robot fleet availability. Analytics sells when it moves one of these.",
      competency: "mz-business",
      related: ["mz11.loss-holder", "mz04.cleaning-om-contract", "m13.kpi-scorecard"],
    },
    {
      id: "mz11.om-business-case",
      name: "O&M business case",
      description:
        "A one-page argument in the buyer's units: the KPI at risk, the baseline from their data, the mechanism, the annual value with stated assumptions, the cost, the risks and a pilot that tests the biggest assumption.",
      competency: "mz-business",
      related: ["fc04.quantified-pain", "fc03.value-quantification", "mz11.om-kpis"],
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "How the Gulf cleans, and what that leaves to optimise",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The first paying customers for Mizan's analytics are more likely to be O&M teams and asset managers at operating Gulf IPPs than Kuwaiti public bodies, simply because those plants exist and are run by teams with budgets. These are engineers who have already solved cleaning in their own way. If you pitch frequency optimisation to a plant with 3,000 robots cleaning every night, you lose the room in five minutes. Know the plant before the meeting.`,
        },
        {
          kind: "md",
          md: md`## Reported practice at Gulf GW-scale plants

| Plant | Capacity | Reported cleaning practice | Archetype |
|---|---|---|---|
| **Noor Abu Dhabi** (UAE) | 1.18 GW | 1,430 dry (waterless) robots across more than 3.3 million panels, no water | Daily robots (frequency per operator, not stated) |
| **Al Ajban** (UAE) | about 1.5 GW (capacity not confirmed) | About 3,000 SUNPURE robots, daily cleaning (Jan 2026) | Daily robots |
| **SAAD 2** (Saudi Arabia) | 1.1 GW | SUNPURE robots (Feb 2024) | Robots |
| **Sudair** (Saudi Arabia; ACWA Power, Badeel, SAPCO) | 1.5 GW | Bifacial on trackers, automated robotic cleaning, operated by NOMAC; waterless status not confirmed | Robots |
| **Al Kharsaah** (Qatar; TotalEnergies, Marubeni, QatarEnergy) | 800 MWp | Semi-automated cleaning of every module once every 4 days (pre-construction plans said robots) | Periodic semi-automated |
| **Al Dhafra** (UAE) | 2 GW | Not confirmed in sources found | Unknown |
| **Shagaya Phase I PV** (Kuwait) | 11.15 MW | Monthly water cleaning (RSER 2020) | Manual or water |

Two background facts frame the market. High-soiling UAE-type plants are reported to be cleaned about 40 to 45 times a year where cleaning is manual or periodic. New Gulf GW-scale plants mostly install waterless robots on trackers, often Chinese-supplied (SUNPURE, LEAPTING) or Israeli (Ecoppia, Airtouch, in the UAE after 2020), while small legacy plants still use water and trucks.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Reported cleaning cycles per year by practice",
          xKey: "plant",
          xLabel: "Plant or plant type",
          yLabel: "Cleaning cycles per year",
          series: [{ key: "cycles", label: "Cycles per year (reported or implied)" }],
          data: [
            { plant: "Al Ajban (daily robots)", cycles: 365 },
            { plant: "Al Kharsaah (every 4 days)", cycles: 91 },
            { plant: "UAE-type manual (40 to 45/yr)", cycles: 42 },
            { plant: "Shagaya PV (monthly water)", cycles: 12 },
          ],
          caption: "Implied from the reported practice: daily is 365, every 4 days is about 91, the UAE-type range is shown at its midpoint, monthly is 12. Thirty times more cycles at one plant than another means the decision being optimised is completely different.",
        },
        {
          kind: "md",
          md: md`## What analytics can change in each archetype

| Archetype | Decision that is still open | Analytics function | Value lands on |
|---|---|---|---|
| **Daily robots** | Is every row actually cleaned? Should robots run tonight (storm in progress, high wind, heavy dew that smears dust)? When is a wet or manual pass needed because dust has cemented? Can low-soiling nights be skipped to cut wear? | Row-level detection of missed cleaning and robot faults; weather-aware run and skip decisions; cementation flags | Robot fleet O&M (spares, labour), availability, robot warranty claims |
| **Periodic semi-automated or robotic** | Interval by season; sequencing across blocks; skipping a cycle when a storm is forecast | Interval and sequence optimisation; storm postponement | Cleaning opex, crews, water |
| **Manual or water** | Interval; water logistics; post-storm response | Interval optimisation; event-driven cleaning | Opex and water; at a state plant, fuel |

## The thin-tariff problem

Recent Gulf PV IPP tariffs were widely reported at award in the range of roughly USD 12 to 25 per MWh, among the lowest in the world. At USD 15/MWh, recovering 1,000 MWh is worth USD 15,000. That is why "you are losing X % to soiling" rarely moves an IPP: the energy is real, the money is small, and the plant has already bought robots to make it smaller. Three sources of value usually matter more to an O&M team:

1. **Cleaning and fleet opex.** Labour, water, trucks, robot spares and repairs, inside a fixed O&M fee. Every dollar saved is margin for the O&M contractor.
2. **Guarantee exposure.** Availability and any PR guarantee carry liquidated damages; credible soiling evidence decides disputes over corrections.
3. **Reporting.** Owners and lenders want a defensible soiling loss figure in monthly reports; an O&M team that can provide it looks better at renewal.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Tariffs and contract terms",
          md: md`The tariff range is standard knowledge from award announcements (for example Al Dhafra at about USD 13.5/MWh and Sudair at about USD 12.4/MWh), not from the research brief, and the winning Shagaya Zone 1 tariff was not found. Confirm each plant's tariff before quoting it. Whether a given Gulf O&M agreement fixes the cleaning frequency, sets a cleanliness standard or includes soiling in a PR guarantee is plant-specific and not public.`,
        },
        { kind: "equation", formula: "mz04-annual-cost" },
        { kind: "equation", formula: "mz04-flatness" },
        { kind: "equation", formula: "mz11-miss-loss" },
        {
          kind: "widget",
          widget: "soiling",
          caption: "Try a periodic plant: set the soiling rate to 0.4 %/day and the energy value to the plant's tariff, then compare the cost at a 4-day interval with the optimum. Then raise the soiling rate to the Qatar test-facility average of about 0.5 %/day (higher in winter) and see how the optimum moves.",
        },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Two business cases, two very different answers",
      blocks: [
        {
          kind: "worked",
          title: "Re-optimising a 4-day semi-automated cycle (illustrative)",
          mode: "worked",
          given: md`Illustrative plant of the periodic archetype, not data from any named plant: 800 MWp, clean output $E = 1{,}800{,}000$ MWh/yr, soiling rate $s = 0.4$ %/day, tariff $p = $ USD 16/MWh, cost of one full semi-automated cycle $C = $ USD 8,000 (labour, equipment, water if any). Contract cycle: every 4 days.`,
          steps: [
            { md: md`**Energy term per day of interval.** $pEs/2 = 16 \times 1{,}800{,}000 \times 0.004/2 = 57{,}600$ USD/yr per day. **Cleaning numerator.** $365C = 2{,}920{,}000$ USD.` },
            { md: md`**Cost today.** $J(4) = 2{,}920{,}000/4 + 57{,}600 \times 4 = 730{,}000 + 230{,}400 = 960{,}400$ USD/yr.` },
            { md: md`**Optimum.** $T^* = \sqrt{2{,}920{,}000/57{,}600} = \sqrt{50.69} = 7.12$ days. $J^* = 2\sqrt{57{,}600 \times 2{,}920{,}000} = 820{,}224$ USD/yr.` },
            { md: md`**Check with the flatness rule.** $k = 4/7.12 = 0.562$; $\tfrac12(k + 1/k) = \tfrac12(0.562 + 1.780) = 1.171$, so today's cost is about 17 % above the optimum: $820{,}224 \times 0.171 \approx 140{,}000$. Consistent.` },
            { md: md`**Saving and who gets it.** About USD 140k/yr, mostly in cleaning opex ($730{,}000 - 2{,}920{,}000/7.12 = 730{,}000 - 410{,}112 = 319{,}888$ less cleaning) offset by about USD 180k more soiling loss at the tariff. The opex saving accrues to whoever pays for cleaning; the extra soiling loss to the IPP. If the O&M contract fixes a 4-day cycle, only a variation signed by the owner unlocks it.` },
          ],
          result: md`A fixed 4-day cycle on this illustrative plant costs about USD 140k/yr more than a 7-day one, about USD 0.18k per MWp per year. The case is real but modest, and it splits between the O&M contractor (opex) and the IPP (energy), so the pitch must go to the owner with both numbers, or to the O&M contractor with a gain-share on the opex it saves.`,
        },
        {
          kind: "worked",
          title: "Your turn: faster detection of missed robot cleaning",
          mode: "faded",
          given: md`Illustrative daily-robot plant: 1,000 MWp, daily clean energy $e_d = 6.3$ MWh per MWp per day, soiling rate on an uncleaned row $s = 0.4$ %/day, tariff USD 14/MWh. Robot faults leave rows uncleaned for a total of 500 MWp-events per year. Today a fault is found after $D_0 = 10$ days on average (walk-downs and alarms); with row-level analytics after $D_1 = 2$ days.`,
          steps: [
            { md: md`Energy saved per MWp-event: $e_d\, s\, (D_0^2 - D_1^2)/2 = 6.3 \times 0.004 \times (100 - 4)/2$.`, hidden: true, check: { prompt: "Energy saved per MWp-event (MWh)", answer: 1.2096, unit: "MWh", tolerance: { rel: 0.01 } } },
            { md: md`Annual energy saved: $1.2096 \times 500$.`, hidden: true, check: { prompt: "Annual energy saved (MWh/yr)", answer: 604.8, unit: "MWh/yr", tolerance: { rel: 0.01 } } },
            { md: md`Annual value at tariff: $604.8 \times 14$.`, hidden: true, check: { prompt: "Annual value at tariff (USD/yr)", answer: 8467, unit: "USD/yr", tolerance: { rel: 0.01 } } },
            { md: md`About USD 8.5k/yr on a 1,000 MWp plant. Faster detection is worth having, but as an energy argument at a Gulf tariff it cannot carry a product. The same row-level data also tells the O&M team which robots fail repeatedly, which supports warranty claims against the robot vendor and spares planning. That is the argument to quantify with their numbers.` },
          ],
          result: md`About 600 MWh and USD 8.5k a year: too small to lead with. For daily-robot plants, lead with fleet O&M cost, warranty evidence and reporting, quantified from the buyer's own maintenance records.`,
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Getting into the O&M room and staying there",
      blocks: [
        {
          kind: "md",
          md: md`## Who is in the room

| Role | Cares about | What makes him say yes | What makes him block |
|---|---|---|---|
| **Plant manager** (O&M contractor) | Availability, HSE, staying within the fixed fee | Fewer callouts, less crew time, a clean monthly report | Anything that looks like the owner auditing him |
| **Performance engineer** | PR, loss attribution, data quality | Better loss breakdown than his spreadsheet; time saved | A black box he cannot check |
| **Asset manager** (owner) | Revenue, O&M cost at renewal, lender reporting | Portfolio view; leverage over the O&M contractor and robot vendor | Another tool with no clear owner |
| **Robot vendor** | Fleet uptime, warranty exposure | A partner that makes his robots look good | Data that supports warranty claims against him |
| **IT and OT security** | SCADA integrity, data leaving the site | Read-only exports, clear data flows, hosting in-region | Any write path into control systems |

Two dynamics are specific to Gulf IPPs. First, the O&M contractor is often an affiliate of the lead developer (NOMAC operates Sudair, for example), so the owner-versus-O&M tension is softer and the decision may sit at group level. Second, robot vendors often supply their own monitoring; position Mizan as independent of any one hardware vendor, which matters most to the owner.

## Data access and security

Ask for the least: a read-only historian or CSV export of inverter power, plane-of-array irradiance, module temperature, met data and the cleaning or robot logs. Never ask for write access to a SCADA or tracker controller in a first engagement; control functions such as stow come later and through the plant's own control hierarchy (see mz05). Critical-infrastructure cybersecurity controls apply in several Gulf states (in Saudi Arabia, the National Cybersecurity Authority publishes controls for operational technology); ask the security team which apply and design to them.`,
        },
        {
          kind: "checklist",
          title: "Before the first O&M meeting",
          items: [
            "Archetype: robots, periodic or manual? Robot vendor? Trackers or fixed tilt?",
            "Owner, O&M contractor (affiliate or third party), offtaker and reported tariff",
            "Public statements on cleaning practice and soiling (operator site, press, papers)",
            "Your hypothesis of the open decision and the KPI it moves",
            "A one-page example output on public or synthetic data, not on another customer's data",
            "A proposed data request that is read-only and small",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How O&M pitches fail",
          md: md`**Leading with recovered MWh at the tariff** (thin). **Pitching frequency to a daily-robot plant** (the decision does not exist). **Implying the O&M team is underperforming** in front of the owner (you just made the plant manager your blocker). **Ignoring the robot vendor's warranty** (skipping robot cycles may breach operating conditions: check before recommending it). **Asking for SCADA write access** (security says no, and remembers you).`,
        },
        { kind: "xref", to: "fc04-l02", note: "Founder Core: discovery and quantified pain. Use it to get the O&M team's own cleaning cost, fault and LD numbers." },
        { kind: "xref", to: "mz04-l05", note: "Mizan track: robot capex, availability and common-mode failure, which sit behind every daily-robot conversation." },
        {
          kind: "question",
          question: {
            id: "mz11-l03-p1",
            type: "short",
            prompt: md`Write the one-page business case you would leave with the O&M manager of an illustrative 800 MWp Gulf plant cleaned semi-automatically every 4 days (use the numbers of the worked example or your own, labelled illustrative). Structure: KPI at risk, baseline, mechanism, annual value split by who receives it, cost of Mizan's service, main risks, and the pilot that tests the biggest assumption.`,
            rubric: [
              "States the KPI in the O&M manager's terms (cleaning opex within the fixed fee, cleaning standard or frequency, availability) rather than national or energy value alone",
              "Shows the baseline and the arithmetic correctly (about USD 960k/yr at 4 days vs about USD 820k/yr at about 7 days for the worked numbers) with assumptions labelled",
              "Splits value between O&M opex and IPP energy and recognises that a contractual frequency needs the owner's agreement",
              "Proposes a service cost that is a modest share of the value and says why",
              "Names concrete risks (soiling seasonality, dew and cementation, contract terms, robot or crew constraints) and a pilot with a measurable criterion",
              "Uses no invented facts about a named plant",
            ],
            modelAnswer: md`**Cleaning interval review: 800 MWp plant (illustrative numbers)**

**KPI at risk.** Cleaning opex inside the fixed O&M fee, and meeting the cleaning standard the owner expects.

**Baseline.** Full cycle every 4 days at about USD 8,000 per cycle: about USD 730k/yr cleaning, plus soiling loss of about USD 230k/yr at USD 16/MWh and 0.4 %/day. Total about USD 960k/yr.

**Mechanism.** Interval set by season and soiling rate measured from your own inverter and irradiance data, with cycles postponed when a dust event is forecast within two days. At the illustrative average rate the optimum is about 7 days (USD 820k/yr).

**Value.** About USD 140k/yr in total: cleaning opex falls by about USD 320k/yr and soiling loss rises by about USD 180k/yr. The opex saving is yours; the energy cost is the owner's. Because the cycle is in the O&M contract, we propose to present both numbers to the owner together and agree a gain-share on the net saving.

**Cost.** Illustrative USD 30k/yr for the analytics service (about one fifth of the net saving).

**Risks.** Winter dew raises soiling (Qatar measurements show higher winter rates) so the interval must be seasonal, not fixed at 7 days; cemented dust may need a wet pass; crew and equipment scheduling may limit flexibility.

**Pilot.** Three months on two comparable blocks: one on the 4-day cycle, one on the recommended schedule. Success if the recommended block's combined cleaning cost plus soiling loss (measured by corrected PR against the control block) is at least 8 % lower, judged by your performance engineer.`,
            explanation: md`A good case is in the buyer's units, honest about who gains, and ends with a test the buyer controls.`,
            concepts: ["mz11.om-business-case", "mz11.om-kpis", "mz11.thin-tariff", "mz11.cleaning-archetype"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["mz11-r6", "mz11-r9", "mz11-r8", "mz11-r7", "mz11-r20", "mz11-r12"] },
      ],
    },
  ],
  quiz: [
    {
      id: "mz11-l03-q1",
      type: "mcq",
      prompt: md`Which reported practice applies to Al Kharsaah (Qatar)?`,
      options: ["Monthly water cleaning", "Semi-automated cleaning of every module once every 4 days", "Daily cleaning by about 3,000 SUNPURE robots", "No cleaning; anti-soiling coating only"],
      answer: 1,
      explanation: md`The operator reports semi-automated cleaning every 4 days. Daily SUNPURE robots are Al Ajban; monthly water cleaning is Shagaya PV.`,
      concepts: ["mz11.cleaning-archetype"],
      difficulty: 1,
    },
    {
      id: "mz11-l03-q2",
      type: "decision",
      prompt: md`You have a meeting with the O&M team of a plant with about 3,000 robots cleaning nightly. What do you lead with?`,
      options: [
        { text: "Optimal cleaning frequency from the square-root rule.", score: 0, feedback: "The frequency is fixed by design; the decision does not exist." },
        { text: "Row-level detection of missed cleaning and repeat robot faults, framed in fleet O&M cost and warranty evidence from their own records.", score: 1, feedback: "Right: that decision is open and lands on their budget." },
        { text: "The national fuel value of soiled energy.", score: 0.1, feedback: "That belongs to the offtaker, not the O&M team." },
        { text: "A general soiling dashboard showing percentage loss.", score: 0.4, feedback: "Useful context, but it does not change a decision or a cost for them." },
      ],
      explanation: md`Match the function to the archetype and the value to the buyer's KPI.`,
      concepts: ["mz11.cleaning-archetype", "mz11.om-kpis"],
      difficulty: 2,
    },
    {
      id: "mz11-l03-q3",
      type: "numeric",
      prompt: md`Illustrative periodic plant: $pEs/2 = 57{,}600$ USD/yr per day, $365C = 2{,}920{,}000$ USD. The contract fixes a 5-day cycle. What is the annual cost $J(5)$ in USD?`,
      answer: 872000,
      tolerance: { rel: 0.005 },
      unit: "USD/yr",
      explanation: md`$2{,}920{,}000/5 + 57{,}600 \times 5 = 584{,}000 + 288{,}000 = 872{,}000$ USD/yr, about USD 52k above the optimum of 820,224.`,
      concepts: ["mz11.om-business-case"],
      difficulty: 2,
    },
    {
      id: "mz11-l03-q4",
      type: "mcq",
      prompt: md`Halving the time to detect a missed cleaning row changes the energy lost per event by what factor?`,
      options: ["It halves it", "It cuts it to one quarter", "It cuts it to one eighth", "No change"],
      answer: 1,
      explanation: md`$\Delta E \propto D^2$, so $D/2$ gives one quarter of the loss.`,
      concepts: ["mz11.thin-tariff"],
      difficulty: 1,
    },
    {
      id: "mz11-l03-q5",
      type: "multi",
      prompt: md`Which are usually stronger value arguments than recovered MWh at the tariff for a Gulf O&M team? (Select all.)`,
      options: [
        "Cleaning and robot fleet opex inside the fixed O&M fee",
        "Evidence in availability or PR guarantee disputes",
        "Defensible soiling loss figures for owner and lender reports",
        "The offtaker's fuel saving",
      ],
      answer: [0, 1, 2],
      explanation: md`The fuel saving is real but accrues to the offtaker, not to the O&M team.`,
      concepts: ["mz11.thin-tariff", "mz11.om-kpis"],
      difficulty: 1,
    },
    {
      id: "mz11-l03-q6",
      type: "mcq",
      prompt: md`What data access should you ask for in a first engagement with a Gulf IPP?`,
      options: [
        "Write access to the tracker controllers to test stow",
        "A read-only historian or CSV export of power, irradiance, temperature, met and cleaning logs",
        "Full SCADA administrator credentials",
        "Nothing; use satellite data only",
      ],
      answer: 1,
      explanation: md`Read-only and small passes security review; control functions come later through the plant's own control hierarchy.`,
      concepts: ["mz11.om-business-case"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz11-l03-f1", front: "Three Gulf cleaning archetypes", back: "Daily waterless robots (Noor Abu Dhabi, Al Ajban); periodic robotic or semi-automated (Al Kharsaah every 4 days, Sudair robots); manual or water (Shagaya PV monthly).", concepts: ["mz11.cleaning-archetype"] },
    { id: "mz11-l03-f2", front: "Noor Abu Dhabi cleaning", back: "1.18 GW; 1,430 dry robots, more than 3.3 million panels, no water.", concepts: ["mz11.cleaning-archetype"] },
    { id: "mz11-l03-f3", front: "Thin-tariff problem", back: "At about USD 12 to 25/MWh, recovered energy is worth little; lead with opex, guarantees and reporting.", concepts: ["mz11.thin-tariff"] },
    { id: "mz11-l03-f4", front: "Illustrative 800 MWp, 4-day vs optimum", back: "J(4) about USD 960k/yr; T* about 7.1 days; J* about USD 820k/yr; saving about USD 140k/yr, split between opex and energy.", concepts: ["mz11.om-business-case"] },
    { id: "mz11-l03-f5", front: "Loss from an undetected missed row", back: md`$\Delta E = e_d P s D^2/2$: grows with the square of detection time.`, concepts: ["mz11.thin-tariff"] },
    { id: "mz11-l03-f6", front: "Who often blocks an analytics sale at a Gulf IPP", back: "The plant manager if it looks like an audit of him; the robot vendor if data supports warranty claims; OT security if you ask for write access.", concepts: ["mz11.om-kpis"] },
  ],
};

export default lesson;
