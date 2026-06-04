"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useI18n } from "@/components/providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

function pick(locale: string, es: string, en: string, zh: string) {
  return locale === "es" ? es : locale === "zh" ? zh : en;
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l7 3v5c0 4.4-3 7.4-7 9-4-1.6-7-4.6-7-9V6z" />
      <path d="M12 9v4" /><path d="M12 16h.01" />
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="4" width="14" height="16" rx="1.5" />
      <line x1="9" y1="8" x2="9" y2="8" /><line x1="12" y1="8" x2="12" y2="8" /><line x1="15" y1="8" x2="15" y2="8" />
      <line x1="9" y1="12" x2="9" y2="12" /><line x1="12" y1="12" x2="12" y2="12" /><line x1="15" y1="12" x2="15" y2="12" />
      <line x1="10" y1="20" x2="14" y2="20" />
    </svg>
  );
}
function IconAnchor() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="5" r="2" /><line x1="12" y1="7" x2="12" y2="21" />
      <path d="M5 13a7 7 0 0 0 14 0" /><line x1="5" y1="13" x2="3" y2="13" /><line x1="19" y1="13" x2="21" y2="13" />
      <line x1="8" y1="11" x2="16" y2="11" />
    </svg>
  );
}
function IconFinance() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="4" y1="20" x2="20" y2="20" />
      <path d="M6 16l4-4 3 3 5-6" /><path d="M18 9h-2.5M18 9v2.5" />
    </svg>
  );
}
function IconPlane() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3c.8 0 1.4.9 1.4 2v4.2l7.6 4.3v1.8l-7.6-2.3v4.1l2 1.4v1.5L12 19.5 8.6 20.7v-1.5l2-1.4v-4.1L3 15.3v-1.8l7.6-4.3V5c0-1.1.6-2 1.4-2z" />
    </svg>
  );
}

export default function SuscripcionPage() {
  const { locale } = useI18n();

  const L = {
    kicker: pick(locale, "Underwriting", "Underwriting", "核保"),
    title: pick(locale, "Panel de suscripción", "Underwriting panel", "核保面板"),
    subtitle: pick(locale, "Selecciona un producto para gestionar su suscripción.", "Select a product to manage its underwriting.", "选择一个产品来管理其核保。"),
    back: pick(locale, "Inicio", "Home", "首页"),
    open: pick(locale, "Abrir producto", "Open product", "打开产品"),
  };

  const products: { title: string; desc: string; href: string; icon: ReactNode }[] = [
    {
      title: pick(locale, "Sabotaje y Terrorismo", "Sabotage & Terrorism", "破坏与恐怖主义"),
      desc: pick(locale, "Mesa de trabajo de suscripción.", "Underwriting workbench.", "核保工作台。"),
      href: "/suscripcion/sabotaje-terrorismo",
      icon: <IconShield />,
    },
    {
      title: "Property",
      desc: pick(locale, "Mesa de trabajo de suscripción.", "Underwriting workbench.", "核保工作台。"),
      href: "/suscripcion/property",
      icon: <IconBuilding />,
    },
    {
      title: "Marine",
      desc: pick(locale, "Mesa de trabajo de suscripción.", "Underwriting workbench.", "核保工作台。"),
      href: "/suscripcion/marine",
      icon: <IconAnchor />,
    },
    {
      title: pick(locale, "Líneas financieras", "Financial Lines", "金融险"),
      desc: pick(locale, "Mesa de trabajo de suscripción.", "Underwriting workbench.", "核保工作台。"),
      href: "/suscripcion/lineas-financieras",
      icon: <IconFinance />,
    },
    {
      title: "Aviation",
      desc: pick(locale, "Mesa de trabajo de suscripción.", "Underwriting workbench.", "核保工作台。"),
      href: "/suscripcion/aviation",
      icon: <IconPlane />,
    },
  ];

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "20px 24px 64px" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 18,
          borderBottom: "1px solid #cdd9ec",
        }}
      >
        <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0b1220", letterSpacing: "0.5px" }}>Heath</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <LanguageSwitcher />
          <Link
            href="/inicio"
            style={{
              border: "1px solid #cdd9ec",
              background: "#ffffff",
              color: "#2563eb",
              borderRadius: 999,
              padding: "7px 16px",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ← {L.back}
          </Link>
        </div>
      </header>

      <section style={{ padding: "32px 0 24px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#dbe7fa",
            borderRadius: 999,
            padding: "5px 14px",
            marginBottom: 16,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563eb" }} />
          <span style={{ fontSize: "0.72rem", letterSpacing: "1.5px", color: "#1d4d80", fontWeight: 600 }}>
            {L.kicker.toUpperCase()}
          </span>
        </span>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#0b1220", margin: 0, lineHeight: 1.15 }}>{L.title}</h1>
        <p style={{ fontSize: "1.05rem", color: "#475569", marginTop: 8 }}>{L.subtitle}</p>
      </section>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 18,
        }}
      >
        {products.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            style={{
              display: "block",
              background: "#ffffff",
              border: "1px solid #d9e2f0",
              borderRadius: 16,
              padding: 22,
              textDecoration: "none",
              boxShadow: "0 1px 2px rgba(15,35,70,0.04)",
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#e6effb",
                color: "#2563eb",
              }}
            >
              {p.icon}
            </div>
            <div style={{ fontSize: "1.15rem", fontWeight: 600, color: "#0b1220", marginTop: 16 }}>{p.title}</div>
            <div style={{ fontSize: "0.9rem", color: "#475569", marginTop: 6, lineHeight: 1.5 }}>{p.desc}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16, fontSize: "0.85rem", fontWeight: 600, color: "#2563eb" }}>
              {L.open}
              <span aria-hidden>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
