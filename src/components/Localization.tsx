"use client";

import Flag from "./Flag";
import LanguageSelect from "./LanguageSelect";
import Reveal, { Eyebrow } from "./Reveal";
import { languages } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

const rows = [languages.slice(0, 5), languages.slice(5, 10), languages.slice(10, 15)];

export default function Localization() {
  const { t } = useI18n();
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <Reveal>
          <Eyebrow>{t("l10n.eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            {t("l10n.title1")}
            <br />
            <span className="text-muted">{t("l10n.title2")}</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            {t("l10n.desc")}
          </p>
          <div className="mt-8">
            <LanguageSelect />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="fade-x space-y-4 overflow-hidden py-2">
          {rows.map((row, ri) => (
            <div key={ri} className="pause-on-hover overflow-hidden">
              <div className={`marquee gap-4 ${ri % 2 ? "marquee-reverse" : ""}`} style={{ ["--duration" as string]: `${28 + ri * 6}s` }}>
                {[...row, ...row].map((l, i) => (
                  <span
                    key={i}
                    className="flex shrink-0 items-center gap-3 rounded-full border border-line bg-surface/70 px-5 py-3 text-base font-semibold"
                  >
                    <Flag code={l.flag} />
                    {l.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
