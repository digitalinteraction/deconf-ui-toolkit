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
  props: ['isLoggedIn', 'isInterpreter'],
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
  template: `
    <NavigationBar
      :app-settings="appSettings"
      :routes="routes"
      :is-logged-in="isLoggedIn"
      :is-interpreter="isInterpreter"
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
  isInterpreter: true
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
