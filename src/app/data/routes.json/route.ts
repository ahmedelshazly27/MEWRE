import { EXPLAINERS } from "@/content/trial";
import fs from "node:fs";
import path from "node:path";
import { TRACKS, index, liveModules, trackOfModule } from "@/lib/content";
import { lp } from "@/lib/i18n";
import { SPRINT_BLOCKS } from "@/content/crash";

export const dynamic = "force-static";

const STATIC_ROUTES = ["/", "/crash", "/crash/exam", "/crash/concepts", ...SPRINT_BLOCKS.map((b) => `/crash/check/${b.module}`), "/learn", "/review", "/practice", "/diagnostic", "/errors", "/scenarios", "/capstone", "/tutor", "/work", "/glossary", "/formulas", "/concepts", "/library", "/notes", "/settings"];

/** Every compiled client asset, read from the build output when this route is prerendered. */
function buildAssets(): string[] {
  const root = path.join(process.cwd(), ".next", "static");
  const out: string[] = [];
  const walk = (dir: string) => {
    let entries: fs.Dirent[] = [];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (!e.name.endsWith(".map")) out.push("/_next/static/" + path.relative(root, p).split(path.sep).join("/"));
    }
  };
  walk(root);
  return out;
}

/** Offline manifest consumed by the service worker's "download everything" step. */
export function GET() {
  const moduleRoutes = (mods: ReturnType<typeof liveModules>) =>
    mods.flatMap((m) => [`/learn/${m.id}`, `/learn/${m.id}/exam`, `/print/${m.id}`, ...m.lessons.map((l) => `/learn/${m.id}/${l.id}`)]);
  const scenarios = [...index().scenarios.values()].filter((s) => !s.module.draft);
  const en = [
    ...STATIC_ROUTES,
    ...TRACKS.map((t) => `/tracks/${t.id}`),
    ...TRACKS.filter((t) => t.id !== "mewre").map((t) => `/tracks/${t.id}/concepts`),
    ...TRACKS.filter((t) => t.id !== "mewre").map((t) => `/formulas/${t.id}`),
    "/trial",
    ...EXPLAINERS.map((e) => `/trial/${e.id}`),
    ...moduleRoutes(liveModules("en")),
    ...scenarios.map((s) => `/scenarios/${s.scenario.id}`),
  ];
  // Arabic mirrors the global pages and Track 0 only
  const ar = [
    ...STATIC_ROUTES,
    ...moduleRoutes(liveModules("en", "mewre")),
    ...scenarios.filter((s) => trackOfModule(s.module.id) === "mewre").map((s) => `/scenarios/${s.scenario.id}`),
  ].map((r) => lp("ar", r));
  const routes = [...en, ...ar];
  const downloads = fs.existsSync(path.join(process.cwd(), "public", "downloads"))
    ? fs.readdirSync(path.join(process.cwd(), "public", "downloads")).map((f) => `/downloads/${f}`)
    : [];
  const data = ["/data/content.json", "/data/content-ar.json", "/data/concepts.json", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png", "/apple-touch-icon.png", ...downloads];
  return Response.json({ routes, data, assets: buildAssets() });
}
