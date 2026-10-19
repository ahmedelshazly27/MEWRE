/** Sensible-heat thermal energy storage (molten salt) for CSP. */

/** Solar salt (60 % NaNO3 / 40 % KNO3) mean specific heat (kJ/kg·K). */
export const SOLAR_SALT_CP = 1.5;
export const T_COLD = 290; // °C
export const T_HOT = 565; // °C (tower); troughs typically ~385 °C

/** Thermal energy (MWh_th) = m·cp·ΔT; mass in tonnes, cp in kJ/kg·K, ΔT in K. */
export function thermalEnergyMwh(massTonnes: number, cp = SOLAR_SALT_CP, deltaT = T_HOT - T_COLD): number {
  const kj = massTonnes * 1000 * cp * deltaT;
  return kj / 3.6e6;
}

/** Electrical energy (MWh_e) from stored heat via turbine (gross cycle) efficiency. */
export function electricEnergyMwh(thermalMwh: number, efficiency = 0.39): number {
  return thermalMwh * efficiency;
}

/** Hours of full-load turbine operation at rated MW_e. */
export function hoursAtRated(electricMwh: number, ratedMwe: number): number {
  return electricMwh / ratedMwe;
}

/** Salt mass (tonnes) needed for `hours` at `ratedMwe`. */
export function saltMassForHours(hours: number, ratedMwe: number, efficiency = 0.39, cp = SOLAR_SALT_CP, deltaT = T_HOT - T_COLD): number {
  const thermal = (hours * ratedMwe) / efficiency; // MWh_th
  return (thermal * 3.6e6) / (cp * deltaT) / 1000;
}

/** Salt volume (m³) at density ρ (kg/m³; ~1,800–1,900 for molten solar salt). */
export function saltVolume(massTonnes: number, density = 1850): number {
  return (massTonnes * 1000) / density;
}
