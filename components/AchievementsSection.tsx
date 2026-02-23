'use client'
import { useRef } from 'react'
import { useReveal } from './useReveal'

const ITEMS = [
  {
    icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
    title:'Hackathon Winner', desc:'First place in a competitive data analytics hackathon, delivering end-to-end pipeline insights under 24 hours.'
  },
  {
    icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
    title:'Runner-up Technoscope', desc:'Second place in the prestigious Technoscope competition for innovative data visualisation techniques.'
  },
  {
    icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
    title:'Best Paper Award', desc:'Recognised for outstanding research contribution in applied data analytics and machine learning methodology.'
  },
]

export default function AchievementsSection() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section id="achievements" ref={ref}
      className="section-pad"
      style={{ background:'linear-gradient(170deg,#130620 0%,#1E0840 55%,#130620 100%)', padding:'7rem 0', position:'relative', overflow:'hidden' }}
    >
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle,rgba(232,101,122,.05),transparent)', pointerEvents:'none' }} />
      <div style={{ maxWidth:'1152px', margin:'0 auto', padding:'0 24px' }}>
        <div data-anim="up" style={{ textAlign:'center', marginBottom:'3.5rem' }}>
          <span className="lbl" style={{ display:'block' }}>Recognition</span>
          <h2 className="hdg" style={{ textAlign:'center' }}>Achievements</h2>
        </div>
        <div className="ach-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px' }}>
          {ITEMS.map(({ icon, title, desc }, i) => (
            <div key={title} className="ach-card" data-anim="up" data-delay={String(i * 120)}>
              <div style={{ width:'70px', height:'70px', borderRadius:'16px', margin:'0 auto 20px', background:'rgba(232,101,122,.1)', border:'1px solid rgba(232,101,122,.14)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--blush)' }}>
                {icon}
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:400, fontSize:'1.4rem', color:'#f5dde8', marginBottom:'10px', textTransform:'uppercase', letterSpacing:'.04em' }}>{title}</h3>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'.88rem', color:'var(--text-muted)', lineHeight:1.7, fontWeight:400 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
