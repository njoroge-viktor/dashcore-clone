"use client";

import { motion } from "framer-motion";
import { FiActivity, FiArrowDownLeft, FiArrowUpRight, FiBell, FiCheck, FiHeart, FiMessageCircle, FiSend, FiTrendingUp, FiUsers, FiZap } from "react-icons/fi";
import { SiDiscord, SiFigma, SiGithub, SiGoogledrive, SiNotion, SiShopify, SiStripe, SiZapier } from "react-icons/si";
import { FaSlack } from "react-icons/fa6";
import { Avatar } from "../ui";

export type VisualKind =
  | "phone" | "dashboard" | "chat" | "coins" | "code" | "social" | "person"
  | "orbit" | "chart" | "wallet" | "kanban" | "pipeline";

const float = (d = 0) => ({
  animate: { y: [0, -10, 0] },
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay: d },
});

const Panel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-white/10 bg-[#0d1426]/90 text-slate-100 shadow-2xl shadow-black/40 backdrop-blur ${className}`}>{children}</div>
);

const Bars = ({ accent, values = [40, 62, 35, 78, 54, 90, 68] }: { accent: string; values?: number[] }) => (
  <div className="flex h-24 items-end gap-2">
    {values.map((v, i) => (
      <motion.span
        key={i}
        initial={{ height: 0 }}
        whileInView={{ height: `${v}%` }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.06, duration: 0.6 }}
        className="flex-1 rounded-t-md"
        style={{ background: i === values.length - 2 ? accent : "rgba(148,163,184,.25)" }}
      />
    ))}
  </div>
);

