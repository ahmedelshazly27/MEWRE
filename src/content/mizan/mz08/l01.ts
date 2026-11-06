import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz08-l01",
  title: "The BESS conversation in 30 minutes",
  summary:
    "The six numbers every BESS buyer will throw at you (MW, MWh, C-rate, RTE, degradation, augmentation), what boundary each is measured at, and a sizing you can do on a notepad in the meeting for an evening-peak requirement. Track 0 m05 holds the full engineering; this lesson is the seller's fluent, honest version.",
  minutes: 50,
  objectives: [
    "You can state MW, MWh, duration, C-rate and RTE for a BESS and say at which boundary (DC, PCS, POI) each is measured",
    "You can size a BESS for an evening-peak requirement in the meeting with one multiplier, and say what the full sizing chain adds",
    "You can explain capacity fade and augmentation in two sentences and estimate when the first augmentation falls due",
    "You can spot the three numbers a vendor quote most often inflates or omits",
  ],
  concepts: [
    {
      id: "mz08.boundary-discipline",
      name: "Boundary discipline (DC vs PCS vs POI)",
      description:
        "Every BESS number (MW, MWh, RTE, C-rate) depends on where it is measured: cell or DC terminals, PCS AC terminals, or the point of interconnection with auxiliaries. Buyers pay for POI; vendors like to quote DC.",
      competency: "mz-grid",
      related: ["m05.power-energy", "m05.rte", "m05.bess-sizing"],
    },
    {
      id: "mz08.meeting-sizing",
      name: "Meeting-room sizing multiplier",
      description:
        "DC nameplate ≈ POI MWh / (discharge efficiency × SoC window × SoH floor), about 1.24 × POI MWh with augmentation; PCS ≈ 1.03 × POI MW and about 1.09 × POI MW in MVA at 50 °C and 0.95 PF.",
      competency: "mz-grid",
      related: ["m05.bess-sizing", "mz08.boundary-discipline"],
    },
    {
      id: "mz08.fade-augmentation",
      name: "Fade and augmentation for sellers",
      description:
        "LFP fades roughly 1.5 to 2.5 %/yr in daily cycling at Gulf temperatures; a plant sized with a 0.90 SoH floor needs its first augmentation around year 5, and the contract must say who pays.",
      competency: "mz-grid",
      related: ["m05.capacity-fade", "m05.augmentation", "m05.ltsa-guarantee"],
    },
    {
      id: "mz08.evening-peak-duty",
      name: "Evening-peak duty",
      description:
        "Kuwait's net-load peak moves after sunset as PV grows; the duty is 3 to 4 hours of discharge every summer evening, one cycle a day, charged from midday PV.",
      competency: "mz-grid",
      related: ["m05.energy-shifting", "m00.peak-demand"],
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "Six numbers and their boundaries",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan's distribution thread puts you in rooms where MEWRE engineers, EPCs and Chinese integrators talk BESS. You do not need to design the plant; you need to follow the conversation without a pause, catch an inflated number, and never be the person who confuses MW with MWh. Thirty minutes of fluency here protects the credibility your soiling product depends on.`,
        },
        {
          kind: "xref",
          to: "m05-l02",
          note: "Track 0 m05-l02 teaches the physics behind every number below (SoC, DoD, SoH, Arrhenius aging, RTE at each boundary). Read it once; this lesson only gives the seller's compressed version.",
        },
        {
          kind: "md",
          md: md`## The six numbers

| Number | What it means | Typical utility LFP value | The question to ask |
|---|---|---|---|
| **Power (MW)** | How fast it can discharge | 50 to 500 MW per project | At the POI, at 50 °C, at 0.95 PF? |
| **Energy (MWh)** | How much it delivers per discharge | 2 to 4 times the MW | At the POI, every year, or DC nameplate on day one? |
| **Duration and C-rate** | $h = E/P$; $C = 1/h$ | 4 h (0.25C) for evening shifting | Which boundary is the C-rate on? |
| **RTE** | Energy out over energy in | 92 to 95 % DC; 85 to 88 % AC at POI | With or without auxiliaries? |
| **Degradation** | Capacity lost per year | 1.5 to 2.5 %/yr at one cycle a day | At what cell temperature and cycles per year? |
| **Augmentation** | Adding capacity later to hold the MWh | First tranche around year 4 to 7 | Who pays, who plans the space and PCS headroom? |`,
        },
        { kind: "equation", formula: "mz08-duration-crate" },
        {
          kind: "md",
          md: md`## Boundaries: the whole trick

A battery plant is a chain: **cells → racks → DC bus → PCS (inverter) → MV transformer → HV transformer → POI meter**, with HVAC and auxiliaries drawing power off the MV bus. Every link loses a little. The buyer is paid, or judged, at the meter; the vendor's catalogue is written at the DC terminals. So:

- "**400 MWh**" on a datasheet is usually DC nameplate at beginning of life. At the POI in year 10 it may be under 320 MWh without augmentation.
- "**95 % RTE**" is usually DC. The AC round trip at the POI including summer auxiliaries is nearer 85 %.
- "**0.5C**" on a cell datasheet says what the cell can do, not what the plant is built to do.

When someone says a number, your reflex is one question: **"Measured where?"**`,
        },
        {
          kind: "flow",
          title: "Where each number lives",
          steps: [
            { label: "Cells and racks", detail: "Nameplate MWh (DC, BOL), cell C-rate, DC RTE 92 to 95 %" },
            { label: "PCS", detail: "MW and MVA rating, derates above about 40 to 45 °C; one-way about 98 to 98.5 %" },
            { label: "Transformers", detail: "MV and HV, about 99.3 to 99.6 % each way" },
            { label: "Auxiliaries", detail: "HVAC, chillers, BMS, fire systems: several % of throughput in summer" },
            { label: "POI meter", detail: "What the buyer contracts: MW and MWh every year, AC RTE 83 to 88 %" },
          ],
          caption: "Vendors quote on the left, buyers pay on the right. The gap is 20 to 25 % on energy.",
        },
        {
          kind: "md",
          md: md`## The meeting-room multiplier

Track 0 works the full sizing chain one efficiency at a time (m05-l03). In a meeting you compress it to three factors:`,
        },
        { kind: "equation", formula: "mz08-quick-nameplate" },
        {
          kind: "md",
          md: md`With a discharge efficiency of 0.94 (cells to POI, including auxiliaries while discharging), a 95 % SoC window and a 0.90 SoH floor held by augmentation:

$$\frac{1}{0.94 \times 0.95 \times 0.90} = \frac{1}{0.804} \approx 1.24$$

**Every MWh promised at the meter needs about 1.24 MWh of cells on day one.** Track 0's full chain for a 500 MW / 2,000 MWh plant gave 1.26, so the shortcut is honest to a few percent. For power, the PCS is about 1.03 times the POI MW (transformer losses plus auxiliaries) and about 1.09 times in MVA once the grid code's 0.95 power factor is added at 50 °C.

## Fade and augmentation in two sentences

LFP loses capacity with time (calendar fade, worse when hot and full) and with use (cycle fade). Rather than install all the margin on day one, most plants are sized to a state-of-health floor and **augmented**: new containers added when the fleet would fall below the contracted MWh.`,
        },
        { kind: "equation", formula: "mz08-linear-fade" },
        { kind: "equation", formula: "mz08-augmentation" },
        {
          kind: "widget",
          widget: "bess-sizing",
          props: { mw: 100, hours: 3 },
          caption: "Set DoD to 95 %, RTE to 85 %, 365 cycles, 1.0 %/yr calendar and 2.5 % per 1,000 cycles. Compare 'Overbuild on day 1' with 'Periodic augmentation' every 5 years. The widget uses its own loss model, so its nameplate differs slightly from the notepad number below.",
        },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Sizing an evening peak on a notepad",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "100 MW for 3 hours every summer evening",
          given: md`Illustrative request from a buyer at a Kuwaiti PV site: **100 MW at the POI from 18:00 to 21:00, every day, for 15 years** (300 MWh per discharge). Assume one-way discharge efficiency cells to POI 0.94 including auxiliaries, SoC window 0.95, augmentation keeps SoH at or above 0.90, AC RTE at the POI 0.85, fade 1.0 %/yr calendar plus 2.5 % per 1,000 cycles, 365 cycles a year, 5 MWh DC containers.`,
          steps: [
            { md: md`**Energy at the POI:** $100 \times 3 = 300$ MWh. Duration 3 h, so 0.33C at the POI.` },
            { md: md`**Day-one usable energy needed at the cells:** $300/(0.94 \times 0.95) = 300/0.893 = 335.9$ MWh.` },
            { md: md`**DC nameplate with the 0.90 SoH floor:** $335.9/0.90 = 373.3$ MWh, about 75 containers of 5 MWh. On the DC nameplate this is $100/373.3 = 0.27$C.` },
            { md: md`**If overbuilt instead** to last 15 years with no augmentation (end SoH about 0.70): $335.9/0.70 = 479.9$ MWh, 29 % more cells bought on day one.` },
            { md: md`**PCS:** about $1.03 \times 100 = 103$ MW, and about 109 MVA at 50 °C and 0.95 PF.` },
            { md: md`**Charging energy each day:** $300/0.85 = 352.9$ MWh drawn from the PV plant or grid.` },
            { md: md`**Fade:** $0.010 + 0.025 \times 0.365 = 0.0191$, about 1.9 %/yr. SoH after 5 years: $1 - 5 \times 0.0191 = 0.904$; deliverable $373.3 \times 0.904 \times 0.893 = 301.5$ MWh, just above 300. After 6 years: $SoH = 0.885$, deliverable 295.1 MWh, short.` },
            { md: md`**First augmentation at the end of year 5:** $373.3 \times (1 - 0.904) = 35.7$ MWh, about 7 to 8 containers, plus space, PCS headroom and cable bays reserved from day one.` },
          ],
          result: md`"100 MW / 300 MWh" is, on site, **about 103 MW / 109 MVA of PCS and 373 MWh of cells, with about 36 MWh added around year 5**, charged with about 353 MWh a day. If a vendor quotes 300 MWh of containers for this duty, the plant is short from day one.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: 150 MW for 4 hours",
          given: md`Same assumptions (0.94, 0.95, SoH floor 0.90, AC RTE 0.85). Requirement: **150 MW for 4 h at the POI**.`,
          steps: [
            { md: md`Energy at the POI: $150 \times 4 = 600$ MWh.` },
            {
              md: md`DC nameplate: $600/(0.94 \times 0.95 \times 0.90) = 600/0.8037 = 746.5$ MWh.`,
              hidden: true,
              check: { prompt: "DC nameplate at beginning of life", answer: 746.5, unit: "MWh", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Daily charging energy: $600/0.85 = 705.9$ MWh.`,
              hidden: true,
              check: { prompt: "Charging energy at the POI per day", answer: 705.9, unit: "MWh", tolerance: { rel: 0.01 } },
            },
            { md: md`Containers: $746.5/5 = 149.3$, so 150 containers of 5 MWh.` },
          ],
          result: md`About 747 MWh DC (150 containers) for a 600 MWh POI requirement, charged with about 706 MWh a day. The ratio is the same 1.24 whatever the size.`,
        },
        {
          kind: "question",
          question: {
            id: "mz08-l01-p1",
            type: "numeric",
            prompt: md`A vendor offers "200 MW / 800 MWh" and confirms the 800 MWh is DC nameplate at beginning of life. Using 0.94 discharge efficiency and a 0.95 SoC window, how many MWh can the plant deliver at the POI on day one?`,
            answer: 714.4,
            tolerance: { rel: 0.01 },
            unit: "MWh",
            explanation: md`$800 \times 0.94 \times 0.95 = 714.4$ MWh: 3.57 hours at 200 MW, not 4. And that is before any fade. The quote is a 4-hour DC product sold as a 4-hour plant.`,
            concepts: ["mz08.boundary-discipline", "mz08.meeting-sizing"],
            difficulty: 2,
          },
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Running the conversation",
      blocks: [
        {
          kind: "md",
          md: md`**Who you will meet and what they care about.**

| Person | Talks in | Cares about |
|---|---|---|
| MEWRE planning or control centre engineer | MW at peak, hours, availability | Will it be there at 20:00 in August? Grid code compliance |
| EPC or owner's engineer | Sizing chain, PCS count, layout | Interfaces, derating, test procedures, LDs |
| Integrator sales (often Chinese) | DC MWh, cell Ah, container price per kWh | Volume, payment terms, warranty exposure |
| Finance or procurement | USD/kWh, USD/kW-year, LTSA fee | Comparable bids, total cost over life |

**Your role in that room:** translate between them. Put every number on the same boundary (POI, every year, 50 °C), make the vendor state its assumptions, and leave the detailed design to engineers.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Three numbers vendors most often inflate or omit",
          md: md`1. **MWh at DC, sold as MWh at POI.** 20 to 25 % gap on day one. 2. **RTE without auxiliaries.** In a Kuwaiti summer the chillers run all day; DC RTE of 95 % can be 84 to 86 % at the meter. 3. **Degradation at 25 °C and one cycle a day** when the plant will run hotter or cycle more. Each one makes a bid look cheaper per kWh while delivering less.`,
        },
        {
          kind: "ask",
          title: "Five questions that make you sound like an engineer",
          items: [
            "Is that MWh at the POI, every contract year, at 50 °C, with auxiliaries inside the boundary?",
            "What is your RTE at the POI including HVAC, and at what ambient was it measured?",
            "What SoH floor and fade curve did you assume, and in which year is the first augmentation?",
            "How many PCS units at the derated MVA at 50 °C, with the 0.95 PF requirement?",
            "Who carries augmentation: the EPC under an LTSA capacity guarantee, or the owner?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a ministry official in under a minute why a battery sold as 100 MW / 300 MWh needs about 373 MWh of batteries on site and more added around year five.",
          keyPoints: [
            "Losses in inverters, transformers and cells plus air-conditioning eat part of the stored energy before it reaches the meter",
            "Cells are never fully emptied or filled, so only about 95 % of the capacity is used",
            "Cells lose about 2 % of capacity a year with heat and use",
            "Extra capacity is installed so the 300 MWh is still delivered as the cells age, and new containers are added when it would fall short",
            "The rule of thumb is about 1.24 MWh of cells per MWh at the meter",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz08-l01-p2",
            type: "short",
            prompt: md`A MEWRE engineer asks Mizan, as a prospective distributor, for a one-paragraph note: "What would a 200 MW, 4-hour battery at a Shagaya substation actually involve?" Write it (illustrative numbers), as you would send it after the meeting.`,
            rubric: [
              "States the requirement at the POI (200 MW, 800 MWh) and distinguishes it from DC nameplate",
              "Gives a correct quick sizing: about 995 MWh DC with a 0.90 SoH floor (or states the multiplier), PCS about 206 MW and 218 MVA at 50 °C",
              "Mentions daily charging energy (about 940 MWh at 85 % AC RTE) and where it comes from",
              "Explains fade (about 2 %/yr) and that augmentation around year 5 must be contracted and planned for in layout",
              "Labels numbers as illustrative and lists what a real study must confirm (dispatch, cycles, temperature, grid code, procurement route)",
            ],
            modelAnswer: md`**Illustrative first look, not a design.** A 200 MW, 4-hour battery delivers 800 MWh at the substation meter per discharge. Because of conversion losses, air-conditioning load and the usable charge window, and to keep 800 MWh as cells age, it needs about 1.24 MWh of cells per MWh at the meter: about 995 MWh of LFP containers (roughly 200 containers of 5 MWh) and about 206 MW of inverters, about 218 MVA at 50 °C to meet the 0.95 power factor requirement. Charging it every day takes about 940 MWh from PV or the grid at an 85 % round trip. Cells lose about 2 % of capacity a year in daily cycling, so the first augmentation of roughly 90 to 100 MWh falls around year 5; the contract should make the supplier responsible for delivering 800 MWh every year, with space and inverter headroom reserved from day one. **To confirm in a study:** the dispatch profile and cycles per year (including any frequency service), cell temperature and HVAC design at 50 °C, the grid code reactive requirement, and whether procurement is EPC through MEWRE or a PPP through KAPP.`,
            explanation: md`Sizing: $800/0.8037 = 995$ MWh; $1.03 \times 200 = 206$ MW; $1.09 \times 200 = 218$ MVA; $800/0.85 = 941$ MWh; augmentation $995 \times 0.096 \approx 95$ MWh at year 5.`,
            concepts: ["mz08.meeting-sizing", "mz08.fade-augmentation", "mz08.boundary-discipline"],
            difficulty: 2,
          },
        },
        { kind: "xref", to: "m05-l04", note: "Track 0: fade curves, augmentation strategies, warranties, LTSA capacity guarantees and capacity tests in full." },
        { kind: "sources", refs: ["mz08-r9"] },
      ],
    },
  ],
  quiz: [
    {
      id: "mz08-l01-q1",
      type: "mcq",
      prompt: md`A plant is 100 MW / 400 MWh at the POI. What are its duration and C-rate at the POI?`,
      options: ["0.25 h and 4C", "4 h and 0.25C", "4 h and 4C", "40 h and 0.025C"],
      answer: 1,
      explanation: md`$h = 400/100 = 4$ h; $C = 1/h = 0.25$/h.`,
      concepts: ["mz08.boundary-discipline"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz08-l01-q2",
      type: "numeric",
      prompt: md`Using the meeting multiplier ($\eta_d = 0.94$, $w_{SoC} = 0.95$, $SoH_{min} = 0.90$), what DC nameplate is needed for 500 MWh at the POI?`,
      answer: 622.1,
      tolerance: { rel: 0.01 },
      unit: "MWh",
      explanation: md`$500/0.8037 = 622.1$ MWh.`,
      concepts: ["mz08.meeting-sizing"],
      difficulty: 1,
    },
    {
      id: "mz08-l01-q3",
      type: "mcq",
      prompt: md`A vendor quotes 95 % RTE. What is the most likely boundary, and what would you expect at the POI in a Kuwaiti summer?`,
      options: [
        "POI with auxiliaries; the same 95 %",
        "DC, without auxiliaries; roughly 84 to 88 % at the POI with auxiliaries",
        "PCS AC terminals; about 99 %",
        "Cell level; about 70 %",
      ],
      answer: 1,
      explanation: md`95 % is a DC round trip. Add two PCS conversions, two transformer passes each way and all-day chiller load at 50 °C, and the POI figure falls to the mid-80s.`,
      concepts: ["mz08.boundary-discipline"],
      difficulty: 2,
    },
    {
      id: "mz08-l01-q4",
      type: "numeric",
      prompt: md`Calendar fade 1.2 %/yr and cycle fade 2.5 % per 1,000 cycles at 400 cycles a year. Using the linear model, what is the SoH after 4 years (as a fraction)?`,
      answer: 0.912,
      tolerance: { abs: 0.002 },
      explanation: md`Annual fade $= 0.012 + 0.025 \times 0.4 = 0.022$. $SoH_4 = 1 - 4 \times 0.022 = 0.912$.`,
      concepts: ["mz08.fade-augmentation"],
      difficulty: 2,
    },
    {
      id: "mz08-l01-q5",
      type: "multi",
      prompt: md`Which must be stated for a BESS energy requirement to be unambiguous in a contract? (Select all.)`,
      options: ["Measurement boundary (POI)", "Ambient temperature basis (for example 50 °C)", "Contract year (every year, not BOL only)", "Cell chemistry brand", "Whether auxiliaries are inside the boundary"],
      answer: [0, 1, 2, 4],
      explanation: md`Boundary, temperature, year and auxiliaries define what is delivered. The cell brand is a supply question, not part of the energy requirement.`,
      concepts: ["mz08.boundary-discipline"],
      difficulty: 2,
    },
    {
      id: "mz08-l01-q6",
      type: "decision",
      prompt: md`In a meeting, an integrator says its 300 MWh of containers covers a 100 MW, 3-hour evening requirement "with margin". What do you do?`,
      options: [
        { text: "Accept it; the integrator knows its product", score: 0, feedback: "300 MWh DC delivers about 268 MWh at the POI on day one, before fade." },
        { text: "Ask, in the meeting, whether 300 MWh is DC or POI and what SoH floor and RTE boundary they assumed, then follow up with the arithmetic in writing", score: 1, feedback: "One question exposes the gap without embarrassing anyone, and the written follow-up fixes it." },
        { text: "Tell the buyer the integrator is wrong and should be excluded", score: 0.2, feedback: "It is probably a boundary mix-up, common and fixable. Burning a supplier relationship over it is unnecessary." },
        { text: "Say nothing and fix it later in the contract", score: 0.3, feedback: "The buyer anchors on 300 MWh and a later correction looks like a price increase." },
      ],
      explanation: md`$300 \times 0.94 \times 0.95 = 268$ MWh at the POI: short by 11 % on day one.`,
      concepts: ["mz08.boundary-discipline", "mz08.meeting-sizing"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz08-l01-f1", front: "The one reflex question for any BESS number", back: "Measured where? (DC, PCS or POI; with or without auxiliaries; at what temperature and year)", concepts: ["mz08.boundary-discipline"] },
    { id: "mz08-l01-f2", front: "Meeting multiplier: cells per MWh at the POI", back: md`About 1.24: $1/(0.94 \times 0.95 \times 0.90)$`, concepts: ["mz08.meeting-sizing"] },
    { id: "mz08-l01-f3", front: "PCS rating per POI MW", back: "About 1.03 MW and about 1.09 MVA at 50 °C and 0.95 PF", concepts: ["mz08.meeting-sizing"] },
    { id: "mz08-l01-f4", front: "DC RTE vs POI RTE in a Gulf summer", back: "About 92 to 95 % DC; about 84 to 88 % at the POI with auxiliaries", concepts: ["mz08.boundary-discipline"] },
    { id: "mz08-l01-f5", front: "Typical LFP fade at one cycle a day, Gulf", back: "About 1.5 to 2.5 %/yr; first augmentation around year 5 with a 0.90 SoH floor", concepts: ["mz08.fade-augmentation"] },
    { id: "mz08-l01-f6", front: "Evening-peak duty in Kuwait", back: "3 to 4 h after sunset, one cycle a day, charged from midday PV", concepts: ["mz08.evening-peak-duty"] },
  ],
};

export default lesson;
