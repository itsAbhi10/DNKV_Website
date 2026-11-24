import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const outDir = path.resolve(process.cwd(), '../video/source-photos')
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

const shots = [
  {
    name: 'arrival.jpg',
    color1: '#1e3a8a',
    color2: '#f59e0b',
    text: 'DNKV School Building Entrance',
  },
  { name: 'corridor.jpg', color1: '#0f172a', color2: '#d97706', text: 'Sunlit Academic Corridor' },
  { name: 'classroom.jpg', color1: '#1e293b', color2: '#0284c7', text: 'Engaged Smart Classroom' },
  { name: 'hands.jpg', color1: '#334155', color2: '#b45309', text: 'Focused Study and Writing' },
  {
    name: 'sports.jpg',
    color1: '#064e3b',
    color2: '#eab308',
    text: 'Expansive Campus Sports Ground',
  },
  { name: 'closing.jpg', color1: '#1e1b4b', color2: '#f97316', text: 'DNKV Golden Hour Panorama' },
]

async function generate() {
  for (const shot of shots) {
    const svg = `
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${shot.color1};stop-opacity:1" />
          <stop offset="60%" style="stop-color:#0f172a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:${shot.color2};stop-opacity:1" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:#000000;stop-opacity:0.5" />
        </radialGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#grad)" />
      <rect width="1920" height="1080" fill="url(#glow)" />
      <!-- Subtle architectural outlines -->
      <line x1="200" y1="900" x2="1720" y2="900" stroke="#f8fafc" stroke-opacity="0.15" stroke-width="4" />
      <line x1="400" y1="300" x2="400" y2="900" stroke="#f8fafc" stroke-opacity="0.1" stroke-width="2" />
      <line x1="800" y1="250" x2="800" y2="900" stroke="#f8fafc" stroke-opacity="0.1" stroke-width="2" />
      <line x1="1200" y1="250" x2="1200" y2="900" stroke="#f8fafc" stroke-opacity="0.1" stroke-width="2" />
      <line x1="1520" y1="300" x2="1520" y2="900" stroke="#f8fafc" stroke-opacity="0.1" stroke-width="2" />
      
      <circle cx="960" cy="400" r="140" fill="#f59e0b" fill-opacity="0.08" />
      <text x="960" y="520" font-family="sans-serif" font-size="36" font-weight="600" fill="#ffffff" fill-opacity="0.9" text-anchor="middle" letter-spacing="4">DR. NETAJI KARALE VIDYALAYA</text>
      <text x="960" y="580" font-family="sans-serif" font-size="24" fill="#fbbf24" fill-opacity="0.8" text-anchor="middle" letter-spacing="2">${shot.text}</text>
    </svg>
    `

    const dest = path.join(outDir, shot.name)
    await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile(dest)
    console.log(`Created source photo: ${dest}`)
  }
}

generate().catch(console.error)
