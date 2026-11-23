"use client";

import { notFound } from "next/navigation";
import { ShowcaseHeader } from "./ShowcaseShell";
import { ButtonsDemo, CardsDemo, ChartsDemo, IconsDemo, LogosDemo, TestimonialsDemo, TokensDemo, TypographyDemo } from "./demosA";
import { AccordionsDemo, CarouselDemo, FeedbackDemo, FootersDemo, FormsDemo, NavigationDemo, PatternsDemo, PricingDemo, SectionsDemo } from "./demosB";
import { AnimationsDemo, EffectsDemo, MockupsDemo } from "./demosC";
import { showcaseItems } from "@/lib/data";

const registry: Record<string, () => React.ReactElement> = {
  typography: TypographyDemo, buttons: ButtonsDemo, "design-tokens": TokensDemo, icons: IconsDemo,
  cards: CardsDemo, charts: ChartsDemo, testimonials: TestimonialsDemo, logos: LogosDemo,
  footers: FootersDemo, navigation: NavigationDemo, sections: SectionsDemo, patterns: PatternsDemo,
  forms: FormsDemo, accordions: AccordionsDemo, carousel: CarouselDemo, feedback: FeedbackDemo, pricing: PricingDemo,
  animations: AnimationsDemo, effects: EffectsDemo, mockups: MockupsDemo,
};

export default function ShowcaseView({ slug }: { slug: string }) {
  const item = showcaseItems.find((s) => s.slug === slug);
  const C = registry[slug];
  if (!item || !C) notFound();
  return (
    <>
      <ShowcaseHeader title={item.title} desc={item.desc} />
      <C />
    </>
  );
}
