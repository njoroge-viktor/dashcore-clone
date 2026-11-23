"use client";

import { useEffect, useState } from "react";
import { FiCopy, FiDownload, FiKey, FiPlus, FiSend, FiTrash2, FiX, FiAlertTriangle, FiCheck, FiCreditCard } from "react-icons/fi";
import { Avatar, Badge, Button, cx } from "../ui";
import { Field, Modal, Toggle, emailOk, inputClass, useCopy, useToast } from "../interactive";
import { PageTitle, Panel } from "./Shell";
import { useCollection, uid } from "@/lib/db";
import { useSession } from "@/lib/auth";

const ROLES = ["Owner", "Admin", "Editor", "Viewer"] as const;
const selectClass = "rounded-lg border border-line-strong bg-surface px-2 py-1.5 text-sm";

/* ================= Team / access ================= */
export function TeamPage() {
  const members = useCollection("teamMembers");
  const invites = useCollection("invitations");
  const billing = useCollection("billing");
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("Editor");
  const [err, setErr] = useState("");
  const [confirm, setConfirm] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const seats = members.rows.length + invites.rows.length;
  const limit = billing.rows[0]?.usage.seatsLimit ?? 10;
  const shown = members.rows.filter((m) => (m.name + m.email + m.role).toLowerCase().includes(query.toLowerCase()));
  const target = members.rows.find((m) => m.id === confirm);

  const invite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOk(email)) return setErr("Enter a valid email address.");
    const all = [...members.rows.map((m) => m.email), ...invites.rows.map((i) => i.email)].map((x) => x.toLowerCase());
    if (all.includes(email.toLowerCase())) return setErr("That person is already a member or invited.");
    if (seats >= limit) return setErr(`Your plan allows ${limit} seats. Upgrade in Billing to invite more.`);
    invites.create({ id: uid("i"), email: email.trim(), role, sentAt: new Date().toISOString().slice(0, 10) });
    toast({ tone: "success", title: "Invitation sent", desc: email });
    setEmail("");
    setErr("");
  };

  return (
    <>
      <PageTitle title="Access Control" desc="Manage who can access this workspace and what they can do." />
      <div className="space-y-6">
        <Panel title="Team Members" desc={`${members.rows.length} members`} action={<input type="search" placeholder="Search members…" aria-label="Search members" value={query} onChange={(e) => setQuery(e.target.value)} className={cx(inputClass, "w-56 py-2")} />}>
          <div className="divide-y divide-line">
            {shown.map((m) => (
              <div key={m.id} className="flex flex-wrap items-center gap-3 py-3">
                <Avatar name={m.name} />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{m.name}</p><p className="truncate text-xs text-muted">{m.email} · {m.lastActive}</p></div>
                {m.role === "Owner" ? <Badge>Owner</Badge> : (
                  <select aria-label={`Role for ${m.name}`} value={m.role} onChange={(e) => { members.update(m.id, { role: e.target.value }); toast({ tone: "success", title: "Role updated", desc: `${m.name} is now ${e.target.value}` }); }} className={selectClass}>
                    {ROLES.filter((r) => r !== "Owner").map((r) => <option key={r}>{r}</option>)}
                  </select>
                )}
                <button type="button" disabled={m.role === "Owner"} onClick={() => setConfirm(m.id)} aria-label={`Remove ${m.name}`} className="rounded-lg p-2 text-muted hover:bg-rose-500/10 hover:text-rose-500 disabled:invisible"><FiTrash2 /></button>
              </div>
            ))}
            {!shown.length && <p className="py-6 text-center text-sm text-muted">No members match “{query}”.</p>}
          </div>
        </Panel>

        <div className="grid gap-6 xl:grid-cols-2">
          <Panel title="Invite Member" desc="They'll get an email with a link to join.">
            <form onSubmit={invite} noValidate className="space-y-3">
              <Field label="Email" htmlFor="inv-email" error={err}>
                <input id="inv-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="colleague@company.com" aria-invalid={!!err} className={inputClass} />
              </Field>
              <div className="flex gap-3">
                <select aria-label="Role" value={role} onChange={(e) => setRole(e.target.value)} className={cx(selectClass, "py-2.5")}>{ROLES.filter((r) => r !== "Owner").map((r) => <option key={r}>{r}</option>)}</select>
                <Button type="submit" className="flex-1"><FiSend /> Send invite</Button>
              </div>
            </form>
          </Panel>
          <Panel title="Plan Limits" desc="Seats include pending invitations.">
            <p className="text-3xl font-bold">{seats}<span className="text-base font-normal text-muted"> / {limit} seats</span></p>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-fg/10"><div className={cx("h-full rounded-full transition-all", seats / limit > 0.85 ? "bg-amber-500" : "bg-primary")} style={{ width: `${Math.min(100, (seats / limit) * 100)}%` }} /></div>
            <p className="mt-3 text-sm text-muted">{limit - seats > 0 ? `${limit - seats} seats available.` : "No seats left — upgrade to add more."}</p>
          </Panel>
        </div>

        <Panel title="Pending Invitations" desc={invites.rows.length ? undefined : "No pending invitations."}>
          <div className="divide-y divide-line">
            {invites.rows.map((i) => (
              <div key={i.id} className="flex flex-wrap items-center gap-3 py-3 text-sm">
                <span className="min-w-0 flex-1 truncate font-medium">{i.email}</span>
                <Badge tone="neutral">{i.role}</Badge>
                <span className="text-xs text-muted">Sent {i.sentAt}</span>
                <Button size="sm" variant="secondary" onClick={() => { invites.update(i.id, { sentAt: new Date().toISOString().slice(0, 10) }); toast({ tone: "success", title: "Invitation resent", desc: i.email }); }}>Resend</Button>
                <Button size="sm" variant="ghost" onClick={() => { invites.remove(i.id); toast({ tone: "info", title: "Invitation revoked" }); }}><FiX /> Revoke</Button>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Modal open={!!target} onClose={() => setConfirm(null)} title="Remove member?">
        <p className="text-sm text-muted">{target?.name} will lose access to this workspace immediately.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setConfirm(null)}>Cancel</Button>
          <Button className="bg-rose-500 shadow-none hover:bg-rose-600" onClick={() => { if (target) { members.remove(target.id); toast({ tone: "success", title: "Member removed", desc: target.name }); } setConfirm(null); }}>Remove</Button>
        </div>
      </Modal>
    </>
  );
}

/* ================= Profile ================= */
export function ProfilePage() {
  const profile = useCollection("profile");
  const { session } = useSession();
  const toast = useToast();
  const p = profile.rows[0];
  const [f, setF] = useState(p);
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => setF(profile.rows[0]), [profile.rows]);
  if (!f) return null;
  const dirty = JSON.stringify(f) !== JSON.stringify(p);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.fullName.trim().length < 2) er.fullName = "Enter your name.";
    if (!emailOk(f.email)) er.email = "Enter a valid email address.";
    setErrors(er);
    if (Object.keys(er).length) return;
    profile.update("me", f);
    toast({ tone: "success", title: "Profile saved" });
  };

  const prefs: [keyof typeof f, string, string][] = [
    ["emailNotifications", "Email notifications", "Activity on your projects and mentions"],
    ["productUpdates", "Product updates", "New features and improvements"],
    ["weeklyDigest", "Weekly digest", "A summary of your workspace every Monday"],
    ["marketingEmails", "Marketing emails", "Tips, offers and event invites"],
  ];

  return (
    <>
      <PageTitle title="Account Settings" desc="Manage your profile and how we contact you." />
      <form onSubmit={save} noValidate className="space-y-6">
        <Panel title="Profile Information">
          <div className="mb-6 flex items-center gap-4">
            <Avatar name={f.fullName || session?.name || "?"} size={64} />
            <div><p className="font-semibold">{f.fullName}</p><p className="text-sm text-muted">{f.role} · {f.company}</p></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" htmlFor="pf-name" error={errors.fullName}><input id="pf-name" value={f.fullName} onChange={set("fullName")} aria-invalid={!!errors.fullName} className={inputClass} /></Field>
            <Field label="Email" htmlFor="pf-email" error={errors.email}><input id="pf-email" type="email" value={f.email} onChange={set("email")} aria-invalid={!!errors.email} className={inputClass} /></Field>
            <Field label="Company" htmlFor="pf-company"><input id="pf-company" value={f.company} onChange={set("company")} className={inputClass} /></Field>
            <Field label="Role" htmlFor="pf-role"><input id="pf-role" value={f.role} onChange={set("role")} className={inputClass} /></Field>
            <Field label="Time zone" htmlFor="pf-tz">
              <select id="pf-tz" value={f.timezone} onChange={set("timezone")} className={inputClass}>
                {["Africa/Nairobi", "Europe/London", "Europe/Berlin", "America/New_York", "America/Los_Angeles", "Asia/Singapore"].map((z) => <option key={z}>{z}</option>)}
              </select>
            </Field>
            <div className="sm:col-span-2"><Field label="Bio" htmlFor="pf-bio" hint={`${f.bio.length}/160`}><textarea id="pf-bio" maxLength={160} rows={3} value={f.bio} onChange={set("bio")} className={inputClass} /></Field></div>
          </div>
        </Panel>
        <Panel title="Preferences">
          <div className="divide-y divide-line">
            {prefs.map(([k, l, d]) => (
              <div key={k} className="flex items-center justify-between gap-4 py-3">
                <div><p className="text-sm font-medium">{l}</p><p className="text-xs text-muted">{d}</p></div>
                <Toggle label={l} checked={Boolean(f[k])} onChange={(v) => setF({ ...f, [k]: v })} />
              </div>
            ))}
          </div>
        </Panel>
        <div className="sticky bottom-4 flex justify-end gap-3">
          <Button variant="secondary" disabled={!dirty} onClick={() => setF(p)}>Discard</Button>
          <Button type="submit" disabled={!dirty}>Save changes</Button>
        </div>
      </form>
    </>
  );
}

