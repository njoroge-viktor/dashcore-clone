import type { Metadata } from "next";
import { WhyPage } from "@/components/company/pages";

export const metadata: Metadata = { title: "Why Corevia" };

export default function Page() {
  return <WhyPage />;
}
