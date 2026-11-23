"use client";

import Link from "next/link";
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Logo } from "./Logo";
import LanguageSelect from "./LanguageSelect";
import ThemeToggle from "./ThemeToggle";
import { BRAND } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

const columns = [
  {
    key: "footer.platform" as const,
    links: [
      { label: "Secure Access", href: "/auth/login" },
      { label: "Register", href: "/auth/signup" },
      { label: "AI Chat Integration", href: "/ai-chat" },
      { label: "Workspace", href: "/workspace/account/profile" },
    ],
  },
  {
    key: "footer.landing" as const,
    links: [
      { label: "Software", href: "/software" },
      { label: "Developers", href: "/developers" },
      { label: "CRM Page", href: "/crm" },
      { label: "Personal Page", href: "/personal" },
    ],
  },
  {
    key: "footer.company" as const,
    links: [
      { label: `About ${BRAND}`, href: "/company/about" },
      { label: "Services", href: "/company/services" },
      { label: "Contact Us", href: "/company/contact" },
      { label: `Why ${BRAND}?`, href: "/company/why-corevia" },
    ],
  },
];

const socials = [
  { icon: FaXTwitter, label: "X", href: "https://x.com" },
  { icon: FaGithub, label: "GitHub", href: "https://github.com" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: FaDiscord, label: "Discord", href: "https://discord.com" },
];

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative px-4 pb-10 pt-16 sm:px-6">
      <span className="absolute inset-x-0 top-0 mx-auto h-px max-w-[1100px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-[1100px]">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo size="lg" />
            <p className="mt-3 text-sm text-fg/80">{t("footer.tagline")}</p>
            <div className="mt-6 flex items-center gap-3">
              <LanguageSelect up />
              <ThemeToggle />
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.key}>
              <h3 className="text-sm font-semibold">{t(col.key)}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-fg/70 transition hover:text-primary">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-line pt-8 sm:flex-row">
          <p className="text-center text-xs text-fg/70 sm:text-left">
            © {new Date().getFullYear()} {BRAND}. {t("footer.rights")}{" "}
            <Link href="/company/privacy" className="underline-offset-2 hover:underline">Privacy</Link> ·{" "}
            <Link href="/company/terms" className="underline-offset-2 hover:underline">Terms</Link>
          </p>
          <div className="flex items-center gap-5">
            {socials.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-fg/80 transition hover:text-primary">
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
