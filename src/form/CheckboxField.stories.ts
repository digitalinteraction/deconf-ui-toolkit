import { Meta } from '@storybook/vue3';
import CheckboxField from './CheckboxField.vue';
import { fn } from '@storybook/test';

export default {
  title: 'Form/CheckboxField',
  component: CheckboxField,
} as Meta;

const Template = (args: any) => ({
  components: { CheckboxField },
  setup: () => args,

  template: `
    <CheckboxField
      name="test-checkbox-field"
      :model-value="checked"
      :text="text"
      :help="help"
      :has-error="hasError"
      :disabled="disabled"
      @update:modelValue="onValue"
    />
  `,
});

export const Default = {
  render: Template,
  args: {
    checked: false,
    text: 'This is a checkbox field',
    help: 'This is some help',
    hasError: false,
    disabled: false,
    onValue: fn(),
  },
};
