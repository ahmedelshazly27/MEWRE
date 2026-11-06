/** Lightweight track list for client components (no content imports). Kept in sync with tracks.ts by a test. */
export const TRACK_META = [
  { id: "mewre", number: 0, short: "MEWRE PM", icon: "sun" },
  { id: "founder", number: 1, short: "Founder Core", icon: "rocket" },
  { id: "afterwave", number: 2, short: "Afterwave", icon: "wave" },
  { id: "mizan", number: 3, short: "Mizan", icon: "dust" },
  { id: "suhail", number: 4, short: "Suhail", icon: "star" },
] as const;

/** Track of a module id, by prefix (Track 0 uses m00..m15). */
export function trackOfModuleId(moduleId: string): string {
  if (moduleId.startsWith("fc")) return "founder";
  if (moduleId.startsWith("aw")) return "afterwave";
  if (moduleId.startsWith("mz")) return "mizan";
  if (moduleId.startsWith("sh")) return "suhail";
  return "mewre";
}

/** True for paths that only exist in English (every track except Track 0). */
export function isEnglishOnlyPath(pathname: string): boolean {
  if (/^\/formulas\/[a-z]+/.test(pathname)) return true;
  const m = pathname.match(/^\/(?:learn|print)\/([a-z]+\d+)/) ?? pathname.match(/^\/tracks\/([a-z]+)/);
  if (!m) return false;
  const key = m[1];
  return pathname.startsWith("/tracks/") ? key !== "mewre" : trackOfModuleId(key) !== "mewre";
}
