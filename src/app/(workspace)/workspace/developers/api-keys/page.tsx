import type { Metadata } from "next";
import { ApiKeysPage } from "@/components/workspace/pages";

export const metadata: Metadata = { title: "API keys", robots: { index: false } };

export default function Page() {
  return <ApiKeysPage />;
}
