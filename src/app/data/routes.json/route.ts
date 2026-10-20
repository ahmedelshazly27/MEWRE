import fs from "node:fs";
import path from "node:path";
import { index, modules } from "@/lib/content";
import { lp } from "@/lib/i18n";

export const dynamic = "force-static";

const STATIC_ROUTES = ["/", "/learn", "/review", "/practice", "/diagnostic", "/errors", "/scenarios", "/capstone", "/tutor", "/glossary", "/formulas", "/concepts", "/library", "/notes", "/settings"];

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
  const live = modules.filter((m) => !m.draft && m.lessons.length);
  const en = [
    ...STATIC_ROUTES,
    ...live.flatMap((m) => [`/learn/${m.id}`, `/learn/${m.id}/exam`, `/print/${m.id}`, ...m.lessons.map((l) => `/learn/${m.id}/${l.id}`)]),
    ...[...index().scenarios.values()].filter((s) => !s.module.draft).map((s) => `/scenarios/${s.scenario.id}`),
  ];
  // Arabic mirrors every page under /ar
  const routes = [...en, ...en.map((r) => lp("ar", r))];
  const downloads = fs.existsSync(path.join(process.cwd(), "public", "downloads"))
    ? fs.readdirSync(path.join(process.cwd(), "public", "downloads")).map((f) => `/downloads/${f}`)
    : [];
  const data = ["/data/content.json", "/data/content-ar.json", "/data/concepts.json", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png", "/apple-touch-icon.png", ...downloads];
  return Response.json({ routes, data, assets: buildAssets() });
}
