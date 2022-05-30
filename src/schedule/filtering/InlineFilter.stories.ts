import { Meta, Story } from '@storybook/vue';
import InlineFilter from './InlineFilter.vue';
import type { FilterOption } from './filter-option';

export default {
  title: 'Schedule/InlineFilter',
  component: InlineFilter,
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { InlineFilter },
  props: ['label', 'offLabel', 'options'],
  data: () => ({
    value: null,
  }),
  template: `
    <InlineFilter
      v-model="value"
      :label="label"
      :off-label="offLabel"
      :options="options"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  label: 'This is a label',
  offLabel: 'All Selected',
  options: [
    { text: 'Option A', value: 'OptionA' },
    { text: 'Option B', value: 'OptionB' },
    { text: 'Option C', value: 'OptionC' },
  ] as FilterOption[],
};
Default.parameters = {};
