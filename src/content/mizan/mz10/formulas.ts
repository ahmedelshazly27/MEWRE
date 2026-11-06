import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  {
    id: "mz10-mbe",
    name: "Mean bias error (MBE)",
    tex: String.raw`\mathrm{MBE} = \frac{1}{n}\sum_{i=1}^{n}\left(\hat{y}_i - y_i\right)`,
    vars: [
      { sym: "\\hat{y}_i", meaning: "Estimate from the method under test for unit i (for example the soiling rate of one cleaning interval)", unit: "same as y (for example %/day)" },
      { sym: "y_i", meaning: "Ground-truth value for unit i (for example from a clean and soiled reference station)", unit: "same as estimate" },
      { sym: "n", meaning: "Number of independent validation units", unit: "count" },
    ],
    explanation: md`Signed average error. Positive means the method overestimates. Bias is the error that does not shrink with more data: it is what turns into a systematically wrong cleaning schedule. Report it with a confidence interval, never alone.`,
    lesson: "mz10-l01",
  },
  {
    id: "mz10-rmse",
    name: "Root mean square error and its decomposition",
    tex: String.raw`\mathrm{RMSE} = \sqrt{\frac{1}{n}\sum_{i=1}^{n}\left(\hat{y}_i - y_i\right)^2}, \qquad \mathrm{RMSE}^2 = \mathrm{MBE}^2 + s_e^2`,
    vars: [
      { sym: "\\mathrm{RMSE}", meaning: "Typical size of one error, sign ignored", unit: "same as y" },
      { sym: "\\mathrm{MBE}", meaning: "Mean bias error", unit: "same as y" },
      { sym: "s_e", meaning: "Standard deviation of the errors (population form, divide by n)", unit: "same as y" },
    ],
    explanation: md`RMSE mixes a systematic part (bias) and a random part (scatter). The decomposition tells you which one to fix: a biased method needs a model correction, a scattered one needs more data per estimate or better filters. Squaring weights large misses heavily, which is right for cleaning decisions where one badly missed storm costs more than many small errors.`,
    lesson: "mz10-l01",
  },
  {
    id: "mz10-coverage",
    name: "Empirical coverage of confidence intervals",
    tex: String.raw`\hat{c} = \frac{1}{n}\sum_{i=1}^{n}\mathbf{1}\left[L_i \le y_i \le U_i\right], \qquad \mathrm{SE}(\hat{c}) = \sqrt{\frac{c\,(1-c)}{n}}`,
    vars: [
      { sym: "\\hat{c}", meaning: "Share of units whose ground truth lies inside the method's stated interval", unit: "fraction" },
      { sym: "L_i, U_i", meaning: "Lower and upper bounds of the interval the method reported for unit i", unit: "same as y" },
      { sym: "c", meaning: "Nominal coverage (0.95 for a 95% interval)", unit: "fraction" },
      { sym: "n", meaning: "Number of independent units", unit: "count" },
    ],
    explanation: md`A method that says "95% interval" should contain the truth about 95% of the time. Much lower means the method is overconfident (its uncertainty is understated), much higher means it is too cautious to be useful. Coverage needs many units: at n = 18 the standard error is about 5 percentage points.`,
    lesson: "mz10-l01",
  },
  {
    id: "mz10-sample-size",
    name: "Sample size for a mean or paired difference",
    tex: String.raw`n = \left(\frac{(z_{1-\alpha/2} + z_{1-\beta})\,\sigma}{\delta}\right)^2`,
    vars: [
      { sym: "n", meaning: "Number of independent units (rounded up)", unit: "count" },
      { sym: "z_{1-\\alpha/2}", meaning: "Standard normal quantile for the two-sided significance level (1.96 for alpha = 0.05)", unit: "dimensionless" },
      { sym: "z_{1-\\beta}", meaning: "Standard normal quantile for power (0.84 for 80%, 1.28 for 90%)", unit: "dimensionless" },
      { sym: "\\sigma", meaning: "Standard deviation of one unit's value or paired difference", unit: "same as delta" },
      { sym: "\\delta", meaning: "Smallest difference worth detecting", unit: "for example %/day" },
    ],
    explanation: md`Halving the detectable effect quadruples the sample. For a precision target instead of a test (interval half-width h), use $n = (z_{1-\alpha/2}\,\sigma/h)^2$. The unit must be independent: for soiling this is usually a cleaning interval or a block-interval pair, not a day.`,
    lesson: "mz10-l01",
  },
  {
    id: "mz10-effective-n",
    name: "Effective sample size under lag-1 autocorrelation",
    tex: String.raw`n_{\mathrm{eff}} = n\,\frac{1-\rho}{1+\rho}`,
    vars: [
      { sym: "n_{\\mathrm{eff}}", meaning: "Number of independent observations the series is worth", unit: "count" },
      { sym: "n", meaning: "Number of observations (for example valid days)", unit: "count" },
      { sym: "\\rho", meaning: "Lag-1 autocorrelation of the errors (AR(1) approximation)", unit: "dimensionless" },
    ],
    explanation: md`Soiling errors on consecutive days are strongly correlated (the same dust layer, the same sensor offset). At $\rho = 0.6$ a year of valid days is worth a quarter as many independent days. Ignoring this makes confidence intervals far too narrow and is the most common error in operational-data validation.`,
    lesson: "mz10-l01",
  },
  {
    id: "mz10-did",
    name: "Difference-in-differences estimator",
    tex: String.raw`\widehat{\mathrm{DiD}} = \left(\bar{Y}_{T,\mathrm{post}} - \bar{Y}_{T,\mathrm{pre}}\right) - \left(\bar{Y}_{C,\mathrm{post}} - \bar{Y}_{C,\mathrm{pre}}\right)`,
    vars: [
      { sym: "\\bar{Y}_{T,\\mathrm{pre}}, \\bar{Y}_{T,\\mathrm{post}}", meaning: "Mean outcome of the treated group (for example the section that was not cleaned) before and during the event", unit: "for example PR (fraction)" },
      { sym: "\\bar{Y}_{C,\\mathrm{pre}}, \\bar{Y}_{C,\\mathrm{post}}", meaning: "Mean outcome of the control group (a section still cleaned) in the same periods", unit: "same" },
    ],
    explanation: md`The control group's change absorbs everything that hit both groups (weather, season, curtailment policy, sensor drift on a shared pyranometer). What remains is the effect of the treatment, provided the two groups would have moved in parallel without it (the parallel-trends assumption). Check that assumption on the pre-period.`,
    lesson: "mz10-l02",
  },
];

export default formulas;
