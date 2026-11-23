"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import MockPreview from "./MockPreview";
import { BRAND, landingDemos } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

const live = landingDemos.filter((d) => !d.comingSoon);
const columns = [0, 1, 2, 3].map((c) => [...live.slice(c * 3), ...live.slice(0, c * 3)].slice(0, 6));

const avatars = [
  ["AK", "from-rose-400 to-orange-400"],
  ["MJ", "from-sky-400 to-indigo-500"],
  ["LT", "from-emerald-400 to-teal-500"],
  ["RS", "from-amber-300 to-pink-500"],
];

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-bg">
      {/* Tilted wall of page previews */}
      <div className="pointer-events-none absolute inset-0 -z-10 [perspective:1400px]" aria-hidden>
        <div className="absolute left-1/2 top-1/2 flex w-[180vw] max-w-[2600px] -translate-x-1/2 -translate-y-1/2 gap-6 opacity-[0.22] [transform:rotateX(38deg)_rotateZ(-22deg)] dark:opacity-[0.3]">
          {columns.map((col, ci) => (
            <div key={ci} className="flex-1 overflow-hidden">
              <div
                className="drift flex flex-col gap-6"
                style={{ animation: `drift ${70 + ci * 12}s linear infinite`, animationDirection: ci % 2 ? "reverse" : "normal" }}
              >
                {[...col, ...col].map((d, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl border border-white/10">
                    <MockPreview demo={d} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-4 pb-24 pt-36 sm:px-8 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-primary">
            <span className="h-px w-6 bg-primary/50" />
            {t("hero.trusted")}
            <span className="h-px w-6 bg-primary/50" />
          </p>
          <div className="mt-4 flex -space-x-2">
            {avatars.map(([initials, g]) => (
              <span
                key={initials}
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-bg bg-gradient-to-br ${g} text-[11px] font-bold text-white`}
              >
                {initials}
              </span>
            ))}
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-bg bg-surface text-[11px] font-semibold text-fg/80">
              +2k
            </span>
          </div>

          <h1 className="mt-8 bg-gradient-to-r from-fg via-fg to-primary-300 bg-clip-text pb-2 text-[clamp(4rem,13vw,9.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-transparent">
            {BRAND}
          </h1>
          <p className="mt-4 max-w-[520px] text-lg leading-relaxed text-muted sm:text-xl">
            {t("hero.subtitle")}
          </p>
          <a
            href="#demos"
            className="group mt-12 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-400 px-7 py-4 text-base font-semibold text-white shadow-[0_10px_40px_-10px] shadow-primary/60 transition hover:brightness-110"
          >
            {t("nav.getStarted")}
            <FiArrowRight className="transition group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
