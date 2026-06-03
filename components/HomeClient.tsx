'use client';
import React from 'react';
import { useI18n } from '@/components/providers/LanguageProvider';

const NAVY = '#02091c';
const BLUE = '#1a70f7';
const LIGHT_BLUE = '#4a9eff';

function Background() {
  return (
    <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', opacity: 0.12, pointerEvents: 'none', zIndex: 1 }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stemG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#4a9eff"/>
          <stop offset="1" stopColor="#1a70f7"/>
        </linearGradient>
      </defs>
      {/* H-letter structure */}
      <line x1="140" y1="80" x2="140" y2="820" stroke="url(#stemG)" strokeWidth="3"/>
      <line x1="260" y1="80" x2="260" y2="820" stroke="url(#stemG)" strokeWidth="3"/>
      <line x1="140" y1="450" x2="260" y2="450" stroke="url(#stemG)" strokeWidth="2"/>
      {/* node cluster */}
      <line x1="1000" y1="220" x2="1150" y2="350" stroke="#4a9eff" strokeWidth="1.5"/>
      <line x1="1000" y1="220" x2="900" y2="370" stroke="#4a9eff" strokeWidth="1.5"/>
      <line x1="1000" y1="220" x2="1100" y2="180" stroke="#4a9eff" strokeWidth="1.5"/>
      <line x1="1000" y1="220" x2="1050" y2="400" stroke="#4a9eff" strokeWidth="1.5"/>
      <line x1="1000" y1="220" x2="850" y2="200" stroke="#4a9eff" strokeWidth="1.5"/>
      <circle cx="1000" cy="220" r="7" fill="#4a9eff"/>
      <circle cx="1150" cy="350" r="4" fill="#4a9eff"/>
      <circle cx="900" cy="370" r="4" fill="#4a9eff"/>
      <circle cx="1100" cy="180" r="4" fill="#4a9eff"/>
      <circle cx="1050" cy="400" r="4" fill="#4a9eff"/>
      <circle cx="850" cy="200" r="4" fill="#4a9eff"/>
    </svg>
  );
}

