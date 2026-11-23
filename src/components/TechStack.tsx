"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { SiJavascript, SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiVite } from "react-icons/si";
import Reveal, { Eyebrow } from "./Reveal";
import { useI18n } from "@/lib/i18n";

const next = { Icon: SiNextdotjs, name: "Next.js" };
const tw = { Icon: SiTailwindcss, name: "Tailwind CSS" };
const react = { Icon: SiReact, name: "React" };
const vite = { Icon: SiVite, name: "Vite" };
const ts = { Icon: SiTypescript, name: "TypeScript" };
const js = { Icon: SiJavascript, name: "JavaScript" };

const rows = [
  [next, tw, react],
  [vite, ts, js, next],
  [tw, react, vite],
];

export default function TechStack() {
  const { t } = useI18n();
  return (
    <section id="tech" className="px-4 py-16 sm:px-6">
      <Reveal>
        <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[2rem] border border-line bg-gradient-to-b from-card to-bg p-8 sm:p-12 lg:p-16">
          <span className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <span className="absolute bottom-0 left-1/2 h-px w-1/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>{t("tech.eyebrow")}</Eyebrow>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                {t("tech.title1")}
                <br />
                {t("tech.title2")}
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                {t("tech.desc")}
              </p>
              <Link
                href="/company/services"
                className="group mt-8 inline-flex items-center gap-3 rounded-full border border-line-strong bg-fg/[0.03] px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary/50"
              >
                {t("tech.cta")}
                <FiArrowRight className="transition group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex flex-col items-center gap-3 sm:gap-4">
              {rows.map((row, ri) => (
                <div key={ri} className="flex gap-3 sm:gap-4">
                  {row.map(({ Icon, name }, i) => (
                    <span
                      key={i}
                      title={name}
                      aria-label={name}
                      role="img"
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-surface/60 text-fg/90 shadow-inner transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:text-primary sm:h-20 sm:w-24"
                    >
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
