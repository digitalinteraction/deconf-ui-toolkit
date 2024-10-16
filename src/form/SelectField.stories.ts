import { Meta } from '@storybook/vue3';
import SelectField from './SelectField.vue';
import { fn } from '@storybook/test';

export default {
  title: 'Form/SelectField',
  component: SelectField,
} as Meta;

const Template = (args: unknown) => ({
  components: { SelectField },
  setup: () => args,
  data: () => ({
    options: [
      { value: 'option-a', text: 'Option A' },
      { value: 'option-b', text: 'Option B' },
      { value: 'option-c', text: 'Option C' },
      { value: 'option-d', text: 'Option D' },
    ],
  }),
  template: `
    <SelectField
      name="test-select-field"
      :label="label"
      :modelValue="null"
      :help="help"
      :options="options"
      :has-error="hasError"
      :disabled="disabled"
      :fullwidth="fullwidth"
      not-selected="Please select an option..."
      @update:modelValue="onValue"
    />
  `,
});

export const Default = {
  render: Template,
  args: {
    hasError: false,
    label: 'This is a label',
    help: 'And this is some help',
    disabled: false,
    fullwidth: false,
    onValue: fn(),
  },
};
