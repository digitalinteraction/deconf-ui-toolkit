import { Meta, Story } from '@storybook/vue';
import SidebarItem from './SidebarItem.vue';
import { createText } from '@/story-utils';

export default {
  title: 'Session/SidebarItem',
  component: SidebarItem
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SidebarItem },
  template: `
    <div>
      <SidebarItem title="First Item">
        <p>${createText(0)}</p>
      </SidebarItem>
      <SidebarItem title="Second Item">
        <p>${createText(1)}</p>
      </SidebarItem>
      <SidebarItem title="Third Item">
        <p>${createText(3)}</p>
      </SidebarItem>
    </div>
  `
});

export const Default = Template.bind({});
Default.args = {};
