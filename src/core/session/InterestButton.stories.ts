import { Meta, Story } from '@storybook/vue';
import InterestButton from './InterestButton.vue';

export default {
  title: 'Core/InterestButton',
  component: InterestButton,
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { InterestButton },
  props: ['isInterested', 'isProcessing'],
  template: `
    <InterestButton
      :is-interested="isInterested"
      :is-processing="isProcessing"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  isInterested: false,
  isProcessing: false,
};
Default.parameters = {};
