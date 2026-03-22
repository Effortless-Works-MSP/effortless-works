'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ─── Shared helpers ───────────────────────────────────────────────────────────

const GOLD   = 0xF5C842
const GOLD_E = 0xB87000
const BG     = 0x0c0d0e

function solidGold(emissiveInt = 1.1) {
  return new THREE.MeshStandardMaterial({
    color: GOLD, emissive: GOLD_E,
    emissiveIntensity: emissiveInt,
    metalness: 0.80, roughness: 0.08,
  })
}

function bloom(scene: THREE.Scene) {
  scene.add(new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 16, 16),
    new THREE.MeshBasicMaterial({
      color: GOLD, transparent: true, opacity: 0.05,
      blending: THREE.AdditiveBlending, side: THREE.BackSide, depthWrite: false,
    })
  ))
}

function setupScene(el: HTMLDivElement) {
  const scene    = new THREE.Scene()
  const camera   = new THREE.PerspectiveCamera(42, 1, 0.1, 50)
  camera.position.set(0, 0, 3.2)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  renderer.setSize(300, 300)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(BG, 1)
  el.appendChild(renderer.domElement)
  scene.add(new THREE.AmbientLight(0x1a1a14, 0.5))
  const pl = new THREE.PointLight(GOLD, 3, 10)
  scene.add(pl)
  return { scene, camera, renderer, pl }
}

// ─── Logo geometry constants ──────────────────────────────────────────────────

const V_CX = -0.16,  V_CY =  0.06   // vertical oval centre
const H_CX =  0.10,  H_CY = -0.27   // horizontal oval centre
const TORUS_V_R  = 0.26              // vertical oval radius
const TORUS_H_R  = 0.22              // horizontal oval radius
const SCALE_V    = 1.55              // vertical scale (makes it tall)
const SCALE_H    = 1.60              // horizontal scale (makes it wide)

// Exact ellipse path the orbit sphere must follow
const V_RX = TORUS_V_R,             V_RY = TORUS_V_R * SCALE_V
const H_RX = TORUS_H_R * SCALE_H,   H_RY = TORUS_H_R

// ─── Logo builders ────────────────────────────────────────────────────────────

// Full bright logo — thin tube matching the animation rails
function buildLogo(scene: THREE.Scene) {
  const mat = solidGold(1.2)

  const vOval = new THREE.Mesh(new THREE.TorusGeometry(TORUS_V_R, 0.016, 12, 80), mat)
  vOval.scale.y = SCALE_V
  vOval.position.set(V_CX, V_CY, 0)
  scene.add(vOval)

  const hOval = new THREE.Mesh(new THREE.TorusGeometry(TORUS_H_R, 0.016, 12, 80), mat)
  hOval.scale.x = SCALE_H
  hOval.position.set(H_CX, H_CY, 0)
  scene.add(hOval)

  const node = new THREE.Mesh(
    new THREE.SphereGeometry(0.062, 14, 14),
    new THREE.MeshStandardMaterial({
      color: 0xFFE040, emissive: GOLD, emissiveIntensity: 2.8,
      metalness: 0.95, roughness: 0.02,
    })
  )
  node.position.set(V_CX, H_CY, 0)
  scene.add(node)
  bloom(scene)
}

// Thin rail logo — very transparent so beads stand out
function buildRailLogo(scene: THREE.Scene) {
  const mat = new THREE.MeshStandardMaterial({
    color: GOLD, emissive: GOLD_E,
    emissiveIntensity: 0.4,
    metalness: 0.80, roughness: 0.08,
    transparent: true, opacity: 0.25,
  })

  const vOval = new THREE.Mesh(new THREE.TorusGeometry(TORUS_V_R, 0.016, 12, 80), mat)
  vOval.scale.y = SCALE_V
  vOval.position.set(V_CX, V_CY, 0)
  scene.add(vOval)

  const hOval = new THREE.Mesh(new THREE.TorusGeometry(TORUS_H_R, 0.016, 12, 80), mat)
  hOval.scale.x = SCALE_H
  hOval.position.set(H_CX, H_CY, 0)
  scene.add(hOval)

  const node = new THREE.Mesh(
    new THREE.SphereGeometry(0.028, 12, 12),
    new THREE.MeshStandardMaterial({
      color: 0xFFE040, emissive: GOLD, emissiveIntensity: 1.0,
      metalness: 0.95, roughness: 0.02,
      transparent: true, opacity: 0.35,
    })
  )
  node.position.set(V_CX, H_CY, 0)
  scene.add(node)
}

function makeBead(radius: number, intensity: number, opacity = 1) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, 14, 14),
    new THREE.MeshStandardMaterial({
      color: 0xFFEE60, emissive: GOLD, emissiveIntensity: intensity,
      metalness: 0.95, roughness: 0.02,
      transparent: opacity < 1, opacity,
    })
  )
}

// ─── Canvas wrapper ───────────────────────────────────────────────────────────

