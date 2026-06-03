'use client';
import React from 'react';
import { useI18n } from '@/components/providers/LanguageProvider';

const NAVY = '#02091c';
const NAVY_CARD = '#071223';
const NAVY_LIGHT = '#0a1a2e';
const BLUE = '#4a9eff';
const BLUE_DIM = 'rgba(74,158,255,0.12)';
const BLUE_BORDER = 'rgba(74,158,255,0.25)';
const WHITE = '#f0f4ff';
const MUTED = 'rgba(240,244,255,0.55)';
const GOLD = '#c9a84c';

const techItems = [
  {
    icon: 'Ã¢ÂÂ¡',
    title: 'Automated Submission Engine',
    desc: 'Incoming submissions are automatically ingested, classified, and routed through a structured AI workflow Ã¢ÂÂ reducing processing time and ensuring every risk receives a structured review.',
    tag: 'AI Workflow',
  },
  {
    icon: 'Ã°ÂÂÂÃ¯Â¸Â',
    title: 'Structured Risk Database',
    desc: 'Every submission, decision, and commitment is stored in a relational database with full audit trail Ã¢ÂÂ enabling historical analysis, pattern recognition, and portfolio reporting.',
    tag: 'Supabase / PostgreSQL',
  },
  {
    icon: 'Ã°ÂÂÂ',
    title: 'Real-Time Portfolio Dashboard',
    desc: 'Capacity partners and senior underwriters access a live dashboard showing commitment pipeline, geographic exposure, line-of-business mix, and decision velocity.',
    tag: 'Live Analytics',
  },
  {
    icon: 'Ã°ÂÂÂ',
    title: 'Secure Cedant Portal',
    desc: 'Cedants and brokers submit risks, track status, and receive structured feedback through an authenticated digital portal Ã¢ÂÂ eliminating email-based back-and-forth.',
    tag: 'Authenticated Access',
  },
  {
    icon: 'Ã°ÂÂ¤Â',
    title: 'AI-Native Risk Screening',
    desc: 'The core of Heath\'s AI-native MGA model Ã¢ÂÂ AI workflows pre-screen every submission, score risk profile alignment, flag accumulation concerns, and generate structured underwriter briefs automatically.',
    tag: 'AI-Native MGA Core',
    highlight: true,
  },
  {
    icon: 'Ã°ÂÂÂ',
    title: 'Global Deployment Architecture',
    desc: 'The platform is deployed on edge infrastructure with redundancy across regions Ã¢ÂÂ ensuring consistent performance for cedants and partners across time zones and geographies.',
    tag: 'Edge / Vercel',
  },
];

const aiWorkflows = [
  { title: 'AI Intake Workflow', desc: 'Submissions parsed, classified, and routed in seconds Ã¢ÂÂ no manual triage required.' },
  { title: 'AI Underwriting Brief', desc: 'Structured risk summaries generated automatically for every inbound risk.' },
  { title: 'AI Portfolio Monitor', desc: 'Continuous accumulation tracking and appetite alignment across all open commitments.' },
  { title: 'AI Pricing Signals', desc: 'Market benchmarking and rate adequacy indicators integrated into the decision flow.' },
  { title: 'AI Communication Layer', desc: 'Automated cedant updates, declination notices, and status notifications.' },
  { title: 'AI Reporting Engine', desc: 'Partner bordereaux and management reports generated on demand, not at month-end.' },
];

const pipelineSteps = [
  'Submission\nReceived',
  'Automated\nIntake',
  'AI\nScreening',
  'Underwriter\nReview',
  'Capacity\nAlignment',
  'Decision &\nCommitment',
  'Portfolio\nReporting',
];

const values = [
  { num: '01', title: 'Technical Discipline', desc: 'Every risk is evaluated on fundamentals Ã¢ÂÂ exposure, accumulation, pricing adequacy, and correlation Ã¢ÂÂ not market momentum or volume targets.' },
  { num: '02', title: 'Transparent Governance', desc: 'Our underwriting process is fully documented and auditable. Capacity partners see exactly how risks are selected, priced, and managed in portfolio.' },
  { num: '03', title: 'Long-Term Alignment', desc: 'We structure relationships Ã¢ÂÂ with cedants, brokers, and capacity providers Ã¢ÂÂ around multi-year performance, not transactional premium exchange.' },
  { num: '04', title: 'AI-Native by Design', desc: 'We are not adding AI to a legacy process Ã¢ÂÂ we are an AI-native MGA. Our AI workflows are the operating system: every submission, decision, and report flows through intelligent automation.', highlight: true },
];

