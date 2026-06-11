"use client";

import { useI18n } from "@/components/providers/LanguageProvider";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";

export default function EmpresaPage() {
  const { dict } = useI18n();
  return (
    <MarketingPageLayout title={dict.pages.empresa.title} subtitle={dict.pages.empresa.subtitle}>
      <div className="space-y-8 text-white/[0.68]">
        <p>{dict.pages.empresa.intro}</p>
        <div className="rounded-2xl border border-white/[0.14] bg-white/[0.06] p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white">{dict.pages.empresa.upcoming}</h2>
          <p className="mt-2 text-sm leading-relaxed">{dict.pages.empresa.upcomingItems}</p>
        </div>
      </div>
    </MarketingPageLayout>
  );
}
