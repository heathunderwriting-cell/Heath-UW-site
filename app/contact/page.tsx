"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useI18n } from "@/components/providers/LanguageProvider";
import {
  ArrowIcon,
  ButtonSheen,
  CinematicBackground,
  HeroBadge,
  Reveal,
} from "@/components/marketing/Cinematic";

const CONTACT_EMAIL = "heathunderwriting@beaconproductstudio.com";

export default function ContactPage() {
  const { dict, locale } = useI18n();
  const copy = dict.pagesV2.contact;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const L = {
    heroKicker: locale === "es" ? "Hablemos" : locale === "zh" ? "联系我们" : "Get in touch",
    formTitle: locale === "es" ? "Envíanos un mensaje" : locale === "zh" ? "给我们留言" : "Send us a message",
    name: locale === "es" ? "Nombre" : locale === "zh" ? "姓名" : "Name",
    email: locale === "es" ? "Correo" : locale === "zh" ? "邮箱" : "Email",
    company: locale === "es" ? "Empresa" : locale === "zh" ? "公司" : "Company",
    message: locale === "es" ? "Mensaje" : locale === "zh" ? "留言" : "Message",
    msgPlaceholder:
      locale === "es"
        ? "Cuéntanos sobre la oportunidad o solicitud..."
        : locale === "zh"
        ? "请告诉我们您的需求..."
        : "Tell us about the opportunity or request...",
    response:
      locale === "es"
        ? "Respuesta inicial en 24h hábiles"
        : locale === "zh"
        ? "24 个工作小时内初步回复"
        : "Initial response within 24 business hours",
    partnerships:
      locale === "es" ? "Alianzas y capacidad" : locale === "zh" ? "合作与承保能力" : "Partnerships and capacity",
    emailLabel: locale === "es" ? "Correo directo" : locale === "zh" ? "直接邮箱" : "Direct email",
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = `Heath UW — ${name || "Contact request"}${company ? ` (${company})` : ""}`;
    const body = [`${L.name}: ${name}`, `${L.email}: ${email}`, `${L.company}: ${company}`, "", message].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-[#060d1f]/70 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none backdrop-blur-sm transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/25";

  return (
    <main className="relative min-h-screen text-[#f0f4ff]">
      <CinematicBackground />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-28 md:px-10 md:pt-36">
        <Reveal>
          <HeroBadge>{L.heroKicker}</HeroBadge>
          <h1 className="mb-6 max-w-3xl text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {copy.title}
          </h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-white/60 md:text-lg">{copy.subtitle}</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/45">{copy.intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* Left: contact details */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/[0.04]"
              >
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, rgba(34,211,238,0.2), transparent 70%)" }}
                />
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/70">{L.emailLabel}</div>
                <div className="mt-2 break-all font-mono text-[15px] font-semibold text-white transition-colors group-hover:text-cyan-300">
                  {CONTACT_EMAIL}
                </div>
              </a>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="home-pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[15px] font-semibold text-white/85">{L.response}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400/70" />
                  <span className="text-[15px] font-semibold text-white/85">{L.partnerships}</span>
                </div>
              </div>

              <Link
                href="/underwriting"
                className="mt-1 inline-flex items-center gap-2 self-start rounded-lg border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:text-white"
              >
                {copy.secondary}
              </Link>
            </div>
          </Reveal>

          {/* Right: message form */}
          <Reveal delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1730]/80 p-7 shadow-[0_24px_80px_rgba(2,6,18,0.6)] backdrop-blur-xl md:p-9"
            >
              <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-[#1a70f7] to-transparent" />
              <h2 className="text-lg font-bold tracking-tight text-white">{L.formTitle}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">{L.name}</span>
                  <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">{L.email}</span>
                  <input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
              </div>
              <label className="mt-4 block text-sm">
                <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">{L.company}</span>
                <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} />
              </label>
              <label className="mt-4 block text-sm">
                <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">{L.message}</span>
                <textarea
                  rows={5}
                  className={`${inputCls} resize-y`}
                  placeholder={L.msgPlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </label>
              <button
                type="submit"
                className="group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#1a70f7] to-[#2b8af9] px-8 py-4 text-[15px] font-bold text-white shadow-[0_8px_32px_rgba(26,112,247,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_44px_rgba(26,112,247,0.65)] sm:w-auto"
              >
                <ButtonSheen />
                <span className="relative">{copy.primary}</span>
                <ArrowIcon />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* footer strip */}
      <footer className="relative z-10 border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-9 md:px-10">
          <div className="flex items-center gap-3">
            <span className="text-base font-black tracking-tight">
              HEA<span className="text-[#4a9eff]">TH</span>
            </span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span className="text-[12px] text-white/30">{dict.footer.copyright}</span>
          </div>
          <span className="font-mono text-[12px] tracking-wider text-white/30">heathuw.com</span>
        </div>
      </footer>
    </main>
  );
}
