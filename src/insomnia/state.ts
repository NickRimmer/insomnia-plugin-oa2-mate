/* eslint-disable @typescript-eslint/no-explicit-any */

let store: any = null
let state: any = null

export const insomniaContext = {
  getStore: (): any => {
    if (!store) {
      const root = document.querySelector('#root') as Record<string, any>
      const parameter = Object.getOwnPropertyNames(root).findLast(x => x.startsWith('__reactContainer')) as string
      store = root[parameter].memoizedState.element.props.store
    }

    return store
  },

  getState: (): any => {
    if (!state) {
      const store = insomniaContext.getStore()
      state = store.getState()
    }

    return state
  }
}
