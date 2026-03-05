'use client'
interface LogoProps {
  size?: number
  className?: string
}

export default function Logo({ size = 36, className = '' }: LogoProps) {
  const s = size * (88 / 36)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="44" cy="44" r="40" stroke="#E8E4DC" strokeWidth="1.2" fill="none" opacity="0.4" />
      <path
        d="M22 44 C22 30 34 25 44 33 C54 41 62 36 66 28"
        stroke="#7BBFA0"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 54 C28 47 36 44 44 44 C52 44 58 47 66 54"
        stroke="#E8E4DC"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      <circle cx="44" cy="44" r="3.5" fill="#7BBFA0" />
    </svg>
  )
}
