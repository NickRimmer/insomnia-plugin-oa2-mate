import { WindowApp, WindowMain } from './insomnia/insomnia.types'

declare global {
  interface Window {
    app: WindowApp,
    main: WindowMain
  }
}
