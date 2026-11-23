"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FiArrowRight, FiCheck, FiPlay, FiStar } from "react-icons/fi";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import {
  SiCloudflare, SiDocker, SiFigma, SiGithub, SiGraphql, SiKubernetes, SiMongodb, SiNextdotjs, SiNodedotjs,
  SiPostgresql, SiPython, SiReact, SiRedis, SiStripe, SiTailwindcss, SiTypescript, SiVercel, SiNotion, SiZapier, SiShopify,
} from "react-icons/si";
import { FaSlack } from "react-icons/fa6";
import { Avatar, Badge, ButtonLink, Card, Container, IconBubble, Section, SectionHeader, Stars, cx } from "../ui";
import { Accordion, CountUp, Modal, Tabs } from "../interactive";
import Visual, { type VisualKind } from "./Visual";
import { ChatDemo, ContactForm, CryptoTicker, EmailCapture, SendMoney, SwapWidget } from "./widgets";
import Reveal from "../Reveal";
import seed from "@/lib/seed";

export type CTA = { label: string; href: string };
export type Feature = { icon: IconType; title: string; desc: string };

export type Hero = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle: string;
  primary: CTA;
  secondary?: CTA;
  visual: VisualKind;
  align?: "left" | "center";
  rating?: boolean;
  stores?: boolean;
  video?: boolean;
};

export type Block =
  | { type: "logos"; title?: string }
  | { type: "features"; eyebrow?: string; title: string; subtitle?: string; items: Feature[]; cols?: 2 | 3 | 4 }
  | { type: "split"; eyebrow?: string; title: string; desc: string; bullets?: string[]; visual: VisualKind; reverse?: boolean; cta?: CTA }
  | { type: "steps"; eyebrow?: string; title: string; subtitle?: string; items: { title: string; desc: string }[] }
  | { type: "stats"; title?: string; items: { value: number; prefix?: string; suffix?: string; decimals?: number; label: string }[] }
  | { type: "testimonials"; eyebrow?: string; title: string; subtitle?: string }
  | { type: "pricing"; eyebrow?: string; title: string; subtitle?: string }
  | { type: "faq"; eyebrow?: string; title: string; items: { q: string; a: string }[] }
  | { type: "cta"; title: string; desc: string; primary: CTA; secondary?: CTA; stores?: boolean; newsletter?: boolean }
  | { type: "team"; eyebrow?: string; title: string; subtitle?: string }
  | { type: "tabs"; eyebrow?: string; title: string; subtitle?: string; tabs: { label: string; title: string; desc: string; bullets: string[]; visual: VisualKind }[] }
  | { type: "widget"; widget: "chat" | "swap" | "send" | "contact" | "ticker"; eyebrow?: string; title: string; subtitle?: string }
  | { type: "projects"; eyebrow?: string; title: string; items: { title: string; tag: string; desc: string; accent: string }[] }
  | { type: "stack"; eyebrow?: string; title: string; subtitle?: string };

export type LandingConfig = { slug: string; name: string; accent: string; description: string; hero: Hero; blocks: Block[] };

