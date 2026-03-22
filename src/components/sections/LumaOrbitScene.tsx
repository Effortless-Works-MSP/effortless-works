'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const BUSINESSES = [
  { label: 'Crocheting Business', tag: 'Available',   accent: '#7BBFA0', hex: 0x7bbfa0 },
  { label: 'Content Creation',    tag: 'Available',   accent: '#7BBFA0', hex: 0x7bbfa0 },
  { label: 'Automated Sales',     tag: 'Coming Soon', accent: '#F5C842', hex: 0xF5C842 },
  { label: '3D Printing',         tag: 'Coming Soon', accent: '#F5C842', hex: 0xF5C842 },
]

const BASE_ANGLES = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5]
const ORBIT_R     = 3.6
const ORBIT_TILT  = 0.32

// ─── Logo geometry constants ──────────────────────────────────────────────────
const V_CX = -0.16, V_CY =  0.06
const H_CX =  0.10, H_CY = -0.27
const TORUS_V_R = 0.26, SCALE_V = 1.55
const TORUS_H_R = 0.22, SCALE_H = 1.60
const V_RX = TORUS_V_R,           V_RY = TORUS_V_R * SCALE_V
const H_RX = TORUS_H_R * SCALE_H, H_RY = TORUS_H_R

const V_XING   = -1.893
const H_XING   = -2.904
const FULL_PATH = Math.PI * 4

function lumaPath(a: number): [number, number] {
  const phase = ((a % FULL_PATH) + FULL_PATH) % FULL_PATH
  if (phase < Math.PI * 2) {
    return [V_CX + Math.cos(phase + V_XING) * V_RX, V_CY + Math.sin(phase + V_XING) * V_RY]
  } else {
    return [H_CX + Math.cos(phase - Math.PI * 2 + H_XING) * H_RX, H_CY + Math.sin(phase - Math.PI * 2 + H_XING) * H_RY]
  }
}

// ─── Build the Luma logo — two overlapping ovals with orbit double beads ─────
function buildLumaLogo(scene: THREE.Scene) {
  const logoGroup = new THREE.Group()

  const railMat = new THREE.MeshStandardMaterial({
    color: 0xF5C842, emissive: 0xB87000, emissiveIntensity: 0.4,
    metalness: 0.80, roughness: 0.08, transparent: true, opacity: 0.25,
  })

  const vOval = new THREE.Mesh(new THREE.TorusGeometry(TORUS_V_R, 0.016, 12, 80), railMat)
  vOval.scale.y = SCALE_V; vOval.position.set(V_CX, V_CY, 0)
  logoGroup.add(vOval)

  const hOval = new THREE.Mesh(new THREE.TorusGeometry(TORUS_H_R, 0.016, 12, 80), railMat)
  hOval.scale.x = SCALE_H; hOval.position.set(H_CX, H_CY, 0)
  logoGroup.add(hOval)

  const node = new THREE.Mesh(
    new THREE.SphereGeometry(0.028, 12, 12),
    new THREE.MeshStandardMaterial({
      color: 0xFFE040, emissive: 0xF5C842, emissiveIntensity: 1.0,
      metalness: 0.95, roughness: 0.02, transparent: true, opacity: 0.35,
    })
  )
  node.position.set(V_CX, H_CY, 0)
  logoGroup.add(node)

  // Orbit double beads
  const TRAIL = 8
  const aBeads = Array.from({ length: TRAIL }, (_, i) =>
    new THREE.Mesh(
      new THREE.SphereGeometry(0.052 - i * 0.004, 14, 14),
      new THREE.MeshStandardMaterial({
        color: 0xFFEE60, emissive: 0xF5C842, emissiveIntensity: 3.0 - i * 0.3,
        metalness: 0.95, roughness: 0.02, transparent: i > 0, opacity: 1 - i * 0.10,
      })
    )
  )
  const bBeads = Array.from({ length: TRAIL }, (_, i) =>
    new THREE.Mesh(
      new THREE.SphereGeometry(0.048 - i * 0.003, 14, 14),
      new THREE.MeshStandardMaterial({
        color: 0xC8E8FF, emissive: 0x55AAEE, emissiveIntensity: 2.8 - i * 0.3,
        metalness: 0.90, roughness: 0.04, transparent: true, opacity: 1 - i * 0.10,
      })
    )
  )
  ;[...aBeads, ...bBeads].forEach(b => logoGroup.add(b))

  scene.add(logoGroup)
  return { logoGroup, aBeads, bBeads }
}

// ─────────────────────────────────────────────────────────────────────────────

