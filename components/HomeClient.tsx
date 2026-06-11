'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useI18n } from '@/components/providers/LanguageProvider';
import type { Locale } from '@/lib/i18n';
import { CinematicBackground, INK, Kicker, Reveal } from '@/components/marketing/Cinematic';

/* ──────────────────────────────────────────────────────────────────────────
   Copy that is unique to the redesigned landing (kept local, trilingual,
   following the same pick(locale) pattern used across app pages).
   ────────────────────────────────────────────────────────────────────────── */
const EXTRA = {
  es: {
    heroKicker: 'MGA NATIVO EN IA · REASEGURO ESPECIALIZADO',
    heroAccent: 'AI-native',
    stats: [
      { value: '< 2 min', label: 'Triage de cada submission' },
      { value: '24/7', label: 'Intake automatizado de brokers' },
      { value: '5', label: 'Salidas del motor de decisión' },
      { value: '3', label: 'Idiomas de operación' },
    ],
    console: {
      title: 'MOTOR DE SUSCRIPCIÓN',
      live: 'EN VIVO',
      steps: [
        'Submission entrante — email de broker recibido',
        'Extracción IA — riesgo estructurado',
        'Motor de decisión — 5 reglas evaluadas',
        'Respuesta al broker — redactada y enviada',
      ],
      decisionLabel: 'DECISIÓN',
      decision: 'ELEGIBLE PARA REVISIÓN',
      fields: { insured: 'Asegurado', country: 'País', limit: 'Límite', line: 'Línea' },
      footer: 'De email de broker a decisión de suscripción — sin intervención manual.',
    },
    marqueeLines: ['Sabotaje y Terrorismo', 'Property', 'Marine', 'Aviation', 'Líneas Financieras'],
    modelKicker: 'EL FRAMEWORK',
    edgeKicker: 'DIFERENCIACIÓN',
    aboutKicker: 'QUIÉNES SOMOS',
    ctaKicker: 'PROVEEDORES DE CAPACIDAD',
    scroll: 'Desliza para explorar',
  },
  en: {
    heroKicker: 'AI-NATIVE MGA · SPECIALTY REINSURANCE',
    heroAccent: 'AI-native',
    stats: [
      { value: '< 2 min', label: 'Triage per submission' },
      { value: '24/7', label: 'Automated broker intake' },
      { value: '5', label: 'Decision-engine outcomes' },
      { value: '3', label: 'Operating languages' },
    ],
    console: {
      title: 'UNDERWRITING ENGINE',
      live: 'LIVE',
      steps: [
        'Inbound submission — broker email received',
        'AI extraction — risk structured',
        'Decision engine — 5 rules evaluated',
        'Broker reply — drafted and sent',
      ],
      decisionLabel: 'DECISION',
      decision: 'ELIGIBLE FOR REVIEW',
      fields: { insured: 'Insured', country: 'Country', limit: 'Limit', line: 'Line' },
      footer: 'From broker email to underwriting decision — no manual touch.',
    },
    marqueeLines: ['Sabotage & Terrorism', 'Property', 'Marine', 'Aviation', 'Financial Lines'],
    modelKicker: 'THE FRAMEWORK',
    edgeKicker: 'DIFFERENTIATION',
    aboutKicker: 'WHO WE ARE',
    ctaKicker: 'CAPACITY PROVIDERS',
    scroll: 'Scroll to explore',
  },
  zh: {
    heroKicker: 'AI原生MGA · 特殊再保险',
    heroAccent: 'AI原生',
    stats: [
      { value: '< 2 分钟', label: '单笔提交分诊' },
      { value: '24/7', label: '自动化经纪人接收' },
      { value: '5', label: '决策引擎结果' },
      { value: '3', label: '运营语言' },
    ],
    console: {
      title: '承保引擎',
      live: '实时',
      steps: ['新提交 — 已收到经纪人邮件', 'AI提取 — 风险结构化', '决策引擎 — 已评估5项规则', '经纪人回复 — 已起草并发送'],
      decisionLabel: '决策',
      decision: '符合审核条件',
      fields: { insured: '被保险人', country: '国家', limit: '限额', line: '险种' },
      footer: '从经纪人邮件到承保决策 — 无需人工干预。',
    },
    marqueeLines: ['破坏与恐怖主义', '财产险', '海运险', '航空险', '金融险'],
    modelKicker: '框架',
    edgeKicker: '差异化',
    aboutKicker: '我们是谁',
    ctaKicker: '承保能力合作伙伴',
    scroll: '向下滚动探索',
  },
} as const;

