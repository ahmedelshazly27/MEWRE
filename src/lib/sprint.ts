/** Packs the sprint into 3, 4 or 5 study days of roughly equal length. Pure, shared by server, client and tests. */
import { CHECK_MIN, EXAM_MIN, PLAYBOOK_MIN, tierFor, type SprintDays, type Tier } from "@/content/crash";

export interface BlockInput {
  module: string;
  sheetMin: number;
  lessons: { id: string; tier: Tier; minutes: number }[];
  scenario?: { id: string; tier: Tier };
  output?: { tier: Tier };
}

export const SCENARIO_MIN = 12;
export const OUTPUT_MIN = 25;

export type SprintItem =
  | { kind: "sheet"; minutes: number }
  | { kind: "lesson"; id: string; minutes: number }
  | { kind: "scenario"; id: string; minutes: number }
  | { kind: "check"; minutes: number }
  | { kind: "output"; minutes: number }
  | { kind: "playbook"; minutes: number }
  | { kind: "exam"; minutes: number };

export interface Segment<B extends BlockInput> {
  /** null for the finale (playbook + final exam). */
  block: B | null;
  items: SprintItem[];
  /** True when this module started on an earlier day. */
  continued: boolean;
}

export interface PlannedDay<B extends BlockInput> {
  day: number;
  segments: Segment<B>[];
  minutes: number;
}

/** Items of one module, in study order, for a given tier. */
export function blockItems(b: BlockInput, tier: Tier): SprintItem[] {
  const items: SprintItem[] = [{ kind: "sheet", minutes: b.sheetMin }];
  for (const l of b.lessons) if (l.tier <= tier) items.push({ kind: "lesson", id: l.id, minutes: l.minutes });
  if (b.scenario && b.scenario.tier <= tier) items.push({ kind: "scenario", id: b.scenario.id, minutes: SCENARIO_MIN });
  items.push({ kind: "check", minutes: CHECK_MIN });
  if (b.output && b.output.tier <= tier) items.push({ kind: "output", minutes: OUTPUT_MIN });
  return items;
}

export function planSprint<B extends BlockInput>(blocks: B[], days: SprintDays): PlannedDay<B>[] {
  const tier = tierFor(days);
  const flat: { block: B | null; item: SprintItem }[] = [
    ...blocks.flatMap((b) => blockItems(b, tier).map((item) => ({ block: b, item }))),
    { block: null, item: { kind: "playbook", minutes: PLAYBOOK_MIN } },
    { block: null, item: { kind: "exam", minutes: EXAM_MIN } },
  ];
  const total = flat.reduce((s, x) => s + x.item.minutes, 0);
  const out: PlannedDay<B>[] = Array.from({ length: days }, (_, i) => ({ day: i + 1, segments: [], minutes: 0 }));
  const started = new Set<string>();
  let d = 0;
  let cum = 0;
  for (const { block, item } of flat) {
    const target = (total * (d + 1)) / days;
    // move on when adding this item would overshoot the day's share by more than stopping now undershoots it
    if (d < days - 1 && out[d].minutes > 0 && cum + item.minutes - target > target - cum) d++;
    const day = out[d];
    const last = day.segments[day.segments.length - 1];
    if (last && last.block === block) last.items.push(item);
    else {
      const key = block?.module ?? "";
      day.segments.push({ block, items: [item], continued: !!block && started.has(key) });
      started.add(key);
    }
    day.minutes += item.minutes;
    cum += item.minutes;
  }
  return out;
}
