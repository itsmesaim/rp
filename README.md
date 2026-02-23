# Rahat Pangarkar — Portfolio Website

Built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 📁 Structure

```
rahat-portfolio/
├── app/
│   ├── layout.tsx       # Root layout + metadata
│   ├── page.tsx         # Home page (all sections)
│   └── globals.css      # Global styles + fonts
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx
│   ├── AchievementsSection.tsx
│   └── ContactSection.tsx
└── public/
    ├── avatar.png       ← PUT YOUR AVATAR IMAGE HERE
    └── rahat-pangarkar-cv.pdf  ← PUT YOUR CV HERE
```

## 🧍‍♀️ Adding the 3D Live Avatar

### Option 1: Spline 3D (RECOMMENDED — easiest + most impressive)

1. Go to [spline.design](https://spline.design) and create a free account
2. Download a character scene from the Spline Community (search "character", "girl", "avatar")
3. Publish your scene → copy the scene URL
4. In `HeroSection.tsx`, replace the avatar div with:

```tsx
// Install: npm install @splinetool/react-spline
import Spline from '@splinetool/react-spline'

// Replace the avatar placeholder with:
<Spline
  scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
  style={{ width: '400px', height: '500px' }}
/>
```

### Option 2: Ready Player Me Avatar (free 3D avatar)
1. Go to [readyplayer.me](https://readyplayer.me) → create your avatar
2. Export as `.glb` file
3. Use `@react-three/fiber` + `@react-three/drei` to render it

```bash
npm install @react-three/fiber @react-three/drei three
```

### Option 3: Simple animated image (quickest)
Just put your photo in `public/avatar.png` — the floating animation is already applied!

## 📨 Contact Form Setup

To make the contact form actually send emails, use **Resend** (free tier):

```bash
npm install resend
```

Create `app/api/contact/route.ts`:
```ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, message } = await req.json()
  await resend.emails.send({
    from: 'portfolio@rahatpangarkar.in',
    to: 'your@email.com',
    subject: `New message from ${name}`,
    text: message,
  })
  return Response.json({ success: true })
}
```

## 🌐 Deploy to Vercel

```bash
npm install -g vercel
vercel
# → Follow prompts → connects to rahatpangarkar.in
```

Then in Vercel dashboard → Settings → Domains → add `rahatpangarkar.in`

## ✏️ Update Content

All content is in the component files — no CMS needed. Just update:
- `components/HeroSection.tsx` — name, tagline
- `components/AboutSection.tsx` — education, experience
- `components/SkillsSection.tsx` — skill levels
- `components/ProjectsSection.tsx` — add/edit projects
- `components/AchievementsSection.tsx` — awards
- `components/ContactSection.tsx` — email, LinkedIn URL
