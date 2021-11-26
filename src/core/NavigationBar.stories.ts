import { Meta, Story } from '@storybook/vue';
import NavigationBar from './NavigationBar.vue';
import {
  BrandA,
  BrandB,
  LanguageControl,
  mockSettings
} from '../story-lib/module';

export default {
  title: 'Core/NavigationBar',
  component: NavigationBar
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  props: [
    'isLoggedIn',
    'isInterpreter',
    'showProfile',
    'showInterpret',
    'showLogin',
    'showRegister'
  ],
  components: { NavigationBar, BrandA, BrandB, LanguageControl },
  data: () => ({
    appSettings: mockSettings(),
    routes: [
      {
        name: 'A',
        title: 'Route A',
        enabled: true
      },
      {
        name: 'B',
        title: 'Route B',
        enabled: true
      },
      {
        name: 'C',
        title: 'Route C',
        enabled: true
      },
      {
        name: 'D',
        title: 'Route D',
        enabled: false
      }
    ]
  }),
  computed: {
    links(): string[] {
      const links: string[] = [];
      if (this.showInterpret) links.push('interpret');
      if (this.showProfile) links.push('profile');
      if (this.showLogin) links.push('login');
      if (this.showRegister) links.push('register');
      return links;
    }
  },
  template: `
    <NavigationBar
      :app-settings="appSettings"
      :routes="routes"
      :is-logged-in="isLoggedIn"
      :is-interpreter="isInterpreter"
      :links="links"
    >
      <BrandA slot="brandA" />
      <BrandB slot="brandB" />
      <LanguageControl slot="languageControl" />
     </NavigationBar>
  `
});

export const Desktop = Template.bind({});
Desktop.args = {
  isLoggedIn: true,
  isInterpreter: true,

  showInterpret: true,
  showProfile: true,
  showRegister: true,
  showLogin: true
};
Desktop.parameters = {
  layout: 'fullscreen',
  controls: {
    exclude: ['appSettings', 'routes', 'brandA', 'brandB']
  }
};

export const Mobile = Template.bind({});
Mobile.args = {
  ...Desktop.args
};
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' },
  layout: 'fullscreen',
  controls: {
    exclude: ['appSettings', 'routes', 'brandA', 'brandB']
  }
};
