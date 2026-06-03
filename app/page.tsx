import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Heath Underwriting — AI-Native MGA',
  description:
    'Heath is the leading AI underwriting platform — a modern MGA specialising in specialty reinsurance.',
};

const NAVY = '#0d2d4f';
const BLUE = '#1a3060';

function Background() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* H #1 – upper right */}
        <g opacity="0.07" transform="translate(1060,-60) scale(2.2) rotate(8 55 70)">
          <rect x="0" y="0" width="16" height="70" fill={BLUE} />
          <rect x="40" y="0" width="16" height="70" fill={BLUE} />
          <rect x="16" y="26" width="24" height="12" fill={BLUE} />
          <rect x="56" y="0" width="5" height="70" fill={BLUE} opacity="0.5" />
        </g>

        {/* H #2 – left mid */}
        <g opacity="0.055" transform="translate(-120,250) scale(3.5) rotate(-5 55 70)">
          <rect x="0" y="0" width="16" height="70" fill={BLUE} />
          <rect x="40" y="0" width="16" height="70" fill={BLUE} />
          <rect x="16" y="26" width="24" height="12" fill={BLUE} />
          <rect x="56" y="0" width="5" height="70" fill={BLUE} opacity="0.5" />
        </g>

        {/* H #3 – lower right */}
        <g opacity="0.06" transform="translate(1150,560) scale(2.0) rotate(12 55 70)">
          <rect x="0" y="0" width="16" height="70" fill={BLUE} />
          <rect x="40" y="0" width="16" height="70" fill={BLUE} />
          <rect x="16" y="26" width="24" height="12" fill={BLUE} />
          <rect x="56" y="0" width="5" height="70" fill={BLUE} opacity="0.5" />
        </g>

        {/* H #4 – centre-bottom */}
        <g opacity="0.04" transform="translate(380,640) scale(4.2) rotate(-3 55 70)">
          <rect x="0" y="0" width="16" height="70" fill={BLUE} />
          <rect x="40" y="0" width="16" height="70" fill={BLUE} />
          <rect x="16" y="26" width="24" height="12" fill={BLUE} />
          <rect x="56" y="0" width="5" height="70" fill={BLUE} opacity="0.5" />
        </g>

        {/* Node Clusters */}
        <g opacity="0.28" stroke={BLUE} strokeWidth="1.2" fill="none">
          <line x1="155" y1="110" x2="215" y2="75" />
          <line x1="155" y1="110" x2="105" y2="155" />
          <line x1="155" y1="110" x2="240" y2="140" />
          <line x1="215" y1="75" x2="175" y2="45" />
          <line x1="105" y1="155" x2="110" y2="210" />
          <circle cx="155" cy="110" r="7" fill={BLUE} />
          <circle cx="155" cy="110" r="3" fill="#f0f4ff" opacity="0.4" />
          <circle cx="215" cy="75" r="4" fill={BLUE} opacity="0.5" />
          <circle cx="105" cy="155" r="4" fill={BLUE} opacity="0.5" />
          <circle cx="240" cy="140" r="3.5" />
          <circle cx="175" cy="45" r="3" />
          <circle cx="110" cy="210" r="3" />
        </g>

        <g opacity="0.22" stroke={BLUE} strokeWidth="1.2" fill="none">
          <line x1="1290" y1="160" x2="1340" y2="100" />
          <line x1="1290" y1="160" x2="1230" y2="195" />
          <line x1="1290" y1="160" x2="1350" y2="220" />
          <line x1="1340" y1="100" x2="1380" y2="65" />
          <line x1="1230" y1="195" x2="1195" y2="240" />
          <circle cx="1290" cy="160" r="7" fill={BLUE} />
          <circle cx="1290" cy="160" r="3" fill="#f0f4ff" opacity="0.45" />
          <circle cx="1340" cy="100" r="4" fill={BLUE} opacity="0.5" />
          <circle cx="1230" cy="195" r="4" fill={BLUE} opacity="0.5" />
          <circle cx="1350" cy="220" r="3.5" />
          <circle cx="1380" cy="65" r="3" />
          <circle cx="1195" cy="240" r="3" />
        </g>

        <g opacity="0.25" stroke={BLUE} strokeWidth="1.2" fill="none">
          <line x1="90" y1="630" x2="150" y2="590" />
          <line x1="90" y1="630" x2="55" y2="680" />
          <line x1="90" y1="630" x2="160" y2="670" />
          <line x1="150" y1="590" x2="190" y2="555" />
          <line x1="55" y1="680" x2="40" y2="730" />
          <circle cx="90" cy="630" r="7" fill={BLUE} />
          <circle cx="90" cy="630" r="3" fill="#f0f4ff" opacity="0.4" />
          <circle cx="150" cy="590" r="4" fill={BLUE} opacity="0.5" />
          <circle cx="55" cy="680" r="4" fill={BLUE} opacity="0.5" />
          <circle cx="160" cy="670" r="3.5" />
          <circle cx="190" cy="555" r="3" />
          <circle cx="40" cy="730" r="3" />
        </g>

        <g opacity="0.20" stroke={BLUE} strokeWidth="1.2" fill="none">
          <line x1="1360" y1="700" x2="1300" y2="660" />
          <line x1="1360" y1="700" x2="1400" y2="750" />
          <line x1="1360" y1="700" x2="1410" y2="640" />
          <line x1="1300" y1="660" x2="1250" y2="690" />
          <line x1="1400" y1="750" x2="1420" y2="800" />
          <circle cx="1360" cy="700" r="7" fill={BLUE} />
          <circle cx="1360" cy="700" r="3" fill="#f0f4ff" opacity="0.4" />
          <circle cx="1300" cy="660" r="4" fill={BLUE} opacity="0.5" />
          <circle cx="1400" cy="750" r="4" fill={BLUE} opacity="0.5" />
          <circle cx="1410" cy="640" r="3.5" />
          <circle cx="1250" cy="690" r="3" />
          <circle cx="1420" cy="800" r="3" />
        </g>
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <div
      style={{
        background: NAVY,
        color: '#f0f4ff',
        minHeight: '100vh',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        position: 'relative',
      }}
    >
      <Background />

      {/* ── NAV ── */}
      <nav
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          height: '64px',
          borderBottom: '1px solid rgba(26,48,96,0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="40" height="32" viewBox="0 0 40 32" xmlns="http://www.w3.org/2000/svg">
            <rect width="30" height="32" fill={NAVY} rx="3" />
            <rect x="33" y="0" width="5" height="32" fill={BLUE} rx="1" />
            <text
              x="15"
              y="22"
              textAnchor="middle"
              fill="white"
              fontFamily="Arial Black, Arial, sans-serif"
              fontSize="13"
              fontWeight="900"
            >
              HU
            </text>
          </svg>
          <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.3px' }}>
            Heath
          </span>
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {'Home Portfolio Company Contact'.split(' ').map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{ color: 'rgba(240,244,255,0.55)', fontSize: '14px', textDecoration: 'none' }}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              background: BLUE,
              color: 'white',
              padding: '8px 20px',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Sign in
          </a>
        </div>
      </nav>

      {/* ── HERO (two-column) ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '80px 40px 80px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(26,48,96,0.25)',
              border: '1px solid rgba(26,48,96,0.6)',
              borderRadius: '20px',
              padding: '5px 16px',
              marginBottom: '28px',
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: BLUE }} />
            <span style={{ color: BLUE, fontSize: '11px', fontWeight: 700, letterSpacing: '2px' }}>
              AI-NATIVE MGA
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-1.2px',
              marginBottom: '20px',
              color: '#f0f4ff',
            }}
          >
            Heath is the leading{' '}
            <span style={{ color: '#4a9eff' }}>AI underwriting platform</span>{' '}
            —{' '}
            <span style={{ color: 'rgba(240,244,255,0.7)' }}>a modern MGA.</span>
          </h1>

          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.65,
              color: 'rgba(240,244,255,0.6)',
              marginBottom: '36px',
            }}
          >
            We combine underwriting expertise, proprietary technology, and{' '}
            <strong style={{ color: '#f0f4ff', fontWeight: 600 }}>
              AI-powered reinsurance underwriting workflow.
            </strong>
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              style={{
                background: BLUE,
                color: 'white',
                padding: '12px 28px',
                borderRadius: '5px',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
              }}
            >
              Contact us
            </a>
            <a
              href="#model"
              style={{
                background: 'transparent',
                color: '#f0f4ff',
                border: '1px solid rgba(240,244,255,0.2)',
                padding: '12px 28px',
                borderRadius: '5px',
                fontWeight: 500,
                fontSize: '14px',
                textDecoration: 'none',
              }}
            >
              Explore underwriting
            </a>
          </div>
        </div>

        {/* Right – Underwriting Desk card */}
        <div
          style={{
            background: 'rgba(8,22,44,0.9)',
            border: '1px solid rgba(26,48,96,0.55)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 20px',
              borderBottom: '1px solid rgba(26,48,96,0.4)',
            }}
          >
            <span style={{ color: 'rgba(240,244,255,0.5)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px' }}>
              UNDERWRITING DESK
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#10b981', fontWeight: 600 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              Live
            </span>
          </div>

          {(
            [
              { text: 'Specialty reinsurance underwriting across selected lines of business.', ai: false },
              { text: 'Portfolio discipline embedded at quotation and bind stages.', ai: false },
              { text: 'Capacity partnerships in active development with long-term orientation.', ai: false },
              { text: 'Automated triage, analysis and response — powered by proprietary AI sworkflows.', ai: true },
            ] as { text: string; ai: boolean }[]
          ).map((item, i, arr) => (
            <div
              key={i}
              style={{
                padding: '14px 20px',
                borderBottom: i < arr.length - 1 ? '1px solid rgba(26,48,96,0.3)' : 'none',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              {item.ai && (
                <span style={{ flexShrink: 0, background: 'rgba(26,48,96,0.5)', border: '1px solid rgba(26,48,96,0.8)', borderRadius: '3px', padding: '2px 6px', fontSize: '9px', fontWeight: 700, color: '#7aa8e0', letterSpacing: '0.8px', marginTop: '2px' }}>
                  AI
                </span>
              )}
              <span style={{ fontSize: '13px', color: 'rgba(240,244,255,0.7)', lineHeight: 1.55 }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PILLS ── */}
      <section style={{ position: 'relative', zIndex: 5, display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', padding: '0 40px 80px' }}>
        {['SPECIALTY LINES', 'PORTFOLIO DISCIPLINE', 'ALIGNED CAPACITY', 'TECHNOLOGY-ENABLED EXECUTION'].map((pill) => (
          <div key={pill} style={{ border: '1px solid rgba(26,48,96,0.5)', borderRadius: '4px', padding: '6px 18px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: 'rgba(240,244,255,0.4)' }}>
            {pill}
          </div>
        ))}
      </section>

      {/* ── WHO WE ARE ── */}
      <section id="about" style={{ position: 'relative', zIndex: 5, maxWidth: '1100px', margin: '0 auto', padding: '80px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        <div>
          <div style={{ color: 'rgba(240,244,255,0.4)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', marginBottom: '16px' }}>ABOUT</div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, letterSpacing: '-0.8px', lineHeight: 1.2, marginBottom: '32px', color: '#f0f4ff' }}>Who We Are</h2>
          <svg width="90" height="72" viewBox="0 0 90 72" xmlns="http://www.w3.org/2000/svg" opacity="0.55">
            <rect width="68" height="72" fill={NAVY} rx="6" />
            <rect x="74" y="0" width="12" height="72" fill={BLUE} rx="2" />
            <rect x="12" y="14" width="14" height="44" fill="rgba(74,158,255,0.6)" rx="2"/>
            <rect x="42" y="14" width="14" height="44" fill="rgba(74,158,255,0.6)" rx="2"/>
            <rect x="26" y="30" width="16" height="10" fill="rgba(74,158,255,0.6)" rx="1"/>
          </svg>
        </div>
        <div>
          <p style={{ color: 'rgba(240,244,255,0.7)', lineHeight: 1.75, fontSize: '16px', marginBottom: '16px' }}>
            We are the leading{' '}<strong style={{ color: '#f0f4ff' }}>AI-native reinsurance underwriting</strong>{' '}business focused on specialty markets. We prioritize long-term value creation, portfolio discipline, and alignment over short-term volume — powered by proprietary AI technology.
          </p>
          <p style={{ color: 'rgba(240,244,255,0.55)', lineHeight: 1.75, fontSize: '16px' }}>Built from the ground up as an AI-native platform, Heath processes, analyses, and responds to submissions with a speed and consistency that traditional underwriting cannot match — without compromising on judgment or discipline.</p>
        </div>
      </section>

      {/* ── THE HEATH MODEL ── */}
      <section id="model" style={{ position: 'relative', zIndex: 5, background: 'rgba(8,18,36,0.6)', borderTop: '1px solid rgba(26,48,96,0.35)', borderBottom: '1px solid rgba(26,48,96,0.35)', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ color: 'rgba(240,244,255,0.4)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', marginBottom: '12px' }}>FRAMEWORK</div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, letterSpacing: '-0.8px', color: '#f0f4ff', marginBottom: '48px' }}>The Heath Model</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {([
              { title: 'Underwriting expertise', body: 'Senior underwriting capability by line, supported by clear technical authority and governance.', ai: false },
              { title: 'Aligned capacity mindset', body: 'We operate with a capacity partner perspective, protecting technical outcomes through the cycle.', ai: false },
              { title: 'Portfolio-driven decisions', body: 'Each risk is evaluated in portfolio context, including accumulation, concentration, and expected return.', ai: false },
              { title: 'Technology-enabled execution', body: 'Our proprietary AI platform enhances speed and operating quality without replacing underwriting judgment.', ai: true },
            ] as { title: string; body: string; ai: boolean }[]).map(({ title, body, ai }) => (
              <div key={title} style={{ background: 'rgba(8,18,36,0.8)', border: '1px solid rgba(26,48,96,0.4)', borderRadius: '10px', padding: '28px 24px', borderTop: `3px solid ${BLUE}` }}>
                <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '10px', color: '#f0f4ff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {title}{ai && <span style={{ background: 'rgba(26,48,96,0.5)', border: '1px solid rgba(26,48,96,0.8)', borderRadius: '3px', padding: '2px 7px', fontSize: '9px', fontWeight: 700, color: '#7aa8e0', letterSpacing: '1px' }}>AI</span>}
                </h3>
                <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '13px', lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE HEATH EDGE ── */}
      <section id="edge" style={{ position: 'relative', zIndex: 5, maxWidth: '1100px', margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ color: 'rgba(240,244,255,0.4)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', marginBottom: '12px' }}>DIFFERENTIATION</div>
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, letterSpacing: '-0.8px', color: '#f0f4ff', marginBottom: '48px' }}>The Heath Edge</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {([
            { title: 'Underwrite with context', body: 'We turn fragmented submission data into decision-ready underwriting context.' },
            { title: 'Alignment over volume', body: 'We optimize for partner alignment and sustained technical performance, not transactional growth.' },
            { title: 'Built for speed', body: 'We pair underwriting discipline with execution velocity to respond quickly without compromising standards.' },
          ] as { title: string; body: string }[]).map(({ title, body }) => (
            <div key={title} style={{ background: 'rgba(8,18,36,0.5)', border: '1px solid rgba(26,48,96,0.35)', borderRadius: '10px', padding: '28px 24px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '10px', color: '#f0f4ff' }}>{title}</h3>
              <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '13px', lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" style={{ position: 'relative', zIndex: 5, background: 'rgba(8,18,36,0.7)', borderTop: '1px solid rgba(26,48,96,0.35)', padding: '100px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ color: 'rgba(240,244,255,0.4)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', marginBottom: '24px' }}>CAPACITY PARTNERSHIPS</div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.18, color: '#f0f4ff', marginBottom: '24px' }}>Build capacity with technical discipline</h2>
          <p style={{ color: 'rgba(240,244,255,0.55)', fontSize: '17px', lineHeight: 1.7, marginBottom: '40px' }}>We partner with institutions seeking durable underwriting performance in specialty reinsurance markets.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:info@heathuw.com" style={{ display: 'inline-block', background: BLUE, color: 'white', padding: '16px 40px', borderRadius: '5px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>Partner with us</a>
            <a href="#about" style={{ display: 'inline-block', background: 'transparent', color: '#f0f4ff', border: '1px solid rgba(240,244,255,0.2)', padding: '16px 40px', borderRadius: '5px', fontWeight: 500, fontSize: '15px', textDecoration: 'none' }}>Company</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', zIndex: 5, borderTop: '1px solid rgba(26,48,96,0.3)', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ color: 'rgba(240,244,255,0.3)', fontSize: '12px' }}>© 2025 Heath Underwriting · Sabotage &amp; Terrorism · Facultative Reinsurance</span>
        <span style={{ color: 'rgba(240,244,255,0.3)', fontSize: '12px' }}>heathuw.com</span>
      </footer>
    </div>
  );
}
