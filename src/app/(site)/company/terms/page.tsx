import type { Metadata } from "next";
import { TermsPage } from "@/components/company/pages";

export const metadata: Metadata = { title: "Terms of Service" };

export default function Page() {
  return <TermsPage />;
}
