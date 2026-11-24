import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { KenBurnsProvider } from './providers/KenBurnsProvider'
import { ManualProvider } from './providers/ManualProvider'
import { HttpProvider } from './providers/HttpProvider'
import type { VideoProvider } from './providers/VideoProvider'

interface Shot {
  id: string
  filename: string
  title: string
  prompt: string
  seconds: number
  zoompan?: string
}

async function runPipeline() {
  console.log('🎬 Starting DNKV Hero Video Pipeline...')

  const rootDir = process.cwd()
  const shotsPath = path.resolve(rootDir, 'video/shots.json')
  const sourcePhotosDir = path.resolve(rootDir, 'video/source-photos')
  const tempClipsDir = path.resolve(rootDir, 'video/temp-clips')
  const outputDir = path.resolve(rootDir, 'video/output')

  if (!fs.existsSync(shotsPath)) {
    throw new Error(`shots.json not found at ${shotsPath}`)
  }
  if (!fs.existsSync(tempClipsDir)) {
    fs.mkdirSync(tempClipsDir, { recursive: true })
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const shots: Shot[] = JSON.parse(fs.readFileSync(shotsPath, 'utf-8'))
  console.log(`📋 Loaded ${shots.length} shots from shots.json`)

  // Select Provider
  const providerArg = process.argv.find((arg) => arg.startsWith('--provider='))?.split('=')[1]
  let provider: VideoProvider

  if (providerArg === 'manual') {
    provider = new ManualProvider()
  } else if (providerArg === 'http') {
    provider = new HttpProvider()
  } else {
    provider = new KenBurnsProvider()
  }
  console.log(`🎥 Using Video Provider: ${provider.name}`)

  // 1. Generate Individual Clips
  const clipPaths: string[] = []
  for (const shot of shots) {
    const photoPath = path.join(sourcePhotosDir, shot.filename)
    const clipOut = path.join(tempClipsDir, `clip_${shot.id}.mp4`)

    await provider.generateClip({
      id: shot.id,
      imagePath: photoPath,
      prompt: shot.prompt,
      seconds: shot.seconds,
      zoompan: shot.zoompan,
      outputClipPath: clipOut,
    })
    clipPaths.push(clipOut)
  }

  // 2. Stitch with 0.5s Crossfade, Warm Color Grade & Seamless Loop
  console.log('🔄 Stitching clips with 0.5s crossfade and warm color grading...')
  const rawMergedPath = path.join(tempClipsDir, 'raw_merged.mp4')

  // Build filter_complex for xfade transitions
  // Each shot is 3.5s. Transition is 0.5s.
  // Shot 0 ends at 3.5. Transition 1 starts at 3.0s.
  // Shot 1 adds 3.0s (running time 6.0s). Transition 2 at 5.5s.
  // Shot 2 adds 3.0s (running time 8.5s). Transition 3 at 8.0s.
  // Shot 3 adds 3.0s (running time 11.0s). Transition 4 at 10.5s.
  // Shot 4 adds 3.0s (running time 13.5s). Transition 5 at 13.0s.
  // Total duration: ~15.5 - 16s. Perfect for high performance 4G target!
  const inputs = clipPaths.map((cp) => `-i "${cp}"`).join(' ')
  const filterGraph = `
    [0:v][1:v]xfade=transition=fade:duration=0.5:offset=3.0[v01];
    [v01][2:v]xfade=transition=fade:duration=0.5:offset=5.5[v02];
    [v02][3:v]xfade=transition=fade:duration=0.5:offset=8.0[v03];
    [v03][4:v]xfade=transition=fade:duration=0.5:offset=10.5[v04];
    [v04][5:v]xfade=transition=fade:duration=0.5:offset=13.0,
    eq=saturation=1.08:contrast=1.05:gamma=1.02,format=yuv420p[vout]
  `.replace(/\s+/g, '')

  const stitchCmd = `ffmpeg -y ${inputs} -filter_complex "${filterGraph}" -map "[vout]" -c:v libx264 -preset fast -crf 22 -an "${rawMergedPath}"`
  execSync(stitchCmd, { stdio: 'inherit' })

  // 3. Compress into hero-1080.mp4 (crf 28)
  console.log('📦 Compressing hero-1080.mp4 (CRF 28)...')
  const hero1080Mp4 = path.join(outputDir, 'hero-1080.mp4')
  execSync(
    `ffmpeg -y -i "${rawMergedPath}" -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart -an "${hero1080Mp4}"`,
    { stdio: 'inherit' },
  )

  // 4. Compress into hero-1080.webm (VP9)
  console.log('📦 Compressing hero-1080.webm (VP9)...')
  const hero1080Webm = path.join(outputDir, 'hero-1080.webm')
  execSync(
    `ffmpeg -y -i "${rawMergedPath}" -c:v libvpx-vp9 -crf 34 -b:v 0 -deadline realtime -cpu-used 5 -row-mt 1 -pix_fmt yuv420p -an "${hero1080Webm}"`,
    { stdio: 'inherit' },
  )

  // 5. Compress into hero-720.mp4 (crf 30)
  console.log('📦 Compressing hero-720.mp4 (CRF 30, 720p Mobile)...')
  const hero720Mp4 = path.join(outputDir, 'hero-720.mp4')
  execSync(
    `ffmpeg -y -i "${rawMergedPath}" -vf "scale=1280:720" -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart -an "${hero720Mp4}"`,
    { stdio: 'inherit' },
  )

  // 6. Extract Hero Poster Image (hero-poster.jpg)
  console.log('🖼️  Extracting hero-poster.jpg...')
  const heroPoster = path.join(outputDir, 'hero-poster.jpg')
  execSync(`ffmpeg -y -ss 00:00:01 -i "${hero1080Mp4}" -vframes 1 -q:v 2 "${heroPoster}"`, {
    stdio: 'inherit',
  })

  // 7. Verify File Sizes
  const stat1080 = fs.statSync(hero1080Mp4)
  const stat720 = fs.statSync(hero720Mp4)
  const size1080Mb = stat1080.size / (1024 * 1024)
  const size720Mb = stat720.size / (1024 * 1024)

  console.log(`\n📊 Size Verification:`)
  console.log(`  - hero-1080.mp4: ${size1080Mb.toFixed(2)} MB (Max allowed: 6.0 MB)`)
  console.log(`  - hero-720.mp4:  ${size720Mb.toFixed(2)} MB (Max allowed: 3.0 MB)`)

  if (size1080Mb > 6.0) {
    throw new Error(
      `Desktop video hero-1080.mp4 (${size1080Mb.toFixed(2)} MB) exceeds 6 MB threshold! Try raising CRF to 30.`,
    )
  }
  if (size720Mb > 3.0) {
    throw new Error(
      `Mobile video hero-720.mp4 (${size720Mb.toFixed(2)} MB) exceeds 3 MB threshold! Try raising CRF to 32.`,
    )
  }

  // 8. Copy to public folders for immediate frontend & backend consumption
  const copyTargets = [
    path.resolve(rootDir, 'backend/public/media'),
    path.resolve(rootDir, 'frontend/public/media'),
  ]

  for (const target of copyTargets) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true })
    }
    fs.copyFileSync(hero1080Mp4, path.join(target, 'hero-1080.mp4'))
    fs.copyFileSync(hero1080Webm, path.join(target, 'hero-1080.webm'))
    fs.copyFileSync(hero720Mp4, path.join(target, 'hero-720.mp4'))
    fs.copyFileSync(heroPoster, path.join(target, 'hero-poster.jpg'))
  }

  console.log('✅ Hero Video Pipeline completed successfully!')
  console.log(`📁 Output assets located in: ${outputDir} and public/media/`)
}

runPipeline().catch((err) => {
  console.error('❌ Pipeline failed:', err)
  process.exit(1)
})
