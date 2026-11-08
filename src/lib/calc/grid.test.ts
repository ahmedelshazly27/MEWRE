import { describe, expect, it } from "vitest";
import { LEVELS, levelCurrent, lossVs400 } from "./grid";

const at = (id: string) => LEVELS.find((l) => l.id === id)!;

describe("grid voltage levels", () => {
  it("computes the current a given power needs at each level", () => {
    expect(levelCurrent(at("ehv"), 100)).toBeCloseTo(144.3, 1);
    expect(levelCurrent(at("ehv"), 1100)).toBeCloseTo(1587.7, 0);
    expect(levelCurrent(at("hv"), 100)).toBeCloseTo(437.4, 1);
    expect(levelCurrent(at("home"), 100)).toBeCloseTo(416_667, -1);
  });

  it("loss in the same wire scales with (400 kV / V)²", () => {
    expect(lossVs400(at("ehv"))).toBe(1);
    expect(lossVs400(at("hv"))).toBeCloseTo(9.18, 2);
  });

  it("only 400 kV is marked confirmed for Kuwait", () => {
    expect(LEVELS.filter((l) => l.kuwait === "confirmed").map((l) => l.id)).toEqual(["ehv"]);
  });
});
