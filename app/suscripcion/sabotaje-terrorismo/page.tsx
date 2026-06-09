"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { InboxReviewPanel, type ReviewRow } from "@/components/dashboard/InboxReviewPanel";
import { ClauseSelector } from "@/components/dashboard/ClauseSelector";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

function pick(locale: string, es: string, en: string, zh: string) {
  return locale === "es" ? es : locale === "zh" ? zh : en;
}

const ST_LINES = ["s&t", "sabotaje y terrorismo", "sabotage & terrorism", "sabotaje y terrorismo (s&t)"];

type CaseRow = ReviewRow & {
  country?: string | null;
  currency?: string | null;
  insured_limit?: number | null;
  uw_stage?: string | null;
  assigned_to?: string | null;
};

type DeclineReason = { code: string; label: string };
const DEFAULT_REASONS: DeclineReason[] = [
  { code: "fuera_apetito", label: "Fuera de apetito" },
  { code: "compromiso_otro_canal", label: "Compromiso con otro canal" },
  { code: "mercado_vigente", label: "Mercado vigente" },
  { code: "fuera_binder", label: "Fuera de binder authority" },
  { code: "ofac_hit", label: "Hallazgo en lista OFAC" },
  { code: "siniestralidad_alta", label: "Siniestralidad alta" },
  { code: "otro", label: "Otro" },
];

type ViewRow = {
  id: string | number; insured: string | null; broker_name: string | null; broker_canonical: string | null;
  line_of_business: string | null; country: string | null; currency: string | null; insured_limit: number | null;
  is_joint_review_request: boolean | null; has_slip: boolean | null; has_sov: boolean | null; has_loss_data: boolean | null;
  docs_received: number | null; compliance_status: string | null; compliance_evidence_path: string | null;
  uw_stage: string | null; assigned_to: string | null;
};

function mapRow(r: ViewRow): CaseRow {
  const ofac = r.compliance_status === "clear" ? "clear" : r.compliance_status === "hit" ? "hit" : "review";
  return {
    id: String(r.id), insured: r.insured ?? "—", broker_name: r.broker_canonical ?? r.broker_name,
    line_of_business: r.line_of_business, commercial: r.is_joint_review_request ? "met" : "missing",
    slip: r.has_slip ? "met" : "missing", sov: r.has_sov ? "met" : "missing", loss: r.has_loss_data ? "met" : "missing",
    ofac, ofac_evidence_path: r.compliance_evidence_path, docs_count: r.docs_received ?? 0,
    country: r.country, currency: r.currency, insured_limit: r.insured_limit, uw_stage: r.uw_stage, assigned_to: r.assigned_to,
  };
}

const GREEN = { bg: "#d6f0e6", fg: "#0f6e56" };
const AMBER = { bg: "#f7e8c8", fg: "#8a5a00" };
const RED = { bg: "#fde4e1", fg: "#b42318" };
const BLUE = { bg: "#e3effb", fg: "#2f6fb3" };
function tone(s: string) { return s === "met" || s === "clear" ? GREEN : s === "partial" || s === "review" ? AMBER : RED; }
function num(s: string): number | null { const n = parseFloat((s || "").replace(/[^0-9.,-]/g, "").replace(",", ".")); return isFinite(n) ? n : null; }
function fmtMoney(amount?: number | null, currency?: string | null) {
  if (amount == null) return null;
  try { return new Intl.NumberFormat("es-CO", { style: "currency", currency: currency || "USD", maximumFractionDigits: 0 }).format(amount); }
  catch { return `${currency || ""} ${amount.toLocaleString("es-CO")}`.trim(); }
}

