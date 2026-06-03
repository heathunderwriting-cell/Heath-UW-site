'use client';

import { useState } from 'react';
import { useI18n } from '@/components/providers/LanguageProvider';

const NAVY = '#02091c';
const LIGHT = '#4a9eff';
const DARK = 'rgba(2,9,28,0.6)';

interface SpecialtyLine {
  id: string;
  label: string;
  headline: string;
  summary: string;
  capacityType: string;
  riskDescription: string;
  coverScope: string[];
  structures: string[];
  markets: string;
  image: string;
  imagePosition: string;
}

const LINES: SpecialtyLine[] = [
  {
    id: 'st',
    label: 'SABOTAGE & TERRORISM',
    headline: 'Sabotage & Terrorism',
    summary: 'Facultative reinsurance capacity for deliberate acts of sabotage and terrorism â covering physical damage and business interruption on a risk-by-risk basis.',
    capacityType: 'Facultative Reinsurance',
    riskDescription: 'Sabotage & Terrorism (S&T) covers losses arising from deliberate acts intended to damage, destroy, or disrupt insured property and operations. This includes physical damage to buildings, machinery, and infrastructure, as well as business interruption resulting from an insured event. S&T exposure is typically excluded from standard property policies and requires standalone or wrap-around coverage structures negotiated on a per-risk basis.',
    coverScope: [
      'Physical damage to commercial, industrial, and infrastructure assets',
      'Business interruption and loss of income following an insured event',
      'Denial of access and threat-related business disruption',
      'Political violence including riots, strikes, and civil commotion (RSCC) where applicable',
      'Contingent business interruption for supply chain exposure',
    ],
    structures: [
      'Excess of Loss (per risk, per occurrence)',
      'Proportional / Pro-Rata (quota share and surplus)',
      'Stand-alone S&T facultative placement',
      'S&T wrap on top of existing property programs',
    ],
    markets: 'Global. Particular focus on high-risk and emerging markets where S&T exposure is material â Middle East, Latin America, South and Southeast Asia, and strategic infrastructure assets worldwide.',
    image: 'https://images.unsplash.com/photo-1591588211599-04eeffe9acc7?w=1400&auto=format&fit=crop&q=80',
    imagePosition: 'center 40%',
  },
  {
    id: 'property',
    label: 'PROPERTY',
    headline: 'Property',
    summary: 'Reinsurance capacity for commercial and industrial property risks â covering physical damage and business interruption across a broad range of occupancies and perils.',
    capacityType: 'Facultative & Treaty Reinsurance',
    riskDescription: 'Property reinsurance covers physical damage to buildings, contents, and business assets, plus the financial consequences of interruption to operations. Heath underwrites property reinsurance for cedants with large or complex risks that require bespoke facultative support, as well as treaty programs across commercial and industrial portfolios.',
    coverScope: [
      'Material damage (MD) â buildings, plant, machinery, stock, and contents',
      'Business interruption (BI) and extra expense',
      'Natural catastrophe perils: wind, flood, earthquake, hail',
      'Fire, explosion, machinery breakdown, and electronic equipment',
      'Construction and engineering (CAR/EAR) for large-scale projects',
      'Large industrial and manufacturing risks including energy and power generation',
    ],
    structures: [
      'Facultative excess of loss and proportional',
      'Per-risk and per-occurrence excess of loss treaties',
      'Quota share and surplus treaties',
      'Aggregate stop-loss for portfolio protection',
    ],
    markets: 'Global. Strong focus on cedants in Latin America, the Caribbean, and Southern Europe seeking bespoke capacity for large or complex property risks.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&auto=format&fit=crop&q=80',
    imagePosition: 'center 55%',
  },
  {
    id: 'financial',
    label: 'FINANCIAL LINES',
    headline: 'Financial Lines',
    summary: 'Reinsurance capacity for directors & officers liability, professional indemnity, cyber, and crime â supporting cedants underwriting complex management and financial risk.',
    capacityType: 'Facultative & Treaty Reinsurance',
    riskDescription: 'Financial Lines reinsurance covers liability exposures arising from management decisions, professional services, and financial crime. As regulatory scrutiny intensifies and cyber incidents multiply, cedants face growing frequency and severity in their financial lines portfolios. Heath provides reinsurance capacity to support these evolving risks with disciplined underwriting and data-driven pricing.',
    coverScope: [
      'Directors & Officers (D&O) â corporate, institutional, and Side A coverage',
      'Errors & Omissions / Professional Indemnity (E&O / PI)',
      'Cyber liability: first-party and third-party (incident response, data breach, ransomware)',
      'Commercial crime and financial institution bonds (FIB)',
      'Employed lawyers and technology professional liability',
      'Employment practices liability (EPL)',
    ],
    structures: [
      'Facultative excess of loss for large or complex placements',
      'Per-claim and per-occurrence excess of loss treaties',
      'Aggregate excess of loss for cyber portfolios',
      'Quota share treaties for growing cedant portfolios',
    ],
    markets: 'Global with particular expertise in North America, the UK, and Continental Europe. Active capacity for Latin American and emerging-market cedants seeking professional liability and cyber reinsurance support.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&auto=format&fit=crop&q=80',
    imagePosition: 'center 60%',
  },
  {
    id: 'marine',
    label: 'MARINE',
    headline: 'Marine',
    summary: 'Reinsurance capacity for marine cargo, hull, and offshore energy â supporting cedants across the full spectrum of maritime and logistical risk.',
    capacityType: 'Facultative & Treaty Reinsurance',
    riskDescription: 'Marine reinsurance covers physical damage and liability arising from the movement of goods, the operation of vessels, and offshore energy activities. With global supply chains under increasing pressure from geopolitical disruption, climate events, and infrastructure congestion, marine reinsurance plays a critical role in stabilising cedant portfolios exposed to large individual risks and accumulation scenarios.',
    coverScope: [
      'Cargo: inland transit, ocean cargo, and stock throughput',
      'Hull & Machinery (H&M): commercial vessels, tankers, bulk carriers',
      'Protection & Indemnity (P&I) reinsurance support',
      'Offshore energy: platforms, FPSOs, subsea infrastructure',
      'Ports and terminals: physical damage and liability',
      'Marine liability: ship repairers, stevedores, and terminal operators',
    ],
    structures: [
      'Facultative excess of loss for large single risks (cargo, hull, offshore)',
      'Per-voyage and per-vessel facultative placements',
      'Cargo treaty (per-risk XL and quota share)',
      'Hull treaty excess of loss',
    ],
    markets: 'Global. Focused on cedants in key maritime hubs â London market, Singapore, Rotterdam, Miami â as well as growing marine books in Latin America and Southeast Asia.',
    image: 'https://images.unsplash.com/photo-1699588999949-e25959a59550?w=1400&auto=format&fit=crop&q=80',
    imagePosition: 'center 50%',
  },
  {
    id: 'aviation',
    label: 'AVIATION',
    headline: 'Aviation',
    summary: 'Reinsurance capacity for aviation hull and liability â supporting cedants underwriting commercial airlines, business aviation, airports, and aerospace manufacturers.',
    capacityType: 'Facultative & Treaty Reinsurance',
    riskDescription: 'Aviation reinsurance covers physical damage to aircraft (hull) and third-party liability arising from aviation operations. The aviation market is highly technical, driven by fleet values, route exposure, and tail-risk liability. Heath underwrites aviation reinsurance with a focus on disciplined risk selection, supporting cedants managing complex and high-value aviation portfolios.',
    coverScope: [
      'Airline hull & liability: commercial passenger carriers, freighters, charter',
      'General aviation: business jets, turboprops, helicopters',
      'Aviation products liability: airframe and component manufacturers',
      'Airport operators liability and ground handling',
      'Aerospace: satellites, launch vehicles, and spacecraft',
      'War and terrorism hull and liability coverage',
    ],
    structures: [
      'Facultative excess of loss for individual airline or fleet risks',
      'Proportional facultative for smaller or regional carriers',
      'Per-occurrence and per-aircraft excess of loss treaties',
      'Quota share treaties for general aviation and aerospace portfolios',
    ],
    markets: 'Global. Active capacity for cedants in North America, Europe, the Middle East, and Latin America. Growing interest in Asian aviation markets and emerging aerospace risks.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&auto=format&fit=crop&q=80',
    imagePosition: 'center 40%',
  },
];

