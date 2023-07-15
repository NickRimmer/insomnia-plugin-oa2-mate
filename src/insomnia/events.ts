/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseDoc } from './insomnia.types'

type DbChangeMethod = 'insert' | 'update' | 'remove'

type EventListener = (
  method: DbChangeMethod,
  doc: BaseDoc,
) => void

// event id helps to remove orphaned event listeners
const storageKey = 'plugin-oa2-mate-event-handler-id'
const eventHandlerId = Math.random().toString(36).substring(2)
localStorage.setItem(storageKey, eventHandlerId)

const listeners: EventListener[] = []

const unsubscribe = window.main.on('db.changes', (_: unknown, changes: any[][]) => {
  const currentEventHandlerId = localStorage.getItem(storageKey)
  if (currentEventHandlerId !== eventHandlerId) {
    unsubscribe()
    console.warn('[oa2-mate]', 'Unsubscribed old event handler')
    return
  }

  return changes.forEach(([method, doc]) => {
    if (!method || !doc) {
      console.log('[oa2-mate]', 'unkonwn method or doc', method, doc)
      return
    }

    listeners.forEach(listener => {
      try {
        listener(method, doc)
      } catch (e) {
        // whell... what can we do?
      }
    })
  })
})

export const subscribe = (listener: EventListener): () => void => {
  listeners.push(listener)
  return () => listeners.splice(listeners.indexOf(listener), 1)
}