const Line = ({ accent, d = "M0,70 C40,60 60,30 100,40 S160,10 200,20 260,5 300,12" }: { accent: string; d?: string }) => (
  <svg viewBox="0 0 300 80" className="h-20 w-full" preserveAspectRatio="none" aria-hidden>
    <defs>
      <linearGradient id={`g${accent.slice(1)}`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor={accent} stopOpacity=".35" />
        <stop offset="1" stopColor={accent} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d={`${d} L300,80 L0,80 Z`} fill={`url(#g${accent.slice(1)})`} />
    <motion.path d={d} fill="none" stroke={accent} strokeWidth="2.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
  </svg>
);

function Phone({ accent }: { accent: string }) {
  return (
    <div className="relative mx-auto h-[460px] w-[240px]">
      <div className="absolute -left-16 top-24 h-56 w-56 rounded-full opacity-70 blur-[2px]" style={{ background: accent }} />
      <motion.div {...float()} className="relative h-full rounded-[2.4rem] border-[6px] border-slate-800 bg-[#0b1020] p-4 shadow-2xl">
        <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-white/15" />
        <p className="text-xs text-slate-400">Good morning</p>
        <p className="text-lg font-bold text-white">$12,480.20</p>
        <div className="mt-4 rounded-2xl p-3" style={{ background: `${accent}26` }}>
          <Bars accent={accent} />
        </div>
        {["Design sync", "Ship v2.1", "Review metrics"].map((t, i) => (
          <div key={t} className="mt-3 flex items-center gap-3 rounded-xl bg-white/[0.04] p-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg text-xs" style={{ background: i === 0 ? accent : "rgba(255,255,255,.08)" }}>
              <FiCheck className="text-white" />
            </span>
            <span className="text-xs text-slate-200">{t}</span>
          </div>
        ))}
      </motion.div>
      <motion.div {...float(1)} className="absolute -right-14 bottom-16">
        <Panel className="px-4 py-3"><p className="text-[10px] text-slate-400">Growth</p><p className="flex items-center gap-1 text-sm font-bold text-emerald-400"><FiTrendingUp /> +24.8%</p></Panel>
      </motion.div>
    </div>
  );
}

function Dashboard({ accent }: { accent: string }) {
  return (
    <div className="relative">
      <Panel className="overflow-hidden">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          {["#f87171", "#fbbf24", "#34d399"].map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}
          <span className="ml-3 rounded-md bg-white/5 px-3 py-1 text-[11px] text-slate-400">app.corevia.dev/analytics</span>
        </div>
        <div className="grid grid-cols-3 gap-3 p-4">
          {[["Revenue", "$48.2k", "+12%"], ["Active users", "8,940", "+5%"], ["Churn", "1.8%", "-0.4%"]].map(([l, v, d]) => (
            <div key={l} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-[11px] text-slate-400">{l}</p>
              <p className="mt-1 text-lg font-bold">{v}</p>
              <p className="text-[11px] text-emerald-400">{d}</p>
            </div>
          ))}
          <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="mb-2 text-[11px] text-slate-400">Monthly recurring revenue</p>
            <Line accent={accent} />
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="mb-2 text-[11px] text-slate-400">Signups</p>
            <Bars accent={accent} values={[30, 50, 45, 70, 60, 85]} />
          </div>
        </div>
      </Panel>
      <motion.div {...float(0.5)} className="absolute -bottom-6 -left-6 hidden sm:block">
        <Panel className="flex items-center gap-3 px-4 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${accent}33`, color: accent }}><FiActivity /></span>
          <div><p className="text-[10px] text-slate-400">Live sessions</p><p className="text-sm font-bold">1,284</p></div>
        </Panel>
      </motion.div>
    </div>
  );
}

function Chat({ accent }: { accent: string }) {
  const msgs = [
    { me: true, t: "Summarize last week's support tickets" },
    { me: false, t: "142 tickets, 87% resolved in under 2h. Top topic: billing changes (31%)." },
    { me: true, t: "Draft a reply for the billing ones" },
  ];
  return (
    <Panel className="mx-auto max-w-md p-5">
      <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: accent }}><FiZap className="text-white" /></span>
        <div><p className="text-sm font-semibold">Assistant</p><p className="text-[11px] text-emerald-400">● Online</p></div>
      </div>
      <div className="space-y-3">
        {msgs.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.4 }}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.me ? "ml-auto text-white" : "bg-white/[0.06] text-slate-200"}`}
            style={m.me ? { background: accent } : undefined}>
            {m.t}
          </motion.div>
        ))}
        <div className="flex gap-1 px-2">{[0, 1, 2].map((i) => <motion.span key={i} className="h-2 w-2 rounded-full bg-slate-400" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }} />)}</div>
      </div>
    </Panel>
  );
}

function Coins({ accent }: { accent: string }) {
  const coins = [
    { s: "₿", x: "10%", y: "10%", c: "#f7931a", size: 96 },
    { s: "Ξ", x: "62%", y: "4%", c: "#8b9cf7", size: 80 },
    { s: "$", x: "40%", y: "46%", c: "#22c55e", size: 88 },
    { s: "◎", x: "76%", y: "52%", c: "#14f195", size: 64 },
  ];
  return (
    <div className="relative h-[380px]">
      <div className="absolute inset-0 rounded-full opacity-40 blur-3xl" style={{ background: `radial-gradient(circle, ${accent}, transparent 65%)` }} />
      {coins.map((c, i) => (
        <motion.div key={c.s} {...float(i * 0.6)} className="absolute flex items-center justify-center rounded-3xl border border-white/15 bg-[#151c33] text-3xl font-bold shadow-2xl"
          style={{ left: c.x, top: c.y, width: c.size, height: c.size, color: c.c }}>{c.s}</motion.div>
      ))}
      <Panel className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center justify-between text-sm"><span className="font-semibold">BTC / USD</span><span className="text-emerald-400">+3.42%</span></div>
        <Line accent={accent} d="M0,60 C30,55 50,65 80,45 S130,50 160,30 220,35 300,8" />
      </Panel>
    </div>
  );
}

function Code({ accent }: { accent: string }) {
  const lines: [string, string][] = [
    ["#c084fc", "import"], ["#e2e8f0", " { Corevia } "], ["#c084fc", "from"], ["#86efac", " '@corevia/sdk'"],
  ];
  return (
    <Panel className="overflow-hidden font-mono text-[13px]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        {["#f87171", "#fbbf24", "#34d399"].map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}
        <span className="ml-3 text-[11px] text-slate-400">deploy.ts</span>
      </div>
      <pre className="overflow-x-auto p-5 leading-7 text-slate-300">
        <code>
          {lines.map(([c, t], i) => <span key={i} style={{ color: c }}>{t}</span>)}
          {"\n\n"}
          <span style={{ color: "#c084fc" }}>const</span> client = <span style={{ color: "#c084fc" }}>new</span> <span style={{ color: accent }}>Corevia</span>({"{"} apiKey: <span style={{ color: "#86efac" }}>process.env.KEY</span> {"}"});{"\n"}
          <span style={{ color: "#c084fc" }}>await</span> client.deploy({"{"}{"\n"}
          {"  "}region: <span style={{ color: "#86efac" }}>&apos;eu-west&apos;</span>,{"\n"}
          {"  "}replicas: <span style={{ color: "#fbbf24" }}>3</span>,{"\n"}
          {"}"});{"\n"}
          <span className="text-slate-500">{"// ✓ deployed in 412ms"}</span>
        </code>
      </pre>
    </Panel>
  );
}

function Social({ accent }: { accent: string }) {
  const posts = [
    { n: "Sarah's creative corner", g: "from-amber-400 to-orange-500", likes: "2.4k" },
    { n: "Faces people remember", g: "from-pink-500 to-violet-600", likes: "1.1k" },
    { n: "Feeds with a feeling", g: "from-sky-400 to-indigo-500", likes: "980" },
    { n: "Moments built to be shared", g: "from-emerald-400 to-teal-500", likes: "3.2k" },
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      {posts.map((p, i) => (
        <motion.div key={p.n} {...float(i * 0.5)} className={i % 2 ? "mt-10" : ""}>
          <div className={`relative aspect-[3/4] overflow-hidden rounded-3xl bg-gradient-to-br ${p.g} shadow-2xl`}>
            <span className="absolute left-1/2 top-[28%] h-20 w-20 -translate-x-1/2 rounded-full bg-white/40" />
            <span className="absolute left-1/2 top-[52%] h-24 w-32 -translate-x-1/2 rounded-t-full bg-white/25" />
            <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-black/40 p-3 text-white backdrop-blur">
              <p className="text-xs font-semibold">{p.n}</p>
              <p className="mt-1 flex items-center gap-3 text-[11px] text-white/80"><span className="flex items-center gap-1"><FiHeart style={{ color: accent }} />{p.likes}</span><span className="flex items-center gap-1"><FiMessageCircle />{Math.round(parseFloat(p.likes) * 40)}</span></p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Person({ accent }: { accent: string }) {
  return (
    <div className="relative mx-auto h-[440px] w-[340px]">
      <div className="absolute inset-x-6 bottom-0 top-16 rounded-full opacity-50 blur-3xl" style={{ background: accent }} />
      <div className="absolute bottom-0 left-1/2 h-[380px] w-[280px] -translate-x-1/2 overflow-hidden rounded-t-[140px] border border-white/10 bg-gradient-to-b from-slate-700 to-slate-900">
        <span className="absolute left-1/2 top-16 h-28 w-24 -translate-x-1/2 rounded-[45%] bg-gradient-to-b from-amber-200 to-amber-400" />
        <span className="absolute bottom-0 left-1/2 h-44 w-56 -translate-x-1/2 rounded-t-[110px] bg-slate-950" />
      </div>
      <motion.div {...float()} className="absolute left-0 top-28"><Panel className="px-4 py-3"><p className="text-xl font-bold">12+</p><p className="text-[11px] text-slate-400">Years experience</p></Panel></motion.div>
      <motion.div {...float(1)} className="absolute bottom-20 right-0"><Panel className="px-4 py-3"><p className="text-xl font-bold">98%</p><p className="text-[11px] text-slate-400">Client satisfaction</p></Panel></motion.div>
    </div>
  );
}

function Orbit({ accent }: { accent: string }) {
  const icons = [SiGithub, FaSlack, SiStripe, SiNotion, SiFigma, SiZapier, SiShopify, SiGoogledrive, SiDiscord];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      {[1, 0.7, 0.42].map((s) => (
        <span key={s} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15" style={{ width: `${s * 100}%`, height: `${s * 100}%` }} />
      ))}
      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl text-3xl text-white shadow-[0_0_60px] " style={{ background: accent, boxShadow: `0 0 60px ${accent}` }}><FiZap /></div>
      <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
        {icons.map((I, i) => {
          const r = i < 6 ? 50 : 35;
          const a = (i / (i < 6 ? 6 : 4)) * Math.PI * 2 + (i < 6 ? 0 : 0.5);
          return (
            <motion.span key={i} animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-[#151c33] text-xl text-white shadow-xl"
              style={{ left: `${50 + r * Math.cos(a)}%`, top: `${50 + r * Math.sin(a)}%` }}>
              <I />
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}

function Chart({ accent }: { accent: string }) {
  return (
    <div className="relative">
      <Panel className="p-5">
        <div className="flex items-center justify-between">
          <div><p className="text-xs text-slate-400">Revenue growth</p><p className="text-2xl font-bold">$5,271</p></div>
          <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-semibold text-emerald-400">+18.2%</span>
        </div>
        <div className="mt-4"><Bars accent={accent} values={[25, 40, 32, 55, 48, 70, 62, 88]} /></div>
      </Panel>
      <motion.div {...float(0.8)} className="absolute -right-4 -top-8">
        <Panel className="flex items-center gap-2 px-4 py-3">
          <div className="flex -space-x-2">{["#f43f5e", "#8b5cf6", "#0ea5e9"].map((c) => <span key={c} className="h-6 w-6 rounded-full border-2 border-[#0d1426]" style={{ background: c }} />)}</div>
          <div><p className="text-sm font-bold">100k+</p><p className="text-[10px] text-slate-400">Followers</p></div>
        </Panel>
      </motion.div>
    </div>
  );
}

function Wallet({ accent }: { accent: string }) {
  return (
    <div className="relative mx-auto max-w-sm">
      <motion.div {...float()} className="relative aspect-[1.6] rounded-3xl p-6 text-white shadow-2xl" style={{ background: `linear-gradient(135deg, ${accent}, #0f766e)` }}>
        <p className="text-sm opacity-80">Business wallet</p>
        <p className="mt-2 text-3xl font-bold">$24,830.00</p>
        <p className="absolute bottom-6 left-6 font-mono tracking-widest opacity-90">•••• 4242</p>
        <span className="absolute bottom-6 right-6 flex"><span className="h-8 w-8 rounded-full bg-white/70" /><span className="-ml-3 h-8 w-8 rounded-full bg-white/40" /></span>
      </motion.div>
      <Panel className="mt-4 divide-y divide-white/10">
        {[["Acme Corp", "+$2,400.00", true], ["AWS invoice", "-$318.20", false], ["Payroll", "-$8,120.00", false]].map(([n, a, inc]) => (
          <div key={n as string} className="flex items-center gap-3 px-4 py-3 text-sm">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${inc ? "bg-emerald-500/15 text-emerald-400" : "bg-white/5 text-slate-300"}`}>{inc ? <FiArrowDownLeft /> : <FiArrowUpRight />}</span>
            <span className="flex-1">{n}</span>
            <span className={inc ? "text-emerald-400" : "text-slate-300"}>{a}</span>
          </div>
        ))}
      </Panel>
    </div>
  );
}

function Kanban({ accent }: { accent: string }) {
  const cols = [
    { t: "Backlog", items: ["Auth refactor", "Rate limiting"] },
    { t: "In progress", items: ["Billing v2", "Search index"] },
    { t: "Done", items: ["SSO", "Audit log"] },
  ];
  return (
    <Panel className="grid grid-cols-3 gap-3 p-4">
      {cols.map((c, ci) => (
        <div key={c.t}>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{c.t}</p>
          {c.items.map((it, i) => (
            <motion.div key={it} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.15 + i * 0.1 }}
              className="mb-2 rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <span className="mb-2 block h-1 w-8 rounded-full" style={{ background: ci === 2 ? "#34d399" : accent }} />
              <p className="text-xs font-medium">{it}</p>
              <div className="mt-2 flex -space-x-1.5"><Avatar name={it} size={18} /><Avatar name={c.t} size={18} /></div>
            </motion.div>
          ))}
        </div>
      ))}
    </Panel>
  );
}

function Pipeline({ accent }: { accent: string }) {
  const rows = [["Northwind", "Proposal", 72], ["Globex", "Negotiation", 88], ["Initech", "Qualified", 40], ["Umbrella", "Won", 100]] as const;
  return (
    <Panel className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-semibold">Sales pipeline</p>
        <span className="flex items-center gap-1 text-xs text-slate-400"><FiUsers /> 4 deals</span>
      </div>
      <div className="space-y-4">
        {rows.map(([n, s, p]) => (
          <div key={n}>
            <div className="mb-1.5 flex justify-between text-xs"><span className="font-medium">{n}</span><span className="text-slate-400">{s}</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full" style={{ background: p === 100 ? "#34d399" : accent }} initial={{ width: 0 }} whileInView={{ width: `${p}%` }} viewport={{ once: true }} transition={{ duration: 0.9 }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/[0.04] p-3 text-xs"><FiBell style={{ color: accent }} /> Globex opened your proposal 2 min ago</div>
      <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/[0.04] p-3 text-xs"><FiSend style={{ color: accent }} /> Follow-up scheduled for tomorrow</div>
    </Panel>
  );
}

export default function Visual({ kind, accent }: { kind: VisualKind; accent: string }) {
  const map = { phone: Phone, dashboard: Dashboard, chat: Chat, coins: Coins, code: Code, social: Social, person: Person, orbit: Orbit, chart: Chart, wallet: Wallet, kanban: Kanban, pipeline: Pipeline };
  const C = map[kind];
  return <C accent={accent} />;
}
