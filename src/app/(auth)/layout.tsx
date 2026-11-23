import { Logo } from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,#000_20%,transparent_70%)]" aria-hidden />
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[120px]" aria-hidden />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <Logo />
        <ThemeToggle />
      </header>
      <main className="relative flex justify-center px-4 pb-16 pt-4 sm:px-6 lg:pt-10">{children}</main>
    </div>
  );
}
