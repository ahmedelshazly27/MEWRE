/**
 * Indicative Kuwait datasets (climatology, load shapes) and PV day-profile helpers.
 * Values are order-of-magnitude (NASA POWER / Global Solar Atlas style) and are NOT design data.
 */

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
export const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export interface MonthClimate {
  month: (typeof MONTHS)[number];
  /** Global horizontal irradiation (kWh/m²/day). */
  ghi: number;
  /** Direct normal irradiation (kWh/m²/day). */
  dni: number;
  /** Mean daily maximum temperature (°C). */
  tmax: number;
  /** Mean daily temperature (°C). */
  tmean: number;
}

export const KUWAIT_CLIMATE: MonthClimate[] = [
  { month: "Jan", ghi: 3.4, dni: 4.6, tmax: 19, tmean: 13 },
  { month: "Feb", ghi: 4.4, dni: 5.0, tmax: 22, tmean: 16 },
  { month: "Mar", ghi: 5.3, dni: 4.9, tmax: 27, tmean: 21 },
  { month: "Apr", ghi: 6.3, dni: 5.2, tmax: 33, tmean: 27 },
  { month: "May", ghi: 7.2, dni: 5.5, tmax: 41, tmean: 34 },
  { month: "Jun", ghi: 8.0, dni: 5.8, tmax: 45, tmean: 38 },
  { month: "Jul", ghi: 7.7, dni: 5.4, tmax: 47, tmean: 40 },
  { month: "Aug", ghi: 7.1, dni: 5.6, tmax: 47, tmean: 39 },
  { month: "Sep", ghi: 6.3, dni: 6.2, tmax: 44, tmean: 36 },
  { month: "Oct", ghi: 5.0, dni: 5.9, tmax: 37, tmean: 30 },
  { month: "Nov", ghi: 3.7, dni: 4.9, tmax: 27, tmean: 21 },
  { month: "Dec", ghi: 3.1, dni: 4.4, tmax: 21, tmean: 15 },
];

export const CLIMATE_DISCLAIMER =
  "Indicative climatology (based on NASA POWER / Global Solar Atlas order of magnitude) — use site-measured data (e.g., Shagaya met station, Solargis) for design.";

/** Annual sum (kWh/m²/yr) of a monthly daily-mean series. */
export function annualFromDaily(daily: number[]): number {
  return daily.reduce((s, v, k) => s + v * DAYS_IN_MONTH[k], 0);
}

/** Gaussian bump helper. */
function bump(h: number, centre: number, width: number): number {
  return Math.exp(-0.5 * ((h - centre) / width) ** 2);
}

/**
 * Indicative Kuwait system load (MW) at hour h (0..24).
 * Summer: night minimum ~11.5 GW, afternoon peak ~16.5 GW around 14:00–16:00 (air-conditioning).
 * Winter: ~6.2 GW night, evening peak ~8.6 GW around 18:00–19:00.
 */
export function kuwaitLoad(h: number, season: "summer" | "winter"): number {
  if (season === "summer") {
    const f = (1 + Math.cos((2 * Math.PI * (h - 15)) / 24)) / 2; // 0 at 03:00, 1 at 15:00
    return 11500 + 5000 * Math.pow(f, 1.15);
  }
  return 6200 + 1000 * bump(h, 12, 3.2) + 2300 * bump(h, 18.8, 2.0);
}

/**
 * Indicative PV AC output (MW) at hour h for a plant of `pvMW` (AC), clear-ish day.
 * Sine-shaped between sunrise and sunset; peak factor accounts for heat/soiling derate.
 */
export function pvDayProfile(h: number, pvMW: number, season: "summer" | "winter"): number {
  const p = season === "summer" ? { rise: 5.0, set: 18.7, peak: 0.86 } : { rise: 6.6, set: 17.0, peak: 0.78 };
  if (h <= p.rise || h >= p.set) return 0;
  const x = (h - p.rise) / (p.set - p.rise);
  return pvMW * p.peak * Math.pow(Math.sin(Math.PI * x), 1.25);
}

/** Normalised clear-sky DC power profile (kW per kWp DC) for clipping analysis. */
export function dcProfileNormalized(h: number, peak = 0.92, rise = 5.2, set = 18.6): number {
  if (h <= rise || h >= set) return 0;
  const x = (h - rise) / (set - rise);
  return peak * Math.pow(Math.sin(Math.PI * x), 1.15);
}
