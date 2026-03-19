'use client'

import { useEffect, useRef } from 'react'

const WORDS = [
  // Faith & spirituality
  'Fajr Prayer', 'Gratitude','Dhuhr Prayer', 'Prayer','Asr Prayer', 'Intention', 'Maghrib','Barakah', 'Dhikr',
  'Tawakkul','Isha Prayer', 'Purpose','Duha Prayer','Tahajjud Prayer', 'Bismillah', 'Peace of Mind', 'Reflection',

  // Health & body
  'Morning Run', '3am Wake Up','Gym Day', 'Meal Prep', 'Rest Day', 'Hydration',
  'Strength', 'Consistency', 'Sleep Routine', 'Stretch', 'Walk Outside', '5am Club', 'Self Care', 'Nature Time',

  // Family & relationships
  'Date Night', 'Family Dinner', 'Quality Time', 'Present Mom',
  'Check In', 'Community', 'Support System', 'Love Languages', 'Have Kids',

  // Career & business
  'First Client', 'Promotion', 'Launch Day', 'Dream Job', 'Side Hustle',
  'Passive Income', 'Business Owner', 'Quit the 9-5', 'Raise',
  'Team of One', 'Sold Out', 'Going Viral', 'Brand Deal',

  // Personal growth
  'Reading List', 'New Skill', 'Journaling', 'Therapy', 'Boundaries',
  'Self Discipline', 'Growth Mindset', 'Course Complete', 'Leveling Up',

  // Organization & planning
  'Sunday Reset', 'Weekly Review', 'Vision Board', 'Goal Setting',
  'Inbox Zero', 'Clear Desk', 'Done List', 'Morning Routine',
  'Brain Dump', 'Deep Work', 'Focus Mode',

  // Dreams & milestones
  'Dream Home', 'Paid Off', 'Debt Free', 'Savings Goal', 'Travel Fund',
  'First Investment', 'Emergency Fund', 'Financial Freedom',
   'Travel', 'Passport Stamp', 'Move Abroad', 'Dream Car',

  // Identity & feeling
   'Intentional', 'Grounded', 'Unbothered', 'Thriving',
  'Aligned', 'In My Era', 'That Girl', 'Healing', 'Becoming',
]

const PALETTES = [
  ['#7bbfa0', '#5da882', '#9fd4b8'],   // sage
  ['#a0c4ff', '#7aaee8', '#c0d8ff'],   // blue
  ['#fbbf24', '#e8a800', '#fdd060'],   // gold
  ['#fda4af', '#f07080', '#fec4cc'],   // pink
  ['#c4b5fd', '#a090e8', '#d8ccff'],   // lavender
]

interface Drop {
  x: number
  y: number
  speed: number
  word: string
  fontSize: number
  opacity: number
  colorSet: string[]
  colorIdx: number
  colorT: number
  colorSpeed: number
  char: number
  charSpeed: number
}

function lerpHex(a: string, b: string, t: number): string {
  const ah = parseInt(a.slice(1), 16)
  const bh = parseInt(b.slice(1), 16)
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const bv = Math.round(ab + (bb - ab) * t)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bv.toString(16).padStart(2, '0')}`
}

function makeDrop(W: number, H: number, randomY = false): Drop {
  const colorSet = PALETTES[Math.floor(Math.random() * PALETTES.length)]
  return {
    x: Math.random() * W,
    y: randomY ? Math.random() * H : -80,
    speed: 0.35 + Math.random() * 0.95,
    word: WORDS[Math.floor(Math.random() * WORDS.length)],
    fontSize: 9 + Math.floor(Math.random() * 9),
    opacity: randomY ? Math.random() * 0.7 : 0,
    colorSet,
    colorIdx: Math.floor(Math.random() * colorSet.length),
    colorT: Math.random(),
    colorSpeed: 0.004 + Math.random() * 0.007,
    char: randomY ? 999 : 0,
    charSpeed: 0.15 + Math.random() * 0.25,
  }
}

export default function HeroIllustration() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<Drop[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W * window.devicePixelRatio
      canvas.height = H * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    dropsRef.current = Array.from({ length: 60 }, () => makeDrop(W, H, true))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const drops = dropsRef.current
      const t = Date.now()

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i]

        d.y += d.speed
        d.char = Math.min(d.word.length, d.char + d.charSpeed)

        if (d.y < H * 0.12) {
          d.opacity = Math.min(0.9, d.opacity + 0.018)
        } else if (d.y > H * 0.80) {
          d.opacity = Math.max(0, d.opacity - 0.022)
        } else {
          d.opacity = Math.min(0.85, d.opacity + 0.015)
        }

        d.colorT += d.colorSpeed
        if (d.colorT >= 1) {
          d.colorT -= 1
          d.colorIdx = (d.colorIdx + 1) % d.colorSet.length
        }
        const nextIdx = (d.colorIdx + 1) % d.colorSet.length
        const color = lerpHex(d.colorSet[d.colorIdx], d.colorSet[nextIdx], d.colorT)

        const visible = d.word.slice(0, Math.floor(d.char)).toUpperCase()
        if (!visible) continue

        const pulse = 0.75 + 0.25 * Math.sin(t * 0.001 + i * 1.3)

        ctx.save()
        ctx.font = `${d.fontSize}px 'Georgia', serif`
        ctx.fillStyle = color
        ctx.globalAlpha = d.opacity * pulse
        ctx.textBaseline = 'middle'
        ctx.shadowColor = color
        ctx.shadowBlur = 10
        ctx.fillText(visible, d.x, d.y)
        ctx.restore()

        if (d.y > H + 60 || (d.opacity <= 0 && d.y > H * 0.5)) {
          drops[i] = makeDrop(W, H, false)
        }
      }

      if (Math.random() < 0.05 && drops.length < 75) {
        drops.push(makeDrop(W, H, false))
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="hidden md:block"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to right, var(--bg) 26%, rgba(0,0,0,0.15) 52%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 10%, transparent 88%, var(--bg) 100%)',
        }}
      />
    </div>
  )
}
