import { Meta, Story } from '@storybook/vue3'
import LanguageWarning from './LanguageWarning.vue'

export default {
  title: 'Session/LanguageWarning',
  component: LanguageWarning,
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { LanguageWarning },
  props: ['availableLanguages'],
  template: `
    <LanguageWarning :available-languages="availableLanguages" />
  `,
})

export const Default = Template.bind({})
Default.args = {
  availableLanguages: ['EN', 'FR'],
}
