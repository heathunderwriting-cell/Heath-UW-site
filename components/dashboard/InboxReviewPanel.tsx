"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/providers/LanguageProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Self-contained Inbox + For review panel.
 * Renders the joint-review path (decision = REVIEW / "Disponible para revisión").
 * Each row carries five readiness checks (commercial, slip, SOV, loss, OFAC).
 * The OFAC chip links to the stored screening evidence PDF when one exists.
 * Each case has a "Declinar" action that marks it DECLINE (drops it from the
 * list); the record stays for history/compliance (no deletion).
 */

type CheckState = "met" | "partial" | "missing";

export type ReviewRow = {
  id: string;
  insured: string;
  broker_name: string | null;
  line_of_business: string | null;
  commercial: CheckState;
  slip: CheckState;
  sov?: CheckState;
  loss: CheckState;
  loss_received?: number;
  loss_expected?: number;
  ofac: "clear" | "review" | "hit";
  ofac_evidence_path?: string | null;
  docs_count?: number;
};

function pick(locale: string, es: string, en: string, zh: string) {
  return locale === "es" ? es : locale === "zh" ? zh : en;
}

const GREEN = { bg: "#d6f0e6", fg: "#0f6e56" };
const AMBER = { bg: "#f7e8c8", fg: "#8a5a00" };
const RED = { bg: "#fde4e1", fg: "#b42318" };

function toneFor(state: CheckState | "clear" | "review" | "hit") {
  if (state === "met" || state === "clear") return GREEN;
  if (state === "partial" || state === "review") return AMBER;
  return RED;
}

function isReady(r: ReviewRow) {
  return (
    r.commercial === "met" &&
    r.slip === "met" &&
    r.sov === "met" &&
    r.loss === "met" &&
    r.ofac === "clear"
  );
}

const READINESS_MOCK: ReviewRow[] = [
  { id: "1", insured: "Andinos Retail Group SA", broker_name: "Beacon Re Brokers", line_of_business: "Property", commercial: "met", slip: "met", sov: "met", loss: "met", ofac: "clear", docs_count: 4 },
  { id: "2", insured: "Pacífico Mining Ltd.", broker_name: "Guy Carpenter", line_of_business: "Property", commercial: "met", slip: "met", sov: "met", loss: "met", ofac: "clear", docs_count: 5 },
  { id: "3", insured: "Harvard Navigation Co.", broker_name: "Carpenter Marsh", line_of_business: "Marine", commercial: "met", slip: "missing", sov: "missing", loss: "missing", ofac: "review" },
  { id: "4", insured: "Delta Energy Holdings", broker_name: "Aon", line_of_business: "Financial Lines", commercial: "met", slip: "met", sov: "met", loss: "partial", loss_received: 1, loss_expected: 2, ofac: "hit", docs_count: 3 },
  { id: "5", insured: "Río Verde Agro SAS", broker_name: "Marsh", line_of_business: "Property", commercial: "missing", slip: "missing", sov: "missing", loss: "missing", ofac: "review" },
  { id: "6", insured: "Cordillera Logistics", broker_name: "Lockton Re", line_of_business: "Marine", commercial: "met", slip: "met", sov: "missing", loss: "missing", ofac: "clear", docs_count: 2 },
];

function Chip({
  label,
  state,
  onClick,
  title,
}: {
  label: string;
  state: CheckState | "clear" | "review" | "hit";
  onClick?: () => void;
  title?: string;
}) {
  const tone = toneFor(state);
  const ok = state === "met" || state === "clear";
  const partial = state === "partial" || state === "review";
  const clickable = !!onClick;
  return (
    <span
      onClick={onClick}
      title={title}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => { if (e.key === "Enter" || e.key === " ") onClick!(); } : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: "0.72rem",
        fontWeight: 600,
        padding: "4px 9px",
        borderRadius: 8,
        background: tone.bg,
        color: tone.fg,
        whiteSpace: "nowrap",
        cursor: clickable ? "pointer" : "default",
        textDecoration: clickable ? "underline dotted" : "none",
        textUnderlineOffset: 2,
      }}
    >
      <span aria-hidden style={{ fontSize: "0.85em", lineHeight: 1 }}>{ok ? "✓" : partial ? "◐" : "✕"}</span>
      {label}
      {clickable && <span aria-hidden style={{ fontSize: "0.85em", lineHeight: 1 }}>↗</span>}
    </span>
  );
}

