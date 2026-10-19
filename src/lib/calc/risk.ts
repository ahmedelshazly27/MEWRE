/** 5×5 probability–impact risk scoring. */

export type RiskBand = "low" | "medium" | "high" | "extreme";

/** Score = probability (1–5) × impact (1–5). */
export function riskScore(probability: number, impact: number): number {
  return Math.round(probability) * Math.round(impact);
}

/** Band thresholds: 1–4 low, 5–9 medium, 10–16 high, 20–25 extreme. */
export function riskBand(score: number): RiskBand {
  if (score >= 20) return "extreme";
  if (score >= 10) return "high";
  if (score >= 5) return "medium";
  return "low";
}

/** Typical response strategy for a threat by band. */
export function responseStrategy(band: RiskBand): string {
  switch (band) {
    case "extreme":
      return "Avoid or transfer: change scope/contract, escalate to sponsor; do not proceed without a funded response.";
    case "high":
      return "Mitigate actively: named owner, funded actions, monthly review; consider transfer (insurance/contract).";
    case "medium":
      return "Mitigate or accept with contingency; track on the register at each progress meeting.";
    default:
      return "Accept and monitor; review at milestones.";
  }
}

/** Expected monetary value = probability (fraction) × impact (currency). */
export function emv(probability: number, impact: number): number {
  return probability * impact;
}
