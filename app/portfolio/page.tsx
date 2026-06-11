'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/components/providers/LanguageProvider';
import { portfolioCopy, type LineContent } from '@/locales/portfolio-lines';
import {
  ArrowIcon,
  ButtonSheen,
  CinematicBackground,
  HeroBadge,
  Reveal,
  primaryButtonClass,
  secondaryButtonClass,
} from '@/components/marketing/Cinematic';

interface SpecialtyLine extends LineContent {
  id: string;
  image: string;
  imagePosition: string;
}

const LINE_META = [
  { id: 'st', image: 'https://images.unsplash.com/photo-1591588211599-04eeffe9acc7?w=1400&auto=format&fit=crop&q=80', imagePosition: 'center 40%' },
  { id: 'property', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&auto=format&fit=crop&q=80', imagePosition: 'center 55%' },
  { id: 'financial', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&auto=format&fit=crop&q=80', imagePosition: 'center 60%' },
  { id: 'marine', image: 'https://images.unsplash.com/photo-1699588999949-e25959a59550?w=1400&auto=format&fit=crop&q=80', imagePosition: 'center 50%' },
  { id: 'aviation', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&auto=format&fit=crop&q=80', imagePosition: 'center 40%' },
] as const;

function LineCard({
  line,
  copy,
  index,
}: {
  line: SpecialtyLine;
  copy: (typeof portfolioCopy)['en'];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.06}>
      <div
        className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
          open
            ? 'border-cyan-400/40 shadow-[0_0_0_1px_rgba(34,211,238,0.15),0_28px_70px_rgba(2,6,18,0.7)]'
            : 'border-white/[0.08] shadow-[0_12px_40px_rgba(2,6,18,0.45)] hover:-translate-y-1 hover:border-cyan-400/25'
        }`}
      >
        {/* image layer */}
        <div
          className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ backgroundImage: `url(${line.image})`, backgroundSize: 'cover', backgroundPosition: line.imagePosition }}
        />
        {/* ink overlay */}
        <div
          className="absolute inset-0 z-[1] transition-all duration-500"
          style={{
            background: open
              ? 'linear-gradient(135deg, rgba(6,13,31,0.97) 0%, rgba(8,18,40,0.95) 100%)'
              : 'linear-gradient(105deg, rgba(6,13,31,0.96) 0%, rgba(6,13,31,0.85) 55%, rgba(6,13,31,0.65) 100%)',
          }}
        />
        {/* cyan edge accent */}
        <div aria-hidden className="absolute inset-y-0 left-0 z-[2] w-[3px] bg-gradient-to-b from-cyan-400/80 via-[#1a70f7]/60 to-transparent" />

        <div className="relative z-[2] p-8 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-[12px] font-bold tracking-[0.2em] text-cyan-400/60">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-bold tracking-[0.18em] text-cyan-300/90">{line.label}</span>
              </div>
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-white md:text-[28px]">
                {line.headline}
              </h3>
            </div>
            <span className="shrink-0 whitespace-nowrap rounded-full border border-cyan-400/30 bg-cyan-400/[0.08] px-4 py-1.5 text-[11px] font-semibold tracking-wide text-cyan-300 backdrop-blur-md">
              {line.capacityType}
            </span>
          </div>

          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/65">{line.summary}</p>

          <button
            onClick={() => setOpen(!open)}
            className={`mt-6 inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-[12px] font-bold tracking-[0.08em] backdrop-blur-md transition-all duration-300 ${
              open
                ? 'border-cyan-400/50 bg-cyan-400/15 text-cyan-200'
                : 'border-cyan-400/30 bg-cyan-400/[0.07] text-cyan-300 hover:bg-cyan-400/15'
            }`}
          >
            {open ? copy.collapse : copy.viewDetail}
            <span className={`inline-block transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>↓</span>
          </button>

          {open && (
            <div className="mt-8 grid gap-10 border-t border-white/[0.08] pt-8 md:grid-cols-2">
              <div>
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">{copy.theRisk}</p>
                <p className="mb-7 text-[14px] leading-[1.75] text-white/65">{line.riskDescription}</p>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">{copy.coverageScope}</p>
                <ul className="space-y-2.5">
                  {line.coverScope.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] leading-snug text-white/60">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">{copy.structuresLabel}</p>
                <ul className="mb-7 space-y-2.5">
                  {line.structures.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] leading-snug text-white/60">
                      <span className="shrink-0 font-bold text-cyan-400/80">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">{copy.targetMarkets}</p>
                <p className="text-[14px] leading-[1.75] text-white/65">{line.markets}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function PortfolioPage() {
  const { dict, locale } = useI18n();
  const d = dict.pagesV2.portfolio;
  const copy = portfolioCopy[locale as 'en' | 'es' | 'zh'] ?? portfolioCopy.en;
  const lines: SpecialtyLine[] = copy.lines.map((line, i) => ({ ...line, ...LINE_META[i] }));

  return (
    <main className="relative min-h-screen text-[#f0f4ff]">
      <CinematicBackground />

      {/* ── HEADER ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-28 md:px-10 md:pt-36">
        <Reveal>
          <HeroBadge>{copy.eyebrow}</HeroBadge>
          <h1 className="mb-6 max-w-3xl text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {d.subtitle}
          </h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-white/55 md:text-lg">{d.intro}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {lines.map((l) => (
              <span
                key={l.id}
                className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-bold tracking-[0.12em] text-white/45 backdrop-blur-sm"
              >
                {l.label}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── LINE CARDS ── */}
      <section className="relative z-10 mx-auto flex max-w-7xl flex-col gap-5 px-6 pb-28 md:px-10">
        {lines.map((line, i) => (
          <LineCard key={line.id} line={line} copy={copy} index={i} />
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 px-6 pb-28 md:px-10">
        <Reveal className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 px-8 py-16 md:px-14 md:py-20">
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
                <h2 className="mb-4 max-w-xl text-[clamp(26px,3.5vw,42px)] font-extrabold leading-[1.15] tracking-[-0.02em]">
                  {copy.ctaTitlePre}
                  <span className="bg-gradient-to-r from-cyan-300 to-[#4a9eff] bg-clip-text text-transparent">
                    {copy.ctaTitleHighlight}
                  </span>
                </h2>
                <p className="max-w-lg text-[15px] leading-relaxed text-white/55">{copy.ctaText}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className={primaryButtonClass}>
                  <ButtonSheen />
                  <span className="relative">{copy.ctaSubmit}</span>
                  <ArrowIcon />
                </Link>
                <Link href="/underwriting" className={secondaryButtonClass}>
                  {copy.ctaExplore}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
