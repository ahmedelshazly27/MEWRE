import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 soiling ratio
  {
    id: "mz02-soiling-ratio",
    name: "Soiling ratio and soiling loss",
    tex: String.raw`SR = \frac{X_{\text{soiled}}}{X_{\text{clean}}}, \qquad L_s = 1 - SR`,
    vars: [
      { sym: "SR", meaning: "Soiling ratio (1 = clean)", unit: "-" },
      { sym: "X", meaning: "Temperature-corrected output of the soiled and the clean reference device (Isc, Pmax or measured irradiance)", unit: "A, W or W/m²" },
      { sym: "L_s", meaning: "Soiling loss (fraction of clean output lost)", unit: "-" },
    ],
    explanation: md`IEC 61724-1 defines the soiling ratio as the output of a naturally soiled reference divided by the output of the same kind of reference kept clean, both corrected to the same temperature. SR 0.95 means a 5 % soiling loss. Always state which quantity X is: Isc, Pmax and optical transmission give different numbers under non-uniform soiling.`,
    lesson: "mz02-l01",
  },
  {
    id: "mz02-sr-isc",
    name: "Current-based soiling ratio (temperature corrected)",
    tex: String.raw`SR_{I} = \frac{I_{sc,s}\,/\,[1 + \alpha\,(T_s - 25)]}{I_{sc,c}\,/\,[1 + \alpha\,(T_c - 25)]}`,
    vars: [
      { sym: "I_{sc,s}, I_{sc,c}", meaning: "Short-circuit current of the soiled and clean device", unit: "A" },
      { sym: "\\alpha", meaning: "Isc temperature coefficient (c-Si about +0.04 to +0.06 %/°C)", unit: "1/°C" },
      { sym: "T_s, T_c", meaning: "Cell temperature of soiled and clean device", unit: "°C" },
    ],
    explanation: md`Isc is almost exactly proportional to the irradiance reaching the cells, so its ratio measures transmission loss through the dust layer. The temperature coefficient is small, so a 2 K difference between devices moves SR by only about 0.1 %. Isc misses non-uniform soiling effects (a dust band on the bottom edge that activates bypass diodes), so it can read optimistic.`,
    lesson: "mz02-l01",
  },
  {
    id: "mz02-sr-pmax",
    name: "Power-based soiling ratio (temperature corrected)",
    tex: String.raw`SR_{P} = \frac{P_{max,s}\,/\,[1 + \gamma\,(T_s - 25)]}{P_{max,c}\,/\,[1 + \gamma\,(T_c - 25)]}`,
    vars: [
      { sym: "P_{max,s}, P_{max,c}", meaning: "Maximum power of the soiled and clean reference module (I-V tracer or MPP load)", unit: "W" },
      { sym: "\\gamma", meaning: "Pmax temperature coefficient (about -0.30 to -0.45 %/°C)", unit: "1/°C" },
      { sym: "T_s, T_c", meaning: "Cell temperature of soiled and clean module", unit: "°C" },
    ],
    explanation: md`Captures everything soiling does to the module, including mismatch and bypass-diode effects of uneven dust. About seven times more temperature sensitive than the Isc method, so each module needs its own well-bonded back-of-module sensor: a 1 K error moves SR by about 0.35 %.`,
    lesson: "mz02-l01",
  },
  {
    id: "mz02-daily-sr",
    name: "Daily soiling ratio (irradiance weighted, solar-noon window)",
    tex: String.raw`SR_{day} = \frac{\sum_{i \in W} G_i\, SR_i}{\sum_{i \in W} G_i}`,
    vars: [
      { sym: "SR_i", meaning: "Soiling ratio of reading i", unit: "-" },
      { sym: "G_i", meaning: "Plane-of-array irradiance of reading i", unit: "W/m²" },
      { sym: "W", meaning: "Valid readings in the window (for example solar noon ± 2 h, G above a threshold)", unit: "-" },
    ],
    explanation: md`Soiling loss rises at high angles of incidence, so morning and evening readings read dirtier than noon. A noon window and irradiance weighting give one stable value per day that represents when most energy is produced. Check the aggregation rule in the normative text of the edition you cite.`,
    lesson: "mz02-l01",
  },
  {
    id: "mz02-soiling-rate",
    name: "Soiling rate from a soiling-ratio series",
    tex: String.raw`r = -\frac{\Delta SR}{\Delta t} = \frac{SR(t_1) - SR(t_2)}{t_2 - t_1}`,
    vars: [
      { sym: "r", meaning: "Soiling rate (loss per day between cleanings)", unit: "%/day" },
      { sym: "SR(t)", meaning: "Daily soiling ratio on day t", unit: "-" },
      { sym: "t_1, t_2", meaning: "Days within one soiling interval (no cleaning or rain between)", unit: "day" },
    ],
    explanation: md`In practice fit a robust line (Theil-Sen) through all daily SR values of an interval rather than using two points. Rates in dry Gulf climates are typically tenths of a percent per day; dust storms appear as steps, not slopes, and must be separated.`,
    lesson: "mz02-l01",
  },
  {
    id: "mz02-sr-offset",
    name: "Calibration-offset correction of a two-device station",
    tex: String.raw`SR = \frac{R_{raw}}{R_0}`,
    vars: [
      { sym: "R_{raw}", meaning: "Raw ratio soiled/clean as measured", unit: "-" },
      { sym: "R_0", meaning: "Ratio measured right after both devices were cleaned (device mismatch)", unit: "-" },
    ],
    explanation: md`Two reference devices are never identical. Clean both, record the ratio for a few clear days, and divide every later reading by it. Repeat at a fixed interval (monthly is a sensible default in dust) because the offset drifts.`,
    lesson: "mz02-l03",
  },
  // ---------------------------------------------------------------- l02 PR and temperature
  {
    id: "mz02-pr-basic",
    name: "Basic performance ratio",
    tex: String.raw`PR = \frac{\sum_i E_i}{P_{STC}\,\sum_i G_{POA,i}\,\tau_i / G_{STC}}`,
    vars: [
      { sym: "E_i", meaning: "AC energy measured in interval i", unit: "kWh" },
      { sym: "P_{STC}", meaning: "DC nameplate power at STC", unit: "kWp" },
      { sym: "G_{POA,i}", meaning: "Plane-of-array irradiance in interval i", unit: "W/m²" },
      { sym: "\\tau_i", meaning: "Interval duration", unit: "h" },
      { sym: "G_{STC}", meaning: "1,000 W/m²", unit: "W/m²" },
    ],
    explanation: md`Final yield over reference yield. It removes the amount of sunshine but not its temperature, so in Kuwait the basic PR drops by 10 or more points from January to July even on a perfectly healthy plant.`,
    lesson: "mz02-l02",
  },
  {
    id: "mz02-pr-nrel",
    name: "NREL weather-corrected performance ratio",
    tex: String.raw`PR_{corr} = \frac{\sum_i E_i}{\sum_i P_{STC}\,\frac{G_{POA,i}\,\tau_i}{G_{STC}}\left[1 - \frac{\delta}{100}\left(T_{cell,avg} - T_{cell,i}\right)\right]}`,
    vars: [
      { sym: "\\delta", meaning: "Power temperature coefficient (negative)", unit: "%/°C" },
      { sym: "T_{cell,avg}", meaning: "Irradiance-weighted annual-average cell temperature (reference)", unit: "°C" },
      { sym: "T_{cell,i}", meaning: "Cell temperature in interval i", unit: "°C" },
    ],
    explanation: md`Dierauf et al. (NREL, 2013). Each interval's expected energy is scaled for how far that interval's cell temperature is from the site's typical annual average. The bracket equals $1 + (\delta/100)(T_{cell,i} - T_{cell,avg})$. Over the reference year the corrected PR equals the basic PR by construction; over a week or a month it removes the seasonal temperature swing, which is exactly what you need before reading soiling from PR.`,
    lesson: "mz02-l02",
  },
  {
    id: "mz02-tref-weighted",
    name: "Irradiance-weighted average cell temperature",
    tex: String.raw`T_{cell,avg} = \frac{\sum_i G_{POA,i}\, T_{cell,i}}{\sum_i G_{POA,i}}`,
    vars: [
      { sym: "G_{POA,i}", meaning: "Plane-of-array irradiance (typical year or a year of site data)", unit: "W/m²" },
      { sym: "T_{cell,i}", meaning: "Cell temperature, measured or modelled from weather", unit: "°C" },
    ],
    explanation: md`Weighting by irradiance means hot, bright hours count most, which is when the energy is produced. Compute it once from a typical meteorological year (or the first full year of data), fix it in the methodology and never change it mid-study.`,
    lesson: "mz02-l02",
  },
  {
    id: "mz02-tcell-noct",
    name: "NOCT cell temperature model",
    tex: String.raw`T_{c} = T_a + \frac{NOCT - 20}{800}\,G_{POA}`,
    vars: [
      { sym: "T_a", meaning: "Ambient temperature", unit: "°C" },
      { sym: "NOCT", meaning: "Nominal operating cell temperature from the datasheet (800 W/m², 20 °C, 1 m/s)", unit: "°C" },
      { sym: "G_{POA}", meaning: "Plane-of-array irradiance", unit: "W/m²" },
    ],
    explanation: md`One parameter, wind blind. Reads hot in windy desert conditions; use as an upper bound or when nothing else is available.`,
    lesson: "mz02-l02",
  },
  {
    id: "mz02-tcell-faiman",
    name: "Faiman module temperature model",
    tex: String.raw`T_{m} = T_a + \frac{G_{POA}}{U_0 + U_1\, v}`,
    vars: [
      { sym: "U_0", meaning: "Constant heat-loss coefficient (default 25)", unit: "W/(m²·K)" },
      { sym: "U_1", meaning: "Wind-dependent heat-loss coefficient (default 6.84)", unit: "W·s/(m³·K)" },
      { sym: "v", meaning: "Wind speed at module height", unit: "m/s" },
    ],
    explanation: md`Two parameters that can be fitted to site data with a linear regression of $G/(T_m - T_a)$ against wind. Same form as the PVsyst thermal model $U_c + U_v v$.`,
    lesson: "mz02-l02",
  },
  {
    id: "mz02-tcell-sandia",
    name: "Sandia module and cell temperature model",
    tex: String.raw`T_m = G_{POA}\, e^{a + b\, v} + T_a, \qquad T_c = T_m + \frac{G_{POA}}{G_0}\,\Delta T`,
    vars: [
      { sym: "a, b", meaning: "Empirical coefficients (glass/cell/polymer, open rack: a = -3.56, b = -0.075)", unit: "-, s/m" },
      { sym: "G_0", meaning: "Reference irradiance 1,000 W/m²", unit: "W/m²" },
      { sym: "\\Delta T", meaning: "Cell minus back-of-module temperature at 1,000 W/m² (3 °C open rack)", unit: "°C" },
    ],
    explanation: md`King et al. (Sandia, 2004). Used in the NREL weather-corrected PR report. The second equation also converts a measured back-of-module temperature to cell temperature, which is how a monitoring system's module sensor becomes $T_{cell}$.`,
    lesson: "mz02-l02",
  },
  // ---------------------------------------------------------------- l03 uncertainty of stations
  {
    id: "mz02-rss",
    name: "Combined standard uncertainty (independent components)",
    tex: String.raw`u_c = \sqrt{\sum_j u_j^2}, \qquad U = k\,u_c`,
    vars: [
      { sym: "u_j", meaning: "Standard uncertainty of component j (1 sigma)", unit: "same as result" },
      { sym: "u_c", meaning: "Combined standard uncertainty", unit: "same as result" },
      { sym: "k", meaning: "Coverage factor (k = 2 for about 95 %)", unit: "-" },
    ],
    explanation: md`GUM rule for uncorrelated components with sensitivity 1 (relative uncertainties for a ratio of products). Correlated components (the same sensor used in numerator and denominator, the same calibration over time) do not add this way: some cancel, which is why changes are known better than absolute values.`,
    lesson: "mz02-l03",
  },
  {
    id: "mz02-plant-sr-uncertainty",
    name: "Uncertainty of a plant-average soiling loss from n stations",
    tex: String.raw`u_{plant} = \sqrt{\frac{\sigma_{sp}^2}{n} + \frac{u_{st}^2}{n}}`,
    vars: [
      { sym: "\\sigma_{sp}", meaning: "Spatial standard deviation of true soiling loss across the plant", unit: "%" },
      { sym: "u_{st}", meaning: "Measurement uncertainty of one station (independent between stations)", unit: "%" },
      { sym: "n", meaning: "Number of stations at representative positions", unit: "-" },
    ],
    explanation: md`Both terms fall with the square root of the station count. When spatial variability dominates, a better sensor does not help; more stations (or a plant-wide data method) do. Assumes stations sample the plant without bias; one station by the dusty road biases the mean, it does not just add noise.`,
    lesson: "mz02-l03",
  },
  // ---------------------------------------------------------------- l04 decisions under uncertainty
  {
    id: "mz02-slope-se",
    name: "Standard error of a soiling-rate slope",
    tex: String.raw`SE(r) = \frac{\sigma}{\sqrt{\sum_t (t - \bar t)^2}} = \frac{\sigma}{\sqrt{n(n^2 - 1)/12}}`,
    vars: [
      { sym: "\\sigma", meaning: "Day-to-day scatter of daily SR around the trend", unit: "%" },
      { sym: "n", meaning: "Number of equally spaced daily points in the interval", unit: "day" },
    ],
    explanation: md`Ordinary least-squares result for evenly spaced days. Precision improves with $n^{3/2}$: 10 days with 1 % scatter gives ±0.11 %/day, 30 days gives ±0.02 %/day. Short intervals between cleanings or storms give poor rate estimates.`,
    lesson: "mz02-l04",
  },
  {
    id: "mz02-cost-ratio",
    name: "Cost penalty of a non-optimal cleaning interval",
    tex: String.raw`\frac{C(T)}{C(T^{*})} = \frac{1}{2}\left(\frac{T}{T^{*}} + \frac{T^{*}}{T}\right)`,
    vars: [
      { sym: "C(T)", meaning: "Annual cleaning cost plus value of soiling loss at interval T", unit: "currency/yr" },
      { sym: "T^{*}", meaning: "Optimal interval for a linear soiling rate", unit: "day" },
    ],
    explanation: md`Follows from $C(T) = 365\,C_{cl}/T + A\, r\, T/2$ with the optimum where both terms are equal. The bottom is flat: a 20 % error in the interval costs about 2 %. Precision in the average rate is worth little; detecting changes in the rate and storm steps is worth a lot.`,
    lesson: "mz02-l04",
  },
  {
    id: "mz02-trigger-delay",
    name: "Cleaning-trigger delay from a soiling-ratio bias",
    tex: String.raw`\Delta t = \frac{b_{SR}}{r}`,
    vars: [
      { sym: "b_{SR}", meaning: "Bias of the measured SR (positive = reads cleaner than reality)", unit: "%" },
      { sym: "r", meaning: "Soiling rate", unit: "%/day" },
    ],
    explanation: md`With a threshold rule (clean when SR falls below a set value) a station that reads 1 % clean at 0.3 %/day triggers about 3.3 days late. Compare the delay with the optimal interval to judge whether the bias matters.`,
    lesson: "mz02-l04",
  },
  // ---------------------------------------------------------------- l05 study design
  {
    id: "mz02-background-rate",
    name: "Background soiling rate with storm steps removed",
    tex: String.raw`r_{bg} = \frac{L_{total} - \sum_k \Delta_k}{N}`,
    vars: [
      { sym: "L_{total}", meaning: "Total soiling loss accumulated over the interval", unit: "%" },
      { sym: "\\Delta_k", meaning: "Step loss of dust event k (detected change point)", unit: "%" },
      { sym: "N", meaning: "Interval length", unit: "day" },
    ],
    explanation: md`Separates the slow daily deposition from event steps. Mixing them overstates the rate on calm periods and understates the value of post-storm cleaning. Change-point methods (Micheli et al. 2021) do this automatically.`,
    lesson: "mz02-l05",
  },
];

export default formulas;
