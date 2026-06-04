"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useI18n } from "@/components/providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { clearMockSession } from "@/lib/mockAuth";

type Locale = "es" | "en" | "zh";

function pick(locale: string, es: string, en: string, zh: string) {
  return locale === "es" ? es : locale === "zh" ? zh : en;
}

function IconUnderwriting() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path d="M9 4h6v3H9z" />
      <path d="M8.5 13l2 2 4-4" />
    </svg>
  );
}
function IconDashboard() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="4" y1="20" x2="20" y2="20" />
      <rect x="6" y="11" width="3" height="6" />
      <rect x="11" y="7" width="3" height="10" />
      <rect x="16" y="13" width="3" height="4" />
    </svg>
  );
}
function IconCapacity() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 9l8-4 8 4" />
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="6.5" y1="9" x2="6.5" y2="17" />
      <line x1="12" y1="9" x2="12" y2="17" />
      <line x1="17.5" y1="9" x2="17.5" y2="17" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}
function IconRisk() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l7 3v5c0 4.4-3 7.4-7 9-4-1.6-7-4.6-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export default function InicioPage() {
  const router = useRouter();
  const { locale } = useI18n();

  async function handleLogout() {
    try {
      await createSupabaseBrowserClient().auth.signOut();
    } catch {
      // ignore; clear local state regardless
    }
    clearMockSession();
    router.replace(`/iniciar-sesion?redirect=/inicio&lang=${locale}`);
  }

  const L = {
    kicker: pick(locale, "Plataforma", "Platform", "平台"),
    title: pick(locale, "Centro de operaciones", "Operations center", "运营中心"),
    subtitle: pick(locale, "Selecciona un módulo para comenzar.", "Select a module to get started.", "选择一个模块开始。"),
    logout: pick(locale, "Cerrar sesión", "Sign out", "退出"),
    open: pick(locale, "Abrir módulo", "Open module", "打开模块"),
    soon: pick(locale, "Próximamente", "Coming soon", "即将推出"),
    active: pick(locale, "Activo", "Active", "已上线"),
    dev: pick(locale, "En desarrollo", "In development", "开发中"),
  };

  const modules: {
    title: string;
    desc: string;
    href: string;
    icon: ReactNode;
    ready: boolean;
  }[] = [
    {
      title: "Underwriting",
      desc: pick(locale, "Proceso de suscripción de todos los productos.", "Underwriting process for all products.", "所有产品的核保流程。"),
      href: "/dashboard?view=operations&module=1",
      icon: <IconUnderwriting />,
      ready: true,
    },
    {
      title: "Dashboard",
      desc: pick(locale, "Cifras y métricas de la compañía.", "Company figures and metrics.", "公司数据与指标。"),
      href: "/dashboard?view=overview&module=1",
      icon: <IconDashboard />,
      ready: true,
    },
    {
      title: pick(locale, "Proveedores de capacidad", "Capacity providers", "承保能力提供方"),
      desc: pick(locale, "Administración de capacity providers.", "Capacity provider administration.", "承保能力提供方管理。"),
      href: "/proveedores-de-capacidad",
      icon: <IconCapacity />,
      ready: false,
    },
    {
      title: pick(locale, "Administración de riesgos", "Risk management", "风险管理"),
      desc: pick(locale, "Monitoreo y control de la exposición.", "Exposure monitoring and control.", "敞口监控与管理。"),
      href: "/administracion-de-riesgos",
      icon: <IconRisk />,
      ready: false,
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
          <button
            type="button"
            onClick={handleLogout}
            style={{
              border: "1px solid #cdd9ec",
              background: "#ffffff",
              color: "#475569",
              borderRadius: 999,
              padding: "7px 16px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {L.logout}
          </button>
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
        {modules.map((m) => (
          <Link
            key={m.title}
            href={m.href}
            style={{
              display: "block",
              background: "#ffffff",
              border: m.ready ? "1px solid #d9e2f0" : "1px solid #e2e6ec",
              borderRadius: 16,
              padding: 22,
              textDecoration: "none",
              boxShadow: "0 1px 2px rgba(15,35,70,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: m.ready ? "#e6effb" : "#eef1f5",
                  color: m.ready ? "#2563eb" : "#64748b",
                }}
              >
                {m.icon}
              </div>
              <span
                style={{
                  fontSize: "0.66rem",
                  letterSpacing: "0.5px",
                  fontWeight: 600,
                  borderRadius: 999,
                  padding: "4px 10px",
                  color: m.ready ? "#0f6e56" : "#8a5a00",
                  background: m.ready ? "#d6f0e6" : "#f7e8c8",
                }}
              >
                {(m.ready ? L.active : L.dev).toUpperCase()}
              </span>
            </div>
            <div style={{ fontSize: "1.15rem", fontWeight: 600, color: "#0b1220", marginTop: 16 }}>{m.title}</div>
            <div style={{ fontSize: "0.9rem", color: "#475569", marginTop: 6, lineHeight: 1.5 }}>{m.desc}</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 16,
                fontSize: "0.85rem",
                fontWeight: 600,
                color: m.ready ? "#2563eb" : "#94a3b8",
              }}
            >
              {m.ready ? L.open : L.soon}
              <span aria-hidden>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
