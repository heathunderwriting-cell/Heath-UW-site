"use client";

import Link from "next/link";
import { useI18n } from "@/components/providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { InboxReviewPanel } from "@/components/dashboard/InboxReviewPanel";

function pick(locale: string, es: string, en: string, zh: string) {
  return locale === "es" ? es : locale === "zh" ? zh : en;
}

export default function InboxPreviewPage() {
  const { locale } = useI18n();
  const kicker = pick(locale, "Heath · Suscripción", "Heath · Underwriting", "Heath · 核保");
  const title = pick(locale, "Inbox y revisión (preview)", "Inbox & review (preview)", "收件箱与核保（预览）");
  const subtitle = pick(
    locale,
    "Vista previa con datos de ejemplo. Aún sin conectar a n8n / Supabase.",
    "Preview with sample data. Not yet connected to n8n / Supabase.",
    "示例数据预览，尚未连接 n8n / Supabase。"
  );
  const back = pick(locale, "Suscripción", "Underwriting", "核保");

  return (
    <div className="dashboard-theme min-h-screen bg-transparent">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-border/60 pb-5">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">{kicker}</p>
            <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-primary sm:text-[1.65rem]">{title}</h1>
            <p className="mt-1 max-w-2xl text-sm leading-snug text-secondary">{subtitle}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Link
              href="/suscripcion"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-2 text-sm font-semibold text-primary transition-colors hover:border-[#4a9eff]"
            >
              ← {back}
            </Link>
            <LanguageSwitcher />
          </div>
        </header>
        <InboxReviewPanel />
      </div>
    </div>
  );
}
