'use client'
import { useRef } from 'react'
import { useReveal } from './useReveal'

const BarChart = () => (
  <svg width="60" height="54" viewBox="0 0 64 58" fill="none">
    <rect x="4"  y="34" width="12" height="22" rx="3" fill="rgba(232,101,122,.4)"/>
    <rect x="20" y="20" width="12" height="36" rx="3" fill="rgba(232,101,122,.62)"/>
    <rect x="36" y="6"  width="12" height="50" rx="3" fill="rgba(232,101,122,.92)"/>
    <rect x="52" y="16" width="12" height="40" rx="3" fill="rgba(232,101,122,.52)"/>
  </svg>
)
const AreaChart = () => (
  <svg width="68" height="50" viewBox="0 0 72 52" fill="none">
    <path d="M0 38 Q12 32 22 34 Q32 36 42 18 Q52 7 72 13 L72 52 L0 52Z" fill="rgba(194,85,106,.2)"/>
    <path d="M0 38 Q12 32 22 34 Q32 36 42 18 Q52 7 72 13" stroke="rgba(232,101,122,.88)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="42" cy="18" r="3.5" fill="var(--rose)"/>
  </svg>
)
const PieChart = () => (
  <svg width="56" height="56" viewBox="0 0 60 60" fill="none">
    <path d="M30 30 L30 4 A26 26 0 0 1 52.5 43Z" fill="rgba(232,101,122,.88)"/>
    <path d="M30 30 L52.5 43 A26 26 0 0 1 8.5 47Z" fill="rgba(194,85,106,.56)"/>
    <path d="M30 30 L8.5 47 A26 26 0 0 1 30 4Z" fill="rgba(162,72,88,.36)"/>
    <circle cx="30" cy="30" r="9" fill="rgba(15,8,24,.9)"/>
  </svg>
)

const PROJECTS = [
  { title:'Hiring Data Analysis', tags:['Excel','Automation'], desc:'Analyzed hiring trends and automated reporting pipelines — helping HR teams make faster, data-backed decisions with zero manual effort.', Chart:BarChart },
  { title:'Sales Performance Metrics', tags:['SQL','Power BI'], desc:'Dashboard to track and analyze key sales metrics. Enabled real-time performance monitoring across regional teams.', Chart:AreaChart },
  { title:'Instagram User Analytics', tags:['MySQL','Engagement'], desc:'Examined user behavior and engagement data to surface actionable insights for content strategy and growth teams.', Chart:PieChart },
]

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section id="projects" ref={ref}
      className="section-pad"
      style={{ background:'linear-gradient(170deg,#150828 0%,#221050 55%,#150828 100%)', padding:'7rem 0', position:'relative', overflow:'hidden' }}
    >
      <div style={{ position:'absolute', top:'-50px', right:'-50px', width:'380px', height:'380px', borderRadius:'50%', background:'radial-gradient(circle,rgba(232,101,122,.07),transparent)', pointerEvents:'none' }} />
      <div style={{ maxWidth:'1152px', margin:'0 auto', padding:'0 24px' }}>
        <div data-anim="up" style={{ marginBottom:'3.5rem' }}>
          <span className="lbl">My work</span>
          <h2 className="hdg">Projects</h2>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {PROJECTS.map(({ title, tags, desc, Chart }, i) => (
            <div key={title} className="proj-card" data-anim="up" data-delay={String(i * 100)}>
              <div>
                <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:'10px', marginBottom:'8px' }}>
                  <h3 style={{ fontFamily:'var(--font-display)', fontWeight:400, fontSize:'1.4rem', color:'#f5dde8', letterSpacing:'.04em', textTransform:'uppercase' }}>{title}</h3>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                    {tags.map(t => (
                      <span key={t} style={{ fontFamily:'var(--font-body)', fontSize:'.68rem', fontWeight:700, padding:'4px 10px', borderRadius:'20px', background:'rgba(255,255,255,.07)', color:'rgba(240,232,244,.6)', letterSpacing:'.08em', textTransform:'uppercase' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'.88rem', color:'var(--text-muted)', lineHeight:1.7, fontWeight:400 }}>{desc}</p>
              </div>
              <div className="proj-card-chart" style={{ width:'88px', height:'88px', borderRadius:'12px', flexShrink:0, background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Chart />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
