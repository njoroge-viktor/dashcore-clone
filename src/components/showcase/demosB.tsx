"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Fi from "react-icons/fi";
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Avatar, Badge, Button, Card, IconBubble, Stars, cx } from "../ui";
import { Accordion, CountUp, Field, Modal, Tabs, Toggle, emailOk, inputClass, useToast } from "../interactive";
import { LogoMark } from "../Logo";
import { PricingCards } from "../landing/blocks";
import { ContactForm, EmailCapture } from "../landing/widgets";
import { Demo } from "./ShowcaseShell";
import { BRAND } from "@/lib/data";
import seed from "@/lib/seed";

/* ================= Footers ================= */
const cols = { Platform: ["Payments", "Billing", "Analytics"], Resources: ["Documentation", "API", "Guides"], Company: ["About", "Careers", "Contact"] };
const Socials = () => <div className="flex gap-4 text-fg/70">{[FaXTwitter, FaGithub, FaLinkedin, FaDiscord].map((I, i) => <a key={i} href="#" aria-label="Social link" className="hover:text-primary"><I /></a>)}</div>;
export function FootersDemo() {
  return (
    <>
      <Demo title="Variant 1: Default Multi-Column">
        <div className="grid gap-8 md:grid-cols-4">
          <div><p className="flex items-center gap-2 font-bold"><LogoMark className="h-5 w-5 text-primary" />{BRAND}</p><p className="mt-2 text-sm text-muted">The next-generation payment platform.</p></div>
          {Object.entries(cols).map(([h, ls]) => <div key={h}><p className="text-sm font-semibold">{h}</p><ul className="mt-3 space-y-2 text-sm text-muted">{ls.map((l) => <li key={l}><a href="#" className="hover:text-primary">{l}</a></li>)}</ul></div>)}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted">© 2026 {BRAND}. All rights reserved.<Socials /></div>
      </Demo>
      <Demo title="Variant 2: Split Brand Row">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-line pb-6 md:flex-row md:items-center">
          <p className="text-3xl font-bold tracking-tight">Let&apos;s build something great.</p>
          <Button>Get in touch <Fi.FiArrowRight /></Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted"><nav className="flex flex-wrap gap-5">{["Home", "Pricing", "Blog", "Docs", "Contact"].map((l) => <a key={l} href="#" className="hover:text-fg">{l}</a>)}</nav><Socials /></div>
      </Demo>
      <Demo title="Variant 3: Centered Minimalist">
        <div className="text-center"><LogoMark className="mx-auto h-8 w-8 text-primary" /><nav className="mt-5 flex flex-wrap justify-center gap-6 text-sm text-muted">{["About", "Blog", "Jobs", "Press", "Privacy"].map((l) => <a key={l} href="#" className="hover:text-fg">{l}</a>)}</nav><div className="mt-5 flex justify-center"><Socials /></div><p className="mt-5 text-xs text-muted">© 2026 {BRAND}</p></div>
      </Demo>
      <Demo title="Variant 4: Multi-Column with Newsletter">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div><p className="text-lg font-semibold">Subscribe to our newsletter</p><p className="mb-4 mt-1 text-sm text-muted">Monthly product updates. No spam.</p><EmailCapture source="showcase-footer" /></div>
          {Object.entries(cols).slice(0, 2).map(([h, ls]) => <div key={h}><p className="text-sm font-semibold">{h}</p><ul className="mt-3 space-y-2 text-sm text-muted">{ls.map((l) => <li key={l}>{l}</li>)}</ul></div>)}
        </div>
      </Demo>
    </>
  );
}

