/* eslint-disable @typescript-eslint/no-explicit-any */
import _Vue, { PluginFunction } from 'vue';

import * as components from './components/module';
import * as layouts from './layouts/module';
import * as icons from './icons/module';
import * as lib from './lib/module';

interface InstallFunction extends PluginFunction<{}> {
  insalled?: boolean;
}

// Auto-register components ?
const install: InstallFunction = (Vue: typeof _Vue) => {
  if (install.insalled) return;
  install.insalled = true;
  const all = Object.entries({ ...components, ...layouts, ...icons });
  for (const [componentName, component] of all) {
    Vue.component(componentName, component);
  }
};

const plugin = { install };

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
export * from './components/module';
export * from './icons/module';
export * from './layouts/module';
export * from './store/module';
export { lib };

// TODO: review what is exported with respect to code-splitting
