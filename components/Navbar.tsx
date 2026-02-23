'use client'
import { useEffect, useRef, useState } from 'react'

const LINKS = [
  { href:'#home',         label:'Home'         },
  { href:'#about',        label:'About'        },
  { href:'#skills',       label:'Skills'       },
  { href:'#projects',     label:'Projects'     },
  { href:'#tools',        label:'Tools'        },
  { href:'#achievements', label:'Achievements' },
  { href:'#contact',      label:'Contact'      },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('home')
  const [menuOpen,  setMenuOpen]  = useState(false)

  // Scroll glass effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive:true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Active section tracking
  useEffect(() => {
    const ids = LINKS.map(l => l.href.slice(1))
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { threshold:0.35, rootMargin:'-80px 0px -40% 0px' })
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  // Close mobile menu on scroll
  useEffect(() => {
    if (!menuOpen) return
    const handler = () => setMenuOpen(false)
    window.addEventListener('scroll', handler, { passive:true })
    return () => window.removeEventListener('scroll', handler)
  }, [menuOpen])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior:'smooth' })
  }

  return (
    <>
      <nav style={{
        position:'fixed', top:'28px', left:0, right:0, zIndex:1050,
        transition:'background .35s, border-color .35s',
        ...(scrolled ? {
          background:'rgba(15,8,24,.92)',
          backdropFilter:'blur(20px)',
          WebkitBackdropFilter:'blur(20px)',
          borderBottom:'1px solid rgba(232,101,122,.12)',
        } : {
          background:'transparent',
          borderBottom:'1px solid transparent',
        }),
      }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>

          {/* Logo */}
          <a href="#home" onClick={e => { e.preventDefault(); scrollTo('#home') }}
            style={{ textDecoration:'none', fontFamily:'var(--font-serif)', fontStyle:'italic', fontWeight:600, fontSize:'1.4rem', color:'#f5dde8', letterSpacing:'.02em' }}>
            Rahat<span style={{ color:'var(--rose)' }}>.</span>
          </a>

          {/* Desktop nav links */}
          <div style={{ display:'flex', alignItems:'center', gap:'2px' }}
            className="desktop-nav">
            {LINKS.map(({ href, label }) => {
              const id = href.slice(1)
              const isActive = active === id
              return (
                <a key={href} href={href} onClick={e => { e.preventDefault(); scrollTo(href) }}
                  style={{
                    fontFamily:'var(--font-body)', fontSize:'.72rem', fontWeight:700,
                    letterSpacing:'.14em', textTransform:'uppercase',
                    color: isActive ? '#fff' : 'rgba(240,232,244,.45)',
                    padding:'6px 12px', borderRadius:'6px',
                    textDecoration:'none', position:'relative',
                    transition:'color .25s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color='rgba(240,232,244,.75)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color='rgba(240,232,244,.45)' }}>
                  {label}
                  {isActive && (
                    <span style={{ position:'absolute', bottom:'-2px', left:'12px', right:'12px', height:'1.5px', background:'var(--rose)', borderRadius:'1px' }} />
                  )}
                </a>
              )
            })}
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            {/* Hire Me CTA — desktop only */}
            <a href="#contact" onClick={e => { e.preventDefault(); scrollTo('#contact') }}
              className="btn-p hire-btn"
              style={{ padding:'9px 20px', fontSize:'.72rem', borderRadius:'6px' }}>
              Hire Me
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(m => !m)}
              className="hamburger-btn"
              aria-label="Toggle menu"
              style={{ width:'40px', height:'40px', background:'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'5px', padding:'4px' }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display:'block', width:'22px', height:'2px',
                  background:menuOpen && i===1 ? 'transparent' : 'rgba(240,232,244,.6)',
                  borderRadius:'1px',
                  transition:'all .25s',
                  transform: menuOpen
                    ? i===0 ? 'rotate(45deg) translate(5px, 5px)'
                    : i===2 ? 'rotate(-45deg) translate(5px, -5px)'
                    : 'none'
                    : 'none',
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div style={{
        position:'fixed', top:`${28 + 64}px`, left:0, right:0, zIndex:1040,
        background:'rgba(15,8,24,.97)',
        backdropFilter:'blur(24px)',
        borderBottom:'1px solid rgba(232,101,122,.12)',
        padding: menuOpen ? '12px 0 20px' : '0',
        maxHeight: menuOpen ? '400px' : '0',
        overflow:'hidden',
        transition:'max-height .35s cubic-bezier(.4,0,.2,1), padding .35s',
      }}>
        {LINKS.map(({ href, label }) => (
          <a key={href} href={href}
            onClick={e => { e.preventDefault(); scrollTo(href) }}
            style={{
              display:'block', padding:'14px 28px',
              fontFamily:'var(--font-body)', fontSize:'.82rem', fontWeight:700,
              letterSpacing:'.14em', textTransform:'uppercase',
              color: active === href.slice(1) ? 'var(--blush)' : 'rgba(240,232,244,.55)',
              textDecoration:'none', transition:'color .2s',
            }}>
            {label}
          </a>
        ))}
        <div style={{ padding:'12px 28px 0' }}>
          <a href="#contact" onClick={e => { e.preventDefault(); scrollTo('#contact') }}
            className="btn-p" style={{ justifyContent:'center', width:'100%' }}>
            Hire Me
          </a>
        </div>
      </div>

      {/* Inline responsive nav styles */}
      <style>{`
        .desktop-nav { display:flex !important; }
        .hire-btn    { display:inline-flex !important; }
        .hamburger-btn { display:none !important; }
        @media (max-width: 900px) {
          .desktop-nav { display:none !important; }
          .hire-btn    { display:none !important; }
          .hamburger-btn { display:flex !important; }
        }
      `}</style>
    </>
  )
}
