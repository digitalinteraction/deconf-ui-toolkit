import Vue, { PluginFunction, VueConstructor } from 'vue';

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

declare const DeconfPlugin: { install: InstallFunction };
// export default DeconfPlugin;

type DeconfUIModule = {
  default: typeof DeconfPlugin;
} & {
  [idx: string]: typeof Vue;
};

export = DeconfUIModule;
