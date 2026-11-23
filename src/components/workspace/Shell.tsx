"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiCode, FiCreditCard, FiLogOut, FiRotateCcw, FiShield, FiUser } from "react-icons/fi";
import { Avatar, cx } from "../ui";
import { justLoggedOut, logout, useSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { useToast } from "../interactive";

const nav = [
  { href: "/workspace/account/profile", label: "Account", icon: FiUser },
  { href: "/workspace/billing/overview", label: "Billing", icon: FiCreditCard },
  { href: "/workspace/access/team", label: "Access", icon: FiShield },
  { href: "/workspace/developers/api-keys", label: "Developers", icon: FiCode },
];

export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const { session, ready } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (ready && !session && !justLoggedOut()) router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`);
  }, [ready, session, pathname, router]);

  if (!ready || !session)
    return <div className="flex min-h-[60vh] items-center justify-center pt-28 text-sm text-muted">Checking your session…</div>;

  return (
    <div className="mx-auto grid max-w-[1180px] gap-8 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-[220px_1fr]">
      <aside className="lg:sticky lg:top-28 lg:h-fit">
        <div className="mb-6 hidden items-center gap-3 lg:flex">
          <Avatar name={session.name} size={40} />
          <div className="min-w-0"><p className="truncate text-sm font-semibold">{session.name}</p><p className="truncate text-xs text-muted">{session.email}</p></div>
        </div>
        <p className="mb-2 hidden text-xs font-bold uppercase tracking-wider text-muted lg:block">Workspace</p>
        <nav aria-label="Workspace" className="flex gap-1 overflow-x-auto lg:flex-col">
          {nav.map((n) => {
            const on = pathname === n.href;
            return (
              <Link key={n.href} href={n.href} aria-current={on ? "page" : undefined}
                className={cx("flex shrink-0 items-center gap-3 rounded-xl px-3 py-2 text-sm transition", on ? "bg-primary/15 font-semibold text-primary" : "text-fg/70 hover:bg-fg/5 hover:text-fg")}>
                <n.icon /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-6 hidden space-y-1 border-t border-line pt-4 lg:block">
          <button type="button" onClick={() => { db.reset(); toast({ tone: "info", title: "Demo data reset", desc: "All collections restored from db.json." }); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-fg/70 hover:bg-fg/5 hover:text-fg">
            <FiRotateCcw /> Reset demo data
          </button>
          <button type="button" onClick={() => { router.push("/"); logout(); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-rose-500 hover:bg-rose-500/10">
            <FiLogOut /> Sign out
          </button>
        </div>
      </aside>
      <div className="min-w-0 rounded-3xl border border-line bg-card/40 p-5 sm:p-8">{children}</div>
    </div>
  );
}

export function PageTitle({ title, desc, children }: { title: string; desc: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
      <div><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1><p className="mt-2 text-sm text-muted">{desc}</p></div>
      {children}
    </div>
  );
}

export function Panel({ title, desc, children, action }: { title: string; desc?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-bg/40 p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div><h2 className="text-lg font-semibold">{title}</h2>{desc && <p className="mt-1 text-sm text-muted">{desc}</p>}</div>
        {action}
      </div>
      {children}
    </section>
  );
}
