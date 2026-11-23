import type { Metadata } from "next";
import { TestimonialsPage } from "@/components/company/pages";

export const metadata: Metadata = { title: "Testimonials" };

export default function Page() {
  return <TestimonialsPage />;
}
