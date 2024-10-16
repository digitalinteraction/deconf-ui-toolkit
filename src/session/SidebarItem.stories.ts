import { Meta } from '@storybook/vue3';
import SidebarItem from './SidebarItem.vue';
import { Content } from '../story-lib/module';

export default {
  title: 'Session/SidebarItem',
  component: SidebarItem,
} as Meta;

const Template = (args: unknown) => ({
  setup: () => args,
  components: { SidebarItem, Content },
  template: `
    <SidebarItem title="First Item">
      <Content :size="1" />
    </SidebarItem>
    <SidebarItem title="Second Item">
      <Content :size="1" />
    </SidebarItem>
    <SidebarItem title="Third Item">
      <Content :size="1" />
    </SidebarItem>
  `,
});

export const Default = {
  render: Template,
};
