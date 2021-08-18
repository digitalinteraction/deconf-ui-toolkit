import Vue from 'vue';
import { Meta, Story } from '@storybook/vue';
import { DevPlugin } from '../../lib/module';
import DevControl from './DevControl.vue';

export default {
  title: 'Dev/DevControl',
  component: DevControl
} as Meta;

const dev = new DevPlugin(Vue);

const Template: Story = (args, { argTypes }) => ({
  components: { DevControl },
  data: () => ({
    plugin: Object.freeze({ dev })
  }),
  computed: {
    devData(): any {
      return JSON.stringify(
        {
          isEnabled: dev.isEnabled,
          isVisible: dev.isVisible,
          slotState: dev.slotState || 'null',
          scheduleDate: dev.scheduleDate || 'null'
        },
        null,
        2
      );
    }
  },
  template: `
    <div style="position: relative; width: 100vw; height: 100vh">
      <pre>{{ devData }}</pre>
      <DevControl
        :dev-plugin="plugin.dev"
      />
    </div>
  `
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = { layout: 'fullscreen' };
