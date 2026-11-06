import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz04-l05",
  title: "Robots as capex: payback, availability and failure",
  summary:
    "A robot fleet is an investment, not a cleaning schedule. Compute its payback and NPV, see how availability, repair time and fleet life move them, why common-mode failures dominate the risk (with the Shagaya cleaning-arm failure as a case and a natural experiment), and what an O&M or robot-as-a-service contract must contain.",
  minutes: 65,
  objectives: [
    "You can compute simple payback and NPV for a robot fleet against the manual optimum",
    "You can quantify the extra soiling loss from robot downtime and from a fleet-wide outage",
    "You can explain why a cleaning-system failure is both a cost and, for a researcher, a natural experiment",
    "You can list the clauses a robot supply, O&M or cleaning-as-a-service contract needs",
  ],
  concepts: [
    {
      id: "mz04.robot-payback",
      name: "Robot fleet payback and NPV",
      description: "Payback = capex / annual saving vs the manual optimum; NPV discounts savings over the fleet's (not the plant's) life. Fleet life and availability can flip the sign.",
      competency: "mz-cleaning",
      related: ["m10.payback", "m10.npv", "mz04.robot-breakeven"],
    },
    {
      id: "mz04.fleet-availability",
      name: "Fleet availability and repair time",
      description: "Extra loss from downtime ≈ (1 − A)·s·D/2: short repairs make random failures cheap; long repair times (spares from abroad) multiply the cost.",
      competency: "mz-cleaning",
      related: ["m12.availability", "m12.spares-strategy"],
    },
    {
      id: "mz04.common-mode-failure",
      name: "Common-mode cleaning failure",
      description: "A design, software or supply fault that stops the whole fleet: the plant soils from zero towards saturation; the exposure is valued at the owner's value of energy and capped only by a manual fallback.",
      competency: "mz-cleaning",
      related: ["m12.failure-modes"],
    },
    {
      id: "mz04.natural-experiment",
      name: "Cleaning outage as a natural experiment",
      description: "An unplanned period without cleaning (such as the 2018 to 2019 cleaning-arm failure at Shagaya) shows the uncleaned soiling trajectory, which can validate soiling-extraction methods against a known counterfactual.",
      competency: "mz-cleaning",
      related: ["mz04.lost-energy-integral"],
    },
    {
      id: "mz04.cleaning-om-contract",
      name: "Robot O&M and cleaning-as-a-service contracts",
      description: "Contracts that allocate robot performance risk: availability guarantee, cleaning-quality KPI (post-clean soiling ratio), response and repair times, spares, manual fallback, liquidated damages at the value of lost energy, data ownership.",
      competency: "mz-cleaning",
      related: ["m09.om-scope", "m09.availability-guarantee"],
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "The fleet as an asset",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`If Mizan distributes cleaning robots in Kuwait, every sale is a capex decision for the buyer, and the first questions will be payback, what happens when robots break, and who pays. The Shagaya cleaning-arm failure is also the most concrete case you have: it shows what a failure costs and, because KISR is the methodology partner for the targeted pilot, it is the natural experiment the pilot can validate against.`,
        },
        { kind: "xref", to: "m10-l01", note: "Track 0: NPV, IRR, payback and discounting. This lesson applies them to a cleaning fleet." },
        {
          kind: "md",
          md: md`## Payback and NPV

The annual saving of a robot fleet is the manual optimum it replaces minus what the robots still cost to run:

$$\Delta S = J^{*}_{\text{manual}} - O - pE\,\bar L_{\text{robot}}$$`,
        },
        { kind: "equation", formula: "mz04-payback-npv" },
        {
          kind: "md",
          md: md`Three things make robot cases more fragile than they look:

1. **Fleet life is not plant life.** Brushes, batteries, drive trains and electronics live on hot glass in sand. A ten-year fleet on a thirty-year plant needs a replacement decision, and if the real life is seven years the NPV can turn negative (worked example below).
2. **The value of energy decides the saving** (lesson 3). Payback computed at the state's fuel value is meaningless to an IPP paid a tariff, and the reverse.
3. **Availability is not a percentage, it is a cost.** A robot that does not run leaves its rows to soil.

## Availability and repair time

If the fleet is available a share $A$ of robot-days, and a failed robot's rows wait $D$ days to be cleaned again (repair, spare part, or manual fallback), the rows it serves soil linearly during the outage, averaging $sD/2$:`,
        },
        { kind: "equation", formula: "mz04-availability-loss" },
        {
          kind: "md",
          md: md`| Case | $A$ | $D$ | Extra average loss | Value at USD 15/MWh (500 MWp) | Value at USD 85/MWh |
|---|---|---|---|---|---|
| Good local support | 0.95 | 20 days | 0.2 % | USD 30k/yr | USD 170k/yr |
| Spares shipped from abroad | 0.90 | 60 days | 1.2 % | USD 180k/yr | USD 1.02 m/yr |

The repair time $D$ enters twice: it lowers availability and it lengthens each outage. **Local spares and a manual fallback are worth more than a slightly better robot.**

## Common-mode failure

Random failures hit a few rows at a time. A **common-mode** failure (a software update, a design flaw in the drive or docking, a battery recall, the vendor leaving the market) stops the whole fleet. The plant then soils from zero:

- For 60 days at 0.4 %/day without fallback, the average loss over the outage is 12 %: about 19,700 MWh on the 500 MWp plant, **USD 0.30 m at the tariff or USD 1.68 m at the fuel value**.
- With a pre-agreed manual fallback (crews mobilised within days), the exposure is capped near the manual-cleaning cost for the period.

## Case: the Shagaya cleaning-arm failure (2018 to 2019)

At Shagaya a cleaning arm failed in 2018 to 2019, interrupting automated cleaning. For an operator this is a pure cost: energy lost while the system was down, plus repair. For a researcher it is something rarer: a **natural experiment**. During normal operation, soiling is cut short by every cleaning, so its uncleaned trajectory is never observed. A long unplanned outage shows how soiling evolves without cleaning (growth rate, saturation, response to storms and rain) and gives a known "no-cleaning" counterfactual against which soiling-extraction methods (SRR and change-point methods) can be tested.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Facts to confirm with KISR",
          md: md`Which system the cleaning arm served (the PV plant, a test array or another section), which rows were affected, the exact dates and duration of the outage, whether the plant was cleaned manually in the meantime, and whether data from that period are available, must all be confirmed from KISR's records before the case is used in any proposal or paper. The RSER 2020 paper reports monthly water cleaning at the PV plant; how that fits with an automated arm is also to be clarified. Do not quote a cost for the failure.`,
        },
        {
          kind: "md",
          md: md`**Order-of-magnitude method (illustrative, not Shagaya data).** A 10 MWp plant at 2,000 kWh/kWp left uncleaned for 90 days at 0.4 %/day, with loss saturating at 25 %: saturation is reached on day 62.5, the average loss over the outage is $(0.4 \times 62.5^2/2 + 25 \times 27.5)/90 = 16.3$ %, energy lost $\approx 20{,}000 \times 90/365 \times 0.163 \approx 800$ MWh, worth about USD 68k at USD 85/MWh. Small in money for a 10 MW plant; large in information, because the same trajectory scaled to a GW plant is worth millions, and the data are what the pilot needs.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Cumulative cash flow of a robot fleet (illustrative 500 MWp, IPP value)",
          xKey: "year",
          xLabel: "Year",
          yLabel: "USD m (undiscounted, cumulative)",
          series: [
            { key: "base", label: "Base: A = 0.95, D = 20 days" },
            { key: "weak", label: "Weak support: A = 0.90, D = 60 days" },
          ],
          data: [
            { year: 0, base: -6.0, weak: -6.0 },
            { year: 1, base: -4.87, weak: -5.05 },
            { year: 2, base: -3.73, weak: -4.09 },
            { year: 3, base: -2.6, weak: -3.14 },
            { year: 4, base: -1.47, weak: -2.19 },
            { year: 5, base: -0.34, weak: -1.24 },
            { year: 6, base: 0.79, weak: -0.29 },
            { year: 7, base: 1.93, weak: 0.67 },
            { year: 8, base: 3.06, weak: 1.62 },
            { year: 9, base: 4.19, weak: 2.57 },
            { year: 10, base: 5.33, weak: 3.53 },
          ],
          caption: "Capex USD 6 m (USD 12k/MWp), saving USD 1.13 m/yr in the base case (availability loss already inside the 1 % residual assumption) and USD 0.95 m/yr with weak support. A seven-year fleet life ends the base line at USD 1.9 m undiscounted, which is negative after discounting at 8 %.",
        },
        { kind: "sources", refs: ["mz04-r2", "mz04-r6", "mz04-r14", "mz04-r16"] },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Is the fleet worth buying?",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Payback and NPV for a low-capex fleet",
          given: md`Lesson 1 plant, IPP value USD 15/MWh. Manual optimum $J^*$ = USD 1.812 m/yr. Robot quote (illustrative, large-order Chinese supply): USD 12,000/MWp, so $K$ = USD 6.0 m. O&M $O$ = USD 0.5 m/yr. Average loss under robots 1.2 % (0.2 % daily sawtooth plus 1.0 % residual and downtime). Discount rate 8 %, fleet life 10 years.`,
          steps: [
            { md: md`Loss under robots: $15 \times 10^6 \times 0.012 =$ USD 0.18 m/yr.` },
            { md: md`Saving: $\Delta S = 1.812 - 0.5 - 0.18 =$ USD 1.132 m/yr.` },
            { md: md`Simple payback: $6.0/1.132 = 5.3$ years.` },
            { md: md`Annuity factor (8 %, 10 years) $= (1 - 1.08^{-10})/0.08 = 6.710$. NPV $= -6.0 + 1.132 \times 6.710 =$ **USD +1.60 m**.` },
            { md: md`Break-even capex at this value (lesson 3): USD 15.2k/MWp. The quote at USD 12k/MWp is 21 % below it: a positive but not large margin.` },
          ],
          result: md`At USD 12k/MWp the fleet pays back in about 5 years and adds USD 1.6 m of NPV for the IPP over 10 years. The margin is thin enough that fleet life and support quality decide whether it is a good investment.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Stress test: shorter life and weak support",
          given: md`Same fleet. Test (a) a 7-year fleet life with base savings, and (b) a 10-year life with weak support: availability 0.90 and repair time 60 days instead of the base.`,
          steps: [
            { md: md`(a) Annuity factor (8 %, 7 years) $= (1 - 1.08^{-7})/0.08 = 5.206$.` },
            {
              md: md`NPV $= -6.0 + 1.132 \times 5.206 = -0.106$ USD m: slightly negative.`,
              hidden: true,
              check: { prompt: "NPV with a 7-year fleet life", answer: -0.106, unit: "USD m", tolerance: { abs: 0.02 } },
            },
            { md: md`(b) Extra loss vs base: weak support gives $(1 - 0.90) \times 0.004 \times 60/2 = 1.2$ % against 0.2 % in the base, so 1.0 point more: $0.010 \times 10^6 \times 15 =$ USD 0.18 m/yr less saving. $\Delta S = 1.132 - 0.18 = 0.952$ m.` },
            {
              md: md`NPV $= -6.0 + 0.952 \times 6.710 = +0.39$ USD m; payback $6.0/0.952 = 6.3$ years.`,
              hidden: true,
              check: { prompt: "NPV with weak support over 10 years", answer: 0.388, unit: "USD m", tolerance: { abs: 0.02 } },
            },
          ],
          result: md`Either a shorter life or weak local support wipes out most of the NPV. The contract (life and availability guarantees, local spares, fallback) is worth as much as the price.`,
        },
        {
          kind: "question",
          question: {
            id: "mz04-l05-p1",
            type: "numeric",
            prompt: md`A robot fleet goes down plant-wide for 45 days with no manual fallback. Soiling rate 0.5 %/day, starting from clean, no saturation. Clean annual energy 600,000 MWh. Value of energy USD 85/MWh. What is the value of energy lost during the outage, in USD m?`,
            answer: 0.707,
            tolerance: { rel: 0.02 },
            unit: "USD m",
            explanation: md`Lost energy $= E_d\,s\,D^2/2 = 1{,}643.8 \times 0.005 \times 45^2/2 = 8{,}322$ MWh (equivalently, average loss $sD/2 = 11.25$ % of the $73{,}973$ MWh the plant would make in 45 days). Value $= 8{,}322 \times 85 =$ USD 0.71 m. On top, the plant ends the outage at 22.5 % loss and needs an immediate cleaning.`,
            concepts: ["mz04.common-mode-failure"],
            difficulty: 2,
          },
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Buying, contracting and running a robot fleet",
      blocks: [
        {
          kind: "md",
          md: md`**Failure modes to ask about** (generic; ask each vendor for Gulf field data):

| Subsystem | Typical failure | Desert aggravator |
|---|---|---|
| Brushes, microfibre | Wear, loss of contact pressure, abrasion of the glass coating | Sand abrasion; cemented dust |
| Drive train, wheels, bearings | Seizure, slippage, misalignment on rows | Sand ingress, thermal expansion of rails and frames |
| Battery and charging panel | Capacity fade, failure to charge | High temperature; soiled charging panel |
| Docking and row transfer | Robot stranded mid-row or at row end | Tracker angle mismatch, gaps, uneven rows |
| Control and communications | Missed cycles, firmware faults, lost connectivity | Heat in enclosures; a bad update hits every robot (common mode) |
| Module interaction | Microcracks or broken glass from weight or impacts | Hot glass is under thermal stress |

**Contract structures.**

- **Supply plus O&M by the vendor**: the owner buys the fleet; the vendor guarantees availability and cleaning quality for a period.
- **Cleaning as a service**: the vendor owns the robots and charges per MWp per year. Capex risk moves to the vendor, but the price includes its risk premium and financing cost, and the owner depends on the vendor staying in the market.
- **Plant O&M contractor owns cleaning**: robots inside the main O&M scope; check that the O&M performance regime actually rewards cleaning (lesson 2: availability guarantees do not see soiling).`,
        },
        { kind: "xref", to: "m09-l06", note: "Track 0: O&M contract structure, availability and PR guarantees, and how performance regimes allocate risk. The clauses below are the cleaning-specific additions." },
        {
          kind: "checklist",
          title: "Clauses a robot O&M or cleaning-as-a-service contract needs",
          items: [
            "Fleet availability guarantee defined per robot-day, with exclusions listed (storms, grid outages, tracker faults)",
            "Cleaning-quality KPI: soiling ratio after cleaning, measured on reference devices, by zone",
            "Response time and maximum repair time D; local spares stock list",
            "Manual fallback at the vendor's cost when D is exceeded or a common-mode failure occurs",
            "Liquidated damages for missed cycles priced at the owner's value of lost energy, with a cap",
            "Module manufacturer approval of the robot, brush and cleaning method; liability for glass damage",
            "Firmware update procedure: staged rollout, rollback, notice period",
            "Data ownership and access: cleaning logs, robot telemetry, soiling measurements",
            "End of life, replacement of brushes and batteries, and step-in rights if the vendor exits",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`1. **Payback computed on a vendor's soiling assumption** rather than measured site data. 2. **Fleet life assumed equal to plant life.** 3. **No manual fallback**, so a common-mode failure runs for months. 4. **Availability measured by the vendor's own software** without independent verification. 5. **Firmware pushed to all robots at once.** 6. **LDs priced at the IPP tariff on a state plant**, which under-penalises missed cycles.`,
        },
        {
          kind: "ask",
          title: "Questions for a robot vendor or service provider",
          items: [
            "What was the measured fleet availability last summer at your hottest Gulf site, and what failed most?",
            "How many spares do you hold in-country, and what is your guaranteed repair time?",
            "Have you ever had a fleet-wide fault, and how long did it take to restore cleaning?",
            "Which module manufacturers have approved your robot in writing?",
            "How do you roll out firmware updates, and can we hold back part of the fleet?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz04-l05-p2",
            type: "short",
            prompt: md`Write the half-page proposal paragraph in which Mizan asks KISR for access to data from the 2018 to 2019 Shagaya cleaning-arm failure period, for the targeted soiling analytics pilot. Explain why the data are valuable, what you would do with them, what you need from KISR, and how the result benefits KISR.`,
            rubric: [
              "Explains the natural-experiment logic: an unplanned no-cleaning period reveals the uncleaned soiling trajectory and gives a counterfactual for validating soiling extraction",
              "Specifies the analysis (e.g. SRR or change-point extraction on operational data compared with the outage period, temperature-corrected PR to IEC 61724 as baseline)",
              "Lists the facts and data to confirm and request (system affected, rows, dates, manual cleaning in between, data availability and resolution)",
              "States benefits to KISR: validated method, co-authored publication, better cleaning decisions for a state-owned plant valued at fuel",
              "Describes the pilot as targeted or in preparation, does not claim a signed pilot, results or a cost of the failure",
            ],
            modelAnswer: md`**Request: data from the 2018 to 2019 cleaning-arm outage.** The pilot we are preparing with KISR aims to turn Shagaya's operational data into cleaning decisions, and KISR has confirmed there is no standard method for this. The hardest part of any such method is validation: during normal operation every cleaning cuts the soiling curve short, so we never observe what the plant would have done without it. The cleaning-arm failure in 2018 to 2019 is a rare exception, a natural experiment in which part of the plant soiled without cleaning. We propose to (1) build the temperature-corrected performance ratio to IEC 61724 for the affected and unaffected sections, (2) extract soiling rates and cleaning events with the SRR and change-point methods, and (3) test whether the methods recover the uncleaned trajectory (rate, saturation, storm and rain responses) observed during the outage. To do this we ask KISR to confirm which system and rows were affected, the exact dates, whether any manual cleaning took place, and to share the inverter, string and meteorological data for that period at the best available resolution. For KISR the result is a validated, publishable method (co-authored, building on the 2020 RSER performance paper), and cleaning decisions for a state-owned plant valued at the fuel it displaces. No cost of the failure will be claimed; the data are used for method validation only.`,
            explanation: md`A good request is specific about the science (why an outage is a counterfactual), the analysis, the exact facts to confirm and the mutual benefit, and is careful not to overstate the pilot's status.`,
            concepts: ["mz04.natural-experiment", "mz04.common-mode-failure"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz04-l05-q1",
      type: "numeric",
      prompt: md`A fleet costs USD 4.0 m and saves USD 0.8 m/yr. What is the simple payback in years?`,
      answer: 5,
      tolerance: { abs: 0.05 },
      unit: "years",
      explanation: md`$4.0/0.8 = 5$ years. Check the fleet's life: if it is 7 years, the NPV at 8 % is $-4.0 + 0.8 \times 5.206 = +0.16$ m, barely positive.`,
      concepts: ["mz04.robot-payback"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz04-l05-q2",
      type: "numeric",
      prompt: md`Fleet availability 0.92, mean outage until the row is cleaned again 30 days, soiling rate 0.5 %/day. What is the extra average soiling loss in percentage points?`,
      answer: 0.6,
      tolerance: { abs: 0.02 },
      unit: "% points",
      explanation: md`$(1 - 0.92) \times 0.005 \times 30/2 = 0.08 \times 0.075 = 0.006$, i.e. 0.6 points. Halving the outage to 15 days halves it (and improves availability too).`,
      concepts: ["mz04.fleet-availability"],
      difficulty: 2,
    },
    {
      id: "mz04-l05-q3",
      type: "mcq",
      prompt: md`Why is a common-mode failure the dominant risk for a robot fleet?`,
      options: [
        "Because it is the most frequent failure",
        "Because it stops every robot at once, so the whole plant soils from clean towards saturation until a fallback starts",
        "Because it voids the module warranty",
        "Because it affects only the docking stations",
      ],
      answer: 1,
      explanation: md`Random failures affect a few rows; a common-mode failure exposes the whole plant's output, valued at the owner's value of energy, for the full outage.`,
      concepts: ["mz04.common-mode-failure"],
      difficulty: 1,
    },
    {
      id: "mz04-l05-q4",
      type: "mcq",
      prompt: md`Why is an unplanned cleaning outage valuable to a soiling researcher?`,
      options: [
        "It increases plant revenue",
        "It reveals the uncleaned soiling trajectory, a counterfactual that normal operation never shows",
        "It proves the cleaning system was unnecessary",
        "It removes the need for a soiling station",
      ],
      answer: 1,
      explanation: md`Every planned cleaning truncates the soiling curve; an outage shows growth, saturation and event responses, and lets extraction methods be tested against a known no-cleaning period.`,
      concepts: ["mz04.natural-experiment"],
      difficulty: 1,
    },
    {
      id: "mz04-l05-q5",
      type: "multi",
      prompt: md`Which clauses limit the owner's exposure to a fleet-wide robot failure? (Select all.)`,
      options: [
        "Manual fallback at the vendor's cost when repair time is exceeded",
        "Staged firmware rollout with rollback",
        "Liquidated damages for missed cycles at the owner's value of energy",
        "A longer payment term for the robots",
        "Step-in rights if the vendor exits the market",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Fallback caps the duration, staged updates prevent a software common mode, LDs price the exposure, step-in rights cover vendor exit. Payment terms affect cash, not exposure.`,
      concepts: ["mz04.cleaning-om-contract", "mz04.common-mode-failure"],
      difficulty: 2,
    },
    {
      id: "mz04-l05-q6",
      type: "decision",
      prompt: md`Two robot offers for the same plant: A at USD 11k/MWp, spares shipped from abroad, no fallback clause; B at USD 13k/MWp, local spares, 10-day repair guarantee and vendor-paid manual fallback. Break-even capex is USD 15k/MWp. Which do you recommend?`,
      options: [
        { text: "A: it is cheaper and below break-even", score: 0.3, feedback: "The price advantage (USD 1 m on 500 MWp) can be erased by weak support: USD 0.18 m/yr of extra loss in the lesson's stress test, plus unbounded common-mode exposure." },
        { text: "B: the support terms protect the savings and cap the common-mode risk", score: 1, feedback: "Repair time and fallback drive the real saving; B is the better investment despite the higher price." },
        { text: "Neither: buy manual crews", score: 0.2, feedback: "Both offers are below break-even; rejecting robots outright ignores a positive NPV." },
      ],
      explanation: md`Compare offers on annualised cost including expected downtime loss and tail risk, not on price per MWp alone.`,
      concepts: ["mz04.fleet-availability", "mz04.cleaning-om-contract"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz04-l05-f1", front: "Annual saving of a robot fleet", back: md`$\Delta S = J^*_{\text{manual}} - O - pE\bar L_{\text{robot}}$`, concepts: ["mz04.robot-payback"] },
    { id: "mz04-l05-f2", front: "Extra loss from robot downtime", back: md`$\Delta\bar L \approx (1 - A)\,sD/2$; repair time D enters twice.`, concepts: ["mz04.fleet-availability"] },
    { id: "mz04-l05-f3", front: "Fleet-wide outage loss (no fallback, linear)", back: md`$E_d\,s\,D^2/2$; 500 MWp, 60 days at 0.4 %/day: about 19,700 MWh.`, concepts: ["mz04.common-mode-failure"] },
    { id: "mz04-l05-f4", front: "Shagaya cleaning-arm failure", back: "2018 to 2019; a cost for the operator, a natural experiment for validating soiling extraction. Details to confirm with KISR.", concepts: ["mz04.natural-experiment"] },
    { id: "mz04-l05-f5", front: "Illustrative fleet case (500 MWp, USD 12k/MWp)", back: "Saving USD 1.13 m/yr, payback 5.3 years, NPV +1.6 m at 8 %/10 years; 7-year life gives NPV about −0.1 m.", concepts: ["mz04.robot-payback"] },
    { id: "mz04-l05-f6", front: "Cleaning as a service", back: "Vendor owns robots, charges per MWp per year: capex risk moves to the vendor, at a risk premium, with vendor-exit risk for the owner.", concepts: ["mz04.cleaning-om-contract"] },
  ],
};

export default lesson;
