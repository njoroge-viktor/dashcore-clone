"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function CallToAction() {
  const { t } = useI18n();
  const words = t("cta.title").split(" ");
  return (
    <section className="relative overflow-hidden px-4 py-32 sm:px-6 sm:py-40">
      {/* concentric rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2" aria-hidden>
        {[220, 340, 460].map((s) => (
          <span key={s} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line" style={{ width: s, height: s }} />
        ))}
        <span className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1100px] text-center">
        <h2 className="text-4xl font-bold tracking-[-0.03em] sm:text-5xl lg:text-[4rem]">
          {words.map((w, i) => (
            <motion.span
              key={w + i}
              className="mr-[0.25em] inline-block"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              {w}
            </motion.span>
          ))}
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="mt-6 text-lg text-muted sm:text-xl">{t("cta.desc")}</p>
          <Link
            href="/auth/signup"
            className="mt-10 inline-flex rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-[0_10px_40px_-8px] shadow-primary/60 transition hover:bg-primary-400"
          >
            {t("cta.button")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
