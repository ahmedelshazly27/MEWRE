/**
 * Voltage levels of a utility grid, from generator to socket, as drawn in the grid-topology widget.
 * Kuwait confidence follows Track 0 (m06-l01, m01-l03): only 400 kV is confirmed; the rest are commonly cited.
 */
export type Confidence = "confirmed" | "commonly cited" | "typical" | "unverified";

export interface VoltageLevel {
  id: string;
  label: string;
  /** Line-to-line RMS voltage in volts used for the current calculation. */
  volts: number;
  /** Text shown on the drawing. */
  shown: string;
  role: string;
  kuwait: Confidence;
  note: string;
  /** Single-phase supply (homes): I = P/V instead of P/(√3 V). */
  singlePhase?: boolean;
}

export const LEVELS: VoltageLevel[] = [
  { id: "gen", label: "Generator terminals", volts: 15_000, shown: "11–21 kV", role: "Inside the power station: the generator's own voltage, limited by insulation in the machine.", kuwait: "typical", note: "Design-specific; a step-up transformer next to the generator raises it straight to transmission voltage." },
  { id: "ehv", label: "Transmission (EHV)", volts: 400_000, shown: "400 kV", role: "The backbone: carries bulk power over long distances between power stations and grid substations.", kuwait: "confirmed", note: "Confirmed for Kuwait (for example the Shagaya to Al-Wafra 400 kV line). Older EHV circuits are quoted as 300 or 275 kV; sources differ." },
  { id: "hv", label: "Sub-transmission (HV)", volts: 132_000, shown: "132 kV", role: "From grid substations to the main substations near cities and large industry.", kuwait: "commonly cited", note: "Commonly cited for Kuwait, not confirmed in our sources: confirm with MEWRE." },
  { id: "mv33", label: "Primary distribution", volts: 33_000, shown: "33 kV", role: "Feeds districts, large customers and PV plant collector systems.", kuwait: "commonly cited", note: "Commonly cited; PV plants typically collect at 33 kV." },
  { id: "mv11", label: "Distribution", volts: 11_000, shown: "11 kV", role: "Runs along streets to the distribution substations in each neighbourhood.", kuwait: "commonly cited", note: "Commonly cited for Kuwait, not confirmed in our sources." },
  { id: "lv", label: "Low voltage (three-phase)", volts: 415, shown: "415 V", role: "Between phases in buildings: air-conditioning units, lifts, pumps.", kuwait: "commonly cited", note: "Widely described for Kuwait (415/240 V); confirm in MEWRE distribution standards." },
  { id: "home", label: "Socket (single-phase)", volts: 240, shown: "240 V", role: "One phase to neutral: lights, kettles, chargers.", kuwait: "commonly cited", note: "240 V, 50 Hz at Kuwaiti sockets (Track 0 lesson 3).", singlePhase: true },
  { id: "pvdc", label: "PV modules and strings (DC)", volts: 1_500, shown: "up to 1,500 V DC", role: "Strings of modules in series feed the inverters with DC.", kuwait: "typical", note: "1,500 V DC is the usual maximum for utility plants today." },
  { id: "pvac", label: "Inverter output (AC)", volts: 700, shown: "0.6–0.8 kV", role: "Inverters turn DC into AC at a few hundred volts; a transformer at each inverter station steps it up to 33 kV.", kuwait: "typical", note: "Design-specific." },
];

/** Current (A) needed to carry `mw` megawatts at a level (unity power factor; three-phase except at the socket). */
export function levelCurrent(level: VoltageLevel, mw: number): number {
  const w = mw * 1e6;
  return level.singlePhase ? w / level.volts : w / (Math.sqrt(3) * level.volts);
}

/** Heat loss in the same conductor relative to carrying the power at 400 kV: (400 kV / V)². */
export const lossVs400 = (level: VoltageLevel) => (400_000 / level.volts) ** 2;
