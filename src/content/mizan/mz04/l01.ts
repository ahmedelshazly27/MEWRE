import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz04-l01",
  title: "The economics of one cleaning: the square-root rule",
  summary:
    "Derive the energy lost between two cleanings under linear soiling, build the annual cost curve, find the optimal interval (the square-root rule) and its minimum cost, and learn what the derivation hides: a flat optimum, residual dust, saturation and seasons.",
  minutes: 70,
  objectives: [
    "You can derive the lost-energy integral and the optimal cleaning interval from first principles, with units",
    "You can compute the optimal interval, cleanings per year, average loss and minimum annual cost for a Kuwaiti plant",
    "You can explain why the optimum is flat and what that means for a schedule and for a sales claim",
    "You can say where the simple model breaks (residual dust, saturation, storms, seasons) and how each changes the answer",
  ],
  concepts: [
    {
      id: "mz04.lost-energy-integral",
      name: "Lost-energy integral",
      description: "Under linear soiling the energy lost between two cleanings is the triangle area E_d·s·T²/2; the annual average loss fraction is sT/2.",
      competency: "mz-cleaning",
      related: ["m02.soiling", "m12.cleaning-economics"],
    },
    {
      id: "mz04.square-root-rule",
      name: "Square-root rule for the cleaning interval",
      description: "T* = √(2C/(p·E_d·s)): the optimal interval scales with the square root of cleaning cost over (energy value × daily energy × soiling rate); at the optimum cleaning spend equals the value of energy lost.",
      competency: "mz-cleaning",
      related: ["m12.cleaning-economics", "m10.cleaning-economics"],
    },
    {
      id: "mz04.flat-optimum",
      name: "Flat optimum",
      description: "J(kT*)/J* = (k + 1/k)/2: a 50 % error in interval costs about 8 %, a factor of two costs 25 %. Value comes from fixing gross errors, not fine-tuning.",
      competency: "mz-cleaning",
    },
    {
      id: "mz04.residual-and-saturation",
      name: "Residual dust and saturation",
      description: "Cleaning rarely restores 100 %: a residual r0 adds a constant loss and needs its own remedy; at very long intervals soiling saturates and the linear model overstates loss.",
      competency: "mz-cleaning",
      related: ["m02.cleaning-strategy"],
    },
    {
      id: "mz04.seasonal-interval",
      name: "Seasonal optimal interval",
      description: "Because s, E_d and p vary through the year, T* is a function of season: shorter in shamal months, longer in calm months; a fixed calendar is a gross error.",
      competency: "mz-cleaning",
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "From a sawtooth to a square root",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every cleaning recommendation Mizan will ever sell is a version of this one trade-off: pay for a cleaning now, or keep losing energy to dust. If you can derive the optimum on a whiteboard in front of an O&M manager or a KISR researcher, explain why it moves with the square root of cost, and say where the simple model breaks, you are selling an engineering result, not a dashboard. Track 0 introduced the formula; this lesson goes to the depth a seller and product owner needs.`,
        },
        {
          kind: "xref",
          to: "m12-l04",
          note: "Track 0 O&M lesson: the basic optimal-interval formula and a 1 GW example. This lesson re-derives it, adds the minimum cost, the flatness result, residuals, saturation and seasons.",
        },
        {
          kind: "md",
          md: md`## The model

Take a plant that would deliver $E_d$ MWh per day if perfectly clean. After each cleaning, dust builds up and the **soiling loss fraction** grows roughly linearly:

$$L(t) = s\,t, \qquad 0 \le t < T$$

where $s$ is the **soiling rate** (fraction per day; 0.4 %/day means $s = 0.004$) and $T$ is the cleaning interval in days. At $t = T$ the plant is cleaned and $L$ drops back to (nearly) zero: the familiar **sawtooth**.

Linear growth is the standard first model (it is what the stochastic rate and recovery method fits to each soiling interval in operational data), and Gulf field data support it on most days: the Doha multi-year study found build-up on about 75 % of days and natural recovery on 25 %. Storms, rain and dew break it, and we will come back to them.

## Energy lost in one cycle

The energy lost between two cleanings is the area under the loss curve times the daily energy:`,
        },
        { kind: "equation", formula: "mz04-lost-energy-cycle" },
        {
          kind: "md",
          md: md`Two consequences. First, the **average** loss over a cycle is $\bar L = sT/2$ (the triangle's mean height). Second, the loss per cycle grows with $T^2$: waiting twice as long between cleanings loses four times as much per cycle, but there are half as many cycles, so the annual loss doubles.

## The annual cost curve

Let $C$ be the cost of one full-plant cleaning cycle (labour, water, fuel, equipment hire, supervision) and $p$ the value of a MWh to whoever pays for cleaning. There are $365/T$ cycles a year, and the annual energy lost is $E\,\bar L = E\,sT/2$ with $E = 365\,E_d$:`,
        },
        { kind: "equation", formula: "mz04-annual-cost" },
        {
          kind: "md",
          md: md`## The derivation

Differentiate and set to zero:

$$\frac{\mathrm{d}J}{\mathrm{d}T} = -\frac{365\,C}{T^2} + \frac{p\,E\,s}{2} = 0 \quad\Rightarrow\quad T^{*2} = \frac{2\cdot 365\,C}{p\,E\,s} = \frac{2\,C}{p\,E_d\,s}$$

The second derivative $730C/T^3$ is positive, so this is a minimum. This is the same algebra as the economic order quantity in inventory management: a fixed cost per event against a holding cost that grows linearly with time.`,
        },
        { kind: "equation", formula: "mz04-optimal-interval" },
        {
          kind: "md",
          md: md`Substitute $T^*$ back into $J$ and the two terms come out **equal**: at the optimum, the money spent on cleaning each year equals the value of energy lost to dust. That gives a powerful field check: if a plant's cleaning bill is ten times its soiling loss, or the reverse, it is far from optimal.`,
        },
        { kind: "equation", formula: "mz04-min-cost" },
        {
          kind: "md",
          md: md`## What the square root tells you

| Change | Effect on $T^*$ | Effect on $J^*$ |
|---|---|---|
| Cleaning cost halves | $\times 0.71$ (clean 41 % more often) | $\times 0.71$ |
| Value of energy × 4 (IPP tariff to fuel value) | $\times 0.5$ (clean twice as often) | $\times 2$ |
| Soiling rate doubles (shamal season) | $\times 0.71$ | $\times 1.41$ |
| Plant twice as large, $C$ doubles too | unchanged | $\times 2$ |

The last row matters for sales: the optimal interval does **not** depend on plant size when cleaning cost scales with area. It depends on cost per MWp, energy per MWp and soiling rate. A 10 MW research plant and a 1.1 GW IPP with the same unit costs and dust share the same optimum.

## The optimum is flat`,
        },
        { kind: "equation", formula: "mz04-flatness" },
        {
          kind: "chart",
          chart: "line",
          title: "Cost penalty of a mis-set interval",
          xKey: "k",
          xLabel: "Actual interval / optimal interval",
          yLabel: "Annual cost / minimum cost",
          series: [{ key: "ratio", label: "J(kT*)/J*" }],
          data: [
            { k: 0.25, ratio: 2.125 },
            { k: 0.33, ratio: 1.68 },
            { k: 0.5, ratio: 1.25 },
            { k: 0.67, ratio: 1.08 },
            { k: 0.8, ratio: 1.025 },
            { k: 1, ratio: 1 },
            { k: 1.25, ratio: 1.025 },
            { k: 1.5, ratio: 1.083 },
            { k: 2, ratio: 1.25 },
            { k: 3, ratio: 1.667 },
            { k: 4, ratio: 2.125 },
          ],
          caption: "The penalty is symmetric in k and 1/k. Within ±25 % of the optimum the cost is within 2.5 %; the money is in factors of two or more.",
        },
        {
          kind: "md",
          md: md`This cuts both ways for Mizan. Bad news: a client cleaning every 25 days when the optimum is 30 will not pay for a better number. Good news: real errors are rarely that small. A fixed monthly calendar in a year where the optimum ranges from about 3 to 6 weeks, or an IPP cleaning at its tariff when the state's value is five times higher, are factor-of-two errors, worth 25 % or more of the total.

## Where the simple model breaks

1. **Residual dust.** Cleaning does not restore 100 %. Dew-cemented dust resists dry brushing, and crews miss rows. Model it as a residual $r_0$:`,
        },
        { kind: "equation", formula: "mz04-residual-loss" },
        {
          kind: "md",
          md: md`A constant residual does not move $T^*$ (it adds the same cost to every interval), but it changes technology comparisons and calls for a periodic deep clean. If it grows cycle by cycle, the right policy has two levels: frequent light cleans and occasional wet deep cleans.

2. **Saturation.** Over long dry spells the loss curve bends over as wind removes some dust as fast as it lands. The linear model then overstates the loss at long intervals, which biases $T^*$ short. In Kuwait's high-dust regime with monthly cleaning, saturation is rarely reached between cleanings; it matters when you analyse long uncleaned periods.

3. **Steps.** A dust storm adds a step $\Delta L$ in hours (the Shagaya paper reports sudden output drops of about 30 % during storms, part of which is atmospheric attenuation rather than deposition). Rain can clean or, if light, turn dust into mud. Lesson 4 replaces the fixed interval with a trigger rule that handles steps.

4. **Seasons.** $s$, $E_d$ and $p$ all vary. Apply the rule season by season: $T^*(\text{month}) = \sqrt{2C/(p\,E_d\,s)}$ with that month's values. Shamal months need short intervals, calm winter months long ones, unless dew-driven cementation dominates.

5. **Rolling cleaning.** Real crews and robots clean a few blocks a day, not the whole plant at once. The plant-average loss is the same sawtooth averaged over staggered blocks, so the formula holds with $T$ as the revisit interval of each block and $C$ as the cost of one full pass.`,
        },
        {
          kind: "widget",
          widget: "soiling",
          caption: "Set soiling 0.4 %/day, plant 500 MWp, yield 2,000 kWh/kWp, energy value USD 15/MWh and cost per cycle USD 0.15/kWp. Read the optimal interval (about 30 days) and check that cleaning cost and lost revenue cross there. Then move energy value to 85 and watch the interval roughly halve.",
        },
        { kind: "sources", refs: ["mz04-r2", "mz04-r6", "mz04-r9", "mz04-r1"] },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "A 500 MWp Kuwaiti plant at the IPP's value of energy",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Optimal manual wet-cleaning interval",
          given: md`Illustrative plant, not a real project: 500 MWp, clean specific yield 2,000 kWh/kWp, so $E = 1{,}000{,}000$ MWh/yr and $E_d = 2{,}739.7$ MWh/day. Soiling rate $s = 0.4$ %/day (inside the 0.3 to 0.6 %/day working range for Kuwait, extrapolated from Qatar data). Manual wet cleaning $C$ = USD 75,000 per full cycle (USD 150/MWp, illustrative). Value of energy to the IPP $p$ = USD 15/MWh (illustrative tariff; the Shagaya Zone 1 tariff is not published).`,
          steps: [
            { md: md`Denominator: $p\,E_d\,s = 15 \times 2{,}739.7 \times 0.004 = 164.4$ USD/day$^2$ (the value of loss added per day, per day of interval).` },
            { md: md`$T^* = \sqrt{2 \times 75{,}000 / 164.4} = \sqrt{912.5} = 30.2$ days, so $365/30.2 = 12.1$ cleanings a year.` },
            { md: md`Average loss $\bar L = sT^*/2 = 0.004 \times 30.2/2 = 6.04$ %; energy lost $= 0.0604 \times 1{,}000{,}000 = 60{,}400$ MWh/yr, worth USD 0.906 m.` },
            { md: md`Cleaning spend $= 12.1 \times 75{,}000 =$ USD 0.906 m/yr: equal to the loss, as the theory says.` },
            { md: md`Minimum cost $J^* = \sqrt{2\cdot 365 \cdot 75{,}000 \cdot 15 \cdot 10^6 \cdot 0.004} =$ USD 1.81 m/yr.` },
          ],
          result: md`At USD 15/MWh the IPP's optimum is about monthly, the same practice reported at Shagaya PV. It accepts a 6 % average soiling loss because energy is cheap to it. Keep this number: lesson 2 shows the state would choose a very different interval.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "What a fortnightly calendar costs, and the shamal-season optimum",
          given: md`Same plant and prices. The O&M contractor proposes a fixed 15-day calendar all year. Separately, in the shamal season the soiling rate rises to 0.7 %/day.`,
          steps: [
            { md: md`Ratio $k = 15/30.2 = 0.497$.` },
            {
              md: md`Penalty $= (k + 1/k)/2 = (0.497 + 2.014)/2 = 1.255$, so $J(15) = 1.255 \times 1.81 = 2.28$ USD m/yr. Direct check: cleaning $365 \times 75{,}000/15 = 1.825$ m plus loss $15 \times 10^6 \times 0.004 \times 15/2 = 0.45$ m $= 2.275$ m.`,
              hidden: true,
              check: { prompt: "Annual cost of the 15-day calendar", answer: 2.275, unit: "USD m/yr", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Shamal season: $T^* = \sqrt{2 \times 75{,}000/(15 \times 2{,}739.7 \times 0.007)} = \sqrt{521.4} = 22.8$ days.`,
              hidden: true,
              check: { prompt: "Optimal interval at 0.7 %/day", answer: 22.8, unit: "days", tolerance: { rel: 0.01 } },
            },
            { md: md`In a calm month at 0.25 %/day the optimum is $\sqrt{2 \times 75{,}000/(15 \times 2{,}739.7 \times 0.0025)} = 38.2$ days.` },
          ],
          result: md`Over-cleaning on a fixed fortnightly calendar costs the IPP about USD 0.46 m/yr (26 %) more than the optimum. The optimum itself moves between about 23 and 38 days through the year at this value of energy: a seasonal schedule beats any fixed calendar.`,
        },
        {
          kind: "question",
          question: {
            id: "mz04-l01-p1",
            type: "numeric",
            prompt: md`Illustrative 200 MWp plant, clean yield 2,100 kWh/kWp, soiling 0.5 %/day, cost per full cleaning cycle USD 30,000, value of energy USD 20/MWh. What is the optimal cleaning interval in days?`,
            answer: 22.8,
            tolerance: { rel: 0.02 },
            unit: "days",
            explanation: md`$E = 200 \times 2{,}100 = 420{,}000$ MWh/yr, $E_d = 1{,}150.7$ MWh/day. $p\,E_d\,s = 20 \times 1{,}150.7 \times 0.005 = 115.1$. $T^* = \sqrt{60{,}000/115.1} = \sqrt{521.4} = 22.8$ days (16 cleanings a year, average loss 5.7 %, minimum cost about USD 0.96 m/yr).`,
            concepts: ["mz04.square-root-rule"],
            difficulty: 2,
          },
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Using the rule with real plants and real people",
      blocks: [
        {
          kind: "md",
          md: md`**Who sets the interval today.** In most Gulf plants the O&M contractor sets a calendar (weekly, fortnightly, monthly) in the O&M contract or the annual O&M plan, sometimes adjusted after visible storms. Robots on GW plants run daily by default. Very few operators re-derive the interval from measured soiling rates and an explicit value of energy; KISR researchers have confirmed to the Mizan team that there is no standard method for turning operational data into cleaning decisions. That is the gap.

**Where the inputs come from.**

| Input | Best source | Typical trap |
|---|---|---|
| $s$ (soiling rate) | Soiling stations (IEC 61724-1 soiling ratio) or rates extracted from inverter data (SRR in RdTools) | Using one station for a whole plant; using a "clean" reference that is not cleaned |
| $E_d$ | Weather-corrected expected energy from the plant model | Using nameplate × hours |
| $C$ | O&M contract rates, crew logs, water invoices | Leaving out water haulage, supervision, module breakage |
| $p$ | PPA tariff, fuel value, curtailment status | Using the wrong party's value (lesson 2) |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`1. **Applying an annual average** $s$: the optimum moves with the season, and dust storms are not average. 2. **Ignoring the residual**: a technology that leaves 2 % cemented dust looks cheap per cycle and is expensive per year. 3. **Over-precise claims**: because the optimum is flat, "we will save 3 % of your cleaning cost by moving from 28 to 31 days" is true and worthless. 4. **Mixing units**: $s$ in %/day and $E_d$ in MWh/day must be consistent with $C$ per full-plant cycle. 5. **Forgetting curtailment**: energy that would have been curtailed has no value, so cleaning before a curtailed period buys nothing.`,
        },
        {
          kind: "checklist",
          title: "Before you quote an optimal interval",
          items: [
            "Soiling rate measured on site, by season, with its uncertainty, and the method stated (station or SRR)",
            "Cost per full cycle built bottom-up: labour, water and haulage, fuel, equipment, supervision, breakage",
            "Value of energy agreed with the client, and whose value it is",
            "Residual after cleaning measured (soiling ratio the day after a cleaning)",
            "Sanity check: at the proposed optimum, annual cleaning spend roughly equals annual soiling loss value",
            "Penalty of the current calendar computed with the flatness formula, so the claim is sized correctly",
          ],
        },
        {
          kind: "ask",
          title: "Questions for the O&M manager",
          items: [
            "How did you choose the current cleaning frequency, and when was it last revisited?",
            "What does one full cleaning pass cost you all-in, including water haulage and supervision?",
            "What is the soiling ratio the day after a cleaning, and does it differ between wet and dry methods?",
            "Do you change frequency between shamal season and winter, and on what evidence?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a plant owner, without equations, why the best cleaning interval moves with the square root of cleaning cost rather than in proportion to it, and why getting it exactly right matters less than he thinks.",
          keyPoints: [
            "Losses grow with time since the last cleaning, so waiting longer costs more and more per extra day",
            "Cleaning more often costs more cleanings but recovers energy; the best point balances the two and they are equal there",
            "When cleaning gets cheaper you clean more often, which buys back energy, so the optimum moves less than the price change (square root)",
            "Near the optimum the total cost curve is flat: a few days either way costs little; being off by a factor of two costs about 25 %",
            "The real gains come from fixing big errors: wrong season, wrong value of energy, ignoring storms",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz04-l01-p2",
            type: "short",
            prompt: md`Write the one-page technical note Mizan would attach to a first meeting with a Kuwaiti PV plant operator: "How we compute your optimal cleaning interval". Include the model, the inputs you need from them, an illustrative result for a 500 MWp plant (state it is illustrative), and the limits of the model.`,
            rubric: [
              "States the linear soiling model, the lost-energy integral or average loss sT/2, and the square-root formula with units",
              "Lists the four inputs (soiling rate, daily energy, cost per full cycle, value of energy) and where each comes from on their plant",
              "Gives a correctly computed illustrative result (interval, cleanings per year, average loss, annual cost) clearly labelled illustrative",
              "Explains that at the optimum cleaning spend equals soiling loss value, and uses the flatness result to set expectations",
              "Names the model's limits: residual dust, storms and rain steps, seasonality, saturation, curtailment",
              "Does not claim any measured Shagaya soiling rate, signed pilot or customer result",
            ],
            modelAnswer: md`**How Mizan computes your optimal cleaning interval (technical note).** Model: after each cleaning the soiling loss grows roughly linearly, $L = s\,t$. Energy lost per cycle is $E_d s T^2/2$, so the annual cost of an interval $T$ is $J = 365C/T + pEsT/2$ and the minimum is at $T^* = \sqrt{2C/(pE_ds)}$. At that point your annual cleaning spend equals the value of energy lost to dust. **Inputs we need:** (1) soiling rate by season, from your soiling stations or extracted from inverter data with the NREL SRR method; (2) clean daily energy from your weather-corrected model; (3) your all-in cost of one full cleaning pass (crews, water and haulage, equipment, supervision, breakage); (4) the value of a MWh, agreed with you (tariff, or fuel value for a state plant). **Illustrative result** (not your plant): 500 MWp, 2,000 kWh/kWp, 0.4 %/day, USD 75,000 per pass, USD 15/MWh gives about 30 days, 12 cleanings a year, 6 % average loss and USD 1.8 m/yr of cleaning plus loss. A fixed 15-day calendar would cost about 25 % more. **Limits:** the optimum is flat, so we only recommend changes larger than about ±30 %; we model residual dust after cleaning, dust-storm and rain steps (event-driven triggers), seasonal rates, and curtailed periods separately; at very long intervals soiling saturates and the linear model overstates loss. Every recommendation comes with its uncertainty and a way to verify it on your plant.`,
            explanation: md`A credible technical note shows the mechanism and the formula, asks for the client's own inputs instead of assuming them, labels every example number, and sets honest expectations through the flat optimum and the model's limits. Overclaiming precision is the fastest way to lose an O&M engineer.`,
            concepts: ["mz04.square-root-rule", "mz04.flat-optimum", "mz04.residual-and-saturation"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz04-l01-q1",
      type: "mcq",
      prompt: md`Under linear soiling, what is the time-averaged soiling loss over a cleaning interval $T$?`,
      options: [md`$sT$`, md`$sT/2$`, md`$sT^2/2$`, md`$\sqrt{sT}$`],
      answer: 1,
      explanation: md`The loss rises from 0 to $sT$ along a straight line; its average is half the peak, $sT/2$. $sT^2/2$ (times $E_d$) is the energy lost per cycle, not the average fraction.`,
      concepts: ["mz04.lost-energy-integral"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz04-l01-q2",
      type: "numeric",
      prompt: md`Cleaning cost per cycle falls by 36 % (to 0.64 of its old value) after a contract renegotiation. All else equal, by what factor does the optimal interval change?`,
      answer: 0.8,
      tolerance: { abs: 0.01 },
      unit: "×",
      explanation: md`$T^* \propto \sqrt{C}$, so $\sqrt{0.64} = 0.8$: clean 25 % more often. The minimum annual cost also falls by the factor 0.8, not 0.64.`,
      concepts: ["mz04.square-root-rule"],
      difficulty: 2,
    },
    {
      id: "mz04-l01-q3",
      type: "numeric",
      prompt: md`A plant cleans every 60 days when its optimum is 20 days. By what percentage does its annual cleaning-plus-soiling cost exceed the minimum?`,
      answer: 66.7,
      tolerance: { abs: 0.5 },
      unit: "%",
      explanation: md`$k = 3$: $(3 + 1/3)/2 = 1.667$, so 66.7 % above the minimum. Gross errors like this are where the money is.`,
      concepts: ["mz04.flat-optimum"],
      difficulty: 2,
    },
    {
      id: "mz04-l01-q4",
      type: "mcq",
      prompt: md`At the optimal interval of the linear model, which statement is true?`,
      options: [
        "Soiling loss is zero on average",
        "Annual cleaning spend equals the annual value of energy lost to soiling",
        "Cleaning spend is twice the soiling loss",
        "The interval is independent of the soiling rate",
      ],
      answer: 1,
      explanation: md`Substituting $T^*$ into $J$ makes both terms equal to $\sqrt{365\,C\,pEs/2}$. This is a quick field check of whether a plant is anywhere near optimal.`,
      concepts: ["mz04.square-root-rule"],
      difficulty: 1,
    },
    {
      id: "mz04-l01-q5",
      type: "multi",
      prompt: md`Which of these change the optimal interval $T^*$ in the model with a residual $\bar L = r_0 + sT/2$? (Select all.)`,
      options: [
        "A larger constant residual r0",
        "A higher soiling rate s",
        "A higher value of energy p",
        "Doubling plant size when cleaning cost scales with area",
        "A cheaper cleaning cycle C",
      ],
      answer: [1, 2, 4],
      explanation: md`A constant residual adds the same cost to every interval, so it shifts $J$ but not $T^*$. Plant size cancels when $C$ and $E_d$ scale together. $s$, $p$ and $C$ all appear in $T^* = \sqrt{2C/(pE_ds)}$.`,
      concepts: ["mz04.square-root-rule", "mz04.residual-and-saturation"],
      difficulty: 2,
    },
    {
      id: "mz04-l01-q6",
      type: "decision",
      prompt: md`An O&M contractor cleans every 28 days all year. Your analysis says the year-round optimum is 31 days, but 21 days in the three shamal months and 40 days in winter. What do you recommend?`,
      options: [
        { text: "Move the calendar from 28 to 31 days and claim the saving", score: 0.2, feedback: "Within 10 % of the optimum the penalty is under 1 %: a worthless claim that costs credibility." },
        { text: "Recommend a seasonal schedule (about 21 days in shamal months, about 40 in winter) and size the claim with the flatness formula", score: 1, feedback: "The seasonal errors (factors of about 1.3 to 1.4) cost about 4 % in those months, several times the annual tweak, and you size the claim honestly instead of overselling it." },
        { text: "Recommend daily robotic cleaning", score: 0.3, feedback: "A technology change needs its own capex case (lesson 3), not an interval analysis." },
        { text: "Leave it: 28 days is close enough", score: 0.4, feedback: "Close for the annual average, but it ignores a real seasonal error worth more than the annual tweak." },
      ],
      explanation: md`The flat optimum means small calendar shifts are worthless; seasonal and event-driven errors are larger. Size every claim with $(k + 1/k)/2$.`,
      concepts: ["mz04.flat-optimum", "mz04.seasonal-interval"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz04-l01-f1", front: "Energy lost per cycle, linear soiling", back: md`$\Delta E = E_d\,s\,T^2/2$; average loss $sT/2$.`, concepts: ["mz04.lost-energy-integral"] },
    { id: "mz04-l01-f2", front: "Optimal cleaning interval", back: md`$T^* = \sqrt{2C/(p\,E_d\,s)}$`, concepts: ["mz04.square-root-rule"] },
    { id: "mz04-l01-f3", front: "Minimum annual cost", back: md`$J^* = \sqrt{2\cdot 365\,C\,p\,E\,s}$; cleaning spend = soiling loss value at the optimum.`, concepts: ["mz04.square-root-rule"] },
    { id: "mz04-l01-f4", front: "Penalty of interval kT*", back: md`$(k + 1/k)/2$: k = 1.5 costs 8 %, k = 2 costs 25 %, k = 3 costs 67 %.`, concepts: ["mz04.flat-optimum"] },
    { id: "mz04-l01-f5", front: "Does a constant residual after cleaning change T*?", back: "No. It adds the same cost to every interval; it matters for technology choice and needs a periodic deep clean.", concepts: ["mz04.residual-and-saturation"] },
    { id: "mz04-l01-f6", front: "Illustrative 500 MWp, 0.4 %/day, USD 75k/cycle, USD 15/MWh", back: "T* ≈ 30 days, 12 cleanings/yr, 6 % average loss, USD 1.81 m/yr total.", concepts: ["mz04.square-root-rule"] },
    { id: "mz04-l01-f7", front: "Does T* depend on plant size?", back: "Not if cleaning cost and energy both scale with MWp: it depends on cost per MWp, yield per MWp and soiling rate.", concepts: ["mz04.square-root-rule"] },
  ],
};

export default lesson;
