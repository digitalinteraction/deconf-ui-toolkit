import { Meta, Story } from '@storybook/vue';
import NavigationBar from './NavigationBar.vue';
import { createSettings } from '../../story-utils';

export default {
  title: 'App/NavigationBar',
  component: NavigationBar
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  props: ['isLoggedIn', 'isInterpreter'],
  components: { NavigationBar },
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
      :is-logged-in="isLoggedIn"
      :is-interpreter="isInterpreter"
      :routes="routes"
    >
      <img
        slot="brandA"
        src="/brand.svg"
        width="160"
        height="28"
      />
      <img
        slot="brandB"
        src="/openlab.svg"
        width="110"
        height="28"
      />
    </NavigationBar>
  `
});

export const Desktop = Template.bind({});
Desktop.args = {
  isLoggedIn: true,
  isInterpreter: true
};
Desktop.parameters = {
  layout: 'fullscreen'
};

export const Mobile = Template.bind({});
Mobile.args = {
  ...Desktop.args
};
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' },
  layout: 'fullscreen'
};
