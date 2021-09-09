import { Meta, Story } from '@storybook/vue';
import NavigationBar from './NavigationBar.vue';
import { BrandA, BrandB, createSettings } from '../../story-lib/module';

export default {
  title: 'App/NavigationBar',
  component: NavigationBar
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  props: ['isLoggedIn', 'isInterpreter'],
  components: { NavigationBar, BrandA, BrandB },
  data: () => ({
    appSettings: createSettings(),
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
