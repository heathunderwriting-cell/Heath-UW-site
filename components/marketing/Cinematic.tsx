'use client';

import React from 'react';
import { motion } from 'framer-motion';

/** Ink navy shared by all redesigned marketing surfaces. */
export const INK = '#0a1733';

/* ──────────────────────────────────────────────────────────────────────────
   Neon AI workflow layer: glowing nodes connected like an n8n/LLM pipeline,
   with data pulses travelling along the traces.
   ────────────────────────────────────────────────────────────────────────── */
function NeonWorkflow() {
  // Orthogonal connector paths (n8n-style) reused by lines and pulses.
  const flows = [
    { d: 'M120,210 L320,210 L320,330 L560,330', dur: '6s', delay: '0s' },
    { d: 'M120,640 L300,640 L300,470 L560,470', dur: '7.5s', delay: '-2s' },
    { d: 'M720,400 L920,400 L920,250 L1130,250', dur: '6.5s', delay: '-1s' },
    { d: 'M720,430 L960,430 L960,610 L1180,610', dur: '8s', delay: '-4s' },
    { d: 'M1210,250 L1330,250 L1330,420', dur: '5.5s', delay: '-3s' },
    { d: 'M380,760 L640,760 L640,520', dur: '7s', delay: '-5s' },
  ];

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.5 }}
    >
      <defs>
        <filter id="nwGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="nwGlowBig" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="9" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="nwTrace" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1a70f7" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* connector traces (static base + animated dash overlay) */}
      {flows.map((f, i) => (
        <g key={i}>
          <path d={f.d} fill="none" stroke="url(#nwTrace)" strokeWidth="1.2" opacity="0.4" />
          <path d={f.d} fill="none" stroke="#4a9eff" strokeWidth="1.2" className="home-flow-line" opacity="0.5" />
          {/* data pulse travelling along the trace */}
          <circle r="3" fill="#22d3ee" filter="url(#nwGlowBig)">
            <animateMotion dur={f.dur} begin={f.delay} repeatCount="indefinite" path={f.d} />
          </circle>
        </g>
      ))}

      {/* ── node cluster: intake (left) ── */}
      <g filter="url(#nwGlow)">
        <rect x="78" y="180" width="60" height="60" rx="12" fill="none" stroke="#22d3ee" strokeWidth="1.6" opacity="0.75" />
        <circle cx="108" cy="210" r="7" fill="none" stroke="#22d3ee" strokeWidth="1.4" opacity="0.8" />
        <circle cx="108" cy="210" r="2.2" fill="#22d3ee" className="home-node-pulse" />
      </g>
      <g filter="url(#nwGlow)">
        <rect x="78" y="610" width="60" height="60" rx="30" fill="none" stroke="#4a9eff" strokeWidth="1.6" opacity="0.7" />
        <circle cx="108" cy="640" r="2.2" fill="#4a9eff" className="home-node-pulse" style={{ animationDelay: '-1.2s' }} />
      </g>

      {/* ── central AI core ── */}
      <g filter="url(#nwGlow)">
        <rect x="560" y="330" width="160" height="160" rx="18" fill="rgba(34,211,238,0.04)" stroke="#22d3ee" strokeWidth="1.8" opacity="0.85" />
        <rect x="580" y="350" width="120" height="120" rx="12" fill="none" stroke="#4a9eff" strokeWidth="1" opacity="0.45" />
        <circle cx="640" cy="410" r="26" fill="none" stroke="#22d3ee" strokeWidth="1.2" opacity="0.55" className="home-core-ring" />
        <circle cx="640" cy="410" r="13" fill="none" stroke="#22d3ee" strokeWidth="1.4" opacity="0.8" />
        <circle cx="640" cy="410" r="4" fill="#22d3ee" className="home-node-pulse" />
        {/* chip pins */}
        {[595, 625, 655, 685].map((x) => (
          <g key={x}>
            <line x1={x} y1="330" x2={x} y2="308" stroke="#22d3ee" strokeWidth="1.4" opacity="0.6" />
            <line x1={x} y1="490" x2={x} y2="512" stroke="#22d3ee" strokeWidth="1.4" opacity="0.6" />
          </g>
        ))}
      </g>

      {/* ── node cluster: decisions (right) ── */}
      <g filter="url(#nwGlow)">
        <rect x="1130" y="220" width="80" height="60" rx="12" fill="none" stroke="#22d3ee" strokeWidth="1.6" opacity="0.7" />
        <path d="M1150,250 l8,8 14,-16" fill="none" stroke="#22d3ee" strokeWidth="1.6" opacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g filter="url(#nwGlow)">
        <circle cx="1218" cy="610" r="32" fill="none" stroke="#4a9eff" strokeWidth="1.6" opacity="0.65" />
        <circle cx="1218" cy="610" r="2.5" fill="#4a9eff" className="home-node-pulse" style={{ animationDelay: '-0.6s' }} />
      </g>
      <g filter="url(#nwGlow)">
        <rect x="1300" y="420" width="62" height="62" rx="14" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.6" transform="rotate(45 1331 451)" />
        <circle cx="1331" cy="451" r="2.4" fill="#22d3ee" className="home-node-pulse" style={{ animationDelay: '-2s' }} />
      </g>

      {/* ── lower node: storage ── */}
      <g filter="url(#nwGlow)">
        <ellipse cx="350" cy="742" rx="34" ry="11" fill="none" stroke="#4a9eff" strokeWidth="1.4" opacity="0.6" />
        <path d="M316,742 v26 a34,11 0 0 0 68,0 v-26" fill="none" stroke="#4a9eff" strokeWidth="1.4" opacity="0.6" />
      </g>

      {/* scattered connection dots */}
      {[
        [320, 210], [300, 470], [920, 400], [960, 610], [640, 520], [1330, 250],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.2" fill="#22d3ee" filter="url(#nwGlow)" opacity="0.8" />
      ))}
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Cinematic background: aurora glows + neon workflow + masked grid + grain.
   `bright` lifts the whole surface (used by the internal portal).
   ────────────────────────────────────────────────────────────────────────── */
