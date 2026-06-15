"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { InboxReviewPanel, type ReviewRow } from "@/components/dashboard/InboxReviewPanel";
import { SlipPreview, ClauseAccordion, useSlipClauses } from "@/components/dashboard/SlipMarkupWorkspace";
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
correspondence_lang?: string | null;
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
uw_stage: string | null; assigned_to: string | null; correspondence_lang: string | null;
};

function mapRow(r: ViewRow): CaseRow {
const ofac = r.compliance_status === "clear" ? "clear" : r.compliance_status === "hit" ? "hit" : "review";
return {
id: String(r.id), insured: r.insured ?? "—", broker_name: r.broker_canonical ?? r.broker_name,
line_of_business: r.line_of_business, commercial: r.is_joint_review_request ? "met" : "missing",
slip: r.has_slip ? "met" : "missing", sov: r.has_sov ? "met" : "missing", loss: r.has_loss_data ? "met" : "missing",
ofac, ofac_evidence_path: r.compliance_evidence_path, docs_count: r.docs_received ?? 0,
country: r.country, currency: r.currency, insured_limit: r.insured_limit, uw_stage: r.uw_stage, assigned_to: r.assigned_to,
correspondence_lang: r.correspondence_lang ?? "es",
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

// ---- Broker-facing email builders (use the CASE language, not the UI language) ----
function declineEmail(ml: string, insured: string, line: string | null, reasonLabel: string) {
const subject = pick(ml, `Declinación – ${insured}`, `Declinature – ${insured}`, `谢绝承保 – ${insured}`);
const body = pick(ml,
`Estimados,

Gracias por la oportunidad de evaluar ${insured} (${line ?? "S&T"}). Tras una revisión cuidadosa, lamentamos informar que en esta ocasión no podemos ofrecer términos.

Motivo: ${reasonLabel}

Quedamos atentos para futuras oportunidades.
Heath Underwriting`,
`Dear team,

Thank you for the opportunity to consider ${insured} (${line ?? "S&T"}). After careful review, we regret that we are unable to offer terms on this occasion.

Reason: ${reasonLabel}

We remain at your disposal for future submissions.
Heath Underwriting`,
`您好，

感谢贵方提供 ${insured}（${line ?? "S&T"}）的承保机会。经审慎评估，我方很遗憾本次无法提供条款。

原因：${reasonLabel}

期待未来的合作机会。
Heath Underwriting`);
return { subject, body };
}

function requestInfoEmail(ml: string, insured: string, line: string | null, missing: string[]) {
const items = missing.length ? missing.map((m) => `- ${m}`).join("\n") : pick(ml, "- Información adicional del riesgo", "- Additional risk information", "- 其他风险信息");
const subject = pick(ml, `Solicitud de información – ${insured}`, `Request for information – ${insured}`, `信息请求 – ${insured}`);
const body = pick(ml,
`Estimados,

Para continuar con la evaluación de ${insured} (${line ?? "S&T"}), agradecemos nos faciliten lo siguiente:

${items}

Quedamos atentos a su respuesta.
Heath Underwriting`,
`Dear team,

To progress our assessment of ${insured} (${line ?? "S&T"}), we would be grateful if you could provide the following:

${items}

We look forward to your reply.
Heath Underwriting`,
`您好，

为推进对 ${insured}（${line ?? "S&T"}）的评估，烦请提供以下资料：

${items}

期待您的回复。
Heath Underwriting`);
return { subject, body };
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
if (stage === "bound") items.push({ text: pick(locale, "Sellada", "Bound", "已出单"), tone: BLUE });
if (assigned) items.push({ text: `${pick(locale, "Asignado", "Assigned", "已分配")}: ${assigned}`, tone: BLUE });
if (!items.length) return null;
return (
<div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
{items.map((i, idx) => (<span key={idx} style={{ fontSize: "0.7rem", fontWeight: 600, padding: "3px 9px", borderRadius: 8, background: i.tone.bg, color: i.tone.fg }}>{i.text}</span>))}
</div>
);
}

function LangToggle({ value, locale, busy, onChange }: { value: string; locale: string; busy: boolean; onChange: (lang: string) => void }) {
const opts = [{ k: "es", t: "ES" }, { k: "en", t: "EN" }];
return (
<div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
<span style={{ fontSize: "0.72rem", color: "#64748b" }}>{pick(locale, "Idioma con el broker", "Broker language", "经纪人语言")}:</span>
<div style={{ display: "inline-flex", border: "1px solid #d9e2f0", borderRadius: 999, overflow: "hidden" }}>
{opts.map((o) => {
const on = value === o.k;
return (
<button key={o.k} type="button" disabled={busy || on} onClick={() => onChange(o.k)}
style={{ border: "none", background: on ? "#2f6fb3" : "transparent", color: on ? "#fff" : "#64748b", fontSize: "0.72rem", fontWeight: 700, padding: "4px 12px", cursor: on ? "default" : "pointer" }}>
{o.t}
</button>
);
})}
</div>
</div>
);
}

function CaseDetailPanel({ row, locale, busy, onSetLang }: { row: CaseRow | null; locale: string; busy: boolean; onSetLang: (id: string, lang: string) => void }) {
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
<LangToggle value={row.correspondence_lang ?? "es"} locale={locale} busy={busy} onChange={(lang) => onSetLang(row.id, lang)} />
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

function BinderCapNote({ row, locale }: { row: CaseRow; locale: string }) {
const [info, setInfo] = useState<
{ status: "loading" | "ok" | "out" | "nocur" | "err"; cap?: number; cur?: string }
>({ status: "loading" });

useEffect(() => {
let active = true;
(async () => {
setInfo({ status: "loading" });
if (!row.country) { if (active) setInfo({ status: "out" }); return; }
try {
const supabase = createSupabaseBrowserClient();
const { data, error } = await supabase
.from("binder_authority_rules")
.select("currency,max_insured_limit,is_allowed")
.eq("line_of_business", "S&T")
.ilike("country", row.country);
if (error) throw error;
const allowed = ((data ?? []) as { currency: string; max_insured_limit: number; is_allowed: boolean }[])
.filter((r) => r.is_allowed);
if (!allowed.length) { if (active) setInfo({ status: "out" }); return; }
const cur = row.currency || "USD";
const match = allowed.find((r) => r.currency === cur) ?? allowed.find((r) => r.currency === "USD");
if (!match) { if (active) setInfo({ status: "nocur" }); return; }
if (active) setInfo({ status: "ok", cap: Number(match.max_insured_limit), cur: match.currency });
} catch { if (active) setInfo({ status: "err" }); }
})();
return () => { active = false; };
}, [row.id, row.country, row.currency]);

if (info.status === "loading" || info.status === "err") return null;
const country = row.country ?? "";

if (info.status === "out")
return (
<div style={{ border: `1px solid ${RED.bg}`, background: RED.bg, color: RED.fg, borderRadius: 10, padding: "9px 12px", marginBottom: 12, fontSize: "0.76rem", fontWeight: 600 }}>
{pick(locale,
`Fuera de binder authority: ${country} no está dentro del territorio del binder.`,
`Out of binder authority: ${country} is outside the binder territory.`,
`超出承保授权：${country} 不在承保区域内。`)}
</div>
);

if (info.status === "nocur")
return (
<div style={{ border: `1px solid ${AMBER.bg}`, background: AMBER.bg, color: AMBER.fg, borderRadius: 10, padding: "9px 12px", marginBottom: 12, fontSize: "0.76rem", fontWeight: 600 }}>
{pick(locale,
`Sin tope definido en ${row.currency}. Cotiza en USD o en la moneda local del binder.`,
`No cap defined in ${row.currency}. Quote in USD or the binder's local currency.`,
`未定义 ${row.currency} 限额。请用美元或承保本币报价。`)}
</div>
);

const sameCur = info.cur === (row.currency || "USD");
const exceeds = sameCur && row.insured_limit != null && info.cap != null && row.insured_limit > info.cap;
return (
<div style={{ border: `1px solid ${exceeds ? RED.bg : GREEN.bg}`, background: exceeds ? RED.bg : GREEN.bg, color: exceeds ? RED.fg : GREEN.fg, borderRadius: 10, padding: "9px 12px", marginBottom: 12, fontSize: "0.76rem" }}>
<div style={{ fontWeight: 700 }}>
{pick(locale, "Tope binder", "Binder cap", "承保限额")} · {country} · {info.cur}: {fmtMoney(info.cap, info.cur)}
</div>
{exceeds && (
<div style={{ marginTop: 4, fontWeight: 600 }}>
{pick(locale,
`El límite del riesgo (${fmtMoney(row.insured_limit, row.currency)}) excede tu binder authority.`,
`The risk limit (${fmtMoney(row.insured_limit, row.currency)}) exceeds your binder authority.`,
`风险保额（${fmtMoney(row.insured_limit, row.currency)}）超出您的承保授权。`)}
</div>
)}
</div>
);
}

function TechnicalRatePanel({ submissionId, locale }: { submissionId: string; locale: string }) {
const [opts, setOpts] = useState<{ occupancy: string; label: string }[]>([]);
const [occ, setOcc] = useState<string>("");
const [res, setRes] = useState<any>(null);
const [loading, setLoading] = useState(false);
const [noteBusy, setNoteBusy] = useState(false);
const [err, setErr] = useState<string | null>(null);

useEffect(() => {
let active = true;
(async () => {
try {
const supabase = createSupabaseBrowserClient();
const [o, s, pr] = await Promise.all([
supabase.from("occupancy_relativities").select("occupancy,label").order("sort_order", { ascending: true }),
supabase.from("submissions").select("occupancy_class").eq("id", submissionId).maybeSingle(),
supabase.from("submission_pricing").select("*").eq("submission_id", submissionId).maybeSingle(),
]);
if (!active) return;
if (o.data) setOpts(o.data as any);
if (s.data && (s.data as any).occupancy_class) setOcc((s.data as any).occupancy_class);
if (pr.data) setRes(pr.data);
} catch (e: any) { if (active) setErr(e?.message ?? "Error"); }
})();
return () => { active = false; };
}, [submissionId]);

async function compute() {
setLoading(true); setErr(null);
try {
const supabase = createSupabaseBrowserClient();
const { data, error } = await supabase.functions.invoke("compute-technical-rate", { body: { submission_id: submissionId, occupancy: occ || null } });
if (error) throw error;
if (data && (data as any).ok) setRes(data); else throw new Error((data as any)?.error || "Error de cálculo");
} catch (e: any) { setErr(e?.message ?? "Error"); } finally { setLoading(false); }
}

async function genNote() {
setNoteBusy(true); setErr(null);
try {
const supabase = createSupabaseBrowserClient();
const { data, error } = await supabase.functions.invoke("technical-note-pdf", { body: { submission_id: submissionId } });
if (error) throw error;
if (data && (data as any).ok && (data as any).url) window.open((data as any).url, "_blank"); else throw new Error((data as any)?.error || "Error generando la nota");
} catch (e: any) { setErr(e?.message ?? "Error"); } finally { setNoteBusy(false); }
}

const ratePct = res?.technical_rate != null ? (res.technical_rate * 100).toFixed(3) : null;
const slipPct = res?.slip_rate != null ? (res.slip_rate * 100).toFixed(3) : null;
const adq = res?.adequacy != null ? Number(res.adequacy) : null;
const adqTone = adq == null ? BLUE : adq > 1.15 ? RED : adq < 0.9 ? AMBER : GREEN;

return (
<div style={{ border: "1px solid #d9e2f0", borderRadius: 12, padding: "12px 14px", marginBottom: 14, background: "#f8fbfe" }}>
<p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", color: "#2f6fb3", margin: 0 }}>{pick(locale, "NOTA TÉCNICA · TASA ACTUARIAL", "TECHNICAL NOTE · ACTUARIAL RATE", "技术费率")}</p>
<div style={{ display: "flex", gap: 8, alignItems: "flex-end", margin: "8px 0" }}>
<div style={{ flex: 1 }}>
<label style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600 }}>{pick(locale, "Tipo de inmueble / ocupación", "Occupancy / target type", "标的类型")}</label>
<select value={occ} onChange={(e) => setOcc(e.target.value)} className="bg-card text-primary" style={{ width: "100%", border: "1px solid #d9e2f0", borderRadius: 8, padding: "7px 10px", fontSize: "0.8rem" }}>
<option value="">{pick(locale, "— selecciona —", "— select —", "— 选择 —")}</option>
{opts.map((o) => (<option key={o.occupancy} value={o.occupancy}>{o.label}</option>))}
</select>
</div>
<button type="button" disabled={loading} onClick={compute} style={{ border: "none", background: "#2f6fb3", color: "#fff", fontSize: "0.76rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, cursor: loading ? "default" : "pointer", opacity: loading ? 0.6 : 1 }}>{loading ? pick(locale, "Calculando…", "Computing…", "计算中…") : pick(locale, "Calcular tasa técnica", "Compute technical rate", "计算费率")}</button>
</div>
{err && <p style={{ fontSize: "0.72rem", color: RED.fg }}>{err}</p>}
{res && (
<div style={{ marginTop: 6 }}>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.74rem", padding: "2px 0", color: "#64748b" }}><span>{pick(locale, "Pérdida esperada E[L]", "Expected loss E[L]", "预期损失")}</span><span>{fmtMoney(Math.round(res.expected_loss), "USD")}</span></div>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.74rem", padding: "2px 0", color: "#64748b" }}><span>{pick(locale, "Margen de capital (SII 6%)", "Capital margin (SII 6%)", "资本边际")}</span><span>{fmtMoney(Math.round(res.capital_margin), "USD")}</span></div>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.74rem", padding: "2px 0" }}><span style={{ color: "#64748b" }}>{pick(locale, "Prima técnica bruta", "Gross technical premium", "技术毛保费")}</span><span style={{ fontWeight: 600 }}>{fmtMoney(Math.round(res.gross_premium), "USD")}</span></div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, padding: "8px 10px", borderRadius: 8, background: BLUE.bg }}>
<span style={{ fontSize: "0.78rem", fontWeight: 700, color: BLUE.fg }}>{pick(locale, "Tasa técnica", "Technical rate", "技术费率")}</span>
<span style={{ fontSize: "1rem", fontWeight: 700, color: BLUE.fg }}>{ratePct}%</span>
</div>
{adq != null && (
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6, padding: "6px 10px", borderRadius: 8, background: adqTone.bg, color: adqTone.fg, fontSize: "0.74rem", fontWeight: 600 }}>
<span>Slip: {slipPct}% · {pick(locale, "técnica", "technical", "技术")}: {ratePct}%</span>
<span>{adq.toFixed(2)}× {adq > 1.15 ? pick(locale, "subtasado", "under-priced", "偏低") : adq < 0.9 ? pick(locale, "holgado", "ample", "充裕") : pick(locale, "adecuado", "adequate", "充足")}</span>
</div>
)}
<p style={{ fontSize: "0.66rem", color: "#94a3b8", marginTop: 6 }}>λ {Number(res.lambda).toFixed(4)} · {pick(locale, "país", "country", "国家")} {res.inputs?.country_factor} · {pick(locale, "ocupación", "occupancy", "标的")} {res.inputs?.occupancy_freq_rel} · SRCC {res.inputs?.srcc_modifier}</p>
<button type="button" disabled={noteBusy} onClick={genNote} style={{ marginTop: 8, border: `1px solid ${BLUE.fg}`, background: "transparent", color: BLUE.fg, fontSize: "0.74rem", fontWeight: 700, padding: "7px 12px", borderRadius: 999, cursor: noteBusy ? "default" : "pointer" }}>{noteBusy ? pick(locale, "Generando…", "Generating…", "生成中…") : pick(locale, "Generar nota técnica (PDF)", "Generate technical note (PDF)", "生成技术说明 (PDF)")}</button>
</div>
)}
</div>
);
}

function QField({ label, value, set, ph }: { label: string; value: string; set: (v: string) => void; ph?: string }) {
return (
<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
<label style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600 }}>{label}</label>
<input value={value} onChange={(e) => set(e.target.value)} placeholder={ph} className="bg-card text-primary" style={{ border: "1px solid #d9e2f0", borderRadius: 8, padding: "8px 10px", fontSize: "0.82rem", outline: "none", width: "100%" }} />
</div>
);
}

