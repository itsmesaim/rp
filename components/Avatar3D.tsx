'use client'

import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations, OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

// ─── Animation sequence controller ────────────────────────────────────────
// SEQUENCE: wave → dance → idle (loops)
// HOW TO ADD MORE ANIMATIONS:
//   1. Export new FBX from Mixamo (separate file for each animation)
//   2. Convert each to .glb
//   3. Merge them into one .glb using Blender (File > Append, select NLATracks)
//   4. Or load multiple .glb files and grab their animations, then attach to main scene
//   5. Add the animation name to ANIM_PRIORITY below and it will auto-play in sequence
const ANIM_PRIORITY = [
  // Tries each keyword in order; first match wins for each slot
  { slot: 'wave',  keywords: ['wave', 'greeting', 'waving', 'hi'] },
  { slot: 'dance', keywords: ['dance', 'dancing', 'hip', 'groove', 'samba', 'twerk', 'jump'] },
  { slot: 'idle',  keywords: ['idle', 'breathing', 'stand', 'neutral'] },
]

function findAnim(names: string[], keywords: string[]): string | undefined {
  return names.find(n => keywords.some(k => n.toLowerCase().includes(k)))
}

// ─── Model component ───────────────────────────────────────────────────────
function AvatarModel({ showSpeech, onSpeechDone }: { showSpeech: boolean; onSpeechDone: () => void }) {
  const group  = useRef<THREE.Group>(null!)
  const { scene, animations } = useGLTF('/avatar3d.glb')
  const { actions, names }    = useAnimations(animations, group)
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const headBone  = useRef<THREE.Bone | null>(null)
  const sequence  = useRef<'wave' | 'dance' | 'idle'>('wave')
  const didStart  = useRef(false)

  // Auto-fit camera to show full model (head to toe)
  useEffect(() => {
    if (!scene) return

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(scene)
    const center = new THREE.Vector3()
    box.getCenter(center)
    const size = new THREE.Vector3()
    box.getSize(size)

    // Center the model at origin
    scene.position.sub(center)

    // Cast camera to PerspectiveCamera (since fov is set in <Canvas>, it's guaranteed to be Perspective)
    const perspectiveCamera = camera as THREE.PerspectiveCamera

    // Calculate distance to fit full height
    const fovRad = perspectiveCamera.fov * (Math.PI / 180)
    let distance = size.y / (2 * Math.tan(fovRad / 2))
    distance *= 1.1 // Small padding; reduce if too far away

    // Aim camera slightly above center for head focus
    const aimY = size.y * 0.15 // Adjust multiplier (0-0.5) if head/toe balance is off

    // Update camera
    perspectiveCamera.position.set(0, aimY, distance)
    perspectiveCamera.lookAt(0, aimY, 0)
    perspectiveCamera.updateProjectionMatrix()
  }, [scene, camera])

  // Find bones for head-tracking
  useEffect(() => {
    scene.traverse(obj => {
      if (obj instanceof THREE.Bone) {
        const n = obj.name.toLowerCase()
        if (n.includes('head'))   headBone.current  = obj
      }
    })
  }, [scene])

  // Mouse / touch tracking
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth)  * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return
      mouse.current.x = (e.touches[0].clientX / window.innerWidth)  * 2 - 1
      mouse.current.y = (e.touches[0].clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  // ── ANIMATION SEQUENCE ──────────────────────────────────────────────────
  // On mount: wave → dance (if exists) → idle loop
  useEffect(() => {
    if (didStart.current || names.length === 0) return
    didStart.current = true

    const waveName  = findAnim(names, ANIM_PRIORITY[0].keywords)
    const danceName = findAnim(names, ANIM_PRIORITY[1].keywords)
    const idleName  = findAnim(names, ANIM_PRIORITY[2].keywords) ?? names[0]

    const playIdle = () => {
      sequence.current = 'idle'
      if (idleName && actions[idleName]) {
        actions[idleName]!.reset().fadeIn(0.4).play()
      }
    }

    const playDance = () => {
      if (!danceName || !actions[danceName]) { playIdle(); return }
      sequence.current = 'dance'
      actions[danceName]!.reset().fadeIn(0.3).play()
      // Dance for 6 seconds then go idle
      setTimeout(playIdle, 6000)
    }

    const playWave = () => {
      if (!waveName || !actions[waveName]) { playIdle(); return }
      sequence.current = 'wave'
      actions[waveName]!.reset().fadeIn(0.2).play()
      actions[waveName]!.clampWhenFinished = true
      actions[waveName]!.loop = THREE.LoopOnce
      const dur = (actions[waveName]!.getClip().duration * 1000) || 2500
      // Hide speech bubble after wave starts
      setTimeout(onSpeechDone, 1800)
      // Fade out wave, start dance
      setTimeout(() => {
        if (actions[waveName]) actions[waveName]!.fadeOut(0.3)
        playDance()
      }, dur - 100)
    }

    // Start sequence after a short delay so model is fully rendered
    setTimeout(playWave, 600)
  }, [names, actions])

  // ── HEAD TRACKING ────────────────────────────────────────────────────────
  useFrame(() => {
    if (headBone.current) {
      headBone.current.rotation.x = THREE.MathUtils.lerp(headBone.current.rotation.x, -mouse.current.y * 0.2, 0.05)
      headBone.current.rotation.y = THREE.MathUtils.lerp(headBone.current.rotation.y,  mouse.current.x * 0.3, 0.05)
    }
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.current.x * 0.06, 0.03)
    }
  })

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} position={[0, 0, 0]} scale={1} />
    </group>
  )
}

