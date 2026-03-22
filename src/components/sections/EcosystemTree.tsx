'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EcoNode {
  id: string
  label: string
  description: string
  href: string
  comingSoon?: boolean
  selected?: boolean
}

interface EcosystemTreeProps {
  rootLabel: string
  rootHref: string
  nodes: EcoNode[]          // all nodes; selected ones have .selected = true
  onBack: () => void
  onNodeClick?: (node: EcoNode) => void
}

// ─── Colors ───────────────────────────────────────────────────────────────────

const C = {
  bg:      0x0c0d0e,
  green:   0x7bbfa0,
  lav:     0x9b8ed4,
  bark:    0x3a4a3e,
  barkLt:  0x4d6455,
  leaf:    0x1e3328,
  leafLt:  0x2a4a38,
  text:    '#E8E4DC',
  textDim: 'rgba(232,228,220,0.45)',
}

// ─── Curve helpers ────────────────────────────────────────────────────────────

function makeTubePath(p0: THREE.Vector3, p1: THREE.Vector3, p2: THREE.Vector3, segs = 24) {
  const curve = new THREE.QuadraticBezierCurve3(p0, p1, p2)
  return curve
}

function branchTube(
  scene: THREE.Scene,
  p0: THREE.Vector3,
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  r0: number,
  r1: number,
  mat: THREE.Material,
) {
  const curve = makeTubePath(p0, p1, p2)
  const geo = new THREE.TubeGeometry(curve, 20, r0, 8, false)
  const mesh = new THREE.Mesh(geo, mat)
  scene.add(mesh)
  return mesh
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EcosystemTree({
  rootLabel,
  nodes,
  onBack,
  onNodeClick,
}: EcosystemTreeProps) {
  const mountRef   = useRef<HTMLDivElement>(null)
  const cleanupRef = useRef<() => void>(() => {})

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth
    const H = mount.clientHeight

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)   // fully transparent background
    mount.appendChild(renderer.domElement)

    // ── Scene / camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    // No fog — transparent background needs no fill fog

    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 200)
    camera.position.set(0, 4, 32)
    camera.lookAt(0, 4, 0)

    // ── Lights ────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.35))

    const dlight = new THREE.DirectionalLight(0xd0ffe0, 1.1)
    dlight.position.set(4, 12, 8)
    scene.add(dlight)

    const glow = new THREE.PointLight(0x7bbfa0, 2.5, 30)
    glow.position.set(0, 10, 2)
    scene.add(glow)

    const lavLight = new THREE.PointLight(0x9b8ed4, 1.2, 20)
    lavLight.position.set(-4, 8, 3)
    scene.add(lavLight)

    const cloudLight = new THREE.PointLight(0xaed8f0, 1.4, 22)
    cloudLight.position.set(0, -5, 5)
    scene.add(cloudLight)

    // ── Materials ─────────────────────────────────────────────────────────────
    const barkMat = new THREE.MeshStandardMaterial({
      color: C.bark, roughness: 0.88, metalness: 0.05,
    })
    const barkLtMat = new THREE.MeshStandardMaterial({
      color: C.barkLt, roughness: 0.82, metalness: 0.04,
    })
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x2d6b40, emissive: 0x0d2b18, emissiveIntensity: 0.3,
      roughness: 0.8, metalness: 0.05, transparent: true, opacity: 0.96,
    })
    const leafLtMat = new THREE.MeshStandardMaterial({
      color: 0x3d8c52, emissive: 0x133322, emissiveIntensity: 0.25,
      roughness: 0.75, metalness: 0.05, transparent: true, opacity: 0.9,
    })

    // ── Floating cloud base ───────────────────────────────────────────────────

    const GROUND_Y = -6.2

    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xdce8f0, emissive: 0x8fb8d0, emissiveIntensity: 0.18,
      roughness: 1, metalness: 0, transparent: true, opacity: 0.82,
    })
    const cloudMatDark = new THREE.MeshStandardMaterial({
      color: 0xb8cdd8, emissive: 0x6a94a8, emissiveIntensity: 0.12,
      roughness: 1, metalness: 0, transparent: true, opacity: 0.72,
    })

    // Cloud blobs — large oval cluster the trunk sits on
    const cloudBlobs: Array<[number, number, number, number, number, number]> = [
      // [x, y, z,  rx, ry, rz]  — scaled spheres for fluffy oval shapes
      [ 0.0,  0.0,  0.0,  3.8, 1.6, 2.8],
      [-3.2,  0.0,  0.4,  2.8, 1.3, 2.2],
      [ 3.4,  0.0, -0.2,  2.9, 1.3, 2.2],
      [-5.8, -0.3,  0.6,  2.0, 1.0, 1.6],
      [ 6.0, -0.3, -0.4,  2.1, 1.0, 1.6],
      [-1.5,  0.6,  1.0,  2.2, 1.2, 1.8],
      [ 1.8,  0.5, -0.8,  2.2, 1.2, 1.8],
      [-4.0,  0.3,  1.2,  1.6, 0.9, 1.3],
      [ 4.2,  0.2, -1.0,  1.6, 0.9, 1.3],
      [ 0.0, -0.5, -1.2,  2.6, 1.0, 2.0],
      [ 0.0,  0.4,  1.5,  2.2, 1.0, 1.6],
      [-2.0, -0.3, -1.4,  1.4, 0.8, 1.1],
      [ 2.2, -0.2,  1.8,  1.4, 0.8, 1.1],
    ]

    cloudBlobs.forEach(([x, y, z, rx, ry, rz], i) => {
      const geo  = new THREE.SphereGeometry(1, 10, 8)
      const mat  = i % 3 === 0 ? cloudMatDark : cloudMat
      const mesh = new THREE.Mesh(geo, mat)
      mesh.scale.set(rx, ry, rz)
      mesh.position.set(x, GROUND_Y + ry + 0.2 + y, z)
      scene.add(mesh)
    })

    // Soft under-shadow disc
    const shadowDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(7, 7, 0.08, 32),
      new THREE.MeshStandardMaterial({
        color: 0x6a94a8, emissive: 0x4a7488, emissiveIntensity: 0.2,
        transparent: true, opacity: 0.22, roughness: 1,
      }),
    )
    shadowDisc.position.set(0, GROUND_Y - 0.1, 0)
    scene.add(shadowDisc)

    // ── Trunk ─────────────────────────────────────────────────────────────────

    const TRUNK_TOP_Y = 6
    const TRUNK_H     = TRUNK_TOP_Y - GROUND_Y   // full height

    // Main tapered trunk body — wide at base, narrow at top
    const trunkBodyGeo = new THREE.CylinderGeometry(0.28, 1.35, TRUNK_H, 10, 1)
    const trunkBody    = new THREE.Mesh(trunkBodyGeo, barkMat)
    trunkBody.position.set(0.15, GROUND_Y + TRUNK_H / 2, 0)
    scene.add(trunkBody)

    // Secondary tapered slab for organic silhouette
    const trunkSideGeo = new THREE.CylinderGeometry(0.18, 0.9, TRUNK_H * 0.92, 8, 1)
    const trunkSide    = new THREE.Mesh(trunkSideGeo, barkLtMat)
    trunkSide.position.set(-0.22, GROUND_Y + (TRUNK_H * 0.92) / 2, 0.1)
    scene.add(trunkSide)

    // Root buttresses — thick flared roots spreading from the base
    const buttressData: Array<[number, number, number, number]> = [
      // [angle, len, width, tilt]
      [0,           2.8, 0.55, 0.32],
      [Math.PI * 0.28, 2.4, 0.45, 0.28],
      [-Math.PI * 0.28, 2.4, 0.45, 0.28],
      [Math.PI * 0.58, 2.0, 0.38, 0.22],
      [-Math.PI * 0.58, 2.0, 0.38, 0.22],
    ]

    buttressData.forEach(([angle, len, w, tilt]) => {
      const dx = Math.sin(angle) * len
      const dz = Math.cos(angle) * len
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, GROUND_Y + 0.05, 0),
        new THREE.Vector3(dx * 0.5, GROUND_Y + len * 0.3, dz * 0.5),
        new THREE.Vector3(dx, GROUND_Y + 0.1, dz),
      )
      const geo  = new THREE.TubeGeometry(curve, 12, w, 6, false)
      const mesh = new THREE.Mesh(geo, barkMat)
      scene.add(mesh)

      // Thin tapering fin that connects buttress to trunk
      const finCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(dx * 0.15, GROUND_Y + len * 0.6, dz * 0.15),
        new THREE.Vector3(dx * 0.5,  GROUND_Y + len * 0.4, dz * 0.5),
        new THREE.Vector3(dx * 0.85, GROUND_Y + 0.12, dz * 0.85),
      )
      const finGeo  = new THREE.TubeGeometry(finCurve, 8, w * 0.45, 5, false)
      scene.add(new THREE.Mesh(finGeo, barkLtMat))
    })

    // ── Foliage — dense canopy spread across the whole tree ──────────────────
    //
    // Three layers:
    //   1. Large base blobs forming the canopy silhouette
    //   2. Medium blobs filling the mid-canopy volume
    //   3. Small accent blobs along the branch zones

    const leafMats = [leafMat, leafLtMat]

    function addLeafBlob(x: number, y: number, z: number, r: number, detail = 1) {
      const geo  = new THREE.IcosahedronGeometry(r, detail)
      const mat  = leafMats[Math.round(Math.random())]
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(x, y, z)
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      scene.add(mesh)
    }

    // Layer 1 — large outer canopy blobs (form the silhouette)
    const outerBlobs: Array<[number, number, number, number]> = [
      // crown top
      [0,    11.0,  0,    2.8],
      [-2.2, 10.2,  0.5, 2.4],
      [ 2.4, 10.0, -0.4, 2.5],
      [-3.8,  9.0,  1.0, 2.0],
      [ 3.6,  8.8, -0.6, 2.1],
      [ 0.5, 11.8,  0.8, 2.0],
      [-1.0, 11.5, -0.6, 1.8],
      // mid canopy
      [-5.0,  7.5,  1.2, 1.8],
      [ 5.2,  7.2, -0.8, 1.9],
      [-6.2,  6.2,  1.5, 1.6],
      [ 6.0,  6.0, -1.0, 1.7],
      [-4.0,  5.5,  1.0, 1.5],
      [ 4.2,  5.2, -0.5, 1.5],
      // lower branches
      [-7.0,  4.8,  2.0, 1.4],
      [ 7.2,  4.5, -1.5, 1.4],
      [-5.5,  3.5,  1.5, 1.2],
      [ 5.8,  3.2, -1.0, 1.3],
      [-3.5,  2.8,  0.8, 1.1],
      [ 3.8,  2.5, -0.6, 1.2],
      // back fill
      [ 1.0,  9.5, -2.0, 2.0],
      [-1.5,  8.8, -2.2, 1.8],
      [ 0.0, 10.5, -1.5, 1.6],
      [-3.0,  7.0, -1.8, 1.5],
      [ 3.2,  6.5, -2.0, 1.5],
    ]

    outerBlobs.forEach(([x, y, z, r]) => addLeafBlob(x, y, z, r, 1))

    // Layer 2 — medium fill blobs inside the canopy volume
    for (let i = 0; i < 60; i++) {
      const t  = i / 60
      const rx = 7.5 * Math.sqrt(1 - Math.pow(t - 0.5, 2) * 0.8)
      const x  = (Math.random() - 0.5) * rx * 2
      const y  = 2.0 + t * 10 + (Math.random() - 0.5) * 1.5
      const z  = (Math.random() - 0.5) * rx * 0.9
      const r  = 0.6 + Math.random() * 0.9
      addLeafBlob(x, y, z, r, 0)
    }

    // Layer 3 — small tight clusters right along the branch line
    for (let i = 0; i < 30; i++) {
      const side = i % 2 === 0 ? 1 : -1
      const x    = side * (2.5 + Math.random() * 5.5)
      const y    = 2.0 + Math.random() * 9.0
      const z    = (Math.random() - 0.5) * 3.0
      const r    = 0.35 + Math.random() * 0.5
      addLeafBlob(x, y, z, r, 0)
    }

    // ── Branch + node placement ───────────────────────────────────────────────
    //
    // Each product lives at the tip of its own branch.
    // Branches originate from different heights on the trunk and alternate
    // left / right so the tree looks natural.
    // Selected product gets the highest, most prominent branch.
    // All branches are bark-coloured (no green/purple).

    const n = nodes.length

    // Heights where each branch leaves the trunk (low → high)
    const branchHeights = (() => {
      const lo = 1.5, hi = TRUNK_TOP_Y + 1.5
      return Array.from({ length: n }, (_, i) => lo + (hi - lo) * (i / Math.max(n - 1, 1)))
    })()

    // Sort nodes so the selected one ends up at the top slot
    const sorted = [
      ...nodes.filter(nd => !nd.selected),
      ...nodes.filter(nd =>  nd.selected),
    ]

    // Alternate left / right; selected (last) goes slightly forward
    const REACH_MIN = 4.5   // shortest reach (bottom branches)
    const REACH_MAX = 9.0   // longest reach (top branches)
    const nodePositions: Array<{ node: EcoNode; pos: THREE.Vector3; originY: number }> = []

    sorted.forEach((node, i) => {
      const originY    = branchHeights[i]
      const isSelected = !!node.selected
      const heightFrac = i / Math.max(n - 1, 1)                          // 0=bottom, 1=top
      const reach      = REACH_MIN + (REACH_MAX - REACH_MIN) * heightFrac

      let tipX: number, tipY: number, tipZ: number
      if (isSelected) {
        // Top branch — lean toward camera
        tipX = (n % 2 === 0 ? 1 : 0) * reach * 0.35
        tipY = originY + 1.8
        tipZ = reach * 0.7
      } else {
        const side  = i % 2 === 0 ? 1 : -1
        const depth = 0.3 + heightFrac * 0.25
        tipX = side * reach
        tipY = originY + 0.8 + i * 0.15
        tipZ = reach * depth
      }

      nodePositions.push({
        node,
        pos: new THREE.Vector3(tipX, tipY, tipZ),
        originY,
      })
    })

    // ── Helper: draw one tapered branch tube ────────────────────────────────
    function drawBranch(
      p0: THREE.Vector3, ctrl: THREE.Vector3, p2: THREE.Vector3,
      radiusBase: number, radiusTip: number,
      mat: THREE.Material,
    ) {
      // Simulate taper by drawing two overlapping tubes
      const curve  = new THREE.QuadraticBezierCurve3(p0, ctrl, p2)
      const thick  = new THREE.TubeGeometry(curve, 14, radiusBase, 7, false)
      const thin   = new THREE.TubeGeometry(curve, 14, radiusTip,  6, false)
      scene.add(new THREE.Mesh(thick, mat))
      scene.add(new THREE.Mesh(thin,  mat))

      // Knot sphere at base
      const knot = new THREE.Mesh(new THREE.SphereGeometry(radiusBase * 1.3, 6, 6), mat)
      knot.position.copy(p0)
      scene.add(knot)
    }

    // ── Helper: add sub-branches off a main branch ───────────────────────────
    function addSubBranches(
      mainCurve: THREE.QuadraticBezierCurve3,
      count: number,
      baseRadius: number,
      mat: THREE.Material,
    ) {
      for (let s = 0; s < count; s++) {
        // Pick a point along the main branch (avoid root 30% and tip 20%)
        const t      = 0.3 + Math.random() * 0.5
        const origin = mainCurve.getPoint(t)
        const tang   = mainCurve.getTangent(t)

        // Sub-branch fans upward and outward from the tangent direction
        const side   = s % 2 === 0 ? 1 : -1
        const spread = 0.5 + Math.random() * 0.7
        const tipDir = new THREE.Vector3(
          tang.x * 0.6 + side * spread,
          tang.y * 0.5 + 0.6 + Math.random() * 0.4,
          tang.z * 0.4 + (Math.random() - 0.5) * 0.4,
        ).normalize()

        const len    = 1.2 + Math.random() * 1.8
        const tip    = origin.clone().addScaledVector(tipDir, len)
        const subCtrl = new THREE.Vector3(
          (origin.x + tip.x) * 0.5 + (Math.random() - 0.5) * 0.5,
          (origin.y + tip.y) * 0.5 + 0.3,
          (origin.z + tip.z) * 0.5,
        )

        const r = baseRadius * (0.35 + Math.random() * 0.15)
        drawBranch(origin, subCtrl, tip, r, r * 0.45, mat)

        // Tiny twig off each sub-branch
        for (let tw = 0; tw < 2; tw++) {
          const tt     = 0.4 + Math.random() * 0.4
          const tCurve = new THREE.QuadraticBezierCurve3(origin, subCtrl, tip)
          const to     = tCurve.getPoint(tt)
          const tDir   = new THREE.Vector3(
            (Math.random() - 0.5) * 1.2,
            0.5 + Math.random() * 0.6,
            (Math.random() - 0.5) * 0.6,
          ).normalize()
          const tLen   = 0.5 + Math.random() * 0.8
          const tTip   = to.clone().addScaledVector(tDir, tLen)
          const tCtrl  = new THREE.Vector3(
            (to.x + tTip.x) * 0.5, (to.y + tTip.y) * 0.5 + 0.15, (to.z + tTip.z) * 0.5,
          )
          const tr = r * 0.3
          const twigCurve = new THREE.QuadraticBezierCurve3(to, tCtrl, tTip)
          scene.add(new THREE.Mesh(new THREE.TubeGeometry(twigCurve, 6, tr, 5, false), mat))

          // Leaf cluster on each twig tip
          for (let lf = 0; lf < 3; lf++) {
            const lr  = 0.25 + Math.random() * 0.35
            const lmesh = new THREE.Mesh(new THREE.IcosahedronGeometry(lr, 0), lf % 2 === 0 ? leafMat : leafLtMat)
            lmesh.position.set(
              tTip.x + (Math.random() - 0.5) * 0.8,
              tTip.y + Math.random() * 0.5,
              tTip.z + (Math.random() - 0.5) * 0.6,
            )
            scene.add(lmesh)
          }
        }
      }
    }

    // Draw branches (all bark-coloured) + small knot sphere at tip
    const glowMeshes: Array<{ mesh: THREE.Mesh; phase: number }> = []

    nodePositions.forEach(({ node, pos, originY }, branchIdx) => {
      const isSelected  = !!node.selected
      // Lower branches are thicker — taper from thick base to thinner tip
      const heightFrac  = (originY - 1.5) / (TRUNK_TOP_Y - 1.5)  // 0=low, 1=high
      const radiusBase  = isSelected ? 0.22 : 0.38 - heightFrac * 0.22   // 0.38 at bottom → 0.16 at top
      const radiusTip   = radiusBase * 0.38

      const origin = new THREE.Vector3(0.12, originY, 0.05)
      const ctrl   = new THREE.Vector3(
        pos.x * 0.55,
        originY + (pos.y - originY) * 0.5,
        pos.z * 0.45,
      )

      const mainCurve = new THREE.QuadraticBezierCurve3(origin, ctrl, pos)
      const geo       = new THREE.TubeGeometry(mainCurve, 18, radiusBase, 8, false)
      const tipGeoSm  = new THREE.TubeGeometry(mainCurve, 18, radiusTip,  7, false)
      const mat       = isSelected ? barkLtMat : barkMat
      scene.add(new THREE.Mesh(geo, mat))
      scene.add(new THREE.Mesh(tipGeoSm, mat))

      // Knot at trunk join
      const knot = new THREE.Mesh(new THREE.SphereGeometry(radiusBase * 1.4, 7, 7), barkLtMat)
      knot.position.copy(origin)
      scene.add(knot)

      // Sub-branches: more on lower (thicker) branches
      const subCount = isSelected ? 2 : Math.round(4 - heightFrac * 2)   // 4 low, 2 high
      addSubBranches(mainCurve, subCount, radiusBase, mat)

      // Leaf cluster at the tip of each branch
      const tipCount = isSelected ? 9 : 6
      for (let li = 0; li < tipCount; li++) {
        const lr    = isSelected ? (0.6 + Math.random() * 0.6) : (0.4 + Math.random() * 0.4)
        const lg    = new THREE.IcosahedronGeometry(lr, 0)
        const lm    = li % 2 === 0 ? leafMat : leafLtMat
        const lmesh = new THREE.Mesh(lg, lm)
        lmesh.position.set(
          pos.x + (Math.random() - 0.5) * 2.0,
          pos.y + (Math.random() - 0.5) * 1.2 + 0.5,
          pos.z + (Math.random() - 0.5) * 1.4,
        )
        scene.add(lmesh)
      }

      // Knot sphere at tip for raycasting / visual anchor
      const tipGeo = new THREE.SphereGeometry(isSelected ? 0.22 : 0.14, 6, 6)
      const tipMat = new THREE.MeshStandardMaterial({
        color: barkLtMat.color, roughness: 0.7, metalness: 0.1,
      })
      const tipMesh = new THREE.Mesh(tipGeo, tipMat)
      tipMesh.position.copy(pos)
      tipMesh.userData = { node }
      scene.add(tipMesh)
      glowMeshes.push({ mesh: tipMesh, phase: Math.random() * Math.PI * 2 })
    })

    // ── Root node (ground pill) ───────────────────────────────────────────────

    const rootGeo = new THREE.CapsuleGeometry(0.28, 0.6, 6, 12)
    const rootMat = new THREE.MeshStandardMaterial({
      color: C.green, emissive: C.green, emissiveIntensity: 0.3,
      roughness: 0.3, metalness: 0.5, transparent: true, opacity: 0.5,
    })
    const rootMesh = new THREE.Mesh(rootGeo, rootMat)
    rootMesh.position.set(0, GROUND_Y + 1.85, 0)
    scene.add(rootMesh)

    // Glowing ring at base of trunk
    scene.add(new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.4, 0.06, 32),
      new THREE.MeshStandardMaterial({
        color: C.green, emissive: C.green, emissiveIntensity: 0.2,
        roughness: 0.5, metalness: 0.3, transparent: true, opacity: 0.22,
      }),
    ))

    // ── HTML labels overlay ───────────────────────────────────────────────────
    // We project 3D positions to 2D and position divs via CSS

    const labelContainer = document.createElement('div')
    labelContainer.style.cssText = `
      position: absolute; inset: 0; pointer-events: none;
      overflow: hidden;
    `
    mount.appendChild(labelContainer)

    // Radial vignette — fades all four edges into the page background
    const vignette = document.createElement('div')
    vignette.style.cssText = `
      position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(ellipse 70% 60% at 50% 48%, transparent 55%, #0c0d0e 100%);
    `
    labelContainer.appendChild(vignette)

    // Root label — pinned to bottom center of canvas
    const rootLabel2 = document.createElement('div')
    rootLabel2.style.cssText = `
      position: absolute;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      pointer-events: auto;
      cursor: pointer;
    `
    rootLabel2.innerHTML = `
      <div style="
        display: inline-flex; align-items: center; gap: 8px;
        padding: 8px 20px; border-radius: 100px;
        background: rgba(123,191,160,0.06);
        border: 1px solid rgba(123,191,160,0.22);
      ">
        <span style="width:5px;height:5px;border-radius:50%;background:#7BBFA0;display:inline-block;opacity:0.7;flex-shrink:0"></span>
        <span style="font-family:Cormorant Garamond,serif;font-weight:300;font-size:14px;color:rgba(232,228,220,0.55)">${rootLabel}</span>
        <span style="font-size:8px;color:rgba(155,142,212,0.7);letter-spacing:0.1em;text-transform:uppercase">being built</span>
      </div>
    `
    labelContainer.appendChild(rootLabel2)

    // Node labels
    const nodeLabelEls: Array<{ el: HTMLDivElement; pos: THREE.Vector3 }> = []

    nodePositions.forEach(({ node, pos }) => {
      const isSelected = !!node.selected
      const isCS       = !!node.comingSoon
      const col        = isCS ? '#9B8ED4' : '#7BBFA0'

      const el = document.createElement('div')
      el.style.cssText = `
        position: absolute;
        transform: translate(-50%, -50%);
        text-align: center;
        pointer-events: auto;
        cursor: pointer;
        transition: opacity 0.2s;
      `

      if (isSelected) {
        el.innerHTML = `
          <div style="
            padding: 18px 20px 16px;
            border-radius: 16px;
            border: 1px solid ${col}55;
            background: linear-gradient(155deg, ${col}18 0%, rgba(12,13,14,0.92) 100%);
            backdrop-filter: blur(10px);
            min-width: 200px;
            position: relative;
            overflow: hidden;
          ">
            <div style="position:absolute;top:0;left:12%;right:12%;height:1px;background:linear-gradient(90deg,transparent,${col}88,transparent)"></div>
            <p style="font-family:Cormorant Garamond,serif;font-weight:300;font-size:20px;color:#E8E4DC;margin:0 0 4px;line-height:1.2">${node.label}</p>
            <p style="font-size:11px;color:rgba(232,228,220,0.42);margin:0 0 14px;line-height:1.6">${node.description}</p>
            ${isCS
              ? `<a href="${node.href}" style="display:inline-block;padding:6px 16px;border-radius:100px;background:${col}12;border:1px solid ${col}30;color:${col};font-size:9px;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none">Being built — see what's coming →</a>`
              : `<a href="${node.href}" style="display:inline-block;padding:8px 20px;border-radius:100px;background:${col};color:#0C0D0E;font-size:10px;font-weight:700;letter-spacing:0.07em;text-decoration:none">Set up my space →</a>`
            }
          </div>
        `
      } else {
        el.innerHTML = `
          <a href="${node.href}" style="text-decoration:none;display:block;">
            <div style="
              padding: 11px 14px;
              border-radius: 12px;
              border: 1px solid rgba(255,255,255,0.07);
              background: rgba(12,13,14,0.78);
              backdrop-filter: blur(6px);
              min-width: 130px;
              opacity: 0.62;
              transition: opacity 0.2s, transform 0.18s;
            ">
              <p style="font-family:Cormorant Garamond,serif;font-weight:300;font-size:13px;color:rgba(232,228,220,0.75);margin:0 0 2px;line-height:1.2">${node.label}</p>
              <p style="font-size:9px;color:rgba(232,228,220,0.28);margin:0;line-height:1.5">${node.description}</p>
              ${isCS ? `<p style="font-size:8px;color:${col};margin:4px 0 0;letter-spacing:0.1em;text-transform:uppercase;opacity:0.6">Being built →</p>` : ''}
            </div>
          </a>
        `
        const inner = el.querySelector('div') as HTMLDivElement
        el.addEventListener('mouseenter', () => { inner.style.opacity = '1'; inner.style.transform = 'translateY(-2px)' })
        el.addEventListener('mouseleave', () => { inner.style.opacity = '0.62'; inner.style.transform = '' })
      }

      labelContainer.appendChild(el)
      nodeLabelEls.push({ el, pos })
    })

    // ── Raycasting for click ──────────────────────────────────────────────────

    const raycaster = new THREE.Raycaster()
    const mouse     = new THREE.Vector2()

    function onClick(e: MouseEvent) {
      const rect = mount!.getBoundingClientRect()
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(scene.children)
      for (const h of hits) {
        const nd = h.object.userData?.node as EcoNode | undefined
        if (nd && onNodeClick) { onNodeClick(nd); break }
      }
    }
    renderer.domElement.addEventListener('click', onClick)

    // ── Gentle auto-rotation ──────────────────────────────────────────────────

    let autoAngle = 0
    const ROT_SPEED = 0.003
    const ROT_AMP   = 0.18   // radians max rotation

    // ── Project 3D → 2D for labels ────────────────────────────────────────────

    const tmpV = new THREE.Vector3()
    function project(pos3: THREE.Vector3): { x: number; y: number } {
      tmpV.copy(pos3).project(camera)
      return {
        x: (tmpV.x  *  0.5 + 0.5) * W,
        y: (-tmpV.y * 0.5 + 0.5) * H,
      }
    }

    // Root world pos (static)
    const ROOT_POS = new THREE.Vector3(0, GROUND_Y + 1.2, 0)

    // ── Animation loop ────────────────────────────────────────────────────────

    let frame = 0
    let raf: number

    function animate() {
      raf = requestAnimationFrame(animate)
      frame++

      // Gentle sway
      autoAngle += ROT_SPEED
      camera.position.x = Math.sin(autoAngle) * ROT_AMP * 3
      camera.lookAt(0, 4, 0)

      // Pulse glow meshes
      glowMeshes.forEach(({ mesh, phase }) => {
        const mat = mesh.material as THREE.MeshStandardMaterial
        mat.emissiveIntensity = 0.4 + Math.sin(frame * 0.03 + phase) * 0.3
      })

      renderer.render(scene, camera)

      // Update label positions
      nodeLabelEls.forEach(({ el, pos }) => {
        const p = project(pos)
        el.style.left = `${p.x}px`
        el.style.top  = `${p.y}px`
      })

      // rootLabel2 is pinned via CSS — no projection needed
    }
    animate()

    // ── Resize ────────────────────────────────────────────────────────────────

    function onResize() {
      const nw = mount!.clientWidth
      const nh = mount!.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    // ── Cleanup ───────────────────────────────────────────────────────────────

    cleanupRef.current = () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('click', onClick)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      if (mount.contains(labelContainer))      mount.removeChild(labelContainer)
    }

    return () => cleanupRef.current()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootLabel, JSON.stringify(nodes)])

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>

      {/* Eyebrow */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#7BBFA0', margin: '0 0 10px' }}>
          The full ecosystem
        </p>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(14px,1.7vw,18px)', color: 'rgba(232,228,220,0.4)', margin: 0, lineHeight: 1.75, maxWidth: 440 }}>
          You are starting with one — but everything here connects.
        </p>
      </div>

      {/* Three.js canvas — no border, fades into page */}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          maxWidth: 960,
          height: 560,
          position: 'relative',
        }}
      />

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          padding: '11px 28px', borderRadius: 100, background: 'transparent',
          border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(232,228,220,0.38)',
          fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
          letterSpacing: '0.05em', transition: 'all 0.15s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
          e.currentTarget.style.color = 'rgba(232,228,220,0.65)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
          e.currentTarget.style.color = 'rgba(232,228,220,0.38)'
        }}
      >← Back</button>
    </div>
  )
}