const SCENARIOS = [
  { insured: 'Energy infrastructure portfolio', country: 'Colombia', limit: 'USD 25,000,000', line: 'S&T' },
  { insured: 'Logistics & port operations', country: 'Chile', limit: 'USD 10,000,000', line: 'S&T' },
  { insured: 'Commercial real estate group', country: 'Perú', limit: 'USD 15,000,000', line: 'S&T' },
];

/* ──────────────────────────────────────────────────────────────────────────
   Live underwriting console — the product, animated
   ────────────────────────────────────────────────────────────────────────── */
function LiveConsole({ locale }: { locale: Locale }) {
  const x = EXTRA[locale].console;
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [scenario, setScenario] = useState(0);
  const total = x.steps.length + 1; // steps + resting state before loop

  useEffect(() => {
    if (reduceMotion) {
      setStep(x.steps.length);
      return;
    }
    const id = setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % (total + 1);
        if (next === 0) setScenario((sc) => (sc + 1) % SCENARIOS.length);
        return next;
      });
    }, 1500);
    return () => clearInterval(id);
  }, [reduceMotion, total, x.steps.length]);

  const data = SCENARIOS[scenario];
  const showFields = step >= 2;
  const showDecision = step >= 3;
  const replySent = step >= 4;

  return (
    <div className="relative">
      {/* glow behind the card */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-3xl opacity-60 blur-2xl"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(26,112,247,0.35), transparent 70%)' }}
      />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1730]/90 shadow-[0_24px_80px_rgba(2,6,18,0.7)] backdrop-blur-xl">
        {/* scanline sweep */}
        <div aria-hidden className="home-scanline pointer-events-none absolute inset-0" />

        {/* title bar */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            </div>
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-white/40">{x.title}</span>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold tracking-widest text-emerald-400">
            <span className="home-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {x.live}
          </span>
        </div>

        {/* pipeline steps */}
        <div className="space-y-0 px-6 py-5">
          {x.steps.map((label, i) => {
            const active = step === i + 1;
            const done = step > i + 1;
            return (
              <div key={i} className="flex items-start gap-3.5 py-2.5">
                <div className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                  {done ? (
                    <svg viewBox="0 0 20 20" className="h-5 w-5 text-cyan-400" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
                      <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : active ? (
                    <>
                      <span className="absolute h-5 w-5 animate-ping rounded-full bg-cyan-400/25" />
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
                    </>
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                  )}
                </div>
                <span
                  className={`font-mono text-[12.5px] leading-relaxed transition-colors duration-500 ${
                    done ? 'text-white/55' : active ? 'text-white' : 'text-white/25'
                  }`}
                >
                  {label}
                  {active && <span className="home-caret ml-1 inline-block h-3 w-[7px] translate-y-[1px] bg-cyan-400/90" />}
                </span>
              </div>
            );
          })}
        </div>

        {/* extracted fields */}
        <div
          className={`mx-6 mb-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.06] transition-all duration-700 ${
            showFields ? 'opacity-100' : 'opacity-30'
          }`}
        >
          {(
            [
              [x.fields.insured, data.insured],
              [x.fields.country, data.country],
              [x.fields.limit, data.limit],
              [x.fields.line, data.line],
            ] as const
          ).map(([k, v]) => (
            <div key={k} className="bg-[#0a1730] px-4 py-3">
              <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">{k}</div>
              <div className={`truncate font-mono text-[12px] transition-colors duration-500 ${showFields ? 'text-cyan-200/90' : 'text-white/20'}`}>
                {showFields ? v : '— — —'}
              </div>
            </div>
          ))}
        </div>

        {/* decision row */}
        <div className="flex items-center justify-between border-t border-white/[0.07] px-6 py-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-white/35">{x.decisionLabel}</span>
          <div className="flex items-center gap-3">
            <span
              className={`rounded-md border px-3 py-1.5 font-mono text-[11px] font-bold tracking-wider transition-all duration-700 ${
                showDecision
                  ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.25)]'
                  : 'border-white/10 bg-white/[0.03] text-white/20'
              }`}
            >
              {showDecision ? x.decision : '· · ·'}
            </span>
            <svg
              viewBox="0 0 20 20"
              className={`h-4 w-4 transition-all duration-500 ${replySent ? 'text-cyan-400 opacity-100' : 'text-white/15 opacity-50'}`}
              fill="none"
            >
              <path d="M2 10l16-7-5 16-3.5-6L2 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] tracking-wide text-white/30">{x.footer}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Stat with count-up feel (simple reveal; values are strings)
   ────────────────────────────────────────────────────────────────────────── */
function Stat({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div ref={ref} className="relative px-2 py-6 text-center sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.12 }}
      >
        <div className="bg-gradient-to-b from-white to-[#9fc4ff] bg-clip-text font-mono text-3xl font-extrabold tracking-tight text-transparent md:text-4xl">
          {value}
        </div>
        <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/35">{label}</div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────── */
export default function HomeClient() {
  const { dict, locale } = useI18n();
  const d = dict.home;
  const x = EXTRA[locale];

  const heroTitle = d.hero.title as string;
  // Highlight the AI-native fragment of the headline with a gradient, when present.
  const heroParts = useMemo(() => {
    const accent = x.heroAccent;
    const idx = heroTitle.toLowerCase().indexOf(accent.toLowerCase());
    if (idx === -1) return null;
    return {
      before: heroTitle.slice(0, idx),
      accent: heroTitle.slice(idx, idx + accent.length),
      after: heroTitle.slice(idx + accent.length),
    };
  }, [heroTitle, x.heroAccent]);

  const marqueeItems = useMemo(
    () => [...x.marqueeLines, ...(d.quickTags as readonly string[])],
    [x.marqueeLines, d.quickTags]
  );

  return (
    <div className="relative min-h-screen text-[#f0f4ff]" style={{ background: INK }}>
      <CinematicBackground />

      {/* ════════ HERO ════════ */}
      <section className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pb-16 pt-28 md:px-10 md:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Left: headline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/25 bg-cyan-400/[0.06] px-4 py-2 backdrop-blur-sm"
            >
              <span className="home-pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span className="text-[10px] font-bold tracking-[0.28em] text-cyan-300/90">{x.heroKicker}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-7 text-[clamp(40px,5.6vw,76px)] font-extrabold leading-[1.02] tracking-[-0.03em]"
            >
              {heroParts ? (
                <>
                  {heroParts.before}
                  <span className="bg-gradient-to-r from-cyan-300 via-[#4a9eff] to-[#1a70f7] bg-clip-text text-transparent">
                    {heroParts.accent}
                  </span>
                  {heroParts.after}
                </>
              ) : (
                heroTitle
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22 }}
              className="mb-10 max-w-xl text-[17px] leading-relaxed text-white/55 md:text-lg"
            >
              {d.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#1a70f7] to-[#2b8af9] px-8 py-4 text-[15px] font-bold text-white shadow-[0_8px_32px_rgba(26,112,247,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_44px_rgba(26,112,247,0.65)]"
              >
                <span className="home-sheen absolute inset-0" aria-hidden />
                <span className="relative">{d.hero.primaryCta}</span>
                <svg className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#model"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-8 py-4 text-[15px] font-semibold text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/[0.06] hover:text-white"
              >
                {d.hero.secondaryCta}
              </a>
            </motion.div>
          </div>

          {/* Right: live console */}
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.6, 0.35, 1] }}
          >
            <LiveConsole locale={locale} />
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="pointer-events-none mt-14 hidden items-center justify-center gap-3 md:flex"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/25">{x.scroll}</span>
          <span className="home-scroll-line block h-8 w-px bg-gradient-to-b from-cyan-400/60 to-transparent" />
        </motion.div>
      </section>

      {/* ════════ STATS ════════ */}
      <section className="relative z-10 border-y border-white/[0.07] bg-white/[0.015] backdrop-blur-sm">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-white/[0.06] px-6 md:grid-cols-4">
          {x.stats.map((s, i) => (
            <Stat key={s.label} value={s.value} label={s.label} index={i} />
          ))}
        </div>
      </section>

      {/* ════════ MARQUEE ════════ */}
      <section aria-hidden className="relative z-10 overflow-hidden border-b border-white/[0.05] py-5">
        <div className="home-marquee-mask">
          <div className="home-marquee flex w-max items-center gap-10">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-10 whitespace-nowrap">
                <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-white/25">{item}</span>
                <span className="h-1 w-1 rounded-full bg-cyan-400/40" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ WHO WE ARE ════════ */}
      <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <Kicker>{x.aboutKicker}</Kicker>
            <h2 className="mb-10 text-[clamp(28px,3.4vw,46px)] font-extrabold leading-[1.12] tracking-[-0.02em]">
              {d.whoWeAre.title}
            </h2>
            <div className="relative inline-block select-none">
              <div className="text-[clamp(56px,7vw,96px)] font-black leading-none tracking-[-0.045em]">
                <span className="text-white">HEA</span>
                <span className="bg-gradient-to-r from-cyan-300 to-[#1a70f7] bg-clip-text text-transparent">TH</span>
              </div>
              <div className="mt-3 h-1 w-2/3 rounded bg-gradient-to-r from-cyan-400/80 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm md:p-10">
              <div aria-hidden className="absolute left-0 top-8 h-[calc(100%-4rem)] w-[3px] rounded-full bg-gradient-to-b from-cyan-400 to-transparent" />
              <p className="text-[17px] leading-[1.85] text-white/65">{d.whoWeAre.body}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ THE HEATH MODEL ════════ */}
      <section id="model" className="relative z-10 border-y border-white/[0.06] bg-[#081226]/70 py-28 backdrop-blur-sm md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <Kicker>{x.modelKicker}</Kicker>
            <h2 className="mb-16 max-w-2xl text-[clamp(28px,3.4vw,46px)] font-extrabold leading-[1.12] tracking-[-0.02em]">
              {d.model.title}
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {(d.model.pillars as readonly { title: string; body: string }[]).map((pillar, idx) => (
              <Reveal key={pillar.title} delay={idx * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/30 hover:bg-white/[0.04] hover:shadow-[0_24px_60px_rgba(2,6,18,0.6),0_0_40px_rgba(34,211,238,0.08)] md:p-10">
                  {/* hover glow */}
                  <div
                    aria-hidden
                    className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)' }}
                  />
                  <div className="relative">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-mono text-[13px] font-bold tracking-[0.2em] text-cyan-400/60">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {idx === 3 && (
                        <span className="rounded border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-1 text-[9px] font-black tracking-[0.2em] text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.35)]">
                          AI
                        </span>
                      )}
                    </div>
                    <h3 className="mb-3 text-lg font-bold tracking-tight text-white md:text-xl">{pillar.title}</h3>
                    <p className="text-[14.5px] leading-[1.75] text-white/45">{pillar.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ THE HEATH EDGE ════════ */}
      <section id="edge" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <Reveal>
          <Kicker>{x.edgeKicker}</Kicker>
          <h2 className="mb-16 max-w-2xl text-[clamp(28px,3.4vw,46px)] font-extrabold leading-[1.12] tracking-[-0.02em]">
            {d.edge.title}
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {(d.edge.items as readonly { title: string; body: string }[]).map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.1}>
              <div className="group relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#4a9eff]/35 hover:bg-white/[0.04] hover:shadow-[0_24px_60px_rgba(2,6,18,0.6)]">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/25 bg-gradient-to-br from-cyan-400/15 to-[#1a70f7]/15 transition-transform duration-500 group-hover:scale-110">
                  {idx === 0 && (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  )}
                  {idx === 1 && (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  )}
                  {idx === 2 && (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
                    </svg>
                  )}
                </div>
                <h3 className="mb-3 text-lg font-bold tracking-tight text-white">{item.title}</h3>
                <p className="text-[14.5px] leading-[1.75] text-white/45">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section id="contact" className="relative z-10 px-6 pb-28 md:px-10 md:pb-36">
        <Reveal className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 px-8 py-20 text-center md:px-16 md:py-24">
            {/* panel background */}
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

            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-4 py-1.5">
                <span className="text-[10px] font-bold tracking-[0.28em] text-cyan-300/90">{x.ctaKicker}</span>
              </div>
              <h2 className="mx-auto mb-6 max-w-3xl text-[clamp(28px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-0.025em]">
                {d.finalCta.title}
              </h2>
              <p className="mx-auto mb-12 max-w-xl text-[16px] leading-relaxed text-white/55 md:text-[17px]">
                {d.finalCta.body}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:info@heathuw.com"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#1a70f7] to-[#2b8af9] px-9 py-4 text-[15px] font-bold text-white shadow-[0_8px_32px_rgba(26,112,247,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_44px_rgba(26,112,247,0.7)]"
                >
                  <span className="home-sheen absolute inset-0" aria-hidden />
                  <span className="relative">{d.finalCta.primary}</span>
                  <svg className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center rounded-lg border border-white/20 bg-white/[0.04] px-9 py-4 text-[15px] font-semibold text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:text-white"
                >
                  {d.finalCta.secondary}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ════════ FOOTER ════════ */}
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
    </div>
  );
}
