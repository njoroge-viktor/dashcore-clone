"use client";

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiCheckCircle, FiChevronDown, FiEye, FiEyeOff, FiInfo, FiX } from "react-icons/fi";
import { cx } from "./ui";

/* ================= Toasts ================= */
type Toast = { id: number; tone: "success" | "error" | "info"; title: string; desc?: string };
const ToastCtx = createContext<(t: Omit<Toast, "id">) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((ts) => [...ts, { ...t, id }]);
    setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 4200);
  }, []);
  const Icon = { success: FiCheckCircle, error: FiAlertCircle, info: FiInfo };
  const color = { success: "text-emerald-500", error: "text-rose-500", info: "text-primary" };
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => {
            const I = Icon[t.tone];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40 }}
                className="pointer-events-auto flex gap-3 rounded-2xl border border-line-strong bg-surface p-4 shadow-2xl"
                role="status"
              >
                <I className={cx("mt-0.5 h-5 w-5 shrink-0", color[t.tone])} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{t.title}</p>
                  {t.desc && <p className="mt-0.5 text-sm text-muted">{t.desc}</p>}
                </div>
                <button type="button" aria-label="Dismiss" onClick={() => setToasts((ts) => ts.filter((x) => x.id !== t.id))} className="text-muted hover:text-fg">
                  <FiX />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}

/* ================= Accordion ================= */
export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  className = "",
}: {
  items: { q: ReactNode; a: ReactNode; id?: string }[];
  multiple?: boolean;
  defaultOpen?: number[];
  className?: string;
}) {
  const [open, setOpen] = useState<number[]>(defaultOpen);
  const baseId = useId();
  const toggle = (i: number) =>
    setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : multiple ? [...o, i] : [i]));
  return (
    <div className={cx("divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card/40", className)}>
      {items.map((it, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={it.id ?? i}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-${i}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold transition hover:text-primary sm:px-6"
              >
                {it.q}
                <FiChevronDown className={cx("shrink-0 transition-transform duration-300", isOpen && "rotate-180 text-primary")} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${baseId}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-muted sm:px-6">{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ================= Tabs ================= */
export function Tabs({
  tabs,
  className = "",
  pill = true,
}: {
  tabs: { label: string; content: ReactNode }[];
  className?: string;
  pill?: boolean;
}) {
  const [active, setActive] = useState(0);
  const id = useId();
  return (
    <div className={className}>
      <div role="tablist" className={cx("flex flex-wrap gap-1", pill ? "inline-flex rounded-full border border-line bg-surface/60 p-1" : "border-b border-line")}>
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            type="button"
            id={`${id}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            onClick={() => setActive(i)}
            className={cx(
              "relative px-4 py-2 text-sm font-semibold transition",
              pill ? "rounded-full" : "-mb-px border-b-2",
              pill && active === i && "text-white",
              pill && active !== i && "text-fg/70 hover:text-fg",
              !pill && (active === i ? "border-primary text-primary" : "border-transparent text-muted hover:text-fg"),
            )}
          >
            {pill && active === i && <motion.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-full bg-primary" />}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          role="tabpanel"
          id={`${id}-panel-${active}`}
          aria-labelledby={`${id}-tab-${active}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-6"
        >
          {tabs[active].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ================= Modal ================= */
export function Modal({ open, onClose, title, children, wide = false }: { open: boolean; onClose: () => void; title?: string; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            ref={ref}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cx("relative max-h-[90vh] w-full overflow-y-auto rounded-3xl border border-line-strong bg-surface p-6 shadow-2xl outline-none sm:p-8", wide ? "max-w-3xl" : "max-w-md")}
          >
            <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-1.5 text-muted hover:bg-fg/5 hover:text-fg">
              <FiX className="h-5 w-5" />
            </button>
            {title && <h2 className="mb-4 pr-8 text-xl font-bold">{title}</h2>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================= Form fields ================= */
export const inputClass =
  "w-full rounded-xl border border-line-strong bg-bg/60 px-4 py-3 text-sm text-fg placeholder:text-muted/70 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-rose-500";

export function Field({
  label,
  error,
  hint,
  required,
  children,
  htmlFor,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
      {error ? <p className="text-xs text-rose-500" role="alert">{error}</p> : hint ? <p className="text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

export function PasswordInput(props: React.ComponentProps<"input">) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input {...props} type={show ? "text" : "password"} className={cx(inputClass, "pr-11")} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-fg"
      >
        {show ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cx("relative h-6 w-11 shrink-0 rounded-full transition", checked ? "bg-primary" : "bg-fg/20")}
    >
      <span className={cx("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", checked ? "left-[22px]" : "left-0.5")} />
    </button>
  );
}

export const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/* ================= Animated number ================= */
export function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 600);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(a + (value - a) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <span className="tabular-nums">
      {prefix}
      {shown.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

/** Counts up from 0 the first time it scrolls into view. */
export function CountUp({ to, prefix = "", suffix = "", decimals = 0 }: { to: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setV(to);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      <AnimatedNumber value={v} prefix={prefix} suffix={suffix} decimals={decimals} />
    </span>
  );
}

/* ================= Copy button ================= */
export function useCopy() {
  const toast = useToast();
  return useCallback(
    async (text: string, what = "Copied to clipboard") => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      toast({ tone: "success", title: what, desc: text.length > 48 ? undefined : text });
    },
    [toast],
  );
}
