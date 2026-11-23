import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-[1140px] px-4 sm:px-6", className)}>{children}</div>;
}

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cx("relative py-20 sm:py-24", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={cx("flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary", center && "justify-center")}>
      <span className="h-px w-6 bg-primary/40" />
      {children}
      <span className="h-px w-6 bg-primary/40" />
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cx(center ? "mx-auto max-w-2xl text-center" : "max-w-2xl", "mb-12", className)}>
      {eyebrow && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]">{title}</h2>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}

type BtnVariant = "primary" | "secondary" | "ghost" | "white";
type BtnSize = "sm" | "md" | "lg";
const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50";
const btnVariants: Record<BtnVariant, string> = {
  primary: "bg-primary text-white shadow-[0_8px_30px_-10px] shadow-primary/60 hover:bg-primary-400",
  secondary: "border border-line-strong bg-fg/[0.03] text-fg hover:border-primary/50",
  ghost: "text-fg/80 hover:bg-fg/5 hover:text-fg",
  white: "bg-white text-slate-900 hover:bg-slate-100",
};
const btnSizes: Record<BtnSize, string> = { sm: "px-3.5 py-1.5 text-xs", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };

export function buttonClass(variant: BtnVariant = "primary", size: BtnSize = "md", extra = "") {
  return cx(btnBase, btnVariants[variant], btnSizes[size], extra);
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: BtnVariant; size?: BtnSize }) {
  return <button type="button" {...props} className={buttonClass(variant, size, className)} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: {
  href: string;
  variant?: BtnVariant;
  size?: BtnSize;
  className?: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  if (external)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={buttonClass(variant, size, className)}>
        {children}
      </a>
    );
  return (
    <Link href={href} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cx("rounded-3xl border border-line bg-card/60 p-6 sm:p-8", className)}>{children}</div>;
}

const badgeTones = {
  primary: "bg-primary/15 text-primary",
  success: "bg-emerald-500/15 text-emerald-500",
  warning: "bg-amber-500/15 text-amber-500",
  danger: "bg-rose-500/15 text-rose-500",
  neutral: "bg-fg/10 text-fg/70",
} as const;
export function Badge({ children, tone = "primary", className = "" }: { children: ReactNode; tone?: keyof typeof badgeTones; className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider", badgeTones[tone], className)}>
      {children}
    </span>
  );
}

export function IconBubble({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-xl text-primary", className)}>
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40 sm:pb-20 sm:pt-44">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" aria-hidden />
      <Container className="relative text-center">
        {eyebrow && <Eyebrow center>{eyebrow}</Eyebrow>}
        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">{subtitle}</p>}
        {children}
      </Container>
    </section>
  );
}

export function Avatar({ name, size = 40, className = "" }: { name: string; size?: number; className?: string }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const palette = ["from-rose-400 to-orange-400", "from-sky-400 to-indigo-500", "from-emerald-400 to-teal-500", "from-amber-300 to-pink-500", "from-violet-400 to-fuchsia-500", "from-cyan-400 to-blue-500"];
  const g = palette[[...name].reduce((a, ch) => a + ch.charCodeAt(0), 0) % palette.length];
  return (
    <span
      className={cx("inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white", g, className)}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

export function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="flex gap-0.5 text-amber-400" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={cx("h-4 w-4", i >= n && "opacity-25")} fill="currentColor" aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}
