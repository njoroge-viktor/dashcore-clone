"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FiActivity, FiArrowRight, FiBookOpen, FiCalendar, FiCheck, FiClock, FiCode, FiCreditCard, FiDatabase, FiGlobe,
  FiHeadphones, FiLayers, FiLayout, FiLifeBuoy, FiLock, FiMail, FiMapPin, FiMinus, FiPenTool, FiPhone, FiSearch,
  FiServer, FiShield, FiTool, FiTrendingUp, FiUser, FiZap, FiPlay, FiX,
} from "react-icons/fi";
import { ButtonLink, Card, Container, IconBubble, PageHero, Section, SectionHeader, Stars, cx } from "../ui";
import { Accordion, CountUp, Modal, inputClass } from "../interactive";
import { PricingCards, RenderBlocks, Team, Testimonials } from "../landing/blocks";
import { ContactForm } from "../landing/widgets";
import Visual from "../landing/Visual";
import Reveal from "../Reveal";
import { BRAND } from "@/lib/data";
import seed from "@/lib/seed";

/* ================= About ================= */
export function AboutPage() {
  const [video, setVideo] = useState(false);
  return (
    <>
      <PageHero eyebrow={`About ${BRAND}`} title="Building the Future of Digital Platforms" subtitle="We give product teams a foundation that's fast, accessible and beautiful by default — so they can focus on what makes them different.">
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/company/contact" size="lg">Work with us</ButtonLink>
          <ButtonLink href="/company/services" variant="secondary" size="lg">Our services</ButtonLink>
        </div>
      </PageHero>
      <RenderBlocks accent="#0ea5e9" blocks={[
        { type: "features", eyebrow: "What we do", title: "A solution for every digital frontier", items: [
          { icon: FiCalendar, title: "Smart Scheduling", desc: "Plan releases and campaigns with confidence." },
          { icon: FiActivity, title: "Deep Analysis", desc: "Understand usage with built-in analytics." },
          { icon: FiShield, title: "Fortified Security", desc: "Security best practices baked in." },
          { icon: FiZap, title: "Lightning Performance", desc: "Core Web Vitals in the green, out of the box." },
          { icon: FiGlobe, title: "Global Scale", desc: "Localized, edge-deployed and multi-region." },
          { icon: FiDatabase, title: "Smart Data Management", desc: "Typed content and predictable state." },
        ] },
      ]} />
      <Section>
        <Container>
          <SectionHeader title={`See ${BRAND} in Action`} />
          <button type="button" onClick={() => setVideo(true)} className="group relative block w-full overflow-hidden rounded-3xl border border-line" aria-label="Play product video">
            <div className="pointer-events-none opacity-90 transition group-hover:scale-[1.01]"><Visual kind="dashboard" accent="#0ea5e9" /></div>
            <span className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl text-white shadow-[0_0_60px] shadow-primary/60 transition group-hover:scale-110"><FiPlay /></span>
            </span>
          </button>
        </Container>
      </Section>
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Built for high-stakes engineering. <span className="text-muted">{BRAND} delivers sub-second page loads, accessible markup and a design system your whole team can trust.</span></h2>
          <div className="grid grid-cols-2 gap-4">
            {[[99, "%", "Lighthouse score"], [50, "+", "Ready-made sections"], [2000, "+", "Teams onboard"], [24, "/7", "Support"]].map(([v, s, l]) => (
              <Card key={l as string} className="text-center"><p className="text-4xl font-bold text-primary"><CountUp to={v as number} suffix={s as string} /></p><p className="mt-2 text-sm text-muted">{l}</p></Card>
            ))}
          </div>
        </Container>
      </Section>
      <Team title="Meet our award-winning team" subtitle="Designers, engineers and operators who love building tools for builders." />
      <RenderBlocks accent="#0ea5e9" blocks={[{ type: "cta", title: "Ready to Transform Your Business?", desc: "Let's build something your customers will love.", primary: { label: "Get started", href: "/auth/signup" }, secondary: { label: "Contact us", href: "/company/contact" } }]} />
      <Modal open={video} onClose={() => setVideo(false)} title="Product tour" wide>
        <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 text-sm text-slate-300">Embed your product video here.</div>
      </Modal>
    </>
  );
}

