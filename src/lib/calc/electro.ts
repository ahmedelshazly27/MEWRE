/**
 * Calculators for the fundamentals drawings: series impedance, line voltage drop, ideal transformer, induction.
 * Pure functions, SI units unless stated. Tested in electro.test.ts.
 */

/** Inductive reactance X_L = 2πfL (Ω), L in henries. */
export const xL = (f: number, l: number) => 2 * Math.PI * f * l;
/** Capacitive reactance X_C = 1/(2πfC) (Ω), C in farads. */
export const xC = (f: number, c: number) => (c > 0 && f > 0 ? 1 / (2 * Math.PI * f * c) : Infinity);

/**
 * Series R-L-C: net reactance X = X_L − X_C, impedance |Z| = √(R² + X²), angle φ = atan(X/R) (positive = current lags),
 * current at a supply voltage V (RMS).
 */
export function seriesImpedance(r: number, lH: number, cF: number | null, f: number, v: number) {
  const xl = xL(f, lH);
  const xc = cF ? xC(f, cF) : 0;
  const x = xl - xc;
  const z = Math.hypot(r, x);
  return { xl, xc, x, z, phiDeg: (Math.atan2(x, r) * 180) / Math.PI, i: z > 0 ? v / z : Infinity, pf: z > 0 ? r / z : 1 };
}

/**
 * Approximate voltage drop along a line in per unit: ΔV ≈ (R·P + X·Q) / V, with P and Q flowing towards the
 * receiving end (Q positive = drawn by inductive loads). Receiving voltage ≈ V_s − ΔV. Valid for small drops.
 */
export function lineDrop(vs: number, r: number, x: number, p: number, q: number) {
  const dv = (r * p + x * q) / vs;
  return { dv, vr: vs - dv, fromP: (r * p) / vs, fromQ: (x * q) / vs };
}

/** Ideal transformer: V2 = V1·N2/N1, I2 = I1·N1/N2, same power both sides. S in VA, three-phase line voltages. */
export function transformer(v1: number, n1: number, n2: number, s: number) {
  const ratio = n2 / n1;
  const v2 = v1 * ratio;
  const i1 = s / (Math.sqrt(3) * v1);
  const i2 = s / (Math.sqrt(3) * v2);
  return { ratio, v2, i1, i2 };
}

/** Faraday: induced voltage in a coupled coil, v = −M·di/dt (M mutual inductance in H). */
export const induced = (m: number, didt: number) => -m * didt;
