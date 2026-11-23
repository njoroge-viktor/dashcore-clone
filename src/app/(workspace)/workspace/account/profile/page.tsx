import type { Metadata } from "next";
import { ProfilePage } from "@/components/workspace/pages";

export const metadata: Metadata = { title: "Account settings", robots: { index: false } };

export default function Page() {
  return <ProfilePage />;
}
