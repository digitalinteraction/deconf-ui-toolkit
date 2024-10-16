import { Meta } from '@storybook/vue3';
import TextField from './TextField.vue';
import { fn } from '@storybook/test';

export default {
  title: 'Form/TextField',
  component: TextField,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['text', 'email', 'number', 'password'],
      },
    },
  },
} as Meta;

const Template = (args: unknown) => ({
  components: { TextField },
  setup: () => args,
  template: `
    <TextField
      name="text-text-field"
      :type="type"
      :label="label"
      :model-value="value"
      :placeholder="placeholder"
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
    label: 'This is a label',
    placeholder: 'This is a placeholder',
    help: 'Useful help text',
    value: '',
    hasError: false,
    type: 'text',
    disabled: false,
    onValue: fn(),
  },
};
