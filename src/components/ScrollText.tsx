"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { LogoMark } from "./Logo";
import { useI18n } from "@/lib/i18n";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

export default function ScrollText() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const { t } = useI18n();
  const words = t("about.text").split(" ");

  return (
    <section className="relative overflow-hidden px-4 py-28 sm:px-6 sm:py-36">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" aria-hidden />
      <div className="relative mx-auto max-w-[900px]">
        <div className="mx-auto mb-10 flex h-16 w-16 items-center justify-center rounded-full border border-line-strong bg-surface text-fg shadow-[0_0_60px_-10px] shadow-primary/50">
          <LogoMark className="h-8 w-8" />
        </div>
        <p ref={ref} className="text-3xl font-bold leading-[1.3] tracking-tight sm:text-4xl lg:text-[2.6rem]">
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>
    </section>
  );
}
