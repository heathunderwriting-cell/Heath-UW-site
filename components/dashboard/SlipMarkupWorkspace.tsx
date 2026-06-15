"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/**
* Live slip-markup workspace. Renders a slip document (SlipPreview) and an
* accordion clause list (ClauseAccordion). Ticking a clause updates the slip in
* real time: granted coverages stay, non-granted coverages are struck through,
* and imposed conditions / exclusions / definitions are written into the slip.
* The clause state lives in the useSlipClauses hook so the slip and the controls
* can be placed in separate columns (see the slip workbench on the S&T page).
*/

export type Clause = {
code: string;
category: string;
lma_ref: string | null;
title_es: string;
title_en: string | null;
summary: string | null;
default_included: boolean;
sort_order: number;
};

type CaseLite = {
insured: string;
broker_name?: string | null;
line_of_business?: string | null;
country?: string | null;
currency?: string | null;
insured_limit?: number | null;
};

const COVER_CATS = ["cobertura", "write_back", "extension"];
const CATEGORY_ORDER = ["cobertura", "write_back", "extension", "exclusion", "condicion", "definicion"];

function pick(locale: string, es: string, en: string, zh: string) {
return locale === "es" ? es : locale === "zh" ? zh : en;
}
function ctitle(locale: string, c: Clause) {
return locale === "es" ? c.title_es : c.title_en ?? c.title_es;
}
function fmtMoney(amount?: number | null, currency?: string | null) {
if (amount == null) return "—";
try {
return new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "USD", maximumFractionDigits: 0 }).format(amount);
} catch {
return `${currency || ""} ${amount.toLocaleString("en-US")}`.trim();
}
}
function catLabel(locale: string, cat: string) {
switch (cat) {
case "cobertura": return pick(locale, "Cobertura base", "Base cover", "基础承保");
case "write_back": return pick(locale, "Coberturas adicionales (write-backs)", "Additional cover (write-backs)", "附加承保");
case "extension": return pick(locale, "Extensiones", "Extensions", "扩展");
case "exclusion": return pick(locale, "Exclusiones", "Exclusions", "除外");
case "condicion": return pick(locale, "Condiciones", "Conditions", "条件");
case "definicion": return pick(locale, "Definiciones", "Definitions", "定义");
default: return cat;
}
}
function catHint(locale: string, cat: string) {
if (COVER_CATS.includes(cat))
return pick(locale, "Marcadas = se otorgan · Sin marcar = se tachan del slip", "Ticked = granted · Unticked = struck from the slip", "勾选=承保 · 未勾选=划除");
if (cat === "exclusion") return pick(locale, "Marcadas = se aplican al riesgo", "Ticked = applied to the risk", "勾选=适用于风险");
return pick(locale, "Marcadas = se imponen en el slip", "Ticked = imposed on the slip", "勾选=施加于 Slip");
}

const ACCENT = "#2f6fb3";

/* ---------- Clause state hook (shared by the workspace and the workbench) ---------- */

export function useSlipClauses(submissionId: string) {
const [clauses, setClauses] = useState<Clause[]>([]);
const [checked, setChecked] = useState<Set<string>>(() => new Set());
const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
const [flash, setFlash] = useState<string | null>(null);
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [saved, setSaved] = useState(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
let active = true;
setLoading(true); setSaved(false); setError(null);
(async () => {
try {
const supabase = createSupabaseBrowserClient();
const [cat, sel] = await Promise.all([
supabase.from("clauses").select("code,category,lma_ref,title_es,title_en,summary,default_included,sort_order").eq("active", true).order("sort_order", { ascending: true }),
supabase.from("submission_clauses").select("clause_code").eq("submission_id", submissionId),
]);
if (cat.error) throw cat.error;
const list = (cat.data ?? []) as Clause[];
const initial = sel.data && sel.data.length
? new Set((sel.data as { clause_code: string }[]).map((r) => r.clause_code))
: new Set(list.filter((c) => c.default_included).map((c) => c.code));
if (active) { setClauses(list); setChecked(initial); setLoading(false); }
} catch (e: any) {
if (active) { setError(e?.message ?? "Error"); setLoading(false); }
}
})();
return () => { active = false; };
}, [submissionId]);

