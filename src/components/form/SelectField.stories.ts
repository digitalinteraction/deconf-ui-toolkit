import { Meta, Story } from '@storybook/vue3'
import SelectField from './SelectField.vue'

export default {
  title: 'Form/SelectField',
  component: SelectField,
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { SelectField },
  props: ['hasError', 'disabled', 'fullwidth'],
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
      label="This is a label"
      :value="null"
      help="This is some help text"
      :options="options"
      :has-error="hasError"
      :disabled="disabled"
      :fullwidth="fullwidth"
      not-selected="Please select an option..."
    />
  `,
})

export const Default = Template.bind({})
Default.args = {
  hasError: false,
  disabled: false,
  fullwidth: false,
}
Default.parameters = {
  controls: {
    exclude: ['name', 'label', 'value', 'help', 'options', 'notSelected'],
  },
}
