import { App, Component, reactive, ref, Ref } from 'vue'

interface Data {
  date: Date
}

// TODO: I have no idea if this will work

/**
 * A plugin to provide a $temporal.date object that can be bound to in components.
 * The date is only updated every `interval` milliseconds.
 *
 * It uses an internal Vue instance to with object getters to provide reactivity.
 */
export class TemporalPlugin {
  static install(app: App, interval: number = 1000) {
    app.config.globalProperties.$temporal = new TemporalPlugin(interval)
  }

  interval: number
  timerId: number | null = null
  _vm: Data

  get date() {
    return this._vm.date
  }
  set date(newValue) {
    this._vm.date = newValue
  }

  constructor(interval: number) {
    this.interval = interval

    this._vm = reactive({
      date: new Date(),
    })
  }

  setup() {
    this.teardown()

    this.timerId = window.setInterval(() => {
      this.date = new Date()
    }, this.interval)
  }

  teardown() {
    if (!this.timerId) return

    window.clearInterval(this.timerId)
    this.timerId = null
  }
}

export function pause(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}
