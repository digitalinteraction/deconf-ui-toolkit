import { Meta, Story } from '@storybook/vue';
import SegmentControl from './SegmentControl.vue';

export default {
  title: 'Form/SegmentControl',
  component: SegmentControl,
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SegmentControl },
  props: ['options'],
  data: () => ({
    value: 'option-a',
  }),
  template: `
    <SegmentControl
      v-model="value"
      :options="options"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  options: [
    { value: 'option-a', text: 'Option A' },
    { value: 'option-b', text: 'Option B' },
    { value: 'option-c', text: 'Option C' },
  ],
};
Default.parameters = {};
