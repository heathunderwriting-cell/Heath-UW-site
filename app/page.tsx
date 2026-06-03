import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Heath Underwriting — AI-Native MGA',
  description:
    'Heath is the leading AI underwriting platform — a modern MGA specialising in specialty reinsurance.',
};

const NAVY = '#0d2d4f';
const BLUE = '#1a65a8';

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
        {/* ── H Letterform Geometry ── */}

        {/* H #1 — upper right, slight rotation */}
        <g opacity="0.05" transform="translate(1060,-60) scale(2.2) rotate(8 55 70)">
          <rect x="0" y="0" width="16" height="70" fill={BLUE} />
          <rect x="40" y="0" width="16" height="70" fill={BLUE} />
          <rect x="16" y="26" width="24" height="12" fill={BLUE} />
          <rect x="56" y="0" width="5" height="70" fill={BLUE} opacity="0.5" />
        </g>

        {/* H #2 — left mid, larger, counter-rotated */}
        <g opacity="0.035" transform="translate(-120,250) scale(3.5) rotate(-5 55 70)">
          <rect x="0" y="0" width="16" height="70" fill={BLUE} />
          <rect x="40" y="0" width="16" height="70" fill={BLUE} />
          <rect x="16" y="26" width="24" height="12" fill={BLUE} />
          <rect x="56" y="0" width="5" height="70" fill={BLUE} opacity="0.5" />
        </g>

        {/* H #3 — lower right */}
        <g opacity="0.04" transform="translate(1150,560) scale(2.0) rotate(12 55 70)">
          <rect x="0" y="0" width="16" height="70" fill={BLUE} />
          <rect x="40" y="0" width="16" height="70" fill={BLUE} />
          <rect x="16" y="26" width="24" height="12" fill={BLUE} />
          <rect x="56" y="0" width="5" height="70" fill={BLUE} opacity="0.5" />
        </g>

        {/* H #4 — centre-bottom, very large, nearly invisible */}
        <g opacity="0.028" transform="translate(380,640) scale(4.2) rotate(-3 55 70)">
          <rect x="0" y="0" width="16" height="70" fill={BLUE} />
          <rect x="40" y="0" width="16" height="70" fill={BLUE} />
          <rect x="16" y="26" width="24" height="12" fill={BLUE} />
          <rect x="56" y="0" width="5" height="70" fill={BLUE} opacity="0.5" />
        </g>

        {/* ── Node Clusters ── */}

        {/* Cluster 1 — upper left */}
        <g opacity="0.22" stroke={BLUE} strokeWidth="1.2" fill="none">
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

        {/* Cluster 2 — upper right */}
        <g opacity="0.18" stroke={BLUE} strokeWidth="1.2" fill="none">
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

        {/* Cluster 3 — lower left */}
        <g opacity="0.20" stroke={BLUE} strokeWidth="1.2" fill="none">
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

        {/* Cluster 4 — lower right */}
        <g opacity="0.16" stroke={BLUE} strokeWidth="1.2" fill="none">
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
          borderBottom: '1px solid rgba(42,122,192,0.15)',
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
            Heath <span style={{ color: BLUE }}>Underwriting</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a
            href="#model"
            style={{ color: 'rgba(240,244,255,0.55)', fontSize: '14px', textDecoration: 'none' }}
          >
            Model
          </a>
          <a
            href="#edge"
            style={{ color: 'rgba(240,244,255,0.55)', fontSize: '14px', textDecoration: 'none' }}
          >
            Edge
          </a>
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
            Contact
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 5,
          textAlign: 'center',
          padding: '100px 40px 80px',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(42,122,192,0.12)',
            border: '1px solid rgba(42,122,192,0.35)',
            borderRadius: '20px',
            padding: '5px 16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: BLUE }}
          />
          <span
            style={{
              color: BLUE,
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
            }}
          >
            AI-NATIVE MGA
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-1.5px',
            marginBottom: '24px',
            color: '#f0f4ff',
          }}
        >
          Heath is the leading AI underwriting platform{' '}
          <span style={{ color: BLUE }}>— a modern MGA.</span>
        </h1>

        <p
          style={{
            fontSize: '18px',
            lineHeight: 1.65,
            color: 'rgba(240,244,255,0.65)',
            maxWidth: '680px',
            margin: '0 auto 40px',
          }}
        >
          We combine underwriting expertise, proprietary technology, and aligned capacity to
          deliver the most advanced AI-powered reinsurance underwriting workflow.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#contact"
            style={{
              background: BLUE,
              color: 'white',
              padding: '14px 32px',
              borderRadius: '5px',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              letterSpacing: '-0.2px',
            }}
          >
            Explore a Partnership
          </a>
          <a
            href="#model"
            style={{
              background: 'transparent',
              color: '#f0f4ff',
              border: '1px solid rgba(240,244,255,0.2)',
              padding: '14px 32px',
              borderRadius: '5px',
              fontWeight: 500,
              fontSize: '15px',
              textDecoration: 'none',
            }}
          >
            Our Model →
          </a>
        </div>
      </section>

      {/* ── PILLS ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          padding: '0 40px 80px',
        }}
      >
        {[
          'SPECIALTY LINES',
          'PORTFOLIO DISCIPLINE',
          'ALIGNED CAPACITY',
          'TECHNOLOGY-ENABLED EXECUTION',
        ].map((pill) => (
          <div
            key={pill}
            style={{
              border: '1px solid rgba(42,122,192,0.28)',
              borderRadius: '4px',
              padding: '6px 18px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              color: 'rgba(240,244,255,0.45)',
            }}
          >
            {pill}
          </div>
        ))}
      </section>

      {/* ── WHO WE ARE ── */}
      <section
        id="about"
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '80px 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              color: BLUE,
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              marginBottom: '16px',
            }}
          >
            WHO WE ARE
          </div>
          <h2
            style={{
              fontSize: 'clamp(24px, 3vw, 38px)',
              fontWeight: 800,
              letterSpacing: '-0.8px',
              lineHeight: 1.2,
              marginBottom: '20px',
              color: '#f0f4ff',
            }}
          >
            An AI-native specialty reinsurance MGA built for the modern market.
          </h2>
          <p
            style={{
              color: 'rgba(240,244,255,0.6)',
              lineHeight: 1.75,
              fontSize: '16px',
              marginBottom: '16px',
            }}
          >
            Heath Underwriting is a specialty reinsurance MGA operating in sabotage &amp;
            terrorism and facultative lines. We combine deep underwriting expertise with
            proprietary AI workflows to deliver superior risk selection and portfolio
            performance.
          </p>
          <p
            style={{ color: 'rgba(240,244,255,0.6)', lineHeight: 1.75, fontSize: '16px' }}
          >
            Built from the ground up as an AI-native platform, Heath processes, analyses, and
            responds to submissions with a speed and consistency that traditional underwriting
            cannot match — without compromising on judgment or discipline.
          </p>
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
        >
          {(
            [
              { value: 'AI-Native', label: 'Built from day one on proprietary AI workflows' },
              { value: 'Specialty', label: 'Sabotage, terrorism & facultative lines' },
              { value: 'Reinsurance', label: 'Focused exclusively on reinsurance structures' },
              { value: 'Disciplined', label: 'Rigorous risk selection at every step' },
            ] as { value: string; label: string }[]
          ).map(({ value, label }) => (
            <div
              key={value}
              style={{
                background: 'rgba(42,122,192,0.06)',
                border: '1px solid rgba(42,122,192,0.18)',
                borderRadius: '8px',
                padding: '24px 20px',
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: BLUE,
                  marginBottom: '8px',
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: 'rgba(240,244,255,0.5)',
                  lineHeight: 1.55,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE HEATH MODEL ── */}
      <section
        id="model"
        style={{
          position: 'relative',
          zIndex: 5,
          background: 'rgba(42,122,192,0.04)',
          borderTop: '1px solid rgba(42,122,192,0.12)',
          borderBottom: '1px solid rgba(42,122,192,0.12)',
          padding: '80px 40px',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div
              style={{
                color: BLUE,
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '2px',
                marginBottom: '16px',
              }}
            >
              THE HEATH MODEL
            </div>
            <h2
              style={{
                fontSize: 'clamp(24px, 3vw, 38px)',
                fontWeight: 800,
                letterSpacing: '-0.8px',
                color: '#f0f4ff',
                marginBottom: '14px',
              }}
            >
              The Underwriting Desk
            </h2>
            <p
              style={{
                color: 'rgba(240,244,255,0.5)',
                fontSize: '16px',
                maxWidth: '520px',
                margin: '0 auto',
              }}
            >
              A complete, AI-powered specialty reinsurance operation.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
            }}
          >
            {(
              [
                {
                  num: '01',
                  title: 'Submission Intake',
                  body: 'Specialty reinsurance underwriting across selected lines of business.',
                  ai: false,
                },
                {
                  num: '02',
                  title: 'Risk Analysis',
                  body: 'Proprietary models assess exposure, pricing adequacy, and portfolio fit across every submission.',
                  ai: false,
                },
                {
                  num: '03',
                  title: 'Capacity Deployment',
                  body: 'Aligned capacity deployed with discipline — every risk measured against portfolio objectives.',
                  ai: false,
                },
                {
                  num: '04',
                  title: 'AI Workflows',
                  body: 'Automated triage, analysis and response — powered by proprietary AI workflows.',
                  ai: true,
                },
              ] as { num: string; title: string; body: string; ai: boolean }[]
            ).map(({ num, title, body, ai }) => (
              <div
                key={num}
                style={{
                  background: 'rgba(13,45,79,0.8)',
                  border: '1px solid rgba(42,122,192,0.2)',
                  borderRadius: '10px',
                  padding: '28px 22px',
                  borderTop: `3px solid ${BLUE}`,
                }}
              >
                <div
                  style={{
                    color: BLUE,
                    fontSize: '12px',
                    fontWeight: 700,
                    marginBottom: '14px',
                    opacity: 0.65,
                  }}
                >
                  {num}
                </div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: '15px',
                    marginBottom: '12px',
                    color: '#f0f4ff',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: 'rgba(240,244,255,0.55)',
                    fontSize: '13px',
                    lineHeight: 1.65,
                  }}
                >
                  {body}
                </p>
                {ai && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'rgba(42,122,192,0.15)',
                      border: '1px solid rgba(42,122,192,0.3)',
                      borderRadius: '3px',
                      padding: '3px 9px',
                      marginTop: '14px',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: BLUE,
                      letterSpacing: '1px',
                    }}
                  >
                    ✦ AI
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE HEATH EDGE ── */}
      <section
        id="edge"
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '80px 40px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div
            style={{
              color: BLUE,
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              marginBottom: '16px',
            }}
          >
            THE HEATH EDGE
          </div>
          <h2
            style={{
              fontSize: 'clamp(24px, 3vw, 38px)',
              fontWeight: 800,
              letterSpacing: '-0.8px',
              color: '#f0f4ff',
            }}
          >
            Why Heath outperforms
          </h2>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
        >
          {(
            [
              {
                icon: '⚡',
                title: 'Speed at Scale',
                body: 'AI-driven intake and triage means every submission is assessed, priced, and responded to faster than any traditional team — without sacrificing quality.',
              },
              {
                icon: '🎯',
                title: 'Portfolio Discipline',
                body: 'Every risk is evaluated in the context of the full portfolio. Correlations, accumulations, and concentration risks are managed proactively — not reactively.',
              },
              {
                icon: '🔬',
                title: 'Data-Driven Underwriting',
                body: 'Proprietary data pipelines enrich every submission. Underwriters act on better information, faster — leading to more consistent, defensible decisions.',
              },
            ] as { icon: string; title: string; body: string }[]
          ).map(({ icon, title, body }) => (
            <div
              key={title}
              style={{
                background: 'rgba(42,122,192,0.05)',
                border: '1px solid rgba(42,122,192,0.16)',
                borderRadius: '10px',
                padding: '32px 28px',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>{icon}</div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: '17px',
                  marginBottom: '12px',
                  color: '#f0f4ff',
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  color: 'rgba(240,244,255,0.55)',
                  fontSize: '14px',
                  lineHeight: 1.7,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="contact"
        style={{
          position: 'relative',
          zIndex: 5,
          background: 'rgba(42,122,192,0.07)',
          borderTop: '1px solid rgba(42,122,192,0.15)',
          padding: '100px 40px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div
            style={{
              color: BLUE,
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              marginBottom: '24px',
            }}
          >
            CAPACITY PARTNERSHIPS
          </div>
          <h2
            style={{
              fontSize: 'clamp(26px, 3.5vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-1px',
              lineHeight: 1.18,
              color: '#f0f4ff',
              marginBottom: '24px',
            }}
          >
            We partner with capacity providers and institutions seeking durable, disciplined
            reinsurance exposure.
          </h2>
          <p
            style={{
              color: 'rgba(240,244,255,0.6)',
              fontSize: '17px',
              lineHeight: 1.7,
              marginBottom: '40px',
            }}
          >
            Heath brings proprietary technology, rigorous underwriting, and deep specialty
            expertise — the infrastructure capacity partners need to deploy with confidence.
          </p>
          <a
            href="mailto:info@heathuw.com"
            style={{
              display: 'inline-block',
              background: BLUE,
              color: 'white',
              padding: '16px 40px',
              borderRadius: '5px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              letterSpacing: '-0.2px',
            }}
          >
            Explore a Partnership
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          position: 'relative',
          zIndex: 5,
          borderTop: '1px solid rgba(42,122,192,0.1)',
          padding: '32px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <span style={{ color: 'rgba(240,244,255,0.3)', fontSize: '12px' }}>
          © 2025 Heath Underwriting · Sabotage &amp; Terrorism · Facultative Reinsurance
        </span>
        <span style={{ color: 'rgba(240,244,255,0.3)', fontSize: '12px' }}>heathuw.com</span>
      </footer>
    </div>
  );
}