/* ================= Services ================= */
export function ServicesPage() {
  const services = [
    { icon: FiCode, title: "Web Development", items: ["Next.js & React apps", "Headless CMS", "Performance tuning"] },
    { icon: FiPenTool, title: "Design Services", items: ["Product design", "Design systems", "Brand identity"] },
    { icon: FiTrendingUp, title: "Business Solutions", items: ["CRM & ERP integrations", "Analytics", "Automation"] },
    { icon: FiLayers, title: "Modern Features", items: ["AI assistants", "Payments", "Realtime collaboration"] },
    { icon: FiHeadphones, title: "Consulting & Support", items: ["Architecture reviews", "Team training", "SLAs"] },
  ];
  const [open, setOpen] = useState<string | null>(null);
  const svc = services.find((s) => s.title === open);
  return (
    <>
      <PageHero eyebrow="Services" title="Technology Solutions That Drive Business Growth" subtitle="From strategy to launch and beyond — a senior team that ships." />
      <Section>
        <Container>
          <SectionHeader title="Comprehensive Service Portfolio" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Card key={s.title} className="flex flex-col">
                <IconBubble><s.icon /></IconBubble>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <ul className="mt-3 flex-1 space-y-2 text-sm text-muted">{s.items.map((i) => <li key={i} className="flex gap-2"><FiCheck className="mt-0.5 text-primary" />{i}</li>)}</ul>
                <button type="button" onClick={() => setOpen(s.title)} className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary hover:underline">Request a quote <FiArrowRight /></button>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
      <RenderBlocks accent="#8b5cf6" blocks={[
        { type: "steps", title: "Our Proven Process", items: [
          { title: "Discover", desc: "Workshops to define goals and scope." },
          { title: "Design", desc: "Prototypes validated with real users." },
          { title: "Build", desc: "Weekly releases you can click through." },
          { title: "Grow", desc: "Measure, iterate and support." },
        ] },
        { type: "stack", title: "Technology Stack" },
        { type: "features", cols: 4, title: "Why Choose Our Services", items: [
          { icon: FiUser, title: "Deep Expertise", desc: "Senior engineers and designers only." },
          { icon: FiShield, title: "Quality Assurance", desc: "Automated tests and accessibility audits." },
          { icon: FiZap, title: "Future-Ready Solutions", desc: "Modern stacks that age well." },
          { icon: FiLifeBuoy, title: "Ongoing Support", desc: "SLAs that match your business." },
        ] },
      ]} />
      <Section>
        <Container className="grid gap-10 rounded-[2rem] border border-line bg-card/40 p-6 sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Transform Your Business?</h2>
            <p className="mt-4 text-muted">Tell us about your project and we&apos;ll come back with a plan and estimate within two business days.</p>
            <h3 className="mt-8 font-semibold">Get in Touch</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted"><li className="flex items-center gap-2"><FiMail className="text-primary" /> hello@corevia.dev</li><li className="flex items-center gap-2"><FiPhone className="text-primary" /> +1 (555) 012-3456</li></ul>
          </div>
          <ContactForm source="services" />
        </Container>
      </Section>
      <Modal open={!!open} onClose={() => setOpen(null)} title={`Request a quote — ${svc?.title ?? ""}`} wide>
        <ContactForm source={`quote:${svc?.title ?? ""}`} cta="Request quote" />
      </Modal>
    </>
  );
}

