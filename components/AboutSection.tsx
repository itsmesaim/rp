'use client'
import { useRef } from 'react'
import { useReveal } from './useReveal'

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section id="about" ref={ref} style={{
      background:'linear-gradient(170deg, #1C0A35 0%, #2D1262 55%, #1A0830 100%)',
      padding:'7rem 0',
      position:'relative', overflow:'hidden',
    }}
    className="section-pad"
    >
      {/* Background bubbles */}
      <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,101,122,.07), transparent)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(90,30,120,.1), transparent)', pointerEvents:'none' }} />

      <div style={{ maxWidth:'1152px', margin:'0 auto', padding:'0 24px' }}>

        {/* Heading */}
        <div data-anim="up" style={{ marginBottom:'3.5rem' }}>
          <span className="lbl">Get to know me</span>
          <h2 className="hdg">About Me</h2>
        </div>

        {/* Two-column: bio left, photo right */}
        <div
          className="about-grid"
          style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'start' }}
        >

          {/* LEFT — bio paragraph */}
          <div data-anim="left">
            <p style={{
              fontFamily:'var(--font-body)',
              fontSize:'1.02rem',
              color:'var(--text-muted)',
              lineHeight:1.9,
              marginBottom:'1.5rem',
              fontWeight:400,
            }}>
              My journey into the world of data began during my undergraduate years at AIKTC, where I pursued a
              Bachelor's degree in Electrical Engineering. While most of my peers gravitated toward hardware and
              systems, I found myself spending long nights in the library poring over datasets, discovering patterns
              that told stories no one else had noticed yet. That spark never left me.
            </p>
            <p style={{
              fontFamily:'var(--font-body)',
              fontSize:'1.02rem',
              color:'var(--text-muted)',
              lineHeight:1.9,
              marginBottom:'1.5rem',
              fontWeight:400,
            }}>
              After graduating, I transitioned into data analytics full-time — building dashboards, automating
              reporting pipelines, and digging deep into SQL databases to surface the insights that actually move
              the needle. Over three years, I've worked across hiring analytics, sales performance metrics, and
              social media behaviour analysis, collaborating with teams ranging from five-person startups to
              cross-functional enterprise squads.
            </p>
            <p style={{
              fontFamily:'var(--font-body)',
              fontSize:'1.02rem',
              color:'var(--text-muted)',
              lineHeight:1.9,
              fontWeight:400,
            }}>
              Beyond the numbers, I'm passionate about clear communication — because data only creates value when
              it's understood. Whether that's a Power BI dashboard a non-technical executive can read at a glance,
              or a Python script that saves a team twelve hours a week, I care deeply about making data
              <em style={{ color:'var(--blush)', fontStyle:'italic' }}> accessible, beautiful, and useful</em>.
              Outside of work you'll find me hiking trails with a camera in hand, always chasing the next shot.
            </p>

            {/* Quick-info pills */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', marginTop:'2rem' }}>
              {[
                { icon:'🎓', text:'B.E. Electrical Engineering, AIKTC' },
                { icon:'💼', text:'Data Analyst · 3+ Years' },
                { icon:'📍', text:'Available for Remote & Hybrid' },
              ].map(({ icon, text }) => (
                <div key={text} style={{
                  display:'flex', alignItems:'center', gap:'8px',
                  padding:'8px 14px', borderRadius:'8px',
                  background:'rgba(232,101,122,.07)',
                  border:'1px solid rgba(232,101,122,.14)',
                  fontFamily:'var(--font-body)', fontSize:'.82rem',
                  fontWeight:500, color:'rgba(240,232,244,.65)',
                }}>
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — photo placeholder (replace about-avatar.png with real photo) */}
          <div data-anim="right" style={{ display:'flex', justifyContent:'center' }}>
            <div
              className="about-photo-placeholder"
              style={{
                position:'relative',
                width:'100%', maxWidth:'400px', height:'440px',
                borderRadius:'22px', overflow:'hidden',
                border:'1px solid rgba(232,101,122,.18)',
                background:'linear-gradient(160deg, rgba(232,101,122,.08), rgba(90,30,120,.12))',
                flexShrink:0,
              }}
            >
              {/* Try to load real photo */}
              <img
                src="/about-avatar.png"
                alt="Rahat Pangarkar"
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }}
                onError={e => { e.currentTarget.style.display = 'none' }}
              />

              {/* ── Placeholder shown when no photo exists ── */}
              {/* DROP YOUR PHOTO: public/about-avatar.png (any ratio, ideally portrait) */}
              <div style={{
                position:'absolute', inset:0,
                display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center',
                gap:'14px',
              }}>
                {/* Silhouette placeholder */}
                <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
                  <circle cx="45" cy="32" r="22" fill="rgba(232,101,122,.18)" stroke="rgba(232,101,122,.3)" strokeWidth="1.5"/>
                  <path d="M8 85 Q8 60 45 60 Q82 60 82 85" fill="rgba(232,101,122,.12)" stroke="rgba(232,101,122,.25)" strokeWidth="1.5"/>
                </svg>
                {/* <p style={{ fontFamily:'var(--font-body)', fontSize:'.78rem', fontWeight:500, color:'var(--text-dim)', textAlign:'center', letterSpacing:'.06em', lineHeight:1.6 }}>
                  Add your photo here<br />
                  <code style={{ color:'rgba(232,101,122,.5)', fontSize:'.72rem' }}>public/about-avatar.png</code>
                </p> */}
              </div>

              {/* Rose gradient overlay at bottom for depth */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'120px', background:'linear-gradient(to top, rgba(28,10,53,.85), transparent)', pointerEvents:'none' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