export function CinematicBackground({ bright = false }: { bright?: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ background: bright ? '#102448' : INK }}
    >
      {bright && (
        <div
          className="absolute inset-x-0 top-0 h-[55vh]"
          style={{ background: 'linear-gradient(to bottom, rgba(96,150,235,0.16), transparent 80%)' }}
        />
      )}
      <div
        className="home-aurora absolute -top-[20%] left-[8%] h-[60vh] w-[55vw] rounded-full"
        style={{
          background: bright
            ? 'radial-gradient(ellipse at center, rgba(46,128,255,0.5), transparent 65%)'
            : 'radial-gradient(ellipse at center, rgba(26,112,247,0.40), transparent 65%)',
        }}
      />
      <div
        className="home-aurora-slow absolute top-[30%] -right-[12%] h-[70vh] w-[50vw] rounded-full"
        style={{
          background: bright
            ? 'radial-gradient(ellipse at center, rgba(34,211,238,0.32), transparent 62%)'
            : 'radial-gradient(ellipse at center, rgba(34,211,238,0.24), transparent 62%)',
        }}
      />
      <div
        className="home-aurora absolute bottom-[-25%] left-[28%] h-[55vh] w-[45vw] rounded-full"
        style={{
          background: bright
            ? 'radial-gradient(ellipse at center, rgba(96,160,255,0.3), transparent 60%)'
            : 'radial-gradient(ellipse at center, rgba(74,158,255,0.22), transparent 60%)',
          animationDelay: '-6s',
        }}
      />
      <NeonWorkflow />
      <div className="home-grid absolute inset-0" />
      <div className="home-noise absolute inset-0 opacity-[0.05]" />
      <div
        className="absolute inset-0"
        style={{
          background: bright
            ? 'radial-gradient(ellipse 120% 90% at 50% 8%, transparent 55%, rgba(10,22,48,0.42) 100%)'
            : 'radial-gradient(ellipse 120% 90% at 50% 8%, transparent 45%, rgba(6,13,31,0.62) 100%)',
        }}
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