/* ---------------- Hero ---------------- */
export function LandingHero({ hero, accent }: { hero: Hero; accent: string }) {
  const [video, setVideo] = useState(false);
  const center = hero.align === "center";
  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pt-40">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_25%,transparent_70%)]" aria-hidden />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]" style={{ background: accent }} aria-hidden />
      <Container className={cx("relative grid items-center gap-14", !center && "lg:grid-cols-2")}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className={center ? "mx-auto max-w-3xl text-center" : ""}>
          {hero.rating && (
            <p className={cx("mb-5 flex items-center gap-2 text-sm", center && "justify-center")}>
              <Stars /> <span className="font-semibold">5 stars</span> <span className="text-muted">across 2,800+ happy users</span>
            </p>
          )}
          {hero.eyebrow && <Badge className="mb-5">{hero.eyebrow}</Badge>}
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            {hero.title}
            {hero.highlight && (
              <>
                {" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${accent}, #7dd3fc)` }}>{hero.highlight}</span>
              </>
            )}
          </h1>
          <p className={cx("mt-6 text-lg leading-relaxed text-muted", center ? "mx-auto max-w-2xl" : "max-w-xl")}>{hero.subtitle}</p>
          <div className={cx("mt-9 flex flex-wrap items-center gap-3", center && "justify-center")}>
            {hero.stores ? (
              <StoreButtons />
            ) : (
              <>
                <ButtonLink href={hero.primary.href} size="lg">{hero.primary.label} <FiArrowRight /></ButtonLink>
                {hero.secondary && <ButtonLink href={hero.secondary.href} variant="secondary" size="lg">{hero.secondary.label}</ButtonLink>}
                {hero.video && (
                  <button type="button" onClick={() => setVideo(true)} className="flex items-center gap-2 px-3 text-sm font-semibold text-fg/80 hover:text-fg">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong"><FiPlay /></span> Watch demo
                  </button>
                )}
              </>
            )}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className={center ? "mx-auto w-full max-w-4xl" : ""}>
          <Visual kind={hero.visual} accent={accent} />
        </motion.div>
      </Container>
      <Modal open={video} onClose={() => setVideo(false)} title="Product tour" wide>
        <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 text-center text-slate-300">
          <div>
            <FiPlay className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-3 text-sm">Drop your product video here (YouTube, Vimeo or an MP4).</p>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export function StoreButtons() {
  return (
    <>
      <a href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl bg-white px-5 py-2.5 text-slate-900 transition hover:bg-slate-100">
        <FaApple className="h-6 w-6" /><span className="text-left leading-tight"><span className="block text-[10px]">Download on the</span><span className="font-semibold">App Store</span></span>
      </a>
      <a href="https://play.google.com/store" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl bg-white px-5 py-2.5 text-slate-900 transition hover:bg-slate-100">
        <FaGooglePlay className="h-5 w-5" /><span className="text-left leading-tight"><span className="block text-[10px]">Get it on</span><span className="font-semibold">Google Play</span></span>
      </a>
    </>
  );
}

/* ---------------- Blocks ---------------- */
const logoNames = ["Northwind", "Globex", "Initech", "Umbrella", "Hooli", "Vandelay", "Stark", "Wayne"];

