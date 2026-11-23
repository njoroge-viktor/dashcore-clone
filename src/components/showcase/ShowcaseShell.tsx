"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiAperture, FiArrowLeft, FiArrowRight, FiBarChart2, FiBell, FiBox, FiCreditCard, FiDroplet, FiEdit3, FiFeather, FiGithub,
  FiGrid, FiImage, FiLayers, FiLayout, FiList, FiMenu, FiMessageSquare, FiMonitor, FiMousePointer, FiSearch, FiSidebar,
  FiSliders, FiStar, FiType, FiX, FiZap,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { Logo } from "../Logo";
import ThemeToggle from "../ThemeToggle";
import { cx } from "../ui";
import { showcaseGroups, showcaseItems } from "@/lib/data";

export const showcaseIcons: Record<string, IconType> = {
  typography: FiType, buttons: FiMousePointer, "design-tokens": FiDroplet, icons: FiFeather, cards: FiLayers, charts: FiBarChart2,
  testimonials: FiMessageSquare, logos: FiImage, footers: FiLayout, navigation: FiMenu, sections: FiSidebar, patterns: FiGrid,
  forms: FiEdit3, accordions: FiList, carousel: FiSliders, feedback: FiBell, pricing: FiCreditCard, animations: FiZap,
  effects: FiAperture, mockups: FiMonitor,
};

function Palette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => showcaseItems.filter((s) => (s.label + s.title + s.desc).toLowerCase().includes(q.toLowerCase())), [q]);
  useEffect(() => { if (open) { setQ(""); setI(0); setTimeout(() => inputRef.current?.focus(), 10); } }, [open]);
  useEffect(() => setI(0), [q]);
  if (!open) return null;
  const go = (slug: string) => { router.push(`/showcase/${slug}`); onClose(); };
  return (
    <div className="fixed inset-0 z-[95] flex items-start justify-center p-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search components">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <FiSearch className="text-muted" />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search components…" aria-label="Search components"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setI((x) => Math.min(results.length - 1, x + 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setI((x) => Math.max(0, x - 1)); }
              if (e.key === "Enter" && results[i]) go(results[i].slug);
              if (e.key === "Escape") onClose();
            }}
            className="w-full bg-transparent py-4 text-sm outline-none" />
          <kbd className="rounded border border-line px-1.5 text-[10px] text-muted">ESC</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
          {results.map((r, idx) => {
            const I = showcaseIcons[r.slug] ?? FiBox;
            return (
              <li key={r.slug} role="option" aria-selected={idx === i}>
                <button type="button" onMouseEnter={() => setI(idx)} onClick={() => go(r.slug)} className={cx("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm", idx === i && "bg-primary/10 text-primary")}>
                  <I /> <span className="font-medium">{r.label}</span><span className="ml-auto truncate text-xs text-muted">{r.title}</span>
                </button>
              </li>
            );
          })}
          {!results.length && <li className="px-3 py-6 text-center text-sm text-muted">No components match “{q}”.</li>}
        </ul>
      </div>
    </div>
  );
}

export default function ShowcaseShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [palette, setPalette] = useState(false);
  const [menu, setMenu] = useState(false);
  const slug = pathname.split("/")[2];
  const idx = showcaseItems.findIndex((s) => s.slug === slug);
  const prev = showcaseItems[idx - 1];
  const next = showcaseItems[idx + 1];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette((p) => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => setMenu(false), [pathname]);

  const Sidebar = (
    <nav aria-label="Components" className="space-y-6">
      {showcaseGroups.map((g) => (
        <div key={g.group}>
          <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-muted">{g.group}</p>
          {g.items.map((s) => {
            const I = showcaseIcons[s.slug] ?? FiBox;
            const on = s.slug === slug;
            return (
              <Link key={s.slug} href={`/showcase/${s.slug}`} aria-current={on ? "page" : undefined}
                className={cx("flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm transition", on ? "bg-primary/15 font-semibold text-primary" : "text-fg/75 hover:bg-fg/5 hover:text-fg")}>
                <I className="h-4 w-4" /> {s.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-[100dvh] bg-bg-deep">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-xl">
        <div className="flex h-14 items-center gap-3 px-4">
          <button type="button" onClick={() => setMenu((m) => !m)} className="rounded-lg p-2 lg:hidden" aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu}>{menu ? <FiX /> : <FiMenu />}</button>
          <Logo />
          <button type="button" onClick={() => setPalette(true)} className="ml-2 hidden items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:border-line-strong sm:flex">
            <FiSearch /> Search components <kbd className="ml-6 rounded border border-line px-1.5 text-[10px]">⌘K</kbd>
          </button>
          <button type="button" onClick={() => setPalette(true)} className="rounded-lg p-2 sm:hidden" aria-label="Search components"><FiSearch /></button>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/" className="hidden rounded-lg px-3 py-1.5 text-sm text-fg/75 hover:text-fg sm:block">Home</Link>
            <Link href="/showcase/typography" className="hidden rounded-lg px-3 py-1.5 text-sm text-fg/75 hover:text-fg sm:block">Docs</Link>
            <a href="https://github.com/njoroge-viktor/dashcore-clone" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-fg/75 hover:text-fg"><FiGithub /> <span className="hidden sm:inline">GitHub</span></a>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-line bg-bg/60 p-4 lg:block">{Sidebar}</aside>
        {menu && <div className="fixed inset-x-0 bottom-0 top-14 z-30 overflow-y-auto bg-bg p-4 lg:hidden">{Sidebar}</div>}
        <main className="min-w-0 flex-1 px-4 py-10 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl">
            {children}
            {idx >= 0 && (
              <div className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
                {prev ? (
                  <Link href={`/showcase/${prev.slug}`} className="rounded-2xl border border-line p-4 transition hover:border-primary/50">
                    <span className="flex items-center gap-1 text-xs text-muted"><FiArrowLeft /> Previous</span><span className="font-semibold">{prev.label}</span>
                  </Link>
                ) : <span />}
                {next && (
                  <Link href={`/showcase/${next.slug}`} className="rounded-2xl border border-line p-4 text-right transition hover:border-primary/50">
                    <span className="flex items-center justify-end gap-1 text-xs text-muted">Next <FiArrowRight /></span><span className="font-semibold">{next.label}</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      <Palette open={palette} onClose={() => setPalette(false)} />
    </div>
  );
}

export function Demo({ title, children, className = "", note }: { title: string; children: React.ReactNode; className?: string; note?: string }) {
  return (
    <section className="mt-14">
      <h2 className="mb-2 text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
      {note && <p className="mb-4 text-sm text-muted">{note}</p>}
      <div className={cx("mt-4 rounded-3xl border border-line bg-bg p-5 sm:p-8", className)}>{children}</div>
    </section>
  );
}

export function ShowcaseHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <header>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-muted">{desc}</p>
    </header>
  );
}

export const StarIcon = FiStar;
