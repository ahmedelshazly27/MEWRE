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
  {
    id: "x-three-phase",
    day: 2,
    title: "Three-phase: three waves taking turns",
    minutes: 12,
    module: "m01",
    hook: "Every voltage on a MEWRE single-line diagram (400 kV, 132 kV, 33 kV) is a three-phase voltage, and every current check on a drawing uses a √3. Once three-phase clicks, you can sanity-check a cable or a breaker rating in your head in a design review.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of an engine. A one-cylinder engine (a lawnmower) delivers a push, then nothing, then a push: it shakes. A **three-cylinder** engine has its cylinders firing in turn, so one is always pushing and the crankshaft turns much more smoothly.

Three-phase is the same trick with electricity. Instead of one AC wave that rises, falls through zero and rises again, the generator makes **three waves of the same size, each one-third of a cycle (120°) behind the previous one**. When one wave is passing through zero, the other two are doing the work.

Where the analogy breaks: a three-cylinder engine still has a little ripple in its torque. A balanced three-phase supply delivers **perfectly constant** total power, not just smoother power.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

The generator has three coils (windings) spaced evenly around it. As the magnet spins past them, each coil makes its own sine wave, 120° apart. The three outputs are the **phases**, often called L1, L2, L3 (or A, B, C, or red, yellow, blue). Three things fall out of this:

- **Constant power.** Add up the power in the three phases at any instant and the dips cancel. Big generators and motors feel a steady push instead of a 100 Hz shake.
- **Three wires instead of six.** Three separate single-phase circuits would need six wires (out and back for each). In three-phase, when the three currents are equal (**balanced**), they add up to zero at every instant, so the "return" currents cancel and no return wire is needed. That is why a transmission line has three conductors (plus earth wires on top for lightning, which carry no load current).
- **A rotating magnetic field.** Feed three coils spaced around a motor with three currents peaking in turn, and the magnetic field turns by itself, at a speed set by the frequency. Every large motor (including the compressors in Kuwait's air-conditioning load) works this way: it starts and runs without the extra starting tricks a single-phase motor needs.

**Line vs phase voltage.** In the common **star** connection each coil sits between one line and a shared middle point (the **neutral**). The voltage from a line to neutral is the **phase voltage**; the voltage between two lines is the **line voltage**, and it is $\sqrt3 \approx 1.73$ times bigger (the two waves are 120° apart, so their difference is bigger than either one, but not double). A generic example: European low voltage is **400/230 V** (230 V line to neutral, $230 \times 1.73 \approx 400$ V between lines). Track 0 describes Kuwaiti homes as fed at **415/240 V**. **Equipment is always labelled with the line voltage**: "33 kV" means 33 kV between phases and 19.05 kV from each phase to earth.

**Power.** The one formula you will use on the job:

$P = \sqrt3 \times V_\text{line} \times I \times \text{PF}$

Example from Track 0: a 33 kV feeder carrying 30 MW at PF 0.95 carries $30{,}000{,}000 / (1.73 \times 33{,}000 \times 0.95) \approx 553$ A.

**Unbalance.** If the three phases are loaded unequally (many single-phase AC units on one phase, a blown fuse, a fault), the currents no longer cancel. The leftover flows in the neutral, and the unequal voltages heat motors and generators and can make inverters reduce output or trip.`,
      },
      { kind: "widget", widget: "three-phase", props: { unbalance: 0 }, caption: "Balanced: the three waves add to zero at every instant and line voltage is 1.73 × phase voltage. Now drag the phase A drop to 20 % and watch the sum stop being zero: that leftover is what a neutral wire must carry." },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **√3 ≈ 1.73**: line voltage = 1.73 × phase voltage in star. "400 kV" is about 231 kV from each phase to earth; "132 kV" about 76 kV.
- **Current anchors** ($I = S/(\sqrt3 V)$): about **17.5 A per MVA at 33 kV**, **1.44 A per MVA at 400 kV**. So 30 MVA on a 33 kV feeder is about 525 A.
- **Low voltage**: 400/230 V is the generic IEC example; Track 0 gives Kuwait as **415/240 V** (widely described, confirm in the MEWRE distribution standards).
- **Voltage unbalance**: planning limits are typically around **1.4 to 2 %**; many inverters derate or trip above about **2 to 3 %**; 1 % voltage unbalance can cause 6 to 10 % current unbalance in an induction motor.`,
      },
    ],
    say: [
      "Are all voltages on this SLD line-to-line, and are the insulation ratings based on the phase-to-earth value?",
      "Did the cable sizing use MVA including the reactive requirement, with the √3 applied once?",
      "What voltage unbalance did the power-quality study assume at the connection point, and what can the inverters tolerate before they derate?",
      "Quick check: 30 MVA at 33 kV is about 525 A. Does the feeder rating match that, after site derating?",
    ],
    trap: "Forgetting the √3, or using it twice. Writing I = P / (V × PF) with the line voltage gives a current 73 % too high; dividing a phase voltage by √3 again gives one far too low. Remember: nameplate voltage is line-to-line, and P = √3 × V_line × I × PF uses it directly.",
    check: [
      {
        id: "x-three-phase-c1",
        type: "numeric",
        prompt: md`A 33 kV system: what is the voltage from one phase to earth, in kV?`,
        answer: 19.05,
        tolerance: { abs: 0.1 },
        unit: "kV",
        explanation: md`$33/\sqrt3 = 19.05$ kV. The 33 kV on the nameplate is between two lines; each line sits 19.05 kV from earth, which is what cable and surge-arrester insulation is rated against.`,
        concepts: ["m01.star-delta"],
        difficulty: 1,
      },
      {
        id: "x-three-phase-c2",
        type: "numeric",
        prompt: md`A 33 kV collector feeder exports 20 MW at power factor 1. Roughly what current flows in each line, in amperes?`,
        answer: 350,
        tolerance: { rel: 0.02 },
        unit: "A",
        explanation: md`$I = P/(\sqrt3 \times V \times \text{PF}) = 20{,}000{,}000/(1.732 \times 33{,}000 \times 1) \approx 350$ A. Shortcut: 17.5 A per MVA at 33 kV, times 20.`,
        concepts: ["m01.three-phase-power", "m01.current-sanity-check"],
        difficulty: 1,
      },
      {
        id: "x-three-phase-c3",
        type: "mcq",
        prompt: md`Why can a balanced three-phase transmission line use three conductors instead of six?`,
        options: [
          "The three balanced currents add up to zero at every instant, so no return conductor is needed",
          "The earth carries the return current of all three phases in normal operation",
          "Each conductor carries one-third of the voltage",
          "Three-phase lines carry no reactive power",
        ],
        answer: 0,
        explanation: md`Equal currents 120° apart sum to zero, so each phase's "return" is provided by the other two. Earth only carries current during faults or unbalance.`,
        concepts: ["m01.neutral-unbalance", "m01.three-phase-power"],
        difficulty: 1,
      },
    ],
    deeper: ["m01-l03"],
  },
  {
    id: "x-transformers-voltage-levels",
    day: 2,
    title: "Transformers and voltage levels: why 400 kV",
    minutes: 13,
    module: "m01",
    hook: "A Shagaya-scale PV plant's output goes through two sets of transformers before it reaches the 400 kV grid, and the main transformer is one of the longest-lead, most expensive items on the project. Knowing why voltages step up, and how a transformer is rated for a 50 °C summer, lets you follow the grid-connection and procurement discussions from day one.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of moving water through a pipe. To move a lot of water through a thin pipe you need high pressure; at low pressure you need a fat pipe, and friction wastes a lot of the effort. Voltage is the pressure, current is the flow rate, and losses in the line are the friction.

Friction in a wire grows with the **square** of the current. So the trick for long distances is: raise the pressure (voltage), shrink the flow (current) for the same power, and the losses collapse. A **transformer** is the device that trades voltage for current, up at the power station and down near the customer.

Where the analogy breaks: a transformer has no moving parts and does not "pump". It only works with AC, because it relies on a changing magnetic field.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

A transformer is two **coils (windings)** wound on the same iron **core**. AC in the first coil makes a magnetic field that keeps changing direction (Day 1's magnetism). The core carries that changing field through the second coil, and a changing field induces a voltage in it.

- The voltage on each side is set by the **turns ratio**: a coil with 12 times more turns has 12 times the voltage. A 400/33 kV transformer has a ratio of about 12.1.
- Power in ≈ power out (large units are 99.5 to 99.8 % efficient), so **current goes the other way**: 12 times the voltage means one-twelfth of the current.

**Why 400 kV.** For the same power, current falls in proportion to voltage and losses fall with the current squared. Moving 1,100 MW at power factor 1:

| Voltage | Current | Relative $I^2R$ loss (same wire) |
|---|---|---|
| 33 kV | about 19,200 A | about 147 × |
| 132 kV | about 4,800 A | about 9 × |
| 400 kV | about 1,590 A | 1 × |

The price is bigger towers, wider clearances and costlier substations, worth it for bulk power over long distances.

**Ratings.** A transformer is rated in **MVA**, not MW, because heat comes from current whatever the power factor (the beer-and-foam glass from the reactive-power explainer). The datasheet shows the cooling class: **ONAN** (oil and air move naturally) and **ONAF** (fans blow on the radiators). "ONAN/ONAF 200/250 MVA" means 200 MVA with fans off, 250 MVA with fans running.

**Heat is the real limit.** The IEC standard rating assumes air at most 40 °C (30 °C hottest-month average, 20 °C yearly average). Kuwait goes past all three, with summer maxima of 50 °C and more. A standard unit run at nameplate in Kuwait runs hotter and its insulation ages faster. The fix is to specify the site ambient in the purchase specification, or to derate a standard unit (a rough planning rule is about 1 % of rating per °C above the design ambient, always confirmed by the manufacturer's thermal calculation).`,
      },
      {
        kind: "md",
        md: md`### Where a PV plant steps up

Follow the energy on the plant drawing below:

1. **Modules and inverters**: DC from the modules becomes AC at low voltage in the inverter (about 0.8 kV in Track 0's examples).
2. **Inverter step-up transformer** next to each inverter: 0.8 kV to **33 kV**.
3. **33 kV collector cables** gather the inverter stations to the plant substation.
4. **Main transformer** at the plant's high-voltage substation: 33 kV to **400 kV**.
5. **400 kV line** to the grid (for Shagaya, the Shagaya to Al-Wafra 400 kV line that MEWRE procured separately).`,
      },
      { kind: "widget", widget: "pv-sld", caption: "Click the inverter transformer and the main HV transformer. For each, ask two questions: what voltages does it join, and at what ambient temperature is its MVA rating guaranteed?" },
      {
        kind: "callout",
        tone: "kuwait",
        title: "Numbers you will hear",
        md: md`- **Voltage levels**: **400 kV** for bulk transmission and new renewable connections is **confirmed** in Track 0 (Shagaya to Al-Wafra 400 kV line; the Shagaya Phase III Zone 1 IPP scope includes a 400 kV substation). **132 kV** (sub-transmission) and **33 / 11 kV** (distribution, PV collector systems at 33 kV) are commonly cited but flagged **unverified** in Track 0; an older intermediate level (300 or 275 kV) is also unverified.
- **Ratios**: 400/33 kV main transformers, 0.8/33 kV inverter transformers; impedance about 12 to 16 % for 400/33 kV and 132/33 kV units.
- **Ambient basis**: IEC default 40 / 30 / 20 °C (max / hottest month / year); Kuwait specifications should state the site values (for example max 55 °C).
- **Lead time**: large power transformers have taken **2 to 4 years** in the 2023 to 2026 market.`,
      },
    ],
    say: [
      "On what ambient temperature is this transformer's MVA rating guaranteed: IEC normal conditions or our site values?",
      "What is the ONAN rating, and can we carry the critical load at 50 °C with one fan group out of service?",
      "Are the transformer losses guaranteed, with penalties that match how we evaluated the bids?",
      "What is the delivery lead time, and has the transport route to site been surveyed for a unit of this weight?",
    ],
    trap: "Thinking a transformer's nameplate MVA is what it can carry on a Kuwaiti summer afternoon. The nameplate is usually valid for IEC normal ambient (40 °C maximum); at 50 °C plus, a standard unit must be derated or it ages fast. The rating that matters is the one at site conditions, written into the specification.",
    check: [
      {
        id: "x-transformers-voltage-levels-c1",
        type: "numeric",
        prompt: md`The same power is sent over the same conductor at 400 kV instead of 132 kV. By roughly what factor do the $I^2R$ losses fall?`,
        answer: 9.2,
        tolerance: { abs: 0.4 },
        unit: "times",
        explanation: md`Current falls by $400/132 \approx 3.03$, and losses go with current squared: $3.03^2 \approx 9.2$. Losses fall to about a ninth.`,
        concepts: ["m06.transmission-voltage"],
        difficulty: 1,
      },
      {
        id: "x-transformers-voltage-levels-c2",
        type: "mcq",
        prompt: md`A contractor offers a "standard" 400/33 kV transformer rated to IEC normal service conditions. Why is that a problem in Kuwait?`,
        options: [
          "The IEC rating assumes at most 40 °C ambient; Kuwait exceeds it, so the unit will run hot and age faster unless derated or designed for site ambient",
          "IEC transformers cannot operate at 50 Hz",
          "IEC ratings are in MW, but Kuwait uses MVA",
          "Standard transformers cannot step up from 33 kV to 400 kV",
        ],
        answer: 0,
        explanation: md`IEC 60076-2 rises assume 40 °C maximum, 30 °C hottest-month average, 20 °C yearly average. Kuwait exceeds all three, so rises must be reduced (site-specific design) or the unit derated.`,
        concepts: ["m01.transformer-derating"],
        difficulty: 1,
      },
      {
        id: "x-transformers-voltage-levels-c3",
        type: "numeric",
        prompt: md`A 1,100 MW PV plant exports at power factor 1 at 400 kV. What is the line current, in amperes?`,
        answer: 1588,
        tolerance: { rel: 0.01 },
        unit: "A",
        explanation: md`$I = 1{,}100{,}000{,}000/(\sqrt3 \times 400{,}000) \approx 1{,}588$ A. At 33 kV the same power would need about 19,200 A: that is why the plant steps up before leaving site.`,
        concepts: ["m01.transformer-ratings", "m01.current-sanity-check"],
        difficulty: 1,
      },
    ],
    deeper: ["m01-l04", "m06-l01"],
  },
  {
    id: "x-frequency-inertia",
    day: 2,
    title: "Frequency and inertia: the grid's heartbeat",
    minutes: 14,
    module: "m01",
    hook: "Kuwait's summer system runs with thin reserves, and a single 300 MW unit trip in June 2024 led to rolling cuts. As gigawatts of PV arrive, a 1,100 MW solar plant becomes one of the biggest things that can trip, so frequency response and fault ride-through clauses in every PPA you touch are system-security issues, not details.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Picture a long freight train going up and down hills, pushed by many locomotives. The speed of the train is the **frequency**. If the hill gets steeper (more demand) and the locomotives do not push harder, the train slows. If one locomotive suddenly fails, the train slows faster.

What stops it from slowing instantly? The **weight of the moving train**: its momentum buys a few seconds for the drivers to open the throttles. That momentum is **inertia**.

Where the analogy breaks: on the grid there is one "speed" for everyone, and it is measured as electrical frequency (cycles per second), not as kilometres per hour.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

Every large conventional generator spins in step with the grid: at 50 Hz a typical two-pole gas or steam turbo-generator turns at exactly 3,000 rpm. All of them turn together, like gears in one machine.

- **50 Hz means supply equals demand.** If load is higher than generation for even a moment, the missing energy is taken from the spinning rotors, they slow down, and **frequency falls**. Too much generation and frequency rises. Frequency is the grid's real-time balance meter, the same everywhere on the system.
- **Inertia** is the energy stored in those heavy spinning rotors. More inertia means frequency changes more slowly.
- **When a big unit trips**, frequency starts falling at a rate called the **RoCoF** (rate of change of frequency, in Hz per second). Then a sequence of defences kicks in:
  1. **Inertia** (first seconds): automatic, physics only, slows the fall.
  2. **Primary control** (seconds): each generator's **governor** opens up in proportion to the frequency drop. This proportional rule is called **droop**: with 4 % droop, a 0.2 Hz fall asks a unit for 10 % more of its rating, if it has room (**headroom**).
  3. **Secondary control** (tens of seconds to minutes): the control centre moves set-points to bring frequency back to 50 Hz.
  4. **Under-frequency load shedding** (last resort): if frequency keeps falling (to about 49.0 to 48.8 Hz in typical settings), relays disconnect blocks of customers to save the rest.

**Why PV changes the picture.** PV panels and batteries connect through **inverters**: electronics with no spinning mass, so they add **no physical inertia**. When PV displaces gas units at midday, the same trip makes frequency fall faster. But inverters can react very fast: a battery can inject power in well under a second (**fast frequency response**), faster than any steam governor. Grid codes now ask for exactly that, and some new inverters are **grid-forming**, designed to imitate inertia.`,
      },
      {
        kind: "chart",
        chart: "line",
        title: "Frequency after a 1,100 MW trip (illustrative)",
        xKey: "t",
        xLabel: "Seconds after the trip",
        yLabel: "Frequency (Hz)",
        series: [
          { key: "today", label: "Today's inertia" },
          { key: "highPv", label: "Midday with 3 GW more PV" },
          { key: "bess", label: "High PV plus fast BESS response" },
        ],
        data: [
          { t: 0, today: 50.0, highPv: 50.0, bess: 50.0 },
          { t: 1, today: 49.64, highPv: 49.54, bess: 49.6 },
          { t: 2, today: 49.45, highPv: 49.3, bess: 49.48 },
          { t: 3, today: 49.39, highPv: 49.21, bess: 49.47 },
          { t: 4, today: 49.38, highPv: 49.2, bess: 49.49 },
          { t: 5, today: 49.4, highPv: 49.24, bess: 49.52 },
          { t: 6, today: 49.43, highPv: 49.3, bess: 49.55 },
          { t: 7, today: 49.46, highPv: 49.36, bess: 49.57 },
          { t: 8, today: 49.48, highPv: 49.4, bess: 49.58 },
          { t: 9, today: 49.5, highPv: 49.43, bess: 49.59 },
          { t: 10, today: 49.51, highPv: 49.45, bess: 49.6 },
        ],
        caption: "Illustrative shapes, not Kuwait data. Less inertia: a steeper first fall (about 0.39 vs 0.50 Hz/s in Track 0's example) and a lower lowest point. Fast battery response catches the fall early.",
      },
      { kind: "widget", widget: "droop", props: { droop: 4 }, caption: "With 4 % droop a unit gives 10 % of its rating for each 0.2 Hz beyond its deadband, until it runs out of headroom. A PV plant at full output has no headroom unless it is deliberately held back." },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **50 Hz** nominal, normally held within about **±0.1 to 0.2 Hz**. Kuwait's exact operating band and load-shedding settings come from the MEWRE grid code (Track 0 flags them as to be confirmed).
- **RoCoF**: Track 0's illustrative Kuwait-scale example gives about **0.39 Hz/s** for a 1,100 MW trip today, rising to **0.50 Hz/s** with 3 GW more PV online.
- **Droop**: typically **4 to 5 %**, with a **deadband** (no response for small deviations: ±0.2 Hz in Track 0's worked example; fast frequency response uses much narrower ones).
- **Speeds**: steam governors take about **5 to 10 s** to deliver full response; BESS fast response **under 0.5 to 1 s**.
- **Kuwait event**: a **300 MW** Az-Zour South steam unit tripped on 19 June 2024 at a 16.81 GW June record, followed by scheduled cuts (MEES, via Track 0).`,
      },
    ],
    say: [
      "What frequency response does the PPA and grid code require from the plant: droop, deadband, response time, and is there a headroom obligation?",
      "Has the plant's fault ride-through been shown in studies with the actual inverter models? A 1,100 MW trip is now a system-level event.",
      "What RoCoF can the inverters withstand without tripping?",
      "Should the battery provide fast frequency response, and how is that service paid for?",
    ],
    trap: "Thinking frequency is a local quantity, like voltage, or that a dip only matters near the tripped plant. Frequency is one number for the whole synchronous grid: a trip anywhere pulls it down everywhere at once. And \"PV has no inertia\" does not mean PV cannot help: inverters cannot store spinning energy, but they can respond faster than any turbine if the code requires it and there is headroom.",
    check: [
      {
        id: "x-frequency-inertia-c1",
        type: "mcq",
        prompt: md`System frequency drops from 50.00 to 49.85 Hz. What does that tell you?`,
        options: [
          "Demand is momentarily higher than generation, and the shortfall is being drawn from the spinning rotors",
          "Generation is higher than demand",
          "Voltage has fallen at one substation",
          "Reactive power is too high",
        ],
        answer: 0,
        explanation: md`Falling frequency means the machines are slowing down because load exceeds generation. The energy gap is taken from the rotors' kinetic energy until governors and other resources close it.`,
        concepts: ["m01.frequency-balance"],
        difficulty: 1,
      },
      {
        id: "x-frequency-inertia-c2",
        type: "numeric",
        prompt: md`A 200 MW battery has 4 % droop on a 50 Hz base. Frequency falls 0.3 Hz below the edge of its deadband. How many MW does it inject?`,
        answer: 30,
        tolerance: { rel: 0.02 },
        unit: "MW",
        explanation: md`$\Delta P = P_\text{rated} \times \Delta f/(R \times f_n) = 200 \times 0.3/(0.04 \times 50) = 200 \times 0.15 = 30$ MW. At 4 % droop, a 2 Hz change would move the unit through its full rating.`,
        concepts: ["m06.droop", "m01.frequency-response"],
        difficulty: 2,
      },
      {
        id: "x-frequency-inertia-c3",
        type: "mcq",
        prompt: md`At midday, 3 GW of PV runs in place of 3 GW of gas units. The same 1,100 MW trip happens. What changes?`,
        options: [
          "Frequency falls faster (higher RoCoF), because inverters add no spinning inertia, leaving less time for governors",
          "Frequency falls more slowly, because PV inverters are faster than turbines",
          "Nothing, because inertia depends only on demand",
          "Frequency rises, because PV adds generation",
        ],
        answer: 0,
        explanation: md`Fewer spinning machines means less stored kinetic energy, so the same power gap slows the system faster. In Track 0's example RoCoF rises from about 0.39 to 0.50 Hz/s. Fast BESS response and grid-forming inverters are the remedies.`,
        concepts: ["m01.inertia-rocof"],
        difficulty: 1,
      },
    ],
    deeper: ["m01-l06", "m06-l03"],
  },
  {
    id: "x-fault-level-protection",
    day: 2,
    title: "Fault levels and protection: when things short-circuit",
    minutes: 13,
    module: "m01",
    hook: "Every switchgear panel and breaker on a PV plant drawing carries a kA rating, and MEWRE Transmission must declare the fault level at the connection point. If the numbers do not match, the equipment can fail violently on the first real fault, so this is one of the interface checks a PM must chase.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of a dam feeding a town through pipes. Normally the taps limit how much water flows. If a pipe bursts near the dam, the only thing limiting the flood is the size of the pipes between the dam and the burst. A big dam with fat pipes means a huge flood.

A **short circuit (fault)** is the burst pipe: a conductor touches another conductor or the earth (a fallen line, failed insulation, a digger through a cable), and the normal load no longer limits the current. The **fault level** is the size of the flood at that point. The **breaker** is the valve that must slam shut against it, and the **protection relay** is the guard who spots the burst and orders the valve shut.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

- **Fault current** is limited only by the impedance (Day 1) of the generators, transformers and lines between the sources and the fault. Close to big generators or strong substations, it can be tens of thousands of amperes.
- **Fault level** is quoted two ways: as a current in **kA** at a bus, or as **MVA** ($\sqrt3 \times$ voltage $\times$ fault current). For example 15,000 MVA at 400 kV is about 21.7 kA.
- **Breakers** must be able to **interrupt** that current (their **breaking rating**, for example 31.5 kA at 33 kV) and the busbars must withstand it for a set time (for example 1 or 3 s). If the real fault level exceeds the rating, the breaker may fail to clear the fault, or explode.
- **Protection relays** watch currents and voltages through **CTs and VTs** (current and voltage transformers that make small copies of the signals). When they see a fault in their zone, they send a trip signal to the right breaker. Protection must be **selective** (trip only the faulty part) and **fast**: 400 kV faults are typically cleared in about 80 to 120 ms. A **protection coordination study** sets each relay so that the nearest breaker trips first and backups wait.

**Why fault level is also good news.** A high fault level means a **strong** grid: the voltage hardly moves when a big plant ramps up or down. Synchronous generators push 4 to 7 times their rated current into a fault. Inverters are electronics that limit themselves to about **1.0 to 1.5 times** rated current, so PV and batteries add little fault current. At a remote desert substation with lots of PV, the grid becomes **weak**: inverter controls, which track the grid voltage, can start interacting and oscillating, and relays may not see faults clearly. The screening number is the **short-circuit ratio (SCR)**: fault level at the connection point divided by the plant's MW. Below about 3 means detailed electromagnetic (EMT) studies; below about 2 is very weak.`,
      },
      {
        kind: "flow",
        title: "From fault to cleared fault",
        steps: [
          { label: "Fault", detail: "Insulation fails; current jumps to the fault level (kA)" },
          { label: "CT and VT", detail: "Make small copies of current and voltage for the relay" },
          { label: "Protection relay", detail: "Decides the fault is in its zone and sends a trip" },
          { label: "Circuit breaker", detail: "Opens and interrupts the fault current (must be rated for it)" },
          { label: "Fault cleared", detail: "About 80 to 120 ms at 400 kV; the rest of the grid stays on" },
        ],
        caption: "Every link must work: a relay that never sees the fault, or a breaker rated below the fault level, and the fault spreads.",
      },
      { kind: "widget", widget: "substation-sld", caption: "Find the breakers, CTs and relays on the 400/132/33 kV substation. For each breaker, ask: what fault current must it interrupt, and which relay tells it to open?" },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Switchgear breaking ratings** (typical): **50 or 63 kA** at 400 kV, **31.5 to 40 kA** at 132 kV, **25, 31.5 or 40 kA** at 33 kV.
