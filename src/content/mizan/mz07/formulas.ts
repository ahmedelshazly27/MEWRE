import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 system numbers
  {
    id: "mz07-reserve-margin",
    name: "Reserve margin on available capacity",
    tex: String.raw`RM = \frac{C_{\text{avail}} - P_{\text{peak}}}{P_{\text{peak}}}`,
    vars: [
      { sym: "RM", meaning: "Reserve margin", unit: "fraction (×100 for %)" },
      { sym: String.raw`C_{\text{avail}}`, meaning: "Capacity reliably available at the peak hour (after outages and heat derating)", unit: "GW" },
      { sym: String.raw`P_{\text{peak}}`, meaning: "Peak demand, on a stated basis", unit: "GW" },
    ],
    explanation: md`Use available, never installed, capacity. MEES reported 16.98 GW peak against 16.275 GW available in June 2025: $RM \approx -4.2\%$. Track 0 m00-l01 derives it in full; here it frames why a firm summer MW is valuable.`,
    lesson: "mz07-l01",
  },
  {
    id: "mz07-firm-loss",
    name: "Firm peak-hour MW lost to soiling",
    tex: String.raw`\Delta P_{\text{firm}} = P_{\text{ac}}\, f_{\text{peak}}\, L_s`,
    vars: [
      { sym: String.raw`\Delta P_{\text{firm}}`, meaning: "Output missing at the system peak hour because of soiling", unit: "MW" },
      { sym: String.raw`P_{\text{ac}}`, meaning: "Plant AC export capacity", unit: "MWac" },
      { sym: String.raw`f_{\text{peak}}`, meaning: "Clean-plant output at the peak hour as a fraction of AC capacity (heat, sun angle)", unit: "fraction" },
      { sym: "L_s", meaning: "Soiling loss fraction on that day (1 minus soiling ratio)", unit: "fraction" },
    ],
    explanation: md`A seller's translation of a soiling percentage into the unit the dispatcher and the ministry care about in summer: MW at 15:00 to 16:00 in July and August.`,
    lesson: "mz07-l01",
  },
  // ---------------------------------------------------------------- l02 grid code
  {
    id: "mz07-ramp-rate",
    name: "Ramp rate as a share of rated power",
    tex: String.raw`r = \frac{\Delta P / \Delta t}{P_{\text{rated}}} \le r_{\max}`,
    vars: [
      { sym: "r", meaning: "Ramp rate normalised to rated power", unit: "%/min" },
      { sym: String.raw`\Delta P`, meaning: "Change in plant active power at the POI", unit: "MW" },
      { sym: String.raw`\Delta t`, meaning: "Time over which the change happens", unit: "min" },
      { sym: String.raw`P_{\text{rated}}`, meaning: "Plant rated (contracted) power", unit: "MW" },
      { sym: String.raw`r_{\max}`, meaning: "Ramp limit from the connection requirements (often about 10 %/min in comparator codes; Kuwait value not public)", unit: "%/min" },
    ],
    explanation: md`A plant-wide stow, a mass tracker move or a cleaning pass that shades many rows at once is an active-power event at the POI. If the drop is faster than $r_{\max}$, the control layer must stagger it.`,
    lesson: "mz07-l02",
  },
  {
    id: "mz07-p-headroom",
    name: "Active power left after a reactive obligation",
    tex: String.raw`P_{\max} = \sqrt{S_{\text{inv}}^2 - Q_{\text{inv}}^2}`,
    vars: [
      { sym: String.raw`P_{\max}`, meaning: "Maximum active power the inverter fleet can deliver", unit: "MW" },
      { sym: String.raw`S_{\text{inv}}`, meaning: "Inverter fleet apparent-power rating at the actual ambient (derated in heat)", unit: "MVA" },
      { sym: String.raw`Q_{\text{inv}}`, meaning: "Reactive power the inverters must supply: POI requirement plus transformer and cable reactive losses", unit: "Mvar" },
    ],
    explanation: md`When the operator asks for Mvar on a hot afternoon, inverters give up MW. The data shows a flat top that looks like clipping or derating, not soiling. Track 0 m06-l02 does the full reactive-capability check.`,
    lesson: "mz07-l02",
  },
  // ---------------------------------------------------------------- l03 confounders
  {
    id: "mz07-available-power",
    name: "Available power from reference inverters",
    tex: String.raw`P_{\text{avail}} = N \cdot \frac{1}{n}\sum_{i=1}^{n} P_{\text{ref},i}`,
    vars: [
      { sym: String.raw`P_{\text{avail}}`, meaning: "Estimated power the plant could have produced without the constraint", unit: "MW" },
      { sym: "N", meaning: "Number of inverters of the same type and DC loading in the plant (in service)", unit: "-" },
      { sym: "n", meaning: "Number of unconstrained reference inverters", unit: "-" },
      { sym: String.raw`P_{\text{ref},i}`, meaning: "Output of reference inverter i, kept out of the curtailment", unit: "MW" },
    ],
    explanation: md`One common deemed-energy method. It only works if the reference inverters are as clean, as available and as well oriented as the rest of the plant. Soiling bias in the references flows straight into the deemed-energy payment.`,
    lesson: "mz07-l03",
  },
  {
    id: "mz07-curtailed-energy",
    name: "Curtailed energy",
    tex: String.raw`E_{\text{curt}} = \sum_{t \in \mathcal{C}} \left( P_{\text{avail}}(t) - P_{\text{meas}}(t) \right) \Delta t`,
    vars: [
      { sym: String.raw`E_{\text{curt}}`, meaning: "Energy not delivered because of curtailment", unit: "MWh" },
      { sym: String.raw`\mathcal{C}`, meaning: "Set of intervals flagged as curtailed (set-point below available power)", unit: "-" },
      { sym: String.raw`P_{\text{meas}}`, meaning: "Metered export at the POI", unit: "MW" },
      { sym: String.raw`\Delta t`, meaning: "Interval length", unit: "h" },
    ],
    explanation: md`The same flags that compute this energy for the PPA are the flags a soiling model needs to exclude those intervals.`,
    lesson: "mz07-l03",
  },
  {
    id: "mz07-pr-confounded",
    name: "Observed PR with curtailment and outages",
    tex: String.raw`PR_{\text{obs}} = PR_{0}\; SR \; (1 - c)\; A_E`,
    vars: [
      { sym: String.raw`PR_{\text{obs}}`, meaning: "Performance ratio computed from metered energy", unit: "-" },
      { sym: String.raw`PR_{0}`, meaning: "Clean, unconstrained, temperature-corrected PR", unit: "-" },
      { sym: "SR", meaning: "Soiling ratio (soiled over clean output)", unit: "-" },
      { sym: "c", meaning: "Fraction of available energy curtailed in the window", unit: "-" },
      { sym: "A_E", meaning: "Energy-based availability in the window", unit: "-" },
    ],
    explanation: md`A simplified multiplicative model. Every factor except SR also pushes PR down, so an unfiltered PR series attributes curtailment and outages to soiling. Filter first, then fit soiling.`,
    lesson: "mz07-l03",
  },
  {
    id: "mz07-availability",
    name: "Time-based and energy-based availability",
    tex: String.raw`A_T = \frac{T - T_{\text{unav}}}{T}, \qquad A_E = \frac{E_{\text{meas}}}{E_{\text{meas}} + E_{\text{lost,unav}}}`,
    vars: [
      { sym: "A_T", meaning: "Time-based availability", unit: "-" },
      { sym: "T", meaning: "Period considered (often daylight hours only)", unit: "h" },
      { sym: String.raw`T_{\text{unav}}`, meaning: "Hours the plant or unit was unavailable, by contract definition", unit: "h" },
      { sym: "A_E", meaning: "Energy-based availability", unit: "-" },
      { sym: String.raw`E_{\text{lost,unav}}`, meaning: "Energy lost while units were unavailable", unit: "MWh" },
    ],
    explanation: md`O&M contracts often guarantee one of these. A unit that is "available" by contract but dirty still loses energy: availability guarantees do not capture soiling, which is why soiling sits in the PR guarantee or nowhere.`,
    lesson: "mz07-l03",
  },
  // ---------------------------------------------------------------- l04 value split
  {
    id: "mz07-value-split",
    name: "Who captures the value of recovered energy",
    tex: String.raw`V_{\text{IPP}} = \Delta E \cdot p_{\text{PPA}}, \qquad V_{\text{state}} = \Delta E \cdot \frac{HR}{e_{\text{bbl}}} \cdot p_{\text{oil}}`,
    vars: [
      { sym: String.raw`\Delta E`, meaning: "Energy recovered by better cleaning or control", unit: "kWh" },
      { sym: String.raw`p_{\text{PPA}}`, meaning: "PPA tariff paid to the IPP", unit: "USD/kWh" },
      { sym: "HR", meaning: "Heat rate of the displaced thermal unit", unit: "GJ/kWh" },
      { sym: String.raw`e_{\text{bbl}}`, meaning: "Energy per barrel of crude (about 6.12 GJ)", unit: "GJ/bbl" },
      { sym: String.raw`p_{\text{oil}}`, meaning: "Opportunity value of a barrel (export price)", unit: "USD/bbl" },
    ],
    explanation: md`The IPP sees the tariff; the state sees displaced liquid fuel. Mizan's buyer differs by which of the two values the decision owner captures. See mz04-l02 for the full treatment.`,
    lesson: "mz07-l04",
  },
];

export default formulas;
