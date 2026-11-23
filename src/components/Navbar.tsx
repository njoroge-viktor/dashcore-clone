"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiLogOut, FiMenu, FiSettings, FiX } from "react-icons/fi";
import { Logo } from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { Avatar } from "./ui";
import { navMenus } from "@/lib/data";
import { useI18n } from "@/lib/i18n";
import { logout, useSession } from "@/lib/auth";

function UserMenu() {
  const { session } = useSession();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  if (!session)
    return (
      <>
        <Link href="/auth/login" className="px-2 text-sm text-fg/70 transition hover:text-fg">{t("nav.signin")}</Link>
        <Link href="/auth/signup" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-400">
          {t("nav.getStarted")}
        </Link>
      </>
    );
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Account menu" className="flex items-center gap-2 rounded-full p-0.5 pr-3 transition hover:bg-fg/5">
        <Avatar name={session.name} size={32} />
        <span className="text-sm font-medium">{session.name.split(" ")[0]}</span>
        <FiChevronDown className="h-3 w-3 opacity-60" />
      </button>
      {open && (
        <div className="absolute right-0 top-full w-56 pt-2">
          <div className="rounded-2xl border border-line-strong bg-surface p-2 shadow-2xl">
            <p className="truncate px-3 py-2 text-xs text-muted">{session.email}</p>
            <Link href="/workspace/account/profile" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-primary/10"><FiSettings /> Workspace</Link>
            <button
              type="button"
              onClick={() => { router.push("/"); logout(); }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-rose-500 hover:bg-rose-500/10"
            >
              <FiLogOut /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const pathname = usePathname();
  const { t } = useI18n();
  const { session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const pill = scrolled || mobileOpen;
  const label = (k: string) => t(`nav.${k}` as Parameters<typeof t>[0]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-[1240px] items-center justify-between transition-all duration-300 ${
          pill
            ? "mt-2 max-w-[1100px] rounded-full border border-line bg-surface/80 px-4 py-2.5 shadow-lg shadow-black/10 backdrop-blur-xl sm:px-5"
            : "mt-0 px-2 py-5 lg:px-6"
        }`}
        aria-label="Main"
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenMenu(null)}>
          {navMenus.map((menu) => (
            <li key={menu.key} className="relative" onMouseEnter={() => setOpenMenu(menu.key)}>
              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === menu.key ? null : menu.key)}
                aria-expanded={openMenu === menu.key}
                className="flex items-center gap-1 rounded-full px-3 py-2 text-sm text-fg/70 transition hover:text-fg"
              >
                {label(menu.key)}
                <FiChevronDown className={`h-3 w-3 opacity-60 transition ${openMenu === menu.key ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openMenu === menu.key && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                  >
                    <div
                      className={`grid gap-1 rounded-2xl border border-line-strong bg-surface/95 p-3 shadow-2xl backdrop-blur-xl ${
                        menu.items.length > 10 ? "w-[560px] grid-cols-3" : "w-[460px] grid-cols-2"
                      }`}
                    >
                      {menu.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`rounded-xl px-3 py-2 transition hover:bg-primary/10 ${pathname === item.href ? "bg-primary/10" : ""}`}
                        >
                          <span className="block text-sm font-medium text-fg">{item.label}</span>
                          {item.desc && <span className="block truncate text-xs text-muted">{item.desc}</span>}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <UserMenu />
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full text-fg lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-h-[calc(100dvh-90px)] max-w-[1100px] overflow-y-auto rounded-3xl border border-line bg-surface/95 p-4 backdrop-blur-xl lg:hidden"
          >
            {navMenus.map((menu) => (
              <div key={menu.key} className="border-b border-line last:border-0">
                <button
                  type="button"
                  onClick={() => setMobileSection(mobileSection === menu.key ? null : menu.key)}
                  className="flex w-full items-center justify-between py-3 text-left font-medium"
                  aria-expanded={mobileSection === menu.key}
                >
                  {label(menu.key)}
                  <FiChevronDown className={`transition ${mobileSection === menu.key ? "rotate-180" : ""}`} />
                </button>
                {mobileSection === menu.key && (
                  <div className="grid grid-cols-2 gap-1 pb-3">
                    {menu.items.map((item) => (
                      <Link key={item.href} href={item.href} className="rounded-lg px-2 py-1.5 text-sm text-muted hover:text-fg">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex items-center gap-3">
              <ThemeToggle />
              {session ? (
                <>
                  <Link href="/workspace/account/profile" className="flex-1 rounded-full border border-line-strong py-2 text-center text-sm">Workspace</Link>
                  <button type="button" onClick={() => { router.push("/"); logout(); }} className="flex-1 rounded-full bg-rose-500/15 py-2 text-center text-sm font-semibold text-rose-500">Sign out</button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="flex-1 rounded-full border border-line-strong py-2 text-center text-sm">{t("nav.signin")}</Link>
                  <Link href="/auth/signup" className="flex-1 rounded-full bg-primary py-2 text-center text-sm font-semibold text-white">{t("nav.getStarted")}</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