- **Fault contribution**: synchronous generators about **4 to 7 ×** rated current; inverters about **1.0 to 1.5 ×**.
- **Track 0 example**: a 300 MVA, 14 % transformer behind a 15,000 MVA, 400 kV grid gives about **32.8 kA** at 33 kV, more than 31.5 kA switchgear can handle, before adding inverters or future grid growth.
- **SCR**: above about 3 is workable; below about 3 needs EMT studies; Track 0's example drops from 3.6 to 1.8 when a second 1,100 MW plant shares a 4,000 MVA substation.
- **Clearing time**: about **80 to 120 ms** at 400 kV, with two independent main protections plus breaker-failure protection.`,
      },
    ],
    say: [
      "What maximum and minimum fault levels has MEWRE Transmission declared at the connection point, and do they include future grid growth?",
      "Are all breaker and busbar ratings at least the calculated maximum fault current, including the inverters' contribution and a margin?",
      "Has the protection coordination study been done with the selected inverter's real fault behaviour, and has MEWRE approved the settings?",
      "What is the short-circuit ratio at the connection point, and if it is below 3, where are the EMT studies?",
    ],
    trap: "Treating fault level as a single \"today\" number. The fault level at a bus rises as the grid grows (new lines, generators, parallel transformers), so switchgear sized to today's value can be under-rated in ten years; the design must use the grid operator's future declared value. And a low fault level is not \"safer\": it means a weak grid where inverters and protection both struggle.",
    check: [
      {
        id: "x-fault-level-protection-c1",
        type: "numeric",
        prompt: md`The 400 kV bus at a substation has a three-phase fault level of 15,000 MVA. What is the fault current in kA?`,
        answer: 21.7,
        tolerance: { abs: 0.2 },
        unit: "kA",
        explanation: md`$I = S/(\sqrt3 \times V) = 15{,}000/(1.732 \times 400) \approx 21.7$ kA. MVA in, kV in, kA out.`,
        concepts: ["m01.fault-level", "m06.fault-level"],
        difficulty: 1,
      },
      {
        id: "x-fault-level-protection-c2",
        type: "decision",
        prompt: md`You are the PM. The EPC's fault study shows **32.8 kA** at the plant's 33 kV bus, but the 33 kV switchgear already offered is rated **31.5 kA**. What do you do?`,
        options: [
          { text: "Accept: 4 % over the rating is within engineering margin.", score: 0, feedback: "A breaker rating is a hard limit. Above it the breaker may fail to interrupt the fault, and the study has not yet added inverters or future grid growth." },
          { text: "Require a fix before switchgear is ordered: higher-rated switchgear, a higher-impedance transformer or a split 33 kV bus, with a revised study using MEWRE's declared future fault level and the inverters' contribution.", score: 1, feedback: "Correct: fix it at design, on the right fault level, before procurement locks it in." },
          { text: "Ask MEWRE to reduce the grid fault level.", score: 0.2, feedback: "The grid's fault level is not the plant's to change, and it will only rise as the network grows." },
        ],
        explanation: md`Switchgear must be rated for the maximum prospective fault current, including inverter contribution and future growth. The standard remedies are higher-rated switchgear, a higher-impedance transformer, or splitting the bus with a normally-open coupler.`,
        concepts: ["m06.fault-level"],
        difficulty: 2,
      },
      {
        id: "x-fault-level-protection-c3",
        type: "mcq",
        prompt: md`Why do grids with a lot of inverter-based generation tend to become "weak"?`,
        options: [
          "Inverters limit their fault current to about 1 to 1.5 times rated, so the fault level and voltage stiffness fall as they displace synchronous machines",
          "Inverters produce too much fault current and overload breakers",
          "Inverters only work on DC grids",
          "Inverters raise the grid frequency",
        ],
        answer: 0,
        explanation: md`Synchronous machines give 4 to 7 times rated current into a fault and stiffen voltage. Inverters do not, so the short-circuit ratio falls, inverter controls can interact, and relays see smaller fault currents. Remedies include grid-forming inverters, synchronous condensers and EMT studies.`,
        concepts: ["m01.system-strength"],
        difficulty: 1,
      },
    ],
    deeper: ["m01-l04", "m06-l05", "m01-l06"],
  },
  {
    id: "x-load-curve-kuwait",
    day: 2,
    title: "Kuwait's load curve: air conditioning runs the grid",
    minutes: 12,
    module: "m01",
    hook: "Kuwait's power cuts in 2024 and 2025 happened on hot summer afternoons, and the ministry's case for solar and batteries rests on the shape of that daily load curve. When someone in a meeting says \"solar covers the peak\", you need to know which peak, at what hour.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of a restaurant kitchen sized for the busiest dinner of the year. On that night every burner runs; most other nights half of them sit cold. The kitchen is built for the **peak**, but it earns money from the **average** number of meals.

Kuwait's grid is that kitchen, and air conditioning is the dinner rush: a tall summer afternoon peak, much lower demand in winter. Every power station, line and transformer built just for the last gigawatt of summer peak may run only a few hundred hours a year.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

- **The daily summer curve.** Demand climbs through the morning as buildings heat up, peaks in the hottest hours of the afternoon, and **stays high into the evening** as people come home and walls release the day's heat.
- **The year.** Summer (July and August) sets the peak. Winter demand is much lower (Track 0 uses roughly half the summer peak as an **illustrative** value; no official figure yet).
- **Load factor** = average demand ÷ peak demand. Kuwait's is low, around **0.5 to 0.55** on Track 0's illustrative annual energy, versus about 0.6 to 0.7 in temperate systems. Low load factor means a lot of expensive capacity that rarely runs.
- **PV fits the afternoon.** Solar output is high from late morning to mid-afternoon, right in the stress window. That is Kuwait's biggest solar advantage.
- **The catch: net load and the duck curve.** The thermal fleet must cover **net load** = demand minus solar. As PV grows, the afternoon is covered but the **net peak moves to the evening**, after sunset, with a steep ramp up as solar fades. Plotted, net load looks like a duck: a sagging midday belly (deepest in winter, when demand is low) and a rising evening neck.

Track 0's illustrative summer day with 3 GW of tracking PV:

| Hour | Load (GW) | PV (GW) | Net load (GW) |
|---|---|---|---|
| 12:00 | 16.8 | 2.85 | 13.95 |
| 15:00 | 17.5 | 2.25 | 15.25 |
| 18:00 | 17.0 | 0.45 | 16.55 |
| 20:00 | 16.3 | 0.0 | 16.30 |

The gross peak was 17.5 GW at 15:00; the net peak is 16.55 GW at 18:00. Three GW of PV cut the peak the thermal fleet must meet by only 0.95 GW (about 32 %), and each extra GW of PV helps the peak less. That is why **batteries** (charge from midday PV, discharge into the evening) and other evening supply matter.`,
      },
      { kind: "widget", widget: "load-curve", props: { season: "summer", pvMW: 3000 }, caption: "Summer with 3 GW of PV: the net-load peak slides to the evening. Switch to winter and raise PV to see the midday belly, when thermal units are pushed toward their minimum output." },
      {
        kind: "callout",
        tone: "kuwait",
        title: "Numbers you will hear",
        md: md`- **Summer peak about 17.6 GW**: MEWRE figures **17,640 MW (2024), 17,610 MW (2025), 17,540 MW (2026)**. MEES reported a **17.71 GW** record in July 2025 (different measurement basis, so the two do not quite agree).
- **Growth**: new connections added about **1 GW of load a year** (1,059 MW 2024 to 2025; 1,019 MW 2025 to 2026); conservation measures held the measured peak flat.
- **Supply**: about **21 GW installed** but only about **17 GW reliably available** at peak (Rystad via Invezz). In May 2025 the public was asked to cut use between **11:00 and 17:00**.
- **Storage**: MEWRE plans **1 to 1.5 GW / 4 to 6 GWh** of BESS (announced November 2025), tied to the PV programme.
- **Unverified**: winter peak, minimum load, annual energy (Track 0 uses an illustrative 80 to 84 TWh) and the exact peak hour. Get the MEWRE Statistical Yearbook before quoting them.`,
      },
    ],
    say: [
      "How many MW does this plant firmly deliver at the peak hour, not how many MWp is it?",
      "When is the net peak now, and where does it move once Shagaya Phase III is online?",
      "Is the 17.6 GW figure MEWRE's or MEES's, and on what basis: net or gross, instantaneous or hourly?",
      "Is the battery sized to cover the evening ramp after sunset, and for how many hours?",
    ],
    trap: "Assuming PV's share of the peak equals its nameplate. PV output at the exact peak hour is below nameplate (heat, sun angle, dust), and as PV grows the net peak moves into the evening, when solar gives almost nothing. In Track 0's example 3 GW of PV reduces the peak the thermal fleet must meet by under 1 GW.",
    check: [
      {
        id: "x-load-curve-kuwait-c1",
        type: "numeric",
        prompt: md`Using Track 0's illustrative figures, Kuwait's peak is 17.5 GW and annual energy is 84 TWh. What is the annual load factor, in %?`,
        answer: 54.8,
        tolerance: { abs: 1 },
        unit: "%",
        explanation: md`Average demand $= 84{,}000{,}000\ \text{MWh}/8{,}760\ \text{h} \approx 9{,}590$ MW. Load factor $= 9{,}590/17{,}500 \approx 0.55$, i.e. about 55 %. The 84 TWh is illustrative, not an official figure.`,
        concepts: ["m01.load-factor-diversity"],
        difficulty: 2,
      },
      {
        id: "x-load-curve-kuwait-c2",
        type: "mcq",
        prompt: md`What mainly drives Kuwait's annual peak demand?`,
        options: [
          "Air conditioning on hot summer afternoons, with demand staying high into the evening",
          "Industrial load on winter mornings",
          "Street lighting at night",
          "Desalination plants in spring",
        ],
        answer: 0,
        explanation: md`Kuwait is a summer-peaking, air-conditioning-driven system: peak in July and August afternoons (about 17.6 GW per MEWRE 2024 to 2026), much lower in winter.`,
        concepts: ["m01.load-curve-kuwait"],
        difficulty: 1,
      },
      {
        id: "x-load-curve-kuwait-c3",
        type: "numeric",
        prompt: md`In Track 0's illustrative summer day, the gross peak is 17.5 GW at 15:00. With 3 GW of PV, the net peak becomes 16.55 GW at 18:00. By how many GW did PV reduce the peak the thermal fleet must meet?`,
        answer: 0.95,
        tolerance: { abs: 0.02 },
        unit: "GW",
        explanation: md`$17.5 - 16.55 = 0.95$ GW, only about 32 % of the 3 GW installed. The net peak moved to 18:00, when PV produces little. This is the case for evening supply such as batteries.`,
        concepts: ["m01.net-load-duck"],
        difficulty: 1,
      },
    ],
    deeper: ["m01-l05", "m00-l01"],
  },
];
