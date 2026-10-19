import { describe, it, expect } from "vitest";
import { cpm, topoSort, projectDuration, CycleError, type Activity } from "./cpm";

// Classic network:
// A(3) → B(4) → D(2)
// A(3) → C(2) → D
// D → E(3)
// Critical path A-B-D-E = 12; C has 2 days float.
const net: Activity[] = [
  { id: "A", duration: 3 },
  { id: "B", duration: 4, preds: ["A"] },
  { id: "C", duration: 2, preds: ["A"] },
  { id: "D", duration: 2, preds: ["B", "C"] },
  { id: "E", duration: 3, preds: ["D"] },
];

describe("CPM", () => {
  const r = cpm(net);
  it("project duration", () => {
    expect(r.duration).toBe(12);
  });
  it("forward pass", () => {
    expect(r.byId.B.es).toBe(3);
    expect(r.byId.B.ef).toBe(7);
    expect(r.byId.C.ef).toBe(5);
    expect(r.byId.D.es).toBe(7);
    expect(r.byId.E.ef).toBe(12);
  });
  it("backward pass", () => {
    expect(r.byId.E.lf).toBe(12);
    expect(r.byId.D.ls).toBe(7);
    expect(r.byId.C.lf).toBe(7);
    expect(r.byId.C.ls).toBe(5);
    expect(r.byId.A.ls).toBe(0);
  });
  it("floats", () => {
    expect(r.byId.C.totalFloat).toBe(2);
    expect(r.byId.C.freeFloat).toBe(2);
    expect(r.byId.B.totalFloat).toBe(0);
  });
  it("critical path", () => {
    expect(r.criticalPath).toEqual(["A", "B", "D", "E"]);
    expect(r.byId.C.critical).toBe(false);
  });
  it("lag on a dependency", () => {
    const lagged = cpm([
      { id: "A", duration: 3 },
      { id: "B", duration: 2, preds: [{ id: "A", lag: 2 }] },
    ]);
    expect(lagged.byId.B.es).toBe(5);
    expect(lagged.duration).toBe(7);
    expect(lagged.criticalPath).toEqual(["A", "B"]);
  });
  it("free float differs from total float on a chain", () => {
    // X(1) → Y(1) → Z(1); W(10) parallel. X,Y,Z have TF 7; only Z has FF 7.
    const s = cpm([
      { id: "W", duration: 10 },
      { id: "X", duration: 1 },
      { id: "Y", duration: 1, preds: ["X"] },
      { id: "Z", duration: 1, preds: ["Y"] },
    ]);
    expect(s.byId.X.totalFloat).toBe(7);
    expect(s.byId.X.freeFloat).toBe(0);
    expect(s.byId.Z.freeFloat).toBe(7);
  });
  it("detects cycles", () => {
    expect(() =>
      cpm([
        { id: "A", duration: 1, preds: ["C"] },
        { id: "B", duration: 1, preds: ["A"] },
        { id: "C", duration: 1, preds: ["B"] },
      ]),
    ).toThrow(CycleError);
  });
  it("rejects unknown predecessors", () => {
    expect(() => topoSort([{ id: "A", duration: 1, preds: ["Z"] }])).toThrow(/Unknown predecessor/);
  });
  it("projectDuration with overrides", () => {
    const order = topoSort(net);
    expect(projectDuration(net, order)).toBe(12);
    expect(projectDuration(net, order, { C: 8 })).toBe(16);
  });
  it("empty network", () => {
    expect(cpm([]).duration).toBe(0);
  });
});
