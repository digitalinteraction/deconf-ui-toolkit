import { Meta } from '@storybook/vue3';
import InlineMessage from './InlineMessage.vue';

export default {
  title: 'Core/InlineMessage',
  component: InlineMessage,
} as Meta;

const Template = (args: unknown) => ({
  components: { InlineMessage },
  setup: () => args,
  template: `
    <InlineMessage>
      {{ message }}
    </InlineMessage>
  `,
});

export const Default = {
  render: Template,
  args: {
    message: 'this is a message',
  },
};
