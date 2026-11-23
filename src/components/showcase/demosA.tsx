"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import * as Fi from "react-icons/fi";
import { SiFigma, SiGithub, SiNotion, SiStripe, SiVercel, SiShopify, SiZapier, SiNetlify, SiLinear, SiSupabase } from "react-icons/si";
import { FaSlack } from "react-icons/fa6";
import { Avatar, Badge, Button, Card, IconBubble, Stars, cx } from "../ui";
import { AnimatedNumber, CountUp, inputClass, useCopy, useToast } from "../interactive";
import { Demo } from "./ShowcaseShell";
import seed from "@/lib/seed";

/* ================= Typography ================= */
export function TypographyDemo() {
  return (
    <>
      <Demo title="Typography">
        <div className="grid gap-10 lg:grid-cols-[180px_1fr_1fr]">
          <div>
            <p className="text-7xl font-light">Aa</p>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-muted">Typeface</p>
            <ul className="mt-2 space-y-1 border-l-2 border-primary pl-3 text-sm"><li className="font-bold">Geist — Bold</li><li className="font-semibold">Geist — Semibold</li><li className="font-medium">Geist — Medium</li><li className="font-mono">Geist Mono</li></ul>
          </div>
          <div className="space-y-3">
            <p className="text-5xl font-bold tracking-tight">Heading 1</p>
            <p className="text-4xl font-bold tracking-tight">Heading 2</p>
            <p className="text-3xl font-semibold">Heading 3</p>
            <p className="text-2xl font-semibold">Heading 4</p>
            <p className="text-xl font-semibold">Heading 5</p>
          </div>
          <div className="space-y-4">
            <p className="text-lg font-semibold">Lead — A clear, confident introduction to the section.</p>
            <p className="leading-relaxed text-muted">Body — Good typography is invisible. It guides the eye, sets the rhythm and lets content speak. Line length, leading and contrast do most of the work.</p>
            <p className="text-sm text-muted">Small — Supporting copy, captions and helper text.</p>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Eyebrow label</p>
          </div>
        </div>
      </Demo>
      <Demo title="Text styles">
        <div className="space-y-6">
          <p className="bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-4xl font-bold text-transparent">Gradient headline text</p>
          <blockquote className="border-l-4 border-primary pl-5 text-xl italic text-fg/85">“Design is not just what it looks like and feels like. Design is how it works.”</blockquote>
          <p>Inline <code className="rounded bg-fg/10 px-1.5 py-0.5 font-mono text-sm text-primary">code</code>, <a href="#" className="text-primary underline underline-offset-4">links</a>, <strong>strong</strong>, <em>emphasis</em>, <mark className="rounded bg-amber-300/40 px-1 text-fg">highlight</mark> and <kbd className="rounded border border-line-strong px-1.5 text-xs">⌘K</kbd>.</p>
          <ul className="list-disc space-y-1 pl-5 text-muted"><li>Unordered list item</li><li>Another item with more words</li></ul>
        </div>
      </Demo>
    </>
  );
}

