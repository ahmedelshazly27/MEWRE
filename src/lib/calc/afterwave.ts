/**
 * Afterwave calculators: change-impact test selection, clock synchronisation of bench streams,
 * actuator test platform economics, GSN safety-case structure checks. Pure functions.
 */

// ---------------------------------------------------------------- change impact and test selection

export interface ImpactNode {
  id: string;
  label: string;
  kind: "firmware" | "model" | "rig" | "requirement" | "component";
}

export interface ImpactTest {
  id: string;
  label: string;
  /** Artifacts this test exercises, with how strongly (0..1, e.g. coverage fraction or signal sensitivity). */
  deps: { node: string; weight: number }[];
  /** Hours of rig time to run it. */
  hours: number;
  /** Historical probability that the test catches a regression when one of its deps changes. */
  failRate?: number;
}

export interface ImpactResult {
  /** Per test: probability-style impact score 1 − Π(1 − w) over changed deps. */
  scores: { id: string; score: number; selected: boolean; reasons: string[] }[];
  selectedHours: number;
  totalHours: number;
  /** Expected regressions caught by the selection relative to running everything (0..1). */
  expectedRecall: number;
}

/**
 * Impact score of a test given a set of changed artifacts: treating each changed dependency as an independent
 * route for a regression to reach the test, P(affected) = 1 − Π(1 − w_i). Tests with score ≥ threshold are
 * selected. Expected recall weights each test's score by its historical fail rate.
 */
export function selectTests(tests: ImpactTest[], changed: Set<string>, threshold: number): ImpactResult {
  const scores = tests.map((t) => {
    const hits = t.deps.filter((d) => changed.has(d.node));
    const score = 1 - hits.reduce((p, d) => p * (1 - Math.min(1, Math.max(0, d.weight))), 1);
    return { id: t.id, score, selected: score >= threshold && hits.length > 0, reasons: hits.map((d) => d.node) };
  });
  const totalHours = tests.reduce((s, t) => s + t.hours, 0);
  const selectedHours = tests.reduce((s, t, i) => s + (scores[i].selected ? t.hours : 0), 0);
  const value = (i: number) => scores[i].score * (tests[i].failRate ?? 0.1);
  const all = tests.reduce((s, _, i) => s + value(i), 0);
  const caught = tests.reduce((s, _, i) => s + (scores[i].selected ? value(i) : 0), 0);
  return { scores, selectedHours, totalHours, expectedRecall: all > 0 ? caught / all : 1 };
}

// ---------------------------------------------------------------- clocks and synchronisation

/** Device timestamp for a true time t: offset plus drift in parts per million. */
export const deviceTime = (t: number, offset: number, driftPpm: number) => offset + t * (1 + driftPpm * 1e-6);

/** Worst-case misalignment between two free-running clocks after `seconds`: |Δoffset| + |Δppm|·1e-6·seconds. */
export const misalignment = (seconds: number, offsetA: number, ppmA: number, offsetB: number, ppmB: number) =>
  Math.abs(deviceTime(seconds, offsetA, ppmA) - deviceTime(seconds, offsetB, ppmB));

/**
 * Least-squares fit of device time against reference time from sync events (e.g. a shared trigger pulse or PTP):
 * device = a + b·reference. Returns offset a, drift (b − 1)·1e6 ppm and the RMS residual.
 */
export function fitClock(reference: number[], device: number[]) {
  const n = Math.min(reference.length, device.length);
  if (n < 2) return { offset: device[0] - (reference[0] ?? 0), driftPpm: 0, rms: 0 };
  const mx = reference.slice(0, n).reduce((a, b) => a + b, 0) / n;
  const my = device.slice(0, n).reduce((a, b) => a + b, 0) / n;
  let sxx = 0;
  let sxy = 0;
  for (let i = 0; i < n; i++) {
    sxx += (reference[i] - mx) ** 2;
    sxy += (reference[i] - mx) * (device[i] - my);
  }
  const b = sxx > 0 ? sxy / sxx : 1;
  const a = my - b * mx;
  let ss = 0;
  for (let i = 0; i < n; i++) ss += (device[i] - (a + b * reference[i])) ** 2;
  return { offset: a, driftPpm: (b - 1) * 1e6, rms: Math.sqrt(ss / n) };
}

/** Map a device timestamp back to reference time with a fitted clock model. */
export const toReference = (device: number, offset: number, driftPpm: number) => (device - offset) / (1 + driftPpm * 1e-6);

/** Nyquist: minimum sample rate for a signal with highest frequency f (Hz). Practical DAQ uses 5 to 10×. */
export const nyquistRate = (fMax: number) => 2 * fMax;

/** Raw data volume in bytes: channels × rate (Hz) × seconds × bytes per sample. */
export const dataVolume = (channels: number, rateHz: number, seconds: number, bytesPerSample: number) => channels * rateHz * seconds * bytesPerSample;

// ---------------------------------------------------------------- actuator test platform economics

