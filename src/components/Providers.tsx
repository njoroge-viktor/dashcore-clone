"use client";

import { LanguageProvider } from "@/lib/i18n";
import { ToastProvider } from "./interactive";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ToastProvider>{children}</ToastProvider>
    </LanguageProvider>
  );
}
