import { md } from "../../schema";

const cheatSheet = md`# MZ03 Inferring soiling from operational and satellite data: cheat sheet

## The inference problem

- **Performance index:** measured over modelled clean-plant energy; every unmodelled loss lands in it.
- **Decomposition:** PI = SR × (1 − degradation) × (1/sensor factor) × bias × noise.
- **Identifiability:** plant data sees soiling *changes* (declines, recoveries), never the absolute level without an anchor.
- **Anchor:** clean right after a full cleaning (SRR recentering) or a clean reference device.
- **Daily robotic cleaning:** almost no signal; use soiling stations or uncleaned control rows.

| Confounder | Effect on PI | Treatment |
|---|---|---|
| Temperature | 12 to 14 % seasonal swing in Kuwait if ignored | Cell temperature model |
| Clipping | Biased towards 1 | Filter flat tops at AC limit |
| Curtailment | Negative flat top | PPC setpoint tag |
| Outage | Abrupt step, abrupt recovery | Per-inverter analysis |
| Sensor soiling | **Hides** soiling; wipes look like soiling | Sensor log, second irradiance source |
| Degradation | Slow decline | Yearly refit, CODS |
| Atmospheric dust | None on measured POA | Use measured POA, AOD flags |

## Methods

- **SRR (Deceglie, Micheli, Muller 2018):** daily PI, rolling median, cleaning detection (shift), Theil-Sen per interval, Monte Carlo, P50 insolation-weighted SR.
- **RdTools defaults:** reps 1,000; confidence 68.2 %; minimum interval 7 days; recovery half_norm_clean (check version).
- **Interval excludes:** sensor error, model bias, cemented residual soiling.
- **Change points (Micheli et al. 2021):** piecewise fits for storm steps and rate changes.
- **CODS:** joint degradation and soiling on multi-year data.
- **Cleaning detection in Kuwait:** log checked by shift; rain too rare.
- **Synthetic injection test:** inject known soiling, check recovery.

## Expected-energy model

- **Chain:** sun position, decomposition, orientation, transposition, IAM, temperature, DC, inverter with clipping.
- **No soiling inside the model:** PVWatts default 14.08 % includes 2 % soiling and 3 % availability.
- **Calibrate on post-cleaning days;** read residuals on clean days only.
- **Two irradiance sources:** divergence is a sensor alarm.
- **Timestamps:** Kuwait UTC+3, no DST; reanalysis in UTC.

## Proxies

| Product | Resolution | Period |
|---|---|---|
| CAMS EAC4 | About 0.75°, 3-hourly | 2003 onwards |
| CAMS forecasts | About 0.4° | Days ahead |
| MERRA-2 | 0.5° × 0.625°, hourly | 1980 onwards |
| AERONET Kuwait University | Point | Since 2008 |

- **AOD is not soiling;** surface PM deposits, AOD dims.
- **Commercial models compress to the mean:** expect underestimates at high-soiling sites.
- **Use proxies for timing, flags, calibrated extrapolation, forecasts;** never as the measurement of record.

## Validation

- **Ground truth:** soiling station, before and after cleaning test, uncleaned control rows.
- **Metrics:** bias, RMSE, precision and recall of cleaning detection.
- **Natural experiment designs:** interrupted time series, restart step, difference-in-differences.
- **Shagaya 2018 to 2019 cleaning arm failure:** confirm facts from KISR logs first; pre-register; claims limited to that period.

## Decisions

- **Square-root law:** optimum barely moves with rate; cost curve flat near it.
- **Value of energy:** tariff vs avoided fuel can halve the optimal interval.
- **Alerts:** persistence, hysteresis, routing, above the minimum detectable change.
- **Cleaning verification** after every logged cleaning.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Performance index | $\mathrm{PI} = E_{\mathrm{meas}}/E_{\mathrm{exp}}$ | L1 |
| Theil-Sen slope | $\operatorname{median}\{(y_j - y_i)/(x_j - x_i)\}$ | L2 |
| Insolation-weighted SR | $\sum \mathrm{SR}_d H_d/\sum H_d$ | L2 |
| POA (isotropic) | $\mathrm{DNI}\cos\theta + \mathrm{DHI}(1+\cos\beta)/2 + \mathrm{GHI}\rho(1-\cos\beta)/2$ | L3 |
| SAPM cell temperature | $T_c = G e^{a + b WS} + T_a + 3G/1000$ | L3 |
| PVWatts DC | $P_{dc0}(G/1000)[1 + \gamma(T_c - 25)]$ | L3 |
| HSU soiling ratio | $1 - 0.3437\,\operatorname{erf}(0.17\,\omega^{0.8473})$ | L4 |
| Calibration factor | $k = \hat r_{\mathrm{ground}}/\hat r_{\mathrm{model}}$ | L4 |
| Difference-in-differences | $(\Delta \bar Y_T) - (\Delta \bar Y_C)$ | L5 |
| Optimal interval | $T^* = \sqrt{2C/(Vr)}$ | L6 |
| Event cleaning | $\Delta\mathrm{SR}\,V\,\tau > C_{\mathrm{extra}}$ | L6 |
| Minimum detectable change | $2.8\,\sigma_d/\sqrt{n}$ | L6 |
`;

export default cheatSheet;
