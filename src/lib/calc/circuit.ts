/**
 * DC switching transients for the water-loop analogy widget: a source V through resistance R, with an inductor
 * (series coil, "heavy wheel") or a capacitor (series, "membrane tank"). Time in seconds, SI units.
 */

/** Resistor only: current settles instantly at V/R. */
export const ohm = (v: number, r: number) => (r > 0 ? v / r : Infinity);

/** RL: current after switching on at t = 0, rising to V/R with time constant τ = L/R. */
export const rlCurrentOn = (v: number, r: number, l: number, t: number) => ohm(v, r) * (1 - Math.exp((-t * r) / l));

/** RL: current after the source is removed (coil discharging through R), from i0, decaying with τ = L/R. */
export const rlCurrentOff = (i0: number, r: number, l: number, t: number) => i0 * Math.exp((-t * r) / l);

/** RC: current after switching on (series capacitor charging): starts at V/R and falls to zero, τ = RC. */
export const rcCurrent = (v: number, r: number, c: number, t: number) => ohm(v, r) * Math.exp(-t / (r * c));

/** RC: capacitor voltage while charging, rising towards V. */
export const rcVoltage = (v: number, r: number, c: number, t: number) => v * (1 - Math.exp(-t / (r * c)));
