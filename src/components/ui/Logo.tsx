'use client'

interface LogoProps {
  size?: number
  className?: string
}

// size controls the circle mark height. Text scales proportionally alongside it.
export default function Logo({ size = 40, className = '' }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.3 }} className={className}>
      {/* Circle mark SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 88 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Circle */}
        <circle cx="44" cy="44" r="40" stroke="#E8E4DC" strokeWidth="1.5" fill="none" />

        {/* Upper flowing green curve */}
        <path
          d="M22 44 C22 30 34 25 44 33 C54 41 62 36 66 28"
          stroke="#6B8F71"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Lower subtle curve */}
        <path
          d="M22 54 C28 47 36 44 44 44 C52 44 58 47 66 54"
          stroke="#A8BFBA"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Center anchor dot */}
        <circle cx="44" cy="44" r="3.5" fill="#6B8F71" />
      </svg>

      {/* Wordmark as real HTML text — always crisp */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: size * 0.04 }}>
        <span style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontWeight: 300,
          fontSize: size * 0.55,
          letterSpacing: '0.08em',
          color: '#D6E4E1',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}>
          Effortless
        </span>
        <span style={{
          fontFamily: 'DM Sans, Helvetica Neue, sans-serif',
          fontWeight: 300,
          fontSize: size * 0.2,
          letterSpacing: '0.4em',
          color: '#6B8F71',
          textTransform: 'uppercase' as const,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}>
          Works
        </span>
      </div>
    </div>
  )
}
