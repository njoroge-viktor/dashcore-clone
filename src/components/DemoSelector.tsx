"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n, type DictKey } from "@/lib/i18n";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiFileText, FiLayout, FiLock, FiSidebar, FiTool } from "react-icons/fi";
import MockPreview from "./MockPreview";
import Reveal from "./Reveal";
import { innerDemos, landingDemos, utilityDemos, workspaceDemos, type Demo } from "@/lib/data";

const tabs = [
  { id: "landing", label: "demos.tab.landing" as DictKey, icon: FiLayout, demos: landingDemos },
  { id: "workspaces", label: "demos.tab.workspaces" as DictKey, icon: FiSidebar, demos: workspaceDemos },
  { id: "inner", label: "demos.tab.inner" as DictKey, icon: FiFileText, demos: innerDemos },
  { id: "utilities", label: "demos.tab.utilities" as DictKey, icon: FiTool, demos: utilityDemos },
];

function DemoCard({ demo }: { demo: Demo }) {
  const { t } = useI18n();
  if (demo.comingSoon) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-slate-700/40 to-black">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="absolute -translate-y-3 select-none text-sm font-semibold text-white/30 blur-[3px]">{demo.name}</span>
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white">
            <FiLock />
          </span>
          <span className="relative text-xs font-bold uppercase tracking-[0.15em] text-white">{t("demos.soon")}</span>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={demo.href ?? "/"}
      className="group relative block overflow-hidden rounded-3xl border border-line-strong bg-[#0b1222] shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-primary/50"
    >
      <MockPreview demo={demo} className="transition duration-500 group-hover:scale-[1.03]" />
      {demo.isNew && (
        <span className="absolute right-4 top-4 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          New
        </span>
      )}
      {/* Caption: always on for touch, revealed on hover for desktop */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5 pt-16 transition duration-300 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
        <div className="mb-2 flex gap-1.5">
          {demo.tags.map((t) => (
            <span key={t} className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/90">
              {t}
            </span>
          ))}
        </div>
        <p className="text-xl font-bold text-white">{demo.name}</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-white/80">
          {t("demos.view")} <FiArrowRight className="transition group-hover:translate-x-1" />
        </p>
      </div>
    </Link>
  );
}

export default function DemoSelector() {
  const { t } = useI18n();
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active)!;

  return (
    <section id="demos" className="scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-[1100px]">
        <span className="mx-auto mb-20 block h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <Reveal className="text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">{t("demos.title")}</h2>
          <p className="mt-4 text-base text-fg/80">{t("demos.subtitle")}</p>
        </Reveal>

        <div className="sticky top-20 z-20 mt-10 flex justify-center">
          <div role="tablist" aria-label="Demo categories" className="flex gap-1 rounded-full border border-line bg-surface/80 p-1.5 backdrop-blur-xl">
            {tabs.map((tb) => {
              const Icon = tb.icon;
              const on = tb.id === active;
              return (
                <button
                  key={tb.id}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-label={t(tb.label)}
                  onClick={() => setActive(tb.id)}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-6 sm:py-3 ${on ? "text-white" : "text-fg/80 hover:text-fg"}`}
                >
                  {on && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", duration: 0.45 }} />}
                  <Icon className="relative h-4 w-4" />
                  <span className="relative hidden sm:inline">{t(tb.label)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {tab.demos.map((d) => (
              <DemoCard key={d.name} demo={d} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
