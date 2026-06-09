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

const ST_LINES = ["s&t", "sabotaje y terrorismo", "sabotage & terrorism", "sabotaje y terrorismo (s&t)"];

type ViewRow = {
  id: string | number;
  insured: string | null;
  broker_name: string | null;
  broker_canonical: string | null;
  line_of_business: string | null;
  is_joint_review_request: boolean | null;
  has_slip: boolean | null;
  has_sov: boolean | null;
  has_loss_data: boolean | null;
  docs_received: number | null;
  compliance_status: string | null;
  compliance_evidence_path: string | null;
};

function mapRow(r: ViewRow): ReviewRow {
  const ofac = r.compliance_status === "clear" ? "clear" : r.compliance_status === "hit" ? "hit" : "review";
  return {
    id: String(r.id),
    insured: r.insured ?? "—",
    broker_name: r.broker_canonical ?? r.broker_name,
    line_of_business: r.line_of_business,
    commercial: r.is_joint_review_request ? "met" : "missing",
    slip: r.has_slip ? "met" : "missing",
    sov: r.has_sov ? "met" : "missing",
    loss: r.has_loss_data ? "met" : "missing",
    ofac,
    ofac_evidence_path: r.compliance_evidence_path,
    docs_count: r.docs_received ?? 0,
  };
}

const GREEN = { bg: "#d6f0e6", fg: "#0f6e56" };
const AMBER = { bg: "#f7e8c8", fg: "#8a5a00" };
const RED = { bg: "#fde4e1", fg: "#b42318" };
function tone(s: string) { return s === "met" || s === "clear" ? GREEN : s === "partial" || s === "review" ? AMBER : RED; }

function KV({ k, v, muted }: { k: string; v: string; muted?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "7px 0", borderBottom: "1px solid #eef2f8" }}>
      <span style={{ fontSize: "0.78rem", color: "#64748b" }}>{k}</span>
      <span className={muted ? "" : "text-primary"} style={{ fontSize: "0.82rem", fontWeight: muted ? 400 : 600, color: muted ? "#94a3b8" : undefined, textAlign: "right" }}>{v}</span>
    </div>
  );
}

function StatusRow({ label, state, note }: { label: string; state: string; note: string }) {
  const t = tone(state);
  const ok = state === "met" || state === "clear";
  const partial = state === "partial" || state === "review";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #eef2f8" }}>
      <span style={{ width: 20, height: 20, borderRadius: 6, background: t.bg, color: t.fg, fontSize: "0.7rem", fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        {ok ? "✓" : partial ? "◐" : "✕"}
      </span>
      <span className="text-primary" style={{ fontSize: "0.82rem", fontWeight: 600, flex: 1 }}>{label}</span>
      <span style={{ fontSize: "0.74rem", color: t.fg }}>{note}</span>
    </div>
  );
}

function PanelCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card" style={{ border: "1px solid #d9e2f0", borderRadius: 16, padding: "18px 20px" }}>
      {children}
    </div>
  );
}

