// Simple SVG flags (emoji flags don't render on every OS).
type Props = { code: string; className?: string };

const H = (cs: string[]) =>
  cs.map((c, i) => <rect key={i} x="0" y={(20 / cs.length) * i} width="30" height={20 / cs.length + 0.1} fill={c} />);
const V = (cs: string[]) =>
  cs.map((c, i) => <rect key={i} x={(30 / cs.length) * i} y="0" width={30 / cs.length + 0.1} height="20" fill={c} />);
const nordic = (bg: string, cross: string, inner?: string) => (
  <>
    <rect width="30" height="20" fill={bg} />
    <rect x="8" width="5" height="20" fill={cross} />
    <rect y="7.5" width="30" height="5" fill={cross} />
    {inner && (
      <>
        <rect x="9.25" width="2.5" height="20" fill={inner} />
        <rect y="8.75" width="30" height="2.5" fill={inner} />
      </>
    )}
  </>
);

function body(code: string) {
  switch (code) {
    case "de": return H(["#000", "#dd0000", "#ffce00"]);
    case "it": return V(["#009246", "#fff", "#ce2b37"]);
    case "fr": return V(["#0055a4", "#fff", "#ef4135"]);
    case "nl": return H(["#ae1c28", "#fff", "#21468b"]);
    case "pl": return H(["#fff", "#dc143c"]);
    case "ro": return V(["#002b7f", "#fcd116", "#ce1126"]);
    case "es": return <>{H(["#aa151b", "#f1bf00", "#f1bf00", "#aa151b"])}</>;
    case "pt": return <><rect width="12" height="20" fill="#006600" /><rect x="12" width="18" height="20" fill="#ff0000" /><circle cx="12" cy="10" r="3.4" fill="#ffcc00" /></>;
    case "se": return nordic("#006aa7", "#fecc00");
    case "dk": return nordic("#c8102e", "#fff");
    case "fi": return nordic("#fff", "#003580");
    case "no": return nordic("#ba0c2f", "#fff", "#00205b");
    case "tr": return <><rect width="30" height="20" fill="#e30a17" /><circle cx="11" cy="10" r="5" fill="#fff" /><circle cx="12.3" cy="10" r="4" fill="#e30a17" /><circle cx="17.2" cy="10" r="1.6" fill="#fff" /></>;
    case "gb": return (
      <>
        <rect width="30" height="20" fill="#012169" />
        <path d="M0,0 30,20 M30,0 0,20" stroke="#fff" strokeWidth="4" />
        <path d="M0,0 30,20 M30,0 0,20" stroke="#c8102e" strokeWidth="1.5" />
        <path d="M15,0 V20 M0,10 H30" stroke="#fff" strokeWidth="6" />
        <path d="M15,0 V20 M0,10 H30" stroke="#c8102e" strokeWidth="3.5" />
      </>
    );
    case "us": return (
      <>
        {H(["#b22234", "#fff", "#b22234", "#fff", "#b22234", "#fff", "#b22234"])}
        <rect width="13" height="11" fill="#3c3b6e" />
      </>
    );
    default: return <rect width="30" height="20" fill="#94a3b8" />;
  }
}

export default function Flag({ code, className = "h-4 w-6" }: Props) {
  return (
    <svg viewBox="0 0 30 20" className={`shrink-0 overflow-hidden rounded-[3px] ${className}`} aria-hidden>
      {body(code)}
    </svg>
  );
}
