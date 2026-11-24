import fs from 'fs'
import type { GenerateClipArgs, VideoProvider } from './VideoProvider'
import { KenBurnsProvider } from './KenBurnsProvider'

export class HttpProvider implements VideoProvider {
  name = 'HttpProvider'
  private fallback = new KenBurnsProvider()

  async generateClip(args: GenerateClipArgs): Promise<string> {
    const apiUrl = process.env.VIDEO_API_URL
    const apiKey = process.env.VIDEO_API_KEY

    if (!apiUrl || !apiKey) {
      console.log(
        `  [HttpProvider] VIDEO_API_URL or VIDEO_API_KEY not set. Using KenBurnsProvider...`,
      )
      return this.fallback.generateClip(args)
    }

    console.log(`  [HttpProvider] Dispatching request to ${apiUrl} for shot ${args.id}...`)
    try {
      // Example payload structure for Runway Gen-3 / Luma Dream Machine / Kling API
      // Developers can customize this exact schema depending on provider choice
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt_text: args.prompt,
          duration: Math.round(args.seconds),
          ratio: '16:9',
          // Optionally send image as base64 or public URL
        }),
      })

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}: ${response.statusText}`)
      }

      const data = (await response.json()) as { videoUrl?: string }
      if (data.videoUrl) {
        const videoBuffer = await fetch(data.videoUrl).then((r) => r.arrayBuffer())
        fs.writeFileSync(args.outputClipPath, Buffer.from(videoBuffer))
        return args.outputClipPath
      }

      throw new Error('No videoUrl found in API response')
    } catch (err) {
      console.warn(
        `  [HttpProvider] Call failed (${err instanceof Error ? err.message : 'Unknown'}). Falling back to KenBurns...`,
      )
      return this.fallback.generateClip(args)
    }
  }
}