function Card({
  row,
  locale,
  onDecline,
}: {
  row: ReviewRow;
  locale: string;
  onDecline: (id: string, reason: string) => Promise<void>;
}) {
  const ready = isReady(row);
  const [confirming, setConfirming] = useState(false);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  let pill: { text: string; tone: typeof GREEN };
  if (row.ofac === "hit") pill = { text: pick(locale, "Bloqueo compliance", "Compliance hold", "合规暂停"), tone: RED };
  else if (ready) pill = { text: pick(locale, "Listo", "Ready", "就绪"), tone: GREEN };
  else pill = { text: pick(locale, "En espera", "Waiting", "等待中"), tone: AMBER };

  const lossLabel =
    row.loss === "partial" && row.loss_received != null && row.loss_expected != null
      ? `${pick(locale, "Siniestralidad", "Loss data", "理赔数据")} ${row.loss_received}/${row.loss_expected}`
      : pick(locale, "Siniestralidad", "Loss data", "理赔数据");

  const ofacLabel =
    row.ofac === "clear"
      ? pick(locale, "OFAC limpio", "OFAC clear", "OFAC 通过")
      : row.ofac === "review"
      ? pick(locale, "OFAC revisar", "OFAC review", "OFAC 待审")
      : pick(locale, "OFAC alerta", "OFAC hit", "OFAC 命中");

  async function openEvidence() {
    if (!row.ofac_evidence_path) return;
    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.storage
        .from("compliance")
        .createSignedUrl(row.ofac_evidence_path, 3600);
      if (error) throw error;
      if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    } catch {
      /* no-op */
    }
  }

  async function confirmDecline() {
    setBusy(true);
    setErr(null);
    try {
      await onDecline(row.id, reason);
    } catch (e: any) {
      setErr(e?.message ?? "Error");
      setBusy(false);
    }
  }

  const hasEvidence = !!row.ofac_evidence_path;
  const evidenceTitle = pick(locale, "Ver evidencia OFAC (PDF)", "View OFAC evidence (PDF)", "查看 OFAC 证据 (PDF)");

  return (
    <div
      className="bg-card"
      style={{
        border: "1px solid #d9e2f0",
        borderLeft: `3px solid ${pill.tone.fg}`,
        borderRadius: 14,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        padding: "14px 16px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ minWidth: 0 }}>
          <div className="text-primary" style={{ fontSize: "0.92rem", fontWeight: 600 }}>{row.insured}</div>
          <div className="text-secondary" style={{ fontSize: "0.78rem", marginTop: 2 }}>
            {[row.broker_name, row.line_of_business].filter(Boolean).join(" · ")}
          </div>
        </div>
        <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "3px 9px", borderRadius: 8, background: pill.tone.bg, color: pill.tone.fg, whiteSpace: "nowrap" }}>
          {pill.text}
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
        <Chip state={row.commercial} label={pick(locale, "Comercial", "Commercial", "商务")} />
        <Chip state={row.slip} label={pick(locale, "Slip", "Slip", "Slip")} />
        <Chip state={row.sov ?? "missing"} label={pick(locale, "SOV · valores", "SOV · values", "SOV · 标的表")} />
        <Chip state={row.loss} label={lossLabel} />
        <Chip
          state={row.ofac}
          label={ofacLabel}
          onClick={hasEvidence ? openEvidence : undefined}
          title={hasEvidence ? evidenceTitle : undefined}
        />
      </div>

      <div style={{ marginTop: 12, borderTop: "1px solid #eef2f8", paddingTop: 10 }}>
        {!confirming ? (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            style={{
              border: "1px solid #f0c8c2",
              background: "transparent",
              color: RED.fg,
              fontSize: "0.74rem",
              fontWeight: 600,
              padding: "5px 12px",
              borderRadius: 999,
              cursor: "pointer",
            }}
          >
            {pick(locale, "Declinar", "Decline", "拒绝")}
          </button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={pick(locale, "Motivo de declinación (opcional)", "Decline reason (optional)", "拒绝原因（可选）")}
              className="bg-card text-primary"
              style={{ border: "1px solid #d9e2f0", borderRadius: 8, padding: "7px 10px", fontSize: "0.78rem", outline: "none" }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                disabled={busy}
                onClick={confirmDecline}
                style={{
                  border: "none",
                  background: RED.fg,
                  color: "#fff",
                  fontSize: "0.74rem",
                  fontWeight: 600,
                  padding: "6px 12px",
                  borderRadius: 999,
                  cursor: busy ? "default" : "pointer",
                  opacity: busy ? 0.6 : 1,
                }}
              >
                {busy ? pick(locale, "Declinando…", "Declining…", "处理中…") : pick(locale, "Confirmar declinación", "Confirm decline", "确认拒绝")}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => { setConfirming(false); setReason(""); setErr(null); }}
                style={{ border: "1px solid #d9e2f0", background: "transparent", color: "#64748b", fontSize: "0.74rem", fontWeight: 600, padding: "6px 12px", borderRadius: 999, cursor: "pointer" }}
              >
                {pick(locale, "Cancelar", "Cancel", "取消")}
              </button>
            </div>
            {err && <span style={{ color: RED.fg, fontSize: "0.72rem" }}>{err}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ text, count, accent }: { text: string; count: number; accent?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 2px 10px" }}>
      <span style={{ fontSize: "0.68rem", letterSpacing: "0.06em", fontWeight: 700, color: accent ?? "#64748b" }}>{text}</span>
      <span style={{ marginLeft: "auto", fontSize: "0.72rem", color: "#94a3b8" }}>{count}</span>
    </div>
  );
}

export function InboxReviewPanel({ rows = READINESS_MOCK }: { rows?: ReviewRow[] }) {
  const { locale } = useI18n();
  const [query, setQuery] = useState("");
  const [declinedIds, setDeclinedIds] = useState<Set<string>>(() => new Set());

  async function handleDecline(id: string, reason: string) {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.rpc("decline_submission", {
      p_id: id,
      p_reason: reason && reason.trim() ? reason.trim() : "Declinado por suscripción",
    });
    if (error) throw error;
    setDeclinedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  const { ready, inProgress } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = (r: ReviewRow) =>
      q === "" ||
      [r.insured, r.broker_name, r.line_of_business]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    const filtered = rows.filter((r) => !declinedIds.has(r.id) && matches(r));
    return { ready: filtered.filter(isReady), inProgress: filtered.filter((r) => !isReady(r)) };
  }, [rows, query, declinedIds]);

  const searchPlaceholder = pick(
    locale,
    "Buscar por asegurado, broker o línea…",
    "Search by insured, broker or line…",
    "按被保险人、经纪人或险种搜索…"
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 320 }}>
      <div style={{ position: "relative", marginBottom: 4 }}>
        <span
          aria-hidden
          style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "0.9rem" }}
        >
          ⌕
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="bg-card text-primary"
          style={{
            width: "100%",
            border: "1px solid #d9e2f0",
            borderRadius: 999,
            padding: "9px 34px 9px 30px",
            fontSize: "0.82rem",
            outline: "none",
          }}
        />
        {query !== "" && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={pick(locale, "Limpiar", "Clear", "清除")}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              color: "#94a3b8",
              cursor: "pointer",
              fontSize: "0.9rem",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        )}
      </div>
      <SectionLabel
        text={pick(locale, "PARA REVISAR · LISTOS PARA COTIZAR", "FOR REVIEW · READY TO QUOTE", "待核保 · 可报价").toUpperCase()}
        count={ready.length}
        accent="#0f6e56"
      />
      {ready.length === 0 && (
        <div className="text-secondary" style={{ fontSize: "0.8rem", padding: "8px 2px 4px" }}>
          {pick(locale, "Aún no hay casos listos.", "No ready cases yet.", "暂无就绪案件。")}
        </div>
      )}
      {ready.map((r) => (
        <Card key={r.id} row={r} locale={locale} onDecline={handleDecline} />
      ))}

      <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "14px 2px 8px" }}>
        <span style={{ flex: 1, height: 1, background: "#cdd9ec" }} />
        <span style={{ fontSize: "0.66rem", color: "#94a3b8" }}>
          {pick(locale, "faltan checks", "missing checks", "缺少检查")}
        </span>
        <span style={{ flex: 1, height: 1, background: "#cdd9ec" }} />
      </div>

      <SectionLabel
        text={pick(locale, "INBOX · EN PROCESO", "INBOX · IN PROGRESS", "收件箱 · 处理中").toUpperCase()}
        count={inProgress.length}
      />
      {inProgress.map((r) => (
        <Card key={r.id} row={r} locale={locale} onDecline={handleDecline} />
      ))}

      <div style={{ display: "flex", gap: 14, marginTop: 12, padding: "0 2px" }}>
        <Legend color={GREEN.fg} label={pick(locale, "Cumple", "Met", "满足")} />
        <Legend color={AMBER.fg} label={pick(locale, "Parcial", "Partial", "部分")} />
        <Legend color={RED.fg} label={pick(locale, "Falta / alerta", "Missing / hit", "缺失 / 命中")} />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.72rem", color: "#64748b" }}>
      <span style={{ width: 9, height: 9, borderRadius: "50%", background: color }} />
      {label}
    </span>
  );
}
