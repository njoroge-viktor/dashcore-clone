"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowDown, FiCheckCircle, FiRefreshCw, FiSend, FiZap } from "react-icons/fi";
import { Button, cx } from "../ui";
import { AnimatedNumber, Field, emailOk, inputClass, useToast } from "../interactive";
import { db, uid } from "@/lib/db";
import seed from "@/lib/seed";

/* ---------------- AI chat demo ---------------- */
const replyDelay = () => 700 + Math.random() * 600;
type Msg = { id: string; me: boolean; text: string };
export function ChatDemo({ accent = "#06b6d4" }: { accent?: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ id: "w", me: false, text: "Hi! I'm the demo assistant. Ask me about pricing, integrations, security or languages." }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const suggestions = ["What does it cost?", "Do you integrate with Slack?", "Is my data secure?"];

  useEffect(() => {
    const el = endRef.current?.parentElement;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  const answer = (q: string) => {
    const lower = q.toLowerCase();
    const hit = seed.chatReplies.find((r) => r.match.some((m) => lower.includes(m)));
    return hit?.reply ?? "Good question! In the full product I'd look that up in your knowledge base. For this demo, try asking about pricing, integrations, security or languages.";
  };

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMsgs((m) => [...m, { id: uid("m"), me: true, text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { id: uid("m"), me: false, text: answer(q) }]);
      setTyping(false);
    }, replyDelay());
  };

  return (
    <div className="mx-auto flex h-[520px] max-w-2xl flex-col overflow-hidden rounded-3xl border border-line-strong bg-surface shadow-2xl">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ background: accent }}><FiZap /></span>
        <div className="flex-1">
          <p className="font-semibold">Corevia Assistant</p>
          <p className="text-xs text-emerald-500">● Online · replies instantly</p>
        </div>
        <button type="button" onClick={() => setMsgs((m) => m.slice(0, 1))} className="rounded-full p-2 text-muted hover:bg-fg/5 hover:text-fg" aria-label="Clear conversation"><FiRefreshCw /></button>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-5" aria-live="polite">
        {msgs.map((m) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={cx("max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed", m.me ? "ml-auto text-white" : "bg-fg/[0.06]")}
            style={m.me ? { background: accent } : undefined}>
            {m.text}
          </motion.div>
        ))}
        {typing && (
          <div className="flex w-16 gap-1 rounded-2xl bg-fg/[0.06] px-4 py-3">
            {[0, 1, 2].map((i) => <motion.span key={i} className="h-2 w-2 rounded-full bg-muted" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} />)}
          </div>
        )}
        <div ref={endRef} />
      </div>
      {msgs.length < 2 && (
        <div className="flex flex-wrap gap-2 px-5 pb-3">
          {suggestions.map((s) => (
            <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-line-strong px-3 py-1.5 text-xs hover:border-primary hover:text-primary">{s}</button>
          ))}
        </div>
      )}
      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-line p-4">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…" aria-label="Message" className={inputClass} />
        <Button type="submit" disabled={!input.trim() || typing} aria-label="Send" className="shrink-0 px-4"><FiSend /></Button>
      </form>
    </div>
  );
}

/* ---------------- Live ticker + swap ---------------- */
const assets = [
  { sym: "BTC", name: "Bitcoin", price: 68420 },
  { sym: "ETH", name: "Ethereum", price: 3540 },
  { sym: "SOL", name: "Solana", price: 172 },
  { sym: "USDC", name: "USD Coin", price: 1 },
];

