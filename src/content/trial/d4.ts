import { md } from "../schema";
import type { Explainer } from "./schema";

/** Day 4 · CSP, wind, batteries, grid connection (Modules 3 to 6). */
export const D4: Explainer[] = [
  // ------------------------------------------------------------------ 1. CSP
  {
    id: "x-csp",
    day: 4,
    title: "Concentrated solar power: mirrors, heat and a steam turbine",
    minutes: 15,
    module: "m03",
    hook: "Shagaya hosts Kuwait's only utility CSP plant: a 50 MW parabolic trough with about 10 hours of molten-salt storage, whose performance since 2019 is not public. Sooner or later someone will ask you whether it is worth keeping, or a developer will pitch CSP for the evening peak. You need to know how it works to ask the right questions.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of three things in a kitchen: a **magnifying glass**, a **kettle** and a **thermos flask**.

- The magnifying glass focuses sunlight onto a hot spot. It only works with **direct** sun: on a hazy day there is plenty of light around you, but no sharp hot spot.
- The heat boils water, and the steam spins a turbine, like a kettle driving a steam engine.
- The thermos keeps heat for later. Heat is cheap to store; electricity is not.

That is CSP: mirrors make heat, heat makes steam, steam makes electricity, and a hot "thermos" of molten salt lets it keep generating after sunset. Where the picture breaks: in a trough plant the mirrors do not boil water directly. They heat an oil loop, and the oil heats the salt and the steam through heat exchangers.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**Two main designs** concentrate the sun:

- **Parabolic trough** (the workhorse, about 75 % of installed CSP worldwide). Long curved mirrors in north-south rows track the sun east to west and focus it onto a **receiver tube** (a black steel pipe inside a vacuum glass tube). A **heat transfer fluid (HTF)**, usually synthetic oil, is heated from about 293 °C to 393 °C. Decades of bankable operating history.
- **Solar tower**. A field of flat, individually tracking mirrors (**heliostats**) focuses onto a receiver at the top of a tower, heating **molten salt** to about 565 °C. Hotter means a more efficient turbine and about three times more energy stored per tonne of salt, but fewer reference plants, and the hot tank has been the weak point (Noor III in Morocco and Crescent Dunes in the US both had long storage-related outages).

**Thermal energy storage (TES)**: two big insulated tanks of **solar salt** (60 % sodium nitrate, 40 % potassium nitrate). Daytime surplus heat moves salt from the cold tank (about 290 °C) to the hot tank; in the evening the hot salt gives its heat back to make steam. The stored heat is simply $E = m\,c_p\,\Delta T$, so a bigger temperature difference stores more. Salt freezes at about 238 °C, so pipes need **heat tracing** and a freeze-recovery procedure.

**Power block**: a **steam generator**, a **steam turbine** and a synchronous generator, exactly like a conventional steam station. Start-up takes 30 to 90 minutes, and the spinning generator gives the grid real inertia and fault current.

**Cooling**: the steam must be condensed. **Dry cooling** (air-cooled condensers) uses about 0.2 to 0.4 m³ of water per MWh instead of 3 to 3.5 m³ for wet cooling, but loses up to 7 to 10 % of output on the hottest afternoons (2 to 5 % over a year).

**CSP uses only DNI** (direct normal irradiance, the beam coming straight from the sun's disc). Mirrors cannot focus diffuse light, and dust and haze scatter the direct beam into diffuse light. Receiver heat losses stay roughly fixed, so a 10 % shortfall in annual DNI means roughly 12 to 15 % less electricity. KISR found that satellite DNI data diverge significantly from ground measurements in Kuwait, so any CSP yield must rest on **ground-measured DNI**.`,
      },
      { kind: "diagram", diagram: "parabolic-trough", caption: "Follow the heat: mirror, receiver tube, oil loop, then either the hot salt tank (store) or the steam generator, turbine and condenser. Storage sits between collecting and generating, which is the whole point of CSP." },
      { kind: "widget", widget: "thermal-storage", props: { massTonnes: 30000 }, caption: "Click the Trough preset and set the turbine to 50 MWe: about 30,000 t of salt stores roughly 1,200 MWh_th, close to 9 hours at full load (our estimate, not a Shagaya figure). Then click Tower: the same salt holds almost three times the energy." },
      {
        kind: "md",
        md: md`### Shagaya and what operators have learned

**Shagaya Phase I** was a 70 MW technology pilot developed by **KISR** with the then Ministry of Electricity and Water: 50 MW CSP trough, 10 MW PV and 10 MW wind. The CSP contractor was TSK (approved 2015) under a 6-year design-build-operate contract, so the original contractor operated it until about 2024 to 2025. Public sources confirm a trough with molten-salt storage but do not name the HTF; Track 0 assumes thermal oil, to be confirmed against the as-built design.

What the global CSP fleet (Noor Ouarzazate, Noor Energy 1 in Dubai and others) teaches:

- **Ramp-up** to design output takes 1 to 3 years; early yields of 60 to 85 % of P50 are common.
- **DNI shortfall** against satellite-based design data is a frequent cause of underperformance in dusty regions.
- **Tanks, receivers and steam generators** cause the longest outages.
- **O&M is heavy**: about 40 to 80 permanent staff for a 50 to 150 MW plant, against fewer than 10 for a similar PV plant.
- **Mirror cleaning** needs demineralised water (minerals leave spots); dust soils mirrors by 0.2 to 1 % reflectivity a day in dusty seasons, and dew turns dust into a crust.
- **Handover risk**: when a pilot plant leaves its O&M contract, knowledge, spares, passwords and the data historian can walk out with the contractor.`,
      },
      {
        kind: "callout",
        tone: "unverified",
        title: "Not public: ask, do not quote",
        md: md`Shagaya CSP's operating performance since 2019, its current operating status and operator, EPC partners beyond TSK, and whether the reported "up to about 225,000 MWh a year" covers the CSP alone or the whole 70 MW. If CSP alone, that would be a 51 % capacity factor (world-class); for 70 MW it is 37 %, which is more plausible.`,
      },
      {
        kind: "callout",
        tone: "kuwait",
        title: "Numbers you will hear",
        md: md`- **Shagaya CSP**: 50 MW trough, about 10 h molten-salt storage, quoted as 1,200 MWh_th (Worley), dry cooled; full operation from about February 2019 (sources differ). Source: IEA policy database, Reuters Events.
- **Storage check**: $1{,}200 \times 0.37 / 50 \approx 9$ h at full load, close to the quoted 10 h. Always ask whether storage hours are gross or net, at full or part load.
- **Trough** oil 293 to 393 °C, turbine cycle about 37 to 38 %; **tower** salt 290 to 565 °C, about 41 to 44 %.
- **Capacity factor**: 25 to 28 % without storage, 45 to 55 % with 10 h storage.
- **Later CSP**: the planned 200 MW / 5 h Phase 2 CSP plant was never procured; Shagaya Phase III zones are PV.`,
      },
    ],
    say: [
      "Is the yield based on ground-measured DNI with a P90, or on satellite data only?",
      "When you say 10 hours of storage, is that gross or net, at full load, and from usable or total salt?",
      "What is the turbine output at 48 °C ambient with dry cooling, compared with the design point?",
      "Since the design-build-operate period ended, who operates Shagaya CSP, and can we get monthly generation and measured DNI since 2019?",
      "What is the freeze-protection procedure if heat tracing fails?",
    ],
    trap: "Thinking CSP is 'PV with mirrors' that works on any sunny day. CSP turns sunlight into heat and then into electricity through a steam turbine, and it uses only the direct beam, so dust and haze that barely bother PV can cut CSP output sharply. Its real advantage is not efficiency but cheap heat storage that lets it generate after sunset.",
    check: [
      {
        id: "x-csp-c1",
        type: "mcq",
        prompt: md`Why does a CSP plant lose much more output than a PV plant on a hazy, dusty day?`,
        options: [
          "Mirrors can only focus the direct beam (DNI), and haze scatters the beam into diffuse light",
          "Dust blocks the steam turbine's air intake",
          "Molten salt freezes when the sky is hazy",
          "CSP mirrors are less reflective than PV modules",
        ],
        answer: 0,
        explanation: md`A mirror can only redirect rays arriving from a known direction, the sun's disc. Haze turns direct light into diffuse light, which PV can still use but CSP cannot. Because receiver losses stay roughly fixed, a 10 % DNI shortfall costs roughly 12 to 15 % of the electricity.`,
        concepts: ["m03.dni-only"],
        difficulty: 1,
      },
      {
        id: "x-csp-c2",
        type: "numeric",
        prompt: md`A trough plant's storage holds 1,200 MWh of heat. The turbine converts heat to electricity at 37 % and is rated 50 MW. How many hours can it run at full load from storage alone?`,
        answer: 8.88,
        tolerance: { abs: 0.2 },
        unit: "h",
        explanation: md`Electricity from storage $= 1{,}200 \times 0.37 = 444$ MWh. At 50 MW: $444 / 50 \approx 8.9$ h. That is close to, but not the same as, the "about 10 h" usually quoted for Shagaya, which is why you ask how storage hours are defined.`,
        concepts: ["m03.storage-energy", "m03.two-tank-storage"],
        difficulty: 2,
      },
      {
        id: "x-csp-c3",
        type: "decision",
        prompt: md`A colleague's briefing note says "Shagaya CSP produces 225,000 MWh a year". What do you do?`,
        options: [
          { text: "Leave it: the figure appears in published sources", score: 0, feedback: "The source does not say whether it covers the CSP alone or the whole 70 MW, nor whether it is a target or an actual." },
          { text: "Flag that it is a reported target of unclear scope (51 % CF if CSP only, 37 % if the whole 70 MW), and that actual output since 2019 is not public; ask KISR for the operating data", score: 1, feedback: "Right: separate verified facts from targets, show the sanity check, and go to the data owner." },
          { text: "Replace it with 50 MW × 8,760 h = 438,000 MWh", score: 0, feedback: "That assumes the plant runs at full output all year, which no plant does." },
          { text: "Delete all Shagaya numbers from the note", score: 0.3, feedback: "Safer than repeating it, but the reader loses useful context. Label the figure and its uncertainty instead." },
        ],
        explanation: md`$225{,}000 / (50 \times 8{,}760) = 51$ % and $225{,}000 / (70 \times 8{,}760) = 37$ %. A 51 % CF for a 10 h trough in a dusty site with dry cooling would be world-class, so the 70 MW reading is more plausible. Either way it is a reported target, not measured output.`,
        concepts: ["m03.shagaya-csp"],
        difficulty: 2,
      },
    ],
    deeper: ["m03-l01", "m03-l02", "m03-l03"],
  },

  // ------------------------------------------------------------------ 2. CSP vs PV + BESS
  {
    id: "x-csp-vs-pv-bess",
    day: 4,
    title: "CSP or PV with batteries for the evening peak?",
    minutes: 12,
    module: "m03",
    hook: "As PV covers Kuwait's afternoon peak, the hard hours move to the evening, when air conditioning keeps running after sunset. New capacity is going to PV with batteries, yet CSP proposals still appear, so you will be asked to explain why, and where CSP could still fit.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

You want hot water every evening. Two ways:

- **A solar water heater with a big insulated tank** (CSP). The collector and the plumbing are expensive, but making the tank bigger is cheap. Six hours or fourteen hours of hot water cost almost the same.
- **Buy cheap electricity at noon and store it in rechargeable batteries** (PV + BESS). The electricity is very cheap, but every extra hour of storage means buying another full set of batteries.

For a short evening, the batteries win. For hot water all night, the big tank starts to compete. Where the picture breaks: CSP stores heat, so its big conversion loss happens after the store, in the steam turbine (only about 37 to 40 % of heat becomes electricity), while a battery loses about 10 to 15 % on the round trip.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**Start from the service, not the technology.** "Which is cheaper, CSP or PV?" is the wrong question: PV wins every time. Kuwait's grid needs four services:

1. **Daytime energy** for the 11:00 to 17:00 summer peak (PV does this natively and cheaply).
2. **Evening and night energy** after sunset (needs storage or conventional plant).
3. **Firm capacity**: will the plant reliably be there at the annual peak hour?
4. **Grid support**: inertia, fault current, frequency and voltage control.

**Compare like with like.** One MWh at 13:00 in April is worth far less than one MWh at 21:00 in August. The fair test is the cost of delivering the **same profile**, for example "200 MW from 18:00 for 6 hours, every day".

**Why duration decides.** A CSP plant's cost is mostly the mirror field and the power block; each extra hour of salt storage is cheap. A battery's cost rises almost in step with its MWh. So at 2 to 4 h batteries win comfortably; somewhere around **8 to 12 h** CSP's cheap storage starts to compete. As battery prices fall, that crossover keeps moving out.

**The other factors**, roughly for a 100 MW class plant:

| | CSP with storage | PV + BESS |
|---|---|---|
| Construction | 3 to 4 years | 1.5 to 2.5 years |
| Modularity | Large lumps (50 to 200 MW units) | Add blocks as needed |
| O&M staff | 50 to 80 | 10 to 20 |
| Grid support | Real inertia and fault current | Very fast response; grid-forming possible |
| Technology risk | Moderate to high (tanks, receivers) | Low to moderate (fire safety, degradation) |
| Supply chain | Few suppliers | Deep and competitive |`,
      },
      { kind: "widget", widget: "csp-vs-pvbess", caption: "Start at 200 MW for 6 h and compare the two costs. Then drag the duration towards 12 to 14 h and raise the BESS capex: watch where the gap closes. These are screening numbers, not quotes." },
      {
        kind: "flow",
        title: "A technology decision a ministry can defend",
        steps: [
          { label: "Define the need", detail: "Hourly MW and MWh by season, firm capacity at peak, grid support, signed off with MEWRE system planning" },
          { label: "List the options", detail: "PV + BESS (4, 6, 8 h), CSP with storage, hybrid PV-CSP, gas as reference, imports" },
          { label: "Cost the same profile", detail: "Hourly simulation with local data: ground DNI, current battery prices" },
          { label: "Score non-cost criteria", detail: "Schedule, risk, water, staffing, grid support; weights agreed before scoring" },
          { label: "Test sensitivities", detail: "DNI, battery price, WACC, delay" },
          { label: "Decide and document", detail: "State what would change the answer; procure the service, not the technology" },
        ],
        caption: "The weights are policy choices. Agree them before the scores are known, or the result looks reverse-engineered.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Global cost trend (IRENA, 2010 to 2023)**: PV LCOE down about 90 % to about USD 0.04 to 0.05/kWh; CSP down about 70 % to about USD 0.12/kWh. Check the latest edition before quoting.
- **Records**: Gulf PV tariffs below USD 0.015/kWh (around 2020 to 2021); the record CSP tariff is about USD 0.073/kWh at Noor Energy 1 in Dubai (about 15 h storage, 35-year PPA).
- **Screening, illustrative**: CSP with 10 h storage about USD 115/MWh; PV-charged 6 h battery about USD 80 per evening MWh (PV energy about USD 15 to 20/MWh plus storage about USD 50 to 80/MWh delivered).
- **Kuwait**: the planned 200 MW / 5 h Phase 2 CSP plant was never procured; Shagaya Phase III zones procured by KAPP are PV, with battery storage planned separately (IEA policy database). MEWRE announced a 1 to 1.5 GW / 4 to 6 GWh battery project in November 2025 (verify).`,
      },
    ],
    say: [
      "Which delivery profile are we comparing, and is it the same for both options?",
      "What battery price and augmentation schedule did you assume, and from which recent tenders?",
      "At what storage duration does CSP become cheaper under your assumptions?",
      "How does the CSP case change if measured DNI is 10 % lower than the design data?",
      "Were the criteria weights agreed before the scores were known?",
    ],
    trap: "Comparing CSP's LCOE with PV's LCOE and concluding either 'CSP is hopeless' or 'CSP is dispatchable, so it is worth any premium'. A midday MWh and an evening MWh are different products: compare the cost of delivering the same profile. And 'dispatchable' is not yes or no: a 4 h battery is dispatchable for 4 hours, not overnight.",
    check: [
      {
        id: "x-csp-vs-pv-bess-c1",
        type: "mcq",
        prompt: md`Why does CSP become more competitive against PV + BESS as the required storage duration grows?`,
        options: [
          "Each extra hour of salt storage is cheap, while each extra battery hour costs almost a full set of cells",
          "Batteries cannot discharge for more than 4 hours",
          "CSP turbines become more efficient at night",
          "PV produces nothing on long summer days",
        ],
        answer: 0,
        explanation: md`CSP's cost sits mostly in the mirror field and power block; adding salt and tanks is cheap. Battery cost scales almost linearly with MWh. That is why the crossover sits around 8 to 12 h and moves out as battery prices fall.`,
        concepts: ["m03.pvbess-competition", "m03.csp-niche"],
        difficulty: 1,
      },
      {
        id: "x-csp-vs-pv-bess-c2",
        type: "numeric",
        prompt: md`A battery's capital and O&M cost works out at USD 62.7 per delivered MWh. It is charged with PV energy at USD 15/MWh, and its round-trip efficiency is 87 %. What is the total cost per evening MWh delivered?`,
        answer: 79.9,
        tolerance: { abs: 1 },
        unit: "USD/MWh",
        explanation: md`To deliver 1 MWh you must buy $1/0.87 = 1.149$ MWh of PV energy: $15 / 0.87 = 17.2$ USD. Total $62.7 + 17.2 \approx 79.9$ USD/MWh, against about USD 115/MWh for a 10 h CSP plant's average MWh in the Track 0 example.`,
        concepts: ["m03.lcoe-comparison"],
        difficulty: 2,
      },
      {
        id: "x-csp-vs-pv-bess-c3",
        type: "decision",
        prompt: md`A consultant's options paper shows "PV LCOE USD 18/MWh, CSP LCOE USD 115/MWh" and recommends PV for the evening peak. What do you ask for?`,
        options: [
          { text: "Nothing: the PV number is far lower", score: 0, feedback: "PV alone delivers nothing after sunset, so its LCOE does not answer the evening question." },
          { text: "A comparison of the cost of delivering the same evening profile (PV + BESS vs CSP with storage), with battery augmentation, current prices and sensitivities", score: 1, feedback: "Right: same service, same profile, current costs, then sensitivities." },
          { text: "Switch to CSP because it is dispatchable", score: 0, feedback: "Dispatchability has value, but you still need to cost it against PV + BESS for the same profile." },
          { text: "Ask for a lower discount rate to help CSP", score: 0, feedback: "Changing assumptions to reach a preferred answer is exactly what an auditor will spot." },
        ],
        explanation: md`LCOE comparisons are only valid for the same delivery profile. The fair test is, for example, "200 MW from 18:00 for 6 h every day", costed for each option including battery degradation and augmentation, then stress-tested on battery price, DNI and WACC.`,
        concepts: ["m03.technology-decision", "m03.dispatchability"],
        difficulty: 2,
      },
    ],
    deeper: ["m03-l04"],
  },

  // ------------------------------------------------------------------ 3. Wind
  {
    id: "x-wind",
    day: 4,
    title: "Wind power: why speed cubed changes everything",
    minutes: 13,
    module: "m04",
    hook: "Shagaya's five 2 MW turbines are Kuwait's only operating wind farm, with high published capacity factors thanks to strong summer shamal winds that blow just when demand peaks. If a wind IPP comes up, every argument will turn on wind speed, and in wind small speed errors become big energy errors.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Hold your hand out of a car window. At 50 km/h you feel a push; at 100 km/h the push is far more than double. Two things grow at once: each kilogram of air hits harder (kinetic energy goes with speed squared), and more kilograms arrive every second (flow goes with speed). Together: **power goes with speed cubed**.

- Double the wind speed: **8 times** the power.
- Add 10 % to the wind speed: **33 % more** power ($1.1^3 = 1.33$).

That single fact explains why wind people obsess over a few tenths of a metre per second.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

The power carried by the wind through the rotor's swept area is

$$P = \tfrac12 \rho A v^3$$

- $A$ is the **swept area** of the rotor, which grows with diameter squared: a rotor 1.5 times wider catches 2.25 times the power.
- $\rho$ is **air density**. Hot air is thinner: 1.225 kg/m³ at 15 °C, about 1.11 kg/m³ at 45 °C, so a Kuwaiti summer afternoon gives about 9 % less power at the same speed.
- $v$ is wind speed at hub height, and it is cubed.

**Betz limit, in plain words**: a turbine cannot take all the energy out of the wind. If it stopped the air completely, the air would pile up and no new air could flow through. The best any ideal rotor can capture is 16/27, about **59 %**. Real rotors reach a power coefficient of about 0.48 to 0.50, and wind-to-grid efficiency is about 42 to 46 %.

**Power curve**: a turbine starts at about 3 m/s (**cut-in**), reaches full output at about 11 to 13 m/s (**rated**), and shuts down at about 25 m/s (**cut-out**) to protect itself. Between cut-in and rated, the cube rules; above rated the blades pitch to cap output.

**Capacity factor** = energy actually produced ÷ (rated power × 8,760 hours).

**Weibull, in one sentence**: wind is never steady, so a Weibull curve, with a scale **c** (how windy) and a shape **k** (how spread out), describes how many hours a year the wind blows at each speed.

Because of the cube, the windy hours count far more than the calm ones. That is why the **cube of the average speed** badly underestimates energy: at Shagaya's 7.9 m/s, $\tfrac12 \rho \bar v^3$ gives about 271 W/m², while the correct average of the cubes (Weibull, k = 2) gives about 518 W/m², nearly double.`,
      },
      { kind: "widget", widget: "weibull", props: { k: 2, c: 8.9 }, caption: "c = 8.9 m/s with k = 2 gives a mean of about 7.9 m/s, Shagaya's long-term hub-height mean. Move k between 1.6 and 3: the mean barely moves, the energy does. Then set air temperature to 45 °C. The turbine is a generic 4.2 MW machine, not Shagaya's." },
      {
        kind: "md",
        md: md`### Kuwait's wind

Kuwait's wind is strongly **seasonal**: the summer **shamal** (north-westerly) blows steadily in the months when air-conditioning demand peaks, a valuable match. Shagaya's farm reached about 70 % capacity factor in summer months. An annual Weibull fit hides this, so ask for monthly fits or the measured time series.

The desert adds three design issues: **heat** (standard turbines give full power only up to about 35 to 40 °C, so specify a hot-climate package rated at least 45 °C), **sand erosion** of blade leading edges (costs 1 to 5 % of annual energy, so specify leading-edge protection) and **dust** in gearboxes, filters and seals. The 2014 masterplan foresaw 70 MW (Phase 2) and 127 MW (Phase 3) of wind; neither was procured.`,
      },
      {
        kind: "callout",
        tone: "kuwait",
        title: "Numbers you will hear",
        md: md`- **Shagaya Phase I wind**: 10 MW = five 2 MW turbines; Elecnor (about EUR 22.4 m); commissioned May 2017.
- **Resource**: 7.9 m/s long-term mean at 80 m hub height.
- **Performance (peer-reviewed study, about 2021)**: capacity factor 45.2 % in year 1 (about 40 GWh) and 42.1 % in year 2 (about 37 GWh); about 70 % in summer months. A KISR conference paper gives 42.59 GWh in year 1 and "21 % above" a 31.16 GWh contract figure, but those numbers do not add up (ratio 1.37, CF 48.6 %): verify before quoting.
- **Rules of thumb**: +10 % speed means +33 % power; air density 1.225 kg/m³ at 15 °C vs about 1.11 at 45 °C.
- **Betz limit** 59.3 %; good modern rotors about 48 to 50 %.`,
      },
    ],
    say: [
      "Is that power density from the cube of the mean speed, or the mean of the cubes?",
      "Do we have at least 12 months of on-site measurements including a full summer shamal season, correlated to a long-term reference?",
      "Is the power curve corrected for site air density, and what is the temperature derating above 40 °C?",
      "What wake loss and what P90 are assumed?",
      "Can KISR share the Shagaya SCADA data since 2017 as a long-term reference?",
    ],
    trap: "Treating average wind speed like average sunshine. Because power goes with the cube of speed, a 10 % error in mean wind speed is roughly a 30 % error in power, and two sites with the same mean speed can produce very different energy depending on how the speeds are spread (Weibull k). Always ask for the distribution and the site air density, not just the mean.",
    check: [
      {
        id: "x-wind-c1",
        type: "numeric",
        prompt: md`Wind speed at a turbine rises from 8 m/s to 10 m/s (both below rated speed). By what factor does the power in the wind increase?`,
        answer: 1.95,
        tolerance: { abs: 0.03 },
        unit: "×",
        explanation: md`$P \propto v^3$, so $(10/8)^3 = 1.25^3 = 1.95$. A 25 % rise in speed almost doubles the power.`,
        concepts: ["m04.wind-power-flux"],
        difficulty: 1,
      },
      {
        id: "x-wind-c2",
        type: "numeric",
        prompt: md`Shagaya's 10 MW wind farm produced about 37 GWh in its second year. What capacity factor is that, in %?`,
        answer: 42.2,
        tolerance: { abs: 0.5 },
        unit: "%",
        explanation: md`$37{,}000 \text{ MWh} / (10 \text{ MW} \times 8{,}760 \text{ h}) = 0.422$, about 42 %, consistent with the published 42.1 %. High for 2 MW-class turbines, thanks to the steady summer shamal.`,
        concepts: ["m04.shagaya-wind"],
        difficulty: 1,
      },
      {
        id: "x-wind-c3",
        type: "mcq",
        prompt: md`What does the Betz limit tell you?`,
        options: [
          "No rotor can capture more than about 59 % of the power in the wind, because the air must keep flowing through it",
          "Turbines must shut down above 25 m/s",
          "Turbines lose 59 % of their output in hot weather",
          "A wind farm's capacity factor cannot exceed 59 %",
        ],
        answer: 0,
        explanation: md`If the rotor stopped the air completely, no new air could pass through. The ideal maximum is 16/27, about 59.3 %; real rotors reach about 48 to 50 %. It says nothing about capacity factor, which depends on how often the wind blows (Shagaya reached about 70 % in summer months).`,
        concepts: ["m04.betz-limit"],
        difficulty: 1,
      },
    ],
    deeper: ["m04-l01", "m04-l02", "m04-l03"],
  },

  // ------------------------------------------------------------------ 4. BESS basics
  {
    id: "x-bess-basics",
    day: 4,
    title: "Batteries: MW is the tap, MWh is the tank",
    minutes: 13,
    module: "m05",
    hook: "MEWRE has announced a large battery programme for the evening peak (reported as 1 to 1.5 GW / 4 to 6 GWh, to be verified). Every bid, test and guarantee for it will be written in MW, MWh, hours, efficiency and depth of discharge, measured at some boundary. Mixing those up costs real money.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

A water tank with a tap.

- The **tank size** is the energy, in **MWh**: how much is stored.
- The **tap size** is the power, in **MW**: how fast it can flow in or out.
- **Duration** is how long a full tank lasts with the tap fully open: 2,000 MWh through a 500 MW tap lasts **4 hours**.

You never drain the tank to the last drop or fill it to the brim (that is the **depth of discharge**), and some water spills on the way in and on the way out (that is the **round-trip efficiency**). Where the picture breaks: a battery tank slowly shrinks with age and heat. That is the next explainer.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

A **battery energy storage system (BESS)** has two independent sizes:

- **Power (MW)**, set by the **PCS** (power conversion system: bidirectional inverters that turn the battery's DC into grid AC and back) and by how much current the cells can take.
- **Energy (MWh)**, set by how many cells you buy.

**Duration and C-rate** say the same thing two ways:

$$\text{duration (h)} = \frac{\text{energy (MWh)}}{\text{power (MW)}}, \qquad \text{C-rate} = \frac{1}{\text{duration}}$$

A 4-hour system runs at **0.25C**, a 2-hour system at 0.5C, a 1-hour system at 1C. Lower C-rate means less heat and slower aging, but more cells per MW.

**State of charge (SoC)** is how full the battery is. The battery management system keeps it inside a window, for example 2.5 to 97.5 %; the width of that window (here 95 %) is the **depth of discharge (DoD)**. Usable energy = nameplate × DoD × state of health.

**Round-trip efficiency (RTE)** = energy out ÷ energy in. The cells alone lose only 4 to 6 %, but every step to the grid loses a little more, and in a 50 °C summer the air conditioning (**auxiliaries**) runs all day.

**The boundary matters most.** Energy flows cells → PCS → transformers → **point of interconnection (POI)** revenue meter. A plant sold as "1,000 MWh" (DC nameplate) can deliver about 905 MWh at the POI. MEWRE only cares about the POI.

**The three brains**:

- **BMS** (battery management system): watches the voltage, current and temperature of every cell, estimates SoC and health, balances cells and opens contactors on a fault.
- **PCS**: does the conversion and the grid-code behaviour (reactive power, fault ride-through).
- **EMS** (energy management system): decides when to charge and discharge, following the control centre's dispatch.

**Chemistry: LFP vs NMC.** Both are lithium-ion.

- **LFP** (lithium iron phosphate): 3.2 V per cell, 6,000 to 10,000+ cycles, goes into thermal runaway later and releases no oxygen. Heavier, which does not matter for a stationary plant. The utility standard.
- **NMC** (nickel manganese cobalt): more energy per kg (220 to 280 vs 160 to 190 Wh/kg, good for cars), but 2,000 to 5,000 cycles and earlier runaway with oxygen release. Avoid for a Kuwaiti grid battery.

Today's standard is a 314 Ah LFP cell of about 1 kWh; a 20-ft container holds about 5 MWh.`,
      },
      { kind: "diagram", diagram: "bess", caption: "From cell to grid: cells, modules and racks (watched by the BMS), then the PCS and transformer, with HVAC, fire suppression and the EMS around them. Every step between the cell and the POI loses a little energy." },
      { kind: "widget", widget: "bess-sizing", props: { mw: 500, hours: 4 }, caption: "500 MW for 4 hours, the size of the reported first phase. Change DoD and RTE and watch the usable energy move." },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **0.25C (4 h)** is typical for evening energy shifting; Gulf procurements and MEWRE's reported plan sit there.
- **RTE at the POI**: about 90 % excluding auxiliaries, about 85 % including auxiliaries in a 50 °C summer. Cells alone: 94 to 96 %.
- **Usable energy** is usually guaranteed at about 90 to 95 % DoD.
- **LFP warranties**: about 6,000 to 8,000 equivalent full cycles or 15 to 20 years, whichever comes first.
- **Kuwait (verify before use)**: 1 to 1.5 GW / 4 to 6 GWh announced November 2025; sites at Al-Mutlaa and Jaber Al-Ahmad (1.5 GW) reported June 2026; first 500 MW targeted for summer 2027. Counterparty, procurement route and chemistry are unverified.`,
      },
    ],
    say: [
      "Is that MWh at the DC nameplate or at the POI revenue meter, and at what ambient temperature?",
      "Does the round-trip efficiency include auxiliaries such as the HVAC?",
      "What SoC window does the usable energy assume?",
      "Which cell, from which factory, and is a change of cell treated as a variation?",
      "Is the PCS rated to deliver full MW and the required reactive power at 50 °C?",
    ],
    trap: "Reading '500 MW / 2,000 MWh' as a single size, or assuming the MWh is what reaches the grid. MW and MWh are two separate ratings, and the MWh shrinks between the cells and the POI meter through the SoC window, conversion losses and auxiliaries: a plant sold as 1,000 MWh can deliver about 905 MWh at the POI. Pin every number to the POI, at 50 °C, with auxiliaries defined.",
    check: [
      {
        id: "x-bess-basics-c1",
        type: "numeric",
        prompt: md`A BESS is rated 300 MW / 1,200 MWh at the POI. What is its C-rate?`,
        answer: 0.25,
        tolerance: { abs: 0.01 },
        unit: "C",
        explanation: md`C-rate $= P / E = 300 / 1{,}200 = 0.25$C, i.e. a 4-hour system: the typical evening energy-shifting design.`,
        concepts: ["m05.c-rate", "m05.power-energy"],
        difficulty: 1,
      },
      {
        id: "x-bess-basics-c2",
        type: "numeric",
        prompt: md`A battery has 1,000 MWh of DC nameplate energy, a 95 % SoC window (DoD) and a state of health of 0.97 after its first year. How much usable DC energy does it have?`,
        answer: 921.5,
        tolerance: { abs: 2 },
        unit: "MWh",
        explanation: md`Usable $= 1{,}000 \times 0.95 \times 0.97 = 921.5$ MWh, before any conversion losses on the way to the POI.`,
        concepts: ["m05.soc-dod"],
        difficulty: 1,
      },
      {
        id: "x-bess-basics-c3",
        type: "mcq",
        prompt: md`Why do utility batteries in a hot climate like Kuwait's almost always use LFP rather than NMC?`,
        options: [
          "LFP lasts more cycles and goes into thermal runaway later, without releasing oxygen",
          "LFP stores more energy per kilogram",
          "NMC cannot be connected to the grid",
          "LFP needs no cooling",
        ],
        answer: 0,
        explanation: md`For a stationary plant, weight hardly matters, while cycle life and thermal stability do. LFP gives 6,000 to 10,000+ cycles and a later, oxygen-free runaway. It still needs good cooling: aging roughly doubles with every 10 °C.`,
        concepts: ["m05.lfp", "m05.nmc"],
        difficulty: 1,
      },
    ],
    deeper: ["m05-l01", "m05-l02", "m05-l03"],
  },

  // ------------------------------------------------------------------ 5. BESS life and safety
  {
    id: "x-bess-life-safety",
    day: 4,
    title: "Battery life, warranties and fire safety in 50 °C",
    minutes: 14,
    module: "m05",
    hook: "A battery that loses capacity or catches fire in its fifth summer is MEWRE's problem unless the contract says otherwise. Degradation, augmentation, warranty conditions and fire safety are where battery bids hide their risk, and Kuwait's 50 °C summers make every one of them harder.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Your phone battery. After two years it no longer lasts the day, and it ages faster if you leave it **fully charged in a hot car**. Heat, sitting full, and many charge cycles all wear it out. Now picture millions of such cells in steel containers in the Kuwaiti desert, with a contract that promises a fixed number of MWh every evening for 20 years.

Where the picture breaks: grid LFP cells are far more robust than phone cells, and air conditioning keeps them near 25 °C. The analogy tells you the direction of each effect, not its size.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**Degradation (capacity fade).** **State of health (SoH)** is today's capacity compared with new. A typical LFP plant loses 2 to 4 % in year 1, then about 1 to 2 % a year. Two mechanisms add up:

- **Calendar aging**: time, temperature and **sitting at high charge**. Aging roughly **doubles for every 10 °C** of cell temperature.
- **Cycle aging**: energy throughput, depth of discharge and C-rate.

Kuwait's duty is the worst case for calendar aging: charge from PV between 10:00 and 15:00, sit full through the afternoon heat, discharge from 18:00 to 22:00.

**Augmentation.** To keep the MWh at the POI for 20 years you either **overbuild** on day one, or **augment**: add new containers every 4 to 6 years. Augmenting is usually cheaper because cells get cheaper and money spent later is worth less, but only if someone creditworthy is obliged to do it and the land, feeder bays and EMS capacity were provided at COD.

**Warranty conditions.** A performance warranty reads "X years or Y equivalent full cycles (EFC), **whichever comes first**", and only holds inside an **operating window**: cell temperature, C-rate, SoC limits, rest SoC, data reporting. Extra cycling ends it sooner; weak cooling can void it. Product warranties (defects) run 2 to 5 years; an LTSA capacity guarantee at the POI runs 10 to 20 years.

**Thermal runaway.** A damaged or overheated cell heats up. Its internal layers break down (about 80 to 120 °C), the separator melts (about 130 to 165 °C), the cell short-circuits internally and **vents flammable, toxic gas** (rich in hydrogen for LFP, plus carbon monoxide and hydrogen fluoride). The gas may burn, or it may **build up unignited and explode** when someone opens a door. That is what injured several firefighters at McMicken, Arizona, in 2019.

**Defences, in layers**: BMS and HVAC to prevent; off-gas detection to warn early; a design where one cell cannot ignite its neighbours (proved by **UL 9540A** testing); **explosion control** (gas-triggered exhaust fans or roof vent panels); an emergency response plan agreed with the fire authority, with the rule **never open a gassing container**. Gas suppression alone knocks down flame but does not stop runaway or gas.

**Codes**: **NFPA 855** (installation and spacing), **UL 9540** (whole-system listing), **UL 9540A** (fire test method, not pass or fail), **IEC 62933-5-2** and **IEC 62619**. Track 0 found no BESS-specific Kuwaiti code, so these are adopted by reference in the specification.

**HVAC in desert heat.** The chiller must hold cells near 25 °C while dumping heat into 50 °C air. Its efficiency (COP) falls from about 4 at 35 °C to about 2.5 at 50 °C, and many standard units trip above about 52 °C. Kuwait's record is 53.9 °C (Mitribah, 2016), so specify 50 °C design with operation to 55 °C, N+1 redundancy, and sand-trap louvres and filters against shamal dust.`,
      },
      {
        kind: "chart",
        chart: "line",
        title: "Keeping 2,000 MWh at the POI for 20 years (Track 0 worked example)",
        xKey: "year",
        xLabel: "Year of operation (5+ = just after augmenting)",
        yLabel: "Effective DC capacity (MWh)",
        series: [
          { key: "none", label: "2,513 MWh, no augmentation" },
          { key: "aug", label: "With augmentation at years 5, 10, 15" },
          { key: "need", label: "Needed for 2,000 MWh at POI" },
        ],
        data: [
          { year: "0", none: 2513, aug: 2513, need: 2261 },
          { year: "1", none: 2438, aug: 2438, need: 2261 },
          { year: "2", none: 2397, aug: 2397, need: 2261 },
          { year: "3", none: 2357, aug: 2357, need: 2261 },
          { year: "4", none: 2317, aug: 2317, need: 2261 },
          { year: "5", none: 2277, aug: 2277, need: 2261 },
          { year: "5+", none: 2277, aug: 2482, need: 2261 },
          { year: "6", none: 2237, aug: 2435, need: 2261 },
          { year: "7", none: 2196, aug: 2392, need: 2261 },
          { year: "8", none: 2156, aug: 2348, need: 2261 },
          { year: "9", none: 2116, aug: 2305, need: 2261 },
          { year: "10", none: 2076, aug: 2261, need: 2261 },
          { year: "10+", none: 2076, aug: 2501, need: 2261 },
          { year: "11", none: 2036, aug: 2451, need: 2261 },
          { year: "12", none: 1995, aug: 2403, need: 2261 },
          { year: "13", none: 1955, aug: 2356, need: 2261 },
          { year: "14", none: 1915, aug: 2309, need: 2261 },
          { year: "15", none: 1875, aug: 2261, need: 2261 },
          { year: "15+", none: 1875, aug: 2523, need: 2261 },
          { year: "16", none: 1834, aug: 2467, need: 2261 },
          { year: "17", none: 1794, aug: 2416, need: 2261 },
          { year: "18", none: 1754, aug: 2364, need: 2261 },
          { year: "19", none: 1714, aug: 2313, need: 2261 },
          { year: "20", none: 1674, aug: 2261, need: 2261 },
        ],
        caption: "Fade of 3 % in year 1, then 1.6 % a year. Without augmentation the plant falls short from year 6; adding 205, 240 and 261 MWh at years 5, 10 and 15 keeps it above the line, at about USD 100 m less (present value) than overbuilding 3,395 MWh on day one.",
      },
      { kind: "widget", widget: "bess-sizing", props: { mw: 500, hours: 4 }, caption: "Switch the strategy between overbuild and augmentation, then raise the fade rate (a hotter battery): see how much extra energy each strategy needs." },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Fade**: 2 to 4 % in year 1, then about 1 to 2 %/yr; stationary LFP is typically warranted to about 60 to 70 % SoH at end of life.
