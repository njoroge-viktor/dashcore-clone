export type Layout =
  | "phone"
  | "dashboard"
  | "center"
  | "coins"
  | "chat"
  | "social"
  | "code"
  | "person"
  | "app"
  | "page"
  | "auth";

export type Demo = {
  name: string;
  headline: string;
  tags: [string, string];
  layout: Layout;
  accent: string;
  href?: string;
  isNew?: boolean;
  comingSoon?: boolean;
};

export const BRAND = "Corevia";

export const landingDemos: Demo[] = [
  { name: "Mobile App", headline: "App Landing Page", tags: ["Product-led", "Subscriptions"], layout: "phone", accent: "#f59e0b", href: "/app" },
  { name: "SaaS", headline: "Turn data chaos into strategic clarity", tags: ["B2B", "Platform"], layout: "dashboard", accent: "#0ea5e9", href: "/saas" },
  { name: "Startup", headline: "Connect. Control. Conquer.", tags: ["Launch", "Early stage"], layout: "center", accent: "#8b5cf6", href: "/startup" },
  { name: "Crypto", headline: "Trade Digital Assets With Institutional Confidence", tags: ["Web3", "Blockchain"], layout: "coins", accent: "#6366f1", href: "/crypto" },
  { name: "AI Chat", headline: "Smarter Conversations", tags: ["AI", "Assistant"], layout: "chat", accent: "#06b6d4", href: "/ai-chat", isNew: true },
  { name: "Integration Tools", headline: "Connect Your Stack Without the Usual Complexity", tags: ["Automation", "Ecosystem"], layout: "center", accent: "#3b82f6", href: "/integration" },
  { name: "Digital Wallet", headline: "The easier way to send and get money", tags: ["FinTech", "Payments"], layout: "phone", accent: "#84cc16", href: "/wallet" },
  { name: "Social", headline: "Build a social space people want to come back to", tags: ["Community", "Network"], layout: "social", accent: "#ec4899", href: "/social" },
  { name: "Developer", headline: "Powerful and high-performance infrastructure", tags: ["API", "Tools"], layout: "code", accent: "#10b981", href: "/developers" },
  { name: "Personal Page", headline: "Fullstack Developer & Consultant", tags: ["Creator", "Consultant"], layout: "person", accent: "#f97316", href: "/personal" },
  { name: "CRM", headline: "Supercharge your Business Growth", tags: ["Enterprise", "Business"], layout: "dashboard", accent: "#a855f7", href: "/crm" },
  { name: "Software", headline: "Unified platform for modern software teams", tags: ["SaaS", "Productivity"], layout: "dashboard", accent: "#14b8a6", href: "/software" },
  { name: "Enterprise Business", headline: "", tags: ["", ""], layout: "center", accent: "#64748b", comingSoon: true },
  { name: "Corporate", headline: "", tags: ["", ""], layout: "center", accent: "#64748b", comingSoon: true },
  { name: "Marketing", headline: "", tags: ["", ""], layout: "center", accent: "#64748b", comingSoon: true },
  { name: "Payment Services", headline: "", tags: ["", ""], layout: "center", accent: "#64748b", comingSoon: true },
  { name: "Smart Business", headline: "", tags: ["", ""], layout: "center", accent: "#64748b", comingSoon: true },
];

export const workspaceDemos: Demo[] = [
  { name: "Team Access", headline: "Members & roles", tags: ["Access", "Teams"], layout: "app", accent: "#0ea5e9", href: "/workspace/access/team" },
  { name: "Account Profile", headline: "Your profile", tags: ["Account", "Settings"], layout: "app", accent: "#8b5cf6", href: "/workspace/account/profile" },
  { name: "Billing Overview", headline: "Plan & invoices", tags: ["Billing", "Usage"], layout: "app", accent: "#10b981", href: "/workspace/billing/overview" },
  { name: "API Keys", headline: "Developer keys", tags: ["Developers", "Security"], layout: "app", accent: "#f59e0b", href: "/workspace/developers/api-keys" },
];