const govItems = [
  {
    title: 'Underwriting Governance',
    items: [
      'Defined authority matrix by line of business and limit size',
      'Mandatory peer review for risks above defined thresholds',
      'Quarterly portfolio review with capacity partners',
      'Full audit trail on every submission and decision',
      'Appetite statements reviewed and updated annually',
    ],
  },
  {
    title: 'Capacity Partner Framework',
    items: [
      'Real-time dashboard access for authorized partners',
      'Monthly bordereau and exposure reports',
      'Defined premium flow and settlement protocols',
      'Joint portfolio committees for strategic alignment',
      'Transparent pricing rationale on all bound risks',
    ],
  },
];

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
      Ã¢ÂÂ {children}
    </span>
  );
}

export default function CompanyPage() {
  const { dict } = useI18n();
  const d = dict.pagesV2.company;
  return (
    <main style={{ background: NAVY, color: WHITE, minHeight: '100vh', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', position: 'relative' }}>

      {/* Background node decoration */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <g style={{ filter: 'drop-shadow(0 0 6px #4a9eff)' }} opacity="0.7" stroke="#4a9eff" strokeWidth="1.2" fill="none">
            <line x1="80" y1="140" x2="155" y2="95" /><line x1="155" y1="95" x2="230" y2="155" />
            <line x1="230" y1="155" x2="310" y2="120" /><line x1="155" y1="95" x2="180" y2="40" />
            <circle cx="80" cy="140" r="7" fill="#4a9eff" /><circle cx="80" cy="140" r="3" fill="#f0f4ff" opacity={0.5} />
            <circle cx="155" cy="95" r="10" fill="#4a9eff" /><circle cx="155" cy="95" r="4" fill="#f0f4ff" opacity={0.6} />
            <circle cx="230" cy="155" r="6" fill="#4a9eff" /><circle cx="310" cy="120" r="5" fill="#4a9eff" />
            <circle cx="180" cy="40" r="5" fill="#4a9eff" />
            <line x1="370" y1="50" x2="370" y2="120" strokeWidth="2.5" /><line x1="370" y1="85" x2="410" y2="85" strokeWidth="2.5" /><line x1="410" y1="50" x2="410" y2="120" strokeWidth="2.5" />
          </g>
          <g style={{ filter: 'drop-shadow(0 0 6px #4a9eff)' }} opacity="0.65" stroke="#4a9eff" strokeWidth="1.2" fill="none">
            <line x1="1280" y1="80" x2="1360" y2="130" /><line x1="1360" y1="130" x2="1420" y2="75" />
            <line x1="1280" y1="80" x2="1220" y2="140" />
            <circle cx="1280" cy="80" r="9" fill="#4a9eff" /><circle cx="1280" cy="80" r="3.5" fill="#f0f4ff" opacity={0.6} />
            <circle cx="1360" cy="130" r="6" fill="#4a9eff" /><circle cx="1420" cy="75" r="5" fill="#4a9eff" />
            <circle cx="1220" cy="140" r="7" fill="#4a9eff" />
            <line x1="1030" y1="50" x2="1030" y2="120" strokeWidth="2.5" /><line x1="1030" y1="85" x2="1070" y2="85" strokeWidth="2.5" /><line x1="1070" y1="50" x2="1070" y2="120" strokeWidth="2.5" />
          </g>
          <g style={{ filter: 'drop-shadow(0 0 6px #4a9eff)' }} opacity="0.45" stroke="#4a9eff" strokeWidth="1.2" fill="none">
            <line x1="60" y1="700" x2="130" y2="650" /><line x1="130" y1="650" x2="195" y2="700" />
            <circle cx="60" cy="700" r="6" fill="#4a9eff" /><circle cx="130" cy="650" r="9" fill="#4a9eff" />
            <circle cx="130" cy="650" r="3.5" fill="#f0f4ff" opacity={0.5} />
            <circle cx="195" cy="700" r="5" fill="#4a9eff" />
            <line x1="50" y1="770" x2="50" y2="840" strokeWidth="2.5" /><line x1="50" y1="805" x2="90" y2="805" strokeWidth="2.5" /><line x1="90" y1="770" x2="90" y2="840" strokeWidth="2.5" />
          </g>
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Ã¢ÂÂÃ¢ÂÂ HERO Ã¢ÂÂÃ¢ÂÂ */}
        <section style={{ padding: '100px 48px 80px', maxWidth: 1100, margin: '0 auto', borderBottom: `1px solid ${BLUE_BORDER}` }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, marginBottom: 28 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: `1px solid ${BLUE_BORDER}`, borderRadius: 20,
              padding: '5px 14px', fontSize: '0.75rem', letterSpacing: '0.12em',
              textTransform: 'uppercase' as const, color: BLUE,
            }}>
              <span style={{ width: 6, height: 6, background: BLUE, borderRadius: '50%', display: 'inline-block' }} />
              About Heath
            </span>
            <AIPill>AI-Native MGA</AIPill>
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
            {d.subtitle}
          </h1>
          <p style={{ fontSize: '1.1rem', color: MUTED, maxWidth: 680, lineHeight: 1.7 }}>
            {d.intro}
          </p>
        </section>

        {/* Ã¢ÂÂÃ¢ÂÂ AI-NATIVE BANNER Ã¢ÂÂÃ¢ÂÂ */}
        <div style={{
          background: 'linear-gradient(90deg,rgba(74,158,255,0.06),rgba(74,158,255,0.15),rgba(74,158,255,0.06))',
          borderTop: `1px solid rgba(74,158,255,0.18)`,
          borderBottom: `1px solid rgba(74,158,255,0.18)`,
          padding: '18px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, flexWrap: 'wrap' as const,
        }}>
          {[
            ['AI-Native MGA', 'Fully digital underwriting operations'],
            ['AI Workflows', 'Automated intake to decision pipeline'],
            ['Real-Time Intelligence', 'Live portfolio analytics'],
            ['Zero Paper', '100% structured digital submissions'],
          ].map(([label, sub]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: MUTED, fontSize: '0.82rem' }}>
              <span style={{ color: BLUE, fontSize: '0.6rem' }}>Ã¢ÂÂ¦</span>
              <strong style={{ color: BLUE }}>{label}</strong> Ã¢ÂÂ {sub}
            </div>
          ))}
        </div>

        {/* Ã¢ÂÂÃ¢ÂÂ MISSION & VISION Ã¢ÂÂÃ¢ÂÂ */}
        <section style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', borderBottom: `1px solid ${BLUE_BORDER}` }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: BLUE, marginBottom: 12, fontWeight: 600 }}>Purpose</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {[
              {
                eyebrow: 'Mission', gold: false,
                title: 'Expanding access to institutional reinsurance capacity',
                body: 'We exist to bridge the gap between complex specialty risks and global reinsurance markets Ã¢ÂÂ operating as an AI-native MGA that delivers disciplined, intelligent underwriting creating long-term value for cedants, brokers, and capacity partners.',
              },
              {
                eyebrow: 'Vision', gold: true,
                title: 'The leading AI-native MGA for complex specialty risk',
                body: 'To become the reference AI-native Managing General Agent for specialty reinsurance Ã¢ÂÂ where AI workflows, data-driven risk selection, and transparent governance define the new standard for institutional underwriting globally.',
              },
            ].map(({ eyebrow, gold, title, body }) => (
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

        {/* Ã¢ÂÂÃ¢ÂÂ WHO WE ARE Ã¢ÂÂÃ¢ÂÂ */}
        <section style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', borderBottom: `1px solid ${BLUE_BORDER}` }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: BLUE, marginBottom: 12, fontWeight: 600 }}>Who We Are</div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, marginBottom: 8 }}>Independent. Technical. <span style={{ color: BLUE }}>Aligned.</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'start', marginTop: 40 }}>
            <div>
              {[
                'Heath was founded on a straightforward belief: that specialty reinsurance deserves the same rigor, transparency, and technological sophistication that institutional investors apply to other asset classes.',
                'We underwrite across five specialty lines Ã¢ÂÂ Sabotage & Terrorism, Property, Financial Lines, Marine, and Aviation Ã¢ÂÂ applying a consistent framework of technical analysis, data discipline, and portfolio management to each segment.',
                'Our AI-native MGA model is built around long-term capacity partnerships. We do not chase premium volume. We build portfolios that perform across market cycles, supported by AI workflows and governance structures that make our underwriting process auditable, scalable, and repeatable.',
              ].map((text, i) => <p key={i} style={{ color: MUTED, lineHeight: 1.8, fontSize: '0.95rem', marginBottom: 16 }}>{text}</p>)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 20 }}>
              {[
                ['5', 'Specialty lines across property, liability, marine, aviation & political risk'],
                ['3', 'Languages of operation: English, Spanish, Chinese'],
                ['100%', 'AI-powered digital workflow Ã¢ÂÂ from intake to decision'],
              ].map(([num, label]) => (
                <div key={num} style={{ background: NAVY_CARD, border: `1px solid ${BLUE_BORDER}`, borderRadius: 12, padding: '24px 28px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: BLUE, lineHeight: 1 }}>{num}</div>
                  <div style={{ color: MUTED, fontSize: '0.85rem', marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ã¢ÂÂÃ¢ÂÂ TECHNOLOGY Ã¢ÂÂÃ¢ÂÂ */}
        <section style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', borderBottom: `1px solid ${BLUE_BORDER}` }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: BLUE, marginBottom: 12, fontWeight: 600 }}>Technology</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16, flexWrap: 'wrap' as const }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, margin: 0 }}>
              AI-Native <span style={{ color: BLUE }}>infrastructure</span><br />for underwriting at scale
            </h2>
            <AIPill style={{ marginTop: 6 }}>AI Workflows</AIPill>
          </div>
          <p style={{ color: MUTED, maxWidth: 640, lineHeight: 1.7, marginBottom: 48, fontSize: '0.95rem' }}>
            Heath is built as an <strong style={{ color: WHITE }}>AI-native MGA</strong> Ã¢ÂÂ every step from submission intake to final decision is powered by intelligent AI workflows, structured data, and real-time analytics. No manual bottlenecks. No paper trails. Pure underwriting signal.
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
            <div style={{ position: 'absolute', top: 18, right: 24, fontSize: '0.65rem', letterSpacing: '0.18em', color: 'rgba(74,158,255,0.4)', fontWeight: 800 }}>AI-NATIVE MGA</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>
              Why <span style={{ color: BLUE }}>AI-Native MGA</span> changes everything
            </h3>
            <p style={{ color: MUTED, lineHeight: 1.75, fontSize: '0.92rem', marginBottom: 28 }}>
              Traditional MGAs rely on manual processes, email-based workflows, and spreadsheet-driven decisions. Heath is different Ã¢ÂÂ every underwriting function is orchestrated through AI workflows, from first submission touch to final capacity placement.
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
              AI Workflow Pipeline Ã¢ÂÂ How a risk moves through Heath's AI-Native MGA
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap' as const }}>
              {pipelineSteps.map((step, i) => (
                <div key={i} style={{ flex: 1, minWidth: 100, textAlign: 'center' as const, position: 'relative' }}>
                  {i < pipelineSteps.length - 1 && (
                    <span style={{ position: 'absolute', right: -10, top: '30%', transform: 'translateY(-50%)', color: BLUE, fontSize: '1rem' }}>Ã¢ÂÂ</span>
                  )}
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: BLUE_DIM, border: `1.5px solid ${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: BLUE, margin: '0 auto 8px' }}>{i + 1}</div>
                  <div style={{ fontSize: '0.75rem', color: MUTED, lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{step}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ã¢ÂÂÃ¢ÂÂ VALUES Ã¢ÂÂÃ¢ÂÂ */}
        <section style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', borderBottom: `1px solid ${BLUE_BORDER}` }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: BLUE, marginBottom: 12, fontWeight: 600 }}>Operating Principles</div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, marginBottom: 40 }}>How we <span style={{ color: BLUE }}>work</span></h2>
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

        {/* Ã¢ÂÂÃ¢ÂÂ GOVERNANCE Ã¢ÂÂÃ¢ÂÂ */}
        <section style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto', borderBottom: `1px solid ${BLUE_BORDER}` }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: BLUE, marginBottom: 12, fontWeight: 600 }}>Governance & Partnerships</div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, marginBottom: 12 }}>Institutional <span style={{ color: BLUE }}>standards</span>, built in from day one</h2>
          <p style={{ color: MUTED, maxWidth: 600, marginTop: 12, lineHeight: 1.7, fontSize: '0.95rem', marginBottom: 40 }}>Heath operates with the governance structures and reporting frameworks expected by institutional capacity partners Ã¢ÂÂ ensuring alignment at every level of the value chain.</p>
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

        {/* Ã¢ÂÂÃ¢ÂÂ CTA Ã¢ÂÂÃ¢ÂÂ */}
        <section style={{ padding: '80px 48px 100px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            background: `linear-gradient(135deg,${NAVY_CARD},${NAVY_LIGHT})`,
            border: `1px solid ${BLUE_BORDER}`, borderRadius: 20,
            padding: '60px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40,
          }}>
            <div>
              <div style={{ marginBottom: 12 }}><AIPill>AI-Native MGA</AIPill></div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 10 }}>Ready to explore <span style={{ color: BLUE }}>partnership opportunities?</span></h2>
              <p style={{ color: MUTED, maxWidth: 480, lineHeight: 1.65, fontSize: '0.95rem' }}>Whether you are a cedant seeking reinsurance capacity, a broker looking for a reliable technical underwriter, or an institutional investor exploring AI-native MGA partnerships Ã¢ÂÂ we would like to hear from you.</p>
            </div>
            <a href="/contact" style={{
              flexShrink: 0, background: BLUE, color: NAVY,
              textDecoration: 'none', borderRadius: 10, padding: '14px 32px',
              fontWeight: 700, fontSize: '0.95rem', whiteSpace: 'nowrap' as const,
              display: 'inline-block',
            }}>Contact Us Ã¢ÂÂ</a>
          </div>
        </section>

      </div>
    </main>
  );
}
