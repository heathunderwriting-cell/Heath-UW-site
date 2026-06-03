'use client';
import React from 'react';
import { useI18n } from '@/components/providers/LanguageProvider';

const NAVY = '#02091c';
const BLUE = '#1a70f7';
const LIGHT_BLUE = '#4a9eff';

function Background() {
  return (
    <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', opacity: 0.22, pointerEvents: 'none', zIndex: 1 }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">

          <defs>
            <filter id="chglow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="chglow2" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="chsglow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          {/* ===== H #1 — LEFT ===== */}
          <line x1="52" y1="80" x2="52" y2="820" stroke="#00d4ff" strokeWidth="5" filter="url(#chglow)"/>
          <line x1="168" y1="80" x2="168" y2="820" stroke="#00d4ff" strokeWidth="5" filter="url(#chglow)"/>
          <line x1="52" y1="450" x2="168" y2="450" stroke="#00d4ff" strokeWidth="4" filter="url(#chglow)"/>
          <circle cx="52" cy="80" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="168" cy="80" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="52" cy="820" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="168" cy="820" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="52" cy="450" r="6" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="168" cy="450" r="6" fill="#00d4ff" filter="url(#chglow2)"/>
          {/* ===== H #2 — CENTER ===== */}
          <line x1="636" y1="100" x2="636" y2="800" stroke="#00d4ff" strokeWidth="4.5" filter="url(#chglow)"/>
          <line x1="748" y1="100" x2="748" y2="800" stroke="#00d4ff" strokeWidth="4.5" filter="url(#chglow)"/>
          <line x1="636" y1="450" x2="748" y2="450" stroke="#00d4ff" strokeWidth="3.5" filter="url(#chglow)"/>
          <circle cx="636" cy="100" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="748" cy="100" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="636" cy="800" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="748" cy="800" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="636" cy="450" r="6" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="748" cy="450" r="6" fill="#00d4ff" filter="url(#chglow2)"/>
          {/* ===== H #3 — RIGHT ===== */}
          <line x1="1300" y1="80" x2="1300" y2="820" stroke="#00d4ff" strokeWidth="5" filter="url(#chglow)"/>
          <line x1="1410" y1="80" x2="1410" y2="820" stroke="#00d4ff" strokeWidth="5" filter="url(#chglow)"/>
          <line x1="1300" y1="450" x2="1410" y2="450" stroke="#00d4ff" strokeWidth="4" filter="url(#chglow)"/>
          <circle cx="1300" cy="80" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="1410" cy="80" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="1300" cy="820" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="1410" cy="820" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="1300" cy="450" r="6" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="1410" cy="450" r="6" fill="#00d4ff" filter="url(#chglow2)"/>
          {/* H traces to chip */}
          <path d="M168,380 L380,380 L380,430 L730,430" fill="none" stroke="#4a9eff" strokeWidth="1" opacity="0.5"/>
          <path d="M168,520 L350,520 L350,500 L730,500" fill="none" stroke="#4a9eff" strokeWidth="1" opacity="0.4"/>
          <circle cx="380" cy="380" r="3.5" fill="#4a9eff" filter="url(#chsglow)"/>
          <circle cx="350" cy="520" r="3" fill="#4a9eff" filter="url(#chsglow)"/>
          {/* MAIN CHIP */}
          <rect x="790" y="295" width="360" height="250" rx="6" fill="none" stroke="#00d4ff" strokeWidth="2.5" filter="url(#chglow)"/>
          <rect x="808" y="313" width="324" height="214" rx="4" fill="none" stroke="#4a9eff" strokeWidth="1" opacity="0.45"/>
          <rect x="836" y="338" width="268" height="164" rx="3" fill="none" stroke="#4a9eff" strokeWidth="0.7" opacity="0.2"/>
          <line x1="836" y1="390" x2="1104" y2="390" stroke="#4a9eff" strokeWidth="0.5" opacity="0.2"/>
          <line x1="836" y1="440" x2="1104" y2="440" stroke="#4a9eff" strokeWidth="0.5" opacity="0.2"/>
          <line x1="920" y1="338" x2="920" y2="502" stroke="#4a9eff" strokeWidth="0.5" opacity="0.2"/>
          <line x1="1020" y1="338" x2="1020" y2="502" stroke="#4a9eff" strokeWidth="0.5" opacity="0.2"/>
          <rect x="812" y="317" width="14" height="14" fill="none" stroke="#00d4ff" strokeWidth="1.5" filter="url(#chsglow)"/>
          <rect x="1114" y="317" width="14" height="14" fill="none" stroke="#00d4ff" strokeWidth="1.5" filter="url(#chsglow)"/>
          <rect x="812" y="509" width="14" height="14" fill="none" stroke="#00d4ff" strokeWidth="1.5" filter="url(#chsglow)"/>
          <rect x="1114" y="509" width="14" height="14" fill="none" stroke="#00d4ff" strokeWidth="1.5" filter="url(#chsglow)"/>
          <circle cx="970" cy="420" r="18" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.25" filter="url(#chglow2)"/>
          <circle cx="970" cy="420" r="9" fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity="0.5" filter="url(#chglow)"/>
          <circle cx="970" cy="420" r="3" fill="#00d4ff" filter="url(#chglow2)"/>
          {/* TOP PINS */}
          <line x1="826" y1="295" x2="826" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="818" y1="240" x2="834" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="862" y1="295" x2="862" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="854" y1="240" x2="870" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="898" y1="295" x2="898" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="890" y1="240" x2="906" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="934" y1="295" x2="934" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="926" y1="240" x2="942" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="970" y1="295" x2="970" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="962" y1="240" x2="978" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1006" y1="295" x2="1006" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="998" y1="240" x2="1014" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1042" y1="295" x2="1042" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="1034" y1="240" x2="1050" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1078" y1="295" x2="1078" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="1070" y1="240" x2="1086" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1114" y1="295" x2="1114" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="1106" y1="240" x2="1122" y2="240" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          {/* BOTTOM PINS */}
          <line x1="826" y1="545" x2="826" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="818" y1="600" x2="834" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="862" y1="545" x2="862" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="854" y1="600" x2="870" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="898" y1="545" x2="898" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="890" y1="600" x2="906" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="934" y1="545" x2="934" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="926" y1="600" x2="942" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="970" y1="545" x2="970" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="962" y1="600" x2="978" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1006" y1="545" x2="1006" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="998" y1="600" x2="1014" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1042" y1="545" x2="1042" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="1034" y1="600" x2="1050" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1078" y1="545" x2="1078" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="1070" y1="600" x2="1086" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1114" y1="545" x2="1114" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="1106" y1="600" x2="1122" y2="600" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          {/* LEFT PINS */}
          <line x1="790" y1="325" x2="730" y2="325" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="730" y1="317" x2="730" y2="333" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="790" y1="360" x2="730" y2="360" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="730" y1="352" x2="730" y2="368" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="790" y1="395" x2="730" y2="395" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="730" y1="387" x2="730" y2="403" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="790" y1="430" x2="730" y2="430" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="730" y1="422" x2="730" y2="438" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="790" y1="465" x2="730" y2="465" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="730" y1="457" x2="730" y2="473" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="790" y1="500" x2="730" y2="500" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="730" y1="492" x2="730" y2="508" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="790" y1="535" x2="730" y2="535" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="730" y1="527" x2="730" y2="543" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          {/* RIGHT PINS */}
          <line x1="1150" y1="325" x2="1210" y2="325" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="1210" y1="317" x2="1210" y2="333" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1150" y1="360" x2="1210" y2="360" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="1210" y1="352" x2="1210" y2="368" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1150" y1="395" x2="1210" y2="395" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="1210" y1="387" x2="1210" y2="403" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1150" y1="430" x2="1210" y2="430" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="1210" y1="422" x2="1210" y2="438" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1150" y1="465" x2="1210" y2="465" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="1210" y1="457" x2="1210" y2="473" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1150" y1="500" x2="1210" y2="500" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="1210" y1="492" x2="1210" y2="508" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1150" y1="535" x2="1210" y2="535" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/><line x1="1210" y1="527" x2="1210" y2="543" stroke="#00d4ff" strokeWidth="2" filter="url(#chsglow)"/>
          {/* CIRCUIT TRACES */}
          <path d="M826,240 L826,165 L680,165 L680,60" fill="none" stroke="#00d4ff" strokeWidth="1.2" opacity="0.5"/>
          <path d="M1042,240 L1042,185 L1220,185 L1220,110" fill="none" stroke="#4a9eff" strokeWidth="1.2" opacity="0.5"/>
          <path d="M862,600 L862,670 L700,670 L700,780" fill="none" stroke="#00d4ff" strokeWidth="1.2" opacity="0.5"/>
          <path d="M1078,600 L1078,710 L1280,710 L1280,850" fill="none" stroke="#4a9eff" strokeWidth="1" opacity="0.4"/>
          <path d="M730,360 L600,360 L600,240 L460,240" fill="none" stroke="#00d4ff" strokeWidth="1.2" opacity="0.5"/>
          <path d="M730,500 L560,500 L560,640 L420,640" fill="none" stroke="#4a9eff" strokeWidth="1" opacity="0.4"/>
          <path d="M1210,325 L1270,325 L1270,200" fill="none" stroke="#00d4ff" strokeWidth="1.2" opacity="0.5"/>
          <path d="M1210,465 L1260,465 L1260,600" fill="none" stroke="#4a9eff" strokeWidth="1" opacity="0.4"/>
          <circle cx="680" cy="165" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="1220" cy="185" r="5" fill="#4a9eff" filter="url(#chglow2)"/>
          <circle cx="700" cy="670" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="600" cy="360" r="5" fill="#00d4ff" filter="url(#chglow2)"/>
          <circle cx="560" cy="500" r="4" fill="#4a9eff" filter="url(#chsglow)"/>
          <circle cx="1270" cy="325" r="4" fill="#00d4ff" filter="url(#chsglow)"/>
          {/* SECONDARY CHIP */}
          <rect x="250" y="190" width="210" height="148" rx="5" fill="none" stroke="#4a9eff" strokeWidth="1.8" filter="url(#chsglow)" opacity="0.8"/>
          <rect x="266" y="206" width="178" height="116" rx="3" fill="none" stroke="#4a9eff" strokeWidth="0.8" opacity="0.3"/>
          <circle cx="355" cy="264" r="7" fill="none" stroke="#4a9eff" strokeWidth="1" opacity="0.4"/>
          <circle cx="355" cy="264" r="2.5" fill="#4a9eff" filter="url(#chglow)" opacity="0.8"/>
          <rect x="270" y="210" width="10" height="10" fill="none" stroke="#4a9eff" strokeWidth="1" opacity="0.7"/>
          <rect x="450" y="210" width="10" height="10" fill="none" stroke="#4a9eff" strokeWidth="1" opacity="0.7"/>
          <rect x="270" y="318" width="10" height="10" fill="none" stroke="#4a9eff" strokeWidth="1" opacity="0.7"/>
          <rect x="450" y="318" width="10" height="10" fill="none" stroke="#4a9eff" strokeWidth="1" opacity="0.7"/>
          <line x1="290" y1="190" x2="290" y2="156" stroke="#4a9eff" strokeWidth="1.5" filter="url(#chsglow)" opacity="0.7"/><line x1="283" y1="156" x2="297" y2="156" stroke="#4a9eff" strokeWidth="1.5" opacity="0.7"/>
          <line x1="340" y1="190" x2="340" y2="156" stroke="#4a9eff" strokeWidth="1.5" filter="url(#chsglow)" opacity="0.7"/><line x1="333" y1="156" x2="347" y2="156" stroke="#4a9eff" strokeWidth="1.5" opacity="0.7"/>
          <line x1="390" y1="190" x2="390" y2="156" stroke="#4a9eff" strokeWidth="1.5" filter="url(#chsglow)" opacity="0.7"/><line x1="383" y1="156" x2="397" y2="156" stroke="#4a9eff" strokeWidth="1.5" opacity="0.7"/>
          <line x1="440" y1="190" x2="440" y2="156" stroke="#4a9eff" strokeWidth="1.5" filter="url(#chsglow)" opacity="0.7"/><line x1="433" y1="156" x2="447" y2="156" stroke="#4a9eff" strokeWidth="1.5" opacity="0.7"/>
          <line x1="290" y1="338" x2="290" y2="372" stroke="#4a9eff" strokeWidth="1.5" filter="url(#chsglow)" opacity="0.65"/><line x1="283" y1="372" x2="297" y2="372" stroke="#4a9eff" strokeWidth="1.5" opacity="0.65"/>
          <line x1="390" y1="338" x2="390" y2="372" stroke="#4a9eff" strokeWidth="1.5" filter="url(#chsglow)" opacity="0.65"/><line x1="383" y1="372" x2="397" y2="372" stroke="#4a9eff" strokeWidth="1.5" opacity="0.65"/>
          <line x1="250" y1="225" x2="218" y2="225" stroke="#4a9eff" strokeWidth="1.5" filter="url(#chsglow)" opacity="0.65"/><line x1="218" y1="218" x2="218" y2="232" stroke="#4a9eff" strokeWidth="1.5" opacity="0.65"/>
          <line x1="250" y1="264" x2="218" y2="264" stroke="#4a9eff" strokeWidth="1.5" filter="url(#chsglow)" opacity="0.65"/><line x1="218" y1="257" x2="218" y2="271" stroke="#4a9eff" strokeWidth="1.5" opacity="0.65"/>
          <line x1="250" y1="303" x2="218" y2="303" stroke="#4a9eff" strokeWidth="1.5" filter="url(#chsglow)" opacity="0.65"/><line x1="218" y1="296" x2="218" y2="310" stroke="#4a9eff" strokeWidth="1.5" opacity="0.65"/>
          <line x1="460" y1="225" x2="492" y2="225" stroke="#4a9eff" strokeWidth="1.5" filter="url(#chsglow)" opacity="0.65"/><line x1="492" y1="218" x2="492" y2="232" stroke="#4a9eff" strokeWidth="1.5" opacity="0.65"/>
          <line x1="460" y1="264" x2="492" y2="264" stroke="#4a9eff" strokeWidth="1.5" filter="url(#chsglow)" opacity="0.65"/><line x1="492" y1="257" x2="492" y2="271" stroke="#4a9eff" strokeWidth="1.5" opacity="0.65"/>
          <path d="M492,264 L600,264 L600,360 L730,360" fill="none" stroke="#4a9eff" strokeWidth="1" opacity="0.35"/>
          <circle cx="492" cy="264" r="3" fill="#4a9eff" filter="url(#chsglow)" opacity="0.7"/>
          <circle cx="600" cy="264" r="3" fill="#4a9eff" filter="url(#chsglow)" opacity="0.5"/>
          </svg>
  );
}

export default function HomeClient() {
  const { dict } = useI18n();
  const d = dict.home;

  const credibilityItems: { text: string; ai: boolean }[] = [
    ...(d.credibility.items as readonly string[]).map((text) => ({ text, ai: false })),
    { text: d.model.pillars[3].body, ai: true },
  ];

  return (
    <div style={{ background: NAVY, color: '#f0f4ff', minHeight: '100vh', fontFamily: 'Inter, system-ui, -apple-system, sans-serif', position: 'relative' }}>
      <Background />

      {/* Ã¢ÂÂÃ¢ÂÂ HERO Ã¢ÂÂÃ¢ÂÂ */}
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

        {/* Right Ã¢ÂÂ Underwriting Desk card */}
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

      {/* Ã¢ÂÂÃ¢ÂÂ PILLS Ã¢ÂÂÃ¢ÂÂ */}
      <section style={{ position: 'relative', zIndex: 5, display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', padding: '0 40px 44px' }}>
        {(d.quickTags as readonly string[]).map((pill) => (
          <div key={pill} style={{ border: '1px solid rgba(74,158,255,0.2)', borderRadius: '4px', padding: '6px 18px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: 'rgba(240,244,255,0.38)' }}>
            {pill}
          </div>
        ))}
      </section>

      {/* Ã¢ÂÂÃ¢ÂÂ WHO WE ARE Ã¢ÂÂÃ¢ÂÂ */}
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

      {/* Ã¢ÂÂÃ¢ÂÂ THE HEATH MODEL Ã¢ÂÂÃ¢ÂÂ */}
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

      {/* Ã¢ÂÂÃ¢ÂÂ THE HEATH EDGE Ã¢ÂÂÃ¢ÂÂ */}
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

      {/* Ã¢ÂÂÃ¢ÂÂ CTA Ã¢ÂÂÃ¢ÂÂ */}
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

      {/* Ã¢ÂÂÃ¢ÂÂ FOOTER Ã¢ÂÂÃ¢ÂÂ */}
      <footer style={{ position: 'relative', zIndex: 5, borderTop: '1px solid rgba(74,158,255,0.12)', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ color: 'rgba(240,244,255,0.3)', fontSize: '12px' }}>{dict.footer.copyright}</span>
        <span style={{ color: 'rgba(240,244,255,0.3)', fontSize: '12px' }}>heathuw.com</span>
      </footer>
    </div>
  );
}
