import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz09-l05",
  title: "Data quality and cleaning for soiling analytics: gaps, timestamps, drift, availability flags and a pilot checklist",
  summary:
    "The defects real plant data has and how to find each one: gaps and stale values, physical limit violations, timestamps in the wrong zone or interval convention, clock drift, unit and scaling changes, counter resets, irradiance sensor drift and soiling, and missing availability and curtailment flags. Gulf-specific traps (dust storms that are real, heat derating, sensor soiling) and the data-quality checklist and report that should open every soiling pilot.",
  minutes: 80,
  objectives: [
    "Classify data defects and name the test that detects each, using open tools such as pvanalytics",
    "Diagnose time zone and interval-labelling errors from a clear-day curve and the solar noon formula",
    "Quantify data completeness and the bias from irradiance sensor drift",
    "Write a data-quality checklist and acceptance thresholds for a soiling analytics pilot",
  ],
  concepts: [
    { id: "mz09.gaps-stale", name: "Gaps, stale values and limit checks", description: "Missing intervals, values frozen at the last reading, and physically impossible values; detected by completeness counts, repeated-value tests and plausibility limits.", competency: "mz-data", related: ["m12.data-quality"] },
    { id: "mz09.timestamps", name: "Timestamp integrity", description: "Correct time zone (Kuwait UTC+3, no daylight saving), interval convention (beginning or ending label), synchronised clocks and unique stamps; checked against solar position on clear days.", competency: "mz-data" },
    { id: "mz09.sensor-drift", name: "Irradiance sensor drift and soiling", description: "Slow change of a sensor's calibration or transmission, detected by the ratio between co-located sensors or against clear-sky models; it biases the performance index directly.", competency: "mz-data", related: ["mz03.sensor-soiling"] },
    { id: "mz09.availability-flags", name: "Availability and curtailment flags", description: "Per-interval labels, derived from status codes, setpoints and derating flags, that remove intervals where the plant could not produce its potential.", competency: "mz-data", related: ["m12.availability", "m06.curtailment"] },
    { id: "mz09.dq-checklist", name: "Pilot data-quality checklist and report", description: "The agreed tests, thresholds and documented exclusions applied before any soiling number is computed, delivered as the first report of a pilot.", competency: "mz-data", related: ["mz03.confounders"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "A taxonomy of defects and the test for each",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The first deliverable of the Shagaya Phase I pilot (in preparation) should not be a soiling number; it should be a data-quality report that KISR's researchers agree with. It shows rigour, finds the sensor and logging problems the operator half-knows about, and sets the exclusions before anyone sees a result they might dislike. In a methodology partnership, the data-quality rules are part of the method.`,
        },
        {
          kind: "md",
          md: md`### The defect classes

| Defect | What it looks like | Test | Typical fix |
|---|---|---|---|
| **Gap** | Missing intervals | Count values per day against expected daylight intervals | Exclude day below threshold; never fill long gaps for analysis |
| **Stale (frozen) value** | Same value repeated for many intervals, quality still "good" | Run length of identical or near-identical values | Flag and exclude the run |
| **Limit violation** | POA above about 1,500 W/m², negative power by day, ambient above 60 °C | Physical and design limits | Flag; investigate scaling |
| **Spike** | Single implausible interval | Rate-of-change test | Flag the point |
| **Night offset** | Pyranometer reads a few W/m² negative at night | Night-time mean | Normal for thermopiles; clip to zero at night only |
| **Time zone or convention error** | Curve shifted by hours or half an interval | Clear-day symmetry around solar noon | Re-stamp, document |
| **Clock drift** | Shift that grows over months | Solar noon test per month | Re-stamp piecewise |
| **Duplicate stamps** | Two values at one time, often at a time change or after a restore | Uniqueness check | Keep one by rule |
| **Unit or scaling change** | Step of exactly 10, 100 or 1,000 times | Ratio to a related tag (meter, neighbour inverter) | Rescale per period |
| **Counter reset or rollover** | Energy counter drops to near zero or jumps by a register limit | Negative differences | Handle in differencing |
| **Sensor drift or soiling** | Slow change of ratio between two irradiance sensors, or against clear-sky | Ratio trend on clear periods | Correct with calibration and cleaning log, or exclude |
| **Unavailability, curtailment, derating** | Power below potential for reasons other than soiling | Status codes, setpoints, flat tops, derating flags | Exclude intervals from both numerator and denominator |

Open tools implement most of these tests: the **pvanalytics** library (gaps, stale values, irradiance limits, clipping and time-shift detection) and RdTools' input filters are designed for exactly this use, and reviewers recognise them.

### Timestamps, in detail

Three independent things must be right.

1. **Time zone.** Kuwait is UTC+3 all year with no daylight saving (IANA zone Asia/Kuwait). Historians often store UTC internally and display local time; exports may come out in either, unlabelled. A system configured in Europe may even export in Central European time **with** daylight saving, producing a one-hour jump twice a year and duplicate stamps in October. Write all timestamps in ISO 8601 with an explicit offset (for example 2019-03-14T10:05:00+03:00) or in UTC.
2. **Interval convention.** A 15 minute mean labelled 10:15 may cover 10:00 to 10:15 (interval ending, common in historians and meters) or 10:15 to 10:30 (interval beginning). Get it wrong and every modelled solar position is off by one interval; the error is largest at sunrise and sunset, where it creates a morning-afternoon asymmetry that looks like soiling or shading.
3. **Clock accuracy.** Loggers and gateways without time synchronisation drift by seconds to minutes per month. Modbus carries no timestamps, so the poller's clock is the clock.

The physical check is the sun. On a clear day the power and POA curves of a fixed-tilt, south-facing array are nearly symmetric about **solar noon** (tracker plants: still a check, with tracker angles):`,
        },
        { kind: "equation", formula: "mz09-solar-noon" },
        {
          kind: "widget",
          widget: "sun-path",
          props: { latitude: 29.3 },
          caption: "Solar elevation through the day at Kuwait's latitude. The clear-day irradiance curve must peak where the sun is highest; if the data peak is hours or half an interval away, fix the timestamps before any analysis.",
        },
        {
          kind: "md",
          md: md`### Sensor drift

Pyranometers and reference cells drift (calibration ages, domes and glass soil). Since expected energy is proportional to measured irradiance, a sensor that reads low by factor $r$ inflates the performance index by $1/r$:`,
        },
        { kind: "equation", formula: "mz09-drift-bias" },
        {
          kind: "md",
          md: md`The practical detector is **redundancy**: the daily clear-period ratio of two co-located POA sensors (ideally of different types, for example a thermopile pyranometer and a silicon reference cell, corrected for their known spectral and angular differences) should be flat. A slow trend is drift or soiling of one of them; a step is a cleaning or a recalibration. Without a second sensor, compare with a clear-sky model or satellite irradiance, which is coarser but independent.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative ratio of plant pyranometer to a cleaned reference cell, clear periods, six months",
          xKey: "week",
          xLabel: "Week",
          yLabel: "Ratio",
          series: [
            { key: "ratio", label: "Pyranometer / reference cell" },
            { key: "ok", label: "Expected (calibrated, clean)" },
          ],
          data: [
            { week: 0, ratio: 1.0, ok: 1.0 },
            { week: 2, ratio: 0.996, ok: 1.0 },
            { week: 4, ratio: 0.991, ok: 1.0 },
            { week: 6, ratio: 0.999, ok: 1.0 },
            { week: 8, ratio: 0.994, ok: 1.0 },
            { week: 10, ratio: 0.99, ok: 1.0 },
            { week: 12, ratio: 0.986, ok: 1.0 },
            { week: 14, ratio: 0.995, ok: 1.0 },
            { week: 16, ratio: 0.99, ok: 1.0 },
            { week: 18, ratio: 0.986, ok: 1.0 },
            { week: 20, ratio: 0.984, ok: 1.0 },
            { week: 22, ratio: 0.983, ok: 1.0 },
            { week: 24, ratio: 0.982, ok: 1.0 },
            { week: 26, ratio: 0.982, ok: 1.0 },
          ],
          caption: "Synthetic data. Sawtooth: the pyranometer soils between occasional wipes (weeks 6 and 14). Underlying downward trend: calibration drift, about 1.8 % in six months. Both bias the performance index; the cleaning and calibration log tells them apart.",
        },
        {
          kind: "md",
          md: md`### Availability, curtailment and derating flags

Soiling inference needs intervals in which the array could deliver its potential. Each interval gets flags derived from:
- **Inverter status and fault codes** (decoded from the vendor's code table): stopped, faulted, starting, maintenance.
- **PPC setpoint versus measured power**: curtailment when power sits within a few percent of a setpoint below the potential.
- **Clipping**: power flat at the inverter's AC limit.
- **Thermal derating**: many inverters reduce maximum output at high internal or ambient temperature. In a Kuwaiti summer afternoon this produces a flat top **below** nameplate that is neither clipping nor curtailment: look for the derating flag or a temperature-dependent ceiling.
- **Tracker stow or fault** flags (module mz05).

Flagged intervals are removed from **both** numerator and denominator. Module mz03 explains why each of these confounders mimics or hides soiling; this lesson is about producing the flags reliably.`,
        },
        { kind: "xref", to: "mz03-l01", note: "The confounder register (temperature, clipping, curtailment, outages, sensor soiling) that these flags feed." },
        {
          kind: "widget",
          widget: "dc-ac-ratio",
          caption: "Clipping on a clear day: everything above the inverter limit is invisible, so clipped intervals carry no soiling information and must be flagged.",
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Gulf-specific traps",
          md: md`- **Do not filter out dust storms as "outliers".** A sudden drop of about 30 % at Shagaya during dust storms is real (Al-Rasheedi et al. 2020); part of it is atmospheric (reduced irradiance, which a measured-POA model handles) and part is deposit that persists. Flag the storm, keep the data.
- **Sensor soiling is fast.** At assumed Gulf rates of several tenths of a percent per day, an unwiped pyranometer drifts a few percent within weeks.
- **Heat derating looks like curtailment.** Check the inverter's derating flag and internal temperature before inventing a grid event.
- **Summer limit checks need Kuwait limits.** Ambient above 50 °C has been recorded in Kuwait; a generic 45 °C limit flags good data.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Diagnosing timestamps, completeness and drift",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Which clock and which convention?",
          given: md`Illustrative export from a fixed-tilt, south-facing block at about 47° E in Kuwait (UTC+3, standard meridian 45° E). Clear day in early November; equation of time $E \approx +16.4$ min. 15 minute mean power, unlabelled time zone. The clear-day curve is symmetric about the label 08:43 (the midpoint between equal-power labels in the morning and afternoon).`,
          steps: [
            { md: md`**Expected solar noon, local clock:** $t_{noon} = 720 - 4\,(47 - 45) - 16.4 = 695.6$ min $\approx$ 11:36 (UTC+3).` },
            { md: md`**Observed minus expected:** $08{:}43 - 11{:}36 = -2$ h 53 min $= -3$ h $+ 7$ min.` },
            { md: md`**Hours part:** the $-3$ h is the time zone. The file is in **UTC**.` },
            { md: md`**Minutes part:** about $+7.5$ min, half of the 15 minute interval. If labels mark the **end** of each averaging interval, the interval's centre lies 7.5 min before its label, so the curve appears 7.5 min late. In UTC, solar noon is 08:36; with interval-ending labels the data peaks at 08:43.5.` },
          ],
          result: md`Timestamps are UTC, interval ending. Convert to UTC+3 by adding 3 h, and shift labels to interval centres by subtracting 7.5 min before computing solar positions. Record both facts in the dataset's metadata and in the data-quality report.`,
        },
        { kind: "equation", formula: "mz09-completeness" },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: how big is the drift bias?",
          given: md`Over six months the ratio of the plant pyranometer to a regularly cleaned reference cell fell from 1.000 to 0.982 (chart above), and the reference cell is trusted. On a day at the end of the period the true performance index of the array is 0.900.`,
          steps: [
            { md: md`$r = 0.982$: the pyranometer reads 1.8 % low, so expected energy is 1.8 % too low.` },
            { md: md`$\mathrm{PI}_{meas} = 0.900/0.982$.`, hidden: true, check: { prompt: "Performance index computed with the drifting pyranometer", answer: 0.9165, tolerance: { abs: 0.001 } } },
          ],
          result: md`The analysis would report about 0.917 instead of 0.900: 1.65 points of soiling loss hidden, more than three days of soiling at Gulf rates. Drift that grows over months also bends the soiling rate itself.`,
        },
        {
          kind: "question",
          question: {
            id: "mz09-l05-p1",
            type: "numeric",
            prompt: md`A month of 1 minute POA data: 30 days with 11 daylight hours each. 1,350 daylight minutes are missing and a further 450 are flagged stale. What is the completeness of valid data (%)?`,
            answer: 90.91,
            tolerance: { abs: 0.05 },
            unit: "%",
            explanation: md`Expected $= 30 \times 11 \times 60 = 19{,}800$ daylight minutes. Valid $= 19{,}800 - 1{,}350 - 450 = 18{,}000$. $C_d = 18{,}000/19{,}800 = 90.9$ %. Stale values are present but not valid; counting them would report 93.2 %.`,
            concepts: ["mz09.gaps-stale"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "The data-quality checklist and report for a pilot",
      blocks: [
        {
          kind: "md",
          md: md`### How the first month of a pilot should run

1. **Receive** the first extract and the logs. Store raw, untouched.
2. **Inventory**: tags received versus requested, units, intervals, time span.
3. **Run the tests** of the table above, per tag and per day.
4. **Write the data-quality report**: completeness per tag and month, timestamp findings, stale periods, sensor ratio trends, unit changes, proposed exclusions and thresholds.
5. **Review it with the operator and the research partner**, who often know why a sensor was dead in 2019. Agree the rules.
6. **Freeze the rules** as versioned code, then compute the first soiling results.

Doing step 5 before step 6 is what turns "your numbers are wrong" into "our agreed rules say this day is excluded".`,
        },
        {
          kind: "checklist",
          title: "Data-quality checklist for a soiling pilot",
          items: [
            "Tag inventory complete; every tag mapped to a device, unit and location",
            "Time zone and interval convention determined from the solar noon test on clear days, for each year of data",
            "No duplicate or missing stamps left unexplained; daylight saving artefacts removed if the source system used it",
            "Completeness per tag per day computed on daylight intervals; days below the agreed threshold (for example 90 %) excluded",
            "Stale-value runs flagged (for example identical values for 30 minutes or more in daylight)",
            "Physical limits set for Kuwait conditions (POA, ambient, module temperature, power at or below AC rating)",
            "Unit and scaling changes found by ratios to the revenue meter and neighbouring inverters",
            "Energy counter resets and rollovers handled",
            "Irradiance sensor ratios trended; drift and soiling of sensors corrected or periods excluded, using the sensor log",
            "Availability, curtailment, clipping, thermal derating and stow flags computed for every interval",
            "Dust storm days flagged but kept",
            "All exclusions stored as data with reasons, and the rules versioned as code",
          ],
        },
        {
          kind: "ask",
          title: "Questions that save weeks",
          items: [
            "Were any irradiance sensors replaced, recalibrated or moved, and when?",
            "How often are the irradiance sensors cleaned, and is it logged?",
            "Was the SCADA or historian ever migrated or restored from backup (which can shift times or units)?",
            "Which inverter status codes mean 'producing normally'? Can we have the code table?",
            "Did the cleaning arm failure in 2018 to 2019 affect sensor cleaning too, or only modules?",
          ],
        },
        {
          kind: "callout",
          tone: "ai",
          title: "Using AI on data quality",
          md: md`A language model is useful for drafting the test plan, decoding a vendor's status-code table into a mapping, and writing the plain-language data-quality report. Do not let it decide exclusions by itself or "fill in" missing values: every exclusion must come from a rule you can show a reviewer, run as code.`,
        },
        {
          kind: "question",
          question: {
            id: "mz09-l05-p2",
            type: "short",
            prompt: md`Write the **data-quality protocol** Mizan would propose to KISR researchers for the targeted Shagaya Phase I soiling pilot: the tests, the thresholds you propose (with a reason each), how timestamps are verified, how sensor drift and the 2018 to 2019 cleaning arm failure period are handled, and what goes in the data-quality report and who signs it off before any soiling result is computed.`,
            rubric: [
              "Lists the main tests: completeness, stale values, limits, spikes, timestamps, unit changes, counter resets, sensor ratio drift, availability, curtailment, clipping and derating flags",
              "Proposes concrete thresholds (for example daily completeness at or above 90 %, stale run 30 minutes, Kuwait-appropriate limits) with reasons",
              "Verifies time zone and interval convention by the clear-day solar noon test, per year of data",
              "Handles sensor drift with redundant sensors and the sensor cleaning and calibration log; treats the 2018 to 2019 period carefully (checks whether sensors were also affected) rather than excluding or trusting it blindly",
              "Keeps dust storm days (flagged), stores exclusions as data, versions the rules",
              "Requires review and sign-off of the data-quality report by KISR researchers and the operator before results",
            ],
            modelAnswer: md`**Data-quality protocol (draft for KISR review; pilot in preparation)**

**1. Inventory.** Each delivered tag mapped to device, section (thin-film or poly-Si), unit and interval; missing tags listed.

**2. Timestamps.** For each year, three clear days per season: centre of the POA and power curves compared with solar noon from the site longitude and the equation of time. Expected result in UTC+3 with a known interval convention; any offset or drift corrected piecewise and recorded.

**3. Tests and thresholds.**
- Completeness per tag per day on daylight intervals; days below **90 %** excluded (enough intervals for a stable daily index).
- Stale values: identical readings for **30 minutes or more** in daylight flagged.
- Limits: POA 0 to 1,500 W/m²; ambient 0 to 55 °C; module 0 to 85 °C; inverter power at or below 1.02 times AC rating; night irradiance clipped to zero.
- Spikes: change between consecutive minutes above a tag-specific limit flagged.
- Units and counters: ratio of the sum of inverter energy to the meter checked monthly; counter resets handled.
- Flags: unavailability (status codes from the vendor table), curtailment (power within 2 % of a setpoint below potential), clipping, thermal derating; flagged intervals removed from numerator and denominator.
- Dust storm days flagged, not removed.

**4. Sensor drift.** Daily clear-period ratios between all POA sensors trended; steps matched to the sensor cleaning and calibration log; drifting periods corrected where a trusted reference exists, otherwise excluded. For **2018 to 2019** we first establish from KISR's logs whether sensor cleaning continued while module cleaning failed; if sensors also went unwiped, that period is analysed with satellite irradiance as a cross-check before it is used as a natural experiment.

**5. Report and sign-off.** Completeness tables, timestamp findings, sensor ratio plots, list of exclusions with reasons, and the rule version. Reviewed with the KISR research team and the O&M lead; soiling results are computed only after both agree the rules in writing.`,
            explanation: md`The protocol makes the quality rules part of the agreed method. Concrete thresholds with reasons, a physical timestamp test and careful handling of the natural-experiment period are what a research partner will look for.`,
            concepts: ["mz09.dq-checklist", "mz09.timestamps", "mz09.sensor-drift", "mz09.availability-flags"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to the O&M manager of a Kuwaiti plant why a one-hour timestamp error, or a pyranometer that nobody wipes, can make his plant look clean when it is dirty, or dirty when it is clean.",
          keyPoints: [
            "Expected energy depends on the sun's position and on measured irradiance",
            "A time shift misplaces solar position, creating a morning-afternoon mismatch that looks like a loss",
            "A soiled or drifting pyranometer reads low, so expected energy is too low and the plant looks better",
            "Wiping the sensor then makes the plant suddenly look worse",
            "The fix is a solar-noon check, redundant sensors and a sensor cleaning log",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz09-l05-q1",
      type: "mcq",
      prompt: md`What is Kuwait's time zone, and does it use daylight saving?`,
      options: ["UTC+3, no daylight saving", "UTC+3 in winter and UTC+4 in summer", "UTC+4, no daylight saving", "UTC+2, with daylight saving"],
      answer: 0,
      explanation: md`Kuwait (IANA Asia/Kuwait) is UTC+3 all year. Daylight saving artefacts can still appear in data exported by systems configured for European time zones.`,
      concepts: ["mz09.timestamps"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz09-l05-q2",
      type: "numeric",
      prompt: md`Site at 48.0° E in Kuwait (standard meridian 45° E), equation of time $-14$ min (mid February). At what local clock time is solar noon? Give minutes after midnight.`,
      answer: 722,
      tolerance: { abs: 1 },
      unit: "min",
      explanation: md`$t_{noon} = 720 - 4\,(48 - 45) - (-14) = 720 - 12 + 14 = 722$ min, that is 12:02. In February the sun is "slow", so solar noon is later than in November.`,
      concepts: ["mz09.timestamps"],
      difficulty: 2,
    },
    {
      id: "mz09-l05-q3",
      type: "mcq",
      prompt: md`A pyranometer reads 3 % low because of soiling. The array's true performance index is 0.88. What will the analysis report?`,
      options: ["0.854", "0.880", "0.907", "0.970"],
      answer: 2,
      explanation: md`$\mathrm{PI}_{meas} = 0.88/0.97 = 0.907$. The low sensor makes the plant look better by about 2.7 points.`,
      concepts: ["mz09.sensor-drift"],
      difficulty: 2,
    },
    {
      id: "mz09-l05-q4",
      type: "multi",
      prompt: md`Which observations point to a stale (frozen) value rather than a real reading? (Select all.)`,
      options: [
        "POA irradiance identical to four decimals for 90 minutes at midday",
        "Inverter power flat at the AC rating for two hours on a clear day",
        "Module temperature unchanged for a full day while ambient swings 15 °C",
        "Power at zero at night",
      ],
      answer: [0, 2],
      explanation: md`Real irradiance and module temperature always fluctuate a little. Power flat at the AC limit is clipping, a real state that needs its own flag; zero power at night is correct.`,
      concepts: ["mz09.gaps-stale", "mz09.availability-flags"],
      difficulty: 2,
    },
    {
      id: "mz09-l05-q5",
      type: "mcq",
      prompt: md`On a Kuwaiti summer afternoon an inverter's power is flat at 88 % of its AC rating with no PPC setpoint below potential. What is the most likely explanation?`,
      options: ["Clipping", "Curtailment", "Thermal derating at high temperature", "Heavy soiling"],
      answer: 2,
      explanation: md`Clipping is flat at the AC rating; curtailment needs a setpoint; soiling does not produce a flat top. Many inverters reduce their maximum output at high temperature: check the derating flag and internal temperature.`,
      concepts: ["mz09.availability-flags"],
      difficulty: 2,
    },
    {
      id: "mz09-l05-q6",
      type: "decision",
      prompt: md`Your quality filters flag a day with a sudden 30 % drop in plant output during a dust storm as an outlier. What should the pipeline do?`,
      options: [
        { text: "Remove the day as an outlier", score: 0.1, feedback: "You would delete the very events that drive soiling in Kuwait." },
        { text: "Flag the day as a dust event, keep it, and let the measured-POA model separate atmospheric dimming from the deposit that persists afterwards", score: 1, feedback: "Right: storms are signal. The flag lets analysis treat them deliberately." },
        { text: "Fill the day with the average of the days before and after", score: 0, feedback: "Inventing data hides both the storm and its deposit." },
      ],
      explanation: md`Quality control removes defects of the measurement, not real behaviour of the plant. Dust storms are real behaviour.`,
      concepts: ["mz09.dq-checklist", "mz09.gaps-stale"],
      difficulty: 2,
    },
    {
      id: "mz09-l05-q7",
      type: "order",
      prompt: md`Order the first steps of a pilot's data work.`,
      items: ["Store the raw extract untouched", "Inventory tags, units and time span", "Run the quality tests", "Write the data-quality report", "Agree the rules with operator and research partner", "Compute the first soiling results"],
      explanation: md`Agreeing the rules before showing results turns later disputes into references to agreed rules.`,
      concepts: ["mz09.dq-checklist"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz09-l05-f1", front: "Solar noon formula (local clock, minutes)", back: md`$t_{noon} = 720 - 4(\lambda - \lambda_{std}) - E$; Kuwait $\lambda_{std} = 45^\circ$ E`, concepts: ["mz09.timestamps"] },
    { id: "mz09-l05-f2", front: "Clear-day curve shifted by half an interval: cause", back: "Interval-ending (or beginning) labels not accounted for", concepts: ["mz09.timestamps"] },
    { id: "mz09-l05-f3", front: "Bias from a sensor reading low by factor r", back: md`$\mathrm{PI}_{meas} = \mathrm{PI}_{true}/r$: the plant looks better`, concepts: ["mz09.sensor-drift"] },
    { id: "mz09-l05-f4", front: "Best drift detector", back: "Trend of the clear-period ratio between two co-located irradiance sensors, read with the sensor log", concepts: ["mz09.sensor-drift"] },
    { id: "mz09-l05-f5", front: "Completeness denominator for irradiance and power", back: "Daylight intervals only; stale or invalid values do not count as valid", concepts: ["mz09.gaps-stale"] },
    { id: "mz09-l05-f6", front: "Flat top below AC rating on a hot afternoon, no setpoint", back: "Thermal derating: check the derating flag and inverter temperature", concepts: ["mz09.availability-flags"] },
    { id: "mz09-l05-f7", front: "Dust storm days in quality control", back: "Flag, do not remove", concepts: ["mz09.dq-checklist"] },
  ],
};

export default lesson;
