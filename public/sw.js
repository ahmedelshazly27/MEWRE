/* MEWRE PM Academy service worker: offline-first pages, cache-first hashed assets. */
const VERSION = new URL(self.location.href).searchParams.get("v") || "dev";
const PAGES = `pages-${VERSION}`;
const DATA = `data-${VERSION}`;
const ASSETS = "assets-v1"; // /_next/static files are content-hashed, safe to share across versions

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((c) => c.addAll(["/"]))
      .catch(() => undefined)
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([PAGES, DATA, ASSETS]);
      for (const k of await caches.keys()) if (!keep.has(k)) await caches.delete(k);
      await self.clients.claim();
    })(),
  );
});

function pageKey(url) {
  const u = new URL(url);
  u.search = "";
  u.hash = "";
  return u.toString();
}

async function networkFirstPage(request) {
  const cache = await caches.open(PAGES);
  try {
    const res = await Promise.race([fetch(request), new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 6000))]);
    if (res.ok && res.type === "basic") await cache.put(pageKey(request.url), res.clone());
    return res;
  } catch {
    const hit = (await cache.match(pageKey(request.url))) || (await cache.match(pageKey(request.url).replace(/\/$/, "")));
    if (hit) return hit;
    const home = await cache.match(pageKey(self.location.origin + "/"));
    return (
      home ||
      new Response("<h1>Offline</h1><p>This page has not been downloaded yet. Open Settings → Offline when you are back online.</p>", {
        headers: { "Content-Type": "text/html; charset=utf-8" },
        status: 503,
      })
    );
  }
}

async function cacheFirst(request, name) {
  const cache = await caches.open(name);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) await cache.put(request, res.clone());
  return res;
}

async function staleWhileRevalidate(request, name) {
  const cache = await caches.open(name);
  const hit = await cache.match(request, { ignoreSearch: true });
  const network = fetch(request)
    .then((res) => {
      if (res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => undefined);
  return hit || (await network) || new Response("", { status: 504 });
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // Supabase, Claude API proxy etc.
  if (url.pathname.startsWith("/api/")) return; // tutor & grader: online only
  if (url.pathname.startsWith("/_next/static/")) return event.respondWith(cacheFirst(req, ASSETS));
  // React Server Component payloads (client-side navigation). If the network is down, fail fast so
  // Next.js falls back to a full navigation, which we serve from the page cache.
  if (req.headers.get("RSC") || url.searchParams.has("_rsc")) {
    return event.respondWith(fetch(req).catch(() => Response.error()));
  }
  if (req.mode === "navigate") return event.respondWith(networkFirstPage(req));
  if (url.pathname.startsWith("/_next/")) return; // dev/HMR internals
  event.respondWith(staleWhileRevalidate(req, DATA));
});

// Download every page and asset so the whole academy works offline.
async function precacheAll(port) {
  const post = (m) => port && port.postMessage(m);
  try {
    const manifest = await (await fetch("/data/routes.json", { cache: "no-store" })).json();
    const pages = await caches.open(PAGES);
    const assets = await caches.open(ASSETS);
    const data = await caches.open(DATA);
    const total = manifest.routes.length + manifest.assets.length + manifest.data.length;
    let done = 0;
    const found = new Set(manifest.assets);
    const step = async (fn) => {
      try {
        await fn();
      } catch {
        /* keep going */
      }
      done++;
      if (done % 10 === 0) post({ type: "progress", done, total });
    };
    for (const u of manifest.data) await step(async () => data.put(u, await fetch(u)));
    for (const r of manifest.routes) {
      await step(async () => {
        const res = await fetch(r, { credentials: "same-origin" });
        if (!res.ok) return;
        const html = await res.clone().text();
        await pages.put(pageKey(new URL(r, self.location.origin).toString()), res);
        for (const m of html.matchAll(/\/_next\/static\/[^"'\s)]+/g)) found.add(m[0].replace(/\\u0026/g, "&"));
      });
    }
    const list = [...found];
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      if (!(await assets.match(a))) await step(async () => {
        const res = await fetch(a);
        if (res.ok) await assets.put(a, res);
      });
      else done++;
    }
    post({ type: "done", done: total, total, version: VERSION, at: Date.now() });
  } catch (e) {
    post({ type: "error", message: String(e && e.message ? e.message : e) });
  }
}

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "precache-all") event.waitUntil(precacheAll(event.ports && event.ports[0]));
  if (event.data && event.data.type === "skip-waiting") self.skipWaiting();
});
