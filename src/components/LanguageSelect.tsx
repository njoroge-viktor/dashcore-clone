"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiChevronDown, FiGlobe } from "react-icons/fi";
import { useI18n, type Lang } from "@/lib/i18n";

const options: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export default function LanguageSelect({ up = false }: { up?: boolean }) {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useI18n();
  const current = options.find((o) => o.code === lang)!;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="flex items-center gap-2 rounded-full border border-line-strong px-3 py-1.5 text-sm text-fg/90 transition hover:border-primary/50"
      >
        <FiGlobe className="h-4 w-4" />
        <span>{current.code.toUpperCase()}</span>
        <span className="text-muted">-</span>
        <span>{current.label}</span>
        <FiChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul role="listbox" className={`absolute left-0 z-30 w-44 rounded-xl border border-line-strong bg-surface p-1 shadow-xl ${up ? "bottom-full mb-2" : "top-full mt-2"}`}>
          {options.map((o) => (
            <li key={o.code}>
              <button
                type="button"
                role="option"
                aria-selected={o.code === lang}
                onClick={() => { setLang(o.code); setOpen(false); }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-primary/10"
              >
                <span><span className="font-semibold">{o.code.toUpperCase()}</span> <span className="text-muted">{o.label}</span></span>
                {o.code === lang && <FiCheck className="h-4 w-4 text-primary" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
