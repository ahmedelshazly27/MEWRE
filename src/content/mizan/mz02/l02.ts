import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz02-l02",
  title: "Performance ratio and temperature correction",
  summary:
    "Basic PR, why it swings with the seasons in Kuwait, and the NREL weather-corrected PR (Dierauf et al. 2013) derived step by step, including the identity that makes it equal to basic PR over the reference year. Cell temperature from NOCT, Faiman and Sandia models or from back-of-module sensors, and how the corrected PR becomes the baseline from which a soiling product reads dust.",
  minutes: 80,
  objectives: [
    "Compute basic PR, STC-corrected PR and NREL weather-corrected PR from interval data, and explain when each is appropriate",
    "Derive the weather-corrected PR and show why it equals the basic PR over the reference year",
    "Compute the irradiance-weighted reference cell temperature and estimate cell temperature with NOCT, Faiman and Sandia models",
    "Explain what is left in a corrected PR series (soiling, availability, degradation, faults, sensor drift) and why it is the baseline for soiling analytics",
  ],
  concepts: [
    {
      id: "mz02.basic-pr",
      name: "Basic performance ratio",
      description: "Final yield over reference yield; removes the amount of sunshine but not the temperature, so it swings seasonally in hot climates.",
      competency: "mz-soiling",
      related: ["m02.performance-ratio", "m12.performance-ratio"],
    },
    {
      id: "mz02.weather-corrected-pr",
      name: "NREL weather-corrected PR",
      description: "PR whose expected energy is scaled by 1 + delta (T_cell,i - T_cell,avg), with T_cell,avg the irradiance-weighted annual-average cell temperature; removes seasonal temperature bias.",
      competency: "mz-soiling",
      related: ["mz02.basic-pr", "m07.pr-test", "m09.pr-guarantee"],
    },
    {
      id: "mz02.reference-temperature",
      name: "Reference cell temperature",
      description: "The T_ref of a corrected PR: 25 °C gives an STC-corrected PR (inflated); the irradiance-weighted annual average gives a PR on the same scale as annual basic PR.",
      competency: "mz-soiling",
      related: ["mz02.weather-corrected-pr"],
    },
    {
      id: "mz02.cell-temperature-models",
      name: "Cell temperature models",
      description: "NOCT (one parameter, wind blind), Faiman (U0 + U1 v), Sandia (exponential in wind plus a cell-to-back delta T); or measured back-of-module temperature converted to cell temperature.",
      competency: "mz-soiling",
      related: ["m02.cell-temperature"],
    },
    {
      id: "mz02.pr-residual",
      name: "What is left in a corrected PR",
      description: "After temperature correction, PR variation is soiling, availability, curtailment, clipping, degradation, faults and sensor errors; isolating soiling needs the other terms filtered or modelled.",
      competency: "mz-soiling",
      related: ["mz02.weather-corrected-pr", "m12.loss-attribution"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "Basic PR and why Kuwait's seasons break it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The pilot baseline agreed with KISR is a temperature-corrected PR to IEC 61724. Every claim Mizan makes ("soiling cost this plant X % in May", "cleaning on day N would have paid back") is a difference between a corrected PR and what it would have been clean. If the temperature correction is wrong by two points, that error lands entirely in the soiling estimate. You do not write the code, but you must be able to check the derivation, pick the reference temperature and defend it in a review.`,
        },
        {
          kind: "xref",
          to: "m02-l06",
          note: "Track 0 introduces PR, specific yield, the loss tree and P50/P90 from a PM's point of view. Here we derive the corrected PR an analytics product actually computes.",
        },
        {
          kind: "md",
          md: md`### Basic PR

The **reference yield** $Y_r = H_{POA}/G_{STC}$ is the number of hours the array would have run at 1,000 W/m². The **final yield** $Y_f = E/P_{STC}$ is the energy per kWp. Their ratio is the performance ratio:`,
        },
        { kind: "equation", formula: "mz02-pr-basic" },
        {
          kind: "md",
          md: md`PR removes **how much** sun there was. It does not remove **how hot** the cells were. Silicon modules lose about 0.3 to 0.45 % of power per kelvin above 25 °C. In Kuwait, irradiance-weighted cell temperatures run around 30 °C in January and close to 70 °C in July (illustrative), so a healthy plant's basic PR falls by more than ten points from winter to summer. Any soiling signal (a few percent) disappears inside that swing.

### Correcting for temperature, step by step

**Step 1. Expected energy without temperature.** For interval $i$, a perfect array would produce $P_{STC}\, G_{POA,i}\tau_i/G_{STC}$. That is the denominator of basic PR.

**Step 2. Add the temperature effect relative to 25 °C.** Multiply by $1 + \delta(T_{cell,i} - 25)$ with $\delta$ the power temperature coefficient (negative, per kelvin). The resulting PR is **STC-corrected**: in the example below it is about 0.86 in every month. Seasonally flat, but on a different scale: higher than any annual PR the plant will ever report, higher than the PR in the yield model, and higher than a guarantee written as an annual PR. Mixing the two scales is a classic dispute.

**Step 3. Use the site's typical temperature as reference instead.** Dierauf et al. (NREL, 2013) replace 25 °C by the **irradiance-weighted annual-average cell temperature** $T_{cell,avg}$:`,
        },
        { kind: "equation", formula: "mz02-tref-weighted" },
        { kind: "equation", formula: "mz02-pr-nrel" },
        {
          kind: "md",
          md: md`**Step 4. Why the scale is right.** Over the year from which $T_{cell,avg}$ was computed:

$$\sum_i G_i\,[1 + \delta\,(T_{cell,i} - T_{cell,avg})] = \sum_i G_i + \delta\left(\sum_i G_i T_{cell,i} - T_{cell,avg}\sum_i G_i\right) = \sum_i G_i$$

because the bracket in the second term is zero by the definition of the weighted mean. So **over the reference year the corrected PR equals the basic PR**. Over a hot week the denominator shrinks (less expected energy) and over a cool week it grows; the seasonal bias is removed while the annual number stays on the familiar scale. To first order, $PR_{corr} \approx PR_{STC}\,[1 + \delta(T_{cell,avg} - 25)]$.

**Step 5. Fix $T_{cell,avg}$ in advance.** Compute it from a typical meteorological year, or the first full year of site data, using the same cell temperature model as the analysis, and freeze it in the methodology. Recomputing it each year moves the baseline and can manufacture or hide a trend.

IEC 61724-1 also defines temperature-corrected PR variants with an STC reference and with an annual-equivalent reference; the NREL method is the annual-equivalent idea with a published test protocol and an open-source implementation (pvanalytics). Check which variant a contract names.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "How much does the correction matter in Kuwait?",
          md: md`Gopi et al. (2021) report that weather correction matters most in cold climates and less in tropical ones. Kuwait is neither: its hot summers and mild winters give a large **seasonal** swing in cell temperature, so for monthly or weekly PR (which is what soiling analysis uses) the correction should matter a lot. That last point is an inference from physics, not a published Kuwait result; the Shagaya data will show it.`,
        },
        { kind: "sources", refs: ["mz02-nrel-wcpr-2013", "mz02-pvanalytics-pr-nrel", "mz02-gopi-2021", "mz02-iec-61724-1-2021"] },
      ],
    },
    {
      layer: "theory",
      title: "Cell temperature: models and measurement",
      blocks: [
        {
          kind: "xref",
          to: "m02-l02",
          note: "Track 0 introduces NOCT and Faiman with a 50 °C worked example. This section adds the Sandia model used by NREL and shows how a sensor reading becomes T_cell.",
        },
        {
          kind: "md",
          md: md`The corrected PR needs $T_{cell,i}$ for every interval. Two routes:

**Measured.** Back-of-module (BOM) temperature sensors (Pt100/Pt1000 or thermocouples) bonded to the back sheet or rear glass, several per block. Convert to cell temperature with the Sandia relation $T_c = T_m + (G/1000)\,\Delta T$, with $\Delta T \approx 3$ °C for open-rack glass/back-sheet modules. Failure modes: sensors that debond in heat (read near ambient), sensors on edge modules (cooler, better ventilated), sensors in shade.

**Modelled from weather.** Ambient temperature, POA irradiance and wind:`,
        },
        { kind: "equation", formula: "mz02-tcell-noct" },
        { kind: "equation", formula: "mz02-tcell-faiman" },
        { kind: "equation", formula: "mz02-tcell-sandia" },
        {
          kind: "md",
          md: md`Same conditions, three models (POA 950 W/m², ambient 45 °C, wind 3 m/s, NOCT 45 °C):

| Model | Calculation | Result |
|---|---|---|
| NOCT | $45 + \frac{25}{800}\times 950$ | 74.7 °C |
| Faiman ($U_0 = 25$, $U_1 = 6.84$) | $45 + 950/45.5$ | 65.9 °C |
| Sandia module ($a = -3.56$, $b = -0.075$) | $950\, e^{-3.785} + 45$ | 66.6 °C |
| Sandia cell ($\Delta T = 3$) | $66.6 + 0.95 \times 3$ | 69.4 °C |

The spread is almost 9 K. With $\delta = -0.4$ %/°C that is 3.5 % of expected energy, more than a typical week's soiling loss. Two rules follow: **use one model consistently** for $T_{cell,avg}$ and for every interval, and **calibrate it to site BOM data** (fit $U_0, U_1$ or $a, b$) when good sensors exist. A consistent bias in the model largely cancels in the corrected PR because the same bias sits in $T_{cell,avg}$; a model that is wrong differently in summer and winter does not cancel.`,
        },
        {
          kind: "widget",
          widget: "pr-correction",
          caption: "Set the soiling rate to 0 first: basic PR swings with the seasons, corrected PR is flat. Then add 0.3 %/day soiling with a 30-day cleaning interval: the sawtooth only becomes readable in the corrected line. Raise the summer cell temperature to 75 °C and watch the basic PR dip deepen.",
        },
        { kind: "sources", refs: ["mz02-sandia-king-2004", "mz02-faiman-2008", "mz02-pvlib", "mz02-nrel-wcpr-2013"] },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "Correcting PR on an illustrative 10 MWp desert plant",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "January versus July: basic, STC-corrected and weather-corrected PR",
          given: md`Illustrative 10 MWp plant (about the size of the Shagaya Phase I PV plant, but these are **not** Shagaya data). $\delta = -0.40$ %/°C. Reference $T_{cell,avg} = 48$ °C (from a typical year). The plant is clean and healthy: its PR at 25 °C cell temperature would be 0.86 all year.
- January: $H_{POA} = 155$ kWh/m², irradiance-weighted $T_{cell} = 30$ °C.
- July: $H_{POA} = 230$ kWh/m², irradiance-weighted $T_{cell} = 68$ °C.`,
          steps: [
            { md: md`**Energy produced**: January $10{,}000 \times 155 \times 0.86 \times [1 - 0.004(30 - 25)] = 1{,}306$ MWh. July $10{,}000 \times 230 \times 0.86 \times [1 - 0.004(68 - 25)] = 1{,}638$ MWh.` },
            { md: md`**Basic PR**: January $1{,}306{,}340/1{,}550{,}000 = 0.843$. July $1{,}637{,}784/2{,}300{,}000 = 0.712$. A 13-point drop on a plant with nothing wrong.` },
            { md: md`**STC-corrected PR** ($T_{ref} = 25$ °C): $0.860$ in both months. Flat, but 2 points (January) to 15 points (July) above the basic PR, and about 8 points above the annual basic PR: not comparable to a yield model or guarantee.` },
            { md: md`**NREL corrected PR**: January denominator $1{,}550{,}000 \times [1 - 0.004(30 - 48)] = 1{,}661{,}600$ kWh, so $PR_{corr} = 0.786$. July $2{,}300{,}000 \times [1 - 0.004(68 - 48)] = 2{,}116{,}000$ kWh, so $PR_{corr} = 0.774$.` },
            { md: md`**Residual**: 1.2 points between months instead of 13. The residual comes from linearising around $T_{cell,avg}$ instead of 25 °C; it is smaller than typical month-to-month noise, but an analyst should know it exists.` },
            { md: md`**Now add soiling**: if July's average soiling loss were 5 %, energy falls to 1,556 MWh, basic PR to 0.677 and corrected PR to **0.735**. The 4-point drop in corrected PR is readable; in the basic PR it would be lost in the seasonal swing.` },
          ],
          result: md`Basic PR: 0.843 → 0.712 (heat). NREL corrected PR: 0.786 → 0.774 (flat to within 1.2 points). With 5 % soiling in July: corrected PR 0.735. Temperature correction is what turns PR into a soiling instrument.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Corrected PR over four hours of a hot day",
          given: md`Same plant, $T_{cell,avg} = 48$ °C, $\delta = -0.40$ %/°C. Four one-hour intervals:

| Hour | POA (W/m²) | $T_{cell}$ (°C) | Energy (MWh) |
|---|---|---|---|
| 1 | 300 | 35 | 2.48 |
| 2 | 700 | 55 | 5.20 |
| 3 | 950 | 68 | 6.66 |
| 4 | 500 | 50 | 3.75 |`,
          steps: [
            { md: md`**Basic PR**: $\sum E = 18.09$ MWh; $\sum P_{STC} G\tau/G_{STC} = 10 \times 2.45 = 24.5$ MWh; $PR = 0.738$.` },
            { md: md`**Corrected expected energy per hour**: $10 \times 0.30 \times [1 + 0.004 \times 13] = 3.156$; $10 \times 0.70 \times [1 - 0.004 \times 7] = 6.804$; $10 \times 0.95 \times [1 - 0.004 \times 20] = 8.740$; $10 \times 0.50 \times [1 - 0.004 \times 2] = 4.960$ MWh.` },
            {
              md: md`**Sum of corrected expected energy**: $23.66$ MWh.`,
              hidden: true,
              check: { prompt: "Sum of temperature-corrected expected energy (MWh)", answer: 23.66, unit: "MWh", tolerance: { abs: 0.02 } },
            },
            {
              md: md`**Corrected PR**: $18.09/23.66 = 0.765$.`,
              hidden: true,
              check: { prompt: "Weather-corrected PR", answer: 0.7646, tolerance: { abs: 0.002 } },
            },
            { md: md`**The identity, tested**: the irradiance-weighted cell temperature of these four hours is $138{,}600/2{,}450 = 56.6$ °C. Using **that** as reference would give exactly the basic PR, 0.738. That is why $T_{cell,avg}$ must come from a full year, not from the period being analysed.` },
          ],
          result: md`$PR = 0.738$ basic, $0.765$ corrected to the annual reference, $0.845$ if corrected to 25 °C. Three defensible numbers from the same data: the methodology must name one.`,
        },
        {
          kind: "question",
          question: {
            id: "mz02-l02-p1",
            type: "numeric",
            prompt: md`Independent problem. In a month the illustrative 10 MWp plant exports 1,500 MWh under $H_{POA} = 200$ kWh/m². The irradiance-weighted cell temperature for the month was 60 °C; $T_{cell,avg} = 48$ °C and $\delta = -0.40$ %/°C. Treating the month as one interval, what is the weather-corrected PR?`,
            answer: 0.7878,
            tolerance: { abs: 0.002 },
            explanation: md`Basic $PR = 1{,}500{,}000/(10{,}000 \times 200) = 0.750$. Corrected denominator $2{,}000{,}000 \times [1 - 0.004 \times (60 - 48)] = 1{,}904{,}000$ kWh, so $PR_{corr} = 0.788$. Treating a month as one interval is a shortcut; the real computation sums hourly or 15-minute intervals.`,
            concepts: ["mz02.weather-corrected-pr"],
            difficulty: 1,
          },
        },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "PR in O&M reports, contracts and analytics",
      blocks: [
        {
          kind: "md",
          md: md`**Where you will meet it.** O&M monthly reports (often basic PR, sometimes STC-corrected), EPC performance tests at takeover (corrected PR over a short test window, see Track 0 m07), O&M contract guarantees (annual PR, often with availability), and analytics platforms. In code, pvanalytics provides **performance_ratio_nrel**; pvlib provides the temperature models.

**What a soiling product does with it.** Compute $PR_{corr}$ daily on filtered data, then read the slow decline between cleanings and the jumps at cleanings. Availability, curtailment and clipping must be removed first or they masquerade as soiling. The plant-level inference methods (stochastic rate and recovery, change-point methods) are the subject of the next module.`,
        },
        {
          kind: "xref",
          to: "m07-l05",
          note: "How a temperature-corrected PR test is run at takeover: test window, Tref, filters, sensors and uncertainty treatment.",
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "PR traps that will mislead a soiling analysis",
          md: md`- **Mixing references**: comparing an STC-corrected monthly PR with an annual basic PR guarantee (about 8 points apart for the illustrative plant).
- **Recomputing $T_{cell,avg}$ every year**: the baseline moves and creates a fake trend.
- **Different temperature models** for the reference and the intervals.
- **Module temperature used as cell temperature** without the $\Delta T$ term, or debonded BOM sensors reading near ambient.
- **Bifacial plants**: rear irradiance adds energy to the numerator but not the front-POA denominator; PR rises with albedo, not with health.
- **Dirty irradiance sensors**: a pyranometer dome soiled by 3 % makes PR look 3 % better and hides exactly the soiling you are trying to measure.
- **Clipping**: on a high DC/AC plant summer noon hours are clipped; the PR drop is an inverter limit, not dust.`,
        },
        {
          kind: "checklist",
          title: "Before using a PR series as a soiling baseline",
          items: [
            "PR variant named (basic, STC-corrected, NREL weather-corrected) and the same everywhere",
            "T_cell,avg computed once, from a full year, with the stated cell temperature model, and frozen",
            "Temperature coefficient taken from the module datasheet or fitted, and stated",
            "BOM sensor health checked (debonding, shading, edge position) before trusting measured temperatures",
            "Availability, curtailment and clipping intervals removed or flagged",
            "Irradiance sensor cleaning and calibration logs reviewed",
          ],
        },
        { kind: "scenario", scenario: "mz02-s1" },
        {
          kind: "question",
          question: {
            id: "mz02-l02-p2",
            type: "short",
            prompt: md`Applied exercise. Write the **"Performance baseline"** paragraph of the Shagaya pilot methodology note (150 to 250 words): which PR Mizan will compute, every parameter it needs and where each comes from, and how the plant's two technology sections are treated.`,
            rubric: [
              "Names the NREL weather-corrected PR (annual-average reference) consistent with IEC 61724-1, and explains why not basic or STC-corrected",
              "States how T_cell,avg is computed (irradiance weighted, one full year, fixed model) and that it is frozen",
              "Specifies temperature source (BOM sensors with delta T conversion, or a named model fitted to site data) and the temperature coefficients per technology",
              "Treats the thin-film and poly-Si sections separately with their own coefficients and expected energy",
              "Lists the exclusions (availability, curtailment, clipping, sensor faults) applied before PR is computed",
              "Uses no invented Shagaya numbers and describes the pilot as targeted or in preparation",
            ],
            modelAnswer: md`**Performance baseline (draft).** The baseline metric is the weather-corrected performance ratio of Dierauf et al. (NREL, 2013), which is the annual-equivalent temperature-corrected PR of IEC 61724-1. Basic PR is not used because the summer temperature swing at Shagaya hides soiling; STC-corrected PR is not used because it sits on a different scale from the plant's historical and contractual PR. PR is computed separately for the thin-film and the poly-Si sections, each with its own DC nameplate, its own power temperature coefficient from the module datasheet (to be confirmed by an outdoor fit on clean days) and its own inverter energy. Cell temperature comes from back-of-module sensors converted with the Sandia relation ($\Delta T = 3$ °C) where sensors pass health checks; otherwise from the Sandia model fitted to the healthy sensors. The reference temperature $T_{cell,avg}$ is the irradiance-weighted cell temperature over the first complete calendar year of usable data, computed with the same model, and frozen for the study. Intervals are 15 minutes; intervals with inverter unavailability, export curtailment, clipping, POA below 200 W/m² or failed sensor checks are excluded before summation. The code and the frozen parameters are shared with KISR so the baseline can be reproduced independently.`,
            explanation: md`A good baseline paragraph removes every degree of freedom: variant, reference, temperature source, coefficients, sectioning and exclusions. The two Shagaya technologies differ in temperature coefficient and spectral response, so one plant-wide PR would mix them.`,
            concepts: ["mz02.weather-corrected-pr", "mz02.reference-temperature", "mz02.cell-temperature-models"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an O&M manager why the weather-corrected PR equals the ordinary PR over a full year but not over July, and why that is exactly what you want.",
          keyPoints: [
            "The reference temperature is the plant's typical (irradiance-weighted annual) cell temperature",
            "Hot hours above that typical value are expected to produce less, cool hours more",
            "Over the whole reference year these adjustments cancel, so the annual number stays on the familiar PR scale",
            "Over a hot month the expected energy is lowered, so the plant is not blamed for the weather",
            "What remains in the corrected series is soiling, outages, degradation and faults",
          ],
        },
      ],
    },
  ],
  scenarios: [
    {
      id: "mz02-s1",
      title: "\"The July PR drop is just the heat\"",
      dayInLife: true,
      context: md`You are reviewing an O&M monthly report for a Kuwait PV plant with a prospective client. Basic PR: January 0.84, July 0.71. The contractor's comment: "Seasonal temperature effect, no action needed." Cleaning is monthly. Your engineering partner can rerun the data within a day.`,
      start: "a",
      concepts: ["mz02.weather-corrected-pr", "mz02.pr-residual", "mz02.basic-pr"],
      nodes: {
        a: {
          md: md`The client asks: "Is the contractor right?"`,
          choices: [
            { text: "Ask for the raw 15-minute data and compute the NREL weather-corrected PR before answering", next: "b", score: 10, feedback: "Right. A 13-point basic PR drop is roughly what heat alone does in Kuwait, so the claim is plausible, but only the corrected PR can tell heat from dust." },
            { text: "Agree: summer heat explains it", score: 3, feedback: "Plausible but unproven. You just endorsed a number you did not check, in front of a client." },
            { text: "Say it is soiling: monthly cleaning is not enough in summer", score: 2, feedback: "Also unproven, and it contradicts the contractor without evidence. Credibility with O&M contractors matters for Mizan's distribution thread." },
          ],
        },
        b: {
          md: md`Corrected PR: January 0.79, July 0.77 on average. But within July the corrected PR falls from 0.79 just after cleaning to 0.74 before the next cleaning, with a 3-point step on the day of a dust event.`,
          choices: [
            { text: "Report: the monthly average gap is mostly heat, but the intra-month sawtooth shows about 5 points of soiling before each cleaning; propose a station check and a post-storm cleaning trial", next: "c", score: 10, feedback: "Precise and fair: you confirm what the contractor got right and quantify what was missed." },
            { text: "Report only the monthly averages: the contractor is right", score: 4, feedback: "You threw away the signal. Monthly averages smooth out exactly the soiling dynamics a cleaning decision needs." },
            { text: "Report that the plant is losing 5 % to soiling all month", score: 3, feedback: "Overstated: the average soiling loss over a linear sawtooth is about half the peak." },
          ],
        },
        c: {
          md: md`The contractor replies that the irradiance sensors are cleaned "weekly".`,
          choices: [
            { text: "Flag that weekly sensor cleaning in Kuwaiti summer biases PR upwards between cleanings, so the true soiling sawtooth may be larger; ask for the sensor cleaning log and compare against a clean reference", score: 10, feedback: "Exactly. A dirty pyranometer makes PR look better and hides soiling. The measured 5 points is a lower bound until the sensor issue is excluded." },
            { text: "Ignore it, weekly is fine", score: 2, feedback: "In dust, irradiance sensors can lose several percent in a week; Class A practice in Kuwait is daily cleaning." },
          ],
        },
      },
    },
  ],
  quiz: [
    {
      id: "mz02-l02-q1",
      type: "mcq",
      prompt: "Why does the basic PR of a healthy Kuwait plant fall from January to July?",
      options: [
        "Higher cell temperatures reduce module power, and basic PR does not correct for temperature",
        "There is less irradiance in July",
        "Inverters are less efficient at high irradiance",
        "Basic PR includes a soiling correction that fails in summer",
      ],
      answer: 0,
      explanation: md`PR normalises by irradiance, not temperature. With cell temperatures near 70 °C and $\delta \approx -0.4$ %/°C, summer output is about 17 % below STC from heat alone, against about 2 % in January.`,
      concepts: ["mz02.basic-pr"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz02-l02-q2",
      type: "numeric",
      prompt: md`Hourly data: (POA 400 W/m², $T_{cell}$ 40 °C), (800 W/m², 60 °C), (600 W/m², 52 °C). What is the irradiance-weighted cell temperature in °C?`,
      answer: 52.89,
      tolerance: { abs: 0.05 },
      unit: "°C",
      explanation: md`$(400 \times 40 + 800 \times 60 + 600 \times 52)/1{,}800 = (16{,}000 + 48{,}000 + 31{,}200)/1{,}800 = 95{,}200/1{,}800 = 52.89$ °C. The plain average would be 50.7 °C: weighting pulls the reference towards the bright, hot hours.`,
      concepts: ["mz02.reference-temperature"],
      difficulty: 1,
    },
    {
      id: "mz02-l02-q3",
      type: "mcq",
      prompt: "Over the full year from which T_cell,avg was computed, how does the NREL weather-corrected PR compare with the basic PR?",
      options: ["They are equal", "Corrected PR is several points higher", "Corrected PR is lower", "It depends on the soiling rate"],
      answer: 0,
      explanation: md`$\sum G_i(T_i - T_{avg}) = 0$ by definition of the weighted mean, so the corrected denominator equals the basic one over the reference year. The STC-corrected PR is the one that sits several points higher (about 8 for the illustrative plant).`,
      concepts: ["mz02.weather-corrected-pr", "mz02.reference-temperature"],
      difficulty: 2,
    },
    {
      id: "mz02-l02-q4",
      type: "numeric",
      prompt: md`Sandia model, open rack ($a = -3.56$, $b = -0.075$, $\Delta T = 3$ °C): POA 800 W/m², ambient 40 °C, wind 2 m/s. What is the cell temperature in °C?`,
      answer: 61.98,
      tolerance: { abs: 0.1 },
      unit: "°C",
      explanation: md`$T_m = 800\, e^{-3.56 - 0.15} + 40 = 800 \times 0.02448 + 40 = 59.58$ °C. $T_c = 59.58 + 0.8 \times 3 = 61.98$ °C.`,
      concepts: ["mz02.cell-temperature-models"],
      difficulty: 2,
    },
    {
      id: "mz02-l02-q5",
      type: "multi",
      prompt: "After weather correction, which of these can still make the corrected PR fall between two cleanings?",
      options: ["Soiling", "Inverter outages not filtered out", "A pyranometer getting dirty", "Clipping on hot clear days", "Seasonal temperature change"],
      answer: [0, 1, 3],
      explanation: md`Soiling, unfiltered outages and clipping all lower the corrected PR. A dirty pyranometer makes PR **rise** (less measured irradiance). The seasonal temperature effect is what the correction removes.`,
      concepts: ["mz02.pr-residual"],
      difficulty: 2,
    },
    {
      id: "mz02-l02-q6",
      type: "decision",
      prompt: "A client's EPC guarantee is an annual PR of 0.80. The analytics dashboard shows a monthly STC-corrected PR of 0.85 in July. The client says the plant beats its guarantee. What do you say?",
      options: [
        { text: "The two numbers are on different scales; compare the guarantee with the PR variant the contract defines (or a weather-corrected PR on the annual reference) before concluding anything", score: 1, feedback: "Correct. STC-corrected PR sits several points above an annual PR by construction." },
        { text: "Agree, 0.85 beats 0.80", score: 0, feedback: "That comparison is meaningless: 25 °C reference vs annual basic PR." },
        { text: "Subtract 5 points to convert", score: 0.3, feedback: "A rule of thumb is not a conversion; the offset depends on the site's cell temperatures and coefficient." },
      ],
      explanation: md`Always check the PR definition, the reference temperature and the period before comparing PR numbers.`,
      concepts: ["mz02.reference-temperature"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz02-l02-f1", front: "Basic PR", back: md`$PR = \sum E / (P_{STC}\sum G\tau/G_{STC})$: removes sunshine amount, not temperature.`, concepts: ["mz02.basic-pr"] },
    { id: "mz02-l02-f2", front: "NREL weather-corrected PR denominator factor", back: md`$1 - (\delta/100)(T_{cell,avg} - T_{cell,i})$, equivalently $1 + (\delta/100)(T_{cell,i} - T_{cell,avg})$.`, concepts: ["mz02.weather-corrected-pr"] },
    { id: "mz02-l02-f3", front: "T_cell,avg", back: "Irradiance-weighted annual-average cell temperature, from a full year, fixed for the study.", concepts: ["mz02.reference-temperature"] },
    { id: "mz02-l02-f4", front: "Corrected PR over the reference year", back: "Equals basic PR (the weighted deviations sum to zero).", concepts: ["mz02.weather-corrected-pr"] },
    { id: "mz02-l02-f5", front: "Sandia module temperature", back: md`$T_m = G\,e^{a + b v} + T_a$; $T_c = T_m + (G/1000)\Delta T$; open rack $a = -3.56$, $b = -0.075$, $\Delta T = 3$ °C.`, concepts: ["mz02.cell-temperature-models"] },
    { id: "mz02-l02-f6", front: "Why STC-corrected PR misleads", back: "Seasonally flat but on a higher scale than any annual PR or guarantee.", concepts: ["mz02.reference-temperature"] },
    { id: "mz02-l02-f7", front: "Dirty pyranometer effect on PR", back: "PR reads higher, hiding soiling.", concepts: ["mz02.pr-residual"] },
  ],
};

export default lesson;
