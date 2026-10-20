"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLearner } from "@/lib/store/react";
import { openErrors, reviewQueue } from "@/lib/store/derive";
import { useContent } from "@/lib/useContent";
import { SyncDot } from "@/components/SyncDot";
import { langFromPath, lp, switchPath, t as tr, type Lang } from "@/lib/i18n";
import { storeLang, storedLang, useT } from "@/lib/useLang";

function useBadges() {
  const store = useLearner();
  const content = useContent();
  if (!store) return { due: 0, errors: 0 };
  const d = store.derived();
  const errors = openErrors(d).filter((e) => !content || content.questions[e.questionId]).length;
  if (!content) return { due: 0, errors };
  const q = reviewQueue(d, content.cardOrder, store.settings().newCardsPerDay);
  return { due: q.due.length + q.fresh.length, errors };
}

type Item = { href: string; label: string; icon: string; badge?: number };

const ICONS: Record<string, string> = {
  home: "M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z",
  book: "M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-5a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h6z",
  cards: "M4 7h12v13H4zM8 3h12v13",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-3.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z",
  alert: "M12 3 2 20h20L12 3zm0 6v5m0 3v.5",
  route: "M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 15V9a4 4 0 0 1 4-4h6M18 9v6a4 4 0 0 1-4 4H8",
  flag: "M5 21V4h11l-1.5 4L16 12H5",
  lang: "M4 5h9M8.5 3v2c0 4-2 7-4.5 8.5M6 9c1 2 3 3.5 6 4.5M13 21l4-9 4 9m-6.5-3h5",
  sigma: "M18 5H6l6 7-6 7h12",
  graph: "M6 6m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0M18 6m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0M12 18m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0M8 6h8M7 8l4 8m6-8-4 8",
  library: "M4 4v16M9 4v16M14 4l5 16",
  note: "M5 3h10l4 4v14H5zM9 9h6M9 13h6M9 17h4",
  chat: "M4 5h16v11H8l-4 4z",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7.6 7.6 0 0 0-2-1.2L14.5 3h-5l-.4 2.6a7.6 7.6 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7.6 7.6 0 0 0 2 1.2l.4 2.6h5l.4-2.6a7.6 7.6 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z",
  stethoscope: "M6 3v6a4 4 0 0 0 8 0V3M10 13v3a5 5 0 0 0 10 0v-2m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  timer: "M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-8V9m-3-7h6",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2m0 18v2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  menu: "M4 6h16M4 12h16M4 18h16",
};

export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={ICONS[name] ?? ICONS.home} />
    </svg>
  );
}

function groups(due: number, errors: number, lang: Lang): { title: string; items: Item[] }[] {
  const raw: { title: string; items: Item[] }[] = [
    {
      title: "Study",
      items: [
        { href: "/", label: "Dashboard", icon: "home" },
        { href: "/learn", label: "Curriculum", icon: "book" },
        { href: "/review", label: "Daily review", icon: "cards", badge: due },
        { href: "/practice", label: "Practice & exams", icon: "target" },
        { href: "/errors", label: "Error log", icon: "alert", badge: errors },
        { href: "/diagnostic", label: "Diagnostic", icon: "stethoscope" },
      ],
    },
    {
      title: "Apply",
      items: [
        { href: "/scenarios", label: "Day in the life", icon: "route" },
        { href: "/capstone", label: "Capstone", icon: "flag" },
        { href: "/tutor", label: "AI tutor", icon: "chat" },
      ],
    },
    {
      title: "Reference",
      items: [
        { href: "/glossary", label: "Glossary EN/AR", icon: "lang" },
        { href: "/formulas", label: "Formula sheet", icon: "sigma" },
        { href: "/concepts", label: "Concept map", icon: "graph" },
        { href: "/library", label: "Library", icon: "library" },
        { href: "/notes", label: "My notes", icon: "note" },
        { href: "/settings", label: "Settings", icon: "gear" },
      ],
    },
  ];
  return raw.map((g) => ({ title: tr(lang, g.title), items: g.items.map((it) => ({ ...it, href: lp(lang, it.href), label: tr(lang, it.label) })) }));
}

function isActive(pathname: string, href: string) {
  const home = href === "/" || href === "/ar";
  return home ? pathname === href : pathname === href || pathname.startsWith(href + "/");
}

