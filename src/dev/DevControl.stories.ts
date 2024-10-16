import { Meta } from '@storybook/vue3';
import { DevPlugin } from '../lib/module';
import DevControl from './DevControl.vue';

export default {
  title: 'Dev/DevControl',
  component: DevControl,
} as Meta;

const dev = new DevPlugin();

const Template = (args: any) => ({
  props: ['enableSlotState', 'enableScheduleDate'],
  components: { DevControl },
  data: () => ({
    plugin: Object.freeze({ dev }),
  }),
  computed: {
    controls(): string[] {
      const result: string[] = [];
      if (args.enableSlotState) result.push('slotState');
      if (args.enableScheduleDate) result.push('scheduleDate');
      return result;
    },
    devData(): unknown {
      return JSON.stringify(
        {
          isEnabled: dev.isEnabled,
          isVisible: dev.isVisible,
          slotState: dev.slotState || 'null',
          scheduleDate: dev.scheduleDate
            ? dev.scheduleDate.toLocaleString()
            : 'null',
        },
        null,
        2,
      );
    },
  },
  template: `
    <div style="position: relative; width: 100vw; height: 100vh">
      <pre>{{ devData }}</pre>
      <DevControl
        :dev-plugin="plugin.dev"
        :force-enable="true"
        :controls="controls"
      >
        <template slot="extras">
          <div class="devControl-block">
            <p class="has-text-centered">A custom extra command</p>
          </div>
        </template>
      </DevControl>
    </div>
  `,
});

export const Default = {
  render: Template,
  args: {
    enableSlotState: true,
    enableScheduleDate: true,
  },
  parameters: { layout: 'fullscreen' },
};
