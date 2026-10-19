import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MobileNav, Sidebar } from "@/components/Nav";
import { listErrors, reviewQueue } from "@/server/repo";

export const metadata: Metadata = {
  title: { default: "MEWRE PM Academy", template: "%s · MEWRE PM Academy" },
  description: "Applied learning platform for renewable-energy project management at Kuwait's MEWRE.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#111315" },
  ],
};

export const dynamic = "force-dynamic";

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  let due = 0;
  let errors = 0;
  try {
    const q = reviewQueue();
    due = q.due.length + q.fresh.length;
    errors = listErrors().length;
  } catch {
    // DB unavailable (e.g. during static analysis) — render without badges.
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar due={due} errors={errors} />
          <div className="flex min-w-0 flex-1 flex-col">
            <MobileNav due={due} errors={errors} />
            <main className="print-page mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-10 lg:pb-12 lg:pt-10">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
