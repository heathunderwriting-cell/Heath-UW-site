'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/components/providers/LanguageProvider';
import { companyCopy } from '@/locales/company-content';
import {
  ArrowIcon,
  ButtonSheen,
  CinematicBackground,
  HeroBadge,
  Kicker,
  Reveal,
  primaryButtonClass,
} from '@/components/marketing/Cinematic';

const GOLD = '#c9a84c';

function AIPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-400/15 to-cyan-400/[0.04] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.25)]">
      ◈ {children}
    </span>
  );
}

function GradientSpan({ children }: { children: React.ReactNode }) {
  return <span className="bg-gradient-to-r from-cyan-300 to-[#4a9eff] bg-clip-text text-transparent">{children}</span>;
}

export default function CompanyPage() {
  const { dict, locale } = useI18n();
  const d = dict.pagesV2.company;
  const c = companyCopy[locale as 'en' | 'es' | 'zh'] ?? companyCopy.en;

  return (
    <main className="relative min-h-screen text-[#f0f4ff]">
      <CinematicBackground />

      <div className="relative z-10">
        {/* ── HERO ── */}
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-28 md:px-10 md:pt-36">
          <Reveal>
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <HeroBadge>{c.heroEyebrow}</HeroBadge>
              <div className="mb-8">
                <AIPill>{c.aiNativeMga}</AIPill>
              </div>
            </div>
            <h1 className="mb-6 max-w-4xl text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              {d.subtitle}
            </h1>
            <p className="max-w-2xl text-[17px] leading-relaxed text-white/55 md:text-lg">{d.intro}</p>
          </Reveal>
        </section>

        {/* ── AI BANNER ── */}
        <Reveal>
          <div className="border-y border-white/[0.07] bg-gradient-to-r from-cyan-400/[0.03] via-cyan-400/[0.08] to-cyan-400/[0.03] backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 md:px-10">
              {c.banner.map(([label, sub]) => (
                <div key={label} className="flex items-center gap-2.5 text-[13px] text-white/50">
                  <span className="text-[9px] text-cyan-400">✦</span>
                  <strong className="font-bold text-cyan-300">{label}</strong>
                  <span>— {sub}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── MISSION & VISION ── */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28">
          <Reveal>
            <Kicker>{c.purposeEyebrow}</Kicker>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              { ...c.mission, gold: false },
              { ...c.vision, gold: true },
            ].map(({ eyebrow, gold, title, body }, i) => (
              <Reveal key={eyebrow} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-9 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.04] md:p-10">
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{
                      background: gold
                        ? `linear-gradient(90deg, ${GOLD}, transparent)`
                        : 'linear-gradient(90deg, #22d3ee, transparent)',
                    }}
                  />
                  <div
                    className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: gold ? GOLD : '#22d3ee' }}
                  >
                    {eyebrow}
                  </div>
                  <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">{title}</h2>
                  <p className="text-[15px] leading-[1.8] text-white/55">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── WHO WE ARE ── */}
        <section className="border-y border-white/[0.06] bg-[#0c1d3f]/60 py-24 backdrop-blur-sm md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <Reveal>
              <Kicker>{c.whoEyebrow}</Kicker>
              <h2 className="mb-12 text-[clamp(26px,3.2vw,42px)] font-extrabold leading-[1.15] tracking-[-0.02em]">
                {c.whoTitlePre}
                <GradientSpan>{c.whoTitleHighlight}</GradientSpan>
              </h2>
            </Reveal>
            <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
              <Reveal delay={0.1}>
                <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm md:p-10">
                  <div aria-hidden className="absolute left-0 top-8 h-[calc(100%-4rem)] w-[3px] rounded-full bg-gradient-to-b from-cyan-400 to-transparent" />
                  {c.whoParagraphs.map((text, i) => (
                    <p key={i} className="mb-4 text-[15px] leading-[1.85] text-white/60 last:mb-0">
                      {text}
                    </p>
                  ))}
                </div>
              </Reveal>
              <div className="flex flex-col gap-5">
                {c.whoStats.map(([num, label], i) => (
                  <Reveal key={num} delay={0.15 + i * 0.08}>
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-7 py-6 backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/30">
                      <div className="bg-gradient-to-b from-white to-[#9fc4ff] bg-clip-text font-mono text-3xl font-extrabold text-transparent">
                        {num}
                      </div>
                      <div className="mt-1.5 text-[13px] text-white/45">{label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TECHNOLOGY ── */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28">
          <Reveal>
            <Kicker>{c.techEyebrow}</Kicker>
            <div className="mb-5 flex flex-wrap items-start gap-4">
              <h2 className="text-[clamp(26px,3.2vw,42px)] font-extrabold leading-[1.15] tracking-[-0.02em]">
                {c.techTitlePre}
                <GradientSpan>{c.techTitleHighlight}</GradientSpan>
                <br />
                {c.techTitlePost}
              </h2>
              <div className="mt-2">
                <AIPill>{c.techPillLabel}</AIPill>
              </div>
            </div>
            <p className="mb-14 max-w-2xl text-[15px] leading-[1.75] text-white/55">{c.techIntro}</p>
          </Reveal>

          {/* Tech cards */}
          <div className="grid gap-5 md:grid-cols-3">
            {c.techItems.map(({ icon, title, desc, tag, highlight }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <div
                  className={`group h-full rounded-2xl border p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 ${
                    highlight
                      ? 'border-cyan-400/40 bg-gradient-to-br from-cyan-400/[0.08] to-white/[0.02] shadow-[0_0_36px_rgba(34,211,238,0.1)]'
                      : 'border-white/[0.08] bg-white/[0.02] hover:border-cyan-400/25 hover:bg-white/[0.04]'
                  }`}
                >
                  <div
                    className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl border text-xl transition-transform duration-500 group-hover:scale-110 ${
                      highlight ? 'border-cyan-400/40 bg-cyan-400/20' : 'border-cyan-400/20 bg-cyan-400/10'
                    }`}
                  >
                    {icon}
                  </div>
                  <h3 className="mb-2.5 text-base font-bold text-white">{title}</h3>
                  <p className="text-[13.5px] leading-[1.7] text-white/45">{desc}</p>
                  <span className="mt-4 inline-block rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-3 py-1 text-[11px] text-cyan-300/90">
                    {tag}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* AI-Native highlight card */}
          <Reveal delay={0.1}>
            <div className="relative mt-12 overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/[0.09] to-[#1a70f7]/[0.04] p-9 backdrop-blur-sm md:p-10">
              <div
                aria-hidden
                className="absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)' }}
              />
              <div className="absolute right-6 top-5 text-[10px] font-black tracking-[0.22em] text-cyan-400/40">
                {c.whyCardLabel}
              </div>
              <h3 className="mb-3 text-xl font-bold tracking-tight md:text-2xl">
                {c.whyTitlePre}
                <GradientSpan>{c.whyTitleHighlight}</GradientSpan>
                {c.whyTitlePost}
              </h3>
              <p className="mb-8 max-w-3xl text-[14.5px] leading-[1.8] text-white/55">{c.whyBody}</p>
              <div className="grid gap-4 md:grid-cols-3">
                {c.aiWorkflows.map(({ title, desc }) => (
                  <div key={title} className="rounded-xl border border-cyan-400/20 bg-[#0a1733]/50 px-5 py-4 backdrop-blur-sm">
                    <strong className="mb-1 block text-[13px] font-bold text-cyan-300">{title}</strong>
                    <span className="text-[12.5px] leading-relaxed text-white/45">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Pipeline */}
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-9 backdrop-blur-sm md:p-10">
              <div className="mb-9 text-[12px] font-bold uppercase tracking-[0.1em] text-cyan-300">{c.pipelineLabel}</div>
              <div className="flex flex-wrap items-start">
                {c.pipelineSteps.map((step, i) => (
                  <div key={i} className="relative min-w-[100px] flex-1 text-center">
                    {i < c.pipelineSteps.length - 1 && (
                      <span className="absolute -right-2.5 top-[18%] text-cyan-400/70">→</span>
                    )}
                    <div className="mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-cyan-400/70 bg-cyan-400/10 font-mono text-[12px] font-bold text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.25)]">
                      {i + 1}
                    </div>
                    <div className="whitespace-pre-line text-[12px] leading-snug text-white/45">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── VALUES ── */}
        <section className="border-y border-white/[0.06] bg-[#0c1d3f]/60 py-24 backdrop-blur-sm md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <Reveal>
              <Kicker>{c.valuesEyebrow}</Kicker>
              <h2 className="mb-12 text-[clamp(26px,3.2vw,42px)] font-extrabold leading-[1.15] tracking-[-0.02em]">
                {c.valuesTitlePre}
                <GradientSpan>{c.valuesTitleHighlight}</GradientSpan>
              </h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {c.values.map(({ num, title, desc, highlight }, i) => (
                <Reveal key={num} delay={i * 0.07}>
                  <div
                    className={`h-full rounded-2xl border p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 ${
                      highlight
                        ? 'border-cyan-400/35 bg-cyan-400/[0.05]'
                        : 'border-white/[0.08] bg-white/[0.02] hover:border-cyan-400/25'
                    }`}
                  >
                    <div className="mb-4 font-mono text-[13px] font-bold tracking-[0.2em] text-cyan-400/60">{num}</div>
                    <h3 className="mb-2.5 text-[15px] font-bold text-white">{title}</h3>
                    <p className="text-[13px] leading-[1.7] text-white/45">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── GOVERNANCE ── */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28">
          <Reveal>
            <Kicker>{c.govEyebrow}</Kicker>
            <h2 className="mb-4 text-[clamp(26px,3.2vw,42px)] font-extrabold leading-[1.15] tracking-[-0.02em]">
              {c.govTitlePre}
              <GradientSpan>{c.govTitleHighlight}</GradientSpan>
              {c.govTitlePost}
            </h2>
            <p className="mb-12 max-w-2xl text-[15px] leading-[1.75] text-white/55">{c.govIntro}</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {c.govItems.map(({ title, items }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/25 md:p-9">
                  <h3 className="mb-5 text-base font-bold text-white">{title}</h3>
                  <ul className="flex flex-col gap-3">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-white/55">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-6 pb-28 md:px-10 md:pb-32">
          <Reveal className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 px-8 py-14 md:px-14 md:py-16">
              <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0c1f42 0%, #102a55 50%, #0a1834 100%)' }} />
              <div
                aria-hidden
                className="absolute inset-0 opacity-80"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(26,112,247,0.35), transparent 60%), radial-gradient(ellipse 50% 50% at 85% 100%, rgba(34,211,238,0.18), transparent 60%)',
                }}
              />
              <div className="home-grid absolute inset-0 opacity-60" aria-hidden />
              <div className="relative flex flex-wrap items-center justify-between gap-10">
                <div>
                  <div className="mb-4">
                    <AIPill>{c.aiNativeMga}</AIPill>
                  </div>
                  <h2 className="mb-3 text-[clamp(24px,3vw,36px)] font-extrabold leading-[1.15] tracking-[-0.02em]">
                    {c.ctaTitlePre}
                    <GradientSpan>{c.ctaTitleHighlight}</GradientSpan>
                  </h2>
                  <p className="max-w-md text-[15px] leading-relaxed text-white/55">{c.ctaBody}</p>
                </div>
                <Link href="/contact" className={primaryButtonClass}>
                  <ButtonSheen />
                  <span className="relative">{c.ctaButton}</span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
