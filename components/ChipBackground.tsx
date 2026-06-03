export function ChipBackground({ opacity, tone = "dark" }: { opacity?: number; tone?: "light" | "dark" }) {
  // On dark surfaces (login, portfolio) use the neon cyan/blue. On the light
  // dashboard, swap to deeper blues so the circuit reads as a subtle blueprint.
  const c1 = tone === "light" ? "#1e4fa3" : "#00d4ff";
  const c2 = tone === "light" ? "#3b74d4" : "#4a9eff";
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', opacity }} aria-hidden>
        <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" opacity="0.22">

          <defs>
            <filter id="chglow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="chglow2" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="chsglow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          {/* ===== H #1 — LEFT ===== */}
          <line x1="52" y1="80" x2="52" y2="820" stroke={c1} strokeWidth="5" filter="url(#chglow)"/>
          <line x1="168" y1="80" x2="168" y2="820" stroke={c1} strokeWidth="5" filter="url(#chglow)"/>
          <line x1="52" y1="450" x2="168" y2="450" stroke={c1} strokeWidth="4" filter="url(#chglow)"/>
          <circle cx="52" cy="80" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="168" cy="80" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="52" cy="820" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="168" cy="820" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="52" cy="450" r="6" fill={c1} filter="url(#chglow2)"/>
          <circle cx="168" cy="450" r="6" fill={c1} filter="url(#chglow2)"/>
          {/* ===== H #2 — CENTER ===== */}
          <line x1="636" y1="100" x2="636" y2="800" stroke={c1} strokeWidth="4.5" filter="url(#chglow)"/>
          <line x1="748" y1="100" x2="748" y2="800" stroke={c1} strokeWidth="4.5" filter="url(#chglow)"/>
          <line x1="636" y1="450" x2="748" y2="450" stroke={c1} strokeWidth="3.5" filter="url(#chglow)"/>
          <circle cx="636" cy="100" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="748" cy="100" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="636" cy="800" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="748" cy="800" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="636" cy="450" r="6" fill={c1} filter="url(#chglow2)"/>
          <circle cx="748" cy="450" r="6" fill={c1} filter="url(#chglow2)"/>
          {/* ===== H #3 — RIGHT ===== */}
          <line x1="1300" y1="80" x2="1300" y2="820" stroke={c1} strokeWidth="5" filter="url(#chglow)"/>
          <line x1="1410" y1="80" x2="1410" y2="820" stroke={c1} strokeWidth="5" filter="url(#chglow)"/>
          <line x1="1300" y1="450" x2="1410" y2="450" stroke={c1} strokeWidth="4" filter="url(#chglow)"/>
          <circle cx="1300" cy="80" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="1410" cy="80" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="1300" cy="820" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="1410" cy="820" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="1300" cy="450" r="6" fill={c1} filter="url(#chglow2)"/>
          <circle cx="1410" cy="450" r="6" fill={c1} filter="url(#chglow2)"/>
          {/* H traces to chip */}
          <path d="M168,380 L380,380 L380,430 L730,430" fill="none" stroke={c2} strokeWidth="1" opacity="0.5"/>
          <path d="M168,520 L350,520 L350,500 L730,500" fill="none" stroke={c2} strokeWidth="1" opacity="0.4"/>
          <circle cx="380" cy="380" r="3.5" fill={c2} filter="url(#chsglow)"/>
          <circle cx="350" cy="520" r="3" fill={c2} filter="url(#chsglow)"/>
          {/* MAIN CHIP */}
          <rect x="790" y="295" width="360" height="250" rx="6" fill="none" stroke={c1} strokeWidth="2.5" filter="url(#chglow)"/>
          <rect x="808" y="313" width="324" height="214" rx="4" fill="none" stroke={c2} strokeWidth="1" opacity="0.45"/>
          <rect x="836" y="338" width="268" height="164" rx="3" fill="none" stroke={c2} strokeWidth="0.7" opacity="0.2"/>
          <line x1="836" y1="390" x2="1104" y2="390" stroke={c2} strokeWidth="0.5" opacity="0.2"/>
          <line x1="836" y1="440" x2="1104" y2="440" stroke={c2} strokeWidth="0.5" opacity="0.2"/>
          <line x1="920" y1="338" x2="920" y2="502" stroke={c2} strokeWidth="0.5" opacity="0.2"/>
          <line x1="1020" y1="338" x2="1020" y2="502" stroke={c2} strokeWidth="0.5" opacity="0.2"/>
          <rect x="812" y="317" width="14" height="14" fill="none" stroke={c1} strokeWidth="1.5" filter="url(#chsglow)"/>
          <rect x="1114" y="317" width="14" height="14" fill="none" stroke={c1} strokeWidth="1.5" filter="url(#chsglow)"/>
          <rect x="812" y="509" width="14" height="14" fill="none" stroke={c1} strokeWidth="1.5" filter="url(#chsglow)"/>
          <rect x="1114" y="509" width="14" height="14" fill="none" stroke={c1} strokeWidth="1.5" filter="url(#chsglow)"/>
          <circle cx="970" cy="420" r="18" fill="none" stroke={c1} strokeWidth="1" opacity="0.25" filter="url(#chglow2)"/>
          <circle cx="970" cy="420" r="9" fill="none" stroke={c1} strokeWidth="1.5" opacity="0.5" filter="url(#chglow)"/>
          <circle cx="970" cy="420" r="3" fill={c1} filter="url(#chglow2)"/>
          {/* TOP PINS */}
          <line x1="826" y1="295" x2="826" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="818" y1="240" x2="834" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="862" y1="295" x2="862" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="854" y1="240" x2="870" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="898" y1="295" x2="898" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="890" y1="240" x2="906" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="934" y1="295" x2="934" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="926" y1="240" x2="942" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="970" y1="295" x2="970" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="962" y1="240" x2="978" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1006" y1="295" x2="1006" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="998" y1="240" x2="1014" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1042" y1="295" x2="1042" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="1034" y1="240" x2="1050" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1078" y1="295" x2="1078" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="1070" y1="240" x2="1086" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1114" y1="295" x2="1114" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="1106" y1="240" x2="1122" y2="240" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          {/* BOTTOM PINS */}
          <line x1="826" y1="545" x2="826" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="818" y1="600" x2="834" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="862" y1="545" x2="862" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="854" y1="600" x2="870" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="898" y1="545" x2="898" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="890" y1="600" x2="906" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="934" y1="545" x2="934" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="926" y1="600" x2="942" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="970" y1="545" x2="970" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="962" y1="600" x2="978" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1006" y1="545" x2="1006" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="998" y1="600" x2="1014" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1042" y1="545" x2="1042" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="1034" y1="600" x2="1050" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1078" y1="545" x2="1078" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="1070" y1="600" x2="1086" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1114" y1="545" x2="1114" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="1106" y1="600" x2="1122" y2="600" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          {/* LEFT PINS */}
          <line x1="790" y1="325" x2="730" y2="325" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="730" y1="317" x2="730" y2="333" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="790" y1="360" x2="730" y2="360" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="730" y1="352" x2="730" y2="368" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="790" y1="395" x2="730" y2="395" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="730" y1="387" x2="730" y2="403" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="790" y1="430" x2="730" y2="430" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="730" y1="422" x2="730" y2="438" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="790" y1="465" x2="730" y2="465" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="730" y1="457" x2="730" y2="473" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="790" y1="500" x2="730" y2="500" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="730" y1="492" x2="730" y2="508" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="790" y1="535" x2="730" y2="535" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="730" y1="527" x2="730" y2="543" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          {/* RIGHT PINS */}
          <line x1="1150" y1="325" x2="1210" y2="325" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="1210" y1="317" x2="1210" y2="333" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1150" y1="360" x2="1210" y2="360" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="1210" y1="352" x2="1210" y2="368" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1150" y1="395" x2="1210" y2="395" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="1210" y1="387" x2="1210" y2="403" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1150" y1="430" x2="1210" y2="430" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="1210" y1="422" x2="1210" y2="438" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1150" y1="465" x2="1210" y2="465" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="1210" y1="457" x2="1210" y2="473" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1150" y1="500" x2="1210" y2="500" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="1210" y1="492" x2="1210" y2="508" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          <line x1="1150" y1="535" x2="1210" y2="535" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/><line x1="1210" y1="527" x2="1210" y2="543" stroke={c1} strokeWidth="2" filter="url(#chsglow)"/>
          {/* CIRCUIT TRACES */}
          <path d="M826,240 L826,165 L680,165 L680,60" fill="none" stroke={c1} strokeWidth="1.2" opacity="0.5"/>
          <path d="M1042,240 L1042,185 L1220,185 L1220,110" fill="none" stroke={c2} strokeWidth="1.2" opacity="0.5"/>
          <path d="M862,600 L862,670 L700,670 L700,780" fill="none" stroke={c1} strokeWidth="1.2" opacity="0.5"/>
          <path d="M1078,600 L1078,710 L1280,710 L1280,850" fill="none" stroke={c2} strokeWidth="1" opacity="0.4"/>
          <path d="M730,360 L600,360 L600,240 L460,240" fill="none" stroke={c1} strokeWidth="1.2" opacity="0.5"/>
          <path d="M730,500 L560,500 L560,640 L420,640" fill="none" stroke={c2} strokeWidth="1" opacity="0.4"/>
          <path d="M1210,325 L1270,325 L1270,200" fill="none" stroke={c1} strokeWidth="1.2" opacity="0.5"/>
          <path d="M1210,465 L1260,465 L1260,600" fill="none" stroke={c2} strokeWidth="1" opacity="0.4"/>
          <circle cx="680" cy="165" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="1220" cy="185" r="5" fill={c2} filter="url(#chglow2)"/>
          <circle cx="700" cy="670" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="600" cy="360" r="5" fill={c1} filter="url(#chglow2)"/>
          <circle cx="560" cy="500" r="4" fill={c2} filter="url(#chsglow)"/>
          <circle cx="1270" cy="325" r="4" fill={c1} filter="url(#chsglow)"/>
          {/* SECONDARY CHIP */}
          <rect x="250" y="190" width="210" height="148" rx="5" fill="none" stroke={c2} strokeWidth="1.8" filter="url(#chsglow)" opacity="0.8"/>
          <rect x="266" y="206" width="178" height="116" rx="3" fill="none" stroke={c2} strokeWidth="0.8" opacity="0.3"/>
          <circle cx="355" cy="264" r="7" fill="none" stroke={c2} strokeWidth="1" opacity="0.4"/>
          <circle cx="355" cy="264" r="2.5" fill={c2} filter="url(#chglow)" opacity="0.8"/>
          <rect x="270" y="210" width="10" height="10" fill="none" stroke={c2} strokeWidth="1" opacity="0.7"/>
          <rect x="450" y="210" width="10" height="10" fill="none" stroke={c2} strokeWidth="1" opacity="0.7"/>
          <rect x="270" y="318" width="10" height="10" fill="none" stroke={c2} strokeWidth="1" opacity="0.7"/>
          <rect x="450" y="318" width="10" height="10" fill="none" stroke={c2} strokeWidth="1" opacity="0.7"/>
          <line x1="290" y1="190" x2="290" y2="156" stroke={c2} strokeWidth="1.5" filter="url(#chsglow)" opacity="0.7"/><line x1="283" y1="156" x2="297" y2="156" stroke={c2} strokeWidth="1.5" opacity="0.7"/>
          <line x1="340" y1="190" x2="340" y2="156" stroke={c2} strokeWidth="1.5" filter="url(#chsglow)" opacity="0.7"/><line x1="333" y1="156" x2="347" y2="156" stroke={c2} strokeWidth="1.5" opacity="0.7"/>
          <line x1="390" y1="190" x2="390" y2="156" stroke={c2} strokeWidth="1.5" filter="url(#chsglow)" opacity="0.7"/><line x1="383" y1="156" x2="397" y2="156" stroke={c2} strokeWidth="1.5" opacity="0.7"/>
          <line x1="440" y1="190" x2="440" y2="156" stroke={c2} strokeWidth="1.5" filter="url(#chsglow)" opacity="0.7"/><line x1="433" y1="156" x2="447" y2="156" stroke={c2} strokeWidth="1.5" opacity="0.7"/>
          <line x1="290" y1="338" x2="290" y2="372" stroke={c2} strokeWidth="1.5" filter="url(#chsglow)" opacity="0.65"/><line x1="283" y1="372" x2="297" y2="372" stroke={c2} strokeWidth="1.5" opacity="0.65"/>
          <line x1="390" y1="338" x2="390" y2="372" stroke={c2} strokeWidth="1.5" filter="url(#chsglow)" opacity="0.65"/><line x1="383" y1="372" x2="397" y2="372" stroke={c2} strokeWidth="1.5" opacity="0.65"/>
          <line x1="250" y1="225" x2="218" y2="225" stroke={c2} strokeWidth="1.5" filter="url(#chsglow)" opacity="0.65"/><line x1="218" y1="218" x2="218" y2="232" stroke={c2} strokeWidth="1.5" opacity="0.65"/>
          <line x1="250" y1="264" x2="218" y2="264" stroke={c2} strokeWidth="1.5" filter="url(#chsglow)" opacity="0.65"/><line x1="218" y1="257" x2="218" y2="271" stroke={c2} strokeWidth="1.5" opacity="0.65"/>
          <line x1="250" y1="303" x2="218" y2="303" stroke={c2} strokeWidth="1.5" filter="url(#chsglow)" opacity="0.65"/><line x1="218" y1="296" x2="218" y2="310" stroke={c2} strokeWidth="1.5" opacity="0.65"/>
          <line x1="460" y1="225" x2="492" y2="225" stroke={c2} strokeWidth="1.5" filter="url(#chsglow)" opacity="0.65"/><line x1="492" y1="218" x2="492" y2="232" stroke={c2} strokeWidth="1.5" opacity="0.65"/>
          <line x1="460" y1="264" x2="492" y2="264" stroke={c2} strokeWidth="1.5" filter="url(#chsglow)" opacity="0.65"/><line x1="492" y1="257" x2="492" y2="271" stroke={c2} strokeWidth="1.5" opacity="0.65"/>
          <path d="M492,264 L600,264 L600,360 L730,360" fill="none" stroke={c2} strokeWidth="1" opacity="0.35"/>
          <circle cx="492" cy="264" r="3" fill={c2} filter="url(#chsglow)" opacity="0.7"/>
          <circle cx="600" cy="264" r="3" fill={c2} filter="url(#chsglow)" opacity="0.5"/>
          </svg>
    </div>
  );
}
