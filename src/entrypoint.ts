import _Vue, { PluginFunction } from 'vue';

import * as components from '@/components/index';

interface InstallFunction extends PluginFunction<{}> {
  insalled?: boolean;
}

// Auto-register components ?
const install: InstallFunction = (Vue: typeof _Vue) => {
  if (install.insalled) return;
  install.insalled = true;
  for (const [componentName, component] of Object.entries(components)) {
    Vue.component(componentName, component);
  }
};

const plugin = { install };

// function getGlobalVue() {
//   return (window ?? globalThis ?? global)?.Vue
//   if (typeof window !== 'undefined') return window.Vue
//   if (typeof global !== 'undefined') return (global as any).Vue
// }

// Auto-register if added as a script tag?
if (process.env.ES_BUILD === 'false') {
  let GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    GlobalVue = (global as any).Vue;
  }
  if (GlobalVue) {
    (GlobalVue as typeof _Vue).use(plugin);
  }
}

// Export the plugin for manual installs
export default plugin;

// Export components for clients
export * from '@/components';
export * from '@/types';
