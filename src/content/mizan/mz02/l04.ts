import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz02-l04",
  title: "Measurement uncertainty and what it means for cleaning decisions",
  summary:
    "Where the uncertainty in PR and soiling numbers comes from (irradiance sensors, temperature, nameplate, metering), why changes are known far better than absolute values, the data filters that make a series usable (with numbers), how precisely a soiling rate can be estimated, and why the economics of cleaning are forgiving of small errors but not of missed events. Connects soiling measurement to the P50/P90 of a yield assessment.",
  minutes: 80,
  objectives: [
    "Build an uncertainty budget for an absolute PR and for a change in PR, and explain why they differ",
    "Specify data filters (irradiance, temperature, clipping, availability, stability, sensor agreement) with stated thresholds",
    "Compute the standard error of a soiling-rate estimate and the cleaning delay caused by a soiling-ratio bias",
    "Use the flat optimum of the cleaning cost curve to decide which measurement errors matter for the decision",
    "Quantify how better soiling data changes the soiling term of a P50/P90 assessment",
  ],
  concepts: [
    {
      id: "mz02.absolute-vs-relative",
      name: "Absolute vs relative uncertainty",
      description: "Bias terms (calibration, nameplate) dominate an absolute PR but largely cancel in a change measured with the same sensors; trends and soiling are change measurements.",
      competency: "mz-soiling",
      related: ["mz02.weather-corrected-pr", "m12.data-quality"],
    },
    {
      id: "mz02.data-filters",
      name: "Data filters",
      description: "Rules that exclude intervals with low or extreme irradiance, implausible temperatures, clipping, outages or curtailment, unstable sky, frozen or disagreeing sensors before PR or SR is computed.",
      competency: "mz-soiling",
      related: ["mz02.pr-residual", "m14.data-sanity"],
    },
    {
      id: "mz02.detection-limit",
      name: "Soiling-rate precision and detection limit",
      description: "Standard error of a slope falls with n to the power 3/2; short intervals between cleanings or storms give poor rate estimates.",
      competency: "mz-soiling",
      related: ["mz02.soiling-rate"],
    },
    {
      id: "mz02.flat-optimum",
      name: "Flat optimum of cleaning cost",
      description: "Total cost near the optimal interval changes slowly (20 % interval error costs about 2 %), so the value of measurement lies in detecting rate changes and events, not in fine-tuning the average.",
      competency: "mz-cleaning",
      related: ["m02.cleaning-strategy", "m12.cleaning-economics"],
    },
    {
      id: "mz02.soiling-uncertainty-yield",
      name: "Soiling term in P50/P90",
      description: "The soiling uncertainty component of an energy yield assessment shrinks with site soiling data, raising P90; small in MWh, real in lender terms.",
      competency: "mz-soiling",
      related: ["m02.p50-p90"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "Where the uncertainty comes from",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`A soiling analytics product sells a decision: clean now, or wait. If Mizan says "soiling cost 4 %" without saying "±1 %", a sceptical O&M contractor will find the error bar for you, in a meeting. If you can say which errors move the decision and which do not, you can argue for the right instruments, refuse to overpromise, and show KISR a methodology that knows its own limits, which is the core of a credible co-publication.`,
        },
        {
          kind: "md",
          md: md`### The main sources

**Irradiance.** Every normalised metric divides by it.
- **Pyranometers** (thermopile, broadband, classified by ISO 9060:2018 as Class A, B or C, with "spectrally flat" sub-categories for POA use). Well-maintained Class A instruments are commonly quoted at about 2 % uncertainty on daily sums, more on short intervals. Dust on the dome adds a bias of the same order within days in Kuwait if not cleaned.
- **Reference cells** (a calibrated PV cell, usually Isc-based). Their spectral and angular response is close to the modules', so PR computed with them is less seasonal; a matched-technology cell tracks a thin-film array better than a c-Si cell does. PR computed from a pyranometer and from a reference cell can differ by a few percent: never switch sensor type mid-study.
- **POA vs horizontal**: measuring in the plane of array avoids transposition-model error (1.5 to 2.5 % in Track 0's yield table).

**Temperature.** 1 K in cell temperature is 0.3 to 0.45 % of expected energy. Sources: sensor accuracy (small), sensor position and bonding (large), the back-to-cell $\Delta T$, the model when modelled.

**Nameplate and degradation.** $P_{STC}$ from the datasheet carries flash-test and binning uncertainty (often 1 to 3 %), and real modules degrade. This term sits in the absolute PR but not in a change.

**Energy.** Revenue meters (accuracy class 0.2S or 0.5S) are the most accurate number in the plant; inverter-reported energy is less accurate and must be reconciled with the meter.

### Absolute PR vs a change in PR

| Component | Absolute PR (1σ) | Month-to-month change, same sensors (1σ) |
|---|---|---|
| Meter | 0.2 % | cancels |
| Irradiance calibration | 2.0 % | cancels (same instrument) |
| Irradiance sensor soiling and drift | in the 2.0 % | 0.5 % |
| Nameplate $P_{STC}$ | 1.5 % | cancels |
| Temperature correction | 0.4 % | 0.3 % |
| **Combined (RSS)** | **2.5 %** | **0.6 %** |

Illustrative values, combined by root-sum-square of independent terms. An absolute PR of 0.80 is known to about ±0.02 (1σ); a 3 % drop in PR between cleanings is clearly visible. **Soiling is a change measurement.** That is why a soiling product can be useful on a plant whose absolute PR is uncertain, provided the sensors are not changed, recalibrated or cleaned on a different schedule mid-interval.`,
        },
        { kind: "equation", formula: "mz02-rss" },
        {
          kind: "md",
          md: md`### Data filters (with numbers)

Filters remove intervals where the model behind PR or SR does not hold. Every threshold must be written down and frozen for a study.

| Filter | Typical threshold | Why |
|---|---|---|
| POA irradiance | Keep 200 to 1,200 W/m² (RdTools default for normalised energy); 600 W/m² or more for soiling-station noon windows | Low light: inverter and spectral effects, high relative error; above 1,200: sensor fault or cloud enhancement |
| Cell temperature | Keep -50 to 110 °C (RdTools default) | Physically implausible values are sensor faults |
| Clipping | Exclude intervals with AC power at the inverter limit (for example above 98 to 99 % of rating) or flagged | Output is capped by the inverter, not by dust |
| Availability and curtailment | Exclude any interval with an inverter fault, a grid curtailment flag or export limit | An outage looks like a huge soiling loss |
| Sky stability | Exclude intervals where POA changes by more than a few percent between consecutive minutes (illustrative) | Cloud edges and sensor time offsets distort ratios |
| Sensor agreement | Flag when redundant POA sensors differ by more than 2 to 3 % (illustrative) | One sensor is dirty or failing |
| Frozen signals | Flag identical values for more than about 10 consecutive intervals (illustrative) | Logger or communication fault |
| Day validity | Use a day only if enough valid intervals remain (for example 60 noon-window minutes, or 80 to 90 % of daylight intervals) | Prevents a few readings from deciding a daily value |

RdTools default values are from its documentation; check the version you use. The illustrative thresholds are starting points for the methodology, not standards.`,
        },
        { kind: "sources", refs: ["mz02-iso-9060-2018", "mz02-jcgm-gum", "mz02-rdtools-srr", "mz02-iec-61724-1-2021"] },
      ],
    },
    {
      layer: "theory",
      title: "From uncertainty to the cleaning decision",
      blocks: [
        {
          kind: "md",
          md: md`### How precisely can you estimate a soiling rate?

Fit a straight line through $n$ daily SR values with day-to-day scatter $\sigma$:`,
        },
        { kind: "equation", formula: "mz02-slope-se" },
        {
          kind: "md",
          md: md`| Days in the interval | SE of rate ($\sigma = 1$ %) | 95 % half-width |
|---|---|---|
| 10 | 0.110 %/day | 0.22 %/day |
| 20 | 0.039 %/day | 0.08 %/day |
| 30 | 0.021 %/day | 0.04 %/day |

The Qatar multi-year study reports soiling rates of about 0.43 to 0.46 %/day with a spread of about 1 %/day, and natural recovery on a quarter of days: day-to-day scatter of order 1 % is realistic in the Gulf. With a monthly cleaning cycle, one interval gives a rate to about ±0.04 %/day; an interval cut short by a storm at day 10 gives almost nothing.

### How much does a wrong number cost?

For linear soiling, total annual cost at cleaning interval $T$ is cleaning cost $365\,C_{cl}/T$ plus the value of the average loss $A\,r\,T/2$. The optimum $T^*$ makes the two equal (Track 0, m02-l05), and around it:`,
        },
        { kind: "equation", formula: "mz02-cost-ratio" },
        {
          kind: "chart",
          chart: "line",
          title: "Extra annual cost of cleaning at the wrong interval",
          xKey: "ratio",
          xLabel: "T / T* (interval relative to optimum)",
          yLabel: "extra cost (%)",
          series: [{ key: "penalty", label: "extra cost vs optimum (%)" }],
          data: [
            { ratio: 0.4, penalty: 45 }, { ratio: 0.5, penalty: 25 }, { ratio: 0.6, penalty: 13.3 }, { ratio: 0.7, penalty: 6.4 }, { ratio: 0.8, penalty: 2.5 }, { ratio: 0.9, penalty: 0.6 }, { ratio: 1, penalty: 0 }, { ratio: 1.1, penalty: 0.5 }, { ratio: 1.25, penalty: 2.5 }, { ratio: 1.5, penalty: 8.3 }, { ratio: 1.75, penalty: 16.1 }, { ratio: 2, penalty: 25 }, { ratio: 2.5, penalty: 45 },
          ],
          caption: "From C(T)/C(T*) = (T/T* + T*/T)/2. The bottom is flat: ±20 % on the interval costs about 2.5 %. Doubling or halving it costs 25 %.",
        },
        {
          kind: "md",
          md: md`Two consequences shape the product:

1. **Fine precision on the average rate is worth little.** Because $T^* \propto r^{-1/2}$, a 20 % error in $r$ moves $T^*$ by about 10 % and costs about 0.5 %.
2. **Large errors are expensive, and they come from events, not from noise.** The soiling rate in the Gulf changes by season (dew-driven cementation in winter, dust storms in spring and summer); a single storm can cut output by about 30 % at once (Shagaya paper). If the rate doubles for a season, $T^*$ shrinks by $\sqrt{2}$ and a fixed schedule sits at $T/T^* \approx 1.4$ (about 6 % extra cost for that season); a storm step is worse, a large loss carried until the next scheduled pass. Detecting **changes** in rate and **steps** quickly is where measurement pays.

### Bias and the threshold rule

With a rule "clean when SR falls below a threshold", a bias $b_{SR}$ in the measured SR delays (or advances) cleaning:`,
        },
        { kind: "equation", formula: "mz02-trigger-delay" },
        {
          kind: "md",
          md: md`A station reading 1 point too clean at 0.3 %/day cleans 3.3 days late on a 30-day optimum, $T/T^* \approx 1.1$, costing about 0.5 %. The same 1-point bias on a 0.1 %/day site delays cleaning 10 days. Biases matter most where soiling is slow, and cementation risk makes some delays more costly than the linear model suggests: dust that has been through dew cycles can resist dry brushing.

### Soiling and P50/P90

Track 0 lists soiling as a P50/P90 uncertainty component of 2 to 3 % without site data and 1 to 2 % with at least 12 months of site data. On the illustrative long-term budget of m02-l06 (resource 3.5, transposition 2.0, PV model 3.0, degradation 1.0, availability 1.0 %, interannual variability 3.0 %), cutting soiling from 2.5 % to 1.5 % lowers the 10-year combined σ from 5.87 % to 5.51 %. On a 10 MWp plant with P50 = 20,000 MWh/yr (illustrative), 10-year P90 rises from about 18,500 to 18,590 MWh: about 0.5 %. Small for one plant; for a GW-scale bid it is real debt capacity, and it is the argument for measuring soiling **before** a tender.`,
        },
        {
          kind: "xref",
          to: "m02-l06",
          note: "The P50/P90 method, uncertainty table and 1-year vs 10-year distinction used above.",
        },
        {
          kind: "widget",
          widget: "p50-p90",
          props: { p50: 20000, sigma: 5.9 },
          caption: "Illustrative 10 MWp plant. Lower σ from 5.9 % to 5.5 % (better soiling data) and read the P90 gain. Then try 7 % (no site data at all).",
        },
        { kind: "sources", refs: ["mz02-qatar-multiyear-2020", "mz02-rser-2020-shagaya", "mz02-fares-2021-gcc"] },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "Uncertainty arithmetic for a soiling decision",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Can we see a 3 % soiling drop on a plant whose PR is uncertain?",
          given: md`Illustrative plant, corrected PR computed with one Class A POA pyranometer. Absolute budget (1σ): meter 0.2 %, irradiance 2.0 %, nameplate 1.5 %, temperature 0.4 %. For a change over one cleaning interval with the same sensors: sensor soiling and drift 0.5 %, temperature 0.3 %. The corrected PR falls from 0.800 just after cleaning to 0.776 before the next one.`,
          steps: [
            { md: md`**Absolute**: $u = \sqrt{0.2^2 + 2.0^2 + 1.5^2 + 0.4^2} = \sqrt{6.45} = 2.54$ %, i.e. PR $0.800 \pm 0.020$ (1σ).` },
            { md: md`**Change**: $u = \sqrt{0.5^2 + 0.3^2} = 0.58$ % relative.` },
            { md: md`**Observed drop**: $(0.800 - 0.776)/0.800 = 3.0$ %. Expanded change uncertainty ($k = 2$): $\pm 1.2$ %. The drop is about 5 standard uncertainties: real.` },
            { md: md`**Absolute claim**: "the plant is at PR 0.776" carries ±0.02 (1σ), so it cannot prove a guarantee breach of 0.78 by itself.` },
          ],
          result: md`The soiling drop (3.0 ± 1.2 %, k = 2) is clearly measurable; the absolute PR (0.78 ± 0.04, k = 2) is not precise enough to settle a guarantee. Keep sensors and their cleaning schedule unchanged within an interval, or the change measurement inherits the absolute uncertainty.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Rate precision and the interval it implies",
          given: md`A station gives 15 daily SR values in an interval with scatter $\sigma = 0.8$ % and a fitted rate of 0.30 %/day. The cleaning optimum computed at 0.30 %/day is $T^* = 30$ days.`,
          steps: [
            { md: md`**Sum of squares**: $n(n^2 - 1)/12 = 15 \times 224/12 = 280$.` },
            {
              md: md`**SE of the rate**: $0.8/\sqrt{280} = 0.048$ %/day; 95 % interval $0.30 \pm 0.094$, i.e. 0.21 to 0.39 %/day.`,
              hidden: true,
              check: { prompt: "Standard error of the rate (%/day)", answer: 0.0478, unit: "%/day", tolerance: { abs: 0.001 } },
            },
            { md: md`**Implied optimum range**: $T^* \propto r^{-1/2}$, so $30\sqrt{0.30/0.394} = 26.2$ to $30\sqrt{0.30/0.206} = 36.2$ days.` },
            {
              md: md`**Worst-case cost penalty** if the true optimum is at the edge and you clean every 30 days: at $T/T^* = 30/26.2 = 1.15$ or $30/36.2 = 0.83$, the penalty is $(x + 1/x)/2 - 1$, about 1.0 % and 1.8 %.`,
              hidden: true,
              check: { prompt: "Penalty at T/T* = 0.83 (%)", answer: 1.76, unit: "%", tolerance: { abs: 0.1 } },
            },
          ],
          result: md`A rate known to ±30 % still sets the interval to within about 2 % of the best cost. More days per interval would not change the decision; detecting a storm step or a seasonal rate change would.`,
        },
        {
          kind: "question",
          question: {
            id: "mz02-l04-p1",
            type: "numeric",
            prompt: md`Independent problem. A plant is cleaned every 45 days but its optimal interval is 30 days. What is the extra annual cost (cleaning plus soiling loss) above the optimum, in %?`,
            answer: 8.33,
            tolerance: { abs: 0.05 },
            unit: "%",
            explanation: md`$x = 1.5$: $(1.5 + 1/1.5)/2 = (1.5 + 0.667)/2 = 1.0833$, so 8.3 % above the minimum total cost.`,
            concepts: ["mz02.flat-optimum"],
            difficulty: 1,
          },
        },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "Stating uncertainty to clients and partners",
      blocks: [
        {
          kind: "md",
          md: md`**How it is done well.** Each reported number carries its uncertainty, coverage factor and the main contributors; methods follow the GUM; filters and parameters are frozen before results are seen; code is versioned so a partner can rerun it. For a cleaning recommendation, report the decision, its expected value and how robust it is ("cleaning the upwind blocks this week is worth X MWh; the decision holds for any soiling rate between A and B").

**What goes wrong**: changing a sensor or its cleaning routine mid-interval; tuning filters until the result looks right; reporting a soiling loss to one decimal place from one station; ignoring that the irradiance sensor soils with the plant.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Uncertainty traps in soiling analytics",
          md: md`- **The irradiance sensor soils too.** If POA sensors and modules soil at similar rates, PR stays flat while energy falls. Clean irradiance sensors daily and log it, or use a soiling-station ratio that does not depend on them.
- **Precision theatre.** Quoting 4.37 % soiling loss when the plant-average uncertainty is ±0.8 %.
- **Post-hoc filters.** Changing thresholds after seeing the result. Freeze them in the methodology.
- **Ignoring correlation.** Treating each day as independent when consecutive days share the same bias.`,
        },
        {
          kind: "checklist",
          title: "Before a cleaning recommendation leaves Mizan",
          items: [
            "Every number has an uncertainty with k stated and the main contributors named",
            "Filters and thresholds match the frozen methodology",
            "Irradiance sensor cleaning log checked for the analysis period",
            "Recent dust events detected and treated as steps, not slope",
            "The recommendation is tested against the low and high end of the rate estimate",
            "The value of the decision is stated in MWh and currency with the price assumption",
          ],
        },
        {
          kind: "ask",
          title: "Ask the plant owner when requesting data",
          items: [
            "Which irradiance sensors (pyranometer class or reference cell, technology) are in POA, and where are their calibration certificates?",
            "When were sensors cleaned, recalibrated or replaced during the period?",
            "Are availability, curtailment and alarm logs available with timestamps?",
            "Is the revenue meter data available at the same interval as inverter data?",
            "Were any inverters, strings or modules replaced or re-rated during the period?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz02-l04-p2",
            type: "decision",
            prompt: "A client's single station reads SR 0.965 (3.5 % loss) and your threshold rule says clean at 0.96. The station's expanded uncertainty is ±1.4 points, a dust storm is forecast in two days, and a full cleaning pass costs the equivalent of about four days of the current soiling loss. What do you recommend?",
            options: [
              { text: "Wait for the storm to pass, then clean immediately after it; meanwhile check the station against inverter-level corrected PR", score: 1, feedback: "Best: cleaning before a storm wastes the pass, the threshold is within the measurement uncertainty, and the post-storm cleaning captures both the accumulated and the storm loss." },
              { text: "Clean now: the rule is nearly triggered", score: 0.3, feedback: "The storm will re-soil the plant within days; you pay for a pass and lose its benefit." },
              { text: "Ignore the rule until the station reads below 0.96 with certainty", score: 0.2, feedback: "Waiting for certainty with ±1.4 points of uncertainty means waiting too long, and ignores the forecast." },
              { text: "Order a second station before deciding", score: 0.3, feedback: "Useful for the future, irrelevant to this week's decision." },
            ],
            explanation: md`Decisions under measurement uncertainty should use all information: the threshold, the uncertainty band, the forecast and the cost of a pass. Event awareness beats precision on the average rate.`,
            concepts: ["mz02.flat-optimum", "mz02.absolute-vs-relative"],
            difficulty: 2,
          },
        },
        {
          kind: "question",
          question: {
            id: "mz02-l04-p3",
            type: "short",
            prompt: md`Applied exercise. Write the **"Uncertainty and decision robustness"** box (150 to 250 words) that would sit on the first page of a Mizan monthly soiling report for a client plant. Use illustrative numbers, labelled as such, and show the client which errors affect the cleaning recommendation and which do not.`,
            rubric: [
              "Gives the soiling loss with an uncertainty, coverage factor and main contributors (spatial, station, irradiance)",
              "Distinguishes the absolute PR uncertainty from the uncertainty of the change used for soiling",
              "Shows the recommendation's robustness across the rate uncertainty using the flat optimum",
              "Names the event risks (dust storm, cementation) and what is done about them",
              "States filters and data exclusions briefly, and labels numbers as illustrative",
            ],
            modelAnswer: md`**Uncertainty and decision robustness (illustrative numbers).** Average soiling loss across the plant this month: **3.8 % ± 1.7 % (k = 2)**, from four stations cross-checked with inverter-level corrected PR. The largest contributor is variation between plant zones (upwind blocks lose about twice the interior), not sensor accuracy. The plant's absolute PR is known only to about ±5 % (k = 2) because of irradiance calibration and nameplate tolerance; this does not affect the soiling estimate, which is a change measured with the same sensors, known to about ±1.2 %.

**Recommendation**: keep the 28-day cleaning cycle for interior blocks and move the upwind blocks to 20 days. This holds for any soiling rate between 0.22 and 0.40 %/day (our 95 % range): across that range the cost penalty of the chosen intervals stays below 2 %.

**Event risk**: a dust storm cuts output in hours. We flag storms from the station and inverter data within a day and recommend a post-storm pass when the recovered energy over the remaining cycle exceeds the pass cost. Winter dew increases the risk of cemented dust; we will compare dry and wet passes on two test blocks in January.

**Data**: 15-minute data, POA 200 to 1,200 W/m², outages, curtailment and clipping excluded; 94 % of daylight intervals valid this month.`,
            explanation: md`A client needs to know which uncertainty affects his decision. Splitting absolute from relative uncertainty, showing robustness over the rate range and naming event risk gives him that in one box.`,
            concepts: ["mz02.absolute-vs-relative", "mz02.flat-optimum", "mz02.data-filters"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a KISR co-author why a plant whose absolute PR is uncertain by ±5 % can still measure a 3 % soiling loss reliably, and what would break that.",
          keyPoints: [
            "Calibration and nameplate errors are the same before and after the soiling interval, so they cancel in the change",
            "What remains is sensor drift, sensor soiling and temperature correction error over the interval",
            "That relative uncertainty is well under 1 %",
            "It breaks if sensors are recalibrated, replaced or cleaned on a different schedule within the interval",
            "It also breaks if outages, clipping or curtailment are not filtered",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz02-l04-q1",
      type: "mcq",
      prompt: "Which uncertainty component largely cancels when you measure a change in corrected PR between two cleanings with the same sensors?",
      options: ["Irradiance sensor calibration", "Soiling of the irradiance sensor during the interval", "Noise from cloud edges", "Unfiltered inverter outages"],
      answer: 0,
      explanation: md`A constant calibration error scales both ends of the interval equally. Sensor soiling changes during the interval and does not cancel; outages are a filter failure, not an uncertainty.`,
      concepts: ["mz02.absolute-vs-relative"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz02-l04-q2",
      type: "numeric",
      prompt: md`Daily SR scatter is 1 % and an interval has 20 equally spaced daily values. What is the standard error of the fitted soiling rate in %/day?`,
      answer: 0.0388,
      tolerance: { abs: 0.001 },
      unit: "%/day",
      explanation: md`$\sum (t - \bar t)^2 = 20 \times 399/12 = 665$; $SE = 1/\sqrt{665} = 0.039$ %/day.`,
      concepts: ["mz02.detection-limit"],
      difficulty: 2,
    },
    {
      id: "mz02-l04-q3",
      type: "numeric",
      prompt: md`A station reads 1.5 points too clean. The soiling rate is 0.25 %/day and the rule is "clean when SR < 0.95". How many days late is the cleaning?`,
      answer: 6,
      tolerance: { abs: 0.05 },
      unit: "days",
      explanation: md`$\Delta t = b_{SR}/r = 1.5/0.25 = 6$ days.`,
      concepts: ["mz02.flat-optimum"],
      difficulty: 1,
    },
    {
      id: "mz02-l04-q4",
      type: "multi",
      prompt: "Which intervals should be excluded before computing a daily corrected PR for soiling analysis?",
      options: [
        "POA irradiance of 120 W/m²",
        "AC power at the inverter limit",
        "An export curtailment flag",
        "Cell temperature of 68 °C",
        "Two POA sensors disagreeing by 6 %",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Low light, clipping, curtailment and disagreeing sensors all break the PR model. 68 °C is a normal Kuwait summer cell temperature and is exactly what the correction handles.`,
      concepts: ["mz02.data-filters"],
      difficulty: 1,
    },
    {
      id: "mz02-l04-q5",
      type: "mcq",
      prompt: "Why is a 20 % error in the average soiling rate not very costly for a fixed cleaning interval?",
      options: [
        "The optimal interval scales with the inverse square root of the rate and the cost curve is flat near the optimum",
        "Soiling rates do not affect cleaning economics",
        "Cleaning costs are always larger than soiling losses",
        "Plants are always cleaned too often",
      ],
      answer: 0,
      explanation: md`20 % on $r$ is about 10 % on $T^*$, which costs about 0.5 %. What is costly is missing a seasonal doubling of the rate or a storm.`,
      concepts: ["mz02.flat-optimum"],
      difficulty: 2,
    },
    {
      id: "mz02-l04-q6",
      type: "mcq",
      prompt: "The irradiance sensors at a plant are cleaned only when the modules are cleaned. What does this do to a PR-based soiling estimate?",
      options: [
        "It underestimates soiling, because PR stays flatter while sensors and modules soil together",
        "It overestimates soiling",
        "Nothing, because PR is a ratio",
        "It only adds noise",
      ],
      answer: 0,
      explanation: md`Both numerator and denominator fall; the corrected PR understates the loss. Daily sensor cleaning, or a station-based SR, avoids it.`,
      concepts: ["mz02.absolute-vs-relative", "mz02.data-filters"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz02-l04-f1", front: "Absolute PR uncertainty vs change uncertainty (illustrative)", back: "About 2.5 % vs about 0.6 % (1σ): calibration and nameplate cancel in a change.", concepts: ["mz02.absolute-vs-relative"] },
    { id: "mz02-l04-f2", front: "RdTools default POA filter", back: "200 to 1,200 W/m² (check the version's documentation).", concepts: ["mz02.data-filters"] },
    { id: "mz02-l04-f3", front: "Slope standard error", back: md`$SE = \sigma/\sqrt{n(n^2 - 1)/12}$: improves with $n^{3/2}$.`, concepts: ["mz02.detection-limit"] },
    { id: "mz02-l04-f4", front: "Cost penalty of a wrong interval", back: md`$C(T)/C(T^*) = (T/T^* + T^*/T)/2$: ±20 % costs about 2.5 %, ×2 costs 25 %.`, concepts: ["mz02.flat-optimum"] },
    { id: "mz02-l04-f5", front: "Trigger delay from SR bias", back: md`$\Delta t = b_{SR}/r$`, concepts: ["mz02.flat-optimum"] },
    { id: "mz02-l04-f6", front: "Soiling component of P50/P90 (Track 0 table)", back: "2 to 3 % without site data, 1 to 2 % with 12 months or more.", concepts: ["mz02.soiling-uncertainty-yield"] },
    { id: "mz02-l04-f7", front: "Where measurement value lies for cleaning", back: "Detecting rate changes and storm steps quickly, not refining the annual average rate.", concepts: ["mz02.flat-optimum"] },
  ],
};

export default lesson;