const WB_STEPS = 4;

function Stepper({ step, setStep, locale }: { step: number; setStep: (n: number) => void; locale: string }) {
const labels = [
pick(locale, "Slip", "Slip", "Slip"),
pick(locale, "Marcar cláusulas", "Mark clauses", "标注条款"),
pick(locale, "Línea y términos", "Line & terms", "额度与条款"),
pick(locale, "Cotizar", "Quote", "报价"),
];
return (
<div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
{labels.map((s, i) => {
const n = i + 1; const active = n === step; const done = n < step;
return (
<span key={n} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
{i > 0 && <span style={{ color: "#cbd5e1", fontSize: "0.8rem" }}>›</span>}
<button type="button" onClick={() => setStep(n)}
style={{ fontSize: "0.74rem", fontWeight: active ? 700 : 600, padding: "6px 12px", borderRadius: 999, cursor: "pointer",
border: active ? "none" : "1px solid #d9e2f0",
background: active ? BLUE.bg : "transparent", color: active ? BLUE.fg : "#64748b" }}>
{done ? "✓ " : ""}{n} · {s}
</button>
</span>
);
})}
</div>
);
}

function WbNav({ step, setStep, locale, primaryLabel }: { step: number; setStep: (n: number) => void; locale: string; primaryLabel?: string }) {
return (
<div style={{ display: "flex", gap: 8, marginTop: 14 }}>
{step > 1 && <button type="button" onClick={() => setStep(step - 1)} style={{ flex: 1, fontSize: "0.78rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, border: "1px solid #d9e2f0", background: "transparent", color: "#64748b", cursor: "pointer" }}>← {pick(locale, "Atrás", "Back", "上一步")}</button>}
{step < WB_STEPS && <button type="button" onClick={() => setStep(step + 1)} style={{ flex: 1.4, fontSize: "0.78rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, border: "none", background: BLUE.fg, color: "#fff", cursor: "pointer" }}>{primaryLabel ?? pick(locale, "Siguiente", "Next", "下一步")} →</button>}
</div>
);
}

function SlipWorkbench({ row, locale, mailLocale, busy, onBack, onSetLang, onSaveQuote, onSendEmail }: {
row: CaseRow; locale: string; mailLocale: string; busy: boolean;
onBack: () => void;
onSetLang: (id: string, lang: string) => void;
onSaveQuote: (id: string, q: any) => Promise<void>;
onSendEmail: (id: string, subject: string, body: string) => Promise<void>;
}) {
const [step, setStep] = useState(1);
const { clauses, checked, expanded, flash, loading, saving, saved, error, toggle, expand, save } = useSlipClauses(row.id);

const [participation, setParticipation] = useState("");
const [premium, setPremium] = useState("");
const [rate, setRate] = useState("");
const [commission, setCommission] = useState("");
const [deductible, setDeductible] = useState("");
const [capacity, setCapacity] = useState("");
const [validity, setValidity] = useState("");
const [terms, setTerms] = useState("");
const [qSaved, setQSaved] = useState(false);
const [queued, setQueued] = useState(false);

useEffect(() => {
setStep(1); setParticipation(""); setPremium(""); setRate(""); setCommission("");
setDeductible(""); setCapacity(""); setValidity(""); setTerms(""); setQSaved(false); setQueued(false);
}, [row.id]);

const cur = row.currency || "USD";
async function saveQuote() {
await onSaveQuote(row.id, {
p_participation: num(participation), p_premium: num(premium), p_rate: num(rate), p_commission: num(commission),
p_deductible: deductible || null, p_capacity: num(capacity), p_validity: validity || null, p_terms: terms || null,
});
setQSaved(true);
}

const emailSubject = `${pick(mailLocale, "Cotización", "Quote", "报价")} – ${row.insured}`;
const emailBody =
`${pick(mailLocale, "Estimados,", "Dear team,", "您好，")}

${pick(mailLocale, "En relación con", "Regarding", "关于")} ${row.insured} (${row.line_of_business ?? "S&T"}), ${pick(mailLocale, "nos complace compartir nuestra cotización:", "we are pleased to share our quote:", "我们很高兴提供报价：")}

- ${pick(mailLocale, "Participación", "Participation", "参与比例")}: ${participation || "—"}%
- ${pick(mailLocale, "Prima", "Premium", "保费")}: ${premium ? `${cur} ${premium}` : "—"}
- ${pick(mailLocale, "Tasa", "Rate", "费率")}: ${rate || "—"}%
- ${pick(mailLocale, "Comisión", "Commission", "佣金")}: ${commission || "—"}%
- ${pick(mailLocale, "Deducible", "Deductible", "免赔额")}: ${deductible || "—"}
- ${pick(mailLocale, "Capacidad", "Capacity", "承保能力")}: ${capacity ? `${cur} ${capacity}` : "—"}
- ${pick(mailLocale, "Vigencia", "Validity", "有效期")}: ${validity || "—"}
${terms ? `\n${pick(mailLocale, "Condiciones:", "Conditions:", "条件：")} ${terms}` : ""}

${pick(mailLocale, "Quedamos atentos a sus comentarios.", "We remain at your disposal.", "期待您的回复。")}
Heath Underwriting`;

const slipRow = { insured: row.insured ?? "—", broker_name: row.broker_name, line_of_business: row.line_of_business, country: row.country, currency: row.currency, insured_limit: row.insured_limit };

return (
<div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
<div style={{ minWidth: 0 }}>
<button type="button" onClick={onBack} style={{ fontSize: "0.78rem", fontWeight: 600, padding: "6px 12px", borderRadius: 999, border: "1px solid #d9e2f0", background: "transparent", color: "#64748b", cursor: "pointer", marginBottom: 8 }}>← {pick(locale, "Volver a casos", "Back to cases", "返回列表")}</button>
<h2 className="text-primary" style={{ fontSize: "1.3rem", fontWeight: 700 }}>{row.insured}</h2>
<p className="text-secondary" style={{ fontSize: "0.84rem", marginTop: 2 }}>{[row.broker_name, row.country, row.line_of_business].filter(Boolean).join(" · ")}</p>
<StageBadge stage={row.uw_stage} assigned={row.assigned_to} locale={locale} />
</div>
<LangToggle value={row.correspondence_lang ?? "es"} locale={locale} busy={busy} onChange={(lang) => onSetLang(row.id, lang)} />
</div>

<Stepper step={step} setStep={setStep} locale={locale} />

<div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 18, alignItems: "start" }}>
<div style={{ position: "sticky", top: 16 }}>
{loading ? (
<PanelCard><p className="text-secondary" style={{ fontSize: "0.82rem" }}>{pick(locale, "Cargando slip…", "Loading slip…", "加载中…")}</p></PanelCard>
) : (
<SlipPreview clauses={clauses} checked={checked} flash={flash} row={slipRow} locale={locale} />
)}
</div>

<div>
{step === 1 && (
<PanelCard>
<p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", color: "#2f6fb3" }}>{pick(locale, "PASO 1 · REVISAR SLIP", "STEP 1 · REVIEW SLIP", "步骤 1 · 审阅 SLIP")}</p>
<h3 className="text-primary" style={{ fontSize: "0.95rem", fontWeight: 700, margin: "4px 0 10px" }}>{pick(locale, "Datos y completitud", "Details & readiness", "信息与齐备度")}</h3>
<KV k={pick(locale, "País", "Country", "国家")} v={row.country ?? "—"} />
<KV k={pick(locale, "Moneda", "Currency", "货币")} v={row.currency ?? "USD"} />
<KV k={pick(locale, "Límite asegurado", "Insured limit", "保额")} v={fmtMoney(row.insured_limit, row.currency) ?? "—"} />
<div style={{ marginTop: 8 }}>
<StatusRow label={pick(locale, "Slip recibido", "Slip received", "已收到 Slip")} state={row.slip} note={row.slip === "met" ? pick(locale, "Sí", "Yes", "是") : pick(locale, "Falta", "Missing", "缺失")} />
<StatusRow label={pick(locale, "SOV / valores", "SOV / values", "标的清单")} state={row.sov ?? "missing"} note={row.sov === "met" ? pick(locale, "Sí", "Yes", "是") : pick(locale, "Falta", "Missing", "缺失")} />
<StatusRow label={pick(locale, "Siniestralidad", "Loss data", "理赔数据")} state={row.loss} note={row.loss === "met" ? pick(locale, "Sí", "Yes", "是") : pick(locale, "Falta", "Missing", "缺失")} />
<StatusRow label="OFAC" state={row.ofac} note={row.ofac === "clear" ? pick(locale, "Limpio", "Clear", "通过") : row.ofac === "review" ? pick(locale, "Revisar", "Review", "待审") : pick(locale, "Alerta", "Hit", "命中")} />
</div>
<WbNav step={step} setStep={setStep} locale={locale} primaryLabel={pick(locale, "Marcar cláusulas", "Mark clauses", "标注条款")} />
</PanelCard>
)}

{step === 2 && (
<PanelCard>
<p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", color: "#2f6fb3" }}>{pick(locale, "PASO 2 · MARCAR CLÁUSULAS", "STEP 2 · MARK CLAUSES", "步骤 2 · 标注条款")}</p>
<h3 className="text-primary" style={{ fontSize: "0.95rem", fontWeight: 700, margin: "4px 0 2px" }}>{pick(locale, "Intervención del slip", "Slip markup", "Slip 标注")}</h3>
<p className="text-secondary" style={{ fontSize: "0.72rem", marginBottom: 12 }}>{pick(locale, "Marca lo que se otorga y tacha lo que no. El slip se actualiza en vivo.", "Tick what is granted, strike what is not. The slip updates live.", "勾选承保项，划除不承保项。Slip 实时更新。")}</p>
{loading ? (
<p className="text-secondary" style={{ fontSize: "0.8rem" }}>{pick(locale, "Cargando…", "Loading…", "加载中…")}</p>
) : (
<ClauseAccordion clauses={clauses} checked={checked} expanded={expanded} onToggle={toggle} onExpand={expand} locale={locale} />
)}
<div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 14 }}>
<button type="button" disabled={saving || loading} onClick={save} style={{ border: "none", background: "#2f6fb3", color: "#fff", fontSize: "0.76rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, cursor: saving ? "default" : "pointer", opacity: saving ? 0.6 : 1 }}>{saving ? pick(locale, "Guardando…", "Saving…", "保存中…") : pick(locale, "Guardar cláusulas", "Save clauses", "保存条款")}</button>
{saved && <span style={{ fontSize: "0.74rem", color: GREEN.fg }}>✓ {pick(locale, "Guardadas", "Saved", "已保存")}</span>}
{error && <span style={{ fontSize: "0.74rem", color: RED.fg }}>{error}</span>}
</div>
<WbNav step={step} setStep={setStep} locale={locale} primaryLabel={pick(locale, "Línea y términos", "Line & terms", "额度与条款")} />
</PanelCard>
)}

{step === 3 && (
<PanelCard>
<p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", color: "#2f6fb3" }}>{pick(locale, "PASO 3 · LÍNEA Y TÉRMINOS", "STEP 3 · LINE & TERMS", "步骤 3 · 额度与条款")}</p>
<h3 className="text-primary" style={{ fontSize: "0.95rem", fontWeight: 700, margin: "4px 0 10px" }}>{pick(locale, "Participación y términos", "Participation & terms", "参与与条款")}</h3>
<BinderCapNote row={row} locale={locale} />
<TechnicalRatePanel submissionId={row.id} locale={locale} />
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
<QField label={`${pick(locale, "Participación", "Participation", "参与比例")} (%)`} value={participation} set={(v) => { setParticipation(v); setQSaved(false); }} ph="21" />
<QField label={`${pick(locale, "Prima", "Premium", "保费")} (${cur})`} value={premium} set={(v) => { setPremium(v); setQSaved(false); }} ph="50000" />
<QField label={`${pick(locale, "Tasa", "Rate", "费率")} (%)`} value={rate} set={(v) => { setRate(v); setQSaved(false); }} ph="0.35" />
<QField label={`${pick(locale, "Comisión", "Commission", "佣金")} (%)`} value={commission} set={(v) => { setCommission(v); setQSaved(false); }} ph="10" />
<QField label={pick(locale, "Deducible", "Deductible", "免赔额")} value={deductible} set={(v) => { setDeductible(v); setQSaved(false); }} ph="USD 25.000" />
<QField label={`${pick(locale, "Capacidad", "Capacity", "承保能力")} (${cur})`} value={capacity} set={(v) => { setCapacity(v); setQSaved(false); }} ph="2000000" />
<QField label={pick(locale, "Vigencia", "Validity", "有效期")} value={validity} set={(v) => { setValidity(v); setQSaved(false); }} ph="12 meses" />
<QField label={pick(locale, "Condiciones", "Conditions", "条件")} value={terms} set={(v) => { setTerms(v); setQSaved(false); }} ph={pick(locale, "Notas / condiciones", "Notes / conditions", "备注/条件")} />
</div>
<div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 14 }}>
<button type="button" disabled={busy} onClick={saveQuote} style={{ border: "none", background: GREEN.fg, color: "#fff", fontSize: "0.78rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, cursor: "pointer" }}>{pick(locale, "Guardar cotización", "Save quote", "保存报价")}</button>
{qSaved && <span style={{ fontSize: "0.74rem", color: GREEN.fg }}>✓ {pick(locale, "Guardada", "Saved", "已保存")}</span>}
</div>
<WbNav step={step} setStep={setStep} locale={locale} primaryLabel={pick(locale, "Cotizar", "Quote", "报价")} />
</PanelCard>
)}

{step === 4 && (
<PanelCard>
<p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", color: "#2f6fb3" }}>{pick(locale, "PASO 4 · COTIZAR", "STEP 4 · QUOTE", "步骤 4 · 报价")}</p>
<h3 className="text-primary" style={{ fontSize: "0.95rem", fontWeight: 700, margin: "4px 0 2px" }}>{pick(locale, "Enviar cotización al broker", "Send quote to broker", "向经纪人发送报价")}</h3>
<p className="text-secondary" style={{ fontSize: "0.72rem", marginBottom: 10 }}>{pick(locale, "Vista previa del correo", "Email preview", "邮件预览")} · {(mailLocale || "es").toUpperCase()}</p>
<div style={{ border: "1px solid #d9e2f0", borderRadius: 12, padding: 12 }}>
<p className="text-primary" style={{ fontSize: "0.78rem", fontWeight: 600 }}>{emailSubject}</p>
<pre className="text-secondary" style={{ whiteSpace: "pre-wrap", fontSize: "0.74rem", marginTop: 6, fontFamily: "inherit" }}>{emailBody}</pre>
</div>
<div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12 }}>
<button type="button" disabled={busy} onClick={async () => { await onSendEmail(row.id, emailSubject, emailBody); setQueued(true); }} style={{ border: "none", background: BLUE.fg, color: "#fff", fontSize: "0.78rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, cursor: "pointer" }}>{pick(locale, "Enviar cotización al broker", "Send quote to broker", "发送报价")}</button>
{queued && <span style={{ fontSize: "0.74rem", color: BLUE.fg }}>✓ {pick(locale, "Correo en cola para envío", "Email queued to send", "邮件已加入发送队列")}</span>}
</div>
<p className="text-secondary" style={{ fontSize: "0.68rem", marginTop: 8 }}>{pick(locale, "El envío se hace respondiendo el hilo del broker en Gmail (vía n8n).", "Sending replies to the broker's Gmail thread (via n8n).", "通过 n8n 回复经纪人的 Gmail 邮件线程发送。")}</p>
<WbNav step={step} setStep={setStep} locale={locale} />
</PanelCard>
)}
</div>
</div>
</div>
);
}

function DecisionPanel({ row, locale, reasons, busy, quoting, onParticipate, onOpenWorkbench, onRequestInfo, onAssign, onDecline }: {
row: CaseRow | null; locale: string; reasons: DeclineReason[]; busy: boolean; quoting: boolean;
onParticipate: (id: string) => void; onOpenWorkbench: (id: string) => void; onRequestInfo: (id: string) => void; onAssign: (id: string, name: string) => void; onDecline: (id: string, reason: string) => void;
}) {
const [mode, setMode] = useState<null | "decline" | "assign">(null);
const [code, setCode] = useState(reasons[0]?.code ?? "fuera_apetito");
const [other, setOther] = useState(""); const [assignee, setAssignee] = useState("");
useEffect(() => { setMode(null); setOther(""); setAssignee(""); }, [row?.id]);
const disabled = !row || busy;
const ml = (row?.correspondence_lang ?? "es").toUpperCase();
const ActionButton = ({ label, desc, color, border, onClick }: any) => (
<button type="button" disabled={disabled} onClick={onClick} className="bg-card" style={{ textAlign: "left", width: "100%", border: `1px solid ${border}`, borderRadius: 14, padding: "12px 14px", cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.55 : 1 }}>
<div style={{ fontSize: "0.9rem", fontWeight: 700, color }}>{label}</div>
<div className="text-secondary" style={{ fontSize: "0.74rem", marginTop: 2 }}>{desc}</div>
</button>
);
return (
<div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
<PanelCard>
<p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", color: "#2f6fb3" }}>{pick(locale, "DECISIÓN", "DECISION", "决策")}</p>
<h3 className="text-primary" style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 4 }}>{pick(locale, "Acciones sobre el riesgo", "Actions on this risk", "针对该风险的操作")}</h3>
<p className="text-secondary" style={{ fontSize: "0.78rem", marginTop: 4 }}>{row ? row.insured : pick(locale, "Sin caso seleccionado", "No case selected", "未选择案件")}</p>
{row && <StageBadge stage={row.uw_stage} assigned={row.assigned_to} locale={locale} />}
{row && <p className="text-secondary" style={{ fontSize: "0.68rem", marginTop: 8 }}>{pick(locale, "Los correos al broker se redactan en", "Broker emails are written in", "致经纪人的邮件语言为")} <strong>{ml}</strong></p>}
</PanelCard>
<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
{quoting ? (
<ActionButton label={pick(locale, "Abrir workbench del slip", "Open slip workbench", "打开 Slip 工作台")} desc={pick(locale, "Marcar cláusulas y cotizar", "Mark clauses and quote", "标注条款并报价")} color={GREEN.fg} border="#bfe4d3" onClick={() => row && onOpenWorkbench(row.id)} />
) : (
<ActionButton label={pick(locale, "Participar", "Participate", "参与")} desc={pick(locale, "Avanzar a cotización", "Move to quote", "进入报价")} color={GREEN.fg} border="#bfe4d3" onClick={() => row && onParticipate(row.id)} />
)}
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
<span style={{ fontSize: "0.68rem", color: "#94a3b8" }}>{pick(locale, "Se enviará un correo de declinación al broker en", "A decline email will be sent to the broker in", "将以以下语言向经纪人发送拒绝邮件：")} {ml}.</span>
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
const [workbenchId, setWorkbenchId] = useState<string | null>(null);

useEffect(() => {
let active = true;
(async () => {
try {
const supabase = createSupabaseBrowserClient();
const [{ data, error }, rs] = await Promise.all([
supabase.from("dashboard_submissions_table")
.select("id,insured,broker_name,broker_canonical,line_of_business,country,currency,insured_limit,is_joint_review_request,has_slip,has_sov,has_loss_data,docs_received,compliance_status,compliance_evidence_path,uw_stage,assigned_to,correspondence_lang")
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
function caseLang(id: string): string {
return (cases?.find((c) => c.id === id)?.correspondence_lang as string) || "es";
}
async function onSetLang(id: string, lang: string) {
setBusy(true);
try { await rpc("set_correspondence_lang", { p_id: id, p_lang: lang }); patchCase(id, { correspondence_lang: lang }); }
catch (e: any) { setError(e?.message ?? "Error"); } finally { setBusy(false); }
}
async function onParticipate(id: string) { setBusy(true); try { await rpc("case_action", { p_id: id, p_stage: "cotizacion" }); patchCase(id, { uw_stage: "cotizacion" }); setWorkbenchId(id); } catch (e: any) { setError(e?.message ?? "Error"); } finally { setBusy(false); } }
async function onRequestInfo(id: string) {
setBusy(true);
try {
const row = cases?.find((c) => c.id === id);
if (row) {
const missing: string[] = [];
const ml = caseLang(id);
if (row.slip !== "met") missing.push(pick(ml, "Slip de términos", "Terms slip", "条款 Slip"));
if ((row.sov ?? "missing") !== "met") missing.push(pick(ml, "Relación de valores y ubicaciones (SOV)", "Statement of Values (SOV)", "标的清单 (SOV)"));
if (row.loss !== "met") missing.push(pick(ml, "Historial de siniestralidad (loss run)", "Loss run / claims history", "理赔历史 (loss run)"));
const { subject, body } = requestInfoEmail(ml, row.insured, row.line_of_business, missing);
await rpc("enqueue_broker_email", { p_submission_id: id, p_kind: "request_info", p_subject: subject, p_body: body });
}
await rpc("case_action", { p_id: id, p_stage: "info_solicitada" }); patchCase(id, { uw_stage: "info_solicitada" });
} catch (e: any) { setError(e?.message ?? "Error"); } finally { setBusy(false); }
}
async function onAssign(id: string, name: string) { setBusy(true); try { await rpc("case_action", { p_id: id, p_assigned: name }); patchCase(id, { assigned_to: name }); } catch (e: any) { setError(e?.message ?? "Error"); } finally { setBusy(false); } }
async function onSaveQuote(id: string, q: any) { setBusy(true); try { await rpc("save_quote", { p_id: id, ...q }); patchCase(id, { uw_stage: "cotizacion" }); } catch (e: any) { setError(e?.message ?? "Error"); throw e; } finally { setBusy(false); } }
async function onSendQuoteEmail(id: string, subject: string, body: string) { setBusy(true); try { await rpc("enqueue_broker_email", { p_submission_id: id, p_kind: "quote", p_subject: subject, p_body: body }); } catch (e: any) { setError(e?.message ?? "Error"); throw e; } finally { setBusy(false); } }
async function onDecline(id: string, reason: string) {
setBusy(true);
try {
const row = cases?.find((c) => c.id === id);
if (row) {
const { subject, body } = declineEmail(caseLang(id), row.insured, row.line_of_business, reason);
await rpc("enqueue_broker_email", { p_submission_id: id, p_kind: "decline", p_subject: subject, p_body: body });
}
await rpc("decline_submission", { p_id: id, p_reason: reason });
setWorkbenchId(null);
setCases((prev) => { const next = prev ? prev.filter((c) => c.id !== id) : prev; setSelected(next && next.length ? next[0] : null); return next; });
}
catch (e: any) { setError(e?.message ?? "Error"); } finally { setBusy(false); }
}

const kicker = pick(locale, "Heath · Suscripción", "Heath · Underwriting", "Heath · 核保");
const title = pick(locale, "Sabotaje y Terrorismo", "Sabotage & Terrorism", "破坏与恐怖主义");
const subtitle = pick(locale, "Negocios disponibles para revisión conjunta. Selecciona un caso para ver su slip y decidir.", "Businesses available for joint review. Select a case to see its slip and decide.", "可联合核保的业务。选择案件查看 Slip 并决策。");
const back = pick(locale, "Suscripción", "Underwriting", "核保");

const quoting = selected?.uw_stage === "cotizacion";
const mailLocale = (selected?.correspondence_lang as string) || "es";
const inWorkbench = !!(selected && workbenchId && selected.id === workbenchId && quoting);

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
) : inWorkbench && selected ? (
<SlipWorkbench row={selected} locale={locale} mailLocale={mailLocale} busy={busy} onBack={() => setWorkbenchId(null)} onSetLang={onSetLang} onSaveQuote={onSaveQuote} onSendEmail={onSendQuoteEmail} />
) : (
<div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
<InboxReviewPanel rows={cases as ReviewRow[]} selectedId={selected?.id} onSelect={(r) => setSelected(cases.find((c) => c.id === r.id) ?? null)} />
<div style={{ flex: 1, minWidth: 320, display: "flex", flexDirection: "column", gap: 14 }}>
<CaseDetailPanel row={selected} locale={locale} busy={busy} onSetLang={onSetLang} />
</div>
<div style={{ width: 320, minWidth: 300, display: "flex", flexDirection: "column", gap: 14 }}>
<DecisionPanel row={selected} locale={locale} reasons={reasons} busy={busy} quoting={quoting} onParticipate={onParticipate} onOpenWorkbench={(id) => setWorkbenchId(id)} onRequestInfo={onRequestInfo} onAssign={onAssign} onDecline={onDecline} />
</div>
</div>
)}
</div>
</div>
);
}
