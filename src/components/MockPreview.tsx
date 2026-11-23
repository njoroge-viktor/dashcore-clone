import type { Demo } from "@/lib/data";
import { BRAND } from "@/lib/data";

/**
 * A miniature, code-drawn "screenshot" of a landing page.
 * Everything is sized in container-query units (cqw) so it scales
 * from a tiny hero tile up to a full card.
 */

const bar = (w: string, o = 0.25, h = "0.9cqw") => (
  <span className="block rounded-full" style={{ width: w, height: h, background: `rgba(148,163,184,${o})` }} />
);

function MiniNav({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[4cqw] py-[2.6cqw]">
      <div className="flex items-center gap-[1cqw]">
        <span className="rounded-full" style={{ width: "2cqw", height: "2cqw", border: "0.45cqw solid #e2e8f0" }} />
        <span className="font-semibold text-slate-200" style={{ fontSize: "1.8cqw" }}>{BRAND}</span>
      </div>
      <div className="flex items-center gap-[2.4cqw]">
        {[0, 1, 2, 3].map((i) => (
          <span key={i}>{bar("6cqw", 0.3, "0.7cqw")}</span>
        ))}
      </div>
      <span className="rounded-full" style={{ width: "8cqw", height: "2.6cqw", background: accent }} />
    </div>
  );
}

function Headline({ text, center = false, size = 5.2 }: { text: string; center?: boolean; size?: number }) {
  return (
    <p
      className={`font-bold leading-[1.08] tracking-tight text-white ${center ? "text-center" : ""}`}
      style={{ fontSize: `${size}cqw` }}
    >
      {text}
    </p>
  );
}

function Cta({ accent, second = true }: { accent: string; second?: boolean }) {
  return (
    <div className="mt-[2.4cqw] flex items-center gap-[1.4cqw]">
      <span className="rounded-full" style={{ width: "11cqw", height: "3.2cqw", background: accent }} />
      {second && <span className="rounded-full border border-white/20" style={{ width: "9cqw", height: "3.2cqw" }} />}
    </div>
  );
}

function Phone({ accent }: { accent: string }) {
  return (
    <div className="absolute right-[7cqw] top-[16cqw] h-[64cqw] w-[24cqw] rounded-[3cqw] border border-white/15 bg-[#0b1020] p-[1.5cqw] shadow-2xl">
      <div className="mb-[2cqw] h-[1cqw] w-[8cqw] rounded-full bg-white/15" />
      <div className="rounded-[1.6cqw] p-[1.6cqw]" style={{ background: `${accent}33` }}>
        {bar("70%", 0.5)}
        <div className="mt-[1cqw]">{bar("45%", 0.3)}</div>
      </div>
      <div className="mt-[1.6cqw] flex h-[12cqw] items-end gap-[1cqw] px-[1cqw]">
        {[40, 65, 35, 80, 55, 90].map((h, i) => (
          <span key={i} className="flex-1 rounded-t-[0.6cqw]" style={{ height: `${h}%`, background: i === 5 ? accent : "rgba(148,163,184,.25)" }} />
        ))}
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="mt-[1.4cqw] flex items-center gap-[1cqw]">
          <span className="rounded-full bg-white/15" style={{ width: "3cqw", height: "3cqw" }} />
          <div className="flex-1 space-y-[0.6cqw]">{bar("80%", 0.3, "0.7cqw")}{bar("50%", 0.18, "0.7cqw")}</div>
        </div>
      ))}
      <span className="absolute -left-[8cqw] top-[10cqw] -z-10 rounded-full blur-[1px]" style={{ width: "22cqw", height: "22cqw", background: accent, opacity: 0.85 }} />
    </div>
  );
}