function CaseDetailPanel({ row, locale }: { row: ReviewRow | null; locale: string }) {
  if (!row) {
    return (
      <PanelCard>
        <p className="text-secondary" style={{ fontSize: "0.85rem" }}>
          {pick(locale, "Selecciona un caso de la izquierda para ver su información.", "Select a case on the left to see its details.", "请在左侧选择一个案件查看详情。")}
        </p>
      </PanelCard>
    );
  }
  const pend = pick(locale, "Pendiente de captura", "Pending capture", "待采集");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <PanelCard>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", color: "#2f6fb3" }}>
              {pick(locale, "CAPTURA DEL SLIP", "SLIP CAPTURE", "SLIP 采集").toUpperCase()}
            </p>
            <h2 className="text-primary" style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: 4 }}>{row.insured}</h2>
            <p className="text-secondary" style={{ fontSize: "0.84rem", marginTop: 2 }}>
              {[row.broker_name, row.line_of_business].filter(Boolean).join(" · ")}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "0.66rem", color: "#94a3b8" }}>{pick(locale, "Prima", "Premium", "保费")}</p>
            <p className="text-primary" style={{ fontSize: "0.95rem", fontWeight: 700 }}>—</p>
          </div>
        </div>
      </PanelCard>

      <PanelCard>
        <h3 className="text-primary" style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 6 }}>
          {pick(locale, "Datos del riesgo", "Risk details", "风险信息")}
        </h3>
        <KV k={pick(locale, "Asegurado", "Insured", "被保险人")} v={row.insured} />
        <KV k={pick(locale, "Broker", "Broker", "经纪人")} v={row.broker_name ?? "—"} />
        <KV k={pick(locale, "Línea", "Line", "险种")} v={row.line_of_business ?? "—"} />
        <KV k={pick(locale, "País", "Country", "国家")} v={pend} muted />
        <KV k={pick(locale, "Vigencia", "Effective", "生效日期")} v={pend} muted />
        <KV k={pick(locale, "Límite asegurado", "Insured limit", "保额")} v={pend} muted />
        <KV k={pick(locale, "Prima", "Premium", "保费")} v={pend} muted />
      </PanelCard>

      <PanelCard>
        <h3 className="text-primary" style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 6 }}>
          {pick(locale, "Información capturada del slip", "Captured from slip", "从 Slip 采集")}
        </h3>
        <StatusRow label={pick(locale, "Slip recibido", "Slip received", "已收到 Slip")} state={row.slip} note={row.slip === "met" ? pick(locale, "Sí", "Yes", "是") : pick(locale, "Falta", "Missing", "缺失")} />
        <StatusRow label={pick(locale, "SOV / relación de valores", "SOV / statement of values", "标的清单")} state={row.sov ?? "missing"} note={row.sov === "met" ? pick(locale, "Sí", "Yes", "是") : pick(locale, "Falta", "Missing", "缺失")} />
        <StatusRow label={pick(locale, "Siniestralidad", "Loss data", "理赔数据")} state={row.loss} note={row.loss === "met" ? pick(locale, "Sí", "Yes", "是") : pick(locale, "Falta", "Missing", "缺失")} />
        <StatusRow label={pick(locale, "OFAC", "OFAC", "OFAC")} state={row.ofac} note={row.ofac === "clear" ? pick(locale, "Limpio", "Clear", "通过") : row.ofac === "review" ? pick(locale, "Revisar", "Review", "待审") : pick(locale, "Alerta", "Hit", "命中")} />
        <p className="text-secondary" style={{ fontSize: "0.72rem", marginTop: 10 }}>
          {pick(locale, "La extracción automática de campos del slip se conectará próximamente.", "Automatic slip field extraction will be connected soon.", "Slip 字段的自动提取即将接入。")}
        </p>
      </PanelCard>
    </div>
  );
}

