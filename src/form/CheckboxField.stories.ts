import { Meta, Story } from '@storybook/vue';
import CheckboxField from './CheckboxField.vue';

export default {
  title: 'Form/CheckboxField',
  component: CheckboxField
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { CheckboxField },
  props: ['hasError', 'disabled'],
  template: `
    <CheckboxField
      name="test-checkbox-field"
      :value="false"
      text="This is a checkbox field"
      help="This is some help"
      :has-error="hasError"
      :disabled="disabled"
    />
  `
});

export const Default = Template.bind({});
Default.args = {
  hasError: false,
  disabled: false
};
Default.parameters = {
  controls: {
    exclude: ['name', 'value', 'text', 'help']
  }
};
