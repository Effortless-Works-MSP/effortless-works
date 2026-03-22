// PhilosophyScene — SVG illustration of the Effortless Works ecosystem
// Business tree (left) · Futuristic house (centre) · Personal tree (right)
// AI companion watering the trees · person silhouette inside the house
// House windows show the four custom-build services

export default function PhilosophyScene() {
  const SAGE   = '#7BBFA0'
  const LAV    = '#9B8ED4'
  const BARK   = '#3a4a3e'
  const BARKLT = '#4d6455'
  const LEAF   = '#2d6b40'
  const LEAFLT = '#3d8c52'
  const WIN    = 'rgba(100,200,220,0.13)'   // window glass tint
  const WINGLOW= 'rgba(100,200,220,0.35)'   // window edge glow
  const AMBER  = 'rgba(240,180,80,0.18)'    // interior warm light

  // ── label box helper ─────────────────────────────────────────────────────
  function Label({ x, y, text, color = SAGE }: { x: number; y: number; text: string; color?: string }) {
    const w = text.length * 6.4 + 20
    const h = 22
    return (
      <g>
        <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={6}
          fill="rgba(12,13,14,0.88)" stroke={color} strokeWidth="0.8" />
        <text x={x} y={y + 4.5} textAnchor="middle"
          fontFamily="Cormorant Garamond, serif" fontSize="11" fill={color} fontWeight="300">
          {text}
        </text>
      </g>
    )
  }

  // ── leaf cluster helper ───────────────────────────────────────────────────
  function Leaves({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) {
    return (
      <g opacity="0.92">
        <ellipse cx={cx}          cy={cy}          rx={rx}          ry={ry}           fill={LEAF}   />
        <ellipse cx={cx - rx*0.5} cy={cy + ry*0.15} rx={rx * 0.65}  ry={ry * 0.6}    fill={LEAFLT} opacity="0.85"/>
        <ellipse cx={cx + rx*0.5} cy={cy + ry*0.1}  rx={rx * 0.62}  ry={ry * 0.58}   fill={LEAF}   opacity="0.8"/>
        <ellipse cx={cx}          cy={cy - ry*0.45}  rx={rx * 0.55}  ry={ry * 0.5}    fill={LEAFLT} opacity="0.9"/>
        <ellipse cx={cx - rx*0.3} cy={cy - ry*0.2}   rx={rx * 0.4}   ry={ry * 0.38}   fill={LEAF}   opacity="0.7"/>
        <ellipse cx={cx + rx*0.3} cy={cy - ry*0.3}   rx={rx * 0.38}  ry={ry * 0.35}   fill={LEAFLT} opacity="0.75"/>
      </g>
    )
  }

  // ── branch helper ─────────────────────────────────────────────────────────
  function Branch({ x1,y1,cpx,cpy,x2,y2,w=1.8 }: { x1:number;y1:number;cpx:number;cpy:number;x2:number;y2:number;w?:number }) {
    return <path d={`M${x1} ${y1} Q${cpx} ${cpy} ${x2} ${y2}`}
      fill="none" stroke={BARK} strokeWidth={w} strokeLinecap="round" />
  }

  return (
    <svg
      viewBox="0 0 1200 520"
      width="100%"
      style={{ display: 'block', overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        {/* Green glow */}
        <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Soft glow for windows */}
        <filter id="glow-win" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* AI orb glow */}
        <filter id="glow-orb" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="10" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Roof gradient */}
        <linearGradient id="roof-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#222b26"/>
          <stop offset="100%" stopColor="#181b1e"/>
        </linearGradient>
        {/* House wall gradient */}
        <linearGradient id="wall-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1f1c"/>
          <stop offset="100%" stopColor="#141618"/>
        </linearGradient>
        {/* Ground gradient */}
        <linearGradient id="ground-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="20%" stopColor="rgba(61,140,82,0.18)"/>
          <stop offset="50%" stopColor="rgba(61,140,82,0.08)"/>
          <stop offset="80%" stopColor="rgba(61,140,82,0.18)"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        {/* Window amber gradient */}
        <radialGradient id="win-amber" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="rgba(240,180,80,0.22)"/>
          <stop offset="100%" stopColor="rgba(240,180,80,0.04)"/>
        </radialGradient>
        {/* Window cool gradient */}
        <radialGradient id="win-cool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(100,200,230,0.18)"/>
          <stop offset="100%" stopColor="rgba(100,200,230,0.04)"/>
        </radialGradient>
        {/* AI water beam gradient */}
        <linearGradient id="water-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={SAGE} stopOpacity="0.7"/>
          <stop offset="100%" stopColor={SAGE} stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* ── CSS animations ── */}
      <style>{`
        @keyframes orb-pulse {
          0%,100% { opacity:0.85; r:18; }
          50%      { opacity:1;    r:22; }
        }
        @keyframes orb-ring {
          0%,100% { opacity:0.4; }
          50%      { opacity:0.8; }
        }
        @keyframes water-flow {
          0%   { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0;  }
        }
        @keyframes win-flicker {
          0%,100% { opacity:1; }
          45%      { opacity:0.88; }
          50%      { opacity:0.95; }
        }
        @keyframes label-float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-2px); }
        }
      `}</style>

      {/* ── Ground ── */}
      <rect x="0" y="468" width="1200" height="6" fill="url(#ground-grad)" rx="3"/>
      <line x1="0" y1="470" x2="1200" y2="470" stroke="rgba(61,140,82,0.22)" strokeWidth="1"/>

      {/* ══════════════════════════════════════════════════════════════════════
          LEFT TREE — Business Systems
         ══════════════════════════════════════════════════════════════════════ */}

      {/* Root buttresses */}
      <path d={`M155 470 Q110 465 72 472`} fill="none" stroke={BARK} strokeWidth="5" strokeLinecap="round"/>
      <path d={`M160 470 Q205 462 242 470`} fill="none" stroke={BARK} strokeWidth="4.5" strokeLinecap="round"/>
      <path d={`M157 470 Q145 466 130 474`} fill="none" stroke={BARKLT} strokeWidth="3" strokeLinecap="round"/>
      <path d={`M163 470 Q175 466 188 473`} fill="none" stroke={BARKLT} strokeWidth="2.8" strokeLinecap="round"/>

      {/* Main trunk — tapered, organic */}
      <path d={`M145 470 C142 420 150 370 148 310 C146 265 150 230 152 200 L168 200 C166 230 170 265 168 310 C166 370 174 420 171 470 Z`}
        fill={BARK}/>
      <path d={`M153 470 C150 420 155 380 153 320 C151 275 154 238 155 210 L162 210 C162 238 163 275 161 320 C159 380 162 420 159 470 Z`}
        fill={BARKLT} opacity="0.6"/>

      {/* Main branches — from different trunk heights */}
      {/* Back Office — lower left */}
      <path d={`M150 360 C120 340 70 310 22 295`} fill="none" stroke={BARK} strokeWidth="3.5" strokeLinecap="round"/>
      <path d={`M150 360 C120 345 80 322 30 312`} fill="none" stroke={BARKLT} strokeWidth="1.8" strokeLinecap="round"/>
      {/* Sub-branches off Back Office */}
      <Branch x1={80} y1={326} cpx={55} cpy={305} x2={28} y2={300}/>
      <Branch x1={80} y1={326} cpx={70} cpy={298} x2={52} y2={280}/>

      {/* Project Management — middle, going up */}
      <path d={`M152 300 C145 265 150 230 148 190`} fill="none" stroke={BARK} strokeWidth="3" strokeLinecap="round"/>
      <path d={`M148 190 C130 170 90 155 45 152`} fill="none" stroke={BARK} strokeWidth="2.8" strokeLinecap="round"/>
      <Branch x1={100} y1={172} cpx={72} cpy={155} x2={42} y2={160}/>
      <Branch x1={100} y1={172} cpx={85} cpy={148} x2={65} y2={132}/>

      {/* Career Compass — upper right */}
      <path d={`M162 265 C180 245 215 225 268 210`} fill="none" stroke={BARK} strokeWidth="2.8" strokeLinecap="round"/>
      <Branch x1={215} y1={218} cpx={245} cpy={200} x2={292} y2={198}/>
      <Branch x1={215} y1={218} cpx={230} cpy={205} x2={252} y2={192}/>

      {/* Business Dashboard / root — short thick downward branch */}
      <path d={`M155 420 C140 430 120 440 90 445`} fill="none" stroke={BARKLT} strokeWidth="2.5" strokeLinecap="round"/>

      {/* ── Left tree foliage ── */}
      {/* Main crown */}
      <Leaves cx={155} cy={170} rx={110} ry={95}/>
      {/* Branch tip clusters */}
      <Leaves cx={28}  cy={290} rx={52}  ry={42}/>
      <Leaves cx={60}  cy={148} rx={55}  ry={48}/>
      <Leaves cx={290} cy={200} rx={48}  ry={42}/>
      {/* Extra fill */}
      <ellipse cx={120} cy={145} rx={40} ry={35} fill={LEAF} opacity="0.7"/>
      <ellipse cx={200} cy={165} rx={38} ry={32} fill={LEAFLT} opacity="0.65"/>

      {/* ── Left tree product labels ── */}
      <g style={{ animation: 'label-float 4s ease-in-out infinite' }}>
        <Label x={18}  y={275} text="Back Office"/>
      </g>
      <g style={{ animation: 'label-float 4.5s ease-in-out infinite' }}>
        <Label x={52}  y={140} text="Project Management"/>
      </g>
      <g style={{ animation: 'label-float 5s ease-in-out infinite' }}>
        <Label x={308} y={196} text="Career Compass" color={LAV}/>
      </g>
      {/* Section heading */}
      <text x={155} y={55} textAnchor="middle"
        fontFamily="Cormorant Garamond, serif" fontSize="13" fill="rgba(232,228,220,0.28)"
        fontWeight="300" letterSpacing="0.2em">
        BUSINESS
      </text>
      <line x1={90} y1={63} x2={220} y2={63} stroke="rgba(123,191,160,0.2)" strokeWidth="0.8"/>

      {/* ══════════════════════════════════════════════════════════════════════
          HOUSE — centre
         ══════════════════════════════════════════════════════════════════════ */}

      {/* Foundation / plinth */}
      <rect x="432" y="455" width="336" height="18" rx="3" fill="#1e2420"/>
      <rect x="440" y="452" width="320" height="8"  rx="2" fill="#252e28"/>

      {/* Main walls */}
      <rect x="448" y="218" width="304" height="240" fill="url(#wall-grad)"/>

      {/* Roof */}
      <polygon points="428,218 600,128 772,218" fill="url(#roof-grad)"/>
      {/* Roof edge LED glow */}
      <line x1="428" y1="218" x2="600" y2="128" stroke={SAGE} strokeWidth="1.2" opacity="0.45"/>
      <line x1="600" y1="128" x2="772" y2="218" stroke={SAGE} strokeWidth="1.2" opacity="0.45"/>
      {/* Roof ridge detail */}
      <line x1="428" y1="218" x2="772" y2="218" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      {/* Roof antenna */}
      <line x1="600" y1="128" x2="600" y2="108" stroke="rgba(123,191,160,0.5)" strokeWidth="1.5"/>
      <circle cx="600" cy="105" r="3.5" fill={SAGE} filter="url(#glow-green)" opacity="0.8"/>

      {/* Wall horizontal LED strip */}
      <rect x="448" y="218" width="304" height="2" fill={SAGE} opacity="0.15"/>

      {/* ── Windows (4 services) ── */}

      {/* Top-left: Website Builder */}
      <g filter="url(#glow-win)">
        <rect x="460" y="232" width="98" height="76" rx="4" fill="url(#win-cool)" stroke={WINGLOW} strokeWidth="0.8"/>
      </g>
      {/* website icon: browser bars */}
      <rect x="470" y="242" width="78" height="10" rx="2" fill="rgba(100,200,220,0.3)"/>
      <rect x="470" y="256" width="35" height="5" rx="1" fill="rgba(100,200,220,0.2)"/>
      <rect x="470" y="264" width="50" height="5" rx="1" fill="rgba(100,200,220,0.15)"/>
      <rect x="470" y="272" width="40" height="5" rx="1" fill="rgba(100,200,220,0.12)"/>
      <rect x="470" y="280" width="60" height="5" rx="1" fill="rgba(100,200,220,0.1)"/>
      <text x="509" y="321" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
        fontSize="10" fill="rgba(100,200,220,0.7)" fontWeight="300">Website Builder</text>

      {/* Top-right: App Builder */}
      <g filter="url(#glow-win)">
        <rect x="642" y="232" width="98" height="76" rx="4" fill="url(#win-cool)" stroke={WINGLOW} strokeWidth="0.8"/>
      </g>
      {/* app icon: dot grid */}
      {[0,1,2].map(row => [0,1,2].map(col => (
        <circle key={`${row}-${col}`}
          cx={666 + col * 18} cy={252 + row * 18} r="5"
          fill="rgba(100,200,220,0.3)"/>
      )))}
      <text x="691" y="321" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
        fontSize="10" fill="rgba(100,200,220,0.7)" fontWeight="300">App Builder</text>

      {/* Bottom-left: Custom Sheets */}
      <g filter="url(#glow-win)">
        <rect x="460" y="322" width="98" height="66" rx="4" fill="url(#win-cool)" stroke={WINGLOW} strokeWidth="0.8"/>
      </g>
      {/* sheets icon: grid lines */}
      {[0,1,2,3].map(i => (
        <line key={`h${i}`} x1="466" y1={332 + i*10} x2="552" y2={332 + i*10}
          stroke="rgba(100,200,220,0.25)" strokeWidth="1"/>
      ))}
      {[0,1,2,3,4].map(i => (
        <line key={`v${i}`} x1={466 + i*17} y1="330" x2={466 + i*17} y2="380"
          stroke="rgba(100,200,220,0.25)" strokeWidth="1"/>
      ))}
      <rect x="466" y="330" width="17" height="10" rx="0" fill="rgba(100,200,220,0.18)"/>
      <text x="509" y="399" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
        fontSize="10" fill="rgba(100,200,220,0.7)" fontWeight="300">Custom Sheets</text>

      {/* Bottom-right: Custom Notion */}
      <g filter="url(#glow-win)">
        <rect x="642" y="322" width="98" height="66" rx="4" fill="url(#win-cool)" stroke={WINGLOW} strokeWidth="0.8"/>
      </g>
      {/* notion icon: diamond */}
      <polygon points="691,335 711,355 691,375 671,355" fill="none"
        stroke="rgba(100,200,220,0.4)" strokeWidth="1.5"/>
      <polygon points="691,342 704,355 691,368 678,355" fill="rgba(100,200,220,0.15)"/>
      <text x="691" y="399" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
        fontSize="10" fill="rgba(100,200,220,0.7)" fontWeight="300">Custom Notion</text>

      {/* ── Centre door / panoramic window — person silhouette inside ── */}
      <g filter="url(#glow-win)">
        <rect x="543" y="248" width="114" height="162" rx="5"
          fill="url(#win-amber)" stroke="rgba(240,180,80,0.3)" strokeWidth="1"/>
      </g>
      {/* Interior warm glow */}
      <ellipse cx="600" cy="360" rx="50" ry="30" fill="rgba(240,180,80,0.08)"/>

      {/* Person silhouette */}
      <g fill="#0c0d0e" opacity="0.75">
        {/* head */}
        <circle cx="600" cy="290" r="13"/>
        {/* torso */}
        <path d="M585 305 Q580 335 582 370 L618 370 Q620 335 615 305 Z"/>
        {/* arms */}
        <path d="M585 312 Q572 325 568 342 Q570 345 574 344 Q578 330 588 318 Z"/>
        <path d="M615 312 Q628 325 632 342 Q630 345 626 344 Q622 330 612 318 Z"/>
        {/* legs */}
        <path d="M590 368 Q587 395 586 410 L596 410 Q596 385 600 368 Z"/>
        <path d="M610 368 Q613 395 614 410 L604 410 Q604 385 600 368 Z"/>
      </g>

      {/* Door frame bottom line */}
      <rect x="543" y="408" width="114" height="3" rx="1" fill="rgba(255,255,255,0.06)"/>

      {/* Window label tags */}
      <text x="460" y="228" fontFamily="Cormorant Garamond, serif" fontSize="8"
        fill="rgba(232,228,220,0.25)" letterSpacing="0.15em">CUSTOM BUILD</text>

      {/* ══════════════════════════════════════════════════════════════════════
          RIGHT TREE — Personal Systems
         ══════════════════════════════════════════════════════════════════════ */}

      {/* Root buttresses */}
      <path d={`M1042 470 Q1090 462 1130 470`} fill="none" stroke={BARK} strokeWidth="5" strokeLinecap="round"/>
      <path d={`M1038 470 Q992 462 958 470`}  fill="none" stroke={BARK} strokeWidth="4.5" strokeLinecap="round"/>
      <path d={`M1040 470 Q1055 465 1072 474`} fill="none" stroke={BARKLT} strokeWidth="3" strokeLinecap="round"/>
      <path d={`M1040 470 Q1025 465 1008 473`} fill="none" stroke={BARKLT} strokeWidth="2.8" strokeLinecap="round"/>

      {/* Trunk */}
      <path d={`M1030 470 C1028 415 1035 360 1033 295 C1031 250 1035 210 1036 175 L1052 175 C1053 210 1057 250 1055 295 C1053 360 1060 415 1058 470 Z`}
        fill={BARK}/>
      <path d={`M1037 470 C1035 420 1040 370 1038 310 C1036 268 1038 228 1040 195 L1047 195 C1047 228 1048 268 1046 310 C1044 370 1047 420 1045 470 Z`}
        fill={BARKLT} opacity="0.6"/>

      {/* Branches — 6 products staggered left-right */}
      {/* Personal Trackers — right, mid-high */}
      <path d={`M1052 295 C1075 275 1110 258 1162 248`} fill="none" stroke={BARK} strokeWidth="3.2" strokeLinecap="round"/>
      <Branch x1={1110} y1={258} cpx={1145} cpy={242} x2={1178} y2={240}/>
      <Branch x1={1110} y1={258} cpx={1130} cpy={240} x2={1148} y2={224}/>

      {/* Personal Projects — right, lower */}
      <path d={`M1054 340 C1078 325 1115 315 1162 312`} fill="none" stroke={BARK} strokeWidth="3" strokeLinecap="round"/>
      <Branch x1={1115} y1={316} cpx={1145} cpy={305} x2={1172} y2={305}/>

      {/* Life Tracker — top, centre */}
      <path d={`M1042 220 C1042 200 1042 182 1042 160`} fill="none" stroke={BARK} strokeWidth="3.5" strokeLinecap="round"/>
      <Branch x1={1042} y1={160} cpx={1025} cpy={138} x2={1010} y2={118}/>
      <Branch x1={1042} y1={160} cpx={1058} cpy={138} x2={1075} y2={118}/>

      {/* Connection Keeper — left, mid-high */}
      <path d={`M1035 285 C1010 268 968 252 915 242`} fill="none" stroke={BARK} strokeWidth="3" strokeLinecap="round"/>
      <Branch x1={968} y1={252} cpx={938} cpy={238} x2={900} y2={232}/>
      <Branch x1={968} y1={252} cpx={950} cpy={236} x2={928} y2={218}/>

      {/* Journey Planner — left, middle */}
      <path d={`M1033 330 C1008 318 962 308 912 305`} fill="none" stroke={BARK} strokeWidth="2.8" strokeLinecap="round"/>
      <Branch x1={962} y1={308} cpx={932} cpy={298} x2={898} y2={298}/>

      {/* Creative Studio — left, lower */}
      <path d={`M1032 370 C1005 360 960 354 912 352`} fill="none" stroke={BARKLT} strokeWidth="2.5" strokeLinecap="round"/>
      <Branch x1={958} y1={355} cpx={930} cpy={348} x2={898} y2={346}/>

      {/* ── Right tree foliage ── */}
      <Leaves cx={1042} cy={148} rx={105} ry={90}/>
      <Leaves cx={1165} cy={238} rx={48}  ry={42}/>
      <Leaves cx={1165} cy={308} rx={44}  ry={38}/>
      <Leaves cx={898}  cy={232} rx={46}  ry={40}/>
      <Leaves cx={895}  cy={300} rx={42}  ry={36}/>
      <Leaves cx={895}  cy={345} rx={38}  ry={32}/>
      <ellipse cx={1100} cy={135} rx={42} ry={36} fill={LEAF}   opacity="0.75"/>
      <ellipse cx={980}  cy={138} rx={40} ry={34} fill={LEAFLT} opacity="0.7"/>

      {/* ── Right tree product labels ── */}
      <g style={{ animation: 'label-float 3.8s ease-in-out infinite' }}>
        <Label x={1182} y={232} text="Personal Trackers"/>
      </g>
      <g style={{ animation: 'label-float 4.4s ease-in-out infinite' }}>
        <Label x={1182} y={305} text="Personal Projects"/>
      </g>
      <g style={{ animation: 'label-float 5.2s ease-in-out infinite' }}>
        <Label x={1042} y={100} text="Life Tracker"/>
      </g>
      <g style={{ animation: 'label-float 3.5s ease-in-out infinite' }}>
        <Label x={876}  y={222} text="Connection Keeper" color={LAV}/>
      </g>
      <g style={{ animation: 'label-float 4.8s ease-in-out infinite' }}>
        <Label x={870}  y={298} text="Journey Planner" color={LAV}/>
      </g>
      <g style={{ animation: 'label-float 5.5s ease-in-out infinite' }}>
        <Label x={876}  y={346} text="Creative Studio" color={LAV}/>
      </g>

      {/* Section heading */}
      <text x={1042} y={55} textAnchor="middle"
        fontFamily="Cormorant Garamond, serif" fontSize="13" fill="rgba(232,228,220,0.28)"
        fontWeight="300" letterSpacing="0.2em">
        PERSONAL
      </text>
      <line x1={975} y1={63} x2={1110} y2={63} stroke="rgba(155,142,212,0.2)" strokeWidth="0.8"/>

      {/* ══════════════════════════════════════════════════════════════════════
          AI COMPANION — between house and personal tree, watering
         ══════════════════════════════════════════════════════════════════════ */}

      {/* Water beam from AI to tree base */}
      <path d={`M836 435 C880 440 940 452 1040 460`}
        fill="none" stroke="url(#water-grad)" strokeWidth="2"
        strokeDasharray="6 4"
        style={{ animation: 'water-flow 1.5s linear infinite' }}/>
      {/* Droplet dots along beam */}
      {[0.2, 0.45, 0.68].map((t, i) => {
        const x = 836 + t * (1040 - 836)
        const y = 435 + t * (460 - 435) + Math.sin(t * Math.PI) * 5
        return <circle key={i} cx={x} cy={y} r="2.5"
          fill={SAGE} opacity={0.6 - t * 0.3}/>
      })}

      {/* AI companion body */}
      {/* Outer ring glow */}
      <circle cx="820" cy="428" r="30" fill="none" stroke={SAGE} strokeWidth="0.5"
        opacity="0.2" style={{ animation: 'orb-ring 2.5s ease-in-out infinite' }}/>
      {/* Main orb */}
      <circle cx="820" cy="428" r="18" fill="rgba(12,13,14,0.9)" stroke={SAGE} strokeWidth="1.2"
        filter="url(#glow-orb)"
        style={{ animation: 'orb-pulse 2.5s ease-in-out infinite' }}/>
      {/* Inner glow core */}
      <circle cx="820" cy="426" r="8" fill={SAGE} opacity="0.2"/>
      {/* AI eye(s) */}
      <circle cx="815" cy="425" r="2.5" fill={SAGE} opacity="0.8"/>
      <circle cx="825" cy="425" r="2.5" fill={SAGE} opacity="0.8"/>
      {/* Watering arm */}
      <path d={`M832 432 Q845 430 852 435`} fill="none" stroke={SAGE}
        strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      {/* Small "watering can" nozzle */}
      <circle cx="854" cy="436" r="3" fill={SAGE} opacity="0.5"/>

      {/* AI label */}
      <text x="820" y="458" textAnchor="middle"
        fontFamily="Cormorant Garamond, serif" fontSize="9"
        fill="rgba(123,191,160,0.45)" letterSpacing="0.15em">
        AI COMPANION
      </text>
    </svg>
  )
}