export const innerDemos: Demo[] = [
  { name: "About", headline: "Building the future of digital platforms", tags: ["Company", "Story"], layout: "page", accent: "#0ea5e9", href: "/company/about" },
  { name: "Services", headline: "Technology solutions that drive growth", tags: ["Company", "Offer"], layout: "page", accent: "#8b5cf6", href: "/company/services" },
  { name: "Pricing", headline: "Simple, transparent pricing", tags: ["Plans", "Billing"], layout: "page", accent: "#10b981", href: "/company/pricing" },
  { name: "Contact", headline: "Get the right team involved", tags: ["Support", "Sales"], layout: "page", accent: "#f59e0b", href: "/company/contact" },
  { name: "FAQs", headline: "How can we help you?", tags: ["Support", "Help"], layout: "page", accent: "#06b6d4", href: "/company/faqs" },
  { name: "Testimonials", headline: "Trusted by teams", tags: ["Social proof", "Reviews"], layout: "page", accent: "#ec4899", href: "/company/testimonials" },
  { name: `Why ${BRAND}`, headline: `Why choose ${BRAND}?`, tags: ["Company", "Approach"], layout: "page", accent: "#6366f1", href: "/company/why-corevia" },
  { name: "Privacy", headline: "Privacy policy", tags: ["Legal", "Data"], layout: "page", accent: "#64748b", href: "/company/privacy" },
  { name: "Terms", headline: "Terms of service", tags: ["Legal", "Usage"], layout: "page", accent: "#64748b", href: "/company/terms" },
];

export const utilityDemos: Demo[] = [
  { name: "Sign In", headline: "Welcome back", tags: ["Auth", "Login"], layout: "auth", accent: "#0ea5e9", href: "/auth/login" },
  { name: "Sign Up", headline: "Create your account", tags: ["Auth", "Signup"], layout: "auth", accent: "#8b5cf6", href: "/auth/signup" },
  { name: "Forgot Password", headline: "Reset your password", tags: ["Auth", "Recovery"], layout: "auth", accent: "#10b981", href: "/auth/forgot-password" },
  { name: "Not Found", headline: "Page not found", tags: ["Error", "404"], layout: "page", accent: "#f97316", href: "/this-page-does-not-exist" },
  { name: "Coming Soon", headline: "Something new is coming", tags: ["Launch", "Waitlist"], layout: "page", accent: "#a855f7", href: "/coming-soon" },
];

export type ShowcaseItem = { slug: string; label: string; title: string; desc: string };
export const showcaseGroups: { group: string; items: ShowcaseItem[] }[] = [
  {
    group: "Foundation",
    items: [
      { slug: "typography", label: "Typography", title: "Typography", desc: `The foundational typographic elements of the ${BRAND} design system. Highly reusable components for consistent UI development.` },
      { slug: "buttons", label: "Buttons", title: "Primitives", desc: `The foundational building blocks of the ${BRAND} design system. Highly reusable components for consistent UI development.` },
      { slug: "design-tokens", label: "Design Tokens", title: "Design Tokens", desc: "A visual reference of the gradient, background, text, border and button utility classes." },
      { slug: "icons", label: "Icons & Badges", title: "Icons & Badges", desc: `Icon sets, badge variants and brand logo renderers used across the ${BRAND} design system. Click an icon to copy its name.` },
    ],
  },
  {
    group: "Data Display",
    items: [
      { slug: "cards", label: "Cards", title: "Cards", desc: "Feature, service, glass, product, article and interactive glow cards." },
      { slug: "charts", label: "Charts & Widgets", title: "Charts & Widgets", desc: "Data visualization components including charts, progress indicators, stat widgets, and animated counters." },
      { slug: "testimonials", label: "Testimonials", title: "Testimonials", desc: "Social proof components including cards, columns, and marquee layouts to showcase customer feedback." },
      { slug: "logos", label: "Logos & Marquees", title: "Logos & Marquees", desc: "Brand logo rendering and infinite scrolling marquee components for trust bars and partner sections." },
    ],
  },
  {
    group: "Layout",
    items: [
      { slug: "footers", label: "Footers", title: "Footers", desc: "A collection of diverse footer layouts designed for different application needs, from minimal social-focused bars to feature-rich content grids." },
      { slug: "navigation", label: "Navigation", title: "Navigation", desc: "Navigation patterns including sticky headers, sidebars, and tab groups for structuring application UIs." },
      { slug: "sections", label: "Sections", title: "Sections", desc: "Reusable page sections combining layout primitives with content patterns like feature grids, stats bars, and CTAs." },
      { slug: "patterns", label: "Patterns", title: "Patterns", desc: "Background patterns and decorative layers that add depth, texture, and visual hierarchy to sections and containers." },
    ],
  },
  {
    group: "Interactive",
    items: [
      { slug: "forms", label: "Forms & Inputs", title: "Forms & Inputs", desc: "Form fields, textareas, checkboxes, toggles, search and complete form layouts with validation." },
      { slug: "accordions", label: "Accordions", title: "Accordions & FAQs", desc: "Collapsible content panels in single, multi-open and default-open configurations." },
      { slug: "carousel", label: "Carousel & Tabs", title: "Carousel & Tabs", desc: "Content rotation and tabbed interfaces for organizing and presenting information in compact, interactive layouts." },
      { slug: "feedback", label: "Feedback & Overlays", title: "Feedback & Overlays", desc: "Components that provide visual feedback, confirmations, and rich media overlays to enhance user engagement." },
      { slug: "pricing", label: "Pricing", title: "Pricing Tables", desc: "Tier grids, billing toggles, glass pricing cards and comparison tables." },
    ],
  },
  {
    group: "Motion & Media",
    items: [
      { slug: "animations", label: "Animations", title: "Animations", desc: "Reveal presets, stagger containers, interactive tilt and text reveal effects." },
      { slug: "effects", label: "Effects", title: "Visual Effects", desc: "Dynamic background layers, interactive text effects, and particle systems to add depth and polish to your interfaces." },
      { slug: "mockups", label: "Mockups", title: "Mockups", desc: "Device and browser mockup frames for presenting screenshots, app previews, and product demos with realistic styling." },
    ],
  },
];
export const showcaseItems = showcaseGroups.flatMap((g) => g.items);

