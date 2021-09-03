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
  static install(Vue: typeof _Vue, interval: number) {
    Vue.prototype.$temporal = new TemporalPlugin(Vue, interval);
  }

  interval: number;
  timerId: number | null = null;
  _vm: CombinedVueInstance<_Vue, Data, {}, {}, {}>;

  get date() {
    return this._vm.date;
  }
  set date(newValue) {
    this._vm.date = newValue;
  }

  constructor(Vue: typeof _Vue, interval: number) {
    this.interval = interval;
    this._vm = new Vue({
      data: (): Data => ({
        date: new Date()
      })
    });
  }

  setup() {
    this.teardown();

    this.timerId = window.setInterval(() => {
      this.date = new Date();
    }, this.interval);
  }

  teardown() {
    if (!this.timerId) return;

    window.clearInterval(this.timerId);
    this.timerId = null;
  }
}
