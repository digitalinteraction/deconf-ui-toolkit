import { DeconfPlugin, DevPlugin } from './lib/module'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $dev: DevPlugin
    $deconf: DeconfPlugin
    $i18n: {
      locale: string
    }
    $t(...args: unknown[]): any
    $tc(...args: unknown[]): any
    $store: {
      dispatch(key: string, payload?: unknown): unknown
    }
  }
}
