import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m02-l02",
  title: "Cell physics & I-V curves",
  summary:
    "How a silicon cell turns photons into current, the single-diode model, the I-V curve's key points, why heat is the enemy in Kuwait, and how mismatch, bypass diodes and partial shading change the curve.",
  minutes: 80,
  objectives: [
    "Explain photocurrent generation in a p-n junction and map it onto the single-diode equivalent circuit",
    "Read Isc, Voc, MPP, fill factor and efficiency off an I-V curve and from a datasheet",
    "Predict the effect of irradiance and temperature on current, voltage and power using temperature coefficients",
    "Estimate cell temperature with the NOCT and Faiman models and quantify the power loss at 50 °C ambient",
    "Explain mismatch, bypass-diode operation and partial-shading signatures on field I-V curves",
  ],
  concepts: [
    {
      id: "m02.single-diode-model",
      name: "Single-diode model",
      description: "Photocurrent source, diode, series and shunt resistance: the five-parameter equivalent circuit of a PV cell/module.",
      competency: "solar",
      related: ["m02.iv-parameters"],
    },
    {
      id: "m02.iv-parameters",
      name: "I-V curve parameters",
      description: "Isc, Voc, Imp, Vmp, Pmp, fill factor and efficiency; how they shift with irradiance.",
      competency: "solar",
      related: ["m02.temperature-coefficient", "m02.commissioning-tests"],
    },
    {
      id: "m02.temperature-coefficient",
      name: "Temperature coefficients",
      description: "The fractional change in Pmp, Voc and Isc per °C; the dominant loss driver in hot climates.",
      competency: "solar",
      related: ["m02.cell-temperature", "m02.string-sizing", "m02.cell-technologies"],
    },
    {
      id: "m02.cell-temperature",
      name: "Cell temperature models",
      description: "NOCT and Faiman/PVsyst U-value models that predict operating cell temperature from irradiance, ambient and wind.",
      competency: "solar",
      related: ["m02.temperature-coefficient", "m02.loss-tree"],
    },
    {
      id: "m02.mismatch-bypass",
      name: "Mismatch, bypass diodes & partial shading",
      description: "Why series-connected cells are limited by the weakest, how bypass diodes protect against hot spots, and the stepped I-V curve.",
      competency: "solar",
      related: ["m02.iv-parameters", "m02.commissioning-tests"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "From photon to current: the p-n junction",
      blocks: [
        {
          kind: "md",
          md: md`A silicon solar cell is a large-area diode. Crystalline silicon has a **band gap** of 1.12 eV. A photon with more energy than that (wavelength below ≈ 1,100 nm) can lift an electron from the valence band to the conduction band, leaving a **hole**. Energy above the gap is lost as heat almost immediately (thermalisation); photons below the gap pass through. Those two effects alone cap single-junction silicon at ≈ 29–33 % (the Shockley–Queisser / detailed-balance limit); commercial cells are at ≈ 23–26 %.

Generated carriers must be **separated** before they recombine. That is the job of the **p-n junction**: a boron-doped (p-type) region meets a phosphorus-doped (n-type) region, and the diffusion of carriers across the interface leaves a **depletion region** with a built-in electric field. Electrons are swept to the n side, holes to the p side. Connect an external load and that separated charge flows as **photocurrent** $I_{ph}$ — proportional to the photon flux, i.e. to irradiance.

But the junction is still a diode. As voltage builds across the cell, the diode starts to conduct *forward* current internally, which subtracts from the photocurrent. At open circuit, all photocurrent recombines internally through the diode; that balance point is $V_{oc}$.

Modern cell architectures differ in how well they suppress **recombination** at the surfaces and contacts — which is what raises $V_{oc}$, efficiency and lowers the temperature coefficient:

- **PERC** (passivated emitter and rear cell, p-type): passivated rear with local contacts.
- **TOPCon** (tunnel-oxide passivated contact, n-type): ultra-thin oxide + doped poly-Si rear contact, full-area passivation.
- **HJT** (heterojunction, n-type): thin amorphous-silicon layers on both sides of a crystalline wafer — excellent passivation, highest $V_{oc}$.

We return to these in lesson 3; here the point is the physics: **better passivation → higher Voc → smaller temperature coefficient**.`,
        },
      ],
    },
    {
      layer: "theory",
      title: "The single-diode model and the I-V curve",
      blocks: [
        {
          kind: "md",
          md: md`Represent the cell as: a current source $I_{ph}$ (light), in parallel with a diode (recombination), a **shunt resistance** $R_{sh}$ (leakage paths: edge defects, cracks), all feeding the terminals through a **series resistance** $R_s$ (fingers, busbars, ribbons, contacts). Kirchhoff's current law at the internal node gives:`,
        },
        { kind: "equation", formula: "pv-single-diode" },
        {
          kind: "md",
          md: md`Implicit in $I$ (it appears on both sides), so it is solved numerically — this is what PVsyst does every hour using parameters fitted from the module's datasheet (the **.PAN file**).

### The key points on the curve

- **Short-circuit current** $I_{sc}$ ($V = 0$): ≈ $I_{ph}$. Directly proportional to irradiance.
- **Open-circuit voltage** $V_{oc}$ ($I = 0$): from the diode term, $V_{oc} \approx n N_s V_T \ln(I_{ph}/I_0)$. Grows only *logarithmically* with irradiance (still ≈ 95 % of STC value at 200 W/m²) but falls *linearly and strongly* with temperature, because $I_0$ roughly doubles every ~8–10 K.
- **Maximum power point** $(V_{mp}, I_{mp})$: where $d(IV)/dV = 0$. Typically $V_{mp} \approx 0.80$–$0.84\,V_{oc}$ and $I_{mp} \approx 0.94$–$0.96\,I_{sc}$.

Two derived figures of merit:`,
        },
        { kind: "equation", formula: "pv-fill-factor" },
        { kind: "equation", formula: "pv-module-efficiency" },
        { kind: "diagram", diagram: "iv-curve", caption: "I-V curve with Isc, Voc, MPP, Imp and Vmp marked. The rectangle Vmp × Imp is the maximum power; FF is its ratio to Voc × Isc." },
        {
          kind: "md",
          md: md`**Reading resistances off the curve.** The slope near $I_{sc}$ is $\approx -1/R_{sh}$ — a sagging flat part means low shunt resistance (leakage, PID, cracked cells). The slope near $V_{oc}$ is $\approx -1/R_s$ — a lazy knee means high series resistance (corroded contacts, broken ribbons, bad connectors). This is exactly what an I-V curve tracer shows the commissioning engineer (lesson 7).`,
        },
        {
          kind: "widget",
          widget: "iv-curve",
          props: { irradiance: 1000, temperature: 25 },
          caption: "Single-diode I-V and P-V curves. Drop irradiance to 500 W/m²: current halves, voltage barely moves. Then raise temperature to 70 °C at 1000 W/m²: voltage collapses and Pmp falls ~13–16 %.",
        },
      ],
    },
    {
      layer: "theory",
      title: "Heat: temperature coefficients and cell temperature",
      blocks: [
        {
          kind: "md",
          md: md`Datasheets give three coefficients, measured per IEC 60891 / 60904:

| Coefficient | PERC (p-type) | TOPCon (n-type) | HJT (n-type) | Physics |
|---|---|---|---|---|
| $\gamma$ (Pmp) | −0.34 to −0.37 %/°C | −0.29 to −0.32 %/°C | −0.24 to −0.26 %/°C | Mostly from Voc |
| $\beta_{V_{oc}}$ | −0.27 to −0.29 %/°C | −0.24 to −0.26 %/°C | −0.22 to −0.24 %/°C | $I_0$ rises with T |
| $\alpha_{I_{sc}}$ | +0.04 to +0.05 %/°C | +0.04 to +0.05 %/°C | +0.03 to +0.04 %/°C | Band gap narrows |

The power model used in hand calculations:`,
        },
        { kind: "equation", formula: "pv-temp-power" },
        { kind: "equation", formula: "pv-voc-temp" },
        {
          kind: "md",
          md: md`### How hot does the cell get?

Steady-state energy balance: absorbed irradiance (minus the part converted to electricity) = heat lost by convection and radiation. Lumping the losses into a heat-transfer coefficient gives the two models in use.

**NOCT model** — uses the datasheet NOCT (cell temperature at 800 W/m², 20 °C ambient, 1 m/s wind, open rack):`,
        },
        { kind: "equation", formula: "pv-cell-temp-noct" },
        {
          kind: "md",
          md: md`**Faiman model** — separates still-air and wind-driven heat loss; PVsyst's thermal model has the same form ($U_c + U_v v$):`,
        },
        { kind: "equation", formula: "pv-cell-temp-faiman" },
        {
          kind: "md",
          md: md`At 50 °C ambient and ~950 W/m² POA:

| Model / assumption | Cell temperature |
|---|---|
| NOCT 45 °C (wind-blind) | ≈ 80 °C |
| Faiman $U_0 = 25$, $U_1 = 6.84$, wind 3 m/s | ≈ 71 °C |
| PVsyst default $U_c = 29$, $U_v = 0$ (absorptance 0.9, efficiency 20 %) | ≈ 74 °C |

So the realistic summer-afternoon window in Kuwait is **cell ≈ 70–75 °C**, with 80 °C+ in still air or on poorly ventilated structures. That is 45–50 K above STC: a PERC module loses ≈ 16–18 % of its power to heat alone; HJT ≈ 11–12 %.`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why the temperature coefficient is worth real money in Kuwait",
          md: md`Annual-energy-weighted cell temperature at a Kuwait tracker plant is roughly 45–50 °C (most energy is produced in hot months). The difference between $\gamma = -0.35$ and $-0.29$ %/°C over ~23 K weighted excess is ≈ 1.4 % of annual energy — on a 1.1 GW plant at ~2,100 kWh/kWp that is ~30 GWh/yr, every year for 30 years. It is why n-type modules dominate Gulf tenders and why IEC TS 63126 (high-temperature qualification) is worth specifying.`,
        },
      ],
    },
    {
      layer: "theory",
      title: "Mismatch, bypass diodes and partial shading",
      blocks: [
        {
          kind: "md",
          md: md`In a string, cells and modules are in **series**: the same current flows through all of them. If one cell produces less current (shaded, soiled, cracked, lower-binned), the string current is pulled toward its current — or, if the string is forced to carry more, the weak cell is driven into **reverse bias** and *dissipates* power as heat instead of producing it. That is a **hot spot**: it can reach well over 100 °C, discolour the encapsulant, burn the backsheet or crack glass.

**Bypass diodes** limit this. A typical 144-half-cell module has three diodes in the junction box, each across one-third of the cells (a "substring"). When a substring can no longer carry the string current, its reverse voltage turns its diode on, and current bypasses it. The substring's voltage contribution (≈ 1/3 of the module Voc) is lost, but the heat is contained.

**Signature on an I-V curve:** a **step** (or several). The string I-V shows a lower-current plateau at high voltage and the full current at low voltage; the P-V curve has **multiple local maxima**. An inverter MPPT that only searches locally can get stuck on the wrong peak — modern central and string inverters run periodic global sweeps for that reason.

**Mismatch loss** even without shading: modules are binned by power (e.g. 0/+5 W positive tolerance), but $I_{mp}$ and $V_{mp}$ still differ slightly. Typical PVsyst assumption: 0.5–1.0 % module mismatch, plus 0.1–0.3 % string voltage mismatch. Uneven soiling (heavier on the bottom edge of portrait modules where dust settles) and uneven rear irradiance on bifacials increase it.

**Half-cut cells** halve the current per cell string, cutting $I^2R$ loss by ~75 % per cell and making the module more shade-tolerant (top and bottom halves work in parallel).`,
        },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "Datasheet to desert: worked calculations",
      blocks: [
        {
          kind: "md",
          md: md`Reference module used across this module (representative 2025 n-type TOPCon, 144 half-cells, bifacial glass-glass — illustrative values, not a specific product):

| Parameter | Value |
|---|---|
| $P_{mp}$ (STC) | 580 W |
| $V_{oc}$ / $I_{sc}$ | 51.6 V / 14.20 A |
| $V_{mp}$ / $I_{mp}$ | 42.6 V / 13.62 A |
| Dimensions | 2,278 × 1,134 mm (2.583 m²) |
| $\gamma$ / $\beta_{V_{oc}}$ / $\beta_{V_{mp}}$ | −0.29 / −0.25 / −0.29 %/°C |
| NOCT | 45 °C |
| Bifaciality | 0.80 |`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Cell temperature and power at 50 °C ambient",
          given: md`Ambient $T_a = 50$ °C, POA $G = 950$ W/m², wind $v = 3$ m/s. Faiman $U_0 = 25$, $U_1 = 6.84$. Reference module above. Compare with a PERC module of the same STC rating and $\gamma = -0.35$ %/°C.`,
          steps: [
            { md: md`**FF and efficiency (sanity check)**: $FF = 580/(51.6 \times 14.20) = 0.792$; $\eta = 580/(1000 \times 2.583) = 22.5\,\%$. Both plausible for TOPCon.` },
            { md: md`**Cell temperature (Faiman)**: $T_c = 50 + \frac{950}{25 + 6.84 \times 3} = 50 + \frac{950}{45.52} = 50 + 20.9 = 70.9$ °C.` },
            { md: md`**Cross-check (NOCT)**: $T_c = 50 + \frac{45 - 20}{800} \times 950 = 50 + 29.7 = 79.7$ °C — the wind-blind model is ~9 K hotter. Use it as an upper bound.` },
            { md: md`**Temperature factor (TOPCon)**: $1 + (-0.0029)(70.9 - 25) = 1 - 0.133 = 0.867$.` },
            { md: md`**Power (TOPCon)**: $P = 580 \times 0.95 \times 0.867 = 477.7$ W.` },
            { md: md`**Power (PERC)**: factor $1 - 0.0035 \times 45.9 = 0.839$; $P = 580 \times 0.95 \times 0.839 = 462.5$ W.` },
          ],
          result: md`Cell ≈ 71 °C; TOPCon delivers ≈ 478 W, PERC ≈ 463 W — a 3.3 % advantage at this hour from the coefficient alone. Note the module is producing only 82 % of nameplate in full sun because of heat — the "summer derate" every Kuwait PV plant shows.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "HJT vs PERC at 72 °C cell temperature",
          given: md`Cell temperature 72 °C. HJT $\gamma = -0.24$ %/°C; PERC $\gamma = -0.35$ %/°C. Both 580 W at STC, same irradiance.`,
          steps: [
            {
              md: md`**HJT temperature factor**: $1 - 0.0024 \times (72 - 25) = 1 - 0.1128 = 0.887$.`,
              hidden: true,
              check: { prompt: "HJT temperature factor", answer: 0.8872, tolerance: { abs: 0.003 } },
            },
            { md: md`**PERC temperature factor**: $1 - 0.0035 \times 47 = 0.8355$.` },
            {
              md: md`**Relative HJT advantage**: $0.8872/0.8355 - 1 = 6.2\,\%$ at this operating point.`,
              hidden: true,
              check: { prompt: "HJT advantage over PERC (%)", answer: 6.19, unit: "%", tolerance: { abs: 0.2 } },
            },
          ],
          result: md`≈ 6 % more power at peak summer conditions. On an annual-energy-weighted basis the gain is smaller (≈ 2–3 %), because many hours are cooler. Always ask for the annual figure from PVsyst, not the peak-hour one, when bidders compare technologies.`,
        },
        {
          kind: "question",
          question: {
            id: "m02-l02-p1",
            type: "numeric",
            prompt: md`Independent problem. The reference TOPCon module (580 W, $\gamma = -0.29$ %/°C) operates at $T_a = 45$ °C, POA 800 W/m², wind 1 m/s. Using Faiman ($U_0 = 25$, $U_1 = 6.84$), what DC power does it produce?`,
            answer: 403.3,
            tolerance: { rel: 0.01 },
            unit: "W",
            explanation: md`$T_c = 45 + 800/(25 + 6.84) = 45 + 25.1 = 70.1$ °C. Factor $= 1 - 0.0029 \times 45.1 = 0.869$. $P = 580 \times 0.8 \times 0.869 = 403.3$ W. Low wind made the cell as hot as the 50 °C/3 m/s case — wind matters as much as ambient.`,
            concepts: ["m02.cell-temperature", "m02.temperature-coefficient"],
            difficulty: 2,
          },
        },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "Where cell physics shows up on a project",
      blocks: [
        {
          kind: "md",
          md: md`As PM you will not solve the diode equation, but cell physics appears in four places:

1. **The PAN file.** The bidder's yield model uses a PVsyst .PAN file for the module. It encodes the single-diode parameters, low-light performance, temperature coefficients and IAM. PAN files should come from the manufacturer *and* be validated by an independent lab (e.g. Kiwa PVEL PAN file testing per IEC 61853-1 measurements). An optimistic low-light or $R_{sh}$ setting can add 1–2 % yield on paper.
2. **The thermal model.** The U-values in PVsyst. Defaults are $U_c = 29$ W/m²K for free-standing arrays; some reports use higher values (cooler cells) with a weak justification such as "trackers are well ventilated". Ask for evidence (measured module temperature at a comparable desert site).
3. **Factory flash test and EL** (lesson 7). Every module is flash-tested (I-V at simulated STC) and EL-imaged at the factory. The flash data file (serial number, Pmp, Isc, Voc, FF) is a deliverable you should demand — it enables string-level mismatch sorting and later warranty claims.
4. **Commissioning I-V tracing** (lesson 7). The field curve is translated to STC and compared with the flash data. Steps mean shading or failed bypass diodes; a sagging slope means shunting/PID; a lazy knee means series resistance.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Datasheet coefficient ≠ field behaviour**: a −0.29 %/°C claim measured on one sample; batch-to-batch variation is not tested. Specify third-party verification on samples from the actual production lot.
- **Bypass diode failures**: diodes run hot in a junction box baking at 80 °C+; a shorted diode silently removes one-third of a module's voltage, an open diode turns the next shading event into a hot spot. IR thermography finds both.
- **Hot spots from bird droppings and sand drifts** on the bottom row of cells — common in desert plants with infrequent cleaning.
- **Thermal model inflation** in the yield report, as above.`,
        },
        {
          kind: "checklist",
          title: "PM checks on module electrical data",
          items: [
            "PAN file supplied by the OEM and independently validated (lab report attached)",
            "Temperature coefficients on the datasheet match the PAN file and the IEC 61215 test report",
            "PVsyst thermal U-values stated and justified; sensitivity shown for U_c ± 3 W/m²K",
            "Junction box and bypass diode rating checked for high-temperature operation (IEC 62790 / IEC TS 63126 context)",
            "Flash-test data (per serial number) is a contract deliverable",
            "Binning tolerance is positive-only (e.g. 0/+5 W)",
          ],
        },
        {
          kind: "ask",
          title: "Ask the EPC / module supplier",
          items: [
            "What is the measured γ on samples from our production lot, and which lab measured it?",
            "What thermal U-values are in your PVsyst model, and what measured data supports them in a 50 °C desert?",
            "What is the junction box's maximum rated temperature, and what are the bypass diode junction temperatures at 1.25 × Isc and 75 °C ambient-to-box?",
            "Will you provide flash-test and EL data per serial number in a machine-readable format?",
          ],
        },
        { kind: "scenario", scenario: "m02-s2" },
        {
          kind: "feynman",
          prompt: "Explain to a non-engineer manager why a solar plant in Kuwait produces less power at 2 pm in July than at 11 am in March, even though the sun is stronger in July.",
          keyPoints: [
            "Cell voltage falls as temperature rises (diode saturation current increases)",
            "Power falls by the temperature coefficient, about 0.3 % per °C",
            "July cells run around 70–75 °C versus maybe 45–50 °C in March",
            "Irradiance gain is smaller than the temperature loss at those hours",
            "Low-coefficient (n-type) modules reduce the effect",
          ],
        },
        { kind: "sources", refs: ["faiman-2008", "sandia-pvpmc", "pvsyst-help", "iec-60891", "iec-ts-63126"] },
      ],
    },
  ],
  quiz: [
    {
      id: "m02-l02-q1",
      type: "label",
      prompt: md`Label the marked points on the I-V curve.`,
      diagram: "iv-curve",
      markers: [
        { id: "isc", answer: "Short-circuit current" },
        { id: "voc", answer: "Open-circuit voltage" },
        { id: "mpp", answer: "Maximum power point" },
        { id: "imp", answer: "Current at MPP" },
        { id: "vmp", answer: "Voltage at MPP" },
      ],
      options: ["Short-circuit current", "Open-circuit voltage", "Maximum power point", "Current at MPP", "Voltage at MPP", "Breakdown voltage", "Shunt current"],
      explanation: md`Isc is the y-axis intercept (V = 0); Voc is the x-axis intercept (I = 0); the MPP is the knee where $V \cdot I$ is maximum, with Vmp ≈ 0.8 Voc and Imp ≈ 0.95 Isc for modern modules.`,
      concepts: ["m02.iv-parameters"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m02-l02-q2",
      type: "mcq",
      prompt: md`Irradiance falls from 1000 to 500 W/m² at constant cell temperature. What happens?`,
      options: [
        "Isc and Voc both halve",
        "Isc roughly halves; Voc drops only a few percent",
        "Voc halves; Isc stays constant",
        "Both stay constant; only FF changes",
      ],
      answer: 1,
      explanation: md`$I_{sc} \propto G$, while $V_{oc} \approx nN_sV_T\ln(I_{ph}/I_0)$ depends on the logarithm of irradiance: halving $I_{ph}$ reduces Voc by $nN_sV_T\ln 2$ ≈ 2–3 % of Voc for a 144-half-cell module.`,
      concepts: ["m02.iv-parameters", "m02.single-diode-model"],
      difficulty: 1,
    },
    {
      id: "m02-l02-q3",
      type: "numeric",
      prompt: md`A module has $V_{oc,STC} = 51.6$ V and $\beta_{V_{oc}} = -0.25$ %/°C. What is its Voc at a cell temperature of 75 °C?`,
      answer: 45.15,
      tolerance: { rel: 0.01 },
      unit: "V",
      explanation: md`$V_{oc} = 51.6 \times [1 - 0.0025 \times 50] = 51.6 \times 0.875 = 45.15$ V. The same coefficient makes Voc *rise* on cold winter mornings — the basis of string sizing (lesson 4).`,
      concepts: ["m02.temperature-coefficient"],
      difficulty: 1,
    },
    {
      id: "m02-l02-q4",
      type: "mcq",
      prompt: md`On a commissioning I-V trace, a string shows a clear **step**: full current at low voltage and about 60 % current above a certain voltage. Most likely cause?`,
      options: [
        "High series resistance in the string cable",
        "Partial shading or soiling of some cells with bypass diodes conducting",
        "Inverter MPPT malfunction",
        "Low irradiance across the whole string",
      ],
      answer: 1,
      explanation: md`A step means some substrings cannot carry full current, so their bypass diodes conduct above a certain current — classic partial shading (or a heavily soiled/cracked substring). Uniform low irradiance scales the whole curve; series resistance softens the knee without a step.`,
      concepts: ["m02.mismatch-bypass"],
      difficulty: 2,
    },
    {
      id: "m02-l02-q5",
      type: "multi",
      prompt: md`Which statements about cell temperature in Kuwait are correct? Select all.`,
      options: [
        "At 50 °C ambient and ~950 W/m², cell temperature is typically 70–75 °C",
        "The NOCT model tends to over-predict cell temperature at high irradiance because it ignores wind",
        "Cell temperature equals ambient temperature on trackers because they are ventilated",
        "Higher PVsyst U-values give cooler cells and higher yield",
      ],
      answer: [0, 1, 3],
      explanation: md`Cells sit ~20–30 K above ambient in full sun regardless of mounting; trackers help ventilation slightly but never reach ambient. Higher U = more heat loss = cooler cells — which is why inflated U-values are a yield red flag.`,
      concepts: ["m02.cell-temperature"],
      difficulty: 2,
    },
    {
      id: "m02-l02-q6",
      type: "short",
      prompt: md`Explain, using the single-diode model, why Voc falls as temperature rises.`,
      rubric: [
        "Voc set by balance of photocurrent and diode current (Voc ≈ nNsVT ln(Iph/I0))",
        "I0 (saturation current) increases strongly with temperature (intrinsic carrier concentration)",
        "The log term shrinks faster than VT grows, so Voc falls",
        "Approx −0.25 %/°C for TOPCon",
      ],
      modelAnswer: md`At open circuit all photocurrent flows through the internal diode, so $V_{oc} \approx nN_sV_T\ln(I_{ph}/I_0)$. $V_T = kT/q$ grows with temperature, but $I_0$ grows exponentially (it depends on the intrinsic carrier concentration squared, which roughly doubles every ~8–10 K). The log term shrinks faster than $V_T$ grows, so Voc falls — about −0.25 %/°C for TOPCon, −0.28 %/°C for PERC. Because Pmp ≈ FF·Voc·Isc and Isc rises only slightly, power falls too.`,
      explanation: md`The key is that $I_0$ grows exponentially with temperature while $V_T$ grows only linearly, so the logarithm in $V_{oc} \approx nN_sV_T\ln(I_{ph}/I_0)$ shrinks faster than $V_T$ rises. Voc therefore falls ≈ 0.25–0.29 %/°C, which dominates the power temperature coefficient.`,
      concepts: ["m02.single-diode-model", "m02.temperature-coefficient"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "m02-l02-f1", front: "Fill factor definition", back: md`$FF = P_{mp}/(V_{oc} I_{sc})$; ≈ 0.78–0.83 for modern modules`, concepts: ["m02.iv-parameters"] },
    { id: "m02-l02-f2", front: "Five parameters of the single-diode model", back: md`$I_{ph}$, $I_0$, $n$, $R_s$, $R_{sh}$`, concepts: ["m02.single-diode-model"] },
    { id: "m02-l02-f3", front: "Typical γ (Pmp) for PERC / TOPCon / HJT", back: "≈ −0.35 / −0.30 / −0.25 %/°C", concepts: ["m02.temperature-coefficient"] },
    { id: "m02-l02-f4", front: "Faiman cell temperature model", back: md`$T_c = T_a + G/(U_0 + U_1 v)$`, concepts: ["m02.cell-temperature"] },
    { id: "m02-l02-f5", front: "Cell temperature at 50 °C ambient, full sun (Kuwait)", back: "≈ 70–75 °C (80 °C+ in still air)", concepts: ["m02.cell-temperature"] },
    { id: "m02-l02-f6", front: "What does a bypass diode do?", back: "Conducts when its substring cannot carry string current, preventing reverse-bias hot spots at the cost of that substring's voltage.", concepts: ["m02.mismatch-bypass"] },
    { id: "m02-l02-f7", front: "I-V signature of high series resistance", back: "Soft, rounded knee near Voc; reduced FF.", concepts: ["m02.single-diode-model"] },
    { id: "m02-l02-f8", front: "I-V signature of low shunt resistance", back: "Sloping (sagging) current plateau near Isc.", concepts: ["m02.single-diode-model"] },
    { id: "m02-l02-f9", front: "How does Isc scale with irradiance?", back: "Linearly (∝ G); Voc only logarithmically.", concepts: ["m02.iv-parameters"] },
  ],
  scenarios: [
    {
      id: "m02-s2",
      title: "The cooler-than-physics yield report",
      context: md`You are reviewing, with the Owner's Engineer, the technical proposal of a PV IPP bidder. Their PVsyst report shows a thermal loss of only 4.1 % for a tracker plant at Shagaya. Similar plants in the region typically show 6–8 %.`,
      start: "a",
      concepts: ["m02.cell-temperature", "m02.temperature-coefficient"],
      nodes: {
        a: {
          md: md`Opening the report's parameter page, you find thermal loss factor $U_c = 35$ W/m²K, $U_v = 1.5$ W/m²K/(m/s). The PVsyst default for free-standing arrays is $U_c = 29$, $U_v = 0$. What is your first action?`,
          choices: [
            { text: "Ask the bidder to justify the U-values with measured module temperature data from a comparable hot desert site, and to provide a sensitivity run at the default values.", next: "b", score: 10, feedback: "Evidence plus sensitivity: you quantify the effect before deciding whether it matters." },
            { text: "Mark the report non-compliant.", next: "b", score: 3, feedback: "Premature. Non-default values are allowed if justified." },
            { text: "Ignore it; it's the bidder's risk in a tariff IPP.", next: "c", score: 2, feedback: "Partially true commercially, but MEWRE plans the grid and the BESS around this energy forecast, and the evaluation may reward unrealistic yields." },
          ],
        },
        b: {
          md: md`The sensitivity run at default U-values reduces P50 by 1.8 %. The bidder supplies data from a site in a cooler, windier coastal climate. What do you recommend to the evaluation committee?`,
          choices: [
            { text: "Record the 1.8 % as an evaluation adjustment / risk note, request a corrected report, and add a contract requirement for module-temperature monitoring to validate the thermal model during the capacity test.", score: 10, feedback: "Proportionate, documented, and it turns the issue into something measurable after COD." },
            { text: "Accept the coastal data as sufficient.", score: 3, feedback: "A coastal site is not comparable to a 50 °C inland desert." },
          ],
        },
        c: {
          md: md`After COD, the plant underperforms its P50 by ~2 % every summer. The IPP is paid per MWh, so it loses revenue — but MEWRE's summer peak plan assumed the higher output. What lesson do you record?`,
          choices: [
            { text: "Even when yield risk sits with the IPP, MEWRE must challenge yield assumptions because the offtaker plans capacity on them.", score: 8, feedback: "Correct lesson — and a good one to write into the next RFP's evaluation criteria." },
            { text: "Nothing — the IPP bears the loss.", score: 1, feedback: "The system bears the capacity shortfall at peak." },
          ],
        },
      },
    },
  ],
};

export default lesson;