function DecisionPanel({ row, locale }: { row: ReviewRow | null; locale: string }) {
  const actions = [
    { key: "participate", label: pick(locale, "Participar", "Participate", "参与"), desc: pick(locale, "Avanzar a cotización", "Move to quote", "进入报价"), color: GREEN.fg, border: "#bfe4d3" },
    { key: "request", label: pick(locale, "Pedir info", "Request info", "请求信息"), desc: pick(locale, "Solicitar datos faltantes al broker", "Ask the broker for missing data", "向经纪人索取缺失信息"), color: AMBER.fg, border: "#ecd6a6" },
    { key: "decline", label: pick(locale, "Declinar", "Decline", "拒绝"), desc: pick(locale, "Rechazar y notificar al broker", "Decline and notify the broker", "拒绝并通知经纪人"), color: RED.fg, border: "#f0c8c2" },
    { key: "assign", label: pick(locale, "Asignar", "Assign", "分配"), desc: pick(locale, "Asignar a un suscriptor", "Assign to an underwriter", "分配给核保人"), color: "#2f6fb3", border: "#bcd4ef" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 320 }}>
      <PanelCard>
        <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", color: "#2f6fb3" }}>
          {pick(locale, "DECISIÓN", "DECISION", "决策").toUpperCase()}
        </p>
        <h3 className="text-primary" style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 4 }}>
          {pick(locale, "Acciones sobre el riesgo", "Actions on this risk", "针对该风险的操作")}
        </h3>
        <p className="text-secondary" style={{ fontSize: "0.78rem", marginTop: 4 }}>
          {row ? row.insured : pick(locale, "Sin caso seleccionado", "No case selected", "未选择案件")}
        </p>
      </PanelCard>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {actions.map((a) => (
          <button
            key={a.key}
            type="button"
            disabled={!row}
            title={pick(locale, "Próximamente", "Coming soon", "即将上线")}
            className="bg-card"
            style={{ textAlign: "left", border: `1px solid ${a.border}`, borderRadius: 14, padding: "12px 14px", cursor: row ? "pointer" : "default", opacity: row ? 1 : 0.55 }}
          >
            <div className="text-primary" style={{ fontSize: "0.9rem", fontWeight: 700, color: a.color }}>{a.label}</div>
            <div className="text-secondary" style={{ fontSize: "0.74rem", marginTop: 2 }}>{a.desc}</div>
          </button>
        ))}
      </div>

      <PanelCard>
        <h3 className="text-primary" style={{ fontSize: "0.84rem", fontWeight: 700, marginBottom: 8 }}>
          {pick(locale, "Notas internas", "Internal notes", "内部备注")}
        </h3>
        <textarea
          disabled
          placeholder={pick(locale, "Escribe una nota: qué falta, qué validaste y el siguiente paso.", "Write a note: what's missing, what you validated and the next step.", "写下备注：缺什么、已验证什么、下一步。")}
          className="bg-card text-primary"
          style={{ width: "100%", minHeight: 80, border: "1px solid #d9e2f0", borderRadius: 10, padding: "10px 12px", fontSize: "0.8rem", outline: "none", resize: "vertical" }}
        />
        <p className="text-secondary" style={{ fontSize: "0.7rem", marginTop: 8 }}>
          {pick(locale, "Estas acciones se conectarán próximamente.", "These actions will be wired soon.", "这些操作即将接入。")}
        </p>
      </PanelCard>
    </div>
  );
}

export default function SabotajeTerrorismoPage() {
  const { locale } = useI18n();
  const [rows, setRows] = useState<ReviewRow[] | null>(null);
  const [selected, setSelected] = useState<ReviewRow | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data, error } = await supabase
          .from("dashboard_submissions_table")
          .select("id,insured,broker_name,broker_canonical,line_of_business,is_joint_review_request,has_slip,has_sov,has_loss_data,docs_received,compliance_status,compliance_evidence_path")
          .eq("decision", "REVIEW")
          .eq("decision_reason", "Disponible para revisión")
          .eq("is_joint_review_request", true);
        if (error) throw error;
        const filtered = (data as ViewRow[]).filter(
          (r) => r.line_of_business != null && ST_LINES.includes(r.line_of_business.trim().toLowerCase())
        );
        const mapped = filtered.map(mapRow);
        if (active) { setRows(mapped); setSelected(mapped[0] ?? null); }
      } catch (e: any) {
        if (active) setError(e?.message ?? "Error");
      }
    })();
    return () => { active = false; };
  }, []);

  const kicker = pick(locale, "Heath · Suscripción", "Heath · Underwriting", "Heath · 核保");
  const title = pick(locale, "Sabotaje y Terrorismo", "Sabotage & Terrorism", "破坏与恐怖主义");
  const subtitle = pick(locale, "Negocios disponibles para revisión conjunta. Selecciona un caso para ver su slip y decidir.", "Businesses available for joint review. Select a case to see its slip and decide.", "可联合核保的业务。选择案件查看 Slip 并决策。");
  const back = pick(locale, "Suscripción", "Underwriting", "核保");
  const loading = pick(locale, "Cargando…", "Loading…", "加载中…");
  const empty = pick(locale, "Aún no hay negocios disponibles para revisión en esta línea.", "No businesses available for review in this line yet.", "该险种暂无可核保的业务。");

  return (
    <div className="dashboard-theme min-h-screen bg-transparent">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
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
        ) : rows === null ? (
          <p className="text-sm text-secondary">{loading}</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-secondary">{empty}</p>
        ) : (
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
            <InboxReviewPanel rows={rows} selectedId={selected?.id} onSelect={setSelected} />
            <div style={{ flex: 1, minWidth: 340 }}>
              <CaseDetailPanel row={selected} locale={locale} />
            </div>
            <DecisionPanel row={selected} locale={locale} />
          </div>
        )}
      </div>
    </div>
  );
}
