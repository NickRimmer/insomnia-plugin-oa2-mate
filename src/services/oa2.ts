/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseDoc, insomniaContext } from '../insomnia'

const getElement = (id: string): BaseDoc | null => {
  const state = insomniaContext.getState()
  if (id.startsWith('oa2_')) return state.entities.oAuth2Tokens[id]
  if (id.startsWith('req_')) return state.entities.requests[id]
  if (id.startsWith('fld_')) return state.entities.requestGroups[id]
  if (id.startsWith('wrk_')) return state.entities.workspaces[id]

  console.error('Unknown id type: ' + id)
  return null
}

const getWorkspaceId = (id: string): string | null => {
  if (id.startsWith('wrk_')) return id

  const element = getElement(id)
  if (element === null) return null
  return getWorkspaceId(element.parentId)
}

const getOa2WorkspaceId = (id: string): string | null => {
  const workspaceId = getWorkspaceId(id)
  if (workspaceId === null) return null

  return workspaceId
}

export const getOa2 = (workspaceId: string): string | null => {
  const state = insomniaContext.getState()
  const allTokens = Object.values(state.entities.oAuth2Tokens) as BaseDoc[]

  // console.log(allTokens)
  const workspaceTokens = allTokens.filter(x => getOa2WorkspaceId(x._id) === workspaceId)
  if (workspaceTokens.length === 0) {
    console.warn('No tokens found for workspace ' + workspaceId)
    return null
  }

  const oa2Resource = workspaceTokens.sort((a, b) => b.modified - a.modified)[0] as any
  return oa2Resource.accessToken
}
