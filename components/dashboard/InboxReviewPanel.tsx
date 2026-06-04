"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/providers/LanguageProvider";

/**
 * Self-contained Inbox + For review panel.
 * Phase 1: renders from mock data (READINESS_MOCK) so the design can be
 * reviewed in the real theme. Phase 2: pass `rows` from the dashboard
 * submissions view once the readiness columns exist in Supabase.
 *
 * Each row carries the four readiness checks the underwriter needs before a
 * case is "free to quote": commercial decision (joint-work email), slip
 * received, loss/claims data present, and OFAC compliance clear.
 */

type CheckState = "met" | "partial" | "missing";

export type ReviewRow = {
  id: string;
  insured: string;
  broker_name: string | null;
  line_of_business: string | null;
  // readiness (written by n8n in phase 2)
  commercial: CheckState;        // correo de trabajo conjunto / decisión comercial
  slip: CheckState;              // slip enviado por el broker
  loss: CheckState;              // siniestralidad (slip + Excel adjuntos)
  loss_received?: number;
  loss_expected?: number;
  ofac: "clear" | "review" | "hit";
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
  return r.commercial === "met" && r.slip === "met" && r.loss === "met" && r.ofac === "clear";
}

const READINESS_MOCK: ReviewRow[] = [
  { id: "1", insured: "Andinos Retail Group SA", broker_name: "Beacon Re Brokers", line_of_business: "Property", commercial: "met", slip: "met", loss: "met", ofac: "clear", docs_count: 4 },
  { id: "2", insured: "Pacífico Mining Ltd.", broker_name: "Guy Carpenter", line_of_business: "Property", commercial: "met", slip: "met", loss: "met", ofac: "clear", docs_count: 5 },
  { id: "3", insured: "Harvard Navigation Co.", broker_name: "Carpenter Marsh", line_of_business: "Marine", commercial: "met", slip: "missing", loss: "missing", ofac: "review" },
  { id: "4", insured: "Delta Energy Holdings", broker_name: "Aon", line_of_business: "Financial Lines", commercial: "met", slip: "met", loss: "partial", loss_received: 1, loss_expected: 2, ofac: "hit", docs_count: 3 },
  { id: "5", insured: "Río Verde Agro SAS", broker_name: "Marsh", line_of_business: "Property", commercial: "missing", slip: "missing", loss: "missing", ofac: "review" },
  { id: "6", insured: "Cordillera Logistics", broker_name: "Lockton Re", line_of_business: "Marine", commercial: "met", slip: "met", loss: "missing", ofac: "clear", docs_count: 2 },
];

function Chip({ label, state, locale }: { label: string; state: CheckState | "clear" | "review" | "hit"; locale: string }) {
  const tone = toneFor(state);
  const ok = state === "met" || state === "clear";
  const partial = state === "partial" || state === "review";
  return (
    <span
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
      }}
    >
      <span aria-hidden style={{ fontSize: "0.85em", lineHeight: 1 }}>{ok ? "✓" : partial ? "◐" : "✕"}</span>
      {label}
    </span>
  );
}

function Card({ row, locale }: { row: ReviewRow; locale: string }) {
  const ready = isReady(row);
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
        <Chip locale={locale} state={row.commercial} label={pick(locale, "Comercial", "Commercial", "商务")} />
        <Chip locale={locale} state={row.slip} label={pick(locale, "Slip", "Slip", "Slip")} />
        <Chip locale={locale} state={row.loss} label={lossLabel} />
        <Chip locale={locale} state={row.ofac} label={ofacLabel} />
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

  const { ready, inProgress } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = (r: ReviewRow) =>
      q === "" ||
      [r.insured, r.broker_name, r.line_of_business]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    const filtered = rows.filter(matches);
    return { ready: filtered.filter(isReady), inProgress: filtered.filter((r) => !isReady(r)) };
  }, [rows, query]);

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
        <Card key={r.id} row={r} locale={locale} />
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
        <Card key={r.id} row={r} locale={locale} />
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
