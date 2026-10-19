import type { Activity } from "@/lib/calc/cpm";

/** Default PV project network (durations in weeks) for CPM and Monte Carlo widgets. Illustrative. */
export const PV_NETWORK: (Activity & { name: string; min: number; max: number })[] = [
  { id: "A", name: "Permits & approvals", duration: 16, min: 12, max: 30 },
  { id: "B", name: "Geotechnical survey", duration: 6, min: 5, max: 9 },
  { id: "C", name: "Detailed design", duration: 12, min: 10, max: 18, preds: ["B"] },
  { id: "D", name: "Module procurement", duration: 24, min: 20, max: 34, preds: ["C"] },
  { id: "E", name: "Tracker procurement", duration: 20, min: 16, max: 30, preds: ["C"] },
  { id: "F", name: "Piling", duration: 12, min: 10, max: 18, preds: ["A", "C"] },
  { id: "G", name: "Tracker installation", duration: 14, min: 12, max: 20, preds: ["F", "E"] },
  { id: "H", name: "Module installation", duration: 16, min: 13, max: 22, preds: ["G", "D"] },
  { id: "I", name: "MV / collector works", duration: 14, min: 12, max: 20, preds: ["F"] },
  { id: "J", name: "HV substation", duration: 30, min: 26, max: 42, preds: ["A", "C"] },
  { id: "K", name: "Grid connection", duration: 6, min: 4, max: 16, preds: ["J", "I"] },
  { id: "L", name: "Testing & commissioning", duration: 8, min: 6, max: 12, preds: ["H", "K"] },
];