function Logos({ title }: { title?: string }) {
  return (
    <section className="py-12">
      <Container>
        <p className="mb-8 text-center text-sm text-muted">{title ?? "Trusted by fast-moving teams at"}</p>
        <div className="fade-x overflow-hidden">
          <div className="marquee gap-14" style={{ ["--duration" as string]: "35s" }}>
            {[...logoNames, ...logoNames].map((n, i) => (
              <span key={i} className="flex shrink-0 items-center gap-2 text-xl font-bold text-fg/40">
                <span className="h-6 w-6 rounded-lg bg-fg/20" style={{ borderRadius: i % 3 ? 999 : 8 }} />{n}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Features({ b }: { b: Extract<Block, { type: "features" }> }) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[b.cols ?? 3];
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow={b.eyebrow} title={b.title} subtitle={b.subtitle} />
        <div className={cx("grid gap-5", cols)}>
          {b.items.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <Card className="group h-full transition hover:-translate-y-1 hover:border-primary/40">
                <IconBubble><f.icon /></IconBubble>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Split({ b, accent }: { b: Extract<Block, { type: "split" }>; accent: string }) {
  return (
    <Section>
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal className={b.reverse ? "lg:order-2" : ""}>
          <SectionHeader eyebrow={b.eyebrow} title={b.title} subtitle={b.desc} center={false} className="mb-6" />
          {b.bullets && (
            <ul className="space-y-3">
              {b.bullets.map((x) => (
                <li key={x} className="flex items-start gap-3"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"><FiCheck className="h-3 w-3" /></span><span className="text-fg/85">{x}</span></li>
              ))}
            </ul>
          )}
          {b.cta && <ButtonLink href={b.cta.href} className="mt-8">{b.cta.label} <FiArrowRight /></ButtonLink>}
        </Reveal>
        <Reveal delay={0.1}><Visual kind={b.visual} accent={accent} /></Reveal>
      </Container>
    </Section>
  );
}

function Steps({ b }: { b: Extract<Block, { type: "steps" }> }) {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow={b.eyebrow} title={b.title} subtitle={b.subtitle} />
        <div className={cx("relative grid gap-6", b.items.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3")}>
          <span className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block" aria-hidden />
          {b.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="relative text-center">
              <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-bg text-lg font-bold text-primary">{i + 1}</span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Stats({ b }: { b: Extract<Block, { type: "stats" }> }) {
  return (
    <Section className="py-16">
      <Container>
        {b.title && <h2 className="mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl">{b.title}</h2>}
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-line bg-card/50 p-6 sm:p-10 lg:grid-cols-4">
          {b.items.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-primary sm:text-5xl"><CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} /></p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function Testimonials({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {seed.testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05} className="break-inside-avoid">
              <Card className={cx(i === 1 && "border-primary/40 bg-primary/10")}>
                <Stars n={t.rating} />
                <p className="mt-4 leading-relaxed text-fg/90">“{t.quote}”</p>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar name={t.name} />
                  <div><p className="text-sm font-semibold">{t.name}</p><p className="text-xs text-muted">{t.role}</p></div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function PricingCards({ compact = false }: { compact?: boolean }) {
  const [annual, setAnnual] = useState(false);
  return (
    <div>
      <div className="mb-10 flex justify-center">
        <div role="radiogroup" aria-label="Billing period" className="inline-flex rounded-full border border-line bg-surface/60 p-1">
          {[false, true].map((a) => (
            <button key={String(a)} type="button" role="radio" aria-checked={annual === a} onClick={() => setAnnual(a)}
              className={cx("rounded-full px-5 py-2 text-sm font-semibold transition", annual === a ? "bg-primary text-white" : "text-fg/70 hover:text-fg")}>
              {a ? <>Annually <span className={cx("ml-1 rounded-full px-1.5 py-0.5 text-[10px]", annual ? "bg-white/20" : "bg-emerald-500/15 text-emerald-500")}>-10%</span></> : "Monthly"}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {seed.plans.map((p) => {
          const price = annual ? Math.round(p.monthly * 0.9) : p.monthly;
          const popular = "popular" in p && p.popular;
          return (
            <div key={p.id} className={cx("relative flex flex-col rounded-3xl border p-8", popular ? "border-primary bg-gradient-to-b from-primary/15 to-card/40 shadow-[0_20px_60px_-20px] shadow-primary/40" : "border-line bg-card/50")}>
              {popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white"><FiStar /> Most popular</Badge>}
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="mt-2 min-h-10 text-sm text-muted">{p.desc}</p>
              <p className="mt-6 flex items-end gap-1">
                <span className="text-5xl font-bold tracking-tight">
                  <motion.span key={price} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>${price}</motion.span>
                </span>
                <span className="mb-1.5 text-sm text-muted">/month</span>
              </p>
              <p className="mt-1 h-4 text-xs text-muted">{annual && p.monthly > 0 ? `Billed $${price * 12} yearly` : ""}</p>
              <ButtonLink href={p.id === "enterprise" ? "/company/contact" : `/auth/signup?plan=${p.id}`} variant={popular ? "primary" : "secondary"} className="mt-6 w-full">
                {p.id === "enterprise" ? "Contact sales" : "Get Started"}
              </ButtonLink>
              {!compact && (
                <ul className="mt-8 space-y-3 text-sm">
                  {p.features.map((f) => <li key={f} className="flex gap-3"><FiCheck className="mt-0.5 shrink-0 text-primary" />{f}</li>)}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Pricing({ b }: { b: Extract<Block, { type: "pricing" }> }) {
  return (
    <Section id="pricing">
      <Container>
        <SectionHeader eyebrow={b.eyebrow} title={b.title} subtitle={b.subtitle} />
        <PricingCards />
      </Container>
    </Section>
  );
}

function Faq({ b }: { b: Extract<Block, { type: "faq" }> }) {
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeader eyebrow={b.eyebrow ?? "FAQ"} title={b.title} subtitle="Can't find what you're looking for?" center={false} className="mb-4" />
          <Link href="/company/faqs" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Visit the help center <FiArrowRight /></Link>
        </div>
        <Accordion items={b.items} defaultOpen={[0]} />
      </Container>
    </Section>
  );
}

function CtaBlock({ b, accent }: { b: Extract<Block, { type: "cta" }>; accent: string }) {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-line px-6 py-16 text-center sm:px-16" style={{ background: `radial-gradient(80% 120% at 50% 0%, ${accent}40, transparent 70%)` }}>
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" aria-hidden />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">{b.title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{b.desc}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {b.stores ? <StoreButtons /> : b.newsletter ? (
                <div className="w-full max-w-md"><EmailCapture source="landing-cta" cta="Get early access" /></div>
              ) : (
                <>
                  <ButtonLink href={b.primary.href} size="lg">{b.primary.label}</ButtonLink>
                  {b.secondary && <ButtonLink href={b.secondary.href} variant="secondary" size="lg">{b.secondary.label}</ButtonLink>}
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function Team({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {seed.team.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.04}>
              <div className="group rounded-3xl border border-line bg-card/50 p-5 text-center transition hover:border-primary/40">
                <Avatar name={m.name} size={88} className="mx-auto transition group-hover:scale-105" />
                <p className="mt-4 font-semibold">{m.name}</p>
                <p className="text-sm text-muted">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function TabsBlock({ b, accent }: { b: Extract<Block, { type: "tabs" }>; accent: string }) {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow={b.eyebrow} title={b.title} subtitle={b.subtitle} />
        <div className="flex justify-center">
          <Tabs
            className="w-full text-center"
            tabs={b.tabs.map((t) => ({
              label: t.label,
              content: (
                <div className="grid items-center gap-10 text-left lg:grid-cols-2">
                  <div>
                    <h3 className="text-2xl font-bold sm:text-3xl">{t.title}</h3>
                    <p className="mt-3 text-muted">{t.desc}</p>
                    <ul className="mt-6 space-y-3">{t.bullets.map((x) => <li key={x} className="flex gap-3"><FiCheck className="mt-1 shrink-0 text-primary" />{x}</li>)}</ul>
                  </div>
                  <Visual kind={t.visual} accent={accent} />
                </div>
              ),
            }))}
          />
        </div>
      </Container>
    </Section>
  );
}

function Widget({ b, accent }: { b: Extract<Block, { type: "widget" }>; accent: string }) {
  const map: Record<typeof b.widget, ReactNode> = {
    chat: <ChatDemo accent={accent} />,
    swap: <SwapWidget />,
    send: <SendMoney />,
    ticker: <CryptoTicker />,
    contact: <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-card/50 p-6 sm:p-10"><ContactForm source="personal" withSubject={false} cta="Submit" /></div>,
  };
  return (
    <Section id={b.widget}>
      <Container>
        <SectionHeader eyebrow={b.eyebrow} title={b.title} subtitle={b.subtitle} />
        {map[b.widget]}
      </Container>
    </Section>
  );
}

function Projects({ b }: { b: Extract<Block, { type: "projects" }> }) {
  const [filter, setFilter] = useState("All");
  const tags = ["All", ...Array.from(new Set(b.items.map((p) => p.tag)))];
  const shown = b.items.filter((p) => filter === "All" || p.tag === filter);
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow={b.eyebrow} title={b.title} />
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {tags.map((t) => (
            <button key={t} type="button" onClick={() => setFilter(t)} aria-pressed={filter === t}
              className={cx("rounded-full border px-4 py-1.5 text-sm transition", filter === t ? "border-primary bg-primary text-white" : "border-line-strong hover:border-primary")}>{t}</button>
          ))}
        </div>
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {shown.map((p) => (
            <motion.article layout key={p.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group overflow-hidden rounded-3xl border border-line bg-card/50">
              <div className="aspect-[16/9] p-6" style={{ background: `linear-gradient(135deg, ${p.accent}55, transparent)` }}>
                <div className="h-full rounded-2xl border border-white/10 bg-[#0d1426]/80 p-4 transition duration-500 group-hover:scale-[1.03]">
                  <div className="mb-3 flex gap-1.5">{["#f87171", "#fbbf24", "#34d399"].map((c) => <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}</div>
                  <div className="grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <span key={i} className="h-12 rounded-lg bg-white/5" />)}</div>
                  <span className="mt-3 block h-16 rounded-lg" style={{ background: `${p.accent}33` }} />
                </div>
              </div>
              <div className="p-6">
                <Badge tone="neutral">{p.tag}</Badge>
                <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

const stackGroups: { name: string; icons: [IconType, string][] }[] = [
  { name: "Frontend", icons: [[SiReact, "React"], [SiNextdotjs, "Next.js"], [SiTypescript, "TypeScript"], [SiTailwindcss, "Tailwind"]] },
  { name: "Backend", icons: [[SiNodedotjs, "Node.js"], [SiPython, "Python"], [SiGraphql, "GraphQL"], [SiStripe, "Stripe"]] },
  { name: "Database", icons: [[SiPostgresql, "Postgres"], [SiMongodb, "MongoDB"], [SiRedis, "Redis"], [SiNotion, "Notion"]] },
  { name: "Infrastructure", icons: [[SiDocker, "Docker"], [SiKubernetes, "Kubernetes"], [SiCloudflare, "Cloudflare"], [SiVercel, "Vercel"]] },
];
const integrationIcons: [IconType, string][] = [[SiGithub, "GitHub"], [FaSlack, "Slack"], [SiStripe, "Stripe"], [SiNotion, "Notion"], [SiFigma, "Figma"], [SiZapier, "Zapier"], [SiShopify, "Shopify"], [SiVercel, "Vercel"]];

function Stack({ b }: { b: Extract<Block, { type: "stack" }> }) {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow={b.eyebrow} title={b.title} subtitle={b.subtitle} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((g) => (
            <Card key={g.name}>
              <h3 className="font-semibold">{g.name}</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {g.icons.map(([I, n]) => (
                  <span key={n} className="flex items-center gap-2 rounded-xl border border-line bg-bg/40 px-3 py-2 text-sm"><I className="text-primary" />{n}</span>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {integrationIcons.map(([I, n]) => <span key={n} title={n} className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-card/60 text-2xl transition hover:-translate-y-1 hover:text-primary"><I /></span>)}
        </div>
      </Container>
    </Section>
  );
}

export function RenderBlocks({ blocks, accent }: { blocks: Block[]; accent: string }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "logos": return <Logos key={i} title={b.title} />;
          case "features": return <Features key={i} b={b} />;
          case "split": return <Split key={i} b={b} accent={accent} />;
          case "steps": return <Steps key={i} b={b} />;
          case "stats": return <Stats key={i} b={b} />;
          case "testimonials": return <Testimonials key={i} eyebrow={b.eyebrow} title={b.title} subtitle={b.subtitle} />;
          case "pricing": return <Pricing key={i} b={b} />;
          case "faq": return <Faq key={i} b={b} />;
          case "cta": return <CtaBlock key={i} b={b} accent={accent} />;
          case "team": return <Team key={i} eyebrow={b.eyebrow} title={b.title} subtitle={b.subtitle} />;
          case "tabs": return <TabsBlock key={i} b={b} accent={accent} />;
          case "widget": return <Widget key={i} b={b} accent={accent} />;
          case "projects": return <Projects key={i} b={b} />;
          case "stack": return <Stack key={i} b={b} />;
        }
      })}
    </>
  );
}

export function LandingPage({ config }: { config: LandingConfig }) {
  return (
    <>
      <LandingHero hero={config.hero} accent={config.accent} />
      <RenderBlocks blocks={config.blocks} accent={config.accent} />
    </>
  );
}