function useLivePrices() {
  const [prices, setPrices] = useState(() => Object.fromEntries(assets.map((a) => [a.sym, a.price])) as Record<string, number>);
  const [change, setChange] = useState<Record<string, number>>({ BTC: 2.1, ETH: -0.8, SOL: 4.6, USDC: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      setPrices((p) => {
        const next = { ...p };
        const ch: Record<string, number> = {};
        assets.forEach((a) => {
          if (a.sym === "USDC") { ch[a.sym] = 0; return; }
          const delta = (Math.random() - 0.5) * 0.004;
          next[a.sym] = +(p[a.sym] * (1 + delta)).toFixed(2);
          ch[a.sym] = +(((next[a.sym] - a.price) / a.price) * 100).toFixed(2);
        });
        setChange(ch);
        return next;
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);
  return { prices, change };
}

export function CryptoTicker() {
  const { prices, change } = useLivePrices();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {assets.map((a) => (
        <div key={a.sym} className="rounded-2xl border border-line bg-card/60 p-5">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{a.sym}</span>
            <span className={cx("text-xs font-semibold", change[a.sym] >= 0 ? "text-emerald-500" : "text-rose-500")}>{change[a.sym] >= 0 ? "+" : ""}{change[a.sym]}%</span>
          </div>
          <p className="mt-1 text-xs text-muted">{a.name}</p>
          <p className="mt-3 text-2xl font-bold"><AnimatedNumber value={prices[a.sym]} prefix="$" decimals={2} /></p>
        </div>
      ))}
    </div>
  );
}

export function SwapWidget() {
  const { prices } = useLivePrices();
  const [from, setFrom] = useState("ETH");
  const [to, setTo] = useState("USDC");
  const [amount, setAmount] = useState("1.5");
  const toast = useToast();
  const value = parseFloat(amount) || 0;
  const out = from === to ? value : (value * prices[from]) / prices[to];
  const fee = out * 0.001;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value <= 0) return toast({ tone: "error", title: "Enter an amount greater than 0" });
        if (from === to) return toast({ tone: "error", title: "Pick two different assets" });
        toast({ tone: "success", title: "Swap simulated", desc: `${value} ${from} → ${(out - fee).toFixed(4)} ${to}` });
      }}
      className="mx-auto max-w-md rounded-3xl border border-line-strong bg-surface p-6 shadow-2xl"
    >
      <p className="mb-4 font-semibold">Instant swap</p>
      <label className="block rounded-2xl border border-line bg-bg/60 p-4">
        <span className="text-xs text-muted">You pay</span>
        <div className="mt-1 flex items-center gap-3">
          <input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))} aria-label="Amount to pay" className="w-full bg-transparent text-2xl font-bold outline-none" />
          <select value={from} onChange={(e) => setFrom(e.target.value)} aria-label="Pay with" className="rounded-full border border-line-strong bg-surface px-3 py-1.5 text-sm font-semibold">
            {assets.map((a) => <option key={a.sym}>{a.sym}</option>)}
          </select>
        </div>
      </label>
      <div className="relative z-10 -my-3 flex justify-center">
        <button type="button" onClick={() => { setFrom(to); setTo(from); }} aria-label="Swap direction" className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-surface hover:text-primary"><FiArrowDown /></button>
      </div>
      <div className="rounded-2xl border border-line bg-bg/60 p-4">
        <span className="text-xs text-muted">You receive</span>
        <div className="mt-1 flex items-center gap-3">
          <p className="w-full truncate text-2xl font-bold"><AnimatedNumber value={Math.max(0, out - fee)} decimals={4} /></p>
          <select value={to} onChange={(e) => setTo(e.target.value)} aria-label="Receive" className="rounded-full border border-line-strong bg-surface px-3 py-1.5 text-sm font-semibold">
            {assets.map((a) => <option key={a.sym}>{a.sym}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-4 space-y-1 text-xs text-muted">
        <p className="flex justify-between"><span>Rate</span><span>1 {from} ≈ {(prices[from] / prices[to]).toFixed(4)} {to}</span></p>
        <p className="flex justify-between"><span>Network fee (0.1%)</span><span>{fee.toFixed(4)} {to}</span></p>
      </div>
      <Button type="submit" className="mt-5 w-full" size="lg">Swap</Button>
    </form>
  );
}

