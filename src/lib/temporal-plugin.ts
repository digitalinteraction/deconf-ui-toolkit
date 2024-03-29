import _Vue from 'vue';
import { CombinedVueInstance } from 'vue/types/vue';

interface Data {
  date: Date;
}

/**
 * A plugin to provide a $temporal.date object that can be bound to in components.
 * The date is only updated every `interval` milliseconds.
 *
 * It uses an internal Vue instance to with object getters to provide reactivity.
 */
export class TemporalPlugin {
  static install(Vue: typeof _Vue, interval = 1000): void {
    Vue.prototype.$temporal = new TemporalPlugin(Vue, interval);
  }

  interval: number;
  timerId: number | null = null;
  _vm: CombinedVueInstance<_Vue, Data, unknown, unknown, unknown>;

  get date(): Date {
    return this._vm.date;
  }
  set date(newValue: Date) {
    this._vm.date = newValue;
  }

  constructor(Vue: typeof _Vue, interval: number) {
    this.interval = interval;
    this._vm = new Vue({
      data: (): Data => ({
        date: new Date(),
      }),
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