function Dashboard({ accent }: { accent: string }) {
  return (
    <div className="absolute bottom-[-6cqw] left-[10cqw] right-[10cqw] h-[30cqw] rounded-t-[1.6cqw] border border-white/10 bg-[#0d1426] p-[1.8cqw] shadow-2xl">
      <div className="mb-[1.6cqw] flex gap-[0.8cqw]">
        {[0, 1, 2].map((i) => <span key={i} className="rounded-full bg-white/15" style={{ width: "1.2cqw", height: "1.2cqw" }} />)}
      </div>
      <div className="grid grid-cols-3 gap-[1.4cqw]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-[1cqw] border border-white/10 bg-white/[0.03] p-[1.4cqw]">
            <p className="font-bold text-white" style={{ fontSize: "2.4cqw" }}>{[25, 20, 3][i]}</p>
            <div className="mt-[0.8cqw]">{bar("70%", 0.2, "0.7cqw")}</div>
            <svg viewBox="0 0 100 24" className="mt-[1cqw] w-full" preserveAspectRatio="none" style={{ height: "4cqw" }}>
              <polyline fill="none" stroke={accent} strokeWidth="2.5" points={["0,20 20,14 40,17 60,8 80,11 100,3", "0,18 25,16 50,9 75,12 100,6", "0,12 20,15 40,10 60,13 80,6 100,8"][i]} />
            </svg>
          </div>
        ))}
      </div>
      <div className="mt-[1.4cqw] space-y-[1cqw]">{bar("90%", 0.12)}{bar("75%", 0.12)}</div>
    </div>
  );
}

