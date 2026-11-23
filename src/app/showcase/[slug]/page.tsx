import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShowcaseView from "@/components/showcase/ShowcaseView";
import { showcaseItems } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return showcaseItems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = showcaseItems.find((x) => x.slug === slug);
  return s ? { title: `${s.title} — Showcase`, description: s.desc } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!showcaseItems.some((s) => s.slug === slug)) notFound();
  return <ShowcaseView slug={slug} />;
}
