"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as Fi from "react-icons/fi";
import { Button, Card, IconBubble, cx } from "../ui";
import { Demo } from "./ShowcaseShell";
import Visual from "../landing/Visual";
import { BRAND } from "@/lib/data";

/* ================= Animations ================= */
const presets = {
  "Fade Up": { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
  "Fade Down": { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 } },
  "Slide Left": { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  "Zoom In": { initial: { opacity: 0, scale: 0.7 }, animate: { opacity: 1, scale: 1 } },
  "Blur In": { initial: { opacity: 0, filter: "blur(12px)" }, animate: { opacity: 1, filter: "blur(0px)" } },
  "Flip": { initial: { opacity: 0, rotateX: 90 }, animate: { opacity: 1, rotateX: 0 } },
};
function Tilt({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]));
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]));
  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}
export function AnimationsDemo() {
  const [run, setRun] = useState(0);
  const [stagger, setStagger] = useState(0.1);
  const words = "Motion that feels natural and never gets in the way.".split(" ");
  return (
    <>
      <Demo title="Reveal Presets" note="Click Replay to run them again.">
        <div key={run} className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {Object.entries(presets).map(([n, p], i) => (
            <motion.div key={n} initial={p.initial} animate={p.animate} transition={{ duration: 0.7, delay: i * 0.1 }} className="rounded-2xl border border-line bg-card/60 p-6 text-center font-semibold">{n}</motion.div>
          ))}
        </div>
        <Button size="sm" variant="secondary" className="mt-5" onClick={() => setRun(run + 1)}><Fi.FiRotateCcw /> Replay</Button>
      </Demo>
      <Demo title="Stagger Container">
        <label className="mb-4 flex items-center gap-3 text-sm text-muted">Stagger {stagger.toFixed(2)}s <input type="range" min={0.02} max={0.3} step={0.02} value={stagger} onChange={(e) => setStagger(+e.target.value)} className="accent-sky-500" /></label>
        <motion.div key={`${run}-${stagger}`} className="grid grid-cols-4 gap-3 sm:grid-cols-8" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: stagger } } }}>
          {Array.from({ length: 16 }).map((_, i) => <motion.span key={i} variants={{ hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1 } }} className="aspect-square rounded-xl bg-gradient-to-br from-primary to-indigo-500" />)}
        </motion.div>
      </Demo>
      <Demo title="Interactive Tilt">
        <div className="grid gap-6 md:grid-cols-2">
          {["Move your cursor", "Over these cards"].map((t) => (
            <Tilt key={t}><Card className="h-48 bg-gradient-to-br from-primary/20 to-indigo-500/10"><IconBubble><Fi.FiMove /></IconBubble><p className="mt-4 text-xl font-semibold">{t}</p><p className="text-sm text-muted">3D tilt with spring physics.</p></Card></Tilt>
          ))}
        </div>
      </Demo>
      <Demo title="Text Reveal">
        <p key={run} className="text-3xl font-bold leading-snug sm:text-4xl">
          {words.map((w, i) => <motion.span key={i} className="mr-[0.25em] inline-block" initial={{ opacity: 0, y: 20, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: i * 0.08 }}>{w}</motion.span>)}
        </p>
      </Demo>
      <Demo title="Continuous Effect Presets">
        <div className="flex flex-wrap items-center justify-around gap-8">
          <motion.span animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 2.4 }} className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl text-white">Float</motion.span>
          <motion.span animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 1.6 }} className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 text-white"><Fi.FiHeart /></motion.span>
          <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }} className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-primary text-primary"><Fi.FiSun /></motion.span>
          <span className="relative flex h-4 w-4"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500" /></span>
        </div>
      </Demo>
    </>
  );
}

