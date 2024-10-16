import { Component, markRaw } from 'vue';
import { reactive, App } from 'vue';

interface Data {
  component: Component | null;
  props: Record<string, unknown>;
}

export class DialogPlugin {
  static shared: DialogPlugin | null = null;

  get component(): unknown {
    return this._vm.component;
  }
  get props(): Record<string, unknown> {
    return this._vm.props;
  }

  // Use an internal vue component to fake the reactivity of properties
  // so consumers can bind to $dev values
  _vm: Data;

  static install(app: App): void {
    const plugin = new DialogPlugin();
    app.config.globalProperties.$dialog = plugin;
    DialogPlugin.shared = plugin;
  }

  constructor() {
    this._vm = reactive({
      component: null,
      props: {},
    });
  }

  show(component: Component, props = {}): void {
    this._vm.component = markRaw(component);
    this._vm.props = props;
  }
  close(): void {
    this._vm.component = null;
    this._vm.props = {};
  }
}