export default function LumaOrbitScene() {
  const mountRef  = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const W = container.clientWidth
    const H = 500

    // ── Scene / Camera / Renderer ──────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 100)
    camera.position.set(0, 2.5, 11)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x0c0d0e, 1)
    renderer.shadowMap.enabled = false
    container.appendChild(renderer.domElement)

    // ── Lighting ───────────────────────────────────────────────────────────
    // Ambient — very dark teal fill
    scene.add(new THREE.AmbientLight(0x1a2a1e, 0.6))

    // Main gold point light at logo centre
    const goldLight = new THREE.PointLight(0xF5C842, 4, 14)
    goldLight.position.set(0, 0, 0)
    scene.add(goldLight)

    // Soft teal rim from behind
    const rimLight = new THREE.PointLight(0x7bbfa0, 1.2, 18)
    rimLight.position.set(-3, 4, -6)
    scene.add(rimLight)

    // ── Stars ──────────────────────────────────────────────────────────────
    const starPos = new Float32Array(350 * 3)
    for (let i = 0; i < 350; i++) {
      starPos[i*3]   = (Math.random() - 0.5) * 44
      starPos[i*3+1] = (Math.random() - 0.5) * 28
      starPos[i*3+2] = (Math.random() - 0.5) * 22 - 5
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    scene.add(new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xe8e4dc, size: 0.045, opacity: 0.35, transparent: true })
    ))

    // ── Luma logo ──────────────────────────────────────────────────────────
    const { logoGroup, aBeads, bBeads } = buildLumaLogo(scene)

    // Outer glow sphere (very transparent)
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0xF5C842, opacity: 0.025, transparent: true, side: THREE.BackSide,
      })
    ))

    // ── Orbit path ring ────────────────────────────────────────────────────
    const orbitRingMesh = new THREE.Mesh(
      new THREE.TorusGeometry(ORBIT_R, 0.008, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0x7bbfa0, opacity: 0.06, transparent: true })
    )
    orbitRingMesh.rotation.x = ORBIT_TILT
    scene.add(orbitRingMesh)

    // ── Business pods ──────────────────────────────────────────────────────
    const podGroup = new THREE.Group()
    podGroup.rotation.x = ORBIT_TILT
    scene.add(podGroup)

    const pods:      THREE.Group[] = []
    const connLines: THREE.Line[]  = []

    BUSINESSES.forEach((biz, i) => {
      const angle = BASE_ANGLES[i]
      const x = Math.cos(angle) * ORBIT_R
      const z = Math.sin(angle) * ORBIT_R

      const g = new THREE.Group()
      g.position.set(x, 0, z)

      // Card body
      const cardMat = new THREE.MeshStandardMaterial({
        color: 0x131416, metalness: 0.3, roughness: 0.8,
        transparent: true, opacity: 0.92,
      })
      g.add(new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.85, 0.06), cardMat))

      // Card edge glow
      g.add(new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(1.7, 0.85, 0.06)),
        new THREE.LineBasicMaterial({ color: biz.hex, opacity: 0.3, transparent: true })
      ))

      // Accent top stripe
      const stripe = new THREE.Mesh(
        new THREE.BoxGeometry(1.7, 0.07, 0.07),
        new THREE.MeshStandardMaterial({
          color: biz.hex, emissive: biz.hex, emissiveIntensity: 0.4,
          metalness: 0.6, roughness: 0.2,
        })
      )
      stripe.position.y = 0.42
      g.add(stripe)

      podGroup.add(g)
      pods.push(g)

      // Connection line
      const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, 0, z)]
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: biz.hex, opacity: 0.12, transparent: true })
      )
      podGroup.add(line)
      connLines.push(line)
    })

    // ── Animate ────────────────────────────────────────────────────────────
    let animId: number
    let t = 0

    function animate() {
      animId = requestAnimationFrame(animate)
      t += 0.004

      // Logo gently breathes
      logoGroup.position.y = Math.sin(t * 0.9) * 0.05

      // Orbit double beads
      aBeads.forEach((b, i) => {
        const [x, y] = lumaPath(t * 5 - i * 0.22)
        b.position.set(x, y, 0)
      })
      bBeads.forEach((b, i) => {
        const [x, y] = lumaPath(-t * 5 + Math.PI * 3 + i * 0.22)
        b.position.set(x, y, 0)
      })

      // Gold light pulse (subtle)
      goldLight.intensity = 3.5 + Math.sin(t * 2.0) * 0.65

      // Orbit pods
      podGroup.rotation.y = t * 0.38

      // Keep pods facing camera + update labels
      pods.forEach((pod, i) => {
        const inv = new THREE.Quaternion()
        inv.copy(podGroup.quaternion).invert()
        pod.quaternion.copy(inv)

        // World pos → screen coords for label
        const wp = new THREE.Vector3()
        pod.getWorldPosition(wp)
        const lp = wp.clone().add(new THREE.Vector3(0, 0.65, 0))
        const ndc = lp.clone().project(camera)
        const sx = (ndc.x * 0.5 + 0.5) * W
        const sy = (1 - (ndc.y * 0.5 + 0.5)) * H

        const el = labelRefs.current[i]
        if (el) {
          el.style.left    = `${sx}px`
          el.style.top     = `${sy}px`
          el.style.opacity = ndc.z < 1 ? '1' : '0'
        }

        // Edge brightness by facing
        const edgeMat = (pod.children[1] as THREE.LineSegments).material as THREE.LineBasicMaterial
        edgeMat.opacity = ndc.z < 1 ? 0.18 + Math.sin(t * 0.8 + i) * 0.08 : 0.03
      })

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = container.clientWidth
      camera.aspect = w / H
      camera.updateProjectionMatrix()
      renderer.setSize(w, H)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: 500, overflow: 'hidden' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* LUMA centre label */}
      <div style={{
        position: 'absolute', left: '50%', top: '46%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center', pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '.85rem', fontWeight: 300,
          letterSpacing: '.35em', textTransform: 'uppercase',
          color: 'rgba(245,200,66,0.6)',
        }}>
          Luma
        </div>
      </div>

      {/* Pod labels */}
      {BUSINESSES.map((biz, i) => (
        <div
          key={biz.label}
          ref={el => { labelRefs.current[i] = el }}
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            textAlign: 'center',
            transition: 'opacity 0.15s',
          }}
        >
          <div style={{
            background: 'rgba(12,13,14,0.9)',
            border: `1px solid ${biz.accent}30`,
            borderRadius: 5, padding: '5px 11px',
            backdropFilter: 'blur(6px)',
            minWidth: 128,
          }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '.67rem', fontWeight: 500,
              color: '#E8E4DC', whiteSpace: 'nowrap', marginBottom: 2,
            }}>
              {biz.label}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '.5rem', fontWeight: 700,
              letterSpacing: '.12em', textTransform: 'uppercase',
              color: biz.accent,
            }}>
              {biz.tag}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
