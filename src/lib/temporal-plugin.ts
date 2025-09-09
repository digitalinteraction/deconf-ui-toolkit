import { reactive, App } from 'vue';

export interface _Data {
  date: Date;
  timeZone: string;
}

/**
 * A plugin to provide a $temporal.date object that can be bound to in components.
 * The date is only updated every `interval` milliseconds.
 *
 * It uses an internal Vue instance to with object getters to provide reactivity.
 */
export class TemporalPlugin {
  static install(app: App, interval = 1000): void {
    app.config.globalProperties.$temporal = new TemporalPlugin(interval);
  }

  interval: number;
  timerId: number | null = null;
  _vm: _Data;

  get date(): Date {
    return this._vm.date;
  }
  set date(newValue: Date) {
    this._vm.date = newValue;
  }

  get timeZone(): string {
    return this._vm.timeZone;
  }
  set timeZone(newValue: string) {
    this._vm.timeZone = newValue;
  }

  constructor(interval: number) {
    this.interval = interval;
    this._vm = reactive({
      date: new Date(),
      timeZone: 'system',
    });
  }

  setup(): void {
    this.teardown();

    this.timerId = window.setInterval(() => {
      this.date = new Date();
    }, this.interval);
  }

  teardown(): void {
    if (!this.timerId) return;

    window.clearInterval(this.timerId);
    this.timerId = null;
  }
}

export function pause(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
