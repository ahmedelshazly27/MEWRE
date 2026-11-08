import { md } from "../schema";
import type { Explainer } from "./schema";

/** Day 2 · Grid electricity: reactive power, three-phase, transformers, frequency, faults (Module 1). */
export const D2: Explainer[] = [
  {
    id: "x-reactive-power",
    day: 2,
    title: "Reactive power: the foam on the beer",
    minutes: 15,
    module: "m01",
    hook: "Every PV and BESS plant MEWRE connects must supply or absorb reactive power at the grid connection, and in a Kuwaiti summer millions of air-conditioning motors drag voltage down. If you can explain reactive power simply, you can follow every grid-code, inverter-sizing and voltage discussion in the room.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Order a beer. The glass holds **beer** and **foam**. You pay for the whole glass and the barman has to fill the whole glass, but only the beer quenches your thirst.

- **Real power P** (MW) is the beer: it turns motors, cools rooms, lights lamps.
- **Reactive power Q** (Mvar) is the foam: it is needed by some equipment, it takes up space, it does no useful work.
- **Apparent power S** (MVA) is the whole glass: what the cables and transformers must carry.

Cables and transformers are rated in **MVA**, the size of the glass. A transformer full of foam has less room for beer.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

In AC the voltage swings back and forth 50 times a second. Some equipment needs a **magnetic field** to work: motors, transformers, overhead lines. Building that field takes energy for a quarter of each cycle, and the field gives the energy back in the next quarter. Capacitors and long underground cables do the same with an **electric field**.

That energy sloshing back and forth every cycle is reactive power. The slosh shows up as a **timing shift** between voltage and current:

- **Lagging**: current peaks *after* voltage. Coils and motors. They *absorb* reactive power.
- **Leading**: current peaks *before* voltage. Capacitors and cables. They *supply* reactive power.

Memory trick: **ELI the ICE man**. In an inductor (L), voltage (E) comes before current (I); in a capacitor (C), current (I) comes before voltage (E).

Slide the angle below and watch the red area: energy handed back to the grid every cycle.`,
      },
      { kind: "widget", widget: "ac-power", props: { phi: 36.87 }, caption: "An air-conditioning compressor at power factor 0.8: the current is 25 % larger than the useful power needs." },
      {
        kind: "md",
        md: md`### Why the grid cares: voltage

Here is the part most engineers miss. On transmission lines, **moving reactive power is what moves voltage**. Pull a lot of Q across a long line and the voltage at the far end sags; supply Q close to where it is used and the voltage holds.

So the grid needs reactive power **sources near the loads**: generators, capacitor banks, SVCs and STATCOMs, and today **inverters of PV and BESS plants**. That is why the grid code makes a PV plant supply or absorb Q at its connection point, and why inverters are rated in **MVA larger than the plant's MW**: they need headroom to deliver Q even at full sunshine.`,
      },
      { kind: "widget", widget: "power-triangle", props: { p: 800, pf: 0.8 }, caption: "The same idea as a triangle: P along the bottom, Q up the side, S the long side. Correct the power factor and S, the current, shrinks while P stays the same." },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Power factor** $= P/S$. Industrial and AC loads: about 0.8 to 0.9 lagging. Utilities want it near 0.95 or better.
- **Grid codes** typically ask a PV plant for reactive capability around **0.95 lagging to 0.95 leading** at the point of interconnection, at full output. Kuwait's exact requirement comes from MEWRE's grid code and the PPA: ask for it, do not assume it.
- **Inverter rating**: a 100 MW plant at PF 0.95 needs about $100/0.95 \approx 105$ MVA of inverter capacity, more once you allow for the 50 °C derating.
- $S^2 = P^2 + Q^2$. At PF 0.8: P = 0.8, Q = 0.6, S = 1.0.`,
      },
    ],
    say: [
      "What reactive capability does the grid code require at the point of interconnection, and does it hold at 50 °C ambient?",
      "Is the inverter MVA rating sized for that, or are we relying on a STATCOM?",
      "Who sets the voltage or reactive power setpoint: our power plant controller or the control centre?",
      "Has the reactive capability been demonstrated in the commissioning tests, or only on paper?",
    ],
    trap: "Thinking reactive power is wasted energy. Very little energy actually flows back (about 3 % per cycle at power factor 0.8). The real cost is the extra current: it fills cables and transformers, heats them and drops voltage. And it is not useless: motors and transformers cannot work without it, and the grid needs it to hold voltage.",
    check: [
      {
        id: "x-reactive-power-c1",
        type: "mcq",
        prompt: md`An air-conditioning compressor draws its current **after** the voltage peaks. What is it doing?`,
        options: ["Absorbing reactive power (lagging)", "Supplying reactive power (leading)", "Drawing only real power", "Returning real power to the grid"],
        answer: 0,
        explanation: md`Motors need a magnetic field, so their current lags the voltage and they absorb reactive power. ELI: voltage (E) before current (I) in an inductor (L).`,
        concepts: ["m01.power-factor"],
        difficulty: 1,
      },
      {
        id: "x-reactive-power-c2",
        type: "numeric",
        prompt: md`A load uses 8 MW at power factor 0.8. What apparent power S (MVA) must the transformer carry?`,
        answer: 10,
        tolerance: { abs: 0.1 },
        unit: "MVA",
        explanation: md`$S = P / \text{PF} = 8 / 0.8 = 10$ MVA. The transformer must be sized for 10 MVA even though only 8 MW does useful work.`,
        concepts: ["m01.complex-power"],
        difficulty: 1,
      },
      {
        id: "x-reactive-power-c3",
        type: "mcq",
        prompt: md`Why does MEWRE's grid code ask PV plants for reactive power capability?`,
        options: [
          "To help hold the grid voltage, since reactive power flow largely sets voltage on transmission lines",
          "To increase the energy the plant sells",
          "To reduce soiling losses on the modules",
          "Because inverters cannot work at unity power factor",
        ],
        answer: 0,
        explanation: md`Reactive power is what controls voltage on high-voltage lines. As PV replaces conventional generators, the inverters must take over part of their voltage-support job.`,
        concepts: ["m01.voltage-reactive-link"],
        difficulty: 1,
      },
    ],
    deeper: ["m01-l02", "m06-l03"],
  },
];