function Coins({ accent }: { accent: string }) {
  const coins = [
    { x: 62, y: 30, s: 9, t: "₿" },
    { x: 76, y: 22, s: 7, t: "$" },
    { x: 70, y: 52, s: 8, t: "Ξ" },
    { x: 84, y: 44, s: 6, t: "◎" },
  ];
  return (
    <>
      {coins.map((c, i) => (
        <span
          key={i}
          className="absolute flex items-center justify-center rounded-[1.6cqw] border border-white/15 bg-[#151c33] font-bold text-white/80 shadow-xl"
          style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.s}cqw`, height: `${c.s}cqw`, fontSize: `${c.s / 2}cqw` }}
        >
          {c.t}
        </span>
      ))}
      <svg viewBox="0 0 100 60" className="absolute bottom-0 right-0 w-[60%] opacity-70" preserveAspectRatio="none">
        <path d="M0,58 C30,50 50,40 100,6" stroke={accent} strokeWidth="0.6" fill="none" />
        <path d="M0,60 C35,52 55,44 100,14" stroke="#94a3b8" strokeWidth="0.3" fill="none" />
      </svg>
    </>
  );
}

function Chat({ accent }: { accent: string }) {
  return (
    <div className="absolute right-[6cqw] top-[16cqw] w-[36cqw] space-y-[1.6cqw] rounded-[1.6cqw] border border-white/10 bg-[#0d1426] p-[2cqw] shadow-2xl">
      <div className="ml-auto w-[70%] rounded-[1.2cqw] p-[1.2cqw]" style={{ background: accent }}>{bar("90%", 0.6, "0.8cqw")}</div>
      <div className="w-[80%] space-y-[0.8cqw] rounded-[1.2cqw] bg-white/[0.06] p-[1.2cqw]">{bar("95%", 0.35, "0.8cqw")}{bar("70%", 0.25, "0.8cqw")}{bar("50%", 0.25, "0.8cqw")}</div>
      <div className="ml-auto w-[55%] rounded-[1.2cqw] p-[1.2cqw]" style={{ background: accent }}>{bar("80%", 0.6, "0.8cqw")}</div>
      <div className="flex items-center gap-[1cqw] rounded-full border border-white/10 px-[1.6cqw] py-[1cqw]">
        {bar("70%", 0.2, "0.8cqw")}
        <span className="ml-auto rounded-full" style={{ width: "2.6cqw", height: "2.6cqw", background: accent }} />
      </div>
    </div>
  );
}

function Social({ accent }: { accent: string }) {
  const tiles = [
    { x: 58, y: 16, w: 17, h: 26, c: ["#fbbf24", "#f97316"] },
    { x: 78, y: 22, w: 15, h: 22, c: ["#38bdf8", "#6366f1"] },
    { x: 60, y: 46, w: 16, h: 24, c: [accent, "#7c3aed"] },
    { x: 79, y: 50, w: 15, h: 20, c: ["#34d399", "#0ea5e9"] },
  ];
  return (
    <>
      {tiles.map((t, i) => (
        <span
          key={i}
          className="absolute overflow-hidden rounded-[1.6cqw] border border-white/10 shadow-xl"
          style={{ left: `${t.x}%`, top: `${t.y}%`, width: `${t.w}cqw`, height: `${t.h}cqw`, background: `linear-gradient(160deg, ${t.c[0]}, ${t.c[1]})` }}
        >
          <span className="absolute left-1/2 top-[30%] -translate-x-1/2 rounded-full bg-white/50" style={{ width: "40%", aspectRatio: 1 }} />
          <span className="absolute inset-x-[10%] bottom-[8%] block rounded-full bg-black/30" style={{ height: "1cqw" }} />
        </span>
      ))}
    </>
  );
}

function Code({ accent }: { accent: string }) {
  const lines = [
    [accent, "30%"], ["#94a3b8", "55%"], ["#f472b6", "40%"], ["#94a3b8", "62%"], ["#fbbf24", "35%"], ["#94a3b8", "48%"], [accent, "26%"],
  ];
  return (
    <div className="absolute right-[6cqw] top-[16cqw] w-[38cqw] rounded-[1.6cqw] border border-white/10 bg-[#0a0f1d] p-[2cqw] font-mono shadow-2xl">
      <div className="mb-[1.6cqw] flex gap-[0.8cqw]">
        {["#f87171", "#fbbf24", "#34d399"].map((c) => <span key={c} className="rounded-full" style={{ width: "1.2cqw", height: "1.2cqw", background: c }} />)}
      </div>
      {lines.map(([c, w], i) => (
        <div key={i} className="mb-[1cqw] flex items-center gap-[1cqw]" style={{ paddingLeft: `${[0, 2, 4, 4, 2, 4, 0][i]}cqw` }}>
          <span className="rounded-full" style={{ width: w, height: "0.9cqw", background: c, opacity: 0.7 }} />
        </div>
      ))}
    </div>
  );
}

function Person({ accent }: { accent: string }) {
  return (
    <div className="absolute bottom-0 right-[10cqw] h-[56cqw] w-[30cqw]">
      <span className="absolute bottom-[10cqw] left-1/2 -translate-x-1/2 rounded-full opacity-40 blur-[2cqw]" style={{ width: "30cqw", height: "30cqw", background: accent }} />
      <span className="absolute left-1/2 top-[6cqw] -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-200 to-amber-400" style={{ width: "11cqw", height: "13cqw" }} />
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-[12cqw] bg-slate-800" style={{ width: "28cqw", height: "30cqw" }} />
      <span className="absolute left-0 top-[20cqw] rounded-full border border-white/10 bg-[#151c33] px-[1.2cqw] py-[0.6cqw] font-bold text-white" style={{ fontSize: "1.6cqw" }}>12+</span>
      <span className="absolute right-0 top-[30cqw] rounded-full border border-white/10 bg-[#151c33] px-[1.2cqw] py-[0.6cqw] font-bold text-white" style={{ fontSize: "1.6cqw" }}>98%</span>
    </div>
  );
}

function AppShell({ accent, title }: { accent: string; title: string }) {
  return (
    <div className="absolute inset-0 flex">
      <div className="w-[22cqw] space-y-[1.8cqw] border-r border-white/10 bg-[#0a1020] p-[2.4cqw]">
        <div className="flex items-center gap-[1cqw]">
          <span className="rounded-full" style={{ width: "2.4cqw", height: "2.4cqw", border: "0.5cqw solid #e2e8f0" }} />
          {bar("50%", 0.4)}
        </div>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-[1cqw] rounded-[0.8cqw] px-[1cqw] py-[0.8cqw]" style={{ background: i === 1 ? `${accent}33` : "transparent" }}>
            <span className="rounded-[0.4cqw]" style={{ width: "1.6cqw", height: "1.6cqw", background: i === 1 ? accent : "rgba(148,163,184,.3)" }} />
            {bar(`${[60, 70, 50, 65, 45, 55][i]}%`, i === 1 ? 0.6 : 0.25, "0.8cqw")}
          </div>
        ))}
      </div>
      <div className="flex-1 p-[3cqw]">
        <p className="font-semibold text-white" style={{ fontSize: "3cqw" }}>{title}</p>
        <div className="mt-[0.8cqw]">{bar("40%", 0.2)}</div>
        <div className="mt-[2.4cqw] grid grid-cols-3 gap-[1.4cqw]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-[1cqw] border border-white/10 p-[1.4cqw]">
              {bar("50%", 0.25, "0.8cqw")}
              <p className="mt-[0.8cqw] font-bold text-white" style={{ fontSize: "2.4cqw" }}>{["12", "$480", "99%"][i]}</p>
            </div>
          ))}
        </div>
        <div className="mt-[2cqw] space-y-[1.2cqw] rounded-[1cqw] border border-white/10 p-[1.6cqw]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-[1.2cqw]">
              <span className="rounded-full bg-white/15" style={{ width: "2.4cqw", height: "2.4cqw" }} />
              {bar(`${[40, 55, 35, 48][i]}%`, 0.25, "0.8cqw")}
              <span className="ml-auto rounded-full" style={{ width: "6cqw", height: "1.8cqw", background: i === 0 ? accent : "rgba(148,163,184,.15)" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Auth({ accent, title }: { accent: string; title: string }) {
  return (
    <div className="absolute left-1/2 top-1/2 w-[38cqw] -translate-x-1/2 -translate-y-[42%] rounded-[2cqw] border border-white/10 bg-[#0d1426] p-[3cqw] shadow-2xl">
      <p className="text-center font-semibold text-white" style={{ fontSize: "2.8cqw" }}>{title}</p>
      <div className="mx-auto mt-[0.8cqw] w-[60%]">{bar("100%", 0.2, "0.8cqw")}</div>
      {[0, 1].map((i) => (
        <div key={i} className="mt-[2cqw] space-y-[0.8cqw]">
          {bar("25%", 0.3, "0.7cqw")}
          <div className="rounded-[0.8cqw] border border-white/10" style={{ height: "3.6cqw" }} />
        </div>
      ))}
      <div className="mt-[2.4cqw] rounded-full" style={{ height: "3.6cqw", background: accent }} />
    </div>
  );
}

export default function MockPreview({ demo, className = "" }: { demo: Demo; className?: string }) {
  const { layout, accent, headline } = demo;
  const leftText = ["phone", "coins", "chat", "social", "code", "person"].includes(layout);

  return (
    <div
      className={`@container relative aspect-[16/10] w-full overflow-hidden bg-[#0b1222] ${className}`}
      style={{ backgroundImage: `radial-gradient(60% 70% at ${leftText ? "75%" : "50%"} 35%, ${accent}38, transparent 70%)` }}
      aria-hidden
    >
      {layout !== "app" && <MiniNav accent={accent} />}

      {layout === "app" && <AppShell accent={accent} title={headline} />}
      {layout === "auth" && <Auth accent={accent} title={headline} />}

      {leftText && (
        <div className="absolute left-[6cqw] top-[22cqw] w-[46%]">
          <span className="mb-[1.6cqw] block rounded-full" style={{ width: "10cqw", height: "1.6cqw", background: `${accent}55` }} />
          <Headline text={headline} />
          <div className="mt-[2cqw] space-y-[1cqw]">{bar("90%", 0.22)}{bar("70%", 0.22)}</div>
          <Cta accent={accent} />
        </div>
      )}

      {(layout === "dashboard" || layout === "center" || layout === "page") && (
        <div className={`absolute inset-x-[10cqw] ${layout === "dashboard" ? "top-[14cqw]" : "top-[22cqw]"} flex flex-col items-center`}>
          <Headline text={headline} center size={layout === "page" ? 5.6 : 5} />
          <div className="mt-[1.8cqw] flex w-[70%] flex-col items-center space-y-[1cqw]">{bar("100%", 0.22)}{bar("75%", 0.22)}</div>
          <Cta accent={accent} />
          {layout === "center" && (
            <div className="mt-[5cqw] flex w-full items-center justify-center gap-[4cqw] opacity-60">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="flex items-center gap-[0.8cqw]">
                  <span className="rounded-full bg-white/40" style={{ width: "1.8cqw", height: "1.8cqw" }} />
                  {bar("7cqw", 0.3, "0.8cqw")}
                </span>
              ))}
            </div>
          )}
          {layout === "page" && (
            <div className="mt-[4cqw] grid w-full grid-cols-3 gap-[2cqw]">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-[1.4cqw] border border-white/10 bg-white/[0.03] p-[2cqw]">
                  <span className="mb-[1.4cqw] block rounded-[0.6cqw]" style={{ width: "3cqw", height: "3cqw", background: `${accent}88` }} />
                  <div className="space-y-[0.8cqw]">{bar("70%", 0.35, "0.8cqw")}{bar("90%", 0.18, "0.7cqw")}{bar("60%", 0.18, "0.7cqw")}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {layout === "phone" && <Phone accent={accent} />}
      {layout === "dashboard" && <Dashboard accent={accent} />}
      {layout === "coins" && <Coins accent={accent} />}
      {layout === "chat" && <Chat accent={accent} />}
      {layout === "social" && <Social accent={accent} />}
      {layout === "code" && <Code accent={accent} />}
      {layout === "person" && <Person accent={accent} />}
    </div>
  );
}