function LineCard({ line }: { line: SpecialtyLine }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position:'relative', overflow:'hidden', borderRadius:16, border:`1px solid ${open?'rgba(74,158,255,0.5)':'rgba(74,158,255,0.18)'}`, transition:'border-color 0.3s ease, box-shadow 0.3s ease', boxShadow: open ? '0 0 0 1px rgba(74,158,255,0.2), 0 24px 60px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.25)' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`url(${line.image})`, backgroundSize:'cover', backgroundPosition:line.imagePosition, zIndex:0 }} />
      <div style={{ position:'absolute', inset:0, background: open ? 'linear-gradient(135deg,rgba(2,9,28,0.97) 0%,rgba(2,9,28,0.93) 100%)' : 'linear-gradient(105deg,rgba(2,9,28,0.94) 0%,rgba(2,9,28,0.80) 55%,rgba(2,9,28,0.70) 100%)', transition:'background 0.4s ease', zIndex:1 }} />
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
          {open ? 'COLLAPSE' : 'VIEW DETAIL'}
          <span style={{ display:'inline-block', transition:'transform 0.3s', transform: open?'rotate(180deg)':'rotate(0deg)' }}>â</span>
        </button>
        {open && (
          <div style={{ marginTop:32, paddingTop:32, borderTop:'1px solid rgba(74,158,255,0.18)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:40 }}>
            <div>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:10 }}>The Risk</p>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.72)', lineHeight:1.75, marginBottom:28 }}>{line.riskDescription}</p>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:12 }}>Coverage Scope</p>
              <ul style={{ margin:0, padding:0, listStyle:'none' }}>
                {line.coverScope.map((item, i) => (
                  <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:9, fontSize:14, color:'rgba(255,255,255,0.65)', lineHeight:1.55 }}>
                    <span style={{ color:LIGHT, marginTop:4, flexShrink:0, fontSize:10 }}>â</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:12 }}>Structures</p>
              <ul style={{ margin:0, padding:0, listStyle:'none', marginBottom:28 }}>
                {line.structures.map((item, i) => (
                  <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:9, fontSize:14, color:'rgba(255,255,255,0.65)', lineHeight:1.55 }}>
                    <span style={{ color:LIGHT, flexShrink:0, fontWeight:700, marginTop:1 }}>â</span>{item}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:10 }}>Target Markets</p>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.72)', lineHeight:1.75 }}>{line.markets}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const { dict } = useI18n();
  const d = dict.pagesV2.portfolio;

  return (
    <main style={{ minHeight:'100vh', background:NAVY, fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", color:'#ffffff' }}>
      {/* Background */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.13" transform="translate(1050,40) scale(5) rotate(8 55 70)">
            <rect x="0" y="0" width="16" height="70" fill="#4a9eff" />
            <rect x="40" y="0" width="16" height="70" fill="#4a9eff" />
            <rect x="16" y="26" width="24" height="12" fill="#4a9eff" />
          </g>
          <g opacity="0.08" transform="translate(-80,480) scale(4) rotate(-5 55 70)">
            <rect x="0" y="0" width="16" height="70" fill="#4a9eff" />
            <rect x="40" y="0" width="16" height="70" fill="#4a9eff" />
            <rect x="16" y="26" width="24" height="12" fill="#4a9eff" />
          </g>
          <g opacity="0.10" transform="translate(350,600) scale(3.5) rotate(-3 55 70)">
            <rect x="0" y="0" width="16" height="70" fill="#4a9eff" />
            <rect x="40" y="0" width="16" height="70" fill="#4a9eff" />
            <rect x="16" y="26" width="24" height="12" fill="#4a9eff" />
          </g>
          <g style={{ filter:'drop-shadow(0 0 6px #4a9eff)' }} opacity="0.85" stroke="#4a9eff" strokeWidth="1.2" fill="none">
            <line x1="155" y1="110" x2="215" y2="75" /><line x1="155" y1="110" x2="105" y2="155" />
            <line x1="155" y1="110" x2="240" y2="140" /><line x1="215" y1="75" x2="175" y2="45" />
            <line x1="105" y1="155" x2="110" y2="210" />
            <circle cx="155" cy="110" r="7" fill="#4a9eff" /><circle cx="155" cy="110" r="3" fill="#f0f4ff" opacity="0.5" />
            <circle cx="215" cy="75" r="4" fill="#4a9eff" opacity="0.7" /><circle cx="105" cy="155" r="4" fill="#4a9eff" opacity="0.7" />
            <circle cx="240" cy="140" r="3.5" fill="#4a9eff" opacity="0.5" /><circle cx="175" cy="45" r="3" fill="#4a9eff" opacity="0.45" />
            <circle cx="110" cy="210" r="3" fill="#4a9eff" opacity="0.45" />
          </g>
          <g style={{ filter:'drop-shadow(0 0 6px #4a9eff)' }} opacity="0.80" stroke="#4a9eff" strokeWidth="1.2" fill="none">
            <line x1="1290" y1="200" x2="1350" y2="160" /><line x1="1290" y1="200" x2="1240" y2="250" />
            <line x1="1290" y1="200" x2="1360" y2="235" /><line x1="1350" y1="160" x2="1380" y2="120" />
            <circle cx="1290" cy="200" r="7" fill="#4a9eff" /><circle cx="1290" cy="200" r="3" fill="#f0f4ff" opacity="0.5" />
            <circle cx="1350" cy="160" r="4" fill="#4a9eff" opacity="0.7" /><circle cx="1240" cy="250" r="4" fill="#4a9eff" opacity="0.7" />
            <circle cx="1360" cy="235" r="3.5" fill="#4a9eff" opacity="0.5" /><circle cx="1380" cy="120" r="3" fill="#4a9eff" opacity="0.45" />
          </g>
          <g style={{ filter:'drop-shadow(0 0 6px #4a9eff)' }} opacity="0.75" stroke="#4a9eff" strokeWidth="1.2" fill="none">
            <line x1="90" y1="700" x2="150" y2="660" /><line x1="90" y1="700" x2="50" y2="750" />
            <line x1="90" y1="700" x2="165" y2="730" />
            <circle cx="90" cy="700" r="7" fill="#4a9eff" /><circle cx="90" cy="700" r="3" fill="#f0f4ff" opacity="0.5" />
            <circle cx="150" cy="660" r="4" fill="#4a9eff" opacity="0.7" /><circle cx="50" cy="750" r="4" fill="#4a9eff" opacity="0.7" />
            <circle cx="165" cy="730" r="3.5" fill="#4a9eff" opacity="0.5" />
          </g>
        </svg>
      </div>

      {/* Header section */}
      <section style={{ padding:'96px 40px 64px', maxWidth:1160, margin:'0 auto' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:20, border:'1px solid rgba(74,158,255,0.35)', background:'rgba(74,158,255,0.08)', fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:LIGHT, marginBottom:28 }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:LIGHT, boxShadow:`0 0 8px ${LIGHT}` }} />
          REINSURANCE PORTFOLIO
        </div>
        <h1 style={{ fontSize:'clamp(36px,5vw,58px)', fontWeight:800, lineHeight:1.1, maxWidth:700, margin:'0 0 24px' }}>
          {d.subtitle}
        </h1>
        <p style={{ fontSize:18, color:'rgba(255,255,255,0.6)', maxWidth:600, lineHeight:1.7, margin:0 }}>
          {d.intro}
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginTop:40 }}>
          {LINES.map(l => (
            <div key={l.id} style={{ padding:'7px 16px', borderRadius:6, border:'1px solid rgba(74,158,255,0.2)', background:'rgba(74,158,255,0.06)', fontSize:11, fontWeight:700, letterSpacing:'0.1em', color:'rgba(255,255,255,0.5)' }}>{l.label}</div>
          ))}
        </div>
      </section>

      {/* Line cards */}
      <section style={{ padding:'0 40px 96px', maxWidth:1160, margin:'0 auto', display:'flex', flexDirection:'column', gap:20 }}>
        {LINES.map(line => <LineCard key={line.id} line={line} />)}
      </section>

      {/* CTA */}
      <section style={{ background:DARK, borderTop:'1px solid rgba(74,158,255,0.1)', borderBottom:'1px solid rgba(74,158,255,0.1)', padding:'80px 40px' }}>
        <div style={{ maxWidth:1160, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' }}>
          <div>
            <h2 style={{ fontSize:'clamp(26px,3.5vw,40px)', fontWeight:800, margin:'0 0 14px', lineHeight:1.2, maxWidth:560 }}>
              Submit a risk or explore a <span style={{ color:LIGHT }}>capacity partnership.</span>
            </h2>
            <p style={{ fontSize:16, color:'rgba(255,255,255,0.55)', maxWidth:500, lineHeight:1.65, margin:0 }}>
              Whether you are a cedant seeking facultative reinsurance support or an institution looking to deploy capacity, we want to hear from you.
            </p>
          </div>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <button style={{ padding:'14px 30px', borderRadius:8, background:LIGHT, border:'none', color:'#ffffff', fontSize:15, fontWeight:700, cursor:'pointer' }}>Submit a Risk</button>
            <button style={{ padding:'14px 30px', borderRadius:8, background:'rgba(74,158,255,0.12)', border:'1px solid rgba(74,158,255,0.45)', color:LIGHT, fontSize:15, fontWeight:700, cursor:'pointer' }}>Explore Partnership</button>
          </div>
        </div>
      </section>
    </main>
  );
}
