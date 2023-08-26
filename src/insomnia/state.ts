/* eslint-disable @typescript-eslint/no-explicit-any */


let router: any = null

const getRouter = (): any => {
  if (!router) {
    const root = document.querySelector('#root') as Record<string, any>
    if (!root) {
      return
    }
    const parameter = Object.getOwnPropertyNames(root).findLast((x) => x.startsWith('__reactContainer'))
    router = root[parameter as string]?.memoizedState?.element?.props?.router
  }
  return router
}

export const getState = () => {
  const router = getRouter()
  return router?.state
}

export const getActiveWorkspaceId = (): string => {
  const state = getState()
  return state?.loaderData[':workspaceId'].activeWorkspace._id
}
export const getActiveEnvironmentId = (): string => {
  const state = getState()
  return state?.loaderData[':workspaceId'].activeEnvironment._id
}
