import { BaseDoc, subscribe, getActiveEnvironmentId, getActiveWorkspaceId } from '../insomnia'
import { database } from '../services/db'
import { StoredToken } from './main.types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const onTokenUpdate = (token: BaseDoc) => {
  const activeWorkspaceId = getActiveWorkspaceId()
  const activeEnvironmentId = getActiveEnvironmentId()
  // console.log('[oa2-mate] Token updated', { requestId: token.parentId, accessToken: token.accessToken })

  const tokenToStore: StoredToken = {
    accessToken: token.accessToken,
    environmentId: activeEnvironmentId ?? null,
    workspaceId: activeWorkspaceId,
    createdAt: Date.now(),
  }

  database.update<StoredToken>(
    { workspaceId: tokenToStore.workspaceId, environmentId: tokenToStore.environmentId },
    tokenToStore,
    { upsert: true },
    (err, affectedNum) => {
      if (err) console.error('[oa2-mate] Failed to store token', err)
      else if (affectedNum !== 1) console.warn('[oa2-mate] Unexpected amount of affected rows', affectedNum)
    })
}

const getTokenAsync = (workspaceId: string, environmentId: string | null) => new Promise<StoredToken | null>((resolve, reject) => {
  database.findOne<StoredToken | null>({ workspaceId, environmentId }, (err, doc) => {
    if (err) reject(err)
    else resolve(doc)
  })
})

const getTokensAsync = (workspaceId: string) => new Promise<StoredToken[]>((resolve, reject) => {
  database.find<StoredToken>({ workspaceId }, {}, (err, docs) => {
    if (err) reject(err)
    else resolve(docs ?? [])
  })
})

export const init = async () => {
  let maxRetries = 20
  do {
    if (module.parent) {
      subscribe((method, doc) => {
        if (method !== 'update' && method !== 'insert') return
        if (doc.type !== 'OAuth2Token') return
        onTokenUpdate(doc)
      })

      console.log('[oa2-mate] Initialized')
      break
    }

    delay(500)
  } while (maxRetries-- > 0)

  if (maxRetries <= 0) console.error('[oa2-mate] Failed to initialize')
}

export const getCurrentTokenAsync = async (): Promise<StoredToken | null> => {
  const activeWorkspaceId = getActiveWorkspaceId();
  const activeEnvironmentId = getActiveEnvironmentId()
  return await getTokenAsync(activeWorkspaceId, activeEnvironmentId ?? null)
}

export const getLatestTokenAsync = async (): Promise<StoredToken | null> => {
  const activeWorkspaceId = getActiveWorkspaceId();
  const tokens = await getTokensAsync(activeWorkspaceId)
  if (tokens.length === 0) return null
  return tokens.reduce((prev, curr) => prev.createdAt > curr.createdAt ? prev : curr, tokens[0] ?? null)
}
