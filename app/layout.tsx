import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Rahat Pangarkar | Data Analyst',
  description: 'Data Analyst turning data into actionable insights. SQL · Python · Power BI · Tableau · Excel.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

const BANNER = '✦  Website is under development  ✦  Rahat Pangarkar · Data Analyst  ✦  Website is under development  ✦  Rahat Pangarkar · Data Analyst  ✦  Website is under development  ✦  Rahat Pangarkar · Data Analyst  ✦  Website is under development  ✦  Rahat Pangarkar · Data Analyst  '
// const BANNER = 'Enjoy'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0F0818" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet" />
      </head>
      <body className="noise">
        {/* Dev banner */}
        <div className="dev-banner" aria-hidden="true">
          <div className="dev-banner-track">
            <span>{BANNER}</span>
            <span aria-hidden="true">{BANNER}</span>
          </div>
        </div>

        <Navbar />
        <main>{children}</main>

        <footer style={{ textAlign:'center', padding:'2.5rem 1.5rem', borderTop:'1px solid rgba(255,255,255,.06)', background:'var(--bg)' }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'.82rem', color:'var(--text-dim)', letterSpacing:'.06em', fontWeight:500 }}>
            © 2025 Rahat Pangarkar
            <span style={{ color:'var(--rose-dark)', margin:'0 10px' }}>·</span>
            crafted with love <span style={{ color:'var(--rose)' }}>♡</span>
          </p>
        </footer>
      </body>
    </html>
  )
}