/* ================= Navigation ================= */
function ScrollSpy() {
  const ids = ["Overview", "Features", "Pricing", "Contact"];
  const [active, setActive] = useState(ids[0]);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = box.current!;
    const onScroll = () => {
      const secs = [...root.querySelectorAll<HTMLElement>("[data-spy]")];
      const current = secs.filter((s) => s.offsetTop - root.scrollTop <= 80).pop();
      if (current) setActive(current.dataset.spy!);
    };
    root.addEventListener("scroll", onScroll);
    return () => root.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <p className="border-b border-line bg-surface/60 px-4 py-2 text-xs text-muted">Scroll inside this container to see scroll-spy tracking.</p>
      <div className="flex gap-2 border-b border-line px-4 py-3">
        {ids.map((id) => <button key={id} type="button" onClick={() => { const el = box.current!.querySelector<HTMLElement>(`[data-spy="${id}"]`)!; box.current!.scrollTo({ top: el.offsetTop - 8, behavior: "smooth" }); }} className={cx("rounded-full px-3 py-1 text-xs font-semibold transition", active === id ? "bg-primary text-white" : "text-muted hover:text-fg")}>{id}</button>)}
      </div>
      <div ref={box} className="relative h-72 space-y-4 overflow-y-auto p-4">
        {ids.map((id) => <section key={id} data-spy={id} className="rounded-2xl bg-card/60 p-6"><h3 className="text-xl font-bold">{id}</h3><p className="mt-2 text-sm text-muted">Content for {id.toLowerCase()}. Keep scrolling and the active tab above updates automatically.</p><div className="mt-4 h-32 rounded-xl bg-fg/5" /></section>)}
      </div>
    </div>
  );
}
function BlogFilter() {
  const posts = [["Shipping a design system", "Design"], ["Edge rendering explained", "Engineering"], ["Pricing pages that convert", "Growth"], ["Accessibility checklist", "Design"], ["Caching strategies", "Engineering"]];
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const shown = posts.filter(([t, c]) => (cat === "All" || c === cat) && t.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr]">
      <aside className="space-y-4">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search posts..." aria-label="Search posts" className={inputClass} />
        <ul className="space-y-1">{["All", "Design", "Engineering", "Growth"].map((c) => <li key={c}><button type="button" onClick={() => setCat(c)} className={cx("flex w-full justify-between rounded-lg px-3 py-1.5 text-sm", cat === c ? "bg-primary/15 text-primary" : "hover:bg-fg/5")}>{c}<span className="text-muted">{c === "All" ? posts.length : posts.filter((p) => p[1] === c).length}</span></button></li>)}</ul>
      </aside>
      <ul className="space-y-3">{shown.map(([t, c]) => <li key={t} className="flex items-center justify-between rounded-2xl border border-line p-4"><span className="font-medium">{t}</span><Badge tone="neutral">{c}</Badge></li>)}{!shown.length && <li className="text-sm text-muted">No posts found.</li>}</ul>
    </div>
  );
}
function Pagination() {
  const [p, setP] = useState(3);
  const total = 9;
  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      <Button size="sm" variant="ghost" disabled={p === 1} onClick={() => setP(p - 1)} aria-label="Previous page"><Fi.FiChevronLeft /></Button>
      {Array.from({ length: total }, (_, i) => i + 1).filter((n) => n === 1 || n === total || Math.abs(n - p) <= 1).map((n, i, arr) => (
        <span key={n} className="flex items-center">
          {i > 0 && n - arr[i - 1] > 1 && <span className="px-1 text-muted">…</span>}
          <button type="button" aria-current={n === p ? "page" : undefined} onClick={() => setP(n)} className={cx("h-8 min-w-8 rounded-lg px-2 text-sm", n === p ? "bg-primary text-white" : "hover:bg-fg/5")}>{n}</button>
        </span>
      ))}
      <Button size="sm" variant="ghost" disabled={p === total} onClick={() => setP(p + 1)} aria-label="Next page"><Fi.FiChevronRight /></Button>
    </nav>
  );
}
export function NavigationDemo() {
  return (
    <>
      <Demo title="Sticky Navigation — Container Scroll Spy"><ScrollSpy /></Demo>
      <Demo title="Tab Group">
        <Tabs pill={false} tabs={[
          { label: "Overview", content: <p className="text-muted">A high-level summary of the project, goals and timeline.</p> },
          { label: "Activity", content: <ul className="space-y-2 text-sm">{["Priya pushed 3 commits", "Lucas opened PR #482", "Deploy succeeded"].map((a) => <li key={a} className="flex items-center gap-2"><Fi.FiActivity className="text-primary" />{a}</li>)}</ul> },
          { label: "Settings", content: <div className="flex items-center gap-3 text-sm"><Toggle label="Notifications" checked onChange={() => {}} /> Notifications enabled</div> },
        ]} />
      </Demo>
      <Demo title="Breadcrumbs & Pagination">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted"><a href="#" className="hover:text-fg">Home</a><Fi.FiChevronRight /><a href="#" className="hover:text-fg">Projects</a><Fi.FiChevronRight /><span aria-current="page" className="text-fg">Website redesign</span></nav>
        <Pagination />
      </Demo>
      <Demo title="Blog Sidebar (Filter)"><BlogFilter /></Demo>
    </>
  );
}

