'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  opacity: number
  depth: number // 0–1, controls parallax strength
}

export default function ParallaxStars({ count = 120 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const currentOffsetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
      initStars()
    }

    const initStars = () => {
      starsRef.current = Array.from({ length: count }, () => {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 1.4 + 0.3,
          opacity: Math.random() * 0.55 + 0.15,
          depth: Math.random() * 0.8 + 0.1,
        }
      })
    }

    const drawStar = (ctx: CanvasRenderingContext2D, star: Star) => {
      const { x, y, size, opacity } = star

      // 4-point star shape
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.translate(x, y)

      const inner = size * 0.35
      const outer = size

      ctx.beginPath()
      for (let i = 0; i < 4; i++) {
        const outerAngle = (i * Math.PI) / 2 - Math.PI / 2
        const innerAngle = outerAngle + Math.PI / 4

        if (i === 0) {
          ctx.moveTo(Math.cos(outerAngle) * outer, Math.sin(outerAngle) * outer)
        } else {
          ctx.lineTo(Math.cos(outerAngle) * outer, Math.sin(outerAngle) * outer)
        }
        ctx.lineTo(Math.cos(innerAngle) * inner, Math.sin(innerAngle) * inner)
      }
      ctx.closePath()

      // Soft glow fill
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, outer * 2)
      grad.addColorStop(0, 'rgba(123, 191, 160, 0.9)')
      grad.addColorStop(0.4, 'rgba(200, 230, 220, 0.6)')
      grad.addColorStop(1, 'rgba(123, 191, 160, 0)')
      ctx.fillStyle = grad
      ctx.fill()

      // Bright center point
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(220, 240, 235, 0.9)'
      ctx.fill()

      ctx.restore()
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Smoothly lerp the offset toward mouse target
      const targetX = mouseRef.current.x
      const targetY = mouseRef.current.y
      currentOffsetRef.current.x += (targetX - currentOffsetRef.current.x) * 0.04
      currentOffsetRef.current.y += (targetY - currentOffsetRef.current.y) * 0.04

      const ox = currentOffsetRef.current.x
      const oy = currentOffsetRef.current.y

      for (const star of starsRef.current) {
        star.x = star.baseX + ox * star.depth * 30
        star.y = star.baseY + oy * star.depth * 30
        drawStar(ctx, star)
      }

      rafRef.current = requestAnimationFrame(render)
    }

    const onMouseMove = (e: MouseEvent) => {
      // Normalize to -1..1 relative to window center
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    resize()
    render()

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.75 }}
      />
    </div>
  )
}
