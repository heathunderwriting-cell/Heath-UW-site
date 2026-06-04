"use client";

import Link from "next/link";
import { UnderwritingWorkbench } from "@/components/dashboard/UnderwritingWorkbench";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/components/providers/LanguageProvider";
import type { DashboardData } from "@/lib/dashboard/fetch-dashboard";

export function ProductWorkbench({ title, data }: { title: string; data: DashboardData }) {
  const { locale } = useI18n();
  const backLabel = locale === "es" ? "Underwriting" : locale === "zh" ? "核保" : "Underwriting";
  const subtitle =
    locale === "es"
      ? "Mesa de trabajo: cola, filtros y priorización de submissions."
      : locale === "zh"
      ? "工作台：队列、筛选与提交优先级。"
      : "Workbench: queue, filters and submission prioritization.";

  return (
    <div className="dashboard-theme min-h-screen bg-transparent">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-border/60 pb-5">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
              HEATH · UNDERWRITING
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