/* ================= Billing ================= */
export function BillingPage() {
  const billing = useCollection("billing");
  const invoices = useCollection("invoices");
  const plans = useCollection("plans");
  const toast = useToast();
  const b = billing.rows[0];
  const [contact, setContact] = useState({ contactName: b.contactName, contactEmail: b.contactEmail, taxId: b.taxId });
  const [pick, setPick] = useState<string | null>(null);
  const [cardOpen, setCardOpen] = useState(false);
  const [card, setCard] = useState({ number: "", exp: "", cvc: "" });
  const [cardErr, setCardErr] = useState("");
  useEffect(() => setContact({ contactName: b.contactName, contactEmail: b.contactEmail, taxId: b.taxId }), [b.contactName, b.contactEmail, b.taxId]);

  const plan = plans.rows.find((p) => p.id === b.planId)!;
  const price = b.cycle === "annual" ? Math.round(plan.monthly * 0.9) : plan.monthly;
  const u = b.usage;
  const meters: [string, number, number, (n: number) => string][] = [
    ["Projects", u.projects, u.projectsLimit, String],
    ["Seats", u.seats, u.seatsLimit, String],
    ["API calls", u.apiCalls, u.apiCallsLimit, (n) => n.toLocaleString()],
    ["Storage", u.storageGb, u.storageLimitGb, (n) => `${n} GB`],
  ];

  const changePlan = (id: string) => {
    const np = plans.rows.find((p) => p.id === id)!;
    billing.update("account", { planId: id, usage: { ...u, projectsLimit: np.limits.projects, seatsLimit: np.limits.seats, apiCallsLimit: np.limits.apiCalls, storageLimitGb: np.limits.storageGb } });
    toast({ tone: "success", title: `Switched to ${np.name}`, desc: "Your new limits apply immediately." });
    setPick(null);
  };

  const download = (id: string, amount: number, date: string) => {
    const text = `INVOICE ${id}\nDate: ${date}\nBill to: ${b.contactName} <${b.contactEmail}>\nPlan: ${plan.name}\nAmount: $${amount.toFixed(2)}\nStatus: Paid\n`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageTitle title="Billing" desc="Manage your plan, usage, payment method and invoices." />
      <div className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-2">
          <Panel title="Current Plan" action={<Badge tone="success">Active</Badge>}>
            <p className="text-2xl font-bold">{plan.name} <span className="text-base font-normal text-muted">· ${price}/month</span></p>
            <p className="mt-1 text-sm text-muted">{plan.monthly ? `Renews on ${b.renewsOn}` : "Free forever"}</p>
            <div className="mt-4 inline-flex rounded-full border border-line p-1" role="radiogroup" aria-label="Billing cycle">
              {(["monthly", "annual"] as const).map((c) => (
                <button key={c} type="button" role="radio" aria-checked={b.cycle === c} onClick={() => { billing.update("account", { cycle: c }); toast({ tone: "success", title: `Billing cycle: ${c}` }); }}
                  className={cx("rounded-full px-4 py-1.5 text-xs font-semibold capitalize", b.cycle === c ? "bg-primary text-white" : "text-fg/70")}>{c}{c === "annual" && " (-10%)"}</button>
              ))}
            </div>
            <div className="mt-5 flex gap-3"><Button onClick={() => setPick(plan.id)}>Change plan</Button></div>
          </Panel>
          <Panel title="Payment method" action={<Button size="sm" variant="secondary" onClick={() => setCardOpen(true)}>Update</Button>}>
            <div className="flex items-center gap-4 rounded-2xl border border-line p-4">
              <span className="flex h-10 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 text-white"><FiCreditCard /></span>
              <div><p className="font-semibold">{b.card.brand} •••• {b.card.last4}</p><p className="text-xs text-muted">Expires {b.card.exp}</p></div>
            </div>
          </Panel>
        </div>

        <Panel title="Usage Snapshot" desc="Resets at the start of each billing period.">
          <div className="grid gap-5 sm:grid-cols-2">
            {meters.map(([l, v, max, fmt]) => {
              const pct = Math.min(100, (v / max) * 100);
              return (
                <div key={l}>
                  <div className="mb-1.5 flex justify-between text-sm"><span className="font-medium">{l}</span><span className="text-muted">{fmt(v)} / {fmt(max)}</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-fg/10"><div className={cx("h-full rounded-full", pct > 85 ? "bg-amber-500" : "bg-primary")} style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel title="Billing Contact">
          <form noValidate onSubmit={(e) => { e.preventDefault(); if (!emailOk(contact.contactEmail)) return toast({ tone: "error", title: "Enter a valid billing email" }); billing.update("account", contact); toast({ tone: "success", title: "Billing contact saved" }); }} className="grid gap-4 sm:grid-cols-3">
            <Field label="Name" htmlFor="bc-name"><input id="bc-name" value={contact.contactName} onChange={(e) => setContact({ ...contact, contactName: e.target.value })} className={inputClass} /></Field>
            <Field label="Email" htmlFor="bc-email"><input id="bc-email" type="email" value={contact.contactEmail} onChange={(e) => setContact({ ...contact, contactEmail: e.target.value })} className={inputClass} /></Field>
            <Field label="Tax ID" htmlFor="bc-tax"><input id="bc-tax" placeholder="Optional" value={contact.taxId} onChange={(e) => setContact({ ...contact, taxId: e.target.value })} className={inputClass} /></Field>
            <div className="sm:col-span-3"><Button type="submit">Save contact</Button></div>
          </form>
        </Panel>

        <Panel title="Invoices">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted"><tr><th className="pb-3">Invoice</th><th className="pb-3">Date</th><th className="pb-3">Amount</th><th className="pb-3">Status</th><th /></tr></thead>
              <tbody className="divide-y divide-line">
                {invoices.rows.map((i) => (
                  <tr key={i.id}>
                    <td className="py-3 font-mono text-xs">{i.id}</td><td className="py-3">{i.date}</td><td className="py-3">${i.amount.toFixed(2)}</td>
                    <td className="py-3"><Badge tone="success">{i.status}</Badge></td>
                    <td className="py-3 text-right"><button type="button" onClick={() => download(i.id, i.amount, i.date)} className="inline-flex items-center gap-1 text-primary hover:underline"><FiDownload /> Download</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <Modal open={!!pick} onClose={() => setPick(null)} title="Change plan" wide>
        <div className="grid gap-4 sm:grid-cols-3">
          {plans.rows.map((p) => (
            <button key={p.id} type="button" onClick={() => setPick(p.id)} aria-pressed={pick === p.id}
              className={cx("rounded-2xl border p-4 text-left transition", pick === p.id ? "border-primary bg-primary/10" : "border-line hover:border-line-strong")}>
              <p className="font-semibold">{p.name}</p><p className="text-2xl font-bold">${p.monthly}<span className="text-xs font-normal text-muted">/mo</span></p>
              <p className="mt-2 text-xs text-muted">{p.limits.seats >= 999 ? "Unlimited" : p.limits.seats} seats · {p.limits.projects >= 999 ? "Unlimited" : p.limits.projects} projects</p>
              {p.id === b.planId && <Badge className="mt-3">Current</Badge>}
            </button>
          ))}
        </div>
        {pick && pick !== b.planId && members(pick, plans.rows, u.seats) && (
          <p className="mt-4 flex items-center gap-2 rounded-xl bg-amber-500/10 p-3 text-sm text-amber-500"><FiAlertTriangle /> You have {u.seats} seats in use; this plan allows fewer.</p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setPick(null)}>Cancel</Button>
          <Button disabled={!pick || pick === b.planId} onClick={() => pick && changePlan(pick)}>Confirm change</Button>
        </div>
      </Modal>

      <Modal open={cardOpen} onClose={() => setCardOpen(false)} title="Update payment method">
        <form noValidate className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          const digits = card.number.replace(/\s/g, "");
          if (!/^\d{16}$/.test(digits)) return setCardErr("Card number must be 16 digits.");
          if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.exp)) return setCardErr("Expiry must be MM/YY.");
          if (!/^\d{3,4}$/.test(card.cvc)) return setCardErr("CVC must be 3–4 digits.");
          billing.update("account", { card: { brand: digits.startsWith("4") ? "Visa" : digits.startsWith("5") ? "Mastercard" : "Card", last4: digits.slice(-4), exp: card.exp } });
          toast({ tone: "success", title: "Payment method updated" });
          setCard({ number: "", exp: "", cvc: "" }); setCardErr(""); setCardOpen(false);
        }}>
          <p className="rounded-xl bg-primary/10 p-3 text-xs">Demo only — use a test number like 4242 4242 4242 4242. Nothing is charged.</p>
          <Field label="Card number" htmlFor="cc-num"><input id="cc-num" inputMode="numeric" placeholder="4242 4242 4242 4242" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value.replace(/[^\d]/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim() })} className={inputClass} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expiry" htmlFor="cc-exp"><input id="cc-exp" placeholder="MM/YY" value={card.exp} onChange={(e) => { const v = e.target.value.replace(/[^\d]/g, "").slice(0, 4); setCard({ ...card, exp: v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v }); }} className={inputClass} /></Field>
            <Field label="CVC" htmlFor="cc-cvc"><input id="cc-cvc" inputMode="numeric" placeholder="123" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/[^\d]/g, "").slice(0, 4) })} className={inputClass} /></Field>
          </div>
          {cardErr && <p className="text-sm text-rose-500" role="alert">{cardErr}</p>}
          <Button type="submit" className="w-full">Save card</Button>
        </form>
      </Modal>
    </>
  );
}
function members(planId: string, plans: { id: string; limits: { seats: number } }[], seats: number) {
  return (plans.find((p) => p.id === planId)?.limits.seats ?? 999) < seats;
}

