'use client';

import React from 'react';
import { motion } from 'framer-motion';

/** Deep ink navy shared by all redesigned marketing surfaces. */
export const INK = '#060d1f';

/* ──────────────────────────────────────────────────────────────────────────
   Cinematic background: aurora glows + masked grid + film grain + vignette
   ────────────────────────────────────────────────────────────────────────── */
export function CinematicBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ background: INK }}>
      <div
        className="home-aurora absolute -top-[20%] left-[8%] h-[60vh] w-[55vw] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(26,112,247,0.30), transparent 65%)' }}
      />
      <div
        className="home-aurora-slow absolute top-[30%] -right-[12%] h-[70vh] w-[50vw] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.16), transparent 62%)' }}
      />
      <div
        className="home-aurora absolute bottom-[-25%] left-[28%] h-[55vh] w-[45vw] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(74,158,255,0.14), transparent 60%)', animationDelay: '-6s' }}
      />
      <div className="home-grid absolute inset-0" />
      <div className="home-noise absolute inset-0 opacity-[0.05]" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 120% 90% at 50% 8%, transparent 40%, rgba(4,8,18,0.85) 100%)' }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Scroll reveal
   ────────────────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.6, 0.35, 1] as const } },
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: fadeUp.hidden,
        show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Section kicker with gradient rule
   ────────────────────────────────────────────────────────────────────────── */
export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-10 bg-gradient-to-r from-cyan-400 to-transparent" />
      <span className="text-[11px] font-bold tracking-[0.3em] text-cyan-400/80">{children}</span>
    </div>
  );
}

/** Pill badge used above page titles. */
export function HeroBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/25 bg-cyan-400/[0.06] px-4 py-2 backdrop-blur-sm">
      <span className="home-pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-400" />
      <span className="text-[10px] font-bold tracking-[0.28em] text-cyan-300/90">{children}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Shared button class names
   ────────────────────────────────────────────────────────────────────────── */
export const primaryButtonClass =
  'group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#1a70f7] to-[#2b8af9] px-8 py-4 text-[15px] font-bold text-white shadow-[0_8px_32px_rgba(26,112,247,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_44px_rgba(26,112,247,0.65)]';

export const secondaryButtonClass =
  'inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-8 py-4 text-[15px] font-semibold text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/[0.06] hover:text-white';

export function ButtonSheen() {
  return <span className="home-sheen absolute inset-0" aria-hidden />;
}

export function ArrowIcon() {
  return (
    <svg
      className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Glass card class used across the redesigned marketing pages. */
export const glassCardClass =
  'rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/30 hover:bg-white/[0.04]';
