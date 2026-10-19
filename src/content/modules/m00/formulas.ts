import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01
  {
    id: "m00-load-factor",
    name: "System load factor",
    tex: String.raw`LF = \frac{E_{\text{annual}}}{P_{\text{peak}} \times 8760}`,
    vars: [
      { sym: "LF", meaning: "Load factor", unit: "–" },
      { sym: String.raw`E_{\text{annual}}`, meaning: "Annual energy served", unit: "MWh" },
      { sym: String.raw`P_{\text{peak}}`, meaning: "Annual peak demand", unit: "MW" },
    ],
    explanation: md`How "peaky" demand is. Cooling-dominated Gulf systems sit around 0.5–0.6; industrial systems 0.7–0.8. A low LF means capacity built for a few hundred hours per year — the most expensive MW to keep, and the ones solar + storage can displace.`,
    lesson: "m00-l01",
  },
  {
    id: "m00-available-capacity",
    name: "Available capacity at peak",
    tex: String.raw`C_{\text{avail}} = \sum_i C_{\text{inst},i}\,(1 - f_{\text{out},i})\,(1 - f_{\text{derate},i}(T))`,
    vars: [
      { sym: String.raw`C_{\text{avail}}`, meaning: "Capacity available at the peak hour", unit: "MW" },
      { sym: String.raw`C_{\text{inst},i}`, meaning: "Installed (nameplate) capacity of unit i", unit: "MW" },
      { sym: String.raw`f_{\text{out},i}`, meaning: "Fraction out on forced or planned outage", unit: "–" },
      { sym: String.raw`f_{\text{derate},i}(T)`, meaning: "Output loss at ambient temperature T", unit: "–" },
    ],
    explanation: md`Kuwait: ~21 GW installed but ~17 GW available (Rystad), a combined loss of about 19%. Gas turbines lose roughly 0.5–0.7%/°C above 15 °C (generic; use OEM curves).`,
    lesson: "m00-l01",
  },
  {
    id: "m00-reserve-margin",
    name: "Reserve margin",
    tex: String.raw`RM = \frac{C_{\text{avail}} - P_{\text{peak}}}{P_{\text{peak}}}`,
    vars: [
      { sym: "RM", meaning: "Reserve margin", unit: "– (often %)" },
      { sym: String.raw`C_{\text{avail}}`, meaning: "Available capacity (incl. firm imports)", unit: "MW" },
      { sym: String.raw`P_{\text{peak}}`, meaning: "Peak demand", unit: "MW" },
    ],
    explanation: md`Planning targets are typically +10–20% on available capacity. Kuwait June 2025: (16.275 − 16.98)/16.98 ≈ −4.2%.`,
    lesson: "m00-l01",
  },
  {
    id: "m00-heat-rate-efficiency",
    name: "Heat rate and efficiency",
    tex: String.raw`\eta = \frac{3600}{HR}`,
    vars: [
      { sym: String.raw`\eta`, meaning: "Net electrical efficiency", unit: "–" },
      { sym: "HR", meaning: "Heat rate (fuel energy per kWh generated)", unit: "kJ/kWh" },
    ],
    explanation: md`1 kWh = 3,600 kJ. Old steam ~10,500 kJ/kWh (34%); modern CCGT ~6,300–7,500 kJ/kWh (48–57%).`,
    lesson: "m00-l01",
  },
  {
    id: "m00-fuel-burn",
    name: "Fuel burn from generation",
    tex: String.raw`Q_{\text{fuel}} = E \cdot HR, \qquad N_{\text{bbl}} = \frac{E \cdot HR}{e_{\text{bbl}}}`,
    vars: [
      { sym: String.raw`Q_{\text{fuel}}`, meaning: "Fuel energy consumed", unit: "GJ" },
      { sym: "E", meaning: "Electricity generated", unit: "kWh" },
      { sym: "HR", meaning: "Heat rate", unit: "GJ/kWh" },
      { sym: String.raw`N_{\text{bbl}}`, meaning: "Barrels of oil equivalent", unit: "bbl" },
      { sym: String.raw`e_{\text{bbl}}`, meaning: "Energy per barrel (~6.1 GJ, 5.8 MMBtu)", unit: "GJ/bbl" },
    ],
    explanation: md`Use it to turn MWh into barrels or MMBtu, then into money. 1 MMBtu = 1.055 GJ.`,
    lesson: "m00-l01",
  },
  // ---------------------------------------------------------------- l02
  {
    id: "m00-approval-path",
    name: "Expected duration of an approval chain with rework",
    tex: String.raw`E[T] = \sum_{i=1}^{n} \frac{t_i}{1 - p_i}`,
    vars: [
      { sym: "E[T]", meaning: "Expected total duration of the sequential chain", unit: "weeks" },
      { sym: "t_i", meaning: "Nominal review time of step i", unit: "weeks" },
      { sym: "p_i", meaning: "Probability step i returns the file for rework", unit: "–" },
    ],
    explanation: md`Geometric number of review cycles per step (mean 1/(1−p)). Conservative because resubmissions are often faster. Lesson: reduce p (complete files) before trying to reduce t.`,
    lesson: "m00-l02",
  },
  // ---------------------------------------------------------------- l03
  {
    id: "m00-unit-subsidy",
    name: "Unit electricity subsidy",
    tex: String.raw`s = c_{\text{supply}} - t`,
    vars: [
      { sym: "s", meaning: "Subsidy per kWh", unit: "fils/kWh" },
      { sym: String.raw`c_{\text{supply}}`, meaning: "Cost of supply per kWh delivered", unit: "fils/kWh" },
      { sym: "t", meaning: "Tariff paid by the customer", unit: "fils/kWh" },
    ],
    explanation: md`Kuwait: t = 2 fils for citizens; cost-of-supply estimates 14–38 fils, so s ≈ 12–36 fils/kWh.`,
    lesson: "m00-l03",
  },
  {
    id: "m00-fiscal-subsidy",
    name: "Fiscal subsidy across customer classes",
    tex: String.raw`S = \sum_k E_k\,(c_{\text{supply}} - t_k)`,
    vars: [
      { sym: "S", meaning: "Annual subsidy borne by the state", unit: "KWD/yr" },
      { sym: "E_k", meaning: "Annual consumption of class k", unit: "kWh/yr" },
      { sym: "t_k", meaning: "Tariff of class k", unit: "KWD/kWh" },
    ],
    explanation: md`Sum over citizens, apartments, commercial, industrial/agricultural. Use a cost-of-supply range; no official current figure exists in the sources.`,
    lesson: "m00-l03",
  },
  {
    id: "m00-fuel-value-kwh",
    name: "Value of displaced fuel per kWh",
    tex: String.raw`v = HR \times p_{\text{fuel}}`,
    vars: [
      { sym: "v", meaning: "Fuel cost avoided per kWh", unit: "USD/kWh" },
      { sym: "HR", meaning: "Heat rate of the displaced (marginal) unit", unit: "GJ/kWh" },
      { sym: String.raw`p_{\text{fuel}}`, meaning: "Fuel price at opportunity cost", unit: "USD/GJ" },
    ],
    explanation: md`Crude USD 70/bbl in a 10.5 MJ/kWh steam unit ≈ USD 0.12/kWh (≈37 fils); LNG USD 12/MMBtu in a 7.5 MJ/kWh CCGT ≈ USD 0.085/kWh (≈26 fils).`,
    lesson: "m00-l03",
  },
  {
    id: "m00-annual-energy",
    name: "Annual energy from capacity factor",
    tex: String.raw`E = P \cdot CF \cdot 8760`,
    vars: [
      { sym: "E", meaning: "Annual energy", unit: "MWh/yr" },
      { sym: "P", meaning: "Rated capacity (state AC or DC!)", unit: "MW" },
      { sym: "CF", meaning: "Capacity factor on the same basis as P", unit: "–" },
    ],
    explanation: md`Always state whether P is MWac or MWp and use a CF on the same basis; for real projects use the P50 yield from the energy yield assessment instead.`,
    lesson: "m00-l03",
  },
  // ---------------------------------------------------------------- l04
  {
    id: "m00-re-share",
    name: "Renewable energy share",
    tex: String.raw`\sigma_{RE} = \frac{E_{RE}}{E_{\text{tot}}}`,
    vars: [
      { sym: String.raw`\sigma_{RE}`, meaning: "Renewable share of electricity", unit: "–" },
      { sym: String.raw`E_{RE}`, meaning: "Annual renewable generation", unit: "MWh/yr" },
      { sym: String.raw`E_{\text{tot}}`, meaning: "Total annual generation", unit: "MWh/yr" },
    ],
    explanation: md`Kuwait's 15%/30% targets are energy shares, not capacity shares. Always check which.`,
    lesson: "m00-l04",
  },
  {
    id: "m00-capacity-for-share",
    name: "Capacity required for an energy-share target",
    tex: String.raw`P_{RE} = \frac{\sigma\,E_{\text{tot}}}{CF \times 8760}`,
    vars: [
      { sym: String.raw`P_{RE}`, meaning: "Renewable capacity required", unit: "MW" },
      { sym: String.raw`\sigma`, meaning: "Target share", unit: "–" },
      { sym: String.raw`E_{\text{tot}}`, meaning: "Total annual generation", unit: "MWh/yr" },
      { sym: "CF", meaning: "Renewable capacity factor", unit: "–" },
    ],
    explanation: md`15% of an illustrative 84 TWh at CF 0.25 ≈ 5.75 GW of PV; 30% ≈ 11.5 GW. Include demand growth to the target year.`,
    lesson: "m00-l04",
  },
];

export default formulas;
