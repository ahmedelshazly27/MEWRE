/** Critical Path Method with finish-to-start dependencies and optional lags. */

export type Pred = string | { id: string; lag?: number };

export interface Activity {
  id: string;
  name?: string;
  duration: number;
  preds?: Pred[];
}

export interface ScheduledActivity extends Activity {
  es: number;
  ef: number;
  ls: number;
  lf: number;
  totalFloat: number;
  freeFloat: number;
  critical: boolean;
}

export interface CpmResult {
  activities: ScheduledActivity[];
  /** Map by id. */
  byId: Record<string, ScheduledActivity>;
  duration: number;
  /** Critical activity ids in topological order. */
  criticalPath: string[];
  /** Topological order of ids. */
  order: string[];
}

export class CycleError extends Error {
  constructor(public readonly ids: string[]) {
    super(`Dependency cycle detected involving: ${ids.join(", ")}`);
    this.name = "CycleError";
  }
}

const EPS = 1e-9;

function normPreds(a: Activity): { id: string; lag: number }[] {
  return (a.preds ?? []).map((p) => (typeof p === "string" ? { id: p, lag: 0 } : { id: p.id, lag: p.lag ?? 0 }));
}

/** Topological sort (Kahn). Throws CycleError on a cycle, Error on an unknown predecessor. */
export function topoSort(acts: Activity[]): string[] {
  const ids = new Set(acts.map((a) => a.id));
  const indeg = new Map<string, number>();
  const succ = new Map<string, string[]>();
  for (const a of acts) {
    indeg.set(a.id, 0);
    succ.set(a.id, []);
  }
  for (const a of acts) {
    for (const p of normPreds(a)) {
      if (!ids.has(p.id)) throw new Error(`Unknown predecessor "${p.id}" for "${a.id}"`);
      indeg.set(a.id, (indeg.get(a.id) ?? 0) + 1);
      succ.get(p.id)!.push(a.id);
    }
  }
  const queue = acts.filter((a) => indeg.get(a.id) === 0).map((a) => a.id);
  const order: string[] = [];
  while (queue.length) {
    const id = queue.shift()!;
    order.push(id);
    for (const s of succ.get(id)!) {
      indeg.set(s, indeg.get(s)! - 1);
      if (indeg.get(s) === 0) queue.push(s);
    }
  }
  if (order.length !== acts.length) {
    throw new CycleError(acts.filter((a) => !order.includes(a.id)).map((a) => a.id));
  }
  return order;
}

/** Forward and backward pass. */
export function cpm(acts: Activity[]): CpmResult {
  const order = topoSort(acts);
  const map = new Map(acts.map((a) => [a.id, a]));
  const preds = new Map(acts.map((a) => [a.id, normPreds(a)]));
  const succs = new Map<string, { id: string; lag: number }[]>(acts.map((a) => [a.id, []]));
  for (const a of acts) for (const p of preds.get(a.id)!) succs.get(p.id)!.push({ id: a.id, lag: p.lag });

  const es = new Map<string, number>();
  const ef = new Map<string, number>();
  for (const id of order) {
    const d = map.get(id)!.duration;
    let start = 0;
    for (const p of preds.get(id)!) start = Math.max(start, ef.get(p.id)! + p.lag);
    es.set(id, start);
    ef.set(id, start + d);
  }
  const duration = Math.max(0, ...order.map((id) => ef.get(id)!));
  const ls = new Map<string, number>();
  const lf = new Map<string, number>();
  for (let k = order.length - 1; k >= 0; k--) {
    const id = order[k];
    const d = map.get(id)!.duration;
    let finish = duration;
    for (const s of succs.get(id)!) finish = Math.min(finish, ls.get(s.id)! - s.lag);
    lf.set(id, finish);
    ls.set(id, finish - d);
  }
  const scheduled: ScheduledActivity[] = acts.map((a) => {
    const ss = succs.get(a.id)!;
    let ff = duration - ef.get(a.id)!;
    if (ss.length) ff = Math.min(...ss.map((s) => es.get(s.id)! - s.lag - ef.get(a.id)!));
    const tf = ls.get(a.id)! - es.get(a.id)!;
    return {
      ...a,
      es: es.get(a.id)!,
      ef: ef.get(a.id)!,
      ls: ls.get(a.id)!,
      lf: lf.get(a.id)!,
      totalFloat: tf,
      freeFloat: ff,
      critical: Math.abs(tf) < EPS,
    };
  });
  const byId: Record<string, ScheduledActivity> = {};
  for (const s of scheduled) byId[s.id] = s;
  return {
    activities: scheduled,
    byId,
    duration,
    criticalPath: order.filter((id) => byId[id].critical),
    order,
  };
}

/** Project duration only (fast path for Monte Carlo). `durations` overrides activity durations by id. */
export function projectDuration(acts: Activity[], order: string[], durations?: Record<string, number>): number {
  const map = new Map(acts.map((a) => [a.id, a]));
  const ef = new Map<string, number>();
  let max = 0;
  for (const id of order) {
    const a = map.get(id)!;
    let start = 0;
    for (const p of normPreds(a)) start = Math.max(start, ef.get(p.id)! + p.lag);
    const f = start + (durations ? durations[id] ?? a.duration : a.duration);
    ef.set(id, f);
    if (f > max) max = f;
  }
  return max;
}
