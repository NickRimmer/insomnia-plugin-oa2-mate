/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseDoc } from './insomnia.types'

let store: any = null

export const getStore = (): any => {
  if (!store) {
    const root = document.querySelector('#root') as Record<string, any>
    const parameter = Object.getOwnPropertyNames(root).findLast(x => x.startsWith('__reactContainer')) as string
    store = root[parameter].memoizedState.element.props.store
  }

  return store
}

export const getState = (): any => {
  const store = getStore()
  return store.getState()
}

export const getActiveWorkspace = (): BaseDoc => {
  const state = getState()
  const workspaceId = state.global.activeWorkspaceId
  const workspace = state.entities.workspaces[workspaceId]
  return workspace
}

export const getActiveEnvironment = (): BaseDoc | null => {
  const state = getState()
  const activeWorkspaceId = getActiveWorkspace()._id
  const activeWorkspaceMeta = (Object.values(state.entities.workspaceMetas) as any[]).find(x => x.parentId === activeWorkspaceId) as BaseDoc
  const activeEnvironmentId = activeWorkspaceMeta.activeEnvironmentId
  const activeEnvironment = state.entities.environments[activeEnvironmentId] ?? null as (BaseDoc | null)

  return activeEnvironment
}
