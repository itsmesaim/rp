'use client'
import { useEffect, useRef } from 'react'
import { useReveal } from './useReveal'

const TECH = [
  { name:'SQL',      pct:88, g:'linear-gradient(90deg,#E8657A,#C2556A)' },
  { name:'Python',   pct:70, g:'linear-gradient(90deg,#D4607A,#A84060)' },
  { name:'Power BI', pct:58, g:'linear-gradient(90deg,#8060A8,#604888)' },
  { name:'Excel',    pct:46, g:'linear-gradient(90deg,#6A5098,#4A3878)' },
  { name:'ETL',      pct:38, g:'linear-gradient(90deg,#5A4088,#3A2868)' },
]
const SOFT = [
  { name:'Communication',     pct:90, g:'linear-gradient(90deg,#E8657A,#C2556A)' },
  { name:'Problem Solving',   pct:84, g:'linear-gradient(90deg,#D4607A,#B04060)' },
  { name:'Teamwork',          pct:78, g:'linear-gradient(90deg,#C05070,#983858)' },
  { name:'Critical Thinking', pct:72, g:'linear-gradient(90deg,#B04070,#882C54)' },
]

function Bar({ name, pct, g }: { name:string; pct:number; g:string }) {
  return (
    <div className="skill-track" data-anim="up">
      <span className="skill-track-bg-label">{name}</span>
      <div className="skill-fill" data-pct={pct} style={{ background:g, boxShadow:'0 0 18px rgba(232,101,122,.18)' }}>
        <span>{name}</span>
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const ref  = useRef<HTMLElement>(null)
  const done = useRef(false)
  useReveal(ref)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const fire = () => {
      if (done.current) return
      done.current = true
      el.querySelectorAll<HTMLElement>('.skill-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = (bar.dataset.pct ?? '0') + '%' }, 300 + i * 100)
      })
    }
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { fire(); obs.disconnect() } }, { threshold:0.05 })
    obs.observe(el)
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) fire()
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref}
      className="section-pad"
      style={{ background:'linear-gradient(170deg,#1A0830 0%,#280E50 55%,#1A0830 100%)', padding:'7rem 0', position:'relative', overflow:'hidden' }}
    >
      <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(232,101,122,.06),transparent)', pointerEvents:'none' }} />
      <div style={{ maxWidth:'1152px', margin:'0 auto', padding:'0 24px' }}>
        <div data-anim="up" style={{ marginBottom:'3.5rem' }}>
          <span className="lbl">What I know</span>
          <h2 className="hdg">Skills</h2>
        </div>
        <div className="skills-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem' }}>
          <div>
            <p data-anim="up" style={{ fontFamily:'var(--font-body)', fontSize:'.8rem', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(240,232,244,.5)', marginBottom:'1.4rem' }}>Technical</p>
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {TECH.map(s => <Bar key={s.name} {...s} />)}
            </div>
          </div>
          <div>
            <p data-anim="up" style={{ fontFamily:'var(--font-body)', fontSize:'.8rem', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(240,232,244,.5)', marginBottom:'1.4rem' }}>Soft Skills</p>
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {SOFT.map(s => <Bar key={s.name} {...s} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