function toggle(code: string) {
setSaved(false);
setFlash(code);
setChecked((prev) => {
const next = new Set(prev);
if (next.has(code)) next.delete(code); else next.add(code);
return next;
});
window.setTimeout(() => setFlash((f) => (f === code ? null : f)), 650);
}
function expand(code: string) {
setExpanded((prev) => {
const next = new Set(prev);
if (next.has(code)) next.delete(code); else next.add(code);
return next;
});
}
async function save() {
setSaving(true); setError(null);
try {
const supabase = createSupabaseBrowserClient();
const { error } = await supabase.rpc("save_submission_clauses", { p_id: submissionId, p_codes: Array.from(checked) });
if (error) throw error;
setSaved(true);
} catch (e: any) { setError(e?.message ?? "Error"); }
finally { setSaving(false); }
}

return { clauses, checked, expanded, flash, loading, saving, saved, error, toggle, expand, save };
}

/* ---------- Slip preview (the live document) ---------- */

function SlipLine({ text, ref_, struck, imposed, flash, locale }: { text: string; ref_?: string | null; struck?: boolean; imposed?: boolean; flash?: boolean; locale: string }) {
return (
<div
style={{
display: "flex", gap: 8, alignItems: "baseline", padding: "4px 6px", borderRadius: 6,
transition: "background 600ms ease",
background: flash ? "#fff3cd" : "transparent",
}}
>
<span style={{ color: struck ? "#cbd5e1" : imposed ? "#0f6e56" : "#334155", fontSize: "0.78rem", lineHeight: 1.35, textDecoration: struck ? "line-through" : "none" }}>
{imposed ? "▸ " : ""}{text}
</span>
{ref_ && <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#8a5a00", background: "#f7e8c8", padding: "0px 5px", borderRadius: 5, opacity: struck ? 0.4 : 1 }}>{ref_}</span>}
{struck && <span style={{ fontSize: "0.6rem", color: "#94a3b8", fontStyle: "italic" }}>{pick(locale, "tachada", "struck", "划除")}</span>}
</div>
);
}

function SlipSection({ title, children }: { title: string; children: React.ReactNode }) {
return (
<div style={{ marginTop: 12 }}>
<div style={{ fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.14em", color: "#1e293b", borderBottom: "1px solid #1e293b", paddingBottom: 3, marginBottom: 4 }}>{title}</div>
{children}
</div>
);
}

export function SlipPreview({ clauses, checked, flash, row, locale }: { clauses: Clause[]; checked: Set<string>; flash: string | null; row: CaseLite; locale: string }) {
const byCat = useMemo(() => {
const m: Record<string, Clause[]> = {};
for (const c of clauses) (m[c.category] ??= []).push(c);
return m;
}, [clauses]);

const covers = COVER_CATS.flatMap((cat) => byCat[cat] ?? []);
const exclusions = (byCat["exclusion"] ?? []).filter((c) => checked.has(c.code));
const conditions = (byCat["condicion"] ?? []).filter((c) => checked.has(c.code));
const definitions = (byCat["definicion"] ?? []).filter((c) => checked.has(c.code));
const none = pick(locale, "— ninguna —", "— none —", "— 无 —");

function KV({ k, v }: { k: string; v: string }) {
return (
<div style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "2px 0", fontSize: "0.74rem" }}>
<span style={{ color: "#64748b" }}>{k}</span>
<span style={{ color: "#1e293b", fontWeight: 600, textAlign: "right" }}>{v}</span>
</div>
);
}

return (
<div style={{ background: "#fff", border: "1px solid #d9e2f0", borderRadius: 12, padding: "16px 18px", fontFamily: "Georgia, 'Times New Roman', serif" }}>
<div style={{ textAlign: "center", borderBottom: "2px solid #1e293b", paddingBottom: 8, marginBottom: 4 }}>
<div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", fontWeight: 700, color: "#1e293b" }}>{pick(locale, "SLIP DE TÉRMINOS · S&T", "TERMS SLIP · S&T", "条款 SLIP · S&T")}</div>
<div style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", marginTop: 3 }}>{row.insured}</div>
</div>

<div style={{ paddingTop: 6 }}>
<KV k={pick(locale, "Reasegurado", "Reinsured", "再保险人")} v={row.insured} />
<KV k={pick(locale, "Corredor", "Broker", "经纪人")} v={row.broker_name ?? "—"} />
<KV k={pick(locale, "Territorio", "Territory", "地域")} v={row.country ?? "—"} />
<KV k={pick(locale, "Moneda", "Currency", "货币")} v={row.currency ?? "USD"} />
<KV k={pick(locale, "Suma / Límite", "Sum / Limit", "保额/限额")} v={fmtMoney(row.insured_limit, row.currency)} />
</div>

<SlipSection title={pick(locale, "COBERTURA", "COVERAGE", "承保范围")}>
{covers.length === 0 ? <span style={{ fontSize: "0.74rem", color: "#94a3b8" }}>{none}</span> : covers.map((c) => (
<SlipLine key={c.code} locale={locale} text={ctitle(locale, c)} ref_={c.lma_ref} struck={!checked.has(c.code)} flash={flash === c.code} />
))}
</SlipSection>

<SlipSection title={pick(locale, "CONDICIONES", "CONDITIONS", "条件")}>
{conditions.length === 0 ? <span style={{ fontSize: "0.74rem", color: "#94a3b8" }}>{none}</span> : conditions.map((c) => (
<SlipLine key={c.code} locale={locale} text={ctitle(locale, c)} ref_={c.lma_ref} imposed flash={flash === c.code} />
))}
</SlipSection>

<SlipSection title={pick(locale, "EXCLUSIONES", "EXCLUSIONS", "除外责任")}>
{exclusions.length === 0 ? <span style={{ fontSize: "0.74rem", color: "#94a3b8" }}>{none}</span> : exclusions.map((c) => (
<SlipLine key={c.code} locale={locale} text={ctitle(locale, c)} ref_={c.lma_ref} imposed flash={flash === c.code} />
))}
</SlipSection>

{definitions.length > 0 && (
<SlipSection title={pick(locale, "DEFINICIONES", "DEFINITIONS", "定义")}>
{definitions.map((c) => (
<SlipLine key={c.code} locale={locale} text={ctitle(locale, c)} ref_={c.lma_ref} imposed flash={flash === c.code} />
))}
</SlipSection>
)}
</div>
);
}

/* ---------- Accordion clause list ---------- */

export function ClauseAccordion({ clauses, checked, expanded, onToggle, onExpand, locale }: {
clauses: Clause[]; checked: Set<string>; expanded: Set<string>;
onToggle: (code: string) => void; onExpand: (code: string) => void; locale: string;
}) {
const groups = CATEGORY_ORDER
.map((cat) => ({ cat, items: clauses.filter((c) => c.category === cat) }))
.filter((g) => g.items.length);

return (
<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
{groups.map((g) => (
<div key={g.cat}>
<div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
<span style={{ fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.04em", color: ACCENT, textTransform: "uppercase" }}>{catLabel(locale, g.cat)}</span>
<span style={{ fontSize: "0.6rem", color: "#94a3b8" }}>· {catHint(locale, g.cat)}</span>
</div>
<div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
{g.items.map((c) => {
const on = checked.has(c.code);
const open = expanded.has(c.code);
const isCover = COVER_CATS.includes(g.cat);
return (
<div key={c.code} style={{ border: "1px solid #e6edf6", borderRadius: 8, background: on ? "#f4f8fb" : "#fff", overflow: "hidden" }}>
<div style={{ display: "flex", gap: 8, alignItems: "center", padding: "7px 9px" }}>
<input type="checkbox" checked={on} onChange={() => onToggle(c.code)} style={{ width: 15, height: 15, accentColor: ACCENT, cursor: "pointer", flexShrink: 0 }} />
<button
type="button" onClick={() => onExpand(c.code)}
style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}
>
<span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#1e293b", textDecoration: isCover && !on ? "line-through" : "none", opacity: isCover && !on ? 0.5 : 1 }}>
{ctitle(locale, c)}
</span>
{c.lma_ref && <span style={{ fontSize: "0.58rem", fontWeight: 700, color: "#8a5a00", background: "#f7e8c8", padding: "1px 5px", borderRadius: 5 }}>{c.lma_ref}</span>}
{c.summary && <span style={{ marginLeft: "auto", fontSize: "0.7rem", color: "#94a3b8", flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms" }}>▾</span>}
</button>
</div>
{open && c.summary && (
<div style={{ padding: "0 9px 9px 32px", fontSize: "0.72rem", color: "#64748b", lineHeight: 1.4 }}>{c.summary}</div>
)}
</div>
);
})}
</div>
</div>
))}
</div>
);
}

/* ---------- Workspace shell (legacy stacked layout, kept for compatibility) ---------- */

export function SlipMarkupWorkspace({ submissionId, locale, row }: { submissionId: string; locale: string; row: CaseLite }) {
const { clauses, checked, expanded, flash, loading, saving, saved, error, toggle, expand, save } = useSlipClauses(submissionId);

return (
<div style={{ background: "var(--card, #fff)", border: "1px solid #d9e2f0", borderRadius: 16, padding: "16px 18px" }} className="bg-card">
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
<div>
<p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", color: ACCENT }}>{pick(locale, "SLIP EN VIVO", "LIVE SLIP", "实时 SLIP")}</p>
<h3 className="text-primary" style={{ fontSize: "0.98rem", fontWeight: 700, marginTop: 2 }}>{pick(locale, "Intervención de cláusulas", "Clause markup", "条款标注")}</h3>
</div>
<span className="text-secondary" style={{ fontSize: "0.7rem" }}>{checked.size} {pick(locale, "marcadas", "ticked", "已选")}</span>
</div>
<p className="text-secondary" style={{ fontSize: "0.72rem", marginTop: 4, marginBottom: 12 }}>
{pick(locale, "Toca una cláusula y observa cómo se interpone en el slip en tiempo real.", "Tick a clause and watch it imposed on the slip in real time.", "勾选条款，实时查看其如何施加于 Slip。")}
</p>

{loading ? (
<p className="text-secondary" style={{ fontSize: "0.8rem" }}>{pick(locale, "Cargando slip…", "Loading slip…", "加载中…")}</p>
) : (
<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
<SlipPreview clauses={clauses} checked={checked} flash={flash} row={row} locale={locale} />
<ClauseAccordion clauses={clauses} checked={checked} expanded={expanded} onToggle={toggle} onExpand={expand} locale={locale} />
</div>
)}

<div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 14 }}>
<button type="button" disabled={saving || loading} onClick={save} style={{ border: "none", background: ACCENT, color: "#fff", fontSize: "0.76rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, cursor: saving ? "default" : "pointer", opacity: saving ? 0.6 : 1 }}>
{saving ? pick(locale, "Guardando…", "Saving…", "保存中…") : pick(locale, "Guardar cláusulas", "Save clauses", "保存条款")}
</button>
{saved && <span style={{ fontSize: "0.74rem", color: "#0f6e56" }}>✓ {pick(locale, "Guardadas", "Saved", "已保存")}</span>}
{error && <span style={{ fontSize: "0.74rem", color: "#b42318" }}>{error}</span>}
</div>
</div>
);
}
