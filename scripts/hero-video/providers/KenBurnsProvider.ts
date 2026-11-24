import { execSync } from 'child_process'
import fs from 'fs'
import type { GenerateClipArgs, VideoProvider } from './VideoProvider'

export class KenBurnsProvider implements VideoProvider {
  name = 'KenBurnsProvider'

  async generateClip(args: GenerateClipArgs): Promise<string> {
    const { imagePath, seconds, zoompan, outputClipPath } = args

    if (!fs.existsSync(imagePath)) {
      throw new Error(`[KenBurnsProvider] Input image not found: ${imagePath}`)
    }

    const durationFrames = Math.round(seconds * 25)
    const zpExpression = zoompan || "zoom+0.0015:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"

    console.log(
      `  [KenBurnsProvider] Generating clip for ${args.id} (${seconds}s, ${durationFrames} frames)...`,
    )

    // ffmpeg command: precise frame limit and ultrafast preset
    const cmd = `ffmpeg -y -loop 1 -i "${imagePath}" -vf "scale=1920:1080,zoompan=z='${zpExpression}':d=${durationFrames}:s=1920x1080:fps=25,format=yuv420p" -frames:v ${durationFrames} -c:v libx264 -preset ultrafast -crf 24 -pix_fmt yuv420p -an "${outputClipPath}"`

    execSync(cmd, { stdio: 'pipe' })
    return outputClipPath
  }
}
