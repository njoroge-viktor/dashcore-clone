"use client";

import { notFound } from "next/navigation";
import { LandingPage } from "./blocks";
import { landingBySlug } from "@/lib/landings";

export default function LandingBySlug({ slug }: { slug: string }) {
  const config = landingBySlug(slug);
  if (!config) notFound();
  return <LandingPage config={config} />;
}