/** Switches between the English and Arabic version of the current page and remembers the choice. */
export function LangToggle({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const lang = langFromPath(pathname);
  const to: Lang = lang === "ar" ? "en" : "ar";
  return (
    <button
      onClick={() => {
        storeLang(to);
        router.push(switchPath(pathname, to) + window.location.search + window.location.hash);
      }}
      className={`rounded-lg px-2 py-1.5 text-sm font-medium text-muted hover:bg-surface-2 hover:text-text ${className}`}
      title={to === "ar" ? "عرض المنصة بالعربية" : "Switch to English"}
      aria-label={to === "ar" ? "Switch to Arabic" : "Switch to English"}
    >
      {to === "ar" ? <span lang="ar">عربي</span> : "EN"}
    </button>
  );
}

/** Keeps <html lang/dir> in sync with the URL and opens the Arabic home when that was the last choice. */
export function LangSync() {
  const pathname = usePathname();
  const router = useRouter();
  const lang = langFromPath(pathname);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  useEffect(() => {
    if (pathname === "/" && storedLang() === "ar") router.replace("/ar");
    // only on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);
  const label = useT().t("Toggle dark mode");
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };
  return (
    <button onClick={toggle} className="rounded-lg p-2 text-muted hover:bg-surface-2 hover:text-text" aria-label={label} title={label}>
      <Icon name={dark ? "sun" : "moon"} />
    </button>
  );
}

function NavList({ due, errors, onNavigate }: { due: number; errors: number; onNavigate?: () => void }) {
  const pathname = usePathname();
  const lang = langFromPath(pathname);
  return (
    <nav className="space-y-5">
      {groups(due, errors, lang).map((g) => (
        <div key={g.title}>
          <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">{g.title}</div>
          <ul className="space-y-0.5">
            {g.items.map((it) => {
              const active = isActive(pathname, it.href);
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      active ? "bg-accent-soft font-medium text-accent" : "text-text/80 hover:bg-surface-2"
                    }`}
                  >
                    <Icon name={it.icon} className="h-[18px] w-[18px]" />
                    <span className="flex-1">{it.label}</span>
                    {!!it.badge && <span className="rounded-full bg-sun-soft px-1.5 text-xs font-semibold tabular-nums text-sun">{it.badge}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function Sidebar() {
  const { due, errors } = useBadges();
  return (
    <aside className="no-print sticky top-0 hidden h-screen w-60 shrink-0 flex-col overflow-y-auto border-e border-border bg-surface px-3 py-5 lg:flex">
      <Brand />
      <div className="mt-6 flex-1">
        <NavList due={due} errors={errors} />
      </div>
      <div className="flex items-center justify-between px-2 pt-4 text-xs text-muted">
        <SyncDot />
        <span className="flex items-center">
          <LangToggle />
          <ThemeToggle />
        </span>
      </div>
    </aside>
  );
}

function Brand() {
  const { t, href } = useT();
  return (
    <Link href={href("/")} className="flex items-center gap-2.5 px-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-white dark:text-black">
        <Icon name="sun" className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold">MEWRE PM Academy</span>
        <span className="block text-[11px] text-muted">{t("Renewables · Kuwait")}</span>
      </span>
    </Link>
  );
}

export function MobileNav() {
  const { due, errors } = useBadges();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t, href } = useT();
  useEffect(() => setOpen(false), [pathname]);
  const tabs: Item[] = [
    { href: href("/"), label: t("Home"), icon: "home" },
    { href: href("/learn"), label: t("Learn"), icon: "book" },
    { href: href("/review"), label: t("Review"), icon: "cards", badge: due },
    { href: href("/practice"), label: t("Practice"), icon: "target" },
  ];
  return (
    <>
      <header className="no-print sticky top-0 z-30 flex items-center justify-between border-b border-border bg-surface/95 px-4 py-2.5 backdrop-blur lg:hidden">
        <Brand />
        <div className="flex items-center gap-1">
          <SyncDot compact />
          <LangToggle />
          <ThemeToggle />
          <button onClick={() => setOpen((o) => !o)} className="rounded-lg p-2 hover:bg-surface-2" aria-label={t("Menu")}>
            <Icon name="menu" />
          </button>
        </div>
      </header>
      {open && (
        <div className="no-print fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute end-0 top-0 h-full w-72 overflow-y-auto bg-surface p-4" onClick={(e) => e.stopPropagation()}>
            <NavList due={due} errors={errors} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
      <nav className="no-print fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        {tabs.map((t) => (
          <Link key={t.href} href={t.href} className={`relative flex flex-col items-center gap-0.5 py-2 text-[11px] ${isActive(pathname, t.href) ? "text-accent" : "text-muted"}`}>
            <Icon name={t.icon} />
            {t.label}
            {!!t.badge && <span className="absolute end-[28%] top-1 rounded-full bg-sun px-1 text-[10px] font-bold text-white dark:text-black">{t.badge}</span>}
          </Link>
        ))}
      </nav>
    </>
  );
}