function KV({ k, v, muted }: { k: string; v: string; muted?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "7px 0", borderBottom: "1px solid #eef2f8" }}>
      <span style={{ fontSize: "0.78rem", color: "#64748b" }}>{k}</span>
      <span className={muted ? "" : "text-primary"} style={{ fontSize: "0.82rem", fontWeight: muted ? 400 : 600, color: muted ? "#94a3b8" : undefined, textAlign: "right" }}>{v}</span>
    </div>
  );
}
function StatusRow({ label, state, note }: { label: string; state: string; note: string }) {
  const t = tone(state); const ok = state === "met" || state === "clear"; const partial = state === "partial" || state === "review";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #eef2f8" }}>
      <span style={{ width: 20, height: 20, borderRadius: 6, background: t.bg, color: t.fg, fontSize: "0.7rem", fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{ok ? "✓" : partial ? "◐" : "✕"}</span>
      <span className="text-primary" style={{ fontSize: "0.82rem", fontWeight: 600, flex: 1 }}>{label}</span>
      <span style={{ fontSize: "0.74rem", color: t.fg }}>{note}</span>
    </div>
  );
}
function PanelCard({ children }: { children: React.ReactNode }) {
  return <div className="bg-card" style={{ border: "1px solid #d9e2f0", borderRadius: 16, padding: "18px 20px" }}>{children}</div>;
}
function StageBadge({ stage, assigned, locale }: { stage?: string | null; assigned?: string | null; locale: string }) {
  const items: { text: string; tone: typeof BLUE }[] = [];
  if (stage === "cotizacion") items.push({ text: pick(locale, "En cotización", "Quoting", "报价中"), tone: GREEN });
  if (stage === "info_solicitada") items.push({ text: pick(locale, "Info solicitada", "Info requested", "已请求信息"), tone: AMBER });
  if (assigned) items.push({ text: `${pick(locale, "Asignado", "Assigned", "已分配")}: ${assigned}`, tone: BLUE });
  if (!items.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
      {items.map((i, idx) => (<span key={idx} style={{ fontSize: "0.7rem", fontWeight: 600, padding: "3px 9px", borderRadius: 8, background: i.tone.bg, color: i.tone.fg }}>{i.text}</span>))}
    </div>
  );
}

function CaseDetailPanel({ row, locale }: { row: CaseRow | null; locale: string }) {
  if (!row) return <PanelCard><p className="text-secondary" style={{ fontSize: "0.85rem" }}>{pick(locale, "Selecciona un caso de la izquierda para ver su información.", "Select a case on the left to see its details.", "请在左侧选择一个案件查看详情。")}</p></PanelCard>;
  const pend = pick(locale, "Pendiente de captura", "Pending capture", "待采集");
  const limit = fmtMoney(row.insured_limit, row.currency);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <PanelCard>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", color: "#2f6fb3" }}>{pick(locale, "CAPTURA DEL SLIP", "SLIP CAPTURE", "SLIP 采集")}</p>
            <h2 className="text-primary" style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: 4 }}>{row.insured}</h2>
            <p className="text-secondary" style={{ fontSize: "0.84rem", marginTop: 2 }}>{[row.broker_name, row.line_of_business].filter(Boolean).join(" · ")}</p>
            <StageBadge stage={row.uw_stage} assigned={row.assigned_to} locale={locale} />
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "0.66rem", color: "#94a3b8" }}>{pick(locale, "Límite", "Limit", "保额")}</p>
            <p className="text-primary" style={{ fontSize: "0.95rem", fontWeight: 700 }}>{limit ?? "—"}</p>
          </div>
        </div>
      </PanelCard>
      <PanelCard>
        <h3 className="text-primary" style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 6 }}>{pick(locale, "Datos del riesgo", "Risk details", "风险信息")}</h3>
        <KV k={pick(locale, "Asegurado", "Insured", "被保险人")} v={row.insured} />
        <KV k={pick(locale, "Broker", "Broker", "经纪人")} v={row.broker_name ?? "—"} />
        <KV k={pick(locale, "Línea", "Line", "险种")} v={row.line_of_business ?? "—"} />
        <KV k={pick(locale, "País", "Country", "国家")} v={row.country ?? pend} muted={!row.country} />
        <KV k={pick(locale, "Moneda", "Currency", "货币")} v={row.currency ?? pend} muted={!row.currency} />
        <KV k={pick(locale, "Límite asegurado", "Insured limit", "保额")} v={limit ?? pend} muted={!limit} />
        <KV k={pick(locale, "Vigencia", "Effective", "生效日期")} v={pend} muted />
        <KV k={pick(locale, "Prima", "Premium", "保费")} v={pend} muted />
      </PanelCard>
      <PanelCard>
        <h3 className="text-primary" style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 6 }}>{pick(locale, "Información capturada del slip", "Captured from slip", "从 Slip 采集")}</h3>
        <StatusRow label={pick(locale, "Slip recibido", "Slip received", "已收到 Slip")} state={row.slip} note={row.slip === "met" ? pick(locale, "Sí", "Yes", "是") : pick(locale, "Falta", "Missing", "缺失")} />
        <StatusRow label={pick(locale, "SOV / relación de valores", "SOV / statement of values", "标的清单")} state={row.sov ?? "missing"} note={row.sov === "met" ? pick(locale, "Sí", "Yes", "是") : pick(locale, "Falta", "Missing", "缺失")} />
        <StatusRow label={pick(locale, "Siniestralidad", "Loss data", "理赔数据")} state={row.loss} note={row.loss === "met" ? pick(locale, "Sí", "Yes", "是") : pick(locale, "Falta", "Missing", "缺失")} />
        <StatusRow label="OFAC" state={row.ofac} note={row.ofac === "clear" ? pick(locale, "Limpio", "Clear", "通过") : row.ofac === "review" ? pick(locale, "Revisar", "Review", "待审") : pick(locale, "Alerta", "Hit", "命中")} />
        <p className="text-secondary" style={{ fontSize: "0.72rem", marginTop: 10 }}>{pick(locale, "La extracción automática de campos del slip se conectará próximamente.", "Automatic slip field extraction will be connected soon.", "Slip 字段的自动提取即将接入。")}</p>
      </PanelCard>
    </div>
  );
}

