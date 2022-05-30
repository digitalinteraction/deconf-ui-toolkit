import { Meta, Story } from '@storybook/vue';
import { TabIcon } from '../story-lib/module';
import SideTabs from './SideTabs.vue';

export default {
  title: 'Core/SideTabs',
  component: SideTabs,
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SideTabs },
  props: [],
  data: () => ({
    routes: [
      {
        name: 'A',
        title: 'Atrium',
        enabled: true,
        icon: TabIcon,
        active: true,
      },
      {
        name: 'B',
        title: "What's on",
        enabled: true,
        icon: TabIcon,
        active: false,
      },
      {
        name: 'C',
        title: 'Schedule',
        enabled: true,
        icon: TabIcon,
        active: false,
      },
      {
        name: 'D',
        title: 'CoffeeChat',
        enabled: false,
        icon: TabIcon,
        active: false,
      },
      {
        name: 'E',
        title: 'HelpDesk',
        enabled: false,
        icon: TabIcon,
        active: false,
      },
    ],
  }),
  template: `
    <SideTabs :routes="routes">
      <img
        slot="brand"
        src="/square-brand.svg"
        width="64"
        height="64"
      />
    </SideTabs>
  `,
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  controls: {
    exclude: ['routes', 'brand'],
  },
};
