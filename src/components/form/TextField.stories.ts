import { Meta, Story } from '@storybook/vue3'
import TextField from './TextField.vue'

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
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { TextField },
  props: ['hasError', 'type', 'disabled'],
  template: `
    <TextField
      name="text-text-field"
      :type="type"
      label="This is a label"
      value=""
      placeholder="This is a placeholder"
      help="This is some help text"
      :has-error="hasError"
      :disabled="disabled"
    />
  `,
})

export const Default = Template.bind({})
Default.args = {
  hasError: false,
  type: 'text',
  disabled: false,
}
Default.parameters = {
  controls: {
    exclude: ['name', 'label', 'value', 'placeholder', 'help', 'notSelected'],
  },
}
