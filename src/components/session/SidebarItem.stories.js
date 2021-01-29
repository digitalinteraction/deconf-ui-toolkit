import SidebarItem from './SidebarItem.vue';
import { createText } from '@/utils';

export default {
  title: 'Session/SidebarItem',
  component: SidebarItem
};

// const Template = createTemplate({ SidebarItem });
const Template = (args, { argTypes }) => ({
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