/* ---------------- Send money (wallet) ---------------- */
export function SendMoney() {
  const contacts = ["Amara O.", "Lucas M.", "Priya N.", "Tomás R."];
  const [to, setTo] = useState(contacts[0]);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(24830);
  const [done, setDone] = useState<string | null>(null);
  const v = parseFloat(amount) || 0;
  const err = v > balance ? "Amount exceeds your balance" : "";
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-line-strong bg-surface p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <p className="font-semibold">Send money</p>
        <p className="text-sm text-muted">Balance <span className="font-semibold text-fg"><AnimatedNumber value={balance} prefix="$" decimals={2} /></span></p>
      </div>
      <div className="mt-5 flex gap-2" role="radiogroup" aria-label="Recipient">
        {contacts.map((c) => (
          <button key={c} type="button" role="radio" aria-checked={to === c} onClick={() => setTo(c)}
            className={cx("flex-1 rounded-2xl border p-2 text-center text-xs transition", to === c ? "border-primary bg-primary/10 text-primary" : "border-line hover:border-line-strong")}>
            <span className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-[11px] font-bold text-white">{c.split(" ").map((p) => p[0]).join("")}</span>
            {c}
          </button>
        ))}
      </div>
      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (v <= 0 || err) return;
          setBalance((b) => +(b - v).toFixed(2));
          setDone(`$${v.toFixed(2)} sent to ${to}`);
          setAmount("");
          setTimeout(() => setDone(null), 3000);
        }}
      >
        <Field label="Amount (USD)" htmlFor="send-amount" error={err}>
          <input id="send-amount" inputMode="decimal" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))} aria-invalid={!!err} className={inputClass} />
        </Field>
        <div className="mt-3 flex gap-2">{[25, 100, 500].map((q) => <button key={q} type="button" onClick={() => setAmount(String(q))} className="rounded-full border border-line-strong px-3 py-1 text-xs hover:border-primary">${q}</button>)}</div>
        <Button type="submit" disabled={v <= 0 || !!err} className="mt-5 w-full" size="lg">Send ${v ? v.toFixed(2) : "0.00"}</Button>
      </form>
      <AnimatePresence>
        {done && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-500">
            <FiCheckCircle /> {done}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Contact form (saves to contactMessages) ---------------- */
export function ContactForm({ source, withSubject = true, cta = "Send message" }: { source: string; withSubject?: boolean; cta?: string }) {
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const toast = useToast();

  const validate = () => {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 2) e.name = "Please enter your name.";
    if (!emailOk(f.email)) e.email = "Please enter a valid email address.";
    if (withSubject && f.subject.trim().length < 3) e.subject = "Please add a subject.";
    if (f.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  if (sent)
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <FiCheckCircle className="mx-auto h-10 w-10 text-emerald-500" />
        <p className="mt-3 text-lg font-semibold">Message sent!</p>
        <p className="mt-1 text-sm text-muted">Thanks {f.name.split(" ")[0]}, we&apos;ll reply to {f.email} within one business day.</p>
        <Button variant="secondary" className="mt-5" onClick={() => { setSent(false); setF({ name: "", email: "", subject: "", message: "" }); }}>Send another</Button>
      </div>
    );

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!validate()) return;
        setSending(true);
        setTimeout(() => {
          db.create("contactMessages", { id: uid("msg"), ...f, source, createdAt: new Date().toISOString() });
          setSending(false);
          setSent(true);
          toast({ tone: "success", title: "Message sent", desc: "We'll be in touch shortly." });
        }, 700);
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" htmlFor={`${source}-name`} required error={errors.name}>
          <input id={`${source}-name`} value={f.name} onChange={set("name")} placeholder="Enter your full name" aria-invalid={!!errors.name} className={inputClass} autoComplete="name" />
        </Field>
        <Field label="Your email" htmlFor={`${source}-email`} required error={errors.email}>
          <input id={`${source}-email`} type="email" value={f.email} onChange={set("email")} placeholder="you@company.com" aria-invalid={!!errors.email} className={inputClass} autoComplete="email" />
        </Field>
      </div>
      {withSubject && (
        <Field label="Subject" htmlFor={`${source}-subject`} required error={errors.subject}>
          <input id={`${source}-subject`} value={f.subject} onChange={set("subject")} placeholder="How can we help?" aria-invalid={!!errors.subject} className={inputClass} />
        </Field>
      )}
      <Field label="Message" htmlFor={`${source}-message`} required error={errors.message}>
        <textarea id={`${source}-message`} rows={5} value={f.message} onChange={set("message")} placeholder="Tell us about your project…" aria-invalid={!!errors.message} className={inputClass} />
      </Field>
      <Button type="submit" size="lg" disabled={sending} className="w-full sm:w-auto">{sending ? "Sending…" : cta}</Button>
    </form>
  );
}

/* ---------------- Email capture (subscribers / waitlist) ---------------- */
export function EmailCapture({ list = "subscribers", source, cta = "Subscribe", placeholder = "Enter your email" }: { list?: "subscribers" | "waitlist"; source: string; cta?: string; placeholder?: string }) {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);
  const toast = useToast();
  const count = useMemo(() => (ok ? db.list(list).length : 0), [ok, list]);
  if (ok)
    return (
      <p className="flex items-center justify-center gap-2 rounded-full bg-emerald-500/10 px-5 py-3 text-sm font-medium text-emerald-500" role="status">
        <FiCheckCircle /> You&apos;re on the list{list === "waitlist" && count ? ` — #${count + 128} in line` : ""}!
      </p>
    );
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!emailOk(email)) return setErr("Please enter a valid email address.");
        if (db.list(list).some((r) => r.email.toLowerCase() === email.toLowerCase())) {
          setErr("");
          setOk(true);
          return toast({ tone: "info", title: "You're already signed up" });
        }
        db.create(list, { id: uid("s"), email: email.trim(), source, createdAt: new Date().toISOString() });
        setErr("");
        setOk(true);
        toast({ tone: "success", title: list === "waitlist" ? "Added to the waitlist" : "Subscribed!", desc: email });
      }}
      className="w-full"
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={placeholder} aria-label="Email address" aria-invalid={!!err} className={cx(inputClass, "rounded-full")} />
        <Button type="submit" className="shrink-0">{cta}</Button>
      </div>
      {err && <p className="mt-2 text-left text-xs text-rose-500" role="alert">{err}</p>}
    </form>
  );
}
