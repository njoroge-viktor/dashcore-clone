import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingBySlug from "@/components/landing/LandingBySlug";
import { landings } from "@/lib/landings";

export const dynamicParams = false;

export function generateStaticParams() {
  return landings.map((l) => ({ landing: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ landing: string }> }): Promise<Metadata> {
  const { landing } = await params;
  const l = landings.find((x) => x.slug === landing);
  return l ? { title: l.name, description: l.description } : {};
}

export default async function Page({ params }: { params: Promise<{ landing: string }> }) {
  const { landing } = await params;
  if (!landings.some((l) => l.slug === landing)) notFound();
  return <LandingBySlug slug={landing} />;
}