/* ================= Buttons ================= */
export function ButtonsDemo() {
  const [loading, setLoading] = useState(false);
  const [seg, setSeg] = useState("Week");
  const [likes, setLikes] = useState(128);
  const [liked, setLiked] = useState(false);
  const toast = useToast();
  return (
    <>
      <Demo title="Buttons">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-muted">Button size</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button size="sm" variant="secondary">Small</Button><Button variant="secondary">Medium</Button><Button size="lg" variant="secondary">Large</Button>
            </div>
          </div>
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-muted">Button label style</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Button</Button>
              <Button><Fi.FiPlus /> Create</Button>
              <Button>Download <Fi.FiDownload /></Button>
              <Button aria-label="Settings" className="h-10 w-10 p-0"><Fi.FiSettings /></Button>
            </div>
          </div>
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-muted">Variants</p>
            <div className="flex flex-wrap gap-3"><Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="white">White</Button><Button disabled>Disabled</Button></div>
          </div>
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-muted">States</p>
            <div className="flex flex-wrap gap-3">
              <Button disabled={loading} onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); toast({ tone: "success", title: "Saved!" }); }, 1500); }}>
                {loading ? <><Fi.FiLoader className="animate-spin" /> Saving…</> : "Click to save"}
              </Button>
              <Button variant="secondary" aria-pressed={liked} onClick={() => { setLiked(!liked); setLikes((n) => n + (liked ? -1 : 1)); }}>
                <Fi.FiHeart className={cx(liked && "fill-rose-500 text-rose-500")} /> {likes}
              </Button>
            </div>
          </div>
        </div>
      </Demo>
      <Demo title="Segmented control">
        <div className="inline-flex rounded-full border border-line bg-surface/60 p-1" role="radiogroup" aria-label="Range">
          {["Day", "Week", "Month", "Year"].map((s) => (
            <button key={s} type="button" role="radio" aria-checked={seg === s} onClick={() => setSeg(s)} className={cx("relative rounded-full px-4 py-1.5 text-sm font-semibold", seg === s ? "text-white" : "text-fg/70")}>
              {seg === s && <motion.span layoutId="seg" className="absolute inset-0 rounded-full bg-primary" />}<span className="relative">{s}</span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">Selected: {seg}</p>
      </Demo>
    </>
  );
}

/* ================= Design tokens ================= */
const palette = [
  ["primary-50", "#f0f9ff"], ["primary-100", "#e0f2fe"], ["primary-200", "#bae6fd"], ["primary-300", "#7dd3fc"], ["primary-400", "#38bdf8"],
  ["primary-500", "#0ea5e9"], ["primary-600", "#0284c7"], ["primary-700", "#0369a1"], ["primary-800", "#075985"], ["primary-900", "#0c4a6e"],
];
export function TokensDemo() {
  const copy = useCopy();
  return (
    <>
      <Demo title="Color palette" note="Click a swatch to copy its hex value.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {palette.map(([n, h]) => (
            <button key={n} type="button" onClick={() => copy(h, `${n} copied`)} className="overflow-hidden rounded-2xl border border-line text-left transition hover:-translate-y-1">
              <span className="block h-16" style={{ background: h }} /><span className="block p-2 text-xs"><b>{n}</b><br /><span className="font-mono text-muted">{h}</span></span>
            </button>
          ))}
        </div>
      </Demo>
      <Demo title="Gradient Utilities">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[["Vibrant Hero", "from-sky-500 to-sky-300"], ["Trust Hero", "from-sky-400 to-blue-600"], ["Minimal Hero", "from-slate-600 to-slate-900"], ["Sunny Hero", "from-amber-300 to-orange-500"]].map(([n, g]) => (
            <button key={n} type="button" onClick={() => copy(`bg-gradient-to-br ${g}`, "Class copied")} className="overflow-hidden rounded-2xl border border-line text-left">
              <span className={`block h-24 bg-gradient-to-br ${g}`} /><span className="block p-3 text-sm font-semibold">{n}<code className="mt-1 block truncate font-mono text-[10px] font-normal text-muted">{g}</code></span>
            </button>
          ))}
        </div>
      </Demo>
      <Demo title="Radius, shadow & spacing">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">{["rounded-lg", "rounded-2xl", "rounded-3xl", "rounded-full"].map((r) => <div key={r} className={`flex h-12 items-center justify-center border border-primary/40 bg-primary/10 font-mono text-xs ${r}`}>{r}</div>)}</div>
          <div className="space-y-4">{["shadow-sm", "shadow-lg", "shadow-2xl"].map((s) => <div key={s} className={`flex h-14 items-center justify-center rounded-2xl bg-surface font-mono text-xs ${s}`}>{s}</div>)}</div>
          <div className="space-y-2">{[1, 2, 4, 6, 8, 12].map((n) => <div key={n} className="flex items-center gap-3 font-mono text-xs"><span className="w-8 text-muted">{n * 4}px</span><span className="h-3 rounded bg-primary" style={{ width: n * 12 }} /></div>)}</div>
        </div>
      </Demo>
    </>
  );
}

