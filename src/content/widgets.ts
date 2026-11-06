/**
 * Catalogue of interactive widgets and labelable diagrams that lessons can embed.
 * Implementations live in src/components/widgets/ and src/components/diagrams/.
 * Props listed here are optional initial values — every widget must work with no props.
 */

export const WIDGETS = {
  // Afterwave
  "change-impact": "Test dependency graph and change-impact visualiser: pick changed firmware, model or rig artifacts; impact score 1 − Π(1 − w) per test, selection threshold, rig hours saved vs expected regressions caught. Props: none",
  "bench-sync": "Bench data synchronisation demo: a DAQ stream and an app log on different clocks (offset, drift ppm, jitter); misalignment over time and after fitting offset and drift from sync pulses. Props: none",
  "platform-economics": "Actuator test platform economics: rig capex, life, availability, utilisation, price per test hour, variable and fixed costs, data value; EBIT vs utilisation, breakeven utilisation, payback. Props: none",
  "gsn-builder": "Safety case builder in Goal Structuring Notation: goals, strategies, solutions, context, assumptions; add/edit nodes and get structural checks (every goal supported down to evidence). Props: none",
  // Mizan (the Track 0 "soiling" widget is the cleaning-interval optimiser)
  "pr-correction": "Performance ratio with temperature correction: a year of daily PR for a desert plant, basic vs NREL weather-corrected PR, soiling sawtooth from rate and cleaning interval. Props: none",
  "stow-decision": "Stow decision simulator: wind forecast vs vendor threshold, damage cost, energy lost while stowed, soiling avoided by a steep dust stow; expected-cost decision and curves vs wind speed. Props: none",
  // Suhail
  "event-pnl": "Event P&L and sponsorship model: attendees, tickets, four sponsor tiers with fulfilment cost, venue, catering, prizes, production, marketing, contingency; profit, sponsor share, cost per attendee. Props: none",
  "community-funnel": "Community growth funnel: monthly reach, conversion, retention, referrals and contributor share; active members over time and steady state reach·conversion / (1 − retention − referral). Props: none",
  // Founder Core (percentage props accept a fraction 0.75 or a percent 75; money props accept full USD amounts; elasticity may be given as a positive or negative number)
  "cap-table": "Cap table and dilution simulator: founders, option pool, post-money SAFEs converting at a priced round, then a Series A; ownership % and fully diluted shares after each step, with the option-pool shuffle. Props: { founders?: number; poolPct?: number }",
  "safe-vs-priced": "SAFE vs priced round calculator: the same raise as post-money SAFE (cap, discount), pre-money SAFE or priced seed; founder ownership after the Series A, conversion price and effective valuation. Props: { raise?: number; cap?: number; discount?: number; preMoney?: number }",
  "unit-economics": "Unit economics and runway model: price, gross margin, CAC, monthly churn give LTV, LTV/CAC and CAC payback; cash, burn and revenue growth give runway months and default alive/dead. Props: { price?: number; grossMargin?: number; cac?: number; churn?: number; cash?: number; burn?: number }",
  "pricing-experiment": "Pricing experiments: constant-elasticity demand, revenue and contribution margin vs price, profit-maximising price, A/B price test with sample-size check, good-better-best packaging mix. Props: { price?: number; elasticity?: number; unitCost?: number }",
  "pipeline-forecast": "Sales pipeline forecaster: deals and value per stage, stage-to-close probabilities and cycle length give weighted pipeline, expected bookings per quarter and coverage vs target. Props: { target?: number; acv?: number }",
  "iv-curve": "PV single-diode I-V and P-V curves; sliders for irradiance and cell temperature. Props: { irradiance?: number; temperature?: number }",
  "sun-path": "Sun elevation/azimuth through a day at a latitude (default Kuwait 29.3°N) + single-axis tracker angle and POA irradiance vs fixed tilt. Props: { latitude?: number; dayOfYear?: number }",
  "kuwait-climate": "Monthly GHI, DNI and mean/max ambient temperature for Shagaya/Kuwait (indicative climatology). Props: { metric?: 'ghi'|'dni'|'temp' }",
  "power-triangle": "P, Q, S and power factor phasor diagram with sliders; shows capacitor size needed to correct PF. Props: { p?: number; pf?: number }",
  "three-phase": "Three-phase voltage waveforms, phasors, line vs phase voltage, balanced vs unbalanced sum. Props: { unbalance?: number }",
  "load-curve": "Kuwait-style summer vs winter daily load profile with PV overlay showing net load (duck curve). Props: { pvMW?: number; season?: 'summer'|'winter' }",
  "capacity-factor": "Capacity factor calculator: energy, nameplate, hours; compares PV/wind/CSP/gas typical ranges. Props: { mw?: number; mwh?: number }",
  "per-unit": "Per-unit converter: base MVA/kV → base impedance & current; converts ohms↔pu and changes base. Props: none",
  "pv-sld": "Interactive single-line diagram of a utility PV plant (modules→strings→combiner→inverter→MV transformer→collector→HV substation→grid); click a component for its role, ratings and PM checks.",
  "substation-sld": "Interactive single-line diagram of a 400/132/33 kV collector substation with breakers, disconnectors, CTs/VTs, protection relays.",
  "evm": "Earned Value dashboard: inputs BAC, PV, EV, AC → CV, SV, CPI, SPI, EAC (4 methods), ETC, VAC, TCPI + S-curve. Props: { bac?: number; pv?: number; ev?: number; ac?: number }",
  "lcoe": "LCOE calculator with sliders: capex, opex, capacity factor, WACC, life, degradation. Props: { capexPerKw?: number; cf?: number; wacc?: number }",
  "npv-irr": "Project cash-flow model: capex, tariff, energy, opex, debt %, interest, tenor → NPV, equity/project IRR, payback, min/avg DSCR, chart.",
  "cpm-gantt": "Critical path method: editable activity durations for a PV project network; computes ES/EF/LS/LF/float, highlights critical path on a Gantt.",
  "monte-carlo": "Schedule/cost Monte Carlo with triangular (min/likely/max) activity estimates → histogram, P50/P80/P90.",
  "risk-allocation": "Contract risk allocation matrix: risks (ground conditions, design, FX, change in law, grid delay…) vs FIDIC Red/Yellow/Silver/EPC-IPP; click a cell for clause reasoning.",
  "risk-matrix": "5x5 probability-impact risk heat map; add/move risks, see score and response strategy.",
  "weibull": "Weibull wind distribution with k and c sliders, overlaid turbine power curve, AEP and capacity factor. Props: { k?: number; c?: number }",
  "betz": "Actuator-disc Betz limit: Cp vs axial induction factor a; marks a=1/3, Cp=16/27.",
  "bess-sizing": "BESS sizing and degradation: power, duration, DoD, RTE, cycles/yr, fade %/yr, augmentation strategy → usable energy over life. Props: { mw?: number; hours?: number }",
  "soiling": "Soiling & cleaning optimizer: soiling rate %/day, cleaning cost, tariff, plant size → optimal cleaning interval and annual loss.",
  "dc-ac-ratio": "DC/AC ratio clipping simulator over a clear-sky day; shows clipped energy vs inverter cost saved. Props: { ratio?: number }",
  "droop": "Frequency droop: P-f characteristic with droop %, deadband and headroom; shows plant response to a frequency event. Props: { droop?: number }",
  "loss-waterfall": "PVsyst-style energy loss waterfall from GHI to grid-injected energy; editable loss percentages; computes PR and specific yield.",
  "p50-p90": "Energy yield exceedance: P50 and uncertainty components → P75/P90/P99 using normal distribution. Props: { p50?: number; sigma?: number }",
  "csp-vs-pvbess": "Compare CSP with thermal storage vs PV+BESS for a given evening-peak delivery requirement: capex, LCOE, dispatch profile.",
  "thermal-storage": "Molten-salt TES energy: mass, cp, ΔT → MWh_th, MWh_e and hours of turbine operation. Props: { massTonnes?: number }",
  "tariff-eval": "Tariff bid evaluation: several bids with levelized tariff, escalation, technical score → levelized comparison and ranking with weightings.",
  "concept-map": "Concept map of the curriculum or one module. Props: { module?: string }",
  "institution-map": "Kuwait decision chain: MEWRE, KAPP, CAPT, Audit Bureau, Fatwa & Legislation, Council of Ministers, KISR, Ministry of Finance — click for role.",
  "lifecycle": "Project lifecycle timeline from feasibility to O&M with stage gates, key documents and typical durations; click a stage.",
  "cashflow-scurve": "Construction cash-flow forecast: S-curve from milestone payment schedule, retention and advance payment recovery. Props: { contractValue?: number }",
  "degradation": "Module degradation: first-year LID + linear %/yr vs warranty line over 30 years. Props: { rate?: number }",
} as const;
export type WidgetId = keyof typeof WIDGETS;

