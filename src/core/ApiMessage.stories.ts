import { Meta, Story } from '@storybook/vue'
import ApiMessage from './ApiMessage.vue'

export default {
  title: 'Core/ApiMessage',
  component: ApiMessage,
  argTypes: {
    errorCode: {
      control: {
        type: 'select',
        options: ['unknown', 'login_expired'],
      },
    },
  },
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { ApiMessage },
  props: ['errorCode'],
  template: `
    <ApiMessage :error-code="errorCode" />
  `,
})

export const Default = Template.bind({})
Default.args = {
  errorCode: 'unknown',
}
Default.parameters = {}
