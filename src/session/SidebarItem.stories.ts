import { Meta } from '@storybook/vue3';
import SidebarItem from './SidebarItem.vue';
import { Content } from '../story-lib/module';

export default {
  title: 'Session/SidebarItem',
  component: SidebarItem,
} as Meta;

const Template = (args: unknown) => ({
  props: Object.keys(argTypes),
  components: { SidebarItem, Content },
  template: `
    <div>
      <SidebarItem title="First Item">
        <Content :size="1" />
      </SidebarItem>
      <SidebarItem title="Second Item">
        <Content :size="1" />
      </SidebarItem>
      <SidebarItem title="Third Item">
        <Content :size="1" />
      </SidebarItem>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};
