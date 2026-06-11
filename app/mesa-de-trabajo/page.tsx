"use client";

import Link from "next/link";
import { useI18n } from "@/components/providers/LanguageProvider";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";

export default function MesaDeTrabajoPage() {
  const { dict } = useI18n();
  return (
    <MarketingPageLayout title={dict.pages.mesa.title} subtitle={dict.pages.mesa.subtitle}>
      <div className="space-y-8 text-secondary">
        <div className="space-y-3">
          <p className="text-lg">{dict.pages.mesa.p1}</p>
          <p className="text-secondary">{dict.pages.mesa.p2}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {dict.pages.mesa.cards.map((item) => (
            <FeatureCard key={item.title} title={item.title} description={item.description} />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/iniciar-sesion?redirect=/dashboard"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#1a70f7] to-[#2b8af9] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_32px_rgba(26,112,247,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_44px_rgba(26,112,247,0.65)] active:scale-[0.98]"
          >
            <span className="home-sheen absolute inset-0" aria-hidden />
            <span className="relative">{dict.pages.mesa.primary}</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:text-white active:scale-[0.98]"
          >
            {dict.pages.mesa.secondary}
          </Link>
        </div>
      </div>
    </MarketingPageLayout>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.14] bg-white/[0.06] p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-cyan-400/30">
      <div className="text-sm font-bold text-white">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-white/[0.62]">{description}</div>
    </div>
  );
}
