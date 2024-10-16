import { Meta } from '@storybook/vue3';
import InlineFilter from './InlineFilter.vue';
import type { FilterOption } from './filter-option';

export default {
  title: 'Schedule/InlineFilter',
  component: InlineFilter,
} as Meta;

const Template = (args: unknown) => ({
  components: { InlineFilter },
  setup: () => args,
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

export const Default = {
  render: Template,
  args: {
    label: 'This is a label',
    offLabel: 'All Selected',
    options: [
      { text: 'Option A', value: 'OptionA' },
      { text: 'Option B', value: 'OptionB' },
      { text: 'Option C', value: 'OptionC' },
    ] as FilterOption[],
  },
};
