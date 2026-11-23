"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiArrowLeft, FiCheckCircle, FiGift, FiHeadphones, FiLayout, FiLock, FiMail, FiShield, FiZap } from "react-icons/fi";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Button, Eyebrow, cx } from "../ui";
import { Field, PasswordInput, emailOk, inputClass, useToast } from "../interactive";
import { login, passwordStrength, signup } from "@/lib/auth";
import { BRAND } from "@/lib/data";
import seed from "@/lib/seed";

function Perks({ title, items }: { title: string; items: { icon: React.ElementType; t: string; d: string }[] }) {
  return (
    <div className="mt-10">
      <h3 className="mb-4 font-semibold">{title}</h3>
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.t} className="flex items-center gap-4 rounded-2xl border border-line bg-card/50 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-teal-400"><i.icon /></span>
            <span><span className="block text-sm font-semibold">{i.t}</span><span className="text-xs text-muted">{i.d}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Social() {
  const toast = useToast();
  const demo = (p: string) => toast({ tone: "info", title: `${p} sign-in`, desc: "Connect an OAuth provider (e.g. Auth.js) to enable this." });
  return (
    <>
      <div className="my-6 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-line" />or<span className="h-px flex-1 bg-line" /></div>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={() => demo("Google")}><FaGoogle className="text-primary" /> Google</Button>
        <Button variant="secondary" onClick={() => demo("GitHub")}><FaGithub /> GitHub</Button>
      </div>
    </>
  );
}

/* ---------------- Login ---------------- */
export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [busy, setBusy] = useState(false);
  const demoUser = seed.users[0];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: typeof errors = {};
    if (!emailOk(email)) er.email = "Please enter a valid email address.";
    if (!password) er.password = "Please enter your password.";
    setErrors(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try {
      await login(email, password, remember);
      toast({ tone: "success", title: "Welcome back!" });
      router.push(params.get("next") || "/workspace/account/profile");
    } catch (err) {
      setErrors({ form: (err as Error).message });
      setBusy(false);
    }
  };

  return (
    <div className="grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
      <div className="hidden lg:block">
        <Eyebrow>Secure access</Eyebrow>
        <h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight">Welcome back</h1>
        <p className="mt-4 text-lg text-muted">Sign in to continue building with {BRAND}.</p>
        <Perks title={`Why choose ${BRAND}?`} items={[
          { icon: FiZap, t: "Lightning fast", d: "Optimized for speed on every device" },
          { icon: FiShield, t: "Secure by default", d: "Hashed credentials and session controls" },
          { icon: FiHeadphones, t: "24/7 Support", d: "We're here whenever you need us" },
        ]} />
      </div>
      <div className="rounded-3xl border border-line bg-surface/70 p-6 shadow-2xl backdrop-blur sm:p-8">
        <h1 className="text-2xl font-bold lg:hidden">Welcome back</h1>
        <p className="mb-6 text-sm text-muted lg:hidden">Sign in to your account</p>
        <div className="mb-6 rounded-2xl border border-primary/30 bg-primary/10 p-3 text-xs">
          <b>Demo account:</b> {demoUser.email} / demo1234{" "}
          <button type="button" className="font-semibold text-primary hover:underline" onClick={() => { setEmail(demoUser.email); setPassword("demo1234"); }}>Fill in</button>
        </div>
        <form noValidate onSubmit={submit} className="space-y-4">
          {errors.form && <p className="rounded-xl bg-rose-500/10 p-3 text-sm text-rose-500" role="alert">{errors.form}</p>}
          <Field label="Email Address" htmlFor="login-email" required error={errors.email}>
            <input id="login-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" aria-invalid={!!errors.email} className={inputClass} />
          </Field>
          <Field label="Password" htmlFor="login-password" required error={errors.password}>
            <PasswordInput id="login-password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" aria-invalid={!!errors.password} />
          </Field>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 accent-[var(--color-primary)]" /> Remember me</label>
            <Link href="/auth/forgot-password" className="font-medium text-primary hover:underline">Forgot your password?</Link>
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={busy}>{busy ? "Signing in…" : "Sign In"}</Button>
        </form>
        <Social />
        <p className="mt-6 text-center text-sm text-muted">Don&apos;t have an account? <Link href="/auth/signup" className="font-semibold text-primary hover:underline">Sign up</Link></p>
      </div>
    </div>
  );
}