/** Labelable diagrams for `diagram` blocks and `label` questions, with marker ids. */
export const DIAGRAM_MARKERS = {
  "pv-plant": ["module", "string", "combiner", "inverter", "mv-transformer", "rmu", "collector-substation", "hv-transformer", "grid"],
  "substation": ["line-bay", "busbar", "circuit-breaker", "disconnector", "ct", "vt", "power-transformer", "surge-arrester", "earthing-switch"],
  "iv-curve": ["isc", "voc", "mpp", "imp", "vmp"],
  "parabolic-trough": ["mirror", "receiver-tube", "htf-loop", "hot-tank", "cold-tank", "heat-exchanger", "steam-turbine", "condenser"],
  "wind-turbine": ["blade", "hub", "nacelle", "gearbox", "generator", "tower", "yaw-system", "anemometer"],
  "bess": ["cell", "module", "rack", "bms", "pcs", "transformer", "hvac", "fire-suppression", "ems"],
  "power-triangle": ["p", "q", "s", "phi"],
  "fidic-parties": ["employer", "engineer", "contractor", "subcontractor", "dab"],
  "ppp-structure": ["offtaker", "spv", "lenders", "sponsors", "epc", "om", "kapp", "public-ipo"],
  "evm-scurve": ["pv-curve", "ev-curve", "ac-curve", "cost-variance", "schedule-variance", "bac", "status-date"],
} as const;
export type DiagramId = keyof typeof DIAGRAM_MARKERS;
