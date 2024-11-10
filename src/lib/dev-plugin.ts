import { reactive, App } from 'vue';
import { SlotState } from './types';

export interface _Data {
  isEnabled: boolean;
  isVisible: boolean;
  slotState: SlotState | undefined;
  scheduleDate: Date | undefined;
}

function shouldInitiallyShowDevTools() {
  if (process.env.NODE_ENV === 'development') return true;

  const url = new URL(location.href);
  if (url.searchParams.has('dev')) return true;

  return false;
}

export class DevPlugin {
  static install(app: App): void {
    // Vue.prototype.$dev = new DevPlugin(Vue);
    app.config.globalProperties.$dev = new DevPlugin();
  }

  // Use an internal vue component to fake the reactivity of properties
  // so consumers can bind to $dev values
  _vm: _Data;

  get slotState(): SlotState | undefined {
    return this._vm.slotState;
  }
  set slotState(newValue: SlotState | undefined) {
    this._vm.slotState = newValue;
  }

  get isEnabled(): boolean {
    return this._vm.isEnabled;
  }
  set isEnabled(newValue: boolean) {
    this._vm.isEnabled = newValue;
  }

  get isVisible(): boolean {
    return this._vm.isVisible;
  }
  set isVisible(newValue: boolean) {
    this._vm.isVisible = newValue;
  }

  get scheduleDate(): Date | undefined {
    return this._vm.scheduleDate;
  }
  set scheduleDate(newValue: Date | undefined) {
    this._vm.scheduleDate = newValue;
  }

  constructor() {
    this._vm = reactive({
      isEnabled: shouldInitiallyShowDevTools(),
      isVisible: false,
      slotState: undefined,
      scheduleDate: undefined,
    });

    this.vagueWindow()._enableDevMode = () => {
      this.isEnabled = true;
    };

    this.vagueWindow()._disableDevMode = () => {
      this.isEnabled = true;
    };
  }

  vagueWindow() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return window as any as Record<string, unknown>;
  }
}
