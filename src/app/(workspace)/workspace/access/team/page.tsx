import type { Metadata } from "next";
import { TeamPage } from "@/components/workspace/pages";

export const metadata: Metadata = { title: "Team access", robots: { index: false } };

export default function Page() {
  return <TeamPage />;
}
