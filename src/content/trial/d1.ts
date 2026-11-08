import { md } from "../schema";
import type { Explainer } from "./schema";

/** Day 1 · Electricity from zero: voltage, current, power, DC and AC, magnetism and inductance, capacitance, reactance (Module 1). */
export const D1: Explainer[] = [
  // ------------------------------------------------------------------ 1
  {
    id: "x-voltage-current-resistance",
    day: 1,
    title: "Voltage, current and resistance: pressure, flow and the narrow pipe",
    minutes: 12,
    module: "m01",
    hook: "Every drawing, datasheet and grid study you will see at MEWRE is written in volts, amps and ohms. Get these three words solid today and everything else this week (power, AC, reactive power, transformers) is built on top of them.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of a closed loop of water pipe, completely full of water, with a pump in it. This is the one analogy we will use all day.

- The **water** is electric **charge**. It is already in the pipe everywhere; the pump does not create it, it just pushes it round.
- The **pressure difference** the pump makes between its outlet and its inlet is **voltage**.
- The **flow rate** (litres per second past any point) is **current**.
- A **narrow section of pipe** that makes it hard to push water through is **resistance**.

More pressure, more flow. A narrower pipe, less flow for the same pressure. That is the whole idea; the rest is units.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

A copper wire is full of electrons that are free to move. A battery or a generator pushes them by creating a difference in electrical "pressure" between two points.

- **Charge** is the "stuff" that moves, measured in coulombs. In wires it is carried by electrons.
- **Voltage** (V, volts) is the push: the energy each unit of charge gains or loses between **two points**. A voltage is always *between* two things (phase and neutral, a line and earth, the two ends of a cable). "The voltage at a point" only means something against an agreed reference, usually earth. Its proper name is **potential difference**.
- **Current** (I, amperes or amps, A) is the flow: how much charge passes a point each second. It is measured *through* something, at one place in the circuit.
- **Resistance** (R, ohms, Ω) is how hard a material makes that flow. Copper and aluminium are low; air, glass and plastic insulation are extremely high.

The three are tied together by **Ohm's law**:

$$V = I \times R$$

Kuwaiti homes are supplied at **240 V** (the 415/240 V low-voltage system). A heater element of 24 Ω plugged into a 240 V outlet draws $I = V/R = 240/24 = 10$ A. A 48 Ω element on the same outlet draws only 5 A.

**Where the energy goes: heat.** When current is pushed through a resistance, the electrical energy turns into heat. The heat rate is $I^2 R$: double the current and the heat goes up **four** times. That is how a kettle works, and also why cables get warm, why cables have a maximum current rating, and why the grid sends power at very high voltage (for the same power, higher voltage means less current, so far less heat lost in the lines; more on this tomorrow).

Where the water picture breaks:

- **Cut a water pipe and water pours out. Cut a wire and the current simply stops.** Electricity needs a complete loop, out and back. No closed circuit, no current.
- **Current is not used up.** The same amps that go into a heater come out of it. What gets used is energy: the charge leaves at lower "pressure" than it arrived.
- **The electrons crawl** (well under a millimetre per second in a typical wire), but the push travels through the full pipe almost instantly, which is why a lamp lights the moment you flip the switch.

**In one sentence:** voltage is the push between two points, current is the flow that push causes, and resistance decides how much flow you get for a given push.`,
      },
      {
        kind: "chart",
        chart: "line",
        title: "Current drawn from a household voltage by two heater elements",
        xKey: "v",
        xLabel: "voltage across the element (V)",
        yLabel: "current (A)",
        series: [
          { key: "r24", label: "24 Ω element" },
          { key: "r48", label: "48 Ω element" },
        ],
        data: [
          { v: 0, r24: 0, r48: 0 },
          { v: 40, r24: 1.67, r48: 0.83 },
          { v: 80, r24: 3.33, r48: 1.67 },
          { v: 120, r24: 5, r48: 2.5 },
          { v: 160, r24: 6.67, r48: 3.33 },
          { v: 200, r24: 8.33, r48: 4.17 },
          { v: 240, r24: 10, r48: 5 },
        ],
        caption: "Both lines are straight: current rises in proportion to voltage. The lower resistance (wider pipe) gets twice the current at every voltage; at 240 V that is 10 A against 5 A.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **240 V** at a Kuwaiti socket and **415 V** between phases on the low-voltage network (Track 0, lesson 3). Grid levels: **11 kV and 33 kV** distribution, **132 kV and 400 kV** transmission (1 kV = 1,000 V).
- Currents: a few amps for a laptop, **10 to 30 A** for an air conditioner or heater, hundreds to a few thousand amps in the cables and busbars of a PV plant or substation.
- Resistance of a long cable is small (fractions of an ohm), but with large currents the $I^2R$ heat is large.
- **Triple the voltage, one third the current, one ninth the heat loss** for the same power through the same wire. 400 kV against 132 kV is almost exactly this.`,
      },
    ],
    say: [
      "Between which two points is that voltage measured: line to line, or line to earth?",
      "What current does that cable carry at full output, and what is its rated current after derating for our site?",
      "Where is the heat going? That loss is I squared R, so a small increase in current costs a lot.",
      "In plain words: voltage is the push, current is the flow, resistance is what limits the flow.",
    ],
    trap: "Treating voltage and current as the same thing, or saying current 'flows through' a voltage. Voltage is measured across two points and is the cause; current is measured through one point and is the effect, and how much current you get depends on the resistance in the loop. A high voltage with nothing connected drives no current at all.",
    check: [
      {
        id: "x-voltage-current-resistance-c1",
        type: "numeric",
        prompt: md`A heater element of 48 Ω is plugged into a 240 V Kuwaiti socket. What current does it draw?`,
        answer: 5,
        tolerance: { abs: 0.05 },
        unit: "A",
        explanation: md`Ohm's law: $I = V/R = 240/48 = 5$ A. Halve the resistance (24 Ω) and the current doubles to 10 A.`,
        concepts: ["m01.phasors-impedance"],
        difficulty: 1,
      },
      {
        id: "x-voltage-current-resistance-c2",
        type: "mcq",
        prompt: md`The current in a cable doubles while its resistance stays the same. What happens to the heat produced in the cable?`,
        options: ["It doubles", "It increases four times", "It stays the same", "It halves"],
        answer: 1,
        explanation: md`Heat is $I^2R$. Doubling I multiplies the heat by $2^2 = 4$. This is why extra current, even a little, matters so much for cable and transformer ratings.`,
        concepts: ["m01.power-factor"],
        difficulty: 1,
      },
      {
        id: "x-voltage-current-resistance-c3",
        type: "mcq",
        prompt: md`Why does the grid move bulk power at 400 kV rather than at, say, 33 kV?`,
        options: [
          "For the same power, higher voltage means much less current, so far less I²R heat lost in the lines",
          "Higher voltage makes the electrons move faster, so power arrives sooner",
          "Higher voltage increases the resistance of the line, which protects it",
          "Customers need 400 kV at their sockets",
        ],
        answer: 0,
        explanation: md`Power is voltage times current, so raising the voltage lets the same power travel with less current. Losses go with the square of current, so the saving is large. Transformers then step the voltage down near the customer.`,
        concepts: ["m01.system-structure"],
        difficulty: 1,
      },
    ],
    deeper: ["m01-l02", "m01-l06"],
  },

  // ------------------------------------------------------------------ 2
  {
    id: "x-power-energy",
    day: 1,
    title: "Power and energy: MW is speed, MWh is distance",
    minutes: 12,
    module: "m01",
    hook: "Plants are sized in MW, PPAs pay per MWh, and peak demand in Kuwait is quoted in GW. Mixing the two is the single most common mistake in briefings, and the first thing a senior will catch.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

A car. Its **speed** (km/h) is how fast it is going right now. The **distance** (km) is how far it has gone. Drive at 100 km/h for 2 hours and you have covered 200 km.

- **Power** is the speed: how fast energy is being delivered *now*. Measured in **watts** (W), kW, MW, GW.
- **Energy** is the distance: how much has been delivered *in total* over some time. Measured in **watt-hours** (Wh), kWh, MWh, GWh.

In the water picture: power is how much work the flowing water is doing each second (pressure times flow); energy is the total work done over the afternoon.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**Power = voltage × current.** Push (V) times flow (I) gives the rate at which energy is delivered:

$$P = V \times I$$

The 24 Ω heater from the last explainer, at 240 V and 10 A, uses $240 \times 10 = 2{,}400$ W $= 2.4$ kW. (Check: $I^2R = 10^2 \times 24 = 2{,}400$ W, the same answer.) For AC this simple product holds for heaters; motors and other "reactive" loads need one extra factor, which comes on Day 2.

**Energy = power × time.** Run that heater for 3 hours and it uses $2.4 \times 3 = 7.2$ kWh. That is what the electricity meter counts.

The prefixes go up in steps of 1,000:

| Power (rate) | Energy (amount) |
|---|---|
| 1 kW = 1,000 W | 1 kWh = 1 kW for 1 hour |
| 1 MW = 1,000 kW | 1 MWh = 1,000 kWh |
| 1 GW = 1,000 MW | 1 GWh = 1,000 MWh; 1 TWh = 1,000 GWh |

**A 1 MW plant running flat out for 1 hour delivers 1 MWh.** For 10 hours, 10 MWh.

**Capacity vs energy.** A plant's **capacity** (MW) is the most it can deliver at once: it decides the size of cables, transformers and the grid connection. Its **energy** (MWh per year) is what it actually produces: it decides revenue and how much fuel it saves. A PV plant has a big capacity but makes nothing at night, so its yearly energy is much less than capacity × 8,760 hours.

**Capacity factor** links the two:

$$\text{CF} = \frac{\text{energy actually delivered}}{\text{capacity} \times \text{hours}}$$

A 1,100 MW PV plant at a 26 % capacity factor produces $1{,}100 \times 8{,}760 \times 0.26 \approx 2{,}505{,}000$ MWh, about 2.5 TWh, per year.

**In one sentence:** power (MW) is how fast energy flows right now, energy (MWh) is how much has flowed over time, and capacity factor tells you how hard a plant's MW are actually used.`,
      },
      { kind: "widget", widget: "capacity-factor", props: { mw: 1100, mwh: 2505360 }, caption: "A 1,100 MW PV plant producing 2.5 TWh a year: a 26 % capacity factor, about 2,280 full-load hours. Compare it with the typical ranges for wind, CSP and gas." },
      {
        kind: "md",
        md: md`### Why it matters at MEWRE

- **Tariffs are per unit of energy** (fils/kWh, or per MWh) because energy is what the buyer receives and the fuel it replaces.
- **Plants, grid connections and peak demand are in MW** because cables, transformers and generators are limited by how much they carry *at once*.
- **Delay damages** in contracts may be per MW per day; **performance guarantees** are in MWh or %. Each line of a contract tells you which one it means; read the unit before the number.`,
      },
      {
        kind: "callout",
        tone: "kuwait",
        title: "Numbers you will hear",
        md: md`- Kuwait's **summer peak demand is about 17.6 GW** (MEWRE figures: 17,640 MW in 2024, 17,610 MW in 2025, 17,540 MW in 2026; Track 0 lesson 5). That is power, at one moment on a hot afternoon.
- **Shagaya Phase III Zone 1 is about 1,100 MW (AC)**; at a 26 % capacity factor (the Track 0 worked example) that is about **2.5 TWh per year**.
- Typical capacity factors (Track 0 lesson 5): **PV in Kuwait about 19 to 32 %** (fixed tilt lower, trackers higher, AC basis), **CSP with storage 35 to 50 %**, **efficient gas combined cycle 50 to 85 %**.
- The citizen tariff is **2 fils/kWh** (Track 0 lesson 1): that is a price per unit of energy.
- One year has **8,760 hours**.`,
      },
    ],
    say: [
      "Is that figure MW or MWh? Capacity or annual energy?",
      "What capacity factor does that energy estimate assume, and on AC or DC basis?",
      "The tariff pays for MWh delivered, but the grid connection must be sized for the MW peak.",
      "Over a year, how many full-load hours is that? It should be roughly capacity factor times 8,760.",
    ],
    trap: "Saying 'MW per hour' or 'the plant produces 1,100 MW a year'. MW is already a rate, like km/h; it does not need 'per hour'. A 1,100 MW plant produces about 2.5 million MWh a year at a 26 % capacity factor, not 1,100 MW. (The only valid use of 'MW per minute' is a ramp rate: how quickly output changes.)",
    check: [
      {
        id: "x-power-energy-c1",
        type: "numeric",
        prompt: md`A 50 MW battery discharges at full power for 4 hours. How much energy does it deliver?`,
        answer: 200,
        tolerance: { abs: 1 },
        unit: "MWh",
        explanation: md`Energy = power × time = $50 \times 4 = 200$ MWh. Batteries are described by both numbers: "50 MW / 200 MWh" or "a 4-hour battery".`,
        concepts: ["m01.energy-vs-power"],
        difficulty: 1,
      },
      {
        id: "x-power-energy-c2",
        type: "numeric",
        prompt: md`A 100 MW PV plant delivers 219,000 MWh in a year (8,760 hours). What is its capacity factor?`,
        answer: 25,
        tolerance: { abs: 0.5 },
        unit: "%",
        explanation: md`$\text{CF} = 219{,}000 / (100 \times 8{,}760) = 219{,}000 / 876{,}000 = 0.25 = 25$ %. Equivalently, 2,190 full-load hours.`,
        concepts: ["m01.capacity-factor"],
        difficulty: 1,
      },
      {
        id: "x-power-energy-c3",
        type: "mcq",
        prompt: md`Which quantity should set the rating of the transformer that connects a PV plant to the grid?`,
        options: [
          "The plant's maximum output in MW (more exactly MVA), the most it carries at once",
          "The plant's annual energy in MWh",
          "The tariff in fils/kWh",
          "The capacity factor",
        ],
        answer: 0,
        explanation: md`Equipment is limited by power, the rate at any instant, not by the energy over a year. Energy decides revenue; power decides equipment size.`,
        concepts: ["m01.energy-vs-power"],
        difficulty: 1,
      },
    ],
    deeper: ["m01-l01", "m01-l05"],
  },

  // ------------------------------------------------------------------ 3
  {
    id: "x-dc-vs-ac",
    day: 1,
    title: "DC and AC: one-way flow and back-and-forth",
    minutes: 12,
    module: "m01",
    hook: "Solar modules and batteries make DC; the grid runs on AC. Every PV and BESS plant MEWRE buys is, at its heart, a machine for turning one into the other, and the plant's size is quoted on both sides.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Back to the water loop.

- **DC (direct current)**: the pump pushes steadily in one direction. Water goes round and round the same way, at a steady rate.
- **AC (alternating current)**: the pump is a piston that pushes, then pulls, then pushes again. The water sloshes forward and back in the pipe and never really "goes round" at all.

Can sloshing water do useful work? Yes. Put a paddle in the pipe that gets warm from friction, or a mechanism that is driven both ways: work is done on every stroke, forward and back. A heater does not care which way the current goes.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**DC** has a fixed polarity: one terminal is always positive. Batteries, phone chargers and **PV modules** produce DC. A single module gives a few tens of volts; modules connected in series ("strings") reach up to 1,500 V DC in a utility plant.

**AC** reverses direction regularly. In Kuwait it does so at **50 Hz**: 50 complete cycles every second, so one cycle takes **20 ms**, and the current changes direction 100 times a second. The voltage follows a smooth **sine wave**, which is what a spinning generator naturally makes.

**Why the grid uses AC: transformers.** A transformer can step AC voltage up or down with no moving parts and over 99 % efficiency, but it only works with a voltage that keeps changing (the next explainer shows why). That lets the grid generate at a convenient voltage, step up to 132 or 400 kV to send power far with little loss, then step down to 33 kV, 11 kV and finally 415/240 V for homes. Doing the same with DC needs power electronics, which is why DC is used only for special links (very long or subsea connections, called HVDC).

**Inverters** are the bridge. A PV plant's modules make DC; its **inverters** chop and shape that into 50 Hz AC synchronised with the grid. A battery plant does the same in both directions (its converter is often called a PCS, power conversion system). That is why a PV plant has two sizes: **MWp on the DC side** (modules) and **MW on the AC side** (inverters and grid connection).

**RMS: one number for a wave.** The AC voltage is constantly changing, so which number is "240 V"? It is the **RMS** (root mean square) value: the DC voltage that would heat a kettle exactly as much. The wave actually swings higher: its **peak** is $\sqrt{2} \approx 1.41$ times the RMS, so a 240 V socket peaks at $240 \times 1.414 \approx 339$ V, then swings to −339 V. Every voltage and current you will be quoted (400 kV, 33 kV, 1,500 A) is RMS unless it says otherwise.

**In one sentence:** DC pushes one way all the time, AC pushes back and forth 50 times a second, and the grid uses AC because transformers can easily change its voltage.`,
      },
      {
        kind: "chart",
        chart: "line",
        title: "240 V DC against 240 V RMS AC at 50 Hz (two cycles, 40 ms)",
        xKey: "t",
        xLabel: "time (ms)",
        yLabel: "voltage (V)",
        series: [
          { key: "dc", label: "DC, 240 V" },
          { key: "ac", label: "AC, 240 V RMS (peak 339 V)" },
        ],
        data: [
          { t: 0, dc: 240, ac: 0 }, { t: 1.25, dc: 240, ac: 130 }, { t: 2.5, dc: 240, ac: 240 }, { t: 3.75, dc: 240, ac: 314 }, { t: 5, dc: 240, ac: 339 },
          { t: 6.25, dc: 240, ac: 314 }, { t: 7.5, dc: 240, ac: 240 }, { t: 8.75, dc: 240, ac: 130 }, { t: 10, dc: 240, ac: 0 }, { t: 11.25, dc: 240, ac: -130 },
          { t: 12.5, dc: 240, ac: -240 }, { t: 13.75, dc: 240, ac: -314 }, { t: 15, dc: 240, ac: -339 }, { t: 16.25, dc: 240, ac: -314 }, { t: 17.5, dc: 240, ac: -240 },
          { t: 18.75, dc: 240, ac: -130 }, { t: 20, dc: 240, ac: 0 }, { t: 21.25, dc: 240, ac: 130 }, { t: 22.5, dc: 240, ac: 240 }, { t: 23.75, dc: 240, ac: 314 },
          { t: 25, dc: 240, ac: 339 }, { t: 26.25, dc: 240, ac: 314 }, { t: 27.5, dc: 240, ac: 240 }, { t: 28.75, dc: 240, ac: 130 }, { t: 30, dc: 240, ac: 0 },
          { t: 31.25, dc: 240, ac: -130 }, { t: 32.5, dc: 240, ac: -240 }, { t: 33.75, dc: 240, ac: -314 }, { t: 35, dc: 240, ac: -339 }, { t: 36.25, dc: 240, ac: -314 },
          { t: 37.5, dc: 240, ac: -240 }, { t: 38.75, dc: 240, ac: -130 }, { t: 40, dc: 240, ac: 0 },
        ],
        caption: "One AC cycle every 20 ms. The wave peaks at 339 V, crosses zero 100 times a second, and heats a kettle exactly as much as the flat 240 V DC line: that is what 240 V RMS means.",
      },
      {
        kind: "md",
        md: md`### Why it matters at MEWRE

- **Two sizes, one plant.** A tracker plant may have about 1,430 MWp of modules behind 1,100 MW of inverter and grid capacity (a DC/AC ratio of about 1.3; Track 0 lesson 5). PPAs and grid connections are in **AC MW**; module purchases and yield models are in **DC MWp**. Always ask which.
- **Inverters are where the plant meets the grid.** Grid-code behaviour (voltage support, frequency response, fault ride-through) is mostly inverter software and rating. Batteries connect through the same kind of converter.
- **Insulation is designed for peaks, heating for RMS.** A 240 V cable's insulation must survive 339 V every cycle, plus surges.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **50 Hz** in Kuwait (one cycle = 20 ms). Some countries, such as the USA, use 60 Hz.
- **RMS × 1.414 = peak.** 240 V RMS peaks at 339 V.
- PV strings: **up to 1,500 V DC**. Inverter AC output is typically a few hundred volts, then a transformer raises it to **33 kV** inside the plant.
- **DC/AC ratio** of a PV plant: typically **1.2 to 1.4** (MWp of modules per MW of inverter).
- Kuwait's chain: generation → **400 / 132 kV** transmission → **33 / 11 kV** distribution → **415 / 240 V** to customers (Track 0 lessons 3 and 6).`,
      },
    ],
    say: [
      "Is that capacity in MWp DC or in MW AC at the point of connection?",
      "What is the DC/AC ratio, and how much clipping does the yield model assume at the inverters?",
      "Is that voltage RMS or peak? Insulation and arresters are checked against peaks.",
      "In plain words: DC pushes one way, AC sloshes back and forth fifty times a second, and inverters turn the first into the second.",
    ],
    trap: "Thinking AC does no work because 'it just goes back and forth' and averages to zero. The current averages to zero, but the heating and the power do not: energy is delivered on every half-cycle, whichever way the current flows. That is exactly why we quote RMS values, which measure the heating effect.",
    check: [
      {
        id: "x-dc-vs-ac-c1",
        type: "numeric",
        prompt: md`A socket supplies 240 V RMS. What is the peak voltage of the wave, to the nearest volt?`,
        answer: 339,
        tolerance: { abs: 2 },
        unit: "V",
        explanation: md`Peak $= \sqrt{2} \times \text{RMS} = 1.414 \times 240 \approx 339$ V. The wave swings between +339 V and −339 V every 20 ms.`,
        concepts: ["m01.phasors-impedance"],
        difficulty: 1,
      },
      {
        id: "x-dc-vs-ac-c2",
        type: "mcq",
        prompt: md`What is the main reason power grids use AC rather than DC?`,
        options: [
          "Transformers can step AC voltage up and down simply and efficiently",
          "AC carries more energy per amp than DC",
          "PV modules and batteries produce AC",
          "AC cannot cause electric shocks",
        ],
        answer: 0,
        explanation: md`Transformers work only with a changing voltage, so AC lets the grid move between generation, transmission (132 and 400 kV) and distribution voltages cheaply. PV modules and batteries make DC and need inverters.`,
        concepts: ["m01.system-structure"],
        difficulty: 1,
      },
      {
        id: "x-dc-vs-ac-c3",
        type: "mcq",
        prompt: md`A PV plant is described as "1,430 MWp and 1,100 MW". What do the two numbers mean?`,
        options: [
          "1,430 MWp is the DC module capacity; 1,100 MW is the AC capacity of the inverters and grid connection",
          "1,430 MWp is peak summer output; 1,100 MW is winter output",
          "1,430 MWp is the AC capacity; 1,100 MW is after transformer losses",
          "They are the same quantity measured by two different consultants",
        ],
        answer: 0,
        explanation: md`Modules make DC and are rated in MWp; inverters convert to AC and limit what reaches the grid. The DC/AC ratio here is 1,430 / 1,100 = 1.3, typical for a tracker plant. Capacity factors and PPAs must say which basis they use.`,
        concepts: ["m01.capacity-factor"],
        difficulty: 1,
      },
    ],
    deeper: ["m01-l02", "m01-l05"],
  },

  // ------------------------------------------------------------------ 4
  {
    id: "x-magnetism-inductance",
    day: 1,
    title: "Magnetism and coils: current that resists change",
    minutes: 14,
    module: "m01",
    hook: "Generators, transformers, motors and overhead lines all work through magnetic fields, and Kuwait's summer load is millions of air-conditioning motors. This one idea explains why current 'lags', which is half of reactive power.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Put a **heavy water wheel** in our pipe loop, one that the water must turn as it flows past.

- When the pump starts, the wheel is hard to get moving: the flow builds up **slowly**, not instantly.
- When the pump stops, the spinning wheel **keeps pushing** water round for a while.
- Once the flow is steady, the wheel just spins along and barely gets in the way.

The wheel does not resist flow. It resists **changes** in flow. It soaks up energy while speeding up and gives it back while slowing down. A coil of wire, an **inductor**, behaves exactly like this towards current.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

Two facts of nature, both discovered in the 1800s, run the entire power system:

1. **Current makes a magnetic field.** Any wire carrying current is surrounded by a magnetic field. Wind the wire into a coil, especially around an iron core, and the field becomes strong and concentrated.
2. **A changing magnetic field makes a voltage** (Faraday's law of **induction**). If the magnetic field through a coil changes, a voltage appears across the coil. A steady field does nothing; only change counts.

Everything follows from these:

- **Generator**: a spinning magnet (driven by a turbine) sweeps its field past coils, so the field through them keeps changing and a voltage is induced. One turn of a simple two-pole machine gives one AC cycle, so it turns at 3,000 rpm to make 50 Hz.
- **Transformer**: AC in the first coil makes a constantly changing field in an iron core; that changing field induces a voltage in a second coil. More turns on the second coil, higher voltage. No moving parts, but it **needs change**, which is why it works with AC and not with steady DC.
- **Motor**: the reverse of a generator. Current in a magnetic field feels a force, and the shaft turns.

**Inductance.** A coil's own changing field induces a voltage in the coil itself that **opposes the change in current**. Try to increase the current and the coil pushes back; try to cut it and the coil pushes to keep it going (which is why switching off a big motor or transformer can draw a spark, and why breakers must handle arcs). The coil stores energy in its magnetic field and returns it. This property is **inductance** (L, henries, H).

**In AC the current lags.** AC is changing all the time, so a coil is pushing back all the time. The result: the current reaches its peak **after** the voltage. In a pure coil it lags by a quarter of a cycle (90°, 5 ms at 50 Hz). Energy flows into the field for a quarter-cycle and back out the next, so a pure coil uses **no** energy on average. Real motors are part resistance (useful work) and part coil, so their current lags by less, typically 25 to 40°.

Memory trick, first half: **ELI**. In an inductor (L), voltage (E) comes before current (I).

Where the wheel breaks: a coil's energy is stored in a magnetic field around it, not in moving mass, and that field reaches out into space. Another coil nearby can pick it up, which is the whole basis of the transformer. A water wheel has no equivalent.

**In one sentence:** current makes a magnetic field, a changing field makes a voltage, and a coil uses this to resist any change in current, so in AC its current lags behind its voltage.`,
      },
      {
        kind: "flow",
        title: "Magnetism at every step from power station to air conditioner",
        steps: [
          { label: "Generator", detail: "Turbine spins a magnet inside coils; the changing field induces 50 Hz AC" },
          { label: "Step-up transformer", detail: "Changing field in an iron core induces a higher voltage (to 132 or 400 kV)" },
          { label: "Overhead line", detail: "Current makes a field around the conductors: the line behaves like a long coil" },
          { label: "Step-down transformers", detail: "Same principle in reverse: 33 kV, 11 kV, then 415/240 V" },
          { label: "AC compressor motor", detail: "Current in a magnetic field makes force and turns the shaft; current lags voltage" },
        ],
        caption: "Every box depends on a magnetic field, and every one of them absorbs reactive power. That is why the grid as a whole draws lagging current.",
      },
      { kind: "widget", widget: "ac-power", props: { phi: 90 }, caption: "A pure coil: current peaks a quarter-cycle after voltage. Power (p = v × i) is positive half the time and negative half the time, so the net energy delivered is zero. Then pick 'AC compressor' to see a real motor." },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Motor power factor** about **0.8 to 0.9 lagging** (current lags by roughly 25 to 37°).
- **Transformers**: 400/132 kV, 132/33 kV, 33/11 kV, 11 kV/415 V in the grid; 33 kV/(a few hundred volts) at each PV inverter station. Large transformers are about **99.5 to 99.8 % efficient** (Track 0 lesson 4).
- **Generators**: a two-pole machine turns at **3,000 rpm** for 50 Hz; a four-pole machine at 1,500 rpm.
- Lag in time at 50 Hz: **90° = 5 ms**, a quarter of the 20 ms cycle.`,
      },
    ],
    say: [
      "The compressors are inductive, so they draw lagging current and absorb reactive power.",
      "Is that transformer rating at our site ambient, given it will run in 50 °C summers?",
      "In plain words: a coil resists changes in current, like a heavy wheel resists changes in speed.",
      "Who supplies the magnetising reactive power for all these motors and transformers at peak?",
    ],
    trap: "Thinking a coil 'uses up' power the way a resistor does. A pure coil stores energy in its field and hands it back every half-cycle, so it uses no energy on average. What it does cost is extra current, which heats cables and transformers and has to be supplied by someone.",
    check: [
      {
        id: "x-magnetism-inductance-c1",
        type: "mcq",
        prompt: md`Why does a transformer need AC to work?`,
        options: [
          "It works by induction, which needs a magnetic field that keeps changing, and only a changing current makes one",
          "DC is too low a voltage for transformers",
          "The iron core would rust with DC",
          "DC flows only in the second winding",
        ],
        answer: 0,
        explanation: md`Faraday's law: only a changing magnetic field induces a voltage. Steady DC makes a steady field, so nothing appears on the other winding.`,
        concepts: ["m01.transformer-ratings"],
        difficulty: 1,
      },
      {
        id: "x-magnetism-inductance-c2",
        type: "mcq",
        prompt: md`In a pure coil connected to a 50 Hz supply, how does the current relate to the voltage?`,
        options: [
          "Current lags voltage by a quarter-cycle (90°)",
          "Current leads voltage by a quarter-cycle (90°)",
          "Current is exactly in step with voltage",
          "There is no current at all",
        ],
        answer: 0,
        explanation: md`The coil opposes every change in current, so the current always trails behind. ELI: voltage (E) before current (I) in an inductor (L).`,
        concepts: ["m01.phasors-impedance"],
        difficulty: 1,
      },
      {
        id: "x-magnetism-inductance-c3",
        type: "mcq",
        prompt: md`On a summer afternoon most of Kuwait's load is air-conditioning compressors. What does that mean for the current the grid supplies?`,
        options: [
          "It lags the voltage, so the grid must supply reactive power as well as real power",
          "It leads the voltage, so the load supplies reactive power to the grid",
          "It is in phase, because motors are resistive",
          "It is DC, because compressors run at constant speed",
        ],
        answer: 0,
        explanation: md`Motors need a magnetic field, so they are inductive and draw lagging current. Their power factor is typically 0.8 to 0.9, so the grid carries 10 to 25 % more current than the real power alone would need.`,
        concepts: ["m01.power-factor"],
        difficulty: 1,
      },
    ],
    deeper: ["m01-l02", "m01-l04"],
  },

  // ------------------------------------------------------------------ 5
  {
    id: "x-capacitance",
    day: 1,
    title: "Capacitors: storing charge and resisting changes in voltage",
    minutes: 13,
    module: "m01",
    hook: "Capacitor banks correct power factor in substations, long underground cables behave like giant capacitors, and every inverter has a bank of them inside. Capacitors are the mirror image of coils, and together they make up reactive power.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Stretch a **rubber membrane** across our pipe, sealing it completely.

- Start the pump: water flows for a moment on both sides as the membrane **stretches**. No water crosses it, but water moves.
- As it stretches, it pushes back harder, until the flow stops. The stretched membrane now **holds pressure**.
- Now run the pump back and forth (AC): the membrane flexes one way, then the other, and water keeps sloshing on both sides. **Steady flow is blocked; back-and-forth flow gets through.**

A coil (the heavy wheel) resists changes in **flow**. The membrane resists changes in **pressure**: you cannot change the pressure across it instantly, because it must stretch first. That is a **capacitor**, and pressure is voltage.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

A capacitor is **two conducting plates separated by an insulator**. Put a voltage across it and electrons pile up on one plate and leave the other. The plates now hold opposite charges and an **electric field** fills the gap between them. Energy is stored in that field.

- **Capacitance** (C, farads, F) is how much charge the plates hold per volt. Bigger plates, closer together, more capacitance.
- The voltage across a capacitor **cannot jump**: it changes only as charge flows in or out. So a capacitor **resists changes in voltage**, the mirror image of a coil resisting changes in current.
- **DC is blocked** once the plates are charged. **AC passes**, because the plates keep charging one way, then the other.

**In AC the current leads.** Current flows most when the voltage is changing fastest (as it crosses zero) and stops when the voltage peaks (the plates are full). So the current peaks **before** the voltage, by a quarter-cycle (90°) in a pure capacitor. Like a coil, it borrows energy for a quarter-cycle and returns it the next, using none on average.

Memory trick, second half: **ICE**. In a capacitor (C), current (I) comes before voltage (E). Together: **ELI the ICE man**.

**Where capacitors show up on the job:**

- **Capacitor banks** in substations and factories. Their leading current cancels the lagging current of motors, so the grid carries less current. This is **power-factor correction**.
- **Underground cables**: the conductor and the earthed metal sheath around it are two "plates" with insulation between, kilometres long. A long cable is a big capacitor; even with no load it draws **charging current** and generates reactive power. Large PV plants with many kilometres of 33 kV cable see this at night.
- **Inverters**: a **DC link** capacitor bank inside every PV inverter and battery converter smooths the DC voltage while the electronics chop it into AC.

Where the membrane breaks: it suggests a capacitor "fills up" with extra charge. It does not. As much charge leaves one plate as arrives on the other; it stores **separated** charge, not more of it. And a word clash: engineers write charge as Q, but on Day 2 **Q means reactive power**. Context tells you which.

**In one sentence:** a capacitor is two plates with a gap that store charge in an electric field, it resists sudden changes in voltage, and in AC its current leads its voltage, the opposite of a coil.`,
      },
      { kind: "widget", widget: "ac-power", props: { phi: -90 }, caption: "A pure capacitor: current peaks a quarter-cycle before voltage. Compare with the coil (pick 'Pure coil'): the same shape shifted the other way. That is why a capacitor bank can cancel a motor's lagging current." },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Capacitor bank** sizes in substations: a few **Mvar** per step at 11 or 33 kV (for example a 4 Mvar bank in 2 × 2 Mvar steps in the Track 0 lesson 2 worked example).
- A bank's output falls with the **square of voltage**: a 10 Mvar bank at 0.92 of rated voltage gives only about **8.5 Mvar** ($0.92^2 = 0.846$), just when the grid needs support most (Track 0 lesson 2).
- **Cable charging** (typical, design-specific): roughly **1 to 2 Mvar per km** for a 132 kV cable and **around 10 Mvar per km** at 400 kV. Overhead lines have far less capacitance per km than cables.
- Inverter **DC links**: capacitor banks working at the full DC voltage (up to 1,500 V DC on modern PV plants).`,
      },
    ],
    say: [
      "How much charging reactive power do the collector cables generate at night, and who absorbs it?",
      "Are the capacitor banks switched in steps, and has a harmonic resonance study been done?",
      "Would a STATCOM or the inverters do this better than fixed capacitors, given their output falls with voltage?",
      "In plain words: a capacitor resists changes in voltage the way a coil resists changes in current, so its current leads instead of lags.",
    ],
    trap: "Treating a capacitor like a small battery that stores energy for later use. A power capacitor stores only a little energy and trades it back and forth with the grid every half-cycle; it delivers reactive power, not energy. Storing energy for the evening peak is a battery's job.",
    check: [
      {
        id: "x-capacitance-c1",
        type: "mcq",
        prompt: md`In a pure capacitor on an AC supply, when is the current largest?`,
        options: [
          "When the voltage is crossing zero, changing fastest, so current leads voltage",
          "When the voltage is at its peak, so current is in phase",
          "A quarter-cycle after the voltage peak, so current lags",
          "Never: a capacitor blocks AC",
        ],
        answer: 0,
        explanation: md`Charge flows fastest when the voltage changes fastest, which is at the zero crossing; at the peak the plates are full and current is zero. So current peaks a quarter-cycle before voltage. ICE: current (I) before voltage (E) in a capacitor (C).`,
        concepts: ["m01.phasors-impedance"],
        difficulty: 1,
      },
      {
        id: "x-capacitance-c2",
        type: "mcq",
        prompt: md`A factory full of motors installs a capacitor bank. What does the bank do?`,
        options: [
          "Its leading current cancels part of the motors' lagging current, so the supply carries less current for the same real power",
          "It stores energy in the daytime and releases it in the evening",
          "It increases the motors' real power output",
          "It converts the AC supply to DC for the motors",
        ],
        answer: 0,
        explanation: md`This is power-factor correction: the capacitor supplies locally the reactive power the motors need, so it no longer flows through the network. Current, losses and voltage drop all fall.`,
        concepts: ["m01.power-factor"],
        difficulty: 1,
      },
      {
        id: "x-capacitance-c3",
        type: "numeric",
        prompt: md`A capacitor bank is rated 10 Mvar at rated voltage. On a summer evening the voltage sags to 0.9 of rated. Roughly how many Mvar does it deliver?`,
        answer: 8.1,
        tolerance: { abs: 0.1 },
        unit: "Mvar",
        explanation: md`A capacitor's reactive output goes with the square of voltage: $10 \times 0.9^2 = 10 \times 0.81 = 8.1$ Mvar. It gives less support exactly when voltage is low, which is why grid codes increasingly rely on inverters and STATCOMs.`,
        concepts: ["m01.voltage-reactive-link"],
        difficulty: 2,
      },
    ],
    deeper: ["m01-l02"],
  },

  // ------------------------------------------------------------------ 6
  {
    id: "x-reactance-impedance",
    day: 1,
    title: "Reactance and impedance: the AC version of resistance",
    minutes: 15,
    module: "m01",
    hook: "Transformer datasheets quote impedance in %, line studies quote reactance in ohms, and grid engineers will tell you 'the line is mostly reactive'. This closes Day 1 and is the bridge to reactive power and voltage control on Day 2.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Our pipe loop now has all three things in it, driven by the back-and-forth (AC) pump:

- The **narrow pipe** (resistor) fights the flow with friction. The energy becomes heat and is gone.
- The **heavy wheel** (coil) fights every change in flow, but stores the energy and gives it back.
- The **rubber membrane** (capacitor) fights every change in pressure, and also gives the energy back.

All three limit how much water sloshes for a given pump stroke. The narrow pipe does it by **wasting** energy; the wheel and membrane do it by **borrowing** energy and returning it. In electrical terms: resistance for the first, **reactance** for the other two.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**Reactance** (X, in ohms like resistance) is how strongly a coil or capacitor opposes AC. It limits current just as resistance does, but it does not turn energy into heat: it stores it and gives it back every half-cycle.

Unlike resistance, reactance **depends on frequency**:

- **Coil**: $X_L = 2\pi f L$. Faster changes, harder push-back, so X rises with frequency. At zero frequency (DC) a coil is just a piece of wire.
- **Capacitor**: $X_C = 1/(2\pi f C)$. Faster back-and-forth, more current flows, so X falls with frequency. At DC a capacitor blocks completely.

**Impedance** (Z, ohms) is the total opposition to AC, resistance and reactance together. It is what sets the current, so Ohm's law for AC becomes $V = I \times Z$. The catch: R and X do **not** simply add, because they act a quarter-cycle apart. For a resistor and a coil in series:

$$Z = \sqrt{R^2 + X^2}$$

Example: a 30 Ω resistor in series with a coil of 40 Ω reactance has $Z = \sqrt{30^2 + 40^2} = 50$ Ω, not 70 Ω. On 240 V it draws $240/50 = 4.8$ A (the resistor alone would draw 8 A), and the current lags the voltage. A coil's reactance and a capacitor's reactance work in **opposite** directions, so in a circuit they partly cancel.

**ELI the ICE man, recap:**

| Element | Opposes | Current vs voltage | Energy |
|---|---|---|---|
| Resistor (R) | flow | in step | turned into heat |
| Coil (X_L) | change in current | lags (ELI) | stored and returned |
| Capacitor (X_C) | change in voltage | leads (ICE) | stored and returned |

**Why transmission lines are mostly reactive.** An overhead line is a long loop of conductor with a magnetic field around it: a long, thin coil. At 400 kV its reactance is typically **10 to 40 times** its resistance. So when power moves along a line, the voltage drop along it is set mostly by the **reactance** and by the reactive current flowing through it. That is the link you will meet tomorrow: **moving reactive power is what moves voltage** on the grid.

Where the water picture breaks: with water it is hard to see why the wheel and membrane should care how fast the pump strokes. With electricity they do, strongly, and that frequency dependence is what makes reactance different from resistance.

**In one sentence:** reactance is the opposition of coils and capacitors to AC, it stores energy instead of burning it and changes with frequency, and impedance is resistance and reactance combined, which sets how much current flows.`,
      },
      {
        kind: "chart",
        chart: "line",
        title: "Reactance of a 0.1 H coil and a 100 µF capacitor against frequency",
        xKey: "f",
        xLabel: "frequency (Hz)",
        yLabel: "reactance (Ω)",
        series: [
          { key: "xl", label: "Coil X_L = 2πfL" },
          { key: "xc", label: "Capacitor X_C = 1/(2πfC)" },
        ],
        data: [
          { f: 25, xl: 15.7, xc: 63.7 },
          { f: 50, xl: 31.4, xc: 31.8 },
          { f: 75, xl: 47.1, xc: 21.2 },
          { f: 100, xl: 62.8, xc: 15.9 },
          { f: 125, xl: 78.5, xc: 12.7 },
          { f: 150, xl: 94.2, xc: 10.6 },
        ],
        caption: "The coil's reactance climbs in a straight line with frequency; the capacitor's falls. These two values happen to cross near 50 Hz, where they would cancel (resonance), which is why capacitor banks need a harmonic study.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- Overhead line **reactance about 0.3 Ω per km** at 50 Hz (a Track 0 protection example uses an impedance of 0.28 Ω/km); resistance much smaller.
- **X/R of 10 to 40** on 400 kV lines (Track 0 lesson 2): mostly reactive.
- **Transformer impedance** is quoted in % of its rating, typically **8 to 14 %** for MV and HV units: almost all reactance. It limits fault current and causes voltage drop under load.
- At 50 Hz: $X_L = 314 \times L$ ohms (L in henries) and $X_C = 1/(314 \times C)$ ohms (C in farads).
- Series circuit: $Z = \sqrt{R^2 + X^2}$; 3, 4, 5 and 30, 40, 50 are the friendly examples.`,
      },
    ],
    say: [
      "What is the X/R ratio at the connection point? That tells me how much reactive power will move the voltage.",
      "Is the transformer impedance on its own MVA base, and what does it do to fault current and voltage drop?",
      "Has anyone checked for resonance between the capacitor banks or cable capacitance and the network reactance?",
      "In plain words: reactance is resistance that gives the energy back, and impedance is the total that sets the current.",
    ],
    trap: "Adding resistance and reactance as plain numbers (30 Ω + 40 Ω = 70 Ω). They act a quarter-cycle apart, so they combine like the sides of a right-angled triangle: 30 and 40 give 50 Ω. A second trap is assuming reactance is fixed: it changes with frequency, so a network that is fine at 50 Hz can resonate at a harmonic.",
    check: [
      {
        id: "x-reactance-impedance-c1",
        type: "numeric",
        prompt: md`A load has resistance 6 Ω in series with inductive reactance 8 Ω. It is connected to 240 V AC. What current flows?`,
        answer: 24,
        tolerance: { abs: 0.2 },
        unit: "A",
        explanation: md`$Z = \sqrt{6^2 + 8^2} = \sqrt{100} = 10$ Ω, so $I = V/Z = 240/10 = 24$ A. Adding 6 + 8 = 14 Ω would give a wrong 17 A.`,
        concepts: ["m01.phasors-impedance"],
        difficulty: 2,
      },
      {
        id: "x-reactance-impedance-c2",
        type: "mcq",
        prompt: md`The frequency of a supply doubles. What happens to the reactance of a coil and of a capacitor?`,
        options: [
          "The coil's reactance doubles; the capacitor's halves",
          "Both double",
          "Both halve",
          "Neither changes; reactance is fixed like resistance",
        ],
        answer: 0,
        explanation: md`$X_L = 2\pi f L$ rises in proportion to frequency; $X_C = 1/(2\pi f C)$ falls in inverse proportion. Resistance does not depend on frequency.`,
        concepts: ["m01.phasors-impedance"],
        difficulty: 1,
      },
      {
        id: "x-reactance-impedance-c3",
        type: "mcq",
        prompt: md`A 400 kV line has a reactance about 20 times its resistance. What mainly controls the voltage along it?`,
        options: [
          "The reactive power flowing through it, because the reactance dominates the voltage drop",
          "The real power alone, because only real power does work",
          "The resistance, because it turns energy into heat",
          "Nothing: line voltage is fixed by the transformers",
        ],
        answer: 0,
        explanation: md`The voltage drop is roughly $(RP + XQ)/V$. With X much larger than R, the XQ term dominates, so reactive power flow largely sets voltage on transmission lines. This is the bridge to Day 2.`,
        concepts: ["m01.voltage-reactive-link"],
        difficulty: 2,
      },
    ],
    deeper: ["m01-l02", "m01-l04"],
  },
];
