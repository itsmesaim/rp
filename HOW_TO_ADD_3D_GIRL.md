# How to add the live 3D girl — Mixamo + Three.js

## Step 1 — Get a free 3D character from Mixamo

1. Go to **mixamo.com** (free, Adobe account required)
2. Click **Characters** → search for a female character
   - Recommended: "Remy", "Kaya", "Jasmine", "Jolleen"
3. Click **Download** → Format: **FBX for Unity** or **FBX Binary**

## Step 2 — Add animations

1. While the character is selected on Mixamo, click **Animations**
2. Add these (each one downloads separately):
   - Search **"Idle"** → pick "Breathing Idle" or "Standing Idle"  
   - Search **"Wave"** → pick "Waving Gesture" or "Happy Wave"
3. For each animation: set **In Place = ON**, download as **FBX**

## Step 3 — Convert FBX → GLB (browser tool, free)

Go to **gltf.report** or **products.aspose.app/3d/conversion/fbx-to-gltf**

Or use the free desktop tool **Blender** (recommended for best results):
1. Open Blender → File → Import → FBX → select your character
2. File → Export → glTF 2.0 → Format: **glTF Binary (.glb)**
3. Save as `avatar3d.glb`

## Step 4 — Drop the file into your project

```
rahat-portfolio/
└── public/
    └── avatar3d.glb   ← PUT IT HERE
```

That's it! The site auto-detects the file and loads it.

---

## What the 3D girl does on the website

| Action | Behaviour |
|---|---|
| Page load | Plays idle/breathing animation on loop |
| Move mouse | Head smoothly follows cursor (like Talking Tom) |
| Body | Gently sways toward cursor |
| Click avatar | She waves at you |
| Drag on mobile | Rotate her 360° |

---

## Troubleshooting

**"T-pose / no animation"** → The GLB file has the mesh but not the animations.
Fix: Re-export from Mixamo with animations included, or merge the FBX files in Blender first.

**"Model too big / too small"** → In `Avatar3D.tsx` adjust the `<primitive>` scale:
```tsx
<primitive object={scene} scale={1.5} position={[0, -1.4, 0]} />
```

**"Model facing wrong way"** → Add rotation:
```tsx
<primitive object={scene} rotation={[0, Math.PI, 0]} />
```

**"Animations not found"** → Open browser console, look for:
`Available animations: [...]` — update the name checks in `AvatarModel`:
```tsx
const idle = names.find(n => n.toLowerCase().includes('YOUR_ANIM_NAME'))
```

---

## Alternative: No Blender, just Spline

If the Mixamo/Blender path feels too much right now:

1. Go to **spline.design** (free)
2. Community → search **"female character"** or **"girl avatar"**
3. Duplicate a scene → customize → Publish
4. In `HeroSection.tsx` replace the `<Avatar3D />` with:

```tsx
<iframe
  src='https://my.spline.design/YOUR_SCENE_ID/'
  style={{ width:'100%', height:'100%', border:'none' }}
  title="3D Avatar"
/>
```

Spline handles all the 3D — no GLB needed.
