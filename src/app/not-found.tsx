import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-bg-deep px-4 text-center">
      <div className="absolute left-6 top-6"><Logo /></div>
      <p aria-hidden className="pointer-events-none absolute select-none text-[38vw] font-black leading-none text-fg/[0.03]">404</p>
      <p className="relative font-serif italic text-muted">Ooops!</p>
      <h1 className="relative mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
        This is not the page you&apos;re <span className="font-serif italic text-primary">looking for</span> 👀
      </h1>
      <p className="relative mt-5 max-w-md text-muted">The link you followed no longer exists or has moved. Let&apos;s guide you back to a safe spot so you can continue building without disruption.</p>
      <div className="relative mt-8 flex gap-3">
        <Link href="/" className="rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">Back to home</Link>
        <Link href="/company/contact" className="rounded-full px-6 py-2.5 text-sm font-semibold text-fg/70 hover:text-fg">Report a broken link</Link>
      </div>
    </main>
  );
}