- **Heat**: aging about ×2 per +10 °C; specifications ask for cells at 20 to 30 °C with no more than 3 to 5 K spread.
- **Warranty limit**: 20 years or 7,300 EFC at 1.3 cycles a day lasts only $7{,}300 / (1.3 \times 365) \approx 15.4$ years.
- **HVAC**: about 42 kW of cooling per 5 MWh container at 50 °C; COP about 4 at 35 °C, about 2.5 at 50 °C; Kuwait record 53.9 °C (Mitribah, 2016, WMO).
- **Gas**: in the Track 0 example, 4 venting LFP cells reach 25 % of the lower flammable limit in a 20-ft container, which is why explosion control is mandatory.`,
      },
    ],
    say: [
      "Show me the degradation table for our duty: one cycle a day, sitting full in the afternoon, at the cell temperature your HVAC actually holds in August.",
      "Who is obliged to augment, at whose cost and with what security, and are the land, feeder bays and EMS capacity provided at COD?",
      "Is the UL 9540A report for this exact cell, module and layout?",
      "Is the HVAC rated for 50 °C with N+1, and what happens at 55 °C?",
      "Has the emergency response plan been agreed and drilled with the fire authority before energisation?",
    ],
    trap: "Believing a 20-year warranty means 20 years of capacity. Warranties end at the first of years or throughput, and only hold if the plant stays inside its operating window, so extra cycling or weak cooling can shorten or void them. A second trap: believing a gas suppression system makes a battery safe. It knocks down flame but does not stop runaway or gas venting, so propagation-resistant design, explosion control and the emergency plan matter more.",
    check: [
      {
        id: "x-bess-life-safety-c1",
        type: "numeric",
        prompt: md`A capacity warranty covers "20 years or 7,300 equivalent full cycles, whichever comes first". The operator adds frequency services, raising cycling to 1.3 cycles a day. After how many years does the warranty end?`,
        answer: 15.4,
        tolerance: { abs: 0.2 },
        unit: "years",
        explanation: md`$7{,}300 / (1.3 \times 365) = 15.4$ years: almost five years of cover lost. Check the throughput limit before adding services, or negotiate a higher cycle cap.`,
        concepts: ["m05.warranty"],
        difficulty: 2,
      },
      {
        id: "x-bess-life-safety-c2",
        type: "mcq",
        prompt: md`A battery container's gas detectors alarm and the gas suppression system has discharged. Why must responders not open the door?`,
        options: [
          "Unburnt flammable vent gas may have built up, and fresh air or a spark can make it explode",
          "Opening the door voids the warranty",
          "The suppression agent is too cold to touch",
          "The BMS will restart the container",
        ],
        answer: 0,
        explanation: md`Suppression knocks down flame but does not stop cells venting hydrogen-rich gas. At McMicken (2019) firefighters opened the door hours later and the accumulated gas deflagrated. Hence explosion control (exhaust or vent panels) and an emergency plan that forbids early entry.`,
        concepts: ["m05.thermal-runaway", "m05.explosion-control"],
        difficulty: 1,
      },
      {
        id: "x-bess-life-safety-c3",
        type: "decision",
        prompt: md`The cheapest bid offers containers whose HVAC is rated for 45 °C ambient, "since Kuwait rarely exceeds 50 °C". What do you do?`,
        options: [
          { text: "Accept: 45 °C covers most of the year", score: 0, feedback: "The battery is needed most on the hottest evenings. A chiller tripping at peak means lost capacity, hot cells, faster aging and fire risk." },
          { text: "Require HVAC rated at 50 °C design with operation to 55 °C, N+1, dust filtration, and check the degradation table and warranty assume the cell temperatures this HVAC can actually hold", score: 1, feedback: "Right: specify for Kuwait's climate and tie cooling, aging and warranty together." },
          { text: "Accept, but add a bigger fire suppression system", score: 0, feedback: "Suppression does not fix the cause. Cooling is the first barrier against both aging and runaway." },
          { text: "Ask the bidder to promise to operate only at night", score: 0.2, feedback: "The containers sit in the sun all day, and charging from PV happens at midday." },
        ],
        explanation: md`Kuwait's record is 53.9 °C; COP falls to about 2.5 at 50 °C and many standard units trip above about 52 °C. Aging roughly doubles per 10 °C, and warranties only hold inside the stated cell-temperature window.`,
        concepts: ["m05.desert-hvac", "m05.capacity-fade"],
        difficulty: 2,
      },
    ],
    deeper: ["m05-l04", "m05-l05"],
  },

  // ------------------------------------------------------------------ 6. Grid code and connection
  {
    id: "x-grid-code-connection",
    day: 4,
    title: "Connecting a plant: the grid code and interconnection studies",
    minutes: 14,
    module: "m06",
    hook: "A plant earns nothing until it is connected, and the connection is where schedules slip: studies, models, witnessed tests and the line itself. Kuwait has no published renewable grid code that Track 0 could verify, so knowing what a grid code normally asks lets you ask MEWRE Transmission the right questions.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

A plant joining the grid is like a new driver joining a motorway. You need a licence and you must follow the rules:

- Drive within the limits (**operating ranges** of frequency and voltage).
- Do not slam on the brakes when something happens ahead (**fault ride-through**: stay connected through a short disturbance).
- Help keep traffic flowing (**frequency response**) and give way when asked (**reactive power** for voltage).
- No sudden swerves (**ramp rates**), and keep your exhaust clean (**power quality**).

Before you are allowed on, the highway authority checks that the junction can take your traffic (**interconnection studies**). When the road is jammed, you are held on the on-ramp (**curtailment**).`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

A **grid code** is the technical contract between every connected plant and the system operator. Inverters do not naturally behave like spinning generators, so the code makes them do deliberately what generators do by physics. Typical requirements (values from international comparators such as ENTSO-E RfG and IEEE 2800):

- **Operating ranges**: stay connected, for example 49.0 to 51.0 Hz continuously and 0.90 to 1.05 pu voltage at 400 kV, with wider bands for limited times. A plant that trips during an excursion turns a disturbance into a blackout.
- **Fault ride-through (FRT)**: a transmission fault drops voltage over a wide area for about 100 ms. The plant must stay connected, even down to 0 pu for about 150 ms, and inject **reactive current** to prop up voltage. Mass PV tripping has lost gigawatts in real events.
- **Reactive power**: typically 0.95 power factor leading and lagging at the **POI**, about ±0.33 × Pmax, across 0.90 to 1.10 pu voltage, and in Kuwait it must hold at 50 °C.
- **Active power and ramp rates**: follow the control centre's set-point; ramp no faster than about 10 % of Pmax per minute. PV can hold back upward ramps, but a cloud or dust front pulling output down needs storage.
- **Frequency response**: cut output when frequency is high (from about 50.2 Hz, with a **droop** of 2 to 12 %); raise output when it is low, which needs headroom or a battery.
- **Power quality**: limits on harmonics, flicker and unbalance (IEEE 519: total harmonic distortion at most 1.5 % above 161 kV).
- **Models and tests**: validated simulation models and witnessed on-site tests.

**Interconnection studies** prove the network can take the plant:

- **Load flow**: voltages and line loadings in normal and single-outage (N-1) cases. In Kuwait, **winter midday** (low load, strong sun) is as critical as the summer peak, plus the evening with batteries discharging.
- **Short circuit**: fault levels against switchgear ratings.
- **Stability (RMS) and EMT**: does the plant ride through faults; are its controls stable on a weak grid?
- **Harmonics** and **protection coordination**.

**Curtailment risk**: when the grid cannot take the power, the control centre caps output. Causes: a grid constraint, system security, oversupply, grid unavailability or a late grid connection. In typical PPAs these are compensated as **deemed energy** (what the plant could have produced), sometimes above an annual allowance; curtailment caused by the plant itself is not.`,
      },
      {
        kind: "flow",
        title: "From connection request to compliance",
        steps: [
          { label: "Connection requirements", detail: "Issued by MEWRE Transmission; for a KAPP IPP, in the RFP and PPA schedules" },
          { label: "Interconnection studies", detail: "Developer's consultant runs them; MEWRE reviews" },
          { label: "Validated models", detail: "RMS and EMT models from the inverter maker, checked against type tests" },
          { label: "Unit certificates", detail: "Inverter and controller type tests, including fault ride-through" },
          { label: "Compliance plan", detail: "Test list, procedures, acceptance criteria, witnesses" },
          { label: "Witnessed site tests", detail: "Reactive capability, voltage steps, set-point and ramp, frequency response, power quality" },
          { label: "Compliance and monitoring", detail: "Certificate, then re-tests after any firmware change" },
        ],
        caption: "Models and studies run in parallel with design. A missing EMT model or a late study can hold the whole energisation date.",
      },
      { kind: "widget", widget: "droop", props: { droop: 4 }, caption: "Lower the grid frequency and watch the plant's output move along the droop line once outside the deadband. A PV plant can only add power if it is running with headroom; a battery can do it either way." },
      {
        kind: "callout",
        tone: "unverified",
        title: "Kuwait: what is not public",
        md: md`No published Kuwaiti grid code for renewable or inverter-based plants was found. Requirements are likely written into RFP technical schedules, the PPA and connection agreements with MEWRE's Transmission sector. Kuwait's solar IPPs use a 30-year PPA with MEWRE (confirmed), but the curtailment allowance and deemed-energy method are not public. Obtain MEWRE's current requirements before relying on any value.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Reactive power**: 0.95 PF at the POI means $Q = P \tan(\arccos 0.95) = 0.329\,P$, so 100 MW needs about ±33 Mvar.
- **Fault ride-through**: about 0 pu retained voltage for about 150 ms; protection clears 400 kV faults in about 80 to 120 ms.
- **Ramp**: at most about 10 % of Pmax per minute; over-frequency response from about 50.2 Hz with 2 to 12 % droop.
- **Droop example**: a 500 MW battery with 4 % droop and a ±0.2 Hz deadband gives 50 MW at 49.6 Hz (100 MW without the deadband).
- **Harmonics**: THD at most 1.5 % on buses above 161 kV (IEEE 519).`,
      },
    ],
    say: [
      "Which grid code or comparator applies, and where exactly are the requirements written: RFP schedules, PPA or connection agreement?",
      "Is the reactive capability stated at the POI, at 50 °C, across 0.90 to 1.10 pu?",
      "Do the studies cover winter midday, the evening battery case and the neighbouring plants together?",
      "Are the RMS and EMT models validated by the inverter maker, and who re-tests after a firmware update?",
      "Which curtailment is compensable, and how is the available energy estimated and logged?",
    ],
    trap: "Thinking a grid connection is just a cable to the substation. The grid code makes the plant behave like a good citizen during faults and frequency events, and proving it takes studies, validated models and witnessed tests that often sit on the critical path. Second trap: assuming Kuwait has a published renewable grid code. Track 0 found none, so the requirements must come from MEWRE Transmission and the contract schedules.",
    check: [
      {
        id: "x-grid-code-connection-c1",
        type: "mcq",
        prompt: md`What does "fault ride-through" require of a PV or battery plant?`,
        options: [
          "Stay connected through a short voltage dip caused by a grid fault, and inject reactive current to support the voltage",
          "Disconnect within 100 ms of any fault to protect the inverters",
          "Restart automatically after a blackout",
          "Ride through dust storms without losing output",
        ],
        answer: 0,
        explanation: md`A transmission fault depresses voltage over a wide area for about 100 ms. If thousands of inverters tripped at once, a local fault would become a system-wide loss of generation. The code makes them stay on and help.`,
        concepts: ["m06.frt", "m06.grid-code"],
        difficulty: 1,
      },
      {
        id: "x-grid-code-connection-c2",
        type: "numeric",
        prompt: md`A 400 MW plant must provide reactive power at 0.95 power factor (lagging) at the POI at full output. How many Mvar is that?`,
        answer: 131.5,
        tolerance: { abs: 1.5 },
        unit: "Mvar",
        explanation: md`$Q = P \tan(\arccos 0.95) = 400 \times 0.3287 \approx 131.5$ Mvar. The inverters must deliver more than this, because transformers between them and the POI absorb reactive power, and they must do it at 50 °C.`,
        concepts: ["m06.reactive-capability"],
        difficulty: 2,
      },
      {
        id: "x-grid-code-connection-c3",
        type: "decision",
        prompt: md`The developer's load-flow study for a large Shagaya PV plant covers only the summer peak. What do you ask for?`,
        options: [
          { text: "Nothing: summer peak is the worst case in Kuwait", score: 0, feedback: "At summer midday PV mostly feeds local load. Winter midday, with low load and strong sun, is when exports can overload corridors and raise voltages." },
          { text: "Add winter midday and the evening battery-discharge case, with N-1 outages and neighbouring plants included", score: 1, feedback: "Right: the binding case is often winter midday, and studies must be cumulative with nearby plants." },
          { text: "Ask for a harmonic study instead", score: 0.3, feedback: "Harmonics matter too, but they do not replace the missing load-flow cases." },
          { text: "Accept and plan to curtail the plant if problems appear", score: 0, feedback: "Unplanned curtailment may be compensable deemed energy, so the cost lands on the offtaker." },
        ],
        explanation: md`Studies must cover the conditions that stress the network: summer peak, winter midday (low load, high PV, low inertia and fault level) and the evening peak with batteries discharging, in normal and N-1 cases, together with neighbouring plants.`,
        concepts: ["m06.load-flow", "m06.curtailment"],
        difficulty: 2,
      },
    ],
    deeper: ["m06-l02", "m06-l04", "m06-l03"],
  },

  // ------------------------------------------------------------------ 7. PPC, SCADA, energisation
  {
    id: "x-ppc-scada",
    day: 4,
    title: "The plant's brain: power plant controller, SCADA and energisation",
    minutes: 13,
    module: "m06",
    hook: "The day a plant is first energised and the control centre sends its first set-point is the day every interface is tested at once. Controllers, SCADA, telecoms, protection settings and cyber security are where commissioning stalls, often because two contracts each assumed the other was responsible.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

An orchestra. Hundreds of musicians (the **inverters**) cannot each take instructions from the festival director (the **control centre**). The **conductor** (the power plant controller) listens to the overall sound in the hall (the **point of interconnection**) and adjusts each section until it matches the programme the director sent. The written programme and the phone line between conductor and director are **SCADA and telecoms**. Guards decide who may go backstage (**cyber security**). Opening night follows a strict rehearsal sequence (**energisation**).

Where the picture breaks: when something sudden happens, such as a grid fault, each musician reacts by reflex in milliseconds. The inverters ride through faults on their own; the conductor is too slow for that.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**Power plant controller (PPC).** A closed-loop controller that measures P, Q, voltage and frequency **at the POI**, receives set-points from the control centre, and sends new set-points to every inverter or battery PCS every 100 to 200 ms. Its jobs:

- Follow the active-power set-point or curtailment (within about 1 minute, to about ±1 to 2 % of Pmax).
- Limit ramp rates; give frequency response.
- Control voltage (with a slope), or reactive power, or power factor, as the control centre chooses.
- Share P and Q between PV and battery, manage the battery's charge, and never exceed the POI limit.

**SCADA** (supervisory control and data acquisition) sees, logs and commands everything in the plant, in layers:

- **Field**: inverters, PCS, BMS, trackers, weather stations, protection relays, meters.
- **Plant network**: fibre rings across the site.
- **Plant control**: SCADA servers and screens, the PPC, the battery EMS, the **historian** (the data archive).
- **Gateway**: talks to the control centre, usually with the **IEC 60870-5-104** protocol. Inside substations, **IEC 61850** links relays, with fast GOOSE trip messages in about 4 ms.
- **Telecoms**: **OPGW** (optical fibre inside the earth wire of the 400 kV line) plus a backup path.
- **Control centre**: MEWRE's national energy management system (state estimation, automatic generation control, dispatch).

A **signal list** fixes what the plant sends (P, Q, V, f, breaker positions, available power, battery charge, alarms) and receives (P set-point, voltage or Q set-point, mode commands). Agree it early: if the control centre's database is not ready, the plant cannot be dispatched at COD.

**Cyber security basics (IEC 62443)**: split the plant into zones with firewalls between them; a buffer zone (DMZ) between plant controls and any outside network; remote access for manufacturers only through a jump host with multi-factor login and time-limited approval; default passwords changed; no 4G modem left behind after commissioning. The 2015 and 2016 attacks on Ukraine's grid used stolen credentials and remote access to open breakers.

**Energisation** turns a construction site into a live power system, under a switching programme approved by MEWRE's control centre, with **hold points**: nothing proceeds until each is signed off.`,
      },
      {
        kind: "flow",
        title: "Energisation hold points, in order",
        steps: [
          { label: "Protection settings", detail: "Approved by MEWRE and tested" },
          { label: "SCADA and telecoms", detail: "Point-to-point checks with the control centre; teleprotection working" },
          { label: "Metering", detail: "Revenue meters commissioned and sealed" },
          { label: "Switching programme", detail: "Approved; site moves to live safety rules" },
          { label: "Back-feed HV", detail: "Energise the 400 kV bus and transformers from the grid, then soak (often 24 h)" },
          { label: "MV, then inverters", detail: "Energise collector feeders progressively; sync inverters block by block; PPC tests at low power" },
          { label: "Witnessed tests", detail: "Reactive capability, voltage steps, set-point and ramp, frequency response" },
          { label: "Trial run, then COD", detail: "Reliability run, then commercial operation once PPA conditions are met" },
        ],
        caption: "Each box is a hold point. The classic delay on the day: relay settings calculated by the contractor but never approved by MEWRE.",
      },
      { kind: "widget", widget: "substation-sld", caption: "Click the breakers, disconnectors, CTs, VTs and relays: these are the devices the protection settings, SCADA points and switching programme all refer to." },
      {
        kind: "callout",
        tone: "kuwait",
        title: "Separate contracts, shared critical path",
        md: md`Shagaya Phase III Zone 1's IPP scope includes a 400 kV substation, while MEWRE awarded the Shagaya to Al-Wafra 400 kV line separately (Power Grid Company, KD 48.6 m, March 2026). OPGW commissioning and the remote-end protection at Al-Wafra therefore sit on the energisation critical path of both projects. MEWRE's control-centre protocol profile, signal-list template and any national OT cyber rules were not found in Track 0's sources: obtain them before specifying (unverified).`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **PPC**: control loop every 100 to 200 ms; follows a set-point within about 1 minute, to ±1 to 2 % of Pmax; voltage control reaches 90 % of a step in about 1 to 5 s.
- **Protocols**: IEC 60870-5-104 (TCP port 2404) plant to control centre; IEC 61850 GOOSE trips in about 4 ms.
- **Protection**: 400 kV faults cleared in about 80 to 120 ms; inverters give only about 1.1 to 1.2 pu fault current (a synchronous generator gives 5 to 7 pu), so the export line uses line differential protection over fibre.
- **Revenue metering**: class 0.2S meters and CTs, main and check meters at the POI.`,
      },
    ],
    say: [
      "Has the signal list been agreed with the control centre, and will their database be ready for our plant before COD?",
      "Who splices and tests the OPGW, and who sets the remote-end protection at the grid station? Is that on both programmes?",
      "Have MEWRE approved the protection settings, or only received them?",
      "After COD, how does the inverter maker get remote access: jump host, multi-factor login, time-limited approval?",
      "Which tests in the compliance plan prove the PPC follows the POI set-point and ramp limits?",
    ],
    trap: "Thinking the control centre talks to each inverter, or that the PPC handles faults. The control centre sends one set-point to the PPC, which measures at the POI and steers hundreds of inverters; fast events like fault ride-through are handled by each inverter on its own in milliseconds. And SCADA is not just a screen: the signal list, telecoms and cyber rules are contract deliverables with their own place on the critical path.",
    check: [
      {
        id: "x-ppc-scada-c1",
        type: "mcq",
        prompt: md`Where does a power plant controller measure the quantities it controls?`,
        options: [
          "At the point of interconnection, where the grid code requirements apply",
          "At each inverter's terminals",
          "At the control centre",
          "At the DC side of the batteries",
        ],
        answer: 0,
        explanation: md`The grid code and the PPA apply at the POI, so the PPC closes its loop there: it compares measured P, Q and voltage at the POI with the set-point and adjusts the inverters to make up for transformer and cable losses in between.`,
        concepts: ["m06.ppc"],
        difficulty: 1,
      },
      {
        id: "x-ppc-scada-c2",
        type: "mcq",
        prompt: md`Which of these must be in place before the HV substation is first back-fed from the grid?`,
        options: [
          "Protection settings approved by MEWRE and tested, with SCADA point-to-point checks done",
          "PPC closed-loop tests at full power",
          "The trial run",
          "The final grid-code compliance certificate",
        ],
        answer: 0,
        explanation: md`Protection approval and testing, SCADA and telecom checks, metering and an approved switching programme are prerequisites. PPC tests, witnessed compliance tests and the trial run all come after energisation.`,
        concepts: ["m06.energisation", "m06.scada-architecture"],
        difficulty: 1,
      },
      {
        id: "x-ppc-scada-c3",
        type: "decision",
        prompt: md`At COD the inverter maker asks to keep the 4G router it used during commissioning, "so we can support you remotely". What do you do?`,
        options: [
          { text: "Agree: fast support is valuable", score: 0, feedback: "A modem bypassing the firewalls is exactly the path used in real grid attacks." },
          { text: "Remove it; provide remote access only through the DMZ jump host with multi-factor login, session recording and time-limited approval, as IEC 62443 practice requires", score: 1, feedback: "Right: support stays possible, but through a controlled, logged path." },
          { text: "Keep it but change its password", score: 0.2, feedback: "Better than nothing, but it still bypasses the zones and monitoring." },
          { text: "Ban all remote access for 30 years", score: 0.3, feedback: "Secure but impractical: you will need manufacturer support. Control it instead." },
        ],
        explanation: md`IEC 62443 organises the plant into zones and conduits with a DMZ to outside networks. Remote access goes through a jump host with MFA and approval; rogue modems are a classic finding in audits.`,
        concepts: ["m06.cybersecurity"],
        difficulty: 1,
      },
    ],
    deeper: ["m06-l03", "m06-l05"],
  },
];
