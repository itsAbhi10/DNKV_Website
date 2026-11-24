import fs from 'fs'
import path from 'path'
import type { GenerateClipArgs, VideoProvider } from './VideoProvider'
import { KenBurnsProvider } from './KenBurnsProvider'

export class ManualProvider implements VideoProvider {
  name = 'ManualProvider'
  private fallback = new KenBurnsProvider()

  async generateClip(args: GenerateClipArgs): Promise<string> {
    const { id, outputClipPath } = args
    const clipsDir = path.resolve(process.cwd(), 'video/clips')
    const manualClipPath = path.join(clipsDir, `${id}.mp4`)

    if (fs.existsSync(manualClipPath)) {
      console.log(
        `  [ManualProvider] Found manual pre-generated clip for "${id}": ${manualClipPath}`,
      )
      fs.copyFileSync(manualClipPath, outputClipPath)
      return outputClipPath
    }

    console.log(
      `  [ManualProvider] No clip found at ${manualClipPath}. Falling back to KenBurnsProvider...`,
    )
    return this.fallback.generateClip(args)
  }
}
