import { BaseDoc, subscribe, getActiveEnvironment, getActiveWorkspace } from '../insomnia'
import { database } from '../services/db'
import { StoredToken } from './main.types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const onTokenUpdate = (token: BaseDoc) => {
  const activeWorkspace = getActiveWorkspace()
  const activeEnvironment = getActiveEnvironment()
  // console.log('[oa2-mate] Token updated', { requestId: token.parentId, accessToken: token.accessToken })

  const tokenToStore: StoredToken = {
    accessToken: token.accessToken,
    environmentId: activeEnvironment?._id ?? null,
    workspaceId: activeWorkspace._id,
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
  const activeWorkspace = getActiveWorkspace()
  const activeEnvironment = getActiveEnvironment()
  return await getTokenAsync(activeWorkspace._id, activeEnvironment?._id ?? null)
}
