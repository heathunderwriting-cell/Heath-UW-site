"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Footer } from "@/components/Footer";
import { ChipBackground } from "@/components/ChipBackground";
import { useI18n } from "@/components/providers/LanguageProvider";

const CONTACT_EMAIL = "heathunderwriting@beaconproductstudio.com";
const BLUE = "#4a9eff";

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
    "w-full rounded-lg border border-border bg-[#0f2b4e] px-3.5 py-2.5 text-sm text-primary placeholder:text-secondary outline-none transition focus:border-[#4a9eff] focus:ring-2 focus:ring-[#4a9eff]/40";

  return (
    <>
      <ChipBackground />
      <section className="relative z-10 px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4a9eff]/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#4a9eff]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#4a9eff]"
              style={{ boxShadow: "0 0 8px rgba(74,158,255,0.9)" }}
            />
            {L.heroKicker}
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-primary md:text-5xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-secondary md:text-xl">{copy.subtitle}</p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary md:text-lg">{copy.intro}</p>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            {/* Left: contact details */}
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group rounded-2xl border border-border bg-card p-5 backdrop-blur-sm transition hover:border-[#4a9eff]"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary">{L.emailLabel}</div>
                <div className="mt-1.5 break-all text-base font-semibold text-primary transition-colors group-hover:text-[#4a9eff]">
                  {CONTACT_EMAIL}
                </div>
              </a>
              <div className="rounded-2xl border border-border bg-card p-5 backdrop-blur-sm">
                <div className="text-base font-semibold text-primary">{L.response}</div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 backdrop-blur-sm">
                <div className="text-base font-semibold text-primary">{L.partnerships}</div>
              </div>
              <Link
                href="/underwriting"
                className="mt-1 inline-flex items-center justify-center self-start rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-[#4a9eff]"
              >
                {copy.secondary}
              </Link>
            </div>

            {/* Right: message form (opens visitor's email, pre-filled) */}
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft backdrop-blur-sm md:p-7"
            >
              <h2 className="text-lg font-semibold text-primary">{L.formTitle}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-secondary">{L.name}</span>
                  <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-secondary">{L.email}</span>
                  <input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
              </div>
              <label className="mt-4 block text-sm">
                <span className="mb-1.5 block font-medium text-secondary">{L.company}</span>
                <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} />
              </label>
              <label className="mt-4 block text-sm">
                <span className="mb-1.5 block font-medium text-secondary">{L.message}</span>
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
                className="mt-5 inline-flex w-full items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-[#02091c] transition hover:opacity-90 sm:w-auto"
                style={{ background: BLUE, boxShadow: "0 0 18px rgba(74,158,255,0.5)" }}
              >
                {copy.primary}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
