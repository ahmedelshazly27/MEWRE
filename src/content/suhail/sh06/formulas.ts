import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 compute arithmetic
  {
    id: "sh06-facility-gpus",
    name: "Accelerators a data centre can power",
    tex: String.raw`N_{gpu} \approx \frac{P_{f}}{\mathrm{PUE}\cdot p_{g}}`,
    vars: [
      { sym: "N_{gpu}", meaning: "Number of accelerators (GPUs) the site can run at full load", unit: "-" },
      { sym: "P_{f}", meaning: "Total facility power (grid connection actually used)", unit: "kW" },
      { sym: "\\mathrm{PUE}", meaning: "Power usage effectiveness: total facility power divided by IT power", unit: "-" },
      { sym: "p_{g}", meaning: "IT power per accelerator including its share of host CPU, memory and network at rack level", unit: "kW" },
    ],
    explanation: md`A sanity check for announcements quoted in megawatts. With illustrative values $p_g = 1.7$ kW (a liquid-cooled Blackwell-class rack of 72 GPUs drawing roughly 120 kW) and PUE 1.25, a 200 MW site holds about 94,000 GPUs. Check first whether the announced MW is IT load or total facility power: if it is IT load, drop the PUE term. Rearranged, $P_f = N_{gpu}\,\mathrm{PUE}\,p_g$ turns a chip count into the power it needs.`,
    lesson: "sh06-l01",
  },
  // ---------------------------------------------------------------- l02 model cards
  {
    id: "sh06-train-compute",
    name: "Training compute of a dense transformer",
    tex: String.raw`C \approx 6\,N\,D`,
    vars: [
      { sym: "C", meaning: "Total training compute", unit: "FLOP" },
      { sym: "N", meaning: "Number of model parameters", unit: "-" },
      { sym: "D", meaning: "Number of training tokens", unit: "tokens" },
    ],
    explanation: md`About 2 FLOP per parameter per token for the forward pass and 4 for the backward pass (Kaplan et al. 2020). It ignores attention cost at long context and does not apply directly to mixture-of-experts models (use active parameters). Illustrative: a 7B model on 5.2T tokens needs $6\times7\times10^{9}\times5.2\times10^{12} \approx 2.2\times10^{23}$ FLOP. Module sh09 covers scaling laws and cost in depth.`,
    lesson: "sh06-l02",
  },
  {
    id: "sh06-gpu-hours",
    name: "GPU-hours from training compute",
    tex: String.raw`H = \frac{C}{F_{peak}\cdot u \cdot 3600}`,
    vars: [
      { sym: "H", meaning: "GPU-hours needed", unit: "GPU-h" },
      { sym: "C", meaning: "Training compute", unit: "FLOP" },
      { sym: "F_{peak}", meaning: "Peak dense throughput per GPU at the training precision", unit: "FLOP/s" },
      { sym: "u", meaning: "Model FLOP utilisation (MFU): share of peak actually achieved", unit: "fraction" },
    ],
    explanation: md`Multiply by a price per GPU-hour for a cost order of magnitude. Illustrative: an H100-class GPU at about $9.9\times10^{14}$ FLOP/s dense BF16 and 40% MFU delivers $3.96\times10^{14}$ FLOP/s, so $2.2\times10^{23}$ FLOP takes about 153,000 GPU-hours. Real projects add failed runs, ablations and evaluation, often a multiple of the final run.`,
    lesson: "sh06-l02",
  },
  {
    id: "sh06-score-gap",
    name: "Public vs blind benchmark gap",
    tex: String.raw`\Delta = S_{public} - S_{blind}`,
    vars: [
      { sym: "\\Delta", meaning: "Score gap; a large positive gap is a contamination or overfitting signal", unit: "percentage points" },
      { sym: "S_{public}", meaning: "Score on a benchmark whose test set is public", unit: "%" },
      { sym: "S_{blind}", meaning: "Score on a comparable private or blind test set", unit: "%" },
    ],
    explanation: md`Compare like with like (same task type, same prompting). A model that gains on public sets but not on blind ones (BALSAM's blind test sets, ABBL's contamination checks) has probably seen the test data or tuned to it. A NeurIPS 2026 paper found translated exposure alone raised MMLU accuracy by 2.8 to 11.3 points, so gaps of that size are not noise.`,
    lesson: "sh06-l02",
  },
  // ---------------------------------------------------------------- l03 funding data
  {
    id: "sh06-yoy",
    name: "Year-on-year change",
    tex: String.raw`g = \frac{X_t - X_{t-1}}{X_{t-1}}`,
    vars: [
      { sym: "g", meaning: "Year-on-year growth rate", unit: "fraction" },
      { sym: "X_t", meaning: "Value in the current period (funding, deal count)", unit: "USD or count" },
      { sym: "X_{t-1}", meaning: "Value in the same period one year earlier", unit: "USD or count" },
    ],
    explanation: md`Always compare the same period (H1 with H1, FY with FY) from the same provider. A large percentage on a small base says little: +225% from USD 2.3 bn is a different claim from +225% from USD 23 bn.`,
    lesson: "sh06-l03",
  },
  {
    id: "sh06-implied-prior",
    name: "Implied prior-period value",
    tex: String.raw`X_{t-1} = \frac{X_t}{1+g}`,
    vars: [
      { sym: "X_{t-1}", meaning: "Implied value one year earlier", unit: "USD or count" },
      { sym: "X_t", meaning: "Reported current value", unit: "USD or count" },
      { sym: "g", meaning: "Reported year-on-year change", unit: "fraction" },
    ],
    explanation: md`Recovers the base a provider is comparing against. MAGNiTT FY2025 USD 3.8 bn at +74% implies about USD 2.18 bn in 2024; Wamda USD 7.5 bn at +225% implies about USD 2.31 bn. The two providers roughly agree on 2024 and diverge sharply on 2025, which points to how they treated the large 2025 rounds and debt.`,
    lesson: "sh06-l03",
  },
  {
    id: "sh06-avg-ticket",
    name: "Average ticket per deal",
    tex: String.raw`\bar{T} = \frac{F}{n}`,
    vars: [
      { sym: "\\bar{T}", meaning: "Mean amount per deal", unit: "USD" },
      { sym: "F", meaning: "Total disclosed funding in the period", unit: "USD" },
      { sym: "n", meaning: "Number of deals (or startups, depending on the provider)", unit: "-" },
    ],
    explanation: md`A mean, not a typical round: one mega round lifts it a lot. A rising mean with a falling deal count means money is concentrating in fewer, larger rounds. MAGNiTT: USD 5.5 m in FY2025, USD 6.3 m in H1 2026. Check whether the provider counts deals or startups (Wamda's FY2025 figure is 647 startups).`,
    lesson: "sh06-l03",
  },
  {
    id: "sh06-share",
    name: "Share of total",
    tex: String.raw`s_i = \frac{F_i}{F}`,
    vars: [
      { sym: "s_i", meaning: "Share of segment i (a country, a sector, AI)", unit: "fraction" },
      { sym: "F_i", meaning: "Funding to segment i", unit: "USD" },
      { sym: "F", meaning: "Total funding in the same period and data set", unit: "USD" },
    ],
    explanation: md`MAGNiTT H1 2026: UAE USD 895 m of USD 1.35 bn is 66%; AI USD 678 m is about 50%. A rising share can come from the segment growing or from everything else shrinking: read the share next to the absolute numbers.`,
    lesson: "sh06-l03",
  },
  {
    id: "sh06-equity-only",
    name: "Equity-only funding",
    tex: String.raw`E = F\,(1-\delta)`,
    vars: [
      { sym: "E", meaning: "Equity funding", unit: "USD" },
      { sym: "F", meaning: "Reported total including debt", unit: "USD" },
      { sym: "\\delta", meaning: "Share of the total that is venture debt or credit facilities", unit: "fraction" },
    ],
    explanation: md`Use it before comparing a provider that includes debt with one that does not. Wamda H1 2026: USD 1.7 bn with 29% debt gives about USD 1.21 bn equity, below MAGNiTT's USD 1.35 bn: debt is not the only difference between the series.`,
    lesson: "sh06-l03",
  },
  {
    id: "sh06-ex-top",
    name: "Total excluding the largest rounds",
    tex: String.raw`F_{-k} = F - \sum_{j=1}^{k} f_{(j)}`,
    vars: [
      { sym: "F_{-k}", meaning: "Total without the k largest rounds", unit: "USD" },
      { sym: "F", meaning: "Reported total", unit: "USD" },
      { sym: "f_{(j)}", meaning: "The j-th largest round in the period", unit: "USD" },
    ],
    explanation: md`The quickest test of whether a "record year" is broad or driven by a few mega rounds. Recompute the year-on-year change on $F_{-k}$ as well. Providers usually list the top deals in the same report.`,
    lesson: "sh06-l03",
  },
  // ---------------------------------------------------------------- l04 talent
  {
    id: "sh06-cagr",
    name: "Compound annual growth rate",
    tex: String.raw`g = \left(\frac{X_T}{X_0}\right)^{1/T} - 1`,
    vars: [
      { sym: "g", meaning: "Compound annual growth rate", unit: "fraction per year" },
      { sym: "X_T", meaning: "Value at the end (or the target)", unit: "any" },
      { sym: "X_0", meaning: "Value at the start", unit: "any" },
      { sym: "T", meaning: "Number of years", unit: "years" },
    ],
    explanation: md`Turns a target into a growth rate you can judge. Egypt's offshoring exports: about USD 5.2 bn in 2025 to a USD 6 bn target in 2026 is +15% in one year (Zawya, 2026).`,
    lesson: "sh06-l04",
  },
  // ---------------------------------------------------------------- l05 gaps
  {
    id: "sh06-gap-score",
    name: "Ecosystem gap score",
    tex: String.raw`G = I\,(1 - c)\,a`,
    vars: [
      { sym: "G", meaning: "Gap score for a candidate offering (higher = better place for Suhail to play)", unit: "0 to 25" },
      { sym: "I", meaning: "Importance of the need to builders, scored 1 to 5", unit: "-" },
      { sym: "c", meaning: "Coverage by existing players (state, funds, accelerators, universities), 0 = unserved, 1 = fully served", unit: "fraction" },
      { sym: "a", meaning: "Suhail's advantage in serving it (network, neutrality, Arabic-first media, cross-border reach), scored 1 to 5", unit: "-" },
    ],
    explanation: md`A structured judgment, not a measurement: score each factor with one written justification. The product form means a need that is fully covered ($c = 1$) scores zero however important it is: that is where Suhail should partner, not compete.`,
    lesson: "sh06-l05",
  },
  // ---------------------------------------------------------------- l06 landscape map
  {
    id: "sh06-review-load",
    name: "Landscape map review load",
    tex: String.raw`L = \sum_{i} \frac{N_i\,t_i}{T_i}`,
    vars: [
      { sym: "L", meaning: "Review hours per month to keep the map current", unit: "h/month" },
      { sym: "N_i", meaning: "Number of entries in category i", unit: "-" },
      { sym: "t_i", meaning: "Time to re-verify one entry in category i", unit: "h" },
      { sym: "T_i", meaning: "Re-verification interval for category i", unit: "months" },
    ],
    explanation: md`Fast-moving categories (compute projects, model releases, funding totals) need short intervals; institutions and universities change slowly. If $L$ exceeds the volunteer time the Editorial lead has, cut entries or lengthen intervals rather than let the map silently go stale.`,
    lesson: "sh06-l06",
  },
];

export default formulas;
