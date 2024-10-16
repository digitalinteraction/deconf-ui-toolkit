import { Meta } from '@storybook/vue3';
import { fn } from '@storybook/test';
import SegmentControl from './SegmentControl.vue';

export default {
  title: 'Form/SegmentControl',
  component: SegmentControl,
} as Meta;

const Template = (args: unknown) => ({
  components: { SegmentControl },
  setup: () => args,
  data: () => ({
    value: 'option-a',
  }),
  template: `
    <SegmentControl
      v-model="value"
      @update:modelValue="onValue"
      :options="options"
    />
  `,
});

export const Default = {
  render: Template,
  args: {
    options: [
      { value: 'option-a', text: 'Option A' },
      { value: 'option-b', text: 'Option B' },
      { value: 'option-c', text: 'Option C' },
    ],
    onValue: fn(),
  },
};