// ─── Loader spinner ────────────────────────────────────────────────────────
function Loader() {
  const m = useRef<THREE.Mesh>(null!)
  useFrame(s => { m.current.rotation.y = s.clock.elapsedTime * 2; m.current.rotation.x = s.clock.elapsedTime })
  return <mesh ref={m}><octahedronGeometry args={[0.3]} /><meshStandardMaterial color="#E8657A" wireframe /></mesh>
}

// ─── Floating bubble particles (Three.js) ─────────────────────────────────
function Bubbles() {
  const count   = 38
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy   = useRef(new THREE.Object3D())
  const phases  = useRef<number[]>([])
  const speeds  = useRef<number[]>([])
  const data    = useRef<{ x: number; y: number; z: number; r: number }[]>([])

  useEffect(() => {
    phases.current = Array.from({ length: count }, () => Math.random() * Math.PI * 2)
    speeds.current = Array.from({ length: count }, () => 0.3 + Math.random() * 0.5)
    data.current   = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 5,
      z: (Math.random() - 0.5) * 3 - 1,
      r: 0.04 + Math.random() * 0.14,
    }))
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const d = data.current[i]
      if (!d) continue
      const yOff = Math.sin(t * speeds.current[i] + phases.current[i]) * 0.4
      dummy.current.position.set(d.x, d.y + yOff, d.z)
      dummy.current.scale.setScalar(d.r)
      dummy.current.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.current.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial
        color="#E8657A"
        transparent opacity={0.12}
        roughness={0.1} metalness={0.3}
        envMapIntensity={0.8}
      />
    </instancedMesh>
  )
}

// ─── Fallback placeholder ──────────────────────────────────────────────────
function Placeholder() {
  const m = useRef<THREE.Mesh>(null!)
  useFrame(s => {
    m.current.position.y = Math.sin(s.clock.elapsedTime * 0.8) * 0.07
    m.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.4) * 0.12
  })
  return (
    <group>
      <mesh ref={m} position={[0, 0.2, 0]}>
        <capsuleGeometry args={[0.35, 0.9, 8, 16]} />
        <meshStandardMaterial color="#D4728A" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.28, 0]}>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial color="#E8A890" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.54, -0.04]}>
        <sphereGeometry args={[0.41, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        <meshStandardMaterial color="#3A2010" roughness={0.8} />
      </mesh>
    </group>
  )
}

