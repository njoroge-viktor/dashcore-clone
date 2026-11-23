import type { Metadata } from "next";
import { FaqsPage } from "@/components/company/pages";

export const metadata: Metadata = { title: "FAQs" };

export default function Page() {
  return <FaqsPage />;
}
