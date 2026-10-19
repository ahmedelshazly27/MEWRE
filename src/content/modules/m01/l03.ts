import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m01-l03",
  title: "Three-Phase Systems",
  summary:
    "Why the grid is three-phase, star and delta connections, the √3 between line and phase, balanced power, neutral current and unbalance — and how to sanity-check every current on a single-line diagram in your head.",
  minutes: 50,
  objectives: [
    "You can derive V_L = √3 V_ph from phasors and apply star/delta relationships correctly.",
    "You can compute line current from MW, kV and PF for any voltage level on a PV plant SLD.",
    "You can explain why balanced three-phase power is constant and why the neutral carries no current in a balanced system.",
    "You can quantify voltage unbalance and explain its effect on generators, motors and inverters.",
  ],
  concepts: [
    {
      id: "m01.three-phase-power",
      name: "Balanced three-phase power",
      description: "P = √3 V_L I_L cos φ; total instantaneous power is constant in a balanced system, which is why three-phase machines run smoothly.",
      competency: "engineering",
      related: ["m01.star-delta", "m01.complex-power"],
    },
    {
      id: "m01.star-delta",
      name: "Star (wye) and delta connections",
      description: "In star, V_L = √3 V_ph and I_L = I_ph; in delta, V_L = V_ph and I_L = √3 I_ph. Transformer vector groups (Dyn11, YNd11) combine them.",
      competency: "engineering",
      related: ["m01.transformer-ratings", "m06.substation-components"],
    },
    {
      id: "m01.neutral-unbalance",
      name: "Neutral current and unbalance",
      description: "Phasor sum of phase currents flows in the neutral; unequal phase loading or voltages create negative-sequence components that heat machines and trip inverters.",
      competency: "engineering",
      related: ["m06.power-quality"],
    },
    {
      id: "m01.current-sanity-check",
      name: "SLD current sanity checks",
      description: "Using I = S/(√3 V) and anchors (1 MVA ≈ 17.5 A at 33 kV) to verify cable, busbar, breaker and CT ratings on drawings.",
      competency: "engineering",
      related: ["m01.three-phase-power", "m06.sld-reading", "m07.cable-sizing"],
    },
  ],
  sections: [
    // ================================================================ THEORY
    {
      layer: "theory",
      title: "Three phases, 120° apart",
      blocks: [
        {
          kind: "md",
          md: md`### Why three phases?

A three-phase generator has three windings spaced 120° around the stator, producing:

$$v_a = \sqrt2 V_\text{ph}\cos\omega t,\quad v_b = \sqrt2 V_\text{ph}\cos(\omega t - 120^\circ),\quad v_c = \sqrt2 V_\text{ph}\cos(\omega t + 120^\circ)$$

Three reasons the world settled on it:

1. **Constant power.** For a balanced load, the $2\omega$ pulsating terms of the three phases cancel, so total instantaneous power is constant: $p_a + p_b + p_c = 3V_\text{ph}I_\text{ph}\cos\varphi$. Generators and motors see smooth torque — no 100 Hz vibration.
2. **Conductor economy.** Three conductors carry three times the power of one single-phase circuit that would need two conductors per phase: a three-phase three-wire circuit transmits the same power, at the same line-to-line voltage and the same losses, with 75% of the conductor material of a single-phase two-wire circuit.
3. **Rotating magnetic field.** Three-phase currents in spaced windings create a field that rotates by itself — the basis of every induction and synchronous machine.

### Star (wye) and the √3

In a **star** connection, each phase winding sits between a line and the common neutral point. The voltage between two lines is the phasor difference of two phase voltages:

$$\underline V_{ab} = V_\text{ph}\angle0^\circ - V_\text{ph}\angle{-120^\circ} = V_\text{ph}\left[1 - \left(-\tfrac12 - j\tfrac{\sqrt3}{2}\right)\right] = V_\text{ph}\left(\tfrac32 + j\tfrac{\sqrt3}{2}\right) = \sqrt3\,V_\text{ph}\angle30^\circ$$

The magnitude is $\sqrt{9/4 + 3/4} = \sqrt3$ — that is where the √3 comes from.`,
        },
        { kind: "equation", formula: "m01-line-phase-voltage" },
        {
          kind: "md",
          md: md`**Nameplate voltages are always line-to-line RMS.** "33 kV" means 33 kV between phases and 19.05 kV from each phase to earth; "400 kV" means 230.9 kV to earth. Insulation to earth, surge arresters and cable insulation ratings (e.g. 19/33 kV cable) use the phase value.

### Delta

In a **delta** connection, each winding sits directly between two lines, so $V_L = V_\text{ph}$, and each line current is the difference of two winding currents:`,
        },
        { kind: "equation", formula: "m01-delta-current" },
        {
          kind: "md",
          md: md`| | Star (Y) | Delta (D) |
|---|---|---|
| Line voltage | $\sqrt3\,V_\text{ph}$ | $V_\text{ph}$ |
| Line current | $I_\text{ph}$ | $\sqrt3\,I_\text{ph}$ |
| Neutral available | Yes (can be earthed) | No (needs earthing transformer) |
| Zero-sequence / triplen harmonics | Flow in neutral | Circulate inside the delta, do not reach the lines |
| Typical use | HV windings (solidly earthed at 400/132 kV), LV distribution (415/240 V) | MV windings of step-up and inverter transformers |

Transformer **vector groups** encode this: **YNd11** = HV star with neutral brought out (N), LV delta, LV lagging HV by 330° (the "11 o'clock" position, i.e. leads by 30°). **Dyn11** is the classic distribution transformer: MV delta, LV star with neutral. A PV plant's main 400/33 kV transformer is commonly YNd or YNyn+d (with tertiary delta); inverter step-up transformers are often Dy or Dyy (double LV winding for two inverters).

### Three-phase power`,
        },
        { kind: "equation", formula: "m01-three-phase-power" },
        { kind: "equation", formula: "m01-three-phase-apparent" },
        {
          kind: "callout",
          tone: "why",
          title: "Why φ is the phase angle, not the line angle",
          md: md`$P = \sqrt3 V_L I_L\cos\varphi$ works for star and delta because $\sqrt3 V_L I_L = 3V_\text{ph}I_\text{ph}$ in both. But φ is still the angle between a **phase** voltage and its **phase** current. The line-to-line voltage is shifted 30° from the phase voltage, so if you measure the angle between $V_{ab}$ and $I_a$ on a meter you will be 30° off. Power-quality analysers handle this; hand calculations from waveform screenshots often don't.`,
        },
        {
          kind: "md",
          md: md`**Mental anchors for SLD reviews** ($I = S/(\sqrt3 V)$, per MVA):

| Voltage | A per MVA | Example |
|---|---|---|
| 400 kV | 1.44 | 1,100 MW at PF 1 → 1,588 A |
| 132 kV | 4.37 | 250 MVA transformer → 1,093 A |
| 33 kV | 17.5 | 30 MVA feeder → 525 A |
| 11 kV | 52.5 | 10 MVA → 525 A |
| 0.8 kV (inverter LV) | 722 | 4.4 MVA → 3,175 A |
| 0.415 kV | 1,391 | 1 MVA → 1,391 A |

### Neutral current and unbalance

In a four-wire star system, the neutral returns the phasor sum of the phase currents:`,
        },
        { kind: "equation", formula: "m01-neutral-current" },
        {
          kind: "md",
          md: md`Balanced currents (equal magnitude, 120° apart) sum to zero — HV transmission needs no neutral conductor, only earth for faults. Unbalance arises from single-phase loads (Kuwaiti villas and apartments are fed at 415/240 V, with large single-phase AC units), single-phase faults, untransposed lines, or a blown fuse. Unbalance is characterised by **symmetrical components**: any three unbalanced phasors decompose into a positive-sequence set (normal rotation), a negative-sequence set (reverse rotation) and a zero-sequence set (all in phase).`,
        },
        { kind: "equation", formula: "m01-voltage-unbalance" },
        {
          kind: "md",
          md: md`Why negative sequence matters:

- **Synchronous generators and motors**: negative sequence induces 100 Hz currents in the rotor, overheating it — generators carry negative-phase-sequence (I₂) protection.
- **Induction motors**: 1% voltage unbalance can cause ~6–10% current unbalance and extra heating; NEMA recommends derating above 1%.
- **Inverters**: a 100 Hz ripple appears on the DC link; many inverters derate or trip above ~2–3% unbalance, and grid codes increasingly require them to ride through unbalanced faults and inject negative-sequence current (IEEE 2800).`,
        },
        { kind: "widget", widget: "three-phase", props: { unbalance: 0 }, caption: "Start balanced: the phasor sum is zero and line voltage is √3 × phase voltage. Increase unbalance and watch the neutral/sum phasor grow." },
        { kind: "sources", refs: ["m01-iec-60038", "m01-iec-61000-unbalance", "m01-ieee-2800"] },
      ],
    },
    // ================================================================ APPLIED
    {
      layer: "applied",
      title: "Currents on a PV plant single-line diagram",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Is this 33 kV collector cable big enough?",
          given: md`A 33 kV collector feeder in a Shagaya PV plant connects a group of inverter stations totalling 30 MW, operating at PF 0.95 (supplying reactive power). The EPC proposes a single-core 630 mm² aluminium cable circuit with a catalogue rating of 640 A (IEC 60502 reference conditions: 20 °C ground, soil thermal resistivity 1.5 K·m/W). The OE's combined derating factor for Kuwaiti desert soil (dry sand ~2.5 K·m/W, 35 °C ground temperature at burial depth, two circuits in the trench) is 0.78.`,
          steps: [
            { md: md`**Line current.** $I = \dfrac{P}{\sqrt3\,V_L\,\text{PF}} = \dfrac{30\times10^6}{\sqrt3 \times 33{,}000 \times 0.95} = 552.5$ A.` },
            { md: md`**Phase voltage** (for insulation): $33/\sqrt3 = 19.05$ kV → an 18/30(36) kV or 19/33 kV class cable is required.` },
            { md: md`**Derated ampacity.** $640 \times 0.78 = 499$ A.` },
            { md: md`**Compare.** 552.5 A > 499 A → the cable is **undersized by ~11%** at full output and PF 0.95. At unity PF the current would be 525 A — still too high.` },
          ],
          result: md`Reject as designed: either a larger conductor (e.g. 800 mm² Al), split the feeder, or improve installation (thermal backfill). Note that the reactive-power requirement (lesson 2) adds 5% current, and Kuwait soil derating can cost 20–30% of catalogue ampacity — both are routinely forgotten.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Currents either side of an inverter step-up transformer",
          given: md`An inverter station has a 4.4 MVA inverter at 800 V (line-to-line) feeding a 0.8/33 kV Dy11 step-up transformer.`,
          steps: [
            { md: md`LV line current at full apparent power: $I_\text{LV} = S/(\sqrt3\,V_\text{LV})$.` },
            {
              md: md`$I_\text{LV} = 4.4\times10^6/(\sqrt3\times800) = 3{,}175$ A.`,
              hidden: true,
              check: { prompt: "LV line current", answer: 3175, unit: "A", tolerance: { rel: 0.01 } },
            },
            {
              md: md`$I_\text{MV} = 4.4\times10^6/(\sqrt3\times33{,}000) = 77.0$ A.`,
              hidden: true,
              check: { prompt: "MV line current", answer: 77.0, unit: "A", tolerance: { rel: 0.01 } },
            },
            { md: md`Ratio check: $3{,}175/77.0 = 41.25 = 33{,}000/800$ — currents scale inversely with voltage. The MV winding is delta, so the current inside each MV winding is $77.0/\sqrt3 = 44.4$ A.` },
          ],
          result: md`≈ **3,175 A** on the LV busbar (hence heavy copper bars and low-voltage air circuit breakers rated 3,200–4,000 A) and ≈ **77 A** on the 33 kV side (a small ring main unit).`,
        },
        {
          kind: "question",
          question: {
            id: "m01-l03-p1",
            type: "numeric",
            prompt: md`A 1,100 MW PV plant exports at unity power factor over a 400 kV double-circuit line, split equally between the two circuits. What is the current in **each** circuit, in amperes?`,
            answer: 794,
            tolerance: { rel: 0.01 },
            unit: "A",
            explanation: md`Total current $I = 1{,}100\times10^6/(\sqrt3\times400{,}000) = 1{,}588$ A; each circuit carries half, **≈ 794 A**. A typical 400 kV twin- or quad-conductor circuit is rated 2,000–3,000 A or more, so thermal capacity is not the issue — voltage control, stability and N-1 security are (lesson 6).`,
            concepts: ["m01.three-phase-power", "m01.current-sanity-check"],
            difficulty: 1,
          },
        },
      ],
    },
    // ================================================================ FIELD
    {
      layer: "field",
      title: "Reading a three-phase SLD as a PM",
      blocks: [
        {
          kind: "md",
          md: md`### What to look for on the single-line diagram

An SLD draws three phases as one line. Learn the annotations:

- **Voltage levels**: 400 kV / 132 kV / 33 kV / 0.8 kV — always line-to-line.
- **Transformer data**: MVA (often ONAN/ONAF values, lesson 4), voltage ratio and tap range (e.g. 400 ± 10 × 1.25% / 33 kV), vector group (YNd11), impedance (e.g. 14%).
- **Earthing**: solid (400/132 kV neutrals), resistance or earthing transformer (33 kV — limits earth-fault current to e.g. 1,000 A), IT or TN systems at LV.
- **Switchgear ratings**: rated current (e.g. 2,500 A busbar), short-circuit rating (e.g. 31.5 kA for 3 s at 33 kV).
- **CTs and VTs**: ratios (e.g. 1,200/1 A; 33 kV/√3 : 110 V/√3) — note the √3 on VTs: they are connected phase-to-earth.
- **Cable schedules**: size, number of runs, installation method, derating factors.

Then do the "√3 check" mentally for each element: is the current rating consistent with MVA and kV? Most SLD errors a PM can catch are here.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Three common three-phase errors in submittals",
          md: md`1. **Forgetting √3** (or using it twice): a calculation sheet computes $I = P/(V\cdot\text{PF})$ with line voltage — result 73% too high — or divides phase voltage by √3 again.
2. **Using MW instead of MVA** for current and equipment ratings — understates current by the PF (5% at 0.95, plus reactive requirement).
3. **Catalogue ampacity without site derating** — Kuwaiti soil (dry sand, high ground temperature), cable grouping, and 50 °C air for above-ground cables can remove 20–35% of rating. Require the cable sizing report to show each derating factor and its basis (IEC 60287 calculation or measured soil resistivity).`,
        },
        {
          kind: "checklist",
          title: "PM checklist — three-phase quantities on drawings and reports",
          items: [
            "All voltages labelled line-to-line; insulation levels use the phase-to-earth value.",
            "Currents computed with $I = S/(\\sqrt3 V_L)$ using MVA including the reactive requirement.",
            "Cable sizing shows derating for ground temperature, soil thermal resistivity (measured on site), depth and grouping.",
            "Transformer vector groups consistent along the chain (inverter Dy → main YNd → grid) and with the grid operator's earthing philosophy.",
            "Earthing of each voltage level defined (solid, resistance, earthing transformer) and earth-fault current limits stated.",
            "Unbalance limits from the grid code applied in the power-quality study; inverter unbalance withstand confirmed.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the designer",
          items: [
            "What derating factors did you apply to the 33 kV collector cables, and was soil thermal resistivity measured on site?",
            "Show the current calculation for the largest feeder at full P and full Q at 0.9 pu voltage.",
            "What is the earthing method on the 33 kV system and the maximum earth-fault current?",
            "What voltage unbalance did you assume at the POC, and what is the inverters' unbalance withstand before derating or trip?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a colleague from a finance background where the √3 in P = √3 V I cos φ comes from, and why nameplate voltages are 'line-to-line'.",
          keyPoints: [
            "Three phase voltages are equal in size but 120° apart.",
            "The voltage between two lines is the difference of two phase voltages, which is √3 times larger and shifted 30°.",
            "Equipment is labelled with the line-to-line voltage because that is what appears between conductors.",
            "Total power is three times one phase's power, which equals √3 × line voltage × line current × PF.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m01-l03-q1",
      type: "numeric",
      prompt: md`What is the phase-to-earth voltage of a 132 kV system, in kV?`,
      answer: 76.2,
      tolerance: { abs: 0.2 },
      unit: "kV",
      explanation: md`$132/\sqrt3 = 76.2$ kV. Nameplate 132 kV is line-to-line; each conductor sits 76.2 kV RMS from earth.`,
      concepts: ["m01.star-delta"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m01-l03-q2",
      type: "numeric",
      prompt: md`A 132 kV circuit carries 500 A at PF 0.9 lagging. What active power does it carry, in MW?`,
      answer: 102.9,
      tolerance: { rel: 0.01 },
      unit: "MW",
      explanation: md`$P = \sqrt3 \times 132{,}000 \times 500 \times 0.9 = 102.9$ MW. Apparent power is 114.3 MVA.`,
      concepts: ["m01.three-phase-power"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m01-l03-q3",
      type: "numeric",
      prompt: md`An unbalanced star load draws $I_a = 100\angle0^\circ$ A, $I_b = 80\angle{-120^\circ}$ A and $I_c = 60\angle120^\circ$ A. What is the magnitude of the neutral current (A)?`,
      answer: 34.6,
      tolerance: { rel: 0.02 },
      unit: "A",
      explanation: md`Resolve: $I_b = 80(-0.5 - j0.866) = -40 - j69.3$; $I_c = 60(-0.5 + j0.866) = -30 + j52.0$. Sum: $(100 - 40 - 30) + j(-69.3 + 52.0) = 30 - j17.3$, magnitude $\sqrt{30^2 + 17.3^2} =$ **34.6 A**. Not 240 A (the arithmetic sum) and not 40 A (max minus min).`,
      concepts: ["m01.neutral-unbalance"],
      difficulty: 2,
    },
    {
      id: "m01-l03-q4",
      type: "mcq",
      prompt: md`A delta-connected transformer winding supplies a line current of 1,000 A. What current flows in each winding?`,
      options: ["1,000 A", "577 A", "1,732 A", "333 A"],
      answer: 1,
      explanation: md`In delta, $I_L = \sqrt3 I_\text{ph}$, so $I_\text{ph} = 1{,}000/\sqrt3 = 577$ A. Winding conductors are sized for this, which is one reason delta windings suit high-current LV sides.`,
      concepts: ["m01.star-delta"],
      difficulty: 1,
    },
    {
      id: "m01-l03-q5",
      type: "numeric",
      prompt: md`Measured line voltages at a 33 kV bus are 33.4, 32.6 and 33.0 kV. Using the NEMA approximation, what is the voltage unbalance in %?`,
      answer: 1.21,
      tolerance: { abs: 0.05 },
      unit: "%",
      explanation: md`Average = 33.0 kV. Maximum deviation = 0.4 kV. Unbalance = $0.4/33.0 \times 100 = 1.21\%$. Within a typical 1.4–2% planning limit, but enough to warrant derating of induction motors per NEMA guidance.`,
      concepts: ["m01.neutral-unbalance"],
      difficulty: 2,
    },
    {
      id: "m01-l03-q6",
      type: "multi",
      prompt: md`Which are genuine advantages of three-phase over single-phase AC? Select all that apply.`,
      options: [
        "Constant total instantaneous power for balanced loads.",
        "Less conductor material for the same power and losses.",
        "Naturally produces a rotating magnetic field for machines.",
        "No need for any earthing.",
        "Eliminates reactive power.",
      ],
      answer: [0, 1, 2],
      explanation: md`Constant power, conductor economy and rotating fields are the three classic reasons. Three-phase systems still need earthing for fault protection and still carry reactive power.`,
      concepts: ["m01.three-phase-power"],
      difficulty: 1,
    },
    {
      id: "m01-l03-q7",
      type: "decision",
      prompt: md`You are the PM. The EPC's cable sizing report for the 33 kV collector system uses catalogue ampacities with a single derating factor of 0.95 "for grouping", and no soil survey was done. What do you do?`,
      options: [
        { text: "Accept — the OE can check it later during construction.", score: 0, feedback: "Once cables are buried, fixing undersizing means re-trenching. Design review is the cheap moment." },
        { text: "Require a soil thermal-resistivity survey and an IEC 60287-based sizing with all derating factors (ground temperature, resistivity, depth, grouping) at full P and Q, before cable procurement.", score: 1, feedback: "Correct: in Kuwaiti dry sand, soil resistivity and ground temperature are the dominant derating factors and must be measured, not assumed." },
        { text: "Ask the EPC to upsize all cables by one size to be safe.", score: 0.4, feedback: "May be over- or under-conservative and invites a variation claim; get the calculation right first." },
      ],
      explanation: md`Cable derating in desert soils is a classic latent defect: the plant works in winter and cables overheat (and age fast) in summer. Measurement plus IEC 60287 calculation is the standard of care.`,
      concepts: ["m01.current-sanity-check"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m01-l03-f1", front: "Line vs phase voltage in star", back: md`$V_L = \sqrt3\,V_\text{ph}$, $I_L = I_\text{ph}$`, concepts: ["m01.star-delta"] },
    { id: "m01-l03-f2", front: "Line vs phase current in delta", back: md`$I_L = \sqrt3\,I_\text{ph}$, $V_L = V_\text{ph}$`, concepts: ["m01.star-delta"] },
    { id: "m01-l03-f3", front: "Three-phase active power", back: md`$P = \sqrt3\,V_L I_L\cos\varphi$`, concepts: ["m01.three-phase-power"] },
    { id: "m01-l03-f4", front: "Amps per MVA at 33 kV", back: "≈ 17.5 A", concepts: ["m01.current-sanity-check"] },
    { id: "m01-l03-f5", front: "Amps per MVA at 400 kV", back: "≈ 1.44 A", concepts: ["m01.current-sanity-check"] },
    { id: "m01-l03-f6", front: "Neutral current in a balanced three-phase system", back: "Zero — the three phasors sum to zero", concepts: ["m01.neutral-unbalance"] },
    { id: "m01-l03-f7", front: "IEC voltage unbalance definition", back: md`$V_2/V_1$ (negative- over positive-sequence)`, concepts: ["m01.neutral-unbalance"] },
    { id: "m01-l03-f8", front: "Meaning of vector group YNd11", back: "HV star with neutral out, LV delta, LV displaced 330° (leads HV by 30°)", concepts: ["m01.star-delta"] },
  ],
};

export default lesson;
