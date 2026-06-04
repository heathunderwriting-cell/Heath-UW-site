"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UnderwritingWorkbench } from "@/components/dashboard/UnderwritingWorkbench";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/components/providers/LanguageProvider";
import type { DashboardData } from "@/lib/dashboard/fetch-dashboard";

function pick(locale: string, es: string, en: string, zh: string) {
  return locale === "es" ? es : locale === "zh" ? zh : en;
}

const TITLES: Record<string, { es: string; en: string; zh: string }> = {
  "sabotaje-terrorismo": { es: "Sabotaje y Terrorismo", en: "Sabotage & Terrorism", zh: "破坏与恐怖主义" },
  property: { es: "Property", en: "Property", zh: "财产险" },
  marine: { es: "Marine", en: "Marine", zh: "海事险" },
  "lineas-financieras": { es: "Líneas financieras", en: "Financial Lines", zh: "金融险" },
  aviation: { es: "Aviation", en: "Aviation", zh: "航空险" },
};

export function ProductWorkbench({ title: fallbackTitle, data }: { title: string; data: DashboardData }) {
  const { locale } = useI18n();
  const pathname = usePathname();
  const key = (pathname || "").split("/").filter(Boolean).pop() || "";
  const t = TITLES[key];
  const title = t ? pick(locale, t.es, t.en, t.zh) : fallbackTitle;
  const kicker = pick(locale, "Heath · Suscripción", "Heath · Underwriting", "Heath · 核保");
  const backLabel = pick(locale, "Suscripción", "Underwriting", "核保");
  const subtitle = pick(
    locale,
    "Mesa de trabajo: cola, filtros y priorización de submissions.",
    "Workbench: queue, filters and submission prioritization.",
    "工作台：队列、筛选与提交优先级。"
  );

  return (
    <div className="dashboard-theme min-h-screen bg-transparent">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-border/60 pb-5">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
              {kicker}
            </p>
            <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-primary sm:text-[1.65rem]">{title}</h1>
            <p className="mt-1 max-w-2xl text-sm leading-snug text-secondary">{subtitle}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Link
              href="/suscripcion"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-2 text-sm font-semibold text-primary transition-colors hover:border-[#4a9eff]"
            >
              ← {backLabel}
            </Link>
            <LanguageSwitcher />
          </div>
        </header>
        <UnderwritingWorkbench sourceSubmissions={data.submissions} />
      </div>
    </div>
  );
}
