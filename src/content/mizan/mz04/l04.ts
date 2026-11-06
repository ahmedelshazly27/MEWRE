import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz04-l04",
  title: "Dynamic scheduling: storms, rain, dew and the value of a forecast",
  summary:
    "Replace the fixed interval with a trigger rule that handles dust storms, rain and dew-driven cementation; decide when to postpone a cleaning ahead of a forecast storm; and compute what a dust forecast is worth before paying for one.",
  minutes: 70,
  objectives: [
    "You can state and apply the renewal trigger rule: clean when today's loss value per day reaches the policy's average cost per day",
    "You can decide whether to clean after a dust storm and how a storm brings the next cleaning forward",
    "You can compute the postponement threshold ahead of a forecast storm and the expected value of perfect and imperfect information",
    "You can explain how rain and dew change cleaning timing and method in Kuwait",
  ],
  concepts: [
    {
      id: "mz04.cleaning-trigger",
      name: "Trigger rule for cleaning",
      description: "Clean when p·E_d·L(t) reaches the long-run average cost per day g; for linear soiling this is L* = sT*, but it also handles steps from storms.",
      competency: "mz-cleaning",
      related: ["mz04.square-root-rule"],
    },
    {
      id: "mz04.event-driven-cleaning",
      name: "Event-driven cleaning",
      description: "Scheduling cleanings in response to measured or forecast events (dust storms, rain, dew runs) rather than a calendar; requires a live estimate of soiling loss.",
      competency: "mz-cleaning",
      related: ["m02.soiling"],
    },
    {
      id: "mz04.storm-postponement",
      name: "Postponing ahead of a storm",
      description: "Postpone a due cleaning if the probability of a re-soiling storm within τ days exceeds q* = gτ/C = 2τ/T*; low-value owners should postpone on weaker forecasts than high-value owners.",
      competency: "mz-cleaning",
      related: ["fc09.expected-value"],
    },
    {
      id: "mz04.value-of-forecast",
      name: "Value of a dust forecast",
      description: "EVPI is the ceiling on what a perfect forecast is worth per decision; a real forecast with misses and false alarms is worth less and must beat its subscription cost over a season.",
      competency: "mz-cleaning",
      related: ["fc09.value-of-information"],
    },
    {
      id: "mz04.cementation-timing",
      name: "Cementation and cleaning timing",
      description: "Dew dissolves and recrystallises soluble species in the dust layer, cementing it so dry brushing fails; clean before humid-night runs, schedule wet cleans after them, and use night stow angles to reduce deposition.",
      competency: "mz-cleaning",
      related: ["m02.soiling", "m02.wind-stow"],
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "From a calendar to a decision rule",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`A fixed calendar is what every plant already has. What Mizan can add is a decision on each day: clean now, wait, or wash instead of brush, given the measured dust and the forecast. That is a product feature an operator sees every week, and the value-of-information arithmetic tells you what it is worth before you build or buy a forecast feed.`,
        },
        {
          kind: "md",
          md: md`## The trigger rule

Lesson 1 assumed dust grows linearly forever. Real soiling has **steps** (storms), **drops** (heavy rain, strong wind) and **changes of state** (dew-cemented crust). A general rule from renewal theory handles all of them. Let $g$ be the long-run average cost per day of the best policy (cleaning plus loss). Then:`,
        },
        { kind: "equation", formula: "mz04-cleaning-trigger" },
        {
          kind: "md",
          md: md`**Why it is right.** After a cleaning the cost clock restarts. Each extra day you wait costs $pE_dL(t)$ of loss; each day of the cycle "earns" its share $g$ of the average. While today's loss is below $g$, waiting is cheaper than starting a new cycle; once it is above, every further day costs more than the average and you should restart. For linear soiling, $g = J^*/365$ and the trigger is exactly $L^* = sT^*$, so the rule reproduces the square-root rule. But it works on the **measured** loss, whatever path it took.

**Illustrative values (lesson 1 plant):** at the IPP's USD 15/MWh, $g$ = USD 4,966/day and $L^* = 12.1$ %. At the national USD 85/MWh, $g$ = USD 11,821/day and $L^* = 5.1$ %.

## Dust storms

Kuwait sees sand and dust storms on about **20 days a year** (AERONET data 2008 to 2017; a broader "dusty days" count including suspended dust is about 255 a year). Storms cluster in spring and early summer. In soiling terms a storm is a **step** $\Delta L$ in hours, plus a temporary irradiance drop from the dust in the air (the Shagaya paper reports output drops of about 30 % during storms, which mixes both effects; only the deposited part stays after the air clears).

After a storm, measure $L$ again and apply the trigger:
- If $L \ge L^*$: clean now (unless another storm is forecast within days, see below).
- If $L < L^*$: do not clean yet, but the storm has **brought the next cleaning forward** by $\Delta L/s$ days.

## Rain

Rain in Kuwait is rare and mostly falls in winter. Heavy rain can clean modules for free (a natural recovery step down). Light rain or drizzle on a dusty module can do the opposite: it wets the dust into mud that dries as a harder film. The threshold between the two depends on site, tilt and dust, so do not assume a number: measure the soiling ratio before and after each rain event and learn the site's response. Practical rule: after a heavy rain, re-measure before the next scheduled cleaning (it may be unnecessary); after a light rain on a dusty array, expect a higher residual and consider a wet clean.

## Dew and cementation

Gulf research (mostly from Qatar) shows that dew forming at night and early morning dissolves soluble species in the dust layer; as the glass dries they recrystallise and **cement** particles to the glass, so dry brushing no longer removes them. Condensation can start with the glass a few degrees **above** the weather-station dew point, so it should be measured on the glass. Night heating of the glass suppresses dew and sharply reduces cementation.

Consequences for scheduling:
1. **Clean before a run of humid nights** so less dust is present to cement.
2. **Expect the residual $r_0$ to climb** after humid periods under dry robots; trigger a **wet clean** when the residual, not the total loss, crosses its own threshold.
3. **Use night stow angles.** Tracker studies found deposition peaks at about 45° tilt towards the wind and accumulation at about 22° away from it, and recommend stowing at maximum tilt towards the wind at night; a Saudi study found an anti-soiling coating plus vertical night stow cut soiling losses by up to 85 % (stow effect not isolated). Stow logic is the subject of the tracker and stow module in this track.`,
        },
        {
          kind: "flow",
          title: "Event-driven cleaning loop",
          steps: [
            { label: "Measure", detail: "Soiling ratio from stations and inverter data, daily, by plant zone" },
            { label: "Estimate", detail: "Current loss L, soiling rate s and residual r0 with uncertainty" },
            { label: "Forecast", detail: "Dust (CAMS-type aerosol forecasts), rain, humidity and dew on glass for the next days" },
            { label: "Decide", detail: "Trigger rule, postponement threshold, dry vs wet, stow angle tonight" },
            { label: "Dispatch", detail: "Crew or robot work order for the zones that cross their trigger" },
            { label: "Verify", detail: "Soiling ratio after cleaning; update residual and cost records" },
          ],
          caption: "The loop runs daily. Most days the decision is 'wait'; the value is in the few days when it is not.",
        },
        {
          kind: "md",
          md: md`## Postponing ahead of a forecast storm

A cleaning is due today, but a storm is forecast within $\tau$ days with probability $q$. If you clean now and the storm comes, you will need another cleaning soon after: expected extra cost $qC$. If you wait $\tau$ days and clean once after the window, you pay about $g\tau$ of extra loss (today's loss value is about $g$ per day at the trigger).`,
        },
        { kind: "equation", formula: "mz04-postpone-threshold" },
        {
          kind: "md",
          md: md`The elegant form $q^* = 2\tau/T^*$ says: **owners with long intervals should postpone on weak forecasts; owners with short intervals need confident forecasts.** For a 3-day window, an IPP with $T^* = 30$ days postpones above $q^* = 0.2$; the state with $T^* = 12.7$ days only above $q^* = 0.47$.

## What a forecast is worth`,
        },
        { kind: "equation", formula: "mz04-evpi" },
        {
          kind: "md",
          md: md`A forecast earns money only when it **changes a decision**. If the climatological probability already makes one action best regardless, a forecast is worth only as much as the cases where it would reverse that action. Real forecasts have a hit rate below 1 and false alarms; their value is always below EVPI. Commercial soiling forecasts exist (for example Solcast's CAMS-based live and forecast soiling inputs), and Mizan can combine them with on-site measurement.`,
        },
        {
          kind: "widget",
          widget: "stow-decision",
          caption: "The stow decision simulator includes the soiling avoided by a steep dust stow: an example of a forecast-driven decision that trades a small energy loss against a larger expected loss.",
        },
        { kind: "sources", refs: ["mz04-r12", "mz04-r2", "mz04-r10", "mz04-r11", "mz04-r9", "mz04-r23", "mz04-r8"] },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Storms and forecasts on the 500 MWp plant",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Is a dust forecast worth buying for the IPP?",
          given: md`Lesson 1 plant at the IPP's value, USD 15/MWh: $T^* = 30.2$ days, $g$ = USD 4,966/day, $C$ = USD 75,000. A cleaning is due today. In this season the climatological probability of a re-soiling storm in any 3-day window is $q = 0.3$ (illustrative). Postponement window $\tau = 3$ days.`,
          steps: [
            { md: md`Cost of waiting: $g\tau = 4{,}966 \times 3 = 14{,}897$ USD. Threshold $q^* = 14{,}897/75{,}000 = 0.199$ (check: $2 \times 3/30.2 = 0.199$).` },
            { md: md`Without a forecast: clean now costs $C(1 + q) = 75{,}000 \times 1.3 = 97{,}500$; wait costs $75{,}000 + 14{,}897 = 89{,}897$. Best: **wait**, expected USD 89,897.` },
            { md: md`With a perfect forecast: storm coming (30 %): wait, 89,897; no storm (70 %): clean now, 75,000. Expected $0.3 \times 89{,}897 + 0.7 \times 75{,}000 = 79{,}469$.` },
            { md: md`EVPI $= 89{,}897 - 79{,}469 =$ **USD 10,428 per decision**. With about 12 cleaning decisions a year, at most about USD 125,000 a year.` },
            { md: md`Imperfect forecast (illustrative hit rate 0.7, false alarm rate 0.2): alarms on 35 % of windows; after an alarm $q = 0.6$ (wait), after no alarm $q = 0.14$ (clean now, 85,385). Expected cost 86,964: worth **USD 2,933 per decision**, under 30 % of EVPI.` },
          ],
          result: md`A perfect forecast is worth at most about USD 10k per cleaning decision to this IPP; a realistic one about USD 3k, or USD 35k a year. A forecast subscription priced above that loses money at this value of energy. At the state's value the cost of waiting is larger, so the threshold and the forecast's value change: always redo the arithmetic for the buyer.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A storm on day 10",
          given: md`Same plant, IPP value: trigger $L^* = 12.1$ %, $s = 0.4$ %/day. The plant was cleaned 10 days ago ($L = 4$ %). Case A: a storm adds 10 points. Case B: a storm adds 5 points. No further storm is forecast.`,
          steps: [
            { md: md`Case A: $L = 4 + 10 = 14$ % $> 12.1$ %: clean now. (Waiting until the calendar date on day 30 would cost about USD 115,000 of extra loss against USD 75,000 for the cleaning.)` },
            {
              md: md`Case B: $L = 9$ % $< 12.1$ %: do not clean now. Days until the trigger $= (12.1 - 9)/0.4 = 7.7$ days, so clean on about day 17.7 instead of day 30.`,
              hidden: true,
              check: { prompt: "Days after the storm until the trigger is reached (case B)", answer: 7.7, unit: "days", tolerance: { abs: 0.2 } },
            },
            {
              md: md`At the national value ($L^* = 5.1$ %), case B is above the trigger: $9 > 5.1$, so the state would clean immediately even after the smaller storm. Points above the national trigger in case B: $9 - 5.1 = 3.9$.`,
              hidden: true,
              check: { prompt: "Percentage points by which case B exceeds the national trigger", answer: 3.9, unit: "% points", tolerance: { abs: 0.15 } },
            },
          ],
          result: md`The same storm calls for different actions depending on whose value of energy drives the decision. A calendar cannot do either correctly; a measured loss and a trigger can.`,
        },
        {
          kind: "question",
          question: {
            id: "mz04-l04-p1",
            type: "numeric",
            prompt: md`A state-owned plant has an optimal interval of 12 days. A cleaning is due; a storm is forecast within 4 days. Above what storm probability should the operator postpone?`,
            answer: 0.667,
            tolerance: { abs: 0.01 },
            explanation: md`$q^* = 2\tau/T^* = 2 \times 4/12 = 0.667$. With short intervals, waiting is expensive, so only a confident forecast justifies postponing.`,
            concepts: ["mz04.storm-postponement"],
            difficulty: 2,
          },
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Running event-driven cleaning on a real plant",
      blocks: [
        {
          kind: "md",
          md: md`**What it takes in practice.**

- **A live loss estimate by zone.** Soiling stations (IEC 61724-1 soiling ratio) at several points, plus soiling extracted from inverter or string data with a weather-corrected expectation. One station for a large plant is not enough: soiling varies within plants (IEA PVPS Task 13).
- **A forecast feed.** Dust and aerosol forecasts (CAMS-based services), rain and relative humidity; ideally a glass-temperature or condensation sensor because dew on the glass is not the weather-station dew point.
- **A crew or robot contract that allows it.** Calendar-based O&M contracts often fix the number of cycles a year. Event-driven cleaning needs a call-off structure: a base number of cycles plus paid extra cycles within a response time, or a soiling-ratio standard instead of a frequency.
- **A record.** Every cleaning, rain event and storm logged with the before and after soiling ratio. That record is the training data for the next season's rules and the evidence for the savings claim.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`1. **Cleaning during the storm window**: crews clean on schedule the day before a forecast shamal and the work is wasted. 2. **Treating the storm-day output drop as soiling**: much of it is dust in the air; re-measure after the air clears. 3. **Assuming all rain cleans**: light rain can make it worse. 4. **Dry robots through a dew season** without checking the residual: the soiling ratio after cleaning slowly falls and nobody notices. 5. **Paying for a forecast that never changes a decision.**`,
        },
        {
          kind: "checklist",
          title: "Event-driven cleaning readiness",
          items: [
            "Soiling ratio measured daily in at least the plant's corners and centre, plus inverter-level estimates",
            "Trigger levels L* computed for the owner's value of energy, by season",
            "Forecast feed for dust, rain and humidity, with a measured track record at this site",
            "O&M contract with call-off cycles and a response time, or a soiling-ratio standard",
            "Residual tracked separately, with a wet-clean trigger",
            "Night stow angle policy agreed with the tracker vendor",
          ],
        },
        {
          kind: "ask",
          items: [
            "When did you last clean the day before a dust storm, and what did it cost?",
            "Do you measure the soiling ratio the day after each cleaning and after each rain?",
            "Can your O&M contract add a cleaning cycle within 48 hours, and at what price?",
            "Do you see the after-cleaning soiling ratio drift down through the winter dew season?",
          ],
        },
        { kind: "xref", to: "fc09-l06", note: "Founder Core: expected value, reversibility and value of information as general decision tools. Here they are applied to one recurring operating decision." },
        { kind: "scenario", scenario: "mz04-s2" },
        {
          kind: "feynman",
          prompt: "Explain to a KISR operations engineer why a dust forecast is only worth money when it changes what the crew does, and why the same forecast can be worth more to an IPP than to the state.",
          keyPoints: [
            "A forecast has value only if, in some outcomes, it makes you choose a different action than you would without it",
            "The choice is between cleaning now (risking a wasted cycle if a storm comes) and waiting (paying extra loss for a few days)",
            "The postponement threshold is 2τ/T*: with long intervals waiting is cheap, so forecasts change decisions more often",
            "At the state's higher value of energy waiting is expensive, so the bar for postponing is higher",
            "Real forecasts miss and false-alarm; their value is below the perfect-information ceiling and must exceed their cost",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz04-l04-p2",
            type: "short",
            prompt: md`Draft the decision rules Mizan's product would apply each evening at a Kuwaiti PV plant (a one-page "cleaning dispatch logic" spec for the engineering team). Cover the normal trigger, storms, postponement ahead of a forecast, rain and dew, and what data each rule needs.`,
            rubric: [
              "Normal trigger stated correctly: clean a zone when p·E_d·L reaches the average cost per day g (equivalently L ≥ L* = sT* for linear soiling), with L* computed for the owner's value of energy",
              "Storm rule: re-measure after the air clears, clean if above trigger, otherwise bring the next cleaning forward",
              "Postponement rule with threshold q* = gτ/C (or 2τ/T*) and the forecast inputs it needs",
              "Rain and dew rules: re-measure after heavy rain, treat light rain and dew runs as residual risks, wet-clean trigger on the residual, clean before humid runs, night stow",
              "Data requirements per rule (soiling ratio by zone, inverter-based estimates, dust and humidity forecasts, glass condensation, cleaning log)",
              "Specifies outputs and logging (work order per zone, reason code, before and after soiling ratio)",
            ],
            modelAnswer: md`**Cleaning dispatch logic v0 (spec).** Inputs each evening per zone: current soiling loss $L$ and residual $r_0$ (soiling stations plus inverter-based estimate, weather-corrected), soiling rate $s$ (rolling 14-day fit), forecast for 5 days (dust probability by day, rain mm, relative humidity, predicted glass condensation), owner's value of energy $p$, cost per cycle $C$, crew or robot availability. **Rule 1, normal trigger:** compute $g$ from the season's optimum ($g = 2C/T^*$ for linear soiling) and $L^* = g/(pE_d)$; dispatch a dry clean for any zone with $L \ge L^*$. **Rule 2, postponement:** if a zone is due and the forecast probability of a re-soiling storm within $\tau$ days exceeds $q^* = g\tau/C$, postpone and re-evaluate daily; never postpone more than $\tau_{\max}$ days. **Rule 3, storms:** after a storm, wait until aerosol clears (irradiance-based check), re-measure, then apply Rule 1; if below trigger, the next due date moves forward by $\Delta L/s$. **Rule 4, rain:** after rain above the site's learned cleaning threshold, re-measure before any dispatch; after light rain on dusty glass, flag residual risk. **Rule 5, dew and cementation:** if two or more condensation nights are forecast, bring forward dry cleans of zones above half their trigger; if $r_0$ exceeds its own threshold (computed like $L^*$ with the wet-clean cost), dispatch a wet clean. **Rule 6, stow:** request the night stow angle that minimises deposition when wind and dust are forecast (with tracker vendor limits). **Outputs:** work orders per zone with a reason code (trigger, post-storm, residual, pre-dew), predicted energy recovered, and an automatic before and after soiling-ratio record for verification.`,
            explanation: md`The spec must translate the economics into rules that a developer can implement, each tied to data the plant can actually provide, and must log what is needed to prove the savings later.`,
            concepts: ["mz04.cleaning-trigger", "mz04.storm-postponement", "mz04.cementation-timing", "mz04.event-driven-cleaning"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz04-l04-q1",
      type: "mcq",
      prompt: md`The trigger rule says to clean when:`,
      options: [
        "The calendar date is reached",
        "Today's value of soiling loss per day reaches the policy's long-run average cost per day",
        "Soiling loss exceeds 2 %",
        "A dust storm is forecast",
      ],
      answer: 1,
      explanation: md`$pE_dL(t) \ge g$. For linear soiling this gives $L^* = sT^*$; it also handles storm steps and rain drops.`,
      concepts: ["mz04.cleaning-trigger"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz04-l04-q2",
      type: "numeric",
      prompt: md`An IPP's optimal interval is 30 days at 0.4 %/day. Five days after a cleaning a storm adds 6 points of soiling loss. How many days after the storm should the next cleaning be, assuming no further events?`,
      answer: 10,
      tolerance: { abs: 0.2 },
      unit: "days",
      explanation: md`Trigger $L^* = 0.4 \times 30 = 12$ %. After the storm $L = 2 + 6 = 8$ %. Days to trigger $= (12 - 8)/0.4 = 10$. The storm brought the cleaning forward from day 30 to day 15.`,
      concepts: ["mz04.cleaning-trigger"],
      difficulty: 2,
    },
    {
      id: "mz04-l04-q3",
      type: "numeric",
      prompt: md`Optimal interval 20 days. A cleaning is due; a storm is forecast within 2 days. What is the postponement threshold probability?`,
      answer: 0.2,
      tolerance: { abs: 0.005 },
      explanation: md`$q^* = 2\tau/T^* = 4/20 = 0.2$. Postpone if the forecast probability exceeds 20 %.`,
      concepts: ["mz04.storm-postponement"],
      difficulty: 2,
    },
    {
      id: "mz04-l04-q4",
      type: "multi",
      prompt: md`Which statements about dew and cementation are supported by Gulf research? (Select all.)`,
      options: [
        "Dew can dissolve and recrystallise species in the dust, cementing it to the glass",
        "Cemented dust is easily removed by dry brushing",
        "Condensation can start with the glass above the weather-station dew point",
        "Night heating of the glass suppresses dew and reduces cementation",
        "The mineralogy of the cementing crystals is fully settled",
      ],
      answer: [0, 2, 3],
      explanation: md`Cemented dust resists dry brushing; the mineralogy (palygorskite vs Si/Mg/Al oxides) is still debated.`,
      concepts: ["mz04.cementation-timing"],
      difficulty: 2,
    },
    {
      id: "mz04-l04-q5",
      type: "mcq",
      prompt: md`Without any forecast, the best action for a decision is already "wait" in every plausible case. What is a forecast worth for this decision?`,
      options: ["Its EVPI, which is always positive", "Nothing: it cannot change the action", "The cost of one cleaning", "The value of energy times the storm probability"],
      answer: 1,
      explanation: md`Information has value only if some signal would make you choose differently. Here every signal leads to the same action.`,
      concepts: ["mz04.value-of-forecast"],
      difficulty: 2,
    },
    {
      id: "mz04-l04-q6",
      type: "order",
      prompt: md`Order the event-driven cleaning loop.`,
      items: ["Measure soiling ratio by zone", "Estimate current loss and residual", "Read dust, rain and humidity forecasts", "Apply trigger and postponement rules", "Dispatch crew or robots", "Verify the soiling ratio after cleaning"],
      explanation: md`Measure, estimate, forecast, decide, dispatch, verify; the verification closes the loop and feeds the savings record.`,
      concepts: ["mz04.event-driven-cleaning"],
      difficulty: 1,
    },
    {
      id: "mz04-l04-q7",
      type: "decision",
      prompt: md`Day 14 after a cleaning at a state-owned plant (trigger 5 %, soiling 0.4 %/day). A shamal is forecast within 2 days with probability 0.8; the national optimum interval is 12.7 days. What do you do?`,
      options: [
        { text: "Clean now: the plant is above the trigger", score: 0.4, feedback: "It is above the trigger, but q = 0.8 exceeds q* = 2×2/12.7 = 0.31, so the cleaning would likely be wasted." },
        { text: "Postpone, re-measure after the storm clears, then clean", score: 1, feedback: "The forecast is strong enough to postpone even at the state's value; clean once after the event." },
        { text: "Cancel cleanings until the end of the dust season", score: 0, feedback: "Loss value accumulates far beyond the cleaning cost." },
        { text: "Wet-clean now to prevent cementation", score: 0.2, feedback: "The storm risk is the issue, not dew; a wet clean now is the most expensive way to waste a cycle." },
      ],
      explanation: md`Apply $q^* = 2\tau/T^* = 0.31$: with $q = 0.8$ postponing wins, at the cost of about two days of extra loss.`,
      concepts: ["mz04.storm-postponement", "mz04.cleaning-trigger"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "mz04-l04-f1", front: "Trigger rule", back: md`Clean when $pE_dL \ge g$; linear case $L^* = sT^*$.`, concepts: ["mz04.cleaning-trigger"] },
    { id: "mz04-l04-f2", front: "Storm below the trigger", back: md`Do not clean yet; the next cleaning moves forward by $\Delta L/s$ days.`, concepts: ["mz04.cleaning-trigger"] },
    { id: "mz04-l04-f3", front: "Postponement threshold", back: md`$q^* = g\tau/C = 2\tau/T^*$`, concepts: ["mz04.storm-postponement"] },
    { id: "mz04-l04-f4", front: "Kuwait dust storm frequency (AERONET 2008 to 2017)", back: "About 20 sand and dust storm days a year; about 255 'dusty days' on a broader definition.", concepts: ["mz04.event-driven-cleaning"] },
    { id: "mz04-l04-f5", front: "Dew and dry robots", back: "Dew cements dust; dry brushing then fails and the residual climbs until a wet clean.", concepts: ["mz04.cementation-timing"] },
    { id: "mz04-l04-f6", front: "EVPI of a dust forecast (illustrative IPP)", back: "About USD 10k per cleaning decision; a realistic forecast about USD 3k.", concepts: ["mz04.value-of-forecast"] },
    { id: "mz04-l04-f7", front: "Night stow evidence", back: "Deposition peaks near 45° tilt towards the wind; recommendation: stow at maximum tilt towards the wind at night (Figgis 2019).", concepts: ["mz04.cementation-timing"] },
  ],
  scenarios: [
    {
      id: "mz04-s2",
      title: "Shamal on Thursday",
      dayInLife: true,
      context: md`Monday evening, illustrative 500 MWp plant, IPP value of energy (trigger 12.1 %, $T^* = 30$ days, $C$ = USD 75,000). Zone 3 is at 12.5 % soiling loss and due tonight. The forecast gives a 40 % chance of a dust storm on Thursday (3 days away).`,
      start: "a",
      concepts: ["mz04.storm-postponement", "mz04.value-of-forecast", "mz04.cleaning-trigger"],
      nodes: {
        a: {
          md: md`The O&M supervisor asks whether to send the night crew to Zone 3.`,
          choices: [
            { text: "Postpone: q = 0.4 is above q* = 2×3/30 = 0.2; re-measure after Thursday", next: "b", score: 10, feedback: "Correct use of the threshold at the IPP's value." },
            { text: "Clean now: it is above the trigger", next: "c", score: 4, feedback: "Right without a forecast, but with q = 0.4 the expected waste of a cycle (USD 30,000) exceeds three days of extra loss (about USD 15,000)." },
          ],
        },
        b: {
          md: md`Thursday: no storm. The forecast was a false alarm. The asset manager asks whether the forecast service is worth keeping.`,
          choices: [
            { text: "Judge it over the season: count decisions it changed and compute realised savings against its cost, not this one miss", score: 10, feedback: "A single false alarm says little; value is a seasonal average against the subscription price." },
            { text: "Cancel it: it was wrong", score: 3, feedback: "Every useful forecast is sometimes wrong; judge it on expected value." },
          ],
        },
        c: {
          md: md`Thursday: the storm comes. Zone 3 is at 11 % again on Friday after the air clears.`,
          choices: [
            { text: "Do not clean yet: 11 % is below the trigger; schedule for about 3 days later", score: 8, feedback: "Recovers well: apply the trigger to the measured loss, not to regret." },
            { text: "Clean immediately to make up for it", score: 3, feedback: "Below the trigger, an immediate clean is again uneconomic." },
          ],
        },
      },
    },
  ],
};

export default lesson;
