import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m01-l02",
  title: "AC Power, Reactive Power and Power Factor",
  summary:
    "Phasors, RMS and impedance; where P, Q and S come from; power factor and its correction; and why reactive capability at 50 °C is one of the most important questions you will ask a PV or BESS contractor.",
  minutes: 60,
  objectives: [
    "You can represent sinusoidal voltages and currents as RMS phasors and use impedance Z = R + jX.",
    "You can derive P, Q and S from instantaneous power and compute them for a load or a plant.",
    "You can size capacitor compensation for power-factor correction and explain why capacitor output falls with V².",
    "You can explain why grid codes demand reactive capability from inverter-based plants and check a contractor's capability at 50 °C ambient.",
  ],
  concepts: [
    {
      id: "m01.phasors-impedance",
      name: "Phasors, RMS and impedance",
      description: "Sinusoidal quantities represented by RMS magnitude and phase angle; impedance Z = R + jX relates voltage and current phasors.",
      competency: "engineering",
      related: ["m01.complex-power"],
    },
    {
      id: "m01.complex-power",
      name: "Active, reactive and apparent power",
      description: "S = VI* = P + jQ. P does work, Q oscillates between source and fields, S sets current and therefore equipment rating.",
      competency: "engineering",
      related: ["m01.power-factor", "m01.three-phase-power"],
    },
    {
      id: "m01.power-factor",
      name: "Power factor and its correction",
      description: "PF = P/S; low PF means more current, losses and voltage drop for the same MW. Corrected by capacitors, STATCOMs or inverter reactive control.",
      competency: "engineering",
      related: ["m01.reactive-capability", "m06.power-quality"],
    },
    {
      id: "m01.reactive-capability",
      name: "Reactive capability of inverter-based plants",
      description: "The P-Q envelope an IBR plant can deliver at the point of connection across voltage and ambient temperature, as required by grid codes.",
      competency: "grid",
      related: ["m01.voltage-reactive-link", "m06.reactive-capability", "m02.thermal-derating", "m06.compliance"],
    },
    {
      id: "m01.voltage-reactive-link",
      name: "Voltage–reactive power coupling",
      description: "On high-X/R networks, voltage magnitude is controlled mainly by reactive power flow (ΔV ≈ (RP + XQ)/V).",
      competency: "grid",
      related: ["m06.qv-control", "m06.load-flow"],
    },
  ],
  sections: [
    // ================================================================ THEORY
    {
      layer: "theory",
      title: "From sine waves to the power triangle",
      blocks: [
        {
          kind: "md",
          md: md`### Sinusoids, RMS and phasors

Grid voltage is a sinusoid at 50 Hz: $v(t) = V_m \cos(\omega t + \theta)$, with $\omega = 2\pi f = 314.16$ rad/s. Everything we quote — 400 kV, 33 kV, 240 V, 1,500 A — is an **RMS** value, the DC-equivalent heating value:`,
        },
        { kind: "equation", formula: "m01-rms" },
        {
          kind: "md",
          md: md`A 240 V RMS outlet peaks at $240\sqrt2 = 339$ V; a 400 kV line-to-line system peaks at about 327 kV line-to-earth. Insulation and surge arresters are coordinated against peaks; heating and ratings against RMS.

Because every voltage and current in a linear network oscillates at the same frequency, we can drop the $\cos\omega t$ and keep just the RMS magnitude and angle: the **phasor** $\underline{V} = V\angle\theta$. Differentiation becomes multiplication by $j\omega$, and Ohm's law becomes algebra with complex **impedance**:`,
        },
        { kind: "equation", formula: "m01-impedance" },
        { kind: "equation", formula: "m01-reactance" },
        {
          kind: "md",
          md: md`| Element | Current vs voltage | Reactive power |
|---|---|---|
| Resistor | In phase | 0 |
| Inductor (motors, transformers, overhead lines at high load) | Lags by 90° | Absorbs Q (+) |
| Capacitor (cables, capacitor banks, lightly loaded lines) | Leads by 90° | Supplies Q (−) |

### Where reactive power comes from: instantaneous power

Take $v = \sqrt2 V\cos\omega t$ and $i = \sqrt2 I\cos(\omega t - \varphi)$ (current lagging by $\varphi$). Their product, using $2\cos A\cos B = \cos(A-B) + \cos(A+B)$:

$$p(t) = VI\cos\varphi\,\big(1 + \cos 2\omega t\big) + VI\sin\varphi\,\sin 2\omega t$$

- The first term never goes negative and averages $VI\cos\varphi$ — this is **active power** $P$, energy actually delivered.
- The second term averages **zero**: energy flows into the magnetic/electric fields for a quarter-cycle and back out the next. Its amplitude $VI\sin\varphi$ is **reactive power** $Q$.`,
        },
        { kind: "equation", formula: "m01-pq-single-phase" },
        { kind: "equation", formula: "m01-complex-power" },
        { kind: "equation", formula: "m01-power-factor" },
        {
          kind: "callout",
          tone: "why",
          title: "Why reactive power 'costs' money even though it does no work",
          md: md`Conductors and transformers do not care about P; they heat with **current**, and current is set by $|S| = \sqrt{P^2+Q^2}$. A 33 kV cable rated 600 A can carry 34 MVA — that is 34 MW at unity PF but only 27 MW at PF 0.8. Every Mvar you move through the network displaces MW capacity, adds $I^2R$ loss and drops voltage. That is why utilities charge industrial customers for low PF, and why grid codes require generators to manage Q.`,
        },
        { kind: "diagram", diagram: "power-triangle", caption: "The power triangle: P (adjacent), Q (opposite), S (hypotenuse), angle φ. PF = cos φ." },
        { kind: "widget", widget: "power-triangle", props: { p: 8, pf: 0.78 }, caption: "Start at 8 MW, PF 0.78 (the worked example below). Move PF towards 0.95 and watch Q, S and the required capacitor change." },
        { kind: "equation", formula: "m01-i2r-loss" },
        {
          kind: "md",
          md: md`### Power-factor correction

To raise PF from $\cos\varphi_1$ to $\cos\varphi_2$ at constant $P$, supply locally the difference in reactive power:`,
        },
        { kind: "equation", formula: "m01-pf-correction" },
        { kind: "equation", formula: "m01-capacitor-q" },
        {
          kind: "md",
          md: md`Shunt capacitors are cheap but have two weaknesses: output falls with $V^2$ (worst when voltage is already low), and they switch in steps, risking resonance with network inductance (harmonic amplification, typically around the 5th–7th harmonic if poorly tuned). **STATCOMs** and **inverters** are current-limited power electronics: their Q falls only linearly with V and is continuously controllable within milliseconds.

### Reactive power controls voltage

For a branch with resistance R and reactance X carrying P and Q:`,
        },
        { kind: "equation", formula: "m01-voltage-drop" },
        {
          kind: "md",
          md: md`At 400 kV, X/R is typically 10–40. So voltage is governed overwhelmingly by **Q**: a plant exporting Mvar pushes local voltage up; absorbing Mvar pulls it down. Synchronous generators do this naturally through excitation. A PV plant does it only if its inverters are specified and controlled to — through the **power plant controller (PPC)** in voltage-control, Q-control or PF-control mode, as the grid operator instructs.

### Why grid codes care about inverter reactive capability

When renewables displace synchronous machines, the grid loses their reactive support. Grid codes therefore require IBR plants to provide reactive capability at the point of connection (POC), commonly:

- Q range equivalent to **PF 0.95 leading to 0.95 lagging at full active power** (i.e. ±0.33 P), sometimes more (±0.4 P);
- across a **voltage band** (typically 0.9–1.1 pu, with reduced requirements at the extremes);
- at **all ambient temperatures** up to the site design maximum;
- sometimes **at zero or low P** (night-time "Q at night"), and with dynamic response during faults (reactive current injection, covered in module 6).

The inverter must therefore be sized in **MVA**, not MW. Delivering 1.0 pu P and 0.33 pu Q needs $\sqrt{1 + 0.33^2} = 1.053$ pu S — plus whatever Mvar the step-up transformers and collector cables consume or generate between inverter and POC.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait grid code reactive requirements — check the actual document",
          md: md`The research brief does not contain MEWRE's renewable grid-connection code or the PPA's technical schedule. The ±0.95 PF / 0.9–1.1 pu ranges above are **typical international and GCC practice** (and reflected in IEEE 2800-2022), not confirmed MEWRE requirements. Obtain the MEWRE Transmission grid code / connection requirements and the RFP technical specification for Shagaya Zone 1 and use their exact Q-range, voltage band, reference point (POC at 400 kV) and ambient-temperature conditions.`,
        },
        { kind: "sources", refs: ["m01-ieee-2800", "m01-agbi-zone1-rfp"] },
      ],
    },
    // ================================================================ APPLIED
    {
      layer: "applied",
      title: "Sizing compensation and checking inverter MVA",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Correcting an 11 kV pumping-station load from PF 0.78 to 0.95",
          given: md`A water-pumping station on an 11 kV feeder draws P = 8 MW at PF 0.78 lagging (induction motors). Size a capacitor bank to reach PF 0.95 lagging and state the current and loss reduction.`,
          steps: [
            { md: md`**Existing apparent and reactive power.** $S_1 = P/\text{PF} = 8/0.78 = 10.26$ MVA. $\varphi_1 = \arccos 0.78 = 38.7^\circ$, $\tan\varphi_1 = 0.802$, so $Q_1 = 8 \times 0.802 = 6.42$ Mvar.` },
            { md: md`**Target.** $\tan\varphi_2 = \tan(\arccos 0.95) = 0.329$, so $Q_2 = 8 \times 0.329 = 2.63$ Mvar.` },
            { md: md`**Compensation.** $Q_C = 6.42 - 2.63 = 3.79$ Mvar → specify a 4 Mvar bank (e.g. 2 × 2 Mvar steps, detuned with series reactors against harmonic resonance).` },
            { md: md`**New apparent power.** $S_2 = 8/0.95 = 8.42$ MVA. Current falls in proportion to S: at 11 kV, from $10.26\times10^6/(\sqrt3 \times 11{,}000) = 538$ A to 442 A — an 18% reduction. (The √3 three-phase formula is derived in lesson 3.)` },
            { md: md`**Loss reduction.** Losses scale with $I^2$: $(8.42/10.26)^2 = 0.674$, i.e. feeder $I^2R$ losses fall by about **33%**.` },
          ],
          result: md`Install ≈ **3.8 Mvar** (practically a 4 Mvar stepped bank). Current falls 18%, feeder losses about 33%, and the transformer feeding the station gains ~1.8 MVA of headroom.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Inverter MVA needed for a 200 MW PV plant at 50 °C",
          given: md`A 200 MW (at POC) PV plant must deliver reactive power equivalent to PF 0.95 (lagging or leading) at full active power. At full load the MV/HV transformers and collector cables absorb a further 18 Mvar, and electrical losses between inverters and POC are 4 MW. The chosen inverter is rated 4.6 MVA at 25 °C but only 4.2 MVA at 50 °C.`,
          steps: [
            { md: md`Reactive power required at POC: $Q_\text{POC} = P \tan(\arccos 0.95)$.` },
            {
              md: md`$Q_\text{POC} = 200 \times 0.3287 = 65.7$ Mvar.`,
              hidden: true,
              check: { prompt: "Reactive power at POC", answer: 65.7, unit: "Mvar", tolerance: { rel: 0.01 } },
            },
            { md: md`At the inverter terminals (lagging case, exporting Q): $P_\text{inv} = 200 + 4 = 204$ MW and $Q_\text{inv} = 65.7 + 18 = 83.7$ Mvar.` },
            {
              md: md`$S_\text{inv} = \sqrt{204^2 + 83.7^2} = 220.5$ MVA.`,
              hidden: true,
              check: { prompt: "Total inverter apparent power needed", answer: 220.5, unit: "MVA", tolerance: { rel: 0.01 } },
            },
            { md: md`Number of inverters at the **50 °C** rating: $220.5/4.2 = 52.5$ → **53 units**. Had the designer used the 25 °C rating: $220.5/4.6 = 47.9$ → 48 units — five short, and the plant would fail its reactive-capability test on a summer afternoon.` },
          ],
          result: md`About **221 MVA** of inverter capacity, i.e. 53 × 4.2 MVA units sized at 50 °C. Note the leading (absorbing) case must also be checked — at high grid voltage, inverter DC-voltage limits can restrict Q absorption.`,
        },
        {
          kind: "question",
          question: {
            id: "m01-l02-p1",
            type: "numeric",
            prompt: md`A 33 kV shunt capacitor bank is rated 10 Mvar at 33 kV. During a summer evening the bus voltage sags to 0.92 pu. How many Mvar does the bank actually deliver?`,
            answer: 8.46,
            tolerance: { rel: 0.01 },
            unit: "Mvar",
            explanation: md`$Q_C = \omega C V^2$, so $Q = 10 \times 0.92^2 = 8.46$ Mvar — a 15% shortfall exactly when voltage support is most needed. An inverter or STATCOM, being current-limited, would deliver about $10 \times 0.92 = 9.2$ Mvar at the same voltage (and can boost current briefly). This is a key reason grid codes increasingly rely on dynamic reactive sources.`,
            concepts: ["m01.power-factor", "m01.voltage-reactive-link"],
            difficulty: 2,
          },
        },
      ],
    },
    // ================================================================ FIELD
    {
      layer: "field",
      title: "Reactive power on real PV and BESS projects",
      blocks: [
        {
          kind: "md",
          md: md`### Who owns what

- **MEWRE Transmission / National Control Centre (grid operator)** — sets the reactive requirement and voltage set-points; witnesses grid-compliance tests.
- **Employer / Offtaker (MEWRE)** — the PPA technical schedule carries the grid-code obligations and the tests at COD; your job is to make sure the requirement is unambiguous (reference point, ambient, voltage band) and tested.
- **Owner's Engineer / Lenders' Technical Adviser** — reviews the reactive-power study and inverter datasheets.
- **EPC / IPP's designer** — performs the **reactive power capability study** (PowerFactory, PSS/E or ETAP), sizes inverters, decides whether a STATCOM or capacitor bank is needed.
- **Inverter OEM** (e.g. SMA, Sungrow, Huawei, Power Electronics, TMEIC) — publishes P-Q capability curves vs temperature and DC/AC voltage.

### Documents to read

1. **Inverter datasheet**: rated apparent power **and the temperature derating curve** (S vs ambient, typically flat to 35–45 °C, then falling), P-Q capability chart, operating voltage window.
2. **Reactive power capability study**: P-Q diagram at the POC at minimum, nominal and maximum grid voltage, at the design ambient (≥ 50 °C for Kuwait), with tap-changer positions stated.
3. **Single-line diagram (SLD)**: count inverters, transformer MVA ratings and impedances; check whether a STATCOM/SVC or capacitor bank appears and its rating.
4. **Grid-compliance test procedure**: how Q capability will be demonstrated (and at what temperature — tests in January prove little about July).`,
        },
        { kind: "widget", widget: "pv-sld", caption: "Trace the path from inverter to POC: every transformer absorbs Mvar (I²X), every cable generates some (charging). The POC requirement must be met after all of them." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Rated at 25 °C, tested in winter, failing in summer",
          md: md`The commonest reactive-power failure: the design used the inverter's nameplate MVA at 25–40 °C, but the inverter derates above that and the Kuwaiti container interior can exceed 55 °C in July. The plant passes its Q test at commissioning in winter and then cannot meet its reactive obligation on the summer afternoons when the grid is most stressed. Contract the requirement **at the site maximum ambient** (and specify inverter enclosure/HVAC design temperature), and require the test report to include temperature-corrected capability.`,
        },
        {
          kind: "checklist",
          title: "PM checklist — reactive power",
          items: [
            "Requirement stated at the POC (400 kV side), not at inverter terminals; Q range, voltage band and ambient temperature explicit.",
            "Inverter count × MVA at the **site design ambient (≥ 50 °C)** covers P and Q at POC plus transformer and cable Mvar.",
            "Both lagging (export Q) and leading (absorb Q) cases checked at maximum and minimum grid voltage.",
            "Night-time / zero-P reactive requirement checked (and auxiliary consumption it implies).",
            "Capacitor banks, if any, studied for harmonic resonance; STATCOM considered where dynamic support is needed.",
            "PPC control modes (V, Q, PF) and response times match grid-code requirements; tested in the compliance plan.",
            "Test procedure includes temperature correction or a summer re-test obligation.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the EPC / IPP",
          items: [
            "What is the inverter's apparent-power rating at 50 °C ambient, and at what container internal temperature? Show the OEM derating curve.",
            "Show me the P-Q capability at the POC at 0.9, 1.0 and 1.1 pu voltage with the plant at 50 °C. Where is the binding limit?",
            "How many Mvar do the step-up transformers and collector cables absorb at full load, and is that included?",
            "Do you need a STATCOM or capacitor bank? If capacitors, what harmonic study have you done?",
            "Can the plant provide reactive power at night, and what auxiliary consumption does that create?",
            "How will you demonstrate full reactive capability if commissioning happens in winter?",
          ],
        },
        { kind: "scenario", scenario: "m01-s2" },
        {
          kind: "feynman",
          prompt: "Explain to a non-engineer colleague in the PPP unit why a solar plant needs to make 'reactive power' even though nobody pays for it.",
          keyPoints: [
            "AC current has a part that delivers energy (active) and a part that just sloshes back and forth (reactive).",
            "The sloshing part still heats cables and transformers and uses up their capacity.",
            "On the high-voltage grid, reactive power flow sets the voltage; without it voltage collapses or rises out of limits.",
            "Old power stations provided it automatically; solar inverters only do so if specified and sized for it.",
            "So the grid code requires it, and the inverter must be bigger (in MVA) than the plant's MW rating, especially in Kuwait's heat.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m01-l02-q1",
      type: "label",
      prompt: md`Label the power triangle.`,
      diagram: "power-triangle",
      markers: [
        { id: "p", answer: "Active power P (MW)" },
        { id: "q", answer: "Reactive power Q (Mvar)" },
        { id: "s", answer: "Apparent power S (MVA)" },
        { id: "phi", answer: "Power-factor angle φ" },
      ],
      options: ["Active power P (MW)", "Reactive power Q (Mvar)", "Apparent power S (MVA)", "Power-factor angle φ", "Voltage V (kV)", "Impedance Z (Ω)"],
      explanation: md`P is the adjacent side (real work), Q the opposite side (oscillating energy), S the hypotenuse (sets current), and $\cos\varphi = P/S$ = power factor.`,
      concepts: ["m01.complex-power"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m01-l02-q2",
      type: "numeric",
      prompt: md`A load draws 12 MW at PF 0.8 lagging. How many Mvar of capacitors are needed to correct it to PF 0.95 lagging?`,
      answer: 5.06,
      tolerance: { rel: 0.02 },
      unit: "Mvar",
      explanation: md`$Q_1 = 12\tan(\arccos0.8) = 12 \times 0.75 = 9.0$ Mvar. $Q_2 = 12 \times 0.3287 = 3.94$ Mvar. $Q_C = 9.0 - 3.94 =$ **5.06 Mvar**. P is unchanged; only Q moves.`,
      concepts: ["m01.power-factor"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "m01-l02-q3",
      type: "mcq",
      prompt: md`Why are transformers, cables and inverters rated in MVA rather than MW?`,
      options: [
        "Because MVA is the international SI unit for power.",
        "Because their heating depends on current, which is set by apparent power S regardless of power factor.",
        "Because reactive power is always larger than active power.",
        "Because MVA includes the losses of the equipment.",
      ],
      answer: 1,
      explanation: md`At fixed voltage, current is proportional to $|S|$. Thermal limits (copper heating, semiconductor junction temperature) depend on current, so the rating must be apparent power. The same equipment supplies more MW at unity PF than at PF 0.8.`,
      concepts: ["m01.complex-power", "m01.reactive-capability"],
      difficulty: 1,
    },
    {
      id: "m01-l02-q4",
      type: "multi",
      prompt: md`Which statements about reactive power on a 400 kV network are true? Select all that apply.`,
      options: [
        "Voltage magnitude is controlled mainly by reactive power flow because X ≫ R.",
        "Exporting Mvar from a plant tends to raise voltage at its connection point.",
        "Reactive power has a non-zero average over one cycle.",
        "A lightly loaded long cable or line generates reactive power.",
        "Capacitor bank output is proportional to V.",
      ],
      answer: [0, 1, 3],
      explanation: md`$\Delta V \approx (RP + XQ)/V$ with X dominant, so Q controls voltage; exporting Q raises it. Cables and lightly loaded lines are capacitive (charging). Q averages zero over a cycle (it is the amplitude of the oscillating term). Capacitor output is proportional to $V^2$, not V.`,
      concepts: ["m01.voltage-reactive-link", "m01.complex-power"],
      difficulty: 2,
    },
    {
      id: "m01-l02-q5",
      type: "numeric",
      prompt: md`A plant must export 100 MW and 33 Mvar simultaneously at its inverter terminals. What minimum total inverter apparent-power rating is needed (MVA)?`,
      answer: 105.3,
      tolerance: { rel: 0.01 },
      unit: "MVA",
      explanation: md`$S = \sqrt{100^2 + 33^2} = \sqrt{11{,}089} = 105.3$ MVA. That 5% oversize must be available at the **site maximum ambient**, after the OEM's temperature derating.`,
      concepts: ["m01.reactive-capability", "m01.complex-power"],
      difficulty: 1,
    },
    {
      id: "m01-l02-q6",
      type: "decision",
      prompt: md`You are the PM. The EPC's grid-compliance test plan for a 300 MW PV plant schedules the reactive-capability test for February. The inverter datasheet shows full MVA only up to 40 °C. What do you require?`,
      options: [
        { text: "Accept the February test — the plant either works or it doesn't.", score: 0, feedback: "A February test at 20 °C proves nothing about July at 50 °C, when the inverters are derated and the grid needs the support most." },
        { text: "Require the EPC to demonstrate, by design calculation and OEM derating data, capability at 50 °C, plus a contractual summer re-test (or temperature-corrected test) before final acceptance.", score: 1, feedback: "Correct. Combine a calculated demonstration with a test under representative conditions, tied to acceptance or retention." },
        { text: "Delay COD until July so the test happens in summer.", score: 0.3, feedback: "Disproportionate: it loses months of energy and creates a delay claim. A summer re-test linked to retention achieves the same assurance." },
        { text: "Ask the grid operator to waive the requirement in summer.", score: 0.1, feedback: "That transfers the contractor's shortfall onto the national grid at its weakest moment." },
      ],
      explanation: md`Capability must be proven at the conditions that matter. Contractual levers: a design demonstration at 50 °C, temperature-corrected testing, a summer re-test, and retention or performance security until it is passed.`,
      concepts: ["m01.reactive-capability"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m01-l02-f1", front: "RMS of a sinusoid", back: md`$V_\text{rms} = V_m/\sqrt2$`, concepts: ["m01.phasors-impedance"] },
    { id: "m01-l02-f2", front: "Complex power", back: md`$\underline S = \underline V\,\underline I^* = P + jQ$`, concepts: ["m01.complex-power"] },
    { id: "m01-l02-f3", front: "Power factor (sinusoidal)", back: md`$\text{PF} = P/|S| = \cos\varphi$`, concepts: ["m01.power-factor"] },
    { id: "m01-l02-f4", front: "Q needed for PF correction", back: md`$Q_C = P(\tan\varphi_1 - \tan\varphi_2)$`, concepts: ["m01.power-factor"] },
    { id: "m01-l02-f5", front: "Q as a fraction of P at PF 0.95", back: "0.3287 × P (≈ one third)", concepts: ["m01.power-factor"] },
    { id: "m01-l02-f6", front: "How does capacitor-bank output vary with voltage?", back: md`$\propto V^2$ (inverter/STATCOM: $\propto V$)`, concepts: ["m01.power-factor"] },
    { id: "m01-l02-f7", front: "Which quantity controls voltage on HV networks?", back: md`Reactive power, because $X \gg R$: $\Delta V \approx (RP + XQ)/V$`, concepts: ["m01.voltage-reactive-link"] },
    { id: "m01-l02-f8", front: "Do inductors absorb or supply reactive power?", back: "Absorb (current lags). Capacitors supply (current leads).", concepts: ["m01.phasors-impedance"] },
    { id: "m01-l02-f9", front: "Key reactive question for a Kuwait PV EPC", back: "What is the inverter MVA (and P-Q capability at POC) at 50 °C ambient?", concepts: ["m01.reactive-capability"] },
  ],
  scenarios: [
    {
      id: "m01-s2",
      title: "The inverter datasheet at 50 °C",
      dayInLife: true,
      context: md`Tuesday, 11:30, design-review meeting at the Owner's Engineer's office for a 500 MW PV IPP connecting at 400 kV. The EPC presents its inverter selection: 110 central inverters at **4.6 MVA**. Requirement in the PPA technical schedule: Q equivalent to PF 0.95 lead/lag at the POC at full output, over 0.9–1.1 pu voltage, at ambient temperatures up to 50 °C.`,
      start: "a",
      concepts: ["m01.reactive-capability", "m01.complex-power"],
      nodes: {
        a: {
          md: md`You do a quick check: 110 × 4.6 = 506 MVA. Required at POC: $\sqrt{500^2 + 164^2} \approx 526$ MVA before transformer losses and Mvar. You open the datasheet appendix: the 4.6 MVA is valid up to 35 °C; at 50 °C it is 4.1 MVA. What do you say?`,
          choices: [
            { text: "Point out the gap politely but precisely: at 50 °C the fleet is 451 MVA versus ~550 MVA needed including transformer Mvar, and ask for the reactive capability study at 50 °C.", next: "b", score: 10, feedback: "Quantified, specific and non-confrontational. You have turned a vague concern into an action with a deliverable." },
            { text: "Say nothing in the meeting; email the OE later.", next: "b", score: 5, feedback: "Avoids friction but wastes the moment when the EPC's designer is in the room and could commit to a study date." },
            { text: "Reject the inverter selection outright.", next: "c", score: 3, feedback: "Premature. The EPC may have a solution (a STATCOM, different units, more inverters). Ask for the study first." },
          ],
        },
        b: {
          md: md`The EPC's designer replies: "Our PPC can reduce active power on hot days to free up MVA for reactive power, so we don't need more inverters."`,
          choices: [
            { text: "Ask whether the PPA requirement is Q at **full** active power; if so, curtailing P to make Q is non-compliant, and the lost energy is the IPP's risk anyway — ask them to price the alternative (more inverters or a STATCOM).", next: "d", score: 10, feedback: "Exactly. Read the requirement's wording: 'at full output' means Q must coexist with rated P. The commercial consequence of P-curtailment sits with the IPP." },
            { text: "Accept — it is a clever control solution.", next: "d", score: 2, feedback: "It may breach the grid code and would reduce summer peak energy, which is what MEWRE needs most." },
          ],
        },
        c: {
          md: md`The EPC's project director bristles: "Our design meets the specification." The atmosphere cools and the meeting ends without an action.`,
          choices: [
            { text: "Follow up in writing with the calculation and a request for the 50 °C capability study by a date.", next: "d", score: 6, feedback: "Recovers the situation, though the confrontation cost goodwill." },
          ],
        },
        d: {
          md: md`Two weeks later the EPC proposes adding a 60 Mvar STATCOM at the 400 kV substation. Last decision: what do you require before accepting?`,
          choices: [
            { text: "A revised capability study at 50 °C and 0.9/1.1 pu, a harmonic and control-interaction check with the PPC, the STATCOM's own derating, and its inclusion in the grid-compliance test plan.", score: 10, feedback: "Complete: every new device needs its own temperature rating, control coordination and test." },
            { text: "Just the STATCOM datasheet.", score: 4, feedback: "Necessary but not sufficient — the issue is the combined plant capability at POC, and control interaction between PPC and STATCOM." },
          ],
        },
      },
    },
  ],
};

export default lesson;
