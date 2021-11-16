import { Meta, Story } from '@storybook/vue';
import FullHeight from './FullHeight.vue';

export default {
  title: 'Core/FullHeight',
  component: FullHeight
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { FullHeight },
  template: `
    <FullHeight>
      <div style="width: 100%; height: 100%; background: #fafafa; position: absolute;">
      </div>
    </FullHeight>
  `
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  layout: 'fullscreen'
};
