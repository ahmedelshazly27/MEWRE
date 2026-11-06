import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 the 30-minute conversation
  {
    id: "mz08-duration-crate",
    name: "Duration and C-rate",
    tex: String.raw`h = \frac{E}{P}, \qquad C = \frac{P}{E} = \frac{1}{h}`,
    vars: [
      { sym: "h", meaning: "Duration at rated power", unit: "h" },
      { sym: "E", meaning: "Energy capacity (state the boundary: POI or DC nameplate)", unit: "MWh" },
      { sym: "P", meaning: "Rated power (state the boundary)", unit: "MW" },
      { sym: "C", meaning: "C-rate", unit: "1/h" },
    ],
    explanation: md`A 100 MW / 400 MWh system is a 4-hour, 0.25C system. Always say at which boundary: the same plant is 0.27C on its DC nameplate and 0.25C at the meter. Energy shifting is 0.25C to 0.5C; frequency services run near 1C.`,
    lesson: "mz08-l01",
  },
  {
    id: "mz08-quick-nameplate",
    name: "Quick DC nameplate from a POI energy requirement",
    tex: String.raw`E_{DC} = \frac{E_{POI}}{\eta_{d}\; w_{SoC}\; SoH_{min}}`,
    vars: [
      { sym: "E_{DC}", meaning: "Beginning-of-life DC nameplate energy to install", unit: "MWh" },
      { sym: "E_{POI}", meaning: "Energy the buyer requires at the point of interconnection per discharge", unit: "MWh" },
      { sym: String.raw`\eta_{d}`, meaning: "One-way discharge efficiency from cells to POI, including discharge-time auxiliaries", unit: "fraction (typically 0.93 to 0.95)" },
      { sym: "w_{SoC}", meaning: "Usable SoC window (depth of discharge)", unit: "fraction (typically 0.90 to 0.95)" },
      { sym: "SoH_{min}", meaning: "State-of-health floor kept by augmentation, or end-of-life SoH if overbuilt", unit: "fraction (0.90 with augmentation; 0.70 to 0.80 overbuilt)" },
    ],
    explanation: md`The meeting-room version of Track 0's full sizing chain (formula m05-dc-nameplate). With 0.94, 0.95 and 0.90 the multiplier is about 1.24: every MWh promised at the meter needs about 1.24 MWh of cells on day one. Use it to sanity-check a quote in the room, never to bid.`,
    lesson: "mz08-l01",
  },
  {
    id: "mz08-charge-energy",
    name: "Charging energy at the POI",
    tex: String.raw`E_{ch} = \frac{E_{POI}}{RTE_{POI}}`,
    vars: [
      { sym: "E_{ch}", meaning: "Energy drawn at the POI (from PV or grid) to deliver one full discharge", unit: "MWh" },
      { sym: "E_{POI}", meaning: "Energy delivered at the POI per discharge", unit: "MWh" },
      { sym: "RTE_{POI}", meaning: "Round-trip efficiency measured at the POI, auxiliaries included", unit: "fraction (typically 0.83 to 0.87 in Gulf summer)" },
    ],
    explanation: md`The PV plant (or grid) must supply this every day. On a dusty week it may not, which is where soiling analytics and BESS dispatch meet.`,
    lesson: "mz08-l01",
  },
  {
    id: "mz08-linear-fade",
    name: "Linear capacity-fade estimate",
    tex: String.raw`SoH_n \approx 1 - n\left(f_{cal} + f_{cyc}\,\frac{N}{1000}\right)`,
    vars: [
      { sym: "SoH_n", meaning: "State of health after n years", unit: "fraction" },
      { sym: "n", meaning: "Operating years", unit: "years" },
      { sym: "f_{cal}", meaning: "Calendar fade per year", unit: "fraction/yr (about 0.01 for LFP at 25 °C cell temperature)" },
      { sym: "f_{cyc}", meaning: "Cycle fade per 1,000 equivalent full cycles", unit: "fraction per 1,000 EFC (about 0.025)" },
      { sym: "N", meaning: "Equivalent full cycles per year", unit: "EFC/yr" },
    ],
    explanation: md`A seller's first-order estimate, the same model as the bess-sizing widget. Real fade is faster in year 1 and depends on temperature, SoC and C-rate (Track 0 m05-l02 and m05-l04). With 1 %/yr calendar and 2.5 % per 1,000 cycles at 365 cycles, fade is about 1.9 %/yr.`,
    lesson: "mz08-l01",
  },
  {
    id: "mz08-augmentation",
    name: "Augmentation needed to restore the sizing basis",
    tex: String.raw`\Delta E_{aug} = E_{DC} - E_{DC}\,SoH_n = E_{DC}\,(1 - SoH_n)`,
    vars: [
      { sym: String.raw`\Delta E_{aug}`, meaning: "New nameplate to add (first approximation, new cells at SoH 1)", unit: "MWh" },
      { sym: "E_{DC}", meaning: "Original nameplate", unit: "MWh" },
      { sym: "SoH_n", meaning: "State of health of the original fleet at year n", unit: "fraction" },
    ],
    explanation: md`Restores the fleet to its year-0 usable energy. In practice the added units also fade, the integrator plans space, PCS headroom and cable bays for them from day one, and new units may be a different cell generation that the EMS must balance.`,
    lesson: "mz08-l01",
  },
  // ---------------------------------------------------------------- l02 Kuwait programme
  {
    id: "mz08-pool-value",
    name: "Value of a supply pool",
    tex: String.raw`V = E \times c \times 1000`,
    vars: [
      { sym: "V", meaning: "Value of the pool", unit: "USD" },
      { sym: "E", meaning: "Energy (POI or DC, state which)", unit: "MWh" },
      { sym: "c", meaning: "Price per kWh on the same basis", unit: "USD/kWh" },
    ],
    explanation: md`The 1000 converts MWh to kWh. Always match bases: a DC-block price per kWh DC applied to POI MWh understates the pool by about 20 to 25 %. Prices here are illustrative; market prices move fast and differ between DC block, turnkey and EPC scope.`,
    lesson: "mz08-l02",
  },
  {
    id: "mz08-ltsa-pool",
    name: "Annual LTSA and O&M pool",
    tex: String.raw`V_{LTSA} = k \times V_{capex}`,
    vars: [
      { sym: "V_{LTSA}", meaning: "Annual long-term service agreement value (excluding augmentation hardware)", unit: "USD/yr" },
      { sym: "k", meaning: "Annual service fee as a share of capex (illustrative 1 to 2.5 %)", unit: "fraction/yr" },
      { sym: "V_{capex}", meaning: "Installed capex of the plant", unit: "USD" },
    ],
    explanation: md`Recurring service revenue is where a local partner earns over 15 to 20 years: preventive maintenance, spares, HVAC, capacity testing and response. The share k is an illustrative range, not a market quote.`,
    lesson: "mz08-l02",
  },
  // ---------------------------------------------------------------- l03 integrators and desert
  {
    id: "mz08-pcs-derating",
    name: "PCS derating with ambient temperature",
    tex: String.raw`S(T) = S_{rated}\,\bigl[1 - d\,(T - T_0)\bigr] \quad (T > T_0)`,
    vars: [
      { sym: "S(T)", meaning: "Available PCS apparent power at ambient T", unit: "MVA" },
      { sym: "S_{rated}", meaning: "Datasheet rating up to the derating knee", unit: "MVA" },
      { sym: "d", meaning: "Derating slope (read from the datasheet curve)", unit: "1/°C" },
      { sym: "T", meaning: "Ambient temperature at the unit", unit: "°C" },
      { sym: "T_0", meaning: "Temperature where derating starts (often 40 to 45 °C)", unit: "°C" },
    ],
    explanation: md`Kuwait design ambient is about 50 °C, and higher next to hot containers. Count PCS units at the derated value, never the headline value. Datasheet curves are often stepwise; use the curve, not a straight line, in a real bid.`,
    lesson: "mz08-l03",
  },
  {
    id: "mz08-aux-share",
    name: "Auxiliary energy share",
    tex: String.raw`a = \frac{\bar{P}_{aux}\times 24}{E_{POI}}`,
    vars: [
      { sym: "a", meaning: "Daily auxiliary energy as a share of energy delivered", unit: "fraction" },
      { sym: String.raw`\bar{P}_{aux}`, meaning: "Average auxiliary load over the day (HVAC, chillers, BMS, fire systems)", unit: "MW" },
      { sym: "E_{POI}", meaning: "Energy delivered at the POI per day", unit: "MWh/day" },
    ],
    explanation: md`In a Gulf summer the chillers run all day, even when the battery is idle. A bid quoting RTE without auxiliaries hides this share, which can be several percent of throughput.`,
    lesson: "mz08-l03",
  },
  {
    id: "mz08-warranty-life",
    name: "Years until a throughput-capped warranty is exhausted",
    tex: String.raw`n_{w} = \min\!\left(Y,\; \frac{EFC_{cap}}{N}\right)`,
    vars: [
      { sym: "n_w", meaning: "Years the capacity warranty actually covers", unit: "years" },
      { sym: "Y", meaning: "Warranty term in years", unit: "years" },
      { sym: "EFC_{cap}", meaning: "Throughput cap in equivalent full cycles", unit: "EFC" },
      { sym: "N", meaning: "Equivalent full cycles per year in the planned dispatch", unit: "EFC/yr" },
    ],
    explanation: md`A "20-year, 7,300-cycle" warranty is 20 years only at one cycle a day. Stacking frequency response or a second daily cycle exhausts it years early.`,
    lesson: "mz08-l03",
  },
  // ---------------------------------------------------------------- l04 analytics add-on
  {
    id: "mz08-deferral-value",
    name: "Value of deferring an augmentation by one year",
    tex: String.raw`\Delta V = C_{aug}\left(1 - \frac{1 - g}{1 + r}\right)`,
    vars: [
      { sym: String.raw`\Delta V`, meaning: "Present-value saving from buying the augmentation one year later", unit: "USD" },
      { sym: "C_{aug}", meaning: "Cost of the augmentation if bought now", unit: "USD" },
      { sym: "g", meaning: "Expected annual decline in the price of the augmentation hardware", unit: "fraction/yr" },
      { sym: "r", meaning: "Discount rate", unit: "fraction/yr" },
    ],
    explanation: md`If the measured fade is slower than the conservative model, the owner can augment later. With g = 0 this is just the time value of money. The deferral is only real if the capacity guarantee is still met, which is exactly what measured state of health tells you.`,
    lesson: "mz08-l04",
  },
];

export default formulas;