expport default function HomeClient() {
  const { dict } = useI18n();
  const d = dict.home;

  const credibilityItems: { text: string; ai: boolean }[] = [
    ...(d.credibility.items as readonly string[]).map((text) => ({ text, ai: false })),
    { text: d.model.pillars[3].body, ai: true },
  ];

  return (
    <div style={{ background: NAVY, color: '#f0f4ff', minHeight: '100vh', fontFamily: 'Inter, system-ui, -apple-system, sans-serif', position: 'relative' }}>
      <Background />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', zIndex: 5, maxWidth: '1160px', margin: '0 auto', padding: '72px 40px 72px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '56px', alignItems: 'center' }}>
        {/* Left */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(74,158,255,0.1)', border: '1px solid rgba(74,158,255,0.38)', borderRadius: '20px', padding: '5px 16px', marginBottom: '28px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: LIGHT_BLUE }} />
            <span style={{ color: '#7ab8f5', fontSize: '11px', fontWeight: 700, letterSpacing: '2px' }}>AI-NATIVE MGA</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 50px)', fontWeight: 800, lineHeight: 1.10, letterSpacing: '-1.2px', marginBottom: '20px', color: '#f0f4ff' }}>
            {d.hero.title}
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.65, color: 'rgba(240,244,255,0.6)', marginBottom: '36px' }}>
            {d.hero.subtitle}
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a href="#contact" style={{ background: BLUE, color: 'white', padding: '13px 30px', borderRadius: '5px', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>
              {d.hero.primaryCta}
            </a>
            <a href="#model" style={{ background: 'transparent', color: '#f0f4ff', border: '1px solid rgba(240,244,255,0.2)', padding: '13px 30px', borderRadius: '5px', fontWeight: 500, fontSize: '14px', textDecoration: 'none' }}>
              {d.hero.secondaryCta}
            </a>
          </div>
        </div>

        {/* Right – Underwriting Desk card */}
        <div style={{ background: 'rgba(5,14,32,0.92)', border: '1px solid rgba(74,158,255,0.22)', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.35)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 26px', borderBottom: '1px solid rgba(74,158,255,0.15)' }}>
            <span style={{ color: 'rgba(240,244,255,0.55)', fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px' }}>UNDERWRITING DESK</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#10b981', fontWeight: 600 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              Live
            </span>
          </div>
          {credibilityItems.map((item, i) => (
            <div key={i} style={{ padding: '18px 26px', borderBottom: i < credibilityItems.length - 1 ? '1px solid rgba(74,158,255,0.12)' : 'none', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              {item.ai ? (
                <span style={{ flexShrink: 0, background: 'rgba(74,158,255,0.15)', border: '1px solid rgba(74,158,255,0.4)', borderRadius: '3px', padding: '2px 7px', fontSize: '9px', fontWeight: 700, color: '#7ab8f5', letterSpacing: '0.8px', marginTop: '3pc' }}>AI</span>
              ) : (
                <span style={{ flexShrink: 0, width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(74,158,255,0.45)', marginTop: '8px' }} />
              )}
              <span style={{ fontSize: '14px', color: 'rgba(240,244,255,0.72)', lineHeight: 1.6 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PILLS ── */}
      <section style={{ position: 'relative', zIndex: 5, display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', padding: '0 40px 44px' }}>
        {(d.quickTags as readonly string[]).map((pill) => (
          <div key={pill} style={{ border: '1px solid rgba(74,158,255,0.2)', borderRadius: '4px', padding: '6px 18px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: 'rgba(240,244,255,0.38)' }}>
            {pill}
          </div>
        ))}
      </section>

      {/* ── WHO WE ARE ── */}
      <section id="about" style={{ position: 'relative', zIndex: 5, maxWidth: '1160px', margin: '0 auto', padding: '80px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        <div>
          <div style={{ color: 'rgba(240,244,255,0.4)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', marginBottom: '16px' }}>ABOUT</div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, letterSpacing: '-0.8px', lineHeight: 1.2, marginBottom: '36px', color: '#f0f4ff' }}>
            {d.whoWeAre.title}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontSize: '64px', fontWeight: 900, letterSpacing: '-3px', lineHeight: 1, fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              <span style={{ color: '#f0f4ff' }}>HEA</span><span style={{ color: LIGHT_BLUE }}>TH</span>
            </div>
            <div style={{ width: '5px', height: '64px', background: LIGHT_BLUE, borderRadius: '3px', opacity: 0.7, marginLeft: '4px' }} />
          </div>
        </div>
        <div>
          <p style={{ color: 'rgba(240,244,255,0.7)', lineHeight: 1.75, fontSize: '16px', marginBottom: '0' }}>{d.whoWeAre.body}</p>
        </div>
      </section>

      {/* ── THE HEATH MODEL ── */}
      <section id="model" style={{ position: 'relative', zIndex: 5, background: 'rgba(8,18,36,0.6)', borderTop: '1px solid rgba(74,158,255,0.12)', borderBottom: '1px solid rgba(74,158,255,0.12)', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ color: 'rgba(240,244,255,0.4)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', marginBottom: '12px' }}>FRAMEWORK</div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, letterSpacing: '-0.8px', color: '#f0f4ff', marginBottom: '48px' }}>
            {d.model.title}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {(d.model.pillars as readonly { title: string; body: string }[]).map((pillar, idx) => (
              <div key={pillar.title} style={{ background: 'rgba(8,18,36,0.8)', border: '1px solid rgba(74,158,255,0.18)', borderRadius: '10px', padding: '28px 24px', borderTop: `3px solid ${BLUE}` }}>
                <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '10px', color: '#f0f4ff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {pillar.title}
                  {idx === 3 && (
                    <span style={{ background: 'rgba(74,158,255,0.15)', border: '1px solid rgba(74,158,255,0.4)', borderRadius: '3px', padding: '2px 7px', fontSize: '9px', fontWeight: 700, color: '#7ab8f5', letterSpacing: '1px' }}>AI</span>
                  )}
                </h3>
                <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '13px', lineHeight: 1.65 }}>{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE HEATH EDGE ── */}
      <section id="edge" style={{ position: 'relative', zIndex: 5, maxWidth: '1160px', margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ color: 'rgba(240,244,255,0.4)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', marginBottom: '12px' }}>DIFFERENTIATION</div>
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, letterSpacing: '-0.8px', color: '#f0f4ff', marginBottom: '48px' }}>
          {d.edge.title}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {(d.edge.items as readonly { title: string; body: string }[]).map((item) => (
            <div key={item.title} style={{ background: 'rgba(8,18,36,0.5)', border: '1px solid rgba(74,158,255,0.15)', borderRadius: '10px', padding: '28px 24px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '10px', color: '#f0f4ff' }}>{item.title}</h3>
              <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '13px', lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" style={{ position: 'relative', zIndex: 5, background: 'rgba(8,18,36,0.7)', borderTop: '1px solid rgba(74,158,255,0.12)', padding: '100px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ color: 'rgba(240,244,255,0.4)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', marginBottom: '24px' }}>CAPACITY PROVIDERS</div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.18, color: '#f0f4ff', marginBottom: '24px' }}>
            {d.finalCta.title}
          </h2>
          <p style={{ color: 'rgba(240,244,255,0.55)', fontSize: '17px', lineHeight: 1.7, marginBottom: '40px' }}>
            {d.finalCta.body}
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:info@heathuw.com" style={{ display: 'inline-block', background: BLUE, color: 'white', padding: '16px 40px', borderRadius: '5px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>
              {d.finalCta.primary}
            </a>
            <a href="#about" style={{ display: 'inline-block', background: 'transparent', color: '#f0f4ff', border: '1px solid rgba(240,244,255,0.2)', padding: '16px 40px', borderRadius: '5px', fontWeight: 500, fontSize: '15px', textDecoration: 'none' }}>
              {d.finalCta.secondary}
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', zIndex: 5, borderTop: '1px solid rgba(74,158,255,0.12)', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ color: 'rgba(240,244,255,0.3)', fontSize: '12px' }}>{dict.footer.copyright}</span>
        <span style={{ color: 'rgba(240,244,255,0.3)', fontSize: '12px' }}>heathuw.com</span>
      </footer>
    </div>
  );
}
