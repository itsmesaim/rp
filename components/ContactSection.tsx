'use client'
import { useRef, useState } from 'react'
import { useReveal } from './useReveal'

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true)
    await new Promise(r => setTimeout(r, 1400))
    setSent(true); setBusy(false)
    setForm({ name:'', email:'', message:'' })
  }

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--rose-dark)'
    e.target.style.boxShadow   = '0 0 0 3px rgba(194,85,106,.12)'
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--border)'
    e.target.style.boxShadow   = 'none'
  }

  return (
    <section id="contact" ref={ref}
      className="section-pad"
      style={{ background:'linear-gradient(170deg,#0F0818 0%,#1A0830 60%,#0F0818 100%)', padding:'7rem 0', position:'relative', overflow:'hidden' }}
    >
      <div style={{ position:'absolute', bottom:'-80px', right:'-80px', width:'420px', height:'420px', borderRadius:'50%', background:'radial-gradient(circle,rgba(232,101,122,.07),transparent)', pointerEvents:'none' }} />
      <div style={{ maxWidth:'960px', margin:'0 auto', padding:'0 24px' }}>
        <div data-anim="up" style={{ textAlign:'center', marginBottom:'3.5rem' }}>
          <span className="lbl" style={{ display:'block' }}>Get in touch</span>
          <h2 className="hdg" style={{ textAlign:'center' }}>Contact</h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'.95rem', color:'var(--text-muted)', marginTop:'12px', fontWeight:400 }}>
            Have a project or opportunity? I'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3.5rem', alignItems:'start' }}>

          {/* Form */}
          <div data-anim="left" style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'16px', padding:'32px' }}>
            {sent ? (
              <div style={{ textAlign:'center', padding:'3rem 0' }}>
                <div style={{ fontSize:'3rem', marginBottom:'16px' }}>✉️</div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontWeight:400, color:'#f5dde8', marginBottom:'8px', textTransform:'uppercase', letterSpacing:'.06em' }}>Message Sent!</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'.88rem', color:'var(--text-muted)', fontWeight:400 }}>I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
                {[
                  { name:'name',  label:'Name',  type:'text',  ph:'Your name' },
                  { name:'email', label:'Email', type:'email', ph:'your@email.com' },
                ].map(f => (
                  <div key={f.name}>
                    <label style={{ display:'block', fontFamily:'var(--font-body)', fontSize:'.7rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--text-dim)', marginBottom:'8px' }}>{f.label}</label>
                    <input className="inp" name={f.name} type={f.type} value={(form as any)[f.name]} onChange={change} required placeholder={f.ph} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                ))}
                <div>
                  <label style={{ display:'block', fontFamily:'var(--font-body)', fontSize:'.7rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--text-dim)', marginBottom:'8px' }}>Message</label>
                  <textarea className="inp" name="message" rows={5} value={form.message} onChange={change} required placeholder="Tell me about your project or opportunity…" onFocus={onFocus} onBlur={onBlur} />
                </div>
                <button type="submit" className="btn-p" style={{ justifyContent:'center', opacity: busy ? .7 : 1 }}>
                  {busy ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Links */}
          <div data-anim="right" style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
            <div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'2.4rem', fontWeight:400, color:'#f5dde8', marginBottom:'12px', textTransform:'uppercase', letterSpacing:'.04em' }}>Let's Connect</h3>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'.92rem', color:'var(--text-muted)', lineHeight:1.75, fontWeight:400 }}>
                Whether it's a full-time role, freelance project, or just a data conversation — always happy to connect.
              </p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              {[
                { href:'mailto:rahatmpangarkar@gmail.com', label:'Email me', sub:'rahatmpangarkar@gmail.com',
                  icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blush)" strokeWidth="2" strokeLinecap="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
                { href:'https://www.linkedin.com/in/rahat-pangarkar-4b5179212', label:'LinkedIn', sub:'rahat-pangarkar-4b5179212',
                  icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="var(--blush)"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> },
              ].map(({ href, label, sub, icon }) => (
                <a key={label} href={href} target={label==='LinkedIn'?'_blank':undefined} rel={label==='LinkedIn'?'noopener noreferrer':undefined}
                  style={{ display:'flex', alignItems:'center', gap:'14px', padding:'16px 20px', borderRadius:'12px', background:'var(--bg-card)', border:'1px solid var(--border)', textDecoration:'none', transition:'border-color .25s, transform .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--brose)'; e.currentTarget.style.transform='translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none' }}>
                  <div style={{ width:'40px', height:'40px', borderRadius:'8px', background:'rgba(232,101,122,.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{icon}</div>
                  <div>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'.82rem', fontWeight:600, color:'var(--text)', marginBottom:'2px' }}>{label}</p>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'.78rem', color:'var(--rose)', fontWeight:400 }}>{sub}</p>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 8px rgba(74,222,128,.7)', flexShrink:0 }} />
              <p style={{ fontFamily:'var(--font-body)', fontSize:'.85rem', color:'var(--text-muted)', fontWeight:500 }}>Available for new opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
