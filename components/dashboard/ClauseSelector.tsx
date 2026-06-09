"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/providers/LanguageProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Clause selection for the quote step. Loads the S&T clause catalog (public.clauses)
 * and the per-case saved selection (public.submission_clauses). The underwriter
 * ticks which clauses to apply (grant coverage / impose conditions / apply
 * exclusions); strikethrough coverages = simply left unticked. Saves via
 * save_submission_clauses. This selection feeds the slip-markup engine later.
 */

type Clause = {
  code: string;
  category: string;
  lma_ref: string | null;
  title_es: string;
  title_en: string | null;
  summary: string | null;
  default_included: boolean;
  sort_order: number;
};

const CATEGORY_ORDER = ["cobertura", "write_back", "extension", "exclusion", "condicion", "definicion"];

function pick(locale: string, es: string, en: string, zh: string) {
  return locale === "es" ? es : locale === "zh" ? zh : en;
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
  if (cat === "cobertura" || cat === "write_back" || cat === "extension")
    return pick(locale, "Marcadas = se otorgan. Sin marcar = se tachan del slip.", "Ticked = granted. Unticked = struck from the slip.", "勾选=承保；未勾选=从 Slip 中划除。");
  if (cat === "exclusion") return pick(locale, "Marcadas = se aplican al riesgo.", "Ticked = applied to the risk.", "勾选=适用于该风险。");
  return pick(locale, "Marcadas = se imponen en el slip.", "Ticked = imposed on the slip.", "勾选=施加于 Slip。");
}

export function ClauseSelector({ submissionId, locale }: { submissionId: string; locale: string }) {
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [checked, setChecked] = useState<Set<string>>(() => new Set());
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
        let initial: Set<string>;
        if (sel.data && sel.data.length) {
          initial = new Set((sel.data as { clause_code: string }[]).map((r) => r.clause_code));
        } else {
          initial = new Set(list.filter((c) => c.default_included).map((c) => c.code));
        }
        if (active) { setClauses(list); setChecked(initial); setLoading(false); }
      } catch (e: any) {
        if (active) { setError(e?.message ?? "Error"); setLoading(false); }
      }
    })();
    return () => { active = false; };
  }, [submissionId]);

  function toggle(code: string) {
    setSaved(false);
    setChecked((prev) => {
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

  const groups = CATEGORY_ORDER
    .map((cat) => ({ cat, items: clauses.filter((c) => c.category === cat) }))
    .filter((g) => g.items.length);

  return (
    <div className="bg-card" style={{ border: "1px solid #d9e2f0", borderRadius: 16, padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
        <h3 className="text-primary" style={{ fontSize: "0.95rem", fontWeight: 700 }}>{pick(locale, "Cláusulas del slip", "Slip clauses", "Slip 条款")}</h3>
        <span className="text-secondary" style={{ fontSize: "0.72rem" }}>{checked.size} {pick(locale, "seleccionadas", "selected", "已选")}</span>
      </div>
      <p className="text-secondary" style={{ fontSize: "0.74rem", marginBottom: 12 }}>
        {pick(locale, "Marca las cláusulas a aplicar. Las coberturas sin marcar se tacharán del slip.", "Tick the clauses to apply. Unticked coverages will be struck from the slip.", "勾选要应用的条款；未勾选的承保将从 Slip 中划除。")}
      </p>

      {loading ? (
        <p className="text-secondary" style={{ fontSize: "0.8rem" }}>{pick(locale, "Cargando cláusulas…", "Loading clauses…", "加载中…")}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {groups.map((g) => (
            <div key={g.cat}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.04em", color: "#2f6fb3", textTransform: "uppercase" }}>{catLabel(locale, g.cat)}</span>
                <span className="text-secondary" style={{ fontSize: "0.66rem" }}>· {catHint(locale, g.cat)}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {g.items.map((c) => {
                  const on = checked.has(c.code);
                  return (
                    <label key={c.code} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "7px 8px", borderRadius: 8, cursor: "pointer", background: on ? "#f4f8fb" : "transparent" }}>
                      <input type="checkbox" checked={on} onChange={() => toggle(c.code)} style={{ marginTop: 3, width: 15, height: 15, accentColor: "#2f6fb3", cursor: "pointer" }} />
                      <span style={{ minWidth: 0, flex: 1 }}>
                        <span className="text-primary" style={{ fontSize: "0.82rem", fontWeight: 600, textDecoration: (g.cat === "cobertura" || g.cat === "write_back" || g.cat === "extension") && !on ? "line-through" : "none", opacity: (g.cat === "cobertura" || g.cat === "write_back" || g.cat === "extension") && !on ? 0.55 : 1 }}>
                          {pick(locale, c.title_es, c.title_en ?? c.title_es, c.title_es)}
                        </span>
                        {c.lma_ref && <span style={{ marginLeft: 6, fontSize: "0.64rem", fontWeight: 600, color: "#8a5a00", background: "#f7e8c8", padding: "1px 6px", borderRadius: 6 }}>{c.lma_ref}</span>}
                        {c.summary && <span className="text-secondary" style={{ display: "block", fontSize: "0.72rem", marginTop: 1 }}>{c.summary}</span>}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 14 }}>
        <button type="button" disabled={saving || loading} onClick={save} style={{ border: "none", background: "#2f6fb3", color: "#fff", fontSize: "0.78rem", fontWeight: 700, padding: "8px 14px", borderRadius: 999, cursor: saving ? "default" : "pointer", opacity: saving ? 0.6 : 1 }}>
          {saving ? pick(locale, "Guardando…", "Saving…", "保存中…") : pick(locale, "Guardar cláusulas", "Save clauses", "保存条款")}
        </button>
        {saved && <span style={{ fontSize: "0.74rem", color: "#0f6e56" }}>✓ {pick(locale, "Guardadas", "Saved", "已保存")}</span>}
        {error && <span style={{ fontSize: "0.74rem", color: "#b42318" }}>{error}</span>}
      </div>
    </div>
  );
}
