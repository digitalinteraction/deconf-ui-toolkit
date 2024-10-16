import { Meta } from '@storybook/vue3';
import NavigationBar from './NavigationBar.vue';
import {
  BrandA,
  BrandB,
  LanguageControl,
  mockSettings,
} from '../story-lib/module';

export default {
  title: 'Core/NavigationBar',
  component: NavigationBar,
} as Meta;

const Template = (args: any) => ({
  components: { NavigationBar, BrandA, BrandB, LanguageControl },
  setup: () => args,
  data: () => ({
    appSettings: mockSettings(),
    routes: [
      {
        name: 'A',
        title: 'Route A',
        enabled: true,
      },
      {
        name: 'B',
        title: 'Route B',
        enabled: true,
      },
      {
        name: 'C',
        title: 'Route C',
        enabled: true,
      },
      {
        name: 'D',
        title: 'Route D',
        enabled: false,
      },
    ],
  }),
  computed: {
    links(): string[] {
      const links: string[] = [];
      if (args.showInterpret) links.push('interpret');
      if (args.showProfile) links.push('profile');
      if (args.showLogin) links.push('login');
      if (args.showRegister) links.push('register');
      return links;
    },
  },
  template: `
    <NavigationBar
      :app-settings="appSettings"
      :routes="routes"
      :is-logged-in="isLoggedIn"
      :is-interpreter="isInterpreter"
      :links="links"
    >
      <template v-slot:brandA>
        <BrandA />
      </template>
      
      <template v-slot:brandB>
        <BrandB />
      </template>

      <template v-slot:languageControl>
        <LanguageControl />
      </template>

     </NavigationBar>
  `,
});

export const Default = {
  render: Template,
  args: {
    isLoggedIn: true,
    isInterpreter: true,

    showInterpret: true,
    showProfile: true,
    showRegister: true,
    showLogin: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};
