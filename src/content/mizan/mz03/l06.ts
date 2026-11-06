import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz03-l06",
  title: "From soiling estimate to decision signal: confidence intervals, alerting and what plant operators need",
  summary:
    "Turning a soiling ratio with uncertainty into decisions an O&M team acts on: the square-root law for cleaning intervals and why its flat optimum changes what precision is worth, break-even rules for event-driven cleaning after dust storms, minimum detectable change and alert design, and the daily and monthly outputs an operator, an asset owner and a ministry actually use.",
  minutes: 80,
  objectives: [
    "Compute the optimal fixed cleaning interval and its cost, and show how little the cost changes near the optimum",
    "Decide whether to clean early after a dust storm using a break-even rule with uncertainty",
    "Compute the minimum detectable change in performance index for an alert window, and design alerts that avoid fatigue",
    "Explain why the value of an MWh, and who holds it, changes the optimal cleaning policy",
    "Specify the daily operator output and alert rules for a soiling analytics service",
  ],
  concepts: [
    { id: "mz03.decision-signal", name: "Soiling decision signal", description: "The operational output of soiling analytics: an estimate with confidence, its energy and money consequence, and a recommended action with its economic justification.", competency: "mz-data", related: ["m12.performance-reporting"] },
    { id: "mz03.optimal-cleaning-interval", name: "Optimal cleaning interval (square-root law)", description: "For linear soiling, the interval minimising cleaning plus soiling cost per day is the square root of 2C/(Vr); the cost curve is flat near the optimum.", competency: "mz-cleaning", related: ["m12.cleaning-economics", "m02.cleaning-strategy"] },
    { id: "mz03.event-cleaning", name: "Event-driven cleaning rule", description: "Clean early when the energy recovered before the next scheduled cleaning is worth more than the marginal cleaning cost, judged on the uncertain size of the event.", competency: "mz-cleaning" },
    { id: "mz03.minimum-detectable-change", name: "Minimum detectable change", description: "The smallest shift in mean performance index that an alert window can detect at chosen false-alarm and detection rates, given daily noise.", competency: "mz-data" },
    { id: "mz03.alert-design", name: "Alert design for operators", description: "Persistence, hysteresis, confidence thresholds and routing that make alerts actionable and keep false alarms rare enough to be trusted.", competency: "mz-data" },
  ],
  sections: [
    {
      layer: "theory",
      title: "What an estimate is worth: decisions, not dashboards",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`KISR confirmed there is no standard method for turning operational data into cleaning decisions. That gap is Mizan's product. A soiling ratio of 0.91 with an interval is a research output; "clean blocks 3 and 4 by Thursday, worth KWD X more than it costs, confidence high" is something an O&M manager can act on and a buyer can pay for. This lesson is where the analytics becomes a business.`,
        },
        {
          kind: "md",
          md: md`### The square-root law

Assume linear soiling at rate $r$ per day, full recovery at each cleaning, a cleaning cycle costing $C$ and a clean plant's daily energy worth $V$. Over an interval $T$ the average loss is $rT/2$, so the average daily cost of soiling plus cleaning is:`,
        },
        { kind: "equation", formula: "mz03-optimal-interval" },
        {
          kind: "md",
          md: md`Two properties drive everything that follows.

**1. The optimum is insensitive to the rate.** $T^* \propto r^{-1/2}$: if the soiling rate is really 0.3 or 0.5 %/day instead of 0.4, the optimal interval moves from 31.6 days to 36.5 or 28.3 days (illustrative numbers below). Precision on the *average* rate is worth less than people think.

**2. The cost curve is flat near the minimum.** Cleaning every 40 days instead of the optimal 31.6 raises cost by under 3 %. Planning with $r = 0.3$ %/day when the truth is 0.4 costs about 1 % extra.

So where is the money in soiling analytics? In what the square-root law assumes away:
- **Rates are not constant.** Dust storms add steps (Shagaya: sudden drops of about 30 % reported); seasons change rates; dew cements dust. A state-based rule ("clean when SR is predicted to fall below a threshold") beats a fixed calendar when rates vary.
- **Cleanings are not always complete.** Verifying recovery after each cleaning catches crews, methods or water quality that are not working.
- **Not all blocks soil alike.** Edges near roads and dust sources soil faster; cleaning the worst blocks first is cheaper than cleaning everything.
- **Sensors and models fail.** A soiling service that also tells the operator "your pyranometer is dirty" or "inverter 7 is underperforming, not soiled" prevents wrong decisions.

### Who values the MWh changes the answer

$V$ depends on whose money it is. An IPP values an MWh at its tariff; the state values it at the cost of the fuel it displaces, which in Kuwait's summer is liquid fuel or gas and can be several times a Gulf PV tariff (Track 0, module m10 shows reported KPC purchase cost around 25 fils/kWh against PV tariffs of a few fils). With the illustrative numbers below, valuing energy at USD 25/MWh gives $T^* \approx 32$ days; at USD 81/MWh it gives about 18 days. The same physics, two optimal policies: the IPP's optimum is to clean less often than the system's. That is why ministries write minimum cleaning or soiling-ratio obligations into O&M and PPA terms, and why a soiling service sold to a public owner should state which value of energy it optimises.

### Event-driven cleaning

After a dust storm leaves a step $\Delta\mathrm{SR}$, cleaning now instead of at the scheduled date recovers that step for the remaining $\tau$ days:`,
        },
        { kind: "equation", formula: "mz03-event-cleaning" },
        {
          kind: "md",
          md: md`Two subtleties. First, part of the storm-day drop is dim sky (high AOD), not deposit: estimate the step from the days *after* the sky clears. Second, the step is uncertain; if crews are scarce, require the lower bound of its confidence interval to clear the cost, and if not, act on the expected value.

### Confidence intervals into decisions

A decision rule needs a probability, not just a P50. Practical forms:
- **Expected value**: act if $E[\text{benefit}] > \text{cost}$. Right when decisions are frequent and reversible (cleaning is).
- **Lower-bound rule**: act if the P10 or the lower end of the interval clears the cost. Right when the resource is scarce or the action has a high fixed cost.
- **Probability threshold**: act if $P(\mathrm{SR} < \text{threshold}) > p$. Natural for contract obligations ("SR must stay above 0.95").

State the rule in the output, so the operator can see why.

### How small a change can an alert see?

Daily PI after filtering still scatters by 1 to 2 % from weather and model error. The smallest shift in mean PI that a window of $n$ days can detect:`,
        },
        { kind: "equation", formula: "mz03-mde" },
        {
          kind: "md",
          md: md`With $\sigma_d = 1.5$ %, 5 % false alarms (two-sided) and 80 % detection: one day detects only 4.2 %, three days 2.4 %, seven days 1.6 %, fourteen days 1.1 %. Real errors persist for several days (a hazy week, a sensor drift), so treat these as optimistic. Two design consequences: dust-storm steps of several percent can be alerted within a day or two; slow soiling and subtle cleaning failures need a week or more of data before an alert is honest.

### Alert design

| Principle | Implementation |
|---|---|
| Persistence | Require the condition on k of n days (for example 3 of 4), not one day |
| Hysteresis | Raise at one threshold, clear at a safer one, so alerts do not flap |
| Confidence in the trigger | Trigger on the interval, not the P50, for anything that dispatches a crew |
| Root-cause routing | Soiling alerts to the cleaning supervisor; sensor and inverter alerts to maintenance |
| Budget for false alarms | Target, say, under one false alarm per block per month, and measure it |
| Action attached | Every alert says what to do and what it is worth |

An alert that fires every day is ignored within a month. An alert that was right the last five times gets acted on.`,
        },
        {
          kind: "matrix",
          title: "Which action for which soiling situation",
          xAxis: ["Low confidence in estimate", "High confidence in estimate"],
          yAxis: ["Small value at stake", "Large value at stake"],
          cells: [
            { label: "Watch", detail: "Large value but uncertain: gather evidence fast (spot I-V test, check sensor), then decide" },
            { label: "Act now", detail: "Large and confident: dispatch cleaning or repair, attach the money" },
            { label: "Ignore for now", detail: "Small and uncertain: keep in the monthly report" },
            { label: "Schedule", detail: "Small but confident: fold into the next planned cleaning round" },
          ],
          caption: "Confidence and value together decide the action; a P50 alone decides nothing.",
        },
        {
          kind: "widget",
          widget: "soiling",
          caption: "Track 0 cleaning-interval optimiser: change the soiling rate, cleaning cost, tariff and plant size and watch how flat the cost curve is near the optimal interval.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Cleaning intervals, a dust storm and an alert window",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Optimal interval and the value of precision for an illustrative 100 MWp plant",
          given: md`Illustrative: 100 MWp plant yielding 6 kWh/kWp/day clean, so 600 MWh/day; energy valued at USD 25/MWh, so $V = $ USD 15,000/day. A full water cleaning cycle costs $C = $ USD 30,000 (USD 300/MWp per cycle). Soiling rate from SRR: P50 0.40 %/day, 68 % interval 0.30 to 0.50 %/day.`,
          steps: [
            { md: md`$T^* = \sqrt{2 \times 30{,}000 / (15{,}000 \times 0.004)} = \sqrt{1{,}000} = 31.6$ days, roughly monthly cleaning (the Shagaya regime).` },
            { md: md`Cost at optimum $= \sqrt{2 \times 30{,}000 \times 15{,}000 \times 0.004} = $ USD 1,897/day, about USD 0.69 m/yr, split equally between cleaning and soiling loss. Average soiling loss $= rT^*/2 = 6.3$ %; loss at the moment of cleaning $rT^* = 12.6$ %. Cleaning spend about 11.5 cycles a year, roughly USD 3.5 k/MW/yr.` },
            { md: md`Rate uncertainty: $T^*$ ranges from 36.5 days ($r = 0.30$ %) to 28.3 days ($r = 0.50$ %).` },
            { md: md`Cost of being wrong: planning at 36.5 days when the truth is 0.40 %/day costs $30{,}000/36.5 + 15{,}000 \times 0.004 \times 36.5/2 = 822 + 1{,}095 = $ USD 1,917/day, 1.0 % above optimum (about USD 7 k/yr). Cleaning every 40 days costs USD 1,950/day, 2.8 % above.` },
            { md: md`Change the value of energy to the state's avoided fuel cost, illustratively USD 81/MWh ($V = $ USD 48,600/day): $T^* = 17.6$ days and average loss 3.5 %.` },
          ],
          result: md`On a 100 MWp plant, a perfect estimate of the average rate is worth only thousands of dollars a year; the choice of whose value of energy to optimise is worth halving the interval. The commercial value of soiling analytics sits in events, block-level targeting, cleaning verification and in making the value-of-energy choice explicit.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Clean early after a dust storm?",
          given: md`Same plant ($V = $ USD 15,000/day). Two days after a storm, with skies clear again, the plant's PI has stepped down by 8 points relative to the pre-storm trend; the 68 % interval on the step is 6 to 10 points. The next scheduled cleaning is in 25 days. An extra full cleaning cycle costs USD 30,000.`,
          steps: [
            { md: md`Expected benefit of cleaning now $= \Delta\mathrm{SR} \times V \times \tau = 0.08 \times 15{,}000 \times 25$.` },
            { md: md`$= $ USD 30,000: exactly break-even on the expected value.`, hidden: true, check: { prompt: "Expected benefit (USD)", answer: 30000, unit: "USD", tolerance: { rel: 0.01 } } },
            { md: md`Lower-bound benefit (step 6 points) $= 0.06 \times 15{,}000 \times 25$.` },
            { md: md`$= $ USD 22,500, below the cost.`, hidden: true, check: { prompt: "Lower-bound benefit (USD)", answer: 22500, unit: "USD", tolerance: { rel: 0.01 } } },
            { md: md`Better option: bring the scheduled cleaning forward by 10 days, or clean only the worst-hit blocks first. Advancing the whole cycle shortens the next interval instead of adding a cycle, so its marginal cost is far below USD 30,000.` },
          ],
          result: md`At break-even, the answer is rarely "full extra cleaning" or "do nothing": it is to re-sequence the existing plan and target the blocks with the biggest steps. Real event rules should also count the storm's effect on the following interval's rate.`,
        },
        {
          kind: "question",
          question: {
            id: "mz03-l06-p1",
            type: "numeric",
            prompt: md`Daily PI noise after filtering is $\sigma_d = 2.0$ %. Using $z$ values 1.96 and 0.84, what is the minimum detectable change (in %) with a 10-day window?`,
            answer: 1.77,
            tolerance: { abs: 0.03 },
            unit: "%",
            explanation: md`$\delta_{\min} = 2.8 \times 2.0/\sqrt{10} = 5.6/3.162 = 1.77$ %. An alert promising to catch 1 % changes within 10 days on this plant would be promising noise.`,
            concepts: ["mz03.minimum-detectable-change"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "What operators, owners and ministries actually use",
      blocks: [
        {
          kind: "md",
          md: md`### Outputs by audience

| Audience | Cadence | What they need |
|---|---|---|
| Cleaning supervisor | Daily | Blocks ranked by soiling loss with confidence, recommended cleaning order, verification of yesterday's cleaning (recovery achieved vs expected) |
| O&M manager | Daily and weekly | Soiling loss in MWh and money since last cleaning, next recommended cleaning date with justification, event alerts, sensor and inverter flags |
| Asset owner or IPP | Monthly | Soiling loss vs budget, cleaning cost vs energy recovered, weather-corrected PR to IEC 61724 alongside, contract compliance (soiling-ratio floors) |
| Ministry or research partner | Quarterly | Method, uncertainty, validation record, energy and fuel value to the system |

Practicalities that decide adoption: alerts reach people through what they already use (email, messaging, the CMMS work order), reports in English and Arabic for Kuwaiti public owners, and a one-line explanation per recommendation that a supervisor can repeat to a crew.

### Closing the loop

The most underrated feature is **cleaning verification**: after each logged cleaning, compare the recovery step with the expected recovery from the soiling estimate. A cleaning that recovered 4 points when 10 were expected is a finding about water quality, brush wear, cemented dust or a crew that skipped rows, and it costs nothing extra to detect. It is also the evidence that turns a pilot into a contract: money recovered, attributed, per cleaning.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "Scope the pilot output narrowly",
          md: md`For a first pilot at a plant like Shagaya Phase I, one daily table and one monthly page beat a dashboard: per block, the soiling ratio with interval, the MWh and money lost since last cleaning, the recommended action and its rule, and any sensor or availability flag. Agree with the operator in advance which decisions it should change and how you will measure that (Founder Core, pilots that convert).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How decision signals fail in practice",
          md: md`- **Recommending cleaning on a P50 with a huge interval**: crews dispatched on noise lose trust fast.
- **Alerting on one day of data**: below the minimum detectable change.
- **Not saying whose value of energy is used**: IPP and ministry read the same recommendation differently.
- **Ignoring crew and water logistics**: a recommendation for tomorrow when trucks are booked two weeks ahead is useless; optimise within constraints.
- **No verification**: you never learn whether cleanings work.
- **Mixing soiling with outages** in alerts: the cleaning supervisor gets inverter problems and stops reading.`,
        },
        {
          kind: "checklist",
          title: "Decision output checks",
          items: [
            "Every recommendation shows the estimate, its interval, the money at stake and the rule used",
            "Value of energy stated (tariff or avoided cost) and agreed with the client",
            "Alert windows respect the minimum detectable change; persistence and hysteresis set",
            "False-alarm rate tracked per month and reported",
            "Cleaning verification after every logged cleaning",
            "Sensor, availability and soiling alerts routed to different owners",
            "Reports available in English and Arabic for public owners",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask an O&M manager before designing outputs",
          items: [
            "How far ahead are cleaning crews and water trucks scheduled, and can the order of blocks change day to day?",
            "Who decides an extra cleaning, and what evidence do they need to approve it?",
            "Which contract terms mention soiling, cleaning frequency or PR?",
            "What reports do you already send to the owner or ministry, and in which language?",
            "What alerts do you already receive and ignore, and why?",
          ],
        },
        { kind: "sources", refs: ["mz03-r16", "mz03-r15"] },
        { kind: "xref", to: "m12-l04", note: "Track 0, O&M strategy including cleaning and site management: the operator's context for these outputs." },
        { kind: "scenario", scenario: "mz03-s2" },
        {
          kind: "question",
          question: {
            id: "mz03-l06-p2",
            type: "short",
            prompt: md`Specify the **daily operator output and alert rules** for Mizan's soiling analytics at a monthly water-cleaned plant of about 10 MW (two technology sections). Include: the fields in the daily table, the decision rule behind each recommendation (with the value of energy used), the alert types with their thresholds, persistence and routing, the cleaning-verification check, and how you will measure whether the output changed decisions during the pilot.`,
            rubric: [
              "Daily table per block or section with SR and interval, MWh and money lost since last cleaning, recommended action and rule, flags",
              "Explicit decision rule (expected value or lower bound, square-root interval or threshold) and a stated value of energy",
              "Alert thresholds consistent with the minimum detectable change, with persistence and hysteresis",
              "Separate routing of soiling, sensor and availability alerts",
              "Cleaning verification comparing achieved and expected recovery",
              "Pilot measures of impact (decisions changed, false-alarm rate, energy recovered per cleaning) agreed in advance",
            ],
            modelAnswer: md`**Daily output v0.1 (10 MW, two sections, monthly water cleaning)**
*Daily table, per section and per inverter*: date; SR P50 and 68 % interval; days since last full cleaning; MWh lost since last cleaning; value lost at the agreed value of energy (base case the tariff, with the avoided-fuel value shown alongside for the public owner); recommended action (none, schedule, clean early, investigate); rule that triggered it; flags (sensor divergence, availability, curtailment, data gaps).
*Decision rules*: base interval from the square-root law with the current seasonal rate, recomputed weekly. Clean early if the expected benefit $\Delta\mathrm{SR} \cdot V \cdot \tau$ exceeds the marginal cost; when crews are booked, prefer re-sequencing and require the lower bound to clear the cost for an extra cycle. Contract floor: alert if $P(\mathrm{SR} < 0.90) > 0.5$ on any section.
*Alerts*: (1) Dust event: step of at least 3 points relative to trend, persisting 2 of 3 clear days after AOD falls; routed to the cleaning supervisor. (2) Slow soiling faster than seasonal norm: 7-day mean below expected by at least 2 points (minimum detectable change about 1.6 % at 1.5 % daily noise); routed to the O&M manager. (3) Sensor: plant POA and station or satellite irradiance diverge by more than 2 % on 3 clear days; routed to maintenance, and soiling outputs flagged low confidence. (4) Availability: one inverter below peers by more than 5 % in a day; routed to maintenance, excluded from soiling. Alerts clear at half the raising threshold.
*Cleaning verification*: two days after each logged cleaning, achieved recovery vs expected recovery; alert if below 70 % of expected.
*Pilot impact measures (agreed in advance)*: number of cleaning decisions changed by the output and the energy recovered by each; false alarms per section per month (target under one); verification findings acted on; operator rating of usefulness monthly.`,
            explanation: md`A strong answer makes every recommendation traceable to a rule and a value of energy, keeps alerts above the noise floor and separates soiling from sensor and availability problems.`,
            concepts: ["mz03.decision-signal", "mz03.alert-design", "mz03.minimum-detectable-change"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor why a soiling analytics company does not make most of its value from estimating the average soiling rate more precisely.",
          keyPoints: [
            "Optimal interval scales with the inverse square root of the rate, so rate errors move it little",
            "The cost curve is flat near the optimum: a 25 % rate error costs about 1 %",
            "Value comes from events (dust storms), block targeting, cleaning verification and sensor or outage detection",
            "The value of energy (tariff vs avoided fuel) changes the optimal policy far more than precision does",
            "Decisions need confidence intervals and rules, delivered where operators already work",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz03-l06-q1",
      type: "numeric",
      prompt: md`Cleaning cycle cost USD 20,000, value of clean daily energy USD 10,000, soiling rate 0.5 %/day. Optimal fixed cleaning interval in days?`,
      answer: 28.3,
      tolerance: { abs: 0.2 },
      unit: "days",
      explanation: md`$T^* = \sqrt{2 \times 20{,}000/(10{,}000 \times 0.005)} = \sqrt{800} = 28.3$ days.`,
      concepts: ["mz03.optimal-cleaning-interval"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz03-l06-q2",
      type: "mcq",
      prompt: "If the true soiling rate is 4 times the assumed rate, by what factor should the optimal cleaning interval change?",
      options: ["Divide by 4", "Divide by 2", "Multiply by 2", "No change"],
      answer: 1,
      explanation: md`$T^* \propto r^{-1/2}$: four times the rate halves the interval.`,
      concepts: ["mz03.optimal-cleaning-interval"],
      difficulty: 1,
    },
    {
      id: "mz03-l06-q3",
      type: "numeric",
      prompt: md`After a storm, the step is 5 points; the next cleaning is in 18 days; clean daily energy is worth USD 12,000. What is the expected benefit of cleaning now (USD)?`,
      answer: 10800,
      tolerance: { rel: 0.01 },
      unit: "USD",
      explanation: md`$0.05 \times 12{,}000 \times 18 = $ USD 10,800. Compare with the marginal cost of cleaning now, which is lower if you bring forward a scheduled cycle than if you add one.`,
      concepts: ["mz03.event-cleaning"],
      difficulty: 1,
    },
    {
      id: "mz03-l06-q4",
      type: "multi",
      prompt: "Which design choices reduce alert fatigue without hiding real problems? Select all that apply.",
      options: [
        "Requiring the condition on 3 of 4 days",
        "Clearing alerts at a safer threshold than the one that raised them",
        "Alerting on every day the P50 falls below 0.95",
        "Routing sensor and inverter alerts to maintenance instead of the cleaning supervisor",
        "Tracking the false-alarm rate per month",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Persistence, hysteresis, routing and measuring false alarms make alerts trustworthy. Single-day P50 thresholds fire on noise.`,
      concepts: ["mz03.alert-design"],
      difficulty: 1,
    },
    {
      id: "mz03-l06-q5",
      type: "mcq",
      prompt: "An IPP and the ministry analyse the same plant with the same soiling data. Why might their optimal cleaning intervals differ?",
      options: [
        "They use different soiling algorithms",
        "The IPP values energy at its tariff, the state at the avoided fuel cost, which can be several times higher, so the state's optimum is a shorter interval",
        "The ministry does not pay for cleaning",
        "They do not differ if both are rational",
      ],
      answer: 1,
      explanation: md`$T^* \propto V^{-1/2}$. A higher value of energy shortens the optimal interval; this is why public owners write cleaning or soiling-ratio obligations into contracts.`,
      concepts: ["mz03.optimal-cleaning-interval", "mz03.decision-signal"],
      difficulty: 2,
    },
    {
      id: "mz03-l06-q6",
      type: "decision",
      prompt: md`Your daily output says a section's SR is 0.93 with a 68 % interval of 0.86 to 1.00, and the rule recommends cleaning early. The O&M manager asks whether to send the crew. What do you advise?`,
      options: [
        { text: "Send the crew: the P50 is below the threshold.", score: 0.2, feedback: "The interval spans clean to badly soiled; acting on the P50 here risks a wasted cycle and lost trust." },
        { text: "Not yet: the interval is too wide. Check the sensor divergence flag and run a quick spot check (a short I-V comparison or a test-wiped string) today, then decide.", score: 1, feedback: "Right: large value, low confidence means gather evidence fast, then act." },
        { text: "Ignore it until the monthly report.", score: 0.3, feedback: "If the value at stake is large, waiting a month can cost more than a spot check." },
      ],
      explanation: md`The value-confidence matrix: when the value is large and the confidence low, the right action is a cheap test that narrows the interval.`,
      concepts: ["mz03.decision-signal", "mz03.alert-design"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz03-l06-f1", front: "Square-root law", back: md`$T^* = \sqrt{2C/(Vr)}$; daily cost at optimum $\sqrt{2CVr}$, split equally between cleaning and soiling loss.`, concepts: ["mz03.optimal-cleaning-interval"] },
    { id: "mz03-l06-f2", front: "Why average-rate precision is worth little", back: "T* scales as the inverse square root of r and the cost curve is flat: a 25 % rate error costs about 1 %.", concepts: ["mz03.optimal-cleaning-interval"] },
    { id: "mz03-l06-f3", front: "Event-cleaning break-even", back: md`Clean early if $\Delta\mathrm{SR}\cdot V\cdot\tau > C_{\text{extra}}$; measure the step after the sky clears.`, concepts: ["mz03.event-cleaning"] },
    { id: "mz03-l06-f4", front: "Minimum detectable change", back: md`$\delta_{\min} = 2.8\,\sigma_d/\sqrt{n}$ (5 % false alarm, 80 % detection); about 1.6 % for 1.5 % noise over 7 days.`, concepts: ["mz03.minimum-detectable-change"] },
    { id: "mz03-l06-f5", front: "Cleaning verification", back: "After each logged cleaning, compare achieved with expected recovery; a shortfall points to water, brushes, cemented dust or skipped rows.", concepts: ["mz03.decision-signal"] },
    { id: "mz03-l06-f6", front: "Value-confidence actions", back: "Large and confident: act. Large and uncertain: test fast. Small and confident: schedule. Small and uncertain: report.", concepts: ["mz03.alert-design"] },
  ],
  scenarios: [
    {
      id: "mz03-s2",
      title: "The morning after the shamal",
      dayInLife: true,
      context: md`A strong dust storm crossed western Kuwait yesterday. At 07:30 the O&M manager of the plant in your pilot calls: "Output is down a lot this morning. Should I send the water trucks today? They are booked for the scheduled cleaning in 20 days."`,
      start: "a",
      concepts: ["mz03.event-cleaning", "mz03.decision-signal", "mz03.confounders"],
      nodes: {
        a: {
          md: md`It is early morning and the air is still hazy. What do you say first?`,
          choices: [
            { text: "\"Yes, output is down 20 %, send them now.\"", score: 1, feedback: "This morning's drop includes dim sky (high AOD) and possibly trackers still in stow. You would be dispatching on a mix of weather and soiling.", next: "b" },
            { text: "\"Let me separate sky from deposit first: I will check POA against output, stow status and inverter availability, and give you the deposit estimate once the sky clears, probably tomorrow. Meanwhile, can the truck booking be moved forward if needed?\"", score: 10, feedback: "Separates the confounders, gives a time-bound answer and prepares the logistics option.", next: "c" },
          ],
        },
        b: {
          md: md`The trucks clean half the plant by afternoon. The next day, once the haze clears, the uncleaned half shows a step of only 4 points; the cleaning recovered about that much at a full-cycle cost.`,
          choices: [
            { text: "Report it openly to the manager, show the separation of sky and deposit, and propose the rule you will use next time.", score: 6, feedback: "Recovers trust through transparency; the lesson goes into the alert design." },
          ],
        },
        c: {
          md: md`Next day, skies clear. The measured step is 9 points on the western blocks (interval 7 to 11) and 3 points on the rest. Clean daily energy is worth about USD 1,500 for the western blocks at the agreed value; a targeted wash of those blocks costs about USD 2,000 extra if the trucks come forward.`,
          choices: [
            { text: "Recommend washing the western blocks now: lower-bound benefit 0.07 × 1,500 × 20 = USD 2,100 exceeds the cost; leave the rest to the scheduled cleaning and verify the recovery after the wash.", score: 10, feedback: "Targeted, justified on the lower bound, with verification built in." },
            { text: "Recommend washing the whole plant now to be safe.", score: 4, feedback: "The eastern blocks' 3-point step does not justify an extra cycle; safety here is just cost." },
            { text: "Recommend waiting for the scheduled cleaning everywhere.", score: 3, feedback: "Leaves about USD 2,700 of expected energy on the western blocks against a USD 2,000 targeted wash." },
          ],
        },
      },
    },
  ],
};

export default lesson;
