import { getPayload } from 'payload'
import config from '../payload.config'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

async function uploadToCms() {
  console.log('🚀 Connecting to Payload Local API to link hero video assets...')
  const payload = await getPayload({ config })

  const rootDir = path.resolve(process.cwd(), '..')
  const outputDir = path.resolve(rootDir, 'video/output')

  const files = [
    {
      filename: 'hero-1080.mp4',
      mimeType: 'video/mp4',
      alt: 'Dr. Netaji Karale Vidyalaya Campus Cinematic Overview (Desktop 1080p)',
      fieldKey: 'videoDesktop',
    },
    {
      filename: 'hero-720.mp4',
      mimeType: 'video/mp4',
      alt: 'Dr. Netaji Karale Vidyalaya Campus Cinematic Overview (Mobile 720p)',
      fieldKey: 'videoMobile',
    },
    {
      filename: 'hero-poster.jpg',
      mimeType: 'image/jpeg',
      alt: 'Dr. Netaji Karale Vidyalaya School Building Campus Frontage at Golden Hour',
      fieldKey: 'posterImage',
    },
  ]

  const mediaIds: Record<string, number> = {}

  for (const item of files) {
    const filePath = path.join(outputDir, item.filename)
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Warning: ${filePath} does not exist. Run the pipeline first.`)
      continue
    }

    const fileBuffer = fs.readFileSync(filePath)
    const fileStats = fs.statSync(filePath)

    console.log(
      `  Uploading ${item.filename} (${(fileStats.size / (1024 * 1024)).toFixed(2)} MB)...`,
    )

    // Create media item
    const mediaDoc = await payload.create({
      collection: 'media',
      data: {
        alt: item.alt,
        caption: 'Official Dr. Netaji Karale Vidyalaya campus footage',
      },
      file: {
        data: fileBuffer,
        name: item.filename,
        mimetype: item.mimeType,
        size: fileStats.size,
      },
    })

    console.log(`  ✓ Created Media record: ID ${mediaDoc.id}`)
    mediaIds[item.fieldKey] = Number(mediaDoc.id)
  }

  // Update Homepage Global
  console.log('📝 Updating Homepage Global with video and poster media links...')
  const homepage = await payload.findGlobal({ slug: 'homepage' })

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      ...homepage,
      hero: {
        ...homepage.hero,
        videoDesktop: mediaIds.videoDesktop || (homepage.hero?.videoDesktop as any),
        videoMobile: mediaIds.videoMobile || (homepage.hero?.videoMobile as any),
        posterImage: mediaIds.posterImage || (homepage.hero?.posterImage as any),
      },
    } as any,
  })

  console.log('🎉 Successfully linked hero video assets to Homepage Global in CMS!')
  process.exit(0)
}

uploadToCms().catch((err) => {
  console.error('❌ Failed to upload to CMS:', err)
  process.exit(1)
})