function QuoteForm({ row, locale, busy, onSave, onSendEmail }: {
  row: CaseRow; locale: string; busy: boolean;
  onSave: (id: string, q: any) => Promise<void>;
  onSendEmail: (id: string, subject: string, body: string) => Promise<void>;
}) {
  const [participation, setParticipation] = useState("");
  const [premium, setPremium] = useState("");
  const [rate, setRate] = useState("");
  const [commission, setCommission] = useState("");
  const [deductible, setDeductible] = useState("");
  const [capacity, setCapacity] = useState("");
  const [validity, setValidity] = useState("");
  const [terms, setTerms] = useState("");
  const [saved, setSaved] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [queued, setQueued] = useState(false);

  useEffect(() => { setParticipation(""); setPremium(""); setRate(""); setCommission(""); setDeductible(""); setCapacity(""); setValidity(""); setTerms(""); setSaved(false); setConfirming(false); setQueued(false); }, [row.id]);

  const cur = row.currency || "USD";
  async function save() {
    await onSave(row.id, {
      p_participation: num(participation), p_premium: num(premium), p_rate: num(rate), p_commission: num(commission),
      p_deductible: deductible || null, p_capacity: num(capacity), p_validity: validity || null, p_terms: terms || null,
    });
    setSaved(true);
  }
  const emailSubject = `${pick(locale, "Cotización", "Quote", "报价")} – ${row.insured}`;
  const emailBody =
`${pick(locale, "Estimados,", "Dear team,", "您好，")}

${pick(locale, "En relación con", "Regarding", "关于")} ${row.insured} (${row.line_of_business ?? "S&T"}), ${pick(locale, "nos complace compartir nuestra cotización:", "we are pleased to share our quote:", "我们很高兴提供报价：")}

- ${pick(locale, "Participación", "Participation", "参与比例")}: ${participation || "—"}%
- ${pick(locale, "Prima", "Premium", "保费")}: ${premium ? `${cur} ${premium}` : "—"}
- ${pick(locale, "Tasa", "Rate", "费率")}: ${rate || "—"}%
- ${pick(locale, "Comisión", "Commission", "佣金")}: ${commission || "—"}%
- ${pick(locale, "Deducible", "Deductible", "免赔额")}: ${deductible || "—"}
- ${pick(locale, "Capacidad", "Capacity", "承保能力")}: ${capacity ? `${cur} ${capacity}` : "—"}
- ${pick(locale, "Vigencia", "Validity", "有效期")}: ${validity || "—"}
${terms ? `\n${pick(locale, "Condiciones:", "Conditions:", "条件：")} ${terms}` : ""}

${pick(locale, "Quedamos atentos a sus comentarios.", "We remain at your disposal.", "期待您的回复。")}
Heath Underwriting`;

  const inputStyle = { border: "1px solid #d9e2f0", borderRadius: 8, padding: "8px 10px", fontSize: "0.82rem", outline: "none", width: "100%" } as const;
  const Field = ({ label, value, set, ph }: any) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600 }}>{label}</label>
      <input value={value} onChange={(e) => { set(e.target.value); setSaved(false); }} placeholder={ph} className="bg-card text-primary" style={inputStyle} />
    </div>
  );

  return (
    <PanelCard>
      <h3 className="text-primary" style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: 2 }}>{pick(locale, "Cotización", "Quote", "报价")}</h3>
      <p className="text-secondary" style={{ fontSize: "0.74rem", marginBottom: 12 }}>{pick(locale, "Términos de participación para este riesgo.", "Participation terms for this risk.", "该风险的参与条款。")}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label={`${pick(locale, "Participación", "Participation", "参与比例")} (%)`} value={participation} set={setParticipation} ph="21" />
        <Field label={`${pick(locale, "Prima", "Premium", "保费")} (${cur})`} value={premium} set={setPremium} ph="50000" />
        <Field label={`${pick(locale, "Tasa", "Rate", "费率")} (%)`} value={rate} set={setRate} ph="0.35" />
        <Field label={`${pick(locale, "Comisión", "Commission", "佣金")} (%)`} value={commission} set={setCommission} ph="10" />
        <Field label={pick(locale, "Deducible", "Deductible", "免赔额")} value={deductible} set={setDeductible} ph="USD 25.000" />
        <Field label={`${pick(locale, "Capacidad", "Capacity", "承保能力")} (${cur})`} value={capacity} set={setCapacity} ph="2000000" />
        <Field label={pick(locale, "Vigencia", "Validity", "有效期")} value={validity} set={setValidity} ph="12 meses" />
        <Field label={pick(locale, "Condiciones", "Conditions", "条件")} value={terms} set={setTerms} ph={pick(locale, "Notas / condiciones", "Notes / conditions", "备注/条件")} />
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14, alignItems: "center", flexWrap: "wrap" }}>
        <button type="button" disabled={busy} onClick={save} style={{ border: "none", background: GREEN.fg, color: "#fff", fontSize: "0.78rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, cursor: "pointer" }}>{pick(locale, "Guardar cotización", "Save quote", "保存报价")}</button>
        {saved && !confirming && (
          <button type="button" disabled={busy} onClick={() => setConfirming(true)} style={{ border: `1px solid ${BLUE.fg}`, background: "transparent", color: BLUE.fg, fontSize: "0.78rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, cursor: "pointer" }}>{pick(locale, "Enviar cotización al broker", "Send quote to broker", "发送报价给经纪人")}</button>
        )}
        {saved && !confirming && <span style={{ fontSize: "0.74rem", color: GREEN.fg }}>✓ {pick(locale, "Guardada", "Saved", "已保存")}</span>}
        {queued && <span style={{ fontSize: "0.74rem", color: BLUE.fg }}>✓ {pick(locale, "Correo en cola para envío", "Email queued to send", "邮件已加入发送队列")}</span>}
      </div>
      {confirming && (
        <div style={{ marginTop: 12, border: "1px solid #d9e2f0", borderRadius: 12, padding: 12 }}>
          <p style={{ fontSize: "0.74rem", fontWeight: 700, color: "#2f6fb3", marginBottom: 6 }}>{pick(locale, "Vista previa del correo al broker", "Preview of the broker email", "经纪人邮件预览")}</p>
          <p className="text-primary" style={{ fontSize: "0.78rem", fontWeight: 600 }}>{emailSubject}</p>
          <pre className="text-secondary" style={{ whiteSpace: "pre-wrap", fontSize: "0.74rem", marginTop: 6, fontFamily: "inherit" }}>{emailBody}</pre>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button type="button" disabled={busy} onClick={async () => { await onSendEmail(row.id, emailSubject, emailBody); setQueued(true); setConfirming(false); }} style={{ border: "none", background: BLUE.fg, color: "#fff", fontSize: "0.74rem", fontWeight: 700, padding: "6px 12px", borderRadius: 999, cursor: "pointer" }}>{pick(locale, "Confirmar y poner en cola", "Confirm & queue", "确认并入队")}</button>
            <button type="button" onClick={() => setConfirming(false)} style={{ border: "1px solid #d9e2f0", background: "transparent", color: "#64748b", fontSize: "0.74rem", fontWeight: 700, padding: "6px 12px", borderRadius: 999, cursor: "pointer" }}>{pick(locale, "Cancelar", "Cancel", "取消")}</button>
          </div>
          <p className="text-secondary" style={{ fontSize: "0.68rem", marginTop: 8 }}>{pick(locale, "El envío se hace respondiendo el hilo del broker en Gmail (vía n8n).", "Sending replies to the broker's Gmail thread (via n8n).", "通过 n8n 回复经纪人的 Gmail 邮件线程发送。")}</p>
        </div>
      )}
    </PanelCard>
  );
}

function DecisionPanel({ row, locale, reasons, busy, onParticipate, onRequestInfo, onAssign, onDecline }: {
  row: CaseRow | null; locale: string; reasons: DeclineReason[]; busy: boolean;
  onParticipate: (id: string) => void; onRequestInfo: (id: string) => void; onAssign: (id: string, name: string) => void; onDecline: (id: string, reason: string) => void;
}) {
  const [mode, setMode] = useState<null | "decline" | "assign">(null);
  const [code, setCode] = useState(reasons[0]?.code ?? "fuera_apetito");
  const [other, setOther] = useState(""); const [assignee, setAssignee] = useState("");
  useEffect(() => { setMode(null); setOther(""); setAssignee(""); }, [row?.id]);
  const disabled = !row || busy;
  const ActionButton = ({ label, desc, color, border, onClick }: any) => (
    <button type="button" disabled={disabled} onClick={onClick} className="bg-card" style={{ textAlign: "left", width: "100%", border: `1px solid ${border}`, borderRadius: 14, padding: "12px 14px", cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.55 : 1 }}>
      <div style={{ fontSize: "0.9rem", fontWeight: 700, color }}>{label}</div>
      <div className="text-secondary" style={{ fontSize: "0.74rem", marginTop: 2 }}>{desc}</div>
    </button>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 320 }}>
      <PanelCard>
        <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", color: "#2f6fb3" }}>{pick(locale, "DECISIÓN", "DECISION", "决策")}</p>
        <h3 className="text-primary" style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 4 }}>{pick(locale, "Acciones sobre el riesgo", "Actions on this risk", "针对该风险的操作")}</h3>
        <p className="text-secondary" style={{ fontSize: "0.78rem", marginTop: 4 }}>{row ? row.insured : pick(locale, "Sin caso seleccionado", "No case selected", "未选择案件")}</p>
        {row && <StageBadge stage={row.uw_stage} assigned={row.assigned_to} locale={locale} />}
      </PanelCard>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <ActionButton label={pick(locale, "Participar", "Participate", "参与")} desc={pick(locale, "Avanzar a cotización", "Move to quote", "进入报价")} color={GREEN.fg} border="#bfe4d3" onClick={() => row && onParticipate(row.id)} />
        <ActionButton label={pick(locale, "Pedir info", "Request info", "请求信息")} desc={pick(locale, "Solicitar datos faltantes al broker", "Ask the broker for missing data", "向经纪人索取缺失信息")} color={AMBER.fg} border="#ecd6a6" onClick={() => row && onRequestInfo(row.id)} />
        {mode !== "decline" ? (
          <ActionButton label={pick(locale, "Declinar", "Decline", "拒绝")} desc={pick(locale, "Rechazar y notificar al broker", "Decline and notify the broker", "拒绝并通知经纪人")} color={RED.fg} border="#f0c8c2" onClick={() => setMode("decline")} />
        ) : (
          <div className="bg-card" style={{ border: "1px solid #f0c8c2", borderRadius: 14, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: RED.fg }}>{pick(locale, "Declinar", "Decline", "拒绝")}</span>
            <select value={code} onChange={(e) => setCode(e.target.value)} className="bg-card text-primary" style={{ border: "1px solid #d9e2f0", borderRadius: 8, padding: "7px 10px", fontSize: "0.78rem" }}>
              {reasons.map((r) => (<option key={r.code} value={r.code}>{r.label}</option>))}
            </select>
            {code === "otro" && (<input value={other} onChange={(e) => setOther(e.target.value)} placeholder={pick(locale, "Especifica…", "Specify…", "请说明…")} className="bg-card text-primary" style={{ border: "1px solid #d9e2f0", borderRadius: 8, padding: "7px 10px", fontSize: "0.78rem" }} />)}
            <span style={{ fontSize: "0.68rem", color: "#94a3b8" }}>{pick(locale, "Se enviará un correo de declinación al broker.", "A decline email will be sent to the broker.", "将向经纪人发送拒绝邮件。")}</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" disabled={busy} onClick={() => row && onDecline(row.id, code === "otro" ? (other.trim() || "Otro") : (reasons.find((r) => r.code === code)?.label ?? "Declinado por suscripción"))} style={{ border: "none", background: RED.fg, color: "#fff", fontSize: "0.74rem", fontWeight: 600, padding: "6px 12px", borderRadius: 999, cursor: "pointer" }}>{pick(locale, "Confirmar", "Confirm", "确认")}</button>
              <button type="button" onClick={() => setMode(null)} style={{ border: "1px solid #d9e2f0", background: "transparent", color: "#64748b", fontSize: "0.74rem", fontWeight: 600, padding: "6px 12px", borderRadius: 999, cursor: "pointer" }}>{pick(locale, "Cancelar", "Cancel", "取消")}</button>
            </div>
          </div>
        )}
        {mode !== "assign" ? (
          <ActionButton label={pick(locale, "Asignar", "Assign", "分配")} desc={pick(locale, "Asignar a un suscriptor", "Assign to an underwriter", "分配给核保人")} color={BLUE.fg} border="#bcd4ef" onClick={() => setMode("assign")} />
        ) : (
          <div className="bg-card" style={{ border: "1px solid #bcd4ef", borderRadius: 14, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: BLUE.fg }}>{pick(locale, "Asignar suscriptor", "Assign underwriter", "分配核保人")}</span>
            <input value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder={pick(locale, "Nombre del suscriptor", "Underwriter name", "核保人姓名")} className="bg-card text-primary" style={{ border: "1px solid #d9e2f0", borderRadius: 8, padding: "7px 10px", fontSize: "0.78rem" }} />
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" disabled={busy || !assignee.trim()} onClick={() => row && onAssign(row.id, assignee.trim())} style={{ border: "none", background: BLUE.fg, color: "#fff", fontSize: "0.74rem", fontWeight: 600, padding: "6px 12px", borderRadius: 999, cursor: "pointer", opacity: assignee.trim() ? 1 : 0.5 }}>{pick(locale, "Asignar", "Assign", "分配")}</button>
              <button type="button" onClick={() => setMode(null)} style={{ border: "1px solid #d9e2f0", background: "transparent", color: "#64748b", fontSize: "0.74rem", fontWeight: 600, padding: "6px 12px", borderRadius: 999, cursor: "pointer" }}>{pick(locale, "Cancelar", "Cancel", "取消")}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SabotajeTerrorismoPage() {
  const { locale } = useI18n();
  const [cases, setCases] = useState<CaseRow[] | null>(null);
  const [selected, setSelected] = useState<CaseRow | null>(null);
  const [reasons, setReasons] = useState<DeclineReason[]>(DEFAULT_REASONS);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const [{ data, error }, rs] = await Promise.all([
          supabase.from("dashboard_submissions_table")
            .select("id,insured,broker_name,broker_canonical,line_of_business,country,currency,insured_limit,is_joint_review_request,has_slip,has_sov,has_loss_data,docs_received,compliance_status,compliance_evidence_path,uw_stage,assigned_to")
            .eq("decision", "REVIEW").eq("decision_reason", "Disponible para revisión").eq("is_joint_review_request", true),
          supabase.from("decline_reasons").select("code,label").eq("active", true).order("sort_order", { ascending: true }),
        ]);
        if (error) throw error;
        const filtered = (data as ViewRow[]).filter((r) => r.line_of_business != null && ST_LINES.includes(r.line_of_business.trim().toLowerCase()));
        const mapped = filtered.map(mapRow);
        if (active) { setCases(mapped); setSelected(mapped[0] ?? null); if (rs.data && rs.data.length) setReasons(rs.data as DeclineReason[]); }
      } catch (e: any) { if (active) setError(e?.message ?? "Error"); }
    })();
    return () => { active = false; };
  }, []);

  function patchCase(id: string, patch: Partial<CaseRow>) {
    setCases((prev) => prev ? prev.map((c) => (c.id === id ? { ...c, ...patch } : c)) : prev);
    setSelected((s) => (s && s.id === id ? { ...s, ...patch } : s));
  }
  async function rpc(name: string, args: Record<string, unknown>) {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.rpc(name, args);
    if (error) throw error;
  }
  async function onParticipate(id: string) { setBusy(true); try { await rpc("case_action", { p_id: id, p_stage: "cotizacion" }); patchCase(id, { uw_stage: "cotizacion" }); } catch (e: any) { setError(e?.message ?? "Error"); } finally { setBusy(false); } }
  async function onRequestInfo(id: string) { setBusy(true); try { await rpc("case_action", { p_id: id, p_stage: "info_solicitada" }); patchCase(id, { uw_stage: "info_solicitada" }); } catch (e: any) { setError(e?.message ?? "Error"); } finally { setBusy(false); } }
  async function onAssign(id: string, name: string) { setBusy(true); try { await rpc("case_action", { p_id: id, p_assigned: name }); patchCase(id, { assigned_to: name }); } catch (e: any) { setError(e?.message ?? "Error"); } finally { setBusy(false); } }
  async function onSaveQuote(id: string, q: any) { setBusy(true); try { await rpc("save_quote", { p_id: id, ...q }); patchCase(id, { uw_stage: "cotizacion" }); } catch (e: any) { setError(e?.message ?? "Error"); throw e; } finally { setBusy(false); } }
  async function onSendQuoteEmail(id: string, subject: string, body: string) { setBusy(true); try { await rpc("enqueue_broker_email", { p_submission_id: id, p_kind: "quote", p_subject: subject, p_body: body }); } catch (e: any) { setError(e?.message ?? "Error"); throw e; } finally { setBusy(false); } }
  async function onDecline(id: string, reason: string) {
    setBusy(true);
    try { await rpc("decline_submission", { p_id: id, p_reason: reason }); setCases((prev) => { const next = prev ? prev.filter((c) => c.id !== id) : prev; setSelected(next && next.length ? next[0] : null); return next; }); }
    catch (e: any) { setError(e?.message ?? "Error"); } finally { setBusy(false); }
  }

  const kicker = pick(locale, "Heath · Suscripción", "Heath · Underwriting", "Heath · 核保");
  const title = pick(locale, "Sabotaje y Terrorismo", "Sabotage & Terrorism", "破坏与恐怖主义");
  const subtitle = pick(locale, "Negocios disponibles para revisión conjunta. Selecciona un caso para ver su slip y decidir.", "Businesses available for joint review. Select a case to see its slip and decide.", "可联合核保的业务。选择案件查看 Slip 并决策。");
  const back = pick(locale, "Suscripción", "Underwriting", "核保");

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
        ) : cases === null ? (
          <p className="text-sm text-secondary">{pick(locale, "Cargando…", "Loading…", "加载中…")}</p>
        ) : cases.length === 0 ? (
          <p className="text-sm text-secondary">{pick(locale, "Aún no hay negocios disponibles para revisión en esta línea.", "No businesses available for review in this line yet.", "该险种暂无可核保的业务。")}</p>
        ) : (
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
            <InboxReviewPanel rows={cases as ReviewRow[]} selectedId={selected?.id} onSelect={(r) => setSelected(cases.find((c) => c.id === r.id) ?? null)} />
            <div style={{ flex: 1, minWidth: 340, display: "flex", flexDirection: "column", gap: 14 }}>
              <CaseDetailPanel row={selected} locale={locale} />
              {selected && selected.uw_stage === "cotizacion" && (
                <>
                  <QuoteForm row={selected} locale={locale} busy={busy} onSave={onSaveQuote} onSendEmail={onSendQuoteEmail} />
                  <ClauseSelector submissionId={selected.id} locale={locale} />
                </>
              )}
            </div>
            <DecisionPanel row={selected} locale={locale} reasons={reasons} busy={busy} onParticipate={onParticipate} onRequestInfo={onRequestInfo} onAssign={onAssign} onDecline={onDecline} />
          </div>
        )}
      </div>
    </div>
  );
}
