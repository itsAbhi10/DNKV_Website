import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
const REVALIDATION_SECRET =
  process.env.REVALIDATION_SECRET || 'dnkv_secure_revalidation_secret_token_2026'

async function triggerRevalidation(payload: { path?: string; tag?: string }) {
  try {
    const res = await fetch(`${FRONTEND_URL}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${REVALIDATION_SECRET}`,
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.warn(`[Revalidation] Failed to revalidate: ${res.statusText}`)
    } else {
      console.log(`[Revalidation] Triggered revalidation successfully:`, payload)
    }
  } catch (error) {
    // Non-blocking in dev if frontend is not running yet
    console.warn(
      `[Revalidation] Notice: Frontend revalidation server unreachable (${error instanceof Error ? error.message : 'Unknown'})`,
    )
  }
}

export const revalidateCollectionAfterChange = (
  tag: string,
  getPath?: (doc: any) => string,
): CollectionAfterChangeHook => {
  return async ({ doc }) => {
    const path = getPath ? getPath(doc) : '/'
    await triggerRevalidation({ path, tag })
    return doc
  }
}

export const revalidateCollectionAfterDelete = (
  tag: string,
  getPath?: (doc: any) => string,
): CollectionAfterDeleteHook => {
  return async ({ doc }) => {
    const path = getPath ? getPath(doc) : '/'
    await triggerRevalidation({ path, tag })
    return doc
  }
}

export const revalidateGlobalAfterChange = (
  tag: string,
  path: string = '/',
): GlobalAfterChangeHook => {
  return async ({ doc }) => {
    await triggerRevalidation({ path, tag })
    return doc
  }
}
