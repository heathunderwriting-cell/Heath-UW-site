"use client";

import { useEffect, useRef, useState } from "react";
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

function Ic({ n, s = 16, c }: { n: string; s?: number; c?: string }) {
const common = { width: s, height: s, viewBox: "0 0 24 24", style: { color: c, flex: "0 0 auto" as const, display: "block" }, "aria-hidden": true } as const;
if (n === "youtube") return (<svg {...common} fill="none"><rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="currentColor" /><path d="M10 9.2l5.2 2.8L10 14.8z" fill="#fff" /></svg>);
if (n === "play") return (<svg {...common} fill="currentColor" stroke="none"><path d="M8 5.5v13l11-6.5z" /></svg>);
const paths: Record<string, string[]> = {
scope: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18", "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7", "M12 12l7-4.5"],
refresh: ["M3.5 12a8.5 8.5 0 0 1 14.4-6.1L20.5 8", "M20.5 3.5V8h-4.5", "M20.5 12a8.5 8.5 0 0 1-14.4 6.1L3.5 16", "M3.5 20.5V16H8"],
world: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18", "M3.5 12h17", "M12 3c2.5 2.4 3.8 5.6 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3"],
shield: ["M12 3l7 2.7v5.8c0 4.2-3 7.3-7 8.5-4-1.2-7-4.3-7-8.5V5.7z", "M9 12l2 2 4-4.2"],
gauge: ["M4 16a8 8 0 1 1 16 0", "M12 13l3.5-3.5"],
news: ["M4.5 5.5h11.5v13H6.5a2 2 0 0 1-2-2z", "M16 8.5h2a1.5 1.5 0 0 1 1.5 1.5v7a2 2 0 0 1-2 2", "M7 9h6.5", "M7 12h6.5", "M7 15h4"],
sparkles: ["M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z", "M18 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"],
flag: ["M5.5 21V4", "M5.5 4.5h10.5l-2 3.75 2 3.75H5.5"],
alert: ["M12 4.5l8.5 15h-17z", "M12 10.5v4", "M12 17.2h.01"],
pin: ["M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21z", "M12 8a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5"],
ext: ["M14 4.5h5.5V10", "M19.5 4.5l-8 8", "M18 13.5V18a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 18V8a1.5 1.5 0 0 1 1.5-1.5H11"],
clock: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17", "M12 7.5V12l3 1.8"],
file: ["M14 3.5v5h5", "M14 3.5H7.5A1.5 1.5 0 0 0 6 5v14a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V8.5z", "M9 13h6", "M9 16h6"],
clipboard: ["M9 5H7.5A1.5 1.5 0 0 0 6 6.5v12.5A1.5 1.5 0 0 0 7.5 20.5h9A1.5 1.5 0 0 0 18 19V6.5A1.5 1.5 0 0 0 16.5 5H15", "M9.5 3.5h5a1 1 0 0 1 1 1V6a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z", "M9 14l2 2 4-4"],
check: ["M5 12.5l4.5 4.5L19 7"],
minus: ["M5.5 12h13"],
calc: ["M6.5 3.5h11A1.5 1.5 0 0 1 19 5v14a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19V5a1.5 1.5 0 0 1 1.5-1.5z", "M8.5 7.5h7", "M9 12h.01M12 12h.01M15 12h.01M9 15.5h.01M12 15.5h.01M15 15.5h.01"],
bolt: ["M13 3L5 13.5h6l-1 7.5L18 10.5h-6z"],
chevronr: ["M9.5 6.5l5.5 5.5-5.5 5.5"],
filedown: ["M14 3.5v5h5", "M14 3.5H7.5A1.5 1.5 0 0 0 6 5v14a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V8.5z", "M12 11.5v5", "M9.5 14.5l2.5 2.5 2.5-2.5"],
back: ["M19 12H5.5", "M11.5 18.5L5 12l6.5-6.5"],
save: ["M6.5 4.5h10l3.5 3.5V19a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 5 19V6A1.5 1.5 0 0 1 6.5 4.5z", "M8.5 4.5v4h7v-4", "M12 11.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5"],
send: ["M21 3.5L10.5 14", "M21 3.5l-6.8 17-3.7-7.5L3 9.3z"],
circlecheck: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17", "M8 12l3 3 5-5"],
coin: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17", "M12 7v10", "M14.7 9.3c0-1.2-1.2-1.8-2.7-1.8s-2.7.6-2.7 1.8 1.2 1.6 2.7 1.8 2.7.6 2.7 1.8-1.2 1.8-2.7 1.8-2.7-.6-2.7-1.8"],
};
return (<svg {...common} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">{(paths[n] || []).map((d, i) => (<path key={i} d={d} />))}</svg>);
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

function IntelligencePanel({ submissionId, locale }: { submissionId: string; locale: string }) {
const [data, setData] = useState<any>(null);
const [loading, setLoading] = useState(false);
const [err, setErr] = useState<string | null>(null);

useEffect(() => {
let active = true;
(async () => {
try {
const supabase = createSupabaseBrowserClient();
const { data: row } = await supabase
.from("submission_intelligence")
.select("unrest,company,ofac,summary,red_flags,domain,website,logo,cover,videos,fetched_at")
.eq("submission_id", submissionId)
.maybeSingle();
if (active && row) setData(row);
} catch { /* sin caché: el usuario puede buscar manualmente */ }
})();
return () => { active = false; };
}, [submissionId]);

async function search() {
setLoading(true); setErr(null);
try {
const supabase = createSupabaseBrowserClient();
const { data: res, error } = await supabase.functions.invoke("business-intelligence", { body: { submission_id: submissionId } });
if (error) throw error;
if (res && (res as any).ok) setData(res); else throw new Error((res as any)?.error || "Error");
} catch (e: any) { setErr(e?.message ?? "Error"); } finally { setLoading(false); }
}

const company: any[] = data?.company ?? [];
const unrest: any[] = data?.unrest ?? [];
const redFlags: string[] = data?.red_flags ?? [];
const ofacStatus: string = (data?.ofac?.status ?? "").toLowerCase();
const ofacTone = ofacStatus.includes("clear") || ofacStatus.includes("limpio") ? GREEN
: ofacStatus.includes("hit") || ofacStatus.includes("coincid") ? RED
: ofacStatus.includes("review") || ofacStatus.includes("revis") ? AMBER : null;
const website: string | null = data?.website ?? null;
const logo: string | null = data?.logo ?? null;
const cover: string | null = data?.cover ?? null;
const videos: any[] = data?.videos ?? [];
const has = Boolean(data && (data.summary || redFlags.length || company.length || unrest.length || website || videos.length));
let confidence = 0;
confidence += Math.min(company.length, 4) / 4 * 40;
if (data?.summary) confidence += 20;
if (ofacStatus) confidence += 15;
confidence += Math.min(unrest.length, 4) / 4 * 10;
if (website) confidence += 15;
confidence = Math.round(confidence);
const confTone = confidence >= 70 ? GREEN : confidence >= 40 ? AMBER : RED;

function newsList(items: any[]) {
if (!items.length) return <p style={{ fontSize: "0.72rem", color: "#94a3b8", margin: 0 }}>{pick(locale, "Sin noticias recientes.", "No recent news.", "暂无近期新闻。")}</p>;
return (
<div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
{items.map((a, i) => (
<a key={i} href={a.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: 10, alignItems: "flex-start", border: "1px solid #e6edf6", borderRadius: 10, padding: "9px 11px", textDecoration: "none", background: "#fff" }}>
<img src={`https://www.google.com/s2/favicons?domain=${a.domain || ""}&sz=64`} alt="" width={18} height={18} style={{ width: 18, height: 18, borderRadius: 4, marginTop: 1, flex: "0 0 auto" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }} />
<span style={{ flex: 1, minWidth: 0 }}>
<span style={{ display: "block", fontSize: "0.79rem", fontWeight: 600, color: "#1f2a44", lineHeight: 1.3 }}>{a.title}</span>
<span style={{ display: "block", fontSize: "0.66rem", color: "#94a3b8", marginTop: 3 }}>{[a.domain, a.date, a.src].filter(Boolean).join(" · ")}</span>
</span>
<span style={{ color: "#c2cede", marginTop: 1, flex: "0 0 auto" }}><Ic n="ext" s={14} /></span>
</a>
))}
</div>
);
}

const newsCount = company.length + unrest.length;
const ofacShort = ofacTone ? (ofacStatus.includes("clear") || ofacStatus.includes("limpio") ? pick(locale, "Limpio", "Clear", "通过") : ofacStatus.includes("hit") || ofacStatus.includes("coincid") ? pick(locale, "Alerta", "Hit", "命中") : pick(locale, "Revisar", "Review", "待审")) : "—";
const metrics: { ic: string; label: string; val: string; t: { bg: string; fg: string } }[] = [
{ ic: "gauge", label: pick(locale, "Confianza", "Confidence", "置信度"), val: `${confidence}%`, t: confTone },
{ ic: "shield", label: "OFAC", val: ofacShort, t: ofacTone || BLUE },
{ ic: "news", label: pick(locale, "Noticias", "News", "新闻"), val: String(newsCount), t: BLUE },
{ ic: "youtube", label: "Videos", val: String(videos.length), t: { bg: "#fdeceb", fg: "#e2453f" } },
];

return (
<div style={{ border: "1px solid #d9e2f0", borderRadius: 16, marginBottom: 14, background: "#fff", overflow: "hidden", boxShadow: "0 1px 2px rgba(16,42,76,0.04)" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "13px 16px", background: "#f8fbfe", borderBottom: "1px solid #eef2f8" }}>
<div style={{ display: "flex", alignItems: "center", gap: 11, minWidth: 0 }}>
<span style={{ width: 34, height: 34, borderRadius: 10, background: "#e3effb", color: "#2f6fb3", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}><Ic n="scope" s={19} c="#2f6fb3" /></span>
<span style={{ minWidth: 0 }}>
<span style={{ display: "block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", color: "#94a3b8" }}>{pick(locale, "DUE DILIGENCE", "DUE DILIGENCE", "尽职调查")}</span>
<span className="text-primary" style={{ display: "block", fontSize: "0.92rem", fontWeight: 700 }}>{pick(locale, "Inteligencia del caso", "Case intelligence", "案件情报")}</span>
</span>
</div>
<button type="button" disabled={loading} onClick={search} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "none", background: "#2f6fb3", color: "#fff", fontSize: "0.74rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, cursor: loading ? "default" : "pointer", opacity: loading ? 0.6 : 1, flex: "0 0 auto" }}><Ic n={has ? "refresh" : "sparkles"} s={14} c="#fff" />{loading ? pick(locale, "Buscando…", "Searching…", "搜索中…") : has ? pick(locale, "Actualizar", "Refresh", "刷新") : pick(locale, "Buscar", "Run", "运行")}</button>
</div>

<div style={{ padding: "14px 16px" }}>
{err && <p style={{ fontSize: "0.72rem", color: RED.fg, margin: "0 0 8px" }}>{err}</p>}
{!has && !loading && !err && (
<p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>{pick(locale, "Genera un análisis de noticias, banderas rojas y resumen de due diligence para este asegurado.", "Generate a news analysis, red flags and due-diligence summary for this insured.", "为此被保险人生成新闻分析、风险提示与尽职调查摘要。")}</p>
)}

{has && (
<>
<div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 14 }}>
{metrics.map((m, i) => (
<div key={i} style={{ border: "1px solid #eef2f8", borderRadius: 12, padding: "9px 10px", background: "#fbfdff" }}>
<span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: 7, background: m.t.bg, color: m.t.fg }}><Ic n={m.ic} s={14} c={m.t.fg} /></span>
<span style={{ display: "block", fontSize: "1.05rem", fontWeight: 700, color: "#1f2a44", marginTop: 6, lineHeight: 1 }}>{m.val}</span>
<span style={{ display: "block", fontSize: "0.62rem", color: "#94a3b8", marginTop: 3, fontWeight: 600 }}>{m.label}</span>
</div>
))}
</div>

{(logo || website) && (
<div style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", border: "1px solid #eef2f8", borderRadius: 12, marginBottom: 12, background: "#fbfdff" }}>
{logo && (
<img src={logo} alt="" width={40} height={40} style={{ width: 40, height: 40, borderRadius: 9, objectFit: "contain", border: "1px solid #e8eef6", background: "#fff", flex: "0 0 auto" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
)}
<span style={{ flex: 1, minWidth: 0 }}>
{website && (
<a href={website} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.82rem", fontWeight: 600, color: "#2f6fb3", textDecoration: "none", wordBreak: "break-all" }}>{website.replace(/^https?:\/\//, "").replace(/\/$/, "")}<Ic n="ext" s={13} /></a>
)}
{data?.domain && <span style={{ display: "block", fontSize: "0.66rem", color: "#94a3b8", marginTop: 2 }}>{data.domain}</span>}
</span>
{ofacTone && (
<span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.68rem", fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: ofacTone.bg, color: ofacTone.fg, flex: "0 0 auto" }}><Ic n="shield" s={12} c={ofacTone.fg} />OFAC: {data.ofac.status}</span>
)}
</div>
)}

{cover && (
<div style={{ marginBottom: 12 }}>
<img src={cover} alt="" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 12, border: "1px solid #e8eef6", display: "block" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
</div>
)}

{data?.summary && (
<div style={{ marginBottom: 12 }}>
<p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.08em", color: "#64748b", margin: "0 0 5px" }}><Ic n="sparkles" s={13} c="#2f6fb3" />{pick(locale, "RESUMEN IA", "AI SUMMARY", "AI 摘要")}</p>
<p className="text-primary" style={{ fontSize: "0.82rem", lineHeight: 1.55, margin: 0 }}>{data.summary}</p>
</div>
)}

{redFlags.length > 0 && (
<div style={{ marginBottom: 12 }}>
<p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.08em", color: RED.fg, margin: "0 0 6px" }}><Ic n="alert" s={13} c={RED.fg} />{pick(locale, "BANDERAS ROJAS", "RED FLAGS", "风险提示")}</p>
<div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
{redFlags.map((f, i) => (
<div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", border: `1px solid ${RED.bg}`, background: "#fef6f5", borderRadius: 10, padding: "8px 11px" }}>
<span style={{ color: RED.fg, marginTop: 1, flex: "0 0 auto" }}><Ic n="flag" s={14} c={RED.fg} /></span>
<span className="text-primary" style={{ fontSize: "0.8rem", lineHeight: 1.4 }}>{f}</span>
</div>
))}
</div>
</div>
)}

{company.length > 0 && (
<div style={{ marginBottom: 12 }}>
<p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.08em", color: "#64748b", margin: "0 0 7px" }}><Ic n="news" s={13} c="#2f6fb3" />{pick(locale, "NOTICIAS DE LA EMPRESA", "COMPANY NEWS", "公司新闻")}</p>
{newsList(company)}
</div>
)}

{unrest.length > 0 && (
<div style={{ marginBottom: 12 }}>
<p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.08em", color: "#64748b", margin: "0 0 7px" }}><Ic n="world" s={13} c="#2f6fb3" />{pick(locale, "COYUNTURA DEL PAÍS", "COUNTRY UNREST", "国别动态")}</p>
{newsList(unrest)}
</div>
)}

{videos.length > 0 && (
<div style={{ marginBottom: 2 }}>
<p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.08em", color: "#64748b", margin: "0 0 7px" }}><Ic n="youtube" s={15} c="#e2453f" />{pick(locale, "VIDEOS (YOUTUBE)", "VIDEOS (YOUTUBE)", "视频 (YOUTUBE)")}</p>
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
{videos.map((v, i) => (
<a key={i} href={v.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", border: "1px solid #e6edf6", borderRadius: 11, overflow: "hidden", textDecoration: "none", background: "#fff" }}>
<span style={{ position: "relative", display: "block" }}>
{v.thumbnail && <img src={v.thumbnail} alt="" style={{ width: "100%", height: 88, objectFit: "cover", display: "block" }} />}
<span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
<span style={{ width: 30, height: 30, borderRadius: 999, background: "rgba(226,69,63,0.92)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}><Ic n="play" s={14} c="#fff" /></span>
</span>
{v.duration && <span style={{ position: "absolute", right: 5, bottom: 5, fontSize: "0.58rem", fontWeight: 700, color: "#fff", background: "rgba(0,0,0,0.75)", padding: "1px 5px", borderRadius: 4 }}>{v.duration}</span>}
</span>
<span style={{ display: "block", padding: "6px 8px" }}>
<span style={{ display: "block", fontSize: "0.68rem", fontWeight: 600, color: "#1f2a44", lineHeight: 1.3, maxHeight: "2.6em", overflow: "hidden" }}>{v.title}</span>
<span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.6rem", color: "#94a3b8", marginTop: 3 }}><Ic n="youtube" s={11} c="#e2453f" />{v.channel}</span>
</span>
</a>
))}
</div>
</div>
)}

{data?.fetched_at && (
<p style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.64rem", color: "#94a3b8", margin: "12px 0 0" }}><Ic n="clock" s={12} />{pick(locale, "Actualizado", "Updated", "更新于")}: {String(data.fetched_at).slice(0, 10)}</p>
)}
</>
)}
</div>
</div>
);
}

let leafletPromise: Promise<any> | null = null;
function loadLeaflet(): Promise<any> {
if (typeof window === "undefined") return Promise.reject(new Error("no window"));
if ((window as any).L) return Promise.resolve((window as any).L);
if (leafletPromise) return leafletPromise;
leafletPromise = new Promise((resolve, reject) => {
const css = document.createElement("link");
css.rel = "stylesheet";
css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
document.head.appendChild(css);
const s = document.createElement("script");
s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
s.async = true;
s.onload = () => resolve((window as any).L);
s.onerror = () => reject(new Error("leaflet failed"));
document.body.appendChild(s);
});
return leafletPromise;
}

type SovLoc = { id: string; label: string; city: string | null; country: string | null; lat: number | null; lng: number | null; value_amount: number | null; value_currency: string | null };
type InsLoc = { id: string; label: string; lat: number | null; lng: number | null };
type Conc = { matches: { i: number; j: number; d: number }[]; sovOnly: number[]; insOnly: number[]; avg: number; score: number };

const MATCH_THRESHOLD_M = 400;

function sovColor(country: string | null | undefined, home: string | null | undefined) {
if (!home || !country) return "#2f6fb3";
return country.trim().toUpperCase() === home.trim().toUpperCase() ? "#2f6fb3" : "#e2453f";
}
function haversine(aLat: number, aLng: number, bLat: number, bLng: number) {
const R = 6371000;
const dLat = (bLat - aLat) * Math.PI / 180;
const dLng = (bLng - aLng) * Math.PI / 180;
const la1 = aLat * Math.PI / 180, la2 = bLat * Math.PI / 180;
const x = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
return 2 * R * Math.asin(Math.sqrt(x));
}
function matchLocations(sov: SovLoc[], ins: InsLoc[], thresh: number): Conc {
const pairs: { i: number; j: number; d: number }[] = [];
for (let i = 0; i < sov.length; i++) for (let j = 0; j < ins.length; j++) {
const d = haversine(sov[i].lat as number, sov[i].lng as number, ins[j].lat as number, ins[j].lng as number);
if (d <= thresh) pairs.push({ i, j, d });
}
pairs.sort((a, b) => a.d - b.d);
const usedS = new Set<number>(), usedI = new Set<number>(); const matches: { i: number; j: number; d: number }[] = [];
for (const p of pairs) { if (usedS.has(p.i) || usedI.has(p.j)) continue; usedS.add(p.i); usedI.add(p.j); matches.push(p); }
const sovOnly: number[] = []; for (let i = 0; i < sov.length; i++) if (!usedS.has(i)) sovOnly.push(i);
const insOnly: number[] = []; for (let j = 0; j < ins.length; j++) if (!usedI.has(j)) insOnly.push(j);
const avg = matches.length ? matches.reduce((s, m) => s + m.d, 0) / matches.length : 0;
const total = sov.length + ins.length;
const score = total ? Math.round((matches.length * 2 / total) * 100) : 0;
return { matches, sovOnly, insOnly, avg, score };
}
function esc(s: string) { return String(s).replace(/</g, "&lt;"); }
function drawSovMap(L: any, map: any, sov: SovLoc[], ins: InsLoc[], conc: Conc | null, home: string | null | undefined, locale: string) {
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(map);
const all: [number, number][] = [];
if (conc) conc.matches.forEach((m) => {
L.polyline([[sov[m.i].lat as number, sov[m.i].lng as number], [ins[m.j].lat as number, ins[m.j].lng as number]], { color: "#94a3b8", weight: 1.5, dashArray: "5 4" }).addTo(map);
});
sov.forEach((l, idx) => {
const c = sovColor(l.country, home);
if (conc && conc.sovOnly.indexOf(idx) >= 0) L.circleMarker([l.lat as number, l.lng as number], { radius: 13, color: "#e2453f", weight: 2, fill: false }).addTo(map);
const sub = [l.city, l.country].filter(Boolean).join(", ");
L.circleMarker([l.lat as number, l.lng as number], { radius: 7, color: "#fff", weight: 2, fillColor: c, fillOpacity: 1 })
.addTo(map)
.bindPopup(`<strong>${esc(l.label)}</strong><br><span style="color:#2f6fb3">${pick(locale, "SOV", "SOV", "标的")}</span>${sub ? ` · <span style="color:#64748b">${esc(sub)}</span>` : ""}`);
all.push([l.lat as number, l.lng as number]);
});
ins.forEach((l, idx) => {
if (conc && conc.insOnly.indexOf(idx) >= 0) L.circleMarker([l.lat as number, l.lng as number], { radius: 13, color: "#d9a400", weight: 2, fill: false }).addTo(map);
L.circleMarker([l.lat as number, l.lng as number], { radius: 7, color: "#fff", weight: 2, fillColor: "#0f6e56", fillOpacity: 1 })
.addTo(map)
.bindPopup(`<strong>${esc(l.label)}</strong><br><span style="color:#0f6e56">${pick(locale, "Asegurado (Excel)", "Insured (Excel)", "被保险人 (Excel)")}</span>`);
all.push([l.lat as number, l.lng as number]);
});
if (all.length === 1) map.setView(all[0], 12);
else if (all.length) map.fitBounds(L.latLngBounds(all), { padding: [34, 34], maxZoom: 14 });
}

function ConcGauge({ score, locale }: { score: number; locale: string }) {
const tone = score >= 80 ? "#0f6e56" : score >= 50 ? "#8a5a00" : "#b42318";
const circ = 2 * Math.PI * 32;
const off = circ * (1 - score / 100);
return (
<svg width={78} height={78} viewBox="0 0 78 78" role="img" aria-label={`${pick(locale, "Concordancia", "Concordance", "一致度")} ${score}%`}>
<circle cx={39} cy={39} r={32} fill="none" stroke="#eef2f8" strokeWidth={8} />
<circle cx={39} cy={39} r={32} fill="none" stroke={tone} strokeWidth={8} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off} transform="rotate(-90 39 39)" />
<text x={39} y={44} textAnchor="middle" fontSize={18} fontWeight={700} fill="#1f2a44">{score}%</text>
</svg>
);
}

let xlsxPromise: Promise<any> | null = null;
function loadXlsx(): Promise<any> {
if (typeof window === "undefined") return Promise.reject(new Error("no window"));
if ((window as any).XLSX) return Promise.resolve((window as any).XLSX);
if (xlsxPromise) return xlsxPromise;
xlsxPromise = new Promise((resolve, reject) => {
const s = document.createElement("script");
s.src = "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js";
s.async = true;
s.onload = () => resolve((window as any).XLSX);
s.onerror = () => reject(new Error("xlsx failed"));
document.body.appendChild(s);
});
return xlsxPromise;
}
function nearestOf(lat: number, lng: number, set: { label: string; lat: number | null; lng: number | null }[]) {
let best: { label: string; d: number } | null = null;
for (const o of set) {
if (typeof o.lat !== "number" || typeof o.lng !== "number") continue;
const d = haversine(lat, lng, o.lat, o.lng);
if (!best || d < best.d) best = { label: o.label, d };
}
return best;
}
async function downloadDiscrepancies(conc: Conc, sov: SovLoc[], ins: InsLoc[], locale: string, insuredName: string) {
const XLSX = await loadXlsx();
const H = {
tipo: pick(locale, "Tipo", "Type", "类型"),
ubic: pick(locale, "Ubicación", "Location", "地点"),
lat: "Lat", lng: "Lng",
pais: pick(locale, "País", "Country", "国家"),
cercano: pick(locale, "Punto SOV/asegurado más cercano", "Nearest SOV/insured point", "最近点"),
dist: pick(locale, "Distancia al más cercano (m)", "Distance to nearest (m)", "到最近点距离 (米)"),
obs: pick(locale, "Observación", "Note", "备注"),
};
const rows: Record<string, any>[] = [];
conc.insOnly.forEach((j) => {
const l = ins[j];
const n = nearestOf(l.lat as number, l.lng as number, sov);
rows.push({
[H.tipo]: pick(locale, "Solo asegurado (Excel)", "Insured only (Excel)", "仅被保险人 (Excel)"),
[H.ubic]: l.label, [H.lat]: l.lat, [H.lng]: l.lng, [H.pais]: "",
[H.cercano]: n ? n.label : "", [H.dist]: n ? Math.round(n.d) : "",
[H.obs]: pick(locale, "Operado por el asegurado pero ausente del SOV — posible exposición no declarada.", "Operated by insured but missing from SOV — possible undeclared exposure.", "由被保险人运营但 SOV 中缺失 — 可能存在未申报风险。"),
});
});
conc.sovOnly.forEach((i) => {
const l = sov[i];
const n = nearestOf(l.lat as number, l.lng as number, ins);
rows.push({
[H.tipo]: pick(locale, "Solo en SOV", "SOV only", "仅 SOV"),
[H.ubic]: l.label, [H.lat]: l.lat, [H.lng]: l.lng, [H.pais]: l.country || "",
[H.cercano]: n ? n.label : "", [H.dist]: n ? Math.round(n.d) : "",
[H.obs]: pick(locale, "En el SOV pero no en el mapa del asegurado — verificar dirección o posible sobre-declaración.", "In SOV but not on insured's map — verify address or possible over-declaration.", "在 SOV 中但不在被保险人地图上 — 请核实地址或可能存在虚报。"),
});
});
const header = [H.tipo, H.ubic, H.lat, H.lng, H.pais, H.cercano, H.dist, H.obs];
const ws = XLSX.utils.json_to_sheet(rows.length ? rows : [{ [H.tipo]: pick(locale, "Sin discrepancias", "No discrepancies", "无差异") }], { header });
ws["!cols"] = [{ wch: 24 }, { wch: 40 }, { wch: 11 }, { wch: 11 }, { wch: 14 }, { wch: 34 }, { wch: 22 }, { wch: 64 }];
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, pick(locale, "Discrepancias", "Discrepancies", "差异"));
const safe = (insuredName || "asegurado").replace(/[^\w\- ]+/g, "").trim().replace(/\s+/g, "_").slice(0, 40) || "asegurado";
const date = new Date().toISOString().slice(0, 10);
XLSX.writeFile(wb, `concordancia_discrepancias_${safe}_${date}.xlsx`);
}

function SovMap({ submissionId, homeCountry, insuredName, locale }: { submissionId: string; homeCountry?: string | null; insuredName?: string | null; locale: string }) {
const [locs, setLocs] = useState<SovLoc[]>([]);
const [insAll, setInsAll] = useState<InsLoc[]>([]);
const [expanded, setExpanded] = useState(false);
const [importing, setImporting] = useState(false);
const [importMsg, setImportMsg] = useState<{ ok: boolean; text: string } | null>(null);
const [downloading, setDownloading] = useState(false);
const compactRef = useRef<HTMLDivElement | null>(null);
const fullRef = useRef<HTMLDivElement | null>(null);
const fileRef = useRef<HTMLInputElement | null>(null);

useEffect(() => {
let active = true;
(async () => {
try {
const supabase = createSupabaseBrowserClient();
const [sovRes, insRes] = await Promise.all([
supabase.from("sov_locations").select("id,label,city,country,lat,lng,value_amount,value_currency").eq("submission_id", submissionId),
supabase.from("insured_locations").select("id,label,lat,lng").eq("submission_id", submissionId),
]);
if (active && sovRes.data) setLocs(sovRes.data as any);
if (active && insRes.data) setInsAll(insRes.data as any);
} catch { /* tablas pueden no tener filas todavía */ }
})();
return () => { active = false; };
}, [submissionId]);

const pts = locs.filter((l) => typeof l.lat === "number" && typeof l.lng === "number");
const insPts = insAll.filter((l) => typeof l.lat === "number" && typeof l.lng === "number");
const outside = homeCountry ? pts.filter((l) => sovColor(l.country, homeCountry) === "#e2453f").length : 0;
const conc = insPts.length ? matchLocations(pts, insPts, MATCH_THRESHOLD_M) : null;
const hasMap = pts.length > 0 || insPts.length > 0;
const sig = `${pts.length}-${insPts.length}-${submissionId}`;

async function importExcel(file: File) {
if (!file || importing) return;
setImporting(true); setImportMsg(null);
try {
const XLSX = await loadXlsx();
const buf = await file.arrayBuffer();
const wb = XLSX.read(buf, { type: "array" });
const ws = wb.Sheets[wb.SheetNames[0]];
const raw: any[] = XLSX.utils.sheet_to_json(ws, { defval: null });
const norm = (s: any) => String(s ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
const grab = (obj: any, names: string[]) => { for (const k of Object.keys(obj)) { if (names.includes(norm(k))) { const v = obj[k]; if (v !== null && v !== undefined && String(v).trim() !== "") return v; } } return null; };
const rows = raw.map((r) => ({
label: grab(r, ["ubicacion", "ubicación", "label", "nombre", "name", "sede", "site", "planta", "location"]),
address: grab(r, ["direccion", "dirección", "address", "domicilio", "ubicacion completa", "direccion completa"]),
lat: grab(r, ["lat", "latitud", "latitude", "y"]),
lng: grab(r, ["lng", "lon", "long", "longitud", "longitude", "x"]),
})).filter((r) => r.label || r.address || (r.lat != null && r.lng != null));
if (!rows.length) throw new Error(pick(locale, "No se reconocieron filas con ubicaciones en el Excel.", "No location rows recognized in the Excel.", "未在 Excel 中识别到地点行。"));
const supabase = createSupabaseBrowserClient();
const { data: res, error } = await supabase.functions.invoke("import-insured-locations", { body: { submission_id: submissionId, country: homeCountry ?? null, rows } });
if (error) throw error;
if (res && (res as any).ok) {
const n = (res as any).imported; const g = (res as any).geocoded;
setImportMsg({ ok: true, text: pick(locale, `Importadas ${n} ubicaciones${g ? ` · ${g} geocodificadas` : ""}`, `Imported ${n} locations${g ? ` · ${g} geocoded` : ""}`, `已导入 ${n} 个地点${g ? `（${g} 个已地理编码）` : ""}`) });
const { data } = await supabase.from("insured_locations").select("id,label,lat,lng").eq("submission_id", submissionId);
if (data) setInsAll(data as any);
} else { throw new Error((res as any)?.error || "Error"); }
} catch (e: any) { setImportMsg({ ok: false, text: e?.message ?? "Error" }); } finally { setImporting(false); if (fileRef.current) fileRef.current.value = ""; }
}

async function downloadDisc() {
if (!conc || downloading) return;
setDownloading(true);
try { await downloadDiscrepancies(conc, pts, insPts, locale, insuredName ?? ""); }
catch { setImportMsg({ ok: false, text: pick(locale, "No se pudo generar el Excel.", "Could not generate the Excel.", "无法生成 Excel。") }); }
finally { setDownloading(false); }
}

useEffect(() => {
if (!hasMap || !compactRef.current) return;
let map: any; let cancelled = false;
loadLeaflet().then((L) => {
if (cancelled || !compactRef.current) return;
map = L.map(compactRef.current, { scrollWheelZoom: false, zoomControl: false, attributionControl: true });
drawSovMap(L, map, pts, insPts, conc, homeCountry, locale);
}).catch(() => {});
return () => { cancelled = true; if (map) map.remove(); };
}, [sig]);

useEffect(() => {
if (!expanded || !hasMap || !fullRef.current) return;
let map: any; let cancelled = false;
loadLeaflet().then((L) => {
if (cancelled || !fullRef.current) return;
map = L.map(fullRef.current, { scrollWheelZoom: true });
drawSovMap(L, map, pts, insPts, conc, homeCountry, locale);
setTimeout(() => { try { map.invalidateSize(); } catch {} }, 60);
}).catch(() => {});
return () => { cancelled = true; if (map) map.remove(); };
}, [expanded, sig]);

useEffect(() => {
if (!expanded) return;
const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setExpanded(false); };
window.addEventListener("keydown", onKey);
return () => window.removeEventListener("keydown", onKey);
}, [expanded]);

return (
<div style={{ border: "1px solid #d9e2f0", borderRadius: 16, background: "#fff", overflow: "hidden", boxShadow: "0 1px 2px rgba(16,42,76,0.04)" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "13px 16px", background: "#f8fbfe", borderBottom: "1px solid #eef2f8" }}>
<div style={{ display: "flex", alignItems: "center", gap: 11, minWidth: 0 }}>
<span style={{ width: 34, height: 34, borderRadius: 10, background: "#e3effb", color: "#2f6fb3", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}><Ic n="pin" s={19} c="#2f6fb3" /></span>
<span style={{ minWidth: 0 }}>
<span style={{ display: "block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", color: "#94a3b8" }}>{pick(locale, "RELACIÓN DE VALORES", "STATEMENT OF VALUES", "标的清单")}</span>
<span className="text-primary" style={{ display: "block", fontSize: "0.92rem", fontWeight: 700 }}>{pick(locale, "Ubicaciones del SOV", "SOV locations", "标的地点")}</span>
</span>
</div>
{hasMap && (
<button type="button" onClick={() => setExpanded(true)} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid #cfe0f4", background: "#fff", color: "#2f6fb3", fontSize: "0.74rem", fontWeight: 700, padding: "7px 13px", borderRadius: 999, cursor: "pointer", flex: "0 0 auto" }}><Ic n="world" s={14} c="#2f6fb3" />{pick(locale, "Mapa completo", "Full map", "完整地图")}</button>
)}
</div>
{hasMap ? (
<div ref={compactRef} style={{ width: "100%", height: 300, background: "#eef4fb" }} />
) : (
<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: "34px 20px", textAlign: "center" }}>
<span style={{ width: 40, height: 40, borderRadius: 12, background: "#eef4fb", color: "#94a3b8", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic n="pin" s={20} c="#94a3b8" /></span>
<p className="text-secondary" style={{ fontSize: "0.78rem", maxWidth: 340 }}>{pick(locale, "Sin ubicaciones del SOV todavía. Se cargarán al procesar la relación de valores.", "No SOV locations yet. They will load once the statement of values is processed.", "暂无标的地点，处理标的清单后将自动加载。")}</p>
</div>
)}
{hasMap && (
<div style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: "9px 16px", borderTop: "1px solid #eef2f8", fontSize: "0.68rem", color: "#64748b" }}>
<span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 999, background: "#2f6fb3" }} />{pick(locale, "SOV", "SOV", "标的")}: {pts.length}</span>
{insPts.length > 0 && <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 999, background: "#0f6e56" }} />{pick(locale, "Asegurado", "Insured", "被保险人")}: {insPts.length}</span>}
{outside > 0 && <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 999, background: "#e2453f" }} />{pick(locale, "Fuera del país", "Outside country", "境外")}: {outside}</span>}
{conc && <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 14, borderTop: "2px dashed #94a3b8" }} />{pick(locale, "Par emparejado", "Matched pair", "匹配对")}</span>}
</div>
)}
{conc && (
<div style={{ borderTop: "1px solid #eef2f8" }}>
<div style={{ display: "flex", flexWrap: "wrap", gap: 14, padding: "13px 16px", alignItems: "center" }}>
<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
<ConcGauge score={conc.score} locale={locale} />
<div>
<div className="text-primary" style={{ fontSize: "0.82rem", fontWeight: 700 }}>{pick(locale, "Concordancia SOV ↔ asegurado", "SOV ↔ insured concordance", "SOV ↔ 被保险人一致度")}</div>
<div style={{ fontSize: "0.72rem", color: "#64748b", maxWidth: 230 }}>{pick(locale, `${conc.matches.length} de ${pts.length + insPts.length - conc.matches.length} sedes emparejadas; distancia media ${Math.round(conc.avg)} m.`, `${conc.matches.length} of ${pts.length + insPts.length - conc.matches.length} unique sites matched; avg distance ${Math.round(conc.avg)} m.`, `${conc.matches.length} 处匹配；平均距离 ${Math.round(conc.avg)} 米。`)}</div>
</div>
</div>
<div style={{ display: "flex", gap: 8, flex: 1, minWidth: 220 }}>
<div style={{ flex: 1, background: "#eaf6f0", borderRadius: 8, padding: "9px 10px" }}><div style={{ fontSize: "0.66rem", color: "#0f6e56" }}>{pick(locale, "Emparejadas", "Matched", "匹配")}</div><div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f6e56" }}>{conc.matches.length}</div></div>
<div style={{ flex: 1, background: "#fdecea", borderRadius: 8, padding: "9px 10px" }}><div style={{ fontSize: "0.66rem", color: "#b42318" }}>{pick(locale, "Solo en SOV", "SOV only", "仅 SOV")}</div><div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#b42318" }}>{conc.sovOnly.length}</div></div>
<div style={{ flex: 1, background: "#fbf1da", borderRadius: 8, padding: "9px 10px" }}><div style={{ fontSize: "0.66rem", color: "#8a5a00" }}>{pick(locale, "Solo asegurado", "Insured only", "仅被保险人")}</div><div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#8a5a00" }}>{conc.insOnly.length}</div></div>
</div>
</div>
{(conc.sovOnly.length > 0 || conc.insOnly.length > 0) && (
<div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "0 16px 13px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 2 }}>
<span style={{ fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.1em", color: "#94a3b8" }}>{pick(locale, "DISCREPANCIAS", "DISCREPANCIES", "差异")} · {conc.sovOnly.length + conc.insOnly.length}</span>
<button type="button" disabled={downloading} onClick={downloadDisc} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid #cfe0f4", background: "#fff", color: "#2f6fb3", fontSize: "0.72rem", fontWeight: 700, padding: "6px 12px", borderRadius: 999, cursor: downloading ? "default" : "pointer", opacity: downloading ? 0.6 : 1, flex: "0 0 auto" }}><Ic n={downloading ? "refresh" : "filedown"} s={13} c="#2f6fb3" />{downloading ? pick(locale, "Generando…", "Generating…", "生成中…") : pick(locale, "Descargar Excel", "Download Excel", "下载 Excel")}</button>
</div>
{conc.sovOnly.map((i) => (
<div key={`s${i}`} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 10px", background: "#fdecea", borderRadius: 8, fontSize: "0.72rem", color: "#7a1d12" }}><Ic n="alert" s={14} c="#b42318" /><span>{pick(locale, `“${pts[i].label}” está en el SOV pero no en el mapa del asegurado — verificar dirección o posible sobre-declaración.`, `“${pts[i].label}” is in the SOV but not on the insured's map — verify address or possible over-declaration.`, `“${pts[i].label}” 在 SOV 中但不在被保险人地图上 — 请核实地址或可能存在虚报。`)}</span></div>
))}
{conc.insOnly.map((j) => (
<div key={`i${j}`} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 10px", background: "#fbf1da", borderRadius: 8, fontSize: "0.72rem", color: "#6b4600" }}><Ic n="pin" s={14} c="#8a5a00" /><span>{pick(locale, `“${insPts[j].label}” lo opera el asegurado pero falta en el SOV — posible exposición no declarada.`, `“${insPts[j].label}” is operated by the insured but missing from the SOV — possible undeclared exposure.`, `“${insPts[j].label}” 由被保险人运营但 SOV 中缺失 — 可能存在未申报风险。`)}</span></div>
))}
</div>
)}
</div>
)}
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, padding: "11px 16px", borderTop: "1px solid #eef2f8", background: "#fafcfe" }}>
<span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.7rem", color: "#64748b", flex: "0 0 auto" }}><Ic n="file" s={14} c="#64748b" />{pick(locale, "Excel del asegurado (lat/lng o direcciones):", "Insured's Excel (lat/lng or addresses):", "被保险人 Excel（经纬度或地址）:")}</span>
<input ref={fileRef} type="file" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" onChange={(e) => { const f = e.target.files?.[0]; if (f) importExcel(f); }} style={{ display: "none" }} />
<button type="button" disabled={importing} onClick={() => fileRef.current?.click()} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "none", background: "#2f6fb3", color: "#fff", fontSize: "0.74rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, cursor: importing ? "default" : "pointer", opacity: importing ? 0.6 : 1, flex: "0 0 auto" }}><Ic n={importing ? "refresh" : "filedown"} s={14} c="#fff" />{importing ? pick(locale, "Importando…", "Importing…", "导入中…") : pick(locale, "Cargar Excel", "Upload Excel", "上传 Excel")}</button>
<span style={{ width: "100%", fontSize: "0.66rem", color: "#94a3b8" }}>{pick(locale, "Columnas reconocidas: ubicación, dirección, lat, lng. Si solo hay dirección, se geocodifica.", "Recognized columns: location, address, lat, lng. Address-only rows are geocoded.", "可识别列：地点、地址、lat、lng。仅有地址的行将自动地理编码。")}</span>
{importMsg && <span style={{ width: "100%", fontSize: "0.7rem", color: importMsg.ok ? "#0f6e56" : "#b42318" }}>{importMsg.text}</span>}
</div>
{expanded && (
<div onClick={() => setExpanded(false)} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "3vh 3vw" }}>
<div onClick={(e) => e.stopPropagation()} style={{ width: "94vw", maxWidth: 1100, height: "86vh", background: "#fff", borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 60px rgba(15,23,42,0.35)" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "14px 18px", background: "#f8fbfe", borderBottom: "1px solid #eef2f8" }}>
<div style={{ display: "flex", alignItems: "center", gap: 11 }}>
<span style={{ width: 34, height: 34, borderRadius: 10, background: "#e3effb", color: "#2f6fb3", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic n="world" s={19} c="#2f6fb3" /></span>
<span>
<span style={{ display: "block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", color: "#94a3b8" }}>{pick(locale, "MAPA DE LA REGIÓN", "REGIONAL MAP", "区域地图")}</span>
<span className="text-primary" style={{ display: "block", fontSize: "0.95rem", fontWeight: 700 }}>{pick(locale, "Ubicaciones del SOV", "SOV locations", "标的地点")}</span>
</span>
</div>
<button type="button" onClick={() => setExpanded(false)} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid #d9e2f0", background: "#fff", color: "#1f2a44", fontSize: "0.76rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, cursor: "pointer" }}><Ic n="back" s={14} />{pick(locale, "Cerrar", "Close", "关闭")}</button>
</div>
<div ref={fullRef} style={{ flex: 1, minHeight: 0, width: "100%", background: "#eef4fb" }} />
</div>
</div>
)}
</div>
);
}

