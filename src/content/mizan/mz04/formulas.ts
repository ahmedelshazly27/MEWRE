import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 one cleaning
  {
    id: "mz04-lost-energy-cycle",
    name: "Energy lost in one cleaning cycle (linear soiling)",
    tex: String.raw`\Delta E_{\text{cycle}} = \int_0^{T} E_d\, s\, t \,\mathrm{d}t = \tfrac{1}{2}\, E_d\, s\, T^2`,
    vars: [
      { sym: String.raw`\Delta E_{\text{cycle}}`, meaning: "Energy lost to soiling between two cleanings", unit: "MWh" },
      { sym: "E_d", meaning: "Clean-plant daily energy (annual energy / 365, or the season's value)", unit: "MWh/day" },
      { sym: "s", meaning: "Soiling rate: loss fraction added per day", unit: "1/day (0.4 %/day = 0.004)" },
      { sym: "T", meaning: "Cleaning interval", unit: "days" },
    ],
    explanation: md`The loss fraction grows as $L(t) = s\,t$, so the lost energy is the area of a triangle with base $T$ and height $sT$, times $E_d$. Because the area grows with $T^2$, doubling the interval quadruples the energy lost per cycle but only doubles it per year (half as many cycles). Valid while the loss stays below any saturation level and $s$ is roughly constant.`,
    lesson: "mz04-l01",
  },
  {
    id: "mz04-annual-cost",
    name: "Annual cost of a cleaning interval",
    tex: String.raw`J(T) = \frac{365\,C}{T} + p\,E\,\frac{s\,T}{2}`,
    vars: [
      { sym: "J(T)", meaning: "Annual cleaning cost plus value of energy lost", unit: "USD/yr" },
      { sym: "C", meaning: "Cost of one full-plant cleaning cycle", unit: "USD" },
      { sym: "p", meaning: "Value of one MWh to the decision maker (tariff, fuel value...)", unit: "USD/MWh" },
      { sym: "E", meaning: "Clean-plant annual energy", unit: "MWh/yr" },
      { sym: "s", meaning: "Soiling rate", unit: "1/day" },
      { sym: "T", meaning: "Cleaning interval", unit: "days" },
    ],
    explanation: md`First term: cleanings per year times cost per cleaning. Second term: average loss fraction $sT/2$ times annual energy times value. One term falls with $T$, the other rises: a classic economic order quantity shape with a single minimum.`,
    lesson: "mz04-l01",
  },
  {
    id: "mz04-optimal-interval",
    name: "Optimal cleaning interval (square-root rule)",
    tex: String.raw`T^{*} = \sqrt{\frac{2\,C}{p\,E_d\,s}}`,
    vars: [
      { sym: "T^{*}", meaning: "Cost-minimising cleaning interval", unit: "days" },
      { sym: "C", meaning: "Cost per full cleaning cycle", unit: "USD" },
      { sym: "p", meaning: "Value of energy", unit: "USD/MWh" },
      { sym: "E_d", meaning: "Clean-plant daily energy", unit: "MWh/day" },
      { sym: "s", meaning: "Soiling rate", unit: "1/day" },
    ],
    explanation: md`Set $\mathrm{d}J/\mathrm{d}T = -365C/T^2 + pEs/2 = 0$ and use $E = 365E_d$. The interval scales with the **square root** of cost over (value × daily energy × soiling rate): halve the cleaning cost and you clean $\sqrt2 = 1.41$ times as often, not twice. At the optimum the two cost terms are equal.`,
    lesson: "mz04-l01",
  },
  {
    id: "mz04-min-cost",
    name: "Minimum annual cost at the optimum",
    tex: String.raw`J^{*} = \sqrt{2 \cdot 365 \cdot C\, p\, E\, s} = 2 \cdot \frac{365\,C}{T^{*}}`,
    vars: [
      { sym: "J^{*}", meaning: "Annual cleaning plus soiling cost at the optimal interval", unit: "USD/yr" },
      { sym: "C", meaning: "Cost per cleaning cycle", unit: "USD" },
      { sym: "p", meaning: "Value of energy", unit: "USD/MWh" },
      { sym: "E", meaning: "Clean-plant annual energy", unit: "MWh/yr" },
      { sym: "s", meaning: "Soiling rate", unit: "1/day" },
    ],
    explanation: md`The best achievable soiling-plus-cleaning cost also follows a square root: it scales with $\sqrt{C}$, $\sqrt{p}$ and $\sqrt{s}$. A 20 % cheaper cleaning contract cuts the total by only about 10.6 %, because the operator re-optimises and buys back some energy with extra cleanings.`,
    lesson: "mz04-l01",
  },
  {
    id: "mz04-flatness",
    name: "Cost penalty of a mis-set interval",
    tex: String.raw`\frac{J(kT^{*})}{J^{*}} = \frac{1}{2}\left(k + \frac{1}{k}\right)`,
    vars: [
      { sym: "k", meaning: "Actual interval as a multiple of the optimum", unit: "-" },
      { sym: "J^{*}", meaning: "Minimum annual cost", unit: "USD/yr" },
    ],
    explanation: md`The optimum is flat: cleaning 50 % too often or too rarely ($k = 1.5$ or $0.67$) costs about 8 % more; a factor of two either way costs 25 % more. The money is in big errors (fixed calendars that ignore season and value), not in fine-tuning by a day or two.`,
    lesson: "mz04-l01",
  },
  {
    id: "mz04-residual-loss",
    name: "Average soiling loss with imperfect cleaning",
    tex: String.raw`\bar L = r_0 + \frac{s\,T}{2}`,
    vars: [
      { sym: String.raw`\bar L`, meaning: "Time-averaged soiling loss fraction", unit: "-" },
      { sym: "r_0", meaning: "Residual loss left right after a cleaning (cemented dust, missed rows)", unit: "-" },
      { sym: "s", meaning: "Soiling rate", unit: "1/day" },
      { sym: "T", meaning: "Cleaning interval", unit: "days" },
    ],
    explanation: md`A constant residual raises the cost of every policy equally, so it does not move $T^*$; it matters when comparing technologies (dry brushing leaves more cemented residue than wet cleaning) and it needs its own periodic remedy (a wet or deep clean). If the residual grows cycle after cycle, a two-level policy (frequent light cleans, occasional deep cleans) is needed.`,
    lesson: "mz04-l01",
  },
  // ---------------------------------------------------------------- l02 value
  {
    id: "mz04-value-viewpoints",
    name: "Value of a soiled MWh by viewpoint",
    tex: String.raw`p_{\text{IPP}} = t, \qquad p_{\text{offtaker}} = v - t, \qquad p_{\text{national}} = v`,
    vars: [
      { sym: "t", meaning: "PPA energy tariff paid to the IPP", unit: "USD/MWh" },
      { sym: "v", meaning: "Economic value of the displaced fuel: heat rate × fuel opportunity price", unit: "USD/MWh" },
      { sym: String.raw`p_{\text{offtaker}}`, meaning: "Net loss to the offtaker (MEWRE) per MWh not generated: fuel it must burn minus the tariff it no longer pays", unit: "USD/MWh" },
    ],
    explanation: md`A MWh lost to dust costs the IPP its tariff. The offtaker must make that MWh with a thermal unit (cost $v$) but no longer pays the tariff for it, so it loses $v - t$. Counting both sides, the economy loses the fuel, $v$. Each party re-optimises cleaning with its own $p$. Under deemed-energy or curtailment periods, the value of energy that could not have been delivered anyway is zero.`,
    lesson: "mz04-l02",
  },
  // ---------------------------------------------------------------- l03 technology
  {
    id: "mz04-robot-annual-cost",
    name: "Annual cost of a robotic cleaning fleet",
    tex: String.raw`J_{\text{robot}} = K \cdot \mathrm{CRF}(r,n) + O + p\,E\,\bar L_{\text{robot}}, \qquad \mathrm{CRF} = \frac{r(1+r)^n}{(1+r)^n - 1}`,
    vars: [
      { sym: "K", meaning: "Fleet capex (robots, docks, rails, transfer vehicles, software)", unit: "USD" },
      { sym: String.raw`\mathrm{CRF}(r,n)`, meaning: "Capital recovery factor at discount rate r over n years", unit: "1/yr" },
      { sym: "O", meaning: "Annual robot O&M: brushes, batteries, repairs, supervision", unit: "USD/yr" },
      { sym: String.raw`\bar L_{\text{robot}}`, meaning: "Average soiling loss under robotic cleaning (daily cycle plus residual)", unit: "-" },
      { sym: "p, E", meaning: "Value of energy, clean annual energy", unit: "USD/MWh, MWh/yr" },
    ],
    explanation: md`With robots the marginal cost of a cleaning is close to zero, so the square-root rule pushes the interval to the machine's minimum (often daily). The decision is no longer how often but whether to buy the fleet: compare this annualised cost with the manual optimum $J^*$.`,
    lesson: "mz04-l03",
  },
  {
    id: "mz04-breakeven-capex",
    name: "Break-even robot capex",
    tex: String.raw`K_{\text{be}} = \frac{J^{*}_{\text{manual}} - O - p\,E\,\bar L_{\text{robot}}}{\mathrm{CRF}(r,n)}`,
    vars: [
      { sym: String.raw`K_{\text{be}}`, meaning: "Highest fleet capex at which robots still match the manual optimum", unit: "USD" },
      { sym: String.raw`J^{*}_{\text{manual}}`, meaning: "Annual cost of manual cleaning at its own optimal interval", unit: "USD/yr" },
      { sym: "O", meaning: "Robot O&M", unit: "USD/yr" },
      { sym: String.raw`\bar L_{\text{robot}}`, meaning: "Average loss under robots", unit: "-" },
    ],
    explanation: md`Turn a vendor quote into a yes or no: if the quoted capex is below $K_{\text{be}}$, robots win at that value of energy. Because $J^*_{\text{manual}}$ grows with $\sqrt{p}$, the break-even capex is much higher at the state's fuel value than at a low IPP tariff.`,
    lesson: "mz04-l03",
  },
  // ---------------------------------------------------------------- l04 dynamic
  {
    id: "mz04-cleaning-trigger",
    name: "Cleaning trigger (renewal rule)",
    tex: String.raw`\text{clean when } p\,E_d\,L(t) \ge g \quad\Leftrightarrow\quad L(t) \ge L^{*} = \frac{g}{p\,E_d}`,
    vars: [
      { sym: "L(t)", meaning: "Current soiling loss fraction, measured or estimated", unit: "-" },
      { sym: "g", meaning: "Long-run average cost per day of the best policy (cleaning plus loss)", unit: "USD/day" },
      { sym: "L^{*}", meaning: "Trigger loss level", unit: "-" },
      { sym: "p, E_d", meaning: "Value of energy, clean daily energy", unit: "USD/MWh, MWh/day" },
    ],
    explanation: md`Clean when today's loss costs as much per day as the policy costs on average. For linear soiling $g = J^*/365$ and $L^* = sT^*$, which reproduces the square-root rule, but the rule also works when the loss jumps: after a dust storm that pushes $L$ above $L^*$, clean now (unless another storm is forecast within days).`,
    lesson: "mz04-l04",
  },
  {
    id: "mz04-postpone-threshold",
    name: "Postpone a cleaning ahead of a forecast storm",
    tex: String.raw`\text{postpone if } q > q^{*} = \frac{g\,\tau}{C} = \frac{2\tau}{T^{*}}`,
    vars: [
      { sym: "q", meaning: "Forecast probability of a dust event in the next τ days that would force a re-clean", unit: "-" },
      { sym: String.raw`\tau`, meaning: "Postponement window", unit: "days" },
      { sym: "g", meaning: "Average cost per day of the policy (= loss value per day at the trigger)", unit: "USD/day" },
      { sym: "C", meaning: "Cost per cleaning", unit: "USD" },
    ],
    explanation: md`Cleaning now risks a wasted cycle with probability $q$ (expected cost $qC$); waiting costs about $g\tau$ of extra loss. The second form holds at the linear optimum, where $g = 2C/T^*$. A low-value owner with long intervals should postpone on weak forecasts; a high-value owner with short intervals needs a confident forecast.`,
    lesson: "mz04-l04",
  },
  {
    id: "mz04-evpi",
    name: "Expected value of perfect information",
    tex: String.raw`\mathrm{EVPI} = \min_a \mathbb{E}[\text{cost}(a)] - \mathbb{E}\Big[\min_a \text{cost}(a \mid \text{state})\Big]`,
    vars: [
      { sym: "a", meaning: "Action (clean now, postpone)", unit: "-" },
      { sym: String.raw`\mathbb{E}`, meaning: "Expectation over the storm or no-storm outcome", unit: "-" },
    ],
    explanation: md`The most a perfect forecast can be worth per decision: the expected cost of the best action under the climatological prior minus the expected cost when you always learn the outcome first. A real forecast with misses and false alarms is worth less; EVPI is the ceiling for what a dust forecast service is worth.`,
    lesson: "mz04-l04",
  },
  // ---------------------------------------------------------------- l05 robots as capex
  {
    id: "mz04-availability-loss",
    name: "Extra soiling loss from robot downtime",
    tex: String.raw`\Delta \bar L \approx (1 - A)\,\frac{s\,D}{2}`,
    vars: [
      { sym: "A", meaning: "Robot fleet availability (share of robot-days in service)", unit: "-" },
      { sym: "D", meaning: "Mean outage duration until the row is cleaned again (repair or manual fallback)", unit: "days" },
      { sym: "s", meaning: "Soiling rate", unit: "1/day" },
    ],
    explanation: md`Rows served by a broken robot soil linearly until it returns, averaging $sD/2$ over the outage. Random single-robot failures with short $D$ cost little; a long $D$ (spares shipped from abroad) or a fleet-wide (common-mode) failure is where the money goes, so contracts must cap $D$ and keep a manual fallback.`,
    lesson: "mz04-l05",
  },
  {
    id: "mz04-payback-npv",
    name: "Simple payback and NPV of a robot fleet",
    tex: String.raw`P = \frac{K}{\Delta S}, \qquad \mathrm{NPV} = -K + \Delta S \cdot \frac{1 - (1+r)^{-n}}{r}`,
    vars: [
      { sym: "K", meaning: "Fleet capex", unit: "USD" },
      { sym: String.raw`\Delta S`, meaning: "Annual saving: manual cost and loss avoided minus robot O&M and residual loss", unit: "USD/yr" },
      { sym: "r", meaning: "Discount rate", unit: "1/yr" },
      { sym: "n", meaning: "Fleet life", unit: "yr" },
    ],
    explanation: md`Payback ignores the time value of money and life after payback; NPV does not. Use both, and run them at the value of energy of whoever pays for the fleet. Robot life (brushes, batteries, drives in 50 °C heat) is usually much shorter than the plant's 25 to 30 years.`,
    lesson: "mz04-l05",
  },
  // ---------------------------------------------------------------- l06 M&V
  {
    id: "mz04-verified-savings",
    name: "Verified net savings of a cleaning change",
    tex: String.raw`S = (\bar L_{\text{base}} - \bar L_{\text{new}})\,E\,p \;-\; (C_{\text{new}} - C_{\text{base}})`,
    vars: [
      { sym: String.raw`\bar L_{\text{base}}, \bar L_{\text{new}}`, meaning: "Average soiling loss under the baseline and the new policy, both measured against a weather-corrected expectation", unit: "-" },
      { sym: "E", meaning: "Clean-plant annual energy", unit: "MWh/yr" },
      { sym: "p", meaning: "Contractually agreed value of energy", unit: "USD/MWh" },
      { sym: String.raw`C_{\text{new}}, C_{\text{base}}`, meaning: "Annual cleaning spend under each policy", unit: "USD/yr" },
    ],
    explanation: md`Savings are always energy recovered minus extra cleaning spend, against a baseline both parties agreed before the change. The baseline must be adjusted for weather (temperature-corrected PR) and for other changes (outages, curtailment), otherwise a clear month will be claimed as a saving.`,
    lesson: "mz04-l06",
  },
  {
    id: "mz04-sample-size",
    name: "Days needed to detect a saving (paired blocks)",
    tex: String.raw`n = \left(\frac{(z_{1-\alpha/2} + z_{1-\beta})\,\sigma}{\delta}\right)^2`,
    vars: [
      { sym: "n", meaning: "Number of independent days of paired comparison", unit: "days" },
      { sym: String.raw`\sigma`, meaning: "Standard deviation of the daily treatment-minus-control performance difference", unit: "% points" },
      { sym: String.raw`\delta`, meaning: "Smallest saving worth detecting", unit: "% points" },
      { sym: "z", meaning: "Normal quantiles: 1.96 for 95 % confidence, 0.84 for 80 % power", unit: "-" },
    ],
    explanation: md`Pairing a treatment block with a neighbouring control block cancels most weather noise, which shrinks $\sigma$. Daily differences are autocorrelated (dust persists), so the effective number of independent days is smaller than the calendar count: plan for more days than the formula gives.`,
    lesson: "mz04-l06",
  },
  {
    id: "mz04-gain-share",
    name: "Gain-sharing fee",
    tex: String.raw`F = \alpha \cdot \max(S, 0)`,
    vars: [
      { sym: "F", meaning: "Fee to the analytics or cleaning provider", unit: "USD/yr" },
      { sym: String.raw`\alpha`, meaning: "Agreed share of verified net savings", unit: "-" },
      { sym: "S", meaning: "Verified net savings", unit: "USD/yr" },
    ],
    explanation: md`Aligns the provider with the owner's value of energy, but only works with an M&V protocol both sides trust, a cap and a floor, and a payment cycle long enough to average out weather. Often combined with a fixed platform fee so the provider is not paid zero in a rainy year.`,
    lesson: "mz04-l06",
  },
];

export default formulas;
