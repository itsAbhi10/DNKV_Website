export interface GenerateClipArgs {
  id: string
  imagePath: string
  prompt: string
  seconds: number
  aspect?: string
  zoompan?: string
  outputClipPath: string
}

export interface VideoProvider {
  name: string
  generateClip(args: GenerateClipArgs): Promise<string>
}
