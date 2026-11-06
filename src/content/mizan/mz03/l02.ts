import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz03-l02",
  title: "Methods: stochastic rate and recovery (SRR), change points and cleaning-event detection",
  summary:
    "How the SRR method in NREL's RdTools turns a daily performance index into an insolation-weighted soiling ratio with a confidence interval: cleaning detection, Theil-Sen slopes per interval, Monte Carlo over slopes and recoveries. Where it breaks (short intervals, partial cleanings, dust-storm steps, seasonal model bias), and how change-point methods (Micheli et al. 2021) and combined degradation and soiling (CODS) extend it. Worked numbers throughout.",
  minutes: 90,
  objectives: [
    "Walk through the SRR pipeline step by step and say what each step assumes",
    "Compute a Theil-Sen slope by hand and explain why SRR uses it instead of least squares",
    "Compute an insolation-weighted soiling ratio and the energy lost to soiling from a soiling profile",
    "Explain how cleaning events are detected (shift, precipitation, logs) and why Kuwait plants rely on shifts and logs",
    "Name the failure modes of SRR in Gulf conditions and the method extensions that address them",
  ],
  concepts: [
    { id: "mz03.srr", name: "Stochastic rate and recovery (SRR) method", description: "Deceglie, Micheli and Muller (2018): detect cleanings, fit soiling rates per interval with Theil-Sen, Monte Carlo over rates and recoveries to get a P50 insolation-weighted soiling ratio and confidence interval.", competency: "mz-data", related: ["mz03.performance-index", "m12.degradation"] },
    { id: "mz03.cleaning-detection", name: "Cleaning-event detection", description: "Identifying cleanings as positive shifts in a smoothed performance index, from rainfall above a threshold, or from logs; defines the soiling intervals.", competency: "mz-data", related: ["m02.cleaning-strategy"] },
    { id: "mz03.theil-sen", name: "Theil-Sen robust slope", description: "Median of all pairwise slopes; tolerates about 29 % outliers, used for soiling rates on noisy daily data.", competency: "mz-data" },
    { id: "mz03.insolation-weighted-sr", name: "Insolation-weighted soiling ratio", description: "Soiling ratio averaged with daily insolation as the weight, so that the loss reflects energy rather than calendar days.", competency: "mz-data", related: ["m02.soiling"] },
    { id: "mz03.change-points", name: "Change points in soiling profiles", description: "Points inside a soiling interval where the rate changes or a negative step occurs (dust storm, dew cementation, season); detected to fit piecewise profiles.", competency: "mz-data" },
  ],
  sections: [
    {
      layer: "theory",
      title: "SRR from the inside, and where it breaks",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`SRR is the open, peer-reviewed baseline that KISR researchers, NREL and any serious buyer will compare Mizan against. Mizan's value is not running RdTools (anyone can): it is knowing exactly which of SRR's assumptions fail in Kuwait and what replaces them, and being able to say so to a researcher in their language. That is also the honest line between "we use open methods" and "we have something proprietary".`,
        },
        {
          kind: "md",
          md: md`### The idea in one paragraph

Between two cleanings, a soiled array loses output roughly linearly. At a cleaning, output jumps back up. So if you can find the jumps in the daily performance index, the stretches between them are **soiling intervals**, and the slope of PI in each interval is the **soiling rate**. Average the resulting sawtooth profile, weighted by insolation, and you have the soiling loss. The "stochastic" part is honesty about what you do not know: each slope is uncertain, and you do not know whether each cleaning returned the array fully to clean. SRR (Deceglie, Micheli and Muller, IEEE J. Photovoltaics, 2018) runs the profile many times with those unknowns drawn at random and reports the median and a confidence interval.`,
        },
        {
          kind: "flow",
          title: "The SRR pipeline (as implemented in RdTools)",
          steps: [
            { label: "Daily PI", detail: "Filtered energy over expected energy, aggregated to days; daily insolation kept as weight" },
            { label: "Smooth", detail: "Rolling median over about two weeks to expose steps above day-to-day noise" },
            { label: "Detect cleanings", detail: "Positive shifts above a threshold inferred from the data (default criterion 'shift'); optional rain or log input" },
            { label: "Fit intervals", detail: "Theil-Sen slope and confidence interval per soiling interval (minimum length 7 days by default)" },
            { label: "Monte Carlo", detail: "1,000 profiles by default: slopes drawn within their intervals, recovery at each cleaning drawn at random, noise added" },
            { label: "Report", detail: "P50 insolation-weighted soiling ratio, confidence interval (68.2 % by default), per-interval rates" },
          ],
          caption: "Defaults as documented for RdTools 3.x (soiling_srr). Pin the version you use and record every parameter in the analysis log.",
        },
        {
          kind: "md",
          md: md`### Step by step, with what each step assumes

**1. Daily PI.** SRR is only as good as its input: the filtered, temperature-corrected performance index of lesson 1. Daily aggregation is done as total measured energy over total expected energy (not the mean of interval ratios), so bright hours carry more weight.

**2. Smoothing.** A rolling median suppresses single bad days (a cloud-edge spike, a short outage) so that steps stand out. Its length trades responsiveness against noise: too short and noise triggers false cleanings, too long and two cleanings close together merge.

**3. Cleaning detection.** A cleaning is a positive shift in the smoothed PI larger than a threshold. RdTools infers the threshold from the distribution of day-to-day changes in the data by default, so it adapts to how noisy the plant is. Alternatives: rainfall above a threshold (useful where rain cleans, much less so in Kuwait, which gets roughly 100 mm a year, mostly November to April), or the operator's cleaning log. In practice for a water-cleaned Gulf plant, the best detector is **the log, checked by the shift**: the log says when crews worked, the shift says whether it made a difference and how much.

**4. Interval fits.** Each soiling interval gets a Theil-Sen slope with a confidence interval:`,
        },
        { kind: "equation", formula: "mz03-theil-sen" },
        {
          kind: "md",
          md: md`The median of all pairwise slopes is barely moved by a few bad points, where least squares is pulled by every outlier in proportion to its squared distance. Intervals shorter than a minimum (7 days by default) are not fitted. An interval whose fitted slope is positive (the plant got cleaner while "soiling") is treated as having no soiling rather than negative soiling, and intervals with very poorly constrained slopes are flagged.

**5. Monte Carlo over the unknowns.** Two things are unknown even with perfect data: the true slope within its interval, and how complete each cleaning was. SRR draws both at random, rep after rep, and rebuilds the whole soiling profile each time. RdTools offers recovery assumptions named *perfect_clean* (every cleaning returns to 1), *random_clean* (any recovery from none to full) and *half_norm_clean* (the default: recovery drawn from a half-normal distribution that favours near-full recovery, bounded below using the fit of the following interval). Check the exact definitions in the documentation of the version you pin: they are the single most consequential choice in the method.

**6. Insolation weighting.** Each rep produces a daily SR profile; its energy-relevant average is:`,
        },
        { kind: "equation", formula: "mz03-insolation-weighted-sr" },
        {
          kind: "md",
          md: md`The P50 across reps is the headline; the 68.2 % interval (one sigma for a normal distribution) is the default uncertainty. Converting to energy and money:`,
        },
        { kind: "equation", formula: "mz03-soiling-energy-loss" },
        {
          kind: "md",
          md: md`### The anchor: recentering

SRR does not know where "clean" is any more than you do (lesson 1). By default RdTools recenters the profile so that it is anchored near 1 at the cleanest part of the record: in effect, "the array is clean right after a good cleaning". If cleanings are systematically incomplete (cemented dust that water alone does not remove), SRR understates the true loss by the residual soiling, and no amount of Monte Carlo reveals it. Only a clean reference device or an occasional deep clean of a test block can.

### Where SRR breaks in the Gulf

| Condition | What happens to SRR | Remedy |
|---|---|---|
| Robotic cleaning every 1 to 4 days | Intervals shorter than the minimum; no slopes to fit | Soiling station, uncleaned control rows, robot performance metrics |
| Dust storm mid-interval (Shagaya: drops of about 30 % reported) | One negative step inside an interval; linear fit gives a wrong slope and wrong recovery | Detect negative shifts; fit piecewise (change points) |
| Rate changes within an interval (dew cementation, seasonal deposition) | Linear fit averages two regimes; profile shape wrong | Change-point detection, piecewise linear fits |
| Partial cleanings, natural recovery by wind (Qatar: 25 % of days showed natural recovery) | Small positive shifts below threshold; slopes flattened | Lower threshold with the log as confirmation; model recovery explicitly |
| Seasonal model bias (temperature, IAM, spectral) | Slow drift in PI misread as soiling slope | Fix the model first (lesson 3); check residual seasonality on post-cleaning days |
| Irradiance sensor soiling | Slopes too flat; sensor wipes look like small negative steps | Sensor log and redundancy (lesson 1) |

### Change points (Micheli et al. 2021)

Micheli, Theristis, Livera, Stein, Georghiou, Muller and co-authors showed that adding **change-point detection** to cleaning detection improves soiling extraction, testing on nine soiling stations and a 1 MW system. The idea: within an interval between cleanings, find the days where the soiling rate changes (or a negative step occurs), and fit a piecewise linear profile instead of a single line. This matters most exactly where Kuwait is extreme: dust events that add a step, followed by a different rate. A related comparison of five analytical extraction methods (Fernández-Solas, Micheli et al. 2022) and a comparison of automated cleaning detection on inverter data from 22 systems (Muller et al. 2021) are the reading list before Mizan claims any method is better. Recent RdTools versions expose options for negative shifts and piecewise fits inside soiling_srr; check the version you pin before relying on them.

### Soiling and degradation together (CODS)

On multi-year data, soiling and degradation contaminate each other: a long dirty period depresses the year-on-year degradation estimate, and an unremoved degradation trend tilts every soiling slope. The **combined degradation and soiling** method (CODS, Skomedal and Deceglie 2020, in RdTools) decomposes the PI series iteratively into a degradation trend, a seasonal component and a soiling profile. Use it for the Shagaya history (2017 onwards) before quoting either number.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative 90 days: measured performance index and the true soiling ratio",
          xKey: "day",
          xLabel: "Day",
          yLabel: "Ratio",
          series: [
            { key: "pi", label: "Measured daily PI (model 3 % optimistic, noisy)" },
            { key: "sr", label: "True soiling ratio" },
          ],
          data: [
            { day: 0, pi: 0.967, sr: 1 }, { day: 2, pi: 0.967, sr: 0.993 }, { day: 4, pi: 0.956, sr: 0.986 }, { day: 6, pi: 0.957, sr: 0.979 },
            { day: 8, pi: 0.952, sr: 0.972 }, { day: 10, pi: 0.937, sr: 0.965 }, { day: 12, pi: 0.931, sr: 0.958 }, { day: 14, pi: 0.915, sr: 0.951 },
            { day: 16, pi: 0.914, sr: 0.944 }, { day: 18, pi: 0.904, sr: 0.937 }, { day: 20, pi: 0.902, sr: 0.93 }, { day: 22, pi: 0.903, sr: 0.923 },
            { day: 24, pi: 0.895, sr: 0.916 }, { day: 26, pi: 0.882, sr: 0.909 }, { day: 28, pi: 0.865, sr: 0.902 }, { day: 30, pi: 0.962, sr: 0.995 },
            { day: 32, pi: 0.97, sr: 0.986 }, { day: 34, pi: 0.934, sr: 0.977 }, { day: 36, pi: 0.944, sr: 0.968 }, { day: 38, pi: 0.929, sr: 0.959 },
            { day: 40, pi: 0.922, sr: 0.95 }, { day: 42, pi: 0.913, sr: 0.941 }, { day: 44, pi: 0.904, sr: 0.932 }, { day: 46, pi: 0.891, sr: 0.923 },
            { day: 48, pi: 0.848, sr: 0.859 }, { day: 50, pi: 0.828, sr: 0.85 }, { day: 52, pi: 0.819, sr: 0.841 }, { day: 54, pi: 0.805, sr: 0.832 },
            { day: 56, pi: 0.809, sr: 0.823 }, { day: 58, pi: 0.793, sr: 0.814 }, { day: 60, pi: 0.778, sr: 0.805 }, { day: 62, pi: 0.95, sr: 0.975 },
            { day: 64, pi: 0.935, sr: 0.967 }, { day: 66, pi: 0.932, sr: 0.959 }, { day: 68, pi: 0.925, sr: 0.951 }, { day: 70, pi: 0.9, sr: 0.943 },
            { day: 72, pi: 0.91, sr: 0.935 }, { day: 74, pi: 0.902, sr: 0.927 }, { day: 76, pi: 0.884, sr: 0.919 }, { day: 78, pi: 0.885, sr: 0.911 },
            { day: 80, pi: 0.864, sr: 0.903 }, { day: 82, pi: 0.868, sr: 0.895 }, { day: 84, pi: 0.851, sr: 0.887 }, { day: 86, pi: 0.862, sr: 0.879 },
            { day: 88, pi: 0.842, sr: 0.871 }, { day: 90, pi: 0.843, sr: 0.863 },
          ],
          caption: "Synthetic data with known truth: rates 0.35, 0.45 and 0.40 %/day; a full cleaning on day 30; a dust-storm step of 6 points on day 47; a partial cleaning on day 62 (back to 0.975, not 1). The 3 % offset between the lines is model bias that recentering removes. A single linear fit to days 30 to 61 would blend the storm step into a steeper rate. Time-averaged true SR over the 90 days is 0.922.",
        },
      ],
    },
    {
      layer: "applied",
      title: "SRR by hand: slopes, steps, weights and energy",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Theil-Sen vs least squares on an interval with one bad day",
          given: md`Eight consecutive daily PI values in one soiling interval (illustrative): day 0 to 7 = 0.980, 0.976, 0.973, 0.968, 0.964, 0.960, 0.957, 0.925. The last day was hazy and the pyranometer and array disagreed (a typical artefact), so it is an outlier. The true rate is about 0.40 %/day.`,
          steps: [
            { md: md`**Pairs.** With $n = 8$ there are $8 \times 7/2 = 28$ pairwise slopes $(y_j - y_i)/(j - i)$.` },
            { md: md`**Sorted slopes** (per day): −0.0320, −0.0175, −0.0130, −0.0108, −0.0096, −0.0085, −0.0079, −0.0050, −0.0045, −0.0043, then **eleven values of −0.0040**, then −0.0038, −0.0038, −0.0037, −0.0035, −0.0035, −0.0030, −0.0030. The seven steepest all involve day 7.` },
            { md: md`**Theil-Sen slope** = median of 28 values = mean of the 14th and 15th = **−0.0040 per day** (−0.40 %/day). Intercept: median of $y_i + 0.004\,i$ = 0.980.` },
            { md: md`**Least squares** on the same 8 points: slope $= \sum (x_i - \bar x)(y_i - \bar y)/\sum (x_i - \bar x)^2 = $ **−0.0062 per day**, 56 % steeper. Without day 7 it would be −0.0039.` },
          ],
          result: md`One bad day at the end of a short interval moved least squares by more than half; Theil-Sen did not move. Over a 30-day cleaning cycle, the difference between 0.40 and 0.62 %/day is the difference between a 6 % and a 9 % average loss, which is the difference between cleaning monthly and cleaning every three weeks.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "From a soiling profile to energy lost in one interval",
          given: md`Illustrative 11 MW plant, clean daily energy 60 MWh, constant over a 30-day interval for simplicity. Cleaning on day 0 returns SR to 1.000; soiling rate 0.40 %/day; next cleaning on day 30.`,
          steps: [
            { md: md`SR on day $d$ is $1 - 0.004\,d$ for $d = 0 \dots 29$: from 1.000 to 0.884.` },
            { md: md`Mean SR over the interval $= 1 - 0.004 \times 14.5 = 0.942$. With equal daily insolation this is also the insolation-weighted SR.` },
            { md: md`Energy lost $= \sum_d E_{\mathrm{clean},d}(1 - \mathrm{SR}_d) = 60 \times 30 \times 0.058 = $ **104 MWh**.` },
            { md: md`At an illustrative value of USD 25/MWh: about USD 2,600 for the interval. A cleaning cycle that costs less than that, and is done earlier, pays for itself (lesson 6 makes this rigorous).` },
          ],
          result: md`Average loss is half the end-of-interval loss for linear soiling: 5.8 % average against 11.6 % on the last day. Reporting the last-day value as "the soiling loss" doubles it.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Why insolation weighting matters in Kuwait",
          given: md`A simplified year with two seasons of soiling. Winter period: 31 days, mean daily POA insolation 4.5 kWh/m², mean SR 0.95. Summer period: 30 days, 7.5 kWh/m², mean SR 0.90 (dustier and brighter).`,
          steps: [
            { md: md`Simple time average of SR $= (0.95 \times 31 + 0.90 \times 30)/61$, or roughly 0.925 for near-equal lengths.` },
            { md: md`Insolation-weighted: numerator $= 0.95 \times 4.5 \times 31 + 0.90 \times 7.5 \times 30 = 132.5 + 202.5 = 335.0$; denominator $= 4.5 \times 31 + 7.5 \times 30 = 139.5 + 225 = 364.5$.` },
            { md: md`$\overline{\mathrm{SR}}_H = 335.0/364.5$`, hidden: true, check: { prompt: "Insolation-weighted SR", answer: 0.919, tolerance: { abs: 0.002 } } },
            { md: md`Energy-weighted soiling loss $= 1 - 0.919 = 8.1$ % against 7.5 % from the time average.`, hidden: true, check: { prompt: "Energy-weighted soiling loss (%)", answer: 8.1, unit: "%", tolerance: { abs: 0.15 } } },
          ],
          result: md`When the dirtiest weeks are also the sunniest, the time average understates the energy loss. Kuwait's spring and summer dust season coincides with the highest insolation, so always weight by insolation.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "What the Monte Carlo output looks like (illustrative)",
          xKey: "loss",
          xLabel: "Insolation-weighted soiling loss (%)",
          yLabel: "Number of Monte Carlo profiles (of 1,000)",
          series: [{ key: "count", label: "Profiles" }],
          data: [
            { loss: "3.2", count: 9 }, { loss: "3.4", count: 27 }, { loss: "3.6", count: 65 }, { loss: "3.8", count: 122 },
            { loss: "4.0", count: 177 }, { loss: "4.2", count: 200 }, { loss: "4.4", count: 177 }, { loss: "4.6", count: 122 },
            { loss: "4.8", count: 65 }, { loss: "5.0", count: 27 }, { loss: "5.2", count: 9 },
          ],
          caption: "Synthetic histogram: P50 loss 4.2 %, 68.2 % interval roughly 3.8 to 4.6 %. The interval reflects slope uncertainty and the recovery assumption, not model bias or sensor error: those are outside the Monte Carlo and must be stated separately.",
        },
        {
          kind: "question",
          question: {
            id: "mz03-l02-p1",
            type: "mcq",
            prompt: "SRR reports an insolation-weighted soiling ratio of 0.958 with a 68.2 % interval of 0.951 to 0.964. Which statement is correct?",
            options: [
              "There is a 68.2 % chance the true soiling loss is between 3.6 % and 4.9 %, including all model and sensor errors",
              "The interval covers the spread from slope uncertainty and recovery assumptions within the method; model bias, sensor soiling and incomplete cleanings are not in it",
              "The soiling loss is exactly 4.2 %",
              "The interval is a 95 % interval",
            ],
            answer: 1,
            explanation: md`The Monte Carlo samples the unknowns SRR models: rates within their confidence intervals and recovery at each cleaning. A systematically dirty pyranometer, a biased temperature model or cemented residual soiling shift every rep alike and do not widen the interval. Report them as separate, stated uncertainties.`,
            concepts: ["mz03.srr"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running SRR on a real plant, and specifying it for the engineering partner",
      blocks: [
        {
          kind: "md",
          md: md`### How the analysis is actually run

A data scientist or performance engineer runs RdTools in Python on daily data, per inverter or per block rather than per plant (so that one outage does not pollute every interval). The sequence:

1. Load the filtered interval data (lesson 1 filters) and the expected energy from the model (lesson 3).
2. Aggregate to daily energy and daily insolation, keeping only days with enough valid hours.
3. Compute daily PI and run soiling_srr with explicit parameters (never rely on defaults silently).
4. Inspect the interval summary: start, end, slope, slope confidence interval, whether each interval was valid.
5. Overlay detected cleanings on the cleaning log and investigate every mismatch before reporting.

The core of steps 2 and 3 is only a few lines (sketch; in a real run every parameter is passed explicitly):

    import rdtools
    daily_energy = energy_ac.resample('D').sum()
    daily_expected = energy_expected.resample('D').sum()
    daily_insolation = poa_insolation.resample('D').sum()
    daily_pi = daily_energy / daily_expected
    sr, sr_ci, info = rdtools.soiling_srr(daily_pi, daily_insolation, reps=1000)
    intervals = info['soiling_interval_summary']

The outputs to keep: the P50 and interval, the per-interval rates, the stochastic profiles, the software version and every parameter. KISR researchers will ask for all of them.

### Test the method on data where you know the answer

Before trusting SRR on Shagaya, inject a known soiling profile into data you believe is clean (for example days right after cleanings, or a synthetic series built from the expected-energy model with realistic noise), run the pipeline, and check that it recovers the injected rates, steps and loss. Repeat with a dust-storm step, a partial cleaning and a 4-day cleaning cycle. This **synthetic injection test** is cheap, it finds parameter problems before a client does, and it becomes an appendix in any co-authored methodology paper.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How SRR results get misused",
          md: md`- **Reporting the P50 without the anchor**: "4.2 % loss" means "4.2 % relative to the post-cleaning level"; say so.
- **Treating the confidence interval as total uncertainty**: it excludes model, sensor and residual-soiling error.
- **Fitting plant-level data** with inverter outages inside: false steps and wrong slopes.
- **Accepting detected cleanings that the log does not show** (or ignoring logged cleanings that show no step): both are findings, about the data or about the cleaning crew.
- **Running on robotic-cleaning plants**: intervals too short; the output looks precise and means little.
- **Comparing a rate fitted in May with one fitted in December** without saying the season: Gulf soiling rates are seasonal.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "What is open and what can be Mizan's",
          md: md`SRR, CODS and pvlib are open source and published. Running them is not a moat. What can be Mizan's: the Kuwait-specific filters and confounder handling, dust-event and change-point logic tuned on Gulf data, the validation record against Shagaya ground truth, and the translation of a soiling ratio into a cleaning decision (lesson 6). Say this plainly to KISR; researchers trust a partner who credits open methods.`,
        },
        {
          kind: "checklist",
          title: "Specification checks for an SRR run",
          items: [
            "Input PI built from filtered, temperature-corrected data, per inverter or block",
            "RdTools version pinned; every soiling_srr parameter written down, including the recovery method",
            "Detected cleanings reconciled with the cleaning log; mismatches listed and explained",
            "Intervals shorter than the minimum, and their share of the record, reported",
            "Synthetic injection test passed for linear soiling, a dust-storm step, a partial cleaning and short intervals",
            "Result stated with its anchor and with uncertainties outside the Monte Carlo listed",
          ],
        },
        {
          kind: "ask",
          title: "Questions to put to a soiling analytics vendor (or to yourself)",
          items: [
            "Which recovery assumption do you use at cleanings, and how sensitive is the loss to it?",
            "How do you treat a dust-storm step inside an interval?",
            "What happens to your method when cleaning is every 3 days?",
            "What is your anchor for a clean array?",
            "Show me the synthetic injection test results.",
          ],
        },
        { kind: "sources", refs: ["mz03-r1", "mz03-r2", "mz03-r3", "mz03-r4", "mz03-r5", "mz03-r6", "mz03-r7", "mz03-r28"] },
        { kind: "xref", to: "m14-l04", note: "Track 0, analysing performance data with AI: how to use an AI assistant to write and check the analysis code without trusting it blindly." },
        {
          kind: "question",
          question: {
            id: "mz03-l02-p2",
            type: "short",
            prompt: md`Write the **analysis specification** that Mizan's engineering partners will implement for the first soiling analysis of a monthly-cleaned Kuwait plant such as Shagaya Phase I. It should cover: inputs and filters, the SRR configuration (and why), how cleaning detection is reconciled with the log, how dust-storm steps are handled, the synthetic injection tests, and exactly what the output report contains.`,
            rubric: [
              "Inputs: per-inverter or per-block filtered daily PI from a temperature-corrected expected-energy model, plus daily insolation",
              "SRR parameters stated explicitly, including recovery method and minimum interval length, with a sensitivity run on the recovery method",
              "Cleaning detection reconciled with the cleaning log, with mismatches reported as findings",
              "Dust-storm or negative steps handled (negative-shift detection or piecewise fit), not blended into slopes",
              "Synthetic injection tests with known truth (linear soiling, storm step, partial cleaning, short intervals) and pass criteria",
              "Output report: P50 and interval, anchor stated, per-interval rates by season, energy and value lost, uncertainties outside the Monte Carlo",
            ],
            modelAnswer: md`**Soiling analysis spec v0.1 (monthly water-cleaned plant).**
*Inputs*: 5-minute inverter AC power, POA (with sensor cleaning log), module and ambient temperature, wind, PPC setpoint, inverter status, cleaning log by block. Filters: POA above 200 W/m², no clipping (within 2 % of AC rating), no curtailment (within 3 % of setpoint), inverter available, timestamps checked against modelled sunrise. Expected energy from the pvlib model of lesson 3, recalibrated yearly on post-cleaning days.
*Daily PI*: per inverter, sum of measured over sum of expected, days with at least 5 valid hours.
*SRR*: RdTools version pinned; reps 1,000; confidence level 68.2 %; minimum interval 7 days; clean criterion 'shift'; recovery 'half_norm_clean' as base case with 'perfect_clean' and 'random_clean' as sensitivity runs reported side by side.
*Cleaning reconciliation*: list logged cleanings with no detected step (possible ineffective cleaning or wrong log) and detected steps with no log (natural recovery, sensor wipe or data error); each must be explained before the report.
*Dust events*: negative shifts larger than 3 points within an interval are flagged, cross-checked against CAMS AOD and wind; intervals are split there and fitted piecewise.
*Synthetic tests*: inject 0.4 %/day linear soiling; a 6-point storm step; a 70 % partial cleaning; a 3-day cleaning cycle. Pass: recovered rate within 0.05 %/day, recovered loss within 0.5 points, short-interval case flagged as not estimable.
*Report*: P50 insolation-weighted SR and interval per inverter and plant; anchor ("relative to post-cleaning level"); rates by month; energy lost (MWh) and value at the stated tariff; list of uncertainties outside the Monte Carlo (sensor, model bias, residual soiling) with magnitude estimates.`,
            explanation: md`The strongest specs make every default an explicit, justified choice and build in tests where the truth is known. The recovery-method sensitivity and the log reconciliation are what a KISR reviewer will look for first.`,
            concepts: ["mz03.srr", "mz03.cleaning-detection", "mz03.change-points"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain the SRR method to Omar Abu Harb in two minutes, including why it reports a range and what that range does not include.",
          keyPoints: [
            "Cleanings show up as upward jumps; the stretches between them are soiling intervals",
            "The slope in each interval is the soiling rate, fitted robustly with Theil-Sen",
            "Unknown slopes and incomplete cleanings are sampled many times (Monte Carlo) to give a median and a range",
            "The loss is weighted by insolation because sunny days cost more",
            "The range excludes sensor error, model bias and dust that cleaning never removes; the anchor is clean-after-cleaning",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz03-l02-q1",
      type: "order",
      prompt: "Put the SRR steps in order.",
      items: [
        "Compute filtered daily performance index and daily insolation",
        "Smooth with a rolling median",
        "Detect cleaning events as positive shifts",
        "Fit a Theil-Sen slope in each soiling interval",
        "Monte Carlo over slopes and recoveries",
        "Report P50 insolation-weighted soiling ratio and interval",
      ],
      explanation: md`Data, smoothing, segmentation by cleanings, per-interval fits, uncertainty propagation, then the energy-weighted summary.`,
      concepts: ["mz03.srr"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz03-l02-q2",
      type: "numeric",
      prompt: md`Five daily PI values in an interval: 0.990, 0.986, 0.950, 0.978, 0.974 (days 0 to 4; day 2 had a short outage). What is the Theil-Sen slope, in % per day?`,
      answer: -0.4,
      tolerance: { abs: 0.03 },
      unit: "%/day",
      explanation: md`The 10 pairwise slopes, sorted: −0.036, −0.020, then six values of −0.004, then +0.012 and +0.028. The median of 10 values is the mean of the 5th and 6th, both −0.004, so −0.40 %/day. Every pair that avoids day 2 gives exactly −0.004; the pairs involving the outlier scatter to both sides and are ignored by the median.`,
      concepts: ["mz03.theil-sen"],
      difficulty: 2,
    },
    {
      id: "mz03-l02-q3",
      type: "mcq",
      prompt: "A Gulf plant cleans every module every 4 days with semi-automated equipment. What does SRR with default settings produce?",
      options: [
        "A precise soiling rate, because there are many cleanings",
        "Little or nothing usable: intervals are shorter than the minimum fit length, and soiling between cleanings is near the noise",
        "An overestimate of soiling caused by too many cleanings",
        "The degradation rate instead of the soiling rate",
      ],
      answer: 1,
      explanation: md`The default minimum interval is 7 days, and 4 days at 0.4 %/day is a 1.6 % decline, comparable to daily noise. Use a soiling station or uncleaned control rows.`,
      concepts: ["mz03.srr", "mz03.identifiability"],
      difficulty: 1,
    },
    {
      id: "mz03-l02-q4",
      type: "multi",
      prompt: "Which of these are NOT captured by SRR's confidence interval? Select all that apply.",
      options: [
        "Uncertainty in the fitted slope of each interval",
        "A pyranometer that soils between its wipes",
        "Dust cemented by dew that water cleaning does not remove",
        "Whether each cleaning recovered the array fully",
        "A temperature model that is 2 % optimistic in summer",
      ],
      answer: [1, 2, 4],
      explanation: md`Slope uncertainty and recovery completeness are sampled in the Monte Carlo. Sensor soiling, residual cemented soiling and seasonal model bias shift all reps alike and must be quantified separately.`,
      concepts: ["mz03.srr", "mz03.sensor-soiling"],
      difficulty: 2,
    },
    {
      id: "mz03-l02-q5",
      type: "numeric",
      prompt: md`Linear soiling at 0.5 %/day from a full cleaning, next cleaning after 20 days, constant insolation. What is the average soiling loss over the interval (%)?`,
      answer: 4.75,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`SR on day $d$ = $1 - 0.005\,d$ for $d = 0 \dots 19$; mean loss $= 0.005 \times 9.5 = 4.75$ %. (The continuous approximation $rT/2 = 5$ % is close; the end-of-interval loss is 10 %.)`,
      concepts: ["mz03.insolation-weighted-sr"],
      difficulty: 1,
    },
    {
      id: "mz03-l02-q6",
      type: "mcq",
      prompt: "Shagaya's PV plant has reported sudden output drops of about 30 % in dust storms. Why do change-point methods matter for that kind of event?",
      options: [
        "They detect the rain that follows dust storms",
        "A storm adds a negative step inside a soiling interval; a single linear fit blends it into a wrong rate and wrong recovery, while a piecewise fit separates the step from the rates before and after",
        "They remove the need for an expected-energy model",
        "They correct for the temperature drop during storms",
      ],
      answer: 1,
      explanation: md`Micheli et al. (2021) add change-point detection to cleaning detection precisely so that steps and rate changes inside intervals are fitted as such. Note that part of a storm-day drop is dim sky (AOD), which a measured-POA model already removes; what remains afterwards is deposit.`,
      concepts: ["mz03.change-points"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz03-l02-f1", front: "SRR: who, where, when", back: "Deceglie, Micheli and Muller, IEEE Journal of Photovoltaics, 2018; implemented in NREL RdTools (soiling_srr).", concepts: ["mz03.srr"] },
    { id: "mz03-l02-f2", front: "Two unknowns SRR's Monte Carlo samples", back: "The soiling rate within each interval's confidence interval, and how complete each cleaning was (recovery).", concepts: ["mz03.srr"] },
    { id: "mz03-l02-f3", front: "Theil-Sen slope", back: md`Median of all $n(n-1)/2$ pairwise slopes; robust to about 29 % outliers.`, concepts: ["mz03.theil-sen"] },
    { id: "mz03-l02-f4", front: "RdTools soiling_srr defaults to remember", back: "reps 1,000; confidence level 68.2 %; minimum interval 7 days; clean criterion 'shift'; recovery 'half_norm_clean' (check your version).", concepts: ["mz03.srr"] },
    { id: "mz03-l02-f5", front: "Average vs end-of-interval loss for linear soiling", back: md`Average $\approx rT/2$, half the end-of-interval loss $rT$.`, concepts: ["mz03.insolation-weighted-sr"] },
    { id: "mz03-l02-f6", front: "Best cleaning detector for a water-cleaned Kuwait plant", back: "The cleaning log, checked by the shift in PI. Rain is too rare (roughly 100 mm/yr) to rely on.", concepts: ["mz03.cleaning-detection"] },
    { id: "mz03-l02-f7", front: "CODS", back: "Combined degradation and soiling (Skomedal and Deceglie 2020, RdTools): decomposes PI into degradation trend, seasonality and soiling.", concepts: ["mz03.srr"] },
    { id: "mz03-l02-f8", front: "Synthetic injection test", back: "Inject a known soiling profile into clean or modelled data and check the pipeline recovers it; repeat for storm steps, partial cleanings and short intervals.", concepts: ["mz03.srr"] },
  ],
};

export default lesson;
