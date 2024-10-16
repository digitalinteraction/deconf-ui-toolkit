import { Meta } from '@storybook/vue3';
import InterestButton from './InterestButton.vue';
import { fn } from '@storybook/test';

export default {
  title: 'Core/Session/InterestButton',
  component: InterestButton,
} as Meta;

const Template = (args: unknown) => ({
  components: { InterestButton },
  setup: () => args,
  template: `
    <InterestButton
      :is-interested="isInterested"
      :is-processing="isProcessing"
      @toggle="onToggle"
    />
  `,
});

export const Default = {
  render: Template,
  args: {
    isInterested: false,
    isProcessing: false,
    onToggle: fn(),
  },
  parameters: {},
};
