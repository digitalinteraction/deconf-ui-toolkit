import { Meta, Story } from '@storybook/vue3'
import BackButton from './BackButton.vue'

export default {
  title: 'Component/BackButton',
  component: BackButton,
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { BackButton },
  setup() {
    return { ...args }
  },
  template: `
    <BackButton to="/">{{ text }}</BackButton>
  `,
})

export const Default = Template.bind({})
Default.args = {
  text: 'Go home',
}
Default.parameters = {
  controls: {
    exclude: ['to', 'default'],
  },
}
