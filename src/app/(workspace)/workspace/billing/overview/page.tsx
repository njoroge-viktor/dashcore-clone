import type { Metadata } from "next";
import { BillingPage } from "@/components/workspace/pages";

export const metadata: Metadata = { title: "Billing", robots: { index: false } };

export default function Page() {
  return <BillingPage />;
}