/* ================= Pricing ================= */
export function PricingPage() {
  const rows: { group: string; items: [string, string | boolean, string | boolean, string | boolean][] }[] = [
    { group: "Platform", items: [["Active projects", "3", "Unlimited", "Unlimited"], ["Team seats", "2", "10", "Unlimited"], ["Custom domains", true, true, true], ["Environments", "1", "5", "Unlimited"]] },
    { group: "Analytics", items: [["Basic analytics", true, true, true], ["Team insights", false, true, true], ["Data export", false, true, true]] },
    { group: "Security", items: [["Role-based permissions", false, true, true], ["Audit log", false, true, true], ["SSO / SAML", false, false, true]] },
    { group: "Support", items: [["Email support", true, true, true], ["Priority chat", false, true, true], ["Dedicated manager", false, false, true]] },
  ];
  const cell = (v: string | boolean) => (typeof v === "string" ? v : v ? <FiCheck className="mx-auto text-primary" aria-label="Included" /> : <FiMinus className="mx-auto text-muted/50" aria-label="Not included" />);
  return (
    <>
      <PageHero eyebrow="Pricing" title="Simple, Transparent Pricing" subtitle="Choose the perfect plan for your business. No hidden fees, cancel anytime." />
      <Container className="pb-10"><PricingCards /></Container>
      <Section>
        <Container>
          <SectionHeader title="Feature comparison" />
          <div className="overflow-x-auto rounded-3xl border border-line">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-card/60 text-left">
                <tr><th className="p-4 font-semibold">Feature</th>{seed.plans.map((p) => <th key={p.id} className="p-4 text-center font-semibold">{p.name}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((g) => (
                  <FragmentRows key={g.group} group={g.group}>
                    {g.items.map(([f, a, b, c]) => (
                      <tr key={f} className="border-t border-line"><td className="p-4 text-fg/85">{f}</td><td className="p-4 text-center">{cell(a)}</td><td className="p-4 text-center">{cell(b)}</td><td className="p-4 text-center">{cell(c)}</td></tr>
                    ))}
                  </FragmentRows>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
      <RenderBlocks accent="#10b981" blocks={[{ type: "faq", title: "Pricing questions", items: seed.faqs.filter((f) => f.category === "billing").map((f) => ({ q: f.q, a: f.a })) }]} />
    </>
  );
}
function FragmentRows({ group, children }: { group: string; children: React.ReactNode }) {
  return (
    <>
      <tr className="border-t border-line bg-fg/[0.02]"><td colSpan={4} className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">{group}</td></tr>
      {children}
    </>
  );
}

/* ================= Contact ================= */
export function ContactPage() {
  const channels = [
    { icon: FiTrendingUp, title: "Sales", desc: "Plans, pricing and demos.", value: "sales@corevia.dev", href: "mailto:sales@corevia.dev" },
    { icon: FiLifeBuoy, title: "Support", desc: "Help with your account.", value: "support@corevia.dev", href: "mailto:support@corevia.dev" },
    { icon: FiPhone, title: "Phone", desc: "Mon–Fri, 9am–6pm EAT.", value: "+1 (555) 012-3456", href: "tel:+15550123456" },
    { icon: FiMapPin, title: "HQ", desc: "Come say hello.", value: "Westlands, Nairobi", href: "https://maps.google.com/?q=Westlands+Nairobi" },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Get the right team involved from day one" subtitle="Questions about plans, migrations or security? We usually reply within one business day." />
      <Section className="pt-0">
        <Container>
          <SectionHeader title="Choose the fastest way to reach us" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c) => (
              <a key={c.title} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group rounded-3xl border border-line bg-card/50 p-6 transition hover:-translate-y-1 hover:border-primary/40">
                <IconBubble><c.icon /></IconBubble>
                <h3 className="mt-4 font-semibold">{c.title}</h3>
                <p className="text-sm text-muted">{c.desc}</p>
                <p className="mt-3 text-sm font-semibold text-primary group-hover:underline">{c.value}</p>
              </a>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <h2 className="mb-6 text-2xl font-bold">Tell us what you need</h2>
            <ContactForm source="contact" />
          </Card>
          <Card className="h-fit">
            <h3 className="font-semibold">Response details</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3"><FiClock className="mt-0.5 text-primary" /><span><b>Under 24h</b><br /><span className="text-muted">Average first response</span></span></li>
              <li className="flex gap-3"><FiGlobe className="mt-0.5 text-primary" /><span><b>Global coverage</b><br /><span className="text-muted">Teams in 4 time zones</span></span></li>
              <li className="flex gap-3"><FiLock className="mt-0.5 text-primary" /><span><b>Private by default</b><br /><span className="text-muted">Messages are stored only to reply to you</span></span></li>
            </ul>
          </Card>
        </Container>
      </Section>
      <RenderBlocks accent="#f59e0b" blocks={[{ type: "faq", title: "Before you reach out", items: [
        { q: "Need immediate help?", a: "Check the help center — most answers are there, and it's searchable." },
        { q: "Can I book a personalized demo?", a: "Yes, choose Sales in the form above and suggest a time." },
        { q: "Do you provide security and compliance documentation?", a: "Yes, we share our security overview and DPA on request." },
        { q: `Can ${BRAND} help us migrate from existing tools?`, a: "Our services team runs migrations from most popular platforms." },
        { q: "Do you support teams in multiple regions?", a: "Yes, with localized content and multi-region hosting." },
      ] }]} />
    </>
  );
}

/* ================= FAQs ================= */
const categories = [
  { id: "getting-started", label: "Getting Started", icon: FiBookOpen },
  { id: "billing", label: "Billing & Payments", icon: FiCreditCard },
  { id: "technical", label: "Technical Support", icon: FiTool },
  { id: "account", label: "Account Management", icon: FiUser },
  { id: "integrations", label: "Integrations", icon: FiLayers },
  { id: "api", label: "API Documentation", icon: FiServer },
];
export function FaqsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return seed.faqs.filter((f) => (!cat || f.category === cat) && (!s || f.q.toLowerCase().includes(s) || f.a.toLowerCase().includes(s)));
  }, [q, cat]);
  return (
    <>
      <PageHero eyebrow="Help center" title="How can we help you?" subtitle="Search our knowledge base or browse by category.">
        <div className="relative mx-auto mt-8 max-w-xl">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for answers..." aria-label="Search FAQs" className={cx(inputClass, "rounded-full py-4 pl-11 pr-11")} />
          {q && <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-fg"><FiX /></button>}
        </div>
      </PageHero>
      <Section className="pt-0">
        <Container>
          <SectionHeader title="Browse by Category" subtitle="Find answers organized by topic" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const n = seed.faqs.filter((f) => f.category === c.id).length;
              const on = cat === c.id;
              return (
                <button key={c.id} type="button" onClick={() => setCat(on ? null : c.id)} aria-pressed={on}
                  className={cx("flex items-center gap-4 rounded-3xl border p-5 text-left transition hover:-translate-y-0.5", on ? "border-primary bg-primary/10" : "border-line bg-card/50 hover:border-primary/40")}>
                  <IconBubble><c.icon /></IconBubble>
                  <span><span className="block font-semibold">{c.label}</span><span className="text-sm text-muted">{n} articles</span></span>
                </button>
              );
            })}
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <p className="text-sm text-muted" aria-live="polite">{results.length} result{results.length === 1 ? "" : "s"}{cat && <> in <b>{categories.find((c) => c.id === cat)?.label}</b> · <button type="button" className="text-primary hover:underline" onClick={() => setCat(null)}>clear</button></>}</p>
          </div>
          {results.length ? (
            <Accordion key={`${q}-${cat}`} items={results.map((f) => ({ id: f.id, q: f.q, a: f.a }))} />
          ) : (
            <Card className="text-center"><p className="font-semibold">No results for “{q}”</p><p className="mt-1 text-sm text-muted">Try another keyword or contact support.</p></Card>
          )}
        </Container>
      </Section>
      <Section>
        <Container>
          <Card className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div><h2 className="text-2xl font-bold">Still need help?</h2><p className="mt-1 text-muted">Our support team is one message away.</p></div>
            <ButtonLink href="/company/contact" size="lg">Contact support</ButtonLink>
          </Card>
        </Container>
      </Section>
    </>
  );
}

