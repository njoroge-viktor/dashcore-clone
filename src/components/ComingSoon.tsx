"use client";

import { useEffect, useState } from "react";
import { PageHero } from "./ui";
import { EmailCapture } from "./landing/widgets";

// Launch date: 30 days after the visitor's first visit (stored so it doesn't reset).
function useTarget() {
  const [t, setT] = useState<number | null>(null);
  useEffect(() => {
    let v = Date.now() + 30 * 864e5;
    try {
      const s = localStorage.getItem("corevia-launch");
      if (s && +s > Date.now()) v = +s;
      else localStorage.setItem("corevia-launch", String(v));
    } catch {}
    setT(v);
  }, []);
  return t;
}

export default function ComingSoon() {
  const target = useTarget();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const left = Math.max(0, (target ?? now) - now);
  const parts = [
    ["Days", Math.floor(left / 864e5)],
    ["Hours", Math.floor((left / 36e5) % 24)],
    ["Minutes", Math.floor((left / 6e4) % 60)],
    ["Seconds", Math.floor((left / 1e3) % 60)],
  ] as const;
  return (
    <PageHero eyebrow="Coming soon" title="Something new is on the way" subtitle="We're putting the finishing touches on it. Join the waitlist and we'll let you know the moment it launches.">
      <div className="mx-auto mt-10 grid max-w-xl grid-cols-4 gap-3" aria-live="off">
        {parts.map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-line bg-card/60 p-4">
            <p className="text-3xl font-bold tabular-nums sm:text-5xl">{target ? String(v).padStart(2, "0") : "--"}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted">{l}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-md">
        <EmailCapture list="waitlist" source="coming-soon" cta="Join waitlist" />
      </div>
    </PageHero>
  );
}
