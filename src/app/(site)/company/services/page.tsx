import type { Metadata } from "next";
import { ServicesPage } from "@/components/company/pages";

export const metadata: Metadata = { title: "Services" };

export default function Page() {
  return <ServicesPage />;
}
