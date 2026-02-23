'use client'
import { useRef } from 'react'
import { useReveal } from './useReveal'

const TOOLS = [
  { name:'Python', svg:
    <svg width="46" height="46" viewBox="0 0 256 255" fill="none">
      <path d="M126.9 0C59.4 0 63.1 29.7 63.1 29.7l.1 30.8h65v9.2H39.6S0 64.8 0 132.8s34.9 65.6 34.9 65.6h20.8v-31.6s-1.1-34.9 34.3-34.9h59.1s33.2.5 33.2-32.1V34.9S186.9 0 126.9 0zM92.1 19.7c5.9 0 10.7 4.8 10.7 10.7s-4.8 10.7-10.7 10.7S81.4 36.3 81.4 30.4s4.8-10.7 10.7-10.7z" fill="#387EB8"/>
      <path d="M129.1 255c67.5 0 63.8-29.7 63.8-29.7l-.1-30.8H128v-9.2h88.6s39.6 4.9 39.6-63.1-34.9-65.6-34.9-65.6h-20.8v31.6s1.1 34.9-34.3 34.9H107s-33.2-.5-33.2 32.1v53.9S69.1 255 129.1 255zm34.8-19.7c-5.9 0-10.7-4.8-10.7-10.7s4.8-10.7 10.7-10.7 10.7 4.8 10.7 10.7-4.8 10.7-10.7 10.7z" fill="#FFD845"/>
    </svg>
  },
  { name:'SQL', svg:
    <svg width="46" height="46" viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="16" rx="24" ry="9" fill="rgba(232,101,122,.2)" stroke="rgba(232,101,122,.7)" strokeWidth="2"/>
      <path d="M8 16v11c0 5 10.7 9 24 9s24-4 24-9V16" stroke="rgba(232,101,122,.65)" strokeWidth="2" fill="rgba(232,101,122,.1)"/>
      <path d="M8 27v11c0 5 10.7 9 24 9s24-4 24-9V27" stroke="rgba(232,101,122,.45)" strokeWidth="2" fill="rgba(232,101,122,.07)"/>
      <path d="M8 38v11c0 5 10.7 9 24 9s24-4 24-9V38" stroke="rgba(232,101,122,.3)" strokeWidth="2" fill="rgba(232,101,122,.04)"/>
    </svg>
  },
  { name:'Tableau', svg:
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <rect x="20.5" y="2" width="5" height="42" rx="2.5" fill="#E8657A"/>
      <rect x="2" y="20.5" width="42" height="5" rx="2.5" fill="#E8657A"/>
      <rect x="11" y="11" width="5" height="24" rx="2.5" fill="rgba(232,101,122,.55)"/>
      <rect x="30" y="11" width="5" height="24" rx="2.5" fill="rgba(232,101,122,.55)"/>
      <rect x="11" y="11" width="24" height="5" rx="2.5" fill="rgba(232,101,122,.55)"/>
      <rect x="11" y="30" width="24" height="5" rx="2.5" fill="rgba(232,101,122,.55)"/>
    </svg>
  },
  { name:'Power BI', svg:
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <rect x="2"  y="28" width="10" height="16" rx="3" fill="rgba(232,101,122,.4)"/>
      <rect x="17" y="18" width="10" height="26" rx="3" fill="rgba(232,101,122,.65)"/>
      <rect x="32" y="6"  width="10" height="38" rx="3" fill="rgba(232,101,122,.95)"/>
      <path d="M7 26 L22 16 L37 4" stroke="rgba(255,220,200,.35)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  },
  { name:'Excel', svg:
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <rect x="2" y="2" width="42" height="42" rx="6" fill="#1D6F42" opacity=".9"/>
      <path d="M10 13l8 10-8 10h5.5l5.5-7.5 5.5 7.5H36l-8-10 8-10h-5.5L23 23l-7.5-10H10z" fill="white"/>
    </svg>
  },
]

export default function ToolsSection() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section id="tools" ref={ref}
      className="section-pad"
      style={{ background:'linear-gradient(170deg,#180830 0%,#241050 55%,#180830 100%)', padding:'7rem 0', position:'relative', overflow:'hidden' }}
    >
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(232,101,122,.05),transparent)', pointerEvents:'none' }} />
      <div style={{ maxWidth:'1152px', margin:'0 auto', padding:'0 24px', textAlign:'center' }}>
        <div data-anim="up" style={{ marginBottom:'3rem' }}>
          <span className="lbl" style={{ display:'block' }}>My stack</span>
          <h2 className="hdg">Tools &amp; Technologies</h2>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'18px' }}>
          {TOOLS.map(({ name, svg }, i) => (
            <div key={name} className="tool-card" data-anim="up" data-delay={String(i * 80)}>
              {svg}
              <p>{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
