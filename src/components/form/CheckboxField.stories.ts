import { Meta, Story } from '@storybook/vue';
import CheckboxField from './CheckboxField.vue';

export default {
  title: 'Form/CheckboxField',
  component: CheckboxField
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { CheckboxField },
  props: ['hasError'],
  template: `
    <CheckboxField
      name="test-checkbox-field"
      :value="false"
      text="This is a checkbox field"
      help="This is some help"
      :hasError="hasError"
    />
  `
});

export const Default = Template.bind({});
Default.args = {
  hasError: false
};
Default.parameters = {
  controls: {
    exclude: ['name', 'value', 'text', 'help']
  }
};
