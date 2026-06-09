"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

function pick(locale: string, es: string, en: string, zh: string) {
  return locale === "es" ? es : locale === "zh" ? zh : en;
}

type Binder = {
  name: string; capacity_provider: string | null; agreement_ref: string | null;
  inception: string | null; expiry: string | null; base_currency: string | null;
  max_any_one_risk: number | null; aggregate_limit: number | null; commission_pct: number | null;
  brokerage_pct: number | null; classes: string | null; territories: string | null;
  exclusions: string | null; reporting: string | null; status: string | null; notes: string | null;
};
type Rule = { line_of_business: string | null; country: string | null; currency: string | null; max_insured_limit: number | null; is_allowed: boolean | null; reason: string | null };

function money(n: number | null | undefined, cur?: string | null) {
  if (n == null) return "—";
  try { return new Intl.NumberFormat("es-CO", { style: "currency", currency: cur || "USD", maximumFractionDigits: 0 }).format(n); }
  catch { return `${cur || ""} ${n.toLocaleString("es-CO")}`.trim(); }
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "8px 0", borderBottom: "1px solid #eef2f8" }}>
      <span style={{ fontSize: "0.78rem", color: "#64748b" }}>{k}</span>
      <span className="text-primary" style={{ fontSize: "0.82rem", fontWeight: 600, textAlign: "right", maxWidth: "62%" }}>{v}</span>
    </div>
  );
}