/* ================= Icons ================= */
const iconNames = ["FiZap", "FiActivity", "FiDownload", "FiUpload", "FiShare2", "FiRefreshCw", "FiCopy", "FiEdit", "FiHome", "FiSearch", "FiArrowRight", "FiChevronDown", "FiPlus", "FiMinus", "FiSettings", "FiGlobe", "FiUser", "FiUsers", "FiLock", "FiShield", "FiMail", "FiBell", "FiHeart", "FiStar", "FiCamera", "FiCloud", "FiCode", "FiDatabase", "FiServer", "FiCpu", "FiTrash2", "FiCalendar"] as const;
export function IconsDemo() {
  const copy = useCopy();
  const [q, setQ] = useState("");
  const shown = iconNames.filter((n) => n.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <Demo title="Icon Grid" note="Feather icons via react-icons. Click to copy the import name.">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter icons…" aria-label="Filter icons" className={cx(inputClass, "mb-6 max-w-xs")} />
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
          {shown.map((n) => {
            const I = Fi[n];
            return (
              <button key={n} type="button" onClick={() => copy(n, `${n} copied`)} className="flex flex-col items-center gap-2 rounded-2xl border border-line p-3 text-xs text-muted transition hover:border-primary hover:text-primary">
                <I className="h-5 w-5" /><span className="truncate">{n.slice(2)}</span>
              </button>
            );
          })}
          {!shown.length && <p className="col-span-full text-sm text-muted">No icons match.</p>}
        </div>
      </Demo>
      <Demo title="Badge Variants">
        <div className="flex flex-wrap gap-3">
          <Badge>Primary</Badge><Badge tone="success">Success</Badge><Badge tone="warning">Warning</Badge><Badge tone="danger">Danger</Badge><Badge tone="neutral">Neutral</Badge>
          <Badge><Fi.FiStar /> Featured</Badge><Badge tone="success"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online</Badge>
          <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-[11px] font-semibold">Outline</span>
        </div>
      </Demo>
      <Demo title="Icon bubbles & brand logos">
        <div className="flex flex-wrap gap-3">{[Fi.FiZap, Fi.FiShield, Fi.FiGlobe, Fi.FiLayers].map((I, i) => <IconBubble key={i}><I /></IconBubble>)}</div>
        <div className="mt-6 flex flex-wrap gap-6 text-3xl text-fg/70">{[SiGithub, FaSlack, SiStripe, SiNotion, SiFigma, SiVercel, SiNetlify, SiLinear, SiSupabase].map((I, i) => <I key={i} className="transition hover:text-primary" />)}</div>
      </Demo>
    </>
  );
}

