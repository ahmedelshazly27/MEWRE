import { md, type Formula } from "../../schema";

export const formulas: Formula[] = [
  {
    id: "m12-yields",
    name: "Final and reference yield (IEC 61724-1)",
    tex: String.raw`Y_f = \frac{E_{AC}}{P_0}, \qquad Y_r = \frac{H_{POA}}{G_{STC}}`,
    vars: [
      { sym: "Y_f", meaning: "Final (specific) yield", unit: "kWh/kWp" },
      { sym: "Y_r", meaning: "Reference yield (equivalent hours at 1 kW/m²)", unit: "h" },
      { sym: String.raw`E_{AC}`, meaning: "AC energy delivered", unit: "kWh" },
      { sym: "P_0", meaning: "Nameplate DC power at STC", unit: "kWp" },
      { sym: String.raw`H_{POA}`, meaning: "Plane-of-array irradiation", unit: "kWh/m²" },
      { sym: String.raw`G_{STC}`, meaning: "Reference irradiance, 1 kW/m²", unit: "kW/m²" },
    ],
    explanation: md`Normalising by $P_0$ lets plants of any size be compared. Annual $Y_f$ for Kuwaiti bifacial trackers ≈ 2,100–2,300 kWh/kWp.`,
    lesson: "m12-l01",
  },
  {
    id: "m12-pr",
    name: "Performance ratio",
    tex: String.raw`PR = \frac{Y_f}{Y_r}`,
    vars: [
      { sym: "PR", meaning: "Performance ratio", unit: "-" },
      { sym: "Y_f", meaning: "Final yield", unit: "kWh/kWp" },
      { sym: "Y_r", meaning: "Reference yield", unit: "h" },
    ],
    explanation: md`Captures all losses between POA irradiance and the meter. Desert tracker plants: ~0.78–0.83 annual; lower in summer. Always state whether curtailment is included.`,
    lesson: "m12-l01",
  },
  {
    id: "m12-pr-temp-corrected",
    name: "Temperature-corrected PR",
    tex: String.raw`PR_{T} = \frac{\sum_i E_{AC,i}}{\sum_i P_0\,\frac{G_{POA,i}}{G_{STC}}\,\big[1+\gamma\,(T_{cell,i}-T_{ref})\big]\,\Delta t}`,
    vars: [
      { sym: String.raw`\gamma`, meaning: "Power temperature coefficient (e.g. −0.0030 /°C)", unit: "1/°C" },
      { sym: String.raw`T_{cell,i}`, meaning: "Cell temperature in interval i", unit: "°C" },
      { sym: String.raw`T_{ref}`, meaning: "Reference temperature (25 °C or annual average cell temperature)", unit: "°C" },
      { sym: String.raw`\Delta t`, meaning: "Interval length", unit: "h" },
    ],
    explanation: md`Removes the seasonal temperature signal so month-to-month and year-to-year trends reveal degradation, soiling and faults.`,
    lesson: "m12-l01",
  },
  {
    id: "m12-availability-time",
    name: "Time-based availability",
    tex: String.raw`A_t = 1 - \frac{\sum_k P_k\, t_{down,k}}{\sum_k P_k\, t_{period}}`,
    vars: [
      { sym: "A_t", meaning: "Time-based availability", unit: "-" },
      { sym: "P_k", meaning: "Rated power of unit k (weighting)", unit: "kW" },
      { sym: String.raw`t_{down,k}`, meaning: "Non-excluded downtime of unit k during daylight", unit: "h" },
      { sym: String.raw`t_{period}`, meaning: "Daylight hours in the period (e.g. POA > 50 W/m²)", unit: "h" },
    ],
    explanation: md`Simple but treats all hours equally. Must use daylight hours, not 24 h, and evidenced exclusions.`,
    lesson: "m12-l01",
  },
  {
    id: "m12-availability-energy",
    name: "Energy-based availability",
    tex: String.raw`A_E = \frac{E_{act}}{E_{act} + E_{lost}}`,
    vars: [
      { sym: "A_E", meaning: "Energy-based availability", unit: "-" },
      { sym: String.raw`E_{act}`, meaning: "Actual energy (excluding excluded-event periods per contract)", unit: "MWh" },
      { sym: String.raw`E_{lost}`, meaning: "Modelled energy lost to non-excluded unavailability", unit: "MWh" },
    ],
    explanation: md`Weights downtime by its energy value; preferred in modern O&M contracts and PPAs. Requires an agreed lost-energy method (e.g. reference inverters' specific yield).`,
    lesson: "m12-l01",
  },
  {
    id: "m12-capacity-factor",
    name: "Capacity factor",
    tex: String.raw`CF = \frac{E}{P_{rated}\cdot T}`,
    vars: [
      { sym: "E", meaning: "Energy in the period", unit: "MWh" },
      { sym: String.raw`P_{rated}`, meaning: "Rated capacity (state AC or DC)", unit: "MW" },
      { sym: "T", meaning: "Hours in the period (8,760 per year)", unit: "h" },
    ],
    explanation: md`Kuwaiti tracker PV ≈ 30–34 % on AC basis (DC/AC ~1.3), ≈ 23–26 % on DC basis.`,
    lesson: "m12-l01",
  },
];
