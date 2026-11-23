"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { BRAND } from "./data";

export type Lang = "en" | "es";

const dict = {
  en: {
    "nav.landing": "Landing Pages",
    "nav.platform": "Platform",
    "nav.showcase": "Showcase",
    "nav.company": "Company",
    "nav.signin": "Sign in",
    "nav.getStarted": "Get Started",
    "hero.trusted": "Trusted by 2,000+ customers",
    "hero.subtitle": "Everything you need to launch a professional website in days, not months. Pre-built components, optimized performance, and beautiful design.",
    "tech.eyebrow": "Tech Stack",
    "tech.title1": "Solid Tech for",
    "tech.title2": "Scalable Solutions",
    "tech.desc": "High-performance infrastructure for the modern entrepreneur. Built with the industry's best tools.",
    "tech.cta": "View All Technologies",
    "about.text": `${BRAND} is a modern frontend foundation for building high-quality SaaS, Startup and Product-Driven websites. It combines a flexible UI system, reusable components and a clean architecture designed for real-world projects.`,
    "l10n.eyebrow": "Localization, your way",
    "l10n.title1": "Build for any language,",
    "l10n.title2": "without the bloat",
    "l10n.desc": "Add languages as simple locale files, no bloated bundles, no complex setup. Ships with English & Spanish as a starting point, and scales with your needs.",
    "demos.title": "Select your preferred demo",
    "demos.subtitle": "Carefully designed Landing Pages & more to kickstart your next big project.",
    "demos.tab.landing": "Landing Pages",
    "demos.tab.workspaces": "Workspaces",
    "demos.tab.inner": "Inner Pages",
    "demos.tab.utilities": "Utilities",
    "demos.view": "View Demo",
    "demos.soon": "Coming soon",
    "cta.title": "Your website should grow with you.",
    "cta.desc": `${BRAND} is built to scale. Ready to grow?`,
    "cta.button": `Get ${BRAND} Now`,
    "footer.tagline": "Ultimate Next.js template for modern web applications.",
    "footer.platform": "Platform",
    "footer.landing": "Landing Pages",
    "footer.company": "Company",
    "footer.rights": "All rights reserved. Various trademarks held by their respective owners.",
  },
  es: {
    "nav.landing": "Páginas",
    "nav.platform": "Plataforma",
    "nav.showcase": "Componentes",
    "nav.company": "Empresa",
    "nav.signin": "Iniciar sesión",
    "nav.getStarted": "Comenzar",
    "hero.trusted": "Más de 2.000 clientes confían en nosotros",
    "hero.subtitle": "Todo lo que necesitas para lanzar un sitio web profesional en días, no meses. Componentes listos, rendimiento optimizado y un diseño precioso.",
    "tech.eyebrow": "Tecnología",
    "tech.title1": "Tecnología sólida para",
    "tech.title2": "soluciones escalables",
    "tech.desc": "Infraestructura de alto rendimiento para el emprendedor moderno. Construida con las mejores herramientas del sector.",
    "tech.cta": "Ver todas las tecnologías",
    "about.text": `${BRAND} es una base frontend moderna para crear sitios SaaS, Startup y orientados a producto de alta calidad. Combina un sistema de UI flexible, componentes reutilizables y una arquitectura limpia pensada para proyectos reales.`,
    "l10n.eyebrow": "Localización a tu manera",
    "l10n.title1": "Crea para cualquier idioma,",
    "l10n.title2": "sin peso extra",
    "l10n.desc": "Añade idiomas como simples archivos de traducción, sin paquetes pesados ni configuraciones complejas. Incluye inglés y español para empezar y crece contigo.",
    "demos.title": "Elige tu demo preferida",
    "demos.subtitle": "Landing pages cuidadosamente diseñadas y más para impulsar tu próximo gran proyecto.",
    "demos.tab.landing": "Landing Pages",
    "demos.tab.workspaces": "Espacios",
    "demos.tab.inner": "Páginas internas",
    "demos.tab.utilities": "Utilidades",
    "demos.view": "Ver demo",
    "demos.soon": "Próximamente",
    "cta.title": "Tu sitio web debería crecer contigo.",
    "cta.desc": `${BRAND} está hecho para escalar. ¿Listo para crecer?`,
    "cta.button": `Obtén ${BRAND} ahora`,
    "footer.tagline": "La plantilla Next.js definitiva para aplicaciones web modernas.",
    "footer.platform": "Plataforma",
    "footer.landing": "Landing Pages",
    "footer.company": "Empresa",
    "footer.rights": "Todos los derechos reservados. Las marcas pertenecen a sus respectivos propietarios.",
  },
} as const;

export type DictKey = keyof (typeof dict)["en"];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: DictKey) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => dict.en[k],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "es" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  }, []);

  const t = useCallback((k: DictKey) => dict[lang][k] ?? dict.en[k], [lang]);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