function InsuredLogoBadge({ submissionId }: { submissionId: string }) {
const [logo, setLogo] = useState<string | null>(null);
const [failed, setFailed] = useState(false);
useEffect(() => {
let active = true;
(async () => {
try {
const supabase = createSupabaseBrowserClient();
const { data } = await supabase.from("submission_intelligence").select("logo").eq("submission_id", submissionId).maybeSingle();
if (active && data?.logo) setLogo(data.logo as string);
} catch { /* sin caché: el panel de inteligencia lo llenará al buscar */ }
})();
return () => { active = false; };
}, [submissionId]);
if (logo && !failed) return (
<span style={{ width: 58, height: 58, borderRadius: 14, background: "#fff", border: "1px solid #e8eef6", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto", overflow: "hidden" }}>
<img src={logo} alt="" width={48} height={48} style={{ width: 48, height: 48, objectFit: "contain" }} onError={() => setFailed(true)} />
</span>
);
return (<span style={{ width: 58, height: 58, borderRadius: 14, background: "#e3effb", color: "#2f6fb3", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}><Ic n="clipboard" s={28} c="#2f6fb3" /></span>);
}

function CaseDetailPanel({ row, locale, busy, onSetLang }: { row: CaseRow | null; locale: string; busy: boolean; onSetLang: (id: string, lang: string) => void }) {
if (!row) return <PanelCard><p className="text-secondary" style={{ fontSize: "0.85rem" }}>{pick(locale, "Selecciona un caso de la izquierda para ver su información.", "Select a case on the left to see its details.", "请在左侧选择一个案件查看详情。")}</p></PanelCard>;
const pend = pick(locale, "Pendiente de captura", "Pending capture", "待采集");
const limit = fmtMoney(row.insured_limit, row.currency);
return (
<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
<div className="bg-card" style={{ border: "1px solid #d9e2f0", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 2px rgba(16,42,76,0.04)" }}>
<div style={{ height: 4, background: "linear-gradient(90deg, #2f6fb3, #6aa8e6)" }} />
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, padding: "18px 20px" }}>
<div style={{ display: "flex", gap: 13, minWidth: 0 }}>
<InsuredLogoBadge submissionId={String(row.id)} />
<div style={{ minWidth: 0 }}>
<p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", color: "#2f6fb3" }}>{pick(locale, "CAPTURA DEL SLIP", "SLIP CAPTURE", "SLIP 采集")}</p>
<h2 className="text-primary" style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: 4 }}>{row.insured}</h2>
<p className="text-secondary" style={{ fontSize: "0.84rem", marginTop: 2 }}>{[row.broker_name, row.line_of_business].filter(Boolean).join(" · ")}</p>
<StageBadge stage={row.uw_stage} assigned={row.assigned_to} locale={locale} />
<LangToggle value={row.correspondence_lang ?? "es"} locale={locale} busy={busy} onChange={(lang) => onSetLang(row.id, lang)} />
</div>
</div>
<div style={{ textAlign: "right", flex: "0 0 auto" }}>
<p style={{ fontSize: "0.66rem", color: "#94a3b8" }}>{pick(locale, "Límite", "Limit", "保额")}</p>
<p className="text-primary" style={{ fontSize: "1.05rem", fontWeight: 700 }}>{limit ?? "—"}</p>
</div>
</div>
</div>
<IntelligencePanel submissionId={String(row.id)} locale={locale} />
<SovMap submissionId={String(row.id)} homeCountry={row.country} insuredName={row.insured} locale={locale} />
<PanelCard>
<h3 className="text-primary" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem", fontWeight: 700, marginBottom: 8 }}><span style={{ width: 26, height: 26, borderRadius: 8, background: "#e3effb", color: "#2f6fb3", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}><Ic n="file" s={15} c="#2f6fb3" /></span>{pick(locale, "Datos del riesgo", "Risk details", "风险信息")}</h3>
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
<h3 className="text-primary" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem", fontWeight: 700, marginBottom: 8 }}><span style={{ width: 26, height: 26, borderRadius: 8, background: "#e3effb", color: "#2f6fb3", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}><Ic n="circlecheck" s={15} c="#2f6fb3" /></span>{pick(locale, "Información capturada del slip", "Captured from slip", "从 Slip 采集")}</h3>
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
<div style={{ border: "1px solid #d9e2f0", borderRadius: 16, marginBottom: 14, background: "#fff", overflow: "hidden", boxShadow: "0 1px 2px rgba(16,42,76,0.04)" }}>
<div style={{ display: "flex", alignItems: "center", gap: 11, padding: "12px 16px", background: "#f8fbfe", borderBottom: "1px solid #eef2f8" }}>
<span style={{ width: 32, height: 32, borderRadius: 9, background: "#e3effb", color: "#2f6fb3", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}><Ic n="calc" s={17} c="#2f6fb3" /></span>
<span style={{ minWidth: 0 }}>
<span style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", color: "#94a3b8" }}>{pick(locale, "NOTA TÉCNICA", "TECHNICAL NOTE", "技术说明")}</span>
<span className="text-primary" style={{ display: "block", fontSize: "0.88rem", fontWeight: 700 }}>{pick(locale, "Tasa actuarial", "Actuarial rate", "精算费率")}</span>
</span>
</div>
<div style={{ padding: "14px 16px" }}>
<div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
<div style={{ flex: 1 }}>
<label style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600 }}>{pick(locale, "Tipo de inmueble / ocupación", "Occupancy / target type", "标的类型")}</label>
<select value={occ} onChange={(e) => setOcc(e.target.value)} className="bg-card text-primary" style={{ width: "100%", border: "1px solid #d9e2f0", borderRadius: 8, padding: "7px 10px", fontSize: "0.8rem", marginTop: 4 }}>
<option value="">{pick(locale, "— selecciona —", "— select —", "— 选择 —")}</option>
{opts.map((o) => (<option key={o.occupancy} value={o.occupancy}>{o.label}</option>))}
</select>
</div>
<button type="button" disabled={loading} onClick={compute} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "none", background: "#2f6fb3", color: "#fff", fontSize: "0.76rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, cursor: loading ? "default" : "pointer", opacity: loading ? 0.6 : 1, flex: "0 0 auto" }}><Ic n="bolt" s={14} c="#fff" />{loading ? pick(locale, "Calculando…", "Computing…", "计算中…") : pick(locale, "Calcular", "Compute", "计算")}</button>
</div>
{err && <p style={{ fontSize: "0.72rem", color: RED.fg, marginTop: 8 }}>{err}</p>}
{res && (
<div style={{ marginTop: 12 }}>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.74rem", padding: "3px 0", color: "#64748b" }}><span>{pick(locale, "Pérdida esperada E[L]", "Expected loss E[L]", "预期损失")}</span><span>{fmtMoney(Math.round(res.expected_loss), "USD")}</span></div>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.74rem", padding: "3px 0", color: "#64748b" }}><span>{pick(locale, "Margen de capital (SII 6%)", "Capital margin (SII 6%)", "资本边际")}</span><span>{fmtMoney(Math.round(res.capital_margin), "USD")}</span></div>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.74rem", padding: "3px 0 8px", borderBottom: "1px solid #eef2f8" }}><span style={{ color: "#64748b" }}>{pick(locale, "Prima técnica bruta", "Gross technical premium", "技术毛保费")}</span><span style={{ fontWeight: 600, color: "#1f2a44" }}>{fmtMoney(Math.round(res.gross_premium), "USD")}</span></div>
<div style={{ display: "grid", gridTemplateColumns: adq != null ? "1fr 1fr" : "1fr", gap: 8, marginTop: 10 }}>
<div style={{ padding: "11px 13px", borderRadius: 12, background: BLUE.bg, border: `1px solid ${BLUE.bg}` }}>
<span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.06em", color: BLUE.fg }}><Ic n="gauge" s={13} c={BLUE.fg} />{pick(locale, "TASA TÉCNICA", "TECHNICAL RATE", "技术费率")}</span>
<span style={{ display: "block", fontSize: "1.4rem", fontWeight: 700, color: BLUE.fg, marginTop: 4, lineHeight: 1 }}>{ratePct}%</span>
</div>
{adq != null && (
<div style={{ padding: "11px 13px", borderRadius: 12, background: adqTone.bg, border: `1px solid ${adqTone.bg}` }}>
<span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.06em", color: adqTone.fg }}><Ic n="coin" s={13} c={adqTone.fg} />{pick(locale, "ADECUACIÓN", "ADEQUACY", "充足度")}</span>
<span style={{ display: "block", fontSize: "1.4rem", fontWeight: 700, color: adqTone.fg, marginTop: 4, lineHeight: 1 }}>{adq.toFixed(2)}×</span>
<span style={{ display: "block", fontSize: "0.62rem", fontWeight: 600, color: adqTone.fg, marginTop: 3 }}>{pick(locale, "slip", "slip", "slip")} {slipPct}% · {adq > 1.15 ? pick(locale, "subtasado", "under-priced", "偏低") : adq < 0.9 ? pick(locale, "holgado", "ample", "充裕") : pick(locale, "adecuado", "adequate", "充足")}</span>
</div>
)}
</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
{[
{ k: "λ", v: Number(res.lambda).toFixed(4) },
{ k: pick(locale, "país", "country", "国家"), v: res.inputs?.country_factor },
{ k: pick(locale, "ocupación", "occupancy", "标的"), v: res.inputs?.occupancy_freq_rel },
{ k: "SRCC", v: res.inputs?.srcc_modifier },
].map((c, i) => (
<span key={i} style={{ display: "inline-flex", alignItems: "baseline", gap: 4, fontSize: "0.66rem", fontWeight: 600, padding: "4px 9px", borderRadius: 999, background: "#f1f5fb", border: "1px solid #e6edf6", color: "#64748b" }}>{c.k}<span style={{ color: "#1f2a44", fontWeight: 700 }}>{c.v}</span></span>
))}
</div>
<button type="button" disabled={noteBusy} onClick={genNote} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, border: `1px solid ${BLUE.fg}`, background: "transparent", color: BLUE.fg, fontSize: "0.74rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, cursor: noteBusy ? "default" : "pointer" }}><Ic n="filedown" s={14} c={BLUE.fg} />{noteBusy ? pick(locale, "Generando…", "Generating…", "生成中…") : pick(locale, "Generar nota técnica (PDF)", "Generate technical note (PDF)", "生成技术说明 (PDF)")}</button>
</div>
)}
</div>
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
{i > 0 && <span style={{ color: done ? BLUE.fg : "#cbd5e1", display: "inline-flex" }}><Ic n="chevronr" s={14} c={done ? BLUE.fg : "#cbd5e1"} /></span>}
<button type="button" onClick={() => setStep(n)}
style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.74rem", fontWeight: active ? 700 : 600, padding: "6px 13px", borderRadius: 999, cursor: "pointer",
border: active ? "none" : done ? `1px solid ${BLUE.bg}` : "1px solid #d9e2f0",
boxShadow: active ? "0 1px 3px rgba(47,111,179,0.25)" : "none",
background: active ? BLUE.fg : done ? BLUE.bg : "transparent", color: active ? "#fff" : done ? BLUE.fg : "#64748b" }}>
<span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 17, height: 17, borderRadius: 999, fontSize: "0.62rem", fontWeight: 700, background: active ? "rgba(255,255,255,0.25)" : done ? BLUE.fg : "#e2e8f0", color: active ? "#fff" : done ? "#fff" : "#94a3b8" }}>{done ? <Ic n="check" s={11} c="#fff" /> : n}</span>
{s}
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