/* ================= Effects ================= */
function Mesh() {
  const [p, setP] = useState({ x: 50, y: 50 });
  return (
    <div onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setP({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}
      className="flex h-72 items-center justify-center rounded-2xl transition-[background] duration-300"
      style={{ background: `radial-gradient(circle at ${p.x}% ${p.y}%, rgba(14,165,233,.55), transparent 40%), radial-gradient(circle at ${100 - p.x}% ${100 - p.y}%, rgba(168,85,247,.45), transparent 45%), #0b1120` }}>
      <p className="font-semibold text-white">Interactive Mesh Background</p>
    </div>
  );
}
function Sparkles() {
  const [dots, setDots] = useState<{ id: number; x: number; y: number; s: number; d: number }[]>([]);
  useEffect(() => setDots(Array.from({ length: 40 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, s: 2 + Math.random() * 3, d: Math.random() * 3 }))), []);
  return (
    <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#0b1120]">
      {dots.map((d) => <motion.span key={d.id} className="absolute rounded-full bg-white" style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }} transition={{ repeat: Infinity, duration: 2.5, delay: d.d }} />)}
      <p className="relative bg-gradient-to-r from-sky-300 via-fuchsia-300 to-amber-200 bg-clip-text text-6xl font-black tracking-tight text-transparent">MAGICAL</p>
    </div>
  );
}
function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState({ x: 50, y: 50 });
  return (
    <div ref={ref} onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); setP({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
      className="bg-grid relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-[#0b1120]">
      <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(220px circle at ${p.x}px ${p.y}px, transparent, rgba(2,6,23,.92) 70%)` }} />
      <p className="relative text-lg font-semibold text-white">Vignette Spotlight — move your cursor</p>
    </div>
  );
}
export function EffectsDemo() {
  return (
    <>
      <Demo title="Hero Mesh Background"><Mesh /></Demo>
      <Demo title="Dot Text Effect">
        <div className="flex h-48 items-center justify-center rounded-2xl" style={{ backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)", backgroundSize: "10px 10px" }}>
          <p className="text-6xl font-black tracking-tight text-transparent sm:text-8xl" style={{ backgroundImage: "radial-gradient(#38bdf8 1.6px, transparent 1.6px)", backgroundSize: "6px 6px", WebkitBackgroundClip: "text", backgroundClip: "text" }}>{BRAND.toUpperCase()}</p>
        </div>
      </Demo>
      <Demo title="Sparkles"><Sparkles /></Demo>
      <Demo title="Atmospheric Glow Layers">
        <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#0b1120]">
          {[["#0ea5e9", "20%", "30%"], ["#a855f7", "70%", "60%"], ["#f43f5e", "45%", "80%"]].map(([c, x, y], i) => (
            <motion.span key={i} className="absolute h-56 w-56 rounded-full opacity-50 blur-3xl" style={{ background: c, left: x, top: y, translateX: "-50%", translateY: "-50%" }} animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6 + i * 2 }} />
          ))}
          <p className="relative text-2xl font-bold text-white">Layered Aura</p>
        </div>
      </Demo>
      <Demo title="Vignette + Gradient Grid"><Spotlight /></Demo>
    </>
  );
}

/* ================= Mockups ================= */
function Browser({ sidebar = true, url = "corevia.app", children }: { sidebar?: boolean; url?: string; children?: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-[#0d1426] text-slate-200 shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        {["#f87171", "#fbbf24", "#34d399"].map((c) => <span key={c} className="h-3 w-3 rounded-full" style={{ background: c }} />)}
        <span className="ml-4 flex flex-1 items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-xs text-slate-400"><Fi.FiLock className="h-3 w-3" /> {url}</span>
      </div>
      <div className="flex min-h-56">
        {sidebar && <div className="w-40 space-y-2 border-r border-white/10 p-3">{[0, 1, 2, 3, 4].map((i) => <span key={i} className={cx("block h-6 rounded-md", i === 1 ? "bg-sky-500/30" : "bg-white/5")} />)}</div>}
        <div className="flex flex-1 items-center justify-center p-6">{children ?? <div className="text-center"><p className="text-xl font-semibold">App Content</p><p className="text-xs text-slate-400">Browser mockup{sidebar ? " with sidebar" : ""}</p></div>}</div>
      </div>
    </div>
  );
}
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-56 rounded-[2.2rem] border-[6px] border-slate-800 bg-[#0b1020] p-3 shadow-2xl"><div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-white/15" />{children}</div>;
}
export function MockupsDemo() {
  const [url, setUrl] = useState("corevia.app/dashboard");
  return (
    <>
      <Demo title="Browser Mockup"><Browser url={url} /><input value={url} onChange={(e) => setUrl(e.target.value)} aria-label="Mockup URL" className="mt-4 w-full max-w-sm rounded-xl border border-line-strong bg-bg/60 px-3 py-2 text-sm" /></Demo>
      <Demo title="Browser Mockup — Without Sidebar"><Browser sidebar={false} /></Demo>
      <Demo title="Browser Simple (Screenshot)"><Browser sidebar={false}><div className="w-full"><Visual kind="dashboard" accent="#0ea5e9" /></div></Browser></Demo>
      <Demo title="Stacked Mockups (Desktop + Mobile)">
        <div className="relative pb-16">
          <div className="pr-0 md:pr-32"><Browser /></div>
          <div className="absolute -bottom-2 right-0 hidden scale-75 md:block"><PhoneFrame><div className="space-y-2">{[0, 1, 2, 3].map((i) => <span key={i} className="block h-10 rounded-xl bg-white/5" />)}</div></PhoneFrame></div>
        </div>
      </Demo>
      <Demo title="App Mockup — With Background & Floating Cards" className="bg-gradient-to-br from-primary/25 to-indigo-500/10">
        <Visual kind="phone" accent="#0ea5e9" />
      </Demo>
    </>
  );
}