/* ================= Testimonials ================= */
export function TestimonialsPage() {
  return (
    <>
      <PageHero eyebrow="Customer stories" title="Trusted by Teams Building Serious Products" subtitle="Real feedback from founders, designers and engineers.">
        <div className="mt-8 flex items-center justify-center gap-3"><Stars /><span className="font-semibold">4.9/5</span><span className="text-muted">from 2,800+ reviews</span></div>
      </PageHero>
      <Testimonials title="What Teams Say After Switching" />
      <RenderBlocks accent="#ec4899" blocks={[
        { type: "stats", items: [{ value: 2000, suffix: "+", label: "Teams" }, { value: 4.9, decimals: 1, suffix: "★", label: "Average rating" }, { value: 63, suffix: "%", label: "Faster launches" }, { value: 40, suffix: "+", label: "Countries" }] },
        { type: "cta", title: "Ready to Become the Next Success Story?", desc: "Start free and launch your next page this week.", primary: { label: "Get started", href: "/auth/signup" }, secondary: { label: "See pricing", href: "/company/pricing" } },
      ]} />
    </>
  );
}

/* ================= Why ================= */
export function WhyPage() {
  return (
    <>
      <PageHero eyebrow={`Why ${BRAND}`} title={`Why Choose ${BRAND}?`} subtitle="Build anything, scale infinitely — without the usual friction." />
      <RenderBlocks accent="#6366f1" blocks={[
        { type: "features", cols: 2, title: "Build anything, scale infinitely.", items: [
          { icon: FiGlobe, title: "Ready Localization", desc: "English & Spanish included, add more as simple files." },
          { icon: FiLayers, title: "Future-Ready Architecture", desc: "App Router, server components and typed config." },
          { icon: FiLayout, title: "Comprehensive Component Library", desc: "Dozens of sections and primitives that compose." },
          { icon: FiZap, title: "Blazing Fast Performance", desc: "Static by default, tiny client bundles." },
        ] },
        { type: "steps", title: "From idea to scale, without the usual friction.", items: [
          { title: "Getting Started", desc: "Pick a demo, run one command, you're live locally." },
          { title: "Building Features", desc: "Compose sections and primitives; no CSS fights." },
          { title: "Scaling Systems", desc: "Add pages, locales and data sources as you grow." },
        ] },
        { type: "testimonials", title: "Loved by Developers Worldwide" },
        { type: "cta", title: "Ready to Build Something Amazing?", desc: "Everything you need, nothing you don't.", primary: { label: "Get started", href: "/auth/signup" }, secondary: { label: "Browse components", href: "/showcase/buttons" } },
      ]} />
    </>
  );
}

