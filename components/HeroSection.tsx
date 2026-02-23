'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const Avatar3D = dynamic(() => import('./Avatar3D'), {
  ssr: false,
  loading: () => (
    <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:'52px', height:'52px', borderRadius:'50%', border:'2.5px solid var(--rose-dark)', opacity:.5 }} />
    </div>
  ),
})

// Roles cycling through the bracket-strikethrough typewriter
const ROLES = ['Data Analyst', 'SQL Expert', 'Power BI Developer', 'Python Analyst', 'Insight Seeker']

// CSS Bubbles data — generated once
const BUBBLES = Array.from({ length: 18 }, (_, i) => ({
  size:  20 + Math.random() * 60,
  left:  Math.random() * 100,
  delay: Math.random() * 18,
  dur:   12 + Math.random() * 14,
  bottom: -80,
}))

export default function HeroSection() {
  const [idx, setIdx]    = useState(0)
  const [txt, setTxt]    = useState('')
  const [del, setDel]    = useState(false)

  // Typewriter effect
  useEffect(() => {
    const target = ROLES[idx]
    let t: ReturnType<typeof setTimeout>
    if (!del && txt.length < target.length)        t = setTimeout(() => setTxt(target.slice(0, txt.length + 1)), 80)
    else if (!del && txt.length === target.length)  t = setTimeout(() => setDel(true), 2200)
    else if (del && txt.length > 0)                t = setTimeout(() => setTxt(txt.slice(0, -1)), 45)
    else { setDel(false); setIdx((idx + 1) % ROLES.length) }
    return () => clearTimeout(t)
  }, [txt, del, idx])

  return (
    <section id="home" style={{
      minHeight:'100vh',
      background:'linear-gradient(145deg, #3D1828 0%, #52203A 30%, #3D1258 65%, #1A0830 100%)',
      position:'relative', overflow:'hidden',
      display:'flex', alignItems:'center', paddingTop:'90px',
    }}>
      {/* ── CSS Floating Bubbles ── */}
      <div className="bubbles-bg">
        {BUBBLES.map((b, i) => (
          <div key={i} className="bubble" style={{
            width:  b.size,
            height: b.size,
            left:   `${b.left}%`,
            bottom: b.bottom,
            animationDuration:  `${b.dur}s`,
            animationDelay:     `${b.delay}s`,
          }} />
        ))}
      </div>

      {/* ── Ambient glow blobs ── */}
      <div style={{ position:'absolute', top:'-100px', left:'-100px', width:'550px', height:'550px', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,101,122,.09), transparent)', filter:'blur(90px)', pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'absolute', bottom:'-60px', right:'-80px', width:'460px', height:'460px', borderRadius:'50%', background:'radial-gradient(circle, rgba(90,30,120,.2), transparent)', filter:'blur(90px)', pointerEvents:'none', zIndex:0 }} />

      {/* ── Main content grid ── */}
      <div
        className="hero-grid"
        style={{
          maxWidth:'1152px', margin:'0 auto',
          padding:'4rem 24px 5rem', width:'100%',
          display:'grid', gridTemplateColumns:'1fr 1fr',
          gap:'40px', alignItems:'center', position:'relative', zIndex:1,
        }}
      >
        {/* LEFT — text */}
        <div className="hero-text-col">
          <span className="lbl" style={{ marginBottom:'12px' }}>Data Analyst · Portfolio</span>

          {/* Bebas Neue big headline */}
          <h1 style={{
            fontFamily:'var(--font-display)',
            fontSize:'clamp(2.6rem, 6vw, 5.2rem)',
            fontWeight:400, lineHeight:.95,
            letterSpacing:'.03em',
            textTransform:'uppercase',
            color:'#faeced', marginBottom:'10px',
          }}>
            Hi, I'm a{' '}
            <span className="bracket-strike">
              {txt}<span className="typed-cursor" />
            </span>
          </h1>

          <p style={{
            fontFamily:'var(--font-body)', fontSize:'1rem',
            color:'var(--text-muted)', lineHeight:1.75,
            maxWidth:'400px', marginBottom:'2.5rem',
            fontWeight:400,
          }}>
            Turning data into actionable insights.
          </p>

          <div
            className="hero-buttons"
            style={{ display:'flex', flexWrap:'wrap', gap:'12px', marginBottom:'2.5rem' }}
          >
            <button className="btn-p"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior:'smooth' })}>
              View Projects
            </button>
            <a href="/Rahat Pangarkar.pdf" download className="btn-o">
              📄 Download CV
            </a>
          </div>

          {/* Social icon links */}
          <div className="hero-socials" style={{ display:'flex', gap:'10px' }}>
            {[
              { href:'mailto:rahatmpangarkar@gmail.com', label:'Email',
                svg:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
              { href:'https://www.linkedin.com/in/rahat-pangarkar-4b5179212', label:'LinkedIn',
                svg:<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> },
            ].map(({ href, label, svg }) => (
              <a key={label} href={href}
                target={label === 'LinkedIn' ? '_blank' : undefined}
                rel={label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                aria-label={label}
                style={{ width:'42px', height:'42px', borderRadius:'8px', border:'1px solid rgba(240,232,244,.14)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(240,232,244,.4)', transition:'all .25s', textDecoration:'none' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--rose-dark)'; e.currentTarget.style.color='var(--blush)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(240,232,244,.14)'; e.currentTarget.style.color='rgba(240,232,244,.4)' }}>
                {svg}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — 3D Avatar (no chips) */}
        <div
          className="hero-avatar-col"
          style={{ display:'flex', justifyContent:'center', height:'520px' }}
        >
          <div style={{ position:'relative', width:'100%', maxWidth:'430px', height:'100%' }}>
            {/* Ambient glow ring */}
            <div style={{ position:'absolute', inset:'-40px', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,101,122,.12) 0%, transparent 70%)', pointerEvents:'none' }} />
            {/* Avatar container — rounded card */}
            <div className="av-glow" style={{
              position:'relative', width:'100%', height:'100%',
              borderRadius:'28px', overflow:'hidden',
              background:'rgba(255,255,255,.02)',
              border:'1px solid rgba(232,101,122,.14)',
            }}>
              <Avatar3D modelPath="/avatar3d.glb" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:'absolute', bottom:'24px', left:'50%', transform:'translateX(-50%)', zIndex:1 }}>
        <div style={{ width:'20px', height:'32px', borderRadius:'10px', border:'1px solid rgba(240,232,244,.2)', display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'5px' }}>
          <div style={{ width:'4px', height:'8px', borderRadius:'2px', background:'var(--rose-dark)', animation:'chipFloat 2s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  )
}
