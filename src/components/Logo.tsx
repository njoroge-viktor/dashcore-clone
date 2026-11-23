import Link from "next/link";
import { BRAND } from "@/lib/data";

export function LogoMark({ className = "h-6 w-6" }: { className?: string }) {
  // Original mark: an open ring with a centred core.
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M24.5 9.5A11 11 0 1 0 24.5 22.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="12" y="12" width="8" height="8" rx="2.5" fill="currentColor" />
    </svg>
  );
}

export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold text-fg" aria-label={`${BRAND} home`}>
      <span className="text-primary-400">
        <LogoMark className={size === "lg" ? "h-8 w-8" : "h-6 w-6"} />
      </span>
      <span className={size === "lg" ? "text-xl" : "text-[15px]"}>{BRAND}</span>
    </Link>
  );
}
