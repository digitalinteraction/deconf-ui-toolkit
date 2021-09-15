import { Meta, Story } from '@storybook/vue3'
import { BrandA } from '../../story-lib/module'
import ApiError from './ApiError.vue'

export default {
  title: 'App/ApiError',
  component: ApiError,
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { ApiError, BrandA },
  setup() {
    return {
      ...args,
      homeRoute: { name: 'HomeRoute' },
    }
  },
  template: `
    <ApiError :home-route="homeRoute">
      <template v-slot:brand>
        <BrandA />
      </template>
      <template v-slot:footer>
        <p class="footer">This is a footer</p>
      </template>
    </ApiError>
  `,
})

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  layout: 'fullscreen',
  controls: {
    exclude: ['homeRoute', 'retry', 'brand', 'footer'],
  },
}