/* ================= Cards ================= */
function GlowCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <div ref={ref} onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}
      className="group relative overflow-hidden rounded-3xl border border-line bg-card/60 p-8"
      style={{ background: `radial-gradient(300px circle at ${pos.x}% ${pos.y}%, rgba(14,165,233,.18), transparent 60%)` }}>
      <span className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition group-hover:opacity-100" style={{ boxShadow: "inset 0 0 0 1px rgba(56,189,248,.6)" }} />
      <IconBubble><Fi.FiMousePointer /></IconBubble>
      <h3 className="mt-5 text-lg font-semibold">Spotlight Tracking</h3>
      <p className="mt-2 text-sm text-muted">Move your cursor — the glow follows it and the border lights up on hover.</p>
    </div>
  );
}
export function CardsDemo() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const total = Object.values(cart).reduce((a, b) => a + b, 0);
  const products = [["Pro Analytics Dashboard", 79], ["Enterprise Starter Kit", 149], ["Design System License", 49]] as const;
  return (
    <>
      <Demo title="Feature Cards">
        <div className="grid gap-5 md:grid-cols-3">
          {[[Fi.FiZap, "Lightning Fast", "Optimized for speed with edge rendering."], [Fi.FiShield, "Enterprise Security", "SSO, audit logs and encryption."], [Fi.FiGlobe, "Global Scale", "Deploy to 35 regions in one click."]].map(([I, t, d]) => {
            const Icon = I as typeof Fi.FiZap;
            return <Card key={t as string} className="transition hover:-translate-y-1 hover:border-primary/40"><IconBubble><Icon /></IconBubble><h3 className="mt-5 font-semibold">{t as string}</h3><p className="mt-2 text-sm text-muted">{d as string}</p></Card>;
          })}
        </div>
      </Demo>
      <Demo title="Glass Cards" className="bg-gradient-to-br from-indigo-600/40 via-sky-500/30 to-fuchsia-500/30">
        <div className="grid gap-5 md:grid-cols-3">
          {["Performance", "Security", "Scalability"].map((t, i) => (
            <div key={t} className="rounded-3xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-xl">
              <p className="text-3xl font-bold">{["99.9", "256", "10x"][i]}<span className="text-base">{["%", "-bit", ""][i]}</span></p><p className="mt-1 font-semibold">{t}</p><p className="mt-2 text-sm text-white/75">Frosted glass panel with backdrop blur.</p>
            </div>
          ))}
        </div>
      </Demo>
      <Demo title="Product Cards" note={`Cart: ${total} item${total === 1 ? "" : "s"}`}>
        <div className="grid gap-5 md:grid-cols-3">
          {products.map(([n, p]) => (
            <Card key={n} className="flex flex-col p-0 sm:p-0">
              <div className="aspect-[4/3] rounded-t-3xl bg-gradient-to-br from-primary/30 to-indigo-500/20" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-semibold">{n}</h3><Stars n={5} /><p className="mt-2 text-2xl font-bold">${p}</p>
                <div className="mt-4 flex items-center gap-2">
                  {cart[n] ? (
                    <>
                      <Button size="sm" variant="secondary" aria-label="Remove one" onClick={() => setCart({ ...cart, [n]: cart[n] - 1 })}><Fi.FiMinus /></Button>
                      <span className="w-6 text-center font-semibold">{cart[n]}</span>
                      <Button size="sm" variant="secondary" aria-label="Add one" onClick={() => setCart({ ...cart, [n]: cart[n] + 1 })}><Fi.FiPlus /></Button>
                    </>
                  ) : <Button size="sm" onClick={() => setCart({ ...cart, [n]: 1 })}><Fi.FiShoppingCart /> Add to cart</Button>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Demo>
      <Demo title="Article Cards">
        <div className="grid gap-5 md:grid-cols-3">
          {["Building Scalable Design Systems", "The Future of Web Performance", "From Startup to Scale"].map((t, i) => (
            <article key={t} className="group overflow-hidden rounded-3xl border border-line bg-card/50">
              <div className={cx("aspect-video bg-gradient-to-br transition duration-500 group-hover:scale-105", ["from-sky-500/40 to-indigo-500/30", "from-emerald-500/40 to-teal-500/30", "from-amber-500/40 to-rose-500/30"][i])} />
              <div className="p-6"><Badge tone="neutral">{["Design", "Engineering", "Growth"][i]}</Badge><h3 className="mt-3 font-semibold group-hover:text-primary">{t}</h3><p className="mt-2 text-xs text-muted">{5 + i} min read · Nov {10 + i}, 2026</p></div>
            </article>
          ))}
        </div>
      </Demo>
      <Demo title="Border Glow & Spotlight Card"><div className="grid gap-5 md:grid-cols-2"><GlowCard /><GlowCard /></div></Demo>
    </>
  );
}

/* ================= Charts ================= */
const series = {
  Revenue: [12, 18, 15, 24, 22, 30, 28, 36, 34, 42, 40, 48],
  Users: [30, 32, 35, 33, 40, 44, 46, 50, 55, 53, 60, 66],
  Churn: [8, 7, 7.5, 6.8, 6.2, 6, 5.5, 5.8, 5.1, 4.9, 4.6, 4.2],
};
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function LineChart() {
  const [key, setKey] = useState<keyof typeof series>("Revenue");
  const [hover, setHover] = useState<number | null>(null);
  const data = series[key];
  const max = Math.max(...data) * 1.15;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * 100, 100 - (v / max) * 100]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
  return (
    <div>
      <div className="mb-4 flex gap-2">{(Object.keys(series) as (keyof typeof series)[]).map((k) => <button key={k} type="button" aria-pressed={key === k} onClick={() => setKey(k)} className={cx("rounded-full px-3 py-1 text-xs font-semibold", key === k ? "bg-primary text-white" : "bg-fg/5")}>{k}</button>)}</div>
      <div className="relative h-56" onMouseLeave={() => setHover(null)}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          {[0, 25, 50, 75, 100].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="var(--line)" vectorEffect="non-scaling-stroke" />)}
          <path d={`${d} L100,100 L0,100 Z`} fill="rgba(14,165,233,.15)" />
          <motion.path key={key} d={d} fill="none" stroke="#0ea5e9" strokeWidth="2.5" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
        </svg>
        <div className="absolute inset-0 flex">{data.map((_, i) => <div key={i} className="flex-1" onMouseEnter={() => setHover(i)} />)}</div>
        {hover !== null && (
          <div className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg border border-line-strong bg-surface px-3 py-1.5 text-xs shadow-xl" style={{ left: `${pts[hover][0]}%`, top: `${pts[hover][1]}%` }}>
            <b>{months[hover]}</b>: {data[hover]}{key === "Churn" ? "%" : "k"}
          </div>
        )}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-muted">{months.map((m) => <span key={m}>{m}</span>)}</div>
    </div>
  );
}
function Gauge() {
  const [v, setV] = useState(68);
  const angle = -120 + (v / 100) * 240;
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 130" className="w-64">
        <path d="M 30 110 A 80 80 0 1 1 170 110" fill="none" stroke="var(--line-strong)" strokeWidth="14" strokeLinecap="round" />
        <motion.path d="M 30 110 A 80 80 0 1 1 170 110" fill="none" stroke="#0ea5e9" strokeWidth="14" strokeLinecap="round" pathLength={1} animate={{ pathLength: v / 100 }} transition={{ type: "spring", stiffness: 60 }} />
        <motion.line x1="100" y1="100" x2="100" y2="40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={{ originX: "100px", originY: "100px" }} animate={{ rotate: angle }} transition={{ type: "spring", stiffness: 60 }} />
        <circle cx="100" cy="100" r="6" fill="currentColor" />
      </svg>
      <p className="-mt-2 text-3xl font-bold"><AnimatedNumber value={v} suffix="%" /></p>
      <input type="range" min={0} max={100} value={v} onChange={(e) => setV(+e.target.value)} aria-label="Gauge value" className="mt-4 w-64 accent-sky-500" />
    </div>
  );
}
export function ChartsDemo() {
  const [bars, setBars] = useState([40, 65, 50, 80, 72, 90]);
  const [k, setK] = useState(0);
  return (
    <>
      <Demo title="Line Chart" note="Switch series and hover for values."><LineChart /></Demo>
      <Demo title="Bar Chart">
        <div className="flex h-48 items-end gap-3">
          {bars.map((b, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <motion.div className="w-full rounded-t-xl bg-gradient-to-t from-primary-600 to-primary-400" animate={{ height: `${b * 1.6}px` }} transition={{ type: "spring", stiffness: 80 }} />
              <span className="text-[10px] text-muted">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}</span>
            </div>
          ))}
        </div>
        <Button size="sm" variant="secondary" className="mt-4" onClick={() => setBars(bars.map(() => 20 + Math.round(Math.random() * 80)))}><Fi.FiRefreshCw /> Randomize</Button>
      </Demo>
      <Demo title="Progress Bars">
        <div className="space-y-5">
          {[["Design", 92, "bg-sky-500"], ["Development", 78, "bg-indigo-500"], ["Marketing", 54, "bg-emerald-500"], ["Support", 36, "bg-amber-500"]].map(([l, v, c]) => (
            <div key={l as string}><div className="mb-1 flex justify-between text-sm"><span>{l}</span><span className="text-muted">{v}%</span></div>
              <div className="h-2.5 overflow-hidden rounded-full bg-fg/10"><motion.div className={cx("h-full rounded-full", c as string)} initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1 }} /></div></div>
          ))}
        </div>
      </Demo>
      <Demo title="Animated Counter">
        <div key={k} className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[[12500, "+", "Customers"], [98, "%", "Satisfaction"], [240, "M", "Requests/day"], [35, "", "Regions"]].map(([v, s, l]) => (
            <Card key={l as string} className="text-center"><p className="text-3xl font-bold text-primary"><CountUp to={v as number} suffix={s as string} /></p><p className="mt-1 text-sm text-muted">{l}</p></Card>
          ))}
        </div>
        <Button size="sm" variant="secondary" className="mt-4" onClick={() => setK(k + 1)}><Fi.FiRotateCcw /> Replay</Button>
      </Demo>
      <Demo title="Speedometer"><Gauge /></Demo>
    </>
  );
}