/* ================= Sections ================= */
export function SectionsDemo() {
  return (
    <>
      <Demo title="Feature Grid Section">
        <div className="text-center"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Features</p><h3 className="mt-2 text-3xl font-bold">Everything you need to ship fast</h3></div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[[Fi.FiZap, "Lightning Fast"], [Fi.FiShield, "Enterprise Security"], [Fi.FiGlobe, "Global Scale"], [Fi.FiLayers, "Component Library"], [Fi.FiCode, "Developer First"], [Fi.FiSend, "Ship Faster"]].map(([I, t]) => {
            const Icon = I as typeof Fi.FiZap;
            return <div key={t as string} className="flex gap-4 rounded-2xl border border-line p-5"><IconBubble className="h-10 w-10 text-base"><Icon /></IconBubble><div><p className="font-semibold">{t as string}</p><p className="text-sm text-muted">Short supporting copy.</p></div></div>;
          })}
        </div>
      </Demo>
      <Demo title="Stats Bar Section">
        <div className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">{[[50, "K+", "Developers"], [99, "%", "Uptime"], [120, "+", "Countries"], [24, "/7", "Support"]].map(([v, s, l]) => <div key={l as string} className="p-4 text-center"><p className="text-4xl font-bold"><CountUp to={v as number} suffix={s as string} /></p><p className="text-sm text-muted">{l}</p></div>)}</div>
      </Demo>
      <Demo title="CTA Section" className="bg-gradient-to-br from-primary-600 to-indigo-600 text-white">
        <div className="text-center"><h3 className="text-3xl font-bold">Ready to get started?</h3><p className="mt-2 text-white/80">Join thousands of teams already building.</p><div className="mt-6 flex justify-center gap-3"><Button variant="white">Start free</Button><Button variant="ghost" className="text-white hover:bg-white/10">Talk to sales</Button></div></div>
      </Demo>
      <Demo title="Split Content Section">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div><h3 className="text-3xl font-bold">Built for teams that move fast</h3><p className="mt-3 text-muted">Collaborate in real time, ship with confidence and measure what matters.</p><ul className="mt-5 space-y-2">{["Real-time collaboration", "Granular permissions", "Audit history"].map((x) => <li key={x} className="flex gap-2"><Fi.FiCheck className="mt-1 text-primary" />{x}</li>)}</ul></div>
          <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/30 via-indigo-500/20 to-transparent" />
        </div>
      </Demo>
      <Demo title="Section with Beams">
        <div className="relative overflow-hidden rounded-2xl py-16 text-center">
          {[20, 45, 70].map((l, i) => <motion.span key={l} className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-primary to-transparent" style={{ left: `${l}%` }} animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }} />)}
          <h3 className="relative text-3xl font-bold">Beams as Visual Dividers</h3><p className="relative mt-2 text-muted">Animated light beams add motion without distraction.</p>
        </div>
      </Demo>
    </>
  );
}

/* ================= Patterns ================= */
export function PatternsDemo() {
  const items: [string, React.CSSProperties | string][] = [
    ["Gradient Background", "bg-gradient-to-br from-primary/40 via-indigo-500/20 to-transparent"],
    ["Dot Pattern", { backgroundImage: "radial-gradient(var(--line-strong) 1.5px, transparent 1.5px)", backgroundSize: "18px 18px" }],
    ["Background Grid", "bg-grid"],
    ["Soft Glow", { background: "radial-gradient(circle at 50% 40%, rgba(14,165,233,.35), transparent 60%)" }],
    ["Vignette", { background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,.7))" }],
    ["Diagonal Stripes", { backgroundImage: "repeating-linear-gradient(45deg, var(--line) 0 1px, transparent 1px 12px)" }],
    ["Atmospheric Glow", { background: "radial-gradient(circle at 20% 20%, rgba(168,85,247,.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(14,165,233,.35), transparent 45%)" }],
    ["Layered Composition", { background: "radial-gradient(circle at 50% 0%, rgba(14,165,233,.4), transparent 50%), radial-gradient(var(--line-strong) 1px, transparent 1px)", backgroundSize: "100% 100%, 16px 16px" }],
  ];
  return (
    <Demo title="Background patterns">
      <div className="grid gap-5 sm:grid-cols-2">
        {items.map(([n, s]) => (
          <div key={n} className={cx("flex h-44 items-end overflow-hidden rounded-2xl border border-line p-4", typeof s === "string" && s)} style={typeof s === "string" ? undefined : s}>
            <span className="rounded-full bg-bg/80 px-3 py-1 text-xs font-semibold backdrop-blur">{n}</span>
          </div>
        ))}
      </div>
    </Demo>
  );
}

/* ================= Forms ================= */
export function FormsDemo() {
  const [bio, setBio] = useState("");
  const [checks, setChecks] = useState({ a: true, b: false, c: false });
  const [radio, setRadio] = useState("monthly");
  const [toggles, setToggles] = useState({ email: true, sms: false });
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const docs = ["Getting started", "Installation", "Theming", "Dark mode", "Deployment to Netlify", "Data with db.json", "Localization"];
  return (
    <>
      <Demo title="FormField Variants">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name" htmlFor="f-name"><input id="f-name" placeholder="John Doe" className={inputClass} /></Field>
          <Field label="Email" htmlFor="f-email" error={email && !emailOk(email) ? "That doesn't look like an email." : undefined} hint="We'll never share it.">
            <input id="f-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@company.com" aria-invalid={!!email && !emailOk(email)} className={inputClass} />
          </Field>
          <Field label="Website" htmlFor="f-url"><div className="flex"><span className="flex items-center rounded-l-xl border border-r-0 border-line-strong bg-fg/5 px-3 text-sm text-muted">https://</span><input id="f-url" placeholder="example.com" className={cx(inputClass, "rounded-l-none")} /></div></Field>
          <Field label="Disabled" htmlFor="f-dis"><input id="f-dis" disabled value="Read only value" className={cx(inputClass, "opacity-50")} /></Field>
          <Field label="Country" htmlFor="f-country"><select id="f-country" className={inputClass}>{["Kenya", "United States", "Germany", "Brazil"].map((c) => <option key={c}>{c}</option>)}</select></Field>
          <Field label="Date" htmlFor="f-date"><input id="f-date" type="date" className={inputClass} /></Field>
        </div>
      </Demo>
      <Demo title="Textarea">
        <Field label="Bio" htmlFor="f-bio" hint={`${bio.length}/200 characters`}><textarea id="f-bio" rows={4} maxLength={200} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Write a short bio..." className={inputClass} /></Field>
      </Demo>
      <Demo title="Checkbox, Radio & Toggle">
        <div className="grid gap-8 md:grid-cols-3">
          <fieldset className="space-y-2"><legend className="mb-2 text-sm font-semibold">Interests</legend>{(Object.keys(checks) as (keyof typeof checks)[]).map((k, i) => <label key={k} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={checks[k]} onChange={(e) => setChecks({ ...checks, [k]: e.target.checked })} className="h-4 w-4 accent-sky-500" />{["Design", "Engineering", "Marketing"][i]}</label>)}</fieldset>
          <fieldset className="space-y-2"><legend className="mb-2 text-sm font-semibold">Billing</legend>{["monthly", "annual"].map((r) => <label key={r} className="flex items-center gap-2 text-sm capitalize"><input type="radio" name="billing" checked={radio === r} onChange={() => setRadio(r)} className="h-4 w-4 accent-sky-500" />{r}</label>)}</fieldset>
          <div className="space-y-3"><p className="text-sm font-semibold">Notifications</p>{(["email", "sms"] as const).map((k) => <div key={k} className="flex items-center justify-between text-sm uppercase"><span>{k}</span><Toggle label={k} checked={toggles[k]} onChange={(v) => setToggles({ ...toggles, [k]: v })} /></div>)}</div>
        </div>
      </Demo>
      <Demo title="Search Bar">
        <div className="relative max-w-md"><Fi.FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" /><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search documentation..." aria-label="Search documentation" className={cx(inputClass, "rounded-full pl-11")} /></div>
        {search && <ul className="mt-3 max-w-md overflow-hidden rounded-2xl border border-line">{docs.filter((d) => d.toLowerCase().includes(search.toLowerCase())).map((d) => <li key={d} className="border-b border-line px-4 py-2 text-sm last:border-0 hover:bg-fg/5">{d}</li>)}</ul>}
      </Demo>
      <Demo title="Newsletter Form"><div className="max-w-md"><EmailCapture source="showcase-forms" placeholder="your@email.com" /></div></Demo>
      <Demo title="Contact Form Layout" note="Fully validated — submissions are saved to the contactMessages collection."><ContactForm source="showcase" /></Demo>
    </>
  );
}

/* ================= Accordions ================= */
export function AccordionsDemo() {
  const basic = [
    { q: `What is ${BRAND}?`, a: `${BRAND} is a frontend foundation of pages, sections and components.` },
    { q: `Is ${BRAND} free to use?`, a: "The Starter plan is free forever." },
    { q: "Does it support dark mode?", a: "Yes, with a toggle that remembers each visitor's choice." },
    { q: "Can I use it with existing projects?", a: "Yes, copy any component — they're plain React and Tailwind." },
  ];
  return (
    <>
      <Demo title="Single Accordion (Collapsible)"><Accordion items={basic} /></Demo>
      <Demo title="Multiple Accordion (Multi-open)"><Accordion items={basic} multiple /></Demo>
      <Demo title="Accordion with Default Open"><Accordion items={basic} defaultOpen={[1]} /></Demo>
      <Demo title="Full FAQ Layout">
        <div className="grid gap-8 md:grid-cols-[1fr_1.5fr]">
          <div><h3 className="text-2xl font-bold">Frequently Asked Questions</h3><p className="mt-2 text-muted">Everything you need to know.</p></div>
          <Accordion items={seed.faqs.slice(4, 9).map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </Demo>
    </>
  );
}

/* ================= Carousel ================= */
function Carousel({ slides, auto = false, perView = 1 }: { slides: React.ReactNode[]; auto?: boolean; perView?: number }) {
  const [i, setI] = useState(0);
  const max = Math.max(0, slides.length - perView);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!auto || paused) return;
    const id = setInterval(() => setI((x) => (x >= max ? 0 : x + 1)), 3500);
    return () => clearInterval(id);
  }, [auto, paused, max]);
  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel">
      <div className="overflow-hidden rounded-2xl">
        <motion.div className="flex" animate={{ x: `-${(i * 100) / perView}%` }} transition={{ type: "spring", stiffness: 120, damping: 22 }} drag="x" dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => { if (info.offset.x < -60) setI(Math.min(max, i + 1)); if (info.offset.x > 60) setI(Math.max(0, i - 1)); }}>
          {slides.map((s, k) => <div key={k} className="shrink-0 px-2" style={{ width: `${100 / perView}%` }} aria-hidden={k < i || k >= i + perView}>{s}</div>)}
        </motion.div>
      </div>
      <button type="button" onClick={() => setI(i <= 0 ? max : i - 1)} aria-label="Previous slide" className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-surface/90 shadow"><Fi.FiChevronLeft /></button>
      <button type="button" onClick={() => setI(i >= max ? 0 : i + 1)} aria-label="Next slide" className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-surface/90 shadow"><Fi.FiChevronRight /></button>
      <div className="mt-4 flex justify-center gap-2">{Array.from({ length: max + 1 }).map((_, k) => <button key={k} type="button" onClick={() => setI(k)} aria-label={`Go to slide ${k + 1}`} aria-current={k === i} className={cx("h-2 rounded-full transition-all", k === i ? "w-6 bg-primary" : "w-2 bg-fg/25")} />)}</div>
    </div>
  );
}
export function CarouselDemo() {
  const colors = ["from-sky-500/40", "from-indigo-500/40", "from-emerald-500/40", "from-amber-500/40", "from-rose-500/40"];
  return (
    <>
      <Demo title="Basic Carousel" note="Autoplays, pauses on hover, supports swipe/drag.">
        <Carousel auto slides={colors.map((c, k) => <div key={k} className={`flex aspect-[16/7] flex-col items-center justify-center rounded-2xl border border-line bg-gradient-to-br ${c} to-transparent`}><p className="text-5xl font-bold text-primary">0{k + 1}</p><p className="text-sm">Slide {k + 1}</p></div>)} />
      </Demo>
      <Demo title="Testimonial Carousel">
        <Carousel slides={seed.testimonials.map((t) => <div key={t.id} className="mx-auto max-w-2xl py-6 text-center"><Stars n={t.rating} /><p className="mt-4 text-xl font-medium leading-relaxed">“{t.quote}”</p><div className="mt-5 flex items-center justify-center gap-3"><Avatar name={t.name} /><div className="text-left"><p className="font-semibold">{t.name}</p><p className="text-xs text-muted">{t.role}</p></div></div></div>)} />
      </Demo>
      <Demo title="Multi-Slide Carousel">
        <Carousel perView={3} slides={Array.from({ length: 7 }, (_, k) => <Card key={k} className="h-40"><p className="text-sm text-muted">Card</p><p className="text-3xl font-bold">#{k + 1}</p></Card>)} />
      </Demo>
      <Demo title="Tab Group">
        <Tabs tabs={[
          { label: "Project Overview", content: <Card><h3 className="font-semibold">Project Overview</h3><p className="mt-2 text-sm text-muted">Redesign of the marketing site with a new component library.</p></Card> },
          { label: "Timeline", content: <Card><ol className="space-y-2 text-sm">{["Discovery — Week 1", "Design — Weeks 2-3", "Build — Weeks 4-6", "Launch — Week 7"].map((x) => <li key={x}>{x}</li>)}</ol></Card> },
          { label: "Team", content: <Card><div className="flex -space-x-2">{seed.team.slice(0, 5).map((m) => <Avatar key={m.id} name={m.name} className="border-2 border-bg" />)}</div></Card> },
        ]} />
      </Demo>
    </>
  );
}

/* ================= Feedback ================= */
export function FeedbackDemo() {
  const alerts = [
    { tone: "info", icon: Fi.FiInfo, t: "Information", d: "Your account has been updated successfully.", c: "border-sky-500/30 bg-sky-500/10 text-sky-500" },
    { tone: "success", icon: Fi.FiCheckCircle, t: "Success", d: "Payment processed. You will receive a confirmation email shortly.", c: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500" },
    { tone: "warning", icon: Fi.FiAlertTriangle, t: "Warning", d: "Your trial ends in 3 days.", c: "border-amber-500/30 bg-amber-500/10 text-amber-500" },
    { tone: "error", icon: Fi.FiXCircle, t: "Error", d: "We couldn't save your changes. Try again.", c: "border-rose-500/30 bg-rose-500/10 text-rose-500" },
  ];
  const [shown, setShown] = useState(alerts.map((a) => a.tone));
  const [modal, setModal] = useState(false);
  const [video, setVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const toast = useToast();
  useEffect(() => {
    if (progress <= 0 || progress >= 100) return;
    const id = setTimeout(() => setProgress((p) => Math.min(100, p + 7)), 150);
    return () => clearTimeout(id);
  }, [progress]);
  return (
    <>
      <Demo title="Alert Variants">
        <div className="space-y-3">
          <AnimatePresence>
            {alerts.filter((a) => shown.includes(a.tone)).map((a) => (
              <motion.div key={a.tone} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 40 }} role="alert" className={cx("flex gap-3 rounded-2xl border p-4", a.c)}>
                <a.icon className="mt-0.5 shrink-0" /><div className="flex-1 text-fg"><p className="text-sm font-semibold">{a.t}</p><p className="text-sm text-muted">{a.d}</p></div>
                <button type="button" onClick={() => setShown(shown.filter((x) => x !== a.tone))} aria-label={`Dismiss ${a.t}`} className="text-muted hover:text-fg"><Fi.FiX /></button>
              </motion.div>
            ))}
          </AnimatePresence>
          {shown.length < alerts.length && <Button size="sm" variant="secondary" onClick={() => setShown(alerts.map((a) => a.tone))}><Fi.FiRotateCcw /> Restore alerts</Button>}
        </div>
      </Demo>
      <Demo title="Toasts">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => toast({ tone: "success", title: "Changes saved", desc: "Your profile is up to date." })}>Success toast</Button>
          <Button variant="secondary" onClick={() => toast({ tone: "info", title: "New version available" })}>Info toast</Button>
          <Button variant="secondary" onClick={() => toast({ tone: "error", title: "Upload failed", desc: "File exceeds 10MB." })}>Error toast</Button>
        </div>
      </Demo>
      <Demo title="Badges, Spinners & Progress">
        <div className="flex flex-wrap items-center gap-6">
          <Badge>New</Badge><Badge tone="success">Live</Badge><Badge tone="warning">Beta</Badge>
          <Fi.FiLoader className="h-6 w-6 animate-spin text-primary" aria-label="Loading" />
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" aria-label="Loading" />
          <span className="flex gap-1">{[0, 1, 2].map((i) => <motion.span key={i} className="h-2 w-2 rounded-full bg-primary" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />)}</span>
        </div>
        <div className="mt-6 max-w-md">
          <div className="h-2.5 overflow-hidden rounded-full bg-fg/10"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div>
          <div className="mt-3 flex items-center gap-3"><Button size="sm" onClick={() => setProgress(1)} disabled={progress > 0 && progress < 100}>{progress >= 100 ? "Upload again" : "Simulate upload"}</Button><span className="text-sm text-muted">{progress >= 100 ? "Done!" : progress ? `${progress}%` : ""}</span></div>
        </div>
      </Demo>
      <Demo title="Modal & Video Modal">
        <div className="flex flex-wrap gap-3"><Button onClick={() => setModal(true)}>Open modal</Button><Button variant="secondary" onClick={() => setVideo(true)}><Fi.FiPlay /> Play video</Button></div>
        <div className="mt-6 flex items-center gap-2 text-sm"><span className="group relative inline-flex cursor-help items-center gap-1 text-primary underline decoration-dotted">Hover for tooltip<span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-fg px-2 py-1 text-xs text-bg opacity-0 transition group-hover:opacity-100">Helpful hint!</span></span></div>
      </Demo>
      <Modal open={modal} onClose={() => setModal(false)} title="Delete project?">
        <p className="text-sm text-muted">This permanently deletes the project and all of its deployments.</p>
        <div className="mt-6 flex justify-end gap-3"><Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button><Button className="bg-rose-500 shadow-none hover:bg-rose-600" onClick={() => { setModal(false); toast({ tone: "success", title: "Project deleted (demo)" }); }}>Delete</Button></div>
      </Modal>
      <Modal open={video} onClose={() => setVideo(false)} title="Video" wide><div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 text-sm text-slate-300"><Fi.FiPlay className="mr-2" /> Your video embed goes here</div></Modal>
    </>
  );
}

/* ================= Pricing ================= */
export function PricingDemo() {
  return (
    <>
      <Demo title="With Billing Toggle"><PricingCards /></Demo>
      <Demo title="Glass Card Pricing (Dark)" className="bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-900">
        <div className="grid gap-5 md:grid-cols-3">
          {seed.plans.map((p) => (
            <div key={p.id} className="rounded-3xl border border-white/15 bg-white/5 p-6 text-white backdrop-blur-xl">
              <p className="font-semibold">{p.name}</p><p className="mt-3 text-4xl font-bold">${p.monthly}<span className="text-sm font-normal text-white/60">/mo</span></p>
              <ul className="mt-5 space-y-2 text-sm text-white/80">{p.features.slice(0, 3).map((f) => <li key={f} className="flex gap-2"><Fi.FiCheck className="mt-0.5 text-sky-300" />{f}</li>)}</ul>
              <Button variant="white" className="mt-6 w-full">Choose {p.name}</Button>
            </div>
          ))}
        </div>
      </Demo>
      <Demo title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead><tr className="text-left"><th className="pb-3">Feature</th>{seed.plans.map((p) => <th key={p.id} className="pb-3 text-center">{p.name}</th>)}</tr></thead>
            <tbody className="divide-y divide-line">
              {[["Projects", "3", "20", "Unlimited"], ["Analytics", "Basic", "Advanced", "Custom"], ["Support", "Email", "Priority", "Dedicated"], ["SSO", "—", "—", "✓"]].map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} className={cx("py-3", i > 0 && "text-center")}>{c}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
      </Demo>
    </>
  );
}