// ─── MAIN EXPORT ───────────────────────────────────────────────────────────
export default function Avatar3D({ modelPath = '/avatar3d.glb' }: { modelPath?: string }) {
  const [modelExists, setModelExists] = useState(false)
  const [showSpeech,  setShowSpeech]  = useState(true)
  const [speechVisible, setSpeechVisible] = useState(false)

  useEffect(() => {
    fetch(modelPath, { method: 'HEAD' })
      .then(r => { if (r.ok) { setModelExists(true); setTimeout(() => setSpeechVisible(true), 800) } })
      .catch(() => {})
  }, [modelPath])

  return (
    <div style={{ width:'100%', height:'100%', position:'relative' }}>
      {/* ── Speech bubble "Hi! 👋" ── */}
      {showSpeech && modelExists && (
        <div style={{
          position:'absolute', top:'12%', left:'50%', transform:'translateX(-50%)',
          zIndex:10, pointerEvents:'none',
          opacity: speechVisible ? 1 : 0,
          transition:'opacity .5s ease',
        }}>
          <div style={{
            background:'rgba(255,255,255,.95)',
            borderRadius:'20px', padding:'10px 20px',
            fontFamily:'var(--font-display)', fontWeight:700,
            fontSize:'1.05rem', color:'#1a0828',
            letterSpacing:'.02em',
            boxShadow:'0 8px 32px rgba(232,101,122,.35)',
            position:'relative', whiteSpace:'nowrap',
          }}>
            Hi! 👋 I'm Rahat
            {/* bubble tail */}
            <span style={{
              position:'absolute', bottom:'-10px', left:'50%',
              transform:'translateX(-50%)',
              width:0, height:0,
              borderLeft:'10px solid transparent',
              borderRight:'10px solid transparent',
              borderTop:'10px solid rgba(255,255,255,.95)',
            }} />
          </div>
        </div>
      )}

      {/* ── Three.js Canvas ── */}
      {/*
        CAMERA NOTES:
        - position[2] = distance from model (smaller = closer, bigger = farther)
        - position[1] = vertical aim (higher = looking down at model)
        - fov = field of view (lower = more zoomed in / telephoto look)
        - Crop effect: model is raised via position in primitive, camera aimed at chest/head area
      */}
      <Canvas
        camera={{ position: [0, 0.55, 2.1], fov: 38 }}
        style={{ background:'transparent' }}
        gl={{ alpha:true, antialias:true }}
        shadows
      >
        {/* Warm rose lighting */}
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 5, 4]} intensity={1.5} castShadow color="#FFE5EC" shadow-mapSize={[1024,1024]} />
        <pointLight position={[-2, 2, -1]} intensity={0.6} color="#C2556A" />
        <pointLight position={[0, -1, 2]} intensity={0.4} color="#FFD0D8" />
        <pointLight position={[2, 3, 1]} intensity={0.3} color="#F0A8B8" />

        <Environment preset="sunset" />

        {/* Floating bubble particles */}
        <Bubbles />

        <Suspense fallback={<Loader />}>
          {modelExists
            ? <AvatarModel showSpeech={showSpeech} onSpeechDone={() => setShowSpeech(false)} />
            : <Placeholder />
          }
        </Suspense>

        {/*
          OrbitControls: user can drag to rotate */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 2.1}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          touches={{ ONE: 1, TWO: 0 }}
        />
      </Canvas>

      {/* Drag hint */}
      <div style={{
        position:'absolute', bottom:'10px', left:'50%', transform:'translateX(-50%)',
        fontFamily:'var(--font-body)', fontSize:'.62rem',
        color:'rgba(240,232,244,.25)', letterSpacing:'.1em',
        textTransform:'uppercase', pointerEvents:'none', whiteSpace:'nowrap',
      }}>
        drag to rotate
      </div>
    </div>
  )
}

