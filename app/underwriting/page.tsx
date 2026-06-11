"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/components/providers/LanguageProvider";
import {
  ArrowIcon,
  ButtonSheen,
  CinematicBackground,
  HeroBadge,
  Reveal,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/marketing/Cinematic";

export default function UnderwritingPage() {
  const { dict, locale } = useI18n();
  const copy = dict.pagesV2.underwriting;

  const L = {
    kicker: locale === "es" ? "Suscripción" : locale === "zh" ? "核保" : "Underwriting",
    closing:
      locale === "es"
        ? "¿Buscas un socio técnico de suscripción?"
        : locale === "zh"
        ? "正在寻找技术型核保合作伙伴吗？"
        : "Looking for a technical underwriting partner?",
  };

  return (
    <main className="relative min-h-screen text-[#f0f4ff]">
      <CinematicBackground />

      {/* ── HERO ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-28 md:px-10 md:pt-36">
        <Reveal>
          <HeroBadge>{L.kicker}</HeroBadge>
          <h1 className="mb-6 max-w-3xl text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {copy.title}
          </h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-white/60 md:text-lg">{copy.subtitle}</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/45">{copy.intro}</p>
        </Reveal>
      </section>

      {/* ── PILLARS ── */}
      <section className="relative z-10 border-y border-white/[0.06] bg-[#0c1d3f]/60 py-24 backdrop-blur-sm md:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3 md:px-10">
          {copy.pillars.map((pillar, i) => (
            <Reveal key={pillar} delay={i * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/30 hover:bg-white/[0.04]">
                <div
                  aria-hidden
                  className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, rgba(34,211,238,0.16), transparent 70%)" }}
                />
                <div className="relative">
                  <div className="mb-5 font-mono text-[13px] font-bold tracking-[0.2em] text-cyan-400/60">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-[15px] leading-[1.75] text-white/75">{pillar}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 px-6 py-24 md:px-10 md:py-28">
        <Reveal className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 px-8 py-14 md:px-14 md:py-16">
            <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0c1f42 0%, #102a55 50%, #0a1834 100%)" }} />
            <div
              aria-hidden
              className="absolute inset-0 opacity-80"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(26,112,247,0.35), transparent 60%), radial-gradient(ellipse 50% 50% at 85% 100%, rgba(34,211,238,0.18), transparent 60%)",
              }}
            />
            <div className="home-grid absolute inset-0 opacity-60" aria-hidden />
            <div className="relative flex flex-wrap items-center justify-between gap-8">
              <p className="max-w-xl text-[clamp(20px,2.4vw,28px)] font-extrabold leading-snug tracking-[-0.02em]">
                {L.closing}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className={primaryButtonClass}>
                  <ButtonSheen />
                  <span className="relative">{dict.nav.cta}</span>
                  <ArrowIcon />
                </Link>
                <Link href="/portfolio" className={secondaryButtonClass}>
                  {dict.nav.portfolio.label}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
