"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useI18n } from "@/components/providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { CinematicBackground, HeroBadge, Reveal } from "@/components/marketing/Cinematic";

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
    <div className="relative min-h-screen text-[#f0f4ff]">
      <CinematicBackground bright />
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-6">
        {/* ── HEADER ── */}
        <header className="flex items-center justify-between border-b border-white/[0.14] pb-5">
          <div className="text-xl font-black tracking-tight">
            HEA<span className="bg-gradient-to-r from-cyan-300 to-[#1a70f7] bg-clip-text text-transparent">TH</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/inicio"
              className="rounded-lg border border-white/20 bg-white/[0.06] px-5 py-2 text-[13px] font-semibold text-cyan-300 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-200"
            >
              ← {L.back}
            </Link>
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

        {/* ── PRODUCTS ── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <Link
                href={p.href}
                className="group relative block h-full overflow-hidden rounded-2xl border border-white/[0.14] bg-white/[0.06] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/30 hover:bg-white/[0.09] hover:shadow-[0_24px_60px_rgba(2,6,18,0.5),0_0_40px_rgba(34,211,238,0.07)]"
              >
                <div
                  aria-hidden
                  className="absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, rgba(34,211,238,0.16), transparent 70%)" }}
                />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/15 to-[#1a70f7]/15 text-cyan-300 transition-transform duration-500 group-hover:scale-110">
                    {p.icon}
                  </div>
                  <div className="mt-5 text-lg font-bold tracking-tight text-white">{p.title}</div>
                  <div className="mt-2 text-[14px] leading-relaxed text-white/[0.58]">{p.desc}</div>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-cyan-300 transition-colors group-hover:text-cyan-200">
                    {L.open}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