export type NavItem = { label: string; desc?: string; href: string };
export const navMenus: { key: "landing" | "platform" | "showcase" | "company"; items: NavItem[] }[] = [
  {
    key: "landing",
    items: landingDemos.filter((d) => !d.comingSoon).map((d) => ({ label: d.name, desc: d.tags.join(" · "), href: d.href! })),
  },
  {
    key: "platform",
    items: [
      { label: "Sign in", desc: "Secure access", href: "/auth/login" },
      { label: "Sign up", desc: "Create an account", href: "/auth/signup" },
      { label: "Forgot password", desc: "Account recovery", href: "/auth/forgot-password" },
      { label: "AI Chat", desc: "Assistant demo", href: "/ai-chat" },
      { label: "Team", desc: "Members & roles", href: "/workspace/access/team" },
      { label: "Profile", desc: "Account settings", href: "/workspace/account/profile" },
      { label: "Billing", desc: "Plans & invoices", href: "/workspace/billing/overview" },
      { label: "API Keys", desc: "Developer access", href: "/workspace/developers/api-keys" },
    ],
  },
  {
    key: "showcase",
    items: showcaseItems.map((s) => ({ label: s.label, href: `/showcase/${s.slug}` })),
  },
  {
    key: "company",
    items: innerDemos.map((d) => ({ label: d.name, desc: d.headline, href: d.href! })),
  },
];

export const languages = [
  { code: "en", label: "English (US)", flag: "us" },
  { code: "es", label: "Español", flag: "es" },
  { code: "fr", label: "Français", flag: "fr" },
  { code: "de", label: "Deutsch", flag: "de" },
  { code: "it", label: "Italiano", flag: "it" },
  { code: "pt", label: "Português", flag: "pt" },
  { code: "nl", label: "Nederlands", flag: "nl" },
  { code: "sv", label: "Svenska", flag: "se" },
  { code: "no", label: "Norsk", flag: "no" },
  { code: "da", label: "Dansk", flag: "dk" },
  { code: "fi", label: "Suomi", flag: "fi" },
  { code: "pl", label: "Polski", flag: "pl" },
  { code: "ro", label: "Română", flag: "ro" },
  { code: "tr", label: "Türkçe", flag: "tr" },
  { code: "en-gb", label: "English (UK)", flag: "gb" },
] as const;