/* ================= Legal ================= */
type LegalSection = { h: string; p: string[]; list?: { title: string; items: string[] } };
export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} subtitle={`Last updated ${updated}`} />
      <Section className="pt-0">
        <Container className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28 space-y-1 text-sm">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">On this page</p>
              {sections.map((s, i) => <a key={s.h} href={`#s${i}`} className="block rounded-lg px-3 py-1.5 text-fg/70 hover:bg-fg/5 hover:text-fg">{s.h}</a>)}
            </div>
          </nav>
          <article className="max-w-3xl space-y-10">
            {sections.map((s, i) => (
              <Reveal key={s.h}>
                <section id={`s${i}`} className="scroll-mt-28">
                  <h2 className="text-2xl font-bold">{s.h}</h2>
                  {s.p.map((p) => <p key={p} className="mt-3 leading-relaxed text-muted">{p}</p>)}
                  {s.list && (
                    <>
                      <h3 className="mt-5 font-semibold">{s.list.title}</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">{s.list.items.map((x) => <li key={x}>{x}</li>)}</ul>
                    </>
                  )}
                </section>
              </Reveal>
            ))}
            <Card className="text-sm text-muted">Questions about this policy? <Link href="/company/contact" className="font-semibold text-primary hover:underline">Contact us</Link>.</Card>
          </article>
        </Container>
      </Section>
    </>
  );
}

const privacySections: LegalSection[] = [
  { h: "1. Overview", p: [`This policy explains how ${BRAND} collects, uses and protects personal data when you use our websites and services.`] },
  { h: "2. Data We Collect", p: ["We collect data you give us and data collected automatically when you use the service."], list: { title: "Information you provide", items: ["Name, email and company when you sign up", "Messages you send through contact forms", "Billing details processed by our payment provider"] } },
  { h: "3. How We Use Personal Data", p: ["To provide and improve the service, respond to requests, send product updates you opted into, and keep the platform secure."] },
  { h: "4. How We Share Data", p: ["We share data only with processors who help us run the service (hosting, email, payments) under contracts that protect your data. We never sell personal data."] },
  { h: "5. Data Retention", p: ["We keep personal data only as long as needed for the purposes above or as required by law."] },
  { h: "6. Your Rights and Choices", p: ["Depending on where you live you may have rights to access, correct, export or delete your data."], list: { title: "You can also:", items: ["Unsubscribe from marketing emails at any time", "Disable non-essential cookies", "Request a copy of your data"] } },
  { h: "7. International Data Transfers", p: ["Where data is transferred internationally we rely on appropriate safeguards such as standard contractual clauses."] },
  { h: "8. Contact and Policy Updates", p: ["We will notify you of material changes. Contact privacy@corevia.dev with any questions."] },
];

const termsSections: LegalSection[] = [
  { h: "1. Acceptance of Terms", p: [`By accessing or using ${BRAND} you agree to these terms. If you use the service for an organization, you accept them on its behalf.`] },
  { h: "2. Account Registration and Security", p: ["You must provide accurate information and keep your credentials secure."], list: { title: "You agree to:", items: ["Keep your password confidential", "Notify us of any unauthorized use", "Be responsible for activity under your account"] } },
  { h: "3. Permitted Use and Restrictions", p: ["Use the service only in compliance with applicable law."], list: { title: "You may not:", items: ["Reverse engineer or resell the service", "Upload malicious code", "Interfere with other customers' use"] } },
  { h: "4. Plans, Billing, and Renewals", p: ["Paid plans renew automatically until cancelled. Fees are non-refundable except where stated in our refund policy."] },
  { h: "5. Intellectual Property", p: ["We retain all rights to the service. You retain all rights to your content."] },
  { h: "6. Suspension and Termination", p: ["We may suspend accounts that violate these terms. You may cancel at any time from your billing settings."] },
  { h: "7. Disclaimers and Liability Limits", p: ["The service is provided “as is”. To the extent permitted by law, our liability is limited."], list: { title: "Maximum liability", items: ["Limited to the fees you paid in the 12 months before the claim"] } },
  { h: "8. Changes to These Terms", p: ["We may update these terms and will notify you of material changes in advance."] },
];

export const PrivacyPage = () => <LegalPage title="Privacy Policy" updated="November 1, 2026" sections={privacySections} />;
export const TermsPage = () => <LegalPage title="Terms of Service" updated="November 1, 2026" sections={termsSections} />;