/* ---------------- Signup ---------------- */
export function SignupForm() {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const plan = seed.plans.find((p) => p.id === params.get("plan"));
  const [f, setF] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const strength = passwordStrength(f.password);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.firstName.trim()) er.firstName = "Required.";
    if (!f.lastName.trim()) er.lastName = "Required.";
    if (!emailOk(f.email)) er.email = "Please enter a valid email address.";
    if (strength.score < 2) er.password = "Use 8+ characters with a mix of letters, numbers or symbols.";
    if (f.confirm !== f.password) er.confirm = "Passwords don't match.";
    if (!agree) er.agree = "Please accept the terms to continue.";
    setErrors(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try {
      await signup(f);
      toast({ tone: "success", title: "Account created", desc: plan ? `You're on the ${plan.name} plan trial.` : `Welcome to ${BRAND}!` });
      router.push("/workspace/account/profile");
    } catch (err) {
      setErrors({ email: (err as Error).message });
      setBusy(false);
    }
  };

  return (
    <div className="grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
      <div>
        <Eyebrow>Get started free</Eyebrow>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Create your account</h1>
        <p className="mt-4 text-lg text-muted">Join thousands of developers building the future with {BRAND}</p>
        {plan && <p className="mt-4 inline-flex rounded-full bg-primary/15 px-3 py-1 text-sm font-semibold text-primary">Selected plan: {plan.name}</p>}
        <div className="hidden lg:block">
          <Perks title="What you'll get:" items={[
            { icon: FiGift, t: "Free Forever", d: "Start with our generous free tier, no credit card required" },
            { icon: FiLayout, t: "Premium Templates", d: "Access to professionally designed templates and components" },
            { icon: FiHeadphones, t: "24/7 Support", d: "Get help whenever you need it from our expert team" },
          ]} />
        </div>
      </div>
      <div className="rounded-3xl border border-line bg-surface/70 p-6 shadow-2xl backdrop-blur sm:p-8">
        <form noValidate onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First Name" htmlFor="su-first" required error={errors.firstName}>
              <input id="su-first" autoComplete="given-name" value={f.firstName} onChange={set("firstName")} placeholder="Enter your first name" aria-invalid={!!errors.firstName} className={inputClass} />
            </Field>
            <Field label="Last Name" htmlFor="su-last" required error={errors.lastName}>
              <input id="su-last" autoComplete="family-name" value={f.lastName} onChange={set("lastName")} placeholder="Enter your last name" aria-invalid={!!errors.lastName} className={inputClass} />
            </Field>
          </div>
          <Field label="Email Address" htmlFor="su-email" required error={errors.email}>
            <input id="su-email" type="email" autoComplete="email" value={f.email} onChange={set("email")} placeholder="Enter your email address" aria-invalid={!!errors.email} className={inputClass} />
          </Field>
          <Field label="Password" htmlFor="su-pass" required error={errors.password}>
            <PasswordInput id="su-pass" autoComplete="new-password" value={f.password} onChange={set("password")} placeholder="Create a strong password" aria-invalid={!!errors.password} />
          </Field>
          {f.password && (
            <div aria-live="polite">
              <div className="flex gap-1">{[0, 1, 2, 3].map((i) => <span key={i} className={cx("h-1.5 flex-1 rounded-full", i < strength.score ? ["bg-rose-500", "bg-amber-500", "bg-lime-500", "bg-emerald-500"][strength.score - 1] : "bg-fg/10")} />)}</div>
              <p className="mt-1 text-xs text-muted">Strength: {strength.label}</p>
            </div>
          )}
          <Field label="Confirm Password" htmlFor="su-confirm" required error={errors.confirm}>
            <PasswordInput id="su-confirm" autoComplete="new-password" value={f.confirm} onChange={set("confirm")} placeholder="Confirm your password" aria-invalid={!!errors.confirm} />
          </Field>
          <div>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--color-primary)]" />
              <span>I agree to the <Link href="/company/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/company/privacy" className="text-primary hover:underline">Privacy Policy</Link></span>
            </label>
            {errors.agree && <p className="mt-1 text-xs text-rose-500" role="alert">{errors.agree}</p>}
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={busy}>{busy ? "Creating account…" : "Create Account"}</Button>
        </form>
        <Social />
        <p className="mt-6 text-center text-sm text-muted">Already have an account? <Link href="/auth/login" className="font-semibold text-primary hover:underline">Sign in</Link></p>
      </div>
    </div>
  );
}

/* ---------------- Forgot password ---------------- */
export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  return (
    <div className="grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
      <div>
        <Eyebrow>Account recovery</Eyebrow>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Forgot your password?</h1>
        <p className="mt-4 text-lg text-muted">No worries — enter the email you signed up with and we&apos;ll send you a reset link.</p>
        <div className="mt-10 hidden rounded-3xl border border-line bg-card/50 p-6 lg:block">
          <h3 className="font-semibold">Reset Instructions</h3>
          <ol className="mt-4 space-y-3 text-sm text-muted">
            {["Enter the email address linked to your account", "Open the email we send you (check spam too)", "Click the link and choose a new password"].map((s, i) => (
              <li key={s} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>{s}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="rounded-3xl border border-line bg-surface/70 p-6 shadow-2xl backdrop-blur sm:p-8">
        {sent ? (
          <div className="py-6 text-center" role="status">
            <FiCheckCircle className="mx-auto h-12 w-12 text-emerald-500" />
            <h2 className="mt-4 text-xl font-bold">Check your inbox</h2>
            <p className="mt-2 text-sm text-muted">If an account exists for <b>{email}</b>, a reset link is on its way. It expires in 30 minutes.</p>
            <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>Use a different email</Button>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (!emailOk(email)) return setErr("Please enter a valid email address.");
              setErr("");
              setBusy(true);
              setTimeout(() => { setBusy(false); setSent(true); }, 800);
            }}
            className="space-y-5"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-xl text-primary"><FiLock /></span>
            <Field label="Email Address" htmlFor="fp-email" required error={err}>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input id="fp-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" aria-invalid={!!err} className={cx(inputClass, "pl-11")} />
              </div>
            </Field>
            <Button type="submit" size="lg" className="w-full" disabled={busy}>{busy ? "Sending…" : "Send reset link"}</Button>
          </form>
        )}
        <Link href="/auth/login" className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-muted hover:text-fg"><FiArrowLeft /> Back to sign in</Link>
      </div>
    </div>
  );
}