export interface PlatformInput {
  /** Rig capital cost (USD). */
  capex: number;
  /** Depreciation life (years). */
  lifeYears: number;
  /** Available hours per year (e.g. 24 × 365 × availability). */
  availableHours: number;
  /** Fraction of available hours sold. */
  utilisation: number;
  /** Price per test hour charged in test-as-a-service (USD). */
  pricePerHour: number;
  /** Variable cost per test hour: energy, consumables, technician share (USD). */
  variableCostPerHour: number;
  /** Fixed annual cost: maintenance, calibration, floor space, insurance (USD). */
  fixedAnnual: number;
  /** Annual value of the bench-memory data from each test hour (e.g. model training value), USD per hour. */
  dataValuePerHour?: number;
}

export interface PlatformResult {
  hoursSold: number;
  revenue: number;
  grossProfit: number;
  depreciation: number;
  ebit: number;
  /** Utilisation at which EBIT = 0. */
  breakevenUtilisation: number;
  /** Years to recover capex from (gross profit − fixed). */
  paybackYears: number;
  /** Including data value. */
  ebitWithData: number;
}

export function platformEconomics(i: PlatformInput): PlatformResult {
  const hoursSold = i.availableHours * i.utilisation;
  const margin = i.pricePerHour - i.variableCostPerHour;
  const revenue = hoursSold * i.pricePerHour;
  const grossProfit = hoursSold * margin;
  const depreciation = i.lifeYears > 0 ? i.capex / i.lifeYears : 0;
  const ebit = grossProfit - i.fixedAnnual - depreciation;
  const breakevenUtilisation = margin > 0 && i.availableHours > 0 ? (i.fixedAnnual + depreciation) / (margin * i.availableHours) : Infinity;
  const cash = grossProfit - i.fixedAnnual;
  const paybackYears = cash > 0 ? i.capex / cash : Infinity;
  return { hoursSold, revenue, grossProfit, depreciation, ebit, breakevenUtilisation, paybackYears, ebitWithData: ebit + hoursSold * (i.dataValuePerHour ?? 0) };
}

/** Customer view: cost per test hour of owning a rig vs buying hours. */
export function ownVsBuy(capex: number, lifeYears: number, fixedAnnual: number, variablePerHour: number, hoursPerYear: number) {
  return hoursPerYear > 0 ? (capex / lifeYears + fixedAnnual) / hoursPerYear + variablePerHour : Infinity;
}

// ---------------------------------------------------------------- GSN safety case

export type GsnKind = "goal" | "strategy" | "solution" | "context" | "assumption" | "justification";
export interface GsnNode {
  id: string;
  kind: GsnKind;
  text: string;
  /** Parent node (SupportedBy for goal/strategy/solution, InContextOf for the others). */
  parent?: string;
}

/**
 * Structural checks from the GSN Community Standard: one top goal; goals are supported by strategies, sub-goals or
 * solutions; strategies are supported by goals; solutions are leaves; context, assumptions and justifications attach
 * to goals or strategies and support nothing; every goal ends in evidence.
 */
export function checkGsn(nodes: GsnNode[]): string[] {
  const issues: string[] = [];
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const children = (id: string) => nodes.filter((n) => n.parent === id);
  const roots = nodes.filter((n) => !n.parent);
  if (roots.length !== 1 || roots[0]?.kind !== "goal") issues.push("A safety case needs exactly one top-level goal.");
  for (const n of nodes) {
    const p = n.parent ? byId.get(n.parent) : undefined;
    if (n.parent && !p) issues.push(`${n.id}: parent ${n.parent} does not exist.`);
    if (!p) continue;
    const support = n.kind === "goal" || n.kind === "strategy" || n.kind === "solution";
    if (support && p.kind !== "goal" && p.kind !== "strategy") issues.push(`${n.id}: a ${n.kind} can only support a goal or strategy.`);
    if (n.kind === "strategy" && p.kind !== "goal") issues.push(`${n.id}: a strategy must decompose a goal.`);
    if (n.kind === "solution" && children(n.id).length) issues.push(`${n.id}: a solution (evidence) is a leaf.`);
    if (!support && p.kind !== "goal" && p.kind !== "strategy") issues.push(`${n.id}: ${n.kind} attaches to a goal or strategy.`);
    if (!support && children(n.id).length) issues.push(`${n.id}: ${n.kind} cannot have children.`);
  }
  // every goal must reach a solution
  const reachesEvidence = (id: string, seen = new Set<string>()): boolean => {
    if (seen.has(id)) return false;
    seen.add(id);
    const kids = children(id).filter((c) => c.kind === "goal" || c.kind === "strategy" || c.kind === "solution");
    if (kids.some((c) => c.kind === "solution")) return true;
    return kids.length > 0 && kids.every((c) => reachesEvidence(c.id, seen));
  };
  for (const g of nodes.filter((n) => n.kind === "goal")) if (!reachesEvidence(g.id)) issues.push(`${g.id}: goal is not supported down to evidence (a solution).`);
  for (const s of nodes.filter((n) => n.kind === "strategy")) if (!children(s.id).some((c) => c.kind === "goal" || c.kind === "solution")) issues.push(`${s.id}: strategy has no sub-goals.`);
  return issues;
}