/* ================= Testimonials ================= */
export function TestimonialsDemo() {
  const t = seed.testimonials;
  return (
    <>
      <Demo title="Testimonial Cards Grid">
        <div className="grid gap-5 md:grid-cols-3">
          {t.slice(0, 3).map((x, i) => (
            <div key={x.id} className={cx("rounded-3xl border p-6", i === 1 ? "border-primary bg-gradient-to-b from-primary to-primary-600 text-white" : "border-line bg-card/50")}>
              <Stars n={x.rating} /><p className="mt-4 text-sm italic leading-relaxed">“{x.quote}”</p><p className="mt-5 text-sm font-semibold">{x.name}</p><p className={cx("text-xs", i === 1 ? "text-white/75" : "text-muted")}>{x.role}</p>
            </div>
          ))}
        </div>
      </Demo>
      <Demo title="Testimonials Marquee" className="px-0 sm:px-0">
        <div className="pause-on-hover fade-x overflow-hidden">
          <div className="marquee gap-5" style={{ ["--duration" as string]: "45s" }}>
            {[...t, ...t].map((x, i) => (
              <div key={i} className="w-80 shrink-0 rounded-3xl border border-line bg-card/50 p-6">
                <p className="text-sm leading-relaxed">“{x.quote}”</p>
                <div className="mt-4 flex items-center gap-3"><Avatar name={x.name} size={36} /><div><p className="text-sm font-semibold">{x.name}</p><p className="text-xs text-muted">{x.role}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </Demo>
      <Demo title="Card Pattern Variants">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-line p-8"><Fi.FiMessageSquare className="absolute -right-4 -top-4 h-32 w-32 text-primary/10" /><p className="relative text-xl font-semibold leading-relaxed">“{t[3].quote}”</p><p className="relative mt-4 text-sm text-muted">— {t[3].name}, {t[3].role}</p></div>
          <div className="bg-grid rounded-3xl border border-line p-8"><Avatar name={t[4].name} size={56} /><p className="mt-4 leading-relaxed">“{t[4].quote}”</p><p className="mt-4 text-sm font-semibold">{t[4].name}</p></div>
        </div>
      </Demo>
    </>
  );
}

/* ================= Logos ================= */
const brands = [[SiGithub, "GitHub"], [FaSlack, "Slack"], [SiStripe, "Stripe"], [SiNotion, "Notion"], [SiFigma, "Figma"], [SiVercel, "Vercel"], [SiShopify, "Shopify"], [SiZapier, "Zapier"], [SiNetlify, "Netlify"], [SiLinear, "Linear"]] as const;
const brandRow = [...brands, ...brands];
function Row({ reverse = false, speed = 30 }: { reverse?: boolean; speed?: number }) {
  return (
    <div className="pause-on-hover fade-x overflow-hidden">
      <div className={cx("marquee gap-12", reverse && "marquee-reverse")} style={{ ["--duration" as string]: `${speed}s` }}>
        {brandRow.map(([I, n], i) => <span key={i} className="flex shrink-0 items-center gap-2 text-xl font-semibold text-fg/50 transition hover:text-fg"><I className="h-7 w-7" />{n}</span>)}
      </div>
    </div>
  );
}
export function LogosDemo() {
  const [speed, setSpeed] = useState(30);
  return (
    <>
      <Demo title="Logos Marquee — Single Row" note="Hover to pause.">
        <Row speed={speed} />
        <label className="mt-6 flex items-center gap-3 text-sm text-muted">Speed <input type="range" min={10} max={60} value={70 - speed} onChange={(e) => setSpeed(70 - +e.target.value)} className="accent-sky-500" /></label>
      </Demo>
      <Demo title="Logos Marquee — 2 Rows"><div className="space-y-6"><Row speed={speed} /><Row reverse speed={speed} /></div></Demo>
      <Demo title="Logo Grid">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-5">
          {brands.map(([I, n]) => <div key={n} className="flex h-24 items-center justify-center gap-2 bg-bg text-fg/50 transition hover:text-fg"><I className="h-6 w-6" /><span className="text-sm font-semibold">{n}</span></div>)}
        </div>
      </Demo>
    </>
  );
}
