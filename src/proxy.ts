/**
 * Private platform: every page and data file requires a signed-in Supabase session whose email is on the
 * allowlist (ALLOWED_EMAILS, falling back to AI_ALLOWED_EMAILS). Runs before the CDN cache, so static pages
 * are gated too. The API routes check a bearer token themselves; static assets and /login stay public.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { AUTH_COOKIE, SUPABASE_KEY, SUPABASE_URL, allowedEmails } from "@/lib/supabase-config";

export async function proxy(request: NextRequest) {
  // Local development and test servers can opt out explicitly.
  if (process.env.ACADEMY_AUTH_DISABLED === "1") return NextResponse.next();

  let response = NextResponse.next({ request });
  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookieOptions: { name: AUTH_COOKIE },
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        // refreshed tokens must reach both the rendered request and the browser
        for (const { name, value } of list) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of list) response.cookies.set(name, value, options);
      },
    },
  });

  // getClaims verifies the JWT signature (JWKS for asymmetric keys, Auth server otherwise).
  const { data } = await supabase.auth.getClaims();
  const email = typeof data?.claims?.email === "string" ? data.claims.email.toLowerCase() : null;
  const allow = allowedEmails();
  const ok = !!email && (allow.length ? allow.includes(email) : process.env.NODE_ENV !== "production");
  if (ok) return response;

  const { pathname, search } = request.nextUrl;
  if (pathname.startsWith("/data/")) return new NextResponse("Sign in required", { status: 401 });
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = email ? "?denied=1" : `?next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // everything except Next internals, icons/manifest, the service worker, the login page and the API (bearer auth)
    "/((?!_next/static|_next/image|api/|login|sw\\.js|.*\\.(?:png|ico|svg|webmanifest)$).*)",
  ],
};
