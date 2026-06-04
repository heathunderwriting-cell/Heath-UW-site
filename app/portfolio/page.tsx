'use client';

import { useState } from 'react';
import { useI18n } from '@/components/providers/LanguageProvider';
import { portfolioCopy, type LineContent } from '@/locales/portfolio-lines';

const NAVY = '#0d2440';
const LIGHT = '#4a9eff';
const DARK = 'rgba(2,9,28,0.6)';

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

function LineCard({ line, copy }: { line: SpecialtyLine; copy: (typeof portfolioCopy)['en'] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position:'relative', overflow:'hidden', borderRadius:16, border:`1px solid ${open?'rgba(74,158,255,0.5)':'rgba(74,158,255,0.18)'}`, transition:'border-color 0.3s ease, box-shadow 0.3s ease', boxShadow: open ? '0 0 0 1px rgba(74,158,255,0.2), 0 24px 60px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.25)' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`url(${line.image})`, backgroundSize:'cover', backgroundPosition:line.imagePosition, zIndex:0 }} />
      <div style={{ position:'absolute', inset:0, background: open ? 'linear-gradient(135deg,rgba(29,77,128,0.97) 0%,rgba(29,77,128,0.93) 100%)' : 'linear-gradient(105deg,rgba(29,77,128,0.94) 0%,rgba(29,77,128,0.80) 55%,rgba(29,77,128,0.70) 100%)', transition:'background 0.4s ease', zIndex:1 }} />
      <div style={{ position:'relative', zIndex:2, padding:'36px 40px' }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:20 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.14em', color:LIGHT, marginBottom:8 }}>{line.label}</div>
            <h3 style={{ fontSize:28, fontWeight:800, color:'#ffffff', margin:0, lineHeight:1.15, textShadow:'0 2px 12px rgba(0,0,0,0.5)' }}>{line.headline}</h3>
          </div>
          <div style={{ flexShrink:0, padding:'6px 14px', borderRadius:20, background:'rgba(74,158,255,0.12)', border:'1px solid rgba(74,158,255,0.35)', fontSize:11, fontWeight:600, color:LIGHT, letterSpacing:'0.05em', whiteSpace:'nowrap', backdropFilter:'blur(8px)' }}>{line.capacityType}</div>
        </div>
        <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', marginTop:18, lineHeight:1.7, maxWidth:680 }}>{line.summary}</p>
        <button onClick={() => setOpen(!open)} style={{ marginTop:22, display:'inline-flex', alignItems:'center', gap:8, padding:'9px 20px', borderRadius:8, background: open?'rgba(74,158,255,0.2)':'rgba(74,158,255,0.1)', border:'1px solid rgba(74,158,255,0.4)', color:LIGHT, fontSize:12, fontWeight:700, cursor:'pointer', letterSpacing:'0.08em', backdropFilter:'blur(8px)', transition:'background 0.2s' }}>
          {open ? copy.collapse : copy.viewDetail}
          <span style={{ display:'inline-block', transition:'transform 0.3s', transform: open?'rotate(180deg)':'rotate(0deg)' }}>↓</span>
        </button>
        {open && (
          <div style={{ marginTop:32, paddingTop:32, borderTop:'1px solid rgba(74,158,255,0.18)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:40 }}>
            <div>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:10 }}>{copy.theRisk}</p>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.72)', lineHeight:1.75, marginBottom:28 }}>{line.riskDescription}</p>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:12 }}>{copy.coverageScope}</p>
              <ul style={{ margin:0, padding:0, listStyle:'none' }}>
                {line.coverScope.map((item, i) => (
                  <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:9, fontSize:14, color:'rgba(255,255,255,0.65)', lineHeight:1.55 }}>
                    <span style={{ color:LIGHT, marginTop:4, flexShrink:0, fontSize:10 }}>●</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:12 }}>{copy.structuresLabel}</p>
              <ul style={{ margin:0, padding:0, listStyle:'none', marginBottom:28 }}>
                {line.structures.map((item, i) => (
                  <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:9, fontSize:14, color:'rgba(255,255,255,0.65)', lineHeight:1.55 }}>
                    <span style={{ color:LIGHT, flexShrink:0, fontWeight:700, marginTop:1 }}>—</span>{item}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:10 }}>{copy.targetMarkets}</p>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.72)', lineHeight:1.75 }}>{line.markets}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const { dict, locale } = useI18n();
  const d = dict.pagesV2.portfolio;
  const copy = portfolioCopy[locale as 'en' | 'es' | 'zh'] ?? portfolioCopy.en;
  const lines: SpecialtyLine[] = copy.lines.map((line, i) => ({ ...line, ...LINE_META[i] }));

  return (
    <main style={{ minHeight:'100vh', background:NAVY, fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", color:'#ffffff' }}>
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

      {/* Header section */}
      <section style={{ padding:'96px 40px 64px', maxWidth:1160, margin:'0 auto' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:20, border:'1px solid rgba(74,158,255,0.35)', background:'rgba(74,158,255,0.08)', fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:LIGHT, marginBottom:28 }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:LIGHT, boxShadow:`0 0 8px ${LIGHT}` }} />
          {copy.eyebrow}
        </div>
        <h1 style={{ fontSize:'clamp(36px,5vw,58px)', fontWeight:800, lineHeight:1.1, maxWidth:700, margin:'0 0 24px' }}>
          {d.subtitle}
        </h1>
        <p style={{ fontSize:18, color:'rgba(255,255,255,0.6)', maxWidth:600, lineHeight:1.7, margin:0 }}>
          {d.intro}
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginTop:40 }}>
          {lines.map(l => (
            <div key={l.id} style={{ padding:'7px 16px', borderRadius:6, border:'1px solid rgba(74,158,255,0.2)', background:'rgba(74,158,255,0.06)', fontSize:11, fontWeight:700, letterSpacing:'0.1em', color:'rgba(255,255,255,0.5)' }}>{l.label}</div>
          ))}
        </div>
      </section>

      {/* Line cards */}
      <section style={{ padding:'0 40px 96px', maxWidth:1160, margin:'0 auto', display:'flex', flexDirection:'column', gap:20 }}>
        {lines.map(line => <LineCard key={line.id} line={line} copy={copy} />)}
      </section>

      {/* CTA */}
      <section style={{ background:DARK, borderTop:'1px solid rgba(74,158,255,0.1)', borderBottom:'1px solid rgba(74,158,255,0.1)', padding:'80px 40px' }}>
        <div style={{ maxWidth:1160, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' }}>
          <div>
            <h2 style={{ fontSize:'clamp(26px,3.5vw,40px)', fontWeight:800, margin:'0 0 14px', lineHeight:1.2, maxWidth:560 }}>
              {copy.ctaTitlePre}<span style={{ color:LIGHT }}>{copy.ctaTitleHighlight}</span>
            </h2>
            <p style={{ fontSize:16, color:'rgba(255,255,255,0.55)', maxWidth:500, lineHeight:1.65, margin:0 }}>
              {copy.ctaText}
            </p>
          </div>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <button style={{ padding:'14px 30px', borderRadius:8, background:LIGHT, border:'none', color:'#ffffff', fontSize:15, fontWeight:700, cursor:'pointer' }}>{copy.ctaSubmit}</button>
            <button style={{ padding:'14px 30px', borderRadius:8, background:'rgba(74,158,255,0.12)', border:'1px solid rgba(74,158,255,0.45)', color:LIGHT, fontSize:15, fontWeight:700, cursor:'pointer' }}>{copy.ctaExplore}</button>
          </div>
        </div>
      </section>
    </main>
  );
}
