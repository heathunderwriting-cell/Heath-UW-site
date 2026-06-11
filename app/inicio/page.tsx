"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useI18n } from "@/components/providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { clearMockSession } from "@/lib/mockAuth";
import { HeroBadge, Reveal } from "@/components/marketing/Cinematic";

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
      href: "/suscripcion",
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
    <div className="mx-auto max-w-5xl px-6 pb-20 pt-6">
      {/* ── HEADER ── */}
      <header className="flex items-center justify-between border-b border-white/[0.14] pb-5">
        <div className="text-xl font-black tracking-tight">
          HEA<span className="bg-gradient-to-r from-cyan-300 to-[#1a70f7] bg-clip-text text-transparent">TH</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-white/20 bg-white/[0.06] px-5 py-2 text-[13px] font-semibold text-white/[0.78] backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:text-white"
          >
            {L.logout}
          </button>
        </div>
      </header>

      {/* ── TITLE ── */}
      <Reveal>
        <section className="pb-8 pt-12">
          <HeroBadge>{L.kicker.toUpperCase()}</HeroBadge>
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-white">
            {L.title}
          </h1>
          <p className="mt-3 text-[16px] text-white/[0.62]">{L.subtitle}</p>
        </section>
      </Reveal>

      {/* ── MODULES ── */}
      <div className="grid gap-5 sm:grid-cols-2">
        {modules.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.08}>
            <Link
              href={m.href}
              className="group relative block h-full overflow-hidden rounded-2xl border border-white/[0.14] bg-white/[0.06] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/30 hover:bg-white/[0.09] hover:shadow-[0_24px_60px_rgba(2,6,18,0.5),0_0_40px_rgba(34,211,238,0.07)]"
            >
              <div
                aria-hidden
                className="absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle, rgba(34,211,238,0.16), transparent 70%)" }}
              />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110 ${
                      m.ready
                        ? "border-cyan-400/30 bg-gradient-to-br from-cyan-400/15 to-[#1a70f7]/15 text-cyan-300"
                        : "border-white/[0.16] bg-white/[0.07] text-white/[0.52]"
                    }`}
                  >
                    {m.icon}
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.12em] ${
                      m.ready
                        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                        : "border-amber-400/30 bg-amber-400/10 text-amber-300"
                    }`}
                  >
                    {(m.ready ? L.active : L.dev).toUpperCase()}
                  </span>
                </div>
                <div className="mt-5 text-lg font-bold tracking-tight text-white">{m.title}</div>
                <div className="mt-2 text-[14px] leading-relaxed text-white/[0.58]">{m.desc}</div>
                <div
                  className={`mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${
                    m.ready ? "text-cyan-300 group-hover:text-cyan-200" : "text-white/45"
                  }`}
                >
                  {m.ready ? L.open : L.soon}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
