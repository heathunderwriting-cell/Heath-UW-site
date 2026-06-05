"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { InboxReviewPanel, type ReviewRow } from "@/components/dashboard/InboxReviewPanel";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

function pick(locale: string, es: string, en: string, zh: string) {
  return locale === "es" ? es : locale === "zh" ? zh : en;
}

type ViewRow = {
  id: string | number;
  insured: string | null;
  broker_name: string | null;
  line_of_business: string | null;
  commercial_decision: boolean | null;
  has_slip: boolean | null;
  has_loss_data: boolean | null;
  docs_received: number | null;
  compliance_status: string | null;
};

function mapRow(r: ViewRow): ReviewRow {
  const ofac =
    r.compliance_status === "clear" ? "clear" : r.compliance_status === "hit" ? "hit" : "review";
  return {
    id: String(r.id),
    insured: r.insured ?? "—",
    broker_name: r.broker_name,
    line_of_business: r.line_of_business,
    commercial: r.commercial_decision ? "met" : "missing",
    slip: r.has_slip ? "met" : "missing",
    loss: r.has_loss_data ? "met" : "missing",
    ofac,
    docs_count: r.docs_received ?? 0,
  };
}

export default function InboxPreviewPage() {
  const { locale } = useI18n();
  const [rows, setRows] = useState<ReviewRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data, error } = await supabase
          .from("dashboard_submissions_table")
          .select(
            "id,insured,broker_name,line_of_business,commercial_decision,has_slip,has_loss_data,docs_received,compliance_status"
          );
        if (error) throw error;
        if (active) setRows((data as ViewRow[]).map(mapRow));
      } catch (e: any) {
        if (active) setError(e?.message ?? "Error");
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const kicker = pick(locale, "Heath · Suscripción", "Heath · Underwriting", "Heath · 核保");
  const title = pick(locale, "Inbox y revisión", "Inbox & review", "收件箱与核保");
  const subtitle = pick(
    locale,
    "Datos en vivo desde Supabase. Los flags se llenan vía n8n.",
    "Live data from Supabase. Flags populated via n8n.",
    "来自 Supabase 的实时数据，标记由 n8n 填充。"
  );
  const back = pick(locale, "Suscripción", "Underwriting", "核保");
  const loading = pick(locale, "Cargando…", "Loading…", "加载中…");

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

        {error ? (
          <p className="text-sm text-secondary">{error}</p>
        ) : rows === null ? (
          <p className="text-sm text-secondary">{loading}</p>
        ) : (
          <InboxReviewPanel rows={rows} />
        )}
      </div>
    </div>
  );
}
