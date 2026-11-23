import Link from "next/link";
import MockPreview from "./MockPreview";
import { landingDemos } from "@/lib/data";

const live = landingDemos.filter((d) => !d.comingSoon);
const rowA = live.slice(0, 7);
const rowB = [...live.slice(6), ...live.slice(0, 2)];

function Row({ items, reverse = false, duration }: { items: typeof live; reverse?: boolean; duration: string }) {
  return (
    <div className="pause-on-hover overflow-hidden">
      <div
        className={`marquee gap-6 ${reverse ? "marquee-reverse" : ""}`}
        style={{ ["--duration" as string]: duration }}
      >
        {[...items, ...items].map((d, i) => (
          <Link
            key={i}
            href={d.href!}
            tabIndex={i >= items.length ? -1 : 0}
            aria-label={`${d.name} demo`}
            className="block w-[300px] shrink-0 overflow-hidden rounded-2xl border border-line-strong shadow-2xl shadow-black/30 transition hover:-translate-y-1 hover:border-primary/50 sm:w-[420px]"
          >
            <MockPreview demo={d} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ShowcaseMarquee() {
  return (
    <section className="space-y-6 py-20 sm:py-28" aria-label="Demo previews">
      <Row items={rowA} duration="60s" />
      <Row items={rowB} reverse duration="70s" />
    </section>
  );
}
