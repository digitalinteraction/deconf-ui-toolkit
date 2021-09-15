import { App, reactive } from 'vue'
import { SlotState } from './types'

// TODO: I have no idea if this will work

interface Data {
  isEnabled: boolean
  isVisible: boolean
  slotState: SlotState | undefined
  scheduleDate: Date | undefined
}

function shouldInitiallyShowDevTools() {
  if (process.env.NODE_ENV === 'development') return true

  const url = new URL(location.href)
  if (url.searchParams.has('dev')) return true

  return false
}

export class DevPlugin {
  static install(app: App) {
    app.config.globalProperties.$dev = new DevPlugin()
  }

  // Use an internal vue component to fake the reactivity of properties
  // so consumers can bind to $dev values
  _vm: Data

  get slotState() {
    return this._vm.slotState
  }
  set slotState(newValue) {
    this._vm.slotState = newValue
  }

  get isEnabled() {
    return this._vm.isEnabled
  }
  set isEnabled(newValue) {
    this._vm.isEnabled = newValue
  }

  get isVisible() {
    return this._vm.isVisible
  }
  set isVisible(newValue) {
    this._vm.isVisible = newValue
  }

  get scheduleDate() {
    return this._vm.scheduleDate
  }
  set scheduleDate(newValue) {
    this._vm.scheduleDate = newValue
  }

  constructor() {
    this._vm = reactive({
      isEnabled: shouldInitiallyShowDevTools(),
      isVisible: false,
      slotState: undefined,
      scheduleDate: undefined,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any)._enableDevMode = () => {
      this.isEnabled = true
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any)._disableDevMode = () => {
      this.isEnabled = false
    }
  }
}