export default function BinderAuthorityPage() {
  const { locale } = useI18n();
  const [binder, setBinder] = useState<Binder | null>(null);
  const [rules, setRules] = useState<Rule[]>([]);
  const [q, setQ] = useState("");
  const [onlyAllowed, setOnlyAllowed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const [b, r] = await Promise.all([
          supabase.from("binder_authority").select("*").eq("status", "active").limit(1).maybeSingle(),
          supabase.from("binder_authority_rules").select("line_of_business,country,currency,max_insured_limit,is_allowed,reason").order("line_of_business", { ascending: true }).order("country", { ascending: true }),
        ]);
        if (b.error) throw b.error;
        if (r.error) throw r.error;
        if (active) { setBinder(b.data as Binder); setRules((r.data ?? []) as Rule[]); setLoading(false); }
      } catch (e: any) { if (active) { setError(e?.message ?? "Error"); setLoading(false); } }
    })();
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return rules.filter((r) =>
      (!onlyAllowed || r.is_allowed) &&
      (s === "" || [r.country, r.line_of_business, r.currency].filter(Boolean).some((v) => (v as string).toLowerCase().includes(s)))
    );
  }, [rules, q, onlyAllowed]);

  const kicker = pick(locale, "Heath · Suscripción", "Heath · Underwriting", "Heath · 核保");
  const title = pick(locale, "Binder Authority", "Binder Authority", "承保授权");
  const subtitle = pick(locale, "Tu autoridad delegada: el margen con el que puedes cotizar sin referir.", "Your delegated authority: the margin you can quote within without referral.", "你的委托授权：无需上报即可报价的范围。");
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
            <Link href="/suscripcion" className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-2 text-sm font-semibold text-primary transition-colors hover:border-[#4a9eff]">← {back}</Link>
            <LanguageSwitcher />
          </div>
        </header>

        {error ? (
          <p className="text-sm text-secondary">{error}</p>
        ) : loading ? (
          <p className="text-sm text-secondary">{pick(locale, "Cargando…", "Loading…", "加载中…")}</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Header / guide */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div className="bg-card" style={{ flex: "1 1 360px", border: "1px solid #d9e2f0", borderRadius: 16, padding: "18px 20px" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", color: "#2f6fb3" }}>{pick(locale, "ACUERDO", "AGREEMENT", "协议")}</p>
                <h2 className="text-primary" style={{ fontSize: "1.15rem", fontWeight: 700, marginTop: 2 }}>{binder?.name}</h2>
                <div style={{ marginTop: 10 }}>
                  <KV k={pick(locale, "Capacidad", "Capacity provider", "承保方")} v={binder?.capacity_provider ?? "—"} />
                  <KV k={pick(locale, "Referencia", "Reference", "编号")} v={binder?.agreement_ref ?? "—"} />
                  <KV k={pick(locale, "Vigencia", "Period", "期间")} v={`${binder?.inception ?? "—"} → ${binder?.expiry ?? "—"}`} />
                  <KV k={pick(locale, "Clases", "Classes", "险类")} v={binder?.classes ?? "—"} />
                  <KV k={pick(locale, "Comisión", "Commission", "佣金")} v={binder?.commission_pct != null ? `${binder.commission_pct}%` : "—"} />
                  <KV k={pick(locale, "Corretaje", "Brokerage", "经纪费")} v={binder?.brokerage_pct != null ? `${binder.brokerage_pct}%` : "—"} />
                </div>
              </div>
              <div className="bg-card" style={{ flex: "1 1 300px", border: "1px solid #bfe4d3", borderRadius: 16, padding: "18px 20px", background: "#f3fbf7" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", color: "#0f6e56" }}>{pick(locale, "TU MARGEN", "YOUR MARGIN", "你的范围")}</p>
                <p style={{ fontSize: "0.74rem", color: "#0f6e56", marginTop: 4 }}>{pick(locale, "Máximo por riesgo (sin referir)", "Max any one risk (no referral)", "单一风险上限")}</p>
                <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f6e56", marginTop: 2 }}>{money(binder?.max_any_one_risk, binder?.base_currency)}</p>
                <div style={{ marginTop: 8 }}>
                  <KV k={pick(locale, "Agregado anual", "Annual aggregate", "年度累计")} v={money(binder?.aggregate_limit, binder?.base_currency)} />
                </div>
                <p className="text-secondary" style={{ fontSize: "0.7rem", marginTop: 8 }}>{pick(locale, "Por encima de este límite, o fuera de clase/territorio → fuera de binder (referir).", "Above this limit, or outside class/territory → outside binder (refer).", "超过此上限或超出险类/地区 → 超出授权（需上报）。")}</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div className="bg-card" style={{ flex: "1 1 320px", border: "1px solid #d9e2f0", borderRadius: 16, padding: "16px 20px" }}>
                <p className="text-primary" style={{ fontSize: "0.82rem", fontWeight: 700, marginBottom: 6 }}>{pick(locale, "Territorios", "Territories", "地区")}</p>
                <p className="text-secondary" style={{ fontSize: "0.78rem", lineHeight: 1.4 }}>{binder?.territories ?? "—"}</p>
              </div>
              <div className="bg-card" style={{ flex: "1 1 320px", border: "1px solid #d9e2f0", borderRadius: 16, padding: "16px 20px" }}>
                <p className="text-primary" style={{ fontSize: "0.82rem", fontWeight: 700, marginBottom: 6 }}>{pick(locale, "Exclusiones del binder", "Binder exclusions", "授权除外")}</p>
                <p className="text-secondary" style={{ fontSize: "0.78rem", lineHeight: 1.4 }}>{binder?.exclusions ?? "—"}</p>
              </div>
              <div className="bg-card" style={{ flex: "1 1 320px", border: "1px solid #d9e2f0", borderRadius: 16, padding: "16px 20px" }}>
                <p className="text-primary" style={{ fontSize: "0.82rem", fontWeight: 700, marginBottom: 6 }}>{pick(locale, "Reporting", "Reporting", "报告")}</p>
                <p className="text-secondary" style={{ fontSize: "0.78rem", lineHeight: 1.4 }}>{binder?.reporting ?? "—"}</p>
              </div>
            </div>

            {/* Grid */}
            <div className="bg-card" style={{ border: "1px solid #d9e2f0", borderRadius: 16, padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
                <p className="text-primary" style={{ fontSize: "0.92rem", fontWeight: 700 }}>{pick(locale, "Grilla de autoridad (país · línea · límite)", "Authority grid (country · line · limit)", "授权网格")}</p>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <label style={{ fontSize: "0.74rem", color: "#64748b", display: "flex", gap: 5, alignItems: "center", cursor: "pointer" }}>
                    <input type="checkbox" checked={onlyAllowed} onChange={(e) => setOnlyAllowed(e.target.checked)} style={{ accentColor: "#2f6fb3" }} />
                    {pick(locale, "Solo permitidos", "Allowed only", "仅允许")}
                  </label>
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={pick(locale, "Buscar país / línea / moneda…", "Search country / line / currency…", "搜索…")} className="bg-card text-primary" style={{ border: "1px solid #d9e2f0", borderRadius: 999, padding: "7px 14px", fontSize: "0.8rem", outline: "none", minWidth: 240 }} />
                </div>
              </div>
              <div style={{ maxHeight: 460, overflow: "auto", border: "1px solid #eef2f8", borderRadius: 10 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                  <thead>
                    <tr style={{ position: "sticky", top: 0, background: "#f4f8fb" }}>
                      {[pick(locale, "Línea", "Line", "险种"), pick(locale, "País", "Country", "国家"), pick(locale, "Moneda", "Currency", "货币"), pick(locale, "Límite máx.", "Max limit", "限额"), pick(locale, "Estado", "Status", "状态")].map((h, i) => (
                        <th key={i} style={{ textAlign: i >= 3 ? "right" : "left", padding: "8px 12px", color: "#64748b", fontWeight: 700, borderBottom: "1px solid #d9e2f0", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td className="text-primary" style={{ padding: "7px 12px", fontWeight: 600 }}>{r.line_of_business}</td>
                        <td className="text-primary" style={{ padding: "7px 12px" }}>{r.country}</td>
                        <td className="text-secondary" style={{ padding: "7px 12px" }}>{r.currency}</td>
                        <td className="text-primary" style={{ padding: "7px 12px", textAlign: "right", whiteSpace: "nowrap" }}>{r.is_allowed ? money(r.max_insured_limit, r.currency) : "—"}</td>
                        <td style={{ padding: "7px 12px", textAlign: "right", whiteSpace: "nowrap" }}>
                          <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: 6, background: r.is_allowed ? "#d6f0e6" : "#fde4e1", color: r.is_allowed ? "#0f6e56" : "#b42318" }}>
                            {r.is_allowed ? pick(locale, "Permitido", "Allowed", "允许") : pick(locale, "Fuera", "Out", "超出")}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={5} className="text-secondary" style={{ padding: "16px", textAlign: "center" }}>{pick(locale, "Sin resultados.", "No results.", "无结果。")}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <p className="text-secondary" style={{ fontSize: "0.7rem", marginTop: 8 }}>{filtered.length} {pick(locale, "filas", "rows", "行")} · {pick(locale, "Esta grilla alimenta la decisión 'Fuera de binder authority' del workflow.", "This grid drives the workflow's 'Outside binder authority' decision.", "此网格驱动工作流的'超出授权'判定。")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
