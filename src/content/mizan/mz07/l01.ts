import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz07-l01",
  title: "Kuwait's system in numbers, for a seller",
  summary:
    "The handful of grid numbers Mizan must quote correctly in every Kuwaiti meeting: the summer peak and its basis, available versus installed capacity, the negative 2025 reserve margin, how small the solar fleet still is, where the new gigawatts connect (Shagaya, the 400 kV line to Al-Wafra) and what each number does to the soiling and control pitch. Track 0 m00 teaches the system; this lesson turns it into sales arguments.",
  minutes: 50,
  objectives: [
    "You can quote Kuwait's recent peak, available capacity and reserve margin with source, date and basis.",
    "You can explain where utility-scale renewables connect in Kuwait and why the Shagaya to Al-Wafra 400 kV line matters for any plant there.",
    "You can convert a soiling loss into firm megawatts at the summer peak hour and into displaced fuel.",
    "You can write a short, sourced system-context paragraph for a Mizan proposal without overclaiming.",
  ],
  concepts: [
    {
      id: "mz07.peak-basis",
      name: "Peak figure with basis",
      description: "Kuwait's summer peak is about 17.5 to 17.7 GW depending on source and basis (MEWRE 17,540 MW for 2026; MEES 17.71 GW for July 2025). Always state source, date and basis.",
      competency: "mz-grid",
      related: ["m00.peak-demand", "m00.reserve-margin"],
    },
    {
      id: "mz07.firm-summer-mw",
      name: "Firm summer MW as the selling unit",
      description: "In a capacity-short summer system, the ministry values output at the 15:00 to 16:00 July and August hour. Soiling and bad stow decisions remove firm MW exactly then.",
      competency: "mz-grid",
      related: ["m00.available-capacity", "mz04.state-owned-value"],
    },
    {
      id: "mz07.shagaya-export-corridor",
      name: "Shagaya export corridor",
      description: "Utility-scale PV in Kuwait concentrates at Shagaya/Al-Dibdibah in the west and exports through 400 kV: the Zone 1 IPP builds its own 400 kV substation; MEWRE builds the Shagaya to Al-Wafra 400 kV line (awarded March 2026).",
      competency: "mz-grid",
      related: ["m00.shagaya-phase3", "m06.hosting-capacity"],
    },
    {
      id: "mz07.solar-share-gap",
      name: "Small fleet, large target",
      description: "About 102 MW of solar at end 2024 against official targets of 30 % renewables by 2030; independent forecasts put 2030 solar near 3 GW. The installed base Mizan can sell to today is tiny; the pipeline is the market.",
      competency: "mz-business",
      related: ["m00.re-targets", "m00.pipeline-confidence"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Six numbers and what they do to the pitch",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every Kuwaiti conversation about Mizan, with KISR, MEWRE, KAPP or an IPP, starts from the summer grid. If you quote the peak wrong, mix bases or talk in MWp, the engineer across the table stops listening. If you can say "a 3 % soiling loss on Zone 1 is about 23 MW missing at the July peak, in a system that was 700 MW short in June 2025", you are speaking the ministry's language and the soiling pitch becomes a reliability pitch.`,
        },
        {
          kind: "xref",
          to: "m00-l01",
          note: "Track 0 derives peak, available capacity, reserve margin, heat rate and the 2024 to 2025 load-shedding in depth. Read it first; this lesson only keeps the numbers a seller quotes.",
        },
        {
          kind: "md",
          md: md`### The numbers to carry

| Quantity | Value | Source and basis | What it means for Mizan |
|---|---|---|---|
| Summer peak 2026 | **17,540 MW** | MEWRE via Kuwait Times; ministry basis | Second year of flat peak despite about 1 GW/yr of new connections: demand management is holding the line, barely |
| Highest reported peak | **17.71 GW**, July 2025 | MEES; differs from ministry 17,610 MW | Two bases in circulation; quote one with its label |
| Installed vs available | about **21 GW** vs about **17 GW** at peak | Rystad via Invezz, Sep 2025 | One fifth of the fleet is missing on the hottest day (outages, heat derating) |
| Reserve margin, June 2025 | 16.275 GW available vs 16.98 GW peak, $RM \approx -4.2\%$ | MEES | Load-shedding, GCCIA imports; every summer MW is political |
| Solar installed, end 2024 | about **102 MW** | MEWRE official via The Energy Year | The installed base is Shagaya Phase I PV plus small plants: few buyers today |
| Targets vs forecasts | 30 % RE by 2030 (official) vs about 2.9 GW solar by 2030 (Rystad) | The Energy Year; pv magazine | The pipeline (Zone 1, Zone 2, later phases) is the market, and it will run late |

The reserve margin uses the same formula as Track 0:`,
        },
        { kind: "equation", formula: "mz07-reserve-margin" },
        {
          kind: "chart",
          chart: "bar",
          title: "Kuwait summer peaks as reported (GW)",
          xKey: "period",
          yLabel: "GW",
          series: [{ key: "peak", label: "Reported peak" }],
          data: [
            { period: "Aug 2023 (MEES)", peak: 16.94 },
            { period: "Jun 2024 (MEES)", peak: 16.81 },
            { period: "Summer 2024 (MEWRE)", peak: 17.64 },
            { period: "Jun 2025 (MEES)", peak: 16.98 },
            { period: "Jul 2025 (MEES)", peak: 17.71 },
            { period: "Summer 2025 (MEWRE)", peak: 17.61 },
            { period: "Summer 2026 (MEWRE)", peak: 17.54 },
          ],
          caption: "Mixed bases on purpose: MEES monthly records and MEWRE seasonal figures. The 100 MW gap between the two 2025 figures is about the size of Kuwait's whole end-2024 solar fleet. Data from Track 0 m00-l01.",
        },
        {
          kind: "md",
          md: md`### Where renewables connect

Kuwait's utility-scale renewables cluster in one place: **Shagaya / Al-Dibdibah**, in the western desert, far from the coastal load centres. That makes the export path the first engineering fact about any plant there.

- **Shagaya Phase I** (70 MW: 50 MW CSP, 10 MW wind, 10 MW PV, reported as 11.15 MW in the RSER 2020 paper), built by KISR, ownership transferred to the ministry. This is Mizan's target pilot site.
- **Zone 1, 1,100 MW PV IPP** (KAPP-procured, 30-year PPA with MEWRE). Its **400 kV substation is in the developer's scope**. MEED reported on 13 August 2026 that the Masdar and Fouad AlGhanim and Sons consortium was selected; tariff and financial close were not found.
- **Zone 2, 500 MW PV IPP**: bids submitted in 2026; preferred bidder not found.
- **Shagaya to Al-Wafra 400 kV overhead line**: MEWRE's scope, awarded in March 2026 to Power Grid Company (Kuwait) for KD 48.6 m. If it is late, Zone 1 cannot export; Track 0 m06-l04 shows that one double-circuit line carries the first 1.6 GW with almost no N-1 margin.
- **BESS**: about 1,500 MW phased, first phase about 500 MW, sites at Al-Mutlaa City and Jaber Al-Ahmad City approved in June 2026, aimed at summer peaks from 2027. These are near load, not at Shagaya.

For a seller, the corridor fact has two consequences. First, **curtailment is plausible** at Shagaya once several plants share a few 400 kV circuits, especially on winter middays with low load; curtailment contaminates soiling analytics (lesson 3). Second, **the grid side is MEWRE's**, so any control function that touches export goes through MEWRE acceptance (lessons 2 and 4).`,
        },
        { kind: "sources", refs: ["mz07-r1", "mz07-r2", "mz07-r3", "mz07-r4", "mz07-r5", "mz07-r6", "mz07-r7", "mz07-r8", "mz07-r9", "mz07-r10", "mz07-r11"] },
        {
          kind: "md",
          md: md`### From soiling percent to firm megawatts

The dispatcher does not think in performance ratio. Translate:`,
        },
        { kind: "equation", formula: "mz07-firm-loss" },
        {
          kind: "md",
          md: md`The factor $f_{\text{peak}}$ is below 1 for three reasons: hot cells (about $-0.3$ to $-0.4\ \%/°\text{C}$ on power), the sun already in the west at 15:00 to 16:00, and inverter derating at 50 °C. And the loss is not only energy: it is energy at the **most expensive hour of the year**, when the marginal unit is an old steam plant burning liquid fuel (Track 0 m00-l03, and mz04-l02 for the value of a soiled MWh).`,
        },
        {
          kind: "widget",
          widget: "load-curve",
          props: { season: "summer", pvMW: 1100 },
          caption: "Summer load with a 1.1 GW PV overlay. Look at 15:00 to 17:00: load still rising, PV already falling. Soiling shaves the PV curve exactly where the system has least margin.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "What we do not know",
          md: md`Summer 2026 load-shedding: none found (absence of reports is not proof). Al-Wafra substation and line commissioning dates: not confirmed. Shagaya Phase I current operating status and O&M arrangement in 2026: no news found. Zone 1 tariff: not found. Check MEWRE, KUNA and MEED before quoting any of these in a proposal.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Turning soiling into the ministry's units",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Zone 1 on a July afternoon: soiling as missing firm capacity",
          given: md`Illustrative: a 1,100 MWac PV plant at Shagaya. Clean output at 15:30 on a 48 °C July day is 70 % of AC capacity ($f_{\text{peak}} = 0.70$). The plant's soiling ratio that day is 0.97 ($L_s = 0.03$). System context: the June 2025 deficit at peak was $16.98 - 16.275 = 0.705$ GW (MEES).`,
          steps: [
            { md: md`Clean peak-hour output: $1{,}100 \times 0.70 = 770$ MW.` },
            { md: md`Missing to soiling: $\Delta P_{\text{firm}} = 1{,}100 \times 0.70 \times 0.03 = 23.1$ MW.` },
            { md: md`Against the June 2025 shortfall: $23.1 / 705 = 3.3\%$ of the gap that was covered by load-shedding and imports.` },
            { md: md`For comparison, the whole of Kuwait's end-2024 solar fleet was about 102 MW: the soiling loss on one future plant on one afternoon is a fifth of it.` },
          ],
          result: md`"About 23 MW at the peak hour, a few percent of the 2025 shortfall" is the sentence for a ministry audience. It is honest (illustrative inputs, labelled) and it moves soiling from an O&M line item to a summer reliability lever.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Fuel displaced by halving the soiling loss",
          given: md`Same illustrative plant: annual capacity factor 0.26 on 1,100 MWac. Better cleaning decisions cut the average annual soiling loss from 4.0 % to 2.5 %. Assume the recovered energy displaces old steam units at 10.5 MJ/kWh burning crude at 6.12 GJ/bbl, valued at USD 70/bbl (illustrative).`,
          steps: [
            { md: md`Annual energy: $1{,}100 \times 8{,}760 \times 0.26 = 2{,}505{,}360$ MWh $\approx 2{,}505$ GWh.` },
            {
              md: md`Recovered energy: $0.015 \times 2{,}505 = 37.6$ GWh.`,
              hidden: true,
              check: { prompt: "Energy recovered per year", answer: 37.6, unit: "GWh", tolerance: { rel: 0.01 } },
            },
            {
              md: md`Fuel: $37.6 \times 10^6\ \text{kWh} \times 10.5\ \text{MJ/kWh} = 394{,}600$ GJ; divided by 6.12 GJ/bbl gives about **64,500 bbl**.`,
              hidden: true,
              check: { prompt: "Barrels of crude displaced per year", answer: 64500, unit: "bbl", tolerance: { rel: 0.02 } },
            },
            { md: md`Value to the state: $64{,}500 \times 70 \approx$ USD 4.5 m per year of crude freed for export.` },
          ],
          result: md`About 37.6 GWh, about 64,500 barrels and about USD 4.5 m a year, all illustrative. The heat-rate and oil-price assumptions dominate: state them every time (Track 0 m01 heat rate; mz04-l02).`,
        },
      ],
    },
    {
      layer: "field",
      title: "Using system numbers in a Mizan conversation",
      blocks: [
        {
          kind: "md",
          md: md`**Who has which data.** MEWRE holds peak, dispatch and transmission data (planning and statistics units, the national control centre). KISR holds Shagaya measurement and the Phase I performance record (the RSER 2020 paper is the public part). MEES, Rystad, MEED and Kuwait Times are the third-party trail you can cite.

**How to use the numbers.**
- With **KISR researchers**: lead with method (corrected PR, soiling ratio), then use the peak and fuel numbers to say why the method matters to the state.
- With **MEWRE**: lead with firm summer MW and fuel; they own the reliability problem.
- With an **IPP**: lead with revenue and PR guarantees (lesson 4); the system numbers are context, not their P&L.
- In **writing**: every figure gets source, date and basis. "17,540 MW (MEWRE, summer 2026)" not "about 18 GW".`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How sellers lose the room",
          md: md`1. Quoting MWp for a firm-capacity argument. 2. Mixing the MEES 17.71 GW and the MEWRE 17,610 MW figures in one sentence. 3. Calling Zone 1 "awarded" or "signed" when the public record is "selected, Audit Bureau approval reported pending in July 2026". 4. Implying Mizan has a pilot running at Shagaya: it is targeted, in preparation. 5. Presenting fuel savings without stating heat rate and oil price.`,
        },
        {
          kind: "checklist",
          title: "Before any system number goes into a Mizan document",
          items: [
            "Source, date and basis written next to the figure.",
            "Capacity in MWac or firm MW, not MWp, when the argument is reliability.",
            "Project status words match the public record (selected, bids received, approved sites).",
            "Illustrative numbers labelled as such.",
            "Unverified items (Phase I status, line commissioning, tariffs) either checked or flagged.",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz07-l01-p1",
            type: "short",
            explanation: md`Graded against the rubric. The strongest answers use sourced numbers with dates, label illustrative figures, and never describe the pilot as signed or running.`,
            prompt: md`Write the **system context** paragraph (120 to 180 words) for the opening of Mizan's proposal to KISR for the Shagaya Phase I soiling analytics pilot. It must justify why soiling analytics matter to Kuwait's grid, using at least three sourced figures, and must not overclaim the pilot's status.`,
            rubric: [
              "Uses at least three correct figures with source and date (for example 17,540 MW peak MEWRE 2026; 16.98 GW vs 16.275 GW June 2025 MEES; about 102 MW solar end 2024).",
              "Translates soiling into firm summer MW or displaced fuel, with illustrative numbers labelled.",
              "Connects to the Shagaya pipeline (Zone 1 1,100 MW, Zone 2 500 MW) and the 400 kV export path without claiming awards that are not public.",
              "Describes the pilot as proposed, targeted or in preparation, never as signed or running.",
              "Names KISR's methodological role and corrected PR to IEC 61724 as the baseline.",
              "Concise, no marketing filler.",
            ],
            modelAnswer: md`Kuwait's summer peak reached 17,540 MW in 2026 (MEWRE), and in June 2025 demand of 16.98 GW exceeded the 16.275 GW available (MEES), forcing load-shedding and GCCIA imports. Solar, about 102 MW at end 2024, is set to grow by gigawatts at Shagaya, starting with the 1,100 MW Zone 1 and 500 MW Zone 2 IPPs exporting over 400 kV. In this climate soiling is not a minor O&M item: illustratively, a 3 % soiling loss on a 1,100 MWac plant removes about 23 MW at the July afternoon peak, when the marginal unit burns liquid fuel. Yet, as KISR has noted, there is no standard method for turning operational data into cleaning decisions. This proposal sets out a pilot, in preparation with KISR as methodology partner, to estimate soiling at Shagaya Phase I from temperature-corrected performance ratio to IEC 61724 and to validate it against the 2018 to 2019 cleaning-arm failure period.`,
            concepts: ["mz07.peak-basis", "mz07.firm-summer-mw", "mz07.shagaya-export-corridor"],
            difficulty: 2,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz07-l01-q1",
      type: "mcq",
      prompt: md`Which statement about Kuwait's 2025 summer peak is correct?`,
      options: [
        "There is one official figure, 17.71 GW, published by MEWRE.",
        "MEWRE reported 17,610 MW for summer 2025 and MEES reported a 17.71 GW July record; the bases differ and must be labelled.",
        "The peak fell below 16 GW because of demand management.",
        "The peak is measured in MWp.",
      ],
      answer: 1,
      explanation: md`Two sources, two bases (net vs gross, instantaneous vs averaged). A seller quotes one, labelled, and never mixes them in one argument.`,
      concepts: ["mz07.peak-basis"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz07-l01-q2",
      type: "numeric",
      prompt: md`MEES reported a June 2025 peak of 16.98 GW and 16.275 GW available. What was the reserve margin, in percent?`,
      answer: -4.15,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$RM = (16.275 - 16.98)/16.98 = -0.0415$, i.e. about $-4.2\%$. Negative margin means load-shedding or imports.`,
      concepts: ["mz07.firm-summer-mw"],
      difficulty: 1,
    },
    {
      id: "mz07-l01-q3",
      type: "numeric",
      prompt: md`Illustrative: a 500 MWac plant delivers 72 % of AC capacity at the August peak hour when clean. Its soiling ratio that day is 0.95. How many MW are missing at the peak hour?`,
      answer: 18,
      tolerance: { rel: 0.02 },
      unit: "MW",
      explanation: md`$\Delta P = 500 \times 0.72 \times 0.05 = 18$ MW.`,
      concepts: ["mz07.firm-summer-mw"],
      difficulty: 1,
    },
    {
      id: "mz07-l01-q4",
      type: "multi",
      prompt: md`Which are in **MEWRE's** scope rather than the Zone 1 developer's, according to the public record?`,
      options: [
        "The Shagaya to Al-Wafra 400 kV overhead line",
        "Zone 1's own 400 kV substation",
        "Offtake of Zone 1 energy under the 30-year PPA",
        "Choosing the Zone 1 cleaning contractor",
      ],
      answer: [0, 2],
      explanation: md`The line is MEWRE's (awarded March 2026 to Power Grid Company); MEWRE is the offtaker. The Zone 1 substation is in the developer's scope, and cleaning is an IPP/O&M decision.`,
      concepts: ["mz07.shagaya-export-corridor"],
      difficulty: 2,
    },
    {
      id: "mz07-l01-q5",
      type: "mcq",
      prompt: md`Why is the installed solar base a weak sales argument in Kuwait today, and what is the real market?`,
      options: [
        "The base is large but already served by competitors; the market is rooftop.",
        "The base is about 102 MW (end 2024), so few buyers exist today; the market is the Shagaya IPP pipeline and its O&M contracts, which will run later than targets.",
        "There is no solar in Kuwait at all.",
        "Targets are already met, so there is no growth.",
      ],
      answer: 1,
      explanation: md`Small installed base, large official target, sober forecasts (about 2.9 GW by 2030). Mizan sells the method now (Phase I pilot) to be ready for the pipeline.`,
      concepts: ["mz07.solar-share-gap"],
      difficulty: 1,
    },
    {
      id: "mz07-l01-q6",
      type: "decision",
      prompt: md`In a first meeting, a MEWRE planning engineer asks: "Why should the ministry care about soiling? It is the IPP's problem." Best answer?`,
      options: [
        { text: "Agree and move on to the IPP.", score: 0, feedback: "You lose the only party that captures the fuel value and owns the summer reliability problem." },
        { text: "Soiling removes firm MW at the July peak and the energy it costs is replaced by liquid fuel; illustratively 3 % on Zone 1 is about 23 MW at the peak hour. The state captures the fuel value; the IPP only sees the tariff.", score: 1, feedback: "Right unit, right owner, labelled numbers." },
        { text: "Soiling reduces the PR guarantee, which is in the PPA.", score: 0.4, feedback: "Possibly true but not public, and it is the IPP's metric, not the planner's." },
        { text: "Quote the global soiling loss of EUR 3 to 5 bn a year.", score: 0.2, feedback: "A global number does not answer a Kuwaiti planner's question." },
      ],
      explanation: md`Translate to firm MW and fuel; that is the ministry's frame (Track 0 m00-l01, mz04-l02).`,
      concepts: ["mz07.firm-summer-mw", "mz07.peak-basis"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz07-l01-f1", front: "Kuwait summer peak 2026 (ministry basis)", back: "17,540 MW (MEWRE via Kuwait Times). Highest reported: 17.71 GW, July 2025 (MEES).", concepts: ["mz07.peak-basis"] },
    { id: "mz07-l01-f2", front: "Installed vs available capacity at peak", back: "About 21 GW installed, about 17 GW reliably available (Rystad, Sep 2025).", concepts: ["mz07.firm-summer-mw"] },
    { id: "mz07-l01-f3", front: "June 2025 reserve margin", back: "16.275 GW available vs 16.98 GW peak: about -4.2 % (MEES).", concepts: ["mz07.firm-summer-mw"] },
    { id: "mz07-l01-f4", front: "Shagaya to Al-Wafra 400 kV line", back: "MEWRE scope; awarded March 2026 to Power Grid Company (Kuwait), KD 48.6 m. Zone 1's 400 kV substation is the developer's scope.", concepts: ["mz07.shagaya-export-corridor"] },
    { id: "mz07-l01-f5", front: "Firm MW lost to soiling", back: "Delta P = P_ac x f_peak x L_s. Illustrative: 1,100 x 0.70 x 0.03 = 23.1 MW.", concepts: ["mz07.firm-summer-mw"] },
    { id: "mz07-l01-f6", front: "Kuwait solar fleet end 2024", back: "About 102 MW (MEWRE official). Target 30 % RE by 2030; Rystad forecasts about 2.9 GW solar by 2030.", concepts: ["mz07.solar-share-gap"] },
  ],
};

export default lesson;