/* ================= API keys ================= */
export function ApiKeysPage() {
  const keys = useCollection("apiKeys");
  const hooks = useCollection("webhooks");
  const toast = useToast();
  const copy = useCopy();
  const [tab, setTab] = useState<"keys" | "hooks">("keys");
  const [name, setName] = useState("");
  const [env, setEnv] = useState("development");
  const [created, setCreated] = useState<string | null>(null);
  const [revoke, setRevoke] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [events, setEvents] = useState<string[]>(["invoice.paid"]);
  const allEvents = ["invoice.paid", "subscription.updated", "member.invited", "project.deployed"];
  const target = keys.rows.find((k) => k.id === revoke);

  const createKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 3) return toast({ tone: "error", title: "Give the key a name (3+ characters)" });
    const secret = `cv_${env === "production" ? "live" : "test"}_${Array.from(crypto.getRandomValues(new Uint8Array(18))).map((b) => b.toString(16).padStart(2, "0")).join("")}`;
    keys.create({ id: uid("k"), name: name.trim(), env, prefix: secret.slice(0, 12), createdAt: new Date().toISOString().slice(0, 10), status: "active" });
    setCreated(secret);
    setName("");
  };

  return (
    <>
      <PageTitle title="Developer Settings" desc="Manage your API keys, webhooks, and developer integrations." />
      <div role="tablist" className="mb-6 flex gap-6 border-b border-line">
        {([["keys", "API Keys"], ["hooks", "Webhooks"]] as const).map(([id, l]) => (
          <button key={id} role="tab" type="button" aria-selected={tab === id} onClick={() => setTab(id)} className={cx("-mb-px border-b-2 pb-3 text-sm font-semibold", tab === id ? "border-primary text-primary" : "border-transparent text-muted hover:text-fg")}>{l}</button>
        ))}
      </div>

      {tab === "keys" ? (
        <div className="space-y-6">
          <Panel title="Active API Keys" desc="Keys grant access to your account data. Keep them secret.">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="text-left text-xs uppercase tracking-wider text-muted"><tr><th className="pb-3">Key name</th><th className="pb-3">Key</th><th className="pb-3">Created</th><th className="pb-3">Status</th><th /></tr></thead>
                <tbody className="divide-y divide-line">
                  {keys.rows.map((k) => (
                    <tr key={k.id} className={k.status === "revoked" ? "opacity-60" : ""}>
                      <td className="py-3"><p className="font-semibold">{k.name}</p><Badge tone={k.env === "production" ? "primary" : "warning"} className="mt-1">{k.env}</Badge></td>
                      <td className="py-3 font-mono text-xs">{k.prefix}••••••••</td>
                      <td className="py-3">{k.createdAt}</td>
                      <td className="py-3"><Badge tone={k.status === "active" ? "success" : "neutral"}>{k.status}</Badge></td>
                      <td className="py-3 text-right">
                        <button type="button" onClick={() => copy(`${k.prefix}…`, "Key prefix copied")} aria-label={`Copy ${k.name} prefix`} className="rounded-lg p-2 text-primary hover:bg-primary/10"><FiCopy /></button>
                        {k.status === "active" && <button type="button" onClick={() => setRevoke(k.id)} aria-label={`Revoke ${k.name}`} className="rounded-lg p-2 text-muted hover:bg-rose-500/10 hover:text-rose-500"><FiTrash2 /></button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
          <div className="grid gap-6 xl:grid-cols-2">
            <Panel title="Create New API Key">
              <form onSubmit={createKey} className="space-y-3">
                <Field label="Key name" htmlFor="key-name"><input id="key-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Production Mobile App" className={inputClass} /></Field>
                <div className="flex gap-3">
                  <select aria-label="Environment" value={env} onChange={(e) => setEnv(e.target.value)} className={cx(selectClass, "py-2.5")}><option value="development">Development</option><option value="production">Production</option></select>
                  <Button type="submit" className="flex-1"><FiKey /> Generate key</Button>
                </div>
              </form>
            </Panel>
            <Panel title="Security Best Practices">
              <ul className="space-y-2 text-sm text-muted">
                {["Never commit keys to source control", "Use separate keys per environment", "Rotate production keys every 90 days", "Revoke keys you no longer use"].map((t) => <li key={t} className="flex gap-2"><FiCheck className="mt-0.5 text-primary" />{t}</li>)}
              </ul>
            </Panel>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Panel title="Endpoints" desc="We sign every request with an HMAC header.">
            {hooks.rows.length === 0 && <p className="text-sm text-muted">No endpoints yet.</p>}
            <div className="divide-y divide-line">
              {hooks.rows.map((h) => (
                <div key={h.id} className="flex flex-wrap items-center gap-3 py-3">
                  <div className="min-w-0 flex-1"><p className="truncate font-mono text-sm">{h.url}</p><p className="mt-1 flex flex-wrap gap-1">{h.events.map((e) => <Badge key={e} tone="neutral">{e}</Badge>)}</p></div>
                  <Toggle label={`Enable ${h.url}`} checked={h.active} onChange={(v) => hooks.update(h.id, { active: v })} />
                  <Button size="sm" variant="secondary" onClick={() => toast({ tone: "success", title: "Test event delivered", desc: `200 OK from ${new URL(h.url).host}` })}>Send test</Button>
                  <button type="button" onClick={() => { hooks.remove(h.id); toast({ tone: "info", title: "Endpoint deleted" }); }} aria-label="Delete endpoint" className="rounded-lg p-2 text-muted hover:bg-rose-500/10 hover:text-rose-500"><FiTrash2 /></button>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Add endpoint">
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              try { const u = new URL(url); if (u.protocol !== "https:") throw 0; } catch { return toast({ tone: "error", title: "Enter a valid https:// URL" }); }
              if (!events.length) return toast({ tone: "error", title: "Pick at least one event" });
              hooks.create({ id: uid("w"), url, events, active: true });
              toast({ tone: "success", title: "Endpoint added" });
              setUrl("");
            }}>
              <Field label="Endpoint URL" htmlFor="wh-url"><input id="wh-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/webhooks" className={inputClass} /></Field>
              <fieldset><legend className="mb-2 text-sm font-medium">Events</legend>
                <div className="flex flex-wrap gap-2">
                  {allEvents.map((ev) => {
                    const on = events.includes(ev);
                    return <button key={ev} type="button" aria-pressed={on} onClick={() => setEvents(on ? events.filter((x) => x !== ev) : [...events, ev])} className={cx("rounded-full border px-3 py-1 font-mono text-xs", on ? "border-primary bg-primary/10 text-primary" : "border-line-strong")}>{ev}</button>;
                  })}
                </div>
              </fieldset>
              <Button type="submit"><FiPlus /> Add endpoint</Button>
            </form>
          </Panel>
        </div>
      )}

      <Modal open={!!created} onClose={() => setCreated(null)} title="Your new API key">
        <p className="text-sm text-muted">Copy it now — for security we only show it once.</p>
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-line-strong bg-bg p-3">
          <code className="min-w-0 flex-1 break-all text-xs">{created}</code>
          <Button size="sm" onClick={() => created && copy(created, "API key copied")}><FiCopy /> Copy</Button>
        </div>
        <Button className="mt-6 w-full" variant="secondary" onClick={() => setCreated(null)}>I&apos;ve saved it</Button>
      </Modal>
      <Modal open={!!target} onClose={() => setRevoke(null)} title="Revoke API key?">
        <p className="text-sm text-muted">Requests using <b>{target?.name}</b> will start failing immediately. This can&apos;t be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setRevoke(null)}>Cancel</Button>
          <Button className="bg-rose-500 shadow-none hover:bg-rose-600" onClick={() => { if (target) { keys.update(target.id, { status: "revoked" }); toast({ tone: "success", title: "Key revoked", desc: target.name }); } setRevoke(null); }}>Revoke key</Button>
        </div>
      </Modal>
    </>
  );
}
