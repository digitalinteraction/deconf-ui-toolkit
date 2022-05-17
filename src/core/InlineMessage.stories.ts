import { Meta, Story } from '@storybook/vue';
import InlineMessage from './InlineMessage.vue';

export default {
  title: 'Core/InlineMessage',
  component: InlineMessage
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { InlineMessage },
  props: [],
  template: `
    <InlineMessage>
      This is a message
    </InlineMessage>
  `
});

export const Default = Template.bind({});
Default.args = {};
