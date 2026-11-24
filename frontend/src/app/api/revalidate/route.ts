import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const REVALIDATION_SECRET =
  process.env.REVALIDATION_SECRET || 'dnkv_secure_revalidation_secret_token_2026'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (token !== REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { path, tag } = body

    if (tag) {
      revalidateTag(tag, { expire: 0 })
      console.log(`[Revalidation API] Revalidated tag: ${tag}`)
    }

    if (path) {
      revalidatePath(path)
      console.log(`[Revalidation API] Revalidated path: ${path}`)
    } else {
      revalidatePath('/', 'layout')
    }

    return NextResponse.json({
      revalidated: true,
      path: path || null,
      tag: tag || null,
      now: Date.now(),
    })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err instanceof Error ? err.message : 'Unknown' },
      { status: 500 },
    )
  }
}