function Canvas({ mountRef, label }: {
  mountRef: React.RefObject<HTMLDivElement>
  label: string
}) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div ref={mountRef} style={{
        width: 300, height: 300, borderRadius: 14, overflow: 'hidden',
        border: '1px solid rgba(245,200,66,0.15)', display: 'inline-block',
      }} />
      <div style={{
        marginTop: 14, fontFamily: "'Cormorant Garamond', serif",
        fontSize: '1rem', fontWeight: 300,
        color: 'rgba(232,228,220,0.6)', letterSpacing: '.12em', textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  )
}

// ─── 1. Logo ──────────────────────────────────────────────────────────────────

function LogoCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = mountRef.current; if (!el) return
    const { scene, camera, renderer, pl } = setupScene(el)
    buildLogo(scene)
    const group = new THREE.Group()
    scene.add(group)

    // collect all scene objects into the group so we can tilt the whole logo
    // (buildLogo adds directly to scene, so just animate the camera instead)
    let id: number, t = 0
    const go = () => {
      id = requestAnimationFrame(go); t += 0.004
      // Gentle watch / tilt
      camera.position.x = Math.sin(t * 0.3) * 0.18
      camera.position.y = Math.sin(t * 0.22) * 0.10 + 0.05
      camera.lookAt(0, -0.10, 0)
      pl.intensity = 2.8 + Math.sin(t * 1.8) * 0.5
      renderer.render(scene, camera)
    }
    go()
    return () => { cancelAnimationFrame(id); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); renderer.dispose() }
  }, [])
  return <Canvas mountRef={mountRef} label="Logo" />
}

// ─── Shared path: both ovals ──────────────────────────────────────────────────
// Full cycle: V oval → short lerp → H oval → short lerp → repeat.
// Both transition points share x = V_CX so the lerp is a tiny vertical movement
// that naturally passes through the corner area — nearly invisible at speed.

// The two ellipses intersect at exactly (-0.242, -0.322).
// V oval passes through it at angle V_XING, H oval at H_XING.
// Switching ovals at this shared point = zero position gap, fully seamless.
const V_XING = -1.893   // angle on V oval at intersection
const H_XING = -2.904   // angle on H oval at intersection
const FULL_PATH = Math.PI * 4

function lumaPath(a: number): [number, number] {
  const phase = ((a % FULL_PATH) + FULL_PATH) % FULL_PATH
  if (phase < Math.PI * 2) {
    const angle = phase + V_XING
    return [V_CX + Math.cos(angle) * V_RX, V_CY + Math.sin(angle) * V_RY]
  } else {
    const angle = (phase - Math.PI * 2) + H_XING
    return [H_CX + Math.cos(angle) * H_RX, H_CY + Math.sin(angle) * H_RY]
  }
}


function OrbitDoubleCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = mountRef.current; if (!el) return
    const { scene, camera, renderer, pl } = setupScene(el)
    buildRailLogo(scene)

    const TRAIL = 8

    // Trail A — warm gold, starts on vertical oval
    const aBeads = Array.from({ length: TRAIL }, (_, i) =>
      makeBead(0.052 - i * 0.004, 3.0 - i * 0.3, 1 - i * 0.10)
    )

    // Trail B — blue, starts on horizontal oval
    const bBeads = Array.from({ length: TRAIL }, (_, i) =>
      new THREE.Mesh(
        new THREE.SphereGeometry(0.048 - i * 0.003, 14, 14),
        new THREE.MeshStandardMaterial({
          color: 0xC8E8FF, emissive: 0x55AAEE, emissiveIntensity: 2.8 - i * 0.3,
          metalness: 0.90, roughness: 0.04,
          transparent: true, opacity: 1 - i * 0.10,
        })
      )
    )

    ;[...aBeads, ...bBeads].forEach(b => scene.add(b))

    let id: number, t = 0
    const go = () => {
      id = requestAnimationFrame(go); t += 0.014

      // Trail A: forward direction
      aBeads.forEach((b, i) => {
        const [x, y] = lumaPath(t * 5 - i * 0.22)
        b.position.set(x, y, 0)
      })

      // Trail B: opposite direction — starts on H oval, tail trails the other way
      bBeads.forEach((b, i) => {
        const [x, y] = lumaPath(-t * 5 + Math.PI * 3 + i * 0.22)
        b.position.set(x, y, 0)
      })

      pl.intensity = 2.6 + Math.sin(t * 2.5) * 0.5
      renderer.render(scene, camera)
    }
    go()
    return () => { cancelAnimationFrame(id); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); renderer.dispose() }
  }, [])
  return <Canvas mountRef={mountRef} label="Orbit Double" />
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TestingPage() {
  return (
    <div style={{
      minHeight: '100vh', background: BG,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '60px 40px', gap: 48,
    }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '.65rem',
          letterSpacing: '.22em', textTransform: 'uppercase',
          color: 'rgba(245,200,66,0.5)', marginBottom: 10,
        }}>
          Luma — Logo & Animations
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
          fontSize: '2rem', color: '#E8E4DC', margin: 0,
        }}>
          Two ovals, one corner
        </h1>
      </div>

      <div style={{ display: 'flex', gap: 52, flexWrap: 'wrap', justifyContent: 'center' }}>
        <LogoCanvas />
        <OrbitDoubleCanvas />
      </div>
    </div>
  )
}
