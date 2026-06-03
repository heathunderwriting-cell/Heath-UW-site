'use client';
import React from 'react';
import { useI18n } from '@/components/providers/LanguageProvider';
import { companyCopy } from '@/locales/company-content';

const NAVY = '#02091c';
const NAVY_CARD = '#071223';
const NAVY_LIGHT = '#0a1a2e';
const BLUE = '#4a9eff';
const BLUE_DIM = 'rgba(74,158,255,0.12)';
const BLUE_BORDER = 'rgba(74,158,255,0.25)';
const WHITE = '#f0f4ff';
const MUTED = 'rgba(240,244,255,0.55)';
const GOLD = '#c9a84c';

function AIPill({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      background: 'linear-gradient(135deg,rgba(74,158,255,0.18),rgba(74,158,255,0.06))',
      border: '1px solid rgba(74,158,255,0.45)',
      borderRadius: 20, padding: '5px 14px',
      fontSize: '0.72rem', fontWeight: 700, color: BLUE,
      letterSpacing: '0.08em', textTransform: 'uppercase' as const,
      boxShadow: '0 0 12px rgba(74,158,255,0.18)',
      ...style,
    }}>
      ◈ {children}
    </span>
  );
}

export default function CompanyPage() {
  const { dict, locale } = useI18n();
  const d = dict.pagesV2.company;
  const c = companyCopy[locale as 'en' | 'es' | 'zh'] ?? companyCopy.en;
  const techItems = c.techItems;
  const aiWorkflows = c.aiWorkflows;
  const pipelineSteps = c.pipelineSteps;
  const values = c.values;
  const govItems = c.govItems;
  return (
    <main style={{ background: NAVY, color: WHITE, minHeight: '100vh', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', position: 'relative' }}>

      {/* Background chip + H */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" opacity="0.22">

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
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HERO ── */}
        <section style={{ padding: '100px 48px 80px', maxWidth: 1100, margin: '0 auto', borderBottom: `1px solid ${BLUE_BORDER}` }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, marginBottom: 28 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: `1px solid ${BLUE_BORDER}`, borderRadius: 20,
              padding: '5px 14px', fontSize: '0.75rem', letterSpacing: '0.12em',
              textTransform: 'uppercase' as const, color: BLUE,
            }}>
              <span style={{ width: 6, height: 6, background: BLUE, borderRadius: '50%', display: 'inline-block' }} />
              {c.heroEyebrow}
            </span>
            <AIPill>{c.aiNativeMga}</AIPill>
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
            {d.subtitle}
          </h1>
          <p style={{ fontSize: '1.1rem', color: MUTED, maxWidth: 680, lineHeight: 1.7 }}>
            {d.intro}
          </p>
        </section>

        {/* ── AI-NATIVE BANNER ── */}
        <div style={{
          background: 'linear-gradient(90deg,rgba(74,158,255,0.06),rgba(74,158,255,0.15),rgba(74,158,255,0.06))',
          borderTop: `1px solid rgba(74,158,255,0.18)`,
          borderBottom: `1px solid rgba(74,158,255,0.18)`,
          padding: '18px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, flexWrap: 'wrap' as const,
        }}>
          {c.banner.map(([label, sub]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: MUTED, fontSize: '0.82rem' }}>
              <span style={{ color: BLUE, fontSize: '0.6rem' }}>✦</span>
              <strong style={{ color: BLUE }}>{label}</strong> — {sub}
            </div>
          ))}
        </div>

        {/* ── MISSION & VISION ── */}
        <section style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', borderBottom: `1px solid ${BLUE_BORDER}` }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: BLUE, marginBottom: 12, fontWeight: 600 }}>{c.purposeEyebrow}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {[{ ...c.mission, gold: false }, { ...c.vision, gold: true }].map(({ eyebrow, gold, title, body }) => (
              <div key={eyebrow} style={{
                background: NAVY_CARD, border: `1px solid ${BLUE_BORDER}`, borderRadius: 16, padding: '40px 36px',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: gold ? `linear-gradient(90deg,${GOLD},transparent)` : `linear-gradient(90deg,${BLUE},transparent)` }} />
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: gold ? GOLD : BLUE, marginBottom: 14, fontWeight: 600 }}>{eyebrow}</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 16 }}>{title}</h2>
                <p style={{ color: MUTED, lineHeight: 1.75, fontSize: '0.95rem' }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHO WE ARE ── */}
        <section style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', borderBottom: `1px solid ${BLUE_BORDER}` }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: BLUE, marginBottom: 12, fontWeight: 600 }}>{c.whoEyebrow}</div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, marginBottom: 8 }}>{c.whoTitlePre}<span style={{ color: BLUE }}>{c.whoTitleHighlight}</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'start', marginTop: 40 }}>
            <div>
              {c.whoParagraphs.map((text, i) => <p key={i} style={{ color: MUTED, lineHeight: 1.8, fontSize: '0.95rem', marginBottom: 16 }}>{text}</p>)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 20 }}>
              {c.whoStats.map(([num, label]) => (
                <div key={num} style={{ background: NAVY_CARD, border: `1px solid ${BLUE_BORDER}`, borderRadius: 12, padding: '24px 28px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: BLUE, lineHeight: 1 }}>{num}</div>
                  <div style={{ color: MUTED, fontSize: '0.85rem', marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECHNOLOGY ── */}
        <section style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', borderBottom: `1px solid ${BLUE_BORDER}` }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: BLUE, marginBottom: 12, fontWeight: 600 }}>{c.techEyebrow}</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16, flexWrap: 'wrap' as const }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, margin: 0 }}>
              {c.techTitlePre}<span style={{ color: BLUE }}>{c.techTitleHighlight}</span><br />{c.techTitlePost}
            </h2>
            <AIPill style={{ marginTop: 6 }}>{c.techPillLabel}</AIPill>
          </div>
          <p style={{ color: MUTED, maxWidth: 640, lineHeight: 1.7, marginBottom: 48, fontSize: '0.95rem' }}>
            {c.techIntro}
          </p>

          {/* Tech cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {techItems.map(({ icon, title, desc, tag, highlight }) => (
              <div key={title} style={{
                background: highlight ? 'linear-gradient(135deg,rgba(74,158,255,0.1),#071223)' : NAVY_CARD,
                border: `1px solid ${highlight ? 'rgba(74,158,255,0.5)' : BLUE_BORDER}`,
                borderRadius: 14, padding: '32px 28px',
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: highlight ? 'rgba(74,158,255,0.25)' : BLUE_DIM, border: `1px solid ${BLUE_BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: MUTED, fontSize: '0.85rem', lineHeight: 1.65 }}>{desc}</p>
                <span style={{ display: 'inline-block', marginTop: 14, background: BLUE_DIM, border: `1px solid ${BLUE_BORDER}`, borderRadius: 20, padding: '3px 10px', fontSize: '0.72rem', color: BLUE }}>{tag}</span>
              </div>
            ))}
          </div>

          {/* AI-Native MGA highlight card */}
          <div style={{
            background: 'linear-gradient(135deg,rgba(74,158,255,0.12),rgba(74,158,255,0.04))',
            border: `1.5px solid rgba(74,158,255,0.4)`,
            borderRadius: 16, padding: '40px 36px', marginTop: 48, position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 18, right: 24, fontSize: '0.65rem', letterSpacing: '0.18em', color: 'rgba(74,158,255,0.4)', fontWeight: 800 }}>{c.whyCardLabel}</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>
              {c.whyTitlePre}<span style={{ color: BLUE }}>{c.whyTitleHighlight}</span>{c.whyTitlePost}
            </h3>
            <p style={{ color: MUTED, lineHeight: 1.75, fontSize: '0.92rem', marginBottom: 28 }}>
              {c.whyBody}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {aiWorkflows.map(({ title, desc }) => (
                <div key={title} style={{ background: 'rgba(74,158,255,0.07)', border: `1px solid rgba(74,158,255,0.2)`, borderRadius: 10, padding: '16px 18px' }}>
                  <strong style={{ display: 'block', fontSize: '0.82rem', color: BLUE, marginBottom: 4 }}>{title}</strong>
                  <span style={{ fontSize: '0.78rem', color: MUTED, lineHeight: 1.5 }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline */}
          <div style={{ background: NAVY_CARD, border: `1px solid ${BLUE_BORDER}`, borderRadius: 16, padding: '36px 40px', marginTop: 32 }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' as const, color: BLUE, fontWeight: 700, marginBottom: 28 }}>
              {c.pipelineLabel}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap' as const }}>
              {pipelineSteps.map((step, i) => (
                <div key={i} style={{ flex: 1, minWidth: 100, textAlign: 'center' as const, position: 'relative' }}>
                  {i < pipelineSteps.length - 1 && (
                    <span style={{ position: 'absolute', right: -10, top: '30%', transform: 'translateY(-50%)', color: BLUE, fontSize: '1rem' }}>→</span>
                  )}
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: BLUE_DIM, border: `1.5px solid ${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: BLUE, margin: '0 auto 8px' }}>{i + 1}</div>
                  <div style={{ fontSize: '0.75rem', color: MUTED, lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{step}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', borderBottom: `1px solid ${BLUE_BORDER}` }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: BLUE, marginBottom: 12, fontWeight: 600 }}>{c.valuesEyebrow}</div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, marginBottom: 40 }}>{c.valuesTitlePre}<span style={{ color: BLUE }}>{c.valuesTitleHighlight}</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {values.map(({ num, title, desc, highlight }) => (
              <div key={num} style={{ background: NAVY_CARD, border: `1px solid ${highlight ? 'rgba(74,158,255,0.4)' : BLUE_BORDER}`, borderRadius: 14, padding: '28px 24px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: BLUE, opacity: 0.3, lineHeight: 1, marginBottom: 12 }}>{num}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: MUTED, fontSize: '0.83rem', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── GOVERNANCE ── */}
        <section style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', borderBottom: `1px solid ${BLUE_BORDER}` }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: BLUE, marginBottom: 12, fontWeight: 600 }}>{c.govEyebrow}</div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, marginBottom: 12 }}>{c.govTitlePre}<span style={{ color: BLUE }}>{c.govTitleHighlight}</span>{c.govTitlePost}</h2>
          <p style={{ color: MUTED, maxWidth: 600, marginTop: 12, lineHeight: 1.7, fontSize: '0.95rem', marginBottom: 40 }}>{c.govIntro}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {govItems.map(({ title, items }) => (
              <div key={title} style={{ background: NAVY_CARD, border: `1px solid ${BLUE_BORDER}`, borderRadius: 14, padding: '32px 28px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 14 }}>{title}</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                  {items.map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: MUTED, fontSize: '0.88rem', lineHeight: 1.5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: BLUE, flexShrink: 0, marginTop: 6, display: 'inline-block' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: '80px 48px 100px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            background: `linear-gradient(135deg,${NAVY_CARD},${NAVY_LIGHT})`,
            border: `1px solid ${BLUE_BORDER}`, borderRadius: 20,
            padding: '60px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40,
          }}>
            <div>
              <div style={{ marginBottom: 12 }}><AIPill>{c.aiNativeMga}</AIPill></div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 10 }}>{c.ctaTitlePre}<span style={{ color: BLUE }}>{c.ctaTitleHighlight}</span></h2>
              <p style={{ color: MUTED, maxWidth: 480, lineHeight: 1.65, fontSize: '0.95rem' }}>{c.ctaBody}</p>
            </div>
            <a href="/contact" style={{
              flexShrink: 0, background: BLUE, color: NAVY,
              textDecoration: 'none', borderRadius: 10, padding: '14px 32px',
              fontWeight: 700, fontSize: '0.95rem', whiteSpace: 'nowrap' as const,
              display: 'inline-block',
            }}>{c.ctaButton} →</a>
          </div>
        </section>

      </div>
    </main>
  );
}
